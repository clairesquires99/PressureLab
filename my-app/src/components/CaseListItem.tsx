import { Folder, Clock, MoreVertical, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface CaseListItemProps {
  caseData: {
    id: string;
    name: string;
    date: string;
  };
}

export function CaseListItem({ caseData }: CaseListItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-zinc-800/50 cursor-pointer">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
        <Folder className="h-5 w-5 text-blue-400" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-zinc-100 truncate">
          {caseData.name}
        </h3>
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatDate(caseData.date)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-100"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
        <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
    </div>
  );
}
