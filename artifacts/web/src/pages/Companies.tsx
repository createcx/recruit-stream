import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListCompanies, useGetCompany, useDeleteCompany } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, Building2, MapPin, Globe, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Companies() {
  const [search, setSearch] = useState("");
  const { data: companies, isLoading } = useListCompanies({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: company, isLoading: isLoadingCompany } = useGetCompany(selectedId || 0, {
    query: { enabled: !!selectedId }
  });

  const deleteCompany = useDeleteCompany();

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
    if (confirm("Delete this company? This action cannot be undone.")) {
      await deleteCompany.mutateAsync({ id });
      closeDrawer();
    }
  };

  const getStatusColor = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "active") return "bg-green-50 text-green-700 border-green-200";
    if (s === "prospect") return "bg-blue-50 text-blue-700 border-blue-200";
    if (s === "inactive") return "bg-slate-100 text-slate-600 border-slate-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  return (
    <AppLayout activePage="companies">
      <div className="flex flex-col h-full bg-slate-50">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Companies</h1>
            <p className="text-sm text-slate-500 mt-1">Manage client organizations and accounts</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Company
          </Button>
        </header>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search companies..."
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">
            {companies?.length || 0} companies
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Company</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Industry</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Location</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Size</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={6} className="p-4"><Skeleton className="h-10 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : companies?.map(c => (
                  <TableRow
                    key={c.id}
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => openDrawer(c.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{c.name}</div>
                          {c.website && <div className="text-xs text-slate-400 mt-0.5">{c.website}</div>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{c.industry || "—"}</TableCell>
                    <TableCell className="text-slate-600">
                      <span className="flex items-center gap-1.5">
                        {c.location && <MapPin className="w-3.5 h-3.5 text-slate-400" />}
                        {c.location || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600">{c.size || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getStatusColor(c.status)}`}>{c.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={e => openDrawer(c.id, e)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={e => openDrawer(c.id, e)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={e => openDrawer(c.id, e as any)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Company</DropdownMenuItem>
                            <DropdownMenuItem>Add Contact</DropdownMenuItem>
                            <DropdownMenuItem>Add Job Order</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(c.id)}>Delete</DropdownMenuItem>
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
        title={company ? company.name : "Company Details"}
        actions={
          company ? (
            <div className="flex w-full items-center gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">Edit Company</Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Add Contact</Button>
              <Button variant="outline" className="border-slate-200 text-slate-500 bg-transparent hover:bg-slate-100">Add Job Order</Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => company && handleDelete(company.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ) : undefined
        }
      >
        {isLoadingCompany ? (
          <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40 w-full" /></div>
        ) : company && (
          <div className="flex flex-col bg-white rounded-lg border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <Building2 className="w-8 h-8 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{company.name}</h2>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <Badge variant="outline" className={`font-medium ${getStatusColor(company.status)}`}>{company.status}</Badge>
                    {company.industry && <span className="text-sm text-slate-500">{company.industry}</span>}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Company Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Industry</div>
                    <div className="text-sm font-semibold text-slate-900">{company.industry || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Company Size</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {company.size || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Location</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {company.location || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Website</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      {company.website || "—"}
                    </div>
                  </div>
                </div>
              </div>

              {company.notes && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Notes</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{company.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
