import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";


function App() {
  return (
    <HashRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</HashRouter>
  );
}

export default App;