export const PERMISSIONS = {
  BOOKS_CREATE: "books:create",
  BOOKS_EDIT: "books:edit",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
