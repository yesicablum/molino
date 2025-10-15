// Proxy endpoint for password recovery to avoid CORS issues from the browser.
// This will be deployed as a serverless function on Vercel at /api/recuperar
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body;
    console.log('[api/recuperar] incoming body:', body);

    // Forward the request to backend
    const resp = await fetch('https://backend-molino.onrender.com/recuperar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await resp.text();
    let parsed;
    try { parsed = JSON.parse(text); } catch (e) { parsed = text; }

    console.log('[api/recuperar] backend status:', resp.status, 'body:', parsed);

    // Forward status and parsed body so the client can see backend error details
    res.status(resp.status).json({ status: resp.status, ok: resp.ok, body: parsed });
  } catch (err) {
    console.error('[api/recuperar] Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', details: String(err) });
  }
}
