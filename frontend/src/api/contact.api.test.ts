import { sendContactMessage } from './contact.api';
import * as http from './http';

vi.mock('./http');

describe('sendContactMessage', () => {
  it('calls post with the correct endpoint and data', async () => {
    vi.mocked(http.post).mockResolvedValue(undefined);
    const data = {
      name: 'Alice',
      email: 'alice@example.com',
      message: 'Hello',
    };
    await sendContactMessage(data);
    expect(http.post).toHaveBeenCalledWith('/api/contact', data);
  });

  it('propagates errors thrown by post', async () => {
    vi.mocked(http.post).mockRejectedValue(
      new http.NetworkError(new Error('fail')),
    );
    await expect(
      sendContactMessage({ name: 'A', email: 'a@b.com', message: 'M' }),
    ).rejects.toBeInstanceOf(http.NetworkError);
  });
});
