import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./CategoryReports.css";

const CategoryReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/admin/reports/categories").then((res) => {
      setReports(res.data);
    });
  }, []);

  return (
    <div className="category-reports-container">
      <h2 style={{ color: "red" }}> 📊 Category Reports</h2>


      <div className="cards-grid">
        {reports.map((r) => (
          <div key={r.categoryId} className="category-card">
            <h3>📂 {r.categoryName}</h3>
            <ul className="category-stats">
              <li>
                📄 Total Docs: <span className="badge total">{r.totalDocuments}</span>
              </li>
              <li>
                🗑 Deleted: <span className="badge deleted">{r.deletedDocuments}</span>
              </li>
              <li>
                👤 Users: <span className="badge users">{r.totalUsers}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryReports;
