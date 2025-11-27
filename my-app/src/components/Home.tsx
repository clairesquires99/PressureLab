import { Folder, Plus, Scale, Search, Settings, Shield, User } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useCaseList } from "../hooks/useCaseList";
import { CaseList } from "./CaseList/CaseList";

export const Home = ({
  setCurrentPage,
}: {
  setCurrentPage: Dispatch<
    SetStateAction<"home" | "create" | "results" | "playground">
  >;
}) => {
  const { cases, loading, error, refetch } = useCaseList();
  const [showCaseTypeModal, setShowCaseTypeModal] = useState(false);

  const handleCreateCaseClick = () => {
    setShowCaseTypeModal(true);
  };

  const handleCaseTypeSelection = (type: "defense" | "prosecution") => {
    if (type === "defense") {
      setShowCaseTypeModal(false);
      setCurrentPage("create");
    }
    // Prosecution is disabled, so do nothing
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Case Type Selection Modal */}
      <Dialog open={showCaseTypeModal} onOpenChange={setShowCaseTypeModal}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-zinc-100 text-xl">
              Choose Case Type
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Select whether you're preparing for defense or prosecution.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              onClick={() => handleCaseTypeSelection("defense")}
              className="h-24 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center gap-2"
            >
              <Shield className="h-8 w-8" />
              <span className="text-lg font-semibold">Defense</span>
            </Button>
            <Button
              onClick={() => handleCaseTypeSelection("prosecution")}
              disabled
              className="h-24 bg-zinc-800 border-zinc-700 text-zinc-500 flex flex-col items-center justify-center gap-2 cursor-not-allowed opacity-60"
            >
              <Scale className="h-8 w-8" />
              <span className="text-lg font-semibold">Prosecution / Plaintiff</span>
              <span className="text-xs text-zinc-600">Coming Soon</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                <a
                  onClick={() => setCurrentPage("playground")}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  Playground
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
            onClick={handleCreateCaseClick}
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <p className="text-zinc-400">Loading cases...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center py-16">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}

        {/* Cases List */}
        {!loading && !error && cases.length > 0 && (
          <CaseList cases={cases} onCaseDeleted={refetch} />
        )}

        {/* Empty State - Hidden when cases exist */}
        {!loading && !error && cases.length === 0 && (
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
              onClick={handleCreateCaseClick}
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Case
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
