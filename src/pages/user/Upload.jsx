import { useState } from "react";
import { uploadDocument } from "../../api/documentService";

const UploadDocument = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      alert("Please enter title and choose a file");
      return;
    }

    try {
      setLoading(true);
      await uploadDocument(title, file);
      alert("Document uploaded successfully");
      setTitle("");
      setFile(null);
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Upload Document</h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Document title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        {/* File Picker */}
        <label style={styles.fileBox}>
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span style={styles.fileBtn}>Choose File</span>
          <span style={styles.fileName}>
            {file ? file.name : "No file selected"}
          </span>
        </label>

        {/* Upload Button */}
        <button style={styles.uploadBtn} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadDocument;


const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "60px",
    background: "#f8fafc",
  },

  card: {
    background: "#fff",
    width: "100%",
    maxWidth: "420px",
    padding: "28px",
    borderRadius: "14px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  heading: {
    marginBottom: "6px",
    fontSize: "22px",
    fontWeight: "600",
  },

  input: {
    padding: "12px 14px",
    fontSize: "15px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    outline: "none",
  },

  fileBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "1px dashed #cbd5f5",
    borderRadius: "10px",
    padding: "14px",
    cursor: "pointer",
  },

  fileBtn: {
    background: "#eef2ff",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },

  fileName: {
    fontSize: "14px",
    color: "#475569",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  uploadBtn: {
    marginTop: "8px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
  },
};
