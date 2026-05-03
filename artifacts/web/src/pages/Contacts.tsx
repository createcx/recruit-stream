import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListContacts, useGetContact, useDeleteContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, Mail, Phone, Building2, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Contacts() {
  const [search, setSearch] = useState("");
  const { data: contacts, isLoading } = useListContacts({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: contact, isLoading: isContactLoading } = useGetContact(selectedId || 0, {
    query: { enabled: !!selectedId }
  });

  const deleteContact = useDeleteContact();

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
    if (confirm("Delete this contact? This action cannot be undone.")) {
      await deleteContact.mutateAsync({ id });
      closeDrawer();
    }
  };

  return (
    <AppLayout activePage="contacts">
      <div className="flex flex-col h-full bg-slate-50">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
            <p className="text-sm text-slate-500 mt-1">Manage people and key stakeholders</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Contact
          </Button>
        </header>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search contacts..."
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">{contacts?.length || 0} contacts</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Name</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Email</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Phone</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Company</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Title</TableHead>
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
                ) : contacts?.map(c => (
                  <TableRow
                    key={c.id}
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => openDrawer(c.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-semibold text-sm">
                          {c.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{c.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{c.email || "—"}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{c.phone || "—"}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{c.company || "—"}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{c.title || "—"}</TableCell>
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
                            <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuItem>Log Activity</DropdownMenuItem>
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
        title={contact ? contact.name : "Contact Details"}
        actions={
          contact ? (
            <div className="flex w-full items-center gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">Edit Contact</Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Send Email</Button>
              <Button variant="outline" className="border-slate-200 text-slate-500 bg-transparent hover:bg-slate-100">Log Activity</Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => contact && handleDelete(contact.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ) : undefined
        }
      >
        {isContactLoading ? (
          <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40 w-full" /></div>
        ) : contact && (
          <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-orange-700 font-bold text-2xl">
                  {contact.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{contact.name}</h2>
                  {contact.title && <p className="text-slate-500 mt-1">{contact.title}</p>}
                  {contact.company && (
                    <p className="text-sm text-orange-600 font-medium flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5" />{contact.company}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Contact Info</h3>
                <div className="space-y-3">
                  {contact.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{contact.email}</span>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{contact.phone}</span>
                    </div>
                  )}
                  {contact.company && (
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{contact.company}</span>
                    </div>
                  )}
                </div>
              </div>

              {contact.notes && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Notes</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{contact.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
