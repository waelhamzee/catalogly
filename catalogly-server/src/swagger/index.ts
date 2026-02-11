import swaggerUi from "swagger-ui-express";
import type { Application } from "express";
import { env } from "../config/env.js";
import { schemas } from "./schemas.js";

const swaggerDocument: Record<string, unknown> = {
  openapi: "3.0.0",
  info: {
    title: "Catalogly API",
    version: "1.0.0",
    description: "Book library API for Catalogly",
  },
  servers: [
    {
      url: process.env.NODE_ENV === "development" ? `http://localhost:${env.PORT ?? 8080}` : `https://api.catalogly.com`,
      description: process.env.NODE_ENV === "development" ? "Development server" : "Production server",
    },
  ],
  components: {
    schemas,
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "access_token",
        description: "JWT token stored in cookie after login",
      },
    },
  },
  paths: {
    // ─── Auth ────────────────────────────────────────────────────────────────
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register",
        description: "Create a new user account",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "User created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/AuthResponse" },
                  },
                },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        description: "Authenticate and receive JWT (set as cookie)",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/AuthResponse" },
                  },
                },
              },
            },
          },
          "401": { description: "Invalid credentials", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout",
        description: "Clear auth cookie",
        security: [],
        responses: {
          "200": {
            description: "Logged out",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: { message: { type: "string", example: "Logged out successfully" } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    // ─── Users ───────────────────────────────────────────────────────────────
    "/api/users/me": {
      get: {
        tags: ["Users"],
        summary: "Get current user",
        security: [{ cookieAuth: [] }],
        description: "Returns the authenticated user's profile",
        responses: {
          "200": {
            description: "User profile",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/AuthUser" },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
        },
      },
    },

    // ─── Books ───────────────────────────────────────────────────────────────
    "/api/books": {
      get: {
        tags: ["Books"],
        summary: "List books",
        description: "Paginated list of books with optional search and filters",
        security: [],
        parameters: [
          { name: "q", in: "query", schema: { type: "string" }, description: "Search query" },
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 40 } },
          { name: "authorIds", in: "query", schema: { type: "string" }, description: "Comma-separated author IDs" },
          { name: "genreIds", in: "query", schema: { type: "string" }, description: "Comma-separated genre IDs" },
          { name: "languageIds", in: "query", schema: { type: "string" }, description: "Comma-separated language IDs" },
        ],
        responses: {
          "200": {
            description: "Book list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/BookListResult" },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Books"],
        summary: "Create or update book",
        description: "Create a new book or update existing (include id in body for update). Admin only.",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateBookInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Book updated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/BookListItem" },
                  },
                },
              },
            },
          },
          "201": {
            description: "Book created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/BookListItem" },
                  },
                },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
          "403": { description: "Admin required", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
        },
      },
    },
    "/api/books/by-authors": {
      get: {
        tags: ["Books"],
        summary: "Get books by authors",
        description: "Returns books grouped by author. Requires at least one author ID.",
        security: [],
        parameters: [
          { name: "authorIds", in: "query", required: true, schema: { type: "string" }, description: "Comma-separated author IDs" },
          { name: "excludeBookId", in: "query", schema: { type: "integer" }, description: "Exclude a book from results" },
        ],
        responses: {
          "200": {
            description: "Books grouped by author",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/BooksByAuthorItem" },
                    },
                  },
                },
              },
            },
          },
          "400": { description: "At least one author id required", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
        },
      },
    },
    "/api/books/{id}": {
      get: {
        tags: ["Books"],
        summary: "Get book by ID",
        description: "Returns a single book by its ID",
        security: [],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } },
        ],
        responses: {
          "200": {
            description: "Book found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/BookListItem" },
                  },
                },
              },
            },
          },
          "400": { description: "Invalid book id", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
          "404": { description: "Book not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
        },
      },
      delete: {
        tags: ["Books"],
        summary: "Delete book",
        description: "Delete a book by ID. Admin only.",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } },
        ],
        responses: {
          "200": {
            description: "Book deleted",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "400": { description: "Invalid book id", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
          "403": { description: "Admin required", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
        },
      },
    },

    // ─── Files ───────────────────────────────────────────────────────────────
    "/api/files/presigned-upload": {
      post: {
        tags: ["Files"],
        summary: "Get presigned upload URL",
        description: "Returns a pre-signed S3 URL for direct file upload. Admin only.",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PresignedUploadInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Presigned URL generated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/PresignedUploadResponse" },
                  },
                },
              },
            },
          },
          "400": { description: "Content type and folder required", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
          "403": { description: "Admin required", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
        },
      },
    },

    // ─── Genres ──────────────────────────────────────────────────────────────
    "/api/genres": {
      get: {
        tags: ["Genres"],
        summary: "List all genres",
        description: "Returns all genres",
        security: [],
        responses: {
          "200": {
            description: "Genre list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Genre" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    // ─── Languages ───────────────────────────────────────────────────────────
    "/api/languages": {
      get: {
        tags: ["Languages"],
        summary: "List all languages",
        description: "Returns all languages",
        security: [],
        responses: {
          "200": {
            description: "Language list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Language" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    // ─── Authors ──────────────────────────────────────────────────────────────
    "/api/authors/top": {
      get: {
        tags: ["Authors"],
        summary: "Get top authors",
        description: "Returns authors ordered by book count (limit 10)",
        security: [],
        responses: {
          "200": {
            description: "Top authors",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Author" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/authors/search": {
      get: {
        tags: ["Authors"],
        summary: "Search authors",
        description: "Search authors by name (case-insensitive partial match)",
        security: [],
        parameters: [
          { name: "q", in: "query", required: true, schema: { type: "string" }, description: "Search query" },
        ],
        responses: {
          "200": {
            description: "Matching authors",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Author" },
                    },
                  },
                },
              },
            },
          },
          "400": { description: "Search query required", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiErrorResponse" } } } },
        },
      },
    },
  },
};

export function setupSwagger(app: Application): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
