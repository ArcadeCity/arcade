"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../../node_modules/invariant/invariant.js
var require_invariant = __commonJS({
  "../../node_modules/invariant/invariant.js"(exports, module2) {
    "use strict";
    var NODE_ENV = process.env.NODE_ENV;
    var invariant2 = function(condition, format, a, b, c, d, e, f) {
      if (NODE_ENV !== "production") {
        if (format === void 0) {
          throw new Error("invariant requires an error message argument");
        }
      }
      if (!condition) {
        var error;
        if (format === void 0) {
          error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function() {
            return args[argIndex++];
          }));
          error.name = "Invariant Violation";
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module2.exports = invariant2;
  }
});

// ../../node_modules/compare-versions/index.js
var require_compare_versions = __commonJS({
  "../../node_modules/compare-versions/index.js"(exports, module2) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof exports === "object") {
        module2.exports = factory();
      } else {
        root.compareVersions = factory();
      }
    })(exports, function() {
      var semver = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
      function indexOrEnd(str, q) {
        return str.indexOf(q) === -1 ? str.length : str.indexOf(q);
      }
      function split(v) {
        var c = v.replace(/^v/, "").replace(/\+.*$/, "");
        var patchIndex = indexOrEnd(c, "-");
        var arr = c.substring(0, patchIndex).split(".");
        arr.push(c.substring(patchIndex + 1));
        return arr;
      }
      function tryParse(v) {
        return isNaN(Number(v)) ? v : Number(v);
      }
      function validate(version) {
        if (typeof version !== "string") {
          throw new TypeError("Invalid argument expected string");
        }
        if (!semver.test(version)) {
          throw new Error("Invalid argument not valid semver ('" + version + "' received)");
        }
      }
      function compareVersions2(v1, v2) {
        [v1, v2].forEach(validate);
        var s1 = split(v1);
        var s2 = split(v2);
        for (var i = 0; i < Math.max(s1.length - 1, s2.length - 1); i++) {
          var n1 = parseInt(s1[i] || 0, 10);
          var n2 = parseInt(s2[i] || 0, 10);
          if (n1 > n2)
            return 1;
          if (n2 > n1)
            return -1;
        }
        var sp1 = s1[s1.length - 1];
        var sp2 = s2[s2.length - 1];
        if (sp1 && sp2) {
          var p1 = sp1.split(".").map(tryParse);
          var p2 = sp2.split(".").map(tryParse);
          for (i = 0; i < Math.max(p1.length, p2.length); i++) {
            if (p1[i] === void 0 || typeof p2[i] === "string" && typeof p1[i] === "number")
              return -1;
            if (p2[i] === void 0 || typeof p1[i] === "string" && typeof p2[i] === "number")
              return 1;
            if (p1[i] > p2[i])
              return 1;
            if (p2[i] > p1[i])
              return -1;
          }
        } else if (sp1 || sp2) {
          return sp1 ? -1 : 1;
        }
        return 0;
      }
      ;
      var allowedOperators = [
        ">",
        ">=",
        "=",
        "<",
        "<="
      ];
      var operatorResMap = {
        ">": [1],
        ">=": [0, 1],
        "=": [0],
        "<=": [-1, 0],
        "<": [-1]
      };
      function validateOperator(op) {
        if (typeof op !== "string") {
          throw new TypeError("Invalid operator type, expected string but got " + typeof op);
        }
        if (allowedOperators.indexOf(op) === -1) {
          throw new TypeError("Invalid operator, expected one of " + allowedOperators.join("|"));
        }
      }
      compareVersions2.validate = function(version) {
        return typeof version === "string" && semver.test(version);
      };
      compareVersions2.compare = function(v1, v2, operator) {
        validateOperator(operator);
        var res = compareVersions2(v1, v2);
        return operatorResMap[operator].indexOf(res) > -1;
      };
      return compareVersions2;
    });
  }
});

// ../../node_modules/path-browserify/index.js
var require_path_browserify = __commonJS({
  "../../node_modules/path-browserify/index.js"(exports, module2) {
    "use strict";
    function assertPath(path2) {
      if (typeof path2 !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
      }
    }
    function normalizeStringPosix(path2, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path2.length; ++i) {
        if (i < path2.length)
          code = path2.charCodeAt(i);
        else if (code === 47)
          break;
        else
          code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0)
                res += "/..";
              else
                res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0)
              res += "/" + path2.slice(lastSlash + 1, i);
            else
              res = path2.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    var posix = {
      resolve: function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path2;
          if (i >= 0)
            path2 = arguments[i];
          else {
            if (cwd === void 0)
              cwd = process.cwd();
            path2 = cwd;
          }
          assertPath(path2);
          if (path2.length === 0) {
            continue;
          }
          resolvedPath = path2 + "/" + resolvedPath;
          resolvedAbsolute = path2.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0)
            return "/" + resolvedPath;
          else
            return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      },
      normalize: function normalize(path2) {
        assertPath(path2);
        if (path2.length === 0)
          return ".";
        var isAbsolute = path2.charCodeAt(0) === 47;
        var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
        path2 = normalizeStringPosix(path2, !isAbsolute);
        if (path2.length === 0 && !isAbsolute)
          path2 = ".";
        if (path2.length > 0 && trailingSeparator)
          path2 += "/";
        if (isAbsolute)
          return "/" + path2;
        return path2;
      },
      isAbsolute: function isAbsolute(path2) {
        assertPath(path2);
        return path2.length > 0 && path2.charCodeAt(0) === 47;
      },
      join: function join() {
        if (arguments.length === 0)
          return ".";
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0)
              joined = arg;
            else
              joined += "/" + arg;
          }
        }
        if (joined === void 0)
          return ".";
        return posix.normalize(joined);
      },
      relative: function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to)
          return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to)
          return "";
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
          if (from.charCodeAt(fromStart) !== 47)
            break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47)
            break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
          if (i === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i) === 47) {
                return to.slice(toStart + i + 1);
              } else if (i === 0) {
                return to.slice(toStart + i);
              }
            } else if (fromLen > length) {
              if (from.charCodeAt(fromStart + i) === 47) {
                lastCommonSep = i;
              } else if (i === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from.charCodeAt(fromStart + i);
          var toCode = to.charCodeAt(toStart + i);
          if (fromCode !== toCode)
            break;
          else if (fromCode === 47)
            lastCommonSep = i;
        }
        var out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
          if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0)
              out += "..";
            else
              out += "/..";
          }
        }
        if (out.length > 0)
          return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47)
            ++toStart;
          return to.slice(toStart);
        }
      },
      _makeLong: function _makeLong(path2) {
        return path2;
      },
      dirname: function dirname(path2) {
        assertPath(path2);
        if (path2.length === 0)
          return ".";
        var code = path2.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path2.length - 1; i >= 1; --i) {
          code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1)
          return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
          return "//";
        return path2.slice(0, end);
      },
      basename: function basename(path2, ext) {
        if (ext !== void 0 && typeof ext !== "string")
          throw new TypeError('"ext" argument must be a string');
        assertPath(path2);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
          if (ext.length === path2.length && ext === path2)
            return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path2.length - 1; i >= 0; --i) {
            var code = path2.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end)
            end = firstNonSlashEnd;
          else if (end === -1)
            end = path2.length;
          return path2.slice(start, end);
        } else {
          for (i = path2.length - 1; i >= 0; --i) {
            if (path2.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1)
            return "";
          return path2.slice(start, end);
        }
      },
      extname: function extname(path2) {
        assertPath(path2);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path2.length - 1; i >= 0; --i) {
          var code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return "";
        }
        return path2.slice(startDot, end);
      },
      format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      },
      parse: function parse(path2) {
        assertPath(path2);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path2.length === 0)
          return ret;
        var code = path2.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path2.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute)
              ret.base = ret.name = path2.slice(1, end);
            else
              ret.base = ret.name = path2.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path2.slice(1, startDot);
            ret.base = path2.slice(1, end);
          } else {
            ret.name = path2.slice(startPart, startDot);
            ret.base = path2.slice(startPart, end);
          }
          ret.ext = path2.slice(startDot, end);
        }
        if (startPart > 0)
          ret.dir = path2.slice(0, startPart - 1);
        else if (isAbsolute)
          ret.dir = "/";
        return ret;
      },
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    posix.posix = posix;
    module2.exports = posix;
  }
});

