import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageProvider } from "./PageProvider";
import { MazeProvider } from "./MazeProvider";
import { ColorProvider } from "./ColorProvider";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import BuildMaze from "./pages/BuildMaze";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <main className="main-content">
        <PageProvider>
          <MazeProvider>
            <ColorProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/build-maze" element={<BuildMaze />} />
              </Routes>
            </ColorProvider>
          </MazeProvider>
        </PageProvider>
      </main>
    </Router>
  );
}

export default App;
