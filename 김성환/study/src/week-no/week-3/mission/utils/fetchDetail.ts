import apiClient from './apiClient'
import type { MovieDetail, Credits } from '../types'

export async function fetchMovieDetail(movieId: string | number): Promise<MovieDetail> {
    const res = await apiClient.get<MovieDetail>(`/movie/${movieId}`)
    return res.data
}

export async function fetchMovieCredits(movieId: string | number): Promise<Credits> {
    const res = await apiClient.get<Credits>(`/movie/${movieId}/credits`)
    return res.data
}