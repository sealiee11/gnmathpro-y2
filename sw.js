// Portable Ultraviolet service worker bootstrap.
// Loads UV assets from the CDN (passed as ?cdn= query, with a fallback default)
// and derives its prefix/scope from its own location, so this file works no
// matter what path on its origin it is served from.

const DEFAULT_CDN = "https://cdn.jsdelivr.net/gh/sealiee11/gnmathpr0---y@main/";

const swParams = new URLSearchParams(self.location.search);
const CDN = (swParams.get("cdn") || DEFAULT_CDN).replace(/\/?$/, "/");

importScripts(CDN + "stuf/uv.bundle.js");
importScripts(CDN + "stuf/uv.config.js");
importScripts(CDN + "stuf/uv.sw.js");

// Override prefix to match this SW's actual location on its host origin.
const swDir = self.location.pathname.replace(/[^/]*$/, "");
self.__uv$config.prefix = swDir + "service/";

const uv = new UVServiceWorker();

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            if (uv.route(event)) {
                return await uv.fetch(event);
            }
            return await fetch(event.request);
        })()
    );
});
