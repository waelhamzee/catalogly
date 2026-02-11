# Architecture

This document describes the architecture of Catalogly and the rationale behind key technical decisions.

## Client Architecture

### Feature-Based Structure

The frontend is organized around features rather than technical layers. Each feature is a self-contained unit that owns its API calls, UI components, validation, and business logic.

```
features/
  auth/
    api/           API client functions
    components/    Feature-specific UI
    context/       Auth state provider
    hooks/         useAuth, useLogin, useRegister, etc.
    pages/         Login, Signup
    types/         TypeScript types
    utils/         RBAC, validation helpers

  books/
    api/           books.api.ts
    components/    BookForm, BookList, BookCard, etc.
    hooks/         useBooks, useCreateBook, useGenres, etc.
    pages/         Books, BookDetail, BookCreate, BookEdit
    types/         book.types.ts
    utils/         validation, mappers, coverUrl

  home/
    components/
    pages/
```

A feature can include any of these subfolders. Not every feature needs all of them. For example, the home feature only has components and pages, while books has the full set.

This structure keeps feature code together, makes it easier to locate and change behavior, and reduces coupling between features. Adding or removing a feature does not require scattered edits across the codebase.

### React Query

React Query (TanStack Query) is used for server state management. It reduces boilerplate and centralizes caching and refetching.

**Boilerplate reduction:** Without React Query, each data fetch would need manual loading, error, and caching handling. With `useQuery` and `useMutation`, the same logic is expressed in a few lines. For example, `useBooks` uses `useInfiniteQuery` for paginated lists; React Query handles page params, loading state, and error handling.

**Caching:** React Query caches responses by query key. When the user navigates away and back, the list shows cached data immediately. Stale data is refetched in the background. This reduces duplicate requests and improves perceived performance.

**Cache invalidation:** After mutations (create, update, delete), the relevant query keys are invalidated so the UI refetches and stays in sync with the server.

### Formik and Yup

Formik manages form state and submission. Yup provides schema-based validation.

**Formik:** Form state (values, touched fields, errors) is handled by Formik instead of local `useState`. It integrates with common inputs (controlled components) and supports `onSubmit` with validation. `enableReinitialize` is used when editing existing records so the form resets when the source data changes.

**Yup:** Validation rules live in a schema separate from the form component. Schemas can be reused and composed. Yup offers built-in helpers for strings, numbers, arrays, and custom validators (e.g. ISBN format). The `bookFormSchema` defines required fields, array lengths, and custom rules for ISBN and cover count.

**Separation:** Form logic and validation are separated from UI. The form component receives `initialValues` and `validationSchema`; the schema defines the rules and error messages.

## Server Architecture

### Module Structure

The backend uses a module-based layout. Each module has a clear responsibility and typically includes:

- **model** – Sequelize model and database schema
- **routes** – Express route definitions
- **controller** – HTTP request/response handling
- **service** – Business logic

Some modules split services further (e.g. books has `book-read.service`, `book-search.service`, `book-write.service`) when the logic is large or distinct.

Shared concerns (config, middleware, utilities) live in `config/`, `middlewares/`, and `utils/`. The main `index.ts` wires routes and middleware.

### Request Flow

```
Request → Route → Controller → Service → Model
                → Response
```

Controllers parse inputs and delegate to services. Services contain business logic and use models for data access. This keeps HTTP details in controllers and business rules in services.

## Database Design

### Entities

- **users** – User accounts with encrypted PII (firstName, lastName, email, password) and role-based access
- **roles** – User roles (admin, user)
- **books** – Title, description, ISBN, optional language
- **authors** – Author names
- **genres** – Genre names
- **languages** – Language names
- **files** – S3 metadata (bucket, key, fileName, contentType)
- **book_covers** – Junction between books and files, with `isPrimary` flag
- **book_authors** – Many-to-many (books ↔ authors)
- **book_genres** – Many-to-many (books ↔ genres)

### Relationships

- Each book has one or more authors (via `book_authors`)
- Each book has one or more genres (via `book_genres`)
- Each book has one optional language
- Each book has zero or more covers; each cover links to a file via `book_covers`

Files are stored separately from books. The `files` table stores S3 metadata; `book_covers` links books to files and marks which cover is primary. This allows multiple covers per book and reuse of file metadata if needed elsewhere.

### PII Storage

Sensitive user fields (firstName, lastName, email) are encrypted at rest using AES. The `encrypt` and `decrypt` utilities are applied in Sequelize setters and getters. Passwords are hashed with bcrypt before storage.

## S3 and Presigned URLs

### Why S3

Book cover images are stored in AWS S3 instead of the server filesystem for these reasons:

- **Scalability:** S3 scales with the number of files and is designed for high throughput
- **Storage:** Avoids consuming server disk space
- **Availability:** S3 is a managed service with built-in replication and durability
- **CDN integration:** S3 can be used with CloudFront to serve images globally

### Why Presigned URLs

Uploads use presigned URLs instead of proxying files through the server.

**Flow:** The client requests a presigned URL from the API (`POST /api/files/presigned-upload` with `contentType` and `folder`). The server generates a short-lived S3 URL (10 minutes) and returns it. The client uploads the file directly to S3 with `PUT` and `Content-Type`. It then sends the book payload to the API including the S3 key for each cover.

**Benefits:**

- **No server upload bottleneck:** Server CPU and memory are not used for uploads
- **Reduced load:** File data stays between the client and S3
- **Security:** The server only exposes a temporary URL for a specific key and content type
- **Simplicity:** No multipart handling or temporary file storage on the server

The server stores only metadata (bucket, key, fileName, contentType) in the `files` table. Images are served via direct S3 URLs (or a CDN in front of S3) based on the stored key.
