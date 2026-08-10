/**
 * Static presentation data for the Administrator Portal (Phase 3).
 * Shapes mirror a future REST API so screens can be wired to a backend
 * without changing any component contracts.
 */

export const admin = {
  id: "adm_1001",
  name: "Amara Okonkwo",
  firstName: "Amara",
  email: "amara.okonkwo@kaptio.io",
  title: "Platform Administrator",
  staffId: "ADM/PLT/1001",
  avatarInitials: "AO",
  timezone: "Africa/Lagos",
  lastLogin: "2026-08-09 21:04",
};

export type PlatformRole = "Student" | "Instructor" | "Institution Admin" | "Super Admin";
export type UserStatus = "Active" | "Invited" | "Suspended";

export type PlatformUser = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: PlatformRole;
  institution: string;
  status: UserStatus;
  lastActive: string;
  createdAt: string;
  mfaEnabled: boolean;
};

export const platformUsers: PlatformUser[] = [
  {
    id: "usr_5001",
    name: "Chidera Umeh",
    initials: "CU",
    email: "chidera.umeh@student.unilag.edu",
    role: "Student",
    institution: "University of Lagos",
    status: "Active",
    lastActive: "2026-08-09 18:22",
    createdAt: "2025-09-14",
    mfaEnabled: false,
  },
  {
    id: "usr_5002",
    name: "Dr. Nkem Adeyemi",
    initials: "NA",
    email: "nkem.adeyemi@university.edu",
    role: "Instructor",
    institution: "University of Lagos",
    status: "Active",
    lastActive: "2026-08-09 20:41",
    createdAt: "2024-02-03",
    mfaEnabled: true,
  },
  {
    id: "usr_5003",
    name: "Fatima Bello",
    initials: "FB",
    email: "f.bello@abu.edu.ng",
    role: "Institution Admin",
    institution: "Ahmadu Bello University",
    status: "Active",
    lastActive: "2026-08-08 09:12",
    createdAt: "2024-06-21",
    mfaEnabled: true,
  },
  {
    id: "usr_5004",
    name: "Tunde Salami",
    initials: "TS",
    email: "tunde.salami@student.abu.edu.ng",
    role: "Student",
    institution: "Ahmadu Bello University",
    status: "Suspended",
    lastActive: "2026-07-30 14:05",
    createdAt: "2025-01-19",
    mfaEnabled: false,
  },
  {
    id: "usr_5005",
    name: "Grace Mensah",
    initials: "GM",
    email: "grace.mensah@ug.edu.gh",
    role: "Instructor",
    institution: "University of Ghana",
    status: "Invited",
    lastActive: "—",
    createdAt: "2026-08-05",
    mfaEnabled: false,
  },
  {
    id: "usr_5006",
    name: "Amara Okonkwo",
    initials: "AO",
    email: "amara.okonkwo@kaptio.io",
    role: "Super Admin",
    institution: "Kaptio Platform",
    status: "Active",
    lastActive: "2026-08-09 21:04",
    createdAt: "2023-11-02",
    mfaEnabled: true,
  },
  {
    id: "usr_5007",
    name: "Ibrahim Yusuf",
    initials: "IY",
    email: "ibrahim.yusuf@student.ug.edu.gh",
    role: "Student",
    institution: "University of Ghana",
    status: "Active",
    lastActive: "2026-08-09 11:47",
    createdAt: "2025-10-08",
    mfaEnabled: false,
  },
  {
    id: "usr_5008",
    name: "Zainab Idris",
    initials: "ZI",
    email: "zainab.idris@kaduna.edu.ng",
    role: "Instructor",
    institution: "Kaduna Polytechnic",
    status: "Active",
    lastActive: "2026-08-07 16:30",
    createdAt: "2024-09-30",
    mfaEnabled: true,
  },
];

export type Institution = {
  id: string;
  name: string;
  shortName: string;
  country: string;
  plan: "Starter" | "Growth" | "Enterprise";
  status: "Active" | "Trial" | "Suspended";
  students: number;
  instructors: number;
  examsDelivered: number;
  seatsUsed: number;
  seatLimit: number;
  renewsOn: string;
  primaryContact: string;
};

