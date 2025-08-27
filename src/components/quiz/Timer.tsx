import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  initialTime: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer = ({ initialTime, onTimeUp, isActive }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / initialTime) * 100;

  const getTimerColor = () => {
    if (percentage > 50) return "text-quiz-success";
    if (percentage > 20) return "text-quiz-warning";
    return "text-quiz-error";
  };

  const getTimerBg = () => {
    if (percentage > 50) return "bg-quiz-success/20";
    if (percentage > 20) return "bg-quiz-warning/20";
    return "bg-quiz-error/20";
  };

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getTimerBg()} transition-all duration-300`}>
      <Clock className={`h-5 w-5 ${getTimerColor()}`} />
      <span className={`font-mono text-lg font-bold ${getTimerColor()}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};