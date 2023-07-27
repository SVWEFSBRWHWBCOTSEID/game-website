'use client'

import {useContext, useLayoutEffect, useRef, useState} from 'react';
import Link from 'next/link';
import GameContext from '../../contexts/GameContext';

// Util
import {isSpectator} from './[id]/TicTacToeGame';
import type {ChatMessageEvent} from './[id]/page';


export type ChatMessage = Omit<ChatMessageEvent, 'type'>

export default function Chat() {
    const {id, username, info, chat} = useContext(GameContext);

    const [message, setMessage] = useState('');

    const chatRef = useRef<HTMLDivElement>(null);
    const prevScrollHeight = useRef(0);

    // Automatically scroll the chat to bottom if a new message is received and the chat was previously
    // scrolled to bottom
    useLayoutEffect(() => {
        if (!chatRef.current) return;

        const prevMaxScrollHeight = prevScrollHeight.current - chatRef.current.offsetHeight;
        if (chatRef.current.scrollTop === prevMaxScrollHeight) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.offsetHeight
        }

        prevScrollHeight.current = chatRef.current.scrollHeight;
    }, [chat])

    async function sendChatMessage() {
        const visibility = isSpectator(username, info) ? 'SPECTATOR' : 'PLAYER';

        await fetch(`${process.env.API_BASE}/game/${id}/chat/${visibility}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({message})
        });
        setMessage('');
    }

    return (
        <div className="flex-none text-sm rounded flex flex-col overflow-clip shadow-lg">
            <div ref={chatRef} className="px-3 py-2 break-words bg-content h-[30rem] x flex-col gap-2 overflow-auto scrollbar:w-1.5 scrollbar:bg-black/10 scrollbar-thumb:bg-tertiary">
                {chat.map((message, i) => (
                    <ChatMessage {...message} key={message.text + message.username + i} />
                ))}
            </div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                placeholder="Please be nice in the chat!"
                className="px-2 py-1 bg-content border-t border-tertiary focus:outline-none focus:border-blue-500 placeholder:text-secondary"
            />
        </div>
    )
}

function ChatMessage(props: ChatMessage) {
    return (
        <div>
            <Link
                href={`/profile/${props.username}`}
                className="font-medium text-secondary hover:text-blue-500"
            >
                {props.username}:
            </Link>
            {'  '}
            {props.text}
        </div>
    )
}
