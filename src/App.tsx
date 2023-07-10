import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/auth/home";
import AdminPage from "./pages/admin/manager";
import ExtractPage from "./pages/auth/extract_service";
import AboutPage from "./pages/auth/about";
import HandExtractPage from "./pages/auth/extract_service_crop"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/extract" element={<HandExtractPage/>}/>
                <Route path="/extract_auto" element={<ExtractPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </div>
    );
}

export default App;
