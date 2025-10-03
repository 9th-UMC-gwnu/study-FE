import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/week/3/project/2", label: "홈" },
  { to: "/week/3/project/2/popular", label: "인기영화" },
  { to: "/week/3/project/2/now_playing", label: "상영 중" },
  { to: "/week/3/project/2/top_rated", label: "평점 높음" },
  { to: "/week/3/project/2/upcoming", label: "개봉 예정" },
];

export const NavBar = () => {
  return (
    <div className="flex gap-3 p-4">
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
              : "text-gray-600 hover:text-blue-600"
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};
