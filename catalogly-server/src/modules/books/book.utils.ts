export function parseAuthorIds(query: Record<string, unknown>): number[] {
  const raw = query?.authorIds;
  if (raw == null) return [];
  const arr = Array.isArray(raw) ? raw : [raw];
  return arr
    .flatMap((s) => String(s).split(","))
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isInteger(n) && n > 0);
}

export function parseGenreIds(query: Record<string, unknown>): number[] {
  const raw = query?.genreIds;
  if (raw == null) return [];
  const arr = Array.isArray(raw) ? raw : [raw];
  return arr
    .flatMap((s) => String(s).split(","))
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isInteger(n) && n > 0);
}

export function parseLanguageIds(query: Record<string, unknown>): number[] {
  const raw = query?.languageIds;
  if (raw == null) return [];
  const arr = Array.isArray(raw) ? raw : [raw];
  return arr
    .flatMap((s) => String(s).split(","))
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isInteger(n) && n > 0);
}
