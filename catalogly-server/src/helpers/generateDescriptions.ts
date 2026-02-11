export function generateDescriptions(count: number): string[] {
  const hooks = [
    "Set against the backdrop of a changing world,",
    "In a remote corner of an forgotten land,",
    "Behind the closed doors of high society,",
    "Deep within the silence of the ancient forest,",
  ];
  const conflicts = [
    "a long-buried secret threatens to unravel everything.",
    "a lone traveler discovers a truth that defies logic.",
    "an unexpected alliance forms between two rivals.",
    "the search for a lost legacy begins in earnest.",
  ];
  const vibes = [
    "This narrative is richly atmospheric and deeply moving.",
    "The prose is sharp, fast-paced, and utterly gripping.",
    "A profound meditation on the power of memory and choice.",
    "Lyrical and haunting, the story stays with you.",
  ];
  const summaries = [
    "It is a must-read for anyone seeking a profound journey.",
    "An unforgettable exploration of the human heart.",
    "A masterful tale that redefines its genre.",
    "Prepare to be captivated until the very last page.",
  ];

  const descriptions = [];
  for (let i = 0; i < count; i++) {
    const d = `${hooks[i % hooks.length]} ${conflicts[i % conflicts.length]} ${vibes[i % vibes.length]} ${summaries[i % summaries.length]}`;
    descriptions.push(d);
  }
  return descriptions;
}
