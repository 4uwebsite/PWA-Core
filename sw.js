// Service Worker registered in main.js.


// Install Service Worker.
self.addEventListener('install', evt => {
    console.log('Service Worker installed.')
})


// Service Worker activated.
self.addEventListener('activate', evt => {
    console.log('Service Worker activated.')
})
