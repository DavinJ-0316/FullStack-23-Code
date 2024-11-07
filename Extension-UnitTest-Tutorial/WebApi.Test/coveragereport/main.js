/* Chartist.js 0.11.4
 * Copyright © 2019 Gion Kunz
 * Free to use under either the WTFPL license or the MIT license.
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
 */

!function (a, b) {
    "function" == typeof define && define.amd ? define("Chartist", [], function () {
        return a.Chartist = b()
    }) : "object" == typeof module && module.exports ? module.exports = b() : a.Chartist = b()
}(this, function () {
    var a = {version: "0.11.4"};
    return function (a, b) {
        "use strict";
        var c = a.window, d = a.document;
        b.namespaces = {
            svg: "http://www.w3.org/2000/svg",
            xmlns: "http://www.w3.org/2000/xmlns/",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            ct: "http://gionkunz.github.com/chartist-js/ct"
        }, b.noop = function (a) {
            return a
        }, b.alphaNumerate = function (a) {
            return String.fromCharCode(97 + a % 26)
        }, b.extend = function (a) {
            var c, d, e;
            for (a = a || {}, c = 1; c < arguments.length; c++) {
                d = arguments[c];
                for (var f in d) e = d[f], "object" != typeof e || null === e || e instanceof Array ? a[f] = e : a[f] = b.extend(a[f], e)
            }
            return a
        }, b.replaceAll = function (a, b, c) {
            return a.replace(new RegExp(b, "g"), c)
        }, b.ensureUnit = function (a, b) {
            return "number" == typeof a && (a += b), a
        }, b.quantity = function (a) {
            if ("string" == typeof a) {
                var b = /^(\d+)\s*(.*)$/g.exec(a);
                return {value: +b[1], unit: b[2] || void 0}
            }
            return {value: a}
        }, b.querySelector = function (a) {
            return a instanceof Node ? a : d.querySelector(a)
        }, b.times = function (a) {
            return Array.apply(null, new Array(a))
        }, b.sum = function (a, b) {
            return a + (b ? b : 0)
        }, b.mapMultiply = function (a) {
            return function (b) {
                return b * a
            }
        }, b.mapAdd = function (a) {
            return function (b) {
                return b + a
            }
        }, b.serialMap = function (a, c) {
            var d = [], e = Math.max.apply(null, a.map(function (a) {
                return a.length
            }));
            return b.times(e).forEach(function (b, e) {
                var f = a.map(function (a) {
                    return a[e]
                });
                d[e] = c.apply(null, f)
            }), d
        }, b.roundWithPrecision = function (a, c) {
            var d = Math.pow(10, c || b.precision);
            return Math.round(a * d) / d
        }, b.precision = 8, b.escapingMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }, b.serialize = function (a) {
            return null === a || void 0 === a ? a : ("number" == typeof a ? a = "" + a : "object" == typeof a && (a = JSON.stringify({data: a})), Object.keys(b.escapingMap).reduce(function (a, c) {
                return b.replaceAll(a, c, b.escapingMap[c])
            }, a))
        }, b.deserialize = function (a) {
            if ("string" != typeof a) return a;
            a = Object.keys(b.escapingMap).reduce(function (a, c) {
                return b.replaceAll(a, b.escapingMap[c], c)
            }, a);
            try {
                a = JSON.parse(a), a = void 0 !== a.data ? a.data : a
            } catch (c) {
            }
            return a
        }, b.createSvg = function (a, c, d, e) {
            var f;
            return c = c || "100%", d = d || "100%", Array.prototype.slice.call(a.querySelectorAll("svg")).filter(function (a) {
                return a.getAttributeNS(b.namespaces.xmlns, "ct")
            }).forEach(function (b) {
                a.removeChild(b)
            }), f = new b.Svg("svg").attr({
                width: c,
                height: d
            }).addClass(e), f._node.style.width = c, f._node.style.height = d, a.appendChild(f._node), f
        }, b.normalizeData = function (a, c, d) {
            var e, f = {raw: a, normalized: {}};
            return f.normalized.series = b.getDataArray({series: a.series || []}, c, d), e = f.normalized.series.every(function (a) {
                return a instanceof Array
            }) ? Math.max.apply(null, f.normalized.series.map(function (a) {
                return a.length
            })) : f.normalized.series.length, f.normalized.labels = (a.labels || []).slice(), Array.prototype.push.apply(f.normalized.labels, b.times(Math.max(0, e - f.normalized.labels.length)).map(function () {
                return ""
            })), c && b.reverseData(f.normalized), f
        }, b.safeHasProperty = function (a, b) {
            return null !== a && "object" == typeof a && a.hasOwnProperty(b)
        }, b.isDataHoleValue = function (a) {
            return null === a || void 0 === a || "number" == typeof a && isNaN(a)
        }, b.reverseData = function (a) {
            a.labels.reverse(), a.series.reverse();
            for (var b = 0; b < a.series.length; b++) "object" == typeof a.series[b] && void 0 !== a.series[b].data ? a.series[b].data.reverse() : a.series[b] instanceof Array && a.series[b].reverse()
        }, b.getDataArray = function (a, c, d) {
            function e(a) {
                if (b.safeHasProperty(a, "value")) return e(a.value);
                if (b.safeHasProperty(a, "data")) return e(a.data);
                if (a instanceof Array) return a.map(e);
                if (!b.isDataHoleValue(a)) {
                    if (d) {
                        var c = {};
                        return "string" == typeof d ? c[d] = b.getNumberOrUndefined(a) : c.y = b.getNumberOrUndefined(a), c.x = a.hasOwnProperty("x") ? b.getNumberOrUndefined(a.x) : c.x, c.y = a.hasOwnProperty("y") ? b.getNumberOrUndefined(a.y) : c.y, c
                    }
                    return b.getNumberOrUndefined(a)
                }
            }

            return a.series.map(e)
        }, b.normalizePadding = function (a, b) {
            return b = b || 0, "number" == typeof a ? {
                top: a,
                right: a,
                bottom: a,
                left: a
            } : {
                top: "number" == typeof a.top ? a.top : b,
                right: "number" == typeof a.right ? a.right : b,
                bottom: "number" == typeof a.bottom ? a.bottom : b,
                left: "number" == typeof a.left ? a.left : b
            }
        }, b.getMetaData = function (a, b) {
            var c = a.data ? a.data[b] : a[b];
            return c ? c.meta : void 0
        }, b.orderOfMagnitude = function (a) {
            return Math.floor(Math.log(Math.abs(a)) / Math.LN10)
        }, b.projectLength = function (a, b, c) {
            return b / c.range * a
        }, b.getAvailableHeight = function (a, c) {
            return Math.max((b.quantity(c.height).value || a.height()) - (c.chartPadding.top + c.chartPadding.bottom) - c.axisX.offset, 0)
        }, b.getHighLow = function (a, c, d) {
            function e(a) {
                if (void 0 !== a) if (a instanceof Array) for (var b = 0; b < a.length; b++) e(a[b]); else {
                    var c = d ? +a[d] : +a;
                    g && c > f.high && (f.high = c), h && c < f.low && (f.low = c)
                }
            }

            c = b.extend({}, c, d ? c["axis" + d.toUpperCase()] : {});
            var f = {
                high: void 0 === c.high ? -Number.MAX_VALUE : +c.high,
                low: void 0 === c.low ? Number.MAX_VALUE : +c.low
            }, g = void 0 === c.high, h = void 0 === c.low;
            return (g || h) && e(a), (c.referenceValue || 0 === c.referenceValue) && (f.high = Math.max(c.referenceValue, f.high), f.low = Math.min(c.referenceValue, f.low)), f.high <= f.low && (0 === f.low ? f.high = 1 : f.low < 0 ? f.high = 0 : f.high > 0 ? f.low = 0 : (f.high = 1, f.low = 0)), f
        }, b.isNumeric = function (a) {
            return null !== a && isFinite(a)
        }, b.isFalseyButZero = function (a) {
            return !a && 0 !== a
        }, b.getNumberOrUndefined = function (a) {
            return b.isNumeric(a) ? +a : void 0
        }, b.isMultiValue = function (a) {
            return "object" == typeof a && ("x" in a || "y" in a)
        }, b.getMultiValue = function (a, c) {
            return b.isMultiValue(a) ? b.getNumberOrUndefined(a[c || "y"]) : b.getNumberOrUndefined(a)
        }, b.rho = function (a) {
            function b(a, c) {
                return a % c === 0 ? c : b(c, a % c)
            }

            function c(a) {
                return a * a + 1
            }

            if (1 === a) return a;
            var d, e = 2, f = 2;
            if (a % 2 === 0) return 2;
            do e = c(e) % a, f = c(c(f)) % a, d = b(Math.abs(e - f), a); while (1 === d);
            return d
        }, b.getBounds = function (a, c, d, e) {
            function f(a, b) {
                return a === (a += b) && (a *= 1 + (b > 0 ? o : -o)), a
            }

            var g, h, i, j = 0, k = {high: c.high, low: c.low};
            k.valueRange = k.high - k.low, k.oom = b.orderOfMagnitude(k.valueRange), k.step = Math.pow(10, k.oom), k.min = Math.floor(k.low / k.step) * k.step, k.max = Math.ceil(k.high / k.step) * k.step, k.range = k.max - k.min, k.numberOfSteps = Math.round(k.range / k.step);
            var l = b.projectLength(a, k.step, k), m = l < d, n = e ? b.rho(k.range) : 0;
            if (e && b.projectLength(a, 1, k) >= d) k.step = 1; else if (e && n < k.step && b.projectLength(a, n, k) >= d) k.step = n; else for (; ;) {
                if (m && b.projectLength(a, k.step, k) <= d) k.step *= 2; else {
                    if (m || !(b.projectLength(a, k.step / 2, k) >= d)) break;
                    if (k.step /= 2, e && k.step % 1 !== 0) {
                        k.step *= 2;
                        break
                    }
                }
                if (j++ > 1e3) throw new Error("Exceeded maximum number of iterations while optimizing scale step!")
            }
            var o = 2.221e-16;
            for (k.step = Math.max(k.step, o), h = k.min, i = k.max; h + k.step <= k.low;) h = f(h, k.step);
            for (; i - k.step >= k.high;) i = f(i, -k.step);
            k.min = h, k.max = i, k.range = k.max - k.min;
            var p = [];
            for (g = k.min; g <= k.max; g = f(g, k.step)) {
                var q = b.roundWithPrecision(g);
                q !== p[p.length - 1] && p.push(q)
            }
            return k.values = p, k
        }, b.polarToCartesian = function (a, b, c, d) {
            var e = (d - 90) * Math.PI / 180;
            return {x: a + c * Math.cos(e), y: b + c * Math.sin(e)}
        }, b.createChartRect = function (a, c, d) {
            var e = !(!c.axisX && !c.axisY), f = e ? c.axisY.offset : 0, g = e ? c.axisX.offset : 0,
                h = a.width() || b.quantity(c.width).value || 0, i = a.height() || b.quantity(c.height).value || 0,
                j = b.normalizePadding(c.chartPadding, d);
            h = Math.max(h, f + j.left + j.right), i = Math.max(i, g + j.top + j.bottom);
            var k = {
                padding: j, width: function () {
                    return this.x2 - this.x1
                }, height: function () {
                    return this.y1 - this.y2
                }
            };
            return e ? ("start" === c.axisX.position ? (k.y2 = j.top + g, k.y1 = Math.max(i - j.bottom, k.y2 + 1)) : (k.y2 = j.top, k.y1 = Math.max(i - j.bottom - g, k.y2 + 1)), "start" === c.axisY.position ? (k.x1 = j.left + f, k.x2 = Math.max(h - j.right, k.x1 + 1)) : (k.x1 = j.left, k.x2 = Math.max(h - j.right - f, k.x1 + 1))) : (k.x1 = j.left, k.x2 = Math.max(h - j.right, k.x1 + 1), k.y2 = j.top, k.y1 = Math.max(i - j.bottom, k.y2 + 1)), k
        }, b.createGrid = function (a, c, d, e, f, g, h, i) {
            var j = {};
            j[d.units.pos + "1"] = a, j[d.units.pos + "2"] = a, j[d.counterUnits.pos + "1"] = e, j[d.counterUnits.pos + "2"] = e + f;
            var k = g.elem("line", j, h.join(" "));
            i.emit("draw", b.extend({type: "grid", axis: d, index: c, group: g, element: k}, j))
        }, b.createGridBackground = function (a, b, c, d) {
            var e = a.elem("rect", {x: b.x1, y: b.y2, width: b.width(), height: b.height()}, c, !0);
            d.emit("draw", {type: "gridBackground", group: a, element: e})
        }, b.createLabel = function (a, c, e, f, g, h, i, j, k, l, m) {
            var n, o = {};
            if (o[g.units.pos] = a + i[g.units.pos], o[g.counterUnits.pos] = i[g.counterUnits.pos], o[g.units.len] = c, o[g.counterUnits.len] = Math.max(0, h - 10), l) {
                var p = d.createElement("span");
                p.className = k.join(" "), p.setAttribute("xmlns", b.namespaces.xhtml), p.innerText = f[e], p.style[g.units.len] = Math.round(o[g.units.len]) + "px", p.style[g.counterUnits.len] = Math.round(o[g.counterUnits.len]) + "px", n = j.foreignObject(p, b.extend({style: "overflow: visible;"}, o))
            } else n = j.elem("text", o, k.join(" ")).text(f[e]);
            m.emit("draw", b.extend({type: "label", axis: g, index: e, group: j, element: n, text: f[e]}, o))
        }, b.getSeriesOption = function (a, b, c) {
            if (a.name && b.series && b.series[a.name]) {
                var d = b.series[a.name];
                return d.hasOwnProperty(c) ? d[c] : b[c]
            }
            return b[c]
        }, b.optionsProvider = function (a, d, e) {
            function f(a) {
                var f = h;
                if (h = b.extend({}, j), d) for (i = 0; i < d.length; i++) {
                    var g = c.matchMedia(d[i][0]);
                    g.matches && (h = b.extend(h, d[i][1]))
                }
                e && a && e.emit("optionsChanged", {previousOptions: f, currentOptions: h})
            }

            function g() {
                k.forEach(function (a) {
                    a.removeListener(f)
                })
            }

            var h, i, j = b.extend({}, a), k = [];
            if (!c.matchMedia) throw "window.matchMedia not found! Make sure you're using a polyfill.";
            if (d) for (i = 0; i < d.length; i++) {
                var l = c.matchMedia(d[i][0]);
                l.addListener(f), k.push(l)
            }
            return f(), {
                removeMediaQueryListeners: g, getCurrentOptions: function () {
                    return b.extend({}, h)
                }
            }
        }, b.splitIntoSegments = function (a, c, d) {
            var e = {increasingX: !1, fillHoles: !1};
            d = b.extend({}, e, d);
            for (var f = [], g = !0, h = 0; h < a.length; h += 2) void 0 === b.getMultiValue(c[h / 2].value) ? d.fillHoles || (g = !0) : (d.increasingX && h >= 2 && a[h] <= a[h - 2] && (g = !0), g && (f.push({
                pathCoordinates: [],
                valueData: []
            }), g = !1), f[f.length - 1].pathCoordinates.push(a[h], a[h + 1]), f[f.length - 1].valueData.push(c[h / 2]));
            return f
        }
    }(this || global, a), function (a, b) {
        "use strict";
        b.Interpolation = {}, b.Interpolation.none = function (a) {
            var c = {fillHoles: !1};
            return a = b.extend({}, c, a), function (c, d) {
                for (var e = new b.Svg.Path, f = !0, g = 0; g < c.length; g += 2) {
                    var h = c[g], i = c[g + 1], j = d[g / 2];
                    void 0 !== b.getMultiValue(j.value) ? (f ? e.move(h, i, !1, j) : e.line(h, i, !1, j), f = !1) : a.fillHoles || (f = !0)
                }
                return e
            }
        }, b.Interpolation.simple = function (a) {
            var c = {divisor: 2, fillHoles: !1};
            a = b.extend({}, c, a);
            var d = 1 / Math.max(1, a.divisor);
            return function (c, e) {
                for (var f, g, h, i = new b.Svg.Path, j = 0; j < c.length; j += 2) {
                    var k = c[j], l = c[j + 1], m = (k - f) * d, n = e[j / 2];
                    void 0 !== n.value ? (void 0 === h ? i.move(k, l, !1, n) : i.curve(f + m, g, k - m, l, k, l, !1, n), f = k, g = l, h = n) : a.fillHoles || (f = k = h = void 0)
                }
                return i
            }
        }, b.Interpolation.cardinal = function (a) {
            var c = {tension: 1, fillHoles: !1};
            a = b.extend({}, c, a);
            var d = Math.min(1, Math.max(0, a.tension)), e = 1 - d;
            return function f(c, g) {
                var h = b.splitIntoSegments(c, g, {fillHoles: a.fillHoles});
                if (h.length) {
                    if (h.length > 1) {
                        var i = [];
                        return h.forEach(function (a) {
                            i.push(f(a.pathCoordinates, a.valueData))
                        }), b.Svg.Path.join(i)
                    }
                    if (c = h[0].pathCoordinates, g = h[0].valueData, c.length <= 4) return b.Interpolation.none()(c, g);
                    for (var j, k = (new b.Svg.Path).move(c[0], c[1], !1, g[0]), l = 0, m = c.length; m - 2 * !j > l; l += 2) {
                        var n = [{x: +c[l - 2], y: +c[l - 1]}, {x: +c[l], y: +c[l + 1]}, {
                            x: +c[l + 2],
                            y: +c[l + 3]
                        }, {x: +c[l + 4], y: +c[l + 5]}];
                        j ? l ? m - 4 === l ? n[3] = {x: +c[0], y: +c[1]} : m - 2 === l && (n[2] = {
                            x: +c[0],
                            y: +c[1]
                        }, n[3] = {x: +c[2], y: +c[3]}) : n[0] = {
                            x: +c[m - 2],
                            y: +c[m - 1]
                        } : m - 4 === l ? n[3] = n[2] : l || (n[0] = {
                            x: +c[l],
                            y: +c[l + 1]
                        }), k.curve(d * (-n[0].x + 6 * n[1].x + n[2].x) / 6 + e * n[2].x, d * (-n[0].y + 6 * n[1].y + n[2].y) / 6 + e * n[2].y, d * (n[1].x + 6 * n[2].x - n[3].x) / 6 + e * n[2].x, d * (n[1].y + 6 * n[2].y - n[3].y) / 6 + e * n[2].y, n[2].x, n[2].y, !1, g[(l + 2) / 2])
                    }
                    return k
                }
                return b.Interpolation.none()([])
            }
        }, b.Interpolation.monotoneCubic = function (a) {
            var c = {fillHoles: !1};
            return a = b.extend({}, c, a), function d(c, e) {
                var f = b.splitIntoSegments(c, e, {fillHoles: a.fillHoles, increasingX: !0});
                if (f.length) {
                    if (f.length > 1) {
                        var g = [];
                        return f.forEach(function (a) {
                            g.push(d(a.pathCoordinates, a.valueData))
                        }), b.Svg.Path.join(g)
                    }
                    if (c = f[0].pathCoordinates, e = f[0].valueData, c.length <= 4) return b.Interpolation.none()(c, e);
                    var h, i, j = [], k = [], l = c.length / 2, m = [], n = [], o = [], p = [];
                    for (h = 0; h < l; h++) j[h] = c[2 * h], k[h] = c[2 * h + 1];
                    for (h = 0; h < l - 1; h++) o[h] = k[h + 1] - k[h], p[h] = j[h + 1] - j[h], n[h] = o[h] / p[h];
                    for (m[0] = n[0], m[l - 1] = n[l - 2], h = 1; h < l - 1; h++) 0 === n[h] || 0 === n[h - 1] || n[h - 1] > 0 != n[h] > 0 ? m[h] = 0 : (m[h] = 3 * (p[h - 1] + p[h]) / ((2 * p[h] + p[h - 1]) / n[h - 1] + (p[h] + 2 * p[h - 1]) / n[h]), isFinite(m[h]) || (m[h] = 0));
                    for (i = (new b.Svg.Path).move(j[0], k[0], !1, e[0]), h = 0; h < l - 1; h++) i.curve(j[h] + p[h] / 3, k[h] + m[h] * p[h] / 3, j[h + 1] - p[h] / 3, k[h + 1] - m[h + 1] * p[h] / 3, j[h + 1], k[h + 1], !1, e[h + 1]);
                    return i
                }
                return b.Interpolation.none()([])
            }
        }, b.Interpolation.step = function (a) {
            var c = {postpone: !0, fillHoles: !1};
            return a = b.extend({}, c, a), function (c, d) {
                for (var e, f, g, h = new b.Svg.Path, i = 0; i < c.length; i += 2) {
                    var j = c[i], k = c[i + 1], l = d[i / 2];
                    void 0 !== l.value ? (void 0 === g ? h.move(j, k, !1, l) : (a.postpone ? h.line(j, f, !1, g) : h.line(e, k, !1, l), h.line(j, k, !1, l)), e = j, f = k, g = l) : a.fillHoles || (e = f = g = void 0)
                }
                return h
            }
        }
    }(this || global, a), function (a, b) {
        "use strict";
        b.EventEmitter = function () {
            function a(a, b) {
                d[a] = d[a] || [], d[a].push(b)
            }

            function b(a, b) {
                d[a] && (b ? (d[a].splice(d[a].indexOf(b), 1), 0 === d[a].length && delete d[a]) : delete d[a])
            }

            function c(a, b) {
                d[a] && d[a].forEach(function (a) {
                    a(b)
                }), d["*"] && d["*"].forEach(function (c) {
                    c(a, b)
                })
            }

            var d = [];
            return {addEventHandler: a, removeEventHandler: b, emit: c}
        }
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a) {
            var b = [];
            if (a.length) for (var c = 0; c < a.length; c++) b.push(a[c]);
            return b
        }

        function d(a, c) {
            var d = c || this.prototype || b.Class, e = Object.create(d);
            b.Class.cloneDefinitions(e, a);
            var f = function () {
                var a, c = e.constructor || function () {
                };
                return a = this === b ? Object.create(e) : this, c.apply(a, Array.prototype.slice.call(arguments, 0)), a
            };
            return f.prototype = e, f["super"] = d, f.extend = this.extend, f
        }

        function e() {
            var a = c(arguments), b = a[0];
            return a.splice(1, a.length - 1).forEach(function (a) {
                Object.getOwnPropertyNames(a).forEach(function (c) {
                    delete b[c], Object.defineProperty(b, c, Object.getOwnPropertyDescriptor(a, c))
                })
            }), b
        }

        b.Class = {extend: d, cloneDefinitions: e}
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a, c, d) {
            return a && (this.data = a || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], this.eventEmitter.emit("data", {
                type: "update",
                data: this.data
            })), c && (this.options = b.extend({}, d ? this.options : this.defaultOptions, c), this.initializeTimeoutId || (this.optionsProvider.removeMediaQueryListeners(), this.optionsProvider = b.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter))), this.initializeTimeoutId || this.createChart(this.optionsProvider.getCurrentOptions()), this
        }

        function d() {
            return this.initializeTimeoutId ? i.clearTimeout(this.initializeTimeoutId) : (i.removeEventListener("resize", this.resizeListener), this.optionsProvider.removeMediaQueryListeners()), this
        }

        function e(a, b) {
            return this.eventEmitter.addEventHandler(a, b), this
        }

        function f(a, b) {
            return this.eventEmitter.removeEventHandler(a, b), this
        }

        function g() {
            i.addEventListener("resize", this.resizeListener), this.optionsProvider = b.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter), this.eventEmitter.addEventHandler("optionsChanged", function () {
                this.update()
            }.bind(this)), this.options.plugins && this.options.plugins.forEach(function (a) {
                a instanceof Array ? a[0](this, a[1]) : a(this)
            }.bind(this)), this.eventEmitter.emit("data", {
                type: "initial",
                data: this.data
            }), this.createChart(this.optionsProvider.getCurrentOptions()), this.initializeTimeoutId = void 0
        }

        function h(a, c, d, e, f) {
            this.container = b.querySelector(a), this.data = c || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], this.defaultOptions = d, this.options = e, this.responsiveOptions = f, this.eventEmitter = b.EventEmitter(), this.supportsForeignObject = b.Svg.isSupported("Extensibility"), this.supportsAnimations = b.Svg.isSupported("AnimationEventsAttribute"), this.resizeListener = function () {
                this.update()
            }.bind(this), this.container && (this.container.__chartist__ && this.container.__chartist__.detach(), this.container.__chartist__ = this), this.initializeTimeoutId = setTimeout(g.bind(this), 0)
        }

        var i = a.window;
        b.Base = b.Class.extend({
            constructor: h,
            optionsProvider: void 0,
            container: void 0,
            svg: void 0,
            eventEmitter: void 0,
            createChart: function () {
                throw new Error("Base chart type can't be instantiated!")
            },
            update: c,
            detach: d,
            on: e,
            off: f,
            version: b.version,
            supportsForeignObject: !1
        })
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a, c, d, e, f) {
            a instanceof Element ? this._node = a : (this._node = y.createElementNS(b.namespaces.svg, a), "svg" === a && this.attr({"xmlns:ct": b.namespaces.ct})), c && this.attr(c), d && this.addClass(d), e && (f && e._node.firstChild ? e._node.insertBefore(this._node, e._node.firstChild) : e._node.appendChild(this._node))
        }

        function d(a, c) {
            return "string" == typeof a ? c ? this._node.getAttributeNS(c, a) : this._node.getAttribute(a) : (Object.keys(a).forEach(function (c) {
                if (void 0 !== a[c]) if (c.indexOf(":") !== -1) {
                    var d = c.split(":");
                    this._node.setAttributeNS(b.namespaces[d[0]], c, a[c])
                } else this._node.setAttribute(c, a[c])
            }.bind(this)), this)
        }

        function e(a, c, d, e) {
            return new b.Svg(a, c, d, this, e)
        }

        function f() {
            return this._node.parentNode instanceof SVGElement ? new b.Svg(this._node.parentNode) : null
        }

        function g() {
            for (var a = this._node; "svg" !== a.nodeName;) a = a.parentNode;
            return new b.Svg(a)
        }

        function h(a) {
            var c = this._node.querySelector(a);
            return c ? new b.Svg(c) : null
        }

        function i(a) {
            var c = this._node.querySelectorAll(a);
            return c.length ? new b.Svg.List(c) : null
        }

        function j() {
            return this._node
        }

        function k(a, c, d, e) {
            if ("string" == typeof a) {
                var f = y.createElement("div");
                f.innerHTML = a, a = f.firstChild
            }
            a.setAttribute("xmlns", b.namespaces.xmlns);
            var g = this.elem("foreignObject", c, d, e);
            return g._node.appendChild(a), g
        }

        function l(a) {
            return this._node.appendChild(y.createTextNode(a)), this
        }

        function m() {
            for (; this._node.firstChild;) this._node.removeChild(this._node.firstChild);
            return this
        }

        function n() {
            return this._node.parentNode.removeChild(this._node), this.parent()
        }

        function o(a) {
            return this._node.parentNode.replaceChild(a._node, this._node), a
        }

        function p(a, b) {
            return b && this._node.firstChild ? this._node.insertBefore(a._node, this._node.firstChild) : this._node.appendChild(a._node), this
        }

        function q() {
            return this._node.getAttribute("class") ? this._node.getAttribute("class").trim().split(/\s+/) : []
        }

        function r(a) {
            return this._node.setAttribute("class", this.classes(this._node).concat(a.trim().split(/\s+/)).filter(function (a, b, c) {
                return c.indexOf(a) === b
            }).join(" ")), this
        }

        function s(a) {
            var b = a.trim().split(/\s+/);
            return this._node.setAttribute("class", this.classes(this._node).filter(function (a) {
                return b.indexOf(a) === -1
            }).join(" ")), this
        }

        function t() {
            return this._node.setAttribute("class", ""), this
        }

        function u() {
            return this._node.getBoundingClientRect().height
        }

        function v() {
            return this._node.getBoundingClientRect().width
        }

        function w(a, c, d) {
            return void 0 === c && (c = !0), Object.keys(a).forEach(function (e) {
                function f(a, c) {
                    var f, g, h, i = {};
                    a.easing && (h = a.easing instanceof Array ? a.easing : b.Svg.Easing[a.easing], delete a.easing), a.begin = b.ensureUnit(a.begin, "ms"), a.dur = b.ensureUnit(a.dur, "ms"), h && (a.calcMode = "spline", a.keySplines = h.join(" "), a.keyTimes = "0;1"), c && (a.fill = "freeze", i[e] = a.from, this.attr(i), g = b.quantity(a.begin || 0).value, a.begin = "indefinite"), f = this.elem("animate", b.extend({attributeName: e}, a)), c && setTimeout(function () {
                        try {
                            f._node.beginElement()
                        } catch (b) {
                            i[e] = a.to, this.attr(i), f.remove()
                        }
                    }.bind(this), g), d && f._node.addEventListener("beginEvent", function () {
                        d.emit("animationBegin", {element: this, animate: f._node, params: a})
                    }.bind(this)), f._node.addEventListener("endEvent", function () {
                        d && d.emit("animationEnd", {
                            element: this,
                            animate: f._node,
                            params: a
                        }), c && (i[e] = a.to, this.attr(i), f.remove())
                    }.bind(this))
                }

                a[e] instanceof Array ? a[e].forEach(function (a) {
                    f.bind(this)(a, !1)
                }.bind(this)) : f.bind(this)(a[e], c)
            }.bind(this)), this
        }

        function x(a) {
            var c = this;
            this.svgElements = [];
            for (var d = 0; d < a.length; d++) this.svgElements.push(new b.Svg(a[d]));
            Object.keys(b.Svg.prototype).filter(function (a) {
                return ["constructor", "parent", "querySelector", "querySelectorAll", "replace", "append", "classes", "height", "width"].indexOf(a) === -1
            }).forEach(function (a) {
                c[a] = function () {
                    var d = Array.prototype.slice.call(arguments, 0);
                    return c.svgElements.forEach(function (c) {
                        b.Svg.prototype[a].apply(c, d)
                    }), c
                }
            })
        }

        var y = a.document;
        b.Svg = b.Class.extend({
            constructor: c,
            attr: d,
            elem: e,
            parent: f,
            root: g,
            querySelector: h,
            querySelectorAll: i,
            getNode: j,
            foreignObject: k,
            text: l,
            empty: m,
            remove: n,
            replace: o,
            append: p,
            classes: q,
            addClass: r,
            removeClass: s,
            removeAllClasses: t,
            height: u,
            width: v,
            animate: w
        }), b.Svg.isSupported = function (a) {
            return y.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#" + a, "1.1")
        };
        var z = {
            easeInSine: [.47, 0, .745, .715],
            easeOutSine: [.39, .575, .565, 1],
            easeInOutSine: [.445, .05, .55, .95],
            easeInQuad: [.55, .085, .68, .53],
            easeOutQuad: [.25, .46, .45, .94],
            easeInOutQuad: [.455, .03, .515, .955],
            easeInCubic: [.55, .055, .675, .19],
            easeOutCubic: [.215, .61, .355, 1],
            easeInOutCubic: [.645, .045, .355, 1],
            easeInQuart: [.895, .03, .685, .22],
            easeOutQuart: [.165, .84, .44, 1],
            easeInOutQuart: [.77, 0, .175, 1],
            easeInQuint: [.755, .05, .855, .06],
            easeOutQuint: [.23, 1, .32, 1],
            easeInOutQuint: [.86, 0, .07, 1],
            easeInExpo: [.95, .05, .795, .035],
            easeOutExpo: [.19, 1, .22, 1],
            easeInOutExpo: [1, 0, 0, 1],
            easeInCirc: [.6, .04, .98, .335],
            easeOutCirc: [.075, .82, .165, 1],
            easeInOutCirc: [.785, .135, .15, .86],
            easeInBack: [.6, -.28, .735, .045],
            easeOutBack: [.175, .885, .32, 1.275],
            easeInOutBack: [.68, -.55, .265, 1.55]
        };
        b.Svg.Easing = z, b.Svg.List = b.Class.extend({constructor: x})
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a, c, d, e, f, g) {
            var h = b.extend({command: f ? a.toLowerCase() : a.toUpperCase()}, c, g ? {data: g} : {});
            d.splice(e, 0, h)
        }

        function d(a, b) {
            a.forEach(function (c, d) {
                t[c.command.toLowerCase()].forEach(function (e, f) {
                    b(c, e, d, f, a)
                })
            })
        }

        function e(a, c) {
            this.pathElements = [], this.pos = 0, this.close = a, this.options = b.extend({}, u, c)
        }

        function f(a) {
            return void 0 !== a ? (this.pos = Math.max(0, Math.min(this.pathElements.length, a)), this) : this.pos
        }

        function g(a) {
            return this.pathElements.splice(this.pos, a), this
        }

        function h(a, b, d, e) {
            return c("M", {x: +a, y: +b}, this.pathElements, this.pos++, d, e), this
        }

        function i(a, b, d, e) {
            return c("L", {x: +a, y: +b}, this.pathElements, this.pos++, d, e), this
        }

        function j(a, b, d, e, f, g, h, i) {
            return c("C", {x1: +a, y1: +b, x2: +d, y2: +e, x: +f, y: +g}, this.pathElements, this.pos++, h, i), this
        }

        function k(a, b, d, e, f, g, h, i, j) {
            return c("A", {
                rx: +a,
                ry: +b,
                xAr: +d,
                lAf: +e,
                sf: +f,
                x: +g,
                y: +h
            }, this.pathElements, this.pos++, i, j), this
        }

        function l(a) {
            var c = a.replace(/([A-Za-z])([0-9])/g, "$1 $2").replace(/([0-9])([A-Za-z])/g, "$1 $2").split(/[\s,]+/).reduce(function (a, b) {
                return b.match(/[A-Za-z]/) && a.push([]), a[a.length - 1].push(b), a
            }, []);
            "Z" === c[c.length - 1][0].toUpperCase() && c.pop();
            var d = c.map(function (a) {
                var c = a.shift(), d = t[c.toLowerCase()];
                return b.extend({command: c}, d.reduce(function (b, c, d) {
                    return b[c] = +a[d], b
                }, {}))
            }), e = [this.pos, 0];
            return Array.prototype.push.apply(e, d), Array.prototype.splice.apply(this.pathElements, e), this.pos += d.length, this
        }

        function m() {
            var a = Math.pow(10, this.options.accuracy);
            return this.pathElements.reduce(function (b, c) {
                var d = t[c.command.toLowerCase()].map(function (b) {
                    return this.options.accuracy ? Math.round(c[b] * a) / a : c[b]
                }.bind(this));
                return b + c.command + d.join(",")
            }.bind(this), "") + (this.close ? "Z" : "")
        }

        function n(a, b) {
            return d(this.pathElements, function (c, d) {
                c[d] *= "x" === d[0] ? a : b
            }), this
        }

        function o(a, b) {
            return d(this.pathElements, function (c, d) {
                c[d] += "x" === d[0] ? a : b
            }), this
        }

        function p(a) {
            return d(this.pathElements, function (b, c, d, e, f) {
                var g = a(b, c, d, e, f);
                (g || 0 === g) && (b[c] = g)
            }), this
        }

        function q(a) {
            var c = new b.Svg.Path(a || this.close);
            return c.pos = this.pos, c.pathElements = this.pathElements.slice().map(function (a) {
                return b.extend({}, a)
            }), c.options = b.extend({}, this.options), c
        }

        function r(a) {
            var c = [new b.Svg.Path];
            return this.pathElements.forEach(function (d) {
                d.command === a.toUpperCase() && 0 !== c[c.length - 1].pathElements.length && c.push(new b.Svg.Path), c[c.length - 1].pathElements.push(d)
            }), c
        }

        function s(a, c, d) {
            for (var e = new b.Svg.Path(c, d), f = 0; f < a.length; f++) for (var g = a[f], h = 0; h < g.pathElements.length; h++) e.pathElements.push(g.pathElements[h]);
            return e
        }

        var t = {
            m: ["x", "y"],
            l: ["x", "y"],
            c: ["x1", "y1", "x2", "y2", "x", "y"],
            a: ["rx", "ry", "xAr", "lAf", "sf", "x", "y"]
        }, u = {accuracy: 3};
        b.Svg.Path = b.Class.extend({
            constructor: e,
            position: f,
            remove: g,
            move: h,
            line: i,
            curve: j,
            arc: k,
            scale: n,
            translate: o,
            transform: p,
            parse: l,
            stringify: m,
            clone: q,
            splitByCommand: r
        }), b.Svg.Path.elementDescriptions = t, b.Svg.Path.join = s
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a, b, c, d) {
            this.units = a, this.counterUnits = a === e.x ? e.y : e.x, this.chartRect = b, this.axisLength = b[a.rectEnd] - b[a.rectStart], this.gridOffset = b[a.rectOffset], this.ticks = c, this.options = d
        }

        function d(a, c, d, e, f) {
            var g = e["axis" + this.units.pos.toUpperCase()], h = this.ticks.map(this.projectValue.bind(this)),
                i = this.ticks.map(g.labelInterpolationFnc);
            h.forEach(function (j, k) {
                var l, m = {x: 0, y: 0};
                l = h[k + 1] ? h[k + 1] - j : Math.max(this.axisLength - j, 30), b.isFalseyButZero(i[k]) && "" !== i[k] || ("x" === this.units.pos ? (j = this.chartRect.x1 + j, m.x = e.axisX.labelOffset.x, "start" === e.axisX.position ? m.y = this.chartRect.padding.top + e.axisX.labelOffset.y + (d ? 5 : 20) : m.y = this.chartRect.y1 + e.axisX.labelOffset.y + (d ? 5 : 20)) : (j = this.chartRect.y1 - j, m.y = e.axisY.labelOffset.y - (d ? l : 0), "start" === e.axisY.position ? m.x = d ? this.chartRect.padding.left + e.axisY.labelOffset.x : this.chartRect.x1 - 10 : m.x = this.chartRect.x2 + e.axisY.labelOffset.x + 10), g.showGrid && b.createGrid(j, k, this, this.gridOffset, this.chartRect[this.counterUnits.len](), a, [e.classNames.grid, e.classNames[this.units.dir]], f), g.showLabel && b.createLabel(j, l, k, i, this, g.offset, m, c, [e.classNames.label, e.classNames[this.units.dir], "start" === g.position ? e.classNames[g.position] : e.classNames.end], d, f))
            }.bind(this))
        }

        var e = (a.window, a.document, {
            x: {
                pos: "x",
                len: "width",
                dir: "horizontal",
                rectStart: "x1",
                rectEnd: "x2",
                rectOffset: "y2"
            }, y: {pos: "y", len: "height", dir: "vertical", rectStart: "y2", rectEnd: "y1", rectOffset: "x1"}
        });
        b.Axis = b.Class.extend({
            constructor: c, createGridAndLabels: d, projectValue: function (a, b, c) {
                throw new Error("Base axis can't be instantiated!")
            }
        }), b.Axis.units = e
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a, c, d, e) {
            var f = e.highLow || b.getHighLow(c, e, a.pos);
            this.bounds = b.getBounds(d[a.rectEnd] - d[a.rectStart], f, e.scaleMinSpace || 20, e.onlyInteger), this.range = {
                min: this.bounds.min,
                max: this.bounds.max
            }, b.AutoScaleAxis["super"].constructor.call(this, a, d, this.bounds.values, e)
        }

        function d(a) {
            return this.axisLength * (+b.getMultiValue(a, this.units.pos) - this.bounds.min) / this.bounds.range
        }

        a.window, a.document;
        b.AutoScaleAxis = b.Axis.extend({constructor: c, projectValue: d})
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a, c, d, e) {
            var f = e.highLow || b.getHighLow(c, e, a.pos);
            this.divisor = e.divisor || 1, this.ticks = e.ticks || b.times(this.divisor).map(function (a, b) {
                return f.low + (f.high - f.low) / this.divisor * b
            }.bind(this)), this.ticks.sort(function (a, b) {
                return a - b
            }), this.range = {
                min: f.low,
                max: f.high
            }, b.FixedScaleAxis["super"].constructor.call(this, a, d, this.ticks, e), this.stepLength = this.axisLength / this.divisor
        }

        function d(a) {
            return this.axisLength * (+b.getMultiValue(a, this.units.pos) - this.range.min) / (this.range.max - this.range.min)
        }

        a.window, a.document;
        b.FixedScaleAxis = b.Axis.extend({constructor: c, projectValue: d})
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a, c, d, e) {
            b.StepAxis["super"].constructor.call(this, a, d, e.ticks, e);
            var f = Math.max(1, e.ticks.length - (e.stretch ? 1 : 0));
            this.stepLength = this.axisLength / f
        }

        function d(a, b) {
            return this.stepLength * b
        }

        a.window, a.document;
        b.StepAxis = b.Axis.extend({constructor: c, projectValue: d})
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a) {
            var c = b.normalizeData(this.data, a.reverseData, !0);
            this.svg = b.createSvg(this.container, a.width, a.height, a.classNames.chart);
            var d, f, g = this.svg.elem("g").addClass(a.classNames.gridGroup), h = this.svg.elem("g"),
                i = this.svg.elem("g").addClass(a.classNames.labelGroup), j = b.createChartRect(this.svg, a, e.padding);
            d = void 0 === a.axisX.type ? new b.StepAxis(b.Axis.units.x, c.normalized.series, j, b.extend({}, a.axisX, {
                ticks: c.normalized.labels,
                stretch: a.fullWidth
            })) : a.axisX.type.call(b, b.Axis.units.x, c.normalized.series, j, a.axisX), f = void 0 === a.axisY.type ? new b.AutoScaleAxis(b.Axis.units.y, c.normalized.series, j, b.extend({}, a.axisY, {
                high: b.isNumeric(a.high) ? a.high : a.axisY.high,
                low: b.isNumeric(a.low) ? a.low : a.axisY.low
            })) : a.axisY.type.call(b, b.Axis.units.y, c.normalized.series, j, a.axisY), d.createGridAndLabels(g, i, this.supportsForeignObject, a, this.eventEmitter), f.createGridAndLabels(g, i, this.supportsForeignObject, a, this.eventEmitter), a.showGridBackground && b.createGridBackground(g, j, a.classNames.gridBackground, this.eventEmitter), c.raw.series.forEach(function (e, g) {
                var i = h.elem("g");
                i.attr({
                    "ct:series-name": e.name,
                    "ct:meta": b.serialize(e.meta)
                }), i.addClass([a.classNames.series, e.className || a.classNames.series + "-" + b.alphaNumerate(g)].join(" "));
                var k = [], l = [];
                c.normalized.series[g].forEach(function (a, h) {
                    var i = {
                        x: j.x1 + d.projectValue(a, h, c.normalized.series[g]),
                        y: j.y1 - f.projectValue(a, h, c.normalized.series[g])
                    };
                    k.push(i.x, i.y), l.push({value: a, valueIndex: h, meta: b.getMetaData(e, h)})
                }.bind(this));
                var m = {
                        lineSmooth: b.getSeriesOption(e, a, "lineSmooth"),
                        showPoint: b.getSeriesOption(e, a, "showPoint"),
                        showLine: b.getSeriesOption(e, a, "showLine"),
                        showArea: b.getSeriesOption(e, a, "showArea"),
                        areaBase: b.getSeriesOption(e, a, "areaBase")
                    },
                    n = "function" == typeof m.lineSmooth ? m.lineSmooth : m.lineSmooth ? b.Interpolation.monotoneCubic() : b.Interpolation.none(),
                    o = n(k, l);
                if (m.showPoint && o.pathElements.forEach(function (c) {
                    var h = i.elem("line", {
                        x1: c.x,
                        y1: c.y,
                        x2: c.x + .01,
                        y2: c.y
                    }, a.classNames.point).attr({
                        "ct:value": [c.data.value.x, c.data.value.y].filter(b.isNumeric).join(","),
                        "ct:meta": b.serialize(c.data.meta)
                    });
                    this.eventEmitter.emit("draw", {
                        type: "point",
                        value: c.data.value,
                        index: c.data.valueIndex,
                        meta: c.data.meta,
                        series: e,
                        seriesIndex: g,
                        axisX: d,
                        axisY: f,
                        group: i,
                        element: h,
                        x: c.x,
                        y: c.y
                    })
                }.bind(this)), m.showLine) {
                    var p = i.elem("path", {d: o.stringify()}, a.classNames.line, !0);
                    this.eventEmitter.emit("draw", {
                        type: "line",
                        values: c.normalized.series[g],
                        path: o.clone(),
                        chartRect: j,
                        index: g,
                        series: e,
                        seriesIndex: g,
                        seriesMeta: e.meta,
                        axisX: d,
                        axisY: f,
                        group: i,
                        element: p
                    })
                }
                if (m.showArea && f.range) {
                    var q = Math.max(Math.min(m.areaBase, f.range.max), f.range.min), r = j.y1 - f.projectValue(q);
                    o.splitByCommand("M").filter(function (a) {
                        return a.pathElements.length > 1
                    }).map(function (a) {
                        var b = a.pathElements[0], c = a.pathElements[a.pathElements.length - 1];
                        return a.clone(!0).position(0).remove(1).move(b.x, r).line(b.x, b.y).position(a.pathElements.length + 1).line(c.x, r)
                    }).forEach(function (b) {
                        var h = i.elem("path", {d: b.stringify()}, a.classNames.area, !0);
                        this.eventEmitter.emit("draw", {
                            type: "area",
                            values: c.normalized.series[g],
                            path: b.clone(),
                            series: e,
                            seriesIndex: g,
                            axisX: d,
                            axisY: f,
                            chartRect: j,
                            index: g,
                            group: i,
                            element: h
                        })
                    }.bind(this))
                }
            }.bind(this)), this.eventEmitter.emit("created", {
                bounds: f.bounds,
                chartRect: j,
                axisX: d,
                axisY: f,
                svg: this.svg,
                options: a
            })
        }

        function d(a, c, d, f) {
            b.Line["super"].constructor.call(this, a, c, e, b.extend({}, e, d), f)
        }

        var e = (a.window, a.document, {
            axisX: {
                offset: 30,
                position: "end",
                labelOffset: {x: 0, y: 0},
                showLabel: !0,
                showGrid: !0,
                labelInterpolationFnc: b.noop,
                type: void 0
            },
            axisY: {
                offset: 40,
                position: "start",
                labelOffset: {x: 0, y: 0},
                showLabel: !0,
                showGrid: !0,
                labelInterpolationFnc: b.noop,
                type: void 0,
                scaleMinSpace: 20,
                onlyInteger: !1
            },
            width: void 0,
            height: void 0,
            showLine: !0,
            showPoint: !0,
            showArea: !1,
            areaBase: 0,
            lineSmooth: !0,
            showGridBackground: !1,
            low: void 0,
            high: void 0,
            chartPadding: {top: 15, right: 15, bottom: 5, left: 10},
            fullWidth: !1,
            reverseData: !1,
            classNames: {
                chart: "ct-chart-line",
                label: "ct-label",
                labelGroup: "ct-labels",
                series: "ct-series",
                line: "ct-line",
                point: "ct-point",
                area: "ct-area",
                grid: "ct-grid",
                gridGroup: "ct-grids",
                gridBackground: "ct-grid-background",
                vertical: "ct-vertical",
                horizontal: "ct-horizontal",
                start: "ct-start",
                end: "ct-end"
            }
        });
        b.Line = b.Base.extend({constructor: d, createChart: c})
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a) {
            var c, d;
            a.distributeSeries ? (c = b.normalizeData(this.data, a.reverseData, a.horizontalBars ? "x" : "y"), c.normalized.series = c.normalized.series.map(function (a) {
                return [a]
            })) : c = b.normalizeData(this.data, a.reverseData, a.horizontalBars ? "x" : "y"), this.svg = b.createSvg(this.container, a.width, a.height, a.classNames.chart + (a.horizontalBars ? " " + a.classNames.horizontalBars : ""));
            var f = this.svg.elem("g").addClass(a.classNames.gridGroup), g = this.svg.elem("g"),
                h = this.svg.elem("g").addClass(a.classNames.labelGroup);
            if (a.stackBars && 0 !== c.normalized.series.length) {
                var i = b.serialMap(c.normalized.series, function () {
                    return Array.prototype.slice.call(arguments).map(function (a) {
                        return a
                    }).reduce(function (a, b) {
                        return {x: a.x + (b && b.x) || 0, y: a.y + (b && b.y) || 0}
                    }, {x: 0, y: 0})
                });
                d = b.getHighLow([i], a, a.horizontalBars ? "x" : "y")
            } else d = b.getHighLow(c.normalized.series, a, a.horizontalBars ? "x" : "y");
            d.high = +a.high || (0 === a.high ? 0 : d.high), d.low = +a.low || (0 === a.low ? 0 : d.low);
            var j, k, l, m, n, o = b.createChartRect(this.svg, a, e.padding);
            k = a.distributeSeries && a.stackBars ? c.normalized.labels.slice(0, 1) : c.normalized.labels, a.horizontalBars ? (j = m = void 0 === a.axisX.type ? new b.AutoScaleAxis(b.Axis.units.x, c.normalized.series, o, b.extend({}, a.axisX, {
                highLow: d,
                referenceValue: 0
            })) : a.axisX.type.call(b, b.Axis.units.x, c.normalized.series, o, b.extend({}, a.axisX, {
                highLow: d,
                referenceValue: 0
            })), l = n = void 0 === a.axisY.type ? new b.StepAxis(b.Axis.units.y, c.normalized.series, o, {ticks: k}) : a.axisY.type.call(b, b.Axis.units.y, c.normalized.series, o, a.axisY)) : (l = m = void 0 === a.axisX.type ? new b.StepAxis(b.Axis.units.x, c.normalized.series, o, {ticks: k}) : a.axisX.type.call(b, b.Axis.units.x, c.normalized.series, o, a.axisX), j = n = void 0 === a.axisY.type ? new b.AutoScaleAxis(b.Axis.units.y, c.normalized.series, o, b.extend({}, a.axisY, {
                highLow: d,
                referenceValue: 0
            })) : a.axisY.type.call(b, b.Axis.units.y, c.normalized.series, o, b.extend({}, a.axisY, {
                highLow: d,
                referenceValue: 0
            })));
            var p = a.horizontalBars ? o.x1 + j.projectValue(0) : o.y1 - j.projectValue(0), q = [];
            l.createGridAndLabels(f, h, this.supportsForeignObject, a, this.eventEmitter), j.createGridAndLabels(f, h, this.supportsForeignObject, a, this.eventEmitter), a.showGridBackground && b.createGridBackground(f, o, a.classNames.gridBackground, this.eventEmitter), c.raw.series.forEach(function (d, e) {
                var f, h, i = e - (c.raw.series.length - 1) / 2;
                f = a.distributeSeries && !a.stackBars ? l.axisLength / c.normalized.series.length / 2 : a.distributeSeries && a.stackBars ? l.axisLength / 2 : l.axisLength / c.normalized.series[e].length / 2, h = g.elem("g"), h.attr({
                    "ct:series-name": d.name,
                    "ct:meta": b.serialize(d.meta)
                }), h.addClass([a.classNames.series, d.className || a.classNames.series + "-" + b.alphaNumerate(e)].join(" ")), c.normalized.series[e].forEach(function (g, k) {
                    var r, s, t, u;
                    if (u = a.distributeSeries && !a.stackBars ? e : a.distributeSeries && a.stackBars ? 0 : k, r = a.horizontalBars ? {
                        x: o.x1 + j.projectValue(g && g.x ? g.x : 0, k, c.normalized.series[e]),
                        y: o.y1 - l.projectValue(g && g.y ? g.y : 0, u, c.normalized.series[e])
                    } : {
                        x: o.x1 + l.projectValue(g && g.x ? g.x : 0, u, c.normalized.series[e]),
                        y: o.y1 - j.projectValue(g && g.y ? g.y : 0, k, c.normalized.series[e])
                    }, l instanceof b.StepAxis && (l.options.stretch || (r[l.units.pos] += f * (a.horizontalBars ? -1 : 1)), r[l.units.pos] += a.stackBars || a.distributeSeries ? 0 : i * a.seriesBarDistance * (a.horizontalBars ? -1 : 1)), t = q[k] || p, q[k] = t - (p - r[l.counterUnits.pos]), void 0 !== g) {
                        var v = {};
                        v[l.units.pos + "1"] = r[l.units.pos], v[l.units.pos + "2"] = r[l.units.pos], !a.stackBars || "accumulate" !== a.stackMode && a.stackMode ? (v[l.counterUnits.pos + "1"] = p, v[l.counterUnits.pos + "2"] = r[l.counterUnits.pos]) : (v[l.counterUnits.pos + "1"] = t, v[l.counterUnits.pos + "2"] = q[k]), v.x1 = Math.min(Math.max(v.x1, o.x1), o.x2), v.x2 = Math.min(Math.max(v.x2, o.x1), o.x2), v.y1 = Math.min(Math.max(v.y1, o.y2), o.y1), v.y2 = Math.min(Math.max(v.y2, o.y2), o.y1);
                        var w = b.getMetaData(d, k);
                        s = h.elem("line", v, a.classNames.bar).attr({
                            "ct:value": [g.x, g.y].filter(b.isNumeric).join(","),
                            "ct:meta": b.serialize(w)
                        }), this.eventEmitter.emit("draw", b.extend({
                            type: "bar",
                            value: g,
                            index: k,
                            meta: w,
                            series: d,
                            seriesIndex: e,
                            axisX: m,
                            axisY: n,
                            chartRect: o,
                            group: h,
                            element: s
                        }, v))
                    }
                }.bind(this))
            }.bind(this)), this.eventEmitter.emit("created", {
                bounds: j.bounds,
                chartRect: o,
                axisX: m,
                axisY: n,
                svg: this.svg,
                options: a
            })
        }

        function d(a, c, d, f) {
            b.Bar["super"].constructor.call(this, a, c, e, b.extend({}, e, d), f)
        }

        var e = (a.window, a.document, {
            axisX: {
                offset: 30,
                position: "end",
                labelOffset: {x: 0, y: 0},
                showLabel: !0,
                showGrid: !0,
                labelInterpolationFnc: b.noop,
                scaleMinSpace: 30,
                onlyInteger: !1
            },
            axisY: {
                offset: 40,
                position: "start",
                labelOffset: {x: 0, y: 0},
                showLabel: !0,
                showGrid: !0,
                labelInterpolationFnc: b.noop,
                scaleMinSpace: 20,
                onlyInteger: !1
            },
            width: void 0,
            height: void 0,
            high: void 0,
            low: void 0,
            referenceValue: 0,
            chartPadding: {top: 15, right: 15, bottom: 5, left: 10},
            seriesBarDistance: 15,
            stackBars: !1,
            stackMode: "accumulate",
            horizontalBars: !1,
            distributeSeries: !1,
            reverseData: !1,
            showGridBackground: !1,
            classNames: {
                chart: "ct-chart-bar",
                horizontalBars: "ct-horizontal-bars",
                label: "ct-label",
                labelGroup: "ct-labels",
                series: "ct-series",
                bar: "ct-bar",
                grid: "ct-grid",
                gridGroup: "ct-grids",
                gridBackground: "ct-grid-background",
                vertical: "ct-vertical",
                horizontal: "ct-horizontal",
                start: "ct-start",
                end: "ct-end"
            }
        });
        b.Bar = b.Base.extend({constructor: d, createChart: c})
    }(this || global, a), function (a, b) {
        "use strict";

        function c(a, b, c) {
            var d = b.x > a.x;
            return d && "explode" === c || !d && "implode" === c ? "start" : d && "implode" === c || !d && "explode" === c ? "end" : "middle"
        }

        function d(a) {
            var d, e, g, h, i, j = b.normalizeData(this.data), k = [], l = a.startAngle;
            this.svg = b.createSvg(this.container, a.width, a.height, a.donut ? a.classNames.chartDonut : a.classNames.chartPie), e = b.createChartRect(this.svg, a, f.padding), g = Math.min(e.width() / 2, e.height() / 2), i = a.total || j.normalized.series.reduce(function (a, b) {
                return a + b
            }, 0);
            var m = b.quantity(a.donutWidth);
            "%" === m.unit && (m.value *= g / 100), g -= a.donut && !a.donutSolid ? m.value / 2 : 0, h = "outside" === a.labelPosition || a.donut && !a.donutSolid ? g : "center" === a.labelPosition ? 0 : a.donutSolid ? g - m.value / 2 : g / 2, h += a.labelOffset;
            var n = {x: e.x1 + e.width() / 2, y: e.y2 + e.height() / 2}, o = 1 === j.raw.series.filter(function (a) {
                return a.hasOwnProperty("value") ? 0 !== a.value : 0 !== a
            }).length;
            j.raw.series.forEach(function (a, b) {
                k[b] = this.svg.elem("g", null, null)
            }.bind(this)), a.showLabel && (d = this.svg.elem("g", null, null)), j.raw.series.forEach(function (e, f) {
                if (0 !== j.normalized.series[f] || !a.ignoreEmptyValues) {
                    k[f].attr({"ct:series-name": e.name}), k[f].addClass([a.classNames.series, e.className || a.classNames.series + "-" + b.alphaNumerate(f)].join(" "));
                    var p = i > 0 ? l + j.normalized.series[f] / i * 360 : 0,
                        q = Math.max(0, l - (0 === f || o ? 0 : .2));
                    p - q >= 359.99 && (p = q + 359.99);
                    var r, s, t, u = b.polarToCartesian(n.x, n.y, g, q), v = b.polarToCartesian(n.x, n.y, g, p),
                        w = new b.Svg.Path(!a.donut || a.donutSolid).move(v.x, v.y).arc(g, g, 0, p - l > 180, 0, u.x, u.y);
                    a.donut ? a.donutSolid && (t = g - m.value, r = b.polarToCartesian(n.x, n.y, t, l - (0 === f || o ? 0 : .2)), s = b.polarToCartesian(n.x, n.y, t, p), w.line(r.x, r.y), w.arc(t, t, 0, p - l > 180, 1, s.x, s.y)) : w.line(n.x, n.y);
                    var x = a.classNames.slicePie;
                    a.donut && (x = a.classNames.sliceDonut, a.donutSolid && (x = a.classNames.sliceDonutSolid));
                    var y = k[f].elem("path", {d: w.stringify()}, x);
                    if (y.attr({
                        "ct:value": j.normalized.series[f],
                        "ct:meta": b.serialize(e.meta)
                    }), a.donut && !a.donutSolid && (y._node.style.strokeWidth = m.value + "px"), this.eventEmitter.emit("draw", {
                        type: "slice",
                        value: j.normalized.series[f],
                        totalDataSum: i,
                        index: f,
                        meta: e.meta,
                        series: e,
                        group: k[f],
                        element: y,
                        path: w.clone(),
                        center: n,
                        radius: g,
                        startAngle: l,
                        endAngle: p
                    }), a.showLabel) {
                        var z;
                        z = 1 === j.raw.series.length ? {
                            x: n.x,
                            y: n.y
                        } : b.polarToCartesian(n.x, n.y, h, l + (p - l) / 2);
                        var A;
                        A = j.normalized.labels && !b.isFalseyButZero(j.normalized.labels[f]) ? j.normalized.labels[f] : j.normalized.series[f];
                        var B = a.labelInterpolationFnc(A, f);
                        if (B || 0 === B) {
                            var C = d.elem("text", {
                                dx: z.x,
                                dy: z.y,
                                "text-anchor": c(n, z, a.labelDirection)
                            }, a.classNames.label).text("" + B);
                            this.eventEmitter.emit("draw", {
                                type: "label",
                                index: f,
                                group: d,
                                element: C,
                                text: "" + B,
                                x: z.x,
                                y: z.y
                            })
                        }
                    }
                    l = p
                }
            }.bind(this)), this.eventEmitter.emit("created", {chartRect: e, svg: this.svg, options: a})
        }

        function e(a, c, d, e) {
            b.Pie["super"].constructor.call(this, a, c, f, b.extend({}, f, d), e)
        }

        var f = (a.window, a.document, {
            width: void 0,
            height: void 0,
            chartPadding: 5,
            classNames: {
                chartPie: "ct-chart-pie",
                chartDonut: "ct-chart-donut",
                series: "ct-series",
                slicePie: "ct-slice-pie",
                sliceDonut: "ct-slice-donut",
                sliceDonutSolid: "ct-slice-donut-solid",
                label: "ct-label"
            },
            startAngle: 0,
            total: void 0,
            donut: !1,
            donutSolid: !1,
            donutWidth: 60,
            showLabel: !0,
            labelOffset: 0,
            labelPosition: "inside",
            labelInterpolationFnc: b.noop,
            labelDirection: "neutral",
            reverseData: !1,
            ignoreEmptyValues: !1
        });
        b.Pie = b.Base.extend({constructor: e, createChart: d, determineAnchorPosition: c})
    }(this || global, a), a
});
//# sourceMappingURL=chartist.min.js.map

var i, l, selectedLine = null;

/* Navigate to hash without browser history entry */
var navigateToHash = function () {
    if (window.history !== undefined && window.history.replaceState !== undefined) {
        window.history.replaceState(undefined, undefined, this.getAttribute("href"));
    }
};

var hashLinks = document.getElementsByClassName('navigatetohash');
for (i = 0, l = hashLinks.length; i < l; i++) {
    hashLinks[i].addEventListener('click', navigateToHash);
}

/* Switch test method */
var switchTestMethod = function () {
    var method = this.getAttribute("value");
    console.log("Selected test method: " + method);

    var lines, i, l, coverageData, lineAnalysis, cells;

    lines = document.querySelectorAll('.lineAnalysis tr');

    for (i = 1, l = lines.length; i < l; i++) {
        coverageData = JSON.parse(lines[i].getAttribute('data-coverage').replace(/'/g, '"'));
        lineAnalysis = coverageData[method];
        cells = lines[i].querySelectorAll('td');
        if (lineAnalysis === undefined) {
            lineAnalysis = coverageData.AllTestMethods;
            if (lineAnalysis.LVS !== 'gray') {
                cells[0].setAttribute('class', 'red');
                cells[1].innerText = cells[1].textContent = '0';
                cells[4].setAttribute('class', 'lightred');
            }
        } else {
            cells[0].setAttribute('class', lineAnalysis.LVS);
            cells[1].innerText = cells[1].textContent = lineAnalysis.VC;
            cells[4].setAttribute('class', 'light' + lineAnalysis.LVS);
        }
    }
};

var testMethods = document.getElementsByClassName('switchtestmethod');
for (i = 0, l = testMethods.length; i < l; i++) {
    testMethods[i].addEventListener('change', switchTestMethod);
}

/* Highlight test method by line */
var toggleLine = function () {
    if (selectedLine === this) {
        selectedLine = null;
    } else {
        selectedLine = null;
        unhighlightTestMethods();
        highlightTestMethods.call(this);
        selectedLine = this;
    }

};
var highlightTestMethods = function () {
    if (selectedLine !== null) {
        return;
    }

    var lineAnalysis;
    var coverageData = JSON.parse(this.getAttribute('data-coverage').replace(/'/g, '"'));
    var testMethods = document.getElementsByClassName('testmethod');

    for (i = 0, l = testMethods.length; i < l; i++) {
        lineAnalysis = coverageData[testMethods[i].id];
        if (lineAnalysis === undefined) {
            testMethods[i].className = testMethods[i].className.replace(/\s*light.+/g, "");
        } else {
            testMethods[i].className += ' light' + lineAnalysis.LVS;
        }
    }
};
var unhighlightTestMethods = function () {
    if (selectedLine !== null) {
        return;
    }

    var testMethods = document.getElementsByClassName('testmethod');
    for (i = 0, l = testMethods.length; i < l; i++) {
        testMethods[i].className = testMethods[i].className.replace(/\s*light.+/g, "");
    }
};
var coverableLines = document.getElementsByClassName('coverableline');
for (i = 0, l = coverableLines.length; i < l; i++) {
    coverableLines[i].addEventListener('click', toggleLine);
    coverableLines[i].addEventListener('mouseenter', highlightTestMethods);
    coverableLines[i].addEventListener('mouseleave', unhighlightTestMethods);
}

/* History charts */
var renderChart = function (chart) {
    // Remove current children (e.g. PNG placeholder)
    while (chart.firstChild) {
        chart.firstChild.remove();
    }

    var chartData = window[chart.getAttribute('data-data')];
    var options = {
        axisY: {
            type: undefined,
            onlyInteger: true
        },
        lineSmooth: false,
        low: 0,
        high: 100,
        scaleMinSpace: 20,
        onlyInteger: true,
        fullWidth: true
    };
    var lineChart = new Chartist.Line(chart, {
        labels: [],
        series: chartData.series
    }, options);

    /* Zoom */
    var zoomButtonDiv = document.createElement("div");
    zoomButtonDiv.className = "toggleZoom";
    var zoomButtonLink = document.createElement("a");
    zoomButtonLink.setAttribute("href", "");
    var zoomButtonText = document.createElement("i");
    zoomButtonText.className = "icon-search-plus";

    zoomButtonLink.appendChild(zoomButtonText);
    zoomButtonDiv.appendChild(zoomButtonLink);

    chart.appendChild(zoomButtonDiv);

    zoomButtonDiv.addEventListener('click', function (event) {
        event.preventDefault();

        if (options.axisY.type === undefined) {
            options.axisY.type = Chartist.AutoScaleAxis;
            zoomButtonText.className = "icon-search-minus";
        } else {
            options.axisY.type = undefined;
            zoomButtonText.className = "icon-search-plus";
        }

        lineChart.update(null, options);
    });

    var tooltip = document.createElement("div");
    tooltip.className = "tooltip";

    chart.appendChild(tooltip);

    /* Tooltips */
    var showToolTip = function () {
        var index = this.getAttribute('ct:meta');

        tooltip.innerHTML = chartData.tooltips[index];
        tooltip.style.display = 'block';
    };

    var moveToolTip = function (event) {
        var box = chart.getBoundingClientRect();
        var left = event.pageX - box.left - window.pageXOffset;
        var top = event.pageY - box.top - window.pageYOffset;

        left = left + 20;
        top = top - tooltip.offsetHeight / 2;

        if (left + tooltip.offsetWidth > box.width) {
            left -= tooltip.offsetWidth + 40;
        }

        if (top < 0) {
            top = 0;
        }

        if (top + tooltip.offsetHeight > box.height) {
            top = box.height - tooltip.offsetHeight;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    };

    var hideToolTip = function () {
        tooltip.style.display = 'none';
    };
    chart.addEventListener('mousemove', moveToolTip);

    lineChart.on('created', function () {
        var chartPoints = chart.getElementsByClassName('ct-point');
        for (i = 0, l = chartPoints.length; i < l; i++) {
            chartPoints[i].addEventListener('mousemove', showToolTip);
            chartPoints[i].addEventListener('mouseout', hideToolTip);
        }
    });
};

var charts = document.getElementsByClassName('historychart');
for (i = 0, l = charts.length; i < l; i++) {
    renderChart(charts[i]);
}

var assemblies = [
    {
        "name": "WebApi",
        "classes": [
            {
                "name": "AuthController",
                "rp": "WebApi_AuthController.html",
                "cl": 0,
                "ucl": 14,
                "cal": 14,
                "tl": 33,
                "cb": 0,
                "tb": 8,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "NLogController",
                "rp": "WebApi_NLogController.html",
                "cl": 0,
                "ucl": 9,
                "cal": 9,
                "tl": 18,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "Program",
                "rp": "WebApi_Program.html",
                "cl": 0,
                "ucl": 100,
                "cal": 100,
                "tl": 135,
                "cb": 0,
                "tb": 2,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "ResultFilter",
                "rp": "WebApi_ResultFilter.html",
                "cl": 0,
                "ucl": 19,
                "cal": 19,
                "tl": 32,
                "cb": 0,
                "tb": 14,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Controllers.CategoryController",
                "rp": "WebApi_CategoryController.html",
                "cl": 12,
                "ucl": 48,
                "cal": 60,
                "tl": 111,
                "cb": 0,
                "tb": 8,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Controllers.CourseController",
                "rp": "WebApi_CourseController.html",
                "cl": 11,
                "ucl": 50,
                "cal": 61,
                "tl": 113,
                "cb": 3,
                "tb": 10,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Controllers.UserController",
                "rp": "WebApi_UserController.html",
                "cl": 0,
                "ucl": 20,
                "cal": 20,
                "tl": 41,
                "cb": 0,
                "tb": 4,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebApi.DTOs.BaseModelDto",
                "rp": "WebApi_BaseModelDto.html",
                "cl": 1,
                "ucl": 0,
                "cal": 1,
                "tl": 6,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.DTOs.CategoryDto",
                "rp": "WebApi_CategoryDto.html",
                "cl": 5,
                "ucl": 0,
                "cal": 5,
                "tl": 13,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.DTOs.CourseDto",
                "rp": "WebApi_CourseDto.html",
                "cl": 3,
                "ucl": 0,
                "cal": 3,
                "tl": 10,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Filters.ExceptionFilter",
                "rp": "WebApi_ExceptionFilter.html",
                "cl": 0,
                "ucl": 13,
                "cal": 13,
                "tl": 25,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebApi.Migrations.DBContextModelSnapshot",
                "rp": "WebApi_DBContextModelSnapshot.html",
                "cl": 0,
                "ucl": 101,
                "cal": 101,
                "tl": 128,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebApi.Migrations.initialCreate",
                "rp": "WebApi_initialCreate.html",
                "cl": 0,
                "ucl": 183,
                "cal": 183,
                "tl": 237,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebApi.Models.BaseModel",
                "rp": "WebApi_BaseModel.html",
                "cl": 1,
                "ucl": 0,
                "cal": 1,
                "tl": 6,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Models.Category",
                "rp": "WebApi_Category.html",
                "cl": 5,
                "ucl": 1,
                "cal": 6,
                "tl": 16,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Models.CommonResult",
                "rp": "WebApi_CommonResult.html",
                "cl": 1,
                "ucl": 2,
                "cal": 3,
                "tl": 13,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Models.CommonResult<T>",
                "rp": "WebApi_CommonResult_1.html",
                "cl": 0,
                "ucl": 1,
                "cal": 1,
                "tl": 13,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Models.Course",
                "rp": "WebApi_Course.html",
                "cl": 0,
                "ucl": 4,
                "cal": 4,
                "tl": 13,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Models.DBContext",
                "rp": "WebApi_DBContext.html",
                "cl": 21,
                "ucl": 0,
                "cal": 21,
                "tl": 35,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Models.User",
                "rp": "WebApi_User.html",
                "cl": 0,
                "ucl": 2,
                "cal": 2,
                "tl": 17,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Models.UserDto",
                "rp": "WebApi_UserDto.html",
                "cl": 0,
                "ucl": 2,
                "cal": 2,
                "tl": 9,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Services.AuthService",
                "rp": "WebApi_AuthService.html",
                "cl": 0,
                "ucl": 21,
                "cal": 21,
                "tl": 40,
                "cb": 0,
                "tb": 0,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Services.CategoryService",
                "rp": "WebApi_CategoryService.html",
                "cl": 27,
                "ucl": 60,
                "cal": 87,
                "tl": 130,
                "cb": 5,
                "tb": 20,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Services.CourseService",
                "rp": "WebApi_CourseService.html",
                "cl": 0,
                "ucl": 63,
                "cal": 63,
                "tl": 107,
                "cb": 0,
                "tb": 12,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
            {
                "name": "WebAPI.Services.UserService",
                "rp": "WebApi_UserService.html",
                "cl": 0,
                "ucl": 16,
                "cal": 16,
                "tl": 34,
                "cb": 0,
                "tb": 2,
                "cm": 0,
                "tm": 0,
                "lch": [],
                "bch": [],
                "mch": [],
                "hc": [],
                "metrics": {}
            },
        ]
    },
];

var metrics = [{
    "name": "Crap Score",
    "abbreviation": "crp",
    "explanationUrl": "https://googletesting.blogspot.de/2011/02/this-code-is-crap.html"
}, {
    "name": "Cyclomatic complexity",
    "abbreviation": "cc",
    "explanationUrl": "https://en.wikipedia.org/wiki/Cyclomatic_complexity"
}, {
    "name": "Line coverage",
    "abbreviation": "cov",
    "explanationUrl": "https://en.wikipedia.org/wiki/Code_coverage"
}, {
    "name": "Branch coverage",
    "abbreviation": "bcov",
    "explanationUrl": "https://en.wikipedia.org/wiki/Code_coverage"
}];

var historicCoverageExecutionTimes = [];

var riskHotspotMetrics = [
    {"name": "Crap Score", "explanationUrl": "https://googletesting.blogspot.de/2011/02/this-code-is-crap.html"},
    {"name": "Cyclomatic complexity", "explanationUrl": "https://en.wikipedia.org/wiki/Cyclomatic_complexity"},
];

var riskHotspots = [
    {
        "assembly": "WebApi",
        "class": "ResultFilter",
        "reportPath": "WebApi_ResultFilter.html",
        "methodName": "OnResultExecuting(Microsoft.AspNetCore.Mvc.Filters.ResultExecutingContext)",
        "methodShortName": "OnResultExecuting(...)",
        "fileIndex": 0,
        "line": 8,
        "metrics": [
            {"value": 210, "exceeded": true},
            {"value": 14, "exceeded": false},
        ]
    },
    {
        "assembly": "WebApi",
        "class": "AuthController",
        "reportPath": "WebApi_AuthController.html",
        "methodName": "Login(WebAPI.Models.UserDto)",
        "methodShortName": "Login(...)",
        "fileIndex": 0,
        "line": 20,
        "metrics": [
            {"value": 72, "exceeded": true},
            {"value": 8, "exceeded": false},
        ]
    },
];

var branchCoverageAvailable = true;
var methodCoverageAvailable = false;
var maximumDecimalPlacesForCoverageQuotas = 1;


var translations = {
    'top': 'Top:',
    'all': 'All',
    'assembly': 'Assembly',
    'class': 'Class',
    'method': 'Method',
    'lineCoverage': 'Line coverage',
    'noGrouping': 'No grouping',
    'byAssembly': 'By assembly',
    'byNamespace': 'By namespace, Level:',
    'all': 'All',
    'collapseAll': 'Collapse all',
    'expandAll': 'Expand all',
    'grouping': 'Grouping:',
    'filter': 'Filter:',
    'name': 'Name',
    'covered': 'Covered',
    'uncovered': 'Uncovered',
    'coverable': 'Coverable',
    'total': 'Total',
    'coverage': 'Line coverage',
    'branchCoverage': 'Branch coverage',
    'methodCoverage': 'Method coverage',
    'percentage': 'Percentage',
    'history': 'Coverage history',
    'compareHistory': 'Compare with:',
    'date': 'Date',
    'allChanges': 'All changes',
    'selectCoverageTypes': 'Select coverage types',
    'selectCoverageTypesAndMetrics': 'Select coverage types & metrics',
    'coverageTypes': 'Coverage types',
    'metrics': 'Metrics',
    'methodCoverageProVersion': 'Feature is only available for sponsors',
    'lineCoverageIncreaseOnly': 'Line coverage: Increase only',
    'lineCoverageDecreaseOnly': 'Line coverage: Decrease only',
    'branchCoverageIncreaseOnly': 'Branch coverage: Increase only',
    'branchCoverageDecreaseOnly': 'Branch coverage: Decrease only',
    'methodCoverageIncreaseOnly': 'Method coverage: Increase only',
    'methodCoverageDecreaseOnly': 'Method coverage: Decrease only'
};


(() => {
    "use strict";
    var e, _ = {}, p = {};

    function n(e) {
        var a = p[e];
        if (void 0 !== a) return a.exports;
        var r = p[e] = {exports: {}};
        return _[e](r, r.exports, n), r.exports
    }

    n.m = _, e = [], n.O = (a, r, u, l) => {
        if (!r) {
            var o = 1 / 0;
            for (f = 0; f < e.length; f++) {
                for (var [r, u, l] = e[f], v = !0, t = 0; t < r.length; t++) (!1 & l || o >= l) && Object.keys(n.O).every(h => n.O[h](r[t])) ? r.splice(t--, 1) : (v = !1, l < o && (o = l));
                if (v) {
                    e.splice(f--, 1);
                    var c = u();
                    void 0 !== c && (a = c)
                }
            }
            return a
        }
        l = l || 0;
        for (var f = e.length; f > 0 && e[f - 1][2] > l; f--) e[f] = e[f - 1];
        e[f] = [r, u, l]
    }, n.n = e => {
        var a = e && e.__esModule ? () => e.default : () => e;
        return n.d(a, {a}), a
    }, n.d = (e, a) => {
        for (var r in a) n.o(a, r) && !n.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: a[r]})
    }, n.o = (e, a) => Object.prototype.hasOwnProperty.call(e, a), (() => {
        var e = {121: 0};
        n.O.j = u => 0 === e[u];
        var a = (u, l) => {
            var t, c, [f, o, v] = l, s = 0;
            if (f.some(d => 0 !== e[d])) {
                for (t in o) n.o(o, t) && (n.m[t] = o[t]);
                if (v) var b = v(n)
            }
            for (u && u(l); s < f.length; s++) n.o(e, c = f[s]) && e[c] && e[c][0](), e[c] = 0;
            return n.O(b)
        }, r = self.webpackChunkcoverage_app = self.webpackChunkcoverage_app || [];
        r.forEach(a.bind(null, 0)), r.push = a.bind(null, r.push.bind(r))
    })()
})();

"use strict";
(self.webpackChunkcoverage_app = self.webpackChunkcoverage_app || []).push([[461], {
    50: (te, Q, ve) => {
        ve(935)
    }, 935: () => {
        const te = globalThis;

        function Q(e) {
            return (te.__Zone_symbol_prefix || "__zone_symbol__") + e
        }

        const Te = Object.getOwnPropertyDescriptor, Le = Object.defineProperty, Ie = Object.getPrototypeOf,
            _t = Object.create, Et = Array.prototype.slice, Me = "addEventListener", Ze = "removeEventListener",
            Ae = Q(Me), je = Q(Ze), ae = "true", le = "false", Pe = Q("");

        function He(e, r) {
            return Zone.current.wrap(e, r)
        }

        function xe(e, r, c, t, i) {
            return Zone.current.scheduleMacroTask(e, r, c, t, i)
        }

        const j = Q, Ce = typeof window < "u", ge = Ce ? window : void 0, $ = Ce && ge || globalThis,
            Tt = "removeAttribute";

        function Ve(e, r) {
            for (let c = e.length - 1; c >= 0; c--) "function" == typeof e[c] && (e[c] = He(e[c], r + "_" + c));
            return e
        }

        function We(e) {
            return !e || !1 !== e.writable && !("function" == typeof e.get && typeof e.set > "u")
        }

        const qe = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope,
            De = !("nw" in $) && typeof $.process < "u" && "[object process]" === $.process.toString(),
            Ge = !De && !qe && !(!Ce || !ge.HTMLElement),
            Xe = typeof $.process < "u" && "[object process]" === $.process.toString() && !qe && !(!Ce || !ge.HTMLElement),
            Se = {}, pt = j("enable_beforeunload"), Ye = function (e) {
                if (!(e = e || $.event)) return;
                let r = Se[e.type];
                r || (r = Se[e.type] = j("ON_PROPERTY" + e.type));
                const c = this || e.target || $, t = c[r];
                let i;
                return Ge && c === ge && "error" === e.type ? (i = t && t.call(this, e.message, e.filename, e.lineno, e.colno, e.error), !0 === i && e.preventDefault()) : (i = t && t.apply(this, arguments), "beforeunload" === e.type && $[pt] && "string" == typeof i ? e.returnValue = i : null != i && !i && e.preventDefault()), i
            };

        function $e(e, r, c) {
            let t = Te(e, r);
            if (!t && c && Te(c, r) && (t = {enumerable: !0, configurable: !0}), !t || !t.configurable) return;
            const i = j("on" + r + "patched");
            if (e.hasOwnProperty(i) && e[i]) return;
            delete t.writable, delete t.value;
            const u = t.get, E = t.set, T = r.slice(2);
            let y = Se[T];
            y || (y = Se[T] = j("ON_PROPERTY" + T)), t.set = function (D) {
                let d = this;
                !d && e === $ && (d = $), d && ("function" == typeof d[y] && d.removeEventListener(T, Ye), E && E.call(d, null), d[y] = D, "function" == typeof D && d.addEventListener(T, Ye, !1))
            }, t.get = function () {
                let D = this;
                if (!D && e === $ && (D = $), !D) return null;
                const d = D[y];
                if (d) return d;
                if (u) {
                    let w = u.call(this);
                    if (w) return t.set.call(this, w), "function" == typeof D[Tt] && D.removeAttribute(r), w
                }
                return null
            }, Le(e, r, t), e[i] = !0
        }

        function Ke(e, r, c) {
            if (r) for (let t = 0; t < r.length; t++) $e(e, "on" + r[t], c); else {
                const t = [];
                for (const i in e) "on" == i.slice(0, 2) && t.push(i);
                for (let i = 0; i < t.length; i++) $e(e, t[i], c)
            }
        }

        const re = j("originalInstance");

        function we(e) {
            const r = $[e];
            if (!r) return;
            $[j(e)] = r, $[e] = function () {
                const i = Ve(arguments, e);
                switch (i.length) {
                    case 0:
                        this[re] = new r;
                        break;
                    case 1:
                        this[re] = new r(i[0]);
                        break;
                    case 2:
                        this[re] = new r(i[0], i[1]);
                        break;
                    case 3:
                        this[re] = new r(i[0], i[1], i[2]);
                        break;
                    case 4:
                        this[re] = new r(i[0], i[1], i[2], i[3]);
                        break;
                    default:
                        throw new Error("Arg list too long.")
                }
            }, fe($[e], r);
            const c = new r(function () {
            });
            let t;
            for (t in c) "XMLHttpRequest" === e && "responseBlob" === t || function (i) {
                "function" == typeof c[i] ? $[e].prototype[i] = function () {
                    return this[re][i].apply(this[re], arguments)
                } : Le($[e].prototype, i, {
                    set: function (u) {
                        "function" == typeof u ? (this[re][i] = He(u, e + "." + i), fe(this[re][i], u)) : this[re][i] = u
                    }, get: function () {
                        return this[re][i]
                    }
                })
            }(t);
            for (t in r) "prototype" !== t && r.hasOwnProperty(t) && ($[e][t] = r[t])
        }

        function ue(e, r, c) {
            let t = e;
            for (; t && !t.hasOwnProperty(r);) t = Ie(t);
            !t && e[r] && (t = e);
            const i = j(r);
            let u = null;
            if (t && (!(u = t[i]) || !t.hasOwnProperty(i)) && (u = t[i] = t[r], We(t && Te(t, r)))) {
                const T = c(u, i, r);
                t[r] = function () {
                    return T(this, arguments)
                }, fe(t[r], u)
            }
            return u
        }

        function yt(e, r, c) {
            let t = null;

            function i(u) {
                const E = u.data;
                return E.args[E.cbIdx] = function () {
                    u.invoke.apply(this, arguments)
                }, t.apply(E.target, E.args), u
            }

            t = ue(e, r, u => function (E, T) {
                const y = c(E, T);
                return y.cbIdx >= 0 && "function" == typeof T[y.cbIdx] ? xe(y.name, T[y.cbIdx], y, i) : u.apply(E, T)
            })
        }

        function fe(e, r) {
            e[j("OriginalDelegate")] = r
        }

        let Je = !1, Be = !1;

        function kt() {
            if (Je) return Be;
            Je = !0;
            try {
                const e = ge.navigator.userAgent;
                (-1 !== e.indexOf("MSIE ") || -1 !== e.indexOf("Trident/") || -1 !== e.indexOf("Edge/")) && (Be = !0)
            } catch {
            }
            return Be
        }

        function Qe(e) {
            return "function" == typeof e
        }

        function et(e) {
            return "number" == typeof e
        }

        let pe = !1;
        if (typeof window < "u") try {
            const e = Object.defineProperty({}, "passive", {
                get: function () {
                    pe = !0
                }
            });
            window.addEventListener("test", e, e), window.removeEventListener("test", e, e)
        } catch {
            pe = !1
        }
        const vt = {useG: !0}, ne = {}, tt = {}, nt = new RegExp("^" + Pe + "(\\w+)(true|false)$"),
            rt = j("propagationStopped");

        function ot(e, r) {
            const c = (r ? r(e) : e) + le, t = (r ? r(e) : e) + ae, i = Pe + c, u = Pe + t;
            ne[e] = {}, ne[e][le] = i, ne[e][ae] = u
        }

        function bt(e, r, c, t) {
            const i = t && t.add || Me, u = t && t.rm || Ze, E = t && t.listeners || "eventListeners",
                T = t && t.rmAll || "removeAllListeners", y = j(i), D = "." + i + ":", d = "prependListener",
                w = "." + d + ":", Z = function (k, h, H) {
                    if (k.isRemoved) return;
                    const V = k.callback;
                    let Y;
                    "object" == typeof V && V.handleEvent && (k.callback = g => V.handleEvent(g), k.originalDelegate = V);
                    try {
                        k.invoke(k, h, [H])
                    } catch (g) {
                        Y = g
                    }
                    const G = k.options;
                    return G && "object" == typeof G && G.once && h[u].call(h, H.type, k.originalDelegate ? k.originalDelegate : k.callback, G), Y
                };

            function x(k, h, H) {
                if (!(h = h || e.event)) return;
                const V = k || h.target || e, Y = V[ne[h.type][H ? ae : le]];
                if (Y) {
                    const G = [];
                    if (1 === Y.length) {
                        const g = Z(Y[0], V, h);
                        g && G.push(g)
                    } else {
                        const g = Y.slice();
                        for (let z = 0; z < g.length && (!h || !0 !== h[rt]); z++) {
                            const O = Z(g[z], V, h);
                            O && G.push(O)
                        }
                    }
                    if (1 === G.length) throw G[0];
                    for (let g = 0; g < G.length; g++) {
                        const z = G[g];
                        r.nativeScheduleMicroTask(() => {
                            throw z
                        })
                    }
                }
            }

            const U = function (k) {
                return x(this, k, !1)
            }, K = function (k) {
                return x(this, k, !0)
            };

            function J(k, h) {
                if (!k) return !1;
                let H = !0;
                h && void 0 !== h.useG && (H = h.useG);
                const V = h && h.vh;
                let Y = !0;
                h && void 0 !== h.chkDup && (Y = h.chkDup);
                let G = !1;
                h && void 0 !== h.rt && (G = h.rt);
                let g = k;
                for (; g && !g.hasOwnProperty(i);) g = Ie(g);
                if (!g && k[i] && (g = k), !g || g[y]) return !1;
                const z = h && h.eventNameToString, O = {}, R = g[y] = g[i], b = g[j(u)] = g[u], S = g[j(E)] = g[E],
                    ee = g[j(T)] = g[T];
                let W;
                h && h.prepend && (W = g[j(h.prepend)] = g[h.prepend]);
                const q = H ? function (s) {
                        if (!O.isExisting) return R.call(O.target, O.eventName, O.capture ? K : U, O.options)
                    } : function (s) {
                        return R.call(O.target, O.eventName, s.invoke, O.options)
                    }, A = H ? function (s) {
                        if (!s.isRemoved) {
                            const l = ne[s.eventName];
                            let v;
                            l && (v = l[s.capture ? ae : le]);
                            const C = v && s.target[v];
                            if (C) for (let p = 0; p < C.length; p++) if (C[p] === s) {
                                C.splice(p, 1), s.isRemoved = !0, s.removeAbortListener && (s.removeAbortListener(), s.removeAbortListener = null), 0 === C.length && (s.allRemoved = !0, s.target[v] = null);
                                break
                            }
                        }
                        if (s.allRemoved) return b.call(s.target, s.eventName, s.capture ? K : U, s.options)
                    } : function (s) {
                        return b.call(s.target, s.eventName, s.invoke, s.options)
                    }, he = h && h.diff ? h.diff : function (s, l) {
                        const v = typeof l;
                        return "function" === v && s.callback === l || "object" === v && s.originalDelegate === l
                    }, de = Zone[j("UNPATCHED_EVENTS")], oe = e[j("PASSIVE_EVENTS")],
                    a = function (s, l, v, C, p = !1, L = !1) {
                        return function () {
                            const I = this || e;
                            let M = arguments[0];
                            h && h.transferEventName && (M = h.transferEventName(M));
                            let B = arguments[1];
                            if (!B) return s.apply(this, arguments);
                            if (De && "uncaughtException" === M) return s.apply(this, arguments);
                            let F = !1;
                            if ("function" != typeof B) {
                                if (!B.handleEvent) return s.apply(this, arguments);
                                F = !0
                            }
                            if (V && !V(s, B, I, arguments)) return;
                            const Ee = pe && !!oe && -1 !== oe.indexOf(M), ie = function f(s) {
                                if ("object" == typeof s && null !== s) {
                                    const l = {...s};
                                    return s.signal && (l.signal = s.signal), l
                                }
                                return s
                            }(function N(s, l) {
                                return !pe && "object" == typeof s && s ? !!s.capture : pe && l ? "boolean" == typeof s ? {
                                    capture: s,
                                    passive: !0
                                } : s ? "object" == typeof s && !1 !== s.passive ? {
                                    ...s,
                                    passive: !0
                                } : s : {passive: !0} : s
                            }(arguments[2], Ee)), me = ie?.signal;
                            if (me?.aborted) return;
                            if (de) for (let ce = 0; ce < de.length; ce++) if (M === de[ce]) return Ee ? s.call(I, M, B, ie) : s.apply(this, arguments);
                            const Ue = !!ie && ("boolean" == typeof ie || ie.capture),
                                lt = !(!ie || "object" != typeof ie) && ie.once, At = Zone.current;
                            let ze = ne[M];
                            ze || (ot(M, z), ze = ne[M]);
                            const ut = ze[Ue ? ae : le];
                            let Ne, ke = I[ut], ft = !1;
                            if (ke) {
                                if (ft = !0, Y) for (let ce = 0; ce < ke.length; ce++) if (he(ke[ce], B)) return
                            } else ke = I[ut] = [];
                            const ht = I.constructor.name, dt = tt[ht];
                            dt && (Ne = dt[M]), Ne || (Ne = ht + l + (z ? z(M) : M)), O.options = ie, lt && (O.options.once = !1), O.target = I, O.capture = Ue, O.eventName = M, O.isExisting = ft;
                            const Re = H ? vt : void 0;
                            Re && (Re.taskData = O), me && (O.options.signal = void 0);
                            const se = At.scheduleEventTask(Ne, B, Re, v, C);
                            if (me) {
                                O.options.signal = me;
                                const ce = () => se.zone.cancelTask(se);
                                s.call(me, "abort", ce, {once: !0}), se.removeAbortListener = () => me.removeEventListener("abort", ce)
                            }
                            return O.target = null, Re && (Re.taskData = null), lt && (O.options.once = !0), !pe && "boolean" == typeof se.options || (se.options = ie), se.target = I, se.capture = Ue, se.eventName = M, F && (se.originalDelegate = B), L ? ke.unshift(se) : ke.push(se), p ? I : void 0
                        }
                    };
                return g[i] = a(R, D, q, A, G), W && (g[d] = a(W, w, function (s) {
                    return W.call(O.target, O.eventName, s.invoke, O.options)
                }, A, G, !0)), g[u] = function () {
                    const s = this || e;
                    let l = arguments[0];
                    h && h.transferEventName && (l = h.transferEventName(l));
                    const v = arguments[2], C = !!v && ("boolean" == typeof v || v.capture), p = arguments[1];
                    if (!p) return b.apply(this, arguments);
                    if (V && !V(b, p, s, arguments)) return;
                    const L = ne[l];
                    let I;
                    L && (I = L[C ? ae : le]);
                    const M = I && s[I];
                    if (M) for (let B = 0; B < M.length; B++) {
                        const F = M[B];
                        if (he(F, p)) return M.splice(B, 1), F.isRemoved = !0, 0 !== M.length || (F.allRemoved = !0, s[I] = null, C || "string" != typeof l) || (s[Pe + "ON_PROPERTY" + l] = null), F.zone.cancelTask(F), G ? s : void 0
                    }
                    return b.apply(this, arguments)
                }, g[E] = function () {
                    const s = this || e;
                    let l = arguments[0];
                    h && h.transferEventName && (l = h.transferEventName(l));
                    const v = [], C = st(s, z ? z(l) : l);
                    for (let p = 0; p < C.length; p++) {
                        const L = C[p];
                        v.push(L.originalDelegate ? L.originalDelegate : L.callback)
                    }
                    return v
                }, g[T] = function () {
                    const s = this || e;
                    let l = arguments[0];
                    if (l) {
                        h && h.transferEventName && (l = h.transferEventName(l));
                        const v = ne[l];
                        if (v) {
                            const L = s[v[le]], I = s[v[ae]];
                            if (L) {
                                const M = L.slice();
                                for (let B = 0; B < M.length; B++) {
                                    const F = M[B];
                                    this[u].call(this, l, F.originalDelegate ? F.originalDelegate : F.callback, F.options)
                                }
                            }
                            if (I) {
                                const M = I.slice();
                                for (let B = 0; B < M.length; B++) {
                                    const F = M[B];
                                    this[u].call(this, l, F.originalDelegate ? F.originalDelegate : F.callback, F.options)
                                }
                            }
                        }
                    } else {
                        const v = Object.keys(s);
                        for (let C = 0; C < v.length; C++) {
                            const L = nt.exec(v[C]);
                            let I = L && L[1];
                            I && "removeListener" !== I && this[T].call(this, I)
                        }
                        this[T].call(this, "removeListener")
                    }
                    if (G) return this
                }, fe(g[i], R), fe(g[u], b), ee && fe(g[T], ee), S && fe(g[E], S), !0
            }

            let X = [];
            for (let k = 0; k < c.length; k++) X[k] = J(c[k], t);
            return X
        }

        function st(e, r) {
            if (!r) {
                const u = [];
                for (let E in e) {
                    const T = nt.exec(E);
                    let y = T && T[1];
                    if (y && (!r || y === r)) {
                        const D = e[E];
                        if (D) for (let d = 0; d < D.length; d++) u.push(D[d])
                    }
                }
                return u
            }
            let c = ne[r];
            c || (ot(r), c = ne[r]);
            const t = e[c[le]], i = e[c[ae]];
            return t ? i ? t.concat(i) : t.slice() : i ? i.slice() : []
        }

        function Pt(e, r) {
            const c = e.Event;
            c && c.prototype && r.patchMethod(c.prototype, "stopImmediatePropagation", t => function (i, u) {
                i[rt] = !0, t && t.apply(i, u)
            })
        }

        const Oe = j("zoneTask");

        function ye(e, r, c, t) {
            let i = null, u = null;
            c += t;
            const E = {};

            function T(D) {
                const d = D.data;
                d.args[0] = function () {
                    return D.invoke.apply(this, arguments)
                };
                const w = i.apply(e, d.args);
                return et(w) ? d.handleId = w : (d.handle = w, d.isRefreshable = Qe(w.refresh)), D
            }

            function y(D) {
                const {handle: d, handleId: w} = D.data;
                return u.call(e, d ?? w)
            }

            i = ue(e, r += t, D => function (d, w) {
                if (Qe(w[0])) {
                    const Z = {
                        isRefreshable: !1,
                        isPeriodic: "Interval" === t,
                        delay: "Timeout" === t || "Interval" === t ? w[1] || 0 : void 0,
                        args: w
                    }, x = w[0];
                    w[0] = function () {
                        try {
                            return x.apply(this, arguments)
                        } finally {
                            const {handle: H, handleId: V, isPeriodic: Y, isRefreshable: G} = Z;
                            !Y && !G && (V ? delete E[V] : H && (H[Oe] = null))
                        }
                    };
                    const U = xe(r, w[0], Z, T, y);
                    if (!U) return U;
                    const {handleId: K, handle: J, isRefreshable: X, isPeriodic: k} = U.data;
                    if (K) E[K] = U; else if (J && (J[Oe] = U, X && !k)) {
                        const h = J.refresh;
                        J.refresh = function () {
                            const {zone: H, state: V} = U;
                            return "notScheduled" === V ? (U._state = "scheduled", H._updateTaskCount(U, 1)) : "running" === V && (U._state = "scheduling"), h.call(this)
                        }
                    }
                    return J ?? K ?? U
                }
                return D.apply(e, w)
            }), u = ue(e, c, D => function (d, w) {
                const Z = w[0];
                let x;
                et(Z) ? (x = E[Z], delete E[Z]) : (x = Z?.[Oe], x ? Z[Oe] = null : x = Z), x?.type ? x.cancelFn && x.zone.cancelTask(x) : D.apply(e, w)
            })
        }

        function it(e, r, c) {
            if (!c || 0 === c.length) return r;
            const t = c.filter(u => u.target === e);
            if (!t || 0 === t.length) return r;
            const i = t[0].ignoreProperties;
            return r.filter(u => -1 === i.indexOf(u))
        }

        function ct(e, r, c, t) {
            e && Ke(e, it(e, r, c), t)
        }

        function Fe(e) {
            return Object.getOwnPropertyNames(e).filter(r => r.startsWith("on") && r.length > 2).map(r => r.substring(2))
        }

        function It(e, r, c, t, i) {
            const u = Zone.__symbol__(t);
            if (r[u]) return;
            const E = r[u] = r[t];
            r[t] = function (T, y, D) {
                return y && y.prototype && i.forEach(function (d) {
                    const w = `${c}.${t}::` + d, Z = y.prototype;
                    try {
                        if (Z.hasOwnProperty(d)) {
                            const x = e.ObjectGetOwnPropertyDescriptor(Z, d);
                            x && x.value ? (x.value = e.wrapWithCurrentZone(x.value, w), e._redefineProperty(y.prototype, d, x)) : Z[d] && (Z[d] = e.wrapWithCurrentZone(Z[d], w))
                        } else Z[d] && (Z[d] = e.wrapWithCurrentZone(Z[d], w))
                    } catch {
                    }
                }), E.call(r, T, y, D)
            }, e.attachOriginToPatched(r[t], E)
        }

        const at = function be() {
            const e = globalThis, r = !0 === e[Q("forceDuplicateZoneCheck")];
            if (e.Zone && (r || "function" != typeof e.Zone.__symbol__)) throw new Error("Zone already loaded.");
            return e.Zone ??= function ve() {
                const e = te.performance;

                function r(N) {
                    e && e.mark && e.mark(N)
                }

                function c(N, _) {
                    e && e.measure && e.measure(N, _)
                }

                r("Zone");
                let t = (() => {
                    class N {
                        static#e = this.__symbol__ = Q;

                        constructor(n, o) {
                            this._parent = n, this._name = o ? o.name || "unnamed" : "<root>", this._properties = o && o.properties || {}, this._zoneDelegate = new u(this, this._parent && this._parent._zoneDelegate, o)
                        }

                        static get root() {
                            let n = N.current;
                            for (; n.parent;) n = n.parent;
                            return n
                        }

                        static get current() {
                            return b.zone
                        }

                        static get currentTask() {
                            return S
                        }

                        get parent() {
                            return this._parent
                        }

                        get name() {
                            return this._name
                        }

                        static assertZonePatched() {
                            if (te.Promise !== O.ZoneAwarePromise) throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")
                        }

                        static __load_patch(n, o, m = !1) {
                            if (O.hasOwnProperty(n)) {
                                const P = !0 === te[Q("forceDuplicateZoneCheck")];
                                if (!m && P) throw Error("Already loaded patch: " + n)
                            } else if (!te["__Zone_disable_" + n]) {
                                const P = "Zone:" + n;
                                r(P), O[n] = o(te, N, R), c(P, P)
                            }
                        }

                        get(n) {
                            const o = this.getZoneWith(n);
                            if (o) return o._properties[n]
                        }

                        getZoneWith(n) {
                            let o = this;
                            for (; o;) {
                                if (o._properties.hasOwnProperty(n)) return o;
                                o = o._parent
                            }
                            return null
                        }

                        fork(n) {
                            if (!n) throw new Error("ZoneSpec required!");
                            return this._zoneDelegate.fork(this, n)
                        }

                        wrap(n, o) {
                            if ("function" != typeof n) throw new Error("Expecting function got: " + n);
                            const m = this._zoneDelegate.intercept(this, n, o), P = this;
                            return function () {
                                return P.runGuarded(m, this, arguments, o)
                            }
                        }

                        run(n, o, m, P) {
                            b = {parent: b, zone: this};
                            try {
                                return this._zoneDelegate.invoke(this, n, o, m, P)
                            } finally {
                                b = b.parent
                            }
                        }

                        runGuarded(n, o = null, m, P) {
                            b = {parent: b, zone: this};
                            try {
                                try {
                                    return this._zoneDelegate.invoke(this, n, o, m, P)
                                } catch (q) {
                                    if (this._zoneDelegate.handleError(this, q)) throw q
                                }
                            } finally {
                                b = b.parent
                            }
                        }

                        runTask(n, o, m) {
                            if (n.zone != this) throw new Error("A task can only be run in the zone of creation! (Creation: " + (n.zone || J).name + "; Execution: " + this.name + ")");
                            const P = n, {type: q, data: {isPeriodic: A = !1, isRefreshable: _e = !1} = {}} = n;
                            if (n.state === X && (q === z || q === g)) return;
                            const he = n.state != H;
                            he && P._transitionTo(H, h);
                            const de = S;
                            S = P, b = {parent: b, zone: this};
                            try {
                                q == g && n.data && !A && !_e && (n.cancelFn = void 0);
                                try {
                                    return this._zoneDelegate.invokeTask(this, P, o, m)
                                } catch (oe) {
                                    if (this._zoneDelegate.handleError(this, oe)) throw oe
                                }
                            } finally {
                                const oe = n.state;
                                if (oe !== X && oe !== Y) if (q == z || A || _e && oe === k) he && P._transitionTo(h, H, k); else {
                                    const f = P._zoneDelegates;
                                    this._updateTaskCount(P, -1), he && P._transitionTo(X, H, X), _e && (P._zoneDelegates = f)
                                }
                                b = b.parent, S = de
                            }
                        }

                        scheduleTask(n) {
                            if (n.zone && n.zone !== this) {
                                let m = this;
                                for (; m;) {
                                    if (m === n.zone) throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${n.zone.name}`);
                                    m = m.parent
                                }
                            }
                            n._transitionTo(k, X);
                            const o = [];
                            n._zoneDelegates = o, n._zone = this;
                            try {
                                n = this._zoneDelegate.scheduleTask(this, n)
                            } catch (m) {
                                throw n._transitionTo(Y, k, X), this._zoneDelegate.handleError(this, m), m
                            }
                            return n._zoneDelegates === o && this._updateTaskCount(n, 1), n.state == k && n._transitionTo(h, k), n
                        }

                        scheduleMicroTask(n, o, m, P) {
                            return this.scheduleTask(new E(G, n, o, m, P, void 0))
                        }

                        scheduleMacroTask(n, o, m, P, q) {
                            return this.scheduleTask(new E(g, n, o, m, P, q))
                        }

                        scheduleEventTask(n, o, m, P, q) {
                            return this.scheduleTask(new E(z, n, o, m, P, q))
                        }

                        cancelTask(n) {
                            if (n.zone != this) throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (n.zone || J).name + "; Execution: " + this.name + ")");
                            if (n.state === h || n.state === H) {
                                n._transitionTo(V, h, H);
                                try {
                                    this._zoneDelegate.cancelTask(this, n)
                                } catch (o) {
                                    throw n._transitionTo(Y, V), this._zoneDelegate.handleError(this, o), o
                                }
                                return this._updateTaskCount(n, -1), n._transitionTo(X, V), n.runCount = -1, n
                            }
                        }

                        _updateTaskCount(n, o) {
                            const m = n._zoneDelegates;
                            -1 == o && (n._zoneDelegates = null);
                            for (let P = 0; P < m.length; P++) m[P]._updateTaskCount(n.type, o)
                        }
                    }

                    return N
                })();
                const i = {
                    name: "",
                    onHasTask: (N, _, n, o) => N.hasTask(n, o),
                    onScheduleTask: (N, _, n, o) => N.scheduleTask(n, o),
                    onInvokeTask: (N, _, n, o, m, P) => N.invokeTask(n, o, m, P),
                    onCancelTask: (N, _, n, o) => N.cancelTask(n, o)
                };

                class u {
                    constructor(_, n, o) {
                        this._taskCounts = {
                            microTask: 0,
                            macroTask: 0,
                            eventTask: 0
                        }, this._zone = _, this._parentDelegate = n, this._forkZS = o && (o && o.onFork ? o : n._forkZS), this._forkDlgt = o && (o.onFork ? n : n._forkDlgt), this._forkCurrZone = o && (o.onFork ? this._zone : n._forkCurrZone), this._interceptZS = o && (o.onIntercept ? o : n._interceptZS), this._interceptDlgt = o && (o.onIntercept ? n : n._interceptDlgt), this._interceptCurrZone = o && (o.onIntercept ? this._zone : n._interceptCurrZone), this._invokeZS = o && (o.onInvoke ? o : n._invokeZS), this._invokeDlgt = o && (o.onInvoke ? n : n._invokeDlgt), this._invokeCurrZone = o && (o.onInvoke ? this._zone : n._invokeCurrZone), this._handleErrorZS = o && (o.onHandleError ? o : n._handleErrorZS), this._handleErrorDlgt = o && (o.onHandleError ? n : n._handleErrorDlgt), this._handleErrorCurrZone = o && (o.onHandleError ? this._zone : n._handleErrorCurrZone), this._scheduleTaskZS = o && (o.onScheduleTask ? o : n._scheduleTaskZS), this._scheduleTaskDlgt = o && (o.onScheduleTask ? n : n._scheduleTaskDlgt), this._scheduleTaskCurrZone = o && (o.onScheduleTask ? this._zone : n._scheduleTaskCurrZone), this._invokeTaskZS = o && (o.onInvokeTask ? o : n._invokeTaskZS), this._invokeTaskDlgt = o && (o.onInvokeTask ? n : n._invokeTaskDlgt), this._invokeTaskCurrZone = o && (o.onInvokeTask ? this._zone : n._invokeTaskCurrZone), this._cancelTaskZS = o && (o.onCancelTask ? o : n._cancelTaskZS), this._cancelTaskDlgt = o && (o.onCancelTask ? n : n._cancelTaskDlgt), this._cancelTaskCurrZone = o && (o.onCancelTask ? this._zone : n._cancelTaskCurrZone), this._hasTaskZS = null, this._hasTaskDlgt = null, this._hasTaskDlgtOwner = null, this._hasTaskCurrZone = null;
                        const m = o && o.onHasTask;
                        (m || n && n._hasTaskZS) && (this._hasTaskZS = m ? o : i, this._hasTaskDlgt = n, this._hasTaskDlgtOwner = this, this._hasTaskCurrZone = this._zone, o.onScheduleTask || (this._scheduleTaskZS = i, this._scheduleTaskDlgt = n, this._scheduleTaskCurrZone = this._zone), o.onInvokeTask || (this._invokeTaskZS = i, this._invokeTaskDlgt = n, this._invokeTaskCurrZone = this._zone), o.onCancelTask || (this._cancelTaskZS = i, this._cancelTaskDlgt = n, this._cancelTaskCurrZone = this._zone))
                    }

                    get zone() {
                        return this._zone
                    }

                    fork(_, n) {
                        return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, _, n) : new t(_, n)
                    }

                    intercept(_, n, o) {
                        return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, _, n, o) : n
                    }

                    invoke(_, n, o, m, P) {
                        return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, _, n, o, m, P) : n.apply(o, m)
                    }

                    handleError(_, n) {
                        return !this._handleErrorZS || this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, _, n)
                    }

                    scheduleTask(_, n) {
                        let o = n;
                        if (this._scheduleTaskZS) this._hasTaskZS && o._zoneDelegates.push(this._hasTaskDlgtOwner), o = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, _, n), o || (o = n); else if (n.scheduleFn) n.scheduleFn(n); else {
                            if (n.type != G) throw new Error("Task is missing scheduleFn.");
                            U(n)
                        }
                        return o
                    }

                    invokeTask(_, n, o, m) {
                        return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, _, n, o, m) : n.callback.apply(o, m)
                    }

                    cancelTask(_, n) {
                        let o;
                        if (this._cancelTaskZS) o = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, _, n); else {
                            if (!n.cancelFn) throw Error("Task is not cancelable");
                            o = n.cancelFn(n)
                        }
                        return o
                    }

                    hasTask(_, n) {
                        try {
                            this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, _, n)
                        } catch (o) {
                            this.handleError(_, o)
                        }
                    }

                    _updateTaskCount(_, n) {
                        const o = this._taskCounts, m = o[_], P = o[_] = m + n;
                        if (P < 0) throw new Error("More tasks executed then were scheduled.");
                        0 != m && 0 != P || this.hasTask(this._zone, {
                            microTask: o.microTask > 0,
                            macroTask: o.macroTask > 0,
                            eventTask: o.eventTask > 0,
                            change: _
                        })
                    }
                }

                class E {
                    constructor(_, n, o, m, P, q) {
                        if (this._zone = null, this.runCount = 0, this._zoneDelegates = null, this._state = "notScheduled", this.type = _, this.source = n, this.data = m, this.scheduleFn = P, this.cancelFn = q, !o) throw new Error("callback is not defined");
                        this.callback = o;
                        const A = this;
                        this.invoke = _ === z && m && m.useG ? E.invokeTask : function () {
                            return E.invokeTask.call(te, A, this, arguments)
                        }
                    }

                    get zone() {
                        return this._zone
                    }

                    get state() {
                        return this._state
                    }

                    static invokeTask(_, n, o) {
                        _ || (_ = this), ee++;
                        try {
                            return _.runCount++, _.zone.runTask(_, n, o)
                        } finally {
                            1 == ee && K(), ee--
                        }
                    }

                    cancelScheduleRequest() {
                        this._transitionTo(X, k)
                    }

                    _transitionTo(_, n, o) {
                        if (this._state !== n && this._state !== o) throw new Error(`${this.type} '${this.source}': can not transition to '${_}', expecting state '${n}'${o ? " or '" + o + "'" : ""}, was '${this._state}'.`);
                        this._state = _, _ == X && (this._zoneDelegates = null)
                    }

                    toString() {
                        return this.data && typeof this.data.handleId < "u" ? this.data.handleId.toString() : Object.prototype.toString.call(this)
                    }

                    toJSON() {
                        return {
                            type: this.type,
                            state: this.state,
                            source: this.source,
                            zone: this.zone.name,
                            runCount: this.runCount
                        }
                    }
                }

                const T = Q("setTimeout"), y = Q("Promise"), D = Q("then");
                let Z, d = [], w = !1;

                function x(N) {
                    if (Z || te[y] && (Z = te[y].resolve(0)), Z) {
                        let _ = Z[D];
                        _ || (_ = Z.then), _.call(Z, N)
                    } else te[T](N, 0)
                }

                function U(N) {
                    0 === ee && 0 === d.length && x(K), N && d.push(N)
                }

                function K() {
                    if (!w) {
                        for (w = !0; d.length;) {
                            const N = d;
                            d = [];
                            for (let _ = 0; _ < N.length; _++) {
                                const n = N[_];
                                try {
                                    n.zone.runTask(n, null, null)
                                } catch (o) {
                                    R.onUnhandledError(o)
                                }
                            }
                        }
                        R.microtaskDrainDone(), w = !1
                    }
                }

                const J = {name: "NO ZONE"}, X = "notScheduled", k = "scheduling", h = "scheduled", H = "running",
                    V = "canceling", Y = "unknown", G = "microTask", g = "macroTask", z = "eventTask", O = {}, R = {
                        symbol: Q,
                        currentZoneFrame: () => b,
                        onUnhandledError: W,
                        microtaskDrainDone: W,
                        scheduleMicroTask: U,
                        showUncaughtError: () => !t[Q("ignoreConsoleErrorUncaughtError")],
                        patchEventTarget: () => [],
                        patchOnProperties: W,
                        patchMethod: () => W,
                        bindArguments: () => [],
                        patchThen: () => W,
                        patchMacroTask: () => W,
                        patchEventPrototype: () => W,
                        isIEOrEdge: () => !1,
                        getGlobalObjects: () => {
                        },
                        ObjectDefineProperty: () => W,
                        ObjectGetOwnPropertyDescriptor: () => {
                        },
                        ObjectCreate: () => {
                        },
                        ArraySlice: () => [],
                        patchClass: () => W,
                        wrapWithCurrentZone: () => W,
                        filterProperties: () => [],
                        attachOriginToPatched: () => W,
                        _redefineProperty: () => W,
                        patchCallbacks: () => W,
                        nativeScheduleMicroTask: x
                    };
                let b = {parent: null, zone: new t(null, null)}, S = null, ee = 0;

                function W() {
                }

                return c("Zone", "Zone"), t
            }(), e.Zone
        }();
        (function Zt(e) {
            (function Nt(e) {
                e.__load_patch("ZoneAwarePromise", (r, c, t) => {
                    const i = Object.getOwnPropertyDescriptor, u = Object.defineProperty, T = t.symbol, y = [],
                        D = !1 !== r[T("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")], d = T("Promise"), w = T("then"),
                        Z = "__creationTrace__";
                    t.onUnhandledError = f => {
                        if (t.showUncaughtError()) {
                            const a = f && f.rejection;
                            a ? console.error("Unhandled Promise rejection:", a instanceof Error ? a.message : a, "; Zone:", f.zone.name, "; Task:", f.task && f.task.source, "; Value:", a, a instanceof Error ? a.stack : void 0) : console.error(f)
                        }
                    }, t.microtaskDrainDone = () => {
                        for (; y.length;) {
                            const f = y.shift();
                            try {
                                f.zone.runGuarded(() => {
                                    throw f.throwOriginal ? f.rejection : f
                                })
                            } catch (a) {
                                U(a)
                            }
                        }
                    };
                    const x = T("unhandledPromiseRejectionHandler");

                    function U(f) {
                        t.onUnhandledError(f);
                        try {
                            const a = c[x];
                            "function" == typeof a && a.call(this, f)
                        } catch {
                        }
                    }

                    function K(f) {
                        return f && f.then
                    }

                    function J(f) {
                        return f
                    }

                    function X(f) {
                        return A.reject(f)
                    }

                    const k = T("state"), h = T("value"), H = T("finally"), V = T("parentPromiseValue"),
                        Y = T("parentPromiseState"), G = "Promise.then", g = null, z = !0, O = !1, R = 0;

                    function b(f, a) {
                        return s => {
                            try {
                                N(f, a, s)
                            } catch (l) {
                                N(f, !1, l)
                            }
                        }
                    }

                    const S = function () {
                        let f = !1;
                        return function (s) {
                            return function () {
                                f || (f = !0, s.apply(null, arguments))
                            }
                        }
                    }, ee = "Promise resolved with itself", W = T("currentTaskTrace");

                    function N(f, a, s) {
                        const l = S();
                        if (f === s) throw new TypeError(ee);
                        if (f[k] === g) {
                            let v = null;
                            try {
                                ("object" == typeof s || "function" == typeof s) && (v = s && s.then)
                            } catch (C) {
                                return l(() => {
                                    N(f, !1, C)
                                })(), f
                            }
                            if (a !== O && s instanceof A && s.hasOwnProperty(k) && s.hasOwnProperty(h) && s[k] !== g) n(s), N(f, s[k], s[h]); else if (a !== O && "function" == typeof v) try {
                                v.call(s, l(b(f, a)), l(b(f, !1)))
                            } catch (C) {
                                l(() => {
                                    N(f, !1, C)
                                })()
                            } else {
                                f[k] = a;
                                const C = f[h];
                                if (f[h] = s, f[H] === H && a === z && (f[k] = f[Y], f[h] = f[V]), a === O && s instanceof Error) {
                                    const p = c.currentTask && c.currentTask.data && c.currentTask.data[Z];
                                    p && u(s, W, {configurable: !0, enumerable: !1, writable: !0, value: p})
                                }
                                for (let p = 0; p < C.length;) o(f, C[p++], C[p++], C[p++], C[p++]);
                                if (0 == C.length && a == O) {
                                    f[k] = R;
                                    let p = s;
                                    try {
                                        throw new Error("Uncaught (in promise): " + function E(f) {
                                            return f && f.toString === Object.prototype.toString ? (f.constructor && f.constructor.name || "") + ": " + JSON.stringify(f) : f ? f.toString() : Object.prototype.toString.call(f)
                                        }(s) + (s && s.stack ? "\n" + s.stack : ""))
                                    } catch (L) {
                                        p = L
                                    }
                                    D && (p.throwOriginal = !0), p.rejection = s, p.promise = f, p.zone = c.current, p.task = c.currentTask, y.push(p), t.scheduleMicroTask()
                                }
                            }
                        }
                        return f
                    }

                    const _ = T("rejectionHandledHandler");

                    function n(f) {
                        if (f[k] === R) {
                            try {
                                const a = c[_];
                                a && "function" == typeof a && a.call(this, {rejection: f[h], promise: f})
                            } catch {
                            }
                            f[k] = O;
                            for (let a = 0; a < y.length; a++) f === y[a].promise && y.splice(a, 1)
                        }
                    }

                    function o(f, a, s, l, v) {
                        n(f);
                        const C = f[k], p = C ? "function" == typeof l ? l : J : "function" == typeof v ? v : X;
                        a.scheduleMicroTask(G, () => {
                            try {
                                const L = f[h], I = !!s && H === s[H];
                                I && (s[V] = L, s[Y] = C);
                                const M = a.run(p, void 0, I && p !== X && p !== J ? [] : [L]);
                                N(s, !0, M)
                            } catch (L) {
                                N(s, !1, L)
                            }
                        }, s)
                    }

                    const P = function () {
                    }, q = r.AggregateError;

                    class A {
                        constructor(a) {
                            const s = this;
                            if (!(s instanceof A)) throw new Error("Must be an instanceof Promise.");
                            s[k] = g, s[h] = [];
                            try {
                                const l = S();
                                a && a(l(b(s, z)), l(b(s, O)))
                            } catch (l) {
                                N(s, !1, l)
                            }
                        }

                        get [Symbol.toStringTag]() {
                            return "Promise"
                        }

                        get [Symbol.species]() {
                            return A
                        }

                        static toString() {
                            return "function ZoneAwarePromise() { [native code] }"
                        }

                        static resolve(a) {
                            return a instanceof A ? a : N(new this(null), z, a)
                        }

                        static reject(a) {
                            return N(new this(null), O, a)
                        }

                        static withResolvers() {
                            const a = {};
                            return a.promise = new A((s, l) => {
                                a.resolve = s, a.reject = l
                            }), a
                        }

                        static any(a) {
                            if (!a || "function" != typeof a[Symbol.iterator]) return Promise.reject(new q([], "All promises were rejected"));
                            const s = [];
                            let l = 0;
                            try {
                                for (let p of a) l++, s.push(A.resolve(p))
                            } catch {
                                return Promise.reject(new q([], "All promises were rejected"))
                            }
                            if (0 === l) return Promise.reject(new q([], "All promises were rejected"));
                            let v = !1;
                            const C = [];
                            return new A((p, L) => {
                                for (let I = 0; I < s.length; I++) s[I].then(M => {
                                    v || (v = !0, p(M))
                                }, M => {
                                    C.push(M), l--, 0 === l && (v = !0, L(new q(C, "All promises were rejected")))
                                })
                            })
                        }

                        static race(a) {
                            let s, l, v = new this((L, I) => {
                                s = L, l = I
                            });

                            function C(L) {
                                s(L)
                            }

                            function p(L) {
                                l(L)
                            }

                            for (let L of a) K(L) || (L = this.resolve(L)), L.then(C, p);
                            return v
                        }

                        static all(a) {
                            return A.allWithCallback(a)
                        }

                        static allSettled(a) {
                            return (this && this.prototype instanceof A ? this : A).allWithCallback(a, {
                                thenCallback: l => ({
                                    status: "fulfilled",
                                    value: l
                                }), errorCallback: l => ({status: "rejected", reason: l})
                            })
                        }

                        static allWithCallback(a, s) {
                            let l, v, C = new this((M, B) => {
                                l = M, v = B
                            }), p = 2, L = 0;
                            const I = [];
                            for (let M of a) {
                                K(M) || (M = this.resolve(M));
                                const B = L;
                                try {
                                    M.then(F => {
                                        I[B] = s ? s.thenCallback(F) : F, p--, 0 === p && l(I)
                                    }, F => {
                                        s ? (I[B] = s.errorCallback(F), p--, 0 === p && l(I)) : v(F)
                                    })
                                } catch (F) {
                                    v(F)
                                }
                                p++, L++
                            }
                            return p -= 2, 0 === p && l(I), C
                        }

                        then(a, s) {
                            let l = this.constructor?.[Symbol.species];
                            (!l || "function" != typeof l) && (l = this.constructor || A);
                            const v = new l(P), C = c.current;
                            return this[k] == g ? this[h].push(C, v, a, s) : o(this, C, v, a, s), v
                        }

                        catch(a) {
                            return this.then(null, a)
                        }

                        finally(a) {
                            let s = this.constructor?.[Symbol.species];
                            (!s || "function" != typeof s) && (s = A);
                            const l = new s(P);
                            l[H] = H;
                            const v = c.current;
                            return this[k] == g ? this[h].push(v, l, a, a) : o(this, v, l, a, a), l
                        }
                    }

                    A.resolve = A.resolve, A.reject = A.reject, A.race = A.race, A.all = A.all;
                    const _e = r[d] = r.Promise;
                    r.Promise = A;
                    const he = T("thenPatched");

                    function de(f) {
                        const a = f.prototype, s = i(a, "then");
                        if (s && (!1 === s.writable || !s.configurable)) return;
                        const l = a.then;
                        a[w] = l, f.prototype.then = function (v, C) {
                            return new A((L, I) => {
                                l.call(this, L, I)
                            }).then(v, C)
                        }, f[he] = !0
                    }

                    return t.patchThen = de, _e && (de(_e), ue(r, "fetch", f => function oe(f) {
                        return function (a, s) {
                            let l = f.apply(a, s);
                            if (l instanceof A) return l;
                            let v = l.constructor;
                            return v[he] || de(v), l
                        }
                    }(f))), Promise[c.__symbol__("uncaughtPromiseErrors")] = y, A
                })
            })(e), function Lt(e) {
                e.__load_patch("toString", r => {
                    const c = Function.prototype.toString, t = j("OriginalDelegate"), i = j("Promise"), u = j("Error"),
                        E = function () {
                            if ("function" == typeof this) {
                                const d = this[t];
                                if (d) return "function" == typeof d ? c.call(d) : Object.prototype.toString.call(d);
                                if (this === Promise) {
                                    const w = r[i];
                                    if (w) return c.call(w)
                                }
                                if (this === Error) {
                                    const w = r[u];
                                    if (w) return c.call(w)
                                }
                            }
                            return c.call(this)
                        };
                    E[t] = c, Function.prototype.toString = E;
                    const T = Object.prototype.toString;
                    Object.prototype.toString = function () {
                        return "function" == typeof Promise && this instanceof Promise ? "[object Promise]" : T.call(this)
                    }
                })
            }(e), function Mt(e) {
                e.__load_patch("util", (r, c, t) => {
                    const i = Fe(r);
                    t.patchOnProperties = Ke, t.patchMethod = ue, t.bindArguments = Ve, t.patchMacroTask = yt;
                    const u = c.__symbol__("BLACK_LISTED_EVENTS"), E = c.__symbol__("UNPATCHED_EVENTS");
                    r[E] && (r[u] = r[E]), r[u] && (c[u] = c[E] = r[u]), t.patchEventPrototype = Pt, t.patchEventTarget = bt, t.isIEOrEdge = kt, t.ObjectDefineProperty = Le, t.ObjectGetOwnPropertyDescriptor = Te, t.ObjectCreate = _t, t.ArraySlice = Et, t.patchClass = we, t.wrapWithCurrentZone = He, t.filterProperties = it, t.attachOriginToPatched = fe, t._redefineProperty = Object.defineProperty, t.patchCallbacks = It, t.getGlobalObjects = () => ({
                        globalSources: tt,
                        zoneSymbolEventNames: ne,
                        eventNames: i,
                        isBrowser: Ge,
                        isMix: Xe,
                        isNode: De,
                        TRUE_STR: ae,
                        FALSE_STR: le,
                        ZONE_SYMBOL_PREFIX: Pe,
                        ADD_EVENT_LISTENER_STR: Me,
                        REMOVE_EVENT_LISTENER_STR: Ze
                    })
                })
            }(e)
        })(at), function Ot(e) {
            e.__load_patch("legacy", r => {
                const c = r[e.__symbol__("legacyPatch")];
                c && c()
            }), e.__load_patch("timers", r => {
                const c = "set", t = "clear";
                ye(r, c, t, "Timeout"), ye(r, c, t, "Interval"), ye(r, c, t, "Immediate")
            }), e.__load_patch("requestAnimationFrame", r => {
                ye(r, "request", "cancel", "AnimationFrame"), ye(r, "mozRequest", "mozCancel", "AnimationFrame"), ye(r, "webkitRequest", "webkitCancel", "AnimationFrame")
            }), e.__load_patch("blocking", (r, c) => {
                const t = ["alert", "prompt", "confirm"];
                for (let i = 0; i < t.length; i++) ue(r, t[i], (E, T, y) => function (D, d) {
                    return c.current.run(E, r, d, y)
                })
            }), e.__load_patch("EventTarget", (r, c, t) => {
                (function Dt(e, r) {
                    r.patchEventPrototype(e, r)
                })(r, t), function Ct(e, r) {
                    if (Zone[r.symbol("patchEventTarget")]) return;
                    const {
                        eventNames: c,
                        zoneSymbolEventNames: t,
                        TRUE_STR: i,
                        FALSE_STR: u,
                        ZONE_SYMBOL_PREFIX: E
                    } = r.getGlobalObjects();
                    for (let y = 0; y < c.length; y++) {
                        const D = c[y], Z = E + (D + u), x = E + (D + i);
                        t[D] = {}, t[D][u] = Z, t[D][i] = x
                    }
                    const T = e.EventTarget;
                    T && T.prototype && r.patchEventTarget(e, r, [T && T.prototype])
                }(r, t);
                const i = r.XMLHttpRequestEventTarget;
                i && i.prototype && t.patchEventTarget(r, t, [i.prototype])
            }), e.__load_patch("MutationObserver", (r, c, t) => {
                we("MutationObserver"), we("WebKitMutationObserver")
            }), e.__load_patch("IntersectionObserver", (r, c, t) => {
                we("IntersectionObserver")
            }), e.__load_patch("FileReader", (r, c, t) => {
                we("FileReader")
            }), e.__load_patch("on_property", (r, c, t) => {
                !function St(e, r) {
                    if (De && !Xe || Zone[e.symbol("patchEvents")]) return;
                    const c = r.__Zone_ignore_on_properties;
                    let t = [];
                    if (Ge) {
                        const i = window;
                        t = t.concat(["Document", "SVGElement", "Element", "HTMLElement", "HTMLBodyElement", "HTMLMediaElement", "HTMLFrameSetElement", "HTMLFrameElement", "HTMLIFrameElement", "HTMLMarqueeElement", "Worker"]);
                        const u = function mt() {
                            try {
                                const e = ge.navigator.userAgent;
                                if (-1 !== e.indexOf("MSIE ") || -1 !== e.indexOf("Trident/")) return !0
                            } catch {
                            }
                            return !1
                        }() ? [{target: i, ignoreProperties: ["error"]}] : [];
                        ct(i, Fe(i), c && c.concat(u), Ie(i))
                    }
                    t = t.concat(["XMLHttpRequest", "XMLHttpRequestEventTarget", "IDBIndex", "IDBRequest", "IDBOpenDBRequest", "IDBDatabase", "IDBTransaction", "IDBCursor", "WebSocket"]);
                    for (let i = 0; i < t.length; i++) {
                        const u = r[t[i]];
                        u && u.prototype && ct(u.prototype, Fe(u.prototype), c)
                    }
                }(t, r)
            }), e.__load_patch("customElements", (r, c, t) => {
                !function Rt(e, r) {
                    const {isBrowser: c, isMix: t} = r.getGlobalObjects();
                    (c || t) && e.customElements && "customElements" in e && r.patchCallbacks(r, e.customElements, "customElements", "define", ["connectedCallback", "disconnectedCallback", "adoptedCallback", "attributeChangedCallback", "formAssociatedCallback", "formDisabledCallback", "formResetCallback", "formStateRestoreCallback"])
                }(r, t)
            }), e.__load_patch("XHR", (r, c) => {
                !function D(d) {
                    const w = d.XMLHttpRequest;
                    if (!w) return;
                    const Z = w.prototype;
                    let U = Z[Ae], K = Z[je];
                    if (!U) {
                        const R = d.XMLHttpRequestEventTarget;
                        if (R) {
                            const b = R.prototype;
                            U = b[Ae], K = b[je]
                        }
                    }
                    const J = "readystatechange", X = "scheduled";

                    function k(R) {
                        const b = R.data, S = b.target;
                        S[E] = !1, S[y] = !1;
                        const ee = S[u];
                        U || (U = S[Ae], K = S[je]), ee && K.call(S, J, ee);
                        const W = S[u] = () => {
                            if (S.readyState === S.DONE) if (!b.aborted && S[E] && R.state === X) {
                                const _ = S[c.__symbol__("loadfalse")];
                                if (0 !== S.status && _ && _.length > 0) {
                                    const n = R.invoke;
                                    R.invoke = function () {
                                        const o = S[c.__symbol__("loadfalse")];
                                        for (let m = 0; m < o.length; m++) o[m] === R && o.splice(m, 1);
                                        !b.aborted && R.state === X && n.call(R)
                                    }, _.push(R)
                                } else R.invoke()
                            } else !b.aborted && !1 === S[E] && (S[y] = !0)
                        };
                        return U.call(S, J, W), S[t] || (S[t] = R), z.apply(S, b.args), S[E] = !0, R
                    }

                    function h() {
                    }

                    function H(R) {
                        const b = R.data;
                        return b.aborted = !0, O.apply(b.target, b.args)
                    }

                    const V = ue(Z, "open", () => function (R, b) {
                            return R[i] = 0 == b[2], R[T] = b[1], V.apply(R, b)
                        }), G = j("fetchTaskAborting"), g = j("fetchTaskScheduling"),
                        z = ue(Z, "send", () => function (R, b) {
                            if (!0 === c.current[g] || R[i]) return z.apply(R, b);
                            {
                                const S = {target: R, url: R[T], isPeriodic: !1, args: b, aborted: !1},
                                    ee = xe("XMLHttpRequest.send", h, S, k, H);
                                R && !0 === R[y] && !S.aborted && ee.state === X && ee.invoke()
                            }
                        }), O = ue(Z, "abort", () => function (R, b) {
                            const S = function x(R) {
                                return R[t]
                            }(R);
                            if (S && "string" == typeof S.type) {
                                if (null == S.cancelFn || S.data && S.data.aborted) return;
                                S.zone.cancelTask(S)
                            } else if (!0 === c.current[G]) return O.apply(R, b)
                        })
                }(r);
                const t = j("xhrTask"), i = j("xhrSync"), u = j("xhrListener"), E = j("xhrScheduled"), T = j("xhrURL"),
                    y = j("xhrErrorBeforeScheduled")
            }), e.__load_patch("geolocation", r => {
                r.navigator && r.navigator.geolocation && function gt(e, r) {
                    const c = e.constructor.name;
                    for (let t = 0; t < r.length; t++) {
                        const i = r[t], u = e[i];
                        if (u) {
                            if (!We(Te(e, i))) continue;
                            e[i] = (T => {
                                const y = function () {
                                    return T.apply(this, Ve(arguments, c + "." + i))
                                };
                                return fe(y, T), y
                            })(u)
                        }
                    }
                }(r.navigator.geolocation, ["getCurrentPosition", "watchPosition"])
            }), e.__load_patch("PromiseRejectionEvent", (r, c) => {
                function t(i) {
                    return function (u) {
                        st(r, i).forEach(T => {
                            const y = r.PromiseRejectionEvent;
                            if (y) {
                                const D = new y(i, {promise: u.promise, reason: u.rejection});
                                T.invoke(D)
                            }
                        })
                    }
                }

                r.PromiseRejectionEvent && (c[j("unhandledPromiseRejectionHandler")] = t("unhandledrejection"), c[j("rejectionHandledHandler")] = t("rejectionhandled"))
            }), e.__load_patch("queueMicrotask", (r, c, t) => {
                !function wt(e, r) {
                    r.patchMethod(e, "queueMicrotask", c => function (t, i) {
                        Zone.current.scheduleMicroTask("queueMicrotask", i[0])
                    })
                }(r, t)
            })
        }(at)
    }
}, te => {
    te(te.s = 50)
}]);

"use strict";
(self.webpackChunkcoverage_app = self.webpackChunkcoverage_app || []).push([[792], {
    736: () => {
        function so(e, n) {
            return Object.is(e, n)
        }

        let Ae = null, Wi = !1, Zi = 1;
        const qt = Symbol("SIGNAL");

        function X(e) {
            const n = Ae;
            return Ae = e, n
        }

        const Vs = {
            version: 0,
            lastCleanEpoch: 0,
            dirty: !1,
            producerNode: void 0,
            producerLastReadVersion: void 0,
            producerIndexOfThis: void 0,
            nextProducerIndex: 0,
            liveConsumerNode: void 0,
            liveConsumerIndexOfThis: void 0,
            consumerAllowSignalWrites: !1,
            consumerIsAlwaysLive: !1,
            producerMustRecompute: () => !1,
            producerRecomputeValue: () => {
            },
            consumerMarkedDirty: () => {
            },
            consumerOnSignalRead: () => {
            }
        };

        function Mc(e) {
            if (Wi) throw new Error("");
            if (null === Ae) return;
            Ae.consumerOnSignalRead(e);
            const n = Ae.nextProducerIndex++;
            js(Ae), n < Ae.producerNode.length && Ae.producerNode[n] !== e && ao(Ae) && Bs(Ae.producerNode[n], Ae.producerIndexOfThis[n]), Ae.producerNode[n] !== e && (Ae.producerNode[n] = e, Ae.producerIndexOfThis[n] = ao(Ae) ? xp(e, Ae, n) : 0), Ae.producerLastReadVersion[n] = e.version
        }

        function Sp(e) {
            if ((!ao(e) || e.dirty) && (e.dirty || e.lastCleanEpoch !== Zi)) {
                if (!e.producerMustRecompute(e) && !Sc(e)) return e.dirty = !1, void (e.lastCleanEpoch = Zi);
                e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = Zi
            }
        }

        function Op(e) {
            if (void 0 === e.liveConsumerNode) return;
            const n = Wi;
            Wi = !0;
            try {
                for (const t of e.liveConsumerNode) t.dirty || Ap(t)
            } finally {
                Wi = n
            }
        }

        function Np() {
            return !1 !== Ae?.consumerAllowSignalWrites
        }

        function Ap(e) {
            e.dirty = !0, Op(e), e.consumerMarkedDirty?.(e)
        }

        function Hs(e) {
            return e && (e.nextProducerIndex = 0), X(e)
        }

        function Tc(e, n) {
            if (X(n), e && void 0 !== e.producerNode && void 0 !== e.producerIndexOfThis && void 0 !== e.producerLastReadVersion) {
                if (ao(e)) for (let t = e.nextProducerIndex; t < e.producerNode.length; t++) Bs(e.producerNode[t], e.producerIndexOfThis[t]);
                for (; e.producerNode.length > e.nextProducerIndex;) e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop()
            }
        }

        function Sc(e) {
            js(e);
            for (let n = 0; n < e.producerNode.length; n++) {
                const t = e.producerNode[n], i = e.producerLastReadVersion[n];
                if (i !== t.version || (Sp(t), i !== t.version)) return !0
            }
            return !1
        }

        function Oc(e) {
            if (js(e), ao(e)) for (let n = 0; n < e.producerNode.length; n++) Bs(e.producerNode[n], e.producerIndexOfThis[n]);
            e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0, e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0)
        }

        function xp(e, n, t) {
            if (Rp(e), 0 === e.liveConsumerNode.length && Lp(e)) for (let i = 0; i < e.producerNode.length; i++) e.producerIndexOfThis[i] = xp(e.producerNode[i], e, i);
            return e.liveConsumerIndexOfThis.push(t), e.liveConsumerNode.push(n) - 1
        }

        function Bs(e, n) {
            if (Rp(e), 1 === e.liveConsumerNode.length && Lp(e)) for (let i = 0; i < e.producerNode.length; i++) Bs(e.producerNode[i], e.producerIndexOfThis[i]);
            const t = e.liveConsumerNode.length - 1;
            if (e.liveConsumerNode[n] = e.liveConsumerNode[t], e.liveConsumerIndexOfThis[n] = e.liveConsumerIndexOfThis[t], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, n < e.liveConsumerNode.length) {
                const i = e.liveConsumerIndexOfThis[n], r = e.liveConsumerNode[n];
                js(r), r.producerIndexOfThis[i] = n
            }
        }

        function ao(e) {
            return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0
        }

        function js(e) {
            e.producerNode ??= [], e.producerIndexOfThis ??= [], e.producerLastReadVersion ??= []
        }

        function Rp(e) {
            e.liveConsumerNode ??= [], e.liveConsumerIndexOfThis ??= []
        }

        function Lp(e) {
            return void 0 !== e.producerNode
        }

        const Nc = Symbol("UNSET"), Ac = Symbol("COMPUTING"), Us = Symbol("ERRORED"), WI = {
            ...Vs,
            value: Nc,
            dirty: !0,
            error: null,
            equal: so,
            producerMustRecompute: e => e.value === Nc || e.value === Ac,
            producerRecomputeValue(e) {
                if (e.value === Ac) throw new Error("Detected cycle in computations.");
                const n = e.value;
                e.value = Ac;
                const t = Hs(e);
                let i;
                try {
                    i = e.computation()
                } catch (r) {
                    i = Us, e.error = r
                } finally {
                    Tc(e, t)
                }
                n !== Nc && n !== Us && i !== Us && e.equal(n, i) ? e.value = n : (e.value = i, e.version++)
            }
        };
        let Pp = function ZI() {
            throw new Error
        };

        function kp() {
            Pp()
        }

        let $s = null;

        function Fp(e, n) {
            Np() || kp(), e.equal(e.value, n) || (e.value = n, function JI(e) {
                e.version++, function GI() {
                    Zi++
                }(), Op(e), $s?.()
            }(e))
        }

        const XI = {...Vs, equal: so, value: void 0};

        function Fe(e) {
            return "function" == typeof e
        }

        function Hp(e) {
            const t = e(i => {
                Error.call(i), i.stack = (new Error).stack
            });
            return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t
        }

        const xc = Hp(e => function (t) {
            e(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((i, r) => `${r + 1}) ${i.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t
        });

        function zs(e, n) {
            if (e) {
                const t = e.indexOf(n);
                0 <= t && e.splice(t, 1)
            }
        }

        class Tt {
            constructor(n) {
                this.initialTeardown = n, this.closed = !1, this._parentage = null, this._finalizers = null
            }

            unsubscribe() {
                let n;
                if (!this.closed) {
                    this.closed = !0;
                    const {_parentage: t} = this;
                    if (t) if (this._parentage = null, Array.isArray(t)) for (const o of t) o.remove(this); else t.remove(this);
                    const {initialTeardown: i} = this;
                    if (Fe(i)) try {
                        i()
                    } catch (o) {
                        n = o instanceof xc ? o.errors : [o]
                    }
                    const {_finalizers: r} = this;
                    if (r) {
                        this._finalizers = null;
                        for (const o of r) try {
                            Up(o)
                        } catch (s) {
                            n = n ?? [], s instanceof xc ? n = [...n, ...s.errors] : n.push(s)
                        }
                    }
                    if (n) throw new xc(n)
                }
            }

            add(n) {
                var t;
                if (n && n !== this) if (this.closed) Up(n); else {
                    if (n instanceof Tt) {
                        if (n.closed || n._hasParent(this)) return;
                        n._addParent(this)
                    }
                    (this._finalizers = null !== (t = this._finalizers) && void 0 !== t ? t : []).push(n)
                }
            }

            _hasParent(n) {
                const {_parentage: t} = this;
                return t === n || Array.isArray(t) && t.includes(n)
            }

            _addParent(n) {
                const {_parentage: t} = this;
                this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n
            }

            _removeParent(n) {
                const {_parentage: t} = this;
                t === n ? this._parentage = null : Array.isArray(t) && zs(t, n)
            }

            remove(n) {
                const {_finalizers: t} = this;
                t && zs(t, n), n instanceof Tt && n._removeParent(this)
            }
        }

        Tt.EMPTY = (() => {
            const e = new Tt;
            return e.closed = !0, e
        })();
        const Bp = Tt.EMPTY;

        function jp(e) {
            return e instanceof Tt || e && "closed" in e && Fe(e.remove) && Fe(e.add) && Fe(e.unsubscribe)
        }

        function Up(e) {
            Fe(e) ? e() : e.unsubscribe()
        }

        const fi = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }, Gs = {
            setTimeout(e, n, ...t) {
                const {delegate: i} = Gs;
                return i?.setTimeout ? i.setTimeout(e, n, ...t) : setTimeout(e, n, ...t)
            }, clearTimeout(e) {
                const {delegate: n} = Gs;
                return (n?.clearTimeout || clearTimeout)(e)
            }, delegate: void 0
        };

        function $p(e) {
            Gs.setTimeout(() => {
                const {onUnhandledError: n} = fi;
                if (!n) throw e;
                n(e)
            })
        }

        function zp() {
        }

        const tM = Rc("C", void 0, void 0);

        function Rc(e, n, t) {
            return {kind: e, value: n, error: t}
        }

        let hi = null;

        function qs(e) {
            if (fi.useDeprecatedSynchronousErrorHandling) {
                const n = !hi;
                if (n && (hi = {errorThrown: !1, error: null}), e(), n) {
                    const {errorThrown: t, error: i} = hi;
                    if (hi = null, t) throw i
                }
            } else e()
        }

        class Lc extends Tt {
            constructor(n) {
                super(), this.isStopped = !1, n ? (this.destination = n, jp(n) && n.add(this)) : this.destination = lM
            }

            static create(n, t, i) {
                return new kc(n, t, i)
            }

            next(n) {
                this.isStopped ? Fc(function iM(e) {
                    return Rc("N", e, void 0)
                }(n), this) : this._next(n)
            }

            error(n) {
                this.isStopped ? Fc(function nM(e) {
                    return Rc("E", void 0, e)
                }(n), this) : (this.isStopped = !0, this._error(n))
            }

            complete() {
                this.isStopped ? Fc(tM, this) : (this.isStopped = !0, this._complete())
            }

            unsubscribe() {
                this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
            }

            _next(n) {
                this.destination.next(n)
            }

            _error(n) {
                try {
                    this.destination.error(n)
                } finally {
                    this.unsubscribe()
                }
            }

            _complete() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
        }

        const oM = Function.prototype.bind;

        function Pc(e, n) {
            return oM.call(e, n)
        }

        class sM {
            constructor(n) {
                this.partialObserver = n
            }

            next(n) {
                const {partialObserver: t} = this;
                if (t.next) try {
                    t.next(n)
                } catch (i) {
                    Ws(i)
                }
            }

            error(n) {
                const {partialObserver: t} = this;
                if (t.error) try {
                    t.error(n)
                } catch (i) {
                    Ws(i)
                } else Ws(n)
            }

            complete() {
                const {partialObserver: n} = this;
                if (n.complete) try {
                    n.complete()
                } catch (t) {
                    Ws(t)
                }
            }
        }

        class kc extends Lc {
            constructor(n, t, i) {
                let r;
                if (super(), Fe(n) || !n) r = {next: n ?? void 0, error: t ?? void 0, complete: i ?? void 0}; else {
                    let o;
                    this && fi.useDeprecatedNextContext ? (o = Object.create(n), o.unsubscribe = () => this.unsubscribe(), r = {
                        next: n.next && Pc(n.next, o),
                        error: n.error && Pc(n.error, o),
                        complete: n.complete && Pc(n.complete, o)
                    }) : r = n
                }
                this.destination = new sM(r)
            }
        }

        function Ws(e) {
            fi.useDeprecatedSynchronousErrorHandling ? function rM(e) {
                fi.useDeprecatedSynchronousErrorHandling && hi && (hi.errorThrown = !0, hi.error = e)
            }(e) : $p(e)
        }

        function Fc(e, n) {
            const {onStoppedNotification: t} = fi;
            t && Gs.setTimeout(() => t(e, n))
        }

        const lM = {
            closed: !0, next: zp, error: function aM(e) {
                throw e
            }, complete: zp
        }, Vc = "function" == typeof Symbol && Symbol.observable || "@@observable";

        function Hc(e) {
            return e
        }

        let St = (() => {
            class e {
                constructor(t) {
                    t && (this._subscribe = t)
                }

                lift(t) {
                    const i = new e;
                    return i.source = this, i.operator = t, i
                }

                subscribe(t, i, r) {
                    const o = function uM(e) {
                        return e && e instanceof Lc || function cM(e) {
                            return e && Fe(e.next) && Fe(e.error) && Fe(e.complete)
                        }(e) && jp(e)
                    }(t) ? t : new kc(t, i, r);
                    return qs(() => {
                        const {operator: s, source: a} = this;
                        o.add(s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o))
                    }), o
                }

                _trySubscribe(t) {
                    try {
                        return this._subscribe(t)
                    } catch (i) {
                        t.error(i)
                    }
                }

                forEach(t, i) {
                    return new (i = qp(i))((r, o) => {
                        const s = new kc({
                            next: a => {
                                try {
                                    t(a)
                                } catch (l) {
                                    o(l), s.unsubscribe()
                                }
                            }, error: o, complete: r
                        });
                        this.subscribe(s)
                    })
                }

                _subscribe(t) {
                    var i;
                    return null === (i = this.source) || void 0 === i ? void 0 : i.subscribe(t)
                }

                [Vc]() {
                    return this
                }

                pipe(...t) {
                    return function Gp(e) {
                        return 0 === e.length ? Hc : 1 === e.length ? e[0] : function (t) {
                            return e.reduce((i, r) => r(i), t)
                        }
                    }(t)(this)
                }

                toPromise(t) {
                    return new (t = qp(t))((i, r) => {
                        let o;
                        this.subscribe(s => o = s, s => r(s), () => i(o))
                    })
                }
            }

            return e.create = n => new e(n), e
        })();

        function qp(e) {
            var n;
            return null !== (n = e ?? fi.Promise) && void 0 !== n ? n : Promise
        }

        const dM = Hp(e => function () {
            e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
        });
        let ln = (() => {
            class e extends St {
                constructor() {
                    super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
                }

                get observed() {
                    var t;
                    return (null === (t = this.observers) || void 0 === t ? void 0 : t.length) > 0
                }

                lift(t) {
                    const i = new Wp(this, this);
                    return i.operator = t, i
                }

                _throwIfClosed() {
                    if (this.closed) throw new dM
                }

                next(t) {
                    qs(() => {
                        if (this._throwIfClosed(), !this.isStopped) {
                            this.currentObservers || (this.currentObservers = Array.from(this.observers));
                            for (const i of this.currentObservers) i.next(t)
                        }
                    })
                }

                error(t) {
                    qs(() => {
                        if (this._throwIfClosed(), !this.isStopped) {
                            this.hasError = this.isStopped = !0, this.thrownError = t;
                            const {observers: i} = this;
                            for (; i.length;) i.shift().error(t)
                        }
                    })
                }

                complete() {
                    qs(() => {
                        if (this._throwIfClosed(), !this.isStopped) {
                            this.isStopped = !0;
                            const {observers: t} = this;
                            for (; t.length;) t.shift().complete()
                        }
                    })
                }

                unsubscribe() {
                    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
                }

                _trySubscribe(t) {
                    return this._throwIfClosed(), super._trySubscribe(t)
                }

                _subscribe(t) {
                    return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t)
                }

                _innerSubscribe(t) {
                    const {hasError: i, isStopped: r, observers: o} = this;
                    return i || r ? Bp : (this.currentObservers = null, o.push(t), new Tt(() => {
                        this.currentObservers = null, zs(o, t)
                    }))
                }

                _checkFinalizedStatuses(t) {
                    const {hasError: i, thrownError: r, isStopped: o} = this;
                    i ? t.error(r) : o && t.complete()
                }

                asObservable() {
                    const t = new St;
                    return t.source = this, t
                }
            }

            return e.create = (n, t) => new Wp(n, t), e
        })();

        class Wp extends ln {
            constructor(n, t) {
                super(), this.destination = n, this.source = t
            }

            next(n) {
                var t, i;
                null === (i = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === i || i.call(t, n)
            }

            error(n) {
                var t, i;
                null === (i = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === i || i.call(t, n)
            }

            complete() {
                var n, t;
                null === (t = null === (n = this.destination) || void 0 === n ? void 0 : n.complete) || void 0 === t || t.call(n)
            }

            _subscribe(n) {
                var t, i;
                return null !== (i = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(n)) && void 0 !== i ? i : Bp
            }
        }

        class fM extends ln {
            constructor(n) {
                super(), this._value = n
            }

            get value() {
                return this.getValue()
            }

            _subscribe(n) {
                const t = super._subscribe(n);
                return !t.closed && n.next(this._value), t
            }

            getValue() {
                const {hasError: n, thrownError: t, _value: i} = this;
                if (n) throw t;
                return this._throwIfClosed(), i
            }

            next(n) {
                super.next(this._value = n)
            }
        }

        function pi(e) {
            return n => {
                if (function hM(e) {
                    return Fe(e?.lift)
                }(n)) return n.lift(function (t) {
                    try {
                        return e(t, this)
                    } catch (i) {
                        this.error(i)
                    }
                });
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }

        function Un(e, n, t, i, r) {
            return new pM(e, n, t, i, r)
        }

        class pM extends Lc {
            constructor(n, t, i, r, o, s) {
                super(n), this.onFinalize = o, this.shouldUnsubscribe = s, this._next = t ? function (a) {
                    try {
                        t(a)
                    } catch (l) {
                        n.error(l)
                    }
                } : super._next, this._error = r ? function (a) {
                    try {
                        r(a)
                    } catch (l) {
                        n.error(l)
                    } finally {
                        this.unsubscribe()
                    }
                } : super._error, this._complete = i ? function () {
                    try {
                        i()
                    } catch (a) {
                        n.error(a)
                    } finally {
                        this.unsubscribe()
                    }
                } : super._complete
            }

            unsubscribe() {
                var n;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    const {closed: t} = this;
                    super.unsubscribe(), !t && (null === (n = this.onFinalize) || void 0 === n || n.call(this))
                }
            }
        }

        function Bc(e, n) {
            return pi((t, i) => {
                let r = 0;
                t.subscribe(Un(i, o => {
                    i.next(e.call(n, o, r++))
                }))
            })
        }

        typeof navigator < "u" && navigator, typeof navigator < "u" && !/Opera/.test(navigator.userAgent) && navigator, typeof navigator < "u" && (/MSIE/.test(navigator.userAgent) || navigator), typeof navigator < "u" && !/Opera|WebKit/.test(navigator.userAgent) && navigator, typeof navigator < "u" && navigator;
        const hg = "https://g.co/ng/security#xss";

        class S extends Error {
            constructor(n, t) {
                super(function Yi(e, n) {
                    return `NG0${Math.abs(e)}${n ? ": " + n : ""}`
                }(n, t)), this.code = n
            }
        }

        function Mn(e) {
            return {toString: e}.toString()
        }

        const Ki = "__parameters__";

        function Ji(e, n, t) {
            return Mn(() => {
                const i = function Zc(e) {
                    return function (...t) {
                        if (e) {
                            const i = e(...t);
                            for (const r in i) this[r] = i[r]
                        }
                    }
                }(n);

                function r(...o) {
                    if (this instanceof r) return i.apply(this, o), this;
                    const s = new r(...o);
                    return a.annotation = s, a;

                    function a(l, c, u) {
                        const d = l.hasOwnProperty(Ki) ? l[Ki] : Object.defineProperty(l, Ki, {value: []})[Ki];
                        for (; d.length <= u;) d.push(null);
                        return (d[u] = d[u] || []).push(s), l
                    }
                }

                return t && (r.prototype = Object.create(t.prototype)), r.prototype.ngMetadataName = e, r.annotationCls = r, r
            })
        }

        const be = globalThis;

        function he(e) {
            for (let n in e) if (e[n] === he) return n;
            throw Error("Could not find renamed property on target object.")
        }

        function pT(e, n) {
            for (const t in n) n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t])
        }

        function $e(e) {
            if ("string" == typeof e) return e;
            if (Array.isArray(e)) return "[" + e.map($e).join(", ") + "]";
            if (null == e) return "" + e;
            if (e.overriddenName) return `${e.overriddenName}`;
            if (e.name) return `${e.name}`;
            const n = e.toString();
            if (null == n) return "" + n;
            const t = n.indexOf("\n");
            return -1 === t ? n : n.substring(0, t)
        }

        function Yc(e, n) {
            return null == e || "" === e ? null === n ? "" : n : null == n || "" === n ? e : e + " " + n
        }

        const gT = he({__forward_ref__: he});

        function me(e) {
            return e.__forward_ref__ = me, e.toString = function () {
                return $e(this())
            }, e
        }

        function j(e) {
            return Xs(e) ? e() : e
        }

        function Xs(e) {
            return "function" == typeof e && e.hasOwnProperty(gT) && e.__forward_ref__ === me
        }

        function te(e) {
            return {token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0}
        }

        function Tn(e) {
            return {providers: e.providers || [], imports: e.imports || []}
        }

        function Js(e) {
            return vg(e, ta) || vg(e, _g)
        }

        function vg(e, n) {
            return e.hasOwnProperty(n) ? e[n] : null
        }

        function ea(e) {
            return e && (e.hasOwnProperty(Qc) || e.hasOwnProperty(CT)) ? e[Qc] : null
        }

        const ta = he({\u0275prov: he}), Qc = he({\u0275inj: he}), _g = he({ngInjectableDef: he}),
            CT = he({ngInjectorDef: he});

        class R {
            constructor(n, t) {
                this._desc = n, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof t ? this.__NG_ELEMENT_ID__ = t : void 0 !== t && (this.\u0275prov = te({
                    token: this,
                    providedIn: t.providedIn || "root",
                    factory: t.factory
                }))
            }

            get multi() {
                return this
            }

            toString() {
                return `InjectionToken ${this._desc}`
            }
        }

        function tu(e) {
            return e && !!e.\u0275providers
        }

        const co = he({\u0275cmp: he}), nu = he({\u0275dir: he}), iu = he({\u0275pipe: he}), Cg = he({\u0275mod: he}),
            Sn = he({\u0275fac: he}), uo = he({__NG_ELEMENT_ID__: he}), wg = he({__NG_ENV_ID__: he});

        function Z(e) {
            return "string" == typeof e ? e : null == e ? "" : String(e)
        }

        function ru(e, n) {
            throw new S(-201, !1)
        }

        var re = function (e) {
            return e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional", e
        }(re || {});
        let ou;

        function Eg() {
            return ou
        }

        function _t(e) {
            const n = ou;
            return ou = e, n
        }

        function Dg(e, n, t) {
            const i = Js(e);
            return i && "root" == i.providedIn ? void 0 === i.value ? i.value = i.factory() : i.value : t & re.Optional ? null : void 0 !== n ? n : void ru()
        }

        const fo = {}, su = "__NG_DI_FLAG__", na = "ngTempTokenPath", MT = /\n/gm, bg = "__source";
        let er;

        function Gn(e) {
            const n = er;
            return er = e, n
        }

        function OT(e, n = re.Default) {
            if (void 0 === er) throw new S(-203, !1);
            return null === er ? Dg(e, void 0, n) : er.get(e, n & re.Optional ? null : void 0, n)
        }

        function oe(e, n = re.Default) {
            return (Eg() || OT)(j(e), n)
        }

        function L(e, n = re.Default) {
            return oe(e, ia(n))
        }

        function ia(e) {
            return typeof e > "u" || "number" == typeof e ? e : (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
        }

        function au(e) {
            const n = [];
            for (let t = 0; t < e.length; t++) {
                const i = j(e[t]);
                if (Array.isArray(i)) {
                    if (0 === i.length) throw new S(900, !1);
                    let r, o = re.Default;
                    for (let s = 0; s < i.length; s++) {
                        const a = i[s], l = NT(a);
                        "number" == typeof l ? -1 === l ? r = a.token : o |= l : r = a
                    }
                    n.push(oe(r, o))
                } else n.push(oe(i))
            }
            return n
        }

        function ho(e, n) {
            return e[su] = n, e.prototype[su] = n, e
        }

        function NT(e) {
            return e[su]
        }

        const lu = ho(Ji("Optional"), 8), cu = ho(Ji("SkipSelf"), 4);

        function mi(e, n) {
            return e.hasOwnProperty(Sn) ? e[Sn] : null
        }

        function tr(e, n) {
            e.forEach(t => Array.isArray(t) ? tr(t, n) : n(t))
        }

        function Mg(e, n, t) {
            n >= e.length ? e.push(t) : e.splice(n, 0, t)
        }

        function ra(e, n) {
            return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0]
        }

        function At(e, n, t) {
            let i = nr(e, n);
            return i >= 0 ? e[1 | i] = t : (i = ~i, function Tg(e, n, t, i) {
                let r = e.length;
                if (r == n) e.push(t, i); else if (1 === r) e.push(i, e[0]), e[0] = t; else {
                    for (r--, e.push(e[r - 1], e[r]); r > n;) e[r] = e[r - 2], r--;
                    e[n] = t, e[n + 1] = i
                }
            }(e, i, n, t)), i
        }

        function du(e, n) {
            const t = nr(e, n);
            if (t >= 0) return e[1 | t]
        }

        function nr(e, n) {
            return function Sg(e, n, t) {
                let i = 0, r = e.length >> t;
                for (; r !== i;) {
                    const o = i + (r - i >> 1), s = e[o << t];
                    if (n === s) return o << t;
                    s > n ? r = o : i = o + 1
                }
                return ~(r << t)
            }(e, n, 1)
        }

        const cn = {}, ae = [], un = new R(""), Og = new R("", -1), fu = new R("");

        class sa {
            get(n, t = fo) {
                if (t === fo) {
                    const i = new Error(`NullInjectorError: No provider for ${$e(n)}!`);
                    throw i.name = "NullInjectorError", i
                }
                return t
            }
        }

        var aa = function (e) {
            return e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default", e
        }(aa || {}), Wt = function (e) {
            return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e
        }(Wt || {}), qn = function (e) {
            return e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform", e
        }(qn || {});

        function FT(e, n, t) {
            let i = e.length;
            for (; ;) {
                const r = e.indexOf(n, t);
                if (-1 === r) return r;
                if (0 === r || e.charCodeAt(r - 1) <= 32) {
                    const o = n.length;
                    if (r + o === i || e.charCodeAt(r + o) <= 32) return r
                }
                t = r + 1
            }
        }

        function hu(e, n, t) {
            let i = 0;
            for (; i < t.length;) {
                const r = t[i];
                if ("number" == typeof r) {
                    if (0 !== r) break;
                    i++;
                    const o = t[i++], s = t[i++], a = t[i++];
                    e.setAttribute(n, s, a, o)
                } else {
                    const o = r, s = t[++i];
                    Ag(o) ? e.setProperty(n, o, s) : e.setAttribute(n, o, s), i++
                }
            }
            return i
        }

        function Ng(e) {
            return 3 === e || 4 === e || 6 === e
        }

        function Ag(e) {
            return 64 === e.charCodeAt(0)
        }

        function po(e, n) {
            if (null !== n && 0 !== n.length) if (null === e || 0 === e.length) e = n.slice(); else {
                let t = -1;
                for (let i = 0; i < n.length; i++) {
                    const r = n[i];
                    "number" == typeof r ? t = r : 0 === t || xg(e, t, r, null, -1 === t || 2 === t ? n[++i] : null)
                }
            }
            return e
        }

        function xg(e, n, t, i, r) {
            let o = 0, s = e.length;
            if (-1 === n) s = -1; else for (; o < e.length;) {
                const a = e[o++];
                if ("number" == typeof a) {
                    if (a === n) {
                        s = -1;
                        break
                    }
                    if (a > n) {
                        s = o - 1;
                        break
                    }
                }
            }
            for (; o < e.length;) {
                const a = e[o];
                if ("number" == typeof a) break;
                if (a === t) {
                    if (null === i) return void (null !== r && (e[o + 1] = r));
                    if (i === e[o + 1]) return void (e[o + 2] = r)
                }
                o++, null !== i && o++, null !== r && o++
            }
            -1 !== s && (e.splice(s, 0, n), o = s + 1), e.splice(o++, 0, t), null !== i && e.splice(o++, 0, i), null !== r && e.splice(o++, 0, r)
        }

        const Rg = "ng-template";

        function VT(e, n, t, i) {
            let r = 0;
            if (i) {
                for (; r < n.length && "string" == typeof n[r]; r += 2) if ("class" === n[r] && -1 !== FT(n[r + 1].toLowerCase(), t, 0)) return !0
            } else if (pu(e)) return !1;
            if (r = n.indexOf(1, r), r > -1) {
                let o;
                for (; ++r < n.length && "string" == typeof (o = n[r]);) if (o.toLowerCase() === t) return !0
            }
            return !1
        }

        function pu(e) {
            return 4 === e.type && e.value !== Rg
        }

        function HT(e, n, t) {
            return n === (4 !== e.type || t ? e.value : Rg)
        }

        function BT(e, n, t) {
            let i = 4;
            const r = e.attrs, o = null !== r ? function $T(e) {
                for (let n = 0; n < e.length; n++) if (Ng(e[n])) return n;
                return e.length
            }(r) : 0;
            let s = !1;
            for (let a = 0; a < n.length; a++) {
                const l = n[a];
                if ("number" != typeof l) {
                    if (!s) if (4 & i) {
                        if (i = 2 | 1 & i, "" !== l && !HT(e, l, t) || "" === l && 1 === n.length) {
                            if (Zt(i)) return !1;
                            s = !0
                        }
                    } else if (8 & i) {
                        if (null === r || !VT(e, r, l, t)) {
                            if (Zt(i)) return !1;
                            s = !0
                        }
                    } else {
                        const c = n[++a], u = jT(l, r, pu(e), t);
                        if (-1 === u) {
                            if (Zt(i)) return !1;
                            s = !0;
                            continue
                        }
                        if ("" !== c) {
                            let d;
                            if (d = u > o ? "" : r[u + 1].toLowerCase(), 2 & i && c !== d) {
                                if (Zt(i)) return !1;
                                s = !0
                            }
                        }
                    }
                } else {
                    if (!s && !Zt(i) && !Zt(l)) return !1;
                    if (s && Zt(l)) continue;
                    s = !1, i = l | 1 & i
                }
            }
            return Zt(i) || s
        }

        function Zt(e) {
            return !(1 & e)
        }

        function jT(e, n, t, i) {
            if (null === n) return -1;
            let r = 0;
            if (i || !t) {
                let o = !1;
                for (; r < n.length;) {
                    const s = n[r];
                    if (s === e) return r;
                    if (3 === s || 6 === s) o = !0; else {
                        if (1 === s || 2 === s) {
                            let a = n[++r];
                            for (; "string" == typeof a;) a = n[++r];
                            continue
                        }
                        if (4 === s) break;
                        if (0 === s) {
                            r += 4;
                            continue
                        }
                    }
                    r += o ? 1 : 2
                }
                return -1
            }
            return function zT(e, n) {
                let t = e.indexOf(4);
                if (t > -1) for (t++; t < e.length;) {
                    const i = e[t];
                    if ("number" == typeof i) return -1;
                    if (i === n) return t;
                    t++
                }
                return -1
            }(n, e)
        }

        function Lg(e, n, t = !1) {
            for (let i = 0; i < n.length; i++) if (BT(e, n[i], t)) return !0;
            return !1
        }

        function Pg(e, n) {
            return e ? ":not(" + n.trim() + ")" : n
        }

        function qT(e) {
            let n = e[0], t = 1, i = 2, r = "", o = !1;
            for (; t < e.length;) {
                let s = e[t];
                if ("string" == typeof s) if (2 & i) {
                    const a = e[++t];
                    r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                } else 8 & i ? r += "." + s : 4 & i && (r += " " + s); else "" !== r && !Zt(s) && (n += Pg(o, r), r = ""), i = s, o = o || !Zt(i);
                t++
            }
            return "" !== r && (n += Pg(o, r)), n
        }

        function Yt(e) {
            return Mn(() => {
                const n = Fg(e), t = {
                    ...n,
                    decls: e.decls,
                    vars: e.vars,
                    template: e.template,
                    consts: e.consts || null,
                    ngContentSelectors: e.ngContentSelectors,
                    onPush: e.changeDetection === aa.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    dependencies: n.standalone && e.dependencies || null,
                    getStandaloneInjector: null,
                    signals: e.signals ?? !1,
                    data: e.data || {},
                    encapsulation: e.encapsulation || Wt.Emulated,
                    styles: e.styles || ae,
                    _: null,
                    schemas: e.schemas || null,
                    tView: null,
                    id: ""
                };
                Vg(t);
                const i = e.dependencies;
                return t.directiveDefs = la(i, !1), t.pipeDefs = la(i, !0), t.id = function XT(e) {
                    let n = 0;
                    const t = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, e.consts, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery].join("|");
                    for (const r of t) n = Math.imul(31, n) + r.charCodeAt(0) | 0;
                    return n += 2147483648, "c" + n
                }(t), t
            })
        }

        function YT(e) {
            return ee(e) || ze(e)
        }

        function QT(e) {
            return null !== e
        }

        function Wn(e) {
            return Mn(() => ({
                type: e.type,
                bootstrap: e.bootstrap || ae,
                declarations: e.declarations || ae,
                imports: e.imports || ae,
                exports: e.exports || ae,
                transitiveCompileScopes: null,
                schemas: e.schemas || null,
                id: e.id || null
            }))
        }

        function kg(e, n) {
            if (null == e) return cn;
            const t = {};
            for (const i in e) if (e.hasOwnProperty(i)) {
                const r = e[i];
                let o, s, a = qn.None;
                Array.isArray(r) ? (a = r[0], o = r[1], s = r[2] ?? o) : (o = r, s = r), n ? (t[o] = a !== qn.None ? [i, a] : i, n[o] = s) : t[o] = i
            }
            return t
        }

        function z(e) {
            return Mn(() => {
                const n = Fg(e);
                return Vg(n), n
            })
        }

        function Ct(e) {
            return {
                type: e.type,
                name: e.name,
                factory: null,
                pure: !1 !== e.pure,
                standalone: !0 === e.standalone,
                onDestroy: e.type.prototype.ngOnDestroy || null
            }
        }

        function ee(e) {
            return e[co] || null
        }

        function ze(e) {
            return e[nu] || null
        }

        function Ke(e) {
            return e[iu] || null
        }

        function Fg(e) {
            const n = {};
            return {
                type: e.type,
                providersResolver: null,
                factory: null,
                hostBindings: e.hostBindings || null,
                hostVars: e.hostVars || 0,
                hostAttrs: e.hostAttrs || null,
                contentQueries: e.contentQueries || null,
                declaredInputs: n,
                inputTransforms: null,
                inputConfig: e.inputs || cn,
                exportAs: e.exportAs || null,
                standalone: !0 === e.standalone,
                signals: !0 === e.signals,
                selectors: e.selectors || ae,
                viewQuery: e.viewQuery || null,
                features: e.features || null,
                setInput: null,
                findHostDirectiveDefs: null,
                hostDirectives: null,
                inputs: kg(e.inputs, n),
                outputs: kg(e.outputs),
                debugInfo: null
            }
        }

        function Vg(e) {
            e.features?.forEach(n => n(e))
        }

        function la(e, n) {
            if (!e) return null;
            const t = n ? Ke : YT;
            return () => ("function" == typeof e ? e() : e).map(i => t(i)).filter(QT)
        }

        function JT(...e) {
            return {\u0275providers: gu(0, e), \u0275fromNgModule: !0}
        }

        function gu(e, ...n) {
            const t = [], i = new Set;
            let r;
            const o = s => {
                t.push(s)
            };
            return tr(n, s => {
                const a = s;
                ua(a, o, [], i) && (r ||= [], r.push(a))
            }), void 0 !== r && Hg(r, o), t
        }

        function Hg(e, n) {
            for (let t = 0; t < e.length; t++) {
                const {ngModule: i, providers: r} = e[t];
                mu(r, o => {
                    n(o, i)
                })
            }
        }

        function ua(e, n, t, i) {
            if (!(e = j(e))) return !1;
            let r = null, o = ea(e);
            const s = !o && ee(e);
            if (o || s) {
                if (s && !s.standalone) return !1;
                r = e
            } else {
                const l = e.ngModule;
                if (o = ea(l), !o) return !1;
                r = l
            }
            const a = i.has(r);
            if (s) {
                if (a) return !1;
                if (i.add(r), s.dependencies) {
                    const l = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                    for (const c of l) ua(c, n, t, i)
                }
            } else {
                if (!o) return !1;
                {
                    if (null != o.imports && !a) {
                        let c;
                        i.add(r);
                        try {
                            tr(o.imports, u => {
                                ua(u, n, t, i) && (c ||= [], c.push(u))
                            })
                        } finally {
                        }
                        void 0 !== c && Hg(c, n)
                    }
                    if (!a) {
                        const c = mi(r) || (() => new r);
                        n({provide: r, useFactory: c, deps: ae}, r), n({
                            provide: fu,
                            useValue: r,
                            multi: !0
                        }, r), n({provide: un, useValue: () => oe(r), multi: !0}, r)
                    }
                    const l = o.providers;
                    if (null != l && !a) {
                        const c = e;
                        mu(l, u => {
                            n(u, c)
                        })
                    }
                }
            }
            return r !== e && void 0 !== e.providers
        }

        function mu(e, n) {
            for (let t of e) tu(t) && (t = t.\u0275providers), Array.isArray(t) ? mu(t, n) : n(t)
        }

        const e0 = he({provide: String, useValue: he});

        function vu(e) {
            return null !== e && "object" == typeof e && e0 in e
        }

        function _i(e) {
            return "function" == typeof e
        }

        const _u = new R(""), da = {}, n0 = {};
        let yu;

        function fa() {
            return void 0 === yu && (yu = new sa), yu
        }

        class Qt {
        }

        class ir extends Qt {
            constructor(n, t, i, r) {
                super(), this.parent = t, this.source = i, this.scopes = r, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, wu(n, s => this.processProvider(s)), this.records.set(Og, rr(void 0, this)), r.has("environment") && this.records.set(Qt, rr(void 0, this));
                const o = this.records.get(_u);
                null != o && "string" == typeof o.value && this.scopes.add(o.value), this.injectorDefTypes = new Set(this.get(fu, ae, re.Self))
            }

            get destroyed() {
                return this._destroyed
            }

            destroy() {
                this.assertNotDestroyed(), this._destroyed = !0;
                const n = X(null);
                try {
                    for (const i of this._ngOnDestroyHooks) i.ngOnDestroy();
                    const t = this._onDestroyHooks;
                    this._onDestroyHooks = [];
                    for (const i of t) i()
                } finally {
                    this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), X(n)
                }
            }

            onDestroy(n) {
                return this.assertNotDestroyed(), this._onDestroyHooks.push(n), () => this.removeOnDestroy(n)
            }

            runInContext(n) {
                this.assertNotDestroyed();
                const t = Gn(this), i = _t(void 0);
                try {
                    return n()
                } finally {
                    Gn(t), _t(i)
                }
            }

            get(n, t = fo, i = re.Default) {
                if (this.assertNotDestroyed(), n.hasOwnProperty(wg)) return n[wg](this);
                i = ia(i);
                const o = Gn(this), s = _t(void 0);
                try {
                    if (!(i & re.SkipSelf)) {
                        let l = this.records.get(n);
                        if (void 0 === l) {
                            const c = function l0(e) {
                                return "function" == typeof e || "object" == typeof e && e instanceof R
                            }(n) && Js(n);
                            l = c && this.injectableDefInScope(c) ? rr(Cu(n), da) : null, this.records.set(n, l)
                        }
                        if (null != l) return this.hydrate(n, l)
                    }
                    return (i & re.Self ? fa() : this.parent).get(n, t = i & re.Optional && t === fo ? null : t)
                } catch (a) {
                    if ("NullInjectorError" === a.name) {
                        if ((a[na] = a[na] || []).unshift($e(n)), o) throw a;
                        return function AT(e, n, t, i) {
                            const r = e[na];
                            throw n[bg] && r.unshift(n[bg]), e.message = function xT(e, n, t, i = null) {
                                e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
                                let r = $e(n);
                                if (Array.isArray(n)) r = n.map($e).join(" -> "); else if ("object" == typeof n) {
                                    let o = [];
                                    for (let s in n) if (n.hasOwnProperty(s)) {
                                        let a = n[s];
                                        o.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : $e(a)))
                                    }
                                    r = `{${o.join(", ")}}`
                                }
                                return `${t}${i ? "(" + i + ")" : ""}[${r}]: ${e.replace(MT, "\n  ")}`
                            }("\n" + e.message, r, t, i), e.ngTokenPath = r, e[na] = null, e
                        }(a, n, "R3InjectorError", this.source)
                    }
                    throw a
                } finally {
                    _t(s), Gn(o)
                }
            }

            resolveInjectorInitializers() {
                const n = X(null), t = Gn(this), i = _t(void 0);
                try {
                    const o = this.get(un, ae, re.Self);
                    for (const s of o) s()
                } finally {
                    Gn(t), _t(i), X(n)
                }
            }

            toString() {
                const n = [], t = this.records;
                for (const i of t.keys()) n.push($e(i));
                return `R3Injector[${n.join(", ")}]`
            }

            assertNotDestroyed() {
                if (this._destroyed) throw new S(205, !1)
            }

            processProvider(n) {
                let t = _i(n = j(n)) ? n : j(n && n.provide);
                const i = function o0(e) {
                    return vu(e) ? rr(void 0, e.useValue) : rr(Ug(e), da)
                }(n);
                if (!_i(n) && !0 === n.multi) {
                    let r = this.records.get(t);
                    r || (r = rr(void 0, da, !0), r.factory = () => au(r.multi), this.records.set(t, r)), t = n, r.multi.push(n)
                }
                this.records.set(t, i)
            }

            hydrate(n, t) {
                const i = X(null);
                try {
                    return t.value === da && (t.value = n0, t.value = t.factory()), "object" == typeof t.value && t.value && function a0(e) {
                        return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                    }(t.value) && this._ngOnDestroyHooks.add(t.value), t.value
                } finally {
                    X(i)
                }
            }

            injectableDefInScope(n) {
                if (!n.providedIn) return !1;
                const t = j(n.providedIn);
                return "string" == typeof t ? "any" === t || this.scopes.has(t) : this.injectorDefTypes.has(t)
            }

            removeOnDestroy(n) {
                const t = this._onDestroyHooks.indexOf(n);
                -1 !== t && this._onDestroyHooks.splice(t, 1)
            }
        }

        function Cu(e) {
            const n = Js(e), t = null !== n ? n.factory : mi(e);
            if (null !== t) return t;
            if (e instanceof R) throw new S(204, !1);
            if (e instanceof Function) return function r0(e) {
                if (e.length > 0) throw new S(204, !1);
                const t = function yT(e) {
                    return e && (e[ta] || e[_g]) || null
                }(e);
                return null !== t ? () => t.factory(e) : () => new e
            }(e);
            throw new S(204, !1)
        }

        function Ug(e, n, t) {
            let i;
            if (_i(e)) {
                const r = j(e);
                return mi(r) || Cu(r)
            }
            if (vu(e)) i = () => j(e.useValue); else if (function jg(e) {
                return !(!e || !e.useFactory)
            }(e)) i = () => e.useFactory(...au(e.deps || [])); else if (function Bg(e) {
                return !(!e || !e.useExisting)
            }(e)) i = () => oe(j(e.useExisting)); else {
                const r = j(e && (e.useClass || e.provide));
                if (!function s0(e) {
                    return !!e.deps
                }(e)) return mi(r) || Cu(r);
                i = () => new r(...au(e.deps))
            }
            return i
        }

        function rr(e, n, t = !1) {
            return {factory: e, value: n, multi: t ? [] : void 0}
        }

        function wu(e, n) {
            for (const t of e) Array.isArray(t) ? wu(t, n) : t && tu(t) ? wu(t.\u0275providers, n) : n(t)
        }

        const Se = 0, O = 1, k = 2, He = 3, Kt = 4, Xe = 5, lt = 6, sr = 7, ye = 8, Be = 9, dn = 10, U = 11, mo = 12,
            Gg = 13, ar = 14, Oe = 15, yi = 16, lr = 17, On = 18, cr = 19, qg = 20, Zn = 21, pa = 22, Bt = 23, P = 25,
            bu = 1, fn = 7, ur = 9, xe = 10;
        var ma = function (e) {
            return e[e.None = 0] = "None", e[e.HasTransplantedViews = 2] = "HasTransplantedViews", e
        }(ma || {});

        function qe(e) {
            return Array.isArray(e) && "object" == typeof e[bu]
        }

        function it(e) {
            return Array.isArray(e) && !0 === e[bu]
        }

        function Iu(e) {
            return !!(4 & e.flags)
        }

        function Ci(e) {
            return e.componentOffset > -1
        }

        function va(e) {
            return !(1 & ~e.flags)
        }

        function Xt(e) {
            return !!e.template
        }

        function _o(e) {
            return !!(512 & e[k])
        }

        class C0 {
            constructor(n, t, i) {
                this.previousValue = n, this.currentValue = t, this.firstChange = i
            }

            isFirstChange() {
                return this.firstChange
            }
        }

        function Kg(e, n, t, i) {
            null !== n ? n.applyValueToInputSignal(n, i) : e[t] = i
        }

        function hn() {
            return Xg
        }

        function Xg(e) {
            return e.type.prototype.ngOnChanges && (e.setInput = E0), w0
        }

        function w0() {
            const e = em(this), n = e?.current;
            if (n) {
                const t = e.previous;
                if (t === cn) e.previous = n; else for (let i in n) t[i] = n[i];
                e.current = null, this.ngOnChanges(n)
            }
        }

        function E0(e, n, t, i, r) {
            const o = this.declaredInputs[i], s = em(e) || function D0(e, n) {
                return e[Jg] = n
            }(e, {previous: cn, current: null}), a = s.current || (s.current = {}), l = s.previous, c = l[o];
            a[o] = new C0(c && c.currentValue, t, l === cn), Kg(e, n, r, t)
        }

        hn.ngInherit = !0;
        const Jg = "__ngSimpleChanges__";

        function em(e) {
            return e[Jg] || null
        }

        const pn = function (e, n, t) {
        };

        function le(e) {
            for (; Array.isArray(e);) e = e[Se];
            return e
        }

        function yo(e, n) {
            return le(n[e])
        }

        function ct(e, n) {
            return le(n[e.index])
        }

        function Co(e, n) {
            return e.data[n]
        }

        function xt(e, n) {
            const t = n[e];
            return qe(t) ? t : t[Se]
        }

        function Nu(e) {
            return !(128 & ~e[k])
        }

        function jt(e, n) {
            return null == n ? null : e[n]
        }

        function im(e) {
            e[lr] = 0
        }

        function rm(e) {
            1024 & e[k] || (e[k] |= 1024, Nu(e) && ya(e))
        }

        function _a(e) {
            return !!(9216 & e[k] || e[Bt]?.dirty)
        }

        function Au(e) {
            e[dn].changeDetectionScheduler?.notify(8), 64 & e[k] && (e[k] |= 1024), _a(e) && ya(e)
        }

        function ya(e) {
            e[dn].changeDetectionScheduler?.notify(0);
            let n = Nn(e);
            for (; null !== n && !(8192 & n[k]) && (n[k] |= 8192, Nu(n));) n = Nn(n)
        }

        function Ca(e, n) {
            if (!(256 & ~e[k])) throw new S(911, !1);
            null === e[Zn] && (e[Zn] = []), e[Zn].push(n)
        }

        function Nn(e) {
            const n = e[He];
            return it(n) ? n[He] : n
        }

        const $ = {lFrame: vm(null), bindingsEnabled: !0, skipHydrationRootTNode: null};
        let sm = !1;

        function am() {
            return $.bindingsEnabled
        }

        function E() {
            return $.lFrame.lView
        }

        function J() {
            return $.lFrame.tView
        }

        function G(e) {
            return $.lFrame.contextLView = e, e[ye]
        }

        function q(e) {
            return $.lFrame.contextLView = null, e
        }

        function pe() {
            let e = lm();
            for (; null !== e && 64 === e.type;) e = e.parent;
            return e
        }

        function lm() {
            return $.lFrame.currentTNode
        }

        function Jt(e, n) {
            const t = $.lFrame;
            t.currentTNode = e, t.isParent = n
        }

        function Lu() {
            return $.lFrame.isParent
        }

        function Pu() {
            $.lFrame.isParent = !1
        }

        function dm() {
            return sm
        }

        function fm(e) {
            sm = e
        }

        function ut() {
            const e = $.lFrame;
            let n = e.bindingRootIndex;
            return -1 === n && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n
        }

        function en() {
            return $.lFrame.bindingIndex++
        }

        function xn(e) {
            const n = $.lFrame, t = n.bindingIndex;
            return n.bindingIndex = n.bindingIndex + e, t
        }

        function F0(e, n) {
            const t = $.lFrame;
            t.bindingIndex = t.bindingRootIndex = e, ku(n)
        }

        function ku(e) {
            $.lFrame.currentDirectiveIndex = e
        }

        function Vu() {
            return $.lFrame.currentQueryIndex
        }

        function Ea(e) {
            $.lFrame.currentQueryIndex = e
        }

        function H0(e) {
            const n = e[O];
            return 2 === n.type ? n.declTNode : 1 === n.type ? e[Xe] : null
        }

        function gm(e, n, t) {
            if (t & re.SkipSelf) {
                let r = n, o = e;
                for (; !(r = r.parent, null !== r || t & re.Host || (r = H0(o), null === r || (o = o[ar], 10 & r.type)));) ;
                if (null === r) return !1;
                n = r, e = o
            }
            const i = $.lFrame = mm();
            return i.currentTNode = n, i.lView = e, !0
        }

        function Hu(e) {
            const n = mm(), t = e[O];
            $.lFrame = n, n.currentTNode = t.firstChild, n.lView = e, n.tView = t, n.contextLView = e, n.bindingIndex = t.bindingStartIndex, n.inI18n = !1
        }

        function mm() {
            const e = $.lFrame, n = null === e ? null : e.child;
            return null === n ? vm(e) : n
        }

        function vm(e) {
            const n = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: e,
                child: null,
                inI18n: !1
            };
            return null !== e && (e.child = n), n
        }

        function _m() {
            const e = $.lFrame;
            return $.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
        }

        const ym = _m;

        function Bu() {
            const e = _m();
            e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
        }

        function Je() {
            return $.lFrame.selectedIndex
        }

        function Di(e) {
            $.lFrame.selectedIndex = e
        }

        function Ce() {
            const e = $.lFrame;
            return Co(e.tView, e.selectedIndex)
        }

        let Em = !0;

        function Eo() {
            return Em
        }

        function gn(e) {
            Em = e
        }

        function Da(e, n) {
            for (let t = n.directiveStart, i = n.directiveEnd; t < i; t++) {
                const o = e.data[t].type.prototype, {
                    ngAfterContentInit: s,
                    ngAfterContentChecked: a,
                    ngAfterViewInit: l,
                    ngAfterViewChecked: c,
                    ngOnDestroy: u
                } = o;
                s && (e.contentHooks ??= []).push(-t, s), a && ((e.contentHooks ??= []).push(t, a), (e.contentCheckHooks ??= []).push(t, a)), l && (e.viewHooks ??= []).push(-t, l), c && ((e.viewHooks ??= []).push(t, c), (e.viewCheckHooks ??= []).push(t, c)), null != u && (e.destroyHooks ??= []).push(t, u)
            }
        }

        function ba(e, n, t) {
            Dm(e, n, 3, t)
        }

        function Ia(e, n, t, i) {
            (3 & e[k]) === t && Dm(e, n, t, i)
        }

        function ju(e, n) {
            let t = e[k];
            (3 & t) === n && (t &= 16383, t += 1, e[k] = t)
        }

        function Dm(e, n, t, i) {
            const o = i ?? -1, s = n.length - 1;
            let a = 0;
            for (let l = void 0 !== i ? 65535 & e[lr] : 0; l < s; l++) if ("number" == typeof n[l + 1]) {
                if (a = n[l], null != i && a >= i) break
            } else n[l] < 0 && (e[lr] += 65536), (a < o || -1 == o) && (G0(e, t, n, l), e[lr] = (4294901760 & e[lr]) + l + 2), l++
        }

        function bm(e, n) {
            pn(4, e, n);
            const t = X(null);
            try {
                n.call(e)
            } finally {
                X(t), pn(5, e, n)
            }
        }

        function G0(e, n, t, i) {
            const r = t[i] < 0, o = t[i + 1], a = e[r ? -t[i] : t[i]];
            r ? e[k] >> 14 < e[lr] >> 16 && (3 & e[k]) === n && (e[k] += 16384, bm(a, o)) : bm(a, o)
        }

        const dr = -1;

        class Do {
            constructor(n, t, i) {
                this.factory = n, this.resolving = !1, this.canSeeViewProviders = t, this.injectImpl = i
            }
        }

        const $u = {};

        class bi {
            constructor(n, t) {
                this.injector = n, this.parentInjector = t
            }

            get(n, t, i) {
                i = ia(i);
                const r = this.injector.get(n, $u, i);
                return r !== $u || t === $u ? r : this.parentInjector.get(n, t, i)
            }
        }

        function zu(e) {
            return e !== dr
        }

        function bo(e) {
            return 32767 & e
        }

        function Io(e, n) {
            let t = function Q0(e) {
                return e >> 16
            }(e), i = n;
            for (; t > 0;) i = i[ar], t--;
            return i
        }

        let Gu = !0;

        function Ma(e) {
            const n = Gu;
            return Gu = e, n
        }

        const Mm = 255, Tm = 5;
        let X0 = 0;
        const mn = {};

        function Ta(e, n) {
            const t = Sm(e, n);
            if (-1 !== t) return t;
            const i = n[O];
            i.firstCreatePass && (e.injectorIndex = n.length, qu(i.data, e), qu(n, null), qu(i.blueprint, null));
            const r = Sa(e, n), o = e.injectorIndex;
            if (zu(r)) {
                const s = bo(r), a = Io(r, n), l = a[O].data;
                for (let c = 0; c < 8; c++) n[o + c] = a[s + c] | l[s + c]
            }
            return n[o + 8] = r, o
        }

        function qu(e, n) {
            e.push(0, 0, 0, 0, 0, 0, 0, 0, n)
        }

        function Sm(e, n) {
            return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === n[e.injectorIndex + 8] ? -1 : e.injectorIndex
        }

        function Sa(e, n) {
            if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
            let t = 0, i = null, r = n;
            for (; null !== r;) {
                if (i = Pm(r), null === i) return dr;
                if (t++, r = r[ar], -1 !== i.injectorIndex) return i.injectorIndex | t << 16
            }
            return dr
        }

        function Wu(e, n, t) {
            !function J0(e, n, t) {
                let i;
                "string" == typeof t ? i = t.charCodeAt(0) || 0 : t.hasOwnProperty(uo) && (i = t[uo]), null == i && (i = t[uo] = X0++);
                const r = i & Mm;
                n.data[e + (r >> Tm)] |= 1 << r
            }(e, n, t)
        }

        function Om(e, n, t) {
            if (t & re.Optional || void 0 !== e) return e;
            ru()
        }

        function Nm(e, n, t, i) {
            if (t & re.Optional && void 0 === i && (i = null), !(t & (re.Self | re.Host))) {
                const r = e[Be], o = _t(void 0);
                try {
                    return r ? r.get(n, i, t & re.Optional) : Dg(n, i, t & re.Optional)
                } finally {
                    _t(o)
                }
            }
            return Om(i, 0, t)
        }

        function Am(e, n, t, i = re.Default, r) {
            if (null !== e) {
                if (2048 & n[k] && !(i & re.Self)) {
                    const s = function rS(e, n, t, i, r) {
                        let o = e, s = n;
                        for (; null !== o && null !== s && 2048 & s[k] && !(512 & s[k]);) {
                            const a = xm(o, s, t, i | re.Self, mn);
                            if (a !== mn) return a;
                            let l = o.parent;
                            if (!l) {
                                const c = s[qg];
                                if (c) {
                                    const u = c.get(t, mn, i);
                                    if (u !== mn) return u
                                }
                                l = Pm(s), s = s[ar]
                            }
                            o = l
                        }
                        return r
                    }(e, n, t, i, mn);
                    if (s !== mn) return s
                }
                const o = xm(e, n, t, i, mn);
                if (o !== mn) return o
            }
            return Nm(n, t, i, r)
        }

        function xm(e, n, t, i, r) {
            const o = function nS(e) {
                if ("string" == typeof e) return e.charCodeAt(0) || 0;
                const n = e.hasOwnProperty(uo) ? e[uo] : void 0;
                return "number" == typeof n ? n >= 0 ? n & Mm : iS : n
            }(t);
            if ("function" == typeof o) {
                if (!gm(n, e, i)) return i & re.Host ? Om(r, 0, i) : Nm(n, t, i, r);
                try {
                    let s;
                    if (s = o(i), null != s || i & re.Optional) return s;
                    ru()
                } finally {
                    ym()
                }
            } else if ("number" == typeof o) {
                let s = null, a = Sm(e, n), l = dr, c = i & re.Host ? n[Oe][Xe] : null;
                for ((-1 === a || i & re.SkipSelf) && (l = -1 === a ? Sa(e, n) : n[a + 8], l !== dr && Lm(i, !1) ? (s = n[O], a = bo(l), n = Io(l, n)) : a = -1); -1 !== a;) {
                    const u = n[O];
                    if (Rm(o, a, u.data)) {
                        const d = tS(a, n, t, s, i, c);
                        if (d !== mn) return d
                    }
                    l = n[a + 8], l !== dr && Lm(i, n[O].data[a + 8] === c) && Rm(o, a, n) ? (s = u, a = bo(l), n = Io(l, n)) : a = -1
                }
            }
            return r
        }

        function tS(e, n, t, i, r, o) {
            const s = n[O], a = s.data[e + 8],
                u = Oa(a, s, t, null == i ? Ci(a) && Gu : i != s && !!(3 & a.type), r & re.Host && o === a);
            return null !== u ? Ii(n, s, u, a) : mn
        }

        function Oa(e, n, t, i, r) {
            const o = e.providerIndexes, s = n.data, a = 1048575 & o, l = e.directiveStart, u = o >> 20,
                h = r ? a + u : e.directiveEnd;
            for (let p = i ? a : a + u; p < h; p++) {
                const g = s[p];
                if (p < l && t === g || p >= l && g.type === t) return p
            }
            if (r) {
                const p = s[l];
                if (p && Xt(p) && p.type === t) return l
            }
            return null
        }

        function Ii(e, n, t, i) {
            let r = e[t];
            const o = n.data;
            if (function q0(e) {
                return e instanceof Do
            }(r)) {
                const s = r;
                s.resolving && function DT(e, n) {
                    throw n && n.join(" > "), new S(-200, e)
                }(function ce(e) {
                    return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : Z(e)
                }(o[t]));
                const a = Ma(s.canSeeViewProviders);
                s.resolving = !0;
                const c = s.injectImpl ? _t(s.injectImpl) : null;
                gm(e, i, re.Default);
                try {
                    r = e[t] = s.factory(void 0, o, e, i), n.firstCreatePass && t >= i.directiveStart && function z0(e, n, t) {
                        const {ngOnChanges: i, ngOnInit: r, ngDoCheck: o} = n.type.prototype;
                        if (i) {
                            const s = Xg(n);
                            (t.preOrderHooks ??= []).push(e, s), (t.preOrderCheckHooks ??= []).push(e, s)
                        }
                        r && (t.preOrderHooks ??= []).push(0 - e, r), o && ((t.preOrderHooks ??= []).push(e, o), (t.preOrderCheckHooks ??= []).push(e, o))
                    }(t, o[t], n)
                } finally {
                    null !== c && _t(c), Ma(a), s.resolving = !1, ym()
                }
            }
            return r
        }

        function Rm(e, n, t) {
            return !!(t[n + (e >> Tm)] & 1 << e)
        }

        function Lm(e, n) {
            return !(e & re.Self || e & re.Host && n)
        }

        class We {
            constructor(n, t) {
                this._tNode = n, this._lView = t
            }

            get(n, t, i) {
                return Am(this._tNode, this._lView, n, ia(i), t)
            }
        }

        function iS() {
            return new We(pe(), E())
        }

        function rt(e) {
            return Mn(() => {
                const n = e.prototype.constructor, t = n[Sn] || Zu(n), i = Object.prototype;
                let r = Object.getPrototypeOf(e.prototype).constructor;
                for (; r && r !== i;) {
                    const o = r[Sn] || Zu(r);
                    if (o && o !== t) return o;
                    r = Object.getPrototypeOf(r)
                }
                return o => new o
            })
        }

        function Zu(e) {
            return Xs(e) ? () => {
                const n = Zu(j(e));
                return n && n()
            } : mi(e)
        }

        function Pm(e) {
            const n = e[O], t = n.type;
            return 2 === t ? n.declTNode : 1 === t ? e[Xe] : null
        }

        function Bm(e, n = null, t = null, i) {
            const r = jm(e, n, t, i);
            return r.resolveInjectorInitializers(), r
        }

        function jm(e, n = null, t = null, i, r = new Set) {
            const o = [t || ae, JT(e)];
            return i = i || ("object" == typeof e ? void 0 : $e(e)), new ir(o, n || fa(), i || null, r)
        }

        class et {
            static#e = this.THROW_IF_NOT_FOUND = fo;
            static#t = this.NULL = new sa;
            static#n = this.\u0275prov = te({token: et, providedIn: "any", factory: () => oe(Og)});
            static#i = this.__NG_ELEMENT_ID__ = -1

            static create(n, t) {
                if (Array.isArray(n)) return Bm({name: ""}, t, n, "");
                {
                    const i = n.name ?? "";
                    return Bm({name: i}, n.parent, n.providers, i)
                }
            }
        }

        new R("").__NG_ELEMENT_ID__ = e => {
            const n = pe();
            if (null === n) throw new S(204, !1);
            if (2 & n.type) return n.value;
            if (e & re.Optional) return null;
            throw new S(204, !1)
        };

        function Qu(e) {
            return e.ngOriginalError
        }

        const $m = !0;
        let Mo = (() => {
            class e {
                static#e = this.__NG_ELEMENT_ID__ = pS;
                static#t = this.__NG_ENV_ID__ = t => t
            }

            return e
        })();

        class hS extends Mo {
            constructor(n) {
                super(), this._lView = n
            }

            onDestroy(n) {
                return Ca(this._lView, n), () => function xu(e, n) {
                    if (null === e[Zn]) return;
                    const t = e[Zn].indexOf(n);
                    -1 !== t && e[Zn].splice(t, 1)
                }(this._lView, n)
            }
        }

        function pS() {
            return new hS(E())
        }

        let pr = (() => {
            class e {
                static#e = this.\u0275prov = te({token: e, providedIn: "root", factory: () => new e})

                constructor() {
                    this.taskId = 0, this.pendingTasks = new Set, this.hasPendingTasks = new fM(!1)
                }

                get _hasPendingTasks() {
                    return this.hasPendingTasks.value
                }

                add() {
                    this._hasPendingTasks || this.hasPendingTasks.next(!0);
                    const t = this.taskId++;
                    return this.pendingTasks.add(t), t
                }

                remove(t) {
                    this.pendingTasks.delete(t), 0 === this.pendingTasks.size && this._hasPendingTasks && this.hasPendingTasks.next(!1)
                }

                ngOnDestroy() {
                    this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1)
                }
            }

            return e
        })();
        const we = class gS extends ln {
            constructor(n = !1) {
                super(), this.destroyRef = void 0, this.pendingTasks = void 0, this.__isAsync = n, function $g() {
                    return void 0 !== Eg() || null != function ST() {
                        return er
                    }()
                }() && (this.destroyRef = L(Mo, {optional: !0}) ?? void 0, this.pendingTasks = L(pr, {optional: !0}) ?? void 0)
            }

            emit(n) {
                const t = X(null);
                try {
                    super.next(n)
                } finally {
                    X(t)
                }
            }

            subscribe(n, t, i) {
                let r = n, o = t || (() => null), s = i;
                if (n && "object" == typeof n) {
                    const l = n;
                    r = l.next?.bind(l), o = l.error?.bind(l), s = l.complete?.bind(l)
                }
                this.__isAsync && (o = this.wrapInTimeout(o), r && (r = this.wrapInTimeout(r)), s && (s = this.wrapInTimeout(s)));
                const a = super.subscribe({next: r, error: o, complete: s});
                return n instanceof Tt && n.add(a), a
            }

            wrapInTimeout(n) {
                return t => {
                    const i = this.pendingTasks?.add();
                    setTimeout(() => {
                        n(t), void 0 !== i && this.pendingTasks?.remove(i)
                    })
                }
            }
        };

        function xa(...e) {
        }

        function zm(e) {
            let n, t;

            function i() {
                e = xa;
                try {
                    void 0 !== t && "function" == typeof cancelAnimationFrame && cancelAnimationFrame(t), void 0 !== n && clearTimeout(n)
                } catch {
                }
            }

            return n = setTimeout(() => {
                e(), i()
            }), "function" == typeof requestAnimationFrame && (t = requestAnimationFrame(() => {
                e(), i()
            })), () => i()
        }

        function Gm(e) {
            return queueMicrotask(() => e()), () => {
                e = xa
            }
        }

        const Ku = "isAngularZone", Ra = Ku + "_ID";
        let mS = 0;

        class ge {
            constructor(n) {
                this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new we(!1), this.onMicrotaskEmpty = new we(!1), this.onStable = new we(!1), this.onError = new we(!1);
                const {
                    enableLongStackTrace: t = !1,
                    shouldCoalesceEventChangeDetection: i = !1,
                    shouldCoalesceRunChangeDetection: r = !1,
                    scheduleInRootZone: o = $m
                } = n;
                if (typeof Zone > "u") throw new S(908, !1);
                Zone.assertZonePatched();
                const s = this;
                s._nesting = 0, s._outer = s._inner = Zone.current, Zone.TaskTrackingZoneSpec && (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)), s.shouldCoalesceEventChangeDetection = !r && i, s.shouldCoalesceRunChangeDetection = r, s.callbackScheduled = !1, s.scheduleInRootZone = o, function yS(e) {
                    const n = () => {
                        !function _S(e) {
                            function n() {
                                zm(() => {
                                    e.callbackScheduled = !1, Ju(e), e.isCheckStableRunning = !0, Xu(e), e.isCheckStableRunning = !1
                                })
                            }

                            e.isCheckStableRunning || e.callbackScheduled || (e.callbackScheduled = !0, e.scheduleInRootZone ? Zone.root.run(() => {
                                n()
                            }) : e._outer.run(() => {
                                n()
                            }), Ju(e))
                        }(e)
                    }, t = mS++;
                    e._inner = e._inner.fork({
                        name: "angular",
                        properties: {[Ku]: !0, [Ra]: t, [Ra + t]: !0},
                        onInvokeTask: (i, r, o, s, a, l) => {
                            if (function CS(e) {
                                return Zm(e, "__ignore_ng_zone__")
                            }(l)) return i.invokeTask(o, s, a, l);
                            try {
                                return qm(e), i.invokeTask(o, s, a, l)
                            } finally {
                                (e.shouldCoalesceEventChangeDetection && "eventTask" === s.type || e.shouldCoalesceRunChangeDetection) && n(), Wm(e)
                            }
                        },
                        onInvoke: (i, r, o, s, a, l, c) => {
                            try {
                                return qm(e), i.invoke(o, s, a, l, c)
                            } finally {
                                e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !function wS(e) {
                                    return Zm(e, "__scheduler_tick__")
                                }(l) && n(), Wm(e)
                            }
                        },
                        onHasTask: (i, r, o, s) => {
                            i.hasTask(o, s), r === o && ("microTask" == s.change ? (e._hasPendingMicrotasks = s.microTask, Ju(e), Xu(e)) : "macroTask" == s.change && (e.hasPendingMacrotasks = s.macroTask))
                        },
                        onHandleError: (i, r, o, s) => (i.handleError(o, s), e.runOutsideAngular(() => e.onError.emit(s)), !1)
                    })
                }(s)
            }

            static isInAngularZone() {
                return typeof Zone < "u" && !0 === Zone.current.get(Ku)
            }

            static assertInAngularZone() {
                if (!ge.isInAngularZone()) throw new S(909, !1)
            }

            static assertNotInAngularZone() {
                if (ge.isInAngularZone()) throw new S(909, !1)
            }

            run(n, t, i) {
                return this._inner.run(n, t, i)
            }

            runTask(n, t, i, r) {
                const o = this._inner, s = o.scheduleEventTask("NgZoneEvent: " + r, n, vS, xa, xa);
                try {
                    return o.runTask(s, t, i)
                } finally {
                    o.cancelTask(s)
                }
            }

            runGuarded(n, t, i) {
                return this._inner.runGuarded(n, t, i)
            }

            runOutsideAngular(n) {
                return this._outer.run(n)
            }
        }

        const vS = {};

        function Xu(e) {
            if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable) try {
                e._nesting++, e.onMicrotaskEmpty.emit(null)
            } finally {
                if (e._nesting--, !e.hasPendingMicrotasks) try {
                    e.runOutsideAngular(() => e.onStable.emit(null))
                } finally {
                    e.isStable = !0
                }
            }
        }

        function Ju(e) {
            e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && !0 === e.callbackScheduled)
        }

        function qm(e) {
            e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
        }

        function Wm(e) {
            e._nesting--, Xu(e)
        }

        class ed {
            constructor() {
                this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new we, this.onMicrotaskEmpty = new we, this.onStable = new we, this.onError = new we
            }

            run(n, t, i) {
                return n.apply(t, i)
            }

            runGuarded(n, t, i) {
                return n.apply(t, i)
            }

            runOutsideAngular(n) {
                return n()
            }

            runTask(n, t, i, r) {
                return n.apply(t, i)
            }
        }

        function Zm(e, n) {
            return !(!Array.isArray(e) || 1 !== e.length) && !0 === e[0]?.data?.[n]
        }

        class vn {
            constructor() {
                this._console = console
            }

            handleError(n) {
                const t = this._findOriginalError(n);
                this._console.error("ERROR", n), t && this._console.error("ORIGINAL ERROR", t)
            }

            _findOriginalError(n) {
                let t = n && Qu(n);
                for (; t && Qu(t);) t = Qu(t);
                return t || null
            }
        }

        const DS = new R("", {
            providedIn: "root", factory: () => {
                const e = L(ge), n = L(vn);
                return t => e.runOutsideAngular(() => n.handleError(t))
            }
        });

        function bS() {
            return gr(pe(), E())
        }

        function gr(e, n) {
            return new dt(ct(e, n))
        }

        let dt = (() => {
            class e {
                static#e = this.__NG_ELEMENT_ID__ = bS

                constructor(t) {
                    this.nativeElement = t
                }
            }

            return e
        })();

        function Qm(e) {
            return e instanceof dt ? e.nativeElement : e
        }

        function IS() {
            return this._results[Symbol.iterator]()
        }

        class td {
            static#e = Symbol.iterator;

            constructor(n = !1) {
                this._emitDistinctChangesOnly = n, this.dirty = !0, this._onDirty = void 0, this._results = [], this._changesDetected = !1, this._changes = void 0, this.length = 0, this.first = void 0, this.last = void 0;
                const t = td.prototype;
                t[Symbol.iterator] || (t[Symbol.iterator] = IS)
            }

            get changes() {
                return this._changes ??= new we
            }

            get(n) {
                return this._results[n]
            }

            map(n) {
                return this._results.map(n)
            }

            filter(n) {
                return this._results.filter(n)
            }

            find(n) {
                return this._results.find(n)
            }

            reduce(n, t) {
                return this._results.reduce(n, t)
            }

            forEach(n) {
                this._results.forEach(n)
            }

            some(n) {
                return this._results.some(n)
            }

            toArray() {
                return this._results.slice()
            }

            toString() {
                return this._results.toString()
            }

            reset(n, t) {
                this.dirty = !1;
                const i = function yt(e) {
                    return e.flat(Number.POSITIVE_INFINITY)
                }(n);
                (this._changesDetected = !function kT(e, n, t) {
                    if (e.length !== n.length) return !1;
                    for (let i = 0; i < e.length; i++) {
                        let r = e[i], o = n[i];
                        if (t && (r = t(r), o = t(o)), o !== r) return !1
                    }
                    return !0
                }(this._results, i, t)) && (this._results = i, this.length = i.length, this.last = i[this.length - 1], this.first = i[0])
            }

            notifyOnChanges() {
                void 0 !== this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
            }

            onDirty(n) {
                this._onDirty = n
            }

            setDirty() {
                this.dirty = !0, this._onDirty?.()
            }

            destroy() {
                void 0 !== this._changes && (this._changes.complete(), this._changes.unsubscribe())
            }
        }

        function So(e) {
            return !(128 & ~e.flags)
        }

        const id = new Map;
        let TS = 0;

        function rd(e) {
            id.delete(e[cr])
        }

        const La = "__ngContext__";

        function ot(e, n) {
            qe(n) ? (e[La] = n[cr], function OS(e) {
                id.set(e[cr], e)
            }(n)) : e[La] = n
        }

        function sv(e) {
            return lv(e[mo])
        }

        function av(e) {
            return lv(e[Kt])
        }

        function lv(e) {
            for (; null !== e && !it(e);) e = e[Kt];
            return e
        }

        let sd;

        function Yn() {
            if (void 0 !== sd) return sd;
            if (typeof document < "u") return document;
            throw new S(210, !1)
        }

        const vr = new R("", {providedIn: "root", factory: () => qS}), qS = "ng", mv = new R(""),
            Mi = new R("", {providedIn: "platform", factory: () => "unknown"}), vv = new R("", {
                providedIn: "root",
                factory: () => Yn().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null
            });
        let _v = () => null;

        function hd(e, n, t = !1) {
            return _v(e, n, t)
        }

        const Mv = new R("", {providedIn: "root", factory: () => !1});
        let $a, za;

        function Cr(e) {
            return function _d() {
                if (void 0 === $a && ($a = null, be.trustedTypes)) try {
                    $a = be.trustedTypes.createPolicy("angular", {
                        createHTML: e => e,
                        createScript: e => e,
                        createScriptURL: e => e
                    })
                } catch {
                }
                return $a
            }()?.createHTML(e) || e
        }

        function Ov(e) {
            return function yd() {
                if (void 0 === za && (za = null, be.trustedTypes)) try {
                    za = be.trustedTypes.createPolicy("angular#unsafe-bypass", {
                        createHTML: e => e,
                        createScript: e => e,
                        createScriptURL: e => e
                    })
                } catch {
                }
                return za
            }()?.createHTML(e) || e
        }

        class xv {
            constructor(n) {
                this.changingThisBreaksApplicationSecurity = n
            }

            toString() {
                return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${hg})`
            }
        }

        function Qn(e) {
            return e instanceof xv ? e.changingThisBreaksApplicationSecurity : e
        }

        function Po(e, n) {
            const t = function dO(e) {
                return e instanceof xv && e.getTypeName() || null
            }(e);
            if (null != t && t !== n) {
                if ("ResourceURL" === t && "URL" === n) return !0;
                throw new Error(`Required a safe ${n}, got a ${t} (see ${hg})`)
            }
            return t === n
        }

        class fO {
            constructor(n) {
                this.inertDocumentHelper = n
            }

            getInertBodyElement(n) {
                n = "<body><remove></remove>" + n;
                try {
                    const t = (new window.DOMParser).parseFromString(Cr(n), "text/html").body;
                    return null === t ? this.inertDocumentHelper.getInertBodyElement(n) : (t.firstChild?.remove(), t)
                } catch {
                    return null
                }
            }
        }

        class hO {
            constructor(n) {
                this.defaultDoc = n, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")
            }

            getInertBodyElement(n) {
                const t = this.inertDocument.createElement("template");
                return t.innerHTML = Cr(n), t
            }
        }

        const gO = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;

        function Cd(e) {
            return (e = String(e)).match(gO) ? e : "unsafe:" + e
        }

        function Rn(e) {
            const n = {};
            for (const t of e.split(",")) n[t] = !0;
            return n
        }

        function ko(...e) {
            const n = {};
            for (const t of e) for (const i in t) t.hasOwnProperty(i) && (n[i] = !0);
            return n
        }

        const Lv = Rn("area,br,col,hr,img,wbr"), Pv = Rn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
            kv = Rn("rp,rt"),
            wd = ko(Lv, ko(Pv, Rn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), ko(kv, Rn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), ko(kv, Pv)),
            Ed = Rn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
            Fv = ko(Ed, Rn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), Rn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
            mO = Rn("script,style,template");

        class vO {
            constructor() {
                this.sanitizedSomething = !1, this.buf = []
            }

            sanitizeChildren(n) {
                let t = n.firstChild, i = !0, r = [];
                for (; t;) if (t.nodeType === Node.ELEMENT_NODE ? i = this.startElement(t) : t.nodeType === Node.TEXT_NODE ? this.chars(t.nodeValue) : this.sanitizedSomething = !0, i && t.firstChild) r.push(t), t = CO(t); else for (; t;) {
                    t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                    let o = yO(t);
                    if (o) {
                        t = o;
                        break
                    }
                    t = r.pop()
                }
                return this.buf.join("")
            }

            startElement(n) {
                const t = Vv(n).toLowerCase();
                if (!wd.hasOwnProperty(t)) return this.sanitizedSomething = !0, !mO.hasOwnProperty(t);
                this.buf.push("<"), this.buf.push(t);
                const i = n.attributes;
                for (let r = 0; r < i.length; r++) {
                    const o = i.item(r), s = o.name, a = s.toLowerCase();
                    if (!Fv.hasOwnProperty(a)) {
                        this.sanitizedSomething = !0;
                        continue
                    }
                    let l = o.value;
                    Ed[a] && (l = Cd(l)), this.buf.push(" ", s, '="', Bv(l), '"')
                }
                return this.buf.push(">"), !0
            }

            endElement(n) {
                const t = Vv(n).toLowerCase();
                wd.hasOwnProperty(t) && !Lv.hasOwnProperty(t) && (this.buf.push("</"), this.buf.push(t), this.buf.push(">"))
            }

            chars(n) {
                this.buf.push(Bv(n))
            }
        }

        function yO(e) {
            const n = e.nextSibling;
            if (n && e !== n.previousSibling) throw Hv(n);
            return n
        }

        function CO(e) {
            const n = e.firstChild;
            if (n && function _O(e, n) {
                return (e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY) !== Node.DOCUMENT_POSITION_CONTAINED_BY
            }(e, n)) throw Hv(n);
            return n
        }

        function Vv(e) {
            const n = e.nodeName;
            return "string" == typeof n ? n : "FORM"
        }

        function Hv(e) {
            return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)
        }

        const wO = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, EO = /([^\#-~ |!])/g;

        function Bv(e) {
            return e.replace(/&/g, "&amp;").replace(wO, function (n) {
                return "&#" + (1024 * (n.charCodeAt(0) - 55296) + (n.charCodeAt(1) - 56320) + 65536) + ";"
            }).replace(EO, function (n) {
                return "&#" + n.charCodeAt(0) + ";"
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        let Ga;

        function Dd(e) {
            return "content" in e && function bO(e) {
                return e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            }(e) ? e.content : null
        }

        var wr = function (e) {
            return e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL", e
        }(wr || {});

        function jv(e) {
            const n = Fo();
            return n ? Ov(n.sanitize(wr.HTML, e) || "") : Po(e, "HTML") ? Ov(Qn(e)) : function DO(e, n) {
                let t = null;
                try {
                    Ga = Ga || function Rv(e) {
                        const n = new hO(e);
                        return function pO() {
                            try {
                                return !!(new window.DOMParser).parseFromString(Cr(""), "text/html")
                            } catch {
                                return !1
                            }
                        }() ? new fO(n) : n
                    }(e);
                    let i = n ? String(n) : "";
                    t = Ga.getInertBodyElement(i);
                    let r = 5, o = i;
                    do {
                        if (0 === r) throw new Error("Failed to sanitize html because the input is unstable");
                        r--, i = o, o = t.innerHTML, t = Ga.getInertBodyElement(i)
                    } while (i !== o);
                    return Cr((new vO).sanitizeChildren(Dd(t) || t))
                } finally {
                    if (t) {
                        const i = Dd(t) || t;
                        for (; i.firstChild;) i.firstChild.remove()
                    }
                }
            }(Yn(), Z(e))
        }

        function Kn(e) {
            const n = Fo();
            return n ? n.sanitize(wr.URL, e) || "" : Po(e, "URL") ? Qn(e) : Cd(Z(e))
        }

        function Fo() {
            const e = E();
            return e && e[dn].sanitizer
        }

        const AO = /^>|^->|<!--|-->|--!>|<!-$/g, xO = /(<|>)/g, RO = "\u200b$1\u200b";

        function Za(e) {
            return e.ownerDocument.defaultView
        }

        var Xn = function (e) {
            return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e
        }(Xn || {});
        let Md;

        function Td(e, n) {
            return Md(e, n)
        }

        function Dr(e, n, t, i, r) {
            if (null != i) {
                let o, s = !1;
                it(i) ? o = i : qe(i) && (s = !0, i = i[Se]);
                const a = le(i);
                0 === e && null !== t ? null == r ? t_(n, t, a) : Si(n, t, a, r || null, !0) : 1 === e && null !== t ? Si(n, t, a, r || null, !0) : 2 === e ? function Ho(e, n, t) {
                    e.removeChild(null, n, t)
                }(n, a, s) : 3 === e && n.destroyNode(a), null != o && function XO(e, n, t, i, r) {
                    const o = t[fn];
                    o !== le(t) && Dr(n, e, i, o, r);
                    for (let a = xe; a < t.length; a++) {
                        const l = t[a];
                        Xa(l[O], l, e, n, i, o)
                    }
                }(n, e, o, t, r)
            }
        }

        function Od(e, n) {
            return e.createComment(function $v(e) {
                return e.replace(AO, n => n.replace(xO, RO))
            }(n))
        }

        function Ya(e, n, t) {
            return e.createElement(n, t)
        }

        function Xv(e, n) {
            n[dn].changeDetectionScheduler?.notify(9), Xa(e, n, n[U], 2, null, null)
        }

        function Jv(e, n) {
            const t = e[ur], i = n[He];
            (qe(i) || n[Oe] !== i[He][Oe]) && (e[k] |= ma.HasTransplantedViews), null === t ? e[ur] = [n] : t.push(n)
        }

        function Nd(e, n) {
            const t = e[ur], i = t.indexOf(n);
            t.splice(i, 1)
        }

        function Vo(e, n) {
            if (e.length <= xe) return;
            const t = xe + n, i = e[t];
            if (i) {
                const r = i[yi];
                null !== r && r !== e && Nd(r, i), n > 0 && (e[t - 1][Kt] = i[Kt]);
                const o = ra(e, xe + n);
                !function zO(e, n) {
                    Xv(e, n), n[Se] = null, n[Xe] = null
                }(i[O], i);
                const s = o[On];
                null !== s && s.detachView(o[O]), i[He] = null, i[Kt] = null, i[k] &= -129
            }
            return i
        }

        function Qa(e, n) {
            if (!(256 & n[k])) {
                const t = n[U];
                t.destroyNode && Xa(e, n, t, 3, null, null), function qO(e) {
                    let n = e[mo];
                    if (!n) return Ad(e[O], e);
                    for (; n;) {
                        let t = null;
                        if (qe(n)) t = n[mo]; else {
                            const i = n[xe];
                            i && (t = i)
                        }
                        if (!t) {
                            for (; n && !n[Kt] && n !== e;) qe(n) && Ad(n[O], n), n = n[He];
                            null === n && (n = e), qe(n) && Ad(n[O], n), t = n && n[Kt]
                        }
                        n = t
                    }
                }(n)
            }
        }

        function Ad(e, n) {
            if (256 & n[k]) return;
            const t = X(null);
            try {
                n[k] &= -129, n[k] |= 256, n[Bt] && Oc(n[Bt]), function YO(e, n) {
                    let t;
                    if (null != e && null != (t = e.destroyHooks)) for (let i = 0; i < t.length; i += 2) {
                        const r = n[t[i]];
                        if (!(r instanceof Do)) {
                            const o = t[i + 1];
                            if (Array.isArray(o)) for (let s = 0; s < o.length; s += 2) {
                                const a = r[o[s]], l = o[s + 1];
                                pn(4, a, l);
                                try {
                                    l.call(a)
                                } finally {
                                    pn(5, a, l)
                                }
                            } else {
                                pn(4, r, o);
                                try {
                                    o.call(r)
                                } finally {
                                    pn(5, r, o)
                                }
                            }
                        }
                    }
                }(e, n), function ZO(e, n) {
                    const t = e.cleanup, i = n[sr];
                    if (null !== t) for (let o = 0; o < t.length - 1; o += 2) if ("string" == typeof t[o]) {
                        const s = t[o + 3];
                        s >= 0 ? i[s]() : i[-s].unsubscribe(), o += 2
                    } else t[o].call(i[t[o + 1]]);
                    null !== i && (n[sr] = null);
                    const r = n[Zn];
                    if (null !== r) {
                        n[Zn] = null;
                        for (let o = 0; o < r.length; o++) (0, r[o])()
                    }
                }(e, n), 1 === n[O].type && n[U].destroy();
                const i = n[yi];
                if (null !== i && it(n[He])) {
                    i !== n[He] && Nd(i, n);
                    const r = n[On];
                    null !== r && r.detachView(e)
                }
                rd(n)
            } finally {
                X(t)
            }
        }

        function xd(e, n, t) {
            return function e_(e, n, t) {
                let i = n;
                for (; null !== i && 168 & i.type;) i = (n = i).parent;
                if (null === i) return t[Se];
                {
                    const {componentOffset: r} = i;
                    if (r > -1) {
                        const {encapsulation: o} = e.data[i.directiveStart + r];
                        if (o === Wt.None || o === Wt.Emulated) return null
                    }
                    return ct(i, t)
                }
            }(e, n.parent, t)
        }

        function Si(e, n, t, i, r) {
            e.insertBefore(n, t, i, r)
        }

        function t_(e, n, t) {
            e.appendChild(n, t)
        }

        function n_(e, n, t, i, r) {
            null !== i ? Si(e, n, t, i, r) : t_(e, n, t)
        }

        function Rd(e, n) {
            return e.parentNode(n)
        }

        let Ld, o_ = function r_(e, n, t) {
            return 40 & e.type ? ct(e, t) : null
        };

        function Ka(e, n, t, i) {
            const r = xd(e, i, n), o = n[U], a = function i_(e, n, t) {
                return o_(e, n, t)
            }(i.parent || n[Xe], i, n);
            if (null != r) if (Array.isArray(t)) for (let l = 0; l < t.length; l++) n_(o, r, t[l], a, !1); else n_(o, r, t, a, !1);
            void 0 !== Ld && Ld(o, i, n, t, r)
        }

        function Oi(e, n) {
            if (null !== n) {
                const t = n.type;
                if (3 & t) return ct(n, e);
                if (4 & t) return Pd(-1, e[n.index]);
                if (8 & t) {
                    const i = n.child;
                    if (null !== i) return Oi(e, i);
                    {
                        const r = e[n.index];
                        return it(r) ? Pd(-1, r) : le(r)
                    }
                }
                if (128 & t) return Oi(e, n.next);
                if (32 & t) return Td(n, e)() || le(e[n.index]);
                {
                    const i = a_(e, n);
                    return null !== i ? Array.isArray(i) ? i[0] : Oi(Nn(e[Oe]), i) : Oi(e, n.next)
                }
            }
            return null
        }

        function a_(e, n) {
            return null !== n ? e[Oe][Xe].projection[n.projection] : null
        }

        function Pd(e, n) {
            const t = xe + e + 1;
            if (t < n.length) {
                const i = n[t], r = i[O].firstChild;
                if (null !== r) return Oi(i, r)
            }
            return n[fn]
        }

        function kd(e, n, t, i, r, o, s) {
            for (; null != t;) {
                if (128 === t.type) {
                    t = t.next;
                    continue
                }
                const a = i[t.index], l = t.type;
                if (s && 0 === n && (a && ot(le(a), i), t.flags |= 2), 32 & ~t.flags) if (8 & l) kd(e, n, t.child, i, r, o, !1), Dr(n, e, r, a, o); else if (32 & l) {
                    const c = Td(t, i);
                    let u;
                    for (; u = c();) Dr(n, e, r, u, o);
                    Dr(n, e, r, a, o)
                } else 16 & l ? c_(e, n, i, t, r, o) : Dr(n, e, r, a, o);
                t = s ? t.projectionNext : t.next
            }
        }

        function Xa(e, n, t, i, r, o) {
            kd(t, i, e.firstChild, n, r, o, !1)
        }

        function c_(e, n, t, i, r, o) {
            const s = t[Oe], l = s[Xe].projection[i.projection];
            if (Array.isArray(l)) for (let c = 0; c < l.length; c++) Dr(n, e, r, l[c], o); else {
                let c = l;
                const u = s[He];
                So(i) && (c.flags |= 128), kd(e, n, c, u, r, o, !0)
            }
        }

        function u_(e, n, t) {
            "" === t ? e.removeAttribute(n, "class") : e.setAttribute(n, "class", t)
        }

        function d_(e, n, t) {
            const {mergedAttrs: i, classes: r, styles: o} = t;
            null !== i && hu(e, n, i), null !== r && u_(e, n, r), null !== o && function eN(e, n, t) {
                e.setAttribute(n, "style", t)
            }(e, n, o)
        }

        const Y = {};

        function f(e = 1) {
            f_(J(), E(), Je() + e, !1)
        }

        function f_(e, n, t, i) {
            if (!i) if (3 & ~n[k]) {
                const o = e.preOrderHooks;
                null !== o && Ia(n, o, 0, t)
            } else {
                const o = e.preOrderCheckHooks;
                null !== o && ba(n, o, t)
            }
            Di(t)
        }

        function M(e, n = re.Default) {
            const t = E();
            return null === t ? oe(e, n) : Am(pe(), t, j(e), n)
        }

        function h_(e, n, t, i, r, o) {
            const s = X(null);
            try {
                let a = null;
                r & qn.SignalBased && (a = n[i][qt]), null !== a && void 0 !== a.transformFn && (o = a.transformFn(o)), r & qn.HasDecoratorInputTransform && (o = e.inputTransforms[i].call(n, o)), null !== e.setInput ? e.setInput(n, a, o, t, i) : Kg(n, a, i, o)
            } finally {
                X(s)
            }
        }

        function Ja(e, n, t, i, r, o, s, a, l, c, u) {
            const d = n.blueprint.slice();
            return d[Se] = r, d[k] = 204 | i, (null !== c || e && 2048 & e[k]) && (d[k] |= 2048), im(d), d[He] = d[ar] = e, d[ye] = t, d[dn] = s || e && e[dn], d[U] = a || e && e[U], d[Be] = l || e && e[Be] || null, d[Xe] = o, d[cr] = function SS() {
                return TS++
            }(), d[lt] = u, d[qg] = c, d[Oe] = 2 == n.type ? e[Oe] : d, d
        }

        function Ni(e, n, t, i, r) {
            let o = e.data[n];
            if (null === o) o = function Fd(e, n, t, i, r) {
                const o = lm(), s = Lu(), l = e.data[n] = function cN(e, n, t, i, r, o) {
                    let s = n ? n.injectorIndex : -1, a = 0;
                    return function Ei() {
                        return null !== $.skipHydrationRootTNode
                    }() && (a |= 128), {
                        type: t,
                        index: i,
                        insertBeforeIndex: null,
                        injectorIndex: s,
                        directiveStart: -1,
                        directiveEnd: -1,
                        directiveStylingLast: -1,
                        componentOffset: -1,
                        propertyBindings: null,
                        flags: a,
                        providerIndexes: 0,
                        value: r,
                        attrs: o,
                        mergedAttrs: null,
                        localNames: null,
                        initialInputs: void 0,
                        inputs: null,
                        outputs: null,
                        tView: null,
                        next: null,
                        prev: null,
                        projectionNext: null,
                        child: null,
                        parent: n,
                        projection: null,
                        styles: null,
                        stylesWithoutHost: null,
                        residualStyles: void 0,
                        classes: null,
                        classesWithoutHost: null,
                        residualClasses: void 0,
                        classBindings: 0,
                        styleBindings: 0
                    }
                }(0, s ? o : o && o.parent, t, n, i, r);
                return null === e.firstChild && (e.firstChild = l), null !== o && (s ? null == o.child && null !== l.parent && (o.child = l) : null === o.next && (o.next = l, l.prev = o)), l
            }(e, n, t, i, r), function k0() {
                return $.lFrame.inI18n
            }() && (o.flags |= 32); else if (64 & o.type) {
                o.type = t, o.value = i, o.attrs = r;
                const s = function wo() {
                    const e = $.lFrame, n = e.currentTNode;
                    return e.isParent ? n : n.parent
                }();
                o.injectorIndex = null === s ? -1 : s.injectorIndex
            }
            return Jt(o, !0), o
        }

        function Bo(e, n, t, i) {
            if (0 === t) return -1;
            const r = n.length;
            for (let o = 0; o < t; o++) n.push(i), e.blueprint.push(i), e.data.push(null);
            return r
        }

        function p_(e, n, t, i, r) {
            const o = Je(), s = 2 & i;
            try {
                Di(-1), s && n.length > P && f_(e, n, P, !1), pn(s ? 2 : 0, r), t(i, r)
            } finally {
                Di(o), pn(s ? 3 : 1, r)
            }
        }

        function Vd(e, n, t) {
            if (Iu(n)) {
                const i = X(null);
                try {
                    const o = n.directiveEnd;
                    for (let s = n.directiveStart; s < o; s++) {
                        const a = e.data[s];
                        a.contentQueries && a.contentQueries(1, t[s], s)
                    }
                } finally {
                    X(i)
                }
            }
        }

        function Hd(e, n, t) {
            am() && (function mN(e, n, t, i) {
                const r = t.directiveStart, o = t.directiveEnd;
                Ci(t) && function DN(e, n, t) {
                    const i = ct(n, e), r = g_(t);
                    let s = 16;
                    t.signals ? s = 4096 : t.onPush && (s = 64);
                    const a = el(e, Ja(e, r, null, s, i, n, null, e[dn].rendererFactory.createRenderer(i, t), null, null, null));
                    e[n.index] = a
                }(n, t, e.data[r + t.componentOffset]), e.firstCreatePass || Ta(t, n), ot(i, n);
                const s = t.initialInputs;
                for (let a = r; a < o; a++) {
                    const l = e.data[a], c = Ii(n, e, a, t);
                    ot(c, n), null !== s && bN(0, a - r, c, l, 0, s), Xt(l) && (xt(t.index, n)[ye] = Ii(n, e, a, t))
                }
            }(e, n, t, ct(t, n)), !(64 & ~t.flags) && C_(e, n, t))
        }

        function Bd(e, n, t = ct) {
            const i = n.localNames;
            if (null !== i) {
                let r = n.index + 1;
                for (let o = 0; o < i.length; o += 2) {
                    const s = i[o + 1], a = -1 === s ? t(n, e) : e[s];
                    e[r++] = a
                }
            }
        }

        function g_(e) {
            const n = e.tView;
            return null === n || n.incompleteFirstPass ? e.tView = jd(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : n
        }

        function jd(e, n, t, i, r, o, s, a, l, c, u) {
            const d = P + i, h = d + r, p = function iN(e, n) {
                const t = [];
                for (let i = 0; i < n; i++) t.push(i < e ? null : Y);
                return t
            }(d, h), g = "function" == typeof c ? c() : c;
            return p[O] = {
                type: e,
                blueprint: p,
                template: t,
                queries: null,
                viewQuery: a,
                declTNode: n,
                data: p.slice().fill(null, d),
                bindingStartIndex: d,
                expandoStartIndex: h,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof o ? o() : o,
                pipeRegistry: "function" == typeof s ? s() : s,
                firstChild: null,
                schemas: l,
                consts: g,
                incompleteFirstPass: !1,
                ssrId: u
            }
        }

        let m_ = () => null;

        function v_(e, n, t, i, r) {
            for (let o in n) {
                if (!n.hasOwnProperty(o)) continue;
                const s = n[o];
                if (void 0 === s) continue;
                i ??= {};
                let a, l = qn.None;
                Array.isArray(s) ? (a = s[0], l = s[1]) : a = s;
                let c = o;
                if (null !== r) {
                    if (!r.hasOwnProperty(o)) continue;
                    c = r[o]
                }
                0 === e ? __(i, t, c, a, l) : __(i, t, c, a)
            }
            return i
        }

        function __(e, n, t, i, r) {
            let o;
            e.hasOwnProperty(t) ? (o = e[t]).push(n, i) : o = e[t] = [n, i], void 0 !== r && o.push(r)
        }

        function Et(e, n, t, i, r, o, s, a) {
            const l = ct(n, t);
            let u, c = n.inputs;
            !a && null != c && (u = c[i]) ? (qd(e, t, u, i, r), Ci(n) && function fN(e, n) {
                const t = xt(n, e);
                16 & t[k] || (t[k] |= 64)
            }(t, n.index)) : 3 & n.type && (i = function dN(e) {
                return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
            }(i), r = null != s ? s(r, n.value || "", i) : r, o.setProperty(l, i, r))
        }

        function Ud(e, n, t, i) {
            if (am()) {
                const r = null === i ? null : {"": -1}, o = function _N(e, n) {
                    const t = e.directiveRegistry;
                    let i = null, r = null;
                    if (t) for (let o = 0; o < t.length; o++) {
                        const s = t[o];
                        if (Lg(n, s.selectors, !1)) if (i || (i = []), Xt(s)) if (null !== s.findHostDirectiveDefs) {
                            const a = [];
                            r = r || new Map, s.findHostDirectiveDefs(s, a, r), i.unshift(...a, s), $d(e, n, a.length)
                        } else i.unshift(s), $d(e, n, 0); else r = r || new Map, s.findHostDirectiveDefs?.(s, i, r), i.push(s)
                    }
                    return null === i ? null : [i, r]
                }(e, t);
                let s, a;
                null === o ? s = a = null : [s, a] = o, null !== s && y_(e, n, t, s, r, a), r && function yN(e, n, t) {
                    if (n) {
                        const i = e.localNames = [];
                        for (let r = 0; r < n.length; r += 2) {
                            const o = t[n[r + 1]];
                            if (null == o) throw new S(-301, !1);
                            i.push(n[r], o)
                        }
                    }
                }(t, i, r)
            }
            t.mergedAttrs = po(t.mergedAttrs, t.attrs)
        }

        function y_(e, n, t, i, r, o) {
            for (let c = 0; c < i.length; c++) Wu(Ta(t, n), e, i[c].type);
            !function wN(e, n, t) {
                e.flags |= 1, e.directiveStart = n, e.directiveEnd = n + t, e.providerIndexes = n
            }(t, e.data.length, i.length);
            for (let c = 0; c < i.length; c++) {
                const u = i[c];
                u.providersResolver && u.providersResolver(u)
            }
            let s = !1, a = !1, l = Bo(e, n, i.length, null);
            for (let c = 0; c < i.length; c++) {
                const u = i[c];
                t.mergedAttrs = po(t.mergedAttrs, u.hostAttrs), EN(e, t, n, l, u), CN(l, u, r), null !== u.contentQueries && (t.flags |= 4), (null !== u.hostBindings || null !== u.hostAttrs || 0 !== u.hostVars) && (t.flags |= 64);
                const d = u.type.prototype;
                !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ??= []).push(t.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(t.index), a = !0), l++
            }
            !function uN(e, n, t) {
                const r = n.directiveEnd, o = e.data, s = n.attrs, a = [];
                let l = null, c = null;
                for (let u = n.directiveStart; u < r; u++) {
                    const d = o[u], h = t ? t.get(d) : null, g = h ? h.outputs : null;
                    l = v_(0, d.inputs, u, l, h ? h.inputs : null), c = v_(1, d.outputs, u, c, g);
                    const C = null === l || null === s || pu(n) ? null : IN(l, u, s);
                    a.push(C)
                }
                null !== l && (l.hasOwnProperty("class") && (n.flags |= 8), l.hasOwnProperty("style") && (n.flags |= 16)), n.initialInputs = a, n.inputs = l, n.outputs = c
            }(e, t, o)
        }

        function C_(e, n, t) {
            const i = t.directiveStart, r = t.directiveEnd, o = t.index, s = function V0() {
                return $.lFrame.currentDirectiveIndex
            }();
            try {
                Di(o);
                for (let a = i; a < r; a++) {
                    const l = e.data[a], c = n[a];
                    ku(a), (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && vN(l, c)
                }
            } finally {
                Di(-1), ku(s)
            }
        }

        function vN(e, n) {
            null !== e.hostBindings && e.hostBindings(1, n)
        }

        function $d(e, n, t) {
            n.componentOffset = t, (e.components ??= []).push(n.index)
        }

        function CN(e, n, t) {
            if (t) {
                if (n.exportAs) for (let i = 0; i < n.exportAs.length; i++) t[n.exportAs[i]] = e;
                Xt(n) && (t[""] = e)
            }
        }

        function EN(e, n, t, i, r) {
            e.data[i] = r;
            const o = r.factory || (r.factory = mi(r.type)), s = new Do(o, Xt(r), M);
            e.blueprint[i] = s, t[i] = s, function pN(e, n, t, i, r) {
                const o = r.hostBindings;
                if (o) {
                    let s = e.hostBindingOpCodes;
                    null === s && (s = e.hostBindingOpCodes = []);
                    const a = ~n.index;
                    (function gN(e) {
                        let n = e.length;
                        for (; n > 0;) {
                            const t = e[--n];
                            if ("number" == typeof t && t < 0) return t
                        }
                        return 0
                    })(s) != a && s.push(a), s.push(t, i, o)
                }
            }(e, n, i, Bo(e, t, r.hostVars, Y), r)
        }

        function _n(e, n, t, i, r, o) {
            const s = ct(e, n);
            !function zd(e, n, t, i, r, o, s) {
                if (null == o) e.removeAttribute(n, r, t); else {
                    const a = null == s ? Z(o) : s(o, i || "", r);
                    e.setAttribute(n, r, a, t)
                }
            }(n[U], s, o, e.value, t, i, r)
        }

        function bN(e, n, t, i, r, o) {
            const s = o[n];
            if (null !== s) for (let a = 0; a < s.length;) h_(i, t, s[a++], s[a++], s[a++], s[a++])
        }

        function IN(e, n, t) {
            let i = null, r = 0;
            for (; r < t.length;) {
                const o = t[r];
                if (0 !== o) if (5 !== o) {
                    if ("number" == typeof o) break;
                    if (e.hasOwnProperty(o)) {
                        null === i && (i = []);
                        const s = e[o];
                        for (let a = 0; a < s.length; a += 3) if (s[a] === n) {
                            i.push(o, s[a + 1], s[a + 2], t[r + 1]);
                            break
                        }
                    }
                    r += 2
                } else r += 2; else r += 4
            }
            return i
        }

        function w_(e, n, t, i) {
            return [e, !0, 0, n, null, i, null, t, null, null]
        }

        function E_(e, n) {
            const t = e.contentQueries;
            if (null !== t) {
                const i = X(null);
                try {
                    for (let r = 0; r < t.length; r += 2) {
                        const s = t[r + 1];
                        if (-1 !== s) {
                            const a = e.data[s];
                            Ea(t[r]), a.contentQueries(2, n[s], s)
                        }
                    }
                } finally {
                    X(i)
                }
            }
        }

        function el(e, n) {
            return e[mo] ? e[Gg][Kt] = n : e[mo] = n, e[Gg] = n, n
        }

        function Gd(e, n, t) {
            Ea(0);
            const i = X(null);
            try {
                n(e, t)
            } finally {
                X(i)
            }
        }

        function D_(e) {
            return e[sr] ??= []
        }

        function b_(e) {
            return e.cleanup ??= []
        }

        function tl(e, n) {
            const t = e[Be], i = t ? t.get(vn, null) : null;
            i && i.handleError(n)
        }

        function qd(e, n, t, i, r) {
            for (let o = 0; o < t.length;) {
                const s = t[o++], a = t[o++], l = t[o++];
                h_(e.data[s], n[s], i, a, l, r)
            }
        }

        function MN(e, n) {
            const t = xt(n, e), i = t[O];
            !function TN(e, n) {
                for (let t = n.length; t < e.blueprint.length; t++) n.push(e.blueprint[t])
            }(i, t);
            const r = t[Se];
            null !== r && null === t[lt] && (t[lt] = hd(r, t[Be])), Wd(i, t, t[ye])
        }

        function Wd(e, n, t) {
            Hu(n);
            try {
                const i = e.viewQuery;
                null !== i && Gd(1, i, t);
                const r = e.template;
                null !== r && p_(e, n, r, 1, t), e.firstCreatePass && (e.firstCreatePass = !1), n[On]?.finishViewCreation(e), e.staticContentQueries && E_(e, n), e.staticViewQueries && Gd(2, e.viewQuery, t);
                const o = e.components;
                null !== o && function SN(e, n) {
                    for (let t = 0; t < n.length; t++) MN(e, n[t])
                }(n, o)
            } catch (i) {
                throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), i
            } finally {
                n[k] &= -5, Bu()
            }
        }

        function Ai(e, n) {
            return !n || null === n.firstChild || So(e)
        }

        function jo(e, n, t, i, r = !1) {
            for (; null !== t;) {
                if (128 === t.type) {
                    t = r ? t.projectionNext : t.next;
                    continue
                }
                const o = n[t.index];
                null !== o && i.push(le(o)), it(o) && T_(o, i);
                const s = t.type;
                if (8 & s) jo(e, n, t.child, i); else if (32 & s) {
                    const a = Td(t, n);
                    let l;
                    for (; l = a();) i.push(l)
                } else if (16 & s) {
                    const a = a_(n, t);
                    if (Array.isArray(a)) i.push(...a); else {
                        const l = Nn(n[Oe]);
                        jo(l[O], l, a, i, !0)
                    }
                }
                t = r ? t.projectionNext : t.next
            }
            return i
        }

        function T_(e, n) {
            for (let t = xe; t < e.length; t++) {
                const i = e[t], r = i[O].firstChild;
                null !== r && jo(i[O], i, r, n)
            }
            e[fn] !== e[Se] && n.push(e[fn])
        }

        let S_ = [];
        const xN = {
            ...Vs, consumerIsAlwaysLive: !0, consumerMarkedDirty: e => {
                ya(e.lView)
            }, consumerOnSignalRead() {
                this.lView[Bt] = this
            }
        }, LN = {
            ...Vs, consumerIsAlwaysLive: !0, consumerMarkedDirty: e => {
                let n = Nn(e.lView);
                for (; n && !O_(n[O]);) n = Nn(n);
                n && rm(n)
            }, consumerOnSignalRead() {
                this.lView[Bt] = this
            }
        };

        function O_(e) {
            return 2 !== e.type
        }

        const PN = 100;

        function nl(e, n = !0, t = 0) {
            const i = e[dn], r = i.rendererFactory;
            r.begin?.();
            try {
                !function kN(e, n) {
                    const t = dm();
                    try {
                        fm(!0), Yd(e, n);
                        let i = 0;
                        for (; _a(e);) {
                            if (i === PN) throw new S(103, !1);
                            i++, Yd(e, 1)
                        }
                    } finally {
                        fm(t)
                    }
                }(e, t)
            } catch (s) {
                throw n && tl(e, s), s
            } finally {
                r.end?.(), i.inlineEffectRunner?.flush()
            }
        }

        function FN(e, n, t, i) {
            const r = n[k];
            if (!(256 & ~r)) return;
            n[dn].inlineEffectRunner?.flush(), Hu(n);
            let a = !0, l = null, c = null;
            O_(e) ? (c = function ON(e) {
                return e[Bt] ?? function NN(e) {
                    const n = S_.pop() ?? Object.create(xN);
                    return n.lView = e, n
                }(e)
            }(n), l = Hs(c)) : null === function Tp() {
                return Ae
            }() ? (a = !1, c = function RN(e) {
                const n = e[Bt] ?? Object.create(LN);
                return n.lView = e, n
            }(n), l = Hs(c)) : n[Bt] && (Oc(n[Bt]), n[Bt] = null);
            try {
                im(n), function hm(e) {
                    return $.lFrame.bindingIndex = e
                }(e.bindingStartIndex), null !== t && p_(e, n, t, 2, i);
                const u = !(3 & ~r);
                if (u) {
                    const p = e.preOrderCheckHooks;
                    null !== p && ba(n, p, null)
                } else {
                    const p = e.preOrderHooks;
                    null !== p && Ia(n, p, 0, null), ju(n, 0)
                }
                if (function VN(e) {
                    for (let n = sv(e); null !== n; n = av(n)) {
                        if (!(n[k] & ma.HasTransplantedViews)) continue;
                        const t = n[ur];
                        for (let i = 0; i < t.length; i++) rm(t[i])
                    }
                }(n), A_(n, 0), null !== e.contentQueries && E_(e, n), u) {
                    const p = e.contentCheckHooks;
                    null !== p && ba(n, p)
                } else {
                    const p = e.contentHooks;
                    null !== p && Ia(n, p, 1), ju(n, 1)
                }
                !function nN(e, n) {
                    const t = e.hostBindingOpCodes;
                    if (null !== t) try {
                        for (let i = 0; i < t.length; i++) {
                            const r = t[i];
                            if (r < 0) Di(~r); else {
                                const o = r, s = t[++i], a = t[++i];
                                F0(s, o), a(2, n[o])
                            }
                        }
                    } finally {
                        Di(-1)
                    }
                }(e, n);
                const d = e.components;
                null !== d && R_(n, d, 0);
                const h = e.viewQuery;
                if (null !== h && Gd(2, h, i), u) {
                    const p = e.viewCheckHooks;
                    null !== p && ba(n, p)
                } else {
                    const p = e.viewHooks;
                    null !== p && Ia(n, p, 2), ju(n, 2)
                }
                if (!0 === e.firstUpdatePass && (e.firstUpdatePass = !1), n[pa]) {
                    for (const p of n[pa]) p();
                    n[pa] = null
                }
                n[k] &= -73
            } catch (u) {
                throw ya(n), u
            } finally {
                null !== c && (Tc(c, l), a && function AN(e) {
                    e.lView[Bt] !== e && (e.lView = null, S_.push(e))
                }(c)), Bu()
            }
        }

        function A_(e, n) {
            for (let t = sv(e); null !== t; t = av(t)) for (let i = xe; i < t.length; i++) x_(t[i], n)
        }

        function HN(e, n, t) {
            x_(xt(n, e), t)
        }

        function x_(e, n) {
            Nu(e) && Yd(e, n)
        }

        function Yd(e, n) {
            const i = e[O], r = e[k], o = e[Bt];
            let s = !!(0 === n && 16 & r);
            if (s ||= !!(64 & r && 0 === n), s ||= !!(1024 & r), s ||= !(!o?.dirty || !Sc(o)), s ||= !1, o && (o.dirty = !1), e[k] &= -9217, s) FN(i, e, i.template, e[ye]); else if (8192 & r) {
                A_(e, 1);
                const a = i.components;
                null !== a && R_(e, a, 1)
            }
        }

        function R_(e, n, t) {
            for (let i = 0; i < n.length; i++) HN(e, n[i], t)
        }

        function Uo(e, n) {
            const t = dm() ? 64 : 1088;
            for (e[dn].changeDetectionScheduler?.notify(n); e;) {
                e[k] |= t;
                const i = Nn(e);
                if (_o(e) && !i) return e;
                e = i
            }
            return null
        }

        class $o {
            constructor(n, t, i = !0) {
                this._lView = n, this._cdRefInjectingView = t, this.notifyErrorHandler = i, this._appRef = null, this._attachedToViewContainer = !1
            }

            get rootNodes() {
                const n = this._lView, t = n[O];
                return jo(t, n, t.firstChild, [])
            }

            get context() {
                return this._lView[ye]
            }

            set context(n) {
                this._lView[ye] = n
            }

            get destroyed() {
                return !(256 & ~this._lView[k])
            }

            destroy() {
                if (this._appRef) this._appRef.detachView(this); else if (this._attachedToViewContainer) {
                    const n = this._lView[He];
                    if (it(n)) {
                        const t = n[8], i = t ? t.indexOf(this) : -1;
                        i > -1 && (Vo(n, i), ra(t, i))
                    }
                    this._attachedToViewContainer = !1
                }
                Qa(this._lView[O], this._lView)
            }

            onDestroy(n) {
                Ca(this._lView, n)
            }

            markForCheck() {
                Uo(this._cdRefInjectingView || this._lView, 4)
            }

            detach() {
                this._lView[k] &= -129
            }

            reattach() {
                Au(this._lView), this._lView[k] |= 128
            }

            detectChanges() {
                this._lView[k] |= 1024, nl(this._lView, this.notifyErrorHandler)
            }

            checkNoChanges() {
            }

            attachToViewContainerRef() {
                if (this._appRef) throw new S(902, !1);
                this._attachedToViewContainer = !0
            }

            detachFromAppRef() {
                this._appRef = null;
                const n = _o(this._lView), t = this._lView[yi];
                null !== t && !n && Nd(t, this._lView), Xv(this._lView[O], this._lView)
            }

            attachToAppRef(n) {
                if (this._attachedToViewContainer) throw new S(902, !1);
                this._appRef = n;
                const t = _o(this._lView), i = this._lView[yi];
                null !== i && !t && Jv(i, this._lView), Au(this._lView)
            }
        }

        let Pn = (() => {
            class e {
                static#e = this.__NG_ELEMENT_ID__ = UN
            }

            return e
        })();
        const BN = Pn, jN = class extends BN {
            constructor(n, t, i) {
                super(), this._declarationLView = n, this._declarationTContainer = t, this.elementRef = i
            }

            get ssrId() {
                return this._declarationTContainer.tView?.ssrId || null
            }

            createEmbeddedView(n, t) {
                return this.createEmbeddedViewImpl(n, t)
            }

            createEmbeddedViewImpl(n, t, i) {
                const r = function br(e, n, t, i) {
                    const r = X(null);
                    try {
                        const o = n.tView,
                            l = Ja(e, o, t, 4096 & e[k] ? 4096 : 16, null, n, null, null, i?.injector ?? null, i?.embeddedViewInjector ?? null, i?.dehydratedView ?? null);
                        l[yi] = e[n.index];
                        const u = e[On];
                        return null !== u && (l[On] = u.createEmbeddedView(o)), Wd(o, l, t), l
                    } finally {
                        X(r)
                    }
                }(this._declarationLView, this._declarationTContainer, n, {embeddedViewInjector: t, dehydratedView: i});
                return new $o(r)
            }
        };

        function UN() {
            return il(pe(), E())
        }

        function il(e, n) {
            return 4 & e.type ? new jN(n, e, gr(e, n)) : null
        }

        class Tr {
        }

        const Ko = new R("", {providedIn: "root", factory: () => !1}), ty = new R(""), af = new R("");

        class LA {
        }

        class ny {
        }

        class kA {
            resolveComponentFactory(n) {
                throw function PA(e) {
                    const n = Error(`No component factory found for ${$e(e)}.`);
                    return n.ngComponent = e, n
                }(n)
            }
        }

        class cl {
            static#e = this.NULL = new kA
        }

        class lf {
        }

        let tn = (() => {
            class e {
                static#e = this.__NG_ELEMENT_ID__ = () => function FA() {
                    const e = E(), t = xt(pe().index, e);
                    return (qe(t) ? t : e)[U]
                }()

                constructor() {
                    this.destroyNode = null
                }
            }

            return e
        })(), VA = (() => {
            class e {
                static#e = this.\u0275prov = te({token: e, providedIn: "root", factory: () => null})
            }

            return e
        })();

        function dl(e, n, t) {
            let i = t ? e.styles : null, r = t ? e.classes : null, o = 0;
            if (null !== n) for (let s = 0; s < n.length; s++) {
                const a = n[s];
                "number" == typeof a ? o = a : 1 == o ? r = Yc(r, a) : 2 == o && (i = Yc(i, a + ": " + n[++s] + ";"))
            }
            t ? e.styles = i : e.stylesWithoutHost = i, t ? e.classes = r : e.classesWithoutHost = r
        }

        class sy extends cl {
            constructor(n) {
                super(), this.ngModule = n
            }

            resolveComponentFactory(n) {
                const t = ee(n);
                return new es(t, this.ngModule)
            }
        }

        function ay(e, n) {
            const t = [];
            for (const i in e) {
                if (!e.hasOwnProperty(i)) continue;
                const r = e[i];
                if (void 0 === r) continue;
                const o = Array.isArray(r), s = o ? r[0] : r;
                t.push(n ? {
                    propName: s,
                    templateName: i,
                    isSignal: !!((o ? r[1] : qn.None) & qn.SignalBased)
                } : {propName: s, templateName: i})
            }
            return t
        }

        class es extends ny {
            constructor(n, t) {
                super(), this.componentDef = n, this.ngModule = t, this.componentType = n.type, this.selector = function WT(e) {
                    return e.map(qT).join(",")
                }(n.selectors), this.ngContentSelectors = n.ngContentSelectors ? n.ngContentSelectors : [], this.isBoundToModule = !!t
            }

            get inputs() {
                const n = this.componentDef, t = n.inputTransforms, i = ay(n.inputs, !0);
                if (null !== t) for (const r of i) t.hasOwnProperty(r.propName) && (r.transform = t[r.propName]);
                return i
            }

            get outputs() {
                return ay(this.componentDef.outputs, !1)
            }

            create(n, t, i, r) {
                const o = X(null);
                try {
                    let s = (r = r || this.ngModule) instanceof Qt ? r : r?.injector;
                    s && null !== this.componentDef.getStandaloneInjector && (s = this.componentDef.getStandaloneInjector(s) || s);
                    const a = s ? new bi(n, s) : n, l = a.get(lf, null);
                    if (null === l) throw new S(407, !1);
                    const d = {
                            rendererFactory: l,
                            sanitizer: a.get(VA, null),
                            inlineEffectRunner: null,
                            changeDetectionScheduler: a.get(Tr, null)
                        }, h = l.createRenderer(null, this.componentDef), p = this.componentDef.selectors[0][0] || "div",
                        g = i ? function rN(e, n, t, i) {
                            const o = i.get(Mv, !1) || t === Wt.ShadowDom, s = e.selectRootElement(n, o);
                            return function oN(e) {
                                m_(e)
                            }(s), s
                        }(h, i, this.componentDef.encapsulation, a) : Ya(h, p, function jA(e) {
                            const n = e.toLowerCase();
                            return "svg" === n ? "svg" : "math" === n ? "math" : null
                        }(p));
                    let C = 512;
                    this.componentDef.signals ? C |= 4096 : this.componentDef.onPush || (C |= 16);
                    let D = null;
                    null !== g && (D = hd(g, a, !0));
                    const T = jd(0, null, null, 1, 0, null, null, null, null, null, null),
                        w = Ja(null, T, null, C, null, null, d, h, a, null, D);
                    Hu(w);
                    let V, Q, se = null;
                    try {
                        const Te = this.componentDef;
                        let Mt, oo = null;
                        Te.findHostDirectiveDefs ? (Mt = [], oo = new Map, Te.findHostDirectiveDefs(Te, Mt, oo), Mt.push(Te)) : Mt = [Te];
                        const $I = function $A(e, n) {
                            const t = e[O], i = P;
                            return e[i] = n, Ni(t, i, 2, "#host", null)
                        }(w, g);
                        se = function zA(e, n, t, i, r, o, s) {
                            const a = r[O];
                            !function GA(e, n, t, i) {
                                for (const r of e) n.mergedAttrs = po(n.mergedAttrs, r.hostAttrs);
                                null !== n.mergedAttrs && (dl(n, n.mergedAttrs, !0), null !== t && d_(i, t, n))
                            }(i, e, n, s);
                            let l = null;
                            null !== n && (l = hd(n, r[Be]));
                            const c = o.rendererFactory.createRenderer(n, t);
                            let u = 16;
                            t.signals ? u = 4096 : t.onPush && (u = 64);
                            const d = Ja(r, g_(t), null, u, r[e.index], e, o, c, null, null, l);
                            return a.firstCreatePass && $d(a, e, i.length - 1), el(r, d), r[e.index] = d
                        }($I, g, Te, Mt, w, d, h), Q = Co(T, P), g && function WA(e, n, t, i) {
                            if (i) hu(e, t, ["ng-version", "18.2.6"]); else {
                                const {attrs: r, classes: o} = function ZT(e) {
                                    const n = [], t = [];
                                    let i = 1, r = 2;
                                    for (; i < e.length;) {
                                        let o = e[i];
                                        if ("string" == typeof o) 2 === r ? "" !== o && n.push(o, e[++i]) : 8 === r && t.push(o); else {
                                            if (!Zt(r)) break;
                                            r = o
                                        }
                                        i++
                                    }
                                    return {attrs: n, classes: t}
                                }(n.selectors[0]);
                                r && hu(e, t, r), o && o.length > 0 && u_(e, t, o.join(" "))
                            }
                        }(h, Te, g, i), void 0 !== t && function ZA(e, n, t) {
                            const i = e.projection = [];
                            for (let r = 0; r < n.length; r++) {
                                const o = t[r];
                                i.push(null != o ? Array.from(o) : null)
                            }
                        }(Q, this.ngContentSelectors, t), V = function qA(e, n, t, i, r, o) {
                            const s = pe(), a = r[O], l = ct(s, r);
                            y_(a, r, s, t, null, i);
                            for (let u = 0; u < t.length; u++) ot(Ii(r, a, s.directiveStart + u, s), r);
                            C_(a, r, s), l && ot(l, r);
                            const c = Ii(r, a, s.directiveStart + s.componentOffset, s);
                            if (e[ye] = r[ye] = c, null !== o) for (const u of o) u(c, n);
                            return Vd(a, s, r), c
                        }(se, Te, Mt, oo, w, [YA]), Wd(T, w, null)
                    } catch (Te) {
                        throw null !== se && rd(se), rd(w), Te
                    } finally {
                        Bu()
                    }
                    return new UA(this.componentType, V, gr(Q, w), w, Q)
                } finally {
                    X(o)
                }
            }
        }

        class UA extends LA {
            constructor(n, t, i, r, o) {
                super(), this.location = i, this._rootLView = r, this._tNode = o, this.previousInputValues = null, this.instance = t, this.hostView = this.changeDetectorRef = new $o(r, void 0, !1), this.componentType = n
            }

            get injector() {
                return new We(this._tNode, this._rootLView)
            }

            setInput(n, t) {
                const i = this._tNode.inputs;
                let r;
                if (null !== i && (r = i[n])) {
                    if (this.previousInputValues ??= new Map, this.previousInputValues.has(n) && Object.is(this.previousInputValues.get(n), t)) return;
                    const o = this._rootLView;
                    qd(o[O], o, r, n, t), this.previousInputValues.set(n, t), Uo(xt(this._tNode.index, o), 1)
                }
            }

            destroy() {
                this.hostView.destroy()
            }

            onDestroy(n) {
                this.hostView.onDestroy(n)
            }
        }

        function YA() {
            const e = pe();
            Da(E()[O], e)
        }

        let yn = (() => {
            class e {
                static#e = this.__NG_ELEMENT_ID__ = QA
            }

            return e
        })();

        function QA() {
            return uy(pe(), E())
        }

        const KA = yn, ly = class extends KA {
            constructor(n, t, i) {
                super(), this._lContainer = n, this._hostTNode = t, this._hostLView = i
            }

            get element() {
                return gr(this._hostTNode, this._hostLView)
            }

            get injector() {
                return new We(this._hostTNode, this._hostLView)
            }

            get parentInjector() {
                const n = Sa(this._hostTNode, this._hostLView);
                if (zu(n)) {
                    const t = Io(n, this._hostLView), i = bo(n);
                    return new We(t[O].data[i + 8], t)
                }
                return new We(null, this._hostLView)
            }

            get length() {
                return this._lContainer.length - xe
            }

            clear() {
                for (; this.length > 0;) this.remove(this.length - 1)
            }

            get(n) {
                const t = cy(this._lContainer);
                return null !== t && t[n] || null
            }

            createEmbeddedView(n, t, i) {
                let r, o;
                "number" == typeof i ? r = i : null != i && (r = i.index, o = i.injector);
                const a = n.createEmbeddedViewImpl(t || {}, o, null);
                return this.insertImpl(a, r, Ai(this._hostTNode, null)), a
            }

            createComponent(n, t, i, r, o) {
                const s = n && !function go(e) {
                    return "function" == typeof e
                }(n);
                let a;
                if (s) a = t; else {
                    const g = t || {};
                    a = g.index, i = g.injector, r = g.projectableNodes, o = g.environmentInjector || g.ngModuleRef
                }
                const l = s ? n : new es(ee(n)), c = i || this.parentInjector;
                if (!o && null == l.ngModule) {
                    const C = (s ? c : this.parentInjector).get(Qt, null);
                    C && (o = C)
                }
                ee(l.componentType ?? {});
                const p = l.create(c, r, null, o);
                return this.insertImpl(p.hostView, a, Ai(this._hostTNode, null)), p
            }

            insert(n, t) {
                return this.insertImpl(n, t, !0)
            }

            insertImpl(n, t, i) {
                const r = n._lView;
                if (function T0(e) {
                    return it(e[He])
                }(r)) {
                    const a = this.indexOf(n);
                    if (-1 !== a) this.detach(a); else {
                        const l = r[He], c = new ly(l, l[Xe], l[He]);
                        c.detach(c.indexOf(n))
                    }
                }
                const o = this._adjustIndex(t), s = this._lContainer;
                return function Ir(e, n, t, i = !0) {
                    const r = n[O];
                    if (function WO(e, n, t, i) {
                        const r = xe + i, o = t.length;
                        i > 0 && (t[r - 1][Kt] = n), i < o - xe ? (n[Kt] = t[r], Mg(t, xe + i, n)) : (t.push(n), n[Kt] = null), n[He] = t;
                        const s = n[yi];
                        null !== s && t !== s && Jv(s, n);
                        const a = n[On];
                        null !== a && a.insertView(e), Au(n), n[k] |= 128
                    }(r, n, e, t), i) {
                        const s = Pd(t, e), a = n[U], l = Rd(a, e[fn]);
                        null !== l && function GO(e, n, t, i, r, o) {
                            i[Se] = r, i[Xe] = n, Xa(e, i, t, 1, r, o)
                        }(r, e[Xe], a, n, l, s)
                    }
                    const o = n[lt];
                    null !== o && null !== o.firstChild && (o.firstChild = null)
                }(s, r, o, i), n.attachToViewContainerRef(), Mg(df(s), o, n), n
            }

            move(n, t) {
                return this.insert(n, t)
            }

            indexOf(n) {
                const t = cy(this._lContainer);
                return null !== t ? t.indexOf(n) : -1
            }

            remove(n) {
                const t = this._adjustIndex(n, -1), i = Vo(this._lContainer, t);
                i && (ra(df(this._lContainer), t), Qa(i[O], i))
            }

            detach(n) {
                const t = this._adjustIndex(n, -1), i = Vo(this._lContainer, t);
                return i && null != ra(df(this._lContainer), t) ? new $o(i) : null
            }

            _adjustIndex(n, t = 0) {
                return n ?? this.length + t
            }
        };

        function cy(e) {
            return e[8]
        }

        function df(e) {
            return e[8] || (e[8] = [])
        }

        function uy(e, n) {
            let t;
            const i = n[e.index];
            return it(i) ? t = i : (t = w_(i, n, null, e), n[e.index] = t, el(n, t)), dy(t, n, e, i), new ly(t, e, n)
        }

        let dy = function hy(e, n, t, i) {
            if (e[fn]) return;
            let r;
            r = 8 & t.type ? le(i) : function XA(e, n) {
                const t = e[U], i = t.createComment(""), r = ct(n, e);
                return Si(t, Rd(t, r), i, function QO(e, n) {
                    return e.nextSibling(n)
                }(t, r), !1), i
            }(n, t), e[fn] = r
        }, ff = () => !1;

        class hf {
            constructor(n) {
                this.queryList = n, this.matches = null
            }

            clone() {
                return new hf(this.queryList)
            }

            setDirty() {
                this.queryList.setDirty()
            }
        }

        class pf {
            constructor(n = []) {
                this.queries = n
            }

            createEmbeddedView(n) {
                const t = n.queries;
                if (null !== t) {
                    const i = null !== n.contentQueries ? n.contentQueries[0] : t.length, r = [];
                    for (let o = 0; o < i; o++) {
                        const s = t.getByIndex(o);
                        r.push(this.queries[s.indexInDeclarationView].clone())
                    }
                    return new pf(r)
                }
                return null
            }

            insertView(n) {
                this.dirtyQueriesWithMatches(n)
            }

            detachView(n) {
                this.dirtyQueriesWithMatches(n)
            }

            finishViewCreation(n) {
                this.dirtyQueriesWithMatches(n)
            }

            dirtyQueriesWithMatches(n) {
                for (let t = 0; t < this.queries.length; t++) null !== yf(n, t).matches && this.queries[t].setDirty()
            }
        }

        class py {
            constructor(n, t, i = null) {
                this.flags = t, this.read = i, this.predicate = "string" == typeof n ? function sx(e) {
                    return e.split(",").map(n => n.trim())
                }(n) : n
            }
        }

        class gf {
            constructor(n = []) {
                this.queries = n
            }

            get length() {
                return this.queries.length
            }

            elementStart(n, t) {
                for (let i = 0; i < this.queries.length; i++) this.queries[i].elementStart(n, t)
            }

            elementEnd(n) {
                for (let t = 0; t < this.queries.length; t++) this.queries[t].elementEnd(n)
            }

            embeddedTView(n) {
                let t = null;
                for (let i = 0; i < this.length; i++) {
                    const r = null !== t ? t.length : 0, o = this.getByIndex(i).embeddedTView(n, r);
                    o && (o.indexInDeclarationView = i, null !== t ? t.push(o) : t = [o])
                }
                return null !== t ? new gf(t) : null
            }

            template(n, t) {
                for (let i = 0; i < this.queries.length; i++) this.queries[i].template(n, t)
            }

            getByIndex(n) {
                return this.queries[n]
            }

            track(n) {
                this.queries.push(n)
            }
        }

        class mf {
            constructor(n, t = -1) {
                this.metadata = n, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = t
            }

            elementStart(n, t) {
                this.isApplyingToNode(t) && this.matchTNode(n, t)
            }

            elementEnd(n) {
                this._declarationNodeIndex === n.index && (this._appliesToNextNode = !1)
            }

            template(n, t) {
                this.elementStart(n, t)
            }

            embeddedTView(n, t) {
                return this.isApplyingToNode(n) ? (this.crossesNgTemplate = !0, this.addMatch(-n.index, t), new mf(this.metadata)) : null
            }

            isApplyingToNode(n) {
                if (this._appliesToNextNode && 1 & ~this.metadata.flags) {
                    const t = this._declarationNodeIndex;
                    let i = n.parent;
                    for (; null !== i && 8 & i.type && i.index !== t;) i = i.parent;
                    return t === (null !== i ? i.index : -1)
                }
                return this._appliesToNextNode
            }

            matchTNode(n, t) {
                const i = this.metadata.predicate;
                if (Array.isArray(i)) for (let r = 0; r < i.length; r++) {
                    const o = i[r];
                    this.matchTNodeWithReadOption(n, t, nx(t, o)), this.matchTNodeWithReadOption(n, t, Oa(t, n, o, !1, !1))
                } else i === Pn ? 4 & t.type && this.matchTNodeWithReadOption(n, t, -1) : this.matchTNodeWithReadOption(n, t, Oa(t, n, i, !1, !1))
            }

            matchTNodeWithReadOption(n, t, i) {
                if (null !== i) {
                    const r = this.metadata.read;
                    if (null !== r) if (r === dt || r === yn || r === Pn && 4 & t.type) this.addMatch(t.index, -2); else {
                        const o = Oa(t, n, r, !1, !1);
                        null !== o && this.addMatch(t.index, o)
                    } else this.addMatch(t.index, i)
                }
            }

            addMatch(n, t) {
                null === this.matches ? this.matches = [n, t] : this.matches.push(n, t)
            }
        }

        function nx(e, n) {
            const t = e.localNames;
            if (null !== t) for (let i = 0; i < t.length; i += 2) if (t[i] === n) return t[i + 1];
            return null
        }

        function rx(e, n, t, i) {
            return -1 === t ? function ix(e, n) {
                return 11 & e.type ? gr(e, n) : 4 & e.type ? il(e, n) : null
            }(n, e) : -2 === t ? function ox(e, n, t) {
                return t === dt ? gr(n, e) : t === Pn ? il(n, e) : t === yn ? uy(n, e) : void 0
            }(e, n, i) : Ii(e, e[O], t, n)
        }

        function gy(e, n, t, i) {
            const r = n[On].queries[i];
            if (null === r.matches) {
                const o = e.data, s = t.matches, a = [];
                for (let l = 0; null !== s && l < s.length; l += 2) {
                    const c = s[l];
                    a.push(c < 0 ? null : rx(n, o[c], s[l + 1], t.metadata.read))
                }
                r.matches = a
            }
            return r.matches
        }

        function vf(e, n, t, i) {
            const r = e.queries.getByIndex(t), o = r.matches;
            if (null !== o) {
                const s = gy(e, n, r, t);
                for (let a = 0; a < o.length; a += 2) {
                    const l = o[a];
                    if (l > 0) i.push(s[a / 2]); else {
                        const c = o[a + 1], u = n[-l];
                        for (let d = xe; d < u.length; d++) {
                            const h = u[d];
                            h[yi] === h[He] && vf(h[O], h, c, i)
                        }
                        if (null !== u[ur]) {
                            const d = u[ur];
                            for (let h = 0; h < d.length; h++) {
                                const p = d[h];
                                vf(p[O], p, c, i)
                            }
                        }
                    }
                }
            }
            return i
        }

        function my(e, n, t) {
            const i = new td(!(4 & ~t));
            return function lN(e, n, t, i) {
                const r = D_(n);
                r.push(t), e.firstCreatePass && b_(e).push(i, r.length - 1)
            }(e, n, i, i.destroy), (n[On] ??= new pf).queries.push(new hf(i)) - 1
        }

        function yy(e, n, t) {
            null === e.queries && (e.queries = new gf), e.queries.track(new mf(n, t))
        }

        function yf(e, n) {
            return e.queries.getByIndex(n)
        }

        function Cy(e, n) {
            const t = e[O], i = yf(t, n);
            return i.crossesNgTemplate ? vf(t, e, n, []) : gy(t, e, i, n)
        }

        const wy = new Set;

        function ft(e) {
            wy.has(e) || (wy.add(e), performance?.mark?.("mark_feature_usage", {detail: {feature: e}}))
        }

        function Sr(e, n) {
            ft("NgSignals");
            const t = function QI(e) {
                const n = Object.create(XI);
                n.value = e;
                const t = () => (Mc(n), n.value);
                return t[qt] = n, t
            }(e), i = t[qt];
            return n?.equal && (i.equal = n.equal), t.set = r => Fp(i, r), t.update = r => function KI(e, n) {
                Np() || kp(), Fp(e, n(e.value))
            }(i, r), t.asReadonly = Dy.bind(t), t
        }

        function Dy() {
            const e = this[qt];
            if (void 0 === e.readonlyFn) {
                const n = () => this();
                n[qt] = e, e.readonlyFn = n
            }
            return e.readonlyFn
        }

        function by(e) {
            return function Ey(e) {
                return "function" == typeof e && void 0 !== e[qt]
            }(e) && "function" == typeof e.set
        }

        function ue(e) {
            let n = function Py(e) {
                return Object.getPrototypeOf(e.prototype).constructor
            }(e.type), t = !0;
            const i = [e];
            for (; n;) {
                let r;
                if (Xt(e)) r = n.\u0275cmp || n.\u0275dir; else {
                    if (n.\u0275cmp) throw new S(903, !1);
                    r = n.\u0275dir
                }
                if (r) {
                    if (t) {
                        i.push(r);
                        const s = e;
                        s.inputs = hl(e.inputs), s.inputTransforms = hl(e.inputTransforms), s.declaredInputs = hl(e.declaredInputs), s.outputs = hl(e.outputs);
                        const a = r.hostBindings;
                        a && wx(e, a);
                        const l = r.viewQuery, c = r.contentQueries;
                        if (l && yx(e, l), c && Cx(e, c), vx(e, r), pT(e.outputs, r.outputs), Xt(r) && r.data.animation) {
                            const u = e.data;
                            u.animation = (u.animation || []).concat(r.data.animation)
                        }
                    }
                    const o = r.features;
                    if (o) for (let s = 0; s < o.length; s++) {
                        const a = o[s];
                        a && a.ngInherit && a(e), a === ue && (t = !1)
                    }
                }
                n = Object.getPrototypeOf(n)
            }
            !function _x(e) {
                let n = 0, t = null;
                for (let i = e.length - 1; i >= 0; i--) {
                    const r = e[i];
                    r.hostVars = n += r.hostVars, r.hostAttrs = po(r.hostAttrs, t = po(t, r.hostAttrs))
                }
            }(i)
        }

        function vx(e, n) {
            for (const t in n.inputs) {
                if (!n.inputs.hasOwnProperty(t) || e.inputs.hasOwnProperty(t)) continue;
                const i = n.inputs[t];
                if (void 0 !== i && (e.inputs[t] = i, e.declaredInputs[t] = n.declaredInputs[t], null !== n.inputTransforms)) {
                    const r = Array.isArray(i) ? i[0] : i;
                    if (!n.inputTransforms.hasOwnProperty(r)) continue;
                    e.inputTransforms ??= {}, e.inputTransforms[r] = n.inputTransforms[r]
                }
            }
        }

        function hl(e) {
            return e === cn ? {} : e === ae ? [] : e
        }

        function yx(e, n) {
            const t = e.viewQuery;
            e.viewQuery = t ? (i, r) => {
                n(i, r), t(i, r)
            } : n
        }

        function Cx(e, n) {
            const t = e.contentQueries;
            e.contentQueries = t ? (i, r, o) => {
                n(i, r, o), t(i, r, o)
            } : n
        }

        function wx(e, n) {
            const t = e.hostBindings;
            e.hostBindings = t ? (i, r) => {
                n(i, r), t(i, r)
            } : n
        }

        class Pi {
        }

        class Sx {
        }

        class wf extends Pi {
            constructor(n, t, i, r = !0) {
                super(), this.ngModuleType = n, this._parent = t, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new sy(this);
                const o = function nt(e, n) {
                    const t = e[Cg] || null;
                    if (!t && !0 === n) throw new Error(`Type ${$e(e)} does not have '\u0275mod' property.`);
                    return t
                }(n);
                this._bootstrapComponents = function Rt(e) {
                    return e instanceof Function ? e() : e
                }(o.bootstrap), this._r3Injector = jm(n, t, [{provide: Pi, useValue: this}, {
                    provide: cl,
                    useValue: this.componentFactoryResolver
                }, ...i], $e(n), new Set(["environment"])), r && this.resolveInjectorInitializers()
            }

            get injector() {
                return this._r3Injector
            }

            resolveInjectorInitializers() {
                this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(this.ngModuleType)
            }

            destroy() {
                const n = this._r3Injector;
                !n.destroyed && n.destroy(), this.destroyCbs.forEach(t => t()), this.destroyCbs = null
            }

            onDestroy(n) {
                this.destroyCbs.push(n)
            }
        }

        class Ef extends Sx {
            constructor(n) {
                super(), this.moduleType = n
            }

            create(n) {
                return new wf(this.moduleType, n, [])
            }
        }

        function pl(e) {
            return !!Df(e) && (Array.isArray(e) || !(e instanceof Map) && Symbol.iterator in e)
        }

        function Df(e) {
            return null !== e && ("function" == typeof e || "object" == typeof e)
        }

        function Cn(e, n, t) {
            return e[n] = t
        }

        function Re(e, n, t) {
            return !Object.is(e[n], t) && (e[n] = t, !0)
        }

        function ki(e, n, t, i) {
            const r = Re(e, n, t);
            return Re(e, n + 1, i) || r
        }

        function is(e, n, t, i, r, o, s, a, l, c) {
            const u = t + P, d = n.firstCreatePass ? function Px(e, n, t, i, r, o, s, a, l) {
                const c = n.consts, u = Ni(n, e, 4, s || null, a || null);
                Ud(n, t, u, jt(c, l)), Da(n, u);
                const d = u.tView = jd(2, u, i, r, o, n.directiveRegistry, n.pipeRegistry, null, n.schemas, c, null);
                return null !== n.queries && (n.queries.template(n, u), d.queries = n.queries.embeddedTView(u)), u
            }(u, n, e, i, r, o, s, a, l) : n.data[u];
            Jt(d, !1);
            const h = jy(n, e, d, t);
            Eo() && Ka(n, e, h, d), ot(h, e);
            const p = w_(h, e, h, d);
            return e[u] = p, el(e, p), function fy(e, n, t) {
                return ff(e, n, t)
            }(p, d, e), va(d) && Hd(n, e, d), null != l && Bd(e, d, c), d
        }

        function H(e, n, t, i, r, o, s, a) {
            const l = E(), c = J();
            return is(l, c, e, n, t, i, r, jt(c.consts, o), s, a), H
        }

        let jy = function Uy(e, n, t, i) {
            return gn(!0), n[U].createComment("")
        };
        var xr = function (e) {
            return e[e.EarlyRead = 0] = "EarlyRead", e[e.Write = 1] = "Write", e[e.MixedReadWrite = 2] = "MixedReadWrite", e[e.Read = 3] = "Read", e
        }(xr || {});
        let Zy = (() => {
            class e {
                static#e = this.\u0275prov = te({token: e, providedIn: "root", factory: () => new e})

                constructor() {
                    this.impl = null
                }

                execute() {
                    this.impl?.execute()
                }
            }

            return e
        })();

        class ss {
            static#e = this.PHASES = [xr.EarlyRead, xr.Write, xr.MixedReadWrite, xr.Read];
            static#t = this.\u0275prov = te({token: ss, providedIn: "root", factory: () => new ss})

            constructor() {
                this.ngZone = L(ge), this.scheduler = L(Tr), this.errorHandler = L(vn, {optional: !0}), this.sequences = new Set, this.deferredRegistrations = new Set, this.executing = !1
            }

            execute() {
                this.executing = !0;
                for (const n of ss.PHASES) for (const t of this.sequences) if (!t.erroredOrDestroyed && t.hooks[n]) try {
                    t.pipelinedValue = this.ngZone.runOutsideAngular(() => t.hooks[n](t.pipelinedValue))
                } catch (i) {
                    t.erroredOrDestroyed = !0, this.errorHandler?.handleError(i)
                }
                this.executing = !1;
                for (const n of this.sequences) n.afterRun(), n.once && this.sequences.delete(n);
                for (const n of this.deferredRegistrations) this.sequences.add(n);
                this.deferredRegistrations.size > 0 && this.scheduler.notify(7), this.deferredRegistrations.clear()
            }

            register(n) {
                this.executing ? this.deferredRegistrations.add(n) : (this.sequences.add(n), this.scheduler.notify(6))
            }

            unregister(n) {
                this.executing && this.sequences.has(n) ? (n.erroredOrDestroyed = !0, n.pipelinedValue = void 0, n.once = !0) : (this.sequences.delete(n), this.deferredRegistrations.delete(n))
            }
        }

        function ht(e, n, t, i) {
            const r = E();
            return Re(r, en(), n) && (J(), _n(Ce(), r, e, n, t, i)), ht
        }

        function Hr(e, n, t, i) {
            return Re(e, en(), t) ? n + Z(t) + i : Y
        }

        function wl(e, n) {
            return e << 17 | n << 2
        }

        function ti(e) {
            return e >> 17 & 32767
        }

        function Pf(e) {
            return 2 | e
        }

        function Vi(e) {
            return (131068 & e) >> 2
        }

        function kf(e, n) {
            return -131069 & e | n << 2
        }

        function Ff(e) {
            return 1 | e
        }

        function EC(e, n, t, i) {
            const r = e[t + 1], o = null === n;
            let s = i ? ti(r) : Vi(r), a = !1;
            for (; 0 !== s && (!1 === a || o);) {
                const c = e[s + 1];
                D1(e[s], n) && (a = !0, e[s + 1] = i ? Ff(c) : Pf(c)), s = i ? ti(c) : Vi(c)
            }
            a && (e[t + 1] = i ? Pf(r) : Ff(r))
        }

        function D1(e, n) {
            return null === e || null == n || (Array.isArray(e) ? e[1] : e) === n || !(!Array.isArray(e) || "string" != typeof n) && nr(e, n) >= 0
        }

        const Ze = {textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0};

        function DC(e) {
            return e.substring(Ze.key, Ze.keyEnd)
        }

        function bC(e, n) {
            const t = Ze.textEnd;
            return t === n ? -1 : (n = Ze.keyEnd = function T1(e, n, t) {
                for (; n < t && e.charCodeAt(n) > 32;) n++;
                return n
            }(e, Ze.key = n, t), Wr(e, n, t))
        }

        function Wr(e, n, t) {
            for (; n < t && e.charCodeAt(n) <= 32;) n++;
            return n
        }

        function m(e, n, t) {
            const i = E();
            return Re(i, en(), n) && Et(J(), Ce(), i, e, n, i[U], t, !1), m
        }

        function Vf(e, n, t, i, r) {
            const s = r ? "class" : "style";
            qd(e, t, n.inputs[s], s, i)
        }

        function El(e, n, t) {
            return nn(e, n, t, !1), El
        }

        function kn(e, n) {
            return nn(e, n, null, !0), kn
        }

        function En(e, n) {
            for (let t = function I1(e) {
                return function MC(e) {
                    Ze.key = 0, Ze.keyEnd = 0, Ze.value = 0, Ze.valueEnd = 0, Ze.textEnd = e.length
                }(e), bC(e, Wr(e, 0, Ze.textEnd))
            }(n); t >= 0; t = bC(n, t)) At(e, DC(n), !0)
        }

        function nn(e, n, t, i) {
            const r = E(), o = J(), s = xn(2);
            o.firstUpdatePass && NC(o, e, s, i), n !== Y && Re(r, s, n) && xC(o, o.data[Je()], r, r[U], e, r[s + 1] = function H1(e, n) {
                return null == e || "" === e || ("string" == typeof n ? e += n : "object" == typeof e && (e = $e(Qn(e)))), e
            }(n, t), i, s)
        }

        function OC(e, n) {
            return n >= e.expandoStartIndex
        }

        function NC(e, n, t, i) {
            const r = e.data;
            if (null === r[t + 1]) {
                const o = r[Je()], s = OC(e, t);
                LC(o, i) && null === n && !s && (n = !1), n = function x1(e, n, t, i) {
                    const r = function Fu(e) {
                        const n = $.lFrame.currentDirectiveIndex;
                        return -1 === n ? null : e[n]
                    }(e);
                    let o = i ? n.residualClasses : n.residualStyles;
                    if (null === r) 0 === (i ? n.classBindings : n.styleBindings) && (t = ls(t = Hf(null, e, n, t, i), n.attrs, i), o = null); else {
                        const s = n.directiveStylingLast;
                        if (-1 === s || e[s] !== r) if (t = Hf(r, e, n, t, i), null === o) {
                            let l = function R1(e, n, t) {
                                const i = t ? n.classBindings : n.styleBindings;
                                if (0 !== Vi(i)) return e[ti(i)]
                            }(e, n, i);
                            void 0 !== l && Array.isArray(l) && (l = Hf(null, e, n, l[1], i), l = ls(l, n.attrs, i), function L1(e, n, t, i) {
                                e[ti(t ? n.classBindings : n.styleBindings)] = i
                            }(e, n, i, l))
                        } else o = function P1(e, n, t) {
                            let i;
                            const r = n.directiveEnd;
                            for (let o = 1 + n.directiveStylingLast; o < r; o++) i = ls(i, e[o].hostAttrs, t);
                            return ls(i, n.attrs, t)
                        }(e, n, i)
                    }
                    return void 0 !== o && (i ? n.residualClasses = o : n.residualStyles = o), t
                }(r, o, n, i), function w1(e, n, t, i, r, o) {
                    let s = o ? n.classBindings : n.styleBindings, a = ti(s), l = Vi(s);
                    e[i] = t;
                    let u, c = !1;
                    if (Array.isArray(t) ? (u = t[1], (null === u || nr(t, u) > 0) && (c = !0)) : u = t, r) if (0 !== l) {
                        const h = ti(e[a + 1]);
                        e[i + 1] = wl(h, a), 0 !== h && (e[h + 1] = kf(e[h + 1], i)), e[a + 1] = function y1(e, n) {
                            return 131071 & e | n << 17
                        }(e[a + 1], i)
                    } else e[i + 1] = wl(a, 0), 0 !== a && (e[a + 1] = kf(e[a + 1], i)), a = i; else e[i + 1] = wl(l, 0), 0 === a ? a = i : e[l + 1] = kf(e[l + 1], i), l = i;
                    c && (e[i + 1] = Pf(e[i + 1])), EC(e, u, i, !0), EC(e, u, i, !1), function E1(e, n, t, i, r) {
                        const o = r ? e.residualClasses : e.residualStyles;
                        null != o && "string" == typeof n && nr(o, n) >= 0 && (t[i + 1] = Ff(t[i + 1]))
                    }(n, u, e, i, o), s = wl(a, l), o ? n.classBindings = s : n.styleBindings = s
                }(r, o, n, t, s, i)
            }
        }

        function Hf(e, n, t, i, r) {
            let o = null;
            const s = t.directiveEnd;
            let a = t.directiveStylingLast;
            for (-1 === a ? a = t.directiveStart : a++; a < s && (o = n[a], i = ls(i, o.hostAttrs, r), o !== e);) a++;
            return null !== e && (t.directiveStylingLast = a), i
        }

        function ls(e, n, t) {
            const i = t ? 1 : 2;
            let r = -1;
            if (null !== n) for (let o = 0; o < n.length; o++) {
                const s = n[o];
                "number" == typeof s ? r = s : r === i && (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]), At(e, s, !!t || n[++o]))
            }
            return void 0 === e ? null : e
        }

        function xC(e, n, t, i, r, o, s, a) {
            if (!(3 & n.type)) return;
            const l = e.data, c = l[a + 1], u = function C1(e) {
                return !(1 & ~e)
            }(c) ? RC(l, n, t, r, Vi(c), s) : void 0;
            Dl(u) || (Dl(o) || function _1(e) {
                return !(2 & ~e)
            }(c) && (o = RC(l, null, t, r, a, s)), function JO(e, n, t, i, r) {
                if (n) r ? e.addClass(t, i) : e.removeClass(t, i); else {
                    let o = -1 === i.indexOf("-") ? void 0 : Xn.DashCase;
                    null == r ? e.removeStyle(t, i, o) : ("string" == typeof r && r.endsWith("!important") && (r = r.slice(0, -10), o |= Xn.Important), e.setStyle(t, i, r, o))
                }
            }(i, s, yo(Je(), t), r, o))
        }

        function RC(e, n, t, i, r, o) {
            const s = null === n;
            let a;
            for (; r > 0;) {
                const l = e[r], c = Array.isArray(l), u = c ? l[1] : l, d = null === u;
                let h = t[r + 1];
                h === Y && (h = d ? ae : void 0);
                let p = d ? du(h, i) : u === i ? h : void 0;
                if (c && !Dl(p) && (p = du(l, i)), Dl(p) && (a = p, s)) return a;
                const g = e[r + 1];
                r = s ? ti(g) : Vi(g)
            }
            if (null !== n) {
                let l = o ? n.residualClasses : n.residualStyles;
                null != l && (a = du(l, i))
            }
            return a
        }

        function Dl(e) {
            return void 0 !== e
        }

        function LC(e, n) {
            return !!(e.flags & (n ? 8 : 16))
        }

        function Dn(e, n, t) {
            !function rn(e, n, t, i) {
                const r = J(), o = xn(2);
                r.firstUpdatePass && NC(r, null, o, i);
                const s = E();
                if (t !== Y && Re(s, o, t)) {
                    const a = r.data[Je()];
                    if (LC(a, i) && !OC(r, o)) {
                        let l = i ? a.classesWithoutHost : a.stylesWithoutHost;
                        null !== l && (t = Yc(l, t || "")), Vf(r, a, s, t, i)
                    } else !function V1(e, n, t, i, r, o, s, a) {
                        r === Y && (r = ae);
                        let l = 0, c = 0, u = 0 < r.length ? r[0] : null, d = 0 < o.length ? o[0] : null;
                        for (; null !== u || null !== d;) {
                            const h = l < r.length ? r[l + 1] : void 0, p = c < o.length ? o[c + 1] : void 0;
                            let C, g = null;
                            u === d ? (l += 2, c += 2, h !== p && (g = d, C = p)) : null === d || null !== u && u < d ? (l += 2, g = u) : (c += 2, g = d, C = p), null !== g && xC(e, n, t, i, g, C, s, a), u = l < r.length ? r[l] : null, d = c < o.length ? o[c] : null
                        }
                    }(r, a, s, s[U], s[o + 1], s[o + 1] = function k1(e, n, t) {
                        if (null == t || "" === t) return ae;
                        const i = [], r = Qn(t);
                        if (Array.isArray(r)) for (let o = 0; o < r.length; o++) e(i, r[o], !0); else if ("object" == typeof r) for (const o in r) r.hasOwnProperty(o) && e(i, o, r[o]); else "string" == typeof r && n(i, r);
                        return i
                    }(e, n, t), i, o)
                }
            }(At, En, Hr(E(), e, n, t), !0)
        }

        function y(e, n, t, i) {
            const r = E(), o = J(), s = P + e, a = r[U], l = o.firstCreatePass ? function aR(e, n, t, i, r, o) {
                const s = n.consts, l = Ni(n, e, 2, i, jt(s, r));
                return Ud(n, t, l, jt(s, o)), null !== l.attrs && dl(l, l.attrs, !1), null !== l.mergedAttrs && dl(l, l.mergedAttrs, !0), null !== n.queries && n.queries.elementStart(n, l), l
            }(s, o, r, n, t, i) : o.data[s], c = VC(o, r, l, a, n, e);
            r[s] = c;
            const u = va(l);
            return Jt(l, !0), d_(a, c, l), !function Nr(e) {
                return !(32 & ~e.flags)
            }(l) && Eo() && Ka(o, r, c, l), 0 === function S0() {
                return $.lFrame.elementDepthCount
            }() && ot(c, r), function O0() {
                $.lFrame.elementDepthCount++
            }(), u && (Hd(o, r, l), Vd(o, l, r)), null !== i && Bd(r, l), y
        }

        function _() {
            let e = pe();
            Lu() ? Pu() : (e = e.parent, Jt(e, !1));
            const n = e;
            (function A0(e) {
                return $.skipHydrationRootTNode === e
            })(n) && function P0() {
                $.skipHydrationRootTNode = null
            }(), function N0() {
                $.lFrame.elementDepthCount--
            }();
            const t = J();
            return t.firstCreatePass && (Da(t, e), Iu(e) && t.queries.elementEnd(e)), null != n.classesWithoutHost && function Z0(e) {
                return !!(8 & e.flags)
            }(n) && Vf(t, n, E(), n.classesWithoutHost, !0), null != n.stylesWithoutHost && function Y0(e) {
                return !!(16 & e.flags)
            }(n) && Vf(t, n, E(), n.stylesWithoutHost, !1), _
        }

        function N(e, n, t, i) {
            return y(e, n, t, i), _(), N
        }

        let VC = (e, n, t, i, r, o) => (gn(!0), Ya(i, r, function wm() {
            return $.lFrame.currentNamespace
        }()));

        function ne(e, n, t) {
            const i = E(), r = J(), o = e + P, s = r.firstCreatePass ? function uR(e, n, t, i, r) {
                const o = n.consts, s = jt(o, i), a = Ni(n, e, 8, "ng-container", s);
                return null !== s && dl(a, s, !0), Ud(n, t, a, jt(o, r)), null !== n.queries && n.queries.elementStart(n, a), a
            }(o, r, i, n, t) : r.data[o];
            Jt(s, !0);
            const a = BC(r, i, s, e);
            return i[o] = a, Eo() && Ka(r, i, a, s), ot(a, i), va(s) && (Hd(r, i, s), Vd(r, s, i)), null != t && Bd(i, s), ne
        }

        function ie() {
            let e = pe();
            const n = J();
            return Lu() ? Pu() : (e = e.parent, Jt(e, !1)), n.firstCreatePass && (Da(n, e), Iu(e) && n.queries.elementEnd(e)), ie
        }

        let BC = (e, n, t, i) => (gn(!0), Od(n[U], ""));

        function Ie() {
            return E()
        }

        const Il = "en-US";
        let GC = Il, cw = (e, n, t) => {
        };

        function W(e, n, t, i) {
            const r = E(), o = J(), s = pe();
            return Gf(o, r, r[U], s, e, n, i), W
        }

        function Gf(e, n, t, i, r, o, s) {
            const a = va(i), c = e.firstCreatePass && b_(e), u = n[ye], d = D_(n);
            let h = !0;
            if (3 & i.type || s) {
                const C = ct(i, n), D = s ? s(C) : C, T = d.length, w = s ? Q => s(le(Q[i.index])) : i.index;
                let V = null;
                if (!s && a && (V = function iL(e, n, t, i) {
                    const r = e.cleanup;
                    if (null != r) for (let o = 0; o < r.length - 1; o += 2) {
                        const s = r[o];
                        if (s === t && r[o + 1] === i) {
                            const a = n[sr], l = r[o + 2];
                            return a.length > l ? a[l] : null
                        }
                        "string" == typeof s && (o += 2)
                    }
                    return null
                }(e, n, r, i.index)), null !== V) (V.__ngLastListenerFn__ || V).__ngNextListenerFn__ = o, V.__ngLastListenerFn__ = o, h = !1; else {
                    o = hw(i, n, u, o), cw(C, r, o);
                    const Q = t.listen(D, r, o);
                    d.push(o, Q), c && c.push(r, w, T, T + 1)
                }
            } else o = hw(i, n, u, o);
            const p = i.outputs;
            let g;
            if (h && null !== p && (g = p[r])) {
                const C = g.length;
                if (C) for (let D = 0; D < C; D += 2) {
                    const se = n[g[D]][g[D + 1]].subscribe(o), Te = d.length;
                    d.push(o, se), c && c.push(r, i.index, Te, -(Te + 1))
                }
            }
        }

        function fw(e, n, t, i) {
            const r = X(null);
            try {
                return pn(6, n, t), !1 !== t(i)
            } catch (o) {
                return tl(e, o), !1
            } finally {
                pn(7, n, t), X(r)
            }
        }

        function hw(e, n, t, i) {
            return function r(o) {
                if (o === Function) return i;
                Uo(e.componentOffset > -1 ? xt(e.index, n) : n, 5);
                let a = fw(n, t, i, o), l = r.__ngNextListenerFn__;
                for (; l;) a = fw(n, t, l, o) && a, l = l.__ngNextListenerFn__;
                return a
            }
        }

        function v(e = 1) {
            return function B0(e) {
                return ($.lFrame.contextLView = function om(e, n) {
                    for (; e > 0;) n = n[ar], e--;
                    return n
                }(e, $.lFrame.contextLView))[ye]
            }(e)
        }

        function Fn(e, n, t) {
            return qf(e, "", n, "", t), Fn
        }

        function qf(e, n, t, i, r) {
            const o = E(), s = Hr(o, n, t, i);
            return s !== Y && Et(J(), Ce(), o, e, s, o[U], r, !1), qf
        }

        function Ew(e, n, t, i) {
            !function _y(e, n, t, i) {
                const r = J();
                if (r.firstCreatePass) {
                    const o = pe();
                    yy(r, new py(n, t, i), o.index), function ax(e, n) {
                        const t = e.contentQueries || (e.contentQueries = []);
                        n !== (t.length ? t[t.length - 1] : -1) && t.push(e.queries.length - 1, n)
                    }(r, e), !(2 & ~t) && (r.staticContentQueries = !0)
                }
                return my(r, E(), t)
            }(e, n, t, i)
        }

        function kt(e, n, t) {
            !function vy(e, n, t) {
                const i = J();
                return i.firstCreatePass && (yy(i, new py(e, n, t), -1), !(2 & ~n) && (i.staticViewQueries = !0)), my(i, E(), n)
            }(e, n, t)
        }

        function bt(e) {
            const n = E(), t = J(), i = Vu();
            Ea(i + 1);
            const r = yf(t, i);
            if (e.dirty && function M0(e) {
                return !(4 & ~e[k])
            }(n) === !(2 & ~r.metadata.flags)) {
                if (null === r.matches) e.reset([]); else {
                    const o = Cy(n, i);
                    e.reset(o, Qm), e.notifyOnChanges()
                }
                return !0
            }
            return !1
        }

        function It() {
            return function _f(e, n) {
                return e[On].queries[n].queryList
            }(E(), Vu())
        }

        function b(e, n = "") {
            const t = E(), i = J(), r = e + P, o = i.firstCreatePass ? Ni(i, r, 1, n, null) : i.data[r],
                s = xw(i, t, o, n, e);
            t[r] = s, Eo() && Ka(i, t, s, o), Jt(o, !1)
        }

        let xw = (e, n, t, i, r) => (gn(!0), function Sd(e, n) {
            return e.createText(n)
        }(n[U], i));

        function A(e) {
            return K("", e, ""), A
        }

        function K(e, n, t) {
            const i = E(), r = Hr(i, e, n, t);
            return r !== Y && function Ln(e, n, t) {
                const i = yo(n, e);
                !function Kv(e, n, t) {
                    e.setValue(n, t)
                }(e[U], i, t)
            }(i, Je(), r), K
        }

        function tt(e, n, t) {
            by(n) && (n = n());
            const i = E();
            return Re(i, en(), n) && Et(J(), Ce(), i, e, n, i[U], t, !1), tt
        }

        function Ne(e, n) {
            const t = by(e);
            return t && e.set(n), t
        }

        function st(e, n) {
            const t = E(), i = J(), r = pe();
            return Gf(i, t, t[U], r, e, n), st
        }

        function Zf(e, n, t, i, r) {
            if (e = j(e), Array.isArray(e)) for (let o = 0; o < e.length; o++) Zf(e[o], n, t, i, r); else {
                const o = J(), s = E(), a = pe();
                let l = _i(e) ? e : j(e.provide);
                const c = Ug(e), u = 1048575 & a.providerIndexes, d = a.directiveStart, h = a.providerIndexes >> 20;
                if (_i(e) || !e.multi) {
                    const p = new Do(c, r, M), g = Qf(l, n, r ? u : u + h, d);
                    -1 === g ? (Wu(Ta(a, s), o, l), Yf(o, e, n.length), n.push(l), a.directiveStart++, a.directiveEnd++, r && (a.providerIndexes += 1048576), t.push(p), s.push(p)) : (t[g] = p, s[g] = p)
                } else {
                    const p = Qf(l, n, u + h, d), g = Qf(l, n, u, u + h), D = g >= 0 && t[g];
                    if (r && !D || !r && !(p >= 0 && t[p])) {
                        Wu(Ta(a, s), o, l);
                        const T = function SL(e, n, t, i, r) {
                            const o = new Do(e, t, M);
                            return o.multi = [], o.index = n, o.componentProviders = 0, $w(o, r, i && !t), o
                        }(r ? TL : ML, t.length, r, i, c);
                        !r && D && (t[g].providerFactory = T), Yf(o, e, n.length, 0), n.push(l), a.directiveStart++, a.directiveEnd++, r && (a.providerIndexes += 1048576), t.push(T), s.push(T)
                    } else Yf(o, e, p > -1 ? p : g, $w(t[r ? g : p], c, !r && i));
                    !r && i && D && t[g].componentProviders++
                }
            }
        }

        function Yf(e, n, t, i) {
            const r = _i(n), o = function t0(e) {
                return !!e.useClass
            }(n);
            if (r || o) {
                const l = (o ? j(n.useClass) : n).prototype.ngOnDestroy;
                if (l) {
                    const c = e.destroyHooks || (e.destroyHooks = []);
                    if (!r && n.multi) {
                        const u = c.indexOf(t);
                        -1 === u ? c.push(t, [i, l]) : c[u + 1].push(i, l)
                    } else c.push(t, l)
                }
            }
        }

        function $w(e, n, t) {
            return t && e.componentProviders++, e.multi.push(n) - 1
        }

        function Qf(e, n, t, i) {
            for (let r = t; r < i; r++) if (n[r] === e) return r;
            return -1
        }

        function ML(e, n, t, i) {
            return Kf(this.multi, [])
        }

        function TL(e, n, t, i) {
            const r = this.multi;
            let o;
            if (this.providerFactory) {
                const s = this.providerFactory.componentProviders, a = Ii(t, t[O], this.providerFactory.index, i);
                o = a.slice(0, s), Kf(r, o);
                for (let l = s; l < a.length; l++) o.push(a[l])
            } else o = [], Kf(r, o);
            return o
        }

        function Kf(e, n) {
            for (let t = 0; t < e.length; t++) n.push((0, e[t])());
            return n
        }

        function Me(e, n = []) {
            return t => {
                t.providersResolver = (i, r) => function IL(e, n, t) {
                    const i = J();
                    if (i.firstCreatePass) {
                        const r = Xt(e);
                        Zf(t, i.data, i.blueprint, r, !0), Zf(n, i.data, i.blueprint, r, !1)
                    }
                }(i, r ? r(e) : e, n)
            }
        }

        function ps(e, n, t, i) {
            return function qw(e, n, t, i, r, o) {
                const s = n + t;
                return Re(e, s, r) ? Cn(e, s + 1, o ? i.call(o, r) : i(r)) : gs(e, s + 1)
            }(E(), ut(), e, n, t, i)
        }

        function Xf(e, n, t, i, r) {
            return function Ww(e, n, t, i, r, o, s) {
                const a = n + t;
                return ki(e, a, r, o) ? Cn(e, a + 2, s ? i.call(s, r, o) : i(r, o)) : gs(e, a + 2)
            }(E(), ut(), e, n, t, i, r)
        }

        function Ye(e, n, t, i, r, o) {
            return Zw(E(), ut(), e, n, t, i, r, o)
        }

        function gs(e, n) {
            const t = e[n];
            return t === Y ? void 0 : t
        }

        function Zw(e, n, t, i, r, o, s, a) {
            const l = n + t;
            return function gl(e, n, t, i, r) {
                const o = ki(e, n, t, i);
                return Re(e, n + 2, r) || o
            }(e, l, r, o, s) ? Cn(e, l + 3, a ? i.call(a, r, o, s) : i(r, o, s)) : gs(e, l + 3)
        }

        function Xw(e, n, t, i, r) {
            const o = e + P, s = E(), a = function wi(e, n) {
                return e[n]
            }(s, o);
            return function ms(e, n) {
                return e[O].data[n].pure
            }(s, o) ? Zw(s, ut(), n, a.transform, t, i, r, a) : a.transform(t, i, r)
        }

        const _E = new R(""), Ll = new R("");
        let sh, rh = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(oe(ge), oe(oh), oe(Ll))
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac})

                constructor(t, i, r) {
                    this._ngZone = t, this.registry = i, this._isZoneStable = !0, this._callbacks = [], this.taskTrackingZone = null, sh || (function BP(e) {
                        sh = e
                    }(r), r.addToWindow(i)), this._watchAngularEvents(), t.run(() => {
                        this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                    })
                }

                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: () => {
                            this._isZoneStable = !1
                        }
                    }), this._ngZone.runOutsideAngular(() => {
                        this._ngZone.onStable.subscribe({
                            next: () => {
                                ge.assertNotInAngularZone(), queueMicrotask(() => {
                                    this._isZoneStable = !0, this._runCallbacksIfReady()
                                })
                            }
                        })
                    })
                }

                isStable() {
                    return this._isZoneStable && !this._ngZone.hasPendingMacrotasks
                }

                _runCallbacksIfReady() {
                    if (this.isStable()) queueMicrotask(() => {
                        for (; 0 !== this._callbacks.length;) {
                            let t = this._callbacks.pop();
                            clearTimeout(t.timeoutId), t.doneCb()
                        }
                    }); else {
                        let t = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(i => !i.updateCb || !i.updateCb(t) || (clearTimeout(i.timeoutId), !1))
                    }
                }

                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                        source: t.source,
                        creationLocation: t.creationLocation,
                        data: t.data
                    })) : []
                }

                addCallback(t, i, r) {
                    let o = -1;
                    i && i > 0 && (o = setTimeout(() => {
                        this._callbacks = this._callbacks.filter(s => s.timeoutId !== o), t()
                    }, i)), this._callbacks.push({doneCb: t, timeoutId: o, updateCb: r})
                }

                whenStable(t, i, r) {
                    if (r && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(t, i, r), this._runCallbacksIfReady()
                }

                registerApplication(t) {
                    this.registry.registerApplication(t, this)
                }

                unregisterApplication(t) {
                    this.registry.unregisterApplication(t)
                }

                findProviders(t, i, r) {
                    return []
                }
            }

            return e
        })(), oh = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac, providedIn: "platform"})

                constructor() {
                    this._applications = new Map
                }

                registerApplication(t, i) {
                    this._applications.set(t, i)
                }

                unregisterApplication(t) {
                    this._applications.delete(t)
                }

                unregisterAllApplications() {
                    this._applications.clear()
                }

                getTestability(t) {
                    return this._applications.get(t) || null
                }

                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }

                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }

                findTestabilityInTree(t, i = !0) {
                    return sh?.findTestabilityInTree(this, t, i) ?? null
                }
            }

            return e
        })();

        function Pl(e) {
            return !!e && "function" == typeof e.then
        }

        function yE(e) {
            return !!e && "function" == typeof e.subscribe
        }

        const jP = new R("");
        let CE = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac, providedIn: "root"})

                constructor() {
                    this.initialized = !1, this.done = !1, this.donePromise = new Promise((t, i) => {
                        this.resolve = t, this.reject = i
                    }), this.appInits = L(jP, {optional: !0}) ?? []
                }

                runInitializers() {
                    if (this.initialized) return;
                    const t = [];
                    for (const r of this.appInits) {
                        const o = r();
                        if (Pl(o)) t.push(o); else if (yE(o)) {
                            const s = new Promise((a, l) => {
                                o.subscribe({complete: a, error: l})
                            });
                            t.push(s)
                        }
                    }
                    const i = () => {
                        this.done = !0, this.resolve()
                    };
                    Promise.all(t).then(() => {
                        i()
                    }).catch(r => {
                        this.reject(r)
                    }), 0 === t.length && i(), this.initialized = !0
                }
            }

            return e
        })();
        const ah = new R("");

        function EE(e, n) {
            return Array.isArray(n) ? n.reduce(EE, e) : {...e, ...n}
        }

        let Vn = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac, providedIn: "root"})

                constructor() {
                    this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = L(DS), this.afterRenderManager = L(Zy), this.zonelessEnabled = L(Ko), this.dirtyFlags = 0, this.deferredDirtyFlags = 0, this.externalTestViews = new Set, this.beforeRender = new ln, this.afterTick = new ln, this.componentTypes = [], this.components = [], this.isStable = L(pr).hasPendingTasks.pipe(Bc(t => !t)), this._injector = L(Qt)
                }

                get allViews() {
                    return [...this.externalTestViews.keys(), ...this._views]
                }

                get destroyed() {
                    return this._destroyed
                }

                get injector() {
                    return this._injector
                }

                get viewCount() {
                    return this._views.length
                }

                whenStable() {
                    let t;
                    return new Promise(i => {
                        t = this.isStable.subscribe({
                            next: r => {
                                r && i()
                            }
                        })
                    }).finally(() => {
                        t.unsubscribe()
                    })
                }

                bootstrap(t, i) {
                    const r = t instanceof ny;
                    if (!this._injector.get(CE).done) throw !r && function vi(e) {
                        const n = ee(e) || ze(e) || Ke(e);
                        return null !== n && n.standalone
                    }(t), new S(405, !1);
                    let s;
                    s = r ? t : this._injector.get(cl).resolveComponentFactory(t), this.componentTypes.push(s.componentType);
                    const a = function UP(e) {
                            return e.isBoundToModule
                        }(s) ? void 0 : this._injector.get(Pi), c = s.create(et.NULL, [], i || s.selector, a),
                        u = c.location.nativeElement, d = c.injector.get(_E, null);
                    return d?.registerApplication(u), c.onDestroy(() => {
                        this.detachView(c.hostView), kl(this.components, c), d?.unregisterApplication(u)
                    }), this._loadComponent(c), c
                }

                tick() {
                    this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick()
                }

                _tick() {
                    if (this._runningTick) throw new S(101, !1);
                    const t = X(null);
                    try {
                        this._runningTick = !0, this.synchronize()
                    } catch (i) {
                        this.internalErrorHandler(i)
                    } finally {
                        this._runningTick = !1, X(t), this.afterTick.next()
                    }
                }

                synchronize() {
                    let t = null;
                    this._injector.destroyed || (t = this._injector.get(lf, null, {optional: !0})), this.dirtyFlags |= this.deferredDirtyFlags, this.deferredDirtyFlags = 0;
                    let i = 0;
                    for (; 0 !== this.dirtyFlags && i++ < 10;) this.synchronizeOnce(t)
                }

                synchronizeOnce(t) {
                    if (this.dirtyFlags |= this.deferredDirtyFlags, this.deferredDirtyFlags = 0, 7 & this.dirtyFlags) {
                        const i = !!(1 & this.dirtyFlags);
                        this.dirtyFlags &= -8, this.dirtyFlags |= 8, this.beforeRender.next(i);
                        for (let {_lView: r, notifyErrorHandler: o} of this._views) GP(r, o, i, this.zonelessEnabled);
                        if (this.dirtyFlags &= -5, this.syncDirtyFlagsWithViews(), 7 & this.dirtyFlags) return
                    } else t?.begin?.(), t?.end?.();
                    8 & this.dirtyFlags && (this.dirtyFlags &= -9, this.afterRenderManager.execute()), this.syncDirtyFlagsWithViews()
                }

                syncDirtyFlagsWithViews() {
                    this.allViews.some(({_lView: t}) => _a(t)) ? this.dirtyFlags |= 2 : this.dirtyFlags &= -8
                }

                attachView(t) {
                    const i = t;
                    this._views.push(i), i.attachToAppRef(this)
                }

                detachView(t) {
                    const i = t;
                    kl(this._views, i), i.detachFromAppRef()
                }

                _loadComponent(t) {
                    this.attachView(t.hostView), this.tick(), this.components.push(t);
                    const i = this._injector.get(ah, []);
                    [...this._bootstrapListeners, ...i].forEach(r => r(t))
                }

                ngOnDestroy() {
                    if (!this._destroyed) try {
                        this._destroyListeners.forEach(t => t()), this._views.slice().forEach(t => t.destroy())
                    } finally {
                        this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
                    }
                }

                onDestroy(t) {
                    return this._destroyListeners.push(t), () => kl(this._destroyListeners, t)
                }

                destroy() {
                    if (this._destroyed) throw new S(406, !1);
                    const t = this._injector;
                    t.destroy && !t.destroyed && t.destroy()
                }

                warnIfDestroyed() {
                }
            }

            return e
        })();

        function kl(e, n) {
            const t = e.indexOf(n);
            t > -1 && e.splice(t, 1)
        }

        function GP(e, n, t, i) {
            (t || _a(e)) && nl(e, n, t && !i ? 0 : 1)
        }

        let YP = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac, providedIn: "root"})

                constructor() {
                    this.zone = L(ge), this.changeDetectionScheduler = L(Tr), this.applicationRef = L(Vn)
                }

                initialize() {
                    this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this.changeDetectionScheduler.runningTick || this.zone.run(() => {
                                this.applicationRef.tick()
                            })
                        }
                    }))
                }

                ngOnDestroy() {
                    this._onMicrotaskEmptySubscription?.unsubscribe()
                }
            }

            return e
        })();

        function lh({ngZoneFactory: e, ignoreChangesOutsideZone: n, scheduleInRootZone: t}) {
            return e ??= () => new ge({...ch(), scheduleInRootZone: t}), [{provide: ge, useFactory: e}, {
                provide: un,
                multi: !0,
                useFactory: () => {
                    const i = L(YP, {optional: !0});
                    return () => i.initialize()
                }
            }, {
                provide: un, multi: !0, useFactory: () => {
                    const i = L(KP);
                    return () => {
                        i.initialize()
                    }
                }
            }, !0 === n ? {provide: ty, useValue: !0} : [], {provide: af, useValue: t ?? $m}]
        }

        function ch(e) {
            return {
                enableLongStackTrace: !1,
                shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1
            }
        }

        let KP = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac, providedIn: "root"})

                constructor() {
                    this.subscription = new Tt, this.initialized = !1, this.zone = L(ge), this.pendingTasks = L(pr)
                }

                initialize() {
                    if (this.initialized) return;
                    this.initialized = !0;
                    let t = null;
                    !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (t = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
                        this.subscription.add(this.zone.onStable.subscribe(() => {
                            ge.assertNotInAngularZone(), queueMicrotask(() => {
                                null !== t && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(t), t = null)
                            })
                        }))
                    }), this.subscription.add(this.zone.onUnstable.subscribe(() => {
                        ge.assertInAngularZone(), t ??= this.pendingTasks.add()
                    }))
                }

                ngOnDestroy() {
                    this.subscription.unsubscribe()
                }
            }

            return e
        })(), ys = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac, providedIn: "root"})

                constructor() {
                    this.appRef = L(Vn), this.taskService = L(pr), this.ngZone = L(ge), this.zonelessEnabled = L(Ko), this.disableScheduling = L(ty, {optional: !0}) ?? !1, this.zoneIsDefined = typeof Zone < "u" && !!Zone.root.run, this.schedulerTickApplyArgs = [{data: {__scheduler_tick__: !0}}], this.subscriptions = new Tt, this.angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(Ra) : null, this.scheduleInRootZone = !this.zonelessEnabled && this.zoneIsDefined && (L(af, {optional: !0}) ?? !1), this.cancelScheduledCallback = null, this.useMicrotaskScheduler = !1, this.runningTick = !1, this.pendingRenderTaskId = null, this.subscriptions.add(this.appRef.afterTick.subscribe(() => {
                        this.runningTick || this.cleanup()
                    })), this.subscriptions.add(this.ngZone.onUnstable.subscribe(() => {
                        this.runningTick || this.cleanup()
                    })), this.disableScheduling ||= !this.zonelessEnabled && (this.ngZone instanceof ed || !this.zoneIsDefined)
                }

                notify(t) {
                    if (!this.zonelessEnabled && 5 === t) return;
                    switch (t) {
                        case 0:
                            this.appRef.dirtyFlags |= 2;
                            break;
                        case 3:
                        case 2:
                        case 4:
                        case 5:
                        case 1:
                            this.appRef.dirtyFlags |= 4;
                            break;
                        case 7:
                            this.appRef.deferredDirtyFlags |= 8;
                            break;
                        default:
                            this.appRef.dirtyFlags |= 8
                    }
                    if (!this.shouldScheduleTick()) return;
                    const i = this.useMicrotaskScheduler ? Gm : zm;
                    this.pendingRenderTaskId = this.taskService.add(), this.cancelScheduledCallback = this.scheduleInRootZone ? Zone.root.run(() => i(() => this.tick())) : this.ngZone.runOutsideAngular(() => i(() => this.tick()))
                }

                shouldScheduleTick() {
                    return !(this.disableScheduling || null !== this.pendingRenderTaskId || this.runningTick || this.appRef._runningTick || !this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(Ra + this.angularZoneId))
                }

                tick() {
                    if (this.runningTick || this.appRef.destroyed) return;
                    !this.zonelessEnabled && 7 & this.appRef.dirtyFlags && (this.appRef.dirtyFlags |= 1);
                    const t = this.taskService.add();
                    try {
                        this.ngZone.run(() => {
                            this.runningTick = !0, this.appRef._tick()
                        }, void 0, this.schedulerTickApplyArgs)
                    } catch (i) {
                        throw this.taskService.remove(t), i
                    } finally {
                        this.cleanup()
                    }
                    this.useMicrotaskScheduler = !0, Gm(() => {
                        this.useMicrotaskScheduler = !1, this.taskService.remove(t)
                    })
                }

                ngOnDestroy() {
                    this.subscriptions.unsubscribe(), this.cleanup()
                }

                cleanup() {
                    if (this.runningTick = !1, this.cancelScheduledCallback?.(), this.cancelScheduledCallback = null, null !== this.pendingRenderTaskId) {
                        const t = this.pendingRenderTaskId;
                        this.pendingRenderTaskId = null, this.taskService.remove(t)
                    }
                }
            }

            return e
        })();
        const ni = new R("", {
            providedIn: "root", factory: () => L(ni, re.Optional | re.SkipSelf) || function XP() {
                return typeof $localize < "u" && $localize.locale || Il
            }()
        }), dh = new R("");

        function Vl(e) {
            return !!e.platformInjector
        }

        let OE = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(oe(et))
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac, providedIn: "platform"})

                constructor(t) {
                    this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                }

                get injector() {
                    return this._injector
                }

                get destroyed() {
                    return this._destroyed
                }

                bootstrapModuleFactory(t, i) {
                    const r = i?.scheduleInRootZone, s = i?.ignoreChangesOutsideZone, a = [lh({
                        ngZoneFactory: () => function ES(e = "zone.js", n) {
                            return "noop" === e ? new ed : "zone.js" === e ? new ge(n) : e
                        }(i?.ngZone, {
                            ...ch({
                                eventCoalescing: i?.ngZoneEventCoalescing,
                                runCoalescing: i?.ngZoneRunCoalescing
                            }), scheduleInRootZone: r
                        }), ignoreChangesOutsideZone: s
                    }), {provide: Tr, useExisting: ys}], l = function Nx(e, n, t) {
                        return new wf(e, n, t, !1)
                    }(t.moduleType, this.injector, a);
                    return function SE(e) {
                        const n = Vl(e) ? e.r3Injector : e.moduleRef.injector, t = n.get(ge);
                        return t.run(() => {
                            Vl(e) ? e.r3Injector.resolveInjectorInitializers() : e.moduleRef.resolveInjectorInitializers();
                            const i = n.get(vn, null);
                            let r;
                            if (t.runOutsideAngular(() => {
                                r = t.onError.subscribe({
                                    next: o => {
                                        i.handleError(o)
                                    }
                                })
                            }), Vl(e)) {
                                const o = () => n.destroy(), s = e.platformInjector.get(dh);
                                s.add(o), n.onDestroy(() => {
                                    r.unsubscribe(), s.delete(o)
                                })
                            } else e.moduleRef.onDestroy(() => {
                                kl(e.allPlatformModules, e.moduleRef), r.unsubscribe()
                            });
                            return function zP(e, n, t) {
                                try {
                                    const i = t();
                                    return Pl(i) ? i.catch(r => {
                                        throw n.runOutsideAngular(() => e.handleError(r)), r
                                    }) : i
                                } catch (i) {
                                    throw n.runOutsideAngular(() => e.handleError(i)), i
                                }
                            }(i, t, () => {
                                const o = n.get(CE);
                                return o.runInitializers(), o.donePromise.then(() => {
                                    if (function yR(e) {
                                        "string" == typeof e && (GC = e.toLowerCase().replace(/_/g, "-"))
                                    }(n.get(ni, Il) || Il), Vl(e)) {
                                        const a = n.get(Vn);
                                        return void 0 !== e.rootComponent && a.bootstrap(e.rootComponent), a
                                    }
                                    return function rk(e, n) {
                                        const t = e.injector.get(Vn);
                                        if (e._bootstrapComponents.length > 0) e._bootstrapComponents.forEach(i => t.bootstrap(i)); else {
                                            if (!e.instance.ngDoBootstrap) throw new S(-403, !1);
                                            e.instance.ngDoBootstrap(t)
                                        }
                                        n.push(e)
                                    }(e.moduleRef, e.allPlatformModules), e.moduleRef
                                })
                            })
                        })
                    }({moduleRef: l, allPlatformModules: this._modules})
                }

                bootstrapModule(t, i = []) {
                    const r = EE({}, i);
                    return function ZP(e, n, t) {
                        const i = new Ef(t);
                        return Promise.resolve(i)
                    }(0, 0, t).then(o => this.bootstrapModuleFactory(o, r))
                }

                onDestroy(t) {
                    this._destroyListeners.push(t)
                }

                destroy() {
                    if (this._destroyed) throw new S(404, !1);
                    this._modules.slice().forEach(i => i.destroy()), this._destroyListeners.forEach(i => i());
                    const t = this._injector.get(dh, null);
                    t && (t.forEach(i => i()), t.clear()), this._destroyed = !0
                }
            }

            return e
        })(), ii = null;
        const NE = new R("");

        function AE(e, n, t = []) {
            const i = `Platform: ${n}`, r = new R(i);
            return (o = []) => {
                let s = fh();
                if (!s || s.injector.get(NE, !1)) {
                    const a = [...t, ...o, {provide: r, useValue: !0}];
                    e ? e(a) : function ok(e) {
                        if (ii && !ii.get(NE, !1)) throw new S(400, !1);
                        (function wE() {
                            !function YI(e) {
                                Pp = e
                            }(() => {
                                throw new S(600, !1)
                            })
                        })(), ii = e;
                        const n = e.get(OE);
                        (function RE(e) {
                            e.get(mv, null)?.forEach(t => t())
                        })(e)
                    }(function xE(e = [], n) {
                        return et.create({
                            name: n,
                            providers: [{provide: _u, useValue: "platform"}, {
                                provide: dh,
                                useValue: new Set([() => ii = null])
                            }, ...e]
                        })
                    }(a, i))
                }
                return function sk() {
                    const n = fh();
                    if (!n) throw new S(401, !1);
                    return n
                }()
            }
        }

        function fh() {
            return ii?.get(OE) ?? null
        }

        let Bi = (() => {
            class e {
                static#e = this.__NG_ELEMENT_ID__ = lk
            }

            return e
        })();

        function lk(e) {
            return function ck(e, n, t) {
                if (Ci(e) && !t) {
                    const i = xt(e.index, n);
                    return new $o(i, i)
                }
                return 175 & e.type ? new $o(n[Oe], n) : null
            }(pe(), E(), !(16 & ~e))
        }

        class VE {
            constructor() {
            }

            supports(n) {
                return pl(n)
            }

            create(n) {
                return new pk(n)
            }
        }

        const hk = (e, n) => n;

        class pk {
            constructor(n) {
                this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = n || hk
            }

            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }

            forEachItem(n) {
                let t;
                for (t = this._itHead; null !== t; t = t._next) n(t)
            }

            forEachOperation(n) {
                let t = this._itHead, i = this._removalsHead, r = 0, o = null;
                for (; t || i;) {
                    const s = !i || t && t.currentIndex < BE(i, r, o) ? t : i, a = BE(s, r, o), l = s.currentIndex;
                    if (s === i) r--, i = i._nextRemoved; else if (t = t._next, null == s.previousIndex) r++; else {
                        o || (o = []);
                        const c = a - r, u = l - r;
                        if (c != u) {
                            for (let h = 0; h < c; h++) {
                                const p = h < o.length ? o[h] : o[h] = 0, g = p + h;
                                u <= g && g < c && (o[h] = p + 1)
                            }
                            o[s.previousIndex] = u - c
                        }
                    }
                    a !== l && n(s, a, l)
                }
            }

            forEachPreviousItem(n) {
                let t;
                for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t)
            }

            forEachAddedItem(n) {
                let t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t)
            }

            forEachMovedItem(n) {
                let t;
                for (t = this._movesHead; null !== t; t = t._nextMoved) n(t)
            }

            forEachRemovedItem(n) {
                let t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t)
            }

            forEachIdentityChange(n) {
                let t;
                for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange) n(t)
            }

            diff(n) {
                if (null == n && (n = []), !pl(n)) throw new S(900, !1);
                return this.check(n) ? this : null
            }

            onDestroy() {
            }

            check(n) {
                this._reset();
                let r, o, s, t = this._itHead, i = !1;
                if (Array.isArray(n)) {
                    this.length = n.length;
                    for (let a = 0; a < this.length; a++) o = n[a], s = this._trackByFn(a, o), null !== t && Object.is(t.trackById, s) ? (i && (t = this._verifyReinsertion(t, o, s, a)), Object.is(t.item, o) || this._addIdentityChange(t, o)) : (t = this._mismatch(t, o, s, a), i = !0), t = t._next
                } else r = 0, function Rx(e, n) {
                    if (Array.isArray(e)) for (let t = 0; t < e.length; t++) n(e[t]); else {
                        const t = e[Symbol.iterator]();
                        let i;
                        for (; !(i = t.next()).done;) n(i.value)
                    }
                }(n, a => {
                    s = this._trackByFn(r, a), null !== t && Object.is(t.trackById, s) ? (i && (t = this._verifyReinsertion(t, a, s, r)), Object.is(t.item, a) || this._addIdentityChange(t, a)) : (t = this._mismatch(t, a, s, r), i = !0), t = t._next, r++
                }), this.length = r;
                return this._truncate(t), this.collection = n, this.isDirty
            }

            _reset() {
                if (this.isDirty) {
                    let n;
                    for (n = this._previousItHead = this._itHead; null !== n; n = n._next) n._nextPrevious = n._next;
                    for (n = this._additionsHead; null !== n; n = n._nextAdded) n.previousIndex = n.currentIndex;
                    for (this._additionsHead = this._additionsTail = null, n = this._movesHead; null !== n; n = n._nextMoved) n.previousIndex = n.currentIndex;
                    this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                }
            }

            _mismatch(n, t, i, r) {
                let o;
                return null === n ? o = this._itTail : (o = n._prev, this._remove(n)), null !== (n = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(i, null)) ? (Object.is(n.item, t) || this._addIdentityChange(n, t), this._reinsertAfter(n, o, r)) : null !== (n = null === this._linkedRecords ? null : this._linkedRecords.get(i, r)) ? (Object.is(n.item, t) || this._addIdentityChange(n, t), this._moveAfter(n, o, r)) : n = this._addAfter(new gk(t, i), o, r), n
            }

            _verifyReinsertion(n, t, i, r) {
                let o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(i, null);
                return null !== o ? n = this._reinsertAfter(o, n._prev, r) : n.currentIndex != r && (n.currentIndex = r, this._addToMoves(n, r)), n
            }

            _truncate(n) {
                for (; null !== n;) {
                    const t = n._next;
                    this._addToRemovals(this._unlink(n)), n = t
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }

            _reinsertAfter(n, t, i) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(n);
                const r = n._prevRemoved, o = n._nextRemoved;
                return null === r ? this._removalsHead = o : r._nextRemoved = o, null === o ? this._removalsTail = r : o._prevRemoved = r, this._insertAfter(n, t, i), this._addToMoves(n, i), n
            }

            _moveAfter(n, t, i) {
                return this._unlink(n), this._insertAfter(n, t, i), this._addToMoves(n, i), n
            }

            _addAfter(n, t, i) {
                return this._insertAfter(n, t, i), this._additionsTail = null === this._additionsTail ? this._additionsHead = n : this._additionsTail._nextAdded = n, n
            }

            _insertAfter(n, t, i) {
                const r = null === t ? this._itHead : t._next;
                return n._next = r, n._prev = t, null === r ? this._itTail = n : r._prev = n, null === t ? this._itHead = n : t._next = n, null === this._linkedRecords && (this._linkedRecords = new HE), this._linkedRecords.put(n), n.currentIndex = i, n
            }

            _remove(n) {
                return this._addToRemovals(this._unlink(n))
            }

            _unlink(n) {
                null !== this._linkedRecords && this._linkedRecords.remove(n);
                const t = n._prev, i = n._next;
                return null === t ? this._itHead = i : t._next = i, null === i ? this._itTail = t : i._prev = t, n
            }

            _addToMoves(n, t) {
                return n.previousIndex === t || (this._movesTail = null === this._movesTail ? this._movesHead = n : this._movesTail._nextMoved = n), n
            }

            _addToRemovals(n) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new HE), this._unlinkedRecords.put(n), n.currentIndex = null, n._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = n, n._prevRemoved = null) : (n._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = n), n
            }

            _addIdentityChange(n, t) {
                return n.item = t, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = n : this._identityChangesTail._nextIdentityChange = n, n
            }
        }

        class gk {
            constructor(n, t) {
                this.item = n, this.trackById = t, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
            }
        }

        class mk {
            constructor() {
                this._head = null, this._tail = null
            }

            add(n) {
                null === this._head ? (this._head = this._tail = n, n._nextDup = null, n._prevDup = null) : (this._tail._nextDup = n, n._prevDup = this._tail, n._nextDup = null, this._tail = n)
            }

            get(n, t) {
                let i;
                for (i = this._head; null !== i; i = i._nextDup) if ((null === t || t <= i.currentIndex) && Object.is(i.trackById, n)) return i;
                return null
            }

            remove(n) {
                const t = n._prevDup, i = n._nextDup;
                return null === t ? this._head = i : t._nextDup = i, null === i ? this._tail = t : i._prevDup = t, null === this._head
            }
        }

        class HE {
            constructor() {
                this.map = new Map
            }

            get isEmpty() {
                return 0 === this.map.size
            }

            put(n) {
                const t = n.trackById;
                let i = this.map.get(t);
                i || (i = new mk, this.map.set(t, i)), i.add(n)
            }

            get(n, t) {
                const r = this.map.get(n);
                return r ? r.get(n, t) : null
            }

            remove(n) {
                const t = n.trackById;
                return this.map.get(t).remove(n) && this.map.delete(t), n
            }

            clear() {
                this.map.clear()
            }
        }

        function BE(e, n, t) {
            const i = e.previousIndex;
            if (null === i) return i;
            let r = 0;
            return t && i < t.length && (r = t[i]), i + n + r
        }

        class jE {
            constructor() {
            }

            supports(n) {
                return n instanceof Map || Df(n)
            }

            create() {
                return new vk
            }
        }

        class vk {
            constructor() {
                this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
            }

            get isDirty() {
                return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
            }

            forEachItem(n) {
                let t;
                for (t = this._mapHead; null !== t; t = t._next) n(t)
            }

            forEachPreviousItem(n) {
                let t;
                for (t = this._previousMapHead; null !== t; t = t._nextPrevious) n(t)
            }

            forEachChangedItem(n) {
                let t;
                for (t = this._changesHead; null !== t; t = t._nextChanged) n(t)
            }

            forEachAddedItem(n) {
                let t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t)
            }

            forEachRemovedItem(n) {
                let t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t)
            }

            diff(n) {
                if (n) {
                    if (!(n instanceof Map || Df(n))) throw new S(900, !1)
                } else n = new Map;
                return this.check(n) ? this : null
            }

            onDestroy() {
            }

            check(n) {
                this._reset();
                let t = this._mapHead;
                if (this._appendAfter = null, this._forEach(n, (i, r) => {
                    if (t && t.key === r) this._maybeAddToChanges(t, i), this._appendAfter = t, t = t._next; else {
                        const o = this._getOrCreateRecordForKey(r, i);
                        t = this._insertBeforeOrAppend(t, o)
                    }
                }), t) {
                    t._prev && (t._prev._next = null), this._removalsHead = t;
                    for (let i = t; null !== i; i = i._nextRemoved) i === this._mapHead && (this._mapHead = null), this._records.delete(i.key), i._nextRemoved = i._next, i.previousValue = i.currentValue, i.currentValue = null, i._prev = null, i._next = null
                }
                return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
            }

            _insertBeforeOrAppend(n, t) {
                if (n) {
                    const i = n._prev;
                    return t._next = n, t._prev = i, n._prev = t, i && (i._next = t), n === this._mapHead && (this._mapHead = t), this._appendAfter = n, n
                }
                return this._appendAfter ? (this._appendAfter._next = t, t._prev = this._appendAfter) : this._mapHead = t, this._appendAfter = t, null
            }

            _getOrCreateRecordForKey(n, t) {
                if (this._records.has(n)) {
                    const r = this._records.get(n);
                    this._maybeAddToChanges(r, t);
                    const o = r._prev, s = r._next;
                    return o && (o._next = s), s && (s._prev = o), r._next = null, r._prev = null, r
                }
                const i = new _k(n);
                return this._records.set(n, i), i.currentValue = t, this._addToAdditions(i), i
            }

            _reset() {
                if (this.isDirty) {
                    let n;
                    for (this._previousMapHead = this._mapHead, n = this._previousMapHead; null !== n; n = n._next) n._nextPrevious = n._next;
                    for (n = this._changesHead; null !== n; n = n._nextChanged) n.previousValue = n.currentValue;
                    for (n = this._additionsHead; null != n; n = n._nextAdded) n.previousValue = n.currentValue;
                    this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                }
            }

            _maybeAddToChanges(n, t) {
                Object.is(t, n.currentValue) || (n.previousValue = n.currentValue, n.currentValue = t, this._addToChanges(n))
            }

            _addToAdditions(n) {
                null === this._additionsHead ? this._additionsHead = this._additionsTail = n : (this._additionsTail._nextAdded = n, this._additionsTail = n)
            }

            _addToChanges(n) {
                null === this._changesHead ? this._changesHead = this._changesTail = n : (this._changesTail._nextChanged = n, this._changesTail = n)
            }

            _forEach(n, t) {
                n instanceof Map ? n.forEach(t) : Object.keys(n).forEach(i => t(n[i], i))
            }
        }

        class _k {
            constructor(n) {
                this.key = n, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
            }
        }

        function UE() {
            return new vh([new VE])
        }

        let vh = (() => {
            class e {
                static#e = this.\u0275prov = te({token: e, providedIn: "root", factory: UE});

                constructor(t) {
                    this.factories = t
                }

                static create(t, i) {
                    if (null != i) {
                        const r = i.factories.slice();
                        t = t.concat(r)
                    }
                    return new e(t)
                }

                static extend(t) {
                    return {provide: e, useFactory: i => e.create(t, i || UE()), deps: [[e, new cu, new lu]]}
                }

                find(t) {
                    const i = this.factories.find(r => r.supports(t));
                    if (null != i) return i;
                    throw new S(901, !1)
                }
            }

            return e
        })();

        function $E() {
            return new jl([new jE])
        }

        let jl = (() => {
            class e {
                static#e = this.\u0275prov = te({token: e, providedIn: "root", factory: $E});

                constructor(t) {
                    this.factories = t
                }

                static create(t, i) {
                    if (i) {
                        const r = i.factories.slice();
                        t = t.concat(r)
                    }
                    return new e(t)
                }

                static extend(t) {
                    return {provide: e, useFactory: i => e.create(t, i || $E()), deps: [[e, new cu, new lu]]}
                }

                find(t) {
                    const i = this.factories.find(r => r.supports(t));
                    if (i) return i;
                    throw new S(901, !1)
                }
            }

            return e
        })();
        const wk = AE(null, "core", []);
        let Ek = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(oe(Vn))
                };
                static#t = this.\u0275mod = Wn({type: e});
                static#n = this.\u0275inj = Tn({})

                constructor(t) {
                }
            }

            return e
        })();
        const oD = new R("");

        function Ds(e, n) {
            ft("NgSignals");
            const t = function qI(e) {
                const n = Object.create(WI);
                n.computation = e;
                const t = () => {
                    if (Sp(n), Mc(n), n.value === Us) throw n.error;
                    return n.value
                };
                return t[qt] = n, t
            }(e);
            return n?.equal && (t[qt].equal = n.equal), t
        }

        function bn(e) {
            const n = X(null);
            try {
                return e()
            } finally {
                X(n)
            }
        }

        let gD = null;

        function bs() {
            return gD
        }

        class sF {
        }

        const ri = new R(""), Ah = /\s+/, bD = [];
        let Xr = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(dt), M(tn))
                };
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["", "ngClass", ""]],
                    inputs: {klass: [0, "class", "klass"], ngClass: "ngClass"},
                    standalone: !0
                })

                constructor(t, i) {
                    this._ngEl = t, this._renderer = i, this.initialClasses = bD, this.stateMap = new Map
                }

                set klass(t) {
                    this.initialClasses = null != t ? t.trim().split(Ah) : bD
                }

                set ngClass(t) {
                    this.rawClass = "string" == typeof t ? t.trim().split(Ah) : t
                }

                ngDoCheck() {
                    for (const i of this.initialClasses) this._updateState(i, !0);
                    const t = this.rawClass;
                    if (Array.isArray(t) || t instanceof Set) for (const i of t) this._updateState(i, !0); else if (null != t) for (const i of Object.keys(t)) this._updateState(i, !!t[i]);
                    this._applyStateDiff()
                }

                _updateState(t, i) {
                    const r = this.stateMap.get(t);
                    void 0 !== r ? (r.enabled !== i && (r.changed = !0, r.enabled = i), r.touched = !0) : this.stateMap.set(t, {
                        enabled: i,
                        changed: !0,
                        touched: !0
                    })
                }

                _applyStateDiff() {
                    for (const t of this.stateMap) {
                        const i = t[0], r = t[1];
                        r.changed ? (this._toggleClass(i, r.enabled), r.changed = !1) : r.touched || (r.enabled && this._toggleClass(i, !1), this.stateMap.delete(i)), r.touched = !1
                    }
                }

                _toggleClass(t, i) {
                    (t = t.trim()).length > 0 && t.split(Ah).forEach(r => {
                        i ? this._renderer.addClass(this._ngEl.nativeElement, r) : this._renderer.removeClass(this._ngEl.nativeElement, r)
                    })
                }
            }

            return e
        })();

        class ZF {
            constructor(n, t, i, r) {
                this.$implicit = n, this.ngForOf = t, this.index = i, this.count = r
            }

            get first() {
                return 0 === this.index
            }

            get last() {
                return this.index === this.count - 1
            }

            get even() {
                return this.index % 2 == 0
            }

            get odd() {
                return !this.even
            }
        }

        let Ui = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(yn), M(Pn), M(vh))
                };
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["", "ngFor", "", "ngForOf", ""]],
                    inputs: {ngForOf: "ngForOf", ngForTrackBy: "ngForTrackBy", ngForTemplate: "ngForTemplate"},
                    standalone: !0
                })

                constructor(t, i, r) {
                    this._viewContainer = t, this._template = i, this._differs = r, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null
                }

                set ngForOf(t) {
                    this._ngForOf = t, this._ngForOfDirty = !0
                }

                get ngForTrackBy() {
                    return this._trackByFn
                }

                set ngForTrackBy(t) {
                    this._trackByFn = t
                }

                set ngForTemplate(t) {
                    t && (this._template = t)
                }

                static ngTemplateContextGuard(t, i) {
                    return !0
                }

                ngDoCheck() {
                    if (this._ngForOfDirty) {
                        this._ngForOfDirty = !1;
                        const t = this._ngForOf;
                        !this._differ && t && (this._differ = this._differs.find(t).create(this.ngForTrackBy))
                    }
                    if (this._differ) {
                        const t = this._differ.diff(this._ngForOf);
                        t && this._applyChanges(t)
                    }
                }

                _applyChanges(t) {
                    const i = this._viewContainer;
                    t.forEachOperation((r, o, s) => {
                        if (null == r.previousIndex) i.createEmbeddedView(this._template, new ZF(r.item, this._ngForOf, -1, -1), null === s ? void 0 : s); else if (null == s) i.remove(null === o ? void 0 : o); else if (null !== o) {
                            const a = i.get(o);
                            i.move(a, s), MD(a, r)
                        }
                    });
                    for (let r = 0, o = i.length; r < o; r++) {
                        const a = i.get(r).context;
                        a.index = r, a.count = o, a.ngForOf = this._ngForOf
                    }
                    t.forEachIdentityChange(r => {
                        MD(i.get(r.currentIndex), r)
                    })
                }
            }

            return e
        })();

        function MD(e, n) {
            e.context.$implicit = n.item
        }

        let jn = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(yn), M(Pn))
                };
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["", "ngIf", ""]],
                    inputs: {ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse"},
                    standalone: !0
                })

                constructor(t, i) {
                    this._viewContainer = t, this._context = new YF, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = i
                }

                set ngIf(t) {
                    this._context.$implicit = this._context.ngIf = t, this._updateView()
                }

                set ngIfThen(t) {
                    TD("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView()
                }

                set ngIfElse(t) {
                    TD("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView()
                }

                static ngTemplateContextGuard(t, i) {
                    return !0
                }

                _updateView() {
                    this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                }
            }

            return e
        })();

        class YF {
            constructor() {
                this.$implicit = null, this.ngIf = null
            }
        }

        function TD(e, n) {
            if (n && !n.createEmbeddedView) throw new Error(`${e} must be a TemplateRef, but received '${$e(n)}'.`)
        }

        let OD = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(dt), M(jl), M(tn))
                };
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["", "ngStyle", ""]],
                    inputs: {ngStyle: "ngStyle"},
                    standalone: !0
                })

                constructor(t, i, r) {
                    this._ngEl = t, this._differs = i, this._renderer = r, this._ngStyle = null, this._differ = null
                }

                set ngStyle(t) {
                    this._ngStyle = t, !this._differ && t && (this._differ = this._differs.find(t).create())
                }

                ngDoCheck() {
                    if (this._differ) {
                        const t = this._differ.diff(this._ngStyle);
                        t && this._applyChanges(t)
                    }
                }

                _setStyle(t, i) {
                    const [r, o] = t.split("."), s = -1 === r.indexOf("-") ? void 0 : Xn.DashCase;
                    null != i ? this._renderer.setStyle(this._ngEl.nativeElement, r, o ? `${i}${o}` : i, s) : this._renderer.removeStyle(this._ngEl.nativeElement, r, s)
                }

                _applyChanges(t) {
                    t.forEachRemovedItem(i => this._setStyle(i.key, null)), t.forEachAddedItem(i => this._setStyle(i.key, i.currentValue)), t.forEachChangedItem(i => this._setStyle(i.key, i.currentValue))
                }
            }

            return e
        })(), ND = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(yn))
                };
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["", "ngTemplateOutlet", ""]],
                    inputs: {
                        ngTemplateOutletContext: "ngTemplateOutletContext",
                        ngTemplateOutlet: "ngTemplateOutlet",
                        ngTemplateOutletInjector: "ngTemplateOutletInjector"
                    },
                    standalone: !0,
                    features: [hn]
                })

                constructor(t) {
                    this._viewContainerRef = t, this._viewRef = null, this.ngTemplateOutletContext = null, this.ngTemplateOutlet = null, this.ngTemplateOutletInjector = null
                }

                ngOnChanges(t) {
                    if (this._shouldRecreateView(t)) {
                        const i = this._viewContainerRef;
                        if (this._viewRef && i.remove(i.indexOf(this._viewRef)), !this.ngTemplateOutlet) return void (this._viewRef = null);
                        const r = this._createContextForwardProxy();
                        this._viewRef = i.createEmbeddedView(this.ngTemplateOutlet, r, {injector: this.ngTemplateOutletInjector ?? void 0})
                    }
                }

                _shouldRecreateView(t) {
                    return !!t.ngTemplateOutlet || !!t.ngTemplateOutletInjector
                }

                _createContextForwardProxy() {
                    return new Proxy({}, {
                        set: (t, i, r) => !!this.ngTemplateOutletContext && Reflect.set(this.ngTemplateOutletContext, i, r),
                        get: (t, i, r) => {
                            if (this.ngTemplateOutletContext) return Reflect.get(this.ngTemplateOutletContext, i, r)
                        }
                    })
                }
            }

            return e
        })();
        let xD = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275pipe = Ct({name: "slice", type: e, pure: !1, standalone: !0})

                transform(t, i, r) {
                    if (null == t) return null;
                    if (!this.supports(t)) throw function sn(e, n) {
                        return new S(2100, !1)
                    }();
                    return t.slice(i, r)
                }

                supports(t) {
                    return "string" == typeof t || Array.isArray(t)
                }
            }

            return e
        })(), RD = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275mod = Wn({type: e});
                static#n = this.\u0275inj = Tn({})
            }

            return e
        })();

        function PD(e) {
            return "server" === e
        }

        class K2 extends sF {
            constructor() {
                super(...arguments), this.supportsDOMEvents = !0
            }
        }

        class Hh extends K2 {
            static makeCurrent() {
                !function oF(e) {
                    gD ??= e
                }(new Hh)
            }

            onAndCancel(n, t, i) {
                return n.addEventListener(t, i), () => {
                    n.removeEventListener(t, i)
                }
            }

            dispatchEvent(n, t) {
                n.dispatchEvent(t)
            }

            remove(n) {
                n.remove()
            }

            createElement(n, t) {
                return (t = t || this.getDefaultDocument()).createElement(n)
            }

            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }

            getDefaultDocument() {
                return document
            }

            isElementNode(n) {
                return n.nodeType === Node.ELEMENT_NODE
            }

            isShadowRoot(n) {
                return n instanceof DocumentFragment
            }

            getGlobalEventTarget(n, t) {
                return "window" === t ? window : "document" === t ? n : "body" === t ? n.body : null
            }

            getBaseHref(n) {
                const t = function X2() {
                    return Ss = Ss || document.querySelector("base"), Ss ? Ss.getAttribute("href") : null
                }();
                return null == t ? null : function J2(e) {
                    return new URL(e, document.baseURI).pathname
                }(t)
            }

            resetBaseElement() {
                Ss = null
            }

            getUserAgent() {
                return window.navigator.userAgent
            }

            getCookie(n) {
                return function qF(e, n) {
                    n = encodeURIComponent(n);
                    for (const t of e.split(";")) {
                        const i = t.indexOf("="), [r, o] = -1 == i ? [t, ""] : [t.slice(0, i), t.slice(i + 1)];
                        if (r.trim() === n) return decodeURIComponent(o)
                    }
                    return null
                }(document.cookie, n)
            }
        }

        let Ss = null, tV = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac})

                build() {
                    return new XMLHttpRequest
                }
            }

            return e
        })();
        const lc = new R("");
        let GD = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(oe(lc), oe(ge))
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac})

                constructor(t, i) {
                    this._zone = i, this._eventNameToPlugin = new Map, t.forEach(r => {
                        r.manager = this
                    }), this._plugins = t.slice().reverse()
                }

                addEventListener(t, i, r) {
                    return this._findPluginFor(i).addEventListener(t, i, r)
                }

                getZone() {
                    return this._zone
                }

                _findPluginFor(t) {
                    let i = this._eventNameToPlugin.get(t);
                    if (i) return i;
                    if (i = this._plugins.find(o => o.supports(t)), !i) throw new S(5101, !1);
                    return this._eventNameToPlugin.set(t, i), i
                }
            }

            return e
        })();

        class Bh {
            constructor(n) {
                this._doc = n
            }
        }

        const jh = "ng-app-id";
        let qD = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(oe(ri), oe(vr), oe(vv, 8), oe(Mi))
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac})

                constructor(t, i, r, o = {}) {
                    this.doc = t, this.appId = i, this.nonce = r, this.platformId = o, this.styleRef = new Map, this.hostNodes = new Set, this.styleNodesInDOM = this.collectServerRenderedStyles(), this.platformIsServer = PD(o), this.resetHostNodes()
                }

                addStyles(t) {
                    for (const i of t) 1 === this.changeUsageCount(i, 1) && this.onStyleAdded(i)
                }

                removeStyles(t) {
                    for (const i of t) this.changeUsageCount(i, -1) <= 0 && this.onStyleRemoved(i)
                }

                ngOnDestroy() {
                    const t = this.styleNodesInDOM;
                    t && (t.forEach(i => i.remove()), t.clear());
                    for (const i of this.getAllStyles()) this.onStyleRemoved(i);
                    this.resetHostNodes()
                }

                addHost(t) {
                    this.hostNodes.add(t);
                    for (const i of this.getAllStyles()) this.addStyleToHost(t, i)
                }

                removeHost(t) {
                    this.hostNodes.delete(t)
                }

                getAllStyles() {
                    return this.styleRef.keys()
                }

                onStyleAdded(t) {
                    for (const i of this.hostNodes) this.addStyleToHost(i, t)
                }

                onStyleRemoved(t) {
                    const i = this.styleRef;
                    i.get(t)?.elements?.forEach(r => r.remove()), i.delete(t)
                }

                collectServerRenderedStyles() {
                    const t = this.doc.head?.querySelectorAll(`style[${jh}="${this.appId}"]`);
                    if (t?.length) {
                        const i = new Map;
                        return t.forEach(r => {
                            null != r.textContent && i.set(r.textContent, r)
                        }), i
                    }
                    return null
                }

                changeUsageCount(t, i) {
                    const r = this.styleRef;
                    if (r.has(t)) {
                        const o = r.get(t);
                        return o.usage += i, o.usage
                    }
                    return r.set(t, {usage: i, elements: []}), i
                }

                getStyleElement(t, i) {
                    const r = this.styleNodesInDOM, o = r?.get(i);
                    if (o?.parentNode === t) return r.delete(i), o.removeAttribute(jh), o;
                    {
                        const s = this.doc.createElement("style");
                        return this.nonce && s.setAttribute("nonce", this.nonce), s.textContent = i, this.platformIsServer && s.setAttribute(jh, this.appId), t.appendChild(s), s
                    }
                }

                addStyleToHost(t, i) {
                    const r = this.getStyleElement(t, i), o = this.styleRef, s = o.get(i)?.elements;
                    s ? s.push(r) : o.set(i, {elements: [r], usage: 1})
                }

                resetHostNodes() {
                    const t = this.hostNodes;
                    t.clear(), t.add(this.doc.head)
                }
            }

            return e
        })();
        const Uh = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/",
            math: "http://www.w3.org/1998/Math/MathML"
        }, $h = /%COMP%/g, oV = new R("", {providedIn: "root", factory: () => !0});

        function ZD(e, n) {
            return n.map(t => t.replace($h, e))
        }

        let YD = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(oe(GD), oe(qD), oe(vr), oe(oV), oe(ri), oe(Mi), oe(ge), oe(vv))
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac})

                constructor(t, i, r, o, s, a, l, c = null) {
                    this.eventManager = t, this.sharedStylesHost = i, this.appId = r, this.removeStylesOnCompDestroy = o, this.doc = s, this.platformId = a, this.ngZone = l, this.nonce = c, this.rendererByCompId = new Map, this.platformIsServer = PD(a), this.defaultRenderer = new zh(t, s, l, this.platformIsServer)
                }

                createRenderer(t, i) {
                    if (!t || !i) return this.defaultRenderer;
                    this.platformIsServer && i.encapsulation === Wt.ShadowDom && (i = {
                        ...i,
                        encapsulation: Wt.Emulated
                    });
                    const r = this.getOrCreateRenderer(t, i);
                    return r instanceof KD ? r.applyToHost(t) : r instanceof Gh && r.applyStyles(), r
                }

                getOrCreateRenderer(t, i) {
                    const r = this.rendererByCompId;
                    let o = r.get(i.id);
                    if (!o) {
                        const s = this.doc, a = this.ngZone, l = this.eventManager, c = this.sharedStylesHost,
                            u = this.removeStylesOnCompDestroy, d = this.platformIsServer;
                        switch (i.encapsulation) {
                            case Wt.Emulated:
                                o = new KD(l, c, i, this.appId, u, s, a, d);
                                break;
                            case Wt.ShadowDom:
                                return new cV(l, c, t, i, s, a, this.nonce, d);
                            default:
                                o = new Gh(l, c, i, u, s, a, d)
                        }
                        r.set(i.id, o)
                    }
                    return o
                }

                ngOnDestroy() {
                    this.rendererByCompId.clear()
                }
            }

            return e
        })();

        class zh {
            constructor(n, t, i, r) {
                this.eventManager = n, this.doc = t, this.ngZone = i, this.platformIsServer = r, this.data = Object.create(null), this.throwOnSyntheticProps = !0, this.destroyNode = null
            }

            destroy() {
            }

            createElement(n, t) {
                return t ? this.doc.createElementNS(Uh[t] || t, n) : this.doc.createElement(n)
            }

            createComment(n) {
                return this.doc.createComment(n)
            }

            createText(n) {
                return this.doc.createTextNode(n)
            }

            appendChild(n, t) {
                (QD(n) ? n.content : n).appendChild(t)
            }

            insertBefore(n, t, i) {
                n && (QD(n) ? n.content : n).insertBefore(t, i)
            }

            removeChild(n, t) {
                t.remove()
            }

            selectRootElement(n, t) {
                let i = "string" == typeof n ? this.doc.querySelector(n) : n;
                if (!i) throw new S(-5104, !1);
                return t || (i.textContent = ""), i
            }

            parentNode(n) {
                return n.parentNode
            }

            nextSibling(n) {
                return n.nextSibling
            }

            setAttribute(n, t, i, r) {
                if (r) {
                    t = r + ":" + t;
                    const o = Uh[r];
                    o ? n.setAttributeNS(o, t, i) : n.setAttribute(t, i)
                } else n.setAttribute(t, i)
            }

            removeAttribute(n, t, i) {
                if (i) {
                    const r = Uh[i];
                    r ? n.removeAttributeNS(r, t) : n.removeAttribute(`${i}:${t}`)
                } else n.removeAttribute(t)
            }

            addClass(n, t) {
                n.classList.add(t)
            }

            removeClass(n, t) {
                n.classList.remove(t)
            }

            setStyle(n, t, i, r) {
                r & (Xn.DashCase | Xn.Important) ? n.style.setProperty(t, i, r & Xn.Important ? "important" : "") : n.style[t] = i
            }

            removeStyle(n, t, i) {
                i & Xn.DashCase ? n.style.removeProperty(t) : n.style[t] = ""
            }

            setProperty(n, t, i) {
                null != n && (n[t] = i)
            }

            setValue(n, t) {
                n.nodeValue = t
            }

            listen(n, t, i) {
                if ("string" == typeof n && !(n = bs().getGlobalEventTarget(this.doc, n))) throw new Error(`Unsupported event target ${n} for event ${t}`);
                return this.eventManager.addEventListener(n, t, this.decoratePreventDefault(i))
            }

            decoratePreventDefault(n) {
                return t => {
                    if ("__ngUnwrap__" === t) return n;
                    !1 === (this.platformIsServer ? this.ngZone.runGuarded(() => n(t)) : n(t)) && t.preventDefault()
                }
            }
        }

        function QD(e) {
            return "TEMPLATE" === e.tagName && void 0 !== e.content
        }

        class cV extends zh {
            constructor(n, t, i, r, o, s, a, l) {
                super(n, o, s, l), this.sharedStylesHost = t, this.hostEl = i, this.shadowRoot = i.attachShadow({mode: "open"}), this.sharedStylesHost.addHost(this.shadowRoot);
                const c = ZD(r.id, r.styles);
                for (const u of c) {
                    const d = document.createElement("style");
                    a && d.setAttribute("nonce", a), d.textContent = u, this.shadowRoot.appendChild(d)
                }
            }

            nodeOrShadowRoot(n) {
                return n === this.hostEl ? this.shadowRoot : n
            }

            appendChild(n, t) {
                return super.appendChild(this.nodeOrShadowRoot(n), t)
            }

            insertBefore(n, t, i) {
                return super.insertBefore(this.nodeOrShadowRoot(n), t, i)
            }

            removeChild(n, t) {
                return super.removeChild(null, t)
            }

            parentNode(n) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))
            }

            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
        }

        class Gh extends zh {
            constructor(n, t, i, r, o, s, a, l) {
                super(n, o, s, a), this.sharedStylesHost = t, this.removeStylesOnCompDestroy = r, this.styles = l ? ZD(l, i.styles) : i.styles
            }

            applyStyles() {
                this.sharedStylesHost.addStyles(this.styles)
            }

            destroy() {
                this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles)
            }
        }

        class KD extends Gh {
            constructor(n, t, i, r, o, s, a, l) {
                const c = r + "-" + i.id;
                super(n, t, i, o, s, a, l, c), this.contentAttr = function sV(e) {
                    return "_ngcontent-%COMP%".replace($h, e)
                }(c), this.hostAttr = function aV(e) {
                    return "_nghost-%COMP%".replace($h, e)
                }(c)
            }

            applyToHost(n) {
                this.applyStyles(), this.setAttribute(n, this.hostAttr, "")
            }

            createElement(n, t) {
                const i = super.createElement(n, t);
                return super.setAttribute(i, this.contentAttr, ""), i
            }
        }

        let uV = (() => {
            class e extends Bh {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(oe(ri))
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac})

                constructor(t) {
                    super(t)
                }

                supports(t) {
                    return !0
                }

                addEventListener(t, i, r) {
                    return t.addEventListener(i, r, !1), () => this.removeEventListener(t, i, r)
                }

                removeEventListener(t, i, r) {
                    return t.removeEventListener(i, r)
                }
            }

            return e
        })(), dV = (() => {
            class e extends Bh {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(oe(ri))
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac})

                constructor(t) {
                    super(t), this.delegate = L(oD, {optional: !0})
                }

                supports(t) {
                    return !!this.delegate && this.delegate.supports(t)
                }

                addEventListener(t, i, r) {
                    return this.delegate.addEventListener(t, i, r)
                }

                removeEventListener(t, i, r) {
                    return this.delegate.removeEventListener(t, i, r)
                }
            }

            return e
        })();
        const XD = ["alt", "control", "meta", "shift"], fV = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }, hV = {alt: e => e.altKey, control: e => e.ctrlKey, meta: e => e.metaKey, shift: e => e.shiftKey};
        let pV = (() => {
            class e extends Bh {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(oe(ri))
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac})

                constructor(t) {
                    super(t)
                }

                static parseEventName(t) {
                    const i = t.toLowerCase().split("."), r = i.shift();
                    if (0 === i.length || "keydown" !== r && "keyup" !== r) return null;
                    const o = e._normalizeKey(i.pop());
                    let s = "", a = i.indexOf("code");
                    if (a > -1 && (i.splice(a, 1), s = "code."), XD.forEach(c => {
                        const u = i.indexOf(c);
                        u > -1 && (i.splice(u, 1), s += c + ".")
                    }), s += o, 0 != i.length || 0 === o.length) return null;
                    const l = {};
                    return l.domEventName = r, l.fullKey = s, l
                }

                static matchEventFullKeyCode(t, i) {
                    let r = fV[t.key] || t.key, o = "";
                    return i.indexOf("code.") > -1 && (r = t.code, o = "code."), !(null == r || !r) && (r = r.toLowerCase(), " " === r ? r = "space" : "." === r && (r = "dot"), XD.forEach(s => {
                        s !== r && (0, hV[s])(t) && (o += s + ".")
                    }), o += r, o === i)
                }

                static eventCallback(t, i, r) {
                    return o => {
                        e.matchEventFullKeyCode(o, t) && r.runGuarded(() => i(o))
                    }
                }

                static _normalizeKey(t) {
                    return "esc" === t ? "escape" : t
                }

                supports(t) {
                    return null != e.parseEventName(t)
                }

                addEventListener(t, i, r) {
                    const o = e.parseEventName(i), s = e.eventCallback(o.fullKey, r, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(() => bs().onAndCancel(t, o.domEventName, s))
                }
            }

            return e
        })();
        const _V = AE(wk, "browser", [{provide: Mi, useValue: "browser"}, {
                provide: mv, useValue: function gV() {
                    Hh.makeCurrent()
                }, multi: !0
            }, {
                provide: ri, useFactory: function vV() {
                    return function GS(e) {
                        sd = e
                    }(document), document
                }, deps: []
            }]), yV = new R(""), tb = [{
                provide: Ll, useClass: class eV {
                    addToWindow(n) {
                        be.getAngularTestability = (i, r = !0) => {
                            const o = n.findTestabilityInTree(i, r);
                            if (null == o) throw new S(5103, !1);
                            return o
                        }, be.getAllAngularTestabilities = () => n.getAllTestabilities(), be.getAllAngularRootElements = () => n.getAllRootElements(), be.frameworkStabilizers || (be.frameworkStabilizers = []), be.frameworkStabilizers.push(i => {
                            const r = be.getAllAngularTestabilities();
                            let o = r.length;
                            const s = function () {
                                o--, 0 == o && i()
                            };
                            r.forEach(a => {
                                a.whenStable(s)
                            })
                        })
                    }

                    findTestabilityInTree(n, t, i) {
                        return null == t ? null : n.getTestability(t) ?? (i ? bs().isShadowRoot(t) ? this.findTestabilityInTree(n, t.host, !0) : this.findTestabilityInTree(n, t.parentElement, !0) : null)
                    }
                }, deps: []
            }, {provide: _E, useClass: rh, deps: [ge, oh, Ll]}, {provide: rh, useClass: rh, deps: [ge, oh, Ll]}],
            nb = [{provide: _u, useValue: "root"}, {
                provide: vn, useFactory: function mV() {
                    return new vn
                }, deps: []
            }, {provide: lc, useClass: uV, multi: !0, deps: [ri, ge, Mi]}, {
                provide: lc,
                useClass: pV,
                multi: !0,
                deps: [ri]
            }, {provide: lc, useClass: dV, multi: !0}, YD, qD, GD, {provide: lf, useExisting: YD}, {
                provide: class D2 {
                }, useClass: tV, deps: []
            }, []];
        let CV = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(oe(yV, 12))
                };
                static#t = this.\u0275mod = Wn({type: e});
                static#n = this.\u0275inj = Tn({providers: [...nb, ...tb], imports: [RD, Ek]})

                constructor(t) {
                }

                static withServerTransition(t) {
                    return {ngModule: e, providers: [{provide: vr, useValue: t.appId}]}
                }
            }

            return e
        })();

        function oi(e) {
            return this instanceof oi ? (this.v = e, this) : new oi(e)
        }

        function lb(e) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var t, n = e[Symbol.asyncIterator];
            return n ? n.call(e) : (e = function Yh(e) {
                var n = "function" == typeof Symbol && Symbol.iterator, t = n && e[n], i = 0;
                if (t) return t.call(e);
                if (e && "number" == typeof e.length) return {
                    next: function () {
                        return e && i >= e.length && (e = void 0), {value: e && e[i++], done: !e}
                    }
                };
                throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }(e), t = {}, i("next"), i("throw"), i("return"), t[Symbol.asyncIterator] = function () {
                return this
            }, t);

            function i(o) {
                t[o] = e[o] && function (s) {
                    return new Promise(function (a, l) {
                        !function r(o, s, a, l) {
                            Promise.resolve(l).then(function (c) {
                                o({value: c, done: a})
                            }, s)
                        }(a, l, (s = e[o](s)).done, s.value)
                    })
                }
            }
        }

        "function" == typeof SuppressedError && SuppressedError;
        const cb = e => e && "number" == typeof e.length && "function" != typeof e;

        function ub(e) {
            return Fe(e?.then)
        }

        function db(e) {
            return Fe(e[Vc])
        }

        function fb(e) {
            return Symbol.asyncIterator && Fe(e?.[Symbol.asyncIterator])
        }

        function hb(e) {
            return new TypeError(`You provided ${null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
        }

        const pb = function GV() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }();

        function gb(e) {
            return Fe(e?.[pb])
        }

        function mb(e) {
            return function ab(e, n, t) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var r, i = t.apply(e, n || []), o = [];
                return r = {}, a("next"), a("throw"), a("return", function s(p) {
                    return function (g) {
                        return Promise.resolve(g).then(p, d)
                    }
                }), r[Symbol.asyncIterator] = function () {
                    return this
                }, r;

                function a(p, g) {
                    i[p] && (r[p] = function (C) {
                        return new Promise(function (D, T) {
                            o.push([p, C, D, T]) > 1 || l(p, C)
                        })
                    }, g && (r[p] = g(r[p])))
                }

                function l(p, g) {
                    try {
                        !function c(p) {
                            p.value instanceof oi ? Promise.resolve(p.value.v).then(u, d) : h(o[0][2], p)
                        }(i[p](g))
                    } catch (C) {
                        h(o[0][3], C)
                    }
                }

                function u(p) {
                    l("next", p)
                }

                function d(p) {
                    l("throw", p)
                }

                function h(p, g) {
                    p(g), o.shift(), o.length && l(o[0][0], o[0][1])
                }
            }(this, arguments, function* () {
                const t = e.getReader();
                try {
                    for (; ;) {
                        const {value: i, done: r} = yield oi(t.read());
                        if (r) return yield oi(void 0);
                        yield yield oi(i)
                    }
                } finally {
                    t.releaseLock()
                }
            })
        }

        function vb(e) {
            return Fe(e?.getReader)
        }

        function Os(e) {
            if (e instanceof St) return e;
            if (null != e) {
                if (db(e)) return function qV(e) {
                    return new St(n => {
                        const t = e[Vc]();
                        if (Fe(t.subscribe)) return t.subscribe(n);
                        throw new TypeError("Provided object does not correctly implement Symbol.observable")
                    })
                }(e);
                if (cb(e)) return function WV(e) {
                    return new St(n => {
                        for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
                        n.complete()
                    })
                }(e);
                if (ub(e)) return function ZV(e) {
                    return new St(n => {
                        e.then(t => {
                            n.closed || (n.next(t), n.complete())
                        }, t => n.error(t)).then(null, $p)
                    })
                }(e);
                if (fb(e)) return _b(e);
                if (gb(e)) return function YV(e) {
                    return new St(n => {
                        for (const t of e) if (n.next(t), n.closed) return;
                        n.complete()
                    })
                }(e);
                if (vb(e)) return function QV(e) {
                    return _b(mb(e))
                }(e)
            }
            throw hb(e)
        }

        function _b(e) {
            return new St(n => {
                (function KV(e, n) {
                    var t, i, r, o;
                    return function ob(e, n, t, i) {
                        return new (t || (t = Promise))(function (o, s) {
                            function a(u) {
                                try {
                                    c(i.next(u))
                                } catch (d) {
                                    s(d)
                                }
                            }

                            function l(u) {
                                try {
                                    c(i.throw(u))
                                } catch (d) {
                                    s(d)
                                }
                            }

                            function c(u) {
                                u.done ? o(u.value) : function r(o) {
                                    return o instanceof t ? o : new t(function (s) {
                                        s(o)
                                    })
                                }(u.value).then(a, l)
                            }

                            c((i = i.apply(e, n || [])).next())
                        })
                    }(this, void 0, void 0, function* () {
                        try {
                            for (t = lb(e); !(i = yield t.next()).done;) if (n.next(i.value), n.closed) return
                        } catch (s) {
                            r = {error: s}
                        } finally {
                            try {
                                i && !i.done && (o = t.return) && (yield o.call(t))
                            } finally {
                                if (r) throw r.error
                            }
                        }
                        n.complete()
                    })
                })(e, n).catch(t => n.error(t))
            })
        }

        function zi(e, n, t, i = 0, r = !1) {
            const o = n.schedule(function () {
                t(), r ? e.add(this.schedule(null, i)) : this.unsubscribe()
            }, i);
            if (e.add(o), !r) return o
        }

        function yb(e, n = 0) {
            return pi((t, i) => {
                t.subscribe(Un(i, r => zi(i, e, () => i.next(r), n), () => zi(i, e, () => i.complete(), n), r => zi(i, e, () => i.error(r), n)))
            })
        }

        function Cb(e, n = 0) {
            return pi((t, i) => {
                i.add(e.schedule(() => t.subscribe(i), n))
            })
        }

        function wb(e, n) {
            if (!e) throw new Error("Iterable cannot be null");
            return new St(t => {
                zi(t, n, () => {
                    const i = e[Symbol.asyncIterator]();
                    zi(t, n, () => {
                        i.next().then(r => {
                            r.done ? t.complete() : t.next(r.value)
                        })
                    }, 0, !0)
                })
            })
        }

        const {isArray: oH} = Array, {getPrototypeOf: sH, prototype: aH, keys: lH} = Object;
        const {isArray: fH} = Array;

        function gH(e, n) {
            return e.reduce((t, i, r) => (t[i] = n[r], t), {})
        }

        function mH(...e) {
            const n = function dH(e) {
                return Fe(function Qh(e) {
                    return e[e.length - 1]
                }(e)) ? e.pop() : void 0
            }(e), {args: t, keys: i} = function cH(e) {
                if (1 === e.length) {
                    const n = e[0];
                    if (oH(n)) return {args: n, keys: null};
                    if (function uH(e) {
                        return e && "object" == typeof e && sH(e) === aH
                    }(n)) {
                        const t = lH(n);
                        return {args: t.map(i => n[i]), keys: t}
                    }
                }
                return {args: e, keys: null}
            }(e), r = new St(o => {
                const {length: s} = t;
                if (!s) return void o.complete();
                const a = new Array(s);
                let l = s, c = s;
                for (let u = 0; u < s; u++) {
                    let d = !1;
                    Os(t[u]).subscribe(Un(o, h => {
                        d || (d = !0, c--), a[u] = h
                    }, () => l--, void 0, () => {
                        (!l || !d) && (c || o.next(i ? gH(i, a) : a), o.complete())
                    }))
                }
            });
            return n ? r.pipe(function pH(e) {
                return Bc(n => function hH(e, n) {
                    return fH(n) ? e(...n) : e(n)
                }(e, n))
            }(n)) : r
        }

        let Eb = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(tn), M(dt))
                };
                static#t = this.\u0275dir = z({type: e})

                constructor(t, i) {
                    this._renderer = t, this._elementRef = i, this.onChange = r => {
                    }, this.onTouched = () => {
                    }
                }

                setProperty(t, i) {
                    this._renderer.setProperty(this._elementRef.nativeElement, t, i)
                }

                registerOnTouched(t) {
                    this.onTouched = t
                }

                registerOnChange(t) {
                    this.onChange = t
                }

                setDisabledState(t) {
                    this.setProperty("disabled", t)
                }
            }

            return e
        })(), Gi = (() => {
            class e extends Eb {
                static#e = this.\u0275fac = (() => {
                    let t;
                    return function (r) {
                        return (t || (t = rt(e)))(r || e)
                    }
                })();
                static#t = this.\u0275dir = z({type: e, features: [ue]})
            }

            return e
        })();
        const an = new R(""), vH = {provide: an, useExisting: me(() => Kh), multi: !0};
        let Kh = (() => {
            class e extends Gi {
                static#e = this.\u0275fac = (() => {
                    let t;
                    return function (r) {
                        return (t || (t = rt(e)))(r || e)
                    }
                })();
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["input", "type", "checkbox", "formControlName", ""], ["input", "type", "checkbox", "formControl", ""], ["input", "type", "checkbox", "ngModel", ""]],
                    hostBindings: function (i, r) {
                        1 & i && W("change", function (s) {
                            return r.onChange(s.target.checked)
                        })("blur", function () {
                            return r.onTouched()
                        })
                    },
                    features: [Me([vH]), ue]
                })

                writeValue(t) {
                    this.setProperty("checked", t)
                }
            }

            return e
        })();
        const _H = {provide: an, useExisting: me(() => Ns), multi: !0}, CH = new R("");
        let Ns = (() => {
            class e extends Eb {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(tn), M(dt), M(CH, 8))
                };
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
                    hostBindings: function (i, r) {
                        1 & i && W("input", function (s) {
                            return r._handleInput(s.target.value)
                        })("blur", function () {
                            return r.onTouched()
                        })("compositionstart", function () {
                            return r._compositionStart()
                        })("compositionend", function (s) {
                            return r._compositionEnd(s.target.value)
                        })
                    },
                    features: [Me([_H]), ue]
                })

                constructor(t, i, r) {
                    super(t, i), this._compositionMode = r, this._composing = !1, null == this._compositionMode && (this._compositionMode = !function yH() {
                        const e = bs() ? bs().getUserAgent() : "";
                        return /android (\d+)/.test(e.toLowerCase())
                    }())
                }

                writeValue(t) {
                    this.setProperty("value", t ?? "")
                }

                _handleInput(t) {
                    (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(t)
                }

                _compositionStart() {
                    this._composing = !0
                }

                _compositionEnd(t) {
                    this._composing = !1, this._compositionMode && this.onChange(t)
                }
            }

            return e
        })();
        const at = new R(""), ai = new R("");

        function xb(e) {
            return null != e
        }

        function Rb(e) {
            return Pl(e) ? function rH(e, n) {
                return n ? function iH(e, n) {
                    if (null != e) {
                        if (db(e)) return function XV(e, n) {
                            return Os(e).pipe(Cb(n), yb(n))
                        }(e, n);
                        if (cb(e)) return function eH(e, n) {
                            return new St(t => {
                                let i = 0;
                                return n.schedule(function () {
                                    i === e.length ? t.complete() : (t.next(e[i++]), t.closed || this.schedule())
                                })
                            })
                        }(e, n);
                        if (ub(e)) return function JV(e, n) {
                            return Os(e).pipe(Cb(n), yb(n))
                        }(e, n);
                        if (fb(e)) return wb(e, n);
                        if (gb(e)) return function tH(e, n) {
                            return new St(t => {
                                let i;
                                return zi(t, n, () => {
                                    i = e[pb](), zi(t, n, () => {
                                        let r, o;
                                        try {
                                            ({value: r, done: o} = i.next())
                                        } catch (s) {
                                            return void t.error(s)
                                        }
                                        o ? t.complete() : t.next(r)
                                    }, 0, !0)
                                }), () => Fe(i?.return) && i.return()
                            })
                        }(e, n);
                        if (vb(e)) return function nH(e, n) {
                            return wb(mb(e), n)
                        }(e, n)
                    }
                    throw hb(e)
                }(e, n) : Os(e)
            }(e) : e
        }

        function Lb(e) {
            let n = {};
            return e.forEach(t => {
                n = null != t ? {...n, ...t} : n
            }), 0 === Object.keys(n).length ? null : n
        }

        function Pb(e, n) {
            return n.map(t => t(e))
        }

        function kb(e) {
            return e.map(n => function EH(e) {
                return !e.validate
            }(n) ? n : t => n.validate(t))
        }

        function Xh(e) {
            return null != e ? function Fb(e) {
                if (!e) return null;
                const n = e.filter(xb);
                return 0 == n.length ? null : function (t) {
                    return Lb(Pb(t, n))
                }
            }(kb(e)) : null
        }

        function Jh(e) {
            return null != e ? function Vb(e) {
                if (!e) return null;
                const n = e.filter(xb);
                return 0 == n.length ? null : function (t) {
                    return mH(Pb(t, n).map(Rb)).pipe(Bc(Lb))
                }
            }(kb(e)) : null
        }

        function Hb(e, n) {
            return null === e ? [n] : Array.isArray(e) ? [...e, n] : [e, n]
        }

        function ep(e) {
            return e ? Array.isArray(e) ? e : [e] : []
        }

        function dc(e, n) {
            return Array.isArray(e) ? e.includes(n) : e === n
        }

        function Ub(e, n) {
            const t = ep(n);
            return ep(e).forEach(r => {
                dc(t, r) || t.push(r)
            }), t
        }

        function $b(e, n) {
            return ep(n).filter(t => !dc(e, t))
        }

        class zb {
            constructor() {
                this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
            }

            get value() {
                return this.control ? this.control.value : null
            }

            get valid() {
                return this.control ? this.control.valid : null
            }

            get invalid() {
                return this.control ? this.control.invalid : null
            }

            get pending() {
                return this.control ? this.control.pending : null
            }

            get disabled() {
                return this.control ? this.control.disabled : null
            }

            get enabled() {
                return this.control ? this.control.enabled : null
            }

            get errors() {
                return this.control ? this.control.errors : null
            }

            get pristine() {
                return this.control ? this.control.pristine : null
            }

            get dirty() {
                return this.control ? this.control.dirty : null
            }

            get touched() {
                return this.control ? this.control.touched : null
            }

            get status() {
                return this.control ? this.control.status : null
            }

            get untouched() {
                return this.control ? this.control.untouched : null
            }

            get statusChanges() {
                return this.control ? this.control.statusChanges : null
            }

            get valueChanges() {
                return this.control ? this.control.valueChanges : null
            }

            get path() {
                return null
            }

            get validator() {
                return this._composedValidatorFn || null
            }

            get asyncValidator() {
                return this._composedAsyncValidatorFn || null
            }

            _setValidators(n) {
                this._rawValidators = n || [], this._composedValidatorFn = Xh(this._rawValidators)
            }

            _setAsyncValidators(n) {
                this._rawAsyncValidators = n || [], this._composedAsyncValidatorFn = Jh(this._rawAsyncValidators)
            }

            _registerOnDestroy(n) {
                this._onDestroyCallbacks.push(n)
            }

            _invokeOnDestroyCallbacks() {
                this._onDestroyCallbacks.forEach(n => n()), this._onDestroyCallbacks = []
            }

            reset(n = void 0) {
                this.control && this.control.reset(n)
            }

            hasError(n, t) {
                return !!this.control && this.control.hasError(n, t)
            }

            getError(n, t) {
                return this.control ? this.control.getError(n, t) : null
            }
        }

        class vt extends zb {
            get formDirective() {
                return null
            }

            get path() {
                return null
            }
        }

        class li extends zb {
            constructor() {
                super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
            }
        }

        class Gb {
            constructor(n) {
                this._cd = n
            }

            get isTouched() {
                return this._cd?.control?._touched?.(), !!this._cd?.control?.touched
            }

            get isUntouched() {
                return !!this._cd?.control?.untouched
            }

            get isPristine() {
                return this._cd?.control?._pristine?.(), !!this._cd?.control?.pristine
            }

            get isDirty() {
                return !!this._cd?.control?.dirty
            }

            get isValid() {
                return this._cd?.control?._status?.(), !!this._cd?.control?.valid
            }

            get isInvalid() {
                return !!this._cd?.control?.invalid
            }

            get isPending() {
                return !!this._cd?.control?.pending
            }

            get isSubmitted() {
                return this._cd?._submitted?.(), !!this._cd?.submitted
            }
        }

        let fc = (() => {
            class e extends Gb {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(li, 2))
                };
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
                    hostVars: 14,
                    hostBindings: function (i, r) {
                        2 & i && kn("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)("ng-pristine", r.isPristine)("ng-dirty", r.isDirty)("ng-valid", r.isValid)("ng-invalid", r.isInvalid)("ng-pending", r.isPending)
                    },
                    features: [ue]
                })

                constructor(t) {
                    super(t)
                }
            }

            return e
        })();
        const As = "VALID", pc = "INVALID", eo = "PENDING", xs = "DISABLED";

        class to {
        }

        class Wb extends to {
            constructor(n, t) {
                super(), this.value = n, this.source = t
            }
        }

        class ip extends to {
            constructor(n, t) {
                super(), this.pristine = n, this.source = t
            }
        }

        class rp extends to {
            constructor(n, t) {
                super(), this.touched = n, this.source = t
            }
        }

        class gc extends to {
            constructor(n, t) {
                super(), this.status = n, this.source = t
            }
        }

        function mc(e) {
            return null != e && !Array.isArray(e) && "object" == typeof e
        }

        class ap {
            constructor(n, t) {
                this._pendingDirty = !1, this._hasOwnPendingAsyncValidator = null, this._pendingTouched = !1, this._onCollectionChange = () => {
                }, this._parent = null, this._status = Ds(() => this.statusReactive()), this.statusReactive = Sr(void 0), this._pristine = Ds(() => this.pristineReactive()), this.pristineReactive = Sr(!0), this._touched = Ds(() => this.touchedReactive()), this.touchedReactive = Sr(!1), this._events = new ln, this.events = this._events.asObservable(), this._onDisabledChange = [], this._assignValidators(n), this._assignAsyncValidators(t)
            }

            get validator() {
                return this._composedValidatorFn
            }

            set validator(n) {
                this._rawValidators = this._composedValidatorFn = n
            }

            get asyncValidator() {
                return this._composedAsyncValidatorFn
            }

            set asyncValidator(n) {
                this._rawAsyncValidators = this._composedAsyncValidatorFn = n
            }

            get parent() {
                return this._parent
            }

            get status() {
                return bn(this.statusReactive)
            }

            set status(n) {
                bn(() => this.statusReactive.set(n))
            }

            get valid() {
                return this.status === As
            }

            get invalid() {
                return this.status === pc
            }

            get pending() {
                return this.status == eo
            }

            get disabled() {
                return this.status === xs
            }

            get enabled() {
                return this.status !== xs
            }

            get pristine() {
                return bn(this.pristineReactive)
            }

            set pristine(n) {
                bn(() => this.pristineReactive.set(n))
            }

            get dirty() {
                return !this.pristine
            }

            get touched() {
                return bn(this.touchedReactive)
            }

            set touched(n) {
                bn(() => this.touchedReactive.set(n))
            }

            get untouched() {
                return !this.touched
            }

            get updateOn() {
                return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
            }

            get root() {
                let n = this;
                for (; n._parent;) n = n._parent;
                return n
            }

            setValidators(n) {
                this._assignValidators(n)
            }

            setAsyncValidators(n) {
                this._assignAsyncValidators(n)
            }

            addValidators(n) {
                this.setValidators(Ub(n, this._rawValidators))
            }

            addAsyncValidators(n) {
                this.setAsyncValidators(Ub(n, this._rawAsyncValidators))
            }

            removeValidators(n) {
                this.setValidators($b(n, this._rawValidators))
            }

            removeAsyncValidators(n) {
                this.setAsyncValidators($b(n, this._rawAsyncValidators))
            }

            hasValidator(n) {
                return dc(this._rawValidators, n)
            }

            hasAsyncValidator(n) {
                return dc(this._rawAsyncValidators, n)
            }

            clearValidators() {
                this.validator = null
            }

            clearAsyncValidators() {
                this.asyncValidator = null
            }

            markAsTouched(n = {}) {
                const t = !1 === this.touched;
                this.touched = !0;
                const i = n.sourceControl ?? this;
                this._parent && !n.onlySelf && this._parent.markAsTouched({
                    ...n,
                    sourceControl: i
                }), t && !1 !== n.emitEvent && this._events.next(new rp(!0, i))
            }

            markAllAsTouched(n = {}) {
                this.markAsTouched({
                    onlySelf: !0,
                    emitEvent: n.emitEvent,
                    sourceControl: this
                }), this._forEachChild(t => t.markAllAsTouched(n))
            }

            markAsUntouched(n = {}) {
                const t = !0 === this.touched;
                this.touched = !1, this._pendingTouched = !1;
                const i = n.sourceControl ?? this;
                this._forEachChild(r => {
                    r.markAsUntouched({onlySelf: !0, emitEvent: n.emitEvent, sourceControl: i})
                }), this._parent && !n.onlySelf && this._parent._updateTouched(n, i), t && !1 !== n.emitEvent && this._events.next(new rp(!1, i))
            }

            markAsDirty(n = {}) {
                const t = !0 === this.pristine;
                this.pristine = !1;
                const i = n.sourceControl ?? this;
                this._parent && !n.onlySelf && this._parent.markAsDirty({
                    ...n,
                    sourceControl: i
                }), t && !1 !== n.emitEvent && this._events.next(new ip(!1, i))
            }

            markAsPristine(n = {}) {
                const t = !1 === this.pristine;
                this.pristine = !0, this._pendingDirty = !1;
                const i = n.sourceControl ?? this;
                this._forEachChild(r => {
                    r.markAsPristine({onlySelf: !0, emitEvent: n.emitEvent})
                }), this._parent && !n.onlySelf && this._parent._updatePristine(n, i), t && !1 !== n.emitEvent && this._events.next(new ip(!0, i))
            }

            markAsPending(n = {}) {
                this.status = eo;
                const t = n.sourceControl ?? this;
                !1 !== n.emitEvent && (this._events.next(new gc(this.status, t)), this.statusChanges.emit(this.status)), this._parent && !n.onlySelf && this._parent.markAsPending({
                    ...n,
                    sourceControl: t
                })
            }

            disable(n = {}) {
                const t = this._parentMarkedDirty(n.onlySelf);
                this.status = xs, this.errors = null, this._forEachChild(r => {
                    r.disable({...n, onlySelf: !0})
                }), this._updateValue();
                const i = n.sourceControl ?? this;
                !1 !== n.emitEvent && (this._events.next(new Wb(this.value, i)), this._events.next(new gc(this.status, i)), this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors({
                    ...n,
                    skipPristineCheck: t
                }, this), this._onDisabledChange.forEach(r => r(!0))
            }

            enable(n = {}) {
                const t = this._parentMarkedDirty(n.onlySelf);
                this.status = As, this._forEachChild(i => {
                    i.enable({...n, onlySelf: !0})
                }), this.updateValueAndValidity({onlySelf: !0, emitEvent: n.emitEvent}), this._updateAncestors({
                    ...n,
                    skipPristineCheck: t
                }, this), this._onDisabledChange.forEach(i => i(!1))
            }

            _updateAncestors(n, t) {
                this._parent && !n.onlySelf && (this._parent.updateValueAndValidity(n), n.skipPristineCheck || this._parent._updatePristine({}, t), this._parent._updateTouched({}, t))
            }

            setParent(n) {
                this._parent = n
            }

            getRawValue() {
                return this.value
            }

            updateValueAndValidity(n = {}) {
                if (this._setInitialStatus(), this._updateValue(), this.enabled) {
                    const i = this._cancelExistingSubscription();
                    this.errors = this._runValidator(), this.status = this._calculateStatus(), (this.status === As || this.status === eo) && this._runAsyncValidator(i, n.emitEvent)
                }
                const t = n.sourceControl ?? this;
                !1 !== n.emitEvent && (this._events.next(new Wb(this.value, t)), this._events.next(new gc(this.status, t)), this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !n.onlySelf && this._parent.updateValueAndValidity({
                    ...n,
                    sourceControl: t
                })
            }

            _updateTreeValidity(n = {emitEvent: !0}) {
                this._forEachChild(t => t._updateTreeValidity(n)), this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: n.emitEvent
                })
            }

            _setInitialStatus() {
                this.status = this._allControlsDisabled() ? xs : As
            }

            _runValidator() {
                return this.validator ? this.validator(this) : null
            }

            _runAsyncValidator(n, t) {
                if (this.asyncValidator) {
                    this.status = eo, this._hasOwnPendingAsyncValidator = {emitEvent: !1 !== t};
                    const i = Rb(this.asyncValidator(this));
                    this._asyncValidationSubscription = i.subscribe(r => {
                        this._hasOwnPendingAsyncValidator = null, this.setErrors(r, {
                            emitEvent: t,
                            shouldHaveEmitted: n
                        })
                    })
                }
            }

            _cancelExistingSubscription() {
                if (this._asyncValidationSubscription) {
                    this._asyncValidationSubscription.unsubscribe();
                    const n = this._hasOwnPendingAsyncValidator?.emitEvent ?? !1;
                    return this._hasOwnPendingAsyncValidator = null, n
                }
                return !1
            }

            setErrors(n, t = {}) {
                this.errors = n, this._updateControlsErrors(!1 !== t.emitEvent, this, t.shouldHaveEmitted)
            }

            get(n) {
                let t = n;
                return null == t || (Array.isArray(t) || (t = t.split(".")), 0 === t.length) ? null : t.reduce((i, r) => i && i._find(r), this)
            }

            getError(n, t) {
                const i = t ? this.get(t) : this;
                return i && i.errors ? i.errors[n] : null
            }

            hasError(n, t) {
                return !!this.getError(n, t)
            }

            _updateControlsErrors(n, t, i) {
                this.status = this._calculateStatus(), n && this.statusChanges.emit(this.status), (n || i) && this._events.next(new gc(this.status, t)), this._parent && this._parent._updateControlsErrors(n, t, i)
            }

            _initObservables() {
                this.valueChanges = new we, this.statusChanges = new we
            }

            _calculateStatus() {
                return this._allControlsDisabled() ? xs : this.errors ? pc : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(eo) ? eo : this._anyControlsHaveStatus(pc) ? pc : As
            }

            _anyControlsHaveStatus(n) {
                return this._anyControls(t => t.status === n)
            }

            _anyControlsDirty() {
                return this._anyControls(n => n.dirty)
            }

            _anyControlsTouched() {
                return this._anyControls(n => n.touched)
            }

            _updatePristine(n, t) {
                const i = !this._anyControlsDirty(), r = this.pristine !== i;
                this.pristine = i, this._parent && !n.onlySelf && this._parent._updatePristine(n, t), r && this._events.next(new ip(this.pristine, t))
            }

            _updateTouched(n = {}, t) {
                this.touched = this._anyControlsTouched(), this._events.next(new rp(this.touched, t)), this._parent && !n.onlySelf && this._parent._updateTouched(n, t)
            }

            _registerOnCollectionChange(n) {
                this._onCollectionChange = n
            }

            _setUpdateStrategy(n) {
                mc(n) && null != n.updateOn && (this._updateOn = n.updateOn)
            }

            _parentMarkedDirty(n) {
                return !n && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
            }

            _find(n) {
                return null
            }

            _assignValidators(n) {
                this._rawValidators = Array.isArray(n) ? n.slice() : n, this._composedValidatorFn = function NH(e) {
                    return Array.isArray(e) ? Xh(e) : e || null
                }(this._rawValidators)
            }

            _assignAsyncValidators(n) {
                this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n, this._composedAsyncValidatorFn = function AH(e) {
                    return Array.isArray(e) ? Jh(e) : e || null
                }(this._rawAsyncValidators)
            }
        }

        const no = new R("CallSetDisabledState", {providedIn: "root", factory: () => vc}), vc = "always";

        function Rs(e, n, t = vc) {
            (function cp(e, n) {
                const t = function Bb(e) {
                    return e._rawValidators
                }(e);
                null !== n.validator ? e.setValidators(Hb(t, n.validator)) : "function" == typeof t && e.setValidators([t]);
                const i = function jb(e) {
                    return e._rawAsyncValidators
                }(e);
                null !== n.asyncValidator ? e.setAsyncValidators(Hb(i, n.asyncValidator)) : "function" == typeof i && e.setAsyncValidators([i]);
                const r = () => e.updateValueAndValidity();
                Cc(n._rawValidators, r), Cc(n._rawAsyncValidators, r)
            })(e, n), n.valueAccessor.writeValue(e.value), (e.disabled || "always" === t) && n.valueAccessor.setDisabledState?.(e.disabled), function LH(e, n) {
                n.valueAccessor.registerOnChange(t => {
                    e._pendingValue = t, e._pendingChange = !0, e._pendingDirty = !0, "change" === e.updateOn && Qb(e, n)
                })
            }(e, n), function kH(e, n) {
                const t = (i, r) => {
                    n.valueAccessor.writeValue(i), r && n.viewToModelUpdate(i)
                };
                e.registerOnChange(t), n._registerOnDestroy(() => {
                    e._unregisterOnChange(t)
                })
            }(e, n), function PH(e, n) {
                n.valueAccessor.registerOnTouched(() => {
                    e._pendingTouched = !0, "blur" === e.updateOn && e._pendingChange && Qb(e, n), "submit" !== e.updateOn && e.markAsTouched()
                })
            }(e, n), function RH(e, n) {
                if (n.valueAccessor.setDisabledState) {
                    const t = i => {
                        n.valueAccessor.setDisabledState(i)
                    };
                    e.registerOnDisabledChange(t), n._registerOnDestroy(() => {
                        e._unregisterOnDisabledChange(t)
                    })
                }
            }(e, n)
        }

        function Cc(e, n) {
            e.forEach(t => {
                t.registerOnValidatorChange && t.registerOnValidatorChange(n)
            })
        }

        function Qb(e, n) {
            e._pendingDirty && e.markAsDirty(), e.setValue(e._pendingValue, {emitModelToViewChange: !1}), n.viewToModelUpdate(e._pendingValue), e._pendingChange = !1
        }

        function Jb(e, n) {
            const t = e.indexOf(n);
            t > -1 && e.splice(t, 1)
        }

        function eI(e) {
            return "object" == typeof e && null !== e && 2 === Object.keys(e).length && "value" in e && "disabled" in e
        }

        Promise.resolve();
        const tI = class extends ap {
            constructor(n = null, t, i) {
                super(function op(e) {
                    return (mc(e) ? e.validators : e) || null
                }(t), function sp(e, n) {
                    return (mc(n) ? n.asyncValidators : e) || null
                }(i, t)), this.defaultValue = null, this._onChange = [], this._pendingChange = !1, this._applyFormState(n), this._setUpdateStrategy(t), this._initObservables(), this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!this.asyncValidator
                }), mc(t) && (t.nonNullable || t.initialValueIsDefault) && (this.defaultValue = eI(n) ? n.value : n)
            }

            setValue(n, t = {}) {
                this.value = this._pendingValue = n, this._onChange.length && !1 !== t.emitModelToViewChange && this._onChange.forEach(i => i(this.value, !1 !== t.emitViewToModelChange)), this.updateValueAndValidity(t)
            }

            patchValue(n, t = {}) {
                this.setValue(n, t)
            }

            reset(n = this.defaultValue, t = {}) {
                this._applyFormState(n), this.markAsPristine(t), this.markAsUntouched(t), this.setValue(this.value, t), this._pendingChange = !1
            }

            _updateValue() {
            }

            _anyControls(n) {
                return !1
            }

            _allControlsDisabled() {
                return this.disabled
            }

            registerOnChange(n) {
                this._onChange.push(n)
            }

            _unregisterOnChange(n) {
                Jb(this._onChange, n)
            }

            registerOnDisabledChange(n) {
                this._onDisabledChange.push(n)
            }

            _unregisterOnDisabledChange(n) {
                Jb(this._onDisabledChange, n)
            }

            _forEachChild(n) {
            }

            _syncPendingControls() {
                return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                    onlySelf: !0,
                    emitModelToViewChange: !1
                }), 0))
            }

            _applyFormState(n) {
                eI(n) ? (this.value = this._pendingValue = n.value, n.disabled ? this.disable({
                    onlySelf: !0,
                    emitEvent: !1
                }) : this.enable({onlySelf: !0, emitEvent: !1})) : this.value = this._pendingValue = n
            }
        }, zH = {provide: li, useExisting: me(() => Ps)}, rI = Promise.resolve();
        let Ps = (() => {
            class e extends li {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(vt, 9), M(at, 10), M(ai, 10), M(an, 10), M(Bi, 8), M(no, 8))
                };
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]],
                    inputs: {
                        name: "name",
                        isDisabled: [0, "disabled", "isDisabled"],
                        model: [0, "ngModel", "model"],
                        options: [0, "ngModelOptions", "options"]
                    },
                    outputs: {update: "ngModelChange"},
                    exportAs: ["ngModel"],
                    features: [Me([zH]), ue, hn]
                })

                constructor(t, i, r, o, s, a) {
                    super(), this._changeDetectorRef = s, this.callSetDisabledState = a, this.control = new tI, this._registered = !1, this.name = "", this.update = new we, this._parent = t, this._setValidators(i), this._setAsyncValidators(r), this.valueAccessor = function fp(e, n) {
                        if (!n) return null;
                        let t, i, r;
                        return Array.isArray(n), n.forEach(o => {
                            o.constructor === Ns ? t = o : function HH(e) {
                                return Object.getPrototypeOf(e.constructor) === Gi
                            }(o) ? i = o : r = o
                        }), r || i || t || null
                    }(0, o)
                }

                get path() {
                    return this._getPath(this.name)
                }

                get formDirective() {
                    return this._parent ? this._parent.formDirective : null
                }

                ngOnChanges(t) {
                    if (this._checkForErrors(), !this._registered || "name" in t) {
                        if (this._registered && (this._checkName(), this.formDirective)) {
                            const i = t.name.previousValue;
                            this.formDirective.removeControl({name: i, path: this._getPath(i)})
                        }
                        this._setUpControl()
                    }
                    "isDisabled" in t && this._updateDisabled(t), function dp(e, n) {
                        if (!e.hasOwnProperty("model")) return !1;
                        const t = e.model;
                        return !!t.isFirstChange() || !Object.is(n, t.currentValue)
                    }(t, this.viewModel) && (this._updateValue(this.model), this.viewModel = this.model)
                }

                ngOnDestroy() {
                    this.formDirective && this.formDirective.removeControl(this)
                }

                viewToModelUpdate(t) {
                    this.viewModel = t, this.update.emit(t)
                }

                _setUpControl() {
                    this._setUpdateStrategy(), this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this), this._registered = !0
                }

                _setUpdateStrategy() {
                    this.options && null != this.options.updateOn && (this.control._updateOn = this.options.updateOn)
                }

                _isStandalone() {
                    return !this._parent || !(!this.options || !this.options.standalone)
                }

                _setUpStandalone() {
                    Rs(this.control, this, this.callSetDisabledState), this.control.updateValueAndValidity({emitEvent: !1})
                }

                _checkForErrors() {
                    this._isStandalone() || this._checkParentType(), this._checkName()
                }

                _checkParentType() {
                }

                _checkName() {
                    this.options && this.options.name && (this.name = this.options.name), this._isStandalone()
                }

                _updateValue(t) {
                    rI.then(() => {
                        this.control.setValue(t, {emitViewToModelChange: !1}), this._changeDetectorRef?.markForCheck()
                    })
                }

                _updateDisabled(t) {
                    const i = t.isDisabled.currentValue, r = 0 !== i && function wh(e) {
                        return "boolean" == typeof e ? e : null != e && "false" !== e
                    }(i);
                    rI.then(() => {
                        r && !this.control.disabled ? this.control.disable() : !r && this.control.disabled && this.control.enable(), this._changeDetectorRef?.markForCheck()
                    })
                }

                _getPath(t) {
                    return this._parent ? function _c(e, n) {
                        return [...n.path, e]
                    }(t, this._parent) : [t]
                }
            }

            return e
        })();
        const YH = {provide: an, useExisting: me(() => pp), multi: !0};
        let pp = (() => {
            class e extends Gi {
                static#e = this.\u0275fac = (() => {
                    let t;
                    return function (r) {
                        return (t || (t = rt(e)))(r || e)
                    }
                })();
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["input", "type", "range", "formControlName", ""], ["input", "type", "range", "formControl", ""], ["input", "type", "range", "ngModel", ""]],
                    hostBindings: function (i, r) {
                        1 & i && W("change", function (s) {
                            return r.onChange(s.target.value)
                        })("input", function (s) {
                            return r.onChange(s.target.value)
                        })("blur", function () {
                            return r.onTouched()
                        })
                    },
                    features: [Me([YH]), ue]
                })

                writeValue(t) {
                    this.setProperty("value", parseFloat(t))
                }

                registerOnChange(t) {
                    this.onChange = i => {
                        t("" == i ? null : parseFloat(i))
                    }
                }
            }

            return e
        })();
        const tB = {provide: an, useExisting: me(() => ks), multi: !0};

        function dI(e, n) {
            return null == e ? `${n}` : (n && "object" == typeof n && (n = "Object"), `${e}: ${n}`.slice(0, 50))
        }

        let ks = (() => {
            class e extends Gi {
                static#e = this.\u0275fac = (() => {
                    let t;
                    return function (r) {
                        return (t || (t = rt(e)))(r || e)
                    }
                })();
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["select", "formControlName", "", 3, "multiple", ""], ["select", "formControl", "", 3, "multiple", ""], ["select", "ngModel", "", 3, "multiple", ""]],
                    hostBindings: function (i, r) {
                        1 & i && W("change", function (s) {
                            return r.onChange(s.target.value)
                        })("blur", function () {
                            return r.onTouched()
                        })
                    },
                    inputs: {compareWith: "compareWith"},
                    features: [Me([tB]), ue]
                })

                constructor() {
                    super(...arguments), this._optionMap = new Map, this._idCounter = 0, this._compareWith = Object.is
                }

                set compareWith(t) {
                    this._compareWith = t
                }

                writeValue(t) {
                    this.value = t;
                    const r = dI(this._getOptionId(t), t);
                    this.setProperty("value", r)
                }

                registerOnChange(t) {
                    this.onChange = i => {
                        this.value = this._getOptionValue(i), t(this.value)
                    }
                }

                _registerOption() {
                    return (this._idCounter++).toString()
                }

                _getOptionId(t) {
                    for (const i of this._optionMap.keys()) if (this._compareWith(this._optionMap.get(i), t)) return i;
                    return null
                }

                _getOptionValue(t) {
                    const i = function nB(e) {
                        return e.split(":")[0]
                    }(t);
                    return this._optionMap.has(i) ? this._optionMap.get(i) : t
                }
            }

            return e
        })(), _p = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(dt), M(tn), M(ks, 9))
                };
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["option"]],
                    inputs: {ngValue: "ngValue", value: "value"}
                })

                constructor(t, i, r) {
                    this._element = t, this._renderer = i, this._select = r, this._select && (this.id = this._select._registerOption())
                }

                set ngValue(t) {
                    null != this._select && (this._select._optionMap.set(this.id, t), this._setElementValue(dI(this.id, t)), this._select.writeValue(this._select.value))
                }

                set value(t) {
                    this._setElementValue(t), this._select && this._select.writeValue(this._select.value)
                }

                _setElementValue(t) {
                    this._renderer.setProperty(this._element.nativeElement, "value", t)
                }

                ngOnDestroy() {
                    this._select && (this._select._optionMap.delete(this.id), this._select.writeValue(this._select.value))
                }
            }

            return e
        })();
        const iB = {provide: an, useExisting: me(() => yp), multi: !0};

        function fI(e, n) {
            return null == e ? `${n}` : ("string" == typeof n && (n = `'${n}'`), n && "object" == typeof n && (n = "Object"), `${e}: ${n}`.slice(0, 50))
        }

        let yp = (() => {
            class e extends Gi {
                static#e = this.\u0275fac = (() => {
                    let t;
                    return function (r) {
                        return (t || (t = rt(e)))(r || e)
                    }
                })();
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["select", "multiple", "", "formControlName", ""], ["select", "multiple", "", "formControl", ""], ["select", "multiple", "", "ngModel", ""]],
                    hostBindings: function (i, r) {
                        1 & i && W("change", function (s) {
                            return r.onChange(s.target)
                        })("blur", function () {
                            return r.onTouched()
                        })
                    },
                    inputs: {compareWith: "compareWith"},
                    features: [Me([iB]), ue]
                })

                constructor() {
                    super(...arguments), this._optionMap = new Map, this._idCounter = 0, this._compareWith = Object.is
                }

                set compareWith(t) {
                    this._compareWith = t
                }

                writeValue(t) {
                    let i;
                    if (this.value = t, Array.isArray(t)) {
                        const r = t.map(o => this._getOptionId(o));
                        i = (o, s) => {
                            o._setSelected(r.indexOf(s.toString()) > -1)
                        }
                    } else i = (r, o) => {
                        r._setSelected(!1)
                    };
                    this._optionMap.forEach(i)
                }

                registerOnChange(t) {
                    this.onChange = i => {
                        const r = [], o = i.selectedOptions;
                        if (void 0 !== o) {
                            const s = o;
                            for (let a = 0; a < s.length; a++) {
                                const c = this._getOptionValue(s[a].value);
                                r.push(c)
                            }
                        } else {
                            const s = i.options;
                            for (let a = 0; a < s.length; a++) {
                                const l = s[a];
                                if (l.selected) {
                                    const c = this._getOptionValue(l.value);
                                    r.push(c)
                                }
                            }
                        }
                        this.value = r, t(r)
                    }
                }

                _registerOption(t) {
                    const i = (this._idCounter++).toString();
                    return this._optionMap.set(i, t), i
                }

                _getOptionId(t) {
                    for (const i of this._optionMap.keys()) if (this._compareWith(this._optionMap.get(i)._value, t)) return i;
                    return null
                }

                _getOptionValue(t) {
                    const i = function rB(e) {
                        return e.split(":")[0]
                    }(t);
                    return this._optionMap.has(i) ? this._optionMap.get(i)._value : t
                }
            }

            return e
        })(), Cp = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(dt), M(tn), M(yp, 9))
                };
                static#t = this.\u0275dir = z({
                    type: e,
                    selectors: [["option"]],
                    inputs: {ngValue: "ngValue", value: "value"}
                })

                constructor(t, i, r) {
                    this._element = t, this._renderer = i, this._select = r, this._select && (this.id = this._select._registerOption(this))
                }

                set ngValue(t) {
                    null != this._select && (this._value = t, this._setElementValue(fI(this.id, t)), this._select.writeValue(this._select.value))
                }

                set value(t) {
                    this._select ? (this._value = t, this._setElementValue(fI(this.id, t)), this._select.writeValue(this._select.value)) : this._setElementValue(t)
                }

                _setElementValue(t) {
                    this._renderer.setProperty(this._element.nativeElement, "value", t)
                }

                _setSelected(t) {
                    this._renderer.setProperty(this._element.nativeElement, "selected", t)
                }

                ngOnDestroy() {
                    this._select && (this._select._optionMap.delete(this.id), this._select.writeValue(this._select.value))
                }
            }

            return e
        })(), hB = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275mod = Wn({type: e});
                static#n = this.\u0275inj = Tn({})
            }

            return e
        })(), gB = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275mod = Wn({type: e});
                static#n = this.\u0275inj = Tn({imports: [hB]})

                static withConfig(t) {
                    return {ngModule: e, providers: [{provide: no, useValue: t.callSetDisabledState ?? vc}]}
                }
            }

            return e
        })();

        class mB extends Tt {
            constructor(n, t) {
                super()
            }

            schedule(n, t = 0) {
                return this
            }
        }

        const Ec = {
            setInterval(e, n, ...t) {
                const {delegate: i} = Ec;
                return i?.setInterval ? i.setInterval(e, n, ...t) : setInterval(e, n, ...t)
            }, clearInterval(e) {
                const {delegate: n} = Ec;
                return (n?.clearInterval || clearInterval)(e)
            }, delegate: void 0
        }, EI = {now: () => (EI.delegate || Date).now(), delegate: void 0};

        class Fs {
            constructor(n, t = Fs.now) {
                this.schedulerActionCtor = n, this.now = t
            }

            schedule(n, t = 0, i) {
                return new this.schedulerActionCtor(this, n).schedule(i, t)
            }
        }

        Fs.now = EI.now;
        const DI = new class _B extends Fs {
            constructor(n, t = Fs.now) {
                super(n, t), this.actions = [], this._active = !1
            }

            flush(n) {
                const {actions: t} = this;
                if (this._active) return void t.push(n);
                let i;
                this._active = !0;
                do {
                    if (i = n.execute(n.state, n.delay)) break
                } while (n = t.shift());
                if (this._active = !1, i) {
                    for (; n = t.shift();) n.unsubscribe();
                    throw i
                }
            }
        }(class vB extends mB {
            constructor(n, t) {
                super(n, t), this.scheduler = n, this.work = t, this.pending = !1
            }

            schedule(n, t = 0) {
                var i;
                if (this.closed) return this;
                this.state = n;
                const r = this.id, o = this.scheduler;
                return null != r && (this.id = this.recycleAsyncId(o, r, t)), this.pending = !0, this.delay = t, this.id = null !== (i = this.id) && void 0 !== i ? i : this.requestAsyncId(o, this.id, t), this
            }

            requestAsyncId(n, t, i = 0) {
                return Ec.setInterval(n.flush.bind(n, this), i)
            }

            recycleAsyncId(n, t, i = 0) {
                if (null != i && this.delay === i && !1 === this.pending) return t;
                null != t && Ec.clearInterval(t)
            }

            execute(n, t) {
                if (this.closed) return new Error("executing a cancelled action");
                this.pending = !1;
                const i = this._execute(n, t);
                if (i) return i;
                !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
            }

            _execute(n, t) {
                let r, i = !1;
                try {
                    this.work(n)
                } catch (o) {
                    i = !0, r = o || new Error("Scheduled action threw falsy error")
                }
                if (i) return this.unsubscribe(), r
            }

            unsubscribe() {
                if (!this.closed) {
                    const {id: n, scheduler: t} = this, {actions: i} = t;
                    this.work = this.state = this.scheduler = null, this.pending = !1, zs(i, this), null != n && (this.id = this.recycleAsyncId(t, n, null)), this.delay = null, super.unsubscribe()
                }
            }
        }), yB = DI;

        function bI(e, n = DI, t) {
            const i = function DB(e = 0, n, t = yB) {
                let i = -1;
                return null != n && (function wB(e) {
                    return e && Fe(e.schedule)
                }(n) ? t = n : i = n), new St(r => {
                    let o = function EB(e) {
                        return e instanceof Date && !isNaN(e)
                    }(e) ? +e - t.now() : e;
                    o < 0 && (o = 0);
                    let s = 0;
                    return t.schedule(function () {
                        r.closed || (r.next(s++), 0 <= i ? this.schedule(void 0, i) : r.complete())
                    }, o)
                })
            }(e, n);
            return function CB(e, n) {
                return pi((t, i) => {
                    const {leading: r = !0, trailing: o = !1} = n ?? {};
                    let s = !1, a = null, l = null, c = !1;
                    const u = () => {
                        l?.unsubscribe(), l = null, o && (p(), c && i.complete())
                    }, d = () => {
                        l = null, c && i.complete()
                    }, h = g => l = Os(e(g)).subscribe(Un(i, u, d)), p = () => {
                        if (s) {
                            s = !1;
                            const g = a;
                            a = null, i.next(g), !c && h(g)
                        }
                    };
                    t.subscribe(Un(i, g => {
                        s = !0, a = g, (!l || l.closed) && (r ? p() : h(g))
                    }, () => {
                        c = !0, (!(o && s && l) || l.closed) && i.complete()
                    }))
                })
            }(() => i, t)
        }

        function II(e, n, t) {
            const i = Fe(e) || n || t ? {next: e, error: n, complete: t} : e;
            return i ? pi((r, o) => {
                var s;
                null === (s = i.subscribe) || void 0 === s || s.call(i);
                let a = !0;
                r.subscribe(Un(o, l => {
                    var c;
                    null === (c = i.next) || void 0 === c || c.call(i, l), o.next(l)
                }, () => {
                    var l;
                    a = !1, null === (l = i.complete) || void 0 === l || l.call(i), o.complete()
                }, l => {
                    var c;
                    a = !1, null === (c = i.error) || void 0 === c || c.call(i, l), o.error(l)
                }, () => {
                    var l, c;
                    a && (null === (l = i.unsubscribe) || void 0 === l || l.call(i)), null === (c = i.finalize) || void 0 === c || c.call(i)
                }))
            }) : Hc
        }

        function MI(e, n = Hc) {
            return e = e ?? bB, pi((t, i) => {
                let r, o = !0;
                t.subscribe(Un(i, s => {
                    const a = n(s);
                    (o || !e(r, a)) && (o = !1, r = a, i.next(s))
                }))
            })
        }

        function bB(e, n) {
            return e === n
        }

        var Vt = typeof window < "u" ? window : {screen: {}, navigator: {}}, io = (Vt.matchMedia || function () {
            return {matches: !1}
        }).bind(Vt), TI = !1, SI = function () {
        };
        Vt.addEventListener && Vt.addEventListener("p", SI, {
            get passive() {
                return TI = !0
            }
        }), Vt.removeEventListener && Vt.removeEventListener("p", SI, !1);
        var OI = TI, Ep = "ontouchstart" in Vt,
            AI = (Ep || "TouchEvent" in Vt && io("(any-pointer: coarse)"), Vt.navigator.userAgent || "");
        io("(pointer: coarse)").matches && /iPad|Macintosh/.test(AI) && Math.min(Vt.screen.width || 0, Vt.screen.height || 0);
        (io("(pointer: coarse)").matches || !io("(pointer: fine)").matches && Ep) && /Windows.*Firefox/.test(AI), io("(any-pointer: fine)").matches || io("(any-hover: hover)");
        const AB = (e, n, t) => ({tooltip: e, placement: n, content: t});

        function xB(e, n) {
        }

        function RB(e, n) {
            1 & e && H(0, xB, 0, 0, "ng-template")
        }

        function LB(e, n) {
            if (1 & e && (ne(0), H(1, RB, 1, 0, null, 1), ie()), 2 & e) {
                const t = v();
                f(), m("ngTemplateOutlet", t.template)("ngTemplateOutletContext", Ye(2, AB, t.tooltip, t.placement, t.content))
            }
        }

        function PB(e, n) {
            if (1 & e && (ne(0), y(1, "div", 2), b(2), _(), ie()), 2 & e) {
                const t = v();
                f(), ht("title", t.tooltip)("data-tooltip-placement", t.placement), f(), K(" ", t.content, " ")
            }
        }

        const kB = ["tooltipTemplate"], FB = ["leftOuterSelectionBar"], VB = ["rightOuterSelectionBar"],
            HB = ["fullBar"], BB = ["selectionBar"], jB = ["minHandle"], UB = ["maxHandle"], $B = ["floorLabel"],
            zB = ["ceilLabel"], GB = ["minHandleLabel"], qB = ["maxHandleLabel"], WB = ["combinedLabel"],
            ZB = ["ticksElement"], YB = e => ({"ngx-slider-selected": e});

        function QB(e, n) {
            if (1 & e && N(0, "ngx-slider-tooltip-wrapper", 32), 2 & e) {
                const t = v().$implicit;
                m("template", v().tooltipTemplate)("tooltip", t.valueTooltip)("placement", t.valueTooltipPlacement)("content", t.value)
            }
        }

        function KB(e, n) {
            1 & e && N(0, "span", 33), 2 & e && m("innerText", v().$implicit.legend)
        }

        function XB(e, n) {
            1 & e && N(0, "span", 34), 2 & e && m("innerHTML", v().$implicit.legend, jv)
        }

        function JB(e, n) {
            if (1 & e && (y(0, "span", 27), N(1, "ngx-slider-tooltip-wrapper", 28), H(2, QB, 1, 4, "ngx-slider-tooltip-wrapper", 29)(3, KB, 1, 1, "span", 30)(4, XB, 1, 1, "span", 31), _()), 2 & e) {
                const t = n.$implicit, i = v();
                m("ngClass", ps(8, YB, t.selected))("ngStyle", t.style), f(), m("template", i.tooltipTemplate)("tooltip", t.tooltip)("placement", t.tooltipPlacement), f(), m("ngIf", null != t.value), f(), m("ngIf", null != t.legend && !1 === i.allowUnsafeHtmlInSlider), f(), m("ngIf", null != t.legend && (null == i.allowUnsafeHtmlInSlider || i.allowUnsafeHtmlInSlider))
            }
        }

        var In = function (e) {
            return e[e.Low = 0] = "Low", e[e.High = 1] = "High", e[e.Floor = 2] = "Floor", e[e.Ceil = 3] = "Ceil", e[e.TickValue = 4] = "TickValue", e
        }(In || {});

        class Dc {
            floor = 0;
            ceil = null;
            step = 1;
            minRange = null;
            maxRange = null;
            pushRange = !1;
            minLimit = null;
            maxLimit = null;
            translate = null;
            combineLabels = null;
            getLegend = null;
            getStepLegend = null;
            stepsArray = null;
            bindIndexForStepsArray = !1;
            draggableRange = !1;
            draggableRangeOnly = !1;
            showSelectionBar = !1;
            showSelectionBarEnd = !1;
            showSelectionBarFromValue = null;
            showOuterSelectionBars = !1;
            hidePointerLabels = !1;
            hideLimitLabels = !1;
            autoHideLimitLabels = !0;
            readOnly = !1;
            disabled = !1;
            showTicks = !1;
            showTicksValues = !1;
            tickStep = null;
            tickValueStep = null;
            ticksArray = null;
            ticksTooltip = null;
            ticksValuesTooltip = null;
            vertical = !1;
            getSelectionBarColor = null;
            getTickColor = null;
            getPointerColor = null;
            keyboardSupport = !0;
            scale = 1;
            rotate = 0;
            enforceStep = !0;
            enforceRange = !0;
            enforceStepsArray = !0;
            noSwitching = !1;
            onlyBindHandles = !1;
            rightToLeft = !1;
            reversedControls = !1;
            boundPointerLabels = !0;
            logScale = !1;
            customValueToPosition = null;
            customPositionToValue = null;
            precisionLimit = 12;
            selectionBarGradient = null;
            ariaLabel = "ngx-slider";
            ariaLabelledBy = null;
            ariaLabelHigh = "ngx-slider-max";
            ariaLabelledByHigh = null;
            handleDimension = null;
            barDimension = null;
            animate = !0;
            animateOnMove = !1
        }

        const LI = new R("AllowUnsafeHtmlInSlider");
        var x = function (e) {
            return e[e.Min = 0] = "Min", e[e.Max = 1] = "Max", e
        }(x || {});

        class ej {
            value;
            highValue;
            pointerType
        }

        class I {
            static isNullOrUndefined(n) {
                return null == n
            }

            static areArraysEqual(n, t) {
                if (n.length !== t.length) return !1;
                for (let i = 0; i < n.length; ++i) if (n[i] !== t[i]) return !1;
                return !0
            }

            static linearValueToPosition(n, t, i) {
                return (n - t) / (i - t)
            }

            static logValueToPosition(n, t, i) {
                return ((n = Math.log(n)) - (t = Math.log(t))) / ((i = Math.log(i)) - t)
            }

            static linearPositionToValue(n, t, i) {
                return n * (i - t) + t
            }

            static logPositionToValue(n, t, i) {
                return t = Math.log(t), i = Math.log(i), Math.exp(n * (i - t) + t)
            }

            static findStepIndex(n, t) {
                const i = t.map(o => Math.abs(n - o.value));
                let r = 0;
                for (let o = 0; o < t.length; o++) i[o] !== i[r] && i[o] < i[r] && (r = o);
                return r
            }
        }

        class ci {
            static isTouchEvent(n) {
                return void 0 !== window.TouchEvent ? n instanceof TouchEvent : void 0 !== n.touches
            }

            static isResizeObserverAvailable() {
                return void 0 !== window.ResizeObserver
            }
        }

        class ke {
            static roundToPrecisionLimit(n, t) {
                return +n.toPrecision(t)
            }

            static isModuloWithinPrecisionLimit(n, t, i) {
                const r = Math.pow(10, -i);
                return Math.abs(n % t) <= r || Math.abs(Math.abs(n % t) - t) <= r
            }

            static clampToRange(n, t, i) {
                return Math.min(Math.max(n, t), i)
            }
        }

        class PI {
            eventName = null;
            events = null;
            eventsSubscription = null;
            teardownCallback = null
        }

        class kI {
            renderer;

            constructor(n) {
                this.renderer = n
            }

            attachPassiveEventListener(n, t, i, r) {
                if (!0 !== OI) return this.attachEventListener(n, t, i, r);
                const o = new PI;
                o.eventName = t, o.events = new ln;
                const s = a => {
                    o.events.next(a)
                };
                return n.addEventListener(t, s, {passive: !0, capture: !1}), o.teardownCallback = () => {
                    n.removeEventListener(t, s, {passive: !0, capture: !1})
                }, o.eventsSubscription = o.events.pipe(I.isNullOrUndefined(r) ? II(() => {
                }) : bI(r, void 0, {leading: !0, trailing: !0})).subscribe(a => {
                    i(a)
                }), o
            }

            detachEventListener(n) {
                I.isNullOrUndefined(n.eventsSubscription) || (n.eventsSubscription.unsubscribe(), n.eventsSubscription = null), I.isNullOrUndefined(n.events) || (n.events.complete(), n.events = null), I.isNullOrUndefined(n.teardownCallback) || (n.teardownCallback(), n.teardownCallback = null)
            }

            attachEventListener(n, t, i, r) {
                const o = new PI;
                return o.eventName = t, o.events = new ln, o.teardownCallback = this.renderer.listen(n, t, a => {
                    o.events.next(a)
                }), o.eventsSubscription = o.events.pipe(I.isNullOrUndefined(r) ? II(() => {
                }) : bI(r, void 0, {leading: !0, trailing: !0})).subscribe(a => {
                    i(a)
                }), o
            }
        }

        let ui = (() => {
            class e {
                static \u0275dir = z({
                    type: e,
                    selectors: [["", "ngxSliderElement", ""]],
                    hostVars: 14,
                    hostBindings: function (i, r) {
                        2 & i && El("opacity", r.opacity)("visibility", r.visibility)("left", r.left)("bottom", r.bottom)("height", r.height)("width", r.width)("transform", r.transform)
                    }
                })
                elemRef;
                renderer;
                changeDetectionRef;
                opacity = 1;
                visibility = "visible";
                left = "";
                bottom = "";
                height = "";
                width = "";
                transform = "";
                eventListenerHelper;
                eventListeners = [];

                constructor(t, i, r) {
                    this.elemRef = t, this.renderer = i, this.changeDetectionRef = r, this.eventListenerHelper = new kI(this.renderer)
                }

                _position = 0;

                get position() {
                    return this._position
                }

                _dimension = 0;

                get dimension() {
                    return this._dimension
                }

                _alwaysHide = !1;

                get alwaysHide() {
                    return this._alwaysHide
                }

                _vertical = !1;

                get vertical() {
                    return this._vertical
                }

                _scale = 1;

                get scale() {
                    return this._scale
                }

                _rotate = 0;

                get rotate() {
                    return this._rotate
                }

                static \u0275fac = function (i) {
                    return new (i || e)(M(dt), M(tn), M(Bi))
                };

                setAlwaysHide(t) {
                    this._alwaysHide = t, this.visibility = t ? "hidden" : "visible"
                }

                hide() {
                    this.opacity = 0
                }

                show() {
                    this.alwaysHide || (this.opacity = 1)
                }

                isVisible() {
                    return !this.alwaysHide && 0 !== this.opacity
                }

                setVertical(t) {
                    this._vertical = t, this._vertical ? (this.left = "", this.width = "") : (this.bottom = "", this.height = "")
                }

                setScale(t) {
                    this._scale = t
                }

                setRotate(t) {
                    this._rotate = t, this.transform = "rotate(" + t + "deg)"
                }

                getRotate() {
                    return this._rotate
                }

                setPosition(t) {
                    this._position !== t && !this.isRefDestroyed() && this.changeDetectionRef.markForCheck(), this._position = t, this._vertical ? this.bottom = Math.round(t) + "px" : this.left = Math.round(t) + "px"
                }

                calculateDimension() {
                    const t = this.getBoundingClientRect();
                    this._dimension = this.vertical ? (t.bottom - t.top) * this.scale : (t.right - t.left) * this.scale
                }

                setDimension(t) {
                    this._dimension !== t && !this.isRefDestroyed() && this.changeDetectionRef.markForCheck(), this._dimension = t, this._vertical ? this.height = Math.round(t) + "px" : this.width = Math.round(t) + "px"
                }

                getBoundingClientRect() {
                    return this.elemRef.nativeElement.getBoundingClientRect()
                }

                on(t, i, r) {
                    const o = this.eventListenerHelper.attachEventListener(this.elemRef.nativeElement, t, i, r);
                    this.eventListeners.push(o)
                }

                onPassive(t, i, r) {
                    const o = this.eventListenerHelper.attachPassiveEventListener(this.elemRef.nativeElement, t, i, r);
                    this.eventListeners.push(o)
                }

                off(t) {
                    let i, r;
                    I.isNullOrUndefined(t) ? (i = [], r = this.eventListeners) : (i = this.eventListeners.filter(o => o.eventName !== t), r = this.eventListeners.filter(o => o.eventName === t));
                    for (const o of r) this.eventListenerHelper.detachEventListener(o);
                    this.eventListeners = i
                }

                isRefDestroyed() {
                    return I.isNullOrUndefined(this.changeDetectionRef) || this.changeDetectionRef.destroyed
                }
            }

            return e
        })(), Dp = (() => {
            class e extends ui {
                static \u0275dir = z({
                    type: e,
                    selectors: [["", "ngxSliderHandle", ""]],
                    hostVars: 11,
                    hostBindings: function (i, r) {
                        2 & i && (ht("role", r.role)("tabindex", r.tabindex)("aria-orientation", r.ariaOrientation)("aria-label", r.ariaLabel)("aria-labelledby", r.ariaLabelledBy)("aria-valuenow", r.ariaValueNow)("aria-valuetext", r.ariaValueText)("aria-valuemin", r.ariaValueMin)("aria-valuemax", r.ariaValueMax), kn("ngx-slider-active", r.active))
                    },
                    features: [ue]
                })
                active = !1;
                role = "";
                tabindex = "";
                ariaOrientation = "";
                ariaLabel = "";
                ariaLabelledBy = "";
                ariaValueNow = "";
                ariaValueText = "";
                ariaValueMin = "";
                ariaValueMax = "";

                constructor(t, i, r) {
                    super(t, i, r)
                }

                static \u0275fac = function (i) {
                    return new (i || e)(M(dt), M(tn), M(Bi))
                };

                focus() {
                    this.elemRef.nativeElement.focus()
                }

                focusIfNeeded() {
                    document.activeElement !== this.elemRef.nativeElement && this.elemRef.nativeElement.focus()
                }
            }

            return e
        })(), ro = (() => {
            class e extends ui {
                static \u0275dir = z({type: e, selectors: [["", "ngxSliderLabel", ""]], features: [ue]})
                allowUnsafeHtmlInSlider;

                constructor(t, i, r, o) {
                    super(t, i, r), this.allowUnsafeHtmlInSlider = o
                }

                _value = null;

                get value() {
                    return this._value
                }

                static \u0275fac = function (i) {
                    return new (i || e)(M(dt), M(tn), M(Bi), M(LI, 8))
                };

                setValue(t) {
                    let i = !1;
                    !this.alwaysHide && (I.isNullOrUndefined(this.value) || this.value.length !== t.length || this.value.length > 0 && 0 === this.dimension) && (i = !0), this._value = t, !1 === this.allowUnsafeHtmlInSlider ? this.elemRef.nativeElement.innerText = t : this.elemRef.nativeElement.innerHTML = t, i && this.calculateDimension()
                }
            }

            return e
        })(), tj = (() => {
            class e {
                static \u0275cmp = Yt({
                    type: e,
                    selectors: [["ngx-slider-tooltip-wrapper"]],
                    inputs: {template: "template", tooltip: "tooltip", placement: "placement", content: "content"},
                    decls: 2,
                    vars: 2,
                    consts: [[4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ngx-slider-inner-tooltip"]],
                    template: function (i, r) {
                        1 & i && H(0, LB, 2, 6, "ng-container", 0)(1, PB, 3, 3, "ng-container", 0), 2 & i && (m("ngIf", r.template), f(), m("ngIf", !r.template))
                    },
                    dependencies: [jn, ND],
                    styles: [".ngx-slider-inner-tooltip[_ngcontent-%COMP%]{height:100%}"]
                })
                template;
                tooltip;
                placement;
                content;

                static \u0275fac = function (i) {
                    return new (i || e)
                };
            }

            return e
        })();

        class nj {
            selected = !1;
            style = {};
            tooltip = null;
            tooltipPlacement = null;
            value = null;
            valueTooltip = null;
            valueTooltipPlacement = null;
            legend = null
        }

        class FI {
            active = !1;
            value = 0;
            difference = 0;
            position = 0;
            lowLimit = 0;
            highLimit = 0
        }

        class bc {
            value;
            highValue;

            static compare(n, t) {
                return !(I.isNullOrUndefined(n) && I.isNullOrUndefined(t) || I.isNullOrUndefined(n) !== I.isNullOrUndefined(t)) && n.value === t.value && n.highValue === t.highValue
            }
        }

        class VI extends bc {
            forceChange;

            static compare(n, t) {
                return !(I.isNullOrUndefined(n) && I.isNullOrUndefined(t) || I.isNullOrUndefined(n) !== I.isNullOrUndefined(t)) && n.value === t.value && n.highValue === t.highValue && n.forceChange === t.forceChange
            }
        }

        const ij = {provide: an, useExisting: me(() => HI), multi: !0};
        let HI = (() => {
            class e {
                static \u0275cmp = Yt({
                    type: e,
                    selectors: [["ngx-slider"]],
                    contentQueries: function (i, r, o) {
                        if (1 & i && Ew(o, kB, 5), 2 & i) {
                            let s;
                            bt(s = It()) && (r.tooltipTemplate = s.first)
                        }
                    },
                    viewQuery: function (i, r) {
                        if (1 & i && (kt(FB, 5, ui), kt(VB, 5, ui), kt(HB, 5, ui), kt(BB, 5, ui), kt(jB, 5, Dp), kt(UB, 5, Dp), kt($B, 5, ro), kt(zB, 5, ro), kt(GB, 5, ro), kt(qB, 5, ro), kt(WB, 5, ro), kt(ZB, 5, ui)), 2 & i) {
                            let o;
                            bt(o = It()) && (r.leftOuterSelectionBarElement = o.first), bt(o = It()) && (r.rightOuterSelectionBarElement = o.first), bt(o = It()) && (r.fullBarElement = o.first), bt(o = It()) && (r.selectionBarElement = o.first), bt(o = It()) && (r.minHandleElement = o.first), bt(o = It()) && (r.maxHandleElement = o.first), bt(o = It()) && (r.floorLabelElement = o.first), bt(o = It()) && (r.ceilLabelElement = o.first), bt(o = It()) && (r.minHandleLabelElement = o.first), bt(o = It()) && (r.maxHandleLabelElement = o.first), bt(o = It()) && (r.combinedLabelElement = o.first), bt(o = It()) && (r.ticksElement = o.first)
                        }
                    },
                    hostVars: 10,
                    hostBindings: function (i, r) {
                        1 & i && W("resize", function (s) {
                            return r.onResize(s)
                        }, 0, Za), 2 & i && (ht("disabled", r.sliderElementDisabledAttr)("aria-label", r.sliderElementAriaLabel), kn("ngx-slider", r.sliderElementNgxSliderClass)("vertical", r.sliderElementVerticalClass)("animate", r.sliderElementAnimateClass)("with-legend", r.sliderElementWithLegendClass))
                    },
                    inputs: {
                        value: "value",
                        highValue: "highValue",
                        options: "options",
                        manualRefresh: "manualRefresh",
                        triggerFocus: "triggerFocus"
                    },
                    outputs: {
                        valueChange: "valueChange",
                        highValueChange: "highValueChange",
                        userChangeStart: "userChangeStart",
                        userChange: "userChange",
                        userChangeEnd: "userChangeEnd"
                    },
                    features: [Me([ij]), hn],
                    decls: 29,
                    vars: 13,
                    consts: [["leftOuterSelectionBar", ""], ["rightOuterSelectionBar", ""], ["fullBar", ""], ["selectionBar", ""], ["minHandle", ""], ["maxHandle", ""], ["floorLabel", ""], ["ceilLabel", ""], ["minHandleLabel", ""], ["maxHandleLabel", ""], ["combinedLabel", ""], ["ticksElement", ""], ["ngxSliderElement", "", 1, "ngx-slider-span", "ngx-slider-bar-wrapper", "ngx-slider-left-out-selection"], [1, "ngx-slider-span", "ngx-slider-bar"], ["ngxSliderElement", "", 1, "ngx-slider-span", "ngx-slider-bar-wrapper", "ngx-slider-right-out-selection"], ["ngxSliderElement", "", 1, "ngx-slider-span", "ngx-slider-bar-wrapper", "ngx-slider-full-bar"], ["ngxSliderElement", "", 1, "ngx-slider-span", "ngx-slider-bar-wrapper", "ngx-slider-selection-bar"], [1, "ngx-slider-span", "ngx-slider-bar", "ngx-slider-selection", 3, "ngStyle"], ["ngxSliderHandle", "", 1, "ngx-slider-span", "ngx-slider-pointer", "ngx-slider-pointer-min", 3, "ngStyle"], ["ngxSliderHandle", "", 1, "ngx-slider-span", "ngx-slider-pointer", "ngx-slider-pointer-max", 3, "ngStyle"], ["ngxSliderLabel", "", 1, "ngx-slider-span", "ngx-slider-bubble", "ngx-slider-limit", "ngx-slider-floor"], ["ngxSliderLabel", "", 1, "ngx-slider-span", "ngx-slider-bubble", "ngx-slider-limit", "ngx-slider-ceil"], ["ngxSliderLabel", "", 1, "ngx-slider-span", "ngx-slider-bubble", "ngx-slider-model-value"], ["ngxSliderLabel", "", 1, "ngx-slider-span", "ngx-slider-bubble", "ngx-slider-model-high"], ["ngxSliderLabel", "", 1, "ngx-slider-span", "ngx-slider-bubble", "ngx-slider-combined"], ["ngxSliderElement", "", 1, "ngx-slider-ticks", 3, "hidden"], ["class", "ngx-slider-tick", 3, "ngClass", "ngStyle", 4, "ngFor", "ngForOf"], [1, "ngx-slider-tick", 3, "ngClass", "ngStyle"], [3, "template", "tooltip", "placement"], ["class", "ngx-slider-span ngx-slider-tick-value", 3, "template", "tooltip", "placement", "content", 4, "ngIf"], ["class", "ngx-slider-span ngx-slider-tick-legend", 3, "innerText", 4, "ngIf"], ["class", "ngx-slider-span ngx-slider-tick-legend", 3, "innerHTML", 4, "ngIf"], [1, "ngx-slider-span", "ngx-slider-tick-value", 3, "template", "tooltip", "placement", "content"], [1, "ngx-slider-span", "ngx-slider-tick-legend", 3, "innerText"], [1, "ngx-slider-span", "ngx-slider-tick-legend", 3, "innerHTML"]],
                    template: function (i, r) {
                        1 & i && (y(0, "span", 12, 0), N(2, "span", 13), _(), y(3, "span", 14, 1), N(5, "span", 13), _(), y(6, "span", 15, 2), N(8, "span", 13), _(), y(9, "span", 16, 3), N(11, "span", 17), _(), N(12, "span", 18, 4)(14, "span", 19, 5)(16, "span", 20, 6)(18, "span", 21, 7)(20, "span", 22, 8)(22, "span", 23, 9)(24, "span", 24, 10), y(26, "span", 25, 11), H(28, JB, 5, 10, "span", 26), _()), 2 & i && (f(6), kn("ngx-slider-transparent", r.fullBarTransparentClass), f(3), kn("ngx-slider-draggable", r.selectionBarDraggableClass), f(2), m("ngStyle", r.barStyle), f(), m("ngStyle", r.minPointerStyle), f(2), El("display", r.range ? "inherit" : "none"), m("ngStyle", r.maxPointerStyle), f(12), kn("ngx-slider-ticks-values-under", r.ticksUnderValuesClass), m("hidden", !r.showTicks), f(2), m("ngForOf", r.ticks))
                    },
                    dependencies: [Xr, Ui, jn, OD, ui, Dp, ro, tj],
                    styles: ['.ngx-slider{display:inline-block;position:relative;height:4px;width:100%;margin:35px 0 15px;vertical-align:middle;-webkit-user-select:none;user-select:none;touch-action:pan-y}  .ngx-slider.with-legend{margin-bottom:40px}  .ngx-slider[disabled]{cursor:not-allowed}  .ngx-slider[disabled] .ngx-slider-pointer{cursor:not-allowed;background-color:#d8e0f3}  .ngx-slider[disabled] .ngx-slider-draggable{cursor:not-allowed}  .ngx-slider[disabled] .ngx-slider-selection{background:#8b91a2}  .ngx-slider[disabled] .ngx-slider-tick{cursor:not-allowed}  .ngx-slider[disabled] .ngx-slider-tick.ngx-slider-selected{background:#8b91a2}  .ngx-slider .ngx-slider-span{white-space:nowrap;position:absolute;display:inline-block}  .ngx-slider .ngx-slider-base{width:100%;height:100%;padding:0}  .ngx-slider .ngx-slider-bar-wrapper{left:0;box-sizing:border-box;margin-top:-16px;padding-top:16px;width:100%;height:32px;z-index:1}  .ngx-slider .ngx-slider-draggable{cursor:move}  .ngx-slider .ngx-slider-bar{left:0;width:100%;height:4px;z-index:1;background:#d8e0f3;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}  .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-transparent .ngx-slider-bar{background:transparent}  .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-left-out-selection .ngx-slider-bar{background:#df002d}  .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-right-out-selection .ngx-slider-bar{background:#03a688}  .ngx-slider .ngx-slider-selection{z-index:2;background:#0db9f0;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}  .ngx-slider .ngx-slider-pointer{cursor:pointer;width:32px;height:32px;top:-14px;background-color:#0db9f0;z-index:3;-webkit-border-radius:16px;-moz-border-radius:16px;border-radius:16px}  .ngx-slider .ngx-slider-pointer:after{content:"";width:8px;height:8px;position:absolute;top:12px;left:12px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;background:#fff}  .ngx-slider .ngx-slider-pointer:hover:after{background-color:#fff}  .ngx-slider .ngx-slider-pointer.ngx-slider-active{z-index:4}  .ngx-slider .ngx-slider-pointer.ngx-slider-active:after{background-color:#451aff}  .ngx-slider .ngx-slider-bubble{cursor:default;bottom:16px;padding:1px 3px;color:#55637d;font-size:16px}  .ngx-slider .ngx-slider-bubble.ngx-slider-limit{color:#55637d}  .ngx-slider .ngx-slider-ticks{box-sizing:border-box;width:100%;height:0;position:absolute;left:0;top:-3px;margin:0;z-index:1;list-style:none}  .ngx-slider .ngx-slider-ticks-values-under .ngx-slider-tick-value{top:auto;bottom:-36px}  .ngx-slider .ngx-slider-tick{text-align:center;cursor:pointer;width:10px;height:10px;background:#d8e0f3;border-radius:50%;position:absolute;top:0;left:0;margin-left:11px}  .ngx-slider .ngx-slider-tick.ngx-slider-selected{background:#0db9f0}  .ngx-slider .ngx-slider-tick-value{position:absolute;top:-34px;transform:translate(-50%)}  .ngx-slider .ngx-slider-tick-legend{position:absolute;top:24px;transform:translate(-50%);max-width:50px;white-space:normal}  .ngx-slider.vertical{position:relative;width:4px;height:100%;margin:0 20px;padding:0;vertical-align:baseline;touch-action:pan-x}  .ngx-slider.vertical .ngx-slider-base{width:100%;height:100%;padding:0}  .ngx-slider.vertical .ngx-slider-bar-wrapper{top:auto;left:0;margin:0 0 0 -16px;padding:0 0 0 16px;height:100%;width:32px}  .ngx-slider.vertical .ngx-slider-bar{bottom:0;left:auto;width:4px;height:100%}  .ngx-slider.vertical .ngx-slider-pointer{left:-14px!important;top:auto;bottom:0}  .ngx-slider.vertical .ngx-slider-bubble{left:16px!important;bottom:0}  .ngx-slider.vertical .ngx-slider-ticks{height:100%;width:0;left:-3px;top:0;z-index:1}  .ngx-slider.vertical .ngx-slider-tick{vertical-align:middle;margin-left:auto;margin-top:11px}  .ngx-slider.vertical .ngx-slider-tick-value{left:24px;top:auto;transform:translateY(-28%)}  .ngx-slider.vertical .ngx-slider-tick-legend{top:auto;right:24px;transform:translateY(-28%);max-width:none;white-space:nowrap}  .ngx-slider.vertical .ngx-slider-ticks-values-under .ngx-slider-tick-value{bottom:auto;left:auto;right:24px}  .ngx-slider *{transition:none}  .ngx-slider.animate .ngx-slider-bar-wrapper{transition:all linear .3s}  .ngx-slider.animate .ngx-slider-selection{transition:background-color linear .3s}  .ngx-slider.animate .ngx-slider-pointer{transition:all linear .3s}  .ngx-slider.animate .ngx-slider-pointer:after{transition:all linear .3s}  .ngx-slider.animate .ngx-slider-bubble{transition:all linear .3s}  .ngx-slider.animate .ngx-slider-bubble.ngx-slider-limit{transition:opacity linear .3s}  .ngx-slider.animate .ngx-slider-bubble.ngx-slider-combined{transition:opacity linear .3s}  .ngx-slider.animate .ngx-slider-tick{transition:background-color linear .3s}']
                })
                renderer;
                elementRef;
                changeDetectionRef;
                zone;
                allowUnsafeHtmlInSlider;
                sliderElementNgxSliderClass = !0;
                value = null;
                valueChange = new we;
                highValue = null;
                highValueChange = new we;
                options = new Dc;
                userChangeStart = new we;
                userChange = new we;
                userChangeEnd = new we;
                manualRefreshSubscription;
                triggerFocusSubscription;
                initHasRun = !1;
                inputModelChangeSubject = new ln;
                inputModelChangeSubscription = null;
                outputModelChangeSubject = new ln;
                outputModelChangeSubscription = null;
                viewLowValue = null;
                viewHighValue = null;
                viewOptions = new Dc;
                handleHalfDimension = 0;
                maxHandlePosition = 0;
                currentTrackingPointer = null;
                currentFocusPointer = null;
                firstKeyDown = !1;
                touchId = null;
                dragging = new FI;
                leftOuterSelectionBarElement;
                rightOuterSelectionBarElement;
                fullBarElement;
                selectionBarElement;
                minHandleElement;
                maxHandleElement;
                floorLabelElement;
                ceilLabelElement;
                minHandleLabelElement;
                maxHandleLabelElement;
                combinedLabelElement;
                ticksElement;
                tooltipTemplate;
                sliderElementVerticalClass = !1;
                sliderElementAnimateClass = !1;
                sliderElementWithLegendClass = !1;
                sliderElementDisabledAttr = null;
                sliderElementAriaLabel = "ngx-slider";
                barStyle = {};
                minPointerStyle = {};
                maxPointerStyle = {};
                fullBarTransparentClass = !1;
                selectionBarDraggableClass = !1;
                ticksUnderValuesClass = !1;
                intermediateTicks = !1;
                ticks = [];
                eventListenerHelper = null;
                onMoveEventListener = null;
                onEndEventListener = null;
                moving = !1;
                resizeObserver = null;
                onTouchedCallback = null;
                onChangeCallback = null;

                constructor(t, i, r, o, s) {
                    this.renderer = t, this.elementRef = i, this.changeDetectionRef = r, this.zone = o, this.allowUnsafeHtmlInSlider = s, this.eventListenerHelper = new kI(this.renderer)
                }

                set manualRefresh(t) {
                    this.unsubscribeManualRefresh(), this.manualRefreshSubscription = t.subscribe(() => {
                        setTimeout(() => this.calculateViewDimensionsAndDetectChanges())
                    })
                }

                set triggerFocus(t) {
                    this.unsubscribeTriggerFocus(), this.triggerFocusSubscription = t.subscribe(i => {
                        this.focusPointer(i)
                    })
                }

                get range() {
                    return !I.isNullOrUndefined(this.value) && !I.isNullOrUndefined(this.highValue)
                }

                get showTicks() {
                    return this.viewOptions.showTicks
                }

                static \u0275fac = function (i) {
                    return new (i || e)(M(tn), M(dt), M(Bi), M(ge), M(LI, 8))
                };

                ngOnInit() {
                    this.viewOptions = new Dc, Object.assign(this.viewOptions, this.options), this.updateDisabledState(), this.updateVerticalState(), this.updateAriaLabel()
                }

                ngAfterViewInit() {
                    this.applyOptions(), this.subscribeInputModelChangeSubject(), this.subscribeOutputModelChangeSubject(), this.renormaliseModelValues(), this.viewLowValue = this.modelValueToViewValue(this.value), this.viewHighValue = this.range ? this.modelValueToViewValue(this.highValue) : null, this.updateVerticalState(), this.manageElementsStyle(), this.updateDisabledState(), this.calculateViewDimensions(), this.addAccessibility(), this.updateCeilLabel(), this.updateFloorLabel(), this.initHandles(), this.manageEventsBindings(), this.updateAriaLabel(), this.subscribeResizeObserver(), this.initHasRun = !0, this.isRefDestroyed() || this.changeDetectionRef.detectChanges()
                }

                ngOnChanges(t) {
                    !I.isNullOrUndefined(t.options) && JSON.stringify(t.options.previousValue) !== JSON.stringify(t.options.currentValue) && this.onChangeOptions(), (!I.isNullOrUndefined(t.value) || !I.isNullOrUndefined(t.highValue)) && this.inputModelChangeSubject.next({
                        value: this.value,
                        highValue: this.highValue,
                        forceChange: !1,
                        internalChange: !1
                    })
                }

                ngOnDestroy() {
                    this.unbindEvents(), this.unsubscribeResizeObserver(), this.unsubscribeInputModelChangeSubject(), this.unsubscribeOutputModelChangeSubject(), this.unsubscribeManualRefresh(), this.unsubscribeTriggerFocus()
                }

                writeValue(t) {
                    t instanceof Array ? (this.value = t[0], this.highValue = t[1]) : this.value = t, this.inputModelChangeSubject.next({
                        value: this.value,
                        highValue: this.highValue,
                        forceChange: !1,
                        internalChange: !1
                    })
                }

                registerOnChange(t) {
                    this.onChangeCallback = t
                }

                registerOnTouched(t) {
                    this.onTouchedCallback = t
                }

                setDisabledState(t) {
                    this.viewOptions.disabled = t, this.updateDisabledState()
                }

                setAriaLabel(t) {
                    this.viewOptions.ariaLabel = t, this.updateAriaLabel()
                }

                onResize(t) {
                    this.calculateViewDimensionsAndDetectChanges()
                }

                subscribeInputModelChangeSubject() {
                    this.inputModelChangeSubscription = this.inputModelChangeSubject.pipe(MI(VI.compare), function IB(e, n) {
                        return pi((t, i) => {
                            let r = 0;
                            t.subscribe(Un(i, o => e.call(n, o, r++) && i.next(o)))
                        })
                    }(t => !t.forceChange && !t.internalChange)).subscribe(t => this.applyInputModelChange(t))
                }

                subscribeOutputModelChangeSubject() {
                    this.outputModelChangeSubscription = this.outputModelChangeSubject.pipe(MI(VI.compare)).subscribe(t => this.publishOutputModelChange(t))
                }

                subscribeResizeObserver() {
                    ci.isResizeObserverAvailable() && (this.resizeObserver = new ResizeObserver(() => this.calculateViewDimensionsAndDetectChanges()), this.resizeObserver.observe(this.elementRef.nativeElement))
                }

                unsubscribeResizeObserver() {
                    ci.isResizeObserverAvailable() && null !== this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null)
                }

                unsubscribeOnMove() {
                    I.isNullOrUndefined(this.onMoveEventListener) || (this.eventListenerHelper.detachEventListener(this.onMoveEventListener), this.onMoveEventListener = null)
                }

                unsubscribeOnEnd() {
                    I.isNullOrUndefined(this.onEndEventListener) || (this.eventListenerHelper.detachEventListener(this.onEndEventListener), this.onEndEventListener = null)
                }

                unsubscribeInputModelChangeSubject() {
                    I.isNullOrUndefined(this.inputModelChangeSubscription) || (this.inputModelChangeSubscription.unsubscribe(), this.inputModelChangeSubscription = null)
                }

                unsubscribeOutputModelChangeSubject() {
                    I.isNullOrUndefined(this.outputModelChangeSubscription) || (this.outputModelChangeSubscription.unsubscribe(), this.outputModelChangeSubscription = null)
                }

                unsubscribeManualRefresh() {
                    I.isNullOrUndefined(this.manualRefreshSubscription) || (this.manualRefreshSubscription.unsubscribe(), this.manualRefreshSubscription = null)
                }

                unsubscribeTriggerFocus() {
                    I.isNullOrUndefined(this.triggerFocusSubscription) || (this.triggerFocusSubscription.unsubscribe(), this.triggerFocusSubscription = null)
                }

                getPointerElement(t) {
                    return t === x.Min ? this.minHandleElement : t === x.Max ? this.maxHandleElement : null
                }

                getCurrentTrackingValue() {
                    return this.currentTrackingPointer === x.Min ? this.viewLowValue : this.currentTrackingPointer === x.Max ? this.viewHighValue : null
                }

                modelValueToViewValue(t) {
                    return I.isNullOrUndefined(t) ? NaN : I.isNullOrUndefined(this.viewOptions.stepsArray) || this.viewOptions.bindIndexForStepsArray ? +t : I.findStepIndex(+t, this.viewOptions.stepsArray)
                }

                viewValueToModelValue(t) {
                    return I.isNullOrUndefined(this.viewOptions.stepsArray) || this.viewOptions.bindIndexForStepsArray ? t : this.getStepValue(t)
                }

                getStepValue(t) {
                    const i = this.viewOptions.stepsArray[t];
                    return I.isNullOrUndefined(i) ? NaN : i.value
                }

                applyViewChange() {
                    this.value = this.viewValueToModelValue(this.viewLowValue), this.range && (this.highValue = this.viewValueToModelValue(this.viewHighValue)), this.outputModelChangeSubject.next({
                        value: this.value,
                        highValue: this.highValue,
                        userEventInitiated: !0,
                        forceChange: !1
                    }), this.inputModelChangeSubject.next({
                        value: this.value,
                        highValue: this.highValue,
                        forceChange: !1,
                        internalChange: !0
                    })
                }

                applyInputModelChange(t) {
                    const i = this.normaliseModelValues(t), r = !bc.compare(t, i);
                    r && (this.value = i.value, this.highValue = i.highValue), this.viewLowValue = this.modelValueToViewValue(i.value), this.viewHighValue = this.range ? this.modelValueToViewValue(i.highValue) : null, this.updateLowHandle(this.valueToPosition(this.viewLowValue)), this.range && this.updateHighHandle(this.valueToPosition(this.viewHighValue)), this.updateSelectionBar(), this.updateTicksScale(), this.updateAriaAttributes(), this.range && this.updateCombinedLabel(), this.outputModelChangeSubject.next({
                        value: i.value,
                        highValue: i.highValue,
                        forceChange: r,
                        userEventInitiated: !1
                    })
                }

                publishOutputModelChange(t) {
                    const i = () => {
                        this.valueChange.emit(t.value), this.range && this.highValueChange.emit(t.highValue), I.isNullOrUndefined(this.onChangeCallback) || this.onChangeCallback(this.range ? [t.value, t.highValue] : t.value), I.isNullOrUndefined(this.onTouchedCallback) || this.onTouchedCallback(this.range ? [t.value, t.highValue] : t.value)
                    };
                    t.userEventInitiated ? (i(), this.userChange.emit(this.getChangeContext())) : setTimeout(() => {
                        i()
                    })
                }

                normaliseModelValues(t) {
                    const i = new bc;
                    if (i.value = t.value, i.highValue = t.highValue, !I.isNullOrUndefined(this.viewOptions.stepsArray)) {
                        if (this.viewOptions.enforceStepsArray) {
                            const r = I.findStepIndex(i.value, this.viewOptions.stepsArray);
                            if (i.value = this.viewOptions.stepsArray[r].value, this.range) {
                                const o = I.findStepIndex(i.highValue, this.viewOptions.stepsArray);
                                i.highValue = this.viewOptions.stepsArray[o].value
                            }
                        }
                        return i
                    }
                    if (this.viewOptions.enforceStep && (i.value = this.roundStep(i.value), this.range && (i.highValue = this.roundStep(i.highValue))), this.viewOptions.enforceRange && (i.value = ke.clampToRange(i.value, this.viewOptions.floor, this.viewOptions.ceil), this.range && (i.highValue = ke.clampToRange(i.highValue, this.viewOptions.floor, this.viewOptions.ceil)), this.range && t.value > t.highValue)) if (this.viewOptions.noSwitching) i.value = i.highValue; else {
                        const r = t.value;
                        i.value = t.highValue, i.highValue = r
                    }
                    return i
                }

                renormaliseModelValues() {
                    const t = {value: this.value, highValue: this.highValue}, i = this.normaliseModelValues(t);
                    bc.compare(i, t) || (this.value = i.value, this.highValue = i.highValue, this.outputModelChangeSubject.next({
                        value: this.value,
                        highValue: this.highValue,
                        forceChange: !0,
                        userEventInitiated: !1
                    }))
                }

                onChangeOptions() {
                    if (!this.initHasRun) return;
                    const t = this.getOptionsInfluencingEventBindings(this.viewOptions);
                    this.applyOptions();
                    const i = this.getOptionsInfluencingEventBindings(this.viewOptions), r = !I.areArraysEqual(t, i);
                    this.renormaliseModelValues(), this.viewLowValue = this.modelValueToViewValue(this.value), this.viewHighValue = this.range ? this.modelValueToViewValue(this.highValue) : null, this.resetSlider(r)
                }

                applyOptions() {
                    if (this.viewOptions = new Dc, Object.assign(this.viewOptions, this.options), this.viewOptions.draggableRange = this.range && this.viewOptions.draggableRange, this.viewOptions.draggableRangeOnly = this.range && this.viewOptions.draggableRangeOnly, this.viewOptions.draggableRangeOnly && (this.viewOptions.draggableRange = !0), this.viewOptions.showTicks = this.viewOptions.showTicks || this.viewOptions.showTicksValues || !I.isNullOrUndefined(this.viewOptions.ticksArray), this.viewOptions.showTicks && (!I.isNullOrUndefined(this.viewOptions.tickStep) || !I.isNullOrUndefined(this.viewOptions.ticksArray)) && (this.intermediateTicks = !0), this.viewOptions.showSelectionBar = this.viewOptions.showSelectionBar || this.viewOptions.showSelectionBarEnd || !I.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue), I.isNullOrUndefined(this.viewOptions.stepsArray) ? this.applyFloorCeilOptions() : this.applyStepsArrayOptions(), I.isNullOrUndefined(this.viewOptions.combineLabels) && (this.viewOptions.combineLabels = (t, i) => t + " - " + i), this.viewOptions.logScale && 0 === this.viewOptions.floor) throw Error("Can't use floor=0 with logarithmic scale")
                }

                applyStepsArrayOptions() {
                    this.viewOptions.floor = 0, this.viewOptions.ceil = this.viewOptions.stepsArray.length - 1, this.viewOptions.step = 1, I.isNullOrUndefined(this.viewOptions.translate) && (this.viewOptions.translate = t => String(this.viewOptions.bindIndexForStepsArray ? this.getStepValue(t) : t))
                }

                applyFloorCeilOptions() {
                    if (I.isNullOrUndefined(this.viewOptions.step) ? this.viewOptions.step = 1 : (this.viewOptions.step = +this.viewOptions.step, this.viewOptions.step <= 0 && (this.viewOptions.step = 1)), I.isNullOrUndefined(this.viewOptions.ceil) || I.isNullOrUndefined(this.viewOptions.floor)) throw Error("floor and ceil options must be supplied");
                    this.viewOptions.ceil = +this.viewOptions.ceil, this.viewOptions.floor = +this.viewOptions.floor, I.isNullOrUndefined(this.viewOptions.translate) && (this.viewOptions.translate = t => String(t))
                }

                resetSlider(t = !0) {
                    this.manageElementsStyle(), this.addAccessibility(), this.updateCeilLabel(), this.updateFloorLabel(), t && (this.unbindEvents(), this.manageEventsBindings()), this.updateDisabledState(), this.updateAriaLabel(), this.calculateViewDimensions(), this.refocusPointerIfNeeded()
                }

                focusPointer(t) {
                    t !== x.Min && t !== x.Max && (t = x.Min), t === x.Min ? this.minHandleElement.focus() : this.range && t === x.Max && this.maxHandleElement.focus()
                }

                refocusPointerIfNeeded() {
                    I.isNullOrUndefined(this.currentFocusPointer) || this.getPointerElement(this.currentFocusPointer).focusIfNeeded()
                }

                manageElementsStyle() {
                    this.updateScale(), this.floorLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels), this.ceilLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
                    const t = this.viewOptions.showTicksValues && !this.intermediateTicks;
                    this.minHandleLabelElement.setAlwaysHide(t || this.viewOptions.hidePointerLabels), this.maxHandleLabelElement.setAlwaysHide(t || !this.range || this.viewOptions.hidePointerLabels), this.combinedLabelElement.setAlwaysHide(t || !this.range || this.viewOptions.hidePointerLabels), this.selectionBarElement.setAlwaysHide(!this.range && !this.viewOptions.showSelectionBar), this.leftOuterSelectionBarElement.setAlwaysHide(!this.range || !this.viewOptions.showOuterSelectionBars), this.rightOuterSelectionBarElement.setAlwaysHide(!this.range || !this.viewOptions.showOuterSelectionBars), this.fullBarTransparentClass = this.range && this.viewOptions.showOuterSelectionBars, this.selectionBarDraggableClass = this.viewOptions.draggableRange && !this.viewOptions.onlyBindHandles, this.ticksUnderValuesClass = this.intermediateTicks && this.options.showTicksValues, this.sliderElementVerticalClass !== this.viewOptions.vertical && (this.updateVerticalState(), setTimeout(() => {
                        this.resetSlider()
                    })), this.sliderElementAnimateClass !== this.viewOptions.animate && setTimeout(() => {
                        this.sliderElementAnimateClass = this.viewOptions.animate
                    }), this.updateRotate()
                }

                manageEventsBindings() {
                    this.viewOptions.disabled || this.viewOptions.readOnly ? this.unbindEvents() : this.bindEvents()
                }

                updateDisabledState() {
                    this.sliderElementDisabledAttr = this.viewOptions.disabled ? "disabled" : null
                }

                updateAriaLabel() {
                    this.sliderElementAriaLabel = this.viewOptions.ariaLabel || "nxg-slider"
                }

                updateVerticalState() {
                    this.sliderElementVerticalClass = this.viewOptions.vertical;
                    for (const t of this.getAllSliderElements()) I.isNullOrUndefined(t) || t.setVertical(this.viewOptions.vertical)
                }

                updateScale() {
                    for (const t of this.getAllSliderElements()) t.setScale(this.viewOptions.scale)
                }

                updateRotate() {
                    for (const t of this.getAllSliderElements()) t.setRotate(this.viewOptions.rotate)
                }

                getAllSliderElements() {
                    return [this.leftOuterSelectionBarElement, this.rightOuterSelectionBarElement, this.fullBarElement, this.selectionBarElement, this.minHandleElement, this.maxHandleElement, this.floorLabelElement, this.ceilLabelElement, this.minHandleLabelElement, this.maxHandleLabelElement, this.combinedLabelElement, this.ticksElement]
                }

                initHandles() {
                    this.updateLowHandle(this.valueToPosition(this.viewLowValue)), this.range && this.updateHighHandle(this.valueToPosition(this.viewHighValue)), this.updateSelectionBar(), this.range && this.updateCombinedLabel(), this.updateTicksScale()
                }

                addAccessibility() {
                    this.updateAriaAttributes(), this.minHandleElement.role = "slider", this.minHandleElement.tabindex = !this.viewOptions.keyboardSupport || this.viewOptions.readOnly || this.viewOptions.disabled ? "" : "0", this.minHandleElement.ariaOrientation = this.viewOptions.vertical || 0 !== this.viewOptions.rotate ? "vertical" : "horizontal", I.isNullOrUndefined(this.viewOptions.ariaLabel) ? I.isNullOrUndefined(this.viewOptions.ariaLabelledBy) || (this.minHandleElement.ariaLabelledBy = this.viewOptions.ariaLabelledBy) : this.minHandleElement.ariaLabel = this.viewOptions.ariaLabel, this.range && (this.maxHandleElement.role = "slider", this.maxHandleElement.tabindex = !this.viewOptions.keyboardSupport || this.viewOptions.readOnly || this.viewOptions.disabled ? "" : "0", this.maxHandleElement.ariaOrientation = this.viewOptions.vertical || 0 !== this.viewOptions.rotate ? "vertical" : "horizontal", I.isNullOrUndefined(this.viewOptions.ariaLabelHigh) ? I.isNullOrUndefined(this.viewOptions.ariaLabelledByHigh) || (this.maxHandleElement.ariaLabelledBy = this.viewOptions.ariaLabelledByHigh) : this.maxHandleElement.ariaLabel = this.viewOptions.ariaLabelHigh)
                }

                updateAriaAttributes() {
                    this.minHandleElement.ariaValueNow = (+this.value).toString(), this.minHandleElement.ariaValueText = this.viewOptions.translate(+this.value, In.Low), this.minHandleElement.ariaValueMin = this.viewOptions.floor.toString(), this.minHandleElement.ariaValueMax = this.viewOptions.ceil.toString(), this.range && (this.maxHandleElement.ariaValueNow = (+this.highValue).toString(), this.maxHandleElement.ariaValueText = this.viewOptions.translate(+this.highValue, In.High), this.maxHandleElement.ariaValueMin = this.viewOptions.floor.toString(), this.maxHandleElement.ariaValueMax = this.viewOptions.ceil.toString())
                }

                calculateViewDimensions() {
                    I.isNullOrUndefined(this.viewOptions.handleDimension) ? this.minHandleElement.calculateDimension() : this.minHandleElement.setDimension(this.viewOptions.handleDimension);
                    const t = this.minHandleElement.dimension;
                    this.handleHalfDimension = t / 2, I.isNullOrUndefined(this.viewOptions.barDimension) ? this.fullBarElement.calculateDimension() : this.fullBarElement.setDimension(this.viewOptions.barDimension), this.maxHandlePosition = this.fullBarElement.dimension - t, this.initHasRun && (this.updateFloorLabel(), this.updateCeilLabel(), this.initHandles())
                }

                calculateViewDimensionsAndDetectChanges() {
                    this.calculateViewDimensions(), this.isRefDestroyed() || this.changeDetectionRef.detectChanges()
                }

                isRefDestroyed() {
                    return this.changeDetectionRef.destroyed
                }

                updateTicksScale() {
                    if (!this.viewOptions.showTicks && this.sliderElementWithLegendClass) return void setTimeout(() => {
                        this.sliderElementWithLegendClass = !1
                    });
                    const t = I.isNullOrUndefined(this.viewOptions.ticksArray) ? this.getTicksArray() : this.viewOptions.ticksArray,
                        i = this.viewOptions.vertical ? "translateY" : "translateX";
                    this.viewOptions.rightToLeft && t.reverse();
                    const r = I.isNullOrUndefined(this.viewOptions.tickValueStep) ? I.isNullOrUndefined(this.viewOptions.tickStep) ? this.viewOptions.step : this.viewOptions.tickStep : this.viewOptions.tickValueStep;
                    let o = !1;
                    const s = t.map(a => {
                        let l = this.valueToPosition(a);
                        this.viewOptions.vertical && (l = this.maxHandlePosition - l);
                        const c = i + "(" + Math.round(l) + "px)", u = new nj;
                        u.selected = this.isTickSelected(a), u.style = {
                            "-webkit-transform": c,
                            "-moz-transform": c,
                            "-o-transform": c,
                            "-ms-transform": c,
                            transform: c
                        }, u.selected && !I.isNullOrUndefined(this.viewOptions.getSelectionBarColor) && (u.style["background-color"] = this.getSelectionBarColor()), !u.selected && !I.isNullOrUndefined(this.viewOptions.getTickColor) && (u.style["background-color"] = this.getTickColor(a)), I.isNullOrUndefined(this.viewOptions.ticksTooltip) || (u.tooltip = this.viewOptions.ticksTooltip(a), u.tooltipPlacement = this.viewOptions.vertical ? "right" : "top"), this.viewOptions.showTicksValues && !I.isNullOrUndefined(r) && ke.isModuloWithinPrecisionLimit(a, r, this.viewOptions.precisionLimit) && (u.value = this.getDisplayValue(a, In.TickValue), I.isNullOrUndefined(this.viewOptions.ticksValuesTooltip) || (u.valueTooltip = this.viewOptions.ticksValuesTooltip(a), u.valueTooltipPlacement = this.viewOptions.vertical ? "right" : "top"));
                        let d = null;
                        if (I.isNullOrUndefined(this.viewOptions.stepsArray)) I.isNullOrUndefined(this.viewOptions.getLegend) || (d = this.viewOptions.getLegend(a)); else {
                            const h = this.viewOptions.stepsArray[a];
                            I.isNullOrUndefined(this.viewOptions.getStepLegend) ? I.isNullOrUndefined(h) || (d = h.legend) : d = this.viewOptions.getStepLegend(h)
                        }
                        return I.isNullOrUndefined(d) || (u.legend = d, o = !0), u
                    });
                    if (this.sliderElementWithLegendClass !== o && setTimeout(() => {
                        this.sliderElementWithLegendClass = o
                    }), I.isNullOrUndefined(this.ticks) || this.ticks.length !== s.length) this.ticks = s, this.isRefDestroyed() || this.changeDetectionRef.detectChanges(); else for (let a = 0; a < s.length; ++a) Object.assign(this.ticks[a], s[a])
                }

                getTicksArray() {
                    if (!this.viewOptions.showTicks) return [];
                    const t = I.isNullOrUndefined(this.viewOptions.tickStep) ? this.viewOptions.step : this.viewOptions.tickStep,
                        i = [],
                        r = 1 + Math.floor(ke.roundToPrecisionLimit(Math.abs(this.viewOptions.ceil - this.viewOptions.floor) / t, this.viewOptions.precisionLimit));
                    for (let o = 0; o < r; ++o) i.push(ke.roundToPrecisionLimit(this.viewOptions.floor + t * o, this.viewOptions.precisionLimit));
                    return i
                }

                isTickSelected(t) {
                    if (!this.range) if (I.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                        if (this.viewOptions.showSelectionBarEnd) {
                            if (t >= this.viewLowValue) return !0
                        } else if (this.viewOptions.showSelectionBar && t <= this.viewLowValue) return !0
                    } else {
                        const i = this.viewOptions.showSelectionBarFromValue;
                        if (this.viewLowValue > i && t >= i && t <= this.viewLowValue) return !0;
                        if (this.viewLowValue < i && t <= i && t >= this.viewLowValue) return !0
                    }
                    return !!(this.range && t >= this.viewLowValue && t <= this.viewHighValue)
                }

                updateFloorLabel() {
                    this.floorLabelElement.alwaysHide || (this.floorLabelElement.setValue(this.getDisplayValue(this.viewOptions.floor, In.Floor)), this.floorLabelElement.calculateDimension(), this.floorLabelElement.setPosition(this.viewOptions.rightToLeft ? this.fullBarElement.dimension - this.floorLabelElement.dimension : 0))
                }

                updateCeilLabel() {
                    this.ceilLabelElement.alwaysHide || (this.ceilLabelElement.setValue(this.getDisplayValue(this.viewOptions.ceil, In.Ceil)), this.ceilLabelElement.calculateDimension(), this.ceilLabelElement.setPosition(this.viewOptions.rightToLeft ? 0 : this.fullBarElement.dimension - this.ceilLabelElement.dimension))
                }

                updateHandles(t, i) {
                    t === x.Min ? this.updateLowHandle(i) : t === x.Max && this.updateHighHandle(i), this.updateSelectionBar(), this.updateTicksScale(), this.range && this.updateCombinedLabel()
                }

                getHandleLabelPos(t, i) {
                    const r = t === x.Min ? this.minHandleLabelElement.dimension : this.maxHandleLabelElement.dimension,
                        o = i - r / 2 + this.handleHalfDimension, s = this.fullBarElement.dimension - r;
                    return this.viewOptions.boundPointerLabels ? this.viewOptions.rightToLeft && t === x.Min || !this.viewOptions.rightToLeft && t === x.Max ? Math.min(o, s) : Math.min(Math.max(o, 0), s) : o
                }

                updateLowHandle(t) {
                    this.minHandleElement.setPosition(t), this.minHandleLabelElement.setValue(this.getDisplayValue(this.viewLowValue, In.Low)), this.minHandleLabelElement.setPosition(this.getHandleLabelPos(x.Min, t)), I.isNullOrUndefined(this.viewOptions.getPointerColor) || (this.minPointerStyle = {backgroundColor: this.getPointerColor(x.Min)}), this.viewOptions.autoHideLimitLabels && this.updateFloorAndCeilLabelsVisibility()
                }

                updateHighHandle(t) {
                    this.maxHandleElement.setPosition(t), this.maxHandleLabelElement.setValue(this.getDisplayValue(this.viewHighValue, In.High)), this.maxHandleLabelElement.setPosition(this.getHandleLabelPos(x.Max, t)), I.isNullOrUndefined(this.viewOptions.getPointerColor) || (this.maxPointerStyle = {backgroundColor: this.getPointerColor(x.Max)}), this.viewOptions.autoHideLimitLabels && this.updateFloorAndCeilLabelsVisibility()
                }

                updateFloorAndCeilLabelsVisibility() {
                    if (this.viewOptions.hidePointerLabels) return;
                    let t = !1, i = !1;
                    const r = this.isLabelBelowFloorLabel(this.minHandleLabelElement),
                        o = this.isLabelAboveCeilLabel(this.minHandleLabelElement),
                        s = this.isLabelAboveCeilLabel(this.maxHandleLabelElement),
                        a = this.isLabelBelowFloorLabel(this.combinedLabelElement),
                        l = this.isLabelAboveCeilLabel(this.combinedLabelElement);
                    if (r ? (t = !0, this.floorLabelElement.hide()) : (t = !1, this.floorLabelElement.show()), o ? (i = !0, this.ceilLabelElement.hide()) : (i = !1, this.ceilLabelElement.show()), this.range) {
                        const c = this.combinedLabelElement.isVisible() ? l : s,
                            u = this.combinedLabelElement.isVisible() ? a : r;
                        c ? this.ceilLabelElement.hide() : i || this.ceilLabelElement.show(), u ? this.floorLabelElement.hide() : t || this.floorLabelElement.show()
                    }
                }

                isLabelBelowFloorLabel(t) {
                    const i = t.position, o = this.floorLabelElement.position;
                    return this.viewOptions.rightToLeft ? i + t.dimension >= o - 2 : i <= o + this.floorLabelElement.dimension + 2
                }

                isLabelAboveCeilLabel(t) {
                    const i = t.position, o = this.ceilLabelElement.position;
                    return this.viewOptions.rightToLeft ? i <= o + this.ceilLabelElement.dimension + 2 : i + t.dimension >= o - 2
                }

                updateSelectionBar() {
                    let t = 0, i = 0;
                    const r = this.viewOptions.rightToLeft ? !this.viewOptions.showSelectionBarEnd : this.viewOptions.showSelectionBarEnd,
                        o = this.viewOptions.rightToLeft ? this.maxHandleElement.position + this.handleHalfDimension : this.minHandleElement.position + this.handleHalfDimension;
                    if (this.range) i = Math.abs(this.maxHandleElement.position - this.minHandleElement.position), t = o; else if (I.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) r ? (i = Math.ceil(Math.abs(this.maxHandlePosition - this.minHandleElement.position) + this.handleHalfDimension), t = Math.floor(this.minHandleElement.position + this.handleHalfDimension)) : (i = this.minHandleElement.position + this.handleHalfDimension, t = 0); else {
                        const s = this.viewOptions.showSelectionBarFromValue, a = this.valueToPosition(s);
                        (this.viewOptions.rightToLeft ? this.viewLowValue <= s : this.viewLowValue > s) ? (i = this.minHandleElement.position - a, t = a + this.handleHalfDimension) : (i = a - this.minHandleElement.position, t = this.minHandleElement.position + this.handleHalfDimension)
                    }
                    if (this.selectionBarElement.setDimension(i), this.selectionBarElement.setPosition(t), this.range && this.viewOptions.showOuterSelectionBars && (this.viewOptions.rightToLeft ? (this.rightOuterSelectionBarElement.setDimension(t), this.rightOuterSelectionBarElement.setPosition(0), this.fullBarElement.calculateDimension(), this.leftOuterSelectionBarElement.setDimension(this.fullBarElement.dimension - (t + i)), this.leftOuterSelectionBarElement.setPosition(t + i)) : (this.leftOuterSelectionBarElement.setDimension(t), this.leftOuterSelectionBarElement.setPosition(0), this.fullBarElement.calculateDimension(), this.rightOuterSelectionBarElement.setDimension(this.fullBarElement.dimension - (t + i)), this.rightOuterSelectionBarElement.setPosition(t + i))), I.isNullOrUndefined(this.viewOptions.getSelectionBarColor)) {
                        if (!I.isNullOrUndefined(this.viewOptions.selectionBarGradient)) {
                            const s = I.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue) ? 0 : this.valueToPosition(this.viewOptions.showSelectionBarFromValue),
                                a = s - t > 0 && !r || s - t <= 0 && r;
                            this.barStyle = {backgroundImage: "linear-gradient(to " + (this.viewOptions.vertical ? a ? "bottom" : "top" : a ? "left" : "right") + ", " + this.viewOptions.selectionBarGradient.from + " 0%," + this.viewOptions.selectionBarGradient.to + " 100%)"}, this.viewOptions.vertical ? (this.barStyle.backgroundPosition = "center " + (s + i + t + (a ? -this.handleHalfDimension : 0)) + "px", this.barStyle.backgroundSize = "100% " + (this.fullBarElement.dimension - this.handleHalfDimension) + "px") : (this.barStyle.backgroundPosition = s - t + (a ? this.handleHalfDimension : 0) + "px center", this.barStyle.backgroundSize = this.fullBarElement.dimension - this.handleHalfDimension + "px 100%")
                        }
                    } else {
                        const s = this.getSelectionBarColor();
                        this.barStyle = {backgroundColor: s}
                    }
                }

                getSelectionBarColor() {
                    return this.range ? this.viewOptions.getSelectionBarColor(this.value, this.highValue) : this.viewOptions.getSelectionBarColor(this.value)
                }

                getPointerColor(t) {
                    return this.viewOptions.getPointerColor(t === x.Max ? this.highValue : this.value, t)
                }

                getTickColor(t) {
                    return this.viewOptions.getTickColor(t)
                }

                updateCombinedLabel() {
                    let t = null;
                    if (t = this.viewOptions.rightToLeft ? this.minHandleLabelElement.position - this.minHandleLabelElement.dimension - 10 <= this.maxHandleLabelElement.position : this.minHandleLabelElement.position + this.minHandleLabelElement.dimension + 10 >= this.maxHandleLabelElement.position, t) {
                        const i = this.getDisplayValue(this.viewLowValue, In.Low),
                            r = this.getDisplayValue(this.viewHighValue, In.High),
                            o = this.viewOptions.rightToLeft ? this.viewOptions.combineLabels(r, i) : this.viewOptions.combineLabels(i, r);
                        this.combinedLabelElement.setValue(o);
                        const s = this.viewOptions.boundPointerLabels ? Math.min(Math.max(this.selectionBarElement.position + this.selectionBarElement.dimension / 2 - this.combinedLabelElement.dimension / 2, 0), this.fullBarElement.dimension - this.combinedLabelElement.dimension) : this.selectionBarElement.position + this.selectionBarElement.dimension / 2 - this.combinedLabelElement.dimension / 2;
                        this.combinedLabelElement.setPosition(s), this.minHandleLabelElement.hide(), this.maxHandleLabelElement.hide(), this.combinedLabelElement.show()
                    } else this.updateHighHandle(this.valueToPosition(this.viewHighValue)), this.updateLowHandle(this.valueToPosition(this.viewLowValue)), this.maxHandleLabelElement.show(), this.minHandleLabelElement.show(), this.combinedLabelElement.hide();
                    this.viewOptions.autoHideLimitLabels && this.updateFloorAndCeilLabelsVisibility()
                }

                getDisplayValue(t, i) {
                    return !I.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray && (t = this.getStepValue(t)), this.viewOptions.translate(t, i)
                }

                roundStep(t, i) {
                    const r = I.isNullOrUndefined(i) ? this.viewOptions.step : i;
                    let o = ke.roundToPrecisionLimit((t - this.viewOptions.floor) / r, this.viewOptions.precisionLimit);
                    return o = Math.round(o) * r, ke.roundToPrecisionLimit(this.viewOptions.floor + o, this.viewOptions.precisionLimit)
                }

                valueToPosition(t) {
                    let i = I.linearValueToPosition;
                    I.isNullOrUndefined(this.viewOptions.customValueToPosition) ? this.viewOptions.logScale && (i = I.logValueToPosition) : i = this.viewOptions.customValueToPosition;
                    let r = i(t = ke.clampToRange(t, this.viewOptions.floor, this.viewOptions.ceil), this.viewOptions.floor, this.viewOptions.ceil);
                    return I.isNullOrUndefined(r) && (r = 0), this.viewOptions.rightToLeft && (r = 1 - r), r * this.maxHandlePosition
                }

                positionToValue(t) {
                    let i = t / this.maxHandlePosition;
                    this.viewOptions.rightToLeft && (i = 1 - i);
                    let r = I.linearPositionToValue;
                    I.isNullOrUndefined(this.viewOptions.customPositionToValue) ? this.viewOptions.logScale && (r = I.logPositionToValue) : r = this.viewOptions.customPositionToValue;
                    const o = r(i, this.viewOptions.floor, this.viewOptions.ceil);
                    return I.isNullOrUndefined(o) ? 0 : o
                }

                getEventXY(t, i) {
                    if (t instanceof MouseEvent) return this.viewOptions.vertical || 0 !== this.viewOptions.rotate ? t.clientY : t.clientX;
                    let r = 0;
                    const o = t.touches;
                    if (!I.isNullOrUndefined(i)) for (let s = 0; s < o.length; s++) if (o[s].identifier === i) {
                        r = s;
                        break
                    }
                    return this.viewOptions.vertical || 0 !== this.viewOptions.rotate ? o[r].clientY : o[r].clientX
                }

                getEventPosition(t, i) {
                    const r = this.elementRef.nativeElement.getBoundingClientRect(),
                        o = this.viewOptions.vertical || 0 !== this.viewOptions.rotate ? r.bottom : r.left;
                    let s = 0;
                    return s = this.viewOptions.vertical || 0 !== this.viewOptions.rotate ? -this.getEventXY(t, i) + o : this.getEventXY(t, i) - o, s * this.viewOptions.scale - this.handleHalfDimension
                }

                getNearestHandle(t) {
                    if (!this.range) return x.Min;
                    const i = this.getEventPosition(t), r = Math.abs(i - this.minHandleElement.position),
                        o = Math.abs(i - this.maxHandleElement.position);
                    return r < o ? x.Min : r > o ? x.Max : this.viewOptions.rightToLeft ? i > this.minHandleElement.position ? x.Min : x.Max : i < this.minHandleElement.position ? x.Min : x.Max
                }

                bindEvents() {
                    const t = this.viewOptions.draggableRange;
                    this.viewOptions.onlyBindHandles || this.selectionBarElement.on("mousedown", i => this.onBarStart(null, t, i, !0, !0, !0)), this.viewOptions.draggableRangeOnly ? (this.minHandleElement.on("mousedown", i => this.onBarStart(x.Min, t, i, !0, !0)), this.maxHandleElement.on("mousedown", i => this.onBarStart(x.Max, t, i, !0, !0))) : (this.minHandleElement.on("mousedown", i => this.onStart(x.Min, i, !0, !0)), this.range && this.maxHandleElement.on("mousedown", i => this.onStart(x.Max, i, !0, !0)), this.viewOptions.onlyBindHandles || (this.fullBarElement.on("mousedown", i => this.onStart(null, i, !0, !0, !0)), this.ticksElement.on("mousedown", i => this.onStart(null, i, !0, !0, !0, !0)))), this.viewOptions.onlyBindHandles || this.selectionBarElement.onPassive("touchstart", i => this.onBarStart(null, t, i, !0, !0, !0)), this.viewOptions.draggableRangeOnly ? (this.minHandleElement.onPassive("touchstart", i => this.onBarStart(x.Min, t, i, !0, !0)), this.maxHandleElement.onPassive("touchstart", i => this.onBarStart(x.Max, t, i, !0, !0))) : (this.minHandleElement.onPassive("touchstart", i => this.onStart(x.Min, i, !0, !0)), this.range && this.maxHandleElement.onPassive("touchstart", i => this.onStart(x.Max, i, !0, !0)), this.viewOptions.onlyBindHandles || (this.fullBarElement.onPassive("touchstart", i => this.onStart(null, i, !0, !0, !0)), this.ticksElement.onPassive("touchstart", i => this.onStart(null, i, !1, !1, !0, !0)))), this.viewOptions.keyboardSupport && (this.minHandleElement.on("focus", () => this.onPointerFocus(x.Min)), this.range && this.maxHandleElement.on("focus", () => this.onPointerFocus(x.Max)))
                }

                getOptionsInfluencingEventBindings(t) {
                    return [t.disabled, t.readOnly, t.draggableRange, t.draggableRangeOnly, t.onlyBindHandles, t.keyboardSupport]
                }

                unbindEvents() {
                    this.unsubscribeOnMove(), this.unsubscribeOnEnd();
                    for (const t of this.getAllSliderElements()) I.isNullOrUndefined(t) || t.off()
                }

                onBarStart(t, i, r, o, s, a, l) {
                    i ? this.onDragStart(t, r, o, s) : this.onStart(t, r, o, s, a, l)
                }

                onStart(t, i, r, o, s, a) {
                    i.stopPropagation(), !ci.isTouchEvent(i) && !OI && i.preventDefault(), this.moving = !1, this.calculateViewDimensions(), I.isNullOrUndefined(t) && (t = this.getNearestHandle(i)), this.currentTrackingPointer = t;
                    const l = this.getPointerElement(t);
                    if (l.active = !0, this.viewOptions.keyboardSupport && l.focus(), r) {
                        this.unsubscribeOnMove();
                        const c = u => this.dragging.active ? this.onDragMove(u) : this.onMove(u);
                        this.onMoveEventListener = ci.isTouchEvent(i) ? this.eventListenerHelper.attachPassiveEventListener(document, "touchmove", c) : this.eventListenerHelper.attachEventListener(document, "mousemove", c)
                    }
                    if (o) {
                        this.unsubscribeOnEnd();
                        const c = u => this.onEnd(u);
                        this.onEndEventListener = ci.isTouchEvent(i) ? this.eventListenerHelper.attachPassiveEventListener(document, "touchend", c) : this.eventListenerHelper.attachEventListener(document, "mouseup", c)
                    }
                    this.userChangeStart.emit(this.getChangeContext()), ci.isTouchEvent(i) && !I.isNullOrUndefined(i.changedTouches) && I.isNullOrUndefined(this.touchId) && (this.touchId = i.changedTouches[0].identifier), s && this.onMove(i, !0), a && this.onEnd(i)
                }

                onMove(t, i) {
                    let r = null;
                    if (ci.isTouchEvent(t)) {
                        const c = t.changedTouches;
                        for (let u = 0; u < c.length; u++) if (c[u].identifier === this.touchId) {
                            r = c[u];
                            break
                        }
                        if (I.isNullOrUndefined(r)) return
                    }
                    this.viewOptions.animate && !this.viewOptions.animateOnMove && this.moving && (this.sliderElementAnimateClass = !1), this.moving = !0;
                    const o = I.isNullOrUndefined(r) ? this.getEventPosition(t) : this.getEventPosition(t, r.identifier);
                    let s;
                    o <= 0 ? s = this.viewOptions.rightToLeft ? this.viewOptions.ceil : this.viewOptions.floor : o >= this.maxHandlePosition ? s = this.viewOptions.rightToLeft ? this.viewOptions.floor : this.viewOptions.ceil : (s = this.positionToValue(o), s = i && !I.isNullOrUndefined(this.viewOptions.tickStep) ? this.roundStep(s, this.viewOptions.tickStep) : this.roundStep(s)), this.positionTrackingHandle(s)
                }

                onEnd(t) {
                    ci.isTouchEvent(t) && t.changedTouches[0].identifier !== this.touchId || (this.moving = !1, this.viewOptions.animate && (this.sliderElementAnimateClass = !0), this.touchId = null, this.viewOptions.keyboardSupport || (this.minHandleElement.active = !1, this.maxHandleElement.active = !1, this.currentTrackingPointer = null), this.dragging.active = !1, this.unsubscribeOnMove(), this.unsubscribeOnEnd(), this.userChangeEnd.emit(this.getChangeContext()))
                }

                onPointerFocus(t) {
                    const i = this.getPointerElement(t);
                    i.on("blur", () => this.onPointerBlur(i)), i.on("keydown", r => this.onKeyboardEvent(r)), i.on("keyup", () => this.onKeyUp()), i.active = !0, this.currentTrackingPointer = t, this.currentFocusPointer = t, this.firstKeyDown = !0
                }

                onKeyUp() {
                    this.firstKeyDown = !0, this.userChangeEnd.emit(this.getChangeContext())
                }

                onPointerBlur(t) {
                    t.off("blur"), t.off("keydown"), t.off("keyup"), t.active = !1, I.isNullOrUndefined(this.touchId) && (this.currentTrackingPointer = null, this.currentFocusPointer = null)
                }

                getKeyActions(t) {
                    const i = this.viewOptions.ceil - this.viewOptions.floor;
                    let r = t + this.viewOptions.step, o = t - this.viewOptions.step, s = t + i / 10, a = t - i / 10;
                    this.viewOptions.reversedControls && (r = t - this.viewOptions.step, o = t + this.viewOptions.step, s = t - i / 10, a = t + i / 10);
                    const l = {
                        UP: r,
                        DOWN: o,
                        LEFT: o,
                        RIGHT: r,
                        PAGEUP: s,
                        PAGEDOWN: a,
                        HOME: this.viewOptions.reversedControls ? this.viewOptions.ceil : this.viewOptions.floor,
                        END: this.viewOptions.reversedControls ? this.viewOptions.floor : this.viewOptions.ceil
                    };
                    return this.viewOptions.rightToLeft && (l.LEFT = r, l.RIGHT = o, (this.viewOptions.vertical || 0 !== this.viewOptions.rotate) && (l.UP = o, l.DOWN = r)), l
                }

                onKeyboardEvent(t) {
                    const i = this.getCurrentTrackingValue(), r = I.isNullOrUndefined(t.keyCode) ? t.which : t.keyCode,
                        l = this.getKeyActions(i)[{
                            38: "UP",
                            40: "DOWN",
                            37: "LEFT",
                            39: "RIGHT",
                            33: "PAGEUP",
                            34: "PAGEDOWN",
                            36: "HOME",
                            35: "END"
                        }[r]];
                    if (I.isNullOrUndefined(l) || I.isNullOrUndefined(this.currentTrackingPointer)) return;
                    t.preventDefault(), this.firstKeyDown && (this.firstKeyDown = !1, this.userChangeStart.emit(this.getChangeContext()));
                    const c = ke.clampToRange(l, this.viewOptions.floor, this.viewOptions.ceil), u = this.roundStep(c);
                    if (this.viewOptions.draggableRangeOnly) {
                        const d = this.viewHighValue - this.viewLowValue;
                        let h, p;
                        this.currentTrackingPointer === x.Min ? (h = u, p = u + d, p > this.viewOptions.ceil && (p = this.viewOptions.ceil, h = p - d)) : this.currentTrackingPointer === x.Max && (p = u, h = u - d, h < this.viewOptions.floor && (h = this.viewOptions.floor, p = h + d)), this.positionTrackingBar(h, p)
                    } else this.positionTrackingHandle(u)
                }

                onDragStart(t, i, r, o) {
                    const s = this.getEventPosition(i);
                    this.dragging = new FI, this.dragging.active = !0, this.dragging.value = this.positionToValue(s), this.dragging.difference = this.viewHighValue - this.viewLowValue, this.dragging.lowLimit = this.viewOptions.rightToLeft ? this.minHandleElement.position - s : s - this.minHandleElement.position, this.dragging.highLimit = this.viewOptions.rightToLeft ? s - this.maxHandleElement.position : this.maxHandleElement.position - s, this.onStart(t, i, r, o)
                }

                getMinValue(t, i, r) {
                    const o = this.viewOptions.rightToLeft;
                    let s = null;
                    return s = i ? r ? o ? this.viewOptions.floor : this.viewOptions.ceil - this.dragging.difference : o ? this.viewOptions.ceil - this.dragging.difference : this.viewOptions.floor : this.positionToValue(o ? t + this.dragging.lowLimit : t - this.dragging.lowLimit), this.roundStep(s)
                }

                getMaxValue(t, i, r) {
                    const o = this.viewOptions.rightToLeft;
                    let s = null;
                    return s = i ? r ? o ? this.viewOptions.floor + this.dragging.difference : this.viewOptions.ceil : o ? this.viewOptions.ceil : this.viewOptions.floor + this.dragging.difference : o ? this.positionToValue(t + this.dragging.lowLimit) + this.dragging.difference : this.positionToValue(t - this.dragging.lowLimit) + this.dragging.difference, this.roundStep(s)
                }

                onDragMove(t) {
                    const i = this.getEventPosition(t);
                    let r, o, s, a;
                    this.viewOptions.animate && !this.viewOptions.animateOnMove && this.moving && (this.sliderElementAnimateClass = !1), this.moving = !0, this.viewOptions.rightToLeft ? (r = this.dragging.lowLimit, o = this.dragging.highLimit, s = this.maxHandleElement, a = this.minHandleElement) : (r = this.dragging.highLimit, o = this.dragging.lowLimit, s = this.minHandleElement, a = this.maxHandleElement);
                    const c = i >= this.maxHandlePosition - r;
                    let u, d;
                    if (i <= o) {
                        if (0 === s.position) return;
                        u = this.getMinValue(i, !0, !1), d = this.getMaxValue(i, !0, !1)
                    } else if (c) {
                        if (a.position === this.maxHandlePosition) return;
                        d = this.getMaxValue(i, !0, !0), u = this.getMinValue(i, !0, !0)
                    } else u = this.getMinValue(i, !1, !1), d = this.getMaxValue(i, !1, !1);
                    this.positionTrackingBar(u, d)
                }

                positionTrackingBar(t, i) {
                    !I.isNullOrUndefined(this.viewOptions.minLimit) && t < this.viewOptions.minLimit && (i = ke.roundToPrecisionLimit((t = this.viewOptions.minLimit) + this.dragging.difference, this.viewOptions.precisionLimit)), !I.isNullOrUndefined(this.viewOptions.maxLimit) && i > this.viewOptions.maxLimit && (t = ke.roundToPrecisionLimit((i = this.viewOptions.maxLimit) - this.dragging.difference, this.viewOptions.precisionLimit)), this.viewLowValue = t, this.viewHighValue = i, this.applyViewChange(), this.updateHandles(x.Min, this.valueToPosition(t)), this.updateHandles(x.Max, this.valueToPosition(i))
                }

                positionTrackingHandle(t) {
                    t = this.applyMinMaxLimit(t), this.range && (this.viewOptions.pushRange ? t = this.applyPushRange(t) : (this.viewOptions.noSwitching && (this.currentTrackingPointer === x.Min && t > this.viewHighValue ? t = this.applyMinMaxRange(this.viewHighValue) : this.currentTrackingPointer === x.Max && t < this.viewLowValue && (t = this.applyMinMaxRange(this.viewLowValue))), t = this.applyMinMaxRange(t), this.currentTrackingPointer === x.Min && t > this.viewHighValue ? (this.viewLowValue = this.viewHighValue, this.applyViewChange(), this.updateHandles(x.Min, this.maxHandleElement.position), this.updateAriaAttributes(), this.currentTrackingPointer = x.Max, this.minHandleElement.active = !1, this.maxHandleElement.active = !0, this.viewOptions.keyboardSupport && this.maxHandleElement.focus()) : this.currentTrackingPointer === x.Max && t < this.viewLowValue && (this.viewHighValue = this.viewLowValue, this.applyViewChange(), this.updateHandles(x.Max, this.minHandleElement.position), this.updateAriaAttributes(), this.currentTrackingPointer = x.Min, this.maxHandleElement.active = !1, this.minHandleElement.active = !0, this.viewOptions.keyboardSupport && this.minHandleElement.focus()))), this.getCurrentTrackingValue() !== t && (this.currentTrackingPointer === x.Min ? (this.viewLowValue = t, this.applyViewChange()) : this.currentTrackingPointer === x.Max && (this.viewHighValue = t, this.applyViewChange()), this.updateHandles(this.currentTrackingPointer, this.valueToPosition(t)), this.updateAriaAttributes())
                }

                applyMinMaxLimit(t) {
                    return !I.isNullOrUndefined(this.viewOptions.minLimit) && t < this.viewOptions.minLimit ? this.viewOptions.minLimit : !I.isNullOrUndefined(this.viewOptions.maxLimit) && t > this.viewOptions.maxLimit ? this.viewOptions.maxLimit : t
                }

                applyMinMaxRange(t) {
                    const r = Math.abs(t - (this.currentTrackingPointer === x.Min ? this.viewHighValue : this.viewLowValue));
                    if (!I.isNullOrUndefined(this.viewOptions.minRange) && r < this.viewOptions.minRange) {
                        if (this.currentTrackingPointer === x.Min) return ke.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.minRange, this.viewOptions.precisionLimit);
                        if (this.currentTrackingPointer === x.Max) return ke.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.minRange, this.viewOptions.precisionLimit)
                    }
                    if (!I.isNullOrUndefined(this.viewOptions.maxRange) && r > this.viewOptions.maxRange) {
                        if (this.currentTrackingPointer === x.Min) return ke.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.maxRange, this.viewOptions.precisionLimit);
                        if (this.currentTrackingPointer === x.Max) return ke.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.maxRange, this.viewOptions.precisionLimit)
                    }
                    return t
                }

                applyPushRange(t) {
                    const i = this.currentTrackingPointer === x.Min ? this.viewHighValue - t : t - this.viewLowValue,
                        r = I.isNullOrUndefined(this.viewOptions.minRange) ? this.viewOptions.step : this.viewOptions.minRange,
                        o = this.viewOptions.maxRange;
                    return i < r ? (this.currentTrackingPointer === x.Min ? (this.viewHighValue = ke.roundToPrecisionLimit(Math.min(t + r, this.viewOptions.ceil), this.viewOptions.precisionLimit), t = ke.roundToPrecisionLimit(this.viewHighValue - r, this.viewOptions.precisionLimit), this.applyViewChange(), this.updateHandles(x.Max, this.valueToPosition(this.viewHighValue))) : this.currentTrackingPointer === x.Max && (this.viewLowValue = ke.roundToPrecisionLimit(Math.max(t - r, this.viewOptions.floor), this.viewOptions.precisionLimit), t = ke.roundToPrecisionLimit(this.viewLowValue + r, this.viewOptions.precisionLimit), this.applyViewChange(), this.updateHandles(x.Min, this.valueToPosition(this.viewLowValue))), this.updateAriaAttributes()) : !I.isNullOrUndefined(o) && i > o && (this.currentTrackingPointer === x.Min ? (this.viewHighValue = ke.roundToPrecisionLimit(t + o, this.viewOptions.precisionLimit), this.applyViewChange(), this.updateHandles(x.Max, this.valueToPosition(this.viewHighValue))) : this.currentTrackingPointer === x.Max && (this.viewLowValue = ke.roundToPrecisionLimit(t - o, this.viewOptions.precisionLimit), this.applyViewChange(), this.updateHandles(x.Min, this.valueToPosition(this.viewLowValue))), this.updateAriaAttributes()), t
                }

                getChangeContext() {
                    const t = new ej;
                    return t.pointerType = this.currentTrackingPointer, t.value = +this.value, this.range && (t.highValue = +this.highValue), t
                }
            }

            return e
        })(), rj = (() => {
            class e {
                static \u0275mod = Wn({type: e});
                static \u0275inj = Tn({imports: [RD]})

                static \u0275fac = function (i) {
                    return new (i || e)
                };
            }

            return e
        })();

        class BI {
            constructor() {
                this.riskHotspotsSettings = null, this.coverageInfoSettings = null
            }
        }

        class oj {
            constructor() {
                this.showLineCoverage = !0, this.showBranchCoverage = !0, this.showMethodCoverage = !0, this.visibleMetrics = [], this.groupingMaximum = 0, this.grouping = 0, this.historyComparisionDate = "", this.historyComparisionType = "", this.filter = "", this.lineCoverageMin = 0, this.lineCoverageMax = 100, this.branchCoverageMin = 0, this.branchCoverageMax = 100, this.methodCoverageMin = 0, this.methodCoverageMax = 100, this.sortBy = "name", this.sortOrder = "asc", this.collapseStates = []
            }
        }

        class sj {
            constructor(n) {
                this.et = "", this.et = n.et, this.cl = n.cl, this.ucl = n.ucl, this.cal = n.cal, this.tl = n.tl, this.lcq = n.lcq, this.cb = n.cb, this.tb = n.tb, this.bcq = n.bcq, this.cm = n.cm, this.tm = n.tm, this.mcq = n.mcq
            }

            get coverageRatioText() {
                return 0 === this.tl ? "-" : this.cl + "/" + this.cal
            }

            get branchCoverageRatioText() {
                return 0 === this.tb ? "-" : this.cb + "/" + this.tb
            }

            get methodCoverageRatioText() {
                return 0 === this.tm ? "-" : this.cm + "/" + this.tm
            }
        }

        class Gt {
            static roundNumber(n) {
                return Math.floor(n * Math.pow(10, Gt.maximumDecimalPlacesForCoverageQuotas)) / Math.pow(10, Gt.maximumDecimalPlacesForCoverageQuotas)
            }

            static getNthOrLastIndexOf(n, t, i) {
                let r = 0, o = -1, s = -1;
                for (; r < i && (s = n.indexOf(t, o + 1), -1 !== s);) o = s, r++;
                return o
            }
        }

        class jI {
            constructor() {
                this.name = "", this.coveredLines = 0, this.uncoveredLines = 0, this.coverableLines = 0, this.totalLines = 0, this.coveredBranches = 0, this.totalBranches = 0, this.coveredMethods = 0, this.totalMethods = 0
            }

            get coverage() {
                return 0 === this.coverableLines ? NaN : Gt.roundNumber(100 * this.coveredLines / this.coverableLines)
            }

            get coveragePercentage() {
                return 0 === this.coverableLines ? "" : this.coverage + "%"
            }

            get coverageRatioText() {
                return 0 === this.coverableLines ? "-" : this.coveredLines + "/" + this.coverableLines
            }

            get branchCoverage() {
                return 0 === this.totalBranches ? NaN : Gt.roundNumber(100 * this.coveredBranches / this.totalBranches)
            }

            get branchCoveragePercentage() {
                return 0 === this.totalBranches ? "" : this.branchCoverage + "%"
            }

            get branchCoverageRatioText() {
                return 0 === this.totalBranches ? "-" : this.coveredBranches + "/" + this.totalBranches
            }

            get methodCoverage() {
                return 0 === this.totalMethods ? NaN : Gt.roundNumber(100 * this.coveredMethods / this.totalMethods)
            }

            get methodCoveragePercentage() {
                return 0 === this.totalMethods ? "" : this.methodCoverage + "%"
            }

            get methodCoverageRatioText() {
                return 0 === this.totalMethods ? "-" : this.coveredMethods + "/" + this.totalMethods
            }
        }

        class bp extends jI {
            constructor(n, t) {
                super(), this.reportPath = "", this.lineCoverageHistory = [], this.branchCoverageHistory = [], this.methodCoverageHistory = [], this.historicCoverages = [], this.currentHistoricCoverage = null, this.name = n.name, this.reportPath = n.rp ? n.rp + t : n.rp, this.coveredLines = n.cl, this.uncoveredLines = n.ucl, this.coverableLines = n.cal, this.totalLines = n.tl, this.coveredBranches = n.cb, this.totalBranches = n.tb, this.coveredMethods = n.cm, this.totalMethods = n.tm, this.lineCoverageHistory = n.lch, this.branchCoverageHistory = n.bch, this.methodCoverageHistory = n.mch, n.hc.forEach(i => {
                    this.historicCoverages.push(new sj(i))
                }), this.metrics = n.metrics
            }

            get coverage() {
                return 0 === this.coverableLines ? NaN : Gt.roundNumber(100 * this.coveredLines / this.coverableLines)
            }

            visible(n) {
                if ("" !== n.filter && -1 === this.name.toLowerCase().indexOf(n.filter.toLowerCase())) return !1;
                let t = this.coverage, i = t;
                if (t = Number.isNaN(t) ? 0 : t, i = Number.isNaN(i) ? 100 : i, n.lineCoverageMin > t || n.lineCoverageMax < i) return !1;
                let r = this.branchCoverage, o = r;
                if (r = Number.isNaN(r) ? 0 : r, o = Number.isNaN(o) ? 100 : o, n.branchCoverageMin > r || n.branchCoverageMax < o) return !1;
                let s = this.methodCoverage, a = s;
                if (s = Number.isNaN(s) ? 0 : s, a = Number.isNaN(a) ? 100 : a, n.methodCoverageMin > s || n.methodCoverageMax < a) return !1;
                if ("" === n.historyComparisionType || null === this.currentHistoricCoverage) return !0;
                if ("allChanges" === n.historyComparisionType) {
                    if (this.coveredLines === this.currentHistoricCoverage.cl && this.uncoveredLines === this.currentHistoricCoverage.ucl && this.coverableLines === this.currentHistoricCoverage.cal && this.totalLines === this.currentHistoricCoverage.tl && this.coveredBranches === this.currentHistoricCoverage.cb && this.totalBranches === this.currentHistoricCoverage.tb && this.coveredMethods === this.currentHistoricCoverage.cm && this.totalMethods === this.currentHistoricCoverage.tm) return !1
                } else if ("lineCoverageIncreaseOnly" === n.historyComparisionType) {
                    let l = this.coverage;
                    if (isNaN(l) || l <= this.currentHistoricCoverage.lcq) return !1
                } else if ("lineCoverageDecreaseOnly" === n.historyComparisionType) {
                    let l = this.coverage;
                    if (isNaN(l) || l >= this.currentHistoricCoverage.lcq) return !1
                } else if ("branchCoverageIncreaseOnly" === n.historyComparisionType) {
                    let l = this.branchCoverage;
                    if (isNaN(l) || l <= this.currentHistoricCoverage.bcq) return !1
                } else if ("branchCoverageDecreaseOnly" === n.historyComparisionType) {
                    let l = this.branchCoverage;
                    if (isNaN(l) || l >= this.currentHistoricCoverage.bcq) return !1
                } else if ("methodCoverageIncreaseOnly" === n.historyComparisionType) {
                    let l = this.methodCoverage;
                    if (isNaN(l) || l <= this.currentHistoricCoverage.mcq) return !1
                } else if ("methodCoverageDecreaseOnly" === n.historyComparisionType) {
                    let l = this.methodCoverage;
                    if (isNaN(l) || l >= this.currentHistoricCoverage.mcq) return !1
                }
                return !0
            }

            updateCurrentHistoricCoverage(n) {
                if (this.currentHistoricCoverage = null, "" !== n) for (let t = 0; t < this.historicCoverages.length; t++) if (this.historicCoverages[t].et === n) {
                    this.currentHistoricCoverage = this.historicCoverages[t];
                    break
                }
            }
        }

        class di extends jI {
            constructor(n, t) {
                super(), this.subElements = [], this.classes = [], this.collapsed = !1, this.name = n, this.collapsed = n.indexOf("Test") > -1 && null === t
            }

            static sortCodeElementViewModels(n, t, i) {
                let r = i ? -1 : 1, o = i ? 1 : -1;
                "name" === t ? n.sort(function (s, a) {
                    return s.name === a.name ? 0 : s.name < a.name ? r : o
                }) : "covered" === t ? n.sort(function (s, a) {
                    return s.coveredLines === a.coveredLines ? 0 : s.coveredLines < a.coveredLines ? r : o
                }) : "uncovered" === t ? n.sort(function (s, a) {
                    return s.uncoveredLines === a.uncoveredLines ? 0 : s.uncoveredLines < a.uncoveredLines ? r : o
                }) : "coverable" === t ? n.sort(function (s, a) {
                    return s.coverableLines === a.coverableLines ? 0 : s.coverableLines < a.coverableLines ? r : o
                }) : "total" === t ? n.sort(function (s, a) {
                    return s.totalLines === a.totalLines ? 0 : s.totalLines < a.totalLines ? r : o
                }) : "coverage" === t ? n.sort(function (s, a) {
                    return s.coverage === a.coverage ? 0 : isNaN(s.coverage) ? r : isNaN(a.coverage) ? o : s.coverage < a.coverage ? r : o
                }) : "branchcoverage" === t ? n.sort(function (s, a) {
                    return s.branchCoverage === a.branchCoverage ? 0 : isNaN(s.branchCoverage) ? r : isNaN(a.branchCoverage) ? o : s.branchCoverage < a.branchCoverage ? r : o
                }) : "methodcoverage" === t && n.sort(function (s, a) {
                    return s.methodCoverage === a.methodCoverage ? 0 : isNaN(s.methodCoverage) ? r : isNaN(a.methodCoverage) ? o : s.methodCoverage < a.methodCoverage ? r : o
                })
            }

            visible(n) {
                if ("" !== n.filter && this.name.toLowerCase().indexOf(n.filter.toLowerCase()) > -1) return !0;
                for (let t = 0; t < this.subElements.length; t++) if (this.subElements[t].visible(n)) return !0;
                for (let t = 0; t < this.classes.length; t++) if (this.classes[t].visible(n)) return !0;
                return !1
            }

            insertClass(n, t) {
                if (this.coveredLines += n.coveredLines, this.uncoveredLines += n.uncoveredLines, this.coverableLines += n.coverableLines, this.totalLines += n.totalLines, this.coveredBranches += n.coveredBranches, this.totalBranches += n.totalBranches, this.coveredMethods += n.coveredMethods, this.totalMethods += n.totalMethods, null === t) return void this.classes.push(n);
                let i = Gt.getNthOrLastIndexOf(n.name, ".", t);
                -1 === i && (i = Gt.getNthOrLastIndexOf(n.name, "\\", t));
                let r = -1 === i ? "-" : n.name.substring(0, i);
                for (let s = 0; s < this.subElements.length; s++) if (this.subElements[s].name === r) return void this.subElements[s].insertClass(n, null);
                let o = new di(r, this);
                this.subElements.push(o), o.insertClass(n, null)
            }

            collapse() {
                this.collapsed = !0;
                for (let n = 0; n < this.subElements.length; n++) this.subElements[n].collapse()
            }

            expand() {
                this.collapsed = !1;
                for (let n = 0; n < this.subElements.length; n++) this.subElements[n].expand()
            }

            toggleCollapse(n) {
                n.preventDefault(), this.collapsed = !this.collapsed
            }

            updateCurrentHistoricCoverage(n) {
                for (let t = 0; t < this.subElements.length; t++) this.subElements[t].updateCurrentHistoricCoverage(n);
                for (let t = 0; t < this.classes.length; t++) this.classes[t].updateCurrentHistoricCoverage(n)
            }

            changeSorting(n, t) {
                di.sortCodeElementViewModels(this.subElements, n, t);
                let i = t ? -1 : 1, r = t ? 1 : -1;
                this.classes.sort("name" === n ? function (o, s) {
                    return o.name === s.name ? 0 : o.name < s.name ? i : r
                } : "covered" === n ? function (o, s) {
                    return o.coveredLines === s.coveredLines ? 0 : o.coveredLines < s.coveredLines ? i : r
                } : "uncovered" === n ? function (o, s) {
                    return o.uncoveredLines === s.uncoveredLines ? 0 : o.uncoveredLines < s.uncoveredLines ? i : r
                } : "coverable" === n ? function (o, s) {
                    return o.coverableLines === s.coverableLines ? 0 : o.coverableLines < s.coverableLines ? i : r
                } : "total" === n ? function (o, s) {
                    return o.totalLines === s.totalLines ? 0 : o.totalLines < s.totalLines ? i : r
                } : "coverage" === n ? function (o, s) {
                    return o.coverage === s.coverage ? 0 : isNaN(o.coverage) ? i : isNaN(s.coverage) ? r : o.coverage < s.coverage ? i : r
                } : "covered_branches" === n ? function (o, s) {
                    return o.coveredBranches === s.coveredBranches ? 0 : o.coveredBranches < s.coveredBranches ? i : r
                } : "total_branches" === n ? function (o, s) {
                    return o.totalBranches === s.totalBranches ? 0 : o.totalBranches < s.totalBranches ? i : r
                } : "branchcoverage" === n ? function (o, s) {
                    return o.branchCoverage === s.branchCoverage ? 0 : isNaN(o.branchCoverage) ? i : isNaN(s.branchCoverage) ? r : o.branchCoverage < s.branchCoverage ? i : r
                } : "covered_methods" === n ? function (o, s) {
                    return o.coveredMethods === s.coveredMethods ? 0 : o.coveredMethods < s.coveredMethods ? i : r
                } : "total_methods" === n ? function (o, s) {
                    return o.totalMethods === s.totalMethods ? 0 : o.totalMethods < s.totalMethods ? i : r
                } : "methodcoverage" === n ? function (o, s) {
                    return o.methodCoverage === s.methodCoverage ? 0 : isNaN(o.methodCoverage) ? i : isNaN(s.methodCoverage) ? r : o.methodCoverage < s.methodCoverage ? i : r
                } : function (o, s) {
                    const a = o.metrics[n], l = s.metrics[n];
                    return a === l ? 0 : isNaN(a) ? i : isNaN(l) ? r : a < l ? i : r
                });
                for (let o = 0; o < this.subElements.length; o++) this.subElements[o].changeSorting(n, t)
            }
        }

        let Ip = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275prov = te({token: e, factory: e.\u0275fac})

                get nativeWindow() {
                    return function aj() {
                        return window
                    }()
                }
            }

            return e
        })(), lj = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275cmp = Yt({
                    type: e,
                    selectors: [["pro-button"]],
                    inputs: {translations: "translations"},
                    decls: 3,
                    vars: 1,
                    consts: [["href", "https://reportgenerator.io/pro", "target", "_blank", 1, "pro-button", "pro-button-tiny", 3, "title"]],
                    template: function (i, r) {
                        1 & i && (b(0, "\xa0"), y(1, "a", 0), b(2, "PRO"), _()), 2 & i && (f(), Fn("title", r.translations.methodCoverageProVersion))
                    },
                    encapsulation: 2
                })

                constructor() {
                    this.translations = {}
                }
            }

            return e
        })();

        function cj(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "div", 3)(1, "label")(2, "input", 4), st("ngModelChange", function (r) {
                    G(t);
                    const o = v();
                    return Ne(o.showBranchCoverage, r) || (o.showBranchCoverage = r), q(r)
                }), W("change", function () {
                    G(t);
                    const r = v();
                    return q(r.showBranchCoverageChange.emit(r.showBranchCoverage))
                }), _(), b(3), _()()
            }
            if (2 & e) {
                const t = v();
                f(2), tt("ngModel", t.showBranchCoverage), f(), K(" ", t.translations.branchCoverage, "")
            }
        }

        function uj(e, n) {
            1 & e && N(0, "pro-button", 9), 2 & e && m("translations", v().translations)
        }

        function dj(e, n) {
            1 & e && N(0, "pro-button", 9), 2 & e && m("translations", v(2).translations)
        }

        function fj(e, n) {
            1 & e && (y(0, "a", 13), N(1, "i", 14), _()), 2 & e && m("href", v().$implicit.explanationUrl, Kn)
        }

        function hj(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "div", 3)(1, "label")(2, "input", 11), W("change", function () {
                    const r = G(t).$implicit;
                    return q(v(2).toggleMetric(r))
                }), _(), b(3), _(), b(4, "\xa0"), H(5, fj, 2, 1, "a", 12), _()
            }
            if (2 & e) {
                const t = n.$implicit, i = v(2);
                f(2), m("checked", i.isMetricSelected(t))("disabled", !i.methodCoverageAvailable), f(), K(" ", t.name, ""), f(2), m("ngIf", t.explanationUrl)
            }
        }

        function pj(e, n) {
            if (1 & e && (ne(0), N(1, "br")(2, "br"), y(3, "b"), b(4), _(), H(5, dj, 1, 1, "pro-button", 7)(6, hj, 6, 4, "div", 10), ie()), 2 & e) {
                const t = v();
                f(4), A(t.translations.metrics), f(), m("ngIf", !t.methodCoverageAvailable), f(), m("ngForOf", t.metrics)
            }
        }

        let gj = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275cmp = Yt({
                    type: e,
                    selectors: [["popup"]],
                    inputs: {
                        visible: "visible",
                        translations: "translations",
                        branchCoverageAvailable: "branchCoverageAvailable",
                        methodCoverageAvailable: "methodCoverageAvailable",
                        metrics: "metrics",
                        showLineCoverage: "showLineCoverage",
                        showBranchCoverage: "showBranchCoverage",
                        showMethodCoverage: "showMethodCoverage",
                        visibleMetrics: "visibleMetrics"
                    },
                    outputs: {
                        visibleChange: "visibleChange",
                        showLineCoverageChange: "showLineCoverageChange",
                        showBranchCoverageChange: "showBranchCoverageChange",
                        showMethodCoverageChange: "showMethodCoverageChange",
                        visibleMetricsChange: "visibleMetricsChange"
                    },
                    decls: 17,
                    vars: 9,
                    consts: [[1, "popup-container", 3, "click"], [1, "popup", 3, "click"], [1, "close", 3, "click"], [1, "mt-1"], ["type", "checkbox", 3, "ngModelChange", "change", "ngModel"], ["class", "mt-1", 4, "ngIf"], ["type", "checkbox", 3, "ngModelChange", "change", "ngModel", "disabled"], [3, "translations", 4, "ngIf"], [4, "ngIf"], [3, "translations"], ["class", "mt-1", 4, "ngFor", "ngForOf"], ["type", "checkbox", 3, "change", "checked", "disabled"], ["target", "_blank", 3, "href", 4, "ngIf"], ["target", "_blank", 3, "href"], [1, "icon-info-circled"]],
                    template: function (i, r) {
                        1 & i && (y(0, "div", 0), W("click", function () {
                            return r.close()
                        }), y(1, "div", 1), W("click", function (s) {
                            return r.cancelEvent(s)
                        }), y(2, "div", 2), W("click", function () {
                            return r.close()
                        }), b(3, "X"), _(), y(4, "b"), b(5), _(), y(6, "div", 3)(7, "label")(8, "input", 4), st("ngModelChange", function (s) {
                            return Ne(r.showLineCoverage, s) || (r.showLineCoverage = s), s
                        }), W("change", function () {
                            return r.showLineCoverageChange.emit(r.showLineCoverage)
                        }), _(), b(9), _()(), H(10, cj, 4, 2, "div", 5), y(11, "div", 3)(12, "label")(13, "input", 6), st("ngModelChange", function (s) {
                            return Ne(r.showMethodCoverage, s) || (r.showMethodCoverage = s), s
                        }), W("change", function () {
                            return r.showMethodCoverageChange.emit(r.showMethodCoverage)
                        }), _(), b(14), _(), H(15, uj, 1, 1, "pro-button", 7), _(), H(16, pj, 7, 3, "ng-container", 8), _()()), 2 & i && (f(5), A(r.translations.coverageTypes), f(3), tt("ngModel", r.showLineCoverage), f(), K(" ", r.translations.coverage, ""), f(), m("ngIf", r.branchCoverageAvailable), f(3), tt("ngModel", r.showMethodCoverage), m("disabled", !r.methodCoverageAvailable), f(), K(" ", r.translations.methodCoverage, ""), f(), m("ngIf", !r.methodCoverageAvailable), f(), m("ngIf", r.metrics.length > 0))
                    },
                    dependencies: [Ui, jn, Kh, fc, Ps, lj],
                    encapsulation: 2
                })

                constructor() {
                    this.visible = !1, this.visibleChange = new we, this.translations = {}, this.branchCoverageAvailable = !1, this.methodCoverageAvailable = !1, this.metrics = [], this.showLineCoverage = !1, this.showLineCoverageChange = new we, this.showBranchCoverage = !1, this.showBranchCoverageChange = new we, this.showMethodCoverage = !1, this.showMethodCoverageChange = new we, this.visibleMetrics = [], this.visibleMetricsChange = new we
                }

                isMetricSelected(t) {
                    return void 0 !== this.visibleMetrics.find(i => i.name === t.name)
                }

                toggleMetric(t) {
                    let i = this.visibleMetrics.find(r => r.name === t.name);
                    i ? this.visibleMetrics.splice(this.visibleMetrics.indexOf(i), 1) : this.visibleMetrics.push(t), this.visibleMetrics = [...this.visibleMetrics], this.visibleMetricsChange.emit(this.visibleMetrics)
                }

                close() {
                    this.visible = !1, this.visibleChange.emit(this.visible)
                }

                cancelEvent(t) {
                    t.stopPropagation()
                }
            }

            return e
        })();

        function mj(e, n) {
            1 & e && N(0, "td", 3)
        }

        function vj(e, n) {
            1 & e && N(0, "td"), 2 & e && Dn("green ", v().greenClass, "")
        }

        function _j(e, n) {
            1 & e && N(0, "td"), 2 & e && Dn("red ", v().redClass, "")
        }

        let UI = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275cmp = Yt({
                    type: e,
                    selectors: [["coverage-bar"]],
                    inputs: {percentage: "percentage"},
                    decls: 4,
                    vars: 3,
                    consts: [[1, "coverage"], ["class", "gray covered100", 4, "ngIf"], [3, "class", 4, "ngIf"], [1, "gray", "covered100"]],
                    template: function (i, r) {
                        1 & i && (y(0, "table", 0), H(1, mj, 1, 0, "td", 1)(2, vj, 1, 3, "td", 2)(3, _j, 1, 3, "td", 2), _()), 2 & i && (f(), m("ngIf", r.grayVisible), f(), m("ngIf", r.greenVisible), f(), m("ngIf", r.redVisible))
                    },
                    dependencies: [jn],
                    encapsulation: 2,
                    changeDetection: 0
                })

                constructor() {
                    this.grayVisible = !0, this.greenVisible = !1, this.redVisible = !1, this.greenClass = "", this.redClass = "", this._percentage = NaN
                }

                get percentage() {
                    return this._percentage
                }

                set percentage(t) {
                    this._percentage = t, this.grayVisible = isNaN(t), this.greenVisible = !isNaN(t) && Math.round(t) > 0, this.redVisible = !isNaN(t) && 100 - Math.round(t) > 0, this.greenClass = "covered" + Math.round(t), this.redClass = "covered" + (100 - Math.round(t))
                }
            }

            return e
        })();
        const yj = ["codeelement-row", ""], Cj = (e, n) => ({"icon-plus": e, "icon-minus": n});

        function wj(e, n) {
            if (1 & e && (y(0, "th", 5), b(1), _()), 2 & e) {
                const t = v();
                f(), A(t.element.coveredLines)
            }
        }

        function Ej(e, n) {
            if (1 & e && (y(0, "th", 5), b(1), _()), 2 & e) {
                const t = v();
                f(), A(t.element.uncoveredLines)
            }
        }

        function Dj(e, n) {
            if (1 & e && (y(0, "th", 5), b(1), _()), 2 & e) {
                const t = v();
                f(), A(t.element.coverableLines)
            }
        }

        function bj(e, n) {
            if (1 & e && (y(0, "th", 5), b(1), _()), 2 & e) {
                const t = v();
                f(), A(t.element.totalLines)
            }
        }

        function Ij(e, n) {
            if (1 & e && (y(0, "th", 6), b(1), _()), 2 & e) {
                const t = v();
                m("title", t.element.coverageRatioText), f(), A(t.element.coveragePercentage)
            }
        }

        function Mj(e, n) {
            if (1 & e && (y(0, "th", 5), N(1, "coverage-bar", 7), _()), 2 & e) {
                const t = v();
                f(), m("percentage", t.element.coverage)
            }
        }

        function Tj(e, n) {
            if (1 & e && (y(0, "th", 5), b(1), _()), 2 & e) {
                const t = v();
                f(), A(t.element.coveredBranches)
            }
        }

        function Sj(e, n) {
            if (1 & e && (y(0, "th", 5), b(1), _()), 2 & e) {
                const t = v();
                f(), A(t.element.totalBranches)
            }
        }

        function Oj(e, n) {
            if (1 & e && (y(0, "th", 6), b(1), _()), 2 & e) {
                const t = v();
                m("title", t.element.branchCoverageRatioText), f(), A(t.element.branchCoveragePercentage)
            }
        }

        function Nj(e, n) {
            if (1 & e && (y(0, "th", 5), N(1, "coverage-bar", 7), _()), 2 & e) {
                const t = v();
                f(), m("percentage", t.element.branchCoverage)
            }
        }

        function Aj(e, n) {
            if (1 & e && (y(0, "th", 5), b(1), _()), 2 & e) {
                const t = v();
                f(), A(t.element.coveredMethods)
            }
        }

        function xj(e, n) {
            if (1 & e && (y(0, "th", 5), b(1), _()), 2 & e) {
                const t = v();
                f(), A(t.element.totalMethods)
            }
        }

        function Rj(e, n) {
            if (1 & e && (y(0, "th", 6), b(1), _()), 2 & e) {
                const t = v();
                m("title", t.element.methodCoverageRatioText), f(), A(t.element.methodCoveragePercentage)
            }
        }

        function Lj(e, n) {
            if (1 & e && (y(0, "th", 5), N(1, "coverage-bar", 7), _()), 2 & e) {
                const t = v();
                f(), m("percentage", t.element.methodCoverage)
            }
        }

        function Pj(e, n) {
            1 & e && N(0, "th", 5)
        }

        let kj = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275cmp = Yt({
                    type: e,
                    selectors: [["", "codeelement-row", ""]],
                    inputs: {
                        element: "element",
                        collapsed: "collapsed",
                        lineCoverageAvailable: "lineCoverageAvailable",
                        branchCoverageAvailable: "branchCoverageAvailable",
                        methodCoverageAvailable: "methodCoverageAvailable",
                        visibleMetrics: "visibleMetrics"
                    },
                    attrs: yj,
                    decls: 19,
                    vars: 20,
                    consts: [["href", "#", 3, "click"], [3, "ngClass"], ["class", "right", 4, "ngIf"], ["class", "right", 3, "title", 4, "ngIf"], ["class", "right", 4, "ngFor", "ngForOf"], [1, "right"], [1, "right", 3, "title"], [3, "percentage"]],
                    template: function (i, r) {
                        1 & i && (y(0, "th")(1, "a", 0), W("click", function (s) {
                            return r.element.toggleCollapse(s)
                        }), N(2, "i", 1), b(3), _()(), H(4, wj, 2, 1, "th", 2)(5, Ej, 2, 1, "th", 2)(6, Dj, 2, 1, "th", 2)(7, bj, 2, 1, "th", 2)(8, Ij, 2, 2, "th", 3)(9, Mj, 2, 1, "th", 2)(10, Tj, 2, 1, "th", 2)(11, Sj, 2, 1, "th", 2)(12, Oj, 2, 2, "th", 3)(13, Nj, 2, 1, "th", 2)(14, Aj, 2, 1, "th", 2)(15, xj, 2, 1, "th", 2)(16, Rj, 2, 2, "th", 3)(17, Lj, 2, 1, "th", 2)(18, Pj, 1, 0, "th", 4)), 2 & i && (f(2), m("ngClass", Xf(17, Cj, r.element.collapsed, !r.element.collapsed)), f(), K(" ", r.element.name, ""), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.branchCoverageAvailable), f(), m("ngIf", r.branchCoverageAvailable), f(), m("ngIf", r.branchCoverageAvailable), f(), m("ngIf", r.branchCoverageAvailable), f(), m("ngIf", r.methodCoverageAvailable), f(), m("ngIf", r.methodCoverageAvailable), f(), m("ngIf", r.methodCoverageAvailable), f(), m("ngIf", r.methodCoverageAvailable), f(), m("ngForOf", r.visibleMetrics))
                    },
                    dependencies: [Xr, Ui, jn, UI],
                    encapsulation: 2,
                    changeDetection: 0
                })

                constructor() {
                    this.collapsed = !1, this.lineCoverageAvailable = !1, this.branchCoverageAvailable = !1, this.methodCoverageAvailable = !1, this.visibleMetrics = []
                }
            }

            return e
        })();
        const Fj = ["coverage-history-chart", ""];
        let Vj = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275cmp = Yt({
                    type: e,
                    selectors: [["", "coverage-history-chart", ""]],
                    inputs: {historicCoverages: "historicCoverages"},
                    attrs: Fj,
                    decls: 3,
                    vars: 1,
                    consts: [["width", "30", "height", "18", 1, "ct-chart-line"], [1, "ct-series", "ct-series-a"], [1, "ct-line"]],
                    template: function (i, r) {
                        1 & i && (function Cm() {
                            $.lFrame.currentNamespace = "svg"
                        }(), y(0, "svg", 0)(1, "g", 1), N(2, "path", 2), _()()), 2 & i && (f(2), ht("d", r.path))
                    },
                    encapsulation: 2,
                    changeDetection: 0
                })

                constructor() {
                    this.path = null, this._historicCoverages = []
                }

                get historicCoverages() {
                    return this._historicCoverages
                }

                set historicCoverages(t) {
                    if (this._historicCoverages = t, t.length > 1) {
                        let i = "";
                        for (let r = 0; r < t.length; r++) i += 0 === r ? "M" : "L", i += `${Gt.roundNumber(30 * r / (t.length - 1))}`, i += `,${Gt.roundNumber(18 - 18 * t[r] / 100)}`;
                        this.path = i
                    } else this.path = null
                }
            }

            return e
        })();
        const Hj = ["class-row", ""], Mp = e => ({historiccoverageoffset: e});

        function Bj(e, n) {
            if (1 & e && (y(0, "a", 5), b(1), _()), 2 & e) {
                const t = v();
                m("href", t.clazz.reportPath, Kn), f(), A(t.clazz.name)
            }
        }

        function jj(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v();
                f(), A(t.clazz.name)
            }
        }

        function Uj(e, n) {
            if (1 & e && (ne(0), y(1, "div"), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(), Dn("currenthistory ", t.getClassName(t.clazz.coveredLines, t.clazz.currentHistoricCoverage.cl), ""), f(), K(" ", t.clazz.coveredLines, " "), f(), m("title", t.clazz.currentHistoricCoverage.et), f(), K(" ", t.clazz.currentHistoricCoverage.cl, " ")
            }
        }

        function $j(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.coveredLines, " ")
            }
        }

        function zj(e, n) {
            if (1 & e && (y(0, "td", 6), H(1, Uj, 5, 6, "ng-container", 1)(2, $j, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function Gj(e, n) {
            if (1 & e && (ne(0), y(1, "div"), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(), Dn("currenthistory ", t.getClassName(t.clazz.currentHistoricCoverage.ucl, t.clazz.uncoveredLines), ""), f(), K(" ", t.clazz.uncoveredLines, " "), f(), m("title", t.clazz.currentHistoricCoverage.et), f(), K(" ", t.clazz.currentHistoricCoverage.ucl, " ")
            }
        }

        function qj(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.uncoveredLines, " ")
            }
        }

        function Wj(e, n) {
            if (1 & e && (y(0, "td", 6), H(1, Gj, 5, 6, "ng-container", 1)(2, qj, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function Zj(e, n) {
            if (1 & e && (ne(0), y(1, "div", 8), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(2), A(t.clazz.coverableLines), f(), m("title", t.clazz.currentHistoricCoverage.et), f(), A(t.clazz.currentHistoricCoverage.cal)
            }
        }

        function Yj(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.coverableLines, " ")
            }
        }

        function Qj(e, n) {
            if (1 & e && (y(0, "td", 6), H(1, Zj, 5, 3, "ng-container", 1)(2, Yj, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function Kj(e, n) {
            if (1 & e && (ne(0), y(1, "div", 8), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(2), A(t.clazz.totalLines), f(), m("title", t.clazz.currentHistoricCoverage.et), f(), A(t.clazz.currentHistoricCoverage.tl)
            }
        }

        function Xj(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.totalLines, " ")
            }
        }

        function Jj(e, n) {
            if (1 & e && (y(0, "td", 6), H(1, Kj, 5, 3, "ng-container", 1)(2, Xj, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function eU(e, n) {
            if (1 & e && N(0, "div", 11), 2 & e) {
                const t = v(2);
                Fn("title", t.translations.history + ": " + t.translations.coverage), m("historicCoverages", t.clazz.lineCoverageHistory)("ngClass", ps(3, Mp, null !== t.clazz.currentHistoricCoverage))
            }
        }

        function tU(e, n) {
            if (1 & e && (ne(0), y(1, "div"), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(), Dn("currenthistory ", t.getClassName(t.clazz.coverage, t.clazz.currentHistoricCoverage.lcq), ""), f(), K(" ", t.clazz.coveragePercentage, " "), f(), m("title", t.clazz.currentHistoricCoverage.et + ": " + t.clazz.currentHistoricCoverage.coverageRatioText), f(), K("", t.clazz.currentHistoricCoverage.lcq, "%")
            }
        }

        function nU(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.coveragePercentage, " ")
            }
        }

        function iU(e, n) {
            if (1 & e && (y(0, "td", 9), H(1, eU, 1, 5, "div", 10)(2, tU, 5, 6, "ng-container", 1)(3, nU, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                m("title", t.clazz.coverageRatioText), f(), m("ngIf", t.clazz.lineCoverageHistory.length > 1), f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function rU(e, n) {
            if (1 & e && (y(0, "td", 6), N(1, "coverage-bar", 12), _()), 2 & e) {
                const t = v();
                f(), m("percentage", t.clazz.coverage)
            }
        }

        function oU(e, n) {
            if (1 & e && (ne(0), y(1, "div"), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(), Dn("currenthistory ", t.getClassName(t.clazz.coveredBranches, t.clazz.currentHistoricCoverage.cb), ""), f(), K(" ", t.clazz.coveredBranches, " "), f(), m("title", t.clazz.currentHistoricCoverage.et), f(), K(" ", t.clazz.currentHistoricCoverage.cb, " ")
            }
        }

        function sU(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.coveredBranches, " ")
            }
        }

        function aU(e, n) {
            if (1 & e && (y(0, "td", 6), H(1, oU, 5, 6, "ng-container", 1)(2, sU, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function lU(e, n) {
            if (1 & e && (ne(0), y(1, "div", 8), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(2), A(t.clazz.totalBranches), f(), m("title", t.clazz.currentHistoricCoverage.et), f(), A(t.clazz.currentHistoricCoverage.tb)
            }
        }

        function cU(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.totalBranches, " ")
            }
        }

        function uU(e, n) {
            if (1 & e && (y(0, "td", 6), H(1, lU, 5, 3, "ng-container", 1)(2, cU, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function dU(e, n) {
            if (1 & e && N(0, "div", 14), 2 & e) {
                const t = v(2);
                Fn("title", t.translations.history + ": " + t.translations.branchCoverage), m("historicCoverages", t.clazz.branchCoverageHistory)("ngClass", ps(3, Mp, null !== t.clazz.currentHistoricCoverage))
            }
        }

        function fU(e, n) {
            if (1 & e && (ne(0), y(1, "div"), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(), Dn("currenthistory ", t.getClassName(t.clazz.branchCoverage, t.clazz.currentHistoricCoverage.bcq), ""), f(), K(" ", t.clazz.branchCoveragePercentage, " "), f(), m("title", t.clazz.currentHistoricCoverage.et + ": " + t.clazz.currentHistoricCoverage.branchCoverageRatioText), f(), K("", t.clazz.currentHistoricCoverage.bcq, "%")
            }
        }

        function hU(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.branchCoveragePercentage, " ")
            }
        }

        function pU(e, n) {
            if (1 & e && (y(0, "td", 9), H(1, dU, 1, 5, "div", 13)(2, fU, 5, 6, "ng-container", 1)(3, hU, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                m("title", t.clazz.branchCoverageRatioText), f(), m("ngIf", t.clazz.branchCoverageHistory.length > 1), f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function gU(e, n) {
            if (1 & e && (y(0, "td", 6), N(1, "coverage-bar", 12), _()), 2 & e) {
                const t = v();
                f(), m("percentage", t.clazz.branchCoverage)
            }
        }

        function mU(e, n) {
            if (1 & e && (ne(0), y(1, "div"), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(), Dn("currenthistory ", t.getClassName(t.clazz.coveredMethods, t.clazz.currentHistoricCoverage.cm), ""), f(), K(" ", t.clazz.coveredMethods, " "), f(), m("title", t.clazz.currentHistoricCoverage.et), f(), K(" ", t.clazz.currentHistoricCoverage.cm, " ")
            }
        }

        function vU(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.coveredMethods, " ")
            }
        }

        function _U(e, n) {
            if (1 & e && (y(0, "td", 6), H(1, mU, 5, 6, "ng-container", 1)(2, vU, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function yU(e, n) {
            if (1 & e && (ne(0), y(1, "div", 8), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(2), A(t.clazz.totalMethods), f(), m("title", t.clazz.currentHistoricCoverage.et), f(), A(t.clazz.currentHistoricCoverage.tm)
            }
        }

        function CU(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.totalMethods, " ")
            }
        }

        function wU(e, n) {
            if (1 & e && (y(0, "td", 6), H(1, yU, 5, 3, "ng-container", 1)(2, CU, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function EU(e, n) {
            if (1 & e && N(0, "div", 16), 2 & e) {
                const t = v(2);
                Fn("title", t.translations.history + ": " + t.translations.methodCoverage), m("historicCoverages", t.clazz.methodCoverageHistory)("ngClass", ps(3, Mp, null !== t.clazz.currentHistoricCoverage))
            }
        }

        function DU(e, n) {
            if (1 & e && (ne(0), y(1, "div"), b(2), _(), y(3, "div", 7), b(4), _(), ie()), 2 & e) {
                const t = v(2);
                f(), Dn("currenthistory ", t.getClassName(t.clazz.methodCoverage, t.clazz.currentHistoricCoverage.mcq), ""), f(), K(" ", t.clazz.methodCoveragePercentage, " "), f(), m("title", t.clazz.currentHistoricCoverage.et + ": " + t.clazz.currentHistoricCoverage.methodCoverageRatioText), f(), K("", t.clazz.currentHistoricCoverage.mcq, "%")
            }
        }

        function bU(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), K(" ", t.clazz.methodCoveragePercentage, " ")
            }
        }

        function IU(e, n) {
            if (1 & e && (y(0, "td", 9), H(1, EU, 1, 5, "div", 15)(2, DU, 5, 6, "ng-container", 1)(3, bU, 2, 1, "ng-container", 1), _()), 2 & e) {
                const t = v();
                m("title", t.clazz.methodCoverageRatioText), f(), m("ngIf", t.clazz.methodCoverageHistory.length > 1), f(), m("ngIf", null !== t.clazz.currentHistoricCoverage), f(), m("ngIf", null === t.clazz.currentHistoricCoverage)
            }
        }

        function MU(e, n) {
            if (1 & e && (y(0, "td", 6), N(1, "coverage-bar", 12), _()), 2 & e) {
                const t = v();
                f(), m("percentage", t.clazz.methodCoverage)
            }
        }

        function TU(e, n) {
            if (1 & e && (y(0, "td", 6), b(1), _()), 2 & e) {
                const t = n.$implicit, i = v();
                f(), A(i.clazz.metrics[t.abbreviation])
            }
        }

        let SU = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275cmp = Yt({
                    type: e,
                    selectors: [["", "class-row", ""]],
                    inputs: {
                        clazz: "clazz",
                        translations: "translations",
                        lineCoverageAvailable: "lineCoverageAvailable",
                        branchCoverageAvailable: "branchCoverageAvailable",
                        methodCoverageAvailable: "methodCoverageAvailable",
                        visibleMetrics: "visibleMetrics",
                        historyComparisionDate: "historyComparisionDate"
                    },
                    attrs: Hj,
                    decls: 18,
                    vars: 17,
                    consts: [[3, "href", 4, "ngIf"], [4, "ngIf"], ["class", "right", 4, "ngIf"], ["class", "right", 3, "title", 4, "ngIf"], ["class", "right", 4, "ngFor", "ngForOf"], [3, "href"], [1, "right"], [3, "title"], [1, "currenthistory"], [1, "right", 3, "title"], ["coverage-history-chart", "", "class", "tinylinecoveragechart ct-chart", 3, "historicCoverages", "ngClass", "title", 4, "ngIf"], ["coverage-history-chart", "", 1, "tinylinecoveragechart", "ct-chart", 3, "historicCoverages", "ngClass", "title"], [3, "percentage"], ["coverage-history-chart", "", "class", "tinybranchcoveragechart ct-chart", 3, "historicCoverages", "ngClass", "title", 4, "ngIf"], ["coverage-history-chart", "", 1, "tinybranchcoveragechart", "ct-chart", 3, "historicCoverages", "ngClass", "title"], ["coverage-history-chart", "", "class", "tinymethodcoveragechart ct-chart", 3, "historicCoverages", "ngClass", "title", 4, "ngIf"], ["coverage-history-chart", "", 1, "tinymethodcoveragechart", "ct-chart", 3, "historicCoverages", "ngClass", "title"]],
                    template: function (i, r) {
                        1 & i && (y(0, "td"), H(1, Bj, 2, 2, "a", 0)(2, jj, 2, 1, "ng-container", 1), _(), H(3, zj, 3, 2, "td", 2)(4, Wj, 3, 2, "td", 2)(5, Qj, 3, 2, "td", 2)(6, Jj, 3, 2, "td", 2)(7, iU, 4, 4, "td", 3)(8, rU, 2, 1, "td", 2)(9, aU, 3, 2, "td", 2)(10, uU, 3, 2, "td", 2)(11, pU, 4, 4, "td", 3)(12, gU, 2, 1, "td", 2)(13, _U, 3, 2, "td", 2)(14, wU, 3, 2, "td", 2)(15, IU, 4, 4, "td", 3)(16, MU, 2, 1, "td", 2)(17, TU, 2, 1, "td", 4)), 2 & i && (f(), m("ngIf", "" !== r.clazz.reportPath), f(), m("ngIf", "" === r.clazz.reportPath), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.lineCoverageAvailable), f(), m("ngIf", r.branchCoverageAvailable), f(), m("ngIf", r.branchCoverageAvailable), f(), m("ngIf", r.branchCoverageAvailable), f(), m("ngIf", r.branchCoverageAvailable), f(), m("ngIf", r.methodCoverageAvailable), f(), m("ngIf", r.methodCoverageAvailable), f(), m("ngIf", r.methodCoverageAvailable), f(), m("ngIf", r.methodCoverageAvailable), f(), m("ngForOf", r.visibleMetrics))
                    },
                    dependencies: [Xr, Ui, jn, Vj, UI],
                    encapsulation: 2,
                    changeDetection: 0
                })

                constructor() {
                    this.translations = {}, this.lineCoverageAvailable = !1, this.branchCoverageAvailable = !1, this.methodCoverageAvailable = !1, this.visibleMetrics = [], this.historyComparisionDate = ""
                }

                getClassName(t, i) {
                    return t > i ? "lightgreen" : t < i ? "lightred" : "lightgraybg"
                }
            }

            return e
        })();
        const Ht = (e, n, t) => ({"icon-up-dir_active": e, "icon-down-dir_active": n, "icon-up-down-dir": t});

        function OU(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "popup", 30), st("visibleChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.popupVisible, r) || (o.popupVisible = r), q(r)
                })("showLineCoverageChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.showLineCoverage, r) || (o.settings.showLineCoverage = r), q(r)
                })("showBranchCoverageChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.showBranchCoverage, r) || (o.settings.showBranchCoverage = r), q(r)
                })("showMethodCoverageChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.showMethodCoverage, r) || (o.settings.showMethodCoverage = r), q(r)
                })("visibleMetricsChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.visibleMetrics, r) || (o.settings.visibleMetrics = r), q(r)
                }), _()
            }
            if (2 & e) {
                const t = v(2);
                tt("visible", t.popupVisible), m("translations", t.translations)("branchCoverageAvailable", t.branchCoverageAvailable)("methodCoverageAvailable", t.methodCoverageAvailable)("metrics", t.metrics), tt("showLineCoverage", t.settings.showLineCoverage)("showBranchCoverage", t.settings.showBranchCoverage)("showMethodCoverage", t.settings.showMethodCoverage)("visibleMetrics", t.settings.visibleMetrics)
            }
        }

        function NU(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), A(t.translations.noGrouping)
            }
        }

        function AU(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), A(t.translations.byAssembly)
            }
        }

        function xU(e, n) {
            if (1 & e && (ne(0), b(1), ie()), 2 & e) {
                const t = v(2);
                f(), A(t.translations.byNamespace + " " + t.settings.grouping)
            }
        }

        function RU(e, n) {
            if (1 & e && (y(0, "option", 34), b(1), _()), 2 & e) {
                const t = n.$implicit;
                m("value", t), f(), A(t)
            }
        }

        function LU(e, n) {
            1 & e && N(0, "br")
        }

        function PU(e, n) {
            if (1 & e && (y(0, "option", 42), b(1), _()), 2 & e) {
                const t = v(4);
                f(), K(" ", t.translations.branchCoverageIncreaseOnly, " ")
            }
        }

        function kU(e, n) {
            if (1 & e && (y(0, "option", 43), b(1), _()), 2 & e) {
                const t = v(4);
                f(), K(" ", t.translations.branchCoverageDecreaseOnly, " ")
            }
        }

        function FU(e, n) {
            if (1 & e && (y(0, "option", 44), b(1), _()), 2 & e) {
                const t = v(4);
                f(), K(" ", t.translations.methodCoverageIncreaseOnly, " ")
            }
        }

        function VU(e, n) {
            if (1 & e && (y(0, "option", 45), b(1), _()), 2 & e) {
                const t = v(4);
                f(), K(" ", t.translations.methodCoverageDecreaseOnly, " ")
            }
        }

        function HU(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "div")(1, "select", 31), st("ngModelChange", function (r) {
                    G(t);
                    const o = v(3);
                    return Ne(o.settings.historyComparisionType, r) || (o.settings.historyComparisionType = r), q(r)
                }), y(2, "option", 32), b(3), _(), y(4, "option", 35), b(5), _(), y(6, "option", 36), b(7), _(), y(8, "option", 37), b(9), _(), H(10, PU, 2, 1, "option", 38)(11, kU, 2, 1, "option", 39)(12, FU, 2, 1, "option", 40)(13, VU, 2, 1, "option", 41), _()()
            }
            if (2 & e) {
                const t = v(3);
                f(), tt("ngModel", t.settings.historyComparisionType), f(2), A(t.translations.filter), f(2), A(t.translations.allChanges), f(2), A(t.translations.lineCoverageIncreaseOnly), f(2), A(t.translations.lineCoverageDecreaseOnly), f(), m("ngIf", t.branchCoverageAvailable), f(), m("ngIf", t.branchCoverageAvailable), f(), m("ngIf", t.methodCoverageAvailable), f(), m("ngIf", t.methodCoverageAvailable)
            }
        }

        function BU(e, n) {
            if (1 & e) {
                const t = Ie();
                ne(0), y(1, "div"), b(2), y(3, "select", 31), st("ngModelChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.historyComparisionDate, r) || (o.settings.historyComparisionDate = r), q(r)
                }), W("ngModelChange", function () {
                    return G(t), q(v(2).updateCurrentHistoricCoverage())
                }), y(4, "option", 32), b(5), _(), H(6, RU, 2, 2, "option", 33), _()(), H(7, LU, 1, 0, "br", 0)(8, HU, 14, 9, "div", 0), ie()
            }
            if (2 & e) {
                const t = v(2);
                f(2), K(" ", t.translations.compareHistory, " "), f(), tt("ngModel", t.settings.historyComparisionDate), f(2), A(t.translations.date), f(), m("ngForOf", t.historicCoverageExecutionTimes), f(), m("ngIf", "" !== t.settings.historyComparisionDate), f(), m("ngIf", "" !== t.settings.historyComparisionDate)
            }
        }

        function jU(e, n) {
            1 & e && N(0, "col", 46)
        }

        function UU(e, n) {
            1 & e && N(0, "col", 47)
        }

        function $U(e, n) {
            1 & e && N(0, "col", 48)
        }

        function zU(e, n) {
            1 & e && N(0, "col", 49)
        }

        function GU(e, n) {
            1 & e && N(0, "col", 50)
        }

        function qU(e, n) {
            1 & e && N(0, "col", 51)
        }

        function WU(e, n) {
            1 & e && N(0, "col", 46)
        }

        function ZU(e, n) {
            1 & e && N(0, "col", 49)
        }

        function YU(e, n) {
            1 & e && N(0, "col", 50)
        }

        function QU(e, n) {
            1 & e && N(0, "col", 51)
        }

        function KU(e, n) {
            1 & e && N(0, "col", 46)
        }

        function XU(e, n) {
            1 & e && N(0, "col", 49)
        }

        function JU(e, n) {
            1 & e && N(0, "col", 50)
        }

        function e3(e, n) {
            1 & e && N(0, "col", 51)
        }

        function t3(e, n) {
            1 & e && N(0, "col", 51)
        }

        function n3(e, n) {
            if (1 & e && (y(0, "th", 52), b(1), _()), 2 & e) {
                const t = v(2);
                f(), A(t.translations.coverage)
            }
        }

        function i3(e, n) {
            if (1 & e && (y(0, "th", 53), b(1), _()), 2 & e) {
                const t = v(2);
                f(), A(t.translations.branchCoverage)
            }
        }

        function r3(e, n) {
            if (1 & e && (y(0, "th", 53), b(1), _()), 2 & e) {
                const t = v(2);
                f(), A(t.translations.methodCoverage)
            }
        }

        function o3(e, n) {
            if (1 & e && (y(0, "th", 54), b(1), _()), 2 & e) {
                const t = v(2);
                ht("colspan", t.settings.visibleMetrics.length), f(), A(t.translations.metrics)
            }
        }

        function s3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "td", 52)(1, "ngx-slider", 55), st("valueChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.lineCoverageMin, r) || (o.settings.lineCoverageMin = r), q(r)
                })("highValueChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.lineCoverageMax, r) || (o.settings.lineCoverageMax = r), q(r)
                }), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(), tt("value", t.settings.lineCoverageMin)("highValue", t.settings.lineCoverageMax), m("options", t.sliderOptions)
            }
        }

        function a3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "td", 53)(1, "ngx-slider", 55), st("valueChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.branchCoverageMin, r) || (o.settings.branchCoverageMin = r), q(r)
                })("highValueChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.branchCoverageMax, r) || (o.settings.branchCoverageMax = r), q(r)
                }), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(), tt("value", t.settings.branchCoverageMin)("highValue", t.settings.branchCoverageMax), m("options", t.sliderOptions)
            }
        }

        function l3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "td", 53)(1, "ngx-slider", 55), st("valueChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.methodCoverageMin, r) || (o.settings.methodCoverageMin = r), q(r)
                })("highValueChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.methodCoverageMax, r) || (o.settings.methodCoverageMax = r), q(r)
                }), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(), tt("value", t.settings.methodCoverageMin)("highValue", t.settings.methodCoverageMax), m("options", t.sliderOptions)
            }
        }

        function c3(e, n) {
            1 & e && N(0, "td", 54), 2 & e && ht("colspan", v(2).settings.visibleMetrics.length)
        }

        function u3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 56)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("covered", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "covered" === t.settings.sortBy && "asc" === t.settings.sortOrder, "covered" === t.settings.sortBy && "desc" === t.settings.sortOrder, "covered" !== t.settings.sortBy)), f(), A(t.translations.covered)
            }
        }

        function d3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 56)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("uncovered", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "uncovered" === t.settings.sortBy && "asc" === t.settings.sortOrder, "uncovered" === t.settings.sortBy && "desc" === t.settings.sortOrder, "uncovered" !== t.settings.sortBy)), f(), A(t.translations.uncovered)
            }
        }

        function f3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 56)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("coverable", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "coverable" === t.settings.sortBy && "asc" === t.settings.sortOrder, "coverable" === t.settings.sortBy && "desc" === t.settings.sortOrder, "coverable" !== t.settings.sortBy)), f(), A(t.translations.coverable)
            }
        }

        function h3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 56)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("total", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "total" === t.settings.sortBy && "asc" === t.settings.sortOrder, "total" === t.settings.sortBy && "desc" === t.settings.sortOrder, "total" !== t.settings.sortBy)), f(), A(t.translations.total)
            }
        }

        function p3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 57)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("coverage", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "coverage" === t.settings.sortBy && "asc" === t.settings.sortOrder, "coverage" === t.settings.sortBy && "desc" === t.settings.sortOrder, "coverage" !== t.settings.sortBy)), f(), A(t.translations.percentage)
            }
        }

        function g3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 56)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("covered_branches", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "covered_branches" === t.settings.sortBy && "asc" === t.settings.sortOrder, "covered_branches" === t.settings.sortBy && "desc" === t.settings.sortOrder, "covered_branches" !== t.settings.sortBy)), f(), A(t.translations.covered)
            }
        }

        function m3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 56)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("total_branches", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "total_branches" === t.settings.sortBy && "asc" === t.settings.sortOrder, "total_branches" === t.settings.sortBy && "desc" === t.settings.sortOrder, "total_branches" !== t.settings.sortBy)), f(), A(t.translations.total)
            }
        }

        function v3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 57)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("branchcoverage", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "branchcoverage" === t.settings.sortBy && "asc" === t.settings.sortOrder, "branchcoverage" === t.settings.sortBy && "desc" === t.settings.sortOrder, "branchcoverage" !== t.settings.sortBy)), f(), A(t.translations.percentage)
            }
        }

        function _3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 56)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("covered_methods", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "covered_methods" === t.settings.sortBy && "asc" === t.settings.sortOrder, "covered_methods" === t.settings.sortBy && "desc" === t.settings.sortOrder, "covered_methods" !== t.settings.sortBy)), f(), A(t.translations.covered)
            }
        }

        function y3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 56)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("total_methods", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "total_methods" === t.settings.sortBy && "asc" === t.settings.sortOrder, "total_methods" === t.settings.sortBy && "desc" === t.settings.sortOrder, "total_methods" !== t.settings.sortBy)), f(), A(t.translations.total)
            }
        }

        function C3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th", 57)(1, "a", 3), W("click", function (r) {
                    return G(t), q(v(2).updateSorting("methodcoverage", r))
                }), N(2, "i", 26), b(3), _()()
            }
            if (2 & e) {
                const t = v(2);
                f(2), m("ngClass", Ye(2, Ht, "methodcoverage" === t.settings.sortBy && "asc" === t.settings.sortOrder, "methodcoverage" === t.settings.sortBy && "desc" === t.settings.sortOrder, "methodcoverage" !== t.settings.sortBy)), f(), A(t.translations.percentage)
            }
        }

        function w3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th")(1, "a", 3), W("click", function (r) {
                    const o = G(t).$implicit;
                    return q(v(2).updateSorting(o.abbreviation, r))
                }), N(2, "i", 26), b(3), _(), y(4, "a", 58), N(5, "i", 59), _()()
            }
            if (2 & e) {
                const t = n.$implicit, i = v(2);
                f(2), m("ngClass", Ye(3, Ht, i.settings.sortBy === t.abbreviation && "asc" === i.settings.sortOrder, i.settings.sortBy === t.abbreviation && "desc" === i.settings.sortOrder, i.settings.sortBy !== t.abbreviation)), f(), A(t.name), f(), Fn("href", t.explanationUrl, Kn)
            }
        }

        function E3(e, n) {
            if (1 & e && N(0, "tr", 61), 2 & e) {
                const t = v().$implicit, i = v(2);
                m("element", t)("collapsed", t.collapsed)("lineCoverageAvailable", i.settings.showLineCoverage)("branchCoverageAvailable", i.branchCoverageAvailable && i.settings.showBranchCoverage)("methodCoverageAvailable", i.methodCoverageAvailable && i.settings.showMethodCoverage)("visibleMetrics", i.settings.visibleMetrics)
            }
        }

        function D3(e, n) {
            if (1 & e && N(0, "tr", 63), 2 & e) {
                const t = v().$implicit, i = v(3);
                m("clazz", t)("translations", i.translations)("lineCoverageAvailable", i.settings.showLineCoverage)("branchCoverageAvailable", i.branchCoverageAvailable && i.settings.showBranchCoverage)("methodCoverageAvailable", i.methodCoverageAvailable && i.settings.showMethodCoverage)("visibleMetrics", i.settings.visibleMetrics)("historyComparisionDate", i.settings.historyComparisionDate)
            }
        }

        function b3(e, n) {
            if (1 & e && (ne(0), H(1, D3, 1, 7, "tr", 62), ie()), 2 & e) {
                const t = n.$implicit, i = v().$implicit, r = v(2);
                f(), m("ngIf", !i.collapsed && t.visible(r.settings))
            }
        }

        function I3(e, n) {
            if (1 & e && N(0, "tr", 66), 2 & e) {
                const t = v().$implicit, i = v(5);
                m("clazz", t)("translations", i.translations)("lineCoverageAvailable", i.settings.showLineCoverage)("branchCoverageAvailable", i.branchCoverageAvailable && i.settings.showBranchCoverage)("methodCoverageAvailable", i.methodCoverageAvailable && i.settings.showMethodCoverage)("visibleMetrics", i.settings.visibleMetrics)("historyComparisionDate", i.settings.historyComparisionDate)
            }
        }

        function M3(e, n) {
            if (1 & e && (ne(0), H(1, I3, 1, 7, "tr", 65), ie()), 2 & e) {
                const t = n.$implicit, i = v(2).$implicit, r = v(3);
                f(), m("ngIf", !i.collapsed && t.visible(r.settings))
            }
        }

        function T3(e, n) {
            if (1 & e && (ne(0), N(1, "tr", 64), H(2, M3, 2, 1, "ng-container", 29), ie()), 2 & e) {
                const t = v().$implicit, i = v(3);
                f(), m("element", t)("collapsed", t.collapsed)("lineCoverageAvailable", i.settings.showLineCoverage)("branchCoverageAvailable", i.branchCoverageAvailable && i.settings.showBranchCoverage)("methodCoverageAvailable", i.methodCoverageAvailable && i.settings.showMethodCoverage)("visibleMetrics", i.settings.visibleMetrics), f(), m("ngForOf", t.classes)
            }
        }

        function S3(e, n) {
            if (1 & e && (ne(0), H(1, T3, 3, 7, "ng-container", 0), ie()), 2 & e) {
                const t = n.$implicit, i = v().$implicit, r = v(2);
                f(), m("ngIf", !i.collapsed && t.visible(r.settings))
            }
        }

        function O3(e, n) {
            if (1 & e && (ne(0), H(1, E3, 1, 6, "tr", 60)(2, b3, 2, 1, "ng-container", 29)(3, S3, 2, 1, "ng-container", 29), ie()), 2 & e) {
                const t = n.$implicit, i = v(2);
                f(), m("ngIf", t.visible(i.settings)), f(), m("ngForOf", t.classes), f(), m("ngForOf", t.subElements)
            }
        }

        function N3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "div"), H(1, OU, 1, 9, "popup", 1), y(2, "div", 2)(3, "div")(4, "a", 3), W("click", function (r) {
                    return G(t), q(v().collapseAll(r))
                }), b(5), _(), b(6, " | "), y(7, "a", 3), W("click", function (r) {
                    return G(t), q(v().expandAll(r))
                }), b(8), _()(), y(9, "div", 4)(10, "span", 5), H(11, NU, 2, 1, "ng-container", 0)(12, AU, 2, 1, "ng-container", 0)(13, xU, 2, 1, "ng-container", 0), _(), N(14, "br"), b(15), y(16, "input", 6), st("ngModelChange", function (r) {
                    G(t);
                    const o = v();
                    return Ne(o.settings.grouping, r) || (o.settings.grouping = r), q(r)
                }), W("ngModelChange", function () {
                    return G(t), q(v().updateCoverageInfo())
                }), _()(), y(17, "div", 4), H(18, BU, 9, 6, "ng-container", 0), _(), y(19, "div", 7)(20, "button", 8), W("click", function () {
                    return G(t), q(v().popupVisible = !0)
                }), N(21, "i", 9), b(22), _()()(), y(23, "div", 10)(24, "table", 11)(25, "colgroup"), N(26, "col", 12), H(27, jU, 1, 0, "col", 13)(28, UU, 1, 0, "col", 14)(29, $U, 1, 0, "col", 15)(30, zU, 1, 0, "col", 16)(31, GU, 1, 0, "col", 17)(32, qU, 1, 0, "col", 18)(33, WU, 1, 0, "col", 13)(34, ZU, 1, 0, "col", 16)(35, YU, 1, 0, "col", 17)(36, QU, 1, 0, "col", 18)(37, KU, 1, 0, "col", 13)(38, XU, 1, 0, "col", 16)(39, JU, 1, 0, "col", 17)(40, e3, 1, 0, "col", 18)(41, t3, 1, 0, "col", 19), _(), y(42, "thead")(43, "tr", 20), N(44, "th"), H(45, n3, 2, 1, "th", 21)(46, i3, 2, 1, "th", 22)(47, r3, 2, 1, "th", 22)(48, o3, 2, 2, "th", 23), _(), y(49, "tr", 24)(50, "td")(51, "input", 25), st("ngModelChange", function (r) {
                    G(t);
                    const o = v();
                    return Ne(o.settings.filter, r) || (o.settings.filter = r), q(r)
                }), _()(), H(52, s3, 2, 3, "td", 21)(53, a3, 2, 3, "td", 22)(54, l3, 2, 3, "td", 22)(55, c3, 1, 1, "td", 23), _(), y(56, "tr")(57, "th")(58, "a", 3), W("click", function (r) {
                    return G(t), q(v().updateSorting("name", r))
                }), N(59, "i", 26), b(60), _()(), H(61, u3, 4, 6, "th", 27)(62, d3, 4, 6, "th", 27)(63, f3, 4, 6, "th", 27)(64, h3, 4, 6, "th", 27)(65, p3, 4, 6, "th", 28)(66, g3, 4, 6, "th", 27)(67, m3, 4, 6, "th", 27)(68, v3, 4, 6, "th", 28)(69, _3, 4, 6, "th", 27)(70, y3, 4, 6, "th", 27)(71, C3, 4, 6, "th", 28)(72, w3, 6, 7, "th", 29), _()(), y(73, "tbody"), H(74, O3, 4, 3, "ng-container", 29), _()()()()
            }
            if (2 & e) {
                const t = v();
                f(), m("ngIf", t.popupVisible), f(4), A(t.translations.collapseAll), f(3), A(t.translations.expandAll), f(3), m("ngIf", -1 === t.settings.grouping), f(), m("ngIf", 0 === t.settings.grouping), f(), m("ngIf", t.settings.grouping > 0), f(2), K(" ", t.translations.grouping, " "), f(), m("max", t.settings.groupingMaximum), tt("ngModel", t.settings.grouping), f(2), m("ngIf", t.historicCoverageExecutionTimes.length > 0), f(4), A(t.metrics.length > 0 ? t.translations.selectCoverageTypesAndMetrics : t.translations.selectCoverageTypes), f(5), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.branchCoverageAvailable && t.settings.showBranchCoverage), f(), m("ngIf", t.branchCoverageAvailable && t.settings.showBranchCoverage), f(), m("ngIf", t.branchCoverageAvailable && t.settings.showBranchCoverage), f(), m("ngIf", t.branchCoverageAvailable && t.settings.showBranchCoverage), f(), m("ngIf", t.methodCoverageAvailable && t.settings.showMethodCoverage), f(), m("ngIf", t.methodCoverageAvailable && t.settings.showMethodCoverage), f(), m("ngIf", t.methodCoverageAvailable && t.settings.showMethodCoverage), f(), m("ngIf", t.methodCoverageAvailable && t.settings.showMethodCoverage), f(), m("ngForOf", t.settings.visibleMetrics), f(4), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.branchCoverageAvailable && t.settings.showBranchCoverage), f(), m("ngIf", t.methodCoverageAvailable && t.settings.showMethodCoverage), f(), m("ngIf", t.settings.visibleMetrics.length > 0), f(3), Fn("placeholder", t.translations.filter), tt("ngModel", t.settings.filter), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.branchCoverageAvailable && t.settings.showBranchCoverage), f(), m("ngIf", t.methodCoverageAvailable && t.settings.showMethodCoverage), f(), m("ngIf", t.settings.visibleMetrics.length > 0), f(4), m("ngClass", Ye(51, Ht, "name" === t.settings.sortBy && "asc" === t.settings.sortOrder, "name" === t.settings.sortBy && "desc" === t.settings.sortOrder, "name" !== t.settings.sortBy)), f(), A(t.translations.name), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.settings.showLineCoverage), f(), m("ngIf", t.branchCoverageAvailable && t.settings.showBranchCoverage), f(), m("ngIf", t.branchCoverageAvailable && t.settings.showBranchCoverage), f(), m("ngIf", t.branchCoverageAvailable && t.settings.showBranchCoverage), f(), m("ngIf", t.methodCoverageAvailable && t.settings.showMethodCoverage), f(), m("ngIf", t.methodCoverageAvailable && t.settings.showMethodCoverage), f(), m("ngIf", t.methodCoverageAvailable && t.settings.showMethodCoverage), f(), m("ngForOf", t.settings.visibleMetrics), f(2), m("ngForOf", t.codeElements)
            }
        }

        let A3 = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(Ip))
                };
                static#t = this.\u0275cmp = Yt({
                    type: e,
                    selectors: [["coverage-info"]],
                    hostBindings: function (i, r) {
                        1 & i && W("beforeunload", function () {
                            return r.onBeforeUnload()
                        }, 0, Za)
                    },
                    decls: 1,
                    vars: 1,
                    consts: [[4, "ngIf"], [3, "visible", "translations", "branchCoverageAvailable", "methodCoverageAvailable", "metrics", "showLineCoverage", "showBranchCoverage", "showMethodCoverage", "visibleMetrics", "visibleChange", "showLineCoverageChange", "showBranchCoverageChange", "showMethodCoverageChange", "visibleMetricsChange", 4, "ngIf"], [1, "customizebox"], ["href", "#", 3, "click"], [1, "col-center"], [1, "slider-label"], ["type", "range", "step", "1", "min", "-1", 3, "ngModelChange", "max", "ngModel"], [1, "col-right", "right"], ["type", "button", 3, "click"], [1, "icon-cog"], [1, "table-responsive"], [1, "overview", "table-fixed", "stripped"], [1, "column-min-200"], ["class", "column90", 4, "ngIf"], ["class", "column105", 4, "ngIf"], ["class", "column100", 4, "ngIf"], ["class", "column70", 4, "ngIf"], ["class", "column98", 4, "ngIf"], ["class", "column112", 4, "ngIf"], ["class", "column112", 4, "ngFor", "ngForOf"], [1, "header"], ["class", "center", "colspan", "6", 4, "ngIf"], ["class", "center", "colspan", "4", 4, "ngIf"], ["class", "center", 4, "ngIf"], [1, "filterbar"], ["type", "text", 3, "ngModelChange", "ngModel", "placeholder"], [3, "ngClass"], ["class", "right", 4, "ngIf"], ["class", "center", "colspan", "2", 4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "visibleChange", "showLineCoverageChange", "showBranchCoverageChange", "showMethodCoverageChange", "visibleMetricsChange", "visible", "translations", "branchCoverageAvailable", "methodCoverageAvailable", "metrics", "showLineCoverage", "showBranchCoverage", "showMethodCoverage", "visibleMetrics"], [3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["value", "allChanges"], ["value", "lineCoverageIncreaseOnly"], ["value", "lineCoverageDecreaseOnly"], ["value", "branchCoverageIncreaseOnly", 4, "ngIf"], ["value", "branchCoverageDecreaseOnly", 4, "ngIf"], ["value", "methodCoverageIncreaseOnly", 4, "ngIf"], ["value", "methodCoverageDecreaseOnly", 4, "ngIf"], ["value", "branchCoverageIncreaseOnly"], ["value", "branchCoverageDecreaseOnly"], ["value", "methodCoverageIncreaseOnly"], ["value", "methodCoverageDecreaseOnly"], [1, "column90"], [1, "column105"], [1, "column100"], [1, "column70"], [1, "column98"], [1, "column112"], ["colspan", "6", 1, "center"], ["colspan", "4", 1, "center"], [1, "center"], [3, "valueChange", "highValueChange", "value", "highValue", "options"], [1, "right"], ["colspan", "2", 1, "center"], ["target", "_blank", 3, "href"], [1, "icon-info-circled"], ["codeelement-row", "", 3, "element", "collapsed", "lineCoverageAvailable", "branchCoverageAvailable", "methodCoverageAvailable", "visibleMetrics", 4, "ngIf"], ["codeelement-row", "", 3, "element", "collapsed", "lineCoverageAvailable", "branchCoverageAvailable", "methodCoverageAvailable", "visibleMetrics"], ["class-row", "", 3, "clazz", "translations", "lineCoverageAvailable", "branchCoverageAvailable", "methodCoverageAvailable", "visibleMetrics", "historyComparisionDate", 4, "ngIf"], ["class-row", "", 3, "clazz", "translations", "lineCoverageAvailable", "branchCoverageAvailable", "methodCoverageAvailable", "visibleMetrics", "historyComparisionDate"], ["codeelement-row", "", 1, "namespace", 3, "element", "collapsed", "lineCoverageAvailable", "branchCoverageAvailable", "methodCoverageAvailable", "visibleMetrics"], ["class", "namespace", "class-row", "", 3, "clazz", "translations", "lineCoverageAvailable", "branchCoverageAvailable", "methodCoverageAvailable", "visibleMetrics", "historyComparisionDate", 4, "ngIf"], ["class-row", "", 1, "namespace", 3, "clazz", "translations", "lineCoverageAvailable", "branchCoverageAvailable", "methodCoverageAvailable", "visibleMetrics", "historyComparisionDate"]],
                    template: function (i, r) {
                        1 & i && H(0, N3, 75, 55, "div", 0), 2 & i && m("ngIf", r.codeElements.length > 0)
                    },
                    dependencies: [Xr, Ui, jn, _p, Cp, Ns, pp, ks, fc, Ps, HI, gj, kj, SU],
                    encapsulation: 2
                })

                constructor(t) {
                    this.queryString = "", this.historicCoverageExecutionTimes = [], this.branchCoverageAvailable = !1, this.methodCoverageAvailable = !1, this.metrics = [], this.codeElements = [], this.translations = {}, this.popupVisible = !1, this.settings = new oj, this.sliderOptions = {
                        floor: 0,
                        ceil: 100,
                        step: 1,
                        ticksArray: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        showTicks: !0
                    }, this.window = t.nativeWindow
                }

                ngOnInit() {
                    this.historicCoverageExecutionTimes = this.window.historicCoverageExecutionTimes, this.branchCoverageAvailable = this.window.branchCoverageAvailable, this.methodCoverageAvailable = this.window.methodCoverageAvailable, this.metrics = this.window.metrics, this.translations = this.window.translations, Gt.maximumDecimalPlacesForCoverageQuotas = this.window.maximumDecimalPlacesForCoverageQuotas;
                    let t = !1;
                    if (void 0 !== this.window.history && void 0 !== this.window.history.replaceState && null !== this.window.history.state && null != this.window.history.state.coverageInfoSettings) console.log("Coverage info: Restoring from history", this.window.history.state.coverageInfoSettings), t = !0, this.settings = JSON.parse(JSON.stringify(this.window.history.state.coverageInfoSettings)); else {
                        let r = 0, o = this.window.assemblies;
                        for (let s = 0; s < o.length; s++) for (let a = 0; a < o[s].classes.length; a++) r = Math.max(r, (o[s].classes[a].name.match(/\.|\\/g) || []).length);
                        this.settings.groupingMaximum = r, console.log("Grouping maximum: " + r), this.settings.showBranchCoverage = this.branchCoverageAvailable, this.settings.showMethodCoverage = this.methodCoverageAvailable
                    }
                    const i = window.location.href.indexOf("?");
                    i > -1 && (this.queryString = window.location.href.substring(i)), this.updateCoverageInfo(), t && this.restoreCollapseState()
                }

                onBeforeUnload() {
                    if (this.saveCollapseState(), void 0 !== this.window.history && void 0 !== this.window.history.replaceState) {
                        console.log("Coverage info: Updating history", this.settings);
                        let t = new BI;
                        null !== window.history.state && (t = JSON.parse(JSON.stringify(this.window.history.state))), t.coverageInfoSettings = JSON.parse(JSON.stringify(this.settings)), window.history.replaceState(t, "")
                    }
                }

                updateCoverageInfo() {
                    let t = (new Date).getTime(), i = this.window.assemblies, r = [], o = 0;
                    if (0 === this.settings.grouping) for (let l = 0; l < i.length; l++) {
                        let c = new di(i[l].name, null);
                        r.push(c);
                        for (let u = 0; u < i[l].classes.length; u++) c.insertClass(new bp(i[l].classes[u], this.queryString), null), o++
                    } else if (-1 === this.settings.grouping) {
                        let l = new di(this.translations.all, null);
                        r.push(l);
                        for (let c = 0; c < i.length; c++) for (let u = 0; u < i[c].classes.length; u++) l.insertClass(new bp(i[c].classes[u], this.queryString), null), o++
                    } else for (let l = 0; l < i.length; l++) {
                        let c = new di(i[l].name, null);
                        r.push(c);
                        for (let u = 0; u < i[l].classes.length; u++) c.insertClass(new bp(i[l].classes[u], this.queryString), this.settings.grouping), o++
                    }
                    let s = -1, a = 1;
                    "name" === this.settings.sortBy && (s = "asc" === this.settings.sortOrder ? -1 : 1, a = "asc" === this.settings.sortOrder ? 1 : -1), r.sort(function (l, c) {
                        return l.name === c.name ? 0 : l.name < c.name ? s : a
                    }), di.sortCodeElementViewModels(r, this.settings.sortBy, "asc" === this.settings.sortOrder);
                    for (let l = 0; l < r.length; l++) r[l].changeSorting(this.settings.sortBy, "asc" === this.settings.sortOrder);
                    this.codeElements = r, console.log(`Processing assemblies finished (Duration: ${(new Date).getTime() - t}ms, Assemblies: ${r.length}, Classes: ${o})`), "" !== this.settings.historyComparisionDate && this.updateCurrentHistoricCoverage()
                }

                updateCurrentHistoricCoverage() {
                    let t = (new Date).getTime();
                    for (let i = 0; i < this.codeElements.length; i++) this.codeElements[i].updateCurrentHistoricCoverage(this.settings.historyComparisionDate);
                    console.log(`Updating current historic coverage finished (Duration: ${(new Date).getTime() - t}ms)`)
                }

                collapseAll(t) {
                    t.preventDefault();
                    for (let i = 0; i < this.codeElements.length; i++) this.codeElements[i].collapse()
                }

                expandAll(t) {
                    t.preventDefault();
                    for (let i = 0; i < this.codeElements.length; i++) this.codeElements[i].expand()
                }

                updateSorting(t, i) {
                    i.preventDefault(), this.settings.sortOrder = t === this.settings.sortBy && "asc" === this.settings.sortOrder ? "desc" : "asc", this.settings.sortBy = t, console.log(`Updating sort column: '${this.settings.sortBy}' (${this.settings.sortOrder})`), di.sortCodeElementViewModels(this.codeElements, this.settings.sortBy, "asc" === this.settings.sortOrder);
                    for (let r = 0; r < this.codeElements.length; r++) this.codeElements[r].changeSorting(this.settings.sortBy, "asc" === this.settings.sortOrder)
                }

                saveCollapseState() {
                    this.settings.collapseStates = [];
                    let t = i => {
                        for (let r = 0; r < i.length; r++) this.settings.collapseStates.push(i[r].collapsed), t(i[r].subElements)
                    };
                    t(this.codeElements)
                }

                restoreCollapseState() {
                    let t = 0, i = r => {
                        for (let o = 0; o < r.length; o++) this.settings.collapseStates.length > t && (r[o].collapsed = this.settings.collapseStates[t]), t++, i(r[o].subElements)
                    };
                    i(this.codeElements)
                }
            }

            return e
        })();

        class x3 {
            constructor() {
                this.assembly = "", this.numberOfRiskHotspots = 10, this.filter = "", this.sortBy = "", this.sortOrder = "asc"
            }
        }

        const Ic = (e, n, t) => ({"icon-up-dir_active": e, "icon-down-dir_active": n, "icon-up-down-dir": t}),
            R3 = (e, n) => ({lightred: e, lightgreen: n});

        function L3(e, n) {
            if (1 & e && (y(0, "option", 16), b(1), _()), 2 & e) {
                const t = n.$implicit;
                m("value", t), f(), A(t)
            }
        }

        function P3(e, n) {
            if (1 & e && (y(0, "span"), b(1), _()), 2 & e) {
                const t = v(2);
                f(), A(t.translations.top)
            }
        }

        function k3(e, n) {
            1 & e && (y(0, "option", 23), b(1, "20"), _())
        }

        function F3(e, n) {
            1 & e && (y(0, "option", 24), b(1, "50"), _())
        }

        function V3(e, n) {
            1 & e && (y(0, "option", 25), b(1, "100"), _())
        }

        function H3(e, n) {
            if (1 & e && (y(0, "option", 16), b(1), _()), 2 & e) {
                const t = v(3);
                m("value", t.totalNumberOfRiskHotspots), f(), A(t.translations.all)
            }
        }

        function B3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "select", 17), st("ngModelChange", function (r) {
                    G(t);
                    const o = v(2);
                    return Ne(o.settings.numberOfRiskHotspots, r) || (o.settings.numberOfRiskHotspots = r), q(r)
                }), y(1, "option", 18), b(2, "10"), _(), H(3, k3, 2, 0, "option", 19)(4, F3, 2, 0, "option", 20)(5, V3, 2, 0, "option", 21)(6, H3, 2, 2, "option", 22), _()
            }
            if (2 & e) {
                const t = v(2);
                tt("ngModel", t.settings.numberOfRiskHotspots), f(3), m("ngIf", t.totalNumberOfRiskHotspots > 10), f(), m("ngIf", t.totalNumberOfRiskHotspots > 20), f(), m("ngIf", t.totalNumberOfRiskHotspots > 50), f(), m("ngIf", t.totalNumberOfRiskHotspots > 100)
            }
        }

        function j3(e, n) {
            1 & e && N(0, "col", 26)
        }

        function U3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "th")(1, "a", 13), W("click", function (r) {
                    const o = G(t).index;
                    return q(v(2).updateSorting("" + o, r))
                }), N(2, "i", 14), b(3), _(), y(4, "a", 27), N(5, "i", 28), _()()
            }
            if (2 & e) {
                const t = n.$implicit, i = n.index, r = v(2);
                f(2), m("ngClass", Ye(3, Ic, r.settings.sortBy === "" + i && "asc" === r.settings.sortOrder, r.settings.sortBy === "" + i && "desc" === r.settings.sortOrder, r.settings.sortBy !== "" + i)), f(), A(t.name), f(), Fn("href", t.explanationUrl, Kn)
            }
        }

        function $3(e, n) {
            if (1 & e && (y(0, "td", 32), b(1), _()), 2 & e) {
                const t = n.$implicit;
                m("ngClass", Xf(2, R3, t.exceeded, !t.exceeded)), f(), A(t.value)
            }
        }

        function z3(e, n) {
            if (1 & e && (y(0, "tr")(1, "td"), b(2), _(), y(3, "td")(4, "a", 29), b(5), _()(), y(6, "td", 30)(7, "a", 29), b(8), _()(), H(9, $3, 2, 5, "td", 31), _()), 2 & e) {
                const t = n.$implicit, i = v(2);
                f(2), A(t.assembly), f(2), m("href", t.reportPath + i.queryString, Kn), f(), A(t.class), f(), m("title", t.methodName), f(), m("href", t.reportPath + i.queryString + "#file" + t.fileIndex + "_line" + t.line, Kn), f(), K(" ", t.methodShortName, " "), f(), m("ngForOf", t.metrics)
            }
        }

        function G3(e, n) {
            if (1 & e) {
                const t = Ie();
                y(0, "div")(1, "div", 1)(2, "div")(3, "select", 2), st("ngModelChange", function (r) {
                    G(t);
                    const o = v();
                    return Ne(o.settings.assembly, r) || (o.settings.assembly = r), q(r)
                }), W("ngModelChange", function () {
                    return G(t), q(v().updateRiskHotpots())
                }), y(4, "option", 3), b(5), _(), H(6, L3, 2, 2, "option", 4), _()(), y(7, "div", 5), H(8, P3, 2, 1, "span", 0)(9, B3, 7, 5, "select", 6), _(), N(10, "div", 5), y(11, "div", 7)(12, "span"), b(13), _(), y(14, "input", 8), st("ngModelChange", function (r) {
                    G(t);
                    const o = v();
                    return Ne(o.settings.filter, r) || (o.settings.filter = r), q(r)
                }), W("ngModelChange", function () {
                    return G(t), q(v().updateRiskHotpots())
                }), _()()(), y(15, "div", 9)(16, "table", 10)(17, "colgroup"), N(18, "col", 11)(19, "col", 11)(20, "col", 11), H(21, j3, 1, 0, "col", 12), _(), y(22, "thead")(23, "tr")(24, "th")(25, "a", 13), W("click", function (r) {
                    return G(t), q(v().updateSorting("assembly", r))
                }), N(26, "i", 14), b(27), _()(), y(28, "th")(29, "a", 13), W("click", function (r) {
                    return G(t), q(v().updateSorting("class", r))
                }), N(30, "i", 14), b(31), _()(), y(32, "th")(33, "a", 13), W("click", function (r) {
                    return G(t), q(v().updateSorting("method", r))
                }), N(34, "i", 14), b(35), _()(), H(36, U3, 6, 7, "th", 15), _()(), y(37, "tbody"), H(38, z3, 10, 7, "tr", 15), function Kw(e, n) {
                    const t = J();
                    let i;
                    const r = e + P;
                    t.firstCreatePass ? (i = function jL(e, n) {
                        if (n) for (let t = n.length - 1; t >= 0; t--) {
                            const i = n[t];
                            if (e === i.name) return i
                        }
                    }(n, t.pipeRegistry), t.data[r] = i, i.onDestroy && (t.destroyHooks ??= []).push(r, i.onDestroy)) : i = t.data[r];
                    const o = i.factory || (i.factory = mi(i.type)), a = _t(M);
                    try {
                        const l = Ma(!1), c = o();
                        return Ma(l), function Wf(e, n, t, i) {
                            t >= e.data.length && (e.data[t] = null, e.blueprint[t] = null), n[t] = i
                        }(t, E(), r, c), c
                    } finally {
                        _t(a)
                    }
                }(39, "slice"), _()()()()
            }
            if (2 & e) {
                const t = v();
                f(3), tt("ngModel", t.settings.assembly), f(2), A(t.translations.assembly), f(), m("ngForOf", t.assemblies), f(2), m("ngIf", t.totalNumberOfRiskHotspots > 10), f(), m("ngIf", t.totalNumberOfRiskHotspots > 10), f(4), K("", t.translations.filter, " "), f(), tt("ngModel", t.settings.filter), f(7), m("ngForOf", t.riskHotspotMetrics), f(5), m("ngClass", Ye(20, Ic, "assembly" === t.settings.sortBy && "asc" === t.settings.sortOrder, "assembly" === t.settings.sortBy && "desc" === t.settings.sortOrder, "assembly" !== t.settings.sortBy)), f(), A(t.translations.assembly), f(3), m("ngClass", Ye(24, Ic, "class" === t.settings.sortBy && "asc" === t.settings.sortOrder, "class" === t.settings.sortBy && "desc" === t.settings.sortOrder, "class" !== t.settings.sortBy)), f(), A(t.translations.class), f(3), m("ngClass", Ye(28, Ic, "method" === t.settings.sortBy && "asc" === t.settings.sortOrder, "method" === t.settings.sortBy && "desc" === t.settings.sortOrder, "method" !== t.settings.sortBy)), f(), A(t.translations.method), f(), m("ngForOf", t.riskHotspotMetrics), f(2), m("ngForOf", Xw(39, 16, t.riskHotspots, 0, t.settings.numberOfRiskHotspots))
            }
        }

        let q3 = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)(M(Ip))
                };
                static#t = this.\u0275cmp = Yt({
                    type: e,
                    selectors: [["risk-hotspots"]],
                    hostBindings: function (i, r) {
                        1 & i && W("beforeunload", function () {
                            return r.onDonBeforeUnlodad()
                        }, 0, Za)
                    },
                    decls: 1,
                    vars: 1,
                    consts: [[4, "ngIf"], [1, "customizebox"], ["name", "assembly", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "col-center"], [3, "ngModel", "ngModelChange", 4, "ngIf"], [1, "col-right"], ["type", "text", 3, "ngModelChange", "ngModel"], [1, "table-responsive"], [1, "overview", "table-fixed", "stripped"], [1, "column-min-200"], ["class", "column105", 4, "ngFor", "ngForOf"], ["href", "#", 3, "click"], [3, "ngClass"], [4, "ngFor", "ngForOf"], [3, "value"], [3, "ngModelChange", "ngModel"], ["value", "10"], ["value", "20", 4, "ngIf"], ["value", "50", 4, "ngIf"], ["value", "100", 4, "ngIf"], [3, "value", 4, "ngIf"], ["value", "20"], ["value", "50"], ["value", "100"], [1, "column105"], ["target", "_blank", 3, "href"], [1, "icon-info-circled"], [3, "href"], [3, "title"], ["class", "right", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "right", 3, "ngClass"]],
                    template: function (i, r) {
                        1 & i && H(0, G3, 40, 32, "div", 0), 2 & i && m("ngIf", r.totalNumberOfRiskHotspots > 0)
                    },
                    dependencies: [Xr, Ui, jn, _p, Cp, Ns, ks, fc, Ps, xD],
                    encapsulation: 2
                })

                constructor(t) {
                    this.queryString = "", this.riskHotspotMetrics = [], this.riskHotspots = [], this.totalNumberOfRiskHotspots = 0, this.assemblies = [], this.translations = {}, this.settings = new x3, this.window = t.nativeWindow
                }

                ngOnInit() {
                    this.riskHotspotMetrics = this.window.riskHotspotMetrics, this.translations = this.window.translations, void 0 !== this.window.history && void 0 !== this.window.history.replaceState && null !== this.window.history.state && null != this.window.history.state.riskHotspotsSettings && (console.log("Risk hotspots: Restoring from history", this.window.history.state.riskHotspotsSettings), this.settings = JSON.parse(JSON.stringify(this.window.history.state.riskHotspotsSettings)));
                    const t = window.location.href.indexOf("?");
                    t > -1 && (this.queryString = window.location.href.substring(t)), this.updateRiskHotpots()
                }

                onDonBeforeUnlodad() {
                    if (void 0 !== this.window.history && void 0 !== this.window.history.replaceState) {
                        console.log("Risk hotspots: Updating history", this.settings);
                        let t = new BI;
                        null !== window.history.state && (t = JSON.parse(JSON.stringify(this.window.history.state))), t.riskHotspotsSettings = JSON.parse(JSON.stringify(this.settings)), window.history.replaceState(t, "")
                    }
                }

                updateRiskHotpots() {
                    const t = this.window.riskHotspots;
                    if (this.totalNumberOfRiskHotspots = t.length, 0 === this.assemblies.length) {
                        let s = [];
                        for (let a = 0; a < t.length; a++) -1 === s.indexOf(t[a].assembly) && s.push(t[a].assembly);
                        this.assemblies = s.sort()
                    }
                    let i = [];
                    for (let s = 0; s < t.length; s++) "" !== this.settings.filter && -1 === t[s].class.toLowerCase().indexOf(this.settings.filter.toLowerCase()) || "" !== this.settings.assembly && t[s].assembly !== this.settings.assembly || i.push(t[s]);
                    let r = "asc" === this.settings.sortOrder ? -1 : 1, o = "asc" === this.settings.sortOrder ? 1 : -1;
                    if ("assembly" === this.settings.sortBy) i.sort(function (s, a) {
                        return s.assembly === a.assembly ? 0 : s.assembly < a.assembly ? r : o
                    }); else if ("class" === this.settings.sortBy) i.sort(function (s, a) {
                        return s.class === a.class ? 0 : s.class < a.class ? r : o
                    }); else if ("method" === this.settings.sortBy) i.sort(function (s, a) {
                        return s.methodShortName === a.methodShortName ? 0 : s.methodShortName < a.methodShortName ? r : o
                    }); else if ("" !== this.settings.sortBy) {
                        let s = parseInt(this.settings.sortBy, 10);
                        i.sort(function (a, l) {
                            return a.metrics[s].value === l.metrics[s].value ? 0 : a.metrics[s].value < l.metrics[s].value ? r : o
                        })
                    }
                    this.riskHotspots = i
                }

                updateSorting(t, i) {
                    i.preventDefault(), this.settings.sortOrder = t === this.settings.sortBy && "asc" === this.settings.sortOrder ? "desc" : "asc", this.settings.sortBy = t, console.log(`Updating sort column: '${this.settings.sortBy}' (${this.settings.sortOrder})`), this.updateRiskHotpots()
                }
            }

            return e
        })(), W3 = (() => {
            class e {
                static#e = this.\u0275fac = function (i) {
                    return new (i || e)
                };
                static#t = this.\u0275mod = Wn({type: e, bootstrap: [q3, A3]});
                static#n = this.\u0275inj = Tn({providers: [Ip], imports: [CV, gB, rj]})
            }

            return e
        })();
        _V().bootstrapModule(W3).catch(e => console.error(e))
    }
}, so => {
    so(so.s = 736)
}]);