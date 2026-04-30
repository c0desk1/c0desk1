// src/pages/health.ts

export const GET = async () => {
  return new Response(
    JSON.stringify({
      ok: true,
      service: 'web',
      env: import.meta.env.PROD ? 'production' : 'development',
      ts: Date.now(),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    }
  );
};