export const institutions: Institution[] = [
  {
    id: "ins_101",
    name: "University of Lagos",
    shortName: "UNILAG",
    country: "Nigeria",
    plan: "Enterprise",
    status: "Active",
    students: 12480,
    instructors: 412,
    examsDelivered: 3860,
    seatsUsed: 12892,
    seatLimit: 15000,
    renewsOn: "2027-01-31",
    primaryContact: "registrar@unilag.edu.ng",
  },
  {
    id: "ins_102",
    name: "Ahmadu Bello University",
    shortName: "ABU",
    country: "Nigeria",
    plan: "Growth",
    status: "Active",
    students: 7340,
    instructors: 268,
    examsDelivered: 2115,
    seatsUsed: 7608,
    seatLimit: 8000,
    renewsOn: "2026-11-14",
    primaryContact: "f.bello@abu.edu.ng",
  },
  {
    id: "ins_103",
    name: "University of Ghana",
    shortName: "UG",
    country: "Ghana",
    plan: "Growth",
    status: "Trial",
    students: 1820,
    instructors: 64,
    examsDelivered: 138,
    seatsUsed: 1884,
    seatLimit: 3000,
    renewsOn: "2026-09-01",
    primaryContact: "ict@ug.edu.gh",
  },
  {
    id: "ins_104",
    name: "Kaduna Polytechnic",
    shortName: "KADPOLY",
    country: "Nigeria",
    plan: "Starter",
    status: "Active",
    students: 2960,
    instructors: 88,
    examsDelivered: 640,
    seatsUsed: 3048,
    seatLimit: 3500,
    renewsOn: "2026-10-22",
    primaryContact: "ict@kadunapolytechnic.edu.ng",
  },
  {
    id: "ins_105",
    name: "Makerere University",
    shortName: "MAK",
    country: "Uganda",
    plan: "Starter",
    status: "Suspended",
    students: 1240,
    instructors: 41,
    examsDelivered: 210,
    seatsUsed: 1281,
    seatLimit: 1500,
    renewsOn: "2026-08-30",
    primaryContact: "exams@mak.ac.ug",
  },
];

export type AuditSeverity = "Info" | "Warning" | "Critical";

export type AuditLog = {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: PlatformRole;
  action: string;
  target: string;
  institution: string;
  ip: string;
  severity: AuditSeverity;
};

export const auditLogs: AuditLog[] = [
  {
    id: "log_9001",
    timestamp: "2026-08-09 21:04:12",
    actor: "Amara Okonkwo",
    actorRole: "Super Admin",
    action: "Signed in",
    target: "Admin console",
    institution: "Kaptio Platform",
    ip: "102.89.14.7",
    severity: "Info",
  },
  {
    id: "log_9002",
    timestamp: "2026-08-09 20:52:38",
    actor: "Amara Okonkwo",
    actorRole: "Super Admin",
    action: "Suspended user account",
    target: "usr_5004 · Tunde Salami",
    institution: "Ahmadu Bello University",
    ip: "102.89.14.7",
    severity: "Warning",
  },
  {
    id: "log_9003",
    timestamp: "2026-08-09 19:31:04",
    actor: "System",
    actorRole: "Super Admin",
    action: "Failed login threshold exceeded",
    target: "usr_5007 · Ibrahim Yusuf",
    institution: "University of Ghana",
    ip: "154.160.22.91",
    severity: "Critical",
  },
  {
    id: "log_9004",
    timestamp: "2026-08-09 17:18:45",
    actor: "Dr. Nkem Adeyemi",
    actorRole: "Instructor",
    action: "Published exam",
    target: "exm_3120 · Data Structures Midterm",
    institution: "University of Lagos",
    ip: "197.210.53.4",
    severity: "Info",
  },
  {
    id: "log_9005",
    timestamp: "2026-08-09 15:02:19",
    actor: "Fatima Bello",
    actorRole: "Institution Admin",
    action: "Invited 42 users",
    target: "Bulk invite · CSV",
    institution: "Ahmadu Bello University",
    ip: "41.203.78.19",
    severity: "Info",
  },
  {
    id: "log_9006",
    timestamp: "2026-08-09 12:44:57",
    actor: "Amara Okonkwo",
    actorRole: "Super Admin",
    action: "Updated role permissions",
    target: "role_instructor",
    institution: "Kaptio Platform",
    ip: "102.89.14.7",
    severity: "Warning",
  },
  {
    id: "log_9007",
    timestamp: "2026-08-08 22:10:03",
    actor: "System",
    actorRole: "Super Admin",
    action: "Nightly backup completed",
    target: "db-primary-eu-west",
    institution: "Kaptio Platform",
    ip: "internal",
    severity: "Info",
  },
  {
    id: "log_9008",
    timestamp: "2026-08-08 18:07:41",
    actor: "Zainab Idris",
    actorRole: "Instructor",
    action: "Exported student results",
    target: "exm_2998 · Circuits Final",
    institution: "Kaduna Polytechnic",
    ip: "165.73.11.28",
    severity: "Warning",
  },
];

export type ServiceStatus = "Operational" | "Degraded" | "Outage";

