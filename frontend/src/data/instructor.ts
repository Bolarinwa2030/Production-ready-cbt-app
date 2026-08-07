/**
 * Static presentation data for the Instructor Portal (Phase 2).
 * Shapes mirror a future REST API so screens can be wired to a backend
 * without changing any component contracts.
 */

import type { Difficulty } from "@/data/student";

export const instructor = {
  id: "ins_2041",
  name: "Dr. Nkem Adeyemi",
  firstName: "Nkem",
  email: "nkem.adeyemi@university.edu",
  title: "Senior Lecturer, Computer Science",
  staffId: "STF/CS/2041",
  department: "Computer Science",
  avatarInitials: "NA",
  timezone: "Africa/Lagos",
};

export type QuestionType = "Multiple choice" | "True / False" | "Short answer" | "Essay";

export type BankQuestion = {
  id: string;
  prompt: string;
  subject: string;
  topic: string;
  type: QuestionType;
  difficulty: Difficulty;
  marks: number;
  usedInExams: number;
  status: "Published" | "Draft" | "Archived";
  updatedAt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanation: string;
};

export const bankQuestions: BankQuestion[] = [
  {
    id: "qb-001",
    prompt: "What is the average-case time complexity of a balanced binary search tree lookup?",
    subject: "Computer Science",
    topic: "Complexity",
    type: "Multiple choice",
    difficulty: "Intermediate",
    marks: 2,
    usedInExams: 4,
    status: "Published",
    updatedAt: "2026-08-02",
    options: [
      { id: "a", label: "O(1)" },
      { id: "b", label: "O(log n)" },
      { id: "c", label: "O(n)" },
      { id: "d", label: "O(n log n)" },
    ],
    correctOptionId: "b",
    explanation: "A balanced BST halves the search space at every level, giving O(log n).",
  },
  {
    id: "qb-002",
    prompt: "Third normal form removes transitive dependencies from a relation.",
    subject: "Information Systems",
    topic: "Normalization",
    type: "True / False",
    difficulty: "Beginner",
    marks: 1,
    usedInExams: 6,
    status: "Published",
    updatedAt: "2026-07-30",
    options: [
      { id: "a", label: "True" },
      { id: "b", label: "False" },
    ],
    correctOptionId: "a",
    explanation: "3NF requires that no non-key attribute depends transitively on the primary key.",
  },
  {
    id: "qb-003",
    prompt: "Which scheduling algorithm can cause starvation of low-priority processes?",
    subject: "Computer Science",
    topic: "Operating Systems",
    type: "Multiple choice",
    difficulty: "Advanced",
    marks: 3,
    usedInExams: 2,
    status: "Published",
    updatedAt: "2026-07-27",
    options: [
      { id: "a", label: "Round robin" },
      { id: "b", label: "First come first served" },
      { id: "c", label: "Priority scheduling" },
      { id: "d", label: "Shortest remaining time first" },
    ],
    correctOptionId: "c",
    explanation: "Without ageing, high-priority arrivals can indefinitely delay low-priority jobs.",
  },
  {
    id: "qb-004",
    prompt: "Explain the trade-offs between horizontal and vertical scaling in cloud architectures.",
    subject: "Cloud Computing",
    topic: "Scalability",
    type: "Essay",
    difficulty: "Advanced",
    marks: 10,
    usedInExams: 1,
    status: "Draft",
    updatedAt: "2026-08-04",
    options: [],
    correctOptionId: "",
    explanation: "Expect coverage of cost, elasticity, statefulness and failure domains.",
  },
  {
    id: "qb-005",
    prompt: "Name the hashing strategy that resolves collisions by probing the next free slot.",
    subject: "Computer Science",
    topic: "Hashing",
    type: "Short answer",
    difficulty: "Intermediate",
    marks: 2,
    usedInExams: 3,
    status: "Published",
    updatedAt: "2026-07-19",
    options: [],
    correctOptionId: "",
    explanation: "Accept 'open addressing' (linear or quadratic probing).",
  },
  {
    id: "qb-006",
    prompt: "Which SQL clause filters rows after aggregation has been applied?",
    subject: "Information Systems",
    topic: "SQL",
    type: "Multiple choice",
    difficulty: "Beginner",
    marks: 1,
    usedInExams: 5,
    status: "Published",
    updatedAt: "2026-07-12",
    options: [
      { id: "a", label: "WHERE" },
      { id: "b", label: "HAVING" },
      { id: "c", label: "GROUP BY" },
      { id: "d", label: "ORDER BY" },
    ],
    correctOptionId: "b",
    explanation: "HAVING applies to grouped results; WHERE applies before grouping.",
  },
  {
    id: "qb-007",
    prompt: "A deadlock requires mutual exclusion, hold and wait, no preemption and circular wait.",
    subject: "Computer Science",
    topic: "Concurrency",
    type: "True / False",
    difficulty: "Intermediate",
    marks: 1,
    usedInExams: 2,
    status: "Archived",
    updatedAt: "2026-06-28",
    options: [
      { id: "a", label: "True" },
      { id: "b", label: "False" },
    ],
    correctOptionId: "a",
    explanation: "These are the four Coffman conditions.",
  },
  {
    id: "qb-008",
    prompt: "Which principle states that a user should have only the permissions they need?",
    subject: "General Studies",
    topic: "Security Ethics",
    type: "Multiple choice",
    difficulty: "Beginner",
    marks: 2,
    usedInExams: 3,
    status: "Published",
    updatedAt: "2026-08-01",
    options: [
      { id: "a", label: "Defence in depth" },
      { id: "b", label: "Least privilege" },
      { id: "c", label: "Separation of duties" },
      { id: "d", label: "Fail-safe defaults" },
    ],
    correctOptionId: "b",
    explanation: "Least privilege limits blast radius when an account is compromised.",
  },
];

