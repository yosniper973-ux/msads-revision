function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .replace(/s$/, '');
}

export function matchKeywords(input: string, keywords: string[]): boolean {
  const normalizedInput = normalize(input);
  const words = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\s+/);

  let matched = 0;
  for (const kw of keywords) {
    const normalizedKw = normalize(kw);
    if (
      normalizedInput.includes(normalizedKw) ||
      words.some(w => normalize(w) === normalizedKw)
    ) {
      matched++;
    }
  }
  return matched >= Math.ceil(keywords.length * 0.6);
}

export function matchFillBlank(input: string, expected: string): boolean {
  return normalize(input) === normalize(expected);
}