export const platformServices: {
  name: string;
  status: ServiceStatus;
  uptime: string;
  latencyMs: number;
  region: string;
}[] = [
  { name: "Exam delivery API", status: "Operational", uptime: "99.99%", latencyMs: 128, region: "eu-west-1" },
  { name: "Authentication", status: "Operational", uptime: "99.98%", latencyMs: 94, region: "eu-west-1" },
  { name: "Grading workers", status: "Degraded", uptime: "99.41%", latencyMs: 612, region: "af-south-1" },
  { name: "Media storage", status: "Operational", uptime: "100%", latencyMs: 71, region: "multi" },
  { name: "Notification service", status: "Operational", uptime: "99.92%", latencyMs: 183, region: "eu-west-1" },
  { name: "Reporting pipeline", status: "Outage", uptime: "97.20%", latencyMs: 0, region: "af-south-1" },
];

export const trafficSeries = [
  { time: "00:00", sessions: 420, errors: 2 },
  { time: "04:00", sessions: 310, errors: 1 },
  { time: "08:00", sessions: 1840, errors: 6 },
  { time: "12:00", sessions: 3120, errors: 14 },
  { time: "16:00", sessions: 2760, errors: 9 },
  { time: "20:00", sessions: 1490, errors: 4 },
];

export const growthSeries = [
  { month: "Mar", users: 12400, exams: 640 },
  { month: "Apr", users: 14180, exams: 712 },
  { month: "May", users: 16020, exams: 805 },
  { month: "Jun", users: 18960, exams: 921 },
  { month: "Jul", users: 21740, exams: 1088 },
  { month: "Aug", users: 25840, exams: 1204 },
];

export const incidents = [
  {
    id: "inc_412",
    title: "Reporting pipeline backlog",
    started: "2026-08-09 18:40",
    impact: "Scheduled reports delayed up to 40 minutes.",
    severity: "Critical" as AuditSeverity,
    status: "Investigating",
  },
  {
    id: "inc_411",
    title: "Elevated grading latency (af-south-1)",
    started: "2026-08-09 14:12",
    impact: "Essay grading queue processing slower than usual.",
    severity: "Warning" as AuditSeverity,
    status: "Monitoring",
  },
  {
    id: "inc_409",
    title: "Brief authentication slowdown",
    started: "2026-08-07 08:02",
    impact: "Login p95 rose to 1.4s for 11 minutes.",
    severity: "Info" as AuditSeverity,
    status: "Resolved",
  },
];

export type PermissionKey =
  | "manage_users"
  | "manage_institutions"
  | "create_exams"
  | "grade_submissions"
  | "view_analytics"
  | "manage_billing"
  | "view_audit_logs"
  | "configure_platform";

export const permissionLabels: Record<PermissionKey, string> = {
  manage_users: "Manage users",
  manage_institutions: "Manage institutions",
  create_exams: "Create & publish exams",
  grade_submissions: "Grade submissions",
  view_analytics: "View analytics",
  manage_billing: "Manage billing",
  view_audit_logs: "View audit logs",
  configure_platform: "Configure platform",
};

export type RoleDefinition = {
  id: string;
  name: PlatformRole;
  description: string;
  members: number;
  system: boolean;
  permissions: PermissionKey[];
};

export const roles: RoleDefinition[] = [
  {
    id: "role_student",
    name: "Student",
    description: "Takes exams, reviews results and manages their own profile.",
    members: 24180,
    system: true,
    permissions: [],
  },
  {
    id: "role_instructor",
    name: "Instructor",
    description: "Builds question banks, publishes exams and grades submissions.",
    members: 873,
    system: true,
    permissions: ["create_exams", "grade_submissions", "view_analytics"],
  },
  {
    id: "role_institution_admin",
    name: "Institution Admin",
    description: "Administers users, cohorts and billing for a single institution.",
    members: 46,
    system: false,
    permissions: ["manage_users", "view_analytics", "manage_billing", "view_audit_logs"],
  },
  {
    id: "role_super_admin",
    name: "Super Admin",
    description: "Full platform control across every institution and service.",
    members: 7,
    system: true,
    permissions: [
      "manage_users",
      "manage_institutions",
      "create_exams",
      "grade_submissions",
      "view_analytics",
      "manage_billing",
      "view_audit_logs",
      "configure_platform",
    ],
  },
];

export const systemSettings = {
  platformName: "Kaptio CBT",
  supportEmail: "support@kaptio.io",
  defaultTimezone: "Africa/Lagos",
  sessionTimeoutMinutes: 45,
  maxUploadMb: 25,
  dataRegion: "eu-west-1",
  maintenanceWindow: "Sundays 02:00 – 04:00 UTC",
};
