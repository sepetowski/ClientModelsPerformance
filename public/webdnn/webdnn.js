var WebDNN
;(() => {
  var __webpack_modules__ = {
      4537: (e) => {
        'use strict'
        e.exports = function (e, t) {
          for (
            var n = new Array(arguments.length - 1), r = 0, o = 2, i = !0;
            o < arguments.length;

          )
            n[r++] = arguments[o++]
          return new Promise(function (o, s) {
            n[r] = function (e) {
              if (i)
                if (((i = !1), e)) s(e)
                else {
                  for (var t = new Array(arguments.length - 1), n = 0; n < t.length; )
                    t[n++] = arguments[n]
                  o.apply(null, t)
                }
            }
            try {
              e.apply(t || null, n)
            } catch (e) {
              i && ((i = !1), s(e))
            }
          })
        }
      },
      7419: (e, t) => {
        'use strict'
        var n = t
        n.length = function (e) {
          var t = e.length
          if (!t) return 0
          for (var n = 0; --t % 4 > 1 && '=' === e.charAt(t); ) ++n
          return Math.ceil(3 * e.length) / 4 - n
        }
        for (var r = new Array(64), o = new Array(123), i = 0; i < 64; )
          o[(r[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : (i - 59) | 43)] = i++
        n.encode = function (e, t, n) {
          for (var o, i = null, s = [], a = 0, A = 0; t < n; ) {
            var u = e[t++]
            switch (A) {
              case 0:
                ;((s[a++] = r[u >> 2]), (o = (3 & u) << 4), (A = 1))
                break
              case 1:
                ;((s[a++] = r[o | (u >> 4)]), (o = (15 & u) << 2), (A = 2))
                break
              case 2:
                ;((s[a++] = r[o | (u >> 6)]), (s[a++] = r[63 & u]), (A = 0))
            }
            a > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, s)), (a = 0))
          }
          return (
            A && ((s[a++] = r[o]), (s[a++] = 61), 1 === A && (s[a++] = 61)),
            i
              ? (a && i.push(String.fromCharCode.apply(String, s.slice(0, a))), i.join(''))
              : String.fromCharCode.apply(String, s.slice(0, a))
          )
        }
        var s = 'invalid encoding'
        ;((n.decode = function (e, t, n) {
          for (var r, i = n, a = 0, A = 0; A < e.length; ) {
            var u = e.charCodeAt(A++)
            if (61 === u && a > 1) break
            if (void 0 === (u = o[u])) throw Error(s)
            switch (a) {
              case 0:
                ;((r = u), (a = 1))
                break
              case 1:
                ;((t[n++] = (r << 2) | ((48 & u) >> 4)), (r = u), (a = 2))
                break
              case 2:
                ;((t[n++] = ((15 & r) << 4) | ((60 & u) >> 2)), (r = u), (a = 3))
                break
              case 3:
                ;((t[n++] = ((3 & r) << 6) | u), (a = 0))
            }
          }
          if (1 === a) throw Error(s)
          return n - i
        }),
          (n.test = function (e) {
            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)
          }))
      },
      9211: (e) => {
        'use strict'
        function t() {
          this._listeners = {}
        }
        ;((e.exports = t),
          (t.prototype.on = function (e, t, n) {
            return (
              (this._listeners[e] || (this._listeners[e] = [])).push({ fn: t, ctx: n || this }),
              this
            )
          }),
          (t.prototype.off = function (e, t) {
            if (void 0 === e) this._listeners = {}
            else if (void 0 === t) this._listeners[e] = []
            else
              for (var n = this._listeners[e], r = 0; r < n.length; )
                n[r].fn === t ? n.splice(r, 1) : ++r
            return this
          }),
          (t.prototype.emit = function (e) {
            var t = this._listeners[e]
            if (t) {
              for (var n = [], r = 1; r < arguments.length; ) n.push(arguments[r++])
              for (r = 0; r < t.length; ) t[r].fn.apply(t[r++].ctx, n)
            }
            return this
          }))
      },
      945: (e) => {
        'use strict'
        function t(e) {
          return (
            'undefined' != typeof Float32Array
              ? (function () {
                  var t = new Float32Array([-0]),
                    n = new Uint8Array(t.buffer),
                    r = 128 === n[3]
                  function o(e, r, o) {
                    ;((t[0] = e),
                      (r[o] = n[0]),
                      (r[o + 1] = n[1]),
                      (r[o + 2] = n[2]),
                      (r[o + 3] = n[3]))
                  }
                  function i(e, r, o) {
                    ;((t[0] = e),
                      (r[o] = n[3]),
                      (r[o + 1] = n[2]),
                      (r[o + 2] = n[1]),
                      (r[o + 3] = n[0]))
                  }
                  function s(e, r) {
                    return (
                      (n[0] = e[r]),
                      (n[1] = e[r + 1]),
                      (n[2] = e[r + 2]),
                      (n[3] = e[r + 3]),
                      t[0]
                    )
                  }
                  function a(e, r) {
                    return (
                      (n[3] = e[r]),
                      (n[2] = e[r + 1]),
                      (n[1] = e[r + 2]),
                      (n[0] = e[r + 3]),
                      t[0]
                    )
                  }
                  ;((e.writeFloatLE = r ? o : i),
                    (e.writeFloatBE = r ? i : o),
                    (e.readFloatLE = r ? s : a),
                    (e.readFloatBE = r ? a : s))
                })()
              : (function () {
                  function t(e, t, n, r) {
                    var o = t < 0 ? 1 : 0
                    if ((o && (t = -t), 0 === t)) e(1 / t > 0 ? 0 : 2147483648, n, r)
                    else if (isNaN(t)) e(2143289344, n, r)
                    else if (t > 34028234663852886e22) e(((o << 31) | 2139095040) >>> 0, n, r)
                    else if (t < 11754943508222875e-54)
                      e(((o << 31) | Math.round(t / 1401298464324817e-60)) >>> 0, n, r)
                    else {
                      var i = Math.floor(Math.log(t) / Math.LN2)
                      e(
                        ((o << 31) |
                          ((i + 127) << 23) |
                          (8388607 & Math.round(t * Math.pow(2, -i) * 8388608))) >>>
                          0,
                        n,
                        r
                      )
                    }
                  }
                  function s(e, t, n) {
                    var r = e(t, n),
                      o = 2 * (r >> 31) + 1,
                      i = (r >>> 23) & 255,
                      s = 8388607 & r
                    return 255 === i
                      ? s
                        ? NaN
                        : o * (1 / 0)
                      : 0 === i
                        ? 1401298464324817e-60 * o * s
                        : o * Math.pow(2, i - 150) * (s + 8388608)
                  }
                  ;((e.writeFloatLE = t.bind(null, n)),
                    (e.writeFloatBE = t.bind(null, r)),
                    (e.readFloatLE = s.bind(null, o)),
                    (e.readFloatBE = s.bind(null, i)))
                })(),
            'undefined' != typeof Float64Array
              ? (function () {
                  var t = new Float64Array([-0]),
                    n = new Uint8Array(t.buffer),
                    r = 128 === n[7]
                  function o(e, r, o) {
                    ;((t[0] = e),
                      (r[o] = n[0]),
                      (r[o + 1] = n[1]),
                      (r[o + 2] = n[2]),
                      (r[o + 3] = n[3]),
                      (r[o + 4] = n[4]),
                      (r[o + 5] = n[5]),
                      (r[o + 6] = n[6]),
                      (r[o + 7] = n[7]))
                  }
                  function i(e, r, o) {
                    ;((t[0] = e),
                      (r[o] = n[7]),
                      (r[o + 1] = n[6]),
                      (r[o + 2] = n[5]),
                      (r[o + 3] = n[4]),
                      (r[o + 4] = n[3]),
                      (r[o + 5] = n[2]),
                      (r[o + 6] = n[1]),
                      (r[o + 7] = n[0]))
                  }
                  function s(e, r) {
                    return (
                      (n[0] = e[r]),
                      (n[1] = e[r + 1]),
                      (n[2] = e[r + 2]),
                      (n[3] = e[r + 3]),
                      (n[4] = e[r + 4]),
                      (n[5] = e[r + 5]),
                      (n[6] = e[r + 6]),
                      (n[7] = e[r + 7]),
                      t[0]
                    )
                  }
                  function a(e, r) {
                    return (
                      (n[7] = e[r]),
                      (n[6] = e[r + 1]),
                      (n[5] = e[r + 2]),
                      (n[4] = e[r + 3]),
                      (n[3] = e[r + 4]),
                      (n[2] = e[r + 5]),
                      (n[1] = e[r + 6]),
                      (n[0] = e[r + 7]),
                      t[0]
                    )
                  }
                  ;((e.writeDoubleLE = r ? o : i),
                    (e.writeDoubleBE = r ? i : o),
                    (e.readDoubleLE = r ? s : a),
                    (e.readDoubleBE = r ? a : s))
                })()
              : (function () {
                  function t(e, t, n, r, o, i) {
                    var s = r < 0 ? 1 : 0
                    if ((s && (r = -r), 0 === r))
                      (e(0, o, i + t), e(1 / r > 0 ? 0 : 2147483648, o, i + n))
                    else if (isNaN(r)) (e(0, o, i + t), e(2146959360, o, i + n))
                    else if (r > 17976931348623157e292)
                      (e(0, o, i + t), e(((s << 31) | 2146435072) >>> 0, o, i + n))
                    else {
                      var a
                      if (r < 22250738585072014e-324)
                        (e((a = r / 5e-324) >>> 0, o, i + t),
                          e(((s << 31) | (a / 4294967296)) >>> 0, o, i + n))
                      else {
                        var A = Math.floor(Math.log(r) / Math.LN2)
                        ;(1024 === A && (A = 1023),
                          e((4503599627370496 * (a = r * Math.pow(2, -A))) >>> 0, o, i + t),
                          e(
                            ((s << 31) | ((A + 1023) << 20) | ((1048576 * a) & 1048575)) >>> 0,
                            o,
                            i + n
                          ))
                      }
                    }
                  }
                  function s(e, t, n, r, o) {
                    var i = e(r, o + t),
                      s = e(r, o + n),
                      a = 2 * (s >> 31) + 1,
                      A = (s >>> 20) & 2047,
                      u = 4294967296 * (1048575 & s) + i
                    return 2047 === A
                      ? u
                        ? NaN
                        : a * (1 / 0)
                      : 0 === A
                        ? 5e-324 * a * u
                        : a * Math.pow(2, A - 1075) * (u + 4503599627370496)
                  }
                  ;((e.writeDoubleLE = t.bind(null, n, 0, 4)),
                    (e.writeDoubleBE = t.bind(null, r, 4, 0)),
                    (e.readDoubleLE = s.bind(null, o, 0, 4)),
                    (e.readDoubleBE = s.bind(null, i, 4, 0)))
                })(),
            e
          )
        }
        function n(e, t, n) {
          ;((t[n] = 255 & e),
            (t[n + 1] = (e >>> 8) & 255),
            (t[n + 2] = (e >>> 16) & 255),
            (t[n + 3] = e >>> 24))
        }
        function r(e, t, n) {
          ;((t[n] = e >>> 24),
            (t[n + 1] = (e >>> 16) & 255),
            (t[n + 2] = (e >>> 8) & 255),
            (t[n + 3] = 255 & e))
        }
        function o(e, t) {
          return (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0
        }
        function i(e, t) {
          return ((e[t] << 24) | (e[t + 1] << 16) | (e[t + 2] << 8) | e[t + 3]) >>> 0
        }
        e.exports = t(t)
      },
      7199: (module) => {
        'use strict'
        function inquire(moduleName) {
          try {
            var mod = eval('quire'.replace(/^/, 're'))(moduleName)
            if (mod && (mod.length || Object.keys(mod).length)) return mod
          } catch (e) {}
          return null
        }
        module.exports = inquire
      },
      6662: (e) => {
        'use strict'
        e.exports = function (e, t, n) {
          var r = n || 8192,
            o = r >>> 1,
            i = null,
            s = r
          return function (n) {
            if (n < 1 || n > o) return e(n)
            s + n > r && ((i = e(r)), (s = 0))
            var a = t.call(i, s, (s += n))
            return (7 & s && (s = 1 + (7 | s)), a)
          }
        }
      },
      4997: (e, t) => {
        'use strict'
        var n = t
        ;((n.length = function (e) {
          for (var t = 0, n = 0, r = 0; r < e.length; ++r)
            (n = e.charCodeAt(r)) < 128
              ? (t += 1)
              : n < 2048
                ? (t += 2)
                : 55296 == (64512 & n) && 56320 == (64512 & e.charCodeAt(r + 1))
                  ? (++r, (t += 4))
                  : (t += 3)
          return t
        }),
          (n.read = function (e, t, n) {
            if (n - t < 1) return ''
            for (var r, o = null, i = [], s = 0; t < n; )
              ((r = e[t++]) < 128
                ? (i[s++] = r)
                : r > 191 && r < 224
                  ? (i[s++] = ((31 & r) << 6) | (63 & e[t++]))
                  : r > 239 && r < 365
                    ? ((r =
                        (((7 & r) << 18) |
                          ((63 & e[t++]) << 12) |
                          ((63 & e[t++]) << 6) |
                          (63 & e[t++])) -
                        65536),
                      (i[s++] = 55296 + (r >> 10)),
                      (i[s++] = 56320 + (1023 & r)))
                    : (i[s++] = ((15 & r) << 12) | ((63 & e[t++]) << 6) | (63 & e[t++])),
                s > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, i)), (s = 0)))
            return o
              ? (s && o.push(String.fromCharCode.apply(String, i.slice(0, s))), o.join(''))
              : String.fromCharCode.apply(String, i.slice(0, s))
          }),
          (n.write = function (e, t, n) {
            for (var r, o, i = n, s = 0; s < e.length; ++s)
              (r = e.charCodeAt(s)) < 128
                ? (t[n++] = r)
                : r < 2048
                  ? ((t[n++] = (r >> 6) | 192), (t[n++] = (63 & r) | 128))
                  : 55296 == (64512 & r) && 56320 == (64512 & (o = e.charCodeAt(s + 1)))
                    ? ((r = 65536 + ((1023 & r) << 10) + (1023 & o)),
                      ++s,
                      (t[n++] = (r >> 18) | 240),
                      (t[n++] = ((r >> 12) & 63) | 128),
                      (t[n++] = ((r >> 6) & 63) | 128),
                      (t[n++] = (63 & r) | 128))
                    : ((t[n++] = (r >> 12) | 224),
                      (t[n++] = ((r >> 6) & 63) | 128),
                      (t[n++] = (63 & r) | 128))
            return n - i
          }))
      },
      3720: (e) => {
        e.exports = n
        var t = null
        try {
          t = new WebAssembly.Instance(
            new WebAssembly.Module(
              new Uint8Array([
                0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1,
                127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117,
                108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114,
                101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104,
                105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32,
                1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66,
                32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32,
                134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167,
                36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32,
                2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4,
                167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3,
                173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1,
                1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32,
                134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11,
              ])
            ),
            {}
          ).exports
        } catch (e) {}
        function n(e, t, n) {
          ;((this.low = 0 | e), (this.high = 0 | t), (this.unsigned = !!n))
        }
        function r(e) {
          return !0 === (e && e.__isLong__)
        }
        ;(n.prototype.__isLong__,
          Object.defineProperty(n.prototype, '__isLong__', { value: !0 }),
          (n.isLong = r))
        var o = {},
          i = {}
        function s(e, t) {
          var n, r, s
          return t
            ? (s = 0 <= (e >>>= 0) && e < 256) && (r = i[e])
              ? r
              : ((n = A(e, (0 | e) < 0 ? -1 : 0, !0)), s && (i[e] = n), n)
            : (s = -128 <= (e |= 0) && e < 128) && (r = o[e])
              ? r
              : ((n = A(e, e < 0 ? -1 : 0, !1)), s && (o[e] = n), n)
        }
        function a(e, t) {
          if (isNaN(e)) return t ? I : f
          if (t) {
            if (e < 0) return I
            if (e >= d) return B
          } else {
            if (e <= -p) return _
            if (e + 1 >= p) return C
          }
          return e < 0 ? a(-e, t).neg() : A(e % c | 0, (e / c) | 0, t)
        }
        function A(e, t, r) {
          return new n(e, t, r)
        }
        ;((n.fromInt = s), (n.fromNumber = a), (n.fromBits = A))
        var u = Math.pow
        function l(e, t, n) {
          if (0 === e.length) throw Error('empty string')
          if ('NaN' === e || 'Infinity' === e || '+Infinity' === e || '-Infinity' === e) return f
          if (('number' == typeof t ? ((n = t), (t = !1)) : (t = !!t), (n = n || 10) < 2 || 36 < n))
            throw RangeError('radix')
          var r
          if ((r = e.indexOf('-')) > 0) throw Error('interior hyphen')
          if (0 === r) return l(e.substring(1), t, n).neg()
          for (var o = a(u(n, 8)), i = f, s = 0; s < e.length; s += 8) {
            var A = Math.min(8, e.length - s),
              g = parseInt(e.substring(s, s + A), n)
            if (A < 8) {
              var c = a(u(n, A))
              i = i.mul(c).add(a(g))
            } else i = (i = i.mul(o)).add(a(g))
          }
          return ((i.unsigned = t), i)
        }
        function g(e, t) {
          return 'number' == typeof e
            ? a(e, t)
            : 'string' == typeof e
              ? l(e, t)
              : A(e.low, e.high, 'boolean' == typeof t ? t : e.unsigned)
        }
        ;((n.fromString = l), (n.fromValue = g))
        var c = 4294967296,
          d = c * c,
          p = d / 2,
          h = s(1 << 24),
          f = s(0)
        n.ZERO = f
        var I = s(0, !0)
        n.UZERO = I
        var m = s(1)
        n.ONE = m
        var E = s(1, !0)
        n.UONE = E
        var y = s(-1)
        n.NEG_ONE = y
        var C = A(-1, 2147483647, !1)
        n.MAX_VALUE = C
        var B = A(-1, -1, !0)
        n.MAX_UNSIGNED_VALUE = B
        var _ = A(0, -2147483648, !1)
        n.MIN_VALUE = _
        var w = n.prototype
        ;((w.toInt = function () {
          return this.unsigned ? this.low >>> 0 : this.low
        }),
          (w.toNumber = function () {
            return this.unsigned
              ? (this.high >>> 0) * c + (this.low >>> 0)
              : this.high * c + (this.low >>> 0)
          }),
          (w.toString = function (e) {
            if ((e = e || 10) < 2 || 36 < e) throw RangeError('radix')
            if (this.isZero()) return '0'
            if (this.isNegative()) {
              if (this.eq(_)) {
                var t = a(e),
                  n = this.div(t),
                  r = n.mul(t).sub(this)
                return n.toString(e) + r.toInt().toString(e)
              }
              return '-' + this.neg().toString(e)
            }
            for (var o = a(u(e, 6), this.unsigned), i = this, s = ''; ; ) {
              var A = i.div(o),
                l = (i.sub(A.mul(o)).toInt() >>> 0).toString(e)
              if ((i = A).isZero()) return l + s
              for (; l.length < 6; ) l = '0' + l
              s = '' + l + s
            }
          }),
          (w.getHighBits = function () {
            return this.high
          }),
          (w.getHighBitsUnsigned = function () {
            return this.high >>> 0
          }),
          (w.getLowBits = function () {
            return this.low
          }),
          (w.getLowBitsUnsigned = function () {
            return this.low >>> 0
          }),
          (w.getNumBitsAbs = function () {
            if (this.isNegative()) return this.eq(_) ? 64 : this.neg().getNumBitsAbs()
            for (
              var e = 0 != this.high ? this.high : this.low, t = 31;
              t > 0 && !(e & (1 << t));
              t--
            );
            return 0 != this.high ? t + 33 : t + 1
          }),
          (w.isZero = function () {
            return 0 === this.high && 0 === this.low
          }),
          (w.eqz = w.isZero),
          (w.isNegative = function () {
            return !this.unsigned && this.high < 0
          }),
          (w.isPositive = function () {
            return this.unsigned || this.high >= 0
          }),
          (w.isOdd = function () {
            return !(1 & ~this.low)
          }),
          (w.isEven = function () {
            return !(1 & this.low)
          }),
          (w.equals = function (e) {
            return (
              r(e) || (e = g(e)),
              (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) &&
                this.high === e.high &&
                this.low === e.low
            )
          }),
          (w.eq = w.equals),
          (w.notEquals = function (e) {
            return !this.eq(e)
          }),
          (w.neq = w.notEquals),
          (w.ne = w.notEquals),
          (w.lessThan = function (e) {
            return this.comp(e) < 0
          }),
          (w.lt = w.lessThan),
          (w.lessThanOrEqual = function (e) {
            return this.comp(e) <= 0
          }),
          (w.lte = w.lessThanOrEqual),
          (w.le = w.lessThanOrEqual),
          (w.greaterThan = function (e) {
            return this.comp(e) > 0
          }),
          (w.gt = w.greaterThan),
          (w.greaterThanOrEqual = function (e) {
            return this.comp(e) >= 0
          }),
          (w.gte = w.greaterThanOrEqual),
          (w.ge = w.greaterThanOrEqual),
          (w.compare = function (e) {
            if ((r(e) || (e = g(e)), this.eq(e))) return 0
            var t = this.isNegative(),
              n = e.isNegative()
            return t && !n
              ? -1
              : !t && n
                ? 1
                : this.unsigned
                  ? e.high >>> 0 > this.high >>> 0 ||
                    (e.high === this.high && e.low >>> 0 > this.low >>> 0)
                    ? -1
                    : 1
                  : this.sub(e).isNegative()
                    ? -1
                    : 1
          }),
          (w.comp = w.compare),
          (w.negate = function () {
            return !this.unsigned && this.eq(_) ? _ : this.not().add(m)
          }),
          (w.neg = w.negate),
          (w.add = function (e) {
            r(e) || (e = g(e))
            var t = this.high >>> 16,
              n = 65535 & this.high,
              o = this.low >>> 16,
              i = 65535 & this.low,
              s = e.high >>> 16,
              a = 65535 & e.high,
              u = e.low >>> 16,
              l = 0,
              c = 0,
              d = 0,
              p = 0
            return (
              (d += (p += i + (65535 & e.low)) >>> 16),
              (c += (d += o + u) >>> 16),
              (l += (c += n + a) >>> 16),
              (l += t + s),
              A(
                ((d &= 65535) << 16) | (p &= 65535),
                ((l &= 65535) << 16) | (c &= 65535),
                this.unsigned
              )
            )
          }),
          (w.subtract = function (e) {
            return (r(e) || (e = g(e)), this.add(e.neg()))
          }),
          (w.sub = w.subtract),
          (w.multiply = function (e) {
            if (this.isZero()) return f
            if ((r(e) || (e = g(e)), t))
              return A(t.mul(this.low, this.high, e.low, e.high), t.get_high(), this.unsigned)
            if (e.isZero()) return f
            if (this.eq(_)) return e.isOdd() ? _ : f
            if (e.eq(_)) return this.isOdd() ? _ : f
            if (this.isNegative())
              return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg()
            if (e.isNegative()) return this.mul(e.neg()).neg()
            if (this.lt(h) && e.lt(h)) return a(this.toNumber() * e.toNumber(), this.unsigned)
            var n = this.high >>> 16,
              o = 65535 & this.high,
              i = this.low >>> 16,
              s = 65535 & this.low,
              u = e.high >>> 16,
              l = 65535 & e.high,
              c = e.low >>> 16,
              d = 65535 & e.low,
              p = 0,
              I = 0,
              m = 0,
              E = 0
            return (
              (m += (E += s * d) >>> 16),
              (I += (m += i * d) >>> 16),
              (m &= 65535),
              (I += (m += s * c) >>> 16),
              (p += (I += o * d) >>> 16),
              (I &= 65535),
              (p += (I += i * c) >>> 16),
              (I &= 65535),
              (p += (I += s * l) >>> 16),
              (p += n * d + o * c + i * l + s * u),
              A(
                ((m &= 65535) << 16) | (E &= 65535),
                ((p &= 65535) << 16) | (I &= 65535),
                this.unsigned
              )
            )
          }),
          (w.mul = w.multiply),
          (w.divide = function (e) {
            if ((r(e) || (e = g(e)), e.isZero())) throw Error('division by zero')
            var n, o, i
            if (t)
              return this.unsigned || -2147483648 !== this.high || -1 !== e.low || -1 !== e.high
                ? A(
                    (this.unsigned ? t.div_u : t.div_s)(this.low, this.high, e.low, e.high),
                    t.get_high(),
                    this.unsigned
                  )
                : this
            if (this.isZero()) return this.unsigned ? I : f
            if (this.unsigned) {
              if ((e.unsigned || (e = e.toUnsigned()), e.gt(this))) return I
              if (e.gt(this.shru(1))) return E
              i = I
            } else {
              if (this.eq(_))
                return e.eq(m) || e.eq(y)
                  ? _
                  : e.eq(_)
                    ? m
                    : (n = this.shr(1).div(e).shl(1)).eq(f)
                      ? e.isNegative()
                        ? m
                        : y
                      : ((o = this.sub(e.mul(n))), (i = n.add(o.div(e))))
              if (e.eq(_)) return this.unsigned ? I : f
              if (this.isNegative())
                return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg()
              if (e.isNegative()) return this.div(e.neg()).neg()
              i = f
            }
            for (o = this; o.gte(e); ) {
              n = Math.max(1, Math.floor(o.toNumber() / e.toNumber()))
              for (
                var s = Math.ceil(Math.log(n) / Math.LN2),
                  l = s <= 48 ? 1 : u(2, s - 48),
                  c = a(n),
                  d = c.mul(e);
                d.isNegative() || d.gt(o);

              )
                d = (c = a((n -= l), this.unsigned)).mul(e)
              ;(c.isZero() && (c = m), (i = i.add(c)), (o = o.sub(d)))
            }
            return i
          }),
          (w.div = w.divide),
          (w.modulo = function (e) {
            return (
              r(e) || (e = g(e)),
              t
                ? A(
                    (this.unsigned ? t.rem_u : t.rem_s)(this.low, this.high, e.low, e.high),
                    t.get_high(),
                    this.unsigned
                  )
                : this.sub(this.div(e).mul(e))
            )
          }),
          (w.mod = w.modulo),
          (w.rem = w.modulo),
          (w.not = function () {
            return A(~this.low, ~this.high, this.unsigned)
          }),
          (w.and = function (e) {
            return (r(e) || (e = g(e)), A(this.low & e.low, this.high & e.high, this.unsigned))
          }),
          (w.or = function (e) {
            return (r(e) || (e = g(e)), A(this.low | e.low, this.high | e.high, this.unsigned))
          }),
          (w.xor = function (e) {
            return (r(e) || (e = g(e)), A(this.low ^ e.low, this.high ^ e.high, this.unsigned))
          }),
          (w.shiftLeft = function (e) {
            return (
              r(e) && (e = e.toInt()),
              0 == (e &= 63)
                ? this
                : e < 32
                  ? A(this.low << e, (this.high << e) | (this.low >>> (32 - e)), this.unsigned)
                  : A(0, this.low << (e - 32), this.unsigned)
            )
          }),
          (w.shl = w.shiftLeft),
          (w.shiftRight = function (e) {
            return (
              r(e) && (e = e.toInt()),
              0 == (e &= 63)
                ? this
                : e < 32
                  ? A((this.low >>> e) | (this.high << (32 - e)), this.high >> e, this.unsigned)
                  : A(this.high >> (e - 32), this.high >= 0 ? 0 : -1, this.unsigned)
            )
          }),
          (w.shr = w.shiftRight),
          (w.shiftRightUnsigned = function (e) {
            if ((r(e) && (e = e.toInt()), 0 == (e &= 63))) return this
            var t = this.high
            return e < 32
              ? A((this.low >>> e) | (t << (32 - e)), t >>> e, this.unsigned)
              : A(32 === e ? t : t >>> (e - 32), 0, this.unsigned)
          }),
          (w.shru = w.shiftRightUnsigned),
          (w.shr_u = w.shiftRightUnsigned),
          (w.toSigned = function () {
            return this.unsigned ? A(this.low, this.high, !1) : this
          }),
          (w.toUnsigned = function () {
            return this.unsigned ? this : A(this.low, this.high, !0)
          }),
          (w.toBytes = function (e) {
            return e ? this.toBytesLE() : this.toBytesBE()
          }),
          (w.toBytesLE = function () {
            var e = this.high,
              t = this.low
            return [
              255 & t,
              (t >>> 8) & 255,
              (t >>> 16) & 255,
              t >>> 24,
              255 & e,
              (e >>> 8) & 255,
              (e >>> 16) & 255,
              e >>> 24,
            ]
          }),
          (w.toBytesBE = function () {
            var e = this.high,
              t = this.low
            return [
              e >>> 24,
              (e >>> 16) & 255,
              (e >>> 8) & 255,
              255 & e,
              t >>> 24,
              (t >>> 16) & 255,
              (t >>> 8) & 255,
              255 & t,
            ]
          }),
          (n.fromBytes = function (e, t, r) {
            return r ? n.fromBytesLE(e, t) : n.fromBytesBE(e, t)
          }),
          (n.fromBytesLE = function (e, t) {
            return new n(
              e[0] | (e[1] << 8) | (e[2] << 16) | (e[3] << 24),
              e[4] | (e[5] << 8) | (e[6] << 16) | (e[7] << 24),
              t
            )
          }),
          (n.fromBytesBE = function (e, t) {
            return new n(
              (e[4] << 24) | (e[5] << 16) | (e[6] << 8) | e[7],
              (e[0] << 24) | (e[1] << 16) | (e[2] << 8) | e[3],
              t
            )
          }))
      },
      1446: (e, t, n) => {
        'use strict'
        var r,
          o,
          i,
          s = n(2100),
          a = s.Reader,
          A = s.Writer,
          u = s.util,
          l = s.roots.default || (s.roots.default = {})
        ;((l.onnx =
          (((i = {}).Version =
            ((r = {}),
            ((o = Object.create(r))[(r[0] = '_START_VERSION')] = 0),
            (o[(r[1] = 'IR_VERSION_2017_10_10')] = 1),
            (o[(r[2] = 'IR_VERSION_2017_10_30')] = 2),
            (o[(r[3] = 'IR_VERSION_2017_11_3')] = 3),
            (o[(r[4] = 'IR_VERSION_2019_1_22')] = 4),
            (o[(r[5] = 'IR_VERSION')] = 5),
            o)),
          (i.AttributeProto = (function () {
            function e(e) {
              if (
                ((this.floats = []),
                (this.ints = []),
                (this.strings = []),
                (this.tensors = []),
                (this.graphs = []),
                e)
              )
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            return (
              (e.prototype.name = ''),
              (e.prototype.refAttrName = ''),
              (e.prototype.docString = ''),
              (e.prototype.type = 0),
              (e.prototype.f = 0),
              (e.prototype.i = u.Long ? u.Long.fromBits(0, 0, !1) : 0),
              (e.prototype.s = u.newBuffer([])),
              (e.prototype.t = null),
              (e.prototype.g = null),
              (e.prototype.floats = u.emptyArray),
              (e.prototype.ints = u.emptyArray),
              (e.prototype.strings = u.emptyArray),
              (e.prototype.tensors = u.emptyArray),
              (e.prototype.graphs = u.emptyArray),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                if (
                  (t || (t = A.create()),
                  null != e.name && e.hasOwnProperty('name') && t.uint32(10).string(e.name),
                  null != e.f && e.hasOwnProperty('f') && t.uint32(21).float(e.f),
                  null != e.i && e.hasOwnProperty('i') && t.uint32(24).int64(e.i),
                  null != e.s && e.hasOwnProperty('s') && t.uint32(34).bytes(e.s),
                  null != e.t &&
                    e.hasOwnProperty('t') &&
                    l.onnx.TensorProto.encode(e.t, t.uint32(42).fork()).ldelim(),
                  null != e.g &&
                    e.hasOwnProperty('g') &&
                    l.onnx.GraphProto.encode(e.g, t.uint32(50).fork()).ldelim(),
                  null != e.floats && e.floats.length)
                ) {
                  t.uint32(58).fork()
                  for (var n = 0; n < e.floats.length; ++n) t.float(e.floats[n])
                  t.ldelim()
                }
                if (null != e.ints && e.ints.length) {
                  for (t.uint32(66).fork(), n = 0; n < e.ints.length; ++n) t.int64(e.ints[n])
                  t.ldelim()
                }
                if (null != e.strings && e.strings.length)
                  for (n = 0; n < e.strings.length; ++n) t.uint32(74).bytes(e.strings[n])
                if (null != e.tensors && e.tensors.length)
                  for (n = 0; n < e.tensors.length; ++n)
                    l.onnx.TensorProto.encode(e.tensors[n], t.uint32(82).fork()).ldelim()
                if (null != e.graphs && e.graphs.length)
                  for (n = 0; n < e.graphs.length; ++n)
                    l.onnx.GraphProto.encode(e.graphs[n], t.uint32(90).fork()).ldelim()
                return (
                  null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    t.uint32(106).string(e.docString),
                  null != e.type && e.hasOwnProperty('type') && t.uint32(160).int32(e.type),
                  null != e.refAttrName &&
                    e.hasOwnProperty('refAttrName') &&
                    t.uint32(170).string(e.refAttrName),
                  t
                )
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.AttributeProto();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  switch (o >>> 3) {
                    case 1:
                      r.name = e.string()
                      break
                    case 21:
                      r.refAttrName = e.string()
                      break
                    case 13:
                      r.docString = e.string()
                      break
                    case 20:
                      r.type = e.int32()
                      break
                    case 2:
                      r.f = e.float()
                      break
                    case 3:
                      r.i = e.int64()
                      break
                    case 4:
                      r.s = e.bytes()
                      break
                    case 5:
                      r.t = l.onnx.TensorProto.decode(e, e.uint32())
                      break
                    case 6:
                      r.g = l.onnx.GraphProto.decode(e, e.uint32())
                      break
                    case 7:
                      if (((r.floats && r.floats.length) || (r.floats = []), 2 == (7 & o)))
                        for (var i = e.uint32() + e.pos; e.pos < i; ) r.floats.push(e.float())
                      else r.floats.push(e.float())
                      break
                    case 8:
                      if (((r.ints && r.ints.length) || (r.ints = []), 2 == (7 & o)))
                        for (i = e.uint32() + e.pos; e.pos < i; ) r.ints.push(e.int64())
                      else r.ints.push(e.int64())
                      break
                    case 9:
                      ;((r.strings && r.strings.length) || (r.strings = []),
                        r.strings.push(e.bytes()))
                      break
                    case 10:
                      ;((r.tensors && r.tensors.length) || (r.tensors = []),
                        r.tensors.push(l.onnx.TensorProto.decode(e, e.uint32())))
                      break
                    case 11:
                      ;((r.graphs && r.graphs.length) || (r.graphs = []),
                        r.graphs.push(l.onnx.GraphProto.decode(e, e.uint32())))
                      break
                    default:
                      e.skipType(7 & o)
                  }
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                if ('object' != typeof e || null === e) return 'object expected'
                if (null != e.name && e.hasOwnProperty('name') && !u.isString(e.name))
                  return 'name: string expected'
                if (
                  null != e.refAttrName &&
                  e.hasOwnProperty('refAttrName') &&
                  !u.isString(e.refAttrName)
                )
                  return 'refAttrName: string expected'
                if (
                  null != e.docString &&
                  e.hasOwnProperty('docString') &&
                  !u.isString(e.docString)
                )
                  return 'docString: string expected'
                if (null != e.type && e.hasOwnProperty('type'))
                  switch (e.type) {
                    default:
                      return 'type: enum value expected'
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                  }
                if (null != e.f && e.hasOwnProperty('f') && 'number' != typeof e.f)
                  return 'f: number expected'
                if (
                  null != e.i &&
                  e.hasOwnProperty('i') &&
                  !(u.isInteger(e.i) || (e.i && u.isInteger(e.i.low) && u.isInteger(e.i.high)))
                )
                  return 'i: integer|Long expected'
                if (
                  null != e.s &&
                  e.hasOwnProperty('s') &&
                  !((e.s && 'number' == typeof e.s.length) || u.isString(e.s))
                )
                  return 's: buffer expected'
                if (null != e.t && e.hasOwnProperty('t') && (n = l.onnx.TensorProto.verify(e.t)))
                  return 't.' + n
                if (null != e.g && e.hasOwnProperty('g') && (n = l.onnx.GraphProto.verify(e.g)))
                  return 'g.' + n
                if (null != e.floats && e.hasOwnProperty('floats')) {
                  if (!Array.isArray(e.floats)) return 'floats: array expected'
                  for (var t = 0; t < e.floats.length; ++t)
                    if ('number' != typeof e.floats[t]) return 'floats: number[] expected'
                }
                if (null != e.ints && e.hasOwnProperty('ints')) {
                  if (!Array.isArray(e.ints)) return 'ints: array expected'
                  for (t = 0; t < e.ints.length; ++t)
                    if (
                      !(
                        u.isInteger(e.ints[t]) ||
                        (e.ints[t] && u.isInteger(e.ints[t].low) && u.isInteger(e.ints[t].high))
                      )
                    )
                      return 'ints: integer|Long[] expected'
                }
                if (null != e.strings && e.hasOwnProperty('strings')) {
                  if (!Array.isArray(e.strings)) return 'strings: array expected'
                  for (t = 0; t < e.strings.length; ++t)
                    if (
                      !(
                        (e.strings[t] && 'number' == typeof e.strings[t].length) ||
                        u.isString(e.strings[t])
                      )
                    )
                      return 'strings: buffer[] expected'
                }
                if (null != e.tensors && e.hasOwnProperty('tensors')) {
                  if (!Array.isArray(e.tensors)) return 'tensors: array expected'
                  for (t = 0; t < e.tensors.length; ++t)
                    if ((n = l.onnx.TensorProto.verify(e.tensors[t]))) return 'tensors.' + n
                }
                if (null != e.graphs && e.hasOwnProperty('graphs')) {
                  if (!Array.isArray(e.graphs)) return 'graphs: array expected'
                  for (t = 0; t < e.graphs.length; ++t) {
                    var n
                    if ((n = l.onnx.GraphProto.verify(e.graphs[t]))) return 'graphs.' + n
                  }
                }
                return null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.AttributeProto) return e
                var t = new l.onnx.AttributeProto()
                switch (
                  (null != e.name && (t.name = String(e.name)),
                  null != e.refAttrName && (t.refAttrName = String(e.refAttrName)),
                  null != e.docString && (t.docString = String(e.docString)),
                  e.type)
                ) {
                  case 'UNDEFINED':
                  case 0:
                    t.type = 0
                    break
                  case 'FLOAT':
                  case 1:
                    t.type = 1
                    break
                  case 'INT':
                  case 2:
                    t.type = 2
                    break
                  case 'STRING':
                  case 3:
                    t.type = 3
                    break
                  case 'TENSOR':
                  case 4:
                    t.type = 4
                    break
                  case 'GRAPH':
                  case 5:
                    t.type = 5
                    break
                  case 'FLOATS':
                  case 6:
                    t.type = 6
                    break
                  case 'INTS':
                  case 7:
                    t.type = 7
                    break
                  case 'STRINGS':
                  case 8:
                    t.type = 8
                    break
                  case 'TENSORS':
                  case 9:
                    t.type = 9
                    break
                  case 'GRAPHS':
                  case 10:
                    t.type = 10
                }
                if (
                  (null != e.f && (t.f = Number(e.f)),
                  null != e.i &&
                    (u.Long
                      ? ((t.i = u.Long.fromValue(e.i)).unsigned = !1)
                      : 'string' == typeof e.i
                        ? (t.i = parseInt(e.i, 10))
                        : 'number' == typeof e.i
                          ? (t.i = e.i)
                          : 'object' == typeof e.i &&
                            (t.i = new u.LongBits(e.i.low >>> 0, e.i.high >>> 0).toNumber())),
                  null != e.s &&
                    ('string' == typeof e.s
                      ? u.base64.decode(e.s, (t.s = u.newBuffer(u.base64.length(e.s))), 0)
                      : e.s.length && (t.s = e.s)),
                  null != e.t)
                ) {
                  if ('object' != typeof e.t)
                    throw TypeError('.onnx.AttributeProto.t: object expected')
                  t.t = l.onnx.TensorProto.fromObject(e.t)
                }
                if (null != e.g) {
                  if ('object' != typeof e.g)
                    throw TypeError('.onnx.AttributeProto.g: object expected')
                  t.g = l.onnx.GraphProto.fromObject(e.g)
                }
                if (e.floats) {
                  if (!Array.isArray(e.floats))
                    throw TypeError('.onnx.AttributeProto.floats: array expected')
                  t.floats = []
                  for (var n = 0; n < e.floats.length; ++n) t.floats[n] = Number(e.floats[n])
                }
                if (e.ints) {
                  if (!Array.isArray(e.ints))
                    throw TypeError('.onnx.AttributeProto.ints: array expected')
                  for (t.ints = [], n = 0; n < e.ints.length; ++n)
                    u.Long
                      ? ((t.ints[n] = u.Long.fromValue(e.ints[n])).unsigned = !1)
                      : 'string' == typeof e.ints[n]
                        ? (t.ints[n] = parseInt(e.ints[n], 10))
                        : 'number' == typeof e.ints[n]
                          ? (t.ints[n] = e.ints[n])
                          : 'object' == typeof e.ints[n] &&
                            (t.ints[n] = new u.LongBits(
                              e.ints[n].low >>> 0,
                              e.ints[n].high >>> 0
                            ).toNumber())
                }
                if (e.strings) {
                  if (!Array.isArray(e.strings))
                    throw TypeError('.onnx.AttributeProto.strings: array expected')
                  for (t.strings = [], n = 0; n < e.strings.length; ++n)
                    'string' == typeof e.strings[n]
                      ? u.base64.decode(
                          e.strings[n],
                          (t.strings[n] = u.newBuffer(u.base64.length(e.strings[n]))),
                          0
                        )
                      : e.strings[n].length && (t.strings[n] = e.strings[n])
                }
                if (e.tensors) {
                  if (!Array.isArray(e.tensors))
                    throw TypeError('.onnx.AttributeProto.tensors: array expected')
                  for (t.tensors = [], n = 0; n < e.tensors.length; ++n) {
                    if ('object' != typeof e.tensors[n])
                      throw TypeError('.onnx.AttributeProto.tensors: object expected')
                    t.tensors[n] = l.onnx.TensorProto.fromObject(e.tensors[n])
                  }
                }
                if (e.graphs) {
                  if (!Array.isArray(e.graphs))
                    throw TypeError('.onnx.AttributeProto.graphs: array expected')
                  for (t.graphs = [], n = 0; n < e.graphs.length; ++n) {
                    if ('object' != typeof e.graphs[n])
                      throw TypeError('.onnx.AttributeProto.graphs: object expected')
                    t.graphs[n] = l.onnx.GraphProto.fromObject(e.graphs[n])
                  }
                }
                return t
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                if (
                  ((t.arrays || t.defaults) &&
                    ((n.floats = []),
                    (n.ints = []),
                    (n.strings = []),
                    (n.tensors = []),
                    (n.graphs = [])),
                  t.defaults)
                ) {
                  if (((n.name = ''), (n.f = 0), u.Long)) {
                    var r = new u.Long(0, 0, !1)
                    n.i = t.longs === String ? r.toString() : t.longs === Number ? r.toNumber() : r
                  } else n.i = t.longs === String ? '0' : 0
                  ;(t.bytes === String
                    ? (n.s = '')
                    : ((n.s = []), t.bytes !== Array && (n.s = u.newBuffer(n.s))),
                    (n.t = null),
                    (n.g = null),
                    (n.docString = ''),
                    (n.type = t.enums === String ? 'UNDEFINED' : 0),
                    (n.refAttrName = ''))
                }
                if (
                  (null != e.name && e.hasOwnProperty('name') && (n.name = e.name),
                  null != e.f &&
                    e.hasOwnProperty('f') &&
                    (n.f = t.json && !isFinite(e.f) ? String(e.f) : e.f),
                  null != e.i &&
                    e.hasOwnProperty('i') &&
                    ('number' == typeof e.i
                      ? (n.i = t.longs === String ? String(e.i) : e.i)
                      : (n.i =
                          t.longs === String
                            ? u.Long.prototype.toString.call(e.i)
                            : t.longs === Number
                              ? new u.LongBits(e.i.low >>> 0, e.i.high >>> 0).toNumber()
                              : e.i)),
                  null != e.s &&
                    e.hasOwnProperty('s') &&
                    (n.s =
                      t.bytes === String
                        ? u.base64.encode(e.s, 0, e.s.length)
                        : t.bytes === Array
                          ? Array.prototype.slice.call(e.s)
                          : e.s),
                  null != e.t &&
                    e.hasOwnProperty('t') &&
                    (n.t = l.onnx.TensorProto.toObject(e.t, t)),
                  null != e.g &&
                    e.hasOwnProperty('g') &&
                    (n.g = l.onnx.GraphProto.toObject(e.g, t)),
                  e.floats && e.floats.length)
                ) {
                  n.floats = []
                  for (var o = 0; o < e.floats.length; ++o)
                    n.floats[o] =
                      t.json && !isFinite(e.floats[o]) ? String(e.floats[o]) : e.floats[o]
                }
                if (e.ints && e.ints.length)
                  for (n.ints = [], o = 0; o < e.ints.length; ++o)
                    'number' == typeof e.ints[o]
                      ? (n.ints[o] = t.longs === String ? String(e.ints[o]) : e.ints[o])
                      : (n.ints[o] =
                          t.longs === String
                            ? u.Long.prototype.toString.call(e.ints[o])
                            : t.longs === Number
                              ? new u.LongBits(e.ints[o].low >>> 0, e.ints[o].high >>> 0).toNumber()
                              : e.ints[o])
                if (e.strings && e.strings.length)
                  for (n.strings = [], o = 0; o < e.strings.length; ++o)
                    n.strings[o] =
                      t.bytes === String
                        ? u.base64.encode(e.strings[o], 0, e.strings[o].length)
                        : t.bytes === Array
                          ? Array.prototype.slice.call(e.strings[o])
                          : e.strings[o]
                if (e.tensors && e.tensors.length)
                  for (n.tensors = [], o = 0; o < e.tensors.length; ++o)
                    n.tensors[o] = l.onnx.TensorProto.toObject(e.tensors[o], t)
                if (e.graphs && e.graphs.length)
                  for (n.graphs = [], o = 0; o < e.graphs.length; ++o)
                    n.graphs[o] = l.onnx.GraphProto.toObject(e.graphs[o], t)
                return (
                  null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    (n.docString = e.docString),
                  null != e.type &&
                    e.hasOwnProperty('type') &&
                    (n.type =
                      t.enums === String ? l.onnx.AttributeProto.AttributeType[e.type] : e.type),
                  null != e.refAttrName &&
                    e.hasOwnProperty('refAttrName') &&
                    (n.refAttrName = e.refAttrName),
                  n
                )
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              (e.AttributeType = (function () {
                var e = {},
                  t = Object.create(e)
                return (
                  (t[(e[0] = 'UNDEFINED')] = 0),
                  (t[(e[1] = 'FLOAT')] = 1),
                  (t[(e[2] = 'INT')] = 2),
                  (t[(e[3] = 'STRING')] = 3),
                  (t[(e[4] = 'TENSOR')] = 4),
                  (t[(e[5] = 'GRAPH')] = 5),
                  (t[(e[6] = 'FLOATS')] = 6),
                  (t[(e[7] = 'INTS')] = 7),
                  (t[(e[8] = 'STRINGS')] = 8),
                  (t[(e[9] = 'TENSORS')] = 9),
                  (t[(e[10] = 'GRAPHS')] = 10),
                  t
                )
              })()),
              e
            )
          })()),
          (i.ValueInfoProto = (function () {
            function e(e) {
              if (e)
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            return (
              (e.prototype.name = ''),
              (e.prototype.type = null),
              (e.prototype.docString = ''),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                return (
                  t || (t = A.create()),
                  null != e.name && e.hasOwnProperty('name') && t.uint32(10).string(e.name),
                  null != e.type &&
                    e.hasOwnProperty('type') &&
                    l.onnx.TypeProto.encode(e.type, t.uint32(18).fork()).ldelim(),
                  null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    t.uint32(26).string(e.docString),
                  t
                )
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.ValueInfoProto();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  switch (o >>> 3) {
                    case 1:
                      r.name = e.string()
                      break
                    case 2:
                      r.type = l.onnx.TypeProto.decode(e, e.uint32())
                      break
                    case 3:
                      r.docString = e.string()
                      break
                    default:
                      e.skipType(7 & o)
                  }
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                if ('object' != typeof e || null === e) return 'object expected'
                if (null != e.name && e.hasOwnProperty('name') && !u.isString(e.name))
                  return 'name: string expected'
                if (null != e.type && e.hasOwnProperty('type')) {
                  var t = l.onnx.TypeProto.verify(e.type)
                  if (t) return 'type.' + t
                }
                return null != e.docString &&
                  e.hasOwnProperty('docString') &&
                  !u.isString(e.docString)
                  ? 'docString: string expected'
                  : null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.ValueInfoProto) return e
                var t = new l.onnx.ValueInfoProto()
                if ((null != e.name && (t.name = String(e.name)), null != e.type)) {
                  if ('object' != typeof e.type)
                    throw TypeError('.onnx.ValueInfoProto.type: object expected')
                  t.type = l.onnx.TypeProto.fromObject(e.type)
                }
                return (null != e.docString && (t.docString = String(e.docString)), t)
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                return (
                  t.defaults && ((n.name = ''), (n.type = null), (n.docString = '')),
                  null != e.name && e.hasOwnProperty('name') && (n.name = e.name),
                  null != e.type &&
                    e.hasOwnProperty('type') &&
                    (n.type = l.onnx.TypeProto.toObject(e.type, t)),
                  null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    (n.docString = e.docString),
                  n
                )
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              e
            )
          })()),
          (i.NodeProto = (function () {
            function e(e) {
              if (((this.input = []), (this.output = []), (this.attribute = []), e))
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            return (
              (e.prototype.input = u.emptyArray),
              (e.prototype.output = u.emptyArray),
              (e.prototype.name = ''),
              (e.prototype.opType = ''),
              (e.prototype.domain = ''),
              (e.prototype.attribute = u.emptyArray),
              (e.prototype.docString = ''),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                if ((t || (t = A.create()), null != e.input && e.input.length))
                  for (var n = 0; n < e.input.length; ++n) t.uint32(10).string(e.input[n])
                if (null != e.output && e.output.length)
                  for (n = 0; n < e.output.length; ++n) t.uint32(18).string(e.output[n])
                if (
                  (null != e.name && e.hasOwnProperty('name') && t.uint32(26).string(e.name),
                  null != e.opType && e.hasOwnProperty('opType') && t.uint32(34).string(e.opType),
                  null != e.attribute && e.attribute.length)
                )
                  for (n = 0; n < e.attribute.length; ++n)
                    l.onnx.AttributeProto.encode(e.attribute[n], t.uint32(42).fork()).ldelim()
                return (
                  null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    t.uint32(50).string(e.docString),
                  null != e.domain && e.hasOwnProperty('domain') && t.uint32(58).string(e.domain),
                  t
                )
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.NodeProto();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  switch (o >>> 3) {
                    case 1:
                      ;((r.input && r.input.length) || (r.input = []), r.input.push(e.string()))
                      break
                    case 2:
                      ;((r.output && r.output.length) || (r.output = []), r.output.push(e.string()))
                      break
                    case 3:
                      r.name = e.string()
                      break
                    case 4:
                      r.opType = e.string()
                      break
                    case 7:
                      r.domain = e.string()
                      break
                    case 5:
                      ;((r.attribute && r.attribute.length) || (r.attribute = []),
                        r.attribute.push(l.onnx.AttributeProto.decode(e, e.uint32())))
                      break
                    case 6:
                      r.docString = e.string()
                      break
                    default:
                      e.skipType(7 & o)
                  }
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                if ('object' != typeof e || null === e) return 'object expected'
                if (null != e.input && e.hasOwnProperty('input')) {
                  if (!Array.isArray(e.input)) return 'input: array expected'
                  for (var t = 0; t < e.input.length; ++t)
                    if (!u.isString(e.input[t])) return 'input: string[] expected'
                }
                if (null != e.output && e.hasOwnProperty('output')) {
                  if (!Array.isArray(e.output)) return 'output: array expected'
                  for (t = 0; t < e.output.length; ++t)
                    if (!u.isString(e.output[t])) return 'output: string[] expected'
                }
                if (null != e.name && e.hasOwnProperty('name') && !u.isString(e.name))
                  return 'name: string expected'
                if (null != e.opType && e.hasOwnProperty('opType') && !u.isString(e.opType))
                  return 'opType: string expected'
                if (null != e.domain && e.hasOwnProperty('domain') && !u.isString(e.domain))
                  return 'domain: string expected'
                if (null != e.attribute && e.hasOwnProperty('attribute')) {
                  if (!Array.isArray(e.attribute)) return 'attribute: array expected'
                  for (t = 0; t < e.attribute.length; ++t) {
                    var n = l.onnx.AttributeProto.verify(e.attribute[t])
                    if (n) return 'attribute.' + n
                  }
                }
                return null != e.docString &&
                  e.hasOwnProperty('docString') &&
                  !u.isString(e.docString)
                  ? 'docString: string expected'
                  : null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.NodeProto) return e
                var t = new l.onnx.NodeProto()
                if (e.input) {
                  if (!Array.isArray(e.input))
                    throw TypeError('.onnx.NodeProto.input: array expected')
                  t.input = []
                  for (var n = 0; n < e.input.length; ++n) t.input[n] = String(e.input[n])
                }
                if (e.output) {
                  if (!Array.isArray(e.output))
                    throw TypeError('.onnx.NodeProto.output: array expected')
                  for (t.output = [], n = 0; n < e.output.length; ++n)
                    t.output[n] = String(e.output[n])
                }
                if (
                  (null != e.name && (t.name = String(e.name)),
                  null != e.opType && (t.opType = String(e.opType)),
                  null != e.domain && (t.domain = String(e.domain)),
                  e.attribute)
                ) {
                  if (!Array.isArray(e.attribute))
                    throw TypeError('.onnx.NodeProto.attribute: array expected')
                  for (t.attribute = [], n = 0; n < e.attribute.length; ++n) {
                    if ('object' != typeof e.attribute[n])
                      throw TypeError('.onnx.NodeProto.attribute: object expected')
                    t.attribute[n] = l.onnx.AttributeProto.fromObject(e.attribute[n])
                  }
                }
                return (null != e.docString && (t.docString = String(e.docString)), t)
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                if (
                  ((t.arrays || t.defaults) &&
                    ((n.input = []), (n.output = []), (n.attribute = [])),
                  t.defaults &&
                    ((n.name = ''), (n.opType = ''), (n.docString = ''), (n.domain = '')),
                  e.input && e.input.length)
                ) {
                  n.input = []
                  for (var r = 0; r < e.input.length; ++r) n.input[r] = e.input[r]
                }
                if (e.output && e.output.length)
                  for (n.output = [], r = 0; r < e.output.length; ++r) n.output[r] = e.output[r]
                if (
                  (null != e.name && e.hasOwnProperty('name') && (n.name = e.name),
                  null != e.opType && e.hasOwnProperty('opType') && (n.opType = e.opType),
                  e.attribute && e.attribute.length)
                )
                  for (n.attribute = [], r = 0; r < e.attribute.length; ++r)
                    n.attribute[r] = l.onnx.AttributeProto.toObject(e.attribute[r], t)
                return (
                  null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    (n.docString = e.docString),
                  null != e.domain && e.hasOwnProperty('domain') && (n.domain = e.domain),
                  n
                )
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              e
            )
          })()),
          (i.ModelProto = (function () {
            function e(e) {
              if (((this.opsetImport = []), (this.metadataProps = []), e))
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            return (
              (e.prototype.irVersion = u.Long ? u.Long.fromBits(0, 0, !1) : 0),
              (e.prototype.opsetImport = u.emptyArray),
              (e.prototype.producerName = ''),
              (e.prototype.producerVersion = ''),
              (e.prototype.domain = ''),
              (e.prototype.modelVersion = u.Long ? u.Long.fromBits(0, 0, !1) : 0),
              (e.prototype.docString = ''),
              (e.prototype.graph = null),
              (e.prototype.metadataProps = u.emptyArray),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                if (
                  (t || (t = A.create()),
                  null != e.irVersion &&
                    e.hasOwnProperty('irVersion') &&
                    t.uint32(8).int64(e.irVersion),
                  null != e.producerName &&
                    e.hasOwnProperty('producerName') &&
                    t.uint32(18).string(e.producerName),
                  null != e.producerVersion &&
                    e.hasOwnProperty('producerVersion') &&
                    t.uint32(26).string(e.producerVersion),
                  null != e.domain && e.hasOwnProperty('domain') && t.uint32(34).string(e.domain),
                  null != e.modelVersion &&
                    e.hasOwnProperty('modelVersion') &&
                    t.uint32(40).int64(e.modelVersion),
                  null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    t.uint32(50).string(e.docString),
                  null != e.graph &&
                    e.hasOwnProperty('graph') &&
                    l.onnx.GraphProto.encode(e.graph, t.uint32(58).fork()).ldelim(),
                  null != e.opsetImport && e.opsetImport.length)
                )
                  for (var n = 0; n < e.opsetImport.length; ++n)
                    l.onnx.OperatorSetIdProto.encode(e.opsetImport[n], t.uint32(66).fork()).ldelim()
                if (null != e.metadataProps && e.metadataProps.length)
                  for (n = 0; n < e.metadataProps.length; ++n)
                    l.onnx.StringStringEntryProto.encode(
                      e.metadataProps[n],
                      t.uint32(114).fork()
                    ).ldelim()
                return t
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.ModelProto();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  switch (o >>> 3) {
                    case 1:
                      r.irVersion = e.int64()
                      break
                    case 8:
                      ;((r.opsetImport && r.opsetImport.length) || (r.opsetImport = []),
                        r.opsetImport.push(l.onnx.OperatorSetIdProto.decode(e, e.uint32())))
                      break
                    case 2:
                      r.producerName = e.string()
                      break
                    case 3:
                      r.producerVersion = e.string()
                      break
                    case 4:
                      r.domain = e.string()
                      break
                    case 5:
                      r.modelVersion = e.int64()
                      break
                    case 6:
                      r.docString = e.string()
                      break
                    case 7:
                      r.graph = l.onnx.GraphProto.decode(e, e.uint32())
                      break
                    case 14:
                      ;((r.metadataProps && r.metadataProps.length) || (r.metadataProps = []),
                        r.metadataProps.push(l.onnx.StringStringEntryProto.decode(e, e.uint32())))
                      break
                    default:
                      e.skipType(7 & o)
                  }
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                if ('object' != typeof e || null === e) return 'object expected'
                if (
                  null != e.irVersion &&
                  e.hasOwnProperty('irVersion') &&
                  !(
                    u.isInteger(e.irVersion) ||
                    (e.irVersion && u.isInteger(e.irVersion.low) && u.isInteger(e.irVersion.high))
                  )
                )
                  return 'irVersion: integer|Long expected'
                if (null != e.opsetImport && e.hasOwnProperty('opsetImport')) {
                  if (!Array.isArray(e.opsetImport)) return 'opsetImport: array expected'
                  for (var t = 0; t < e.opsetImport.length; ++t)
                    if ((n = l.onnx.OperatorSetIdProto.verify(e.opsetImport[t])))
                      return 'opsetImport.' + n
                }
                if (
                  null != e.producerName &&
                  e.hasOwnProperty('producerName') &&
                  !u.isString(e.producerName)
                )
                  return 'producerName: string expected'
                if (
                  null != e.producerVersion &&
                  e.hasOwnProperty('producerVersion') &&
                  !u.isString(e.producerVersion)
                )
                  return 'producerVersion: string expected'
                if (null != e.domain && e.hasOwnProperty('domain') && !u.isString(e.domain))
                  return 'domain: string expected'
                if (
                  null != e.modelVersion &&
                  e.hasOwnProperty('modelVersion') &&
                  !(
                    u.isInteger(e.modelVersion) ||
                    (e.modelVersion &&
                      u.isInteger(e.modelVersion.low) &&
                      u.isInteger(e.modelVersion.high))
                  )
                )
                  return 'modelVersion: integer|Long expected'
                if (
                  null != e.docString &&
                  e.hasOwnProperty('docString') &&
                  !u.isString(e.docString)
                )
                  return 'docString: string expected'
                if (
                  null != e.graph &&
                  e.hasOwnProperty('graph') &&
                  (n = l.onnx.GraphProto.verify(e.graph))
                )
                  return 'graph.' + n
                if (null != e.metadataProps && e.hasOwnProperty('metadataProps')) {
                  if (!Array.isArray(e.metadataProps)) return 'metadataProps: array expected'
                  for (t = 0; t < e.metadataProps.length; ++t) {
                    var n
                    if ((n = l.onnx.StringStringEntryProto.verify(e.metadataProps[t])))
                      return 'metadataProps.' + n
                  }
                }
                return null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.ModelProto) return e
                var t = new l.onnx.ModelProto()
                if (
                  (null != e.irVersion &&
                    (u.Long
                      ? ((t.irVersion = u.Long.fromValue(e.irVersion)).unsigned = !1)
                      : 'string' == typeof e.irVersion
                        ? (t.irVersion = parseInt(e.irVersion, 10))
                        : 'number' == typeof e.irVersion
                          ? (t.irVersion = e.irVersion)
                          : 'object' == typeof e.irVersion &&
                            (t.irVersion = new u.LongBits(
                              e.irVersion.low >>> 0,
                              e.irVersion.high >>> 0
                            ).toNumber())),
                  e.opsetImport)
                ) {
                  if (!Array.isArray(e.opsetImport))
                    throw TypeError('.onnx.ModelProto.opsetImport: array expected')
                  t.opsetImport = []
                  for (var n = 0; n < e.opsetImport.length; ++n) {
                    if ('object' != typeof e.opsetImport[n])
                      throw TypeError('.onnx.ModelProto.opsetImport: object expected')
                    t.opsetImport[n] = l.onnx.OperatorSetIdProto.fromObject(e.opsetImport[n])
                  }
                }
                if (
                  (null != e.producerName && (t.producerName = String(e.producerName)),
                  null != e.producerVersion && (t.producerVersion = String(e.producerVersion)),
                  null != e.domain && (t.domain = String(e.domain)),
                  null != e.modelVersion &&
                    (u.Long
                      ? ((t.modelVersion = u.Long.fromValue(e.modelVersion)).unsigned = !1)
                      : 'string' == typeof e.modelVersion
                        ? (t.modelVersion = parseInt(e.modelVersion, 10))
                        : 'number' == typeof e.modelVersion
                          ? (t.modelVersion = e.modelVersion)
                          : 'object' == typeof e.modelVersion &&
                            (t.modelVersion = new u.LongBits(
                              e.modelVersion.low >>> 0,
                              e.modelVersion.high >>> 0
                            ).toNumber())),
                  null != e.docString && (t.docString = String(e.docString)),
                  null != e.graph)
                ) {
                  if ('object' != typeof e.graph)
                    throw TypeError('.onnx.ModelProto.graph: object expected')
                  t.graph = l.onnx.GraphProto.fromObject(e.graph)
                }
                if (e.metadataProps) {
                  if (!Array.isArray(e.metadataProps))
                    throw TypeError('.onnx.ModelProto.metadataProps: array expected')
                  for (t.metadataProps = [], n = 0; n < e.metadataProps.length; ++n) {
                    if ('object' != typeof e.metadataProps[n])
                      throw TypeError('.onnx.ModelProto.metadataProps: object expected')
                    t.metadataProps[n] = l.onnx.StringStringEntryProto.fromObject(
                      e.metadataProps[n]
                    )
                  }
                }
                return t
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                if (
                  ((t.arrays || t.defaults) && ((n.opsetImport = []), (n.metadataProps = [])),
                  t.defaults)
                ) {
                  if (u.Long) {
                    var r = new u.Long(0, 0, !1)
                    n.irVersion =
                      t.longs === String ? r.toString() : t.longs === Number ? r.toNumber() : r
                  } else n.irVersion = t.longs === String ? '0' : 0
                  ;((n.producerName = ''),
                    (n.producerVersion = ''),
                    (n.domain = ''),
                    u.Long
                      ? ((r = new u.Long(0, 0, !1)),
                        (n.modelVersion =
                          t.longs === String
                            ? r.toString()
                            : t.longs === Number
                              ? r.toNumber()
                              : r))
                      : (n.modelVersion = t.longs === String ? '0' : 0),
                    (n.docString = ''),
                    (n.graph = null))
                }
                if (
                  (null != e.irVersion &&
                    e.hasOwnProperty('irVersion') &&
                    ('number' == typeof e.irVersion
                      ? (n.irVersion = t.longs === String ? String(e.irVersion) : e.irVersion)
                      : (n.irVersion =
                          t.longs === String
                            ? u.Long.prototype.toString.call(e.irVersion)
                            : t.longs === Number
                              ? new u.LongBits(
                                  e.irVersion.low >>> 0,
                                  e.irVersion.high >>> 0
                                ).toNumber()
                              : e.irVersion)),
                  null != e.producerName &&
                    e.hasOwnProperty('producerName') &&
                    (n.producerName = e.producerName),
                  null != e.producerVersion &&
                    e.hasOwnProperty('producerVersion') &&
                    (n.producerVersion = e.producerVersion),
                  null != e.domain && e.hasOwnProperty('domain') && (n.domain = e.domain),
                  null != e.modelVersion &&
                    e.hasOwnProperty('modelVersion') &&
                    ('number' == typeof e.modelVersion
                      ? (n.modelVersion =
                          t.longs === String ? String(e.modelVersion) : e.modelVersion)
                      : (n.modelVersion =
                          t.longs === String
                            ? u.Long.prototype.toString.call(e.modelVersion)
                            : t.longs === Number
                              ? new u.LongBits(
                                  e.modelVersion.low >>> 0,
                                  e.modelVersion.high >>> 0
                                ).toNumber()
                              : e.modelVersion)),
                  null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    (n.docString = e.docString),
                  null != e.graph &&
                    e.hasOwnProperty('graph') &&
                    (n.graph = l.onnx.GraphProto.toObject(e.graph, t)),
                  e.opsetImport && e.opsetImport.length)
                ) {
                  n.opsetImport = []
                  for (var o = 0; o < e.opsetImport.length; ++o)
                    n.opsetImport[o] = l.onnx.OperatorSetIdProto.toObject(e.opsetImport[o], t)
                }
                if (e.metadataProps && e.metadataProps.length)
                  for (n.metadataProps = [], o = 0; o < e.metadataProps.length; ++o)
                    n.metadataProps[o] = l.onnx.StringStringEntryProto.toObject(
                      e.metadataProps[o],
                      t
                    )
                return n
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              e
            )
          })()),
          (i.StringStringEntryProto = (function () {
            function e(e) {
              if (e)
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            return (
              (e.prototype.key = ''),
              (e.prototype.value = ''),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                return (
                  t || (t = A.create()),
                  null != e.key && e.hasOwnProperty('key') && t.uint32(10).string(e.key),
                  null != e.value && e.hasOwnProperty('value') && t.uint32(18).string(e.value),
                  t
                )
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.StringStringEntryProto();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  switch (o >>> 3) {
                    case 1:
                      r.key = e.string()
                      break
                    case 2:
                      r.value = e.string()
                      break
                    default:
                      e.skipType(7 & o)
                  }
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                return 'object' != typeof e || null === e
                  ? 'object expected'
                  : null != e.key && e.hasOwnProperty('key') && !u.isString(e.key)
                    ? 'key: string expected'
                    : null != e.value && e.hasOwnProperty('value') && !u.isString(e.value)
                      ? 'value: string expected'
                      : null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.StringStringEntryProto) return e
                var t = new l.onnx.StringStringEntryProto()
                return (
                  null != e.key && (t.key = String(e.key)),
                  null != e.value && (t.value = String(e.value)),
                  t
                )
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                return (
                  t.defaults && ((n.key = ''), (n.value = '')),
                  null != e.key && e.hasOwnProperty('key') && (n.key = e.key),
                  null != e.value && e.hasOwnProperty('value') && (n.value = e.value),
                  n
                )
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              e
            )
          })()),
          (i.TensorAnnotation = (function () {
            function e(e) {
              if (((this.quantParameterTensorNames = []), e))
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            return (
              (e.prototype.tensorName = ''),
              (e.prototype.quantParameterTensorNames = u.emptyArray),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                if (
                  (t || (t = A.create()),
                  null != e.tensorName &&
                    e.hasOwnProperty('tensorName') &&
                    t.uint32(10).string(e.tensorName),
                  null != e.quantParameterTensorNames && e.quantParameterTensorNames.length)
                )
                  for (var n = 0; n < e.quantParameterTensorNames.length; ++n)
                    l.onnx.StringStringEntryProto.encode(
                      e.quantParameterTensorNames[n],
                      t.uint32(18).fork()
                    ).ldelim()
                return t
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.TensorAnnotation();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  switch (o >>> 3) {
                    case 1:
                      r.tensorName = e.string()
                      break
                    case 2:
                      ;((r.quantParameterTensorNames && r.quantParameterTensorNames.length) ||
                        (r.quantParameterTensorNames = []),
                        r.quantParameterTensorNames.push(
                          l.onnx.StringStringEntryProto.decode(e, e.uint32())
                        ))
                      break
                    default:
                      e.skipType(7 & o)
                  }
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                if ('object' != typeof e || null === e) return 'object expected'
                if (
                  null != e.tensorName &&
                  e.hasOwnProperty('tensorName') &&
                  !u.isString(e.tensorName)
                )
                  return 'tensorName: string expected'
                if (
                  null != e.quantParameterTensorNames &&
                  e.hasOwnProperty('quantParameterTensorNames')
                ) {
                  if (!Array.isArray(e.quantParameterTensorNames))
                    return 'quantParameterTensorNames: array expected'
                  for (var t = 0; t < e.quantParameterTensorNames.length; ++t) {
                    var n = l.onnx.StringStringEntryProto.verify(e.quantParameterTensorNames[t])
                    if (n) return 'quantParameterTensorNames.' + n
                  }
                }
                return null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.TensorAnnotation) return e
                var t = new l.onnx.TensorAnnotation()
                if (
                  (null != e.tensorName && (t.tensorName = String(e.tensorName)),
                  e.quantParameterTensorNames)
                ) {
                  if (!Array.isArray(e.quantParameterTensorNames))
                    throw TypeError(
                      '.onnx.TensorAnnotation.quantParameterTensorNames: array expected'
                    )
                  t.quantParameterTensorNames = []
                  for (var n = 0; n < e.quantParameterTensorNames.length; ++n) {
                    if ('object' != typeof e.quantParameterTensorNames[n])
                      throw TypeError(
                        '.onnx.TensorAnnotation.quantParameterTensorNames: object expected'
                      )
                    t.quantParameterTensorNames[n] = l.onnx.StringStringEntryProto.fromObject(
                      e.quantParameterTensorNames[n]
                    )
                  }
                }
                return t
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                if (
                  ((t.arrays || t.defaults) && (n.quantParameterTensorNames = []),
                  t.defaults && (n.tensorName = ''),
                  null != e.tensorName &&
                    e.hasOwnProperty('tensorName') &&
                    (n.tensorName = e.tensorName),
                  e.quantParameterTensorNames && e.quantParameterTensorNames.length)
                ) {
                  n.quantParameterTensorNames = []
                  for (var r = 0; r < e.quantParameterTensorNames.length; ++r)
                    n.quantParameterTensorNames[r] = l.onnx.StringStringEntryProto.toObject(
                      e.quantParameterTensorNames[r],
                      t
                    )
                }
                return n
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              e
            )
          })()),
          (i.GraphProto = (function () {
            function e(e) {
              if (
                ((this.node = []),
                (this.initializer = []),
                (this.input = []),
                (this.output = []),
                (this.valueInfo = []),
                (this.quantizationAnnotation = []),
                e)
              )
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            return (
              (e.prototype.node = u.emptyArray),
              (e.prototype.name = ''),
              (e.prototype.initializer = u.emptyArray),
              (e.prototype.docString = ''),
              (e.prototype.input = u.emptyArray),
              (e.prototype.output = u.emptyArray),
              (e.prototype.valueInfo = u.emptyArray),
              (e.prototype.quantizationAnnotation = u.emptyArray),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                if ((t || (t = A.create()), null != e.node && e.node.length))
                  for (var n = 0; n < e.node.length; ++n)
                    l.onnx.NodeProto.encode(e.node[n], t.uint32(10).fork()).ldelim()
                if (
                  (null != e.name && e.hasOwnProperty('name') && t.uint32(18).string(e.name),
                  null != e.initializer && e.initializer.length)
                )
                  for (n = 0; n < e.initializer.length; ++n)
                    l.onnx.TensorProto.encode(e.initializer[n], t.uint32(42).fork()).ldelim()
                if (
                  (null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    t.uint32(82).string(e.docString),
                  null != e.input && e.input.length)
                )
                  for (n = 0; n < e.input.length; ++n)
                    l.onnx.ValueInfoProto.encode(e.input[n], t.uint32(90).fork()).ldelim()
                if (null != e.output && e.output.length)
                  for (n = 0; n < e.output.length; ++n)
                    l.onnx.ValueInfoProto.encode(e.output[n], t.uint32(98).fork()).ldelim()
                if (null != e.valueInfo && e.valueInfo.length)
                  for (n = 0; n < e.valueInfo.length; ++n)
                    l.onnx.ValueInfoProto.encode(e.valueInfo[n], t.uint32(106).fork()).ldelim()
                if (null != e.quantizationAnnotation && e.quantizationAnnotation.length)
                  for (n = 0; n < e.quantizationAnnotation.length; ++n)
                    l.onnx.TensorAnnotation.encode(
                      e.quantizationAnnotation[n],
                      t.uint32(114).fork()
                    ).ldelim()
                return t
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.GraphProto();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  switch (o >>> 3) {
                    case 1:
                      ;((r.node && r.node.length) || (r.node = []),
                        r.node.push(l.onnx.NodeProto.decode(e, e.uint32())))
                      break
                    case 2:
                      r.name = e.string()
                      break
                    case 5:
                      ;((r.initializer && r.initializer.length) || (r.initializer = []),
                        r.initializer.push(l.onnx.TensorProto.decode(e, e.uint32())))
                      break
                    case 10:
                      r.docString = e.string()
                      break
                    case 11:
                      ;((r.input && r.input.length) || (r.input = []),
                        r.input.push(l.onnx.ValueInfoProto.decode(e, e.uint32())))
                      break
                    case 12:
                      ;((r.output && r.output.length) || (r.output = []),
                        r.output.push(l.onnx.ValueInfoProto.decode(e, e.uint32())))
                      break
                    case 13:
                      ;((r.valueInfo && r.valueInfo.length) || (r.valueInfo = []),
                        r.valueInfo.push(l.onnx.ValueInfoProto.decode(e, e.uint32())))
                      break
                    case 14:
                      ;((r.quantizationAnnotation && r.quantizationAnnotation.length) ||
                        (r.quantizationAnnotation = []),
                        r.quantizationAnnotation.push(
                          l.onnx.TensorAnnotation.decode(e, e.uint32())
                        ))
                      break
                    default:
                      e.skipType(7 & o)
                  }
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                if ('object' != typeof e || null === e) return 'object expected'
                if (null != e.node && e.hasOwnProperty('node')) {
                  if (!Array.isArray(e.node)) return 'node: array expected'
                  for (var t = 0; t < e.node.length; ++t)
                    if ((n = l.onnx.NodeProto.verify(e.node[t]))) return 'node.' + n
                }
                if (null != e.name && e.hasOwnProperty('name') && !u.isString(e.name))
                  return 'name: string expected'
                if (null != e.initializer && e.hasOwnProperty('initializer')) {
                  if (!Array.isArray(e.initializer)) return 'initializer: array expected'
                  for (t = 0; t < e.initializer.length; ++t)
                    if ((n = l.onnx.TensorProto.verify(e.initializer[t]))) return 'initializer.' + n
                }
                if (
                  null != e.docString &&
                  e.hasOwnProperty('docString') &&
                  !u.isString(e.docString)
                )
                  return 'docString: string expected'
                if (null != e.input && e.hasOwnProperty('input')) {
                  if (!Array.isArray(e.input)) return 'input: array expected'
                  for (t = 0; t < e.input.length; ++t)
                    if ((n = l.onnx.ValueInfoProto.verify(e.input[t]))) return 'input.' + n
                }
                if (null != e.output && e.hasOwnProperty('output')) {
                  if (!Array.isArray(e.output)) return 'output: array expected'
                  for (t = 0; t < e.output.length; ++t)
                    if ((n = l.onnx.ValueInfoProto.verify(e.output[t]))) return 'output.' + n
                }
                if (null != e.valueInfo && e.hasOwnProperty('valueInfo')) {
                  if (!Array.isArray(e.valueInfo)) return 'valueInfo: array expected'
                  for (t = 0; t < e.valueInfo.length; ++t)
                    if ((n = l.onnx.ValueInfoProto.verify(e.valueInfo[t]))) return 'valueInfo.' + n
                }
                if (
                  null != e.quantizationAnnotation &&
                  e.hasOwnProperty('quantizationAnnotation')
                ) {
                  if (!Array.isArray(e.quantizationAnnotation))
                    return 'quantizationAnnotation: array expected'
                  for (t = 0; t < e.quantizationAnnotation.length; ++t) {
                    var n
                    if ((n = l.onnx.TensorAnnotation.verify(e.quantizationAnnotation[t])))
                      return 'quantizationAnnotation.' + n
                  }
                }
                return null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.GraphProto) return e
                var t = new l.onnx.GraphProto()
                if (e.node) {
                  if (!Array.isArray(e.node))
                    throw TypeError('.onnx.GraphProto.node: array expected')
                  t.node = []
                  for (var n = 0; n < e.node.length; ++n) {
                    if ('object' != typeof e.node[n])
                      throw TypeError('.onnx.GraphProto.node: object expected')
                    t.node[n] = l.onnx.NodeProto.fromObject(e.node[n])
                  }
                }
                if ((null != e.name && (t.name = String(e.name)), e.initializer)) {
                  if (!Array.isArray(e.initializer))
                    throw TypeError('.onnx.GraphProto.initializer: array expected')
                  for (t.initializer = [], n = 0; n < e.initializer.length; ++n) {
                    if ('object' != typeof e.initializer[n])
                      throw TypeError('.onnx.GraphProto.initializer: object expected')
                    t.initializer[n] = l.onnx.TensorProto.fromObject(e.initializer[n])
                  }
                }
                if ((null != e.docString && (t.docString = String(e.docString)), e.input)) {
                  if (!Array.isArray(e.input))
                    throw TypeError('.onnx.GraphProto.input: array expected')
                  for (t.input = [], n = 0; n < e.input.length; ++n) {
                    if ('object' != typeof e.input[n])
                      throw TypeError('.onnx.GraphProto.input: object expected')
                    t.input[n] = l.onnx.ValueInfoProto.fromObject(e.input[n])
                  }
                }
                if (e.output) {
                  if (!Array.isArray(e.output))
                    throw TypeError('.onnx.GraphProto.output: array expected')
                  for (t.output = [], n = 0; n < e.output.length; ++n) {
                    if ('object' != typeof e.output[n])
                      throw TypeError('.onnx.GraphProto.output: object expected')
                    t.output[n] = l.onnx.ValueInfoProto.fromObject(e.output[n])
                  }
                }
                if (e.valueInfo) {
                  if (!Array.isArray(e.valueInfo))
                    throw TypeError('.onnx.GraphProto.valueInfo: array expected')
                  for (t.valueInfo = [], n = 0; n < e.valueInfo.length; ++n) {
                    if ('object' != typeof e.valueInfo[n])
                      throw TypeError('.onnx.GraphProto.valueInfo: object expected')
                    t.valueInfo[n] = l.onnx.ValueInfoProto.fromObject(e.valueInfo[n])
                  }
                }
                if (e.quantizationAnnotation) {
                  if (!Array.isArray(e.quantizationAnnotation))
                    throw TypeError('.onnx.GraphProto.quantizationAnnotation: array expected')
                  for (
                    t.quantizationAnnotation = [], n = 0;
                    n < e.quantizationAnnotation.length;
                    ++n
                  ) {
                    if ('object' != typeof e.quantizationAnnotation[n])
                      throw TypeError('.onnx.GraphProto.quantizationAnnotation: object expected')
                    t.quantizationAnnotation[n] = l.onnx.TensorAnnotation.fromObject(
                      e.quantizationAnnotation[n]
                    )
                  }
                }
                return t
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                if (
                  ((t.arrays || t.defaults) &&
                    ((n.node = []),
                    (n.initializer = []),
                    (n.input = []),
                    (n.output = []),
                    (n.valueInfo = []),
                    (n.quantizationAnnotation = [])),
                  t.defaults && ((n.name = ''), (n.docString = '')),
                  e.node && e.node.length)
                ) {
                  n.node = []
                  for (var r = 0; r < e.node.length; ++r)
                    n.node[r] = l.onnx.NodeProto.toObject(e.node[r], t)
                }
                if (
                  (null != e.name && e.hasOwnProperty('name') && (n.name = e.name),
                  e.initializer && e.initializer.length)
                )
                  for (n.initializer = [], r = 0; r < e.initializer.length; ++r)
                    n.initializer[r] = l.onnx.TensorProto.toObject(e.initializer[r], t)
                if (
                  (null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    (n.docString = e.docString),
                  e.input && e.input.length)
                )
                  for (n.input = [], r = 0; r < e.input.length; ++r)
                    n.input[r] = l.onnx.ValueInfoProto.toObject(e.input[r], t)
                if (e.output && e.output.length)
                  for (n.output = [], r = 0; r < e.output.length; ++r)
                    n.output[r] = l.onnx.ValueInfoProto.toObject(e.output[r], t)
                if (e.valueInfo && e.valueInfo.length)
                  for (n.valueInfo = [], r = 0; r < e.valueInfo.length; ++r)
                    n.valueInfo[r] = l.onnx.ValueInfoProto.toObject(e.valueInfo[r], t)
                if (e.quantizationAnnotation && e.quantizationAnnotation.length)
                  for (
                    n.quantizationAnnotation = [], r = 0;
                    r < e.quantizationAnnotation.length;
                    ++r
                  )
                    n.quantizationAnnotation[r] = l.onnx.TensorAnnotation.toObject(
                      e.quantizationAnnotation[r],
                      t
                    )
                return n
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              e
            )
          })()),
          (i.TensorProto = (function () {
            function e(e) {
              if (
                ((this.dims = []),
                (this.floatData = []),
                (this.int32Data = []),
                (this.stringData = []),
                (this.int64Data = []),
                (this.externalData = []),
                (this.doubleData = []),
                (this.uint64Data = []),
                e)
              )
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            return (
              (e.prototype.dims = u.emptyArray),
              (e.prototype.dataType = 0),
              (e.prototype.segment = null),
              (e.prototype.floatData = u.emptyArray),
              (e.prototype.int32Data = u.emptyArray),
              (e.prototype.stringData = u.emptyArray),
              (e.prototype.int64Data = u.emptyArray),
              (e.prototype.name = ''),
              (e.prototype.docString = ''),
              (e.prototype.rawData = u.newBuffer([])),
              (e.prototype.externalData = u.emptyArray),
              (e.prototype.dataLocation = 0),
              (e.prototype.doubleData = u.emptyArray),
              (e.prototype.uint64Data = u.emptyArray),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                if ((t || (t = A.create()), null != e.dims && e.dims.length)) {
                  t.uint32(10).fork()
                  for (var n = 0; n < e.dims.length; ++n) t.int64(e.dims[n])
                  t.ldelim()
                }
                if (
                  (null != e.dataType &&
                    e.hasOwnProperty('dataType') &&
                    t.uint32(16).int32(e.dataType),
                  null != e.segment &&
                    e.hasOwnProperty('segment') &&
                    l.onnx.TensorProto.Segment.encode(e.segment, t.uint32(26).fork()).ldelim(),
                  null != e.floatData && e.floatData.length)
                ) {
                  for (t.uint32(34).fork(), n = 0; n < e.floatData.length; ++n)
                    t.float(e.floatData[n])
                  t.ldelim()
                }
                if (null != e.int32Data && e.int32Data.length) {
                  for (t.uint32(42).fork(), n = 0; n < e.int32Data.length; ++n)
                    t.int32(e.int32Data[n])
                  t.ldelim()
                }
                if (null != e.stringData && e.stringData.length)
                  for (n = 0; n < e.stringData.length; ++n) t.uint32(50).bytes(e.stringData[n])
                if (null != e.int64Data && e.int64Data.length) {
                  for (t.uint32(58).fork(), n = 0; n < e.int64Data.length; ++n)
                    t.int64(e.int64Data[n])
                  t.ldelim()
                }
                if (
                  (null != e.name && e.hasOwnProperty('name') && t.uint32(66).string(e.name),
                  null != e.rawData && e.hasOwnProperty('rawData') && t.uint32(74).bytes(e.rawData),
                  null != e.doubleData && e.doubleData.length)
                ) {
                  for (t.uint32(82).fork(), n = 0; n < e.doubleData.length; ++n)
                    t.double(e.doubleData[n])
                  t.ldelim()
                }
                if (null != e.uint64Data && e.uint64Data.length) {
                  for (t.uint32(90).fork(), n = 0; n < e.uint64Data.length; ++n)
                    t.uint64(e.uint64Data[n])
                  t.ldelim()
                }
                if (
                  (null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    t.uint32(98).string(e.docString),
                  null != e.externalData && e.externalData.length)
                )
                  for (n = 0; n < e.externalData.length; ++n)
                    l.onnx.StringStringEntryProto.encode(
                      e.externalData[n],
                      t.uint32(106).fork()
                    ).ldelim()
                return (
                  null != e.dataLocation &&
                    e.hasOwnProperty('dataLocation') &&
                    t.uint32(112).int32(e.dataLocation),
                  t
                )
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.TensorProto();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  switch (o >>> 3) {
                    case 1:
                      if (((r.dims && r.dims.length) || (r.dims = []), 2 == (7 & o)))
                        for (var i = e.uint32() + e.pos; e.pos < i; ) r.dims.push(e.int64())
                      else r.dims.push(e.int64())
                      break
                    case 2:
                      r.dataType = e.int32()
                      break
                    case 3:
                      r.segment = l.onnx.TensorProto.Segment.decode(e, e.uint32())
                      break
                    case 4:
                      if (((r.floatData && r.floatData.length) || (r.floatData = []), 2 == (7 & o)))
                        for (i = e.uint32() + e.pos; e.pos < i; ) r.floatData.push(e.float())
                      else r.floatData.push(e.float())
                      break
                    case 5:
                      if (((r.int32Data && r.int32Data.length) || (r.int32Data = []), 2 == (7 & o)))
                        for (i = e.uint32() + e.pos; e.pos < i; ) r.int32Data.push(e.int32())
                      else r.int32Data.push(e.int32())
                      break
                    case 6:
                      ;((r.stringData && r.stringData.length) || (r.stringData = []),
                        r.stringData.push(e.bytes()))
                      break
                    case 7:
                      if (((r.int64Data && r.int64Data.length) || (r.int64Data = []), 2 == (7 & o)))
                        for (i = e.uint32() + e.pos; e.pos < i; ) r.int64Data.push(e.int64())
                      else r.int64Data.push(e.int64())
                      break
                    case 8:
                      r.name = e.string()
                      break
                    case 12:
                      r.docString = e.string()
                      break
                    case 9:
                      r.rawData = e.bytes()
                      break
                    case 13:
                      ;((r.externalData && r.externalData.length) || (r.externalData = []),
                        r.externalData.push(l.onnx.StringStringEntryProto.decode(e, e.uint32())))
                      break
                    case 14:
                      r.dataLocation = e.int32()
                      break
                    case 10:
                      if (
                        ((r.doubleData && r.doubleData.length) || (r.doubleData = []), 2 == (7 & o))
                      )
                        for (i = e.uint32() + e.pos; e.pos < i; ) r.doubleData.push(e.double())
                      else r.doubleData.push(e.double())
                      break
                    case 11:
                      if (
                        ((r.uint64Data && r.uint64Data.length) || (r.uint64Data = []), 2 == (7 & o))
                      )
                        for (i = e.uint32() + e.pos; e.pos < i; ) r.uint64Data.push(e.uint64())
                      else r.uint64Data.push(e.uint64())
                      break
                    default:
                      e.skipType(7 & o)
                  }
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                if ('object' != typeof e || null === e) return 'object expected'
                if (null != e.dims && e.hasOwnProperty('dims')) {
                  if (!Array.isArray(e.dims)) return 'dims: array expected'
                  for (var t = 0; t < e.dims.length; ++t)
                    if (
                      !(
                        u.isInteger(e.dims[t]) ||
                        (e.dims[t] && u.isInteger(e.dims[t].low) && u.isInteger(e.dims[t].high))
                      )
                    )
                      return 'dims: integer|Long[] expected'
                }
                if (null != e.dataType && e.hasOwnProperty('dataType') && !u.isInteger(e.dataType))
                  return 'dataType: integer expected'
                if (
                  null != e.segment &&
                  e.hasOwnProperty('segment') &&
                  (n = l.onnx.TensorProto.Segment.verify(e.segment))
                )
                  return 'segment.' + n
                if (null != e.floatData && e.hasOwnProperty('floatData')) {
                  if (!Array.isArray(e.floatData)) return 'floatData: array expected'
                  for (t = 0; t < e.floatData.length; ++t)
                    if ('number' != typeof e.floatData[t]) return 'floatData: number[] expected'
                }
                if (null != e.int32Data && e.hasOwnProperty('int32Data')) {
                  if (!Array.isArray(e.int32Data)) return 'int32Data: array expected'
                  for (t = 0; t < e.int32Data.length; ++t)
                    if (!u.isInteger(e.int32Data[t])) return 'int32Data: integer[] expected'
                }
                if (null != e.stringData && e.hasOwnProperty('stringData')) {
                  if (!Array.isArray(e.stringData)) return 'stringData: array expected'
                  for (t = 0; t < e.stringData.length; ++t)
                    if (
                      !(
                        (e.stringData[t] && 'number' == typeof e.stringData[t].length) ||
                        u.isString(e.stringData[t])
                      )
                    )
                      return 'stringData: buffer[] expected'
                }
                if (null != e.int64Data && e.hasOwnProperty('int64Data')) {
                  if (!Array.isArray(e.int64Data)) return 'int64Data: array expected'
                  for (t = 0; t < e.int64Data.length; ++t)
                    if (
                      !(
                        u.isInteger(e.int64Data[t]) ||
                        (e.int64Data[t] &&
                          u.isInteger(e.int64Data[t].low) &&
                          u.isInteger(e.int64Data[t].high))
                      )
                    )
                      return 'int64Data: integer|Long[] expected'
                }
                if (null != e.name && e.hasOwnProperty('name') && !u.isString(e.name))
                  return 'name: string expected'
                if (
                  null != e.docString &&
                  e.hasOwnProperty('docString') &&
                  !u.isString(e.docString)
                )
                  return 'docString: string expected'
                if (
                  null != e.rawData &&
                  e.hasOwnProperty('rawData') &&
                  !((e.rawData && 'number' == typeof e.rawData.length) || u.isString(e.rawData))
                )
                  return 'rawData: buffer expected'
                if (null != e.externalData && e.hasOwnProperty('externalData')) {
                  if (!Array.isArray(e.externalData)) return 'externalData: array expected'
                  for (t = 0; t < e.externalData.length; ++t) {
                    var n
                    if ((n = l.onnx.StringStringEntryProto.verify(e.externalData[t])))
                      return 'externalData.' + n
                  }
                }
                if (null != e.dataLocation && e.hasOwnProperty('dataLocation'))
                  switch (e.dataLocation) {
                    default:
                      return 'dataLocation: enum value expected'
                    case 0:
                    case 1:
                  }
                if (null != e.doubleData && e.hasOwnProperty('doubleData')) {
                  if (!Array.isArray(e.doubleData)) return 'doubleData: array expected'
                  for (t = 0; t < e.doubleData.length; ++t)
                    if ('number' != typeof e.doubleData[t]) return 'doubleData: number[] expected'
                }
                if (null != e.uint64Data && e.hasOwnProperty('uint64Data')) {
                  if (!Array.isArray(e.uint64Data)) return 'uint64Data: array expected'
                  for (t = 0; t < e.uint64Data.length; ++t)
                    if (
                      !(
                        u.isInteger(e.uint64Data[t]) ||
                        (e.uint64Data[t] &&
                          u.isInteger(e.uint64Data[t].low) &&
                          u.isInteger(e.uint64Data[t].high))
                      )
                    )
                      return 'uint64Data: integer|Long[] expected'
                }
                return null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.TensorProto) return e
                var t = new l.onnx.TensorProto()
                if (e.dims) {
                  if (!Array.isArray(e.dims))
                    throw TypeError('.onnx.TensorProto.dims: array expected')
                  t.dims = []
                  for (var n = 0; n < e.dims.length; ++n)
                    u.Long
                      ? ((t.dims[n] = u.Long.fromValue(e.dims[n])).unsigned = !1)
                      : 'string' == typeof e.dims[n]
                        ? (t.dims[n] = parseInt(e.dims[n], 10))
                        : 'number' == typeof e.dims[n]
                          ? (t.dims[n] = e.dims[n])
                          : 'object' == typeof e.dims[n] &&
                            (t.dims[n] = new u.LongBits(
                              e.dims[n].low >>> 0,
                              e.dims[n].high >>> 0
                            ).toNumber())
                }
                if ((null != e.dataType && (t.dataType = 0 | e.dataType), null != e.segment)) {
                  if ('object' != typeof e.segment)
                    throw TypeError('.onnx.TensorProto.segment: object expected')
                  t.segment = l.onnx.TensorProto.Segment.fromObject(e.segment)
                }
                if (e.floatData) {
                  if (!Array.isArray(e.floatData))
                    throw TypeError('.onnx.TensorProto.floatData: array expected')
                  for (t.floatData = [], n = 0; n < e.floatData.length; ++n)
                    t.floatData[n] = Number(e.floatData[n])
                }
                if (e.int32Data) {
                  if (!Array.isArray(e.int32Data))
                    throw TypeError('.onnx.TensorProto.int32Data: array expected')
                  for (t.int32Data = [], n = 0; n < e.int32Data.length; ++n)
                    t.int32Data[n] = 0 | e.int32Data[n]
                }
                if (e.stringData) {
                  if (!Array.isArray(e.stringData))
                    throw TypeError('.onnx.TensorProto.stringData: array expected')
                  for (t.stringData = [], n = 0; n < e.stringData.length; ++n)
                    'string' == typeof e.stringData[n]
                      ? u.base64.decode(
                          e.stringData[n],
                          (t.stringData[n] = u.newBuffer(u.base64.length(e.stringData[n]))),
                          0
                        )
                      : e.stringData[n].length && (t.stringData[n] = e.stringData[n])
                }
                if (e.int64Data) {
                  if (!Array.isArray(e.int64Data))
                    throw TypeError('.onnx.TensorProto.int64Data: array expected')
                  for (t.int64Data = [], n = 0; n < e.int64Data.length; ++n)
                    u.Long
                      ? ((t.int64Data[n] = u.Long.fromValue(e.int64Data[n])).unsigned = !1)
                      : 'string' == typeof e.int64Data[n]
                        ? (t.int64Data[n] = parseInt(e.int64Data[n], 10))
                        : 'number' == typeof e.int64Data[n]
                          ? (t.int64Data[n] = e.int64Data[n])
                          : 'object' == typeof e.int64Data[n] &&
                            (t.int64Data[n] = new u.LongBits(
                              e.int64Data[n].low >>> 0,
                              e.int64Data[n].high >>> 0
                            ).toNumber())
                }
                if (
                  (null != e.name && (t.name = String(e.name)),
                  null != e.docString && (t.docString = String(e.docString)),
                  null != e.rawData &&
                    ('string' == typeof e.rawData
                      ? u.base64.decode(
                          e.rawData,
                          (t.rawData = u.newBuffer(u.base64.length(e.rawData))),
                          0
                        )
                      : e.rawData.length && (t.rawData = e.rawData)),
                  e.externalData)
                ) {
                  if (!Array.isArray(e.externalData))
                    throw TypeError('.onnx.TensorProto.externalData: array expected')
                  for (t.externalData = [], n = 0; n < e.externalData.length; ++n) {
                    if ('object' != typeof e.externalData[n])
                      throw TypeError('.onnx.TensorProto.externalData: object expected')
                    t.externalData[n] = l.onnx.StringStringEntryProto.fromObject(e.externalData[n])
                  }
                }
                switch (e.dataLocation) {
                  case 'DEFAULT':
                  case 0:
                    t.dataLocation = 0
                    break
                  case 'EXTERNAL':
                  case 1:
                    t.dataLocation = 1
                }
                if (e.doubleData) {
                  if (!Array.isArray(e.doubleData))
                    throw TypeError('.onnx.TensorProto.doubleData: array expected')
                  for (t.doubleData = [], n = 0; n < e.doubleData.length; ++n)
                    t.doubleData[n] = Number(e.doubleData[n])
                }
                if (e.uint64Data) {
                  if (!Array.isArray(e.uint64Data))
                    throw TypeError('.onnx.TensorProto.uint64Data: array expected')
                  for (t.uint64Data = [], n = 0; n < e.uint64Data.length; ++n)
                    u.Long
                      ? ((t.uint64Data[n] = u.Long.fromValue(e.uint64Data[n])).unsigned = !0)
                      : 'string' == typeof e.uint64Data[n]
                        ? (t.uint64Data[n] = parseInt(e.uint64Data[n], 10))
                        : 'number' == typeof e.uint64Data[n]
                          ? (t.uint64Data[n] = e.uint64Data[n])
                          : 'object' == typeof e.uint64Data[n] &&
                            (t.uint64Data[n] = new u.LongBits(
                              e.uint64Data[n].low >>> 0,
                              e.uint64Data[n].high >>> 0
                            ).toNumber(!0))
                }
                return t
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                if (
                  ((t.arrays || t.defaults) &&
                    ((n.dims = []),
                    (n.floatData = []),
                    (n.int32Data = []),
                    (n.stringData = []),
                    (n.int64Data = []),
                    (n.doubleData = []),
                    (n.uint64Data = []),
                    (n.externalData = [])),
                  t.defaults &&
                    ((n.dataType = 0),
                    (n.segment = null),
                    (n.name = ''),
                    t.bytes === String
                      ? (n.rawData = '')
                      : ((n.rawData = []),
                        t.bytes !== Array && (n.rawData = u.newBuffer(n.rawData))),
                    (n.docString = ''),
                    (n.dataLocation = t.enums === String ? 'DEFAULT' : 0)),
                  e.dims && e.dims.length)
                ) {
                  n.dims = []
                  for (var r = 0; r < e.dims.length; ++r)
                    'number' == typeof e.dims[r]
                      ? (n.dims[r] = t.longs === String ? String(e.dims[r]) : e.dims[r])
                      : (n.dims[r] =
                          t.longs === String
                            ? u.Long.prototype.toString.call(e.dims[r])
                            : t.longs === Number
                              ? new u.LongBits(e.dims[r].low >>> 0, e.dims[r].high >>> 0).toNumber()
                              : e.dims[r])
                }
                if (
                  (null != e.dataType && e.hasOwnProperty('dataType') && (n.dataType = e.dataType),
                  null != e.segment &&
                    e.hasOwnProperty('segment') &&
                    (n.segment = l.onnx.TensorProto.Segment.toObject(e.segment, t)),
                  e.floatData && e.floatData.length)
                )
                  for (n.floatData = [], r = 0; r < e.floatData.length; ++r)
                    n.floatData[r] =
                      t.json && !isFinite(e.floatData[r]) ? String(e.floatData[r]) : e.floatData[r]
                if (e.int32Data && e.int32Data.length)
                  for (n.int32Data = [], r = 0; r < e.int32Data.length; ++r)
                    n.int32Data[r] = e.int32Data[r]
                if (e.stringData && e.stringData.length)
                  for (n.stringData = [], r = 0; r < e.stringData.length; ++r)
                    n.stringData[r] =
                      t.bytes === String
                        ? u.base64.encode(e.stringData[r], 0, e.stringData[r].length)
                        : t.bytes === Array
                          ? Array.prototype.slice.call(e.stringData[r])
                          : e.stringData[r]
                if (e.int64Data && e.int64Data.length)
                  for (n.int64Data = [], r = 0; r < e.int64Data.length; ++r)
                    'number' == typeof e.int64Data[r]
                      ? (n.int64Data[r] =
                          t.longs === String ? String(e.int64Data[r]) : e.int64Data[r])
                      : (n.int64Data[r] =
                          t.longs === String
                            ? u.Long.prototype.toString.call(e.int64Data[r])
                            : t.longs === Number
                              ? new u.LongBits(
                                  e.int64Data[r].low >>> 0,
                                  e.int64Data[r].high >>> 0
                                ).toNumber()
                              : e.int64Data[r])
                if (
                  (null != e.name && e.hasOwnProperty('name') && (n.name = e.name),
                  null != e.rawData &&
                    e.hasOwnProperty('rawData') &&
                    (n.rawData =
                      t.bytes === String
                        ? u.base64.encode(e.rawData, 0, e.rawData.length)
                        : t.bytes === Array
                          ? Array.prototype.slice.call(e.rawData)
                          : e.rawData),
                  e.doubleData && e.doubleData.length)
                )
                  for (n.doubleData = [], r = 0; r < e.doubleData.length; ++r)
                    n.doubleData[r] =
                      t.json && !isFinite(e.doubleData[r])
                        ? String(e.doubleData[r])
                        : e.doubleData[r]
                if (e.uint64Data && e.uint64Data.length)
                  for (n.uint64Data = [], r = 0; r < e.uint64Data.length; ++r)
                    'number' == typeof e.uint64Data[r]
                      ? (n.uint64Data[r] =
                          t.longs === String ? String(e.uint64Data[r]) : e.uint64Data[r])
                      : (n.uint64Data[r] =
                          t.longs === String
                            ? u.Long.prototype.toString.call(e.uint64Data[r])
                            : t.longs === Number
                              ? new u.LongBits(
                                  e.uint64Data[r].low >>> 0,
                                  e.uint64Data[r].high >>> 0
                                ).toNumber(!0)
                              : e.uint64Data[r])
                if (
                  (null != e.docString &&
                    e.hasOwnProperty('docString') &&
                    (n.docString = e.docString),
                  e.externalData && e.externalData.length)
                )
                  for (n.externalData = [], r = 0; r < e.externalData.length; ++r)
                    n.externalData[r] = l.onnx.StringStringEntryProto.toObject(e.externalData[r], t)
                return (
                  null != e.dataLocation &&
                    e.hasOwnProperty('dataLocation') &&
                    (n.dataLocation =
                      t.enums === String
                        ? l.onnx.TensorProto.DataLocation[e.dataLocation]
                        : e.dataLocation),
                  n
                )
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              (e.DataType = (function () {
                var e = {},
                  t = Object.create(e)
                return (
                  (t[(e[0] = 'UNDEFINED')] = 0),
                  (t[(e[1] = 'FLOAT')] = 1),
                  (t[(e[2] = 'UINT8')] = 2),
                  (t[(e[3] = 'INT8')] = 3),
                  (t[(e[4] = 'UINT16')] = 4),
                  (t[(e[5] = 'INT16')] = 5),
                  (t[(e[6] = 'INT32')] = 6),
                  (t[(e[7] = 'INT64')] = 7),
                  (t[(e[8] = 'STRING')] = 8),
                  (t[(e[9] = 'BOOL')] = 9),
                  (t[(e[10] = 'FLOAT16')] = 10),
                  (t[(e[11] = 'DOUBLE')] = 11),
                  (t[(e[12] = 'UINT32')] = 12),
                  (t[(e[13] = 'UINT64')] = 13),
                  (t[(e[14] = 'COMPLEX64')] = 14),
                  (t[(e[15] = 'COMPLEX128')] = 15),
                  (t[(e[16] = 'BFLOAT16')] = 16),
                  t
                )
              })()),
              (e.Segment = (function () {
                function e(e) {
                  if (e)
                    for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                      null != e[t[n]] && (this[t[n]] = e[t[n]])
                }
                return (
                  (e.prototype.begin = u.Long ? u.Long.fromBits(0, 0, !1) : 0),
                  (e.prototype.end = u.Long ? u.Long.fromBits(0, 0, !1) : 0),
                  (e.create = function (t) {
                    return new e(t)
                  }),
                  (e.encode = function (e, t) {
                    return (
                      t || (t = A.create()),
                      null != e.begin && e.hasOwnProperty('begin') && t.uint32(8).int64(e.begin),
                      null != e.end && e.hasOwnProperty('end') && t.uint32(16).int64(e.end),
                      t
                    )
                  }),
                  (e.encodeDelimited = function (e, t) {
                    return this.encode(e, t).ldelim()
                  }),
                  (e.decode = function (e, t) {
                    e instanceof a || (e = a.create(e))
                    for (
                      var n = void 0 === t ? e.len : e.pos + t,
                        r = new l.onnx.TensorProto.Segment();
                      e.pos < n;

                    ) {
                      var o = e.uint32()
                      switch (o >>> 3) {
                        case 1:
                          r.begin = e.int64()
                          break
                        case 2:
                          r.end = e.int64()
                          break
                        default:
                          e.skipType(7 & o)
                      }
                    }
                    return r
                  }),
                  (e.decodeDelimited = function (e) {
                    return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
                  }),
                  (e.verify = function (e) {
                    return 'object' != typeof e || null === e
                      ? 'object expected'
                      : null != e.begin &&
                          e.hasOwnProperty('begin') &&
                          !(
                            u.isInteger(e.begin) ||
                            (e.begin && u.isInteger(e.begin.low) && u.isInteger(e.begin.high))
                          )
                        ? 'begin: integer|Long expected'
                        : null != e.end &&
                            e.hasOwnProperty('end') &&
                            !(
                              u.isInteger(e.end) ||
                              (e.end && u.isInteger(e.end.low) && u.isInteger(e.end.high))
                            )
                          ? 'end: integer|Long expected'
                          : null
                  }),
                  (e.fromObject = function (e) {
                    if (e instanceof l.onnx.TensorProto.Segment) return e
                    var t = new l.onnx.TensorProto.Segment()
                    return (
                      null != e.begin &&
                        (u.Long
                          ? ((t.begin = u.Long.fromValue(e.begin)).unsigned = !1)
                          : 'string' == typeof e.begin
                            ? (t.begin = parseInt(e.begin, 10))
                            : 'number' == typeof e.begin
                              ? (t.begin = e.begin)
                              : 'object' == typeof e.begin &&
                                (t.begin = new u.LongBits(
                                  e.begin.low >>> 0,
                                  e.begin.high >>> 0
                                ).toNumber())),
                      null != e.end &&
                        (u.Long
                          ? ((t.end = u.Long.fromValue(e.end)).unsigned = !1)
                          : 'string' == typeof e.end
                            ? (t.end = parseInt(e.end, 10))
                            : 'number' == typeof e.end
                              ? (t.end = e.end)
                              : 'object' == typeof e.end &&
                                (t.end = new u.LongBits(
                                  e.end.low >>> 0,
                                  e.end.high >>> 0
                                ).toNumber())),
                      t
                    )
                  }),
                  (e.toObject = function (e, t) {
                    t || (t = {})
                    var n = {}
                    if (t.defaults) {
                      if (u.Long) {
                        var r = new u.Long(0, 0, !1)
                        n.begin =
                          t.longs === String ? r.toString() : t.longs === Number ? r.toNumber() : r
                      } else n.begin = t.longs === String ? '0' : 0
                      u.Long
                        ? ((r = new u.Long(0, 0, !1)),
                          (n.end =
                            t.longs === String
                              ? r.toString()
                              : t.longs === Number
                                ? r.toNumber()
                                : r))
                        : (n.end = t.longs === String ? '0' : 0)
                    }
                    return (
                      null != e.begin &&
                        e.hasOwnProperty('begin') &&
                        ('number' == typeof e.begin
                          ? (n.begin = t.longs === String ? String(e.begin) : e.begin)
                          : (n.begin =
                              t.longs === String
                                ? u.Long.prototype.toString.call(e.begin)
                                : t.longs === Number
                                  ? new u.LongBits(e.begin.low >>> 0, e.begin.high >>> 0).toNumber()
                                  : e.begin)),
                      null != e.end &&
                        e.hasOwnProperty('end') &&
                        ('number' == typeof e.end
                          ? (n.end = t.longs === String ? String(e.end) : e.end)
                          : (n.end =
                              t.longs === String
                                ? u.Long.prototype.toString.call(e.end)
                                : t.longs === Number
                                  ? new u.LongBits(e.end.low >>> 0, e.end.high >>> 0).toNumber()
                                  : e.end)),
                      n
                    )
                  }),
                  (e.prototype.toJSON = function () {
                    return this.constructor.toObject(this, s.util.toJSONOptions)
                  }),
                  e
                )
              })()),
              (e.DataLocation = (function () {
                var e = {},
                  t = Object.create(e)
                return ((t[(e[0] = 'DEFAULT')] = 0), (t[(e[1] = 'EXTERNAL')] = 1), t)
              })()),
              e
            )
          })()),
          (i.TensorShapeProto = (function () {
            function e(e) {
              if (((this.dim = []), e))
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            return (
              (e.prototype.dim = u.emptyArray),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                if ((t || (t = A.create()), null != e.dim && e.dim.length))
                  for (var n = 0; n < e.dim.length; ++n)
                    l.onnx.TensorShapeProto.Dimension.encode(e.dim[n], t.uint32(10).fork()).ldelim()
                return t
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.TensorShapeProto();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  o >>> 3 == 1
                    ? ((r.dim && r.dim.length) || (r.dim = []),
                      r.dim.push(l.onnx.TensorShapeProto.Dimension.decode(e, e.uint32())))
                    : e.skipType(7 & o)
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                if ('object' != typeof e || null === e) return 'object expected'
                if (null != e.dim && e.hasOwnProperty('dim')) {
                  if (!Array.isArray(e.dim)) return 'dim: array expected'
                  for (var t = 0; t < e.dim.length; ++t) {
                    var n = l.onnx.TensorShapeProto.Dimension.verify(e.dim[t])
                    if (n) return 'dim.' + n
                  }
                }
                return null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.TensorShapeProto) return e
                var t = new l.onnx.TensorShapeProto()
                if (e.dim) {
                  if (!Array.isArray(e.dim))
                    throw TypeError('.onnx.TensorShapeProto.dim: array expected')
                  t.dim = []
                  for (var n = 0; n < e.dim.length; ++n) {
                    if ('object' != typeof e.dim[n])
                      throw TypeError('.onnx.TensorShapeProto.dim: object expected')
                    t.dim[n] = l.onnx.TensorShapeProto.Dimension.fromObject(e.dim[n])
                  }
                }
                return t
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                if (((t.arrays || t.defaults) && (n.dim = []), e.dim && e.dim.length)) {
                  n.dim = []
                  for (var r = 0; r < e.dim.length; ++r)
                    n.dim[r] = l.onnx.TensorShapeProto.Dimension.toObject(e.dim[r], t)
                }
                return n
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              (e.Dimension = (function () {
                function e(e) {
                  if (e)
                    for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                      null != e[t[n]] && (this[t[n]] = e[t[n]])
                }
                var t
                return (
                  (e.prototype.dimValue = u.Long ? u.Long.fromBits(0, 0, !1) : 0),
                  (e.prototype.dimParam = ''),
                  (e.prototype.denotation = ''),
                  Object.defineProperty(e.prototype, 'value', {
                    get: u.oneOfGetter((t = ['dimValue', 'dimParam'])),
                    set: u.oneOfSetter(t),
                  }),
                  (e.create = function (t) {
                    return new e(t)
                  }),
                  (e.encode = function (e, t) {
                    return (
                      t || (t = A.create()),
                      null != e.dimValue &&
                        e.hasOwnProperty('dimValue') &&
                        t.uint32(8).int64(e.dimValue),
                      null != e.dimParam &&
                        e.hasOwnProperty('dimParam') &&
                        t.uint32(18).string(e.dimParam),
                      null != e.denotation &&
                        e.hasOwnProperty('denotation') &&
                        t.uint32(26).string(e.denotation),
                      t
                    )
                  }),
                  (e.encodeDelimited = function (e, t) {
                    return this.encode(e, t).ldelim()
                  }),
                  (e.decode = function (e, t) {
                    e instanceof a || (e = a.create(e))
                    for (
                      var n = void 0 === t ? e.len : e.pos + t,
                        r = new l.onnx.TensorShapeProto.Dimension();
                      e.pos < n;

                    ) {
                      var o = e.uint32()
                      switch (o >>> 3) {
                        case 1:
                          r.dimValue = e.int64()
                          break
                        case 2:
                          r.dimParam = e.string()
                          break
                        case 3:
                          r.denotation = e.string()
                          break
                        default:
                          e.skipType(7 & o)
                      }
                    }
                    return r
                  }),
                  (e.decodeDelimited = function (e) {
                    return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
                  }),
                  (e.verify = function (e) {
                    if ('object' != typeof e || null === e) return 'object expected'
                    var t = {}
                    if (
                      null != e.dimValue &&
                      e.hasOwnProperty('dimValue') &&
                      ((t.value = 1),
                      !(
                        u.isInteger(e.dimValue) ||
                        (e.dimValue && u.isInteger(e.dimValue.low) && u.isInteger(e.dimValue.high))
                      ))
                    )
                      return 'dimValue: integer|Long expected'
                    if (null != e.dimParam && e.hasOwnProperty('dimParam')) {
                      if (1 === t.value) return 'value: multiple values'
                      if (((t.value = 1), !u.isString(e.dimParam)))
                        return 'dimParam: string expected'
                    }
                    return null != e.denotation &&
                      e.hasOwnProperty('denotation') &&
                      !u.isString(e.denotation)
                      ? 'denotation: string expected'
                      : null
                  }),
                  (e.fromObject = function (e) {
                    if (e instanceof l.onnx.TensorShapeProto.Dimension) return e
                    var t = new l.onnx.TensorShapeProto.Dimension()
                    return (
                      null != e.dimValue &&
                        (u.Long
                          ? ((t.dimValue = u.Long.fromValue(e.dimValue)).unsigned = !1)
                          : 'string' == typeof e.dimValue
                            ? (t.dimValue = parseInt(e.dimValue, 10))
                            : 'number' == typeof e.dimValue
                              ? (t.dimValue = e.dimValue)
                              : 'object' == typeof e.dimValue &&
                                (t.dimValue = new u.LongBits(
                                  e.dimValue.low >>> 0,
                                  e.dimValue.high >>> 0
                                ).toNumber())),
                      null != e.dimParam && (t.dimParam = String(e.dimParam)),
                      null != e.denotation && (t.denotation = String(e.denotation)),
                      t
                    )
                  }),
                  (e.toObject = function (e, t) {
                    t || (t = {})
                    var n = {}
                    return (
                      t.defaults && (n.denotation = ''),
                      null != e.dimValue &&
                        e.hasOwnProperty('dimValue') &&
                        ('number' == typeof e.dimValue
                          ? (n.dimValue = t.longs === String ? String(e.dimValue) : e.dimValue)
                          : (n.dimValue =
                              t.longs === String
                                ? u.Long.prototype.toString.call(e.dimValue)
                                : t.longs === Number
                                  ? new u.LongBits(
                                      e.dimValue.low >>> 0,
                                      e.dimValue.high >>> 0
                                    ).toNumber()
                                  : e.dimValue),
                        t.oneofs && (n.value = 'dimValue')),
                      null != e.dimParam &&
                        e.hasOwnProperty('dimParam') &&
                        ((n.dimParam = e.dimParam), t.oneofs && (n.value = 'dimParam')),
                      null != e.denotation &&
                        e.hasOwnProperty('denotation') &&
                        (n.denotation = e.denotation),
                      n
                    )
                  }),
                  (e.prototype.toJSON = function () {
                    return this.constructor.toObject(this, s.util.toJSONOptions)
                  }),
                  e
                )
              })()),
              e
            )
          })()),
          (i.TypeProto = (function () {
            function e(e) {
              if (e)
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            var t
            return (
              (e.prototype.tensorType = null),
              (e.prototype.denotation = ''),
              Object.defineProperty(e.prototype, 'value', {
                get: u.oneOfGetter((t = ['tensorType'])),
                set: u.oneOfSetter(t),
              }),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                return (
                  t || (t = A.create()),
                  null != e.tensorType &&
                    e.hasOwnProperty('tensorType') &&
                    l.onnx.TypeProto.Tensor.encode(e.tensorType, t.uint32(10).fork()).ldelim(),
                  null != e.denotation &&
                    e.hasOwnProperty('denotation') &&
                    t.uint32(50).string(e.denotation),
                  t
                )
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.TypeProto();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  switch (o >>> 3) {
                    case 1:
                      r.tensorType = l.onnx.TypeProto.Tensor.decode(e, e.uint32())
                      break
                    case 6:
                      r.denotation = e.string()
                      break
                    default:
                      e.skipType(7 & o)
                  }
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                if ('object' != typeof e || null === e) return 'object expected'
                if (null != e.tensorType && e.hasOwnProperty('tensorType')) {
                  var t = l.onnx.TypeProto.Tensor.verify(e.tensorType)
                  if (t) return 'tensorType.' + t
                }
                return null != e.denotation &&
                  e.hasOwnProperty('denotation') &&
                  !u.isString(e.denotation)
                  ? 'denotation: string expected'
                  : null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.TypeProto) return e
                var t = new l.onnx.TypeProto()
                if (null != e.tensorType) {
                  if ('object' != typeof e.tensorType)
                    throw TypeError('.onnx.TypeProto.tensorType: object expected')
                  t.tensorType = l.onnx.TypeProto.Tensor.fromObject(e.tensorType)
                }
                return (null != e.denotation && (t.denotation = String(e.denotation)), t)
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                return (
                  t.defaults && (n.denotation = ''),
                  null != e.tensorType &&
                    e.hasOwnProperty('tensorType') &&
                    ((n.tensorType = l.onnx.TypeProto.Tensor.toObject(e.tensorType, t)),
                    t.oneofs && (n.value = 'tensorType')),
                  null != e.denotation &&
                    e.hasOwnProperty('denotation') &&
                    (n.denotation = e.denotation),
                  n
                )
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              (e.Tensor = (function () {
                function e(e) {
                  if (e)
                    for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                      null != e[t[n]] && (this[t[n]] = e[t[n]])
                }
                return (
                  (e.prototype.elemType = 0),
                  (e.prototype.shape = null),
                  (e.create = function (t) {
                    return new e(t)
                  }),
                  (e.encode = function (e, t) {
                    return (
                      t || (t = A.create()),
                      null != e.elemType &&
                        e.hasOwnProperty('elemType') &&
                        t.uint32(8).int32(e.elemType),
                      null != e.shape &&
                        e.hasOwnProperty('shape') &&
                        l.onnx.TensorShapeProto.encode(e.shape, t.uint32(18).fork()).ldelim(),
                      t
                    )
                  }),
                  (e.encodeDelimited = function (e, t) {
                    return this.encode(e, t).ldelim()
                  }),
                  (e.decode = function (e, t) {
                    e instanceof a || (e = a.create(e))
                    for (
                      var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.TypeProto.Tensor();
                      e.pos < n;

                    ) {
                      var o = e.uint32()
                      switch (o >>> 3) {
                        case 1:
                          r.elemType = e.int32()
                          break
                        case 2:
                          r.shape = l.onnx.TensorShapeProto.decode(e, e.uint32())
                          break
                        default:
                          e.skipType(7 & o)
                      }
                    }
                    return r
                  }),
                  (e.decodeDelimited = function (e) {
                    return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
                  }),
                  (e.verify = function (e) {
                    if ('object' != typeof e || null === e) return 'object expected'
                    if (
                      null != e.elemType &&
                      e.hasOwnProperty('elemType') &&
                      !u.isInteger(e.elemType)
                    )
                      return 'elemType: integer expected'
                    if (null != e.shape && e.hasOwnProperty('shape')) {
                      var t = l.onnx.TensorShapeProto.verify(e.shape)
                      if (t) return 'shape.' + t
                    }
                    return null
                  }),
                  (e.fromObject = function (e) {
                    if (e instanceof l.onnx.TypeProto.Tensor) return e
                    var t = new l.onnx.TypeProto.Tensor()
                    if ((null != e.elemType && (t.elemType = 0 | e.elemType), null != e.shape)) {
                      if ('object' != typeof e.shape)
                        throw TypeError('.onnx.TypeProto.Tensor.shape: object expected')
                      t.shape = l.onnx.TensorShapeProto.fromObject(e.shape)
                    }
                    return t
                  }),
                  (e.toObject = function (e, t) {
                    t || (t = {})
                    var n = {}
                    return (
                      t.defaults && ((n.elemType = 0), (n.shape = null)),
                      null != e.elemType &&
                        e.hasOwnProperty('elemType') &&
                        (n.elemType = e.elemType),
                      null != e.shape &&
                        e.hasOwnProperty('shape') &&
                        (n.shape = l.onnx.TensorShapeProto.toObject(e.shape, t)),
                      n
                    )
                  }),
                  (e.prototype.toJSON = function () {
                    return this.constructor.toObject(this, s.util.toJSONOptions)
                  }),
                  e
                )
              })()),
              e
            )
          })()),
          (i.OperatorSetIdProto = (function () {
            function e(e) {
              if (e)
                for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                  null != e[t[n]] && (this[t[n]] = e[t[n]])
            }
            return (
              (e.prototype.domain = ''),
              (e.prototype.version = u.Long ? u.Long.fromBits(0, 0, !1) : 0),
              (e.create = function (t) {
                return new e(t)
              }),
              (e.encode = function (e, t) {
                return (
                  t || (t = A.create()),
                  null != e.domain && e.hasOwnProperty('domain') && t.uint32(10).string(e.domain),
                  null != e.version && e.hasOwnProperty('version') && t.uint32(16).int64(e.version),
                  t
                )
              }),
              (e.encodeDelimited = function (e, t) {
                return this.encode(e, t).ldelim()
              }),
              (e.decode = function (e, t) {
                e instanceof a || (e = a.create(e))
                for (
                  var n = void 0 === t ? e.len : e.pos + t, r = new l.onnx.OperatorSetIdProto();
                  e.pos < n;

                ) {
                  var o = e.uint32()
                  switch (o >>> 3) {
                    case 1:
                      r.domain = e.string()
                      break
                    case 2:
                      r.version = e.int64()
                      break
                    default:
                      e.skipType(7 & o)
                  }
                }
                return r
              }),
              (e.decodeDelimited = function (e) {
                return (e instanceof a || (e = new a(e)), this.decode(e, e.uint32()))
              }),
              (e.verify = function (e) {
                return 'object' != typeof e || null === e
                  ? 'object expected'
                  : null != e.domain && e.hasOwnProperty('domain') && !u.isString(e.domain)
                    ? 'domain: string expected'
                    : null != e.version &&
                        e.hasOwnProperty('version') &&
                        !(
                          u.isInteger(e.version) ||
                          (e.version && u.isInteger(e.version.low) && u.isInteger(e.version.high))
                        )
                      ? 'version: integer|Long expected'
                      : null
              }),
              (e.fromObject = function (e) {
                if (e instanceof l.onnx.OperatorSetIdProto) return e
                var t = new l.onnx.OperatorSetIdProto()
                return (
                  null != e.domain && (t.domain = String(e.domain)),
                  null != e.version &&
                    (u.Long
                      ? ((t.version = u.Long.fromValue(e.version)).unsigned = !1)
                      : 'string' == typeof e.version
                        ? (t.version = parseInt(e.version, 10))
                        : 'number' == typeof e.version
                          ? (t.version = e.version)
                          : 'object' == typeof e.version &&
                            (t.version = new u.LongBits(
                              e.version.low >>> 0,
                              e.version.high >>> 0
                            ).toNumber())),
                  t
                )
              }),
              (e.toObject = function (e, t) {
                t || (t = {})
                var n = {}
                if (t.defaults)
                  if (((n.domain = ''), u.Long)) {
                    var r = new u.Long(0, 0, !1)
                    n.version =
                      t.longs === String ? r.toString() : t.longs === Number ? r.toNumber() : r
                  } else n.version = t.longs === String ? '0' : 0
                return (
                  null != e.domain && e.hasOwnProperty('domain') && (n.domain = e.domain),
                  null != e.version &&
                    e.hasOwnProperty('version') &&
                    ('number' == typeof e.version
                      ? (n.version = t.longs === String ? String(e.version) : e.version)
                      : (n.version =
                          t.longs === String
                            ? u.Long.prototype.toString.call(e.version)
                            : t.longs === Number
                              ? new u.LongBits(e.version.low >>> 0, e.version.high >>> 0).toNumber()
                              : e.version)),
                  n
                )
              }),
              (e.prototype.toJSON = function () {
                return this.constructor.toObject(this, s.util.toJSONOptions)
              }),
              e
            )
          })()),
          i)),
          (e.exports = l))
      },
      9591: (e, t, n) => {
        'use strict'
        const { Deflate: r, deflate: o, deflateRaw: i, gzip: s } = n(4555),
          { Inflate: a, inflate: A, inflateRaw: u, ungzip: l } = n(8843),
          g = n(1619)
        ;((e.exports.Deflate = r),
          (e.exports.deflate = o),
          (e.exports.deflateRaw = i),
          (e.exports.gzip = s),
          (e.exports.Inflate = a),
          (e.exports.inflate = A),
          (e.exports.inflateRaw = u),
          (e.exports.ungzip = l),
          (e.exports.constants = g))
      },
      4555: (e, t, n) => {
        'use strict'
        const r = n(405),
          o = n(4236),
          i = n(9373),
          s = n(8898),
          a = n(2292),
          A = Object.prototype.toString,
          {
            Z_NO_FLUSH: u,
            Z_SYNC_FLUSH: l,
            Z_FULL_FLUSH: g,
            Z_FINISH: c,
            Z_OK: d,
            Z_STREAM_END: p,
            Z_DEFAULT_COMPRESSION: h,
            Z_DEFAULT_STRATEGY: f,
            Z_DEFLATED: I,
          } = n(1619)
        function m(e) {
          this.options = o.assign(
            { level: h, method: I, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: f },
            e || {}
          )
          let t = this.options
          ;(t.raw && t.windowBits > 0
            ? (t.windowBits = -t.windowBits)
            : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16),
            (this.err = 0),
            (this.msg = ''),
            (this.ended = !1),
            (this.chunks = []),
            (this.strm = new a()),
            (this.strm.avail_out = 0))
          let n = r.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy)
          if (n !== d) throw new Error(s[n])
          if ((t.header && r.deflateSetHeader(this.strm, t.header), t.dictionary)) {
            let e
            if (
              ((e =
                'string' == typeof t.dictionary
                  ? i.string2buf(t.dictionary)
                  : '[object ArrayBuffer]' === A.call(t.dictionary)
                    ? new Uint8Array(t.dictionary)
                    : t.dictionary),
              (n = r.deflateSetDictionary(this.strm, e)),
              n !== d)
            )
              throw new Error(s[n])
            this._dict_set = !0
          }
        }
        function E(e, t) {
          const n = new m(t)
          if ((n.push(e, !0), n.err)) throw n.msg || s[n.err]
          return n.result
        }
        ;((m.prototype.push = function (e, t) {
          const n = this.strm,
            o = this.options.chunkSize
          let s, a
          if (this.ended) return !1
          for (
            a = t === ~~t ? t : !0 === t ? c : u,
              'string' == typeof e
                ? (n.input = i.string2buf(e))
                : '[object ArrayBuffer]' === A.call(e)
                  ? (n.input = new Uint8Array(e))
                  : (n.input = e),
              n.next_in = 0,
              n.avail_in = n.input.length;
            ;

          )
            if (
              (0 === n.avail_out &&
                ((n.output = new Uint8Array(o)), (n.next_out = 0), (n.avail_out = o)),
              (a === l || a === g) && n.avail_out <= 6)
            )
              (this.onData(n.output.subarray(0, n.next_out)), (n.avail_out = 0))
            else {
              if (((s = r.deflate(n, a)), s === p))
                return (
                  n.next_out > 0 && this.onData(n.output.subarray(0, n.next_out)),
                  (s = r.deflateEnd(this.strm)),
                  this.onEnd(s),
                  (this.ended = !0),
                  s === d
                )
              if (0 !== n.avail_out) {
                if (a > 0 && n.next_out > 0)
                  (this.onData(n.output.subarray(0, n.next_out)), (n.avail_out = 0))
                else if (0 === n.avail_in) break
              } else this.onData(n.output)
            }
          return !0
        }),
          (m.prototype.onData = function (e) {
            this.chunks.push(e)
          }),
          (m.prototype.onEnd = function (e) {
            ;(e === d && (this.result = o.flattenChunks(this.chunks)),
              (this.chunks = []),
              (this.err = e),
              (this.msg = this.strm.msg))
          }),
          (e.exports.Deflate = m),
          (e.exports.deflate = E),
          (e.exports.deflateRaw = function (e, t) {
            return (((t = t || {}).raw = !0), E(e, t))
          }),
          (e.exports.gzip = function (e, t) {
            return (((t = t || {}).gzip = !0), E(e, t))
          }),
          (e.exports.constants = n(1619)))
      },
      8843: (e, t, n) => {
        'use strict'
        const r = n(6351),
          o = n(4236),
          i = n(9373),
          s = n(8898),
          a = n(2292),
          A = n(2401),
          u = Object.prototype.toString,
          {
            Z_NO_FLUSH: l,
            Z_FINISH: g,
            Z_OK: c,
            Z_STREAM_END: d,
            Z_NEED_DICT: p,
            Z_STREAM_ERROR: h,
            Z_DATA_ERROR: f,
            Z_MEM_ERROR: I,
          } = n(1619)
        function m(e) {
          this.options = o.assign({ chunkSize: 65536, windowBits: 15, to: '' }, e || {})
          const t = this.options
          ;(t.raw &&
            t.windowBits >= 0 &&
            t.windowBits < 16 &&
            ((t.windowBits = -t.windowBits), 0 === t.windowBits && (t.windowBits = -15)),
            !(t.windowBits >= 0 && t.windowBits < 16) ||
              (e && e.windowBits) ||
              (t.windowBits += 32),
            t.windowBits > 15 && t.windowBits < 48 && (15 & t.windowBits || (t.windowBits |= 15)),
            (this.err = 0),
            (this.msg = ''),
            (this.ended = !1),
            (this.chunks = []),
            (this.strm = new a()),
            (this.strm.avail_out = 0))
          let n = r.inflateInit2(this.strm, t.windowBits)
          if (n !== c) throw new Error(s[n])
          if (
            ((this.header = new A()),
            r.inflateGetHeader(this.strm, this.header),
            t.dictionary &&
              ('string' == typeof t.dictionary
                ? (t.dictionary = i.string2buf(t.dictionary))
                : '[object ArrayBuffer]' === u.call(t.dictionary) &&
                  (t.dictionary = new Uint8Array(t.dictionary)),
              t.raw && ((n = r.inflateSetDictionary(this.strm, t.dictionary)), n !== c)))
          )
            throw new Error(s[n])
        }
        function E(e, t) {
          const n = new m(t)
          if ((n.push(e), n.err)) throw n.msg || s[n.err]
          return n.result
        }
        ;((m.prototype.push = function (e, t) {
          const n = this.strm,
            o = this.options.chunkSize,
            s = this.options.dictionary
          let a, A, m
          if (this.ended) return !1
          for (
            A = t === ~~t ? t : !0 === t ? g : l,
              '[object ArrayBuffer]' === u.call(e) ? (n.input = new Uint8Array(e)) : (n.input = e),
              n.next_in = 0,
              n.avail_in = n.input.length;
            ;

          ) {
            for (
              0 === n.avail_out &&
                ((n.output = new Uint8Array(o)), (n.next_out = 0), (n.avail_out = o)),
                a = r.inflate(n, A),
                a === p &&
                  s &&
                  ((a = r.inflateSetDictionary(n, s)),
                  a === c ? (a = r.inflate(n, A)) : a === f && (a = p));
              n.avail_in > 0 && a === d && n.state.wrap > 0 && 0 !== e[n.next_in];

            )
              (r.inflateReset(n), (a = r.inflate(n, A)))
            switch (a) {
              case h:
              case f:
              case p:
              case I:
                return (this.onEnd(a), (this.ended = !0), !1)
            }
            if (((m = n.avail_out), n.next_out && (0 === n.avail_out || a === d)))
              if ('string' === this.options.to) {
                let e = i.utf8border(n.output, n.next_out),
                  t = n.next_out - e,
                  r = i.buf2string(n.output, e)
                ;((n.next_out = t),
                  (n.avail_out = o - t),
                  t && n.output.set(n.output.subarray(e, e + t), 0),
                  this.onData(r))
              } else
                this.onData(
                  n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out)
                )
            if (a !== c || 0 !== m) {
              if (a === d)
                return ((a = r.inflateEnd(this.strm)), this.onEnd(a), (this.ended = !0), !0)
              if (0 === n.avail_in) break
            }
          }
          return !0
        }),
          (m.prototype.onData = function (e) {
            this.chunks.push(e)
          }),
          (m.prototype.onEnd = function (e) {
            ;(e === c &&
              ('string' === this.options.to
                ? (this.result = this.chunks.join(''))
                : (this.result = o.flattenChunks(this.chunks))),
              (this.chunks = []),
              (this.err = e),
              (this.msg = this.strm.msg))
          }),
          (e.exports.Inflate = m),
          (e.exports.inflate = E),
          (e.exports.inflateRaw = function (e, t) {
            return (((t = t || {}).raw = !0), E(e, t))
          }),
          (e.exports.ungzip = E),
          (e.exports.constants = n(1619)))
      },
      4236: (e) => {
        'use strict'
        const t = (e, t) => Object.prototype.hasOwnProperty.call(e, t)
        ;((e.exports.assign = function (e) {
          const n = Array.prototype.slice.call(arguments, 1)
          for (; n.length; ) {
            const r = n.shift()
            if (r) {
              if ('object' != typeof r) throw new TypeError(r + 'must be non-object')
              for (const n in r) t(r, n) && (e[n] = r[n])
            }
          }
          return e
        }),
          (e.exports.flattenChunks = (e) => {
            let t = 0
            for (let n = 0, r = e.length; n < r; n++) t += e[n].length
            const n = new Uint8Array(t)
            for (let t = 0, r = 0, o = e.length; t < o; t++) {
              let o = e[t]
              ;(n.set(o, r), (r += o.length))
            }
            return n
          }))
      },
      9373: (e) => {
        'use strict'
        let t = !0
        try {
          String.fromCharCode.apply(null, new Uint8Array(1))
        } catch (e) {
          t = !1
        }
        const n = new Uint8Array(256)
        for (let e = 0; e < 256; e++)
          n[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1
        ;((n[254] = n[254] = 1),
          (e.exports.string2buf = (e) => {
            let t,
              n,
              r,
              o,
              i,
              s = e.length,
              a = 0
            for (o = 0; o < s; o++)
              ((n = e.charCodeAt(o)),
                55296 == (64512 & n) &&
                  o + 1 < s &&
                  ((r = e.charCodeAt(o + 1)),
                  56320 == (64512 & r) && ((n = 65536 + ((n - 55296) << 10) + (r - 56320)), o++)),
                (a += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4))
            for (t = new Uint8Array(a), i = 0, o = 0; i < a; o++)
              ((n = e.charCodeAt(o)),
                55296 == (64512 & n) &&
                  o + 1 < s &&
                  ((r = e.charCodeAt(o + 1)),
                  56320 == (64512 & r) && ((n = 65536 + ((n - 55296) << 10) + (r - 56320)), o++)),
                n < 128
                  ? (t[i++] = n)
                  : n < 2048
                    ? ((t[i++] = 192 | (n >>> 6)), (t[i++] = 128 | (63 & n)))
                    : n < 65536
                      ? ((t[i++] = 224 | (n >>> 12)),
                        (t[i++] = 128 | ((n >>> 6) & 63)),
                        (t[i++] = 128 | (63 & n)))
                      : ((t[i++] = 240 | (n >>> 18)),
                        (t[i++] = 128 | ((n >>> 12) & 63)),
                        (t[i++] = 128 | ((n >>> 6) & 63)),
                        (t[i++] = 128 | (63 & n))))
            return t
          }),
          (e.exports.buf2string = (e, r) => {
            let o, i
            const s = r || e.length,
              a = new Array(2 * s)
            for (i = 0, o = 0; o < s; ) {
              let t = e[o++]
              if (t < 128) {
                a[i++] = t
                continue
              }
              let r = n[t]
              if (r > 4) ((a[i++] = 65533), (o += r - 1))
              else {
                for (t &= 2 === r ? 31 : 3 === r ? 15 : 7; r > 1 && o < s; )
                  ((t = (t << 6) | (63 & e[o++])), r--)
                r > 1
                  ? (a[i++] = 65533)
                  : t < 65536
                    ? (a[i++] = t)
                    : ((t -= 65536),
                      (a[i++] = 55296 | ((t >> 10) & 1023)),
                      (a[i++] = 56320 | (1023 & t)))
              }
            }
            return ((e, n) => {
              if (n < 65534 && e.subarray && t)
                return String.fromCharCode.apply(null, e.length === n ? e : e.subarray(0, n))
              let r = ''
              for (let t = 0; t < n; t++) r += String.fromCharCode(e[t])
              return r
            })(a, i)
          }),
          (e.exports.utf8border = (e, t) => {
            ;(t = t || e.length) > e.length && (t = e.length)
            let r = t - 1
            for (; r >= 0 && 128 == (192 & e[r]); ) r--
            return r < 0 || 0 === r ? t : r + n[e[r]] > t ? r : t
          }))
      },
      6069: (e) => {
        'use strict'
        e.exports = (e, t, n, r) => {
          let o = 65535 & e,
            i = (e >>> 16) & 65535,
            s = 0
          for (; 0 !== n; ) {
            ;((s = n > 2e3 ? 2e3 : n), (n -= s))
            do {
              ;((o = (o + t[r++]) | 0), (i = (i + o) | 0))
            } while (--s)
            ;((o %= 65521), (i %= 65521))
          }
          return o | (i << 16)
        }
      },
      1619: (e) => {
        'use strict'
        e.exports = {
          Z_NO_FLUSH: 0,
          Z_PARTIAL_FLUSH: 1,
          Z_SYNC_FLUSH: 2,
          Z_FULL_FLUSH: 3,
          Z_FINISH: 4,
          Z_BLOCK: 5,
          Z_TREES: 6,
          Z_OK: 0,
          Z_STREAM_END: 1,
          Z_NEED_DICT: 2,
          Z_ERRNO: -1,
          Z_STREAM_ERROR: -2,
          Z_DATA_ERROR: -3,
          Z_MEM_ERROR: -4,
          Z_BUF_ERROR: -5,
          Z_NO_COMPRESSION: 0,
          Z_BEST_SPEED: 1,
          Z_BEST_COMPRESSION: 9,
          Z_DEFAULT_COMPRESSION: -1,
          Z_FILTERED: 1,
          Z_HUFFMAN_ONLY: 2,
          Z_RLE: 3,
          Z_FIXED: 4,
          Z_DEFAULT_STRATEGY: 0,
          Z_BINARY: 0,
          Z_TEXT: 1,
          Z_UNKNOWN: 2,
          Z_DEFLATED: 8,
        }
      },
      2869: (e) => {
        'use strict'
        const t = new Uint32Array(
          (() => {
            let e,
              t = []
            for (var n = 0; n < 256; n++) {
              e = n
              for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1
              t[n] = e
            }
            return t
          })()
        )
        e.exports = (e, n, r, o) => {
          const i = t,
            s = o + r
          e ^= -1
          for (let t = o; t < s; t++) e = (e >>> 8) ^ i[255 & (e ^ n[t])]
          return -1 ^ e
        }
      },
      405: (e, t, n) => {
        'use strict'
        const {
            _tr_init: r,
            _tr_stored_block: o,
            _tr_flush_block: i,
            _tr_tally: s,
            _tr_align: a,
          } = n(342),
          A = n(6069),
          u = n(2869),
          l = n(8898),
          {
            Z_NO_FLUSH: g,
            Z_PARTIAL_FLUSH: c,
            Z_FULL_FLUSH: d,
            Z_FINISH: p,
            Z_BLOCK: h,
            Z_OK: f,
            Z_STREAM_END: I,
            Z_STREAM_ERROR: m,
            Z_DATA_ERROR: E,
            Z_BUF_ERROR: y,
            Z_DEFAULT_COMPRESSION: C,
            Z_FILTERED: B,
            Z_HUFFMAN_ONLY: _,
            Z_RLE: w,
            Z_FIXED: b,
            Z_DEFAULT_STRATEGY: Q,
            Z_UNKNOWN: x,
            Z_DEFLATED: T,
          } = n(1619),
          D = 258,
          k = 262,
          S = 103,
          v = 113,
          G = 666,
          O = (e, t) => ((e.msg = l[t]), t),
          N = (e) => (e << 1) - (e > 4 ? 9 : 0),
          P = (e) => {
            let t = e.length
            for (; --t >= 0; ) e[t] = 0
          }
        let R = (e, t, n) => ((t << e.hash_shift) ^ n) & e.hash_mask
        const M = (e) => {
            const t = e.state
            let n = t.pending
            ;(n > e.avail_out && (n = e.avail_out),
              0 !== n &&
                (e.output.set(t.pending_buf.subarray(t.pending_out, t.pending_out + n), e.next_out),
                (e.next_out += n),
                (t.pending_out += n),
                (e.total_out += n),
                (e.avail_out -= n),
                (t.pending -= n),
                0 === t.pending && (t.pending_out = 0)))
          },
          U = (e, t) => {
            ;(i(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t),
              (e.block_start = e.strstart),
              M(e.strm))
          },
          F = (e, t) => {
            e.pending_buf[e.pending++] = t
          },
          L = (e, t) => {
            ;((e.pending_buf[e.pending++] = (t >>> 8) & 255),
              (e.pending_buf[e.pending++] = 255 & t))
          },
          q = (e, t, n, r) => {
            let o = e.avail_in
            return (
              o > r && (o = r),
              0 === o
                ? 0
                : ((e.avail_in -= o),
                  t.set(e.input.subarray(e.next_in, e.next_in + o), n),
                  1 === e.state.wrap
                    ? (e.adler = A(e.adler, t, o, n))
                    : 2 === e.state.wrap && (e.adler = u(e.adler, t, o, n)),
                  (e.next_in += o),
                  (e.total_in += o),
                  o)
            )
          },
          H = (e, t) => {
            let n,
              r,
              o = e.max_chain_length,
              i = e.strstart,
              s = e.prev_length,
              a = e.nice_match
            const A = e.strstart > e.w_size - k ? e.strstart - (e.w_size - k) : 0,
              u = e.window,
              l = e.w_mask,
              g = e.prev,
              c = e.strstart + D
            let d = u[i + s - 1],
              p = u[i + s]
            ;(e.prev_length >= e.good_match && (o >>= 2), a > e.lookahead && (a = e.lookahead))
            do {
              if (
                ((n = t),
                u[n + s] === p && u[n + s - 1] === d && u[n] === u[i] && u[++n] === u[i + 1])
              ) {
                ;((i += 2), n++)
                do {} while (
                  u[++i] === u[++n] &&
                  u[++i] === u[++n] &&
                  u[++i] === u[++n] &&
                  u[++i] === u[++n] &&
                  u[++i] === u[++n] &&
                  u[++i] === u[++n] &&
                  u[++i] === u[++n] &&
                  u[++i] === u[++n] &&
                  i < c
                )
                if (((r = D - (c - i)), (i = c - D), r > s)) {
                  if (((e.match_start = t), (s = r), r >= a)) break
                  ;((d = u[i + s - 1]), (p = u[i + s]))
                }
              }
            } while ((t = g[t & l]) > A && 0 !== --o)
            return s <= e.lookahead ? s : e.lookahead
          },
          J = (e) => {
            const t = e.w_size
            let n, r, o, i, s
            do {
              if (((i = e.window_size - e.lookahead - e.strstart), e.strstart >= t + (t - k))) {
                ;(e.window.set(e.window.subarray(t, t + t), 0),
                  (e.match_start -= t),
                  (e.strstart -= t),
                  (e.block_start -= t),
                  (r = e.hash_size),
                  (n = r))
                do {
                  ;((o = e.head[--n]), (e.head[n] = o >= t ? o - t : 0))
                } while (--r)
                ;((r = t), (n = r))
                do {
                  ;((o = e.prev[--n]), (e.prev[n] = o >= t ? o - t : 0))
                } while (--r)
                i += t
              }
              if (0 === e.strm.avail_in) break
              if (
                ((r = q(e.strm, e.window, e.strstart + e.lookahead, i)),
                (e.lookahead += r),
                e.lookahead + e.insert >= 3)
              )
                for (
                  s = e.strstart - e.insert,
                    e.ins_h = e.window[s],
                    e.ins_h = R(e, e.ins_h, e.window[s + 1]);
                  e.insert &&
                  ((e.ins_h = R(e, e.ins_h, e.window[s + 3 - 1])),
                  (e.prev[s & e.w_mask] = e.head[e.ins_h]),
                  (e.head[e.ins_h] = s),
                  s++,
                  e.insert--,
                  !(e.lookahead + e.insert < 3));

                );
            } while (e.lookahead < k && 0 !== e.strm.avail_in)
          },
          W = (e, t) => {
            let n, r
            for (;;) {
              if (e.lookahead < k) {
                if ((J(e), e.lookahead < k && t === g)) return 1
                if (0 === e.lookahead) break
              }
              if (
                ((n = 0),
                e.lookahead >= 3 &&
                  ((e.ins_h = R(e, e.ins_h, e.window[e.strstart + 3 - 1])),
                  (n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                  (e.head[e.ins_h] = e.strstart)),
                0 !== n && e.strstart - n <= e.w_size - k && (e.match_length = H(e, n)),
                e.match_length >= 3)
              )
                if (
                  ((r = s(e, e.strstart - e.match_start, e.match_length - 3)),
                  (e.lookahead -= e.match_length),
                  e.match_length <= e.max_lazy_match && e.lookahead >= 3)
                ) {
                  e.match_length--
                  do {
                    ;(e.strstart++,
                      (e.ins_h = R(e, e.ins_h, e.window[e.strstart + 3 - 1])),
                      (n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                      (e.head[e.ins_h] = e.strstart))
                  } while (0 !== --e.match_length)
                  e.strstart++
                } else
                  ((e.strstart += e.match_length),
                    (e.match_length = 0),
                    (e.ins_h = e.window[e.strstart]),
                    (e.ins_h = R(e, e.ins_h, e.window[e.strstart + 1])))
              else ((r = s(e, 0, e.window[e.strstart])), e.lookahead--, e.strstart++)
              if (r && (U(e, !1), 0 === e.strm.avail_out)) return 1
            }
            return (
              (e.insert = e.strstart < 2 ? e.strstart : 2),
              t === p
                ? (U(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                : e.last_lit && (U(e, !1), 0 === e.strm.avail_out)
                  ? 1
                  : 2
            )
          },
          z = (e, t) => {
            let n, r, o
            for (;;) {
              if (e.lookahead < k) {
                if ((J(e), e.lookahead < k && t === g)) return 1
                if (0 === e.lookahead) break
              }
              if (
                ((n = 0),
                e.lookahead >= 3 &&
                  ((e.ins_h = R(e, e.ins_h, e.window[e.strstart + 3 - 1])),
                  (n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                  (e.head[e.ins_h] = e.strstart)),
                (e.prev_length = e.match_length),
                (e.prev_match = e.match_start),
                (e.match_length = 2),
                0 !== n &&
                  e.prev_length < e.max_lazy_match &&
                  e.strstart - n <= e.w_size - k &&
                  ((e.match_length = H(e, n)),
                  e.match_length <= 5 &&
                    (e.strategy === B ||
                      (3 === e.match_length && e.strstart - e.match_start > 4096)) &&
                    (e.match_length = 2)),
                e.prev_length >= 3 && e.match_length <= e.prev_length)
              ) {
                ;((o = e.strstart + e.lookahead - 3),
                  (r = s(e, e.strstart - 1 - e.prev_match, e.prev_length - 3)),
                  (e.lookahead -= e.prev_length - 1),
                  (e.prev_length -= 2))
                do {
                  ++e.strstart <= o &&
                    ((e.ins_h = R(e, e.ins_h, e.window[e.strstart + 3 - 1])),
                    (n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                    (e.head[e.ins_h] = e.strstart))
                } while (0 !== --e.prev_length)
                if (
                  ((e.match_available = 0),
                  (e.match_length = 2),
                  e.strstart++,
                  r && (U(e, !1), 0 === e.strm.avail_out))
                )
                  return 1
              } else if (e.match_available) {
                if (
                  ((r = s(e, 0, e.window[e.strstart - 1])),
                  r && U(e, !1),
                  e.strstart++,
                  e.lookahead--,
                  0 === e.strm.avail_out)
                )
                  return 1
              } else ((e.match_available = 1), e.strstart++, e.lookahead--)
            }
            return (
              e.match_available &&
                ((r = s(e, 0, e.window[e.strstart - 1])), (e.match_available = 0)),
              (e.insert = e.strstart < 2 ? e.strstart : 2),
              t === p
                ? (U(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                : e.last_lit && (U(e, !1), 0 === e.strm.avail_out)
                  ? 1
                  : 2
            )
          }
        function K(e, t, n, r, o) {
          ;((this.good_length = e),
            (this.max_lazy = t),
            (this.nice_length = n),
            (this.max_chain = r),
            (this.func = o))
        }
        const Y = [
          new K(0, 0, 0, 0, (e, t) => {
            let n = 65535
            for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5); ; ) {
              if (e.lookahead <= 1) {
                if ((J(e), 0 === e.lookahead && t === g)) return 1
                if (0 === e.lookahead) break
              }
              ;((e.strstart += e.lookahead), (e.lookahead = 0))
              const r = e.block_start + n
              if (
                (0 === e.strstart || e.strstart >= r) &&
                ((e.lookahead = e.strstart - r), (e.strstart = r), U(e, !1), 0 === e.strm.avail_out)
              )
                return 1
              if (e.strstart - e.block_start >= e.w_size - k && (U(e, !1), 0 === e.strm.avail_out))
                return 1
            }
            return (
              (e.insert = 0),
              t === p
                ? (U(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                : (e.strstart > e.block_start && (U(e, !1), e.strm.avail_out), 1)
            )
          }),
          new K(4, 4, 8, 4, W),
          new K(4, 5, 16, 8, W),
          new K(4, 6, 32, 32, W),
          new K(4, 4, 16, 16, z),
          new K(8, 16, 32, 32, z),
          new K(8, 16, 128, 128, z),
          new K(8, 32, 128, 256, z),
          new K(32, 128, 258, 1024, z),
          new K(32, 258, 258, 4096, z),
        ]
        function j() {
          ;((this.strm = null),
            (this.status = 0),
            (this.pending_buf = null),
            (this.pending_buf_size = 0),
            (this.pending_out = 0),
            (this.pending = 0),
            (this.wrap = 0),
            (this.gzhead = null),
            (this.gzindex = 0),
            (this.method = T),
            (this.last_flush = -1),
            (this.w_size = 0),
            (this.w_bits = 0),
            (this.w_mask = 0),
            (this.window = null),
            (this.window_size = 0),
            (this.prev = null),
            (this.head = null),
            (this.ins_h = 0),
            (this.hash_size = 0),
            (this.hash_bits = 0),
            (this.hash_mask = 0),
            (this.hash_shift = 0),
            (this.block_start = 0),
            (this.match_length = 0),
            (this.prev_match = 0),
            (this.match_available = 0),
            (this.strstart = 0),
            (this.match_start = 0),
            (this.lookahead = 0),
            (this.prev_length = 0),
            (this.max_chain_length = 0),
            (this.max_lazy_match = 0),
            (this.level = 0),
            (this.strategy = 0),
            (this.good_match = 0),
            (this.nice_match = 0),
            (this.dyn_ltree = new Uint16Array(1146)),
            (this.dyn_dtree = new Uint16Array(122)),
            (this.bl_tree = new Uint16Array(78)),
            P(this.dyn_ltree),
            P(this.dyn_dtree),
            P(this.bl_tree),
            (this.l_desc = null),
            (this.d_desc = null),
            (this.bl_desc = null),
            (this.bl_count = new Uint16Array(16)),
            (this.heap = new Uint16Array(573)),
            P(this.heap),
            (this.heap_len = 0),
            (this.heap_max = 0),
            (this.depth = new Uint16Array(573)),
            P(this.depth),
            (this.l_buf = 0),
            (this.lit_bufsize = 0),
            (this.last_lit = 0),
            (this.d_buf = 0),
            (this.opt_len = 0),
            (this.static_len = 0),
            (this.matches = 0),
            (this.insert = 0),
            (this.bi_buf = 0),
            (this.bi_valid = 0))
        }
        const $ = (e) => {
            if (!e || !e.state) return O(e, m)
            ;((e.total_in = e.total_out = 0), (e.data_type = x))
            const t = e.state
            return (
              (t.pending = 0),
              (t.pending_out = 0),
              t.wrap < 0 && (t.wrap = -t.wrap),
              (t.status = t.wrap ? 42 : v),
              (e.adler = 2 === t.wrap ? 0 : 1),
              (t.last_flush = g),
              r(t),
              f
            )
          },
          V = (e) => {
            const t = $(e)
            var n
            return (
              t === f &&
                (((n = e.state).window_size = 2 * n.w_size),
                P(n.head),
                (n.max_lazy_match = Y[n.level].max_lazy),
                (n.good_match = Y[n.level].good_length),
                (n.nice_match = Y[n.level].nice_length),
                (n.max_chain_length = Y[n.level].max_chain),
                (n.strstart = 0),
                (n.block_start = 0),
                (n.lookahead = 0),
                (n.insert = 0),
                (n.match_length = n.prev_length = 2),
                (n.match_available = 0),
                (n.ins_h = 0)),
              t
            )
          },
          Z = (e, t, n, r, o, i) => {
            if (!e) return m
            let s = 1
            if (
              (t === C && (t = 6),
              r < 0 ? ((s = 0), (r = -r)) : r > 15 && ((s = 2), (r -= 16)),
              o < 1 || o > 9 || n !== T || r < 8 || r > 15 || t < 0 || t > 9 || i < 0 || i > b)
            )
              return O(e, m)
            8 === r && (r = 9)
            const a = new j()
            return (
              (e.state = a),
              (a.strm = e),
              (a.wrap = s),
              (a.gzhead = null),
              (a.w_bits = r),
              (a.w_size = 1 << a.w_bits),
              (a.w_mask = a.w_size - 1),
              (a.hash_bits = o + 7),
              (a.hash_size = 1 << a.hash_bits),
              (a.hash_mask = a.hash_size - 1),
              (a.hash_shift = ~~((a.hash_bits + 3 - 1) / 3)),
              (a.window = new Uint8Array(2 * a.w_size)),
              (a.head = new Uint16Array(a.hash_size)),
              (a.prev = new Uint16Array(a.w_size)),
              (a.lit_bufsize = 1 << (o + 6)),
              (a.pending_buf_size = 4 * a.lit_bufsize),
              (a.pending_buf = new Uint8Array(a.pending_buf_size)),
              (a.d_buf = 1 * a.lit_bufsize),
              (a.l_buf = 3 * a.lit_bufsize),
              (a.level = t),
              (a.strategy = i),
              (a.method = n),
              V(e)
            )
          }
        ;((e.exports.deflateInit = (e, t) => Z(e, t, T, 15, 8, Q)),
          (e.exports.deflateInit2 = Z),
          (e.exports.deflateReset = V),
          (e.exports.deflateResetKeep = $),
          (e.exports.deflateSetHeader = (e, t) =>
            e && e.state ? (2 !== e.state.wrap ? m : ((e.state.gzhead = t), f)) : m),
          (e.exports.deflate = (e, t) => {
            let n, r
            if (!e || !e.state || t > h || t < 0) return e ? O(e, m) : m
            const i = e.state
            if (!e.output || (!e.input && 0 !== e.avail_in) || (i.status === G && t !== p))
              return O(e, 0 === e.avail_out ? y : m)
            i.strm = e
            const A = i.last_flush
            if (((i.last_flush = t), 42 === i.status))
              if (2 === i.wrap)
                ((e.adler = 0),
                  F(i, 31),
                  F(i, 139),
                  F(i, 8),
                  i.gzhead
                    ? (F(
                        i,
                        (i.gzhead.text ? 1 : 0) +
                          (i.gzhead.hcrc ? 2 : 0) +
                          (i.gzhead.extra ? 4 : 0) +
                          (i.gzhead.name ? 8 : 0) +
                          (i.gzhead.comment ? 16 : 0)
                      ),
                      F(i, 255 & i.gzhead.time),
                      F(i, (i.gzhead.time >> 8) & 255),
                      F(i, (i.gzhead.time >> 16) & 255),
                      F(i, (i.gzhead.time >> 24) & 255),
                      F(i, 9 === i.level ? 2 : i.strategy >= _ || i.level < 2 ? 4 : 0),
                      F(i, 255 & i.gzhead.os),
                      i.gzhead.extra &&
                        i.gzhead.extra.length &&
                        (F(i, 255 & i.gzhead.extra.length),
                        F(i, (i.gzhead.extra.length >> 8) & 255)),
                      i.gzhead.hcrc && (e.adler = u(e.adler, i.pending_buf, i.pending, 0)),
                      (i.gzindex = 0),
                      (i.status = 69))
                    : (F(i, 0),
                      F(i, 0),
                      F(i, 0),
                      F(i, 0),
                      F(i, 0),
                      F(i, 9 === i.level ? 2 : i.strategy >= _ || i.level < 2 ? 4 : 0),
                      F(i, 3),
                      (i.status = v)))
              else {
                let t = (T + ((i.w_bits - 8) << 4)) << 8,
                  n = -1
                ;((n =
                  i.strategy >= _ || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3),
                  (t |= n << 6),
                  0 !== i.strstart && (t |= 32),
                  (t += 31 - (t % 31)),
                  (i.status = v),
                  L(i, t),
                  0 !== i.strstart && (L(i, e.adler >>> 16), L(i, 65535 & e.adler)),
                  (e.adler = 1))
              }
            if (69 === i.status)
              if (i.gzhead.extra) {
                for (
                  n = i.pending;
                  i.gzindex < (65535 & i.gzhead.extra.length) &&
                  (i.pending !== i.pending_buf_size ||
                    (i.gzhead.hcrc &&
                      i.pending > n &&
                      (e.adler = u(e.adler, i.pending_buf, i.pending - n, n)),
                    M(e),
                    (n = i.pending),
                    i.pending !== i.pending_buf_size));

                )
                  (F(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++)
                ;(i.gzhead.hcrc &&
                  i.pending > n &&
                  (e.adler = u(e.adler, i.pending_buf, i.pending - n, n)),
                  i.gzindex === i.gzhead.extra.length && ((i.gzindex = 0), (i.status = 73)))
              } else i.status = 73
            if (73 === i.status)
              if (i.gzhead.name) {
                n = i.pending
                do {
                  if (
                    i.pending === i.pending_buf_size &&
                    (i.gzhead.hcrc &&
                      i.pending > n &&
                      (e.adler = u(e.adler, i.pending_buf, i.pending - n, n)),
                    M(e),
                    (n = i.pending),
                    i.pending === i.pending_buf_size)
                  ) {
                    r = 1
                    break
                  }
                  ;((r =
                    i.gzindex < i.gzhead.name.length
                      ? 255 & i.gzhead.name.charCodeAt(i.gzindex++)
                      : 0),
                    F(i, r))
                } while (0 !== r)
                ;(i.gzhead.hcrc &&
                  i.pending > n &&
                  (e.adler = u(e.adler, i.pending_buf, i.pending - n, n)),
                  0 === r && ((i.gzindex = 0), (i.status = 91)))
              } else i.status = 91
            if (91 === i.status)
              if (i.gzhead.comment) {
                n = i.pending
                do {
                  if (
                    i.pending === i.pending_buf_size &&
                    (i.gzhead.hcrc &&
                      i.pending > n &&
                      (e.adler = u(e.adler, i.pending_buf, i.pending - n, n)),
                    M(e),
                    (n = i.pending),
                    i.pending === i.pending_buf_size)
                  ) {
                    r = 1
                    break
                  }
                  ;((r =
                    i.gzindex < i.gzhead.comment.length
                      ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++)
                      : 0),
                    F(i, r))
                } while (0 !== r)
                ;(i.gzhead.hcrc &&
                  i.pending > n &&
                  (e.adler = u(e.adler, i.pending_buf, i.pending - n, n)),
                  0 === r && (i.status = S))
              } else i.status = S
            if (
              (i.status === S &&
                (i.gzhead.hcrc
                  ? (i.pending + 2 > i.pending_buf_size && M(e),
                    i.pending + 2 <= i.pending_buf_size &&
                      (F(i, 255 & e.adler),
                      F(i, (e.adler >> 8) & 255),
                      (e.adler = 0),
                      (i.status = v)))
                  : (i.status = v)),
              0 !== i.pending)
            ) {
              if ((M(e), 0 === e.avail_out)) return ((i.last_flush = -1), f)
            } else if (0 === e.avail_in && N(t) <= N(A) && t !== p) return O(e, y)
            if (i.status === G && 0 !== e.avail_in) return O(e, y)
            if (0 !== e.avail_in || 0 !== i.lookahead || (t !== g && i.status !== G)) {
              let n =
                i.strategy === _
                  ? ((e, t) => {
                      let n
                      for (;;) {
                        if (0 === e.lookahead && (J(e), 0 === e.lookahead)) {
                          if (t === g) return 1
                          break
                        }
                        if (
                          ((e.match_length = 0),
                          (n = s(e, 0, e.window[e.strstart])),
                          e.lookahead--,
                          e.strstart++,
                          n && (U(e, !1), 0 === e.strm.avail_out))
                        )
                          return 1
                      }
                      return (
                        (e.insert = 0),
                        t === p
                          ? (U(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                          : e.last_lit && (U(e, !1), 0 === e.strm.avail_out)
                            ? 1
                            : 2
                      )
                    })(i, t)
                  : i.strategy === w
                    ? ((e, t) => {
                        let n, r, o, i
                        const a = e.window
                        for (;;) {
                          if (e.lookahead <= D) {
                            if ((J(e), e.lookahead <= D && t === g)) return 1
                            if (0 === e.lookahead) break
                          }
                          if (
                            ((e.match_length = 0),
                            e.lookahead >= 3 &&
                              e.strstart > 0 &&
                              ((o = e.strstart - 1),
                              (r = a[o]),
                              r === a[++o] && r === a[++o] && r === a[++o]))
                          ) {
                            i = e.strstart + D
                            do {} while (
                              r === a[++o] &&
                              r === a[++o] &&
                              r === a[++o] &&
                              r === a[++o] &&
                              r === a[++o] &&
                              r === a[++o] &&
                              r === a[++o] &&
                              r === a[++o] &&
                              o < i
                            )
                            ;((e.match_length = D - (i - o)),
                              e.match_length > e.lookahead && (e.match_length = e.lookahead))
                          }
                          if (
                            (e.match_length >= 3
                              ? ((n = s(e, 1, e.match_length - 3)),
                                (e.lookahead -= e.match_length),
                                (e.strstart += e.match_length),
                                (e.match_length = 0))
                              : ((n = s(e, 0, e.window[e.strstart])), e.lookahead--, e.strstart++),
                            n && (U(e, !1), 0 === e.strm.avail_out))
                          )
                            return 1
                        }
                        return (
                          (e.insert = 0),
                          t === p
                            ? (U(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                            : e.last_lit && (U(e, !1), 0 === e.strm.avail_out)
                              ? 1
                              : 2
                        )
                      })(i, t)
                    : Y[i.level].func(i, t)
              if (((3 !== n && 4 !== n) || (i.status = G), 1 === n || 3 === n))
                return (0 === e.avail_out && (i.last_flush = -1), f)
              if (
                2 === n &&
                (t === c
                  ? a(i)
                  : t !== h &&
                    (o(i, 0, 0, !1),
                    t === d &&
                      (P(i.head),
                      0 === i.lookahead &&
                        ((i.strstart = 0), (i.block_start = 0), (i.insert = 0)))),
                M(e),
                0 === e.avail_out)
              )
                return ((i.last_flush = -1), f)
            }
            return t !== p
              ? f
              : i.wrap <= 0
                ? I
                : (2 === i.wrap
                    ? (F(i, 255 & e.adler),
                      F(i, (e.adler >> 8) & 255),
                      F(i, (e.adler >> 16) & 255),
                      F(i, (e.adler >> 24) & 255),
                      F(i, 255 & e.total_in),
                      F(i, (e.total_in >> 8) & 255),
                      F(i, (e.total_in >> 16) & 255),
                      F(i, (e.total_in >> 24) & 255))
                    : (L(i, e.adler >>> 16), L(i, 65535 & e.adler)),
                  M(e),
                  i.wrap > 0 && (i.wrap = -i.wrap),
                  0 !== i.pending ? f : I)
          }),
          (e.exports.deflateEnd = (e) => {
            if (!e || !e.state) return m
            const t = e.state.status
            return 42 !== t && 69 !== t && 73 !== t && 91 !== t && t !== S && t !== v && t !== G
              ? O(e, m)
              : ((e.state = null), t === v ? O(e, E) : f)
          }),
          (e.exports.deflateSetDictionary = (e, t) => {
            let n = t.length
            if (!e || !e.state) return m
            const r = e.state,
              o = r.wrap
            if (2 === o || (1 === o && 42 !== r.status) || r.lookahead) return m
            if ((1 === o && (e.adler = A(e.adler, t, n, 0)), (r.wrap = 0), n >= r.w_size)) {
              0 === o && (P(r.head), (r.strstart = 0), (r.block_start = 0), (r.insert = 0))
              let e = new Uint8Array(r.w_size)
              ;(e.set(t.subarray(n - r.w_size, n), 0), (t = e), (n = r.w_size))
            }
            const i = e.avail_in,
              s = e.next_in,
              a = e.input
            for (e.avail_in = n, e.next_in = 0, e.input = t, J(r); r.lookahead >= 3; ) {
              let e = r.strstart,
                t = r.lookahead - 2
              do {
                ;((r.ins_h = R(r, r.ins_h, r.window[e + 3 - 1])),
                  (r.prev[e & r.w_mask] = r.head[r.ins_h]),
                  (r.head[r.ins_h] = e),
                  e++)
              } while (--t)
              ;((r.strstart = e), (r.lookahead = 2), J(r))
            }
            return (
              (r.strstart += r.lookahead),
              (r.block_start = r.strstart),
              (r.insert = r.lookahead),
              (r.lookahead = 0),
              (r.match_length = r.prev_length = 2),
              (r.match_available = 0),
              (e.next_in = s),
              (e.input = a),
              (e.avail_in = i),
              (r.wrap = o),
              f
            )
          }),
          (e.exports.deflateInfo = 'pako deflate (from Nodeca project)'))
      },
      2401: (e) => {
        'use strict'
        e.exports = function () {
          ;((this.text = 0),
            (this.time = 0),
            (this.xflags = 0),
            (this.os = 0),
            (this.extra = null),
            (this.extra_len = 0),
            (this.name = ''),
            (this.comment = ''),
            (this.hcrc = 0),
            (this.done = !1))
        }
      },
      4264: (e) => {
        'use strict'
        e.exports = function (e, t) {
          let n, r, o, i, s, a, A, u, l, g, c, d, p, h, f, I, m, E, y, C, B, _, w, b
          const Q = e.state
          ;((n = e.next_in),
            (w = e.input),
            (r = n + (e.avail_in - 5)),
            (o = e.next_out),
            (b = e.output),
            (i = o - (t - e.avail_out)),
            (s = o + (e.avail_out - 257)),
            (a = Q.dmax),
            (A = Q.wsize),
            (u = Q.whave),
            (l = Q.wnext),
            (g = Q.window),
            (c = Q.hold),
            (d = Q.bits),
            (p = Q.lencode),
            (h = Q.distcode),
            (f = (1 << Q.lenbits) - 1),
            (I = (1 << Q.distbits) - 1))
          e: do {
            ;(d < 15 && ((c += w[n++] << d), (d += 8), (c += w[n++] << d), (d += 8)),
              (m = p[c & f]))
            t: for (;;) {
              if (((E = m >>> 24), (c >>>= E), (d -= E), (E = (m >>> 16) & 255), 0 === E))
                b[o++] = 65535 & m
              else {
                if (!(16 & E)) {
                  if (64 & E) {
                    if (32 & E) {
                      Q.mode = 12
                      break e
                    }
                    ;((e.msg = 'invalid literal/length code'), (Q.mode = 30))
                    break e
                  }
                  m = p[(65535 & m) + (c & ((1 << E) - 1))]
                  continue t
                }
                for (
                  y = 65535 & m,
                    E &= 15,
                    E &&
                      (d < E && ((c += w[n++] << d), (d += 8)),
                      (y += c & ((1 << E) - 1)),
                      (c >>>= E),
                      (d -= E)),
                    d < 15 && ((c += w[n++] << d), (d += 8), (c += w[n++] << d), (d += 8)),
                    m = h[c & I];
                  ;

                ) {
                  if (((E = m >>> 24), (c >>>= E), (d -= E), (E = (m >>> 16) & 255), 16 & E)) {
                    if (
                      ((C = 65535 & m),
                      (E &= 15),
                      d < E &&
                        ((c += w[n++] << d), (d += 8), d < E && ((c += w[n++] << d), (d += 8))),
                      (C += c & ((1 << E) - 1)),
                      C > a)
                    ) {
                      ;((e.msg = 'invalid distance too far back'), (Q.mode = 30))
                      break e
                    }
                    if (((c >>>= E), (d -= E), (E = o - i), C > E)) {
                      if (((E = C - E), E > u && Q.sane)) {
                        ;((e.msg = 'invalid distance too far back'), (Q.mode = 30))
                        break e
                      }
                      if (((B = 0), (_ = g), 0 === l)) {
                        if (((B += A - E), E < y)) {
                          y -= E
                          do {
                            b[o++] = g[B++]
                          } while (--E)
                          ;((B = o - C), (_ = b))
                        }
                      } else if (l < E) {
                        if (((B += A + l - E), (E -= l), E < y)) {
                          y -= E
                          do {
                            b[o++] = g[B++]
                          } while (--E)
                          if (((B = 0), l < y)) {
                            ;((E = l), (y -= E))
                            do {
                              b[o++] = g[B++]
                            } while (--E)
                            ;((B = o - C), (_ = b))
                          }
                        }
                      } else if (((B += l - E), E < y)) {
                        y -= E
                        do {
                          b[o++] = g[B++]
                        } while (--E)
                        ;((B = o - C), (_ = b))
                      }
                      for (; y > 2; )
                        ((b[o++] = _[B++]), (b[o++] = _[B++]), (b[o++] = _[B++]), (y -= 3))
                      y && ((b[o++] = _[B++]), y > 1 && (b[o++] = _[B++]))
                    } else {
                      B = o - C
                      do {
                        ;((b[o++] = b[B++]), (b[o++] = b[B++]), (b[o++] = b[B++]), (y -= 3))
                      } while (y > 2)
                      y && ((b[o++] = b[B++]), y > 1 && (b[o++] = b[B++]))
                    }
                    break
                  }
                  if (64 & E) {
                    ;((e.msg = 'invalid distance code'), (Q.mode = 30))
                    break e
                  }
                  m = h[(65535 & m) + (c & ((1 << E) - 1))]
                }
              }
              break
            }
          } while (n < r && o < s)
          ;((y = d >> 3),
            (n -= y),
            (d -= y << 3),
            (c &= (1 << d) - 1),
            (e.next_in = n),
            (e.next_out = o),
            (e.avail_in = n < r ? r - n + 5 : 5 - (n - r)),
            (e.avail_out = o < s ? s - o + 257 : 257 - (o - s)),
            (Q.hold = c),
            (Q.bits = d))
        }
      },
      6351: (e, t, n) => {
        'use strict'
        const r = n(6069),
          o = n(2869),
          i = n(4264),
          s = n(9241),
          {
            Z_FINISH: a,
            Z_BLOCK: A,
            Z_TREES: u,
            Z_OK: l,
            Z_STREAM_END: g,
            Z_NEED_DICT: c,
            Z_STREAM_ERROR: d,
            Z_DATA_ERROR: p,
            Z_MEM_ERROR: h,
            Z_BUF_ERROR: f,
            Z_DEFLATED: I,
          } = n(1619),
          m = 12,
          E = 30,
          y = (e) =>
            ((e >>> 24) & 255) + ((e >>> 8) & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
        function C() {
          ;((this.mode = 0),
            (this.last = !1),
            (this.wrap = 0),
            (this.havedict = !1),
            (this.flags = 0),
            (this.dmax = 0),
            (this.check = 0),
            (this.total = 0),
            (this.head = null),
            (this.wbits = 0),
            (this.wsize = 0),
            (this.whave = 0),
            (this.wnext = 0),
            (this.window = null),
            (this.hold = 0),
            (this.bits = 0),
            (this.length = 0),
            (this.offset = 0),
            (this.extra = 0),
            (this.lencode = null),
            (this.distcode = null),
            (this.lenbits = 0),
            (this.distbits = 0),
            (this.ncode = 0),
            (this.nlen = 0),
            (this.ndist = 0),
            (this.have = 0),
            (this.next = null),
            (this.lens = new Uint16Array(320)),
            (this.work = new Uint16Array(288)),
            (this.lendyn = null),
            (this.distdyn = null),
            (this.sane = 0),
            (this.back = 0),
            (this.was = 0))
        }
        const B = (e) => {
            if (!e || !e.state) return d
            const t = e.state
            return (
              (e.total_in = e.total_out = t.total = 0),
              (e.msg = ''),
              t.wrap && (e.adler = 1 & t.wrap),
              (t.mode = 1),
              (t.last = 0),
              (t.havedict = 0),
              (t.dmax = 32768),
              (t.head = null),
              (t.hold = 0),
              (t.bits = 0),
              (t.lencode = t.lendyn = new Int32Array(852)),
              (t.distcode = t.distdyn = new Int32Array(592)),
              (t.sane = 1),
              (t.back = -1),
              l
            )
          },
          _ = (e) => {
            if (!e || !e.state) return d
            const t = e.state
            return ((t.wsize = 0), (t.whave = 0), (t.wnext = 0), B(e))
          },
          w = (e, t) => {
            let n
            if (!e || !e.state) return d
            const r = e.state
            return (
              t < 0 ? ((n = 0), (t = -t)) : ((n = 1 + (t >> 4)), t < 48 && (t &= 15)),
              t && (t < 8 || t > 15)
                ? d
                : (null !== r.window && r.wbits !== t && (r.window = null),
                  (r.wrap = n),
                  (r.wbits = t),
                  _(e))
            )
          },
          b = (e, t) => {
            if (!e) return d
            const n = new C()
            ;((e.state = n), (n.window = null))
            const r = w(e, t)
            return (r !== l && (e.state = null), r)
          }
        let Q,
          x,
          T = !0
        const D = (e) => {
            if (T) {
              ;((Q = new Int32Array(512)), (x = new Int32Array(32)))
              let t = 0
              for (; t < 144; ) e.lens[t++] = 8
              for (; t < 256; ) e.lens[t++] = 9
              for (; t < 280; ) e.lens[t++] = 7
              for (; t < 288; ) e.lens[t++] = 8
              for (s(1, e.lens, 0, 288, Q, 0, e.work, { bits: 9 }), t = 0; t < 32; ) e.lens[t++] = 5
              ;(s(2, e.lens, 0, 32, x, 0, e.work, { bits: 5 }), (T = !1))
            }
            ;((e.lencode = Q), (e.lenbits = 9), (e.distcode = x), (e.distbits = 5))
          },
          k = (e, t, n, r) => {
            let o
            const i = e.state
            return (
              null === i.window &&
                ((i.wsize = 1 << i.wbits),
                (i.wnext = 0),
                (i.whave = 0),
                (i.window = new Uint8Array(i.wsize))),
              r >= i.wsize
                ? (i.window.set(t.subarray(n - i.wsize, n), 0), (i.wnext = 0), (i.whave = i.wsize))
                : ((o = i.wsize - i.wnext),
                  o > r && (o = r),
                  i.window.set(t.subarray(n - r, n - r + o), i.wnext),
                  (r -= o)
                    ? (i.window.set(t.subarray(n - r, n), 0), (i.wnext = r), (i.whave = i.wsize))
                    : ((i.wnext += o),
                      i.wnext === i.wsize && (i.wnext = 0),
                      i.whave < i.wsize && (i.whave += o))),
              0
            )
          }
        ;((e.exports.inflateReset = _),
          (e.exports.inflateReset2 = w),
          (e.exports.inflateResetKeep = B),
          (e.exports.inflateInit = (e) => b(e, 15)),
          (e.exports.inflateInit2 = b),
          (e.exports.inflate = (e, t) => {
            let n,
              C,
              B,
              _,
              w,
              b,
              Q,
              x,
              T,
              S,
              v,
              G,
              O,
              N,
              P,
              R,
              M,
              U,
              F,
              L,
              q,
              H,
              J = 0
            const W = new Uint8Array(4)
            let z, K
            const Y = new Uint8Array([
              16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
            ])
            if (!e || !e.state || !e.output || (!e.input && 0 !== e.avail_in)) return d
            ;((n = e.state),
              n.mode === m && (n.mode = 13),
              (w = e.next_out),
              (B = e.output),
              (Q = e.avail_out),
              (_ = e.next_in),
              (C = e.input),
              (b = e.avail_in),
              (x = n.hold),
              (T = n.bits),
              (S = b),
              (v = Q),
              (H = l))
            e: for (;;)
              switch (n.mode) {
                case 1:
                  if (0 === n.wrap) {
                    n.mode = 13
                    break
                  }
                  for (; T < 16; ) {
                    if (0 === b) break e
                    ;(b--, (x += C[_++] << T), (T += 8))
                  }
                  if (2 & n.wrap && 35615 === x) {
                    ;((n.check = 0),
                      (W[0] = 255 & x),
                      (W[1] = (x >>> 8) & 255),
                      (n.check = o(n.check, W, 2, 0)),
                      (x = 0),
                      (T = 0),
                      (n.mode = 2))
                    break
                  }
                  if (
                    ((n.flags = 0),
                    n.head && (n.head.done = !1),
                    !(1 & n.wrap) || (((255 & x) << 8) + (x >> 8)) % 31)
                  ) {
                    ;((e.msg = 'incorrect header check'), (n.mode = E))
                    break
                  }
                  if ((15 & x) !== I) {
                    ;((e.msg = 'unknown compression method'), (n.mode = E))
                    break
                  }
                  if (((x >>>= 4), (T -= 4), (q = 8 + (15 & x)), 0 === n.wbits)) n.wbits = q
                  else if (q > n.wbits) {
                    ;((e.msg = 'invalid window size'), (n.mode = E))
                    break
                  }
                  ;((n.dmax = 1 << n.wbits),
                    (e.adler = n.check = 1),
                    (n.mode = 512 & x ? 10 : m),
                    (x = 0),
                    (T = 0))
                  break
                case 2:
                  for (; T < 16; ) {
                    if (0 === b) break e
                    ;(b--, (x += C[_++] << T), (T += 8))
                  }
                  if (((n.flags = x), (255 & n.flags) !== I)) {
                    ;((e.msg = 'unknown compression method'), (n.mode = E))
                    break
                  }
                  if (57344 & n.flags) {
                    ;((e.msg = 'unknown header flags set'), (n.mode = E))
                    break
                  }
                  ;(n.head && (n.head.text = (x >> 8) & 1),
                    512 & n.flags &&
                      ((W[0] = 255 & x), (W[1] = (x >>> 8) & 255), (n.check = o(n.check, W, 2, 0))),
                    (x = 0),
                    (T = 0),
                    (n.mode = 3))
                case 3:
                  for (; T < 32; ) {
                    if (0 === b) break e
                    ;(b--, (x += C[_++] << T), (T += 8))
                  }
                  ;(n.head && (n.head.time = x),
                    512 & n.flags &&
                      ((W[0] = 255 & x),
                      (W[1] = (x >>> 8) & 255),
                      (W[2] = (x >>> 16) & 255),
                      (W[3] = (x >>> 24) & 255),
                      (n.check = o(n.check, W, 4, 0))),
                    (x = 0),
                    (T = 0),
                    (n.mode = 4))
                case 4:
                  for (; T < 16; ) {
                    if (0 === b) break e
                    ;(b--, (x += C[_++] << T), (T += 8))
                  }
                  ;(n.head && ((n.head.xflags = 255 & x), (n.head.os = x >> 8)),
                    512 & n.flags &&
                      ((W[0] = 255 & x), (W[1] = (x >>> 8) & 255), (n.check = o(n.check, W, 2, 0))),
                    (x = 0),
                    (T = 0),
                    (n.mode = 5))
                case 5:
                  if (1024 & n.flags) {
                    for (; T < 16; ) {
                      if (0 === b) break e
                      ;(b--, (x += C[_++] << T), (T += 8))
                    }
                    ;((n.length = x),
                      n.head && (n.head.extra_len = x),
                      512 & n.flags &&
                        ((W[0] = 255 & x),
                        (W[1] = (x >>> 8) & 255),
                        (n.check = o(n.check, W, 2, 0))),
                      (x = 0),
                      (T = 0))
                  } else n.head && (n.head.extra = null)
                  n.mode = 6
                case 6:
                  if (
                    1024 & n.flags &&
                    ((G = n.length),
                    G > b && (G = b),
                    G &&
                      (n.head &&
                        ((q = n.head.extra_len - n.length),
                        n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)),
                        n.head.extra.set(C.subarray(_, _ + G), q)),
                      512 & n.flags && (n.check = o(n.check, C, G, _)),
                      (b -= G),
                      (_ += G),
                      (n.length -= G)),
                    n.length)
                  )
                    break e
                  ;((n.length = 0), (n.mode = 7))
                case 7:
                  if (2048 & n.flags) {
                    if (0 === b) break e
                    G = 0
                    do {
                      ;((q = C[_ + G++]),
                        n.head && q && n.length < 65536 && (n.head.name += String.fromCharCode(q)))
                    } while (q && G < b)
                    if ((512 & n.flags && (n.check = o(n.check, C, G, _)), (b -= G), (_ += G), q))
                      break e
                  } else n.head && (n.head.name = null)
                  ;((n.length = 0), (n.mode = 8))
                case 8:
                  if (4096 & n.flags) {
                    if (0 === b) break e
                    G = 0
                    do {
                      ;((q = C[_ + G++]),
                        n.head &&
                          q &&
                          n.length < 65536 &&
                          (n.head.comment += String.fromCharCode(q)))
                    } while (q && G < b)
                    if ((512 & n.flags && (n.check = o(n.check, C, G, _)), (b -= G), (_ += G), q))
                      break e
                  } else n.head && (n.head.comment = null)
                  n.mode = 9
                case 9:
                  if (512 & n.flags) {
                    for (; T < 16; ) {
                      if (0 === b) break e
                      ;(b--, (x += C[_++] << T), (T += 8))
                    }
                    if (x !== (65535 & n.check)) {
                      ;((e.msg = 'header crc mismatch'), (n.mode = E))
                      break
                    }
                    ;((x = 0), (T = 0))
                  }
                  ;(n.head && ((n.head.hcrc = (n.flags >> 9) & 1), (n.head.done = !0)),
                    (e.adler = n.check = 0),
                    (n.mode = m))
                  break
                case 10:
                  for (; T < 32; ) {
                    if (0 === b) break e
                    ;(b--, (x += C[_++] << T), (T += 8))
                  }
                  ;((e.adler = n.check = y(x)), (x = 0), (T = 0), (n.mode = 11))
                case 11:
                  if (0 === n.havedict)
                    return (
                      (e.next_out = w),
                      (e.avail_out = Q),
                      (e.next_in = _),
                      (e.avail_in = b),
                      (n.hold = x),
                      (n.bits = T),
                      c
                    )
                  ;((e.adler = n.check = 1), (n.mode = m))
                case m:
                  if (t === A || t === u) break e
                case 13:
                  if (n.last) {
                    ;((x >>>= 7 & T), (T -= 7 & T), (n.mode = 27))
                    break
                  }
                  for (; T < 3; ) {
                    if (0 === b) break e
                    ;(b--, (x += C[_++] << T), (T += 8))
                  }
                  switch (((n.last = 1 & x), (x >>>= 1), (T -= 1), 3 & x)) {
                    case 0:
                      n.mode = 14
                      break
                    case 1:
                      if ((D(n), (n.mode = 20), t === u)) {
                        ;((x >>>= 2), (T -= 2))
                        break e
                      }
                      break
                    case 2:
                      n.mode = 17
                      break
                    case 3:
                      ;((e.msg = 'invalid block type'), (n.mode = E))
                  }
                  ;((x >>>= 2), (T -= 2))
                  break
                case 14:
                  for (x >>>= 7 & T, T -= 7 & T; T < 32; ) {
                    if (0 === b) break e
                    ;(b--, (x += C[_++] << T), (T += 8))
                  }
                  if ((65535 & x) != ((x >>> 16) ^ 65535)) {
                    ;((e.msg = 'invalid stored block lengths'), (n.mode = E))
                    break
                  }
                  if (((n.length = 65535 & x), (x = 0), (T = 0), (n.mode = 15), t === u)) break e
                case 15:
                  n.mode = 16
                case 16:
                  if (((G = n.length), G)) {
                    if ((G > b && (G = b), G > Q && (G = Q), 0 === G)) break e
                    ;(B.set(C.subarray(_, _ + G), w),
                      (b -= G),
                      (_ += G),
                      (Q -= G),
                      (w += G),
                      (n.length -= G))
                    break
                  }
                  n.mode = m
                  break
                case 17:
                  for (; T < 14; ) {
                    if (0 === b) break e
                    ;(b--, (x += C[_++] << T), (T += 8))
                  }
                  if (
                    ((n.nlen = 257 + (31 & x)),
                    (x >>>= 5),
                    (T -= 5),
                    (n.ndist = 1 + (31 & x)),
                    (x >>>= 5),
                    (T -= 5),
                    (n.ncode = 4 + (15 & x)),
                    (x >>>= 4),
                    (T -= 4),
                    n.nlen > 286 || n.ndist > 30)
                  ) {
                    ;((e.msg = 'too many length or distance symbols'), (n.mode = E))
                    break
                  }
                  ;((n.have = 0), (n.mode = 18))
                case 18:
                  for (; n.have < n.ncode; ) {
                    for (; T < 3; ) {
                      if (0 === b) break e
                      ;(b--, (x += C[_++] << T), (T += 8))
                    }
                    ;((n.lens[Y[n.have++]] = 7 & x), (x >>>= 3), (T -= 3))
                  }
                  for (; n.have < 19; ) n.lens[Y[n.have++]] = 0
                  if (
                    ((n.lencode = n.lendyn),
                    (n.lenbits = 7),
                    (z = { bits: n.lenbits }),
                    (H = s(0, n.lens, 0, 19, n.lencode, 0, n.work, z)),
                    (n.lenbits = z.bits),
                    H)
                  ) {
                    ;((e.msg = 'invalid code lengths set'), (n.mode = E))
                    break
                  }
                  ;((n.have = 0), (n.mode = 19))
                case 19:
                  for (; n.have < n.nlen + n.ndist; ) {
                    for (
                      ;
                      (J = n.lencode[x & ((1 << n.lenbits) - 1)]),
                        (P = J >>> 24),
                        (R = (J >>> 16) & 255),
                        (M = 65535 & J),
                        !(P <= T);

                    ) {
                      if (0 === b) break e
                      ;(b--, (x += C[_++] << T), (T += 8))
                    }
                    if (M < 16) ((x >>>= P), (T -= P), (n.lens[n.have++] = M))
                    else {
                      if (16 === M) {
                        for (K = P + 2; T < K; ) {
                          if (0 === b) break e
                          ;(b--, (x += C[_++] << T), (T += 8))
                        }
                        if (((x >>>= P), (T -= P), 0 === n.have)) {
                          ;((e.msg = 'invalid bit length repeat'), (n.mode = E))
                          break
                        }
                        ;((q = n.lens[n.have - 1]), (G = 3 + (3 & x)), (x >>>= 2), (T -= 2))
                      } else if (17 === M) {
                        for (K = P + 3; T < K; ) {
                          if (0 === b) break e
                          ;(b--, (x += C[_++] << T), (T += 8))
                        }
                        ;((x >>>= P), (T -= P), (q = 0), (G = 3 + (7 & x)), (x >>>= 3), (T -= 3))
                      } else {
                        for (K = P + 7; T < K; ) {
                          if (0 === b) break e
                          ;(b--, (x += C[_++] << T), (T += 8))
                        }
                        ;((x >>>= P), (T -= P), (q = 0), (G = 11 + (127 & x)), (x >>>= 7), (T -= 7))
                      }
                      if (n.have + G > n.nlen + n.ndist) {
                        ;((e.msg = 'invalid bit length repeat'), (n.mode = E))
                        break
                      }
                      for (; G--; ) n.lens[n.have++] = q
                    }
                  }
                  if (n.mode === E) break
                  if (0 === n.lens[256]) {
                    ;((e.msg = 'invalid code -- missing end-of-block'), (n.mode = E))
                    break
                  }
                  if (
                    ((n.lenbits = 9),
                    (z = { bits: n.lenbits }),
                    (H = s(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, z)),
                    (n.lenbits = z.bits),
                    H)
                  ) {
                    ;((e.msg = 'invalid literal/lengths set'), (n.mode = E))
                    break
                  }
                  if (
                    ((n.distbits = 6),
                    (n.distcode = n.distdyn),
                    (z = { bits: n.distbits }),
                    (H = s(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, z)),
                    (n.distbits = z.bits),
                    H)
                  ) {
                    ;((e.msg = 'invalid distances set'), (n.mode = E))
                    break
                  }
                  if (((n.mode = 20), t === u)) break e
                case 20:
                  n.mode = 21
                case 21:
                  if (b >= 6 && Q >= 258) {
                    ;((e.next_out = w),
                      (e.avail_out = Q),
                      (e.next_in = _),
                      (e.avail_in = b),
                      (n.hold = x),
                      (n.bits = T),
                      i(e, v),
                      (w = e.next_out),
                      (B = e.output),
                      (Q = e.avail_out),
                      (_ = e.next_in),
                      (C = e.input),
                      (b = e.avail_in),
                      (x = n.hold),
                      (T = n.bits),
                      n.mode === m && (n.back = -1))
                    break
                  }
                  for (
                    n.back = 0;
                    (J = n.lencode[x & ((1 << n.lenbits) - 1)]),
                      (P = J >>> 24),
                      (R = (J >>> 16) & 255),
                      (M = 65535 & J),
                      !(P <= T);

                  ) {
                    if (0 === b) break e
                    ;(b--, (x += C[_++] << T), (T += 8))
                  }
                  if (R && !(240 & R)) {
                    for (
                      U = P, F = R, L = M;
                      (J = n.lencode[L + ((x & ((1 << (U + F)) - 1)) >> U)]),
                        (P = J >>> 24),
                        (R = (J >>> 16) & 255),
                        (M = 65535 & J),
                        !(U + P <= T);

                    ) {
                      if (0 === b) break e
                      ;(b--, (x += C[_++] << T), (T += 8))
                    }
                    ;((x >>>= U), (T -= U), (n.back += U))
                  }
                  if (((x >>>= P), (T -= P), (n.back += P), (n.length = M), 0 === R)) {
                    n.mode = 26
                    break
                  }
                  if (32 & R) {
                    ;((n.back = -1), (n.mode = m))
                    break
                  }
                  if (64 & R) {
                    ;((e.msg = 'invalid literal/length code'), (n.mode = E))
                    break
                  }
                  ;((n.extra = 15 & R), (n.mode = 22))
                case 22:
                  if (n.extra) {
                    for (K = n.extra; T < K; ) {
                      if (0 === b) break e
                      ;(b--, (x += C[_++] << T), (T += 8))
                    }
                    ;((n.length += x & ((1 << n.extra) - 1)),
                      (x >>>= n.extra),
                      (T -= n.extra),
                      (n.back += n.extra))
                  }
                  ;((n.was = n.length), (n.mode = 23))
                case 23:
                  for (
                    ;
                    (J = n.distcode[x & ((1 << n.distbits) - 1)]),
                      (P = J >>> 24),
                      (R = (J >>> 16) & 255),
                      (M = 65535 & J),
                      !(P <= T);

                  ) {
                    if (0 === b) break e
                    ;(b--, (x += C[_++] << T), (T += 8))
                  }
                  if (!(240 & R)) {
                    for (
                      U = P, F = R, L = M;
                      (J = n.distcode[L + ((x & ((1 << (U + F)) - 1)) >> U)]),
                        (P = J >>> 24),
                        (R = (J >>> 16) & 255),
                        (M = 65535 & J),
                        !(U + P <= T);

                    ) {
                      if (0 === b) break e
                      ;(b--, (x += C[_++] << T), (T += 8))
                    }
                    ;((x >>>= U), (T -= U), (n.back += U))
                  }
                  if (((x >>>= P), (T -= P), (n.back += P), 64 & R)) {
                    ;((e.msg = 'invalid distance code'), (n.mode = E))
                    break
                  }
                  ;((n.offset = M), (n.extra = 15 & R), (n.mode = 24))
                case 24:
                  if (n.extra) {
                    for (K = n.extra; T < K; ) {
                      if (0 === b) break e
                      ;(b--, (x += C[_++] << T), (T += 8))
                    }
                    ;((n.offset += x & ((1 << n.extra) - 1)),
                      (x >>>= n.extra),
                      (T -= n.extra),
                      (n.back += n.extra))
                  }
                  if (n.offset > n.dmax) {
                    ;((e.msg = 'invalid distance too far back'), (n.mode = E))
                    break
                  }
                  n.mode = 25
                case 25:
                  if (0 === Q) break e
                  if (((G = v - Q), n.offset > G)) {
                    if (((G = n.offset - G), G > n.whave && n.sane)) {
                      ;((e.msg = 'invalid distance too far back'), (n.mode = E))
                      break
                    }
                    ;(G > n.wnext ? ((G -= n.wnext), (O = n.wsize - G)) : (O = n.wnext - G),
                      G > n.length && (G = n.length),
                      (N = n.window))
                  } else ((N = B), (O = w - n.offset), (G = n.length))
                  ;(G > Q && (G = Q), (Q -= G), (n.length -= G))
                  do {
                    B[w++] = N[O++]
                  } while (--G)
                  0 === n.length && (n.mode = 21)
                  break
                case 26:
                  if (0 === Q) break e
                  ;((B[w++] = n.length), Q--, (n.mode = 21))
                  break
                case 27:
                  if (n.wrap) {
                    for (; T < 32; ) {
                      if (0 === b) break e
                      ;(b--, (x |= C[_++] << T), (T += 8))
                    }
                    if (
                      ((v -= Q),
                      (e.total_out += v),
                      (n.total += v),
                      v &&
                        (e.adler = n.check =
                          n.flags ? o(n.check, B, v, w - v) : r(n.check, B, v, w - v)),
                      (v = Q),
                      (n.flags ? x : y(x)) !== n.check)
                    ) {
                      ;((e.msg = 'incorrect data check'), (n.mode = E))
                      break
                    }
                    ;((x = 0), (T = 0))
                  }
                  n.mode = 28
                case 28:
                  if (n.wrap && n.flags) {
                    for (; T < 32; ) {
                      if (0 === b) break e
                      ;(b--, (x += C[_++] << T), (T += 8))
                    }
                    if (x !== (4294967295 & n.total)) {
                      ;((e.msg = 'incorrect length check'), (n.mode = E))
                      break
                    }
                    ;((x = 0), (T = 0))
                  }
                  n.mode = 29
                case 29:
                  H = g
                  break e
                case E:
                  H = p
                  break e
                case 31:
                  return h
                default:
                  return d
              }
            return (
              (e.next_out = w),
              (e.avail_out = Q),
              (e.next_in = _),
              (e.avail_in = b),
              (n.hold = x),
              (n.bits = T),
              (n.wsize || (v !== e.avail_out && n.mode < E && (n.mode < 27 || t !== a))) &&
              k(e, e.output, e.next_out, v - e.avail_out)
                ? ((n.mode = 31), h)
                : ((S -= e.avail_in),
                  (v -= e.avail_out),
                  (e.total_in += S),
                  (e.total_out += v),
                  (n.total += v),
                  n.wrap &&
                    v &&
                    (e.adler = n.check =
                      n.flags
                        ? o(n.check, B, v, e.next_out - v)
                        : r(n.check, B, v, e.next_out - v)),
                  (e.data_type =
                    n.bits +
                    (n.last ? 64 : 0) +
                    (n.mode === m ? 128 : 0) +
                    (20 === n.mode || 15 === n.mode ? 256 : 0)),
                  ((0 === S && 0 === v) || t === a) && H === l && (H = f),
                  H)
            )
          }),
          (e.exports.inflateEnd = (e) => {
            if (!e || !e.state) return d
            let t = e.state
            return (t.window && (t.window = null), (e.state = null), l)
          }),
          (e.exports.inflateGetHeader = (e, t) => {
            if (!e || !e.state) return d
            const n = e.state
            return 2 & n.wrap ? ((n.head = t), (t.done = !1), l) : d
          }),
          (e.exports.inflateSetDictionary = (e, t) => {
            const n = t.length
            let o, i, s
            return e && e.state
              ? ((o = e.state),
                0 !== o.wrap && 11 !== o.mode
                  ? d
                  : 11 === o.mode && ((i = 1), (i = r(i, t, n, 0)), i !== o.check)
                    ? p
                    : ((s = k(e, t, n, n)), s ? ((o.mode = 31), h) : ((o.havedict = 1), l)))
              : d
          }),
          (e.exports.inflateInfo = 'pako inflate (from Nodeca project)'))
      },
      9241: (e) => {
        'use strict'
        const t = new Uint16Array([
            3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99,
            115, 131, 163, 195, 227, 258, 0, 0,
          ]),
          n = new Uint8Array([
            16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20,
            20, 20, 21, 21, 21, 21, 16, 72, 78,
          ]),
          r = new Uint16Array([
            1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025,
            1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0,
          ]),
          o = new Uint8Array([
            16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25,
            26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
          ])
        e.exports = (e, i, s, a, A, u, l, g) => {
          const c = g.bits
          let d,
            p,
            h,
            f,
            I,
            m,
            E = 0,
            y = 0,
            C = 0,
            B = 0,
            _ = 0,
            w = 0,
            b = 0,
            Q = 0,
            x = 0,
            T = 0,
            D = null,
            k = 0
          const S = new Uint16Array(16),
            v = new Uint16Array(16)
          let G,
            O,
            N,
            P = null,
            R = 0
          for (E = 0; E <= 15; E++) S[E] = 0
          for (y = 0; y < a; y++) S[i[s + y]]++
          for (_ = c, B = 15; B >= 1 && 0 === S[B]; B--);
          if ((_ > B && (_ = B), 0 === B))
            return ((A[u++] = 20971520), (A[u++] = 20971520), (g.bits = 1), 0)
          for (C = 1; C < B && 0 === S[C]; C++);
          for (_ < C && (_ = C), Q = 1, E = 1; E <= 15; E++)
            if (((Q <<= 1), (Q -= S[E]), Q < 0)) return -1
          if (Q > 0 && (0 === e || 1 !== B)) return -1
          for (v[1] = 0, E = 1; E < 15; E++) v[E + 1] = v[E] + S[E]
          for (y = 0; y < a; y++) 0 !== i[s + y] && (l[v[i[s + y]]++] = y)
          if (
            (0 === e
              ? ((D = P = l), (m = 19))
              : 1 === e
                ? ((D = t), (k -= 257), (P = n), (R -= 257), (m = 256))
                : ((D = r), (P = o), (m = -1)),
            (T = 0),
            (y = 0),
            (E = C),
            (I = u),
            (w = _),
            (b = 0),
            (h = -1),
            (x = 1 << _),
            (f = x - 1),
            (1 === e && x > 852) || (2 === e && x > 592))
          )
            return 1
          for (;;) {
            ;((G = E - b),
              l[y] < m
                ? ((O = 0), (N = l[y]))
                : l[y] > m
                  ? ((O = P[R + l[y]]), (N = D[k + l[y]]))
                  : ((O = 96), (N = 0)),
              (d = 1 << (E - b)),
              (p = 1 << w),
              (C = p))
            do {
              ;((p -= d), (A[I + (T >> b) + p] = (G << 24) | (O << 16) | N))
            } while (0 !== p)
            for (d = 1 << (E - 1); T & d; ) d >>= 1
            if ((0 !== d ? ((T &= d - 1), (T += d)) : (T = 0), y++, 0 === --S[E])) {
              if (E === B) break
              E = i[s + l[y]]
            }
            if (E > _ && (T & f) !== h) {
              for (
                0 === b && (b = _), I += C, w = E - b, Q = 1 << w;
                w + b < B && ((Q -= S[w + b]), !(Q <= 0));

              )
                (w++, (Q <<= 1))
              if (((x += 1 << w), (1 === e && x > 852) || (2 === e && x > 592))) return 1
              ;((h = T & f), (A[h] = (_ << 24) | (w << 16) | (I - u)))
            }
          }
          return (0 !== T && (A[I + T] = ((E - b) << 24) | (64 << 16)), (g.bits = _), 0)
        }
      },
      8898: (e) => {
        'use strict'
        e.exports = {
          2: 'need dictionary',
          1: 'stream end',
          0: '',
          '-1': 'file error',
          '-2': 'stream error',
          '-3': 'data error',
          '-4': 'insufficient memory',
          '-5': 'buffer error',
          '-6': 'incompatible version',
        }
      },
      342: (e) => {
        'use strict'
        function t(e) {
          let t = e.length
          for (; --t >= 0; ) e[t] = 0
        }
        const n = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0,
          ]),
          r = new Uint8Array([
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
            12, 13, 13,
          ]),
          o = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),
          i = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
          s = new Array(576)
        t(s)
        const a = new Array(60)
        t(a)
        const A = new Array(512)
        t(A)
        const u = new Array(256)
        t(u)
        const l = new Array(29)
        t(l)
        const g = new Array(30)
        function c(e, t, n, r, o) {
          ;((this.static_tree = e),
            (this.extra_bits = t),
            (this.extra_base = n),
            (this.elems = r),
            (this.max_length = o),
            (this.has_stree = e && e.length))
        }
        let d, p, h
        function f(e, t) {
          ;((this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = t))
        }
        t(g)
        const I = (e) => (e < 256 ? A[e] : A[256 + (e >>> 7)]),
          m = (e, t) => {
            ;((e.pending_buf[e.pending++] = 255 & t),
              (e.pending_buf[e.pending++] = (t >>> 8) & 255))
          },
          E = (e, t, n) => {
            e.bi_valid > 16 - n
              ? ((e.bi_buf |= (t << e.bi_valid) & 65535),
                m(e, e.bi_buf),
                (e.bi_buf = t >> (16 - e.bi_valid)),
                (e.bi_valid += n - 16))
              : ((e.bi_buf |= (t << e.bi_valid) & 65535), (e.bi_valid += n))
          },
          y = (e, t, n) => {
            E(e, n[2 * t], n[2 * t + 1])
          },
          C = (e, t) => {
            let n = 0
            do {
              ;((n |= 1 & e), (e >>>= 1), (n <<= 1))
            } while (--t > 0)
            return n >>> 1
          },
          B = (e, t, n) => {
            const r = new Array(16)
            let o,
              i,
              s = 0
            for (o = 1; o <= 15; o++) r[o] = s = (s + n[o - 1]) << 1
            for (i = 0; i <= t; i++) {
              let t = e[2 * i + 1]
              0 !== t && (e[2 * i] = C(r[t]++, t))
            }
          },
          _ = (e) => {
            let t
            for (t = 0; t < 286; t++) e.dyn_ltree[2 * t] = 0
            for (t = 0; t < 30; t++) e.dyn_dtree[2 * t] = 0
            for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0
            ;((e.dyn_ltree[512] = 1), (e.opt_len = e.static_len = 0), (e.last_lit = e.matches = 0))
          },
          w = (e) => {
            ;(e.bi_valid > 8
              ? m(e, e.bi_buf)
              : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf),
              (e.bi_buf = 0),
              (e.bi_valid = 0))
          },
          b = (e, t, n, r) => {
            const o = 2 * t,
              i = 2 * n
            return e[o] < e[i] || (e[o] === e[i] && r[t] <= r[n])
          },
          Q = (e, t, n) => {
            const r = e.heap[n]
            let o = n << 1
            for (
              ;
              o <= e.heap_len &&
              (o < e.heap_len && b(t, e.heap[o + 1], e.heap[o], e.depth) && o++,
              !b(t, r, e.heap[o], e.depth));

            )
              ((e.heap[n] = e.heap[o]), (n = o), (o <<= 1))
            e.heap[n] = r
          },
          x = (e, t, o) => {
            let i,
              s,
              a,
              A,
              c = 0
            if (0 !== e.last_lit)
              do {
                ;((i = (e.pending_buf[e.d_buf + 2 * c] << 8) | e.pending_buf[e.d_buf + 2 * c + 1]),
                  (s = e.pending_buf[e.l_buf + c]),
                  c++,
                  0 === i
                    ? y(e, s, t)
                    : ((a = u[s]),
                      y(e, a + 256 + 1, t),
                      (A = n[a]),
                      0 !== A && ((s -= l[a]), E(e, s, A)),
                      i--,
                      (a = I(i)),
                      y(e, a, o),
                      (A = r[a]),
                      0 !== A && ((i -= g[a]), E(e, i, A))))
              } while (c < e.last_lit)
            y(e, 256, t)
          },
          T = (e, t) => {
            const n = t.dyn_tree,
              r = t.stat_desc.static_tree,
              o = t.stat_desc.has_stree,
              i = t.stat_desc.elems
            let s,
              a,
              A,
              u = -1
            for (e.heap_len = 0, e.heap_max = 573, s = 0; s < i; s++)
              0 !== n[2 * s]
                ? ((e.heap[++e.heap_len] = u = s), (e.depth[s] = 0))
                : (n[2 * s + 1] = 0)
            for (; e.heap_len < 2; )
              ((A = e.heap[++e.heap_len] = u < 2 ? ++u : 0),
                (n[2 * A] = 1),
                (e.depth[A] = 0),
                e.opt_len--,
                o && (e.static_len -= r[2 * A + 1]))
            for (t.max_code = u, s = e.heap_len >> 1; s >= 1; s--) Q(e, n, s)
            A = i
            do {
              ;((s = e.heap[1]),
                (e.heap[1] = e.heap[e.heap_len--]),
                Q(e, n, 1),
                (a = e.heap[1]),
                (e.heap[--e.heap_max] = s),
                (e.heap[--e.heap_max] = a),
                (n[2 * A] = n[2 * s] + n[2 * a]),
                (e.depth[A] = (e.depth[s] >= e.depth[a] ? e.depth[s] : e.depth[a]) + 1),
                (n[2 * s + 1] = n[2 * a + 1] = A),
                (e.heap[1] = A++),
                Q(e, n, 1))
            } while (e.heap_len >= 2)
            ;((e.heap[--e.heap_max] = e.heap[1]),
              ((e, t) => {
                const n = t.dyn_tree,
                  r = t.max_code,
                  o = t.stat_desc.static_tree,
                  i = t.stat_desc.has_stree,
                  s = t.stat_desc.extra_bits,
                  a = t.stat_desc.extra_base,
                  A = t.stat_desc.max_length
                let u,
                  l,
                  g,
                  c,
                  d,
                  p,
                  h = 0
                for (c = 0; c <= 15; c++) e.bl_count[c] = 0
                for (n[2 * e.heap[e.heap_max] + 1] = 0, u = e.heap_max + 1; u < 573; u++)
                  ((l = e.heap[u]),
                    (c = n[2 * n[2 * l + 1] + 1] + 1),
                    c > A && ((c = A), h++),
                    (n[2 * l + 1] = c),
                    l > r ||
                      (e.bl_count[c]++,
                      (d = 0),
                      l >= a && (d = s[l - a]),
                      (p = n[2 * l]),
                      (e.opt_len += p * (c + d)),
                      i && (e.static_len += p * (o[2 * l + 1] + d))))
                if (0 !== h) {
                  do {
                    for (c = A - 1; 0 === e.bl_count[c]; ) c--
                    ;(e.bl_count[c]--, (e.bl_count[c + 1] += 2), e.bl_count[A]--, (h -= 2))
                  } while (h > 0)
                  for (c = A; 0 !== c; c--)
                    for (l = e.bl_count[c]; 0 !== l; )
                      ((g = e.heap[--u]),
                        g > r ||
                          (n[2 * g + 1] !== c &&
                            ((e.opt_len += (c - n[2 * g + 1]) * n[2 * g]), (n[2 * g + 1] = c)),
                          l--))
                }
              })(e, t),
              B(n, u, e.bl_count))
          },
          D = (e, t, n) => {
            let r,
              o,
              i = -1,
              s = t[1],
              a = 0,
              A = 7,
              u = 4
            for (0 === s && ((A = 138), (u = 3)), t[2 * (n + 1) + 1] = 65535, r = 0; r <= n; r++)
              ((o = s),
                (s = t[2 * (r + 1) + 1]),
                (++a < A && o === s) ||
                  (a < u
                    ? (e.bl_tree[2 * o] += a)
                    : 0 !== o
                      ? (o !== i && e.bl_tree[2 * o]++, e.bl_tree[32]++)
                      : a <= 10
                        ? e.bl_tree[34]++
                        : e.bl_tree[36]++,
                  (a = 0),
                  (i = o),
                  0 === s
                    ? ((A = 138), (u = 3))
                    : o === s
                      ? ((A = 6), (u = 3))
                      : ((A = 7), (u = 4))))
          },
          k = (e, t, n) => {
            let r,
              o,
              i = -1,
              s = t[1],
              a = 0,
              A = 7,
              u = 4
            for (0 === s && ((A = 138), (u = 3)), r = 0; r <= n; r++)
              if (((o = s), (s = t[2 * (r + 1) + 1]), !(++a < A && o === s))) {
                if (a < u)
                  do {
                    y(e, o, e.bl_tree)
                  } while (0 !== --a)
                else
                  0 !== o
                    ? (o !== i && (y(e, o, e.bl_tree), a--), y(e, 16, e.bl_tree), E(e, a - 3, 2))
                    : a <= 10
                      ? (y(e, 17, e.bl_tree), E(e, a - 3, 3))
                      : (y(e, 18, e.bl_tree), E(e, a - 11, 7))
                ;((a = 0),
                  (i = o),
                  0 === s
                    ? ((A = 138), (u = 3))
                    : o === s
                      ? ((A = 6), (u = 3))
                      : ((A = 7), (u = 4)))
              }
          }
        let S = !1
        const v = (e, t, n, r) => {
          ;(E(e, 0 + (r ? 1 : 0), 3),
            ((e, t, n) => {
              ;(w(e),
                m(e, n),
                m(e, ~n),
                e.pending_buf.set(e.window.subarray(t, t + n), e.pending),
                (e.pending += n))
            })(e, t, n))
        }
        ;((e.exports._tr_init = (e) => {
          ;(S ||
            ((() => {
              let e, t, i, f, I
              const m = new Array(16)
              for (i = 0, f = 0; f < 28; f++) for (l[f] = i, e = 0; e < 1 << n[f]; e++) u[i++] = f
              for (u[i - 1] = f, I = 0, f = 0; f < 16; f++)
                for (g[f] = I, e = 0; e < 1 << r[f]; e++) A[I++] = f
              for (I >>= 7; f < 30; f++)
                for (g[f] = I << 7, e = 0; e < 1 << (r[f] - 7); e++) A[256 + I++] = f
              for (t = 0; t <= 15; t++) m[t] = 0
              for (e = 0; e <= 143; ) ((s[2 * e + 1] = 8), e++, m[8]++)
              for (; e <= 255; ) ((s[2 * e + 1] = 9), e++, m[9]++)
              for (; e <= 279; ) ((s[2 * e + 1] = 7), e++, m[7]++)
              for (; e <= 287; ) ((s[2 * e + 1] = 8), e++, m[8]++)
              for (B(s, 287, m), e = 0; e < 30; e++) ((a[2 * e + 1] = 5), (a[2 * e] = C(e, 5)))
              ;((d = new c(s, n, 257, 286, 15)),
                (p = new c(a, r, 0, 30, 15)),
                (h = new c(new Array(0), o, 0, 19, 7)))
            })(),
            (S = !0)),
            (e.l_desc = new f(e.dyn_ltree, d)),
            (e.d_desc = new f(e.dyn_dtree, p)),
            (e.bl_desc = new f(e.bl_tree, h)),
            (e.bi_buf = 0),
            (e.bi_valid = 0),
            _(e))
        }),
          (e.exports._tr_stored_block = v),
          (e.exports._tr_flush_block = (e, t, n, r) => {
            let o,
              A,
              u = 0
            ;(e.level > 0
              ? (2 === e.strm.data_type &&
                  (e.strm.data_type = ((e) => {
                    let t,
                      n = 4093624447
                    for (t = 0; t <= 31; t++, n >>>= 1)
                      if (1 & n && 0 !== e.dyn_ltree[2 * t]) return 0
                    if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26])
                      return 1
                    for (t = 32; t < 256; t++) if (0 !== e.dyn_ltree[2 * t]) return 1
                    return 0
                  })(e)),
                T(e, e.l_desc),
                T(e, e.d_desc),
                (u = ((e) => {
                  let t
                  for (
                    D(e, e.dyn_ltree, e.l_desc.max_code),
                      D(e, e.dyn_dtree, e.d_desc.max_code),
                      T(e, e.bl_desc),
                      t = 18;
                    t >= 3 && 0 === e.bl_tree[2 * i[t] + 1];
                    t--
                  );
                  return ((e.opt_len += 3 * (t + 1) + 5 + 5 + 4), t)
                })(e)),
                (o = (e.opt_len + 3 + 7) >>> 3),
                (A = (e.static_len + 3 + 7) >>> 3),
                A <= o && (o = A))
              : (o = A = n + 5),
              n + 4 <= o && -1 !== t
                ? v(e, t, n, r)
                : 4 === e.strategy || A === o
                  ? (E(e, 2 + (r ? 1 : 0), 3), x(e, s, a))
                  : (E(e, 4 + (r ? 1 : 0), 3),
                    ((e, t, n, r) => {
                      let o
                      for (E(e, t - 257, 5), E(e, n - 1, 5), E(e, r - 4, 4), o = 0; o < r; o++)
                        E(e, e.bl_tree[2 * i[o] + 1], 3)
                      ;(k(e, e.dyn_ltree, t - 1), k(e, e.dyn_dtree, n - 1))
                    })(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, u + 1),
                    x(e, e.dyn_ltree, e.dyn_dtree)),
              _(e),
              r && w(e))
          }),
          (e.exports._tr_tally = (e, t, n) => (
            (e.pending_buf[e.d_buf + 2 * e.last_lit] = (t >>> 8) & 255),
            (e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t),
            (e.pending_buf[e.l_buf + e.last_lit] = 255 & n),
            e.last_lit++,
            0 === t
              ? e.dyn_ltree[2 * n]++
              : (e.matches++, t--, e.dyn_ltree[2 * (u[n] + 256 + 1)]++, e.dyn_dtree[2 * I(t)]++),
            e.last_lit === e.lit_bufsize - 1
          )),
          (e.exports._tr_align = (e) => {
            ;(E(e, 2, 3),
              y(e, 256, s),
              ((e) => {
                16 === e.bi_valid
                  ? (m(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0))
                  : e.bi_valid >= 8 &&
                    ((e.pending_buf[e.pending++] = 255 & e.bi_buf),
                    (e.bi_buf >>= 8),
                    (e.bi_valid -= 8))
              })(e))
          }))
      },
      2292: (e) => {
        'use strict'
        e.exports = function () {
          ;((this.input = null),
            (this.next_in = 0),
            (this.avail_in = 0),
            (this.total_in = 0),
            (this.output = null),
            (this.next_out = 0),
            (this.avail_out = 0),
            (this.total_out = 0),
            (this.msg = ''),
            (this.state = null),
            (this.data_type = 2),
            (this.adler = 0))
        }
      },
      2100: (e, t, n) => {
        'use strict'
        e.exports = n(9482)
      },
      9482: (e, t, n) => {
        'use strict'
        var r = t
        function o() {
          ;(r.util._configure(),
            r.Writer._configure(r.BufferWriter),
            r.Reader._configure(r.BufferReader))
        }
        ;((r.build = 'minimal'),
          (r.Writer = n(1173)),
          (r.BufferWriter = n(3155)),
          (r.Reader = n(1408)),
          (r.BufferReader = n(593)),
          (r.util = n(9693)),
          (r.rpc = n(5994)),
          (r.roots = n(5054)),
          (r.configure = o),
          o())
      },
      1408: (e, t, n) => {
        'use strict'
        e.exports = A
        var r,
          o = n(9693),
          i = o.LongBits,
          s = o.utf8
        function a(e, t) {
          return RangeError('index out of range: ' + e.pos + ' + ' + (t || 1) + ' > ' + e.len)
        }
        function A(e) {
          ;((this.buf = e), (this.pos = 0), (this.len = e.length))
        }
        var u,
          l =
            'undefined' != typeof Uint8Array
              ? function (e) {
                  if (e instanceof Uint8Array || Array.isArray(e)) return new A(e)
                  throw Error('illegal buffer')
                }
              : function (e) {
                  if (Array.isArray(e)) return new A(e)
                  throw Error('illegal buffer')
                },
          g = function () {
            return o.Buffer
              ? function (e) {
                  return (A.create = function (e) {
                    return o.Buffer.isBuffer(e) ? new r(e) : l(e)
                  })(e)
                }
              : l
          }
        function c() {
          var e = new i(0, 0),
            t = 0
          if (!(this.len - this.pos > 4)) {
            for (; t < 3; ++t) {
              if (this.pos >= this.len) throw a(this)
              if (
                ((e.lo = (e.lo | ((127 & this.buf[this.pos]) << (7 * t))) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return e
            }
            return ((e.lo = (e.lo | ((127 & this.buf[this.pos++]) << (7 * t))) >>> 0), e)
          }
          for (; t < 4; ++t)
            if (
              ((e.lo = (e.lo | ((127 & this.buf[this.pos]) << (7 * t))) >>> 0),
              this.buf[this.pos++] < 128)
            )
              return e
          if (
            ((e.lo = (e.lo | ((127 & this.buf[this.pos]) << 28)) >>> 0),
            (e.hi = (e.hi | ((127 & this.buf[this.pos]) >> 4)) >>> 0),
            this.buf[this.pos++] < 128)
          )
            return e
          if (((t = 0), this.len - this.pos > 4)) {
            for (; t < 5; ++t)
              if (
                ((e.hi = (e.hi | ((127 & this.buf[this.pos]) << (7 * t + 3))) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return e
          } else
            for (; t < 5; ++t) {
              if (this.pos >= this.len) throw a(this)
              if (
                ((e.hi = (e.hi | ((127 & this.buf[this.pos]) << (7 * t + 3))) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return e
            }
          throw Error('invalid varint encoding')
        }
        function d(e, t) {
          return (e[t - 4] | (e[t - 3] << 8) | (e[t - 2] << 16) | (e[t - 1] << 24)) >>> 0
        }
        function p() {
          if (this.pos + 8 > this.len) throw a(this, 8)
          return new i(d(this.buf, (this.pos += 4)), d(this.buf, (this.pos += 4)))
        }
        ;((A.create = g()),
          (A.prototype._slice = o.Array.prototype.subarray || o.Array.prototype.slice),
          (A.prototype.uint32 =
            ((u = 4294967295),
            function () {
              if (((u = (127 & this.buf[this.pos]) >>> 0), this.buf[this.pos++] < 128)) return u
              if (((u = (u | ((127 & this.buf[this.pos]) << 7)) >>> 0), this.buf[this.pos++] < 128))
                return u
              if (
                ((u = (u | ((127 & this.buf[this.pos]) << 14)) >>> 0), this.buf[this.pos++] < 128)
              )
                return u
              if (
                ((u = (u | ((127 & this.buf[this.pos]) << 21)) >>> 0), this.buf[this.pos++] < 128)
              )
                return u
              if (((u = (u | ((15 & this.buf[this.pos]) << 28)) >>> 0), this.buf[this.pos++] < 128))
                return u
              if ((this.pos += 5) > this.len) throw ((this.pos = this.len), a(this, 10))
              return u
            })),
          (A.prototype.int32 = function () {
            return 0 | this.uint32()
          }),
          (A.prototype.sint32 = function () {
            var e = this.uint32()
            return (e >>> 1) ^ -(1 & e)
          }),
          (A.prototype.bool = function () {
            return 0 !== this.uint32()
          }),
          (A.prototype.fixed32 = function () {
            if (this.pos + 4 > this.len) throw a(this, 4)
            return d(this.buf, (this.pos += 4))
          }),
          (A.prototype.sfixed32 = function () {
            if (this.pos + 4 > this.len) throw a(this, 4)
            return 0 | d(this.buf, (this.pos += 4))
          }),
          (A.prototype.float = function () {
            if (this.pos + 4 > this.len) throw a(this, 4)
            var e = o.float.readFloatLE(this.buf, this.pos)
            return ((this.pos += 4), e)
          }),
          (A.prototype.double = function () {
            if (this.pos + 8 > this.len) throw a(this, 4)
            var e = o.float.readDoubleLE(this.buf, this.pos)
            return ((this.pos += 8), e)
          }),
          (A.prototype.bytes = function () {
            var e = this.uint32(),
              t = this.pos,
              n = this.pos + e
            if (n > this.len) throw a(this, e)
            return (
              (this.pos += e),
              Array.isArray(this.buf)
                ? this.buf.slice(t, n)
                : t === n
                  ? new this.buf.constructor(0)
                  : this._slice.call(this.buf, t, n)
            )
          }),
          (A.prototype.string = function () {
            var e = this.bytes()
            return s.read(e, 0, e.length)
          }),
          (A.prototype.skip = function (e) {
            if ('number' == typeof e) {
              if (this.pos + e > this.len) throw a(this, e)
              this.pos += e
            } else
              do {
                if (this.pos >= this.len) throw a(this)
              } while (128 & this.buf[this.pos++])
            return this
          }),
          (A.prototype.skipType = function (e) {
            switch (e) {
              case 0:
                this.skip()
                break
              case 1:
                this.skip(8)
                break
              case 2:
                this.skip(this.uint32())
                break
              case 3:
                for (; 4 != (e = 7 & this.uint32()); ) this.skipType(e)
                break
              case 5:
                this.skip(4)
                break
              default:
                throw Error('invalid wire type ' + e + ' at offset ' + this.pos)
            }
            return this
          }),
          (A._configure = function (e) {
            ;((r = e), (A.create = g()), r._configure())
            var t = o.Long ? 'toLong' : 'toNumber'
            o.merge(A.prototype, {
              int64: function () {
                return c.call(this)[t](!1)
              },
              uint64: function () {
                return c.call(this)[t](!0)
              },
              sint64: function () {
                return c.call(this).zzDecode()[t](!1)
              },
              fixed64: function () {
                return p.call(this)[t](!0)
              },
              sfixed64: function () {
                return p.call(this)[t](!1)
              },
            })
          }))
      },
      593: (e, t, n) => {
        'use strict'
        e.exports = i
        var r = n(1408)
        ;(i.prototype = Object.create(r.prototype)).constructor = i
        var o = n(9693)
        function i(e) {
          r.call(this, e)
        }
        ;((i._configure = function () {
          o.Buffer && (i.prototype._slice = o.Buffer.prototype.slice)
        }),
          (i.prototype.string = function () {
            var e = this.uint32()
            return this.buf.utf8Slice
              ? this.buf.utf8Slice(this.pos, (this.pos = Math.min(this.pos + e, this.len)))
              : this.buf.toString('utf-8', this.pos, (this.pos = Math.min(this.pos + e, this.len)))
          }),
          i._configure())
      },
      5054: (e) => {
        'use strict'
        e.exports = {}
      },
      5994: (e, t, n) => {
        'use strict'
        t.Service = n(7948)
      },
      7948: (e, t, n) => {
        'use strict'
        e.exports = o
        var r = n(9693)
        function o(e, t, n) {
          if ('function' != typeof e) throw TypeError('rpcImpl must be a function')
          ;(r.EventEmitter.call(this),
            (this.rpcImpl = e),
            (this.requestDelimited = Boolean(t)),
            (this.responseDelimited = Boolean(n)))
        }
        ;(((o.prototype = Object.create(r.EventEmitter.prototype)).constructor = o),
          (o.prototype.rpcCall = function e(t, n, o, i, s) {
            if (!i) throw TypeError('request must be specified')
            var a = this
            if (!s) return r.asPromise(e, a, t, n, o, i)
            if (a.rpcImpl)
              try {
                return a.rpcImpl(
                  t,
                  n[a.requestDelimited ? 'encodeDelimited' : 'encode'](i).finish(),
                  function (e, n) {
                    if (e) return (a.emit('error', e, t), s(e))
                    if (null !== n) {
                      if (!(n instanceof o))
                        try {
                          n = o[a.responseDelimited ? 'decodeDelimited' : 'decode'](n)
                        } catch (e) {
                          return (a.emit('error', e, t), s(e))
                        }
                      return (a.emit('data', n, t), s(null, n))
                    }
                    a.end(!0)
                  }
                )
              } catch (e) {
                return (
                  a.emit('error', e, t),
                  void setTimeout(function () {
                    s(e)
                  }, 0)
                )
              }
            else
              setTimeout(function () {
                s(Error('already ended'))
              }, 0)
          }),
          (o.prototype.end = function (e) {
            return (
              this.rpcImpl &&
                (e || this.rpcImpl(null, null, null),
                (this.rpcImpl = null),
                this.emit('end').off()),
              this
            )
          }))
      },
      1945: (e, t, n) => {
        'use strict'
        e.exports = o
        var r = n(9693)
        function o(e, t) {
          ;((this.lo = e >>> 0), (this.hi = t >>> 0))
        }
        var i = (o.zero = new o(0, 0))
        ;((i.toNumber = function () {
          return 0
        }),
          (i.zzEncode = i.zzDecode =
            function () {
              return this
            }),
          (i.length = function () {
            return 1
          }))
        var s = (o.zeroHash = '\0\0\0\0\0\0\0\0')
        ;((o.fromNumber = function (e) {
          if (0 === e) return i
          var t = e < 0
          t && (e = -e)
          var n = e >>> 0,
            r = ((e - n) / 4294967296) >>> 0
          return (
            t &&
              ((r = ~r >>> 0),
              (n = ~n >>> 0),
              ++n > 4294967295 && ((n = 0), ++r > 4294967295 && (r = 0))),
            new o(n, r)
          )
        }),
          (o.from = function (e) {
            if ('number' == typeof e) return o.fromNumber(e)
            if (r.isString(e)) {
              if (!r.Long) return o.fromNumber(parseInt(e, 10))
              e = r.Long.fromString(e)
            }
            return e.low || e.high ? new o(e.low >>> 0, e.high >>> 0) : i
          }),
          (o.prototype.toNumber = function (e) {
            if (!e && this.hi >>> 31) {
              var t = (1 + ~this.lo) >>> 0,
                n = ~this.hi >>> 0
              return (t || (n = (n + 1) >>> 0), -(t + 4294967296 * n))
            }
            return this.lo + 4294967296 * this.hi
          }),
          (o.prototype.toLong = function (e) {
            return r.Long
              ? new r.Long(0 | this.lo, 0 | this.hi, Boolean(e))
              : { low: 0 | this.lo, high: 0 | this.hi, unsigned: Boolean(e) }
          }))
        var a = String.prototype.charCodeAt
        ;((o.fromHash = function (e) {
          return e === s
            ? i
            : new o(
                (a.call(e, 0) |
                  (a.call(e, 1) << 8) |
                  (a.call(e, 2) << 16) |
                  (a.call(e, 3) << 24)) >>>
                  0,
                (a.call(e, 4) |
                  (a.call(e, 5) << 8) |
                  (a.call(e, 6) << 16) |
                  (a.call(e, 7) << 24)) >>>
                  0
              )
        }),
          (o.prototype.toHash = function () {
            return String.fromCharCode(
              255 & this.lo,
              (this.lo >>> 8) & 255,
              (this.lo >>> 16) & 255,
              this.lo >>> 24,
              255 & this.hi,
              (this.hi >>> 8) & 255,
              (this.hi >>> 16) & 255,
              this.hi >>> 24
            )
          }),
          (o.prototype.zzEncode = function () {
            var e = this.hi >> 31
            return (
              (this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ e) >>> 0),
              (this.lo = ((this.lo << 1) ^ e) >>> 0),
              this
            )
          }),
          (o.prototype.zzDecode = function () {
            var e = -(1 & this.lo)
            return (
              (this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ e) >>> 0),
              (this.hi = ((this.hi >>> 1) ^ e) >>> 0),
              this
            )
          }),
          (o.prototype.length = function () {
            var e = this.lo,
              t = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
              n = this.hi >>> 24
            return 0 === n
              ? 0 === t
                ? e < 16384
                  ? e < 128
                    ? 1
                    : 2
                  : e < 2097152
                    ? 3
                    : 4
                : t < 16384
                  ? t < 128
                    ? 5
                    : 6
                  : t < 2097152
                    ? 7
                    : 8
              : n < 128
                ? 9
                : 10
          }))
      },
      9693: function (e, t, n) {
        'use strict'
        var r = t
        function o(e, t, n) {
          for (var r = Object.keys(t), o = 0; o < r.length; ++o)
            (void 0 !== e[r[o]] && n) || (e[r[o]] = t[r[o]])
          return e
        }
        function i(e) {
          function t(e, n) {
            if (!(this instanceof t)) return new t(e, n)
            ;(Object.defineProperty(this, 'message', {
              get: function () {
                return e
              },
            }),
              Error.captureStackTrace
                ? Error.captureStackTrace(this, t)
                : Object.defineProperty(this, 'stack', { value: new Error().stack || '' }),
              n && o(this, n))
          }
          return (
            ((t.prototype = Object.create(Error.prototype)).constructor = t),
            Object.defineProperty(t.prototype, 'name', {
              get: function () {
                return e
              },
            }),
            (t.prototype.toString = function () {
              return this.name + ': ' + this.message
            }),
            t
          )
        }
        ;((r.asPromise = n(4537)),
          (r.base64 = n(7419)),
          (r.EventEmitter = n(9211)),
          (r.float = n(945)),
          (r.inquire = n(7199)),
          (r.utf8 = n(4997)),
          (r.pool = n(6662)),
          (r.LongBits = n(1945)),
          (r.isNode = Boolean(
            void 0 !== n.g &&
              n.g &&
              n.g.process &&
              n.g.process.versions &&
              n.g.process.versions.node
          )),
          (r.global =
            (r.isNode && n.g) ||
            ('undefined' != typeof window && window) ||
            ('undefined' != typeof self && self) ||
            this),
          (r.emptyArray = Object.freeze ? Object.freeze([]) : []),
          (r.emptyObject = Object.freeze ? Object.freeze({}) : {}),
          (r.isInteger =
            Number.isInteger ||
            function (e) {
              return 'number' == typeof e && isFinite(e) && Math.floor(e) === e
            }),
          (r.isString = function (e) {
            return 'string' == typeof e || e instanceof String
          }),
          (r.isObject = function (e) {
            return e && 'object' == typeof e
          }),
          (r.isset = r.isSet =
            function (e, t) {
              var n = e[t]
              return (
                !(null == n || !e.hasOwnProperty(t)) &&
                ('object' != typeof n || (Array.isArray(n) ? n.length : Object.keys(n).length) > 0)
              )
            }),
          (r.Buffer = (function () {
            try {
              var e = r.inquire('buffer').Buffer
              return e.prototype.utf8Write ? e : null
            } catch (e) {
              return null
            }
          })()),
          (r._Buffer_from = null),
          (r._Buffer_allocUnsafe = null),
          (r.newBuffer = function (e) {
            return 'number' == typeof e
              ? r.Buffer
                ? r._Buffer_allocUnsafe(e)
                : new r.Array(e)
              : r.Buffer
                ? r._Buffer_from(e)
                : 'undefined' == typeof Uint8Array
                  ? e
                  : new Uint8Array(e)
          }),
          (r.Array = 'undefined' != typeof Uint8Array ? Uint8Array : Array),
          (r.Long =
            (r.global.dcodeIO && r.global.dcodeIO.Long) || r.global.Long || r.inquire('long')),
          (r.key2Re = /^true|false|0|1$/),
          (r.key32Re = /^-?(?:0|[1-9][0-9]*)$/),
          (r.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/),
          (r.longToHash = function (e) {
            return e ? r.LongBits.from(e).toHash() : r.LongBits.zeroHash
          }),
          (r.longFromHash = function (e, t) {
            var n = r.LongBits.fromHash(e)
            return r.Long ? r.Long.fromBits(n.lo, n.hi, t) : n.toNumber(Boolean(t))
          }),
          (r.merge = o),
          (r.lcFirst = function (e) {
            return e.charAt(0).toLowerCase() + e.substring(1)
          }),
          (r.newError = i),
          (r.ProtocolError = i('ProtocolError')),
          (r.oneOfGetter = function (e) {
            for (var t = {}, n = 0; n < e.length; ++n) t[e[n]] = 1
            return function () {
              for (var e = Object.keys(this), n = e.length - 1; n > -1; --n)
                if (1 === t[e[n]] && void 0 !== this[e[n]] && null !== this[e[n]]) return e[n]
            }
          }),
          (r.oneOfSetter = function (e) {
            return function (t) {
              for (var n = 0; n < e.length; ++n) e[n] !== t && delete this[e[n]]
            }
          }),
          (r.toJSONOptions = { longs: String, enums: String, bytes: String, json: !0 }),
          (r._configure = function () {
            var e = r.Buffer
            e
              ? ((r._Buffer_from =
                  (e.from !== Uint8Array.from && e.from) ||
                  function (t, n) {
                    return new e(t, n)
                  }),
                (r._Buffer_allocUnsafe =
                  e.allocUnsafe ||
                  function (t) {
                    return new e(t)
                  }))
              : (r._Buffer_from = r._Buffer_allocUnsafe = null)
          }))
      },
      1173: (e, t, n) => {
        'use strict'
        e.exports = g
        var r,
          o = n(9693),
          i = o.LongBits,
          s = o.base64,
          a = o.utf8
        function A(e, t, n) {
          ;((this.fn = e), (this.len = t), (this.next = void 0), (this.val = n))
        }
        function u() {}
        function l(e) {
          ;((this.head = e.head), (this.tail = e.tail), (this.len = e.len), (this.next = e.states))
        }
        function g() {
          ;((this.len = 0),
            (this.head = new A(u, 0, 0)),
            (this.tail = this.head),
            (this.states = null))
        }
        var c = function () {
          return o.Buffer
            ? function () {
                return (g.create = function () {
                  return new r()
                })()
              }
            : function () {
                return new g()
              }
        }
        function d(e, t, n) {
          t[n] = 255 & e
        }
        function p(e, t) {
          ;((this.len = e), (this.next = void 0), (this.val = t))
        }
        function h(e, t, n) {
          for (; e.hi; )
            ((t[n++] = (127 & e.lo) | 128),
              (e.lo = ((e.lo >>> 7) | (e.hi << 25)) >>> 0),
              (e.hi >>>= 7))
          for (; e.lo > 127; ) ((t[n++] = (127 & e.lo) | 128), (e.lo = e.lo >>> 7))
          t[n++] = e.lo
        }
        function f(e, t, n) {
          ;((t[n] = 255 & e),
            (t[n + 1] = (e >>> 8) & 255),
            (t[n + 2] = (e >>> 16) & 255),
            (t[n + 3] = e >>> 24))
        }
        ;((g.create = c()),
          (g.alloc = function (e) {
            return new o.Array(e)
          }),
          o.Array !== Array && (g.alloc = o.pool(g.alloc, o.Array.prototype.subarray)),
          (g.prototype._push = function (e, t, n) {
            return ((this.tail = this.tail.next = new A(e, t, n)), (this.len += t), this)
          }),
          (p.prototype = Object.create(A.prototype)),
          (p.prototype.fn = function (e, t, n) {
            for (; e > 127; ) ((t[n++] = (127 & e) | 128), (e >>>= 7))
            t[n] = e
          }),
          (g.prototype.uint32 = function (e) {
            return (
              (this.len += (this.tail = this.tail.next =
                new p(
                  (e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5,
                  e
                )).len),
              this
            )
          }),
          (g.prototype.int32 = function (e) {
            return e < 0 ? this._push(h, 10, i.fromNumber(e)) : this.uint32(e)
          }),
          (g.prototype.sint32 = function (e) {
            return this.uint32(((e << 1) ^ (e >> 31)) >>> 0)
          }),
          (g.prototype.uint64 = function (e) {
            var t = i.from(e)
            return this._push(h, t.length(), t)
          }),
          (g.prototype.int64 = g.prototype.uint64),
          (g.prototype.sint64 = function (e) {
            var t = i.from(e).zzEncode()
            return this._push(h, t.length(), t)
          }),
          (g.prototype.bool = function (e) {
            return this._push(d, 1, e ? 1 : 0)
          }),
          (g.prototype.fixed32 = function (e) {
            return this._push(f, 4, e >>> 0)
          }),
          (g.prototype.sfixed32 = g.prototype.fixed32),
          (g.prototype.fixed64 = function (e) {
            var t = i.from(e)
            return this._push(f, 4, t.lo)._push(f, 4, t.hi)
          }),
          (g.prototype.sfixed64 = g.prototype.fixed64),
          (g.prototype.float = function (e) {
            return this._push(o.float.writeFloatLE, 4, e)
          }),
          (g.prototype.double = function (e) {
            return this._push(o.float.writeDoubleLE, 8, e)
          }))
        var I = o.Array.prototype.set
          ? function (e, t, n) {
              t.set(e, n)
            }
          : function (e, t, n) {
              for (var r = 0; r < e.length; ++r) t[n + r] = e[r]
            }
        ;((g.prototype.bytes = function (e) {
          var t = e.length >>> 0
          if (!t) return this._push(d, 1, 0)
          if (o.isString(e)) {
            var n = g.alloc((t = s.length(e)))
            ;(s.decode(e, n, 0), (e = n))
          }
          return this.uint32(t)._push(I, t, e)
        }),
          (g.prototype.string = function (e) {
            var t = a.length(e)
            return t ? this.uint32(t)._push(a.write, t, e) : this._push(d, 1, 0)
          }),
          (g.prototype.fork = function () {
            return (
              (this.states = new l(this)),
              (this.head = this.tail = new A(u, 0, 0)),
              (this.len = 0),
              this
            )
          }),
          (g.prototype.reset = function () {
            return (
              this.states
                ? ((this.head = this.states.head),
                  (this.tail = this.states.tail),
                  (this.len = this.states.len),
                  (this.states = this.states.next))
                : ((this.head = this.tail = new A(u, 0, 0)), (this.len = 0)),
              this
            )
          }),
          (g.prototype.ldelim = function () {
            var e = this.head,
              t = this.tail,
              n = this.len
            return (
              this.reset().uint32(n),
              n && ((this.tail.next = e.next), (this.tail = t), (this.len += n)),
              this
            )
          }),
          (g.prototype.finish = function () {
            for (var e = this.head.next, t = this.constructor.alloc(this.len), n = 0; e; )
              (e.fn(e.val, t, n), (n += e.len), (e = e.next))
            return t
          }),
          (g._configure = function (e) {
            ;((r = e), (g.create = c()), r._configure())
          }))
      },
      3155: (e, t, n) => {
        'use strict'
        e.exports = i
        var r = n(1173)
        ;(i.prototype = Object.create(r.prototype)).constructor = i
        var o = n(9693)
        function i() {
          r.call(this)
        }
        function s(e, t, n) {
          e.length < 40 ? o.utf8.write(e, t, n) : t.utf8Write ? t.utf8Write(e, n) : t.write(e, n)
        }
        ;((i._configure = function () {
          ;((i.alloc = o._Buffer_allocUnsafe),
            (i.writeBytesBuffer =
              o.Buffer &&
              o.Buffer.prototype instanceof Uint8Array &&
              'set' === o.Buffer.prototype.set.name
                ? function (e, t, n) {
                    t.set(e, n)
                  }
                : function (e, t, n) {
                    if (e.copy) e.copy(t, n, 0, e.length)
                    else for (var r = 0; r < e.length; ) t[n++] = e[r++]
                  }))
        }),
          (i.prototype.bytes = function (e) {
            o.isString(e) && (e = o._Buffer_from(e, 'base64'))
            var t = e.length >>> 0
            return (this.uint32(t), t && this._push(i.writeBytesBuffer, t, e), this)
          }),
          (i.prototype.string = function (e) {
            var t = o.Buffer.byteLength(e)
            return (this.uint32(t), t && this._push(s, t, e), this)
          }),
          i._configure())
      },
      7069: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.WebDNNCPUContextImpl = void 0))
        const r = n(3721)
        t.WebDNNCPUContextImpl = class {
          constructor() {
            this.backend = 'cpu'
          }
          async initialize() {}
          isCPUTensor(e) {
            return e.backend === this.backend
          }
          assertsCPUTensor(e) {
            if (e.backend !== this.backend)
              throw new Error(
                `Tensor backend ${this.backend} is expected, but ${e.backend} is given.`
              )
          }
          assertsCPUTensorArray(e) {
            for (const t of e)
              if (t.backend !== this.backend)
                throw new Error(
                  `Tensor backend ${this.backend} is expected, but ${t.backend} is given.`
                )
          }
          emptyTensor(e, t, n) {
            return new r.CPUTensorImpl(e, t, n)
          }
          async moveTensor(e) {
            return new r.CPUTensorImpl(e.dims, e.dataType, await e.getData())
          }
        }
      },
      3721: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.CPUTensorImpl = void 0))
        const r = n(3076),
          o = n(7804),
          i = n(7664).WebDNNLogging.getLogger('WebDNN.CPUTensorImpl')
        let s = 0
        class a extends o.TensorImpl {
          constructor(e, t = 'float32', n) {
            ;(super(e, t, 'cpu'),
              (this.data = n || new r.DataArrayConstructor[t](this.length)),
              n
                ? ((this.useExternalBuffer = !0),
                  i.debug('CPU memory use existing buffer', {
                    size: this.data.byteLength,
                    total: s,
                  }))
                : ((this.useExternalBuffer = !1),
                  (s += this.data.byteLength),
                  i.debug('CPU memory allocation', { size: this.data.byteLength, total: s })))
          }
          async getData() {
            return this.data
          }
          async setData(e) {
            this.data.set(e)
          }
          dispose() {
            ;(this.useExternalBuffer || (s -= this.data.byteLength),
              i.debug('CPU memory free', { size: this.data.byteLength, total: s }),
              (this.data = new Float32Array(1)))
          }
          static isCPUTensor(e) {
            return 'cpu' === e.backend
          }
          getDataSync() {
            return this.data
          }
          getValue(e) {
            if (e.length !== this.ndim) throw new Error('length of idxs does not match tensor.ndim')
            let t = 0
            for (let n = 0; n < this.ndim; n++) t += this.strides[n] * e[n]
            return this.data[t]
          }
          setValue(e, t) {
            if (t.length !== this.ndim) throw new Error('length of idxs does not match tensor.ndim')
            let n = 0
            for (let e = 0; e < this.ndim; e++) n += this.strides[e] * t[e]
            this.data[n] = e
          }
        }
        t.CPUTensorImpl = a
      },
      2895: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.WebDNNWasmContextImpl = void 0))
        const r = n(1670),
          o = n(7664).WebDNNLogging.getLogger('WebDNN.WebDNNWasmContextImpl')
        t.WebDNNWasmContextImpl = class {
          constructor(e, t) {
            if (
              ((this.cpuContext = e),
              (this.backend = 'wasm'),
              (this.initialized = !1),
              (this.initializing = !1),
              (this.resolvers = []),
              (this.perfTotalMemory = 0),
              'object' != typeof WebAssembly)
            )
              throw new Error('WebAssembly is not supported on this browser.')
          }
          async initialize(e) {
            if (!this.initialized) {
              if (this.initializing)
                throw new Error('initialize is called while initialize is running')
              return (
                (this.wasmWorkerSrcUrl = e),
                (this.initializing = !0),
                (this.worker = new Worker(this.wasmWorkerSrcUrl)),
                (this.worker.onmessage = (e) => {
                  for (let t = 0; t < this.resolvers.length; t++)
                    if (this.resolvers[t](e)) {
                      this.resolvers.splice(t, 1)
                      break
                    }
                }),
                this.resolvers.push((e) => {
                  if ('error' === e.data.type)
                    return (o.error('WebAssembly Error', e.data.message), !0)
                }),
                new Promise((e) => {
                  this.resolvers.push((t) => {
                    if ('initializeComplete' === t.data.type)
                      return ((this.initializing = !1), (this.initialized = !0), e(), !0)
                  })
                })
              )
            }
          }
          isWasmTensor(e) {
            return e.backend === this.backend
          }
          assertsWasmTensor(e) {
            if (e.backend !== this.backend)
              throw new Error(
                `Tensor backend ${this.backend} is expected, but ${e.backend} is given.`
              )
          }
          assertsWasmTensorArray(e) {
            for (const t of e)
              if (t.backend !== this.backend)
                throw new Error(
                  `Tensor backend ${this.backend} is expected, but ${t.backend} is given.`
                )
          }
          emptyTensor(e, t) {
            return new r.WasmTensorImpl(this, e, t)
          }
          async moveTensor(e) {
            const t = new r.WasmTensorImpl(this, e.dims, e.dataType)
            return (await t.setData(await e.getData()), t)
          }
          checkInitialized() {
            if (!this.initialized) throw new Error('Not initialized')
          }
          runKernel(e, t) {
            const n = t.map((e) =>
              'tensor' === e.type
                ? { type: 'tensor', bufferId: e.value.sharedBuffer.backendBufferId }
                : { type: 'scalar', value: e.value }
            )
            this.worker.postMessage({ type: 'runKernel', name: e, args: n })
          }
          allocBuffer(e) {
            this.worker.postMessage({
              type: 'alloc',
              bufferId: e.backendBufferId,
              byteLength: e.byteLength,
            })
          }
          destroyBuffer(e) {
            this.worker.postMessage({ type: 'destroy', bufferId: e.backendBufferId })
          }
          writeTensor(e, t) {
            const n = new Uint8Array(e.byteLength)
            ;(new t.constructor(n.buffer).set(t),
              this.worker.postMessage({ type: 'write', bufferId: e.backendBufferId, data: n }, [
                n.buffer,
              ]))
          }
          readTensor(e) {
            return (
              this.worker.postMessage({ type: 'read', bufferId: e.backendBufferId }),
              new Promise((e) => {
                this.resolvers.push((t) => {
                  if ('read' === t.data.type) return (e(t.data.data), !0)
                })
              })
            )
          }
        }
      },
      1670: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.WasmTensorImpl = t.WasmSharedBuffer = void 0))
        const r = n(3076),
          o = n(7804),
          i = n(7664).WebDNNLogging.getLogger('WebDNN.WasmTensorImpl')
        class s {
          constructor(e, t) {
            ;((this.context = e),
              (this.byteLength = t),
              (this.refCount = 1),
              (this.backendBufferId = s.nextBackendBufferId++),
              this.context.allocBuffer(this),
              (this.context.perfTotalMemory += this.byteLength),
              i.debug('WASM memory allocation', {
                size: this.byteLength,
                total: this.context.perfTotalMemory,
              }))
          }
          incrRef() {
            this.refCount++
          }
          dispose() {
            ;(this.refCount--,
              this.refCount <= 0 &&
                ((this.context.perfTotalMemory -= this.byteLength),
                i.debug('WASM memory free', {
                  size: this.byteLength,
                  total: this.context.perfTotalMemory,
                }),
                this.context.destroyBuffer(this)))
          }
        }
        ;((t.WasmSharedBuffer = s), (s.nextBackendBufferId = 1))
        class a extends o.TensorImpl {
          constructor(e, t, n = 'float32', r) {
            if ((super(t, n, 'wasm'), (this.context = e), 'float32' !== n))
              throw new Error('WasmTensor only supports float32')
            this.sharedBuffer =
              r || new s(this.context, this.length * Float32Array.BYTES_PER_ELEMENT)
          }
          alias(e) {
            return (
              this.sharedBuffer.incrRef(),
              new a(this.context, e, this.dataType, this.sharedBuffer)
            )
          }
          async getData() {
            const e = await this.context.readTensor(this.sharedBuffer)
            return new r.DataArrayConstructor[this.dataType](e.buffer)
          }
          async setData(e) {
            this.context.writeTensor(this.sharedBuffer, e)
          }
          dispose() {
            this.sharedBuffer.dispose()
          }
        }
        t.WasmTensorImpl = a
      },
      5843: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.unpackFromUint8Array =
            t.unpackFromInt32Array =
            t.unpackFromFloat16Array =
            t.unpackFromFloat32Array =
            t.packToUint8Array =
            t.packToInt32Array =
            t.packToFloat16Array =
            t.packToFloat32Array =
              void 0),
          (t.packToFloat32Array = function (e, t) {
            const n = new Float32Array(t)
            return (n.set(e), n)
          }),
          (t.packToFloat16Array = function (e, t) {
            const n = e.length
            let r
            if (e instanceof Float32Array) r = new Uint32Array(e.buffer, e.byteOffset, n)
            else {
              const t = new Float32Array(n)
              ;(t.set(e), (r = new Uint32Array(t.buffer)))
            }
            const o = new Uint16Array(t)
            for (let e = 0; e < n; e++) {
              const t = r[e]
              let n = ((t >> 13) & 261120) - 114688
              n < 0 ? (n = 0) : n > 31744 && (n = 31744)
              const i = ((t >> 16) & 32768) | n | ((t >> 13) & 1023)
              o[e] = i
            }
            return o
          }),
          (t.packToInt32Array = function (e, t) {
            const n = new Int32Array(t)
            return (n.set(e), n)
          }),
          (t.packToUint8Array = function (e, t) {
            const n = new Uint8Array(t)
            return (n.set(e), n)
          }),
          (t.unpackFromFloat32Array = function (e, t) {
            const n = new Float32Array(t),
              r = new Float32Array(e.buffer, e.byteOffset, t)
            return (n.set(r), n)
          }),
          (t.unpackFromFloat16Array = function (e, t) {
            const n = new Float32Array(t),
              r = new Uint32Array(n.buffer)
            for (let n = 0; n < t; n++) {
              const t = e[n]
              let o = 939524096 + ((t << 13) & 260046848)
              939524096 === o ? (o = 0) : 1199570944 === o && (o = 2139095040)
              const i = ((t << 16) & 2147483648) | o | ((1023 & t) << 13)
              r[n] = i
            }
            return n
          }),
          (t.unpackFromInt32Array = function (e, t) {
            const n = new Int32Array(t),
              r = new Int32Array(e.buffer, e.byteOffset, t)
            return (n.set(r), n)
          }),
          (t.unpackFromUint8Array = function (e, t) {
            const n = new Uint8Array(t),
              r = new Uint8Array(e.buffer, e.byteOffset, t)
            return (n.set(r), n)
          }))
      },
      9950: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.WebDNNWebGLContextImpl = t.WebGLSharedTexture = void 0))
        const r = n(1908),
          o = n(2660),
          i = n(7664).WebDNNLogging.getLogger('WebDNN.WebDNNWebGLContextImpl'),
          s = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1])
        function a(e = 1) {
          return new Promise((t) => {
            setTimeout(t, e)
          })
        }
        ;((t.WebGLSharedTexture = class {
          constructor(e, t, n, o) {
            ;((this.context = e),
              (this.textureWidth = t),
              (this.textureHeight = n),
              (this.dimPerPixel = o),
              (this.refCount = 1))
            const { gl: s } = this.context
            let a = null
            for (let e = 0; e < this.context.texturePool.length; e++) {
              const r = this.context.texturePool[e]
              if (r.textureWidth === t && r.textureHeight === n && r.dimPerPixel === o) {
                ;((a = r.texture), this.context.texturePool.splice(e, 1))
                break
              }
            }
            const A =
              this.textureWidth *
              this.textureHeight *
              this.dimPerPixel *
              Float32Array.BYTES_PER_ELEMENT
            if (a)
              ((this.texture = a),
                i.debug('WEBGL memory from pool', { size: A, total: this.context.perfTotalMemory }))
            else {
              if (
                (this.context.limitTexturePool(
                  this.context.maxAllocationBytes - A,
                  this.context.deallocateToBytes - A
                ),
                (this.texture = r.nonnull(s.createTexture())),
                s.activeTexture(s.TEXTURE0 + 9),
                s.bindTexture(s.TEXTURE_2D, this.texture),
                this.context.isWebGL2(s))
              )
                s.texStorage2D(
                  s.TEXTURE_2D,
                  1,
                  this.context.supportsTexture32bit
                    ? 1 === o
                      ? s.R32F
                      : s.RGBA32F
                    : 1 === o
                      ? s.R16F
                      : s.RGBA16F,
                  this.textureWidth,
                  this.textureHeight
                )
              else {
                if (1 !== o) throw new Error('colorPerPixel must be 1 in WebGL1')
                s.texImage2D(
                  s.TEXTURE_2D,
                  0,
                  s.RGBA,
                  this.textureWidth,
                  this.textureHeight,
                  0,
                  s.RGBA,
                  s.UNSIGNED_BYTE,
                  null
                )
              }
              ;(s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE),
                s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE),
                s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, s.NEAREST),
                s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, s.NEAREST),
                s.bindTexture(s.TEXTURE_2D, null),
                (this.context.perfTotalMemory += A),
                i.debug('WEBGL memory allocation', {
                  size: A,
                  total: this.context.perfTotalMemory,
                }))
            }
          }
          incrRef() {
            this.refCount++
          }
          dispose() {
            this.refCount--
            const e =
              this.textureWidth *
              this.textureHeight *
              this.dimPerPixel *
              Float32Array.BYTES_PER_ELEMENT
            this.refCount <= 0 &&
              (this.context.texturePool.push({
                textureWidth: this.textureWidth,
                textureHeight: this.textureHeight,
                dimPerPixel: this.dimPerPixel,
                texture: this.texture,
              }),
              i.debug('WEBGL memory to pool', { size: e, total: this.context.perfTotalMemory }))
          }
        }),
          (t.WebDNNWebGLContextImpl = class {
            constructor(e, t) {
              ;((this.cpuContext = e),
                (this.backend = 'webgl'),
                (this.programs = new Map()),
                (this.initialized = !1),
                (this.texturePool = []),
                (this.perfTotalMemory = 0),
                (this.needsDeleteTextureWait = !1),
                (this.timerQueryExt = null),
                (this.performanceQueries = []),
                (this.performanceQueryKey = null),
                (this.maxAllocationBytes = t.maxAllocationBytes || 536870912),
                (this.deallocateToBytes =
                  t.deallocateToBytes || Math.floor(this.maxAllocationBytes / 2)))
              const n = navigator.userAgent
              this.canOnlyReadRGBA =
                n.includes('Macintosh') && (n.includes('Chrome/') || n.includes('Firefox/'))
              const o = (function (e) {
                const t = document.createElement('canvas')
                let n = null
                for (const r of e || [
                  'webgl2-16384',
                  'webgl2-4096',
                  'webgl1-16384',
                  'webgl1-4096',
                ]) {
                  let e = !1
                  if (r.startsWith('webgl2')) {
                    if (((n = t.getContext('webgl2')), !n)) continue
                    e = !0
                  } else if (((n = t.getContext('webgl')), !n)) continue
                  const o = n.getParameter(n.MAX_TEXTURE_SIZE),
                    i = Number(r.slice(7))
                  if (!(i > o)) return { version: r, webgl2: e, maxTextureSize: i, gl: n }
                }
                return null
              })(t.versionOrder)
              if (!o)
                throw new Error(
                  'WebGL is not supported or does not have enough capability on this platform.'
                )
              const { gl: i, version: a, webgl2: A, maxTextureSize: u } = o
              if (
                ((this.gl = i),
                (this.webgl2 = A),
                (this.maxTextureSize = u),
                (this.version = a),
                this.webgl2)
              ) {
                if (i.getExtension('EXT_color_buffer_float'))
                  ((this.supportsTexture32bit = !0), (this.supportsTexture16bit = !0))
                else {
                  if (!i.getExtension('EXT_color_buffer_half_float'))
                    throw new Error(
                      'Neither EXT_color_buffer_float nor EXT_color_buffer_half_float are supported'
                    )
                  ;((this.supportsTexture32bit = !1), (this.supportsTexture16bit = !0))
                }
                this.timerQueryExt = i.getExtension('EXT_disjoint_timer_query_webgl2')
              } else ((this.supportsTexture32bit = !1), (this.supportsTexture16bit = !1))
              ;(i.disable(i.DEPTH_TEST),
                i.disable(i.STENCIL_TEST),
                i.disable(i.BLEND),
                i.disable(i.DITHER),
                i.disable(i.POLYGON_OFFSET_FILL),
                i.disable(i.SAMPLE_COVERAGE),
                i.enable(i.SCISSOR_TEST),
                i.enable(i.CULL_FACE),
                i.cullFace(i.BACK),
                i.pixelStorei(i.UNPACK_ALIGNMENT, 1))
              const l = this.createArrayBuffer(s)
              ;(this.bindArrayBuffer(l),
                (this.fb = r.nonnull(i.createFramebuffer())),
                i.bindFramebuffer(i.FRAMEBUFFER, this.fb))
            }
            async initialize() {
              this.initialized = !0
            }
            checkInitialized() {
              if (!this.initialized) throw new Error('Not initialized')
            }
            isWebGLTensor(e) {
              return e.backend === this.backend
            }
            assertsWebGLTensor(e) {
              if (e.backend !== this.backend)
                throw new Error(
                  `Tensor backend ${this.backend} is expected, but ${e.backend} is given.`
                )
            }
            assertsWebGLTensorArray(e) {
              for (const t of e)
                if (t.backend !== this.backend)
                  throw new Error(
                    `Tensor backend ${this.backend} is expected, but ${t.backend} is given.`
                  )
            }
            emptyTensor(e, t, n) {
              return new o.WebGLTensorImpl(
                this,
                e,
                t,
                null == n ? void 0 : n.dimPerPixel,
                null == n ? void 0 : n.textureShape
              )
            }
            async moveTensor(e, t) {
              const n = new o.WebGLTensorImpl(
                this,
                e.dims,
                e.dataType,
                t.dimPerPixel,
                t.textureShape
              )
              return (await n.setData(await e.getData()), n)
            }
            createArrayBuffer(e) {
              const t = r.nonnull(this.gl.createBuffer())
              return (
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t),
                this.gl.bufferData(this.gl.ARRAY_BUFFER, e, this.gl.STATIC_DRAW),
                t
              )
            }
            bindArrayBuffer(e) {
              this.gl.bindBuffer(this.gl.ARRAY_BUFFER, e)
            }
            createShader(e, t) {
              const n = r.nonnull(this.gl.createShader(e))
              if (
                (this.gl.shaderSource(n, t),
                this.gl.compileShader(n),
                !this.gl.getShaderParameter(n, this.gl.COMPILE_STATUS))
              )
                throw (
                  i.error(this.gl.getShaderInfoLog(n)),
                  Error(`Shader Compile failed: ${this.gl.getShaderInfoLog(n)}`)
                )
              return n
            }
            addKernel(e, t) {
              this.programs.has(e) || this.programs.set(e, { program: this.compileKernel(t) })
            }
            hasKernel(e) {
              return this.programs.has(e)
            }
            compileKernel(e) {
              const { gl: t } = this
              this.vshader ||
                (this.vshader = this.createShader(
                  t.VERTEX_SHADER,
                  this.webgl2
                    ? '#version 300 es\nprecision highp float;\nin vec2 _xy;\nvoid main() { \n  gl_Position = vec4(_xy, 0, 1); \n}\n'
                    : '\nprecision highp float;\nattribute vec2 _xy;\nvoid main() { \n  gl_Position = vec4(_xy, 0, 1); \n}\n'
                ))
              const n = this.createShader(t.FRAGMENT_SHADER, e),
                o = r.nonnull(this.gl.createProgram())
              if (
                (this.gl.attachShader(o, n),
                this.gl.attachShader(o, this.vshader),
                this.gl.linkProgram(o),
                !this.gl.getProgramParameter(o, this.gl.LINK_STATUS))
              )
                throw (
                  i.error(this.gl.getProgramInfoLog(o)),
                  new Error('ShaderProgram Initialization failed.')
                )
              return o
            }
            async runKernel(e, t, n, r) {
              this.checkInitialized()
              const o = this.gl
              let i = null
              ;(this.isWebGL2(o) &&
                this.timerQueryExt &&
                null != this.performanceQueryKey &&
                ((i = o.createQuery()), i && o.beginQuery(this.timerQueryExt.TIME_ELAPSED_EXT, i)),
                this.needsDeleteTextureWait &&
                  (await new Promise((e) => {
                    setTimeout(e, 1)
                  }),
                  (this.needsDeleteTextureWait = !1)))
              const a = this.programs.get(e)
              if (!a) throw new Error(`Unknown kernel ${e}`)
              const { gl: A } = this,
                u = A.getAttribLocation(a.program, '_xy')
              for (let e = 0; e < t.length; e++) t[e].tensor.bindToReadTexture(e)
              ;(n.bindToDrawTexture(), A.useProgram(a.program))
              for (let e = 0; e < t.length; e++)
                A.uniform1i(A.getUniformLocation(a.program, t[e].name), e)
              for (const e of r)
                switch (e.type) {
                  case 'float':
                    A.uniform1f(A.getUniformLocation(a.program, e.name), e.value)
                    break
                  case 'int':
                    A.uniform1i(A.getUniformLocation(a.program, e.name), e.value)
                    break
                  default:
                    throw new Error()
                }
              ;(A.vertexAttribPointer(u, 2, A.FLOAT, !0, 8, 0),
                A.enableVertexAttribArray(u),
                A.drawArrays(A.TRIANGLE_STRIP, 0, s.length / 2))
              for (let e = 0; e < t.length; e++) t[e].tensor.unbindFromReadTexture()
              if ((n.unbindFromDrawTexture(), i && this.isWebGL2(o) && this.timerQueryExt)) {
                o.endQuery(this.timerQueryExt.TIME_ELAPSED_EXT)
                const r = {
                  key: this.performanceQueryKey,
                  kernelName: e,
                  inputs: t.map(({ tensor: e, name: t }) => ({ dims: e.dims.slice(), name: t })),
                  output: { dims: n.dims.slice() },
                  elapsedNanoSecond: 0,
                  gpuDisjoint: !1,
                }
                this.performanceQueries.push({ info: r, query: i })
              }
            }
            isWebGL2(e) {
              return this.webgl2
            }
            limitTexturePool(e, t) {
              if (this.perfTotalMemory > e)
                for (; this.perfTotalMemory > t; ) {
                  const e = this.texturePool.shift()
                  if (!e) break
                  const t =
                    e.textureWidth *
                    e.textureHeight *
                    e.dimPerPixel *
                    Float32Array.BYTES_PER_ELEMENT
                  ;((this.perfTotalMemory -= t),
                    i.debug('WEBGL memory free', { size: t, total: this.perfTotalMemory }),
                    this.gl.deleteTexture(e.texture),
                    (this.needsDeleteTextureWait = !0))
                }
            }
            enablePerformanceQuery(e) {
              this.performanceQueryKey = e
            }
            gatherPerformanceQueryResult() {
              const e = this.gl
              if (this.isWebGL2(e) && this.timerQueryExt) {
                let t = !1
                return (
                  e.getParameter(this.timerQueryExt.GPU_DISJOINT_EXT) && (t = !0),
                  new Promise((n) => {
                    const r = [],
                      o = () => {
                        for (;;) {
                          const i = this.performanceQueries[0]
                          if (!i) {
                            n(r)
                            break
                          }
                          if (!e.getQueryParameter(i.query, e.QUERY_RESULT_AVAILABLE)) {
                            a(10).then(o)
                            break
                          }
                          {
                            const n = e.getQueryParameter(i.query, e.QUERY_RESULT)
                            this.performanceQueries.shift()
                            const o = i.info
                            ;((o.elapsedNanoSecond = n), (o.gpuDisjoint = t), r.push(o))
                          }
                        }
                      }
                    o()
                  })
                )
              }
              return Promise.reject('Performance query not supported')
            }
          }))
      },
      2660: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.WebGLTensorImpl = void 0))
        const r = n(5146),
          o = n(7804),
          i = n(9950),
          s = n(5843)
        class a extends o.TensorImpl {
          constructor(e, t, n = 'float32', r = 1, o, s) {
            if (
              (super(t, n, 'webgl'),
              (this.context = e),
              (this.dimPerPixel = r),
              (this.isBoundToDrawFrameBuffer = !1),
              (this.readTextureUnitIndices = []),
              'float32' !== n)
            )
              throw new Error('WebGLTensor only supports float32')
            const a = Math.ceil(this.length / r)
            if (
              (o
                ? ((this.textureHeight = o[0]), (this.textureWidth = o[1]))
                : ((this.textureWidth = this.context.maxTextureSize),
                  (this.textureHeight = Math.ceil(a / this.textureWidth))),
              this.textureHeight > this.context.maxTextureSize ||
                this.textureWidth > this.context.maxTextureSize)
            )
              throw new Error(
                `Cannot allocate texture of size ${this.length} in this environment. Please split large tensor in the model.`
              )
            this.sharedTexture =
              s ||
              new i.WebGLSharedTexture(
                this.context,
                this.textureWidth,
                this.textureHeight,
                this.dimPerPixel
              )
          }
          getTexture() {
            return this.sharedTexture.texture
          }
          alias(e) {
            return (
              this.sharedTexture.incrRef(),
              new a(
                this.context,
                e,
                this.dataType,
                this.dimPerPixel,
                [this.textureHeight, this.textureWidth],
                this.sharedTexture
              )
            )
          }
          async getData() {
            const { gl: e } = this.context
            let t
            if (
              this.context.isWebGL2(e) &&
              this.context.canOnlyReadRGBA &&
              1 === this.dimPerPixel
            ) {
              const e = await this.packToRGBA()
              return ((t = await e.getData()), e.dispose(), t)
            }
            if ((this.bindToDrawTexture(), this.context.isWebGL2(e)))
              if (this.context.supportsTexture32bit) {
                const n = new Float32Array(
                  this.textureHeight * this.textureWidth * this.dimPerPixel
                )
                ;(e.readPixels(
                  0,
                  0,
                  this.textureWidth,
                  this.textureHeight,
                  1 === this.dimPerPixel ? e.RED : e.RGBA,
                  e.FLOAT,
                  n
                ),
                  (t = s.unpackFromFloat32Array(n, this.length)))
              } else {
                const n = new Uint16Array(this.textureHeight * this.textureWidth * this.dimPerPixel)
                ;(e.readPixels(
                  0,
                  0,
                  this.textureWidth,
                  this.textureHeight,
                  1 === this.dimPerPixel ? e.RED : e.RGBA,
                  e.HALF_FLOAT,
                  n
                ),
                  (t = s.unpackFromFloat16Array(n, this.length)))
              }
            else {
              const n = new Uint8Array(this.textureHeight * this.textureWidth * 4)
              ;(e.readPixels(
                0,
                0,
                this.textureWidth,
                this.textureHeight,
                e.RGBA,
                e.UNSIGNED_BYTE,
                n
              ),
                (t = this.unpackColor(n)))
            }
            return (this.unbindFromDrawTexture(), t)
          }
          unpackColor(e) {
            const t = new Float32Array(this.length)
            for (let n = 0; n < this.length; n++) {
              const r = e[4 * n],
                o = e[4 * n + 1],
                i = e[4 * n + 2],
                s = e[4 * n + 3]
              let a = 0
              if (r > 0) {
                let e, t
                ;(r >= 128 ? ((e = 1), (t = r - 192)) : ((e = -1), (t = r - 64)),
                  (a = (o / 255 + i / 65025 + s / 16581375) * Math.pow(2, t) * e))
              }
              t[n] = a
            }
            return t
          }
          async setData(e) {
            const { gl: t } = this.context
            if ((this.bindToReadTexture(9), this.context.isWebGL2(t)))
              if (this.context.supportsTexture32bit) {
                const n = s.packToFloat32Array(
                  e,
                  this.textureWidth * this.textureHeight * this.dimPerPixel
                )
                t.texSubImage2D(
                  t.TEXTURE_2D,
                  0,
                  0,
                  0,
                  this.textureWidth,
                  this.textureHeight,
                  1 === this.dimPerPixel ? t.RED : t.RGBA,
                  t.FLOAT,
                  n
                )
              } else {
                const n = s.packToFloat16Array(
                  e,
                  this.textureWidth * this.textureHeight * this.dimPerPixel
                )
                t.texSubImage2D(
                  t.TEXTURE_2D,
                  0,
                  0,
                  0,
                  this.textureWidth,
                  this.textureHeight,
                  1 === this.dimPerPixel ? t.RED : t.RGBA,
                  t.HALF_FLOAT,
                  n
                )
              }
            else {
              const n = this.packColor(e)
              t.texSubImage2D(
                t.TEXTURE_2D,
                0,
                0,
                0,
                this.textureWidth,
                this.textureHeight,
                t.RGBA,
                t.UNSIGNED_BYTE,
                n
              )
            }
            this.unbindFromReadTexture()
          }
          packColor(e) {
            const t = new Uint8Array(this.textureWidth * this.textureHeight * 4)
            for (let n = 0; n < this.length; n++) {
              const r = e[n]
              let o = 0,
                i = 0,
                s = 0,
                a = 0
              if (0 !== r) {
                const e = r > 0 ? 192 : 64,
                  t = Math.abs(r),
                  n = Math.ceil(Math.log2(t) + 1e-4),
                  A = t * Math.pow(2, -n)
                let u = A,
                  l = 255 * A
                ;((l -= Math.trunc(l)), (u -= l / 255))
                let g = 65025 * A
                ;((g -= Math.trunc(g)),
                  (l -= g / 255),
                  (o = e + n),
                  (i = Math.min(Math.max(Math.ceil(255 * (u - 0.5 / 255)), 0), 255)),
                  (s = Math.min(Math.max(Math.ceil(255 * (l - 0.5 / 255)), 0), 255)),
                  (a = Math.min(Math.max(Math.ceil(255 * (g - 0.5 / 255)), 0), 255)))
              }
              ;((t[4 * n] = o), (t[4 * n + 1] = i), (t[4 * n + 2] = s), (t[4 * n + 3] = a))
            }
            return t
          }
          dispose() {
            this.sharedTexture.dispose()
          }
          bindToReadTexture(e) {
            if (this.isBoundToDrawFrameBuffer)
              throw Error(
                'This buffer is already registered as draw buffer. You may forgot to unbind the binding while previous operations.'
              )
            const { gl: t } = this.context
            ;(t.activeTexture(t.TEXTURE0 + e),
              t.bindTexture(t.TEXTURE_2D, this.getTexture()),
              this.readTextureUnitIndices.push(e))
          }
          unbindFromReadTexture() {
            const { gl: e } = this.context
            for (const t of this.readTextureUnitIndices)
              (e.activeTexture(e.TEXTURE0 + t), e.bindTexture(e.TEXTURE_2D, null))
            this.readTextureUnitIndices = []
          }
          bindToDrawTexture() {
            if (this.readTextureUnitIndices.length > 0)
              throw Error(
                'This buffer is already registered as read buffer. You cannot bind a texture as both read and draw texture buffer at same time.'
              )
            if (this.isBoundToDrawFrameBuffer)
              throw Error(
                'This buffer is already registered as draw buffer. You may forgot to unbind the binding while previous operations.'
              )
            const { gl: e } = this.context
            ;(e.viewport(0, 0, this.textureWidth, this.textureHeight),
              e.scissor(0, 0, this.textureWidth, this.textureHeight),
              e.framebufferTexture2D(
                e.FRAMEBUFFER,
                e.COLOR_ATTACHMENT0,
                e.TEXTURE_2D,
                this.getTexture(),
                0
              ),
              (this.isBoundToDrawFrameBuffer = !0))
          }
          unbindFromDrawTexture() {
            if (!this.isBoundToDrawFrameBuffer) return
            const { gl: e } = this.context
            ;(e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, null, 0),
              (this.isBoundToDrawFrameBuffer = !1))
          }
          async packToRGBA() {
            const e = new a(this.context, this.dims, 'float32', 4),
              t = this.length,
              n = Math.ceil(e.length / 4),
              o = 'RToRGBA'
            if (!this.context.hasKernel(o)) {
              const e = `${r.shaderGenHeader(this.context.webgl2)}\n  \n${r.shaderGenTensorOutputUniform(1)}\n${r.shaderGenTensorNDGet('tex_input', 1, this.context.webgl2)}\nuniform int input_pixels;\n\nvoid main() {\n  ${r.shaderGenTensorOutputCoordsWithReturn(1)}\n  vec4 result = vec4(0.0, 0.0, 0.0, 0.0);\n  int pos = tex_output_0 * 4;\n  if (pos < input_pixels) {\n    result.r = get_tex_input(pos);\n  }\n  pos++;\n  if (pos < input_pixels) {\n    result.g = get_tex_input(pos);\n  }\n  pos++;\n  if (pos < input_pixels) {\n    result.b = get_tex_input(pos);\n  }\n  pos++;\n  if (pos < input_pixels) {\n    result.a = get_tex_input(pos);\n  }\n  fragColor = result;\n  return;\n}\n      `
              this.context.addKernel(o, e)
            }
            const i = [
              ...r.shaderGenTensorNDGetUniformItem(
                'tex_input',
                [1],
                [this.textureHeight, this.textureWidth],
                this.context.webgl2
              ),
              ...r.shaderGenTensorOutputUniformItem(
                [n],
                [e.textureHeight, e.textureWidth],
                this.context.webgl2
              ),
              { name: 'input_pixels', type: 'int', value: t },
            ]
            return (await this.context.runKernel(o, [{ tensor: this, name: 'tex_input' }], e, i), e)
          }
        }
        t.WebGLTensorImpl = a
      },
      780: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.WebDNNWebGPUContextImpl = void 0))
        const r = n(2465),
          o = n(6617)
        t.WebDNNWebGPUContextImpl = class {
          constructor(e, t) {
            if (
              ((this.cpuContext = e),
              (this.backend = 'webgpu'),
              (this.pooledMetaBuffer = []),
              'object' != typeof navigator.gpu || 'function' != typeof navigator.gpu.requestAdapter)
            )
              throw new Error('WebGPU is not supported on this browser')
            ;((this.initialized = !1), (this.isSupported = !1), (this.pipelines = new Map()))
          }
          async initialize() {
            if (this.initialized) return
            const e = await navigator.gpu.requestAdapter()
            if (((this.device = await e.requestDevice()), !this.device))
              throw new Error('GPUAdapter.requestDevice() returned null')
            ;((this.isSupported = !0), (this.initialized = !0))
          }
          isWebGLTensor(e) {
            return e.backend === this.backend
          }
          assertsWebGPUTensor(e) {
            if (e.backend !== this.backend)
              throw new Error(
                `Tensor backend ${this.backend} is expected, but ${e.backend} is given.`
              )
          }
          assertsWebGPUTensorArray(e) {
            for (const t of e)
              if (t.backend !== this.backend)
                throw new Error(
                  `Tensor backend ${this.backend} is expected, but ${t.backend} is given.`
                )
          }
          emptyTensor(e, t, n, r) {
            return new o.WebGPUTensorImpl(this, e, t, n, r)
          }
          async moveTensor(e) {
            const t = new o.WebGPUTensorImpl(this, e.dims, e.dataType, !0, !1)
            return (await t.setData(await e.getData()), t)
          }
          hasPipeline(e) {
            return this.pipelines.has(e)
          }
          createPipeline(e, t, n) {
            if (this.hasPipeline(e)) return
            const { device: r } = this,
              o = []
            for (let e = 0; e < n; e++)
              o.push({
                binding: e,
                visibility: GPUShaderStage.COMPUTE,
                buffer: { type: 'storage' },
              })
            const i = r.createBindGroupLayout({ entries: o }),
              s = r.createPipelineLayout({ bindGroupLayouts: [i] }),
              a = r.createShaderModule({ code: t }),
              A = r.createComputePipeline({
                layout: s,
                computeStage: { module: a, entryPoint: 'main' },
              })
            this.pipelines.set(e, { bindGroupLayout: i, pipeline: A })
          }
          async run(e) {
            const t = this.pipelines.get(e.pipelineName)
            if (!t) throw new Error(`Pipeline ${t} not found`)
            const { device: n } = this,
              o = e.tensors.map((e, t) => ({
                binding: t,
                resource: { buffer: e.buffer, size: e.bufferSize },
              }))
            let i = null
            e.meta &&
              ((i = await r.WebGPUMetaBuffer.createBuffer(this, e.meta)),
              o.push({
                binding: o.length,
                resource: { buffer: i.tensor.buffer, size: i.tensor.bufferSize },
              }))
            const s = n.createBindGroup({ layout: t.bindGroupLayout, entries: o }),
              a = n.createCommandEncoder(),
              A = a.beginComputePass()
            ;(A.setBindGroup(0, s),
              A.setPipeline(t.pipeline),
              A.dispatch(e.workGroups.x, e.workGroups.y, e.workGroups.z),
              A.endPass(),
              n.queue.submit([a.finish()]),
              null == i || i.pushToPool())
          }
        }
      },
      2465: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.WebGPUMetaBuffer = void 0))
        const r = n(6617)
        class o {
          constructor(e, t, n, r) {
            ;((this.context = e), (this.tensor = t), (this.cpuBuffer = n), (this.cpuBufferHash = r))
          }
          static buildCPUBuffer(e) {
            const t = 4 * e.elements.length,
              n = new Uint8Array(t),
              r = new DataView(n.buffer)
            let o = 0
            for (const t of e.elements) {
              switch (t.type) {
                case 'int32':
                  r.setInt32(o, t.value, !0)
                  break
                case 'uint32':
                  r.setUint32(o, t.value, !0)
                  break
                case 'float32':
                  r.setFloat32(o, t.value, !0)
                  break
                default:
                  throw new Error()
              }
              o += 4
            }
            return n
          }
          static calcBufferHash(e) {
            let t = 0
            for (let n = 0; n < e.length; n++) t += e[n]
            return t
          }
          static findPooled(e, t, n) {
            const r = e.pooledMetaBuffer
            for (let e = 0; e < r.length; e++) {
              const o = r[e]
              if (o.cpuBuffer.length === t.length && o.cpuBufferHash === n) {
                let n = !1
                for (let e = 0; e < t.length; e++)
                  if (t[e] !== o.cpuBuffer[e]) {
                    n = !0
                    break
                  }
                if (!n) return (r.splice(e, 1), o)
              }
            }
            return null
          }
          static async createBuffer(e, t) {
            const n = o.buildCPUBuffer(t),
              i = o.calcBufferHash(n),
              s = o.findPooled(e, n, i)
            if (s) return s
            const a = new r.WebGPUTensorImpl(e, [n.length / 4], 'float32', !0, !1)
            return (await a.setData(new Float32Array(n.buffer)), new o(e, a, n, i))
          }
          pushToPool() {
            this.context.pooledMetaBuffer.push(this)
          }
        }
        t.WebGPUMetaBuffer = o
      },
      6617: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.WebGPUTensorImpl = void 0))
        const r = n(7804)
        class o extends r.TensorImpl {
          constructor(e, t, n = 'float32', r = !1, o = !0) {
            if (
              (super(t, n, 'webgpu'),
              (this.context = e),
              (this.forWriteFromCPU = r),
              (this.forReadToCPU = o),
              'float32' !== n)
            )
              throw new Error('WebGLTensor only supports float32')
            if (r && o) throw new Error('WebGPUTensor cannot be both for read and write')
            this.bufferSize = Math.max(this.length * Float32Array.BYTES_PER_ELEMENT, 4)
            let i = GPUBufferUsage.STORAGE
            ;(o && (i |= GPUBufferUsage.COPY_SRC),
              (this.buffer = this.context.device.createBuffer({
                mappedAtCreation: r,
                size: this.bufferSize,
                usage: i,
              })),
              (this.mappedForWriteFromCPU = r))
          }
          async getData() {
            const e = new Float32Array(this.length),
              t = this.context.device.createBuffer({
                size: this.bufferSize,
                usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
              }),
              n = this.context.device.createCommandEncoder()
            ;(n.copyBufferToBuffer(this.buffer, 0, t, 0, this.bufferSize),
              this.context.device.queue.submit([n.finish()]),
              await t.mapAsync(GPUMapMode.READ))
            const r = t.getMappedRange(),
              o = new Float32Array(r, 0, this.length)
            return (e.set(o), t.unmap(), t.destroy(), e)
          }
          async setData(e) {
            if (!this.mappedForWriteFromCPU) throw new Error('The buffer is not mapped')
            const t = this.buffer.getMappedRange()
            ;(new Float32Array(t).set(e), this.buffer.unmap(), (this.mappedForWriteFromCPU = !1))
          }
          dispose() {
            this.buffer && this.buffer.destroy()
          }
        }
        t.WebGPUTensorImpl = o
      },
      3595: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.InputProxy = void 0))
        const r = n(2055)
        t.InputProxy = class {
          constructor(e, t) {
            ;((this.dataType = t), (this.dims = e))
            const n = r.arrayProd(e)
            this.length = n
            for (let e = 0; e < n; e++) this[e] = 0
          }
          set(e) {
            for (let t = 0; t < e.length; t++) this[t] = e[t]
          }
        }
      },
      9630: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.findTensorReleaseTiming = t.modelTransform = void 0))
        const r = n(7664).WebDNNLogging.getLogger('WebDNN.modelTransform')
        ;((t.modelTransform = function (e, t) {
          !(function (e) {
            const t = new Set()
            for (const n of e.graph.node) {
              let e = n.name
              if ((e || (e = 'unnamed'), t.has(e))) {
                let o = e + '_'
                for (; t.has(o); ) o += '_'
                ;((n.name = o),
                  t.add(o),
                  r.warn(`node name ${e} is already used: renaming to ${o}`))
              } else t.add(e)
            }
          })(e)
        }),
          (t.findTensorReleaseTiming = function (e, t) {
            const n = new Map(),
              r = e.graph
            for (const e of r.node) for (const t of e.input) n.set(t, e.name)
            for (const e of t) n.delete(e)
            for (const e of r.input) n.delete(e.name)
            for (const e of r.output) n.delete(e.name)
            const o = new Map()
            for (const [e, t] of n.entries()) {
              const n = o.get(t) || []
              ;(n.push(e), o.set(t, n))
            }
            return o
          }))
      },
      1339: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.instantiateOperator = t.registerOperators = void 0))
        const n = {}
        function r(e) {
          ;(e.opType in n || (n[e.opType] = []), n[e.opType].push(e))
        }
        ;((t.registerOperators = function (e) {
          for (const t of e) r(t)
        }),
          (t.instantiateOperator = function (e, t, r, o) {
            const i = n[e]
            if (!i) return null
            let s = r
            switch (e) {
              case 'Flatten':
              case 'Pad':
              case 'Reshape':
              case 'Squeeze':
              case 'Transpose':
              case 'Unsqueeze':
                for (const e of r) o[0].includes(e) && (s = [e])
                break
              case 'Shape':
                s = ['cpu']
            }
            for (const e of s)
              for (const n of i)
                if (n.backend === e && !(n.opsetMin > t || (null != n.opsetMax && n.opsetMax <= t)))
                  return n.factory()
            return null
          }))
      },
      9430: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.OutputProxy = void 0))
        const r = n(3076),
          o = n(2055)
        t.OutputProxy = class {
          constructor(e, t) {
            ;((this.dataType = t), (this.dims = e))
            const n = o.arrayProd(e)
            this.length = n
            for (let e = 0; e < n; e++) this[e] = 0
          }
          set(e) {
            for (let t = 0; t < e.length; t++) this[t] = e[t]
          }
          toActual() {
            const e = new r.DataArrayConstructor[this.dataType](this.length)
            for (let t = 0; t < this.length; t++) e[t] = this[t]
            return e
          }
        }
      },
      3683: function (e, t, n) {
        'use strict'
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.RunnerImpl = void 0))
        const o = n(1446),
          i = n(3076),
          s = n(1908),
          a = r(n(3720)),
          A = n(3595),
          u = n(9430),
          l = n(9630),
          g = n(1339),
          c = n(9422),
          d = n(7664).WebDNNLogging.getLogger('WebDNN.runner')
        t.RunnerImpl = class {
          constructor(e, t) {
            ;((this.backendOrder = e),
              (this.backendContexts = t),
              (this.backendName = this.backendOrder[0]),
              (this.loaded = !1),
              (this.useCompatibilityProxy = !1),
              (this.tensorMoveOptions = {}),
              (this.forceOperatorBackendOrder = {}))
          }
          getTensorLoader(e) {
            return new c.TensorLoaderImpl(e, this.backendContexts.cpu)
          }
          async loadModel(e, t, n) {
            const r = await fetch(e + t),
              i = await r.arrayBuffer()
            ;((this.model = o.onnx.ModelProto.decode(new Uint8Array(i))),
              l.modelTransform(this.model, this.backendOrder),
              1 !== this.model.opsetImport.length &&
                d.warn('Specifying multiple opset_import is not supported. Using first one.'),
              (this.opset = s.intOrLongToInt(this.model.opsetImport[0].version)),
              (this.initializerTensors = new Map()))
            for (const [e, t] of this.extractInitializerTensor().entries())
              this.initializerTensors.set(e, t)
            for (const [t, r] of (await this.loadExternalInitializerTensor(e, n)).entries())
              this.initializerTensors.set(t, r)
            ;(this.useCompatibilityProxy && (this.initInputProxy(), this.initOutputProxy()),
              (this.copiedInitializerTensors = new Map()))
            for (const e of this.backendOrder)
              'cpu' !== e && this.copiedInitializerTensors.set(e, new Map())
            this.inputsWithoutInitializer = this.model.graph.input.filter(
              (e) => e.name && !this.initializerTensors.has(e.name)
            )
            for (const e of this.model.metadataProps)
              ('WebDNN2.TensorMoveOptions' === e.key &&
                (this.tensorMoveOptions = JSON.parse(e.value)),
                'WebDNN2.ForceOperatorBackendOrder' === e.key &&
                  (this.forceOperatorBackendOrder = JSON.parse(e.value)))
            this.loaded = !0
          }
          extractInitializerTensor() {
            var e, t, n
            const r = new Map()
            for (const i of this.model.graph.initializer) {
              const A = s.intOrLongToIntVector(i.dims)
              if (i.dataType === o.onnx.TensorProto.DataType.FLOAT)
                if (null === (e = i.rawData) || void 0 === e ? void 0 : e.byteLength) {
                  const e = new Uint8Array(i.rawData.byteLength)
                  ;(e.set(i.rawData),
                    r.set(
                      i.name,
                      this.backendContexts.cpu.emptyTensor(
                        A,
                        'float32',
                        new Float32Array(e.buffer, 0, e.byteLength / Float32Array.BYTES_PER_ELEMENT)
                      )
                    ))
                } else
                  i.floatData &&
                    r.set(
                      i.name,
                      this.backendContexts.cpu.emptyTensor(
                        A,
                        'float32',
                        new Float32Array(i.floatData)
                      )
                    )
              else if (i.dataType === o.onnx.TensorProto.DataType.INT64)
                if (null === (t = i.rawData) || void 0 === t ? void 0 : t.byteLength) {
                  const e = i.rawData,
                    t = new DataView(e.buffer, e.byteOffset, e.byteLength),
                    n = new Int32Array(t.byteLength / 8)
                  for (let e = 0; e < n.length; e++)
                    n[e] = s.clipLong(
                      new a.default(t.getUint32(8 * e, !0), t.getUint32(8 * e + 4, !0))
                    )
                  r.set(i.name, this.backendContexts.cpu.emptyTensor(A, 'int32', n))
                } else
                  i.int64Data &&
                    r.set(
                      i.name,
                      this.backendContexts.cpu.emptyTensor(
                        A,
                        'int32',
                        new Int32Array(s.intOrLongToIntVector(i.int64Data))
                      )
                    )
              else {
                if (i.dataType !== o.onnx.TensorProto.DataType.INT32)
                  throw new Error(`Unsupported initializer dataType ${i.dataType}`)
                if (null === (n = i.rawData) || void 0 === n ? void 0 : n.byteLength) {
                  const e = i.rawData,
                    t = new DataView(e.buffer, e.byteOffset, e.byteLength),
                    n = new Int32Array(t.byteLength / 4)
                  for (let e = 0; e < n.length; e++) n[e] = t.getInt32(4 * e, !0)
                  r.set(i.name, this.backendContexts.cpu.emptyTensor(A, 'int32', n))
                } else
                  i.int32Data &&
                    r.set(
                      i.name,
                      this.backendContexts.cpu.emptyTensor(A, 'int32', new Int32Array(i.int32Data))
                    )
              }
            }
            return r
          }
          async loadExternalInitializerTensor(e, t) {
            let n = null
            for (const e of this.model.metadataProps)
              if ('WebDNN2.WeightSizes' === e.key) {
                n = 0
                for (const t of e.value.split(':')) n += Number(t)
              }
            for (const r of this.model.metadataProps)
              if ('WebDNN2.WeightPaths' === r.key) {
                const o = r.value.split(':').map((t) => e + t),
                  i = this.getTensorLoader(o)
                let s
                if (n && t) {
                  const e = n
                  s = (n) => {
                    t(n, e)
                  }
                }
                return i.loadAll(s)
              }
            return (
              t && d.warn('progressCallback is currently supported when loading optimized model.'),
              new Map()
            )
          }
          getIOProxyShape(e) {
            var t, n, r, i, a, A
            const u = s.nonnull(
              null ===
                (i =
                  null ===
                    (r =
                      null ===
                        (n = null === (t = e.type) || void 0 === t ? void 0 : t.tensorType) ||
                      void 0 === n
                        ? void 0
                        : n.shape) || void 0 === r
                    ? void 0
                    : r.dim) || void 0 === i
                ? void 0
                : i.map((e) => s.intOrLongToInt(s.nonnull(e.dimValue)))
            )
            let l
            switch (
              null === (A = null === (a = e.type) || void 0 === a ? void 0 : a.tensorType) ||
              void 0 === A
                ? void 0
                : A.elemType
            ) {
              case o.onnx.TensorProto.DataType.FLOAT:
                l = 'float32'
                break
              case o.onnx.TensorProto.DataType.INT32:
              case o.onnx.TensorProto.DataType.INT64:
                l = 'int32'
                break
              default:
                throw new Error()
            }
            return { shape: u, dataType: l }
          }
          initInputProxy() {
            this.inputs = this.inputsWithoutInitializer.map((e) => {
              const { shape: t, dataType: n } = this.getIOProxyShape(e)
              return new A.InputProxy(t, n)
            })
          }
          initOutputProxy() {
            var e
            const t = s.nonnull(null === (e = this.model) || void 0 === e ? void 0 : e.graph)
            this.outputs = t.output.map((e) => {
              const { shape: t, dataType: n } = this.getIOProxyShape(e)
              return new u.OutputProxy(t, n)
            })
          }
          getInputNames() {
            return this.inputsWithoutInitializer.map((e) => e.name)
          }
          getOutputNames() {
            var e
            return s
              .nonnull(null === (e = this.model) || void 0 === e ? void 0 : e.graph)
              .output.map((e) => e.name)
          }
          async run(e, t = {}) {
            var n, r
            if (!this.model || !this.loaded) throw new Error('not initialized')
            const o = s.nonnull(this.model.graph),
              a = { cpu: new Map(), wasm: new Map(), webgl: new Map(), webgpu: new Map() }
            for (const [e, t] of this.initializerTensors.entries()) a.cpu.set(e, t)
            for (const [e, t] of this.copiedInitializerTensors.entries())
              for (const [n, r] of t.entries()) a[e].set(n, r)
            if (!e) {
              if (!this.useCompatibilityProxy) throw new Error()
              e = this.inputs.map((e) => {
                const t = this.backendContexts.cpu.emptyTensor(e.dims, e.dataType)
                return (t.data.set(e), t)
              })
            }
            if (this.inputsWithoutInitializer.length !== e.length)
              throw new Error('length of inputs mismatch')
            for (let t = 0; t < e.length; t++) {
              const n = this.inputsWithoutInitializer[t]
              a.cpu.set(n.name, e[t])
            }
            const A = l.findTensorReleaseTiming(
                this.model,
                new Set(this.initializerTensors.keys())
              ),
              u = []
            for (let e = 0; e < o.node.length; e++) {
              const r = Date.now(),
                l = o.node[e],
                c = s.nonnull(l.opType)
              let p,
                h,
                f,
                I = this.forceOperatorBackendOrder[l.name] || this.backendOrder,
                m = !0
              for (;;)
                try {
                  const e = []
                  for (let t = 0; t < l.input.length; t++) {
                    const n = l.input[t],
                      r = []
                    for (const e of I) a[e].has(n) && r.push(e)
                    if (0 === r.length) for (const e of i.backends) a[e].has(n) && r.push(e)
                    e.push(r)
                  }
                  const r = g.instantiateOperator(c, this.opset, I, e)
                  if (!r)
                    throw new Error(
                      `Operator implementation for ${c}, opset=${this.opset} does not exist.`
                    )
                  r.initialize(s.nonnull(l.attribute))
                  const o = r.getTensorBackendRequirement(l.input.length, l.output.length),
                    A = []
                  for (let t = 0; t < l.input.length; t++) {
                    const n = l.input[t],
                      r = o[t]
                    if (r) {
                      const e = a[r].get(n)
                      if (e) A.push(e)
                      else {
                        let e = !1
                        for (const t of this.backendOrder) {
                          const o = a[t].get(n)
                          if (o) {
                            const t = this.tensorMoveOptions[n] || {},
                              i = await this.backendContexts[r].moveTensor(o, t)
                            ;(a[r].set(n, i), A.push(i), (e = !0))
                            break
                          }
                        }
                        if (!e) throw new Error(`Input ${n} not found`)
                      }
                    } else {
                      const r = a[e[t][0]].get(n)
                      if (!r) throw new Error()
                      A.push(r)
                    }
                  }
                  let u = {}
                  switch (r.backend) {
                    case 'wasm':
                      u = this.backendContexts.wasm
                      break
                    case 'webgpu':
                      u = this.backendContexts.webgpu
                      break
                    case 'webgl':
                      u = this.backendContexts.webgl
                      break
                    case 'cpu':
                      u = this.backendContexts.cpu
                      break
                    default:
                      throw new Error()
                  }
                  ;(d.debug(`Running ${l.name}(${c}) on ${r.backend}`),
                    t.measurePerformance &&
                      'webgl' === r.backend &&
                      (null === (n = this.backendContexts.webgl) ||
                        void 0 === n ||
                        n.enablePerformanceQuery(`${l.name}(${c})`)))
                  const m = await r.run(u, A, l.output.length)
                  ;((h = A.map((e) => e.dims)), (f = m.map((e) => e.dims)))
                  for (let e = 0; e < l.output.length; e++) {
                    const t = l.output[e]
                    a[m[e].backend].set(t, m[e])
                  }
                  p = r.backend
                  break
                } catch (e) {
                  if (m) {
                    ;(d.warn(`Failed to run ${l.name}. Retrying on cpu.`, e),
                      (m = !1),
                      (I = ['cpu']))
                    continue
                  }
                  throw e
                }
              const E = A.get(l.name) || []
              for (const e of E)
                for (const t of Object.keys(a)) {
                  const n = a[t].get(e)
                  n && (n.dispose(), a[t].delete(e))
                }
              const y = Date.now()
              u.push({
                opType: l.opType,
                name: l.name,
                backend: p,
                inputDims: h,
                outputDims: f,
                elapsed: y - r,
              })
            }
            const c = []
            for (let e = 0; e < o.output.length; e++) {
              const t = o.output[e]
              let n = a.cpu.get(t.name)
              if (!n)
                for (const e of this.backendOrder) {
                  const r = a[e].get(t.name)
                  if (r) {
                    const e = await this.backendContexts.cpu.moveTensor(r, {})
                    ;(a.cpu.set(t.name, e), (n = e))
                    break
                  }
                }
              if (!n) throw new Error(`Output ${t.name} not found`)
              ;(this.useCompatibilityProxy && this.outputs[e].set(n.data), c.push(n))
            }
            for (const e of i.backendsWithoutCPU)
              for (const [t, n] of a[e].entries())
                this.initializerTensors.has(t)
                  ? this.copiedInitializerTensors.get(e).set(t, n)
                  : n.dispose()
            if (t.measurePerformance) {
              d.debug('Performance', u)
              try {
                const e = await (null === (r = this.backendContexts.webgl) || void 0 === r
                  ? void 0
                  : r.gatherPerformanceQueryResult())
                d.debug('WebGL Performance', e)
              } catch (e) {
                d.warn('Failed to get WebGL Performance')
              }
            }
            return c
          }
        }
      },
      30: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.decodeTensorEightbit = void 0))
        const r = n(1446),
          o = n(9591),
          i = [
            0, 2750000021e-15, 7249999726e-15, 1875000089e-14, 3624999954e-14, 5874999624e-14,
            8624999464e-14, 0.0001437500032, 0.0002312500001, 0.0003187500115, 0.0004062500084,
            0.0005187499919, 0.0006562499912, 0.0007937499322, 0.0009312499315, 0.001218750025,
            0.00165624998, 0.002093750052, 0.002531250007, 0.002968749963, 0.003406249918,
            0.003843750106, 0.004281249829, 0.004843750037, 0.005531250034, 0.006218749564,
            0.00690624956, 0.007593749557, 0.008281249553, 0.008968749084, 0.009656248614,
            0.01109374966, 0.01328125037, 0.01546875015, 0.01765624993, 0.0198437497, 0.02203124948,
            0.02421874925, 0.02640625089, 0.02859375067, 0.03078125045, 0.03296874836, 0.03515625,
            0.03734375164, 0.03953124955, 0.04171875119, 0.04390624911, 0.04671875015, 0.0501562506,
            0.05359374732, 0.05703124776, 0.06046874821, 0.06390624493, 0.06734374911,
            0.07078124583, 0.07421874255, 0.07765624672, 0.08109374344, 0.08453124017,
            0.08796874434, 0.09140624106, 0.09484373778, 0.09828124195, 0.10546875, 0.116406247,
            0.127343744, 0.138281256, 0.149218753, 0.16015625, 0.171093747, 0.182031244,
            0.192968756, 0.203906253, 0.21484375, 0.225781247, 0.236718744, 0.247656256,
            0.2585937381, 0.26953125, 0.2804687619, 0.291406244, 0.302343756, 0.3132812381,
            0.32421875, 0.3351562619, 0.346093744, 0.357031256, 0.3679687381, 0.37890625,
            0.3898437619, 0.400781244, 0.411718756, 0.4226562381, 0.43359375, 0.4445312619,
            0.458593756, 0.4757812321, 0.4929687381, 0.5101562142, 0.52734375, 0.5445312262,
            0.5617187023, 0.5789062381, 0.5960937142, 0.61328125, 0.6304687262, 0.6476562023,
            0.6648437381, 0.6820312142, 0.6992186904, 0.7164062262, 0.7335937023, 0.7507811785,
            0.7679687142, 0.7851561904, 0.8023436666, 0.8195312023, 0.8367186785, 0.8539061546,
            0.8710936904, 0.8882811666, 0.9054686427, 0.9226561785, 0.9398436546, 0.9570311308,
            0.9742186666, 0.9914061427, 1,
          ]
        t.decodeTensorEightbit = function (e, t, n, s, a) {
          if (s !== r.onnx.TensorProto.DataType.FLOAT) throw new Error('Unsupported DataType')
          const A = new DataView(e, t, n),
            u = A.getUint32(0, !0),
            l = A.getFloat32(4, !0),
            g = o.inflate(new Uint8Array(e, t + 8, u)),
            c = new Float32Array(256)
          for (let e = 0; e < 256; e++) c[e] = i[127 & e] * l * (e < 128 ? 1 : -1)
          const d = new Float32Array(a)
          for (let e = 0; e < a; e++) d[e] = c[g[e]]
          return d
        }
      },
      4034: function (e, t, n) {
        'use strict'
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.decodeTensorRaw = void 0))
        const o = r(n(3720)),
          i = n(1446),
          s = n(1908)
        t.decodeTensorRaw = function (e, t, n, r, a) {
          let A
          switch (r) {
            case i.onnx.TensorProto.DataType.FLOAT:
              A = new Float32Array(a)
              break
            case i.onnx.TensorProto.DataType.INT32:
              A = new Int32Array(a)
              break
            case i.onnx.TensorProto.DataType.INT64: {
              A = new Int32Array(a)
              const n = new DataView(e, t, 8 * a)
              for (let e = 0; e < a; e++)
                A[e] = s.clipLong(new o.default(n.getUint32(8 * e, !0), n.getUint32(8 * e + 4, !0)))
              return A
            }
            default:
              throw new Error('Unsupported DataType')
          }
          const u = new Uint8Array(A.buffer),
            l = new Uint8Array(e, t, A.byteLength)
          return (u.set(l), A)
        }
      },
      7804: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.TensorImpl = void 0),
          (t.TensorImpl = class {
            constructor(e, t, n) {
              ;((this.dataType = t),
                (this.backend = n),
                (this.dims = e.slice()),
                (this.ndim = e.length))
              let r = 1
              const o = []
              for (let t = e.length - 1; t >= 0; t--) {
                const n = e[t]
                ;(o.unshift(r), (r *= n))
              }
              ;((this.length = r), (this.strides = o))
            }
          }))
      },
      9422: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.TensorLoaderImpl = void 0))
        const r = n(1446),
          o = n(1908),
          i = n(30),
          s = n(4034)
        t.TensorLoaderImpl = class {
          constructor(e, t) {
            ;((this.cpuContext = t), (this.paths = 'string' == typeof e ? [e] : e))
          }
          async loadAll(e) {
            const t = await this.fetchAllFile(e)
            if (843990103 !== new DataView(t.buffer, t.byteOffset, t.byteLength).getUint32(0, !0))
              throw new Error('Unexpected file signature')
            let n = 4
            const r = new Map()
            let o = !1
            for (; !o; ) {
              const e = this.extractChunk(t.buffer, n)
              switch (e.signature) {
                case 1397638484:
                  {
                    const { name: n, tensor: o } = this.parseTensorChunk(
                      t.buffer,
                      e.bodyByteOffset,
                      e.bodyByteLength
                    )
                    r.set(n, o)
                  }
                  break
                case 1397705795:
                  o = !0
              }
              n = e.nextByteOffset
            }
            return r
          }
          async fetchAllFile(e) {
            const t = []
            let n = 0
            null == e || e(n)
            for (const r of this.paths) {
              const o = await fetch(r),
                i = await o.arrayBuffer()
              ;(t.push(i), (n += i.byteLength), null == e || e(n))
            }
            const r = o.arraySum(t.map((e) => e.byteLength)),
              i = new Uint8Array(r)
            let s = 0
            for (const e of t) {
              const t = new Uint8Array(e)
              ;(i.set(t, s), (s += t.byteLength))
            }
            return i
          }
          extractChunk(e, t) {
            const n = new DataView(e, t)
            if (n.byteLength < 8) throw new Error('Unexpected EOF')
            const r = n.getUint32(0, !0),
              o = n.getUint32(4, !0),
              i = t + 8
            if (n.byteLength < 8 + o) throw new Error('Unexpected EOF')
            return { signature: r, bodyByteLength: o, bodyByteOffset: i, nextByteOffset: i + o }
          }
          parseTensorChunk(e, t, n) {
            const i = new DataView(e, t, n)
            let s = 0
            const a = i.getUint8(s)
            s += 1
            const A = i.getUint32(s, !0)
            s += 4
            const u = i.getUint8(s)
            s += 1
            const l = i.getUint8(s)
            s += 1
            const g = []
            for (let e = 0; e < l; e++) (g.push(i.getUint32(s, !0)), (s += 4))
            const c = o.arrayProd(g),
              d = i.getUint32(s, !0)
            s += 4
            const p = this.parseString(e, t + s, d)
            s += d
            const h = i.getUint32(s, !0)
            ;((s += 4), (s += h))
            const f = this.parseTensorBody(e, a, t + s, A, u, c)
            let I
            switch (u) {
              case r.onnx.TensorProto.DataType.FLOAT:
                I = 'float32'
                break
              case r.onnx.TensorProto.DataType.INT32:
                I = 'int32'
                break
              default:
                throw new Error('Unsupported DataType')
            }
            return { name: p, tensor: this.cpuContext.emptyTensor(g, I, f) }
          }
          parseString(e, t, n) {
            const r = new Uint8Array(e, t, n)
            return String.fromCharCode(...Array.from(r))
          }
          parseTensorBody(e, t, n, r, o, a) {
            switch (t) {
              case 0:
                return s.decodeTensorRaw(e, n, r, o, a)
              case 1:
                return i.decodeTensorEightbit(e, n, r, o, a)
              default:
                throw new Error('Unexpected compression algorithm')
            }
          }
        }
      },
      9857: function (e, t, n) {
        'use strict'
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, r) {
                  ;(void 0 === r && (r = n),
                    Object.defineProperty(e, r, {
                      enumerable: !0,
                      get: function () {
                        return t[n]
                      },
                    }))
                }
              : function (e, t, n, r) {
                  ;(void 0 === r && (r = n), (e[r] = t[n]))
                }),
          o =
            (this && this.__exportStar) ||
            function (e, t) {
              for (var n in e)
                'default' === n || Object.prototype.hasOwnProperty.call(t, n) || r(t, e, n)
            }
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          o(n(6314), t),
          o(n(3176), t),
          o(n(1647), t))
      },
      3299: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getContext2D = void 0),
          (t.getContext2D = function (e) {
            const t = e.getContext('2d')
            if (!t) throw Error('CanvasRenderingContext2D initialization failed')
            return t
          }))
      },
      6314: (e, t) => {
        'use strict'
        var n, r
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.Color = t.Order = void 0),
          ((r = t.Order || (t.Order = {}))[(r.CHW = 0)] = 'CHW'),
          (r[(r.HWC = 1)] = 'HWC'),
          ((n = t.Color || (t.Color = {}))[(n.RGB = 0)] = 'RGB'),
          (n[(n.BGR = 1)] = 'BGR'),
          (n[(n.GREY = 2)] = 'GREY'),
          (n[(n.RGBA = 3)] = 'RGBA'),
          (n[(n.BGRA = 4)] = 'BGRA'))
      },
      3176: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.setImageArrayToCanvas =
            t.getImageArray =
            t.getImageArrayFromDrawable =
            t.getImageArrayFromCanvas =
            t.getImageArrayFromImageData =
              void 0))
        const r = n(3299),
          o = n(6314),
          i = n(5628),
          s = n(1647)
        function a(e) {
          return e instanceof Array
            ? Array.prototype.concat.apply(
                [],
                e.map((e) => a(e))
              )
            : e
        }
        function A(e) {
          if ('number' == typeof e) return [e, e, e, e]
          if (4 == e.length) return [e[0], e[1], e[2], e[3]]
          if (3 == e.length) return [e[0], e[1], e[2], e[0]]
          if (1 == e.length) return [e[0], e[0], e[0], e[0]]
          throw new Error('bias and scale must be scalar number or array of length 1 or 3 or 4.')
        }
        function u(e, t = {}) {
          const {
              type: n = Float32Array,
              color: r = o.Color.RGB,
              order: i = o.Order.HWC,
              bias: s = [0, 0, 0],
              scale: a = [1, 1, 1],
            } = t,
            u = A(s),
            l = A(a),
            { width: g } = e,
            { height: c } = e,
            { data: d } = e
          let p, h, f, I, m, E, y, C, B
          switch (r) {
            case o.Color.RGB:
              switch (((p = new n(g * c * 3)), ([B, C, y] = l), ([m, I, f] = u), i)) {
                case o.Order.HWC:
                  for (let e = 0; e < c; e++)
                    for (let t = 0; t < g; t++)
                      ((p[3 * (e * g + t) + 0] = (d[4 * (e * g + t) + 0] - m) / B),
                        (p[3 * (e * g + t) + 1] = (d[4 * (e * g + t) + 1] - I) / C),
                        (p[3 * (e * g + t) + 2] = (d[4 * (e * g + t) + 2] - f) / y))
                  break
                case o.Order.CHW:
                  for (let e = 0; e < c; e++)
                    for (let t = 0; t < g; t++)
                      ((p[(0 * c + e) * g + t] = (d[4 * (e * g + t) + 0] - m) / B),
                        (p[(Number(c) + e) * g + t] = (d[4 * (e * g + t) + 1] - I) / C),
                        (p[(2 * c + e) * g + t] = (d[4 * (e * g + t) + 2] - f) / y))
              }
              break
            case o.Color.BGR:
              switch (((p = new n(g * c * 3)), ([m, I, f] = u), ([B, C, y] = l), i)) {
                case o.Order.HWC:
                  for (let e = 0; e < c; e++)
                    for (let t = 0; t < g; t++)
                      ((p[3 * (e * g + t) + 0] = (d[4 * (e * g + t) + 2] - f) / y),
                        (p[3 * (e * g + t) + 1] = (d[4 * (e * g + t) + 1] - I) / C),
                        (p[3 * (e * g + t) + 2] = (d[4 * (e * g + t) + 0] - m) / B))
                  break
                case o.Order.CHW:
                  for (let e = 0; e < c; e++)
                    for (let t = 0; t < g; t++)
                      ((p[(0 * c + e) * g + t] = (d[4 * (e * g + t) + 2] - f) / y),
                        (p[(Number(c) + e) * g + t] = (d[4 * (e * g + t) + 1] - I) / C),
                        (p[(2 * c + e) * g + t] = (d[4 * (e * g + t) + 0] - m) / B))
              }
              break
            case o.Color.RGBA:
              switch (((p = new n(g * c * 4)), ([B, C, y, E] = l), ([m, I, f, h] = u), i)) {
                case o.Order.HWC:
                  for (let e = 0; e < c; e++)
                    for (let t = 0; t < g; t++)
                      ((p[4 * (e * g + t) + 0] = (d[4 * (e * g + t) + 0] - m) / B),
                        (p[4 * (e * g + t) + 1] = (d[4 * (e * g + t) + 1] - I) / C),
                        (p[4 * (e * g + t) + 2] = (d[4 * (e * g + t) + 2] - f) / y),
                        (p[4 * (e * g + t) + 3] = (d[4 * (e * g + t) + 3] - h) / E))
                  break
                case o.Order.CHW:
                  for (let e = 0; e < c; e++)
                    for (let t = 0; t < g; t++)
                      ((p[(0 * c + e) * g + t] = (d[4 * (e * g + t) + 0] - m) / B),
                        (p[(Number(c) + e) * g + t] = (d[4 * (e * g + t) + 1] - I) / C),
                        (p[(2 * c + e) * g + t] = (d[4 * (e * g + t) + 2] - f) / y),
                        (p[(3 * c + e) * g + t] = (d[4 * (e * g + t) + 3] - h) / E))
              }
              break
            case o.Color.BGRA:
              switch (((p = new n(g * c * 4)), ([m, I, f, h] = u), ([B, C, y, E] = l), i)) {
                case o.Order.HWC:
                  for (let e = 0; e < c; e++)
                    for (let t = 0; t < g; t++)
                      ((p[4 * (e * g + t) + 0] = (d[4 * (e * g + t) + 2] - f) / y),
                        (p[4 * (e * g + t) + 1] = (d[4 * (e * g + t) + 1] - I) / C),
                        (p[4 * (e * g + t) + 2] = (d[4 * (e * g + t) + 0] - m) / B),
                        (p[4 * (e * g + t) + 3] = (d[4 * (e * g + t) + 3] - h) / E))
                  break
                case o.Order.CHW:
                  for (let e = 0; e < c; e++)
                    for (let t = 0; t < g; t++)
                      ((p[(0 * c + e) * g + t] = (d[4 * (e * g + t) + 2] - f) / y),
                        (p[(Number(c) + e) * g + t] = (d[4 * (e * g + t) + 1] - I) / C),
                        (p[(2 * c + e) * g + t] = (d[4 * (e * g + t) + 0] - m) / B),
                        (p[(3 * c + e) * g + t] = (d[4 * (e * g + t) + 3] - h) / E))
              }
              break
            case o.Color.GREY:
              ;((p = new n(g * c)), ([B, C, y] = l), ([m, I, f] = u))
              for (let e = 0; e < c; e++)
                for (let t = 0; t < g; t++) {
                  const n = d[4 * (e * g + t) + 0],
                    r = d[4 * (e * g + t) + 1],
                    o = d[4 * (e * g + t) + 2]
                  p[e * g + t] =
                    (0.2126 * (n - m)) / B + (0.7162 * (r - I)) / C + (0.0722 * (o - f)) / y
                }
              break
            default:
              throw Error(`Unknown color format: ${r}`)
          }
          return p
        }
        function l(e, t = {}) {
          const {
              type: n = Float32Array,
              color: r = o.Color.RGB,
              order: s = o.Order.HWC,
              srcX: a = 0,
              srcY: A = 0,
              srcW: l = e.width,
              srcH: g = e.height,
              dstX: c = 0,
              dstY: d = 0,
              bias: p = [0, 0, 0],
              scale: h = [1, 1, 1],
            } = t,
            { dstW: f = l, dstH: I = g } = t
          return u(
            i.getImageData(e, {
              srcX: a,
              srcY: A,
              srcW: l,
              srcH: g,
              dstX: c,
              dstY: d,
              dstW: f,
              dstH: I,
            }),
            { type: n, color: r, order: s, bias: p, scale: h }
          )
        }
        function g(e, t = {}) {
          let n, i
          if (e instanceof HTMLVideoElement) ((i = e.videoWidth), (n = e.videoHeight))
          else {
            if (!(e instanceof HTMLImageElement)) {
              if (e instanceof HTMLCanvasElement) return l(e, t)
              if (e instanceof ImageData) {
                const n = document.createElement('canvas')
                return (
                  (n.height = e.height),
                  (n.width = e.width),
                  r.getContext2D(n).putImageData(e, 0, 0),
                  l(n, t)
                )
              }
              throw TypeError(
                'Failed to execute "getImageDataFromDrawable(drawable, options)": "drawable" must be an instanceof Drawable'
              )
            }
            ;((i = e.naturalWidth), (n = e.naturalHeight))
          }
          const {
              type: s = Float32Array,
              color: a = o.Color.RGB,
              order: A = o.Order.HWC,
              srcX: u = 0,
              srcY: g = 0,
              dstX: c = 0,
              dstY: d = 0,
              dstW: p = i,
              dstH: h = n,
              bias: f = [0, 0, 0],
              scale: I = [1, 1, 1],
            } = t,
            m = document.createElement('canvas')
          return (
            (m.width = c + p),
            (m.height = d + h),
            r.getContext2D(m).drawImage(e, u, g, i, n, c, d, p, h),
            l(m, { type: s, color: a, order: A, bias: f, scale: I })
          )
        }
        ;((t.getImageArrayFromImageData = u),
          (t.getImageArrayFromCanvas = l),
          (t.getImageArrayFromDrawable = g),
          (t.getImageArray = async function (e, t = {}) {
            if ('string' == typeof e) return g(await s.loadImageByUrl(e), t)
            if (e instanceof HTMLInputElement) return g(await s.loadImageFromFileInput(e), t)
            if (e instanceof HTMLCanvasElement) return l(e, t)
            if (
              e instanceof HTMLImageElement ||
              e instanceof HTMLVideoElement ||
              e instanceof ImageData
            )
              return g(e, t)
            throw TypeError(
              'Failed to execute "getImageData(image, options)": "image" must be an instance of string, HTMLInputElement, HTMLCanvasElement, HTMLImageElement, HTMLVideoElement, or ImageData object'
            )
          }),
          (t.setImageArrayToCanvas = function (e, t, n, s, u = {}) {
            const {
                color: l = o.Color.RGB,
                order: g = o.Order.HWC,
                srcX: c = 0,
                srcY: d = 0,
                dstX: p = 0,
                dstY: h = 0,
                dstW: f = s.width,
                dstH: I = s.height,
                bias: m = [0, 0, 0],
                scale: E = [1, 1, 1],
              } = u,
              y = A(m),
              C = A(E),
              B = t,
              _ = n
            e = a(e)
            const w = new Uint8ClampedArray(B * _ * 4)
            let b, Q, x, T, D, k, S, v
            switch (l) {
              case o.Color.RGB:
                switch ((([T, x, Q] = y), ([v, S, k] = C), g)) {
                  case o.Order.HWC:
                    for (let n = d; n < d + _; n++)
                      for (let r = c; r < c + B; r++)
                        ((w[4 * (n * t + r) + 0] = e[3 * (n * t + r) + 0] * v + T),
                          (w[4 * (n * t + r) + 1] = e[3 * (n * t + r) + 1] * S + x),
                          (w[4 * (n * t + r) + 2] = e[3 * (n * t + r) + 2] * k + Q),
                          (w[4 * (n * t + r) + 3] = 255))
                    break
                  case o.Order.CHW:
                    for (let r = d; r < d + _; r++)
                      for (let o = c; o < c + B; o++)
                        ((w[4 * (r * t + o) + 0] = e[(0 * n + r) * t + o] * v + T),
                          (w[4 * (r * t + o) + 1] = e[(Number(n) + r) * t + o] * S + x),
                          (w[4 * (r * t + o) + 2] = e[(2 * n + r) * t + o] * k + Q),
                          (w[4 * (r * t + o) + 3] = 255))
                }
                break
              case o.Color.BGR:
                switch ((([T, x, Q] = y), ([v, S, k] = C), g)) {
                  case o.Order.HWC:
                    for (let n = d; n < d + _; n++)
                      for (let r = c; r < c + B; r++)
                        ((w[4 * (n * t + r) + 0] = e[3 * (n * t + r) + 2] * v + T),
                          (w[4 * (n * t + r) + 1] = e[3 * (n * t + r) + 1] * S + x),
                          (w[4 * (n * t + r) + 2] = e[3 * (n * t + r) + 0] * k + Q),
                          (w[4 * (n * t + r) + 3] = 255))
                    break
                  case o.Order.CHW:
                    for (let r = d; r < d + _; r++)
                      for (let o = c; o < c + B; o++)
                        ((w[4 * (r * t + o) + 0] = e[(2 * n + r) * t + o] * v + T),
                          (w[4 * (r * t + o) + 1] = e[(Number(n) + r) * t + o] * S + x),
                          (w[4 * (r * t + o) + 2] = e[(0 * n + r) * t + o] * k + Q),
                          (w[4 * (r * t + o) + 3] = 255))
                }
                break
              case o.Color.RGBA:
                switch ((([T, x, Q, b] = y), ([v, S, k, D] = C), g)) {
                  case o.Order.HWC:
                    for (let n = d; n < d + _; n++)
                      for (let r = c; r < c + B; r++)
                        ((w[4 * (n * t + r) + 0] = e[3 * (n * t + r) + 0] * v + T),
                          (w[4 * (n * t + r) + 1] = e[3 * (n * t + r) + 1] * S + x),
                          (w[4 * (n * t + r) + 2] = e[3 * (n * t + r) + 2] * k + Q),
                          (w[4 * (n * t + r) + 3] = e[3 * (n * t + r) + 3] * D + b))
                    break
                  case o.Order.CHW:
                    for (let r = d; r < d + _; r++)
                      for (let o = c; o < c + B; o++)
                        ((w[4 * (r * t + o) + 0] = e[(0 * n + r) * t + o] * v + T),
                          (w[4 * (r * t + o) + 1] = e[(Number(n) + r) * t + o] * S + x),
                          (w[4 * (r * t + o) + 2] = e[(2 * n + r) * t + o] * k + Q),
                          (w[4 * (r * t + o) + 3] = e[(3 * n + r) * t + o] * D + b))
                }
                break
              case o.Color.BGRA:
                switch ((([T, x, Q, b] = y), ([v, S, k, D] = C), g)) {
                  case o.Order.HWC:
                    for (let n = d; n < d + _; n++)
                      for (let r = c; r < c + B; r++)
                        ((w[4 * (n * t + r) + 0] = e[4 * (n * t + r) + 2] * v + T),
                          (w[4 * (n * t + r) + 1] = e[4 * (n * t + r) + 1] * S + x),
                          (w[4 * (n * t + r) + 2] = e[4 * (n * t + r) + 0] * k + Q),
                          (w[4 * (n * t + r) + 3] = e[4 * (n * t + r) + 3] * D + b))
                    break
                  case o.Order.CHW:
                    for (let r = d; r < d + _; r++)
                      for (let o = c; o < c + B; o++)
                        ((w[4 * (r * t + o) + 0] = e[(2 * n + r) * t + o] * v + T),
                          (w[4 * (r * t + o) + 1] = e[(Number(n) + r) * t + o] * S + x),
                          (w[4 * (r * t + o) + 2] = e[(0 * n + r) * t + o] * k + Q),
                          (w[4 * (r * t + o) + 3] = e[(3 * n + r) * t + o] * D + b))
                }
                break
              case o.Color.GREY:
                for (let n = d; n < d + _; n++)
                  for (let r = c; r < c + B; r++)
                    ((w[4 * (n * t + r) + 0] =
                      w[4 * (n * t + r) + 1] =
                      w[4 * (n * t + r) + 2] =
                        e[n * t + r] * C[0] + y[0]),
                      (w[4 * (n * t + r) + 3] = 255))
            }
            i.setImageDataToCanvas(
              (function (e, t, n) {
                try {
                  return new ImageData(e, t, n)
                } catch (o) {
                  console.warn(`new ImageData failed: ${o}`)
                  const i = document.createElement('canvas'),
                    s = r.getContext2D(i).createImageData(t, n)
                  return (s.data.set(e), s)
                }
              })(w, B, _),
              s,
              { srcX: c, srcY: d, srcW: B, srcH: _, dstX: p, dstY: h, dstW: f, dstH: I }
            )
          }))
      },
      5628: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.setImageDataToCanvas =
            t.getImageData =
            t.getImageDataFromDrawable =
            t.getImageDataFromCanvas =
              void 0))
        const r = n(3299)
        function o(e, t = {}) {
          const {
              srcX: n = 0,
              srcY: o = 0,
              srcW: i = e.width,
              srcH: a = e.height,
              dstX: A = 0,
              dstY: u = 0,
            } = t,
            { dstW: l = i, dstH: g = a } = t
          let c = r.getContext2D(e).getImageData(n, o, i, a)
          return (
            (0 === A && 0 === u && i === l && a === g) ||
              (c = s(c, { dstX: A, dstY: u, dstW: l, dstH: g })),
            c
          )
        }
        function i(e, t = {}) {
          let n, o
          if (e instanceof HTMLVideoElement) ((o = e.videoWidth), (n = e.videoHeight))
          else {
            if (!(e instanceof HTMLImageElement))
              throw TypeError(
                'Failed to execute "getImageDataFromDrawable(drawable, options)": "drawable" must be an instanceof HTMLVideoElement or HTMLImageElement'
              )
            ;((o = e.naturalWidth), (n = e.naturalHeight))
          }
          const {
              srcX: i = 0,
              srcY: s = 0,
              dstX: a = 0,
              dstY: A = 0,
              dstW: u = o,
              dstH: l = n,
            } = t,
            g = document.createElement('canvas')
          ;((g.width = a + u), (g.height = A + l))
          const c = r.getContext2D(g)
          return (c.drawImage(e, i, s, o, n, a, A, u, l), c.getImageData(0, 0, a + u, A + l))
        }
        function s(e, t = {}) {
          const {
              srcX: n = 0,
              srcY: o = 0,
              srcW: i = e.width,
              srcH: s = e.height,
              dstX: a = 0,
              dstY: A = 0,
            } = t,
            { dstW: u = i, dstH: l = s } = t,
            g = document.createElement('canvas')
          ;((g.width = i), (g.height = s), r.getContext2D(g).putImageData(e, -n, -o))
          const c = document.createElement('canvas')
          ;((c.width = a + u), (c.height = A + l))
          const d = r.getContext2D(c)
          return (d.drawImage(g, 0, 0, i, s, a, A, u, l), d.getImageData(0, 0, a + u, A + l))
        }
        ;((t.getImageDataFromCanvas = o),
          (t.getImageDataFromDrawable = i),
          (t.getImageData = function (e, t = {}) {
            if (e instanceof HTMLCanvasElement) return o(e, t)
            if (e instanceof HTMLVideoElement || e instanceof HTMLImageElement) return i(e, t)
            throw TypeError(
              'Failed to execute "getImageData(image, options)": "image" must be an instance of HTMLCanvasElement, HTMLVideoElement, or HTMLImageElement'
            )
          }),
          (t.setImageDataToCanvas = function (e, t, n = {}) {
            const {
                srcX: o = 0,
                srcY: i = 0,
                srcW: a = e.width,
                srcH: A = e.height,
                dstX: u = 0,
                dstY: l = 0,
              } = n,
              { dstW: g = a, dstH: c = A } = n
            ;((0 === o && 0 === i && a === g && A === c) ||
              (e = s(e, { srcX: o, srcY: i, srcW: a, srcH: A, dstW: g, dstH: c })),
              r.getContext2D(t).putImageData(e, u, l))
          }))
      },
      1647: (e, t) => {
        'use strict'
        async function n(e) {
          const t = document.createElement('img')
          return new Promise((n, r) => {
            ;((t.onload = n), (t.onerror = r), (t.src = e))
          }).then(() => t)
        }
        async function r(e) {
          const { files: t } = e
          if (!t || 0 == t.length) throw new Error('No file is selected')
          return n(URL.createObjectURL(t[0]))
        }
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.loadImageByDialog = t.loadImageFromFileInput = t.loadImageByUrl = void 0),
          (t.loadImageByUrl = n),
          (t.loadImageFromFileInput = r),
          (t.loadImageByDialog = async function () {
            const e = document.createElement('input')
            return (
              (e.style.display = 'none'),
              (e.type = 'file'),
              (e.accept = 'image/*'),
              (window._webdnn_image_input = e),
              new Promise((t) => {
                ;((e.onchange = () => {
                  ;(delete window._webdnn_image_input, t(r(e)))
                }),
                  e.click())
              })
            )
          }))
      },
      4931: function (e, t, n) {
        'use strict'
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, r) {
                  ;(void 0 === r && (r = n),
                    Object.defineProperty(e, r, {
                      enumerable: !0,
                      get: function () {
                        return t[n]
                      },
                    }))
                }
              : function (e, t, n, r) {
                  ;(void 0 === r && (r = n), (e[r] = t[n]))
                }),
          o =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t })
                }
              : function (e, t) {
                  e.default = t
                }),
          i =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e)
                for (var n in e)
                  'default' !== n && Object.prototype.hasOwnProperty.call(e, n) && r(t, e, n)
              return (o(t, e), t)
            }
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.load = t.CPUTensor = t.Logging = t.Math = t.Image = void 0))
        const s = i(n(9857))
        t.Image = s
        const a = i(n(9882))
        t.Math = a
        const A = n(7664)
        Object.defineProperty(t, 'Logging', {
          enumerable: !0,
          get: function () {
            return A.WebDNNLogging
          },
        })
        const u = n(3683),
          l = n(7069),
          g = n(9950),
          c = n(2895),
          d = n(780),
          p = n(9261),
          h = n(1339),
          f = n(1243),
          I = n(5486),
          m = n(6355),
          E = n(2071)
        var y = n(3721)
        Object.defineProperty(t, 'CPUTensor', {
          enumerable: !0,
          get: function () {
            return y.CPUTensorImpl
          },
        })
        const C = { cpu: null, wasm: null, webgl: null, webgpu: null }
        t.load = async function (e, t = {}) {
          var n, r, o
          const { backendOrder: i = ['webgl', 'wasm', 'cpu'], optimized: s } = t
          if (s)
            throw new Error(
              'Currently, webdnn.js does not support optimized model. Use webdnn-core.js instead.'
            )
          C.cpu ||
            ((C.cpu = new l.WebDNNCPUContextImpl()),
            await C.cpu.initialize(),
            h.registerOperators(f.getOpEntries()))
          const a = C.cpu,
            A = { cpu: a }
          let y = null
          for (const e of i) {
            switch (e) {
              case 'cpu':
                y = 'cpu'
                break
              case 'wasm':
                if (C.wasm) ((y = 'wasm'), (A.wasm = C.wasm))
                else
                  try {
                    const e = new c.WebDNNWasmContextImpl(
                      a,
                      (null === (n = t.backendOptions) || void 0 === n ? void 0 : n.wasm) || {}
                    )
                    ;(await e.initialize(p.wasmWorkerSrcUrl),
                      (C.wasm = e),
                      h.registerOperators(I.getOpEntries()),
                      (y = 'wasm'),
                      (A.wasm = C.wasm))
                  } catch (e) {}
                break
              case 'webgl':
                if (C.webgl) ((y = 'webgl'), (A.webgl = C.webgl))
                else
                  try {
                    const e = new g.WebDNNWebGLContextImpl(
                      a,
                      (null === (r = t.backendOptions) || void 0 === r ? void 0 : r.webgl) || {}
                    )
                    ;(await e.initialize(),
                      (C.webgl = e),
                      h.registerOperators(m.getOpEntries()),
                      (y = 'webgl'),
                      (A.webgl = C.webgl))
                  } catch (e) {}
                break
              case 'webgpu':
                if (C.webgpu) ((y = 'webgpu'), (A.webgpu = C.webgpu))
                else
                  try {
                    const e = new d.WebDNNWebGPUContextImpl(
                      a,
                      (null === (o = t.backendOptions) || void 0 === o ? void 0 : o.webgpu) || {}
                    )
                    ;(await e.initialize(),
                      (C.webgpu = e),
                      h.registerOperators(E.getOpEntries()),
                      (y = 'webgpu'),
                      (A.webgpu = C.webgpu))
                  } catch (e) {}
                break
              default:
                throw new Error(`Unknown backend ${e}`)
            }
            if (y) break
          }
          if (!y) throw new Error('No backend available')
          const B = 'cpu' === y ? ['cpu'] : [y, 'cpu'],
            _ = new u.RunnerImpl(B, A)
          return (await _.loadModel(e, t.onnxBaseName || 'model.onnx', t.progressCallback), _)
        }
      },
      3076: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.DataArrayConstructor = t.backends = t.backendsWithoutCPU = void 0),
          (t.backendsWithoutCPU = ['wasm', 'webgl', 'webgpu']),
          (t.backends = ['cpu', 'wasm', 'webgl', 'webgpu']),
          (t.DataArrayConstructor = { float32: Float32Array, int32: Int32Array, bool: Uint8Array }))
      },
      7664: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.WebDNNLogging = void 0))
        class n {
          constructor(e, t) {
            ;((this.category = e), (this.logging = t))
          }
          debug(e, ...t) {
            this.logging.emit(this.category, i.DEBUG, e, t)
          }
          info(e, ...t) {
            this.logging.emit(this.category, i.INFO, e, t)
          }
          warn(e, ...t) {
            this.logging.emit(this.category, i.WARN, e, t)
          }
          error(e, ...t) {
            this.logging.emit(this.category, i.ERROR, e, t)
          }
          fatal(e, ...t) {
            this.logging.emit(this.category, i.FATAL, e, t)
          }
        }
        class r {
          emit(e, t, n, r) {
            const o = `${e}: ${n}`
            switch (t) {
              case i.FATAL:
              case i.ERROR:
                console.error(o, ...r)
                break
              case i.WARN:
                console.warn(o, ...r)
                break
              case i.INFO:
                console.info(o, ...r)
                break
              case i.DEBUG:
                console.debug(o, ...r)
            }
          }
          clear() {}
        }
        class o {
          constructor() {
            this.buffer = []
          }
          emit(e, t, n, r) {
            this.buffer.push({ category: e, severity: t, message: n, optionalParams: r })
          }
          clear() {
            this.buffer = []
          }
          saveToLocalFile() {
            const e = this.buffer.map((e) => JSON.stringify(e) + '\n'),
              t = document.createElement('a')
            ;((t.href = URL.createObjectURL(new Blob(e, { type: 'text/plain' }))),
              (t.download = 'logging.log'),
              (t.style.display = 'none'),
              document.body.appendChild(t),
              t.click(),
              document.body.removeChild(t))
          }
        }
        class i {
          constructor() {
            ;((this.adapters = {}),
              (this.adapterFactories = { console: () => new r(), file: () => new o() }),
              this.config({
                adapters: { console: { adapter: 'console', loglevel: { '': i.WARN } } },
              }))
          }
          config(e) {
            this.currentConfig = e
            const t = e.adapters
            this.adapters = {}
            for (const e of Object.keys(t)) {
              const n = t[e],
                r = this.adapterFactories[n.adapter]
              if (r)
                try {
                  const t = r(...(n.adapterParams || []))
                  this.adapters[e] = t
                } catch (e) {
                  console.error(`Logging adapter ${n.adapter} constructor error.`)
                  continue
                }
              else console.error(`Logging adapter ${n.adapter} not found.`)
            }
          }
          static getInstance() {
            return window.WebDNNLoggingManagerInstance
          }
          static getLogger(e, t) {
            return (t || (t = i.getInstance()), new n(e, t))
          }
          emit(e, t, n, r) {
            for (const o of Object.keys(this.adapters)) {
              const i = this.adapters[o]
              let s = !0
              const a = this.currentConfig.adapters[o].loglevel
              if (a) {
                const e = a['']
                void 0 !== e && t > e && (s = !1)
              }
              s && i.emit(e, t, n, r)
            }
          }
          clear() {
            for (const e of Object.keys(this.adapters)) this.adapters[e].clear()
          }
        }
        ;((t.WebDNNLogging = i),
          (i.FATAL = 0),
          (i.ERROR = 1),
          (i.WARN = 2),
          (i.INFO = 3),
          (i.DEBUG = 4),
          void 0 === window.WebDNNLoggingManagerInstance &&
            (window.WebDNNLoggingManagerInstance = new i()))
      },
      9882: function (e, t, n) {
        'use strict'
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, r) {
                  ;(void 0 === r && (r = n),
                    Object.defineProperty(e, r, {
                      enumerable: !0,
                      get: function () {
                        return t[n]
                      },
                    }))
                }
              : function (e, t, n, r) {
                  ;(void 0 === r && (r = n), (e[r] = t[n]))
                }),
          o =
            (this && this.__exportStar) ||
            function (e, t) {
              for (var n in e)
                'default' === n || Object.prototype.hasOwnProperty.call(t, n) || r(t, e, n)
            }
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), o(n(6523), t), o(n(2582), t))
      },
      6523: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.argmin = t.argmax = void 0),
          (t.argmax = function (e, t = 1) {
            const n = [[0, (e = e.slice()).length]],
              r = []
            for (let t = 0; t < e.length; t++) r[t] = t
            for (; n.length > 0; ) {
              const [o, i] = n.pop(),
                s = e[i - 1]
              let a,
                A = o,
                u = i - 2
              if (!(o >= i - 1)) {
                for (;;) {
                  for (; e[A] > s && A <= u; ) A++
                  for (; e[u] <= s && A <= u; ) u--
                  if (A >= u) break
                  ;((a = e[A]), (e[A] = e[u]), (e[u] = a), (a = r[A]), (r[A] = r[u]), (r[u] = a))
                }
                ;((e[i - 1] = e[A]),
                  (e[A] = s),
                  (a = r[i - 1]),
                  (r[i - 1] = r[A]),
                  (r[A] = a),
                  n.push([o, A]),
                  A + 1 < t && n.push([A + 1, i]))
              }
            }
            const o = []
            for (let e = 0; e < t; e++) o.push(r[e])
            return o
          }),
          (t.argmin = function (e, t = 1) {
            const n = [[0, (e = e.slice()).length]],
              r = []
            for (let t = 0; t < e.length; t++) r[t] = t
            for (; n.length > 0; ) {
              const [o, i] = n.pop(),
                s = e[i - 1]
              let a,
                A = o,
                u = i - 2
              if (!(o >= i - 1)) {
                for (;;) {
                  for (; e[A] < s && A <= u; ) A++
                  for (; e[u] >= s && A <= u; ) u--
                  if (A >= u) break
                  ;((a = e[A]), (e[A] = e[u]), (e[u] = a), (a = r[A]), (r[A] = r[u]), (r[u] = a))
                }
                ;((e[i - 1] = e[A]),
                  (e[A] = s),
                  (a = r[i - 1]),
                  (r[i - 1] = r[A]),
                  (r[A] = a),
                  n.push([o, A]),
                  A + 1 < t && n.push([A + 1, i]))
              }
            }
            const o = []
            for (let e = 0; e < t; e++) o.push(r[e])
            return o
          }))
      },
      2582: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.Random = void 0),
          (t.Random = class {
            constructor(e = 0) {
              ;((this.x = 0 | e), (this.y = 362436069), (this.z = 521288629), (this.w = 88675123))
              for (let e = 0; e < 40; e++) this.randomRaw()
            }
            randomRaw() {
              const e = this.x,
                t = e ^ (e << 11)
              ;((this.x = this.y), (this.y = this.z))
              const n = this.w
              this.z = n
              const r = n ^ (n >>> 19) ^ t ^ (t >>> 8)
              return ((this.w = r), r)
            }
            random(e) {
              if (null == e) {
                let e = this.randomRaw()
                return ((e += 2147483648), e / 4294967296)
              }
              {
                const t = new Float32Array(e)
                for (let n = 0; n < e; n++) {
                  let e = this.randomRaw()
                  e += 2147483648
                  const r = e / 4294967296
                  t[n] = r
                }
                return t
              }
            }
            normal(e) {
              if (null != e) {
                const t = new Float32Array(e)
                for (let n = 0; n < e; n += 2)
                  for (;;) {
                    const r = this.random(),
                      o = Math.sqrt(-2 * Math.log(r))
                    if (!Number.isFinite(o)) continue
                    const i = this.random(),
                      s = o * Math.cos(2 * Math.PI * i),
                      a = o * Math.sin(2 * Math.PI * i)
                    ;((t[n] = s), n + 1 < e && (t[n + 1] = a))
                    break
                  }
                return t
              }
              for (;;) {
                const e = this.random(),
                  t = Math.sqrt(-2 * Math.log(e))
                if (!Number.isFinite(t)) continue
                const n = this.random()
                return t * Math.cos(2 * Math.PI * n)
              }
            }
          }))
      },
      7004: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.AveragePool = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor(e) {
            super(e)
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.autoPad = o.getAttrString(e, 'auto_pad', 'NOTSET')),
              (this.ceilMode = 0 !== o.getAttrInt(e, 'ceil_mode', 0)),
              (this.countIncludePad = 0 !== o.getAttrInt(e, 'count_include_pad', 0)),
              (this.kernelShape = o.getAttrInts(e, 'kernel_shape', [])),
              (this.pads = o.getAttrInts(e, 'pads', [])),
              (this.strides = o.getAttrInts(e, 'strides', [])))
          }
          calcShape(e) {
            const t = e[0],
              { kernelShape: n } = this,
              r = this.strides.length > 0 ? this.strides : [1, 1],
              o = [e[2], e[3]]
            let i, s
            if ('NOTSET' === this.autoPad)
              ((s = this.pads.length > 0 ? this.pads : [0, 0, 0, 0]),
                (i = this.ceilMode
                  ? [
                      Math.ceil((o[0] + s[0] + s[2] - n[0]) / r[0]) + 1,
                      Math.ceil((o[1] + s[1] + s[3] - n[1]) / r[1]) + 1,
                    ]
                  : [
                      Math.floor((o[0] + s[0] + s[2] - n[0]) / r[0]) + 1,
                      Math.floor((o[1] + s[1] + s[3] - n[1]) / r[1]) + 1,
                    ]))
            else if ('SAME_UPPER' === this.autoPad || 'SAME_LOWER' === this.autoPad) {
              i = [Math.ceil(o[0] / r[0]), Math.ceil(o[1] / r[1])]
              const e = [(i[0] - 1) * r[0] + n[0] - o[0], (i[1] - 1) * r[1] + n[1] - o[1]]
              if ('SAME_UPPER' === this.autoPad)
                s = [
                  Math.floor(e[0] / 2),
                  Math.floor(e[1] / 2),
                  Math.ceil(e[0] / 2),
                  Math.ceil(e[1] / 2),
                ]
              else {
                if ('SAME_LOWER' !== this.autoPad) throw new Error()
                s = [
                  Math.ceil(e[0] / 2),
                  Math.ceil(e[1] / 2),
                  Math.floor(e[0] / 2),
                  Math.floor(e[1] / 2),
                ]
              }
            } else {
              if ('VALID' !== this.autoPad)
                throw new Error(`Unknown auto_pad ${this.autoPad} for AveragePool`)
              ;((i = [Math.ceil((o[0] - n[0] + 1) / r[0]), Math.ceil((o[1] - n[1] + 1) / r[1])]),
                (s = [0, 0, 0, 0]))
            }
            return {
              batch: t,
              kernelShape: n,
              pads: s,
              strides: r,
              inShape: o,
              outShape: i,
              ch: e[1],
            }
          }
        }
        t.AveragePool = i
      },
      2825: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.Conv = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor(e) {
            super(e)
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.dilations = o.getAttrInts(e, 'dilations', [])),
              (this.group = o.getAttrInt(e, 'group', 1)),
              (this.kernelShape = o.getAttrInts(e, 'kernel_shape', [])),
              (this.pads = o.getAttrInts(e, 'pads', [])),
              (this.strides = o.getAttrInts(e, 'strides', [])))
          }
          calcShape(e, t) {
            const n = e[0],
              r = this.dilations.length > 0 ? this.dilations : [1, 1],
              { group: o } = this,
              i = this.kernelShape.length > 0 ? this.kernelShape : [t[2], t[3]],
              s = this.pads.length > 0 ? this.pads : [0, 0, 0, 0],
              a = this.strides.length > 0 ? this.strides : [1, 1],
              A = [e[2], e[3]],
              u = [
                Math.floor((A[0] + s[0] + s[2] - r[0] * (i[0] - 1) - 1) / a[0]) + 1,
                Math.floor((A[1] + s[1] + s[3] - r[1] * (i[1] - 1) - 1) / a[1]) + 1,
              ],
              l = e[1],
              g = l / o,
              c = t[0]
            return {
              batch: n,
              dilations: r,
              group: o,
              kernelShape: i,
              pads: s,
              strides: a,
              inShape: A,
              outShape: u,
              chIn: l,
              chInPerGroup: g,
              chOut: c,
              chOutPerGroup: c / o,
            }
          }
        }
        t.Conv = i
      },
      9549: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.ConvTranspose = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor(e) {
            super(e)
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.autoPad = o.getAttrString(e, 'auto_pad', 'NOTSET')),
              (this.dilations = o.getAttrInts(e, 'dilations', [])),
              (this.group = o.getAttrInt(e, 'group', 1)),
              (this.kernelShape = o.getAttrInts(e, 'kernel_shape', [])),
              (this.outputPadding = o.getAttrInts(e, 'output_padding', [])),
              (this.outputShape = o.getAttrInts(e, 'output_shape', [])),
              (this.pads = o.getAttrInts(e, 'pads', [])),
              (this.strides = o.getAttrInts(e, 'strides', [])))
          }
          calcShape(e, t) {
            if ('NOTSET' !== this.autoPad)
              throw new Error('ConvTranspose: auto_pad !== NOTSET is not yet supported.')
            if (this.outputShape.length > 0)
              throw new Error('ConvTranspose: explicit output_shape is not yet supported.')
            const n = e[0],
              r = this.dilations.length > 0 ? this.dilations : [1, 1],
              { group: o } = this,
              i = this.kernelShape.length > 0 ? this.kernelShape : [t[2], t[3]],
              s = this.pads.length > 0 ? this.pads : [0, 0, 0, 0],
              a = this.strides.length > 0 ? this.strides : [1, 1],
              A = [e[2], e[3]],
              u = this.outputPadding.length > 0 ? this.outputPadding : [0, 0],
              l = [
                a[0] * (A[0] - 1) + u[0] + (i[0] - 1) * r[0] + 1 - s[0] - s[2],
                a[1] * (A[1] - 1) + u[1] + (i[1] - 1) * r[1] + 1 - s[1] - s[3],
              ],
              g = e[1],
              c = g / o,
              d = t[1]
            return {
              batch: n,
              dilations: r,
              group: o,
              kernelShape: i,
              pads: s,
              strides: a,
              inShape: A,
              outShape: l,
              chIn: g,
              chInPerGroup: c,
              chOut: d * o,
              chOutPerGroup: d,
            }
          }
        }
        t.ConvTranspose = i
      },
      5543: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.Flatten = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          initialize(e) {
            if ((super.initialize(e), 1 !== o.getAttrInt(e, 'axis', 1)))
              throw new Error('Flatten: only axis === 1 is supported')
          }
          calcShape(e) {
            return [e.dims[0], o.arrayProd(e.dims.slice(1))]
          }
        }
        t.Flatten = i
      },
      5620: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.Gemm = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor(e) {
            super(e)
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.alpha = o.getAttrFloat(e, 'alpha', 1)),
              (this.beta = o.getAttrFloat(e, 'beta', 1)),
              (this.transA = o.getAttrInt(e, 'transA', 0)),
              (this.transB = o.getAttrInt(e, 'transB', 0)))
          }
          calcShape(e, t) {
            let n, r, o, i, s, a
            if (2 !== e.length || 2 !== t.length) throw new Error()
            if (
              (this.transA
                ? ((n = e[0]), (o = e[1]), (s = [1, o]))
                : ((o = e[0]), (n = e[1]), (s = [n, 1])),
              this.transB
                ? ((i = t[0]), (r = t[1]), (a = [1, r]))
                : ((r = t[0]), (i = t[1]), (a = [i, 1])),
              n !== r)
            )
              throw new Error()
            return { m: o, n: i, k: n, strideA: s, strideB: a }
          }
        }
        t.Gemm = i
      },
      5818: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.MatMul = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          calcShape(e, t) {
            const n = Math.max(e.length, t.length, 2),
              r = e.slice()
            if (0 === r.length) throw new Error()
            for (1 === r.length && r.unshift(1); r.length < n; ) r.unshift(1)
            const i = t.slice()
            if (0 === i.length) throw new Error()
            for (1 === i.length && i.push(1); i.length < n; ) i.unshift(1)
            const s = [r[r.length - 2], i[i.length - 1]],
              a = r[r.length - 1]
            if (a !== i[i.length - 2]) throw new Error()
            const A = o.calcStrides(r),
              u = o.calcStrides(i)
            for (let e = r.length - 3; e >= 0; e--) {
              const t = Math.max(r[e], i[e])
              ;(1 === r[e] && (A[e] = 0), 1 === i[e] && (u[e] = 0), s.unshift(t))
            }
            const l = o.calcStrides(s),
              g = l[0] * s[0],
              c = s.slice()
            return (
              1 === e.length && c.splice(c.length - 2, 1),
              1 === t.length && c.splice(c.length - 1, 1),
              {
                resultLength: g,
                resultDims: s,
                resultStrides: l,
                resultDimsAfterSqueeze: c,
                stridesA: A,
                stridesB: u,
                innerProductLength: a,
              }
            )
          }
        }
        t.MatMul = i
      },
      3369: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.MaxPool = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor(e) {
            super(e)
          }
          initialize(e) {
            if (
              (super.initialize(e),
              (this.autoPad = o.getAttrString(e, 'auto_pad', 'NOTSET')),
              (this.ceilMode = 0 !== o.getAttrInt(e, 'ceil_mode', 0)),
              (this.dilations = o.getAttrInts(e, 'dilations', [])),
              (this.kernelShape = o.getAttrInts(e, 'kernel_shape', [])),
              (this.pads = o.getAttrInts(e, 'pads', [])),
              (this.strides = o.getAttrInts(e, 'strides', [])),
              0 !== o.getAttrInt(e, 'storage_order', 0))
            )
              throw new Error('MaxPool: storage_order !== 0 is not supported.')
          }
          calcShape(e) {
            const t = e[0],
              n = this.dilations.length > 0 ? this.dilations : [1, 1],
              { kernelShape: r } = this,
              o = this.strides.length > 0 ? this.strides : [1, 1],
              i = [e[2], e[3]]
            let s, a
            if ('NOTSET' === this.autoPad)
              ((a = this.pads.length > 0 ? this.pads : [0, 0, 0, 0]),
                (s = this.ceilMode
                  ? [
                      Math.ceil((i[0] + a[0] + a[2] - n[0] * (r[0] - 1) - 1) / o[0]) + 1,
                      Math.ceil((i[1] + a[1] + a[3] - n[1] * (r[1] - 1) - 1) / o[1]) + 1,
                    ]
                  : [
                      Math.floor((i[0] + a[0] + a[2] - n[0] * (r[0] - 1) - 1) / o[0]) + 1,
                      Math.floor((i[1] + a[1] + a[3] - n[1] * (r[1] - 1) - 1) / o[1]) + 1,
                    ]))
            else if ('SAME_UPPER' === this.autoPad || 'SAME_LOWER' === this.autoPad) {
              s = [Math.ceil(i[0] / o[0]), Math.ceil(i[1] / o[1])]
              const e = [
                (s[0] - 1) * o[0] + ((r[0] - 1) * n[0] + 1) - i[0],
                (s[1] - 1) * o[1] + ((r[1] - 1) * n[1] + 1) - i[1],
              ]
              if ('SAME_UPPER' === this.autoPad)
                a = [
                  Math.floor(e[0] / 2),
                  Math.floor(e[1] / 2),
                  Math.ceil(e[0] / 2),
                  Math.ceil(e[1] / 2),
                ]
              else {
                if ('SAME_LOWER' !== this.autoPad) throw new Error()
                a = [
                  Math.ceil(e[0] / 2),
                  Math.ceil(e[1] / 2),
                  Math.floor(e[0] / 2),
                  Math.floor(e[1] / 2),
                ]
              }
            } else {
              if ('VALID' !== this.autoPad)
                throw new Error(`Unknown auto_pad ${this.autoPad} for MaxPool`)
              ;((s = [
                Math.ceil((i[0] - n[0] * (r[0] - 1)) / o[0]),
                Math.ceil((i[1] - n[1] * (r[1] - 1)) / o[1]),
              ]),
                (a = [0, 0, 0, 0]))
            }
            return {
              batch: t,
              dilations: n,
              kernelShape: r,
              pads: a,
              strides: o,
              inShape: i,
              outShape: s,
              ch: e[1],
            }
          }
        }
        t.MaxPool = i
      },
      5082: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.Pad11 = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          initialize(e) {
            ;(super.initialize(e), (this.mode = o.getAttrString(e, 'mode', 'constant')))
          }
          getTensorBackendRequirement(e, t) {
            return 2 === e ? [this.backend, 'cpu'] : [this.backend, 'cpu', 'cpu']
          }
          calcShape(e, t) {
            const n = [],
              r = Array.from(t.data)
            for (let t = 0; t < e.ndim; t++) n.push(e.dims[t] + r[t] + r[t + e.ndim])
            return { outputShape: n, pads: r }
          }
        }
        t.Pad11 = i
      },
      4574: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.Reshape5 = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          initialize(e) {
            ;(super.initialize(e), (this.allowzero = 0 !== o.getAttrInt(e, 'allowzero', 0)))
          }
          calcShape(e, t) {
            const n = Array.from(t.data)
            let r
            if (this.allowzero) {
              let t = 1,
                o = -1
              if (
                (n.forEach((e, n) => {
                  if (e > 0) t *= e
                  else if (-1 === e) {
                    if (o >= 0) throw new Error('Reshape: multiple -1 dimensions')
                    o = n
                  }
                }),
                o >= 0 && t <= 0)
              )
                throw new Error()
              const i = e.length / t
              r = n.map((e) => (e >= 0 ? e : i))
            } else {
              let t = 1,
                o = -1
              if (
                (n.forEach((n, r) => {
                  if (n > 0) t *= n
                  else if (0 === n) t *= e.dims[r]
                  else {
                    if (-1 !== n) throw new Error()
                    if (o >= 0) throw new Error('Reshape: multiple -1 dimensions')
                    o = r
                  }
                }),
                o >= 0 && t <= 0)
              )
                throw new Error()
              const i = e.length / t
              r = n.map((t, n) => (t > 0 ? t : 0 === t ? e.dims[n] : i))
            }
            return r
          }
        }
        t.Reshape5 = i
      },
      5489: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.Split13 = t.Split2 = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          calcShapeBase(e, t, n) {
            let { axis: r } = this
            if ((r < 0 && (r += e.ndim), r < 0 || r >= e.ndim))
              throw new Error(`Split: axis ${r} out of range`)
            const i = e.dims[r],
              s = n.length > 0 ? n : Array.from({ length: t }, () => Math.floor(i / t)),
              a = o.arrayProd(e.dims.slice(0, r)),
              A = o.arrayProd(e.dims.slice(r + 1)),
              u = e.strides[Math.max(r - 1, 0)],
              l = e.strides[r]
            let g = 0
            const c = []
            for (let n = 0; n < t; n++) {
              const t = s[n],
                i = e.dims.slice()
              i[r] = t
              const a = o.arrayProd(i.slice(Math.max(r - 1, 0) + 1)),
                A = o.arrayProd(i.slice(r + 1))
              ;(c.push({ dim: t, offset: g, outShape: i, outerStride: a, splitStride: A }),
                (g += t))
            }
            return {
              eachOutputParams: c,
              outerLength: a,
              innerLength: A,
              inOuterStride: u,
              inConcatStride: l,
            }
          }
        }
        ;((t.Split2 = class extends i {
          initialize(e) {
            ;(super.initialize(e),
              (this.axis = o.getAttrInt(e, 'axis', 0)),
              (this.split = o.getAttrInts(e, 'split', [])))
          }
          calcShape(e, t) {
            return this.calcShapeBase(e, t, this.split)
          }
        }),
          (t.Split13 = class extends i {
            initialize(e) {
              ;(super.initialize(e), (this.axis = o.getAttrInt(e, 'axis', 0)))
            }
            calcShape(e, t, n) {
              return this.calcShapeBase(e, t, n ? Array.from(n.data) : [])
            }
          }))
      },
      2633: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.Squeeze13 = t.Squeeze1 = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          calcShapeBase(e, t) {
            if (0 === t.length) return e.filter((e) => 1 !== e)
            {
              const n = t.map((t) => (t >= 0 ? t : t + e.length))
              return e.filter((e, t) => !n.includes(t))
            }
          }
        }
        ;((t.Squeeze1 = class extends i {
          initialize(e) {
            ;(super.initialize(e), (this.axes = o.getAttrInts(e, 'axes', [])))
          }
          calcShape(e) {
            return this.calcShapeBase(e.dims, this.axes)
          }
        }),
          (t.Squeeze13 = class extends i {
            calcShape(e, t) {
              return this.calcShapeBase(e.dims, t ? Array.from(t.data) : [])
            }
          }))
      },
      187: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.Transpose = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          initialize(e) {
            ;(super.initialize(e), (this.perm = o.getAttrInts(e, 'perm', [])))
          }
          calcShape(e) {
            const t =
              this.perm.length > 0
                ? this.perm
                : Array.from({ length: e.ndim }, (t, n) => e.ndim - 1 - n)
            if (t.length !== e.ndim) throw new Error()
            const n = new Array(e.ndim),
              r = new Array(e.ndim)
            for (let o = 0; o < e.ndim; o++) {
              const i = t[o]
              ;((n[o] = e.dims[i]), (r[o] = e.strides[i]))
            }
            return { outShape: n, inStrides: r }
          }
        }
        t.Transpose = i
      },
      784: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.Unsqueeze13 = t.Unsqueeze1 = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          calcShapeBase(e, t) {
            const n = e.length + t.length,
              r = []
            let o = 0
            const i = t.map((e) => (e >= 0 ? e : e + n))
            for (let t = 0; t < n; t++) i.includes(t) ? r.push(1) : r.push(e[o++])
            return r
          }
        }
        ;((t.Unsqueeze1 = class extends i {
          initialize(e) {
            ;(super.initialize(e), (this.axes = o.getAttrInts(e, 'axes', [])))
          }
          calcShape(e) {
            return this.calcShapeBase(e.dims, this.axes)
          }
        }),
          (t.Unsqueeze13 = class extends i {
            calcShape(e, t) {
              return this.calcShapeBase(e.dims, Array.from(t.data))
            }
          }))
      },
      1243: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(2377),
          o = n(1098),
          i = n(1037),
          s = n(4195),
          a = n(8646),
          A = n(7831),
          u = n(9456),
          l = n(7234),
          g = n(322),
          c = n(4309),
          d = n(3861),
          p = n(2345),
          h = n(8250),
          f = n(6382),
          I = n(7545),
          m = n(6734),
          E = n(2441),
          y = n(5800),
          C = n(8998),
          B = n(1685),
          _ = n(8146),
          w = n(8197),
          b = n(2077),
          Q = n(4761),
          x = n(4800),
          T = n(652),
          D = n(8591),
          k = n(7021),
          S = n(7249),
          v = n(5967)
        t.getOpEntries = function () {
          const e = []
          return (
            e.push(...r.getOpEntries()),
            e.push(...o.getOpEntries()),
            e.push(...i.getOpEntries()),
            e.push(...s.getOpEntries()),
            e.push(...a.getOpEntries()),
            e.push(...A.getOpEntries()),
            e.push(...u.getOpEntries()),
            e.push(...l.getOpEntries()),
            e.push(...g.getOpEntries()),
            e.push(...c.getOpEntries()),
            e.push(...d.getOpEntries()),
            e.push(...p.getOpEntries()),
            e.push(...h.getOpEntries()),
            e.push(...f.getOpEntries()),
            e.push(...I.getOpEntries()),
            e.push(...m.getOpEntries()),
            e.push(...E.getOpEntries()),
            e.push(...y.getOpEntries()),
            e.push(...C.getOpEntries()),
            e.push(...B.getOpEntries()),
            e.push(..._.getOpEntries()),
            e.push(...w.getOpEntries()),
            e.push(...b.getOpEntries()),
            e.push(...Q.getOpEntries()),
            e.push(...x.getOpEntries()),
            e.push(...T.getOpEntries()),
            e.push(...D.getOpEntries()),
            e.push(...k.getOpEntries()),
            e.push(...S.getOpEntries()),
            e.push(...v.getOpEntries()),
            e
          )
        }
      },
      2377: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(9747),
          o = n(7004)
        class i extends o.AveragePool {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0]
            if (4 !== n.ndim) throw new Error('AveragePool other than 2D is not yet supported')
            const {
                batch: o,
                kernelShape: i,
                pads: s,
                strides: a,
                inShape: A,
                outShape: u,
                ch: l,
              } = this.calcShape(n.dims),
              g = new Float32Array(o * u[0] * u[1] * l)
            return (
              r.averagepool(n.data, g, this.countIncludePad, o, i, s, a, A, u, l),
              [e.emptyTensor([o, l, u[0], u[1]], 'float32', g)]
            )
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'AveragePool', backend: 'cpu', opsetMin: 1, factory: () => new i() }]
        }
      },
      1098: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor(e, t) {
            ;(super('cpu'), (this.op = e), (this.allowDataTypes = t))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1]
            if (n.dataType !== r.dataType)
              throw new Error(`Binary: input dataTypes mismatch: ${n.dataType} !== ${r.dataType}`)
            if (!this.allowDataTypes.includes(n.dataType))
              throw new Error(`Binary: input dataType ${n.dataType} is not supported`)
            const { dims: i, allStrides: s } = o.broadcastMulti([n.dims, r.dims]),
              a = e.emptyTensor(i, n.dataType),
              { op: A } = this
            let u
            switch (i.length) {
              case 0:
                u = this.op0d
                break
              case 1:
                u = this.op1d
                break
              case 2:
                u = this.op2d
                break
              case 3:
                u = this.op3d
                break
              case 4:
                u = this.op4d
                break
              case 5:
                u = this.op5d
                break
              case 6:
                u = this.op6d
                break
              default:
                throw new Error(`Binary: input ndim ${i.length} > 4 is not yet supported`)
            }
            return (u(n.data, r.data, a.data, A, i, s), [a])
          }
          op0d(e, t, n, r, o, i) {
            n[0] = r(e[0], t[0])
          }
          op1d(e, t, n, r, o, i) {
            let s = 0
            for (let a = 0; a < o[0]; a++) n[s++] = r(e[a * i[0][0]], t[a * i[1][0]])
          }
          op2d(e, t, n, r, o, i) {
            let s = 0
            for (let a = 0; a < o[0]; a++)
              for (let A = 0; A < o[1]; A++)
                n[s++] = r(e[a * i[0][0] + A * i[0][1]], t[a * i[1][0] + A * i[1][1]])
          }
          op3d(e, t, n, r, o, i) {
            let s = 0
            for (let a = 0; a < o[0]; a++)
              for (let A = 0; A < o[1]; A++)
                for (let u = 0; u < o[2]; u++)
                  n[s++] = r(
                    e[a * i[0][0] + A * i[0][1] + u * i[0][2]],
                    t[a * i[1][0] + A * i[1][1] + u * i[1][2]]
                  )
          }
          op4d(e, t, n, r, o, i) {
            let s = 0
            for (let a = 0; a < o[0]; a++)
              for (let A = 0; A < o[1]; A++)
                for (let u = 0; u < o[2]; u++)
                  for (let l = 0; l < o[3]; l++)
                    n[s++] = r(
                      e[a * i[0][0] + A * i[0][1] + u * i[0][2] + l * i[0][3]],
                      t[a * i[1][0] + A * i[1][1] + u * i[1][2] + l * i[1][3]]
                    )
          }
          op5d(e, t, n, r, o, i) {
            let s = 0
            for (let a = 0; a < o[0]; a++)
              for (let A = 0; A < o[1]; A++)
                for (let u = 0; u < o[2]; u++)
                  for (let l = 0; l < o[3]; l++)
                    for (let g = 0; g < o[4]; g++)
                      n[s++] = r(
                        e[a * i[0][0] + A * i[0][1] + u * i[0][2] + l * i[0][3] + g * i[0][4]],
                        t[a * i[1][0] + A * i[1][1] + u * i[1][2] + l * i[1][3] + g * i[1][4]]
                      )
          }
          op6d(e, t, n, r, o, i) {
            let s = 0
            for (let a = 0; a < o[0]; a++)
              for (let A = 0; A < o[1]; A++)
                for (let u = 0; u < o[2]; u++)
                  for (let l = 0; l < o[3]; l++)
                    for (let g = 0; g < o[4]; g++)
                      for (let c = 0; c < o[5]; c++)
                        n[s++] = r(
                          e[
                            a * i[0][0] +
                              A * i[0][1] +
                              u * i[0][2] +
                              l * i[0][3] +
                              g * i[0][4] +
                              c * i[0][5]
                          ],
                          t[
                            a * i[1][0] +
                              A * i[1][1] +
                              u * i[1][2] +
                              l * i[1][3] +
                              g * i[1][4] +
                              c * i[1][5]
                          ]
                        )
          }
        }
        t.getOpEntries = function () {
          return [
            {
              opType: 'Add',
              backend: 'cpu',
              opsetMin: 7,
              factory: () => new i((e, t) => e + t, ['float32', 'int32']),
            },
            {
              opType: 'Sub',
              backend: 'cpu',
              opsetMin: 7,
              factory: () => new i((e, t) => e - t, ['float32', 'int32']),
            },
            {
              opType: 'Mul',
              backend: 'cpu',
              opsetMin: 7,
              factory: () => new i((e, t) => e * t, ['float32', 'int32']),
            },
            {
              opType: 'Div',
              backend: 'cpu',
              opsetMin: 7,
              factory: () => new i((e, t) => e / t, ['float32', 'int32']),
            },
            {
              opType: 'Pow',
              backend: 'cpu',
              opsetMin: 7,
              factory: () => new i((e, t) => e ** t, ['float32', 'int32']),
            },
          ]
        }
      },
      1037: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(1446),
          o = n(3076),
          i = n(3381),
          s = n(2055)
        class a extends i.OperatorImpl {
          constructor() {
            super('cpu')
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.to = s.getAttrInt(e, 'to', r.onnx.TensorProto.DataType.FLOAT)))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0]
            let i
            switch (this.to) {
              case r.onnx.TensorProto.DataType.FLOAT:
                i = 'float32'
                break
              case r.onnx.TensorProto.DataType.UINT8:
              case r.onnx.TensorProto.DataType.INT32:
              case r.onnx.TensorProto.DataType.INT64:
                i = 'int32'
                break
              default:
                throw new Error(`Cast: converting to DataType ${this.to} is not yet supported`)
            }
            const s = new o.DataArrayConstructor[i](n.data.length)
            return (s.set(n.data), [e.emptyTensor(n.dims, i, s)])
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Cast', backend: 'cpu', opsetMin: 6, factory: () => new a() }]
        }
      },
      4195: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3076),
          o = n(3381),
          i = n(2055)
        class s extends o.OperatorImpl {
          constructor() {
            super('cpu')
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.clipMax = i.getAttrFloat(e, 'max', 65536)),
              (this.clipMin = i.getAttrFloat(e, 'min', -65536)))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0]
            if (!['float32'].includes(n.dataType))
              throw new Error(`Unary: DataType ${n.dataType} not supported`)
            const o = new r.DataArrayConstructor[n.dataType](n.data.length),
              { clipMax: i, clipMin: s } = this
            for (let e = 0; e < o.length; e++) o[e] = Math.min(i, Math.max(n.data[e], s))
            return [e.emptyTensor(n.dims, n.dataType, o)]
          }
        }
        t.getOpEntries = function () {
          return [
            { opType: 'Clip', backend: 'cpu', opsetMin: 1, opsetMax: 11, factory: () => new s() },
          ]
        }
      },
      8646: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor() {
            super('cpu')
          }
          initialize(e) {
            ;(super.initialize(e), (this.axis = o.getAttrInt(e, 'axis', 0)))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = this.axis >= 0 ? this.axis : t[0].ndim + this.axis
            if (n < 0 || n >= t[0].ndim) throw new Error(`Concat: axis ${n} out of range`)
            const r = []
            let i = 0
            for (let e = 0; e < t.length; e++) {
              const o = t[e],
                s = o.dims[n],
                a = o.strides[Math.max(n - 1, 0)],
                A = o.strides[n],
                u = 1
              ;(r.push([o, i, s, a, A, u]), (i += s))
            }
            const s = t[0].dims.slice()
            s[n] = i
            const a = o.arrayProd(t[0].dims.slice(0, n)),
              A = o.arrayProd(t[0].dims.slice(n + 1)),
              u = e.emptyTensor(s, t[0].dataType),
              l = u.strides[Math.max(n - 1, 0)],
              g = u.strides[n]
            for (const [e, t, n, o, i, s] of r)
              for (let r = 0; r < n; r++)
                for (let n = 0; n < a; n++)
                  for (let a = 0; a < A; a++)
                    u.data[(r + t) * g + n * l + 1 * a] = e.data[r * i + n * o + a * s]
            return [u]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Concat', backend: 'cpu', opsetMin: 1, factory: () => new i() }]
        }
      },
      7831: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor() {
            super('cpu')
          }
          initialize(e) {
            super.initialize(e)
            const t = o.getAttrTensor(e, 'value')
            if (!t) throw new Error('value not exist in Constant')
            this.constant = t
          }
          async run(e, t) {
            const n = e.emptyTensor(this.constant.dims, this.constant.dataType)
            return (n.data.set(this.constant.data), [n])
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Constant', backend: 'cpu', opsetMin: 1, factory: () => new i() }]
        }
      },
      9456: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor() {
            super('cpu')
          }
          initialize(e) {
            super.initialize(e)
            const t = o.getAttrTensor(e, 'value')
            if (!t) throw new Error('value not exist in ConstantOfShape')
            this.constant = t
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = Array.from(t[0].data),
              r = e.emptyTensor(n, this.constant.dataType)
            return (r.data.fill(this.constant.data[0]), [r])
          }
        }
        t.getOpEntries = function () {
          return [
            { opType: 'ConstantOfShape', backend: 'cpu', opsetMin: 9, factory: () => new i() },
          ]
        }
      },
      7234: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(1908),
          o = n(2825),
          i = 535822336
        class s extends o.Conv {
          constructor() {
            super('cpu')
          }
          runSplitBatch(e, t, n, o) {
            if (this.group > 1)
              throw new Error('Conv: batch splitting with group > 1 is not supported')
            const {
                batch: s,
                dilations: a,
                group: A,
                kernelShape: u,
                pads: l,
                strides: g,
                inShape: c,
                outShape: d,
                chIn: p,
                chInPerGroup: h,
                chOut: f,
                chOutPerGroup: I,
              } = this.calcShape(t.dims, n.dims),
              m = A * d[0] * d[1] * h * u[0] * u[1],
              E = Math.floor(i / m),
              y = [s, f, d[0], d[1]]
            if (E <= 0)
              throw new Error(
                `Conv: the size of buffer needed to process single batch exceeds limit. Input shape: ${t.dims}, weight shape: ${n.dims}`
              )
            const C = e.emptyTensor(y)
            for (let o = 0; o < s; o += E) {
              const i = Math.min(E, s - o),
                m = t.dims.slice()
              m[0] = i
              const y = r.arrayProd(m.slice(1)),
                B = new Float32Array(
                  t.data.buffer,
                  t.data.byteOffset + o * y * Float32Array.BYTES_PER_ELEMENT,
                  i * y
                ),
                _ = e.emptyTensor(m, 'float32', B),
                w = new Float32Array(A * i * d[0] * d[1] * h * u[0] * u[1]),
                b = new Float32Array(A * i * d[0] * d[1] * I),
                Q = new Float32Array(
                  C.data.buffer,
                  C.data.byteOffset + o * f * d[0] * d[1] * Float32Array.BYTES_PER_ELEMENT,
                  i * f * d[0] * d[1]
                )
              ;(this.im2col(_.data, w, i, a, A, u, l, g, c, d, p, h),
                this.matmul(w, n.data, b, A, i * d[0] * d[1], h * u[0] * u[1], I),
                this.transpose(b, Q, A, i, d[0] * d[1], I))
            }
            return (o && this.bias(o.data, C.data, s, f, d[0] * d[1]), [C])
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1],
              o = t[2]
            if (4 !== n.ndim) throw new Error('Conv other than 2D is not yet supported')
            const {
                batch: s,
                dilations: a,
                group: A,
                kernelShape: u,
                pads: l,
                strides: g,
                inShape: c,
                outShape: d,
                chIn: p,
                chInPerGroup: h,
                chOut: f,
                chOutPerGroup: I,
              } = this.calcShape(n.dims, r.dims),
              m = A * s * d[0] * d[1] * h * u[0] * u[1]
            if (m > i) return this.runSplitBatch(e, n, r, o)
            const E = new Float32Array(m),
              y = new Float32Array(A * s * d[0] * d[1] * I),
              C = new Float32Array(s * f * d[0] * d[1])
            return (
              this.im2col(n.data, E, s, a, A, u, l, g, c, d, p, h),
              this.matmul(E, r.data, y, A, s * d[0] * d[1], h * u[0] * u[1], I),
              this.transpose(y, C, A, s, d[0] * d[1], I),
              o && this.bias(o.data, C, s, f, d[0] * d[1]),
              [e.emptyTensor([s, f, d[0], d[1]], 'float32', C)]
            )
          }
          im2col(e, t, n, r, o, i, s, a, A, u, l, g) {
            let c = 0
            for (let d = 0; d < o; d++)
              for (let o = 0; o < n; o++)
                for (let n = 0; n < u[0]; n++)
                  for (let p = 0; p < u[1]; p++)
                    for (let u = 0; u < g; u++)
                      for (let h = 0; h < i[0]; h++)
                        for (let f = 0; f < i[1]; f++) {
                          let i = 0
                          const I = n * a[0] - s[0] + h * r[0],
                            m = p * a[1] - s[1] + f * r[1]
                          ;(I >= 0 &&
                            I < A[0] &&
                            m >= 0 &&
                            m < A[1] &&
                            (i = e[((o * l + d * g + u) * A[0] + I) * A[1] + m]),
                            (t[c++] = i))
                        }
          }
          matmul(e, t, n, r, o, i, s) {
            for (let a = 0; a < r; a++)
              for (let r = 0; r < o; r++)
                for (let A = 0; A < s; A++) {
                  let u = 0
                  for (let n = 0; n < i; n++) u += e[(a * o + r) * i + n] * t[(a * s + A) * i + n]
                  n[(a * o + r) * s + A] = u
                }
          }
          transpose(e, t, n, r, o, i) {
            let s = 0
            for (let a = 0; a < r; a++)
              for (let A = 0; A < n; A++)
                for (let n = 0; n < i; n++)
                  for (let u = 0; u < o; u++) t[s++] = e[((A * r + a) * o + u) * i + n]
          }
          bias(e, t, n, r, o) {
            let i = 0
            for (let s = 0; s < n; s++)
              for (let n = 0; n < r; n++) for (let r = 0; r < o; r++) t[i++] += e[n]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Conv', backend: 'cpu', opsetMin: 1, factory: () => new s() }]
        }
      },
      322: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(9549)
        class o extends r.ConvTranspose {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1],
              o = t[2]
            if (4 !== n.ndim) throw new Error('ConvTranspose other than 2D is not yet supported')
            const {
                batch: i,
                dilations: s,
                group: a,
                kernelShape: A,
                pads: u,
                strides: l,
                inShape: g,
                outShape: c,
                chIn: d,
                chInPerGroup: p,
                chOut: h,
                chOutPerGroup: f,
              } = this.calcShape(n.dims, r.dims),
              I = new Float32Array(d * i * g[0] * g[1]),
              m = new Float32Array(h * A[0] * A[1] * p),
              E = new Float32Array(h * i * g[0] * g[1] * A[0] * A[1]),
              y = new Float32Array(i * h * c[0] * c[1])
            return (
              this.transposeInput(n.data, I, a, i, g[0] * g[1], p),
              this.transposeWeight(r.data, m, a, p, f, A[0] * A[1]),
              this.matmul(I, m, E, a, i * g[0] * g[1], f * A[0] * A[1], p),
              this.col2im(E, y, i, s, a, A, u, l, g, c, f),
              o && this.bias(o.data, y, i, h, c[0] * c[1]),
              [e.emptyTensor([i, h, c[0], c[1]], 'float32', y)]
            )
          }
          col2im(e, t, n, r, o, i, s, a, A, u, l) {
            let g = 0
            for (let c = 0; c < n; c++)
              for (let d = 0; d < o; d++)
                for (let o = 0; o < l; o++)
                  for (let p = 0; p < u[0]; p++)
                    for (let h = 0; h < u[1]; h++) {
                      let u = 0
                      for (let t = 0; t < i[0]; t++)
                        for (let g = 0; g < i[1]; g++) {
                          const f = p + s[0] - t * r[0],
                            I = h + s[1] - g * r[1]
                          if (f % a[0] !== 0 || I % a[1] !== 0) continue
                          const m = f / a[0],
                            E = I / a[1]
                          m < 0 ||
                            m >= A[0] ||
                            E < 0 ||
                            E >= A[1] ||
                            (u +=
                              e[
                                (((((d * n + c) * A[0] + m) * A[1] + E) * l + o) * i[0] + t) *
                                  i[1] +
                                  g
                              ])
                        }
                      t[g++] = u
                    }
          }
          matmul(e, t, n, r, o, i, s) {
            for (let a = 0; a < r; a++)
              for (let r = 0; r < o; r++)
                for (let A = 0; A < i; A++) {
                  let u = 0
                  const l = (a * o + r) * s,
                    g = (a * i + A) * s
                  for (let n = 0; n < s; n++) u += e[l + n] * t[g + n]
                  n[(a * o + r) * i + A] = u
                }
          }
          transposeInput(e, t, n, r, o, i) {
            let s = 0
            for (let a = 0; a < n; a++)
              for (let A = 0; A < r; A++)
                for (let r = 0; r < o; r++)
                  for (let u = 0; u < i; u++) t[s++] = e[((A * n + a) * i + u) * o + r]
          }
          transposeWeight(e, t, n, r, o, i) {
            let s = 0
            for (let a = 0; a < n; a++)
              for (let n = 0; n < o; n++)
                for (let A = 0; A < i; A++)
                  for (let u = 0; u < r; u++) t[s++] = e[((a * r + u) * o + n) * i + A]
          }
          bias(e, t, n, r, o) {
            let i = 0
            for (let s = 0; s < n; s++)
              for (let n = 0; n < r; n++) for (let r = 0; r < o; r++) t[i++] += e[n]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'ConvTranspose', backend: 'cpu', opsetMin: 1, factory: () => new o() }]
        }
      },
      4309: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3076),
          o = n(3381),
          i = n(2055)
        class s extends o.OperatorImpl {
          constructor(e, t) {
            ;(super('cpu'), (this.opType = e), (this.allowDataTypes = t))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0]
            if (!this.allowDataTypes.includes(n.dataType))
              throw new Error(`${this.opType}: DataType ${n.dataType} not supported`)
            const o = new r.DataArrayConstructor[n.dataType](n.data.length),
              i = this.getUnaryOp()
            for (let e = 0; e < o.length; e++) o[e] = i(n.data[e])
            return [e.emptyTensor(n.dims, n.dataType, o)]
          }
        }
        class a extends s {
          constructor() {
            super('Elu', ['float32'])
          }
          initialize(e) {
            ;(super.initialize(e), (this.alpha = i.getAttrFloat(e, 'alpha', 1)))
          }
          getUnaryOp() {
            const e = this.alpha
            return (t) => (t >= 0 ? t : (Math.exp(t) - 1) * e)
          }
        }
        class A extends s {
          constructor() {
            super('HardSigmoid', ['float32'])
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.alpha = i.getAttrFloat(e, 'alpha', 0.2)),
              (this.beta = i.getAttrFloat(e, 'beta', 0.5)))
          }
          getUnaryOp() {
            const e = this.alpha,
              t = this.beta
            return (n) => Math.max(0, Math.min(1, n * e + t))
          }
        }
        class u extends s {
          constructor() {
            super('LeakyRelu', ['float32'])
          }
          initialize(e) {
            ;(super.initialize(e), (this.alpha = i.getAttrFloat(e, 'alpha', 0.01)))
          }
          getUnaryOp() {
            const e = this.alpha
            return (t) => (t >= 0 ? t : t * e)
          }
        }
        class l extends s {
          constructor() {
            super('Selu', ['float32'])
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.alpha = i.getAttrFloat(e, 'alpha', 1.6732632423543772)),
              (this.gamma = i.getAttrFloat(e, 'gamma', 1.0507009873554805)))
          }
          getUnaryOp() {
            const e = this.alpha,
              t = this.gamma
            return (n) => (n > 0 ? t * n : t * (e * Math.exp(n) - e))
          }
        }
        class g extends s {
          constructor() {
            super('ThresholdedRelu', ['float32'])
          }
          initialize(e) {
            ;(super.initialize(e), (this.alpha = i.getAttrFloat(e, 'alpha', 1)))
          }
          getUnaryOp() {
            const e = this.alpha
            return (t) => (t > e ? t : 0)
          }
        }
        t.getOpEntries = function () {
          return [
            { opType: 'Elu', backend: 'cpu', opsetMin: 1, factory: () => new a() },
            { opType: 'HardSigmoid', backend: 'cpu', opsetMin: 1, factory: () => new A() },
            { opType: 'LeakyRelu', backend: 'cpu', opsetMin: 1, factory: () => new u() },
            { opType: 'Selu', backend: 'cpu', opsetMin: 1, factory: () => new l() },
            { opType: 'ThresholdedRelu', backend: 'cpu', opsetMin: 1, factory: () => new g() },
          ]
        }
      },
      3861: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor(e, t, n) {
            ;(super('cpu'), (this.opType = e), (this.op = t), (this.allowDataTypes = n))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            for (const e of t)
              if (e.dataType !== t[0].dataType)
                throw new Error(
                  `${this.opType}: input dataTypes mismatch: ${e.dataType} !== ${t[0].dataType}`
                )
            if (!this.allowDataTypes.includes(t[0].dataType))
              throw new Error(`${this.opType}: input dataType ${t[0].dataType} is not supported`)
            const { dims: n, allStrides: r } = o.broadcastMulti(t.map((e) => e.dims)),
              i = e.emptyTensor(n, t[0].dataType),
              { op: s } = this,
              a = t.map((e) => e.data)
            switch (n.length) {
              case 0:
                this.op0d(a, i.data, s, n, r)
                break
              case 1:
                this.op1d(a, i.data, s, n, r)
                break
              case 2:
                this.op2d(a, i.data, s, n, r)
                break
              case 3:
                this.op3d(a, i.data, s, n, r)
                break
              case 4:
                this.op4d(a, i.data, s, n, r)
                break
              default:
                throw new Error('Binary: input ndim > 4 is not yet supported')
            }
            return [i]
          }
          op0d(e, t, n, r, o) {
            t[0] = n(e.map((e) => e[0]))
          }
          op1d(e, t, n, r, o) {
            let i = 0
            for (let s = 0; s < r[0]; s++) {
              const r = []
              for (let t = 0; t < e.length; t++) r.push(e[t][s * o[t][0]])
              t[i++] = n(r)
            }
          }
          op2d(e, t, n, r, o) {
            let i = 0
            for (let s = 0; s < r[0]; s++)
              for (let a = 0; a < r[1]; a++) {
                const r = []
                for (let t = 0; t < e.length; t++) r.push(e[t][s * o[t][0] + a * o[t][1]])
                t[i++] = n(r)
              }
          }
          op3d(e, t, n, r, o) {
            let i = 0
            for (let s = 0; s < r[0]; s++)
              for (let a = 0; a < r[1]; a++)
                for (let A = 0; A < r[2]; A++) {
                  const r = []
                  for (let t = 0; t < e.length; t++)
                    r.push(e[t][s * o[t][0] + a * o[t][1] + A * o[t][2]])
                  t[i++] = n(r)
                }
          }
          op4d(e, t, n, r, o) {
            let i = 0
            for (let s = 0; s < r[0]; s++)
              for (let a = 0; a < r[1]; a++)
                for (let A = 0; A < r[2]; A++)
                  for (let u = 0; u < r[3]; u++) {
                    const r = []
                    for (let t = 0; t < e.length; t++)
                      r.push(e[t][s * o[t][0] + a * o[t][1] + A * o[t][2] + u * o[t][3]])
                    t[i++] = n(r)
                  }
          }
        }
        t.getOpEntries = function () {
          return [
            {
              opType: 'Max',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i('Max', (e) => Math.max(...e), ['float32', 'int32']),
            },
            {
              opType: 'Mean',
              backend: 'cpu',
              opsetMin: 1,
              factory: () =>
                new i('Mean', (e) => e.reduce((e, t) => e + t, 0) / e.length, ['float32']),
            },
            {
              opType: 'Min',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i('Min', (e) => Math.min(...e), ['float32', 'int32']),
            },
            {
              opType: 'Sum',
              backend: 'cpu',
              opsetMin: 1,
              factory: () =>
                new i('Sum', (e) => e.reduce((e, t) => e + t, 0), ['float32', 'int32']),
            },
          ]
        }
      },
      2345: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(5543)
        class o extends r.Flatten {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0]
            return [e.emptyTensor(this.calcShape(n), n.dataType, n.data)]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Flatten', backend: 'cpu', opsetMin: 1, factory: () => new o() }]
        }
      },
      8250: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor() {
            super('cpu')
          }
          initialize(e) {
            ;(super.initialize(e), (this.axis = o.getAttrInt(e, 'axis', 0)))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1],
              { axis: o } = this
            if (1 !== n.ndim || 0 !== r.ndim || 0 !== o)
              throw new Error(
                'Gather: currently supports data.ndim === 1 && indices.ndim === 0 && axis === 0'
              )
            const i = e.emptyTensor([], n.dataType)
            return ((i.data[0] = n.data[r.data[0]]), [i])
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Gather', backend: 'cpu', opsetMin: 1, factory: () => new i() }]
        }
      },
      6382: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(2055),
          o = n(5620)
        class i extends o.Gemm {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              o = t[1],
              i = t[2],
              {
                m: s,
                n: a,
                k: A,
                strideA: [u, l],
                strideB: [g, c],
              } = this.calcShape(n.dims, o.dims),
              d = new Float32Array(s * a),
              p = n.data,
              h = o.data,
              { alpha: f } = this
            for (let e = 0; e < s; e++)
              for (let t = 0; t < a; t++) {
                let n = 0
                for (let r = 0; r < A; r++) n += p[e * u + r * l] * h[r * g + t * c]
                ;((n *= f), (d[e * a + t] = n))
              }
            if (i) {
              const [e, t] = r.broadcastUni([s, a], i.dims),
                n = i.data,
                { beta: o } = this
              for (let r = 0; r < s; r++)
                for (let i = 0; i < a; i++) d[r * a + i] += n[r * e + i * t] * o
            }
            return [e.emptyTensor([s, a], 'float32', d)]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Gemm', backend: 'cpu', opsetMin: 1, factory: () => new i() }]
        }
      },
      7545: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.CpuGlobalAveragePool = void 0))
        const r = n(3381),
          o = n(9747)
        class i extends r.OperatorImpl {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0]
            if (4 !== n.ndim) throw new Error('MaxPool other than 2D is not yet supported')
            const r = n.dims[0],
              i = n.dims[1],
              s = [n.dims[2], n.dims[3]],
              a = new Float32Array(r * i)
            return (
              o.averagepool(n.data, a, !0, r, s, [0, 0, 0, 0], [1, 1], s, [1, 1], i),
              [e.emptyTensor([r, i, 1, 1], 'float32', a)]
            )
          }
        }
        ;((t.CpuGlobalAveragePool = i),
          (t.getOpEntries = function () {
            return [
              { opType: 'GlobalAveragePool', backend: 'cpu', opsetMin: 1, factory: () => new i() },
            ]
          }))
      },
      6734: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055),
          i = n(1908)
        class s extends r.OperatorImpl {
          constructor() {
            super('cpu')
          }
          initialize(e) {
            ;(super.initialize(e), (this.epsilon = o.getAttrInt(e, 'epsilon', 1e-5)))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const [n, r, o] = t,
              s = i.arrayProd(n.dims.slice(2)),
              a = e.emptyTensor(n.dims, n.dataType),
              A = n.data,
              u = a.data,
              l = r.data,
              g = o.data,
              [c, d] = n.dims,
              [p, h] = n.strides
            for (let e = 0; e < c; e++)
              for (let t = 0; t < d; t++) {
                const n = e * p + t * h
                let r = 0,
                  o = 0
                for (let e = 0; e < s; e++) {
                  const t = A[n + e]
                  ;((r += t), (o += t * t))
                }
                const i = r / s,
                  a = o / s - i * i,
                  c = 1 / Math.sqrt(a + this.epsilon),
                  d = l[t] * c,
                  f = -i * d + g[t]
                for (let e = 0; e < s; e++) u[n + e] = A[n + e] * d + f
              }
            return [a]
          }
        }
        t.getOpEntries = function () {
          return [
            {
              opType: 'InstanceNormalization',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new s(),
            },
          ]
        }
      },
      2441: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(5818)
        class o extends r.MatMul {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1]
            if ('float32' !== n.dataType || 'float32' !== r.dataType)
              throw new Error('only float32 is supported')
            const {
                resultLength: o,
                resultDims: i,
                resultStrides: s,
                resultDimsAfterSqueeze: a,
                stridesA: A,
                stridesB: u,
                innerProductLength: l,
              } = this.calcShape(n.dims, r.dims),
              g = new Float32Array(o)
            if (2 === i.length) this.calcDim2(n.data, r.data, g, i, s, A, u, l)
            else {
              if (3 !== i.length) throw new Error()
              this.calcDim3(n.data, r.data, g, i, s, A, u, l)
            }
            return [e.emptyTensor(a, 'float32', g)]
          }
          calcDim2(e, t, n, r, o, i, s, a) {
            for (let A = 0; A < r[0]; A++)
              for (let u = 0; u < r[1]; u++) {
                let r = 0
                for (let n = 0; n < a; n++) r += e[A * i[0] + n * i[1]] * t[n * s[0] + u * s[1]]
                n[A * o[0] + u * o[1]] = r
              }
          }
          calcDim3(e, t, n, r, o, i, s, a) {
            for (let A = 0; A < r[0]; A++)
              for (let u = 0; u < r[1]; u++)
                for (let l = 0; l < r[2]; l++) {
                  let r = 0
                  for (let n = 0; n < a; n++)
                    r += e[A * i[0] + u * i[1] + n * i[2]] * t[A * s[0] + n * s[1] + l * s[2]]
                  n[A * o[0] + u * o[1] + l * o[2]] = r
                }
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'MatMul', backend: 'cpu', opsetMin: 1, factory: () => new o() }]
        }
      },
      5800: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3369)
        class o extends r.MaxPool {
          constructor() {
            super('cpu')
          }
          async run(e, t, n) {
            e.assertsCPUTensorArray(t)
            const r = t[0]
            if (1 !== n) throw new Error('MaxPool: output indices is not yet supported')
            if (4 !== r.ndim) throw new Error('MaxPool other than 2D is not yet supported')
            const {
                batch: o,
                dilations: i,
                kernelShape: s,
                pads: a,
                strides: A,
                inShape: u,
                outShape: l,
                ch: g,
              } = this.calcShape(r.dims),
              c = new Float32Array(o * l[0] * l[1] * g)
            return (
              this.maxpool(r.data, c, o, i, s, a, A, u, l, g),
              [e.emptyTensor([o, g, l[0], l[1]], 'float32', c)]
            )
          }
          maxpool(e, t, n, r, o, i, s, a, A, u) {
            let l = 0
            for (let g = 0; g < n; g++)
              for (let n = 0; n < u; n++)
                for (let c = 0; c < A[0]; c++)
                  for (let d = 0; d < A[1]; d++) {
                    let A = -1 / 0
                    for (let t = 0; t < o[0]; t++)
                      for (let l = 0; l < o[1]; l++) {
                        const o = c * s[0] - i[0] + t * r[0],
                          p = d * s[1] - i[1] + l * r[1]
                        if (o >= 0 && o < a[0] && p >= 0 && p < a[1]) {
                          const t = e[((g * u + n) * a[0] + o) * a[1] + p]
                          t > A && (A = t)
                        }
                      }
                    t[l++] = A
                  }
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'MaxPool', backend: 'cpu', opsetMin: 1, factory: () => new o() }]
        }
      },
      8998: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(5082)
        class o extends r.Pad11 {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const [n, r, o] = t,
              { outputShape: i, pads: s } = this.calcShape(n, r)
            let a = 0
            o && (a = o.data[0])
            const A = e.emptyTensor(i, n.dataType)
            let u
            switch (this.mode) {
              case 'constant':
                switch (n.ndim) {
                  case 1:
                    u = this.constCopy1d
                    break
                  case 2:
                    u = this.constCopy2d
                    break
                  case 3:
                    u = this.constCopy3d
                    break
                  case 4:
                    u = this.constCopy4d
                    break
                  case 5:
                    u = this.constCopy5d
                    break
                  case 6:
                    u = this.constCopy6d
                    break
                  default:
                    throw new Error(`Pad: input.ndim = ${n.ndim} > 6 is not yet supported`)
                }
                break
              case 'reflect':
                switch (n.ndim) {
                  case 1:
                    u = this.reflectCopy1d
                    break
                  case 2:
                    u = this.reflectCopy2d
                    break
                  case 3:
                    u = this.reflectCopy3d
                    break
                  case 4:
                    u = this.reflectCopy4d
                    break
                  case 5:
                    u = this.reflectCopy5d
                    break
                  case 6:
                    u = this.reflectCopy6d
                    break
                  default:
                    throw new Error(`Pad: input.ndim = ${n.ndim} > 6 is not yet supported`)
                }
                break
              case 'edge':
                switch (n.ndim) {
                  case 1:
                    u = this.edgeCopy1d
                    break
                  case 2:
                    u = this.edgeCopy2d
                    break
                  case 3:
                    u = this.edgeCopy3d
                    break
                  case 4:
                    u = this.edgeCopy4d
                    break
                  case 5:
                    u = this.edgeCopy5d
                    break
                  case 6:
                    u = this.edgeCopy6d
                    break
                  default:
                    throw new Error(`Pad: input.ndim = ${n.ndim} > 6 is not yet supported`)
                }
            }
            return (u(n.data, A.data, n.dims, i, n.strides, A.strides, s, a), [A])
          }
          constCopy1d(e, t, n, r, o, i, s, a) {
            for (let A = 0; A < r[0]; A++) {
              const r = A - s[0]
              let u
              ;((u = r < 0 || r >= n[0] ? a : e[r * o[0]]), (t[A * i[0]] = u))
            }
          }
          constCopy2d(e, t, n, r, o, i, s, a) {
            for (let A = 0; A < r[0]; A++)
              for (let u = 0; u < r[1]; u++) {
                const r = A - s[0],
                  l = u - s[1]
                let g
                ;((g = r < 0 || r >= n[0] || l < 0 || l >= n[1] ? a : e[r * o[0] + l * o[1]]),
                  (t[A * i[0] + u * i[1]] = g))
              }
          }
          constCopy3d(e, t, n, r, o, i, s, a) {
            for (let A = 0; A < r[0]; A++)
              for (let u = 0; u < r[1]; u++)
                for (let l = 0; l < r[2]; l++) {
                  const r = A - s[0],
                    g = u - s[1],
                    c = l - s[2]
                  let d
                  ;((d =
                    r < 0 || r >= n[0] || g < 0 || g >= n[1] || c < 0 || c >= n[2]
                      ? a
                      : e[r * o[0] + g * o[1] + c * o[2]]),
                    (t[A * i[0] + u * i[1] + l * i[2]] = d))
                }
          }
          constCopy4d(e, t, n, r, o, i, s, a) {
            for (let A = 0; A < r[0]; A++)
              for (let u = 0; u < r[1]; u++)
                for (let l = 0; l < r[2]; l++)
                  for (let g = 0; g < r[3]; g++) {
                    const r = A - s[0],
                      c = u - s[1],
                      d = l - s[2],
                      p = g - s[3]
                    let h
                    ;((h =
                      r < 0 ||
                      r >= n[0] ||
                      c < 0 ||
                      c >= n[1] ||
                      d < 0 ||
                      d >= n[2] ||
                      p < 0 ||
                      p >= n[3]
                        ? a
                        : e[r * o[0] + c * o[1] + d * o[2] + p * o[3]]),
                      (t[A * i[0] + u * i[1] + l * i[2] + g * i[3]] = h))
                  }
          }
          constCopy5d(e, t, n, r, o, i, s, a) {
            for (let A = 0; A < r[0]; A++)
              for (let u = 0; u < r[1]; u++)
                for (let l = 0; l < r[2]; l++)
                  for (let g = 0; g < r[3]; g++)
                    for (let c = 0; c < r[4]; c++) {
                      const r = A - s[0],
                        d = u - s[1],
                        p = l - s[2],
                        h = g - s[3],
                        f = c - s[4]
                      let I
                      ;((I =
                        r < 0 ||
                        r >= n[0] ||
                        d < 0 ||
                        d >= n[1] ||
                        p < 0 ||
                        p >= n[2] ||
                        h < 0 ||
                        h >= n[3] ||
                        f < 0 ||
                        f >= n[4]
                          ? a
                          : e[r * o[0] + d * o[1] + p * o[2] + h * o[3] + f * o[4]]),
                        (t[A * i[0] + u * i[1] + l * i[2] + g * i[3] + c * i[4]] = I))
                    }
          }
          constCopy6d(e, t, n, r, o, i, s, a) {
            for (let A = 0; A < r[0]; A++)
              for (let u = 0; u < r[1]; u++)
                for (let l = 0; l < r[2]; l++)
                  for (let g = 0; g < r[3]; g++)
                    for (let c = 0; c < r[4]; c++)
                      for (let d = 0; d < r[5]; d++) {
                        const r = A - s[0],
                          p = u - s[1],
                          h = l - s[2],
                          f = g - s[3],
                          I = c - s[4],
                          m = d - s[5]
                        let E
                        ;((E =
                          r < 0 ||
                          r >= n[0] ||
                          p < 0 ||
                          p >= n[1] ||
                          h < 0 ||
                          h >= n[2] ||
                          f < 0 ||
                          f >= n[3] ||
                          I < 0 ||
                          I >= n[4] ||
                          m < 0 ||
                          m >= n[5]
                            ? a
                            : e[r * o[0] + p * o[1] + h * o[2] + f * o[3] + I * o[4] + m * o[5]]),
                          (t[A * i[0] + u * i[1] + l * i[2] + g * i[3] + c * i[4] + d * i[5]] = E))
                      }
          }
          reflectCopy1d(e, t, n, r, o, i, s) {
            const [a] = n,
              [A] = r,
              [u] = o,
              [l] = i,
              [g] = s
            for (let n = 0; n < A; n++) {
              let r = n - g
              r < 0
                ? ((r = -r % (2 * a - 2)), r >= a && (r = 2 * a - r - 2))
                : r >= a && ((r %= 2 * a - 2), r >= a && (r = 2 * a - r - 2))
              const o = e[r * u]
              t[n * l] = o
            }
          }
          reflectCopy2d(e, t, n, r, o, i, s) {
            const [a, A] = n,
              [u, l] = r,
              [g, c] = o,
              [d, p] = i,
              [h, f] = s
            for (let n = 0; n < u; n++)
              for (let r = 0; r < l; r++) {
                let o = n - h,
                  i = r - f
                ;(o < 0
                  ? ((o = -o % (2 * a - 2)), o >= a && (o = 2 * a - o - 2))
                  : o >= a && ((o %= 2 * a - 2), o >= a && (o = 2 * a - o - 2)),
                  i < 0
                    ? ((i = -i % (2 * A - 2)), i >= A && (i = 2 * A - i - 2))
                    : i >= A && ((i %= 2 * A - 2), i >= A && (i = 2 * A - i - 2)))
                const s = e[o * g + i * c]
                t[n * d + r * p] = s
              }
          }
          reflectCopy3d(e, t, n, r, o, i, s) {
            const [a, A, u] = n,
              [l, g, c] = r,
              [d, p, h] = o,
              [f, I, m] = i,
              [E, y, C] = s
            for (let n = 0; n < l; n++)
              for (let r = 0; r < g; r++)
                for (let o = 0; o < c; o++) {
                  let i = n - E,
                    s = r - y,
                    l = o - C
                  ;(i < 0
                    ? ((i = -i % (2 * a - 2)), i >= a && (i = 2 * a - i - 2))
                    : i >= a && ((i %= 2 * a - 2), i >= a && (i = 2 * a - i - 2)),
                    s < 0
                      ? ((s = -s % (2 * A - 2)), s >= A && (s = 2 * A - s - 2))
                      : s >= A && ((s %= 2 * A - 2), s >= A && (s = 2 * A - s - 2)),
                    l < 0
                      ? ((l = -l % (2 * u - 2)), l >= u && (l = 2 * u - l - 2))
                      : l >= u && ((l %= 2 * u - 2), l >= u && (l = 2 * u - l - 2)))
                  const g = e[i * d + s * p + l * h]
                  t[n * f + r * I + o * m] = g
                }
          }
          reflectCopy4d(e, t, n, r, o, i, s) {
            const [a, A, u, l] = n,
              [g, c, d, p] = r,
              [h, f, I, m] = o,
              [E, y, C, B] = i,
              [_, w, b, Q] = s
            for (let n = 0; n < g; n++)
              for (let r = 0; r < c; r++)
                for (let o = 0; o < d; o++)
                  for (let i = 0; i < p; i++) {
                    let s = n - _,
                      g = r - w,
                      c = o - b,
                      d = i - Q
                    ;(s < 0
                      ? ((s = -s % (2 * a - 2)), s >= a && (s = 2 * a - s - 2))
                      : s >= a && ((s %= 2 * a - 2), s >= a && (s = 2 * a - s - 2)),
                      g < 0
                        ? ((g = -g % (2 * A - 2)), g >= A && (g = 2 * A - g - 2))
                        : g >= A && ((g %= 2 * A - 2), g >= A && (g = 2 * A - g - 2)),
                      c < 0
                        ? ((c = -c % (2 * u - 2)), c >= u && (c = 2 * u - c - 2))
                        : c >= u && ((c %= 2 * u - 2), c >= u && (c = 2 * u - c - 2)),
                      d < 0
                        ? ((d = -d % (2 * l - 2)), d >= l && (d = 2 * l - d - 2))
                        : d >= l && ((d %= 2 * l - 2), d >= l && (d = 2 * l - d - 2)))
                    const p = e[s * h + g * f + c * I + d * m]
                    t[n * E + r * y + o * C + i * B] = p
                  }
          }
          reflectCopy5d(e, t, n, r, o, i, s) {
            const [a, A, u, l, g] = n,
              [c, d, p, h, f] = r,
              [I, m, E, y, C] = o,
              [B, _, w, b, Q] = i,
              [x, T, D, k, S] = s
            for (let n = 0; n < c; n++)
              for (let r = 0; r < d; r++)
                for (let o = 0; o < p; o++)
                  for (let i = 0; i < h; i++)
                    for (let s = 0; s < f; s++) {
                      let c = n - x,
                        d = r - T,
                        p = o - D,
                        h = i - k,
                        f = s - S
                      ;(c < 0
                        ? ((c = -c % (2 * a - 2)), c >= a && (c = 2 * a - c - 2))
                        : c >= a && ((c %= 2 * a - 2), c >= a && (c = 2 * a - c - 2)),
                        d < 0
                          ? ((d = -d % (2 * A - 2)), d >= A && (d = 2 * A - d - 2))
                          : d >= A && ((d %= 2 * A - 2), d >= A && (d = 2 * A - d - 2)),
                        p < 0
                          ? ((p = -p % (2 * u - 2)), p >= u && (p = 2 * u - p - 2))
                          : p >= u && ((p %= 2 * u - 2), p >= u && (p = 2 * u - p - 2)),
                        h < 0
                          ? ((h = -h % (2 * l - 2)), h >= l && (h = 2 * l - h - 2))
                          : h >= l && ((h %= 2 * l - 2), h >= l && (h = 2 * l - h - 2)),
                        f < 0
                          ? ((f = -f % (2 * g - 2)), f >= g && (f = 2 * g - f - 2))
                          : f >= g && ((f %= 2 * g - 2), f >= g && (f = 2 * g - f - 2)))
                      const v = e[c * I + d * m + p * E + h * y + f * C]
                      t[n * B + r * _ + o * w + i * b + s * Q] = v
                    }
          }
          reflectCopy6d(e, t, n, r, o, i, s) {
            const [a, A, u, l, g, c] = n,
              [d, p, h, f, I, m] = r,
              [E, y, C, B, _, w] = o,
              [b, Q, x, T, D, k] = i,
              [S, v, G, O, N, P] = s
            for (let n = 0; n < d; n++)
              for (let r = 0; r < p; r++)
                for (let o = 0; o < h; o++)
                  for (let i = 0; i < f; i++)
                    for (let s = 0; s < I; s++)
                      for (let d = 0; d < m; d++) {
                        let p = n - S,
                          h = r - v,
                          f = o - G,
                          I = i - O,
                          m = s - N,
                          R = d - P
                        ;(p < 0
                          ? ((p = -p % (2 * a - 2)), p >= a && (p = 2 * a - p - 2))
                          : p >= a && ((p %= 2 * a - 2), p >= a && (p = 2 * a - p - 2)),
                          h < 0
                            ? ((h = -h % (2 * A - 2)), h >= A && (h = 2 * A - h - 2))
                            : h >= A && ((h %= 2 * A - 2), h >= A && (h = 2 * A - h - 2)),
                          f < 0
                            ? ((f = -f % (2 * u - 2)), f >= u && (f = 2 * u - f - 2))
                            : f >= u && ((f %= 2 * u - 2), f >= u && (f = 2 * u - f - 2)),
                          I < 0
                            ? ((I = -I % (2 * l - 2)), I >= l && (I = 2 * l - I - 2))
                            : I >= l && ((I %= 2 * l - 2), I >= l && (I = 2 * l - I - 2)),
                          m < 0
                            ? ((m = -m % (2 * g - 2)), m >= g && (m = 2 * g - m - 2))
                            : m >= g && ((m %= 2 * g - 2), m >= g && (m = 2 * g - m - 2)),
                          R < 0
                            ? ((R = -R % (2 * c - 2)), R >= c && (R = 2 * c - R - 2))
                            : R >= c && ((R %= 2 * c - 2), R >= c && (R = 2 * c - R - 2)))
                        const M = e[p * E + h * y + f * C + I * B + m * _ + R * w]
                        t[n * b + r * Q + o * x + i * T + s * D + d * k] = M
                      }
          }
          edgeCopy1d(e, t, n, r, o, i, s) {
            const [a] = n,
              [A] = r,
              [u] = o,
              [l] = i,
              [g] = s
            for (let n = 0; n < A; n++) {
              let r = n - g
              r < 0 ? (r = 0) : r >= a && (r = a - 1)
              const o = e[r * u]
              t[n * l] = o
            }
          }
          edgeCopy2d(e, t, n, r, o, i, s) {
            const [a, A] = n,
              [u, l] = r,
              [g, c] = o,
              [d, p] = i,
              [h, f] = s
            for (let n = 0; n < u; n++)
              for (let r = 0; r < l; r++) {
                let o = n - h,
                  i = r - f
                ;(o < 0 ? (o = 0) : o >= a && (o = a - 1), i < 0 ? (i = 0) : i >= A && (i = A - 1))
                const s = e[o * g + i * c]
                t[n * d + r * p] = s
              }
          }
          edgeCopy3d(e, t, n, r, o, i, s) {
            const [a, A, u] = n,
              [l, g, c] = r,
              [d, p, h] = o,
              [f, I, m] = i,
              [E, y, C] = s
            for (let n = 0; n < l; n++)
              for (let r = 0; r < g; r++)
                for (let o = 0; o < c; o++) {
                  let i = n - E,
                    s = r - y,
                    l = o - C
                  ;(i < 0 ? (i = 0) : i >= a && (i = a - 1),
                    s < 0 ? (s = 0) : s >= A && (s = A - 1),
                    l < 0 ? (l = 0) : l >= u && (l = u - 1))
                  const g = e[i * d + s * p + l * h]
                  t[n * f + r * I + o * m] = g
                }
          }
          edgeCopy4d(e, t, n, r, o, i, s) {
            const [a, A, u, l] = n,
              [g, c, d, p] = r,
              [h, f, I, m] = o,
              [E, y, C, B] = i,
              [_, w, b, Q] = s
            for (let n = 0; n < g; n++)
              for (let r = 0; r < c; r++)
                for (let o = 0; o < d; o++)
                  for (let i = 0; i < p; i++) {
                    let s = n - _,
                      g = r - w,
                      c = o - b,
                      d = i - Q
                    ;(s < 0 ? (s = 0) : s >= a && (s = a - 1),
                      g < 0 ? (g = 0) : g >= A && (g = A - 1),
                      c < 0 ? (c = 0) : c >= u && (c = u - 1),
                      d < 0 ? (d = 0) : d >= l && (d = l - 1))
                    const p = e[s * h + g * f + c * I + d * m]
                    t[n * E + r * y + o * C + i * B] = p
                  }
          }
          edgeCopy5d(e, t, n, r, o, i, s) {
            const [a, A, u, l, g] = n,
              [c, d, p, h, f] = r,
              [I, m, E, y, C] = o,
              [B, _, w, b, Q] = i,
              [x, T, D, k, S] = s
            for (let n = 0; n < c; n++)
              for (let r = 0; r < d; r++)
                for (let o = 0; o < p; o++)
                  for (let i = 0; i < h; i++)
                    for (let s = 0; s < f; s++) {
                      let c = n - x,
                        d = r - T,
                        p = o - D,
                        h = i - k,
                        f = s - S
                      ;(c < 0 ? (c = 0) : c >= a && (c = a - 1),
                        d < 0 ? (d = 0) : d >= A && (d = A - 1),
                        p < 0 ? (p = 0) : p >= u && (p = u - 1),
                        h < 0 ? (h = 0) : h >= l && (h = l - 1),
                        f < 0 ? (f = 0) : f >= g && (f = g - 1))
                      const v = e[c * I + d * m + p * E + h * y + f * C]
                      t[n * B + r * _ + o * w + i * b + s * Q] = v
                    }
          }
          edgeCopy6d(e, t, n, r, o, i, s) {
            const [a, A, u, l, g, c] = n,
              [d, p, h, f, I, m] = r,
              [E, y, C, B, _, w] = o,
              [b, Q, x, T, D, k] = i,
              [S, v, G, O, N, P] = s
            for (let n = 0; n < d; n++)
              for (let r = 0; r < p; r++)
                for (let o = 0; o < h; o++)
                  for (let i = 0; i < f; i++)
                    for (let s = 0; s < I; s++)
                      for (let d = 0; d < m; d++) {
                        let p = n - S,
                          h = r - v,
                          f = o - G,
                          I = i - O,
                          m = s - N,
                          R = d - P
                        ;(p < 0 ? (p = 0) : p >= a && (p = a - 1),
                          h < 0 ? (h = 0) : h >= A && (h = A - 1),
                          f < 0 ? (f = 0) : f >= u && (f = u - 1),
                          I < 0 ? (I = 0) : I >= l && (I = l - 1),
                          m < 0 ? (m = 0) : m >= g && (m = g - 1),
                          R < 0 ? (R = 0) : R >= c && (R = c - 1))
                        const M = e[p * E + h * y + f * C + I * B + m * _ + R * w]
                        t[n * b + r * Q + o * x + i * T + s * D + d * k] = M
                      }
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Pad', backend: 'cpu', opsetMin: 11, factory: () => new o() }]
        }
      },
      1685: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055),
          i = n(3076),
          s = n(1908)
        class a extends r.OperatorImpl {
          constructor(e, t, n) {
            ;(super('cpu'), (this.opType = e), (this.opNotFinalAxis = t), (this.opFinalAxis = n))
          }
          async runCore(e, t, n) {
            let r,
              o = t.data,
              a = t.dims,
              A = 1
            for (let e = 0; e < n.length; e++) {
              const r = n[e],
                u = a.slice()
              u[r] = 1
              const l = a[r]
              A *= l
              const g = s.arrayProd(a.slice(0, r)),
                c = s.arrayProd(a.slice(r + 1)),
                d = new i.DataArrayConstructor[t.dataType](g * c)
              ;(e < n.length - 1
                ? this.opNotFinalAxis(o, d, g, c, l)
                : this.opFinalAxis
                  ? this.opFinalAxis(o, d, g, c, l, A)
                  : this.opNotFinalAxis(o, d, g, c, l),
                (o = d),
                (a = u))
            }
            return (
              (r = this.keepdims ? a : a.filter((e, t) => !n.includes(t))),
              [e.emptyTensor(r, t.dataType, o)]
            )
          }
        }
        class A extends a {
          initialize(e) {
            ;(super.initialize(e),
              (this.axes = o.getAttrInts(e, 'axes', [])),
              (this.keepdims = 0 !== o.getAttrInt(e, 'keepdims', 1)))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0]
            let r
            if (this.axes.length > 0)
              ((r = this.axes.map((e) => (e >= 0 ? e : n.ndim + e))), r.sort((e, t) => e - t))
            else {
              r = []
              for (let e = 0; e < n.ndim; e++) r.push(e)
            }
            return this.runCore(e, n, r)
          }
        }
        class u extends a {
          initialize(e) {
            ;(super.initialize(e),
              (this.keepdims = 0 !== o.getAttrInt(e, 'keepdims', 1)),
              (this.noopWithEmptyAxes = 0 !== o.getAttrInt(e, 'noop_with_empty_axes', 0)))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1]
            let o
            if (r.length > 0)
              ((o = Array.from(r.data).map((e) => (e >= 0 ? e : n.ndim + e))),
                o.sort((e, t) => e - t))
            else if (((o = []), !this.noopWithEmptyAxes)) for (let e = 0; e < n.ndim; e++) o.push(e)
            return this.runCore(e, n, o)
          }
        }
        t.getOpEntries = function () {
          const e = [],
            t = (t, n, r, o) => {
              ;(e.push({
                opType: t,
                backend: 'cpu',
                opsetMin: 1,
                opsetMax: o ? 13 : void 0,
                factory: () => new A(t, n, r),
              }),
                o &&
                  e.push({
                    opType: t,
                    backend: 'cpu',
                    opsetMin: 13,
                    factory: () => new u(t, n, r),
                  }))
            }
          return (
            t('ReduceL1', (e, t, n, r, o) => {
              for (let i = 0; i < n; i++)
                for (let n = 0; n < r; n++) {
                  let s = 0
                  for (let t = 0; t < o; t++) s += Math.abs(e[(i * o + t) * r + n])
                  t[i * r + n] = s
                }
            }),
            t(
              'ReduceL2',
              (e, t, n, r, o) => {
                for (let i = 0; i < n; i++)
                  for (let n = 0; n < r; n++) {
                    let s = 0
                    for (let t = 0; t < o; t++) {
                      const a = e[(i * o + t) * r + n]
                      s += a * a
                    }
                    t[i * r + n] = s
                  }
              },
              (e, t, n, r, o) => {
                for (let i = 0; i < n; i++)
                  for (let n = 0; n < r; n++) {
                    let s = 0
                    for (let t = 0; t < o; t++) {
                      const a = e[(i * o + t) * r + n]
                      s += a * a
                    }
                    t[i * r + n] = Math.sqrt(s)
                  }
              }
            ),
            t(
              'ReduceLogSum',
              (e, t, n, r, o) => {
                for (let i = 0; i < n; i++)
                  for (let n = 0; n < r; n++) {
                    let s = 0
                    for (let t = 0; t < o; t++) s += e[i * o + t]
                    t[i * r + n] = s
                  }
              },
              (e, t, n, r, o) => {
                for (let i = 0; i < n; i++)
                  for (let n = 0; n < r; n++) {
                    let s = 0
                    for (let t = 0; t < o; t++) s += e[i * o + t]
                    t[i * r + n] = Math.log(s)
                  }
              }
            ),
            t(
              'ReduceLogSumExp',
              (e, t, n, r, o) => {
                for (let i = 0; i < n; i++)
                  for (let n = 0; n < r; n++) {
                    let s = 0
                    for (let t = 0; t < o; t++) s += Math.exp(e[(i * o + t) * r + n])
                    t[i * r + n] = s
                  }
              },
              (e, t, n, r, o) => {
                for (let i = 0; i < n; i++)
                  for (let n = 0; n < r; n++) {
                    let s = 0
                    for (let t = 0; t < o; t++) s += Math.exp(e[(i * o + t) * r + n])
                    t[i * r + n] = Math.log(s)
                  }
              }
            ),
            t('ReduceMax', (e, t, n, r, o) => {
              for (let i = 0; i < n; i++)
                for (let n = 0; n < r; n++) {
                  let s = e[i * o * r + n]
                  for (let t = 1; t < o; t++) {
                    const a = e[(i * o + t) * r + n]
                    a > s && (s = a)
                  }
                  t[i * r + n] = s
                }
            }),
            t(
              'ReduceMean',
              (e, t, n, r, o) => {
                for (let i = 0; i < n; i++)
                  for (let n = 0; n < r; n++) {
                    let s = 0
                    for (let t = 0; t < o; t++) s += e[(i * o + t) * r + n]
                    t[i * r + n] = s
                  }
              },
              (e, t, n, r, o, i) => {
                for (let s = 0; s < n; s++)
                  for (let n = 0; n < r; n++) {
                    let a = 0
                    for (let t = 0; t < o; t++) a += e[(s * o + t) * r + n]
                    t[s * r + n] = a / i
                  }
              }
            ),
            t('ReduceMin', (e, t, n, r, o) => {
              for (let i = 0; i < n; i++)
                for (let n = 0; n < r; n++) {
                  let s = e[i * o * r + n]
                  for (let t = 1; t < o; t++) {
                    const a = e[(i * o + t) * r + n]
                    a < s && (s = a)
                  }
                  t[i * r + n] = s
                }
            }),
            t('ReduceProd', (e, t, n, r, o) => {
              for (let i = 0; i < n; i++)
                for (let n = 0; n < r; n++) {
                  let s = 1
                  for (let t = 0; t < o; t++) s *= e[(i * o + t) * r + n]
                  t[i * r + n] = s
                }
            }),
            t(
              'ReduceSum',
              (e, t, n, r, o) => {
                for (let i = 0; i < n; i++)
                  for (let n = 0; n < r; n++) {
                    let s = 0
                    for (let t = 0; t < o; t++) s += e[(i * o + t) * r + n]
                    t[i * r + n] = s
                  }
              },
              void 0,
              !0
            ),
            t('ReduceSumSquare', (e, t, n, r, o) => {
              for (let i = 0; i < n; i++)
                for (let n = 0; n < r; n++) {
                  let s = 0
                  for (let t = 0; t < o; t++) {
                    const a = e[(i * o + t) * r + n]
                    s += a * a
                  }
                  t[i * r + n] = s
                }
            }),
            e
          )
        }
      },
      8146: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(4574)
        class o extends r.Reshape5 {
          constructor() {
            super('cpu')
          }
          getTensorBackendRequirement(e, t) {
            return ['cpu', 'cpu']
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1],
              o = this.calcShape(n, r)
            return [e.emptyTensor(o, n.dataType, n.data)]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Reshape', backend: 'cpu', opsetMin: 5, factory: () => new o() }]
        }
      },
      8197: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381)
        class o extends r.OperatorImpl {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            const n = t[0],
              r = new Int32Array(n.dims)
            return [e.emptyTensor([r.length], 'int32', r)]
          }
          getTensorBackendRequirement(e, t) {
            return [null]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Shape', backend: 'cpu', opsetMin: 1, factory: () => new o() }]
        }
      },
      2077: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381)
        class o extends r.OperatorImpl {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1],
              o = t[2],
              i = t[3]
            let s,
              a = t[4]
            if (i) {
              s = Array.from(i.data)
              for (let e = 0; e < s.length; e++) s[e] < 0 && (s[e] += n.ndim)
            } else {
              s = []
              for (let e = 0; e < n.ndim; e++) s.push(e)
            }
            a || ((a = e.emptyTensor([s.length], 'int32')), a.data.fill(1))
            const A = n.dims.map((e) => [0, e, 1, e])
            for (let e = 0; e < s.length; e++)
              A[s[e]] = [r.data[e], o.data[e], a.data[e], n.dims[s[e]]]
            const u = A.map(
                ([e, t, n, r]) => (
                  e < 0 && (e += r),
                  t < 0 && (t += r),
                  [
                    (e = Math.max(Math.min(e, r - 1), 0)),
                    (t = Math.max(Math.min(t, r), -1)),
                    n,
                    r,
                    Math.max(Math.ceil((t - e) / n), 0),
                  ]
                )
              ),
              l = e.emptyTensor(
                u.map(([, , , , e]) => e),
                n.dataType
              )
            let g
            switch (n.ndim) {
              case 1:
                g = this.copy1d
                break
              case 2:
                g = this.copy2d
                break
              case 3:
                g = this.copy3d
                break
              case 4:
                g = this.copy4d
                break
              case 5:
                g = this.copy5d
                break
              case 6:
                g = this.copy6d
                break
              default:
                throw new Error(`Slice: input dimension ${n.ndim} > 6 is not yet supported`)
            }
            return (g(n.data, l.data, u, n.strides, l.strides), [l])
          }
          copy1d(e, t, n, r, o) {
            for (let i = 0; i < n[0][4]; i++) t[i * o[0]] = e[(n[0][0] + i * n[0][2]) * r[0]]
          }
          copy2d(e, t, n, r, o) {
            for (let i = 0; i < n[0][4]; i++)
              for (let s = 0; s < n[1][4]; s++)
                t[i * o[0] + s * o[1]] =
                  e[(n[0][0] + i * n[0][2]) * r[0] + (n[1][0] + s * n[1][2]) * r[1]]
          }
          copy3d(e, t, n, r, o) {
            for (let i = 0; i < n[0][4]; i++)
              for (let s = 0; s < n[1][4]; s++)
                for (let a = 0; a < n[2][4]; a++)
                  t[i * o[0] + s * o[1] + a * o[2]] =
                    e[
                      (n[0][0] + i * n[0][2]) * r[0] +
                        (n[1][0] + s * n[1][2]) * r[1] +
                        (n[2][0] + a * n[2][2]) * r[2]
                    ]
          }
          copy4d(e, t, n, r, o) {
            for (let i = 0; i < n[0][4]; i++)
              for (let s = 0; s < n[1][4]; s++)
                for (let a = 0; a < n[2][4]; a++)
                  for (let A = 0; A < n[3][4]; A++)
                    t[i * o[0] + s * o[1] + a * o[2] + A * o[3]] =
                      e[
                        (n[0][0] + i * n[0][2]) * r[0] +
                          (n[1][0] + s * n[1][2]) * r[1] +
                          (n[2][0] + a * n[2][2]) * r[2] +
                          (n[3][0] + A * n[3][2]) * r[3]
                      ]
          }
          copy5d(e, t, n, r, o) {
            for (let i = 0; i < n[0][4]; i++)
              for (let s = 0; s < n[1][4]; s++)
                for (let a = 0; a < n[2][4]; a++)
                  for (let A = 0; A < n[3][4]; A++)
                    for (let u = 0; u < n[4][4]; u++)
                      t[i * o[0] + s * o[1] + a * o[2] + A * o[3] + u * o[4]] =
                        e[
                          (n[0][0] + i * n[0][2]) * r[0] +
                            (n[1][0] + s * n[1][2]) * r[1] +
                            (n[2][0] + a * n[2][2]) * r[2] +
                            (n[3][0] + A * n[3][2]) * r[3] +
                            (n[4][0] + u * n[4][2]) * r[4]
                        ]
          }
          copy6d(e, t, n, r, o) {
            for (let i = 0; i < n[0][4]; i++)
              for (let s = 0; s < n[1][4]; s++)
                for (let a = 0; a < n[2][4]; a++)
                  for (let A = 0; A < n[3][4]; A++)
                    for (let u = 0; u < n[4][4]; u++)
                      for (let l = 0; l < n[5][4]; l++)
                        t[i * o[0] + s * o[1] + a * o[2] + A * o[3] + u * o[4] + l * o[5]] =
                          e[
                            (n[0][0] + i * n[0][2]) * r[0] +
                              (n[1][0] + s * n[1][2]) * r[1] +
                              (n[2][0] + a * n[2][2]) * r[2] +
                              (n[3][0] + A * n[3][2]) * r[3] +
                              (n[4][0] + u * n[4][2]) * r[4] +
                              (n[5][0] + l * n[5][2]) * r[5]
                          ]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Slice', backend: 'cpu', opsetMin: 10, factory: () => new o() }]
        }
      },
      4761: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor() {
            super('cpu')
          }
          initialize(e) {
            ;(super.initialize(e), (this.axis = o.getAttrInt(e, 'axis', -1)))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0]
            let { axis: r } = this
            if ((r < 0 && (r += n.ndim), r !== n.ndim - 1))
              throw new Error('Softmax: currently only reducing final axis is supported')
            const o = n.dims[r],
              i = n.length / o,
              s = e.emptyTensor(n.dims, n.dataType),
              a = n.data,
              A = s.data
            for (let e = 0; e < i; e++) {
              let t = -1 / 0
              for (let n = 0; n < o; n++) {
                const r = a[e * o + n]
                r > t && (t = r)
              }
              let n = 0
              for (let r = 0; r < o; r++) {
                const i = a[e * o + r],
                  s = Math.exp(i - t)
                ;((A[e * o + r] = s), (n += s))
              }
              for (let t = 0; t < o; t++) A[e * o + t] /= n
            }
            return [s]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Softmax', backend: 'cpu', opsetMin: 1, factory: () => new i() }]
        }
      },
      4800: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(5489)
        class o extends r.Split2 {
          constructor() {
            super('cpu')
          }
          async run(e, t, n) {
            e.assertsCPUTensorArray(t)
            const r = t[0],
              {
                eachOutputParams: o,
                outerLength: i,
                innerLength: s,
                inOuterStride: a,
                inConcatStride: A,
              } = this.calcShape(r, n),
              u = []
            for (let t = 0; t < n; t++) {
              const { dim: n, offset: l, outShape: g, outerStride: c, splitStride: d } = o[t],
                p = e.emptyTensor(g, r.dataType)
              for (let e = 0; e < n; e++)
                for (let t = 0; t < i; t++)
                  for (let n = 0; n < s; n++)
                    p.data[e * d + t * c + n] = r.data[(e + l) * A + t * a + n]
              u.push(p)
            }
            return u
          }
        }
        class i extends r.Split13 {
          constructor() {
            super('cpu')
          }
          async run(e, t, n) {
            e.assertsCPUTensorArray(t)
            const r = t[0],
              o = t[1],
              {
                eachOutputParams: i,
                outerLength: s,
                innerLength: a,
                inOuterStride: A,
                inConcatStride: u,
              } = this.calcShape(r, n, o),
              l = []
            for (let t = 0; t < n; t++) {
              const { dim: n, offset: o, outShape: g, outerStride: c, splitStride: d } = i[t],
                p = e.emptyTensor(g, r.dataType)
              for (let e = 0; e < n; e++)
                for (let t = 0; t < s; t++)
                  for (let n = 0; n < a; n++)
                    p.data[e * d + t * c + n] = r.data[(e + o) * u + t * A + n]
              l.push(p)
            }
            return l
          }
        }
        t.getOpEntries = function () {
          return [
            { opType: 'Split', backend: 'cpu', opsetMin: 13, factory: () => new i() },
            { opType: 'Split', backend: 'cpu', opsetMin: 1, opsetMax: 13, factory: () => new o() },
          ]
        }
      },
      652: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.CPUSqueeze13 = t.CPUSqueeze1 = void 0))
        const r = n(2633)
        class o extends r.Squeeze1 {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = this.calcShape(n)
            return [e.emptyTensor(r, n.dataType, n.data)]
          }
        }
        t.CPUSqueeze1 = o
        class i extends r.Squeeze13 {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1],
              o = this.calcShape(n, r)
            return [e.emptyTensor(o, n.dataType, n.data)]
          }
        }
        ;((t.CPUSqueeze13 = i),
          (t.getOpEntries = function () {
            return [
              { opType: 'Squeeze', backend: 'cpu', opsetMin: 13, factory: () => new i() },
              {
                opType: 'Squeeze',
                backend: 'cpu',
                opsetMin: 1,
                opsetMax: 13,
                factory: () => new o(),
              },
            ]
          }))
      },
      8591: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381)
        class o extends r.OperatorImpl {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1],
              o = []
            for (let e = 0; e < n.ndim; e++) o.push(n.dims[e] * r.data[e])
            const i = e.emptyTensor(o, n.dataType)
            if (1 === n.ndim) this.copy1d(n.data, i.data, n.dims, o, n.strides, i.strides)
            else if (2 === n.ndim) this.copy2d(n.data, i.data, n.dims, o, n.strides, i.strides)
            else if (3 === n.ndim) this.copy3d(n.data, i.data, n.dims, o, n.strides, i.strides)
            else {
              if (4 !== n.ndim)
                throw new Error(`Tile: input.ndim = ${n.ndim} > 4 is not yet supported`)
              this.copy4d(n.data, i.data, n.dims, o, n.strides, i.strides)
            }
            return [i]
          }
          copy1d(e, t, n, r, o, i) {
            for (let s = 0; s < r[0]; s++) t[s * i[0]] = e[(s % n[0]) * o[0]]
          }
          copy2d(e, t, n, r, o, i) {
            for (let s = 0; s < r[0]; s++)
              for (let a = 0; a < r[1]; a++)
                t[s * i[0] + a * i[1]] = e[(s % n[0]) * o[0] + (a % n[1]) * o[1]]
          }
          copy3d(e, t, n, r, o, i) {
            for (let s = 0; s < r[0]; s++)
              for (let a = 0; a < r[1]; a++)
                for (let A = 0; A < r[2]; A++)
                  t[s * i[0] + a * i[1] + A * i[2]] =
                    e[(s % n[0]) * o[0] + (a % n[1]) * o[1] + (A % n[2]) * o[2]]
          }
          copy4d(e, t, n, r, o, i) {
            for (let s = 0; s < r[0]; s++)
              for (let a = 0; a < r[1]; a++)
                for (let A = 0; A < r[2]; A++)
                  for (let u = 0; u < r[3]; u++)
                    t[s * i[0] + a * i[1] + A * i[2] + u * i[3]] =
                      e[
                        (s % n[0]) * o[0] +
                          (a % n[1]) * o[1] +
                          (A % n[2]) * o[2] +
                          (u % n[3]) * o[3]
                      ]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Tile', backend: 'cpu', opsetMin: 6, factory: () => new o() }]
        }
      },
      7021: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(187)
        class o extends r.Transpose {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              { outShape: r, inStrides: o } = this.calcShape(n),
              i = e.emptyTensor(r, n.dataType)
            let s
            switch (n.ndim) {
              case 1:
                s = this.copy1d
                break
              case 2:
                s = this.copy2d
                break
              case 3:
                s = this.copy3d
                break
              case 4:
                s = this.copy4d
                break
              case 5:
                s = this.copy5d
                break
              case 6:
                s = this.copy6d
                break
              default:
                throw new Error(`Transpose: ndim ${n.ndim} > 4 is not yet supported`)
            }
            return (s(n.data, i.data, r, o), [i])
          }
          copy1d(e, t, n, r) {
            let o = 0
            for (let i = 0; i < n[0]; i++) t[o++] = e[i * r[0]]
          }
          copy2d(e, t, n, r) {
            let o = 0
            for (let i = 0; i < n[0]; i++)
              for (let s = 0; s < n[1]; s++) t[o++] = e[i * r[0] + s * r[1]]
          }
          copy3d(e, t, n, r) {
            let o = 0
            for (let i = 0; i < n[0]; i++)
              for (let s = 0; s < n[1]; s++)
                for (let a = 0; a < n[2]; a++) t[o++] = e[i * r[0] + s * r[1] + a * r[2]]
          }
          copy4d(e, t, n, r) {
            let o = 0
            for (let i = 0; i < n[0]; i++)
              for (let s = 0; s < n[1]; s++)
                for (let a = 0; a < n[2]; a++)
                  for (let A = 0; A < n[3]; A++)
                    t[o++] = e[i * r[0] + s * r[1] + a * r[2] + A * r[3]]
          }
          copy5d(e, t, n, r) {
            let o = 0
            for (let i = 0; i < n[0]; i++)
              for (let s = 0; s < n[1]; s++)
                for (let a = 0; a < n[2]; a++)
                  for (let A = 0; A < n[3]; A++)
                    for (let u = 0; u < n[4]; u++)
                      t[o++] = e[i * r[0] + s * r[1] + a * r[2] + A * r[3] + u * r[4]]
          }
          copy6d(e, t, n, r) {
            let o = 0
            for (let i = 0; i < n[0]; i++)
              for (let s = 0; s < n[1]; s++)
                for (let a = 0; a < n[2]; a++)
                  for (let A = 0; A < n[3]; A++)
                    for (let u = 0; u < n[4]; u++)
                      for (let l = 0; l < n[5]; l++)
                        t[o++] = e[i * r[0] + s * r[1] + a * r[2] + A * r[3] + u * r[4] + l * r[5]]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Transpose', backend: 'cpu', opsetMin: 1, factory: () => new o() }]
        }
      },
      7249: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3076),
          o = n(3381)
        class i extends o.OperatorImpl {
          constructor(e, t) {
            ;(super('cpu'), (this.op = e), (this.allowDataTypes = t))
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0]
            if (!this.allowDataTypes.includes(n.dataType))
              throw new Error(`Unary: DataType ${n.dataType} not supported`)
            const o = new r.DataArrayConstructor[n.dataType](n.data.length),
              { op: i } = this
            for (let e = 0; e < o.length; e++) o[e] = i(n.data[e])
            return [e.emptyTensor(n.dims, n.dataType, o)]
          }
        }
        t.getOpEntries = function () {
          return [
            {
              opType: 'Abs',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.abs(e), ['float32', 'int32']),
            },
            {
              opType: 'Acos',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.acos(e), ['float32']),
            },
            {
              opType: 'Acosh',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.acosh(e), ['float32']),
            },
            {
              opType: 'Asin',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.asin(e), ['float32']),
            },
            {
              opType: 'Asinh',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.asinh(e), ['float32']),
            },
            {
              opType: 'Atan',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.atan(e), ['float32']),
            },
            {
              opType: 'Atanh',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.atanh(e), ['float32']),
            },
            {
              opType: 'Ceil',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.ceil(e), ['float32']),
            },
            {
              opType: 'Cos',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.cos(e), ['float32']),
            },
            {
              opType: 'Cosh',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.cosh(e), ['float32']),
            },
            {
              opType: 'Exp',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.exp(e), ['float32']),
            },
            {
              opType: 'Floor',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.floor(e), ['float32']),
            },
            {
              opType: 'HardSwish',
              backend: 'cpu',
              opsetMin: 1,
              factory: () =>
                new i((e) => (e <= -3 ? 0 : e >= 3 ? e : (e * (e + 3)) / 6), ['float32']),
            },
            {
              opType: 'Log',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.log(e), ['float32']),
            },
            {
              opType: 'Neg',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => -e, ['float32', 'int32']),
            },
            {
              opType: 'Reciprocal',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => 1 / e, ['float32']),
            },
            {
              opType: 'Relu',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.max(e, 0), ['float32', 'int32']),
            },
            {
              opType: 'Round',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.round(e), ['float32']),
            },
            {
              opType: 'Sigmoid',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => (Math.tanh(e / 2) + 1) / 2, ['float32']),
            },
            {
              opType: 'Sign',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.sign(e), ['float32', 'int32']),
            },
            {
              opType: 'Sin',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.sin(e), ['float32']),
            },
            {
              opType: 'Softplus',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.log(Math.exp(e) + 1), ['float32']),
            },
            {
              opType: 'Softsign',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => e / (1 + Math.abs(e)), ['float32']),
            },
            {
              opType: 'Sqrt',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.sqrt(e), ['float32']),
            },
            {
              opType: 'Tan',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.tan(e), ['float32']),
            },
            {
              opType: 'Tanh',
              backend: 'cpu',
              opsetMin: 1,
              factory: () => new i((e) => Math.tanh(e), ['float32']),
            },
          ]
        }
      },
      5967: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.CPUUnsqueeze13 = t.CPUUnsqueeze1 = void 0))
        const r = n(784)
        class o extends r.Unsqueeze1 {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = this.calcShape(n)
            return [e.emptyTensor(r, n.dataType, n.data)]
          }
        }
        t.CPUUnsqueeze1 = o
        class i extends r.Unsqueeze13 {
          constructor() {
            super('cpu')
          }
          async run(e, t) {
            e.assertsCPUTensorArray(t)
            const n = t[0],
              r = t[1],
              o = this.calcShape(n, r)
            return [e.emptyTensor(o, n.dataType, n.data)]
          }
        }
        ;((t.CPUUnsqueeze13 = i),
          (t.getOpEntries = function () {
            return [
              { opType: 'Unsqueeze', backend: 'cpu', opsetMin: 13, factory: () => new i() },
              {
                opType: 'Unsqueeze',
                backend: 'cpu',
                opsetMin: 1,
                opsetMax: 13,
                factory: () => new o(),
              },
            ]
          }))
      },
      9747: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.averagepool = void 0),
          (t.averagepool = function (e, t, n, r, o, i, s, a, A, u) {
            let l = 0
            for (let g = 0; g < r; g++)
              for (let r = 0; r < u; r++)
                for (let c = 0; c < A[0]; c++)
                  for (let d = 0; d < A[1]; d++) {
                    let A = 0,
                      p = 0
                    for (let t = 0; t < o[0]; t++)
                      for (let n = 0; n < o[1]; n++) {
                        const o = c * s[0] - i[0] + t,
                          l = d * s[1] - i[1] + n
                        o >= 0 &&
                          o < a[0] &&
                          l >= 0 &&
                          l < a[1] &&
                          ((p += e[((g * u + r) * a[0] + o) * a[1] + l]), A++)
                      }
                    t[l++] = n ? p / (o[0] * o[1]) : p / A
                  }
          }))
      },
      3381: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.OperatorImpl = void 0),
          (t.OperatorImpl = class {
            constructor(e) {
              this.backend = e
            }
            initialize(e) {}
            getTensorBackendRequirement(e, t) {
              const n = []
              for (let t = 0; t < e; t++) n.push(this.backend)
              return n
            }
          }))
      },
      2055: function (e, t, n) {
        'use strict'
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.broadcastMulti =
            t.broadcastUni =
            t.calcStrides =
            t.arrayEqual =
            t.arrayProd =
            t.arraySum =
            t.getAttrString =
            t.getAttrTensor =
            t.getAttrInts =
            t.getAttrInt =
            t.getAttrFloat =
              void 0))
        const o = r(n(3720)),
          i = n(1446),
          s = n(1908)
        function a(e, t) {
          for (const n of e) if (n.name === t) return n
          return null
        }
        function A(e) {
          const t = []
          let n = 1
          for (let r = e.length - 1; r >= 0; r--) (t.unshift(n), (n *= e[r]))
          return t
        }
        ;((t.getAttrFloat = function (e, t, n) {
          const r = a(e, t)
          if (!r) return n
          const o = r.f
          if (null == o) throw new Error(`Attribute ${t} is not float`)
          return o
        }),
          (t.getAttrInt = function (e, t, n) {
            const r = a(e, t)
            if (!r) return n
            const o = r.i
            if (null == o) throw new Error(`Attribute ${t} is not int`)
            return s.intOrLongToInt(o)
          }),
          (t.getAttrInts = function (e, t, n) {
            const r = a(e, t)
            if (!r) return n
            const o = r.ints
            if (null == o) throw new Error(`Attribute ${t} is not int`)
            return s.intOrLongToIntVector(o)
          }),
          (t.getAttrTensor = function (e, t) {
            const n = a(e, t)
            if (!n) return null
            const r = n.t
            if (null == r) throw new Error(`Attribute ${t} is not int`)
            const A = s.intOrLongToIntVector(r.dims),
              { rawData: u } = r
            if (!u) throw new Error('rawData in TensorProto is empty')
            switch (r.dataType) {
              case i.onnx.TensorProto.DataType.FLOAT: {
                const e = new Uint8Array(u.length)
                return (
                  e.set(u),
                  {
                    dims: A,
                    dataType: 'float32',
                    data: new Float32Array(e.buffer, 0, e.length / Float32Array.BYTES_PER_ELEMENT),
                  }
                )
              }
              case i.onnx.TensorProto.DataType.INT64: {
                const e = new DataView(u.buffer, u.byteOffset, u.byteLength),
                  t = new Int32Array(e.byteLength / 8)
                for (let n = 0; n < t.length; n++)
                  t[n] = s.clipLong(
                    new o.default(e.getUint32(8 * n, !0), e.getUint32(8 * n + 4, !0))
                  )
                return { dims: A, dataType: 'int32', data: t }
              }
              default:
                throw new Error(`dataType ${r.dataType} of TensorProto is not supported`)
            }
          }),
          (t.getAttrString = function (e, t, n) {
            const r = a(e, t)
            if (!r) return n
            const o = r.s
            if (null == o) throw new Error(`Attribute ${t} is not string`)
            return String.fromCharCode(...Array.from(o))
          }),
          (t.arraySum = function (e) {
            let t = 0
            for (let n = 0; n < e.length; n++) t += e[n]
            return t
          }),
          (t.arrayProd = function (e) {
            let t = 1
            for (let n = 0; n < e.length; n++) t *= e[n]
            return t
          }),
          (t.arrayEqual = function (e, t) {
            if (e.length !== t.length) return !1
            for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1
            return !0
          }),
          (t.calcStrides = A),
          (t.broadcastUni = function (e, t) {
            if (e.length < t.length) throw new Error(`Unidirectional broadcast error: ${e}, ${t}`)
            const n = t.slice()
            for (; n.length < e.length; ) n.unshift(1)
            const r = A(n)
            for (let o = 0; o < e.length; o++)
              if (e[o] !== n[o]) {
                if (1 !== n[o]) throw new Error(`Unidirectional broadcast error: ${e}, ${t}`)
                r[o] = 0
              }
            return r
          }),
          (t.broadcastMulti = function (e) {
            const t = Math.max(...e.map((e) => e.length)),
              n = e.map((e) => {
                const n = e.slice()
                for (; n.length < t; ) n.unshift(1)
                return n
              }),
              r = []
            for (let e = 0; e < t; e++) r.push(Math.max(...n.map((t) => t[e])))
            const o = n.map((n) => {
              const o = A(n)
              for (let i = 0; i < t; i++)
                if (n[i] !== r[i]) {
                  if (1 !== n[i]) throw new Error(`Multidirectional broadcasting error: ${e}`)
                  o[i] = 0
                }
              return o
            })
            return { dims: r, allStrides: o }
          }))
      },
      5486: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(4005),
          o = n(8874),
          i = n(5769),
          s = n(7820),
          a = n(8251),
          A = n(4868),
          u = n(9775),
          l = n(1296)
        t.getOpEntries = function () {
          const e = []
          return (
            e.push(...r.getOpEntries()),
            e.push(...o.getOpEntries()),
            e.push(...i.getOpEntries()),
            e.push(...s.getOpEntries()),
            e.push(...a.getOpEntries()),
            e.push(...A.getOpEntries()),
            e.push(...u.getOpEntries()),
            e.push(...l.getOpEntries()),
            e
          )
        }
      },
      4005: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor(e) {
            ;(super('wasm'), (this.kernelName = e))
          }
          async run(e, t) {
            e.assertsWasmTensorArray(t)
            const n = t[0],
              r = t[1]
            if ('float32' !== n.dataType || 'float32' !== r.dataType)
              throw new Error('Only float32 is supported')
            const { dims: i, allStrides: s } = o.broadcastMulti([n.dims, r.dims]),
              a = e.emptyTensor(i, n.dataType),
              A = [
                { type: 'tensor', value: n },
                { type: 'tensor', value: r },
                { type: 'tensor', value: a },
                ...i.map((e) => ({ type: 'int32', value: e })),
                ...s[0].map((e) => ({ type: 'int32', value: e })),
                ...s[1].map((e) => ({ type: 'int32', value: e })),
              ]
            return (e.runKernel(`kernel_${this.kernelName}_d${i.length}`, A), [a])
          }
        }
        t.getOpEntries = function () {
          return [
            { opType: 'Add', backend: 'wasm', opsetMin: 7, factory: () => new i('add') },
            { opType: 'Sub', backend: 'wasm', opsetMin: 7, factory: () => new i('sub') },
            { opType: 'Mul', backend: 'wasm', opsetMin: 7, factory: () => new i('mul') },
            { opType: 'Div', backend: 'wasm', opsetMin: 7, factory: () => new i('div') },
            { opType: 'Pow', backend: 'wasm', opsetMin: 7, factory: () => new i('pow') },
          ]
        }
      },
      8874: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055)
        class i extends r.OperatorImpl {
          constructor(e) {
            ;(super('wasm'), (this.kernelName = e))
          }
          async run(e, t) {
            e.assertsWasmTensorArray(t)
            const n = t[0]
            if ('float32' !== n.dataType) throw new Error('Only float32 is supported')
            const r = e.emptyTensor(n.dims, n.dataType)
            return (
              e.runKernel(this.kernelName, [
                { type: 'tensor', value: n },
                { type: 'tensor', value: r },
                { type: 'int32', value: n.length },
                ...this.getKernelArgs(),
              ]),
              [r]
            )
          }
        }
        class s extends i {
          initialize(e) {
            ;(super.initialize(e), (this.alpha = o.getAttrFloat(e, 'alpha', 0.01)))
          }
          getKernelArgs() {
            return [{ type: 'float32', value: this.alpha }]
          }
        }
        t.getOpEntries = function () {
          return [
            {
              opType: 'LeakyRelu',
              backend: 'wasm',
              opsetMin: 1,
              factory: () => new s('kernel_leakyrelu'),
            },
          ]
        }
      },
      5769: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(5543)
        class o extends r.Flatten {
          constructor() {
            super('wasm')
          }
          async run(e, t) {
            const n = t[0]
            e.assertsWasmTensor(n)
            const r = this.calcShape(n),
              o = e.emptyTensor(r, n.dataType)
            return (
              e.runKernel('kernel_copy', [
                { type: 'tensor', value: n },
                { type: 'tensor', value: o },
                { type: 'int32', value: o.length },
              ]),
              [o]
            )
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Flatten', backend: 'wasm', opsetMin: 1, factory: () => new o() }]
        }
      },
      7820: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(5620)
        class o extends r.Gemm {
          constructor() {
            super('wasm')
          }
          async run(e, t) {
            e.assertsWasmTensorArray(t)
            const [n, r, o] = t,
              { m: i, n: s, k: a } = this.calcShape(n.dims, r.dims),
              A = e.emptyTensor([i, s])
            if (1 !== this.alpha) throw new Error('Gemm: alpha !== 1.0 is not yet supported')
            if (o) {
              if (1 !== this.beta) throw new Error('Gemm: beta !== 1.0 is not yet supported')
              e.runKernel(
                `kernel_gemm_transa${this.transA ? '1' : '0'}_transb${this.transB ? '1' : '0'}_c`,
                [
                  { type: 'tensor', value: n },
                  { type: 'tensor', value: r },
                  { type: 'tensor', value: o },
                  { type: 'tensor', value: A },
                  { type: 'int32', value: i },
                  { type: 'int32', value: s },
                  { type: 'int32', value: a },
                ]
              )
            } else
              e.runKernel(
                `kernel_gemm_transa${this.transA ? '1' : '0'}_transb${this.transB ? '1' : '0'}`,
                [
                  { type: 'tensor', value: n },
                  { type: 'tensor', value: r },
                  { type: 'tensor', value: A },
                  { type: 'int32', value: i },
                  { type: 'int32', value: s },
                  { type: 'int32', value: a },
                ]
              )
            return [A]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Gemm', backend: 'wasm', opsetMin: 1, factory: () => new o() }]
        }
      },
      8251: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(4574)
        class o extends r.Reshape5 {
          constructor() {
            super('wasm')
          }
          getTensorBackendRequirement(e, t) {
            return ['wasm', 'cpu']
          }
          async run(e, t) {
            const n = t[0],
              r = t[1]
            ;(e.assertsWasmTensor(n), e.cpuContext.assertsCPUTensor(r))
            const o = this.calcShape(n, r),
              i = e.emptyTensor(o, n.dataType)
            return (
              e.runKernel('kernel_copy', [
                { type: 'tensor', value: n },
                { type: 'tensor', value: i },
                { type: 'int32', value: i.length },
              ]),
              [i]
            )
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Reshape', backend: 'wasm', opsetMin: 5, factory: () => new o() }]
        }
      },
      4868: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(2633)
        class o extends r.Squeeze1 {
          constructor() {
            super('wasm')
          }
          async run(e, t) {
            const n = t[0]
            e.assertsWasmTensor(n)
            const r = this.calcShape(n),
              o = e.emptyTensor(r, n.dataType)
            return (
              e.runKernel('kernel_copy', [
                { type: 'tensor', value: n },
                { type: 'tensor', value: o },
                { type: 'int32', value: o.length },
              ]),
              [o]
            )
          }
        }
        class i extends r.Squeeze13 {
          constructor() {
            super('wasm')
          }
          getTensorBackendRequirement(e, t) {
            return ['wasm', 'cpu']
          }
          async run(e, t) {
            const n = t[0],
              r = t[1]
            ;(e.assertsWasmTensor(n), e.cpuContext.assertsCPUTensor(r))
            const o = this.calcShape(n, r),
              i = e.emptyTensor(o, n.dataType)
            return (
              e.runKernel('kernel_copy', [
                { type: 'tensor', value: n },
                { type: 'tensor', value: i },
                { type: 'int32', value: i.length },
              ]),
              [i]
            )
          }
        }
        t.getOpEntries = function () {
          return [
            { opType: 'Squeeze', backend: 'wasm', opsetMin: 13, factory: () => new i() },
            {
              opType: 'Squeeze',
              backend: 'wasm',
              opsetMin: 1,
              opsetMax: 13,
              factory: () => new o(),
            },
          ]
        }
      },
      9775: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381)
        class o extends r.OperatorImpl {
          constructor(e) {
            ;(super('wasm'), (this.kernelName = e))
          }
          async run(e, t) {
            e.assertsWasmTensorArray(t)
            const n = t[0]
            if ('float32' !== n.dataType) throw new Error('Only float32 is supported')
            const r = e.emptyTensor(n.dims, n.dataType)
            return (
              e.runKernel(this.kernelName, [
                { type: 'tensor', value: n },
                { type: 'tensor', value: r },
                { type: 'int32', value: n.length },
              ]),
              [r]
            )
          }
        }
        t.getOpEntries = function () {
          return [
            { opType: 'Ceil', backend: 'wasm', opsetMin: 1, factory: () => new o('kernel_ceil') },
            { opType: 'Exp', backend: 'wasm', opsetMin: 1, factory: () => new o('kernel_exp') },
            { opType: 'Floor', backend: 'wasm', opsetMin: 1, factory: () => new o('kernel_floor') },
            { opType: 'Relu', backend: 'wasm', opsetMin: 1, factory: () => new o('kernel_relu') },
            {
              opType: 'Sigmoid',
              backend: 'wasm',
              opsetMin: 1,
              factory: () => new o('kernel_sigmoid'),
            },
            { opType: 'Sqrt', backend: 'wasm', opsetMin: 1, factory: () => new o('kernel_sqrt') },
            { opType: 'Tanh', backend: 'wasm', opsetMin: 1, factory: () => new o('kernel_tanh') },
          ]
        }
      },
      1296: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(784)
        class o extends r.Unsqueeze1 {
          constructor() {
            super('wasm')
          }
          async run(e, t) {
            const n = t[0]
            e.assertsWasmTensor(n)
            const r = this.calcShape(n),
              o = e.emptyTensor(r, n.dataType)
            return (
              e.runKernel('kernel_copy', [
                { type: 'tensor', value: n },
                { type: 'tensor', value: o },
                { type: 'int32', value: o.length },
              ]),
              [o]
            )
          }
        }
        class i extends r.Unsqueeze13 {
          constructor() {
            super('wasm')
          }
          getTensorBackendRequirement(e, t) {
            return ['wasm', 'cpu']
          }
          async run(e, t) {
            const n = t[0],
              r = t[1]
            ;(e.assertsWasmTensor(n), e.cpuContext.assertsCPUTensor(r))
            const o = this.calcShape(n, r),
              i = e.emptyTensor(o, n.dataType)
            return (
              e.runKernel('kernel_copy', [
                { type: 'tensor', value: n },
                { type: 'tensor', value: i },
                { type: 'int32', value: i.length },
              ]),
              [i]
            )
          }
        }
        t.getOpEntries = function () {
          return [
            { opType: 'Unsqueeze', backend: 'wasm', opsetMin: 13, factory: () => new i() },
            {
              opType: 'Unsqueeze',
              backend: 'wasm',
              opsetMin: 1,
              opsetMax: 13,
              factory: () => new o(),
            },
          ]
        }
      },
      9261: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.wasmWorkerSrcUrl = void 0),
          (t.wasmWorkerSrcUrl = URL.createObjectURL(
            new File(
              [
                'var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=!!globalThis.window;var ENVIRONMENT_IS_WORKER=!!globalThis.WorkerGlobalScope;var ENVIRONMENT_IS_NODE=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer";(function(){var buffers={};onmessage=function(event){switch(event.data.type){case"alloc":var result=Module._webdnn_malloc(event.data.byteLength);if(result===0){postMessage({type:"error",message:"Memory alloc failed"})}else{buffers[event.data.bufferId]={byteLength:event.data.byteLength,ptr:result}}break;case"destroy":var buffer=buffers[event.data.bufferId];if(buffer){Module._webdnn_free(buffer.ptr);delete buffers[event.data.bufferId]}else{postMessage({type:"error",message:"Destroying non-existing buffer"})}break;case"write":var buffer=buffers[event.data.bufferId];if(buffer){var dataBufView=new Uint8Array(Module.HEAPU8.buffer,buffer.ptr,buffer.byteLength);dataBufView.set(event.data.data)}else{postMessage({type:"error",message:"Writing non-existing buffer"})}break;case"read":var buffer=buffers[event.data.bufferId];if(buffer){var dataBufView=new Uint8Array(Module.HEAPU8.buffer,buffer.ptr,buffer.byteLength);var result=new Uint8Array(buffer.byteLength);result.set(dataBufView);postMessage({type:"read",data:result})}else{postMessage({type:"error",message:"Reading non-existing buffer"})}break;case"runKernel":var kernelFunction=Module["_"+event.data.name];if(kernelFunction){var args=[];var ok=true;for(var i=0;i<event.data.args.length;i++){var arg=event.data.args[i];if(arg.type==="tensor"){var buffer=buffers[arg.bufferId];if(!buffer){ok=false;postMessage({type:"error",message:"Tensor argument of kernel call does not exist"})}args.push(buffer.ptr)}else{args.push(arg.value)}}if(ok){kernelFunction.apply(null,args)}}else{postMessage({type:"error",message:"Kernel not found"})}break}};Module.onRuntimeInitialized=function(){postMessage({type:"initializeComplete"})};var bstr=atob("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MGogBE0EQCAAIQIMBAtBgCEoAgAiAiADIARrakEAIAJrcSICEAhBf0YNASACIARqIQQgACECDAMLIAJBf0cNAgtB3CBB3CAoAgBBBHI2AgALIAEQCCECQQAQCCEAIAJBf0YNBSAAQX9GDQUgACACTQ0FIAAgAmsiBCAGQShqTQ0FC0HQIEHQICgCACAEaiIANgIAQdQgKAIAIABJBEBB1CAgADYCAAsCQEG4HSgCACIDBEBB4CAhAANAIAIgACgCACIBIAAoAgQiBWpGDQIgACgCCCIADQALDAQLQbAdKAIAIgBBACAAIAJNG0UEQEGwHSACNgIAC0EAIQBB5CAgBDYCAEHgICACNgIAQcAdQX82AgBBxB1B+CAoAgA2AgBB7CBBADYCAANAIABBA3QiASABQcgdaiIFNgLQHSABIAU2AtQdIABBAWoiAEEgRw0AC0GsHSAEQShrIgBBeCACa0EHcSIBayIFNgIAQbgdIAEgAmoiATYCACABIAVBAXI2AgQgACACakEoNgIEQbwdQYghKAIANgIADAQLIAIgA00NAiABIANLDQIgACgCDEEIcQ0CIAAgBCAFajYCBEG4HSADQXggA2tBB3EiAGoiATYCAEGsHUGsHSgCACAEaiICIABrIgA2AgAgASAAQQFyNgIEIAIgA2pBKDYCBEG8HUGIISgCADYCAAwDC0EAIQAMBgtBACEADAQLQbAdKAIAIAJLBEBBsB0gAjYCAAsgAiAEaiEFQeAgIQACQANAIAUgACgCACIBRwRAIAAoAggiAA0BDAILCyAALQAMQQhxRQ0DC0HgICEAA0ACQCAAKAIAIgEgA00EQCADIAEgACgCBGoiBUkNAQsgACgCCCEADAELC0GsHSAEQShrIgBBeCACa0EHcSIBayIHNgIAQbgdIAEgAmoiATYCACABIAdBAXI2AgQgACACakEoNgIEQbwdQYghKAIANgIAIAMgBUEnIAVrQQdxakEvayIAIAAgA0EQakkbIgFBGzYCBCABQeggKQIANwIQIAFB4CApAgA3AghB6CAgAUEIajYCAEHkICAENgIAQeAgIAI2AgBB7CBBADYCACABQRhqIQADQCAAQQc2AgQgAEEIaiAAQQRqIQAgBUkNAAsgASADRg0AIAEgASgCBEF+cTYCBCADIAEgA2siAkEBcjYCBCABIAI2AgACfyAC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EEcgAiAITnIgA3IhHgNAIAggACAVaiICIAIgCEobIABrIQ4gGyAAQQJ0aiEXIBQgACANbEECdGohGEEAIQECQCAeIABFckUEQCAHIA02AgggByAYNgIEQQAhACALIAdBBGogCSAOEAkDQCAHIA82AgggByAXIAAgD2xBAnRqNgIEIAdBBGogCyAMIA4gCSAKIAAgEWoiASABIApKGyAAayAhEAcgASIAIApIDQALDAELA0AgByANNgIIIAcgGCABQQJ0IhZqNgIEQQAhACALIAdBBGogCSABIBBqIgMgAyAJShsgAWsiGSAOEAkgFiAaaiEWA0AgByAJNgIIIAcgFiAAIAlsQQJ0ajYCBCAMIAdBBGoiHyAZIAogACARaiIBIAEgCkobIABrIiAQEiAHIA82AgggByAXIAAgD2xBAnRqNgIEIB8gCyAMIA4gGSAgICEQByABIgAgCkgNAAsgAyIBIAlIDQALCyACIgAgCEgNAAsMBAsMBAsMAwsMAgsDQCAIIAAgFWoiASABIAhKGyAAayEDIBQgACANbEECdGohCkEAIQADQCAHIA02AgggByAKIABBAnRqNgIEIAsgB0EEaiAJIAAgEGoiAiACIAlKGyAAayADEAkgAiIAIAlIDQALIAEiACAISA0ACwsCQCATQYGAAkkNACAMRSAdcg0AIAxBBGsoAgAQBAsCQCASQYGAAkkNACALRSAccg0AIAtBBGsoAgAQBAsgB0EQaiQADAELEAwiAEGwHDYCACAAQZwcNgIAIABB1BxBARABAAsgBSgCACIABEAgAEEEaygCABAECyAFKAIEIgBFDQAgAEEEaygCABAECyAFQSBqJAAMAQtBjRJB0AlBzgNBhgkQAAALCyAEQeAAaiQADAMLQcoTQY4KQeEAQYYIEAAAC0HWFEHXDEGBAkGCDRAAAAtBzA1B5gpBygBB9wgQAAALIAZBMGokAA8LC0G8D0GuDEGwAUGJDRAAAAsQACAAIAEgAiADIAQgBRAPC8wBAQZ/AkAgAkEATA0AIAJBA3EhBSACQQRPBEAgAkH8////B3EhCANAIAEgA0ECdCICaiAAIAJqKgIAEAY4AgAgASACQQRyIgRqIAAgBGoqAgAQBjgCACABIAJBCHIiBGogACAEaioCABAGOAIAIAEgAkEMciICaiAAIAJqKgIAEAY4AgAgA0EE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AGxpYi9laWdlbi0zLjMuOS9FaWdlbi9zcmMvQ29yZS9Dd2lzZU51bGxhcnlPcC5oAGxpYi9laWdlbi0zLjMuOS9FaWdlbi9zcmMvQ29yZS91dGlsL0JsYXNVdGlsLmgAbGliL2VpZ2VuLTMuMy45L0VpZ2VuL3NyYy9Db3JlL3Byb2R1Y3RzL0dlbmVyYWxCbG9ja1BhbmVsS2VybmVsLmgAbGliL2VpZ2VuLTMuMy45L0VpZ2VuL3NyYy9Db3JlL0Jsb2NrLmgAbGliL2VpZ2VuLTMuMy45L0VpZ2VuL3NyYy9Db3JlL01hcEJhc2UuaABsaWIvZWlnZW4tMy4zLjkvRWlnZW4vc3JjL0NvcmUvRGVuc2VCYXNlLmgAcmVzaXplAE1hcEJhc2UAc3RkOjpiYWRfYWxsb2MAY2F0Y2hpbmcgYSBjbGFzcyB3aXRob3V0IGFuIG9iamVjdD8AaW5jcj09MQByb3dzID49IDAgJiYgKFJvd3NBdENvbXBpbGVUaW1lID09IER5bmFtaWMgfHwgUm93c0F0Q29tcGlsZVRpbWUgPT0gcm93cykgJiYgY29scyA+PSAwICYmIChDb2xzQXRDb21waWxlVGltZSA9PSBEeW5hbWljIHx8IENvbHNBdENvbXBpbGVUaW1lID09IGNvbHMpACgoIVBhbmVsTW9kZSkgJiYgc3RyaWRlPT0wICYmIG9mZnNldD09MCkgfHwgKFBhbmVsTW9kZSAmJiBzdHJpZGU+PWRlcHRoICYmIG9mZnNldDw9c3RyaWRlKQAoZGF0YVB0ciA9PSAwKSB8fCAoIHJvd3MgPj0gMCAmJiAoUm93c0F0Q29tcGlsZVRpbWUgPT0gRHluYW1pYyB8fCBSb3dzQXRDb21waWxlVGltZSA9PSByb3dzKSAmJiBjb2xzID49IDAgJiYgKENvbHNBdENvbXBpbGVUaW1lID09IER5bmFtaWMgfHwgQ29sc0F0Q29tcGlsZVRpbWUgPT0gY29scykpAChpPj0wKSAmJiAoICgoQmxvY2tSb3dzPT0xKSAmJiAoQmxvY2tDb2xzPT1YcHJUeXBlOjpDb2xzQXRDb21waWxlVGltZSkgJiYgaTx4cHIucm93cygpKSB8fCgoQmxvY2tSb3dzPT1YcHJUeXBlOjpSb3dzQXRDb21waWxlVGltZSkgJiYgKEJsb2NrQ29scz09MSkgJiYgaTx4cHIuY29scygpKSkAZHN0LnJvd3MoKT09YV9saHMucm93cygpICYmIGRzdC5jb2xzKCk9PWFfcmhzLmNvbHMoKQBhTGhzLnJvd3MoKSA9PSBhUmhzLnJvd3MoKSAmJiBhTGhzLmNvbHMoKSA9PSBhUmhzLmNvbHMoKQBvcGVyYXRvcigpAHRoaXMtPnJvd3MoKT4wICYmIHRoaXMtPmNvbHMoKT4wICYmICJ5b3UgYXJlIHVzaW5nIGFuIGVtcHR5IG1hdHJpeCIAbGhzLmNvbHMoKSA9PSByaHMucm93cygpICYmICJpbnZhbGlkIG1hdHJpeCBwcm9kdWN0IiAmJiAiaWYgeW91IHdhbnRlZCBhIGNvZWZmLXdpc2Ugb3IgYSBkb3QgcHJvZHVjdCB1c2UgdGhlIHJlc3BlY3RpdmUgZXhwbGljaXQgZnVuY3Rpb25zIgByb3dzID09IHRoaXMtPnJvd3MoKSAmJiBjb2xzID09IHRoaXMtPmNvbHMoKSAmJiAiRGVuc2VCYXNlOjpyZXNpemUoKSBkb2VzIG5vdCBhY3R1YWxseSBhbGxvdyB0byByZXNpemUuIgAAAAAAAAAA8D90hRXTsNnvPw+J+WxYte8/UVsS0AGT7z97UX08uHLvP6q5aDGHVO8/OGJ1bno47z/h3h/1nR7vPxW3MQr+Bu8/y6k6N6fx7j8iNBJMpt7uPy2JYWAIzu4/Jyo21dq/7j+CT51WK7TuPylUSN0Hq+4/hVU6sH6k7j/NO39mnqDuP3Rf7Oh1n+4/hwHrcxSh7j8TzkyZiaXuP9ugKkLlrO4/5cXNsDe37j+Q8KOCkcTuP10lPrID1e4/rdNamZ/o7j9HXvvydv/uP5xShd2bGe8/aZDv3CA37z+HpPvcGFjvP1+bezOXfO8/2pCkoq+k7z9ARW5bdtDvPwAAAAAAAOhClCORS/hqrD/zxPpQzr/OP9ZSDP9CLuY/AAAAAAAAOEP+gitlRxVHQJQjkUv4arw+88T6UM6/Lj/WUgz/Qi6WP77z+HnsYfY/GTCWW8b+3r89iK9K7XH1P6T81DJoC9u/sBDw8DmV9D97tx8Ki0HXv4UDuLCVyfM/e89tGumd07+lZIgMGQ3zPzG28vObHdC/oI4LeyJe8j/wejsbHXzJvz80GkpKu/E/nzyvk+P5wr+65YrwWCPxP1yNeL/LYLm/pwCZQT+V8D/OX0e2nW+qvwAAAAAAAPA/AAAAAAAAAACsR5r9jGDuPz31JJ/KOLM/oGoCH7Ok7D+6kThUqXbEP+b8alc2IOs/0uTESguEzj8tqqFj0cLpPxxlxvBFBtQ/7UF4A+aG6D/4nxssnI7YP2JIU/XcZ+c/zHuxTqTg3D8LbknJFnbSP3rGdaBpGde/3bqnbArH3j/I9r5IRxXnvyu4KmVHFfc/wA0AADwNAABwDgAATjEwX19jeHhhYml2MTE2X19zaGltX3R5cGVfaW5mb0UAAAAAwA0AAGwNAAAwDQAATjEwX19jeHhhYml2MTE3X19jbGFzc190eXBlX2luZm9FAAAAAAAAAGANAAACAAAAAwAAAAQAAAAFAAAABgAAAAcAAAAIAAAACQAAAAAAAADgDQAAAgAAAAoAAAAEAAAABQAAAAYAAAALAAAADAAAAA0AAADADQAA7A0AAGANAABOMTBfX2N4eGFiaXYxMjBfX3NpX2NsYXNzX3R5cGVfaW5mb0UAAAAAAAAAAFQOAAABAAAADgAAAA8AAAAAAAAAPA4AAAEAAAAQAAAAEQAAAJgNAABEDgAAU3Q5ZXhjZXB0aW9uAAAAAMANAABgDgAAPA4AAFN0OWJhZF9hbGxvYwAAAACYDQAAeA4AAFN0OXR5cGVfaW5mbwBBiB0LA5AQAQ==");var ary=new Uint8Array(bstr.length);for(var i=0;i<bstr.length;i++){ary[i]=bstr.charCodeAt(i)}Module.wasmBinary=ary})();var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var _scriptName=globalThis.document?.currentScript?.src;if(typeof __filename!="undefined"){_scriptName=__filename}else if(ENVIRONMENT_IS_WORKER){_scriptName=self.location.href}var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename);return ret};readAsync=async(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename,binary?undefined:"utf8");return ret};if(process.argv.length>1){thisProgram=process.argv[1].replace(/\\\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){try{scriptDirectory=new URL(".",_scriptName).href}catch{}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=async url=>{if(isFileURI(url)){return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response);return}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}var response=await fetch(url,{credentials:"same-origin"});if(response.ok){return response.arrayBuffer()}throw new Error(response.status+" : "+response.url)}}}else{}var out=console.log.bind(console);var err=console.error.bind(console);var wasmBinary;var ABORT=false;var isFileURI=filename=>filename.startsWith("file://");var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;var HEAP64,HEAPU64;var runtimeInitialized=false;function updateMemoryViews(){var b=wasmMemory.buffer;HEAP8=new Int8Array(b);HEAP16=new Int16Array(b);HEAPU8=new Uint8Array(b);HEAPU16=new Uint16Array(b);HEAP32=new Int32Array(b);HEAPU32=new Uint32Array(b);HEAPF32=new Float32Array(b);HEAPF64=new Float64Array(b);HEAP64=new BigInt64Array(b);HEAPU64=new BigUint64Array(b)}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(onPreRuns)}function initRuntime(){runtimeInitialized=true;wasmExports["e"]()}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(onPostRuns)}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var wasmBinaryFile;function findWasmBinary(){return locateFile("workerRaw.wasm")}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){if(!wasmBinary){try{var response=await readAsync(binaryFile);return new Uint8Array(response)}catch{}}return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)}}async function instantiateAsync(binary,binaryFile,imports){if(!binary&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE){try{var response=fetch(binaryFile,{credentials:"same-origin"});var instantiationResult=await WebAssembly.instantiateStreaming(response,imports);return instantiationResult}catch(reason){err(`wasm streaming compile failed: ${reason}`);err("falling back to ArrayBuffer instantiation")}}return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){var imports={a:wasmImports};return imports}async function createWasm(){function receiveInstance(instance,module){wasmExports=instance.exports;assignWasmExports(wasmExports);updateMemoryViews();removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){return receiveInstance(result["instance"])}var info=getWasmImports();if(Module["instantiateWasm"]){return new Promise((resolve,reject)=>{Module["instantiateWasm"](info,(inst,mod)=>{resolve(receiveInstance(inst,mod))})})}wasmBinaryFile??=findWasmBinary();var result=await instantiateAsync(wasmBinary,wasmBinaryFile,info);var exports=receiveInstantiationResult(result);return exports}class ExitStatus{name="ExitStatus";constructor(status){this.message=`Program terminated with exit(${status})`;this.status=status}}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var onPostRuns=[];var addOnPostRun=cb=>onPostRuns.push(cb);var onPreRuns=[];var addOnPreRun=cb=>onPreRuns.push(cb);var runDependencies=0;var dependenciesFulfilled=null;var removeRunDependency=id=>{runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}};var addRunDependency=id=>{runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)};var noExitRuntime=true;var UTF8Decoder=globalThis.TextDecoder&&new TextDecoder;var findStringEnd=(heapOrArray,idx,maxBytesToRead,ignoreNul)=>{var maxIdx=idx+maxBytesToRead;if(ignoreNul)return maxIdx;while(heapOrArray[idx]&&!(idx>=maxIdx))++idx;return idx};var UTF8ArrayToString=(heapOrArray,idx=0,maxBytesToRead,ignoreNul)=>{var endPtr=findStringEnd(heapOrArray,idx,maxBytesToRead,ignoreNul);if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead,ignoreNul)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead,ignoreNul):"";var ___assert_fail=(condition,filename,line,func)=>abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"]);class ExceptionInfo{constructor(excPtr){this.excPtr=excPtr;this.ptr=excPtr-24}set_type(type){HEAPU32[this.ptr+4>>2]=type}get_type(){return HEAPU32[this.ptr+4>>2]}set_destructor(destructor){HEAPU32[this.ptr+8>>2]=destructor}get_destructor(){return HEAPU32[this.ptr+8>>2]}set_caught(caught){caught=caught?1:0;HEAP8[this.ptr+12]=caught}get_caught(){return HEAP8[this.ptr+12]!=0}set_rethrown(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+13]=rethrown}get_rethrown(){return HEAP8[this.ptr+13]!=0}init(type,destructor){this.set_adjusted_ptr(0);this.set_type(type);this.set_destructor(destructor)}set_adjusted_ptr(adjustedPtr){HEAPU32[this.ptr+16>>2]=adjustedPtr}get_adjusted_ptr(){return HEAPU32[this.ptr+16>>2]}}var exceptionLast=0;var uncaughtExceptionCount=0;var ___cxa_throw=(ptr,type,destructor)=>{var info=new ExceptionInfo(ptr);info.init(type,destructor);exceptionLast=ptr;uncaughtExceptionCount++;throw exceptionLast};var getHeapMax=()=>2147483648;var alignMemory=(size,alignment)=>Math.ceil(size/alignment)*alignment;var growMemory=size=>{var oldHeapSize=wasmMemory.buffer.byteLength;var pages=(size-oldHeapSize+65535)/65536|0;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignMemory(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};{if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(Module["print"])out=Module["print"];if(Module["printErr"])err=Module["printErr"];if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].shift()()}}}var _kernel_ceil,_kernel_exp,_kernel_floor,_kernel_relu,_kernel_sigmoid,_kernel_sqrt,_kernel_tanh,_kernel_gemm_transa0_transb0,_kernel_gemm_transa0_transb0_c,_kernel_gemm_transa0_transb1,_kernel_gemm_transa0_transb1_c,_kernel_gemm_transa1_transb0,_kernel_gemm_transa1_transb0_c,_kernel_gemm_transa1_transb1,_kernel_gemm_transa1_transb1_c,_kernel_leakyrelu,_kernel_add_d0,_kernel_add_d1,_kernel_add_d2,_kernel_add_d3,_kernel_add_d4,_kernel_add_d5,_kernel_add_d6,_kernel_sub_d0,_kernel_sub_d1,_kernel_sub_d2,_kernel_sub_d3,_kernel_sub_d4,_kernel_sub_d5,_kernel_sub_d6,_kernel_mul_d0,_kernel_mul_d1,_kernel_mul_d2,_kernel_mul_d3,_kernel_mul_d4,_kernel_mul_d5,_kernel_mul_d6,_kernel_div_d0,_kernel_div_d1,_kernel_div_d2,_kernel_div_d3,_kernel_div_d4,_kernel_div_d5,_kernel_div_d6,_kernel_pow_d0,_kernel_pow_d1,_kernel_pow_d2,_kernel_pow_d3,_kernel_pow_d4,_kernel_pow_d5,_kernel_pow_d6,_kernel_copy,_webdnn_malloc,_webdnn_free,memory,__indirect_function_table,wasmMemory;function assignWasmExports(wasmExports){_kernel_ceil=Module["_kernel_ceil"]=wasmExports["f"];_kernel_exp=Module["_kernel_exp"]=wasmExports["g"];_kernel_floor=Module["_kernel_floor"]=wasmExports["h"];_kernel_relu=Module["_kernel_relu"]=wasmExports["i"];_kernel_sigmoid=Module["_kernel_sigmoid"]=wasmExports["j"];_kernel_sqrt=Module["_kernel_sqrt"]=wasmExports["k"];_kernel_tanh=Module["_kernel_tanh"]=wasmExports["l"];_kernel_gemm_transa0_transb0=Module["_kernel_gemm_transa0_transb0"]=wasmExports["m"];_kernel_gemm_transa0_transb0_c=Module["_kernel_gemm_transa0_transb0_c"]=wasmExports["n"];_kernel_gemm_transa0_transb1=Module["_kernel_gemm_transa0_transb1"]=wasmExports["o"];_kernel_gemm_transa0_transb1_c=Module["_kernel_gemm_transa0_transb1_c"]=wasmExports["p"];_kernel_gemm_transa1_transb0=Module["_kernel_gemm_transa1_transb0"]=wasmExports["q"];_kernel_gemm_transa1_transb0_c=Module["_kernel_gemm_transa1_transb0_c"]=wasmExports["r"];_kernel_gemm_transa1_transb1=Module["_kernel_gemm_transa1_transb1"]=wasmExports["s"];_kernel_gemm_transa1_transb1_c=Module["_kernel_gemm_transa1_transb1_c"]=wasmExports["t"];_kernel_leakyrelu=Module["_kernel_leakyrelu"]=wasmExports["u"];_kernel_add_d0=Module["_kernel_add_d0"]=wasmExports["v"];_kernel_add_d1=Module["_kernel_add_d1"]=wasmExports["w"];_kernel_add_d2=Module["_kernel_add_d2"]=wasmExports["x"];_kernel_add_d3=Module["_kernel_add_d3"]=wasmExports["y"];_kernel_add_d4=Module["_kernel_add_d4"]=wasmExports["z"];_kernel_add_d5=Module["_kernel_add_d5"]=wasmExports["A"];_kernel_add_d6=Module["_kernel_add_d6"]=wasmExports["B"];_kernel_sub_d0=Module["_kernel_sub_d0"]=wasmExports["C"];_kernel_sub_d1=Module["_kernel_sub_d1"]=wasmExports["D"];_kernel_sub_d2=Module["_kernel_sub_d2"]=wasmExports["E"];_kernel_sub_d3=Module["_kernel_sub_d3"]=wasmExports["F"];_kernel_sub_d4=Module["_kernel_sub_d4"]=wasmExports["G"];_kernel_sub_d5=Module["_kernel_sub_d5"]=wasmExports["H"];_kernel_sub_d6=Module["_kernel_sub_d6"]=wasmExports["I"];_kernel_mul_d0=Module["_kernel_mul_d0"]=wasmExports["J"];_kernel_mul_d1=Module["_kernel_mul_d1"]=wasmExports["K"];_kernel_mul_d2=Module["_kernel_mul_d2"]=wasmExports["L"];_kernel_mul_d3=Module["_kernel_mul_d3"]=wasmExports["M"];_kernel_mul_d4=Module["_kernel_mul_d4"]=wasmExports["N"];_kernel_mul_d5=Module["_kernel_mul_d5"]=wasmExports["O"];_kernel_mul_d6=Module["_kernel_mul_d6"]=wasmExports["P"];_kernel_div_d0=Module["_kernel_div_d0"]=wasmExports["Q"];_kernel_div_d1=Module["_kernel_div_d1"]=wasmExports["R"];_kernel_div_d2=Module["_kernel_div_d2"]=wasmExports["S"];_kernel_div_d3=Module["_kernel_div_d3"]=wasmExports["T"];_kernel_div_d4=Module["_kernel_div_d4"]=wasmExports["U"];_kernel_div_d5=Module["_kernel_div_d5"]=wasmExports["V"];_kernel_div_d6=Module["_kernel_div_d6"]=wasmExports["W"];_kernel_pow_d0=Module["_kernel_pow_d0"]=wasmExports["X"];_kernel_pow_d1=Module["_kernel_pow_d1"]=wasmExports["Y"];_kernel_pow_d2=Module["_kernel_pow_d2"]=wasmExports["Z"];_kernel_pow_d3=Module["_kernel_pow_d3"]=wasmExports["_"];_kernel_pow_d4=Module["_kernel_pow_d4"]=wasmExports["$"];_kernel_pow_d5=Module["_kernel_pow_d5"]=wasmExports["aa"];_kernel_pow_d6=Module["_kernel_pow_d6"]=wasmExports["ba"];_kernel_copy=Module["_kernel_copy"]=wasmExports["ca"];_webdnn_malloc=Module["_webdnn_malloc"]=wasmExports["da"];_webdnn_free=Module["_webdnn_free"]=wasmExports["ea"];memory=wasmMemory=wasmExports["d"];__indirect_function_table=wasmExports["__indirect_function_table"]}var wasmImports={a:___assert_fail,b:___cxa_throw,c:_emscripten_resize_heap};function run(){if(runDependencies>0){dependenciesFulfilled=run;return}preRun();if(runDependencies>0){dependenciesFulfilled=run;return}function doRun(){Module["calledRun"]=true;if(ABORT)return;initRuntime();Module["onRuntimeInitialized"]?.();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(()=>{setTimeout(()=>Module["setStatus"](""),1);doRun()},1)}else{doRun()}}var wasmExports;createWasm();run();\n',
              ],
              'worker.js',
              { type: 'text/javascript' }
            )
          )))
      },
      6355: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(8024),
          o = n(3267),
          i = n(9606),
          s = n(9583),
          a = n(5537),
          A = n(8426),
          u = n(3223),
          l = n(8236),
          g = n(6844),
          c = n(8862),
          d = n(2451),
          p = n(2581),
          h = n(7913),
          f = n(6085),
          I = n(6037),
          m = n(9506),
          E = n(4871),
          y = n(8841),
          C = n(9447),
          B = n(7701),
          _ = n(5409)
        t.getOpEntries = function () {
          const e = []
          return (
            e.push(...r.getOpEntries()),
            e.push(...o.getOpEntries()),
            e.push(...i.getOpEntries()),
            e.push(...s.getOpEntries()),
            e.push(...a.getOpEntries()),
            e.push(...A.getOpEntries()),
            e.push(...u.getOpEntries()),
            e.push(...l.getOpEntries()),
            e.push(...g.getOpEntries()),
            e.push(...c.getOpEntries()),
            e.push(...d.getOpEntries()),
            e.push(...p.getOpEntries()),
            e.push(...h.getOpEntries()),
            e.push(...f.getOpEntries()),
            e.push(...I.getOpEntries()),
            e.push(...m.getOpEntries()),
            e.push(...E.getOpEntries()),
            e.push(...y.getOpEntries()),
            e.push(...C.getOpEntries()),
            e.push(...B.getOpEntries()),
            e.push(..._.getOpEntries()),
            e
          )
        }
      },
      8024: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(7004),
          o = n(5760)
        class i extends r.AveragePool {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0]
            if (4 !== n.ndim) throw new Error('MaxPool other than 2D is not yet supported')
            if (1 !== n.dimPerPixel) throw new Error()
            const {
                batch: r,
                kernelShape: i,
                pads: s,
                strides: a,
                inShape: A,
                outShape: u,
                ch: l,
              } = this.calcShape(n.dims),
              g = e.emptyTensor([r, l, u[0], u[1]], 'float32', { dimPerPixel: 1 })
            return (await o.averagepool(e, n, g, this.countIncludePad, r, i, s, a, A, u, l), [g])
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'AveragePool', backend: 'webgl', opsetMin: 1, factory: () => new i() }]
        }
      },
      3267: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLBinary7 = void 0))
        const r = n(3381),
          o = n(2055),
          i = n(5146)
        class s extends r.OperatorImpl {
          constructor(e, t) {
            ;(super('webgl'), (this.kernelName = e), (this.binaryCalculationSource = t))
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0],
              r = t[1]
            if ('float32' !== n.dataType || 'float32' !== r.dataType) throw new Error()
            if (1 !== n.dimPerPixel || 1 !== r.dimPerPixel) throw new Error()
            const { dims: s, allStrides: a } = o.broadcastMulti([n.dims, r.dims]),
              A = e.emptyTensor(s, 'float32'),
              u = s.length,
              l = `${this.kernelName}_${u}`
            if (!e.hasKernel(l)) {
              let t
              switch (u) {
                case 0:
                  t = ''
                  break
                case 1:
                  t = 'tex_output_0'
                  break
                case 2:
                  t = 'tex_output_0, tex_output_1'
                  break
                case 3:
                  t = 'tex_output_0, tex_output_1, tex_output_2'
                  break
                case 4:
                  t = 'tex_output_0, tex_output_1, tex_output_2, tex_output_3'
                  break
                case 5:
                  t = 'tex_output_0, tex_output_1, tex_output_2, tex_output_3, tex_output_4'
                  break
                case 6:
                  t =
                    'tex_output_0, tex_output_1, tex_output_2, tex_output_3, tex_output_4, tex_output_5'
                  break
                default:
                  throw new Error()
              }
              const n = `${i.shaderGenHeader(e.webgl2)}\n      \n${i.shaderGenTensorOutputUniform(u)}\n${i.shaderGenTensorNDGet('tex_input_a', u, e.webgl2)}\n${i.shaderGenTensorNDGet('tex_input_b', u, e.webgl2)}\n\n    void main() {\n      ${i.shaderGenTensorOutputCoordsWithReturn(u)}\n      float sa = get_tex_input_a(${t});\n      float sb = get_tex_input_b(${t});\n      ${this.binaryCalculationSource}\n      ${i.shaderGenOutput('v', e.webgl2)}\n      return;\n    }\n        `
              e.addKernel(l, n)
            }
            const g = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input_a', a[0], n, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_input_b', a[1], r, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem(s, A, e.webgl2),
            ]
            return (
              await e.runKernel(
                l,
                [
                  { tensor: n, name: 'tex_input_a' },
                  { tensor: r, name: 'tex_input_b' },
                ],
                A,
                g
              ),
              [A]
            )
          }
        }
        ;((t.WebGLBinary7 = s),
          (t.getOpEntries = function () {
            return [
              {
                opType: 'Add',
                backend: 'webgl',
                opsetMin: 7,
                factory: () => new s('add', 'float v = sa + sb;'),
              },
              {
                opType: 'Sub',
                backend: 'webgl',
                opsetMin: 7,
                factory: () => new s('sub', 'float v = sa - sb;'),
              },
              {
                opType: 'Mul',
                backend: 'webgl',
                opsetMin: 7,
                factory: () => new s('mul', 'float v = sa * sb;'),
              },
              {
                opType: 'Div',
                backend: 'webgl',
                opsetMin: 7,
                factory: () => new s('div', 'float v = sa / sb;'),
              },
              {
                opType: 'Pow',
                backend: 'webgl',
                opsetMin: 7,
                factory: () => new s('pow', 'float v = pow(abs(sa), sb);'),
              },
            ]
          }))
      },
      9606: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(1446),
          o = n(3381),
          i = n(2055)
        class s extends o.OperatorImpl {
          constructor() {
            super('webgl')
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.to = i.getAttrInt(e, 'to', r.onnx.TensorProto.DataType.FLOAT)))
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0]
            if ('float32' !== n.dataType) throw new Error('Cast: input must be float32')
            if (this.to !== r.onnx.TensorProto.DataType.FLOAT)
              throw new Error('Cast: output must be float32')
            return [n.alias(n.dims)]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Cast', backend: 'webgl', opsetMin: 1, factory: () => new s() }]
        }
      },
      9583: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLClip = void 0))
        const r = n(3381),
          o = n(5146),
          i = n(2055)
        class s extends r.OperatorImpl {
          constructor() {
            super('webgl')
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.clipMax = i.getAttrFloat(e, 'max', 65536)),
              (this.clipMin = i.getAttrFloat(e, 'min', -65536)))
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0]
            if ('float32' !== n.dataType) throw new Error()
            const r = e.emptyTensor(n.dims, 'float32')
            if (
              n.textureWidth !== r.textureWidth ||
              n.textureHeight !== r.textureHeight ||
              1 !== n.dimPerPixel
            )
              throw new Error()
            const i = `clip_${this.clipMax}_${this.clipMin}`
            if (!e.hasKernel(i)) {
              const t = `${o.shaderGenHeader(e.webgl2)}\n  ${o.shaderGenTensorElementwiseGet('tex_input', e.webgl2)}\n  void main() {\n    float s = get_tex_input();\n    float v = clamp(s, ${this.clipMin.toExponential()}, ${this.clipMax.toExponential()});\n    ${o.shaderGenOutput('v', e.webgl2)}\n    return;\n  }\n      `
              e.addKernel(i, t)
            }
            const s = [...o.shaderGenTensorElementwiseGetUniformItem('tex_input', n, e.webgl2)]
            return (await e.runKernel(i, [{ tensor: n, name: 'tex_input' }], r, s), [r])
          }
        }
        ;((t.WebGLClip = s),
          (t.getOpEntries = function () {
            return [
              {
                opType: 'Clip',
                backend: 'webgl',
                opsetMin: 1,
                opsetMax: 11,
                factory: () => new s(),
              },
            ]
          }))
      },
      5537: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLConv = void 0))
        const r = n(1908),
          o = n(2825),
          i = n(5146),
          s = 4194304
        class a extends o.Conv {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0],
              r = t[1],
              o = t[2]
            if (4 !== n.ndim) throw new Error('Conv other than 2D is not yet supported')
            const {
              batch: i,
              dilations: a,
              group: A,
              kernelShape: u,
              pads: l,
              strides: g,
              inShape: c,
              outShape: d,
              chIn: p,
              chInPerGroup: h,
              chOut: f,
              chOutPerGroup: I,
            } = this.calcShape(n.dims, r.dims)
            if (1 !== n.dimPerPixel || 1 !== r.dimPerPixel || (o && 1 !== o.dimPerPixel))
              throw new Error()
            const m = A * i * d[1] * h * u[0] * u[1],
              E = m * d[0]
            let y
            if (E > s) {
              const t = Math.ceil(E / s),
                o = Math.ceil(d[0] / t),
                C = [],
                B = []
              for (let s = 0; s < t; s++) {
                const t = s * o,
                  E = Math.min(o, d[0] - t)
                C.push({ offset: t, length: E })
                const y = e.emptyTensor([m * E])
                await this.im2colSplit(e, n, y, i, a, A, u, l, g, c, d, p, h, f, I, t, E)
                const _ = e.emptyTensor([A * i * E * d[1] * I])
                ;(await this.matmul(e, y, r, _, A, i * E * d[1], h * u[0] * u[1], I),
                  y.dispose(),
                  B.push(_))
              }
              ;((y = e.emptyTensor([A * i * d[0] * d[1] * I])),
                await this.concat(e, B, y, A * i, d[0], d[1] * I, C),
                B.forEach((e) => e.dispose()))
            } else {
              const t = e.emptyTensor([A * i * d[0] * d[1] * h * u[0] * u[1]])
              ;(await this.im2col(e, n, t, i, a, A, u, l, g, c, d, p, h, f, I),
                (y = e.emptyTensor([A * i * d[0] * d[1] * I])),
                await this.matmul(e, t, r, y, A, i * d[0] * d[1], h * u[0] * u[1], I),
                t.dispose())
            }
            const C = e.emptyTensor([i, f, d[0], d[1]])
            if (o) {
              const t = e.emptyTensor([i * f * d[0] * d[1]])
              ;(await this.transpose(e, y, t, A, i, d[0] * d[1], I),
                y.dispose(),
                await this.bias(e, t, o, C, i, f, d[0] * d[1]),
                t.dispose())
            } else (await this.transpose(e, y, C, A, i, d[0] * d[1], I), y.dispose())
            return [C]
          }
          async im2col(e, t, n, r, o, s, a, A, u, l, g, c, d, p, h) {
            const f = 'conv_im2col'
            if (!e.hasKernel(f)) {
              const t = `${i.shaderGenHeader(e.webgl2)}\n  \n  ${i.shaderGenTensorOutputUniform(1)}\n  uniform int GROUP;\n  uniform int BATCH;\n  uniform int O0;\n  uniform int O1;\n  uniform int CI;\n  uniform int CIPG;\n  uniform int K0;\n  uniform int K1;\n  uniform int S0;\n  uniform int S1;\n  uniform int P0;\n  uniform int P1;\n  uniform int D0;\n  uniform int D1;\n  uniform int IS0;\n  uniform int IS1;\n  \n  ${i.shaderGenTensorNDGet('tex_input', 1, e.webgl2)}\n  \n  void main() {\n    ${i.shaderGenTensorOutputCoordsWithReturn(1)}\n    int rem = tex_output_flat;\n    int quo = rem / K0;\n    int k1 = rem - quo * K1;\n    rem = quo;\n    quo = rem / K0;\n    int k0 = rem - quo * K0;\n    rem = quo;\n    quo = rem / CIPG;\n    int ci = rem - quo * CIPG;\n    rem = quo;\n    quo = rem / O1;\n    int o1 = rem - quo * O1;\n    rem = quo;\n    quo = rem / O0;\n    int o0 = rem - quo * O0;\n    rem = quo;\n    quo = rem / BATCH;\n    int b = rem - quo * BATCH;\n    int g = quo;\n  \n    int in0 = o0 * S0 - P0 + k0 * D0;\n    int in1 = o1 * S1 - P1 + k1 * D1;\n    float s = 0.0;\n    if (in0 >= 0 && in0 < IS0 && in1 >= 0 && in1 < IS1) {\n      s = get_tex_input(((b * CI + g * CIPG + ci) * IS0 + in0) * IS1 + in1);\n    }\n    ${i.shaderGenOutput('s', e.webgl2)}\n    return;\n  }\n  `
              e.addKernel(f, t)
            }
            const I = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [1], t, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([n.length], n, e.webgl2),
              { name: 'GROUP', type: 'int', value: s },
              { name: 'BATCH', type: 'int', value: r },
              { name: 'O0', type: 'int', value: g[0] },
              { name: 'O1', type: 'int', value: g[1] },
              { name: 'CI', type: 'int', value: c },
              { name: 'CIPG', type: 'int', value: d },
              { name: 'K0', type: 'int', value: a[0] },
              { name: 'K1', type: 'int', value: a[1] },
              { name: 'S0', type: 'int', value: u[0] },
              { name: 'S1', type: 'int', value: u[1] },
              { name: 'P0', type: 'int', value: A[0] },
              { name: 'P1', type: 'int', value: A[1] },
              { name: 'D0', type: 'int', value: o[0] },
              { name: 'D1', type: 'int', value: o[1] },
              { name: 'IS0', type: 'int', value: l[0] },
              { name: 'IS1', type: 'int', value: l[1] },
            ]
            await e.runKernel(f, [{ tensor: t, name: 'tex_input' }], n, I)
          }
          async im2colSplit(e, t, n, r, o, s, a, A, u, l, g, c, d, p, h, f, I) {
            const m = 'conv_im2col_split'
            if (!e.hasKernel(m)) {
              const t = `${i.shaderGenHeader(e.webgl2)}\n  \n  ${i.shaderGenTensorOutputUniform(1)}\n  uniform int GROUP;\n  uniform int BATCH;\n  uniform int O0;\n  uniform int O1;\n  uniform int CI;\n  uniform int CIPG;\n  uniform int K0;\n  uniform int K1;\n  uniform int S0;\n  uniform int S1;\n  uniform int P0;\n  uniform int P1;\n  uniform int D0;\n  uniform int D1;\n  uniform int IS0;\n  uniform int IS1;\n  uniform int O0OFS;\n  uniform int O0CHUNK;\n  \n  ${i.shaderGenTensorNDGet('tex_input', 1, e.webgl2)}\n  \n  void main() {\n    ${i.shaderGenTensorOutputCoordsWithReturn(1)}\n    int rem = tex_output_flat;\n    int quo = rem / K0;\n    int k1 = rem - quo * K1;\n    rem = quo;\n    quo = rem / K0;\n    int k0 = rem - quo * K0;\n    rem = quo;\n    quo = rem / CIPG;\n    int ci = rem - quo * CIPG;\n    rem = quo;\n    quo = rem / O1;\n    int o1 = rem - quo * O1;\n    rem = quo;\n    quo = rem / O0CHUNK;\n    int o0 = rem - quo * O0CHUNK + O0OFS;\n    rem = quo;\n    quo = rem / BATCH;\n    int b = rem - quo * BATCH;\n    int g = quo;\n  \n    int in0 = o0 * S0 - P0 + k0 * D0;\n    int in1 = o1 * S1 - P1 + k1 * D1;\n    float s = 0.0;\n    if (in0 >= 0 && in0 < IS0 && in1 >= 0 && in1 < IS1) {\n      s = get_tex_input(((b * CI + g * CIPG + ci) * IS0 + in0) * IS1 + in1);\n    }\n    ${i.shaderGenOutput('s', e.webgl2)}\n    return;\n  }\n  `
              e.addKernel(m, t)
            }
            const E = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [1], t, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([n.length], n, e.webgl2),
              { name: 'GROUP', type: 'int', value: s },
              { name: 'BATCH', type: 'int', value: r },
              { name: 'O0', type: 'int', value: g[0] },
              { name: 'O1', type: 'int', value: g[1] },
              { name: 'CI', type: 'int', value: c },
              { name: 'CIPG', type: 'int', value: d },
              { name: 'K0', type: 'int', value: a[0] },
              { name: 'K1', type: 'int', value: a[1] },
              { name: 'S0', type: 'int', value: u[0] },
              { name: 'S1', type: 'int', value: u[1] },
              { name: 'P0', type: 'int', value: A[0] },
              { name: 'P1', type: 'int', value: A[1] },
              { name: 'D0', type: 'int', value: o[0] },
              { name: 'D1', type: 'int', value: o[1] },
              { name: 'IS0', type: 'int', value: l[0] },
              { name: 'IS1', type: 'int', value: l[1] },
              { name: 'O0OFS', type: 'int', value: f },
              { name: 'O0CHUNK', type: 'int', value: I },
            ]
            await e.runKernel(m, [{ tensor: t, name: 'tex_input' }], n, E)
          }
          async matmul(e, t, n, r, o, s, a, A) {
            const u = `conv_matmul_${a}`
            if (!e.hasKernel(u)) {
              const t = `${i.shaderGenHeader(e.webgl2)}\n  \n  ${i.shaderGenTensorOutputUniform(1)}\n  #define cinkhkw ${a}\n  uniform int GROUP;\n  uniform int BOUT;\n  uniform int COPG;\n  \n  ${i.shaderGenTensorNDGet('tex_input_w', 1, e.webgl2)}\n  ${i.shaderGenTensorNDGet('tex_input_i', 1, e.webgl2)}\n  \n  void main() {\n    ${i.shaderGenTensorOutputCoordsWithReturn(1)}\n    int rem = tex_output_flat;\n    int quo = rem / COPG;\n    int x = rem - quo * COPG;\n    rem = quo;\n    quo = rem / BOUT;\n    int y = rem - quo * BOUT;\n    int g = quo;\n  \n    float s = 0.0;\n    for (int ip = 0; ip < cinkhkw; ip++) {\n      s += get_tex_input_i((g * BOUT + y) * cinkhkw + ip) * get_tex_input_w((g * COPG + x) * cinkhkw + ip);\n    }\n    ${i.shaderGenOutput('s', e.webgl2)}\n    return;\n  }\n  `
              e.addKernel(u, t)
            }
            const l = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input_w', [1], n, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_input_i', [1], t, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([r.length], r, e.webgl2),
              { name: 'GROUP', type: 'int', value: o },
              { name: 'BOUT', type: 'int', value: s },
              { name: 'COPG', type: 'int', value: A },
            ]
            await e.runKernel(
              u,
              [
                { tensor: n, name: 'tex_input_w' },
                { tensor: t, name: 'tex_input_i' },
              ],
              r,
              l
            )
          }
          async concat(e, t, n, o, s, a, A) {
            const u = `conv_concat_${A.length}`
            if (!e.hasKernel(u)) {
              const t = r
                  .arange(A.length)
                  .map((t) => i.shaderGenTensorNDGet(`tex_input_${t}`, 3, e.webgl2))
                  .join(''),
                n = r
                  .arange(A.length)
                  .map((e) => `uniform int CHUNK_OFS${e};`)
                  .join('')
              let o =
                '\nif (tex_output_1 < CHUNK_OFS1) {\n  s = get_tex_input_0(tex_output_0, tex_output_1, tex_output_2);\n}\n'
              for (let e = 1; e < A.length - 1; e++)
                o += ` else if (tex_output_1 < CHUNK_OFS${e + 1}) {\n  s = get_tex_input_${e}(tex_output_0, tex_output_1 - CHUNK_OFS${e}, tex_output_2);\n}\n`
              o += `\nelse {\n  s = get_tex_input_${A.length - 1}(tex_output_0, tex_output_1 - CHUNK_OFS${A.length - 1}, tex_output_2);\n}\n`
              const s = `${i.shaderGenHeader(e.webgl2)}\n  \n  ${i.shaderGenTensorOutputUniform(3)}\n  ${n}\n  \n  ${t}\n  \n  void main() {\n    ${i.shaderGenTensorOutputCoordsWithReturn(3)}\n    float s = 0.0;\n\n    ${o}\n    ${i.shaderGenOutput('s', e.webgl2)}\n    return;\n  }\n  `
              e.addKernel(u, s)
            }
            const l = [...i.shaderGenTensorOutputUniformItem([o, s, a], n, e.webgl2)]
            for (let n = 0; n < A.length; n++)
              (l.push(
                ...i.shaderGenTensorNDGetUniformItem(
                  `tex_input_${n}`,
                  [A[n].length * a, a, 1],
                  t[n],
                  e.webgl2
                )
              ),
                l.push({ name: `CHUNK_OFS${n}`, value: A[n].offset, type: 'int' }))
            await e.runKernel(
              u,
              t.map((e, t) => ({ tensor: e, name: `tex_input_${t}` })),
              n,
              l
            )
          }
          async transpose(e, t, n, r, o, s, a) {
            const A = 'conv_transpose'
            if (!e.hasKernel(A)) {
              const t = `${i.shaderGenHeader(e.webgl2)}\n  \n  ${i.shaderGenTensorOutputUniform(1)}\n  uniform int GROUP;\n  uniform int BATCH;\n  uniform int COPG;\n  uniform int OUTAREA;\n  \n  ${i.shaderGenTensorNDGet('tex_input', 1, e.webgl2)}\n  \n  void main() {\n    ${i.shaderGenTensorOutputCoordsWithReturn(1)}\n    int rem = tex_output_flat;\n    int quo = rem / OUTAREA;\n    int x = rem - quo * OUTAREA;\n    rem = quo;\n    quo = rem / COPG;\n    int c = rem - quo * COPG;\n    rem = quo;\n    quo = rem / GROUP;\n    int g = rem - quo * GROUP;\n    int b = quo;\n  \n    float s = 0.0;\n    s = get_tex_input(((g * BATCH + b) * OUTAREA + x) * COPG + c);\n    ${i.shaderGenOutput('s', e.webgl2)}\n    return;\n  }\n  `
              e.addKernel(A, t)
            }
            const u = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [1], t, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([n.length], n, e.webgl2),
              { name: 'GROUP', type: 'int', value: r },
              { name: 'BATCH', type: 'int', value: o },
              { name: 'COPG', type: 'int', value: a },
              { name: 'OUTAREA', type: 'int', value: s },
            ]
            await e.runKernel(A, [{ tensor: t, name: 'tex_input' }], n, u)
          }
          async bias(e, t, n, r, o, s, a) {
            const A = 'conv_bias'
            if (!e.hasKernel(A)) {
              const t = `${i.shaderGenHeader(e.webgl2)}\n  \n  ${i.shaderGenTensorOutputUniform(1)}\n  uniform int BATCH;\n  uniform int COUT;\n  uniform int OUTAREA;\n  \n  ${i.shaderGenTensorNDGet('tex_input_i', 1, e.webgl2)}\n  ${i.shaderGenTensorNDGet('tex_input_b', 1, e.webgl2)}\n  \n  void main() {\n    ${i.shaderGenTensorOutputCoordsWithReturn(1)}\n    int rem = tex_output_flat;\n    int quo = rem / OUTAREA;\n    int x = rem - quo * OUTAREA;\n    rem = quo;\n    quo = rem / COUT;\n    int c = rem - quo * COUT;\n    int b = quo;\n  \n    float s = 0.0;\n    s = get_tex_input_i(tex_output_flat) + get_tex_input_b(c);\n    ${i.shaderGenOutput('s', e.webgl2)}\n    return;\n  }\n  `
              e.addKernel(A, t)
            }
            const u = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input_i', [1], t, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_input_b', [1], n, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([r.length], r, e.webgl2),
              { name: 'BATCH', type: 'int', value: o },
              { name: 'COUT', type: 'int', value: s },
              { name: 'OUTAREA', type: 'int', value: a },
            ]
            await e.runKernel(
              A,
              [
                { tensor: t, name: 'tex_input_i' },
                { tensor: n, name: 'tex_input_b' },
              ],
              r,
              u
            )
          }
        }
        ;((t.WebGLConv = a),
          (t.getOpEntries = function () {
            return [{ opType: 'Conv', backend: 'webgl', opsetMin: 1, factory: () => new a() }]
          }))
      },
      8426: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLConvTranspose = void 0))
        const r = n(9549),
          o = n(5146)
        class i extends r.ConvTranspose {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0],
              r = t[1],
              o = t[2]
            if (4 !== n.ndim) throw new Error('ConvTranspose other than 2D is not yet supported')
            const {
              batch: i,
              dilations: s,
              group: a,
              kernelShape: A,
              pads: u,
              strides: l,
              inShape: g,
              outShape: c,
              chIn: d,
              chInPerGroup: p,
              chOut: h,
              chOutPerGroup: f,
            } = this.calcShape(n.dims, r.dims)
            if (1 !== n.dimPerPixel || 1 !== r.dimPerPixel || (o && 1 !== o.dimPerPixel))
              throw new Error()
            const I = e.emptyTensor([d * i * g[0] * g[1]])
            await this.transposeInput(e, n, I, a, i, g[0] * g[1], p)
            const m = e.emptyTensor([h * A[0] * A[1] * p])
            await this.transposeWeight(e, r, m, a, p, f, A[0] * A[1])
            const E = e.emptyTensor([h * i * g[0] * g[1] * A[0] * A[1]])
            ;(await this.matmul(e, I, m, E, a, i * g[0] * g[1], f * A[0] * A[1], p),
              I.dispose(),
              m.dispose())
            const y = e.emptyTensor([i, h, c[0], c[1]])
            if (o) {
              const t = e.emptyTensor([i * h * c[0] * c[1]])
              ;(await this.col2im(e, E, t, i, s, a, A, u, l, g, c, f),
                E.dispose(),
                await this.bias(e, t, o, y, i, h, c[0] * c[1]),
                t.dispose())
            } else (await this.col2im(e, E, y, i, s, a, A, u, l, g, c, f), E.dispose())
            return [y]
          }
          async col2im(e, t, n, r, i, s, a, A, u, l, g, c) {
            const d = `convtranspose_col2im_${a[0]}_${a[1]}_${u[0]}_${u[1]}_${A[0]}_${A[1]}_${i[0]}_${i[1]}`
            if (!e.hasKernel(d)) {
              const t = `${o.shaderGenHeader(e.webgl2)}\n  \n  ${o.shaderGenTensorOutputUniform(1)}\n  #define K0 ${a[0]}\n  #define K1 ${a[1]}\n  #define S0 ${u[0]}\n  #define S1 ${u[1]}\n  #define P0 ${A[0]}\n  #define P1 ${A[1]}\n  #define D0 ${i[0]}\n  #define D1 ${i[1]}\n  uniform int GROUP;\n  uniform int BATCH;\n  uniform int O0;\n  uniform int O1;\n  uniform int COPG;\n  uniform int IS0;\n  uniform int IS1;\n  \n  ${o.shaderGenTensorNDGet('tex_input', 1, e.webgl2)}\n  \n  void main() {\n    ${o.shaderGenTensorOutputCoordsWithReturn(1)}\n    int rem = tex_output_flat;\n    int quo = rem / O1;\n    int o1 = rem - quo * O1;\n    rem = quo;\n    quo = rem / O0;\n    int o0 = rem - quo * O0;\n    rem = quo;\n    quo = rem / COPG;\n    int co = rem - quo * COPG;\n    rem = quo;\n    quo = rem / GROUP;\n    int g = rem - quo * GROUP;\n    int b = quo;\n  \n    float s = 0.0;\n    for (int k0 = 0; k0 < K0; k0++) {\n      for (int k1 = 0; k1 < K1; k1++) {\n        int i0s = o0 + P0 - k0 * D0;\n        int i1s = o1 + P1 - k1 * D1;\n        int i0 = i0s / S0;\n        if (i0s - i0 * S0 != 0 || i0 < 0 || i0 >= IS0) {\n          continue;\n        }\n        int i1 = i1s / S1;\n        if (i1s - i1 * S1 != 0 || i1 < 0 || i1 >= IS1) {\n          continue;\n        }\n        s += get_tex_input((((((g * BATCH + b) * IS0 + i0) * IS1 + i1) * COPG + co) * K0 + k0) * K1 + k1);\n      }\n    }\n    ${o.shaderGenOutput('s', e.webgl2)}\n    return;\n  }\n  `
              e.addKernel(d, t)
            }
            const p = [
              ...o.shaderGenTensorNDGetUniformItem('tex_input', [1], t, e.webgl2),
              ...o.shaderGenTensorOutputUniformItem([n.length], n, e.webgl2),
              { name: 'GROUP', type: 'int', value: s },
              { name: 'BATCH', type: 'int', value: r },
              { name: 'O0', type: 'int', value: g[0] },
              { name: 'O1', type: 'int', value: g[1] },
              { name: 'COPG', type: 'int', value: c },
              { name: 'IS0', type: 'int', value: l[0] },
              { name: 'IS1', type: 'int', value: l[1] },
            ]
            await e.runKernel(d, [{ tensor: t, name: 'tex_input' }], n, p)
          }
          async matmul(e, t, n, r, i, s, a, A) {
            const u = `convtranspose_matmul_${A}`
            if (!e.hasKernel(u)) {
              const t = `${o.shaderGenHeader(e.webgl2)}\n  \n  ${o.shaderGenTensorOutputUniform(1)}\n  #define cipg ${A}\n  uniform int GROUP;\n  uniform int BIN;\n  uniform int CKS;\n  \n  ${o.shaderGenTensorNDGet('tex_input_w', 1, e.webgl2)}\n  ${o.shaderGenTensorNDGet('tex_input_i', 1, e.webgl2)}\n  \n  void main() {\n    ${o.shaderGenTensorOutputCoordsWithReturn(1)}\n    int rem = tex_output_flat;\n    int quo = rem / CKS;\n    int x = rem - quo * CKS;\n    rem = quo;\n    quo = rem / BIN;\n    int y = rem - quo * BIN;\n    int g = quo;\n  \n    float s = 0.0;\n    for (int ip = 0; ip < cipg; ip++) {\n      s += get_tex_input_i((g * BIN + y) * cipg + ip) * get_tex_input_w((g * CKS + x) * cipg + ip);\n    }\n    ${o.shaderGenOutput('s', e.webgl2)}\n    return;\n  }\n  `
              e.addKernel(u, t)
            }
            const l = [
              ...o.shaderGenTensorNDGetUniformItem('tex_input_w', [1], n, e.webgl2),
              ...o.shaderGenTensorNDGetUniformItem('tex_input_i', [1], t, e.webgl2),
              ...o.shaderGenTensorOutputUniformItem([r.length], r, e.webgl2),
              { name: 'GROUP', type: 'int', value: i },
              { name: 'BIN', type: 'int', value: s },
              { name: 'CKS', type: 'int', value: a },
            ]
            await e.runKernel(
              u,
              [
                { tensor: n, name: 'tex_input_w' },
                { tensor: t, name: 'tex_input_i' },
              ],
              r,
              l
            )
          }
          async transposeInput(e, t, n, r, i, s, a) {
            const A = 'convtranspose_transpose_input',
              u = `${o.shaderGenHeader(e.webgl2)}\n\n${o.shaderGenTensorOutputUniform(4)}\n\n${o.shaderGenTensorNDGet('tex_input', 4, e.webgl2)}\n\nvoid main() {\n  ${o.shaderGenTensorOutputCoordsWithReturn(4)}\n  float s = get_tex_input(tex_output_0, tex_output_1, tex_output_2, tex_output_3);\n  ${o.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(A, u)
            const l = [
              ...o.shaderGenTensorNDGetUniformItem(
                'tex_input',
                [a * s, r * a * s, 1, s],
                t,
                e.webgl2
              ),
              ...o.shaderGenTensorOutputUniformItem([r, i, s, a], n, e.webgl2),
            ]
            await e.runKernel(A, [{ tensor: t, name: 'tex_input' }], n, l)
          }
          async transposeWeight(e, t, n, r, i, s, a) {
            const A = 'convtranspose_transpose_weight',
              u = `${o.shaderGenHeader(e.webgl2)}\n\n${o.shaderGenTensorOutputUniform(4)}\n\n${o.shaderGenTensorNDGet('tex_input', 4, e.webgl2)}\n\nvoid main() {\n  ${o.shaderGenTensorOutputCoordsWithReturn(4)}\n  float s = get_tex_input(tex_output_0, tex_output_1, tex_output_2, tex_output_3);\n  ${o.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(A, u)
            const l = [
              ...o.shaderGenTensorNDGetUniformItem(
                'tex_input',
                [i * s * a, a, 1, s * a],
                t,
                e.webgl2
              ),
              ...o.shaderGenTensorOutputUniformItem([r, s, a, i], n, e.webgl2),
            ]
            await e.runKernel(A, [{ tensor: t, name: 'tex_input' }], n, l)
          }
          async bias(e, t, n, r, i, s, a) {
            const A = 'convtranspose_bias'
            if (!e.hasKernel(A)) {
              const t = `${o.shaderGenHeader(e.webgl2)}\n  \n  ${o.shaderGenTensorOutputUniform(1)}\n  uniform int BATCH;\n  uniform int COUT;\n  uniform int OUTAREA;\n  \n  ${o.shaderGenTensorNDGet('tex_input_i', 1, e.webgl2)}\n  ${o.shaderGenTensorNDGet('tex_input_b', 1, e.webgl2)}\n  \n  void main() {\n    ${o.shaderGenTensorOutputCoordsWithReturn(1)}\n    int rem = tex_output_flat;\n    int quo = rem / OUTAREA;\n    int x = rem - quo * OUTAREA;\n    rem = quo;\n    quo = rem / COUT;\n    int c = rem - quo * COUT;\n    int b = quo;\n  \n    float s = 0.0;\n    s = get_tex_input_i(tex_output_flat) + get_tex_input_b(c);\n    ${o.shaderGenOutput('s', e.webgl2)}\n    return;\n  }\n  `
              e.addKernel(A, t)
            }
            const u = [
              ...o.shaderGenTensorNDGetUniformItem('tex_input_i', [1], t, e.webgl2),
              ...o.shaderGenTensorNDGetUniformItem('tex_input_b', [1], n, e.webgl2),
              ...o.shaderGenTensorOutputUniformItem([r.length], r, e.webgl2),
              { name: 'BATCH', type: 'int', value: i },
              { name: 'COUT', type: 'int', value: s },
              { name: 'OUTAREA', type: 'int', value: a },
            ]
            await e.runKernel(
              A,
              [
                { tensor: t, name: 'tex_input_i' },
                { tensor: n, name: 'tex_input_b' },
              ],
              r,
              u
            )
          }
        }
        ;((t.WebGLConvTranspose = i),
          (t.getOpEntries = function () {
            return [
              { opType: 'ConvTranspose', backend: 'webgl', opsetMin: 1, factory: () => new i() },
            ]
          }))
      },
      3223: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(5543)
        class o extends r.Flatten {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0],
              r = this.calcShape(n)
            return [n.alias(r)]
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Flatten', backend: 'webgl', opsetMin: 1, factory: () => new o() }]
        }
      },
      8236: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLGemm = void 0))
        const r = n(5620),
          o = n(2055),
          i = n(5146)
        class s extends r.Gemm {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0],
              r = t[1],
              o = t[2]
            if (o) return this.runWithC(e, n, r, o)
            throw new Error()
          }
          async runWithC(e, t, n, r) {
            const {
                m: s,
                n: a,
                k: A,
                strideA: [u, l],
                strideB: [g, c],
              } = this.calcShape(t.dims, n.dims),
              [d, p] = o.broadcastUni([s, a], r.dims)
            if (1 !== t.dimPerPixel || 1 !== n.dimPerPixel || 1 !== r.dimPerPixel) throw new Error()
            const h = e.emptyTensor([s, a], 'float32'),
              f = `${i.shaderGenHeader(e.webgl2)}\n\n#define m ${s}\n#define n ${a}\n#define k ${A}\n${i.shaderGenTensorOutputUniform(2)}\nuniform float alpha;\nuniform float beta;\n\n${i.shaderGenTensorNDGet('tex_input_a', 2, e.webgl2)}\n${i.shaderGenTensorNDGet('tex_input_b', 2, e.webgl2)}\n${i.shaderGenTensorNDGet('tex_input_c', 2, e.webgl2)}\n\nvoid main() {\n  ${i.shaderGenTensorOutputCoordsWithReturn(2)}\n  float s = 0.0;\n  for (int ip = 0; ip < k; ip++) {\n    s += get_tex_input_a(tex_output_0, ip) * get_tex_input_b(ip, tex_output_1);\n  }\n  s *= alpha;\n  s += beta * get_tex_input_c(tex_output_0, tex_output_1);\n  ${i.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`,
              I = `gemm_${s}_${a}_${A}`
            e.addKernel(I, f)
            const m = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input_a', [u, l], t, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_input_b', [g, c], n, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_input_c', [d, p], r, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([s, a], h, e.webgl2),
              { name: 'alpha', type: 'float', value: this.alpha },
              { name: 'beta', type: 'float', value: this.beta },
            ]
            return (
              await e.runKernel(
                I,
                [
                  { tensor: t, name: 'tex_input_a' },
                  { tensor: n, name: 'tex_input_b' },
                  { tensor: r, name: 'tex_input_c' },
                ],
                h,
                m
              ),
              [h]
            )
          }
        }
        ;((t.WebGLGemm = s),
          (t.getOpEntries = function () {
            return [{ opType: 'Gemm', backend: 'webgl', opsetMin: 1, factory: () => new s() }]
          }))
      },
      6844: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLGlobalAveragePool = void 0))
        const r = n(3381),
          o = n(5760)
        class i extends r.OperatorImpl {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0]
            if (4 !== n.ndim) throw new Error('MaxPool other than 2D is not yet supported')
            if (1 !== n.dimPerPixel) throw new Error()
            const r = n.dims[0],
              i = n.dims[1],
              s = [n.dims[2], n.dims[3]],
              a = [1, 1],
              A = e.emptyTensor([r, i, a[0], a[1]], 'float32')
            return (await o.averagepool(e, n, A, !0, r, s, [0, 0, 0, 0], [1, 1], s, a, i), [A])
          }
        }
        ;((t.WebGLGlobalAveragePool = i),
          (t.getOpEntries = function () {
            return [
              {
                opType: 'GlobalAveragePool',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i(),
              },
            ]
          }))
      },
      8862: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.InstanceNormalization = void 0))
        const r = n(3381),
          o = n(2055),
          i = n(5146)
        class s extends r.OperatorImpl {
          constructor() {
            super('webgl')
          }
          initialize(e) {
            ;(super.initialize(e), (this.epsilon = o.getAttrInt(e, 'epsilon', 1e-5)))
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const [n, r, i] = t
            if (!e.webgl2) throw new Error('InstanceNormalization: WebGL1 is not supported')
            const s = o.arrayProd(n.dims.slice(2)),
              [a, A] = n.dims,
              u = e.emptyTensor([a * A * 4], 'float32', { dimPerPixel: 4 })
            await this.calcStat(e, a, A, s, this.epsilon, n, r, i, u)
            const l = e.emptyTensor(n.dims, n.dataType)
            return (await this.calcOutput2(e, a, A, s, n, u, l), u.dispose(), [l])
          }
          async calcStat(e, t, n, r, o, s, a, A, u) {
            const l = `instancenormalization_stats_${r}`,
              g = `${i.shaderGenHeader(e.webgl2)}\n\n#define reductionLength ${r}\nuniform float epsilon;\n${i.shaderGenTensorOutputUniform(2)}\n${i.shaderGenTensorNDGet('tex_input', 3, e.webgl2)}\n${i.shaderGenTensorNDGet('tex_scale', 1, e.webgl2)}\n${i.shaderGenTensorNDGet('tex_bias', 1, e.webgl2)}\n\nvoid main() {\n  ${i.shaderGenTensorOutputCoordsWithReturn(2)}\n  float s_sum = 0.0;\n  float s_sqsum = 0.0;\n  for (int i = 0; i < reductionLength; i++) {\n    float v = get_tex_input(tex_output_0, tex_output_1, i);\n    s_sum += v;\n    s_sqsum += v * v;\n  }\n  float s_mean = s_sum / float(reductionLength);\n  float s_var = s_sqsum / float(reductionLength) - s_mean * s_mean + epsilon;\n  float s_invstd = inversesqrt(s_var);\n  float s_scale = get_tex_scale(tex_output_1) * s_invstd;\n  float s_bias = -s_mean * s_scale + get_tex_bias(tex_output_1);\n\n  vec4 s = vec4(s_scale, s_bias, 0.0, 0.0);\n  ${i.shaderGenOutputVec4('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(l, g)
            const c = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [n * r, r, 1], s, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_scale', a.strides, a, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_bias', A.strides, A, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([t, n], u, e.webgl2),
              { name: 'epsilon', value: o, type: 'float' },
            ]
            await e.runKernel(
              l,
              [
                { tensor: s, name: 'tex_input' },
                { tensor: a, name: 'tex_scale' },
                { tensor: A, name: 'tex_bias' },
              ],
              u,
              c
            )
          }
          async calcOutput2(e, t, n, r, o, s, a) {
            const A = 'instancenormalization_output',
              u = `${i.shaderGenHeader(e.webgl2)}\n\n${i.shaderGenTensorOutputUniform(3)}\n\n${i.shaderGenTensorNDGet('tex_input', 3, e.webgl2)}\n${i.shaderGenTensorNDGetVec4('tex_stats', 2, e.webgl2)}\n\nvoid main() {\n  ${i.shaderGenTensorOutputCoordsWithReturn(3)}\n  vec4 m = get_vec4_tex_stats(tex_output_0, tex_output_1);\n  float v = get_tex_input(tex_output_0, tex_output_1, tex_output_2);\n  float s = v * m.r + m.g;\n  ${i.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(A, u)
            const l = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [n * r, r, 1], o, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_stats', [n, 1], s, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([t, n, r], a, e.webgl2),
            ]
            await e.runKernel(
              A,
              [
                { tensor: o, name: 'tex_input' },
                { tensor: s, name: 'tex_stats' },
              ],
              a,
              l
            )
          }
        }
        ;((t.InstanceNormalization = s),
          (t.getOpEntries = function () {
            return [
              {
                opType: 'InstanceNormalization',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new s(),
              },
            ]
          }))
      },
      2451: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLMatMul = void 0))
        const r = n(5146),
          o = n(5818)
        class i extends o.MatMul {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0],
              r = t[1]
            if ('float32' !== n.dataType || 'float32' !== r.dataType)
              throw new Error('only float32 is supported')
            if (1 !== n.dimPerPixel || 1 !== r.dimPerPixel) throw new Error()
            const {
                resultLength: o,
                resultDims: i,
                resultStrides: s,
                resultDimsAfterSqueeze: a,
                stridesA: A,
                stridesB: u,
                innerProductLength: l,
              } = this.calcShape(n.dims, r.dims),
              g = e.emptyTensor(a, 'float32')
            if (2 === i.length) await this.calcDim2(e, n, r, g, i, s, A, u, l)
            else {
              if (3 !== i.length) throw new Error()
              await this.calcDim3(e, n, r, g, i, s, A, u, l)
            }
            return [g]
          }
          async calcDim2(e, t, n, o, i, s, a, A, u) {
            const l = e.webgl2
                ? `${r.shaderGenHeader(e.webgl2)}\n\n#define innerProductLength ${u}\n${r.shaderGenTensorOutputUniform(i.length)}\n\nuniform sampler2D tex_input_a;\nuniform int tex_input_a_stride_0;\nuniform int tex_input_a_stride_1;\n\nivec2 get_coord_a(int d0) {\n  int flat_index = d0 * tex_input_a_stride_0;\n  int texture_w = textureSize(tex_input_a, 0).x;\n  int y = flat_index / texture_w;\n  int x = flat_index - y * texture_w;\n  return ivec2(x, y);\n}\n\nuniform sampler2D tex_input_b;\nuniform int tex_input_b_stride_0;\nuniform int tex_input_b_stride_1;\n\nivec2 get_coord_b(int d1) {\n  int flat_index = d1 * tex_input_b_stride_1;\n  int texture_w = textureSize(tex_input_b, 0).x;\n  int y = flat_index / texture_w;\n  int x = flat_index - y * texture_w;\n  return ivec2(x, y);\n}\n\nvoid main() {\n  ${r.shaderGenTensorOutputCoordsWithReturn(i.length)}\n  float s = 0.0;\n  ivec2 c_a = get_coord_a(tex_output_0);\n  ivec2 c_b = get_coord_b(tex_output_1);\n  int texture_w_a = textureSize(tex_input_a, 0).x;\n  int texture_w_b = textureSize(tex_input_b, 0).x;\n  for (int ip = 0; ip < innerProductLength; ip++) {\n    s += texelFetch(tex_input_a, c_a, 0).r * texelFetch(tex_input_b, c_b, 0).r;\n    c_a.x += tex_input_a_stride_1;\n    if (c_a.x >= texture_w_a) {\n      c_a = ivec2(c_a.x - texture_w_a, c_a.y + 1);\n    }\n    c_b.x += tex_input_b_stride_0;\n    if (c_b.x >= texture_w_b) {\n      c_b = ivec2(c_b.x - texture_w_b, c_b.y + 1);\n    }\n  }\n  ${r.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
                : `${r.shaderGenHeader(e.webgl2)}\n\n#define innerProductLength ${u}\n${r.shaderGenTensorOutputUniform(i.length)}\n\n${r.shaderGenTensorNDGet('tex_input_a', 2, e.webgl2)}\n${r.shaderGenTensorNDGet('tex_input_b', 2, e.webgl2)}\n\nvoid main() {\n  ${r.shaderGenTensorOutputCoordsWithReturn(i.length)}\n  float s = 0.0;\n  for (int ip = 0; ip < innerProductLength; ip++) {\n    s += get_tex_input_a(tex_output_0, ip) * get_tex_input_b(ip, tex_output_1);\n  }\n  ${r.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`,
              g = `matmul_2_${u}`
            e.addKernel(g, l)
            const c = [
              ...r.shaderGenTensorNDGetUniformItem('tex_input_a', a, t, e.webgl2),
              ...r.shaderGenTensorNDGetUniformItem('tex_input_b', A, n, e.webgl2),
              ...r.shaderGenTensorOutputUniformItem(i, o, e.webgl2),
            ]
            await e.runKernel(
              g,
              [
                { tensor: t, name: 'tex_input_a' },
                { tensor: n, name: 'tex_input_b' },
              ],
              o,
              c
            )
          }
          async calcDim3(e, t, n, o, i, s, a, A, u) {
            const l = e.webgl2
                ? `${r.shaderGenHeader(e.webgl2)}\n\n#define innerProductLength ${u}\n${r.shaderGenTensorOutputUniform(i.length)}\n\nuniform sampler2D tex_input_a;\nuniform int tex_input_a_stride_0;\nuniform int tex_input_a_stride_1;\nuniform int tex_input_a_stride_2;\n\nivec2 get_coord_a(int d0, int d1) {\n  int flat_index = d0 * tex_input_a_stride_0 + d1 * tex_input_a_stride_1;\n  int texture_w = textureSize(tex_input_a, 0).x;\n  int y = flat_index / texture_w;\n  int x = flat_index - y * texture_w;\n  return ivec2(x, y);\n}\n\nuniform sampler2D tex_input_b;\nuniform int tex_input_b_stride_0;\nuniform int tex_input_b_stride_1;\nuniform int tex_input_b_stride_2;\n\nivec2 get_coord_b(int d0, int d2) {\n  int flat_index = d0 * tex_input_b_stride_0 + d2 * tex_input_b_stride_2;\n  int texture_w = textureSize(tex_input_b, 0).x;\n  int y = flat_index / texture_w;\n  int x = flat_index - y * texture_w;\n  return ivec2(x, y);\n}\n\nvoid main() {\n  ${r.shaderGenTensorOutputCoordsWithReturn(i.length)}\n  float s = 0.0;\n  ivec2 c_a = get_coord_a(tex_output_0, tex_output_1);\n  ivec2 c_b = get_coord_b(tex_output_0, tex_output_2);\n  int texture_w_a = textureSize(tex_input_a, 0).x;\n  int texture_w_b = textureSize(tex_input_b, 0).x;\n  for (int ip = 0; ip < innerProductLength; ip++) {\n    s += texelFetch(tex_input_a, c_a, 0).r * texelFetch(tex_input_b, c_b, 0).r;\n    c_a.x += tex_input_a_stride_2;\n    if (c_a.x >= texture_w_a) {\n      c_a = ivec2(c_a.x - texture_w_a, c_a.y + 1);\n    }\n    c_b.x += tex_input_b_stride_1;\n    if (c_b.x >= texture_w_b) {\n      c_b = ivec2(c_b.x - texture_w_b, c_b.y + 1);\n    }\n  }\n  ${r.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
                : `${r.shaderGenHeader(e.webgl2)}\n\n#define innerProductLength ${u}\n${r.shaderGenTensorOutputUniform(i.length)}\n\n${r.shaderGenTensorNDGet('tex_input_a', 3, e.webgl2)}\n${r.shaderGenTensorNDGet('tex_input_b', 3, e.webgl2)}\n\nvoid main() {\n  ${r.shaderGenTensorOutputCoordsWithReturn(i.length)}\n  float s = 0.0;\n  for (int ip = 0; ip < innerProductLength; ip++) {\n    s += get_tex_input_a(tex_output_0, tex_output_1, ip) * get_tex_input_b(tex_output_0, ip, tex_output_2);\n  }\n  ${r.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`,
              g = `matmul_3_${u}`
            if ((e.addKernel(g, l), a[2] > t.textureWidth || A[1] > n.textureWidth))
              throw new Error('MatMul: kernel assumption does not hold')
            const c = [
              ...r.shaderGenTensorNDGetUniformItem('tex_input_a', a, t, e.webgl2),
              ...r.shaderGenTensorNDGetUniformItem('tex_input_b', A, n, e.webgl2),
              ...r.shaderGenTensorOutputUniformItem(i, o, e.webgl2),
            ]
            await e.runKernel(
              g,
              [
                { tensor: t, name: 'tex_input_a' },
                { tensor: n, name: 'tex_input_b' },
              ],
              o,
              c
            )
          }
        }
        ;((t.WebGLMatMul = i),
          (t.getOpEntries = function () {
            return [{ opType: 'MatMul', backend: 'webgl', opsetMin: 1, factory: () => new i() }]
          }))
      },
      2581: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLMaxPool = void 0))
        const r = n(3369),
          o = n(5146)
        class i extends r.MaxPool {
          constructor() {
            super('webgl')
          }
          async run(e, t, n) {
            e.assertsWebGLTensorArray(t)
            const r = t[0]
            if (1 !== n) throw new Error('MaxPool: output indices is not yet supported')
            if (4 !== r.ndim) throw new Error('MaxPool other than 2D is not yet supported')
            if (1 !== r.dimPerPixel) throw new Error()
            const {
                batch: i,
                dilations: s,
                kernelShape: a,
                pads: A,
                strides: u,
                inShape: l,
                outShape: g,
                ch: c,
              } = this.calcShape(r.dims),
              d = e.emptyTensor([i, c, g[0], g[1]], 'float32'),
              p = `maxpool_${a[0]}_${a[1]}`,
              h = `${o.shaderGenHeader(e.webgl2)}\n\n#define K0 ${a[0]}\n#define K1 ${a[1]}\nuniform int CH;\nuniform int S0;\nuniform int S1;\nuniform int P0;\nuniform int P1;\nuniform int D0;\nuniform int D1;\nuniform int IS0;\nuniform int IS1;\n${o.shaderGenTensorOutputUniform(4)}\n\n${o.shaderGenTensorNDGet('tex_input', 4, e.webgl2)}\n\nvoid main() {\n  ${o.shaderGenTensorOutputCoordsWithReturn(4)}\n  float s = -65536.0;\n  for (int k0 = 0; k0 < K0; k0++) {\n    for (int k1 = 0; k1 < K1; k1++) {\n      int in0 = tex_output_2 * S0 - P0 + k0 * D0;\n      int in1 = tex_output_3 * S1 - P1 + k1 * D1;\n      if (in0 >= 0 && in0 < IS0 && in1 >= 0 && in1 < IS1) {\n        float v = get_tex_input(tex_output_0, tex_output_1, in0, in1);\n        if (v > s) {\n          s = v;\n        }\n      }\n    }\n  }\n  ${o.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(p, h)
            const f = [
              ...o.shaderGenTensorNDGetUniformItem('tex_input', r.strides, r, e.webgl2),
              ...o.shaderGenTensorOutputUniformItem(d.dims, d, e.webgl2),
              { name: 'CH', type: 'int', value: c },
              { name: 'S0', type: 'int', value: u[0] },
              { name: 'S1', type: 'int', value: u[1] },
              { name: 'P0', type: 'int', value: A[0] },
              { name: 'P1', type: 'int', value: A[1] },
              { name: 'D0', type: 'int', value: s[0] },
              { name: 'D1', type: 'int', value: s[1] },
              { name: 'IS0', type: 'int', value: l[0] },
              { name: 'IS1', type: 'int', value: l[1] },
            ]
            return (await e.runKernel(p, [{ tensor: r, name: 'tex_input' }], d, f), [d])
          }
        }
        ;((t.WebGLMaxPool = i),
          (t.getOpEntries = function () {
            return [{ opType: 'MaxPool', backend: 'webgl', opsetMin: 1, factory: () => new i() }]
          }))
      },
      7913: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(5082),
          o = n(5146),
          i = n(1908)
        class s extends r.Pad11 {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            const [n, r, s] = t
            ;(e.assertsWebGLTensor(n), e.cpuContext.assertsCPUTensor(r))
            const { outputShape: a, pads: A } = this.calcShape(n, r)
            let u = 0
            s && (e.cpuContext.assertsCPUTensor(s), (u = s.data[0]))
            const l = e.emptyTensor(a, 'float32'),
              g = `pad_${a.length}_${this.mode}`,
              c = i
                .arange(a.length)
                .map((e) => `uniform int pad${e};`)
                .join(''),
              d = i
                .arange(a.length)
                .map((e) => `uniform int inShape${e};`)
                .join(''),
              p = 'constant' === this.mode ? 'uniform float padConstant;' : '',
              h = i
                .arange(a.length)
                .map((e) => `ti${e}`)
                .join(','),
              f = i
                .arange(a.length)
                .map((e) => `int ti${e} = tex_output_${e} - pad${e};`)
                .join(''),
              I = i
                .arange(a.length)
                .map((e) => `ti${e} < 0 || ti${e} >= inShape${e}`)
                .join('||')
            let m, E
            switch (this.mode) {
              case 'constant':
                ;((m = ''), (E = `if (${I}) {s = padConstant;} else {s = get_tex_input(${h});}`))
                break
              case 'edge':
                ;((m = i
                  .arange(a.length)
                  .map(
                    (e) =>
                      `if (ti${e} < 0) {ti${e} = 0;} else if (ti${e} >= inShape${e}) {ti${e} = inShape${e} - 1;}`
                  )
                  .join('')),
                  (E = `s = get_tex_input(${h});`))
                break
              case 'reflect':
                ;((m = i
                  .arange(a.length)
                  .map(
                    (e) =>
                      `if (ti${e} < 0) {ti${e} = pad_mod(-ti${e}, inShape${e} * 2 - 2); if (ti${e} >= inShape${e}) {ti${e} = inShape${e} * 2 - ti${e} - 2;}} else if (ti${e} >= inShape${e}) {ti${e} = pad_mod(ti${e}, inShape${e} * 2 - 2); if (ti${e} >= inShape${e}) {ti${e} = inShape${e} * 2 - ti${e} - 2;}}`
                  )
                  .join('')),
                  (E = `s = get_tex_input(${h});`))
            }
            const y = `${o.shaderGenHeader(e.webgl2)}\nint pad_mod(int x, int y) {\n    int z = x / y;\n    return x - z * y;\n}\n${c}\n${p}\n${d}\n${o.shaderGenTensorOutputUniform(a.length)}\n\n${o.shaderGenTensorNDGet('tex_input', n.ndim, e.webgl2)}\n\nvoid main() {\n${o.shaderGenTensorOutputCoordsWithReturn(a.length)}\n${f}\n${m}\nfloat s;\n${E}\n${o.shaderGenOutput('s', e.webgl2)}\nreturn;\n}\n`
            e.addKernel(g, y)
            const C = [
              ...o.shaderGenTensorNDGetUniformItem('tex_input', n.strides, n, e.webgl2),
              ...o.shaderGenTensorOutputUniformItem(a, l, e.webgl2),
            ]
            for (let e = 0; e < a.length; e++)
              (C.push({ name: `pad${e}`, value: A[e], type: 'int' }),
                C.push({ name: `inShape${e}`, value: n.dims[e], type: 'int' }))
            return (
              'constant' === this.mode && C.push({ name: 'padConstant', value: u, type: 'float' }),
              await e.runKernel(g, [{ tensor: n, name: 'tex_input' }], l, C),
              [l]
            )
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Pad', backend: 'webgl', opsetMin: 11, factory: () => new s() }]
        }
      },
      6085: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.ReduceOp = void 0))
        const r = n(3381),
          o = n(2055),
          i = n(5146)
        class s extends r.OperatorImpl {
          constructor(e, t, n, r) {
            ;(super('webgl'),
              (this.opType = e),
              (this.shaderInit = t),
              (this.shaderAccum = n),
              (this.shaderOutput = r))
          }
          initialize(e) {
            ;(super.initialize(e),
              (this.axes = o.getAttrInts(e, 'axes', [])),
              (this.keepdims = 0 !== o.getAttrInt(e, 'keepdims', 1)))
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0]
            if (1 !== this.axes.length)
              throw new Error(`${this.opType}: only single axis is supported`)
            let r = this.axes[0]
            if ((r < 0 && (r += n.ndim), r !== n.ndim - 1))
              throw new Error(`${this.opType}: currently only reducing final axis is supported`)
            const o = n.dims[r],
              s = n.length / o,
              a = n.dims.slice()
            this.keepdims ? (a[r] = 1) : a.pop()
            const A = e.emptyTensor(a, n.dataType),
              u = `reduceop_${this.opType}_${o}`,
              l = `${i.shaderGenHeader(e.webgl2)}\n\n#define reductionLength ${o}\n#define reductionMul ${1 / o}\n${i.shaderGenTensorOutputUniform(1)}\n\n${i.shaderGenTensorNDGet('tex_input', 2, e.webgl2)}\n\nvoid main() {\n  ${i.shaderGenTensorOutputCoordsWithReturn(1)}\n  float s = ${this.shaderInit}\n  for (int i = 0; i < reductionLength; i++) {\n    float v = get_tex_input(tex_output_0, i);\n    ${this.shaderAccum}\n  }\n  ${this.shaderOutput}\n  ${i.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(u, l)
            const g = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [o, 1], n, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([s], A, e.webgl2),
            ]
            return (await e.runKernel(u, [{ tensor: n, name: 'tex_input' }], A, g), [A])
          }
        }
        ;((t.ReduceOp = s),
          (t.getOpEntries = function () {
            return [
              {
                opType: 'ReduceL1',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new s('ReduceL1', '0.0;', 's += abs(v);', ''),
              },
              {
                opType: 'ReduceL2',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new s('ReduceL2', '0.0;', 's += v * v;', 's = sqrt(s);'),
              },
              {
                opType: 'ReduceLogSum',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new s('ReduceLogSum', '0.0;', 's += v;', 's = log(s);'),
              },
              {
                opType: 'ReduceLogSumExp',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new s('ReduceLogSumExp', '0.0;', 's += exp(v);', 's = log(s);'),
              },
              {
                opType: 'ReduceMax',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new s('ReduceMax', '-65536.0;', 'if (v > s) { s = v; }', ''),
              },
              {
                opType: 'ReduceMean',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new s('ReduceMean', '0.0;', 's += v;', 's *= reductionMul;'),
              },
              {
                opType: 'ReduceMin',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new s('ReduceMin', '65536.0;', 'if (v < s) { s = v; }', ''),
              },
              {
                opType: 'ReduceProd',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new s('ReduceProd', '1.0;', 's *= v;', ''),
              },
              {
                opType: 'ReduceSum',
                backend: 'webgl',
                opsetMin: 1,
                opsetMax: 13,
                factory: () => new s('ReduceSum', '0.0;', 's += v;', ''),
              },
              {
                opType: 'ReduceSumSquare',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new s('ReduceSumSquare', '0.0;', 's += v * v;', ''),
              },
            ]
          }))
      },
      6037: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLReshape5 = void 0))
        const r = n(4574)
        class o extends r.Reshape5 {
          constructor() {
            super('webgl')
          }
          getTensorBackendRequirement(e, t) {
            return [this.backend, 'cpu']
          }
          async run(e, t) {
            const n = t[0],
              r = t[1]
            if (!e.cpuContext.isCPUTensor(r)) throw new Error('Reshape: shapeTensor is not on cpu.')
            if (!e.isWebGLTensor(n)) throw new Error('Reshape: input is not on webgl.')
            const o = this.calcShape(n, r)
            return [n.alias(o)]
          }
        }
        ;((t.WebGLReshape5 = o),
          (t.getOpEntries = function () {
            return [{ opType: 'Reshape', backend: 'webgl', opsetMin: 5, factory: () => new o() }]
          }))
      },
      9506: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.Softmax = void 0))
        const r = n(3381),
          o = n(2055),
          i = n(5146)
        class s extends r.OperatorImpl {
          constructor() {
            super('webgl')
          }
          initialize(e) {
            ;(super.initialize(e), (this.axis = o.getAttrInt(e, 'axis', -1)))
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0]
            let { axis: r } = this
            if ((r < 0 && (r += n.ndim), r !== n.ndim - 1))
              throw new Error('Softmax: currently only reducing final axis is supported')
            const o = n.dims[r],
              i = n.length / o
            if (e.webgl2) {
              const t = e.emptyTensor([4 * i], 'float32', { dimPerPixel: 4 })
              await this.calcMax2(e, i, o, n, t)
              const r = e.emptyTensor(n.dims, n.dataType)
              return (await this.calcOutput2(e, i, o, n, t, r), t.dispose(), [r])
            }
            {
              const t = e.emptyTensor([i])
              await this.calcMax(e, i, o, n, t)
              const r = e.emptyTensor([i])
              await this.calcSumExp(e, i, o, n, t, r)
              const s = e.emptyTensor(n.dims, n.dataType)
              return (await this.calcOutput(e, i, o, n, t, r, s), t.dispose(), r.dispose(), [s])
            }
          }
          async calcMax2(e, t, n, r, o) {
            const s = `softmax_max_${n}`,
              a = `${i.shaderGenHeader(e.webgl2)}\n\n#define reductionLength ${n}\n${i.shaderGenTensorOutputUniform(1)}\nuniform sampler2D tex_input;\nuniform int tex_input_stride_0;\nuniform int tex_input_stride_1;\n\nivec2 get_coord(int d0) {\n  int flat_index = d0 * tex_input_stride_0;\n  int texture_w = textureSize(tex_input, 0).x;\n  int y = flat_index / texture_w;\n  int x = flat_index - y * texture_w;\n  return ivec2(x, y);\n}\n\nvoid main() {\n  ${i.shaderGenTensorOutputCoordsWithReturn(1)}\n  int texture_w = textureSize(tex_input, 0).x;\n  ivec2 c_init = get_coord(tex_output_0);\n  ivec2 c_i = c_init;\n  float s_max = texelFetch(tex_input, c_i, 0).r;\n  c_i.x += 1;\n  if (c_i.x >= texture_w) {\n    c_i = ivec2(0, c_i.y + 1);\n  }\n  for (int i = 1; i < reductionLength; i++) {\n    float v = texelFetch(tex_input, c_i, 0).r;\n    if (v > s_max) {\n      s_max = v;\n    }\n    c_i.x += 1;\n    if (c_i.x >= texture_w) {\n      c_i = ivec2(0, c_i.y + 1);\n    }\n  }\n  c_i = c_init;\n  float s_sum_exp = 0.0;\n  for (int i = 0; i < reductionLength; i++) {\n    float v = texelFetch(tex_input, c_i, 0).r;\n    s_sum_exp += exp(v - s_max);\n    c_i.x += 1;\n    if (c_i.x >= texture_w) {\n      c_i = ivec2(0, c_i.y + 1);\n    }\n  }\n  s_sum_exp = 1.0 / s_sum_exp;\n\n  vec4 s = vec4(s_max, s_sum_exp, 0.0, 0.0);\n  ${i.shaderGenOutputVec4('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(s, a)
            const A = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [n, 1], r, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([t], o, e.webgl2),
            ]
            await e.runKernel(s, [{ tensor: r, name: 'tex_input' }], o, A)
          }
          async calcOutput2(e, t, n, r, o, s) {
            const a = 'softmax_output',
              A = `${i.shaderGenHeader(e.webgl2)}\n\n${i.shaderGenTensorOutputUniform(2)}\n\n${i.shaderGenTensorNDGet('tex_input', 2, e.webgl2)}\n${i.shaderGenTensorNDGetVec4('tex_max_sum_exp', 1, e.webgl2)}\n\nvoid main() {\n  ${i.shaderGenTensorOutputCoordsWithReturn(2)}\n  vec4 m = get_vec4_tex_max_sum_exp(tex_output_0);\n  float v = get_tex_input(tex_output_0, tex_output_1);\n  float s = exp(v - m.r) * m.g;\n  ${i.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(a, A)
            const u = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [n, 1], r, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_max_sum_exp', [1], o, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([t, n], s, e.webgl2),
            ]
            await e.runKernel(
              a,
              [
                { tensor: r, name: 'tex_input' },
                { tensor: o, name: 'tex_max_sum_exp' },
              ],
              s,
              u
            )
          }
          async calcMax(e, t, n, r, o) {
            const s = `softmax_max_${n}`,
              a = `${i.shaderGenHeader(e.webgl2)}\n\n#define reductionLength ${n}\n${i.shaderGenTensorOutputUniform(1)}\n\n${i.shaderGenTensorNDGet('tex_input', 2, e.webgl2)}\n\nvoid main() {\n  ${i.shaderGenTensorOutputCoordsWithReturn(1)}\n  float s = get_tex_input(tex_output_0, 0);\n  for (int i = 1; i < reductionLength; i++) {\n    float v = get_tex_input(tex_output_0, i);\n    if (v > s) {\n      s = v;\n    }\n  }\n  ${i.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(s, a)
            const A = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [n, 1], r, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([t], o, e.webgl2),
            ]
            await e.runKernel(s, [{ tensor: r, name: 'tex_input' }], o, A)
          }
          async calcSumExp(e, t, n, r, o, s) {
            const a = `softmax_sumexp_${n}`,
              A = `${i.shaderGenHeader(e.webgl2)}\n\n#define reductionLength ${n}\n${i.shaderGenTensorOutputUniform(1)}\n\n${i.shaderGenTensorNDGet('tex_input', 2, e.webgl2)}\n${i.shaderGenTensorNDGet('tex_max', 1, e.webgl2)}\n\nvoid main() {\n  ${i.shaderGenTensorOutputCoordsWithReturn(1)}\n  float s = 0.0;\n  float m = get_tex_max(tex_output_0);\n  for (int i = 0; i < reductionLength; i++) {\n    float v = get_tex_input(tex_output_0, i);\n    s += exp(v - m);\n  }\n  s = 1.0 / s;\n  ${i.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(a, A)
            const u = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [n, 1], r, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_max', [1], o, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([t], s, e.webgl2),
            ]
            await e.runKernel(
              a,
              [
                { tensor: r, name: 'tex_input' },
                { tensor: o, name: 'tex_max' },
              ],
              s,
              u
            )
          }
          async calcOutput(e, t, n, r, o, s, a) {
            const A = 'softmax_output',
              u = `${i.shaderGenHeader(e.webgl2)}\n\n${i.shaderGenTensorOutputUniform(2)}\n\n${i.shaderGenTensorNDGet('tex_input', 2, e.webgl2)}\n${i.shaderGenTensorNDGet('tex_max', 1, e.webgl2)}\n${i.shaderGenTensorNDGet('tex_sumexp', 1, e.webgl2)}\n\nvoid main() {\n  ${i.shaderGenTensorOutputCoordsWithReturn(2)}\n  float m = get_tex_max(tex_output_0);\n  float se = get_tex_sumexp(tex_output_0);\n  float v = get_tex_input(tex_output_0, tex_output_1);\n  float s = exp(v - m) * se;\n  ${i.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(A, u)
            const l = [
              ...i.shaderGenTensorNDGetUniformItem('tex_input', [n, 1], r, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_max', [1], o, e.webgl2),
              ...i.shaderGenTensorNDGetUniformItem('tex_sumexp', [1], s, e.webgl2),
              ...i.shaderGenTensorOutputUniformItem([t, n], a, e.webgl2),
            ]
            await e.runKernel(
              A,
              [
                { tensor: r, name: 'tex_input' },
                { tensor: o, name: 'tex_max' },
                { tensor: s, name: 'tex_sumexp' },
              ],
              a,
              l
            )
          }
        }
        ;((t.Softmax = s),
          (t.getOpEntries = function () {
            return [{ opType: 'Softmax', backend: 'webgl', opsetMin: 1, factory: () => new s() }]
          }))
      },
      4871: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLSplit2 = void 0))
        const r = n(5146),
          o = n(5489)
        class i extends o.Split2 {
          constructor() {
            super('webgl')
          }
          async run(e, t, n) {
            e.assertsWebGLTensorArray(t)
            const o = t[0],
              {
                eachOutputParams: i,
                outerLength: s,
                innerLength: a,
                inOuterStride: A,
                inConcatStride: u,
              } = this.calcShape(o, n),
              l = [],
              g = 'split',
              c = `${r.shaderGenHeader(e.webgl2)}\n\n${r.shaderGenTensorOutputUniform(3)}\nuniform int offset;\n\n${r.shaderGenTensorNDGet('tex_input', 3, e.webgl2)}\n\nvoid main() {\n  ${r.shaderGenTensorOutputCoordsWithReturn(3)}\n  float s = get_tex_input(tex_output_0, tex_output_1 + offset, tex_output_2);\n  ${r.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(g, c)
            for (let t = 0; t < n; t++) {
              const { dim: n, offset: c, outShape: d } = i[t],
                p = e.emptyTensor(d, o.dataType),
                h = [
                  ...r.shaderGenTensorNDGetUniformItem('tex_input', [A, u, 1], o, e.webgl2),
                  ...r.shaderGenTensorOutputUniformItem([s, n, a], p, e.webgl2),
                  { name: 'offset', type: 'int', value: c },
                ]
              ;(await e.runKernel(g, [{ tensor: o, name: 'tex_input' }], p, h), l.push(p))
            }
            return l
          }
        }
        ;((t.WebGLSplit2 = i),
          (t.getOpEntries = function () {
            return [
              {
                opType: 'Split',
                backend: 'webgl',
                opsetMin: 1,
                opsetMax: 13,
                factory: () => new i(),
              },
            ]
          }))
      },
      8841: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLSqueeze13 = t.WebGLSqueeze1 = void 0))
        const r = n(2633)
        class o extends r.Squeeze1 {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0],
              r = this.calcShape(n)
            return [n.alias(r)]
          }
        }
        t.WebGLSqueeze1 = o
        class i extends r.Squeeze13 {
          constructor() {
            super('webgl')
          }
          getTensorBackendRequirement(e, t) {
            return [this.backend, 'cpu']
          }
          async run(e, t) {
            const n = t[0],
              r = t[1]
            if (!e.cpuContext.isCPUTensor(r)) throw new Error('Unsqueeze: axes is not on cpu.')
            if (!e.isWebGLTensor(n)) throw new Error('Unsqueeze: input is not on webgl.')
            const o = this.calcShape(n, r)
            return [n.alias(o)]
          }
        }
        ;((t.WebGLSqueeze13 = i),
          (t.getOpEntries = function () {
            return [
              { opType: 'Squeeze', backend: 'webgl', opsetMin: 13, factory: () => new i() },
              {
                opType: 'Squeeze',
                backend: 'webgl',
                opsetMin: 1,
                opsetMax: 13,
                factory: () => new o(),
              },
            ]
          }))
      },
      9447: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLTranspose = void 0))
        const r = n(5146),
          o = n(187)
        class i extends o.Transpose {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0]
            if ('float32' !== n.dataType) throw new Error()
            if (1 !== n.dimPerPixel) throw new Error()
            const { outShape: o, inStrides: i } = this.calcShape(n),
              s = e.emptyTensor(o, 'float32'),
              a = `transpose_${o.length}`
            let A
            switch (i.length) {
              case 0:
                A = ''
                break
              case 1:
                A = 'tex_output_0'
                break
              case 2:
                A = 'tex_output_0, tex_output_1'
                break
              case 3:
                A = 'tex_output_0, tex_output_1, tex_output_2'
                break
              case 4:
                A = 'tex_output_0, tex_output_1, tex_output_2, tex_output_3'
                break
              default:
                throw new Error('Input with more than 4 dimensions is not supported')
            }
            const u = `${r.shaderGenHeader(e.webgl2)}\n\n${r.shaderGenTensorOutputUniform(o.length)}\n\n${r.shaderGenTensorNDGet('tex_input', i.length, e.webgl2)}\n\nvoid main() {\n  ${r.shaderGenTensorOutputCoordsWithReturn(o.length)}\n  float s = get_tex_input(${A});\n  ${r.shaderGenOutput('s', e.webgl2)}\n  return;\n}\n`
            e.addKernel(a, u)
            const l = [
              ...r.shaderGenTensorNDGetUniformItem('tex_input', i, n, e.webgl2),
              ...r.shaderGenTensorOutputUniformItem(o, s, e.webgl2),
            ]
            return (await e.runKernel(a, [{ tensor: n, name: 'tex_input' }], s, l), [s])
          }
        }
        ;((t.WebGLTranspose = i),
          (t.getOpEntries = function () {
            return [{ opType: 'Transpose', backend: 'webgl', opsetMin: 1, factory: () => new i() }]
          }))
      },
      7701: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLUnary = void 0))
        const r = n(3381),
          o = n(5146)
        class i extends r.OperatorImpl {
          constructor(e, t, n) {
            ;(super('webgl'),
              (this.kernelName = e),
              (this.unaryCalculationSource = t),
              (this.unaryCalculationSourceWebGL1 = n))
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0]
            if ('float32' !== n.dataType) throw new Error()
            const r = e.emptyTensor(n.dims, 'float32')
            if (
              n.textureWidth !== r.textureWidth ||
              n.textureHeight !== r.textureHeight ||
              1 !== n.dimPerPixel
            )
              throw new Error()
            if (!e.hasKernel(this.kernelName)) {
              const t = `${o.shaderGenHeader(e.webgl2)}\n  ${o.shaderGenTensorElementwiseGet('tex_input', e.webgl2)}\n  void main() {\n    float s = get_tex_input();\n    ${!e.webgl2 && this.unaryCalculationSourceWebGL1 ? this.unaryCalculationSourceWebGL1 : this.unaryCalculationSource}\n    ${o.shaderGenOutput('v', e.webgl2)}\n    return;\n  }\n      `
              e.addKernel(this.kernelName, t)
            }
            const i = [...o.shaderGenTensorElementwiseGetUniformItem('tex_input', n, e.webgl2)]
            return (
              await e.runKernel(this.kernelName, [{ tensor: n, name: 'tex_input' }], r, i),
              [r]
            )
          }
        }
        ;((t.WebGLUnary = i),
          (t.getOpEntries = function () {
            return [
              {
                opType: 'Abs',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('abs', 'float v = abs(s);'),
              },
              {
                opType: 'Acos',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('acos', 'float v = acos(s);'),
              },
              {
                opType: 'Acosh',
                backend: 'webgl',
                opsetMin: 1,
                factory: () =>
                  new i('acosh', 'float v = acosh(s);', 'float v = log(s + sqrt(s * s - 1.0));'),
              },
              {
                opType: 'Asin',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('asin', 'float v = asin(s);'),
              },
              {
                opType: 'Asinh',
                backend: 'webgl',
                opsetMin: 1,
                factory: () =>
                  new i('asinh', 'float v = asinh(s);', 'float v = log(s + sqrt(s * s + 1.0));'),
              },
              {
                opType: 'Atan',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('atan', 'float v = atan(s);'),
              },
              {
                opType: 'Atanh',
                backend: 'webgl',
                opsetMin: 1,
                factory: () =>
                  new i(
                    'atanh',
                    'float v = atanh(s);',
                    'float v = log((s + 1.0) / (1.0 - s)) * 0.5;'
                  ),
              },
              {
                opType: 'Ceil',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('ceil', 'float v = ceil(s);'),
              },
              {
                opType: 'Cos',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('cos', 'float v = cos(s);'),
              },
              {
                opType: 'Cosh',
                backend: 'webgl',
                opsetMin: 1,
                factory: () =>
                  new i('cosh', 'float v = cosh(s);', 'float v = (exp(s) + exp(-s)) * 0.5;'),
              },
              {
                opType: 'Exp',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('exp', 'float v = exp(s);'),
              },
              {
                opType: 'Floor',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('floor', 'float v = floor(s);'),
              },
              {
                opType: 'HardSwish',
                backend: 'webgl',
                opsetMin: 1,
                factory: () =>
                  new i(
                    'hardswish',
                    'float v; if (s <= -3.0) { v = 0.0; } else if (s >= 3.0) { v = s; } else { v = s * (s + 3.0) / 6.0; }'
                  ),
              },
              {
                opType: 'Log',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('log', 'float v = log(s);'),
              },
              {
                opType: 'Neg',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('neg', 'float v = -s;'),
              },
              {
                opType: 'Reciprocal',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('neg', 'float v = 1.0 / s;'),
              },
              {
                opType: 'Relu',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('relu', 'float v = max(s, 0.0);'),
              },
              {
                opType: 'Round',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('round', 'float v = round(s);', 'float v = floor(s + 0.5);'),
              },
              {
                opType: 'Sigmoid',
                backend: 'webgl',
                opsetMin: 1,
                factory: () =>
                  new i(
                    'sigmoid',
                    'float v = (tanh(s * 0.5) + 1.0) * 0.5;',
                    'float v = 1.0 / (1.0 + exp(-s));'
                  ),
              },
              {
                opType: 'Sign',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('sign', 'float v = sign(s);'),
              },
              {
                opType: 'Sin',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('sin', 'float v = sin(s);'),
              },
              {
                opType: 'Softplus',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('softplus', 'float v = log(exp(s) + 1.0);'),
              },
              {
                opType: 'Softsign',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('softsign', 'float v = s / (1.0 + abs(s));'),
              },
              {
                opType: 'Sqrt',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('sqrt', 'float v = sqrt(s);'),
              },
              {
                opType: 'Tan',
                backend: 'webgl',
                opsetMin: 1,
                factory: () => new i('tan', 'float v = tan(s);'),
              },
              {
                opType: 'Tanh',
                backend: 'webgl',
                opsetMin: 1,
                factory: () =>
                  new i(
                    'tanh',
                    'float v = tanh(s);',
                    'float vt = exp(-2.0 * s); float v = (1.0 - vt) / (1.0 + vt);'
                  ),
              },
            ]
          }))
      },
      5409: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGLUnsqueeze13 = t.WebGLUnsqueeze1 = void 0))
        const r = n(784)
        class o extends r.Unsqueeze1 {
          constructor() {
            super('webgl')
          }
          async run(e, t) {
            e.assertsWebGLTensorArray(t)
            const n = t[0],
              r = this.calcShape(n)
            return [n.alias(r)]
          }
        }
        t.WebGLUnsqueeze1 = o
        class i extends r.Unsqueeze13 {
          constructor() {
            super('webgl')
          }
          getTensorBackendRequirement(e, t) {
            return [this.backend, 'cpu']
          }
          async run(e, t) {
            const n = t[0],
              r = t[1]
            if (!e.cpuContext.isCPUTensor(r)) throw new Error('Unsqueeze: axes is not on cpu.')
            if (!e.isWebGLTensor(n)) throw new Error('Unsqueeze: input is not on webgl.')
            const o = this.calcShape(n, r)
            return [n.alias(o)]
          }
        }
        ;((t.WebGLUnsqueeze13 = i),
          (t.getOpEntries = function () {
            return [
              { opType: 'Unsqueeze', backend: 'webgl', opsetMin: 13, factory: () => new i() },
              {
                opType: 'Unsqueeze',
                backend: 'webgl',
                opsetMin: 1,
                opsetMax: 13,
                factory: () => new o(),
              },
            ]
          }))
      },
      5760: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.averagepool = void 0))
        const r = n(5146)
        t.averagepool = async function (e, t, n, o, i, s, a, A, u, l, g) {
          const c = `averagepool_${s[0]}_${s[1]}_${o}`
          if (!e.hasKernel(c)) {
            const t = `${r.shaderGenHeader(e.webgl2)}\n\n    #define K0 ${s[0]}\n    #define K1 ${s[1]}\n    uniform int CH;\n    uniform int S0;\n    uniform int S1;\n    uniform int P0;\n    uniform int P1;\n    uniform int IS0;\n    uniform int IS1;\n    ${r.shaderGenTensorOutputUniform(4)}\n    \n    ${r.shaderGenTensorNDGet('tex_input', 4, e.webgl2)}\n    \n    void main() {\n    ${r.shaderGenTensorOutputCoordsWithReturn(4)}\n    float s = 0.0;\n    ${o ? 'const float c = float(K0 * K1);' : 'float c = 0.0;'}\n    for (int k0 = 0; k0 < K0; k0++) {\n      for (int k1 = 0; k1 < K1; k1++) {\n        int in0 = tex_output_2 * S0 - P0 + k0;\n        int in1 = tex_output_3 * S1 - P1 + k1;\n        if (in0 >= 0 && in0 < IS0 && in1 >= 0 && in1 < IS1) {\n          s += get_tex_input(tex_output_0, tex_output_1, in0, in1);\n          ${o ? '' : 'c++;'}\n        }\n      }\n    }\n    ${r.shaderGenOutput('s / c', e.webgl2)}\n    return;\n    }\n    `
            e.addKernel(c, t)
          }
          const d = [
            ...r.shaderGenTensorNDGetUniformItem('tex_input', t.strides, t, e.webgl2),
            ...r.shaderGenTensorOutputUniformItem(n.dims, n, e.webgl2),
            { name: 'CH', type: 'int', value: g },
            { name: 'S0', type: 'int', value: A[0] },
            { name: 'S1', type: 'int', value: A[1] },
            { name: 'P0', type: 'int', value: a[0] },
            { name: 'P1', type: 'int', value: a[1] },
            { name: 'IS0', type: 'int', value: u[0] },
            { name: 'IS1', type: 'int', value: u[1] },
          ]
          await e.runKernel(c, [{ tensor: t, name: 'tex_input' }], n, d)
        }
      },
      5146: (e, t) => {
        'use strict'
        function n(e) {
          return 'object' == typeof e && 'webgl' === e.backend
        }
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.shaderGenTensorElementwiseGetUniformItem =
            t.shaderGenTensorElementwiseGet =
            t.shaderGenTensorOutputCoordsWithReturn =
            t.shaderGenTensorOutputUniform =
            t.shaderGenTensorOutputUniformItem =
            t.shaderGenTensorNDGetUniformItem =
            t.shaderGenTensorNDGetVec4 =
            t.shaderGenTensorNDGet =
            t.shaderGenOutputVec4 =
            t.shaderGenOutput =
            t.shaderGenHeader =
            t.shaderHeaderWebGL2 =
            t.shaderHeaderWebGL1 =
            t.shaderFloatPack =
              void 0),
          (t.shaderFloatPack =
            '\nvec4 encode_float (float val) {\n  if (val == 0.0) return vec4(0, 0, 0, 0);\n  float sign = val > 0.0 ? 192.0 : 64.0;\n  float absval = abs(val);\n  float exponent = ceil(log2(absval) + 0.0001);\n  float scaled = absval * exp2(-exponent);\n  vec3 enc = vec3(1.0, 255.0, 65025.0) * scaled;\n  enc = fract(enc);\n  enc -= enc.yzz * vec3(1.0/255.0, 1.0/255.0, 0.0);\n  return vec4((sign + clamp(exponent, -63.0, 63.0)) * (1.0 / 255.0), enc.x, enc.y, enc.z);\n}\n\nfloat decode_float(vec4 code) {\n  if (code.x == 0.0) {\n    return 0.0;\n  }\n  float ebyte = code.x * 255.0;\n  float sign, exponent;\n  if (ebyte >= 128.0) {\n    sign = 1.0;\n    exponent = ebyte - 192.0;\n  } else {\n    sign = -1.0;\n    exponent = ebyte - 64.0;\n  }\n  float scaled = code.w * (1.0 / 65025.0) + code.z * (1.0 / 255.0) + code.y;\n  float value = scaled * exp2(exponent) * sign;\n  return value;\n}\n'),
          (t.shaderHeaderWebGL1 =
            '#version 100\nprecision highp float;\nprecision highp int;\nprecision highp sampler2D;\n'),
          (t.shaderHeaderWebGL2 =
            '#version 300 es\nprecision highp float;\nprecision highp int;\nprecision highp sampler2D;\nout vec4 fragColor;\n'),
          (t.shaderGenHeader = function (e) {
            return e ? t.shaderHeaderWebGL2 : t.shaderHeaderWebGL1 + t.shaderFloatPack
          }),
          (t.shaderGenOutput = function (e, t) {
            return t
              ? `fragColor = vec4((${e}), 0.0, 0.0, 0.0);`
              : `gl_FragColor = encode_float(${e});`
          }),
          (t.shaderGenOutputVec4 = function (e, t) {
            if (t) return `fragColor = (${e});`
            throw new Error('shaderGenOutputVec4 is only for WebGL2')
          }),
          (t.shaderGenTensorNDGet = function (e, t, n) {
            let r, o, i
            switch (t) {
              case 0:
                ;((i = ''), (r = ''), (o = '0'))
                break
              case 1:
                ;((i = `\n  uniform int ${e}_stride_0;\n          `),
                  (r = 'int d0'),
                  (o = `d0 * ${e}_stride_0`))
                break
              case 2:
                ;((i = `\n    uniform int ${e}_stride_0;\n    uniform int ${e}_stride_1;\n            `),
                  (r = 'int d0, int d1'),
                  (o = `d0 * ${e}_stride_0 + d1 * ${e}_stride_1`))
                break
              case 3:
                ;((i = `\n      uniform int ${e}_stride_0;\n      uniform int ${e}_stride_1;\n      uniform int ${e}_stride_2;\n              `),
                  (r = 'int d0, int d1, int d2'),
                  (o = `d0 * ${e}_stride_0 + d1 * ${e}_stride_1 + d2 * ${e}_stride_2`))
                break
              case 4:
                ;((i = `\nuniform int ${e}_stride_0;\nuniform int ${e}_stride_1;\nuniform int ${e}_stride_2;\nuniform int ${e}_stride_3;\n        `),
                  (r = 'int d0, int d1, int d2, int d3'),
                  (o = `d0 * ${e}_stride_0 + d1 * ${e}_stride_1 + d2 * ${e}_stride_2 + d3 * ${e}_stride_3`))
                break
              case 5:
                ;((i = `\n  uniform int ${e}_stride_0;\n  uniform int ${e}_stride_1;\n  uniform int ${e}_stride_2;\n  uniform int ${e}_stride_3;\n  uniform int ${e}_stride_4;\n          `),
                  (r = 'int d0, int d1, int d2, int d3, int d4'),
                  (o = `d0 * ${e}_stride_0 + d1 * ${e}_stride_1 + d2 * ${e}_stride_2 + d3 * ${e}_stride_3 + d4 * ${e}_stride_4`))
                break
              case 6:
                ;((i = `\n  uniform int ${e}_stride_0;\n  uniform int ${e}_stride_1;\n  uniform int ${e}_stride_2;\n  uniform int ${e}_stride_3;\n  uniform int ${e}_stride_4;\n  uniform int ${e}_stride_5;\n          `),
                  (r = 'int d0, int d1, int d2, int d3, int d4, int d5'),
                  (o = `d0 * ${e}_stride_0 + d1 * ${e}_stride_1 + d2 * ${e}_stride_2 + d3 * ${e}_stride_3 + d4 * ${e}_stride_4 + d5 * ${e}_stride_5`))
                break
              default:
                throw new Error()
            }
            return n
              ? `\nuniform sampler2D ${e};\n${i}\n\nfloat get_${e}(${r}) {\nint flat_index = ${o};\nint texture_w = textureSize(${e}, 0).x;\nint y = flat_index / texture_w;\nint x = flat_index - y * texture_w;\nreturn texelFetch(${e}, ivec2(x, y), 0).r;\n}\n`
              : `\n    uniform sampler2D ${e};\n    ${i}\n    uniform int ${e}_texture_w;\n    uniform int ${e}_texture_h;\n    \n    float get_${e}(${r}) {\n      int flat_index = ${o};\n      int texture_w = ${e}_texture_w;\n      int y = flat_index / texture_w;\n      int x = flat_index - y * texture_w;\n      vec4 p = texture2D(${e}, vec2((float(x) + 0.5) / float(${e}_texture_w), (float(y) + 0.5) / float(${e}_texture_h)));\n      return decode_float(p);\n    }\n`
          }),
          (t.shaderGenTensorNDGetVec4 = function (e, t, n) {
            let r, o, i
            switch (t) {
              case 0:
                ;((i = ''), (r = ''), (o = '0'))
                break
              case 1:
                ;((i = `\n  uniform int ${e}_stride_0;\n          `),
                  (r = 'int d0'),
                  (o = `d0 * ${e}_stride_0`))
                break
              case 2:
                ;((i = `\n    uniform int ${e}_stride_0;\n    uniform int ${e}_stride_1;\n            `),
                  (r = 'int d0, int d1'),
                  (o = `d0 * ${e}_stride_0 + d1 * ${e}_stride_1`))
                break
              case 3:
                ;((i = `\n      uniform int ${e}_stride_0;\n      uniform int ${e}_stride_1;\n      uniform int ${e}_stride_2;\n              `),
                  (r = 'int d0, int d1, int d2'),
                  (o = `d0 * ${e}_stride_0 + d1 * ${e}_stride_1 + d2 * ${e}_stride_2`))
                break
              case 4:
                ;((i = `\nuniform int ${e}_stride_0;\nuniform int ${e}_stride_1;\nuniform int ${e}_stride_2;\nuniform int ${e}_stride_3;\n        `),
                  (r = 'int d0, int d1, int d2, int d3'),
                  (o = `d0 * ${e}_stride_0 + d1 * ${e}_stride_1 + d2 * ${e}_stride_2 + d3 * ${e}_stride_3`))
                break
              case 5:
                ;((i = `\n  uniform int ${e}_stride_0;\n  uniform int ${e}_stride_1;\n  uniform int ${e}_stride_2;\n  uniform int ${e}_stride_3;\n  uniform int ${e}_stride_4;\n          `),
                  (r = 'int d0, int d1, int d2, int d3, int d4'),
                  (o = `d0 * ${e}_stride_0 + d1 * ${e}_stride_1 + d2 * ${e}_stride_2 + d3 * ${e}_stride_3 + d4 * ${e}_stride_4`))
                break
              case 6:
                ;((i = `\n  uniform int ${e}_stride_0;\n  uniform int ${e}_stride_1;\n  uniform int ${e}_stride_2;\n  uniform int ${e}_stride_3;\n  uniform int ${e}_stride_4;\n  uniform int ${e}_stride_5;\n          `),
                  (r = 'int d0, int d1, int d2, int d3, int d4, int d5'),
                  (o = `d0 * ${e}_stride_0 + d1 * ${e}_stride_1 + d2 * ${e}_stride_2 + d3 * ${e}_stride_3 + d4 * ${e}_stride_4 + d5 * ${e}_stride_5`))
                break
              default:
                throw new Error()
            }
            if (n)
              return `\nuniform sampler2D ${e};\n${i}\n\nvec4 get_vec4_${e}(${r}) {\nint flat_index = ${o};\nint texture_w = textureSize(${e}, 0).x;\nint y = flat_index / texture_w;\nint x = flat_index - y * texture_w;\nreturn texelFetch(${e}, ivec2(x, y), 0);\n}\n`
            throw new Error('shaderGenTensorNDGetVec4 is only for WebGL2')
          }),
          (t.shaderGenTensorNDGetUniformItem = function (e, t, r, o) {
            let i
            i = n(r) ? [r.textureHeight, r.textureWidth] : r
            const s = []
            for (let n = 0; n < t.length; n++)
              s.push({ name: `${e}_stride_${n}`, type: 'int', value: t[n] })
            return (
              o ||
                (s.push({ name: `${e}_texture_h`, type: 'int', value: i[0] }),
                s.push({ name: `${e}_texture_w`, type: 'int', value: i[1] })),
              s
            )
          }),
          (t.shaderGenTensorOutputUniformItem = function (e, t, r) {
            let o
            o = n(t) ? [t.textureHeight, t.textureWidth] : t
            const i = 'tex_output',
              s = []
            for (let t = 0; t < e.length; t++)
              s.push({ name: `${i}_shape_${t}`, type: 'int', value: e[t] })
            return (s.push({ name: `${i}_texture_w`, type: 'int', value: o[1] }), s)
          }),
          (t.shaderGenTensorOutputUniform = function (e) {
            let t = '\n  uniform int tex_output_texture_w;\n'
            for (let n = 0; n < e; n++) t += `uniform int tex_output_shape_${n};`
            return t
          }),
          (t.shaderGenTensorOutputCoordsWithReturn = function (e) {
            let t
            switch (e) {
              case 0:
                t =
                  '\n    int tex_output_0 = 0;\n    if (tex_output_0 >= 1) {\n      return;\n    }\n    '
                break
              case 1:
                t =
                  '\n    int tex_output_0 = tex_output_flat;\n    if (tex_output_0 >= tex_output_shape_0) {\n      return;\n    }\n    '
                break
              case 2:
                t =
                  '\n    int tmp1 = tex_output_flat / tex_output_shape_1;\n    int tex_output_1 = tex_output_flat - tmp1 * tex_output_shape_1;\n    int tex_output_0 = tmp1;\n    if (tex_output_0 >= tex_output_shape_0) {\n      return;\n    }\n    '
                break
              case 3:
                t =
                  '\n    int tmp2 = tex_output_flat / tex_output_shape_2;\n    int tex_output_2 = tex_output_flat - tmp2 * tex_output_shape_2;\n    int tmp1 = tmp2 / tex_output_shape_1;\n    int tex_output_1 = tmp2 - tmp1 * tex_output_shape_1;\n    int tex_output_0 = tmp1;\n    if (tex_output_0 >= tex_output_shape_0) {\n      return;\n    }\n    '
                break
              case 4:
                t =
                  '\n    int tmp3 = tex_output_flat / tex_output_shape_3;\n    int tex_output_3 = tex_output_flat - tmp3 * tex_output_shape_3;\n    int tmp2 = tmp3 / tex_output_shape_2;\n    int tex_output_2 = tmp3 - tmp2 * tex_output_shape_2;\n    int tmp1 = tmp2 / tex_output_shape_1;\n    int tex_output_1 = tmp2 - tmp1 * tex_output_shape_1;\n    int tex_output_0 = tmp1;\n    if (tex_output_0 >= tex_output_shape_0) {\n      return;\n    }\n    '
                break
              case 5:
                t =
                  '\n    int tmp4 = tex_output_flat / tex_output_shape_4;\n    int tex_output_4 = tex_output_flat - tmp4 * tex_output_shape_4;\n    int tmp3 = tmp4 / tex_output_shape_3;\n    int tex_output_3 = tmp4 - tmp3 * tex_output_shape_3;\n    int tmp2 = tmp3 / tex_output_shape_2;\n    int tex_output_2 = tmp3 - tmp2 * tex_output_shape_2;\n    int tmp1 = tmp2 / tex_output_shape_1;\n    int tex_output_1 = tmp2 - tmp1 * tex_output_shape_1;\n    int tex_output_0 = tmp1;\n    if (tex_output_0 >= tex_output_shape_0) {\n      return;\n    }\n    '
                break
              case 6:
                t =
                  '\n        int tmp5 = tex_output_flat / tex_output_shape_5;\n        int tex_output_5 = tex_output_flat - tmp5 * tex_output_shape_5;\n      int tmp4 = tmp5 / tex_output_shape_4;\n      int tex_output_4 = tmp5 - tmp4 * tex_output_shape_4;\n      int tmp3 = tmp4 / tex_output_shape_3;\n      int tex_output_3 = tmp4 - tmp3 * tex_output_shape_3;\n      int tmp2 = tmp3 / tex_output_shape_2;\n      int tex_output_2 = tmp3 - tmp2 * tex_output_shape_2;\n      int tmp1 = tmp2 / tex_output_shape_1;\n      int tex_output_1 = tmp2 - tmp1 * tex_output_shape_1;\n      int tex_output_0 = tmp1;\n      if (tex_output_0 >= tex_output_shape_0) {\n        return;\n      }\n      '
                break
              default:
                throw new Error()
            }
            return `\n  highp float helper_gfcx = gl_FragCoord.x;\n  highp float helper_gfcy = gl_FragCoord.y;\n  int tex_output_flat = int(helper_gfcx - 0.5) + tex_output_texture_w * int(helper_gfcy - 0.5);\n  ${t}\n  `
          }),
          (t.shaderGenTensorElementwiseGet = function (e, t) {
            return t
              ? `\nuniform sampler2D ${e};\n\nfloat get_${e}() {\n  return texelFetch(${e}, ivec2(int(gl_FragCoord.x), int(gl_FragCoord.y)), 0).r;\n}\n`
              : `\nuniform sampler2D ${e};\nuniform int ${e}_texture_w;\nuniform int ${e}_texture_h;\n\nfloat get_${e}() {\n  vec4 p = texture2D(${e}, vec2(gl_FragCoord.x / float(${e}_texture_w), gl_FragCoord.y / float(${e}_texture_h)));\n  return decode_float(p);\n}\n`
          }),
          (t.shaderGenTensorElementwiseGetUniformItem = function (e, t, r) {
            let o
            o = n(t) ? [t.textureHeight, t.textureWidth] : t
            const i = []
            return (
              r ||
                (i.push({ name: `${e}_texture_h`, type: 'int', value: o[0] }),
                i.push({ name: `${e}_texture_w`, type: 'int', value: o[1] })),
              i
            )
          }))
      },
      2071: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(353),
          o = n(958),
          i = n(3054),
          s = n(1567)
        t.getOpEntries = function () {
          const e = []
          return (
            e.push(...r.getOpEntries()),
            e.push(...o.getOpEntries()),
            e.push(...i.getOpEntries()),
            e.push(...s.getOpEntries()),
            e
          )
        }
      },
      353: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(3381),
          o = n(2055),
          i = n(2964)
        class s extends r.OperatorImpl {
          constructor(e, t, n, r) {
            ;(super('webgpu'),
              (this.elementwiseShaderName = e),
              (this.elementwiseShaderBinary = t),
              (this.broadcastShaderNames = n),
              (this.broadcastShaderBinaries = r))
          }
          async run(e, t) {
            e.assertsWebGPUTensorArray(t)
            const n = t[0],
              r = t[1]
            if ('float32' !== n.dataType || 'float32' !== r.dataType) throw new Error()
            return o.arrayEqual(n.dims, r.dims)
              ? this.runElementwise(e, n, r)
              : this.runBroadcast(e, n, r)
          }
          async runElementwise(e, t, n) {
            const r = e.emptyTensor(t.dims, 'float32')
            return (
              e.hasPipeline(this.elementwiseShaderName) ||
                e.createPipeline(this.elementwiseShaderName, this.elementwiseShaderBinary, 4),
              await e.run({
                pipelineName: this.elementwiseShaderName,
                tensors: [t, n, r],
                meta: { elements: [{ value: t.length, type: 'uint32' }] },
                workGroups: { x: Math.ceil(Math.min(r.length, 4096) / 64), y: 1, z: 1 },
              }),
              [r]
            )
          }
          async runBroadcast(e, t, n) {
            const { dims: r, allStrides: i } = o.broadcastMulti([t.dims, n.dims]),
              s = e.emptyTensor(r, 'float32'),
              a = s.ndim,
              A = [{ value: s.length, type: 'uint32' }]
            for (let e = 0; e < a; e++) A.push({ value: r[e], type: 'uint32' })
            for (let e = 0; e < a; e++) A.push({ value: i[0][e], type: 'uint32' })
            for (let e = 0; e < a; e++) A.push({ value: i[1][e], type: 'uint32' })
            return (
              e.hasPipeline(this.broadcastShaderNames[a]) ||
                e.createPipeline(this.broadcastShaderNames[a], this.broadcastShaderBinaries[a], 4),
              await e.run({
                pipelineName: this.broadcastShaderNames[a],
                tensors: [t, n, s],
                meta: { elements: A },
                workGroups: { x: Math.ceil(Math.min(s.length, 4096) / 64), y: 1, z: 1 },
              }),
              [s]
            )
          }
        }
        t.getOpEntries = function () {
          return [
            {
              opType: 'Add',
              backend: 'webgpu',
              opsetMin: 7,
              factory: () =>
                new s(
                  'binary_elementwise_add',
                  i.webgpuShaders.binary_elementwise_add,
                  [
                    'binary_broadcast_add_0d',
                    'binary_broadcast_add_1d',
                    'binary_broadcast_add_2d',
                    'binary_broadcast_add_3d',
                    'binary_broadcast_add_4d',
                  ],
                  [
                    i.webgpuShaders.binary_broadcast_add_0d,
                    i.webgpuShaders.binary_broadcast_add_1d,
                    i.webgpuShaders.binary_broadcast_add_2d,
                    i.webgpuShaders.binary_broadcast_add_3d,
                    i.webgpuShaders.binary_broadcast_add_4d,
                  ]
                ),
            },
          ]
        }
      },
      958: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }), (t.getOpEntries = void 0))
        const r = n(2825),
          o = n(2964)
        class i extends r.Conv {
          constructor() {
            super('webgpu')
          }
          async run(e, t) {
            e.assertsWebGPUTensorArray(t)
            const n = t[0],
              r = t[1],
              o = t[2]
            if (4 !== n.ndim) throw new Error('Conv other than 2D is not yet supported')
            const {
                batch: i,
                dilations: s,
                group: a,
                kernelShape: A,
                pads: u,
                strides: l,
                inShape: g,
                outShape: c,
                chIn: d,
                chInPerGroup: p,
                chOut: h,
                chOutPerGroup: f,
              } = this.calcShape(n.dims, r.dims),
              I = e.emptyTensor([a * i * c[0] * c[1] * p * A[0] * A[1]])
            await this.im2col(e, n, I, i, s, a, A, u, l, g, c, d, p, h, f)
            const m = e.emptyTensor([a * i * c[0] * c[1] * f])
            ;(await this.matmul(e, I, r, m, a, i * c[0] * c[1], p * A[0] * A[1], f), I.dispose())
            const E = e.emptyTensor([i, h, c[0], c[1]])
            if (o) {
              const t = e.emptyTensor([i * h * c[0] * c[1]])
              ;(await this.transpose(e, m, t, a, i, c[0] * c[1], f),
                m.dispose(),
                await this.bias(e, t, o, E, i, h, c[0] * c[1]),
                t.dispose())
            } else (await this.transpose(e, m, E, a, i, c[0] * c[1], f), m.dispose())
            return [E]
          }
          async im2col(e, t, n, r, i, s, a, A, u, l, g, c, d, p, h) {
            const f = 'conv_im2col'
            ;(e.hasPipeline(f) || e.createPipeline(f, o.webgpuShaders[f], 3),
              await e.run({
                pipelineName: f,
                tensors: [t, n],
                meta: {
                  elements: [
                    { value: s, type: 'int32' },
                    { value: r, type: 'int32' },
                    { value: g[0], type: 'int32' },
                    { value: g[1], type: 'int32' },
                    { value: d, type: 'int32' },
                    { value: a[0], type: 'int32' },
                    { value: a[1], type: 'int32' },
                    { value: u[0], type: 'int32' },
                    { value: u[1], type: 'int32' },
                    { value: A[0], type: 'int32' },
                    { value: A[1], type: 'int32' },
                    { value: i[0], type: 'int32' },
                    { value: i[1], type: 'int32' },
                    { value: l[0], type: 'int32' },
                    { value: l[1], type: 'int32' },
                    { value: c, type: 'int32' },
                  ],
                },
                workGroups: { x: 64, y: 1, z: 1 },
              }))
          }
          async matmul(e, t, n, r, i, s, a, A) {
            const u = 'conv_matmul'
            ;(e.hasPipeline(u) || e.createPipeline(u, o.webgpuShaders[u], 4),
              await e.run({
                pipelineName: u,
                tensors: [t, n, r],
                meta: {
                  elements: [
                    { value: i, type: 'int32' },
                    { value: s, type: 'int32' },
                    { value: A, type: 'int32' },
                    { value: a, type: 'int32' },
                  ],
                },
                workGroups: { x: 64, y: 1, z: 1 },
              }))
          }
          async transpose(e, t, n, r, i, s, a) {
            const A = 'conv_transpose'
            ;(e.hasPipeline(A) || e.createPipeline(A, o.webgpuShaders[A], 3),
              await e.run({
                pipelineName: A,
                tensors: [t, n],
                meta: {
                  elements: [
                    { value: r, type: 'int32' },
                    { value: i, type: 'int32' },
                    { value: s, type: 'int32' },
                    { value: a, type: 'int32' },
                  ],
                },
                workGroups: { x: 64, y: 1, z: 1 },
              }))
          }
          async bias(e, t, n, r, i, s, a) {
            const A = 'conv_bias'
            ;(e.hasPipeline(A) || e.createPipeline(A, o.webgpuShaders[A], 4),
              await e.run({
                pipelineName: A,
                tensors: [t, n, r],
                meta: {
                  elements: [
                    { value: i, type: 'int32' },
                    { value: s, type: 'int32' },
                    { value: a, type: 'int32' },
                  ],
                },
                workGroups: { x: 64, y: 1, z: 1 },
              }))
          }
        }
        t.getOpEntries = function () {
          return [{ opType: 'Conv', backend: 'webgpu', opsetMin: 1, factory: () => new i() }]
        }
      },
      3054: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGPUGemm = void 0))
        const r = n(5620),
          o = n(2055),
          i = n(2964)
        class s extends r.Gemm {
          constructor() {
            super('webgpu')
          }
          async run(e, t) {
            e.assertsWebGPUTensorArray(t)
            const n = t[0],
              r = t[1],
              o = t[2]
            if (o) return this.runWithC(e, n, r, o)
            throw new Error()
          }
          async runWithC(e, t, n, r) {
            if ('float32' !== t.dataType) throw new Error()
            const {
                m: s,
                n: a,
                k: A,
                strideA: [u, l],
                strideB: [g, c],
              } = this.calcShape(t.dims, n.dims),
              [d, p] = o.broadcastUni([s, a], r.dims),
              h = e.emptyTensor([s, a], 'float32'),
              f = 'gemm'
            return (
              e.hasPipeline(f) || e.createPipeline(f, i.webgpuShaders.gemm, 5),
              await e.run({
                pipelineName: f,
                tensors: [t, n, r, h],
                meta: {
                  elements: [
                    { value: s, type: 'uint32' },
                    { value: a, type: 'uint32' },
                    { value: A, type: 'uint32' },
                    { value: u, type: 'uint32' },
                    { value: l, type: 'uint32' },
                    { value: g, type: 'uint32' },
                    { value: c, type: 'uint32' },
                    { value: d, type: 'uint32' },
                    { value: p, type: 'uint32' },
                    { value: this.alpha, type: 'float32' },
                    { value: this.beta, type: 'float32' },
                  ],
                },
                workGroups: { x: 32, y: 32, z: 1 },
              }),
              [h]
            )
          }
        }
        ;((t.WebGPUGemm = s),
          (t.getOpEntries = function () {
            return [{ opType: 'Gemm', backend: 'webgpu', opsetMin: 1, factory: () => new s() }]
          }))
      },
      1567: (e, t, n) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.getOpEntries = t.WebGPUUnary = void 0))
        const r = n(3381),
          o = n(2964)
        class i extends r.OperatorImpl {
          constructor(e, t) {
            ;(super('webgpu'), (this.shaderName = e), (this.shaderBinary = t))
          }
          async run(e, t) {
            const n = t[0]
            if ('float32' !== n.dataType) throw new Error()
            const r = e.emptyTensor(n.dims, 'float32')
            return (
              e.hasPipeline(this.shaderName) ||
                e.createPipeline(this.shaderName, this.shaderBinary, 3),
              await e.run({
                pipelineName: this.shaderName,
                tensors: [n, r],
                meta: { elements: [{ value: n.length, type: 'uint32' }] },
                workGroups: { x: 64, y: 1, z: 1 },
              }),
              [r]
            )
          }
        }
        ;((t.WebGPUUnary = i),
          (t.getOpEntries = function () {
            return [
              {
                opType: 'Relu',
                backend: 'webgpu',
                opsetMin: 1,
                factory: () => new i('relu', o.webgpuShaders.relu),
              },
            ]
          }))
      },
      2964: (e, t) => {
        'use strict'
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.webgpuShaders = void 0),
          (t.webgpuShaders = {
            binary_broadcast_add_0d: new Uint32Array([
              119734787, 65536, 524296, 49, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 11, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 196613, 8, 105, 524293, 11, 1197436007,
              1633841004, 1986939244, 1952539503, 1231974249, 68, 262149, 23, 1634890337, 17273,
              327686, 23, 0, 1651340654, 7565925, 262149, 25, 1634890337, 6512505, 262149, 29,
              1634890337, 16761, 327686, 29, 0, 1651340654, 7565925, 262149, 31, 1634890337,
              6381433, 262149, 36, 1634890337, 17017, 327686, 36, 0, 1651340654, 7565925, 262149,
              38, 1634890337, 6446969, 262149, 46, 1635018061, 0, 262150, 46, 0, 7234924, 262149,
              48, 1635018093, 0, 262215, 11, 11, 28, 262215, 22, 6, 4, 327752, 23, 0, 35, 0, 196679,
              23, 3, 262215, 25, 34, 0, 262215, 25, 33, 2, 262215, 28, 6, 4, 262216, 29, 0, 24,
              327752, 29, 0, 35, 0, 196679, 29, 3, 262215, 31, 34, 0, 262215, 31, 33, 0, 262215, 35,
              6, 4, 262216, 36, 0, 24, 327752, 36, 0, 35, 0, 196679, 36, 3, 262215, 38, 34, 0,
              262215, 38, 33, 1, 262215, 45, 11, 25, 262216, 46, 0, 24, 327752, 46, 0, 35, 0,
              196679, 46, 3, 262215, 48, 34, 0, 262215, 48, 33, 3, 131091, 2, 196641, 3, 2, 262165,
              6, 32, 0, 262176, 7, 7, 6, 262167, 9, 6, 3, 262176, 10, 1, 9, 262203, 10, 11, 1,
              262187, 6, 12, 0, 262176, 13, 1, 6, 131092, 17, 196630, 21, 32, 196637, 22, 21,
              196638, 23, 22, 262176, 24, 2, 23, 262203, 24, 25, 2, 262165, 26, 32, 1, 262187, 26,
              27, 0, 196637, 28, 21, 196638, 29, 28, 262176, 30, 2, 29, 262203, 30, 31, 2, 262176,
              32, 2, 21, 196637, 35, 21, 196638, 36, 35, 262176, 37, 2, 36, 262203, 37, 38, 2,
              262187, 6, 43, 64, 262187, 6, 44, 1, 393260, 9, 45, 43, 44, 44, 196638, 46, 6, 262176,
              47, 2, 46, 262203, 47, 48, 2, 327734, 2, 4, 0, 3, 131320, 5, 262203, 7, 8, 7, 327745,
              13, 14, 11, 12, 262205, 6, 15, 14, 196670, 8, 15, 262205, 6, 16, 8, 327850, 17, 18,
              16, 12, 196855, 20, 0, 262394, 18, 19, 20, 131320, 19, 393281, 32, 33, 31, 27, 27,
              262205, 21, 34, 33, 393281, 32, 39, 38, 27, 27, 262205, 21, 40, 39, 327809, 21, 41,
              34, 40, 393281, 32, 42, 25, 27, 27, 196670, 42, 41, 131321, 20, 131320, 20, 65789,
              65592,
            ]),
            binary_broadcast_add_1d: new Uint32Array([
              119734787, 65536, 524296, 81, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 32, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 196613, 8, 7234924, 262149, 9, 1635018061,
              0, 262150, 9, 0, 7234924, 393222, 9, 1, 1400141167, 1701863784, 48, 393222, 9, 2,
              1396797033, 1684632180, 12389, 393222, 9, 3, 1396862569, 1684632180, 12389, 262149,
              11, 1635018093, 0, 327685, 17, 1400141167, 1701863784, 48, 327685, 21, 1396797033,
              1684632180, 12389, 327685, 25, 1396862569, 1684632180, 12389, 196613, 29, 105, 524293,
              32, 1197436007, 1633841004, 1986939244, 1952539503, 1231974249, 68, 262149, 46,
              812476772, 0, 262149, 50, 1634890337, 17273, 327686, 50, 0, 1651340654, 7565925,
              262149, 52, 1634890337, 6512505, 262149, 55, 1634890337, 16761, 327686, 55, 0,
              1651340654, 7565925, 262149, 57, 1634890337, 6381433, 262149, 65, 1634890337, 17017,
              327686, 65, 0, 1651340654, 7565925, 262149, 67, 1634890337, 6446969, 262216, 9, 0, 24,
              327752, 9, 0, 35, 0, 262216, 9, 1, 24, 327752, 9, 1, 35, 4, 262216, 9, 2, 24, 327752,
              9, 2, 35, 8, 262216, 9, 3, 24, 327752, 9, 3, 35, 12, 196679, 9, 3, 262215, 11, 34, 0,
              262215, 11, 33, 3, 262215, 32, 11, 28, 262215, 49, 6, 4, 327752, 50, 0, 35, 0, 196679,
              50, 3, 262215, 52, 34, 0, 262215, 52, 33, 2, 262215, 54, 6, 4, 262216, 55, 0, 24,
              327752, 55, 0, 35, 0, 196679, 55, 3, 262215, 57, 34, 0, 262215, 57, 33, 0, 262215, 64,
              6, 4, 262216, 65, 0, 24, 327752, 65, 0, 35, 0, 196679, 65, 3, 262215, 67, 34, 0,
              262215, 67, 33, 1, 262215, 80, 11, 25, 131091, 2, 196641, 3, 2, 262165, 6, 32, 0,
              262176, 7, 7, 6, 393246, 9, 6, 6, 6, 6, 262176, 10, 2, 9, 262203, 10, 11, 2, 262165,
              12, 32, 1, 262187, 12, 13, 0, 262176, 14, 2, 6, 262187, 12, 18, 1, 262187, 12, 22, 2,
              262187, 12, 26, 3, 262167, 30, 6, 3, 262176, 31, 1, 30, 262203, 31, 32, 1, 262187, 6,
              33, 0, 262176, 34, 1, 6, 131092, 44, 196630, 48, 32, 196637, 49, 48, 196638, 50, 49,
              262176, 51, 2, 50, 262203, 51, 52, 2, 196637, 54, 48, 196638, 55, 54, 262176, 56, 2,
              55, 262203, 56, 57, 2, 262176, 61, 2, 48, 196637, 64, 48, 196638, 65, 64, 262176, 66,
              2, 65, 262203, 66, 67, 2, 262187, 6, 75, 4096, 262187, 6, 78, 64, 262187, 6, 79, 1,
              393260, 30, 80, 78, 79, 79, 327734, 2, 4, 0, 3, 131320, 5, 262203, 7, 8, 7, 262203, 7,
              17, 7, 262203, 7, 21, 7, 262203, 7, 25, 7, 262203, 7, 29, 7, 262203, 7, 46, 7, 327745,
              14, 15, 11, 13, 262205, 6, 16, 15, 196670, 8, 16, 327745, 14, 19, 11, 18, 262205, 6,
              20, 19, 196670, 17, 20, 327745, 14, 23, 11, 22, 262205, 6, 24, 23, 196670, 21, 24,
              327745, 14, 27, 11, 26, 262205, 6, 28, 27, 196670, 25, 28, 327745, 34, 35, 32, 33,
              262205, 6, 36, 35, 196670, 29, 36, 131321, 37, 131320, 37, 262390, 39, 40, 0, 131321,
              41, 131320, 41, 262205, 6, 42, 29, 262205, 6, 43, 8, 327856, 44, 45, 42, 43, 262394,
              45, 38, 39, 131320, 38, 262205, 6, 47, 29, 196670, 46, 47, 262205, 6, 53, 29, 262205,
              6, 58, 46, 262205, 6, 59, 21, 327812, 6, 60, 58, 59, 393281, 61, 62, 57, 13, 60,
              262205, 48, 63, 62, 262205, 6, 68, 46, 262205, 6, 69, 25, 327812, 6, 70, 68, 69,
              393281, 61, 71, 67, 13, 70, 262205, 48, 72, 71, 327809, 48, 73, 63, 72, 393281, 61,
              74, 52, 13, 53, 196670, 74, 73, 131321, 40, 131320, 40, 262205, 6, 76, 29, 327808, 6,
              77, 76, 75, 196670, 29, 77, 131321, 37, 131320, 39, 65789, 65592,
            ]),
            binary_broadcast_add_2d: new Uint32Array([
              119734787, 65536, 524296, 107, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 44, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 196613, 8, 7234924, 262149, 9, 1635018061,
              0, 262150, 9, 0, 7234924, 393222, 9, 1, 1400141167, 1701863784, 48, 393222, 9, 2,
              1400141167, 1701863784, 49, 393222, 9, 3, 1396797033, 1684632180, 12389, 393222, 9, 4,
              1396797033, 1684632180, 12645, 393222, 9, 5, 1396862569, 1684632180, 12389, 393222, 9,
              6, 1396862569, 1684632180, 12645, 262149, 11, 1635018093, 0, 327685, 17, 1400141167,
              1701863784, 48, 327685, 21, 1400141167, 1701863784, 49, 327685, 25, 1396797033,
              1684632180, 12389, 327685, 29, 1396797033, 1684632180, 12645, 327685, 33, 1396862569,
              1684632180, 12389, 327685, 37, 1396862569, 1684632180, 12645, 196613, 41, 105, 524293,
              44, 1197436007, 1633841004, 1986939244, 1952539503, 1231974249, 68, 262149, 58,
              829253988, 0, 262149, 62, 812476772, 0, 262149, 68, 1634890337, 17273, 327686, 68, 0,
              1651340654, 7565925, 262149, 70, 1634890337, 6512505, 262149, 73, 1634890337, 16761,
              327686, 73, 0, 1651340654, 7565925, 262149, 75, 1634890337, 6381433, 262149, 87,
              1634890337, 17017, 327686, 87, 0, 1651340654, 7565925, 262149, 89, 1634890337,
              6446969, 262216, 9, 0, 24, 327752, 9, 0, 35, 0, 262216, 9, 1, 24, 327752, 9, 1, 35, 4,
              262216, 9, 2, 24, 327752, 9, 2, 35, 8, 262216, 9, 3, 24, 327752, 9, 3, 35, 12, 262216,
              9, 4, 24, 327752, 9, 4, 35, 16, 262216, 9, 5, 24, 327752, 9, 5, 35, 20, 262216, 9, 6,
              24, 327752, 9, 6, 35, 24, 196679, 9, 3, 262215, 11, 34, 0, 262215, 11, 33, 3, 262215,
              44, 11, 28, 262215, 67, 6, 4, 327752, 68, 0, 35, 0, 196679, 68, 3, 262215, 70, 34, 0,
              262215, 70, 33, 2, 262215, 72, 6, 4, 262216, 73, 0, 24, 327752, 73, 0, 35, 0, 196679,
              73, 3, 262215, 75, 34, 0, 262215, 75, 33, 0, 262215, 86, 6, 4, 262216, 87, 0, 24,
              327752, 87, 0, 35, 0, 196679, 87, 3, 262215, 89, 34, 0, 262215, 89, 33, 1, 262215,
              106, 11, 25, 131091, 2, 196641, 3, 2, 262165, 6, 32, 0, 262176, 7, 7, 6, 589854, 9, 6,
              6, 6, 6, 6, 6, 6, 262176, 10, 2, 9, 262203, 10, 11, 2, 262165, 12, 32, 1, 262187, 12,
              13, 0, 262176, 14, 2, 6, 262187, 12, 18, 1, 262187, 12, 22, 2, 262187, 12, 26, 3,
              262187, 12, 30, 4, 262187, 12, 34, 5, 262187, 12, 38, 6, 262167, 42, 6, 3, 262176, 43,
              1, 42, 262203, 43, 44, 1, 262187, 6, 45, 0, 262176, 46, 1, 6, 131092, 56, 196630, 66,
              32, 196637, 67, 66, 196638, 68, 67, 262176, 69, 2, 68, 262203, 69, 70, 2, 196637, 72,
              66, 196638, 73, 72, 262176, 74, 2, 73, 262203, 74, 75, 2, 262176, 83, 2, 66, 196637,
              86, 66, 196638, 87, 86, 262176, 88, 2, 87, 262203, 88, 89, 2, 262187, 6, 101, 4096,
              262187, 6, 104, 64, 262187, 6, 105, 1, 393260, 42, 106, 104, 105, 105, 327734, 2, 4,
              0, 3, 131320, 5, 262203, 7, 8, 7, 262203, 7, 17, 7, 262203, 7, 21, 7, 262203, 7, 25,
              7, 262203, 7, 29, 7, 262203, 7, 33, 7, 262203, 7, 37, 7, 262203, 7, 41, 7, 262203, 7,
              58, 7, 262203, 7, 62, 7, 327745, 14, 15, 11, 13, 262205, 6, 16, 15, 196670, 8, 16,
              327745, 14, 19, 11, 18, 262205, 6, 20, 19, 196670, 17, 20, 327745, 14, 23, 11, 22,
              262205, 6, 24, 23, 196670, 21, 24, 327745, 14, 27, 11, 26, 262205, 6, 28, 27, 196670,
              25, 28, 327745, 14, 31, 11, 30, 262205, 6, 32, 31, 196670, 29, 32, 327745, 14, 35, 11,
              34, 262205, 6, 36, 35, 196670, 33, 36, 327745, 14, 39, 11, 38, 262205, 6, 40, 39,
              196670, 37, 40, 327745, 46, 47, 44, 45, 262205, 6, 48, 47, 196670, 41, 48, 131321, 49,
              131320, 49, 262390, 51, 52, 0, 131321, 53, 131320, 53, 262205, 6, 54, 41, 262205, 6,
              55, 8, 327856, 56, 57, 54, 55, 262394, 57, 50, 51, 131320, 50, 262205, 6, 59, 41,
              262205, 6, 60, 21, 327817, 6, 61, 59, 60, 196670, 58, 61, 262205, 6, 63, 41, 262205,
              6, 64, 21, 327814, 6, 65, 63, 64, 196670, 62, 65, 262205, 6, 71, 41, 262205, 6, 76,
              62, 262205, 6, 77, 25, 327812, 6, 78, 76, 77, 262205, 6, 79, 58, 262205, 6, 80, 29,
              327812, 6, 81, 79, 80, 327808, 6, 82, 78, 81, 393281, 83, 84, 75, 13, 82, 262205, 66,
              85, 84, 262205, 6, 90, 62, 262205, 6, 91, 33, 327812, 6, 92, 90, 91, 262205, 6, 93,
              58, 262205, 6, 94, 37, 327812, 6, 95, 93, 94, 327808, 6, 96, 92, 95, 393281, 83, 97,
              89, 13, 96, 262205, 66, 98, 97, 327809, 66, 99, 85, 98, 393281, 83, 100, 70, 13, 71,
              196670, 100, 99, 131321, 52, 131320, 52, 262205, 6, 102, 41, 327808, 6, 103, 102, 101,
              196670, 41, 103, 131321, 49, 131320, 51, 65789, 65592,
            ]),
            binary_broadcast_add_3d: new Uint32Array([
              119734787, 65536, 524296, 134, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 56, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 196613, 8, 7234924, 262149, 9, 1635018061,
              0, 262150, 9, 0, 7234924, 393222, 9, 1, 1400141167, 1701863784, 48, 393222, 9, 2,
              1400141167, 1701863784, 49, 393222, 9, 3, 1400141167, 1701863784, 50, 393222, 9, 4,
              1396797033, 1684632180, 12389, 393222, 9, 5, 1396797033, 1684632180, 12645, 393222, 9,
              6, 1396797033, 1684632180, 12901, 393222, 9, 7, 1396862569, 1684632180, 12389, 393222,
              9, 8, 1396862569, 1684632180, 12645, 393222, 9, 9, 1396862569, 1684632180, 12901,
              262149, 11, 1635018093, 0, 327685, 17, 1400141167, 1701863784, 48, 327685, 21,
              1400141167, 1701863784, 49, 327685, 25, 1400141167, 1701863784, 50, 327685, 29,
              1396797033, 1684632180, 12389, 327685, 33, 1396797033, 1684632180, 12645, 327685, 37,
              1396797033, 1684632180, 12901, 327685, 41, 1396862569, 1684632180, 12389, 327685, 45,
              1396862569, 1684632180, 12645, 327685, 49, 1396862569, 1684632180, 12901, 196613, 53,
              105, 524293, 56, 1197436007, 1633841004, 1986939244, 1952539503, 1231974249, 68,
              262149, 70, 846031204, 0, 262149, 74, 829253988, 0, 262149, 78, 812476772, 0, 262149,
              87, 1634890337, 17273, 327686, 87, 0, 1651340654, 7565925, 262149, 89, 1634890337,
              6512505, 262149, 92, 1634890337, 16761, 327686, 92, 0, 1651340654, 7565925, 262149,
              94, 1634890337, 6381433, 262149, 110, 1634890337, 17017, 327686, 110, 0, 1651340654,
              7565925, 262149, 112, 1634890337, 6446969, 262216, 9, 0, 24, 327752, 9, 0, 35, 0,
              262216, 9, 1, 24, 327752, 9, 1, 35, 4, 262216, 9, 2, 24, 327752, 9, 2, 35, 8, 262216,
              9, 3, 24, 327752, 9, 3, 35, 12, 262216, 9, 4, 24, 327752, 9, 4, 35, 16, 262216, 9, 5,
              24, 327752, 9, 5, 35, 20, 262216, 9, 6, 24, 327752, 9, 6, 35, 24, 262216, 9, 7, 24,
              327752, 9, 7, 35, 28, 262216, 9, 8, 24, 327752, 9, 8, 35, 32, 262216, 9, 9, 24,
              327752, 9, 9, 35, 36, 196679, 9, 3, 262215, 11, 34, 0, 262215, 11, 33, 3, 262215, 56,
              11, 28, 262215, 86, 6, 4, 327752, 87, 0, 35, 0, 196679, 87, 3, 262215, 89, 34, 0,
              262215, 89, 33, 2, 262215, 91, 6, 4, 262216, 92, 0, 24, 327752, 92, 0, 35, 0, 196679,
              92, 3, 262215, 94, 34, 0, 262215, 94, 33, 0, 262215, 109, 6, 4, 262216, 110, 0, 24,
              327752, 110, 0, 35, 0, 196679, 110, 3, 262215, 112, 34, 0, 262215, 112, 33, 1, 262215,
              133, 11, 25, 131091, 2, 196641, 3, 2, 262165, 6, 32, 0, 262176, 7, 7, 6, 786462, 9, 6,
              6, 6, 6, 6, 6, 6, 6, 6, 6, 262176, 10, 2, 9, 262203, 10, 11, 2, 262165, 12, 32, 1,
              262187, 12, 13, 0, 262176, 14, 2, 6, 262187, 12, 18, 1, 262187, 12, 22, 2, 262187, 12,
              26, 3, 262187, 12, 30, 4, 262187, 12, 34, 5, 262187, 12, 38, 6, 262187, 12, 42, 7,
              262187, 12, 46, 8, 262187, 12, 50, 9, 262167, 54, 6, 3, 262176, 55, 1, 54, 262203, 55,
              56, 1, 262187, 6, 57, 0, 262176, 58, 1, 6, 131092, 68, 196630, 85, 32, 196637, 86, 85,
              196638, 87, 86, 262176, 88, 2, 87, 262203, 88, 89, 2, 196637, 91, 85, 196638, 92, 91,
              262176, 93, 2, 92, 262203, 93, 94, 2, 262176, 106, 2, 85, 196637, 109, 85, 196638,
              110, 109, 262176, 111, 2, 110, 262203, 111, 112, 2, 262187, 6, 128, 4096, 262187, 6,
              131, 64, 262187, 6, 132, 1, 393260, 54, 133, 131, 132, 132, 327734, 2, 4, 0, 3,
              131320, 5, 262203, 7, 8, 7, 262203, 7, 17, 7, 262203, 7, 21, 7, 262203, 7, 25, 7,
              262203, 7, 29, 7, 262203, 7, 33, 7, 262203, 7, 37, 7, 262203, 7, 41, 7, 262203, 7, 45,
              7, 262203, 7, 49, 7, 262203, 7, 53, 7, 262203, 7, 70, 7, 262203, 7, 74, 7, 262203, 7,
              78, 7, 327745, 14, 15, 11, 13, 262205, 6, 16, 15, 196670, 8, 16, 327745, 14, 19, 11,
              18, 262205, 6, 20, 19, 196670, 17, 20, 327745, 14, 23, 11, 22, 262205, 6, 24, 23,
              196670, 21, 24, 327745, 14, 27, 11, 26, 262205, 6, 28, 27, 196670, 25, 28, 327745, 14,
              31, 11, 30, 262205, 6, 32, 31, 196670, 29, 32, 327745, 14, 35, 11, 34, 262205, 6, 36,
              35, 196670, 33, 36, 327745, 14, 39, 11, 38, 262205, 6, 40, 39, 196670, 37, 40, 327745,
              14, 43, 11, 42, 262205, 6, 44, 43, 196670, 41, 44, 327745, 14, 47, 11, 46, 262205, 6,
              48, 47, 196670, 45, 48, 327745, 14, 51, 11, 50, 262205, 6, 52, 51, 196670, 49, 52,
              327745, 58, 59, 56, 57, 262205, 6, 60, 59, 196670, 53, 60, 131321, 61, 131320, 61,
              262390, 63, 64, 0, 131321, 65, 131320, 65, 262205, 6, 66, 53, 262205, 6, 67, 8,
              327856, 68, 69, 66, 67, 262394, 69, 62, 63, 131320, 62, 262205, 6, 71, 53, 262205, 6,
              72, 25, 327817, 6, 73, 71, 72, 196670, 70, 73, 262205, 6, 75, 53, 262205, 6, 76, 25,
              327814, 6, 77, 75, 76, 196670, 74, 77, 262205, 6, 79, 74, 262205, 6, 80, 21, 327814,
              6, 81, 79, 80, 196670, 78, 81, 262205, 6, 82, 74, 262205, 6, 83, 21, 327817, 6, 84,
              82, 83, 196670, 74, 84, 262205, 6, 90, 53, 262205, 6, 95, 78, 262205, 6, 96, 29,
              327812, 6, 97, 95, 96, 262205, 6, 98, 74, 262205, 6, 99, 33, 327812, 6, 100, 98, 99,
              327808, 6, 101, 97, 100, 262205, 6, 102, 70, 262205, 6, 103, 37, 327812, 6, 104, 102,
              103, 327808, 6, 105, 101, 104, 393281, 106, 107, 94, 13, 105, 262205, 85, 108, 107,
              262205, 6, 113, 78, 262205, 6, 114, 41, 327812, 6, 115, 113, 114, 262205, 6, 116, 74,
              262205, 6, 117, 45, 327812, 6, 118, 116, 117, 327808, 6, 119, 115, 118, 262205, 6,
              120, 70, 262205, 6, 121, 49, 327812, 6, 122, 120, 121, 327808, 6, 123, 119, 122,
              393281, 106, 124, 112, 13, 123, 262205, 85, 125, 124, 327809, 85, 126, 108, 125,
              393281, 106, 127, 89, 13, 90, 196670, 127, 126, 131321, 64, 131320, 64, 262205, 6,
              129, 53, 327808, 6, 130, 129, 128, 196670, 53, 130, 131321, 61, 131320, 63, 65789,
              65592,
            ]),
            binary_broadcast_add_4d: new Uint32Array([
              119734787, 65536, 524296, 161, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 68, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 196613, 8, 7234924, 262149, 9, 1635018061,
              0, 262150, 9, 0, 7234924, 393222, 9, 1, 1400141167, 1701863784, 48, 393222, 9, 2,
              1400141167, 1701863784, 49, 393222, 9, 3, 1400141167, 1701863784, 50, 393222, 9, 4,
              1400141167, 1701863784, 51, 393222, 9, 5, 1396797033, 1684632180, 12389, 393222, 9, 6,
              1396797033, 1684632180, 12645, 393222, 9, 7, 1396797033, 1684632180, 12901, 393222, 9,
              8, 1396797033, 1684632180, 13157, 393222, 9, 9, 1396862569, 1684632180, 12389, 393222,
              9, 10, 1396862569, 1684632180, 12645, 393222, 9, 11, 1396862569, 1684632180, 12901,
              393222, 9, 12, 1396862569, 1684632180, 13157, 262149, 11, 1635018093, 0, 327685, 17,
              1400141167, 1701863784, 48, 327685, 21, 1400141167, 1701863784, 49, 327685, 25,
              1400141167, 1701863784, 50, 327685, 29, 1400141167, 1701863784, 51, 327685, 33,
              1396797033, 1684632180, 12389, 327685, 37, 1396797033, 1684632180, 12645, 327685, 41,
              1396797033, 1684632180, 12901, 327685, 45, 1396797033, 1684632180, 13157, 327685, 49,
              1396862569, 1684632180, 12389, 327685, 53, 1396862569, 1684632180, 12645, 327685, 57,
              1396862569, 1684632180, 12901, 327685, 61, 1396862569, 1684632180, 13157, 196613, 65,
              105, 524293, 68, 1197436007, 1633841004, 1986939244, 1952539503, 1231974249, 68,
              262149, 82, 862808420, 0, 262149, 86, 846031204, 0, 262149, 90, 829253988, 0, 262149,
              97, 812476772, 0, 262149, 106, 1634890337, 17273, 327686, 106, 0, 1651340654, 7565925,
              262149, 108, 1634890337, 6512505, 262149, 111, 1634890337, 16761, 327686, 111, 0,
              1651340654, 7565925, 262149, 113, 1634890337, 6381433, 262149, 133, 1634890337, 17017,
              327686, 133, 0, 1651340654, 7565925, 262149, 135, 1634890337, 6446969, 262216, 9, 0,
              24, 327752, 9, 0, 35, 0, 262216, 9, 1, 24, 327752, 9, 1, 35, 4, 262216, 9, 2, 24,
              327752, 9, 2, 35, 8, 262216, 9, 3, 24, 327752, 9, 3, 35, 12, 262216, 9, 4, 24, 327752,
              9, 4, 35, 16, 262216, 9, 5, 24, 327752, 9, 5, 35, 20, 262216, 9, 6, 24, 327752, 9, 6,
              35, 24, 262216, 9, 7, 24, 327752, 9, 7, 35, 28, 262216, 9, 8, 24, 327752, 9, 8, 35,
              32, 262216, 9, 9, 24, 327752, 9, 9, 35, 36, 262216, 9, 10, 24, 327752, 9, 10, 35, 40,
              262216, 9, 11, 24, 327752, 9, 11, 35, 44, 262216, 9, 12, 24, 327752, 9, 12, 35, 48,
              196679, 9, 3, 262215, 11, 34, 0, 262215, 11, 33, 3, 262215, 68, 11, 28, 262215, 105,
              6, 4, 327752, 106, 0, 35, 0, 196679, 106, 3, 262215, 108, 34, 0, 262215, 108, 33, 2,
              262215, 110, 6, 4, 262216, 111, 0, 24, 327752, 111, 0, 35, 0, 196679, 111, 3, 262215,
              113, 34, 0, 262215, 113, 33, 0, 262215, 132, 6, 4, 262216, 133, 0, 24, 327752, 133, 0,
              35, 0, 196679, 133, 3, 262215, 135, 34, 0, 262215, 135, 33, 1, 262215, 160, 11, 25,
              131091, 2, 196641, 3, 2, 262165, 6, 32, 0, 262176, 7, 7, 6, 983070, 9, 6, 6, 6, 6, 6,
              6, 6, 6, 6, 6, 6, 6, 6, 262176, 10, 2, 9, 262203, 10, 11, 2, 262165, 12, 32, 1,
              262187, 12, 13, 0, 262176, 14, 2, 6, 262187, 12, 18, 1, 262187, 12, 22, 2, 262187, 12,
              26, 3, 262187, 12, 30, 4, 262187, 12, 34, 5, 262187, 12, 38, 6, 262187, 12, 42, 7,
              262187, 12, 46, 8, 262187, 12, 50, 9, 262187, 12, 54, 10, 262187, 12, 58, 11, 262187,
              12, 62, 12, 262167, 66, 6, 3, 262176, 67, 1, 66, 262203, 67, 68, 1, 262187, 6, 69, 0,
              262176, 70, 1, 6, 131092, 80, 196630, 104, 32, 196637, 105, 104, 196638, 106, 105,
              262176, 107, 2, 106, 262203, 107, 108, 2, 196637, 110, 104, 196638, 111, 110, 262176,
              112, 2, 111, 262203, 112, 113, 2, 262176, 129, 2, 104, 196637, 132, 104, 196638, 133,
              132, 262176, 134, 2, 133, 262203, 134, 135, 2, 262187, 6, 155, 4096, 262187, 6, 158,
              64, 262187, 6, 159, 1, 393260, 66, 160, 158, 159, 159, 327734, 2, 4, 0, 3, 131320, 5,
              262203, 7, 8, 7, 262203, 7, 17, 7, 262203, 7, 21, 7, 262203, 7, 25, 7, 262203, 7, 29,
              7, 262203, 7, 33, 7, 262203, 7, 37, 7, 262203, 7, 41, 7, 262203, 7, 45, 7, 262203, 7,
              49, 7, 262203, 7, 53, 7, 262203, 7, 57, 7, 262203, 7, 61, 7, 262203, 7, 65, 7, 262203,
              7, 82, 7, 262203, 7, 86, 7, 262203, 7, 90, 7, 262203, 7, 97, 7, 327745, 14, 15, 11,
              13, 262205, 6, 16, 15, 196670, 8, 16, 327745, 14, 19, 11, 18, 262205, 6, 20, 19,
              196670, 17, 20, 327745, 14, 23, 11, 22, 262205, 6, 24, 23, 196670, 21, 24, 327745, 14,
              27, 11, 26, 262205, 6, 28, 27, 196670, 25, 28, 327745, 14, 31, 11, 30, 262205, 6, 32,
              31, 196670, 29, 32, 327745, 14, 35, 11, 34, 262205, 6, 36, 35, 196670, 33, 36, 327745,
              14, 39, 11, 38, 262205, 6, 40, 39, 196670, 37, 40, 327745, 14, 43, 11, 42, 262205, 6,
              44, 43, 196670, 41, 44, 327745, 14, 47, 11, 46, 262205, 6, 48, 47, 196670, 45, 48,
              327745, 14, 51, 11, 50, 262205, 6, 52, 51, 196670, 49, 52, 327745, 14, 55, 11, 54,
              262205, 6, 56, 55, 196670, 53, 56, 327745, 14, 59, 11, 58, 262205, 6, 60, 59, 196670,
              57, 60, 327745, 14, 63, 11, 62, 262205, 6, 64, 63, 196670, 61, 64, 327745, 70, 71, 68,
              69, 262205, 6, 72, 71, 196670, 65, 72, 131321, 73, 131320, 73, 262390, 75, 76, 0,
              131321, 77, 131320, 77, 262205, 6, 78, 65, 262205, 6, 79, 8, 327856, 80, 81, 78, 79,
              262394, 81, 74, 75, 131320, 74, 262205, 6, 83, 65, 262205, 6, 84, 29, 327817, 6, 85,
              83, 84, 196670, 82, 85, 262205, 6, 87, 65, 262205, 6, 88, 29, 327814, 6, 89, 87, 88,
              196670, 86, 89, 262205, 6, 91, 86, 262205, 6, 92, 25, 327814, 6, 93, 91, 92, 196670,
              90, 93, 262205, 6, 94, 86, 262205, 6, 95, 25, 327817, 6, 96, 94, 95, 196670, 86, 96,
              262205, 6, 98, 90, 262205, 6, 99, 21, 327814, 6, 100, 98, 99, 196670, 97, 100, 262205,
              6, 101, 90, 262205, 6, 102, 21, 327817, 6, 103, 101, 102, 196670, 90, 103, 262205, 6,
              109, 65, 262205, 6, 114, 97, 262205, 6, 115, 33, 327812, 6, 116, 114, 115, 262205, 6,
              117, 90, 262205, 6, 118, 37, 327812, 6, 119, 117, 118, 327808, 6, 120, 116, 119,
              262205, 6, 121, 86, 262205, 6, 122, 41, 327812, 6, 123, 121, 122, 327808, 6, 124, 120,
              123, 262205, 6, 125, 82, 262205, 6, 126, 45, 327812, 6, 127, 125, 126, 327808, 6, 128,
              124, 127, 393281, 129, 130, 113, 13, 128, 262205, 104, 131, 130, 262205, 6, 136, 97,
              262205, 6, 137, 49, 327812, 6, 138, 136, 137, 262205, 6, 139, 90, 262205, 6, 140, 53,
              327812, 6, 141, 139, 140, 327808, 6, 142, 138, 141, 262205, 6, 143, 86, 262205, 6,
              144, 57, 327812, 6, 145, 143, 144, 327808, 6, 146, 142, 145, 262205, 6, 147, 82,
              262205, 6, 148, 61, 327812, 6, 149, 147, 148, 327808, 6, 150, 146, 149, 393281, 129,
              151, 135, 13, 150, 262205, 104, 152, 151, 327809, 104, 153, 131, 152, 393281, 129,
              154, 108, 13, 109, 196670, 154, 153, 131321, 76, 131320, 76, 262205, 6, 156, 65,
              327808, 6, 157, 156, 155, 196670, 65, 157, 131321, 73, 131320, 75, 65789, 65592,
            ]),
            binary_elementwise_add: new Uint32Array([
              119734787, 65536, 524296, 63, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 20, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 196613, 8, 7234924, 262149, 9, 1635018061,
              0, 262150, 9, 0, 7234924, 262149, 11, 1635018093, 0, 196613, 17, 105, 524293, 20,
              1197436007, 1633841004, 1986939244, 1952539503, 1231974249, 68, 262149, 36,
              1634890337, 17273, 327686, 36, 0, 1651340654, 7565925, 262149, 38, 1634890337,
              6512505, 262149, 41, 1634890337, 16761, 327686, 41, 0, 1651340654, 7565925, 262149,
              43, 1634890337, 6381433, 262149, 49, 1634890337, 17017, 327686, 49, 0, 1651340654,
              7565925, 262149, 51, 1634890337, 6446969, 262216, 9, 0, 24, 327752, 9, 0, 35, 0,
              196679, 9, 3, 262215, 11, 34, 0, 262215, 11, 33, 3, 262215, 20, 11, 28, 262215, 35, 6,
              4, 327752, 36, 0, 35, 0, 196679, 36, 3, 262215, 38, 34, 0, 262215, 38, 33, 2, 262215,
              40, 6, 4, 262216, 41, 0, 24, 327752, 41, 0, 35, 0, 196679, 41, 3, 262215, 43, 34, 0,
              262215, 43, 33, 0, 262215, 48, 6, 4, 262216, 49, 0, 24, 327752, 49, 0, 35, 0, 196679,
              49, 3, 262215, 51, 34, 0, 262215, 51, 33, 1, 262215, 62, 11, 25, 131091, 2, 196641, 3,
              2, 262165, 6, 32, 0, 262176, 7, 7, 6, 196638, 9, 6, 262176, 10, 2, 9, 262203, 10, 11,
              2, 262165, 12, 32, 1, 262187, 12, 13, 0, 262176, 14, 2, 6, 262167, 18, 6, 3, 262176,
              19, 1, 18, 262203, 19, 20, 1, 262187, 6, 21, 0, 262176, 22, 1, 6, 131092, 32, 196630,
              34, 32, 196637, 35, 34, 196638, 36, 35, 262176, 37, 2, 36, 262203, 37, 38, 2, 196637,
              40, 34, 196638, 41, 40, 262176, 42, 2, 41, 262203, 42, 43, 2, 262176, 45, 2, 34,
              196637, 48, 34, 196638, 49, 48, 262176, 50, 2, 49, 262203, 50, 51, 2, 262187, 6, 57,
              4096, 262187, 6, 60, 64, 262187, 6, 61, 1, 393260, 18, 62, 60, 61, 61, 327734, 2, 4,
              0, 3, 131320, 5, 262203, 7, 8, 7, 262203, 7, 17, 7, 327745, 14, 15, 11, 13, 262205, 6,
              16, 15, 196670, 8, 16, 327745, 22, 23, 20, 21, 262205, 6, 24, 23, 196670, 17, 24,
              131321, 25, 131320, 25, 262390, 27, 28, 0, 131321, 29, 131320, 29, 262205, 6, 30, 17,
              262205, 6, 31, 8, 327856, 32, 33, 30, 31, 262394, 33, 26, 27, 131320, 26, 262205, 6,
              39, 17, 262205, 6, 44, 17, 393281, 45, 46, 43, 13, 44, 262205, 34, 47, 46, 262205, 6,
              52, 17, 393281, 45, 53, 51, 13, 52, 262205, 34, 54, 53, 327809, 34, 55, 47, 54,
              393281, 45, 56, 38, 13, 39, 196670, 56, 55, 131321, 28, 131320, 28, 262205, 6, 58, 17,
              327808, 6, 59, 58, 57, 196670, 17, 59, 131321, 25, 131320, 27, 65789, 65592,
            ]),
            conv_bias: new Uint32Array([
              119734787, 65536, 524296, 89, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 34, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 262149, 8, 1668571490, 104, 327685, 9,
              1634890337, 1952796025, 97, 327686, 9, 0, 1668571490, 104, 327686, 9, 1, 1968138339,
              116, 327686, 9, 2, 1635022191, 6382962, 262149, 11, 1635018093, 0, 262149, 16,
              1968138339, 116, 262149, 20, 1635022191, 6382962, 262149, 24, 1635020660, 108, 196613,
              30, 7890025, 524293, 34, 1197436007, 1633841004, 1986939244, 1952539503, 1231974249,
              68, 196613, 49, 120, 196613, 53, 99, 262149, 62, 1634890337, 20345, 327686, 62, 0,
              1651340654, 7565925, 262149, 64, 1634890337, 7298937, 262149, 67, 1634890337, 18809,
              327686, 67, 0, 1651340654, 7565925, 262149, 69, 1634890337, 6905721, 262149, 75,
              1634890337, 17017, 327686, 75, 0, 1651340654, 7565925, 262149, 77, 1634890337,
              6446969, 262216, 9, 0, 24, 327752, 9, 0, 35, 0, 262216, 9, 1, 24, 327752, 9, 1, 35, 4,
              262216, 9, 2, 24, 327752, 9, 2, 35, 8, 196679, 9, 3, 262215, 11, 34, 0, 262215, 11,
              33, 3, 262215, 34, 11, 28, 262215, 61, 6, 4, 327752, 62, 0, 35, 0, 196679, 62, 3,
              262215, 64, 34, 0, 262215, 64, 33, 2, 262215, 66, 6, 4, 262216, 67, 0, 24, 327752, 67,
              0, 35, 0, 196679, 67, 3, 262215, 69, 34, 0, 262215, 69, 33, 0, 262215, 74, 6, 4,
              262216, 75, 0, 24, 327752, 75, 0, 35, 0, 196679, 75, 3, 262215, 77, 34, 0, 262215, 77,
              33, 1, 262215, 88, 11, 25, 131091, 2, 196641, 3, 2, 262165, 6, 32, 1, 262176, 7, 7, 6,
              327710, 9, 6, 6, 6, 262176, 10, 2, 9, 262203, 10, 11, 2, 262187, 6, 12, 0, 262176, 13,
              2, 6, 262187, 6, 17, 1, 262187, 6, 21, 2, 262165, 31, 32, 0, 262167, 32, 31, 3,
              262176, 33, 1, 32, 262203, 33, 34, 1, 262187, 31, 35, 0, 262176, 36, 1, 31, 131092,
              47, 196630, 60, 32, 196637, 61, 60, 196638, 62, 61, 262176, 63, 2, 62, 262203, 63, 64,
              2, 196637, 66, 60, 196638, 67, 66, 262176, 68, 2, 67, 262203, 68, 69, 2, 262176, 71,
              2, 60, 196637, 74, 60, 196638, 75, 74, 262176, 76, 2, 75, 262203, 76, 77, 2, 262187,
              6, 83, 4096, 262187, 31, 86, 64, 262187, 31, 87, 1, 393260, 32, 88, 86, 87, 87,
              327734, 2, 4, 0, 3, 131320, 5, 262203, 7, 8, 7, 262203, 7, 16, 7, 262203, 7, 20, 7,
              262203, 7, 24, 7, 262203, 7, 30, 7, 262203, 7, 49, 7, 262203, 7, 53, 7, 327745, 13,
              14, 11, 12, 262205, 6, 15, 14, 196670, 8, 15, 327745, 13, 18, 11, 17, 262205, 6, 19,
              18, 196670, 16, 19, 327745, 13, 22, 11, 21, 262205, 6, 23, 22, 196670, 20, 23, 262205,
              6, 25, 8, 262205, 6, 26, 16, 327812, 6, 27, 25, 26, 262205, 6, 28, 20, 327812, 6, 29,
              27, 28, 196670, 24, 29, 327745, 36, 37, 34, 35, 262205, 31, 38, 37, 262268, 6, 39, 38,
              196670, 30, 39, 131321, 40, 131320, 40, 262390, 42, 43, 0, 131321, 44, 131320, 44,
              262205, 6, 45, 30, 262205, 6, 46, 24, 327857, 47, 48, 45, 46, 262394, 48, 41, 42,
              131320, 41, 262205, 6, 50, 30, 262205, 6, 51, 20, 327819, 6, 52, 50, 51, 196670, 49,
              52, 262205, 6, 54, 30, 262205, 6, 55, 20, 327815, 6, 56, 54, 55, 196670, 53, 56,
              262205, 6, 57, 53, 262205, 6, 58, 16, 327819, 6, 59, 57, 58, 196670, 53, 59, 262205,
              6, 65, 30, 262205, 6, 70, 30, 393281, 71, 72, 69, 12, 70, 262205, 60, 73, 72, 262205,
              6, 78, 53, 393281, 71, 79, 77, 12, 78, 262205, 60, 80, 79, 327809, 60, 81, 73, 80,
              393281, 71, 82, 64, 12, 65, 196670, 82, 81, 131321, 43, 131320, 43, 262205, 6, 84, 30,
              327808, 6, 85, 84, 83, 196670, 30, 85, 131321, 40, 131320, 42, 65789, 65592,
            ]),
            conv_im2col: new Uint32Array([
              119734787, 65536, 524296, 229, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 94, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 262149, 8, 1970238055, 112, 327685, 9,
              1634890337, 1952796025, 97, 327686, 9, 0, 1970238055, 112, 327686, 9, 1, 1668571490,
              104, 393222, 9, 2, 1400141167, 1701863784, 48, 393222, 9, 3, 1400141167, 1701863784,
              49, 458758, 9, 4, 1850304611, 1198679376, 1886744434, 0, 458758, 9, 5, 1852990827,
              1750297701, 811954273, 0, 458758, 9, 6, 1852990827, 1750297701, 828731489, 0, 393222,
              9, 7, 1769108595, 812868964, 0, 393222, 9, 8, 1769108595, 829646180, 0, 327686, 9, 9,
              1935958384, 48, 327686, 9, 10, 1935958384, 49, 393222, 9, 11, 1634494820, 1852795252,
              12403, 393222, 9, 12, 1634494820, 1852795252, 12659, 393222, 9, 13, 1750298217,
              811954273, 0, 393222, 9, 14, 1750298217, 828731489, 0, 327686, 9, 15, 1850304611, 0,
              262149, 11, 1635018093, 0, 262149, 16, 1668571490, 104, 327685, 20, 1400141167,
              1701863784, 48, 327685, 24, 1400141167, 1701863784, 49, 393221, 28, 1850304611,
              1198679376, 1886744434, 0, 393221, 32, 1852990827, 1750297701, 811954273, 0, 393221,
              36, 1852990827, 1750297701, 828731489, 0, 327685, 40, 1769108595, 812868964, 0,
              327685, 44, 1769108595, 829646180, 0, 262149, 48, 1935958384, 48, 262149, 52,
              1935958384, 49, 327685, 56, 1634494820, 1852795252, 12403, 327685, 60, 1634494820,
              1852795252, 12659, 327685, 64, 1750298217, 811954273, 0, 327685, 68, 1750298217,
              828731489, 0, 262149, 72, 1850304611, 0, 262149, 76, 1635020660, 108, 196613, 90,
              7890025, 524293, 94, 1197436007, 1633841004, 1986939244, 1952539503, 1231974249, 68,
              196613, 109, 31083, 196613, 113, 30827, 196613, 117, 26979, 196613, 124, 30831,
              196613, 131, 31087, 196613, 138, 98, 196613, 145, 103, 196613, 152, 7958121, 196613,
              162, 7892585, 196613, 189, 118, 262149, 191, 1634890337, 22649, 327686, 191, 0,
              1651340654, 7565925, 262149, 193, 1634890337, 7888761, 262149, 217, 1634890337, 22905,
              327686, 217, 0, 1651340654, 7565925, 262149, 219, 1634890337, 7954297, 262216, 9, 0,
              24, 327752, 9, 0, 35, 0, 262216, 9, 1, 24, 327752, 9, 1, 35, 4, 262216, 9, 2, 24,
              327752, 9, 2, 35, 8, 262216, 9, 3, 24, 327752, 9, 3, 35, 12, 262216, 9, 4, 24, 327752,
              9, 4, 35, 16, 262216, 9, 5, 24, 327752, 9, 5, 35, 20, 262216, 9, 6, 24, 327752, 9, 6,
              35, 24, 262216, 9, 7, 24, 327752, 9, 7, 35, 28, 262216, 9, 8, 24, 327752, 9, 8, 35,
              32, 262216, 9, 9, 24, 327752, 9, 9, 35, 36, 262216, 9, 10, 24, 327752, 9, 10, 35, 40,
              262216, 9, 11, 24, 327752, 9, 11, 35, 44, 262216, 9, 12, 24, 327752, 9, 12, 35, 48,
              262216, 9, 13, 24, 327752, 9, 13, 35, 52, 262216, 9, 14, 24, 327752, 9, 14, 35, 56,
              262216, 9, 15, 24, 327752, 9, 15, 35, 60, 196679, 9, 3, 262215, 11, 34, 0, 262215, 11,
              33, 2, 262215, 94, 11, 28, 262215, 190, 6, 4, 262216, 191, 0, 24, 327752, 191, 0, 35,
              0, 196679, 191, 3, 262215, 193, 34, 0, 262215, 193, 33, 0, 262215, 216, 6, 4, 327752,
              217, 0, 35, 0, 196679, 217, 3, 262215, 219, 34, 0, 262215, 219, 33, 1, 262215, 228,
              11, 25, 131091, 2, 196641, 3, 2, 262165, 6, 32, 1, 262176, 7, 7, 6, 1179678, 9, 6, 6,
              6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 262176, 10, 2, 9, 262203, 10, 11, 2, 262187,
              6, 12, 0, 262176, 13, 2, 6, 262187, 6, 17, 1, 262187, 6, 21, 2, 262187, 6, 25, 3,
              262187, 6, 29, 4, 262187, 6, 33, 5, 262187, 6, 37, 6, 262187, 6, 41, 7, 262187, 6, 45,
              8, 262187, 6, 49, 9, 262187, 6, 53, 10, 262187, 6, 57, 11, 262187, 6, 61, 12, 262187,
              6, 65, 13, 262187, 6, 69, 14, 262187, 6, 73, 15, 262165, 91, 32, 0, 262167, 92, 91, 3,
              262176, 93, 1, 92, 262203, 93, 94, 1, 262187, 91, 95, 0, 262176, 96, 1, 91, 131092,
              107, 196630, 187, 32, 262176, 188, 7, 187, 196637, 190, 187, 196638, 191, 190, 262176,
              192, 2, 191, 262203, 192, 193, 2, 262176, 211, 2, 187, 262187, 187, 215, 0, 196637,
              216, 187, 196638, 217, 216, 262176, 218, 2, 217, 262203, 218, 219, 2, 262187, 6, 223,
              4096, 262187, 91, 226, 64, 262187, 91, 227, 1, 393260, 92, 228, 226, 227, 227, 327734,
              2, 4, 0, 3, 131320, 5, 262203, 7, 8, 7, 262203, 7, 16, 7, 262203, 7, 20, 7, 262203, 7,
              24, 7, 262203, 7, 28, 7, 262203, 7, 32, 7, 262203, 7, 36, 7, 262203, 7, 40, 7, 262203,
              7, 44, 7, 262203, 7, 48, 7, 262203, 7, 52, 7, 262203, 7, 56, 7, 262203, 7, 60, 7,
              262203, 7, 64, 7, 262203, 7, 68, 7, 262203, 7, 72, 7, 262203, 7, 76, 7, 262203, 7, 90,
              7, 262203, 7, 109, 7, 262203, 7, 113, 7, 262203, 7, 117, 7, 262203, 7, 124, 7, 262203,
              7, 131, 7, 262203, 7, 138, 7, 262203, 7, 145, 7, 262203, 7, 152, 7, 262203, 7, 162, 7,
              262203, 188, 189, 7, 327745, 13, 14, 11, 12, 262205, 6, 15, 14, 196670, 8, 15, 327745,
              13, 18, 11, 17, 262205, 6, 19, 18, 196670, 16, 19, 327745, 13, 22, 11, 21, 262205, 6,
              23, 22, 196670, 20, 23, 327745, 13, 26, 11, 25, 262205, 6, 27, 26, 196670, 24, 27,
              327745, 13, 30, 11, 29, 262205, 6, 31, 30, 196670, 28, 31, 327745, 13, 34, 11, 33,
              262205, 6, 35, 34, 196670, 32, 35, 327745, 13, 38, 11, 37, 262205, 6, 39, 38, 196670,
              36, 39, 327745, 13, 42, 11, 41, 262205, 6, 43, 42, 196670, 40, 43, 327745, 13, 46, 11,
              45, 262205, 6, 47, 46, 196670, 44, 47, 327745, 13, 50, 11, 49, 262205, 6, 51, 50,
              196670, 48, 51, 327745, 13, 54, 11, 53, 262205, 6, 55, 54, 196670, 52, 55, 327745, 13,
              58, 11, 57, 262205, 6, 59, 58, 196670, 56, 59, 327745, 13, 62, 11, 61, 262205, 6, 63,
              62, 196670, 60, 63, 327745, 13, 66, 11, 65, 262205, 6, 67, 66, 196670, 64, 67, 327745,
              13, 70, 11, 69, 262205, 6, 71, 70, 196670, 68, 71, 327745, 13, 74, 11, 73, 262205, 6,
              75, 74, 196670, 72, 75, 262205, 6, 77, 8, 262205, 6, 78, 16, 327812, 6, 79, 77, 78,
              262205, 6, 80, 20, 327812, 6, 81, 79, 80, 262205, 6, 82, 24, 327812, 6, 83, 81, 82,
              262205, 6, 84, 28, 327812, 6, 85, 83, 84, 262205, 6, 86, 32, 327812, 6, 87, 85, 86,
              262205, 6, 88, 36, 327812, 6, 89, 87, 88, 196670, 76, 89, 327745, 96, 97, 94, 95,
              262205, 91, 98, 97, 262268, 6, 99, 98, 196670, 90, 99, 131321, 100, 131320, 100,
              262390, 102, 103, 0, 131321, 104, 131320, 104, 262205, 6, 105, 90, 262205, 6, 106, 76,
              327857, 107, 108, 105, 106, 262394, 108, 101, 102, 131320, 101, 262205, 6, 110, 90,
              262205, 6, 111, 36, 327815, 6, 112, 110, 111, 196670, 109, 112, 262205, 6, 114, 90,
              262205, 6, 115, 36, 327819, 6, 116, 114, 115, 196670, 113, 116, 262205, 6, 118, 109,
              262205, 6, 119, 32, 327815, 6, 120, 118, 119, 196670, 117, 120, 262205, 6, 121, 109,
              262205, 6, 122, 32, 327819, 6, 123, 121, 122, 196670, 109, 123, 262205, 6, 125, 117,
              262205, 6, 126, 28, 327815, 6, 127, 125, 126, 196670, 124, 127, 262205, 6, 128, 117,
              262205, 6, 129, 28, 327819, 6, 130, 128, 129, 196670, 117, 130, 262205, 6, 132, 124,
              262205, 6, 133, 24, 327815, 6, 134, 132, 133, 196670, 131, 134, 262205, 6, 135, 124,
              262205, 6, 136, 24, 327819, 6, 137, 135, 136, 196670, 124, 137, 262205, 6, 139, 131,
              262205, 6, 140, 20, 327815, 6, 141, 139, 140, 196670, 138, 141, 262205, 6, 142, 131,
              262205, 6, 143, 20, 327819, 6, 144, 142, 143, 196670, 131, 144, 262205, 6, 146, 138,
              262205, 6, 147, 16, 327815, 6, 148, 146, 147, 196670, 145, 148, 262205, 6, 149, 138,
              262205, 6, 150, 16, 327819, 6, 151, 149, 150, 196670, 138, 151, 262205, 6, 153, 131,
              262205, 6, 154, 40, 327812, 6, 155, 153, 154, 262205, 6, 156, 48, 327810, 6, 157, 155,
              156, 262205, 6, 158, 109, 262205, 6, 159, 56, 327812, 6, 160, 158, 159, 327808, 6,
              161, 157, 160, 196670, 152, 161, 262205, 6, 163, 124, 262205, 6, 164, 44, 327812, 6,
              165, 163, 164, 262205, 6, 166, 52, 327810, 6, 167, 165, 166, 262205, 6, 168, 113,
              262205, 6, 169, 60, 327812, 6, 170, 168, 169, 327808, 6, 171, 167, 170, 196670, 162,
              171, 262205, 6, 172, 152, 327855, 107, 173, 172, 12, 262205, 6, 174, 152, 262205, 6,
              175, 64, 327857, 107, 176, 174, 175, 327847, 107, 177, 173, 176, 262205, 6, 178, 162,
              327855, 107, 179, 178, 12, 327847, 107, 180, 177, 179, 262205, 6, 181, 162, 262205, 6,
              182, 68, 327857, 107, 183, 181, 182, 327847, 107, 184, 180, 183, 196855, 186, 0,
              262394, 184, 185, 214, 131320, 185, 262205, 6, 194, 138, 262205, 6, 195, 72, 327812,
              6, 196, 194, 195, 262205, 6, 197, 145, 262205, 6, 198, 28, 327812, 6, 199, 197, 198,
              327808, 6, 200, 196, 199, 262205, 6, 201, 117, 327808, 6, 202, 200, 201, 262205, 6,
              203, 64, 327812, 6, 204, 202, 203, 262205, 6, 205, 152, 327808, 6, 206, 204, 205,
              262205, 6, 207, 68, 327812, 6, 208, 206, 207, 262205, 6, 209, 162, 327808, 6, 210,
              208, 209, 393281, 211, 212, 193, 12, 210, 262205, 187, 213, 212, 196670, 189, 213,
              131321, 186, 131320, 214, 196670, 189, 215, 131321, 186, 131320, 186, 262205, 6, 220,
              90, 262205, 187, 221, 189, 393281, 211, 222, 219, 12, 220, 196670, 222, 221, 131321,
              103, 131320, 103, 262205, 6, 224, 90, 327808, 6, 225, 224, 223, 196670, 90, 225,
              131321, 100, 131320, 102, 65789, 65592,
            ]),
            conv_matmul: new Uint32Array([
              119734787, 65536, 524296, 130, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 38, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 262149, 8, 1970238055, 112, 327685, 9,
              1634890337, 1952796025, 97, 327686, 9, 0, 1970238055, 112, 327686, 9, 1, 1953853282,
              0, 458758, 9, 2, 1968138339, 1919242356, 1970238023, 112, 327686, 9, 3, 1802398051,
              7826280, 262149, 11, 1635018093, 0, 262149, 16, 1953853282, 0, 393221, 20, 1968138339,
              1919242356, 1970238023, 112, 262149, 24, 1802398051, 7826280, 262149, 28, 1635020660,
              108, 196613, 34, 7890025, 524293, 38, 1197436007, 1633841004, 1986939244, 1952539503,
              1231974249, 68, 196613, 53, 120, 196613, 57, 121, 196613, 61, 103, 196613, 70, 115,
              196613, 72, 28777, 262149, 82, 1634890337, 18809, 327686, 82, 0, 1651340654, 7565925,
              262149, 84, 1634890337, 6905721, 262149, 98, 1634890337, 22393, 327686, 98, 0,
              1651340654, 7565925, 262149, 100, 1634890337, 7823225, 262149, 118, 1634890337, 21625,
              327686, 118, 0, 1651340654, 7565925, 262149, 120, 1634890337, 7626617, 262216, 9, 0,
              24, 327752, 9, 0, 35, 0, 262216, 9, 1, 24, 327752, 9, 1, 35, 4, 262216, 9, 2, 24,
              327752, 9, 2, 35, 8, 262216, 9, 3, 24, 327752, 9, 3, 35, 12, 196679, 9, 3, 262215, 11,
              34, 0, 262215, 11, 33, 3, 262215, 38, 11, 28, 262215, 81, 6, 4, 262216, 82, 0, 24,
              327752, 82, 0, 35, 0, 196679, 82, 3, 262215, 84, 34, 0, 262215, 84, 33, 0, 262215, 97,
              6, 4, 262216, 98, 0, 24, 327752, 98, 0, 35, 0, 196679, 98, 3, 262215, 100, 34, 0,
              262215, 100, 33, 1, 262215, 117, 6, 4, 327752, 118, 0, 35, 0, 196679, 118, 3, 262215,
              120, 34, 0, 262215, 120, 33, 2, 262215, 129, 11, 25, 131091, 2, 196641, 3, 2, 262165,
              6, 32, 1, 262176, 7, 7, 6, 393246, 9, 6, 6, 6, 6, 262176, 10, 2, 9, 262203, 10, 11, 2,
              262187, 6, 12, 0, 262176, 13, 2, 6, 262187, 6, 17, 1, 262187, 6, 21, 2, 262187, 6, 25,
              3, 262165, 35, 32, 0, 262167, 36, 35, 3, 262176, 37, 1, 36, 262203, 37, 38, 1, 262187,
              35, 39, 0, 262176, 40, 1, 35, 131092, 51, 196630, 68, 32, 262176, 69, 7, 68, 262187,
              68, 71, 0, 196637, 81, 68, 196638, 82, 81, 262176, 83, 2, 82, 262203, 83, 84, 2,
              262176, 94, 2, 68, 196637, 97, 68, 196638, 98, 97, 262176, 99, 2, 98, 262203, 99, 100,
              2, 196637, 117, 68, 196638, 118, 117, 262176, 119, 2, 118, 262203, 119, 120, 2,
              262187, 6, 124, 4096, 262187, 35, 127, 64, 262187, 35, 128, 1, 393260, 36, 129, 127,
              128, 128, 327734, 2, 4, 0, 3, 131320, 5, 262203, 7, 8, 7, 262203, 7, 16, 7, 262203, 7,
              20, 7, 262203, 7, 24, 7, 262203, 7, 28, 7, 262203, 7, 34, 7, 262203, 7, 53, 7, 262203,
              7, 57, 7, 262203, 7, 61, 7, 262203, 69, 70, 7, 262203, 7, 72, 7, 327745, 13, 14, 11,
              12, 262205, 6, 15, 14, 196670, 8, 15, 327745, 13, 18, 11, 17, 262205, 6, 19, 18,
              196670, 16, 19, 327745, 13, 22, 11, 21, 262205, 6, 23, 22, 196670, 20, 23, 327745, 13,
              26, 11, 25, 262205, 6, 27, 26, 196670, 24, 27, 262205, 6, 29, 8, 262205, 6, 30, 16,
              327812, 6, 31, 29, 30, 262205, 6, 32, 20, 327812, 6, 33, 31, 32, 196670, 28, 33,
              327745, 40, 41, 38, 39, 262205, 35, 42, 41, 262268, 6, 43, 42, 196670, 34, 43, 131321,
              44, 131320, 44, 262390, 46, 47, 0, 131321, 48, 131320, 48, 262205, 6, 49, 34, 262205,
              6, 50, 28, 327857, 51, 52, 49, 50, 262394, 52, 45, 46, 131320, 45, 262205, 6, 54, 34,
              262205, 6, 55, 20, 327819, 6, 56, 54, 55, 196670, 53, 56, 262205, 6, 58, 34, 262205,
              6, 59, 20, 327815, 6, 60, 58, 59, 196670, 57, 60, 262205, 6, 62, 57, 262205, 6, 63,
              16, 327815, 6, 64, 62, 63, 196670, 61, 64, 262205, 6, 65, 57, 262205, 6, 66, 16,
              327819, 6, 67, 65, 66, 196670, 57, 67, 196670, 70, 71, 196670, 72, 12, 131321, 73,
              131320, 73, 262390, 75, 76, 0, 131321, 77, 131320, 77, 262205, 6, 78, 72, 262205, 6,
              79, 24, 327857, 51, 80, 78, 79, 262394, 80, 74, 75, 131320, 74, 262205, 6, 85, 61,
              262205, 6, 86, 16, 327812, 6, 87, 85, 86, 262205, 6, 88, 57, 327808, 6, 89, 87, 88,
              262205, 6, 90, 24, 327812, 6, 91, 89, 90, 262205, 6, 92, 72, 327808, 6, 93, 91, 92,
              393281, 94, 95, 84, 12, 93, 262205, 68, 96, 95, 262205, 6, 101, 61, 262205, 6, 102,
              20, 327812, 6, 103, 101, 102, 262205, 6, 104, 53, 327808, 6, 105, 103, 104, 262205, 6,
              106, 24, 327812, 6, 107, 105, 106, 262205, 6, 108, 72, 327808, 6, 109, 107, 108,
              393281, 94, 110, 100, 12, 109, 262205, 68, 111, 110, 327813, 68, 112, 96, 111, 262205,
              68, 113, 70, 327809, 68, 114, 113, 112, 196670, 70, 114, 131321, 76, 131320, 76,
              262205, 6, 115, 72, 327808, 6, 116, 115, 17, 196670, 72, 116, 131321, 73, 131320, 75,
              262205, 6, 121, 34, 262205, 68, 122, 70, 393281, 94, 123, 120, 12, 121, 196670, 123,
              122, 131321, 47, 131320, 47, 262205, 6, 125, 34, 327808, 6, 126, 125, 124, 196670, 34,
              126, 131321, 44, 131320, 46, 65789, 65592,
            ]),
            conv_transpose: new Uint32Array([
              119734787, 65536, 524296, 110, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 40, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 262149, 8, 1970238055, 112, 327685, 9,
              1634890337, 1952796025, 97, 327686, 9, 0, 1970238055, 112, 327686, 9, 1, 1668571490,
              104, 327686, 9, 2, 1635022191, 6382962, 458758, 9, 3, 1968138339, 1919242356,
              1970238023, 112, 262149, 11, 1635018093, 0, 262149, 16, 1668571490, 104, 262149, 20,
              1635022191, 6382962, 393221, 24, 1968138339, 1919242356, 1970238023, 112, 262149, 28,
              1635020660, 108, 196613, 36, 7890025, 524293, 40, 1197436007, 1633841004, 1986939244,
              1952539503, 1231974249, 68, 196613, 55, 120, 196613, 59, 99, 196613, 63, 103, 196613,
              70, 98, 262149, 79, 1634890337, 20345, 327686, 79, 0, 1651340654, 7565925, 262149, 81,
              1634890337, 7298937, 262149, 84, 1634890337, 21625, 327686, 84, 0, 1651340654,
              7565925, 262149, 86, 1634890337, 7626617, 262216, 9, 0, 24, 327752, 9, 0, 35, 0,
              262216, 9, 1, 24, 327752, 9, 1, 35, 4, 262216, 9, 2, 24, 327752, 9, 2, 35, 8, 262216,
              9, 3, 24, 327752, 9, 3, 35, 12, 196679, 9, 3, 262215, 11, 34, 0, 262215, 11, 33, 2,
              262215, 40, 11, 28, 262215, 78, 6, 4, 327752, 79, 0, 35, 0, 196679, 79, 3, 262215, 81,
              34, 0, 262215, 81, 33, 1, 262215, 83, 6, 4, 262216, 84, 0, 24, 327752, 84, 0, 35, 0,
              196679, 84, 3, 262215, 86, 34, 0, 262215, 86, 33, 0, 262215, 109, 11, 25, 131091, 2,
              196641, 3, 2, 262165, 6, 32, 1, 262176, 7, 7, 6, 393246, 9, 6, 6, 6, 6, 262176, 10, 2,
              9, 262203, 10, 11, 2, 262187, 6, 12, 0, 262176, 13, 2, 6, 262187, 6, 17, 1, 262187, 6,
              21, 2, 262187, 6, 25, 3, 262165, 37, 32, 0, 262167, 38, 37, 3, 262176, 39, 1, 38,
              262203, 39, 40, 1, 262187, 37, 41, 0, 262176, 42, 1, 37, 131092, 53, 196630, 77, 32,
              196637, 78, 77, 196638, 79, 78, 262176, 80, 2, 79, 262203, 80, 81, 2, 196637, 83, 77,
              196638, 84, 83, 262176, 85, 2, 84, 262203, 85, 86, 2, 262176, 100, 2, 77, 262187, 6,
              104, 4096, 262187, 37, 107, 64, 262187, 37, 108, 1, 393260, 38, 109, 107, 108, 108,
              327734, 2, 4, 0, 3, 131320, 5, 262203, 7, 8, 7, 262203, 7, 16, 7, 262203, 7, 20, 7,
              262203, 7, 24, 7, 262203, 7, 28, 7, 262203, 7, 36, 7, 262203, 7, 55, 7, 262203, 7, 59,
              7, 262203, 7, 63, 7, 262203, 7, 70, 7, 327745, 13, 14, 11, 12, 262205, 6, 15, 14,
              196670, 8, 15, 327745, 13, 18, 11, 17, 262205, 6, 19, 18, 196670, 16, 19, 327745, 13,
              22, 11, 21, 262205, 6, 23, 22, 196670, 20, 23, 327745, 13, 26, 11, 25, 262205, 6, 27,
              26, 196670, 24, 27, 262205, 6, 29, 8, 262205, 6, 30, 16, 327812, 6, 31, 29, 30,
              262205, 6, 32, 24, 327812, 6, 33, 31, 32, 262205, 6, 34, 20, 327812, 6, 35, 33, 34,
              196670, 28, 35, 327745, 42, 43, 40, 41, 262205, 37, 44, 43, 262268, 6, 45, 44, 196670,
              36, 45, 131321, 46, 131320, 46, 262390, 48, 49, 0, 131321, 50, 131320, 50, 262205, 6,
              51, 36, 262205, 6, 52, 28, 327857, 53, 54, 51, 52, 262394, 54, 47, 48, 131320, 47,
              262205, 6, 56, 36, 262205, 6, 57, 20, 327819, 6, 58, 56, 57, 196670, 55, 58, 262205,
              6, 60, 36, 262205, 6, 61, 20, 327815, 6, 62, 60, 61, 196670, 59, 62, 262205, 6, 64,
              59, 262205, 6, 65, 24, 327815, 6, 66, 64, 65, 196670, 63, 66, 262205, 6, 67, 59,
              262205, 6, 68, 24, 327819, 6, 69, 67, 68, 196670, 59, 69, 262205, 6, 71, 63, 262205,
              6, 72, 8, 327815, 6, 73, 71, 72, 196670, 70, 73, 262205, 6, 74, 63, 262205, 6, 75, 8,
              327819, 6, 76, 74, 75, 196670, 63, 76, 262205, 6, 82, 36, 262205, 6, 87, 63, 262205,
              6, 88, 16, 327812, 6, 89, 87, 88, 262205, 6, 90, 70, 327808, 6, 91, 89, 90, 262205, 6,
              92, 20, 327812, 6, 93, 91, 92, 262205, 6, 94, 55, 327808, 6, 95, 93, 94, 262205, 6,
              96, 24, 327812, 6, 97, 95, 96, 262205, 6, 98, 59, 327808, 6, 99, 97, 98, 393281, 100,
              101, 86, 12, 99, 262205, 77, 102, 101, 393281, 100, 103, 81, 12, 82, 196670, 103, 102,
              131321, 49, 131320, 49, 262205, 6, 105, 36, 327808, 6, 106, 105, 104, 196670, 36, 106,
              131321, 46, 131320, 48, 65789, 65592,
            ]),
            gemm: new Uint32Array([
              119734787, 65536, 524296, 167, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 63, 393232, 4, 17, 8, 8, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 196613, 8, 77, 327685, 10, 1634890337,
              1952796025, 97, 262150, 10, 0, 77, 262150, 10, 1, 78, 262150, 10, 2, 75, 393222, 10,
              3, 1769108595, 809592164, 0, 393222, 10, 4, 1769108595, 826369380, 0, 393222, 10, 5,
              1769108595, 809657700, 0, 393222, 10, 6, 1769108595, 826434916, 0, 393222, 10, 7,
              1769108595, 809723236, 0, 393222, 10, 8, 1769108595, 826500452, 0, 327686, 10, 9,
              1752198241, 97, 327686, 10, 10, 1635018082, 0, 262149, 12, 1635018093, 0, 196613, 18,
              78, 196613, 22, 75, 327685, 26, 1769108595, 809592164, 0, 327685, 30, 1769108595,
              826369380, 0, 327685, 34, 1769108595, 809657700, 0, 327685, 38, 1769108595, 826434916,
              0, 327685, 42, 1769108595, 809723236, 0, 327685, 46, 1769108595, 826500452, 0, 262149,
              51, 1752198241, 97, 262149, 56, 1635018082, 0, 196613, 60, 120, 524293, 63,
              1197436007, 1633841004, 1986939244, 1952539503, 1231974249, 68, 196613, 77, 121,
              196613, 89, 7173491, 196613, 91, 107, 262149, 101, 1634890337, 16761, 327686, 101, 0,
              1651340654, 7565925, 262149, 103, 1634890337, 6381433, 262149, 114, 1634890337, 17017,
              327686, 114, 0, 1651340654, 7565925, 262149, 116, 1634890337, 6446969, 262149, 132,
              1634890337, 22905, 327686, 132, 0, 1651340654, 7565925, 262149, 134, 1634890337,
              7954297, 262149, 144, 1634890337, 17273, 327686, 144, 0, 1651340654, 7565925, 262149,
              146, 1634890337, 6512505, 262216, 10, 0, 24, 327752, 10, 0, 35, 0, 262216, 10, 1, 24,
              327752, 10, 1, 35, 4, 262216, 10, 2, 24, 327752, 10, 2, 35, 8, 262216, 10, 3, 24,
              327752, 10, 3, 35, 12, 262216, 10, 4, 24, 327752, 10, 4, 35, 16, 262216, 10, 5, 24,
              327752, 10, 5, 35, 20, 262216, 10, 6, 24, 327752, 10, 6, 35, 24, 262216, 10, 7, 24,
              327752, 10, 7, 35, 28, 262216, 10, 8, 24, 327752, 10, 8, 35, 32, 262216, 10, 9, 24,
              327752, 10, 9, 35, 36, 262216, 10, 10, 24, 327752, 10, 10, 35, 40, 196679, 10, 3,
              262215, 12, 34, 0, 262215, 12, 33, 4, 262215, 63, 11, 28, 262215, 100, 6, 4, 262216,
              101, 0, 24, 327752, 101, 0, 35, 0, 196679, 101, 3, 262215, 103, 34, 0, 262215, 103,
              33, 0, 262215, 113, 6, 4, 262216, 114, 0, 24, 327752, 114, 0, 35, 0, 196679, 114, 3,
              262215, 116, 34, 0, 262215, 116, 33, 1, 262215, 131, 6, 4, 327752, 132, 0, 35, 0,
              196679, 132, 3, 262215, 134, 34, 0, 262215, 134, 33, 3, 262215, 143, 6, 4, 262216,
              144, 0, 24, 327752, 144, 0, 35, 0, 196679, 144, 3, 262215, 146, 34, 0, 262215, 146,
              33, 2, 262215, 166, 11, 25, 131091, 2, 196641, 3, 2, 262165, 6, 32, 0, 262176, 7, 7,
              6, 196630, 9, 32, 851998, 10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 9, 262176, 11, 2, 10,
              262203, 11, 12, 2, 262165, 13, 32, 1, 262187, 13, 14, 0, 262176, 15, 2, 6, 262187, 13,
              19, 1, 262187, 13, 23, 2, 262187, 13, 27, 3, 262187, 13, 31, 4, 262187, 13, 35, 5,
              262187, 13, 39, 6, 262187, 13, 43, 7, 262187, 13, 47, 8, 262176, 50, 7, 9, 262187, 13,
              52, 9, 262176, 53, 2, 9, 262187, 13, 57, 10, 262167, 61, 6, 3, 262176, 62, 1, 61,
              262203, 62, 63, 1, 262187, 6, 64, 0, 262176, 65, 1, 6, 131092, 75, 262187, 6, 78, 1,
              262187, 9, 90, 0, 196637, 100, 9, 196638, 101, 100, 262176, 102, 2, 101, 262203, 102,
              103, 2, 196637, 113, 9, 196638, 114, 113, 262176, 115, 2, 114, 262203, 115, 116, 2,
              196637, 131, 9, 196638, 132, 131, 262176, 133, 2, 132, 262203, 133, 134, 2, 196637,
              143, 9, 196638, 144, 143, 262176, 145, 2, 144, 262203, 145, 146, 2, 262187, 6, 160,
              256, 262187, 6, 165, 8, 393260, 61, 166, 165, 165, 78, 327734, 2, 4, 0, 3, 131320, 5,
              262203, 7, 8, 7, 262203, 7, 18, 7, 262203, 7, 22, 7, 262203, 7, 26, 7, 262203, 7, 30,
              7, 262203, 7, 34, 7, 262203, 7, 38, 7, 262203, 7, 42, 7, 262203, 7, 46, 7, 262203, 50,
              51, 7, 262203, 50, 56, 7, 262203, 7, 60, 7, 262203, 7, 77, 7, 262203, 50, 89, 7,
              262203, 7, 91, 7, 327745, 15, 16, 12, 14, 262205, 6, 17, 16, 196670, 8, 17, 327745,
              15, 20, 12, 19, 262205, 6, 21, 20, 196670, 18, 21, 327745, 15, 24, 12, 23, 262205, 6,
              25, 24, 196670, 22, 25, 327745, 15, 28, 12, 27, 262205, 6, 29, 28, 196670, 26, 29,
              327745, 15, 32, 12, 31, 262205, 6, 33, 32, 196670, 30, 33, 327745, 15, 36, 12, 35,
              262205, 6, 37, 36, 196670, 34, 37, 327745, 15, 40, 12, 39, 262205, 6, 41, 40, 196670,
              38, 41, 327745, 15, 44, 12, 43, 262205, 6, 45, 44, 196670, 42, 45, 327745, 15, 48, 12,
              47, 262205, 6, 49, 48, 196670, 46, 49, 327745, 53, 54, 12, 52, 262205, 9, 55, 54,
              196670, 51, 55, 327745, 53, 58, 12, 57, 262205, 9, 59, 58, 196670, 56, 59, 327745, 65,
              66, 63, 64, 262205, 6, 67, 66, 196670, 60, 67, 131321, 68, 131320, 68, 262390, 70, 71,
              0, 131321, 72, 131320, 72, 262205, 6, 73, 60, 262205, 6, 74, 18, 327856, 75, 76, 73,
              74, 262394, 76, 69, 70, 131320, 69, 327745, 65, 79, 63, 78, 262205, 6, 80, 79, 196670,
              77, 80, 131321, 81, 131320, 81, 262390, 83, 84, 0, 131321, 85, 131320, 85, 262205, 6,
              86, 77, 262205, 6, 87, 8, 327856, 75, 88, 86, 87, 262394, 88, 82, 83, 131320, 82,
              196670, 89, 90, 196670, 91, 64, 131321, 92, 131320, 92, 262390, 94, 95, 0, 131321, 96,
              131320, 96, 262205, 6, 97, 91, 262205, 6, 98, 22, 327856, 75, 99, 97, 98, 262394, 99,
              93, 94, 131320, 93, 262205, 6, 104, 77, 262205, 6, 105, 26, 327812, 6, 106, 104, 105,
              262205, 6, 107, 91, 262205, 6, 108, 30, 327812, 6, 109, 107, 108, 327808, 6, 110, 106,
              109, 393281, 53, 111, 103, 14, 110, 262205, 9, 112, 111, 262205, 6, 117, 91, 262205,
              6, 118, 34, 327812, 6, 119, 117, 118, 262205, 6, 120, 60, 262205, 6, 121, 38, 327812,
              6, 122, 120, 121, 327808, 6, 123, 119, 122, 393281, 53, 124, 116, 14, 123, 262205, 9,
              125, 124, 327813, 9, 126, 112, 125, 262205, 9, 127, 89, 327809, 9, 128, 127, 126,
              196670, 89, 128, 131321, 95, 131320, 95, 262205, 6, 129, 91, 327808, 6, 130, 129, 19,
              196670, 91, 130, 131321, 92, 131320, 94, 262205, 6, 135, 60, 262205, 6, 136, 77,
              262205, 6, 137, 18, 327812, 6, 138, 136, 137, 327808, 6, 139, 135, 138, 262205, 9,
              140, 89, 262205, 9, 141, 51, 327813, 9, 142, 140, 141, 262205, 6, 147, 77, 262205, 6,
              148, 42, 327812, 6, 149, 147, 148, 262205, 6, 150, 60, 262205, 6, 151, 46, 327812, 6,
              152, 150, 151, 327808, 6, 153, 149, 152, 393281, 53, 154, 146, 14, 153, 262205, 9,
              155, 154, 262205, 9, 156, 56, 327813, 9, 157, 155, 156, 327809, 9, 158, 142, 157,
              393281, 53, 159, 134, 14, 139, 196670, 159, 158, 131321, 84, 131320, 84, 262205, 6,
              161, 77, 327808, 6, 162, 161, 160, 196670, 77, 162, 131321, 81, 131320, 83, 131321,
              71, 131320, 71, 262205, 6, 163, 60, 327808, 6, 164, 163, 160, 196670, 60, 164, 131321,
              68, 131320, 70, 65789, 65592,
            ]),
            relu: new Uint32Array([
              119734787, 65536, 524296, 57, 0, 131089, 1, 393227, 1, 1280527431, 1685353262,
              808793134, 0, 196622, 0, 1, 393231, 5, 4, 1852399981, 0, 20, 393232, 4, 17, 64, 1, 1,
              196611, 2, 450, 262149, 4, 1852399981, 0, 196613, 8, 7234924, 262149, 9, 1635018061,
              0, 262150, 9, 0, 7234924, 262149, 11, 1635018093, 0, 196613, 17, 105, 524293, 20,
              1197436007, 1633841004, 1986939244, 1952539503, 1231974249, 68, 262149, 36,
              1634890337, 17017, 327686, 36, 0, 1651340654, 7565925, 262149, 38, 1634890337,
              6446969, 262149, 41, 1634890337, 16761, 327686, 41, 0, 1651340654, 7565925, 262149,
              43, 1634890337, 6381433, 262216, 9, 0, 24, 327752, 9, 0, 35, 0, 196679, 9, 3, 262215,
              11, 34, 0, 262215, 11, 33, 2, 262215, 20, 11, 28, 262215, 35, 6, 4, 327752, 36, 0, 35,
              0, 196679, 36, 3, 262215, 38, 34, 0, 262215, 38, 33, 1, 262215, 40, 6, 4, 262216, 41,
              0, 24, 327752, 41, 0, 35, 0, 196679, 41, 3, 262215, 43, 34, 0, 262215, 43, 33, 0,
              262215, 56, 11, 25, 131091, 2, 196641, 3, 2, 262165, 6, 32, 0, 262176, 7, 7, 6,
              196638, 9, 6, 262176, 10, 2, 9, 262203, 10, 11, 2, 262165, 12, 32, 1, 262187, 12, 13,
              0, 262176, 14, 2, 6, 262167, 18, 6, 3, 262176, 19, 1, 18, 262203, 19, 20, 1, 262187,
              6, 21, 0, 262176, 22, 1, 6, 131092, 32, 196630, 34, 32, 196637, 35, 34, 196638, 36,
              35, 262176, 37, 2, 36, 262203, 37, 38, 2, 196637, 40, 34, 196638, 41, 40, 262176, 42,
              2, 41, 262203, 42, 43, 2, 262176, 45, 2, 34, 262187, 34, 48, 0, 262187, 6, 51, 4096,
              262187, 6, 54, 64, 262187, 6, 55, 1, 393260, 18, 56, 54, 55, 55, 327734, 2, 4, 0, 3,
              131320, 5, 262203, 7, 8, 7, 262203, 7, 17, 7, 327745, 14, 15, 11, 13, 262205, 6, 16,
              15, 196670, 8, 16, 327745, 22, 23, 20, 21, 262205, 6, 24, 23, 196670, 17, 24, 131321,
              25, 131320, 25, 262390, 27, 28, 0, 131321, 29, 131320, 29, 262205, 6, 30, 17, 262205,
              6, 31, 8, 327856, 32, 33, 30, 31, 262394, 33, 26, 27, 131320, 26, 262205, 6, 39, 17,
              262205, 6, 44, 17, 393281, 45, 46, 43, 13, 44, 262205, 34, 47, 46, 458764, 34, 49, 1,
              40, 47, 48, 393281, 45, 50, 38, 13, 39, 196670, 50, 49, 131321, 28, 131320, 28,
              262205, 6, 52, 17, 327808, 6, 53, 52, 51, 196670, 17, 53, 131321, 25, 131320, 27,
              65789, 65592,
            ]),
          }))
      },
      1908: function (e, t, n) {
        'use strict'
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        ;(Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.intOrLongToIntVector =
            t.intOrLongToInt =
            t.clipLong =
            t.arrayEqual =
            t.arrayProd =
            t.arraySum =
            t.arange =
            t.nonnull =
              void 0))
        const o = r(n(3720))
        ;((t.nonnull = function (e) {
          if (null != e) return e
          throw new Error('value is null')
        }),
          (t.arange = function (e, t, n = 1) {
            if (null == t) {
              const t = e,
                n = new Array(t)
              for (let e = 0; e < t; e++) n[e] = e
              return n
            }
            {
              const r = []
              if (n > 0) for (let o = e; o < t; o += n) r.push(o)
              else for (let o = e; o > t; o += n) r.push(o)
              return r
            }
          }),
          (t.arraySum = function (e) {
            let t = 0
            for (let n = 0; n < e.length; n++) t += e[n]
            return t
          }),
          (t.arrayProd = function (e) {
            let t = 1
            for (let n = 0; n < e.length; n++) t *= e[n]
            return t
          }),
          (t.arrayEqual = function (e, t) {
            if (e.length !== t.length) return !1
            for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1
            return !0
          }))
        const i = new o.default(2147483647, 0),
          s = new o.default(2147483648, 4294967295)
        function a(e) {
          return e.lessThan(s) ? -2147483648 : e.greaterThan(i) ? 2147483647 : e.toNumber()
        }
        function A(e) {
          return e instanceof o.default ? a(e) : e
        }
        ;((t.clipLong = a),
          (t.intOrLongToInt = A),
          (t.intOrLongToIntVector = function (e) {
            return e.map(A)
          }))
      },
    },
    __webpack_module_cache__ = {}
  function __webpack_require__(e) {
    var t = __webpack_module_cache__[e]
    if (void 0 !== t) return t.exports
    var n = (__webpack_module_cache__[e] = { exports: {} })
    return (__webpack_modules__[e].call(n.exports, n, n.exports, __webpack_require__), n.exports)
  }
  __webpack_require__.g = (function () {
    if ('object' == typeof globalThis) return globalThis
    try {
      return this || new Function('return this')()
    } catch (e) {
      if ('object' == typeof window) return window
    }
  })()
  var __webpack_exports__ = __webpack_require__(4931)
  WebDNN = __webpack_exports__
})()
