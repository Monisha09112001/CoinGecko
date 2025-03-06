import { useNavigate } from "react-router";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <p style={{ textAlign: "center" }}>No page found</p>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "gray",
              color: "white",
              border: "none",
              borderRadius: 5,
              padding: "2px 3px",
            }}
          >
            Back to home
          </button>
        </div>
      </section>
    </>
  );
}