// ../../node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "../../node_modules/requires-port/index.js"(exports, module2) {
    "use strict";
    module2.exports = function required(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port)
        return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    };
  }
});

// ../../node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "../../node_modules/querystringify/index.js"(exports) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    function encode(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser.exec(query)) {
        var key = decode(part[1]), value = decode(part[2]);
        if (key === null || value === null || key in result)
          continue;
        result[key] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix)
        prefix = "?";
      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode(key);
          value = encode(value);
          if (key === null || value === null)
            continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    exports.stringify = querystringify;
    exports.parse = querystring;
  }
});

// ../../node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "../../node_modules/url-parse/index.js"(exports, module2) {
    "use strict";
    var required = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    var rules = [
      ["#", "hash"],
      ["?", "query"],
      function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      },
      ["/", "pathname"],
      ["@", "auth", 1],
      [NaN, "host", void 0, 1, 1],
      [/:(\d*)$/, "port", void 0, 1],
      [NaN, "hostname", void 0, 1, 1]
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined")
        globalVar = window;
      else if (typeof global !== "undefined")
        globalVar = global;
      else if (typeof self !== "undefined")
        globalVar = self;
      else
        globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore)
          delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore)
            continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    function resolve(relative, base) {
      if (relative === "")
        return base;
      var path2 = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path2.length, last = path2[i - 1], unshift = false, up = 0;
      while (i--) {
        if (path2[i] === ".") {
          path2.splice(i, 1);
        } else if (path2[i] === "..") {
          path2.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0)
            unshift = true;
          path2.splice(i, 1);
          up--;
        }
      }
      if (unshift)
        path2.unshift("");
      if (last === "." || last === "..")
        path2.push("");
      return path2.join("/");
    }
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser)
        parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || relative && location.slashes;
      url.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url);
          continue;
        }
        parse = instruction[0];
        key = instruction[1];
        if (parse !== parse) {
          url[key] = address;
        } else if ("string" === typeof parse) {
          index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse.exec(address)) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }
        url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4])
          url[key] = url[key].toLowerCase();
      }
      if (parser)
        url.query = parser(url.query);
      if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
        url.pathname = resolve(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
        url.pathname = "/" + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = "";
      }
      url.username = url.password = "";
      if (url.auth) {
        index = url.auth.indexOf(":");
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
      }
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
    }
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case "port":
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = "";
          } else if (value) {
            url.host = url.hostname + ":" + value;
          }
          break;
        case "hostname":
          url[part] = value;
          if (url.port)
            value += ":" + url.port;
          url.host = value;
          break;
        case "host":
          url[part] = value;
          if (port.test(value)) {
            value = value.split(":");
            url.port = value.pop();
            url.hostname = value.join(":");
          } else {
            url.hostname = value;
            url.port = "";
          }
          break;
        case "protocol":
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case "username":
        case "password":
          url[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4])
          url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password ? url.username + ":" + url.password : url.username;
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
      return url;
    }
    function toString(stringify) {
      if (!stringify || "function" !== typeof stringify)
        stringify = qs.stringify;
      var query, url = this, host = url.host, protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":")
        protocol += ":";
      var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
      if (url.username) {
        result += url.username;
        if (url.password)
          result += ":" + url.password;
        result += "@";
      } else if (url.password) {
        result += ":" + url.password;
        result += "@";
      } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
        host += ":";
      }
      result += host + url.pathname;
      query = "object" === typeof url.query ? stringify(url.query) : url.query;
      if (query)
        result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url.hash)
        result += url.hash;
      return result;
    }
    Url.prototype = { set, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module2.exports = Url;
  }
});

// ../../node_modules/blueimp-md5/js/md5.js
var require_md5 = __commonJS({
  "../../node_modules/blueimp-md5/js/md5.js"(exports, module2) {
    (function($) {
      "use strict";
      function safeAdd(x, y) {
        var lsw = (x & 65535) + (y & 65535);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 65535;
      }
      function bitRotateLeft(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
      }
      function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
      }
      function md5ff(a, b, c, d, x, s, t) {
        return md5cmn(b & c | ~b & d, a, b, x, s, t);
      }
      function md5gg(a, b, c, d, x, s, t) {
        return md5cmn(b & d | c & ~d, a, b, x, s, t);
      }
      function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
      }
      function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t);
      }
      function binlMD5(x, len) {
        x[len >> 5] |= 128 << len % 32;
        x[(len + 64 >>> 9 << 4) + 14] = len;
        var i;
        var olda;
        var oldb;
        var oldc;
        var oldd;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (i = 0; i < x.length; i += 16) {
          olda = a;
          oldb = b;
          oldc = c;
          oldd = d;
          a = md5ff(a, b, c, d, x[i], 7, -680876936);
          d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
          b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
          a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = md5gg(b, c, d, a, x[i], 20, -373897302);
          a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
          a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
          d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = md5hh(d, a, b, c, x[i], 11, -358537222);
          c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
          a = md5ii(a, b, c, d, x[i], 6, -198630844);
          d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
          a = safeAdd(a, olda);
          b = safeAdd(b, oldb);
          c = safeAdd(c, oldc);
          d = safeAdd(d, oldd);
        }
        return [a, b, c, d];
      }
      function binl2rstr(input) {
        var i;
        var output = "";
        var length32 = input.length * 32;
        for (i = 0; i < length32; i += 8) {
          output += String.fromCharCode(input[i >> 5] >>> i % 32 & 255);
        }
        return output;
      }
      function rstr2binl(input) {
        var i;
        var output = [];
        output[(input.length >> 2) - 1] = void 0;
        for (i = 0; i < output.length; i += 1) {
          output[i] = 0;
        }
        var length8 = input.length * 8;
        for (i = 0; i < length8; i += 8) {
          output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << i % 32;
        }
        return output;
      }
      function rstrMD5(s) {
        return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
      }
      function rstrHMACMD5(key, data) {
        var i;
        var bkey = rstr2binl(key);
        var ipad = [];
        var opad = [];
        var hash;
        ipad[15] = opad[15] = void 0;
        if (bkey.length > 16) {
          bkey = binlMD5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
          ipad[i] = bkey[i] ^ 909522486;
          opad[i] = bkey[i] ^ 1549556828;
        }
        hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
      }
      function rstr2hex(input) {
        var hexTab = "0123456789abcdef";
        var output = "";
        var x;
        var i;
        for (i = 0; i < input.length; i += 1) {
          x = input.charCodeAt(i);
          output += hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15);
        }
        return output;
      }
      function str2rstrUTF8(input) {
        return unescape(encodeURIComponent(input));
      }
      function rawMD5(s) {
        return rstrMD5(str2rstrUTF8(s));
      }
      function hexMD5(s) {
        return rstr2hex(rawMD5(s));
      }
      function rawHMACMD5(k, d) {
        return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
      }
      function hexHMACMD5(k, d) {
        return rstr2hex(rawHMACMD5(k, d));
      }
      function md5(string, key, raw) {
        if (!key) {
          if (!raw) {
            return hexMD5(string);
          }
          return rawMD5(string);
        }
        if (!raw) {
          return hexHMACMD5(key, string);
        }
        return rawHMACMD5(key, string);
      }
      if (typeof define === "function" && define.amd) {
        define(function() {
          return md5;
        });
      } else if (typeof module2 === "object" && module2.exports) {
        module2.exports = md5;
      } else {
        $.md5 = md5;
      }
    })(exports);
  }
});

// ../../node_modules/uuid/lib/rng.js
var require_rng = __commonJS({
  "../../node_modules/uuid/lib/rng.js"(exports, module2) {
    var crypto = require("crypto");
    module2.exports = function nodeRNG() {
      return crypto.randomBytes(16);
    };
  }
});

// ../../node_modules/uuid/lib/bytesToUuid.js
var require_bytesToUuid = __commonJS({
  "../../node_modules/uuid/lib/bytesToUuid.js"(exports, module2) {
    var byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 256).toString(16).substr(1);
    }
    var i;
    function bytesToUuid(buf, offset) {
      var i2 = offset || 0;
      var bth = byteToHex;
      return [
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]]
      ].join("");
    }
    module2.exports = bytesToUuid;
  }
});

