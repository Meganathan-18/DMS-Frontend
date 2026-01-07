import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyDocuments,
  downloadLatest,
  viewDocument,
  deleteDocument,
} from "../../api/documentService";

import pdfIcon from "../../assets/icons/pdf.png";
import imgIcon from "../../assets/icons/image.png";
import xlIcon from "../../assets/icons/excel.png";
import fileIcon from "../../assets/icons/file.png";

import "./Documents.css";

const StarredDocuments = () => {
  const navigate = useNavigate();

  const [docs, setDocs] = useState([]);
  const [starredIds, setStarredIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  /* ===== LOAD STARRED DOCS ===== */
  useEffect(() => {
    const load = async () => {
      try {
        const stored = JSON.parse(
          localStorage.getItem("starredDocs") || "[]"
        );
        setStarredIds(stored);

        const res = await getMyDocuments();
        const filtered = res.data.filter((d) =>
          stored.includes(d.id)
        );

        setDocs(filtered);
      } catch (err) {
        console.error(err);
        alert("Failed to load starred documents");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ===== CLOSE MENU ON OUTSIDE CLICK ===== */
  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  /* ===== HELPERS ===== */
  const unstar = (id) => {
    const updated = starredIds.filter((x) => x !== id);
    setStarredIds(updated);
    localStorage.setItem("starredDocs", JSON.stringify(updated));
    setDocs((prev) => prev.filter((d) => d.id !== id));
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
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Move document to trash?")) return;
    await deleteDocument(id);
    unstar(id);
  };

  const getFileIcon = (title) => {
    const t = title.toLowerCase();
    if (t.endsWith(".pdf")) return pdfIcon;
    if (t.endsWith(".jpg") || t.endsWith(".png")) return imgIcon;
    if (t.endsWith(".xlsx") || t.endsWith(".xls")) return xlIcon;
    return fileIcon;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2 className="header">⭐ Starred Files</h2>

      {docs.length === 0 && (
        <p style={{ color: "#64748b" }}>
          No starred documents
        </p>
      )}

      <div className="documents-grid">
        {docs.map((doc) => (
          <div key={doc.id} className="doc-card">
            {/* ===== HEADER ===== */}
            <div className="doc-header">
              {/* UNSTAR */}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => unstar(doc.id)}
              >
                ⭐
              </span>

              {/* 3 DOT MENU */}
              <button
                className="menu-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === doc.id ? null : doc.id);
                }}
              >
                ⋮
              </button>

              {/* MENU */}
              {openMenu === doc.id && (
                <div
                  className="menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div onClick={() => handleView(doc.id)}>
                    View
                  </div>
                  <div
                    onClick={() =>
                      handleDownload(doc.id, doc.title)
                    }
                  >
                    Download
                  </div>
                  <div onClick={() => handleDelete(doc.id)}>
                    Delete
                  </div>
                </div>
              )}
            </div>

            {/* ICON */}
            <div
              className="doc-icon"
              onClick={() =>
                navigate(`/user/documents/${doc.id}/versions`)
              }
            >
              <img
                src={getFileIcon(doc.title)}
                alt="file"
                className="file-icon"
              />
            </div>

            {/* TITLE */}
            <div
              className="doc-title"
              onClick={() =>
                navigate(`/user/documents/${doc.id}/versions`)
              }
            >
              {doc.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarredDocuments;
