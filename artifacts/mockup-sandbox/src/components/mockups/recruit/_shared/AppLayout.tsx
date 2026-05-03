import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  activePage?: string;
}

export function AppLayout({ children, activePage }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar activePage={activePage} />
      <main className="flex-1 overflow-auto relative">
        {children}
      </main>
    </div>
  );
}
