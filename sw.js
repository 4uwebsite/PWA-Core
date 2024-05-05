// Service Worker registered in main.js.


const shellAssetsCacheName = 'shellAssets-1'

const shellAssetRequests = [
    '/',
    'index.html',
    'favicon.ico',
    'main.css',
    'main.js',
    'assets/sample.jpeg',
    'https://fonts.googleapis.com/css2?family=Freeman&display=swap'
]


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


// Fetch events.
self.addEventListener('fetch', evt => {
    // console.log('Featch Events:', evt)
})