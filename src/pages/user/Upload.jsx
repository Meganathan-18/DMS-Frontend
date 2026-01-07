import { useState, useEffect } from "react";
import { uploadDocument } from "../../api/documentService";
import api from "../../api/axios";
import "./Upload.css";

/* ===== Helpers ===== */
const getFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileType = (name) => {
  const t = name.toLowerCase();
  if (t.endsWith(".pdf")) return { label: "PDF", color: "#dc2626" };
  if (t.endsWith(".doc") || t.endsWith(".docx"))
    return { label: "DOC", color: "#2563eb" };
  if (t.endsWith(".jpg") || t.endsWith(".jpeg") || t.endsWith(".png"))
    return { label: "IMG", color: "#16a34a" };
  return { label: "FILE", color: "#64748b" };
};

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("/categories/allowed");
        setCategories(res.data);
      } catch {
        alert("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  const handleFilePick = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!files.length) return alert("Select at least one file");

    try {
      setLoading(true);
      for (const file of files) {
        await uploadDocument(title || file.name, categoryId, file);
      }
      alert("Upload successful");
      setFiles([]);
      setTitle("");
      setCategoryId(null);
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      {/* ❄ BACKGROUND BUBBLES (ADDED ONLY) */}
      <div className="upload-bubble-bg">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* 📦 YOUR EXISTING CARD (UNCHANGED) */}
      <div className="upload-card">
        <h2 className="upload-title">☁️ Upload Files</h2>

        <input
          className="upload-input"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="upload-input"
          value={categoryId ?? ""}
          onChange={(e) =>
            setCategoryId(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">📂 No Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id} disabled={c.permission === "READ"}>
              {c.name} {c.permission === "READ" ? "🔒 Read only" : ""}
            </option>
          ))}
        </select>

        {/* DROP ZONE (UNCHANGED) */}
        <label className="upload-drop">
          <div className="drop-inner">
            <div className="cloud-icon">☁️</div>
            <p className="drop-title">Drop your files here</p>
            <span className="drop-or">
              or <strong>browse</strong>
            </span>
          </div>

          <input
            type="file"
            multiple
            onChange={handleFilePick}
            className="file-hidden"
          />
        </label>

        {/* FILE LIST (UNCHANGED) */}
        {files.length > 0 && (
          <div className="file-list">
            {files.map((file, index) => {
              const type = getFileType(file.name);
              return (
                <div className="file-row" key={index}>
                  <span
                    className="file-badge"
                    style={{ color: type.color, borderColor: type.color }}
                  >
                    {type.label}
                  </span>

                  <div className="file-meta">
                    <p>{file.name}</p>
                    <span>{getFileSize(file.size)}</span>
                  </div>

                  <button
                    className="remove-file"
                    onClick={() => removeFile(index)}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default Upload;
