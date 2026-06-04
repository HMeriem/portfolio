import { post, HttpError, NetworkError } from './http';

describe('HttpError', () => {
  it('has name HttpError', () => {
    const err = new HttpError(404, 'Not Found', 'body');
    expect(err.name).toBe('HttpError');
  });

  it('stores status, statusText, and responseBody', () => {
    const err = new HttpError(400, 'Bad Request', 'some body');
    expect(err.status).toBe(400);
    expect(err.statusText).toBe('Bad Request');
    expect(err.responseBody).toBe('some body');
  });

  it('extends Error', () => {
    expect(new HttpError(500, 'Error', '')).toBeInstanceOf(Error);
  });
});

describe('NetworkError', () => {
  it('has name NetworkError', () => {
    const err = new NetworkError(new Error('fail'));
    expect(err.name).toBe('NetworkError');
  });

  it('stores the original cause', () => {
    const cause = new Error('timeout');
    const err = new NetworkError(cause);
    expect(err.cause).toBe(cause);
  });

  it('extends Error', () => {
    expect(new NetworkError(null)).toBeInstanceOf(Error);
  });
});

describe('post()', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends a POST request with JSON body and correct headers', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 204 }));
    await post('/api/contact', { name: 'Alice' });
    expect(fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice' }),
    });
  });

  it('resolves on 204 No Content', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 204 }));
    await expect(post('/api/test', {})).resolves.toBeUndefined();
  });

  it('resolves on 200 OK', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('ok', { status: 200 }));
    await expect(post('/api/test', {})).resolves.toBeUndefined();
  });

  it('throws NetworkError when fetch rejects', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('connection refused'));
    await expect(post('/api/test', {})).rejects.toBeInstanceOf(NetworkError);
  });

  it('NetworkError wraps the original cause', async () => {
    const cause = new Error('timeout');
    vi.mocked(fetch).mockRejectedValue(cause);
    try {
      await post('/api/test', {});
      expect.fail('should have thrown');
    } catch (err) {
      expect((err as NetworkError).cause).toBe(cause);
    }
  });

  it('throws HttpError on 400 response', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response('Bad Request', { status: 400, statusText: 'Bad Request' }),
    );
    await expect(post('/api/test', {})).rejects.toBeInstanceOf(HttpError);
  });

  it('HttpError carries the correct status code', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response('Conflict', { status: 409, statusText: 'Conflict' }),
    );
    try {
      await post('/api/test', {});
      expect.fail('should have thrown');
    } catch (err) {
      expect((err as HttpError).status).toBe(409);
    }
  });

  it('throws HttpError on 429 Too Many Requests', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response('', { status: 429, statusText: 'Too Many Requests' }),
    );
    try {
      await post('/api/test', {});
      expect.fail('should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect((err as HttpError).status).toBe(429);
    }
  });

  it('throws HttpError on 500 response', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response('Internal Server Error', {
        status: 500,
        statusText: 'Internal Server Error',
      }),
    );
    await expect(post('/api/test', {})).rejects.toBeInstanceOf(HttpError);
  });
});
