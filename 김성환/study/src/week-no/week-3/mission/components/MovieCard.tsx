import { memo, useState } from 'react'
import type { Movie } from '../types'
import { Link } from 'react-router-dom'

type Props = {
    movie: Movie
}

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w200'

function MovieCard({ movie }: Props) {
    const posterUrl = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : '';
    const [isHovered, setIsHovered] = useState(false);
    return (
        // 상대 경로로 받기
        <Link to={`../movies/${movie.id}`} >
            <div onMouseEnter={(): void => setIsHovered(true)}
                onMouseLeave={(): void => setIsHovered(false)}
                className='relative '>
                {/* 포스터 이미지 */}
                <img
                    src={posterUrl}
                    alt={`${movie.title} 영화의 이미지`}
                    loading="lazy"
                    className="h-full w-full object-cover transition rounded-2xl "
                />

                {/* Hover 오버레이 (제목/개요) */}
                {isHovered && (
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md text-white p-4 *:text-center rounded-2xl'>
                        <h2 className='text-lg font-bold leading-snug'>{movie.title}</h2>
                        <p className='text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5'>{movie.overview}</p>
                    </div>
                )}
            </div>
        </Link>
    )
}

export default memo(MovieCard)