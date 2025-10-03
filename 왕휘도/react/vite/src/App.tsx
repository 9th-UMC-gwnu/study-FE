import Study1Page from "./weeks/week3/study/study1";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";

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
        path: "week/:weekId/project/:projectId", //주소 별로 주차 및 미션, 예제 학습 관리
        element: <Study1Page />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
