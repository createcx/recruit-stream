import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DrawerPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function DrawerPanel({ open, onClose, title, subtitle, children, actions }: DrawerPanelProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        data-testid="drawer-overlay"
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 h-[100dvh] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out w-full max-w-[60%] bg-white"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
        data-testid="drawer-panel"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 py-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-semibold text-foreground tracking-tight">{title}</h2>
            {subtitle && <p className="text-sm text-muted-foreground mt-1 font-medium">{subtitle}</p>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted"
            data-testid="drawer-close"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-slate-50/50">
          {children}
        </div>

        {/* CTAs footer */}
        {actions && (
          <div className="px-8 py-5 border-t border-border flex items-center justify-between bg-white shadow-[0_-4px_6px_-1px_rgb(0_0_0_/_0.05)]">
            {actions}
          </div>
        )}
      </div>
    </>
  );
}
