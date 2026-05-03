import { Link } from "wouter";
import { 
  Users, Briefcase, Building2, Contact, GitBranch, Award, Activity, 
  UserCheck, FolderOpen, FileText, RefreshCw, FileCheck, TrendingUp, 
  BookOpen, Plug, Home, ChevronDown 
} from "lucide-react";

interface SidebarProps {
  activePage?: string;
}

const sections = [
  {
    label: "RECRUITING",
    items: [
      { icon: Home, label: "Dashboard", page: "dashboard", href: "/" },
      { icon: Users, label: "Candidates", page: "candidates", href: "/candidates" },
      { icon: Briefcase, label: "Jobs", page: "jobs", href: "/jobs" },
      { icon: Building2, label: "Companies", page: "companies", href: "/companies" },
      { icon: Contact, label: "Contacts", page: "contacts", href: "/contacts" },
      { icon: GitBranch, label: "Pipeline", page: "pipeline", href: "/pipeline" },
      { icon: Award, label: "Placements", page: "placements", href: "/placements" },
      { icon: Activity, label: "Activities", page: "activities", href: "/activities" },
    ],
  },
  {
    label: "PROJECTS",
    items: [
      { icon: UserCheck, label: "Clients", page: "clients", href: "/clients" },
      { icon: FolderOpen, label: "Projects", page: "projects", href: "/projects" },
      { icon: FileText, label: "SOWs", page: "sows", href: "/sows" },
      { icon: RefreshCw, label: "Change Orders", page: "change-orders", href: "/change-orders" },
      { icon: FileCheck, label: "Documents", page: "documents", href: "/documents" },
      { icon: TrendingUp, label: "Financials", page: "financials", href: "/financials" },
    ],
  },
  {
    label: "RESOURCES",
    items: [
      { icon: Users, label: "Resources", page: "resources", href: "/resources" },
      { icon: BookOpen, label: "Planning", page: "planning", href: "/planning" },
      { icon: GitBranch, label: "Phases & Gates", page: "phases", href: "/phases" },
      { icon: TrendingUp, label: "Forecasting", page: "forecasting", href: "/forecasting" },
    ],
  },
  {
    label: "ONBOARDING",
    items: [
      { icon: UserCheck, label: "Onboarding", page: "onboarding", href: "/onboarding" },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { icon: Plug, label: "Integrations", page: "integrations", href: "/integrations" },
    ],
  },
];

export function Sidebar({ activePage = "dashboard" }: SidebarProps) {
  return (
    <div className="w-[200px] min-h-screen flex flex-col bg-sidebar border-r border-sidebar-border">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center bg-primary text-white text-sm font-bold">
            R
          </div>
          <div>
            <div className="text-white text-sm font-bold leading-tight">RecruitStream</div>
            <div className="text-sidebar-foreground/50 text-[10px] leading-tight">Staffing Platform</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            <div className="flex items-center justify-between px-4 py-1.5">
              <span className="text-[10px] font-semibold tracking-wider text-sidebar-foreground/40">
                {section.label}
              </span>
              <ChevronDown className="w-3 h-3 text-sidebar-foreground/30" />
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.page;
              return (
                <Link
                  key={item.page}
                  href={item.href}
                  className="flex items-center gap-2.5 px-4 py-2 mx-2 rounded-md cursor-pointer transition-all"
                  style={{
                    backgroundColor: isActive ? "hsla(var(--primary) / 0.15)" : "transparent",
                    borderLeft: isActive ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                  }}
                  data-testid={`nav-${item.page}`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : "text-sidebar-foreground/50"}`}
                  />
                  <span
                    className={`text-xs font-medium leading-tight ${isActive ? "text-white" : "text-sidebar-foreground/70 hover:text-sidebar-foreground"}`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-sidebar-border">
        <span className="text-[10px] text-sidebar-foreground/30 font-mono">v1.0.0</span>
      </div>
    </div>
  );
}
