import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ArrowLeft, Calendar as CalendarIcon, Save, X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Folder } from "lucide-react";

interface CreateCaseProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function CreateCase({ onBack, onSubmit }: CreateCaseProps) {
  const [caseName, setCaseName] = useState("");
  const [argument, setArgument] = useState("");
  const [evidence, setEvidence] = useState("");
  const [demandLetter, setDemandLetter] = useState("");
  const [dateType, setDateType] = useState<"single" | "range">("single");
  const [singleDate, setSingleDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      caseName,
      argument,
      evidence,
      demandLetter,
      dateType,
      singleDate,
      dateRange,
    });
    onSubmit();
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
            onClick={onBack}
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
                      <Calendar
                        mode="single"
                        selected={singleDate}
                        onSelect={setSingleDate}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}

                {/* Date Range Picker */}
                {dateType === "range" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          "Pick a date range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) =>
                          setDateRange({
                            from: range?.from,
                            to: range?.to,
                          })
                        }
                        disabled={(date) => date > new Date()}
                        numberOfMonths={2}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Create Case
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}