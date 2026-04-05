import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login         from "./pages/Login";
import Register      from "./pages/Register";
import Dashboard     from "./pages/Dashboard";
import Employees     from "./pages/Employees";
import Tasks         from "./pages/Tasks";
import Settings      from "./pages/Settings";
import Profile       from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Reports       from "./pages/Reports";
import CursorSparkle  from "./components/CursorSparkle";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"         element={<><CursorSparkle /><Login /></>} />
        <Route path="/register" element={<><CursorSparkle /><Register /></>} />

        {/* Protected */}
        <Route path="/dashboard"     element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/employees"     element={<ProtectedRoute><Employees /></ProtectedRoute>} />
        <Route path="/tasks"         element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/settings"      element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/profile"       element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/reports"       element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;