/**
 * Static presentation data for the Student Portal UI.
 * Shapes intentionally mirror a future REST API so screens can later be
 * wired to a Node.js backend without changing component contracts.
 */

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Exam = {
  id: string;
  title: string;
  subject: string;
  description: string;
  durationMinutes: number;
  questionCount: number;
  difficulty: Difficulty;
  attemptsAllowed: number;
  attemptsUsed: number;
  passMark: number;
  type: "Certification" | "Practice" | "Midterm" | "Final";
  scheduledFor?: string;
};

export type QuestionOption = { id: string; label: string };

export type Question = {
  id: string;
  number: number;
  prompt: string;
  options: QuestionOption[];
  correctOptionId: string;
  topic: string;
};

export type AttemptResult = {
  id: string;
  examId: string;
  examTitle: string;
  subject: string;
  date: string;
  scorePercent: number;
  correct: number;
  wrong: number;
  unanswered: number;
  durationUsed: string;
  status: "Passed" | "Failed";
};

export const student = {
  id: "stu_10428",
  name: "Amara Okonkwo",
  firstName: "Amara",
  email: "amara.okonkwo@university.edu",
  program: "BSc Computer Science",
  studentId: "CSC/2023/10428",
  cohort: "Cohort 12",
  avatarInitials: "AO",
  timezone: "Africa/Lagos",
};

export const exams: Exam[] = [
  {
    id: "exm-101",
    title: "Data Structures & Algorithms",
    subject: "Computer Science",
    description:
      "Core assessment covering arrays, linked lists, trees, graphs, sorting and complexity analysis.",
    durationMinutes: 90,
    questionCount: 60,
    difficulty: "Advanced",
    attemptsAllowed: 2,
    attemptsUsed: 0,
    passMark: 60,
    type: "Final",
    scheduledFor: "2026-08-08T09:00:00Z",
  },
  {
    id: "exm-102",
    title: "Database Systems Fundamentals",
    subject: "Information Systems",
    description: "Relational modelling, normalization, SQL querying, transactions and indexing.",
    durationMinutes: 60,
    questionCount: 45,
    difficulty: "Intermediate",
    attemptsAllowed: 3,
    attemptsUsed: 1,
    passMark: 55,
    type: "Midterm",
    scheduledFor: "2026-08-11T13:30:00Z",
  },
  {
    id: "exm-103",
    title: "Cloud Practitioner Certification",
    subject: "Cloud Computing",
    description: "Vendor-neutral cloud foundations: service models, security, billing and scaling.",
    durationMinutes: 120,
    questionCount: 75,
    difficulty: "Intermediate",
    attemptsAllowed: 1,
    attemptsUsed: 0,
    passMark: 70,
    type: "Certification",
    scheduledFor: "2026-08-19T10:00:00Z",
  },
  {
    id: "exm-104",
    title: "Discrete Mathematics Practice Set",
    subject: "Mathematics",
    description: "Untimed practice on logic, set theory, combinatorics and graph theory.",
    durationMinutes: 45,
    questionCount: 30,
    difficulty: "Beginner",
    attemptsAllowed: 5,
    attemptsUsed: 2,
    passMark: 50,
    type: "Practice",
  },
  {
    id: "exm-105",
    title: "Operating Systems Concepts",
    subject: "Computer Science",
    description: "Processes, threads, scheduling, memory management, deadlocks and file systems.",
    durationMinutes: 75,
    questionCount: 50,
    difficulty: "Advanced",
    attemptsAllowed: 2,
    attemptsUsed: 0,
    passMark: 60,
    type: "Practice",
  },
  {
    id: "exm-106",
    title: "Professional Ethics in Computing",
    subject: "General Studies",
    description: "Privacy, intellectual property, professional conduct and responsible AI.",
    durationMinutes: 40,
    questionCount: 25,
    difficulty: "Beginner",
    attemptsAllowed: 3,
    attemptsUsed: 0,
    passMark: 50,
    type: "Practice",
  },
];

export const upcomingExams = exams.filter((exam) => Boolean(exam.scheduledFor));
export const practiceExams = exams.filter((exam) => exam.type === "Practice");

