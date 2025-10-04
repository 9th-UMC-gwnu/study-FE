import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import { Spinner } from "../components/Spinner";
import { useParams } from "react-router";

const token = import.meta.env.VITE_MOVIE_TOKEN as string | undefined;

/**영화 정보 타입 */
type Movie = {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
};

/**영화 API 응답 타입 */
type MoviesResponse = {
  page?: number;
  results: Movie[];
  total_results?: number;
  total_pages?: number;
};

export function ProjectApp() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가

  const params = useParams<{ category: string }>();

  useEffect(() => {
    if (!token || token === "PASTE_YOUR_API_BEARER_TOKEN_HERE") {
      const errorMsg =
        "API 토큰이 설정되지 않았습니다. 코드 상단의 token 변수를 확인해주세요.";
      setError(errorMsg);
      console.warn(errorMsg);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true); // 요청 시작 시 로딩 true
      setError(null); // 이전 에러 초기화
      try {
        const { data } = await axios.get<MoviesResponse>(
          // API URL에 currentPage를 사용하도록 수정
          `https://api.themoviedb.org/3/movie/${params.category}?language=ko-KR&page=${currentPage}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMovies(data.results ?? []);
      } catch (err) {
        const errorMsg = "Failed to fetch movies. Please check the console.";
        console.error(errorMsg, err);
        setError(errorMsg);
      } finally {
        setLoading(false); // 요청 종료 시 로딩 false
      }
    };

    fetchMovies();
  }, [currentPage, params.category]); // currentPage가 변경될 때마다 useEffect 재실행

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-red-600 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-2">오류 발생</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-10 bg-gray-50">
      {/* --- 페이지네이션 UI --- */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          이전
        </button>
        <span className="text-lg font-bold text-gray-800">{`${currentPage} 페이지`}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </div>

      {/* --- 로딩 스피너 또는 영화 목록 --- */}
      {loading ? (
        <Spinner />
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard
                img={movie.poster_path ?? ""}
                title={movie.title}
                overview={movie.overview ?? "설명이 없습니다."}
                movieId={movie.id.toString()}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
