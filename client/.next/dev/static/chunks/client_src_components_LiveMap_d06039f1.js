(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/src/components/LiveMap.js [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/1e749_12ddd9ea._.js",
  "static/chunks/client_src_components_LiveMap_1d5c6a86.js",
  {
    "path": "static/chunks/1e749_leaflet_dist_leaflet_23064373.css",
    "included": [
      "[project]/client/node_modules/leaflet/dist/leaflet.css [app-client] (css)"
    ]
  },
  "static/chunks/client_src_components_LiveMap_40f5e821.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/client/src/components/LiveMap.js [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);