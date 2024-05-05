// Registering Service Worker.
if ('serviceWorker' in navigator){ // Checking if browser supports Service Workers.
    navigator.serviceWorker.register('./sw.js') // This is an async function.
        .then(() => console.log('Service Worker registered.')) // Production code.
        // .then(reg => console.log('Service Worker registered.', reg)) // Debugging code.
        // .catch(() => console.log('Service Worker not registered.')) // Production code.
        .catch(err => console.log('Service Worker not registered.', err)) // Debugging code.
}

