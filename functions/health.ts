// functions/health.ts
export async function onRequest() {
  const healthData = {
    ok: true,
    service: 'web',
    timestamp: Date.now(),
  };

  return new Response(JSON.stringify(healthData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
