import api from "./axios";

/* ================= ADMIN ================= */

/**
 * Create a category (ADMIN only)
 * POST /api/admin/categories
 */
export const createCategory = (data) =>
  api.post("/api/admin/categories", data);

/**
 * List all categories (ADMIN only)
 * GET /api/admin/categories
 */
export const getAllCategories = () =>
  api.get("/api/admin/categories");


/* ================= USER ================= */

/**
 * List categories for user upload dropdown
 * (read-only, USER role)
 * GET /api/admin/categories
 * ⚠️ You may later expose /api/categories if needed
 */
export const getCategoriesForUser = () =>
  api.get("/api/admin/categories");

/**
 * Get allowed categories for current user
 * GET /api/categories/allowed
 */
export const getAllowedCategories = () =>
  api.get("/api/categories/allowed");
