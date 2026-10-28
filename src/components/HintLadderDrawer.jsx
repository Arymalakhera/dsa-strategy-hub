import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  CheckCircle2,
  Send,
  Terminal,
  ListTree,
  Code2,
  Clock,
  Database,
  HelpCircle,
  ShieldAlert,
  GitFork,
  Compass,
  ShieldCheck,
  Key,
  Layers,
  Timer,
  Search,
  BrainCircuit
} from 'lucide-react';
import { MockTimer } from './MockTimer';
import { LottieMentorBot } from './LottieMentorBot';
import { getProblemSolution } from '../data/multiLanguageSolutions';
import { SUGGESTED_QUESTIONS, askSocraticMentor } from '../services/socraticService';

const LANGUAGES = [
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'javascript', label: 'JavaScript' }
];

const CHIP_ICONS = {
  explain_simpler: HelpCircle,
  use_hashmap: Database,
  complexity: Clock,
  edge_cases: ShieldAlert,
  code_hint: Code2,
  two_pointers_sliding: GitFork,
  dry_run: Compass
};

export const HintLadderDrawer = ({
  problem,
  isOpen,
  onClose,
  currentHintsCount = 0,
  onHintRevealed,
  status = 'not_started',
  onMarkStatus,
  onOpenNote,
  preferredLanguage = 'python'
}) => {
  const [activeTab, setActiveTab] = useState('hints'); // 'hints' | 'ai_chat'
  const [revealedStage, setRevealedStage] = useState(0);
  const [selectedLang, setSelectedLang] = useState(preferredLanguage || 'python');
  const [copied, setCopied] = useState(false);

  // Socratic Chat State
  const [chatMessages, setChatMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    if (problem) {
      setRevealedStage(currentHintsCount || 0);
      setActiveTab('hints');

      // Initialize welcome message for Socratic Chat
      setChatMessages([
        {
          id: 'welcome_' + problem.id,
          role: 'assistant',
          content: `### Socratic Mentor for **${problem.title}**\n\nI will guide your algorithmic intuition step-by-step without prematurely revealing solutions.\n\nSelect a recommended inquiry below or enter your custom question:`,
          source: 'Cached (Zero API Cost)',
          isZeroCredit: true
        }
      ]);
    }
  }, [problem?.id, currentHintsCount, isOpen]);

  useEffect(() => {
    if (preferredLanguage) {
      setSelectedLang(preferredLanguage);
    }
  }, [preferredLanguage]);

  useEffect(() => {
    if (activeTab === 'ai_chat') {
      chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatLoading, activeTab]);

  if (!isOpen || !problem) return null;

  const handleShowNextHint = () => {
    const next = Math.min(4, revealedStage + 1);
    setRevealedStage(next);
    if (onHintRevealed) {
      onHintRevealed(problem.id, next);
    }
  };

  const codeToDisplay = getProblemSolution(problem, selectedLang);

  const copyCode = () => {
    if (codeToDisplay) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeToDisplay).catch(() => {
          fallbackCopy(codeToDisplay);
        });
      } else {
        fallbackCopy(codeToDisplay);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fallbackCopy = (text) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (e) {
      console.warn('Fallback copy failed', e);
    }
  };

  // Dispatch Socratic Mentor Query
  const handleAskQuestion = async (queryText) => {
    const q = (queryText || inputQuery).trim();
    if (!q || chatLoading) return;

    const userMsg = {
      id: 'user_' + Date.now(),
      role: 'user',
      content: q
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setInputQuery('');
    setChatLoading(true);

    try {
      const response = await askSocraticMentor({
        problem,
        userMessage: q,
        targetStage: Math.max(1, revealedStage),
        messages: newHistory
      });

      const assistantMsg = {
        id: 'assistant_' + Date.now(),
        role: 'assistant',
        content: response.reply,
        source: response.source,
        isZeroCredit: response.isZeroCredit || response.isCached
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: 'error_' + Date.now(),
          role: 'assistant',
          content: 'Unable to connect to mentor service. Please select one of the cached question chips below.',
          source: 'System'
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const difficultyColors = {
    Easy: 'bg-[#D1FAE5] text-emerald-950 border-2 border-black font-black',
    Medium: 'bg-[#FED7AA] text-amber-950 border-2 border-black font-black',
    Hard: 'bg-[#FECDD3] text-rose-950 border-2 border-black font-black'
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl bg-[#FAF6EE] dark:bg-[#18181B] h-full shadow-2xl flex flex-col border-l-2 border-black dark:border-zinc-600 overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b-2 border-black dark:border-zinc-700 flex items-start justify-between gap-3 bg-white dark:bg-[#1C1D22]">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-black text-black dark:text-white bg-[#FAF6EE] dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-black/30">
                #{problem.lcNumber}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${difficultyColors[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FFDE59] text-black border-2 border-black">
                {problem.tag}
              </span>
              <span className="text-xs text-slate-800 dark:text-zinc-200 font-bold truncate">
                • {problem.pattern}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-black dark:text-white truncate">
              {problem.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={problem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-white dark:bg-zinc-800 text-black dark:text-white px-3 py-1.5 text-xs flex items-center gap-1.5 min-h-[36px]"
            >
              LeetCode <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              title="Close drawer (ESC)"
              className="p-2 rounded-xl border-2 border-black bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-slate-100 cursor-pointer shadow-[0_2.5px_0_0_#18181B] hover:translate-y-[-1px] active:translate-y-[2px] min-h-[36px] min-w-[36px] flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar: Timer & Mode Tabs */}
        <div className="px-4 py-2 bg-white dark:bg-[#1C1D22] border-b-2 border-black dark:border-zinc-700 flex items-center justify-between text-xs flex-wrap gap-2">
          {/* Tab Switcher: Hints vs Socratic Mentor */}
          <div className="flex items-center gap-1.5 bg-[#FAF6EE] dark:bg-zinc-800 p-1 rounded-xl border-2 border-black">
            <button
              onClick={() => setActiveTab('hints')}
              className={`px-3 py-1 rounded-lg font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'hints'
                  ? 'bg-[#FFDE59] text-black border-2 border-black shadow-[0_2.5px_0_0_#18181B]'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>Step-by-Step Hints ({revealedStage}/4)</span>
            </button>

            <button
              onClick={() => setActiveTab('ai_chat')}
              className={`px-3 py-1 rounded-lg font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ai_chat'
                  ? 'bg-[#A7F3D0] text-black border-2 border-black shadow-[0_2.5px_0_0_#18181B]'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-900 dark:text-emerald-300" />
              <span>AI Mentor</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <Timer className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
            <MockTimer initialMinutes={40} />
          </div>
        </div>

        {/* View 1: Classic Hint Ladder (1-4) */}
        {activeTab === 'hints' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Hint 1: Pattern Recognition */}
            <div className={`p-4 rounded-2xl border-2 border-black transition-all ${
              revealedStage >= 1
                ? 'bg-white dark:bg-zinc-800'
                : 'bg-[#FAF6EE] dark:bg-zinc-900 border-dashed opacity-60'
            }`}>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
                <span className="w-6 h-6 rounded-full bg-[#FFDE59] text-black border-2 border-black flex items-center justify-center font-black text-xs">
                  1
                </span>
                <span>Hint 1: Pattern Recognition</span>
              </div>
              {revealedStage >= 1 ? (
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                  {problem.hints.hint1}
                </p>
              ) : (
                <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium italic mt-1">
                  Locked. Reveal to identify the core algorithmic structure without exposing logic.
                </p>
              )}
            </div>

            {/* Hint 2: Core Invariant */}
            <div className={`p-4 rounded-2xl border-2 border-black transition-all ${
              revealedStage >= 2
                ? 'bg-white dark:bg-zinc-800'
                : 'bg-[#FAF6EE] dark:bg-zinc-900 border-dashed opacity-60'
            }`}>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
                <span className="w-6 h-6 rounded-full bg-[#BAE6FD] text-black border-2 border-black flex items-center justify-center font-black text-xs">
                  2
                </span>
                <span>Hint 2: Core Invariant & Observation</span>
              </div>
              {revealedStage >= 2 ? (
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                  {problem.hints.hint2}
                </p>
              ) : (
                <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium italic mt-1">
                  Locked. Core invariant that simplifies the transition state.
                </p>
              )}
            </div>

            {/* Hint 3: Algorithm Pseudocode */}
            <div className={`p-4 rounded-2xl border-2 border-black transition-all ${
              revealedStage >= 3
                ? 'bg-white dark:bg-zinc-800'
                : 'bg-[#FAF6EE] dark:bg-zinc-900 border-dashed opacity-60'
            }`}>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
                <span className="w-6 h-6 rounded-full bg-[#FED7AA] text-black border-2 border-black flex items-center justify-center font-black text-xs">
                  3
                </span>
                <span>Hint 3: Algorithm Pseudocode</span>
              </div>
              {revealedStage >= 3 ? (
                <pre className="mt-2 p-3 bg-zinc-900 text-[#FFDE59] font-mono text-xs rounded-xl overflow-x-auto border-2 border-black">
                  {problem.hints.hint3}
                </pre>
              ) : (
                <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium italic mt-1">
                  Locked. Step-by-step pseudocode blueprint.
                </p>
              )}
            </div>

            {/* Hint 4: Optimal Implementation & Complexity */}
            <div className={`p-4 rounded-2xl border-2 border-black transition-all ${
              revealedStage >= 4
                ? 'bg-white dark:bg-zinc-800'
                : 'bg-[#FAF6EE] dark:bg-zinc-900 border-dashed opacity-60'
            }`}>
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#A7F3D0] text-black border-2 border-black flex items-center justify-center font-black text-xs">
                    4
                  </span>
                  <span>Hint 4: Full Solution & Complexity</span>
                </div>
                {revealedStage >= 4 && (
                  <button
                    onClick={copyCode}
                    className="neo-btn bg-[#FAF6EE] dark:bg-zinc-700 text-black dark:text-white px-2.5 py-1 text-[11px]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Code
                      </>
                    )}
                  </button>
                )}
              </div>

              {revealedStage >= 4 ? (
                <div className="mt-3 space-y-3">
                  {/* Clean Language Selection Tabs */}
                  <div className="flex items-center gap-1.5 p-1 bg-[#FAF6EE] dark:bg-zinc-900 rounded-xl border-2 border-black flex-wrap max-w-fit">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setSelectedLang(lang.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          selectedLang === lang.id
                            ? 'bg-[#FFDE59] text-black border-2 border-black shadow-[0_2px_0_0_#18181B] active:translate-y-[1px]'
                            : 'text-slate-800 dark:text-zinc-200 hover:text-black'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>

                  {/* Complexity Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-[#FAF6EE] dark:bg-zinc-900 border-2 border-black rounded-xl">
                      <span className="font-black text-black dark:text-white flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-700 dark:text-zinc-300" /> Time Complexity:
                      </span>
                      <p className="font-mono text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">
                        {problem.hints.hint4.timeComplexity}
                      </p>
                    </div>
                    <div className="p-2.5 bg-[#FAF6EE] dark:bg-zinc-900 border-2 border-black rounded-xl">
                      <span className="font-black text-black dark:text-white flex items-center gap-1">
                        <Database className="w-3 h-3 text-slate-700 dark:text-zinc-300" /> Space Complexity:
                      </span>
                      <p className="font-mono text-blue-700 dark:text-blue-400 font-bold mt-0.5">
                        {problem.hints.hint4.spaceComplexity}
                      </p>
                    </div>
                  </div>

                  {/* Code Container */}
                  <div className="relative group">
                    <pre className="p-4 bg-[#0A0D14] text-emerald-300 font-mono text-[13px] rounded-2xl overflow-x-auto border-2 border-black leading-relaxed max-h-84 selection:bg-emerald-950 selection:text-white">
                      <code>{codeToDisplay}</code>
                    </pre>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium italic mt-1">
                  Locked. Complete multi-language solution with formal time and space complexity bounds.
                </p>
              )}
            </div>
          </div>
        )}

        {/* View 2: Socratic AI Mentor with Professional Suggested Question Chips */}
        {activeTab === 'ai_chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#FAF6EE] dark:bg-[#121316]">
            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {/* Socratic Mentor Header Card */}
              <div className="p-3 bg-white dark:bg-[#1C1D22] border-2 border-black rounded-2xl flex items-center gap-3 shadow-[0_2.5px_0_0_#18181B]">
                <div className="w-10 h-10 rounded-xl bg-[#FFDE59] border-2 border-black flex items-center justify-center shrink-0 shadow-[0_2px_0_0_#18181B]">
                  <BrainCircuit className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-black text-xs text-black dark:text-white flex items-center gap-1.5">
                    <span>Socratic Mentor Guide</span>
                    <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-[#A7F3D0] text-black border border-black">
                      Active
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium">
                    Socratic guidance mode active. Select any question chip below for targeted intuition!
                  </p>
                </div>
              </div>

              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl border-2 border-black text-xs leading-relaxed space-y-1.5 ${
                      msg.role === 'user'
                        ? 'bg-[#FFDE59] text-black font-bold'
                        : 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                    {msg.source && (
                      <div className="text-[10px] font-mono font-bold text-slate-500 dark:text-zinc-400 border-t border-black/10 dark:border-white/10 pt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        {msg.source}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex items-center gap-2 p-3 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-black text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <Terminal className="w-4 h-4 animate-pulse" /> Consulting Socratic Mentor...
                </div>
              )}
              <div ref={chatScrollRef} />
            </div>

            {/* Suggested Question Chips Bar (Clean Developer Style) */}
            <div className="px-4 py-2 bg-white dark:bg-[#1C1D22] border-t-2 border-black dark:border-zinc-700">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300 shrink-0 flex items-center gap-1 mr-1">
                  <Search className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-400" /> Suggested:
                </span>
                {SUGGESTED_QUESTIONS.map((q) => {
                  const Icon = CHIP_ICONS[q.id] || Code2;
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleAskQuestion(q.query)}
                      disabled={chatLoading}
                      title="Ask instantly"
                      className="px-2.5 py-1 rounded-xl bg-[#FAF6EE] dark:bg-zinc-800 hover:bg-[#FFDE59] hover:text-black border-2 border-black text-slate-800 dark:text-zinc-200 text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer shadow-[0_2.5px_0_0_#18181B] hover:translate-y-[-1px] active:translate-y-[2px] shrink-0 flex items-center gap-1.5"
                    >
                      <Icon className="w-3 h-3 opacity-70" />
                      <span>{q.label}</span>
                      <span className="text-[9px] px-1 rounded bg-[#A7F3D0] text-emerald-950 font-mono font-bold border border-black/20">
                        Instant
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* User Input Bar */}
            <div className="p-3 bg-white dark:bg-[#1C1D22] border-t-2 border-black dark:border-zinc-700 flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                placeholder="Ask custom question (e.g. Can we solve this in O(1) auxiliary space?)..."
                className="flex-1 bg-[#FAF6EE] dark:bg-zinc-900 border-2 border-black rounded-xl px-3.5 py-2 text-xs text-black dark:text-white font-medium focus:outline-hidden"
              />
              <button
                onClick={() => handleAskQuestion()}
                disabled={chatLoading || !inputQuery.trim()}
                className="neo-btn bg-[#FFDE59] text-black px-3.5 py-2 text-xs font-black shrink-0 disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 border-t-2 border-black dark:border-zinc-700 bg-white dark:bg-[#1C1D22] flex flex-wrap items-center justify-between gap-3">
          {activeTab === 'hints' ? (
            revealedStage < 4 ? (
              <button
                onClick={handleShowNextHint}
                className="neo-btn bg-[#FFDE59] text-black px-4 py-2 text-xs font-black flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Show Next Hint ({revealedStage + 1}/4)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} /> All 4 Hints Revealed
              </div>
            )
          ) : (
            <button
              onClick={() => setActiveTab('hints')}
              className="neo-btn bg-white dark:bg-zinc-800 text-black dark:text-white px-3 py-1.5 text-xs font-black"
            >
              ← Back to Hint Ladder
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenNote(problem)}
              className="neo-btn bg-white dark:bg-zinc-800 text-black dark:text-white px-3 py-1.5 text-xs font-black"
            >
              Note
            </button>
            <button
              onClick={() => onMarkStatus(problem.id, 'solved')}
              className={`neo-btn px-3 py-1.5 text-xs font-black inline-flex items-center gap-1.5 ${
                status === 'solved'
                  ? 'bg-[#34D399] text-black'
                  : 'bg-white dark:bg-zinc-800 text-black dark:text-white'
              }`}
            >
              {status === 'solved' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Solved</span>
                </>
              ) : (
                'Mark Solved'
              )}
            </button>
            <button
              onClick={() => onMarkStatus(problem.id, 'struggled')}
              className={`neo-btn px-3 py-1.5 text-xs font-black ${
                status === 'struggled'
                  ? 'bg-[#FFDE59] text-black'
                  : 'bg-white dark:bg-zinc-800 text-black dark:text-white'
              }`}
            >
              {status === 'struggled' ? 'Struggled' : 'Mark Struggled'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
