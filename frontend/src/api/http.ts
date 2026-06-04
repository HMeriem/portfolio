export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly responseBody: string,
  ) {
    super(`HTTP ${status} ${statusText}`);
    this.name = 'HttpError';
  }
}

export class NetworkError extends Error {
  constructor(public readonly cause: unknown) {
    super('Network request failed — check your connection');
    this.name = 'NetworkError';
  }
}

export type HttpBody = object;

export async function post(url: string, body: HttpBody): Promise<void> {
  let res: Response;

  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (cause) {
    const err = new NetworkError(cause);
    console.error('[api] Network error', { url, cause });
    throw err;
  }

  if (!res.ok) {
    const responseBody = await res.text().catch(() => '');
    const err = new HttpError(res.status, res.statusText, responseBody);
    console.error('[api] Request failed', {
      url,
      status: res.status,
      statusText: res.statusText,
      responseBody,
    });
    throw err;
  }
}
