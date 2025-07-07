
export const getHumeAccessToken = async (): Promise<string> => {
  const apiKey = process.env.VITE_HUME_API_KEY;
  const secretKey = process.env.HUME_SECRET_KEY;

  if (!apiKey || !secretKey) {
    throw new Error(
      'Missing required environment variables (VITE_HUME_API_KEY or HUME_SECRET_KEY)'
    );  }

  try {
    const authString = `${apiKey}:${secretKey}`;
    const encoded = Buffer.from(authString).toString('base64');
    const res = await fetch(
      'https://api.hume.ai/oauth2-cc/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encoded}`,
        },
        body: new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
        cache: 'no-cache',
      }
    );
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    
    const raw = await res.json();
    if (!raw.access_token) {
      throw new Error(
        'Unable to get access token: ' + JSON.stringify(raw)
      );
    }
    return raw.access_token;
  } catch (err) {
    throw err;
  }
};