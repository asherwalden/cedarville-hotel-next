import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

/**
 * Safe fetch — returns null if Sanity isn't configured.
 * Use: `const data = await sanityFetch<MyType>(query, params)`
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  if (!client) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await client.fetch<T>(query, params as any);
  } catch {
    return null;
  }
}
