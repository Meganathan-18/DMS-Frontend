import api from "./axios";

/* 📁 Create Folder */
export const createFolder = (name) => {
  return api.post("api/folders", null, {
    params: { name },
  });
};

/* 📁 Get My Folders */
export const getMyFolders = () => {
  return api.get("api/folders");
};

/* 🗑 Delete Folder */
export const deleteFolder = (id) => {
  return api.delete(`api/folders/${id}`);
};
/* 🗑 Move to Folder */
export const getFolderTrash = () =>
  api.get("api/folders/trash");

/* ♻ Restore Folder */
export const restoreFolder = (id) => {
  return api.put(`api/folders/${id}/restore`);
};

/* ⬇ Download Folder as ZIP */
export const downloadFolderZip = (id) =>
  api.get(`api/folders/${id}/download`, {
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
  api.get("api/folders/download/all", {
    responseType: "blob",
  });


// export const permanentDeleteFolder = (id) =>
//   api.delete(`/folders/${id}/permanent`);

export const permanentDeleteFolder = (id) =>
  api.delete(`api/folders/${id}/permanent`);
