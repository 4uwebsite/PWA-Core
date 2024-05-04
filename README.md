# PWA-Core
 A sample app to understand the core structure of PWAs.

# Phases
1. Create manifest.json.  
2. Link manifest.json to each .html page.
3. Add iOS support link and meta elemts to each .html page.

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
