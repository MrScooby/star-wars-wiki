'use client';

import Image from 'next/image'
import { Character } from "@/src/types/characters"
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import Spinner from '@/components/spinner';
import { Planet } from '@/src/types/planets';
import { Vehicle } from '@/src/types/vehicles';
import { Specie } from '@/src/types/species';
import ElementLink from '@/components/elementLink';
import { getIDfromUrl, getIDsFromUrls } from '@/src/utils/apiData';

export default function Character() {
  const params = useParams()
  const id = params?.id

  const [character, setCharacter] = useState<Character>()
  const [isLoading, setLoading] = useState(true)
  const [planet, setPlanet] = useState<Planet>()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [species, setSpecies] = useState<Specie[]>([])

  useEffect(() => {
    (async () => {
      setLoading(true)
      // TODO: add react-query
      const res = await fetch(`https://swapi.dev/api/people/${id}`)
      const data = await res.json()

      setCharacter(data)
      setLoading(false)
    })()
  }, [id])

  // TODO: figure out how to do it better 
  // api is quite slow and since we dont want wait for 4 request to display data
  // we display them as they return. THere should be some indicator of requests still
  // going or info when no elements found.
  useEffect(() => {
    (async () => {
      if (typeof character === "undefined" || !character.url) return

      const planetId = getIDfromUrl(character.homeworld)
      fetch(`https://swapi.dev/api/planets/${planetId}`)
        .then(async value => {
          const data = await value.json()
          setPlanet(data)
        })

      const speciesIds = getIDsFromUrls(character.species)
      const speciesTmp: Array<Specie> = []
      const speciesPromises = speciesIds.map(id => fetch(`https://swapi.dev/api/species/${id}`)
        .then(async value => {
          const data = await value.json()
          speciesTmp.push(data)
        }))
      await Promise.allSettled(speciesPromises)
      setSpecies(speciesTmp)

      const vehiclesIds = getIDsFromUrls(character.vehicles)
      const vehiclesTmp: Array<Vehicle> = []
      const vehiclesPromises = vehiclesIds.map(id => fetch(`https://swapi.dev/api/vehicles/${id}`)
        .then(async value => {
          const data = await value.json()
          vehiclesTmp.push(data)
        }))
      await Promise.allSettled(vehiclesPromises)
      setVehicles(vehiclesTmp)
    })()
  }, [character])

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  // TODO: proper error page dedicated for this page
  if (!character) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Something went wrong - no character data
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
        {character.name}
      </p>

      <p className="mt-8 text-gray-300 text-xs">
        PLANET OF ORIGIN
      </p>
      <p className="mt-1 text-xl h-8 flex justify-center">
        {planet?.name && <ElementLink key={planet?.name} href={`/planets/${getIDfromUrl(planet?.url)}`} name={planet?.name} />}
      </p>

      <p className="mt-8 text-gray-300 text-xs">
        VEHICLES
      </p>
      {/* TODO: adjust for RWD (and other lists in id pages)*/}
      <p className="mt-1 text-xl h-8 flex justify-center">
        {vehicles.map(v =>
          <ElementLink key={v.name} href={`/vehicles/${getIDfromUrl(v?.url)}`} name={v.name} />
        )}
      </p>

      <p className="mt-8 text-gray-300 text-xs">
        RACE
      </p>
      <p className="mt-1 text-xl h-8 flex justify-center">
        {species.map(s =>
          <p key={s.name} className='flex mr-2 pl-2 pr-2 justify-center items-center'>{s.name}</p>
        )}
      </p>
    </div>
  )
}
