import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyDocuments,
  downloadLatest,
  deleteDocument,
  viewDocument,
  shareDocument,
} from "../../api/documentService";

import {
  createFolder,
  getMyFolders,
  deleteFolder,
  downloadFolderZip,
  downloadEntireDrive,
} from "../../api/folderService";

import { getAllowedCategories } from "../../api/categoryService";

import "./Documents.css";

import pdfIcon from "../../assets/icons/pdf.png";
import imgIcon from "../../assets/icons/image.png";
import xlIcon from "../../assets/icons/excel.png";
import fileIcon from "../../assets/icons/file.png";

/* =========================
   SHARE BOX
========================= */
const ShareBox = ({ documentId }) => {
  const [userId, setUserId] = useState("");
  const [permission, setPermission] = useState("READ");
  
  const share = async () => {
    if (!userId.trim()) return alert("Enter user ID");
    await shareDocument(documentId, { userId, permission });
    alert("Document shared");
    setUserId("");
  };

  return (
    <div
      className="share-box"
      onClick={(e) => e.stopPropagation()}  // 🔥 KEY FIX
    >
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <select
        value={permission}
        onChange={(e) => setPermission(e.target.value)}
      >
        <option value="READ">READ</option>
        <option value="WRITE">WRITE</option>
      </select>

      <button onClick={share}>Share</button>
    </div>
  );
};