export function getBankQuestion(id: string): BankQuestion {
  return bankQuestions.find((q) => q.id === id) ?? (bankQuestions[0] as BankQuestion);
}

export const questionSubjects = [
  "Computer Science",
  "Information Systems",
  "Cloud Computing",
  "Mathematics",
  "General Studies",
];

export type ManagedExam = {
  id: string;
  title: string;
  subject: string;
  cohort: string;
  questions: number;
  durationMinutes: number;
  status: "Published" | "Scheduled" | "Draft" | "Closed";
  scheduledFor?: string;
  submissions: number;
  enrolled: number;
  averageScore: number;
};

export const managedExams: ManagedExam[] = [
  {
    id: "exm-101",
    title: "Data Structures & Algorithms",
    subject: "Computer Science",
    cohort: "Cohort 12",
    questions: 60,
    durationMinutes: 90,
    status: "Scheduled",
    scheduledFor: "2026-08-08T09:00:00Z",
    submissions: 0,
    enrolled: 148,
    averageScore: 0,
  },
  {
    id: "exm-102",
    title: "Database Systems Fundamentals",
    subject: "Information Systems",
    cohort: "Cohort 11",
    questions: 45,
    durationMinutes: 60,
    status: "Published",
    scheduledFor: "2026-08-11T13:30:00Z",
    submissions: 96,
    enrolled: 132,
    averageScore: 74,
  },
  {
    id: "exm-105",
    title: "Operating Systems Concepts",
    subject: "Computer Science",
    cohort: "Cohort 12",
    questions: 50,
    durationMinutes: 75,
    status: "Closed",
    submissions: 141,
    enrolled: 148,
    averageScore: 68,
  },
  {
    id: "exm-108",
    title: "Cloud Architecture Capstone",
    subject: "Cloud Computing",
    cohort: "Cohort 10",
    questions: 30,
    durationMinutes: 120,
    status: "Draft",
    submissions: 0,
    enrolled: 87,
    averageScore: 0,
  },
];

export type StudentSubmission = {
  id: string;
  student: string;
  initials: string;
  studentId: string;
  examId: string;
  examTitle: string;
  cohort: string;
  submittedAt: string;
  durationUsed: string;
  scorePercent: number;
  status: "Passed" | "Failed";
  grading: "Auto-graded" | "Needs review" | "Graded";
};

