import React, { useState } from 'react';
import { TOPICS } from '../data/topics';
import { generateStudyPlan } from '../utils/plannerScheduler';
import {
  CalendarDays,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Square,
  Calendar,
  Clock,
  Check,
  Sliders,
  Zap
} from 'lucide-react';

export const StudyPlannerPage = ({ studyPlan, onSavePlan, onToggleDay }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Default to 45 days ahead if no plan exists
  const defaultDeadline = new Date();
  defaultDeadline.setDate(defaultDeadline.getDate() + 45);
  const defaultDeadlineStr = defaultDeadline.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(studyPlan?.startDate || todayStr);
  const [deadlineDate, setDeadlineDate] = useState(studyPlan?.deadlineDate || defaultDeadlineStr);
  const [hoursPerDay, setHoursPerDay] = useState(studyPlan?.hoursPerDay || 3);
  const [daysPerWeek, setDaysPerWeek] = useState(studyPlan?.daysPerWeek || 6);
  const [target, setTarget] = useState(studyPlan?.target || 'both');
  const [completedTopics, setCompletedTopics] = useState(studyPlan?.completedTopics || []);
  const [activePlan, setActivePlan] = useState(studyPlan);
  const [showConfig, setShowConfig] = useState(!studyPlan);

  const toggleTopicCompleted = (topicId) => {
    if (completedTopics.includes(topicId)) {
      setCompletedTopics(completedTopics.filter((id) => id !== topicId));
    } else {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const handleGeneratePlan = (e) => {
    e.preventDefault();
    const generated = generateStudyPlan({
      startDateStr: startDate,
      deadlineDateStr: deadlineDate,
      hoursPerDay: Number(hoursPerDay),
      daysPerWeek: Number(daysPerWeek),
      target,
      completedTopicIds: completedTopics
    });
    setActivePlan(generated);
    onSavePlan(generated);
    setShowConfig(false);
  };

  // Compute completed days progress
  let totalDaysInPlan = 0;
  let completedDaysInPlan = 0;
  if (activePlan?.schedule) {
    for (const week of activePlan.schedule) {
      for (const d of week.days) {
        totalDaysInPlan++;
        if (d.isCompleted) completedDaysInPlan++;
      }
    }
  }

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="neo-pill bg-[#FFDE59] text-black">
            Adaptive Placement Scheduler
          </span>
          <span className="neo-pill bg-[#A7F3D0] text-black">
            Dynamic Compression
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black dark:text-white uppercase">
            Personalized DSA Study Plan
          </h1>
          <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed">
            Generate an optimal week-by-week schedule based on your available hours, company focus (Product vs Service), and target deadline. Essential topics like Trees and DP are preserved even under compression.
          </p>

          {activePlan && (
            <div className="pt-3 flex flex-wrap items-center gap-2 text-xs font-black">
              <span className="neo-pill bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-black dark:text-white" />
                <span>{activePlan.startDate} → {activePlan.deadlineDate} ({activePlan.totalCalendarDays} days)</span>
              </span>
              <span className="neo-pill bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-black dark:text-white" />
                <span>{activePlan.hoursPerDay} hrs/day • {activePlan.daysPerWeek} days/wk</span>
              </span>
              <span className="neo-pill bg-[#A7F3D0] text-black flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-black" />
                <span>{completedDaysInPlan}/{totalDaysInPlan} Days Done</span>
              </span>
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="neo-btn bg-[#FFDE59] text-black px-3 py-1 text-xs font-black shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-black" />
                <span>{showConfig ? 'Hide Customizer' : 'Adjust Inputs'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plan Configuration Form */}
      {showConfig && (
        <form
          onSubmit={handleGeneratePlan}
          className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-5"
        >
          <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-3">
            <h3 className="font-black text-black dark:text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Plan Parameters
            </h3>
            <span className="text-xs text-slate-600 dark:text-zinc-400 font-bold">All fields adapt the schedule dynamically</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Start Date */}
            <div>
              <label className="text-xs font-black text-black dark:text-white block mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold rounded-xl border-2 border-black dark:border-zinc-700 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white"
                required
              />
            </div>

            {/* Target Deadline */}
            <div>
              <label className="text-xs font-black text-black dark:text-white block mb-1">
                Target Interview Date
              </label>
              <input
                type="date"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold rounded-xl border-2 border-black dark:border-zinc-700 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white"
                required
              />
            </div>

            {/* Hours per Day */}
            <div>
              <label className="text-xs font-black text-black dark:text-white block mb-1">
                Daily Study Hours
              </label>
              <select
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold rounded-xl border-2 border-black dark:border-zinc-700 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white cursor-pointer"
              >
                <option value={2}>2 hrs / day (Moderate)</option>
                <option value={3}>3 hrs / day (Recommended)</option>
                <option value={4}>4 hrs / day (Intensive)</option>
                <option value={6}>6+ hrs / day (Sprint)</option>
              </select>
            </div>

            {/* Days per Week */}
            <div>
              <label className="text-xs font-black text-black dark:text-white block mb-1">
                Study Days Per Week
              </label>
              <select
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold rounded-xl border-2 border-black dark:border-zinc-700 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white cursor-pointer"
              >
                <option value={5}>5 days / week (Weekdays)</option>
                <option value={6}>6 days / week (1 Rest day)</option>
                <option value={7}>7 days / week (Sprint)</option>
              </select>
            </div>
          </div>

          {/* Hiring Target */}
          <div>
            <label className="text-xs font-black text-black dark:text-white block mb-2">
              Hiring Target
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'product', label: 'Product Companies (FAANG / Tier 1)', desc: 'Full coverage of Trees, Graphs, DP & hard patterns' },
                { id: 'service', label: 'Service Companies (TCS / Infosys)', desc: 'Prioritizes Must problems, strings, arrays & foundational patterns' },
                { id: 'both', label: 'Both / Comprehensive', desc: 'Balanced mastery for on-campus and off-campus drives' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTarget(t.id)}
                  className={`p-3.5 text-left rounded-2xl border-2 border-black transition-all cursor-pointer shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
                    target === t.id
                      ? 'bg-[#FFDE59] text-black'
                      : 'bg-[#FAF6EE] dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-white'
                  }`}
                >
                  <div className="font-black text-xs">{t.label}</div>
                  <div className="text-[11px] font-medium mt-1 text-slate-700 dark:text-zinc-300">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Already Completed Topics */}
          <div>
            <label className="text-xs font-black text-black dark:text-white block mb-2">
              Topics Already Completed (will be fast-tracked):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {TOPICS.map((topic) => {
                const isChecked = completedTopics.includes(topic.id);
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => toggleTopicCompleted(topic.id)}
                    className={`p-2 rounded-xl border-2 border-black text-[11px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_2px_0_0_#18181B] active:translate-y-[1px] ${
                      isChecked
                        ? 'bg-[#A7F3D0] text-black'
                        : 'bg-[#FAF6EE] dark:bg-zinc-800 text-slate-800 dark:text-zinc-300'
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" strokeWidth={2.5} />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                    <span className="truncate">{topic.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t-2 border-black/10 dark:border-white/10">
            <button
              type="submit"
              className="neo-btn bg-[#FFDE59] text-black px-5 py-2.5 text-xs font-black shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-black" />
              <span>Generate Optimized Plan</span>
            </button>
          </div>
        </form>
      )}

      {/* Warning Banner if Unrealistic or Cut Topics */}
      {activePlan?.warning && (
        <div className="p-4 bg-[#FEF08A] text-black border-2 border-black rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" strokeWidth={2.5} />
          <div className="text-xs space-y-1">
            <p className="font-black text-black">
              Schedule Compression Warning
            </p>
            <p className="text-slate-900 font-medium leading-relaxed">
              {activePlan.warning}
            </p>
          </div>
        </div>
      )}

      {/* Week-by-Week Calendar Schedule */}
      {activePlan?.schedule ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Week-by-Week Study Schedule
            </h2>
            <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 px-3 py-1 rounded-full border-2 border-black">
              Check off completed days to maintain accountability
            </span>
          </div>

          <div className="space-y-5">
            {activePlan.schedule.map((week) => (
              <div
                key={week.weekNumber}
                className="p-5 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4"
              >
                <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-2">
                  <h3 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#FFDE59] text-black border-2 border-black flex items-center justify-center text-xs font-black">
                      W{week.weekNumber}
                    </span>
                    <span>Week {week.weekNumber}</span>
                  </h3>
                  <span className="neo-pill bg-[#A7F3D0] text-black text-[10px] py-0.5 px-2">
                    {week.days.filter((d) => d.isCompleted).length}/{week.days.length} Days Complete
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                  {week.days.map((day) => {
                    const isToday = day.date === todayStr;

                    return (
                      <div
                        key={day.date}
                        className={`p-3.5 rounded-2xl border-2 border-black transition-all flex flex-col justify-between space-y-2 ${
                          day.isCompleted
                            ? 'bg-[#D1FAE5] text-black'
                            : isToday
                            ? 'bg-[#FEF08A] text-black'
                            : day.type === 'revision'
                            ? 'bg-[#FECDD3] text-black'
                            : day.type === 'mock'
                            ? 'bg-[#FED7AA] text-black'
                            : 'bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white'
                        }`}
                      >
                        <div>
                          {/* Day Header */}
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-black">
                              {day.dayOfWeek}
                            </span>
                            <span className="font-mono text-[11px] font-bold">
                              {day.date.slice(5)}
                            </span>
                          </div>

                          {/* Type / Topic */}
                          <div className="text-xs font-black mt-1">
                            {day.topicName}
                          </div>

                          {/* Must Problems assigned to this day */}
                          {day.mustProblems?.length > 0 && (
                            <div className="mt-2 space-y-1">
                              <span className="text-[10px] font-black uppercase tracking-wider block">
                                Target Problems:
                              </span>
                              {day.mustProblems.map((prob) => (
                                <div
                                  key={prob.id}
                                  className="text-[11px] font-bold truncate"
                                  title={`#${prob.lcNumber} ${prob.title}`}
                                >
                                  • #{prob.lcNumber} {prob.title}
                                </div>
                              ))}
                            </div>
                          )}

                          {day.notes && (
                            <p className="text-[10px] font-medium mt-1 italic">
                              {day.notes}
                            </p>
                          )}
                        </div>

                        {/* Checkbox button */}
                        <div className="pt-2 border-t-2 border-black/10 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => onToggleDay(day.date)}
                            className={`neo-btn px-2 py-1 text-[10px] font-black cursor-pointer ${
                              day.isCompleted
                                ? 'bg-black text-white'
                                : 'bg-white text-black'
                            }`}
                          >
                            {day.isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <Square className="w-3 h-3" />}
                            <span>{day.isCompleted ? 'Done' : 'Mark Done'}</span>
                          </button>
                          {isToday && (
                            <span className="text-[10px] font-black bg-black text-white px-1.5 py-0.2 rounded">
                              Today
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700">
          <p className="text-sm font-bold text-slate-700 dark:text-zinc-300">
            Configure your parameters above and click <strong>Generate Optimized Plan</strong> to build your customized roadmap!
          </p>
        </div>
      )}
    </div>
  );
};
