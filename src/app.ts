// src/app.ts
import { FetchState, astro } from 'astro/fetch';

declare global {
  var API_WORKER: { fetch: typeof fetch } | undefined;
}

if (import.meta.env.DEV && !globalThis.API_WORKER) {
  globalThis.API_WORKER = {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      console.log('[DEV] Mock fetch:', input);
      return fetch(input, init);
    },
  };
}

export default {
  async fetch(request: Request): Promise<Response> {
    const state = new FetchState(request);
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Health check point
    if (pathname === '/health/' || pathname === '/health') {
      return new Response(JSON.stringify({ ok: true, service: 'web', timestamp: Date.now() }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // API status endpoint
    if (pathname === '/api/status/') {
      const apiWorker = globalThis.API_WORKER;
      if (!apiWorker) {
        return Response.json(
          { error: 'Binding API_WORKER tidak ditemukan' },
          { status: 500 }
        );
      }
      try {
        const res = await apiWorker.fetch('https://api.c0desk1.my.id/status/all', {
          cf: { cacheTtl: 60, cacheEverything: true },
        } as RequestInit);
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

    // Default: Astro pipeline
    try {
      return await astro(state);
    } finally {
      await state.finalizeAll();
    }
  },
};
