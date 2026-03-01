import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy, RotateCcw } from 'lucide-react';

export default function TicTacToeApp() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState([]);
    const [scores, setScores] = useState({ X: 0, O: 0 });

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { player: squares[a], line: lines[i] };
            }
        }
        return null;
    };

    const handleClick = (i) => {
        if (board[i] || winner) return;
        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);

        const winResult = calculateWinner(newBoard);
        if (winResult) {
            setWinner(winResult.player);
            setWinningLine(winResult.line);
            setScores(s => ({ ...s, [winResult.player]: s[winResult.player] + 1 }));
        } else if (!newBoard.includes(null)) {
            setWinner('Draw');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setWinningLine([]);
        setXIsNext(true);
    };

    const resetScores = () => {
        setScores({ X: 0, O: 0 });
        resetGame();
    };

    return (
        <div className="h-full bg-[#1c1c1e] text-white flex flex-col p-6 items-center select-none pt-12">
            <div className="flex items-center gap-3 mb-8">
                <Trophy size={24} className="text-[#ff9f0a]" />
                <h1 className="text-2xl font-bold tracking-widest text-[#ff9f0a]">TIC TAC TOE</h1>
            </div>

            {/* Scoreboard */}
            <div className="flex gap-8 mb-10 w-full justify-center">
                <div className={`flex flex-col items-center bg-black/40 px-6 py-3 rounded-2xl border ${!winner && xIsNext ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-white/10'}`}>
                    <span className="text-blue-400 font-bold text-xl mb-1">X</span>
                    <span className="text-white text-2xl font-thin">{scores.X}</span>
                </div>
                <div className={`flex flex-col items-center bg-black/40 px-6 py-3 rounded-2xl border ${!winner && !xIsNext ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-white/10'}`}>
                    <span className="text-red-400 font-bold text-xl mb-1">O</span>
                    <span className="text-white text-2xl font-thin">{scores.O}</span>
                </div>
            </div>

            {/* Board */}
            <div className="grid grid-cols-3 gap-3 mb-10">
                {board.map((cell, i) => {
                    const isWinningCell = winningLine.includes(i);
                    return (
                        <div
                            key={i}
                            onClick={() => handleClick(i)}
                            className={`w-[85px] h-[85px] rounded-2xl flex items-center justify-center text-[50px] font-medium cursor-pointer transition-all duration-300
                                ${cell ? 'bg-black/60' : 'bg-black/30 hover:bg-black/50 active:scale-95'}
                                ${isWinningCell ? 'bg-[#ff9f0a]/20 border border-[#ff9f0a]' : 'border border-white/5'}
                            `}
                        >
                            <span className={`transform transition-all duration-300 ${cell ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} ${cell === 'X' ? 'text-blue-400' : 'text-red-400'}`}>
                                {cell}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Status & Controls */}
            <div className="flex flex-col items-center gap-4 w-full mt-auto mb-6">
                <p className="text-white/60 text-[15px] font-medium h-6">
                    {winner === 'Draw' ? "It's a Draw!" : winner ? `Player ${winner} Wins!` : `Turn: Player ${xIsNext ? 'X' : 'O'}`}
                </p>

                <div className="flex gap-4">
                    <button onClick={resetGame}
                        className="px-6 py-3 bg-white/10 rounded-full font-semibold text-[14px] flex items-center gap-2 active:bg-white/20 transition-colors">
                        <RotateCcw size={16} /> Play Again
                    </button>
                    {(scores.X > 0 || scores.O > 0) && (
                        <button onClick={resetScores}
                            className="px-4 py-3 bg-red-500/10 text-red-400 rounded-full font-semibold text-[14px] flex items-center gap-2 active:bg-red-500/20 transition-colors">
                            <RefreshCw size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
