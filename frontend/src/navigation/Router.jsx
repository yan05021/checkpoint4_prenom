import { Routes, Route } from "react-router-dom";
import Home from "../pages/Connection";
import Quiz from "../pages/Quiz";
import Results from "../pages/Results";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default Router;
