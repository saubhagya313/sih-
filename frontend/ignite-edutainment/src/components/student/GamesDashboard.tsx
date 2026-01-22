import { useState, useEffect } from "react";
import { ArrowLeft, Trophy, Star, Play, Timer, Target, Brain, Box } from "lucide-react";
import { Link } from "react-router-dom";
import StudentProfileSidebar from "../common/StudentProfileSidebar";

// Correct import paths for the game components (as per your file structure)
import GameQuizRunner from "../../games/GameQuizRunner.tsx";
import GameMath from "../../games/GameMath.tsx";
import GameFlashcards from "../../games/GameFlashcards.tsx";
import GameMemoryMatch from "../../games/GameMemoryMatch.tsx";

const GamesDashboard = () => {
    const [user, setUser] = useState<any>(null);
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [gameScores, setGameScores] = useState<any[]>([]);

    const games = [
        {
            id: "quiz",
            name: "Quiz Runner",
            description: "Test your knowledge with quick quizzes",
            icon: Target,
            difficulty: "Medium",
            estimatedTime: "5-10 min",
            points: "50-100",
            component: GameQuizRunner,
        },
        {
            id: "math",
            name: "Math Challenge",
            description: "Solve mathematical problems step by step",
            icon: Trophy,
            difficulty: "Hard",
            estimatedTime: "15-20 min",
            points: "75-150",
            component: GameMath,
        },
        {
            id: "flashcards",
            name: "Flashcards",
            description: "Learn and memorize key concepts",
            icon: Star,
            difficulty: "Easy",
            estimatedTime: "5-10 min",
            points: "25-50",
            component: GameFlashcards,
        },
        {
            id: "memory-match",
            name: "Memory Match",
            description: "Find matching pairs of terms and definitions",
            icon: Brain,
            difficulty: "Easy",
            estimatedTime: "5-8 min",
            points: "30-60",
            component: GameMemoryMatch,
        },
    ];

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser({
                ...parsedUser,
                points: 1250,
                level: 5,
            });
        }
        setGameScores([
            { gameId: "quiz", bestScore: 85, lastPlayed: "2024-01-15", timesPlayed: 12 },
            { gameId: "math", bestScore: 92, lastPlayed: "2024-01-14", timesPlayed: 8 },
            { gameId: "flashcards", bestScore: 78, lastPlayed: "2024-01-13", timesPlayed: 15 },
            { gameId: "memory-match", bestScore: 95, lastPlayed: "2024-01-16", timesPlayed: 5 },
        ]);
    }, []);

    const handleGameComplete = (gameId: string, score: number, points: number) => {
        setUser((prev: any) => ({
            ...prev,
            points: prev.points + points,
        }));
        setGameScores((prev) =>
            prev.map((gameScore) =>
                gameScore.gameId === gameId
                    ? {
                        ...gameScore,
                        bestScore: Math.max(gameScore.bestScore, score),
                        lastPlayed: new Date().toISOString().split("T")[0],
                        timesPlayed: gameScore.timesPlayed + 1,
                    }
                    : gameScore
            )
        );
        setSelectedGame(null);
    };

    const getScoreForGame = (gameId: string) => {
        return gameScores.find((score) => score.gameId === gameId);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Easy": return "bg-success/10 text-success";
            case "Medium": return "bg-warning/10 text-warning";
            case "Hard": return "bg-destructive/10 text-destructive";
            default: return "bg-muted/10 text-muted-foreground";
        }
    };

    if (selectedGame) {
        const game = games.find((g) => g.id === selectedGame);
        if (game) {
            const GameComponent = game.component;
            return (
                <div className="min-h-screen bg-background flex">
                    {user && <StudentProfileSidebar user={user} />}
                    <div className="flex-1 p-8">
                        <div className="mb-6">
                            <button
                                onClick={() => setSelectedGame(null)}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Games</span>
                            </button>
                        </div>
                        <GameComponent
                            onComplete={(score: number, points: number) => handleGameComplete(selectedGame, score, points)}
                        />
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="min-h-screen bg-background flex">
            {user && <StudentProfileSidebar user={user} />}

            <div className="flex-1 p-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link to="/student/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Dashboard</span>
                            </Link>
                            <h1 className="text-3xl font-bold text-foreground">Learning Games 🎮</h1>
                            <p className="text-muted-foreground mt-2">
                                Learn through fun, interactive games and earn points!
                            </p>
                        </div>

                        <div className="text-right">
                            <div className="achievement-card">
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5" />
                                    <span className="font-bold">{user?.points || 0} Points</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {games.map((game) => {
                        const gameScore = getScoreForGame(game.id);
                        const IconComponent = game.icon;

                        return (
                            <div
                                key={game.id}
                                className="learning-card hover:scale-105 cursor-pointer"
                                onClick={() => setSelectedGame(game.id)}
                            >
                                <div className="text-center space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-gradient-warning rounded-2xl flex items-center justify-center">
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">{game.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-4">{game.description}</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Difficulty:</span>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                                                {game.difficulty}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Time:</span>
                                            <span className="flex items-center gap-1">
                                                <Timer className="w-3 h-3" />
                                                {game.estimatedTime}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Points:</span>
                                            <span className="font-medium text-warning">{game.points}</span>
                                        </div>
                                        {gameScore && (
                                            <div className="pt-3 border-t border-border space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Best Score:</span>
                                                    <span className="font-bold text-success">{gameScore.bestScore}%</span>
                                                </div>
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>Played {gameScore.timesPlayed} times</span>
                                                    <span>Last: {new Date(gameScore.lastPlayed).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button className="btn-game w-full flex items-center justify-center gap-2">
                                        <Play className="w-4 h-4" />
                                        {gameScore ? "Play Again" : "Start Game"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default GamesDashboard;