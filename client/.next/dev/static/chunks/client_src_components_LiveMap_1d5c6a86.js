(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/src/components/LiveMap.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Polyline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/react-leaflet/lib/Polyline.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ChangeView({ center }) {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChangeView.useEffect": ()=>{
            map.setView(center, map.getZoom());
        }
    }["ChangeView.useEffect"], [
        center,
        map
    ]);
    return null;
}
_s(ChangeView, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = ChangeView;
// Create custom pulsing blue icon to represent user
const pulseIcon = __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
    className: 'custom-pulse-icon',
    html: `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: rgba(59, 130, 246, 0.4); border-radius: 50%; animation: pulse 2s infinite ease-out; pointer-events: none;"></div>
        <div style="width: 16px; height: 16px; border-radius: 50%; background: #3b82f6; border: 3px solid white; box-shadow: 0 0 0 1px rgba(0,0,0,0.1); position: relative; z-index: 2; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
        <style>
            @keyframes pulse {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
            .dummy-car-icon {
                transition: transform 1s linear;
                filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
            }
        </style>
    `,
    iconSize: [
        40,
        40
    ],
    iconAnchor: [
        20,
        20
    ]
});
// Create custom car icon with memory caching to stop React-Leaflet appendChild thrashing
const iconCache = {};
const getCarIcon = (heading)=>{
    const rounded = Math.round(heading || 0);
    if (!iconCache[rounded]) {
        iconCache[rounded] = __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
            className: 'dummy-car-icon',
            html: `
                <div style="transform: rotate(${rounded}deg); width: 20px; height: 40px; transform-origin: center center;">
                    <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
                        <rect x="5" y="30" width="15" height="30" rx="5" fill="#333"/>
                        <rect x="80" y="30" width="15" height="30" rx="5" fill="#333"/>
                        <rect x="5" y="140" width="15" height="30" rx="5" fill="#333"/>
                        <rect x="80" y="140" width="15" height="30" rx="5" fill="#333"/>
                        <rect x="15" y="15" width="70" height="170" rx="20" fill="#facc15"/>
                        <path d="M 25 60 L 75 60 L 80 85 L 20 85 Z" fill="#374151"/>
                        <path d="M 25 150 L 75 150 L 70 125 L 30 125 Z" fill="#374151"/>
                        <rect x="25" y="85" width="50" height="40" fill="#eab308"/>
                    </svg>
                </div>
            `,
            iconSize: [
                20,
                40
            ],
            iconAnchor: [
                10,
                20
            ]
        });
    }
    return iconCache[rounded];
};
function LiveMap({ center, isBookingActive, onArrival }) {
    _s1();
    // Dummy moving cars logic
    const [cars, setCars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Active Booking logic
    const [driverRoute, setDriverRoute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [driverPos, setDriverPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        lat: center.lat - 0.005,
        lng: center.lng - 0.003
    });
    const [driverHeading, setDriverHeading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30);
    // Dummy Cars Effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveMap.useEffect": ()=>{
            if (isBookingActive) return;
            // Initialize 4 scattered cars far from the center
            const initialCars = [
                {
                    id: 1,
                    lat: center.lat + 0.008,
                    lng: center.lng + 0.009,
                    speedLat: -0.00005,
                    speedLng: -0.00002,
                    heading: 200
                },
                {
                    id: 2,
                    lat: center.lat - 0.007,
                    lng: center.lng + 0.008,
                    speedLat: 0.00006,
                    speedLng: -0.00004,
                    heading: 320
                },
                {
                    id: 3,
                    lat: center.lat + 0.006,
                    lng: center.lng - 0.007,
                    speedLat: -0.00004,
                    speedLng: 0.00007,
                    heading: 120
                },
                {
                    id: 4,
                    lat: center.lat - 0.008,
                    lng: center.lng - 0.006,
                    speedLat: 0.00005,
                    speedLng: 0.00003,
                    heading: 35
                }
            ];
            setCars(initialCars);
            const interval = setInterval({
                "LiveMap.useEffect.interval": ()=>{
                    setCars({
                        "LiveMap.useEffect.interval": (prevCars)=>prevCars.map({
                                "LiveMap.useEffect.interval": (car)=>({
                                        ...car,
                                        lat: car.lat + car.speedLat,
                                        lng: car.lng + car.speedLng
                                    })
                            }["LiveMap.useEffect.interval"])
                    }["LiveMap.useEffect.interval"]);
                }
            }["LiveMap.useEffect.interval"], 1000); // Move every second
            return ({
                "LiveMap.useEffect": ()=>clearInterval(interval)
            })["LiveMap.useEffect"];
        }
    }["LiveMap.useEffect"], [
        center.lat,
        center.lng,
        isBookingActive
    ]); // Re-init relative to center when map center drastically changes
    // Active Driver Effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveMap.useEffect": ()=>{
            if (!isBookingActive) return;
            // Define an L-shaped street route covering two turns
            const start = {
                lat: center.lat - 0.006,
                lng: center.lng - 0.004
            };
            const mid = {
                lat: center.lat,
                lng: center.lng - 0.004
            };
            const end = {
                lat: center.lat,
                lng: center.lng
            };
            const routePoints = [
                start,
                mid,
                end
            ];
            setDriverRoute(routePoints);
            setDriverPos(start);
            let targetIdx = 1;
            let currentPos = {
                ...start
            };
            const speed = 0.00008; // Slower, more realistic animation distance per tick
            const interval = setInterval({
                "LiveMap.useEffect.interval": ()=>{
                    setDriverPos({
                        "LiveMap.useEffect.interval": (prev)=>{
                            if (targetIdx >= routePoints.length) {
                                if (onArrival) {
                                    // Push up to macro-task queue to avoid synchronous React setState render collision
                                    setTimeout({
                                        "LiveMap.useEffect.interval": ()=>onArrival()
                                    }["LiveMap.useEffect.interval"], 0);
                                }
                                return prev; // Reached end
                            }
                            const target = routePoints[targetIdx];
                            const dx = target.lng - currentPos.lng;
                            const dy = target.lat - currentPos.lat;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < speed) {
                                currentPos = {
                                    lat: target.lat,
                                    lng: target.lng
                                };
                                targetIdx++; // Move to next waypoint
                                return currentPos;
                            }
                            const moveLat = dy / dist * speed;
                            const moveLng = dx / dist * speed;
                            // Update direction heading
                            const heading = Math.atan2(dx, dy) * (180 / Math.PI);
                            setDriverHeading(heading);
                            currentPos = {
                                lat: currentPos.lat + moveLat,
                                lng: currentPos.lng + moveLng
                            };
                            return currentPos;
                        }
                    }["LiveMap.useEffect.interval"]);
                }
            }["LiveMap.useEffect.interval"], 100);
            return ({
                "LiveMap.useEffect": ()=>clearInterval(interval)
            })["LiveMap.useEffect"];
        }
    }["LiveMap.useEffect"], [
        isBookingActive,
        center
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
        center: center,
        zoom: 15,
        style: {
            width: '100%',
            height: '100%',
            zIndex: 1
        },
        zoomControl: false,
        attributionControl: false,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            }, void 0, false, {
                fileName: "[project]/client/src/components/LiveMap.js",
                lineNumber: 159,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChangeView, {
                center: center
            }, void 0, false, {
                fileName: "[project]/client/src/components/LiveMap.js",
                lineNumber: 162,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                position: center,
                icon: pulseIcon,
                zIndexOffset: 100
            }, void 0, false, {
                fileName: "[project]/client/src/components/LiveMap.js",
                lineNumber: 163,
                columnNumber: 13
            }, this),
            !isBookingActive && cars.map((car)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: [
                        car.lat,
                        car.lng
                    ],
                    icon: getCarIcon(car.heading)
                }, car.id, false, {
                    fileName: "[project]/client/src/components/LiveMap.js",
                    lineNumber: 167,
                    columnNumber: 17
                }, this)),
            isBookingActive && driverRoute.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Polyline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Polyline"], {
                positions: driverRoute.map((p)=>[
                        p.lat,
                        p.lng
                    ]),
                color: "#22c55e",
                weight: 5,
                opacity: 0.8
            }, void 0, false, {
                fileName: "[project]/client/src/components/LiveMap.js",
                lineNumber: 176,
                columnNumber: 17
            }, this),
            isBookingActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                position: [
                    driverPos.lat,
                    driverPos.lng
                ],
                icon: getCarIcon(driverHeading),
                zIndexOffset: 200
            }, void 0, false, {
                fileName: "[project]/client/src/components/LiveMap.js",
                lineNumber: 185,
                columnNumber: 17
            }, this)
        ]
    }, `${center.lat}-${center.lng}`, true, {
        fileName: "[project]/client/src/components/LiveMap.js",
        lineNumber: 151,
        columnNumber: 9
    }, this);
}
_s1(LiveMap, "qzIp4XAJ62lK3xmtRmTEa+T6Igg=");
_c1 = LiveMap;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChangeView");
__turbopack_context__.k.register(_c1, "LiveMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/LiveMap.js [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/client/src/components/LiveMap.js [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=client_src_components_LiveMap_1d5c6a86.js.map