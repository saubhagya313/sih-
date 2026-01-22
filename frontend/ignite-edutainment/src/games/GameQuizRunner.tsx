import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface GameQuizRunnerProps {
  onComplete: (score: number, points: number) => void;
}

const quizQuestions = [
  { id: 1, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { id: 2, question: "What is the chemical symbol for Oxygen?", options: ["O", "Ox", "O₂", "Oxy"], answer: "O" },
  { id: 3, question: "What is 7 x 8?", options: ["49", "56", "64", "72"], answer: "56" },
];

const GameQuizRunner: React.FC<GameQuizRunnerProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === quizQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsCompleted(true);
      const finalScore = Math.round((score / quizQuestions.length) * 100);
      const pointsEarned = Math.max(25, Math.round(finalScore / 2));
      setTimeout(() => onComplete(finalScore, pointsEarned), 1500);
    }
  };
  
  if (isCompleted) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold">Quiz Complete!</h2>
        <p className="text-lg">Your score: {score}/{quizQuestions.length}</p>
        <p>You earned {Math.max(25, Math.round((score / quizQuestions.length) * 50))} points!</p>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="max-w-xl mx-auto learning-card space-y-6">
      <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="btn-secondary py-3 px-6 rounded-lg text-lg"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
export default GameQuizRunner;