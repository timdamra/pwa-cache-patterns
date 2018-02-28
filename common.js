// cache only

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
    );
});

// caching, falling back to network

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});

// Network only

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
    );
});

// network, falling back to cache

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.match(event.request);
        })
    )
});

// 