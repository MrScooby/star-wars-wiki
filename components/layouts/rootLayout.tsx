'use client';

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

interface MenuElementProps {
  sidebarOpen: boolean
  href: string
  text: string
  icon: string
}

function MenuElement({ sidebarOpen, href, text, icon }: MenuElementProps) {
  return (
    <li className={`flex rounded-md p-2 cursor-pointer hover:text-gray-100 text-gray-300 text-xl items-center gap-x-4 `} >
      <Link href={href} className='flex flex-row'>
        <Image
          src={icon}
          alt="characters"
          width={30}
          height={30}
          className={`cursor-pointer ${sidebarOpen && "mr-2"}`}
        />
        <span className={`${!sidebarOpen && "hidden"} origin-left duration-200`}>
          {text}
        </span>
      </Link>
    </li>
  )
}

// TODO: find better icons
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen overflow-scroll">
      <div className={`${sidebarOpen ? "w-64" : "w-20 "} bg-sky-700 p-5 pt-8 relative duration-300`} >
        <Image
          src="/arrow-left.svg"
          alt="asd"
          width={50}
          height={50}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-sky-700 bg-white border-[5px] rounded-full  ${!sidebarOpen && "rotate-180"}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex gap-x-4 items-center">
          <Image
            src="/rebel-logo.svg"
            alt="rebel logo"
            width={50}
            height={50}
            className={`cursor-pointer duration-500 ${sidebarOpen && "rotate-[360deg]"}`}
          />
          <h1 className={`whitespace-nowrap text-white origin-left font-xs duration-200 ${!sidebarOpen && "scale-0"}`} >
            Star Wars Wiki
          </h1>
        </div>
        <ul className="pt-6">
          <MenuElement
            sidebarOpen={sidebarOpen}
            href={'/characters/'}
            icon={'/characters.svg'}
            text='CHARACTERS'
          />
          <MenuElement
            sidebarOpen={sidebarOpen}
            href={'/planets/'}
            icon={'/planets.svg'}
            text='PLANETS'
          />
          <MenuElement
            sidebarOpen={sidebarOpen}
            href={'/vehicles/'}
            icon={'/vehicles.svg'}
            text='VEHICLES'
          />
        </ul>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
