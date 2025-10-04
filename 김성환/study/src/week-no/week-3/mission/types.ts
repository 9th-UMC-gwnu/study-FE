export type Movie = {
    id: number
    title?: string
    name?: string
    overview?: string
    poster_path?: string
}

// 상세 크래딧 타입
export type MovieDetail = {
    id: number
    title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    vote_average: number
    release_date?: string
    runtime?: number
}

export type Cast = {
    id: number
    name: string
    character?: string
    profile_path: string | null
    order?: number
}

export type Crew = {
    id: number
    name: string
    job?: string
    department?: string
    profile_path: string | null
}

export type Credits = {
    id: number
    cast: Cast[]
    crew: Crew[]
}

