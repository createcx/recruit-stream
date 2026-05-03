import { db } from "@workspace/db";
import {
  candidatesTable,
  jobsTable,
  companiesTable,
  contactsTable,
  clientsTable,
  placementsTable,
  projectsTable,
  activitiesTable,
  documentsTable,
  financialsTable,
  resourcesTable,
  sowsTable,
  changeOrdersTable,
  phasesTable,
  forecastsTable,
  onboardingTasksTable,
  integrationsTable,
} from "@workspace/db";

async function seed() {
  console.log("Seeding database...");

  // Candidates
  await db.insert(candidatesTable).values([
    { name: "Sarah Chen", email: "sarah.chen@email.com", phone: "415-555-0101", title: "Senior Software Engineer", location: "San Francisco, CA", status: "active", skills: ["TypeScript", "React", "Node.js"], salary: "$180,000", availability: "2 weeks", visa: "US Citizen" },
    { name: "Marcus Williams", email: "marcus.w@email.com", phone: "312-555-0202", title: "Product Manager", location: "Chicago, IL", status: "interviewing", skills: ["Product Strategy", "Agile", "SQL"], salary: "$160,000", availability: "1 month", visa: "Green Card" },
    { name: "Priya Patel", email: "priya.p@email.com", phone: "212-555-0303", title: "Data Scientist", location: "New York, NY", status: "submitted", skills: ["Python", "ML", "PyTorch", "SQL"], salary: "$175,000", availability: "Immediate", visa: "H1B" },
    { name: "James Rodriguez", email: "james.r@email.com", phone: "213-555-0404", title: "DevOps Engineer", location: "Los Angeles, CA", status: "placed", skills: ["Kubernetes", "AWS", "Terraform"], salary: "$155,000", availability: "Placed", visa: "US Citizen" },
    { name: "Emily Thompson", email: "emily.t@email.com", phone: "617-555-0505", title: "UX Designer", location: "Boston, MA", status: "new", skills: ["Figma", "User Research", "Prototyping"], salary: "$130,000", availability: "3 weeks", visa: "US Citizen" },
  ]).onConflictDoNothing();

  // Jobs
  await db.insert(jobsTable).values([
    { title: "Senior Frontend Engineer", company: "TechCorp Inc", location: "San Francisco, CA", type: "Full-time", status: "open", priority: "high", salary: "$170,000 - $200,000", openings: 2, description: "Build next-gen React applications", requirements: ["React", "TypeScript", "5+ years"], deadline: "2026-06-30" },
    { title: "Product Manager", company: "StartupXYZ", location: "Remote", type: "Full-time", status: "open", priority: "urgent", salary: "$150,000 - $180,000", openings: 1, description: "Drive product roadmap for B2B SaaS platform" },
    { title: "Data Engineer", company: "DataFlow Corp", location: "New York, NY", type: "Full-time", status: "open", priority: "medium", salary: "$160,000 - $185,000", openings: 3, requirements: ["Spark", "Databricks", "Python"] },
    { title: "DevOps Lead", company: "CloudBase", location: "Austin, TX", type: "Contract", status: "filled", priority: "low", salary: "$120/hr", openings: 1 },
    { title: "UX Research Lead", company: "DesignCo", location: "Seattle, WA", type: "Full-time", status: "open", priority: "medium", salary: "$140,000 - $160,000", openings: 1 },
  ]).onConflictDoNothing();

  // Companies
  await db.insert(companiesTable).values([
    { name: "TechCorp Inc", industry: "Technology", location: "San Francisco, CA", size: "500-1000", status: "active", website: "techcorp.com", phone: "415-555-1000", revenue: "$50M ARR" },
    { name: "StartupXYZ", industry: "SaaS", location: "New York, NY", size: "50-100", status: "active", website: "startupxyz.com", revenue: "$5M ARR" },
    { name: "DataFlow Corp", industry: "Analytics", location: "Chicago, IL", size: "200-500", status: "active", website: "dataflow.io", revenue: "$25M ARR" },
    { name: "CloudBase", industry: "Infrastructure", location: "Austin, TX", size: "100-200", status: "prospect", website: "cloudbase.io" },
    { name: "DesignCo", industry: "Design Agency", location: "Seattle, WA", size: "10-50", status: "active", website: "designco.com" },
  ]).onConflictDoNothing();

  // Contacts
  await db.insert(contactsTable).values([
    { name: "Jennifer Walsh", title: "VP of Engineering", email: "j.walsh@techcorp.com", phone: "415-555-1001", company: "TechCorp Inc", type: "hiring_manager" },
    { name: "David Kim", title: "Head of Talent", email: "d.kim@startupxyz.com", phone: "212-555-2001", company: "StartupXYZ", type: "recruiter" },
    { name: "Rachel Green", title: "CTO", email: "r.green@dataflow.io", phone: "312-555-3001", company: "DataFlow Corp", type: "executive" },
    { name: "Tom Baker", title: "HR Manager", email: "t.baker@cloudbase.io", company: "CloudBase", type: "hr" },
    { name: "Lisa Park", title: "Creative Director", email: "l.park@designco.com", company: "DesignCo", type: "hiring_manager" },
  ]).onConflictDoNothing();

  // Clients
  await db.insert(clientsTable).values([
    { name: "TechCorp Inc", industry: "Technology", status: "active", arr: "180000", location: "San Francisco, CA", primaryContact: "Jennifer Walsh", openRoles: 5 },
    { name: "StartupXYZ", industry: "SaaS", status: "active", arr: "75000", location: "New York, NY", primaryContact: "David Kim", openRoles: 2 },
    { name: "DataFlow Corp", industry: "Analytics", status: "active", arr: "240000", location: "Chicago, IL", primaryContact: "Rachel Green", openRoles: 8 },
    { name: "DesignCo", industry: "Design", status: "at_risk", arr: "45000", location: "Seattle, WA", primaryContact: "Lisa Park", openRoles: 1 },
    { name: "CloudBase", industry: "Infrastructure", status: "prospect", arr: "0", location: "Austin, TX", openRoles: 3 },
  ]).onConflictDoNothing();

  // Placements
  await db.insert(placementsTable).values([
    { candidate: "James Rodriguez", role: "DevOps Lead", company: "CloudBase", startDate: "2026-02-01", salary: "124800", feeAmount: "18720", feePercent: "15", type: "permanent", status: "active", invoiceNum: "INV-2026-001", paymentStatus: "paid", guaranteePeriod: "90 days" },
    { candidate: "Sarah Chen", role: "Senior Frontend Engineer", company: "TechCorp Inc", startDate: "2026-03-15", salary: "185000", feeAmount: "27750", feePercent: "15", type: "permanent", status: "active", invoiceNum: "INV-2026-002", paymentStatus: "pending" },
    { candidate: "Marcus Williams", role: "Product Manager", company: "StartupXYZ", startDate: "2026-04-01", salary: "165000", feeAmount: "24750", feePercent: "15", type: "permanent", status: "pending", invoiceNum: "INV-2026-003", paymentStatus: "not_invoiced" },
  ]).onConflictDoNothing();

  // Projects
  await db.insert(projectsTable).values([
    { name: "Platform Modernization", client: "TechCorp Inc", status: "active", budget: "450000", spent: "215000", startDate: "2026-01-01", endDate: "2026-09-30", manager: "Alice Johnson", teamSize: 8, description: "Full stack modernization of legacy platform" },
    { name: "Data Pipeline Rebuild", client: "DataFlow Corp", status: "active", budget: "280000", spent: "95000", startDate: "2026-02-01", endDate: "2026-07-31", manager: "Bob Smith", teamSize: 5 },
    { name: "UX Redesign Initiative", client: "DesignCo", status: "on_hold", budget: "120000", spent: "30000", startDate: "2026-01-15", manager: "Carol Davis", teamSize: 3 },
    { name: "Cloud Migration", client: "CloudBase", status: "scoping", budget: "320000", spent: "0", startDate: "2026-05-01", manager: "Dave Wilson", teamSize: 6 },
  ]).onConflictDoNothing();

  // Activities
  await db.insert(activitiesTable).values([
    { type: "call", description: "Initial screening call with Sarah Chen", candidate: "Sarah Chen", company: "TechCorp Inc", loggedBy: "Alice Johnson", notes: "Strong React background. Moving to technical interview." },
    { type: "interview", description: "Technical interview round 2 — Marcus Williams", candidate: "Marcus Williams", company: "StartupXYZ", loggedBy: "Bob Smith" },
    { type: "submission", description: "Submitted Priya Patel to DataFlow Corp", candidate: "Priya Patel", company: "DataFlow Corp", loggedBy: "Carol Davis" },
    { type: "offer", description: "Offer extended to James Rodriguez — $155k base", candidate: "James Rodriguez", company: "CloudBase", loggedBy: "Dave Wilson" },
    { type: "placement", description: "James Rodriguez placed as DevOps Lead at CloudBase", candidate: "James Rodriguez", company: "CloudBase", loggedBy: "Dave Wilson" },
    { type: "email", description: "Follow-up email to Emily Thompson re: UX role at DesignCo", candidate: "Emily Thompson", company: "DesignCo", loggedBy: "Alice Johnson" },
  ]).onConflictDoNothing();

  // Documents
  await db.insert(documentsTable).values([
    { name: "Sarah Chen - Resume.pdf", type: "resume", linkedEntity: "Candidate: Sarah Chen", size: "245 KB", uploadedBy: "Alice Johnson" },
    { name: "TechCorp MSA 2026.pdf", type: "contract", linkedEntity: "Client: TechCorp Inc", size: "1.2 MB", uploadedBy: "Bob Smith" },
    { name: "CloudBase SOW Q1.pdf", type: "sow", linkedEntity: "Project: Cloud Migration", size: "890 KB", uploadedBy: "Dave Wilson" },
    { name: "Placement Agreement - James Rodriguez.pdf", type: "agreement", linkedEntity: "Placement: James Rodriguez", size: "340 KB", uploadedBy: "Carol Davis" },
    { name: "DataFlow Corp - Rate Card.xlsx", type: "rate_card", linkedEntity: "Client: DataFlow Corp", size: "56 KB", uploadedBy: "Bob Smith" },
  ]).onConflictDoNothing();

  // Financials
  await db.insert(financialsTable).values([
    { invoiceNum: "INV-2026-001", client: "CloudBase", amount: "18720", type: "placement_fee", status: "paid", dueDate: "2026-03-01", glCode: "4000" },
    { invoiceNum: "INV-2026-002", client: "TechCorp Inc", amount: "27750", type: "placement_fee", status: "pending", dueDate: "2026-05-15", glCode: "4000" },
    { invoiceNum: "INV-2026-003", client: "StartupXYZ", amount: "24750", type: "placement_fee", status: "draft", glCode: "4000" },
    { invoiceNum: "INV-2026-004", client: "DataFlow Corp", amount: "45000", type: "project_milestone", status: "paid", dueDate: "2026-03-31", glCode: "4100" },
    { invoiceNum: "INV-2026-005", client: "TechCorp Inc", amount: "67500", type: "project_milestone", status: "overdue", dueDate: "2026-04-15", glCode: "4100" },
  ]).onConflictDoNothing();

  // Resources
  await db.insert(resourcesTable).values([
    { name: "Alice Johnson", title: "Senior Recruiter", skills: ["Technical Recruiting", "ATS", "Boolean Search"], utilization: 90, status: "engaged", rate: "85", project: "Platform Modernization" },
    { name: "Bob Smith", title: "Account Manager", skills: ["Client Relations", "Negotiation"], utilization: 75, status: "engaged", rate: "95", project: "Data Pipeline Rebuild" },
    { name: "Carol Davis", title: "Sourcing Specialist", skills: ["LinkedIn Recruiter", "Outreach"], utilization: 60, status: "available", rate: "65" },
    { name: "Dave Wilson", title: "Principal Recruiter", skills: ["Executive Search", "C-Suite"], utilization: 95, status: "over_allocated", rate: "110", project: "Cloud Migration" },
    { name: "Emma Lee", title: "HR Coordinator", skills: ["Onboarding", "Compliance", "HRIS"], utilization: 40, status: "available", rate: "55" },
  ]).onConflictDoNothing();

  // SOWs
  await db.insert(sowsTable).values([
    { title: "Platform Modernization SOW v2", client: "TechCorp Inc", value: "450000", status: "executed", startDate: "2026-01-01", endDate: "2026-09-30", description: "Full modernization engagement including 8 engineers and PM" },
    { title: "Data Pipeline Rebuild SOW", client: "DataFlow Corp", value: "280000", status: "executed", startDate: "2026-02-01", endDate: "2026-07-31" },
    { title: "Cloud Migration SOW", client: "CloudBase", value: "320000", status: "in_review", startDate: "2026-05-01" },
    { title: "UX Design Services SOW", client: "DesignCo", value: "120000", status: "on_hold", startDate: "2026-01-15" },
  ]).onConflictDoNothing();

  // Change Orders
  await db.insert(changeOrdersTable).values([
    { title: "Platform Mod - Scope Extension", client: "TechCorp Inc", deltaValue: "75000", status: "approved", requestedBy: "Jennifer Walsh", approver: "Alice Johnson", rationale: "Additional microservices layer required" },
    { title: "Data Pipeline - Extra Month", client: "DataFlow Corp", deltaValue: "40000", status: "pending", requestedBy: "Rachel Green", rationale: "Data volume larger than estimated" },
    { title: "Cloud Migration - Security Audit", client: "CloudBase", deltaValue: "25000", status: "draft", rationale: "Compliance requirement identified in discovery" },
  ]).onConflictDoNothing();

  // Phases
  await db.insert(phasesTable).values([
    { name: "Discovery & Planning", project: "Platform Modernization", status: "completed", completion: 100, owner: "Alice Johnson", dueDate: "2026-01-31", criteria: "Architecture approved, team assembled" },
    { name: "Core API Migration", project: "Platform Modernization", status: "in_progress", completion: 65, owner: "Alice Johnson", dueDate: "2026-04-30", blockers: "Legacy auth service dependency" },
    { name: "Frontend Rebuild", project: "Platform Modernization", status: "not_started", completion: 0, owner: "Bob Smith", dueDate: "2026-07-31" },
    { name: "Data Ingestion Layer", project: "Data Pipeline Rebuild", status: "in_progress", completion: 80, owner: "Carol Davis", dueDate: "2026-03-31" },
    { name: "Transformation Engine", project: "Data Pipeline Rebuild", status: "not_started", completion: 0, owner: "Carol Davis", dueDate: "2026-06-30" },
  ]).onConflictDoNothing();

  // Forecasts
  await db.insert(forecastsTable).values([
    { period: "Q2 2026", revenue: "485000", headcount: 12, scenario: "base", status: "approved", assumptions: "3 new placements, 2 project closings" },
    { period: "Q3 2026", revenue: "620000", headcount: 15, scenario: "base", status: "draft", assumptions: "4 new placements, CloudBase project ramp" },
    { period: "Q4 2026", revenue: "780000", headcount: 18, scenario: "optimistic", status: "draft", assumptions: "Strong hiring market, 2 new enterprise clients" },
    { period: "Q2 2026", revenue: "390000", headcount: 10, scenario: "conservative", status: "draft", assumptions: "Market slowdown, 1 client churn risk" },
  ]).onConflictDoNothing();

  // Onboarding Tasks
  await db.insert(onboardingTasksTable).values([
    { title: "Background check completed", candidate: "James Rodriguez", category: "compliance", status: "completed", assignee: "Emma Lee", dueDate: "2026-01-20" },
    { title: "Equipment provisioning", candidate: "James Rodriguez", category: "it", status: "completed", assignee: "Emma Lee", dueDate: "2026-01-28" },
    { title: "Day 1 orientation scheduled", candidate: "James Rodriguez", category: "hr", status: "completed", assignee: "Emma Lee", dueDate: "2026-02-01" },
    { title: "Benefits enrollment", candidate: "Sarah Chen", category: "hr", status: "in_progress", assignee: "Emma Lee", dueDate: "2026-04-01" },
    { title: "Laptop setup", candidate: "Sarah Chen", category: "it", status: "pending", assignee: "Emma Lee", dueDate: "2026-03-12" },
    { title: "Manager introduction call", candidate: "Marcus Williams", category: "onboarding", status: "pending", assignee: "Bob Smith", dueDate: "2026-04-02" },
  ]).onConflictDoNothing();

  // Integrations
  await db.insert(integrationsTable).values([
    { name: "LinkedIn Recruiter", category: "sourcing", description: "Sync candidate profiles and job postings with LinkedIn Recruiter", status: "active", lastSync: new Date().toISOString() },
    { name: "Greenhouse ATS", category: "ats", description: "Bidirectional sync with Greenhouse applicant tracking", status: "active", lastSync: new Date().toISOString() },
    { name: "Salesforce CRM", category: "crm", description: "Client and contact sync with Salesforce", status: "inactive" },
    { name: "Slack", category: "communication", description: "Notifications and workflow alerts in Slack", status: "active", lastSync: new Date().toISOString() },
    { name: "QuickBooks", category: "finance", description: "Invoice and payment sync with QuickBooks Online", status: "inactive" },
    { name: "Calendly", category: "scheduling", description: "Interview scheduling via Calendly integration", status: "active", lastSync: new Date().toISOString() },
    { name: "DocuSign", category: "documents", description: "E-signature workflows for contracts and placements", status: "inactive" },
    { name: "Google Workspace", category: "productivity", description: "Gmail, Calendar, and Drive integration", status: "active", lastSync: new Date().toISOString() },
  ]).onConflictDoNothing();

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
