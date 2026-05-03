import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Eye, 
  Edit2, 
  MoreHorizontal, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Upload,
  Calendar,
  Briefcase,
  Building,
  User,
  CheckSquare,
  Square,
  FileText,
  Mail,
  Send,
  Phone,
  FileCheck
} from "lucide-react";

type OnboardingStatus = "completed" | "on-track" | "delayed";
type StepStatus = "done" | "current" | "pending";

interface ChecklistItem {
  id: string;
  label: string;
  status: StepStatus;
}

interface DocumentItem {
  id: string;
  name: string;
  status: "submitted" | "pending";
}

interface OnboardingRecord {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  jobTitle: string;
  company: string;
  startDate: string;
  progress: number;
  currentStep: string;
  status: OnboardingStatus;
  checklist: ChecklistItem[];
  documents: DocumentItem[];
  contacts: {
    hr: { name: string; email: string; phone: string };
    it: { name: string; email: string };
  };
  notes: string;
}

const MOCK_DATA: OnboardingRecord[] = [
  {
    id: "ob-1",
    candidateName: "Carol Thompson",
    candidateAvatar: "CT",
    jobTitle: "DevOps Lead",
    company: "Acme",
    startDate: "2025-02-01",
    progress: 100,
    currentStep: "Completed",
    status: "completed",
    checklist: [
      { id: "c1", label: "Offer Letter", status: "done" },
      { id: "c2", label: "Background Check", status: "done" },
      { id: "c3", label: "Drug Screen", status: "done" },
      { id: "c4", label: "Reference Check", status: "done" },
      { id: "c5", label: "Equipment Request", status: "done" },
      { id: "c6", label: "System Access", status: "done" },
      { id: "c7", label: "IT Setup", status: "done" },
      { id: "c8", label: "Day-1 Welcome", status: "done" },
    ],
    documents: [
      { id: "d1", name: "Signed Offer Letter.pdf", status: "submitted" },
      { id: "d2", name: "W-4 Tax Form.pdf", status: "submitted" },
      { id: "d3", name: "Direct Deposit.pdf", status: "submitted" },
    ],
    contacts: {
      hr: { name: "Sarah Jenkins", email: "sarah@acme.com", phone: "555-0192" },
      it: { name: "IT Support Helpdesk", email: "it@acme.com" }
    },
    notes: "All onboarding steps completed successfully. Ready for day one."
  },
  {
    id: "ob-2",
    candidateName: "Alice Johnson",
    candidateAvatar: "AJ",
    jobTitle: "Sr React Engineer",
    company: "Acme",
    startDate: "2026-06-01",
    progress: 35,
    currentStep: "Background Check",
    status: "on-track",
    checklist: [
      { id: "c1", label: "Offer Letter", status: "done" },
      { id: "c2", label: "Background Check", status: "current" },
      { id: "c3", label: "Drug Screen", status: "pending" },
      { id: "c4", label: "Reference Check", status: "pending" },
      { id: "c5", label: "Equipment Request", status: "pending" },
      { id: "c6", label: "System Access", status: "pending" },
      { id: "c7", label: "IT Setup", status: "pending" },
      { id: "c8", label: "Day-1 Welcome", status: "pending" },
    ],
    documents: [
      { id: "d1", name: "Signed Offer Letter.pdf", status: "submitted" },
      { id: "d2", name: "Background Check Consent.pdf", status: "pending" },
      { id: "d3", name: "I-9 Form.pdf", status: "pending" },
    ],
    contacts: {
      hr: { name: "Sarah Jenkins", email: "sarah@acme.com", phone: "555-0192" },
      it: { name: "IT Support Helpdesk", email: "it@acme.com" }
    },
    notes: "Waiting on background check provider to complete processing. Expected by Friday."
  },
  {
    id: "ob-3",
    candidateName: "Bob Martinez",
    candidateAvatar: "BM",
    jobTitle: "VP Product",
    company: "TechCorp",
    startDate: "2026-07-01",
    progress: 10,
    currentStep: "Offer Letter Sent",
    status: "on-track",
    checklist: [
      { id: "c1", label: "Offer Letter", status: "current" },
      { id: "c2", label: "Background Check", status: "pending" },
      { id: "c3", label: "Drug Screen", status: "pending" },
      { id: "c4", label: "Reference Check", status: "pending" },
      { id: "c5", label: "Equipment Request", status: "pending" },
      { id: "c6", label: "System Access", status: "pending" },
      { id: "c7", label: "IT Setup", status: "pending" },
      { id: "c8", label: "Day-1 Welcome", status: "pending" },
    ],
    documents: [
      { id: "d1", name: "Signed Offer Letter.pdf", status: "pending" },
      { id: "d2", name: "NDA.pdf", status: "pending" },
      { id: "d3", name: "Direct Deposit.pdf", status: "pending" },
    ],
    contacts: {
      hr: { name: "Michael Chang", email: "m.chang@techcorp.io", phone: "555-0284" },
      it: { name: "TechCorp IT", email: "it@techcorp.io" }
    },
    notes: "Offer letter sent this morning via DocuSign. Following up tomorrow if not signed."
  }
];

