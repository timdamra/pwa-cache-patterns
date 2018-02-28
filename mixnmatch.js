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
// resources that do change from time to time, but where showing the latest version is less important than returning a fast response 

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open('cache-name')
        .then(cache => {
            return cache.match(event.request);
        })
        .then(cachedResponse => {
            let fetchPromise = fetch(event.request)
            .then(networkResponse => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            })
            return cachedResponse || fetchPromise;
        })
    )
});

// network first, falling back to cache, with frequent updates
// every time the network is accessed successfully, it updates the cache with the network response
// network response is then cached as backup for future requests

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.open("cache-name")
        .then(cache => {
            return fetch(event.request)
                    .then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                    .catch(() => {
                        return caches.match(event.request);
                    });
        })
    );
});
