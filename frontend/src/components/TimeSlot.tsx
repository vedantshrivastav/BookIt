import { cn } from "@/lib/utils";

interface TimeSlotProps {
  time: string;
  slotsLeft?: number;
  isSelected?: boolean;
  isSoldOut?: boolean;
  onClick?: () => void;
}

export const TimeSlot = ({
  time,
  slotsLeft,
  isSelected,
  isSoldOut,
  onClick,
}: TimeSlotProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isSoldOut}
      className={cn(
        "px-4 py-3 rounded border text-sm font-medium transition-colors inline-flex items-center gap-2",
        isSoldOut
          ? "bg-muted border-border text-muted-foreground cursor-not-allowed"
          : isSelected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background border-border text-foreground hover:border-foreground"
      )}
    >
      <span>{time}</span>
      {isSoldOut ? (
        <span className="text-xs">Sold out</span>
      ) : slotsLeft !== undefined ? (
        <span className="text-xs text-red-500">{slotsLeft} left</span>
      ) : null}
    </button>
  );
};
