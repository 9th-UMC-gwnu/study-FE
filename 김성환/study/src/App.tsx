import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import TodoPage from "./week-no/week-1/mission/mission1"
import TodoPage2 from "./week-no/week-2/mission/mission1";
import { ThemeProvider } from "./week-no/week-2/mission/mission2/ThemeContext";

import { Layout, MovieDetailPage, MovieHomePage, PopularMoviesPage, NowPlayingPage, TopRatedPage, UpcomingPage } from "./week-no/week-3/mission";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/week1-mission1" element={<TodoPage />} />
      <Route path="/week2-mission1" element={<TodoPage2 />} />
      <Route path="/week3-mission/MoviePage" element={<Layout />}>
        <Route index element={<MovieHomePage />} />
        <Route path="popular" element={<PopularMoviesPage />} />
        <Route path="now-playing" element={<NowPlayingPage />} />
        <Route path="top-rated" element={<TopRatedPage />} />
        <Route path="upcoming" element={<UpcomingPage />} />
        <Route path="movies/:movieId" element={<MovieDetailPage />} />
      </Route>

      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

const AppNav = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link to="/week1-mission1" className="linkStyle">1week-mission1</Link>
      <Link to="/week2-mission1" className="linkStyle">2week-mission1</Link>
      <Link to="/week3-mission/MoviePage" className="linkStyle">3week-mission</Link>
    </div>
  );
};

const HomePage = () => { // 대충 링크 페이지
  return <AppNav />;
};

function App() {

  return (
    // 다크 모드 주입 Context
    <ThemeProvider>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
