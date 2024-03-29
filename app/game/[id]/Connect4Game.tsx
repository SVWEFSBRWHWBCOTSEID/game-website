'use client'

import Game, {UpdateGameStatesCallbacks} from './Game';
import Connect4Board, {getNextUnfilledIndex} from './Connect4Board';

// Util
import {alternatePlayerSymbol, colToIndex, getPlayerSymbolFromSide, indexToCol} from './TicTacToeGame';
import {BoardStatus, checkBoardStatus, PlayerSymbol} from './TicTacToeBoard';
import type {GameInfo} from './page';


export default function Connect4Game(props: {id: string, username?: string, info: GameInfo}) {
    function updateGameStatesFromMoves(moves: string[], {setGameStates, setGameStateIndex, reset}: UpdateGameStatesCallbacks<PlayerSymbol[]>) {
        const styledMoves: string[] = [];

        setGameStates((gameStates) => {
            // TODO: create default c4 board?
            const arr = reset ? [Array<PlayerSymbol>(42).fill(PlayerSymbol.EMPTY)] : gameStates.slice();
            let symbol = arr.length % 2 === 0 ? PlayerSymbol.SECOND : PlayerSymbol.FIRST;

            for (let i = 0; i < moves.length; i++) {
                const [, col] = moves[i].match(/(\w)/)!;
                const state = arr.at(-1)!.slice();

                const column = colToIndex(col);
                const index = getNextUnfilledIndex(state, column);

                state[index] = symbol;
                arr.push(state);

                // Style moves based on whether it's a checkmate or not
                const status = checkBoardStatus(index, state, 6, 7, 4);
                styledMoves.push(status === BoardStatus.FIRST_VICTORY || status === BoardStatus.SECOND_VICTORY
                    ? moves[i] + '#'
                    : moves[i])

                symbol = alternatePlayerSymbol(symbol);
            }

            // If the player is viewing the last move, keep them on the last move when new moves are added
            setGameStateIndex((gameStateIndex) => gameStateIndex === gameStates.length - 1 ? arr.length - 1 : gameStateIndex);

            console.log(arr);
            return arr;
        });

        return styledMoves;
    }

    // Makes a move by checking the given square.
    async function setColumn(column: number) {
        await fetch(`${process.env.API_BASE}/game/${props.id}/move/${indexToCol(column)}`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    return (
        <Game {...props} defaultBoard={Array(42).fill(PlayerSymbol.EMPTY)} updateGameStatesFromMoves={updateGameStatesFromMoves}>
            {(gameStates, gameStateIndex, gameStatus, side) => (
                <Connect4Board
                    boardState={gameStates[gameStateIndex]}
                    playerSymbol={getPlayerSymbolFromSide(side)}
                    setColumn={setColumn}
                    disabled={gameStatus !== 'STARTED' || gameStateIndex !== gameStates.length - 1 || side === 'SPECTATOR'}
                    over={gameStatus !== 'STARTED' && gameStateIndex === gameStates.length - 1}
                />
            )}
        </Game>
    )
}
