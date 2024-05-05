// Service Worker registered in main.js.


const shellAssetsCacheName = 'shellAssets-1'

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


// Service Worker activated.
self.addEventListener('activate', evt => {
    console.log('Service Worker activated.')
})


// BlockRef: sw.ja-fetchEvent
// Fetch events.
self.addEventListener('fetch', evt => {
    // console.log('Featch Events:', evt)
    // Pauses the fetch event and responds with our own custom event.
    evt.respondWith(
        // Check if the resource requested is in the caches.
        caches.match(evt.request).then(cacheRes => {
            // If a match was found cacheRes will reference it. Return that.
            // If no match, return original request to the remote server.
            return cacheRes || fetch(evt.request)
        })
    )
})