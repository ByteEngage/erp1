import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
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