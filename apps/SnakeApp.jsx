import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, RotateCw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 250;
const SPEEDS = { EASY: 250, MEDIUM: 150, HARD: 100 };

export default function SnakeApp() {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 10 });
    const [dir, setDir] = useState({ x: 1, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(SPEEDS.EASY);

    // Use refs to avoid closure stale state in interval
    const snakeRef = useRef(snake);
    const dirRef = useRef(dir);

    useEffect(() => {
        snakeRef.current = snake;
        dirRef.current = dir;
    }, [snake, dir]);

    const moveSnake = useCallback(() => {
        if (gameOver || !isPlaying) return;

        const currentSnake = [...snakeRef.current];
        const head = { ...currentSnake[0] };

        head.x += dirRef.current.x;
        head.y += dirRef.current.y;

        // Collision with walls
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            handleGameOver();
            return;
        }

        // Collision with self
        for (let segment of currentSnake) {
            if (head.x === segment.x && head.y === segment.y) {
                handleGameOver();
                return;
            }
        }

        currentSnake.unshift(head);

        // Check Food
        if (head.x === food.x && head.y === food.y) {
            setScore(s => s + 10);
            spawnFood();
        } else {
            currentSnake.pop(); // remove tail if no food eaten
        }

        setSnake(currentSnake);
    }, [food, gameOver, isPlaying]);

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(moveSnake, speed);
        return () => clearInterval(interval);
    }, [moveSnake, isPlaying, speed]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === 'ArrowUp') handleDirChange(0, -1);
            if (e.key === 'ArrowDown') handleDirChange(0, 1);
            if (e.key === 'ArrowLeft') handleDirChange(-1, 0);
            if (e.key === 'ArrowRight') handleDirChange(1, 0);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleDirChange = (x, y) => {
        // Prevent 180 degree turns
        if (dirRef.current.x === -x && x !== 0) return;
        if (dirRef.current.y === -y && y !== 0) return;
        setDir({ x, y });
    };

    const handleGameOver = () => {
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) setHighScore(score);
    };

    const spawnFood = () => {
        let newX, newY, safe = false;
        while (!safe) {
            newX = Math.floor(Math.random() * GRID_SIZE);
            newY = Math.floor(Math.random() * GRID_SIZE);
            safe = !snakeRef.current.some(s => s.x === newX && s.y === newY);
        }
        setFood({ x: newX, y: newY });
    };

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDir({ x: 1, y: 0 });
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        spawnFood();
    };

    return (
        <div className="w-full h-full bg-[#1e293b] text-white flex flex-col relative">
            {/* Header */}
            <div className="pt-12 pb-4 px-6 bg-slate-900 flex justify-between items-center shrink-0 border-b border-slate-700">
                <div>
                    <h1 className="text-xl font-bold text-emerald-400">Retro Snake</h1>
                    <p className="text-xs text-slate-400">Score: {score}</p>
                </div>
                <div className="flex items-center gap-2 text-yellow-400 font-bold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    <Trophy size={16} />
                    {highScore}
                </div>
            </div>

            {/* Game Canvas container */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div
                    className="bg-slate-800 border-4 border-slate-700 rounded-xl relative overflow-hidden shadow-2xl"
                    style={{
                        width: '100%',
                        maxWidth: '350px',
                        aspectRatio: '1/1'
                    }}
                >
                    {/* Grid rendering (CSS visually) */}
                    <div
                        className="absolute inset-0 grid"
                        style={{
                            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                        }}
                    >
                        {/* Render Snake */}
                        {snake.map((segment, index) => (
                            <div
                                key={index}
                                className={`${index === 0 ? 'bg-emerald-400 rounded-sm z-10' : 'bg-emerald-600/80 rounded-sm'} border border-slate-800/20`}
                                style={{
                                    gridColumnStart: segment.x + 1,
                                    gridRowStart: segment.y + 1
                                }}
                            />
                        ))}
                        {/* Render Food */}
                        <div
                            className="bg-red-500 rounded-full animate-pulse z-0"
                            style={{
                                gridColumnStart: food.x + 1,
                                gridRowStart: food.y + 1,
                                transform: 'scale(0.8)'
                            }}
                        />
                    </div>

                    {/* Overlays */}
                    {!isPlaying && !gameOver && (
                        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                            <span className="text-4xl mb-4">🐍</span>
                            <button
                                onClick={resetGame}
                                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-full active:scale-95 transition-all shadow-lg"
                            >
                                START GAME
                            </button>
                        </div>
                    )}

                    {gameOver && (
                        <div className="absolute inset-0 bg-red-900/90 backdrop-blur-md flex flex-col items-center justify-center z-20">
                            <h2 className="text-3xl font-black text-white mb-2">GAME OVER</h2>
                            <p className="text-red-200 font-medium mb-6">Final Score: {score}</p>
                            <button
                                onClick={resetGame}
                                className="px-6 py-3 bg-white hover:bg-slate-100 text-red-900 font-bold rounded-full flex gap-2 items-center active:scale-95 transition-all shadow-xl"
                            >
                                <RotateCw size={18} />
                                PLAY AGAIN
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile D-Pad Controls (Only visible/useful really if touch) */}
            <div className="pb-8 pt-2 px-8 grid grid-cols-3 gap-2 w-full max-w-[280px] mx-auto shrink-0 opacity-80">
                <div />
                <button
                    onClick={() => handleDirChange(0, -1)}
                    className="bg-slate-700 aspect-square rounded-2xl flex items-center justify-center active:bg-emerald-500 active:text-slate-900 transition-colors shadow-md"
                >
                    <ArrowUp size={28} />
                </button>
                <div />
                <button
                    onClick={() => handleDirChange(-1, 0)}
                    className="bg-slate-700 aspect-square rounded-2xl flex items-center justify-center active:bg-emerald-500 active:text-slate-900 transition-colors shadow-md"
                >
                    <ArrowLeft size={28} />
                </button>
                <button
                    onClick={() => handleDirChange(0, 1)}
                    className="bg-slate-700 aspect-square rounded-2xl flex items-center justify-center active:bg-emerald-500 active:text-slate-900 transition-colors shadow-md"
                >
                    <ArrowDown size={28} />
                </button>
                <button
                    onClick={() => handleDirChange(1, 0)}
                    className="bg-slate-700 aspect-square rounded-2xl flex items-center justify-center active:bg-emerald-500 active:text-slate-900 transition-colors shadow-md"
                >
                    <ArrowRight size={28} />
                </button>
            </div>
        </div>
    );
}
