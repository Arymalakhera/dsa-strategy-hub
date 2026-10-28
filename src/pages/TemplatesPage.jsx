import React, { useState, useEffect } from 'react';
import { PATTERN_TEMPLATES } from '../data/patternTemplates';
import { PROBLEMS } from '../data/problems';
import {
  Code2,
  Copy,
  Check,
  Search,
  BookOpen,
  ExternalLink,
  Key,
  Clock,
  Database
} from 'lucide-react';

const LANGUAGES = [
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'javascript', label: 'JavaScript' }
];

export const TemplatesPage = ({
  notesMap = {},
  preferredLanguage = 'python',
  onSelectLanguage
}) => {
  const [activeTab, setActiveTab] = useState('templates'); // 'templates' | 'notebook'
  const [selectedLang, setSelectedLang] = useState(preferredLanguage || 'python');
  const [copiedId, setCopiedId] = useState(null);
  const [templateSearch, setTemplateSearch] = useState('');
  const [notebookSearch, setNotebookSearch] = useState('');

  useEffect(() => {
    if (preferredLanguage) {
      setSelectedLang(preferredLanguage);
    }
  }, [preferredLanguage]);

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    if (onSelectLanguage) onSelectLanguage(lang);
  };

  const copyTemplateCode = (id, codeObj) => {
    const code = typeof codeObj === 'object' ? codeObj[selectedLang] || codeObj.java || '' : codeObj;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter templates
  const filteredTemplates = PATTERN_TEMPLATES.filter((t) => {
    if (!templateSearch.trim()) return true;
    const q = templateSearch.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  });

  // Prepare user notes with problem info
  const userNotesList = Object.entries(notesMap)
    .filter(([_, note]) => note && note.trim().length > 0)
    .map(([pId, note]) => {
      const problem = PROBLEMS.find((p) => p.id === pId);
      return {
        problemId: pId,
        problem,
        note
      };
    })
    .filter((item) => {
      if (!notebookSearch.trim()) return true;
      const q = notebookSearch.toLowerCase();
      const matchNote = item.note.toLowerCase().includes(q);
      const matchTitle = item.problem?.title.toLowerCase().includes(q);
      const matchPattern = item.problem?.pattern.toLowerCase().includes(q);
      return matchNote || matchTitle || matchPattern;
    });

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="neo-pill bg-[#C4B5FD] text-black">
            Universal Cheat Sheets
          </span>
          <span className="neo-pill bg-[#FFDE59] text-black">
            Personal Memory Vault
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black dark:text-white uppercase">
            Pattern Cheat Sheets & Notes
          </h1>
          <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed">
            Standard boilerplate skeletons for the 9 most frequently tested DSA patterns across <strong>Python</strong>, <strong>Java</strong>, <strong>C++</strong>, and <strong>JavaScript</strong>, alongside your searchable personal <strong>Problem → Pattern → Trick</strong> notebook.
          </p>
        </div>
      </div>

      {/* Tabs & Language Pills */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b-2 border-black/10 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('templates')}
            className={`neo-btn px-4 py-2 text-xs font-black transition-all cursor-pointer shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
              activeTab === 'templates'
                ? 'bg-[#FFDE59] text-black'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" strokeWidth={2.5} />
            <span>Pattern Skeletons ({PATTERN_TEMPLATES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notebook')}
            className={`neo-btn px-4 py-2 text-xs font-black transition-all cursor-pointer shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
              activeTab === 'notebook'
                ? 'bg-[#FFDE59] text-black'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" strokeWidth={2.5} />
            <span>Personal Notebook ({Object.keys(notesMap).length})</span>
          </button>
        </div>

        {/* Global Language Selector Pills for Templates */}
        {activeTab === 'templates' && (
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF6EE] dark:bg-zinc-900 border-2 border-black rounded-xl">
            {LANGUAGES.map((l) => (
              <button
                key={l.id}
                onClick={() => handleLanguageChange(l.id)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedLang === l.id
                    ? 'bg-[#FFDE59] text-black border-2 border-black shadow-[0_2px_0_0_#18181B] active:translate-y-[1px]'
                    : 'text-slate-800 dark:text-zinc-200 hover:text-black'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab: Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-700 dark:text-zinc-300 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
            <input
              type="text"
              value={templateSearch}
              onChange={(e) => setTemplateSearch(e.target.value)}
              placeholder="Search patterns (e.g. sliding window, binary search, BFS)..."
              className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredTemplates.map((template) => {
              const codeString = typeof template.code === 'object'
                ? template.code[selectedLang] || template.code.java || ''
                : template.code;

              return (
                <div
                  key={template.id}
                  className="p-5 sm:p-6 rounded-3xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-[#1C1D22] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black/10 dark:border-white/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="neo-pill bg-[#C4B5FD] text-black text-[10px] py-0.5 px-2">
                          {template.category}
                        </span>
                        <span className="neo-pill bg-[#A7F3D0] text-black text-[10px] py-0.5 px-2">
                          {template.difficulty}
                        </span>
                        <span className="neo-pill bg-[#FFDE59] text-black text-[10px] py-0.5 px-2">
                          {selectedLang.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-black text-black dark:text-white text-base sm:text-lg">
                        {template.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => copyTemplateCode(template.id, template.code)}
                      className="neo-btn bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white px-3 py-1.5 text-xs font-black cursor-pointer shrink-0 shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px]"
                    >
                      {copiedId === template.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Code
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-800 dark:text-zinc-200 font-medium leading-relaxed">
                    {template.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" /> Time: <strong className="text-purple-700 dark:text-purple-400">{template.timeComplexity}</strong></span>
                    <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" /> Space: <strong className="text-purple-700 dark:text-purple-400">{template.spaceComplexity}</strong></span>
                  </div>

                  <div className="rounded-2xl overflow-hidden border-2 border-black">
                    <pre className="p-4 bg-[#18181B] text-[#FAF6EE] text-xs overflow-x-auto leading-relaxed">
                      <code>{codeString}</code>
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Personal Notebook */}
      {activeTab === 'notebook' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="relative max-w-md flex-1">
              <Search className="w-4 h-4 text-slate-700 dark:text-zinc-300 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
              <input
                type="text"
                value={notebookSearch}
                onChange={(e) => setNotebookSearch(e.target.value)}
                placeholder="Search your Problem → Pattern → Trick notes..."
                className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none"
              />
            </div>
            <span className="neo-pill bg-[#A7F3D0] text-black text-xs">
              {userNotesList.length} Notes Saved
            </span>
          </div>

          {userNotesList.length > 0 ? (
            <div className="grid grid-cols-1 gap-3.5">
              {userNotesList.map((item) => (
                <div
                  key={item.problemId}
                  className="p-5 rounded-2xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-[#1C1D22] space-y-2"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black bg-[#FAF6EE] dark:bg-zinc-800 px-2 py-0.5 rounded border border-black/30">
                        #{item.problem?.lcNumber}
                      </span>
                      <h4 className="font-black text-black dark:text-white text-sm">
                        {item.problem?.title}
                      </h4>
                      <span className="neo-pill bg-[#C4B5FD] text-black text-[10px] py-0.2 px-2">
                        {item.problem?.pattern}
                      </span>
                    </div>

                    {item.problem?.link && (
                      <a
                        href={item.problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-black dark:text-white hover:underline flex items-center gap-1"
                      >
                        Solve on LC <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="p-3 bg-[#FAF6EE] dark:bg-zinc-800 rounded-xl border border-black/20 dark:border-zinc-700 text-xs font-mono font-bold text-black dark:text-white leading-relaxed flex items-start gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Key Insight: {item.note}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-2">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                You haven't written any notes yet! Click the Notes icon on any problem on the Roadmap to capture your 1-line memory trick.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
