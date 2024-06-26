# PWA-Core
 A sample app to understand the core structure of PWAs.

# ONLY FOR ASSETS. NOT FOR DBs.
Lookup project XXX for DB caching.

# Shell vs Dynamic Assets
 Model your app in a way where the SHELL (assential) assets are cached (including fallbacks) so that the app works offline. DYNAMIC assets can be cached too; ideally when they are requested.
 ## Shell Assets (Pre-Caching)
 Ideally, cache in the insall event in the Service Worker.

# Phases
1. Create manifest.json.  
2. Link manifest.json to each .html page.
3. Add iOS support link and meta elemts to each .html page.
4. Implement Service Worker.
    - Register event
    - Install event
        - Cache Shell Assets (Pre-Caching)
    - Activate event
    - Fetch events
    - Cache versioning
    - Dynamic caching
    - Offline Fallback
    - Conditional Fallbacks
    - Limiting Cache Size

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
if ('serviceWorker' in navigator){ // Checking if browser supports Service Workers.
    navigator.serviceWorker.register('./sw.js') // This is an async function.
        // .then(() => console.log('Service Worker registered.')) // Production code.
        .then(reg => console.log('Service Worker registered.', reg)) // Debugging code.
        // .catch(() => console.log('Service Worker not registered.')) // Production code.
        .catch(err => console.log('Service Worker not registered.', err)) // Debugging code.
}
### Installing the Service Worker
- When a change to the Service Worker is made it gets installed again. 
- But the current version of the Service Worker keeps running and the updated Service Worker - is in waiting to acctive. 
- It only gets activated once all tabs (instances of the app) are closed. 
- This is also a good place to cache shell assets. 
- Code: in sw.js
// Install Service Worker.
self.addEventListener('install', evt => {
    console.log('Service Worker installed.')
})
#### Caching Shell Assets (Pre-Caching)
(BlockRef: sw.js-installEvent)
- Use a cache name constant 'shellAssets-1'.
- The last digit is changed when cache versioning happens.
- Nest the caching function inside evt.waitUntil() because the install event is async.
### Activate Event (when Service Worker gets activated)
- This is a good place to do caching as well.
- Code: in sw.js
// Service Worker activated.
self.addEventListener('activate', evt => {
    console.log('Service Worker activated.')
})
### Fetch Events
(BlockRef: sw.ja-fetchEvent)
- Intercecpt the fetch requests and respond with our own custom event.
- Instead of gooing to the server, look for the requested resource in the cache.
- If the requested resource isn't in the cache, go to the remote server.
- Known issues: need to properly understand how to cache Google Fonts.
### Cache Versioning
(BlockRef: sw.js-activateEvent)
- Bacuse the fetch requests are being intercepted, even if the cache name was changed (new cache created) it will find the resource from the previous (old) cache. So we need to delete the older cache versions. 
- Best place to do this is in the 'activate' event. Then when we make a change to the website, we just have to change the cacheName version and the Service Worker will be reactivated next time the page reloads. 
### Dynamic Caching
(BlockRef: sw.js-fetchEvent)
- Ideally you don't want to cache your entire site, unless it is very light. 
- With Dynamic Caching uncached resoures are cached when the user access them while online.
- Cached as a seperate key. Usually named:
const dynamicAssetsCacheName = 'dynamicAssets-1' 
- Dynamic caching is also done in the 'fetch event'.
### Offline Fallback
(BlockRef: sw.js-fetchEvent)
- Create a page to serve when requested resource is unavailable.
- Trigger the fallback in the fetch event.
### Conditional Fallbacks
(BlockRef: ConditionalFallBack)
- Check and retun relavent fallback based on resource request type.
### Limiting Cache Size
(BlockRef: sw.ja-limitCacheSize)
- Limit the number of assets in the cache. Not the file size but the asset count.
- This is handled by the limitCacheSize function. Which is called after the putting new dynamic asset in the cache. Newest asset is added and the oldest removed.
