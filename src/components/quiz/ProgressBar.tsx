interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Progress
        </span>
        <span className="text-sm font-medium text-foreground">
          {current} of {total}
        </span>
      </div>
      <div className="w-full bg-secondary/20 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full gradient-primary transition-all duration-500 ease-out rounded-full shadow-glow"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};