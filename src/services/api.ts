export function extractIdFromUrl(url: string): number {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 1], 10);
}

export function extractIdsFromUrls(urls: string[]): number[] {
  return urls.map(extractIdFromUrl);
}
