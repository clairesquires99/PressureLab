import { ChevronRight, Folder, MoreVertical, Trash2 } from "lucide-react";
import { useDeleteCase } from "../../hooks/useDeleteCase";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface CaseListItemProps {
  caseData: {
    id: number;
    title: string;
    case_background: string;
  };
  onDelete?: () => void;
}

export function CaseListItem({ caseData, onDelete }: CaseListItemProps) {
  const { deleteCaseById, loading } = useDeleteCase();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await deleteCaseById(caseData.id);
    if (success && onDelete) {
      onDelete();
    }
  };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const now = new Date();
  //   const diffTime = Math.abs(now.getTime() - date.getTime());
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays === 0) return "Today";
  //   if (diffDays === 1) return "Yesterday";
  //   if (diffDays < 7) return `${diffDays} days ago`;

  //   return date.toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric",
  //   });
  // };

  return (
    <div className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-zinc-800/50 cursor-pointer">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
        <Folder className="h-5 w-5 text-blue-400" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-zinc-100 truncate">{caseData.title}</h3>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-100"
              disabled={loading}
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-zinc-900 border-zinc-800"
          >
            <DropdownMenuItem
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
    </div>
  );
}
