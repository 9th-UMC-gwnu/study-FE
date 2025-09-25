import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import TodoPage from "./week-no/week-1/mission/mission1"

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/week1-mission1" element={<TodoPage />} />
      <Route path="/week2-mission1" element={<TodoPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

const AppNav = () => {
  return (
    <div className="flex flex-col items-center">
      <Link to="/week1-mission1">1week-mission1</Link>
      <Link to="/week2-mission1">2week-mission1</Link>
    </div>
  );
};

const HomePage = () => { // 대충 링크 페이지
  return <AppNav />;
};

function App() {

  return (
    <BrowserRouter>
        <AppRoute />
    </BrowserRouter>
  )
}

export default App
