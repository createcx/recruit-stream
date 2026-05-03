import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useListResources, useListProjects } from "@workspace/api-client-react";

export default function Planning() {
  const { data: resources, isLoading: isLoadingRes } = useListResources();
  const { data: projects, isLoading: isLoadingProj } = useListProjects();

  return (
    <AppLayout activePage="planning">
      <div className="p-8 flex flex-col h-full bg-slate-50 gap-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Resource Planning</h1>
        
        <div className="grid grid-cols-2 gap-6">
           <div className="bg-white border rounded p-4 shadow-sm">
             <h2 className="text-xl font-semibold mb-4">Unallocated Resources</h2>
             {isLoadingRes ? <p>Loading...</p> : (
               <div className="space-y-2">
                 {resources?.filter(r => r.utilization !== undefined && r.utilization < 100).map(r => (
                   <div key={r.id} className="p-3 border rounded">
                     <p className="font-bold">{r.name}</p>
                     <p className="text-sm text-muted-foreground">{r.utilization}% utilized</p>
                   </div>
                 ))}
               </div>
             )}
           </div>

           <div className="bg-white border rounded p-4 shadow-sm">
             <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
             {isLoadingProj ? <p>Loading...</p> : (
               <div className="space-y-2">
                 {projects?.filter(p => p.status === 'active').map(p => (
                   <div key={p.id} className="p-3 border rounded">
                     <p className="font-bold">{p.name}</p>
                     <p className="text-sm text-muted-foreground">Team Size: {p.teamSize}</p>
                   </div>
                 ))}
               </div>
             )}
           </div>
        </div>
      </div>
    </AppLayout>
  );
}
