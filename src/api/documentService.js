import api from "./axios";

export const uploadDocument = (title, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);

  return api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMyDocuments = () => {
  return api.get("/documents");
};

export const downloadDocument = (documentId, versionId) => {
  return api.get(
    `/documents/${documentId}/versions/${versionId}/download`,
    { responseType: "blob" }
  );
};
// 📄 Versions
export const getVersions = (documentId) => {
  return api.get(`/documents/${documentId}/versions`);
};

export const uploadNewVersion = (documentId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(`/documents/${documentId}/versions`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 🗑 Delete (Soft delete)
// export const deleteDocument = (documentId) => {
//   return api.delete(`/documents/${documentId}`);
// };

// // ♻ Restore
// export const restoreDocument = (documentId) => {
//   return api.put(`/documents/${documentId}/restore`);
// };

// // 🗑 Trash
// export const getTrash = () => {
//   return api.get("/documents/trash");
// };

// 🔍 Search
// export const searchDocuments = (params) => {
//   return api.get("/documents/search", { params });
// };
export const advancedSearchDocuments = (data) => {
  return api.post("/documents/search/advanced", data);
}   

export const downloadLatest = (documentId) => {
  return api.get(`/documents/${documentId}/download`, {
    responseType: "blob",
  });
};

export const searchDocuments = (params) => {
  return api.get("/documents/search", { params });
};


export const deleteDocument = (id) =>
  api.delete(`/documents/${id}`);

export const getTrash = () =>
  api.get("/documents/trash");

export const restoreDocument = (id) =>
  api.put(`/documents/${id}/restore`);


// view latest version (inline)
export const viewDocument = (documentId) =>
  api.get(`/documents/${documentId}/view`, {
    responseType: "blob",
  });

export const permanentDelete = (id) =>
  api.delete(`/documents/${id}/permanent`);
