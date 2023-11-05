export type Planet = {
    name: string
    residents: Array<string>
    url: string
    population: number
}

export type Planets = Array<Planet>

export type PlanetsResp = {
    count: number
    next?: string
    previous?: string
    results: Planets
}