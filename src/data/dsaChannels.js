// Curated Research on the Most Popular & Authoritative DSA Channels & Playlists

export const CHANNEL_CATEGORIES = [
  'All',
  'SDE Sheets & Placement',
  'Visual LeetCode Patterns',
  'Theory & Deep Intuition',
  'Beginner Handholding',
  'Language Specialists'
];

export const LANGUAGE_FILTERS = ['All', 'C++', 'Java', 'Python', 'Hinglish', 'English'];

export const DSA_CHANNELS = [
  {
    id: 'takeuforward',
    name: 'takeUforward',
    creator: 'Raj Vikramaditya (Striver)',
    subscribers: '1.2M+',
    avatarBg: '#FFDE59',
    badge: '👑 Placement Gold Standard',
    tagline: 'Ex-Google / Media.net engineer. Undisputed #1 for Indian campus & off-campus placement prep.',
    primaryLanguage: 'Hinglish',
    supportedCodingLanguages: ['C++', 'Java', 'Python'],
    category: 'SDE Sheets & Placement',
    youtubeUrl: 'https://www.youtube.com/@takeUforward',
    recommendedFor: 'Students & working professionals aiming for Tier-1 / FAANG placement with structured roadmaps.',
    signatureOfferings: [
      {
        title: 'A2Z DSA Course & Sheet',
        desc: 'Exhaustive 450+ problem structured progression from Step 1 basics to advanced DP & Graphs.',
        link: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/'
      },
      {
        title: 'Striver SDE Sheet (180 Questions)',
        desc: 'Most requested last-month placement revision sheet by Indian engineers.',
        link: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/'
      },
      {
        title: 'Dynamic Programming Masterclass',
        desc: '56-video legendary playlist covering Memoization, Tabulation, Space Optimization.',
        link: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5SRtS3UxjR9PTUHHMm'
      },
      {
        title: 'Graph Series by Striver',
        desc: 'BFS, DFS, Dijkstra, Bellman-Ford, Disjoint Set Union with intuition.',
        link: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn'
      }
    ],
    strengths: [
      'Problem-first approach: brute force → better → optimal solution progression',
      'Rigorous time and space complexity mathematical proof',
      'Dedicated free visual sheets with code in C++, Java, and Python'
    ]
  },
  {
    id: 'neetcode',
    name: 'NeetCode',
    creator: 'Navdeep Singh (Ex-Google)',
    subscribers: '850K+',
    avatarBg: '#A7F3D0',
    badge: '🌟 Global LeetCode Leader',
    tagline: 'Clean whiteboard diagrams, zero fluff, and intuitive pattern-based problem solving.',
    primaryLanguage: 'English',
    supportedCodingLanguages: ['Python', 'C++', 'Java', 'JavaScript'],
    category: 'Visual LeetCode Patterns',
    youtubeUrl: 'https://www.youtube.com/@NeetCode',
    recommendedFor: 'Learners who want clean English explanations, hate rote memorization, and prefer 15-minute conceptual breakdowns.',
    signatureOfferings: [
      {
        title: 'NeetCode 150 Roadmap',
        desc: '18 categories mapped logically from Two Pointers to Backtracking & Dynamic Programming.',
        link: 'https://neetcode.io/practice'
      },
      {
        title: 'Blind 75 Curated Explanations',
        desc: 'The essential 75 LeetCode questions solved on interactive whiteboards.',
        link: 'https://neetcode.io/practice?tab=blind75'
      },
      {
        title: 'NeetCode All (400+ Problems)',
        desc: 'Complete archive of LeetCode hard and medium challenges.',
        link: 'https://neetcode.io/practice?tab=all'
      }
    ],
    strengths: [
      'Visual whiteboard diagrams dry-running every pointer move',
      'Strictly pattern-focused (Sliding Window, Monotonic Stack, Two Pointers)',
      'Extremely clean, idiomatic Python code with minimal boilerplate'
    ]
  },
  {
    id: 'abdul_bari',
    name: 'Abdul Bari',
    creator: 'Prof. Abdul Bari',
    subscribers: '1.1M+',
    avatarBg: '#C4B5FD',
    badge: '🧠 Conceptual & Academic Legend',
    tagline: 'The university professor loved by millions for pen-and-paper algorithm visualizations.',
    primaryLanguage: 'English',
    supportedCodingLanguages: ['C++', 'Java', 'Pseudocode'],
    category: 'Theory & Deep Intuition',
    youtubeUrl: 'https://www.youtube.com/@abdul_bari',
    recommendedFor: 'Anyone failing to understand "why" an algorithm works under the hood or preparing for semester/GATE exams.',
    signatureOfferings: [
      {
        title: 'Algorithms Master Playlist (84 Videos)',
        desc: 'Asymptotic notation, Divide & Conquer, Greedy Method, Dynamic Programming.',
        link: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O'
      },
      {
        title: 'Dynamic Programming: 0/1 Knapsack & Bellman-Ford',
        desc: 'Step-by-step matrix table fill-ups explained visually on paper.',
        link: 'https://www.youtube.com/watch?v=nLmhmB6NzcM'
      },
      {
        title: 'Data Structures and Algorithms in C/C++',
        desc: 'Pointers, memory addresses, linked lists, and binary trees from scratch.',
        link: 'https://www.youtube.com/@abdul_bari/playlists'
      }
    ],
    strengths: [
      'Timeless mathematical intuition: you never forget once he explains on paper',
      'Deep dive into Recurrence Relations (Master Theorem, Substitution Method)',
      'Unmatched for algorithm design paradigms (Greedy vs DP vs Backtracking)'
    ]
  },
  {
    id: 'love_babbar',
    name: 'Love Babbar (CodeHelp)',
    creator: 'Love Babbar (Ex-Amazon, Microsoft)',
    subscribers: '1.3M+',
    avatarBg: '#FED7AA',
    badge: '🔥 Beginner Handholding Specialist',
    tagline: 'High-energy Hindi guidance taking beginners from zero programming to advanced placement DSA in C++.',
    primaryLanguage: 'Hinglish',
    supportedCodingLanguages: ['C++'],
    category: 'Beginner Handholding',
    youtubeUrl: 'https://www.youtube.com/@LoveBabbar',
    recommendedFor: 'College freshmen or career switchers who need friendly handholding and step-by-step motivation in Hindi.',
    signatureOfferings: [
      {
        title: 'Supreme DSA Placement Series (C++)',
        desc: '150+ comprehensive lectures covering C++ basics up to Trie, DP, and Segment Trees.',
        link: 'https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA'
      },
      {
        title: 'Love Babbar 450 DSA Sheet',
        desc: 'Classic collection of 450 topic-wise problems for college recruitment drives.',
        link: 'https://www.youtube.com/@LoveBabbar'
      },
      {
        title: 'Recursion & Backtracking Marathon',
        desc: 'Day-by-day recursion tree tracing and memory stack breakdown.',
        link: 'https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA'
      }
    ],
    strengths: [
      'Warm, encouraging teaching style that removes programming fear',
      'Live code along in Visual Studio Code with dry runs',
      'Covers practical edge cases that trip up college students in interviews'
    ]
  },
  {
    id: 'kunal_kushwaha',
    name: 'Kunal Kushwaha',
    creator: 'Kunal Kushwaha (Community Classroom)',
    subscribers: '700K+',
    avatarBg: '#BAE6FD',
    badge: '☕ Best DSA in Java',
    tagline: 'Modern, open-source champion teaching clean DSA in Java along with Git, Linux, and developer roadmaps.',
    primaryLanguage: 'English',
    supportedCodingLanguages: ['Java'],
    category: 'Language Specialists',
    youtubeUrl: 'https://www.youtube.com/@KunalKushwaha',
    recommendedFor: 'Java enthusiasts who want a modern open-source curriculum paired with comprehensive assignments.',
    signatureOfferings: [
      {
        title: 'Complete Java + DSA Bootcamp',
        desc: 'Comprehensive free course on Java syntax, OOP, time complexity, and LeetCode problems.',
        link: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ'
      },
      {
        title: 'Recursion & Backtracking Series in Java',
        desc: 'Detailed subset generation, permutations, N-Queens with recursion trees.',
        link: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnp39cTyB1dTZ2pJ04hmdrod'
      },
      {
        title: 'Binary Search Deep Dive',
        desc: 'Agile problem solving on order-agnostic binary search and ceiling numbers.',
        link: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ'
      }
    ],
    strengths: [
      'The #1 dedicated Java playlist: no need to translate from C++ or Python',
      'Free GitHub repository with hundreds of practice assignments and solutions',
      'Teaches modern Git, debugging tools, and open-source practices alongside DSA'
    ]
  },
  {
    id: 'apna_college',
    name: 'Apna College',
    creator: 'Shradha Khapra & Aman Dhattarwal',
    subscribers: '5M+',
    avatarBg: '#FECDD3',
    badge: '🎓 College Placement Favorite',
    tagline: 'Visually appealing, structured college placement prep in Java & C++ with crisp animated slide notes.',
    primaryLanguage: 'Hinglish',
    supportedCodingLanguages: ['Java', 'C++'],
    category: 'Beginner Handholding',
    youtubeUrl: 'https://www.youtube.com/@ApnaCollegeOfficial',
    recommendedFor: 'College students who love high-production slides, animated diagrams, and structured semester pacing.',
    signatureOfferings: [
      {
        title: 'Java & DSA Full Placement Course',
        desc: 'From basic loops to Binary Trees, BSTs, and Trie with animated diagrams.',
        link: 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop'
      },
      {
        title: 'C++ DSA Complete Course',
        desc: 'Foundations of Object-Oriented Programming and essential data structures.',
        link: 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ'
      }
    ],
    strengths: [
      'Beautiful animated lecture slides and downloadable cheat sheet summaries',
      'Great pacing for complete beginners coming from non-tech branches',
      'Direct focus on campus placement aptitude and interview rounds'
    ]
  },
  {
    id: 'william_fiset',
    name: 'William Fiset',
    creator: 'William Fiset (ICPC World Finalist)',
    subscribers: '250K+',
    avatarBg: '#DDD6FE',
    badge: '🕸️ Graph & Tree Master',
    tagline: 'ACM-ICPC World Finalist with the internet’s most stunning graph and tree algorithmic animations.',
    primaryLanguage: 'English',
    supportedCodingLanguages: ['Java', 'C++'],
    category: 'Theory & Deep Intuition',
    youtubeUrl: 'https://www.youtube.com/@WilliamFiset-videos',
    recommendedFor: 'Anyone struggling with Graph theory, Network Flow, Tarjan’s Strongly Connected Components, or Fenwick Trees.',
    signatureOfferings: [
      {
        title: 'Graph Theory Algorithms Visual Series',
        desc: 'Eulerian paths, Bridges, Articulation points, Dijkstra, Floyd-Warshall, and Prim’s MST.',
        link: 'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P'
      },
      {
        title: 'Data Structures Visual Walkthrough',
        desc: 'Fenwick Trees, Segment Trees, AVL Trees, and Indexed Priority Queues.',
        link: 'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsB6SWUrDFW2RmDotAfPbeHu'
      }
    ],
    strengths: [
      'Unrivaled custom animated graphics showing graphs traversing in real-time',
      'Clean open-source Java algorithms library on GitHub',
      'Covers advanced algorithms that other creators skip (Tarjan, Edmonds-Karp, Dinic)'
    ]
  },
  {
    id: 'errichto',
    name: 'Errichto Algorithms',
    creator: 'Kamil Debowski (Errichto - TopCoder Red)',
    subscribers: '320K+',
    avatarBg: '#FEF08A',
    badge: '⚡ Competitive Programming Legend',
    tagline: 'World-renowned competitive programmer teaching binary search, DP states, and speed problem-solving.',
    primaryLanguage: 'English',
    supportedCodingLanguages: ['C++'],
    category: 'Visual LeetCode Patterns',
    youtubeUrl: 'https://www.youtube.com/@Errichto',
    recommendedFor: 'Intermediate to advanced coders wanting to master contest strategies, binary search invariants, and bit manipulation.',
    signatureOfferings: [
      {
        title: 'Dynamic Programming Tutorials (Interactive)',
        desc: 'Explaining states, transitions, digit DP, and iterative table transformations.',
        link: 'https://www.youtube.com/playlist?list=PLl0KD3g-oDOGJUdmhFk19H46Rw9X9IHyh'
      },
      {
        title: 'Binary Search Beyond The Basics',
        desc: 'Monotonic predicates, binary search on answer range, and ternary search.',
        link: 'https://www.youtube.com/watch?v=GU7DpgHINWQ'
      }
    ],
    strengths: [
      'Teaches how to think like a competitive programmer in speed tests (Google kickstart / OA)',
      'In-depth breakdown of tricky time complexity edge cases',
      'Masterclasses on bitwise operations and interval queries'
    ]
  },
  {
    id: 'techdose',
    name: 'Tech Dose',
    creator: 'Surya (Tech Dose)',
    subscribers: '280K+',
    avatarBg: '#BAE6FD',
    badge: '⏱️ Quick Problem Sprints',
    tagline: '5 to 10-minute concise visual LeetCode problem breakdowns for fast revision before coding rounds.',
    primaryLanguage: 'English',
    supportedCodingLanguages: ['C++', 'Python'],
    category: 'Visual LeetCode Patterns',
    youtubeUrl: 'https://www.youtube.com/@TechDose',
    recommendedFor: 'Quick revision of specific popular problems 1 hour before an OA or interview round.',
    signatureOfferings: [
      {
        title: 'Top 100 Liked LeetCode Solutions',
        desc: 'Trapping Rain Water, Word Break, Median of Two Sorted Arrays visual walkthroughs.',
        link: 'https://www.youtube.com/@TechDose/playlists'
      },
      {
        title: 'Sliding Window & Two Pointer Sprint',
        desc: 'Concise 8-minute intuition builders for frequent campus interview questions.',
        link: 'https://www.youtube.com/@TechDose'
      }
    ],
    strengths: [
      'Short, punchy video lengths (no 1-hour bloated content)',
      'Clear diagrammatic representations on slide canvases',
      'Provides quick trade-off comparisons between brute and optimal'
    ]
  }
];
