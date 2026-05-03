import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  MoreHorizontal, 
  Eye, 
  Pencil, 
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  Building,
  Briefcase,
  User,
  Clock,
  Trash2
} from "lucide-react";

// --- Mock Data ---

const chartData = [
  { month: "Jan", actual: 18125, forecast: null },
  { month: "Feb", actual: 21000, forecast: null },
  { month: "Mar", actual: 0, forecast: null },
  { month: "Apr", actual: 27750, forecast: null },
  { month: "May", actual: 20625, forecast: 20625 }, // Tie-in point
  { month: "Jun", actual: null, forecast: 22000 },
  { month: "Jul", actual: null, forecast: 25000 },
  { month: "Aug", actual: null, forecast: 30000 },
  { month: "Sep", actual: null, forecast: 28000 },
  { month: "Oct", actual: null, forecast: 32000 },
  { month: "Nov", actual: null, forecast: 35000 },
  { month: "Dec", actual: null, forecast: 40000 },
];

const pipelineData = [
  {
    id: "sub-1",
    candidate: "Alice Johnson",
    job: "Sr React Engineer",
    company: "Acme",
    stage: "Interviewing",
    probability: 60,
    expectedFee: 21750,
    expectedClose: "Jun 2026",
    notes: "Final round scheduled for next week. Very positive feedback so far."
  },
  {
    id: "sub-2",
    candidate: "Bob Martinez",
    job: "VP Product",
    company: "TechCorp",
    stage: "Submitted",
    probability: 30,
    expectedFee: 8250,
    expectedClose: "Jul 2026",
    notes: "Waiting on hiring manager review."
  },
  {
    id: "sub-3",
    candidate: "Dave Kim",
    job: "Data Scientist",
    company: "Acme",
    stage: "New",
    probability: 15,
    expectedFee: 3094,
    expectedClose: "Aug 2026",
    notes: "Just sourced, reaching out today."
  }
];

const costData = [
  { month: "Jun 2026", internalTeam: 15000, jobBoards: 2500, tools: 1200, total: 18700 },
  { month: "Jul 2026", internalTeam: 15000, jobBoards: 2500, tools: 1200, total: 18700 },
  { month: "Aug 2026", internalTeam: 15000, jobBoards: 2500, tools: 1500, total: 19000 },
];

