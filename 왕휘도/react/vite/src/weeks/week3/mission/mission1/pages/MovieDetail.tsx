import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { MovieDetail, MovieCredits } from "../types/type";
import { Spinner } from "../components/Spinner";

// --- UI 컴포넌트 ---
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
    <h2 className="text-2xl text-red-500 mb-4">잘못된 접근입니다.</h2>
    <p>{message}</p>
  </div>
);

// --- 메인 상세 페이지 컴포넌트 ---
export default function MovieDetailPage() {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null); // 크레딧 상태 추가
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // 공통으로 사용할 요청 헤더
      const options = {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,
        },
      };

      try {
        // 두 개의 API 요청을 동시에 보낼 Promise 배열 생성
        const detailPromise = axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-KR`,
          options
        );
        const creditsPromise = axios.get<MovieCredits>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-KR`,
          options
        );

        // Promise.all을 사용해 두 요청이 모두 완료될 때까지 기다림
        const [detailResponse, creditsResponse] = await Promise.all([
          detailPromise,
          creditsPromise,
        ]);

        // 두 요청이 모두 성공하면 상태 업데이트
        setMovieDetail(detailResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        console.error("Failed to fetch movie data:", err);
        setError(
          "데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movieDetail || !credits) {
    return (
      <div className="bg-gray-900 text-white h-screen flex justify-center items-center">
        영화 정보를 찾을 수 없습니다.
      </div>
    );
  }

  // --- 성공 시 렌더링할 JSX (상세 정보 + 크레딧 레이아웃 통합) ---

  const backdropUrl = `https://image.tmdb.org/t/p/w1280${movieDetail.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`;
  const director = credits.crew.find((member) => member.job === "Director");
  const mainCast = credits.cast.slice(0, 11); // 감독 포함 12명 표시 위해 11명 슬라이с

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* --- 영화 상세 정보 섹션 --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-1 flex justify-center">
            <img
              src={posterUrl}
              alt={`${movieDetail.title} Poster`}
              className="rounded-lg shadow-2xl w-full max-w-xs md:max-w-full"
            />
          </div>

          <div className="md:col-span-2 flex flex-col space-y-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              {movieDetail.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{movieDetail.release_date}</span>
              <span>•</span>
              <span>{`${movieDetail.runtime} min`}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {movieDetail.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-700 px-3 py-1 text-xs font-semibold rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-gray-400 italic">{movieDetail.tagline}</p>
            <div>
              <h2 className="text-xl font-bold mb-2">줄거리</h2>
              <p className="text-gray-300 leading-relaxed">
                {movieDetail.overview}
              </p>
            </div>
          </div>
        </section>

        {/* --- 크레딧 섹션 --- */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold border-l-4 border-yellow-400 pl-4 mb-8">
            주요 출연진 및 제작진
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {director && (
              <div className="flex flex-col items-center text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                  alt={director.name}
                  className="w-24 h-24 rounded-full object-cover shadow-md mb-2"
                />
                <p className="font-bold">{director.name}</p>
                <p className="text-xs text-gray-400">Director</p>
              </div>
            )}
            {mainCast.map((actor) => (
              <div
                key={actor.id}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/185x278.png?text=No+Image"
                  }
                  alt={actor.name}
                  className="w-24 h-24 rounded-full object-cover shadow-md mb-2"
                />
                <p className="font-bold">{actor.name}</p>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
