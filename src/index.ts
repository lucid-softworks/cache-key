export type CacheKeyPart =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;

function encodePart(part: CacheKeyPart): string {
  if (part === null) return "null";
  if (part === undefined) return "undefined";
  if (typeof part === "number")
    return `number:${Object.is(part, -0) ? "-0" : String(part)}`;
  return `${typeof part}:${encodeURIComponent(String(part))}`;
}

export function createCacheKey(
  namespace: string,
  parts: readonly CacheKeyPart[],
): string {
  if (namespace.length === 0)
    throw new TypeError("cache key namespace cannot be empty");
  return `${encodeURIComponent(namespace)}:${parts.map(encodePart).join("|")}`;
}
