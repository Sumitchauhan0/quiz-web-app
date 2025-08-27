import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@/data/quizData";
import { CheckCircle, XCircle } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  showFeedback: boolean;
  selectedAnswer?: number;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({
  question,
  onAnswer,
  showFeedback,
  selectedAnswer,
  questionNumber,
  totalQuestions
}: QuestionCardProps) => {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const getOptionStyle = (index: number) => {
    if (!showFeedback && selectedAnswer === undefined) {
      return hoveredOption === index
        ? "border-quiz-primary bg-quiz-primary/10 shadow-button transition-bounce"
        : "border-border hover:border-quiz-primary/50 transition-smooth";
    }

    if (showFeedback) {
      if (index === question.correctAnswer) {
        return "border-quiz-success bg-quiz-success/10 text-quiz-success";
      }
      if (selectedAnswer === index && index !== question.correctAnswer) {
        return "border-quiz-error bg-quiz-error/10 text-quiz-error";
      }
      return "border-border opacity-60";
    }

    if (selectedAnswer === index) {
      return "border-quiz-primary bg-quiz-primary/20 shadow-button";
    }

    return "border-border";
  };

  const getOptionIcon = (index: number) => {
    if (!showFeedback) return null;
    
    if (index === question.correctAnswer) {
      return <CheckCircle className="h-5 w-5 text-quiz-success" />;
    }
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return <XCircle className="h-5 w-5 text-quiz-error" />;
    }
    return null;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto gradient-card border-border/20 shadow-card backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`p-6 h-auto text-left justify-start relative overflow-hidden ${getOptionStyle(index)}`}
              onClick={() => !showFeedback && onAnswer(index)}
              onMouseEnter={() => setHoveredOption(index)}
              onMouseLeave={() => setHoveredOption(null)}
              disabled={showFeedback}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-base">{option}</span>
                </div>
                {getOptionIcon(index)}
              </div>
            </Button>
          ))}
        </div>

        {showFeedback && question.explanation && (
          <div className="mt-6 p-4 rounded-lg bg-secondary/20 border border-border/20">
            <h4 className="font-semibold text-quiz-primary mb-2">Explanation:</h4>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};