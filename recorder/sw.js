// Meeting Recorder service worker: keeps the app working offline, and sends the headers that let
// the transcriber use several processor cores (GitHub Pages can't send them itself).
const VERSION = "rec-v1";
const SHELL = ["./", "./index.html", "./worker.js", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("rec-") && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function isolate(res) {
  if (!res || res.status === 0 || res.type === "opaque") return res;
  const h = new Headers(res.headers);
  h.set("Cross-Origin-Opener-Policy", "same-origin");
  h.set("Cross-Origin-Embedder-Policy", "require-corp");
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
}

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    let res;
    if (url.pathname.includes("/vendor/")) {
      // the bundled library never changes within a version: cache first
      res = await cache.match(req);
      if (!res) { res = await fetch(req); if (res.ok) cache.put(req, res.clone()); }
    } else {
      // the app itself: network first so updates arrive, cache when offline
      try {
        res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
      } catch (_) {
        res = await cache.match(req, { ignoreSearch: true }) || (req.mode === "navigate" ? await cache.match("./") : null);
        if (!res) return Response.error();
      }
    }
    return isolate(res);
  })());
});
