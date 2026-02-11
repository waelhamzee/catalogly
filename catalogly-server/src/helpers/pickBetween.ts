import { shuffle } from "./shuffle.js";

export function pickBetween<T>(arr: T[], min: number, max: number): T[] {
  const n = min + Math.floor(Math.random() * (max - min + 1));
  return shuffle(arr).slice(0, n);
}
