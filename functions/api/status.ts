// functions/api/status.ts

interface Env {
  API_WORKER: { fetch: typeof fetch };
}

export const onRequestGet = async (context: { request: Request, env: Env, next: Function }) => {
  const url = new URL(context.request.url);

  if (!url.pathname.startsWith('/api/status')) {
    return context.next(); 
  }

  const apiWorker = context.env.API_WORKER;

  if (!apiWorker) {
    return new Response(JSON.stringify({ error: "Binding API_WORKER tidak ditemukan" }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }

  try {
    const res = await apiWorker.fetch("https://api.c0desk1.my.id/status/all");
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Gagal fetch Worker API" }), { status: 500 });
  }
};
