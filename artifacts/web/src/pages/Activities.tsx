import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListActivities, useGetActivity, useDeleteActivity } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, Activity, User, Building2, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";

const typeColors: Record<string, string> = {
  call: "bg-blue-50 text-blue-700 border-blue-200",
  email: "bg-purple-50 text-purple-700 border-purple-200",
  meeting: "bg-orange-50 text-orange-700 border-orange-200",
  note: "bg-slate-100 text-slate-700 border-slate-200",
  interview: "bg-green-50 text-green-700 border-green-200",
};

export default function Activities() {
  const [search, setSearch] = useState("");
  const { data: activities, isLoading } = useListActivities({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: activity, isLoading: isActivityLoading } = useGetActivity(selectedId || 0, {
    query: { enabled: !!selectedId }
  });

  const deleteActivity = useDeleteActivity();

  const openDrawer = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedId(id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedId(null), 300);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this activity log? This action cannot be undone.")) {
      await deleteActivity.mutateAsync({ id });
      closeDrawer();
    }
  };

  return (
    <AppLayout activePage="activities">
      <div className="flex flex-col h-full bg-slate-50">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Activity Log</h1>
            <p className="text-sm text-slate-500 mt-1">Track all interactions and touchpoints</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Log Activity
          </Button>
        </header>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search activities..."
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">{activities?.length || 0} activities</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Type</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Description</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Candidate</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Company</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Logged By</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Date</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7} className="p-4"><Skeleton className="h-10 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : activities?.map(a => (
                  <TableRow
                    key={a.id}
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => openDrawer(a.id)}
                  >
                    <TableCell>
                      <Badge variant="outline" className={`font-medium capitalize ${typeColors[a.type?.toLowerCase()] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                        {a.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900 group-hover:text-orange-600 transition-colors truncate max-w-[220px]">{a.description}</div>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{a.candidate || "—"}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{a.company || "—"}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{a.loggedBy}</TableCell>
                    <TableCell className="text-slate-500 text-sm">{new Date(a.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={e => openDrawer(a.id, e)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={e => openDrawer(a.id, e)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={e => openDrawer(a.id, e as any)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Activity</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(a.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <DrawerPanel
        open={drawerOpen}
        onClose={closeDrawer}
        title="Activity Details"
        actions={
          activity ? (
            <div className="flex w-full items-center gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">Edit Activity</Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Duplicate</Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => activity && handleDelete(activity.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ) : undefined
        }
      >
        {isActivityLoading ? (
          <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40 w-full" /></div>
        ) : activity && (
          <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="outline" className={`font-medium capitalize ${typeColors[activity.type?.toLowerCase()] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                    {activity.type}
                  </Badge>
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{activity.description}</h2>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  {activity.candidate && (
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1">Candidate</div>
                      <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />{activity.candidate}
                      </div>
                    </div>
                  )}
                  {activity.company && (
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1">Company</div>
                      <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />{activity.company}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Logged By</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />{activity.loggedBy}
                    </div>
                  </div>
                </div>
              </div>

              {activity.notes && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Notes</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{activity.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
