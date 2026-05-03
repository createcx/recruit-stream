import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  PieChart, 
  MoreHorizontal, 
  Eye, 
  Pencil, 
  Download, 
  Bell, 
  FileText, 
  Trash2,
  Plus,
  Filter,
  Search
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const invoices = [
  {
    id: "INV-2025-001",
    client: "Acme Technologies",
    relatedTo: "Carol Thompson Placement",
    amount: "$21,000",
    status: "paid",
    issueDate: "2025-02-15",
    dueDate: "2025-03-15",
  },
  {
    id: "INV-2025-002",
    client: "TechCorp Solutions",
    relatedTo: "Alice Johnson Placement",
    amount: "$18,125",
    status: "paid",
    issueDate: "2025-05-15",
    dueDate: "2025-06-15",
  },
  {
    id: "INV-2024-003",
    client: "Global Staffing Inc",
    relatedTo: "Bob Martinez Placement",
    amount: "$27,750",
    status: "paid",
    issueDate: "2024-12-01",
    dueDate: "2024-12-31",
  },
  {
    id: "INV-2024-004",
    client: "Acme Technologies",
    relatedTo: "Dave Kim Placement",
    amount: "$20,625",
    status: "pending",
    issueDate: "2024-08-15",
    dueDate: "2024-09-15",
  },
  {
    id: "INV-2025-005",
    client: "Apex Technologies",
    relatedTo: "Apex Engineering Project",
    amount: "$46,250",
    status: "overdue",
    issueDate: "2025-09-01",
    dueDate: "2025-10-01",
  }
];

