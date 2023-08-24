import {ReactNode} from 'react';

export default function Layout(props: {children: ReactNode}) {
    return (
        <main className="flex flex-col-reverse lg:flex-row gap-8 items-center px-4 md:px-12 pt-4 pb-12 max-w-[1642px] w-full mx-auto">
            {props.children}
        </main>
    )
}
