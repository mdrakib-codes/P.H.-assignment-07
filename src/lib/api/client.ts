export async function fetchApi(
  endpoint: string,
  signal?: AbortSignal,
): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(endpoint, { cache: "no-store", signal });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new Error("Could not connect to the BazarDor API.", { cause: error });
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch (error) {
    throw new Error("The BazarDor API returned invalid JSON.", { cause: error });
  }

  if (!response.ok) {
    const errorMessage =
      payload !== null &&
      typeof payload === "object" &&
      "error" in payload &&
      typeof payload.error === "string"
        ? payload.error
        : `BazarDor API request failed with status ${response.status}.`;
    throw new Error(errorMessage);
  }

  if (
    payload !== null &&
    typeof payload === "object" &&
    "success" in payload &&
    payload.success === false
  ) {
    throw new Error("The BazarDor API reported an unsuccessful response.");
  }

  return payload;
}

export function unwrapData(value: unknown): unknown {
  let result = value;
  const keys = ["products", "categories", "product", "category", "data", "result"];

  for (let depth = 0; depth < 5; depth += 1) {
    if (result === null || typeof result !== "object" || Array.isArray(result)) {
      return result;
    }

    const record = result as Record<string, unknown>;
    const key = keys.find((candidate) => record[candidate] !== undefined);

    if (!key) {
      return result;
    }

    result = record[key];
  }

  return result;
}

export function readArray(value: unknown, resource: string): unknown[] {
  const data = unwrapData(value);

  if (!Array.isArray(data)) {
    throw new Error(`The BazarDor API returned an invalid ${resource} list.`);
  }

  return data;
}

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function finiteNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}
