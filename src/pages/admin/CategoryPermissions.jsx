import { useState } from "react";
import api from "../../api/axios";
import "./CategoryPermissions.css";

const CategoryPermissions = () => {
  const [categoryId, setCategoryId] = useState("");
  const [userId, setUserId] = useState("");
  const [permission, setPermission] = useState("READ");
  const [loading, setLoading] = useState(false);

  const assign = async () => {
    if (!categoryId || !userId) {
      alert("Category ID and User ID are required");
      return;
    }

    try {
      setLoading(true);
      await api.post(
        `api/admin/category-permissions?categoryId=${categoryId}&userId=${userId}&permission=${permission}`
      );
      alert("✅ Permission assigned successfully");
      setCategoryId("");
      setUserId("");
      setPermission("READ");
    } catch (err) {
      alert("❌ Failed: " + (err.response?.data?.message || err.response?.status));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="permission-page">
      <div className="permission-card">
        <h2>🔐 Category Permissions</h2>
        <p>Assign read or write access to users for specific categories</p>

        <div className="form-group">
          <label>Category ID</label>
          <input
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="Enter category ID"
          />
        </div>

        <div className="form-group">
          <label>User ID</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
          />
        </div>

        <div className="form-group">
          <label>Permission</label>
          <select
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          >
            <option value="READ">Read</option>
            <option value="WRITE">Write</option>
          </select>
        </div>

        <button onClick={assign} disabled={loading}>
          {loading ? "Assigning..." : "Assign Permission"}
        </button>
      </div>
    </div>
  );
};

export default CategoryPermissions;
