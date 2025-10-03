import { memo } from 'react'
import type { Movie } from '../types'
import MovieCard from './MovieCard'

type Props = {
    movies: Movie[]
}

function MoviesList({movies}:Props) {
    return (
        <div className="grid grid-cols-5 gap-3 w-3/4">
            {movies.map((m)=>(
                <MovieCard key={m.id} movie={m} />
            ))
            }
        </div>
    )
}

export default memo(MoviesList)