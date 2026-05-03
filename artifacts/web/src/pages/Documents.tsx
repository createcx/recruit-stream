import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListDocuments, useGetDocument, useDeleteDocument } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, FileText, Download, Link2, User, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";

const docTypeColors: Record<string, string> = {
  resume: "bg-blue-50 text-blue-700 border-blue-200",
  contract: "bg-purple-50 text-purple-700 border-purple-200",
  offer: "bg-orange-50 text-orange-700 border-orange-200",
  report: "bg-slate-100 text-slate-700 border-slate-200",
  invoice: "bg-green-50 text-green-700 border-green-200",
};

export default function Documents() {
  const [search, setSearch] = useState("");
  const { data: docs, isLoading } = useListDocuments({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: doc, isLoading: isDocLoading } = useGetDocument(selectedId || 0, {
    query: { enabled: !!selectedId }
  });

  const deleteDocument = useDeleteDocument();

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
    if (confirm("Delete this document? This action cannot be undone.")) {
      await deleteDocument.mutateAsync({ id });
      closeDrawer();
    }
  };

  return (
    <AppLayout activePage="documents">
      <div className="flex flex-col h-full bg-slate-50">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
            <p className="text-sm text-slate-500 mt-1">Centralized document storage and management</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Upload Document
          </Button>
        </header>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search documents..."
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">{docs?.length || 0} documents</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Name</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Type</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Linked Entity</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Uploaded By</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Size</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Date</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7} className="p-4"><Skeleton className="h-10 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : docs?.map(d => (
                  <TableRow
                    key={d.id}
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => openDrawer(d.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                        <div className="font-semibold text-blue-600 group-hover:text-orange-600 transition-colors">{d.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium capitalize ${docTypeColors[d.type?.toLowerCase()] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                        {d.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      <span className="flex items-center gap-1.5">
                        {d.linkedEntity && <Link2 className="w-3.5 h-3.5 text-slate-400" />}
                        {d.linkedEntity || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{d.uploadedBy || "—"}</TableCell>
                    <TableCell className="text-slate-500 text-sm">{d.size || "—"}</TableCell>
                    <TableCell className="text-slate-500 text-sm">{new Date(d.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={e => openDrawer(d.id, e)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={e => openDrawer(d.id, e)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={e => openDrawer(d.id, e as any)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Metadata</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>Share Link</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(d.id)}>Delete</DropdownMenuItem>
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
        title={doc ? doc.name : "Document Details"}
        actions={
          doc ? (
            <div className="flex w-full items-center gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Edit Metadata</Button>
              <Button variant="outline" className="border-slate-200 text-slate-500 bg-transparent hover:bg-slate-100">Share Link</Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => doc && handleDelete(doc.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ) : undefined
        }
      >
        {isDocLoading ? (
          <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40 w-full" /></div>
        ) : doc && (
          <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <FileText className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{doc.name}</h2>
                  <Badge variant="outline" className={`font-medium mt-2 capitalize ${docTypeColors[doc.type?.toLowerCase()] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                    {doc.type}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">File Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Linked Entity</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-slate-400" />{doc.linkedEntity || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Uploaded By</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />{doc.uploadedBy || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">File Size</div>
                    <div className="text-sm font-semibold text-slate-900">{doc.size || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Upload Date</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {doc.notes && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Notes</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{doc.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
