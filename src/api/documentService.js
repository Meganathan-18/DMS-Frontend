import api from "./axios";

/* =========================
   UPLOAD DOCUMENT
========================= */
export const uploadDocument = (title, categoryId, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);
  if (categoryId !== null) formData.append("categoryId", categoryId);

  return api.post("/api/documents/upload", formData);
};

/* =========================
   DOCUMENT LIST
========================= */
export const getMyDocuments = () =>
  api.get("/api/documents");

/* =========================
   VIEW / DOWNLOAD
========================= */
export const viewDocument = (id) =>
  api.get(`/api/documents/${id}/view`, { responseType: "blob" });

export const downloadLatest = (id) =>
  api.get(`/api/documents/${id}/download`, { responseType: "blob" });

export const downloadVersion = (docId, versionId) =>
  api.get(
    `/api/documents/${docId}/versions/${versionId}/download`,
    { responseType: "blob" }
  );

/* =========================
   VERSIONS
========================= */
export const getVersions = (docId) =>
  api.get(`/api/documents/${docId}/versions`);

export const uploadNewVersion = (docId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(`/api/documents/${docId}/versions`, formData);
};

/* =========================
   DELETE / RESTORE
========================= */
export const deleteDocument = (id) =>
  api.delete(`/api/documents/${id}`);

export const restoreDocument = (id) =>
  api.put(`/api/documents/${id}/restore`);

export const permanentDelete = (id) =>
  api.delete(`/api/documents/${id}/permanent`);

/* =========================
   TRASH
========================= */
export const getTrash = () =>
  api.get("/api/documents/trash");

/* =========================
   SEARCH
========================= */
export const searchDocuments = (params) =>
  api.get("/api/documents/search", { params });

/* =========================
   FOLDERS
========================= */
export const getDocumentsInFolder = (folderId) =>
  api.get(`/api/documents/folders/${folderId}`);

/* =========================
   SHARING
========================= */
export const shareDocument = (docId, payload) =>
  api.post(`/api/documents/${docId}/share`, payload);

export const getSharedWithMe = () =>
  api.get("/api/documents/shared-with-me");
