// src/islands/statusClient.ts

const API = "https://c0desk1-api.dev.c0desk1.workers.dev";

const panel = document.getElementById("status-panel");
const openBtn = document.getElementById("status-toggle");
const closeBtn = document.getElementById("status-close");

async function loadStatus() {
  const res = await fetch(`${API}/status/all`);
  return res.json();
}

openBtn?.addEventListener("click", async () => {
  const data = await loadStatus();

  // inject data ke panel
  window.dispatchEvent(
    new CustomEvent("status:update", { detail: data })
  );

  panel?.classList.remove("translate-y-full");
});

closeBtn?.addEventListener("click", () => {
  panel?.classList.add("translate-y-full");
});