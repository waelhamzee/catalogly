/**
 * OpenAPI 3.0 schema definitions for Catalogly API
 */

export const schemas = {
  // ─── Core entities ─────────────────────────────────────────────────────────
  Author: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      name: { type: "string", example: "Jane Austen" },
    },
  },
  Genre: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      name: { type: "string", example: "Fiction" },
    },
  },
  Language: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      name: { type: "string", example: "English" },
    },
  },
  Role: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      name: { type: "string", example: "user" },
    },
  },
  BookCover: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      key: { type: "string", example: "covers/abc123.jpg" },
      fileName: { type: "string", example: "cover.jpg" },
      contentType: { type: "string", example: "image/jpeg" },
      isPrimary: { type: "boolean", example: true },
    },
  },
  BookListItem: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      title: { type: "string", example: "Pride and Prejudice" },
      description: { type: "string", example: "A novel of manners..." },
      isbn: { type: "string", nullable: true, example: "978-0141439518" },
      language: { $ref: "#/components/schemas/Language" },
      covers: {
        type: "array",
        items: { $ref: "#/components/schemas/BookCover" },
      },
      authors: {
        type: "array",
        items: { $ref: "#/components/schemas/Author" },
      },
      genres: {
        type: "array",
        items: { $ref: "#/components/schemas/Genre" },
      },
    },
  },

  // ─── Auth & User ────────────────────────────────────────────────────────────
  RegisterInput: {
    type: "object",
    required: ["firstName", "lastName", "email", "password"],
    properties: {
      firstName: { type: "string", example: "John" },
      lastName: { type: "string", example: "Doe" },
      email: { type: "string", format: "email", example: "john@example.com" },
      password: { type: "string", format: "password", minLength: 1 },
    },
  },
  LoginInput: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email", example: "john@example.com" },
      password: { type: "string", format: "password" },
    },
  },
  AuthUser: {
    type: "object",
    properties: {
      id: { type: "integer" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
      role: { $ref: "#/components/schemas/Role" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
  AuthResponse: {
    type: "object",
    properties: {
      token: { type: "string", description: "JWT token (also set as cookie)" },
      user: { $ref: "#/components/schemas/AuthUser" },
    },
  },

  // ─── Books ─────────────────────────────────────────────────────────────────
  BookListResult: {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: { $ref: "#/components/schemas/BookListItem" },
      },
      totalCount: { type: "integer", example: 42 },
    },
  },
  BooksByAuthorItem: {
    type: "object",
    properties: {
      author: { $ref: "#/components/schemas/Author" },
      books: {
        type: "array",
        items: { $ref: "#/components/schemas/BookListItem" },
      },
    },
  },
  CreateBookCoverInput: {
    type: "object",
    required: ["key", "fileName", "contentType"],
    properties: {
      id: { type: "integer" },
      key: { type: "string" },
      fileName: { type: "string" },
      contentType: { type: "string" },
      isPrimary: { type: "boolean", default: false },
    },
  },
  CreateBookInput: {
    type: "object",
    required: ["title", "description", "genreIds"],
    properties: {
      id: { type: "integer", description: "Include for update, omit for create" },
      title: { type: "string" },
      description: { type: "string" },
      isbn: { type: "string", nullable: true },
      languageId: { type: "integer", nullable: true },
      authorIds: { type: "array", items: { type: "integer" } },
      newAuthorNames: { type: "array", items: { type: "string" } },
      genreIds: { type: "array", items: { type: "integer" } },
      covers: {
        type: "array",
        items: { $ref: "#/components/schemas/CreateBookCoverInput" },
      },
    },
  },

  // ─── Files ─────────────────────────────────────────────────────────────────
  PresignedUploadInput: {
    type: "object",
    required: ["contentType", "folder"],
    properties: {
      contentType: { type: "string", example: "image/jpeg" },
      folder: { type: "string", example: "covers" },
    },
  },
  PresignedUploadResponse: {
    type: "object",
    properties: {
      uploadUrl: { type: "string", description: "Pre-signed URL for upload" },
      key: { type: "string", description: "S3 object key" },
    },
  },

  // ─── Generic API responses ─────────────────────────────────────────────────
  ApiSuccessResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: {},
    },
  },
  ApiErrorResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: false },
      message: { type: "string", example: "Invalid request" },
    },
  },
  MessageResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};
