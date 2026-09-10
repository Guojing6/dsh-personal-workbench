import type { IncomingMessage, ServerResponse } from 'node:http'

export function isLoopbackRequest(req: IncomingMessage): boolean {
  const address = req.socket.remoteAddress
  if (address !== '127.0.0.1' && address !== '::1' && address !== '::ffff:127.0.0.1') return false
  const host = req.headers.host
  if (typeof host !== 'string') return false
  let url: URL
  try { url = new URL(`http://${host}`) } catch { return false }
  if (url.hostname !== '127.0.0.1' && url.hostname !== 'localhost' && url.hostname !== '[::1]') return false
  if (req.headers['sec-fetch-site'] === 'cross-site') return false
  const origin = req.headers.origin
  if (origin === undefined) return true
  try { return new URL(origin).host === url.host } catch { return false }
}

export function writeJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'referrer-policy': 'no-referrer',
    'x-content-type-options': 'nosniff',
  })
  res.end(JSON.stringify(body))
}

export async function readJsonBody(req: IncomingMessage, maxBytes = 256 * 1024): Promise<Record<string, unknown> | undefined> {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const buffer = chunk as Buffer
    size += buffer.length
    if (size > maxBytes) return undefined
    chunks.push(buffer)
  }
  if (chunks.length === 0) return {}
  try {
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    return typeof parsed === 'object' && parsed !== null ? parsed as Record<string, unknown> : undefined
  } catch { return undefined }
}
