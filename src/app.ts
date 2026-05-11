// src/app.ts
import { FetchState, astro } from 'astro/fetch';
import { env as cloudflareEnv } from 'cloudflare:workers';

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const state = new FetchState(request);
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Health check
    if (pathname === '/health' || pathname === '/health/') {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }

    // API status endpoint
    if (pathname === '/api/status' || pathname === '/api/status/') {
      try {
        const activeEnv = env || cloudflareEnv;
        const token = activeEnv?.ADMIN_TOKEN;

        if (!token) {
          return new Response(JSON.stringify({ 
            error: 'ADMIN_TOKEN tidak ditemukan',
            info: 'Pastikan token sudah disetel di Dashboard Cloudflare Workers'
          }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
          });
        }

        const res = await fetch('https://api.c0desk1.my.id/status/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Origin': 'https://c0desk1-v00.bimasaktiakbarr.workers.dev', 
            'Content-Type': 'application/json; charset=utf-8'
          }
        });

        if (!res.ok) {
           const apiError = await res.text();
           throw new Error(`API ditolak (${res.status}): ${apiError}`);
        }

        return new Response(res.body, {
          status: res.status,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=60, stale-while-revalidate=5000'
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ 
          error: 'Gagal komunikasi dengan Server API',
          detail: err instanceof Error ? err.message : String(err)
        }), { 
          status: 502, 
          headers: { 'Content-Type': 'application/json; charset=utf-8' } 
        });
      }
    }

    // Astro pipeline
    try {
      return await astro(state, env, ctx);
    } catch (e) {
      return new Response("Internal Server Error", {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    } finally {
      await state.finalizeAll();
    }
  },
};