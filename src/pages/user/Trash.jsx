import { useEffect, useState } from "react";
import {
  getTrash,
  restoreDocument,
  permanentDelete,
} from "../../api/documentService";
import "./Trash.css";

const Trash = () => {
  const [trash, setTrash] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadTrash = async () => {
      try {
        const res = await getTrash();
        setTrash(res.data);
      } catch {
        alert("Failed to load trash");
      } finally {
        setLoading(false);
      }
    };
    loadTrash();
  }, []);

  const daysLeft = (deletedAt) => {
    const d = new Date(deletedAt);
    d.setDate(d.getDate() + 30);
    return Math.max(
      0,
      Math.ceil((d - new Date()) / (1000 * 60 * 60 * 24))
    );
  };

  const getBadgeClass = (days) => {
    if (days <= 5) return "badge-danger";
    if (days <= 15) return "badge-warning";
    return "badge-safe";
  };

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleRestore = async (id) => {
    await restoreDocument(id);
    setTrash((prev) => prev.filter((d) => d.id !== id));
  };

  const handleDeleteSelected = async () => {
    if (
      selected.size > 0 &&
      window.confirm(`Permanently delete ${selected.size} document(s)?`)
    ) {
      for (const id of selected) {
        await permanentDelete(id);
      }
      setTrash((prev) => prev.filter((d) => !selected.has(d.id)));
      setSelected(new Set());
    }
  };

  const filteredTrash = trash.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="trash-loading">Loading trash...</div>;

  return (
    <div className="trash-container">
      {/* HEADER */}
      <div className="trash-header">
        <div>
          <h2>Trash</h2>
          <p>Items are automatically deleted after 30 days</p>
        </div>

        <div className="trash-actions">
          <input
            className="trash-search"
            placeholder="Search in trash..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="btn-danger"
            disabled={selected.size === 0}
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* LIST */}
      {filteredTrash.length === 0 ? (
        <div className="trash-empty">
          {search ? "No matching documents" : "Trash is empty"}
        </div>
      ) : (
        <div className="trash-list">
          {filteredTrash.map((doc) => {
            const days = daysLeft(doc.deletedAt);
            return (
              <div className="trash-card" key={doc.id}>
                <div className="trash-left">
                  <input
                    type="checkbox"
                    checked={selected.has(doc.id)}
                    onChange={() => toggleSelect(doc.id)}
                  />

                  <div>
                    <h4>{doc.title}</h4>

                    <div className="trash-meta">
                      Deleted{" "}
                      {new Date(doc.deletedAt).toLocaleDateString()}
                      <span className={`badge ${getBadgeClass(days)}`}>
                        ⏳ {days} days left
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="btn-restore"
                  onClick={() => handleRestore(doc.id)}
                >
                  Restore
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Trash;
