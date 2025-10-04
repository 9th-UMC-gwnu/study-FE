import axios from 'axios'

// TMDB 기본 URL과 인증 정보
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL ?? 'https://api.themoviedb.org/3'
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER

// api_key 쿼리 파라미터 기본값 (Bearer 없는 경우)
const defaultParams = TMDB_API_KEY ? { api_key: TMDB_API_KEY, language: 'ko-KR' } : { language: 'ko-KR' }

const apiClient = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        Accept: 'application/json',
        ...(TMDB_BEARER ? { Authorization: `Bearer ${TMDB_BEARER}` } : {}),
    },
    withCredentials: false,
    params: defaultParams,
    timeout: 10000,
})

export default apiClient