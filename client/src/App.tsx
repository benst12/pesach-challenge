import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StudentProvider } from "./contexts/StudentContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SelectTrack from "./pages/SelectTrack";
import Materials from "./pages/Materials";
import Quiz from "./pages/Quiz";
import Admin from "./pages/Admin";
import Progress from "./pages/Progress";
import DailyChallenge from "./pages/DailyChallenge";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/register"} component={Register} />
      <Route path={"/select-track"} component={SelectTrack} />
      <Route path={"/materials"} component={Materials} />
      <Route path={"/quiz"} component={Quiz} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/progress"} component={Progress} />
      <Route path={"/daily"} component={DailyChallenge} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <StudentProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </StudentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
