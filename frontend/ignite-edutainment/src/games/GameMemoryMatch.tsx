import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface GameMemoryMatchProps {
  onComplete: (score: number, points: number) => void;
}

const memoryCards = [
  { id: 1, term: "Photosynthesis", definition: "Plants convert light into energy" },
  { id: 2, term: "Mitosis", definition: "Cell division for growth" },
  { id: 3, term: "Gravity", definition: "A force that pulls objects together" },
  { id: 4, term: "Photosynthesis", definition: "Plants convert light into energy" },
  { id: 5, term: "Mitosis", definition: "Cell division for growth" },
  { id: 6, term: "Gravity", definition: "A force that pulls objects together" },
];

const GameMemoryMatch: React.FC<GameMemoryMatchProps> = ({ onComplete }) => {
  const [cards, setCards] = useState(memoryCards.sort(() => Math.random() - 0.5));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (cards[firstCard].term === cards[secondCard].term) {
        setMatchedPairs((prev) => [...prev, cards[firstCard].id]);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [flippedCards]);

  const resetTurn = () => {
    setFlippedCards([]);
    setTurns((prev) => prev + 1);
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedPairs.includes(cards[index].id)) {
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  if (matchedPairs.length === memoryCards.length / 2) {
    const score = Math.round((memoryCards.length / turns) * 100);
    const pointsEarned = Math.max(25, score);
    setTimeout(() => onComplete(score, pointsEarned), 1500);
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold">Game Over!</h2>
        <p className="text-lg">You completed the game in {turns} turns.</p>
        <p>You earned {pointsEarned} points!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-center text-xl font-bold mb-6">Match the terms!</h3>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`memory-card-back w-28 h-28 p-2 rounded-lg flex items-center justify-center text-center cursor-pointer transition-transform duration-300 ${
              (flippedCards.includes(index) || matchedPairs.includes(card.id)) ? 'flipped text-foreground' : 'bg-primary text-white'
            }`}
            onClick={() => handleCardClick(index)}
          >
            {(flippedCards.includes(index) || matchedPairs.includes(card.id)) && (
              <span className="font-semibold">{card.term || card.definition}</span>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <p className="text-lg">Turns: {turns}</p>
      </div>
    </div>
  );
};
export default GameMemoryMatch;