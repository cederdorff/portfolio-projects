import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
