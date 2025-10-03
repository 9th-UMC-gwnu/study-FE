import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
    const linkBase =
        'px-2 sm:px-3 py-1 rounded-md text-sm transition' // [added] 최소 스타일
    return (
        <div className="min-h-dvh"> {/* [added] */}
            <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b"> {/* [added] */}
                <div className="mx-auto max-w-6xl px-3 py-2 flex items-center gap-3">
                    <NavLink to="." end className={({ isActive }) => `${linkBase} ${isActive ? 'text-emerald-600' : 'text-gray-600'}`}>
                        홈
                    </NavLink>
                    <NavLink to="popular" className={({ isActive }) => `${linkBase} ${isActive ? 'text-emerald-600' : 'text-gray-600'}`}>
                        인기 영화
                    </NavLink>
                    <NavLink to="now-playing" className={({ isActive }) => `${linkBase} ${isActive ? 'text-emerald-600' : 'text-gray-600'}`}>
                        상영 중
                    </NavLink>
                    <NavLink to="top-rated" className={({ isActive }) => `${linkBase} ${isActive ? 'text-emerald-600' : 'text-gray-600'}`}>
                        평점 높은
                    </NavLink>
                    <NavLink to="upcoming" className={({ isActive }) => `${linkBase} ${isActive ? 'text-emerald-600' : 'text-gray-600'}`}>
                        개봉 예정
                    </NavLink>
                </div>
            </nav>

            <main className="mx-auto max-w-6xl px-3 py-4">
                <Outlet />
            </main>
        </div>
    )
}
