import { test, expect } from '@playwright/test'

test.describe('API Health', () => {
  test('GET /api/health retourne 200', async ({ request }) => {
    const response = await request.get('http://localhost:4000/api/health')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toMatchObject({
      status: 'ok',
    })
    expect(typeof body.timestamp).toBe('string')
    expect(typeof body.uptime).toBe('number')
  })
})
