import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Dashboard from "@/pages/Dashboard";
import Candidates from "@/pages/Candidates";
import Jobs from "@/pages/Jobs";
import Companies from "@/pages/Companies";
import Contacts from "@/pages/Contacts";
import Pipeline from "@/pages/Pipeline";
import Placements from "@/pages/Placements";
import Activities from "@/pages/Activities";
import Projects from "@/pages/Projects";
import Clients from "@/pages/Clients";
import Sows from "@/pages/Sows";
import ChangeOrders from "@/pages/ChangeOrders";
import Documents from "@/pages/Documents";
import Financials from "@/pages/Financials";
import Resources from "@/pages/Resources";
import Planning from "@/pages/Planning";
import Phases from "@/pages/Phases";
import Forecasting from "@/pages/Forecasting";
import Onboarding from "@/pages/Onboarding";
import Integrations from "@/pages/Integrations";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/candidates" component={Candidates} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/companies" component={Companies} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/pipeline" component={Pipeline} />
      <Route path="/placements" component={Placements} />
      <Route path="/activities" component={Activities} />
      <Route path="/projects" component={Projects} />
      <Route path="/clients" component={Clients} />
      <Route path="/sows" component={Sows} />
      <Route path="/change-orders" component={ChangeOrders} />
      <Route path="/documents" component={Documents} />
      <Route path="/financials" component={Financials} />
      <Route path="/resources" component={Resources} />
      <Route path="/planning" component={Planning} />
      <Route path="/phases" component={Phases} />
      <Route path="/forecasting" component={Forecasting} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/integrations" component={Integrations} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
