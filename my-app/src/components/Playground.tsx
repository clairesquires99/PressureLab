import { Datepicker, useThemeMode } from "flowbite-react";
import { useState, useEffect } from "react";
export function Playground() {
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());
  const { setMode } = useThemeMode();

  useEffect(() => {
    setMode("dark");
  }, [setMode]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex-col items-center justify-center">
      <h2 className="text-3xl">Welcome to the Playground!</h2>
      <text>{fromDate?.toISOString()}</text>
      <text>{toDate?.toISOString()}</text>
      <Datepicker value={fromDate} onChange={(date) => setFromDate(date)} />
      <text>to</text>
      <Datepicker value={toDate} onChange={(date) => setToDate(date)} />
    </div>
  );
}
