import Image from 'next/image'

interface GridTileProps {
    name: string
    imgSrc: string
}

// TODO: resize on smaller screens
export default function GridTile({name, imgSrc}: GridTileProps) {
    return (
        <div className="flex bg-sky-700 hover:bg-sky-400 w-64 h-64 flex flex-col justify-center items-center m-2 justify-around">
            <Image
                src={imgSrc} 
                alt="asd"
                width={50}
                height={50}
                className={`flex w-full h-[70%] opacity-50`}
            />
            <div className="">{name}</div>
        </div>
    )
}