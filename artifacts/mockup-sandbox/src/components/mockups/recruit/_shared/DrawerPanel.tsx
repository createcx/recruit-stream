import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

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
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
      />

      {/* Drawer panel — 60% width */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out"
        style={{
          width: "60%",
          backgroundColor: "#ffffff",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-7 py-5 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {children}
        </div>

        {/* CTAs footer */}
        {actions && (
          <div className="px-7 py-4 border-t border-gray-200 flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </>
  );
}
