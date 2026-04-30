// src/pages/health.ts
export const GET = async () => {
  return new Response(
    JSON.stringify({
      ok: true,
      service: 'web',
      platform: 'cloudflare-pages',
      timestamp: Date.now(),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
};
