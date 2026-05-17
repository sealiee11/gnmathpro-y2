/*global Ultraviolet*/
// All asset paths point at the CDN where this file itself lives, so they work
// from any origin that loads this config. `prefix` is a default; both the page
// (index1.html) and the SW (sw.js) overwrite it at runtime to match the SW's
// actual location on the host origin.
(function () {
    const BASE = "https://cdn.jsdelivr.net/gh/sealiee11/gnmathpr0---y@main/stuf/";
    self.__uv$config = {
        prefix: "/service/",
        encodeUrl: Ultraviolet.codec.xor.encode,
        decodeUrl: Ultraviolet.codec.xor.decode,
        handler: BASE + "uv.handler.js",
        client:  BASE + "uv.client.js",
        bundle:  BASE + "uv.bundle.js",
        config:  BASE + "uv.config.js",
        sw:      BASE + "uv.sw.js",
    };
})();