export function Forecasting() {
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view");
  const [adjustedProb, setAdjustedProb] = useState(0);

  const openDrawer = (sub: any, mode: "view" | "edit" = "view") => {
    setSelectedSubmission(sub);
    setAdjustedProb(sub.probability);
    setDrawerMode(mode);
    setDrawerOpen(true);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <AppLayout activePage="forecasting">
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Forecasting</h1>
          <p className="text-slate-500 mt-2">Revenue projections and pipeline probability.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Projected Q2 Revenue</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">$125,000</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12% vs Q1</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Pipeline Value (Weighted)</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">$87,500</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-500">
                Based on active submissions
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">YTD Revenue</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">$87,500</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-500">
                Jan 1 - May 31
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 1: Chart */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-lg">Revenue Forecast</CardTitle>
            <CardDescription>Actual vs Forecast (2026)</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b' }} 
                    tickFormatter={(val) => `$${val / 1000}k`}
                    dx={-10}
                  />
                  <RechartsTooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual"
                    stroke="#f97316" 
                    fill="#ffedd5" 
                    strokeWidth={3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="forecast" 
                    name="Forecast"
                    stroke="#3b82f6" 
                    strokeDasharray="5 5"
                    fill="#eff6ff" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Pipeline Forecast */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle className="text-lg">Pipeline Forecast</CardTitle>
              <CardDescription>Active submissions contributing to forecast</CardDescription>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="w-[200px]">CANDIDATE</TableHead>
                  <TableHead>JOB</TableHead>
                  <TableHead>COMPANY</TableHead>
                  <TableHead>STAGE</TableHead>
                  <TableHead>PROBABILITY%</TableHead>
                  <TableHead className="text-right">EXPECTED FEE</TableHead>
                  <TableHead>EXPECTED CLOSE</TableHead>
                  <TableHead className="w-[120px] text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pipelineData.map((row) => (
                  <TableRow key={row.id} className="cursor-pointer hover:bg-slate-50/80 transition-colors" onClick={() => openDrawer(row)}>
                    <TableCell className="font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        {row.candidate}
                      </div>
                    </TableCell>
                    <TableCell>{row.job}</TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50">
                        {row.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${row.probability > 50 ? 'bg-green-500' : row.probability > 25 ? 'bg-orange-400' : 'bg-slate-300'}`}
                            style={{ width: `${row.probability}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{row.probability}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(row.expectedFee)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">{row.expectedClose}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => openDrawer(row, "view")}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => openDrawer(row, "edit")}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openDrawer(row, "view")}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDrawer(row, "edit")}>Edit Forecast</DropdownMenuItem>
                            <DropdownMenuItem>Clone</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Section 3: Cost Forecast */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4">
            <CardTitle className="text-lg">Resource Cost Forecast</CardTitle>
            <CardDescription>Projected operating costs (Next 3 months)</CardDescription>
          </CardHeader>
          <div className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead>MONTH</TableHead>
                  <TableHead className="text-right">INTERNAL TEAM</TableHead>
                  <TableHead className="text-right">JOB BOARDS</TableHead>
                  <TableHead className="text-right">TOOLS/SOFTWARE</TableHead>
                  <TableHead className="text-right font-bold text-slate-900">TOTAL COST</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell className="text-right">{formatCurrency(row.internalTeam)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(row.jobBoards)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(row.tools)}</TableCell>
                    <TableCell className="text-right font-bold text-slate-900">{formatCurrency(row.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Detail Drawer */}
      <DrawerPanel 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        title={selectedSubmission ? `${selectedSubmission.candidate} - Forecast` : 'Forecast Detail'}
      >
        {selectedSubmission && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Header Info */}
              <div className="flex items-start justify-between pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedSubmission.candidate}</h2>
                  <p className="text-slate-500 flex items-center gap-2 mt-1">
                    <Briefcase className="w-4 h-4" /> {selectedSubmission.job}
                    <span className="text-slate-300">•</span>
                    <Building className="w-4 h-4" /> {selectedSubmission.company}
                  </p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 text-sm">
                  {selectedSubmission.stage}
                </Badge>
              </div>

              {/* Forecast Adjustment Section */}
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  Forecast Adjustment
                </h3>
                
                <div className="grid grid-cols-2 gap-8 mb-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Total Expected Fee</p>
                    <p className="text-2xl font-bold text-slate-900">{formatCurrency(selectedSubmission.expectedFee)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Weighted Value</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(selectedSubmission.expectedFee * (adjustedProb / 100))}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">Close Probability (%)</label>
                    <span className="font-bold text-lg">{adjustedProb}%</span>
                  </div>
                  <Slider
                    defaultValue={[adjustedProb]}
                    max={100}
                    step={5}
                    onValueChange={(vals) => setAdjustedProb(vals[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div>
                 <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Submission Details</h3>
                 <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                   <div>
                     <p className="text-sm text-slate-500 mb-1">Expected Close Date</p>
                     <p className="font-medium text-slate-900 flex items-center gap-2">
                       <Calendar className="w-4 h-4 text-slate-400" />
                       {selectedSubmission.expectedClose}
                     </p>
                   </div>
                   <div>
                     <p className="text-sm text-slate-500 mb-1">Current Stage</p>
                     <p className="font-medium text-slate-900">{selectedSubmission.stage}</p>
                   </div>
                   <div className="col-span-2">
                     <p className="text-sm text-slate-500 mb-1">Latest Notes</p>
                     <div className="p-3 bg-white border border-slate-200 rounded-md text-sm text-slate-700">
                       {selectedSubmission.notes}
                     </div>
                   </div>
                 </div>
              </div>

              {/* Activity Timeline */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Recent Activity</h3>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-blue-500 text-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-md border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-slate-900">Moved to {selectedSubmission.stage}</span>
                        <span className="text-xs text-slate-500">2 days ago</span>
                      </div>
                      <p className="text-xs text-slate-600">Updated by Sarah Jenkins</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 text-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-md border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-slate-900">Note added</span>
                        <span className="text-xs text-slate-500">5 days ago</span>
                      </div>
                      <p className="text-xs text-slate-600">"Candidate requesting higher base, might impact fee."</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex gap-2">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Update Probability
                </Button>
                <Button variant="outline">
                  View Submission
                </Button>
                <Button variant="outline">
                  Add Note
                </Button>
              </div>
              <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Remove from Forecast
              </Button>
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
