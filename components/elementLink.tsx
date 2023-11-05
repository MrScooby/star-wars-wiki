import Link from 'next/link'

interface ElementLinkProps {
    href: string
    name: string
}

export default function ElementLink({ href, name }: ElementLinkProps) {
    return (
        <Link key={name} href={href}
            className='flex mr-2 pl-2 pr-2 justify-center items-center duration-300 hover:scale-125'>
            <span className='flex justify-center p-2'>{name}</span>
        </Link>
    )
}