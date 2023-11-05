'use client';

import Grid from '@/components/grid'
import Spinner from '@/components/spinner'
import { VehiclesResp } from '@/src/types/vehicles';
import { useEffect, useState } from 'react'

export default function Vehicles() {
  const [vehiclesResp, setVehiclesResp] = useState<VehiclesResp>()
  const [isLoading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    (async () => {
      setLoading(true)

      // TODO: add react-query
      const res = await fetch(`https://swapi.dev/api/vehicles/?page=${page}`)
      const data = await res.json()
      setVehiclesResp(data)
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
    data={vehiclesResp}
    page={page}
    setPage={(page) => setPage(page)}
    elementType='vehicles'
  />
}
