import ForgetPassword from "./Components/Authentication/ForgetPassword";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Navbar from "./Components/Routes/Navbar";
import Home from "./Components/Routes/Home";
import Logs from "./Components/Routes/Logs";
import ChartPage from "./Components/Routes/ChartPage";
import NotFound from "./Components/Routes/NotFound";
import MainCalendar from "./Components/Calendar/MainCalendar";
import { AuthProvider } from './Components/Context/AuthContext.js';

function App() {

  return (
    <div className="App">
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset_password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Home />} />
        <Route path="/charts" element={<ChartPage />} />
        <Route path="/calendar" element={<MainCalendar />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
