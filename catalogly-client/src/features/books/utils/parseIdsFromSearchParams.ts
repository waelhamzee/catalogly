export function parseIdsFromSearchParams(
  searchParams: URLSearchParams,
  key: "authorIds" | "genreIds" | "languageIds",
): number[] {
  const value = searchParams.get(key);
  if (value == null || value === "") return [];
  return value
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isInteger(n) && n > 0);
}
