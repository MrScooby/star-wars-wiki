'use client';

import Grid from '@/components/grid'
import Spinner from '@/components/spinner'
import { CharactersResp, Characters } from '@/src/types/characters'
import { useEffect, useState } from 'react'

export default function Characters() {
  const [charactersResp, setCharactersResp] = useState<CharactersResp>()
  const [isLoading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    (async () => {
      setLoading(true)

      // TODO: add react-query
      const res = await fetch(`https://swapi.dev/api/people/?page=${page}`)
      const data = await res.json()
      setCharactersResp(data)
      setLoading(false)
    })()
  }, [page])

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return <Grid
    data={charactersResp}
    page={page}
    setPage={(page) => setPage(page)}
    elementType='people'
  />
}
