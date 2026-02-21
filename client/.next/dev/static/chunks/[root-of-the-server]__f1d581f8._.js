(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[next]/internal/font/google/outfit_b4454ca0.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "outfit_b4454ca0-module__oCpsOW__className",
});
}),
"[next]/internal/font/google/outfit_b4454ca0.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_b4454ca0$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/outfit_b4454ca0.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_b4454ca0$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Outfit', 'Outfit Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_b4454ca0$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_b4454ca0$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/client/src/app/[adminPath]/login/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLogin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/client/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_b4454ca0$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/outfit_b4454ca0.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AdminLogin() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const adminPath = params?.adminPath || 'admin';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLogin.useEffect": ()=>{
            // Auto-redirect if already logged in
            const auth = localStorage.getItem('admin_auth');
            if (auth) {
                router.push(`/${adminPath}`);
            }
        }
    }["AdminLogin.useEffect"], [
        router,
        adminPath
    ]);
    const handleLogin = async (e)=>{
        e.preventDefault();
        setError('');
        try {
            const backendUrl = ("TURBOPACK compile-time value", "http://localhost:5000") || 'http://localhost:5000'; // Assuming this standard
            const res = await fetch(`${backendUrl}/api/auth/admin-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username,
                    password
                })
            });
            const data = await res.json();
            if (data.success && data.token) {
                // Set persistence for Admin layout checks and API auth
                localStorage.setItem('admin_auth', 'true');
                localStorage.setItem('admin_token', data.token);
                // Expiry of 1 day to match backend
                document.cookie = `admin_auth=true; path=/; max-age=86400; SameSite=Strict`;
                router.push(`/${adminPath}`);
            } else {
                setError(data.message || 'Invalid Credentials');
            }
        } catch (err) {
            console.error('Login Error:', err);
            setError('Connection to server failed. Please try again.');
        }
    };
    /* Premium Login Styles */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_b4454ca0$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].className,
        style: {
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            position: 'relative',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '40%',
                    height: '40%',
                    background: 'radial-gradient(circle, rgba(0, 210, 211, 0.15), transparent 70%)',
                    filter: 'blur(40px)'
                }
            }, void 0, false, {
                fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                lineNumber: 66,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: '-10%',
                    right: '-10%',
                    width: '40%',
                    height: '40%',
                    background: 'radial-gradient(circle, rgba(46, 134, 222, 0.15), transparent 70%)',
                    filter: 'blur(40px)'
                }
            }, void 0, false, {
                fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                lineNumber: 67,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'rgba(30, 41, 59, 0.4)',
                    backdropFilter: 'blur(16px)',
                    padding: '3.5rem',
                    width: '100%',
                    maxWidth: '420px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'inline-flex',
                            padding: '1.2rem',
                            background: 'rgba(204, 255, 0, 0.1)',
                            borderRadius: '50%',
                            marginBottom: '2rem',
                            boxShadow: '0 0 20px rgba(204, 255, 0, 0.2)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                            size: 48,
                            color: "#ccff00"
                        }, void 0, false, {
                            fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            marginBottom: '0.5rem',
                            color: '#fff',
                            fontSize: '2rem',
                            fontWeight: '800',
                            letterSpacing: '-0.5px'
                        },
                        children: "Admin Portal"
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: '#94a3b8',
                            marginBottom: '2.5rem',
                            fontSize: '1rem'
                        },
                        children: "Secure Access Required"
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleLogin,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '1.5rem',
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.2rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        placeholder: "Email Address",
                                        value: username,
                                        onChange: (e)=>setUsername(e.target.value),
                                        style: {
                                            width: '100%',
                                            padding: '1.2rem',
                                            background: 'rgba(15, 23, 42, 0.6)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#fff',
                                            outline: 'none',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.2s'
                                        },
                                        onFocus: (e)=>e.target.style.borderColor = '#ccff00',
                                        onBlur: (e)=>e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                                        lineNumber: 87,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        placeholder: "Password",
                                        value: password,
                                        onChange: (e)=>setPassword(e.target.value),
                                        style: {
                                            width: '100%',
                                            padding: '1.2rem',
                                            background: 'rgba(15, 23, 42, 0.6)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#fff',
                                            outline: 'none',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.2s'
                                        },
                                        onFocus: (e)=>e.target.style.borderColor = '#ccff00',
                                        onBlur: (e)=>e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#f87171',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.9rem',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    padding: '0.5rem',
                                    borderRadius: '8px'
                                },
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                                lineNumber: 127,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn",
                                style: {
                                    width: '100%',
                                    padding: '1.2rem',
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    background: '#ccff00',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 15px rgba(204, 255, 0, 0.3)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s'
                                },
                                children: "Login to Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/app/[adminPath]/login/page.js",
                lineNumber: 69,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/app/[adminPath]/login/page.js",
        lineNumber: 60,
        columnNumber: 7
    }, this);
}
_s(AdminLogin, "3DyUqUvZ0GBVuZnjdEr8Lkgjgpg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = AdminLogin;
var _c;
__turbopack_context__.k.register(_c, "AdminLogin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f1d581f8._.js.map