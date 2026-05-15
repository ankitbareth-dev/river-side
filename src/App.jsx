import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage"; // Make sure this path matches where you saved it!

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Route for Contact Page */}
        <Route path="/contact-us" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
