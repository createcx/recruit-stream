import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, Eye, Pencil, Trash2, Shield, User, Clock, CheckCircle2, AlertCircle, RefreshCw, Settings2, Link2, Unlink } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type IntegrationStatus = "connected" | "available" | "coming-soon";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  color: string;
  initials: string;
  lastSync?: string;
  account?: string;
  syncCount?: number;
}

const integrationsData: Integration[] = [
  { id: "linkedin", name: "LinkedIn Recruiter", description: "Source candidates directly", status: "connected", color: "bg-blue-600", initials: "IN", lastSync: "10 mins ago", account: "recruiting@company.com", syncCount: 1450 },
  { id: "indeed", name: "Indeed", description: "Post jobs and source candidates", status: "available", color: "bg-blue-500", initials: "ID" },
  { id: "greenhouse", name: "Greenhouse ATS", description: "Sync candidate data", status: "connected", color: "bg-emerald-600", initials: "GH", lastSync: "1 hour ago", account: "admin@company.com", syncCount: 3200 },
  { id: "docusign", name: "DocuSign", description: "E-signature for contracts", status: "connected", color: "bg-blue-700", initials: "DS", lastSync: "Just now", account: "legal@company.com", syncCount: 84 },
  { id: "slack", name: "Slack", description: "Team notifications", status: "available", color: "bg-purple-600", initials: "SL" },
  { id: "gmail", name: "Gmail", description: "Email tracking", status: "connected", color: "bg-red-500", initials: "GM", lastSync: "5 mins ago", account: "john.doe@company.com", syncCount: 8900 },
  { id: "zoom", name: "Zoom", description: "Schedule and track interviews", status: "available", color: "bg-blue-400", initials: "ZM" },
  { id: "salesforce", name: "Salesforce", description: "CRM sync", status: "coming-soon", color: "bg-blue-800", initials: "SF" },
  { id: "quickbooks", name: "QuickBooks", description: "Invoice sync", status: "available", color: "bg-green-600", initials: "QB" },
  { id: "stripe", name: "Stripe", description: "Payment processing", status: "connected", color: "bg-indigo-600", initials: "ST", lastSync: "2 hours ago", account: "finance@company.com", syncCount: 432 },
  { id: "teams", name: "Microsoft Teams", description: "Team collaboration", status: "available", color: "bg-indigo-700", initials: "MT" },
  { id: "workday", name: "Workday", description: "HRIS integration", status: "coming-soon", color: "bg-orange-600", initials: "WD" },
];

