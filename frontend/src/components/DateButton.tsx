import { cn } from "@/lib/utils";

interface DateButtonProps {
  date: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const DateButton = ({ date, isSelected, onClick }: DateButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded border text-sm font-medium transition-colors",
        isSelected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background border-border text-foreground hover:border-foreground"
      )}
    >
      {date}
    </button>
  );
};
