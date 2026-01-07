import api from "./axios";

/* =========================
   UPLOAD DOCUMENT
========================= */
export const uploadDocument = (title, categoryId, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);
  if (categoryId !== null) formData.append("categoryId", categoryId);
  return api.post("/documents/upload", formData);
};

/* =========================
   DOCUMENT LIST
========================= */
export const getMyDocuments = () => api.get("/documents");

/* =========================
   VIEW / DOWNLOAD (OLD + NEW)
========================= */
export const viewDocument = (id) =>
  api.get(`/documents/${id}/view`, { responseType: "blob" });

/* 🔒 OLD (KEEP THIS) */
export const downloadDocument = (documentId, versionId) => {
  if (versionId) {
    return api.get(
      `/documents/${documentId}/versions/${versionId}/download`,
      { responseType: "blob" }
    );
  }
  return api.get(`/documents/${documentId}/download`, {
    responseType: "blob",
  });
};

/* ✅ NEW (PREFERRED) */
export const downloadLatest = (documentId) =>
  api.get(`/documents/${documentId}/download`, { responseType: "blob" });

export const downloadVersion = (documentId, versionId) =>
  api.get(
    `/documents/${documentId}/versions/${versionId}/download`,
    { responseType: "blob" }
  );

/* =========================
   VERSIONS
========================= */
export const getVersions = (documentId) =>
  api.get(`/documents/${documentId}/versions`);

export const uploadNewVersion = (documentId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/documents/${documentId}/versions`, formData);
};

/* =========================
   DELETE / RESTORE
========================= */
export const deleteDocument = (id) => api.delete(`/documents/${id}`);
export const restoreDocument = (id) => api.put(`/documents/${id}/restore`);
export const permanentDelete = (id) =>
  api.delete(`/documents/${id}/permanent`);

/* =========================
   TRASH
========================= */
export const getTrash = () => api.get("/documents/trash");

/* =========================
   SEARCH
========================= */
export const searchDocuments = (params) =>
  api.get("/documents/search", { params });

/* =========================
   FOLDERS
========================= */
export const getDocumentsInFolder = (folderId) =>
  api.get(`/documents/folders/${folderId}`);

/* =========================
   SHARING
========================= */
export const shareDocument = (documentId, payload) =>
  api.post(`/documents/${documentId}/share`, payload);

export const getSharedWithMe = () =>
  api.get("/documents/shared-with-me");
