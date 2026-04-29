export const GET = async () => {
  return new Response(
    JSON.stringify({
      ok: true,
      service: 'web',
      ts: Date.now(),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
