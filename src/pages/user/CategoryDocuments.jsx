import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./CategoryDocuments.css";

const CategoryDocuments = () => {
  const [categoryId, setCategoryId] = useState("");
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!categoryId.trim()) {
      alert("Enter Category ID");
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`api/documents/category/${categoryId}`);
      setDocs(res.data);
    } catch{
      alert("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cat-container">
      <h2 className="cat-title">📁 Category Documents</h2>

      {/* Toolbar */}
      <div className="cat-toolbar">
        <input
          type="text"
          placeholder="Enter Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
        <button onClick={load} disabled={loading}>
          {loading ? "Loading..." : "Load"}
        </button>
      </div>

      {/* Table */}
      <div className="cat-table">
        <div className="cat-header">
          <span>Document Name</span>
          <span>Version</span>
          <span>Action</span>
        </div>

        {loading && <div className="cat-empty">Loading documents...</div>}

        {!loading && docs.length === 0 && (
          <div className="cat-empty">No documents found</div>
        )}

        {!loading &&
          docs.map((d) => (
            <div className="cat-row" key={d.id}>
              <span className="doc-name">{d.title}</span>

              <span className="doc-version">
                v{d.currentVersion}
              </span>

              <Link
                to={`/user/documents/${d.id}/versions`}
                className="cat-link"
              >
                View Versions
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryDocuments;
