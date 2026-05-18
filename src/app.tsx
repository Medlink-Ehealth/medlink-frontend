import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Login from "./pages/SignUp"
import SignIn from "./pages/LogIn"
import Dashboard from "./pages/dashboard"
import ProviderDashboard from "./pages/provider-dashboard"
import Admin from "./pages/admin"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App