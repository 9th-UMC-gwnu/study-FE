import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
/**프랍종류 */
interface Props {
  img: string;
  title: string;
  overview: string;
  movieId: string;
}

export const MovieCard = ({
  img,
  title,
  overview,
  movieId,
}: Props): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div
      className="group relative "
      onClick={() => {
        navigate(`/week/3/project/2/movie/${movieId}`);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${img}`}
        alt={title ?? "movie poster"}
        className="group-hover:scale-105 rounded-lg object-cover w-full group-hover:blur-sm transition duration-300"
        loading="lazy"
      />
      <div className="absolute group-hover:opacity-100 inset-0 opacity-0 flex justify-center items-center flex-col">
        <h4 className="text-white text-center flex text-xm font-bold mb-2">
          {title}
        </h4>
        <p className="text-zinc-300 text-sm text-center">
          {overview.substring(0, 40) + "..."}
        </p>
      </div>
    </div>
  );
};
