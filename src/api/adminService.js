import api from "./axios";

export const getAllUsers = () =>
  api.get("api/admin/users");

export const blockUser = (id) =>
  api.put(`api/admin/users/${id}/block`);

export const unblockUser = (id) =>
  api.put(`api/admin/users/${id}/unblock`);

export const getAdminStats = () =>
  api.get("api/admin/dashboard");