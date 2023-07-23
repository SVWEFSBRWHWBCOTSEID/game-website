'use client'

import {ReactNode, useEffect} from 'react';


export type TTTSymbol = '✕' | '◯' | '';
export type TTTBoard = [
    TTTSymbol, TTTSymbol, TTTSymbol,
    TTTSymbol, TTTSymbol, TTTSymbol,
    TTTSymbol, TTTSymbol, TTTSymbol
];
export const defaultTTTBoard: TTTBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
];

export enum BoardStatus {
    PLAYING, TIED, X_VICTORY, O_VICTORY
}

type TicTacToeBoardProps = {
    boardState: TTTBoard,
    playerSymbol: TTTSymbol,
    setSquare: (square: number, symbol: TTTSymbol) => void,
    small?: boolean,
    disabled: boolean,
    over: boolean
};
export default function TicTacToeBoard(props: TicTacToeBoardProps) {
    const {small, disabled, over} = props;

    return (
        <TicTacToeGrid disabled={disabled} over={over} small={small}>
            {TTTIndices.map(row => (
                <TicTacToeRow small={small} key={row.join()}>
                    {row.map(id => (
                        <TicTacToeCell {...props} id={id} key={id} />
                    ))}
                </TicTacToeRow>
            ))}
        </TicTacToeGrid>
    )
}

export function TicTacToeGrid(props: {children: ReactNode, small?: boolean, disabled: boolean, over: boolean}) {
    return (
        <div className={'flex flex-col divide-white/30 transition-opacity duration-500 ' + (props.small ? 'divide-y-4' : 'divide-y-8') + (props.over ? ' opacity-30' : '')}>
            {props.children}
        </div>
    )
}

export function TicTacToeRow(props: {children: ReactNode, small?: boolean,}) {
    return (
        <div className={'flex divide-white/30 ' + (props.small ? 'divide-x-4' : 'divide-x-8')}>
            {props.children}
        </div>
    )
}

function TicTacToeCell(props: TicTacToeBoardProps & {id: number}) {
    const {boardState, playerSymbol, setSquare, small, disabled, id} = props;

    const symbol = boardState[id]; // The actual state of the cell
    const displaySymbol = symbol || playerSymbol; // The symbol to display in the <span>

    return (
        <button
            className={'group font-bold text-center box-content ' + (small ? 'w-16 h-16 text-3xl ' : 'w-36 h-36 text-7xl ') + (displaySymbol === '✕' ? 'text-red-400' : 'text-blue-400')}
            disabled={disabled || !!symbol} // TODO: disable the button if it's not the player's move
            onClick={() => setSquare(id, playerSymbol)}
        >
            <span className={(small ? 'p-4' : 'p-8') + (!symbol ? ' opacity-0 hover:opacity-50 group-disabled:opacity-0' : '')}>
                {displaySymbol}
            </span>
        </button>
    )
}

export const TTTIndices = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];
