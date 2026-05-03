import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  FileText, 
  FileIcon,
  Download,
  Share2,
  RefreshCw,
  Tag,
  Trash2,
  Clock,
  Users,
  Edit2,
  Copy,
  Archive
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../../../ui/dropdown-menu";

interface Document {
  id: string;
  fileName: string;
  fileExt: string;
  type: string;
  relatedTo: string;
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  tags: string[];
}

const DOCUMENTS: Document[] = [
  { id: "1", fileName: "Alice Johnson Resume", fileExt: "pdf", type: "Resume", relatedTo: "Alice Johnson", uploadedBy: "Sarah Admin", uploadDate: "2026-04-01", fileSize: "245KB", tags: ["Resume", "Frontend"] },
  { id: "2", fileName: "SOW-2025-001", fileExt: "pdf", type: "SOW", relatedTo: "Apex Technologies", uploadedBy: "John PM", uploadDate: "2025-01-10", fileSize: "1.2MB", tags: ["Contract", "Q1"] },
  { id: "3", fileName: "Carol Thompson Assessment", fileExt: "pdf", type: "Assessment", relatedTo: "Carol Thompson", uploadedBy: "Mike Recruiter", uploadDate: "2025-01-20", fileSize: "89KB", tags: ["Technical"] },
  { id: "4", fileName: "Acme Technologies NDA", fileExt: "pdf", type: "NDA", relatedTo: "Acme Technologies", uploadedBy: "Sarah Admin", uploadDate: "2024-12-01", fileSize: "156KB", tags: ["Legal"] },
  { id: "5", fileName: "Bob Martinez Resume", fileExt: "docx", type: "Resume", relatedTo: "Bob Martinez", uploadedBy: "Mike Recruiter", uploadDate: "2026-03-15", fileSize: "312KB", tags: ["Resume", "Backend"] },
  { id: "6", fileName: "Invoice INV-2025-001", fileExt: "pdf", type: "Invoice", relatedTo: "Acme Technologies", uploadedBy: "Billing", uploadDate: "2025-02-15", fileSize: "78KB", tags: ["Billing"] },
  { id: "7", fileName: "TechCorp MSA", fileExt: "pdf", type: "Contract", relatedTo: "TechCorp Solutions", uploadedBy: "John PM", uploadDate: "2024-11-01", fileSize: "892KB", tags: ["Legal", "Signed"] },
  { id: "8", fileName: "Dave Kim Resume", fileExt: "pdf", type: "Resume", relatedTo: "Dave Kim", uploadedBy: "Sarah Admin", uploadDate: "2026-04-20", fileSize: "198KB", tags: ["Resume", "Design"] },
];

