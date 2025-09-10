import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 80px)",
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          backgroundColor: "white",
          padding: "3rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            color: "#333",
            marginBottom: "1.5rem",
            fontSize: "2.5rem",
          }}
        >
          Davinci
        </h1>
        
        

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/users-posts"
            style={{
              display: "inline-block",
              padding: "1rem 2rem",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "1.1rem",
              transition: "all 0.2s",
              boxShadow: "0 2px 4px rgba(0,123,255,0.3)",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = "#0056b3";
              target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = "#007bff";
              target.style.transform = "translateY(0)";
            }}
          >
            Kullanıcıları ve Gönderileri Görüntüle
          </Link>
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e9ecef",
          }}
        >
          <h3 style={{ color: "#495057", marginBottom: "0.5rem" }}>Özellikler:</h3>
          <ul
            style={{
              textAlign: "left",
              color: "#6c757d",
              lineHeight: "1.8",
              margin: 0,
              paddingLeft: "1.5rem",
            }}
          >
            <li>Kullanıcı listesi görüntüleme, ekleme, düzenleme ve silme</li>
            <li>Gönderi listesi görüntüleme, ekleme, düzenleme ve silme</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;