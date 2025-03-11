"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./src/components/layout/DashboardLayout.tsx":
/*!***************************************************!*\
  !*** ./src/components/layout/DashboardLayout.tsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ DashboardLayout; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sidebar */ \"(app-pages-browser)/./src/components/layout/Sidebar.tsx\");\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Header */ \"(app-pages-browser)/./src/components/layout/Header.tsx\");\n/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Footer */ \"(app-pages-browser)/./src/components/layout/Footer.tsx\");\n/* harmony import */ var _BentoGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BentoGrid */ \"(app-pages-browser)/./src/components/layout/BentoGrid.tsx\");\n/* harmony import */ var _components_features_ActivityStream__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/features/ActivityStream */ \"(app-pages-browser)/./src/components/features/ActivityStream.tsx\");\n/* harmony import */ var _context_ThemeContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/context/ThemeContext */ \"(app-pages-browser)/./src/context/ThemeContext.tsx\");\n/* harmony import */ var _store_uiStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/store/uiStore */ \"(app-pages-browser)/./src/store/uiStore.ts\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nfunction DashboardLayout(param) {\n    let { children } = param;\n    _s();\n    const { sidebarCollapsed, pinnedMetrics, recentlyViewed, activities, aiInsights, syncStatus } = (0,_store_uiStore__WEBPACK_IMPORTED_MODULE_8__.useUIStore)();\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_9__.usePathname)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_ThemeContext__WEBPACK_IMPORTED_MODULE_7__.ThemeProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Sidebar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                    lineNumber: 41,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex-1 flex flex-col overflow-hidden transition-all duration-300 \".concat(sidebarCollapsed ? \"ml-20\" : \"ml-64\"),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                            lineNumber: 43,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                            className: \"flex-1 overflow-y-auto p-6\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"transition-all duration-300 \".concat(sidebarCollapsed ? \"w-full\" : \"max-w-7xl\", \" mx-auto\"),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"grid grid-cols-12 gap-6 \".concat(sidebarCollapsed ? \"pr-4\" : \"\"),\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"col-span-12 \".concat(sidebarCollapsed ? \"lg:col-span-9\" : \"lg:col-span-8\"),\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                    className: \"mb-6\",\n                                                    children: children\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                                    lineNumber: 52,\n                                                    columnNumber: 19\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                    className: \"mb-6\",\n                                                    children: [\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                                            className: \"text-xl font-semibold mb-4\",\n                                                            children: \"AI Insights\"\n                                                        }, void 0, false, {\n                                                            fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                                            lineNumber: 58,\n                                                            columnNumber: 21\n                                                        }, this),\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_BentoGrid__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                                            insights: aiInsights\n                                                        }, void 0, false, {\n                                                            fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                                            lineNumber: 59,\n                                                            columnNumber: 21\n                                                        }, this)\n                                                    ]\n                                                }, void 0, true, {\n                                                    fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                                    lineNumber: 57,\n                                                    columnNumber: 19\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                    className: \"mb-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-4 border border-neutral-200 dark:border-neutral-700\",\n                                                    children: [\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                                            className: \"text-lg font-medium mb-3\",\n                                                            children: \"Recent Activity\"\n                                                        }, void 0, false, {\n                                                            fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                                            lineNumber: 64,\n                                                            columnNumber: 21\n                                                        }, this),\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_features_ActivityStream__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                                            activities: activities.slice(0, 5),\n                                                            compact: false\n                                                        }, void 0, false, {\n                                                            fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                                            lineNumber: 65,\n                                                            columnNumber: 21\n                                                        }, this)\n                                                    ]\n                                                }, void 0, true, {\n                                                    fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                                    lineNumber: 63,\n                                                    columnNumber: 19\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                            lineNumber: 50,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"col-span-12 \".concat(sidebarCollapsed ? \"lg:col-span-3\" : \"lg:col-span-4\", \" space-y-6\")\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                            lineNumber: 70,\n                                            columnNumber: 17\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                    lineNumber: 48,\n                                    columnNumber: 15\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                                lineNumber: 46,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                            lineNumber: 45,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Footer__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                            lineNumber: 76,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n                    lineNumber: 42,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n            lineNumber: 40,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Desktop\\\\2025 Web Projects\\\\startup-exel\\\\src\\\\components\\\\layout\\\\DashboardLayout.tsx\",\n        lineNumber: 39,\n        columnNumber: 5\n    }, this);\n}\n_s(DashboardLayout, \"/96GtefAhQnVqN+FVwcp0qXC+Ns=\", false, function() {\n    return [\n        _store_uiStore__WEBPACK_IMPORTED_MODULE_8__.useUIStore,\n        next_navigation__WEBPACK_IMPORTED_MODULE_9__.usePathname\n    ];\n});\n_c = DashboardLayout;\nvar _c;\n$RefreshReg$(_c, \"DashboardLayout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2xheW91dC9EYXNoYm9hcmRMYXlvdXQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTBCO0FBQ007QUFDRjtBQUNBO0FBQ007QUFDOEI7QUFDWDtBQUNWO0FBQ0M7QUFlL0IsU0FBU1MsZ0JBQWdCLEtBQWtDO1FBQWxDLEVBQUVDLFFBQVEsRUFBd0IsR0FBbEM7O0lBQ3RDLE1BQU0sRUFDSkMsZ0JBQWdCLEVBQ2hCQyxhQUFhLEVBQ2JDLGNBQWMsRUFDZEMsVUFBVSxFQUNWQyxVQUFVLEVBQ1ZDLFVBQVUsRUFDWCxHQUFHVCwwREFBVUE7SUFFZCxNQUFNVSxXQUFXVCw0REFBV0E7SUFFNUIscUJBQ0UsOERBQUNGLGdFQUFhQTtrQkFDWiw0RUFBQ1k7WUFBSUMsV0FBVTs7OEJBQ2IsOERBQUNsQixnREFBT0E7Ozs7OzhCQUNSLDhEQUFDaUI7b0JBQUlDLFdBQVcsb0VBQXlHLE9BQXJDUixtQkFBbUIsVUFBVTs7c0NBQy9HLDhEQUFDVCwrQ0FBTUE7Ozs7O3NDQUVQLDhEQUFDa0I7NEJBQUtELFdBQVU7c0NBQ2QsNEVBQUNEO2dDQUFJQyxXQUFXLCtCQUF5RSxPQUExQ1IsbUJBQW1CLFdBQVcsYUFBWTswQ0FFdkYsNEVBQUNPO29DQUFJQyxXQUFXLDJCQUEwRCxPQUEvQlIsbUJBQW1CLFNBQVM7O3NEQUVyRSw4REFBQ087NENBQUlDLFdBQVcsZUFBb0UsT0FBckRSLG1CQUFtQixrQkFBa0I7OzhEQUVsRSw4REFBQ087b0RBQUlDLFdBQVU7OERBQ1pUOzs7Ozs7OERBSUgsOERBQUNRO29EQUFJQyxXQUFVOztzRUFDYiw4REFBQ0U7NERBQUdGLFdBQVU7c0VBQTZCOzs7Ozs7c0VBQzNDLDhEQUFDZixrREFBU0E7NERBQUNrQixVQUFVUDs7Ozs7Ozs7Ozs7OzhEQUl2Qiw4REFBQ0c7b0RBQUlDLFdBQVU7O3NFQUNiLDhEQUFDSTs0REFBR0osV0FBVTtzRUFBMkI7Ozs7OztzRUFDekMsOERBQUNkLDJFQUFjQTs0REFBQ1MsWUFBWUEsV0FBV1UsS0FBSyxDQUFDLEdBQUc7NERBQUlDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7OztzREFLakUsOERBQUNQOzRDQUFJQyxXQUFXLGVBQW9FLE9BQXJEUixtQkFBbUIsa0JBQWtCLGlCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FNMUYsOERBQUNSLCtDQUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtqQjtHQXZEd0JNOztRQVFsQkYsc0RBQVVBO1FBRUdDLHdEQUFXQTs7O0tBVk5DIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL2xheW91dC9EYXNoYm9hcmRMYXlvdXQudHN4PzE1NWQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2lkZWJhciBmcm9tICcuL1NpZGViYXInO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vRm9vdGVyJztcbmltcG9ydCBCZW50b0dyaWQgZnJvbSAnLi9CZW50b0dyaWQnO1xuaW1wb3J0IEFjdGl2aXR5U3RyZWFtIGZyb20gJ0AvY29tcG9uZW50cy9mZWF0dXJlcy9BY3Rpdml0eVN0cmVhbSc7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnQC9jb250ZXh0L1RoZW1lQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VVSVN0b3JlIH0gZnJvbSAnQC9zdG9yZS91aVN0b3JlJztcbmltcG9ydCB7IHVzZVBhdGhuYW1lIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcblxuaW50ZXJmYWNlIERhc2hib2FyZExheW91dFByb3BzIHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn1cblxuaW50ZXJmYWNlIFVJU3RvcmUge1xuICBzaWRlYmFyQ29sbGFwc2VkOiBib29sZWFuO1xuICBwaW5uZWRNZXRyaWNzOiBhbnlbXTtcbiAgcmVjZW50bHlWaWV3ZWQ6IGFueVtdO1xuICBhY3Rpdml0aWVzOiBhbnlbXTtcbiAgYWlJbnNpZ2h0czogYW55W107XG4gIHN5bmNTdGF0dXM6IGFueTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGFzaGJvYXJkTGF5b3V0KHsgY2hpbGRyZW4gfTogRGFzaGJvYXJkTGF5b3V0UHJvcHMpIHtcbiAgY29uc3QgeyBcbiAgICBzaWRlYmFyQ29sbGFwc2VkLFxuICAgIHBpbm5lZE1ldHJpY3MsXG4gICAgcmVjZW50bHlWaWV3ZWQsXG4gICAgYWN0aXZpdGllcyxcbiAgICBhaUluc2lnaHRzLFxuICAgIHN5bmNTdGF0dXNcbiAgfSA9IHVzZVVJU3RvcmUoKSBhcyBVSVN0b3JlO1xuICBcbiAgY29uc3QgcGF0aG5hbWUgPSB1c2VQYXRobmFtZSgpO1xuXG4gIHJldHVybiAoXG4gICAgPFRoZW1lUHJvdmlkZXI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC1zY3JlZW4gYmctbmV1dHJhbC01MCBkYXJrOmJnLW5ldXRyYWwtOTAwIHRleHQtbmV1dHJhbC05MDAgZGFyazp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgIDxTaWRlYmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleC0xIGZsZXggZmxleC1jb2wgb3ZlcmZsb3ctaGlkZGVuIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke3NpZGViYXJDb2xsYXBzZWQgPyAnbWwtMjAnIDogJ21sLTY0J31gfT5cbiAgICAgICAgICA8SGVhZGVyIC8+XG4gICAgICAgICAgXG4gICAgICAgICAgPG1haW4gY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwLTZcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7c2lkZWJhckNvbGxhcHNlZCA/ICd3LWZ1bGwnIDogJ21heC13LTd4bCd9IG14LWF1dG9gfT5cbiAgICAgICAgICAgICAgey8qIE1haW4gY29udGVudCBhcmVhICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEyIGdhcC02ICR7c2lkZWJhckNvbGxhcHNlZCA/ICdwci00JyA6ICcnfWB9PlxuICAgICAgICAgICAgICAgIHsvKiBQcmltYXJ5IGNvbnRlbnQgLSBhZGp1c3RzIHdpZHRoIGJhc2VkIG9uIHNpZGViYXIgc3RhdGUgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb2wtc3Bhbi0xMiAke3NpZGViYXJDb2xsYXBzZWQgPyAnbGc6Y29sLXNwYW4tOScgOiAnbGc6Y29sLXNwYW4tOCd9YH0+XG4gICAgICAgICAgICAgICAgICB7LyogTWFpbiBkYXNoYm9hcmQgY29udGVudCAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNlwiPlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgey8qIEFJIEluc2lnaHRzIEJlbnRvIEdyaWQgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZW1pYm9sZCBtYi00XCI+QUkgSW5zaWdodHM8L2gyPlxuICAgICAgICAgICAgICAgICAgICA8QmVudG9HcmlkIGluc2lnaHRzPXthaUluc2lnaHRzfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHsvKiBBY3Rpdml0eSBTdHJlYW0gKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTYgYmctd2hpdGUgZGFyazpiZy1uZXV0cmFsLTgwMCByb3VuZGVkLXhsIHNoYWRvdy1zbSBwLTQgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCBkYXJrOmJvcmRlci1uZXV0cmFsLTcwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LW1lZGl1bSBtYi0zXCI+UmVjZW50IEFjdGl2aXR5PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPEFjdGl2aXR5U3RyZWFtIGFjdGl2aXRpZXM9e2FjdGl2aXRpZXMuc2xpY2UoMCwgNSl9IGNvbXBhY3Q9e2ZhbHNlfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgey8qIFNpZGViYXIgY29udGVudCAtIGFkanVzdHMgd2lkdGggYmFzZWQgb24gc2lkZWJhciBzdGF0ZSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbC1zcGFuLTEyICR7c2lkZWJhckNvbGxhcHNlZCA/ICdsZzpjb2wtc3Bhbi0zJyA6ICdsZzpjb2wtc3Bhbi00J30gc3BhY2UteS02YH0+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9tYWluPlxuICAgICAgICAgIFxuICAgICAgICAgIDxGb290ZXIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L1RoZW1lUHJvdmlkZXI+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJTaWRlYmFyIiwiSGVhZGVyIiwiRm9vdGVyIiwiQmVudG9HcmlkIiwiQWN0aXZpdHlTdHJlYW0iLCJUaGVtZVByb3ZpZGVyIiwidXNlVUlTdG9yZSIsInVzZVBhdGhuYW1lIiwiRGFzaGJvYXJkTGF5b3V0IiwiY2hpbGRyZW4iLCJzaWRlYmFyQ29sbGFwc2VkIiwicGlubmVkTWV0cmljcyIsInJlY2VudGx5Vmlld2VkIiwiYWN0aXZpdGllcyIsImFpSW5zaWdodHMiLCJzeW5jU3RhdHVzIiwicGF0aG5hbWUiLCJkaXYiLCJjbGFzc05hbWUiLCJtYWluIiwiaDIiLCJpbnNpZ2h0cyIsImgzIiwic2xpY2UiLCJjb21wYWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/layout/DashboardLayout.tsx\n"));

/***/ })

});