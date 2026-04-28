// src/lib/status.ts

const API = "https://c0desk1-api.dev.c0desk1.workers.dev";

export async function fetchStatusAll() {
  const res = await fetch(`${API}/status/all`, {
    cache: "no-store",
  });
  return res.json();
}

export async function fetchBadge(service = "api") {
  const res = await fetch(`${API}/badge/${service}`, {
    cache: "no-store",
  });
  return res.json();
}