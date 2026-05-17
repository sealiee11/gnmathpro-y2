// Service worker that loads UV assets relative to its own URL. Works whether
// /stuf/ lives at the root of an origin or under any sub-path. The page that
// registers this SW determines its scope; prefix is derived from that scope.

const swDir = self.location.pathname.replace(/[^/]*$/, "");

importScripts(swDir + "uv.bundle.js");
importScripts(swDir + "uv.config.js");
importScripts(swDir + "uv.sw.js");

// SW lives in /.../stuf/, prefix lives in scope directory (parent of /stuf/).
const scopeDir = self.registration.scope.replace(/^https?:\/\/[^/]+/, "");
self.__uv$config.prefix = scopeDir + "service/";

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
