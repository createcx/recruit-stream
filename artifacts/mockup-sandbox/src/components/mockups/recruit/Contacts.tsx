import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Search, Filter, Plus, MoreHorizontal, Eye, Edit2, 
  Trash2, Mail, Phone, MapPin, Briefcase, Calendar,
  Clock, FileText, ChevronDown, Copy, Archive
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  lastContact: string;
  status: "Active" | "Prospect";
  avatar: string;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "John Smith",
    title: "VP Engineering",
    company: "Acme Technologies",
    email: "john.smith@acme.tech",
    phone: "(415) 555-0192",
    role: "Hiring Manager",
    lastContact: "2 days ago",
    status: "Active",
    avatar: "JS"
  },
  {
    id: "2",
    name: "Sarah Lee",
    title: "HR Director",
    company: "TechCorp Solutions",
    email: "sarah.lee@techcorp.com",
    phone: "(650) 555-8912",
    role: "HR",
    lastContact: "1 week ago",
    status: "Active",
    avatar: "SL"
  },
  {
    id: "3",
    name: "Mike Chen",
    title: "CTO",
    company: "Global Staffing Inc",
    email: "mike.c@globalstaffing.com",
    phone: "(212) 555-3491",
    role: "Executive",
    lastContact: "3 weeks ago",
    status: "Prospect",
    avatar: "MC"
  },
  {
    id: "4",
    name: "Jennifer Park",
    title: "Head of Talent",
    company: "Acme Technologies",
    email: "j.park@acme.tech",
    phone: "(415) 555-0188",
    role: "HR",
    lastContact: "1 day ago",
    status: "Active",
    avatar: "JP"
  },
  {
    id: "5",
    name: "David Brown",
    title: "COO",
    company: "Northbridge Capital",
    email: "dbrown@northbridge.cap",
    phone: "(617) 555-9011",
    role: "Executive",
    lastContact: "1 month ago",
    status: "Prospect",
    avatar: "DB"
  },
  {
    id: "6",
    name: "Lisa Wang",
    title: "Engineering Manager",
    company: "Apex Technologies",
    email: "l.wang@apex.tech",
    phone: "(512) 555-2245",
    role: "Decision Maker",
    lastContact: "5 days ago",
    status: "Active",
    avatar: "LW"
  }
];

