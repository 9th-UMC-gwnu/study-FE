import { useEffect, useState, useCallback, useMemo } from 'react'
import MoviesList from '../components/MoivesList'
import { fetchPopularMovies } from '../utils/featchPopular'
import type { Movie } from '../types'

export default function PopularMoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState<number>(1)

    const canPrev = useMemo(() => page > 1, [page])

    const load = useCallback(async (p: number) => {
        setLoading(true) // 로딩 처리
        setError(null)
        try {
            const data = await fetchPopularMovies(p) // 페이지 parameter
            console.log('[popular] page', p, data.length)
            setMovies(data)
        } catch (e) {
            setError('데이터를 불러오지 못했습니다.')
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        load(page) // page 의존
    }, [load, page])

    return (
        <section className="space-y-4">
            {/* 페이지네이션 */}
            <div className="flex items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => canPrev && setPage((n) => Math.max(1, n - 1))}
                    disabled={!canPrev}
                    className="rounded-md px-3 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-gray-200 bg-purple-300 hover:bg-green-200"
                >
                    &lt;
                </button>
                <span className="text-sm">{page} 페이지</span>
                <button
                    type="button"
                    onClick={() => setPage((n) => n + 1)}
                    className="rounded-md px-3 py-2 text-sm bg-purple-300 hover:bg-green-200"
                >
                    &gt;
                </button>
            </div>

            <div className='flex justify-center items-center'>
                {/* 로딩 스피너 */}
                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600" />
                    </div>
                ) : error ? (
                    <div className="text-red-600">{error}</div>
                ) : (

                    <MoviesList movies={movies} />
                )}
            </div>
        </section>
    )
}