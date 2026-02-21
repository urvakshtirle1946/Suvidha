(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/src/components/ui/text-reveal-animation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextReveal",
    ()=>TextReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function TextReveal({ word, textColor, brandYellow }) {
    const WORD = word || "Zelp";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'inline-block'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "reveal-h1",
                style: {
                    margin: 0,
                    padding: 0
                },
                children: WORD.split("").map((char, i)=>{
                    let charColor = textColor || 'var(--brand)';
                    if (WORD === "Zelp" && i < 1) {
                        charColor = brandYellow || 'var(--brand-yellow)';
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: charColor,
                            animationDelay: `calc(0.08s * ${i})`
                        },
                        children: char === " " ? "\u00A0" : char
                    }, i, false, {
                        fileName: "[project]/client/src/components/ui/text-reveal-animation.js",
                        lineNumber: 17,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/client/src/components/ui/text-reveal-animation.js",
                lineNumber: 9,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/client/src/components/ui/text-reveal-animation.js",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/src/components/ui/text-reveal-animation.js",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = TextReveal;
var _c;
__turbopack_context__.k.register(_c, "TextReveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/ui/zelp-text-reveal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZelpLogo",
    ()=>ZelpLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/lib/utils.ts [app-client] (ecmascript)"); // Keep good habits
'use client';
;
;
;
function ZelpLogo({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("zelp-reveal", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "wordmark",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    viewBox: "0 0 210 110",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    style: {
                        height: '100%',
                        width: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "0",
                        y: "85",
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontWeight: "bold",
                        fontSize: "90",
                        fill: "#0c831f",
                        textAnchor: "start",
                        children: "Zelp"
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                        lineNumber: 12,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                    lineNumber: 11,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "scrim",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                    fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "logomark",
                viewBox: "0 0 200 199",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        clipPath: "url(#clip0_2254_253)",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                clipPath: "url(#clip1_2254_253)",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    className: "logomark-animate",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "107.469",
                                            y: "199.301",
                                            width: "14.5784",
                                            height: "71.4846",
                                            transform: "rotate(179.9 107.469 199.301)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 28,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "106.959",
                                            y: "75.4922",
                                            width: "14",
                                            height: "75.9607",
                                            transform: "rotate(179.9 106.959 75.4922)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "143.756",
                                            y: "9.25391",
                                            width: "14.5784",
                                            height: "75.6694",
                                            transform: "rotate(29.36 143.756 9.25391)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "81.0488",
                                            y: "120.723",
                                            width: "14.5784",
                                            height: "72.1569",
                                            transform: "rotate(29.36 81.0488 120.723)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 31,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "182.494",
                                            y: "44.0703",
                                            width: "14.5784",
                                            height: "74.1255",
                                            transform: "rotate(59 182.494 44.0703)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "74.0938",
                                            y: "109.203",
                                            width: "14.5784",
                                            height: "73.7623",
                                            transform: "rotate(59 74.0938 109.203)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 33,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "154.41",
                                            y: "183.598",
                                            width: "14.5784",
                                            height: "72.0479",
                                            transform: "rotate(150.64 154.41 183.598)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 34,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "93.6016",
                                            y: "75.5156",
                                            width: "14.5784",
                                            height: "76.0357",
                                            transform: "rotate(150.64 93.6016 75.5156)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 35,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "189.061",
                                            y: "147.113",
                                            width: "14.5784",
                                            height: "74.0452",
                                            transform: "rotate(121 189.061 147.113)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 36,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "81.2207",
                                            y: "82.3086",
                                            width: "14.5784",
                                            height: "74.4117",
                                            transform: "rotate(121 81.2207 82.3086)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 37,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "126.053",
                                            y: "109.227",
                                            width: "14.5784",
                                            height: "73.8174",
                                            transform: "rotate(-90 126.053 109.227)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 38,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "0.0292969",
                                            y: "109.227",
                                            width: "14.5784",
                                            height: "73.8174",
                                            transform: "rotate(-90 0.0292969 109.227)",
                                            fill: "#fec007"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                            lineNumber: 39,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M125.99 109.126C126.647 106.523 126.998 103.645 126.998 100.492C126.998 85.3044 114.91 72.9922 99.998 72.9922C85.0864 72.9922 72.998 85.3044 72.998 100.492C72.998 103.65 73.3502 106.53 74.0083 109.137L100.005 82.6735L125.99 109.126Z",
                                fill: "#fec007"
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                                id: "clip0_2254_253",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    width: "200",
                                    height: "110",
                                    fill: "white",
                                    transform: "translate(0 -1)"
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                                id: "clip1_2254_253",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    width: "200",
                                    height: "205",
                                    fill: "white",
                                    transform: "translate(0.0292969 -0.96875)"
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/components/ui/zelp-text-reveal.js",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = ZelpLogo;
var _c;
__turbopack_context__.k.register(_c, "ZelpLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/LocationModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocationModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const POPULAR_CITIES = [
    {
        name: 'Mumbai',
        icon: '/icons/mumbai.png'
    },
    {
        name: 'Delhi-NCR',
        icon: '/icons/delhi.png'
    },
    {
        name: 'Bengaluru',
        icon: '/icons/bangalore.png'
    },
    {
        name: 'Hyderabad',
        icon: '/icons/hyderabad.png'
    },
    {
        name: 'Chandigarh',
        icon: '/icons/chandigarh.png'
    },
    {
        name: 'Ahmedabad',
        icon: '/icons/ahmedabad.png'
    },
    {
        name: 'Pune',
        icon: '/icons/pune.png'
    },
    {
        name: 'Chennai',
        icon: '/icons/chennai.png'
    },
    {
        name: 'Kolkata',
        icon: '/icons/kolkata.png'
    },
    {
        name: 'Kochi',
        icon: '/icons/kochi.png'
    },
    {
        name: 'Jaipur',
        icon: '/icons/jaipur.png'
    },
    {
        name: 'Lucknow',
        icon: '/icons/lucknow.png'
    },
    {
        name: 'Indore',
        icon: '/icons/indore.png'
    },
    {
        name: 'Bhopal',
        icon: '/icons/bhopal.png'
    },
    {
        name: 'Surat',
        icon: '/icons/surat.png'
    },
    {
        name: 'Nagpur',
        icon: '/icons/nagpur.png'
    },
    {
        name: 'Patna',
        icon: '/icons/patna.png'
    },
    {
        name: 'Ludhiana',
        icon: '/icons/ludhiana.png'
    },
    {
        name: 'Kanpur',
        icon: '/icons/kanpur.png'
    },
    {
        name: 'Agra',
        icon: '/icons/agra.png'
    },
    {
        name: 'Varanasi',
        icon: '/icons/varanasi.png'
    },
    {
        name: 'Visakhapatnam',
        icon: '/icons/vizag.png'
    },
    {
        name: 'Coimbatore',
        icon: '/icons/coimbatore.png'
    },
    {
        name: 'Thiruvananthapuram',
        icon: '/icons/trivandrum.png'
    }
];
function LocationModal({ isOpen, onClose, onSelectLocation, onDetectLocation }) {
    _s();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showAllCities, setShowAllCities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Prevent scrolling when modal is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LocationModal.useEffect": ()=>{
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
            return ({
                "LocationModal.useEffect": ()=>{
                    document.body.style.overflow = 'unset';
                }
            })["LocationModal.useEffect"];
        }
    }["LocationModal.useEffect"], [
        isOpen
    ]);
    if (!isOpen) return null;
    // Filter logic
    const filteredCities = POPULAR_CITIES.filter((city)=>city.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // Display logic: Show condensed list unless searching or expanded
    const citiesDisplay = searchTerm ? filteredCities : showAllCities ? POPULAR_CITIES : POPULAR_CITIES.slice(0, 15);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-content",
            style: {
                maxHeight: '90vh',
                overflowY: 'auto'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "modal-close",
                    style: {
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        zIndex: 10
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 24,
                        color: "#6b7280"
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/LocationModal.js",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client/src/components/LocationModal.js",
                    lineNumber: 61,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "search-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "search-icon",
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/LocationModal.js",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Search for your city",
                            value: searchTerm,
                            onChange: (e)=>setSearchTerm(e.target.value),
                            className: "search-input"
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/LocationModal.js",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/components/LocationModal.js",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>{
                        onDetectLocation();
                        onClose();
                    },
                    className: "detect-btn",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/LocationModal.js",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Detect my location"
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/LocationModal.js",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/components/LocationModal.js",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "popular-cities-title",
                            children: searchTerm ? 'Search Results' : 'Popular Cities'
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/LocationModal.js",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cities-grid",
                            children: filteredCities.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    gridColumn: '1 / -1',
                                    color: '#6b7280',
                                    padding: '2rem'
                                },
                                children: [
                                    'No cities found matching "',
                                    searchTerm,
                                    '"'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/components/LocationModal.js",
                                lineNumber: 101,
                                columnNumber: 17
                            }, this) : citiesDisplay.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (city.name !== 'Indore') {
                                            alert('Coming Soon to ' + city.name + '!');
                                            return;
                                        }
                                        onSelectLocation(city.name + ', India');
                                        onClose();
                                    },
                                    style: {
                                        opacity: city.name === 'Indore' ? 1 : 0.6,
                                        border: city.name === 'Indore' ? '1px solid #0c831f' : '1px solid #e5e7eb'
                                    },
                                    className: "city-item",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "city-icon-box",
                                            children: [
                                                city.name !== 'Indore' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: 'absolute',
                                                        top: 5,
                                                        right: 5
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                        size: 12,
                                                        color: "#9ca3af"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/src/components/LocationModal.js",
                                                        lineNumber: 124,
                                                        columnNumber: 104
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/LocationModal.js",
                                                    lineNumber: 124,
                                                    columnNumber: 48
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                    className: "city-icon",
                                                    size: 24,
                                                    color: city.name === 'Indore' ? '#0c831f' : "#9ca3af"
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/LocationModal.js",
                                                    lineNumber: 125,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/LocationModal.js",
                                            lineNumber: 123,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "city-name",
                                            style: {
                                                fontWeight: city.name === 'Indore' ? 'bold' : 'normal',
                                                color: city.name === 'Indore' ? '#0c831f' : 'inherit'
                                            },
                                            children: city.name
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/LocationModal.js",
                                            lineNumber: 127,
                                            columnNumber: 21
                                        }, this),
                                        city.name === 'Indore' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.7rem',
                                                color: '#0c831f',
                                                background: '#e6f4ea',
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                marginTop: '4px'
                                            },
                                            children: "Service Available"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/LocationModal.js",
                                            lineNumber: 130,
                                            columnNumber: 48
                                        }, this)
                                    ]
                                }, city.name, true, {
                                    fileName: "[project]/client/src/components/LocationModal.js",
                                    lineNumber: 106,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/LocationModal.js",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        !searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: '1.5rem'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "view-all-btn",
                                onClick: ()=>setShowAllCities(!showAllCities),
                                children: showAllCities ? 'Show Less' : 'View More Cities'
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/LocationModal.js",
                                lineNumber: 139,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/LocationModal.js",
                            lineNumber: 138,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/components/LocationModal.js",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/components/LocationModal.js",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/src/components/LocationModal.js",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(LocationModal, "pYXhy3PAlWyqowjGOVI0xxyO+Lg=");
_c = LocationModal;
var _c;
__turbopack_context__.k.register(_c, "LocationModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/SettingsModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/utils/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function SettingsModal({ isOpen, onClose }) {
    _s();
    const { user, login } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: ''
    });
    if (!isOpen || !user) return null;
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const apiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])();
        try {
            const res = await fetch(`${apiUrl}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    phone: user.phone // Phone is the key, ensure it's passed from current user state
                })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                // Update local auth context with new user data/token
                login({
                    ...data.user,
                    token: data.token
                });
                alert('Profile updated successfully!');
                onClose();
            } else {
                alert(data.message || 'Update failed');
            }
        } catch (err) {
            console.error('Update Error:', err);
            alert('Failed to update profile');
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: '1rem'
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: '#fff',
                width: '100%',
                maxWidth: '450px',
                borderRadius: '24px',
                padding: '2rem',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    style: {
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/SettingsModal.js",
                        lineNumber: 71,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client/src/components/SettingsModal.js",
                    lineNumber: 65,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    style: {
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1.5rem',
                        color: '#111827'
                    },
                    children: "Edit Profile"
                }, void 0, false, {
                    fileName: "[project]/client/src/components/SettingsModal.js",
                    lineNumber: 74,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                opacity: 0.7
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                    size: 18,
                                    style: {
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#9ca3af'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/SettingsModal.js",
                                    lineNumber: 82,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: formData.phone,
                                    disabled: true,
                                    style: {
                                        width: '100%',
                                        padding: '12px 12px 12px 40px',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        background: '#f9fafb',
                                        fontSize: '0.95rem',
                                        cursor: 'not-allowed'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/SettingsModal.js",
                                    lineNumber: 83,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '0.7rem',
                                        color: '#dc2626',
                                        marginLeft: '5px'
                                    },
                                    children: "Phone number cannot be changed"
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/SettingsModal.js",
                                    lineNumber: 90,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/SettingsModal.js",
                            lineNumber: 81,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                    size: 18,
                                    style: {
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#9ca3af'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/SettingsModal.js",
                                    lineNumber: 94,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "name",
                                    placeholder: "Full Name",
                                    required: true,
                                    value: formData.name,
                                    onChange: handleChange,
                                    style: {
                                        width: '100%',
                                        padding: '12px 12px 12px 40px',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        outline: 'none',
                                        fontSize: '0.95rem'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/SettingsModal.js",
                                    lineNumber: 95,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/SettingsModal.js",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                    size: 18,
                                    style: {
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#9ca3af'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/SettingsModal.js",
                                    lineNumber: 106,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    name: "email",
                                    placeholder: "Email Address",
                                    required: true,
                                    value: formData.email,
                                    onChange: handleChange,
                                    style: {
                                        width: '100%',
                                        padding: '12px 12px 12px 40px',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        outline: 'none',
                                        fontSize: '0.95rem'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/SettingsModal.js",
                                    lineNumber: 107,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/SettingsModal.js",
                            lineNumber: 105,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                    size: 18,
                                    style: {
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#9ca3af'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/SettingsModal.js",
                                    lineNumber: 118,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    name: "password",
                                    placeholder: "New Password (leave empty to keep current)",
                                    value: formData.password,
                                    onChange: handleChange,
                                    style: {
                                        width: '100%',
                                        padding: '12px 12px 12px 40px',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        outline: 'none',
                                        fontSize: '0.95rem'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/SettingsModal.js",
                                    lineNumber: 119,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/SettingsModal.js",
                            lineNumber: 117,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            style: {
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                border: 'none',
                                background: '#0c831f',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                marginTop: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            },
                            children: [
                                loading ? 'Saving...' : 'Save Changes',
                                !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/SettingsModal.js",
                                    lineNumber: 138,
                                    columnNumber: 38
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/SettingsModal.js",
                            lineNumber: 129,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/components/SettingsModal.js",
                    lineNumber: 78,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/components/SettingsModal.js",
            lineNumber: 59,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/src/components/SettingsModal.js",
        lineNumber: 54,
        columnNumber: 9
    }, this);
}
_s(SettingsModal, "U10LvYg97h+CeZ1ztY1ZUTSZ7HQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = SettingsModal;
var _c;
__turbopack_context__.k.register(_c, "SettingsModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/ProfileDropdown.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfileDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ProfileDropdown({ onOpenSettings }) {
    _s();
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfileDropdown.useEffect": ()=>{
            function handleClickOutside(event) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "ProfileDropdown.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["ProfileDropdown.useEffect"];
        }
    }["ProfileDropdown.useEffect"], []);
    if (!user) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: dropdownRef,
        style: {
            position: 'relative'
        },
        className: "jsx-122e0faccf684a2b",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setIsOpen(!isOpen),
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    transition: 'background 0.2s',
                    userSelect: 'none'
                },
                onMouseEnter: (e)=>e.currentTarget.style.background = '#f3f4f6',
                onMouseLeave: (e)=>e.currentTarget.style.background = 'transparent',
                className: "jsx-122e0faccf684a2b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#0c831f',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        },
                        className: "jsx-122e0faccf684a2b",
                        children: user.name.charAt(0).toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                        lineNumber: 39,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            lineHeight: 1.2
                        },
                        className: "jsx-122e0faccf684a2b" + " " + "hide-on-mobile",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                color: '#1f2937'
                            },
                            className: "jsx-122e0faccf684a2b",
                            children: [
                                "Hi, ",
                                user.name.split(' ')[0]
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/ProfileDropdown.js",
                            lineNumber: 46,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                        lineNumber: 45,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 14,
                        color: "#6b7280"
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                        lineNumber: 50,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/components/ProfileDropdown.js",
                lineNumber: 28,
                columnNumber: 13
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: '220px',
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #f3f4f6',
                    overflow: 'visible',
                    zIndex: 9999
                },
                className: "jsx-122e0faccf684a2b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: '-6px',
                            right: '12px',
                            width: '12px',
                            height: '12px',
                            background: '#fff',
                            transform: 'rotate(45deg)',
                            borderLeft: '1px solid #f3f4f6',
                            borderTop: '1px solid #f3f4f6',
                            zIndex: 1
                        },
                        className: "jsx-122e0faccf684a2b"
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                        lineNumber: 68,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative',
                            zIndex: 2,
                            background: '#fff',
                            borderRadius: '12px',
                            overflow: 'hidden'
                        },
                        className: "jsx-122e0faccf684a2b",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '12px 16px',
                                    borderBottom: '1px solid #f3f4f6',
                                    background: '#f9fafb'
                                },
                                className: "jsx-122e0faccf684a2b",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontWeight: '600',
                                            color: '#111827',
                                            fontSize: '0.95rem'
                                        },
                                        className: "jsx-122e0faccf684a2b",
                                        children: user.name
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                                        lineNumber: 83,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: '0.8rem',
                                            color: '#6b7280',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        },
                                        className: "jsx-122e0faccf684a2b",
                                        children: user.email || user.phone
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                                        lineNumber: 84,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/components/ProfileDropdown.js",
                                lineNumber: 82,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '4px'
                                },
                                className: "jsx-122e0faccf684a2b",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/bookings",
                                        onClick: ()=>setIsOpen(false),
                                        style: {
                                            textDecoration: 'none'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-122e0faccf684a2b" + " " + "dropdown-item",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/ProfileDropdown.js",
                                                    lineNumber: 90,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-122e0faccf684a2b",
                                                    children: "My Bookings"
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/ProfileDropdown.js",
                                                    lineNumber: 91,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/ProfileDropdown.js",
                                            lineNumber: 89,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                                        lineNumber: 88,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>{
                                            onOpenSettings();
                                            setIsOpen(false);
                                        },
                                        className: "jsx-122e0faccf684a2b" + " " + "dropdown-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/components/ProfileDropdown.js",
                                                lineNumber: 96,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-122e0faccf684a2b",
                                                children: "Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/components/ProfileDropdown.js",
                                                lineNumber: 97,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                                        lineNumber: 95,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: '1px',
                                            background: '#f3f4f6',
                                            margin: '4px 0'
                                        },
                                        className: "jsx-122e0faccf684a2b"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                                        lineNumber: 100,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>{
                                            logout();
                                            setIsOpen(false);
                                        },
                                        className: "jsx-122e0faccf684a2b" + " " + "dropdown-item logout",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/components/ProfileDropdown.js",
                                                lineNumber: 103,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-122e0faccf684a2b",
                                                children: "Logout"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/components/ProfileDropdown.js",
                                                lineNumber: 104,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                                        lineNumber: 102,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/components/ProfileDropdown.js",
                                lineNumber: 87,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/components/ProfileDropdown.js",
                        lineNumber: 81,
                        columnNumber: 21
                    }, this),
                    " "
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/components/ProfileDropdown.js",
                lineNumber: 55,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "122e0faccf684a2b",
                children: '.dropdown-item.jsx-122e0faccf684a2b{cursor:pointer;color:"#374151";border-radius:6px;align-items:center;gap:10px;padding:8px 12px;font-size:.9rem;font-weight:500;transition:all .2s;display:flex}.dropdown-item.jsx-122e0faccf684a2b:hover{color:#111827;background:#f3f4f6}.dropdown-item.logout.jsx-122e0faccf684a2b{color:#dc2626}.dropdown-item.logout.jsx-122e0faccf684a2b:hover{color:#ef4444;background:#fee2e2}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/components/ProfileDropdown.js",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
_s(ProfileDropdown, "IA3iCbdlyU3myNHIHuXAKub9CCk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ProfileDropdown;
var _c;
__turbopack_context__.k.register(_c, "ProfileDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/AuthModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/utils/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@react-oauth/google/dist/index.esm.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function AuthModal({ isOpen, onClose }) {
    _s();
    const { login } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // ... existing state ...
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('login'); // 'login' or 'register'
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [googlePendingToken, setGooglePendingToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load MSG91 script on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthModal.useEffect": ()=>{
            let scriptLoaded = false;
            const loadOtpScript = {
                "AuthModal.useEffect.loadOtpScript": (urls)=>{
                    let i = 0;
                    const attempt = {
                        "AuthModal.useEffect.loadOtpScript.attempt": ()=>{
                            if (scriptLoaded) return;
                            const s = document.createElement('script');
                            s.src = urls[i];
                            s.async = true;
                            s.onload = ({
                                "AuthModal.useEffect.loadOtpScript.attempt": ()=>{
                                    scriptLoaded = true;
                                }
                            })["AuthModal.useEffect.loadOtpScript.attempt"];
                            s.onerror = ({
                                "AuthModal.useEffect.loadOtpScript.attempt": ()=>{
                                    i++;
                                    if (i < urls.length) {
                                        attempt();
                                    }
                                }
                            })["AuthModal.useEffect.loadOtpScript.attempt"];
                            document.head.appendChild(s);
                        }
                    }["AuthModal.useEffect.loadOtpScript.attempt"];
                    attempt();
                }
            }["AuthModal.useEffect.loadOtpScript"];
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && !window.initSendOTP) {
                loadOtpScript([
                    'https://verify.msg91.com/otp-provider.js',
                    'https://verify.phone91.com/otp-provider.js'
                ]);
            }
        }
    }["AuthModal.useEffect"], []);
    if (!isOpen) return null;
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleOTPLogin = async ()=>{
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.initSendOTP) {
            try {
                setLoading(true);
                const apiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])();
                const configRes = await fetch(`${apiUrl}/api/auth/msg91-config`);
                const configData = await configRes.json();
                if (!configData.success || !configData.tokenAuth) {
                    throw new Error("Could not retrieve OTP widget configuration");
                }
                setLoading(false); // Widget will show its own UI
                const configuration = {
                    widgetId: configData.widgetId || "36627469635a363034323734",
                    tokenAuth: configData.tokenAuth,
                    identifier: "",
                    success: async (data)=>{
                        try {
                            setLoading(true);
                            const token = data.message || data;
                            const res = await fetch(`${apiUrl}/api/auth/msg91-login`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    token
                                })
                            });
                            const resData = await res.json();
                            if (res.ok && resData.success) {
                                login({
                                    ...resData.user,
                                    token: resData.token
                                });
                                onClose();
                            } else {
                                alert(resData.message || 'OTP Login Failed');
                            }
                        } catch (err) {
                            console.error('OTP Login Error:', err);
                            alert('OTP Login Failed');
                        } finally{
                            setLoading(false);
                        }
                    },
                    failure: (error)=>{
                        console.error('OTP failure reason', JSON.stringify(error));
                        alert('OTP Widget Failed to Initialize: ' + (error.message || JSON.stringify(error)));
                    }
                };
                window.initSendOTP(configuration);
            } catch (error) {
                console.error("Config fetch error:", error);
                alert("Failed to initialize OTP service");
                setLoading(false);
            }
        } else {
            alert('OTP Service is still loading. Please try again in a moment.');
        }
    };
    const handleGoogleSuccess = async (credentialResponse)=>{
        try {
            setLoading(true);
            const apiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])();
            const res = await fetch(`${apiUrl}/api/auth/google-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: credentialResponse.credential
                })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                login({
                    ...data.user,
                    token: data.token
                });
                onClose();
            } else if (data.requiresPhone) {
                // User is new and needs to provide phone number
                setGooglePendingToken(credentialResponse.credential);
                setActiveTab('google-phone');
                setFormData({
                    ...formData,
                    phone: ''
                }); // Reset phone field
            // alert(data.message); // REMOVED ALERT for seamless transition
            } else {
                alert(data.message || 'Google Login Failed');
            }
        } catch (err) {
            console.error('Google Auth Error:', err);
            alert('Google Login Failed');
        } finally{
            setLoading(false);
        }
    };
    const handleGooglePhoneSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const apiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])();
        try {
            const res = await fetch(`${apiUrl}/api/auth/google-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: googlePendingToken,
                    phone: formData.phone
                })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                login({
                    ...data.user,
                    token: data.token
                });
                onClose();
            } else {
                alert(data.message || 'Registration Failed');
            }
        } catch (err) {
            console.error('Google Phone Submit Error:', err);
            alert('Failed to complete registration');
        } finally{
            setLoading(false);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const apiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])();
        try {
            const res = await fetch(`${apiUrl}/api/auth/phone-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    is_login: activeTab === 'login'
                })
            });
            let data;
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await res.json();
            } else {
                const text = await res.text();
                throw new Error(`Server error: ${res.status}`);
            }
            if (res.ok && data.success) {
                login({
                    ...data.user,
                    token: data.token
                });
                onClose(); // Close modal on success
            } else {
                alert(data.message || "Authentication Failed");
            }
        } catch (err) {
            console.error("Auth Error:", err);
            alert(`Error: ${err.message}`);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        },
        onClick: onClose,
        className: "jsx-74ae01b9c3aeb5aa",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '100%',
                    maxWidth: '400px',
                    background: '#fff',
                    borderRadius: '24px',
                    padding: '2rem',
                    position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'modalSlideUp 0.3s ease-out'
                },
                onClick: (e)=>e.stopPropagation(),
                className: "jsx-74ae01b9c3aeb5aa",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        style: {
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            background: '#f3f4f6',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#6b7280'
                        },
                        className: "jsx-74ae01b9c3aeb5aa",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/AuthModal.js",
                            lineNumber: 248,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/AuthModal.js",
                        lineNumber: 239,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            marginBottom: '2rem'
                        },
                        className: "jsx-74ae01b9c3aeb5aa",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: '#111827',
                                    marginBottom: '0.5rem'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: activeTab === 'login' ? 'Welcome Back' : activeTab === 'register' ? 'Create Account' : 'Complete Profile'
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 252,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#6b7280',
                                    fontSize: '0.9rem'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: activeTab === 'login' ? 'Sign in to access your bookings' : activeTab === 'register' ? 'Join Zelp for premium healthcare' : 'Please enter your phone number to continue'
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 255,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/components/AuthModal.js",
                        lineNumber: 251,
                        columnNumber: 17
                    }, this),
                    activeTab !== 'google-phone' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            background: '#f3f4f6',
                            padding: '4px',
                            borderRadius: '12px',
                            marginBottom: '1.5rem'
                        },
                        className: "jsx-74ae01b9c3aeb5aa",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('login'),
                                style: {
                                    flex: 1,
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: activeTab === 'login' ? '#fff' : 'transparent',
                                    color: activeTab === 'login' ? '#111827' : '#6b7280',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: activeTab === 'login' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: "Login"
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 266,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('register'),
                                style: {
                                    flex: 1,
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: activeTab === 'register' ? '#fff' : 'transparent',
                                    color: activeTab === 'register' ? '#111827' : '#6b7280',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: activeTab === 'register' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: "Register"
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 278,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/components/AuthModal.js",
                        lineNumber: 263,
                        columnNumber: 21
                    }, this),
                    activeTab !== 'google-phone' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            alignItems: 'center',
                            marginBottom: '1.5rem'
                        },
                        className: "jsx-74ae01b9c3aeb5aa",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleOTPLogin,
                                disabled: loading,
                                style: {
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: '1px solid #e5e7eb',
                                    background: '#fff',
                                    color: '#111827',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontSize: '0.95rem'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/AuthModal.js",
                                        lineNumber: 317,
                                        columnNumber: 29
                                    }, this),
                                    "Login with OTP"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 296,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleLogin"], {
                                onSuccess: handleGoogleSuccess,
                                onError: ()=>{
                                    console.log('Login Failed');
                                    alert('Google Login Failed');
                                },
                                theme: "filled_blue",
                                shape: "pill",
                                text: activeTab === 'login' ? "signin_with" : "signup_with"
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 321,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/components/AuthModal.js",
                        lineNumber: 295,
                        columnNumber: 21
                    }, this),
                    activeTab !== 'google-phone' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            margin: '0 0 1.5rem 0',
                            color: '#9ca3af',
                            fontSize: '0.8rem'
                        },
                        className: "jsx-74ae01b9c3aeb5aa",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: '1px',
                                    background: '#e5e7eb'
                                },
                                className: "jsx-74ae01b9c3aeb5aa"
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 336,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    padding: '0 10px'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: "OR"
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 337,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    height: '1px',
                                    background: '#e5e7eb'
                                },
                                className: "jsx-74ae01b9c3aeb5aa"
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 338,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/components/AuthModal.js",
                        lineNumber: 335,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: activeTab === 'google-phone' ? handleGooglePhoneSubmit : handleSubmit,
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        },
                        className: "jsx-74ae01b9c3aeb5aa",
                        children: [
                            activeTab === 'register' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'relative'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        size: 18,
                                        style: {
                                            position: 'absolute',
                                            left: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#9ca3af'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/AuthModal.js",
                                        lineNumber: 347,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "name",
                                        placeholder: "Full Name",
                                        required: true,
                                        value: formData.name,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '12px 12px 12px 40px',
                                            borderRadius: '12px',
                                            border: '1px solid #e5e7eb',
                                            outline: 'none',
                                            fontSize: '0.95rem'
                                        },
                                        className: "jsx-74ae01b9c3aeb5aa"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/AuthModal.js",
                                        lineNumber: 348,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 346,
                                columnNumber: 25
                            }, this),
                            activeTab !== 'google-phone' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'relative'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                        size: 18,
                                        style: {
                                            position: 'absolute',
                                            left: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#9ca3af'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/AuthModal.js",
                                        lineNumber: 361,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        name: "email",
                                        placeholder: "Email Address",
                                        required: true,
                                        value: formData.email,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '12px 12px 12px 40px',
                                            borderRadius: '12px',
                                            border: '1px solid #e5e7eb',
                                            outline: 'none',
                                            fontSize: '0.95rem'
                                        },
                                        className: "jsx-74ae01b9c3aeb5aa"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/AuthModal.js",
                                        lineNumber: 362,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 360,
                                columnNumber: 25
                            }, this),
                            (activeTab === 'register' || activeTab === 'google-phone') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'relative'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                        size: 18,
                                        style: {
                                            position: 'absolute',
                                            left: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#9ca3af'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/AuthModal.js",
                                        lineNumber: 376,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "tel",
                                        name: "phone",
                                        placeholder: "Phone Number",
                                        required: true,
                                        value: formData.phone,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '12px 12px 12px 40px',
                                            borderRadius: '12px',
                                            border: '1px solid #e5e7eb',
                                            outline: 'none',
                                            fontSize: '0.95rem'
                                        },
                                        className: "jsx-74ae01b9c3aeb5aa"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/AuthModal.js",
                                        lineNumber: 377,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 375,
                                columnNumber: 25
                            }, this),
                            activeTab !== 'google-phone' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'relative'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        size: 18,
                                        style: {
                                            position: 'absolute',
                                            left: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#9ca3af'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/AuthModal.js",
                                        lineNumber: 390,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        name: "password",
                                        placeholder: "Password",
                                        required: true,
                                        value: formData.password,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '12px 12px 12px 40px',
                                            borderRadius: '12px',
                                            border: '1px solid #e5e7eb',
                                            outline: 'none',
                                            fontSize: '0.95rem'
                                        },
                                        className: "jsx-74ae01b9c3aeb5aa"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/AuthModal.js",
                                        lineNumber: 391,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 389,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: loading,
                                style: {
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: '#0c831f',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    marginTop: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: [
                                    loading ? 'Processing...' : activeTab === 'login' ? 'Sign In' : activeTab === 'register' ? 'Create Account' : 'Complete Registration',
                                    !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/AuthModal.js",
                                        lineNumber: 411,
                                        columnNumber: 38
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 402,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/components/AuthModal.js",
                        lineNumber: 342,
                        columnNumber: 17
                    }, this),
                    activeTab !== 'google-phone' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            textAlign: 'center',
                            marginTop: '1.5rem',
                            fontSize: '0.85rem',
                            color: '#6b7280'
                        },
                        className: "jsx-74ae01b9c3aeb5aa",
                        children: [
                            activeTab === 'login' ? "Don't have an account? " : "Already have an account? ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                onClick: ()=>setActiveTab(activeTab === 'login' ? 'register' : 'login'),
                                style: {
                                    color: '#0c831f',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                },
                                className: "jsx-74ae01b9c3aeb5aa",
                                children: activeTab === 'login' ? 'Register Now' : 'Login'
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/AuthModal.js",
                                lineNumber: 418,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/components/AuthModal.js",
                        lineNumber: 416,
                        columnNumber: 21
                    }, this),
                    activeTab === 'google-phone' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            textAlign: 'center',
                            marginTop: '1.5rem',
                            fontSize: '0.85rem',
                            color: '#6b7280'
                        },
                        className: "jsx-74ae01b9c3aeb5aa",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            onClick: ()=>{
                                setActiveTab('login');
                                setGooglePendingToken(null);
                            },
                            style: {
                                color: '#6b7280',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px'
                            },
                            className: "jsx-74ae01b9c3aeb5aa",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/AuthModal.js",
                                    lineNumber: 436,
                                    columnNumber: 28
                                }, this),
                                " Cancel"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/AuthModal.js",
                            lineNumber: 429,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/AuthModal.js",
                        lineNumber: 428,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/components/AuthModal.js",
                lineNumber: 229,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "74ae01b9c3aeb5aa",
                children: "@keyframes modalSlideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/components/AuthModal.js",
        lineNumber: 222,
        columnNumber: 9
    }, this);
}
_s(AuthModal, "C1tbDcl/HeAJ1Ai4qYrbQpC11pk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuthModal;
var _c;
__turbopack_context__.k.register(_c, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/ui/SterlingGateKineticNavigation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SterlingGateKineticNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>"); // Using Lucide icons for standard look
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function SterlingGateKineticNavigation() {
    _s();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Handle Overflow and Floating Elements
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SterlingGateKineticNavigation.useEffect": ()=>{
            const floatingGroups = document.querySelectorAll(".payment-reminder-float");
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
                // Hide floating elements
                floatingGroups.forEach({
                    "SterlingGateKineticNavigation.useEffect": (el)=>el.style.display = 'none'
                }["SterlingGateKineticNavigation.useEffect"]);
            } else {
                document.body.style.overflow = '';
                // Show floating elements
                floatingGroups.forEach({
                    "SterlingGateKineticNavigation.useEffect": (el)=>el.style.display = ''
                }["SterlingGateKineticNavigation.useEffect"]);
            }
            return ({
                "SterlingGateKineticNavigation.useEffect": ()=>{
                    document.body.style.overflow = '';
                    floatingGroups.forEach({
                        "SterlingGateKineticNavigation.useEffect": (el)=>el.style.display = ''
                    }["SterlingGateKineticNavigation.useEffect"]);
                }
            })["SterlingGateKineticNavigation.useEffect"];
        }
    }["SterlingGateKineticNavigation.useEffect"], [
        isMenuOpen
    ]);
    // Handle Escape Key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SterlingGateKineticNavigation.useEffect": ()=>{
            const handleEsc = {
                "SterlingGateKineticNavigation.useEffect.handleEsc": (e)=>{
                    if (e.key === "Escape" && isMenuOpen) {
                        setIsMenuOpen(false);
                    }
                }
            }["SterlingGateKineticNavigation.useEffect.handleEsc"];
            window.addEventListener("keydown", handleEsc);
            return ({
                "SterlingGateKineticNavigation.useEffect": ()=>window.removeEventListener("keydown", handleEsc)
            })["SterlingGateKineticNavigation.useEffect"];
        }
    }["SterlingGateKineticNavigation.useEffect"], [
        isMenuOpen
    ]);
    const toggleMenu = ()=>setIsMenuOpen((prev)=>!prev);
    const closeMenu = ()=>setIsMenuOpen(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-8b98695054731ca7" + " " + "mobile-nav-root",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-8b98695054731ca7" + " " + "nav-toggle-wrapper show-on-mobile",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: toggleMenu,
                    "aria-label": "Toggle Menu",
                    className: "jsx-8b98695054731ca7" + " " + "nav-btn",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                        size: 28,
                        color: "#111827"
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                        lineNumber: 52,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                    lineNumber: 51,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                lineNumber: 50,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-8b98695054731ca7" + " " + `fullscreen-menu-container ${isMenuOpen ? 'open' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: closeMenu,
                        className: "jsx-8b98695054731ca7" + " " + "overlay"
                    }, void 0, false, {
                        fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "jsx-8b98695054731ca7" + " " + "menu-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeMenu,
                                "aria-label": "Close Menu",
                                className: "jsx-8b98695054731ca7" + " " + "close-btn",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 28,
                                    color: "#111827"
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                                    lineNumber: 62,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-8b98695054731ca7" + " " + "menu-links",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "nav-link",
                                        onClick: closeMenu,
                                        children: "Home"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                                        lineNumber: 66,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/hospitals",
                                        className: "nav-link",
                                        onClick: closeMenu,
                                        children: "Services"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this),
                                    user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/bookings",
                                                className: "nav-link",
                                                onClick: closeMenu,
                                                children: "My Bookings"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                                                lineNumber: 71,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    logout();
                                                    closeMenu();
                                                },
                                                className: "jsx-8b98695054731ca7" + " " + "nav-link logout-btn",
                                                children: "Logout"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                                                lineNumber: 72,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-8b98695054731ca7" + " " + "nav-link guest",
                                        children: "Guest User"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                                        lineNumber: 77,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "8b98695054731ca7",
                children: ".nav-toggle-wrapper.jsx-8b98695054731ca7{z-index:1001;position:relative}.nav-btn.jsx-8b98695054731ca7{cursor:pointer;background:0 0;border:none;justify-content:center;align-items:center;padding:8px;display:flex}.fullscreen-menu-container.jsx-8b98695054731ca7{z-index:99999;pointer-events:none;visibility:hidden;width:100vw;height:100vh;transition:visibility .3s;position:fixed;top:0;left:0}.fullscreen-menu-container.open.jsx-8b98695054731ca7{pointer-events:auto;visibility:visible}.overlay.jsx-8b98695054731ca7{opacity:0;background:#00000080;transition:opacity .3s;position:absolute;inset:0}.fullscreen-menu-container.open.jsx-8b98695054731ca7 .overlay.jsx-8b98695054731ca7{opacity:1}.menu-content.jsx-8b98695054731ca7{background:#fff;flex-direction:column;width:80%;max-width:300px;height:100%;padding:2rem;transition:transform .3s ease-out;display:flex;position:absolute;top:0;right:0;transform:translate(100%);box-shadow:-5px 0 25px #0000001a}.fullscreen-menu-container.open.jsx-8b98695054731ca7 .menu-content.jsx-8b98695054731ca7{transform:translate(0)}.close-btn.jsx-8b98695054731ca7{cursor:pointer;background:0 0;border:none;align-self:flex-end;margin-bottom:2rem;padding:8px}.menu-links.jsx-8b98695054731ca7{flex-direction:column;gap:1.5rem;display:flex}.nav-link.jsx-8b98695054731ca7{color:#111827;border-bottom:1px solid #f3f4f6;padding-bottom:.5rem;font-size:1.5rem;font-weight:600;text-decoration:none}.logout-btn.jsx-8b98695054731ca7{text-align:left;color:#ef4444;cursor:pointer;background:0 0;border:none;border-bottom:1px solid #f3f4f6;font-family:inherit}.guest.jsx-8b98695054731ca7{color:#9ca3af}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/components/ui/SterlingGateKineticNavigation.js",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(SterlingGateKineticNavigation, "2iRIpUaqIm4WFGUEUGZWBIDyw8o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SterlingGateKineticNavigation;
var _c;
__turbopack_context__.k.register(_c, "SterlingGateKineticNavigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/Navbar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/LocationContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$CartContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/CartContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$text$2d$reveal$2d$animation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/ui/text-reveal-animation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$zelp$2d$text$2d$reveal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/ui/zelp-text-reveal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$LocationModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/LocationModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$SettingsModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/SettingsModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ProfileDropdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/ProfileDropdown.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$AuthModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/AuthModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$SterlingGateKineticNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/ui/SterlingGateKineticNavigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
function Navbar() {
    _s();
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { location, setLocation, detectLocation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    const { setIsCartOpen, cartCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$CartContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [locationModalOpen, setLocationModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authModalOpen, setAuthModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsModalOpen, setSettingsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    height: 'var(--header-height)',
                    background: '#fff',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container nav-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "show-on-mobile",
                            style: {
                                marginRight: '1rem'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$SterlingGateKineticNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/client/src/components/Navbar.js",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/Navbar.js",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    style: {
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '1.8rem',
                                            fontWeight: '800',
                                            color: '#000',
                                            letterSpacing: '-1.5px',
                                            fontFamily: 'var(--font-outfit), sans-serif',
                                            lineHeight: 1
                                        },
                                        children: "Zelp"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/Navbar.js",
                                        lineNumber: 42,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/Navbar.js",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hide-on-mobile",
                                    style: {
                                        position: 'relative'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setLocationModalOpen(true),
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            cursor: 'pointer',
                                            padding: '0.5rem',
                                            borderRadius: '8px',
                                            background: 'transparent',
                                            transition: 'background 0.2s'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.background = '#f3f4f6',
                                        onMouseLeave: (e)=>e.currentTarget.style.background = 'transparent',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                size: 18,
                                                color: "#0c831f"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/components/Navbar.js",
                                                lineNumber: 60,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontWeight: 'bold',
                                                    fontSize: '0.9rem',
                                                    color: '#1f2937',
                                                    maxWidth: '200px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                },
                                                children: location || 'Select Location'
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/components/Navbar.js",
                                                lineNumber: 61,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                size: 16,
                                                color: "#1f2937"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/components/Navbar.js",
                                                lineNumber: 64,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/src/components/Navbar.js",
                                        lineNumber: 51,
                                        columnNumber: 20
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/Navbar.js",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/Navbar.js",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hide-on-mobile",
                            style: {
                                display: 'flex',
                                gap: '2rem',
                                alignItems: 'center',
                                marginRight: '2rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    style: {
                                        fontWeight: '500',
                                        color: '#1f2937'
                                    },
                                    children: "Home"
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/Navbar.js",
                                    lineNumber: 71,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/hospitals",
                                    style: {
                                        fontWeight: '500',
                                        color: '#1f2937'
                                    },
                                    children: "Services"
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/Navbar.js",
                                    lineNumber: 72,
                                    columnNumber: 14
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/Navbar.js",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hide-on-mobile",
                                    style: {
                                        display: 'flex',
                                        gap: '1.5rem',
                                        alignItems: 'center'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hide-on-mobile",
                                        style: {
                                            display: 'flex',
                                            gap: '1.5rem',
                                            alignItems: 'center'
                                        },
                                        children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ProfileDropdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            onOpenSettings: ()=>setSettingsModalOpen(true)
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/Navbar.js",
                                            lineNumber: 80,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setAuthModalOpen(true),
                                            style: {
                                                background: 'transparent',
                                                border: '1px solid #0c831f',
                                                color: '#0c831f',
                                                padding: '8px 20px',
                                                borderRadius: '8px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            },
                                            onMouseEnter: (e)=>{
                                                e.currentTarget.style.background = '#0c831f';
                                                e.currentTarget.style.color = '#fff';
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.color = '#0c831f';
                                            },
                                            children: "Login / Sign Up"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/Navbar.js",
                                            lineNumber: 82,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/Navbar.js",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/Navbar.js",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-primary",
                                    onClick: ()=>setIsCartOpen(true),
                                    style: {
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '0.5rem 1rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/Navbar.js",
                                            lineNumber: 104,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hide-on-mobile",
                                            children: "My Cart"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/Navbar.js",
                                            lineNumber: 105,
                                            columnNumber: 19
                                        }, this),
                                        cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                background: '#fff',
                                                color: '#ff6f61',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold'
                                            },
                                            children: cartCount
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/Navbar.js",
                                            lineNumber: 107,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/src/components/Navbar.js",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "show-on-mobile",
                                    children: user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setMobileMenuOpen(true),
                                        style: {
                                            fontSize: '0.9rem',
                                            color: '#0c831f',
                                            fontWeight: '500',
                                            cursor: 'pointer'
                                        },
                                        children: user.name.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/Navbar.js",
                                        lineNumber: 120,
                                        columnNumber: 23
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/Navbar.js",
                                    lineNumber: 118,
                                    columnNumber: 16
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/Navbar.js",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/components/Navbar.js",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/src/components/Navbar.js",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$LocationModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: locationModalOpen,
                onClose: ()=>setLocationModalOpen(false),
                onDetectLocation: detectLocation,
                onSelectLocation: (city)=>setLocation(city)
            }, void 0, false, {
                fileName: "[project]/client/src/components/Navbar.js",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$AuthModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: authModalOpen,
                onClose: ()=>setAuthModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/client/src/components/Navbar.js",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$SettingsModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: settingsModalOpen,
                onClose: ()=>setSettingsModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/client/src/components/Navbar.js",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Navbar, "i7hOXceQVB0jKtUosolzvMKJisI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$CartContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/BookingModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookingModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/LocationContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$AuthModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/AuthModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/utils/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function BookingModal({ isOpen, onClose, service }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { location } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1); // 1: Selection, 2: Payment, 3: Success
    const [selectedLab, setSelectedLab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedTime, setSelectedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transactionId, setTransactionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [authModalOpen, setAuthModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paymentMode, setPaymentMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // 'online' or 'hospital'
    const [labs, setLabs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [fetchingLabs, setFetchingLabs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bookingId, setBookingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [guestName, setGuestName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [guestPhone, setGuestPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingModal.useEffect": ()=>{
            if (isOpen && service) {
                setStep(1);
                setSelectedTime(null);
                if (service.directBooking) {
                    setSelectedLab(service);
                    setLabs([]);
                } else {
                    fetchLabs(service.name, service.hospital_id);
                }
            }
        }
    }["BookingModal.useEffect"], [
        isOpen,
        service
    ]);
    const fetchLabs = async (serviceName, preselectedId)=>{
        setFetchingLabs(true);
        try {
            const apiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])();
            const cleanName = serviceName.split(' at ')[0];
            const res = await fetch(`${apiUrl}/api/services?search=${encodeURIComponent(cleanName)}`);
            if (res.ok) {
                const data = await res.json();
                const list = Array.isArray(data) ? data : data.data || [];
                // Sort by discount
                const sorted = list.sort((a, b)=>{
                    const discA = (a.price - a.discount_price) / a.price || 0;
                    const discB = (b.price - b.discount_price) / b.price || 0;
                    return discB - discA;
                });
                // Deduplicate
                const uniqueLabs = [];
                const seenIds = new Set();
                for (const item of sorted){
                    const uniqueKey = item.hospital_id || item.hospitalId || `${item.hospital_name}-${item.hospital_location}`;
                    if (uniqueKey) {
                        if (!seenIds.has(uniqueKey)) {
                            seenIds.add(uniqueKey);
                            uniqueLabs.push(item);
                        }
                    } else {
                        uniqueLabs.push(item);
                    }
                }
                setLabs(uniqueLabs.map((l)=>({
                        ...l,
                        price: parseFloat(l.discount_price || l.price),
                        mrp: parseFloat(l.price)
                    })));
                if (preselectedId) {
                    const found = uniqueLabs.find((l)=>l.hospital_id && l.hospital_id == preselectedId || l.hospitalId && l.hospitalId == preselectedId || l.id && l.id == preselectedId);
                    if (found) {
                        setSelectedLab({
                            ...found,
                            price: parseFloat(found.discount_price || found.price),
                            mrp: parseFloat(found.price)
                        });
                    }
                }
            }
        } catch (err) {
            console.error(err);
        } finally{
            setFetchingLabs(false);
        }
    };
    if (!isOpen || !service) return null;
    const currentService = selectedLab;
    const displayPrice = currentService ? currentService.price : 0;
    const displayMrp = currentService ? currentService.mrp || currentService.price : 0;
    const TIME_SLOTS = [
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM"
    ];
    const finalizeBooking = async (paymentMethod = 'online')=>{
        const currentTxnId = paymentMethod === 'hospital' ? 'PAY_AT_HOSPITAL' : transactionId;
        if (paymentMethod !== 'hospital' && (!currentTxnId || currentTxnId.length < 6)) {
            alert('Please enter a valid Transaction ID');
            return;
        }
        setLoading(true);
        try {
            const apiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])();
            let res;
            if (bookingId && paymentMethod === 'online') {
                // Scenario: User confirmed "Pay at Hospital" first, then clicked "Pay Online Now"
                res = await fetch(`${apiUrl}/api/bookings/${bookingId}/pay`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        transactionId: currentTxnId
                    })
                });
            } else {
                // Standard new booking flow
                const bookingData = {
                    name: user?.name || guestName || 'Guest User',
                    userPhone: user?.phone || guestPhone || '',
                    age: 0,
                    gender: 'Not Specified',
                    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    time: selectedTime,
                    address: location || 'India',
                    serviceName: currentService.name,
                    price: displayPrice,
                    hospitalId: currentService.hospital_id || currentService.id,
                    transactionId: currentTxnId
                };
                res = await fetch(`${apiUrl}/api/bookings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookingData)
                });
            }
            if (res.ok) {
                const data = await res.json();
                if (data.bookingId) {
                    setBookingId(data.bookingId);
                }
                setStep(3); // Always show success step now
            } else {
                alert('Booking Failed: ' + (await res.text() || 'Unknown Error'));
            }
        } catch (err) {
            console.error(err);
            alert('Error creating booking');
        } finally{
            setLoading(false);
        }
    };
    const handlePayOnline = ()=>{
        if (!user && (!guestName || !guestPhone)) {
            alert('Please enter your details first');
            return;
        }
        if (!selectedLab || !selectedTime) return;
        setPaymentMode('online');
        setStep(2);
    };
    const handlePayAtHospital = ()=>{
        if (!user && (!guestName || !guestPhone)) {
            alert('Please enter your details first');
            return;
        }
        if (!selectedLab || !selectedTime) return;
        setPaymentMode('hospital');
        finalizeBooking('hospital');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 2000,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: '95%',
                        maxWidth: '480px',
                        background: '#fff',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        maxHeight: '92vh',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        position: 'relative'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '1.5rem',
                                borderBottom: '1px solid #f3f4f6',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: '#fff'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontSize: '1.2rem',
                                        fontWeight: '800',
                                        color: '#111827'
                                    },
                                    children: step === 1 ? 'Schedule Appointment' : step === 2 ? 'Complete Payment' : 'Success'
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/BookingModal.js",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    style: {
                                        background: '#f3f4f6',
                                        border: 'none',
                                        borderRadius: '50%',
                                        padding: '6px',
                                        cursor: 'pointer',
                                        color: '#6b7280',
                                        display: 'flex'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/components/BookingModal.js",
                                        lineNumber: 211,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/BookingModal.js",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/BookingModal.js",
                            lineNumber: 206,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                padding: '1.5rem',
                                overflowY: 'auto'
                            },
                            children: [
                                step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '2rem'
                                    },
                                    children: [
                                        !user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: '#f9fafb',
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                border: '1px solid #e5e7eb'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        marginBottom: '1rem'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            size: 18,
                                                            color: "#ff6f61"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 225,
                                                            columnNumber: 34
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontWeight: '700',
                                                                color: '#374151'
                                                            },
                                                            children: "Your Details"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 226,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 224,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr',
                                                        gap: '10px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "Full Name",
                                                            value: guestName,
                                                            onChange: (e)=>setGuestName(e.target.value),
                                                            style: {
                                                                padding: '10px',
                                                                borderRadius: '8px',
                                                                border: '1px solid #d1d5db',
                                                                outline: 'none'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 229,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "tel",
                                                            placeholder: "Phone Number",
                                                            value: guestPhone,
                                                            onChange: (e)=>setGuestPhone(e.target.value),
                                                            style: {
                                                                padding: '10px',
                                                                borderRadius: '8px',
                                                                border: '1px solid #d1d5db',
                                                                outline: 'none'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 236,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 228,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 223,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        marginBottom: '1rem'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                            size: 18,
                                                            color: "#ff6f61"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 250,
                                                            columnNumber: 30
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontWeight: '700',
                                                                color: '#374151'
                                                            },
                                                            children: "Date & Time"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 251,
                                                            columnNumber: 30
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 249,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        background: '#f9fafb',
                                                        padding: '10px 15px',
                                                        borderRadius: '12px',
                                                        marginBottom: '1rem',
                                                        border: '1px solid #f3f4f6',
                                                        fontSize: '0.9rem',
                                                        color: '#4b5563'
                                                    },
                                                    children: [
                                                        "Tomorrow, ",
                                                        new Date(Date.now() + 86400000).toDateString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 253,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                                                        gap: '8px'
                                                    },
                                                    children: TIME_SLOTS.map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setSelectedTime(slot),
                                                            style: {
                                                                padding: '10px 5px',
                                                                borderRadius: '10px',
                                                                border: selectedTime === slot ? '2px solid #ff6f61' : '1px solid #e5e7eb',
                                                                background: selectedTime === slot ? '#fff5f4' : '#fff',
                                                                color: selectedTime === slot ? '#ff6f61' : '#4b5563',
                                                                fontWeight: '600',
                                                                cursor: 'pointer',
                                                                fontSize: '0.85rem',
                                                                transition: 'all 0.2s'
                                                            },
                                                            children: slot
                                                        }, slot, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 259,
                                                            columnNumber: 33
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 257,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 248,
                                            columnNumber: 21
                                        }, this),
                                        !service.directBooking ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        marginBottom: '1rem'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                                            size: 18,
                                                            color: "#ff6f61"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 281,
                                                            columnNumber: 34
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontWeight: '700',
                                                                color: '#374151'
                                                            },
                                                            children: "Select Hospital (Sorted by Discount)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 282,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 280,
                                                    columnNumber: 29
                                                }, this),
                                                fetchingLabs ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: 'center',
                                                        padding: '1.5rem',
                                                        color: '#9ca3af'
                                                    },
                                                    children: "Finding best deals..."
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 286,
                                                    columnNumber: 33
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '10px'
                                                    },
                                                    children: labs.map((lab)=>{
                                                        const isSelected = selectedLab?.id === lab.id || selectedLab?.hospital_id === lab.hospital_id;
                                                        const discountPercent = Math.round((lab.mrp - lab.price) / lab.mrp * 100);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            onClick: ()=>setSelectedLab(lab),
                                                            style: {
                                                                padding: '1rem',
                                                                borderRadius: '16px',
                                                                border: isSelected ? '2px solid #ff6f61' : '1px solid #f3f4f6',
                                                                background: isSelected ? '#fff5f4' : '#fff',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                gap: '12px',
                                                                alignItems: 'center',
                                                                boxShadow: isSelected ? '0 10px 15px -3px rgba(255, 111, 97, 0.1)' : 'none',
                                                                transition: 'all 0.2s'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        width: '50px',
                                                                        height: '50px',
                                                                        borderRadius: '10px',
                                                                        overflow: 'hidden',
                                                                        background: '#f3f4f6',
                                                                        flexShrink: 0
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(lab.hospital_image || lab.image_url) || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=100&q=80",
                                                                        alt: lab.hospital_name,
                                                                        style: {
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'cover'
                                                                        },
                                                                        onError: (e)=>e.target.src = "https://images.unsplash.com/photo-1586773860418-d3b97898c75c?auto=format&fit=crop&w=100&q=80"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client/src/components/BookingModal.js",
                                                                        lineNumber: 306,
                                                                        columnNumber: 54
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                                    lineNumber: 305,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        flex: 1
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontWeight: '800',
                                                                                fontSize: '0.95rem',
                                                                                color: '#111827',
                                                                                marginBottom: '2px'
                                                                            },
                                                                            children: lab.hospital_name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                                            lineNumber: 315,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: '0.8rem',
                                                                                color: '#6b7280',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: '4px'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                                    size: 12
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                                                    lineNumber: 317,
                                                                                    columnNumber: 57
                                                                                }, this),
                                                                                " ",
                                                                                lab.hospital_location
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                                            lineNumber: 316,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        discountPercent > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                marginTop: '6px',
                                                                                width: 'fit-content',
                                                                                background: '#dcfce7',
                                                                                color: '#166534',
                                                                                px: '8px',
                                                                                py: '2px',
                                                                                borderRadius: '6px',
                                                                                fontSize: '0.75rem',
                                                                                fontWeight: '700',
                                                                                padding: '2px 8px'
                                                                            },
                                                                            children: [
                                                                                discountPercent,
                                                                                "% OFF"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                                            lineNumber: 320,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                                    lineNumber: 314,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        textAlign: 'right'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: '1.2rem',
                                                                                fontWeight: '800',
                                                                                color: isSelected ? '#ff6f61' : '#111827'
                                                                            },
                                                                            children: [
                                                                                "₹",
                                                                                lab.price
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                                            lineNumber: 326,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        lab.mrp > lab.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: '0.85rem',
                                                                                textDecoration: 'line-through',
                                                                                color: '#9ca3af'
                                                                            },
                                                                            children: [
                                                                                "₹",
                                                                                lab.mrp
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                                            lineNumber: 328,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                                    lineNumber: 325,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, lab.id, true, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 294,
                                                            columnNumber: 45
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 288,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 279,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: '#f0fdf4',
                                                border: '1px solid #bcf0da',
                                                padding: '1.2rem',
                                                borderRadius: '16px',
                                                display: 'flex',
                                                gap: '12px',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: '48px',
                                                        height: '48px',
                                                        background: '#fff',
                                                        borderRadius: '10px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                                        size: 24,
                                                        color: "#059669"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/src/components/BookingModal.js",
                                                        lineNumber: 343,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 342,
                                                    columnNumber: 30
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '0.8rem',
                                                                color: '#047857',
                                                                fontWeight: 'bold',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.5px'
                                                            },
                                                            children: "Selected Hospital"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 346,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '1.1rem',
                                                                fontWeight: '800',
                                                                color: '#064e3b'
                                                            },
                                                            children: service.hospital_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 347,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 345,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 338,
                                            columnNumber: 25
                                        }, this),
                                        selectedLab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '1rem',
                                                background: '#f8fafc',
                                                borderRadius: '16px',
                                                padding: '1rem',
                                                border: '1px solid #e2e8f0'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontSize: '0.9rem',
                                                        marginBottom: '6px',
                                                        color: '#64748b'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Service Cost"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 356,
                                                            columnNumber: 34
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                textDecoration: 'line-through'
                                                            },
                                                            children: [
                                                                "₹",
                                                                displayMrp
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 357,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 355,
                                                    columnNumber: 30
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontSize: '0.9rem',
                                                        marginBottom: '10px',
                                                        color: '#059669',
                                                        fontWeight: '600'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "suvidha discount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 360,
                                                            columnNumber: 34
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "-₹",
                                                                displayMrp - displayPrice
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 361,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 359,
                                                    columnNumber: 30
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontSize: 'clamp(0.9rem, 4vw, 1.1rem)',
                                                        fontWeight: '800',
                                                        borderTop: '1px dashed #cbd5e1',
                                                        paddingTop: '10px',
                                                        color: '#1e293b'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Total to Pay"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 364,
                                                            columnNumber: 34
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "₹",
                                                                displayPrice
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 365,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 363,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 354,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/src/components/BookingModal.js",
                                    lineNumber: 219,
                                    columnNumber: 17
                                }, this),
                                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '1rem 0'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: 'center',
                                                marginBottom: '2rem'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        color: '#64748b',
                                                        fontSize: '0.95rem',
                                                        marginBottom: '1.5rem'
                                                    },
                                                    children: [
                                                        "Scan QR with any UPI app to pay ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            children: [
                                                                "₹",
                                                                displayPrice
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/client/src/components/BookingModal.js",
                                                            lineNumber: 376,
                                                            columnNumber: 61
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 375,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: 'clamp(180px, 60vw, 240px)',
                                                        height: 'clamp(180px, 60vw, 240px)',
                                                        margin: '0 auto',
                                                        padding: '12px',
                                                        background: '#fff',
                                                        border: '2px solid #f3f4f6',
                                                        borderRadius: '20px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])('/uploads/Qr.jpg'),
                                                        alt: "Payment QR",
                                                        style: {
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'contain'
                                                        },
                                                        onError: (e)=>{
                                                            e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=suvidha@okaxis&pn=Suvidha&cu=INR";
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/src/components/BookingModal.js",
                                                        lineNumber: 385,
                                                        columnNumber: 30
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 379,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 374,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '2rem'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        display: 'block',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '700',
                                                        color: '#1f2937',
                                                        marginBottom: '8px'
                                                    },
                                                    children: "UTR / Transaction ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 397,
                                                    columnNumber: 26
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Enter 12-digit transaction ID",
                                                    value: transactionId,
                                                    onChange: (e)=>setTransactionId(e.target.value),
                                                    style: {
                                                        width: '100%',
                                                        padding: '1rem',
                                                        borderRadius: '12px',
                                                        border: '2px solid #f3f4f6',
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                        outline: 'none',
                                                        transition: 'border-color 0.2s'
                                                    },
                                                    onFocus: (e)=>e.target.style.borderColor = '#ff6f61',
                                                    onBlur: (e)=>e.target.style.borderColor = '#f3f4f6'
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 400,
                                                    columnNumber: 26
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: '0.75rem',
                                                        color: '#9ca3af',
                                                        marginTop: '8px',
                                                        lineHeight: '1.4'
                                                    },
                                                    children: "Enter the transaction ID after successful payment to confirm your booking."
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 413,
                                                    columnNumber: 26
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 396,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/src/components/BookingModal.js",
                                    lineNumber: 373,
                                    columnNumber: 17
                                }, this),
                                step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'center',
                                        padding: '3rem 1rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: '80px',
                                                height: '80px',
                                                background: '#dcfce7',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 1.5rem'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                size: 48,
                                                color: "#059669"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/components/BookingModal.js",
                                                lineNumber: 423,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 422,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontSize: '1.8rem',
                                                fontWeight: '900',
                                                marginBottom: '1rem',
                                                color: '#111827'
                                            },
                                            children: "Confirmed!"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 425,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: '#64748b',
                                                lineHeight: '1.6',
                                                fontSize: '1rem'
                                            },
                                            children: [
                                                "Your appointment at ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: selectedLab?.hospital_name
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 427,
                                                    columnNumber: 45
                                                }, this),
                                                " is scheduled for ",
                                                selectedTime,
                                                ", tomorrow."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 426,
                                            columnNumber: 21
                                        }, this),
                                        paymentMode === 'hospital' && transactionId !== 'PAY_AT_HOSPITAL' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '1.5rem',
                                                background: '#f8fafc',
                                                padding: '1rem',
                                                borderRadius: '16px',
                                                border: '1px solid #e2e8f0'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: '0.9rem',
                                                        color: '#475569',
                                                        marginBottom: '12px'
                                                    },
                                                    children: "Would you like to complete your payment online now?"
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 432,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setStep(2),
                                                    style: {
                                                        background: '#0c831f',
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '10px 20px',
                                                        borderRadius: '10px',
                                                        fontWeight: '700',
                                                        cursor: 'pointer',
                                                        fontSize: '0.9rem'
                                                    },
                                                    children: "Pay Online Now"
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/components/BookingModal.js",
                                                    lineNumber: 435,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 431,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                marginTop: '1rem',
                                                fontSize: '0.85rem',
                                                color: '#9ca3af'
                                            },
                                            children: [
                                                "Transaction ID: ",
                                                transactionId || 'PAY_AT_HOSPITAL'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 443,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onClose,
                                            style: {
                                                marginTop: '2.5rem',
                                                width: '100%',
                                                background: '#111827',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '1rem',
                                                borderRadius: '14px',
                                                fontWeight: '700',
                                                cursor: 'pointer'
                                            },
                                            children: "DONE"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 448,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/src/components/BookingModal.js",
                                    lineNumber: 421,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/BookingModal.js",
                            lineNumber: 216,
                            columnNumber: 9
                        }, this),
                        step < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '1.5rem',
                                borderTop: '1px solid #f3f4f6',
                                background: '#fff'
                            },
                            children: [
                                step === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '12px',
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handlePayAtHospital,
                                            disabled: loading || !selectedTime || !selectedLab || !user && (!guestName || !guestPhone),
                                            style: {
                                                flex: 1,
                                                background: '#fff',
                                                color: selectedTime && selectedLab ? '#ff6f61' : '#e5e7eb',
                                                border: `2px solid ${selectedTime && selectedLab ? '#ff6f61' : '#e5e7eb'}`,
                                                padding: '1rem',
                                                borderRadius: '16px',
                                                fontWeight: '800',
                                                fontSize: '1rem',
                                                cursor: selectedTime && selectedLab ? 'pointer' : 'not-allowed',
                                                transition: 'all 0.3s'
                                            },
                                            children: "Pay at Hospital"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 464,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handlePayOnline,
                                            disabled: loading || !selectedTime || !selectedLab || !user && (!guestName || !guestPhone),
                                            style: {
                                                flex: 1,
                                                background: selectedTime && selectedLab ? '#ff6f61' : '#e5e7eb',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '1rem 0.5rem',
                                                borderRadius: '16px',
                                                fontWeight: '800',
                                                fontSize: 'clamp(0.8rem, 3.5vw, 1rem)',
                                                cursor: selectedTime && selectedLab ? 'pointer' : 'not-allowed',
                                                boxShadow: selectedTime && selectedLab ? '0 10px 15px -3px rgba(255, 111, 97, 0.3)' : 'none',
                                                transition: 'all 0.3s'
                                            },
                                            children: "Pay Online"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/components/BookingModal.js",
                                            lineNumber: 482,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/src/components/BookingModal.js",
                                    lineNumber: 463,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: finalizeBooking,
                                    disabled: loading || !transactionId,
                                    style: {
                                        width: '100%',
                                        background: transactionId ? '#ff6f61' : '#e5e7eb',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '1rem',
                                        borderRadius: '16px',
                                        fontWeight: '800',
                                        fontSize: '1.1rem',
                                        cursor: transactionId ? 'pointer' : 'not-allowed',
                                        boxShadow: transactionId ? '0 10px 15px -3px rgba(255, 111, 97, 0.3)' : 'none',
                                        transition: 'all 0.3s'
                                    },
                                    children: loading ? 'Processing...' : 'Confirm Payment & Book'
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/BookingModal.js",
                                    lineNumber: 503,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        textAlign: 'center',
                                        fontSize: '0.75rem',
                                        color: '#9ca3af',
                                        marginTop: '12px'
                                    },
                                    children: step === 1 ? 'Select payment method to proceed' : 'Step 2 of 2 • Secure payment verification'
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/BookingModal.js",
                                    lineNumber: 524,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/BookingModal.js",
                            lineNumber: 461,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/components/BookingModal.js",
                    lineNumber: 197,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/src/components/BookingModal.js",
                lineNumber: 192,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$AuthModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: authModalOpen,
                onClose: ()=>setAuthModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/client/src/components/BookingModal.js",
                lineNumber: 531,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true);
}
_s(BookingModal, "yDZu5XP4vm9IqcIGNJwIcnYud3U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"]
    ];
});
_c = BookingModal;
var _c;
__turbopack_context__.k.register(_c, "BookingModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/hospitals/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hospitals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$Navbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/Navbar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$BookingModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/BookingModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/smile.js [app-client] (ecmascript) <export default as Smile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/LocationContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$CartContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/CartContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/utils/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function HospitalsContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { city } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { addToCart, setIsCartOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$CartContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const categoryFilter = searchParams.get('category');
    const specialtyFilter = searchParams.get('specialty');
    const querySearch = searchParams.get('search');
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(querySearch || '');
    const [selectedHospital, setSelectedHospital] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hospitals, setHospitals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [expandedId, setExpandedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch SERVICES
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HospitalsContent.useEffect": ()=>{
            const fetchServices = {
                "HospitalsContent.useEffect.fetchServices": async ()=>{
                    try {
                        const apiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])();
                        let url = `${apiUrl}/api/services`;
                        if (categoryFilter) url += `?category=${categoryFilter}`;
                        const res = await fetch(url);
                        const data = await res.json();
                        // Handle both flattened array and paginated object formats
                        const servicesArray = Array.isArray(data) ? data : data && Array.isArray(data.data) ? data.data : [];
                        setHospitals(servicesArray);
                        setLoading(false);
                    } catch (err) {
                        console.error(err);
                        setLoading(false);
                    }
                }
            }["HospitalsContent.useEffect.fetchServices"];
            fetchServices();
        }
    }["HospitalsContent.useEffect"], [
        categoryFilter
    ]);
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const filteredHospitals = hospitals.filter((h)=>{
        const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = !specialtyFilter || h.name.toLowerCase().includes(specialtyFilter.toLowerCase()) || h.category && h.category.toLowerCase() === specialtyFilter.toLowerCase();
        return matchesSearch && matchesSpecialty;
    }).sort((a, b)=>{
        if (!sortOrder) return 0;
        const priceA = a.discount_price || a.price;
        const priceB = b.discount_price || b.price;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
    const toggleSort = ()=>{
        setSortOrder((prev)=>prev === 'asc' ? 'desc' : 'asc');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            paddingBottom: '100px',
            background: '#fff',
            minHeight: '100vh',
            fontFamily: 'var(--font-outfit)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$Navbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/client/src/app/hospitals/page.js",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container",
                style: {
                    paddingTop: 'calc(var(--header-height) + 2rem)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '2rem'
                        },
                        children: [
                            selectedHospital && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: '#fff',
                                    borderBottom: '1px solid #e5e7eb',
                                    padding: '10px 0',
                                    marginBottom: '20px',
                                    flexWrap: 'wrap',
                                    gap: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            background: '#f3f4f6',
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.9rem'
                                        },
                                        children: [
                                            selectedHospital.name,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 14,
                                                style: {
                                                    cursor: 'pointer'
                                                },
                                                onClick: ()=>setSelectedHospital(null)
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/app/hospitals/page.js",
                                                lineNumber: 92,
                                                columnNumber: 50
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                        lineNumber: 91,
                                        columnNumber: 22
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px',
                                            flex: 1,
                                            justifyContent: 'flex-end',
                                            minWidth: '200px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: 'right'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '0.8rem',
                                                            color: '#6b7280'
                                                        },
                                                        children: "1 item added"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                                        lineNumber: 96,
                                                        columnNumber: 30
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: 'bold'
                                                        },
                                                        children: [
                                                            "₹",
                                                            selectedHospital.price
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                                        lineNumber: 97,
                                                        columnNumber: 30
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/src/app/hospitals/page.js",
                                                lineNumber: 95,
                                                columnNumber: 26
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "btn btn-primary",
                                                style: {
                                                    padding: '0.5rem 1.5rem',
                                                    background: '#ff6f61',
                                                    border: 'none'
                                                },
                                                onClick: ()=>{
                                                    setIsCartOpen(true);
                                                    setSelectedHospital(null);
                                                },
                                                children: "Go to cart"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/app/hospitals/page.js",
                                                lineNumber: 99,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                        lineNumber: 94,
                                        columnNumber: 22
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/app/hospitals/page.js",
                                lineNumber: 86,
                                columnNumber: 18
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "search-bar-container",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            borderRight: '1px solid #e5e7eb',
                                            paddingRight: '1rem',
                                            color: '#374151',
                                            minWidth: '120px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                size: 18,
                                                color: "#db2777"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/app/hospitals/page.js",
                                                lineNumber: 109,
                                                columnNumber: 21
                                            }, this),
                                            " ",
                                            city || 'Detecting'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                        lineNumber: 108,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        size: 20,
                                        color: "#9ca3af"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                        lineNumber: 111,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search for MRI, Blood Test, etc.",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value),
                                        style: {
                                            border: 'none',
                                            outline: 'none',
                                            width: '100%',
                                            fontSize: '1rem',
                                            color: '#374151'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                        lineNumber: 112,
                                        columnNumber: 18
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/app/hospitals/page.js",
                                lineNumber: 107,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/hospitals/page.js",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    !searchTerm && !specialtyFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '3rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    marginBottom: '1.5rem',
                                    fontSize: '1.1rem',
                                    color: '#374151'
                                },
                                children: "Popular Categories"
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/hospitals/page.js",
                                lineNumber: 125,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                                    gap: '0.8rem'
                                },
                                children: [
                                    {
                                        name: 'Cardiology',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                            size: 24,
                                            color: "#ff6b6b"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 128,
                                            columnNumber: 53
                                        }, this)
                                    },
                                    {
                                        name: 'X-Ray',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                            size: 24,
                                            color: "#54a0ff"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 129,
                                            columnNumber: 48
                                        }, this)
                                    },
                                    {
                                        name: 'MRI',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                            size: 24,
                                            color: "#5f27cd"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 130,
                                            columnNumber: 46
                                        }, this)
                                    },
                                    {
                                        name: 'Blood Test',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                            size: 24,
                                            color: "#ff9f43"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 131,
                                            columnNumber: 53
                                        }, this)
                                    },
                                    {
                                        name: 'Dental',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
                                            size: 24,
                                            color: "#10ac84"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 132,
                                            columnNumber: 49
                                        }, this)
                                    },
                                    {
                                        name: 'Eye Check',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                            size: 24,
                                            color: "#2e86de"
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 133,
                                            columnNumber: 52
                                        }, this)
                                    }
                                ].map((cat, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setSearchTerm(cat.name),
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '1rem',
                                            background: '#f9fafb',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            border: '1px solid #f3f4f6',
                                            transition: 'all 0.2s'
                                        },
                                        onMouseOver: (e)=>{
                                            e.currentTarget.style.borderColor = '#db2777';
                                            e.currentTarget.style.background = '#fff0f5';
                                        },
                                        onMouseOut: (e)=>{
                                            e.currentTarget.style.borderColor = '#f3f4f6';
                                            e.currentTarget.style.background = '#f9fafb';
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#fff',
                                                    padding: '10px',
                                                    borderRadius: '50%',
                                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                                },
                                                children: cat.icon
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/app/hospitals/page.js",
                                                lineNumber: 146,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '0.9rem',
                                                    fontWeight: '500',
                                                    color: '#4b5563',
                                                    textAlign: 'center'
                                                },
                                                children: cat.name
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/app/hospitals/page.js",
                                                lineNumber: 149,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                        lineNumber: 135,
                                        columnNumber: 25
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/hospitals/page.js",
                                lineNumber: 126,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/hospitals/page.js",
                        lineNumber: 124,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "filters-container",
                        style: {
                            marginBottom: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontSize: '1.4rem',
                                            color: '#111827',
                                            fontWeight: 'bold'
                                        },
                                        children: searchTerm ? `Results for "${searchTerm}"` : specialtyFilter ? `${specialtyFilter} Services` : categoryFilter ? `${categoryFilter === 'Lab' ? 'Pathology' : categoryFilter === 'Scan' ? 'Radiology' : categoryFilter} Services` : 'All Available Services'
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                        lineNumber: 159,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#6b7280',
                                            fontSize: '0.9rem'
                                        },
                                        children: [
                                            filteredHospitals.length,
                                            " result(s) found"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                        lineNumber: 169,
                                        columnNumber: 18
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/app/hospitals/page.js",
                                lineNumber: 158,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "filters-actions",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn",
                                    onClick: toggleSort,
                                    style: {
                                        background: sortOrder ? '#f0fdf4' : '#fff',
                                        border: sortOrder ? '1px solid #0c831f' : '1px solid #e5e7eb',
                                        borderRadius: '20px',
                                        padding: '6px 16px',
                                        fontSize: '0.85rem',
                                        color: sortOrder ? '#0c831f' : '#374151'
                                    },
                                    children: [
                                        "Sort By Price ",
                                        sortOrder === 'asc' ? '(Low to High)' : sortOrder === 'desc' ? '(High to Low)' : '',
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                                            size: 12,
                                            style: {
                                                marginLeft: '6px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 178,
                                            columnNumber: 122
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/src/app/hospitals/page.js",
                                    lineNumber: 173,
                                    columnNumber: 18
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/hospitals/page.js",
                                lineNumber: 172,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/hospitals/page.js",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '1.2rem'
                        },
                        children: filteredHospitals.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '1.5rem',
                                        flex: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '1rem'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            style: {
                                                                fontSize: '1.1rem',
                                                                fontWeight: '700',
                                                                color: '#1f2937',
                                                                marginBottom: '4px'
                                                            },
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                                            lineNumber: 197,
                                                            columnNumber: 30
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: '0.85rem',
                                                                color: '#6b7280',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '4px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client/src/app/hospitals/page.js",
                                                                    lineNumber: 201,
                                                                    columnNumber: 34
                                                                }, this),
                                                                " ",
                                                                item.hospital_name || 'Hospital'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                                            lineNumber: 200,
                                                            columnNumber: 30
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client/src/app/hospitals/page.js",
                                                    lineNumber: 196,
                                                    columnNumber: 26
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '8px',
                                                        background: `url('${(0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(item.image_url) || ''}') center/cover no-repeat`,
                                                        backgroundColor: '#f3f4f6'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/app/hospitals/page.js",
                                                    lineNumber: 204,
                                                    columnNumber: 26
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 195,
                                            columnNumber: 22
                                        }, this),
                                        item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: '0.9rem',
                                                color: '#4b5563',
                                                marginBottom: '1rem',
                                                lineHeight: '1.4',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            },
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 212,
                                            columnNumber: 26
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                fontSize: '0.85rem',
                                                color: '#6b7280',
                                                marginBottom: '1.5rem'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: '#f3f4f6',
                                                        padding: '4px 8px',
                                                        borderRadius: '4px'
                                                    },
                                                    children: "Reports in 24hrs"
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/app/hospitals/page.js",
                                                    lineNumber: 218,
                                                    columnNumber: 26
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: '#f3f4f6',
                                                        padding: '4px 8px',
                                                        borderRadius: '4px'
                                                    },
                                                    children: "E-Report Available"
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/app/hospitals/page.js",
                                                    lineNumber: 219,
                                                    columnNumber: 26
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 217,
                                            columnNumber: 22
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                borderTop: '1px dashed #e5e7eb',
                                                paddingTop: '1rem',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: item.discount_price && item.discount_price < item.price ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '1.2rem',
                                                                    fontWeight: 'bold',
                                                                    color: '#111827'
                                                                },
                                                                children: [
                                                                    "₹",
                                                                    item.discount_price
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/src/app/hospitals/page.js",
                                                                lineNumber: 226,
                                                                columnNumber: 38
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '0.9rem',
                                                                    textDecoration: 'line-through',
                                                                    color: '#9ca3af',
                                                                    marginLeft: '6px'
                                                                },
                                                                children: [
                                                                    "₹",
                                                                    item.price
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/client/src/app/hospitals/page.js",
                                                                lineNumber: 227,
                                                                columnNumber: 38
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                                        lineNumber: 225,
                                                        columnNumber: 34
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '1.2rem',
                                                            fontWeight: 'bold',
                                                            color: '#111827'
                                                        },
                                                        children: [
                                                            "₹",
                                                            item.price
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/client/src/app/hospitals/page.js",
                                                        lineNumber: 230,
                                                        columnNumber: 34
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/app/hospitals/page.js",
                                                    lineNumber: 223,
                                                    columnNumber: 26
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        const price = parseFloat(item.discount_price || item.price);
                                                        const mrp = parseFloat(item.price);
                                                        addToCart({
                                                            ...item,
                                                            quantity: 1,
                                                            hospitalId: item.hospital_id || item.id,
                                                            price,
                                                            mrp
                                                        });
                                                        setSelectedHospital({
                                                            ...item,
                                                            name: item.name,
                                                            price,
                                                            mrp,
                                                            directBooking: true
                                                        });
                                                    },
                                                    className: "btn",
                                                    style: {
                                                        background: '#fff',
                                                        border: '1px solid #ff6f61',
                                                        color: '#ff6f61',
                                                        padding: '0.6rem 1.5rem',
                                                        borderRadius: '8px',
                                                        fontWeight: '600',
                                                        transition: 'all 0.2s'
                                                    },
                                                    onMouseOver: (e)=>{
                                                        e.currentTarget.style.background = '#ff6f61';
                                                        e.currentTarget.style.color = '#fff';
                                                    },
                                                    onMouseOut: (e)=>{
                                                        e.currentTarget.style.background = '#fff';
                                                        e.currentTarget.style.color = '#ff6f61';
                                                    },
                                                    children: "ADD"
                                                }, void 0, false, {
                                                    fileName: "[project]/client/src/app/hospitals/page.js",
                                                    lineNumber: 233,
                                                    columnNumber: 26
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/src/app/hospitals/page.js",
                                            lineNumber: 222,
                                            columnNumber: 22
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/src/app/hospitals/page.js",
                                    lineNumber: 194,
                                    columnNumber: 18
                                }, this)
                            }, item.uniqueId || item.id, false, {
                                fileName: "[project]/client/src/app/hospitals/page.js",
                                lineNumber: 186,
                                columnNumber: 14
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/hospitals/page.js",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    filteredHospitals.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            padding: '4rem',
                            color: '#6b7280'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: [
                                    'No services found matching "',
                                    searchTerm,
                                    '".'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/app/hospitals/page.js",
                                lineNumber: 255,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: 'Try searching for "MRI", "CBC", "X-Ray", etc.'
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/hospitals/page.js",
                                lineNumber: 256,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/hospitals/page.js",
                        lineNumber: 254,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/app/hospitals/page.js",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$BookingModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: !!selectedHospital,
                onClose: ()=>setSelectedHospital(null),
                service: selectedHospital
            }, void 0, false, {
                fileName: "[project]/client/src/app/hospitals/page.js",
                lineNumber: 262,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/app/hospitals/page.js",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(HospitalsContent, "b5AR658JA0hbRz1UCTP8AQdG2qU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$CartContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = HospitalsContent;
function Hospitals() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            style: {
                paddingTop: '100px'
            },
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/client/src/app/hospitals/page.js",
            lineNumber: 273,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HospitalsContent, {}, void 0, false, {
            fileName: "[project]/client/src/app/hospitals/page.js",
            lineNumber: 274,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/src/app/hospitals/page.js",
        lineNumber: 273,
        columnNumber: 5
    }, this);
}
_c1 = Hospitals;
var _c, _c1;
__turbopack_context__.k.register(_c, "HospitalsContent");
__turbopack_context__.k.register(_c1, "Hospitals");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=client_src_dbfcbcff._.js.map