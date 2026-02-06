(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/[adminPath]/hospitals/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HospitalManagement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ToastContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
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
        image_url: '',
        phone_number: '',
        map_url: ''
    };
    const DEFAULT_HOSPITAL_IMAGE = 'https://images.unsplash.com/photo-1587351021759-3e566b9af955?auto=format&fit=crop&q=80&w=800';
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialForm);
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            name: '',
            category: '',
            price: '',
            discount_price: ''
        }
    ]);
    const addServiceRow = ()=>{
        setServices([
            ...services,
            {
                name: '',
                category: '',
                price: '',
                discount_price: ''
            }
        ]);
    };
    const removeServiceRow = (index)=>{
        const newServices = [
            ...services
        ];
        newServices.splice(index, 1);
        setServices(newServices);
    };
    // Standard Services List
    const STANDARD_SERVICES = [
        {
            name: 'MRI Scan',
            category: 'Radiology',
            price: '4500'
        },
        {
            name: 'CT Scan',
            category: 'Radiology',
            price: '3500'
        },
        {
            name: 'X-Ray',
            category: 'Radiology',
            price: '500'
        },
        {
            name: 'Ultrasound',
            category: 'Radiology',
            price: '1200'
        },
        {
            name: 'CBC Test',
            category: 'Pathology',
            price: '350'
        },
        {
            name: 'Lipid Profile',
            category: 'Pathology',
            price: '800'
        },
        {
            name: 'Liver Function Test',
            category: 'Pathology',
            price: '900'
        },
        {
            name: 'Thyroid Profile',
            category: 'Pathology',
            price: '600'
        },
        {
            name: 'Consultation',
            category: 'Consultation',
            price: '500'
        }
    ];
    const autofillServices = ()=>{
        // Append standard services to existing ones (removing empty placeholder if exists)
        let currentServices = [
            ...services
        ];
        if (currentServices.length === 1 && currentServices[0].name === '') {
            currentServices = [];
        }
        const newServices = [
            ...currentServices,
            ...STANDARD_SERVICES.map((s)=>({
                    ...s,
                    discount_price: '' // Discount left empty for user to fill if needed
                }))
        ];
        setServices(newServices);
    };
    const updateService = (index, field, value)=>{
        const newServices = [
            ...services
        ];
        newServices[index][field] = value;
        setServices(newServices);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HospitalManagement.useEffect": ()=>{
            fetchHospitals();
        }
    }["HospitalManagement.useEffect"], []);
    const fetchHospitals = async ()=>{
        try {
            const res = await fetch(`${("TURBOPACK compile-time value", "https://suvidha-server-4u66.onrender.com") || 'https://suvidha-server-4u66.onrender.com'}/api/hospitals`);
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
        setFormData((prev)=>({
                ...prev,
                image_file: null
            })); // Explicitly clear file
        setServices([
            {
                name: '',
                category: '',
                price: '',
                discount_price: ''
            }
        ]);
        setEditMode(false);
        setEditId(null);
    };
    const handleEdit = async (hospital)=>{
        // Visual feedback immediately
        setShowForm(true);
        setEditMode(true);
        setEditId(hospital.id);
        // Pre-fill basic data
        setFormData({
            name: hospital.name,
            location: hospital.location,
            rating: hospital.rating,
            discount_percentage: hospital.discount_percentage,
            discount_description: hospital.discount_description,
            image_url: hospital.image_url || initialForm.image_url,
            phone_number: hospital.phone_number || '',
            map_url: hospital.map_url || ''
        });
        // Fetch Services
        try {
            const res = await fetch(`${("TURBOPACK compile-time value", "https://suvidha-server-4u66.onrender.com") || 'https://suvidha-server-4u66.onrender.com'}/api/hospitals/${hospital.id}`);
            if (res.ok) {
                const fullData = await res.json();
                if (fullData.services && fullData.services.length > 0) {
                    setServices(fullData.services);
                } else {
                    setServices([
                        {
                            name: '',
                            category: '',
                            price: '',
                            discount_price: ''
                        }
                    ]);
                }
            }
        } catch (e) {
            console.error("Failed to fetch hospital details", e);
        }
    };
    const handleDelete = async (id)=>{
        if (!confirm('Are you sure you want to delete this hospital?')) return;
        try {
            const res = await fetch(`${("TURBOPACK compile-time value", "https://suvidha-server-4u66.onrender.com") || 'https://suvidha-server-4u66.onrender.com'}/api/hospitals/${id}`, {
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
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const url = editMode ? `${("TURBOPACK compile-time value", "https://suvidha-server-4u66.onrender.com") || 'https://suvidha-server-4u66.onrender.com'}/api/hospitals/${editId}` : `${("TURBOPACK compile-time value", "https://suvidha-server-4u66.onrender.com") || 'https://suvidha-server-4u66.onrender.com'}/api/hospitals`;
            const method = editMode ? 'PUT' : 'POST';
            const data = new FormData();
            data.append('name', formData.name);
            data.append('location', formData.location);
            data.append('rating', formData.rating);
            data.append('discount_percentage', formData.discount_percentage);
            data.append('discount_description', formData.discount_description);
            data.append('phone_number', formData.phone_number);
            data.append('map_url', formData.map_url);
            // Append Services as JSON string
            data.append('services', JSON.stringify(services));
            if (formData.image_file) {
                data.append('image', formData.image_file);
            } else if (formData.image_url) {
                data.append('image_url', formData.image_url); // Keep existing URL if no new file
            }
            const res = await fetch(url, {
                method: method,
                // headers: { 'Content-Type': 'multipart/form-data' }, // Do NOT set manually
                body: data
            });
            if (res.ok) {
                addToast(editMode ? 'Hospital Updated Successfully!' : 'Hospital Added Successfully!', 'success');
                setShowForm(false);
                resetForm();
                fetchHospitals(); // Refresh list
            } else {
                addToast('Failed to save hospital', 'error');
            }
        } catch (err) {
            console.error(err);
        }
    };
    // Light & Clean Styles matching Dashboard
    const cardStyle = {
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
    };
    const inputStyle = {
        width: '100%',
        padding: '1rem',
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        color: 'var(--text-primary)',
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
                                fontWeight: '800',
                                color: 'var(--text-primary)'
                            },
                            children: editMode ? 'Edit Hospital' : 'Add New Hospital'
                        }, void 0, false, {
                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                            lineNumber: 218,
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
                                border: '1px solid var(--border)',
                                color: 'var(--text-secondary)'
                            },
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                            lineNumber: 221,
                            columnNumber: 19
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                    lineNumber: 217,
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
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.9rem',
                                            fontWeight: '500'
                                        },
                                        children: "Hospital Name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 228,
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
                                        lineNumber: 229,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 227,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.8rem',
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.9rem',
                                            fontWeight: '500'
                                        },
                                        children: "Location (City, Area)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 238,
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
                                                    color: 'var(--text-secondary)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 240,
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
                                                placeholder: "e.g. Bandra West, Mumbai"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 241,
                                                columnNumber: 30
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 239,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 237,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.8rem',
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.9rem',
                                            fontWeight: '500'
                                        },
                                        children: "Google Maps Link"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 251,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.map_url,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                map_url: e.target.value
                                            }),
                                        style: inputStyle,
                                        placeholder: "Paste Google Maps URL here"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 252,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 250,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.8rem',
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.9rem',
                                            fontWeight: '500'
                                        },
                                        children: "Hospital Image (Upload)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 261,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/*",
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                image_file: e.target.files[0]
                                            }),
                                        style: inputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 262,
                                        columnNumber: 27
                                    }, this),
                                    formData.image_url && !formData.image_file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: '5px',
                                            fontSize: '0.8rem',
                                            color: 'var(--accent)'
                                        },
                                        children: [
                                            "Current Image: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: formData.image_url.startsWith('/') ? (("TURBOPACK compile-time value", "https://suvidha-server-4u66.onrender.com") || 'https://suvidha-server-4u66.onrender.com') + formData.image_url : formData.image_url,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                style: {
                                                    color: 'inherit'
                                                },
                                                children: "View"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 270,
                                                columnNumber: 50
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 269,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 260,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '1.5rem'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: 'block',
                                                marginBottom: '0.8rem',
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.9rem'
                                            },
                                            children: "Rating"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                            lineNumber: 277,
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
                                                    lineNumber: 279,
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
                                                    lineNumber: 280,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                            lineNumber: 278,
                                            columnNumber: 31
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                    lineNumber: 276,
                                    columnNumber: 27
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 275,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.8rem',
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.9rem',
                                            fontWeight: '500'
                                        },
                                        children: "Offer Headline"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 290,
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
                                        lineNumber: 291,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 289,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.8rem',
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.9rem',
                                            fontWeight: '500'
                                        },
                                        children: "WhatsApp Number (for Notifications)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 299,
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
                                        lineNumber: 300,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 298,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '1.5rem',
                                    paddingTop: '1.5rem',
                                    borderTop: '1px solid var(--border)'
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
                                                    color: 'var(--text-primary)',
                                                    fontWeight: 'bold'
                                                },
                                                children: "Add Services"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 310,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: '10px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: autofillServices,
                                                        style: {
                                                            background: 'rgba(56, 189, 248, 0.15)',
                                                            color: '#0284c7',
                                                            border: 'none',
                                                            padding: '6px 12px',
                                                            borderRadius: '6px',
                                                            fontSize: '0.85rem',
                                                            cursor: 'pointer',
                                                            fontWeight: '500'
                                                        },
                                                        children: "Autofill Standard"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 312,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: addServiceRow,
                                                        style: {
                                                            background: 'rgba(16, 185, 129, 0.15)',
                                                            color: '#059669',
                                                            border: 'none',
                                                            padding: '6px 12px',
                                                            borderRadius: '6px',
                                                            fontSize: '0.85rem',
                                                            cursor: 'pointer',
                                                            fontWeight: '500'
                                                        },
                                                        children: "+ Add Row"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 313,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 311,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 309,
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
                                                    background: 'var(--bg-primary)',
                                                    border: '1px solid var(--border)',
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
                                                        lineNumber: 320,
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
                                                        lineNumber: 327,
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
                                                        lineNumber: 334,
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
                                                        lineNumber: 341,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                        size: 20,
                                                        color: "#f87171",
                                                        style: {
                                                            cursor: 'pointer'
                                                        },
                                                        onClick: ()=>removeServiceRow(index)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                        lineNumber: 347,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 319,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 317,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                        id: "categories",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Radiology"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 352,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Pathology"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 353,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Cardiology"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 354,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Consultation"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 355,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 351,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 308,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn",
                                style: {
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    background: 'var(--accent)',
                                    color: 'var(--accent-text)',
                                    border: 'none',
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    fontWeight: 'bold'
                                },
                                children: editMode ? 'Update Hospital' : 'Add Hospital & Services'
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 359,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 225,
                        columnNumber: 19
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                    lineNumber: 224,
                    columnNumber: 15
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
            lineNumber: 216,
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
                                    color: 'var(--text-primary)'
                                },
                                children: "Hospital Partners"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 378,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: 'var(--text-secondary)',
                                    marginTop: '0.5rem'
                                },
                                children: "Manage your network of healthcare providers."
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 379,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 377,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn",
                        onClick: ()=>{
                            resetForm();
                            setShowForm(true);
                        },
                        style: {
                            background: 'var(--accent)',
                            color: 'var(--accent-text)',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            padding: '0.8rem 1.5rem',
                            fontWeight: 'bold'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 20,
                                style: {
                                    marginRight: '8px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 386,
                                columnNumber: 17
                            }, this),
                            " Add Hospital"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 381,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                lineNumber: 376,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid-cards",
                style: {
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                },
                children: hospitals.map((hospital)=>{
                    // Determine Background Image
                    let bgImage = DEFAULT_HOSPITAL_IMAGE;
                    if (hospital.image_url && !hospital.image_url.includes('linear-gradient')) {
                        bgImage = hospital.image_url.startsWith('/') ? (("TURBOPACK compile-time value", "https://suvidha-server-4u66.onrender.com") || 'https://suvidha-server-4u66.onrender.com') + hospital.image_url : hospital.image_url;
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    background: `url('${bgImage}') center/cover no-repeat`,
                                    position: 'relative'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        background: 'rgba(0,0,0,0.6)',
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
                                            lineNumber: 408,
                                            columnNumber: 29
                                        }, this),
                                        " ",
                                        hospital.rating
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                    lineNumber: 407,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 402,
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
                                            color: 'var(--text-primary)',
                                            fontWeight: '700'
                                        },
                                        children: hospital.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 412,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.95rem',
                                            marginBottom: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                size: 16,
                                                color: "var(--text-secondary)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 414,
                                                columnNumber: 28
                                            }, this),
                                            hospital.map_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: hospital.map_url,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                style: {
                                                    color: 'var(--accent)',
                                                    textDecoration: 'none'
                                                },
                                                className: "hover:underline",
                                                children: hospital.location
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 416,
                                                columnNumber: 32
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: hospital.location
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 420,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 413,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '1.5rem'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 424,
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
                                                    background: 'var(--bg-primary)',
                                                    border: '1px solid var(--border)',
                                                    color: 'var(--text-secondary)'
                                                },
                                                children: "Edit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 429,
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
                                                lineNumber: 430,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 428,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 411,
                                columnNumber: 21
                            }, this)
                        ]
                    }, hospital.id, true, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 401,
                        columnNumber: 17
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                lineNumber: 390,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid-cards",
                style: {
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                },
                children: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            ...cardStyle,
                            height: '350px',
                            background: 'var(--bg-card)',
                            position: 'relative',
                            overflow: 'hidden'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: '160px',
                                    background: 'var(--border)',
                                    opacity: 0.1
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 441,
                                columnNumber: 26
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: '24px',
                                            width: '60%',
                                            background: 'var(--border)',
                                            marginBottom: '1rem',
                                            borderRadius: '4px',
                                            opacity: 0.1
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 443,
                                        columnNumber: 30
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: '16px',
                                            width: '40%',
                                            background: 'var(--border)',
                                            marginBottom: '1.5rem',
                                            borderRadius: '4px',
                                            opacity: 0.1
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 444,
                                        columnNumber: 30
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '1rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: '40px',
                                                    background: 'var(--border)',
                                                    borderRadius: '8px',
                                                    opacity: 0.1
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 446,
                                                columnNumber: 34
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: '40px',
                                                    background: 'var(--border)',
                                                    borderRadius: '8px',
                                                    opacity: 0.1
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                                lineNumber: 447,
                                                columnNumber: 34
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                        lineNumber: 445,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                                lineNumber: 442,
                                columnNumber: 26
                            }, this)
                        ]
                    }, n, true, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 440,
                        columnNumber: 22
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                lineNumber: 438,
                columnNumber: 14
            }, this),
            hospitals.length === 0 && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '6rem',
                    textAlign: 'center',
                    color: 'var(--text-secondary)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'var(--bg-card)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            border: '1px solid var(--border)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                            size: 40,
                            style: {
                                opacity: 0.5,
                                color: 'var(--text-primary)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                            lineNumber: 458,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 457,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: '1.5rem',
                            marginBottom: '0.5rem',
                            color: 'var(--text-primary)'
                        },
                        children: "No hospitals added yet."
                    }, void 0, false, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 460,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '1.1rem'
                        },
                        children: 'Click "Add Hospital" to onboard your first partner.'
                    }, void 0, false, {
                        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                        lineNumber: 461,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
                lineNumber: 456,
                columnNumber: 14
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[adminPath]/hospitals/page.js",
        lineNumber: 375,
        columnNumber: 5
    }, this);
}
_s(HospitalManagement, "/lc9kn9gJxj5liTSLS+RJlFl+Mk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
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
]);

//# sourceMappingURL=_d4f66978._.js.map