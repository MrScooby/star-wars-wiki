export type Specie = {
    name: string
    people: Array<string>
    url: string
}

export type Species = Array<Specie>

export type SpeciesResp = {
    count: number
    next?: string
    previous?: string
    results: Species
}