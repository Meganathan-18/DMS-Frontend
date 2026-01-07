import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/categories");
      setCategories(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const create = async () => {
    if (!name.trim()) return;

    try {
      await api.post("/admin/categories", { name });
      setName("");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create category");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="category-container">
      <div className="category-card">
        <h2 className="title">📂 Manage Categories</h2>
        <p className="subtitle">
          Create and manage enterprise document categories
        </p>

        {/* Create */}
        <div className="create-row">
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={create}>Create</button>
        </div>

        {/* States */}
        {loading && <p className="info">Loading categories...</p>}
        {error && <p className="error">{error}</p>}

        {/* List */}
        <ul className="category-list">
          {categories.map((c) => (
            <li key={c.id}>
              <span>{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
