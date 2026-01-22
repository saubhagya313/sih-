import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Calculator, Trophy, RotateCcw, Lightbulb } from "lucide-react";

interface GameMathProps {
  onComplete: (score: number, points: number) => void;
}

interface MathProblem {
  id: number;
  question: string;
  answer: number;
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'algebra' | 'geometry' | 'arithmetic';
}

const GameMath: React.FC<GameMathProps> = ({ onComplete }) => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<'playing' | 'completed'>('playing');
  const [answers, setAnswers] = useState<{ problemId: number; userAnswer: string; correct: boolean }[]>([]);

  const problems: MathProblem[] = [
    {
      id: 1,
      question: "Solve for x: 2x + 5 = 13",
      answer: 4,
      hint: "Subtract 5 from both sides, then divide by 2",
      difficulty: 'easy',
      type: 'algebra'
    },
    {
      id: 2,
      question: "What is the area of a circle with radius 3 cm? (Use π = 3.14)",
      answer: 28.26,
      hint: "Use the formula A = πr². Don't forget to square the radius first!",
      difficulty: 'medium',
      type: 'geometry'
    },
    {
      id: 3,
      question: "Calculate: 15% of 240",
      answer: 36,
      hint: "Convert 15% to decimal (0.15) and multiply by 240",
      difficulty: 'easy',
      type: 'arithmetic'
    },
    {
      id: 4,
      question: "Solve: x² - 7x + 12 = 0 (Enter the smaller solution)",
      answer: 3,
      hint: "Factor the quadratic equation or use the quadratic formula",
      difficulty: 'hard',
      type: 'algebra'
    },
    {
      id: 5,
      question: "If a triangle has sides 3, 4, and 5 units, what is its area?",
      answer: 6,
      hint: "This is a right triangle! Use the formula: Area = (1/2) × base × height",
      difficulty: 'medium',
      type: 'geometry'
    }
  ];

  const currentProblem = problems[currentProblemIndex];

  const handleAnswerSubmit = () => {
    const numericAnswer = parseFloat(userAnswer);
    const isCorrect = Math.abs(numericAnswer - currentProblem.answer) < 0.01; // Allow small floating point differences
    const newScore = isCorrect ? score + 1 : score;
    
    setScore(newScore);
    setShowResult(true);
    
    // Record answer
    setAnswers(prev => [...prev, {
      problemId: currentProblem.id,
      userAnswer: userAnswer,
      correct: isCorrect
    }]);

    // Move to next problem after 4 seconds
    setTimeout(() => {
      if (currentProblemIndex < problems.length - 1) {
        setCurrentProblemIndex(currentProblemIndex + 1);
        setUserAnswer("");
        setShowResult(false);
        setShowHint(false);
      } else {
        completeGame(newScore);
      }
    }, 4000);
  };

  const completeGame = (finalScore: number) => {
    setGamePhase('completed');
    const percentage = Math.round((finalScore / problems.length) * 100);
    const pointsEarned = Math.max(50, Math.round(percentage * 1.5)); // 50-150 points based on performance
    
    setTimeout(() => {
      onComplete(percentage, pointsEarned);
    }, 2000);
  };

  const restartGame = () => {
    setCurrentProblemIndex(0);
    setUserAnswer("");
    setShowResult(false);
    setShowHint(false);
    setScore(0);
    setGamePhase('playing');
    setAnswers([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'hard': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'algebra': return '📐';
      case 'geometry': return '📏';
      case 'arithmetic': return '🔢';
      default: return '🧮';
    }
  };

  if (gamePhase === 'completed') {
    const percentage = Math.round((score / problems.length) * 100);
    const pointsEarned = Math.max(50, Math.round(percentage * 1.5));

    return (
      <div className="max-w-2xl mx-auto">
        <div className="learning-card text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Math Challenge Complete! 🏆</h2>
            <p className="text-muted-foreground">Excellent problem-solving skills!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">{score}/{problems.length}</div>
              <div className="text-sm text-muted-foreground">Problems Solved</div>
            </div>
            <div className="bg-success/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-success">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="bg-warning/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-warning">+{pointsEarned}</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
          </div>

          {/* Performance Message */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h4 className="font-semibold text-accent mb-2">
              {percentage >= 80 ? "Outstanding! 🌟" : 
               percentage >= 60 ? "Great Job! 👍" : 
               "Keep Practicing! 💪"}
            </h4>
            <p className="text-foreground text-sm">
              {percentage >= 80 ? "You've mastered these mathematical concepts!" : 
               percentage >= 60 ? "You're on the right track. Review the areas you missed." : 
               "Mathematics takes practice. Don't give up!"}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={restartGame}
              className="btn-hero flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="learning-card space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              Math Challenge
            </h2>
            <p className="text-muted-foreground">
              Problem {currentProblemIndex + 1} of {problems.length}
            </p>
          </div>
          
          <div className="text-right space-y-2">
            <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getDifficultyColor(currentProblem.difficulty)}`}>
              {currentProblem.difficulty.charAt(0).toUpperCase() + currentProblem.difficulty.slice(1)}
            </div>
            <div className="text-lg">
              {getTypeIcon(currentProblem.type)} {currentProblem.type.charAt(0).toUpperCase() + currentProblem.type.slice(1)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblemIndex + 1) / problems.length) * 100}%` }}
          />
        </div>

        {/* Problem */}
        <div className="space-y-6">
          <div className="bg-muted/20 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {currentProblem.question}
            </h3>
            
            {!showResult && (
              <div className="space-y-4">
                <input
                  type="number"
                  step="any"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full max-w-xs mx-auto px-4 py-3 text-center text-xl font-mono border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your answer"
                  disabled={showResult}
                />
                
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-accent hover:text-accent/80 flex items-center gap-2 text-sm"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHint ? 'Hide Hint' : 'Need a Hint?'}
                  </button>
                </div>
              </div>
            )}
            
            {showResult && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  {Math.abs(parseFloat(userAnswer) - currentProblem.answer) < 0.01 ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-success" />
                      <span className="text-2xl font-bold text-success">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8 text-destructive" />
                      <span className="text-2xl font-bold text-destructive">Incorrect</span>
                    </>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    Your answer: <span className="font-mono font-bold">{userAnswer || "No answer"}</span>
                  </p>
                  <p className="text-foreground">
                    Correct answer: <span className="font-mono font-bold text-success">{currentProblem.answer}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Hint */}
          {(showHint || showResult) && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Hint:
              </h4>
              <p className="text-foreground">{currentProblem.hint}</p>
            </div>
          )}

          {/* Submit Button */}
          {!showResult && (
            <button
              onClick={handleAnswerSubmit}
              disabled={!userAnswer.trim()}
              className="btn-hero w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!userAnswer.trim() ? "Enter your answer" : "Submit Answer"}
            </button>
          )}

          {/* Score Display */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Solved: {score}/{problems.length}</span>
            <span>Accuracy: {problems.length > 0 ? Math.round((score / Math.max(currentProblemIndex, 1)) * 100) : 0}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMath;