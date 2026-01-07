import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { uploadToFolder } from "../../api/folderService";

import pdfIcon from "../../assets/icons/pdf.png";
import imgIcon from "../../assets/icons/image.png";
import xlIcon from "../../assets/icons/excel.png";
import fileIcon from "../../assets/icons/file.png";

export default function FolderDocuments() {
  const { folderId } = useParams();
  const navigate = useNavigate();

  const [docs, setDocs] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openMenuId, setOpenMenuId] = useState(null);
  


  /* ================= LOAD DOCUMENTS ================= */
  const loadDocs = async () => {
    try {
      const res = await api.get(
        `/documents/folders/${folderId}/documents`
      );
      setDocs(res.data);
    } catch {
      alert("Failed to load folder documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, [folderId]);

  /* ================= FILE ICON ================= */
  const getFileIcon = (title) => {
    const t = title.toLowerCase();
    if (t.endsWith(".pdf")) return pdfIcon;
    if (t.endsWith(".jpg") || t.endsWith(".png")) return imgIcon;
    if (t.endsWith(".xlsx") || t.endsWith(".xls")) return xlIcon;
    return fileIcon;
  };

  /* ================= ACTIONS ================= */

  // 🔍 VIEW (NEW TAB)
  const handleView = async (doc) => {
    const res = await api.get(
      `/documents/${doc.id}/view`,
      { responseType: "blob" }
    );

    const blob = new Blob([res.data], {
      type: res.headers["content-type"],
    });

    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setOpenMenuId(null);
  };

  // ⬇ DOWNLOAD
  const handleDownload = async (doc) => {
    const res = await api.get(
      `/documents/${doc.id}/download`,
      { responseType: "blob" }
    );

    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.title;
    a.click();
    URL.revokeObjectURL(url);
    setOpenMenuId(null);
  };

  // 🗑 DELETE
  const handleDelete = async (doc) => {
    if (!window.confirm("Delete document?")) return;

    await api.delete(`/documents/${doc.id}`);
    setDocs((prev) => prev.filter((d) => d.id !== doc.id));
    setOpenMenuId(null);
  };

  // ✏ RENAME
  // const handleRename = async () => {
  //   if (!newName.trim()) return;

  //   await api.put(`/documents/${renameDoc.id}/rename`, {
  //     title: newName,
  //   });

  //   setDocs((prev) =>
  //     prev.map((d) =>
  //       d.id === renameDoc.id ? { ...d, title: newName } : d
  //     )
  //   );

  //   setRenameDoc(null);
  //   setNewName("");
  // };

  /* ================= UPLOAD ================= */
  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    try {
      await uploadToFolder(folderId, file);
      alert("Document uploaded");
      setFile(null);
      loadDocs();
    } catch {
      alert("Upload failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h2>📂 Folder Files</h2>

      {/* ================= UPLOAD ================= */}
      <div
        style={{
          margin: "16px 0",
          padding: "12px",
          border: "1px dashed #cbd5f5",
          borderRadius: "10px",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* ================= FILE LIST ================= */}
      {docs.length === 0 ? (
        <p>No documents in this folder</p>
      ) : (
        docs.map((d) => (
          <div
            key={d.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#f8fafc",
              marginBottom: "8px",
              position: "relative",
            }}
          >
            <img
              src={getFileIcon(d.title)}
              alt="file"
              className="file-icon"
            />

            <span
              style={{ flex: 1, cursor: "pointer" }}
              onClick={() =>
                navigate(`/user/documents/${d.id}/versions`)
              }
            >
              {d.title}
            </span>

            {/* ⋮ MENU BUTTON */}
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: "18px",
                cursor: "pointer",
              }}
              onClick={() =>
                setOpenMenuId(openMenuId === d.id ? null : d.id)
              }
            >
              ⋮
            </button>

            {/* MENU */}
            {openMenuId === d.id && (
              <div
                style={{
                  position: "absolute",
                  top: "36px",
                  right: "10px",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  width: "160px",
                  zIndex: 100,
                }}
              >
                <div className="ctx-item" onClick={() => handleView(d)}>
                  👁 View
                </div>
                
                <div
                  className="ctx-item"
                  onClick={() => handleDownload(d)}
                >
                  ⬇ Download
                </div>
                <div
                  className="ctx-item danger"
                  onClick={() => handleDelete(d)}
                >
                  🗑 Delete
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
