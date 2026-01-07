import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyFolders,
  createFolder,
  deleteFolder,
  downloadFolderZip,
} from "../../api/folderService";
import "./Folder.css";

export default function Folders() {
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchFolders = async () => {
      try {
        const res = await getMyFolders();
        if (isMounted) setFolders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFolders();
    return () => (isMounted = false);
  }, []);

  const reload = async () => {
    const res = await getMyFolders();
    setFolders(res.data);
  };

  const handleCreate = async () => {
    const name = prompt("Folder name");
    if (!name) return;
    await createFolder(name);
    reload();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Move folder to trash?")) return;
    await deleteFolder(id);
    reload();
  };

  const handleDownload = async (id, name) => {
    const res = await downloadFolderZip(id);
    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="folder-header">
        <h2 className="header">📁 My Folders</h2>
        <button className="create-btn" onClick={handleCreate}>
          ➕ New Folder
        </button>
      </div>

      {/* Folder list */}
      <div className="folder-list">
        {folders.length === 0 && (
          <div className="no-docs">No folders found</div>
        )}

        {folders.map((f) => (
          <div key={f.id} className="row-card folder-row">
            {/* Left */}
            <div
              className="folder-left"
              onClick={() => navigate(`/user/folders/${f.id}`)}
            >
              <span className="folder-icon">📁</span>
              <span className="title">{f.name}</span>
            </div>

            {/* Actions */}
            <div className="folder-actions">
              <button
                className="icon-btn"
                title="Download ZIP"
                onClick={() => handleDownload(f.id, f.name)}
              >
                ⬇
              </button>

              <button
                className="icon-btn danger"
                title="Delete Folder"
                onClick={() => handleDelete(f.id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
