// Ganti dengan URL Cloudflare Worker Anda yang sudah di-deploy
const CLOUDFLARE_WORKER_URL = "https://mukodir-ai.psptskasa-officials.workers.dev";

export async function askMukodirAI(mode, payload) {
  const response = await fetch(CLOUDFLARE_WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, payload }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Gagal terhubung ke Cloudflare Worker AI.");
  }
  return data.result;
}
