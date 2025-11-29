import { format } from "date-fns";
import { Datepicker, useThemeMode } from "flowbite-react";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Folder,
  Save,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCase } from "../hooks/useCreateCase";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

export function CreateCase() {
  const navigate = useNavigate();
  const [caseName, setCaseName] = useState("");
  const [argument, setArgument] = useState("");
  const [evidence, setEvidence] = useState("");
  const [demandLetter, setDemandLetter] = useState("");
  const [dateType, setDateType] = useState<"single" | "range">("single");
  const [singleDate, setSingleDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const { setMode } = useThemeMode();
  const { createCase, loading, error } = useCreateCase();

  useEffect(() => {
    setMode("dark");
  }, [setMode]);

  const buildCaseBackground = (): string => {
    const sections: string[] = [];

    // Add date section
    if (dateType === "single" && singleDate) {
      sections.push(`Date of Event: ${format(singleDate, "PPP")}`);
    } else if (dateType === "range" && dateRange.from && dateRange.to) {
      sections.push(
        `Date Range: ${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
      );
    }

    // Add evidence section
    if (evidence.trim()) {
      sections.push(`Evidence:\n${evidence}`);
    }

    // Add demand letter section
    if (demandLetter.trim()) {
      sections.push(`Demand Letter:\n${demandLetter}`);
    }

    return sections.join("\n\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const caseBackground = buildCaseBackground();
      const initialArguments = argument.trim() ? [argument.trim()] : [];

      const result = await createCase({
        title: caseName,
        case_background: caseBackground,
        initial_arguments: initialArguments,
      });

      // Navigate to results page with the case ID
      if (result?.trial_id) {
        navigate(`/cases/${result.trial_id}/results`);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Failed to create case:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navigation Bar */}
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-8">
            <h1 className="flex items-center gap-2 text-zinc-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Folder className="h-5 w-5 text-white" />
              </div>
              Pressure Lab
            </h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 -ml-3 text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Button>
          <h2 className="mb-2 text-zinc-100">Create New Case</h2>
          <p className="text-zinc-400">
            Fill in the details to create a new pressure testing case
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="space-y-6">
              {/* Case Name */}
              <div className="space-y-2">
                <Label htmlFor="caseName" className="text-zinc-200">
                  Case Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="caseName"
                  placeholder="Enter case name"
                  value={caseName}
                  onChange={(e) => setCaseName(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-blue-500"
                  required
                />
              </div>

              {/* Date of Event */}
              <div className="space-y-2">
                <Label className="text-zinc-200">
                  Date of Event <span className="text-red-500">*</span>
                </Label>

                {/* Date Type Selector */}
                <div className="flex gap-3 mb-3">
                  <Button
                    type="button"
                    variant={dateType === "single" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateType("single")}
                    className={
                      dateType === "single"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
                    }
                  >
                    Single Date
                  </Button>
                  <Button
                    type="button"
                    variant={dateType === "range" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateType("range")}
                    className={
                      dateType === "range"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
                    }
                  >
                    Date Range
                  </Button>
                </div>

                {/* Single Date Picker */}
                {dateType === "single" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {singleDate ? format(singleDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                      <Datepicker
                        value={singleDate || undefined}
                        onChange={(date) => setSingleDate(date || undefined)}
                      />
                    </PopoverContent>
                  </Popover>
                )}

                {/* Date Range Picker */}
                {dateType === "range" && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-zinc-300 text-sm">From Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange.from
                              ? format(dateRange.from, "LLL dd, y")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                          <Datepicker
                            value={dateRange.from || undefined}
                            onChange={(date) =>
                              setDateRange({
                                ...dateRange,
                                from: date || undefined,
                              })
                            }
                            maxDate={dateRange.to || new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300 text-sm">To Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange.to
                              ? format(dateRange.to, "LLL dd, y")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                          <Datepicker
                            value={dateRange.to || undefined}
                            onChange={(date) =>
                              setDateRange({
                                ...dateRange,
                                to: date || undefined,
                              })
                            }
                            minDate={dateRange.from || undefined}
                            maxDate={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
              </div>

              {/* Argument */}
              <div className="space-y-2">
                <Label htmlFor="argument" className="text-zinc-200">
                  Argument
                </Label>
                <Textarea
                  id="argument"
                  placeholder="Enter your argument details..."
                  value={argument}
                  onChange={(e) => setArgument(e.target.value)}
                  className="min-h-32 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-blue-500"
                />
              </div>

              {/* Evidence */}
              <div className="space-y-2">
                <Label htmlFor="evidence" className="text-zinc-200">
                  Evidence
                </Label>
                <Textarea
                  id="evidence"
                  placeholder="Document evidence and supporting materials..."
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  className="min-h-32 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-blue-500"
                />
              </div>

              {/* Demand Letter */}
              <div className="space-y-2">
                <Label htmlFor="demandLetter" className="text-zinc-200">
                  Demand Letter
                </Label>
                <Textarea
                  id="demandLetter"
                  placeholder="Enter demand letter content..."
                  value={demandLetter}
                  onChange={(e) => setDemandLetter(e.target.value)}
                  className="min-h-32 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-blue-500"
                />
              </div>
            </div>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              disabled={loading}
              className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Creating..." : "Create Case"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
