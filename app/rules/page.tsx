import StickySidebar from '../../components/StickySidebar';
import {Metadata} from 'next';
import SectionHeader from '../../components/SectionHeader';


export const metadata: Metadata = {
    title: 'Game rules'
}

export default function Rules() {
    return (
        <div className="container flex gap-10 pt-4 pb-12">
            <StickySidebar>
                <h3 className="font-medium text-lg mb-3">Table of contents</h3>
                <ul className="list-disc list-outside pl-8 flex flex-col gap-1 mb-3">
                    <li>
                        <a href="#ttt" className="hover:underline">Tic-Tac-Toe</a>
                    </li>
                    <li>
                        <a href="#uttt" className="hover:underline">Ultimate Tic-Tac-Toe</a>
                    </li>
                    <li>
                        <a href="#connect-4" className="hover:underline">Connect 4</a>
                    </li>
                    <li>
                        <a href="#pokemon-chess" className="hover:underline">Pokemon Chess</a>
                    </li>
                </ul>
            </StickySidebar>
            <div className="py-4">
                <SectionHeader id="ttt">Tic-Tac-Toe</SectionHeader>
                <p className="mb-10">[...]</p>

                <SectionHeader id="uttt">Ultimate Tic-Tac-Toe</SectionHeader>
                <p className="mb-10">[...]</p>

                <SectionHeader id="connect-4">Connect 4</SectionHeader>
                <p className="mb-10">[...]</p>

                <SectionHeader id="pokemon-chess">Pokemon Chess</SectionHeader>
                <p className="mb-4">Inspired by <a href="https://pokemonchess.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">pokemonchess.com</a>.</p>
                <p className="mb-4">
                    Pokemon chess is like chess, except at the start of the game each player secretly assigns each piece
                    a unique <a href="https://pokemondb.net/type" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Pokemon type</a>.
                    When a piece attempts to capture another piece, the following happens based on the type matchup between
                    the two pieces:
                </p>
                <ul className="list-disc list-outside pl-6 flex flex-col gap-1 mb-4">
                    <li>
                        If the capturing piece is <strong>normally effective</strong> against the piece being captured,
                        the piece is taken like in regular chess.
                    </li>
                    <li>
                        If the capturing piece is <strong>super effective</strong> against the piece being captured, the
                        capturing piece gets to make an extra move after this one.
                    </li>
                    <li>
                        If the capturing piece is <strong>not very effective</strong> against the piece being captured,
                        both pieces are captured instead.
                    </li>
                    <li>
                        If the capturing piece has <strong>no effect</strong> against the piece being captured, nothing
                        happens and your turn ends.
                    </li>
                </ul>
                <p className="mb-4">
                    There is no concept of check in Pokemon chess, as the king may be immune to certain pieces depending
                    on their type<sup>1</sup>. Instead, the game is won by capturing the opponent's king.
                </p>
                <p className="mb-6">
                    For additional fun, a capture has a 1/10 chance to become a "miss" or a 1/16 chance to become a
                    "critical hit". If the capture is a miss, the move has no effect regardless of type matchups (nothing
                    happens, and the turn is over). If the capture is a critical hit, the move is super effective regardless
                    of type matchups (the capturing piece may make an extra move after this one).
                </p>
                <p className="text-sm text-secondary mb-2">
                    <sup>1</sup> Consequently, the king is not prevented from castling through, into, or out of check.
                </p>
                <p className="text-sm text-secondary">
                    See also: <a href="https://www.reddit.com/r/PokemonChess/comments/12jaqu7/a_starter_guide_to_pokemon_chess/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Reddit post explaining Pokemon chess</a>
                </p>
            </div>
        </div>
    )
}