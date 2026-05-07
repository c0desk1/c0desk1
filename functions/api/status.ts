// functions/api/status.ts

interface Env {
  API_WORKER: {
    fetch: typeof fetch;
  };
}

export const onRequestGet = async ({
  request,
  env,
  next,
}: {
  request: Request;
  env: Env;
  next: Function;
}) => {
  const url = new URL(request.url);

  if (!url.pathname.startsWith("/api/status")) {
    return next();
  }

  const apiWorker = env.API_WORKER;

  if (!apiWorker) {
    return Response.json(
      {
        error: "Binding API_WORKER tidak ditemukan",
      },
      {
        status: 500,
      }
    );
  }

  try {
    const res = await apiWorker.fetch(
      "https://api.c0desk1.my.id/status/all",
      {
        cf: {
          cacheTtl: 60,
          cacheEverything: true,
        },
      } as RequestInit
    );

    return new Response(res.body, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",

        "Cache-Control":
          "public, max-age=60, stale-while-revalidate=300",

        "X-Status-Cache": "edge",
      },
    });
  } catch {
    return Response.json(
      {
        error: "Gagal fetch Worker API",
      },
      {
        status: 500,
      }
    );
  }
};
