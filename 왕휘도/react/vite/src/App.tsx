import { Route, Routes } from "react-router-dom";
import Study1Page from "./weeks/week3/study/study1";
function App() {
  return (
    <>
      <Routes>
        <Route path="/week3/study1" element={Study1Page()} />
        <Route />
        <Route />
      </Routes>
    </>
  );
}

export default App;
