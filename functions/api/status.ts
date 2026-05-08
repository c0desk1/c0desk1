// functions/api/status.ts
export async function onRequest({ env }: { env: any }) {
  const apiWorker = env.API_WORKER;

  if (!apiWorker) {
    return Response.json(
      { error: 'Binding API_WORKER tidak ditemukan' },
      { status: 500 }
    );
  }

  try {
    const res = await apiWorker.fetch('https://api.c0desk1.my.id/status/all', {
      cf: {
        cacheTtl: 60,
        cacheEverything: true,
      },
    });

    return new Response(res.body, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=5000',
        'X-Status-Cache': 'edge',
      },
    });
  } catch (err) {
    console.error('Gagal fetch API_WORKER:', err);
    return Response.json(
      { error: 'Gagal fetch Worker API' },
      { status: 500 }
    );
  }
}
