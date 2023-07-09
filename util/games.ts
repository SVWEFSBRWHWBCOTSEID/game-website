import type {GameKey} from '../contexts/ProfileContext';
import type {GameFullEvent} from '../app/game/[id]/page';


export type Side = 'RANDOM' | 'FIRST' | 'SECOND';

type CreateGameBody = {
    rated: boolean,
    time?: number, // ms
    increment?: number, // ms
    // days: number,
    side: Side,
    ratingMin: number,
    ratingMax: number
}

type CreateGameResponse = Omit<GameFullEvent, 'type' | 'chat'> & {id: string} // TODO: remove cross-type reliance?

export async function createGame(
    game: GameKey,
    rating: number,
    minutes: number,
    increment: number,
    rated: boolean = true,
    timed: boolean = true, // TODO: better way of passing this?
    side: Side = 'RANDOM',
    ratingOffsetMin: number = -500,
    ratingOffsetMax: number = 500
) {
    const body: CreateGameBody = {
        rated,
        time: timed ? minutes * 60 * 1000 : undefined,
        increment: timed ? increment * 1000 : undefined,
        side,
        ratingMin: rating + ratingOffsetMin,
        ratingMax: rating + ratingOffsetMax
    }

    const res: CreateGameResponse = await (await fetch(`${process.env.API_BASE}/game/new/${game}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(body)
    })).json();

    // Revalidate cached game object
    await fetch(`/api/next/revalidate/game-${res.id}`);
    return res;
}
