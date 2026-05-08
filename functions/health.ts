// functions/health.ts
export async function onRequest({ env }: { env: any }) {
  const binding = env.API_WORKER;
  let reachable = false;
  let latency: number | null = null;

  if (binding) {
    const start = Date.now();
    try {
      const pingRes = await binding.fetch('https://api.c0desk1.my.id/health');
      reachable = pingRes.ok;
      latency = Date.now() - start;
    } catch (err) {
      console.error('Health check ping failed:', err);
    }
  }

  const healthData = {
    ok: true,
    service: 'web',
    env: import.meta.env.PROD ? 'production' : 'development',
    timestamp: Date.now(),
    bindings: {
      API_WORKER: {
        available: !!binding,
        reachable,
        latencyMs: latency,
      },
    },
  };

  return Response.json(healthData, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
