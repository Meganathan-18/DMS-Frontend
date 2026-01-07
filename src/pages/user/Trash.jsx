import { useEffect, useState } from "react";
import {
  getTrash,
  restoreDocument,
  permanentDelete,
} from "../../api/documentService";
import {
  restoreFolder,
  permanentDeleteFolder,
} from "../../api/folderService";
import "./Trash.css";

const Trash = () => {
  const [trash, setTrash] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* ===== Load Trash Data ===== */
  useEffect(() => {
    const loadTrash = async () => {
      try {
        const res = await getTrash();
        setTrash(res.data);
      } catch {
        alert("Failed to load trash items");
      } finally {
        setLoading(false);
      }
    };
    loadTrash();
  }, []);

  /* ===== Calculation Helpers ===== */
  const daysLeft = (deletedAt) => {
    const d = new Date(deletedAt);
    d.setDate(d.getDate() + 30);
    return Math.max(0, Math.ceil((d - new Date()) / (1000 * 60 * 60 * 24)));
  };

  /* ===== Selection Logic ===== */
  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === filteredTrash.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredTrash.map((item) => item.id)));
    }
  };

  const filteredTrash = trash.filter((item) =>
    (item.title || item.name).toLowerCase().includes(search.toLowerCase())
  );

  /* ===== Action Handlers ===== */
  const handleRestore = async (item) => {
    try {
      if (item.type === "FOLDER") {
        await restoreFolder(item.id);
      } else {
        await restoreDocument(item.id);
      }
      setTrash((prev) => prev.filter((t) => t.id !== item.id));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    } catch {
      alert("Restore failed");
    }
  };

 <div className="trash-live-bg">
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
</div>


  const handleEmptyTrash = async () => {
    if (selected.size === 0) return;
    if (!window.confirm("Permanently delete selected items?")) return;
    try {
      for (const id of selected) {
        const item = trash.find((t) => t.id === id);
        if (item.type === "FOLDER") await permanentDeleteFolder(id);
        else await permanentDelete(id);
      }
      setTrash((prev) => prev.filter((t) => !selected.has(t.id)));
      setSelected(new Set());
    } catch {
      alert("Permanent delete failed");
    }
  };

  if (loading) return <div className="trash-loading">Loading trash...</div>;

  return (
    <div className="trash-container">
      <div className="trash-live-bg">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
      {/* Header Section */}
      <div className="trash-header">
        <div className="header-left">
          <h1>Trash</h1>
          <p>Items are automatically deleted after 30 days</p>
        </div>

        <div className="header-right">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search in trash..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="header-actions">
            <label className="select-all-label">
              <input
                type="checkbox"
                checked={selected.size > 0 && selected.size === filteredTrash.length}
                onChange={toggleSelectAll}
              />
              Select All
            </label>
            {/* <button 
              className="btn-restore-bulk" 
              onClick={handleBulkRestore} 
              disabled={selected.size === 0}
            >
              Restore
            </button> */}
            <button
              className="btn-empty"
              disabled={selected.size === 0}
              onClick={handleEmptyTrash}
            >
              Empty Trash
            </button>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      {filteredTrash.length === 0 ? (
        <div className="trash-empty">
          {search ? "No matching items found" : "Your trash is empty"}
        </div>
      ) : (
        <div className="trash-grid">
          {filteredTrash.map((item) => {
            const days = daysLeft(item.deletedAt);
            const isSelected = selected.has(item.id);
            const cardColorClass = item.type === "FOLDER" ? "card-orange" : "card-blue";

            return (
              <div key={item.id} className={`trash-card ${cardColorClass}`}>
                <input
                  type="checkbox"
                  className="card-checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(item.id)}
                />

                <div className="card-content">
                  <div className="file-icon-wrapper">
                    {item.type === "FOLDER" ? "📁" : "📄"}
                  </div>
                  <h3 title={item.title || item.name}>
                    {item.title || item.name}
                  </h3>
                  <p className="item-date">
                    Deleted: {new Date(item.deletedAt).toLocaleDateString()}
                  </p>
                  <div className="days-left-pill">{days} days left</div>
                  <button
                    className="btn-card-restore"
                    onClick={() => handleRestore(item)}
                  >
                    Restore
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Trash;