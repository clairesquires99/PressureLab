import { Folder, Plus, Search, Settings, User } from "lucide-react";
import { useState } from "react";
import { CaseListItem } from "./components/CaseListItem";
import { CreateCase } from "./components/CreateCase";
import { ResultsPage } from "./components/ResultsPage";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";

interface Case {
  id: string;
  name: string;
  date: string;
}

const mockCases: Case[] = [
  { id: "1", name: "Industrial Valve Assessment", date: "2025-11-18" },
  { id: "2", name: "Pipeline Integrity Test", date: "2025-11-15" },
  { id: "3", name: "Hydraulic System Analysis", date: "2025-11-12" },
  { id: "4", name: "Pressure Vessel Inspection", date: "2025-11-08" },
  { id: "5", name: "Boiler Safety Evaluation", date: "2025-11-05" },
  { id: "6", name: "Gas Line Monitoring", date: "2025-10-28" },
  { id: "7", name: "Compressor Performance Study", date: "2025-10-22" },
  { id: "8", name: "Steam System Audit", date: "2025-10-18" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "create" | "results">(
    "home"
  );

  if (currentPage === "create") {
    return (
      <CreateCase
        onBack={() => setCurrentPage("home")}
        onSubmit={() => setCurrentPage("results")}
      />
    );
  }

  if (currentPage === "results") {
    return <ResultsPage onBack={() => setCurrentPage("home")} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navigation Bar */}
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="flex items-center gap-2 text-zinc-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <Folder className="h-5 w-5 text-white" />
                </div>
                Pressure Lab
              </h1>
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="#"
                  className="text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  Cases
                </a>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  Analytics
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-zinc-100"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-zinc-100"
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-zinc-100"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-zinc-100">Recent Cases</h2>
            <p className="text-zinc-400">
              Manage and review your pressure testing cases
            </p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setCurrentPage("create")}
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Case
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search cases..."
              className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        {/* Cases List */}
        <Card className="bg-zinc-900 border-zinc-800">
          <div className="divide-y divide-zinc-800">
            {mockCases.map((caseItem) => (
              <CaseListItem key={caseItem.id} caseData={caseItem} />
            ))}
          </div>
        </Card>

        {/* Empty State - Hidden when cases exist */}
        {mockCases.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
              <Folder className="h-8 w-8 text-zinc-600" />
            </div>
            <h3 className="mb-2 text-zinc-100">No cases yet</h3>
            <p className="mb-6 text-zinc-400">
              Get started by creating your first pressure test case
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setCurrentPage("create")}
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Case
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