/* =========================
   DOCUMENTS PAGE
========================= */
const Documents = () => {
  const navigate = useNavigate();

  const [docs, setDocs] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const [openMenu, setOpenMenu] = useState(null);
  const [selectedDocs, setSelectedDocs] = useState(new Set());

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  const [starred, setStarred] = useState(
    JSON.parse(localStorage.getItem("starredDocs") || "[]")
  );
  
  useEffect(() => {
  localStorage.setItem("starredDocs", JSON.stringify(starred));
}, [starred]);

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [docRes, folderRes] = await Promise.all([
          getMyDocuments(),
          getMyFolders(),
        ]);
        setDocs(docRes.data);
        setFolders(folderRes.data);
      } catch {
        alert("Failed to load documents");
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  useEffect(() => {
    getAllowedCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    localStorage.setItem("starredDocs", JSON.stringify(starred));
  }, [starred]);

  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  /* ===== HELPERS ===== */
  const toggleStar = (id) => {
    setStarred((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelect = (id) => {
    setSelectedDocs((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  /* ===== DOCUMENT ACTIONS ===== */
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
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleDeleteSelected = async () => {
    if (!selectedDocs.size) return alert("Select documents first");
    if (!window.confirm("Delete selected documents?")) return;

    for (let id of selectedDocs) await deleteDocument(id);
    setDocs((prev) => prev.filter((d) => !selectedDocs.has(d.id)));
    setSelectedDocs(new Set());
  };

  /* ===== FOLDERS ===== */
  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    await createFolder(folderName);
    setFolderName("");
    setShowFolderModal(false);
    const res = await getMyFolders();
    setFolders(res.data);
  };

  const handleDeleteFolder = async (id) => {
    if (!window.confirm("Delete folder?")) return;
    await deleteFolder(id);
    setFolders((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDownloadFolderZip = async (folder) => {
    const res = await downloadFolderZip(folder.id);
    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${folder.name}.zip`;
    a.click();
  };

 const handleDownloadAll = async () => {
  try {
    const res = await downloadEntireDrive();
    const url = window.URL.createObjectURL(res.data);

    const a = document.createElement("a");
    a.href = url;
    a.download = "MyDrive.zip";
    a.click();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("Download failed");
    console.error(err);
  }
};


  const getFileIcon = (title) => {
    const t = title.toLowerCase();
    if (t.endsWith(".pdf")) return pdfIcon;
    if (t.endsWith(".jpg") || t.endsWith(".png")) return imgIcon;
    if (t.endsWith(".xlsx") || t.endsWith(".xls")) return xlIcon;
    return fileIcon;
  };

  /* ===== FILTER ===== */
const filteredDocs = [...docs]
  .filter((d) => {
    if (!d.title.toLowerCase().includes(search.toLowerCase())) return false;

    if (selectedCategory === "ALL") return true;

    return d.categoryId === Number(selectedCategory);
  })
  .sort((a, b) => {
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  /* ===== RENDER ===== */

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2 className="header">My Documents</h2>

      {/* ===== TOOLBAR ===== */}
      <div className="controls">
        <button onClick={() => setShowFolderModal(true)}>➕ New Folder</button>
        <button onClick={handleDownloadAll}>📦 Download All</button>
        <button onClick={handleDeleteSelected} disabled={!selectedDocs.size}>
          🗑 Delete
        </button>

        <input
          className="search"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
  <option value="name">Sort by Name</option>
  <option value="date">Sort by Date</option>
</select>

<select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="ALL">All Categories</option>

  {categories.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>

      </div>

      {/* ===== FOLDERS ===== */}
      <div className="folder-grid">
  {folders.map((f) => (
    <div
      key={f.id}
      className="folder-card"
      onClick={() => navigate(`/user/folders/${f.id}`)}
    >
      {/* ===== Top Row ===== */}
      <div className="folder-header">
        <span className="folder-icon">📁</span>

        {/* 3 DOTS */}
        <button
          className="folder-menu-btn"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu(openMenu === f.id ? null : f.id);
          }}
        >
          ⋮
        </button>

        {/* MENU */}
        {openMenu === f.id && (
          <div
            className="folder-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div onClick={() => handleDownloadFolderZip(f)}>
              Download
            </div>
            <div onClick={() => handleDeleteFolder(f.id)}>
              Delete
            </div>
          </div>
        )}
      </div>

      {/* ===== Name ===== */}
      <div className="folder-name">{f.name}</div>
    </div>
  ))}
</div>


      {/* ===== DOCUMENTS ===== */}
      <div className="documents-grid">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="doc-card">
            <div className="doc-header">
              <input
                type="checkbox"
                checked={selectedDocs.has(doc.id)}
                onChange={() => toggleSelect(doc.id)}
              />
              <span onClick={() => toggleStar(doc.id)}>
                {starred.includes(doc.id) ? "⭐" : "☆"}
              </span>

             <button
  className="menu-btn"
  onClick={(e) => {
    e.stopPropagation();
    setOpenMenu(openMenu === doc.id ? null : doc.id);
  }}
>
  ⋮
</button>


          {openMenu === doc.id && (
              <div
                className="menu"
                onClick={(e) => e.stopPropagation()}  // 🔥 IMPORTANT
           >
            <div onClick={() => handleView(doc.id)}>View</div>
            <div onClick={() => handleDownload(doc.id, doc.title)}>Download</div>
            <div onClick={() => handleDelete(doc.id)}>Delete</div>

            <ShareBox documentId={doc.id} />
          </div>
          )}


            </div>

            <div
              className="doc-icon"
              onClick={() => navigate(`/user/documents/${doc.id}/versions`)}
            >
              {/* 🔥 THIS FIXES YOUR ICON ISSUE */}
              <img
                src={getFileIcon(doc.title)}
                alt="file"
                className="file-icon"
              />
            </div>

<div
  className="doc-title"
  onClick={() => navigate(`/user/documents/${doc.id}/versions`)}
>
  {doc.title}
</div>

{/* ✅ CATEGORY (only if exists) */}
{(doc.category?.name || doc.categoryName) && (
  <div className="doc-category">
    {doc.category?.name || doc.categoryName}
  </div>
)}


          </div>
        ))}
      </div>

      {/* ===== CREATE FOLDER MODAL ===== */}
      {showFolderModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Create Folder</h3>
            <input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={handleCreateFolder}>Create</button>
            <button onClick={() => setShowFolderModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
