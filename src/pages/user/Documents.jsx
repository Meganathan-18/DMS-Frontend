import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyDocuments,
  downloadLatest,
  deleteDocument,
  viewDocument,
} from "../../api/documentService";
import "./Documents.css";

const Documents = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [starred, setStarred] = useState(
    JSON.parse(localStorage.getItem("starredDocs") || "[]")
  );
  const [openMenu, setOpenMenu] = useState(null);
  const [sortBy, setSortBy] = useState("name");

  const navigate = useNavigate();

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    localStorage.setItem("starredDocs", JSON.stringify(starred));
  }, [starred]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-wrap")) setOpenMenu(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const loadDocuments = async () => {
    try {
      const res = await getMyDocuments();
      setDocs(res.data);
    } catch {
      alert("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Helpers ---------- */

  const toggleStar = (id) => {
    setStarred((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getFileType = (title) => {
    const t = title.toLowerCase();
    if (t.endsWith(".pdf")) return { label: "PDF", cls: "pdf" };
    if (t.endsWith(".doc") || t.endsWith(".docx"))
      return { label: "DOC", cls: "doc" };
    if (t.endsWith(".jpg") || t.endsWith(".jpeg") || t.endsWith(".png"))
      return { label: "IMG", cls: "img" };
    return { label: "FILE", cls: "file" };
  };

  const formatFileName = (title) => {
    const t = title.toLowerCase();
    if (
      t.endsWith(".pdf") ||
      t.endsWith(".doc") ||
      t.endsWith(".docx") ||
      t.endsWith(".jpg") ||
      t.endsWith(".jpeg") ||
      t.endsWith(".png")
    )
      return title;
    return `${title}.doc`;
  };

  const handleView = async (id) => {
    const res = await viewDocument(id);
    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    window.open(URL.createObjectURL(blob), "_blank");
  };

  const handleDownload = async (id, title) => {
    const res = await downloadLatest(id);
    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = formatFileName(title);
    a.click();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Move document to trash?")) return;
    await deleteDocument(id);
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleRename = (id, currentTitle) => {
    const newTitle = window.prompt("Enter new name", currentTitle);
    if (!newTitle || newTitle === currentTitle) return;
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, title: newTitle } : d))
    );
  };

  if (loading) return <p className="loading">Loading...</p>;

  const filteredDocs = docs
    .filter((d) => d.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const starDiff = starred.includes(b.id) - starred.includes(a.id);
      if (starDiff !== 0) return starDiff;

      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "date")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div className="container">
      <h2 className="header">My Documents</h2>

      {/* Toolbar */}
      <div className="controls">
        <input
          className="search"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Created Date</option>
        </select>
      </div>

      {/* List */}
      <div className="list">
        {filteredDocs.length === 0 && (
          <div className="no-docs">No documents found</div>
        )}

        {filteredDocs.map((doc) => {
          const isStarred = starred.includes(doc.id);
          const type = getFileType(doc.title);

          return (
            <div
              key={doc.id}
              className={`row-card ${isStarred ? "starred" : ""}`}
            >
              <div className="left-section">
                <span
                  className={`star ${isStarred ? "starred" : ""}`}
                  onClick={() => toggleStar(doc.id)}
                >
                  {isStarred ? "⭐" : "☆"}
                </span>

                <span className={`file-badge ${type.cls}`}>
                  {type.label}
                </span>

                <div
                  className="title"
                  title={formatFileName(doc.title)}
                  onClick={() =>
                    navigate(`/user/documents/${doc.id}/versions`)
                  }
                >
                  {formatFileName(doc.title)}
                </div>
              </div>

              <div className="meta">
                <span>v{doc.currentVersion}</span>
                <span className="dot">·</span>
                <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="menu-wrap">
                <button
                  className="menu-btn"
                  onClick={() =>
                    setOpenMenu(openMenu === doc.id ? null : doc.id)
                  }
                >
                  ⋮
                </button>

                {openMenu === doc.id && (
                  <div className="menu">
                    <div className="menu-item" onClick={() => handleView(doc.id)}>
                      👁 View
                    </div>
                    <div
                      className="menu-item"
                      onClick={() => handleDownload(doc.id, doc.title)}
                    >
                      ⬇ Download
                    </div>
                    <div
                      className="menu-item"
                      onClick={() => handleRename(doc.id, doc.title)}
                    >
                      ✏ Rename
                    </div>
                    <div
                      className="menu-item-danger"
                      onClick={() => handleDelete(doc.id)}
                    >
                      🗑 Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Documents;
