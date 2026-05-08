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

    // Health check endpoint
    if (pathname === '/health/') {
      let bindingOk = false;
      let bindingLatency: number | null = null;
      if (globalThis.API_WORKER) {
        try {
          const start = Date.now();
          const pingRes = await globalThis.API_WORKER.fetch('https://api.c0desk1.my.id/health');
          bindingOk = pingRes.ok;
          bindingLatency = Date.now() - start;
        } catch (err) {
          console.error('Health check ping failed:', err);
          bindingOk = false;
        }
      }

      const healthData = {
        ok: true,
        service: 'web',
        env: import.meta.env.PROD ? 'production' : 'development',
        timestamp: Date.now(),
        bindings: {
          API_WORKER: {
            available: !!globalThis.API_WORKER,
            reachable: bindingOk,
            latencyMs: bindingLatency,
          },
        },
        // version dihapus karena tidak diperlukan atau bisa ditambahkan lain kali
      };
      return new Response(JSON.stringify(healthData, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
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