export function Documents() {
  const [search, setSearch] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredDocs = DOCUMENTS.filter(doc => 
    doc.fileName.toLowerCase().includes(search.toLowerCase()) ||
    doc.relatedTo.toLowerCase().includes(search.toLowerCase())
  );

  const openDrawer = (doc: Document, edit: boolean = false) => {
    setSelectedDoc(doc);
    setIsEditMode(edit);
    setDrawerOpen(true);
  };

  const getFileIcon = (ext: string) => {
    if (ext === "pdf") return <FileIcon className="h-4 w-4 text-red-500" />;
    if (ext === "docx") return <FileText className="h-4 w-4 text-blue-500" />;
    return <FileText className="h-4 w-4 text-gray-500" />;
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "Resume": return "bg-blue-100 text-blue-800 border-blue-200";
      case "SOW": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Contract": return "bg-amber-100 text-amber-800 border-amber-200";
      case "NDA": return "bg-rose-100 text-rose-800 border-rose-200";
      case "Invoice": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <AppLayout activePage="documents">
      <div className="flex-1 flex flex-col h-full bg-slate-50">
        {/* Page Header */}
        <div className="px-8 py-6 border-b border-slate-200 bg-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and organize all files securely</p>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors">
            <Plus className="h-4 w-4" />
            Upload Document
          </button>
        </div>

        {/* Filters */}
        <div className="px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search files, candidates, companies..." 
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
              <Filter className="h-4 w-4 text-slate-500" />
              Document Type
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">File Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Related To</th>
                  <th className="px-6 py-4">Uploaded By</th>
                  <th className="px-6 py-4">Upload Date</th>
                  <th className="px-6 py-4">File Size</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filteredDocs.map((doc) => (
                  <tr 
                    key={doc.id} 
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    onClick={() => openDrawer(doc)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.fileExt)}
                        <span className="font-medium text-slate-900">{doc.fileName}.{doc.fileExt}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(doc.type)}`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium hover:text-orange-600 hover:underline cursor-pointer" onClick={(e) => e.stopPropagation()}>
                      {doc.relatedTo}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 text-slate-600">{doc.uploadDate}</td>
                    <td className="px-6 py-4 text-slate-600">{doc.fileSize}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => openDrawer(doc)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => openDrawer(doc, true)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md"
                          title="Edit Document"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => openDrawer(doc)}>
                              <Eye className="mr-2 h-4 w-4 text-slate-500" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDrawer(doc, true)}>
                              <Edit2 className="mr-2 h-4 w-4 text-slate-500" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4 text-slate-500" /> Clone
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4 text-slate-500" /> Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-600">
                              <Trash2 className="mr-2 h-4 w-4 text-red-500" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDocs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      No documents found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DrawerPanel 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        title={isEditMode ? "Edit Document" : "Document Details"}
        width="60%"
        footer={
          <div className="flex justify-between items-center w-full">
            <button className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50">
              <Trash2 className="h-4 w-4" /> Delete
            </button>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-slate-300 text-slate-700 bg-white rounded-md text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 flex items-center gap-2">
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          </div>
        }
      >
        {selectedDoc && (
          <div className="p-6 space-y-8">
            {/* Section 1: File header */}
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 border border-slate-200">
                {selectedDoc.fileExt === 'pdf' ? <FileIcon className="h-8 w-8 text-red-500" /> : <FileText className="h-8 w-8 text-blue-500" />}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 break-all">{selectedDoc.fileName}.{selectedDoc.fileExt}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(selectedDoc.type)}`}>
                    {selectedDoc.type}
                  </span>
                  <span>•</span>
                  <span>{selectedDoc.fileSize}</span>
                  <span>•</span>
                  <span>Uploaded {selectedDoc.uploadDate}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Preview placeholder */}
            <div className="bg-slate-100 border border-slate-200 border-dashed rounded-lg h-64 flex flex-col items-center justify-center text-slate-500">
              <FileIcon className="h-12 w-12 text-slate-300 mb-3" />
              <p className="font-medium">Preview not available</p>
              <p className="text-sm mt-1 mb-4">Click download to view this file</p>
              <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 flex items-center gap-2 shadow-sm">
                <Download className="h-4 w-4" /> Download File
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Section 3: Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Document Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-3">
                    <span className="text-slate-500">Related To</span>
                    <a href="#" className="col-span-2 text-orange-600 hover:underline font-medium">{selectedDoc.relatedTo}</a>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-slate-500">Uploaded By</span>
                    <span className="col-span-2 text-slate-900">{selectedDoc.uploadedBy}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-slate-500">Tags</span>
                    <div className="col-span-2 flex flex-wrap gap-1">
                      {selectedDoc.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                          {tag}
                        </span>
                      ))}
                      <button className="inline-flex items-center px-2 py-0.5 rounded bg-white text-slate-500 text-xs font-medium border border-slate-300 border-dashed hover:bg-slate-50 hover:text-slate-700">
                        <Plus className="h-3 w-3 mr-1" /> Add
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex gap-2">
                  <button className="flex-1 px-3 py-1.5 border border-slate-300 text-slate-700 bg-white rounded-md text-xs font-medium hover:bg-slate-50 flex justify-center items-center gap-2">
                    <RefreshCw className="h-3.5 w-3.5" /> Replace File
                  </button>
                  <button className="flex-1 px-3 py-1.5 border border-slate-300 text-slate-700 bg-white rounded-md text-xs font-medium hover:bg-slate-50 flex justify-center items-center gap-2">
                    <Tag className="h-3.5 w-3.5" /> Edit Tags
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Section 4: Version history */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Version History</h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    <div className="relative flex items-center justify-between group">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-orange-500 bg-white shadow shrink-0 text-[10px] font-bold text-orange-600 z-10">
                          v2
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-slate-900">Current Version</p>
                          <p className="text-xs text-slate-500">Uploaded {selectedDoc.uploadDate} by {selectedDoc.uploadedBy}</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between group">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-300 bg-white shadow shrink-0 text-[10px] font-bold text-slate-500 z-10">
                          v1
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-slate-900">Initial Upload</p>
                          <p className="text-xs text-slate-500">Uploaded 2024-03-15 by Sarah Admin</p>
                        </div>
                      </div>
                      <button className="text-xs text-orange-600 hover:underline">Restore</button>
                    </div>
                  </div>
                </div>

                {/* Section 5: Shared with */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Shared With</h3>
                  <div className="flex -space-x-2 overflow-hidden items-center">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://ui-avatars.com/api/?name=Sarah+Admin&background=random" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://ui-avatars.com/api/?name=Mike+Recruiter&background=random" alt="" />
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white bg-slate-100 border border-slate-300 text-slate-500 hover:bg-slate-200 z-10">
                      <Plus className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-slate-500 ml-4 font-medium">2 team members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