export function getExam(id: string): Exam {
  return exams.find((exam) => exam.id === id) ?? (exams[0] as Exam);
}

export const questions: Question[] = [
  {
    id: "q1",
    number: 1,
    topic: "Complexity",
    prompt: "What is the average-case time complexity of a balanced binary search tree lookup?",
    options: [
      { id: "a", label: "O(1)" },
      { id: "b", label: "O(log n)" },
      { id: "c", label: "O(n)" },
      { id: "d", label: "O(n log n)" },
    ],
    correctOptionId: "b",
  },
  {
    id: "q2",
    number: 2,
    topic: "Stacks & Queues",
    prompt: "Which data structure follows the First-In-First-Out (FIFO) principle?",
    options: [
      { id: "a", label: "Stack" },
      { id: "b", label: "Queue" },
      { id: "c", label: "Binary heap" },
      { id: "d", label: "Hash table" },
    ],
    correctOptionId: "b",
  },
  {
    id: "q3",
    number: 3,
    topic: "Sorting",
    prompt: "Which sorting algorithm has the best worst-case time complexity?",
    options: [
      { id: "a", label: "Quick sort" },
      { id: "b", label: "Bubble sort" },
      { id: "c", label: "Merge sort" },
      { id: "d", label: "Insertion sort" },
    ],
    correctOptionId: "c",
  },
  {
    id: "q4",
    number: 4,
    topic: "Graphs",
    prompt: "Breadth-first search on an unweighted graph is typically implemented using a…",
    options: [
      { id: "a", label: "Priority queue" },
      { id: "b", label: "Stack" },
      { id: "c", label: "Queue" },
      { id: "d", label: "Union-find structure" },
    ],
    correctOptionId: "c",
  },
  {
    id: "q5",
    number: 5,
    topic: "Hashing",
    prompt: "Open addressing resolves hash collisions by…",
    options: [
      { id: "a", label: "Chaining entries in a linked list" },
      { id: "b", label: "Probing for the next free slot in the table" },
      { id: "c", label: "Rehashing the entire table on every insert" },
      { id: "d", label: "Storing duplicates in a secondary tree" },
    ],
    correctOptionId: "b",
  },
  {
    id: "q6",
    number: 6,
    topic: "Trees",
    prompt: "An in-order traversal of a binary search tree returns keys in which order?",
    options: [
      { id: "a", label: "Random order" },
      { id: "b", label: "Descending order" },
      { id: "c", label: "Ascending order" },
      { id: "d", label: "Level-by-level order" },
    ],
    correctOptionId: "c",
  },
  {
    id: "q7",
    number: 7,
    topic: "Recursion",
    prompt: "Which technique stores the results of expensive recursive calls for reuse?",
    options: [
      { id: "a", label: "Memoization" },
      { id: "b", label: "Backtracking" },
      { id: "c", label: "Tail elimination" },
      { id: "d", label: "Partitioning" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q8",
    number: 8,
    topic: "Arrays",
    prompt: "What is the time complexity of inserting an element at the head of a dynamic array?",
    options: [
      { id: "a", label: "O(1)" },
      { id: "b", label: "O(log n)" },
      { id: "c", label: "O(n)" },
      { id: "d", label: "O(n²)" },
    ],
    correctOptionId: "c",
  },
  {
    id: "q9",
    number: 9,
    topic: "Heaps",
    prompt: "In a min-heap, the smallest element is always located at…",
    options: [
      { id: "a", label: "Any leaf node" },
      { id: "b", label: "The root node" },
      { id: "c", label: "The right-most node" },
      { id: "d", label: "The middle of the array" },
    ],
    correctOptionId: "b",
  },
  {
    id: "q10",
    number: 10,
    topic: "Dynamic Programming",
    prompt: "Dynamic programming is most effective when a problem exhibits…",
    options: [
      { id: "a", label: "Random access patterns" },
      { id: "b", label: "Overlapping subproblems and optimal substructure" },
      { id: "c", label: "Constant memory usage" },
      { id: "d", label: "Unbounded input size" },
    ],
    correctOptionId: "b",
  },
];

export const recentResults: AttemptResult[] = [
  {
    id: "att-9001",
    examId: "exm-102",
    examTitle: "Database Systems Fundamentals",
    subject: "Information Systems",
    date: "2026-07-28",
    scorePercent: 82,
    correct: 37,
    wrong: 6,
    unanswered: 2,
    durationUsed: "51m 12s",
    status: "Passed",
  },
  {
    id: "att-9002",
    examId: "exm-104",
    examTitle: "Discrete Mathematics Practice Set",
    subject: "Mathematics",
    date: "2026-07-21",
    scorePercent: 74,
    correct: 22,
    wrong: 7,
    unanswered: 1,
    durationUsed: "38m 04s",
    status: "Passed",
  },
  {
    id: "att-9003",
    examId: "exm-105",
    examTitle: "Operating Systems Concepts",
    subject: "Computer Science",
    date: "2026-07-14",
    scorePercent: 48,
    correct: 24,
    wrong: 24,
    unanswered: 2,
    durationUsed: "72m 45s",
    status: "Failed",
  },
  {
    id: "att-9004",
    examId: "exm-106",
    examTitle: "Professional Ethics in Computing",
    subject: "General Studies",
    date: "2026-07-02",
    scorePercent: 91,
    correct: 23,
    wrong: 2,
    unanswered: 0,
    durationUsed: "24m 30s",
    status: "Passed",
  },
  {
    id: "att-9005",
    examId: "exm-101",
    examTitle: "Data Structures & Algorithms",
    subject: "Computer Science",
    date: "2026-06-25",
    scorePercent: 67,
    correct: 40,
    wrong: 18,
    unanswered: 2,
    durationUsed: "88m 10s",
    status: "Passed",
  },
];

export const performanceTrend = [
  { month: "Feb", score: 58 },
  { month: "Mar", score: 63 },
  { month: "Apr", score: 61 },
  { month: "May", score: 70 },
  { month: "Jun", score: 76 },
  { month: "Jul", score: 82 },
];

export const subjectPerformance = [
  { subject: "Algorithms", score: 78 },
  { subject: "Databases", score: 86 },
  { subject: "Cloud", score: 69 },
  { subject: "Maths", score: 74 },
  { subject: "Ethics", score: 91 },
];

export const leaderboard = [
  { rank: 1, name: "Daniel Mbeki", initials: "DM", score: 94, cohort: "Cohort 12" },
  { rank: 2, name: "Sofia Reyes", initials: "SR", score: 91, cohort: "Cohort 11" },
  { rank: 3, name: "Amara Okonkwo", initials: "AO", score: 88, cohort: "Cohort 12", isCurrentUser: true },
  { rank: 4, name: "Liam Novak", initials: "LN", score: 86, cohort: "Cohort 12" },
  { rank: 5, name: "Priya Nair", initials: "PN", score: 84, cohort: "Cohort 10" },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  category: "Exam" | "Result" | "System" | "Reminder";
  unread: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Data Structures final opens in 3 days",
    body: "Your scheduled sitting begins Saturday 09:00. Review the instructions before you start.",
    time: "2 hours ago",
    category: "Exam",
    unread: true,
  },
  {
    id: "n2",
    title: "Result published: Database Systems",
    body: "You scored 82% and passed. A detailed breakdown is available on your result page.",
    time: "Yesterday",
    category: "Result",
    unread: true,
  },
  {
    id: "n3",
    title: "New practice set added",
    body: "Operating Systems Concepts now has 50 refreshed questions with explanations.",
    time: "2 days ago",
    category: "System",
    unread: false,
  },
  {
    id: "n4",
    title: "Browser check recommended",
    body: "Run the readiness check before your certification exam to avoid interruptions.",
    time: "4 days ago",
    category: "Reminder",
    unread: false,
  },
  {
    id: "n5",
    title: "Cloud Practitioner registration confirmed",
    body: "Your seat for 19 August is confirmed. One attempt is allowed for this certification.",
    time: "1 week ago",
    category: "Exam",
    unread: false,
  },
];

export const calendarEvents = [
  { date: "2026-08-08", label: "DSA Final", tone: "primary" as const },
  { date: "2026-08-11", label: "Databases Midterm", tone: "info" as const },
  { date: "2026-08-19", label: "Cloud Certification", tone: "warning" as const },
];