export function Onboarding() {
  const [selected, setSelected] = useState<OnboardingRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const openDrawer = (record: OnboardingRecord, edit: boolean = false) => {
    setSelected(record);
    setEditMode(edit);
    setDrawerOpen(true);
    setOpenDropdown(null);
  };

  const getStatusBadge = (status: OnboardingStatus) => {
    switch (status) {
      case "completed":
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20"><CheckCircle2 className="h-3 w-3" /> Completed</span>;
      case "on-track":
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"><Clock className="h-3 w-3" /> On-Track</span>;
      case "delayed":
        return <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"><AlertCircle className="h-3 w-3" /> Delayed</span>;
    }
  };

  return (
    <AppLayout activePage="onboarding">
      <div className="flex h-full flex-col p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Onboarding</h1>
            <p className="text-sm text-gray-500">Track placement onboarding processes and checklist completion.</p>
          </div>
        </div>

        {/* Top Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
              <Clock className="h-4 w-4" />
              Active Onboarding
            </div>
            <div className="text-3xl font-bold text-gray-900">2</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
              <CheckCircle2 className="h-4 w-4" />
              Completed This Month
            </div>
            <div className="text-3xl font-bold text-gray-900">1</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
              <Calendar className="h-4 w-4" />
              Avg Days to Complete
            </div>
            <div className="text-3xl font-bold text-gray-900">12d</div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">CANDIDATE</th>
                  <th className="px-6 py-4">JOB + COMPANY</th>
                  <th className="px-6 py-4">START DATE</th>
                  <th className="px-6 py-4">PROGRESS</th>
                  <th className="px-6 py-4">CURRENT STEP</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {MOCK_DATA.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => openDrawer(record)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600">
                          {record.candidateAvatar}
                        </div>
                        <span className="font-medium text-gray-900">{record.candidateName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{record.jobTitle}</span>
                        <span className="text-gray-500 text-xs">@ {record.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {record.startDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${record.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                            style={{ width: `${record.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{record.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {record.currentStep}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(record.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => openDrawer(record)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => openDrawer(record, true)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => setOpenDropdown(openDropdown === record.id ? null : record.id)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                          
                          {openDropdown === record.id && (
                            <div className="absolute right-0 top-full mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10 py-1">
                              <button onClick={() => { openDrawer(record); setOpenDropdown(null); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</button>
                              <button onClick={() => { openDrawer(record, true); setOpenDropdown(null); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</button>
                              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Clone</button>
                              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Archive</button>
                              <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <DrawerPanel 
        isOpen={drawerOpen} 
        onClose={() => { setDrawerOpen(false); setEditMode(false); }}
        title={editMode ? "Edit Onboarding" : "Onboarding Details"}
      >
        {selected && (
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Header Section */}
              <div className="flex flex-col gap-6 rounded-xl border border-gray-200 p-6 bg-white shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-semibold text-slate-600">
                      {selected.candidateAvatar}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selected.candidateName}</h2>
                      <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <Briefcase className="h-4 w-4" />
                        <span>{selected.jobTitle} @ {selected.company}</span>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(selected.status)}
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">Overall Progress</span>
                    <span className="font-semibold text-gray-900">{selected.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${selected.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                      style={{ width: `${selected.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Start Date</span>
                    <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {selected.startDate}
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Current Step</span>
                    <div className="text-sm text-gray-900 font-medium">
                      {selected.currentStep}
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-gray-500" />
                  Onboarding Checklist
                </h3>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="divide-y divide-gray-100">
                    {selected.checklist.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                        {item.status === 'done' ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        ) : item.status === 'current' ? (
                          <div className="h-5 w-5 rounded-full border-2 border-blue-500 flex items-center justify-center shrink-0">
                            <div className="h-2 w-2 bg-blue-500 rounded-full" />
                          </div>
                        ) : (
                          <Square className="h-5 w-5 text-gray-300 shrink-0" />
                        )}
                        <span className={`text-sm ${item.status === 'done' ? 'text-gray-500 line-through' : item.status === 'current' ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                          {item.label}
                        </span>
                        {item.status === 'current' && (
                          <span className="ml-auto text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                            In Progress
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  Documents Needed
                </h3>
                <div className="grid gap-3">
                  {selected.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                      <div className="flex items-center gap-3">
                        <FileCheck className={`h-5 w-5 ${doc.status === 'submitted' ? 'text-emerald-500' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        doc.status === 'submitted' 
                          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' 
                          : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20'
                      }`}>
                        {doc.status === 'submitted' ? 'Submitted' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacts Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  Key Contacts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">HR Contact</div>
                    <div className="font-medium text-gray-900 mb-1">{selected.contacts.hr.name}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <Mail className="h-3.5 w-3.5" />
                      {selected.contacts.hr.email}
                    </div>
                    {selected.contacts.hr.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Phone className="h-3.5 w-3.5" />
                        {selected.contacts.hr.phone}
                      </div>
                    )}
                  </div>
                  <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">IT Contact</div>
                    <div className="font-medium text-gray-900 mb-1">{selected.contacts.it.name}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <Mail className="h-3.5 w-3.5" />
                      {selected.contacts.it.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Notes</h3>
                <textarea 
                  className="w-full min-h-[120px] rounded-xl border border-gray-300 p-4 text-sm text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-sm"
                  defaultValue={selected.notes}
                  placeholder="Add a note about this onboarding..."
                />
              </div>

            </div>
            
            {/* Drawer Footer */}
            <div className="border-t border-gray-200 bg-gray-50 p-6 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex gap-3">
                <button className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors">
                  Update Progress
                </button>
                <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors gap-2">
                  <Send className="h-4 w-4 text-gray-400" />
                  Send Reminder
                </button>
                <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors gap-2">
                  <Upload className="h-4 w-4 text-gray-400" />
                  Upload Doc
                </button>
                {selected.progress !== 100 && (
                  <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-emerald-50 hover:text-emerald-700 hover:ring-emerald-200 transition-colors">
                    Complete Onboarding
                  </button>
                )}
              </div>
              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete record">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
