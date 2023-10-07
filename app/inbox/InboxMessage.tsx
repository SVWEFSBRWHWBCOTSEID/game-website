import {useContext} from 'react';
import Link from 'next/link';
import {DateTime} from 'luxon';
import ProfileImagePlaceholder from '../../components/ProfileImagePlaceholder';
import CurrentTimeContext from '../../contexts/CurrentTimeContext';


export type Message = {
    username: string,
    text: string,
    createdAt: string // SQL date
}
export default function InboxMessage(props: Message) {
    const currDate = useContext(CurrentTimeContext);
    const messageDate = DateTime.fromSQL(props.createdAt);

    // Display "Yesterday at {...}" or "Today at {...}" if the message was recent,
    // defaulting to "10/26/2023 {...}" otherwise.
    const relativeStr = currDate.diff(messageDate, 'days').days < 2
        ? capitalize(messageDate.toRelativeCalendar({base: currDate})!) + ' at'
        : messageDate.toLocaleString(DateTime.DATE_SHORT)

    return (
        <div className="px-6 py-3 flex gap-4">
            {false ? (
                // TODO
                <img
                    src="/pfp.png"
                    className="w-14 h-14 rounded-full object-cover object-center"
                    alt={props.username}
                />
            ) : (
                <ProfileImagePlaceholder
                    name={props.username}
                    className="w-14 h-14 text-3xl"
                />
            )}
            <div className="flex-grow">
                <h5 className="flex justify-between items-center font-medium mb-1.5">
                    <Link href={`/profile/${props.username}`} className="hover:underline">
                        {props.username}
                    </Link>
                    <span className="text-xs font-normal text-secondary cursor-default">
                        {relativeStr} {messageDate.toLocaleString(DateTime.TIME_SIMPLE)}
                    </span>
                </h5>
                <p className="text-sm text-primary">
                    {props.text}
                </p>
            </div>
        </div>
    )
}

// TODO: move this?
function capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
}