// ../../node_modules/uuid/v1.js
var require_v1 = __commonJS({
  "../../node_modules/uuid/v1.js"(exports, module2) {
    var rng = require_rng();
    var bytesToUuid = require_bytesToUuid();
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v1(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || [];
      options = options || {};
      var node = options.node || _nodeId;
      var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        var seedBytes = rng();
        if (node == null) {
          node = _nodeId = [
            seedBytes[0] | 1,
            seedBytes[1],
            seedBytes[2],
            seedBytes[3],
            seedBytes[4],
            seedBytes[5]
          ];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      var msecs = options.msecs !== void 0 ? options.msecs : new Date().getTime();
      var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      var tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (var n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf ? buf : bytesToUuid(b);
    }
    module2.exports = v1;
  }
});

// ../../node_modules/uuid/v4.js
var require_v4 = __commonJS({
  "../../node_modules/uuid/v4.js"(exports, module2) {
    var rng = require_rng();
    var bytesToUuid = require_bytesToUuid();
    function v4(options, buf, offset) {
      var i = buf && offset || 0;
      if (typeof options == "string") {
        buf = options === "binary" ? new Array(16) : null;
        options = null;
      }
      options = options || {};
      var rnds = options.random || (options.rng || rng)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }
      return buf || bytesToUuid(rnds);
    }
    module2.exports = v4;
  }
});

// ../../node_modules/uuid/index.js
var require_uuid = __commonJS({
  "../../node_modules/uuid/index.js"(exports, module2) {
    var v1 = require_v1();
    var v4 = require_v4();
    var uuid = v4;
    uuid.v1 = v1;
    uuid.v4 = v4;
    module2.exports = uuid;
  }
});

// ../../node_modules/@expo-google-fonts/inter/Inter_100Thin.ttf
var require_Inter_100Thin = __commonJS({
  "../../node_modules/@expo-google-fonts/inter/Inter_100Thin.ttf"(exports, module2) {
    module2.exports = "./Inter_100Thin-YKKOQ4AQ.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/inter/Inter_200ExtraLight.ttf
var require_Inter_200ExtraLight = __commonJS({
  "../../node_modules/@expo-google-fonts/inter/Inter_200ExtraLight.ttf"(exports, module2) {
    module2.exports = "./Inter_200ExtraLight-OFKAMWZJ.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/inter/Inter_300Light.ttf
var require_Inter_300Light = __commonJS({
  "../../node_modules/@expo-google-fonts/inter/Inter_300Light.ttf"(exports, module2) {
    module2.exports = "./Inter_300Light-IC2EYETV.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/inter/Inter_400Regular.ttf
var require_Inter_400Regular = __commonJS({
  "../../node_modules/@expo-google-fonts/inter/Inter_400Regular.ttf"(exports, module2) {
    module2.exports = "./Inter_400Regular-QZBCX47V.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/inter/Inter_500Medium.ttf
var require_Inter_500Medium = __commonJS({
  "../../node_modules/@expo-google-fonts/inter/Inter_500Medium.ttf"(exports, module2) {
    module2.exports = "./Inter_500Medium-N3TGDM6Y.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/inter/Inter_600SemiBold.ttf
var require_Inter_600SemiBold = __commonJS({
  "../../node_modules/@expo-google-fonts/inter/Inter_600SemiBold.ttf"(exports, module2) {
    module2.exports = "./Inter_600SemiBold-5OXST2KR.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/inter/Inter_700Bold.ttf
var require_Inter_700Bold = __commonJS({
  "../../node_modules/@expo-google-fonts/inter/Inter_700Bold.ttf"(exports, module2) {
    module2.exports = "./Inter_700Bold-BMNK7APG.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/inter/Inter_800ExtraBold.ttf
var require_Inter_800ExtraBold = __commonJS({
  "../../node_modules/@expo-google-fonts/inter/Inter_800ExtraBold.ttf"(exports, module2) {
    module2.exports = "./Inter_800ExtraBold-2GOKUAXT.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/inter/Inter_900Black.ttf
var require_Inter_900Black = __commonJS({
  "../../node_modules/@expo-google-fonts/inter/Inter_900Black.ttf"(exports, module2) {
    module2.exports = "./Inter_900Black-UYXQRZVD.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/lexend/Lexend_100Thin.ttf
var require_Lexend_100Thin = __commonJS({
  "../../node_modules/@expo-google-fonts/lexend/Lexend_100Thin.ttf"(exports, module2) {
    module2.exports = "./Lexend_100Thin-KPJNL2W7.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/lexend/Lexend_200ExtraLight.ttf
var require_Lexend_200ExtraLight = __commonJS({
  "../../node_modules/@expo-google-fonts/lexend/Lexend_200ExtraLight.ttf"(exports, module2) {
    module2.exports = "./Lexend_200ExtraLight-2MSCLTZV.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/lexend/Lexend_300Light.ttf
var require_Lexend_300Light = __commonJS({
  "../../node_modules/@expo-google-fonts/lexend/Lexend_300Light.ttf"(exports, module2) {
    module2.exports = "./Lexend_300Light-JBRSKGOF.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/lexend/Lexend_400Regular.ttf
var require_Lexend_400Regular = __commonJS({
  "../../node_modules/@expo-google-fonts/lexend/Lexend_400Regular.ttf"(exports, module2) {
    module2.exports = "./Lexend_400Regular-PRZXLDVP.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/lexend/Lexend_500Medium.ttf
var require_Lexend_500Medium = __commonJS({
  "../../node_modules/@expo-google-fonts/lexend/Lexend_500Medium.ttf"(exports, module2) {
    module2.exports = "./Lexend_500Medium-ZSLJFBLC.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/lexend/Lexend_600SemiBold.ttf
var require_Lexend_600SemiBold = __commonJS({
  "../../node_modules/@expo-google-fonts/lexend/Lexend_600SemiBold.ttf"(exports, module2) {
    module2.exports = "./Lexend_600SemiBold-OI67CA6G.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/lexend/Lexend_700Bold.ttf
var require_Lexend_700Bold = __commonJS({
  "../../node_modules/@expo-google-fonts/lexend/Lexend_700Bold.ttf"(exports, module2) {
    module2.exports = "./Lexend_700Bold-JEX6OGG2.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/lexend/Lexend_800ExtraBold.ttf
var require_Lexend_800ExtraBold = __commonJS({
  "../../node_modules/@expo-google-fonts/lexend/Lexend_800ExtraBold.ttf"(exports, module2) {
    module2.exports = "./Lexend_800ExtraBold-6JPSXRKJ.ttf";
  }
});

// ../../node_modules/@expo-google-fonts/lexend/Lexend_900Black.ttf
var require_Lexend_900Black = __commonJS({
  "../../node_modules/@expo-google-fonts/lexend/Lexend_900Black.ttf"(exports, module2) {
    module2.exports = "./Lexend_900Black-ABF76HPO.ttf";
  }
});

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  ACTIVE_OPACITY: () => ACTIVE_OPACITY,
  FontProvider: () => FontProvider,
  Text: () => Text,
  color: () => color,
  palette: () => palette,
  spacing: () => spacing,
  typography: () => typography
});
module.exports = __toCommonJS(src_exports);

// src/atoms/text/text.tsx
var import_ramda = require("ramda");
var React = __toESM(require("react"));
var import_react_native2 = require("react-native");

// src/theme/palette.ts
var palette = {
  arwes: "rgb(0, 248, 248)",
  arwesTitle: "#a1ecfb",
  arwesText: "#26dafd",
  arwesFade: "rgba(0, 248, 248, 0.5)",
  arwesFader: "rgba(0, 248, 248, 0.3)",
  arwesSecondary: "rgb(6,61,62)",
  white: "#FFFFFF",
  black: "#000000",
  haiti: "#120B29",
  purple: "#1C133A",
  portGore: "#2D2252",
  blueBell: "#9D98CB",
  blueBellFaded: "rgba(157, 152, 203, 0.6)",
  minsk: "#46367C",
  moonRaker: "#EEECFB",
  radicalRed: "#FC3A57",
  pinkFlamingo: "#F459F4",
  electricViolet: "#AE30FF",
  electricIndigo: "#5B20F2",
  blueBright: "#66B3F8"
};

// src/theme/color.ts
var ACTIVE_OPACITY = 0.8;
var color = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  background: palette.haiti,
  primary: palette.electricIndigo,
  secondary: palette.moonRaker,
  info: palette.portGore,
  line: palette.portGore,
  field: palette.portGore,
  tabbar: palette.portGore,
  text: palette.moonRaker,
  secondaryText: palette.minsk,
  dim: palette.blueBell,
  origin: palette.electricViolet,
  link: palette.electricViolet,
  active: palette.electricViolet,
  destination: palette.pinkFlamingo,
  highlight: palette.pinkFlamingo,
  error: palette.radicalRed,
  shadow: palette.haiti
};

// src/theme/spacing.ts
var spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64];

// src/theme/typography.ts
var import_react_native = require("react-native");
var typography = {
  primary: "Inter_400Regular",
  bold: "Inter_700Bold",
  secondary: "Lexend_700Bold",
  code: import_react_native.Platform.select({ ios: "Courier", android: "monospace", web: "monospace" })
};

// src/atoms/text/text.presets.ts
var BASE = {
  fontFamily: typography.primary,
  color: color.palette.moonRaker,
  fontSize: 15,
  lineHeight: 22
};
var SECONDARY = {
  ...BASE,
  color: color.palette.blueBell
};
var presets = {
  default: BASE,
  bold: { ...BASE, fontFamily: typography.bold },
  superBold: { ...BASE, fontFamily: typography.bold },
  header: { ...BASE, fontFamily: typography.bold, lineHeight: 16 },
  title: {
    ...BASE,
    fontSize: 28,
    lineHeight: 34,
    marginVertical: spacing[2],
    fontFamily: typography.secondary
  },
  title2: {
    ...BASE,
    fontSize: 22,
    lineHeight: 28,
    marginVertical: spacing[2]
  },
  title3: {
    ...BASE,
    fontSize: 24,
    lineHeight: 28,
    marginVertical: spacing[2],
    fontFamily: typography.bold
  },
  description: { ...SECONDARY, marginBottom: spacing[5] - 2 },
  descriptionSlim: { ...SECONDARY },
  label: { ...BASE, fontFamily: typography.secondary },
  labelCancel: {
    ...BASE,
    lineHeight: 16,
    fontFamily: typography.bold,
    color: color.error
  },
  labelAccept: {
    ...BASE,
    lineHeight: 16,
    fontFamily: typography.bold,
    color: color.primary
  },
  secondaryLabel: {
    color: color.secondaryText,
    fontSize: 16,
    lineHeight: 30
  },
  sectionHeader: {
    ...SECONDARY,
    fontSize: 13,
    lineHeight: 14,
    fontFamily: typography.bold,
    letterSpacing: 1,
    marginBottom: spacing[2]
  },
  error: {
    ...BASE,
    fontSize: 12,
    lineHeight: 14,
    color: color.error,
    marginTop: spacing[2]
  },
  link: {
    ...BASE,
    color: color.link,
    fontFamily: typography.bold
  },
  small: {
    ...SECONDARY,
    fontSize: 11,
    lineHeight: 14,
    color: color.palette.moonRaker
  },
  detail: {
    ...BASE,
    fontSize: 9,
    lineHeight: 11,
    fontFamily: typography.bold
  }
};

// src/atoms/text/text.tsx
var Text = (props) => {
  const {
    preset = "default",
    capitalize: capitalized = false,
    tx,
    txOptions,
    text,
    children,
    style: styleOverride,
    ...rest
  } = props;
  const whichText = text || "";
  const newText = capitalized ? capitalize(whichText) : whichText;
  const content = newText || children;
  const style = presets[preset] || presets.default;
  const styles = (0, import_ramda.flatten)([style, styleOverride]);
  return /* @__PURE__ */ React.createElement(import_react_native2.Text, {
    key: tx,
    ...rest,
    style: styles
  }, content);
};
function capitalize(theString) {
  return theString.charAt(0).toUpperCase() + theString.slice(1);
}

// src/fonts/font-provider.tsx
var import_react4 = __toESM(require("react"));

// ../../node_modules/@expo-google-fonts/inter/useFonts.js
var import_react2 = require("react");

// ../../node_modules/expo-modules-core/build/index.js
var import_react_native5 = require("react-native");

// ../../node_modules/expo-modules-core/build/EventEmitter.js
var import_invariant = __toESM(require_invariant());
var import_react_native3 = require("react-native");
var nativeEmitterSubscriptionKey = "@@nativeEmitterSubscription@@";
var EventEmitter = class {
  _listenerCount = 0;
  _nativeModule;
  _eventEmitter;
  constructor(nativeModule) {
    this._nativeModule = nativeModule;
    this._eventEmitter = new import_react_native3.NativeEventEmitter(nativeModule);
  }
  addListener(eventName, listener) {
    if (!this._listenerCount && import_react_native3.Platform.OS !== "ios" && this._nativeModule.startObserving) {
      this._nativeModule.startObserving();
    }
    this._listenerCount++;
    const nativeEmitterSubscription = this._eventEmitter.addListener(eventName, listener);
    const subscription = {
      [nativeEmitterSubscriptionKey]: nativeEmitterSubscription,
      remove: () => {
        this.removeSubscription(subscription);
      }
    };
    return subscription;
  }
  removeAllListeners(eventName) {
    const removedListenerCount = this._eventEmitter.listenerCount ? this._eventEmitter.listenerCount(eventName) : this._eventEmitter.listeners(eventName).length;
    this._eventEmitter.removeAllListeners(eventName);
    this._listenerCount -= removedListenerCount;
    (0, import_invariant.default)(this._listenerCount >= 0, `EventEmitter must have a non-negative number of listeners`);
    if (!this._listenerCount && import_react_native3.Platform.OS !== "ios" && this._nativeModule.stopObserving) {
      this._nativeModule.stopObserving();
    }
  }
  removeSubscription(subscription) {
    const nativeEmitterSubscription = subscription[nativeEmitterSubscriptionKey];
    if (!nativeEmitterSubscription) {
      return;
    }
    if ("remove" in nativeEmitterSubscription) {
      nativeEmitterSubscription.remove();
    } else if ("removeSubscription" in this._eventEmitter) {
      this._eventEmitter.removeSubscription(nativeEmitterSubscription);
    }
    this._listenerCount--;
    delete subscription[nativeEmitterSubscriptionKey];
    subscription.remove = () => {
    };
    if (!this._listenerCount && import_react_native3.Platform.OS !== "ios" && this._nativeModule.stopObserving) {
      this._nativeModule.stopObserving();
    }
  }
  emit(eventName, ...params) {
    this._eventEmitter.emit(eventName, ...params);
  }
};

// ../../node_modules/expo-modules-core/build/NativeModulesProxy.js
var NativeModulesProxy_default = {};

// ../../node_modules/expo-modules-core/build/Platform.js
var import_react_native4 = require("react-native");

// ../../node_modules/expo-modules-core/build/environment/browser.js
var isDOMAvailable = false;
var canUseEventListeners = false;
var canUseViewport = false;
var isAsyncDebugging = false;
if (__DEV__) {
  isAsyncDebugging = !global.nativeExtensions && !global.nativeCallSyncHook && !global.RN$Bridgeless;
}

// ../../node_modules/expo-modules-core/build/Platform.js
var Platform3 = {
  OS: import_react_native4.Platform.OS,
  select: import_react_native4.Platform.select,
  isDOMAvailable,
  canUseEventListeners,
  canUseViewport,
  isAsyncDebugging
};
var Platform_default = Platform3;

// ../../node_modules/expo-modules-core/build/errors/CodedError.js
var CodedError = class extends Error {
  code;
  info;
  constructor(code, message) {
    super(message);
    this.code = code;
  }
};

// ../../node_modules/expo-modules-core/build/errors/UnavailabilityError.js
var UnavailabilityError = class extends CodedError {
  constructor(moduleName, propertyName) {
    super("ERR_UNAVAILABLE", `The method or property ${moduleName}.${propertyName} is not available on ${Platform_default.OS}, are you sure you've linked all the native dependencies properly?`);
  }
};

// ../../node_modules/expo-modules-core/build/SyntheticPlatformEmitter.js
var import_RCTDeviceEventEmitter = __toESM(require("react-native/Libraries/EventEmitter/RCTDeviceEventEmitter"));

// ../../node_modules/expo-modules-core/build/sweet/NativeErrorManager.js
var NativeErrorManager_default = NativeModulesProxy_default.ExpoModulesCoreErrorManager;

// ../../node_modules/expo-modules-core/build/sweet/setUpErrorManager.fx.js
if (__DEV__ && Platform_default.OS === "android" && NativeErrorManager_default) {
  const onNewException = "ExpoModulesCoreErrorManager.onNewException";
  const eventEmitter = new EventEmitter(NativeErrorManager_default);
  eventEmitter.addListener(onNewException, ({ message }) => {
    console.error(message);
  });
}

// ../../node_modules/expo-modules-core/build/deprecate.js
var import_compare_versions = __toESM(require_compare_versions());

// ../../node_modules/expo-modules-core/build/PermissionsInterface.js
var PermissionStatus;
(function(PermissionStatus2) {
  PermissionStatus2["GRANTED"] = "granted";
  PermissionStatus2["UNDETERMINED"] = "undetermined";
  PermissionStatus2["DENIED"] = "denied";
})(PermissionStatus || (PermissionStatus = {}));

// ../../node_modules/expo-modules-core/build/PermissionsHook.js
var import_react = require("react");

// ../../node_modules/expo-font/build/ExpoFontLoader.js
var ExpoFontLoader_default = NativeModulesProxy_default.ExpoFontLoader;

// ../../node_modules/expo-asset/build/AssetRegistry.js
var AssetRegistry_exports = {};
__reExport(AssetRegistry_exports, require("react-native/Libraries/Image/AssetRegistry"));

// ../../node_modules/expo-asset/build/AssetSources.js
var import_path_browserify = __toESM(require_path_browserify());
var import_react_native8 = require("react-native");
var import_url_parse2 = __toESM(require_url_parse());

// ../../node_modules/expo-asset/build/AssetSourceResolver.js
var AssetSourceResolver_exports = {};
__export(AssetSourceResolver_exports, {
  default: () => AssetSourceResolver_default
});
var import_AssetSourceResolver = __toESM(require("react-native/Libraries/Image/AssetSourceResolver"));
__reExport(AssetSourceResolver_exports, require("react-native/Libraries/Image/AssetSourceResolver"));
var AssetSourceResolver_default = import_AssetSourceResolver.default;

// ../../node_modules/expo-asset/build/PlatformUtils.js
var import_blueimp_md5 = __toESM(require_md5());

// ../../node_modules/expo-constants/build/Constants.js
var import_react_native6 = require("react-native");

// ../../node_modules/expo-constants/build/Constants.types.js
var AppOwnership;
(function(AppOwnership2) {
  AppOwnership2["Standalone"] = "standalone";
  AppOwnership2["Expo"] = "expo";
  AppOwnership2["Guest"] = "guest";
})(AppOwnership || (AppOwnership = {}));
var ExecutionEnvironment;
(function(ExecutionEnvironment2) {
  ExecutionEnvironment2["Bare"] = "bare";
  ExecutionEnvironment2["Standalone"] = "standalone";
  ExecutionEnvironment2["StoreClient"] = "storeClient";
})(ExecutionEnvironment || (ExecutionEnvironment = {}));
var UserInterfaceIdiom;
(function(UserInterfaceIdiom2) {
  UserInterfaceIdiom2["Handset"] = "handset";
  UserInterfaceIdiom2["Tablet"] = "tablet";
  UserInterfaceIdiom2["Unsupported"] = "unsupported";
})(UserInterfaceIdiom || (UserInterfaceIdiom = {}));

// ../../node_modules/expo-constants/build/ExponentConstants.js
var ExponentConstants_default = NativeModulesProxy_default.ExponentConstants;

// ../../node_modules/expo-constants/build/Constants.js
if (!ExponentConstants_default) {
  console.warn("No native ExponentConstants module found, are you sure the expo-constants's module is linked properly?");
}
var rawManifest = null;
if (NativeModulesProxy_default.ExpoUpdates) {
  let updatesManifest;
  if (NativeModulesProxy_default.ExpoUpdates.manifest) {
    updatesManifest = NativeModulesProxy_default.ExpoUpdates.manifest;
  } else if (NativeModulesProxy_default.ExpoUpdates.manifestString) {
    updatesManifest = JSON.parse(NativeModulesProxy_default.ExpoUpdates.manifestString);
  }
  if (updatesManifest && Object.keys(updatesManifest).length > 0) {
    rawManifest = updatesManifest;
  }
}
if (import_react_native6.NativeModules.EXDevLauncher) {
  let devLauncherManifest;
  if (import_react_native6.NativeModules.EXDevLauncher.manifestString) {
    devLauncherManifest = JSON.parse(import_react_native6.NativeModules.EXDevLauncher.manifestString);
  }
  if (devLauncherManifest && Object.keys(devLauncherManifest).length > 0) {
    rawManifest = devLauncherManifest;
  }
}
if (!rawManifest && ExponentConstants_default && ExponentConstants_default.manifest) {
  rawManifest = ExponentConstants_default.manifest;
  if (typeof rawManifest === "string") {
    rawManifest = JSON.parse(rawManifest);
  }
}
var { name, appOwnership, ...nativeConstants } = ExponentConstants_default || {};
var warnedAboutDeviceYearClass = false;
var warnedAboutIosModel = false;
var constants = {
  ...nativeConstants,
  appOwnership: appOwnership ?? null
};
Object.defineProperties(constants, {
  deviceYearClass: {
    get() {
      if (!warnedAboutDeviceYearClass) {
        console.warn(`Constants.deviceYearClass has been deprecated in favor of expo-device's Device.deviceYearClass property. This API will be removed in SDK 45.`);
        warnedAboutDeviceYearClass = true;
      }
      return nativeConstants.deviceYearClass;
    },
    enumerable: false
  },
  installationId: {
    get() {
      return nativeConstants.installationId;
    },
    enumerable: false
  },
  __unsafeNoWarnManifest: {
    get() {
      const maybeManifest = getManifest(true);
      if (!maybeManifest || !isAppManifest(maybeManifest)) {
        return null;
      }
      return maybeManifest;
    },
    enumerable: false
  },
  __unsafeNoWarnManifest2: {
    get() {
      const maybeManifest = getManifest(true);
      if (!maybeManifest || !isManifest(maybeManifest)) {
        return null;
      }
      return maybeManifest;
    },
    enumerable: false
  },
  manifest: {
    get() {
      const maybeManifest = getManifest();
      if (!maybeManifest || !isAppManifest(maybeManifest)) {
        return null;
      }
      return maybeManifest;
    },
    enumerable: true
  },
  manifest2: {
    get() {
      const maybeManifest = getManifest();
      if (!maybeManifest || !isManifest(maybeManifest)) {
        return null;
      }
      return maybeManifest;
    },
    enumerable: true
  },
  expoConfig: {
    get() {
      var _a3;
      const maybeManifest = getManifest(true);
      if (!maybeManifest) {
        return null;
      }
      if (isManifest(maybeManifest)) {
        return ((_a3 = maybeManifest.extra) == null ? void 0 : _a3.expoClient) ?? null;
      } else if (isAppManifest(maybeManifest)) {
        return maybeManifest;
      }
      return null;
    },
    enumerable: true
  },
  __rawManifest_TEST: {
    get() {
      return rawManifest;
    },
    set(value) {
      rawManifest = value;
    },
    enumerable: false
  }
});
var _a;
if ((_a = constants == null ? void 0 : constants.platform) == null ? void 0 : _a.ios) {
  const originalModel = nativeConstants.platform.ios.model;
  Object.defineProperty(constants.platform.ios, "model", {
    get() {
      if (!warnedAboutIosModel) {
        console.warn(`Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.`);
        warnedAboutIosModel = true;
      }
      return originalModel;
    },
    enumerable: false
  });
}
function isAppManifest(manifest) {
  return !isManifest(manifest);
}
function isManifest(manifest) {
  return "metadata" in manifest;
}
function getManifest(suppressWarning = false) {
  if (!rawManifest) {
    const invalidManifestType = rawManifest === null ? "null" : "undefined";
    if (nativeConstants.executionEnvironment === ExecutionEnvironment.Bare && import_react_native6.Platform.OS !== "web") {
      if (!suppressWarning) {
        console.warn(`Constants.manifest is ${invalidManifestType} because the embedded app.config could not be read. Ensure that you have installed the expo-constants build scripts if you need to read from Constants.manifest.`);
      }
    } else if (nativeConstants.executionEnvironment === ExecutionEnvironment.StoreClient || nativeConstants.executionEnvironment === ExecutionEnvironment.Standalone) {
      throw new CodedError("ERR_CONSTANTS_MANIFEST_UNAVAILABLE", `Constants.manifest is ${invalidManifestType}, must be an object.`);
    }
  }
  return rawManifest;
}
var Constants_default = constants;

// ../../node_modules/expo-file-system/build/FileSystem.js
var import_react_native7 = require("react-native");
var import_uuid = __toESM(require_uuid());

// ../../node_modules/expo-file-system/build/ExponentFileSystemShim.js
var platformModule = {
  get name() {
    return "ExponentFileSystem";
  },
  get documentDirectory() {
    return null;
  },
  get cacheDirectory() {
    return null;
  },
  get bundledAssets() {
    return null;
  },
  get bundleDirectory() {
    return null;
  },
  addListener(eventName) {
  },
  removeListeners(count) {
  }
};
var ExponentFileSystemShim_default = platformModule;

// ../../node_modules/expo-file-system/build/ExponentFileSystem.js
var platformModule2;
if (NativeModulesProxy_default.ExponentFileSystem) {
  platformModule2 = NativeModulesProxy_default.ExponentFileSystem;
} else {
  platformModule2 = ExponentFileSystemShim_default;
}
var ExponentFileSystem_default = platformModule2;

// ../../node_modules/expo-file-system/build/FileSystem.types.js
var FileSystemSessionType;
(function(FileSystemSessionType2) {
  FileSystemSessionType2[FileSystemSessionType2["BACKGROUND"] = 0] = "BACKGROUND";
  FileSystemSessionType2[FileSystemSessionType2["FOREGROUND"] = 1] = "FOREGROUND";
})(FileSystemSessionType || (FileSystemSessionType = {}));
var FileSystemUploadType;
(function(FileSystemUploadType2) {
  FileSystemUploadType2[FileSystemUploadType2["BINARY_CONTENT"] = 0] = "BINARY_CONTENT";
  FileSystemUploadType2[FileSystemUploadType2["MULTIPART"] = 1] = "MULTIPART";
})(FileSystemUploadType || (FileSystemUploadType = {}));
var EncodingType;
(function(EncodingType2) {
  EncodingType2["UTF8"] = "utf8";
  EncodingType2["Base64"] = "base64";
})(EncodingType || (EncodingType = {}));

// ../../node_modules/expo-file-system/build/FileSystem.js
if (!ExponentFileSystem_default) {
  console.warn("No native ExponentFileSystem module found, are you sure the expo-file-system's module is linked properly?");
}
var _unused = new EventEmitter(ExponentFileSystem_default);
function normalizeEndingSlash(p) {
  if (p != null) {
    return p.replace(/\/*$/, "") + "/";
  }
  return null;
}
var documentDirectory = normalizeEndingSlash(ExponentFileSystem_default.documentDirectory);
var cacheDirectory = normalizeEndingSlash(ExponentFileSystem_default.cacheDirectory);
var { bundledAssets, bundleDirectory } = ExponentFileSystem_default;
async function getInfoAsync(fileUri, options = {}) {
  if (!ExponentFileSystem_default.getInfoAsync) {
    throw new UnavailabilityError("expo-file-system", "getInfoAsync");
  }
  return await ExponentFileSystem_default.getInfoAsync(fileUri, options);
}
async function readAsStringAsync(fileUri, options) {
  if (!ExponentFileSystem_default.readAsStringAsync) {
    throw new UnavailabilityError("expo-file-system", "readAsStringAsync");
  }
  return await ExponentFileSystem_default.readAsStringAsync(fileUri, options || {});
}
async function writeAsStringAsync(fileUri, contents, options = {}) {
  if (!ExponentFileSystem_default.writeAsStringAsync) {
    throw new UnavailabilityError("expo-file-system", "writeAsStringAsync");
  }
  return await ExponentFileSystem_default.writeAsStringAsync(fileUri, contents, options);
}
async function deleteAsync(fileUri, options = {}) {
  if (!ExponentFileSystem_default.deleteAsync) {
    throw new UnavailabilityError("expo-file-system", "deleteAsync");
  }
  return await ExponentFileSystem_default.deleteAsync(fileUri, options);
}
async function moveAsync(options) {
  if (!ExponentFileSystem_default.moveAsync) {
    throw new UnavailabilityError("expo-file-system", "moveAsync");
  }
  return await ExponentFileSystem_default.moveAsync(options);
}
async function copyAsync(options) {
  if (!ExponentFileSystem_default.copyAsync) {
    throw new UnavailabilityError("expo-file-system", "copyAsync");
  }
  return await ExponentFileSystem_default.copyAsync(options);
}
async function downloadAsync(uri, fileUri, options = {}) {
  if (!ExponentFileSystem_default.downloadAsync) {
    throw new UnavailabilityError("expo-file-system", "downloadAsync");
  }
  return await ExponentFileSystem_default.downloadAsync(uri, fileUri, {
    sessionType: FileSystemSessionType.BACKGROUND,
    ...options
  });
}
var baseReadAsStringAsync = readAsStringAsync;
var baseWriteAsStringAsync = writeAsStringAsync;
var baseDeleteAsync = deleteAsync;
var baseMoveAsync = moveAsync;
var baseCopyAsync = copyAsync;
var StorageAccessFramework;
(function(StorageAccessFramework2) {
  function getUriForDirectoryInRoot(folderName) {
    return `content://com.android.externalstorage.documents/tree/primary:${folderName}/document/primary:${folderName}`;
  }
  StorageAccessFramework2.getUriForDirectoryInRoot = getUriForDirectoryInRoot;
  async function requestDirectoryPermissionsAsync(initialFileUrl = null) {
    if (!ExponentFileSystem_default.requestDirectoryPermissionsAsync) {
      throw new UnavailabilityError("expo-file-system", "StorageAccessFramework.requestDirectoryPermissionsAsync");
    }
    return await ExponentFileSystem_default.requestDirectoryPermissionsAsync(initialFileUrl);
  }
  StorageAccessFramework2.requestDirectoryPermissionsAsync = requestDirectoryPermissionsAsync;
  async function readDirectoryAsync(dirUri) {
    if (!ExponentFileSystem_default.readSAFDirectoryAsync) {
      throw new UnavailabilityError("expo-file-system", "StorageAccessFramework.readDirectoryAsync");
    }
    return await ExponentFileSystem_default.readSAFDirectoryAsync(dirUri, {});
  }
  StorageAccessFramework2.readDirectoryAsync = readDirectoryAsync;
  async function makeDirectoryAsync(parentUri, dirName) {
    if (!ExponentFileSystem_default.makeSAFDirectoryAsync) {
      throw new UnavailabilityError("expo-file-system", "StorageAccessFramework.makeDirectoryAsync");
    }
    return await ExponentFileSystem_default.makeSAFDirectoryAsync(parentUri, dirName);
  }
  StorageAccessFramework2.makeDirectoryAsync = makeDirectoryAsync;
  async function createFileAsync(parentUri, fileName, mimeType) {
    if (!ExponentFileSystem_default.createSAFFileAsync) {
      throw new UnavailabilityError("expo-file-system", "StorageAccessFramework.createFileAsync");
    }
    return await ExponentFileSystem_default.createSAFFileAsync(parentUri, fileName, mimeType);
  }
  StorageAccessFramework2.createFileAsync = createFileAsync;
  StorageAccessFramework2.writeAsStringAsync = baseWriteAsStringAsync;
  StorageAccessFramework2.readAsStringAsync = baseReadAsStringAsync;
  StorageAccessFramework2.deleteAsync = baseDeleteAsync;
  StorageAccessFramework2.moveAsync = baseMoveAsync;
  StorageAccessFramework2.copyAsync = baseCopyAsync;
})(StorageAccessFramework || (StorageAccessFramework = {}));

// ../../node_modules/expo-asset/build/AssetUris.js
var import_url_parse = __toESM(require_url_parse());
function getFilename(url) {
  const { pathname } = new import_url_parse.default(url, {});
  return pathname.substring(pathname.lastIndexOf("/") + 1);
}
function getFileExtension(url) {
  const filename = getFilename(url);
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex > 0 ? filename.substring(dotIndex) : "";
}
function getManifestBaseUrl(manifestUrl) {
  const urlObject = new import_url_parse.default(manifestUrl, {});
  if (urlObject.protocol === "exp:") {
    urlObject.set("protocol", "http:");
  } else if (urlObject.protocol === "exps:") {
    urlObject.set("protocol", "https:");
  }
  const directory = urlObject.pathname.substring(0, urlObject.pathname.lastIndexOf("/") + 1);
  urlObject.set("pathname", directory);
  urlObject.set("query", "");
  urlObject.set("hash", "");
  return urlObject.href;
}

// ../../node_modules/expo-asset/build/PlatformUtils.js
var IS_MANAGED_ENV = !!Constants_default.appOwnership;
var _a2, _b;
var IS_BARE_ENV_WITH_UPDATES = !IS_MANAGED_ENV && !!((_a2 = NativeModulesProxy_default.ExpoUpdates) == null ? void 0 : _a2.isEnabled) && !((_b = NativeModulesProxy_default.ExpoUpdates) == null ? void 0 : _b.isUsingEmbeddedAssets);
var IS_ENV_WITH_UPDATES_ENABLED = IS_MANAGED_ENV || IS_BARE_ENV_WITH_UPDATES;
function getLocalAssets() {
  var _a3;
  return ((_a3 = NativeModulesProxy_default.ExpoUpdates) == null ? void 0 : _a3.localAssets) ?? {};
}
function getManifest2() {
  return Constants_default.__unsafeNoWarnManifest ?? {};
}
function getManifest22() {
  return Constants_default.__unsafeNoWarnManifest2;
}
var manifestBaseUrl = Constants_default.experienceUrl ? getManifestBaseUrl(Constants_default.experienceUrl) : null;
async function downloadAsync2(uri, hash, type, name2) {
  if (IS_MANAGED_ENV) {
    return _downloadAsyncManagedEnv(uri, hash, type, name2);
  }
  return _downloadAsyncUnmanagedEnv(uri, hash, type);
}
async function _downloadAsyncManagedEnv(uri, hash, type, name2) {
  const cacheFileId = hash || (0, import_blueimp_md5.default)(uri);
  const localUri = `${cacheDirectory}ExponentAsset-${cacheFileId}.${type}`;
  let { exists, md5 } = await getInfoAsync(localUri, {
    md5: true
  });
  if (!exists || hash !== null && md5 !== hash) {
    ({ md5 } = await downloadAsync(uri, localUri, {
      md5: true
    }));
    if (hash !== null && md5 !== hash) {
      throw new Error(`Downloaded file for asset '${name2}.${type}' Located at ${uri} failed MD5 integrity check`);
    }
  }
  return localUri;
}
async function _downloadAsyncUnmanagedEnv(uri, hash, type) {
  if (uri.startsWith("file://")) {
    return uri;
  }
  const cacheFileId = hash || (0, import_blueimp_md5.default)(uri);
  const localUri = `${cacheDirectory}ExponentAsset-${cacheFileId}.${type}`;
  await downloadAsync(uri, localUri);
  return localUri;
}

// ../../node_modules/expo-asset/build/AssetSources.js
var assetMapOverride = getManifest2().assetMapOverride;
function selectAssetSource(meta) {
  var _a3, _b2;
  if (assetMapOverride && assetMapOverride.hasOwnProperty(meta.hash)) {
    meta = { ...meta, ...assetMapOverride[meta.hash] };
  }
  const scale = AssetSourceResolver_default.pickScale(meta.scales, import_react_native8.PixelRatio.get());
  const index = meta.scales.findIndex((s) => s === scale);
  const hash = meta.fileHashes ? meta.fileHashes[index] || meta.fileHashes[0] : meta.hash;
  const uri = meta.fileUris ? meta.fileUris[index] || meta.fileUris[0] : meta.uri;
  if (uri) {
    return { uri: resolveUri(uri), hash };
  }
  const assetUrlOverride = getManifest2().assetUrlOverride;
  if (assetUrlOverride) {
    const uri2 = import_path_browserify.default.join(assetUrlOverride, hash);
    return { uri: resolveUri(uri2), hash };
  }
  const fileScale = scale === 1 ? "" : `@${scale}x`;
  const fileExtension = meta.type ? `.${encodeURIComponent(meta.type)}` : "";
  const suffix = `/${encodeURIComponent(meta.name)}${fileScale}${fileExtension}?platform=${encodeURIComponent(Platform_default.OS)}&hash=${encodeURIComponent(meta.hash)}`;
  if (/^https?:\/\//.test(meta.httpServerLocation)) {
    const uri2 = meta.httpServerLocation + suffix;
    return { uri: uri2, hash };
  }
  const manifest2 = getManifest22();
  if ((_b2 = (_a3 = manifest2 == null ? void 0 : manifest2.extra) == null ? void 0 : _a3.expoGo) == null ? void 0 : _b2.developer) {
    const baseUrl = new import_url_parse2.default(`http://${manifest2.extra.expoGo.debuggerHost}`);
    baseUrl.set("pathname", meta.httpServerLocation + suffix);
    return {
      uri: baseUrl.href,
      hash
    };
  }
  if (getManifest2().developer) {
    const baseUrl = new import_url_parse2.default(getManifest2().bundleUrl);
    baseUrl.set("pathname", meta.httpServerLocation + suffix);
    return { uri: baseUrl.href, hash };
  }
  return {
    uri: `https://classic-assets.eascdn.net/~assets/${encodeURIComponent(hash)}`,
    hash
  };
}
function resolveUri(uri) {
  if (!manifestBaseUrl) {
    return uri;
  }
  const { protocol } = new import_url_parse2.default(uri);
  if (protocol !== "") {
    return uri;
  }
  const baseUrl = new import_url_parse2.default(manifestBaseUrl);
  const resolvedPath = uri.startsWith("/") ? uri : import_path_browserify.default.join(baseUrl.pathname, uri);
  baseUrl.set("pathname", resolvedPath);
  return baseUrl.href;
}

// ../../node_modules/expo-asset/build/ImageAssets.js
function isImageType(type) {
  return /^(jpeg|jpg|gif|png|bmp|webp|heic)$/i.test(type);
}
function getImageInfoAsync(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = reject;
    img.onload = () => {
      resolve({
        name: getFilename(url),
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.src = url;
  });
}

// ../../node_modules/expo-asset/build/LocalAssets.js
var bundledAssets2 = new Set(bundledAssets || []);
var localAssets = getLocalAssets();
function getLocalAssetUri(hash, type) {
  const localAssetsKey = hash;
  const legacyLocalAssetsKey = `${hash}.${type ?? ""}`;
  switch (true) {
    case localAssetsKey in localAssets: {
      return localAssets[localAssetsKey];
    }
    case legacyLocalAssetsKey in localAssets: {
      return localAssets[legacyLocalAssetsKey];
    }
    case !__DEV__: {
      const assetName = `asset_${hash}${type ? `.${type}` : ""}`;
      if (Constants_default.appOwnership !== "standalone" || !bundledAssets2.has(assetName)) {
        return null;
      }
      return `${bundleDirectory}${assetName}`;
    }
    default:
      return null;
  }
}

// ../../node_modules/expo-asset/build/resolveAssetSource.js
var resolveAssetSource_exports = {};
__export(resolveAssetSource_exports, {
  default: () => resolveAssetSource_default
});
var import_resolveAssetSource = __toESM(require("react-native/Libraries/Image/resolveAssetSource"));
__reExport(resolveAssetSource_exports, require("react-native/Libraries/Image/resolveAssetSource"));
var resolveAssetSource_default = import_resolveAssetSource.default;

// ../../node_modules/expo-asset/build/Asset.js
var _Asset = class {
  name;
  type;
  hash = null;
  uri;
  localUri = null;
  width = null;
  height = null;
  downloading = false;
  downloaded = false;
  _downloadCallbacks = [];
  constructor({ name: name2, type, hash = null, uri, width, height }) {
    this.name = name2;
    this.type = type;
    this.hash = hash;
    this.uri = uri;
    if (typeof width === "number") {
      this.width = width;
    }
    if (typeof height === "number") {
      this.height = height;
    }
    if (hash) {
      this.localUri = getLocalAssetUri(hash, type);
      if (this.localUri) {
        this.downloaded = true;
      }
    }
    if (Platform_default.OS === "web") {
      if (!name2) {
        this.name = getFilename(uri);
      }
      if (!type) {
        this.type = getFileExtension(uri);
      }
    }
  }
  static loadAsync(moduleId) {
    const moduleIds = Array.isArray(moduleId) ? moduleId : [moduleId];
    return Promise.all(moduleIds.map((moduleId2) => _Asset.fromModule(moduleId2).downloadAsync()));
  }
  static fromModule(virtualAssetModule) {
    if (typeof virtualAssetModule === "string") {
      return _Asset.fromURI(virtualAssetModule);
    }
    const meta = (0, AssetRegistry_exports.getAssetByID)(virtualAssetModule);
    if (!meta) {
      throw new Error(`Module "${virtualAssetModule}" is missing from the asset registry`);
    }
    if (!IS_ENV_WITH_UPDATES_ENABLED) {
      const { uri } = resolveAssetSource_default(virtualAssetModule);
      const asset = new _Asset({
        name: meta.name,
        type: meta.type,
        hash: meta.hash,
        uri,
        width: meta.width,
        height: meta.height
      });
      if (Platform_default.OS === "android" && !uri.includes(":") && (meta.width || meta.height)) {
        asset.localUri = asset.uri;
        asset.downloaded = true;
      }
      _Asset.byHash[meta.hash] = asset;
      return asset;
    }
    return _Asset.fromMetadata(meta);
  }
  static fromMetadata(meta) {
    const metaHash = meta.hash;
    if (_Asset.byHash[metaHash]) {
      return _Asset.byHash[metaHash];
    }
    const { uri, hash } = selectAssetSource(meta);
    const asset = new _Asset({
      name: meta.name,
      type: meta.type,
      hash,
      uri,
      width: meta.width,
      height: meta.height
    });
    _Asset.byHash[metaHash] = asset;
    return asset;
  }
  static fromURI(uri) {
    if (_Asset.byUri[uri]) {
      return _Asset.byUri[uri];
    }
    let type = "";
    if (uri.indexOf(";base64") > -1) {
      type = uri.split(";")[0].split("/")[1];
    } else {
      const extension = getFileExtension(uri);
      type = extension.startsWith(".") ? extension.substring(1) : extension;
    }
    const asset = new _Asset({
      name: "",
      type,
      hash: null,
      uri
    });
    _Asset.byUri[uri] = asset;
    return asset;
  }
  async downloadAsync() {
    if (this.downloaded) {
      return this;
    }
    if (this.downloading) {
      await new Promise((resolve, reject) => {
        this._downloadCallbacks.push({ resolve, reject });
      });
      return this;
    }
    this.downloading = true;
    try {
      if (Platform_default.OS === "web") {
        if (isImageType(this.type)) {
          const { width, height, name: name2 } = await getImageInfoAsync(this.uri);
          this.width = width;
          this.height = height;
          this.name = name2;
        } else {
          this.name = getFilename(this.uri);
        }
      }
      this.localUri = await downloadAsync2(this.uri, this.hash, this.type, this.name);
      this.downloaded = true;
      this._downloadCallbacks.forEach(({ resolve }) => resolve());
    } catch (e) {
      this._downloadCallbacks.forEach(({ reject }) => reject(e));
      throw e;
    } finally {
      this.downloading = false;
      this._downloadCallbacks = [];
    }
    return this;
  }
};
var Asset = _Asset;
__publicField(Asset, "byHash", {});
__publicField(Asset, "byUri", {});

// ../../node_modules/expo-font/build/FontLoader.js
var import_react_native9 = require("react-native");
var isInClient = Constants_default.appOwnership === "expo";
var isInIOSStandalone = Constants_default.appOwnership === "standalone" && import_react_native9.Platform.OS === "ios";
function fontFamilyNeedsScoping(name2) {
  return (isInClient || isInIOSStandalone) && !Constants_default.systemFonts.includes(name2) && name2 !== "System" && !name2.includes(Constants_default.sessionId);
}
function getAssetForSource(source) {
  if (source instanceof Asset) {
    return source;
  }
  if (typeof source === "string") {
    return Asset.fromURI(source);
  } else if (typeof source === "number") {
    return Asset.fromModule(source);
  } else if (typeof source === "object" && typeof source.uri !== "undefined") {
    return getAssetForSource(source.uri);
  }
  return source;
}
async function loadSingleFontAsync(name2, input) {
  const asset = input;
  if (!asset.downloadAsync) {
    throw new CodedError(`ERR_FONT_SOURCE`, "`loadSingleFontAsync` expected resource of type `Asset` from expo-asset on native");
  }
  await asset.downloadAsync();
  if (!asset.downloaded) {
    throw new CodedError(`ERR_DOWNLOAD`, `Failed to download asset for font "${name2}"`);
  }
  await ExpoFontLoader_default.loadAsync(getNativeFontName(name2), asset.localUri);
}
function getNativeFontName(name2) {
  if (fontFamilyNeedsScoping(name2)) {
    return `${Constants_default.sessionId}-${name2}`;
  } else {
    return name2;
  }
}

// ../../node_modules/expo-font/build/Font.js
var loaded = {};
var loadPromises = {};
async function loadAsync(fontFamilyOrFontMap, source) {
  if (typeof fontFamilyOrFontMap === "object") {
    if (source) {
      throw new CodedError(`ERR_FONT_API`, `No fontFamily can be used for the provided source: ${source}. The second argument of \`loadAsync()\` can only be used with a \`string\` value as the first argument.`);
    }
    const fontMap = fontFamilyOrFontMap;
    const names = Object.keys(fontMap);
    await Promise.all(names.map((name2) => loadFontInNamespaceAsync(name2, fontMap[name2])));
    return;
  }
  return await loadFontInNamespaceAsync(fontFamilyOrFontMap, source);
}
async function loadFontInNamespaceAsync(fontFamily, source) {
  if (!source) {
    throw new CodedError(`ERR_FONT_SOURCE`, `Cannot load null or undefined font source: { "${fontFamily}": ${source} }. Expected asset of type \`FontSource\` for fontFamily of name: "${fontFamily}"`);
  }
  if (loaded[fontFamily]) {
    return;
  }
  if (loadPromises.hasOwnProperty(fontFamily)) {
    return loadPromises[fontFamily];
  }
  const asset = getAssetForSource(source);
  loadPromises[fontFamily] = (async () => {
    try {
      await loadSingleFontAsync(fontFamily, asset);
      loaded[fontFamily] = true;
    } finally {
      delete loadPromises[fontFamily];
    }
  })();
  await loadPromises[fontFamily];
}

// ../../node_modules/@expo-google-fonts/inter/useFonts.js
function useFonts(map) {
  let [loaded2, setLoaded] = (0, import_react2.useState)(false);
  let [error, setError] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => {
    loadAsync(map).then(() => setLoaded(true)).catch(setError);
  }, []);
  return [loaded2, error];
}

// ../../node_modules/@expo-google-fonts/inter/index.js
var Inter_100Thin = require_Inter_100Thin();
var Inter_200ExtraLight = require_Inter_200ExtraLight();
var Inter_300Light = require_Inter_300Light();
var Inter_400Regular = require_Inter_400Regular();
var Inter_500Medium = require_Inter_500Medium();
var Inter_600SemiBold = require_Inter_600SemiBold();
var Inter_700Bold = require_Inter_700Bold();
var Inter_800ExtraBold = require_Inter_800ExtraBold();
var Inter_900Black = require_Inter_900Black();

// ../../node_modules/@expo-google-fonts/lexend/useFonts.js
var import_react3 = require("react");

// ../../node_modules/@expo-google-fonts/lexend/index.js
var Lexend_100Thin = require_Lexend_100Thin();
var Lexend_200ExtraLight = require_Lexend_200ExtraLight();
var Lexend_300Light = require_Lexend_300Light();
var Lexend_400Regular = require_Lexend_400Regular();
var Lexend_500Medium = require_Lexend_500Medium();
var Lexend_600SemiBold = require_Lexend_600SemiBold();
var Lexend_700Bold = require_Lexend_700Bold();
var Lexend_800ExtraBold = require_Lexend_800ExtraBold();
var Lexend_900Black = require_Lexend_900Black();

// src/fonts/font-provider.tsx
var FontProvider = ({ children }) => {
  console.log("trying to load shite");
  const [loaded2] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Lexend_400Regular,
    Lexend_700Bold
  });
  console.log("loaded:", loaded2);
  return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, children);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACTIVE_OPACITY,
  FontProvider,
  Text,
  color,
  palette,
  spacing,
  typography
});
