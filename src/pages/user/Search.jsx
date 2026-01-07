import { useEffect, useState } from "react";
import { searchDocuments } from "../../api/documentService";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* 🔄 LIVE SEARCH WITH DEBOUNCE */
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
    }, 400);

    return () => clearTimeout(timer);
  }, [title]);

  return (
    <div className="search-page">
      {/* 🌈 Animated Background */}
      <div className="bubble-bg">
        <span /><span /><span /><span /><span /><span />
      </div>

      <div className="search-container">
        {/* 🔍 Search Card */}
        <div className="search-card">
          <h2 className="heading">Search Documents</h2>
          <input
            type="text"
            placeholder="Search by document title…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="search-input"
            autoFocus
          />
        </div>

        {/* ⏳ Loading */}
        {loading && <p className="empty">Searching documents…</p>}

        {/* ❌ Empty */}
        {!loading && title && results.length === 0 && (
          <p className="empty">No documents found</p>
        )}

        {/* 📄 RESULTS */}
        {results.length > 0 && (
          <div className="result-grid">
            {results.map((doc) => (
              <div
                key={doc.id}
                className="result-card"
                onClick={() =>
                  navigate(`/user/documents/${doc.id}/versions`)
                }
              >
                <div className="file-icon">📄</div>

                <div className="file-info">
                  <div className="file-title">{doc.title}</div>
                  <div className="file-meta">
                    Version {doc.currentVersion} ·{" "}
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="open-hint">Open →</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
