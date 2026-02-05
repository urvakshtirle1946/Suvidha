(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/text-reveal-animation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextReveal",
    ()=>TextReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function TextReveal({ word, textColor, brandYellow }) {
    const WORD = word || "Suvidha";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'inline-block'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "reveal-h1",
                style: {
                    margin: 0,
                    padding: 0
                },
                children: WORD.split("").map((char, i)=>{
                    let charColor = textColor || 'var(--brand)';
                    if (WORD === "Suvidha" && i < 2) {
                        charColor = brandYellow || 'var(--brand-yellow)';
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: charColor,
                            animationDelay: `calc(0.08s * ${i})`
                        },
                        children: char === " " ? "\u00A0" : char
                    }, i, false, {
                        fileName: "[project]/src/components/ui/text-reveal-animation.js",
                        lineNumber: 17,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ui/text-reveal-animation.js",
                lineNumber: 9,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/text-reveal-animation.js",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/text-reveal-animation.js",
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
"[project]/src/components/Navbar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/LocationContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$text$2d$reveal$2d$animation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/text-reveal-animation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$36EXAXVP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/clerk-react/dist/chunk-36EXAXVP.mjs [app-client] (ecmascript)");
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
function Navbar() {
    _s();
    const { location } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
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
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container",
                style: {
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                style: {
                                    textDecoration: 'none'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$text$2d$reveal$2d$animation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextReveal"], {
                                    word: "Suvidha"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.js",
                                    lineNumber: 37,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 36,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontWeight: 'bold',
                                                fontSize: '0.95rem',
                                                color: '#1f2937',
                                                maxWidth: '250px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            },
                                            children: location || 'Detecting Location...'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.js",
                                            lineNumber: 43,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            size: 16,
                                            color: "#1f2937"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.js",
                                            lineNumber: 46,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Navbar.js",
                                    lineNumber: 42,
                                    columnNumber: 20
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.js",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '2rem',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                style: {
                                    fontWeight: '500',
                                    color: '#1f2937'
                                },
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 53,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/hospitals",
                                style: {
                                    fontWeight: '500',
                                    color: '#1f2937'
                                },
                                children: "Services"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 54,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.js",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '1.5rem',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedOut"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    style: {
                                        textDecoration: 'none'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: {
                                            background: 'transparent',
                                            border: 'none',
                                            fontWeight: '500',
                                            fontSize: '1.1rem',
                                            cursor: 'pointer',
                                            color: '#374151'
                                        },
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 61,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.js",
                                    lineNumber: 60,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedIn"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/bookings",
                                        style: {
                                            textDecoration: 'none',
                                            color: '#374151',
                                            fontSize: '1rem',
                                            fontWeight: '500'
                                        },
                                        children: "My Bookings"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 70,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$36EXAXVP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserButton"], {}, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 73,
                                        columnNumber: 18
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary",
                                style: {
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '0.6rem 1.2rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 77,
                                        columnNumber: 19
                                    }, this),
                                    " My Cart"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.js",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Navbar.js",
                lineNumber: 27,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Navbar.js",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
_s(Navbar, "AKZHNuMdCWykZnpsFD5XyKaB+s8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/donut-chart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DonutChart",
    ()=>DonutChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const DonutChart = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = _s(({ data, totalValue: propTotalValue, size = 200, strokeWidth = 20, animationDuration = 1, animationDelayPerSegment = 0.05, highlightOnHover = true, centerContent, onSegmentHover, className, ...props }, ref)=>{
    _s();
    const [hoveredSegment, setHoveredSegment] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const internalTotalValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DonutChart.useMemo[internalTotalValue]": ()=>propTotalValue || data.reduce({
                "DonutChart.useMemo[internalTotalValue]": (sum, segment)=>sum + segment.value
            }["DonutChart.useMemo[internalTotalValue]"], 0)
    }["DonutChart.useMemo[internalTotalValue]"], [
        data,
        propTotalValue
    ]);
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    let cumulativePercentage = 0;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "DonutChart.useEffect": ()=>{
            onSegmentHover?.(hoveredSegment);
        }
    }["DonutChart.useEffect"], [
        hoveredSegment,
        onSegmentHover
    ]);
    const handleMouseLeave = ()=>{
        setHoveredSegment(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex items-center justify-center", className),
        style: {
            width: size,
            height: size
        },
        onMouseLeave: handleMouseLeave,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: `0 0 ${size} ${size}`,
                className: "overflow-visible -rotate-90",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: size / 2,
                        cy: size / 2,
                        r: radius,
                        fill: "transparent",
                        stroke: "rgba(0,0,0,0.05)",
                        strokeWidth: strokeWidth
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/donut-chart.js",
                        lineNumber: 58,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: data.map((segment, index)=>{
                            if (segment.value === 0) return null;
                            const percentage = internalTotalValue === 0 ? 0 : segment.value / internalTotalValue * 100;
                            const strokeDasharray = `${percentage / 100 * circumference} ${circumference}`;
                            const strokeDashoffset = cumulativePercentage / 100 * circumference;
                            const isActive = hoveredSegment?.label === segment.label;
                            cumulativePercentage += percentage;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                                cx: size / 2,
                                cy: size / 2,
                                r: radius,
                                fill: "transparent",
                                stroke: segment.color,
                                strokeWidth: strokeWidth,
                                strokeDasharray: strokeDasharray,
                                strokeDashoffset: -strokeDashoffset,
                                strokeLinecap: "round",
                                initial: {
                                    opacity: 0,
                                    strokeDashoffset: circumference
                                },
                                animate: {
                                    opacity: 1,
                                    strokeDashoffset: -strokeDashoffset
                                },
                                transition: {
                                    opacity: {
                                        duration: 0.3,
                                        delay: index * animationDelayPerSegment
                                    },
                                    strokeDashoffset: {
                                        duration: animationDuration,
                                        delay: index * animationDelayPerSegment,
                                        ease: "easeOut"
                                    }
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("origin-center transition-transform duration-200", highlightOnHover && "cursor-pointer"),
                                style: {
                                    filter: isActive ? `drop-shadow(0px 0px 6px ${segment.color}) brightness(1.1)` : 'none',
                                    transform: isActive ? 'scale(1.03)' : 'scale(1)',
                                    transition: "filter 0.2s ease-out, transform 0.2s ease-out"
                                },
                                onMouseEnter: ()=>setHoveredSegment(segment)
                            }, segment.label || index, false, {
                                fileName: "[project]/src/components/ui/donut-chart.js",
                                lineNumber: 84,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/donut-chart.js",
                        lineNumber: 67,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/donut-chart.js",
                lineNumber: 52,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            centerContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute flex flex-col items-center justify-center pointer-events-none",
                style: {
                    width: size - strokeWidth * 2.5,
                    height: size - strokeWidth * 2.5
                },
                children: centerContent
            }, void 0, false, {
                fileName: "[project]/src/components/ui/donut-chart.js",
                lineNumber: 127,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/donut-chart.js",
        lineNumber: 45,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "iEhXyaziWJNbzWe2pbiUCIXcgtc=")), "iEhXyaziWJNbzWe2pbiUCIXcgtc=");
_c1 = DonutChart;
DonutChart.displayName = "DonutChart";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "DonutChart$React.forwardRef");
__turbopack_context__.k.register(_c1, "DonutChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BookingModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookingModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/LocationContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$donut$2d$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/donut-chart.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function BookingModal({ isOpen, onClose, service }) {
    _s();
    const { user, login } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { location } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // 0: Select Lab, 1: Select Time, 2: Checkout, 3: Success
    const [selectedLab, setSelectedLab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedTime, setSelectedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Labs/Hospitals from API
    const [labs, setLabs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load Labs/Hospitals on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingModal.useEffect": ()=>{
            fetch('http://localhost:5000/api/hospitals').then({
                "BookingModal.useEffect": (res)=>res.json()
            }["BookingModal.useEffect"]).then({
                "BookingModal.useEffect": (data)=>setLabs(data)
            }["BookingModal.useEffect"]).catch({
                "BookingModal.useEffect": (err)=>console.error(err)
            }["BookingModal.useEffect"]);
        }
    }["BookingModal.useEffect"], []);
    if (!isOpen || !service) return null;
    const displayPrice = selectedLab ? Math.round(service.price * (1 - (selectedLab.discount_percentage || 0) / 100)) : service.price;
    const displayMrp = service.price * 1.5; // Mock MRP calculation
    const priceBreakdown = [
        {
            value: Math.round(displayPrice * 0.85),
            color: "#ff6f61",
            label: "Lab Charges"
        },
        {
            value: Math.round(displayPrice * 0.10),
            color: "#4ECDC4",
            label: "Platform Fee"
        },
        {
            value: Math.round(displayPrice * 0.05),
            color: "#45B7D1",
            label: "Taxes"
        }
    ];
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
    // Handle Lab Selection
    const handleLabSelect = (lab)=>{
        setSelectedLab(lab);
        setStep(1); // Move to time slot selection
    };
    const handleBooking = async ()=>{
        // Only require login at the final "Pay" step
        if (!user) {
            login();
            return;
        }
        try {
            const bookingData = {
                name: user.name || 'User',
                userPhone: user.phone || '',
                age: 0,
                gender: 'Not Specified',
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                time: selectedTime,
                address: location || 'New Delhi, India',
                serviceName: service.name,
                price: displayPrice,
                hospitalId: selectedLab.id
            };
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });
            if (res.ok) {
                setStep(3);
            } else {
                alert('Booking Failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error creating booking');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100%',
                maxWidth: '450px',
                background: '#fff',
                borderRadius: '20px',
                overflow: 'hidden',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '1.2rem 1.5rem',
                        borderBottom: '1px solid #f3f4f6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            },
                            children: [
                                step > 0 && step < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStep(step - 1),
                                    style: {
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#6b7280'
                                    },
                                    children: "<"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 105,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold'
                                    },
                                    children: [
                                        step === 0 && 'Select a Lab',
                                        step === 1 && 'Select Time Slot',
                                        step === 2 && 'Booking Summary',
                                        step === 3 && 'Success'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 109,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BookingModal.js",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            style: {
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#6b7280'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/src/components/BookingModal.js",
                                lineNumber: 117,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/BookingModal.js",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BookingModal.js",
                    lineNumber: 102,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '1.5rem',
                        overflowY: 'auto',
                        background: step === 0 ? '#f9fafb' : '#fff'
                    },
                    children: [
                        step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            },
                            children: labs.map((lab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>handleLabSelect(lab),
                                    style: {
                                        background: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        padding: '1.2rem',
                                        cursor: 'pointer'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontWeight: 'bold',
                                                marginBottom: '4px'
                                            },
                                            children: lab.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 129,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.85rem',
                                                color: '#6b7280',
                                                marginBottom: '8px'
                                            },
                                            children: lab.location
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 130,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#ff6f61',
                                                        fontWeight: 'bold'
                                                    },
                                                    children: [
                                                        "₹",
                                                        Math.round(service.price * (1 - (lab.discount_percentage || 0) / 100))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BookingModal.js",
                                                    lineNumber: 132,
                                                    columnNumber: 33
                                                }, this),
                                                lab.discount_percentage > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '0.8rem',
                                                        color: '#059669'
                                                    },
                                                    children: [
                                                        lab.discount_percentage,
                                                        "% off"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BookingModal.js",
                                                    lineNumber: 136,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 131,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, lab.id, true, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 128,
                                    columnNumber: 25
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/BookingModal.js",
                            lineNumber: 126,
                            columnNumber: 17
                        }, this),
                        step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    style: {
                                        marginBottom: '1rem',
                                        color: '#374151'
                                    },
                                    children: [
                                        "Date: Tomorrow, ",
                                        new Date(Date.now() + 86400000).toDateString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 147,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '10px'
                                    },
                                    children: TIME_SLOTS.map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setSelectedTime(slot);
                                                setStep(2);
                                            },
                                            style: {
                                                padding: '10px',
                                                borderRadius: '8px',
                                                border: selectedTime === slot ? '2px solid #ff6f61' : '1px solid #e5e7eb',
                                                background: selectedTime === slot ? '#fff5f4' : '#fff',
                                                color: selectedTime === slot ? '#ff6f61' : '#374151',
                                                fontWeight: '500',
                                                cursor: 'pointer'
                                            },
                                            children: slot
                                        }, slot, false, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 150,
                                            columnNumber: 29
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 148,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BookingModal.js",
                            lineNumber: 146,
                            columnNumber: 17
                        }, this),
                        step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        marginBottom: '1.5rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.85rem',
                                                color: '#6b7280',
                                                marginBottom: '10px'
                                            },
                                            children: "Booking for:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 170,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontWeight: 'bold',
                                                fontSize: '1.1rem',
                                                marginBottom: '4px'
                                            },
                                            children: service.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 171,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.9rem',
                                                color: '#374151'
                                            },
                                            children: [
                                                "at ",
                                                selectedLab?.name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 172,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '10px',
                                                display: 'flex',
                                                gap: '1rem',
                                                fontSize: '0.85rem',
                                                color: '#6b7280'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/BookingModal.js",
                                                            lineNumber: 174,
                                                            columnNumber: 96
                                                        }, this),
                                                        " Tomorrow"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BookingModal.js",
                                                    lineNumber: 174,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/BookingModal.js",
                                                            lineNumber: 175,
                                                            columnNumber: 96
                                                        }, this),
                                                        " ",
                                                        selectedTime
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BookingModal.js",
                                                    lineNumber: 175,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 173,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 169,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '1.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                marginBottom: '1rem',
                                                width: '100%'
                                            },
                                            children: "Bill Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 180,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: '2rem',
                                                alignItems: 'center',
                                                width: '100%',
                                                padding: '1rem',
                                                background: '#f9fafb',
                                                borderRadius: '12px',
                                                marginBottom: '1rem'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$donut$2d$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DonutChart"], {
                                                    data: priceBreakdown,
                                                    size: 120,
                                                    strokeWidth: 15,
                                                    centerContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            textAlign: 'center'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '0.7rem',
                                                                    color: '#6b7280'
                                                                },
                                                                children: "Total"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/BookingModal.js",
                                                                lineNumber: 189,
                                                                columnNumber: 41
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontWeight: 'bold',
                                                                    fontSize: '0.9rem'
                                                                },
                                                                children: [
                                                                    "₹",
                                                                    displayPrice
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/BookingModal.js",
                                                                lineNumber: 190,
                                                                columnNumber: 41
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/BookingModal.js",
                                                        lineNumber: 188,
                                                        columnNumber: 37
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BookingModal.js",
                                                    lineNumber: 183,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '8px'
                                                    },
                                                    children: priceBreakdown.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                fontSize: '0.8rem'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '6px'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                width: '8px',
                                                                                height: '8px',
                                                                                borderRadius: '50%',
                                                                                background: item.color
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/BookingModal.js",
                                                                            lineNumber: 198,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        item.label
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/BookingModal.js",
                                                                    lineNumber: 197,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontWeight: '500'
                                                                    },
                                                                    children: [
                                                                        "₹",
                                                                        item.value
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/BookingModal.js",
                                                                    lineNumber: 201,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, item.label, true, {
                                                            fileName: "[project]/src/components/BookingModal.js",
                                                            lineNumber: 196,
                                                            columnNumber: 37
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BookingModal.js",
                                                    lineNumber: 194,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 182,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: '100%'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontSize: '0.9rem',
                                                        marginBottom: '5px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Item Total (MRP)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/BookingModal.js",
                                                            lineNumber: 209,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                textDecoration: 'line-through',
                                                                color: '#9ca3af'
                                                            },
                                                            children: [
                                                                "₹",
                                                                displayMrp
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/BookingModal.js",
                                                            lineNumber: 210,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BookingModal.js",
                                                    lineNumber: 208,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontSize: '0.9rem',
                                                        marginBottom: '5px',
                                                        color: '#059669',
                                                        fontWeight: '500'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Discount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/BookingModal.js",
                                                            lineNumber: 213,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "-₹",
                                                                displayMrp - displayPrice
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/BookingModal.js",
                                                            lineNumber: 214,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BookingModal.js",
                                                    lineNumber: 212,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontWeight: 'bold',
                                                        fontSize: '1.1rem',
                                                        marginTop: '10px',
                                                        paddingTop: '10px',
                                                        borderTop: '1px solid #eee'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "To be paid"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/BookingModal.js",
                                                            lineNumber: 217,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "₹",
                                                                displayPrice
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/BookingModal.js",
                                                            lineNumber: 218,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BookingModal.js",
                                                    lineNumber: 216,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BookingModal.js",
                                            lineNumber: 207,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 179,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleBooking,
                                    style: {
                                        width: '100%',
                                        background: '#ff6f61',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '1rem',
                                        borderRadius: '10px',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        cursor: 'pointer'
                                    },
                                    children: user ? `Pay ₹${displayPrice}` : 'Login to Pay'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 223,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true),
                        step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                padding: '2rem 1rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                    size: 64,
                                    color: "#059669",
                                    style: {
                                        margin: '0 auto 1.5rem'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 235,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: '1.5rem',
                                        marginBottom: '1rem'
                                    },
                                    children: "Booking Confirmed!"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 236,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#6b7280'
                                    },
                                    children: [
                                        "Your appointment is successfully scheduled for ",
                                        selectedTime,
                                        ", tomorrow."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BookingModal.js",
                                    lineNumber: 237,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BookingModal.js",
                            lineNumber: 234,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BookingModal.js",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BookingModal.js",
            lineNumber: 95,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/BookingModal.js",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(BookingModal, "LbYpFC6tkAoQjumuBLLLgZpeXtc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"]
    ];
});
_c = BookingModal;
var _c;
__turbopack_context__.k.register(_c, "BookingModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HospitalProfileModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HospitalProfileModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
'use client';
;
;
function HospitalProfileModal({ isOpen, onClose, hospital, onBookService }) {
    if (!isOpen || !hospital) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100%',
                maxWidth: '600px',
                background: '#fff',
                borderRadius: '20px',
                overflow: 'hidden',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    style: {
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'rgba(255,255,255,0.8)',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '5px',
                        cursor: 'pointer',
                        zIndex: 10
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/HospitalProfileModal.js",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/HospitalProfileModal.js",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'linear-gradient(to right, #ff6f61, #db2777)',
                        padding: '2.5rem 2rem',
                        color: '#fff'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: '1.8rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            },
                            children: hospital.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/HospitalProfileModal.js",
                            lineNumber: 32,
                            columnNumber: 12
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '0.9rem',
                                opacity: 0.9
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HospitalProfileModal.js",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this),
                                " ",
                                hospital.location
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HospitalProfileModal.js",
                            lineNumber: 33,
                            columnNumber: 12
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: '#fff',
                                        color: '#ff6f61',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                            size: 14,
                                            fill: "#ff6f61"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HospitalProfileModal.js",
                                            lineNumber: 38,
                                            columnNumber: 18
                                        }, this),
                                        " ",
                                        hospital.rating
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HospitalProfileModal.js",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '0.85rem'
                                    },
                                    children: "Verified Partner"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HospitalProfileModal.js",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HospitalProfileModal.js",
                            lineNumber: 36,
                            columnNumber: 12
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HospitalProfileModal.js",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '2rem',
                        overflowY: 'auto',
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                marginBottom: '1.5rem',
                                color: '#111827'
                            },
                            children: "Available Services & Offers"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HospitalProfileModal.js",
                            lineNumber: 46,
                            columnNumber: 12
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            },
                            children: hospital.services.map((service, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '1.2rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: 'bold',
                                                        color: '#1f2937',
                                                        marginBottom: '4px'
                                                    },
                                                    children: service.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HospitalProfileModal.js",
                                                    lineNumber: 58,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: '0.85rem',
                                                        color: '#059669',
                                                        fontWeight: '600'
                                                    },
                                                    children: [
                                                        service.discount,
                                                        "% OFF"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/HospitalProfileModal.js",
                                                    lineNumber: 59,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/HospitalProfileModal.js",
                                            lineNumber: 57,
                                            columnNumber: 20
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: 'right',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '15px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 'bold',
                                                                color: '#111827'
                                                            },
                                                            children: [
                                                                "₹",
                                                                service.price
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/HospitalProfileModal.js",
                                                            lineNumber: 63,
                                                            columnNumber: 26
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '0.8rem',
                                                                textDecoration: 'line-through',
                                                                color: '#9ca3af'
                                                            },
                                                            children: [
                                                                "₹",
                                                                Math.floor(service.price / (1 - service.discount / 100))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/HospitalProfileModal.js",
                                                            lineNumber: 64,
                                                            columnNumber: 26
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/HospitalProfileModal.js",
                                                    lineNumber: 62,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onBookService(service),
                                                    style: {
                                                        background: '#ff6f61',
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '8px 20px',
                                                        borderRadius: '6px',
                                                        fontWeight: '600',
                                                        cursor: 'pointer'
                                                    },
                                                    children: "BOOK"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HospitalProfileModal.js",
                                                    lineNumber: 66,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/HospitalProfileModal.js",
                                            lineNumber: 61,
                                            columnNumber: 20
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/HospitalProfileModal.js",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/HospitalProfileModal.js",
                            lineNumber: 47,
                            columnNumber: 12
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HospitalProfileModal.js",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '1.5rem 2rem',
                        borderTop: '1px solid #f3f4f6',
                        background: '#f9fafb',
                        fontSize: '0.85rem',
                        color: '#6b7280'
                    },
                    children: "Prices are inclusive of consultation and service charges."
                }, void 0, false, {
                    fileName: "[project]/src/components/HospitalProfileModal.js",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/HospitalProfileModal.js",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/HospitalProfileModal.js",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = HospitalProfileModal;
var _c;
__turbopack_context__.k.register(_c, "HospitalProfileModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Navbar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BookingModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BookingModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HospitalProfileModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HospitalProfileModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$baby$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Baby$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/baby.js [app-client] (ecmascript) <export default as Baby>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bone.js [app-client] (ecmascript) <export default as Bone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smile.js [app-client] (ecmascript) <export default as Smile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
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
function Home() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedHospitalForProfile, setSelectedHospitalForProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // State for fetched data
    const [hospitals, setHospitals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [popularServices, setPopularServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            // Fetch Hospitals
            fetch('http://localhost:5000/api/hospitals').then({
                "Home.useEffect": (res)=>res.json()
            }["Home.useEffect"]).then({
                "Home.useEffect": (data)=>setHospitals(data)
            }["Home.useEffect"]).catch({
                "Home.useEffect": (err)=>console.error('Failed to fetch hospitals', err)
            }["Home.useEffect"]);
            // Fetch Services (for Popular Tests)
            fetch('http://localhost:5000/api/services').then({
                "Home.useEffect": (res)=>res.json()
            }["Home.useEffect"]).then({
                "Home.useEffect": (data)=>setPopularServices(data.slice(0, 8))
            }["Home.useEffect"]) // Take top 8
            .catch({
                "Home.useEffect": (err)=>console.error('Failed to fetch services', err)
            }["Home.useEffect"]);
        }
    }["Home.useEffect"], []);
    // Categories with assigned colors to match the "Promo Card" aesthetic but smaller
    const CATEGORIES = [
        {
            name: 'Cardiology',
            desc: 'Heart Care',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                size: 50,
                color: "rgba(255,255,255,0.3)"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 38,
                columnNumber: 55
            }, this),
            color: '#ff6b6b',
            href: '/hospitals?specialty=Cardiac'
        },
        {
            name: 'Orthopedic',
            desc: 'Bone Health',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bone$3e$__["Bone"], {
                size: 50,
                color: "rgba(255,255,255,0.3)"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 39,
                columnNumber: 56
            }, this),
            color: '#5f27cd',
            href: '/hospitals?specialty=Orthopedic'
        },
        {
            name: 'Pediatric',
            desc: 'Child Care',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$baby$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Baby$3e$__["Baby"], {
                size: 50,
                color: "rgba(255,255,255,0.3)"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 40,
                columnNumber: 54
            }, this),
            color: '#ff9ff3',
            textColor: '#1f2937',
            href: '/hospitals?specialty=Pediatric'
        },
        {
            name: 'Neurology',
            desc: 'Brain Care',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                size: 50,
                color: "rgba(255,255,255,0.3)"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 41,
                columnNumber: 54
            }, this),
            color: '#54a0ff',
            href: '/hospitals?specialty=Neurology'
        },
        {
            name: 'Eye Care',
            desc: 'Vision',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                size: 50,
                color: "rgba(255,255,255,0.3)"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 42,
                columnNumber: 49
            }, this),
            color: '#1dd1a1',
            href: '/hospitals?specialty=Eye'
        },
        {
            name: 'Dental',
            desc: 'Oral Health',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
                size: 50,
                color: "rgba(255,255,255,0.3)"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 43,
                columnNumber: 52
            }, this),
            color: '#f368e0',
            href: '/hospitals?specialty=Dentist'
        },
        {
            name: 'Diabetes',
            desc: 'Sugar Levels',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                size: 50,
                color: "rgba(255,255,255,0.3)"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 44,
                columnNumber: 55
            }, this),
            color: '#ee5253',
            href: '/hospitals?specialty=Diabetes'
        },
        {
            name: 'Skin Care',
            desc: 'Dermatology',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
                size: 50,
                color: "rgba(255,255,255,0.3)"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 45,
                columnNumber: 55
            }, this),
            color: '#00d2d3',
            href: '/hospitals?specialty=Dermatology'
        },
        {
            name: 'Ayurveda',
            desc: 'Natural',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                size: 50,
                color: "rgba(255,255,255,0.3)"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 46,
                columnNumber: 50
            }, this),
            color: '#10ac84',
            href: '/hospitals?specialty=Ayurveda'
        },
        {
            name: 'Physiotherapy',
            desc: 'Recovery',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                size: 50,
                color: "rgba(255,255,255,0.3)"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 47,
                columnNumber: 56
            }, this),
            color: '#ff9f43',
            href: '/hospitals?specialty=Physiotherapy'
        }
    ];
    const [currentSlide, setCurrentSlide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const OFFERS = [
        {
            id: 1,
            title: "Healthcare at your fingertips.",
            subtitle: "Lab Tests • Medicines • Nursing • Doctor Visits",
            bg: "linear-gradient(to right, #0c831f, #33b249)",
            btnText: "Book Now",
            btnColor: "#0c831f"
        },
        {
            id: 2,
            title: "50% OFF on Full Body Checkups",
            subtitle: "Includes 80+ Tests. Home Collection Available.",
            bg: "linear-gradient(to right, #2563eb, #60a5fa)",
            btnText: "View Package",
            btnColor: "#2563eb"
        },
        {
            id: 3,
            title: "Pharmacy: Flat 20% OFF",
            subtitle: "On all prescription medicines. fast delivery.",
            bg: "linear-gradient(to right, #db2777, #f472b6)",
            btnText: "Order Now",
            btnColor: "#db2777"
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const timer = setInterval({
                "Home.useEffect.timer": ()=>{
                    setCurrentSlide({
                        "Home.useEffect.timer": (prev)=>(prev + 1) % OFFERS.length
                    }["Home.useEffect.timer"]);
                }
            }["Home.useEffect.timer"], 5000);
            return ({
                "Home.useEffect": ()=>clearInterval(timer)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            paddingBottom: '100px',
            background: '#f4f6fb',
            minHeight: '100vh'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container",
                style: {
                    paddingTop: 'calc(var(--header-height) + 2rem)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative',
                            borderRadius: '16px',
                            marginBottom: '3rem',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0, 0.1)',
                            height: '300px'
                        },
                        children: [
                            OFFERS.map((offer, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: offer.bg,
                                        padding: '3rem',
                                        color: '#fff',
                                        opacity: currentSlide === index ? 1 : 0,
                                        transition: 'opacity 0.8s ease-in-out',
                                        zIndex: currentSlide === index ? 2 : 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: {
                                                fontSize: '3rem',
                                                maxWidth: '600px',
                                                marginBottom: '1rem',
                                                color: '#fff',
                                                lineHeight: '1.2'
                                            },
                                            children: offer.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 115,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: '1.2rem',
                                                opacity: 0.9,
                                                marginBottom: '2rem'
                                            },
                                            children: offer.subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 118,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn",
                                            style: {
                                                background: '#fff',
                                                color: offer.btnColor,
                                                padding: '0.8rem 2rem',
                                                fontSize: '1.1rem',
                                                width: 'fit-content'
                                            },
                                            children: offer.btnText
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 121,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                right: '-50px',
                                                bottom: '-50px',
                                                width: '300px',
                                                height: '300px',
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '50%'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 125,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                right: '150px',
                                                top: '-50px',
                                                width: '150px',
                                                height: '150px',
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: '50%'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 126,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, offer.id, true, {
                                    fileName: "[project]/src/app/page.js",
                                    lineNumber: 102,
                                    columnNumber: 17
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    bottom: '20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    display: 'flex',
                                    gap: '10px',
                                    zIndex: 10
                                },
                                children: OFFERS.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setCurrentSlide(index),
                                        style: {
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            background: currentSlide === index ? '#fff' : 'rgba(255,255,255,0.4)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }
                                    }, index, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 141,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            marginBottom: '1.5rem',
                            fontSize: '1.5rem'
                        },
                        children: "Shop by Category"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                            gap: '1rem',
                            marginBottom: '4rem'
                        },
                        children: CATEGORIES.map((cat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: cat.href,
                                style: {
                                    textDecoration: 'none'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)`,
                                        borderRadius: '20px',
                                        padding: '1.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        color: cat.textColor || '#fff',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height: '180px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    },
                                    onMouseOver: (e)=>{
                                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                                    },
                                    onMouseOut: (e)=>{
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                zIndex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: '1.2rem',
                                                        marginBottom: '0.4rem',
                                                        lineHeight: '1.2',
                                                        fontWeight: 'bold'
                                                    },
                                                    children: cat.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.js",
                                                    lineNumber: 188,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: '0.85rem',
                                                        opacity: 0.9,
                                                        marginBottom: '1rem'
                                                    },
                                                    children: cat.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.js",
                                                    lineNumber: 189,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '0.8rem',
                                                        background: 'rgba(255,255,255,0.25)',
                                                        backdropFilter: 'blur(4px)',
                                                        padding: '6px 12px',
                                                        borderRadius: '10px',
                                                        fontWeight: '600',
                                                        border: '1px solid rgba(255,255,255,0.3)'
                                                    },
                                                    children: "View More"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.js",
                                                    lineNumber: 191,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 187,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                right: '-10px',
                                                bottom: '-10px',
                                                transform: 'rotate(-10deg)'
                                            },
                                            children: cat.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 205,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.js",
                                    lineNumber: 162,
                                    columnNumber: 21
                                }, this)
                            }, index, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 161,
                                columnNumber: 18
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            marginBottom: '1.5rem',
                            fontSize: '1.5rem'
                        },
                        children: "Popular Lab Tests"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '1.5rem',
                            overflowX: 'auto',
                            paddingBottom: '1rem',
                            scrollbarWidth: 'none'
                        },
                        children: popularServices.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductCard, {
                                title: service.name,
                                time: "Reports in 24 hrs",
                                price: `₹${service.price}`,
                                oldPrice: service.discount_price ? `₹${service.discount_price}` : `₹${Math.round(service.price * 1.5)}`,
                                discount: "Limited Offer",
                                onAdd: ()=>setSelectedProduct(service)
                            }, service.id, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 217,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BookingModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        isOpen: !!selectedProduct,
                        onClose: ()=>setSelectedProduct(null),
                        service: selectedProduct
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            marginTop: '4rem',
                            marginBottom: '1.5rem',
                            fontSize: '1.5rem'
                        },
                        children: "Featured Hospitals"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '2rem',
                            marginBottom: '4rem'
                        },
                        children: hospitals.map((hospital)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelectedHospitalForProfile(hospital),
                                style: {
                                    background: '#fff',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    border: '1px solid #e5e7eb',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                },
                                onMouseOver: (e)=>{
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
                                },
                                onMouseOut: (e)=>{
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: '180px',
                                            background: '#f3f4f6',
                                            overflow: 'hidden'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: hospital.image_url || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
                                            alt: hospital.name,
                                            style: {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            },
                                            onError: (e)=>e.target.src = "https://images.unsplash.com/photo-1586773860418-d3b97898c75c?auto=format&fit=crop&w=800&q=80"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 254,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: '1.5rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    marginBottom: '0.5rem'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontSize: '1.1rem',
                                                            fontWeight: 'bold',
                                                            color: '#111827',
                                                            margin: 0
                                                        },
                                                        children: hospital.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.js",
                                                        lineNumber: 263,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: '#f0fdf4',
                                                            color: '#166534',
                                                            padding: '2px 8px',
                                                            borderRadius: '6px',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 'bold',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '4px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                size: 12,
                                                                fill: "#166534"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.js",
                                                                lineNumber: 265,
                                                                columnNumber: 27
                                                            }, this),
                                                            " ",
                                                            hospital.rating || '4.5'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.js",
                                                        lineNumber: 264,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.js",
                                                lineNumber: 262,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '0.9rem',
                                                    color: '#6b7280',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.js",
                                                        lineNumber: 269,
                                                        columnNumber: 23
                                                    }, this),
                                                    " ",
                                                    hospital.location
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.js",
                                                lineNumber: 268,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: '1rem',
                                                    paddingTop: '1rem',
                                                    borderTop: '1px solid #f3f4f6',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '0.85rem',
                                                            color: '#db2777',
                                                            fontWeight: '600'
                                                        },
                                                        children: [
                                                            "Up to ",
                                                            hospital.discount_percentage || '10',
                                                            "% OFF"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.js",
                                                        lineNumber: 272,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '0.85rem',
                                                            fontWeight: '600',
                                                            color: '#111827'
                                                        },
                                                        children: "View Services >"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.js",
                                                        lineNumber: 273,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.js",
                                                lineNumber: 271,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 261,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, hospital.id, true, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 239,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HospitalProfileModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        isOpen: !!selectedHospitalForProfile,
                        onClose: ()=>setSelectedHospitalForProfile(null),
                        hospital: selectedHospitalForProfile,
                        onBookService: (service)=>{
                            setSelectedHospitalForProfile(null);
                            setSelectedProduct({
                                ...service,
                                name: `${service.name} at ${selectedHospitalForProfile.name}`
                            });
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(Home, "QdXIxxyLnO/VkdpQlg3fAr0XNGs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
function ProductCard({ title, time, price, oldPrice, discount, onAdd }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minWidth: '220px',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #eee',
            padding: '0',
            overflow: 'hidden',
            flexShrink: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: '120px',
                    background: '#f9fafb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                    size: 40,
                    color: "#ccc"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.js",
                    lineNumber: 307,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 306,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '1rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: '0.75rem',
                            color: '#666',
                            background: '#f3f4f6',
                            width: 'fit-content',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            marginBottom: '8px'
                        },
                        children: time
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 310,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: '1rem',
                            marginBottom: '0.5rem',
                            color: '#1f2937'
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 313,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '1rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: 'block',
                                            fontSize: '1rem',
                                            fontWeight: 'bold'
                                        },
                                        children: price
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 316,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '0.8rem',
                                            textDecoration: 'line-through',
                                            color: '#9ca3af'
                                        },
                                        children: oldPrice
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 317,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 315,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onAdd,
                                style: {
                                    border: '1px solid #ff6f61',
                                    color: '#ff6f61',
                                    background: '#fff',
                                    borderRadius: '6px',
                                    padding: '6px 16px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                },
                                children: "ADD"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 319,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 314,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 309,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 297,
        columnNumber: 9
    }, this);
}
_c1 = ProductCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "Home");
__turbopack_context__.k.register(_c1, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_2c290e4f._.js.map