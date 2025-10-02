const CACHE_NAME = "my-vue-pwa-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) =>
            response || fetch(event.request)
        )
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((name) =>
                    name !== CACHE_NAME ? caches.delete(name) : null
                )
            )
        )
    );
});
