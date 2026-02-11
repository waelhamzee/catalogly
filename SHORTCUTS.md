# Shortcuts

This document describes shortcuts taken for this take-home challenge and how they would be addressed in production.

## Email Verification

**What was skipped:** Users can register and immediately log in. There is no email verification step.

**Typical production approach:**

1. **Database schema:** Add an `email_verified` boolean (default `false`) and a `verification_token` column (nullable, with index) to the users table. Optionally add `verification_token_expires_at` for expiry.

2. **Registration flow:** On signup, generate a random token (e.g. UUID or crypto-random bytes), store it with an expiry (e.g. 1 hour), and send an email containing a link like `https://yourapp.com/verify-email?token=...`. Do not issue a session token or jwt token yet. Return a message instructing the user to check their email.

3. **Verification endpoint:** A GET or POST route (e.g. `/api/auth/verify-email`) accepts the token. Look up the user by token, check that it has not expired, set `email_verified = true`, clear `verification_token` and `verification_token_expires_at`, then optionally issue a session token or redirect to login.

4. **Login:** If `email_verified` is false, reject login and prompt the user to verify or trigger a resend.

5. **Resend:** A separate endpoint to resend the verification email, throttled (e.g. once per 60 seconds per email) to prevent abuse.

6. **Email service:** Use a transactional email provider (SendGrid, AWS SES, Resend, etc.) with templates for verification and resend.

## Icons and Logo

**What was skipped:** A custom logo and favicon. The app uses Material UI's `AutoStoriesIcon` as a placeholder.

**Production approach:** Commission or design a logo, export SVG and PNG variants. Add a favicon (multiple sizes for different devices), update `index.html` with appropriate `link` tags, and replace the icon in the header with the real logo asset.

## Password Reset

**What was skipped:** Users cannot reset a forgotten password.

**Production approach:** Implement a flow similar to email verification: a "forgot password" form sends an email with a token link; a reset endpoint validates the token and allows setting a new password; tokens expire (1 hour) and are single-use.

## Rate Limiting

**What was skipped:** No rate limiting on auth or API endpoints.

**Production approach:** Add rate limiting (e.g. express-rate-limit or a reverse proxy) on login, registration, and password reset to reduce brute-force and abuse risk.

## Admin Seed Credentials

**What was done:** The admin user in `seed-admin.ts` uses hardcoded credentials (email, password) for demonstration.

**Production approach:** Admin credentials should not be hardcoded. Use environment variables or a secure provisioning process.

## Other Notes

- **Tests:** No automated tests. Production would include unit tests for services and integration tests for critical flows.
- **Error messages:** Login returns a generic "Invalid credentials" to avoid revealing whether an email exists. This is intentional; production would maintain that practice.
- **Secrets in dev:** Default values for JWT_SECRET and ENCRYPTION_KEY in development. Production must use strong, unique secrets from environment variables only.
