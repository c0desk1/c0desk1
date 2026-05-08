// src/app.ts
import { FetchState, astro } from 'astro/fetch';

interface Env {
  API_WORKER: {
    fetch: typeof fetch;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const state = new FetchState(request);
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/status')) {
      const apiWorker = env.API_WORKER;

      if (!apiWorker) {
        return Response.json({ error: "Binding API_WORKER tidak ditemukan" }, { status: 500 });
      }

      try {
        const res = await apiWorker.fetch(
          "https://api.c0desk1.my.id/status/all",
          {
            cf: {
              cacheTtl: 60,
              cacheEverything: true,
            },
          } as any
        );

        return new Response(res.body, {
          status: res.status,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60, stale-while-revalidate=5000",
            "X-Status-Cache": "hit-advanced-pipeline",
          },
        });
      } catch (err) {
        return Response.json({ error: "Gagal fetch Worker API via Pipeline" }, { status: 500 });
      }
    }

    return astro(state);
  },
};
