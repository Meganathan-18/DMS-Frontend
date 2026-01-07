import { useEffect, useState } from "react";
import {
  getSharedWithMe,
  viewDocument,
  downloadLatest,
} from "../../api/documentService";
import "./SharedWithMe.css"; // ✅ ADD THIS LINE

const SharedWithMe = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShared();
  }, []);

  const loadShared = async () => {
    try {
      const res = await getSharedWithMe();
      setDocs(res.data);
    } catch {
      alert("Failed to load shared documents");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id) => {
    const res = await viewDocument(id);
    const blob = new Blob([res.data], {
      type: res.headers["content-type"],
    });
    window.open(URL.createObjectURL(blob), "_blank");
  };

  const handleDownload = async (id, title) => {
    const res = await downloadLatest(id);
    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = title;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p>Loading shared documents...</p>;

  return (
    <div className="shared-page">
      {/* ❄ SNOW BUBBLES BACKGROUND (ADD ONLY) */}
      <div className="shared-bubble-bg">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* 🔒 EXISTING UI (UNCHANGED) */}
      <div style={styles.container}>
        <h2 style={styles.title}>🤝 Shared With Me</h2>

        {docs.length === 0 && (
          <div style={styles.empty}>No documents shared with you</div>
        )}

        <div style={styles.list}>
          {docs.map((doc) => (
            <div key={doc.id} style={styles.row}>
              <div>
                <div style={styles.docTitle}>{doc.title}</div>
                <div style={styles.meta}>
                  Current Version: v{doc.currentVersion}
                </div>
              </div>

              <div style={styles.actions}>
                <button
                  style={styles.viewBtn}
                  onClick={() => handleView(doc.id)}
                >
                  View
                </button>

                <button
                  style={styles.downloadBtn}
                  onClick={() =>
                    handleDownload(doc.id, doc.title)
                  }
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharedWithMe;

/* ===== EXISTING STYLES (UNCHANGED) ===== */
const styles = {
  container: {
    padding: 28,
    maxWidth: 1000,
    margin: "auto",
    background: "#f8fafc",
    borderRadius: 14,
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: "#0f172a",
    marginBottom: 20,
  },
  empty: {
    textAlign: "center",
    color: "#94a3b8",
    padding: 40,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    background: "#ffffff",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
  },
  docTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#0f172a",
  },
  meta: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
  },
  actions: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  viewBtn: {
    padding: "6px 12px",
    fontSize: 13,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#f8fafc",
    cursor: "pointer",
  },
  downloadBtn: {
    padding: "6px 12px",
    fontSize: 13,
    borderRadius: 8,
    border: "1px solid #dbeafe",
    background: "#eef2ff",
    color: "#1e40af",
    cursor: "pointer",
    fontWeight: 500,
  },
};
