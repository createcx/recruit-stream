import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListOnboardingTasks, useGetOnboardingTask } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, CheckSquare, User, CalendarDays, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Onboarding() {
  const [search, setSearch] = useState("");
  const { data: tasks, isLoading } = useListOnboardingTasks({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: task, isLoading: isTaskLoading } = useGetOnboardingTask(selectedId || 0, {
    query: { enabled: !!selectedId }
  });

  const openDrawer = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedId(id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedId(null), 300);
  };

  const handleDelete = (_id: number) => {
    alert("Delete not yet available for this record type.");
  };

  const getStatusColor = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "complete" || s === "completed" || s === "done") return "bg-green-50 text-green-700 border-green-200";
    if (s === "in progress") return "bg-blue-50 text-blue-700 border-blue-200";
    if (s === "blocked") return "bg-red-50 text-red-600 border-red-200";
    if (s === "pending" || s === "not started") return "bg-slate-100 text-slate-600 border-slate-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const getCategoryColor = (cat: string) => {
    const c = (cat || "").toLowerCase();
    if (c === "hr" || c === "hr & admin") return "bg-purple-50 text-purple-700 border-purple-200";
    if (c === "it" || c === "it setup") return "bg-blue-50 text-blue-700 border-blue-200";
    if (c === "legal" || c === "compliance") return "bg-orange-50 text-orange-700 border-orange-200";
    if (c === "training") return "bg-green-50 text-green-700 border-green-200";
    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  return (
    <AppLayout activePage="onboarding">
      <div className="flex flex-col h-full bg-slate-50">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Onboarding</h1>
            <p className="text-sm text-slate-500 mt-1">Manage new hire onboarding tasks and workflows</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Task
          </Button>
        </header>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search onboarding tasks..."
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">{tasks?.length || 0} tasks</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Task Title</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Candidate</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Category</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Assignee</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Due Date</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Status</TableHead>
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
                ) : tasks?.map(t => (
                  <TableRow
                    key={t.id}
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => openDrawer(t.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <CheckSquare className="w-4 h-4 text-slate-400 shrink-0" />
                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{t.title}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{t.candidate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getCategoryColor(t.category)}`}>{t.category}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {t.assignee || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                        {t.dueDate || "—"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getStatusColor(t.status)}`}>{t.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={e => openDrawer(t.id, e)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={e => openDrawer(t.id, e)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={e => openDrawer(t.id, e as any)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                            <DropdownMenuItem>Reassign</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(t.id)}>Delete</DropdownMenuItem>
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
        title={task ? task.title : "Task Details"}
        actions={
          task ? (
            <div className="flex w-full items-center gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">Mark Complete</Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Edit Task</Button>
              <Button variant="outline" className="border-slate-200 text-slate-500 bg-transparent hover:bg-slate-100">Reassign</Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => task && handleDelete(task.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ) : undefined
        }
      >
        {isTaskLoading ? (
          <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40 w-full" /></div>
        ) : task && (
          <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="outline" className={`font-medium ${getCategoryColor(task.category)}`}>{task.category}</Badge>
                  <Badge variant="outline" className={`font-medium ${getStatusColor(task.status)}`}>{task.status}</Badge>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{task.title}</h2>
                <p className="text-orange-600 font-medium mt-1">{task.candidate}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Task Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Assignee</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />{task.assignee || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Due Date</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" />{task.dueDate || "—"}
                    </div>
                  </div>
                </div>
              </div>

              {task.notes && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Notes</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{task.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