export function Integrations() {
  const [selected, setSelected] = useState<Integration | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const handleOpenDrawer = (integration: Integration) => {
    setSelected(integration);
    setDrawerOpen(true);
  };

  const getStatusBadge = (status: IntegrationStatus) => {
    switch (status) {
      case "connected":
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Connected</Badge>;
      case "available":
        return <Badge variant="secondary" className="bg-slate-100 text-slate-800 hover:bg-slate-100 border-slate-200">Available</Badge>;
      case "coming-soon":
        return <Badge variant="outline" className="text-slate-500 bg-slate-50">Coming Soon</Badge>;
    }
  };

  const filteredIntegrations = integrationsData.filter(i => {
    if (activeTab === "connected") return i.status === "connected";
    if (activeTab === "available") return i.status === "available" || i.status === "coming-soon";
    return true;
  });

  return (
    <AppLayout activePage="integrations">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
            <p className="text-muted-foreground mt-1">Connect your workspace with external tools and services.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Refresh Status</Button>
          </div>
        </div>

        <div className="flex space-x-2 border-b mb-6 pb-2">
          <Button variant={activeTab === "all" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("all")}>All Integrations</Button>
          <Button variant={activeTab === "connected" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("connected")}>Connected</Button>
          <Button variant={activeTab === "available" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("available")}>Available</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="flex flex-col relative group transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0 ${integration.color}`}>
                  {integration.initials}
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base line-clamp-1">{integration.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mt-2 -mr-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleOpenDrawer(integration)} disabled={integration.status === "coming-soon"}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        {integration.status === "connected" && (
                          <DropdownMenuItem onClick={() => handleOpenDrawer(integration)}>
                            <Settings2 className="mr-2 h-4 w-4" /> Configure
                          </DropdownMenuItem>
                        )}
                        {integration.status === "connected" && (
                          <DropdownMenuItem className="text-red-600">
                            <Unlink className="mr-2 h-4 w-4" /> Disconnect
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{integration.description}</p>
                {integration.status === "connected" && integration.lastSync && (
                  <p className="text-xs text-slate-500 mt-4 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Last sync: {integration.lastSync}
                  </p>
                )}
              </CardContent>
              <CardFooter className="pt-4 border-t">
                {integration.status === "connected" ? (
                  <Button variant="outline" className="w-full" onClick={() => handleOpenDrawer(integration)}>
                    Configure
                  </Button>
                ) : integration.status === "available" ? (
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" onClick={() => handleOpenDrawer(integration)}>
                    <Link2 className="mr-2 h-4 w-4" /> Connect
                  </Button>
                ) : (
                  <Button variant="secondary" className="w-full" disabled>
                    Coming Soon
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <DrawerPanel
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selected ? `${selected.name} Configuration` : "Integration"}
        size="lg"
      >
        {selected && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Section 1: Header */}
              <div className="flex items-center gap-4">
                <div className={`h-16 w-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl shrink-0 ${selected.color}`}>
                  {selected.initials}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-semibold tracking-tight">{selected.name}</h2>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selected.status)}
                    {selected.status === "connected" && (
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Synced {selected.lastSync}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Section 4: Connected Account (showing first for flow) */}
              {selected.status === "connected" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Connected Account</h3>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="h-10 w-10 bg-white border rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{selected.account}</p>
                      <p className="text-xs text-slate-500">Workspace / Organization</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">Switch Account</Button>
                  </div>
                </div>
              )}

              {/* Section 2: Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuration</h3>
                <div className="grid gap-6 p-5 border rounded-lg bg-white shadow-sm">
                  <div className="grid gap-2">
                    <Label htmlFor="apiKey">API Key / Token</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Key className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="apiKey" type="password" value="************************" readOnly className="pl-9 bg-slate-50 font-mono" />
                      </div>
                      <Button variant="outline">Regenerate</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Keep this key secure. It provides full access to the configured integration.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="syncFrequency">Sync Frequency</Label>
                      <Select defaultValue="15m">
                        <SelectTrigger id="syncFrequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time (Webhooks)</SelectItem>
                          <SelectItem value="5m">Every 5 minutes</SelectItem>
                          <SelectItem value="15m">Every 15 minutes</SelectItem>
                          <SelectItem value="1h">Hourly</SelectItem>
                          <SelectItem value="24h">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="syncDirection">Sync Direction</Label>
                      <Select defaultValue="bidirectional">
                        <SelectTrigger id="syncDirection">
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bidirectional">Two-way Sync</SelectItem>
                          <SelectItem value="import">Import Only (Read)</SelectItem>
                          <SelectItem value="export">Export Only (Write)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Sync Status */}
              {selected.status === "connected" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sync Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-green-500" /> Status</span>
                      <span className="text-lg font-medium text-green-600">Healthy</span>
                    </div>
                    <div className="p-4 border rounded-lg flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><RefreshCw className="h-3 w-3 text-blue-500" /> Records Synced</span>
                      <span className="text-lg font-medium">{selected.syncCount?.toLocaleString()}</span>
                    </div>
                    <div className="p-4 border rounded-lg flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><AlertCircle className="h-3 w-3 text-red-500" /> Errors (24h)</span>
                      <span className="text-lg font-medium">0</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 5: Permissions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Permissions</h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b text-sm font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-slate-500" /> Data Access
                  </div>
                  <ul className="divide-y text-sm">
                    <li className="px-4 py-3 flex justify-between items-center">
                      <span>Read basic profile information</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </li>
                    <li className="px-4 py-3 flex justify-between items-center">
                      <span>Read and write candidate records</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </li>
                    <li className="px-4 py-3 flex justify-between items-center">
                      <span>Access email and communication history</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </li>
                    <li className="px-4 py-3 flex justify-between items-center text-muted-foreground">
                      <span>Delete records permanently</span>
                      <span className="text-xs px-2 py-0.5 bg-slate-100 rounded">Denied</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
            
            {/* Footer CTAs */}
            <div className="p-4 border-t bg-slate-50 flex items-center justify-between mt-auto">
              {selected.status === "connected" ? (
                <>
                  <div className="flex gap-2">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">Save Config</Button>
                    <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Sync Now</Button>
                    <Button variant="outline">Test Connection</Button>
                  </div>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">Disconnect</Button>
                </>
              ) : (
                <div className="flex gap-2 w-full">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white flex-1" disabled={selected.status === "coming-soon"}>
                    <Link2 className="mr-2 h-4 w-4" /> Connect Integration
                  </Button>
                  <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
