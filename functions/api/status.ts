// functions/api/status.ts
export async function onRequest(context) {
  const { env } = context;
  const apiWorker = env.API_WORKER;

  if (!apiWorker) {
    return new Response(JSON.stringify({ error: "Binding missing" }), { status: 500 });
  }

  try {
    const res = await apiWorker.fetch("https://api.c0desk1.my.id/status/all");
    return res; 
  } catch (e) {
    return new Response(JSON.stringify({ error: "Fetch failed" }), { status: 500 });
  }
}
