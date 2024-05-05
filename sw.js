// Service Worker registered in main.js.


const shellAssetsCacheName = 'shellAssets-7'
const dynamicAssetsCacheName = 'dynamicAssets-2'

const shellAssetRequests = [
    '/',
    'index.html',
    'favicon.ico',
    'main.css',
    'manifest.json',
    'main.js',
    'assets/sample.jpeg',
    'https://fonts.googleapis.com/css2?family=Freeman&display=swap',
    'https://fonts.gstatic.com/s/freeman/v1/S6u9w4NGQiLN8nh-SwiPGQ3q5d0.woff2',
    'assets/screenshot1.png',
    'assets/screenshot2.png',
    'assets/app-images/android-chrome-192x192.png',
    'assets/app-images/android-chrome-512x512.png',
    'assets/app-images/android-chrome-maskable-192x192.png',
    'assets/app-images/android-chrome-maskable-512x512.png',
    'assets/app-images/apple-touch-icon.png'
]
// NOTE: When caching Google fonts you might have to add the link that Google fonts provided and the link that it actually requests when running. Refer above shellAssetRequests.


// BlockRef: sw.js-installEvent
// Install Service Worker.
self.addEventListener('install', evt => {
    console.log('Service Worker installed.')
    // Waiting until the install process is over to start the chaching.
    evt.waitUntil(
        // Caching Shell Assets
        caches.open(shellAssetsCacheName).then(cache => {
            console.log('Caching shell assets...')
            cache.addAll(shellAssetRequests)
            console.log('Shell assets cached.')
        })
    )
})


// BlockRef: sw.js-activateEvent
// Service Worker activated.
self.addEventListener('activate', evt => {
    console.log('Service Worker activated.')
    evt.waitUntil(
        // From the caches get keys into an array. When the async function is done loop through the array of keys.
        caches.keys().then(keys => {
            console.log('Found Cache keys:', keys)
            return Promise.all(keys
                // If the key doesn't match, then delete the key (that specific cache).
                .filter(key => key !== shellAssetsCacheName) 
                .map(key => caches.delete(key))
            )
        })
    )
})


// BlockRef: sw.js-fetchEvent
// Fetch events.
// shell & dynamic assets are cached here.
self.addEventListener('fetch', evt => {
    // console.log('Featch Events:', evt)
    // Pauses the fetch event and responds with our own custom event.
    evt.respondWith(
        // Check if the resource requested is in the caches.
        caches.match(evt.request).then(cacheRes => {
            // If a match was found cacheRes will reference it. Return that.
            // If no match, return original request to the remote server.
            return cacheRes || fetch(evt.request).then(fetchRes => {
                // If a fetch request goes to the remote server, cache it in dynamic.
                return caches.open(dynamicAssetsCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone()) // Need to clone fetchRes here so it can be used below.
                    return fetchRes // Returning the response to the user after caching in dynamic.
                })
            })
        })
    )
})