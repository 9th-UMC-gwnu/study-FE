import type { Movie } from "../types";
import apiClient from "./apiClient";

type TMDBResponse<T> = {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}

export async function fetchPopularMovies(page = 1): Promise<Movie[]> {
    const res = await apiClient.get<TMDBResponse<Movie>>('/movie/popular', {
        params: { page },
    })
    return res.data.results
}