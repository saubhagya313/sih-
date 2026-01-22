import { useState, useEffect } from "react";
import { RotateCw, Trophy, RotateCcw, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

interface GameFlashcardsProps {
  onComplete: (score: number, points: number) => void;
}

interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const GameFlashcards: React.FC<GameFlashcardsProps> = ({ onComplete }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [unknownCards, setUnknownCards] = useState<number[]>([]);
  const [gamePhase, setGamePhase] = useState<'learning' | 'testing' | 'completed'>('learning');
  const [testScore, setTestScore] = useState(0);
  const [testAnswers, setTestAnswers] = useState<{ cardId: number; known: boolean }[]>([]);

  const flashcards: Flashcard[] = [
    {
      id: 1,
      front: "What is photosynthesis?",
      back: "The process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen.",
      category: "Biology",
      difficulty: 'easy'
    },
    {
      id: 2,
      front: "What is Newton's First Law of Motion?",
      back: "An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.",
      category: "Physics",
      difficulty: 'medium'
    },
    {
      id: 3,
      front: "What is the chemical formula for water?",
      back: "H₂O (two hydrogen atoms bonded to one oxygen atom)",
      category: "Chemistry",
      difficulty: 'easy'
    },
    {
      id: 4,
      front: "What is the Pythagorean theorem?",
      back: "In a right triangle, a² + b² = c², where c is the hypotenuse and a and b are the other two sides.",
      category: "Mathematics",
      difficulty: 'medium'
    },
    {
      id: 5,
      front: "What is mitosis?",
      back: "The process of cell division that produces two identical diploid cells from one parent cell.",
      category: "Biology",
      difficulty: 'hard'
    },
    {
      id: 6,
      front: "What is the speed of sound in air at room temperature?",
      back: "Approximately 343 meters per second (1,125 feet per second)",
      category: "Physics",
      difficulty: 'hard'
    }
  ];

  const currentCard = flashcards[currentCardIndex];

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(!showAnswer);
  };

  const handleKnownCard = () => {
    if (!knownCards.includes(currentCard.id)) {
      setKnownCards([...knownCards, currentCard.id]);
    }
    nextCard();
  };

  const handleUnknownCard = () => {
    if (!unknownCards.includes(currentCard.id)) {
      setUnknownCards([...unknownCards, currentCard.id]);
    }
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    setShowAnswer(false);
    
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      startTesting();
    }
  };

  const startTesting = () => {
    setGamePhase('testing');
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowAnswer(false);
  };

  const handleTestAnswer = (known: boolean) => {
    const newTestAnswers = [...testAnswers, { cardId: currentCard.id, known }];
    setTestAnswers(newTestAnswers);
    
    if (known) {
      setTestScore(testScore + 1);
    }
    
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      setShowAnswer(false);
    } else {
      completeGame(known ? testScore + 1 : testScore);
    }
  };

  const completeGame = (finalScore: number) => {
    setGamePhase('completed');
    const percentage = Math.round((finalScore / flashcards.length) * 100);
    const pointsEarned = Math.max(25, Math.round(percentage / 2)); // 25-50 points based on performance
    
    setTimeout(() => {
      onComplete(percentage, pointsEarned);
    }, 2000);
  };

  const restartGame = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowAnswer(false);
    setKnownCards([]);
    setUnknownCards([]);
    setGamePhase('learning');
    setTestScore(0);
    setTestAnswers([]);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'biology': return 'bg-success/10 text-success';
      case 'physics': return 'bg-primary/10 text-primary';
      case 'chemistry': return 'bg-warning/10 text-warning';
      case 'mathematics': return 'bg-accent/10 text-accent';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'hard': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  if (gamePhase === 'completed') {
    const percentage = Math.round((testScore / flashcards.length) * 100);
    const pointsEarned = Math.max(25, Math.round(percentage / 2));

    return (
      <div className="max-w-2xl mx-auto">
        <div className="learning-card text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Flashcards Complete! 🧠</h2>
            <p className="text-muted-foreground">Great job studying and testing your knowledge!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">{flashcards.length}</div>
              <div className="text-sm text-muted-foreground">Cards Studied</div>
            </div>
            <div className="bg-success/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-success">{testScore}/{flashcards.length}</div>
              <div className="text-sm text-muted-foreground">Known in Test</div>
            </div>
            <div className="bg-accent/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-accent">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Retention Rate</div>
            </div>
            <div className="bg-warning/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-warning">+{pointsEarned}</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
          </div>

          {/* Study Stats */}
          <div className="bg-muted/20 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">Study Session Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Initially Known:</span>
                <span className="font-medium text-success">{knownCards.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Initially Unknown:</span>
                <span className="font-medium text-warning">{unknownCards.length}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={restartGame}
              className="btn-success flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Study Again
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
            <h2 className="text-2xl font-bold text-foreground">
              {gamePhase === 'learning' ? 'Study Mode' : 'Test Mode'} 📚
            </h2>
            <p className="text-muted-foreground">
              Card {currentCardIndex + 1} of {flashcards.length}
              {gamePhase === 'learning' && ' - Click to study, then mark if you know it'}
              {gamePhase === 'testing' && ' - Test your knowledge!'}
            </p>
          </div>
          
          <div className="text-right space-y-2">
            <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getCategoryColor(currentCard.category)}`}>
              {currentCard.category}
            </div>
            <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
              {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
          />
        </div>

        {/* Flashcard */}
        <div className="relative">
          <div 
            className={`min-h-64 bg-gradient-to-br from-card to-card-hover border-2 border-border rounded-xl p-8 cursor-pointer transition-all duration-300 hover:shadow-soft ${
              isFlipped ? 'transform rotateY-180' : ''
            }`}
            onClick={handleCardFlip}
          >
            <div className="flex flex-col items-center justify-center text-center h-full space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                {showAnswer ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="text-sm">
                  {showAnswer ? 'Answer' : 'Question'} - Click to flip
                </span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground leading-relaxed">
                  {showAnswer ? currentCard.back : currentCard.front}
                </h3>
              </div>

              <button className="mt-6 text-primary hover:text-primary-glow flex items-center gap-2 transition-colors">
                <RotateCw className="w-4 h-4" />
                <span className="text-sm">Click to flip card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {gamePhase === 'learning' && showAnswer && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleUnknownCard}
              className="flex items-center justify-center gap-2 py-3 px-6 bg-warning/10 text-warning border border-warning/20 rounded-lg hover:bg-warning/20 transition-colors"
            >
              <XCircle className="w-5 h-5" />
              <span>Need to Study</span>
            </button>
            <button
              onClick={handleKnownCard}
              className="flex items-center justify-center gap-2 py-3 px-6 bg-success/10 text-success border border-success/20 rounded-lg hover:bg-success/20 transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              <span>I Know This</span>
            </button>
          </div>
        )}

        {gamePhase === 'testing' && showAnswer && (
          <div className="space-y-4">
            <div className="text-center text-muted-foreground">
              <p>Did you remember this correctly?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleTestAnswer(false)}
                className="flex items-center justify-center gap-2 py-3 px-6 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/20 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                <span>No, I Forgot</span>
              </button>
              <button
                onClick={() => handleTestAnswer(true)}
                className="flex items-center justify-center gap-2 py-3 px-6 bg-success/10 text-success border border-success/20 rounded-lg hover:bg-success/20 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Yes, I Knew It</span>
              </button>
            </div>
          </div>
        )}

        {/* Progress Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {gamePhase === 'learning' && (
            <>
              <div className="text-center">
                <div className="text-lg font-bold text-success">{knownCards.length}</div>
                <div className="text-muted-foreground">Known</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-warning">{unknownCards.length}</div>
                <div className="text-muted-foreground">To Study</div>
              </div>
            </>
          )}
          {gamePhase === 'testing' && (
            <>
              <div className="text-center">
                <div className="text-lg font-bold text-success">{testScore}</div>
                <div className="text-muted-foreground">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{testAnswers.length - testScore}</div>
                <div className="text-muted-foreground">Incorrect</div>
              </div>
            </>
          )}
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{currentCardIndex + 1}</div>
            <div className="text-muted-foreground">Current</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-muted-foreground">{flashcards.length}</div>
            <div className="text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameFlashcards;