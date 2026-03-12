import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestimonialsPage from "./pages/TestimonialsPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
