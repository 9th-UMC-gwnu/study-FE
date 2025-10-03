// [added] 상세 페이지 구현
import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieCredits, fetchMovieDetail } from '../utils/fetchDetail'
import type { Credits, MovieDetail } from '../types'

const IMG = {
    poster: (p?: string | null) => (p ? `https://image.tmdb.org/t/p/w500${p}` : ''),
    backdrop: (p?: string | null) => (p ? `https://image.tmdb.org/t/p/w1280${p}` : ''),
    profile: (p?: string | null) => (p ? `https://image.tmdb.org/t/p/w185${p}` : ''),
} as const

export default function MovieDetailPage() {
    const { movieId } = useParams<{ movieId: string }>() // [added]
    const [detail, setDetail] = useState<MovieDetail | null>(null) // [added]
    const [credits, setCredits] = useState<Credits | null>(null) // [added]
    const [loading, setLoading] = useState<boolean>(false) // [added]
    const [error, setError] = useState<string | null>(null) // [added]

    const load = useCallback(async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            const [d, c] = await Promise.all([ // [added] 동시 호출
                fetchMovieDetail(id),
                fetchMovieCredits(id),
            ])
            setDetail(d)
            setCredits(c)
            console.log('[detail]', d)
            console.log('[credits]', c)
        } catch (e) {
            console.error(e)
            setError('상세 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (movieId) load(movieId) // [added]
    }, [movieId, load]) // [added]

    const directors = useMemo(
        () => credits?.crew.filter((m) => m.job === 'Director') ?? [],
        [credits],
    )

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600" />
            </div>
        )
    }

    if (error) return <div className="p-4 text-red-600">{error}</div>
    if (!detail) return null

    return (
        <section className="space-y-8">
            {/* 헤더(백드롭 + 기본 정보) */}
            <div className="relative overflow-hidden rounded-2xl">
                {detail.backdrop_path && (
                    <img
                        src={IMG.backdrop(detail.backdrop_path)}
                        alt={detail.title}
                        className="w-full object-cover max-h-[320px]"
                    />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 p-4 md:p-6 flex gap-4 md:gap-6">
                    {detail.poster_path ? (
                        <img
                            src={IMG.poster(detail.poster_path)}
                            alt={detail.title}
                            className="hidden md:block h-60 rounded-lg shadow"
                        />
                    ) : null}
                    <div className="text-white max-w-3xl">
                        <h1 className="text-2xl md:text-3xl font-bold">{detail.title}</h1>
                        <p className="mt-1 text-sm opacity-80">
                            평균 {detail.vote_average?.toFixed(1)} · {detail.release_date ?? '미정'} · {detail.runtime ?? 0}분
                        </p>
                        <p className="mt-3 text-sm md:text-base leading-relaxed line-clamp-[10] md:line-clamp-none">
                            {detail.overview || '줄거리 정보가 없습니다.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* 감독/출연(크레딧) */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">감독</h2>
                <ul className="flex flex-wrap gap-4">
                    {directors.map((d) => (
                        <li key={d.id} className="w-24">
                            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                                {d.profile_path ? (
                                    <img src={IMG.profile(d.profile_path)} alt={d.name} className="h-full w-full object-cover" />
                                ) : null}
                            </div>
                            <p className="mt-2 text-center text-sm font-medium">{d.name}</p>
                            <p className="text-center text-xs text-gray-500">Director</p>
                        </li>
                    ))}
                </ul>

                <h2 className="mt-6 text-xl font-semibold">출연</h2>
                <ul className="flex flex-wrap gap-4">
                    {(credits?.cast ?? []).slice(0, 20).map((c) => (
                        <li key={c.id} className="w-24">
                            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                                {c.profile_path ? (
                                    <img src={IMG.profile(c.profile_path)} alt={c.name} className="h-full w-full object-cover" />
                                ) : null}
                            </div>
                            <p className="mt-2 text-center text-sm font-medium">{c.name}</p>
                            {c.character ? <p className="text-center text-xs text-gray-500">{c.character}</p> : null}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
