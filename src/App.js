import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Project from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import CreateProject from "./pages/CreateProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/create-project" element={<CreateProject />} />
      </Routes>
    </Router>
  );
}

export default App;
