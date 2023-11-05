'use client';

import Grid from '@/components/grid'
import Spinner from '@/components/spinner'
import { PlanetsResp } from '@/src/types/planets';
import { useEffect, useState } from 'react'

export default function Planets() {
  const [planetsResp, setPlanetsResp] = useState<PlanetsResp>()
  const [isLoading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    (async () => {
      setLoading(true)

      const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
      const data = await res.json()
      setPlanetsResp(data)
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
    data={planetsResp}
    page={page}
    setPage={(page) => setPage(page)}
    elementType='planets'
  />
}
