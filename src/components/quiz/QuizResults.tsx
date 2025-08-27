import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizResults as QuizResultsType } from "./QuizInterface";
import { Trophy, Clock, Target, RotateCcw, Home, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizResultsProps {
  results: QuizResultsType;
  onRestart: () => void;
  onHome: () => void;
  quizTitle: string;
}

export const QuizResults = ({ results, onRestart, onHome, quizTitle }: QuizResultsProps) => {
  const { toast } = useToast();
  const { score, totalQuestions, timeSpent, answers } = results;
  
  const correctAnswers = answers.filter(a => a.correct).length;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  const getScoreMessage = () => {
    if (score >= 90) return { message: "Outstanding!", color: "text-quiz-success", emoji: "🎉" };
    if (score >= 70) return { message: "Well Done!", color: "text-quiz-primary", emoji: "👏" };
    if (score >= 50) return { message: "Good Effort!", color: "text-quiz-warning", emoji: "👍" };
    return { message: "Keep Practicing!", color: "text-quiz-error", emoji: "💪" };
  };

  const scoreMessage = getScoreMessage();

  const handleShare = async () => {
    const shareText = `I just scored ${score}% on the ${quizTitle}! 🎯 ${correctAnswers}/${totalQuestions} correct answers in ${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz Results',
          text: shareText,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Results copied!",
          description: "Share your score with friends",
        });
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Results copied!",
        description: "Share your score with friends",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-primary shadow-glow mb-6">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
          <p className={`text-2xl font-semibold ${scoreMessage.color}`}>
            {scoreMessage.emoji} {scoreMessage.message}
          </p>
        </div>

        <Card className="gradient-card border-border/20 shadow-card backdrop-blur-sm mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-6xl font-bold gradient-primary bg-clip-text text-transparent text-white">
              {score}%
            </CardTitle>
            <CardDescription className="text-lg">
              Your final score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg bg-secondary/20">
                <div className="flex justify-center mb-2">
                  <Target className="h-8 w-8 text-quiz-success" />
                </div>
                <p className="text-2xl font-bold text-quiz-success">{correctAnswers}</p>
                <p className="text-sm text-muted-foreground">Correct Answers</p>
                <p className="text-xs text-muted-foreground">out of {totalQuestions}</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-secondary/20">
                <div className="flex justify-center mb-2">
                  <Clock className="h-8 w-8 text-quiz-warning" />
                </div>
                <p className="text-2xl font-bold text-quiz-warning">
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </p>
                <p className="text-sm text-muted-foreground">Time Taken</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-secondary/20">
                <div className="flex justify-center mb-2">
                  <Trophy className="h-8 w-8 text-quiz-primary" />
                </div>
                <p className="text-2xl font-bold text-quiz-primary text-white">{accuracy}%</p>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onRestart}
                className="flex-1 gradient-primary shadow-button hover:shadow-glow transition-all duration-300"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1 border-border/20 hover:border-quiz-primary/50"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </Button>
              
              <Button
                onClick={onHome}
                variant="outline"
                className="flex-1 border-border/20 hover:border-quiz-primary/50"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Your results have been saved locally</p>
        </div>
      </div>
    </div>
  );
};