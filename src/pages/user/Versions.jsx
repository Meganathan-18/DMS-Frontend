import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getVersions,
  uploadNewVersion,
  downloadDocument,
} from "../../api/documentService";

const Versions = () => {
  const { documentId } = useParams();
  const [versions, setVersions] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVersions = async () => {
      try {
        const res = await getVersions(documentId);
        setVersions(res.data);
      } finally {
        setLoading(false);
      }
    };

    loadVersions();
  }, [documentId]);

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    await uploadNewVersion(documentId, file);
    setFile(null);

    // reload versions
    const res = await getVersions(documentId);
    setVersions(res.data);
  };

  const handleDownload = async (versionId) => {
    const res = await downloadDocument(documentId, versionId);
    const url = window.URL.createObjectURL(res.data);

    const a = document.createElement("a");
    a.href = url;
    a.download = "document";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  if (loading) return <p>Loading files...</p>;

  return (
    <div style={styles.container}>
      <h2>📁 Files</h2>

      <div style={styles.upload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload New Version</button>
      </div>

      {versions.length === 0 ? (
        <p>No files found</p>
      ) : (
        <div style={styles.list}>
          {versions.map((v) => (
            <div key={v.id} style={styles.fileRow}>
              <div>📄 <strong>Version {v.versionNumber}</strong></div>
              <button onClick={() => handleDownload(v.id)}>⬇ Download</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Versions;
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
  },
  upload: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  fileRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "8px",
    background: "#f8fafc",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
};