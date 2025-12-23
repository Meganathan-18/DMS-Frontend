import { useEffect, useState } from "react";
import { searchDocuments } from "../../api/documentService";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔄 LIVE SEARCH WITH DEBOUNCE
  useEffect(() => {
    if (!title.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await searchDocuments({
          title: title.trim(),
        });
        setResults(res.data);
      } catch {
        console.error("Search failed");
      } finally {
        setLoading(false);
      }
    }, 400); // ⏱ debounce delay

    return () => clearTimeout(timer);
  }, [title]);

  return (
    <div style={styles.container}>
      {/* 🔍 SEARCH CARD */}
      <div style={styles.searchCard}>
        <h2 style={styles.heading}>Search Documents</h2>

        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder="Start typing to search..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            autoFocus
          />
        </div>
      </div>

      {/* ⏳ Loading */}
      {loading && <p style={styles.empty}>Searching…</p>}

      {/* ❌ No results */}
      {!loading && title && results.length === 0 && (
        <p style={styles.empty}>No documents found</p>
      )}

      {/* 📄 RESULTS */}
      {results.length > 0 && (
        <div style={styles.results}>
          {results.map((doc) => (
            <div
              key={doc.id}
              style={styles.resultRow}
              onClick={() =>
                navigate(`/user/documents/${doc.id}/versions`)
              }
            >
              <div style={styles.left}>
                📄 <span style={styles.title}>{doc.title}</span>
              </div>

              <div style={styles.meta}>
                v{doc.currentVersion} ·{" "}
                {new Date(doc.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

const styles = {
  container: {
    padding: "24px",
    maxWidth: "900px",
    margin: "0 auto",
  },

  /* 🔍 Search Card */
  searchCard: {
    background: "#ffffff",
    padding: "22px 24px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    marginBottom: "20px",
  },

  heading: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "14px",
  },

  searchRow: {
    display: "flex",
    alignItems: "center",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",              // ⬅ bigger font
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
  },

  /* 📄 Results Container */
  results: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#ffffff",
  },

  resultRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "background 0.15s",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",             // ⬅ increased
  },

  title: {
    fontWeight: "500",
  },

  meta: {
    fontSize: "14px",
    color: "#64748b",
    whiteSpace: "nowrap",
  },

  empty: {
    color: "#64748b",
    padding: "10px 6px",
    fontSize: "15px",
  },
};
