'use client';

import Image from 'next/image'
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import Spinner from '@/components/spinner';
import { Planet } from '@/src/types/planets';
import ElementLink from '@/components/elementLink';
import { Character } from '@/src/types/characters';
import { getIDfromUrl, getIDsFromUrls } from '@/src/utils/apiData';

export default function Planet() {
  const params = useParams()
  const id = params?.id

  const [planet, setPlanet] = useState<Planet>()
  const [isLoading, setLoading] = useState(true)
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    (async () => {
      setLoading(true)
      // TODO: add react-query
      const res = await fetch(`https://swapi.dev/api/planets/${id}`)
      const data = await res.json()

      setPlanet(data)
      setLoading(false)
    })()
  }, [id])

  useEffect(() => {
    (async () => {
      if (typeof planet === "undefined" || !planet.url) return

      const charactersIds = getIDsFromUrls(planet.residents)
      const charactersTmp: Array<Character> = []
      const promises = charactersIds.map(id => fetch(`https://swapi.dev/api/people/${id}`)
        .then(async value => {
          const data = await value.json()
          charactersTmp.push(data)
        }))

      await Promise.allSettled(promises)

      setCharacters(charactersTmp)
    })()
  }, [planet])

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  // TODO: proper error page dedicated for this page
  if (!planet) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Something went wrong - no planet data
      </div>
    )
  }

  return (
    <div className="w-full h-fill flex flex-col justify-center items-center p-8">
      <Image
        src="/avatar-placeholder.svg" // avatar is not provided by the swapi api
        alt="avatar"
        width={220}
        height={220}
      />

      <p className="mt-8 text-gray-300 text-xs">
        NAME
      </p>
      <p className="mt-1 text-xl h-8 flex justify-center">
        {planet.name}
      </p>

      <p className="mt-8 text-gray-300 text-xs">
        POPULATION
      </p>
      <p className="mt-1 text-xl h-8 flex justify-center">
        {planet.population}
      </p>

      <p className="mt-8 text-gray-300 text-xs">
        CHARACTERS
      </p>
      <p className="mt-1 text-xl h-8 flex justify-center">
        {characters.map(v =>
          <ElementLink key={v.name} href={`/characters/${getIDfromUrl(v?.url)}`} name={v.name} />
        )}
      </p>

    </div>
  )
}
