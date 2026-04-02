import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./assets/app.css";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/dashboard"
        element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
