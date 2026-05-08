// functions/health.ts
let startTime = Date.now();

export async function onRequest({ env }: { env: any }) {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const uptimeHuman = formatUptime(uptimeSeconds);

  const healthData = {
    ok: true,
    service: 'web',
    version: env.VERSION || 'unknown',
    environment: env.ENVIRONMENT || (import.meta?.env?.PROD ? 'production' : 'development'),
    uptime: {
      seconds: uptimeSeconds,
      human: uptimeHuman,
    },
    timestamp: Date.now(),
  };

  return new Response(JSON.stringify(healthData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
  return parts.join(' ');
}
