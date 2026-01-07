import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getVersions,
  uploadNewVersion,
  downloadDocument,
} from "../../api/documentService";
import "./Versions.css";

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
  <div className="versions-container">
    <h2 className="versions-title">Document Versions</h2>

    {/* Upload bar */}
    <div className="versions-upload">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload new version</button>
    </div>

    {versions.length === 0 ? (
      <div className="versions-empty">No versions found</div>
    ) : (
      <div className="versions-table">
        <div className="versions-header">
          <span>Version</span>
          <span>Uploaded At</span>
          <span></span>
        </div>

        {versions.map((v) => (
          <div key={v.id} className="versions-row">
            <span className="ver-no">v{v.versionNumber}</span>

            <span className="ver-date">
              {new Date(v.uploadedAt).toLocaleString()}
            </span>

            <button
              className="download-btn"
              onClick={() => handleDownload(v.id)}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default Versions;
