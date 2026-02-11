export const generateTitles = (count: number) => {
  const adjectives = ["Silent", "Golden", "Hidden", "Ancient", "Last", "Forgotten", "Midnight", "Broken", "Infinite", "Crystal", "Fallen", "Eternal", "Shadowed", "Emerald", "Lost"];
  const nouns = ["City", "Dream", "Kingdom", "Echo", "Secret", "Throne", "Mirror", "Prophecy", "Night", "Valley", "Ocean", "Gate", "Star", "Flame", "Legend"];
  const suffixes = ["of Time", "of the North", "in the Dark", "of Ash", "Rising", "Falling", "Under Glass", "of Shadows", "Legacy", "Point"];

  const titles = new Set();
  while (titles.size < count) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    const structures = [
      `The ${adj} ${noun}`,
      `${noun} ${suffix}`,
      `The ${noun} of ${adj} ${noun}s`,
      `${adj} ${noun}s`
    ];
    
    titles.add(structures[Math.floor(Math.random() * structures.length)]);
  }
  return [...titles] as string[];
};