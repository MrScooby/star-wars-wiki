export type Character = {
    homeworld: string
    name: string
    vehicles: Array<string>
    url: string
    homeworld: string,
    vehicles: Array<atring>
    species: Array<atring>
}

export type Characters = Array<Character>

export type CharactersResp = {
    count: number
    next?: string
    previous?: string
    results: Characters
}