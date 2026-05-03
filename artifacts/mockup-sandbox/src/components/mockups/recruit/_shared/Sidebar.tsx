import { Users, Briefcase, Building2, Contact, GitBranch, Award, Activity, UserCheck, FolderOpen, FileText, RefreshCw, FileCheck, TrendingUp, BookOpen, Settings, Plug, Home, ChevronDown } from "lucide-react";

interface SidebarProps {
  activePage?: string;
}

const sections = [
  {
    label: "RECRUITING",
    items: [
      { icon: Home, label: "Dashboard", page: "dashboard" },
      { icon: Users, label: "Candidates", page: "candidates" },
      { icon: Briefcase, label: "Jobs", page: "jobs" },
      { icon: Building2, label: "Companies", page: "companies" },
      { icon: Contact, label: "Contacts", page: "contacts" },
      { icon: GitBranch, label: "Pipeline", page: "pipeline" },
      { icon: Award, label: "Placements", page: "placements" },
      { icon: Activity, label: "Activities", page: "activities" },
    ],
  },
  {
    label: "PROJECTS",
    items: [
      { icon: UserCheck, label: "Clients", page: "clients" },
      { icon: FolderOpen, label: "Projects", page: "projects" },
      { icon: FileText, label: "SOWs", page: "sows" },
      { icon: RefreshCw, label: "Change Orders", page: "change-orders" },
      { icon: FileCheck, label: "Documents", page: "documents" },
      { icon: TrendingUp, label: "Financials", page: "financials" },
    ],
  },
  {
    label: "RESOURCES",
    items: [
      { icon: Users, label: "Resources", page: "resources" },
      { icon: BookOpen, label: "Planning", page: "planning" },
      { icon: GitBranch, label: "Phases & Gates", page: "phases" },
      { icon: TrendingUp, label: "Forecasting", page: "forecasting" },
    ],
  },
  {
    label: "ONBOARDING",
    items: [
      { icon: UserCheck, label: "Onboarding", page: "onboarding" },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { icon: Plug, label: "Integrations", page: "integrations" },
    ],
  },
];

export function Sidebar({ activePage = "dashboard" }: SidebarProps) {
  return (
    <div className="w-[168px] min-h-screen flex flex-col" style={{ backgroundColor: "#1a1f2e" }}>
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#f97316" }}>
            R
          </div>
          <div>
            <div className="text-white text-xs font-bold leading-tight">RECRUITER</div>
            <div className="text-white/50 text-[9px] leading-tight">Staffing Platform</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label} className="mb-2">
            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-[9px] font-semibold tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
                {section.label}
              </span>
              <ChevronDown className="w-2.5 h-2.5" style={{ color: "rgba(255,255,255,0.25)" }} />
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.page;
              return (
                <div
                  key={item.page}
                  className="flex items-center gap-2 px-3 py-[5px] mx-1 rounded cursor-pointer transition-all"
                  style={{
                    backgroundColor: isActive ? "rgba(249,115,22,0.15)" : "transparent",
                    borderLeft: isActive ? "2px solid #f97316" : "2px solid transparent",
                  }}
                >
                  <Icon
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: isActive ? "#f97316" : "rgba(255,255,255,0.55)" }}
                  />
                  <span
                    className="text-[11px] leading-tight"
                    style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.65)" }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-3 py-2 border-t border-white/10">
        <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>v1.0.0</span>
      </div>
    </div>
  );
}
