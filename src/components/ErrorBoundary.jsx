import React from 'react';
import { AlertTriangle, RotateCcw, LayoutDashboard } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#1C1D22] text-black dark:text-white rounded-3xl border-3 border-black dark:border-zinc-700 shadow-[0_8px_0_0_#18181B] dark:shadow-[0_8px_0_0_#3F3F46] p-6 sm:p-8 space-y-5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FECDD3] text-rose-950 border-2 border-black flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-rose-700" strokeWidth={2.5} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black dark:text-white">
                Something didn't load properly
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
                We ran into an unexpected glitch loading this view. Your saved progress, notes, and streak are completely safe.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-[#FAF6EE] dark:bg-zinc-900 border-2 border-black rounded-xl text-left font-mono text-[11px] text-rose-700 dark:text-rose-400 max-h-24 overflow-y-auto">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full sm:flex-1 py-2.5 px-4 bg-[#FFDE59] text-black rounded-xl text-xs font-black border-2 border-black shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>

              <a
                href="/"
                className="w-full sm:flex-1 py-2.5 px-4 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-xl text-xs font-black border-2 border-black shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
