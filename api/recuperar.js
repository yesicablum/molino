// Proxy endpoint for password recovery to avoid CORS issues from the browser.
// This will be deployed as a serverless function on Vercel at /api/recuperar
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body;

    // Use global fetch (available on Vercel). Forward the request to the backend.
    const resp = await fetch('https://backend-molino.onrender.com/recuperar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await resp.text();
    let data;
    try { data = JSON.parse(text); } catch (e) { data = text; }

    // Forward status and body
    res.status(resp.status).send(data);
  } catch (err) {
    console.error('Proxy error /api/recuperar:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
};
