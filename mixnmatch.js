// cache on demand - resources that don't often change
// clone() method - from PWA book - should make copy of the response and then cache it, for re-usability 

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open("cache-name")
        .then(cache => {
            return cache.match(event.request)
            .then(cachedResponse => {
                return cachedResponse || fetch(event.request)
                .then(networkResponse => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                })
            })
        })
    )
});

// cache, then fall back to network, with frequent updates

