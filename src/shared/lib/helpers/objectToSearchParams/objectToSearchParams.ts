export const objectToSearchParams = <T extends Partial<Record<string, any>>>(params: T): URLSearchParams => {
  const entries = Object.entries(params)
    .filter(([_, v]) => v !== undefined && typeof v !== 'boolean')
    .map(([k, v]) => [k, String(v)]);

  return new URLSearchParams(entries);
};
