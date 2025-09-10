import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage";
import UsersAndPostsPage from "./pages/UsersAndPostsPage";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          padding: "1rem 0",
          backgroundColor: "#007bff",
          color: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Link
          to="/homepage"
          style={{ 
            textDecoration: "none", 
            color: "#fff", 
            fontWeight: 600, 
            fontSize: "1.1rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            transition: "background-color 0.2s"
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = "transparent";
          }}
        >
          Home
        </Link>

        <Link
          to="/users-posts"
          style={{ 
            textDecoration: "none", 
            color: "#fff", 
            fontWeight: 600, 
            fontSize: "1.1rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            transition: "background-color 0.2s"
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = "transparent";
          }}
        >
          Users & Posts
        </Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/users-posts" element={<UsersAndPostsPage />} />
      </Routes>
    </Router>
  );
}

export default App;