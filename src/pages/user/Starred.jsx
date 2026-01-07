import { useMemo } from "react";
import "./Starred.css"; // 🔴 REQUIRED

const Starred = ({ docs, folders, starredDocs, starredFolders }) => {
  const starredDocuments = useMemo(
    () => docs.filter((d) => starredDocs.has(d.id)),
    [docs, starredDocs]
  );

  const starredFolderList = useMemo(
    () => folders.filter((f) => starredFolders.has(f.id)),
    [folders, starredFolders]
  );

  return (
    <div className="starred-page">
      {/* ❄ SNOW BACKGROUND */}
      <div className="starred-bubble-bg">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* ===== YOUR EXISTING UI ===== */}
      <h2>⭐ Starred</h2>

      {starredFolderList.length > 0 && (
        <>
          <h3>Folders</h3>
          <div className="grid">
            {starredFolderList.map((f) => (
              <div key={f.id} className="folder-card">
                📁 {f.name}
              </div>
            ))}
          </div>
        </>
      )}

      {starredDocuments.length > 0 && (
        <>
          <h3>Documents</h3>
          <div className="grid">
            {starredDocuments.map((d) => (
              <div key={d.id} className="doc-card">
                📄 {d.title}
              </div>
            ))}
          </div>
        </>
      )}

      {starredDocuments.length === 0 &&
        starredFolderList.length === 0 && <p>No starred items</p>}
    </div>
  );
};

export default Starred;