export function Contacts() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const openDrawer = (contact: Contact) => {
    setSelectedContact(contact);
    setDrawerOpen(true);
  };

  const getStatusColor = (status: string) => {
    if (status === "Active") return "bg-green-50 text-green-700 ring-green-600/20";
    if (status === "Prospect") return "bg-blue-50 text-blue-700 ring-blue-600/20";
    return "bg-gray-50 text-gray-700 ring-gray-600/20";
  };

  return (
    <AppLayout activePage="contacts">
      <div className="flex flex-col h-full bg-slate-50">
        {/* Page Header */}
        <div className="px-8 py-6 flex items-center justify-between bg-white border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Contacts</h1>
            <p className="text-sm text-slate-500 mt-1">Manage client relationships and hiring managers</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 text-slate-900 h-10 px-4 py-2">
              Import Contacts
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2 gap-2">
              <Plus className="h-4 w-4" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-8 py-4 flex items-center justify-between border-b border-slate-200 bg-white">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search contacts..."
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 pl-9 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 h-10 px-4 py-2 gap-2">
                <Filter className="h-4 w-4" />
                Role
                <ChevronDown className="h-3 w-3 ml-1 text-slate-400" />
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 h-10 px-4 py-2 gap-2">
                Company
                <ChevronDown className="h-3 w-3 ml-1 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50/80 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">NAME</th>
                  <th className="px-6 py-4">COMPANY</th>
                  <th className="px-6 py-4">CONTACT INFO</th>
                  <th className="px-6 py-4">ROLE</th>
                  <th className="px-6 py-4">LAST CONTACT</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contacts.map((contact) => (
                  <tr 
                    key={contact.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    onClick={() => openDrawer(contact)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium border border-slate-200">
                          {contact.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {contact.name}
                          </div>
                          <div className="text-slate-500 text-xs mt-0.5">{contact.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                          {contact.company.charAt(0)}
                        </div>
                        <span className="text-slate-700">{contact.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                          <Mail className="h-3 w-3 text-slate-400" />
                          {contact.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                          <Phone className="h-3 w-3 text-slate-400" />
                          {contact.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-700">{contact.role}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {contact.lastContact}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => openDrawer(contact)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => openDrawer(contact)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        
                        <div className="relative">
                          <button 
                            onClick={() => setDropdownOpen(dropdownOpen === contact.id ? null : contact.id)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                          
                          {dropdownOpen === contact.id && (
                            <div className="absolute right-0 mt-1 w-48 rounded-md border border-slate-200 bg-white shadow-lg py-1 z-10">
                              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                <Eye className="h-3.5 w-3.5 text-slate-400" /> View
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                <Edit2 className="h-3.5 w-3.5 text-slate-400" /> Edit
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                <Copy className="h-3.5 w-3.5 text-slate-400" /> Clone
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                <Archive className="h-3.5 w-3.5 text-slate-400" /> Archive
                              </button>
                              <div className="h-px bg-slate-200 my-1"></div>
                              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                <Trash2 className="h-3.5 w-3.5 text-red-500" /> Delete
                              </button>
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

        {/* Custom Drawer Implementation */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
              onClick={() => setDrawerOpen(false)}
            />
            
            {/* Drawer Panel */}
            <div className="relative w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full transform transition-transform border-l border-slate-200 animate-in slide-in-from-right duration-300">
              
              {/* Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-slate-700 text-xl font-medium border-2 border-slate-200 shadow-sm">
                    {selectedContact?.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{selectedContact?.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-600 font-medium">{selectedContact?.title}</span>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                        {selectedContact?.company}
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full p-2 hover:bg-slate-200 transition-colors text-slate-500"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-8 space-y-8">
                  
                  {/* Details Section */}
                  <section>
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" /> Contact Details
                    </h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Email</div>
                        <div className="text-sm text-slate-900 flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          <a href={`mailto:${selectedContact?.email}`} className="text-indigo-600 hover:underline">
                            {selectedContact?.email}
                          </a>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Phone</div>
                        <div className="text-sm text-slate-900 flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          {selectedContact?.phone}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Office</div>
                        <div className="text-sm text-slate-900 flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          San Francisco, CA
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">LinkedIn</div>
                        <div className="text-sm text-slate-900 flex items-center gap-2">
                          <svg className="h-3.5 w-3.5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                          <a href="#" className="text-indigo-600 hover:underline">
                            linkedin.com/in/{selectedContact?.name.toLowerCase().replace(' ', '')}
                          </a>
                        </div>
                      </div>
                      <div className="col-span-2 mt-2 pt-4 border-t border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Notes</div>
                        <div className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">
                          Key decision maker for all tech hires. Prefers candidates with 5+ years experience. 
                          Usually responds best to emails on Tuesday mornings.
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Open Job Orders */}
                  <section>
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-slate-400" /> Open Job Orders
                    </h3>
                    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-2.5 text-left font-medium text-slate-600">Role</th>
                            <th className="px-4 py-2.5 text-left font-medium text-slate-600">Status</th>
                            <th className="px-4 py-2.5 text-left font-medium text-slate-600">Days Open</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                            <td className="px-4 py-3 font-medium text-indigo-600">Senior Frontend Engineer</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">
                                Interviewing
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-500">14 days</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                            <td className="px-4 py-3 font-medium text-indigo-600">Product Manager</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20">
                                Sourcing
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-500">5 days</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Activity Timeline */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" /> Recent Interactions
                      </h3>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
                    </div>
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 pb-4">
                      <div className="relative pl-6">
                        <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-indigo-500"></span>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-slate-900">Meeting: Q3 Hiring Planning</h4>
                          <span className="text-xs text-slate-500">May 2, 2:00 PM</span>
                        </div>
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-100 mt-2">
                          Discussed timeline for new frontend roles. Budget approved for 2 seniors.
                        </p>
                      </div>
                      <div className="relative pl-6">
                        <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-slate-300"></span>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-slate-900">Email: Candidate Feedback</h4>
                          <span className="text-xs text-slate-500">April 28, 9:45 AM</span>
                        </div>
                        <p className="text-sm text-slate-600">Sent feedback notes on recent PM candidates.</p>
                      </div>
                      <div className="relative pl-6">
                        <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-slate-300"></span>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-slate-900">Call: Requirement Gathering</h4>
                          <span className="text-xs text-slate-500">April 15, 11:30 AM</span>
                        </div>
                        <p className="text-sm text-slate-600">Initial call to discuss the Product Manager role requirements.</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-8 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-orange-600 text-white hover:bg-orange-700 h-10 px-6 py-2 shadow-sm">
                    Edit Contact
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-10 px-4 py-2 shadow-sm">
                    Log Activity
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-10 px-4 py-2 shadow-sm">
                    Send Email
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-10 px-4 py-2 shadow-sm">
                    Add to Job
                  </button>
                </div>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors text-red-600 hover:bg-red-50 h-10 px-3 py-2">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
