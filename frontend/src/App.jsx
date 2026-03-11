import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";

import CursorSparkle from "./components/CursorSparkle";
import Tasks from "./pages/Tasks";

function App() {

  return (
    <BrowserRouter>

      {/* Sparkle only on auth pages */}

      <Routes>
        <Route path="/" element={<><CursorSparkle /><Login /></>} />
        <Route path="/register" element={<><CursorSparkle /><Register /></>} />

        {/* Dashboard without sparkle */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
       <Route path="/tasks" element={<Tasks />} />
      </Routes>

    </BrowserRouter>
  );

}

export default App;