import api from "./axios";

/* 📁 Create Folder */
export const createFolder = (name) => {
  return api.post("/folders", null, {
    params: { name },
  });
};

/* 📁 Get My Folders */
export const getMyFolders = () => {
  return api.get("/folders");
};

/* 🗑 Delete Folder */
export const deleteFolder = (id) => {
  return api.delete(`/folders/${id}`);
};
/* 🗑 Move to Folder */
export const getFolderTrash = () =>
  api.get("/folders/trash");

/* ♻ Restore Folder */
export const restoreFolder = (id) => {
  return api.put(`/folders/${id}/restore`);
};

/* ⬇ Download Folder as ZIP */
export const downloadFolderZip = (id) =>
  api.get(`/folders/${id}/download`, {
    responseType: "blob",
  });

/* 🔼 Upload document INTO folder */
export const uploadToFolder = (folderId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(
    `/documents/folders/${folderId}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const downloadEntireDrive = () =>
  api.get("/folders/download/all", {
    responseType: "blob",
  });


// export const permanentDeleteFolder = (id) =>
//   api.delete(`/folders/${id}/permanent`);

export const permanentDeleteFolder = (id) =>
  api.delete(`/folders/${id}/permanent`);
