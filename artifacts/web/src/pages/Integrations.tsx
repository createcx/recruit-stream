import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useListIntegrations, useToggleIntegration } from "@workspace/api-client-react";

export default function Integrations() {
  const { data, isLoading } = useListIntegrations();
  const toggleMutation = useToggleIntegration();

  return (
    <AppLayout activePage="integrations">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Integrations</h1>
        {isLoading ? <p>Loading...</p> : (
          <div className="grid gap-4">
            {data?.map(i => (
              <div key={i.id} className="p-4 bg-white border rounded flex justify-between">
                <span>{i.name}</span>
                <button 
                  onClick={() => toggleMutation.mutate({ id: i.id })}
                  className="px-2 py-1 bg-slate-100 rounded text-sm"
                >
                  Toggle
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
