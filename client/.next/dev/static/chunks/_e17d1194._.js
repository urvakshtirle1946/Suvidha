(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/[adminPath]/bookings/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookingsManagement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ToastContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function BookingsManagement() {
    _s();
    const [bookings, setBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingsManagement.useEffect": ()=>{
            fetchBookings();
            const interval = setInterval(fetchBookings, 5000); // Poll every 5 seconds
            return ({
                "BookingsManagement.useEffect": ()=>clearInterval(interval)
            })["BookingsManagement.useEffect"];
        }
    }["BookingsManagement.useEffect"], []);
    const fetchBookings = async ()=>{
        try {
            const res = await fetch(`${("TURBOPACK compile-time value", "https://suvidha-server-4u66.onrender.com") || 'http://localhost:5000'}/api/bookings`);
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (err) {
            console.error(err);
        } finally{
            setLoading(false);
        }
    };
    const updateStatus = async (id, newStatus)=>{
        try {
            const res = await fetch(`${("TURBOPACK compile-time value", "https://suvidha-server-4u66.onrender.com") || 'http://localhost:5000'}/api/bookings/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });
            if (res.ok) {
                // Optimistic update or refetch
                setBookings((prev)=>prev.map((b)=>b.id === id ? {
                            ...b,
                            status: newStatus
                        } : b));
                addToast(`Booking #${id} updated to ${newStatus}`, 'success');
            } else {
                addToast('Failed to update status', 'error');
            }
        } catch (err) {
            console.error(err);
            addToast('Error updating status', 'error');
        }
    };
    const filteredBookings = bookings.filter((b)=>{
        const matchesSearch = b.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || b.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toString().includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    // Light & Clean Styles matching Dashboard
    const cardStyle = {
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
    };
    const searchInputStyle = {
        background: 'transparent',
        border: 'none',
        color: 'var(--text-primary)',
        flex: 1,
        outline: 'none',
        fontSize: '0.95rem'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '2.5rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: 'var(--text-primary)'
                        },
                        children: "Bookings Management"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                        lineNumber: 79,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: 'var(--text-secondary)',
                            marginTop: '0.5rem'
                        },
                        children: "Track and manage patient appointments."
                    }, void 0, false, {
                        fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                lineNumber: 78,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    ...cardStyle,
                    padding: '1rem',
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            flex: 1,
                            minWidth: '240px',
                            background: 'var(--bg-primary)',
                            padding: '0.8rem 1rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                size: 20,
                                style: {
                                    color: 'var(--text-secondary)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                lineNumber: 86,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search by ID, Patient, or Service...",
                                value: searchTerm,
                                onChange: (e)=>setSearchTerm(e.target.value),
                                style: searchInputStyle
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                lineNumber: 87,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                        lineNumber: 85,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '1px',
                            height: '30px',
                            background: 'var(--border)',
                            margin: '0 10px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                        lineNumber: 96,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '0.8rem'
                        },
                        children: [
                            'All',
                            'Confirmed',
                            'Completed',
                            'Cancelled'
                        ].map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setStatusFilter(status),
                                style: {
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '12px',
                                    border: statusFilter === status ? '1px solid transparent' : '1px solid var(--border)',
                                    background: statusFilter === status ? 'var(--accent)' : 'transparent',
                                    color: statusFilter === status ? 'var(--accent-text)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: statusFilter === status ? '600' : '500',
                                    transition: 'all 0.2s',
                                    boxShadow: statusFilter === status ? '0 4px 10px rgba(0, 210, 211, 0.2)' : 'none'
                                },
                                children: status
                            }, status, false, {
                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                lineNumber: 100,
                                columnNumber: 21
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                        lineNumber: 98,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                lineNumber: 84,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    ...cardStyle,
                    padding: '0',
                    overflow: 'hidden'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        overflowX: 'auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            style: {
                                width: '100%',
                                borderCollapse: 'collapse',
                                textAlign: 'left'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            borderBottom: '1px solid var(--border)',
                                            background: 'var(--bg-primary)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    padding: '1.2rem 1.5rem',
                                                    color: 'var(--text-secondary)',
                                                    fontWeight: '600',
                                                    fontSize: '0.8rem',
                                                    textTransform: 'uppercase'
                                                },
                                                children: "ID"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                lineNumber: 128,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    padding: '1.2rem 1.5rem',
                                                    color: 'var(--text-secondary)',
                                                    fontWeight: '600',
                                                    fontSize: '0.8rem',
                                                    textTransform: 'uppercase'
                                                },
                                                children: "Patient Details"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                lineNumber: 129,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    padding: '1.2rem 1.5rem',
                                                    color: 'var(--text-secondary)',
                                                    fontWeight: '600',
                                                    fontSize: '0.8rem',
                                                    textTransform: 'uppercase'
                                                },
                                                children: "Service Info"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                lineNumber: 130,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    padding: '1.2rem 1.5rem',
                                                    color: 'var(--text-secondary)',
                                                    fontWeight: '600',
                                                    fontSize: '0.8rem',
                                                    textTransform: 'uppercase'
                                                },
                                                children: "Schedule"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                lineNumber: 131,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    padding: '1.2rem 1.5rem',
                                                    color: 'var(--text-secondary)',
                                                    fontWeight: '600',
                                                    fontSize: '0.8rem',
                                                    textTransform: 'uppercase'
                                                },
                                                children: "Amount"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                lineNumber: 132,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    padding: '1.2rem 1.5rem',
                                                    color: 'var(--text-secondary)',
                                                    fontWeight: '600',
                                                    fontSize: '0.8rem',
                                                    textTransform: 'uppercase'
                                                },
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                lineNumber: 133,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    padding: '1.2rem 1.5rem',
                                                    color: 'var(--text-secondary)',
                                                    fontWeight: '600',
                                                    fontSize: '0.8rem',
                                                    textTransform: 'uppercase'
                                                },
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                lineNumber: 134,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                        lineNumber: 127,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                    lineNumber: 126,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: filteredBookings.map((booking)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                borderBottom: '1px solid var(--border)',
                                                transition: 'background 0.2s'
                                            },
                                            className: "hover:bg-gray-50 dark:hover:bg-gray-900",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '1.2rem 1.5rem',
                                                        color: 'var(--text-secondary)',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '500'
                                                    },
                                                    children: [
                                                        "#",
                                                        booking.id
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                    lineNumber: 140,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '1.2rem 1.5rem'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: '600',
                                                                color: 'var(--text-primary)',
                                                                marginBottom: '4px'
                                                            },
                                                            children: booking.patient_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                            lineNumber: 142,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '0.85rem',
                                                                color: 'var(--text-secondary)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '4px'
                                                            },
                                                            children: booking.user_phone
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                            lineNumber: 143,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                    lineNumber: 141,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '1.2rem 1.5rem',
                                                        color: 'var(--text-primary)',
                                                        fontWeight: '500'
                                                    },
                                                    children: booking.service_name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                    lineNumber: 147,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '1.2rem 1.5rem'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                marginBottom: '4px',
                                                                color: 'var(--text-primary)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                    size: 14,
                                                                    className: "text-gray-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                                    lineNumber: 150,
                                                                    columnNumber: 41
                                                                }, this),
                                                                " ",
                                                                new Date(booking.booking_date).toLocaleDateString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                            lineNumber: 149,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '0.85rem',
                                                                color: 'var(--text-secondary)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                    size: 14
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                                    lineNumber: 153,
                                                                    columnNumber: 41
                                                                }, this),
                                                                " ",
                                                                booking.booking_time
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                            lineNumber: 152,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                    lineNumber: 148,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '1.2rem 1.5rem',
                                                        fontWeight: 'bold',
                                                        color: 'var(--text-primary)'
                                                    },
                                                    children: [
                                                        "₹",
                                                        booking.price
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                    lineNumber: 156,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '1.2rem 1.5rem'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: booking.status,
                                                        onChange: (e)=>updateStatus(booking.id, e.target.value),
                                                        style: {
                                                            padding: '6px 14px',
                                                            borderRadius: '20px',
                                                            fontSize: '0.8rem',
                                                            cursor: 'pointer',
                                                            outline: 'none',
                                                            background: booking.status === 'Completed' ? 'rgba(46, 204, 113, 0.15)' : booking.status === 'Cancelled' ? 'rgba(231, 76, 60, 0.15)' : 'rgba(0, 210, 211, 0.15)',
                                                            color: booking.status === 'Completed' ? '#2ecc71' : booking.status === 'Cancelled' ? '#f87171' : '#00d2d3',
                                                            border: booking.status === 'Completed' ? '1px solid rgba(46, 204, 113, 0.2)' : booking.status === 'Cancelled' ? '1px solid rgba(231, 76, 60, 0.2)' : '1px solid rgba(0, 210, 211, 0.2)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Confirmed",
                                                                children: "Confirmed"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                                lineNumber: 175,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Completed",
                                                                children: "Completed"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                                lineNumber: 176,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Cancelled",
                                                                children: "Cancelled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                                lineNumber: 177,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Pending",
                                                                children: "Pending"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                                lineNumber: 178,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                        lineNumber: 158,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                    lineNumber: 157,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        padding: '1.2rem 1.5rem'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: '0.8rem'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>updateStatus(booking.id, 'Completed'),
                                                                title: "Mark Complete",
                                                                className: "action-btn",
                                                                style: {
                                                                    background: 'rgba(46, 204, 113, 0.1)',
                                                                    border: '1px solid rgba(46, 204, 113, 0.2)',
                                                                    cursor: 'pointer',
                                                                    color: '#2ecc71',
                                                                    padding: '8px',
                                                                    borderRadius: '8px'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                    size: 18
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                                    lineNumber: 183,
                                                                    columnNumber: 317
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                                lineNumber: 183,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>updateStatus(booking.id, 'Cancelled'),
                                                                title: "Cancel Booking",
                                                                className: "action-btn",
                                                                style: {
                                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                                                    cursor: 'pointer',
                                                                    color: '#f87171',
                                                                    padding: '8px',
                                                                    borderRadius: '8px'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                    size: 18
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                                    lineNumber: 184,
                                                                    columnNumber: 316
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                                lineNumber: 184,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                        lineNumber: 182,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                                    lineNumber: 181,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, booking.id, true, {
                                            fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                            lineNumber: 139,
                                            columnNumber: 29
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                    lineNumber: 137,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                            lineNumber: 125,
                            columnNumber: 17
                        }, this),
                        filteredBookings.length === 0 && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '4rem',
                                textAlign: 'center',
                                color: 'var(--text-secondary)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '1rem',
                                        opacity: 0.5
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        size: 48
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                        lineNumber: 193,
                                        columnNumber: 77
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                                    lineNumber: 193,
                                    columnNumber: 25
                                }, this),
                                "No bookings found matching filters."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                            lineNumber: 192,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                    lineNumber: 124,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[adminPath]/bookings/page.js",
                lineNumber: 123,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[adminPath]/bookings/page.js",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(BookingsManagement, "f22YorotKDigObaw9AAhJtmdXl8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = BookingsManagement;
var _c;
__turbopack_context__.k.register(_c, "BookingsManagement");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Search
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21 21-4.34-4.34",
            key: "14j7rj"
        }
    ],
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ]
];
const Search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("search", __iconNode);
;
 //# sourceMappingURL=search.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Search",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleX
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m15 9-6 6",
            key: "1uzhvr"
        }
    ],
    [
        "path",
        {
            d: "m9 9 6 6",
            key: "z0biqf"
        }
    ]
];
const CircleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("circle-x", __iconNode);
;
 //# sourceMappingURL=circle-x.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Clock
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 6v6l4 2",
            key: "mmk7yg"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ]
];
const Clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("clock", __iconNode);
;
 //# sourceMappingURL=clock.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_e17d1194._.js.map