import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListForecasts, useGetForecast } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, TrendingUp, Users, CalendarDays, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";

const formatCurrency = (val?: number) =>
  val != null ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val) : "—";

export default function Forecasting() {
  const [search, setSearch] = useState("");
  const { data: forecasts, isLoading } = useListForecasts({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: forecast, isLoading: isForecastLoading } = useGetForecast(selectedId || 0, {
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
    if (s === "approved" || s === "final") return "bg-green-50 text-green-700 border-green-200";
    if (s === "draft") return "bg-slate-100 text-slate-600 border-slate-200";
    if (s === "review") return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  const getScenarioColor = (scenario: string) => {
    const s = (scenario || "").toLowerCase();
    if (s === "optimistic" || s === "best") return "bg-green-50 text-green-700 border-green-200";
    if (s === "pessimistic" || s === "worst") return "bg-red-50 text-red-600 border-red-200";
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  return (
    <AppLayout activePage="forecasting">
      <div className="flex flex-col h-full bg-slate-50">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Forecasting</h1>
            <p className="text-sm text-slate-500 mt-1">Revenue projections and headcount planning</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Create Forecast
          </Button>
        </header>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search forecasts..."
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">{forecasts?.length || 0} forecasts</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Period</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">Revenue Expected</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">Headcount</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Scenario</TableHead>
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
                ) : forecasts?.map(f => (
                  <TableRow
                    key={f.id}
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => openDrawer(f.id)}
                  >
                    <TableCell>
                      <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-slate-400" />
                        {f.period}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-orange-600">{formatCurrency(f.revenue)}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                        <Users className="w-3.5 h-3.5 text-slate-400" />{f.headcount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getScenarioColor(f.scenario)}`}>{f.scenario}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getStatusColor(f.status)}`}>{f.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={e => openDrawer(f.id, e)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={e => openDrawer(f.id, e)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={e => openDrawer(f.id, e as any)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Forecast</DropdownMenuItem>
                            <DropdownMenuItem>Clone Forecast</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Final</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(f.id)}>Delete</DropdownMenuItem>
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
        title={forecast ? `Forecast: ${forecast.period}` : "Forecast Details"}
        actions={
          forecast ? (
            <div className="flex w-full items-center gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">Edit Forecast</Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Clone Forecast</Button>
              <Button variant="outline" className="border-slate-200 text-slate-500 bg-transparent hover:bg-slate-100">Mark as Final</Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => forecast && handleDelete(forecast.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ) : undefined
        }
      >
        {isForecastLoading ? (
          <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40 w-full" /></div>
        ) : forecast && (
          <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays className="w-5 h-5 text-slate-400" />
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{forecast.period}</h2>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className={`font-medium ${getScenarioColor(forecast.scenario)}`}>{forecast.scenario}</Badge>
                    <Badge variant="outline" className={`font-medium ${getStatusColor(forecast.status)}`}>{forecast.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Expected Revenue</div>
                  <div className="text-3xl font-bold text-orange-600">{formatCurrency(forecast.revenue)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{formatCurrency(forecast.revenue)}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Headcount</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{forecast.headcount}</div>
                </div>
              </div>

              {forecast.assumptions && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Assumptions</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100">{forecast.assumptions}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
