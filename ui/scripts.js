(() => {
    var t = {
        1317: (t, e, r) => {
            "use strict";
            r.r(e), r.d(e, {default: () => n});
            const n = {}
        }, 9669: (t, e, r) => {
            t.exports = r(1609)
        }, 5448: (t, e, r) => {
            "use strict";
            var n = r(4867), o = r(6026), i = r(4372), a = r(5327), s = r(4097), u = r(4109), c = r(7985), f = r(5061),
                l = r(5655), p = r(5263);
            t.exports = function (t) {
                return new Promise((function (e, r) {
                    var h, d = t.data, y = t.headers, g = t.responseType;

                    function w() {
                        t.cancelToken && t.cancelToken.unsubscribe(h), t.signal && t.signal.removeEventListener("abort", h)
                    }

                    n.isFormData(d) && delete y["Content-Type"];
                    var m = new XMLHttpRequest;
                    if (t.auth) {
                        var b = t.auth.username || "",
                            v = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
                        y.Authorization = "Basic " + btoa(b + ":" + v)
                    }
                    var A = s(t.baseURL, t.url);

                    function S() {
                        if (m) {
                            var n = "getAllResponseHeaders" in m ? u(m.getAllResponseHeaders()) : null, i = {
                                data: g && "text" !== g && "json" !== g ? m.response : m.responseText,
                                status: m.status,
                                statusText: m.statusText,
                                headers: n,
                                config: t,
                                request: m
                            };
                            o((function (t) {
                                e(t), w()
                            }), (function (t) {
                                r(t), w()
                            }), i), m = null
                        }
                    }

                    if (m.open(t.method.toUpperCase(), a(A, t.params, t.paramsSerializer), !0), m.timeout = t.timeout, "onloadend" in m ? m.onloadend = S : m.onreadystatechange = function () {
                        m && 4 === m.readyState && (0 !== m.status || m.responseURL && 0 === m.responseURL.indexOf("file:")) && setTimeout(S)
                    }, m.onabort = function () {
                        m && (r(f("Request aborted", t, "ECONNABORTED", m)), m = null)
                    }, m.onerror = function () {
                        r(f("Network Error", t, null, m)), m = null
                    }, m.ontimeout = function () {
                        var e = "timeout of " + t.timeout + "ms exceeded", n = t.transitional || l.transitional;
                        t.timeoutErrorMessage && (e = t.timeoutErrorMessage), r(f(e, t, n.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", m)), m = null
                    }, n.isStandardBrowserEnv()) {
                        var E = (t.withCredentials || c(A)) && t.xsrfCookieName ? i.read(t.xsrfCookieName) : void 0;
                        E && (y[t.xsrfHeaderName] = E)
                    }
                    "setRequestHeader" in m && n.forEach(y, (function (t, e) {
                        void 0 === d && "content-type" === e.toLowerCase() ? delete y[e] : m.setRequestHeader(e, t)
                    })), n.isUndefined(t.withCredentials) || (m.withCredentials = !!t.withCredentials), g && "json" !== g && (m.responseType = t.responseType), "function" == typeof t.onDownloadProgress && m.addEventListener("progress", t.onDownloadProgress), "function" == typeof t.onUploadProgress && m.upload && m.upload.addEventListener("progress", t.onUploadProgress), (t.cancelToken || t.signal) && (h = function (t) {
                        m && (r(!t || t && t.type ? new p("canceled") : t), m.abort(), m = null)
                    }, t.cancelToken && t.cancelToken.subscribe(h), t.signal && (t.signal.aborted ? h() : t.signal.addEventListener("abort", h))), d || (d = null), m.send(d)
                }))
            }
        }, 1609: (t, e, r) => {
            "use strict";
            var n = r(4867), o = r(1849), i = r(321), a = r(7185);
            var s = function t(e) {
                var r = new i(e), s = o(i.prototype.request, r);
                return n.extend(s, i.prototype, r), n.extend(s, r), s.create = function (r) {
                    return t(a(e, r))
                }, s
            }(r(5655));
            s.Axios = i, s.Cancel = r(5263), s.CancelToken = r(4972), s.isCancel = r(6502), s.VERSION = r(7288).version, s.all = function (t) {
                return Promise.all(t)
            }, s.spread = r(8713), s.isAxiosError = r(6268), t.exports = s, t.exports.default = s
        }, 5263: t => {
            "use strict";

            function e(t) {
                this.message = t
            }

            e.prototype.toString = function () {
                return "Cancel" + (this.message ? ": " + this.message : "")
            }, e.prototype.__CANCEL__ = !0, t.exports = e
        }, 4972: (t, e, r) => {
            "use strict";
            var n = r(5263);

            function o(t) {
                if ("function" != typeof t) throw new TypeError("executor must be a function.");
                var e;
                this.promise = new Promise((function (t) {
                    e = t
                }));
                var r = this;
                this.promise.then((function (t) {
                    if (r._listeners) {
                        var e, n = r._listeners.length;
                        for (e = 0; e < n; e++) r._listeners[e](t);
                        r._listeners = null
                    }
                })), this.promise.then = function (t) {
                    var e, n = new Promise((function (t) {
                        r.subscribe(t), e = t
                    })).then(t);
                    return n.cancel = function () {
                        r.unsubscribe(e)
                    }, n
                }, t((function (t) {
                    r.reason || (r.reason = new n(t), e(r.reason))
                }))
            }

            o.prototype.throwIfRequested = function () {
                if (this.reason) throw this.reason
            }, o.prototype.subscribe = function (t) {
                this.reason ? t(this.reason) : this._listeners ? this._listeners.push(t) : this._listeners = [t]
            }, o.prototype.unsubscribe = function (t) {
                if (this._listeners) {
                    var e = this._listeners.indexOf(t);
                    -1 !== e && this._listeners.splice(e, 1)
                }
            }, o.source = function () {
                var t;
                return {
                    token: new o((function (e) {
                        t = e
                    })), cancel: t
                }
            }, t.exports = o
        }, 6502: t => {
            "use strict";
            t.exports = function (t) {
                return !(!t || !t.__CANCEL__)
            }
        }, 321: (t, e, r) => {
            "use strict";
            var n = r(4867), o = r(5327), i = r(782), a = r(3572), s = r(7185), u = r(4875), c = u.validators;

            function f(t) {
                this.defaults = t, this.interceptors = {request: new i, response: new i}
            }

            f.prototype.request = function (t) {
                "string" == typeof t ? (t = arguments[1] || {}).url = arguments[0] : t = t || {}, (t = s(this.defaults, t)).method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
                var e = t.transitional;
                void 0 !== e && u.assertOptions(e, {
                    silentJSONParsing: c.transitional(c.boolean),
                    forcedJSONParsing: c.transitional(c.boolean),
                    clarifyTimeoutError: c.transitional(c.boolean)
                }, !1);
                var r = [], n = !0;
                this.interceptors.request.forEach((function (e) {
                    "function" == typeof e.runWhen && !1 === e.runWhen(t) || (n = n && e.synchronous, r.unshift(e.fulfilled, e.rejected))
                }));
                var o, i = [];
                if (this.interceptors.response.forEach((function (t) {
                    i.push(t.fulfilled, t.rejected)
                })), !n) {
                    var f = [a, void 0];
                    for (Array.prototype.unshift.apply(f, r), f = f.concat(i), o = Promise.resolve(t); f.length;) o = o.then(f.shift(), f.shift());
                    return o
                }
                for (var l = t; r.length;) {
                    var p = r.shift(), h = r.shift();
                    try {
                        l = p(l)
                    } catch (t) {
                        h(t);
                        break
                    }
                }
                try {
                    o = a(l)
                } catch (t) {
                    return Promise.reject(t)
                }
                for (; i.length;) o = o.then(i.shift(), i.shift());
                return o
            }, f.prototype.getUri = function (t) {
                return t = s(this.defaults, t), o(t.url, t.params, t.paramsSerializer).replace(/^\?/, "")
            }, n.forEach(["delete", "get", "head", "options"], (function (t) {
                f.prototype[t] = function (e, r) {
                    return this.request(s(r || {}, {method: t, url: e, data: (r || {}).data}))
                }
            })), n.forEach(["post", "put", "patch"], (function (t) {
                f.prototype[t] = function (e, r, n) {
                    return this.request(s(n || {}, {method: t, url: e, data: r}))
                }
            })), t.exports = f
        }, 782: (t, e, r) => {
            "use strict";
            var n = r(4867);

            function o() {
                this.handlers = []
            }

            o.prototype.use = function (t, e, r) {
                return this.handlers.push({
                    fulfilled: t,
                    rejected: e,
                    synchronous: !!r && r.synchronous,
                    runWhen: r ? r.runWhen : null
                }), this.handlers.length - 1
            }, o.prototype.eject = function (t) {
                this.handlers[t] && (this.handlers[t] = null)
            }, o.prototype.forEach = function (t) {
                n.forEach(this.handlers, (function (e) {
                    null !== e && t(e)
                }))
            }, t.exports = o
        }, 4097: (t, e, r) => {
            "use strict";
            var n = r(1793), o = r(7303);
            t.exports = function (t, e) {
                return t && !n(e) ? o(t, e) : e
            }
        }, 5061: (t, e, r) => {
            "use strict";
            var n = r(481);
            t.exports = function (t, e, r, o, i) {
                var a = new Error(t);
                return n(a, e, r, o, i)
            }
        }, 3572: (t, e, r) => {
            "use strict";
            var n = r(4867), o = r(8527), i = r(6502), a = r(5655), s = r(5263);

            function u(t) {
                if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted) throw new s("canceled")
            }

            t.exports = function (t) {
                return u(t), t.headers = t.headers || {}, t.data = o.call(t, t.data, t.headers, t.transformRequest), t.headers = n.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers), n.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (e) {
                    delete t.headers[e]
                })), (t.adapter || a.adapter)(t).then((function (e) {
                    return u(t), e.data = o.call(t, e.data, e.headers, t.transformResponse), e
                }), (function (e) {
                    return i(e) || (u(t), e && e.response && (e.response.data = o.call(t, e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e)
                }))
            }
        }, 481: t => {
            "use strict";
            t.exports = function (t, e, r, n, o) {
                return t.config = e, r && (t.code = r), t.request = n, t.response = o, t.isAxiosError = !0, t.toJSON = function () {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: this.config,
                        code: this.code,
                        status: this.response && this.response.status ? this.response.status : null
                    }
                }, t
            }
        }, 7185: (t, e, r) => {
            "use strict";
            var n = r(4867);
            t.exports = function (t, e) {
                e = e || {};
                var r = {};

                function o(t, e) {
                    return n.isPlainObject(t) && n.isPlainObject(e) ? n.merge(t, e) : n.isPlainObject(e) ? n.merge({}, e) : n.isArray(e) ? e.slice() : e
                }

                function i(r) {
                    return n.isUndefined(e[r]) ? n.isUndefined(t[r]) ? void 0 : o(void 0, t[r]) : o(t[r], e[r])
                }

                function a(t) {
                    if (!n.isUndefined(e[t])) return o(void 0, e[t])
                }

                function s(r) {
                    return n.isUndefined(e[r]) ? n.isUndefined(t[r]) ? void 0 : o(void 0, t[r]) : o(void 0, e[r])
                }

                function u(r) {
                    return r in e ? o(t[r], e[r]) : r in t ? o(void 0, t[r]) : void 0
                }

                var c = {
                    url: a,
                    method: a,
                    data: a,
                    baseURL: s,
                    transformRequest: s,
                    transformResponse: s,
                    paramsSerializer: s,
                    timeout: s,
                    timeoutMessage: s,
                    withCredentials: s,
                    adapter: s,
                    responseType: s,
                    xsrfCookieName: s,
                    xsrfHeaderName: s,
                    onUploadProgress: s,
                    onDownloadProgress: s,
                    decompress: s,
                    maxContentLength: s,
                    maxBodyLength: s,
                    transport: s,
                    httpAgent: s,
                    httpsAgent: s,
                    cancelToken: s,
                    socketPath: s,
                    responseEncoding: s,
                    validateStatus: u
                };
                return n.forEach(Object.keys(t).concat(Object.keys(e)), (function (t) {
                    var e = c[t] || i, o = e(t);
                    n.isUndefined(o) && e !== u || (r[t] = o)
                })), r
            }
        }, 6026: (t, e, r) => {
            "use strict";
            var n = r(5061);
            t.exports = function (t, e, r) {
                var o = r.config.validateStatus;
                r.status && o && !o(r.status) ? e(n("Request failed with status code " + r.status, r.config, null, r.request, r)) : t(r)
            }
        }, 8527: (t, e, r) => {
            "use strict";
            var n = r(4867), o = r(5655);
            t.exports = function (t, e, r) {
                var i = this || o;
                return n.forEach(r, (function (r) {
                    t = r.call(i, t, e)
                })), t
            }
        }, 5655: (t, e, r) => {
            "use strict";
            var n = r(4155), o = r(4867), i = r(6016), a = r(481),
                s = {"Content-Type": "application/x-www-form-urlencoded"};

            function u(t, e) {
                !o.isUndefined(t) && o.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e)
            }

            var c, f = {
                transitional: {silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1},
                adapter: (("undefined" != typeof XMLHttpRequest || void 0 !== n && "[object process]" === Object.prototype.toString.call(n)) && (c = r(5448)), c),
                transformRequest: [function (t, e) {
                    return i(e, "Accept"), i(e, "Content-Type"), o.isFormData(t) || o.isArrayBuffer(t) || o.isBuffer(t) || o.isStream(t) || o.isFile(t) || o.isBlob(t) ? t : o.isArrayBufferView(t) ? t.buffer : o.isURLSearchParams(t) ? (u(e, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : o.isObject(t) || e && "application/json" === e["Content-Type"] ? (u(e, "application/json"), function (t, e, r) {
                        if (o.isString(t)) try {
                            return (e || JSON.parse)(t), o.trim(t)
                        } catch (t) {
                            if ("SyntaxError" !== t.name) throw t
                        }
                        return (r || JSON.stringify)(t)
                    }(t)) : t
                }],
                transformResponse: [function (t) {
                    var e = this.transitional || f.transitional, r = e && e.silentJSONParsing,
                        n = e && e.forcedJSONParsing, i = !r && "json" === this.responseType;
                    if (i || n && o.isString(t) && t.length) try {
                        return JSON.parse(t)
                    } catch (t) {
                        if (i) {
                            if ("SyntaxError" === t.name) throw a(t, this, "E_JSON_PARSE");
                            throw t
                        }
                    }
                    return t
                }],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                maxBodyLength: -1,
                validateStatus: function (t) {
                    return t >= 200 && t < 300
                },
                headers: {common: {Accept: "application/json, text/plain, */*"}}
            };
            o.forEach(["delete", "get", "head"], (function (t) {
                f.headers[t] = {}
            })), o.forEach(["post", "put", "patch"], (function (t) {
                f.headers[t] = o.merge(s)
            })), t.exports = f
        }, 7288: t => {
            t.exports = {version: "0.22.0"}
        }, 1849: t => {
            "use strict";
            t.exports = function (t, e) {
                return function () {
                    for (var r = new Array(arguments.length), n = 0; n < r.length; n++) r[n] = arguments[n];
                    return t.apply(e, r)
                }
            }
        }, 5327: (t, e, r) => {
            "use strict";
            var n = r(4867);

            function o(t) {
                return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
            }

            t.exports = function (t, e, r) {
                if (!e) return t;
                var i;
                if (r) i = r(e); else if (n.isURLSearchParams(e)) i = e.toString(); else {
                    var a = [];
                    n.forEach(e, (function (t, e) {
                        null != t && (n.isArray(t) ? e += "[]" : t = [t], n.forEach(t, (function (t) {
                            n.isDate(t) ? t = t.toISOString() : n.isObject(t) && (t = JSON.stringify(t)), a.push(o(e) + "=" + o(t))
                        })))
                    })), i = a.join("&")
                }
                if (i) {
                    var s = t.indexOf("#");
                    -1 !== s && (t = t.slice(0, s)), t += (-1 === t.indexOf("?") ? "?" : "&") + i
                }
                return t
            }
        }, 7303: t => {
            "use strict";
            t.exports = function (t, e) {
                return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t
            }
        }, 4372: (t, e, r) => {
            "use strict";
            var n = r(4867);
            t.exports = n.isStandardBrowserEnv() ? {
                write: function (t, e, r, o, i, a) {
                    var s = [];
                    s.push(t + "=" + encodeURIComponent(e)), n.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()), n.isString(o) && s.push("path=" + o), n.isString(i) && s.push("domain=" + i), !0 === a && s.push("secure"), document.cookie = s.join("; ")
                }, read: function (t) {
                    var e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
                    return e ? decodeURIComponent(e[3]) : null
                }, remove: function (t) {
                    this.write(t, "", Date.now() - 864e5)
                }
            } : {
                write: function () {
                }, read: function () {
                    return null
                }, remove: function () {
                }
            }
        }, 1793: t => {
            "use strict";
            t.exports = function (t) {
                return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)
            }
        }, 6268: t => {
            "use strict";
            t.exports = function (t) {
                return "object" == typeof t && !0 === t.isAxiosError
            }
        }, 7985: (t, e, r) => {
            "use strict";
            var n = r(4867);
            t.exports = n.isStandardBrowserEnv() ? function () {
                var t, e = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");

                function o(t) {
                    var n = t;
                    return e && (r.setAttribute("href", n), n = r.href), r.setAttribute("href", n), {
                        href: r.href,
                        protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                        host: r.host,
                        search: r.search ? r.search.replace(/^\?/, "") : "",
                        hash: r.hash ? r.hash.replace(/^#/, "") : "",
                        hostname: r.hostname,
                        port: r.port,
                        pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname
                    }
                }

                return t = o(window.location.href), function (e) {
                    var r = n.isString(e) ? o(e) : e;
                    return r.protocol === t.protocol && r.host === t.host
                }
            }() : function () {
                return !0
            }
        }, 6016: (t, e, r) => {
            "use strict";
            var n = r(4867);
            t.exports = function (t, e) {
                n.forEach(t, (function (r, n) {
                    n !== e && n.toUpperCase() === e.toUpperCase() && (t[e] = r, delete t[n])
                }))
            }
        }, 4109: (t, e, r) => {
            "use strict";
            var n = r(4867),
                o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
            t.exports = function (t) {
                var e, r, i, a = {};
                return t ? (n.forEach(t.split("\n"), (function (t) {
                    if (i = t.indexOf(":"), e = n.trim(t.substr(0, i)).toLowerCase(), r = n.trim(t.substr(i + 1)), e) {
                        if (a[e] && o.indexOf(e) >= 0) return;
                        a[e] = "set-cookie" === e ? (a[e] ? a[e] : []).concat([r]) : a[e] ? a[e] + ", " + r : r
                    }
                })), a) : a
            }
        }, 8713: t => {
            "use strict";
            t.exports = function (t) {
                return function (e) {
                    return t.apply(null, e)
                }
            }
        }, 4875: (t, e, r) => {
            "use strict";
            var n = r(7288).version, o = {};
            ["object", "boolean", "number", "function", "string", "symbol"].forEach((function (t, e) {
                o[t] = function (r) {
                    return typeof r === t || "a" + (e < 1 ? "n " : " ") + t
                }
            }));
            var i = {};
            o.transitional = function (t, e, r) {
                function o(t, e) {
                    return "[Axios v" + n + "] Transitional option '" + t + "'" + e + (r ? ". " + r : "")
                }

                return function (r, n, a) {
                    if (!1 === t) throw new Error(o(n, " has been removed" + (e ? " in " + e : "")));
                    return e && !i[n] && (i[n] = !0, console.warn(o(n, " has been deprecated since v" + e + " and will be removed in the near future"))), !t || t(r, n, a)
                }
            }, t.exports = {
                assertOptions: function (t, e, r) {
                    if ("object" != typeof t) throw new TypeError("options must be an object");
                    for (var n = Object.keys(t), o = n.length; o-- > 0;) {
                        var i = n[o], a = e[i];
                        if (a) {
                            var s = t[i], u = void 0 === s || a(s, i, t);
                            if (!0 !== u) throw new TypeError("option " + i + " must be " + u)
                        } else if (!0 !== r) throw Error("Unknown option " + i)
                    }
                }, validators: o
            }
        }, 4867: (t, e, r) => {
            "use strict";
            var n = r(1849), o = Object.prototype.toString;

            function i(t) {
                return "[object Array]" === o.call(t)
            }

            function a(t) {
                return void 0 === t
            }

            function s(t) {
                return null !== t && "object" == typeof t
            }

            function u(t) {
                if ("[object Object]" !== o.call(t)) return !1;
                var e = Object.getPrototypeOf(t);
                return null === e || e === Object.prototype
            }

            function c(t) {
                return "[object Function]" === o.call(t)
            }

            function f(t, e) {
                if (null != t) if ("object" != typeof t && (t = [t]), i(t)) for (var r = 0, n = t.length; r < n; r++) e.call(null, t[r], r, t); else for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && e.call(null, t[o], o, t)
            }

            t.exports = {
                isArray: i, isArrayBuffer: function (t) {
                    return "[object ArrayBuffer]" === o.call(t)
                }, isBuffer: function (t) {
                    return null !== t && !a(t) && null !== t.constructor && !a(t.constructor) && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
                }, isFormData: function (t) {
                    return "undefined" != typeof FormData && t instanceof FormData
                }, isArrayBufferView: function (t) {
                    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && t.buffer instanceof ArrayBuffer
                }, isString: function (t) {
                    return "string" == typeof t
                }, isNumber: function (t) {
                    return "number" == typeof t
                }, isObject: s, isPlainObject: u, isUndefined: a, isDate: function (t) {
                    return "[object Date]" === o.call(t)
                }, isFile: function (t) {
                    return "[object File]" === o.call(t)
                }, isBlob: function (t) {
                    return "[object Blob]" === o.call(t)
                }, isFunction: c, isStream: function (t) {
                    return s(t) && c(t.pipe)
                }, isURLSearchParams: function (t) {
                    return "undefined" != typeof URLSearchParams && t instanceof URLSearchParams
                }, isStandardBrowserEnv: function () {
                    return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
                }, forEach: f, merge: function t() {
                    var e = {};

                    function r(r, n) {
                        u(e[n]) && u(r) ? e[n] = t(e[n], r) : u(r) ? e[n] = t({}, r) : i(r) ? e[n] = r.slice() : e[n] = r
                    }

                    for (var n = 0, o = arguments.length; n < o; n++) f(arguments[n], r);
                    return e
                }, extend: function (t, e, r) {
                    return f(e, (function (e, o) {
                        t[o] = r && "function" == typeof e ? n(e, r) : e
                    })), t
                }, trim: function (t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                }, stripBOM: function (t) {
                    return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t
                }
            }
        }, 9742: (t, e) => {
            "use strict";
            e.byteLength = function (t) {
                var e = u(t), r = e[0], n = e[1];
                return 3 * (r + n) / 4 - n
            }, e.toByteArray = function (t) {
                var e, r, i = u(t), a = i[0], s = i[1], c = new o(function (t, e, r) {
                    return 3 * (e + r) / 4 - r
                }(0, a, s)), f = 0, l = s > 0 ? a - 4 : a;
                for (r = 0; r < l; r += 4) e = n[t.charCodeAt(r)] << 18 | n[t.charCodeAt(r + 1)] << 12 | n[t.charCodeAt(r + 2)] << 6 | n[t.charCodeAt(r + 3)], c[f++] = e >> 16 & 255, c[f++] = e >> 8 & 255, c[f++] = 255 & e;
                2 === s && (e = n[t.charCodeAt(r)] << 2 | n[t.charCodeAt(r + 1)] >> 4, c[f++] = 255 & e);
                1 === s && (e = n[t.charCodeAt(r)] << 10 | n[t.charCodeAt(r + 1)] << 4 | n[t.charCodeAt(r + 2)] >> 2, c[f++] = e >> 8 & 255, c[f++] = 255 & e);
                return c
            }, e.fromByteArray = function (t) {
                for (var e, n = t.length, o = n % 3, i = [], a = 16383, s = 0, u = n - o; s < u; s += a) i.push(c(t, s, s + a > u ? u : s + a));
                1 === o ? (e = t[n - 1], i.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1], i.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
                return i.join("")
            };
            for (var r = [], n = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, s = i.length; a < s; ++a) r[a] = i[a], n[i.charCodeAt(a)] = a;

            function u(t) {
                var e = t.length;
                if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var r = t.indexOf("=");
                return -1 === r && (r = e), [r, r === e ? 0 : 4 - r % 4]
            }

            function c(t, e, n) {
                for (var o, i, a = [], s = e; s < n; s += 3) o = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]), a.push(r[(i = o) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
                return a.join("")
            }

            n["-".charCodeAt(0)] = 62, n["_".charCodeAt(0)] = 63
        }, 4431: function (t, e, r) {
            var n;
            !function (o) {
                "use strict";
                var i, a = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, s = Math.ceil, u = Math.floor,
                    c = "[BigNumber Error] ", f = c + "Number primitive has more than 15 significant digits: ",
                    l = 1e14, p = 14, h = 9007199254740991,
                    d = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], y = 1e7, g = 1e9;

                function w(t) {
                    var e = 0 | t;
                    return t > 0 || t === e ? e : e - 1
                }

                function m(t) {
                    for (var e, r, n = 1, o = t.length, i = t[0] + ""; n < o;) {
                        for (e = t[n++] + "", r = p - e.length; r--; e = "0" + e) ;
                        i += e
                    }
                    for (o = i.length; 48 === i.charCodeAt(--o);) ;
                    return i.slice(0, o + 1 || 1)
                }

                function b(t, e) {
                    var r, n, o = t.c, i = e.c, a = t.s, s = e.s, u = t.e, c = e.e;
                    if (!a || !s) return null;
                    if (r = o && !o[0], n = i && !i[0], r || n) return r ? n ? 0 : -s : a;
                    if (a != s) return a;
                    if (r = a < 0, n = u == c, !o || !i) return n ? 0 : !o ^ r ? 1 : -1;
                    if (!n) return u > c ^ r ? 1 : -1;
                    for (s = (u = o.length) < (c = i.length) ? u : c, a = 0; a < s; a++) if (o[a] != i[a]) return o[a] > i[a] ^ r ? 1 : -1;
                    return u == c ? 0 : u > c ^ r ? 1 : -1
                }

                function v(t, e, r, n) {
                    if (t < e || t > r || t !== u(t)) throw Error(c + (n || "Argument") + ("number" == typeof t ? t < e || t > r ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(t))
                }

                function A(t) {
                    var e = t.c.length - 1;
                    return w(t.e / p) == e && t.c[e] % 2 != 0
                }

                function S(t, e) {
                    return (t.length > 1 ? t.charAt(0) + "." + t.slice(1) : t) + (e < 0 ? "e" : "e+") + e
                }

                function E(t, e, r) {
                    var n, o;
                    if (e < 0) {
                        for (o = r + "."; ++e; o += r) ;
                        t = o + t
                    } else if (++e > (n = t.length)) {
                        for (o = r, e -= n; --e; o += r) ;
                        t += o
                    } else e < n && (t = t.slice(0, e) + "." + t.slice(e));
                    return t
                }

                i = function t(e) {
                    var r, n, o, i, O, T, x, P, j, U, B = H.prototype = {constructor: H, toString: null, valueOf: null},
                        _ = new H(1), k = 20, R = 4, N = -7, C = 21, I = -1e7, D = 1e7, F = !1, M = 1, L = 0, $ = {
                            prefix: "",
                            groupSize: 3,
                            secondaryGroupSize: 0,
                            groupSeparator: ",",
                            decimalSeparator: ".",
                            fractionGroupSize: 0,
                            fractionGroupSeparator: " ",
                            suffix: ""
                        }, q = "0123456789abcdefghijklmnopqrstuvwxyz", z = !0;

                    function H(t, e) {
                        var r, i, s, c, l, d, y, g, w = this;
                        if (!(w instanceof H)) return new H(t, e);
                        if (null == e) {
                            if (t && !0 === t._isBigNumber) return w.s = t.s, void (!t.c || t.e > D ? w.c = w.e = null : t.e < I ? w.c = [w.e = 0] : (w.e = t.e, w.c = t.c.slice()));
                            if ((d = "number" == typeof t) && 0 * t == 0) {
                                if (w.s = 1 / t < 0 ? (t = -t, -1) : 1, t === ~~t) {
                                    for (c = 0, l = t; l >= 10; l /= 10, c++) ;
                                    return void (c > D ? w.c = w.e = null : (w.e = c, w.c = [t]))
                                }
                                g = String(t)
                            } else {
                                if (!a.test(g = String(t))) return o(w, g, d);
                                w.s = 45 == g.charCodeAt(0) ? (g = g.slice(1), -1) : 1
                            }
                            (c = g.indexOf(".")) > -1 && (g = g.replace(".", "")), (l = g.search(/e/i)) > 0 ? (c < 0 && (c = l), c += +g.slice(l + 1), g = g.substring(0, l)) : c < 0 && (c = g.length)
                        } else {
                            if (v(e, 2, q.length, "Base"), 10 == e && z) return J(w = new H(t), k + w.e + 1, R);
                            if (g = String(t), d = "number" == typeof t) {
                                if (0 * t != 0) return o(w, g, d, e);
                                if (w.s = 1 / t < 0 ? (g = g.slice(1), -1) : 1, H.DEBUG && g.replace(/^0\.0*|\./, "").length > 15) throw Error(f + t)
                            } else w.s = 45 === g.charCodeAt(0) ? (g = g.slice(1), -1) : 1;
                            for (r = q.slice(0, e), c = l = 0, y = g.length; l < y; l++) if (r.indexOf(i = g.charAt(l)) < 0) {
                                if ("." == i) {
                                    if (l > c) {
                                        c = y;
                                        continue
                                    }
                                } else if (!s && (g == g.toUpperCase() && (g = g.toLowerCase()) || g == g.toLowerCase() && (g = g.toUpperCase()))) {
                                    s = !0, l = -1, c = 0;
                                    continue
                                }
                                return o(w, String(t), d, e)
                            }
                            d = !1, (c = (g = n(g, e, 10, w.s)).indexOf(".")) > -1 ? g = g.replace(".", "") : c = g.length
                        }
                        for (l = 0; 48 === g.charCodeAt(l); l++) ;
                        for (y = g.length; 48 === g.charCodeAt(--y);) ;
                        if (g = g.slice(l, ++y)) {
                            if (y -= l, d && H.DEBUG && y > 15 && (t > h || t !== u(t))) throw Error(f + w.s * t);
                            if ((c = c - l - 1) > D) w.c = w.e = null; else if (c < I) w.c = [w.e = 0]; else {
                                if (w.e = c, w.c = [], l = (c + 1) % p, c < 0 && (l += p), l < y) {
                                    for (l && w.c.push(+g.slice(0, l)), y -= p; l < y;) w.c.push(+g.slice(l, l += p));
                                    l = p - (g = g.slice(l)).length
                                } else l -= y;
                                for (; l--; g += "0") ;
                                w.c.push(+g)
                            }
                        } else w.c = [w.e = 0]
                    }

                    function G(t, e, r, n) {
                        var o, i, a, s, u;
                        if (null == r ? r = R : v(r, 0, 8), !t.c) return t.toString();
                        if (o = t.c[0], a = t.e, null == e) u = m(t.c), u = 1 == n || 2 == n && (a <= N || a >= C) ? S(u, a) : E(u, a, "0"); else if (i = (t = J(new H(t), e, r)).e, s = (u = m(t.c)).length, 1 == n || 2 == n && (e <= i || i <= N)) {
                            for (; s < e; u += "0", s++) ;
                            u = S(u, i)
                        } else if (e -= a, u = E(u, i, "0"), i + 1 > s) {
                            if (--e > 0) for (u += "."; e--; u += "0") ;
                        } else if ((e += i - s) > 0) for (i + 1 == s && (u += "."); e--; u += "0") ;
                        return t.s < 0 && o ? "-" + u : u
                    }

                    function K(t, e) {
                        for (var r, n = 1, o = new H(t[0]); n < t.length; n++) {
                            if (!(r = new H(t[n])).s) {
                                o = r;
                                break
                            }
                            e.call(o, r) && (o = r)
                        }
                        return o
                    }

                    function W(t, e, r) {
                        for (var n = 1, o = e.length; !e[--o]; e.pop()) ;
                        for (o = e[0]; o >= 10; o /= 10, n++) ;
                        return (r = n + r * p - 1) > D ? t.c = t.e = null : r < I ? t.c = [t.e = 0] : (t.e = r, t.c = e), t
                    }

                    function J(t, e, r, n) {
                        var o, i, a, c, f, h, y, g = t.c, w = d;
                        if (g) {
                            t:{
                                for (o = 1, c = g[0]; c >= 10; c /= 10, o++) ;
                                if ((i = e - o) < 0) i += p, a = e, y = (f = g[h = 0]) / w[o - a - 1] % 10 | 0; else if ((h = s((i + 1) / p)) >= g.length) {
                                    if (!n) break t;
                                    for (; g.length <= h; g.push(0)) ;
                                    f = y = 0, o = 1, a = (i %= p) - p + 1
                                } else {
                                    for (f = c = g[h], o = 1; c >= 10; c /= 10, o++) ;
                                    y = (a = (i %= p) - p + o) < 0 ? 0 : f / w[o - a - 1] % 10 | 0
                                }
                                if (n = n || e < 0 || null != g[h + 1] || (a < 0 ? f : f % w[o - a - 1]), n = r < 4 ? (y || n) && (0 == r || r == (t.s < 0 ? 3 : 2)) : y > 5 || 5 == y && (4 == r || n || 6 == r && (i > 0 ? a > 0 ? f / w[o - a] : 0 : g[h - 1]) % 10 & 1 || r == (t.s < 0 ? 8 : 7)), e < 1 || !g[0]) return g.length = 0, n ? (e -= t.e + 1, g[0] = w[(p - e % p) % p], t.e = -e || 0) : g[0] = t.e = 0, t;
                                if (0 == i ? (g.length = h, c = 1, h--) : (g.length = h + 1, c = w[p - i], g[h] = a > 0 ? u(f / w[o - a] % w[a]) * c : 0), n) for (; ;) {
                                    if (0 == h) {
                                        for (i = 1, a = g[0]; a >= 10; a /= 10, i++) ;
                                        for (a = g[0] += c, c = 1; a >= 10; a /= 10, c++) ;
                                        i != c && (t.e++, g[0] == l && (g[0] = 1));
                                        break
                                    }
                                    if (g[h] += c, g[h] != l) break;
                                    g[h--] = 0, c = 1
                                }
                                for (i = g.length; 0 === g[--i]; g.pop()) ;
                            }
                            t.e > D ? t.c = t.e = null : t.e < I && (t.c = [t.e = 0])
                        }
                        return t
                    }

                    function V(t) {
                        var e, r = t.e;
                        return null === r ? t.toString() : (e = m(t.c), e = r <= N || r >= C ? S(e, r) : E(e, r, "0"), t.s < 0 ? "-" + e : e)
                    }

                    return H.clone = t, H.ROUND_UP = 0, H.ROUND_DOWN = 1, H.ROUND_CEIL = 2, H.ROUND_FLOOR = 3, H.ROUND_HALF_UP = 4, H.ROUND_HALF_DOWN = 5, H.ROUND_HALF_EVEN = 6, H.ROUND_HALF_CEIL = 7, H.ROUND_HALF_FLOOR = 8, H.EUCLID = 9, H.config = H.set = function (t) {
                        var e, r;
                        if (null != t) {
                            if ("object" != typeof t) throw Error(c + "Object expected: " + t);
                            if (t.hasOwnProperty(e = "DECIMAL_PLACES") && (v(r = t[e], 0, g, e), k = r), t.hasOwnProperty(e = "ROUNDING_MODE") && (v(r = t[e], 0, 8, e), R = r), t.hasOwnProperty(e = "EXPONENTIAL_AT") && ((r = t[e]) && r.pop ? (v(r[0], -g, 0, e), v(r[1], 0, g, e), N = r[0], C = r[1]) : (v(r, -g, g, e), N = -(C = r < 0 ? -r : r))), t.hasOwnProperty(e = "RANGE")) if ((r = t[e]) && r.pop) v(r[0], -g, -1, e), v(r[1], 1, g, e), I = r[0], D = r[1]; else {
                                if (v(r, -g, g, e), !r) throw Error(c + e + " cannot be zero: " + r);
                                I = -(D = r < 0 ? -r : r)
                            }
                            if (t.hasOwnProperty(e = "CRYPTO")) {
                                if ((r = t[e]) !== !!r) throw Error(c + e + " not true or false: " + r);
                                if (r) {
                                    if ("undefined" == typeof crypto || !crypto || !crypto.getRandomValues && !crypto.randomBytes) throw F = !r, Error(c + "crypto unavailable");
                                    F = r
                                } else F = r
                            }
                            if (t.hasOwnProperty(e = "MODULO_MODE") && (v(r = t[e], 0, 9, e), M = r), t.hasOwnProperty(e = "POW_PRECISION") && (v(r = t[e], 0, g, e), L = r), t.hasOwnProperty(e = "FORMAT")) {
                                if ("object" != typeof (r = t[e])) throw Error(c + e + " not an object: " + r);
                                $ = r
                            }
                            if (t.hasOwnProperty(e = "ALPHABET")) {
                                if ("string" != typeof (r = t[e]) || /^.?$|[+\-.\s]|(.).*\1/.test(r)) throw Error(c + e + " invalid: " + r);
                                z = "0123456789" == r.slice(0, 10), q = r
                            }
                        }
                        return {
                            DECIMAL_PLACES: k,
                            ROUNDING_MODE: R,
                            EXPONENTIAL_AT: [N, C],
                            RANGE: [I, D],
                            CRYPTO: F,
                            MODULO_MODE: M,
                            POW_PRECISION: L,
                            FORMAT: $,
                            ALPHABET: q
                        }
                    }, H.isBigNumber = function (t) {
                        if (!t || !0 !== t._isBigNumber) return !1;
                        if (!H.DEBUG) return !0;
                        var e, r, n = t.c, o = t.e, i = t.s;
                        t:if ("[object Array]" == {}.toString.call(n)) {
                            if ((1 === i || -1 === i) && o >= -g && o <= g && o === u(o)) {
                                if (0 === n[0]) {
                                    if (0 === o && 1 === n.length) return !0;
                                    break t
                                }
                                if ((e = (o + 1) % p) < 1 && (e += p), String(n[0]).length == e) {
                                    for (e = 0; e < n.length; e++) if ((r = n[e]) < 0 || r >= l || r !== u(r)) break t;
                                    if (0 !== r) return !0
                                }
                            }
                        } else if (null === n && null === o && (null === i || 1 === i || -1 === i)) return !0;
                        throw Error(c + "Invalid BigNumber: " + t)
                    }, H.maximum = H.max = function () {
                        return K(arguments, B.lt)
                    }, H.minimum = H.min = function () {
                        return K(arguments, B.gt)
                    }, H.random = (i = 9007199254740992, O = Math.random() * i & 2097151 ? function () {
                        return u(Math.random() * i)
                    } : function () {
                        return 8388608 * (1073741824 * Math.random() | 0) + (8388608 * Math.random() | 0)
                    }, function (t) {
                        var e, r, n, o, i, a = 0, f = [], l = new H(_);
                        if (null == t ? t = k : v(t, 0, g), o = s(t / p), F) if (crypto.getRandomValues) {
                            for (e = crypto.getRandomValues(new Uint32Array(o *= 2)); a < o;) (i = 131072 * e[a] + (e[a + 1] >>> 11)) >= 9e15 ? (r = crypto.getRandomValues(new Uint32Array(2)), e[a] = r[0], e[a + 1] = r[1]) : (f.push(i % 1e14), a += 2);
                            a = o / 2
                        } else {
                            if (!crypto.randomBytes) throw F = !1, Error(c + "crypto unavailable");
                            for (e = crypto.randomBytes(o *= 7); a < o;) (i = 281474976710656 * (31 & e[a]) + 1099511627776 * e[a + 1] + 4294967296 * e[a + 2] + 16777216 * e[a + 3] + (e[a + 4] << 16) + (e[a + 5] << 8) + e[a + 6]) >= 9e15 ? crypto.randomBytes(7).copy(e, a) : (f.push(i % 1e14), a += 7);
                            a = o / 7
                        }
                        if (!F) for (; a < o;) (i = O()) < 9e15 && (f[a++] = i % 1e14);
                        for (o = f[--a], t %= p, o && t && (i = d[p - t], f[a] = u(o / i) * i); 0 === f[a]; f.pop(), a--) ;
                        if (a < 0) f = [n = 0]; else {
                            for (n = -1; 0 === f[0]; f.splice(0, 1), n -= p) ;
                            for (a = 1, i = f[0]; i >= 10; i /= 10, a++) ;
                            a < p && (n -= p - a)
                        }
                        return l.e = n, l.c = f, l
                    }), H.sum = function () {
                        for (var t = 1, e = arguments, r = new H(e[0]); t < e.length;) r = r.plus(e[t++]);
                        return r
                    }, n = function () {
                        var t = "0123456789";

                        function e(t, e, r, n) {
                            for (var o, i, a = [0], s = 0, u = t.length; s < u;) {
                                for (i = a.length; i--; a[i] *= e) ;
                                for (a[0] += n.indexOf(t.charAt(s++)), o = 0; o < a.length; o++) a[o] > r - 1 && (null == a[o + 1] && (a[o + 1] = 0), a[o + 1] += a[o] / r | 0, a[o] %= r)
                            }
                            return a.reverse()
                        }

                        return function (n, o, i, a, s) {
                            var u, c, f, l, p, h, d, y, g = n.indexOf("."), w = k, b = R;
                            for (g >= 0 && (l = L, L = 0, n = n.replace(".", ""), h = (y = new H(o)).pow(n.length - g), L = l, y.c = e(E(m(h.c), h.e, "0"), 10, i, t), y.e = y.c.length), f = l = (d = e(n, o, i, s ? (u = q, t) : (u = t, q))).length; 0 == d[--l]; d.pop()) ;
                            if (!d[0]) return u.charAt(0);
                            if (g < 0 ? --f : (h.c = d, h.e = f, h.s = a, d = (h = r(h, y, w, b, i)).c, p = h.r, f = h.e), g = d[c = f + w + 1], l = i / 2, p = p || c < 0 || null != d[c + 1], p = b < 4 ? (null != g || p) && (0 == b || b == (h.s < 0 ? 3 : 2)) : g > l || g == l && (4 == b || p || 6 == b && 1 & d[c - 1] || b == (h.s < 0 ? 8 : 7)), c < 1 || !d[0]) n = p ? E(u.charAt(1), -w, u.charAt(0)) : u.charAt(0); else {
                                if (d.length = c, p) for (--i; ++d[--c] > i;) d[c] = 0, c || (++f, d = [1].concat(d));
                                for (l = d.length; !d[--l];) ;
                                for (g = 0, n = ""; g <= l; n += u.charAt(d[g++])) ;
                                n = E(n, f, u.charAt(0))
                            }
                            return n
                        }
                    }(), r = function () {
                        function t(t, e, r) {
                            var n, o, i, a, s = 0, u = t.length, c = e % y, f = e / y | 0;
                            for (t = t.slice(); u--;) s = ((o = c * (i = t[u] % y) + (n = f * i + (a = t[u] / y | 0) * c) % y * y + s) / r | 0) + (n / y | 0) + f * a, t[u] = o % r;
                            return s && (t = [s].concat(t)), t
                        }

                        function e(t, e, r, n) {
                            var o, i;
                            if (r != n) i = r > n ? 1 : -1; else for (o = i = 0; o < r; o++) if (t[o] != e[o]) {
                                i = t[o] > e[o] ? 1 : -1;
                                break
                            }
                            return i
                        }

                        function r(t, e, r, n) {
                            for (var o = 0; r--;) t[r] -= o, o = t[r] < e[r] ? 1 : 0, t[r] = o * n + t[r] - e[r];
                            for (; !t[0] && t.length > 1; t.splice(0, 1)) ;
                        }

                        return function (n, o, i, a, s) {
                            var c, f, h, d, y, g, m, b, v, A, S, E, O, T, x, P, j, U = n.s == o.s ? 1 : -1, B = n.c,
                                _ = o.c;
                            if (!(B && B[0] && _ && _[0])) return new H(n.s && o.s && (B ? !_ || B[0] != _[0] : _) ? B && 0 == B[0] || !_ ? 0 * U : U / 0 : NaN);
                            for (v = (b = new H(U)).c = [], U = i + (f = n.e - o.e) + 1, s || (s = l, f = w(n.e / p) - w(o.e / p), U = U / p | 0), h = 0; _[h] == (B[h] || 0); h++) ;
                            if (_[h] > (B[h] || 0) && f--, U < 0) v.push(1), d = !0; else {
                                for (T = B.length, P = _.length, h = 0, U += 2, (y = u(s / (_[0] + 1))) > 1 && (_ = t(_, y, s), B = t(B, y, s), P = _.length, T = B.length), O = P, S = (A = B.slice(0, P)).length; S < P; A[S++] = 0) ;
                                j = _.slice(), j = [0].concat(j), x = _[0], _[1] >= s / 2 && x++;
                                do {
                                    if (y = 0, (c = e(_, A, P, S)) < 0) {
                                        if (E = A[0], P != S && (E = E * s + (A[1] || 0)), (y = u(E / x)) > 1) for (y >= s && (y = s - 1), m = (g = t(_, y, s)).length, S = A.length; 1 == e(g, A, m, S);) y--, r(g, P < m ? j : _, m, s), m = g.length, c = 1; else 0 == y && (c = y = 1), m = (g = _.slice()).length;
                                        if (m < S && (g = [0].concat(g)), r(A, g, S, s), S = A.length, -1 == c) for (; e(_, A, P, S) < 1;) y++, r(A, P < S ? j : _, S, s), S = A.length
                                    } else 0 === c && (y++, A = [0]);
                                    v[h++] = y, A[0] ? A[S++] = B[O] || 0 : (A = [B[O]], S = 1)
                                } while ((O++ < T || null != A[0]) && U--);
                                d = null != A[0], v[0] || v.splice(0, 1)
                            }
                            if (s == l) {
                                for (h = 1, U = v[0]; U >= 10; U /= 10, h++) ;
                                J(b, i + (b.e = h + f * p - 1) + 1, a, d)
                            } else b.e = f, b.r = +d;
                            return b
                        }
                    }(), T = /^(-?)0([xbo])(?=\w[\w.]*$)/i, x = /^([^.]+)\.$/, P = /^\.([^.]+)$/, j = /^-?(Infinity|NaN)$/, U = /^\s*\+(?=[\w.])|^\s+|\s+$/g, o = function (t, e, r, n) {
                        var o, i = r ? e : e.replace(U, "");
                        if (j.test(i)) t.s = isNaN(i) ? null : i < 0 ? -1 : 1; else {
                            if (!r && (i = i.replace(T, (function (t, e, r) {
                                return o = "x" == (r = r.toLowerCase()) ? 16 : "b" == r ? 2 : 8, n && n != o ? t : e
                            })), n && (o = n, i = i.replace(x, "$1").replace(P, "0.$1")), e != i)) return new H(i, o);
                            if (H.DEBUG) throw Error(c + "Not a" + (n ? " base " + n : "") + " number: " + e);
                            t.s = null
                        }
                        t.c = t.e = null
                    }, B.absoluteValue = B.abs = function () {
                        var t = new H(this);
                        return t.s < 0 && (t.s = 1), t
                    }, B.comparedTo = function (t, e) {
                        return b(this, new H(t, e))
                    }, B.decimalPlaces = B.dp = function (t, e) {
                        var r, n, o, i = this;
                        if (null != t) return v(t, 0, g), null == e ? e = R : v(e, 0, 8), J(new H(i), t + i.e + 1, e);
                        if (!(r = i.c)) return null;
                        if (n = ((o = r.length - 1) - w(this.e / p)) * p, o = r[o]) for (; o % 10 == 0; o /= 10, n--) ;
                        return n < 0 && (n = 0), n
                    }, B.dividedBy = B.div = function (t, e) {
                        return r(this, new H(t, e), k, R)
                    }, B.dividedToIntegerBy = B.idiv = function (t, e) {
                        return r(this, new H(t, e), 0, 1)
                    }, B.exponentiatedBy = B.pow = function (t, e) {
                        var r, n, o, i, a, f, l, h, d = this;
                        if ((t = new H(t)).c && !t.isInteger()) throw Error(c + "Exponent not an integer: " + V(t));
                        if (null != e && (e = new H(e)), a = t.e > 14, !d.c || !d.c[0] || 1 == d.c[0] && !d.e && 1 == d.c.length || !t.c || !t.c[0]) return h = new H(Math.pow(+V(d), a ? 2 - A(t) : +V(t))), e ? h.mod(e) : h;
                        if (f = t.s < 0, e) {
                            if (e.c ? !e.c[0] : !e.s) return new H(NaN);
                            (n = !f && d.isInteger() && e.isInteger()) && (d = d.mod(e))
                        } else {
                            if (t.e > 9 && (d.e > 0 || d.e < -1 || (0 == d.e ? d.c[0] > 1 || a && d.c[1] >= 24e7 : d.c[0] < 8e13 || a && d.c[0] <= 9999975e7))) return i = d.s < 0 && A(t) ? -0 : 0, d.e > -1 && (i = 1 / i), new H(f ? 1 / i : i);
                            L && (i = s(L / p + 2))
                        }
                        for (a ? (r = new H(.5), f && (t.s = 1), l = A(t)) : l = (o = Math.abs(+V(t))) % 2, h = new H(_); ;) {
                            if (l) {
                                if (!(h = h.times(d)).c) break;
                                i ? h.c.length > i && (h.c.length = i) : n && (h = h.mod(e))
                            }
                            if (o) {
                                if (0 === (o = u(o / 2))) break;
                                l = o % 2
                            } else if (J(t = t.times(r), t.e + 1, 1), t.e > 14) l = A(t); else {
                                if (0 === (o = +V(t))) break;
                                l = o % 2
                            }
                            d = d.times(d), i ? d.c && d.c.length > i && (d.c.length = i) : n && (d = d.mod(e))
                        }
                        return n ? h : (f && (h = _.div(h)), e ? h.mod(e) : i ? J(h, L, R, undefined) : h)
                    }, B.integerValue = function (t) {
                        var e = new H(this);
                        return null == t ? t = R : v(t, 0, 8), J(e, e.e + 1, t)
                    }, B.isEqualTo = B.eq = function (t, e) {
                        return 0 === b(this, new H(t, e))
                    }, B.isFinite = function () {
                        return !!this.c
                    }, B.isGreaterThan = B.gt = function (t, e) {
                        return b(this, new H(t, e)) > 0
                    }, B.isGreaterThanOrEqualTo = B.gte = function (t, e) {
                        return 1 === (e = b(this, new H(t, e))) || 0 === e
                    }, B.isInteger = function () {
                        return !!this.c && w(this.e / p) > this.c.length - 2
                    }, B.isLessThan = B.lt = function (t, e) {
                        return b(this, new H(t, e)) < 0
                    }, B.isLessThanOrEqualTo = B.lte = function (t, e) {
                        return -1 === (e = b(this, new H(t, e))) || 0 === e
                    }, B.isNaN = function () {
                        return !this.s
                    }, B.isNegative = function () {
                        return this.s < 0
                    }, B.isPositive = function () {
                        return this.s > 0
                    }, B.isZero = function () {
                        return !!this.c && 0 == this.c[0]
                    }, B.minus = function (t, e) {
                        var r, n, o, i, a = this, s = a.s;
                        if (e = (t = new H(t, e)).s, !s || !e) return new H(NaN);
                        if (s != e) return t.s = -e, a.plus(t);
                        var u = a.e / p, c = t.e / p, f = a.c, h = t.c;
                        if (!u || !c) {
                            if (!f || !h) return f ? (t.s = -e, t) : new H(h ? a : NaN);
                            if (!f[0] || !h[0]) return h[0] ? (t.s = -e, t) : new H(f[0] ? a : 3 == R ? -0 : 0)
                        }
                        if (u = w(u), c = w(c), f = f.slice(), s = u - c) {
                            for ((i = s < 0) ? (s = -s, o = f) : (c = u, o = h), o.reverse(), e = s; e--; o.push(0)) ;
                            o.reverse()
                        } else for (n = (i = (s = f.length) < (e = h.length)) ? s : e, s = e = 0; e < n; e++) if (f[e] != h[e]) {
                            i = f[e] < h[e];
                            break
                        }
                        if (i && (o = f, f = h, h = o, t.s = -t.s), (e = (n = h.length) - (r = f.length)) > 0) for (; e--; f[r++] = 0) ;
                        for (e = l - 1; n > s;) {
                            if (f[--n] < h[n]) {
                                for (r = n; r && !f[--r]; f[r] = e) ;
                                --f[r], f[n] += l
                            }
                            f[n] -= h[n]
                        }
                        for (; 0 == f[0]; f.splice(0, 1), --c) ;
                        return f[0] ? W(t, f, c) : (t.s = 3 == R ? -1 : 1, t.c = [t.e = 0], t)
                    }, B.modulo = B.mod = function (t, e) {
                        var n, o, i = this;
                        return t = new H(t, e), !i.c || !t.s || t.c && !t.c[0] ? new H(NaN) : !t.c || i.c && !i.c[0] ? new H(i) : (9 == M ? (o = t.s, t.s = 1, n = r(i, t, 0, 3), t.s = o, n.s *= o) : n = r(i, t, 0, M), (t = i.minus(n.times(t))).c[0] || 1 != M || (t.s = i.s), t)
                    }, B.multipliedBy = B.times = function (t, e) {
                        var r, n, o, i, a, s, u, c, f, h, d, g, m, b, v, A = this, S = A.c, E = (t = new H(t, e)).c;
                        if (!(S && E && S[0] && E[0])) return !A.s || !t.s || S && !S[0] && !E || E && !E[0] && !S ? t.c = t.e = t.s = null : (t.s *= A.s, S && E ? (t.c = [0], t.e = 0) : t.c = t.e = null), t;
                        for (n = w(A.e / p) + w(t.e / p), t.s *= A.s, (u = S.length) < (h = E.length) && (m = S, S = E, E = m, o = u, u = h, h = o), o = u + h, m = []; o--; m.push(0)) ;
                        for (b = l, v = y, o = h; --o >= 0;) {
                            for (r = 0, d = E[o] % v, g = E[o] / v | 0, i = o + (a = u); i > o;) r = ((c = d * (c = S[--a] % v) + (s = g * c + (f = S[a] / v | 0) * d) % v * v + m[i] + r) / b | 0) + (s / v | 0) + g * f, m[i--] = c % b;
                            m[i] = r
                        }
                        return r ? ++n : m.splice(0, 1), W(t, m, n)
                    }, B.negated = function () {
                        var t = new H(this);
                        return t.s = -t.s || null, t
                    }, B.plus = function (t, e) {
                        var r, n = this, o = n.s;
                        if (e = (t = new H(t, e)).s, !o || !e) return new H(NaN);
                        if (o != e) return t.s = -e, n.minus(t);
                        var i = n.e / p, a = t.e / p, s = n.c, u = t.c;
                        if (!i || !a) {
                            if (!s || !u) return new H(o / 0);
                            if (!s[0] || !u[0]) return u[0] ? t : new H(s[0] ? n : 0 * o)
                        }
                        if (i = w(i), a = w(a), s = s.slice(), o = i - a) {
                            for (o > 0 ? (a = i, r = u) : (o = -o, r = s), r.reverse(); o--; r.push(0)) ;
                            r.reverse()
                        }
                        for ((o = s.length) - (e = u.length) < 0 && (r = u, u = s, s = r, e = o), o = 0; e;) o = (s[--e] = s[e] + u[e] + o) / l | 0, s[e] = l === s[e] ? 0 : s[e] % l;
                        return o && (s = [o].concat(s), ++a), W(t, s, a)
                    }, B.precision = B.sd = function (t, e) {
                        var r, n, o, i = this;
                        if (null != t && t !== !!t) return v(t, 1, g), null == e ? e = R : v(e, 0, 8), J(new H(i), t, e);
                        if (!(r = i.c)) return null;
                        if (n = (o = r.length - 1) * p + 1, o = r[o]) {
                            for (; o % 10 == 0; o /= 10, n--) ;
                            for (o = r[0]; o >= 10; o /= 10, n++) ;
                        }
                        return t && i.e + 1 > n && (n = i.e + 1), n
                    }, B.shiftedBy = function (t) {
                        return v(t, -9007199254740991, h), this.times("1e" + t)
                    }, B.squareRoot = B.sqrt = function () {
                        var t, e, n, o, i, a = this, s = a.c, u = a.s, c = a.e, f = k + 4, l = new H("0.5");
                        if (1 !== u || !s || !s[0]) return new H(!u || u < 0 && (!s || s[0]) ? NaN : s ? a : 1 / 0);
                        if (0 == (u = Math.sqrt(+V(a))) || u == 1 / 0 ? (((e = m(s)).length + c) % 2 == 0 && (e += "0"), u = Math.sqrt(+e), c = w((c + 1) / 2) - (c < 0 || c % 2), n = new H(e = u == 1 / 0 ? "5e" + c : (e = u.toExponential()).slice(0, e.indexOf("e") + 1) + c)) : n = new H(u + ""), n.c[0]) for ((u = (c = n.e) + f) < 3 && (u = 0); ;) if (i = n, n = l.times(i.plus(r(a, i, f, 1))), m(i.c).slice(0, u) === (e = m(n.c)).slice(0, u)) {
                            if (n.e < c && --u, "9999" != (e = e.slice(u - 3, u + 1)) && (o || "4999" != e)) {
                                +e && (+e.slice(1) || "5" != e.charAt(0)) || (J(n, n.e + k + 2, 1), t = !n.times(n).eq(a));
                                break
                            }
                            if (!o && (J(i, i.e + k + 2, 0), i.times(i).eq(a))) {
                                n = i;
                                break
                            }
                            f += 4, u += 4, o = 1
                        }
                        return J(n, n.e + k + 1, R, t)
                    }, B.toExponential = function (t, e) {
                        return null != t && (v(t, 0, g), t++), G(this, t, e, 1)
                    }, B.toFixed = function (t, e) {
                        return null != t && (v(t, 0, g), t = t + this.e + 1), G(this, t, e)
                    }, B.toFormat = function (t, e, r) {
                        var n, o = this;
                        if (null == r) null != t && e && "object" == typeof e ? (r = e, e = null) : t && "object" == typeof t ? (r = t, t = e = null) : r = $; else if ("object" != typeof r) throw Error(c + "Argument not an object: " + r);
                        if (n = o.toFixed(t, e), o.c) {
                            var i, a = n.split("."), s = +r.groupSize, u = +r.secondaryGroupSize,
                                f = r.groupSeparator || "", l = a[0], p = a[1], h = o.s < 0, d = h ? l.slice(1) : l,
                                y = d.length;
                            if (u && (i = s, s = u, u = i, y -= i), s > 0 && y > 0) {
                                for (i = y % s || s, l = d.substr(0, i); i < y; i += s) l += f + d.substr(i, s);
                                u > 0 && (l += f + d.slice(i)), h && (l = "-" + l)
                            }
                            n = p ? l + (r.decimalSeparator || "") + ((u = +r.fractionGroupSize) ? p.replace(new RegExp("\\d{" + u + "}\\B", "g"), "$&" + (r.fractionGroupSeparator || "")) : p) : l
                        }
                        return (r.prefix || "") + n + (r.suffix || "")
                    }, B.toFraction = function (t) {
                        var e, n, o, i, a, s, u, f, l, h, y, g, w = this, b = w.c;
                        if (null != t && (!(u = new H(t)).isInteger() && (u.c || 1 !== u.s) || u.lt(_))) throw Error(c + "Argument " + (u.isInteger() ? "out of range: " : "not an integer: ") + V(u));
                        if (!b) return new H(w);
                        for (e = new H(_), l = n = new H(_), o = f = new H(_), g = m(b), a = e.e = g.length - w.e - 1, e.c[0] = d[(s = a % p) < 0 ? p + s : s], t = !t || u.comparedTo(e) > 0 ? a > 0 ? e : l : u, s = D, D = 1 / 0, u = new H(g), f.c[0] = 0; h = r(u, e, 0, 1), 1 != (i = n.plus(h.times(o))).comparedTo(t);) n = o, o = i, l = f.plus(h.times(i = l)), f = i, e = u.minus(h.times(i = e)), u = i;
                        return i = r(t.minus(n), o, 0, 1), f = f.plus(i.times(l)), n = n.plus(i.times(o)), f.s = l.s = w.s, y = r(l, o, a *= 2, R).minus(w).abs().comparedTo(r(f, n, a, R).minus(w).abs()) < 1 ? [l, o] : [f, n], D = s, y
                    }, B.toNumber = function () {
                        return +V(this)
                    }, B.toPrecision = function (t, e) {
                        return null != t && v(t, 1, g), G(this, t, e, 2)
                    }, B.toString = function (t) {
                        var e, r = this, o = r.s, i = r.e;
                        return null === i ? o ? (e = "Infinity", o < 0 && (e = "-" + e)) : e = "NaN" : (null == t ? e = i <= N || i >= C ? S(m(r.c), i) : E(m(r.c), i, "0") : 10 === t && z ? e = E(m((r = J(new H(r), k + i + 1, R)).c), r.e, "0") : (v(t, 2, q.length, "Base"), e = n(E(m(r.c), i, "0"), 10, t, o, !0)), o < 0 && r.c[0] && (e = "-" + e)), e
                    }, B.valueOf = B.toJSON = function () {
                        return V(this)
                    }, B._isBigNumber = !0, null != e && H.set(e), H
                }(), i.default = i.BigNumber = i, void 0 === (n = function () {
                    return i
                }.call(e, r, e, t)) || (t.exports = n)
            }()
        }, 1924: (t, e, r) => {
            "use strict";
            var n = r(210), o = r(5559), i = o(n("String.prototype.indexOf"));
            t.exports = function (t, e) {
                var r = n(t, !!e);
                return "function" == typeof r && i(t, ".prototype.") > -1 ? o(r) : r
            }
        }, 5559: (t, e, r) => {
            "use strict";
            var n = r(8612), o = r(210), i = o("%Function.prototype.apply%"), a = o("%Function.prototype.call%"),
                s = o("%Reflect.apply%", !0) || n.call(a, i), u = o("%Object.getOwnPropertyDescriptor%", !0),
                c = o("%Object.defineProperty%", !0), f = o("%Math.max%");
            if (c) try {
                c({}, "a", {value: 1})
            } catch (t) {
                c = null
            }
            t.exports = function (t) {
                var e = s(n, a, arguments);
                if (u && c) {
                    var r = u(e, "length");
                    r.configurable && c(e, "length", {value: 1 + f(0, t.length - (arguments.length - 1))})
                }
                return e
            };
            var l = function () {
                return s(n, i, arguments)
            };
            c ? c(t.exports, "apply", {value: l}) : t.exports.apply = l
        }, 9804: t => {
            var e = Object.prototype.hasOwnProperty, r = Object.prototype.toString;
            t.exports = function (t, n, o) {
                if ("[object Function]" !== r.call(n)) throw new TypeError("iterator must be a function");
                var i = t.length;
                if (i === +i) for (var a = 0; a < i; a++) n.call(o, t[a], a, t); else for (var s in t) e.call(t, s) && n.call(o, t[s], s, t)
            }
        }, 7648: t => {
            "use strict";
            var e = "Function.prototype.bind called on incompatible ", r = Array.prototype.slice,
                n = Object.prototype.toString, o = "[object Function]";
            t.exports = function (t) {
                var i = this;
                if ("function" != typeof i || n.call(i) !== o) throw new TypeError(e + i);
                for (var a, s = r.call(arguments, 1), u = function () {
                    if (this instanceof a) {
                        var e = i.apply(this, s.concat(r.call(arguments)));
                        return Object(e) === e ? e : this
                    }
                    return i.apply(t, s.concat(r.call(arguments)))
                }, c = Math.max(0, i.length - s.length), f = [], l = 0; l < c; l++) f.push("$" + l);
                if (a = Function("binder", "return function (" + f.join(",") + "){ return binder.apply(this,arguments); }")(u), i.prototype) {
                    var p = function () {
                    };
                    p.prototype = i.prototype, a.prototype = new p, p.prototype = null
                }
                return a
            }
        }, 8612: (t, e, r) => {
            "use strict";
            var n = r(7648);
            t.exports = Function.prototype.bind || n
        }, 210: (t, e, r) => {
            "use strict";
            var n, o = SyntaxError, i = Function, a = TypeError, s = function (t) {
                try {
                    return i('"use strict"; return (' + t + ").constructor;")()
                } catch (t) {
                }
            }, u = Object.getOwnPropertyDescriptor;
            if (u) try {
                u({}, "")
            } catch (t) {
                u = null
            }
            var c = function () {
                    throw new a
                }, f = u ? function () {
                    try {
                        return c
                    } catch (t) {
                        try {
                            return u(arguments, "callee").get
                        } catch (t) {
                            return c
                        }
                    }
                }() : c, l = r(1405)(), p = Object.getPrototypeOf || function (t) {
                    return t.__proto__
                }, h = {}, d = "undefined" == typeof Uint8Array ? n : p(Uint8Array), y = {
                    "%AggregateError%": "undefined" == typeof AggregateError ? n : AggregateError,
                    "%Array%": Array,
                    "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? n : ArrayBuffer,
                    "%ArrayIteratorPrototype%": l ? p([][Symbol.iterator]()) : n,
                    "%AsyncFromSyncIteratorPrototype%": n,
                    "%AsyncFunction%": h,
                    "%AsyncGenerator%": h,
                    "%AsyncGeneratorFunction%": h,
                    "%AsyncIteratorPrototype%": h,
                    "%Atomics%": "undefined" == typeof Atomics ? n : Atomics,
                    "%BigInt%": "undefined" == typeof BigInt ? n : BigInt,
                    "%Boolean%": Boolean,
                    "%DataView%": "undefined" == typeof DataView ? n : DataView,
                    "%Date%": Date,
                    "%decodeURI%": decodeURI,
                    "%decodeURIComponent%": decodeURIComponent,
                    "%encodeURI%": encodeURI,
                    "%encodeURIComponent%": encodeURIComponent,
                    "%Error%": Error,
                    "%eval%": eval,
                    "%EvalError%": EvalError,
                    "%Float32Array%": "undefined" == typeof Float32Array ? n : Float32Array,
                    "%Float64Array%": "undefined" == typeof Float64Array ? n : Float64Array,
                    "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? n : FinalizationRegistry,
                    "%Function%": i,
                    "%GeneratorFunction%": h,
                    "%Int8Array%": "undefined" == typeof Int8Array ? n : Int8Array,
                    "%Int16Array%": "undefined" == typeof Int16Array ? n : Int16Array,
                    "%Int32Array%": "undefined" == typeof Int32Array ? n : Int32Array,
                    "%isFinite%": isFinite,
                    "%isNaN%": isNaN,
                    "%IteratorPrototype%": l ? p(p([][Symbol.iterator]())) : n,
                    "%JSON%": "object" == typeof JSON ? JSON : n,
                    "%Map%": "undefined" == typeof Map ? n : Map,
                    "%MapIteratorPrototype%": "undefined" != typeof Map && l ? p((new Map)[Symbol.iterator]()) : n,
                    "%Math%": Math,
                    "%Number%": Number,
                    "%Object%": Object,
                    "%parseFloat%": parseFloat,
                    "%parseInt%": parseInt,
                    "%Promise%": "undefined" == typeof Promise ? n : Promise,
                    "%Proxy%": "undefined" == typeof Proxy ? n : Proxy,
                    "%RangeError%": RangeError,
                    "%ReferenceError%": ReferenceError,
                    "%Reflect%": "undefined" == typeof Reflect ? n : Reflect,
                    "%RegExp%": RegExp,
                    "%Set%": "undefined" == typeof Set ? n : Set,
                    "%SetIteratorPrototype%": "undefined" != typeof Set && l ? p((new Set)[Symbol.iterator]()) : n,
                    "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? n : SharedArrayBuffer,
                    "%String%": String,
                    "%StringIteratorPrototype%": l ? p(""[Symbol.iterator]()) : n,
                    "%Symbol%": l ? Symbol : n,
                    "%SyntaxError%": o,
                    "%ThrowTypeError%": f,
                    "%TypedArray%": d,
                    "%TypeError%": a,
                    "%Uint8Array%": "undefined" == typeof Uint8Array ? n : Uint8Array,
                    "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? n : Uint8ClampedArray,
                    "%Uint16Array%": "undefined" == typeof Uint16Array ? n : Uint16Array,
                    "%Uint32Array%": "undefined" == typeof Uint32Array ? n : Uint32Array,
                    "%URIError%": URIError,
                    "%WeakMap%": "undefined" == typeof WeakMap ? n : WeakMap,
                    "%WeakRef%": "undefined" == typeof WeakRef ? n : WeakRef,
                    "%WeakSet%": "undefined" == typeof WeakSet ? n : WeakSet
                }, g = function t(e) {
                    var r;
                    if ("%AsyncFunction%" === e) r = s("async function () {}"); else if ("%GeneratorFunction%" === e) r = s("function* () {}"); else if ("%AsyncGeneratorFunction%" === e) r = s("async function* () {}"); else if ("%AsyncGenerator%" === e) {
                        var n = t("%AsyncGeneratorFunction%");
                        n && (r = n.prototype)
                    } else if ("%AsyncIteratorPrototype%" === e) {
                        var o = t("%AsyncGenerator%");
                        o && (r = p(o.prototype))
                    }
                    return y[e] = r, r
                }, w = {
                    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
                    "%ArrayPrototype%": ["Array", "prototype"],
                    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
                    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
                    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
                    "%ArrayProto_values%": ["Array", "prototype", "values"],
                    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
                    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
                    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
                    "%BooleanPrototype%": ["Boolean", "prototype"],
                    "%DataViewPrototype%": ["DataView", "prototype"],
                    "%DatePrototype%": ["Date", "prototype"],
                    "%ErrorPrototype%": ["Error", "prototype"],
                    "%EvalErrorPrototype%": ["EvalError", "prototype"],
                    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
                    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
                    "%FunctionPrototype%": ["Function", "prototype"],
                    "%Generator%": ["GeneratorFunction", "prototype"],
                    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
                    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
                    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
                    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
                    "%JSONParse%": ["JSON", "parse"],
                    "%JSONStringify%": ["JSON", "stringify"],
                    "%MapPrototype%": ["Map", "prototype"],
                    "%NumberPrototype%": ["Number", "prototype"],
                    "%ObjectPrototype%": ["Object", "prototype"],
                    "%ObjProto_toString%": ["Object", "prototype", "toString"],
                    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
                    "%PromisePrototype%": ["Promise", "prototype"],
                    "%PromiseProto_then%": ["Promise", "prototype", "then"],
                    "%Promise_all%": ["Promise", "all"],
                    "%Promise_reject%": ["Promise", "reject"],
                    "%Promise_resolve%": ["Promise", "resolve"],
                    "%RangeErrorPrototype%": ["RangeError", "prototype"],
                    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
                    "%RegExpPrototype%": ["RegExp", "prototype"],
                    "%SetPrototype%": ["Set", "prototype"],
                    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
                    "%StringPrototype%": ["String", "prototype"],
                    "%SymbolPrototype%": ["Symbol", "prototype"],
                    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
                    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
                    "%TypeErrorPrototype%": ["TypeError", "prototype"],
                    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
                    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
                    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
                    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
                    "%URIErrorPrototype%": ["URIError", "prototype"],
                    "%WeakMapPrototype%": ["WeakMap", "prototype"],
                    "%WeakSetPrototype%": ["WeakSet", "prototype"]
                }, m = r(8612), b = r(7642), v = m.call(Function.call, Array.prototype.concat),
                A = m.call(Function.apply, Array.prototype.splice), S = m.call(Function.call, String.prototype.replace),
                E = m.call(Function.call, String.prototype.slice),
                O = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
                T = /\\(\\)?/g, x = function (t) {
                    var e = E(t, 0, 1), r = E(t, -1);
                    if ("%" === e && "%" !== r) throw new o("invalid intrinsic syntax, expected closing `%`");
                    if ("%" === r && "%" !== e) throw new o("invalid intrinsic syntax, expected opening `%`");
                    var n = [];
                    return S(t, O, (function (t, e, r, o) {
                        n[n.length] = r ? S(o, T, "$1") : e || t
                    })), n
                }, P = function (t, e) {
                    var r, n = t;
                    if (b(w, n) && (n = "%" + (r = w[n])[0] + "%"), b(y, n)) {
                        var i = y[n];
                        if (i === h && (i = g(n)), void 0 === i && !e) throw new a("intrinsic " + t + " exists, but is not available. Please file an issue!");
                        return {alias: r, name: n, value: i}
                    }
                    throw new o("intrinsic " + t + " does not exist!")
                };
            t.exports = function (t, e) {
                if ("string" != typeof t || 0 === t.length) throw new a("intrinsic name must be a non-empty string");
                if (arguments.length > 1 && "boolean" != typeof e) throw new a('"allowMissing" argument must be a boolean');
                var r = x(t), n = r.length > 0 ? r[0] : "", i = P("%" + n + "%", e), s = i.name, c = i.value, f = !1,
                    l = i.alias;
                l && (n = l[0], A(r, v([0, 1], l)));
                for (var p = 1, h = !0; p < r.length; p += 1) {
                    var d = r[p], g = E(d, 0, 1), w = E(d, -1);
                    if (('"' === g || "'" === g || "`" === g || '"' === w || "'" === w || "`" === w) && g !== w) throw new o("property names with quotes must have matching quotes");
                    if ("constructor" !== d && h || (f = !0), b(y, s = "%" + (n += "." + d) + "%")) c = y[s]; else if (null != c) {
                        if (!(d in c)) {
                            if (!e) throw new a("base intrinsic for " + t + " exists, but the property is not available.");
                            return
                        }
                        if (u && p + 1 >= r.length) {
                            var m = u(c, d);
                            c = (h = !!m) && "get" in m && !("originalValue" in m.get) ? m.get : c[d]
                        } else h = b(c, d), c = c[d];
                        h && !f && (y[s] = c)
                    }
                }
                return c
            }
        }, 1405: (t, e, r) => {
            "use strict";
            var n = "undefined" != typeof Symbol && Symbol, o = r(5419);
            t.exports = function () {
                return "function" == typeof n && ("function" == typeof Symbol && ("symbol" == typeof n("foo") && ("symbol" == typeof Symbol("bar") && o())))
            }
        }, 5419: t => {
            "use strict";
            t.exports = function () {
                if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return !1;
                if ("symbol" == typeof Symbol.iterator) return !0;
                var t = {}, e = Symbol("test"), r = Object(e);
                if ("string" == typeof e) return !1;
                if ("[object Symbol]" !== Object.prototype.toString.call(e)) return !1;
                if ("[object Symbol]" !== Object.prototype.toString.call(r)) return !1;
                for (e in t[e] = 42, t) return !1;
                if ("function" == typeof Object.keys && 0 !== Object.keys(t).length) return !1;
                if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t).length) return !1;
                var n = Object.getOwnPropertySymbols(t);
                if (1 !== n.length || n[0] !== e) return !1;
                if (!Object.prototype.propertyIsEnumerable.call(t, e)) return !1;
                if ("function" == typeof Object.getOwnPropertyDescriptor) {
                    var o = Object.getOwnPropertyDescriptor(t, e);
                    if (42 !== o.value || !0 !== o.enumerable) return !1
                }
                return !0
            }
        }, 6410: (t, e, r) => {
            "use strict";
            var n = r(5419);
            t.exports = function () {
                return n() && !!Symbol.toStringTag
            }
        }, 7642: (t, e, r) => {
            "use strict";
            var n = r(8612);
            t.exports = n.call(Function.call, Object.prototype.hasOwnProperty)
        }, 5717: t => {
            "function" == typeof Object.create ? t.exports = function (t, e) {
                e && (t.super_ = e, t.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }))
            } : t.exports = function (t, e) {
                if (e) {
                    t.super_ = e;
                    var r = function () {
                    };
                    r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
                }
            }
        }, 2584: (t, e, r) => {
            "use strict";
            var n = r(6410)(), o = r(1924)("Object.prototype.toString"), i = function (t) {
                return !(n && t && "object" == typeof t && Symbol.toStringTag in t) && "[object Arguments]" === o(t)
            }, a = function (t) {
                return !!i(t) || null !== t && "object" == typeof t && "number" == typeof t.length && t.length >= 0 && "[object Array]" !== o(t) && "[object Function]" === o(t.callee)
            }, s = function () {
                return i(arguments)
            }();
            i.isLegacyArguments = a, t.exports = s ? i : a
        }, 8662: (t, e, r) => {
            "use strict";
            var n, o = Object.prototype.toString, i = Function.prototype.toString, a = /^\s*(?:function)?\*/,
                s = r(6410)(), u = Object.getPrototypeOf;
            t.exports = function (t) {
                if ("function" != typeof t) return !1;
                if (a.test(i.call(t))) return !0;
                if (!s) return "[object GeneratorFunction]" === o.call(t);
                if (!u) return !1;
                if (void 0 === n) {
                    var e = function () {
                        if (!s) return !1;
                        try {
                            return Function("return function*() {}")()
                        } catch (t) {
                        }
                    }();
                    n = !!e && u(e)
                }
                return u(t) === n
            }
        }, 5692: (t, e, r) => {
            "use strict";
            var n = r(9804), o = r(3083), i = r(1924), a = i("Object.prototype.toString"), s = r(6410)(),
                u = "undefined" == typeof globalThis ? r.g : globalThis, c = o(),
                f = i("Array.prototype.indexOf", !0) || function (t, e) {
                    for (var r = 0; r < t.length; r += 1) if (t[r] === e) return r;
                    return -1
                }, l = i("String.prototype.slice"), p = {}, h = r(882), d = Object.getPrototypeOf;
            s && h && d && n(c, (function (t) {
                var e = new u[t];
                if (Symbol.toStringTag in e) {
                    var r = d(e), n = h(r, Symbol.toStringTag);
                    if (!n) {
                        var o = d(r);
                        n = h(o, Symbol.toStringTag)
                    }
                    p[t] = n.get
                }
            }));
            t.exports = function (t) {
                if (!t || "object" != typeof t) return !1;
                if (!s || !(Symbol.toStringTag in t)) {
                    var e = l(a(t), 8, -1);
                    return f(c, e) > -1
                }
                return !!h && function (t) {
                    var e = !1;
                    return n(p, (function (r, n) {
                        if (!e) try {
                            e = r.call(t) === n
                        } catch (t) {
                        }
                    })), e
                }(t)
            }
        }, 4155: t => {
            var e, r, n = t.exports = {};

            function o() {
                throw new Error("setTimeout has not been defined")
            }

            function i() {
                throw new Error("clearTimeout has not been defined")
            }

            function a(t) {
                if (e === setTimeout) return setTimeout(t, 0);
                if ((e === o || !e) && setTimeout) return e = setTimeout, setTimeout(t, 0);
                try {
                    return e(t, 0)
                } catch (r) {
                    try {
                        return e.call(null, t, 0)
                    } catch (r) {
                        return e.call(this, t, 0)
                    }
                }
            }

            !function () {
                try {
                    e = "function" == typeof setTimeout ? setTimeout : o
                } catch (t) {
                    e = o
                }
                try {
                    r = "function" == typeof clearTimeout ? clearTimeout : i
                } catch (t) {
                    r = i
                }
            }();
            var s, u = [], c = !1, f = -1;

            function l() {
                c && s && (c = !1, s.length ? u = s.concat(u) : f = -1, u.length && p())
            }

            function p() {
                if (!c) {
                    var t = a(l);
                    c = !0;
                    for (var e = u.length; e;) {
                        for (s = u, u = []; ++f < e;) s && s[f].run();
                        f = -1, e = u.length
                    }
                    s = null, c = !1, function (t) {
                        if (r === clearTimeout) return clearTimeout(t);
                        if ((r === i || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
                        try {
                            r(t)
                        } catch (e) {
                            try {
                                return r.call(null, t)
                            } catch (e) {
                                return r.call(this, t)
                            }
                        }
                    }(t)
                }
            }

            function h(t, e) {
                this.fun = t, this.array = e
            }

            function d() {
            }

            n.nextTick = function (t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
                u.push(new h(t, e)), 1 !== u.length || c || a(p)
            }, h.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = d, n.addListener = d, n.once = d, n.off = d, n.removeListener = d, n.removeAllListeners = d, n.emit = d, n.prependListener = d, n.prependOnceListener = d, n.listeners = function (t) {
                return []
            }, n.binding = function (t) {
                throw new Error("process.binding is not supported")
            }, n.cwd = function () {
                return "/"
            }, n.chdir = function (t) {
                throw new Error("process.chdir is not supported")
            }, n.umask = function () {
                return 0
            }
        }, 384: t => {
            t.exports = function (t) {
                return t && "object" == typeof t && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8
            }
        }, 5955: (t, e, r) => {
            "use strict";
            var n = r(2584), o = r(8662), i = r(6430), a = r(5692);

            function s(t) {
                return t.call.bind(t)
            }

            var u = "undefined" != typeof BigInt, c = "undefined" != typeof Symbol, f = s(Object.prototype.toString),
                l = s(Number.prototype.valueOf), p = s(String.prototype.valueOf), h = s(Boolean.prototype.valueOf);
            if (u) var d = s(BigInt.prototype.valueOf);
            if (c) var y = s(Symbol.prototype.valueOf);

            function g(t, e) {
                if ("object" != typeof t) return !1;
                try {
                    return e(t), !0
                } catch (t) {
                    return !1
                }
            }

            function w(t) {
                return "[object Map]" === f(t)
            }

            function m(t) {
                return "[object Set]" === f(t)
            }

            function b(t) {
                return "[object WeakMap]" === f(t)
            }

            function v(t) {
                return "[object WeakSet]" === f(t)
            }

            function A(t) {
                return "[object ArrayBuffer]" === f(t)
            }

            function S(t) {
                return "undefined" != typeof ArrayBuffer && (A.working ? A(t) : t instanceof ArrayBuffer)
            }

            function E(t) {
                return "[object DataView]" === f(t)
            }

            function O(t) {
                return "undefined" != typeof DataView && (E.working ? E(t) : t instanceof DataView)
            }

            e.isArgumentsObject = n, e.isGeneratorFunction = o, e.isTypedArray = a, e.isPromise = function (t) {
                return "undefined" != typeof Promise && t instanceof Promise || null !== t && "object" == typeof t && "function" == typeof t.then && "function" == typeof t.catch
            }, e.isArrayBufferView = function (t) {
                return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : a(t) || O(t)
            }, e.isUint8Array = function (t) {
                return "Uint8Array" === i(t)
            }, e.isUint8ClampedArray = function (t) {
                return "Uint8ClampedArray" === i(t)
            }, e.isUint16Array = function (t) {
                return "Uint16Array" === i(t)
            }, e.isUint32Array = function (t) {
                return "Uint32Array" === i(t)
            }, e.isInt8Array = function (t) {
                return "Int8Array" === i(t)
            }, e.isInt16Array = function (t) {
                return "Int16Array" === i(t)
            }, e.isInt32Array = function (t) {
                return "Int32Array" === i(t)
            }, e.isFloat32Array = function (t) {
                return "Float32Array" === i(t)
            }, e.isFloat64Array = function (t) {
                return "Float64Array" === i(t)
            }, e.isBigInt64Array = function (t) {
                return "BigInt64Array" === i(t)
            }, e.isBigUint64Array = function (t) {
                return "BigUint64Array" === i(t)
            }, w.working = "undefined" != typeof Map && w(new Map), e.isMap = function (t) {
                return "undefined" != typeof Map && (w.working ? w(t) : t instanceof Map)
            }, m.working = "undefined" != typeof Set && m(new Set), e.isSet = function (t) {
                return "undefined" != typeof Set && (m.working ? m(t) : t instanceof Set)
            }, b.working = "undefined" != typeof WeakMap && b(new WeakMap), e.isWeakMap = function (t) {
                return "undefined" != typeof WeakMap && (b.working ? b(t) : t instanceof WeakMap)
            }, v.working = "undefined" != typeof WeakSet && v(new WeakSet), e.isWeakSet = function (t) {
                return v(t)
            }, A.working = "undefined" != typeof ArrayBuffer && A(new ArrayBuffer), e.isArrayBuffer = S, E.working = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView && E(new DataView(new ArrayBuffer(1), 0, 1)), e.isDataView = O;
            var T = "undefined" != typeof SharedArrayBuffer ? SharedArrayBuffer : void 0;

            function x(t) {
                return "[object SharedArrayBuffer]" === f(t)
            }

            function P(t) {
                return void 0 !== T && (void 0 === x.working && (x.working = x(new T)), x.working ? x(t) : t instanceof T)
            }

            function j(t) {
                return g(t, l)
            }

            function U(t) {
                return g(t, p)
            }

            function B(t) {
                return g(t, h)
            }

            function _(t) {
                return u && g(t, d)
            }

            function k(t) {
                return c && g(t, y)
            }

            e.isSharedArrayBuffer = P, e.isAsyncFunction = function (t) {
                return "[object AsyncFunction]" === f(t)
            }, e.isMapIterator = function (t) {
                return "[object Map Iterator]" === f(t)
            }, e.isSetIterator = function (t) {
                return "[object Set Iterator]" === f(t)
            }, e.isGeneratorObject = function (t) {
                return "[object Generator]" === f(t)
            }, e.isWebAssemblyCompiledModule = function (t) {
                return "[object WebAssembly.Module]" === f(t)
            }, e.isNumberObject = j, e.isStringObject = U, e.isBooleanObject = B, e.isBigIntObject = _, e.isSymbolObject = k, e.isBoxedPrimitive = function (t) {
                return j(t) || U(t) || B(t) || _(t) || k(t)
            }, e.isAnyArrayBuffer = function (t) {
                return "undefined" != typeof Uint8Array && (S(t) || P(t))
            }, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach((function (t) {
                Object.defineProperty(e, t, {
                    enumerable: !1, value: function () {
                        throw new Error(t + " is not supported in userland")
                    }
                })
            }))
        }, 9539: (t, e, r) => {
            var n = r(4155), o = Object.getOwnPropertyDescriptors || function (t) {
                for (var e = Object.keys(t), r = {}, n = 0; n < e.length; n++) r[e[n]] = Object.getOwnPropertyDescriptor(t, e[n]);
                return r
            }, i = /%[sdj%]/g;
            e.format = function (t) {
                if (!b(t)) {
                    for (var e = [], r = 0; r < arguments.length; r++) e.push(c(arguments[r]));
                    return e.join(" ")
                }
                r = 1;
                for (var n = arguments, o = n.length, a = String(t).replace(i, (function (t) {
                    if ("%%" === t) return "%";
                    if (r >= o) return t;
                    switch (t) {
                        case"%s":
                            return String(n[r++]);
                        case"%d":
                            return Number(n[r++]);
                        case"%j":
                            try {
                                return JSON.stringify(n[r++])
                            } catch (t) {
                                return "[Circular]"
                            }
                        default:
                            return t
                    }
                })), s = n[r]; r < o; s = n[++r]) w(s) || !S(s) ? a += " " + s : a += " " + c(s);
                return a
            }, e.deprecate = function (t, r) {
                if (void 0 !== n && !0 === n.noDeprecation) return t;
                if (void 0 === n) return function () {
                    return e.deprecate(t, r).apply(this, arguments)
                };
                var o = !1;
                return function () {
                    if (!o) {
                        if (n.throwDeprecation) throw new Error(r);
                        n.traceDeprecation ? console.trace(r) : console.error(r), o = !0
                    }
                    return t.apply(this, arguments)
                }
            };
            var a = {}, s = /^$/;
            if (n.env.NODE_DEBUG) {
                var u = n.env.NODE_DEBUG;
                u = u.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), s = new RegExp("^" + u + "$", "i")
            }

            function c(t, r) {
                var n = {seen: [], stylize: l};
                return arguments.length >= 3 && (n.depth = arguments[2]), arguments.length >= 4 && (n.colors = arguments[3]), g(r) ? n.showHidden = r : r && e._extend(n, r), v(n.showHidden) && (n.showHidden = !1), v(n.depth) && (n.depth = 2), v(n.colors) && (n.colors = !1), v(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = f), p(n, t, n.depth)
            }

            function f(t, e) {
                var r = c.styles[e];
                return r ? "[" + c.colors[r][0] + "m" + t + "[" + c.colors[r][1] + "m" : t
            }

            function l(t, e) {
                return t
            }

            function p(t, r, n) {
                if (t.customInspect && r && T(r.inspect) && r.inspect !== e.inspect && (!r.constructor || r.constructor.prototype !== r)) {
                    var o = r.inspect(n, t);
                    return b(o) || (o = p(t, o, n)), o
                }
                var i = function (t, e) {
                    if (v(e)) return t.stylize("undefined", "undefined");
                    if (b(e)) {
                        var r = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                        return t.stylize(r, "string")
                    }
                    if (m(e)) return t.stylize("" + e, "number");
                    if (g(e)) return t.stylize("" + e, "boolean");
                    if (w(e)) return t.stylize("null", "null")
                }(t, r);
                if (i) return i;
                var a = Object.keys(r), s = function (t) {
                    var e = {};
                    return t.forEach((function (t, r) {
                        e[t] = !0
                    })), e
                }(a);
                if (t.showHidden && (a = Object.getOwnPropertyNames(r)), O(r) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return h(r);
                if (0 === a.length) {
                    if (T(r)) {
                        var u = r.name ? ": " + r.name : "";
                        return t.stylize("[Function" + u + "]", "special")
                    }
                    if (A(r)) return t.stylize(RegExp.prototype.toString.call(r), "regexp");
                    if (E(r)) return t.stylize(Date.prototype.toString.call(r), "date");
                    if (O(r)) return h(r)
                }
                var c, f = "", l = !1, S = ["{", "}"];
                (y(r) && (l = !0, S = ["[", "]"]), T(r)) && (f = " [Function" + (r.name ? ": " + r.name : "") + "]");
                return A(r) && (f = " " + RegExp.prototype.toString.call(r)), E(r) && (f = " " + Date.prototype.toUTCString.call(r)), O(r) && (f = " " + h(r)), 0 !== a.length || l && 0 != r.length ? n < 0 ? A(r) ? t.stylize(RegExp.prototype.toString.call(r), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(r), c = l ? function (t, e, r, n, o) {
                    for (var i = [], a = 0, s = e.length; a < s; ++a) B(e, String(a)) ? i.push(d(t, e, r, n, String(a), !0)) : i.push("");
                    return o.forEach((function (o) {
                        o.match(/^\d+$/) || i.push(d(t, e, r, n, o, !0))
                    })), i
                }(t, r, n, s, a) : a.map((function (e) {
                    return d(t, r, n, s, e, l)
                })), t.seen.pop(), function (t, e, r) {
                    if (t.reduce((function (t, e) {
                        return e.indexOf("\n") >= 0 && 0, t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
                    }), 0) > 60) return r[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + r[1];
                    return r[0] + e + " " + t.join(", ") + " " + r[1]
                }(c, f, S)) : S[0] + f + S[1]
            }

            function h(t) {
                return "[" + Error.prototype.toString.call(t) + "]"
            }

            function d(t, e, r, n, o, i) {
                var a, s, u;
                if ((u = Object.getOwnPropertyDescriptor(e, o) || {value: e[o]}).get ? s = u.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : u.set && (s = t.stylize("[Setter]", "special")), B(n, o) || (a = "[" + o + "]"), s || (t.seen.indexOf(u.value) < 0 ? (s = w(r) ? p(t, u.value, null) : p(t, u.value, r - 1)).indexOf("\n") > -1 && (s = i ? s.split("\n").map((function (t) {
                    return "  " + t
                })).join("\n").substr(2) : "\n" + s.split("\n").map((function (t) {
                    return "   " + t
                })).join("\n")) : s = t.stylize("[Circular]", "special")), v(a)) {
                    if (i && o.match(/^\d+$/)) return s;
                    (a = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = t.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = t.stylize(a, "string"))
                }
                return a + ": " + s
            }

            function y(t) {
                return Array.isArray(t)
            }

            function g(t) {
                return "boolean" == typeof t
            }

            function w(t) {
                return null === t
            }

            function m(t) {
                return "number" == typeof t
            }

            function b(t) {
                return "string" == typeof t
            }

            function v(t) {
                return void 0 === t
            }

            function A(t) {
                return S(t) && "[object RegExp]" === x(t)
            }

            function S(t) {
                return "object" == typeof t && null !== t
            }

            function E(t) {
                return S(t) && "[object Date]" === x(t)
            }

            function O(t) {
                return S(t) && ("[object Error]" === x(t) || t instanceof Error)
            }

            function T(t) {
                return "function" == typeof t
            }

            function x(t) {
                return Object.prototype.toString.call(t)
            }

            function P(t) {
                return t < 10 ? "0" + t.toString(10) : t.toString(10)
            }

            e.debuglog = function (t) {
                if (t = t.toUpperCase(), !a[t]) if (s.test(t)) {
                    var r = n.pid;
                    a[t] = function () {
                        var n = e.format.apply(e, arguments);
                        console.error("%s %d: %s", t, r, n)
                    }
                } else a[t] = function () {
                };
                return a[t]
            }, e.inspect = c, c.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            }, c.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, e.types = r(5955), e.isArray = y, e.isBoolean = g, e.isNull = w, e.isNullOrUndefined = function (t) {
                return null == t
            }, e.isNumber = m, e.isString = b, e.isSymbol = function (t) {
                return "symbol" == typeof t
            }, e.isUndefined = v, e.isRegExp = A, e.types.isRegExp = A, e.isObject = S, e.isDate = E, e.types.isDate = E, e.isError = O, e.types.isNativeError = O, e.isFunction = T, e.isPrimitive = function (t) {
                return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
            }, e.isBuffer = r(384);
            var j = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            function U() {
                var t = new Date, e = [P(t.getHours()), P(t.getMinutes()), P(t.getSeconds())].join(":");
                return [t.getDate(), j[t.getMonth()], e].join(" ")
            }

            function B(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }

            e.log = function () {
                console.log("%s - %s", U(), e.format.apply(e, arguments))
            }, e.inherits = r(5717), e._extend = function (t, e) {
                if (!e || !S(e)) return t;
                for (var r = Object.keys(e), n = r.length; n--;) t[r[n]] = e[r[n]];
                return t
            };
            var _ = "undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0;

            function k(t, e) {
                if (!t) {
                    var r = new Error("Promise was rejected with a falsy value");
                    r.reason = t, t = r
                }
                return e(t)
            }

            e.promisify = function (t) {
                if ("function" != typeof t) throw new TypeError('The "original" argument must be of type Function');
                if (_ && t[_]) {
                    var e;
                    if ("function" != typeof (e = t[_])) throw new TypeError('The "util.promisify.custom" argument must be of type Function');
                    return Object.defineProperty(e, _, {value: e, enumerable: !1, writable: !1, configurable: !0}), e
                }

                function e() {
                    for (var e, r, n = new Promise((function (t, n) {
                        e = t, r = n
                    })), o = [], i = 0; i < arguments.length; i++) o.push(arguments[i]);
                    o.push((function (t, n) {
                        t ? r(t) : e(n)
                    }));
                    try {
                        t.apply(this, o)
                    } catch (t) {
                        r(t)
                    }
                    return n
                }

                return Object.setPrototypeOf(e, Object.getPrototypeOf(t)), _ && Object.defineProperty(e, _, {
                    value: e,
                    enumerable: !1,
                    writable: !1,
                    configurable: !0
                }), Object.defineProperties(e, o(t))
            }, e.promisify.custom = _, e.callbackify = function (t) {
                if ("function" != typeof t) throw new TypeError('The "original" argument must be of type Function');

                function e() {
                    for (var e = [], r = 0; r < arguments.length; r++) e.push(arguments[r]);
                    var o = e.pop();
                    if ("function" != typeof o) throw new TypeError("The last argument must be of type Function");
                    var i = this, a = function () {
                        return o.apply(i, arguments)
                    };
                    t.apply(this, e).then((function (t) {
                        n.nextTick(a.bind(null, null, t))
                    }), (function (t) {
                        n.nextTick(k.bind(null, t, a))
                    }))
                }

                return Object.setPrototypeOf(e, Object.getPrototypeOf(t)), Object.defineProperties(e, o(t)), e
            }
        }, 6430: (t, e, r) => {
            "use strict";
            var n = r(9804), o = r(3083), i = r(1924), a = i("Object.prototype.toString"), s = r(6410)(),
                u = "undefined" == typeof globalThis ? r.g : globalThis, c = o(), f = i("String.prototype.slice"),
                l = {}, p = r(882), h = Object.getPrototypeOf;
            s && p && h && n(c, (function (t) {
                if ("function" == typeof u[t]) {
                    var e = new u[t];
                    if (Symbol.toStringTag in e) {
                        var r = h(e), n = p(r, Symbol.toStringTag);
                        if (!n) {
                            var o = h(r);
                            n = p(o, Symbol.toStringTag)
                        }
                        l[t] = n.get
                    }
                }
            }));
            var d = r(5692);
            t.exports = function (t) {
                return !!d(t) && (s && Symbol.toStringTag in t ? function (t) {
                    var e = !1;
                    return n(l, (function (r, n) {
                        if (!e) try {
                            var o = r.call(t);
                            o === n && (e = o)
                        } catch (t) {
                        }
                    })), e
                }(t) : f(a(t), 8, -1))
            }
        }, 8522: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});
            const n = r(4431);
            e.default = class {
                constructor() {
                    this.BigNum = (t, e) => new (n.BigNumber.clone({DECIMAL_PLACES: e}))(t)
                }

                winstonToAr(t, {formatted: e = !1, decimals: r = 12, trim: n = !0} = {}) {
                    let o = this.stringToBigNum(t, r).shiftedBy(-12);
                    return e ? o.toFormat(r) : o.toFixed(r)
                }

                arToWinston(t, {formatted: e = !1} = {}) {
                    let r = this.stringToBigNum(t).shiftedBy(12);
                    return e ? r.toFormat() : r.toFixed(0)
                }

                compare(t, e) {
                    let r = this.stringToBigNum(t), n = this.stringToBigNum(e);
                    return r.comparedTo(n)
                }

                isEqual(t, e) {
                    return 0 === this.compare(t, e)
                }

                isLessThan(t, e) {
                    let r = this.stringToBigNum(t), n = this.stringToBigNum(e);
                    return r.isLessThan(n)
                }

                isGreaterThan(t, e) {
                    let r = this.stringToBigNum(t), n = this.stringToBigNum(e);
                    return r.isGreaterThan(n)
                }

                add(t, e) {
                    let r = this.stringToBigNum(t);
                    this.stringToBigNum(e);
                    return r.plus(e).toFixed(0)
                }

                sub(t, e) {
                    let r = this.stringToBigNum(t);
                    this.stringToBigNum(e);
                    return r.minus(e).toFixed(0)
                }

                stringToBigNum(t, e = 12) {
                    return this.BigNum(t, e)
                }
            }
        }, 7060: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});
            const n = r(941);
            r(1317);

            class o {
                constructor(t, e) {
                    this.api = t, this.network = e
                }

                async get(t) {
                    const e = await this.api.get(`${o.ENDPOINT}${t}`);
                    if (200 === e.status) return e.data;
                    throw 404 === e.status ? new n.default("BLOCK_NOT_FOUND") : new Error(`Error while loading block data: ${e}`)
                }

                async getCurrent() {
                    const {current: t} = await this.network.getInfo();
                    return await this.get(t)
                }
            }

            e.default = o, o.ENDPOINT = "block/hash/"
        }, 3997: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});
            const n = r(941), o = r(9303);
            e.default = class {
                constructor(t) {
                    this.api = t
                }

                async getTransactionOffset(t) {
                    const e = await this.api.get(`tx/${t}/offset`);
                    if (200 === e.status) return e.data;
                    throw new Error(`Unable to get transaction offset: ${(0, n.getError)(e)}`)
                }

                async getChunk(t) {
                    const e = await this.api.get(`chunk/${t}`);
                    if (200 === e.status) return e.data;
                    throw new Error(`Unable to get chunk: ${(0, n.getError)(e)}`)
                }

                async getChunkData(t) {
                    const e = await this.getChunk(t);
                    return o.b64UrlToBuffer(e.chunk)
                }

                firstChunkOffset(t) {
                    return parseInt(t.offset) - parseInt(t.size) + 1
                }

                async downloadChunkedData(t) {
                    const e = await this.getTransactionOffset(t), r = parseInt(e.size), n = parseInt(e.offset) - r + 1,
                        o = new Uint8Array(r);
                    let i = 0;
                    for (; i < r;) {
                        let t;
                        this.api.config.logging && console.log(`[chunk] ${i}/${r}`);
                        try {
                            t = await this.getChunkData(n + i)
                        } catch (t) {
                            console.error(`[chunk] Failed to fetch chunk at offset ${n + i}`), console.error("[chunk] This could indicate that the chunk wasn't uploaded or hasn't yet seeded properly to a particular gatway/node")
                        }
                        if (!t) throw new Error(`Coudn't complete data download at ${i}/${r}`);
                        o.set(t, i), i += t.length
                    }
                    return o
                }
            }
        }, 3415: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});
            const n = r(8522), o = r(8589), i = r(4886), a = r(6198), s = r(3241), u = r(4993), c = r(9303), f = r(470),
                l = r(3997), p = r(7060);

            class h {
                constructor(t) {
                    this.api = new o.default(t), this.wallets = new s.default(this.api, h.crypto), this.chunks = new l.default(this.api), this.transactions = new a.default(this.api, h.crypto, this.chunks), this.silo = new f.default(this.api, this.crypto, this.transactions), this.network = new i.default(this.api), this.blocks = new p.default(this.api, this.network), this.ar = new n.default
                }

                get crypto() {
                    return h.crypto
                }

                get utils() {
                    return h.utils
                }

                getConfig() {
                    return {api: this.api.getConfig(), crypto: null}
                }

                async createTransaction(t, e) {
                    const r = {};
                    if (Object.assign(r, t), !(t.data || t.target && t.quantity)) throw new Error("A new Arweave transaction must have a 'data' value, or 'target' and 'quantity' values.");
                    if (null == t.owner && e && "use_wallet" !== e && (r.owner = e.n), null == t.last_tx && (r.last_tx = await this.transactions.getTransactionAnchor()), "string" == typeof t.data && (t.data = c.stringToBuffer(t.data)), t.data instanceof ArrayBuffer && (t.data = new Uint8Array(t.data)), t.data && !(t.data instanceof Uint8Array)) throw new Error("Expected data to be a string, Uint8Array or ArrayBuffer");
                    if (null == t.reward) {
                        const e = t.data ? t.data.byteLength : 0;
                        r.reward = await this.transactions.getPrice(e, r.target)
                    }
                    r.data_root = "", r.data_size = t.data ? t.data.byteLength.toString() : "0", r.data = t.data || new Uint8Array(0);
                    const n = new u.default(r);
                    return await n.getSignatureData(), n
                }

                async createSiloTransaction(t, e, r) {
                    const n = {};
                    if (Object.assign(n, t), !t.data) throw new Error("Silo transactions must have a 'data' value");
                    if (!r) throw new Error("No Silo URI specified.");
                    if (t.target || t.quantity) throw new Error("Silo transactions can only be used for storing data, sending AR to other wallets isn't supported.");
                    if (null == t.owner) {
                        if (!e || !e.n) throw new Error("A new Arweave transaction must either have an 'owner' attribute, or you must provide the jwk parameter.");
                        n.owner = e.n
                    }
                    null == t.last_tx && (n.last_tx = await this.transactions.getTransactionAnchor());
                    const o = await this.silo.parseUri(r);
                    if ("string" == typeof t.data) {
                        const e = await this.crypto.encrypt(c.stringToBuffer(t.data), o.getEncryptionKey());
                        n.reward = await this.transactions.getPrice(e.byteLength), n.data = c.bufferTob64Url(e)
                    }
                    if (t.data instanceof Uint8Array) {
                        const e = await this.crypto.encrypt(t.data, o.getEncryptionKey());
                        n.reward = await this.transactions.getPrice(e.byteLength), n.data = c.bufferTob64Url(e)
                    }
                    const i = new u.default(n);
                    return i.addTag("Silo-Name", o.getAccessKey()), i.addTag("Silo-Version", "0.1.0"), i
                }

                arql(t) {
                    return this.api.post("/arql", t).then((t => t.data || []))
                }
            }

            e.default = h, h.utils = c
        }, 7533: function (t, e, r) {
            "use strict";
            var n = this && this.__createBinding || (Object.create ? function (t, e, r, n) {
                void 0 === n && (n = r), Object.defineProperty(t, n, {
                    enumerable: !0, get: function () {
                        return e[r]
                    }
                })
            } : function (t, e, r, n) {
                void 0 === n && (n = r), t[n] = e[r]
            }), o = this && this.__exportStar || function (t, e) {
                for (var r in t) "default" === r || Object.prototype.hasOwnProperty.call(e, r) || n(e, t, r)
            };
            Object.defineProperty(e, "__esModule", {value: !0});
            const i = r(3415), a = r(3716);
            i.default.crypto = new a.default, i.default.init = function (t = {}) {
                const e = function () {
                    const t = {host: "arweave.net", port: 443, protocol: "https"};
                    if (!(window && window.location && window.location.protocol && window.location.hostname)) return t;
                    const e = window.location.protocol.replace(":", ""), r = window.location.hostname,
                        n = window.location.port ? parseInt(window.location.port) : "https" == e ? 443 : 80;
                    return ["localhost", "127.0.0.1"].includes(r) || "file" == e ? t : {host: r, port: n, protocol: e}
                }(), r = t.protocol || e.protocol, n = t.host || e.host, o = t.port || e.port;
                return new i.default(Object.assign(Object.assign({}, t), {host: n, protocol: r, port: o}))
            }, window.Arweave = i.default, o(r(3415), e), e.default = i.default
        }, 8589: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});
            const n = r(9669);
            e.default = class {
                constructor(t) {
                    this.METHOD_GET = "GET", this.METHOD_POST = "POST", this.applyConfig(t)
                }

                applyConfig(t) {
                    this.config = this.mergeDefaults(t)
                }

                getConfig() {
                    return this.config
                }

                mergeDefaults(t) {
                    const e = t.protocol || "http", r = t.port || ("https" === e ? 443 : 80);
                    return {
                        host: t.host || "127.0.0.1",
                        protocol: e,
                        port: r,
                        timeout: t.timeout || 2e4,
                        logging: t.logging || !1,
                        logger: t.logger || console.log
                    }
                }

                async get(t, e) {
                    try {
                        return await this.request().get(t, e)
                    } catch (t) {
                        if (t.response && t.response.status) return t.response;
                        throw t
                    }
                }

                async post(t, e, r) {
                    try {
                        return await this.request().post(t, e, r)
                    } catch (t) {
                        if (t.response && t.response.status) return t.response;
                        throw t
                    }
                }

                request() {
                    let t = n.default.create({
                        baseURL: `${this.config.protocol}://${this.config.host}:${this.config.port}`,
                        timeout: this.config.timeout,
                        maxContentLength: 536870912
                    });
                    return this.config.logging && (t.interceptors.request.use((t => (this.config.logger(`Requesting: ${t.baseURL}/${t.url}`), t))), t.interceptors.response.use((t => (this.config.logger(`Response:   ${t.config.url} - ${t.status}`), t)))), t
                }
            }
        }, 3716: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});
            const n = r(9303);
            e.default = class {
                constructor() {
                    if (this.keyLength = 4096, this.publicExponent = 65537, this.hashAlgorithm = "sha256", !this.detectWebCrypto()) throw new Error("SubtleCrypto not available!");
                    this.driver = crypto.subtle
                }

                async generateJWK() {
                    let t = await this.driver.generateKey({
                        name: "RSA-PSS",
                        modulusLength: 4096,
                        publicExponent: new Uint8Array([1, 0, 1]),
                        hash: {name: "SHA-256"}
                    }, !0, ["sign"]), e = await this.driver.exportKey("jwk", t.privateKey);
                    return {kty: e.kty, e: e.e, n: e.n, d: e.d, p: e.p, q: e.q, dp: e.dp, dq: e.dq, qi: e.qi}
                }

                async sign(t, e, {saltLength: r} = {}) {
                    let n = await this.driver.sign({name: "RSA-PSS", saltLength: 32}, await this.jwkToCryptoKey(t), e);
                    return new Uint8Array(n)
                }

                async hash(t, e = "SHA-256") {
                    let r = await this.driver.digest(e, t);
                    return new Uint8Array(r)
                }

                async verify(t, e, r) {
                    const n = {kty: "RSA", e: "AQAB", n: t}, o = await this.jwkToPublicCryptoKey(n),
                        i = this.driver.verify({name: "RSA-PSS", saltLength: 32}, o, r, e),
                        a = this.driver.verify({name: "RSA-PSS", saltLength: 0}, o, r, e);
                    return i || a
                }

                async jwkToCryptoKey(t) {
                    return this.driver.importKey("jwk", t, {name: "RSA-PSS", hash: {name: "SHA-256"}}, !1, ["sign"])
                }

                async jwkToPublicCryptoKey(t) {
                    return this.driver.importKey("jwk", t, {name: "RSA-PSS", hash: {name: "SHA-256"}}, !1, ["verify"])
                }

                detectWebCrypto() {
                    if ("undefined" == typeof crypto) return !1;
                    const t = null === crypto || void 0 === crypto ? void 0 : crypto.subtle;
                    if (void 0 === t) return !1;
                    return ["generateKey", "importKey", "exportKey", "digest", "sign"].every((e => "function" == typeof t[e]))
                }

                async encrypt(t, e, r) {
                    const o = await this.driver.importKey("raw", "string" == typeof e ? n.stringToBuffer(e) : e, {
                        name: "PBKDF2",
                        length: 32
                    }, !1, ["deriveKey"]), i = await this.driver.deriveKey({
                        name: "PBKDF2",
                        salt: r ? n.stringToBuffer(r) : n.stringToBuffer("salt"),
                        iterations: 1e5,
                        hash: "SHA-256"
                    }, o, {name: "AES-CBC", length: 256}, !1, ["encrypt", "decrypt"]), a = new Uint8Array(16);
                    crypto.getRandomValues(a);
                    const s = await this.driver.encrypt({name: "AES-CBC", iv: a}, i, t);
                    return n.concatBuffers([a, s])
                }

                async decrypt(t, e, r) {
                    const o = await this.driver.importKey("raw", "string" == typeof e ? n.stringToBuffer(e) : e, {
                            name: "PBKDF2",
                            length: 32
                        }, !1, ["deriveKey"]), i = await this.driver.deriveKey({
                            name: "PBKDF2",
                            salt: r ? n.stringToBuffer(r) : n.stringToBuffer("salt"),
                            iterations: 1e5,
                            hash: "SHA-256"
                        }, o, {name: "AES-CBC", length: 256}, !1, ["encrypt", "decrypt"]), a = t.slice(0, 16),
                        s = await this.driver.decrypt({name: "AES-CBC", iv: a}, i, t.slice(16));
                    return n.concatBuffers([s])
                }
            }
        }, 1605: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});
            const n = r(3415);

            async function o(t) {
                if (Array.isArray(t)) {
                    const e = n.default.utils.concatBuffers([n.default.utils.stringToBuffer("list"), n.default.utils.stringToBuffer(t.length.toString())]);
                    return await i(t, await n.default.crypto.hash(e, "SHA-384"))
                }
                const e = n.default.utils.concatBuffers([n.default.utils.stringToBuffer("blob"), n.default.utils.stringToBuffer(t.byteLength.toString())]),
                    r = n.default.utils.concatBuffers([await n.default.crypto.hash(e, "SHA-384"), await n.default.crypto.hash(t, "SHA-384")]);
                return await n.default.crypto.hash(r, "SHA-384")
            }

            async function i(t, e) {
                if (t.length < 1) return e;
                const r = n.default.utils.concatBuffers([e, await o(t[0])]),
                    a = await n.default.crypto.hash(r, "SHA-384");
                return await i(t.slice(1), a)
            }

            e.default = o
        }, 941: (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.getError = void 0;

            class r extends Error {
                constructor(t, e = {}) {
                    e.message ? super(e.message) : super(), this.type = t, this.response = e.response
                }

                getType() {
                    return this.type
                }
            }

            e.default = r, e.getError = function (t) {
                let e = t.data;
                if ("string" == typeof t.data) try {
                    e = JSON.parse(t.data)
                } catch (t) {
                }
                if (t.data instanceof ArrayBuffer || t.data instanceof Uint8Array) try {
                    e = JSON.parse(e.toString())
                } catch (t) {
                }
                return e ? e.error || e : t.statusText || "unknown"
            }
        }, 6414: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.debug = e.validatePath = e.arrayCompare = e.bufferToInt = e.intToBuffer = e.arrayFlatten = e.generateProofs = e.buildLayers = e.generateTransactionChunks = e.generateTree = e.computeRootHash = e.generateLeaves = e.chunkData = e.MIN_CHUNK_SIZE = e.MAX_CHUNK_SIZE = void 0;
            const n = r(3415), o = r(9303);
            e.MAX_CHUNK_SIZE = 262144, e.MIN_CHUNK_SIZE = 32768;
            const i = 32;

            async function a(t) {
                let r = [], o = t, i = 0;
                for (; o.byteLength >= e.MAX_CHUNK_SIZE;) {
                    let t = e.MAX_CHUNK_SIZE, a = o.byteLength - e.MAX_CHUNK_SIZE;
                    a > 0 && a < e.MIN_CHUNK_SIZE && (t = Math.ceil(o.byteLength / 2));
                    const s = o.slice(0, t), u = await n.default.crypto.hash(s);
                    i += s.byteLength, r.push({
                        dataHash: u,
                        minByteRange: i - s.byteLength,
                        maxByteRange: i
                    }), o = o.slice(t)
                }
                return r.push({
                    dataHash: await n.default.crypto.hash(o),
                    minByteRange: i,
                    maxByteRange: i + o.byteLength
                }), r
            }

            async function s(t) {
                return Promise.all(t.map((async ({dataHash: t, minByteRange: e, maxByteRange: r}) => ({
                    type: "leaf",
                    id: await d(await Promise.all([d(t), d(y(r))])),
                    dataHash: t,
                    minByteRange: e,
                    maxByteRange: r
                }))))
            }

            async function u(t) {
                return await c(await s(await a(t)))
            }

            async function c(t, e = 0) {
                if (t.length < 2) {
                    return t[0]
                }
                const r = [];
                for (let e = 0; e < t.length; e += 2) r.push(await h(t[e], t[e + 1]));
                return c(r, e + 1)
            }

            function f(t) {
                const e = l(t);
                return Array.isArray(e) ? p(e) : [e]
            }

            function l(t, e = new Uint8Array, r = 0) {
                if ("leaf" == t.type) return {
                    offset: t.maxByteRange - 1,
                    proof: (0, o.concatBuffers)([e, t.dataHash, y(t.maxByteRange)])
                };
                if ("branch" == t.type) {
                    const n = (0, o.concatBuffers)([e, t.leftChild.id, t.rightChild.id, y(t.byteRange)]);
                    return [l(t.leftChild, n, r + 1), l(t.rightChild, n, r + 1)]
                }
                throw new Error("Unexpected node type")
            }

            function p(t) {
                const e = [];
                return t.forEach((t => {
                    Array.isArray(t) ? e.push(...p(t)) : e.push(t)
                })), e
            }

            async function h(t, e) {
                if (!e) return t;
                return {
                    type: "branch",
                    id: await d([await d(t.id), await d(e.id), await d(y(t.maxByteRange))]),
                    byteRange: t.maxByteRange,
                    maxByteRange: e.maxByteRange,
                    leftChild: t,
                    rightChild: e
                }
            }

            async function d(t) {
                return Array.isArray(t) && (t = n.default.utils.concatBuffers(t)), new Uint8Array(await n.default.crypto.hash(t))
            }

            function y(t) {
                const e = new Uint8Array(32);
                for (var r = e.length - 1; r >= 0; r--) {
                    var n = t % 256;
                    e[r] = n, t = (t - n) / 256
                }
                return e
            }

            function g(t) {
                let e = 0;
                for (var r = 0; r < t.length; r++) e *= 256, e += t[r];
                return e
            }

            e.chunkData = a, e.generateLeaves = s, e.computeRootHash = async function (t) {
                return (await u(t)).id
            }, e.generateTree = u, e.generateTransactionChunks = async function (t) {
                const e = await a(t), r = await s(e), n = await c(r), o = await f(n), i = e.slice(-1)[0];
                return i.maxByteRange - i.minByteRange == 0 && (e.splice(e.length - 1, 1), o.splice(o.length - 1, 1)), {
                    data_root: n.id,
                    chunks: e,
                    proofs: o
                }
            }, e.buildLayers = c, e.generateProofs = f, e.arrayFlatten = p, e.intToBuffer = y, e.bufferToInt = g;
            e.arrayCompare = (t, e) => t.every(((t, r) => e[r] === t)), e.validatePath = async function t(r, n, o, a, s) {
                if (a <= 0) return !1;
                if (n >= a) return t(r, 0, a - 1, a, s);
                if (n < 0) return t(r, 0, 0, a, s);
                if (64 == s.length) {
                    const t = s.slice(0, i), n = s.slice(t.length, t.length + 32),
                        u = await d([await d(t), await d(n)]);
                    return !!(0, e.arrayCompare)(r, u) && {offset: a - 1, leftBound: o, rightBound: a, chunkSize: a - o}
                }
                const u = s.slice(0, i), c = s.slice(u.length, u.length + i),
                    f = s.slice(u.length + c.length, u.length + c.length + 32), l = g(f),
                    p = s.slice(u.length + c.length + f.length), h = await d([await d(u), await d(c), await d(f)]);
                return !!(0, e.arrayCompare)(r, h) && (n < l ? await t(u, n, o, Math.min(a, l), p) : await t(c, n, Math.max(o, l), a, p))
            }, e.debug = async function t(e, r = "") {
                if (e.byteLength < 1) return r;
                const n = e.slice(0, i), o = e.slice(n.length, n.length + i),
                    a = e.slice(n.length + o.length, n.length + o.length + 32), s = g(a),
                    u = e.slice(n.length + o.length + a.length), c = await d([await d(n), await d(o), await d(a)]);
                return t(u, `${r}\n${JSON.stringify(Buffer.from(n))},${JSON.stringify(Buffer.from(o))},${s} => ${JSON.stringify(c)}`)
            }
        }, 6481: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.TransactionUploader = void 0;
            const n = r(4993), o = r(9303), i = r(941), a = r(6414),
                s = ["invalid_json", "chunk_too_big", "data_path_too_big", "offset_too_big", "data_size_too_big", "chunk_proof_ratio_not_attractive", "invalid_proof"];

            class u {
                constructor(t, e) {
                    if (this.api = t, this.chunkIndex = 0, this.txPosted = !1, this.lastRequestTimeEnd = 0, this.totalErrors = 0, this.lastResponseStatus = 0, this.lastResponseError = "", !e.id) throw new Error("Transaction is not signed");
                    if (!e.chunks) throw new Error("Transaction chunks not prepared");
                    this.data = e.data, this.transaction = new n.default(Object.assign({}, e, {data: new Uint8Array(0)}))
                }

                get isComplete() {
                    return this.txPosted && this.chunkIndex === this.transaction.chunks.chunks.length
                }

                get totalChunks() {
                    return this.transaction.chunks.chunks.length
                }

                get uploadedChunks() {
                    return this.chunkIndex
                }

                get pctComplete() {
                    return Math.trunc(this.uploadedChunks / this.totalChunks * 100)
                }

                async uploadChunk(t) {
                    if (this.isComplete) throw new Error("Upload is already complete");
                    if ("" !== this.lastResponseError ? this.totalErrors++ : this.totalErrors = 0, 100 === this.totalErrors) throw new Error(`Unable to complete upload: ${this.lastResponseStatus}: ${this.lastResponseError}`);
                    let e = "" === this.lastResponseError ? 0 : Math.max(this.lastRequestTimeEnd + 4e4 - Date.now(), 4e4);
                    if (e > 0 && (e -= e * Math.random() * .3, await new Promise((t => setTimeout(t, e)))), this.lastResponseError = "", !this.txPosted) return void await this.postTransaction();
                    t && (this.chunkIndex = t);
                    const r = this.transaction.getChunk(t || this.chunkIndex, this.data);
                    if (!await (0, a.validatePath)(this.transaction.chunks.data_root, parseInt(r.offset), 0, parseInt(r.data_size), o.b64UrlToBuffer(r.data_path))) throw new Error(`Unable to validate chunk ${this.chunkIndex}`);
                    const n = await this.api.post("chunk", this.transaction.getChunk(this.chunkIndex, this.data)).catch((t => (console.error(t.message), {
                        status: -1,
                        data: {error: t.message}
                    })));
                    if (this.lastRequestTimeEnd = Date.now(), this.lastResponseStatus = n.status, 200 == this.lastResponseStatus) this.chunkIndex++; else if (this.lastResponseError = (0, i.getError)(n), s.includes(this.lastResponseError)) throw new Error(`Fatal error uploading chunk ${this.chunkIndex}: ${this.lastResponseError}`)
                }

                static async fromSerialized(t, e, r) {
                    if (!e || "number" != typeof e.chunkIndex || "object" != typeof e.transaction) throw new Error("Serialized object does not match expected format.");
                    var o = new n.default(e.transaction);
                    o.chunks || await o.prepareChunks(r);
                    const i = new u(t, o);
                    if (i.chunkIndex = e.chunkIndex, i.lastRequestTimeEnd = e.lastRequestTimeEnd, i.lastResponseError = e.lastResponseError, i.lastResponseStatus = e.lastResponseStatus, i.txPosted = e.txPosted, i.data = r, i.transaction.data_root !== e.transaction.data_root) throw new Error("Data mismatch: Uploader doesn't match provided data.");
                    return i
                }

                static async fromTransactionId(t, e) {
                    const r = await t.get(`tx/${e}`);
                    if (200 !== r.status) throw new Error(`Tx ${e} not found: ${r.status}`);
                    const n = r.data;
                    n.data = new Uint8Array(0);
                    return {
                        txPosted: !0,
                        chunkIndex: 0,
                        lastResponseError: "",
                        lastRequestTimeEnd: 0,
                        lastResponseStatus: 0,
                        transaction: n
                    }
                }

                toJSON() {
                    return {
                        chunkIndex: this.chunkIndex,
                        transaction: this.transaction,
                        lastRequestTimeEnd: this.lastRequestTimeEnd,
                        lastResponseStatus: this.lastResponseStatus,
                        lastResponseError: this.lastResponseError,
                        txPosted: this.txPosted
                    }
                }

                async postTransaction() {
                    if (this.totalChunks <= 1) {
                        this.transaction.data = this.data;
                        const t = await this.api.post("tx", this.transaction).catch((t => (console.error(t), {
                            status: -1,
                            data: {error: t.message}
                        })));
                        if (this.lastRequestTimeEnd = Date.now(), this.lastResponseStatus = t.status, this.transaction.data = new Uint8Array(0), t.status >= 200 && t.status < 300) return this.txPosted = !0, void (this.chunkIndex = 1);
                        throw this.lastResponseError = (0, i.getError)(t), new Error(`Unable to upload transaction: ${t.status}, ${this.lastResponseError}`)
                    }
                    const t = await this.api.post("tx", this.transaction);
                    if (this.lastRequestTimeEnd = Date.now(), this.lastResponseStatus = t.status, !(t.status >= 200 && t.status < 300)) throw this.lastResponseError = (0, i.getError)(t), new Error(`Unable to upload transaction: ${t.status}, ${this.lastResponseError}`);
                    this.txPosted = !0
                }
            }

            e.TransactionUploader = u
        }, 4993: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Tag = void 0;
            const n = r(9303), o = r(1605), i = r(6414);

            class a {
                get(t, e) {
                    if (!Object.getOwnPropertyNames(this).includes(t)) throw new Error(`Field "${t}" is not a property of the Arweave Transaction class.`);
                    return this[t] instanceof Uint8Array ? e && e.decode && e.string ? n.bufferToString(this[t]) : e && e.decode && !e.string ? this[t] : n.bufferTob64Url(this[t]) : e && 1 == e.decode ? e && e.string ? n.b64UrlToString(this[t]) : n.b64UrlToBuffer(this[t]) : this[t]
                }
            }

            class s extends a {
                constructor(t, e, r = !1) {
                    super(), this.name = t, this.value = e
                }
            }

            e.Tag = s;
            e.default = class extends a {
                constructor(t = {}) {
                    super(), this.format = 2, this.id = "", this.last_tx = "", this.owner = "", this.tags = [], this.target = "", this.quantity = "0", this.data_size = "0", this.data = new Uint8Array, this.data_root = "", this.reward = "0", this.signature = "", Object.assign(this, t), "string" == typeof this.data && (this.data = n.b64UrlToBuffer(this.data)), t.tags && (this.tags = t.tags.map((t => new s(t.name, t.value))))
                }

                addTag(t, e) {
                    this.tags.push(new s(n.stringToB64Url(t), n.stringToB64Url(e)))
                }

                toJSON() {
                    return {
                        format: this.format,
                        id: this.id,
                        last_tx: this.last_tx,
                        owner: this.owner,
                        tags: this.tags,
                        target: this.target,
                        quantity: this.quantity,
                        data: n.bufferTob64Url(this.data),
                        data_size: this.data_size,
                        data_root: this.data_root,
                        data_tree: this.data_tree,
                        reward: this.reward,
                        signature: this.signature
                    }
                }

                setOwner(t) {
                    this.owner = t
                }

                setSignature({id: t, owner: e, reward: r, tags: n, signature: o}) {
                    this.id = t, this.owner = e, r && (this.reward = r), n && (this.tags = n), this.signature = o
                }

                async prepareChunks(t) {
                    !this.chunks && t.byteLength > 0 && (this.chunks = await (0, i.generateTransactionChunks)(t), this.data_root = n.bufferTob64Url(this.chunks.data_root)), this.chunks || 0 !== t.byteLength || (this.chunks = {
                        chunks: [],
                        data_root: new Uint8Array,
                        proofs: []
                    }, this.data_root = "")
                }

                getChunk(t, e) {
                    if (!this.chunks) throw new Error("Chunks have not been prepared");
                    const r = this.chunks.proofs[t], o = this.chunks.chunks[t];
                    return {
                        data_root: this.data_root,
                        data_size: this.data_size,
                        data_path: n.bufferTob64Url(r.proof),
                        offset: r.offset.toString(),
                        chunk: n.bufferTob64Url(e.slice(o.minByteRange, o.maxByteRange))
                    }
                }

                async getSignatureData() {
                    switch (this.format) {
                        case 1:
                            let t = this.tags.reduce(((t, e) => n.concatBuffers([t, e.get("name", {
                                decode: !0,
                                string: !1
                            }), e.get("value", {decode: !0, string: !1})])), new Uint8Array);
                            return n.concatBuffers([this.get("owner", {
                                decode: !0,
                                string: !1
                            }), this.get("target", {decode: !0, string: !1}), this.get("data", {
                                decode: !0,
                                string: !1
                            }), n.stringToBuffer(this.quantity), n.stringToBuffer(this.reward), this.get("last_tx", {
                                decode: !0,
                                string: !1
                            }), t]);
                        case 2:
                            this.data_root || await this.prepareChunks(this.data);
                            const e = this.tags.map((t => [t.get("name", {
                                decode: !0,
                                string: !1
                            }), t.get("value", {decode: !0, string: !1})]));
                            return await (0, o.default)([n.stringToBuffer(this.format.toString()), this.get("owner", {
                                decode: !0,
                                string: !1
                            }), this.get("target", {
                                decode: !0,
                                string: !1
                            }), n.stringToBuffer(this.quantity), n.stringToBuffer(this.reward), this.get("last_tx", {
                                decode: !0,
                                string: !1
                            }), e, n.stringToBuffer(this.data_size), this.get("data_root", {decode: !0, string: !1})]);
                        default:
                            throw new Error(`Unexpected transaction format: ${this.format}`)
                    }
                }
            }
        }, 9303: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.b64UrlDecode = e.b64UrlEncode = e.bufferTob64Url = e.bufferTob64 = e.b64UrlToBuffer = e.stringToB64Url = e.stringToBuffer = e.bufferToString = e.b64UrlToString = e.concatBuffers = void 0;
            const n = r(9742);

            function o(t) {
                if ("undefined" == typeof TextEncoder) {
                    return (new (0, r(9539).TextEncoder)).encode(t)
                }
                return (new TextEncoder).encode(t)
            }

            function i(t) {
                return new Uint8Array(n.toByteArray(c(t)))
            }

            function a(t) {
                return n.fromByteArray(new Uint8Array(t))
            }

            function s(t) {
                return u(a(t))
            }

            function u(t) {
                return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "")
            }

            function c(t) {
                let e;
                return e = (t = t.replace(/\-/g, "+").replace(/\_/g, "/")).length % 4 == 0 ? 0 : 4 - t.length % 4, t.concat("=".repeat(e))
            }

            e.concatBuffers = function (t) {
                let e = 0;
                for (let r = 0; r < t.length; r++) e += t[r].byteLength;
                let r = new Uint8Array(e), n = 0;
                r.set(new Uint8Array(t[0]), n), n += t[0].byteLength;
                for (let e = 1; e < t.length; e++) r.set(new Uint8Array(t[e]), n), n += t[e].byteLength;
                return r
            }, e.b64UrlToString = function (t) {
                let e = i(t);
                if ("undefined" == typeof TextDecoder) {
                    return new (0, r(9539).TextDecoder)("utf-8", {fatal: !0}).decode(e)
                }
                return new TextDecoder("utf-8", {fatal: !0}).decode(e)
            }, e.bufferToString = function (t) {
                if ("undefined" == typeof TextDecoder) {
                    return new (0, r(9539).TextDecoder)("utf-8", {fatal: !0}).decode(t)
                }
                return new TextDecoder("utf-8", {fatal: !0}).decode(t)
            }, e.stringToBuffer = o, e.stringToB64Url = function (t) {
                return s(o(t))
            }, e.b64UrlToBuffer = i, e.bufferTob64 = a, e.bufferTob64Url = s, e.b64UrlEncode = u, e.b64UrlDecode = c
        }, 4886: (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});
            e.default = class {
                constructor(t) {
                    this.api = t
                }

                getInfo() {
                    return this.api.get("info").then((t => t.data))
                }

                getPeers() {
                    return this.api.get("peers").then((t => t.data))
                }
            }
        }, 470: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.SiloResource = void 0;
            const n = r(9303);
            e.default = class {
                constructor(t, e, r) {
                    this.api = t, this.crypto = e, this.transactions = r
                }

                async get(t) {
                    if (!t) throw new Error("No Silo URI specified");
                    const e = await this.parseUri(t), r = await this.transactions.search("Silo-Name", e.getAccessKey());
                    if (0 == r.length) throw new Error(`No data could be found for the Silo URI: ${t}`);
                    const n = await this.transactions.get(r[0]);
                    if (!n) throw new Error(`No data could be found for the Silo URI: ${t}`);
                    const o = n.get("data", {decode: !0, string: !1});
                    return this.crypto.decrypt(o, e.getEncryptionKey())
                }

                async readTransactionData(t, e) {
                    if (!e) throw new Error("No Silo URI specified");
                    const r = await this.parseUri(e), n = t.get("data", {decode: !0, string: !1});
                    return this.crypto.decrypt(n, r.getEncryptionKey())
                }

                async parseUri(t) {
                    const e = t.match(/^([a-z0-9-_]+)\.([0-9]+)/i);
                    if (!e) throw new Error("Invalid Silo name, must be a name in the format of [a-z0-9]+.[0-9]+, e.g. 'bubble.7'");
                    const r = e[1], i = Math.pow(2, parseInt(e[2])), a = await this.hash(n.stringToBuffer(r), i),
                        s = n.bufferTob64(a.slice(0, 15)), u = await this.hash(a.slice(16, 31), 1);
                    return new o(t, s, u)
                }

                async hash(t, e) {
                    let r = await this.crypto.hash(t);
                    for (let t = 0; t < e - 1; t++) r = await this.crypto.hash(r);
                    return r
                }
            };

            class o {
                constructor(t, e, r) {
                    this.uri = t, this.accessKey = e, this.encryptionKey = r
                }

                getUri() {
                    return this.uri
                }

                getAccessKey() {
                    return this.accessKey
                }

                getEncryptionKey() {
                    return this.encryptionKey
                }
            }

            e.SiloResource = o
        }, 6198: function (t, e, r) {
            "use strict";
            var n = this && this.__await || function (t) {
                return this instanceof n ? (this.v = t, this) : new n(t)
            }, o = this && this.__asyncGenerator || function (t, e, r) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var o, i = r.apply(t, e || []), a = [];
                return o = {}, s("next"), s("throw"), s("return"), o[Symbol.asyncIterator] = function () {
                    return this
                }, o;

                function s(t) {
                    i[t] && (o[t] = function (e) {
                        return new Promise((function (r, n) {
                            a.push([t, e, r, n]) > 1 || u(t, e)
                        }))
                    })
                }

                function u(t, e) {
                    try {
                        (r = i[t](e)).value instanceof n ? Promise.resolve(r.value.v).then(c, f) : l(a[0][2], r)
                    } catch (t) {
                        l(a[0][3], t)
                    }
                    var r
                }

                function c(t) {
                    u("next", t)
                }

                function f(t) {
                    u("throw", t)
                }

                function l(t, e) {
                    t(e), a.shift(), a.length && u(a[0][0], a[0][1])
                }
            };
            Object.defineProperty(e, "__esModule", {value: !0});
            const i = r(941), a = r(4993), s = r(9303), u = r(6481);
            r(1317);
            e.default = class {
                constructor(t, e, r) {
                    this.api = t, this.crypto = e, this.chunks = r
                }

                getTransactionAnchor() {
                    return this.api.get("tx_anchor", {transformResponse: []}).then((t => t.data))
                }

                getPrice(t, e) {
                    let r = e ? `price/${t}/${e}` : `price/${t}`;
                    return this.api.get(r, {
                        transformResponse: [function (t) {
                            return t
                        }]
                    }).then((t => t.data))
                }

                async get(t) {
                    const e = await this.api.get(`tx/${t}`);
                    if (200 == e.status) {
                        const r = parseInt(e.data.data_size);
                        if (e.data.format >= 2 && r > 0 && r <= 12582912) {
                            const r = await this.getData(t);
                            return new a.default(Object.assign(Object.assign({}, e.data), {data: r}))
                        }
                        return new a.default(Object.assign(Object.assign({}, e.data), {format: e.data.format || 1}))
                    }
                    if (404 == e.status) throw new i.default("TX_NOT_FOUND");
                    if (410 == e.status) throw new i.default("TX_FAILED");
                    throw new i.default("TX_INVALID")
                }

                fromRaw(t) {
                    return new a.default(t)
                }

                async search(t, e) {
                    return this.api.post("arql", {op: "equals", expr1: t, expr2: e}).then((t => t.data ? t.data : []))
                }

                getStatus(t) {
                    return this.api.get(`tx/${t}/status`).then((t => 200 == t.status ? {
                        status: 200,
                        confirmed: t.data
                    } : {status: t.status, confirmed: null}))
                }

                async getData(t, e) {
                    const r = await this.chunks.downloadChunkedData(t);
                    return e && e.decode && !e.string ? r : e && e.decode && e.string ? s.bufferToString(r) : s.bufferTob64Url(r)
                }

                async sign(t, e, r) {
                    if (!(e || "undefined" != typeof window && window.arweaveWallet)) throw new Error("A new Arweave transaction must provide the jwk parameter.");
                    if (e && "use_wallet" !== e) {
                        t.setOwner(e.n);
                        let n = await t.getSignatureData(), o = await this.crypto.sign(e, n, r),
                            i = await this.crypto.hash(o);
                        t.setSignature({id: s.bufferTob64Url(i), owner: e.n, signature: s.bufferTob64Url(o)})
                    } else {
                        try {
                            (await window.arweaveWallet.getPermissions()).includes("SIGN_TRANSACTION") || await window.arweaveWallet.connect(["SIGN_TRANSACTION"])
                        } catch (t) {
                        }
                        const e = await window.arweaveWallet.sign(t, r);
                        t.setSignature({
                            id: e.id,
                            owner: e.owner,
                            reward: e.reward,
                            tags: e.tags,
                            signature: e.signature
                        })
                    }
                }

                async verify(t) {
                    const e = await t.getSignatureData(), r = t.get("signature", {decode: !0, string: !1}),
                        n = s.bufferTob64Url(await this.crypto.hash(r));
                    if (t.id !== n) throw new Error("Invalid transaction signature or ID! The transaction ID doesn't match the expected SHA-256 hash of the signature.");
                    return this.crypto.verify(t.owner, e, r)
                }

                async post(t) {
                    if ("string" == typeof t ? t = new a.default(JSON.parse(t)) : "function" == typeof t.readInt32BE ? t = new a.default(JSON.parse(t.toString())) : "object" != typeof t || t instanceof a.default || (t = new a.default(t)), !(t instanceof a.default)) throw new Error("Must be Transaction object");
                    t.chunks || await t.prepareChunks(t.data);
                    const e = await this.getUploader(t, t.data);
                    try {
                        for (; !e.isComplete;) await e.uploadChunk()
                    } catch (t) {
                        if (e.lastResponseStatus > 0) return {
                            status: e.lastResponseStatus,
                            statusText: e.lastResponseError,
                            data: {error: e.lastResponseError}
                        };
                        throw t
                    }
                    return {status: 200, statusText: "OK", data: {}}
                }

                async getUploader(t, e) {
                    let r;
                    if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), t instanceof a.default) {
                        if (e || (e = t.data), !(e instanceof Uint8Array)) throw new Error("Data format is invalid");
                        t.chunks || await t.prepareChunks(e), r = new u.TransactionUploader(this.api, t), r.data && 0 !== r.data.length || (r.data = e)
                    } else {
                        if ("string" == typeof t && (t = await u.TransactionUploader.fromTransactionId(this.api, t)), !(e && e instanceof Uint8Array)) throw new Error("Must provide data when resuming upload");
                        r = await u.TransactionUploader.fromSerialized(this.api, t, e)
                    }
                    return r
                }

                upload(t, e) {
                    return o(this, arguments, (function* () {
                        const r = yield n(this.getUploader(t, e));
                        for (; !r.isComplete;) yield n(r.uploadChunk()), yield yield n(r);
                        return yield n(r)
                    }))
                }
            }
        }, 3241: (t, e, r) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});
            const n = r(9303);
            r(1317);
            e.default = class {
                constructor(t, e) {
                    this.api = t, this.crypto = e
                }

                getBalance(t) {
                    return this.api.get(`wallet/${t}/balance`, {
                        transformResponse: [function (t) {
                            return t
                        }]
                    }).then((t => t.data))
                }

                getLastTransactionID(t) {
                    return this.api.get(`wallet/${t}/last_tx`).then((t => t.data))
                }

                generate() {
                    return this.crypto.generateJWK()
                }

                async jwkToAddress(t) {
                    return t && "use_wallet" !== t ? this.getAddress(t) : this.getAddress()
                }

                async getAddress(t) {
                    if (t && "use_wallet" !== t) return this.ownerToAddress(t.n);
                    try {
                        await window.arweaveWallet.connect(["ACCESS_ADDRESS"])
                    } catch (t) {
                    }
                    return window.arweaveWallet.getActiveAddress()
                }

                async ownerToAddress(t) {
                    return n.bufferTob64Url(await this.crypto.hash(n.b64UrlToBuffer(t)))
                }
            }
        }, 3083: (t, e, r) => {
            "use strict";
            var n = ["BigInt64Array", "BigUint64Array", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray"],
                o = "undefined" == typeof globalThis ? r.g : globalThis;
            t.exports = function () {
                for (var t = [], e = 0; e < n.length; e++) "function" == typeof o[n[e]] && (t[t.length] = n[e]);
                return t
            }
        }, 882: (t, e, r) => {
            "use strict";
            var n = r(210)("%Object.getOwnPropertyDescriptor%", !0);
            if (n) try {
                n([], "length")
            } catch (t) {
                n = null
            }
            t.exports = n
        }
    }, e = {};

    function r(n) {
        var o = e[n];
        if (void 0 !== o) return o.exports;
        var i = e[n] = {exports: {}};
        return t[n].call(i.exports, i, i.exports, r), i.exports
    }

    r.d = (t, e) => {
        for (var n in e) r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {enumerable: !0, get: e[n]})
    }, r.g = function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (t) {
            if ("object" == typeof window) return window
        }
    }(), r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), r.r = t => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    };
    r(7533)
})();

/*!
  * Bootstrap v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e()
}(this, (function () {
    "use strict";
    const t = "transitionend", e = t => {
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let i = t.getAttribute("href");
                if (!i || !i.includes("#") && !i.startsWith(".")) return null;
                i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`), e = i && "#" !== i ? i.trim() : null
            }
            return e
        }, i = t => {
            const i = e(t);
            return i && document.querySelector(i) ? i : null
        }, n = t => {
            const i = e(t);
            return i ? document.querySelector(i) : null
        }, s = e => {
            e.dispatchEvent(new Event(t))
        }, o = t => !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
        r = t => o(t) ? t.jquery ? t[0] : t : "string" == typeof t && t.length > 0 ? document.querySelector(t) : null,
        a = (t, e, i) => {
            Object.keys(i).forEach((n => {
                const s = i[n], r = e[n],
                    a = r && o(r) ? "element" : null == (l = r) ? `${l}` : {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();
                var l;
                if (!new RegExp(s).test(a)) throw new TypeError(`${t.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${s}".`)
            }))
        },
        l = t => !(!o(t) || 0 === t.getClientRects().length) && "visible" === getComputedStyle(t).getPropertyValue("visibility"),
        c = t => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
        h = t => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? h(t.parentNode) : null
        }, d = () => {
        }, u = t => {
            t.offsetHeight
        }, f = () => {
            const {jQuery: t} = window;
            return t && !document.body.hasAttribute("data-bs-no-jquery") ? t : null
        }, p = [], m = () => "rtl" === document.documentElement.dir, g = t => {
            var e;
            e = () => {
                const e = f();
                if (e) {
                    const i = t.NAME, n = e.fn[i];
                    e.fn[i] = t.jQueryInterface, e.fn[i].Constructor = t, e.fn[i].noConflict = () => (e.fn[i] = n, t.jQueryInterface)
                }
            }, "loading" === document.readyState ? (p.length || document.addEventListener("DOMContentLoaded", (() => {
                p.forEach((t => t()))
            })), p.push(e)) : e()
        }, _ = t => {
            "function" == typeof t && t()
        }, b = (e, i, n = !0) => {
            if (!n) return void _(e);
            const o = (t => {
                if (!t) return 0;
                let {transitionDuration: e, transitionDelay: i} = window.getComputedStyle(t);
                const n = Number.parseFloat(e), s = Number.parseFloat(i);
                return n || s ? (e = e.split(",")[0], i = i.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0
            })(i) + 5;
            let r = !1;
            const a = ({target: n}) => {
                n === i && (r = !0, i.removeEventListener(t, a), _(e))
            };
            i.addEventListener(t, a), setTimeout((() => {
                r || s(i)
            }), o)
        }, v = (t, e, i, n) => {
            let s = t.indexOf(e);
            if (-1 === s) return t[!i && n ? t.length - 1 : 0];
            const o = t.length;
            return s += i ? 1 : -1, n && (s = (s + o) % o), t[Math.max(0, Math.min(s, o - 1))]
        }, y = /[^.]*(?=\..*)\.|.*/, w = /\..*/, E = /::\d+$/, A = {};
    let T = 1;
    const O = {mouseenter: "mouseover", mouseleave: "mouseout"}, C = /^(mouseenter|mouseleave)/i,
        k = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

    function L(t, e) {
        return e && `${e}::${T++}` || t.uidEvent || T++
    }

    function x(t) {
        const e = L(t);
        return t.uidEvent = e, A[e] = A[e] || {}, A[e]
    }

    function D(t, e, i = null) {
        const n = Object.keys(t);
        for (let s = 0, o = n.length; s < o; s++) {
            const o = t[n[s]];
            if (o.originalHandler === e && o.delegationSelector === i) return o
        }
        return null
    }

    function S(t, e, i) {
        const n = "string" == typeof e, s = n ? i : e;
        let o = P(t);
        return k.has(o) || (o = t), [n, s, o]
    }

    function N(t, e, i, n, s) {
        if ("string" != typeof e || !t) return;
        if (i || (i = n, n = null), C.test(e)) {
            const t = t => function (e) {
                if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e)
            };
            n ? n = t(n) : i = t(i)
        }
        const [o, r, a] = S(e, i, n), l = x(t), c = l[a] || (l[a] = {}), h = D(c, r, o ? i : null);
        if (h) return void (h.oneOff = h.oneOff && s);
        const d = L(r, e.replace(y, "")), u = o ? function (t, e, i) {
            return function n(s) {
                const o = t.querySelectorAll(e);
                for (let {target: r} = s; r && r !== this; r = r.parentNode) for (let a = o.length; a--;) if (o[a] === r) return s.delegateTarget = r, n.oneOff && j.off(t, s.type, e, i), i.apply(r, [s]);
                return null
            }
        }(t, i, n) : function (t, e) {
            return function i(n) {
                return n.delegateTarget = t, i.oneOff && j.off(t, n.type, e), e.apply(t, [n])
            }
        }(t, i);
        u.delegationSelector = o ? i : null, u.originalHandler = r, u.oneOff = s, u.uidEvent = d, c[d] = u, t.addEventListener(a, u, o)
    }

    function I(t, e, i, n, s) {
        const o = D(e[i], n, s);
        o && (t.removeEventListener(i, o, Boolean(s)), delete e[i][o.uidEvent])
    }

    function P(t) {
        return t = t.replace(w, ""), O[t] || t
    }

    const j = {
        on(t, e, i, n) {
            N(t, e, i, n, !1)
        }, one(t, e, i, n) {
            N(t, e, i, n, !0)
        }, off(t, e, i, n) {
            if ("string" != typeof e || !t) return;
            const [s, o, r] = S(e, i, n), a = r !== e, l = x(t), c = e.startsWith(".");
            if (void 0 !== o) {
                if (!l || !l[r]) return;
                return void I(t, l, r, o, s ? i : null)
            }
            c && Object.keys(l).forEach((i => {
                !function (t, e, i, n) {
                    const s = e[i] || {};
                    Object.keys(s).forEach((o => {
                        if (o.includes(n)) {
                            const n = s[o];
                            I(t, e, i, n.originalHandler, n.delegationSelector)
                        }
                    }))
                }(t, l, i, e.slice(1))
            }));
            const h = l[r] || {};
            Object.keys(h).forEach((i => {
                const n = i.replace(E, "");
                if (!a || e.includes(n)) {
                    const e = h[i];
                    I(t, l, r, e.originalHandler, e.delegationSelector)
                }
            }))
        }, trigger(t, e, i) {
            if ("string" != typeof e || !t) return null;
            const n = f(), s = P(e), o = e !== s, r = k.has(s);
            let a, l = !0, c = !0, h = !1, d = null;
            return o && n && (a = n.Event(e, i), n(t).trigger(a), l = !a.isPropagationStopped(), c = !a.isImmediatePropagationStopped(), h = a.isDefaultPrevented()), r ? (d = document.createEvent("HTMLEvents"), d.initEvent(s, l, !0)) : d = new CustomEvent(e, {
                bubbles: l,
                cancelable: !0
            }), void 0 !== i && Object.keys(i).forEach((t => {
                Object.defineProperty(d, t, {get: () => i[t]})
            })), h && d.preventDefault(), c && t.dispatchEvent(d), d.defaultPrevented && void 0 !== a && a.preventDefault(), d
        }
    }, M = new Map, H = {
        set(t, e, i) {
            M.has(t) || M.set(t, new Map);
            const n = M.get(t);
            n.has(e) || 0 === n.size ? n.set(e, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`)
        }, get: (t, e) => M.has(t) && M.get(t).get(e) || null, remove(t, e) {
            if (!M.has(t)) return;
            const i = M.get(t);
            i.delete(e), 0 === i.size && M.delete(t)
        }
    };

    class B {
        constructor(t) {
            (t = r(t)) && (this._element = t, H.set(this._element, this.constructor.DATA_KEY, this))
        }

        dispose() {
            H.remove(this._element, this.constructor.DATA_KEY), j.off(this._element, this.constructor.EVENT_KEY), Object.getOwnPropertyNames(this).forEach((t => {
                this[t] = null
            }))
        }

        _queueCallback(t, e, i = !0) {
            b(t, e, i)
        }

        static getInstance(t) {
            return H.get(r(t), this.DATA_KEY)
        }

        static getOrCreateInstance(t, e = {}) {
            return this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
        }

        static get VERSION() {
            return "5.1.3"
        }

        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!')
        }

        static get DATA_KEY() {
            return `bs.${this.NAME}`
        }

        static get EVENT_KEY() {
            return `.${this.DATA_KEY}`
        }
    }

    const R = (t, e = "hide") => {
        const i = `click.dismiss${t.EVENT_KEY}`, s = t.NAME;
        j.on(document, i, `[data-bs-dismiss="${s}"]`, (function (i) {
            if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), c(this)) return;
            const o = n(this) || this.closest(`.${s}`);
            t.getOrCreateInstance(o)[e]()
        }))
    };

    class W extends B {
        static get NAME() {
            return "alert"
        }

        close() {
            if (j.trigger(this._element, "close.bs.alert").defaultPrevented) return;
            this._element.classList.remove("show");
            const t = this._element.classList.contains("fade");
            this._queueCallback((() => this._destroyElement()), this._element, t)
        }

        _destroyElement() {
            this._element.remove(), j.trigger(this._element, "closed.bs.alert"), this.dispose()
        }

        static jQueryInterface(t) {
            return this.each((function () {
                const e = W.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }

    R(W, "close"), g(W);
    const $ = '[data-bs-toggle="button"]';

    class z extends B {
        static get NAME() {
            return "button"
        }

        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }

        static jQueryInterface(t) {
            return this.each((function () {
                const e = z.getOrCreateInstance(this);
                "toggle" === t && e[t]()
            }))
        }
    }

    function q(t) {
        return "true" === t || "false" !== t && (t === Number(t).toString() ? Number(t) : "" === t || "null" === t ? null : t)
    }

    function F(t) {
        return t.replace(/[A-Z]/g, (t => `-${t.toLowerCase()}`))
    }

    j.on(document, "click.bs.button.data-api", $, (t => {
        t.preventDefault();
        const e = t.target.closest($);
        z.getOrCreateInstance(e).toggle()
    })), g(z);
    const U = {
            setDataAttribute(t, e, i) {
                t.setAttribute(`data-bs-${F(e)}`, i)
            }, removeDataAttribute(t, e) {
                t.removeAttribute(`data-bs-${F(e)}`)
            }, getDataAttributes(t) {
                if (!t) return {};
                const e = {};
                return Object.keys(t.dataset).filter((t => t.startsWith("bs"))).forEach((i => {
                    let n = i.replace(/^bs/, "");
                    n = n.charAt(0).toLowerCase() + n.slice(1, n.length), e[n] = q(t.dataset[i])
                })), e
            }, getDataAttribute: (t, e) => q(t.getAttribute(`data-bs-${F(e)}`)), offset(t) {
                const e = t.getBoundingClientRect();
                return {top: e.top + window.pageYOffset, left: e.left + window.pageXOffset}
            }, position: t => ({top: t.offsetTop, left: t.offsetLeft})
        }, V = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter((t => t.matches(e))),
            parents(t, e) {
                const i = [];
                let n = t.parentNode;
                for (; n && n.nodeType === Node.ELEMENT_NODE && 3 !== n.nodeType;) n.matches(e) && i.push(n), n = n.parentNode;
                return i
            },
            prev(t, e) {
                let i = t.previousElementSibling;
                for (; i;) {
                    if (i.matches(e)) return [i];
                    i = i.previousElementSibling
                }
                return []
            },
            next(t, e) {
                let i = t.nextElementSibling;
                for (; i;) {
                    if (i.matches(e)) return [i];
                    i = i.nextElementSibling
                }
                return []
            },
            focusableChildren(t) {
                const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t => `${t}:not([tabindex^="-"])`)).join(", ");
                return this.find(e, t).filter((t => !c(t) && l(t)))
            }
        }, K = "carousel", X = {interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0}, Y = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        }, Q = "next", G = "prev", Z = "left", J = "right", tt = {ArrowLeft: J, ArrowRight: Z}, et = "slid.bs.carousel",
        it = "active", nt = ".active.carousel-item";

    class st extends B {
        constructor(t, e) {
            super(t), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._indicatorsElement = V.findOne(".carousel-indicators", this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent), this._addEventListeners()
        }

        static get Default() {
            return X
        }

        static get NAME() {
            return K
        }

        next() {
            this._slide(Q)
        }

        nextWhenVisible() {
            !document.hidden && l(this._element) && this.next()
        }

        prev() {
            this._slide(G)
        }

        pause(t) {
            t || (this._isPaused = !0), V.findOne(".carousel-item-next, .carousel-item-prev", this._element) && (s(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
        }

        cycle(t) {
            t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }

        to(t) {
            this._activeElement = V.findOne(nt, this._element);
            const e = this._getItemIndex(this._activeElement);
            if (t > this._items.length - 1 || t < 0) return;
            if (this._isSliding) return void j.one(this._element, et, (() => this.to(t)));
            if (e === t) return this.pause(), void this.cycle();
            const i = t > e ? Q : G;
            this._slide(i, this._items[t])
        }

        _getConfig(t) {
            return t = {...X, ...U.getDataAttributes(this._element), ..."object" == typeof t ? t : {}}, a(K, t, Y), t
        }

        _handleSwipe() {
            const t = Math.abs(this.touchDeltaX);
            if (t <= 40) return;
            const e = t / this.touchDeltaX;
            this.touchDeltaX = 0, e && this._slide(e > 0 ? J : Z)
        }

        _addEventListeners() {
            this._config.keyboard && j.on(this._element, "keydown.bs.carousel", (t => this._keydown(t))), "hover" === this._config.pause && (j.on(this._element, "mouseenter.bs.carousel", (t => this.pause(t))), j.on(this._element, "mouseleave.bs.carousel", (t => this.cycle(t)))), this._config.touch && this._touchSupported && this._addTouchEventListeners()
        }

        _addTouchEventListeners() {
            const t = t => this._pointerEvent && ("pen" === t.pointerType || "touch" === t.pointerType), e = e => {
                t(e) ? this.touchStartX = e.clientX : this._pointerEvent || (this.touchStartX = e.touches[0].clientX)
            }, i = t => {
                this.touchDeltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this.touchStartX
            }, n = e => {
                t(e) && (this.touchDeltaX = e.clientX - this.touchStartX), this._handleSwipe(), "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout((t => this.cycle(t)), 500 + this._config.interval))
            };
            V.find(".carousel-item img", this._element).forEach((t => {
                j.on(t, "dragstart.bs.carousel", (t => t.preventDefault()))
            })), this._pointerEvent ? (j.on(this._element, "pointerdown.bs.carousel", (t => e(t))), j.on(this._element, "pointerup.bs.carousel", (t => n(t))), this._element.classList.add("pointer-event")) : (j.on(this._element, "touchstart.bs.carousel", (t => e(t))), j.on(this._element, "touchmove.bs.carousel", (t => i(t))), j.on(this._element, "touchend.bs.carousel", (t => n(t))))
        }

        _keydown(t) {
            if (/input|textarea/i.test(t.target.tagName)) return;
            const e = tt[t.key];
            e && (t.preventDefault(), this._slide(e))
        }

        _getItemIndex(t) {
            return this._items = t && t.parentNode ? V.find(".carousel-item", t.parentNode) : [], this._items.indexOf(t)
        }

        _getItemByOrder(t, e) {
            const i = t === Q;
            return v(this._items, e, i, this._config.wrap)
        }

        _triggerSlideEvent(t, e) {
            const i = this._getItemIndex(t), n = this._getItemIndex(V.findOne(nt, this._element));
            return j.trigger(this._element, "slide.bs.carousel", {relatedTarget: t, direction: e, from: n, to: i})
        }

        _setActiveIndicatorElement(t) {
            if (this._indicatorsElement) {
                const e = V.findOne(".active", this._indicatorsElement);
                e.classList.remove(it), e.removeAttribute("aria-current");
                const i = V.find("[data-bs-target]", this._indicatorsElement);
                for (let e = 0; e < i.length; e++) if (Number.parseInt(i[e].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(t)) {
                    i[e].classList.add(it), i[e].setAttribute("aria-current", "true");
                    break
                }
            }
        }

        _updateInterval() {
            const t = this._activeElement || V.findOne(nt, this._element);
            if (!t) return;
            const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
            e ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = e) : this._config.interval = this._config.defaultInterval || this._config.interval
        }

        _slide(t, e) {
            const i = this._directionToOrder(t), n = V.findOne(nt, this._element), s = this._getItemIndex(n),
                o = e || this._getItemByOrder(i, n), r = this._getItemIndex(o), a = Boolean(this._interval),
                l = i === Q, c = l ? "carousel-item-start" : "carousel-item-end",
                h = l ? "carousel-item-next" : "carousel-item-prev", d = this._orderToDirection(i);
            if (o && o.classList.contains(it)) return void (this._isSliding = !1);
            if (this._isSliding) return;
            if (this._triggerSlideEvent(o, d).defaultPrevented) return;
            if (!n || !o) return;
            this._isSliding = !0, a && this.pause(), this._setActiveIndicatorElement(o), this._activeElement = o;
            const f = () => {
                j.trigger(this._element, et, {relatedTarget: o, direction: d, from: s, to: r})
            };
            if (this._element.classList.contains("slide")) {
                o.classList.add(h), u(o), n.classList.add(c), o.classList.add(c);
                const t = () => {
                    o.classList.remove(c, h), o.classList.add(it), n.classList.remove(it, h, c), this._isSliding = !1, setTimeout(f, 0)
                };
                this._queueCallback(t, n, !0)
            } else n.classList.remove(it), o.classList.add(it), this._isSliding = !1, f();
            a && this.cycle()
        }

        _directionToOrder(t) {
            return [J, Z].includes(t) ? m() ? t === Z ? G : Q : t === Z ? Q : G : t
        }

        _orderToDirection(t) {
            return [Q, G].includes(t) ? m() ? t === G ? Z : J : t === G ? J : Z : t
        }

        static carouselInterface(t, e) {
            const i = st.getOrCreateInstance(t, e);
            let {_config: n} = i;
            "object" == typeof e && (n = {...n, ...e});
            const s = "string" == typeof e ? e : n.slide;
            if ("number" == typeof e) i.to(e); else if ("string" == typeof s) {
                if (void 0 === i[s]) throw new TypeError(`No method named "${s}"`);
                i[s]()
            } else n.interval && n.ride && (i.pause(), i.cycle())
        }

        static jQueryInterface(t) {
            return this.each((function () {
                st.carouselInterface(this, t)
            }))
        }

        static dataApiClickHandler(t) {
            const e = n(this);
            if (!e || !e.classList.contains("carousel")) return;
            const i = {...U.getDataAttributes(e), ...U.getDataAttributes(this)},
                s = this.getAttribute("data-bs-slide-to");
            s && (i.interval = !1), st.carouselInterface(e, i), s && st.getInstance(e).to(s), t.preventDefault()
        }
    }

    j.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", st.dataApiClickHandler), j.on(window, "load.bs.carousel.data-api", (() => {
        const t = V.find('[data-bs-ride="carousel"]');
        for (let e = 0, i = t.length; e < i; e++) st.carouselInterface(t[e], st.getInstance(t[e]))
    })), g(st);
    const ot = "collapse", rt = {toggle: !0, parent: null}, at = {toggle: "boolean", parent: "(null|element)"},
        lt = "show", ct = "collapse", ht = "collapsing", dt = "collapsed", ut = ":scope .collapse .collapse",
        ft = '[data-bs-toggle="collapse"]';

    class pt extends B {
        constructor(t, e) {
            super(t), this._isTransitioning = !1, this._config = this._getConfig(e), this._triggerArray = [];
            const n = V.find(ft);
            for (let t = 0, e = n.length; t < e; t++) {
                const e = n[t], s = i(e), o = V.find(s).filter((t => t === this._element));
                null !== s && o.length && (this._selector = s, this._triggerArray.push(e))
            }
            this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
        }

        static get Default() {
            return rt
        }

        static get NAME() {
            return ot
        }

        toggle() {
            this._isShown() ? this.hide() : this.show()
        }

        show() {
            if (this._isTransitioning || this._isShown()) return;
            let t, e = [];
            if (this._config.parent) {
                const t = V.find(ut, this._config.parent);
                e = V.find(".collapse.show, .collapse.collapsing", this._config.parent).filter((e => !t.includes(e)))
            }
            const i = V.findOne(this._selector);
            if (e.length) {
                const n = e.find((t => i !== t));
                if (t = n ? pt.getInstance(n) : null, t && t._isTransitioning) return
            }
            if (j.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
            e.forEach((e => {
                i !== e && pt.getOrCreateInstance(e, {toggle: !1}).hide(), t || H.set(e, "bs.collapse", null)
            }));
            const n = this._getDimension();
            this._element.classList.remove(ct), this._element.classList.add(ht), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
            const s = `scroll${n[0].toUpperCase() + n.slice(1)}`;
            this._queueCallback((() => {
                this._isTransitioning = !1, this._element.classList.remove(ht), this._element.classList.add(ct, lt), this._element.style[n] = "", j.trigger(this._element, "shown.bs.collapse")
            }), this._element, !0), this._element.style[n] = `${this._element[s]}px`
        }

        hide() {
            if (this._isTransitioning || !this._isShown()) return;
            if (j.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
            const t = this._getDimension();
            this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`, u(this._element), this._element.classList.add(ht), this._element.classList.remove(ct, lt);
            const e = this._triggerArray.length;
            for (let t = 0; t < e; t++) {
                const e = this._triggerArray[t], i = n(e);
                i && !this._isShown(i) && this._addAriaAndCollapsedClass([e], !1)
            }
            this._isTransitioning = !0, this._element.style[t] = "", this._queueCallback((() => {
                this._isTransitioning = !1, this._element.classList.remove(ht), this._element.classList.add(ct), j.trigger(this._element, "hidden.bs.collapse")
            }), this._element, !0)
        }

        _isShown(t = this._element) {
            return t.classList.contains(lt)
        }

        _getConfig(t) {
            return (t = {...rt, ...U.getDataAttributes(this._element), ...t}).toggle = Boolean(t.toggle), t.parent = r(t.parent), a(ot, t, at), t
        }

        _getDimension() {
            return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
        }

        _initializeChildren() {
            if (!this._config.parent) return;
            const t = V.find(ut, this._config.parent);
            V.find(ft, this._config.parent).filter((e => !t.includes(e))).forEach((t => {
                const e = n(t);
                e && this._addAriaAndCollapsedClass([t], this._isShown(e))
            }))
        }

        _addAriaAndCollapsedClass(t, e) {
            t.length && t.forEach((t => {
                e ? t.classList.remove(dt) : t.classList.add(dt), t.setAttribute("aria-expanded", e)
            }))
        }

        static jQueryInterface(t) {
            return this.each((function () {
                const e = {};
                "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1);
                const i = pt.getOrCreateInstance(this, e);
                if ("string" == typeof t) {
                    if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                    i[t]()
                }
            }))
        }
    }

    j.on(document, "click.bs.collapse.data-api", ft, (function (t) {
        ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();
        const e = i(this);
        V.find(e).forEach((t => {
            pt.getOrCreateInstance(t, {toggle: !1}).toggle()
        }))
    })), g(pt);
    var mt = "top", gt = "bottom", _t = "right", bt = "left", vt = "auto", yt = [mt, gt, _t, bt], wt = "start",
        Et = "end", At = "clippingParents", Tt = "viewport", Ot = "popper", Ct = "reference",
        kt = yt.reduce((function (t, e) {
            return t.concat([e + "-" + wt, e + "-" + Et])
        }), []), Lt = [].concat(yt, [vt]).reduce((function (t, e) {
            return t.concat([e, e + "-" + wt, e + "-" + Et])
        }), []), xt = "beforeRead", Dt = "read", St = "afterRead", Nt = "beforeMain", It = "main", Pt = "afterMain",
        jt = "beforeWrite", Mt = "write", Ht = "afterWrite", Bt = [xt, Dt, St, Nt, It, Pt, jt, Mt, Ht];

    function Rt(t) {
        return t ? (t.nodeName || "").toLowerCase() : null
    }

    function Wt(t) {
        if (null == t) return window;
        if ("[object Window]" !== t.toString()) {
            var e = t.ownerDocument;
            return e && e.defaultView || window
        }
        return t
    }

    function $t(t) {
        return t instanceof Wt(t).Element || t instanceof Element
    }

    function zt(t) {
        return t instanceof Wt(t).HTMLElement || t instanceof HTMLElement
    }

    function qt(t) {
        return "undefined" != typeof ShadowRoot && (t instanceof Wt(t).ShadowRoot || t instanceof ShadowRoot)
    }

    const Ft = {
        name: "applyStyles", enabled: !0, phase: "write", fn: function (t) {
            var e = t.state;
            Object.keys(e.elements).forEach((function (t) {
                var i = e.styles[t] || {}, n = e.attributes[t] || {}, s = e.elements[t];
                zt(s) && Rt(s) && (Object.assign(s.style, i), Object.keys(n).forEach((function (t) {
                    var e = n[t];
                    !1 === e ? s.removeAttribute(t) : s.setAttribute(t, !0 === e ? "" : e)
                })))
            }))
        }, effect: function (t) {
            var e = t.state, i = {
                popper: {position: e.options.strategy, left: "0", top: "0", margin: "0"},
                arrow: {position: "absolute"},
                reference: {}
            };
            return Object.assign(e.elements.popper.style, i.popper), e.styles = i, e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow), function () {
                Object.keys(e.elements).forEach((function (t) {
                    var n = e.elements[t], s = e.attributes[t] || {},
                        o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]).reduce((function (t, e) {
                            return t[e] = "", t
                        }), {});
                    zt(n) && Rt(n) && (Object.assign(n.style, o), Object.keys(s).forEach((function (t) {
                        n.removeAttribute(t)
                    })))
                }))
            }
        }, requires: ["computeStyles"]
    };

    function Ut(t) {
        return t.split("-")[0]
    }

    function Vt(t, e) {
        var i = t.getBoundingClientRect();
        return {
            width: i.width / 1,
            height: i.height / 1,
            top: i.top / 1,
            right: i.right / 1,
            bottom: i.bottom / 1,
            left: i.left / 1,
            x: i.left / 1,
            y: i.top / 1
        }
    }

    function Kt(t) {
        var e = Vt(t), i = t.offsetWidth, n = t.offsetHeight;
        return Math.abs(e.width - i) <= 1 && (i = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
            x: t.offsetLeft,
            y: t.offsetTop,
            width: i,
            height: n
        }
    }

    function Xt(t, e) {
        var i = e.getRootNode && e.getRootNode();
        if (t.contains(e)) return !0;
        if (i && qt(i)) {
            var n = e;
            do {
                if (n && t.isSameNode(n)) return !0;
                n = n.parentNode || n.host
            } while (n)
        }
        return !1
    }

    function Yt(t) {
        return Wt(t).getComputedStyle(t)
    }

    function Qt(t) {
        return ["table", "td", "th"].indexOf(Rt(t)) >= 0
    }

    function Gt(t) {
        return (($t(t) ? t.ownerDocument : t.document) || window.document).documentElement
    }

    function Zt(t) {
        return "html" === Rt(t) ? t : t.assignedSlot || t.parentNode || (qt(t) ? t.host : null) || Gt(t)
    }

    function Jt(t) {
        return zt(t) && "fixed" !== Yt(t).position ? t.offsetParent : null
    }

    function te(t) {
        for (var e = Wt(t), i = Jt(t); i && Qt(i) && "static" === Yt(i).position;) i = Jt(i);
        return i && ("html" === Rt(i) || "body" === Rt(i) && "static" === Yt(i).position) ? e : i || function (t) {
            var e = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (-1 !== navigator.userAgent.indexOf("Trident") && zt(t) && "fixed" === Yt(t).position) return null;
            for (var i = Zt(t); zt(i) && ["html", "body"].indexOf(Rt(i)) < 0;) {
                var n = Yt(i);
                if ("none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || -1 !== ["transform", "perspective"].indexOf(n.willChange) || e && "filter" === n.willChange || e && n.filter && "none" !== n.filter) return i;
                i = i.parentNode
            }
            return null
        }(t) || e
    }

    function ee(t) {
        return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"
    }

    var ie = Math.max, ne = Math.min, se = Math.round;

    function oe(t, e, i) {
        return ie(t, ne(e, i))
    }

    function re(t) {
        return Object.assign({}, {top: 0, right: 0, bottom: 0, left: 0}, t)
    }

    function ae(t, e) {
        return e.reduce((function (e, i) {
            return e[i] = t, e
        }), {})
    }

    const le = {
        name: "arrow", enabled: !0, phase: "main", fn: function (t) {
            var e, i = t.state, n = t.name, s = t.options, o = i.elements.arrow, r = i.modifiersData.popperOffsets,
                a = Ut(i.placement), l = ee(a), c = [bt, _t].indexOf(a) >= 0 ? "height" : "width";
            if (o && r) {
                var h = function (t, e) {
                        return re("number" != typeof (t = "function" == typeof t ? t(Object.assign({}, e.rects, {placement: e.placement})) : t) ? t : ae(t, yt))
                    }(s.padding, i), d = Kt(o), u = "y" === l ? mt : bt, f = "y" === l ? gt : _t,
                    p = i.rects.reference[c] + i.rects.reference[l] - r[l] - i.rects.popper[c],
                    m = r[l] - i.rects.reference[l], g = te(o),
                    _ = g ? "y" === l ? g.clientHeight || 0 : g.clientWidth || 0 : 0, b = p / 2 - m / 2, v = h[u],
                    y = _ - d[c] - h[f], w = _ / 2 - d[c] / 2 + b, E = oe(v, w, y), A = l;
                i.modifiersData[n] = ((e = {})[A] = E, e.centerOffset = E - w, e)
            }
        }, effect: function (t) {
            var e = t.state, i = t.options.element, n = void 0 === i ? "[data-popper-arrow]" : i;
            null != n && ("string" != typeof n || (n = e.elements.popper.querySelector(n))) && Xt(e.elements.popper, n) && (e.elements.arrow = n)
        }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"]
    };

    function ce(t) {
        return t.split("-")[1]
    }

    var he = {top: "auto", right: "auto", bottom: "auto", left: "auto"};

    function de(t) {
        var e, i = t.popper, n = t.popperRect, s = t.placement, o = t.variation, r = t.offsets, a = t.position,
            l = t.gpuAcceleration, c = t.adaptive, h = t.roundOffsets, d = !0 === h ? function (t) {
                var e = t.x, i = t.y, n = window.devicePixelRatio || 1;
                return {x: se(se(e * n) / n) || 0, y: se(se(i * n) / n) || 0}
            }(r) : "function" == typeof h ? h(r) : r, u = d.x, f = void 0 === u ? 0 : u, p = d.y, m = void 0 === p ? 0 : p,
            g = r.hasOwnProperty("x"), _ = r.hasOwnProperty("y"), b = bt, v = mt, y = window;
        if (c) {
            var w = te(i), E = "clientHeight", A = "clientWidth";
            w === Wt(i) && "static" !== Yt(w = Gt(i)).position && "absolute" === a && (E = "scrollHeight", A = "scrollWidth"), w = w, s !== mt && (s !== bt && s !== _t || o !== Et) || (v = gt, m -= w[E] - n.height, m *= l ? 1 : -1), s !== bt && (s !== mt && s !== gt || o !== Et) || (b = _t, f -= w[A] - n.width, f *= l ? 1 : -1)
        }
        var T, O = Object.assign({position: a}, c && he);
        return l ? Object.assign({}, O, ((T = {})[v] = _ ? "0" : "", T[b] = g ? "0" : "", T.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + m + "px)" : "translate3d(" + f + "px, " + m + "px, 0)", T)) : Object.assign({}, O, ((e = {})[v] = _ ? m + "px" : "", e[b] = g ? f + "px" : "", e.transform = "", e))
    }

    const ue = {
        name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: function (t) {
            var e = t.state, i = t.options, n = i.gpuAcceleration, s = void 0 === n || n, o = i.adaptive,
                r = void 0 === o || o, a = i.roundOffsets, l = void 0 === a || a, c = {
                    placement: Ut(e.placement),
                    variation: ce(e.placement),
                    popper: e.elements.popper,
                    popperRect: e.rects.popper,
                    gpuAcceleration: s
                };
            null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, de(Object.assign({}, c, {
                offsets: e.modifiersData.popperOffsets,
                position: e.options.strategy,
                adaptive: r,
                roundOffsets: l
            })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, de(Object.assign({}, c, {
                offsets: e.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: l
            })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {"data-popper-placement": e.placement})
        }, data: {}
    };
    var fe = {passive: !0};
    const pe = {
        name: "eventListeners", enabled: !0, phase: "write", fn: function () {
        }, effect: function (t) {
            var e = t.state, i = t.instance, n = t.options, s = n.scroll, o = void 0 === s || s, r = n.resize,
                a = void 0 === r || r, l = Wt(e.elements.popper),
                c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
            return o && c.forEach((function (t) {
                t.addEventListener("scroll", i.update, fe)
            })), a && l.addEventListener("resize", i.update, fe), function () {
                o && c.forEach((function (t) {
                    t.removeEventListener("scroll", i.update, fe)
                })), a && l.removeEventListener("resize", i.update, fe)
            }
        }, data: {}
    };
    var me = {left: "right", right: "left", bottom: "top", top: "bottom"};

    function ge(t) {
        return t.replace(/left|right|bottom|top/g, (function (t) {
            return me[t]
        }))
    }

    var _e = {start: "end", end: "start"};

    function be(t) {
        return t.replace(/start|end/g, (function (t) {
            return _e[t]
        }))
    }

    function ve(t) {
        var e = Wt(t);
        return {scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset}
    }

    function ye(t) {
        return Vt(Gt(t)).left + ve(t).scrollLeft
    }

    function we(t) {
        var e = Yt(t), i = e.overflow, n = e.overflowX, s = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(i + s + n)
    }

    function Ee(t) {
        return ["html", "body", "#document"].indexOf(Rt(t)) >= 0 ? t.ownerDocument.body : zt(t) && we(t) ? t : Ee(Zt(t))
    }

    function Ae(t, e) {
        var i;
        void 0 === e && (e = []);
        var n = Ee(t), s = n === (null == (i = t.ownerDocument) ? void 0 : i.body), o = Wt(n),
            r = s ? [o].concat(o.visualViewport || [], we(n) ? n : []) : n, a = e.concat(r);
        return s ? a : a.concat(Ae(Zt(r)))
    }

    function Te(t) {
        return Object.assign({}, t, {left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height})
    }

    function Oe(t, e) {
        return e === Tt ? Te(function (t) {
            var e = Wt(t), i = Gt(t), n = e.visualViewport, s = i.clientWidth, o = i.clientHeight, r = 0, a = 0;
            return n && (s = n.width, o = n.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (r = n.offsetLeft, a = n.offsetTop)), {
                width: s,
                height: o,
                x: r + ye(t),
                y: a
            }
        }(t)) : zt(e) ? function (t) {
            var e = Vt(t);
            return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e
        }(e) : Te(function (t) {
            var e, i = Gt(t), n = ve(t), s = null == (e = t.ownerDocument) ? void 0 : e.body,
                o = ie(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0),
                r = ie(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0),
                a = -n.scrollLeft + ye(t), l = -n.scrollTop;
            return "rtl" === Yt(s || i).direction && (a += ie(i.clientWidth, s ? s.clientWidth : 0) - o), {
                width: o,
                height: r,
                x: a,
                y: l
            }
        }(Gt(t)))
    }

    function Ce(t) {
        var e, i = t.reference, n = t.element, s = t.placement, o = s ? Ut(s) : null, r = s ? ce(s) : null,
            a = i.x + i.width / 2 - n.width / 2, l = i.y + i.height / 2 - n.height / 2;
        switch (o) {
            case mt:
                e = {x: a, y: i.y - n.height};
                break;
            case gt:
                e = {x: a, y: i.y + i.height};
                break;
            case _t:
                e = {x: i.x + i.width, y: l};
                break;
            case bt:
                e = {x: i.x - n.width, y: l};
                break;
            default:
                e = {x: i.x, y: i.y}
        }
        var c = o ? ee(o) : null;
        if (null != c) {
            var h = "y" === c ? "height" : "width";
            switch (r) {
                case wt:
                    e[c] = e[c] - (i[h] / 2 - n[h] / 2);
                    break;
                case Et:
                    e[c] = e[c] + (i[h] / 2 - n[h] / 2)
            }
        }
        return e
    }

    function ke(t, e) {
        void 0 === e && (e = {});
        var i = e, n = i.placement, s = void 0 === n ? t.placement : n, o = i.boundary, r = void 0 === o ? At : o,
            a = i.rootBoundary, l = void 0 === a ? Tt : a, c = i.elementContext, h = void 0 === c ? Ot : c,
            d = i.altBoundary, u = void 0 !== d && d, f = i.padding, p = void 0 === f ? 0 : f,
            m = re("number" != typeof p ? p : ae(p, yt)), g = h === Ot ? Ct : Ot, _ = t.rects.popper,
            b = t.elements[u ? g : h], v = function (t, e, i) {
                var n = "clippingParents" === e ? function (t) {
                    var e = Ae(Zt(t)), i = ["absolute", "fixed"].indexOf(Yt(t).position) >= 0 && zt(t) ? te(t) : t;
                    return $t(i) ? e.filter((function (t) {
                        return $t(t) && Xt(t, i) && "body" !== Rt(t)
                    })) : []
                }(t) : [].concat(e), s = [].concat(n, [i]), o = s[0], r = s.reduce((function (e, i) {
                    var n = Oe(t, i);
                    return e.top = ie(n.top, e.top), e.right = ne(n.right, e.right), e.bottom = ne(n.bottom, e.bottom), e.left = ie(n.left, e.left), e
                }), Oe(t, o));
                return r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r
            }($t(b) ? b : b.contextElement || Gt(t.elements.popper), r, l), y = Vt(t.elements.reference),
            w = Ce({reference: y, element: _, strategy: "absolute", placement: s}), E = Te(Object.assign({}, _, w)),
            A = h === Ot ? E : y, T = {
                top: v.top - A.top + m.top,
                bottom: A.bottom - v.bottom + m.bottom,
                left: v.left - A.left + m.left,
                right: A.right - v.right + m.right
            }, O = t.modifiersData.offset;
        if (h === Ot && O) {
            var C = O[s];
            Object.keys(T).forEach((function (t) {
                var e = [_t, gt].indexOf(t) >= 0 ? 1 : -1, i = [mt, gt].indexOf(t) >= 0 ? "y" : "x";
                T[t] += C[i] * e
            }))
        }
        return T
    }

    function Le(t, e) {
        void 0 === e && (e = {});
        var i = e, n = i.placement, s = i.boundary, o = i.rootBoundary, r = i.padding, a = i.flipVariations,
            l = i.allowedAutoPlacements, c = void 0 === l ? Lt : l, h = ce(n),
            d = h ? a ? kt : kt.filter((function (t) {
                return ce(t) === h
            })) : yt, u = d.filter((function (t) {
                return c.indexOf(t) >= 0
            }));
        0 === u.length && (u = d);
        var f = u.reduce((function (e, i) {
            return e[i] = ke(t, {placement: i, boundary: s, rootBoundary: o, padding: r})[Ut(i)], e
        }), {});
        return Object.keys(f).sort((function (t, e) {
            return f[t] - f[e]
        }))
    }

    const xe = {
        name: "flip", enabled: !0, phase: "main", fn: function (t) {
            var e = t.state, i = t.options, n = t.name;
            if (!e.modifiersData[n]._skip) {
                for (var s = i.mainAxis, o = void 0 === s || s, r = i.altAxis, a = void 0 === r || r, l = i.fallbackPlacements, c = i.padding, h = i.boundary, d = i.rootBoundary, u = i.altBoundary, f = i.flipVariations, p = void 0 === f || f, m = i.allowedAutoPlacements, g = e.options.placement, _ = Ut(g), b = l || (_ !== g && p ? function (t) {
                    if (Ut(t) === vt) return [];
                    var e = ge(t);
                    return [be(t), e, be(e)]
                }(g) : [ge(g)]), v = [g].concat(b).reduce((function (t, i) {
                    return t.concat(Ut(i) === vt ? Le(e, {
                        placement: i,
                        boundary: h,
                        rootBoundary: d,
                        padding: c,
                        flipVariations: p,
                        allowedAutoPlacements: m
                    }) : i)
                }), []), y = e.rects.reference, w = e.rects.popper, E = new Map, A = !0, T = v[0], O = 0; O < v.length; O++) {
                    var C = v[O], k = Ut(C), L = ce(C) === wt, x = [mt, gt].indexOf(k) >= 0, D = x ? "width" : "height",
                        S = ke(e, {placement: C, boundary: h, rootBoundary: d, altBoundary: u, padding: c}),
                        N = x ? L ? _t : bt : L ? gt : mt;
                    y[D] > w[D] && (N = ge(N));
                    var I = ge(N), P = [];
                    if (o && P.push(S[k] <= 0), a && P.push(S[N] <= 0, S[I] <= 0), P.every((function (t) {
                        return t
                    }))) {
                        T = C, A = !1;
                        break
                    }
                    E.set(C, P)
                }
                if (A) for (var j = function (t) {
                    var e = v.find((function (e) {
                        var i = E.get(e);
                        if (i) return i.slice(0, t).every((function (t) {
                            return t
                        }))
                    }));
                    if (e) return T = e, "break"
                }, M = p ? 3 : 1; M > 0 && "break" !== j(M); M--) ;
                e.placement !== T && (e.modifiersData[n]._skip = !0, e.placement = T, e.reset = !0)
            }
        }, requiresIfExists: ["offset"], data: {_skip: !1}
    };

    function De(t, e, i) {
        return void 0 === i && (i = {x: 0, y: 0}), {
            top: t.top - e.height - i.y,
            right: t.right - e.width + i.x,
            bottom: t.bottom - e.height + i.y,
            left: t.left - e.width - i.x
        }
    }

    function Se(t) {
        return [mt, _t, gt, bt].some((function (e) {
            return t[e] >= 0
        }))
    }

    const Ne = {
        name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: function (t) {
            var e = t.state, i = t.name, n = e.rects.reference, s = e.rects.popper, o = e.modifiersData.preventOverflow,
                r = ke(e, {elementContext: "reference"}), a = ke(e, {altBoundary: !0}), l = De(r, n), c = De(a, s, o),
                h = Se(l), d = Se(c);
            e.modifiersData[i] = {
                referenceClippingOffsets: l,
                popperEscapeOffsets: c,
                isReferenceHidden: h,
                hasPopperEscaped: d
            }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
                "data-popper-reference-hidden": h,
                "data-popper-escaped": d
            })
        }
    }, Ie = {
        name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: function (t) {
            var e = t.state, i = t.options, n = t.name, s = i.offset, o = void 0 === s ? [0, 0] : s,
                r = Lt.reduce((function (t, i) {
                    return t[i] = function (t, e, i) {
                        var n = Ut(t), s = [bt, mt].indexOf(n) >= 0 ? -1 : 1,
                            o = "function" == typeof i ? i(Object.assign({}, e, {placement: t})) : i, r = o[0],
                            a = o[1];
                        return r = r || 0, a = (a || 0) * s, [bt, _t].indexOf(n) >= 0 ? {x: a, y: r} : {x: r, y: a}
                    }(i, e.rects, o), t
                }), {}), a = r[e.placement], l = a.x, c = a.y;
            null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[n] = r
        }
    }, Pe = {
        name: "popperOffsets", enabled: !0, phase: "read", fn: function (t) {
            var e = t.state, i = t.name;
            e.modifiersData[i] = Ce({
                reference: e.rects.reference,
                element: e.rects.popper,
                strategy: "absolute",
                placement: e.placement
            })
        }, data: {}
    }, je = {
        name: "preventOverflow", enabled: !0, phase: "main", fn: function (t) {
            var e = t.state, i = t.options, n = t.name, s = i.mainAxis, o = void 0 === s || s, r = i.altAxis,
                a = void 0 !== r && r, l = i.boundary, c = i.rootBoundary, h = i.altBoundary, d = i.padding,
                u = i.tether, f = void 0 === u || u, p = i.tetherOffset, m = void 0 === p ? 0 : p,
                g = ke(e, {boundary: l, rootBoundary: c, padding: d, altBoundary: h}), _ = Ut(e.placement),
                b = ce(e.placement), v = !b, y = ee(_), w = "x" === y ? "y" : "x", E = e.modifiersData.popperOffsets,
                A = e.rects.reference, T = e.rects.popper,
                O = "function" == typeof m ? m(Object.assign({}, e.rects, {placement: e.placement})) : m,
                C = {x: 0, y: 0};
            if (E) {
                if (o || a) {
                    var k = "y" === y ? mt : bt, L = "y" === y ? gt : _t, x = "y" === y ? "height" : "width", D = E[y],
                        S = E[y] + g[k], N = E[y] - g[L], I = f ? -T[x] / 2 : 0, P = b === wt ? A[x] : T[x],
                        j = b === wt ? -T[x] : -A[x], M = e.elements.arrow, H = f && M ? Kt(M) : {width: 0, height: 0},
                        B = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }, R = B[k], W = B[L], $ = oe(0, A[x], H[x]), z = v ? A[x] / 2 - I - $ - R - O : P - $ - R - O,
                        q = v ? -A[x] / 2 + I + $ + W + O : j + $ + W + O, F = e.elements.arrow && te(e.elements.arrow),
                        U = F ? "y" === y ? F.clientTop || 0 : F.clientLeft || 0 : 0,
                        V = e.modifiersData.offset ? e.modifiersData.offset[e.placement][y] : 0, K = E[y] + z - V - U,
                        X = E[y] + q - V;
                    if (o) {
                        var Y = oe(f ? ne(S, K) : S, D, f ? ie(N, X) : N);
                        E[y] = Y, C[y] = Y - D
                    }
                    if (a) {
                        var Q = "x" === y ? mt : bt, G = "x" === y ? gt : _t, Z = E[w], J = Z + g[Q], tt = Z - g[G],
                            et = oe(f ? ne(J, K) : J, Z, f ? ie(tt, X) : tt);
                        E[w] = et, C[w] = et - Z
                    }
                }
                e.modifiersData[n] = C
            }
        }, requiresIfExists: ["offset"]
    };

    function Me(t, e, i) {
        void 0 === i && (i = !1);
        var n = zt(e);
        zt(e) && function (t) {
            var e = t.getBoundingClientRect();
            e.width, t.offsetWidth, e.height, t.offsetHeight
        }(e);
        var s, o, r = Gt(e), a = Vt(t), l = {scrollLeft: 0, scrollTop: 0}, c = {x: 0, y: 0};
        return (n || !n && !i) && (("body" !== Rt(e) || we(r)) && (l = (s = e) !== Wt(s) && zt(s) ? {
            scrollLeft: (o = s).scrollLeft,
            scrollTop: o.scrollTop
        } : ve(s)), zt(e) ? ((c = Vt(e)).x += e.clientLeft, c.y += e.clientTop) : r && (c.x = ye(r))), {
            x: a.left + l.scrollLeft - c.x,
            y: a.top + l.scrollTop - c.y,
            width: a.width,
            height: a.height
        }
    }

    function He(t) {
        var e = new Map, i = new Set, n = [];

        function s(t) {
            i.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach((function (t) {
                if (!i.has(t)) {
                    var n = e.get(t);
                    n && s(n)
                }
            })), n.push(t)
        }

        return t.forEach((function (t) {
            e.set(t.name, t)
        })), t.forEach((function (t) {
            i.has(t.name) || s(t)
        })), n
    }

    var Be = {placement: "bottom", modifiers: [], strategy: "absolute"};

    function Re() {
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
        return !e.some((function (t) {
            return !(t && "function" == typeof t.getBoundingClientRect)
        }))
    }

    function We(t) {
        void 0 === t && (t = {});
        var e = t, i = e.defaultModifiers, n = void 0 === i ? [] : i, s = e.defaultOptions, o = void 0 === s ? Be : s;
        return function (t, e, i) {
            void 0 === i && (i = o);
            var s, r, a = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, Be, o),
                modifiersData: {},
                elements: {reference: t, popper: e},
                attributes: {},
                styles: {}
            }, l = [], c = !1, h = {
                state: a, setOptions: function (i) {
                    var s = "function" == typeof i ? i(a.options) : i;
                    d(), a.options = Object.assign({}, o, a.options, s), a.scrollParents = {
                        reference: $t(t) ? Ae(t) : t.contextElement ? Ae(t.contextElement) : [],
                        popper: Ae(e)
                    };
                    var r, c, u = function (t) {
                        var e = He(t);
                        return Bt.reduce((function (t, i) {
                            return t.concat(e.filter((function (t) {
                                return t.phase === i
                            })))
                        }), [])
                    }((r = [].concat(n, a.options.modifiers), c = r.reduce((function (t, e) {
                        var i = t[e.name];
                        return t[e.name] = i ? Object.assign({}, i, e, {
                            options: Object.assign({}, i.options, e.options),
                            data: Object.assign({}, i.data, e.data)
                        }) : e, t
                    }), {}), Object.keys(c).map((function (t) {
                        return c[t]
                    }))));
                    return a.orderedModifiers = u.filter((function (t) {
                        return t.enabled
                    })), a.orderedModifiers.forEach((function (t) {
                        var e = t.name, i = t.options, n = void 0 === i ? {} : i, s = t.effect;
                        if ("function" == typeof s) {
                            var o = s({state: a, name: e, instance: h, options: n});
                            l.push(o || function () {
                            })
                        }
                    })), h.update()
                }, forceUpdate: function () {
                    if (!c) {
                        var t = a.elements, e = t.reference, i = t.popper;
                        if (Re(e, i)) {
                            a.rects = {
                                reference: Me(e, te(i), "fixed" === a.options.strategy),
                                popper: Kt(i)
                            }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach((function (t) {
                                return a.modifiersData[t.name] = Object.assign({}, t.data)
                            }));
                            for (var n = 0; n < a.orderedModifiers.length; n++) if (!0 !== a.reset) {
                                var s = a.orderedModifiers[n], o = s.fn, r = s.options, l = void 0 === r ? {} : r,
                                    d = s.name;
                                "function" == typeof o && (a = o({state: a, options: l, name: d, instance: h}) || a)
                            } else a.reset = !1, n = -1
                        }
                    }
                }, update: (s = function () {
                    return new Promise((function (t) {
                        h.forceUpdate(), t(a)
                    }))
                }, function () {
                    return r || (r = new Promise((function (t) {
                        Promise.resolve().then((function () {
                            r = void 0, t(s())
                        }))
                    }))), r
                }), destroy: function () {
                    d(), c = !0
                }
            };
            if (!Re(t, e)) return h;

            function d() {
                l.forEach((function (t) {
                    return t()
                })), l = []
            }

            return h.setOptions(i).then((function (t) {
                !c && i.onFirstUpdate && i.onFirstUpdate(t)
            })), h
        }
    }

    var $e = We(), ze = We({defaultModifiers: [pe, Pe, ue, Ft]}),
        qe = We({defaultModifiers: [pe, Pe, ue, Ft, Ie, xe, je, le, Ne]});
    const Fe = Object.freeze({
            __proto__: null,
            popperGenerator: We,
            detectOverflow: ke,
            createPopperBase: $e,
            createPopper: qe,
            createPopperLite: ze,
            top: mt,
            bottom: gt,
            right: _t,
            left: bt,
            auto: vt,
            basePlacements: yt,
            start: wt,
            end: Et,
            clippingParents: At,
            viewport: Tt,
            popper: Ot,
            reference: Ct,
            variationPlacements: kt,
            placements: Lt,
            beforeRead: xt,
            read: Dt,
            afterRead: St,
            beforeMain: Nt,
            main: It,
            afterMain: Pt,
            beforeWrite: jt,
            write: Mt,
            afterWrite: Ht,
            modifierPhases: Bt,
            applyStyles: Ft,
            arrow: le,
            computeStyles: ue,
            eventListeners: pe,
            flip: xe,
            hide: Ne,
            offset: Ie,
            popperOffsets: Pe,
            preventOverflow: je
        }), Ue = "dropdown", Ve = "Escape", Ke = "Space", Xe = "ArrowUp", Ye = "ArrowDown",
        Qe = new RegExp("ArrowUp|ArrowDown|Escape"), Ge = "click.bs.dropdown.data-api",
        Ze = "keydown.bs.dropdown.data-api", Je = "show", ti = '[data-bs-toggle="dropdown"]', ei = ".dropdown-menu",
        ii = m() ? "top-end" : "top-start", ni = m() ? "top-start" : "top-end",
        si = m() ? "bottom-end" : "bottom-start", oi = m() ? "bottom-start" : "bottom-end",
        ri = m() ? "left-start" : "right-start", ai = m() ? "right-start" : "left-start", li = {
            offset: [0, 2],
            boundary: "clippingParents",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null,
            autoClose: !0
        }, ci = {
            offset: "(array|string|function)",
            boundary: "(string|element)",
            reference: "(string|element|object)",
            display: "string",
            popperConfig: "(null|object|function)",
            autoClose: "(boolean|string)"
        };

    class hi extends B {
        constructor(t, e) {
            super(t), this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar()
        }

        static get Default() {
            return li
        }

        static get DefaultType() {
            return ci
        }

        static get NAME() {
            return Ue
        }

        toggle() {
            return this._isShown() ? this.hide() : this.show()
        }

        show() {
            if (c(this._element) || this._isShown(this._menu)) return;
            const t = {relatedTarget: this._element};
            if (j.trigger(this._element, "show.bs.dropdown", t).defaultPrevented) return;
            const e = hi.getParentFromElement(this._element);
            this._inNavbar ? U.setDataAttribute(this._menu, "popper", "none") : this._createPopper(e), "ontouchstart" in document.documentElement && !e.closest(".navbar-nav") && [].concat(...document.body.children).forEach((t => j.on(t, "mouseover", d))), this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Je), this._element.classList.add(Je), j.trigger(this._element, "shown.bs.dropdown", t)
        }

        hide() {
            if (c(this._element) || !this._isShown(this._menu)) return;
            const t = {relatedTarget: this._element};
            this._completeHide(t)
        }

        dispose() {
            this._popper && this._popper.destroy(), super.dispose()
        }

        update() {
            this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
        }

        _completeHide(t) {
            j.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented || ("ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((t => j.off(t, "mouseover", d))), this._popper && this._popper.destroy(), this._menu.classList.remove(Je), this._element.classList.remove(Je), this._element.setAttribute("aria-expanded", "false"), U.removeDataAttribute(this._menu, "popper"), j.trigger(this._element, "hidden.bs.dropdown", t))
        }

        _getConfig(t) {
            if (t = {...this.constructor.Default, ...U.getDataAttributes(this._element), ...t}, a(Ue, t, this.constructor.DefaultType), "object" == typeof t.reference && !o(t.reference) && "function" != typeof t.reference.getBoundingClientRect) throw new TypeError(`${Ue.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            return t
        }

        _createPopper(t) {
            if (void 0 === Fe) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            let e = this._element;
            "parent" === this._config.reference ? e = t : o(this._config.reference) ? e = r(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
            const i = this._getPopperConfig(),
                n = i.modifiers.find((t => "applyStyles" === t.name && !1 === t.enabled));
            this._popper = qe(e, this._menu, i), n && U.setDataAttribute(this._menu, "popper", "static")
        }

        _isShown(t = this._element) {
            return t.classList.contains(Je)
        }

        _getMenuElement() {
            return V.next(this._element, ei)[0]
        }

        _getPlacement() {
            const t = this._element.parentNode;
            if (t.classList.contains("dropend")) return ri;
            if (t.classList.contains("dropstart")) return ai;
            const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return t.classList.contains("dropup") ? e ? ni : ii : e ? oi : si
        }

        _detectNavbar() {
            return null !== this._element.closest(".navbar")
        }

        _getOffset() {
            const {offset: t} = this._config;
            return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t
        }

        _getPopperConfig() {
            const t = {
                placement: this._getPlacement(),
                modifiers: [{name: "preventOverflow", options: {boundary: this._config.boundary}}, {
                    name: "offset",
                    options: {offset: this._getOffset()}
                }]
            };
            return "static" === this._config.display && (t.modifiers = [{
                name: "applyStyles",
                enabled: !1
            }]), {...t, ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig}
        }

        _selectMenuItem({key: t, target: e}) {
            const i = V.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(l);
            i.length && v(i, e, t === Ye, !i.includes(e)).focus()
        }

        static jQueryInterface(t) {
            return this.each((function () {
                const e = hi.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }

        static clearMenus(t) {
            if (t && (2 === t.button || "keyup" === t.type && "Tab" !== t.key)) return;
            const e = V.find(ti);
            for (let i = 0, n = e.length; i < n; i++) {
                const n = hi.getInstance(e[i]);
                if (!n || !1 === n._config.autoClose) continue;
                if (!n._isShown()) continue;
                const s = {relatedTarget: n._element};
                if (t) {
                    const e = t.composedPath(), i = e.includes(n._menu);
                    if (e.includes(n._element) || "inside" === n._config.autoClose && !i || "outside" === n._config.autoClose && i) continue;
                    if (n._menu.contains(t.target) && ("keyup" === t.type && "Tab" === t.key || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
                    "click" === t.type && (s.clickEvent = t)
                }
                n._completeHide(s)
            }
        }

        static getParentFromElement(t) {
            return n(t) || t.parentNode
        }

        static dataApiKeydownHandler(t) {
            if (/input|textarea/i.test(t.target.tagName) ? t.key === Ke || t.key !== Ve && (t.key !== Ye && t.key !== Xe || t.target.closest(ei)) : !Qe.test(t.key)) return;
            const e = this.classList.contains(Je);
            if (!e && t.key === Ve) return;
            if (t.preventDefault(), t.stopPropagation(), c(this)) return;
            const i = this.matches(ti) ? this : V.prev(this, ti)[0], n = hi.getOrCreateInstance(i);
            if (t.key !== Ve) return t.key === Xe || t.key === Ye ? (e || n.show(), void n._selectMenuItem(t)) : void (e && t.key !== Ke || hi.clearMenus());
            n.hide()
        }
    }

    j.on(document, Ze, ti, hi.dataApiKeydownHandler), j.on(document, Ze, ei, hi.dataApiKeydownHandler), j.on(document, Ge, hi.clearMenus), j.on(document, "keyup.bs.dropdown.data-api", hi.clearMenus), j.on(document, Ge, ti, (function (t) {
        t.preventDefault(), hi.getOrCreateInstance(this).toggle()
    })), g(hi);
    const di = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", ui = ".sticky-top";

    class fi {
        constructor() {
            this._element = document.body
        }

        getWidth() {
            const t = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - t)
        }

        hide() {
            const t = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, "paddingRight", (e => e + t)), this._setElementAttributes(di, "paddingRight", (e => e + t)), this._setElementAttributes(ui, "marginRight", (e => e - t))
        }

        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
        }

        _setElementAttributes(t, e, i) {
            const n = this.getWidth();
            this._applyManipulationCallback(t, (t => {
                if (t !== this._element && window.innerWidth > t.clientWidth + n) return;
                this._saveInitialAttribute(t, e);
                const s = window.getComputedStyle(t)[e];
                t.style[e] = `${i(Number.parseFloat(s))}px`
            }))
        }

        reset() {
            this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, "paddingRight"), this._resetElementAttributes(di, "paddingRight"), this._resetElementAttributes(ui, "marginRight")
        }

        _saveInitialAttribute(t, e) {
            const i = t.style[e];
            i && U.setDataAttribute(t, e, i)
        }

        _resetElementAttributes(t, e) {
            this._applyManipulationCallback(t, (t => {
                const i = U.getDataAttribute(t, e);
                void 0 === i ? t.style.removeProperty(e) : (U.removeDataAttribute(t, e), t.style[e] = i)
            }))
        }

        _applyManipulationCallback(t, e) {
            o(t) ? e(t) : V.find(t, this._element).forEach(e)
        }

        isOverflowing() {
            return this.getWidth() > 0
        }
    }

    const pi = {className: "modal-backdrop", isVisible: !0, isAnimated: !1, rootElement: "body", clickCallback: null},
        mi = {
            className: "string",
            isVisible: "boolean",
            isAnimated: "boolean",
            rootElement: "(element|string)",
            clickCallback: "(function|null)"
        }, gi = "show", _i = "mousedown.bs.backdrop";

    class bi {
        constructor(t) {
            this._config = this._getConfig(t), this._isAppended = !1, this._element = null
        }

        show(t) {
            this._config.isVisible ? (this._append(), this._config.isAnimated && u(this._getElement()), this._getElement().classList.add(gi), this._emulateAnimation((() => {
                _(t)
            }))) : _(t)
        }

        hide(t) {
            this._config.isVisible ? (this._getElement().classList.remove(gi), this._emulateAnimation((() => {
                this.dispose(), _(t)
            }))) : _(t)
        }

        _getElement() {
            if (!this._element) {
                const t = document.createElement("div");
                t.className = this._config.className, this._config.isAnimated && t.classList.add("fade"), this._element = t
            }
            return this._element
        }

        _getConfig(t) {
            return (t = {...pi, ..."object" == typeof t ? t : {}}).rootElement = r(t.rootElement), a("backdrop", t, mi), t
        }

        _append() {
            this._isAppended || (this._config.rootElement.append(this._getElement()), j.on(this._getElement(), _i, (() => {
                _(this._config.clickCallback)
            })), this._isAppended = !0)
        }

        dispose() {
            this._isAppended && (j.off(this._element, _i), this._element.remove(), this._isAppended = !1)
        }

        _emulateAnimation(t) {
            b(t, this._getElement(), this._config.isAnimated)
        }
    }

    const vi = {trapElement: null, autofocus: !0}, yi = {trapElement: "element", autofocus: "boolean"},
        wi = ".bs.focustrap", Ei = "backward";

    class Ai {
        constructor(t) {
            this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null
        }

        activate() {
            const {trapElement: t, autofocus: e} = this._config;
            this._isActive || (e && t.focus(), j.off(document, wi), j.on(document, "focusin.bs.focustrap", (t => this._handleFocusin(t))), j.on(document, "keydown.tab.bs.focustrap", (t => this._handleKeydown(t))), this._isActive = !0)
        }

        deactivate() {
            this._isActive && (this._isActive = !1, j.off(document, wi))
        }

        _handleFocusin(t) {
            const {target: e} = t, {trapElement: i} = this._config;
            if (e === document || e === i || i.contains(e)) return;
            const n = V.focusableChildren(i);
            0 === n.length ? i.focus() : this._lastTabNavDirection === Ei ? n[n.length - 1].focus() : n[0].focus()
        }

        _handleKeydown(t) {
            "Tab" === t.key && (this._lastTabNavDirection = t.shiftKey ? Ei : "forward")
        }

        _getConfig(t) {
            return t = {...vi, ..."object" == typeof t ? t : {}}, a("focustrap", t, yi), t
        }
    }

    const Ti = "modal", Oi = "Escape", Ci = {backdrop: !0, keyboard: !0, focus: !0},
        ki = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean"}, Li = "hidden.bs.modal",
        xi = "show.bs.modal", Di = "resize.bs.modal", Si = "click.dismiss.bs.modal", Ni = "keydown.dismiss.bs.modal",
        Ii = "mousedown.dismiss.bs.modal", Pi = "modal-open", ji = "show", Mi = "modal-static";

    class Hi extends B {
        constructor(t, e) {
            super(t), this._config = this._getConfig(e), this._dialog = V.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollBar = new fi
        }

        static get Default() {
            return Ci
        }

        static get NAME() {
            return Ti
        }

        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }

        show(t) {
            this._isShown || this._isTransitioning || j.trigger(this._element, xi, {relatedTarget: t}).defaultPrevented || (this._isShown = !0, this._isAnimated() && (this._isTransitioning = !0), this._scrollBar.hide(), document.body.classList.add(Pi), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), j.on(this._dialog, Ii, (() => {
                j.one(this._element, "mouseup.dismiss.bs.modal", (t => {
                    t.target === this._element && (this._ignoreBackdropClick = !0)
                }))
            })), this._showBackdrop((() => this._showElement(t))))
        }

        hide() {
            if (!this._isShown || this._isTransitioning) return;
            if (j.trigger(this._element, "hide.bs.modal").defaultPrevented) return;
            this._isShown = !1;
            const t = this._isAnimated();
            t && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), this._focustrap.deactivate(), this._element.classList.remove(ji), j.off(this._element, Si), j.off(this._dialog, Ii), this._queueCallback((() => this._hideModal()), this._element, t)
        }

        dispose() {
            [window, this._dialog].forEach((t => j.off(t, ".bs.modal"))), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }

        handleUpdate() {
            this._adjustDialog()
        }

        _initializeBackDrop() {
            return new bi({isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated()})
        }

        _initializeFocusTrap() {
            return new Ai({trapElement: this._element})
        }

        _getConfig(t) {
            return t = {...Ci, ...U.getDataAttributes(this._element), ..."object" == typeof t ? t : {}}, a(Ti, t, ki), t
        }

        _showElement(t) {
            const e = this._isAnimated(), i = V.findOne(".modal-body", this._dialog);
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0, i && (i.scrollTop = 0), e && u(this._element), this._element.classList.add(ji), this._queueCallback((() => {
                this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, j.trigger(this._element, "shown.bs.modal", {relatedTarget: t})
            }), this._dialog, e)
        }

        _setEscapeEvent() {
            this._isShown ? j.on(this._element, Ni, (t => {
                this._config.keyboard && t.key === Oi ? (t.preventDefault(), this.hide()) : this._config.keyboard || t.key !== Oi || this._triggerBackdropTransition()
            })) : j.off(this._element, Ni)
        }

        _setResizeEvent() {
            this._isShown ? j.on(window, Di, (() => this._adjustDialog())) : j.off(window, Di)
        }

        _hideModal() {
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide((() => {
                document.body.classList.remove(Pi), this._resetAdjustments(), this._scrollBar.reset(), j.trigger(this._element, Li)
            }))
        }

        _showBackdrop(t) {
            j.on(this._element, Si, (t => {
                this._ignoreBackdropClick ? this._ignoreBackdropClick = !1 : t.target === t.currentTarget && (!0 === this._config.backdrop ? this.hide() : "static" === this._config.backdrop && this._triggerBackdropTransition())
            })), this._backdrop.show(t)
        }

        _isAnimated() {
            return this._element.classList.contains("fade")
        }

        _triggerBackdropTransition() {
            if (j.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
            const {classList: t, scrollHeight: e, style: i} = this._element,
                n = e > document.documentElement.clientHeight;
            !n && "hidden" === i.overflowY || t.contains(Mi) || (n || (i.overflowY = "hidden"), t.add(Mi), this._queueCallback((() => {
                t.remove(Mi), n || this._queueCallback((() => {
                    i.overflowY = ""
                }), this._dialog)
            }), this._dialog), this._element.focus())
        }

        _adjustDialog() {
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._scrollBar.getWidth(), i = e > 0;
            (!i && t && !m() || i && !t && m()) && (this._element.style.paddingLeft = `${e}px`), (i && !t && !m() || !i && t && m()) && (this._element.style.paddingRight = `${e}px`)
        }

        _resetAdjustments() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }

        static jQueryInterface(t, e) {
            return this.each((function () {
                const i = Hi.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                    i[t](e)
                }
            }))
        }
    }

    j.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function (t) {
        const e = n(this);
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), j.one(e, xi, (t => {
            t.defaultPrevented || j.one(e, Li, (() => {
                l(this) && this.focus()
            }))
        }));
        const i = V.findOne(".modal.show");
        i && Hi.getInstance(i).hide(), Hi.getOrCreateInstance(e).toggle(this)
    })), R(Hi), g(Hi);
    const Bi = "offcanvas", Ri = {backdrop: !0, keyboard: !0, scroll: !1},
        Wi = {backdrop: "boolean", keyboard: "boolean", scroll: "boolean"}, $i = "show", zi = ".offcanvas.show",
        qi = "hidden.bs.offcanvas";

    class Fi extends B {
        constructor(t, e) {
            super(t), this._config = this._getConfig(e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
        }

        static get NAME() {
            return Bi
        }

        static get Default() {
            return Ri
        }

        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }

        show(t) {
            this._isShown || j.trigger(this._element, "show.bs.offcanvas", {relatedTarget: t}).defaultPrevented || (this._isShown = !0, this._element.style.visibility = "visible", this._backdrop.show(), this._config.scroll || (new fi).hide(), this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add($i), this._queueCallback((() => {
                this._config.scroll || this._focustrap.activate(), j.trigger(this._element, "shown.bs.offcanvas", {relatedTarget: t})
            }), this._element, !0))
        }

        hide() {
            this._isShown && (j.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.remove($i), this._backdrop.hide(), this._queueCallback((() => {
                this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._element.style.visibility = "hidden", this._config.scroll || (new fi).reset(), j.trigger(this._element, qi)
            }), this._element, !0)))
        }

        dispose() {
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }

        _getConfig(t) {
            return t = {...Ri, ...U.getDataAttributes(this._element), ..."object" == typeof t ? t : {}}, a(Bi, t, Wi), t
        }

        _initializeBackDrop() {
            return new bi({
                className: "offcanvas-backdrop",
                isVisible: this._config.backdrop,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: () => this.hide()
            })
        }

        _initializeFocusTrap() {
            return new Ai({trapElement: this._element})
        }

        _addEventListeners() {
            j.on(this._element, "keydown.dismiss.bs.offcanvas", (t => {
                this._config.keyboard && "Escape" === t.key && this.hide()
            }))
        }

        static jQueryInterface(t) {
            return this.each((function () {
                const e = Fi.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }

    j.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function (t) {
        const e = n(this);
        if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), c(this)) return;
        j.one(e, qi, (() => {
            l(this) && this.focus()
        }));
        const i = V.findOne(zi);
        i && i !== e && Fi.getInstance(i).hide(), Fi.getOrCreateInstance(e).toggle(this)
    })), j.on(window, "load.bs.offcanvas.data-api", (() => V.find(zi).forEach((t => Fi.getOrCreateInstance(t).show())))), R(Fi), g(Fi);
    const Ui = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        Vi = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
        Ki = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
        Xi = (t, e) => {
            const i = t.nodeName.toLowerCase();
            if (e.includes(i)) return !Ui.has(i) || Boolean(Vi.test(t.nodeValue) || Ki.test(t.nodeValue));
            const n = e.filter((t => t instanceof RegExp));
            for (let t = 0, e = n.length; t < e; t++) if (n[t].test(i)) return !0;
            return !1
        };

    function Yi(t, e, i) {
        if (!t.length) return t;
        if (i && "function" == typeof i) return i(t);
        const n = (new window.DOMParser).parseFromString(t, "text/html"),
            s = [].concat(...n.body.querySelectorAll("*"));
        for (let t = 0, i = s.length; t < i; t++) {
            const i = s[t], n = i.nodeName.toLowerCase();
            if (!Object.keys(e).includes(n)) {
                i.remove();
                continue
            }
            const o = [].concat(...i.attributes), r = [].concat(e["*"] || [], e[n] || []);
            o.forEach((t => {
                Xi(t, r) || i.removeAttribute(t.nodeName)
            }))
        }
        return n.body.innerHTML
    }

    const Qi = "tooltip", Gi = new Set(["sanitize", "allowList", "sanitizeFn"]), Zi = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(array|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacements: "array",
            boundary: "(string|element)",
            customClass: "(string|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            allowList: "object",
            popperConfig: "(null|object|function)"
        }, Ji = {AUTO: "auto", TOP: "top", RIGHT: m() ? "left" : "right", BOTTOM: "bottom", LEFT: m() ? "right" : "left"},
        tn = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: [0, 0],
            container: !1,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            boundary: "clippingParents",
            customClass: "",
            sanitize: !0,
            sanitizeFn: null,
            allowList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "srcset", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            },
            popperConfig: null
        }, en = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        }, nn = "fade", sn = "show", on = "show", rn = "out", an = ".tooltip-inner", ln = ".modal", cn = "hide.bs.modal",
        hn = "hover", dn = "focus";

    class un extends B {
        constructor(t, e) {
            if (void 0 === Fe) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(t), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this._config = this._getConfig(e), this.tip = null, this._setListeners()
        }

        static get Default() {
            return tn
        }

        static get NAME() {
            return Qi
        }

        static get Event() {
            return en
        }

        static get DefaultType() {
            return Zi
        }

        enable() {
            this._isEnabled = !0
        }

        disable() {
            this._isEnabled = !1
        }

        toggleEnabled() {
            this._isEnabled = !this._isEnabled
        }

        toggle(t) {
            if (this._isEnabled) if (t) {
                const e = this._initializeOnDelegatedTarget(t);
                e._activeTrigger.click = !e._activeTrigger.click, e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e)
            } else {
                if (this.getTipElement().classList.contains(sn)) return void this._leave(null, this);
                this._enter(null, this)
            }
        }

        dispose() {
            clearTimeout(this._timeout), j.off(this._element.closest(ln), cn, this._hideModalHandler), this.tip && this.tip.remove(), this._disposePopper(), super.dispose()
        }

        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this.isWithContent() || !this._isEnabled) return;
            const t = j.trigger(this._element, this.constructor.Event.SHOW), e = h(this._element),
                i = null === e ? this._element.ownerDocument.documentElement.contains(this._element) : e.contains(this._element);
            if (t.defaultPrevented || !i) return;
            "tooltip" === this.constructor.NAME && this.tip && this.getTitle() !== this.tip.querySelector(an).innerHTML && (this._disposePopper(), this.tip.remove(), this.tip = null);
            const n = this.getTipElement(), s = (t => {
                do {
                    t += Math.floor(1e6 * Math.random())
                } while (document.getElementById(t));
                return t
            })(this.constructor.NAME);
            n.setAttribute("id", s), this._element.setAttribute("aria-describedby", s), this._config.animation && n.classList.add(nn);
            const o = "function" == typeof this._config.placement ? this._config.placement.call(this, n, this._element) : this._config.placement,
                r = this._getAttachment(o);
            this._addAttachmentClass(r);
            const {container: a} = this._config;
            H.set(n, this.constructor.DATA_KEY, this), this._element.ownerDocument.documentElement.contains(this.tip) || (a.append(n), j.trigger(this._element, this.constructor.Event.INSERTED)), this._popper ? this._popper.update() : this._popper = qe(this._element, n, this._getPopperConfig(r)), n.classList.add(sn);
            const l = this._resolvePossibleFunction(this._config.customClass);
            l && n.classList.add(...l.split(" ")), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((t => {
                j.on(t, "mouseover", d)
            }));
            const c = this.tip.classList.contains(nn);
            this._queueCallback((() => {
                const t = this._hoverState;
                this._hoverState = null, j.trigger(this._element, this.constructor.Event.SHOWN), t === rn && this._leave(null, this)
            }), this.tip, c)
        }

        hide() {
            if (!this._popper) return;
            const t = this.getTipElement();
            if (j.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented) return;
            t.classList.remove(sn), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((t => j.off(t, "mouseover", d))), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1;
            const e = this.tip.classList.contains(nn);
            this._queueCallback((() => {
                this._isWithActiveTrigger() || (this._hoverState !== on && t.remove(), this._cleanTipClass(), this._element.removeAttribute("aria-describedby"), j.trigger(this._element, this.constructor.Event.HIDDEN), this._disposePopper())
            }), this.tip, e), this._hoverState = ""
        }

        update() {
            null !== this._popper && this._popper.update()
        }

        isWithContent() {
            return Boolean(this.getTitle())
        }

        getTipElement() {
            if (this.tip) return this.tip;
            const t = document.createElement("div");
            t.innerHTML = this._config.template;
            const e = t.children[0];
            return this.setContent(e), e.classList.remove(nn, sn), this.tip = e, this.tip
        }

        setContent(t) {
            this._sanitizeAndSetContent(t, this.getTitle(), an)
        }

        _sanitizeAndSetContent(t, e, i) {
            const n = V.findOne(i, t);
            e || !n ? this.setElementContent(n, e) : n.remove()
        }

        setElementContent(t, e) {
            if (null !== t) return o(e) ? (e = r(e), void (this._config.html ? e.parentNode !== t && (t.innerHTML = "", t.append(e)) : t.textContent = e.textContent)) : void (this._config.html ? (this._config.sanitize && (e = Yi(e, this._config.allowList, this._config.sanitizeFn)), t.innerHTML = e) : t.textContent = e)
        }

        getTitle() {
            const t = this._element.getAttribute("data-bs-original-title") || this._config.title;
            return this._resolvePossibleFunction(t)
        }

        updateAttachment(t) {
            return "right" === t ? "end" : "left" === t ? "start" : t
        }

        _initializeOnDelegatedTarget(t, e) {
            return e || this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig())
        }

        _getOffset() {
            const {offset: t} = this._config;
            return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t
        }

        _resolvePossibleFunction(t) {
            return "function" == typeof t ? t.call(this._element) : t
        }

        _getPopperConfig(t) {
            const e = {
                placement: t,
                modifiers: [{
                    name: "flip",
                    options: {fallbackPlacements: this._config.fallbackPlacements}
                }, {name: "offset", options: {offset: this._getOffset()}}, {
                    name: "preventOverflow",
                    options: {boundary: this._config.boundary}
                }, {name: "arrow", options: {element: `.${this.constructor.NAME}-arrow`}}, {
                    name: "onChange",
                    enabled: !0,
                    phase: "afterWrite",
                    fn: t => this._handlePopperPlacementChange(t)
                }],
                onFirstUpdate: t => {
                    t.options.placement !== t.placement && this._handlePopperPlacementChange(t)
                }
            };
            return {...e, ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig}
        }

        _addAttachmentClass(t) {
            this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(t)}`)
        }

        _getAttachment(t) {
            return Ji[t.toUpperCase()]
        }

        _setListeners() {
            this._config.trigger.split(" ").forEach((t => {
                if ("click" === t) j.on(this._element, this.constructor.Event.CLICK, this._config.selector, (t => this.toggle(t))); else if ("manual" !== t) {
                    const e = t === hn ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN,
                        i = t === hn ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
                    j.on(this._element, e, this._config.selector, (t => this._enter(t))), j.on(this._element, i, this._config.selector, (t => this._leave(t)))
                }
            })), this._hideModalHandler = () => {
                this._element && this.hide()
            }, j.on(this._element.closest(ln), cn, this._hideModalHandler), this._config.selector ? this._config = {
                ...this._config,
                trigger: "manual",
                selector: ""
            } : this._fixTitle()
        }

        _fixTitle() {
            const t = this._element.getAttribute("title"),
                e = typeof this._element.getAttribute("data-bs-original-title");
            (t || "string" !== e) && (this._element.setAttribute("data-bs-original-title", t || ""), !t || this._element.getAttribute("aria-label") || this._element.textContent || this._element.setAttribute("aria-label", t), this._element.setAttribute("title", ""))
        }

        _enter(t, e) {
            e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger["focusin" === t.type ? dn : hn] = !0), e.getTipElement().classList.contains(sn) || e._hoverState === on ? e._hoverState = on : (clearTimeout(e._timeout), e._hoverState = on, e._config.delay && e._config.delay.show ? e._timeout = setTimeout((() => {
                e._hoverState === on && e.show()
            }), e._config.delay.show) : e.show())
        }

        _leave(t, e) {
            e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger["focusout" === t.type ? dn : hn] = e._element.contains(t.relatedTarget)), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = rn, e._config.delay && e._config.delay.hide ? e._timeout = setTimeout((() => {
                e._hoverState === rn && e.hide()
            }), e._config.delay.hide) : e.hide())
        }

        _isWithActiveTrigger() {
            for (const t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
            return !1
        }

        _getConfig(t) {
            const e = U.getDataAttributes(this._element);
            return Object.keys(e).forEach((t => {
                Gi.has(t) && delete e[t]
            })), (t = {...this.constructor.Default, ...e, ..."object" == typeof t && t ? t : {}}).container = !1 === t.container ? document.body : r(t.container), "number" == typeof t.delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), a(Qi, t, this.constructor.DefaultType), t.sanitize && (t.template = Yi(t.template, t.allowList, t.sanitizeFn)), t
        }

        _getDelegateConfig() {
            const t = {};
            for (const e in this._config) this.constructor.Default[e] !== this._config[e] && (t[e] = this._config[e]);
            return t
        }

        _cleanTipClass() {
            const t = this.getTipElement(), e = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g"),
                i = t.getAttribute("class").match(e);
            null !== i && i.length > 0 && i.map((t => t.trim())).forEach((e => t.classList.remove(e)))
        }

        _getBasicClassPrefix() {
            return "bs-tooltip"
        }

        _handlePopperPlacementChange(t) {
            const {state: e} = t;
            e && (this.tip = e.elements.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(e.placement)))
        }

        _disposePopper() {
            this._popper && (this._popper.destroy(), this._popper = null)
        }

        static jQueryInterface(t) {
            return this.each((function () {
                const e = un.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }

    g(un);
    const fn = {
        ...un.Default,
        placement: "right",
        offset: [0, 8],
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }, pn = {...un.DefaultType, content: "(string|element|function)"}, mn = {
        HIDE: "hide.bs.popover",
        HIDDEN: "hidden.bs.popover",
        SHOW: "show.bs.popover",
        SHOWN: "shown.bs.popover",
        INSERTED: "inserted.bs.popover",
        CLICK: "click.bs.popover",
        FOCUSIN: "focusin.bs.popover",
        FOCUSOUT: "focusout.bs.popover",
        MOUSEENTER: "mouseenter.bs.popover",
        MOUSELEAVE: "mouseleave.bs.popover"
    };

    class gn extends un {
        static get Default() {
            return fn
        }

        static get NAME() {
            return "popover"
        }

        static get Event() {
            return mn
        }

        static get DefaultType() {
            return pn
        }

        isWithContent() {
            return this.getTitle() || this._getContent()
        }

        setContent(t) {
            this._sanitizeAndSetContent(t, this.getTitle(), ".popover-header"), this._sanitizeAndSetContent(t, this._getContent(), ".popover-body")
        }

        _getContent() {
            return this._resolvePossibleFunction(this._config.content)
        }

        _getBasicClassPrefix() {
            return "bs-popover"
        }

        static jQueryInterface(t) {
            return this.each((function () {
                const e = gn.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }

    g(gn);
    const _n = "scrollspy", bn = {offset: 10, method: "auto", target: ""},
        vn = {offset: "number", method: "string", target: "(string|element)"}, yn = "active",
        wn = ".nav-link, .list-group-item, .dropdown-item", En = "position";

    class An extends B {
        constructor(t, e) {
            super(t), this._scrollElement = "BODY" === this._element.tagName ? window : this._element, this._config = this._getConfig(e), this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, j.on(this._scrollElement, "scroll.bs.scrollspy", (() => this._process())), this.refresh(), this._process()
        }

        static get Default() {
            return bn
        }

        static get NAME() {
            return _n
        }

        refresh() {
            const t = this._scrollElement === this._scrollElement.window ? "offset" : En,
                e = "auto" === this._config.method ? t : this._config.method, n = e === En ? this._getScrollTop() : 0;
            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), V.find(wn, this._config.target).map((t => {
                const s = i(t), o = s ? V.findOne(s) : null;
                if (o) {
                    const t = o.getBoundingClientRect();
                    if (t.width || t.height) return [U[e](o).top + n, s]
                }
                return null
            })).filter((t => t)).sort(((t, e) => t[0] - e[0])).forEach((t => {
                this._offsets.push(t[0]), this._targets.push(t[1])
            }))
        }

        dispose() {
            j.off(this._scrollElement, ".bs.scrollspy"), super.dispose()
        }

        _getConfig(t) {
            return (t = {...bn, ...U.getDataAttributes(this._element), ..."object" == typeof t && t ? t : {}}).target = r(t.target) || document.documentElement, a(_n, t, vn), t
        }

        _getScrollTop() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
        }

        _getScrollHeight() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }

        _getOffsetHeight() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
        }

        _process() {
            const t = this._getScrollTop() + this._config.offset, e = this._getScrollHeight(),
                i = this._config.offset + e - this._getOffsetHeight();
            if (this._scrollHeight !== e && this.refresh(), t >= i) {
                const t = this._targets[this._targets.length - 1];
                this._activeTarget !== t && this._activate(t)
            } else {
                if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                for (let e = this._offsets.length; e--;) this._activeTarget !== this._targets[e] && t >= this._offsets[e] && (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) && this._activate(this._targets[e])
            }
        }

        _activate(t) {
            this._activeTarget = t, this._clear();
            const e = wn.split(",").map((e => `${e}[data-bs-target="${t}"],${e}[href="${t}"]`)),
                i = V.findOne(e.join(","), this._config.target);
            i.classList.add(yn), i.classList.contains("dropdown-item") ? V.findOne(".dropdown-toggle", i.closest(".dropdown")).classList.add(yn) : V.parents(i, ".nav, .list-group").forEach((t => {
                V.prev(t, ".nav-link, .list-group-item").forEach((t => t.classList.add(yn))), V.prev(t, ".nav-item").forEach((t => {
                    V.children(t, ".nav-link").forEach((t => t.classList.add(yn)))
                }))
            })), j.trigger(this._scrollElement, "activate.bs.scrollspy", {relatedTarget: t})
        }

        _clear() {
            V.find(wn, this._config.target).filter((t => t.classList.contains(yn))).forEach((t => t.classList.remove(yn)))
        }

        static jQueryInterface(t) {
            return this.each((function () {
                const e = An.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }

    j.on(window, "load.bs.scrollspy.data-api", (() => {
        V.find('[data-bs-spy="scroll"]').forEach((t => new An(t)))
    })), g(An);
    const Tn = "active", On = "fade", Cn = "show", kn = ".active", Ln = ":scope > li > .active";

    class xn extends B {
        static get NAME() {
            return "tab"
        }

        show() {
            if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(Tn)) return;
            let t;
            const e = n(this._element), i = this._element.closest(".nav, .list-group");
            if (i) {
                const e = "UL" === i.nodeName || "OL" === i.nodeName ? Ln : kn;
                t = V.find(e, i), t = t[t.length - 1]
            }
            const s = t ? j.trigger(t, "hide.bs.tab", {relatedTarget: this._element}) : null;
            if (j.trigger(this._element, "show.bs.tab", {relatedTarget: t}).defaultPrevented || null !== s && s.defaultPrevented) return;
            this._activate(this._element, i);
            const o = () => {
                j.trigger(t, "hidden.bs.tab", {relatedTarget: this._element}), j.trigger(this._element, "shown.bs.tab", {relatedTarget: t})
            };
            e ? this._activate(e, e.parentNode, o) : o()
        }

        _activate(t, e, i) {
            const n = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? V.children(e, kn) : V.find(Ln, e))[0],
                s = i && n && n.classList.contains(On), o = () => this._transitionComplete(t, n, i);
            n && s ? (n.classList.remove(Cn), this._queueCallback(o, t, !0)) : o()
        }

        _transitionComplete(t, e, i) {
            if (e) {
                e.classList.remove(Tn);
                const t = V.findOne(":scope > .dropdown-menu .active", e.parentNode);
                t && t.classList.remove(Tn), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
            }
            t.classList.add(Tn), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), u(t), t.classList.contains(On) && t.classList.add(Cn);
            let n = t.parentNode;
            if (n && "LI" === n.nodeName && (n = n.parentNode), n && n.classList.contains("dropdown-menu")) {
                const e = t.closest(".dropdown");
                e && V.find(".dropdown-toggle", e).forEach((t => t.classList.add(Tn))), t.setAttribute("aria-expanded", !0)
            }
            i && i()
        }

        static jQueryInterface(t) {
            return this.each((function () {
                const e = xn.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }

    j.on(document, "click.bs.tab.data-api", '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', (function (t) {
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), c(this) || xn.getOrCreateInstance(this).show()
    })), g(xn);
    const Dn = "toast", Sn = "hide", Nn = "show", In = "showing",
        Pn = {animation: "boolean", autohide: "boolean", delay: "number"},
        jn = {animation: !0, autohide: !0, delay: 5e3};

    class Mn extends B {
        constructor(t, e) {
            super(t), this._config = this._getConfig(e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
        }

        static get DefaultType() {
            return Pn
        }

        static get Default() {
            return jn
        }

        static get NAME() {
            return Dn
        }

        show() {
            j.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove(Sn), u(this._element), this._element.classList.add(Nn), this._element.classList.add(In), this._queueCallback((() => {
                this._element.classList.remove(In), j.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
            }), this._element, this._config.animation))
        }

        hide() {
            this._element.classList.contains(Nn) && (j.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.add(In), this._queueCallback((() => {
                this._element.classList.add(Sn), this._element.classList.remove(In), this._element.classList.remove(Nn), j.trigger(this._element, "hidden.bs.toast")
            }), this._element, this._config.animation)))
        }

        dispose() {
            this._clearTimeout(), this._element.classList.contains(Nn) && this._element.classList.remove(Nn), super.dispose()
        }

        _getConfig(t) {
            return t = {...jn, ...U.getDataAttributes(this._element), ..."object" == typeof t && t ? t : {}}, a(Dn, t, this.constructor.DefaultType), t
        }

        _maybeScheduleHide() {
            this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout((() => {
                this.hide()
            }), this._config.delay)))
        }

        _onInteraction(t, e) {
            switch (t.type) {
                case"mouseover":
                case"mouseout":
                    this._hasMouseInteraction = e;
                    break;
                case"focusin":
                case"focusout":
                    this._hasKeyboardInteraction = e
            }
            if (e) return void this._clearTimeout();
            const i = t.relatedTarget;
            this._element === i || this._element.contains(i) || this._maybeScheduleHide()
        }

        _setListeners() {
            j.on(this._element, "mouseover.bs.toast", (t => this._onInteraction(t, !0))), j.on(this._element, "mouseout.bs.toast", (t => this._onInteraction(t, !1))), j.on(this._element, "focusin.bs.toast", (t => this._onInteraction(t, !0))), j.on(this._element, "focusout.bs.toast", (t => this._onInteraction(t, !1)))
        }

        _clearTimeout() {
            clearTimeout(this._timeout), this._timeout = null
        }

        static jQueryInterface(t) {
            return this.each((function () {
                const e = Mn.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }

    return R(Mn), g(Mn), {
        Alert: W,
        Button: z,
        Carousel: st,
        Collapse: pt,
        Dropdown: hi,
        Modal: Hi,
        Offcanvas: Fi,
        Popover: gn,
        ScrollSpy: An,
        Tab: xn,
        Toast: Mn,
        Tooltip: un
    }
}));
//# sourceMappingURL=bootstrap.bundle.min.js.map


var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
            if (__propIsEnum.call(b, prop))
                __defNormalProp(a, prop, b[prop]);
        }
    return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[Object.keys(cb)[0]])((mod2 = {exports: {}}).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
        __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
        for (let key of __getOwnPropNames(module))
            if (!__hasOwnProp.call(target, key) && key !== "default")
                __defProp(target, key, {
                    get: () => module[key],
                    enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable
                });
    }
    return target;
};
var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {
        get: () => module.default,
        enumerable: true
    } : {value: module, enumerable: true})), module);
};

// node_modules/bignumber.js/bignumber.js
var require_bignumber = __commonJS({
    "node_modules/bignumber.js/bignumber.js"(exports, module) {
        (function (globalObject) {
            "use strict";
            var BigNumber2, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil,
                mathfloor = Math.floor, bignumberError = "[BigNumber Error] ",
                tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14,
                LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991,
                POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7,
                MAX = 1e9;

            function clone(configObject) {
                var div2, convertBase, parseNumeric,
                    P = BigNumber3.prototype = {constructor: BigNumber3, toString: null, valueOf: null},
                    ONE = new BigNumber3(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21,
                    MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
                        prefix: "",
                        groupSize: 3,
                        secondaryGroupSize: 0,
                        groupSeparator: ",",
                        decimalSeparator: ".",
                        fractionGroupSize: 0,
                        fractionGroupSeparator: "\xA0",
                        suffix: ""
                    }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";

                function BigNumber3(v, b) {
                    var alphabet, c, caseChanged, e, i, isNum, len2, str, x = this;
                    if (!(x instanceof BigNumber3))
                        return new BigNumber3(v, b);
                    if (b == null) {
                        if (v && v._isBigNumber === true) {
                            x.s = v.s;
                            if (!v.c || v.e > MAX_EXP) {
                                x.c = x.e = null;
                            } else if (v.e < MIN_EXP) {
                                x.c = [x.e = 0];
                            } else {
                                x.e = v.e;
                                x.c = v.c.slice();
                            }
                            return;
                        }
                        if ((isNum = typeof v == "number") && v * 0 == 0) {
                            x.s = 1 / v < 0 ? (v = -v, -1) : 1;
                            if (v === ~~v) {
                                for (e = 0, i = v; i >= 10; i /= 10, e++)
                                    ;
                                if (e > MAX_EXP) {
                                    x.c = x.e = null;
                                } else {
                                    x.e = e;
                                    x.c = [v];
                                }
                                return;
                            }
                            str = String(v);
                        } else {
                            if (!isNumeric.test(str = String(v)))
                                return parseNumeric(x, str, isNum);
                            x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
                        }
                        if ((e = str.indexOf(".")) > -1)
                            str = str.replace(".", "");
                        if ((i = str.search(/e/i)) > 0) {
                            if (e < 0)
                                e = i;
                            e += +str.slice(i + 1);
                            str = str.substring(0, i);
                        } else if (e < 0) {
                            e = str.length;
                        }
                    } else {
                        intCheck(b, 2, ALPHABET.length, "Base");
                        if (b == 10) {
                            x = new BigNumber3(v);
                            return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
                        }
                        str = String(v);
                        if (isNum = typeof v == "number") {
                            if (v * 0 != 0)
                                return parseNumeric(x, str, isNum, b);
                            x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
                            if (BigNumber3.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                                throw Error(tooManyDigits + v);
                            }
                        } else {
                            x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
                        }
                        alphabet = ALPHABET.slice(0, b);
                        e = i = 0;
                        for (len2 = str.length; i < len2; i++) {
                            if (alphabet.indexOf(c = str.charAt(i)) < 0) {
                                if (c == ".") {
                                    if (i > e) {
                                        e = len2;
                                        continue;
                                    }
                                } else if (!caseChanged) {
                                    if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                                        caseChanged = true;
                                        i = -1;
                                        e = 0;
                                        continue;
                                    }
                                }
                                return parseNumeric(x, String(v), isNum, b);
                            }
                        }
                        isNum = false;
                        str = convertBase(str, b, 10, x.s);
                        if ((e = str.indexOf(".")) > -1)
                            str = str.replace(".", "");
                        else
                            e = str.length;
                    }
                    for (i = 0; str.charCodeAt(i) === 48; i++)
                        ;
                    for (len2 = str.length; str.charCodeAt(--len2) === 48;)
                        ;
                    if (str = str.slice(i, ++len2)) {
                        len2 -= i;
                        if (isNum && BigNumber3.DEBUG && len2 > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
                            throw Error(tooManyDigits + x.s * v);
                        }
                        if ((e = e - i - 1) > MAX_EXP) {
                            x.c = x.e = null;
                        } else if (e < MIN_EXP) {
                            x.c = [x.e = 0];
                        } else {
                            x.e = e;
                            x.c = [];
                            i = (e + 1) % LOG_BASE;
                            if (e < 0)
                                i += LOG_BASE;
                            if (i < len2) {
                                if (i)
                                    x.c.push(+str.slice(0, i));
                                for (len2 -= LOG_BASE; i < len2;) {
                                    x.c.push(+str.slice(i, i += LOG_BASE));
                                }
                                i = LOG_BASE - (str = str.slice(i)).length;
                            } else {
                                i -= len2;
                            }
                            for (; i--; str += "0")
                                ;
                            x.c.push(+str);
                        }
                    } else {
                        x.c = [x.e = 0];
                    }
                }

                BigNumber3.clone = clone;
                BigNumber3.ROUND_UP = 0;
                BigNumber3.ROUND_DOWN = 1;
                BigNumber3.ROUND_CEIL = 2;
                BigNumber3.ROUND_FLOOR = 3;
                BigNumber3.ROUND_HALF_UP = 4;
                BigNumber3.ROUND_HALF_DOWN = 5;
                BigNumber3.ROUND_HALF_EVEN = 6;
                BigNumber3.ROUND_HALF_CEIL = 7;
                BigNumber3.ROUND_HALF_FLOOR = 8;
                BigNumber3.EUCLID = 9;
                BigNumber3.config = BigNumber3.set = function (obj) {
                    var p, v;
                    if (obj != null) {
                        if (typeof obj == "object") {
                            if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
                                v = obj[p];
                                intCheck(v, 0, MAX, p);
                                DECIMAL_PLACES = v;
                            }
                            if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
                                v = obj[p];
                                intCheck(v, 0, 8, p);
                                ROUNDING_MODE = v;
                            }
                            if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
                                v = obj[p];
                                if (v && v.pop) {
                                    intCheck(v[0], -MAX, 0, p);
                                    intCheck(v[1], 0, MAX, p);
                                    TO_EXP_NEG = v[0];
                                    TO_EXP_POS = v[1];
                                } else {
                                    intCheck(v, -MAX, MAX, p);
                                    TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
                                }
                            }
                            if (obj.hasOwnProperty(p = "RANGE")) {
                                v = obj[p];
                                if (v && v.pop) {
                                    intCheck(v[0], -MAX, -1, p);
                                    intCheck(v[1], 1, MAX, p);
                                    MIN_EXP = v[0];
                                    MAX_EXP = v[1];
                                } else {
                                    intCheck(v, -MAX, MAX, p);
                                    if (v) {
                                        MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
                                    } else {
                                        throw Error(bignumberError + p + " cannot be zero: " + v);
                                    }
                                }
                            }
                            if (obj.hasOwnProperty(p = "CRYPTO")) {
                                v = obj[p];
                                if (v === !!v) {
                                    if (v) {
                                        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                                            CRYPTO = v;
                                        } else {
                                            CRYPTO = !v;
                                            throw Error(bignumberError + "crypto unavailable");
                                        }
                                    } else {
                                        CRYPTO = v;
                                    }
                                } else {
                                    throw Error(bignumberError + p + " not true or false: " + v);
                                }
                            }
                            if (obj.hasOwnProperty(p = "MODULO_MODE")) {
                                v = obj[p];
                                intCheck(v, 0, 9, p);
                                MODULO_MODE = v;
                            }
                            if (obj.hasOwnProperty(p = "POW_PRECISION")) {
                                v = obj[p];
                                intCheck(v, 0, MAX, p);
                                POW_PRECISION = v;
                            }
                            if (obj.hasOwnProperty(p = "FORMAT")) {
                                v = obj[p];
                                if (typeof v == "object")
                                    FORMAT = v;
                                else
                                    throw Error(bignumberError + p + " not an object: " + v);
                            }
                            if (obj.hasOwnProperty(p = "ALPHABET")) {
                                v = obj[p];
                                if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
                                    ALPHABET = v;
                                } else {
                                    throw Error(bignumberError + p + " invalid: " + v);
                                }
                            }
                        } else {
                            throw Error(bignumberError + "Object expected: " + obj);
                        }
                    }
                    return {
                        DECIMAL_PLACES,
                        ROUNDING_MODE,
                        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
                        RANGE: [MIN_EXP, MAX_EXP],
                        CRYPTO,
                        MODULO_MODE,
                        POW_PRECISION,
                        FORMAT,
                        ALPHABET
                    };
                };
                BigNumber3.isBigNumber = function (v) {
                    if (!v || v._isBigNumber !== true)
                        return false;
                    if (!BigNumber3.DEBUG)
                        return true;
                    var i, n, c = v.c, e = v.e, s = v.s;
                    out:
                        if ({}.toString.call(c) == "[object Array]") {
                            if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
                                if (c[0] === 0) {
                                    if (e === 0 && c.length === 1)
                                        return true;
                                    break out;
                                }
                                i = (e + 1) % LOG_BASE;
                                if (i < 1)
                                    i += LOG_BASE;
                                if (String(c[0]).length == i) {
                                    for (i = 0; i < c.length; i++) {
                                        n = c[i];
                                        if (n < 0 || n >= BASE || n !== mathfloor(n))
                                            break out;
                                    }
                                    if (n !== 0)
                                        return true;
                                }
                            }
                        } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
                            return true;
                        }
                    throw Error(bignumberError + "Invalid BigNumber: " + v);
                };
                BigNumber3.maximum = BigNumber3.max = function () {
                    return maxOrMin(arguments, P.lt);
                };
                BigNumber3.minimum = BigNumber3.min = function () {
                    return maxOrMin(arguments, P.gt);
                };
                BigNumber3.random = function () {
                    var pow2_53 = 9007199254740992;
                    var random53bitInt = Math.random() * pow2_53 & 2097151 ? function () {
                        return mathfloor(Math.random() * pow2_53);
                    } : function () {
                        return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
                    };
                    return function (dp) {
                        var a, b, e, k, v, i = 0, c = [], rand = new BigNumber3(ONE);
                        if (dp == null)
                            dp = DECIMAL_PLACES;
                        else
                            intCheck(dp, 0, MAX);
                        k = mathceil(dp / LOG_BASE);
                        if (CRYPTO) {
                            if (crypto.getRandomValues) {
                                a = crypto.getRandomValues(new Uint32Array(k *= 2));
                                for (; i < k;) {
                                    v = a[i] * 131072 + (a[i + 1] >>> 11);
                                    if (v >= 9e15) {
                                        b = crypto.getRandomValues(new Uint32Array(2));
                                        a[i] = b[0];
                                        a[i + 1] = b[1];
                                    } else {
                                        c.push(v % 1e14);
                                        i += 2;
                                    }
                                }
                                i = k / 2;
                            } else if (crypto.randomBytes) {
                                a = crypto.randomBytes(k *= 7);
                                for (; i < k;) {
                                    v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                                    if (v >= 9e15) {
                                        crypto.randomBytes(7).copy(a, i);
                                    } else {
                                        c.push(v % 1e14);
                                        i += 7;
                                    }
                                }
                                i = k / 7;
                            } else {
                                CRYPTO = false;
                                throw Error(bignumberError + "crypto unavailable");
                            }
                        }
                        if (!CRYPTO) {
                            for (; i < k;) {
                                v = random53bitInt();
                                if (v < 9e15)
                                    c[i++] = v % 1e14;
                            }
                        }
                        k = c[--i];
                        dp %= LOG_BASE;
                        if (k && dp) {
                            v = POWS_TEN[LOG_BASE - dp];
                            c[i] = mathfloor(k / v) * v;
                        }
                        for (; c[i] === 0; c.pop(), i--)
                            ;
                        if (i < 0) {
                            c = [e = 0];
                        } else {
                            for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE)
                                ;
                            for (i = 1, v = c[0]; v >= 10; v /= 10, i++)
                                ;
                            if (i < LOG_BASE)
                                e -= LOG_BASE - i;
                        }
                        rand.e = e;
                        rand.c = c;
                        return rand;
                    };
                }();
                BigNumber3.sum = function () {
                    var i = 1, args = arguments, sum = new BigNumber3(args[0]);
                    for (; i < args.length;)
                        sum = sum.plus(args[i++]);
                    return sum;
                };
                convertBase = function () {
                    var decimal = "0123456789";

                    function toBaseOut(str, baseIn, baseOut, alphabet) {
                        var j, arr = [0], arrL, i = 0, len2 = str.length;
                        for (; i < len2;) {
                            for (arrL = arr.length; arrL--; arr[arrL] *= baseIn)
                                ;
                            arr[0] += alphabet.indexOf(str.charAt(i++));
                            for (j = 0; j < arr.length; j++) {
                                if (arr[j] > baseOut - 1) {
                                    if (arr[j + 1] == null)
                                        arr[j + 1] = 0;
                                    arr[j + 1] += arr[j] / baseOut | 0;
                                    arr[j] %= baseOut;
                                }
                            }
                        }
                        return arr.reverse();
                    }

                    return function (str, baseIn, baseOut, sign, callerIsToString) {
                        var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES,
                            rm = ROUNDING_MODE;
                        if (i >= 0) {
                            k = POW_PRECISION;
                            POW_PRECISION = 0;
                            str = str.replace(".", "");
                            y = new BigNumber3(baseIn);
                            x = y.pow(str.length - i);
                            POW_PRECISION = k;
                            y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, "0"), 10, baseOut, decimal);
                            y.e = y.c.length;
                        }
                        xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
                        e = k = xc.length;
                        for (; xc[--k] == 0; xc.pop())
                            ;
                        if (!xc[0])
                            return alphabet.charAt(0);
                        if (i < 0) {
                            --e;
                        } else {
                            x.c = xc;
                            x.e = e;
                            x.s = sign;
                            x = div2(x, y, dp, rm, baseOut);
                            xc = x.c;
                            r = x.r;
                            e = x.e;
                        }
                        d = e + dp + 1;
                        i = xc[d];
                        k = baseOut / 2;
                        r = r || d < 0 || xc[d + 1] != null;
                        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
                        if (d < 1 || !xc[0]) {
                            str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
                        } else {
                            xc.length = d;
                            if (r) {
                                for (--baseOut; ++xc[--d] > baseOut;) {
                                    xc[d] = 0;
                                    if (!d) {
                                        ++e;
                                        xc = [1].concat(xc);
                                    }
                                }
                            }
                            for (k = xc.length; !xc[--k];)
                                ;
                            for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++]))
                                ;
                            str = toFixedPoint(str, e, alphabet.charAt(0));
                        }
                        return str;
                    };
                }();
                div2 = function () {
                    function multiply(x, k, base) {
                        var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
                        for (x = x.slice(); i--;) {
                            xlo = x[i] % SQRT_BASE;
                            xhi = x[i] / SQRT_BASE | 0;
                            m = khi * xlo + xhi * klo;
                            temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
                            carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
                            x[i] = temp % base;
                        }
                        if (carry)
                            x = [carry].concat(x);
                        return x;
                    }

                    function compare2(a, b, aL, bL) {
                        var i, cmp;
                        if (aL != bL) {
                            cmp = aL > bL ? 1 : -1;
                        } else {
                            for (i = cmp = 0; i < aL; i++) {
                                if (a[i] != b[i]) {
                                    cmp = a[i] > b[i] ? 1 : -1;
                                    break;
                                }
                            }
                        }
                        return cmp;
                    }

                    function subtract(a, b, aL, base) {
                        var i = 0;
                        for (; aL--;) {
                            a[aL] -= i;
                            i = a[aL] < b[aL] ? 1 : 0;
                            a[aL] = i * base + a[aL] - b[aL];
                        }
                        for (; !a[0] && a.length > 1; a.splice(0, 1))
                            ;
                    }

                    return function (x, y, dp, rm, base) {
                        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz,
                            s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
                        if (!xc || !xc[0] || !yc || !yc[0]) {
                            return new BigNumber3(!x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : xc && xc[0] == 0 || !yc ? s * 0 : s / 0);
                        }
                        q = new BigNumber3(s);
                        qc = q.c = [];
                        e = x.e - y.e;
                        s = dp + e + 1;
                        if (!base) {
                            base = BASE;
                            e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
                            s = s / LOG_BASE | 0;
                        }
                        for (i = 0; yc[i] == (xc[i] || 0); i++)
                            ;
                        if (yc[i] > (xc[i] || 0))
                            e--;
                        if (s < 0) {
                            qc.push(1);
                            more = true;
                        } else {
                            xL = xc.length;
                            yL = yc.length;
                            i = 0;
                            s += 2;
                            n = mathfloor(base / (yc[0] + 1));
                            if (n > 1) {
                                yc = multiply(yc, n, base);
                                xc = multiply(xc, n, base);
                                yL = yc.length;
                                xL = xc.length;
                            }
                            xi = yL;
                            rem = xc.slice(0, yL);
                            remL = rem.length;
                            for (; remL < yL; rem[remL++] = 0)
                                ;
                            yz = yc.slice();
                            yz = [0].concat(yz);
                            yc0 = yc[0];
                            if (yc[1] >= base / 2)
                                yc0++;
                            do {
                                n = 0;
                                cmp = compare2(yc, rem, yL, remL);
                                if (cmp < 0) {
                                    rem0 = rem[0];
                                    if (yL != remL)
                                        rem0 = rem0 * base + (rem[1] || 0);
                                    n = mathfloor(rem0 / yc0);
                                    if (n > 1) {
                                        if (n >= base)
                                            n = base - 1;
                                        prod = multiply(yc, n, base);
                                        prodL = prod.length;
                                        remL = rem.length;
                                        while (compare2(prod, rem, prodL, remL) == 1) {
                                            n--;
                                            subtract(prod, yL < prodL ? yz : yc, prodL, base);
                                            prodL = prod.length;
                                            cmp = 1;
                                        }
                                    } else {
                                        if (n == 0) {
                                            cmp = n = 1;
                                        }
                                        prod = yc.slice();
                                        prodL = prod.length;
                                    }
                                    if (prodL < remL)
                                        prod = [0].concat(prod);
                                    subtract(rem, prod, remL, base);
                                    remL = rem.length;
                                    if (cmp == -1) {
                                        while (compare2(yc, rem, yL, remL) < 1) {
                                            n++;
                                            subtract(rem, yL < remL ? yz : yc, remL, base);
                                            remL = rem.length;
                                        }
                                    }
                                } else if (cmp === 0) {
                                    n++;
                                    rem = [0];
                                }
                                qc[i++] = n;
                                if (rem[0]) {
                                    rem[remL++] = xc[xi] || 0;
                                } else {
                                    rem = [xc[xi]];
                                    remL = 1;
                                }
                            } while ((xi++ < xL || rem[0] != null) && s--);
                            more = rem[0] != null;
                            if (!qc[0])
                                qc.splice(0, 1);
                        }
                        if (base == BASE) {
                            for (i = 1, s = qc[0]; s >= 10; s /= 10, i++)
                                ;
                            round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
                        } else {
                            q.e = e;
                            q.r = +more;
                        }
                        return q;
                    };
                }();

                function format(n, i, rm, id) {
                    var c0, e, ne, len2, str;
                    if (rm == null)
                        rm = ROUNDING_MODE;
                    else
                        intCheck(rm, 0, 8);
                    if (!n.c)
                        return n.toString();
                    c0 = n.c[0];
                    ne = n.e;
                    if (i == null) {
                        str = coeffToString(n.c);
                        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
                    } else {
                        n = round(new BigNumber3(n), i, rm);
                        e = n.e;
                        str = coeffToString(n.c);
                        len2 = str.length;
                        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
                            for (; len2 < i; str += "0", len2++)
                                ;
                            str = toExponential(str, e);
                        } else {
                            i -= ne;
                            str = toFixedPoint(str, e, "0");
                            if (e + 1 > len2) {
                                if (--i > 0)
                                    for (str += "."; i--; str += "0")
                                        ;
                            } else {
                                i += e - len2;
                                if (i > 0) {
                                    if (e + 1 == len2)
                                        str += ".";
                                    for (; i--; str += "0")
                                        ;
                                }
                            }
                        }
                    }
                    return n.s < 0 && c0 ? "-" + str : str;
                }

                function maxOrMin(args, method) {
                    var n, i = 1, m = new BigNumber3(args[0]);
                    for (; i < args.length; i++) {
                        n = new BigNumber3(args[i]);
                        if (!n.s) {
                            m = n;
                            break;
                        } else if (method.call(m, n)) {
                            m = n;
                        }
                    }
                    return m;
                }

                function normalise(n, c, e) {
                    var i = 1, j = c.length;
                    for (; !c[--j]; c.pop())
                        ;
                    for (j = c[0]; j >= 10; j /= 10, i++)
                        ;
                    if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
                        n.c = n.e = null;
                    } else if (e < MIN_EXP) {
                        n.c = [n.e = 0];
                    } else {
                        n.e = e;
                        n.c = c;
                    }
                    return n;
                }

                parseNumeric = function () {
                    var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/,
                        isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
                    return function (x, str, isNum, b) {
                        var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
                        if (isInfinityOrNaN.test(s)) {
                            x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
                        } else {
                            if (!isNum) {
                                s = s.replace(basePrefix, function (m, p1, p2) {
                                    base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                                    return !b || b == base ? p1 : m;
                                });
                                if (b) {
                                    base = b;
                                    s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                                }
                                if (str != s)
                                    return new BigNumber3(s, base);
                            }
                            if (BigNumber3.DEBUG) {
                                throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
                            }
                            x.s = null;
                        }
                        x.c = x.e = null;
                    };
                }();

                function round(x, sd, rm, r) {
                    var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
                    if (xc) {
                        out: {
                            for (d = 1, k = xc[0]; k >= 10; k /= 10, d++)
                                ;
                            i = sd - d;
                            if (i < 0) {
                                i += LOG_BASE;
                                j = sd;
                                n = xc[ni = 0];
                                rd = n / pows10[d - j - 1] % 10 | 0;
                            } else {
                                ni = mathceil((i + 1) / LOG_BASE);
                                if (ni >= xc.length) {
                                    if (r) {
                                        for (; xc.length <= ni; xc.push(0))
                                            ;
                                        n = rd = 0;
                                        d = 1;
                                        i %= LOG_BASE;
                                        j = i - LOG_BASE + 1;
                                    } else {
                                        break out;
                                    }
                                } else {
                                    n = k = xc[ni];
                                    for (d = 1; k >= 10; k /= 10, d++)
                                        ;
                                    i %= LOG_BASE;
                                    j = i - LOG_BASE + d;
                                    rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
                                }
                            }
                            r = r || sd < 0 || xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
                            r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
                            if (sd < 1 || !xc[0]) {
                                xc.length = 0;
                                if (r) {
                                    sd -= x.e + 1;
                                    xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                                    x.e = -sd || 0;
                                } else {
                                    xc[0] = x.e = 0;
                                }
                                return x;
                            }
                            if (i == 0) {
                                xc.length = ni;
                                k = 1;
                                ni--;
                            } else {
                                xc.length = ni + 1;
                                k = pows10[LOG_BASE - i];
                                xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
                            }
                            if (r) {
                                for (; ;) {
                                    if (ni == 0) {
                                        for (i = 1, j = xc[0]; j >= 10; j /= 10, i++)
                                            ;
                                        j = xc[0] += k;
                                        for (k = 1; j >= 10; j /= 10, k++)
                                            ;
                                        if (i != k) {
                                            x.e++;
                                            if (xc[0] == BASE)
                                                xc[0] = 1;
                                        }
                                        break;
                                    } else {
                                        xc[ni] += k;
                                        if (xc[ni] != BASE)
                                            break;
                                        xc[ni--] = 0;
                                        k = 1;
                                    }
                                }
                            }
                            for (i = xc.length; xc[--i] === 0; xc.pop())
                                ;
                        }
                        if (x.e > MAX_EXP) {
                            x.c = x.e = null;
                        } else if (x.e < MIN_EXP) {
                            x.c = [x.e = 0];
                        }
                    }
                    return x;
                }

                function valueOf(n) {
                    var str, e = n.e;
                    if (e === null)
                        return n.toString();
                    str = coeffToString(n.c);
                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
                    return n.s < 0 ? "-" + str : str;
                }

                P.absoluteValue = P.abs = function () {
                    var x = new BigNumber3(this);
                    if (x.s < 0)
                        x.s = 1;
                    return x;
                };
                P.comparedTo = function (y, b) {
                    return compare(this, new BigNumber3(y, b));
                };
                P.decimalPlaces = P.dp = function (dp, rm) {
                    var c, n, v, x = this;
                    if (dp != null) {
                        intCheck(dp, 0, MAX);
                        if (rm == null)
                            rm = ROUNDING_MODE;
                        else
                            intCheck(rm, 0, 8);
                        return round(new BigNumber3(x), dp + x.e + 1, rm);
                    }
                    if (!(c = x.c))
                        return null;
                    n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
                    if (v = c[v])
                        for (; v % 10 == 0; v /= 10, n--)
                            ;
                    if (n < 0)
                        n = 0;
                    return n;
                };
                P.dividedBy = P.div = function (y, b) {
                    return div2(this, new BigNumber3(y, b), DECIMAL_PLACES, ROUNDING_MODE);
                };
                P.dividedToIntegerBy = P.idiv = function (y, b) {
                    return div2(this, new BigNumber3(y, b), 0, 1);
                };
                P.exponentiatedBy = P.pow = function (n, m) {
                    var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
                    n = new BigNumber3(n);
                    if (n.c && !n.isInteger()) {
                        throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
                    }
                    if (m != null)
                        m = new BigNumber3(m);
                    nIsBig = n.e > 14;
                    if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
                        y = new BigNumber3(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
                        return m ? y.mod(m) : y;
                    }
                    nIsNeg = n.s < 0;
                    if (m) {
                        if (m.c ? !m.c[0] : !m.s)
                            return new BigNumber3(NaN);
                        isModExp = !nIsNeg && x.isInteger() && m.isInteger();
                        if (isModExp)
                            x = x.mod(m);
                    } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
                        k = x.s < 0 && isOdd(n) ? -0 : 0;
                        if (x.e > -1)
                            k = 1 / k;
                        return new BigNumber3(nIsNeg ? 1 / k : k);
                    } else if (POW_PRECISION) {
                        k = mathceil(POW_PRECISION / LOG_BASE + 2);
                    }
                    if (nIsBig) {
                        half = new BigNumber3(0.5);
                        if (nIsNeg)
                            n.s = 1;
                        nIsOdd = isOdd(n);
                    } else {
                        i = Math.abs(+valueOf(n));
                        nIsOdd = i % 2;
                    }
                    y = new BigNumber3(ONE);
                    for (; ;) {
                        if (nIsOdd) {
                            y = y.times(x);
                            if (!y.c)
                                break;
                            if (k) {
                                if (y.c.length > k)
                                    y.c.length = k;
                            } else if (isModExp) {
                                y = y.mod(m);
                            }
                        }
                        if (i) {
                            i = mathfloor(i / 2);
                            if (i === 0)
                                break;
                            nIsOdd = i % 2;
                        } else {
                            n = n.times(half);
                            round(n, n.e + 1, 1);
                            if (n.e > 14) {
                                nIsOdd = isOdd(n);
                            } else {
                                i = +valueOf(n);
                                if (i === 0)
                                    break;
                                nIsOdd = i % 2;
                            }
                        }
                        x = x.times(x);
                        if (k) {
                            if (x.c && x.c.length > k)
                                x.c.length = k;
                        } else if (isModExp) {
                            x = x.mod(m);
                        }
                    }
                    if (isModExp)
                        return y;
                    if (nIsNeg)
                        y = ONE.div(y);
                    return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
                };
                P.integerValue = function (rm) {
                    var n = new BigNumber3(this);
                    if (rm == null)
                        rm = ROUNDING_MODE;
                    else
                        intCheck(rm, 0, 8);
                    return round(n, n.e + 1, rm);
                };
                P.isEqualTo = P.eq = function (y, b) {
                    return compare(this, new BigNumber3(y, b)) === 0;
                };
                P.isFinite = function () {
                    return !!this.c;
                };
                P.isGreaterThan = P.gt = function (y, b) {
                    return compare(this, new BigNumber3(y, b)) > 0;
                };
                P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
                    return (b = compare(this, new BigNumber3(y, b))) === 1 || b === 0;
                };
                P.isInteger = function () {
                    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
                };
                P.isLessThan = P.lt = function (y, b) {
                    return compare(this, new BigNumber3(y, b)) < 0;
                };
                P.isLessThanOrEqualTo = P.lte = function (y, b) {
                    return (b = compare(this, new BigNumber3(y, b))) === -1 || b === 0;
                };
                P.isNaN = function () {
                    return !this.s;
                };
                P.isNegative = function () {
                    return this.s < 0;
                };
                P.isPositive = function () {
                    return this.s > 0;
                };
                P.isZero = function () {
                    return !!this.c && this.c[0] == 0;
                };
                P.minus = function (y, b) {
                    var i, j, t, xLTy, x = this, a = x.s;
                    y = new BigNumber3(y, b);
                    b = y.s;
                    if (!a || !b)
                        return new BigNumber3(NaN);
                    if (a != b) {
                        y.s = -b;
                        return x.plus(y);
                    }
                    var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
                    if (!xe || !ye) {
                        if (!xc || !yc)
                            return xc ? (y.s = -b, y) : new BigNumber3(yc ? x : NaN);
                        if (!xc[0] || !yc[0]) {
                            return yc[0] ? (y.s = -b, y) : new BigNumber3(xc[0] ? x : ROUNDING_MODE == 3 ? -0 : 0);
                        }
                    }
                    xe = bitFloor(xe);
                    ye = bitFloor(ye);
                    xc = xc.slice();
                    if (a = xe - ye) {
                        if (xLTy = a < 0) {
                            a = -a;
                            t = xc;
                        } else {
                            ye = xe;
                            t = yc;
                        }
                        t.reverse();
                        for (b = a; b--; t.push(0))
                            ;
                        t.reverse();
                    } else {
                        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
                        for (a = b = 0; b < j; b++) {
                            if (xc[b] != yc[b]) {
                                xLTy = xc[b] < yc[b];
                                break;
                            }
                        }
                    }
                    if (xLTy)
                        t = xc, xc = yc, yc = t, y.s = -y.s;
                    b = (j = yc.length) - (i = xc.length);
                    if (b > 0)
                        for (; b--; xc[i++] = 0)
                            ;
                    b = BASE - 1;
                    for (; j > a;) {
                        if (xc[--j] < yc[j]) {
                            for (i = j; i && !xc[--i]; xc[i] = b)
                                ;
                            --xc[i];
                            xc[j] += BASE;
                        }
                        xc[j] -= yc[j];
                    }
                    for (; xc[0] == 0; xc.splice(0, 1), --ye)
                        ;
                    if (!xc[0]) {
                        y.s = ROUNDING_MODE == 3 ? -1 : 1;
                        y.c = [y.e = 0];
                        return y;
                    }
                    return normalise(y, xc, ye);
                };
                P.modulo = P.mod = function (y, b) {
                    var q, s, x = this;
                    y = new BigNumber3(y, b);
                    if (!x.c || !y.s || y.c && !y.c[0]) {
                        return new BigNumber3(NaN);
                    } else if (!y.c || x.c && !x.c[0]) {
                        return new BigNumber3(x);
                    }
                    if (MODULO_MODE == 9) {
                        s = y.s;
                        y.s = 1;
                        q = div2(x, y, 0, 3);
                        y.s = s;
                        q.s *= s;
                    } else {
                        q = div2(x, y, 0, MODULO_MODE);
                    }
                    y = x.minus(q.times(y));
                    if (!y.c[0] && MODULO_MODE == 1)
                        y.s = x.s;
                    return y;
                };
                P.multipliedBy = P.times = function (y, b) {
                    var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c,
                        yc = (y = new BigNumber3(y, b)).c;
                    if (!xc || !yc || !xc[0] || !yc[0]) {
                        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
                            y.c = y.e = y.s = null;
                        } else {
                            y.s *= x.s;
                            if (!xc || !yc) {
                                y.c = y.e = null;
                            } else {
                                y.c = [0];
                                y.e = 0;
                            }
                        }
                        return y;
                    }
                    e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
                    y.s *= x.s;
                    xcL = xc.length;
                    ycL = yc.length;
                    if (xcL < ycL)
                        zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;
                    for (i = xcL + ycL, zc = []; i--; zc.push(0))
                        ;
                    base = BASE;
                    sqrtBase = SQRT_BASE;
                    for (i = ycL; --i >= 0;) {
                        c = 0;
                        ylo = yc[i] % sqrtBase;
                        yhi = yc[i] / sqrtBase | 0;
                        for (k = xcL, j = i + k; j > i;) {
                            xlo = xc[--k] % sqrtBase;
                            xhi = xc[k] / sqrtBase | 0;
                            m = yhi * xlo + xhi * ylo;
                            xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
                            c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
                            zc[j--] = xlo % base;
                        }
                        zc[j] = c;
                    }
                    if (c) {
                        ++e;
                    } else {
                        zc.splice(0, 1);
                    }
                    return normalise(y, zc, e);
                };
                P.negated = function () {
                    var x = new BigNumber3(this);
                    x.s = -x.s || null;
                    return x;
                };
                P.plus = function (y, b) {
                    var t, x = this, a = x.s;
                    y = new BigNumber3(y, b);
                    b = y.s;
                    if (!a || !b)
                        return new BigNumber3(NaN);
                    if (a != b) {
                        y.s = -b;
                        return x.minus(y);
                    }
                    var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
                    if (!xe || !ye) {
                        if (!xc || !yc)
                            return new BigNumber3(a / 0);
                        if (!xc[0] || !yc[0])
                            return yc[0] ? y : new BigNumber3(xc[0] ? x : a * 0);
                    }
                    xe = bitFloor(xe);
                    ye = bitFloor(ye);
                    xc = xc.slice();
                    if (a = xe - ye) {
                        if (a > 0) {
                            ye = xe;
                            t = yc;
                        } else {
                            a = -a;
                            t = xc;
                        }
                        t.reverse();
                        for (; a--; t.push(0))
                            ;
                        t.reverse();
                    }
                    a = xc.length;
                    b = yc.length;
                    if (a - b < 0)
                        t = yc, yc = xc, xc = t, b = a;
                    for (a = 0; b;) {
                        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
                        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
                    }
                    if (a) {
                        xc = [a].concat(xc);
                        ++ye;
                    }
                    return normalise(y, xc, ye);
                };
                P.precision = P.sd = function (sd, rm) {
                    var c, n, v, x = this;
                    if (sd != null && sd !== !!sd) {
                        intCheck(sd, 1, MAX);
                        if (rm == null)
                            rm = ROUNDING_MODE;
                        else
                            intCheck(rm, 0, 8);
                        return round(new BigNumber3(x), sd, rm);
                    }
                    if (!(c = x.c))
                        return null;
                    v = c.length - 1;
                    n = v * LOG_BASE + 1;
                    if (v = c[v]) {
                        for (; v % 10 == 0; v /= 10, n--)
                            ;
                        for (v = c[0]; v >= 10; v /= 10, n++)
                            ;
                    }
                    if (sd && x.e + 1 > n)
                        n = x.e + 1;
                    return n;
                };
                P.shiftedBy = function (k) {
                    intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
                    return this.times("1e" + k);
                };
                P.squareRoot = P.sqrt = function () {
                    var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4,
                        half = new BigNumber3("0.5");
                    if (s !== 1 || !c || !c[0]) {
                        return new BigNumber3(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
                    }
                    s = Math.sqrt(+valueOf(x));
                    if (s == 0 || s == 1 / 0) {
                        n = coeffToString(c);
                        if ((n.length + e) % 2 == 0)
                            n += "0";
                        s = Math.sqrt(+n);
                        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
                        if (s == 1 / 0) {
                            n = "5e" + e;
                        } else {
                            n = s.toExponential();
                            n = n.slice(0, n.indexOf("e") + 1) + e;
                        }
                        r = new BigNumber3(n);
                    } else {
                        r = new BigNumber3(s + "");
                    }
                    if (r.c[0]) {
                        e = r.e;
                        s = e + dp;
                        if (s < 3)
                            s = 0;
                        for (; ;) {
                            t = r;
                            r = half.times(t.plus(div2(x, t, dp, 1)));
                            if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
                                if (r.e < e)
                                    --s;
                                n = n.slice(s - 3, s + 1);
                                if (n == "9999" || !rep && n == "4999") {
                                    if (!rep) {
                                        round(t, t.e + DECIMAL_PLACES + 2, 0);
                                        if (t.times(t).eq(x)) {
                                            r = t;
                                            break;
                                        }
                                    }
                                    dp += 4;
                                    s += 4;
                                    rep = 1;
                                } else {
                                    if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                                        round(r, r.e + DECIMAL_PLACES + 2, 1);
                                        m = !r.times(r).eq(x);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
                };
                P.toExponential = function (dp, rm) {
                    if (dp != null) {
                        intCheck(dp, 0, MAX);
                        dp++;
                    }
                    return format(this, dp, rm, 1);
                };
                P.toFixed = function (dp, rm) {
                    if (dp != null) {
                        intCheck(dp, 0, MAX);
                        dp = dp + this.e + 1;
                    }
                    return format(this, dp, rm);
                };
                P.toFormat = function (dp, rm, format2) {
                    var str, x = this;
                    if (format2 == null) {
                        if (dp != null && rm && typeof rm == "object") {
                            format2 = rm;
                            rm = null;
                        } else if (dp && typeof dp == "object") {
                            format2 = dp;
                            dp = rm = null;
                        } else {
                            format2 = FORMAT;
                        }
                    } else if (typeof format2 != "object") {
                        throw Error(bignumberError + "Argument not an object: " + format2);
                    }
                    str = x.toFixed(dp, rm);
                    if (x.c) {
                        var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize,
                            groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1],
                            isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len2 = intDigits.length;
                        if (g2)
                            i = g1, g1 = g2, g2 = i, len2 -= i;
                        if (g1 > 0 && len2 > 0) {
                            i = len2 % g1 || g1;
                            intPart = intDigits.substr(0, i);
                            for (; i < len2; i += g1)
                                intPart += groupSeparator + intDigits.substr(i, g1);
                            if (g2 > 0)
                                intPart += groupSeparator + intDigits.slice(i);
                            if (isNeg)
                                intPart = "-" + intPart;
                        }
                        str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(new RegExp("\\d{" + g2 + "}\\B", "g"), "$&" + (format2.fractionGroupSeparator || "")) : fractionPart) : intPart;
                    }
                    return (format2.prefix || "") + str + (format2.suffix || "");
                };
                P.toFraction = function (md) {
                    var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
                    if (md != null) {
                        n = new BigNumber3(md);
                        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
                            throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
                        }
                    }
                    if (!xc)
                        return new BigNumber3(x);
                    d = new BigNumber3(ONE);
                    n1 = d0 = new BigNumber3(ONE);
                    d1 = n0 = new BigNumber3(ONE);
                    s = coeffToString(xc);
                    e = d.e = s.length - x.e - 1;
                    d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
                    md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
                    exp = MAX_EXP;
                    MAX_EXP = 1 / 0;
                    n = new BigNumber3(s);
                    n0.c[0] = 0;
                    for (; ;) {
                        q = div2(n, d, 0, 1);
                        d2 = d0.plus(q.times(d1));
                        if (d2.comparedTo(md) == 1)
                            break;
                        d0 = d1;
                        d1 = d2;
                        n1 = n0.plus(q.times(d2 = n1));
                        n0 = d2;
                        d = n.minus(q.times(d2 = d));
                        n = d2;
                    }
                    d2 = div2(md.minus(d0), d1, 0, 1);
                    n0 = n0.plus(d2.times(n1));
                    d0 = d0.plus(d2.times(d1));
                    n0.s = n1.s = x.s;
                    e = e * 2;
                    r = div2(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(div2(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
                    MAX_EXP = exp;
                    return r;
                };
                P.toNumber = function () {
                    return +valueOf(this);
                };
                P.toPrecision = function (sd, rm) {
                    if (sd != null)
                        intCheck(sd, 1, MAX);
                    return format(this, sd, rm, 2);
                };
                P.toString = function (b) {
                    var str, n = this, s = n.s, e = n.e;
                    if (e === null) {
                        if (s) {
                            str = "Infinity";
                            if (s < 0)
                                str = "-" + str;
                        } else {
                            str = "NaN";
                        }
                    } else {
                        if (b == null) {
                            str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
                        } else if (b === 10) {
                            n = round(new BigNumber3(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
                            str = toFixedPoint(coeffToString(n.c), n.e, "0");
                        } else {
                            intCheck(b, 2, ALPHABET.length, "Base");
                            str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
                        }
                        if (s < 0 && n.c[0])
                            str = "-" + str;
                    }
                    return str;
                };
                P.valueOf = P.toJSON = function () {
                    return valueOf(this);
                };
                P._isBigNumber = true;
                if (configObject != null)
                    BigNumber3.set(configObject);
                return BigNumber3;
            }

            function bitFloor(n) {
                var i = n | 0;
                return n > 0 || n === i ? i : i - 1;
            }

            function coeffToString(a) {
                var s, z, i = 1, j = a.length, r = a[0] + "";
                for (; i < j;) {
                    s = a[i++] + "";
                    z = LOG_BASE - s.length;
                    for (; z--; s = "0" + s)
                        ;
                    r += s;
                }
                for (j = r.length; r.charCodeAt(--j) === 48;)
                    ;
                return r.slice(0, j + 1 || 1);
            }

            function compare(x, y) {
                var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
                if (!i || !j)
                    return null;
                a = xc && !xc[0];
                b = yc && !yc[0];
                if (a || b)
                    return a ? b ? 0 : -j : i;
                if (i != j)
                    return i;
                a = i < 0;
                b = k == l;
                if (!xc || !yc)
                    return b ? 0 : !xc ^ a ? 1 : -1;
                if (!b)
                    return k > l ^ a ? 1 : -1;
                j = (k = xc.length) < (l = yc.length) ? k : l;
                for (i = 0; i < j; i++)
                    if (xc[i] != yc[i])
                        return xc[i] > yc[i] ^ a ? 1 : -1;
                return k == l ? 0 : k > l ^ a ? 1 : -1;
            }

            function intCheck(n, min, max, name) {
                if (n < min || n > max || n !== mathfloor(n)) {
                    throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
                }
            }

            function isOdd(n) {
                var k = n.c.length - 1;
                return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
            }

            function toExponential(str, e) {
                return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
            }

            function toFixedPoint(str, e, z) {
                var len2, zs;
                if (e < 0) {
                    for (zs = z + "."; ++e; zs += z)
                        ;
                    str = zs + str;
                } else {
                    len2 = str.length;
                    if (++e > len2) {
                        for (zs = z, e -= len2; --e; zs += z)
                            ;
                        str += zs;
                    } else if (e < len2) {
                        str = str.slice(0, e) + "." + str.slice(e);
                    }
                }
                return str;
            }

            BigNumber2 = clone();
            BigNumber2["default"] = BigNumber2.BigNumber = BigNumber2;
            if (typeof define == "function" && define.amd) {
                define(function () {
                    return BigNumber2;
                });
            } else if (typeof module != "undefined" && module.exports) {
                module.exports = BigNumber2;
            } else {
                if (!globalObject) {
                    globalObject = typeof self != "undefined" && self ? self : window;
                }
                globalObject.BigNumber = BigNumber2;
            }
        })(exports);
    }
});

// src/contract-create.ts
async function simulateCreateContractFromSource(arweave, wallet, initState, contractSrc, reward) {
    const srcTx = await arweave.createTransaction({data: contractSrc, reward}, wallet);
    srcTx.addTag("App-Name", "SmartWeaveContractSource");
    srcTx.addTag("App-Version", "0.3.0");
    srcTx.addTag("Content-Type", "application/javascript");
    await arweave.transactions.sign(srcTx, wallet);
    const deployInitStateTx = await simulateCreateContractFromTx(arweave, wallet, srcTx.id, initState);
    const initStateReward = deployInitStateTx.reward;
    srcTx.reward = (parseFloat(srcTx.reward) + parseFloat(initStateReward)).toString();
    return srcTx;
}

async function simulateCreateContractFromTx(arweave, wallet, srcTxId, state, tags = [], target = "", winstonQty = "", reward) {
    let contractTX = await arweave.createTransaction({data: state, reward}, wallet);
    if (target && winstonQty && target.length && +winstonQty > 0) {
        contractTX = await arweave.createTransaction({
            data: state,
            target: target.toString(),
            quantity: winstonQty.toString(),
            reward
        }, wallet);
    }
    if (tags && tags.length) {
        for (const tag of tags) {
            contractTX.addTag(tag.name.toString(), tag.value.toString());
        }
    }
    contractTX.addTag("App-Name", "SmartWeaveContract");
    contractTX.addTag("App-Version", "0.3.0");
    contractTX.addTag("Contract-Src", srcTxId);
    contractTX.addTag("Content-Type", "application/json");
    await arweave.transactions.sign(contractTX, wallet);
    return contractTX;
}

async function createContract(arweave, wallet, contractSrc, initState, reward) {
    const srcTx = await arweave.createTransaction({data: contractSrc, reward}, wallet);
    srcTx.addTag("App-Name", "SmartWeaveContractSource");
    srcTx.addTag("App-Version", "0.3.0");
    srcTx.addTag("Content-Type", "application/javascript");
    await arweave.transactions.sign(srcTx, wallet);
    const response = await arweave.transactions.post(srcTx);
    if (response.status === 200 || response.status === 208) {
        return await createContractFromTx(arweave, wallet, srcTx.id, initState);
    } else {
        throw new Error("Unable to write Contract Source.");
    }
}

async function createContractFromTx(arweave, wallet, srcTxId, state, tags = [], target = "", winstonQty = "", reward) {
    let contractTX = await arweave.createTransaction({data: state, reward}, wallet);
    if (target && winstonQty && target.length && +winstonQty > 0) {
        contractTX = await arweave.createTransaction({
            data: state,
            target: target.toString(),
            quantity: winstonQty.toString(),
            reward
        }, wallet);
    }
    if (tags && tags.length) {
        for (const tag of tags) {
            contractTX.addTag(tag.name.toString(), tag.value.toString());
        }
    }
    contractTX.addTag("App-Name", "SmartWeaveContract");
    contractTX.addTag("App-Version", "0.3.0");
    contractTX.addTag("Contract-Src", srcTxId);
    contractTX.addTag("Content-Type", "application/json");
    await arweave.transactions.sign(contractTX, wallet);
    const response = await arweave.transactions.post(contractTX);
    if (response.status === 200 || response.status === 208) {
        return contractTX.id;
    } else {
        throw new Error("Unable to write Contract Initial State");
    }
}

// node_modules/@weavery/clarity/clarity.js
var clarity_exports = {};
__export(clarity_exports, {
    Err: () => Err,
    Panic: () => Panic,
    SmartWeave: () => SmartWeave,
    add: () => add,
    append: () => append,
    asContract: () => asContract,
    asMaxLen: () => asMaxLen,
    atBlock: () => atBlock,
    blockHeight: () => blockHeight,
    concat: () => concat,
    contractCall: () => contractCall,
    contractCaller: () => contractCaller,
    contractOf: () => contractOf,
    defaultTo: () => defaultTo,
    div: () => div,
    err: () => err,
    filter: () => filter,
    fold: () => fold,
    ftGetBalance: () => ftGetBalance,
    ftMint: () => ftMint,
    ftTransfer: () => ftTransfer,
    ge: () => ge,
    get: () => get,
    getBlockInfo: () => getBlockInfo,
    gt: () => gt,
    hash160: () => hash160,
    isEq: () => isEq,
    isErr: () => isErr,
    isNone: () => isNone,
    isOk: () => isOk,
    isSome: () => isSome,
    keccak256: () => keccak256,
    le: () => le,
    len: () => len,
    list: () => list,
    lt: () => lt,
    map: () => map,
    mapDelete: () => mapDelete,
    mapGet: () => mapGet,
    mapInsert: () => mapInsert,
    mapSet: () => mapSet,
    match: () => match,
    mod: () => mod,
    mul: () => mul,
    nftGetOwner: () => nftGetOwner,
    nftMint: () => nftMint,
    nftTransfer: () => nftTransfer,
    none: () => none,
    not: () => not,
    ok: () => ok,
    pow: () => pow,
    print: () => print,
    requireFeature: () => requireFeature,
    requireVersion: () => requireVersion,
    sha256: () => sha256,
    sha512: () => sha512,
    sha512_256: () => sha512_256,
    some: () => some,
    sub: () => sub,
    toInt: () => toInt,
    toUint: () => toUint,
    tryUnwrap: () => tryUnwrap,
    tuple: () => tuple,
    txSender: () => txSender,
    unwrap: () => unwrap,
    unwrapErr: () => unwrapErr,
    unwrapErrPanic: () => unwrapErrPanic,
    unwrapPanic: () => unwrapPanic,
    xor: () => xor
});

function hash(algorithm, value) {
    if (Number.isInteger(value)) {
        let buff = new Uint8Array(16);
        let view = new DataView(buff.buffer);
        view.setBigUint64(0, BigInt(value), true);
        value = buff;
    }
    if (value instanceof Uint8Array) {
        let buffer = null;
        switch (algorithm) {
            case "keccak256":
                throw new Error("not implemented yet");
            default:
                throw new Error("not implemented yet");
        }
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    throw new TypeError();
}

var txSenderStack = [];
var SmartWeave = null;
var Panic = class extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, Panic.prototype);
    }
};
var Err = class extends Error {
    constructor(value) {
        super("");
        this.value = value;
        Object.setPrototypeOf(this, Err.prototype);
    }
};

function requireVersion(version) {
}

function requireFeature(feature) {
}

function add(...args) {
    return args.reduce((sum, operand) => sum + operand, 0);
}

function sub(...args) {
    return args.slice(1).reduce((difference, operand) => difference - operand, args[0]);
}

function mul(...args) {
    return args.reduce((product, operand) => product * operand, 1);
}

function div(...args) {
    return Math.trunc(args.slice(1).reduce((quotient, operand) => quotient / operand, args[0]));
}

function lt(a, b) {
    return a < b;
}

function le(a, b) {
    return a <= b;
}

function gt(a, b) {
    return a > b;
}

function ge(a, b) {
    return a >= b;
}

function append(list2, value) {
    return [...list2, value];
}

function asContract(expr) {
    if (SmartWeave) {
        try {
            txSenderStack.unshift(SmartWeave.contract.id);
            return expr();
        } finally {
            txSenderStack.shift();
        }
    }
    throw new Error("as-contract not supported");
}

function asMaxLen(value, length) {
    return value.length <= length ? some(value) : none;
}

function atBlock(blockHash, expr) {
    if (SmartWeave) {
        throw new Error("at-block not supported on SmartWeave");
    }
    throw new Error("not implemented yet");
}

function blockHeight() {
    if (SmartWeave) {
        return SmartWeave.block.height;
    }
    throw new Error("block-height not supported");
}

function concat(a, b) {
    if (a instanceof Array && b instanceof Array) {
        return [].concat(a, b);
    }
    if (a instanceof Uint8Array && b instanceof Uint8Array) {
        const result = new Uint8Array(a.byteLength + b.byteLength);
        result.set(a, 0);
        result.set(b, a.byteLength);
        return result;
    }
    throw new TypeError();
}

function contractCall(contractName, functionName, ...args) {
    if (SmartWeave) {
        throw new Error("contract-call? not supported on SmartWeave");
    }
    throw new Error("not implemented yet");
}

function contractCaller() {
    if (SmartWeave) {
        return txSender();
    }
    throw new Error("contract-caller not supported");
}

function contractOf(contractName) {
    if (SmartWeave) {
        throw new Error("contract-of not supported on SmartWeave");
    }
    throw new Error("not implemented yet");
}

function defaultTo(defaultValue, optionValue) {
    return optionValue !== null && optionValue !== void 0 ? optionValue : defaultValue;
}

function err(value) {
    return new Err(value);
}

function filter(func, list2) {
    if (list2 instanceof Array) {
        return list2.filter(func);
    }
    throw new TypeError();
}

function fold(func, list2, initialValue) {
    if (list2 instanceof Array) {
        return list2.reduce((accumulator, currentValue) => func(currentValue, accumulator), initialValue);
    }
    throw new TypeError();
}

function ftGetBalance(tokenName, principal) {
    throw new Error("not implemented yet");
}

function ftMint(tokenName, amount, recipient) {
    throw new Error("not implemented yet");
}

function ftTransfer(tokenName, amount, sender, recipient) {
    throw new Error("not implemented yet");
}

function get(keyName, tuple2) {
    return isNone(tuple2) ? none : tuple2.get(keyName);
}

function getBlockInfo(propName, blockHeight2) {
    if (SmartWeave) {
        throw new Error("get-block-info? not supported on SmartWeave");
    }
    throw new Error("not implemented yet");
}

function hash160(value) {
    if (Number.isInteger(value)) {
        let buff = new Uint8Array(16);
        let view = new DataView(buff.buffer);
        view.setBigUint64(0, BigInt(value), true);
        value = buff;
    }
    if (value instanceof Uint8Array) {
        throw new Error("not implemented yet");
    }
    throw new TypeError();
}

function isEq(...values) {
    if (values.length > 0 && values.every((value) => typeof value === typeof values[0])) {
        return values.every((value) => value === values[0]);
    }
    throw new TypeError();
}

function isErr(value) {
    return value instanceof Err;
}

function isNone(value) {
    return value === none;
}

function isOk(value) {
    return !(value instanceof Err);
}

function isSome(value) {
    return value !== none;
}

function keccak256(value) {
    return hash("keccak256", value);
}

function len(value) {
    return value.length;
}

function list(...values) {
    if (values.length > 0 && values.some((value) => typeof value !== typeof values[0])) {
        throw new TypeError();
    }
    return values;
}

function map(func, list2) {
    if (list2 instanceof Array) {
        return list2.map(func);
    }
    throw new TypeError();
}

function mapDelete(map2, key) {
    return map2.delete(key);
}

function mapGet(map2, key) {
    const value = map2.get(key);
    return value ? some(value) : none;
}

function mapInsert(map2, key, value) {
    if (map2.has(key))
        return false;
    map2.set(key, value);
    return true;
}

function mapSet(map2, key, value) {
    map2.set(key, value);
    return true;
}

function match(input, okBranch, errBranch) {
    if (isNone(input) || isErr(input)) {
        return errBranch(input);
    }
    return okBranch(input);
}

function mod(a, b) {
    if (b === 0) {
        throw new RangeError("division by zero");
    }
    return a % b;
}

function nftGetOwner(assetClass, assetID) {
    throw new Error("not implemented yet");
}

function nftMint(assetClass, assetID, recipient) {
    throw new Error("not implemented yet");
}

function nftTransfer(assetClass, assetID, sender, recipient) {
    throw new Error("not implemented yet");
}

var none = null;

function not(value) {
    return !value;
}

function ok(value) {
    return value;
}

function pow(a, b) {
    return Math.pow(a, b);
}

function print(value) {
    console.log(value);
    return value;
}

function sha256(value) {
    return hash("sha256", value);
}

function sha512(value) {
    return hash("sha512", value);
}

function sha512_256(value) {
    return hash("sha512-256", value);
}

function some(value) {
    return value;
}

function toInt(value) {
    return value;
}

function toUint(value) {
    return value;
}

function tryUnwrap(optionInput) {
    if (isSome(optionInput) || isOk(optionInput)) {
        return optionInput;
    }
    if (isErr(optionInput)) {
        return optionInput.value;
    }
    return none;
}

function tuple(...pairs) {
    return pairs.reduce((tuple2, [k, v]) => tuple2.set(k, v), new Map());
}

function txSender() {
    if (SmartWeave) {
        if (txSenderStack.length > 0) {
            return txSenderStack[0];
        }
        return SmartWeave.transaction.owner;
    }
    throw new Error("tx-sender not supported");
}

function unwrap(optionInput, thrownValue) {
    if (isNone(optionInput) || isErr(optionInput)) {
        return thrownValue;
    }
    return optionInput;
}

function unwrapErr(responseInput, thrownValue) {
    if (isErr(responseInput)) {
        return responseInput.value;
    }
    return thrownValue;
}

function unwrapErrPanic(responseInput) {
    if (isErr(responseInput)) {
        return responseInput.value;
    }
    throw new Panic("unwrapErrPanic");
}

function unwrapPanic(optionInput) {
    if (isNone(optionInput) || isErr(optionInput)) {
        throw new Panic("unwrapPanic");
    }
    return optionInput;
}

function xor(a, b) {
    return a ^ b;
}

// src/utils.ts
function getTag(tx, name) {
    const tags = tx.get("tags");
    for (const tag of tags) {
        try {
            if (tag.get("name", {decode: true, string: true}) === name) {
                return tag.get("value", {decode: true, string: true});
            }
        } catch (e) {
        }
    }
    return false;
}

function unpackTags(tx) {
    const tags = tx.get("tags");
    const result = {};
    for (const tag of tags) {
        try {
            const name = tag.get("name", {decode: true, string: true});
            const value = tag.get("value", {decode: true, string: true});
            if (!result.hasOwnProperty(name)) {
                result[name] = value;
                continue;
            }
            result[name] = [...result[name], value];
        } catch (e) {
        }
    }
    return result;
}

function arrayToHex(arr) {
    let str = "";
    for (const a of arr) {
        str += ("0" + a.toString(16)).slice(-2);
    }
    return str;
}

function log(arweave, ...str) {
    if (!arweave || !arweave.getConfig().api.logging)
        return;
    typeof arweave.getConfig().api.logger === "function" ? arweave.getConfig().api.logger(...str) : console.log(...str);
}

function normalizeContractSource(contractSrc) {
    contractSrc = contractSrc.replace(/export\s+async\s+function\s+handle/gmu, "async function handle").replace(/export\s+function\s+handle/gmu, "function handle").replace(/\(\s*\(\)\s*=>\s*{/g, "").replace(/\s*\(\s*function\s*\(\)\s*{/g, "").replace(/}\s*\)\s*\(\)\s*;/g, "");
    return `
    const [SmartWeave, BigNumber, clarity] = arguments;
    clarity.SmartWeave = SmartWeave;
    class ContractError extends Error { constructor(message) { super(message); this.name = 'ContractError' } };
    function ContractAssert(cond, message) { if (!cond) throw new ContractError(message) };
    ${contractSrc};
    return handle;
  `;
}

function evalSettings(state) {
    let settings = new Map();
    if (state.settings) {
        if (isIterable(state.settings)) {
            settings = new Map(state.settings);
        } else if (isObject(state.settings)) {
            settings = new Map(Object.entries(state.settings));
        }
    }
    return settings;
}

function isIterable(obj) {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === "function";
}

function isObject(obj) {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

function hasMultipleinteractions(gqlResult) {
    return gqlResult.node.tags.filter((tag) => tag.name === "Contract").length > 1;
}

// src/contract-step.ts
async function execute(handler, interaction, state) {
    try {
        const stateCopy = JSON.parse(JSON.stringify(state));
        const result = await handler(stateCopy, interaction);
        if (result && (result.state || result.result)) {
            return {
                type: "ok",
                result: result.result,
                state: result.state || state
            };
        }
        throw new Error(`Unexpected result from contract: ${JSON.stringify(result)}`);
    } catch (err2) {
        if (err2.name === "ContractError") {
            return {
                type: "error",
                result: err2.message,
                state
            };
        }
        return {
            type: "exception",
            result: `${err2 && err2.stack || err2 && err2.message}`,
            state
        };
    }
}

// src/errors.ts
var SmartWeaveErrorType;
(function (SmartWeaveErrorType2) {
    SmartWeaveErrorType2["CONTRACT_NOT_FOUND"] = "CONTRACT_NOT_FOUND";
})(SmartWeaveErrorType || (SmartWeaveErrorType = {}));
var SmartWeaveError = class extends Error {
    constructor(type, optional = {}) {
        if (optional.message) {
            super(optional.message);
        } else {
            super();
        }
        this.type = type;
        this.otherInfo = optional;
    }

    getType() {
        return this.type;
    }
};

// src/contract-read.ts
async function readContract(arweave, contractId, height, returnValidity) {
    if (!height) {
        const networkInfo = await arweave.network.getInfo();
        height = networkInfo.height;
    }
    const loadPromise = loadContract(arweave, contractId).catch((err2) => {
        const error = new SmartWeaveError(SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
            message: `Contract having txId: ${contractId} not found`,
            requestedTxId: contractId
        });
        throw error;
    });
    const fetchTxPromise = fetchTransactions(arweave, contractId, height).catch((err2) => err2);
    let [contractInfo, txInfos] = await Promise.all([loadPromise, fetchTxPromise]);
    if (contractInfo instanceof Error)
        throw contractInfo;
    if (txInfos instanceof Error)
        throw txInfos;
    let state;
    let contractSrcTXID = contractInfo.contractSrcTXID;
    try {
        state = JSON.parse(contractInfo.initState);
    } catch (e) {
        throw new Error(`Unable to parse initial state for contract: ${contractId}`);
    }
    log(arweave, `Replaying ${txInfos.length} confirmed interactions`);
    await sortTransactions(arweave, txInfos);
    let {handler, swGlobal} = contractInfo;
    const validity = {};
    for (const txInfo of txInfos) {
        const currentTx = txInfo.node;
        let input = txInfo.node.tags[txInfo.node.tags.findIndex((tag) => tag.name === "Input")].value;
        if (hasMultipleinteractions(txInfo)) {
            const contractIndex = txInfo.node.tags.findIndex((tag) => tag.name === "Contract" && tag.value === contractId);
            const inputTag = txInfo.node.tags[contractIndex + 1];
            if (!inputTag || inputTag.name !== "Input") {
                log(arweave, `Skipping tx with missing or invalid Input tag - ${currentTx.id}`);
                continue;
            }
            input = inputTag.value;
        }
        try {
            input = JSON.parse(input);
        } catch (e) {
            log(arweave, e);
            continue;
        }
        if (!input) {
            log(arweave, `Skipping tx with missing or invalid Input tag - ${currentTx.id}`);
            continue;
        }
        const interaction = {
            input,
            caller: currentTx.owner.address
        };
        swGlobal._activeTx = currentTx;
        const result = await execute(handler, interaction, state);
        if (result.type === "exception") {
            log(arweave, `${result.result}`);
            log(arweave, `Executing of interaction: ${currentTx.id} threw exception.`);
        }
        if (result.type === "error") {
            log(arweave, `${result.result}`);
            log(arweave, `Executing of interaction: ${currentTx.id} returned error.`);
        }
        validity[currentTx.id] = result.type === "ok";
        state = result.state;
        const settings = evalSettings(state);
        const evolve = state.evolve || settings.get("evolve");
        let canEvolve = state.canEvolve || settings.get("canEvolve");
        if (canEvolve == null) {
            canEvolve = true;
        }
        if (evolve && /[a-z0-9_-]{43}/i.test(evolve) && canEvolve && contractSrcTXID !== evolve) {
            try {
                contractInfo = await loadContract(arweave, contractId, evolve);
                swGlobal = contractInfo.swGlobal;
                handler = contractInfo.handler;
                contractSrcTXID = evolve;
            } catch (e) {
                const error = new SmartWeaveError(SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
                    message: `Contract having txId: ${contractId} not found`,
                    requestedTxId: contractId
                });
                console.log(error);
            }
        }
    }
    return returnValidity ? {state, validity} : state;
}

async function sortTransactions(arweave, txInfos) {
    const addKeysFuncs = txInfos.map((tx) => addSortKey(arweave, tx));
    await Promise.all(addKeysFuncs);
    txInfos.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

async function addSortKey(arweave, txInfo) {
    const {node} = txInfo;
    const blockHashBytes = arweave.utils.b64UrlToBuffer(node.block.id);
    const txIdBytes = arweave.utils.b64UrlToBuffer(node.id);
    const concatted = arweave.utils.concatBuffers([blockHashBytes, txIdBytes]);
    const hashed = arrayToHex(await arweave.crypto.hash(concatted));
    const blockHeight2 = `000000${node.block.height}`.slice(-12);
    txInfo.sortKey = `${blockHeight2},${hashed}`;
}

var MAX_REQUEST = 100;

async function fetchTransactions(arweave, contractId, height) {
    let variables = {
        tags: [
            {
                name: "App-Name",
                values: ["SmartWeaveAction"]
            },
            {
                name: "Contract",
                values: [contractId]
            }
        ],
        blockFilter: {
            max: height
        },
        first: MAX_REQUEST
    };
    let transactions = await getNextPage(arweave, variables);
    const txInfos = transactions.edges.filter((tx) => {
        var _a, _b;
        return !tx.node.bundledIn || !((_a = tx.node.bundledIn) == null ? void 0 : _a.id) || !tx.node.parent || !((_b = tx.node.parent) == null ? void 0 : _b.id);
    });
    while (transactions.pageInfo.hasNextPage) {
        const cursor = transactions.edges[MAX_REQUEST - 1].cursor;
        variables = __spreadProps(__spreadValues({}, variables), {
            after: cursor
        });
        transactions = await getNextPage(arweave, variables);
        txInfos.push(...transactions.edges.filter((tx) => {
            var _a, _b;
            return !tx.node.bundledIn || !((_a = tx.node.bundledIn) == null ? void 0 : _a.id) || !tx.node.parent || !((_b = tx.node.parent) == null ? void 0 : _b.id);
        }));
    }
    return txInfos;
}

async function getNextPage(arweave, variables) {
    const query = `query Transactions($tags: [TagFilter!]!, $blockFilter: BlockFilter!, $first: Int!, $after: String) {
    transactions(tags: $tags, block: $blockFilter, first: $first, sort: HEIGHT_ASC, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          owner { address }
          recipient
          tags {
            name
            value
          }
          block {
            height
            id
            timestamp
          }
          fee { winston }
          quantity { winston }
          parent { id }
        }
        cursor
      }
    }
  }`;
    const response = await arweave.api.post("graphql", {
        query,
        variables
    });
    if (response.status !== 200) {
        throw new Error(`Unable to retrieve transactions. Arweave gateway responded with status ${response.status}.`);
    }
    const data = response.data;
    const txs = data.data.transactions;
    return txs;
}

// src/smartweave-global.ts
var SmartWeaveGlobal = class {
    get _isDryRunning() {
        return !this._activeTx;
    }

    constructor(arweave, contract) {
        this.unsafeClient = arweave;
        this.arweave = {
            ar: arweave.ar,
            utils: arweave.utils,
            wallets: arweave.wallets,
            crypto: arweave.crypto
        };
        this.contract = contract;
        this.transaction = new Transaction(this);
        this.block = new Block(this);
        this.contracts = {
            readContractState: (contractId, height, returnValidity) => readContract(arweave, contractId, height || (this._isDryRunning ? Number.POSITIVE_INFINITY : this.block.height), returnValidity)
        };
    }
};
var Transaction = class {
    constructor(global) {
        this.global = global;
    }

    get id() {
        if (!this.global._activeTx) {
            throw new Error("No current Tx on id");
        }
        return this.global._activeTx.id;
    }

    get owner() {
        if (!this.global._activeTx) {
            throw new Error("No current Tx on owner");
        }
        return this.global._activeTx.owner.address;
    }

    get target() {
        if (!this.global._activeTx) {
            throw new Error("No current Tx on target");
        }
        return this.global._activeTx.recipient;
    }

    get tags() {
        if (!this.global._activeTx) {
            throw new Error("No current Tx on tags");
        }
        return this.global._activeTx.tags;
    }

    get quantity() {
        if (!this.global._activeTx) {
            throw new Error("No current Tx on quantity");
        }
        return this.global._activeTx.quantity.winston;
    }

    get reward() {
        if (!this.global._activeTx) {
            throw new Error("No current Tx on reward");
        }
        return this.global._activeTx.fee.winston;
    }
};
var Block = class {
    constructor(global) {
        this.global = global;
    }

    get height() {
        if (!this.global._activeTx) {
            throw new Error("No current tx on block height");
        }
        return this.global._activeTx.block.height;
    }

    get indep_hash() {
        if (!this.global._activeTx) {
            throw new Error("No current tx on block id");
        }
        return this.global._activeTx.block.id;
    }

    get timestamp() {
        if (!this.global._activeTx) {
            throw new Error("No current tx on block timestamp");
        }
        return this.global._activeTx.block.timestamp;
    }
};

// src/contract-load.ts
var import_bignumber = __toModule(require_bignumber());

async function loadContract(arweave, contractID, contractSrcTXID) {
    const contractTX = await arweave.transactions.get(contractID);
    const contractOwner = await arweave.wallets.ownerToAddress(contractTX.owner);
    contractSrcTXID = contractSrcTXID || getTag(contractTX, "Contract-Src");
    const minFee = getTag(contractTX, "Min-Fee");
    const contractSrcTX = await arweave.transactions.get(contractSrcTXID);
    const contractSrc = contractSrcTX.get("data", {decode: true, string: true});
    let state;
    if (getTag(contractTX, "Init-State")) {
        state = getTag(contractTX, "Init-State");
    } else if (getTag(contractTX, "Init-State-TX")) {
        const stateTX = await arweave.transactions.get(getTag(contractTX, "Init-State-TX"));
        state = stateTX.get("data", {decode: true, string: true});
    } else {
        state = contractTX.get("data", {decode: true, string: true});
    }
    const {handler, swGlobal} = createContractExecutionEnvironment(arweave, contractSrc, contractID, contractOwner);
    return {
        id: contractID,
        contractSrcTXID,
        contractSrc,
        initState: state,
        minFee,
        contractTX,
        handler,
        swGlobal
    };
}

function createContractExecutionEnvironment(arweave, contractSrc, contractId, contractOwner) {
    const returningSrc = normalizeContractSource(contractSrc);
    const swGlobal = new SmartWeaveGlobal(arweave, {id: contractId, owner: contractOwner});
    const getContractFunction = new Function(returningSrc);
    return {
        handler: getContractFunction(swGlobal, import_bignumber.default, clarity_exports),
        swGlobal
    };
}

// src/contract-interact.ts
async function interactWrite(arweave, wallet, contractId, input, tags = [], target = "", winstonQty = "", reward) {
    const interactionTx = await createTx(arweave, wallet, contractId, input, tags, target, winstonQty, reward);
    const response = await arweave.transactions.post(interactionTx);
    if (response.status !== 200)
        return null;
    return interactionTx.id;
}

async function simulateInteractWrite(arweave, wallet, contractId, input, tags = [], target = "", winstonQty = "") {
    const interactionTx = await createTx(arweave, wallet, contractId, input, tags, target, winstonQty);
    return interactionTx;
}

async function interactWriteDryRun(arweave, wallet, contractId, input, tags = [], target = "", winstonQty = "", myState, fromParam, contractInfoParam) {
    let {handler, swGlobal, contractSrcTXID} = contractInfoParam || await loadContract(arweave, contractId);
    const latestState = myState || await readContract(arweave, contractId);
    const from = fromParam || await arweave.wallets.getAddress(wallet);
    const settings = evalSettings(latestState);
    const evolve = latestState.evolve || settings.get("evolve");
    let canEvolve = latestState.canEvolve || settings.get("canEvolve");
    if (canEvolve === void 0 || canEvolve === null) {
        canEvolve = true;
    }
    if (evolve && /[a-z0-9_-]{43}/i.test(evolve) && canEvolve) {
        if (contractSrcTXID !== evolve) {
            try {
                const contractInfo = await loadContract(arweave, contractId, evolve);
                swGlobal = contractInfo.swGlobal;
                handler = contractInfo.handler;
                contractSrcTXID = evolve;
            } catch (e) {
                const error = new SmartWeaveError(SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
                    message: `Contract having txId: ${contractId} not found`,
                    requestedTxId: contractId
                });
                console.log(error);
            }
        }
    }
    const interaction = {
        input,
        caller: from
    };
    const tx = await createTx(arweave, wallet, contractId, input, tags, target, winstonQty);
    const ts = unpackTags(tx);
    const currentBlock = await arweave.blocks.getCurrent();
    swGlobal._activeTx = createDummyTx(tx, from, ts, currentBlock);
    return await execute(handler, interaction, latestState);
}

async function interactWriteDryRunCustom(arweave, tx, contractId, input, myState, fromParam = {}, contractInfoParam) {
    let {handler, swGlobal, contractSrcTXID} = contractInfoParam || await loadContract(arweave, contractId);
    const latestState = myState || await readContract(arweave, contractId);
    const from = fromParam;
    const settings = evalSettings(latestState);
    const evolve = latestState.evolve || settings.get("evolve");
    let canEvolve = latestState.canEvolve || settings.get("canEvolve");
    if (canEvolve === void 0 || canEvolve === null) {
        canEvolve = true;
    }
    if (evolve && /[a-z0-9_-]{43}/i.test(evolve) && canEvolve) {
        if (contractSrcTXID !== evolve) {
            try {
                const contractInfo = await loadContract(arweave, contractId, evolve);
                swGlobal = contractInfo.swGlobal;
                handler = contractInfo.handler;
                contractSrcTXID = evolve;
            } catch (e) {
                const error = new SmartWeaveError(SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
                    message: `Contract having txId: ${contractId} not found`,
                    requestedTxId: contractId
                });
                console.log(error);
            }
        }
    }
    const interaction = {
        input,
        caller: from
    };
    const ts = unpackTags(tx);
    const currentBlock = await arweave.blocks.getCurrent();
    swGlobal._activeTx = createDummyTx(tx, from, ts, currentBlock);
    return await execute(handler, interaction, latestState);
}

async function interactRead(arweave, wallet, contractId, input, tags = [], target = "", winstonQty = "") {
    let {handler, swGlobal, contractSrcTXID} = await loadContract(arweave, contractId);
    const latestState = await readContract(arweave, contractId);
    const from = wallet ? await arweave.wallets.getAddress(wallet) : "";
    const settings = evalSettings(latestState);
    const evolve = latestState.evolve || settings.get("evolve");
    let canEvolve = latestState.canEvolve || settings.get("canEvolve");
    if (canEvolve === void 0 || canEvolve === null) {
        canEvolve = true;
    }
    if (evolve && /[a-z0-9_-]{43}/i.test(evolve) && canEvolve) {
        if (contractSrcTXID !== evolve) {
            try {
                const contractInfo = await loadContract(arweave, contractId, evolve);
                swGlobal = contractInfo.swGlobal;
                handler = contractInfo.handler;
                contractSrcTXID = evolve;
            } catch (e) {
                const error = new SmartWeaveError(SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
                    message: `Contract having txId: ${contractId} not found`,
                    requestedTxId: contractId
                });
                console.log(error);
            }
        }
    }
    const interaction = {
        input,
        caller: from
    };
    const tx = await createTx(arweave, wallet, contractId, input, tags, target, winstonQty);
    const ts = unpackTags(tx);
    const currentBlock = await arweave.blocks.getCurrent();
    swGlobal._activeTx = createDummyTx(tx, from, ts, currentBlock);
    const result = await execute(handler, interaction, latestState);
    return result.result;
}

async function createTx(arweave, wallet, contractId, input, tags, target = "", winstonQty = "0", reward) {
    const options = {
        data: Math.random().toString().slice(-4),
        reward
    };
    if (target && target.length) {
        options.target = target.toString();
        if (winstonQty && +winstonQty > 0) {
            options.quantity = winstonQty.toString();
        }
    }
    const interactionTx = await arweave.createTransaction(options, wallet);
    if (!input) {
        throw new Error(`Input should be a truthy value: ${JSON.stringify(input)}`);
    }
    if (tags && tags.length) {
        for (const tag of tags) {
            interactionTx.addTag(tag.name.toString(), tag.value.toString());
        }
    }
    interactionTx.addTag("App-Name", "SmartWeaveAction");
    interactionTx.addTag("App-Version", "0.3.0");
    interactionTx.addTag("Contract", contractId);
    interactionTx.addTag("Input", JSON.stringify(input));
    await arweave.transactions.sign(interactionTx, wallet);
    return interactionTx;
}

function createDummyTx(tx, from, tags, block) {
    return {
        id: tx.id,
        owner: {
            address: from
        },
        recipient: tx.target,
        tags,
        fee: {
            winston: tx.reward
        },
        quantity: {
            winston: tx.quantity
        },
        block: {
            id: block.indep_hash,
            height: block.height,
            timestamp: block.timestamp
        }
    };
}

// src/weighted-pst-holder.ts
function selectWeightedPstHolder(balances) {
    let totalTokens = 0;
    for (const address of Object.keys(balances)) {
        totalTokens += balances[address];
    }
    const weighted = {};
    for (const address of Object.keys(balances)) {
        weighted[address] = balances[address] / totalTokens;
    }
    let sum = 0;
    const r = Math.random();
    for (const address of Object.keys(weighted)) {
        sum += weighted[address];
        if (r <= sum && weighted[address] > 0) {
            return address;
        }
    }
    throw new Error("Unable to select token holder");
}

// src/index.ts
var smartweave = {
    simulateCreateContractFromTx,
    simulateCreateContractFromSource,
    createContract,
    createContractFromTx,
    loadContract,
    interactWrite,
    interactWriteDryRun,
    interactWriteDryRunCustom,
    simulateInteractWrite,
    interactRead,
    readContract,
    selectWeightedPstHolder
};

var player_address;
var player_balance;
var player_key;
var arweave;
var contractId;
var textDecoder;

window.onload = function () {
    init();
}

function init() {
    arweave = Arweave.init({});
    arweave.network.getInfo().then(console.log);
    contractId = '1O5rWcrRzD0favCHZ05qnhtyjHHiyqw_XDWcG-rhxZI';
}

async function list_puzzles() {
    try {
        if (!is_signed_in()) {
            return null;
        }
        const latestState = await smartweave.interactWriteDryRun(arweave
            , player_key, contractId, {function: 'read'});
        var puzzles = latestState.state.puzzles;
        try {
            document.getElementById('cwt_balance').innerText = latestState.state.balances[player_address];
        }
        catch (err){}
        console.log(puzzles);
        return puzzles;
    } catch (err) {
        bs5Utils.Snack.show('light', "error: Can not get puzzles from the Arweave network.", 10000, true);
    }
    return null;
}

async function get_puzzle(puzzle_id) {
    var puzzles = await list_puzzles();
    if (!puzzles) {
        return null;
    }
    var puzzle = puzzles[puzzle_id];
    if (!puzzle) {
        console.log('Puzzle is null or not defiend.');
        return null;
    }
    return puzzle;
}

async function show_puzzle(puzzle_id) {
    var puzzle = await get_puzzle(puzzle_id);
    if (!puzzle) {
        return null;
    }
    var file_id = puzzle['file_id'];
    if (!file_id) {
        console.log('This puzzle has not file ID.');
        return null;
    }
    try {
        var data = await arweave.transactions.getData(file_id
            , {decode: true, string: true});
        puzzle['file'] = data;
        return puzzle;
    } catch (err) {
        bs5Utils.Snack.show('light', "error: Can't' get puzzle from the Arweave network.", 10000, true);
    }
    return null;
}

async function create_puzzle(puzzle, solution, prize = 0) {
    if (typeof puzzle !== 'string' || typeof solution !== 'string' || !Number.isInteger(prize) || !is_signed_in()) {
        console.log('Bad request');
        return false;
    }
    try {
        let transaction = await arweave.createTransaction({data: puzzle}, player_key);
        transaction.addTag('Content-Type', 'application/json');
        await arweave.transactions.sign(transaction, player_key);
        let uploader = await arweave.transactions.getUploader(transaction);
        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        }
        var id = transaction.id;
        console.log('Transaction ID: ', id);
        var solution_hash = await get_solution_hash(solution);
        const action = {
            function: 'create',
            file_id: id,
            solution_hash: solution_hash,
            prize: prize
        };
        var result = await smartweave.interactWrite(arweave, player_key, contractId, action);
        if (!result) {
            bs5Utils.Snack.show('light', "error: Can't' create puzzle on Arweave network.", 10000, true);
            return false;
        }
        return true;
    } catch (err) {
        bs5Utils.Snack.show('light', "error: Creating puzzle failed on Arweave network.", 10000, true);
    }
    return false;
}

async function submit_solution(puzzle_id, solution) {
    if (typeof puzzle_id !== 'string' || typeof solution !== 'string' || !is_signed_in()) {
        console.log('Bad request');
        return false;
    }
    try {
        var hash = await get_solution_hash(solution);
        if (puzzle_id === hash) {
            var puzzle = await get_puzzle(puzzle_id);
            if (!puzzle) {
                bs5Utils.Snack.show('light', "error: Puzzle does not exist.", 0, true);
                return false;
            }
            if (puzzle['winner']) {
                bs5Utils.Snack.show('light', "Puzzle has been already solved.", 0, true);
                return false;
            }
            const action = {
                function: 'solve',
                solution: solution,
                solution_hash: hash,
            };
            smartweave.interactWrite(arweave, player_key, contractId, action)
                .then((data) => {
                    console.log(data);
                    bs5Utils.Snack.show('light', "Congratulations, Your solution is correct.\n Your submission will be processed in minutes and if you are the first, you get the prize :)", 0, true);

                    return true;
                });
        } else {
            bs5Utils.Snack.show('light', "Wrong solution!, try again...", 0, true);
        }
    } catch (err) {
        bs5Utils.Snack.show('light', "error:  submitting solution failed on Arweave network.\n please try again later.", 0, true);
    }
}

async function get_solution_hash(solution) {
    var uint8array = await arweave.crypto.hash(arweave.utils.stringToBuffer(solution));
    return arweave.utils.bufferTob64Url(uint8array);
}

function is_signed_in() {
    if (!player_address || !player_balance || !player_key) {
        console.log('Login first.');
        return false;
    }
    return true;
}


// Phil
// ------------------------------------------------------------------------
// Copyright 2017 Keiran King

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// (https://www.apache.org/licenses/LICENSE-2.0)

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ------------------------------------------------------------------------

const keyboard = {
    "a": 65, "b": 66, "c": 67, "d": 68, "e": 69, "f": 70, "g": 71, "h": 72,
    "i": 73, "j": 74, "k": 75, "l": 76, "m": 77, "n": 78, "o": 79, "p": 80,
    "q": 81, "r": 82, "s": 83, "t": 84, "u": 85, "v": 86, "w": 87, "x": 88, "y": 89,
    "z": 90,
    "black": 190, ".": 190,
    "delete": 8,
    "enter": 13,
    "space": 32,
    "left": 37,
    "up": 38,
    "right": 39,
    "down": 40
};
const BLACK = ".";
const DASH = "-";
const BLANK = " ";
const ACROSS = "across";
const DOWN = "down";
const DEFAULT_SIZE = 15;
const DEFAULT_TITLE = "Untitled";
const DEFAULT_AUTHOR = "Anonymous";
const DEFAULT_CLUE = "(blank clue)";
const DEFAULT_NOTIFICATION_LIFETIME = 10; // in seconds

let history = [];
let isSymmetrical = false;
let grid = undefined;
let squares = undefined;
let isMutated = false;
let forced = null;
// createNewPuzzle();
let solveWorker = null;
let solveWorkerState = null;
let solveTimeout = null;
let solveWordlist = null;
let solvePending = [];

//____________________
// C L A S S E S
class Crossword {
    constructor(rows = DEFAULT_SIZE, cols = DEFAULT_SIZE) {
        this.clues = {};
        this.title = DEFAULT_TITLE;
        this.author = DEFAULT_AUTHOR;
        this.rows = rows;
        this.cols = cols;
        this.fill = [];
        //
        for (let i = 0; i < this.rows; i++) {
            this.fill.push("");
            for (let j = 0; j < this.cols; j++) {
                this.fill[i] += BLANK;
            }
        }
    }
}

class Grid {
    constructor(rows, cols) {
        document.getElementById("main").innerHTML = "";
        let table = document.createElement("TABLE");
        table.setAttribute("id", "grid");
        table.setAttribute("tabindex", "1");
        document.getElementById("main").appendChild(table);

        for (let i = 0; i < rows; i++) {
            let row = document.createElement("TR");
            row.setAttribute("data-row", i);
            document.getElementById("grid").appendChild(row);

            for (let j = 0; j < cols; j++) {
                let col = document.createElement("TD");
                col.setAttribute("data-col", j);

                let label = document.createElement("DIV");
                label.setAttribute("class", "label");
                let labelContent = document.createTextNode("");

                let fill = document.createElement("DIV");
                fill.setAttribute("class", "fill");
                let fillContent = document.createTextNode(xw.fill[i][j]);

                label.appendChild(labelContent);
                fill.appendChild(fillContent);
                col.appendChild(label);
                col.appendChild(fill);
                row.appendChild(col);
            }
        }
        grid = document.getElementById("grid");
        squares = grid.querySelectorAll('td');
        for (const square of squares) {
            square.addEventListener('click', mouseHandler);
        }
        grid.addEventListener('keydown', keyboardHandler);
    }

    update() {
        for (let i = 0; i < xw.rows; i++) {
            for (let j = 0; j < xw.cols; j++) {
                const activeCell = grid.querySelector('[data-row="' + i + '"]').querySelector('[data-col="' + j + '"]');
                let fill = xw.fill[i][j];
                if (fill == BLANK && forced != null) {
                    fill = forced[i][j];
                    activeCell.classList.add("pencil");
                } else {
                    activeCell.classList.remove("pencil");
                }
                activeCell.lastChild.innerHTML = fill;
                if (fill == BLACK) {
                    activeCell.classList.add("black");
                } else {
                    activeCell.classList.remove("black");
                }
            }
        }
    }
}

class Button {
    constructor(id) {
        this.id = id;
        this.dom = document.getElementById(id);
        this.tooltip = this.dom.getAttribute("data-tooltip");
        // this.type = type; // "normal", "toggle", "menu", "submenu"
        this.state = this.dom.className; // "normal", "on", "open", "disabled"
    }

    setState(state) {
        this.state = state;
        this.dom.className = (this.state == "normal") ? "" : this.state;
    }

    addEvent(e, func) {
        this.dom.addEventListener(e, func);
        if (this.state == "disabled") {
            this.setState("normal");
        }
    }
}

class Menu { // in dev
    constructor(id, buttons) {
        this.id = id;
        this.buttons = buttons;

        let div = document.createElement("DIV");
        div.setAttribute("id", this.id);
        for (var button in buttons) {
            div.appendChild(button);
        }
        document.getElementById("toolbar").appendChild(div);
    }
}

class Toolbar {
    constructor(id) {
        this.id = id;
        this.buttons = { // rewrite this programmatically
            "quickLayout": new Button("quick-layout"),
            "clearFill": new Button("clear-fill"),
        }
    }
}

class Notification {
    constructor(message, lifetime = undefined) {
        this.message = message;
        this.id = String(randomNumber(1, 10000));
        this.post();
        if (lifetime) {
            this.dismiss(lifetime);
        }
    }

    post() {
        let div = document.createElement("DIV");
        div.setAttribute("id", this.id);
        div.setAttribute("class", "notification");
        div.innerHTML = this.message;
        div.addEventListener('click', this.dismiss);
        document.getElementById("footer").appendChild(div);
    }

    update(message) {
        document.getElementById(this.id).innerHTML = message;
    }

    dismiss(seconds = 0) {
        let div = document.getElementById(this.id);
        // seconds = (seconds === true) ? 10 : seconds;
        setTimeout(function () {
            div.remove();
        }, seconds * 1000);
    }
}

class Interface {
    constructor(rows, cols) {
        this.grid = new Grid(rows, cols);
        this.sidebar;
        this.toolbar = new Toolbar("toolbar");

        this.isSymmetrical = false;
        this.row = 0;
        this.col = 0;
        this.acrossWord = '';
        this.downWord = '';
        this.acrossStartIndex = 0;
        this.acrossEndIndex = cols;
        this.downStartIndex = 0;
        this.downEndIndex = rows;
        this.direction = ACROSS;

        console.log("Grid UI created.")
    }

    toggleDirection() {
        this.direction = (this.direction == ACROSS) ? DOWN : ACROSS;
    }

    update() {
        updateInfoUI();
        updateLabelsAndClues();
        updateActiveWords();
        updateGridHighlights();
        updateSidebarHighlights();
        updateCluesUI();
    }
}

new Notification(document.getElementById("shortcuts").innerHTML, 300);
// new Notification("Tip: <kbd>.</kbd> makes a black square.", 300);
// new Notification("Tip: <kbd>Enter</kbd> toggles direction.", 300);

let xw = new Crossword(); // model
let current = new Interface(xw.rows, xw.cols); // view-controller
current.update();

//____________________
// F U N C T I O N S

function createNewPuzzle(rows, cols) {
    xw["clues"] = {};
    xw["title"] = DEFAULT_TITLE;
    xw["author"] = DEFAULT_AUTHOR;
    xw["rows"] = rows || DEFAULT_SIZE;
    xw["cols"] = cols || xw.rows;
    xw["fill"] = [];
    for (let i = 0; i < xw.rows; i++) {
        xw.fill.push("");
        for (let j = 0; j < xw.cols; j++) {
            xw.fill[i] += BLANK;
        }
    }
    updateInfoUI();
    document.getElementById("main").innerHTML = "";
    createGrid(xw.rows, xw.cols);

    isSymmetrical = false;
    current = {
        "row": 0,
        "col": 0,
        "acrossWord": '',
        "downWord": '',
        "acrossStartIndex": 0,
        "acrossEndIndex": DEFAULT_SIZE,
        "downStartIndex": 0,
        "downEndIndex": DEFAULT_SIZE,
        "direction": ACROSS
    };

    grid = document.getElementById("grid");
    squares = grid.querySelectorAll('td');

    updateActiveWords();
    updateGridHighlights();
    updateSidebarHighlights();
    updateCluesUI();

    for (const square of squares) {
        square.addEventListener('click', mouseHandler);
    }
    grid.addEventListener('keydown', keyboardHandler);
    console.log("New puzzle created.")
}

function mouseHandler(e) {
    const previousCell = grid.querySelector('[data-row="' + current.row + '"]').querySelector('[data-col="' + current.col + '"]');
    previousCell.classList.remove("active");
    const activeCell = e.currentTarget;
    if (activeCell == previousCell) {
        current.direction = (current.direction == ACROSS) ? DOWN : ACROSS;
    }
    current.row = Number(activeCell.parentNode.dataset.row);
    current.col = Number(activeCell.dataset.col);
    console.log("[" + current.row + "," + current.col + "]");
    activeCell.classList.add("active");

    isMutated = false;
    updateUI();
}

function keyboardHandler(e) {
    isMutated = false;
    let activeCell = grid.querySelector('[data-row="' + current.row + '"]').querySelector('[data-col="' + current.col + '"]');
    const symRow = xw.rows - 1 - current.row;
    const symCol = xw.cols - 1 - current.col;

    if ((e.which >= keyboard.a && e.which <= keyboard.z) || e.which == keyboard.space) {
        let oldContent = xw.fill[current.row][current.col];
        xw.fill[current.row] = xw.fill[current.row].slice(0, current.col) + String.fromCharCode(e.which) + xw.fill[current.row].slice(current.col + 1);
        if (oldContent == BLACK) {
            if (isSymmetrical) {
                xw.fill[symRow] = xw.fill[symRow].slice(0, symCol) + BLANK + xw.fill[symRow].slice(symCol + 1);
            }
        }
        // move the cursor
        e = new Event('keydown');
        if (current.direction == ACROSS) {
            e.which = keyboard.right;
        } else {
            e.which = keyboard.down;
        }
        isMutated = true;
    }
    if (e.which == keyboard.black) {
        if (xw.fill[current.row][current.col] == BLACK) { // if already black...
            e = new Event('keydown');
            e.which = keyboard.delete; // make it a white square
        } else {
            xw.fill[current.row] = xw.fill[current.row].slice(0, current.col) + BLACK + xw.fill[current.row].slice(current.col + 1);
            if (isSymmetrical) {
                xw.fill[symRow] = xw.fill[symRow].slice(0, symCol) + BLACK + xw.fill[symRow].slice(symCol + 1);
            }
        }
        isMutated = true;
    }
    if (e.which == keyboard.enter) {
        current.direction = (current.direction == ACROSS) ? DOWN : ACROSS;
    }
    if (e.which == keyboard.delete) {
        e.preventDefault();
        let oldContent = xw.fill[current.row][current.col];
        xw.fill[current.row] = xw.fill[current.row].slice(0, current.col) + BLANK + xw.fill[current.row].slice(current.col + 1);
        if (oldContent == BLACK) {
            if (isSymmetrical) {
                xw.fill[symRow] = xw.fill[symRow].slice(0, symCol) + BLANK + xw.fill[symRow].slice(symCol + 1);
            }
        } else { // move the cursor
            e = new Event('keydown');
            if (current.direction == ACROSS) {
                e.which = keyboard.left;
            } else {
                e.which = keyboard.up;
            }
        }
        isMutated = true;
    }
    if (e.which >= keyboard.left && e.which <= keyboard.down) {
        e.preventDefault();
        const previousCell = grid.querySelector('[data-row="' + current.row + '"]').querySelector('[data-col="' + current.col + '"]');
        previousCell.classList.remove("active");
        let content = xw.fill[current.row][current.col];
        switch (e.which) {
            case keyboard.left:
                if (current.direction == ACROSS || content == BLACK) {
                    current.col -= (current.col == 0) ? 0 : 1;
                }
                current.direction = ACROSS;
                break;
            case keyboard.up:
                if (current.direction == DOWN || content == BLACK) {
                    current.row -= (current.row == 0) ? 0 : 1;
                }
                current.direction = DOWN;
                break;
            case keyboard.right:
                if (current.direction == ACROSS || content == BLACK) {
                    current.col += (current.col == xw.cols - 1) ? 0 : 1;
                }
                current.direction = ACROSS;
                break;
            case keyboard.down:
                if (current.direction == DOWN || content == BLACK) {
                    current.row += (current.row == xw.rows - 1) ? 0 : 1;
                }
                current.direction = DOWN;
                break;
        }
        console.log("[" + current.row + "," + current.col + "]");
        activeCell = grid.querySelector('[data-row="' + current.row + '"]').querySelector('[data-col="' + current.col + '"]');
        activeCell.classList.add("active");
    }
    updateUI();
}

function updateUI() {
    // if (isMutated) {
    //   autoFill(true);  // quick fill
    // }
    updateGridUI();
    updateLabelsAndClues();
    updateActiveWords();
    updateGridHighlights();
    updateSidebarHighlights();
    updateCluesUI();
    updateInfoUI();
}

function updateGridUI() {
    for (let i = 0; i < xw.rows; i++) {
        for (let j = 0; j < xw.cols; j++) {
            const activeCell = grid.querySelector('[data-row="' + i + '"]').querySelector('[data-col="' + j + '"]');
            let fill = xw.fill[i][j];
            if (fill == BLANK && forced != null) {
                fill = forced[i][j];
                activeCell.classList.add("pencil");
            } else {
                activeCell.classList.remove("pencil");
            }
            activeCell.lastChild.innerHTML = fill;
            if (fill == BLACK) {
                activeCell.classList.add("black");
            } else {
                activeCell.classList.remove("black");
            }
        }
    }
}

function updateCluesUI() {
    let acrossClueNumber = document.getElementById("across-clue-number");
    let downClueNumber = document.getElementById("down-clue-number");
    let acrossClueText = document.getElementById("across-clue-text");
    let downClueText = document.getElementById("down-clue-text");
    // const currentCell = grid.querySelector('[data-row="' + current.row + '"]').querySelector('[data-col="' + current.col + '"]');

    // If the current cell is black, empty interface and get out
    if (xw.fill[current.row][current.col] == BLACK) {
        acrossClueNumber.innerHTML = "";
        downClueNumber.innerHTML = "";
        acrossClueText.innerHTML = "";
        downClueText.innerHTML = "";
        return;
    }
    // Otherwise, assign values
    const acrossCell = grid.querySelector('[data-row="' + current.row + '"]').querySelector('[data-col="' + current.acrossStartIndex + '"]');
    const downCell = grid.querySelector('[data-row="' + current.downStartIndex + '"]').querySelector('[data-col="' + current.col + '"]');
    acrossClueNumber.innerHTML = acrossCell.firstChild.innerHTML + "a.";
    downClueNumber.innerHTML = downCell.firstChild.innerHTML + "d.";
    acrossClueText.innerHTML = xw.clues[[current.row, current.acrossStartIndex, ACROSS]];
    downClueText.innerHTML = xw.clues[[current.downStartIndex, current.col, DOWN]];
}

function updateInfoUI() {
    document.getElementById("puzzle-title").innerHTML = xw.title;
    document.getElementById("puzzle-author").innerHTML = xw.author;
}

function createGrid(rows, cols) {
    let table = document.createElement("TABLE");
    table.setAttribute("id", "grid");
    table.setAttribute("tabindex", "1");
    // table.setAttribute("tabindex", "0");
    document.getElementById("main").appendChild(table);

    for (let i = 0; i < rows; i++) {
        let row = document.createElement("TR");
        row.setAttribute("data-row", i);
        document.getElementById("grid").appendChild(row);

        for (let j = 0; j < cols; j++) {
            let col = document.createElement("TD");
            col.setAttribute("data-col", j);

            let label = document.createElement("DIV");
            label.setAttribute("class", "label");
            let labelContent = document.createTextNode("");

            let fill = document.createElement("DIV");
            fill.setAttribute("class", "fill");
            let fillContent = document.createTextNode(xw.fill[i][j]);

            // let t = document.createTextNode("[" + i + "," + j + "]");
            label.appendChild(labelContent);
            fill.appendChild(fillContent);
            col.appendChild(label);
            col.appendChild(fill);
            row.appendChild(col);
        }
    }
    updateLabelsAndClues();
}

function updateLabelsAndClues() {
    let count = 1;
    for (let i = 0; i < xw.rows; i++) {
        for (let j = 0; j < xw.cols; j++) {
            let isAcross = false;
            let isDown = false;
            if (xw.fill[i][j] != BLACK) {
                isDown = i == 0 || xw.fill[i - 1][j] == BLACK;
                isAcross = j == 0 || xw.fill[i][j - 1] == BLACK;
            }
            const grid = document.getElementById("grid");
            let currentCell = grid.querySelector('[data-row="' + i + '"]').querySelector('[data-col="' + j + '"]');
            if (isAcross || isDown) {
                currentCell.firstChild.innerHTML = count; // Set square's label to the count
                count++;
            } else {
                currentCell.firstChild.innerHTML = "";
            }

            if (isAcross) {
                xw.clues[[i, j, ACROSS]] = xw.clues[[i, j, ACROSS]] || DEFAULT_CLUE;
            } else {
                delete xw.clues[[i, j, ACROSS]];
            }
            if (isDown) {
                xw.clues[[i, j, DOWN]] = xw.clues[[i, j, DOWN]] || DEFAULT_CLUE;
            } else {
                delete xw.clues[[i, j, DOWN]];
            }
        }
    }
}

function updateActiveWords() {
    if (xw.fill[current.row][current.col] == BLACK) {
        current.acrossWord = '';
        current.downWord = '';
        current.acrossStartIndex = null;
        current.acrossEndIndex = null;
        current.downStartIndex = null;
        current.downEndIndex = null;
    } else {
        current.acrossWord = getWordAt(current.row, current.col, ACROSS, true);
        current.downWord = getWordAt(current.row, current.col, DOWN, true);
    }
    document.getElementById("across-word").innerHTML = current.acrossWord;
    document.getElementById("down-word").innerHTML = current.downWord;
    // console.log("Across:", current.acrossWord, "Down:", current.downWord);
    // console.log(current.acrossWord.split(DASH).join("*"));
}

function getWordAt(row, col, direction, setCurrentWordIndices) {
    let text = "";
    let [start, end] = [0, 0];
    if (direction == ACROSS) {
        text = xw.fill[row];
    } else {
        for (let i = 0; i < xw.rows; i++) {
            text += xw.fill[i][col];
        }
    }
    text = text.split(BLANK).join(DASH);
    [start, end] = getWordIndices(text, (direction == ACROSS) ? col : row);
    // Set global word indices if needed
    if (setCurrentWordIndices) {
        if (direction == ACROSS) {
            [current.acrossStartIndex, current.acrossEndIndex] = [start, end];
        } else {
            [current.downStartIndex, current.downEndIndex] = [start, end];
        }
    }
    return text.slice(start, end);
}

function getWordIndices(text, position) {
    let start = text.slice(0, position).lastIndexOf(BLACK);
    start = (start == -1) ? 0 : start + 1;
    let end = text.slice(position, DEFAULT_SIZE).indexOf(BLACK);
    end = (end == -1) ? DEFAULT_SIZE : Number(position) + end;
    return [start, end];
}

function updateGridHighlights() {
    // Clear the grid of any highlights
    for (let i = 0; i < xw.rows; i++) {
        for (let j = 0; j < xw.cols; j++) {
            const square = grid.querySelector('[data-row="' + i + '"]').querySelector('[data-col="' + j + '"]');
            square.classList.remove("highlight", "lowlight");
        }
    }
    // Highlight across squares
    for (let j = current.acrossStartIndex; j < current.acrossEndIndex; j++) {
        const square = grid.querySelector('[data-row="' + current.row + '"]').querySelector('[data-col="' + j + '"]');
        if (j != current.col) {
            square.classList.add((current.direction == ACROSS) ? "highlight" : "lowlight");
        }
    }
    // Highlight down squares
    for (let i = current.downStartIndex; i < current.downEndIndex; i++) {
        const square = grid.querySelector('[data-row="' + i + '"]').querySelector('[data-col="' + current.col + '"]');
        if (i != current.row) {
            square.classList.add((current.direction == DOWN) ? "highlight" : "lowlight");
        }
    }
}

function updateSidebarHighlights() {
    let acrossHeading = document.getElementById("across-heading");
    let downHeading = document.getElementById("down-heading");
    const currentCell = grid.querySelector('[data-row="' + current.row + '"]').querySelector('[data-col="' + current.col + '"]');

    acrossHeading.classList.remove("highlight");
    downHeading.classList.remove("highlight");

    if (!currentCell.classList.contains("black")) {
        if (current.direction == ACROSS) {
            acrossHeading.classList.add("highlight");
        } else {
            downHeading.classList.add("highlight");
        }
    }
}

function setClues() {
    xw.clues[[current.row, current.acrossStartIndex, ACROSS]] = document.getElementById("across-clue-text").innerHTML;
    xw.clues[[current.downStartIndex, current.col, DOWN]] = document.getElementById("down-clue-text").innerHTML;
    // console.log("Stored clue:", xw.clues[[current.row, current.acrossStartIndex, ACROSS]], "at [" + current.row + "," + current.acrossStartIndex + "]");
    // console.log("Stored clue:", xw.clues[[current.downStartIndex, current.col, DOWN]], "at [" + current.downStartIndex + "," + current.col + "]");
}

function setTitle() {
    xw.title = document.getElementById("puzzle-title").innerHTML;
}

function setAuthor() {
    xw.author = document.getElementById("puzzle-author").innerHTML;
}

function suppressEnterKey(e) {
    if (e.which == keyboard.enter) {
        e.preventDefault();
        // console.log("Enter key behavior suppressed.");
    }
}

function generatePattern() {
    let title = xw.title;
    let author = xw.author;
    createNewPuzzle();
    xw.title = title;
    xw.author = author;

    const pattern = patterns[randomNumber(0, patterns.length)]; // select random pattern
    if (!isSymmetrical) { // patterns are encoded as only one half of the grid...
        toggleSymmetry();   // so symmetry needs to be on to populate correctly
    }
    for (let i = 0; i < pattern.length; i++) {
        const row = pattern[i][0];
        const col = pattern[i][1];
        const symRow = xw.rows - 1 - row;
        const symCol = xw.cols - 1 - col;
        xw.fill[row] = xw.fill[row].slice(0, col) + BLACK + xw.fill[row].slice(col + 1);
        xw.fill[symRow] = xw.fill[symRow].slice(0, symCol) + BLACK + xw.fill[symRow].slice(symCol + 1);
    }
    isMutated = true;
    updateUI();
    console.log("Generated layout.")
}

function toggleSymmetry() {
    isSymmetrical = !isSymmetrical;
    // Update UI button
    let symButton = document.getElementById("toggle-symmetry");
    symButton.classList.toggle("button-on");
    buttonState = symButton.getAttribute("data-state");
    symButton.setAttribute("data-state", (buttonState == "on") ? "off" : "on");
    symButton.setAttribute("data-tooltip", "Turn " + buttonState + " symmetry");
}

// function toggleHelp() {
//   document.getElementById("help").style.display = "none";
// }

function clearFill() {
    for (let i = 0; i < xw.rows; i++) {
        xw.fill[i] = xw.fill[i].replace(/\w/g, ' '); // replace letters with spaces
    }
    isMutated = true;
    updateUI();
}

function autoFill(isQuick = false) {
    console.log("Auto-filling...");
    forced = null;
    grid.classList.remove("sat", "unsat");
    if (!solveWorker) {
        solveWorker = new Worker('xw_worker.js');
        solveWorkerState = 'ready';
    }
    if (solveWorkerState != 'ready') {
        cancelSolveWorker();
    }
    solvePending = [isQuick];
    runSolvePending();
}

function runSolvePending() {
    if (solveWorkerState != 'ready' || solvePending.length == 0) return;
    let isQuick = solvePending[0];
    solvePending = [];
    solveTimeout = window.setTimeout(cancelSolveWorker, 30000);
    if (solveWordlist == null) {
        console.log('Rebuilding wordlist...');
        solveWordlist = '';
        for (let i = 3; i < wordlist.length; i++) {
            solveWordlist += wordlist[i].join('\n') + '\n';
        }
    }
    //console.log(wordlist_str);
    let puz = xw.fill.join('\n') + '\n';
    solveWorker.postMessage(['run', solveWordlist, puz, isQuick]);
    solveWorkerState = 'running';
    solveWorker.onmessage = function (e) {
        switch (e.data[0]) {
            case 'sat':
                if (solveWorkerState == 'running') {
                    if (isQuick) {
                        console.log("Autofill: Solution found.");
                        grid.classList.add("sat");
                    } else {
                        xw.fill = e.data[1].split('\n');
                        xw.fill.pop();  // strip empty last line
                        updateGridUI();
                        grid.focus();
                    }
                }
                break;
            case 'unsat':
                if (solveWorkerState == 'running') {
                    if (isQuick) {
                        console.log("Autofill: No quick solution found.");
                        grid.classList.add("unsat");
                    } else {
                        console.log('Autofill: No solution found.');
                        // TODO: indicate on UI
                    }
                }
                break;
            case 'forced':
                if (solveWorkerState == 'running') {
                    forced = e.data[1].split('\n');
                    forced.pop;  // strip empty last line
                    updateGridUI();
                }
                break;
            case 'done':
                console.log('Autofill: returning to ready, state was ', solveWorkerState);
                solveWorkerReady();
                break;
            case 'ack_cancel':
                console.log('Autofill: Cancel acknowledged.');
                solveWorkerReady();
                break;
            default:
                console.log('Autofill: Unexpected return,', e.data);
                break;
        }
    }
}

function solveWorkerReady() {
    if (solveTimeout) {
        window.clearTimeout(solveTimeout);
        solveTimeout = null;
    }
    solveWorkerState = 'ready';
    runSolvePending();
}

function cancelSolveWorker() {
    if (solveWorkerState == 'running') {
        solveWorker.postMessage(['cancel']);
        solveWorkerState = 'cancelwait';
        console.log("Autofill: Cancel sent.");  // TODO: indicate on UI
        window.clearTimeout(solveTimeout);
        solveTimeout = null;
    }
}

function invalidateSolverWordlist() {
    solveWordlist = null;
}

function showMenu(e) {
    let menus = document.querySelectorAll("#toolbar .menu");
    for (let i = 0; i < menus.length; i++) {
        menus[i].classList.add("hidden");
    }
    const id = e.target.getAttribute("id");
    let menu = document.getElementById(id + "-menu");
    if (menu) {
        menu.classList.remove("hidden");
    }
}

function hideMenu(e) {
    e.target.classList.add("hidden");
}

function setDefault(e) {
    let d = e.target.parentNode.querySelector(".default");
    d.classList.remove("default");
    e.target.classList.add("default");
    menuButton = document.getElementById(e.target.parentNode.getAttribute("id").replace("-menu", ""));
    menuButton.innerHTML = e.target.innerHTML;
}

function doDefault(e) {
    const id = e.target.parentNode.getAttribute("id");
    let menu = document.getElementById(id + "-menu");
    if (menu) {
        let d = menu.querySelector(".default");
        d.click();
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function randomLetter() {
    let alphabet = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSSSTTTTTTUUUUVVWWXYYZ";
    return alphabet[randomNumber(0, alphabet.length)];
}


// Phil
// ------------------------------------------------------------------------
// Copyright 2017 Keiran King

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// (https://www.apache.org/licenses/LICENSE-2.0)

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ------------------------------------------------------------------------

function ScrambledError() {
    this.message = 'Cannot open scrambled Across Lite files';
    this.name = 'ScrambledError';
}

class PuzReader {
    constructor(buf) {
        this.buf = buf;
    }

    readShort(ix) {
        return this.buf[ix] | (this.buf[ix + 1] << 8);
    }

    readString() {
        let result = [];
        while (true) {
            let c = this.buf[this.ix++];
            if (c == 0) break;
            result.push(String.fromCodePoint(c));
        }
        return result.join('');
    }

    toJson() {
        let json = {};
        let w = this.buf[0x2c];
        let h = this.buf[0x2d];
        let scrambled = this.readShort(0x32);
        if (scrambled & 0x0004) {
            throw new ScrambledError;
        }
        json.size = {cols: w, rows: h};
        let grid = [];
        for (var i = 0; i < w * h; i++) {
            grid.push(String.fromCodePoint(this.buf[0x34 + i]));
        }
        json.grid = grid;
        this.ix = 0x34 + 2 * w * h;
        json.title = this.readString();
        json.author = this.readString();
        json.copyright = this.readString();
        var across = [];
        var down = [];
        var label = 1;
        for (var i = 0; i < w * h; i++) {
            if (grid[i] == '.') continue;
            var inc = 0;
            if (i % w == 0 || grid[i - 1] == '.') {
                across.push(label + ". " + this.readString());
                inc = 1;
            }
            if (i < w || grid[i - w] == '.') {
                down.push(label + ". " + this.readString());
                inc = 1;
            }
            label += inc;
        }
        json.clues = {across: across, down: down};
        // console.log(json);
        return json;
    }
}

class PuzWriter {
    constructor() {
        this.buf = []
    }

    pad(n) {
        for (var i = 0; i < n; i++) {
            this.buf.push(0);
        }
    }

    writeShort(x) {
        this.buf.push(x & 0xff, (x >> 8) & 0xff);
    }

    setShort(ix, x) {
        this.buf[ix] = x & 0xff;
        this.buf[ix + 1] = (x >> 8) & 0xff;
    }

    writeString(s) {
        if (s === undefined) s = '';
        for (var i = 0; i < s.length; i++) {
            var cp = s.codePointAt(i);
            if (cp < 0x100 && cp > 0) {
                this.buf.push(cp);
            } else {
                // TODO: expose this warning through the UI
                console.log('string "' + s + '" has non-ISO-8859-1 codepoint at offset ' + i);
                this.buf.push('?'.codePointAt(0));
            }
            if (cp >= 0x10000) i++;   // advance by one codepoint
        }
        this.buf.push(0);
    }

    writeHeader(json) {
        this.pad(2); // placeholder for checksum
        this.writeString('ACROSS&DOWN');
        this.pad(2); // placeholder for cib checksum
        this.pad(8); // placeholder for masked checksum
        this.version = '1.3';
        this.writeString(this.version);
        this.pad(2); // probably extra space for version string
        this.writeShort(0);  // scrambled checksum
        this.pad(12);  // reserved
        this.w = json.size.cols;
        this.h = json.size.rows;
        this.buf.push(this.w);
        this.buf.push(this.h);
        this.numClues = json.clues.across.length + json.clues.down.length;
        this.writeShort(this.numClues);
        this.writeShort(1);  // puzzle type
        this.writeShort(0);  // scrambled tag
    }

    writeFill(json) {
        const grid = json.grid;
        const BLACK_CP = '.'.codePointAt(0);
        this.solution = this.buf.length;
        for (var i = 0; i < grid.length; i++) {
            this.buf.push(grid[i].codePointAt(0));  // Note: assumes grid is ISO-8859-1
        }
        this.grid = this.buf.length;
        for (var i = 0; i < grid.length; i++) {
            var cp = grid[i].codePointAt(0);
            if (cp != BLACK_CP) cp = '-'.codePointAt(0);
            this.buf.push(cp);
        }
    }

    writeStrings(json) {
        this.stringStart = this.buf.length;
        this.writeString(json.title);
        this.writeString(json.author);
        this.writeString(json.copyright);
        const across = json.clues.across;
        const down = json.clues.down;
        var clues = [];
        for (var i = 0; i < across.length; i++) {
            const sp = across[i].split('. ');
            clues.push([2 * parseInt(sp[0]), sp[1]]);
        }
        for (var i = 0; i < down.length; i++) {
            const sp = down[i].split('. ');
            clues.push([2 * parseInt(sp[0]) + 1, sp[1]]);
        }
        clues.sort((a, b) => a[0] - b[0]);
        for (var i = 0; i < clues.length; i++) {
            this.writeString(clues[i][1]);
        }
        this.writeString(json.notepad);
    }

    checksumRegion(base, len, cksum) {
        for (var i = 0; i < len; i++) {
            cksum = (cksum >> 1) | ((cksum & 1) << 15);
            cksum = (cksum + this.buf[base + i]) & 0xffff;
        }
        return cksum;
    }

    strlen(ix) {
        var i = 0;
        while (this.buf[ix + i]) i++;
        return i;
    }

    checksumStrings(cksum) {
        let ix = this.stringStart;
        for (var i = 0; i < 3; i++) {
            const len = this.strlen(ix);
            if (len) {
                cksum = this.checksumRegion(ix, len + 1, cksum);
            }
            ix += len + 1;
        }
        for (var i = 0; i < this.numClues; i++) {
            const len = this.strlen(ix);
            cksum = this.checksumRegion(ix, len, cksum);
            ix += len + 1;
        }
        if (this.version == '1.3') {
            const len = this.strlen(ix);
            if (len) {
                cksum = this.checksumRegion(ix, len + 1, cksum);
            }
            ix += len + 1;
        }
        return cksum;
    }

    setMaskedChecksum(i, maskLow, maskHigh, cksum) {
        this.buf[0x10 + i] = maskLow ^ (cksum & 0xff);
        this.buf[0x14 + i] = maskHigh ^ (cksum >> 8);
    }

    computeChecksums() {
        var c_cib = this.checksumRegion(0x2c, 8, 0);
        this.setShort(0xe, c_cib);
        var cksum = this.checksumRegion(this.solution, this.w * this.h, c_cib);
        var cksum = this.checksumRegion(this.grid, this.w * this.h, cksum);
        cksum = this.checksumStrings(cksum);
        this.setShort(0x0, cksum);
        this.setMaskedChecksum(0, 0x49, 0x41, c_cib);
        var c_sol = this.checksumRegion(this.solution, this.w * this.h, 0);
        this.setMaskedChecksum(1, 0x43, 0x54, c_sol);
        var c_grid = this.checksumRegion(this.grid, this.w * this.h, 0);
        this.setMaskedChecksum(2, 0x48, 0x45, c_grid);
        var c_part = this.checksumStrings(0);
        this.setMaskedChecksum(3, 0x45, 0x44, c_part);
    }

    toPuz(json) {
        this.writeHeader(json);
        this.writeFill(json);
        this.writeStrings(json);
        this.computeChecksums();
        return new Uint8Array(this.buf);
    }
}

function openPuzzle() {
    document.getElementById("open-puzzle-input").click();
}

function isPuz(bytes) {
    const magic = 'ACROSS&DOWN';
    for (var i = 0; i < magic.length; i++) {
        if (bytes[2 + i] != magic.charCodeAt(i)) return false;
    }
    return bytes[2 + magic.length] == 0;
}

function openFile(e) {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    try {
        switch (file.name.slice(file.name.lastIndexOf("."))) {
            case ".json":
            case ".xw":
            case ".txt":
                reader.onload = function (e) {
                    convertJSONToPuzzle(JSON.parse(e.target.result));
                };
                reader.readAsText(file); // removing this line breaks the JSON import
                break;
            case ".puz":
                reader.onload = function (e) {
                    const bytes = new Uint8Array(e.target.result);
                    let puz;
                    if (isPuz(bytes)) {
                        puz = new PuzReader(bytes).toJson();
                    } else {
                        puz = JSON.parse(new TextDecoder().decode(bytes)); // TextDecoder doesn't work in Edge 16
                    }
                    convertJSONToPuzzle(puz);
                };
                reader.readAsArrayBuffer(file);
                break;
            default:
                break;
        }
        console.log("Loaded", file.name);
    } catch (err) {
        switch (err.name) {
            case "SyntaxError":
                new Notification("Invalid file. PUZ and JSON puzzle files only.", 10);
                break;
            case "ScrambledError":
                new Notification("Cannot open scrambled PUZ file.", 10);
                break;
            default:
                console.log("Error:", err);
        }
    }
}


function convertJSONToPuzzle(puz) {
    createNewPuzzle();
    if (puz.size.rows != DEFAULT_SIZE || puz.size.cols != DEFAULT_SIZE) {
        new Notification("Oops. Can only open 15 x 15 puzzles.", 10);
        return;
    }
    xw.rows = DEFAULT_SIZE;
    xw.cols = DEFAULT_SIZE;
    // Update puzzle title, author
    xw.title = puz.title || DEFAULT_TITLE;
    if (puz.title.slice(0, 8).toUpperCase() == "NY TIMES") {
        xw.title = "NYT Crossword";
    }
    xw.author = puz.author || DEFAULT_AUTHOR;
    // Update fill
    new_fill = [];
    for (let i = 0; i < xw.rows; i++) {
        new_fill.push("");
        for (let j = 0; j < xw.cols; j++) {
            const k = (i * xw.rows) + j;
            new_fill[i] += (puz.grid[k].length > 1) ? puz.grid[k][0].toUpperCase() : puz.grid[k].toUpperCase(); // Strip rebus answers to their first letter
        }
    }
    xw.fill = new_fill;
    isMutated = true;

    updateGridUI();
    updateLabelsAndClues();
    // Load in clues and display current clues
    for (let i = 0; i < xw.rows; i++) {
        for (let j = 0; j < xw.cols; j++) {
            const activeCell = grid.querySelector('[data-row="' + i + '"]').querySelector('[data-col="' + j + '"]');
            if (activeCell.firstChild.innerHTML) {
                const label = activeCell.firstChild.innerHTML + ".";
                for (let k = 0; k < puz.clues.across.length; k++) {
                    if (label == puz.clues.across[k].slice(0, label.length)) {
                        xw.clues[[i, j, ACROSS]] = puz.clues.across[k].slice(label.length).trim();
                    }
                }
                for (let l = 0; l < puz.clues.down.length; l++) {
                    if (label == puz.clues.down[l].slice(0, label.length)) {
                        xw.clues[[i, j, DOWN]] = puz.clues.down[l].slice(label.length).trim();
                    }
                }
            }
        }
    }
    updateUI();
}

function writeFile(format) {
    let filename = xw.title + "." + format;
    let serialized = convertPuzzleToJSON();
    let fileContents;
    switch (format) {
        case "puz":
            fileContents = new PuzWriter().toPuz(serialized);
            break;
        case "xw":
        case "json":
        default:
            fileContents = JSON.stringify(serialized);  // Convert JS object to JSON text
            break;
    }
    let file = new File([fileContents], filename);
    let puzzleURL = window.URL.createObjectURL(file);

    let puzzleLink = document.getElementById("download-puzzle-link");
    puzzleLink.setAttribute("href", puzzleURL);
    puzzleLink.setAttribute("download", filename);
    puzzleLink.click();
}

function convertPuzzleToJSON() {
    let puz = {};
    puz["author"] = xw.author;
    puz["title"] = xw.title;
    puz["size"] = {
        "rows": xw.rows,
        "cols": xw.cols
    };
    // Translate clues to standard JSON puzzle format
    puz["clues"] = {
        "across": [],
        "down": []
    };
    for (const key in xw.clues) {
        const location = key.split(",");
        const label = grid.querySelector('[data-row="' + location[0] + '"]').querySelector('[data-col="' + location[1] + '"]').firstChild.innerHTML;
        if (label) {
            if (location[2] == ACROSS) {
                puz.clues.across.push(label + ". " + xw.clues[location]);
            } else {
                puz.clues.down.push(label + ". " + xw.clues[location]);
            }
        }
    }
    // Read grid
    puz["grid"] = [];
    for (let i = 0; i < xw.rows; i++) {
        for (let j = 0; j < xw.cols; j++) {
            puz.grid.push(xw.fill[i][j]);
        }
    }
    return puz;
}

function convertPuzzleToArweaveJSON() {
    let puzzle = convertPuzzleToJSON()
    let solution = puzzle['grid'].join('')
    let grid = puzzle['grid']
    for (let i = 0; i < grid.length; i++) {
        grid[i] = grid[i].replace(/[^.]/g, ' ');
    }
    puzzle['grid'] = grid
    return [puzzle, solution]
}

function printPDF(style) {
    let doc = new jsPDF('p', 'pt');
    if (style) {
        style = style.toUpperCase();
    }
    switch (style) {
        case "NYT":
            layoutPDFGrid(doc, 117, 210, true); // filled
            doc.addPage();
            layoutPDFGrid(doc, 117, 210); // unfilled
            doc.addPage();
            layoutPDFClues(doc, style);
            if (!layoutPDFInfo(doc, style)) {
                return;
            }
            break;
        default:
            layoutPDFGrid(doc, 50, 80);
            layoutPDFClues(doc);
            layoutPDFInfo(doc);
            break;
    }
    doc.save(xw.title + ".pdf"); // Generate PDF and automatically download it
}

function generatePDFClues() {
    let acrossClues = [], downClues = [];
    let byLabel = // this variable is a whole function...
        function (a, b) { // that is called when sort() compares values
            if (a["label"] > b["label"]) {
                return 1;
            } else if (a["label"] < b["label"]) {
                return -1;
            } else {
                return 0;
            }
        };

    for (const key in xw.clues) {
        let [i, j, direction] = key.split(",");
        const cell = grid.querySelector('[data-row="' + i + '"]').querySelector('[data-col="' + j + '"]');
        let label = Number(cell.firstChild.innerHTML);
        if (direction == ACROSS) {
            // acrossClues.push([label, xw.clues[key], getWordAt(i, j, direction)]);
            // acrossClues.sort(byLabel);
            acrossClues.push({"label": label, "clue": xw.clues[key], "answer": getWordAt(i, j, direction)});
            acrossClues.sort(byLabel);
        } else {
            downClues.push({"label": label, "clue": xw.clues[key], "answer": getWordAt(i, j, direction)});
            downClues.sort(byLabel);
        }
    }
    return [acrossClues, downClues];
}

function layoutPDFGrid(doc, x, y, isFilled) {
    let format = {
        "squareSize": 24,
        // "pageOrigin":     { "x": 50, "y": 50 },
        "gridOrigin": {"x": x, "y": y},
        "labelOffset": {"x": 1, "y": 6},
        "fillOffset": {"x": 12, "y": 17},
        "labelFontSize": 7,
        "fillFontSize": 14,
        "innerLineWidth": .5,
        "outerLineWidth": 2
    };
    // Draw grid
    doc.setDrawColor(0);
    doc.setLineWidth(format.outerLineWidth);
    doc.rect(format.gridOrigin.x, format.gridOrigin.y,
        xw.rows * format.squareSize, xw.cols * format.squareSize, 'D');
    doc.setLineWidth(format.innerLineWidth);
    for (let i = 0; i < xw.rows; i++) {
        for (let j = 0; j < xw.cols; j++) {
            doc.setFillColor(xw.fill[i][j] == BLACK ? 0 : 255);
            doc.rect(format.gridOrigin.x + (j * format.squareSize),
                format.gridOrigin.y + (i * format.squareSize), format.squareSize, format.squareSize, 'FD');
        }
    }
    // Label grid
    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(format.labelFontSize);
    for (let i = 0; i < xw.rows; i++) {
        for (let j = 0; j < xw.cols; j++) {
            const square = grid.querySelector('[data-row="' + i + '"]').querySelector('[data-col="' + j + '"]');
            const label = square.firstChild.innerHTML;
            if (label) {
                doc.text(format.gridOrigin.x + (j * format.squareSize) + format.labelOffset.x,
                    format.gridOrigin.y + (i * format.squareSize) + format.labelOffset.y, label);
            }
        }
    }
    // Fill grid
    if (isFilled) {
        doc.setFontSize(format.fillFontSize);
        for (let i = 0; i < xw.rows; i++) {
            for (let j = 0; j < xw.cols; j++) {
                doc.text(format.gridOrigin.x + (j * format.squareSize) + format.fillOffset.x,
                    format.gridOrigin.y + (i * format.squareSize) + format.fillOffset.y,
                    xw.fill[i][j], null, null, "center");
            }
        }
    }
}

function layoutPDFInfo(doc, style) {
    doc.setFont("helvetica");
    switch (style) {
        case "NYT":
            let email = prompt("NYT submissions require an email address. \nLeave blank to omit.");
            if (email == null) {
                return null;
            }
            let address = prompt("NYT submissions also require a mailing address. \nLeave blank to omit.");
            if (address == null) {
                return null;
            }
            doc.setFontSize(9);
            for (let i = 1; i <= 5; i++) {
                doc.setPage(i);
                doc.text(doc.internal.pageSize.width / 2, 40,
                    (xw.author + "\n\n" + email + (email ? "      " : "") + address),
                    null, null, "center");
                doc.setLineWidth(0.5);
                doc.line(0 + 150, 48, doc.internal.pageSize.width - 150, 48);
            }
            break;
        default:
            doc.setFontSize(18);
            doc.setFontType("normal");
            doc.text(50, 50 + 8, xw.title);
            doc.setFontSize(9);
            doc.setFontType("bold");
            doc.text(50, 50 + 20, xw.author.toUpperCase());
            break;
    }
    return 1;
}

function layoutPDFClues(doc, style) {
    const [acrossClues, downClues] = generatePDFClues();

    switch (style) {
        case "NYT":
            let clueFormat =
                {
                    columnStyles: {
                        label: {columnWidth: 20, halign: "right", overflow: "visible"},
                        clue: {columnWidth: 320, overflow: "linebreak"},
                        answer: {columnWidth: 120, font: "courier", overflow: "visible", fontSize: 11}
                    },
                    margin: {top: 75, left: 75}
                };
            doc.autoTableSetDefaults({
                headerStyles: {fillColor: false, textColor: 0, fontSize: 16, fontStyle: "normal", overflow: "visible"},
                bodyStyles: {fillColor: false, textColor: 0, fontSize: 10, cellPadding: 6},
                alternateRowStyles: {fillColor: false}
            });
            // Print across clues
            doc.autoTable([{title: "Across", dataKey: "label"},
                {title: "", dataKey: "clue"},
                {title: "", dataKey: "answer"}
            ], acrossClues, clueFormat);
            // Print down clues
            clueFormat["startY"] = doc.autoTable.previous.finalY + 10;
            doc.autoTable([{title: "Down", dataKey: "label"},
                {title: "", dataKey: "clue"},
                {title: "", dataKey: "answer"}
            ], downClues, clueFormat);
            break;
        default:
            const format = {
                "font": "helvetica",
                "fontSize": 9,
                "labelWidth": 13,
                "clueWidth": 94,
                "columnSeparator": 18,
                "marginTop": [465, 465, 465, 85],
                "marginBottom": doc.internal.pageSize.height - 50,
                "marginLeft": 50,
                "marginRight": 0
            };
            doc.setFont(format.font);
            doc.setFontSize(format.fontSize);
            let currentColumn = 0;
            let x = format.marginLeft;
            let y = format.marginTop[currentColumn];
            const acrossTitle = [{"label": "ACROSS", "clue": " "}];
            const downTitle = [{"label": " ", "clue": " "}, {"label": "DOWN", "clue": " "}];
            let allClues = acrossTitle.concat(acrossClues).concat(downTitle).concat(downClues);
            for (let i = 0; i < allClues.length; i++) { // Position clue on page
                const clueText = doc.splitTextToSize(allClues[i].clue, format.clueWidth);
                let adjustY = clueText.length * (format.fontSize + 2);
                if (y + adjustY > format.marginBottom) {
                    currentColumn++;
                    x += format.labelWidth + format.clueWidth + format.columnSeparator;
                    y = format.marginTop[currentColumn];
                }
                if (["across", "down"].includes(String(allClues[i].label).toLowerCase())) { // Make Across, Down headings bold
                    doc.setFontType("bold");
                } else {
                    doc.setFontType("normal");
                }
                doc.text(x, y, String(allClues[i].label)); // Print clue on page
                doc.text(x + format.labelWidth, y, clueText);
                y += adjustY;
            }
            break;
    }
}

let openPuzzleInput = document.getElementById('open-puzzle-input');
openPuzzleInput.addEventListener('change', openFile, false);
openPuzzleInput.onclick = function () {
    this.value = null;
};


// Phil
// ------------------------------------------------------------------------
// Copyright 2017 Keiran King

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// (https://www.apache.org/licenses/LICENSE-2.0)

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ------------------------------------------------------------------------

const patterns = [
    [
        [0, 4], [1, 4], [2, 4], [12, 4], [13, 4], [14, 4],
        [4, 0], [4, 1], [4, 2], [4, 12], [4, 13], [4, 14],
        [8, 3], [7, 4], [6, 5], [5, 6], [4, 7], [3, 8]
    ],
    [
        [0, 4], [1, 4], [2, 4], [12, 4], [13, 4], [14, 4],
        [6, 0], [10, 0], [6, 1], [10, 1], [10, 2], [8, 4],
        [5, 3], [9, 3], [4, 5], [11, 5], [6, 6], [7, 7]
    ],
    [
        [0, 5], [1, 5], [2, 5], [12, 4], [13, 4], [14, 4],
        [5, 0], [5, 1], [5, 2], [4, 3], [3, 13], [3, 14],
        [5, 6], [4, 7], [4, 8], [6, 9], [7, 10], [5, 11]
    ]
];
console.log("Loaded", patterns.length, "patterns.");


"use strict";

function _classPrivateMethodInitSpec(t, e) {
    _checkPrivateRedeclaration(t, e), e.add(t)
}

function _defineProperty(t, e, s) {
    return e in t ? Object.defineProperty(t, e, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = s, t
}

function _classPrivateMethodGet(t, e, s) {
    if (!e.has(t)) throw new TypeError("attempted to get private field on non-instance");
    return s
}

function _classPrivateFieldInitSpec(t, e, s) {
    _checkPrivateRedeclaration(t, e), e.set(t, s)
}

function _checkPrivateRedeclaration(t, e) {
    if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
}

function _classPrivateFieldSet(t, e, s) {
    return _classApplyDescriptorSet(t, _classExtractFieldDescriptor(t, e, "set"), s), s
}

function _classApplyDescriptorSet(t, e, s) {
    if (e.set) e.set.call(t, s); else {
        if (!e.writable) throw new TypeError("attempted to set read only private field");
        e.value = s
    }
}

function _classPrivateFieldGet(t, e) {
    return _classApplyDescriptorGet(t, _classExtractFieldDescriptor(t, e, "get"))
}

function _classExtractFieldDescriptor(t, e, s) {
    if (!e.has(t)) throw new TypeError("attempted to " + s + " private field on non-instance");
    return e.get(t)
}

function _classApplyDescriptorGet(t, e) {
    return e.get ? e.get.call(t) : e.value
}

var _count = new WeakMap;

class Modal {
    constructor() {
        _classPrivateFieldInitSpec(this, _count, {writable: !0, value: 0})
    }

    show({
             type: t,
             title: e = "",
             content: s = "",
             buttons: a = [],
             centered: o = !1,
             dismissible: i = !0,
             backdrop: n = !!i || "static",
             keyboard: r = i,
             focus: l = !0,
             fullscreen: d = !1,
             size: c = ""
         }) {
        _classPrivateFieldSet(this, _count, 1 + +_classPrivateFieldGet(this, _count)), c = ["sm", "lg", "xl"].includes(c) ? `modal-${c}` : "", d = d ? "modal-fullscreen" : "", o = o ? "modal-dialog-centered modal-dialog-scrollable" : "";
        const b = Bs5Utils.defaults.styles[t], u = b.btnClose.join(" "), m = b.border,
            h = document.createElement("div");
        h.setAttribute("id", `modal-${_classPrivateFieldGet(this, _count)}`), h.setAttribute("tabindex", "-1"), h.classList.add("modal");
        let p = "", v = [];
        Array.isArray(a) && a.length && (p += `<div class="modal-footer ${m.join(" ")}">`, a.forEach((t, e) => {
            switch (t.type || "button") {
                case"dismiss":
                    p += `<button type="button" class="${t.class}" data-bs-dismiss="modal">${t.text}</button>`;
                    break;
                default:
                    let s = `modal-${_classPrivateFieldGet(this, _count)}-button-${e}`;
                    p += `<button type="button" id="${s}" class="${t.class}">${t.text}</button>`, t.hasOwnProperty("handler") && "function" == typeof t.handler && v.push({
                        id: s,
                        handler: t.handler
                    })
            }
        }), p += "</div>"), h.innerHTML = ` <div class="modal-dialog ${o} ${d} ${c}">\n                                <div class="modal-content border-0">\n                                  ${e.length ? `<div class="modal-header border-0 ${b.main.join(" ")}">\n                                    <h5 class="modal-title">${e}</h5>\n                                    ${i ? `<button type="button" class="btn-close ${u}" data-bs-dismiss="modal" aria-label="Close"></button>` : ""}\n                                  </div>` : ""}\n                                  ${s.length ? `<div class="modal-body">${s}</div>` : ""}\n                                  ${p}\n                                </div>\n                              </div>`, document.body.appendChild(h), h.addEventListener("hidden.bs.modal", function (t) {
            t.target.remove()
        }), v.forEach(t => {
            document.getElementById(t.id).addEventListener("click", t.handler)
        });
        const f = {backdrop: n, keyboard: r, focus: l}, y = new bootstrap.Modal(h, f);
        return y.show(), y
    }
}

var _count2 = new WeakMap;

class Snack {
    constructor() {
        _classPrivateFieldInitSpec(this, _count2, {writable: !0, value: 0})
    }

    show(t, e, s = 0, a = !0) {
        _classPrivateFieldSet(this, _count2, 1 + +_classPrivateFieldGet(this, _count2));
        const o = Bs5Utils.defaults.styles[t], i = o.btnClose.join(" "), n = document.createElement("div");
        n.classList.add("toast", "align-items-center", "border-1", "border-dark"), o.main.forEach(t => {
            n.classList.add(t)
        }), n.setAttribute("id", `snack-${_classPrivateFieldGet(this, _count2)}`), n.setAttribute("role", "alert"), n.setAttribute("aria-live", "assertive"), n.setAttribute("aria-atomic", "true"), n.innerHTML = `<div class="d-flex">\n                        <div class="toast-body">${e}</div>\n                        ${a ? `<button type="button" class="btn-close ${i} me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>` : ""}\n                      </div>`, Bs5Utils.defaults.toasts.stacking || document.querySelectorAll(`#${Bs5Utils.defaults.toasts.container} .toast`).forEach(t => {
            t.remove()
        }), document.querySelector(`#${Bs5Utils.defaults.toasts.container}`).appendChild(n), n.addEventListener("hidden.bs.toast", function (t) {
            t.target.remove()
        });
        const r = {autohide: s > 0 && "number" == typeof s};
        s > 0 && "number" == typeof s && (r.delay = s);
        const l = new bootstrap.Toast(n, r);
        return l.show(), l
    }
}

var _count3 = new WeakMap;

class Toast {
    constructor() {
        _classPrivateFieldInitSpec(this, _count3, {writable: !0, value: 0})
    }

    show({
             type: t,
             icon: e = "",
             title: s,
             subtitle: a = "",
             content: o = "",
             buttons: i = [],
             delay: n = 0,
             dismissible: r = !0
         }) {
        _classPrivateFieldSet(this, _count3, 1 + +_classPrivateFieldGet(this, _count3));
        const l = Bs5Utils.defaults.styles[t], d = l.btnClose.join(" "), c = l.border,
            b = document.createElement("div");
        b.setAttribute("id", `toast-${_classPrivateFieldGet(this, _count3)}`), b.setAttribute("role", "alert"), b.setAttribute("aria-live", "assertive"), b.setAttribute("aria-atomic", "true"), b.classList.add("toast", "align-items-center"), c.forEach(t => {
            b.classList.add(t)
        });
        let u = "", m = [];
        Array.isArray(i) && i.length && (u += `<div class="d-flex justify-content-center mt-2 pt-2 border-top ${c.join(" ")}">`, i.forEach((t, e) => {
            switch (t.type || "button") {
                case"dismiss":
                    u += `<button type="button" class="${t.class}" data-bs-dismiss="toast">${t.text}</button>&nbsp;`;
                    break;
                default:
                    let s = `toast-${_classPrivateFieldGet(this, _count3)}-button-${e}`;
                    u += `<button type="button" id="${s}" class="${t.class}">${t.text}</button>&nbsp;`, t.hasOwnProperty("handler") && "function" == typeof t.handler && m.push({
                        id: s,
                        handler: t.handler
                    })
            }
        }), u += "</div>"), b.innerHTML = `<div class="toast-header ${l.main.join(" ")}">\n                            ${e}\n                            <strong class="me-auto">${s}</strong>\n                            <small>${a}</small>\n                            ${r ? `<button type="button" class="btn-close ${d}" data-bs-dismiss="toast" aria-label="Close"></button>` : ""}\n                        </div>\n                        <div class="toast-body">\n                            ${o}\n                            ${u}\n                        </div>`, Bs5Utils.defaults.toasts.stacking || document.querySelectorAll(`#${Bs5Utils.defaults.toasts.container} .toast`).forEach(t => {
            t.remove()
        }), document.querySelector(`#${Bs5Utils.defaults.toasts.container}`).appendChild(b), b.addEventListener("hidden.bs.toast", function (t) {
            t.target.remove()
        }), m.forEach(t => {
            document.getElementById(t.id).addEventListener("click", t.handler)
        });
        const h = {autohide: n > 0 && "number" == typeof n};
        n > 0 && "number" == typeof n && (h.delay = n);
        const p = new bootstrap.Toast(b, h);
        return p.show(), p
    }
}

var _createToastContainer = new WeakSet;

class Bs5Utils {
    constructor() {
        _classPrivateMethodInitSpec(this, _createToastContainer), _classPrivateMethodGet(this, _createToastContainer, _createToastContainer2).call(this), this.Toast = new Toast, this.Snack = new Snack, this.Modal = new Modal
    }

    static registerStyle(t, e) {
        if ("object" != typeof e && Array.isArray(e)) throw"The styles parameter must be an object when you register component style.";
        Bs5Utils.defaults.styles[t] = e
    }
}

function _createToastContainer2() {
    let t = document.querySelector(`#${Bs5Utils.defaults.toasts.container}`);
    if (!t) {
        const e = {
            "top-left": "top-0 start-0 ms-1 mt-1",
            "top-center": "top-0 start-50 translate-middle-x mt-1",
            "top-right": "top-0 end-0 me-1 mt-1",
            "middle-left": "top-50 start-0 translate-middle-y ms-1",
            "middle-center": "top-50 start-50 translate-middle p-3",
            "middle-right": "top-50 end-0 translate-middle-y me-1",
            "bottom-left": "bottom-0 start-0 ms-1 mb-1",
            "bottom-center": "bottom-0 start-50 translate-middle-x mb-1",
            "bottom-right": "bottom-0 end-0 me-1 mb-1"
        };
        (t = document.createElement("div")).classList.add("position-relative"), t.setAttribute("aria-live", "polite"), t.setAttribute("aria-atomic", "true"), t.innerHTML = `<div id="${Bs5Utils.defaults.toasts.container}" class="toast-container position-fixed pb-1 ${e[Bs5Utils.defaults.toasts.position] || e["top-right"]}"></div>`, document.body.appendChild(t)
    }
}

_defineProperty(Bs5Utils, "defaults", {
    toasts: {position: "top-right", container: "toast-container", stacking: !0},
    styles: {
        secondary: {
            btnClose: ["btn-close-white"],
            main: ["text-white", "bg-secondary"],
            border: ["border-secondary"]
        },
        light: {btnClose: [], main: ["text-dark", "bg-light", "border-bottom", "border-dark"], border: ["border-dark"]},
        white: {btnClose: [], main: ["text-dark", "bg-white", "border-bottom", "border-dark"], border: ["border-dark"]},
        dark: {btnClose: ["btn-close-white"], main: ["text-white", "bg-dark"], border: ["border-dark"]},
        info: {btnClose: ["btn-close-white"], main: ["text-white", "bg-info"], border: ["border-info"]},
        primary: {btnClose: ["btn-close-white"], main: ["text-white", "bg-primary"], border: ["border-primary"]},
        success: {btnClose: ["btn-close-white"], main: ["text-white", "bg-success"], border: ["border-success"]},
        warning: {btnClose: ["btn-close-white"], main: ["text-white", "bg-warning"], border: ["border-warning"]},
        danger: {btnClose: ["btn-close-white"], main: ["text-white", "bg-danger"], border: ["border-danger"]}
    }
});

Bs5Utils.defaults.toasts.position = 'top-center';
Bs5Utils.defaults.toasts.container = 'toast-container';
Bs5Utils.defaults.toasts.stacking = false;

const bs5Utils = new Bs5Utils();
const MIN_BALANCE = 100000000

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

var puzzle_id = getUrlParam('show_puzzle', '')
if (puzzle_id) {
    show_puzzle(puzzle_id)
}
var selected_puzzle = ''

function show_puzzle_by_file_id(file_id, key) {
    document.getElementById('puzzle-loading').style.display = '';
    selected_puzzle = key
    arweave.transactions.getData(file_id
        , {decode: true, string: true}).then((result) => {
        if (result != null) {
            convertJSONToPuzzle(JSON.parse(result));
        }
    }).catch(err => {
        bs5Utils.Snack.show('light', "Error: Can't get the puzzle from Arweave network.", 5000, true);
        console.log(err);
    }).finally(() => document.getElementById('puzzle-loading').style.display = 'none')
}


//Arweave Part

function showPuzzles() {
    function addPuzzlesToPage(puzzles, puzzle_keys) {
        let elements = document.getElementsByClassName('puzzle-list-item');
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        let puzzles_container = document.getElementById('puzzles-list')

        for (let i = 0; i < puzzle_keys.length; i++) {
            let key = puzzle_keys[i]
            let a = document.createElement('a');
            a.href = "#"
            a.id = key
            a.className = "list-group-item list-group-item-action py-3 lh-tight puzzle-list-item"
            a.setAttribute("onclick", "show_puzzle_by_file_id('" + puzzles[key]['file_id'] + "','" + key + "');");

            let div = document.createElement('div');
            let div2 = document.createElement('div');
            div.class = "flex-column bd-highlight w-100 align-items-center justify-content-between";
            div.innerHTML = '<strong class="mb-1"> prize:' + puzzles[key]['prize'] + ' CWT</strong>' +
                '<small> winner:' + (puzzles[key]['winner'] || '<b>-</b>') + '</small>';
            div2.class = 'col-12 mb-1 small';
            div2.innerHTML = '<small>id:' + key + '</small>';
            // div2.innerHTML = puzzles[key]['creator'];

            a.appendChild(div);
            a.appendChild(div2);
            puzzles_container.appendChild(a);
        }
    }

    if (isLogin()) {
        document.getElementById('show-puzzles-btn-loading').style.display = '';
        document.getElementById('show-puzzles-btn').style.display = 'none';
        list_puzzles().then((result) => {
            if (result != null) {
                let puzzles = result;
                let puzzle_keys = Object.keys(puzzles);
                addPuzzlesToPage(puzzles, puzzle_keys)

                var myOffcanvas = document.getElementById('offcanvasScrolling')
                var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
                bsOffcanvas.show()
            }
        }).catch(err => console.log(err)).finally(() => {
            document.getElementById('show-puzzles-btn-loading').style.display = 'none';
            document.getElementById('show-puzzles-btn').style.display = '';
        })
    }
}

function isLogin() {
    if (is_signed_in()) {
        return true;
    } else {
        var toastLogin = document.getElementById('liveToast')
        var toast = new bootstrap.Toast(toastLogin)
        toast.show()
        return false;
    }
}

function openWalletFile(e) {
    var myModalEl = document.getElementById('loginModal')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    try {

        switch (file.name.slice(file.name.lastIndexOf("."))) {
            case ".json":
                reader.onload = function (e) {
                    document.getElementById('login-loading-btn').style.display = '';
                    document.getElementById('login-btn').style.display = 'none';
                    player_key = JSON.parse(e.target.result);
                    arweave.wallets.jwkToAddress(player_key).then(function (address) {
                        player_address = address;
                        console.log('Your address: ', address);
                        document.getElementById('loginBtnTxt').innerText = address;
                        arweave.wallets.getBalance(address).then(function (balance) {
                            console.log('Your balance: ', balance);
                            if (balance < MIN_BALANCE) {
                                bs5Utils.Snack.show('light', "Not enough balance to submit a solution.", 0, true);
                            }
                            player_balance = balance;
                        }).finally(() => {
                            document.getElementById('login-loading-btn').style.display = 'none';
                            document.getElementById('login-btn').style.display = '';
                        })
                    });
                };
                reader.readAsText(file);
                break;
            default:
                break;
        }
        console.log("Wallet Loaded", file.name);
    } catch (err) {
        switch (err.name) {
            case "SyntaxError":
                bs5Utils.Snack.show('light', "Invalid Wallet file.  JSON Wallet files only.", 10000, true);
                break;
            default:
                console.log("Error:", err);
        }
    }

}

let openWalletInput = document.getElementById('open-wallet-input');
openWalletInput.addEventListener('change', openWalletFile, false);


function create_puzzle_arweave() {

    if (isLogin()) {
        let prize = parseInt(prompt("Enter the puzzle prize (CrossWeave Token, CWT)", "0"));
        if (isNaN(prize)) {
            bs5Utils.Snack.show('light', "Publish failed, The prize must be integer, please try again.", 10000, true);
            return false;
        }
        let puzzle_data = convertPuzzleToArweaveJSON();
        let puzzle_serialized = puzzle_data[0];
        let puzzle_solution = puzzle_data[1];
        if (/\s/.test(puzzle_solution)) {
            bs5Utils.Snack.show('light', "You can't publish a puzzle without solution.", 10000, true);
            return false;
        }
        let puzzle = JSON.stringify(puzzle_serialized);
        document.getElementById('publish-loading').style.display = '';
        create_puzzle(puzzle, puzzle_solution, prize).then(r => {
                if (r == true) {
                    bs5Utils.Snack.show('light', "Puzzle published successfully, It takes a few minutes for your puzzle to be listed.", 0, true);
                } else {
                    bs5Utils.Snack.show('light', "failed to publish puzzle.", 10000, true);
                }
            }
        ).catch(err => console.log(err)).finally(() => {
            document.getElementById('publish-loading').style.display = 'none';
        })
    }

}

function send_puzzle_solution() {

    if (isLogin()) {
        if (player_balance < MIN_BALANCE) {
            bs5Utils.Snack.show('light', "Not enough balance to submit a solution.", 0, true);
            return false;
        }
        if (len(selected_puzzle) == 0) {
            bs5Utils.Snack.show('light', "First choose a puzzle from puzzle lists by using \"Show Puzzles\" button.", 0, true);
            return false;
        }

        let puzzle_data = convertPuzzleToArweaveJSON();
        let puzzle_solution = puzzle_data[1];
        if (/\s/.test(puzzle_solution)) {
            bs5Utils.Snack.show('light', "Your solution is incomplete, Please fill all squares and try again.", 10000, true);
            return false;
        }

        document.getElementById('send-puzzle-btn-loading').style.display = '';
        document.getElementById('send-puzzle-btn').style.display = 'none';
        submit_solution(selected_puzzle, puzzle_solution).then(r =>
            console.log(r)).catch(err => console.log(err)).finally(() => {
            document.getElementById('send-puzzle-btn-loading').style.display = 'none';
            document.getElementById('send-puzzle-btn').style.display = '';
        })
    }

}