export function Financials() {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = (invoice: any) => {
    setSelectedInvoice(invoice);
    setDrawerOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 uppercase text-[10px] tracking-wider border-0">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100/80 uppercase text-[10px] tracking-wider border-0">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100/80 uppercase text-[10px] tracking-wider border-0">Overdue</Badge>;
      default:
        return <Badge variant="outline" className="uppercase text-[10px] tracking-wider">{status}</Badge>;
    }
  };

  return (
    <AppLayout activePage="financials">
      <div className="flex flex-col h-full bg-slate-50/50">
        <div className="p-6 pb-2 max-w-7xl mx-auto w-full space-y-6 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Financials</h1>
              <p className="text-sm text-slate-500 mt-1">Manage revenue, invoices, and financial reporting.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Download className="h-4 w-4 mr-2 text-slate-500" />
                Export
              </Button>
              <Button size="sm" className="h-9 bg-orange-600 hover:bg-orange-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$87,500</div>
                <p className="text-xs text-emerald-600 mt-1 flex items-center font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Outstanding Invoices</CardTitle>
                <FileText className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$21,000</div>
                <p className="text-xs text-slate-500 mt-1">Across 3 pending invoices</p>
              </CardContent>
            </Card>
            
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Collected This Month</CardTitle>
                <CreditCard className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$18,125</div>
                <p className="text-xs text-slate-500 mt-1">From 2 paid invoices</p>
              </CardContent>
            </Card>
            
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Projected Q2 Revenue</CardTitle>
                <PieChart className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$45,000</div>
                <p className="text-xs text-slate-500 mt-1">Based on current active pipeline</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <Card className="border-slate-200 shadow-sm">
            <Tabs defaultValue="invoices" className="w-full">
              <div className="px-6 border-b border-slate-100 flex items-center justify-between bg-white rounded-t-xl">
                <TabsList className="h-14 bg-transparent p-0 gap-6">
                  <TabsTrigger 
                    value="invoices" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-600 rounded-none px-0 h-14 font-medium text-slate-500 data-[state=active]:text-orange-600"
                  >
                    Invoices
                  </TabsTrigger>
                  <TabsTrigger 
                    value="revenue" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-600 rounded-none px-0 h-14 font-medium text-slate-500 data-[state=active]:text-orange-600"
                  >
                    Revenue Report
                  </TabsTrigger>
                  <TabsTrigger 
                    value="fees" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-600 rounded-none px-0 h-14 font-medium text-slate-500 data-[state=active]:text-orange-600"
                  >
                    Fee Summary
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-3 py-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Search invoices..." 
                      className="h-9 w-[250px] pl-9 bg-slate-50/50 border-slate-200 text-sm focus-visible:ring-orange-500" 
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-9 border-slate-200 text-slate-600">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <TabsContent value="invoices" className="m-0 p-0 border-none outline-none">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="font-medium text-slate-500 h-11">INVOICE #</TableHead>
                      <TableHead className="font-medium text-slate-500 h-11">CLIENT</TableHead>
                      <TableHead className="font-medium text-slate-500 h-11">RELATED TO</TableHead>
                      <TableHead className="font-medium text-slate-500 h-11 text-right">AMOUNT</TableHead>
                      <TableHead className="font-medium text-slate-500 h-11">STATUS</TableHead>
                      <TableHead className="font-medium text-slate-500 h-11">ISSUE DATE</TableHead>
                      <TableHead className="font-medium text-slate-500 h-11">DUE DATE</TableHead>
                      <TableHead className="font-medium text-slate-500 h-11 text-right">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow 
                        key={invoice.id} 
                        className="cursor-pointer hover:bg-slate-50/80 transition-colors border-slate-100 group"
                        onClick={() => openDrawer(invoice)}
                      >
                        <TableCell className="font-medium text-slate-900 py-3">{invoice.id}</TableCell>
                        <TableCell className="text-slate-600 py-3">{invoice.client}</TableCell>
                        <TableCell className="text-slate-600 py-3 truncate max-w-[200px]">{invoice.relatedTo}</TableCell>
                        <TableCell className={`text-right font-medium py-3 ${invoice.status === 'overdue' ? 'text-rose-600' : 'text-slate-900'}`}>
                          {invoice.amount}
                        </TableCell>
                        <TableCell className="py-3">
                          {getStatusBadge(invoice.status)}
                        </TableCell>
                        <TableCell className="text-slate-500 text-sm py-3">{invoice.issueDate}</TableCell>
                        <TableCell className={`text-sm py-3 ${invoice.status === 'overdue' ? 'text-rose-600 font-medium' : 'text-slate-500'}`}>
                          {invoice.dueDate}
                        </TableCell>
                        <TableCell className="text-right py-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                              onClick={() => openDrawer(invoice)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                              onClick={() => openDrawer(invoice)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={() => openDrawer(invoice)}>
                                  <Eye className="h-4 w-4 mr-2 text-slate-400" /> View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openDrawer(invoice)}>
                                  <Pencil className="h-4 w-4 mr-2 text-slate-400" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2 text-slate-400" /> Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Bell className="h-4 w-4 mr-2 text-slate-400" /> Send Reminder
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-rose-600 focus:bg-rose-50 focus:text-rose-700">
                                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {invoices.length === 0 && (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <FileText className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-900">No invoices found</h3>
                    <p className="text-sm text-slate-500 mt-1">Get started by creating your first invoice.</p>
                    <Button variant="outline" size="sm" className="mt-4 text-orange-600 border-orange-200 hover:bg-orange-50 hover:text-orange-700">
                      Create Invoice
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="revenue" className="m-0 p-12 text-center text-slate-500">
                Revenue report chart visualization would go here.
              </TabsContent>
              
              <TabsContent value="fees" className="m-0 p-12 text-center text-slate-500">
                Fee structure summary would go here.
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Invoice Detail Drawer */}
      <DrawerPanel
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Invoice Details"
        size="lg" // 60% wide drawer usually needs a larger size prop if supported, otherwise default
      >
        {selectedInvoice && (
          <div className="flex flex-col h-[calc(100vh-64px)]">
            <ScrollArea className="flex-1">
              <div className="p-6 md:p-8 space-y-8">
                
                {/* Section 1: Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-slate-900">{selectedInvoice.id}</h2>
                      {getStatusBadge(selectedInvoice.status)}
                    </div>
                    <p className="text-slate-500">Invoice for {selectedInvoice.client}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500 font-medium mb-1">Amount Due</div>
                    <div className={`text-3xl font-bold tracking-tight ${selectedInvoice.status === 'overdue' ? 'text-rose-600' : 'text-orange-600'}`}>
                      {selectedInvoice.amount}
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-100" />

                {/* Section 2: Details Grid */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Invoice Details</h3>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                      <div className="text-xs text-slate-500 mb-1 font-medium">CLIENT</div>
                      <div className="text-sm font-medium text-slate-900">{selectedInvoice.client}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1 font-medium">RELATED TO</div>
                      <div className="text-sm text-blue-600 hover:underline cursor-pointer">{selectedInvoice.relatedTo}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1 font-medium">ISSUE DATE</div>
                      <div className="text-sm text-slate-900">{selectedInvoice.issueDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1 font-medium">DUE DATE</div>
                      <div className={`text-sm ${selectedInvoice.status === 'overdue' ? 'text-rose-600 font-medium' : 'text-slate-900'}`}>
                        {selectedInvoice.dueDate}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1 font-medium">PAYMENT TERMS</div>
                      <div className="text-sm text-slate-900">Net 30</div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-100" />

                {/* Section 3: Line Items */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Line Items</h3>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-50/80">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="font-medium text-slate-500">Description</TableHead>
                          <TableHead className="font-medium text-slate-500 text-right w-24">Qty</TableHead>
                          <TableHead className="font-medium text-slate-500 text-right w-32">Rate</TableHead>
                          <TableHead className="font-medium text-slate-500 text-right w-32">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-slate-100">
                          <TableCell className="font-medium text-slate-900">Placement Fee: {selectedInvoice.relatedTo.replace(' Placement', '')}</TableCell>
                          <TableCell className="text-right text-slate-600">1</TableCell>
                          <TableCell className="text-right text-slate-600">{selectedInvoice.amount}</TableCell>
                          <TableCell className="text-right font-medium text-slate-900">{selectedInvoice.amount}</TableCell>
                        </TableRow>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-t-2 border-slate-200">
                          <TableCell colSpan={3} className="text-right font-medium text-slate-600">Total</TableCell>
                          <TableCell className="text-right font-bold text-slate-900 text-base">{selectedInvoice.amount}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Section 4: Payment History */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Payment History</h3>
                  {selectedInvoice.status === 'paid' ? (
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                      </div>
                      <div className="flex-1 bg-slate-50 p-3 rounded-md border border-slate-100">
                        <p className="text-sm text-slate-900">
                          <span className="font-medium">Paid in full {selectedInvoice.amount}</span> on 2025-03-10 via Wire Transfer
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-500 italic bg-slate-50 p-4 rounded-md border border-slate-100 text-center">
                      No payments recorded yet.
                    </div>
                  )}
                </div>

                {/* Section 5: Notes */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Notes</h3>
                  <div className="bg-amber-50/50 border border-amber-100 text-amber-800 text-sm p-4 rounded-md">
                    Paid promptly. Good client.
                  </div>
                </div>
                
                {/* Spacer for bottom */}
                <div className="h-8"></div>
              </div>
            </ScrollArea>

            {/* Footer CTAs */}
            <div className="border-t border-slate-200 p-4 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Invoice
                </Button>
                <Button variant="outline" className="border-slate-200 text-slate-600">
                  <Bell className="h-4 w-4 mr-2" />
                  Send Reminder
                </Button>
                <Button variant="outline" className="border-slate-200 text-slate-600 hidden sm:flex">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
                <Button variant="outline" className="border-slate-200 text-slate-600 hidden md:flex">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
