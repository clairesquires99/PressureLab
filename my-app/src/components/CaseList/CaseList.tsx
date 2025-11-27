import { Card } from "flowbite-react";
import { CaseListItem } from "./CaseListItem";

export interface Case {
  id: number;
  title: string;
  case_background: string;
}

// const mockCases: Case[] = [
//   { id: "1", name: "Industrial Valve Assessment", date: "2025-11-18" },
//   { id: "2", name: "Pipeline Integrity Test", date: "2025-11-15" },
//   { id: "3", name: "Hydraulic System Analysis", date: "2025-11-12" },
//   { id: "4", name: "Pressure Vessel Inspection", date: "2025-11-08" },
//   { id: "5", name: "Boiler Safety Evaluation", date: "2025-11-05" },
//   { id: "6", name: "Gas Line Monitoring", date: "2025-10-28" },
//   { id: "7", name: "Compressor Performance Study", date: "2025-10-22" },
//   { id: "8", name: "Steam System Audit", date: "2025-10-18" },
// ];

export const CaseList = ({ cases }: { cases: Case[] }) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <div className="divide-y divide-zinc-800">
        {cases.map((caseItem) => (
          <CaseListItem key={caseItem.id} caseData={caseItem} />
        ))}
      </div>
    </Card>
  );
};
