# PWA-Core
 A sample app to understand the core structure of PWAs.

# Phases
1. Create manifest.json.  
2. Link manifest.json to each .html page.
3. Add iOS support link and meta elemts to each .html page.
4. Implement Service Worker.
    - Register event
    - Install event

## manifest.json
Docs: https://web.dev/articles/add-manifest 
- Should be included in each .html. 
- Should be in the root folder. 
- Need to research how "related_application" works in the manifest.
- Adding the manifest.json file and linking it to pages is enough to pass PWA compatibility to get the Browser Install button. If caching isn't important, this is sufcient to make it an app. 

## iOS Support
The following code should be in each .html page header:
<link rel="apple-touch-icon" href="./assets/app-images/apple-touch-icon.png">
<meta name="apple-mobile-web-app-status-bar" content="#FFE1C4">

## Implement Service Worker
Service Workers must be in the root folder to have full access scope.
### Registering the Service Worker
- Service Workers must be registered from another .js file. 
- Ideally use the main.js as it needs to be registered as early as possible. 
- Best place would be above the index.html page header.
- Some browsers may not support Service Workers. Check to validate the browsers support.
- Below code should be in main.js:

'if ('serviceWorker' in navigator){ // Checking if browser supports Service Workers.
    navigator.serviceWorker.register('./sw.js') // This is an async function.
        // .then(() => console.log('Service Worker registered.')) // Production code.
        .then(reg => console.log('Service Worker registered.', reg)) // Debugging code.
        // .catch(() => console.log('Service Worker not registered.')) // Production code.
        .catch(err => console.log('Service Worker not registered.', err)) // Debugging code.
}'
### Installing the Service Worker
