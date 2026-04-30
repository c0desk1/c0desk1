
interface ServiceBinding {
  fetch: typeof fetch;
}

interface Env {
  API_WORKER: ServiceBinding;
}

export async function onRequest(context: { env: Env }) {
  const { env } = context;
  const apiWorker = env.API_WORKER;

  if (!apiWorker) {
    return new Response(
      JSON.stringify({ error: "Binding API_WORKER tidak ditemukan" }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const res = await apiWorker.fetch("https://api.c0desk1.my.id/status/all");
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Gagal mengambil data dari Worker" }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
