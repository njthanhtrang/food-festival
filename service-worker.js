    // don't need a <script> bc service worker fx in index.html does that
    // service workers don't need webpack to work

    const APP_PREFIX = "FoodFest-";
    const VERSION = "version_01";
    const CACHE_NAME = APP_PREFIX + VERSION;

    // use relative paths bc page hosted at github.io/projectname
    // didn't include images in assets bc browser's cache limit 50-250 MB
    const FILES_TO_CACHE = [
        "./index.html",
        "./events.html",
        "./tickets.html",
        "./schedule.html",
        "./assets/css/style.css",
        "./assets/css/bootstrap.css",
        "./assets/css/tickets.css",
        "./dist/app.bundle.js",
        "./dist/events.bundle.js",
        "./dist/tickets.bundle.js",
        "./dist/schedule.bundle.js"
    ];

    // SW run before window obj is created
    // instantiate listeners on SW
    // self = SW obj
    self.addEventListener("install", function(e) {
        // tell browser to wait until work complete before terminating SW
        // ensures SW doesn't move on from installing phase until finish executing all code
        e.waitUntil(
            caches.open(CACHE_NAME).then(function(cache) {
                console.log("installing cache : " + CACHE_NAME)
                return cache.addAll(FILES_TO_CACHE)
            })
        )
    })