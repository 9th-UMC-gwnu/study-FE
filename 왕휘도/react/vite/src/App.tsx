import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
// import PageManager from "./pages/PageManager";
import { ProjectApp } from "./weeks/week3/mission/mission1/pages/ProjectApp";
import MovieRootLayout from "./weeks/week3/mission/mission1/Layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <h1>404 Not Found</h1>,
    // 1) Navbar 아래에 표시할 자식 라우트
    children: [
      {
        // 2) index: true → 부모의 기본 경로('/')일 때 렌더
        index: true,
        element: <></>,
      },
      {
        path: "week/3/project/2/:category",
        element: <MovieRootLayout />,
        children: [{ index: true, element: <ProjectApp /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