export const submissions: StudentSubmission[] = [
  {
    id: "sub-5501",
    student: "Amara Okonkwo",
    initials: "AO",
    studentId: "CSC/2023/10428",
    examId: "exm-102",
    examTitle: "Database Systems Fundamentals",
    cohort: "Cohort 11",
    submittedAt: "2026-08-05T11:12:00Z",
    durationUsed: "51m 12s",
    scorePercent: 82,
    status: "Passed",
    grading: "Auto-graded",
  },
  {
    id: "sub-5502",
    student: "Daniel Mbeki",
    initials: "DM",
    studentId: "CSC/2023/10119",
    examId: "exm-102",
    examTitle: "Database Systems Fundamentals",
    cohort: "Cohort 11",
    submittedAt: "2026-08-05T11:04:00Z",
    durationUsed: "44m 51s",
    scorePercent: 94,
    status: "Passed",
    grading: "Auto-graded",
  },
  {
    id: "sub-5503",
    student: "Sofia Reyes",
    initials: "SR",
    studentId: "CSC/2022/09733",
    examId: "exm-105",
    examTitle: "Operating Systems Concepts",
    cohort: "Cohort 12",
    submittedAt: "2026-08-04T15:47:00Z",
    durationUsed: "70m 08s",
    scorePercent: 61,
    status: "Passed",
    grading: "Needs review",
  },
  {
    id: "sub-5504",
    student: "Tobias Lund",
    initials: "TL",
    studentId: "CSC/2023/10502",
    examId: "exm-105",
    examTitle: "Operating Systems Concepts",
    cohort: "Cohort 12",
    submittedAt: "2026-08-04T15:31:00Z",
    durationUsed: "74m 22s",
    scorePercent: 47,
    status: "Failed",
    grading: "Graded",
  },
  {
    id: "sub-5505",
    student: "Priya Nair",
    initials: "PN",
    studentId: "CSC/2022/09611",
    examId: "exm-102",
    examTitle: "Database Systems Fundamentals",
    cohort: "Cohort 11",
    submittedAt: "2026-08-05T10:22:00Z",
    durationUsed: "58m 40s",
    scorePercent: 78,
    status: "Passed",
    grading: "Auto-graded",
  },
  {
    id: "sub-5506",
    student: "Kwame Boateng",
    initials: "KB",
    studentId: "CSC/2023/10488",
    examId: "exm-105",
    examTitle: "Operating Systems Concepts",
    cohort: "Cohort 12",
    submittedAt: "2026-08-04T14:58:00Z",
    durationUsed: "66m 03s",
    scorePercent: 55,
    status: "Failed",
    grading: "Needs review",
  },
];

export const cohortPerformance = [
  { month: "Feb", average: 62, submissions: 88 },
  { month: "Mar", average: 65, submissions: 104 },
  { month: "Apr", average: 64, submissions: 96 },
  { month: "May", average: 71, submissions: 131 },
  { month: "Jun", average: 73, submissions: 142 },
  { month: "Jul", average: 76, submissions: 168 },
];

export const scoreDistribution = [
  { band: "0–39", students: 12 },
  { band: "40–54", students: 31 },
  { band: "55–69", students: 74 },
  { band: "70–84", students: 96 },
  { band: "85–100", students: 48 },
];

export const topicDifficulty = [
  { topic: "Concurrency", correctRate: 48 },
  { topic: "Complexity", correctRate: 57 },
  { topic: "Normalization", correctRate: 66 },
  { topic: "SQL", correctRate: 79 },
  { topic: "Security Ethics", correctRate: 88 },
];

export type ReportItem = {
  id: string;
  name: string;
  description: string;
  scope: string;
  format: "PDF" | "CSV" | "XLSX";
  generatedAt: string;
  size: string;
};

export const reports: ReportItem[] = [
  {
    id: "rep-301",
    name: "Cohort 11 — Database Systems result sheet",
    description: "Per-student scores, duration and pass status for the midterm sitting.",
    scope: "Cohort 11 · Aug 2026",
    format: "XLSX",
    generatedAt: "2026-08-05",
    size: "184 KB",
  },
  {
    id: "rep-302",
    name: "Question performance analysis",
    description: "Difficulty index and discrimination score for every published question.",
    scope: "All exams · Q3 2026",
    format: "PDF",
    generatedAt: "2026-08-03",
    size: "1.2 MB",
  },
  {
    id: "rep-303",
    name: "Operating Systems attempt log",
    description: "Raw attempt log with timestamps, IP region and autosave checkpoints.",
    scope: "Cohort 12 · Aug 2026",
    format: "CSV",
    generatedAt: "2026-08-04",
    size: "612 KB",
  },
  {
    id: "rep-304",
    name: "Semester progress summary",
    description: "Average scores, pass rates and participation across all managed exams.",
    scope: "Department · Semester 2",
    format: "PDF",
    generatedAt: "2026-07-31",
    size: "890 KB",
  },
];

export const reportTemplates = [
  { id: "tpl-1", name: "Result sheet", description: "Scores and pass status per student." },
  { id: "tpl-2", name: "Item analysis", description: "Per-question difficulty and discrimination." },
  { id: "tpl-3", name: "Participation", description: "Attendance, starts and completions." },
  { id: "tpl-4", name: "Integrity log", description: "Flags, tab switches and timing anomalies." },
];
