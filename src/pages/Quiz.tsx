import { useState, useEffect } from "react";
import { QuizHome } from "@/components/quiz/QuizHome";
import { QuizInterface, QuizResults } from "@/components/quiz/QuizInterface";
import { QuizResults as QuizResultsComponent } from "@/components/quiz/QuizResults";
import { sampleQuiz } from "@/data/quizData";

type QuizState = 'home' | 'quiz' | 'results';

const Quiz = () => {
  const [currentState, setCurrentState] = useState<QuizState>('home');
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [highScore, setHighScore] = useState<number | undefined>();

  useEffect(() => {
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const handleStartQuiz = () => {
    setCurrentState('quiz');
  };

  const handleQuizComplete = (results: QuizResults) => {
    setQuizResults(results);
    setCurrentState('results');
    
    // Update high score if needed
    if (results.score > (highScore || 0)) {
      setHighScore(results.score);
    }
  };

  const handleRestart = () => {
    setCurrentState('quiz');
    setQuizResults(null);
  };

  const handleHome = () => {
    setCurrentState('home');
    setQuizResults(null);
  };

  return (
    <main className="min-h-screen">
      {currentState === 'home' && (
        <QuizHome
          quizData={sampleQuiz}
          onStartQuiz={handleStartQuiz}
          highScore={highScore}
        />
      )}
      
      {currentState === 'quiz' && (
        <QuizInterface
          quizData={sampleQuiz}
          onComplete={handleQuizComplete}
          onHome={handleHome}
        />
      )}
      
      {currentState === 'results' && quizResults && (
        <QuizResultsComponent
          results={quizResults}
          onRestart={handleRestart}
          onHome={handleHome}
          quizTitle={sampleQuiz.title}
        />
      )}
    </main>
  );
};

export default Quiz;