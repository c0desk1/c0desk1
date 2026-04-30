export const runtime = 'edge';

export async function GET({ locals }) {
  const apiWorker = locals.runtime.env.API_WORKER;
  
  if (!apiWorker) {
    return new Response(JSON.stringify({ error: 'Binding API_WORKER tidak ditemukan' }), { status: 500 });
  }

  try {
    const response = await apiWorker.fetch('https://api.c0desk1.my.id/status/all');
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal mengambil data dari Worker' }), { status: 500 });
  }
}
