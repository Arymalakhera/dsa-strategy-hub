/**
 * Circuit Breaker Pattern for AI API Models
 * 
 * Provides resilience, automatic failover, and self-healing for primary AI models
 * experiencing high demand (HTTP 503), rate limits (HTTP 429), or network timeouts.
 */

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF-OPEN';

export interface CircuitBreakerConfig {
  failureThreshold: number; // Max failures before tripping to OPEN (default: 5)
  windowMs: number;         // Time window for failure accumulation in ms (default: 30000 = 30s)
  cooldownMs: number;       // Time to remain OPEN before probing in ms (default: 60000 = 60s)
}

export class ModelCircuitBreaker {
  private name: string;
  private state: CircuitState = 'CLOSED';
  private failureTimestamps: number[] = [];
  private lastStateChange: number = Date.now();
  private halfOpenTestInFlight: boolean = false;
  private config: CircuitBreakerConfig;

  constructor(name: string, customConfig?: Partial<CircuitBreakerConfig>) {
    this.name = name;

    const failureThreshold = Number(process.env.CIRCUIT_BREAKER_FAILURE_THRESHOLD) || customConfig?.failureThreshold || 5;
    const windowMs = Number(process.env.CIRCUIT_BREAKER_WINDOW_MS) || customConfig?.windowMs || 30000;
    const cooldownMs = Number(process.env.CIRCUIT_BREAKER_COOLDOWN_MS) || customConfig?.cooldownMs || 60000;

    this.config = { failureThreshold, windowMs, cooldownMs };
  }

  public getState(): CircuitState {
    this.checkCooldown();
    return this.state;
  }

  private checkCooldown(): void {
    const now = Date.now();
    if (this.state === 'OPEN' && now - this.lastStateChange >= this.config.cooldownMs) {
      this.state = 'HALF-OPEN';
      this.halfOpenTestInFlight = false;
      this.lastStateChange = now;
      console.log(
        `[CircuitBreaker:${this.name}] [COOLDOWN] Cooldown of ${this.config.cooldownMs / 1000}s elapsed. State transition: OPEN -> HALF-OPEN. Primary model probe permitted.`
      );
    }
  }

  public canExecutePrimary(): boolean {
    this.checkCooldown();

    if (this.state === 'CLOSED') {
      return true;
    }

    if (this.state === 'HALF-OPEN') {
      if (!this.halfOpenTestInFlight) {
        this.halfOpenTestInFlight = true;
        console.log(
          `[CircuitBreaker:${this.name}] [PROBE] HALF-OPEN probe test request allowed for primary model.`
        );
        return true;
      }
      // If a test request is already in flight, skip to avoid flooding
      return false;
    }

    // OPEN state: Skip primary model completely
    return false;
  }

  public recordSuccess(): void {
    const previousState = this.state;
    this.failureTimestamps = [];
    this.halfOpenTestInFlight = false;

    if (previousState === 'HALF-OPEN' || previousState === 'OPEN') {
      this.state = 'CLOSED';
      this.lastStateChange = Date.now();
      console.log(
        `[CircuitBreaker:${this.name}] [SUCCESS] Probe test request Succeeded! State transition: ${previousState} -> CLOSED. Primary model restored.`
      );
    }
  }

  public recordFailure(error?: any): void {
    const now = Date.now();
    this.failureTimestamps.push(now);

    // Filter out timestamps outside window
    this.failureTimestamps = this.failureTimestamps.filter(
      (ts) => now - ts <= this.config.windowMs
    );

    const errorMessage = error?.message || error?.toString() || 'Unknown error';

    if (this.state === 'HALF-OPEN') {
      this.state = 'OPEN';
      this.lastStateChange = now;
      this.halfOpenTestInFlight = false;
      console.warn(
        `[CircuitBreaker:${this.name}] [FAIL] Probe test request Failed (${errorMessage}). State transition: HALF-OPEN -> OPEN. Cooldown reset for ${
          this.config.cooldownMs / 1000
        }s.`
      );
      return;
    }

    if (this.state === 'CLOSED') {
      if (this.failureTimestamps.length >= this.config.failureThreshold) {
        this.state = 'OPEN';
        this.lastStateChange = now;
        console.warn(
          `[CircuitBreaker:${this.name}] [THRESHOLD] Failure threshold reached (${this.failureTimestamps.length}/${this.config.failureThreshold} failures in ${
            this.config.windowMs / 1000
          }s). Reason: ${errorMessage}. State transition: CLOSED -> OPEN. Primary model marked temporarily unavailable for ${
            this.config.cooldownMs / 1000
          }s.`
        );
      } else {
        console.warn(
          `[CircuitBreaker:${this.name}] Recorded failure (${this.failureTimestamps.length}/${this.config.failureThreshold} in ${
            this.config.windowMs / 1000
          }s). State: CLOSED. Error: ${errorMessage}`
        );
      }
    }
  }

  public getStatusSummary() {
    return {
      name: this.name,
      state: this.getState(),
      recentFailures: this.failureTimestamps.length,
      config: { ...this.config }
    };
  }
}

// Global singleton instance for process persistence in Next.js
const globalForCircuitBreaker = globalThis as unknown as {
  gemini25CircuitBreaker?: ModelCircuitBreaker;
};

export const gemini25CircuitBreaker =
  globalForCircuitBreaker.gemini25CircuitBreaker ||
  new ModelCircuitBreaker('gemini-2.5-flash');

if (process.env.NODE_ENV !== 'production') {
  globalForCircuitBreaker.gemini25CircuitBreaker = gemini25CircuitBreaker;
}
