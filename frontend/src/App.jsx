import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CursorSparkle from "./components/CursorSparkle";
import BackgroundShapes from "./components/BackgroundShapes";

function App() {
  return (
    <BrowserRouter>

      <CursorSparkle />
      <BackgroundShapes />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;