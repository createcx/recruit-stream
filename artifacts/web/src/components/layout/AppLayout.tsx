import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  activePage?: string;
}

export function AppLayout({ children, activePage }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-hidden">
      <Sidebar activePage={activePage} />
      <main className="flex-1 overflow-auto relative">
        {children}
      </main>
    </div>
  );
}
