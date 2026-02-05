(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/[adminPath]/hospitals/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HospitalManagement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function HospitalManagement() {
    _s();
    const [hospitals, setHospitals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editMode, setEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editId, setEditId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Form State
    const initialForm = {
        name: '',
        location: '',
        rating: '4.5',
        discount_percentage: '',
        discount_description: '',
        image_url: 'linear-gradient(45deg, #1e293b, #0f172a)',
        phone_number: ''
    };
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialForm);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HospitalManagement.useEffect": ()=>{
            fetchHospitals();
        }
    }["HospitalManagement.useEffect"], []);
    const fetchHospitals = async ()=>{
        try {
            const res = await fetch('http://localhost:5000/api/hospitals');
            if (res.ok) {
                const data = await res.json();
                setHospitals(data);
            }
        } catch (err) {
            console.error(err);
        } finally{
            setLoading(false);
        }
    };
    const resetForm = ()=>{
        setFormData(initialForm);
        setEditMode(false);
        setEditId(null);
    };
    const handleEdit = (hospital)=>{
        setFormData({
            name: hospital.name,
            location: hospital.location,
            rating: hospital.rating,
            discount_percentage: hospital.discount_percentage,
            discount_description: hospital.discount_description,
            image_url: hospital.image_url || initialForm.image_url,
            phone_number: hospital.phone_number || ''
        });
        setEditId(hospital.id);
        setEditMode(true);
        setShowForm(true);
    };
    const handleDelete = async (id)=>{
        if (!confirm('Are you sure you want to delete this hospital?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/hospitals/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchHospitals();
            } else {
                alert('Failed to delete');
            }
        } catch (err) {
            console.error(err);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const url = editMode ? `http://localhost:5000/api/hospitals/${editId}` : 'http://localhost:5000/api/hospitals';
            const method = editMode ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert(editMode ? 'Hospital Updated Successfully!' : 'Hospital Added Successfully!');
                setShowForm(false);
                resetForm();
                fetchHospitals(); // Refresh list
            } else {
                alert('Failed to save hospital');
            }
        } catch (err) {
            console.error(err);
        }
    };
    // Premium Dark Styles
    const cardStyle = {
        background: 'rgba(30, 41, 59, 0.4)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    };
    const inputStyle = {
        width: '100%',
        padding: '1rem',
        background: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#fff',
        borderRadius: '12px',
        outline: 'none',
        transition: 'border-color 0.2s'
    };
    if (showForm) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "animate-fade-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontSize: '2rem',
                                background: 'linear-gradient(to right, #fff, #94a3b8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            },
                            children: editMode ? 'Edit Hospital' : 'Add New Hospital'
                        }, void 0, false, {
                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                            lineNumber: 129,
                            columnNumber: 19
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn",
                            onClick: ()=>{
                                setShowForm(false);
                                resetForm();
                            },
                            style: {
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#cbd5e1'
                            },
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                            lineNumber: 132,
                            columnNumber: 19
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                    lineNumber: 128,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        ...cardStyle,
                        padding: '2.5rem',
                        maxWidth: '700px',
                        margin: '0 auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.8rem',
                                            color: '#94a3b8',
                                            fontSize: '0.9rem'
                                        },
                                        children: "Hospital Name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 139,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        required: true,
                                        value: formData.name,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                name: e.target.value
                                            }),
                                        style: inputStyle,
                                        placeholder: "e.g. Apollo International"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 140,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 138,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.8rem',
                                            color: '#94a3b8',
                                            fontSize: '0.9rem'
                                        },
                                        children: "Location"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 149,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'relative'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                size: 20,
                                                style: {
                                                    position: 'absolute',
                                                    left: '16px',
                                                    top: '16px',
                                                    color: '#64748b'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 151,
                                                columnNumber: 30
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                required: true,
                                                value: formData.location,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        location: e.target.value
                                                    }),
                                                style: {
                                                    ...inputStyle,
                                                    paddingLeft: '3rem'
                                                },
                                                placeholder: "City, Area"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 152,
                                                columnNumber: 30
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 150,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 148,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    display: 'block',
                                                    marginBottom: '0.8rem',
                                                    color: '#94a3b8',
                                                    fontSize: '0.9rem'
                                                },
                                                children: "Rating"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 163,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: 'relative'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                        size: 20,
                                                        style: {
                                                            position: 'absolute',
                                                            left: '16px',
                                                            top: '16px',
                                                            color: '#fbbf24'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 165,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        step: "0.1",
                                                        max: "5",
                                                        value: formData.rating,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                rating: e.target.value
                                                            }),
                                                        style: {
                                                            ...inputStyle,
                                                            paddingLeft: '3rem'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 166,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 164,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 162,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    display: 'block',
                                                    marginBottom: '0.8rem',
                                                    color: '#94a3b8',
                                                    fontSize: '0.9rem'
                                                },
                                                children: "Discount %"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 174,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: 'relative'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                        size: 20,
                                                        style: {
                                                            position: 'absolute',
                                                            left: '16px',
                                                            top: '16px',
                                                            color: '#00d2d3'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 176,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        value: formData.discount_percentage,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                discount_percentage: e.target.value
                                                            }),
                                                        style: {
                                                            ...inputStyle,
                                                            paddingLeft: '3rem'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 177,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 175,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 173,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 161,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.8rem',
                                            color: '#94a3b8',
                                            fontSize: '0.9rem'
                                        },
                                        children: "Offer Headline"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 187,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "e.g. Flat 20% OFF on First Consult",
                                        value: formData.discount_description,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                discount_description: e.target.value
                                            }),
                                        style: inputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 188,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 186,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.8rem',
                                            color: '#94a3b8',
                                            fontSize: '0.9rem'
                                        },
                                        children: "WhatsApp Number (for Notifications)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 196,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "e.g. +919876543210",
                                        value: formData.phone_number,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                phone_number: e.target.value
                                            }),
                                        style: inputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 197,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 195,
                                columnNumber: 23
                            }, this),
                            !editMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '1.5rem',
                                    paddingTop: '1.5rem',
                                    borderTop: '1px solid rgba(255,255,255,0.1)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '1rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: '1.1rem',
                                                    color: '#fff'
                                                },
                                                children: "Add Services"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 208,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: addServiceRow,
                                                style: {
                                                    background: 'rgba(0, 210, 211, 0.1)',
                                                    color: '#00d2d3',
                                                    border: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.85rem',
                                                    cursor: 'pointer'
                                                },
                                                children: "+ Add Row"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 209,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 207,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1rem'
                                        },
                                        children: services.map((service, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: '2fr 1fr 1fr 1fr 30px',
                                                    gap: '10px',
                                                    alignItems: 'center',
                                                    background: 'rgba(255,255,255,0.02)',
                                                    padding: '10px',
                                                    borderRadius: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "Service Name (e.g. MRI Brain)",
                                                        value: service.name,
                                                        onChange: (e)=>updateService(index, 'name', e.target.value),
                                                        style: {
                                                            ...inputStyle,
                                                            padding: '8px',
                                                            fontSize: '0.9rem'
                                                        },
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 215,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "Category",
                                                        value: service.category,
                                                        onChange: (e)=>updateService(index, 'category', e.target.value),
                                                        style: {
                                                            ...inputStyle,
                                                            padding: '8px',
                                                            fontSize: '0.9rem'
                                                        },
                                                        list: "categories"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 222,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        placeholder: "Price",
                                                        value: service.price,
                                                        onChange: (e)=>updateService(index, 'price', e.target.value),
                                                        style: {
                                                            ...inputStyle,
                                                            padding: '8px',
                                                            fontSize: '0.9rem'
                                                        },
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 229,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        placeholder: "Disc. Price",
                                                        value: service.discount_price,
                                                        onChange: (e)=>updateService(index, 'discount_price', e.target.value),
                                                        style: {
                                                            ...inputStyle,
                                                            padding: '8px',
                                                            fontSize: '0.9rem'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 236,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(XCircle, {
                                                        size: 20,
                                                        color: "#f87171",
                                                        style: {
                                                            cursor: 'pointer'
                                                        },
                                                        onClick: ()=>removeServiceRow(index)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 242,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 214,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 212,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                        id: "categories",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Radiology"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 247,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Pathology"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 248,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Cardiology"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 249,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Consultation"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 250,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 246,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 206,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn",
                                style: {
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)',
                                    color: '#fff',
                                    border: 'none',
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 15px rgba(0, 210, 211, 0.3)'
                                },
                                children: editMode ? 'Update Hospital' : 'Add Hospital & Services'
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 255,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 136,
                        columnNumber: 19
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                    lineNumber: 135,
                    columnNumber: 15
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
            lineNumber: 127,
            columnNumber: 11
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2.5rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: '2rem',
                                    fontWeight: '800',
                                    background: 'linear-gradient(to right, #fff, #94a3b8)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                },
                                children: "Hospital Partners"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 274,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#94a3b8',
                                    marginTop: '0.5rem'
                                },
                                children: "Manage your network of healthcare providers."
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 275,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 273,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn",
                        onClick: ()=>{
                            resetForm();
                            setShowForm(true);
                        },
                        style: {
                            background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)',
                            color: '#fff',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0, 210, 211, 0.3)',
                            padding: '0.8rem 1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 20,
                                style: {
                                    marginRight: '8px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 282,
                                columnNumber: 17
                            }, this),
                            " Add Hospital"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 277,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                lineNumber: 272,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid-cards",
                style: {
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                },
                children: hospitals.map((hospital)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            ...cardStyle,
                            overflow: 'hidden',
                            transition: 'transform 0.3s'
                        },
                        className: "hover:scale-[1.02]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: '160px',
                                    background: hospital.image_url || 'linear-gradient(45deg, #1e293b, #0f172a)',
                                    position: 'relative'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        background: 'rgba(0,0,0,0.4)',
                                        backdropFilter: 'blur(4px)',
                                        color: '#fbbf24',
                                        padding: '6px 10px',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontWeight: 'bold'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                            size: 14,
                                            fill: "#fbbf24",
                                            stroke: "none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                            lineNumber: 291,
                                            columnNumber: 29
                                        }, this),
                                        " ",
                                        hospital.rating
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                    lineNumber: 290,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 289,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: '1.3rem',
                                            marginBottom: '0.5rem',
                                            color: '#f8fafc'
                                        },
                                        children: hospital.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 295,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#94a3b8',
                                            fontSize: '0.95rem',
                                            marginBottom: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                size: 16,
                                                color: "#64748b"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 297,
                                                columnNumber: 28
                                            }, this),
                                            " ",
                                            hospital.location
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 296,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '1.5rem'
                                        },
                                        children: hospital.discount_percentage > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                color: '#34d399',
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                border: '1px solid rgba(16, 185, 129, 0.2)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                    lineNumber: 303,
                                                    columnNumber: 37
                                                }, this),
                                                " ",
                                                hospital.discount_percentage,
                                                "% OFF"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                            lineNumber: 302,
                                            columnNumber: 33
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                            lineNumber: 305,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 300,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '1rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleEdit(hospital),
                                                className: "btn",
                                                style: {
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    color: '#cbd5e1'
                                                },
                                                children: "Edit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 309,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleDelete(hospital.id),
                                                className: "btn",
                                                style: {
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                                    color: '#f87171'
                                                },
                                                children: "Remove"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 310,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 308,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 294,
                                columnNumber: 21
                            }, this)
                        ]
                    }, hospital.id, true, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 288,
                        columnNumber: 17
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                lineNumber: 286,
                columnNumber: 9
            }, this),
            hospitals.length === 0 && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '6rem',
                    textAlign: 'center',
                    color: '#64748b'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(255,255,255,0.03)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                            size: 40,
                            style: {
                                opacity: 0.5
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                            lineNumber: 320,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 319,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: '1.5rem',
                            marginBottom: '0.5rem',
                            color: '#fff'
                        },
                        children: "No hospitals added yet."
                    }, void 0, false, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 322,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '1.1rem'
                        },
                        children: 'Click "Add Hospital" to onboard your first partner.'
                    }, void 0, false, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 323,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                lineNumber: 318,
                columnNumber: 14
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
        lineNumber: 271,
        columnNumber: 5
    }, this);
}
_s(HospitalManagement, "4aGACnkFLM3LUHYQhnvPZwJQjyM=");
_c = HospitalManagement;
var _c;
__turbopack_context__.k.register(_c, "HospitalManagement");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MapPin
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
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "10",
            r: "3",
            key: "ilqhr7"
        }
    ]
];
const MapPin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("map-pin", __iconNode);
;
 //# sourceMappingURL=map-pin.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Star
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
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("star", __iconNode);
;
 //# sourceMappingURL=star.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Star",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Plus
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
            d: "M5 12h14",
            key: "1ays0h"
        }
    ],
    [
        "path",
        {
            d: "M12 5v14",
            key: "s699le"
        }
    ]
];
const Plus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("plus", __iconNode);
;
 //# sourceMappingURL=plus.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Plus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_7dcc48f5._.js.map