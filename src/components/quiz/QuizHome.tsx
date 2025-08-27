import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Trophy, Brain, Play } from "lucide-react";
import { QuizData } from "@/data/quizData";

interface QuizHomeProps {
  quizData: QuizData;
  onStartQuiz: () => void;
  highScore?: number;
}

export const QuizHome = ({ quizData, onStartQuiz, highScore }: QuizHomeProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary shadow-glow mb-6">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {quizData.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            {quizData.description}
          </p>
        </div>

        <Card className="gradient-card border-border/20 shadow-card backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Ready to Challenge Yourself?</CardTitle>
            <CardDescription className="text-lg">
              Test your knowledge and see how well you can score!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-quiz-primary/20">
                  <Brain className="h-5 w-5 text-quiz-primary" />
                </div>
                <div>
                  <p className="font-semibold">{quizData.questions.length} Questions</p>
                  <p className="text-sm text-muted-foreground">Multiple choice</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-quiz-warning/20">
                  <Clock className="h-5 w-5 text-quiz-warning" />
                </div>
                <div>
                  <p className="font-semibold">{Math.floor(quizData.timeLimit / 60)} Minutes</p>
                  <p className="text-sm text-muted-foreground">Time limit</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-quiz-success/20">
                  <Trophy className="h-5 w-5 text-quiz-success" />
                </div>
                <div>
                  <p className="font-semibold">
                    {highScore !== undefined ? `${highScore}%` : "No Score"}
                  </p>
                  <p className="text-sm text-muted-foreground">Best score</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={onStartQuiz}
                size="lg"
                className="gradient-primary shadow-button hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 h-auto"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Quiz
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Your progress will be automatically saved</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};