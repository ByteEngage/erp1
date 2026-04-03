import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./assets/app.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT → Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* LOGIN */}
        <Route
          path="/sign-in"
          element={
            token ? <Navigate to="/" replace /> : <Login />
          }
        />

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={
            token ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;