'use client'

import {ReactNode, useState} from 'react';
import {Listbox} from '@headlessui/react';

// Components
import CenteredModal from '../../components/CenteredModal';
import AnimatedListbox from '../../components/AnimatedListbox';
import SecondarySlider from '../../components/SecondarySlider';

// Util
import {games} from './QuickPairing';


type CreateGameModalProps = {isOpen: boolean, setIsOpen: (open: boolean) => void, game?: typeof games[0]};
export default function CreateGameModal(props: CreateGameModalProps) {
    const [game, setGame] = useState(props.game ?? games[0]);
    const [rated, setRated] = useState(true);

    const [timed, setTimed] = useState(true);
    const [minutes, setMinutes] = useState(9);
    const [increment, setIncrement] = useState(5);

    return (
        <CenteredModal
            isOpen={props.isOpen}
            setIsOpen={props.setIsOpen}
            className="relative flex flex-col bg-content rounded-md w-[26rem] max-h-[90%] mx-2 shadow-xl overflow-clip"
        >
            <section className="px-8 pt-6 pb-4">
                <h1 className="text-2xl text-center mb-6">Create a game</h1>

                <ModalDropdown title="Game" selected={game.name} value={game} onChange={setGame}>
                    {games.map((game) => (
                        <ModalDropdownItem value={game}>{game.name}</ModalDropdownItem>
                    ))}
                </ModalDropdown>
            </section>

            <section className="bg-content-secondary border-y border-tertiary px-8 py-3">
                <ModalDropdown title="Time control" selected={timed ? 'Real time' : 'Unlimited'} value={timed} onChange={setTimed}>
                    <ModalDropdownItem value={true}>Real time</ModalDropdownItem>
                    <ModalDropdownItem value={false}>Unlimited</ModalDropdownItem>
                </ModalDropdown>

                {timed && (
                    <div className="mt-2.5 text-center text-secondary">
                        {/* TODO: monospace */}
                        <p className="mb-1">Minutes per side: <strong>{parseMinutes(minutes)}</strong></p>
                        <SecondarySlider
                            value={minutes}
                            onChange={setMinutes}
                            min={0}
                            max={38}
                        />

                        {/* TODO: monospace */}
                        <p className="mt-2 mb-1">Increment in seconds: <strong>{parseIncrement(increment)}</strong></p>
                        <SecondarySlider
                            value={increment}
                            onChange={setIncrement}
                            min={0}
                            max={30}
                        />
                    </div>
                )}
            </section>

            <section className="px-8 py-6 flex justify-center">
                <button onClick={() => setRated(false)} className={'px-12 py-2 rounded-l shadow-lg ' + (!rated ? 'bg-theme-green' : 'bg-content-secondary text-secondary')}>
                    Casual
                </button>
                <button onClick={() => setRated(true)} className={'px-12 py-2 rounded-r shadow-lg ' + (rated ? 'bg-theme-green' : 'bg-content-secondary text-secondary')}>
                    Rated
                </button>
            </section>

            <section className="bg-content-secondary border-y border-tertiary px-8 py-3 text-secondary text-sm text-center">
                Rating range
                {/* TODO: sliders */}
            </section>

            <section className="px-8 py-4 text-sm text-secondary text-center">
                Rating: <strong>1337</strong> {game.name}
            </section>
        </CenteredModal>
    )
}

type ModalDropdownProps<T> = {title: string, selected: string, value: T, onChange: (value: T) => void, children: ReactNode}
function ModalDropdown<T>(props: ModalDropdownProps<T>) {
    return (
        <Listbox value={props.value} onChange={props.onChange} as="div" className="flex gap-3 text-secondary items-center justify-center">
            <Listbox.Label className="w-24 text-right">{props.title}</Listbox.Label>

            <div className="relative">
                <Listbox.Button className="font-semibold text-left w-56 px-4 py-2 bg-content-tertiary rounded border border-tertiary">
                    {props.selected}
                </Listbox.Button>
                <AnimatedListbox className="absolute top-[calc(100%_+_6px)] w-48 flex flex-col py-1.5 bg-content-tertiary rounded shadow-lg z-10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/25">
                    {props.children}
                </AnimatedListbox>
            </div>
        </Listbox>
    )
}

function ModalDropdownItem<T>(props: {value: T, children: ReactNode}) {
    return (
        <Listbox.Option value={props.value} className="cursor-pointer px-4 py-1 hover:!bg-blue-500 hover:text-white ui-selected:bg-background">
            {props.children}
        </Listbox.Option>
    )
}

/**
 * Converts slider ticks to the actual game time.
 *
 * Between [0, 4], each tick increases the game time by 0.25 minutes. (i : [0, 1])
 * Between (4, 6], each tick increases the game time by 0.5 minutes. (i : (1, 2]
 * Between (6, 24], each tick increases the game time by 1 minute. (i : (2, 20])
 * Between (24, 29], each tick increases the game time by 5 minutes. (i : (20, 45])
 * Between (29, 38], each tick increases the game time by 15 minutes. (i : (45, 180])
 *
 * @param ticks The value of the game time slider.
 * @returns The game time, in minutes.
 */
function parseMinutes(ticks: number) {
    if (ticks <= 4) return ticks * 0.25;
    if (ticks <= 6) return 1 + (ticks - 4) * 0.5;
    if (ticks <= 24) return ticks - 4;

    if (ticks <= 29) return 20 + (ticks - 24) * 5;
    return 45 + (ticks - 29) * 15;
}

/**
 * Converts slider ticks to the actual game increment.
 *
 * Between [0, 20], each tick increases the increment by 1 second. (i : [0, 20])
 * Between (20, 25], each tick increases the increment by 5 seconds. (i : (20, 45]
 * Between (25, 26], each tick increases the increment by 15 seconds. (i = 60)
 * Between (26, 30], each tick increases the increment by 30 seconds. (i : (60, 180])
 *
 * @param ticks The value of the increment slider.
 * @returns The increment, in seconds.
 */
function parseIncrement(ticks: number) {
    if (ticks <= 20) return ticks;
    if (ticks <= 25) return 20 + (ticks - 20) * 5;
    if (ticks == 26) return 45 + (ticks - 25) * 15;
    return 60 + (ticks - 26) * 30;
}