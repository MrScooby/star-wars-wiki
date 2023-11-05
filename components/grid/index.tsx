import { CharactersResp } from '@/src/types/characters'
import Link from 'next/link'
import GridTile from './gridTile'
import { PlanetsResp } from '@/src/types/planets'
import { getIDfromUrl } from '@/src/utils/apiData'
import { VehiclesResp } from '@/src/types/vehicles'

interface GridProps {
    data?: CharactersResp | PlanetsResp | VehiclesResp
    page: number
    setPage: (page: number) => void
    elementType: string
}

// TODO: resize on smaller screens
export default function Grid({ data, page, setPage, elementType }: GridProps) {
    if (!data?.results.length) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                Something went wrong - nothing to display
            </div>
        )
    }

    const numberOfPages = Math.ceil(data?.count / 10)
    const pagesButtons = []

    for (let i = 0; i < numberOfPages; i++) {
        pagesButtons.push(<div
            key={i}
            className={`flex cursor-pointer m-2 bg-sky-700 rounded-full w-10 h-10 justify-center items-center 
                text-white font-bold ${page === i + 1 && 'bg-sky-900'}`}
            onClick={() => setPage(i + 1)}
        >
            {i + 1}
        </div>
        )
    }

    return (
        <div className='flex flex-col w-full h-full justify-between'>
            <div className="w-full flex flex-wrap justify-center mt-6">
                {data?.results.map((element) => {
                    const characterId = getIDfromUrl(element.url)
                    return (
                        <Link key={element.name} href={`/${elementType}/${characterId}`}>
                            <GridTile
                                name={element.name}
                                imgSrc='/avatar-placeholder.svg' // avatars are not provided by the swapi api
                            />
                        </Link>
                    )
                })}
            </div>
            <div className='mt-8 mb-8 flex justify-center'>
                {pagesButtons}
            </div>
        </div>
    )
}