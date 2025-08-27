import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";
import { Timer } from "./Timer";
import { ProgressBar } from "./ProgressBar";
import { QuizData } from "@/data/quizData";
import { ArrowRight, Home } from "lucide-react";

interface QuizInterfaceProps {
  quizData: QuizData;
  onComplete: (results: QuizResults) => void;
  onHome: () => void;
}

export interface QuizResults {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  answers: { questionId: number; selectedAnswer: number; correct: boolean }[];
}

export const QuizInterface = ({ quizData, onComplete, onHome }: QuizInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<QuizResults['answers']>([]);
  const [startTime] = useState(Date.now());
  const [isTimerActive, setIsTimerActive] = useState(true);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

  // Save progress to localStorage
  useEffect(() => {
    const progress = {
      currentQuestionIndex,
      answers,
      startTime
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
  }, [currentQuestionIndex, answers, startTime]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
      setAnswers(progress.answers || []);
    }
  }, []);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answerIndex,
      correct: isCorrect
    };

    setAnswers(prev => [...prev.filter(a => a.questionId !== currentQuestion.id), newAnswer]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleComplete();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(undefined);
      setShowFeedback(false);
    }
  };

  const handleComplete = () => {
    setIsTimerActive(false);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const score = Math.round((answers.filter(a => a.correct).length / quizData.questions.length) * 100);
    
    const results: QuizResults = {
      score,
      totalQuestions: quizData.questions.length,
      timeSpent,
      answers
    };

    // Save results to localStorage
    const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    existingResults.push({ ...results, date: new Date().toISOString() });
    localStorage.setItem('quizResults', JSON.stringify(existingResults));
    
    // Save high score
    const currentHighScore = parseInt(localStorage.getItem('highScore') || '0');
    if (score > currentHighScore) {
      localStorage.setItem('highScore', score.toString());
    }

    // Clear progress
    localStorage.removeItem('quizProgress');
    
    onComplete(results);
  };

  const handleTimeUp = () => {
    // Auto-submit current answer if selected, otherwise mark as incorrect
    if (selectedAnswer === undefined) {
      handleAnswer(-1); // Invalid answer
    }
    setTimeout(handleComplete, 2000); // Give time to show feedback
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={onHome}
          className="border-border/20 hover:border-quiz-primary/50"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
        <Timer
          initialTime={quizData.timeLimit}
          onTimeUp={handleTimeUp}
          isActive={isTimerActive}
        />
      </div>

      {/* Progress */}
      <div className="max-w-4xl mx-auto w-full mb-8">
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={quizData.questions.length}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center">
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          showFeedback={showFeedback}
          selectedAnswer={selectedAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizData.questions.length}
        />
      </div>

      {/* Next Button */}
      {showFeedback && (
        <div className="max-w-4xl mx-auto w-full mt-8 text-center">
          <Button
            onClick={handleNext}
            size="lg"
            className="gradient-primary shadow-button hover:shadow-glow transition-all duration-300"
          >
            {isLastQuestion ? "Complete Quiz" : "Next Question"}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};