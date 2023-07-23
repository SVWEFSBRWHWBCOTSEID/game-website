'use client' // TODO

import {useState} from 'react';
import Head from 'next/head';

// Components
import UltimateTicTacToeBoard, {
    ANY_BOARD,
    defaultUTTTBoard,
    defaultUTTTBoardStatuses,
    UTTTBoard,
    UTTTBoardStatuses
} from '../../game/[id]/UltimateTicTacToeBoard';
import TicTacToeScoreIndicator, {TTTScores} from '../ttt/TicTacToeScoreIndicator';

// Utilities
import {BoardStatus, TTTBoard, TTTSymbol} from '../../game/[id]/TicTacToeBoard';
import {checkBoardStatus} from '../ttt/page';


export default function OfflineUltimateTicTacToe() {
    const [gameState, setGameState] = useState(defaultUTTTBoard);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);
    const [gameStatuses, setGameStatuses] = useState(defaultUTTTBoardStatuses);
    const [activeBoard, setActiveBoard] = useState(4);

    const [scores, setScores] = useState<TTTScores>([0, 0]);

    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');
    const [nextStartSymbol, setNextStartSymbol] = useState<TTTSymbol>('◯');

    // Makes a move by checking the given square in the given board,
    // alternating the player's symbol and setting the new active square after each move.
    function setSquare(board: number, square: number, symbol: TTTSymbol) {
        const newGameState: UTTTBoard = [...gameState];
        const newBoard: TTTBoard = [...newGameState[board]];
        newBoard[square] = symbol;
        newGameState[board] = newBoard;

        // Check inner board status and update if won
        const status = checkBoardStatus(newBoard);
        const newGameStatuses: UTTTBoardStatuses = [...gameStatuses];
        newGameStatuses[board] = status;
        setGameStatuses(newGameStatuses);

        setGameState(newGameState);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
        setActiveBoard(newGameStatuses[square] !== BoardStatus.PLAYING ? ANY_BOARD : square);

        // Check outer board status and handle accordingly
        const newGameStatus = checkBoardStatus(newGameStatuses.map(status => (
            status === BoardStatus.X_VICTORY ? '✕'
                : status === BoardStatus.O_VICTORY ? '◯'
                    : ''
        )) as TTTBoard)
        setGameStatus(newGameStatus);

        // Wins are +1 for the winner, ties are +0.5 for both players
        switch (newGameStatus) {
            case BoardStatus.TIED: setScores([scores[0] + 0.5, scores[1] + 0.5]); break;
            case BoardStatus.X_VICTORY: setScores([scores[0] + 1, scores[1]]); break;
            case BoardStatus.O_VICTORY: setScores([scores[0], scores[1] + 1]); break;
        }
    }

    // Starts a new game, resetting the board, status, and symbol, alternating start symbols;
    // if X started the last game, O starts the next game.
    function resetBoard() {
        setGameState(defaultUTTTBoard);
        setGameStatuses(defaultUTTTBoardStatuses);
        setPlayerSymbol(nextStartSymbol);
        setNextStartSymbol(nextStartSymbol === '✕' ? '◯' : '✕');
        setActiveBoard(4);
    }

    return (
        <main className="flex-grow flex flex-col gap-8 items-center justify-center">
            <Head>
                <title>Offline Ultimate Tic-Tac-Toe</title>
                <meta name="description" content="Offline Ultimate Tic-Tac-Toe for single-device games." />
            </Head>

            <TicTacToeScoreIndicator scores={scores} />

            <UltimateTicTacToeBoard
                gameState={gameState}
                gameStatuses={gameStatuses}
                playerSymbol={playerSymbol}
                activeBoard={activeBoard}
                setSquare={setSquare}
                disabled={gameStatus !== BoardStatus.PLAYING}
                over={gameStatus !== BoardStatus.PLAYING}
            />

            <section className="relative mb-8">
                {gameStatus === BoardStatus.PLAYING ? (
                    <p className="font-light">You are playing as <strong>{playerSymbol}</strong>. It is your move.</p>
                ) : gameStatus === BoardStatus.TIED ? (
                    <p className="font-light">The game has tied.</p>
                ) : gameStatus === BoardStatus.X_VICTORY ? (
                    <p className="font-light"><strong>✕</strong> has won!</p>
                ) : (
                    <p className="font-light"><strong>◯</strong> has won!</p>
                )}
                {gameStatus !== BoardStatus.PLAYING && (
                    <button className="absolute top-8 inset-x-0" onClick={resetBoard}>
                        Play again
                    </button>
                )}
            </section>
        </main>
    )
}
