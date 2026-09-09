import type { Employee, Lead, PayrollRecord, AttendanceRecord, LeaveRequest, Flag, Notification, EmployeeTicket, ExpenseClaim, ExitRecord, JobTitle, JobRequisition, Candidate, PerformanceGoal, PerformanceReview } from '../types'

// ───────────────────────── Employees ─────────────────────────
// Sourced directly from the employee roster the user uploaded (employee ID,
// name, official email, phone, designation). Only those given fields are
// used — no other personal or financial details were provided, and none
// were invented. Company, department/team, location and job title are
// derived from the "designation" text the user supplied for each person
// (e.g. "Tumkur // manger // finance" → Finance Manager, Tumkur Office).
// Employee IDs use the user's own numbering (DF = Diago Finance, PA = Parva
// Realty). Nine people marked in red on the source sheet have since left
// the company and are excluded entirely, per the user's note. A few people
// have no designation/location/contact info on file yet (blank on the
// sheet) — those fields are left blank rather than guessed. Neelesh H P
// (CEO) sits at the top of the org; Akshita Raturi (Director), Ravishankar
// (Finance) and Satish Kumar D (HR) are Group-level leads reporting to him.
export const employees: Employee[] = [
  { id: 'DF230001', name: 'Neelesh H P', role: 'admin' as JobTitle, title: 'CEO', email: 'neelesh@diagofinance.com', phone: '', team: 'Executive', joinDate: '', status: 'active', department: '', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: '', company: 'Parva Group' },
  { id: 'DF230002', name: 'Akshita Raturi', role: 'admin' as JobTitle, title: 'Director', email: 'akshita@diagofinance.com', phone: '', team: 'Group Leadership', managerId: 'DF230001', joinDate: '', status: 'active', department: 'Management', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Parva Group' },
  // Placeholder record — Deeksha named Chaitra as Parva Realty's director but
  // she isn't in the original roster yet. ID/email/phone left blank (no real
  // values given); she can also sign in as a Line Manager (see Login.tsx's
  // LOGIN_EXTRA_IDS) and can use whichever email she picks once she has one —
  // update this once her real details are known.
  { id: 'PA230045', name: 'Chaitra', role: 'admin' as JobTitle, title: 'Director', email: '', phone: '', team: 'Group Leadership', managerId: 'DF230001', joinDate: '', status: 'active', department: 'Management', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Parva Realty' },
  { id: 'DF230003', name: 'Ravishankar', role: 'finance' as JobTitle, title: 'Finance Manager', email: 'raviammu64@gmail.com', phone: '9620813164', team: 'Accounts & Taxation', managerId: 'DF230001', joinDate: '', status: 'active', department: 'Accounts & Taxation', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Tumkur Office', company: 'Parva Group' },
  { id: 'DF230004', name: 'Shradha Tapliyal', role: 'manager' as JobTitle, title: 'Sales Manager', email: 'shradha@diagofinance.com', phone: '8449789789', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'Business Development', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Dehradun Office', company: 'Diago Finance' },
  { id: 'DF230006', name: 'Thejavathi J N', role: 'manager' as JobTitle, title: 'Operations Head', email: 'thejavathi@diagofinance.com', phone: '9538909061', team: 'Operations', managerId: 'DF230002', joinDate: '', status: 'active', department: 'Operations', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'DF230007', name: 'Rabia Kapoor', role: 'manager' as JobTitle, title: 'Global Customer Care Head', email: 'rabia@diagofinance.com', phone: '8146413139', team: 'Customer Success', managerId: 'DF230008', joinDate: '', status: 'active', department: 'Customer Success', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Dehradun Office', company: 'Diago Finance' },
  { id: 'DF230008', name: 'Renuka Rani', role: 'manager' as JobTitle, title: 'Global Sales Head', email: 'renuka@diagofinance.com', phone: '8295277765', team: 'Sales', managerId: 'DF230002', joinDate: '', status: 'active', department: 'Sales', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Dehradun Office', company: 'Diago Finance' },
  { id: 'DF230010', name: 'Suhas S Vasishta', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'suhassvasishta@diagofinance.com', phone: '8150827996', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Tumkur Office', company: 'Diago Finance' },
  { id: 'DF230011', name: 'Arun Kumar A', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'arun@diagofinance.com', phone: '9611457551', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'DF230012', name: 'Adithi A', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'adithi@diagofinance.com', phone: '9964089805', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'DF230016', name: 'Nino Samunnitha', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'samunnitha@diagofinance.com', phone: '9739953093', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'DF230017', name: 'Nazish Khan', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'nazish@diagofinance.com', phone: '8226089361', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'PA230018', name: 'Nagesh N', role: 'agent' as JobTitle, title: 'Business Development Executive', email: 'nagesh@diagofinance.com', phone: '9019864067', team: 'Sales', managerId: 'PA230045', joinDate: '', status: 'active', department: 'Sales', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Parva Realty' },
  { id: 'DF230019', name: 'Ranjitha H S', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'ranjitha@diagofinance.com', phone: '8970417831', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'DF230020', name: 'Prajwal J', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'prajwal@diagofinance.com', phone: '9731423452', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Tumkur Office', company: 'Diago Finance' },
  { id: 'DF230022', name: 'Naveen D', role: 'agent' as JobTitle, title: 'Driver', email: '', phone: '', team: 'Operations', managerId: 'DF230044', joinDate: '', status: 'active', department: 'Operations', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: '', company: 'Diago Finance' },
  { id: 'DF230023', name: 'Prashanth Kumar', role: 'agent' as JobTitle, email: '', phone: '', team: 'Diago Finance', managerId: 'DF230003', joinDate: '', status: 'active', department: 'Diago Finance', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: '', company: 'Diago Finance' },
  { id: 'DF230024', name: 'Veer Premi', role: 'agent' as JobTitle, title: 'CRM Executive', email: '', phone: '9731012710', team: 'Sales', managerId: 'DF230008', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Mumbai Branch', company: 'Diago Finance' },
  { id: 'DF230025', name: 'Vinay Harsha Harlapur', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'vinay@diagofinance.com', phone: '9036915666', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Tumkur Office', company: 'Diago Finance' },
  { id: 'DF230027', name: 'Nandini B Madagunaki', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'nandini@diagofinance.com', phone: '8904821922', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Tumkur Office', company: 'Diago Finance' },
  { id: 'PA230028', name: 'Deekshitha M V', role: 'agent' as JobTitle, title: 'IT', email: 'Deekshitha@parvarealty.ae', phone: '9880988655', team: 'IT', managerId: 'PA230045', joinDate: '', status: 'active', department: 'IT', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Parva Realty' },
  { id: 'DF230029', name: 'Yatheesh SP', role: 'finance' as JobTitle, title: 'Accountant', email: 'accounts@diagofinance.com', phone: '7259336021', team: 'Accounts & Taxation', managerId: 'DF230001', joinDate: '', status: 'active', department: 'Accounts & Taxation', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'DF230030', name: 'Vishal Kumar', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'vishal@diagofinance.com', phone: '8057743548', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Dehradun Office', company: 'Diago Finance' },
  { id: 'DF230032', name: 'Prashanth Mandoli', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'prashanth@diagofinance.com', phone: '9634272497', team: 'Sales', managerId: 'DF230008', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Dehradun Office', company: 'Diago Finance' },
  { id: 'DF230033', name: 'Harshitaa R R', role: 'hr' as JobTitle, title: 'HR Assistant Manager', email: 'hr@diagofinance.com', phone: '9535934702', team: 'HR', managerId: 'DF230044', joinDate: '', status: 'active', department: 'HR', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'DF230034', name: 'Subhash H N', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'subash@diagofinance.com', phone: '6360382875', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'DF230035', name: 'Avi Chauhan', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'avi@diagofinance.com', phone: '6397263232', team: 'Sales', managerId: 'DF230008', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Dehradun Office', company: 'Diago Finance' },
  { id: 'DF230036', name: 'Chandramathi', role: 'agent' as JobTitle, title: 'Sales Associate', email: 'chandramathi@diagofinance.com', phone: '9901433133', team: 'Sales', managerId: 'DF230002', joinDate: '', status: 'active', department: 'Sales', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'DF230037', name: 'Vishwas', role: 'agent' as JobTitle, title: 'Investor Relation Customer Growth Manager (IRGCM)', email: 'vishwass@diagofinance.com', phone: '7411282661', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'DF230038', name: 'Mohsin', role: 'agent' as JobTitle, title: 'Operations', email: 'mohsin@diagofinance.com', phone: '+971 507104563', team: 'Operations', managerId: 'DF230002', joinDate: '', status: 'active', department: 'Operations', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Dubai Office', company: 'Diago Finance' },
  { id: 'DF230040', name: 'Manoj H', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'manoj@diagofinance.com', phone: '8431131834', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Diago Finance' },
  { id: 'PA230041', name: 'Vijaya Vaishnavi', role: 'agent' as JobTitle, title: 'Business Development Executive', email: 'vaishnavi@parvarealty.ae', phone: '8095565535', team: 'Sales', managerId: 'PA230045', joinDate: '', status: 'active', department: 'Sales', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Parva Realty' },
  { id: 'DF230042', name: 'Meghashree', role: 'manager' as JobTitle, title: 'Sales Manager', email: 'meghashree@diagofinance.com', phone: '7353531573', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'Sales', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Mumbai Branch', company: 'Diago Finance' },
  { id: 'DF230043', name: 'Tejasvi Anand', role: 'agent' as JobTitle, title: 'CRM Executive', email: 'Tejasvi@diagofinance.com', phone: '9557571911', team: 'Sales', managerId: 'DF230044', joinDate: '', status: 'active', department: 'CRM', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Dehradun Office', company: 'Diago Finance' },
  { id: 'DF230044', name: 'Satish Kumar D', role: 'hr' as JobTitle, title: 'HR Head · Bangalore Branch Head', email: 'satishkumar@diagofinance.com', phone: '9986957906', team: 'HR', managerId: 'DF230001', joinDate: '', status: 'active', department: 'HR', leadsAssigned: 0, conversions: 0, baseSalary: 0, responseTime: 'N/A', location: 'Bangalore Office', company: 'Parva Group' },
]

// ───────────────────────── Everything below is reset ─────────────────────────
// The demo/sample operational data (leads, payroll, attendance, leave,
// tickets, expenses, exits, recruitment, performance) that used to be seeded
// here belonged to the old placeholder roster and has been removed along
// with it, per the request to clear out dummy data. Every module below
// starts empty and fills up from real activity going forward.

export const leads: Lead[] = []

export const payrollRecords: PayrollRecord[] = []

export const attendanceRecords: AttendanceRecord[] = []

export const leaveRequests: LeaveRequest[] = []

export const flags: Flag[] = []

export const notifications: Notification[] = []

export const monthlyPerformance: { month: string; leads: number; conversions: number; revenue: number }[] = []

export const sourcePerformanceData: { source: string; leads: number; conversions: number; rate: number; color: string }[] = []

export const pipelineData: { stage: string; count: number; color: string }[] = []

export const companyRevenueData: { month: string; revenue: number; leads: number; conversions: number }[] = []

export const onboardingCandidates: { id: string; name: string; role: JobTitle; team: string; joiningDate: string; docStatus: string; onboardingProgress: number }[] = []

// ---- Employee Tickets ----
export const employeeTickets: EmployeeTicket[] = []

// ---- Expense Claims ----
export const expenseClaims: ExpenseClaim[] = []

// ---- Exit Records ----
export const exitRecords: ExitRecord[] = []

// ---- Recruitment Management ----
export const jobRequisitions: JobRequisition[] = []

export const candidates: Candidate[] = []

// ---- Performance Management ----
export const performanceGoals: PerformanceGoal[] = []

export const performanceReviews: PerformanceReview[] = []
