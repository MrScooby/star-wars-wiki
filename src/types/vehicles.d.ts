export type Vehicle = {
    name: string
    pilots: Array<string>
    url: string
    vehicle_class: string
}

export type Vehicles = Array<Vehicle>

export type VehiclesResp = {
    count: number
    next?: string
    previous?: string
    results: Vehicles
}