import TicTacToeBoard, {
    BoardStatus,
    defaultTTTBoard,
    TicTacToeGrid,
    TicTacToeRow,
    TTTBoard,
    PlayerSymbol
} from './TicTacToeBoard';


export const ANY_BOARD = -1;

export type UTTTBoard = [
    TTTBoard, TTTBoard, TTTBoard,
    TTTBoard, TTTBoard, TTTBoard,
    TTTBoard, TTTBoard, TTTBoard
];
export const defaultUTTTBoard: UTTTBoard = [
    defaultTTTBoard, defaultTTTBoard, defaultTTTBoard,
    defaultTTTBoard, defaultTTTBoard, defaultTTTBoard,
    defaultTTTBoard, defaultTTTBoard, defaultTTTBoard
];

export type UTTTBoardStatuses = [
    BoardStatus, BoardStatus, BoardStatus,
    BoardStatus, BoardStatus, BoardStatus,
    BoardStatus, BoardStatus, BoardStatus
];
export const defaultUTTTBoardStatuses: UTTTBoardStatuses = [
    BoardStatus.PLAYING, BoardStatus.PLAYING, BoardStatus.PLAYING,
    BoardStatus.PLAYING, BoardStatus.PLAYING, BoardStatus.PLAYING,
    BoardStatus.PLAYING, BoardStatus.PLAYING, BoardStatus.PLAYING
];

export type UltimateTicTacToeBoardProps = {
    gameState: UTTTBoard,
    gameStatuses: UTTTBoardStatuses,
    playerSymbol: PlayerSymbol,
    activeBoard: number,
    setSquare: (board: number, square: number) => void,
    disabled: boolean,
    over: boolean,
    rows?: number,
    columns?: number
};
export default function UltimateTicTacToeBoard(props: UltimateTicTacToeBoardProps) {
    const rows = props.rows ?? 3;
    const columns = props.columns ?? 3;

    return (
        <TicTacToeGrid disabled={props.disabled} over={props.over}>
            {Array(rows).fill(0).map((_, i) => (
                <TicTacToeRow key={i}>
                    {Array(columns).fill(0).map((_, j) => (
                        <UltimateTicTacToeCell {...props} id={columns * i + j} key={columns * i + j} />
                    ))}
                </TicTacToeRow>
            ))}
        </TicTacToeGrid>
    )
}

function UltimateTicTacToeCell(props: UltimateTicTacToeBoardProps & {id: number}) {
    const {gameState, gameStatuses, playerSymbol, activeBoard, setSquare, disabled, id} = props;

    const boardState = gameState[id];
    const boardStatus = gameStatuses[id];

    const symbol = boardStatus === BoardStatus.FIRST_VICTORY ? '✕'
        : boardStatus === BoardStatus.SECOND_VICTORY ? '◯'
        : '';

    return (
        <div className="relative p-4">
            {symbol && (
                <span className={'absolute inset-0 flex items-center justify-center z-10 text-9xl font-bold' + (symbol === '✕' ? ' text-red-400' : ' text-blue-400')}>
                    {symbol}
                </span>
            )}
            <TicTacToeBoard
                small
                boardState={boardState}
                playerSymbol={playerSymbol}
                setSquare={(square) => setSquare(id, square)}
                disabled={disabled || boardStatus !== BoardStatus.PLAYING || (activeBoard !== ANY_BOARD && id !== activeBoard)}
                over={props.over || boardStatus !== BoardStatus.PLAYING || (activeBoard !== ANY_BOARD && id !== activeBoard)}
            />
        </div>
    )
}
