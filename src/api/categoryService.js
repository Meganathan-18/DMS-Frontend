import api from "./axios";

/* ================= ADMIN ================= */

// create category
export const createCategory = (data) =>
  api.post("/admin/categories", data);

// list all categories (admin)
export const getAllCategories = () =>
  api.get("/admin/categories");


/* ================= USER ================= */

// list categories for user upload dropdown
export const getCategoriesForUser = () =>
  api.get("/admin/categories"); 
// (later you can expose /api/categories if needed)


export const getAllowedCategories = () => {
  return api.get("/categories/allowed");
};