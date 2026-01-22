import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw } from "lucide-react";

interface GameQuizProps {
  onComplete: (score: number, points: number) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const GameQuiz: React.FC<GameQuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gamePhase, setGamePhase] = useState<'playing' | 'completed'>('playing');
  const [answers, setAnswers] = useState<{ questionId: number; selectedAnswer: number; correct: boolean }[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the chemical symbol for Gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2,
      explanation: "Au comes from the Latin word 'aurum' meaning gold."
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      explanation: "Mars appears red due to iron oxide (rust) on its surface."
    },
    {
      id: 3,
      question: "What is the speed of light in vacuum?",
      options: ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^10 m/s", "3 × 10^5 m/s"],
      correctAnswer: 0,
      explanation: "The speed of light in vacuum is approximately 3 × 10^8 meters per second."
    },
    {
      id: 4,
      question: "Which organ produces insulin in the human body?",
      options: ["Liver", "Kidney", "Pancreas", "Heart"],
      correctAnswer: 2,
      explanation: "The pancreas produces insulin to regulate blood sugar levels."
    },
    {
      id: 5,
      question: "What is the smallest unit of matter?",
      options: ["Molecule", "Atom", "Electron", "Proton"],
      correctAnswer: 1,
      explanation: "An atom is the smallest unit of matter that retains the properties of an element."
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (gamePhase === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, gamePhase, showResult]);

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      // Auto-submit with no answer
      handleAnswerSubmit();
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = () => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    
    setScore(newScore);
    setShowResult(true);
    
    // Record answer
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswer || -1,
      correct: isCorrect
    }]);

    // Move to next question after 3 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        completeGame(newScore);
      }
    }, 3000);
  };

  const completeGame = (finalScore: number) => {
    setGamePhase('completed');
    const percentage = Math.round((finalScore / questions.length) * 100);
    const pointsEarned = Math.max(25, Math.round(percentage / 2)); // 25-50 points based on performance
    
    setTimeout(() => {
      onComplete(percentage, pointsEarned);
    }, 2000);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setGamePhase('playing');
    setAnswers([]);
  };

  if (gamePhase === 'completed') {
    const percentage = Math.round((score / questions.length) * 100);
    const pointsEarned = Math.max(25, Math.round(percentage / 2));

    return (
      <div className="max-w-2xl mx-auto">
        <div className="learning-card text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-warning rounded-2xl flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Complete! 🎉</h2>
            <p className="text-muted-foreground">Great job on completing the science quiz!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">{score}/{questions.length}</div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </div>
            <div className="bg-success/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-success">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Final Score</div>
            </div>
            <div className="bg-warning/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-warning">+{pointsEarned}</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={restartGame}
              className="btn-success flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
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
            <h2 className="text-2xl font-bold text-foreground">Science Quiz</h2>
            <p className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-destructive' : 'text-primary'}`}>
              {timeLeft}s
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Time Left</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 font-medium transition-all ";
              
              if (showResult) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += "border-success bg-success/10 text-success";
                } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                  buttonClass += "border-destructive bg-destructive/10 text-destructive";
                } else {
                  buttonClass += "border-muted bg-muted/50 text-muted-foreground";
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += "border-primary bg-primary/10 text-primary";
                } else {
                  buttonClass += "border-border hover:border-primary hover:bg-primary/5 text-foreground";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-current/20 text-current text-sm font-bold flex items-center justify-center">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-5 h-5 ml-auto" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                      <XCircle className="w-5 h-5 ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <h4 className="font-semibold text-accent mb-2">Explanation:</h4>
              <p className="text-foreground">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Submit Button */}
          {!showResult && (
            <button
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              className="btn-hero w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedAnswer === null ? "Select an answer" : "Submit Answer"}
            </button>
          )}

          {/* Score Display */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Score: {score}/{questions.length}</span>
            <span>Accuracy: {questions.length > 0 ? Math.round((score / Math.max(currentQuestionIndex, 1)) * 100) : 0}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameQuiz;