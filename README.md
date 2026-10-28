# DSA Strategy Hub 🚀
*Placement & Off-Campus Hiring Preparation Platform (India, Java-Focused)*

DSA Strategy Hub is a complete, production-ready web application built to help engineering students preparing for technical interviews and Online Assessments (OAs). It eliminates prep anxiety by telling you **what to solve next**, **how to think about problems using Socratic hint ladders**, and **when to revise using automated spaced repetition**.

---

## 🌟 Core Features

1. **Sequenced 14-Topic Roadmap**
   - Strictly ordered from foundational to advanced: *Sliding Window*, *Hashing + Prefix Sum*, *Strings*, *Binary Search*, *Stack + Queue*, *Sorting + Intervals*, *Linked List*, *Recursion + Backtracking*, *Trees*, *Heap*, *Greedy*, *Graphs*, *Dynamic Programming*, *Trie + Bit Manipulation*.
   - Concept summaries, core pattern definitions, and curated LeetCode problem sets (8–12 per topic).
   - Filter by Difficulty (Easy/Medium/Hard), Tag (Must/Good/Bonus), Company (Amazon, Microsoft, Flipkart, Adobe, TCS, Infosys, Wipro), and Status.
   - **Must-Only Mode** toggle for high-yield preparation.

2. **4-Stage Socratic Hint Ladder**
   - **Hint 1:** Which pattern is this?
   - **Hint 2:** Key idea in one line.
   - **Hint 3:** Approach in pseudo-code.
   - **Hint 4:** Complete Java solution (with syntax highlighting, copy button, and precise Time/Space complexities).
   - Automated detection: If a student uses Hint 3 or 4, the app suggests marking the problem **"Struggled"**.
   - Built-in **40-minute mock countdown timer**.

3. **Adaptive Personalized Study Planner**
   - Inputs: Start Date, Target Deadline, Hours/Day, Days/Week, Target (Product vs Service companies), and completed topics.
   - Weights allocation scaled down gracefully for short timelines.
   - Preserves high-yield topics (**Trees** and **DP**) while cutting lower-yield topics (**Trie/Bit**, **Greedy**) if deadlines are compressed.
   - Outputs a week-by-week calendar with daily Must problem assignments, weekly revision buffers, and end-of-plan mock OA blocks.
   - Checkbox accountability: tick off completed days directly on the calendar or Dashboard.

4. **Automated Spaced Revision Engine**
   - Problems marked **"Struggled"** are automatically scheduled at **+1 day**, **+7 days**, and **+30 days**.
   - "Revise Today" queue alerts users to pending revisions.
   - Passing a revision advances the problem; failing resets the interval back to day 1.

5. **"Which Pattern Is This?" Helper**
   - Interactive clue chips: *Sorted Array*, *Contiguous Subarray*, *Longest/Shortest*, *K-th Element*, *Dependencies*, *Search Space*, etc.
   - Real-time rule-based pattern matching (top 3 patterns with confidence scores, justifications, and direct links to practice problems).

6. **Constraint → Complexity Guide**
   - Interactive input size selector ($N \le 10$, $N \le 20$, $N \le 500$, $N \le 10^4$, $N \le 10^5$, $N \le 10^6$, $N \le 10^9$).
   - Displays maximum allowed time complexity, operation budget, and candidate algorithms.

7. **Pattern Notes & Java Cheat Sheets**
   - 9 standard boilerplate template cards with copy buttons: Fixed Sliding Window, Variable Sliding Window (Longest & Shortest), Classic Binary Search, Binary Search on Answer Space, BFS, Backtracking, Union-Find, Monotonic Stack, and 1D DP.
   - Personal Notebook: capture searchable one-line **Problem → Pattern → Trick** notes.

8. **Dashboard & Mistake Journal**
   - Daily streak counter 🔥 with best streak memory.
   - Weekly goal completion ring.
   - Categorized mistake journal (Wrong Pattern, Edge Case, TLE, Unknown Concept, Silly Bug) with visual distribution bars.
   - **Export / Import:** Full backup and restore via single-click JSON files without any cloud lock-in.

9. **40-Minute Mock OA Assessment Simulator (`/mock`)**
   - Realistic exam pressure simulation with 40-minute countdown.
   - Configurable for company pools (*Amazon, Microsoft, Flipkart, Adobe, TCS/Infosys*) and difficulty profiles (*Standard Balanced* vs *FAANG Hard*).
   - Dynamic 100-point scoring engine penalizing hint reliance.
   - In-session code scratchpad (Python, Java, C++, JS) and historical assessment logs.

10. **High-Performance AI Socratic Caching**
   - In-memory 24-hour LRU response cache on `/api/chat/socratic` eliminating redundant AI API calls.
   - Instant sub-5ms response latency on repeated queries.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4 + Vanilla modern UI tokens
- **Icons:** Lucide React
- **Persistence:** LocalStorage abstraction layer (`/src/services/storageService.js`)
- **Architecture:** Zero backend required for MVP; clean storage interface ready for REST/GraphQL migration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Setup Steps
```bash
# 1. Clone repository & navigate into workspace
cd "chatbot DSA"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```
Visit `http://localhost:5173` in your browser.

---

## 📁 Folder Structure Overview

```text
├── index.html                   # HTML5 shell with Google Fonts
├── vite.config.js               # Vite + React + Tailwind CSS configuration
├── package.json                 # Scripts and dependencies
├── src/
│   ├── main.jsx                 # Vite React root mounting
│   ├── App.jsx                  # Main application router and modal state orchestrator
│   ├── index.css                # Tailwind CSS v4 directives & theme styles
│   ├── data/
│   │   ├── topics.js            # 14 topics with summaries, base weights, and pattern tags
│   │   ├── problems.js          # Curated LeetCode problem bank with 4-stage hints & Java solutions
│   │   ├── javaTemplates.js     # 9 standard Java pattern boilerplate cards
│   │   ├── complexityRules.js   # Constraint matrix (N to O(...) mapping)
│   │   └── patternHelperRules.js# Clue chips and rule-based pattern inference logic
│   ├── services/
│   │   └── storageService.js    # LocalStorage service layer (progress, notes, plans, export/import)
│   ├── utils/
│   │   ├── plannerScheduler.js  # Pure functional week-by-week study planner algorithm
│   │   └── patternMatcher.js    # Pure functional clue chip pattern inference engine
│   ├── hooks/
│   │   ├── useUserData.js       # Synchronized global user progress and notes hook
│   │   └── useTheme.js          # Dark and light mode state hook
│   ├── components/
│   │   ├── Navbar.jsx           # Top header with quick stats, theme switch & JSON export
│   │   ├── Sidebar.jsx          # Desktop side navigation
│   │   ├── MobileNav.jsx        # Mobile-friendly bottom navigation
│   │   ├── ProblemCard.jsx      # Problem listing card with difficulty, tags, status pills
│   │   ├── HintLadderDrawer.jsx # 4-stage sequential hint ladder with Java code & copy
│   │   ├── StruggleModal.jsx    # Mistake journal categorizer dialog
│   │   ├── PersonalNoteModal.jsx# Problem -> Pattern -> Trick notebook modal
│   │   ├── MockTimer.jsx        # 40-minute interview countdown timer
│   │   ├── ProgressBar.jsx      # Reusable progress bar with color themes
│   │   └── EmptyState.jsx       # Clean empty state screens
│   └── pages/
│       ├── DashboardPage.jsx    # Home dashboard with streak, tasks, and mistake charts
│       ├── RoadmapPage.jsx      # 14 sequenced topics overview
│       ├── TopicDetailPage.jsx  # Curated problems list with filters and Must-only mode
│       ├── StudyPlannerPage.jsx # Adaptive study scheduler and calendar
│       ├── RevisionPage.jsx     # Spaced repetition queue (+1, +7, +30 days)
│       ├── PatternHelperPage.jsx# Interactive clue chip pattern solver
│       ├── ComplexityGuidePage.jsx# Interactive constraint picker
│       └── TemplatesPage.jsx    # Java cheat sheets and personal trick notebook
```

---

## ➕ How to Add New Topics or Problems

### Adding a New Problem
Open `/src/data/problems.js` and append a new problem object:
```javascript
{
  id: '15',
  lcNumber: 15,
  title: '3Sum',
  topicId: 'strings', // ID of the topic from topics.js
  difficulty: 'Medium', // 'Easy' | 'Medium' | 'Hard'
  pattern: 'Two Pointers on Sorted Array',
  tag: 'Must', // 'Must' | 'Good' | 'Bonus'
  companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
  link: 'https://leetcode.com/problems/3sum/',
  hints: {
    hint1: 'Sort the array first. Fix the first element with a loop, then use two pointers for the remaining two elements.',
    hint2: 'Skip duplicate elements for both the outer loop and the two pointers to avoid duplicate triplets.',
    hint3: '// for i = 0 to n-3:\n//   left = i + 1, right = n - 1\n//   while left < right: check nums[i] + nums[left] + nums[right]',
    hint4: {
      javaSolution: `// Java solution code here...`,
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1) excluding output list',
      explanation: 'Sorting brings identical numbers together and allows converging two pointers.'
    }
  }
}
```

### Adding a New Topic
Open `/src/data/topics.js` and add an entry:
```javascript
{
  id: 'segment-tree',
  name: 'Segment Tree & Fenwick Tree',
  order: 15,
  importance: 'Tier 3',
  baseWeightDays: 3,
  shortSummary: 'Point updates and range queries in O(log n) time.',
  patterns: [
    'Range Sum Query (Point Update)',
    'Range Minimum Query',
    'Binary Indexed Tree (Fenwick)'
  ],
  icon: 'Layers'
}
```
The roadmap, filters, and study planner will automatically integrate the new content!
