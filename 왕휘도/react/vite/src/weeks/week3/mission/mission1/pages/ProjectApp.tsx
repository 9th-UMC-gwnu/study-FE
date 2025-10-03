import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";

const token = import.meta.env.VITE_MOVIE_TOKEN as string | undefined;

type Movie = {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
};

type MoviesResponse = {
  page?: number;
  results: Movie[];
  total_results?: number;
  total_pages?: number;
};

export function ProjectApp() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("VITE_MOVIE_TOKEN is not set");
      console.warn("VITE_MOVIE_TOKEN is not set");
      return;
    }

    const fetchMovies = async () => {
      try {
        const { data } = await axios.get<MoviesResponse>(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // store the actual array of movies
        setMovies(data.results ?? []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError(String(err));
      }
    };

    fetchMovies();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="m-10">
      {movies === null ? (
        <p>Loading...</p>
      ) : movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul className="grid grid-cols-6 gap-6">
          {movies.map((m) => (
            <li key={m.id}>
              <MovieCard
                img={m.poster_path ?? ""}
                title={m.title}
                overview={m.overview ?? ""}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
