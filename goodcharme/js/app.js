'use strict';
/*!

 * jQuery JavaScript Library v3.6.0

 * https://jquery.com/

 *

 * Includes Sizzle.js

 * https://sizzlejs.com/

 *

 * Copyright OpenJS Foundation and other contributors

 * Released under the MIT license

 * https://jquery.org/license

 *

 * Date: 2021-03-02T17:08Z

 */
(function(global, factory) {
	"use strict";
	if (typeof module === "object" && typeof module.exports === "object") {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory(global, true) :
			function(w) {
				if (!w.document) {
					throw new Error("jQuery requires a window with a document");
				}
				return factory(w);
			};
	} else {
		factory(global);
	}
	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";
	var arr = [];
	var getProto = Object.getPrototypeOf;
	var slice = arr.slice;
	var flat = arr.flat ? function(array) {
		return arr.flat.call(array);
	} : function(array) {
		return arr.concat.apply([], array);
	};
	var push = arr.push;
	var indexOf = arr.indexOf;
	var class2type = {};
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;
	var fnToString = hasOwn.toString;
	var ObjectFunctionString = fnToString.call(Object);
	var support = {};
	var isFunction = function isFunction(obj) {
		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};
	var isWindow = function isWindow(obj) {
		return obj != null && obj === obj.window;
	};
	var document = window.document;
	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval(code, node, doc) {
		doc = doc || document;
		var i, val,
			script = doc.createElement("script");
		script.text = code;
		if (node) {
			for (i in preservedScriptAttributes) {
				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[i] || node.getAttribute && node.getAttribute(i);
				if (val) {
					script.setAttribute(i, val);
				}
			}
		}
		doc.head.appendChild(script).parentNode.removeChild(script);
	}

	function toType(obj) {
		if (obj == null) {
			return obj + "";
		}
		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[toString.call(obj)] || "object" :
			typeof obj;
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module
	var
		version = "3.6.0",
		// Define a local copy of jQuery
		jQuery = function(selector, context) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init(selector, context);
		};
	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,
		constructor: jQuery,
		// The default length of a jQuery object is 0
		length: 0,
		toArray: function() {
			return slice.call(this);
		},
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function(num) {
			// Return all the elements in a clean array
			if (num == null) {
				return slice.call(this);
			}
			// Return just the one element from the set
			return num < 0 ? this[num + this.length] : this[num];
		},
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function(elems) {
			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			// Return the newly-formed element set
			return ret;
		},
		// Execute a callback for every element in the matched set.
		each: function(callback) {
			return jQuery.each(this, callback);
		},
		map: function(callback) {
			return this.pushStack(jQuery.map(this, function(elem, i) {
				return callback.call(elem, i, elem);
			}));
		},
		slice: function() {
			return this.pushStack(slice.apply(this, arguments));
		},
		first: function() {
			return this.eq(0);
		},
		last: function() {
			return this.eq(-1);
		},
		even: function() {
			return this.pushStack(jQuery.grep(this, function(_elem, i) {
				return (i + 1) % 2;
			}));
		},
		odd: function() {
			return this.pushStack(jQuery.grep(this, function(_elem, i) {
				return i % 2;
			}));
		},
		eq: function(i) {
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},
		end: function() {
			return this.prevObject || this.constructor();
		},
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;
			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}
		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !isFunction(target)) {
			target = {};
		}
		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}
		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					copy = options[name];
					// Prevent Object.prototype pollution
					// Prevent never-ending loop
					if (name === "__proto__" || target === copy) {
						continue;
					}
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) ||
							(copyIsArray = Array.isArray(copy)))) {
						src = target[name];
						// Ensure proper type for the source value
						if (copyIsArray && !Array.isArray(src)) {
							clone = [];
						} else if (!copyIsArray && !jQuery.isPlainObject(src)) {
							clone = {};
						} else {
							clone = src;
						}
						copyIsArray = false;
						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);
						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		// Return the modified object
		return target;
	};
	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
		// Assume jQuery is ready without the ready module
		isReady: true,
		error: function(msg) {
			throw new Error(msg);
		},
		noop: function() {},
		isPlainObject: function(obj) {
			var proto, Ctor;
			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if (!obj || toString.call(obj) !== "[object Object]") {
				return false;
			}
			proto = getProto(obj);
			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if (!proto) {
				return true;
			}
			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
		},
		isEmptyObject: function(obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},
		// Evaluates a script in a provided context; falls back to the global one
		// if not specified.
		globalEval: function(code, options, doc) {
			DOMEval(code, {
				nonce: options && options.nonce
			}, doc);
		},
		each: function(obj, callback) {
			var length, i = 0;
			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}
			return obj;
		},
		// results is for internal usage only
		makeArray: function(arr, results) {
			var ret = results || [];
			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret,
						typeof arr === "string" ? [arr] : arr
					);
				} else {
					push.call(ret, arr);
				}
			}
			return ret;
		},
		inArray: function(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},
		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function(first, second) {
			var len = +second.length,
				j = 0,
				i = first.length;
			for (; j < len; j++) {
				first[i++] = second[j];
			}
			first.length = i;
			return first;
		},
		grep: function(elems, callback, invert) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}
			return matches;
		},
		// arg is for internal usage only
		map: function(elems, callback, arg) {
			var length, value,
				i = 0,
				ret = [];
			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret.push(value);
					}
				}
				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret.push(value);
					}
				}
			}
			// Flatten any nested arrays
			return flat(ret);
		},
		// A global GUID counter for objects
		guid: 1,
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});
	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}
	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
		function(_i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});

	function isArrayLike(obj) {
		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = toType(obj);
		if (isFunction(obj) || isWindow(obj)) {
			return false;
		}
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	}
	var Sizzle =
		/*!

		 * Sizzle CSS Selector Engine v2.3.6

		 * https://sizzlejs.com/

		 *

		 * Copyright JS Foundation and other contributors

		 * Released under the MIT license

		 * https://js.foundation/

		 *

		 * Date: 2021-02-16

		 */
		(function(window) {
			var i,
				support,
				Expr,
				getText,
				isXML,
				tokenize,
				compile,
				select,
				outermostContext,
				sortInput,
				hasDuplicate,
				// Local document vars
				setDocument,
				document,
				docElem,
				documentIsHTML,
				rbuggyQSA,
				rbuggyMatches,
				matches,
				contains,
				// Instance-specific data
				expando = "sizzle" + 1 * new Date(),
				preferredDoc = window.document,
				dirruns = 0,
				done = 0,
				classCache = createCache(),
				tokenCache = createCache(),
				compilerCache = createCache(),
				nonnativeSelectorCache = createCache(),
				sortOrder = function(a, b) {
					if (a === b) {
						hasDuplicate = true;
					}
					return 0;
				},
				// Instance methods
				hasOwn = ({}).hasOwnProperty,
				arr = [],
				pop = arr.pop,
				pushNative = arr.push,
				push = arr.push,
				slice = arr.slice,
				// Use a stripped-down indexOf as it's faster than native
				// https://jsperf.com/thor-indexof-vs-for/5
				indexOf = function(list, elem) {
					var i = 0,
						len = list.length;
					for (; i < len; i++) {
						if (list[i] === elem) {
							return i;
						}
					}
					return -1;
				},
				booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
				"ismap|loop|multiple|open|readonly|required|scoped",
				// Regular expressions
				// http://www.w3.org/TR/css3-selectors/#whitespace
				whitespace = "[\\x20\\t\\r\\n\\f]",
				// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
				identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
				"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
				// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
				attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
				// Operator (capture 2)
				"*([*^$|!~]?=)" + whitespace +
				// "Attribute values must be CSS identifiers [capture 5]
				// or strings [capture 3 or capture 4]"
				"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
				whitespace + "*\\]",
				pseudos = ":(" + identifier + ")(?:\\((" +
				// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
				// 1. quoted (capture 3; capture 4 or capture 5)
				"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
				// 2. simple (capture 6)
				"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
				// 3. anything else (capture 2)
				".*" +
				")\\)|)",
				// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
				rwhitespace = new RegExp(whitespace + "+", "g"),
				rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
					whitespace + "+$", "g"),
				rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
				rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
					"*"),
				rdescend = new RegExp(whitespace + "|>"),
				rpseudo = new RegExp(pseudos),
				ridentifier = new RegExp("^" + identifier + "$"),
				matchExpr = {
					"ID": new RegExp("^#(" + identifier + ")"),
					"CLASS": new RegExp("^\\.(" + identifier + ")"),
					"TAG": new RegExp("^(" + identifier + "|[*])"),
					"ATTR": new RegExp("^" + attributes),
					"PSEUDO": new RegExp("^" + pseudos),
					"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
						whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
						whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
					"bool": new RegExp("^(?:" + booleans + ")$", "i"),
					// For use in libraries implementing .is()
					// We use this for POS matching in `select`
					"needsContext": new RegExp("^" + whitespace +
						"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
						"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
				},
				rhtml = /HTML$/i,
				rinputs = /^(?:input|select|textarea|button)$/i,
				rheader = /^h\d$/i,
				rnative = /^[^{]+\{\s*\[native \w/,
				// Easily-parseable/retrievable ID or TAG or CLASS selectors
				rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				rsibling = /[+~]/,
				// CSS escapes
				// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
				runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
				funescape = function(escape, nonHex) {
					var high = "0x" + escape.slice(1) - 0x10000;
					return nonHex ?
						// Strip the backslash prefix from a non-hex escape sequence
						nonHex :
						// Replace a hexadecimal escape sequence with the encoded Unicode code point
						// Support: IE <=11+
						// For values outside the Basic Multilingual Plane (BMP), manually construct a
						// surrogate pair
						high < 0 ?
						String.fromCharCode(high + 0x10000) :
						String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
				},
				// CSS string/identifier serialization
				// https://drafts.csswg.org/cssom/#common-serializing-idioms
				rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
				fcssescape = function(ch, asCodePoint) {
					if (asCodePoint) {
						// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
						if (ch === "\0") {
							return "\uFFFD";
						}
						// Control characters and (dependent upon position) numbers get escaped as code points
						return ch.slice(0, -1) + "\\" +
							ch.charCodeAt(ch.length - 1).toString(16) + " ";
					}
					// Other potentially-special ASCII characters get backslash-escaped
					return "\\" + ch;
				},
				// Used for iframes
				// See setDocument()
				// Removing the function wrapper causes a "Permission Denied"
				// error in IE
				unloadHandler = function() {
					setDocument();
				},
				inDisabledFieldset = addCombinator(
					function(elem) {
						return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
					}, {
						dir: "parentNode",
						next: "legend"
					}
				);
			// Optimize for push.apply( _, NodeList )
			try {
				push.apply(
					(arr = slice.call(preferredDoc.childNodes)),
					preferredDoc.childNodes
				);
				// Support: Android<4.0
				// Detect silently failing push.apply
				// eslint-disable-next-line no-unused-expressions
				arr[preferredDoc.childNodes.length].nodeType;
			} catch (e) {
				push = {
					apply: arr.length ?
						// Leverage slice if possible
						function(target, els) {
							pushNative.apply(target, slice.call(els));
						} :
						// Support: IE<9
						// Otherwise append directly
						function(target, els) {
							var j = target.length,
								i = 0;
							// Can't trust NodeList.length
							while ((target[j++] = els[i++])) {}
							target.length = j - 1;
						}
				};
			}

			function Sizzle(selector, context, results, seed) {
				var m, i, elem, nid, match, groups, newSelector,
					newContext = context && context.ownerDocument,
					// nodeType defaults to 9, since context defaults to document
					nodeType = context ? context.nodeType : 9;
				results = results || [];
				// Return early from calls with invalid selector or context
				if (typeof selector !== "string" || !selector ||
					nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
					return results;
				}
				// Try to shortcut find operations (as opposed to filters) in HTML documents
				if (!seed) {
					setDocument(context);
					context = context || document;
					if (documentIsHTML) {
						// If the selector is sufficiently simple, try using a "get*By*" DOM method
						// (excepting DocumentFragment context, where the methods don't exist)
						if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
							// ID selector
							if ((m = match[1])) {
								// Document context
								if (nodeType === 9) {
									if ((elem = context.getElementById(m))) {
										// Support: IE, Opera, Webkit
										// TODO: identify versions
										// getElementById can match elements by name instead of ID
										if (elem.id === m) {
											results.push(elem);
											return results;
										}
									} else {
										return results;
									}
									// Element context
								} else {
									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (newContext && (elem = newContext.getElementById(m)) &&
										contains(context, elem) &&
										elem.id === m) {
										results.push(elem);
										return results;
									}
								}
								// Type selector
							} else if (match[2]) {
								push.apply(results, context.getElementsByTagName(selector));
								return results;
								// Class selector
							} else if ((m = match[3]) && support.getElementsByClassName &&
								context.getElementsByClassName) {
								push.apply(results, context.getElementsByClassName(m));
								return results;
							}
						}
						// Take advantage of querySelectorAll
						if (support.qsa &&
							!nonnativeSelectorCache[selector + " "] &&
							(!rbuggyQSA || !rbuggyQSA.test(selector)) &&
							// Support: IE 8 only
							// Exclude object elements
							(nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
							newSelector = selector;
							newContext = context;
							// qSA considers elements outside a scoping root when evaluating child or
							// descendant combinators, which is not what we want.
							// In such cases, we work around the behavior by prefixing every selector in the
							// list with an ID selector referencing the scope context.
							// The technique has to be used as well when a leading combinator is used
							// as such selectors are not recognized by querySelectorAll.
							// Thanks to Andrew Dupont for this technique.
							if (nodeType === 1 &&
								(rdescend.test(selector) || rcombinators.test(selector))) {
								// Expand context for sibling selectors
								newContext = rsibling.test(selector) && testContext(context.parentNode) ||
									context;
								// We can use :scope instead of the ID hack if the browser
								// supports it & if we're not changing the context.
								if (newContext !== context || !support.scope) {
									// Capture the context ID, setting it first if necessary
									if ((nid = context.getAttribute("id"))) {
										nid = nid.replace(rcssescape, fcssescape);
									} else {
										context.setAttribute("id", (nid = expando));
									}
								}
								// Prefix every selector in the list
								groups = tokenize(selector);
								i = groups.length;
								while (i--) {
									groups[i] = (nid ? "#" + nid : ":scope") + " " +
										toSelector(groups[i]);
								}
								newSelector = groups.join(",");
							}
							try {
								push.apply(results,
									newContext.querySelectorAll(newSelector)
								);
								return results;
							} catch (qsaError) {
								nonnativeSelectorCache(selector, true);
							} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
				// All others
				return select(selector.replace(rtrim, "$1"), context, results, seed);
			}
			/**

			 * Create key-value caches of limited size

			 * @returns {function(string, object)} Returns the Object data after storing it on itself with

			 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)

			 *	deleting the oldest entry

			 */
			function createCache() {
				var keys = [];

				function cache(key, value) {
					// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
					if (keys.push(key + " ") > Expr.cacheLength) {
						// Only keep the most recent entries
						delete cache[keys.shift()];
					}
					return (cache[key + " "] = value);
				}
				return cache;
			}
			/**

			 * Mark a function for special use by Sizzle

			 * @param {Function} fn The function to mark

			 */
			function markFunction(fn) {
				fn[expando] = true;
				return fn;
			}
			/**

			 * Support testing using an element

			 * @param {Function} fn Passed the created element and returns a boolean result

			 */
			function assert(fn) {
				var el = document.createElement("fieldset");
				try {
					return !!fn(el);
				} catch (e) {
					return false;
				} finally {
					// Remove from its parent by default
					if (el.parentNode) {
						el.parentNode.removeChild(el);
					}
					// release memory in IE
					el = null;
				}
			}
			/**

			 * Adds the same handler for all of the specified attrs

			 * @param {String} attrs Pipe-separated list of attributes

			 * @param {Function} handler The method that will be applied

			 */
			function addHandle(attrs, handler) {
				var arr = attrs.split("|"),
					i = arr.length;
				while (i--) {
					Expr.attrHandle[arr[i]] = handler;
				}
			}
			/**

			 * Checks document order of two siblings

			 * @param {Element} a

			 * @param {Element} b

			 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b

			 */
			function siblingCheck(a, b) {
				var cur = b && a,
					diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
					a.sourceIndex - b.sourceIndex;
				// Use IE sourceIndex if available on both nodes
				if (diff) {
					return diff;
				}
				// Check if b follows a
				if (cur) {
					while ((cur = cur.nextSibling)) {
						if (cur === b) {
							return -1;
						}
					}
				}
				return a ? 1 : -1;
			}
			/**

			 * Returns a function to use in pseudos for input types

			 * @param {String} type

			 */
			function createInputPseudo(type) {
				return function(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === type;
				};
			}
			/**

			 * Returns a function to use in pseudos for buttons

			 * @param {String} type

			 */
			function createButtonPseudo(type) {
				return function(elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button") && elem.type === type;
				};
			}
			/**

			 * Returns a function to use in pseudos for :enabled/:disabled

			 * @param {Boolean} disabled true for :disabled; false for :enabled

			 */
			function createDisabledPseudo(disabled) {
				// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
				return function(elem) {
					// Only certain elements can match :enabled or :disabled
					// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
					// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
					if ("form" in elem) {
						// Check for inherited disabledness on relevant non-disabled elements:
						// * listed form-associated elements in a disabled fieldset
						//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
						//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
						// * option elements in a disabled optgroup
						//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
						// All such elements have a "form" property.
						if (elem.parentNode && elem.disabled === false) {
							// Option elements defer to a parent optgroup if present
							if ("label" in elem) {
								if ("label" in elem.parentNode) {
									return elem.parentNode.disabled === disabled;
								} else {
									return elem.disabled === disabled;
								}
							}
							// Support: IE 6 - 11
							// Use the isDisabled shortcut property to check for disabled fieldset ancestors
							return elem.isDisabled === disabled ||
								// Where there is no isDisabled, check manually
								/* jshint -W018 */
								elem.isDisabled !== !disabled &&
								inDisabledFieldset(elem) === disabled;
						}
						return elem.disabled === disabled;
						// Try to winnow out elements that can't be disabled before trusting the disabled property.
						// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
						// even exist on them, let alone have a boolean value.
					} else if ("label" in elem) {
						return elem.disabled === disabled;
					}
					// Remaining elements are neither :enabled nor :disabled
					return false;
				};
			}
			/**

			 * Returns a function to use in pseudos for positionals

			 * @param {Function} fn

			 */
			function createPositionalPseudo(fn) {
				return markFunction(function(argument) {
					argument = +argument;
					return markFunction(function(seed, matches) {
						var j,
							matchIndexes = fn([], seed.length, argument),
							i = matchIndexes.length;
						// Match elements found at the specified indexes
						while (i--) {
							if (seed[(j = matchIndexes[i])]) {
								seed[j] = !(matches[j] = seed[j]);
							}
						}
					});
				});
			}
			/**

			 * Checks a node for validity as a Sizzle context

			 * @param {Element|Object=} context

			 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value

			 */
			function testContext(context) {
				return context && typeof context.getElementsByTagName !== "undefined" && context;
			}
			// Expose support vars for convenience
			support = Sizzle.support = {};
			/**

			 * Detects XML nodes

			 * @param {Element|Object} elem An element or a document

			 * @returns {Boolean} True iff elem is a non-HTML XML node

			 */
			isXML = Sizzle.isXML = function(elem) {
				var namespace = elem && elem.namespaceURI,
					docElem = elem && (elem.ownerDocument || elem).documentElement;
				// Support: IE <=8
				// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
				// https://bugs.jquery.com/ticket/4833
				return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
			};
			/**

			 * Sets document-related variables once based on the current document

			 * @param {Element|Object} [doc] An element or document object to use to set the document

			 * @returns {Object} Returns the current document

			 */
			setDocument = Sizzle.setDocument = function(node) {
				var hasCompare, subWindow,
					doc = node ? node.ownerDocument || node : preferredDoc;
				// Return early if doc is invalid or already selected
				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
					return document;
				}
				// Update global variables
				document = doc;
				docElem = document.documentElement;
				documentIsHTML = !isXML(document);
				// Support: IE 9 - 11+, Edge 12 - 18+
				// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				if (preferredDoc != document &&
					(subWindow = document.defaultView) && subWindow.top !== subWindow) {
					// Support: IE 11, Edge
					if (subWindow.addEventListener) {
						subWindow.addEventListener("unload", unloadHandler, false);
						// Support: IE 9 - 10 only
					} else if (subWindow.attachEvent) {
						subWindow.attachEvent("onunload", unloadHandler);
					}
				}
				// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
				// Safari 4 - 5 only, Opera <=11.6 - 12.x only
				// IE/Edge & older browsers don't support the :scope pseudo-class.
				// Support: Safari 6.0 only
				// Safari 6.0 supports :scope but it's an alias of :root there.
				support.scope = assert(function(el) {
					docElem.appendChild(el).appendChild(document.createElement("div"));
					return typeof el.querySelectorAll !== "undefined" &&
						!el.querySelectorAll(":scope fieldset div").length;
				});
				/* Attributes

				---------------------------------------------------------------------- */
				// Support: IE<8
				// Verify that getAttribute really returns attributes and not properties
				// (excepting IE8 booleans)
				support.attributes = assert(function(el) {
					el.className = "i";
					return !el.getAttribute("className");
				});
				/* getElement(s)By*

				---------------------------------------------------------------------- */
				// Check if getElementsByTagName("*") returns only elements
				support.getElementsByTagName = assert(function(el) {
					el.appendChild(document.createComment(""));
					return !el.getElementsByTagName("*").length;
				});
				// Support: IE<9
				support.getElementsByClassName = rnative.test(document.getElementsByClassName);
				// Support: IE<10
				// Check if getElementById returns elements by name
				// The broken getElementById methods don't pick up programmatically-set names,
				// so use a roundabout getElementsByName test
				support.getById = assert(function(el) {
					docElem.appendChild(el).id = expando;
					return !document.getElementsByName || !document.getElementsByName(expando).length;
				});
				// ID filter and find
				if (support.getById) {
					Expr.filter["ID"] = function(id) {
						var attrId = id.replace(runescape, funescape);
						return function(elem) {
							return elem.getAttribute("id") === attrId;
						};
					};
					Expr.find["ID"] = function(id, context) {
						if (typeof context.getElementById !== "undefined" && documentIsHTML) {
							var elem = context.getElementById(id);
							return elem ? [elem] : [];
						}
					};
				} else {
					Expr.filter["ID"] = function(id) {
						var attrId = id.replace(runescape, funescape);
						return function(elem) {
							var node = typeof elem.getAttributeNode !== "undefined" &&
								elem.getAttributeNode("id");
							return node && node.value === attrId;
						};
					};
					// Support: IE 6 - 7 only
					// getElementById is not reliable as a find shortcut
					Expr.find["ID"] = function(id, context) {
						if (typeof context.getElementById !== "undefined" && documentIsHTML) {
							var node, i, elems,
								elem = context.getElementById(id);
							if (elem) {
								// Verify the id attribute
								node = elem.getAttributeNode("id");
								if (node && node.value === id) {
									return [elem];
								}
								// Fall back on getElementsByName
								elems = context.getElementsByName(id);
								i = 0;
								while ((elem = elems[i++])) {
									node = elem.getAttributeNode("id");
									if (node && node.value === id) {
										return [elem];
									}
								}
							}
							return [];
						}
					};
				}
				// Tag
				Expr.find["TAG"] = support.getElementsByTagName ?
					function(tag, context) {
						if (typeof context.getElementsByTagName !== "undefined") {
							return context.getElementsByTagName(tag);
							// DocumentFragment nodes don't have gEBTN
						} else if (support.qsa) {
							return context.querySelectorAll(tag);
						}
					} :
					function(tag, context) {
						var elem,
							tmp = [],
							i = 0,
							// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
							results = context.getElementsByTagName(tag);
						// Filter out possible comments
						if (tag === "*") {
							while ((elem = results[i++])) {
								if (elem.nodeType === 1) {
									tmp.push(elem);
								}
							}
							return tmp;
						}
						return results;
					};
				// Class
				Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
					if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
						return context.getElementsByClassName(className);
					}
				};
				/* QSA/matchesSelector

				---------------------------------------------------------------------- */
				// QSA and matchesSelector support
				// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
				rbuggyMatches = [];
				// qSa(:focus) reports false when true (Chrome 21)
				// We allow this because of a bug in IE8/9 that throws an error
				// whenever `document.activeElement` is accessed on an iframe
				// So, we allow :focus to pass through QSA all the time to avoid the IE error
				// See https://bugs.jquery.com/ticket/13378
				rbuggyQSA = [];
				if ((support.qsa = rnative.test(document.querySelectorAll))) {
					// Build QSA regex
					// Regex strategy adopted from Diego Perini
					assert(function(el) {
						var input;
						// Select is set to empty string on purpose
						// This is to test IE's treatment of not explicitly
						// setting a boolean content attribute,
						// since its presence should be enough
						// https://bugs.jquery.com/ticket/12359
						docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" +
							"<select id='" + expando + "-\r\\' msallowcapture=''>" +
							"<option selected=''></option></select>";
						// Support: IE8, Opera 11-12.16
						// Nothing should be selected when empty strings follow ^= or $= or *=
						// The test attribute must be unknown in Opera but "safe" for WinRT
						// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
						if (el.querySelectorAll("[msallowcapture^='']").length) {
							rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
						}
						// Support: IE8
						// Boolean attributes and "value" are not treated correctly
						if (!el.querySelectorAll("[selected]").length) {
							rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
						}
						// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
						if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
							rbuggyQSA.push("~=");
						}
						// Support: IE 11+, Edge 15 - 18+
						// IE 11/Edge don't find elements on a `[name='']` query in some cases.
						// Adding a temporary attribute to the document before the selection works
						// around the issue.
						// Interestingly, IE 10 & older don't seem to have the issue.
						input = document.createElement("input");
						input.setAttribute("name", "");
						el.appendChild(input);
						if (!el.querySelectorAll("[name='']").length) {
							rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" +
								whitespace + "*(?:''|\"\")");
						}
						// Webkit/Opera - :checked should return selected option elements
						// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						// IE8 throws error here and will not see later tests
						if (!el.querySelectorAll(":checked").length) {
							rbuggyQSA.push(":checked");
						}
						// Support: Safari 8+, iOS 8+
						// https://bugs.webkit.org/show_bug.cgi?id=136851
						// In-page `selector#id sibling-combinator selector` fails
						if (!el.querySelectorAll("a#" + expando + "+*").length) {
							rbuggyQSA.push(".#.+[+~]");
						}
						// Support: Firefox <=3.6 - 5 only
						// Old Firefox doesn't throw on a badly-escaped identifier.
						el.querySelectorAll("\\\f");
						rbuggyQSA.push("[\\r\\n\\f]");
					});
					assert(function(el) {
						el.innerHTML = "<a href='' disabled='disabled'></a>" +
							"<select disabled='disabled'><option/></select>";
						// Support: Windows 8 Native Apps
						// The type and name attributes are restricted during .innerHTML assignment
						var input = document.createElement("input");
						input.setAttribute("type", "hidden");
						el.appendChild(input).setAttribute("name", "D");
						// Support: IE8
						// Enforce case-sensitivity of name attribute
						if (el.querySelectorAll("[name=d]").length) {
							rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
						}
						// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
						// IE8 throws error here and will not see later tests
						if (el.querySelectorAll(":enabled").length !== 2) {
							rbuggyQSA.push(":enabled", ":disabled");
						}
						// Support: IE9-11+
						// IE's :disabled selector does not pick up the children of disabled fieldsets
						docElem.appendChild(el).disabled = true;
						if (el.querySelectorAll(":disabled").length !== 2) {
							rbuggyQSA.push(":enabled", ":disabled");
						}
						// Support: Opera 10 - 11 only
						// Opera 10-11 does not throw on post-comma invalid pseudos
						el.querySelectorAll("*,:x");
						rbuggyQSA.push(",.*:");
					});
				}
				if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
						docElem.webkitMatchesSelector ||
						docElem.mozMatchesSelector ||
						docElem.oMatchesSelector ||
						docElem.msMatchesSelector)))) {
					assert(function(el) {
						// Check to see if it's possible to do matchesSelector
						// on a disconnected node (IE 9)
						support.disconnectedMatch = matches.call(el, "*");
						// This should fail with an exception
						// Gecko does not error, returns false instead
						matches.call(el, "[s!='']:x");
						rbuggyMatches.push("!=", pseudos);
					});
				}
				rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
				rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
				/* Contains

				---------------------------------------------------------------------- */
				hasCompare = rnative.test(docElem.compareDocumentPosition);
				// Element contains another
				// Purposefully self-exclusive
				// As in, an element does not contain itself
				contains = hasCompare || rnative.test(docElem.contains) ?
					function(a, b) {
						var adown = a.nodeType === 9 ? a.documentElement : a,
							bup = b && b.parentNode;
						return a === bup || !!(bup && bup.nodeType === 1 && (
							adown.contains ?
							adown.contains(bup) :
							a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
						));
					} :
					function(a, b) {
						if (b) {
							while ((b = b.parentNode)) {
								if (b === a) {
									return true;
								}
							}
						}
						return false;
					};
				/* Sorting

				---------------------------------------------------------------------- */
				// Document order sorting
				sortOrder = hasCompare ?
					function(a, b) {
						// Flag for duplicate removal
						if (a === b) {
							hasDuplicate = true;
							return 0;
						}
						// Sort on method existence if only one input has compareDocumentPosition
						var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
						if (compare) {
							return compare;
						}
						// Calculate position if both inputs belong to the same document
						// Support: IE 11+, Edge 17 - 18+
						// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
						// two documents; shallow comparisons work.
						// eslint-disable-next-line eqeqeq
						compare = (a.ownerDocument || a) == (b.ownerDocument || b) ?
							a.compareDocumentPosition(b) :
							// Otherwise we know they are disconnected
							1;
						// Disconnected nodes
						if (compare & 1 ||
							(!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
							// Choose the first element that is related to our preferred document
							// Support: IE 11+, Edge 17 - 18+
							// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
							// two documents; shallow comparisons work.
							// eslint-disable-next-line eqeqeq
							if (a == document || a.ownerDocument == preferredDoc &&
								contains(preferredDoc, a)) {
								return -1;
							}
							// Support: IE 11+, Edge 17 - 18+
							// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
							// two documents; shallow comparisons work.
							// eslint-disable-next-line eqeqeq
							if (b == document || b.ownerDocument == preferredDoc &&
								contains(preferredDoc, b)) {
								return 1;
							}
							// Maintain original order
							return sortInput ?
								(indexOf(sortInput, a) - indexOf(sortInput, b)) :
								0;
						}
						return compare & 4 ? -1 : 1;
					} :
					function(a, b) {
						// Exit early if the nodes are identical
						if (a === b) {
							hasDuplicate = true;
							return 0;
						}
						var cur,
							i = 0,
							aup = a.parentNode,
							bup = b.parentNode,
							ap = [a],
							bp = [b];
						// Parentless nodes are either documents or disconnected
						if (!aup || !bup) {
							// Support: IE 11+, Edge 17 - 18+
							// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
							// two documents; shallow comparisons work.
							/* eslint-disable eqeqeq */
							return a == document ? -1 :
								b == document ? 1 :
								/* eslint-enable eqeqeq */
								aup ? -1 :
								bup ? 1 :
								sortInput ?
								(indexOf(sortInput, a) - indexOf(sortInput, b)) :
								0;
							// If the nodes are siblings, we can do a quick check
						} else if (aup === bup) {
							return siblingCheck(a, b);
						}
						// Otherwise we need full lists of their ancestors for comparison
						cur = a;
						while ((cur = cur.parentNode)) {
							ap.unshift(cur);
						}
						cur = b;
						while ((cur = cur.parentNode)) {
							bp.unshift(cur);
						}
						// Walk down the tree looking for a discrepancy
						while (ap[i] === bp[i]) {
							i++;
						}
						return i ?
							// Do a sibling check if the nodes have a common ancestor
							siblingCheck(ap[i], bp[i]) :
							// Otherwise nodes in our document sort first
							// Support: IE 11+, Edge 17 - 18+
							// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
							// two documents; shallow comparisons work.
							/* eslint-disable eqeqeq */
							ap[i] == preferredDoc ? -1 :
							bp[i] == preferredDoc ? 1 :
							/* eslint-enable eqeqeq */
							0;
					};
				return document;
			};
			Sizzle.matches = function(expr, elements) {
				return Sizzle(expr, null, null, elements);
			};
			Sizzle.matchesSelector = function(elem, expr) {
				setDocument(elem);
				if (support.matchesSelector && documentIsHTML &&
					!nonnativeSelectorCache[expr + " "] &&
					(!rbuggyMatches || !rbuggyMatches.test(expr)) &&
					(!rbuggyQSA || !rbuggyQSA.test(expr))) {
					try {
						var ret = matches.call(elem, expr);
						// IE 9's matchesSelector returns false on disconnected nodes
						if (ret || support.disconnectedMatch ||
							// As well, disconnected nodes are said to be in a document
							// fragment in IE 9
							elem.document && elem.document.nodeType !== 11) {
							return ret;
						}
					} catch (e) {
						nonnativeSelectorCache(expr, true);
					}
				}
				return Sizzle(expr, document, null, [elem]).length > 0;
			};
			Sizzle.contains = function(context, elem) {
				// Set document vars if needed
				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				if ((context.ownerDocument || context) != document) {
					setDocument(context);
				}
				return contains(context, elem);
			};
			Sizzle.attr = function(elem, name) {
				// Set document vars if needed
				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				if ((elem.ownerDocument || elem) != document) {
					setDocument(elem);
				}
				var fn = Expr.attrHandle[name.toLowerCase()],
					// Don't get fooled by Object.prototype properties (jQuery #13807)
					val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
					fn(elem, name, !documentIsHTML) :
					undefined;
				return val !== undefined ?
					val :
					support.attributes || !documentIsHTML ?
					elem.getAttribute(name) :
					(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
			};
			Sizzle.escape = function(sel) {
				return (sel + "").replace(rcssescape, fcssescape);
			};
			Sizzle.error = function(msg) {
				throw new Error("Syntax error, unrecognized expression: " + msg);
			};
			/**

			 * Document sorting and removing duplicates

			 * @param {ArrayLike} results

			 */
			Sizzle.uniqueSort = function(results) {
				var elem,
					duplicates = [],
					j = 0,
					i = 0;
				// Unless we *know* we can detect duplicates, assume their presence
				hasDuplicate = !support.detectDuplicates;
				sortInput = !support.sortStable && results.slice(0);
				results.sort(sortOrder);
				if (hasDuplicate) {
					while ((elem = results[i++])) {
						if (elem === results[i]) {
							j = duplicates.push(i);
						}
					}
					while (j--) {
						results.splice(duplicates[j], 1);
					}
				}
				// Clear input after sorting to release objects
				// See https://github.com/jquery/sizzle/pull/225
				sortInput = null;
				return results;
			};
			/**

			 * Utility function for retrieving the text value of an array of DOM nodes

			 * @param {Array|Element} elem

			 */
			getText = Sizzle.getText = function(elem) {
				var node,
					ret = "",
					i = 0,
					nodeType = elem.nodeType;
				if (!nodeType) {
					// If no nodeType, this is expected to be an array
					while ((node = elem[i++])) {
						// Do not traverse comment nodes
						ret += getText(node);
					}
				} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
					// Use textContent for elements
					// innerText usage removed for consistency of new lines (jQuery #11153)
					if (typeof elem.textContent === "string") {
						return elem.textContent;
					} else {
						// Traverse its children
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							ret += getText(elem);
						}
					}
				} else if (nodeType === 3 || nodeType === 4) {
					return elem.nodeValue;
				}
				// Do not include comment or processing instruction nodes
				return ret;
			};
			Expr = Sizzle.selectors = {
				// Can be adjusted by the user
				cacheLength: 50,
				createPseudo: markFunction,
				match: matchExpr,
				attrHandle: {},
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: true
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: true
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					"ATTR": function(match) {
						match[1] = match[1].replace(runescape, funescape);
						// Move the given value to match[3] whether quoted or unquoted
						match[3] = (match[3] || match[4] ||
							match[5] || "").replace(runescape, funescape);
						if (match[2] === "~=") {
							match[3] = " " + match[3] + " ";
						}
						return match.slice(0, 4);
					},
					"CHILD": function(match) {
						/* matches from matchExpr["CHILD"]

							1 type (only|nth|...)

							2 what (child|of-type)

							3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)

							4 xn-component of xn+y argument ([+-]?\d*n|)

							5 sign of xn-component

							6 x of xn-component

							7 sign of y-component

							8 y of y-component

						*/
						match[1] = match[1].toLowerCase();
						if (match[1].slice(0, 3) === "nth") {
							// nth-* requires argument
							if (!match[3]) {
								Sizzle.error(match[0]);
							}
							// numeric x and y parameters for Expr.filter.CHILD
							// remember that false/true cast respectively to 0/1
							match[4] = +(match[4] ?
								match[5] + (match[6] || 1) :
								2 * (match[3] === "even" || match[3] === "odd"));
							match[5] = +((match[7] + match[8]) || match[3] === "odd");
							// other types prohibit arguments
						} else if (match[3]) {
							Sizzle.error(match[0]);
						}
						return match;
					},
					"PSEUDO": function(match) {
						var excess,
							unquoted = !match[6] && match[2];
						if (matchExpr["CHILD"].test(match[0])) {
							return null;
						}
						// Accept quoted arguments as-is
						if (match[3]) {
							match[2] = match[4] || match[5] || "";
							// Strip excess characters from unquoted arguments
						} else if (unquoted && rpseudo.test(unquoted) &&
							// Get excess from tokenize (recursively)
							(excess = tokenize(unquoted, true)) &&
							// advance to the next closing parenthesis
							(excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
							// excess is a negative index
							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess);
						}
						// Return only captures needed by the pseudo filter method (type and argument)
						return match.slice(0, 3);
					}
				},
				filter: {
					"TAG": function(nodeNameSelector) {
						var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
						return nodeNameSelector === "*" ?
							function() {
								return true;
							} :
							function(elem) {
								return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
							};
					},
					"CLASS": function(className) {
						var pattern = classCache[className + " "];
						return pattern ||
							(pattern = new RegExp("(^|" + whitespace +
								")" + className + "(" + whitespace + "|$)")) && classCache(
								className,
								function(elem) {
									return pattern.test(
										typeof elem.className === "string" && elem.className ||
										typeof elem.getAttribute !== "undefined" &&
										elem.getAttribute("class") ||
										""
									);
								});
					},
					"ATTR": function(name, operator, check) {
						return function(elem) {
							var result = Sizzle.attr(elem, name);
							if (result == null) {
								return operator === "!=";
							}
							if (!operator) {
								return true;
							}
							result += "";
							/* eslint-disable max-len */
							return operator === "=" ? result === check :
								operator === "!=" ? result !== check :
								operator === "^=" ? check && result.indexOf(check) === 0 :
								operator === "*=" ? check && result.indexOf(check) > -1 :
								operator === "$=" ? check && result.slice(-check.length) === check :
								operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
								operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
								false;
							/* eslint-enable max-len */
						};
					},
					"CHILD": function(type, what, _argument, first, last) {
						var simple = type.slice(0, 3) !== "nth",
							forward = type.slice(-4) !== "last",
							ofType = what === "of-type";
						return first === 1 && last === 0 ?
							// Shortcut for :nth-*(n)
							function(elem) {
								return !!elem.parentNode;
							} :
							function(elem, _context, xml) {
								var cache, uniqueCache, outerCache, node, nodeIndex, start,
									dir = simple !== forward ? "nextSibling" : "previousSibling",
									parent = elem.parentNode,
									name = ofType && elem.nodeName.toLowerCase(),
									useCache = !xml && !ofType,
									diff = false;
								if (parent) {
									// :(first|last|only)-(child|of-type)
									if (simple) {
										while (dir) {
											node = elem;
											while ((node = node[dir])) {
												if (ofType ?
													node.nodeName.toLowerCase() === name :
													node.nodeType === 1) {
													return false;
												}
											}
											// Reverse direction for :only-* (if we haven't yet done so)
											start = dir = type === "only" && !start && "nextSibling";
										}
										return true;
									}
									start = [forward ? parent.firstChild : parent.lastChild];
									// non-xml :nth-child(...) stores cache data on `parent`
									if (forward && useCache) {
										// Seek `elem` from a previously-cached index
										// ...in a gzip-friendly way
										node = parent;
										outerCache = node[expando] || (node[expando] = {});
										// Support: IE <9 only
										// Defend against cloned attroperties (jQuery gh-1709)
										uniqueCache = outerCache[node.uniqueID] ||
											(outerCache[node.uniqueID] = {});
										cache = uniqueCache[type] || [];
										nodeIndex = cache[0] === dirruns && cache[1];
										diff = nodeIndex && cache[2];
										node = nodeIndex && parent.childNodes[nodeIndex];
										while ((node = ++nodeIndex && node && node[dir] ||
												// Fallback to seeking `elem` from the start
												(diff = nodeIndex = 0) || start.pop())) {
											// When found, cache indexes on `parent` and break
											if (node.nodeType === 1 && ++diff && node === elem) {
												uniqueCache[type] = [dirruns, nodeIndex, diff];
												break;
											}
										}
									} else {
										// Use previously-cached element index if available
										if (useCache) {
											// ...in a gzip-friendly way
											node = elem;
											outerCache = node[expando] || (node[expando] = {});
											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[node.uniqueID] ||
												(outerCache[node.uniqueID] = {});
											cache = uniqueCache[type] || [];
											nodeIndex = cache[0] === dirruns && cache[1];
											diff = nodeIndex;
										}
										// xml :nth-child(...)
										// or :nth-last-child(...) or :nth(-last)?-of-type(...)
										if (diff === false) {
											// Use the same loop as above to seek `elem` from the start
											while ((node = ++nodeIndex && node && node[dir] ||
													(diff = nodeIndex = 0) || start.pop())) {
												if ((ofType ?
														node.nodeName.toLowerCase() === name :
														node.nodeType === 1) &&
													++diff) {
													// Cache the index of each encountered element
													if (useCache) {
														outerCache = node[expando] ||
															(node[expando] = {});
														// Support: IE <9 only
														// Defend against cloned attroperties (jQuery gh-1709)
														uniqueCache = outerCache[node.uniqueID] ||
															(outerCache[node.uniqueID] = {});
														uniqueCache[type] = [dirruns, diff];
													}
													if (node === elem) {
														break;
													}
												}
											}
										}
									}
									// Incorporate the offset, then check against cycle size
									diff -= last;
									return diff === first || (diff % first === 0 && diff / first >= 0);
								}
							};
					},
					"PSEUDO": function(pseudo, argument) {
						// pseudo-class names are case-insensitive
						// http://www.w3.org/TR/selectors/#pseudo-classes
						// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
						// Remember that setFilters inherits from pseudos
						var args,
							fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
							Sizzle.error("unsupported pseudo: " + pseudo);
						// The user may use createPseudo to indicate that
						// arguments are needed to create the filter function
						// just as Sizzle does
						if (fn[expando]) {
							return fn(argument);
						}
						// But maintain support for old signatures
						if (fn.length > 1) {
							args = [pseudo, pseudo, "", argument];
							return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
								markFunction(function(seed, matches) {
									var idx,
										matched = fn(seed, argument),
										i = matched.length;
									while (i--) {
										idx = indexOf(seed, matched[i]);
										seed[idx] = !(matches[idx] = matched[i]);
									}
								}) :
								function(elem) {
									return fn(elem, 0, args);
								};
						}
						return fn;
					}
				},
				pseudos: {
					// Potentially complex pseudos
					"not": markFunction(function(selector) {
						// Trim the selector passed to compile
						// to avoid treating leading and trailing
						// spaces as combinators
						var input = [],
							results = [],
							matcher = compile(selector.replace(rtrim, "$1"));
						return matcher[expando] ?
							markFunction(function(seed, matches, _context, xml) {
								var elem,
									unmatched = matcher(seed, null, xml, []),
									i = seed.length;
								// Match elements unmatched by `matcher`
								while (i--) {
									if ((elem = unmatched[i])) {
										seed[i] = !(matches[i] = elem);
									}
								}
							}) :
							function(elem, _context, xml) {
								input[0] = elem;
								matcher(input, null, xml, results);
								// Don't keep the element (issue #299)
								input[0] = null;
								return !results.pop();
							};
					}),
					"has": markFunction(function(selector) {
						return function(elem) {
							return Sizzle(selector, elem).length > 0;
						};
					}),
					"contains": markFunction(function(text) {
						text = text.replace(runescape, funescape);
						return function(elem) {
							return (elem.textContent || getText(elem)).indexOf(text) > -1;
						};
					}),
					// "Whether an element is represented by a :lang() selector
					// is based solely on the element's language value
					// being equal to the identifier C,
					// or beginning with the identifier C immediately followed by "-".
					// The matching of C against the element's language value is performed case-insensitively.
					// The identifier C does not have to be a valid language name."
					// http://www.w3.org/TR/selectors/#lang-pseudo
					"lang": markFunction(function(lang) {
						// lang value must be a valid identifier
						if (!ridentifier.test(lang || "")) {
							Sizzle.error("unsupported lang: " + lang);
						}
						lang = lang.replace(runescape, funescape).toLowerCase();
						return function(elem) {
							var elemLang;
							do {
								if ((elemLang = documentIsHTML ?
										elem.lang :
										elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
									elemLang = elemLang.toLowerCase();
									return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
								}
							} while ((elem = elem.parentNode) && elem.nodeType === 1);
							return false;
						};
					}),
					// Miscellaneous
					"target": function(elem) {
						var hash = window.location && window.location.hash;
						return hash && hash.slice(1) === elem.id;
					},
					"root": function(elem) {
						return elem === docElem;
					},
					"focus": function(elem) {
						return elem === document.activeElement &&
							(!document.hasFocus || document.hasFocus()) &&
							!!(elem.type || elem.href || ~elem.tabIndex);
					},
					// Boolean properties
					"enabled": createDisabledPseudo(false),
					"disabled": createDisabledPseudo(true),
					"checked": function(elem) {
						// In CSS3, :checked should return both checked and selected elements
						// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						var nodeName = elem.nodeName.toLowerCase();
						return (nodeName === "input" && !!elem.checked) ||
							(nodeName === "option" && !!elem.selected);
					},
					"selected": function(elem) {
						// Accessing this property makes selected-by-default
						// options in Safari work properly
						if (elem.parentNode) {
							// eslint-disable-next-line no-unused-expressions
							elem.parentNode.selectedIndex;
						}
						return elem.selected === true;
					},
					// Contents
					"empty": function(elem) {
						// http://www.w3.org/TR/selectors/#empty-pseudo
						// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
						//   but not by others (comment: 8; processing instruction: 7; etc.)
						// nodeType < 6 works because attributes (2) do not appear as children
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							if (elem.nodeType < 6) {
								return false;
							}
						}
						return true;
					},
					"parent": function(elem) {
						return !Expr.pseudos["empty"](elem);
					},
					// Element/input types
					"header": function(elem) {
						return rheader.test(elem.nodeName);
					},
					"input": function(elem) {
						return rinputs.test(elem.nodeName);
					},
					"button": function(elem) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === "button" || name === "button";
					},
					"text": function(elem) {
						var attr;
						return elem.nodeName.toLowerCase() === "input" &&
							elem.type === "text" &&
							// Support: IE<8
							// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
							((attr = elem.getAttribute("type")) == null ||
								attr.toLowerCase() === "text");
					},
					// Position-in-collection
					"first": createPositionalPseudo(function() {
						return [0];
					}),
					"last": createPositionalPseudo(function(_matchIndexes, length) {
						return [length - 1];
					}),
					"eq": createPositionalPseudo(function(_matchIndexes, length, argument) {
						return [argument < 0 ? argument + length : argument];
					}),
					"even": createPositionalPseudo(function(matchIndexes, length) {
						var i = 0;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),
					"odd": createPositionalPseudo(function(matchIndexes, length) {
						var i = 1;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),
					"lt": createPositionalPseudo(function(matchIndexes, length, argument) {
						var i = argument < 0 ?
							argument + length :
							argument > length ?
							length :
							argument;
						for (; --i >= 0;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),
					"gt": createPositionalPseudo(function(matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; ++i < length;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					})
				}
			};
			Expr.pseudos["nth"] = Expr.pseudos["eq"];
			// Add button/input type pseudos
			for (i in {
					radio: true,
					checkbox: true,
					file: true,
					password: true,
					image: true
				}) {
				Expr.pseudos[i] = createInputPseudo(i);
			}
			for (i in {
					submit: true,
					reset: true
				}) {
				Expr.pseudos[i] = createButtonPseudo(i);
			}
			// Easy API for creating new setFilters
			function setFilters() {}
			setFilters.prototype = Expr.filters = Expr.pseudos;
			Expr.setFilters = new setFilters();
			tokenize = Sizzle.tokenize = function(selector, parseOnly) {
				var matched, match, tokens, type,
					soFar, groups, preFilters,
					cached = tokenCache[selector + " "];
				if (cached) {
					return parseOnly ? 0 : cached.slice(0);
				}
				soFar = selector;
				groups = [];
				preFilters = Expr.preFilter;
				while (soFar) {
					// Comma and first run
					if (!matched || (match = rcomma.exec(soFar))) {
						if (match) {
							// Don't consume trailing commas as valid
							soFar = soFar.slice(match[0].length) || soFar;
						}
						groups.push((tokens = []));
					}
					matched = false;
					// Combinators
					if ((match = rcombinators.exec(soFar))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							// Cast descendant combinators to space
							type: match[0].replace(rtrim, " ")
						});
						soFar = soFar.slice(matched.length);
					}
					// Filters
					for (type in Expr.filter) {
						if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
								(match = preFilters[type](match)))) {
							matched = match.shift();
							tokens.push({
								value: matched,
								type: type,
								matches: match
							});
							soFar = soFar.slice(matched.length);
						}
					}
					if (!matched) {
						break;
					}
				}
				// Return the length of the invalid excess
				// if we're just parsing
				// Otherwise, throw an error or return tokens
				return parseOnly ?
					soFar.length :
					soFar ?
					Sizzle.error(selector) :
					// Cache the tokens
					tokenCache(selector, groups).slice(0);
			};

			function toSelector(tokens) {
				var i = 0,
					len = tokens.length,
					selector = "";
				for (; i < len; i++) {
					selector += tokens[i].value;
				}
				return selector;
			}

			function addCombinator(matcher, combinator, base) {
				var dir = combinator.dir,
					skip = combinator.next,
					key = skip || dir,
					checkNonElements = base && key === "parentNode",
					doneName = done++;
				return combinator.first ?
					// Check against closest ancestor/preceding element
					function(elem, context, xml) {
						while ((elem = elem[dir])) {
							if (elem.nodeType === 1 || checkNonElements) {
								return matcher(elem, context, xml);
							}
						}
						return false;
					} :
					// Check against all ancestor/preceding elements
					function(elem, context, xml) {
						var oldCache, uniqueCache, outerCache,
							newCache = [dirruns, doneName];
						// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
						if (xml) {
							while ((elem = elem[dir])) {
								if (elem.nodeType === 1 || checkNonElements) {
									if (matcher(elem, context, xml)) {
										return true;
									}
								}
							}
						} else {
							while ((elem = elem[dir])) {
								if (elem.nodeType === 1 || checkNonElements) {
									outerCache = elem[expando] || (elem[expando] = {});
									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[elem.uniqueID] ||
										(outerCache[elem.uniqueID] = {});
									if (skip && skip === elem.nodeName.toLowerCase()) {
										elem = elem[dir] || elem;
									} else if ((oldCache = uniqueCache[key]) &&
										oldCache[0] === dirruns && oldCache[1] === doneName) {
										// Assign to newCache so results back-propagate to previous elements
										return (newCache[2] = oldCache[2]);
									} else {
										// Reuse newcache so results back-propagate to previous elements
										uniqueCache[key] = newCache;
										// A match means we're done; a fail means we have to keep checking
										if ((newCache[2] = matcher(elem, context, xml))) {
											return true;
										}
									}
								}
							}
						}
						return false;
					};
			}

			function elementMatcher(matchers) {
				return matchers.length > 1 ?
					function(elem, context, xml) {
						var i = matchers.length;
						while (i--) {
							if (!matchers[i](elem, context, xml)) {
								return false;
							}
						}
						return true;
					} :
					matchers[0];
			}

			function multipleContexts(selector, contexts, results) {
				var i = 0,
					len = contexts.length;
				for (; i < len; i++) {
					Sizzle(selector, contexts[i], results);
				}
				return results;
			}

			function condense(unmatched, map, filter, context, xml) {
				var elem,
					newUnmatched = [],
					i = 0,
					len = unmatched.length,
					mapped = map != null;
				for (; i < len; i++) {
					if ((elem = unmatched[i])) {
						if (!filter || filter(elem, context, xml)) {
							newUnmatched.push(elem);
							if (mapped) {
								map.push(i);
							}
						}
					}
				}
				return newUnmatched;
			}

			function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
				if (postFilter && !postFilter[expando]) {
					postFilter = setMatcher(postFilter);
				}
				if (postFinder && !postFinder[expando]) {
					postFinder = setMatcher(postFinder, postSelector);
				}
				return markFunction(function(seed, results, context, xml) {
					var temp, i, elem,
						preMap = [],
						postMap = [],
						preexisting = results.length,
						// Get initial elements from seed or context
						elems = seed || multipleContexts(
							selector || "*",
							context.nodeType ? [context] : context,
							[]
						),
						// Prefilter to get matcher input, preserving a map for seed-results synchronization
						matcherIn = preFilter && (seed || !selector) ?
						condense(elems, preMap, preFilter, context, xml) :
						elems,
						matcherOut = matcher ?
						// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
						postFinder || (seed ? preFilter : preexisting || postFilter) ?
						// ...intermediate processing is necessary
						[] :
						// ...otherwise use results directly
						results :
						matcherIn;
					// Find primary matches
					if (matcher) {
						matcher(matcherIn, matcherOut, context, xml);
					}
					// Apply postFilter
					if (postFilter) {
						temp = condense(matcherOut, postMap);
						postFilter(temp, [], context, xml);
						// Un-match failing elements by moving them back to matcherIn
						i = temp.length;
						while (i--) {
							if ((elem = temp[i])) {
								matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
							}
						}
					}
					if (seed) {
						if (postFinder || preFilter) {
							if (postFinder) {
								// Get the final matcherOut by condensing this intermediate into postFinder contexts
								temp = [];
								i = matcherOut.length;
								while (i--) {
									if ((elem = matcherOut[i])) {
										// Restore matcherIn since elem is not yet a final match
										temp.push((matcherIn[i] = elem));
									}
								}
								postFinder(null, (matcherOut = []), temp, xml);
							}
							// Move matched elements from seed to results to keep them synchronized
							i = matcherOut.length;
							while (i--) {
								if ((elem = matcherOut[i]) &&
									(temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
									seed[temp] = !(results[temp] = elem);
								}
							}
						}
						// Add elements to results, through postFinder if defined
					} else {
						matcherOut = condense(
							matcherOut === results ?
							matcherOut.splice(preexisting, matcherOut.length) :
							matcherOut
						);
						if (postFinder) {
							postFinder(null, results, matcherOut, xml);
						} else {
							push.apply(results, matcherOut);
						}
					}
				});
			}

			function matcherFromTokens(tokens) {
				var checkContext, matcher, j,
					len = tokens.length,
					leadingRelative = Expr.relative[tokens[0].type],
					implicitRelative = leadingRelative || Expr.relative[" "],
					i = leadingRelative ? 1 : 0,
					// The foundational matcher ensures that elements are reachable from top-level context(s)
					matchContext = addCombinator(function(elem) {
						return elem === checkContext;
					}, implicitRelative, true),
					matchAnyContext = addCombinator(function(elem) {
						return indexOf(checkContext, elem) > -1;
					}, implicitRelative, true),
					matchers = [function(elem, context, xml) {
						var ret = (!leadingRelative && (xml || context !== outermostContext)) || (
							(checkContext = context).nodeType ?
							matchContext(elem, context, xml) :
							matchAnyContext(elem, context, xml));
						// Avoid hanging onto element (issue #299)
						checkContext = null;
						return ret;
					}];
				for (; i < len; i++) {
					if ((matcher = Expr.relative[tokens[i].type])) {
						matchers = [addCombinator(elementMatcher(matchers), matcher)];
					} else {
						matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
						// Return special upon seeing a positional matcher
						if (matcher[expando]) {
							// Find the next relative operator (if any) for proper handling
							j = ++i;
							for (; j < len; j++) {
								if (Expr.relative[tokens[j].type]) {
									break;
								}
							}
							return setMatcher(
								i > 1 && elementMatcher(matchers),
								i > 1 && toSelector(
									// If the preceding token was a descendant combinator, insert an implicit any-element `*`
									tokens
									.slice(0, i - 1)
									.concat({
										value: tokens[i - 2].type === " " ? "*" : ""
									})
								).replace(rtrim, "$1"),
								matcher,
								i < j && matcherFromTokens(tokens.slice(i, j)),
								j < len && matcherFromTokens((tokens = tokens.slice(j))),
								j < len && toSelector(tokens)
							);
						}
						matchers.push(matcher);
					}
				}
				return elementMatcher(matchers);
			}

			function matcherFromGroupMatchers(elementMatchers, setMatchers) {
				var bySet = setMatchers.length > 0,
					byElement = elementMatchers.length > 0,
					superMatcher = function(seed, context, xml, results, outermost) {
						var elem, j, matcher,
							matchedCount = 0,
							i = "0",
							unmatched = seed && [],
							setMatched = [],
							contextBackup = outermostContext,
							// We must always have either seed elements or outermost context
							elems = seed || byElement && Expr.find["TAG"]("*", outermost),
							// Use integer dirruns iff this is the outermost matcher
							dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
							len = elems.length;
						if (outermost) {
							// Support: IE 11+, Edge 17 - 18+
							// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
							// two documents; shallow comparisons work.
							// eslint-disable-next-line eqeqeq
							outermostContext = context == document || context || outermost;
						}
						// Add elements passing elementMatchers directly to results
						// Support: IE<9, Safari
						// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
						for (; i !== len && (elem = elems[i]) != null; i++) {
							if (byElement && elem) {
								j = 0;
								// Support: IE 11+, Edge 17 - 18+
								// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
								// two documents; shallow comparisons work.
								// eslint-disable-next-line eqeqeq
								if (!context && elem.ownerDocument != document) {
									setDocument(elem);
									xml = !documentIsHTML;
								}
								while ((matcher = elementMatchers[j++])) {
									if (matcher(elem, context || document, xml)) {
										results.push(elem);
										break;
									}
								}
								if (outermost) {
									dirruns = dirrunsUnique;
								}
							}
							// Track unmatched elements for set filters
							if (bySet) {
								// They will have gone through all possible matchers
								if ((elem = !matcher && elem)) {
									matchedCount--;
								}
								// Lengthen the array for every element, matched or not
								if (seed) {
									unmatched.push(elem);
								}
							}
						}
						// `i` is now the count of elements visited above, and adding it to `matchedCount`
						// makes the latter nonnegative.
						matchedCount += i;
						// Apply set filters to unmatched elements
						// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
						// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
						// no element matchers and no seed.
						// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
						// case, which will result in a "00" `matchedCount` that differs from `i` but is also
						// numerically zero.
						if (bySet && i !== matchedCount) {
							j = 0;
							while ((matcher = setMatchers[j++])) {
								matcher(unmatched, setMatched, context, xml);
							}
							if (seed) {
								// Reintegrate element matches to eliminate the need for sorting
								if (matchedCount > 0) {
									while (i--) {
										if (!(unmatched[i] || setMatched[i])) {
											setMatched[i] = pop.call(results);
										}
									}
								}
								// Discard index placeholder values to get only actual matches
								setMatched = condense(setMatched);
							}
							// Add matches to results
							push.apply(results, setMatched);
							// Seedless set matches succeeding multiple successful matchers stipulate sorting
							if (outermost && !seed && setMatched.length > 0 &&
								(matchedCount + setMatchers.length) > 1) {
								Sizzle.uniqueSort(results);
							}
						}
						// Override manipulation of globals by nested matchers
						if (outermost) {
							dirruns = dirrunsUnique;
							outermostContext = contextBackup;
						}
						return unmatched;
					};
				return bySet ?
					markFunction(superMatcher) :
					superMatcher;
			}
			compile = Sizzle.compile = function(selector, match /* Internal Use Only */ ) {
				var i,
					setMatchers = [],
					elementMatchers = [],
					cached = compilerCache[selector + " "];
				if (!cached) {
					// Generate a function of recursive functions that can be used to check each element
					if (!match) {
						match = tokenize(selector);
					}
					i = match.length;
					while (i--) {
						cached = matcherFromTokens(match[i]);
						if (cached[expando]) {
							setMatchers.push(cached);
						} else {
							elementMatchers.push(cached);
						}
					}
					// Cache the compiled function
					cached = compilerCache(
						selector,
						matcherFromGroupMatchers(elementMatchers, setMatchers)
					);
					// Save selector and tokenization
					cached.selector = selector;
				}
				return cached;
			};
			/**

			 * A low-level selection function that works with Sizzle's compiled

			 *  selector functions

			 * @param {String|Function} selector A selector or a pre-compiled

			 *  selector function built with Sizzle.compile

			 * @param {Element} context

			 * @param {Array} [results]

			 * @param {Array} [seed] A set of elements to match against

			 */
			select = Sizzle.select = function(selector, context, results, seed) {
				var i, tokens, token, type, find,
					compiled = typeof selector === "function" && selector,
					match = !seed && tokenize((selector = compiled.selector || selector));
				results = results || [];
				// Try to minimize operations if there is only one selector in the list and no seed
				// (the latter of which guarantees us context)
				if (match.length === 1) {
					// Reduce context if the leading compound selector is an ID
					tokens = match[0] = match[0].slice(0);
					if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
						context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
						context = (Expr.find["ID"](token.matches[0]
							.replace(runescape, funescape), context) || [])[0];
						if (!context) {
							return results;
							// Precompiled matchers will still verify ancestry, so step up a level
						} else if (compiled) {
							context = context.parentNode;
						}
						selector = selector.slice(tokens.shift().value.length);
					}
					// Fetch a seed set for right-to-left matching
					i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
					while (i--) {
						token = tokens[i];
						// Abort if we hit a combinator
						if (Expr.relative[(type = token.type)]) {
							break;
						}
						if ((find = Expr.find[type])) {
							// Search, expanding context for leading sibling combinators
							if ((seed = find(
									token.matches[0].replace(runescape, funescape),
									rsibling.test(tokens[0].type) && testContext(context.parentNode) ||
									context
								))) {
								// If seed is empty or no tokens remain, we can return early
								tokens.splice(i, 1);
								selector = seed.length && toSelector(tokens);
								if (!selector) {
									push.apply(results, seed);
									return results;
								}
								break;
							}
						}
					}
				}
				// Compile and execute a filtering function if one is not provided
				// Provide `match` to avoid retokenization if we modified the selector above
				(compiled || compile(selector, match))(
					seed,
					context,
					!documentIsHTML,
					results,
					!context || rsibling.test(selector) && testContext(context.parentNode) || context
				);
				return results;
			};
			// One-time assignments
			// Sort stability
			support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
			// Support: Chrome 14-35+
			// Always assume duplicates if they aren't passed to the comparison function
			support.detectDuplicates = !!hasDuplicate;
			// Initialize against the default document
			setDocument();
			// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
			// Detached nodes confoundingly follow *each other*
			support.sortDetached = assert(function(el) {
				// Should return 1, but returns 4 (following)
				return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
			});
			// Support: IE<8
			// Prevent attribute/property "interpolation"
			// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
			if (!assert(function(el) {
					el.innerHTML = "<a href='#'></a>";
					return el.firstChild.getAttribute("href") === "#";
				})) {
				addHandle("type|href|height|width", function(elem, name, isXML) {
					if (!isXML) {
						return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
					}
				});
			}
			// Support: IE<9
			// Use defaultValue in place of getAttribute("value")
			if (!support.attributes || !assert(function(el) {
					el.innerHTML = "<input/>";
					el.firstChild.setAttribute("value", "");
					return el.firstChild.getAttribute("value") === "";
				})) {
				addHandle("value", function(elem, _name, isXML) {
					if (!isXML && elem.nodeName.toLowerCase() === "input") {
						return elem.defaultValue;
					}
				});
			}
			// Support: IE<9
			// Use getAttributeNode to fetch booleans when getAttribute lies
			if (!assert(function(el) {
					return el.getAttribute("disabled") == null;
				})) {
				addHandle(booleans, function(elem, name, isXML) {
					var val;
					if (!isXML) {
						return elem[name] === true ? name.toLowerCase() :
							(val = elem.getAttributeNode(name)) && val.specified ?
							val.value :
							null;
					}
				});
			}
			return Sizzle;
		})(window);
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	// Deprecated
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;
	var dir = function(elem, dir, until) {
		var matched = [],
			truncate = until !== undefined;
		while ((elem = elem[dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};
	var siblings = function(n, elem) {
		var matched = [];
		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}
		return matched;
	};
	var rneedsContext = jQuery.expr.match.needsContext;

	function nodeName(elem, name) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	}
	var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);
	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (isFunction(qualifier)) {
			return jQuery.grep(elements, function(elem, i) {
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}
		// Single element
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function(elem) {
				return (elem === qualifier) !== not;
			});
		}
		// Arraylike of elements (jQuery, arguments, Array)
		if (typeof qualifier !== "string") {
			return jQuery.grep(elements, function(elem) {
				return (indexOf.call(qualifier, elem) > -1) !== not;
			});
		}
		// Filtered directly for both simple and complex selectors
		return jQuery.filter(qualifier, elements, not);
	}
	jQuery.filter = function(expr, elems, not) {
		var elem = elems[0];
		if (not) {
			expr = ":not(" + expr + ")";
		}
		if (elems.length === 1 && elem.nodeType === 1) {
			return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
		}
		return jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
			return elem.nodeType === 1;
		}));
	};
	jQuery.fn.extend({
		find: function(selector) {
			var i, ret,
				len = this.length,
				self = this;
			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function() {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}
			ret = this.pushStack([]);
			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}
			return len > 1 ? jQuery.uniqueSort(ret) : ret;
		},
		filter: function(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function(selector) {
			return !!winnow(
				this,
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test(selector) ?
				jQuery(selector) :
				selector || [],
				false
			).length;
		}
	});
	// Initialize a jQuery object
	// A central reference to the root jQuery(document)
	var rootjQuery,
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
		init = jQuery.fn.init = function(selector, context, root) {
			var match, elem;
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if (!selector) {
				return this;
			}
			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;
			// Handle HTML strings
			if (typeof selector === "string") {
				if (selector[0] === "<" &&
					selector[selector.length - 1] === ">" &&
					selector.length >= 3) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [null, selector, null];
				} else {
					match = rquickExpr.exec(selector);
				}
				// Match html or make sure no context is specified for #id
				if (match && (match[1] || !context)) {
					// HANDLE: $(html) -> $(array)
					if (match[1]) {
						context = context instanceof jQuery ? context[0] : context;
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge(this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						));
						// HANDLE: $(html, props)
						if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
							for (match in context) {
								// Properties of context are called as methods if possible
								if (isFunction(this[match])) {
									this[match](context[match]);
									// ...and otherwise set as attributes
								} else {
									this.attr(match, context[match]);
								}
							}
						}
						return this;
						// HANDLE: $(#id)
					} else {
						elem = document.getElementById(match[2]);
						if (elem) {
							// Inject the element directly into the jQuery object
							this[0] = elem;
							this.length = 1;
						}
						return this;
					}
					// HANDLE: $(expr, $(...))
				} else if (!context || context.jquery) {
					return (context || root).find(selector);
					// HANDLE: $(expr, context)
					// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor(context).find(selector);
				}
				// HANDLE: $(DOMElement)
			} else if (selector.nodeType) {
				this[0] = selector;
				this.length = 1;
				return this;
				// HANDLE: $(function)
				// Shortcut for document ready
			} else if (isFunction(selector)) {
				return root.ready !== undefined ?
					root.ready(selector) :
					// Execute immediately if ready is not present
					selector(jQuery);
			}
			return jQuery.makeArray(selector, this);
		};
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	// Initialize central reference
	rootjQuery = jQuery(document);
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	jQuery.fn.extend({
		has: function(target) {
			var targets = jQuery(target, this),
				l = targets.length;
			return this.filter(function() {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},
		closest: function(selectors, context) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery(selectors);
			// Positional selectors never match, since there's no _selection_ context
			if (!rneedsContext.test(selectors)) {
				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
						// Always skip document fragments
						if (cur.nodeType < 11 && (targets ?
								targets.index(cur) > -1 :
								// Don't pass non-elements to Sizzle
								cur.nodeType === 1 &&
								jQuery.find.matchesSelector(cur, selectors))) {
							matched.push(cur);
							break;
						}
					}
				}
			}
			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},
		// Determine the position of an element within the set
		index: function(elem) {
			// No argument, return index in parent
			if (!elem) {
				return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
			}
			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}
			// Locate the position of the desired element
			return indexOf.call(this,
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[0] : elem
			);
		},
		add: function(selector, context) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge(this.get(), jQuery(selector, context))
				)
			);
		},
		addBack: function(selector) {
			return this.add(selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}
	jQuery.each({
		parent: function(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function(elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function(elem, _i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function(elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function(elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function(elem, _i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function(elem, _i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function(elem) {
			return siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function(elem) {
			return siblings(elem.firstChild);
		},
		contents: function(elem) {
			if (elem.contentDocument != null &&
				// Support: IE 11+
				// <object> elements with no `data` attribute has an object
				// `contentDocument` with a `null` prototype.
				getProto(elem.contentDocument)) {
				return elem.contentDocument;
			}
			// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
			// Treat the template element as a regular one in browsers that
			// don't support it.
			if (nodeName(elem, "template")) {
				elem = elem.content || elem;
			}
			return jQuery.merge([], elem.childNodes);
		}
	}, function(name, fn) {
		jQuery.fn[name] = function(until, selector) {
			var matched = jQuery.map(this, fn, until);
			if (name.slice(-5) !== "Until") {
				selector = until;
			}
			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}
			if (this.length > 1) {
				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}
				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}
			return this.pushStack(matched);
		};
	});
	var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);
	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
			object[flag] = true;
		});
		return object;
	}
	/*

	 * Create a callback list using the following parameters:

	 *

	 *	options: an optional list of space-separated options that will change how

	 *			the callback list behaves or a more traditional option object

	 *

	 * By default a callback list will act like an event callback list and can be

	 * "fired" multiple times.

	 *

	 * Possible options:

	 *

	 *	once:			will ensure the callback list can only be fired once (like a Deferred)

	 *

	 *	memory:			will keep track of previous values and will call any callback added

	 *					after the list has been fired right away with the latest "memorized"

	 *					values (like a Deferred)

	 *

	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)

	 *

	 *	stopOnFalse:	interrupt callings when a callback returns false

	 *

	 */
	jQuery.Callbacks = function(options) {
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions(options) :
			jQuery.extend({}, options);
		var // Flag to know if list is currently firing
			firing,
			// Last fire value for non-forgettable lists
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to prevent firing
			locked,
			// Actual callback list
			list = [],
			// Queue of execution data for repeatable lists
			queue = [],
			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,
			// Fire callbacks
			fire = function() {
				// Enforce single-firing
				locked = locked || options.once;
				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for (; queue.length; firingIndex = -1) {
					memory = queue.shift();
					while (++firingIndex < list.length) {
						// Run callback and check for early termination
						if (list[firingIndex].apply(memory[0], memory[1]) === false &&
							options.stopOnFalse) {
							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}
				// Forget the data if we're done with it
				if (!options.memory) {
					memory = false;
				}
				firing = false;
				// Clean up if we're done firing for good
				if (locked) {
					// Keep an empty list if we have data for future add calls
					if (memory) {
						list = [];
						// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if (list) {
						// If we have memory from a past run, we should fire after adding
						if (memory && !firing) {
							firingIndex = list.length - 1;
							queue.push(memory);
						}
						(function add(args) {
							jQuery.each(args, function(_, arg) {
								if (isFunction(arg)) {
									if (!options.unique || !self.has(arg)) {
										list.push(arg);
									}
								} else if (arg && arg.length && toType(arg) !== "string") {
									// Inspect recursively
									add(arg);
								}
							});
						})(arguments);
						if (memory && !firing) {
							fire();
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					jQuery.each(arguments, function(_, arg) {
						var index;
						while ((index = jQuery.inArray(arg, list, index)) > -1) {
							list.splice(index, 1);
							// Handle firing indexes
							if (index <= firingIndex) {
								firingIndex--;
							}
						}
					});
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function(fn) {
					return fn ?
						jQuery.inArray(fn, list) > -1 :
						list.length > 0;
				},
				// Remove all callbacks from the list
				empty: function() {
					if (list) {
						list = [];
					}
					return this;
				},
				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},
				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if (!memory && !firing) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function(context, args) {
					if (!locked) {
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						queue.push(args);
						if (!firing) {
							fire();
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith(this, arguments);
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
		return self;
	};

	function Identity(v) {
		return v;
	}

	function Thrower(ex) {
		throw ex;
	}

	function adoptValue(value, resolve, reject, noValue) {
		var method;
		try {
			// Check for promise aspect first to privilege synchronous behavior
			if (value && isFunction((method = value.promise))) {
				method.call(value).done(resolve).fail(reject);
				// Other thenables
			} else if (value && isFunction((method = value.then))) {
				method.call(value, resolve, reject);
				// Other non-thenables
			} else {
				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply(undefined, [value].slice(noValue));
			}
			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
		} catch (value) {
			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply(undefined, [value]);
		}
	}
	jQuery.extend({
		Deferred: function(func) {
			var tuples = [
					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					["notify", "progress", jQuery.Callbacks("memory"),
						jQuery.Callbacks("memory"), 2
					],
					["resolve", "done", jQuery.Callbacks("once memory"),
						jQuery.Callbacks("once memory"), 0, "resolved"
					],
					["reject", "fail", jQuery.Callbacks("once memory"),
						jQuery.Callbacks("once memory"), 1, "rejected"
					]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done(arguments).fail(arguments);
						return this;
					},
					"catch": function(fn) {
						return promise.then(null, fn);
					},
					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function(newDefer) {
							jQuery.each(tuples, function(_i, tuple) {
								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[tuple[1]](function() {
									var returned = fn && fn.apply(this, arguments);
									if (returned && isFunction(returned.promise)) {
										returned.promise()
											.progress(newDefer.notify)
											.done(newDefer.resolve)
											.fail(newDefer.reject);
									} else {
										newDefer[tuple[0] + "With"](
											this,
											fn ? [returned] : arguments
										);
									}
								});
							});
							fns = null;
						}).promise();
					},
					then: function(onFulfilled, onRejected, onProgress) {
						var maxDepth = 0;

						function resolve(depth, deferred, handler, special) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;
										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if (depth < maxDepth) {
											return;
										}
										returned = handler.apply(that, args);
										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if (returned === deferred.promise()) {
											throw new TypeError("Thenable self-resolution");
										}
										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&
											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											(typeof returned === "object" ||
												typeof returned === "function") &&
											returned.then;
										// Handle a returned thenable
										if (isFunction(then)) {
											// Special processors (notify) just wait for resolution
											if (special) {
												then.call(
													returned,
													resolve(maxDepth, deferred, Identity, special),
													resolve(maxDepth, deferred, Thrower, special)
												);
												// Normal processors (resolve) also hook into progress
											} else {
												// ...and disregard older resolution values
												maxDepth++;
												then.call(
													returned,
													resolve(maxDepth, deferred, Identity, special),
													resolve(maxDepth, deferred, Thrower, special),
													resolve(maxDepth, deferred, Identity,
														deferred.notifyWith)
												);
											}
											// Handle all other returned values
										} else {
											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if (handler !== Identity) {
												that = undefined;
												args = [returned];
											}
											// Process the value(s)
											// Default process is resolve
											(special || deferred.resolveWith)(that, args);
										}
									},
									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch (e) {
											if (jQuery.Deferred.exceptionHook) {
												jQuery.Deferred.exceptionHook(e,
													process.stackTrace);
											}
											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if (depth + 1 >= maxDepth) {
												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if (handler !== Thrower) {
													that = undefined;
													args = [e];
												}
												deferred.rejectWith(that, args);
											}
										}
									};
								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if (depth) {
									process();
								} else {
									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if (jQuery.Deferred.getStackHook) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout(process);
								}
							};
						}
						return jQuery.Deferred(function(newDefer) {
							// progress_handlers.add( ... )
							tuples[0][3].add(
								resolve(
									0,
									newDefer,
									isFunction(onProgress) ?
									onProgress :
									Identity,
									newDefer.notifyWith
								)
							);
							// fulfilled_handlers.add( ... )
							tuples[1][3].add(
								resolve(
									0,
									newDefer,
									isFunction(onFulfilled) ?
									onFulfilled :
									Identity
								)
							);
							// rejected_handlers.add( ... )
							tuples[2][3].add(
								resolve(
									0,
									newDefer,
									isFunction(onRejected) ?
									onRejected :
									Thrower
								)
							);
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function(obj) {
						return obj != null ? jQuery.extend(obj, promise) : promise;
					}
				},
				deferred = {};
			// Add list-specific methods
			jQuery.each(tuples, function(i, tuple) {
				var list = tuple[2],
					stateString = tuple[5];
				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[tuple[1]] = list.add;
				// Handle state
				if (stateString) {
					list.add(
						function() {
							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},
						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[3 - i][2].disable,
						// rejected_handlers.disable
						// fulfilled_handlers.disable
						tuples[3 - i][3].disable,
						// progress_callbacks.lock
						tuples[0][2].lock,
						// progress_handlers.lock
						tuples[0][3].lock
					);
				}
				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add(tuple[3].fire);
				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[tuple[0]] = function() {
					deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
					return this;
				};
				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[tuple[0] + "With"] = list.fireWith;
			});
			// Make the deferred a promise
			promise.promise(deferred);
			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}
			// All done!
			return deferred;
		},
		// Deferred helper
		when: function(singleValue) {
			var
				// count of uncompleted subordinates
				remaining = arguments.length,
				// count of unprocessed arguments
				i = remaining,
				// subordinate fulfillment data
				resolveContexts = Array(i),
				resolveValues = slice.call(arguments),
				// the primary Deferred
				primary = jQuery.Deferred(),
				// subordinate callback factory
				updateFunc = function(i) {
					return function(value) {
						resolveContexts[i] = this;
						resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
						if (!(--remaining)) {
							primary.resolveWith(resolveContexts, resolveValues);
						}
					};
				};
			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject,
					!remaining);
				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (primary.state() === "pending" ||
					isFunction(resolveValues[i] && resolveValues[i].then)) {
					return primary.then();
				}
			}
			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), primary.reject);
			}
			return primary.promise();
		}
	});
	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	jQuery.Deferred.exceptionHook = function(error, stack) {
		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
			window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
		}
	};
	jQuery.readyException = function(error) {
		window.setTimeout(function() {
			throw error;
		});
	};
	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();
	jQuery.fn.ready = function(fn) {
		readyList
			.then(fn)
			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch(function(error) {
				jQuery.readyException(error);
			});
		return this;
	};
	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
		// Handle when the DOM is ready
		ready: function(wait) {
			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}
			// Remember that the DOM is ready
			jQuery.isReady = true;
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}
			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);
		}
	});
	jQuery.ready.then = readyList.then;
	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}
	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if (document.readyState === "complete" ||
		(document.readyState !== "loading" && !document.documentElement.doScroll)) {
		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout(jQuery.ready);
	} else {
		// Use the handy event callback
		document.addEventListener("DOMContentLoaded", completed);
		// A fallback to window.onload, that will always work
		window.addEventListener("load", completed);
	}
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
		// Sets many values
		if (toType(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}
			// Sets one value
		} else if (value !== undefined) {
			chainable = true;
			if (!isFunction(value)) {
				raw = true;
			}
			if (bulk) {
				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;
					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function(elem, _key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}
			if (fn) {
				for (; i < len; i++) {
					fn(
						elems[i], key, raw ?
						value :
						value.call(elems[i], i, fn(elems[i], key))
					);
				}
			}
		}
		if (chainable) {
			return elems;
		}
		// Gets
		if (bulk) {
			return fn.call(elems);
		}
		return len ? fn(elems[0], key) : emptyGet;
	};
	// Matches dashed string for camelizing
	var rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g;
	// Used by camelCase as callback to replace()
	function fcamelCase(_all, letter) {
		return letter.toUpperCase();
	}
	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 15
	// Microsoft forgot to hump their vendor prefix (#9572)
	function camelCase(string) {
		return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	}
	var acceptData = function(owner) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}
	Data.uid = 1;
	Data.prototype = {
		cache: function(owner) {
			// Check if the owner object already has a cache
			var value = owner[this.expando];
			// If not, create one
			if (!value) {
				value = {};
				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;
						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}
			return value;
		},
		set: function(owner, data, value) {
			var prop,
				cache = this.cache(owner);
			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if (typeof data === "string") {
				cache[camelCase(data)] = value;
				// Handle: [ owner, { properties } ] args
			} else {
				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[camelCase(prop)] = data[prop];
				}
			}
			return cache;
		},
		get: function(owner, key) {
			return key === undefined ?
				this.cache(owner) :
				// Always use camelCase key (gh-2257)
				owner[this.expando] && owner[this.expando][camelCase(key)];
		},
		access: function(owner, key, value) {
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined ||
				((key && typeof key === "string") && value === undefined)) {
				return this.get(owner, key);
			}
			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function(owner, key) {
			var i,
				cache = owner[this.expando];
			if (cache === undefined) {
				return;
			}
			if (key !== undefined) {
				// Support array or space separated string of keys
				if (Array.isArray(key)) {
					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map(camelCase);
				} else {
					key = camelCase(key);
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ? [key] :
						(key.match(rnothtmlwhite) || []);
				}
				i = key.length;
				while (i--) {
					delete cache[key[i]];
				}
			}
			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {
				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function(owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();
	var dataUser = new Data();
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function getData(data) {
		if (data === "true") {
			return true;
		}
		if (data === "false") {
			return false;
		}
		if (data === "null") {
			return null;
		}
		// Only convert to a number if it doesn't change the string
		if (data === +data + "") {
			return +data;
		}
		if (rbrace.test(data)) {
			return JSON.parse(data);
		}
		return data;
	}

	function dataAttr(elem, key, data) {
		var name;
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);
			if (typeof data === "string") {
				try {
					data = getData(data);
				} catch (e) {}
				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}
	jQuery.extend({
		hasData: function(elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},
		data: function(elem, name, data) {
			return dataUser.access(elem, name, data);
		},
		removeData: function(elem, name) {
			dataUser.remove(elem, name);
		},
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function(elem, name, data) {
			return dataPriv.access(elem, name, data);
		},
		_removeData: function(elem, name) {
			dataPriv.remove(elem, name);
		}
	});
	jQuery.fn.extend({
		data: function(key, value) {
			var i, name, data,
				elem = this[0],
				attrs = elem && elem.attributes;
			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);
					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {
							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}
				return data;
			}
			// Sets multiple values
			if (typeof key === "object") {
				return this.each(function() {
					dataUser.set(this, key);
				});
			}
			return access(this, function(value) {
				var data;
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {
					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get(elem, key);
					if (data !== undefined) {
						return data;
					}
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, key);
					if (data !== undefined) {
						return data;
					}
					// We tried really hard, but the data doesn't exist.
					return;
				}
				// Set the data...
				this.each(function() {
					// We always store the camelCased key
					dataUser.set(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},
		removeData: function(key) {
			return this.each(function() {
				dataUser.remove(this, key);
			});
		}
	});
	jQuery.extend({
		queue: function(elem, type, data) {
			var queue;
			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);
				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || Array.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},
		dequeue: function(elem, type) {
			type = type || "fx";
			var queue = jQuery.queue(elem, type),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks(elem, type),
				next = function() {
					jQuery.dequeue(elem, type);
				};
			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}
			if (fn) {
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}
			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function(elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});
	jQuery.fn.extend({
		queue: function(type, data) {
			var setter = 2;
			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}
			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}
			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue(this, type, data);
					// Ensure a hooks for this queue
					jQuery._queueHooks(this, type);
					if (type === "fx" && queue[0] !== "inprogress") {
						jQuery.dequeue(this, type);
					}
				});
		},
		dequeue: function(type) {
			return this.each(function() {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function(type) {
			return this.queue(type || "fx", []);
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function(type, obj) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if (!(--count)) {
						defer.resolveWith(elements, [elements]);
					}
				};
			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
	var cssExpand = ["Top", "Right", "Bottom", "Left"];
	var documentElement = document.documentElement;
	var isAttached = function(elem) {
			return jQuery.contains(elem.ownerDocument, elem);
		},
		composed = {
			composed: true
		};
	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if (documentElement.getRootNode) {
		isAttached = function(elem) {
			return jQuery.contains(elem.ownerDocument, elem) ||
				elem.getRootNode(composed) === elem.ownerDocument;
		};
	}
	var isHiddenWithinTree = function(elem, el) {
		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&
			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached(elem) &&
			jQuery.css(elem, "display") === "none";
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted, scale,
			maxIterations = 20,
			currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css(elem, prop, "");
			},
			initial = currentValue(),
			unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
			// Starting value computation is required for potential unit mismatches
			initialInUnit = elem.nodeType &&
			(jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
			rcssNum.exec(jQuery.css(elem, prop));
		if (initialInUnit && initialInUnit[3] !== unit) {
			// Support: Firefox <=54
			// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
			initial = initial / 2;
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];
			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;
			while (maxIterations--) {
				// Evaluate and update our best guess (doubling guesses that zero out).
				// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
				jQuery.style(elem, prop, initialInUnit + unit);
				if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
					maxIterations = 0;
				}
				initialInUnit = initialInUnit / scale;
			}
			initialInUnit = initialInUnit * 2;
			jQuery.style(elem, prop, initialInUnit + unit);
			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
		}
		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ?
				initialInUnit + (valueParts[1] + 1) * valueParts[2] :
				+valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var defaultDisplayMap = {};

	function getDefaultDisplay(elem) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[nodeName];
		if (display) {
			return display;
		}
		temp = doc.body.appendChild(doc.createElement(nodeName));
		display = jQuery.css(temp, "display");
		temp.parentNode.removeChild(temp);
		if (display === "none") {
			display = "block";
		}
		defaultDisplayMap[nodeName] = display;
		return display;
	}

	function showHide(elements, show) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;
		// Determine new display value for elements that need to change
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}
			display = elem.style.display;
			if (show) {
				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if (display === "none") {
					values[index] = dataPriv.get(elem, "display") || null;
					if (!values[index]) {
						elem.style.display = "";
					}
				}
				if (elem.style.display === "" && isHiddenWithinTree(elem)) {
					values[index] = getDefaultDisplay(elem);
				}
			} else {
				if (display !== "none") {
					values[index] = "none";
					// Remember what we're overwriting
					dataPriv.set(elem, "display", display);
				}
			}
		}
		// Set the display of the elements in a second loop to avoid constant reflow
		for (index = 0; index < length; index++) {
			if (values[index] != null) {
				elements[index].style.display = values[index];
			}
		}
		return elements;
	}
	jQuery.fn.extend({
		show: function() {
			return showHide(this, true);
		},
		hide: function() {
			return showHide(this);
		},
		toggle: function(state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}
			return this.each(function() {
				if (isHiddenWithinTree(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});
	var rcheckableType = (/^(?:checkbox|radio)$/i);
	var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]*)/i);
	var rscriptType = (/^$|^module$|\/(?:java|ecma)script/i);
	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild(document.createElement("div")),
			input = document.createElement("input");
		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");
		div.appendChild(input);
		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
		// Support: IE <=9 only
		// IE <=9 replaces <option> tags with their contents when inserted outside of
		// the select element.
		div.innerHTML = "<option></option>";
		support.option = !!div.lastChild;
	})();
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default: [0, "", ""]
	};
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	// Support: IE <=9 only
	if (!support.option) {
		wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
	}

	function getAll(context, tag) {
		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;
		if (typeof context.getElementsByTagName !== "undefined") {
			ret = context.getElementsByTagName(tag || "*");
		} else if (typeof context.querySelectorAll !== "undefined") {
			ret = context.querySelectorAll(tag || "*");
		} else {
			ret = [];
		}
		if (tag === undefined || tag && nodeName(context, tag)) {
			return jQuery.merge([context], ret);
		}
		return ret;
	}
	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
			l = elems.length;
		for (; i < l; i++) {
			dataPriv.set(
				elems[i],
				"globalEval",
				!refElements || dataPriv.get(refElements[i], "globalEval")
			);
		}
	}
	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem, tmp, tag, wrap, attached, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;
		for (; i < l; i++) {
			elem = elems[i];
			if (elem || elem === 0) {
				// Add nodes directly
				if (toType(elem) === "object") {
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));
					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));
					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);
					// Remember the top-level container
					tmp = fragment.firstChild;
					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}
		// Remove wrapper from fragment
		fragment.textContent = "";
		i = 0;
		while ((elem = nodes[i++])) {
			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}
			attached = isAttached(elem);
			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");
			// Preserve script evaluation history
			if (attached) {
				setGlobalEval(tmp);
			}
			// Capture executables
			if (scripts) {
				j = 0;
				while ((elem = tmp[j++])) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}
		return fragment;
	}
	var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}
	// Support: IE <=9 - 11+
	// focus() and blur() are asynchronous, except when they are no-op.
	// So expect focus to be synchronous when the element is already active,
	// and blur to be synchronous when the element is not already active.
	// (focus and blur are always synchronous in other supported browsers,
	// this just defines when we can count on it).
	function expectSync(elem, type) {
		return (elem === safeActiveElement()) === (type === "focus");
	}
	// Support: IE <=9 only
	// Accessing document.activeElement can throw unexpectedly
	// https://bugs.jquery.com/ticket/13393
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function on(elem, types, selector, data, fn, one) {
		var origFn, type;
		// Types can be a map of types/handlers
		if (typeof types === "object") {
			// ( types-Object, selector, data )
			if (typeof selector !== "string") {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}
		if (data == null && fn == null) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}
		if (one === 1) {
			origFn = fn;
			fn = function(event) {
				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function() {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}
	/*

	 * Helper functions for managing events -- not part of the public interface.

	 * Props to Dean Edwards' addEvent library for many of the ideas.

	 */
	jQuery.event = {
		global: {},
		add: function(elem, types, handler, data, selector) {
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get(elem);
			// Only attach events to objects that accept data
			if (!acceptData(elem)) {
				return;
			}
			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				jQuery.find.matchesSelector(documentElement, selector);
			}
			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}
			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = Object.create(null);
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function(e) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}
			// Handle multiple events separated by a space
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};
				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;
				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);
				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;
					// Only use addEventListener if the special events handler returns false
					if (!special.setup ||
						special.setup.call(elem, data, namespaces, eventHandle) === false) {
						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}
				if (special.add) {
					special.add.call(elem, handleObj);
					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}
				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},
		// Detach an event or set of events from an element
		remove: function(elem, types, handler, selector, mappedTypes) {
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
			if (!elemData || !(events = elemData.events)) {
				return;
			}
			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] &&
					new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];
					if ((mappedTypes || origType === handleObj.origType) &&
						(!handler || handler.guid === handleObj.guid) &&
						(!tmp || tmp.test(handleObj.namespace)) &&
						(!selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);
						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown ||
						special.teardown.call(elem, namespaces, elemData.handle) === false) {
						jQuery.removeEvent(elem, type, elemData.handle);
					}
					delete events[type];
				}
			}
			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},
		dispatch: function(nativeEvent) {
			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array(arguments.length),
				// Make a writable jQuery.Event from the native event object
				event = jQuery.event.fix(nativeEvent),
				handlers = (
					dataPriv.get(this, "events") || Object.create(null)
				)[event.type] || [],
				special = jQuery.event.special[event.type] || {};
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i];
			}
			event.delegateTarget = this;
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;
				j = 0;
				while ((handleObj = matched.handlers[j++]) &&
					!event.isImmediatePropagationStopped()) {
					// If the event is namespaced, then each handler is only invoked if it is
					// specially universal or its namespaces are a superset of the event's.
					if (!event.rnamespace || handleObj.namespace === false ||
						event.rnamespace.test(handleObj.namespace)) {
						event.handleObj = handleObj;
						event.data = handleObj.data;
						ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
							handleObj.handler).apply(matched.elem, args);
						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}
			return event.result;
		},
		handlers: function(event, handlers) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
			// Find delegate handlers
			if (delegateCount &&
				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&
				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!(event.type === "click" && event.button >= 1)) {
				for (; cur !== this; cur = cur.parentNode || this) {
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
						matchedHandlers = [];
						matchedSelectors = {};
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i];
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObj.needsContext ?
									jQuery(sel, this).index(cur) > -1 :
									jQuery.find(sel, this, null, [cur]).length;
							}
							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObj);
							}
						}
						if (matchedHandlers.length) {
							handlerQueue.push({
								elem: cur,
								handlers: matchedHandlers
							});
						}
					}
				}
			}
			// Add the remaining (directly-bound) handlers
			cur = this;
			if (delegateCount < handlers.length) {
				handlerQueue.push({
					elem: cur,
					handlers: handlers.slice(delegateCount)
				});
			}
			return handlerQueue;
		},
		addProp: function(name, hook) {
			Object.defineProperty(jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,
				get: isFunction(hook) ?
					function() {
						if (this.originalEvent) {
							return hook(this.originalEvent);
						}
					} : function() {
						if (this.originalEvent) {
							return this.originalEvent[name];
						}
					},
				set: function(value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					});
				}
			});
		},
		fix: function(originalEvent) {
			return originalEvent[jQuery.expando] ?
				originalEvent :
				new jQuery.Event(originalEvent);
		},
		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			click: {
				// Utilize native event to ensure correct state for checkable inputs
				setup: function(data) {
					// For mutual compressibility with _default, replace `this` access with a local var.
					// `|| data` is dead code meant only to preserve the variable through minification.
					var el = this || data;
					// Claim the first handler
					if (rcheckableType.test(el.type) &&
						el.click && nodeName(el, "input")) {
						// dataPriv.set( el, "click", ... )
						leverageNative(el, "click", returnTrue);
					}
					// Return false to allow normal processing in the caller
					return false;
				},
				trigger: function(data) {
					// For mutual compressibility with _default, replace `this` access with a local var.
					// `|| data` is dead code meant only to preserve the variable through minification.
					var el = this || data;
					// Force setup before triggering a click
					if (rcheckableType.test(el.type) &&
						el.click && nodeName(el, "input")) {
						leverageNative(el, "click");
					}
					// Return non-false to allow normal event-path propagation
					return true;
				},
				// For cross-browser consistency, suppress native .click() on links
				// Also prevent it if we're currently inside a leveraged native-event stack
				_default: function(event) {
					var target = event.target;
					return rcheckableType.test(target.type) &&
						target.click && nodeName(target, "input") &&
						dataPriv.get(target, "click") ||
						nodeName(target, "a");
				}
			},
			beforeunload: {
				postDispatch: function(event) {
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};
	// Ensure the presence of an event listener that handles manually-triggered
	// synthetic events by interrupting progress until reinvoked in response to
	// *native* events that it fires directly, ensuring that state changes have
	// already occurred before other listeners are invoked.
	function leverageNative(el, type, expectSync) {
		// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
		if (!expectSync) {
			if (dataPriv.get(el, type) === undefined) {
				jQuery.event.add(el, type, returnTrue);
			}
			return;
		}
		// Register the controller as a special universal handler for all event namespaces
		dataPriv.set(el, type, false);
		jQuery.event.add(el, type, {
			namespace: false,
			handler: function(event) {
				var notAsync, result,
					saved = dataPriv.get(this, type);
				if ((event.isTrigger & 1) && this[type]) {
					// Interrupt processing of the outer synthetic .trigger()ed event
					// Saved data should be false in such cases, but might be a leftover capture object
					// from an async native handler (gh-4350)
					if (!saved.length) {
						// Store arguments for use when handling the inner native event
						// There will always be at least one argument (an event object), so this array
						// will not be confused with a leftover capture object.
						saved = slice.call(arguments);
						dataPriv.set(this, type, saved);
						// Trigger the native event and capture its result
						// Support: IE <=9 - 11+
						// focus() and blur() are asynchronous
						notAsync = expectSync(this, type);
						this[type]();
						result = dataPriv.get(this, type);
						if (saved !== result || notAsync) {
							dataPriv.set(this, type, false);
						} else {
							result = {};
						}
						if (saved !== result) {
							// Cancel the outer synthetic event
							event.stopImmediatePropagation();
							event.preventDefault();
							// Support: Chrome 86+
							// In Chrome, if an element having a focusout handler is blurred by
							// clicking outside of it, it invokes the handler synchronously. If
							// that handler calls `.remove()` on the element, the data is cleared,
							// leaving `result` undefined. We need to guard against this.
							return result && result.value;
						}
						// If this is an inner synthetic event for an event with a bubbling surrogate
						// (focus or blur), assume that the surrogate already propagated from triggering the
						// native event and prevent that from happening again here.
						// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
						// bubbling surrogate propagates *after* the non-bubbling base), but that seems
						// less bad than duplication.
					} else if ((jQuery.event.special[type] || {}).delegateType) {
						event.stopPropagation();
					}
					// If this is a native event triggered above, everything is now in order
					// Fire an inner synthetic event with the original arguments
				} else if (saved.length) {
					// ...and capture the result
					dataPriv.set(this, type, {
						value: jQuery.event.trigger(
							// Support: IE <=9 - 11+
							// Extend with the prototype to reset the above stopImmediatePropagation()
							jQuery.extend(saved[0], jQuery.Event.prototype),
							saved.slice(1),
							this
						)
					});
					// Abort handling of the native event
					event.stopImmediatePropagation();
				}
			}
		});
	}
	jQuery.removeEvent = function(elem, type, handle) {
		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};
	jQuery.Event = function(src, props) {
		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}
		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android <=2.3 only
				src.returnValue === false ?
				returnTrue :
				returnFalse;
			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = (src.target && src.target.nodeType === 3) ?
				src.target.parentNode :
				src.target;
			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;
			// Event type
		} else {
			this.type = src;
		}
		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || Date.now();
		// Mark it as fixed
		this[jQuery.expando] = true;
	};
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = returnTrue;
			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = returnTrue;
			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
			this.isImmediatePropagationStopped = returnTrue;
			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}
			this.stopPropagation();
		}
	};
	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		code: true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,
		which: true
	}, jQuery.event.addProp);
	jQuery.each({
		focus: "focusin",
		blur: "focusout"
	}, function(type, delegateType) {
		jQuery.event.special[type] = {
			// Utilize native event if possible so blur/focus sequence is correct
			setup: function() {
				// Claim the first handler
				// dataPriv.set( this, "focus", ... )
				// dataPriv.set( this, "blur", ... )
				leverageNative(this, type, expectSync);
				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function() {
				// Force setup before trigger
				leverageNative(this, type);
				// Return non-false to allow normal event-path propagation
				return true;
			},
			// Suppress native focus or blur as it's already being fired
			// in leverageNative.
			_default: function() {
				return true;
			},
			delegateType: delegateType
		};
	});
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,
			handle: function(event) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || (related !== target && !jQuery.contains(target, related))) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});
	jQuery.fn.extend({
		on: function(types, selector, data, fn) {
			return on(this, types, selector, data, fn);
		},
		one: function(types, selector, data, fn) {
			return on(this, types, selector, data, fn, 1);
		},
		off: function(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(
					handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if (typeof types === "object") {
				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});
	var
		// Support: IE <=10 - 11, Edge 12 - 13 only
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget(elem, content) {
		if (nodeName(elem, "table") &&
			nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
			return jQuery(elem).children("tbody")[0] || elem;
		}
		return elem;
	}
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}

	function restoreScript(elem) {
		if ((elem.type || "").slice(0, 5) === "true/") {
			elem.type = elem.type.slice(5);
		} else {
			elem.removeAttribute("type");
		}
		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, udataOld, udataCur, events;
		if (dest.nodeType !== 1) {
			return;
		}
		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.get(src);
			events = pdataOld.events;
			if (events) {
				dataPriv.remove(dest, "handle events");
				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}
		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);
			dataUser.set(dest, udataCur);
		}
	}
	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;
			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {
		// Flatten any nested arrays
		args = flat(args);
		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[0],
			valueIsFunction = isFunction(value);
		// We can't cloneNode fragments that contain checked, in WebKit
		if (valueIsFunction ||
			(l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test(value))) {
			return collection.each(function(index) {
				var self = collection.eq(index);
				if (valueIsFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}
		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;
			if (fragment.childNodes.length === 1) {
				fragment = first;
			}
			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;
				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;
					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);
						// Keep references to cloned scripts for later restoration
						if (hasScripts) {
							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}
					callback.call(collection[i], node, i);
				}
				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;
					// Reenable scripts
					jQuery.map(scripts, restoreScript);
					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") &&
							!dataPriv.access(node, "globalEval") &&
							jQuery.contains(doc, node)) {
							if (node.src && (node.type || "").toLowerCase() !== "module") {
								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl && !node.noModule) {
									jQuery._evalUrl(node.src, {
										nonce: node.nonce || node.getAttribute("nonce")
									}, doc);
								}
							} else {
								DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
							}
						}
					}
				}
			}
		}
		return collection;
	}

	function remove(elem, selector, keepData) {
		var node,
			nodes = selector ? jQuery.filter(selector, elem) : elem,
			i = 0;
		for (;
			(node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}
			if (node.parentNode) {
				if (keepData && isAttached(node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}
		return elem;
	}
	jQuery.extend({
		htmlPrefilter: function(html) {
			return html;
		},
		clone: function(elem, dataAndEvents, deepDataAndEvents) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode(true),
				inPage = isAttached(elem);
			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
				!jQuery.isXMLDoc(elem)) {
				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);
				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}
			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);
					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}
			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}
			// Return the cloned set
			return clone;
		},
		cleanData: function(elems) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;
			for (;
				(elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if ((data = elem[dataPriv.expando])) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);
									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});
	jQuery.fn.extend({
		detach: function(selector) {
			return remove(this, selector, true);
		},
		remove: function(selector) {
			return remove(this, selector);
		},
		text: function(value) {
			return access(this, function(value) {
				return value === undefined ?
					jQuery.text(this) :
					this.empty().each(function() {
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length);
		},
		append: function() {
			return domManip(this, arguments, function(elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},
		prepend: function() {
			return domManip(this, arguments, function(elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},
		before: function() {
			return domManip(this, arguments, function(elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},
		after: function() {
			return domManip(this, arguments, function(elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},
		empty: function() {
			var elem,
				i = 0;
			for (;
				(elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {
					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
			return this;
		},
		clone: function(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
			return this.map(function() {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},
		html: function(value) {
			return access(this, function(value) {
				var elem = this[0] || {},
					i = 0,
					l = this.length;
				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}
				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) &&
					!wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
					value = jQuery.htmlPrefilter(value);
					try {
						for (; i < l; i++) {
							elem = this[i] || {};
							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}
						elem = 0;
						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}
				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},
		replaceWith: function() {
			var ignored = [];
			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function(elem) {
				var parent = this.parentNode;
				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}
				// Force callback invocation
			}, ignored);
		}
	});
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(name, original) {
		jQuery.fn[name] = function(selector) {
			var elems,
				ret = [],
				insert = jQuery(selector),
				last = insert.length - 1,
				i = 0;
			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);
				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply(ret, elems.get());
			}
			return this.pushStack(ret);
		};
	});
	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
	var getStyles = function(elem) {
		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;
		if (!view || !view.opener) {
			view = window;
		}
		return view.getComputedStyle(elem);
	};
	var swap = function(elem, options, callback) {
		var ret, name,
			old = {};
		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}
		ret = callback.call(elem);
		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}
		return ret;
	};
	var rboxStyle = new RegExp(cssExpand.join("|"), "i");
	(function() {
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			// This is a singleton, we need to execute it only once
			if (!div) {
				return;
			}
			container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
				"margin-top:1px;padding:0;border:0";
			div.style.cssText =
				"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
				"margin:auto;border:1px;padding:1px;" +
				"width:60%;top:1%";
			documentElement.appendChild(container).appendChild(div);
			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";
			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
			// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
			// Some styles come back with percentage values, even though they shouldn't
			div.style.right = "60%";
			pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
			// Support: IE 9 - 11 only
			// Detect misreporting of content dimensions for box-sizing:border-box elements
			boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
			// Support: IE 9 only
			// Detect overflow:scroll screwiness (gh-3699)
			// Support: Chrome <=64
			// Don't get tricked when zoom affects offsetWidth (gh-4029)
			div.style.position = "absolute";
			scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
			documentElement.removeChild(container);
			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		function roundPixelMeasures(measure) {
			return Math.round(parseFloat(measure));
		}
		var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
			reliableTrDimensionsVal, reliableMarginLeftVal,
			container = document.createElement("div"),
			div = document.createElement("div");
		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}
		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
		jQuery.extend(support, {
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelBoxStyles: function() {
				computeStyleTests();
				return pixelBoxStylesVal;
			},
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			},
			scrollboxSize: function() {
				computeStyleTests();
				return scrollboxSizeVal;
			},
			// Support: IE 9 - 11+, Edge 15 - 18+
			// IE/Edge misreport `getComputedStyle` of table rows with width/height
			// set in CSS while `offset*` properties report correct values.
			// Behavior in IE 9 is more subtle than in newer versions & it passes
			// some versions of this test; make sure not to make it pass there!
			//
			// Support: Firefox 70+
			// Only Firefox includes border widths
			// in computed dimensions. (gh-4529)
			reliableTrDimensions: function() {
				var table, tr, trChild, trStyle;
				if (reliableTrDimensionsVal == null) {
					table = document.createElement("table");
					tr = document.createElement("tr");
					trChild = document.createElement("div");
					table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
					tr.style.cssText = "border:1px solid";
					// Support: Chrome 86+
					// Height set through cssText does not get applied.
					// Computed height then comes back as 0.
					tr.style.height = "1px";
					trChild.style.height = "9px";
					// Support: Android 8 Chrome 86+
					// In our bodyBackground.html iframe,
					// display for all div elements is set to "inline",
					// which causes a problem only in Android 8 Chrome 86.
					// Ensuring the div is display: block
					// gets around this issue.
					trChild.style.display = "block";
					documentElement
						.appendChild(table)
						.appendChild(tr)
						.appendChild(trChild);
					trStyle = window.getComputedStyle(tr);
					reliableTrDimensionsVal = (parseInt(trStyle.height, 10) +
						parseInt(trStyle.borderTopWidth, 10) +
						parseInt(trStyle.borderBottomWidth, 10)) === tr.offsetHeight;
					documentElement.removeChild(table);
				}
				return reliableTrDimensionsVal;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width, minWidth, maxWidth, ret,
			// Support: Firefox 51+
			// Retrieving style before computed somehow
			// fixes an issue with getting wrong values
			// on detached elements
			style = elem.style;
		computed = computed || getStyles(elem);
		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if (computed) {
			ret = computed.getPropertyValue(name) || computed[name];
			if (ret === "" && !isAttached(elem)) {
				ret = jQuery.style(elem, name);
			}
			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
		return ret !== undefined ?
			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}

	function addGetHookIf(conditionFn, hookFn) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if (conditionFn()) {
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}
	var cssPrefixes = ["Webkit", "Moz", "ms"],
		emptyStyle = document.createElement("div").style,
		vendorProps = {};
	// Return a vendor-prefixed property or undefined
	function vendorPropName(name) {
		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			i = cssPrefixes.length;
		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}
	// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
	function finalPropName(name) {
		var final = jQuery.cssProps[name] || vendorProps[name];
		if (final) {
			return final;
		}
		if (name in emptyStyle) {
			return name;
		}
		return vendorProps[name] = vendorPropName(name) || name;
	}
	var
		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rcustomProp = /^--/,
		cssShow = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		};

	function setPositiveNumber(_elem, value, subtract) {
		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
			value;
	}

	function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
		var i = dimension === "width" ? 1 : 0,
			extra = 0,
			delta = 0;
		// Adjustment may not be necessary
		if (box === (isBorderBox ? "border" : "content")) {
			return 0;
		}
		for (; i < 4; i += 2) {
			// Both box models exclude margin
			if (box === "margin") {
				delta += jQuery.css(elem, box + cssExpand[i], true, styles);
			}
			// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
			if (!isBorderBox) {
				// Add padding
				delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				// For "border" or "margin", add border
				if (box !== "padding") {
					delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
					// But still keep track of it otherwise
				} else {
					extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
				// If we get here with a border-box (content + padding + border), we're seeking "content" or
				// "padding" or "margin"
			} else {
				// For "content", subtract padding
				if (box === "content") {
					delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}
				// For "content" or "padding", subtract border
				if (box !== "margin") {
					delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}
		// Account for positive content-box scroll gutter when requested by providing computedVal
		if (!isBorderBox && computedVal >= 0) {
			// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
			// Assuming integer scroll gutter, subtract the rest and round down
			delta += Math.max(0, Math.ceil(
				elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
				computedVal -
				delta -
				extra -
				0.5
				// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
				// Use an explicit zero to avoid NaN (gh-3964)
			)) || 0;
		}
		return delta;
	}

	function getWidthOrHeight(elem, dimension, extra) {
		// Start with computed style
		var styles = getStyles(elem),
			// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
			// Fake content-box until we know it's needed to know the true value.
			boxSizingNeeded = !support.boxSizingReliable() || extra,
			isBorderBox = boxSizingNeeded &&
			jQuery.css(elem, "boxSizing", false, styles) === "border-box",
			valueIsBorderBox = isBorderBox,
			val = curCSS(elem, dimension, styles),
			offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
		// Support: Firefox <=54
		// Return a confounding non-pixel value or feign ignorance, as appropriate.
		if (rnumnonpx.test(val)) {
			if (!extra) {
				return val;
			}
			val = "auto";
		}
		// Support: IE 9 - 11 only
		// Use offsetWidth/offsetHeight for when box sizing is unreliable.
		// In those cases, the computed value can be trusted to be border-box.
		if ((!support.boxSizingReliable() && isBorderBox ||
				// Support: IE 10 - 11+, Edge 15 - 18+
				// IE/Edge misreport `getComputedStyle` of table rows with width/height
				// set in CSS while `offset*` properties report correct values.
				// Interestingly, in some cases IE 9 doesn't suffer from this issue.
				!support.reliableTrDimensions() && nodeName(elem, "tr") ||
				// Fall back to offsetWidth/offsetHeight when value is "auto"
				// This happens for inline elements with no explicit setting (gh-3571)
				val === "auto" ||
				// Support: Android <=4.1 - 4.3 only
				// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
				!parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") &&
			// Make sure the element is visible & connected
			elem.getClientRects().length) {
			isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
			// Where available, offsetWidth/offsetHeight approximate border box dimensions.
			// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
			// retrieved value as a content box dimension.
			valueIsBorderBox = offsetProp in elem;
			if (valueIsBorderBox) {
				val = elem[offsetProp];
			}
		}
		// Normalize "" and auto
		val = parseFloat(val) || 0;
		// Adjust for the element's box model
		return (val +
			boxModelAdjustment(
				elem,
				dimension,
				extra || (isBorderBox ? "border" : "content"),
				valueIsBorderBox,
				styles,
				// Provide the current computed size to request scroll gutter calculation (gh-3589)
				val
			)
		) + "px";
	}
	jQuery.extend({
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function(elem, computed) {
					if (computed) {
						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"gridArea": true,
			"gridColumn": true,
			"gridColumnEnd": true,
			"gridColumnStart": true,
			"gridRow": true,
			"gridRowEnd": true,
			"gridRowStart": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {},
		// Get and set the style property on a DOM Node
		style: function(elem, name, value, extra) {
			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = camelCase(name),
				isCustomProp = rcustomProp.test(name),
				style = elem.style;
			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value;
				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);
					// Fixes bug #9237
					type = "number";
				}
				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}
				// If a number was passed in, add the unit (except for certain CSS properties)
				// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
				// "px" to a few hardcoded values.
				if (type === "number" && !isCustomProp) {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}
				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}
				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) ||
					(value = hooks.set(elem, value, extra)) !== undefined) {
					if (isCustomProp) {
						style.setProperty(name, value);
					} else {
						style[name] = value;
					}
				}
			} else {
				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks &&
					(ret = hooks.get(elem, false, extra)) !== undefined) {
					return ret;
				}
				// Otherwise just get the value from the style object
				return style[name];
			}
		},
		css: function(elem, name, extra, styles) {
			var val, num, hooks,
				origName = camelCase(name),
				isCustomProp = rcustomProp.test(name);
			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}
			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}
			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}
			return val;
		}
	});
	jQuery.each(["height", "width"], function(_i, dimension) {
		jQuery.cssHooks[dimension] = {
			get: function(elem, computed, extra) {
				if (computed) {
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) &&
						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						(!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
						swap(elem, cssShow, function() {
							return getWidthOrHeight(elem, dimension, extra);
						}) :
						getWidthOrHeight(elem, dimension, extra);
				}
			},
			set: function(elem, value, extra) {
				var matches,
					styles = getStyles(elem),
					// Only read styles.position if the test has a chance to fail
					// to avoid forcing a reflow.
					scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",
					// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
					boxSizingNeeded = scrollboxSizeBuggy || extra,
					isBorderBox = boxSizingNeeded &&
					jQuery.css(elem, "boxSizing", false, styles) === "border-box",
					subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;
				// Account for unreliable border-box dimensions by comparing offset* to computed and
				// faking a content-box to get border and padding (gh-3699)
				if (isBorderBox && scrollboxSizeBuggy) {
					subtract -= Math.ceil(
						elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
						parseFloat(styles[dimension]) -
						boxModelAdjustment(elem, dimension, "border", false, styles) -
						0.5
					);
				}
				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) &&
					(matches[3] || "px") !== "px") {
					elem.style[dimension] = value;
					value = jQuery.css(elem, dimension);
				}
				return setPositiveNumber(elem, value, subtract);
			}
		};
	});
	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
		function(elem, computed) {
			if (computed) {
				return (parseFloat(curCSS(elem, "marginLeft")) ||
					elem.getBoundingClientRect().left -
					swap(elem, {
						marginLeft: 0
					}, function() {
						return elem.getBoundingClientRect().left;
					})
				) + "px";
			}
		}
	);
	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function(value) {
				var i = 0,
					expanded = {},
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [value];
				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] =
						parts[i] || parts[i - 2] || parts[0];
				}
				return expanded;
			}
		};
		if (prefix !== "margin") {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});
	jQuery.fn.extend({
		css: function(name, value) {
			return access(this, function(elem, name, value) {
				var styles, len,
					map = {},
					i = 0;
				if (Array.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;
					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}
					return map;
				}
				return value !== undefined ?
					jQuery.style(elem, name, value) :
					jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;
	Tween.prototype = {
		constructor: Tween,
		init: function(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function() {
			var hooks = Tween.propHooks[this.prop];
			return hooks && hooks.get ?
				hooks.get(this) :
				Tween.propHooks._default.get(this);
		},
		run: function(percent) {
			var eased,
				hooks = Tween.propHooks[this.prop];
			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;
			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}
			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};
	Tween.prototype.init.prototype = Tween.prototype;
	Tween.propHooks = {
		_default: {
			get: function(tween) {
				var result;
				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 ||
					tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function(tween) {
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (
						jQuery.cssHooks[tween.prop] ||
						tween.elem.style[finalPropName(tween.prop)] != null)) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};
	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};
	jQuery.easing = {
		linear: function(p) {
			return p;
		},
		swing: function(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};
	jQuery.fx = Tween.prototype.init;
	// Back compat <1.8 extension point
	jQuery.fx.step = {};
	var
		fxNow, inProgress,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	function schedule() {
		if (inProgress) {
			if (document.hidden === false && window.requestAnimationFrame) {
				window.requestAnimationFrame(schedule);
			} else {
				window.setTimeout(schedule, jQuery.fx.interval);
			}
			jQuery.fx.tick();
		}
	}
	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function() {
			fxNow = undefined;
		});
		return (fxNow = Date.now());
	}
	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
			i = 0,
			attrs = {
				height: type
			};
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}
		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}
		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
			collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
			index = 0,
			length = collection.length;
		for (; index < length; index++) {
			if ((tween = collection[index].call(animation, prop, value))) {
				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree(elem),
			dataShow = dataPriv.get(elem, "fxshow");
		// Queue-skipping animations hijack the fx hooks
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
			anim.always(function() {
				// Ensure the complete handler is called before this completes
				anim.always(function() {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}
		// Detect show/hide animations
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.test(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {
					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;
						// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
			}
		}
		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject(props);
		if (!propTween && jQuery.isEmptyObject(orig)) {
			return;
		}
		// Restrict "overflow" and "display" styles during box animations
		if (isBox && elem.nodeType === 1) {
			// Support: IE <=9 - 11, Edge 12 - 15
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY and Edge just mirrors
			// the overflowX value there.
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];
			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if (restoreDisplay == null) {
				restoreDisplay = dataPriv.get(elem, "display");
			}
			display = jQuery.css(elem, "display");
			if (display === "none") {
				if (restoreDisplay) {
					display = restoreDisplay;
				} else {
					// Get nonempty value(s) by temporarily forcing visibility
					showHide([elem], true);
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css(elem, "display");
					showHide([elem]);
				}
			}
			// Animate inline elements as inline-block
			if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
				if (jQuery.css(elem, "float") === "none") {
					// Restore the original display value at the end of pure show/hide animations
					if (!propTween) {
						anim.done(function() {
							style.display = restoreDisplay;
						});
						if (restoreDisplay == null) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}
		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}
		// Implement show/hide animations
		propTween = false;
		for (prop in orig) {
			// General show/hide setup for this element animation
			if (!propTween) {
				if (dataShow) {
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(elem, "fxshow", {
						display: restoreDisplay
					});
				}
				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if (toggle) {
					dataShow.hidden = !hidden;
				}
				// Show elements before animating them
				if (hidden) {
					showHide([elem], true);
				}
				/* eslint-disable no-loop-func */
				anim.done(function() {
					/* eslint-enable no-loop-func */
					// The final step of a "hide" animation is actually hiding the element
					if (!hidden) {
						showHide([elem]);
					}
					dataPriv.remove(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
			}
			// Per-property setup
			propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
			if (!(prop in dataShow)) {
				dataShow[prop] = propTween.start;
				if (hidden) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;
		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (Array.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}
			if (index !== name) {
				props[name] = value;
				delete props[index];
			}
			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always(function() {
				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if (stopped) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
				for (; index < length; index++) {
					animation.tweens[index].run(percent);
				}
				deferred.notifyWith(elem, [animation, percent, remaining]);
				// If there's more to do, yield
				if (percent < 1 && length) {
					return remaining;
				}
				// If this was an empty animation, synthesize a final progress notification
				if (!length) {
					deferred.notifyWith(elem, [animation, 1, 0]);
				}
				// Resolve the animation and report its conclusion
				deferred.resolveWith(elem, [animation]);
				return false;
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend({}, properties),
				opts: jQuery.extend(true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function(prop, end) {
					var tween = jQuery.Tween(elem, animation.opts, prop, end,
						animation.opts.specialEasing[prop] || animation.opts.easing);
					animation.tweens.push(tween);
					return tween;
				},
				stop: function(gotoEnd) {
					var index = 0,
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if (stopped) {
						return this;
					}
					stopped = true;
					for (; index < length; index++) {
						animation.tweens[index].run(1);
					}
					// Resolve when we played the last frame; otherwise, reject
					if (gotoEnd) {
						deferred.notifyWith(elem, [animation, 1, 0]);
						deferred.resolveWith(elem, [animation, gotoEnd]);
					} else {
						deferred.rejectWith(elem, [animation, gotoEnd]);
					}
					return this;
				}
			}),
			props = animation.props;
		propFilter(props, animation.opts.specialEasing);
		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
						result.stop.bind(result);
				}
				return result;
			}
		}
		jQuery.map(props, createTween, animation);
		if (isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}
		// Attach callbacks from options
		animation
			.progress(animation.opts.progress)
			.done(animation.opts.done, animation.opts.complete)
			.fail(animation.opts.fail)
			.always(animation.opts.always);
		jQuery.fx.timer(
			jQuery.extend(tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);
		return animation;
	}
	jQuery.Animation = jQuery.extend(Animation, {
		tweeners: {
			"*": [function(prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},
		tweener: function(props, callback) {
			if (isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnothtmlwhite);
			}
			var prop,
				index = 0,
				length = props.length;
			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},
		prefilters: [defaultPrefilter],
		prefilter: function(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});
	jQuery.speed = function(speed, easing, fn) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing ||
				isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !isFunction(easing) && easing
		};
		// Go to the end state if fx are off
		if (jQuery.fx.off) {
			opt.duration = 0;
		} else {
			if (typeof opt.duration !== "number") {
				if (opt.duration in jQuery.fx.speeds) {
					opt.duration = jQuery.fx.speeds[opt.duration];
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}
		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}
		// Queueing
		opt.old = opt.complete;
		opt.complete = function() {
			if (isFunction(opt.old)) {
				opt.old.call(this);
			}
			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};
		return opt;
	};
	jQuery.fn.extend({
		fadeTo: function(speed, to, easing, callback) {
			// Show any hidden elements after setting opacity to 0
			return this.filter(isHiddenWithinTree).css("opacity", 0).show()
				// Animate to the value specified
				.end().animate({
					opacity: to
				}, speed, easing, callback);
		},
		animate: function(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
				optall = jQuery.speed(speed, easing, callback),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation(this, jQuery.extend({}, prop), optall);
					// Empty animations, or finishing resolves immediately
					if (empty || dataPriv.get(this, "finish")) {
						anim.stop(true);
					}
				};
			doAnimation.finish = doAnimation;
			return empty || optall.queue === false ?
				this.each(doAnimation) :
				this.queue(optall.queue, doAnimation);
		},
		stop: function(type, clearQueue, gotoEnd) {
			var stopQueue = function(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};
			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue) {
				this.queue(type || "fx", []);
			}
			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get(this);
				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}
				for (index = timers.length; index--;) {
					if (timers[index].elem === this &&
						(type == null || timers[index].queue === type)) {
						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function(type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = dataPriv.get(this),
					queue = data[type + "queue"],
					hooks = data[type + "queueHooks"],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
				// Enable finishing flag on private data
				data.finish = true;
				// Empty the queue first
				jQuery.queue(this, type, []);
				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}
				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}
				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}
				// Turn off finishing flag
				delete data.finish;
			});
		}
	});
	jQuery.each(["toggle", "show", "hide"], function(_i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function(speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply(this, arguments) :
				this.animate(genFx(name, true), speed, easing, callback);
		};
	});
	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(name, props) {
		jQuery.fn[name] = function(speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
		fxNow = Date.now();
		for (; i < timers.length; i++) {
			timer = timers[i];
			// Run the timer and safely remove it when done (allowing for external removal)
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}
		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	jQuery.fx.timer = function(timer) {
		jQuery.timers.push(timer);
		jQuery.fx.start();
	};
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if (inProgress) {
			return;
		}
		inProgress = true;
		schedule();
	};
	jQuery.fx.stop = function() {
		inProgress = null;
	};
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};
	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function(time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";
		return this.queue(type, function(next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function() {
				window.clearTimeout(timeout);
			};
		});
	};
	(function() {
		var input = document.createElement("input"),
			select = document.createElement("select"),
			opt = select.appendChild(document.createElement("option"));
		input.type = "checkbox";
		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();
	var boolHook,
		attrHandle = jQuery.expr.attrHandle;
	jQuery.fn.extend({
		attr: function(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},
		removeAttr: function(name) {
			return this.each(function() {
				jQuery.removeAttr(this, name);
			});
		}
	});
	jQuery.extend({
		attr: function(elem, name, value) {
			var ret, hooks,
				nType = elem.nodeType;
			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}
			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}
			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				hooks = jQuery.attrHooks[name.toLowerCase()] ||
					(jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}
			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}
				if (hooks && "set" in hooks &&
					(ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}
				elem.setAttribute(name, value + "");
				return value;
			}
			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}
			ret = jQuery.find.attr(elem, name);
			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},
		attrHooks: {
			type: {
				set: function(elem, value) {
					if (!support.radioValue && value === "radio" &&
						nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},
		removeAttr: function(elem, value) {
			var name,
				i = 0,
				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match(rnothtmlwhite);
			if (attrNames && elem.nodeType === 1) {
				while ((name = attrNames[i++])) {
					elem.removeAttribute(name);
				}
			}
		}
	});
	// Hooks for boolean attributes
	boolHook = {
		set: function(elem, value, name) {
			if (value === false) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};
	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;
		attrHandle[name] = function(elem, name, isXML) {
			var ret, handle,
				lowercaseName = name.toLowerCase();
			if (!isXML) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[lowercaseName];
				attrHandle[lowercaseName] = ret;
				ret = getter(elem, name, isXML) != null ?
					lowercaseName :
					null;
				attrHandle[lowercaseName] = handle;
			}
			return ret;
		};
	});
	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;
	jQuery.fn.extend({
		prop: function(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},
		removeProp: function(name) {
			return this.each(function() {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});
	jQuery.extend({
		prop: function(elem, name, value) {
			var ret, hooks,
				nType = elem.nodeType;
			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}
			if (value !== undefined) {
				if (hooks && "set" in hooks &&
					(ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}
				return (elem[name] = value);
			}
			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}
			return elem[name];
		},
		propHooks: {
			tabIndex: {
				get: function(elem) {
					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");
					if (tabindex) {
						return parseInt(tabindex, 10);
					}
					if (
						rfocusable.test(elem.nodeName) ||
						rclickable.test(elem.nodeName) &&
						elem.href
					) {
						return 0;
					}
					return -1;
				}
			}
		},
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});
	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function(elem) {
				/* eslint no-unused-expressions: "off" */
				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function(elem) {
				/* eslint no-unused-expressions: "off" */
				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;
					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}
	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[this.toLowerCase()] = this;
	});
	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse(value) {
		var tokens = value.match(rnothtmlwhite) || [];
		return tokens.join(" ");
	}

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	function classesToArray(value) {
		if (Array.isArray(value)) {
			return value;
		}
		if (typeof value === "string") {
			return value.match(rnothtmlwhite) || [];
		}
		return [];
	}
	jQuery.fn.extend({
		addClass: function(value) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
			if (isFunction(value)) {
				return this.each(function(j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}
			classes = classesToArray(value);
			if (classes.length) {
				while ((elem = this[i++])) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}
						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}
			return this;
		},
		removeClass: function(value) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
			if (isFunction(value)) {
				return this.each(function(j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}
			if (!arguments.length) {
				return this.attr("class", "");
			}
			classes = classesToArray(value);
			if (classes.length) {
				while ((elem = this[i++])) {
					curValue = getClass(elem);
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}
						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}
			return this;
		},
		toggleClass: function(value, stateVal) {
			var type = typeof value,
				isValidValue = type === "string" || Array.isArray(value);
			if (typeof stateVal === "boolean" && isValidValue) {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}
			if (isFunction(value)) {
				return this.each(function(i) {
					jQuery(this).toggleClass(
						value.call(this, i, getClass(this), stateVal),
						stateVal
					);
				});
			}
			return this.each(function() {
				var className, i, self, classNames;
				if (isValidValue) {
					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = classesToArray(value);
					while ((className = classNames[i++])) {
						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}
					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {
						// Store className if set
						dataPriv.set(this, "__className__", className);
					}
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class",
							className || value === false ?
							"" :
							dataPriv.get(this, "__className__") || ""
						);
					}
				}
			});
		},
		hasClass: function(selector) {
			var className, elem,
				i = 0;
			className = " " + selector + " ";
			while ((elem = this[i++])) {
				if (elem.nodeType === 1 &&
					(" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
					return true;
				}
			}
			return false;
		}
	});
	var rreturn = /\r/g;
	jQuery.fn.extend({
		val: function(value) {
			var hooks, ret, valueIsFunction,
				elem = this[0];
			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] ||
						jQuery.valHooks[elem.nodeName.toLowerCase()];
					if (hooks &&
						"get" in hooks &&
						(ret = hooks.get(elem, "value")) !== undefined
					) {
						return ret;
					}
					ret = elem.value;
					// Handle most common string cases
					if (typeof ret === "string") {
						return ret.replace(rreturn, "");
					}
					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}
				return;
			}
			valueIsFunction = isFunction(value);
			return this.each(function(i) {
				var val;
				if (this.nodeType !== 1) {
					return;
				}
				if (valueIsFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}
				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (Array.isArray(val)) {
					val = jQuery.map(val, function(value) {
						return value == null ? "" : value + "";
					});
				}
				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});
	jQuery.extend({
		valHooks: {
			option: {
				get: function(elem) {
					var val = jQuery.find.attr(elem, "value");
					return val != null ?
						val :
						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse(jQuery.text(elem));
				}
			},
			select: {
				get: function(elem) {
					var value, option, i,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length;
					if (index < 0) {
						i = max;
					} else {
						i = one ? index : 0;
					}
					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];
						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) &&
							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							(!option.parentNode.disabled ||
								!nodeName(option.parentNode, "optgroup"))) {
							// Get the specific value for the option
							value = jQuery(option).val();
							// We don't need an array for one selects
							if (one) {
								return value;
							}
							// Multi-Selects return an array
							values.push(value);
						}
					}
					return values;
				},
				set: function(elem, value) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray(value),
						i = options.length;
					while (i--) {
						option = options[i];
						/* eslint-disable no-cond-assign */
						if (option.selected =
							jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1
						) {
							optionSet = true;
						}
						/* eslint-enable no-cond-assign */
					}
					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});
	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function() {
		jQuery.valHooks[this] = {
			set: function(elem, value) {
				if (Array.isArray(value)) {
					return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function(elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});
	// Return jQuery for attributes-only inclusion
	support.focusin = "onfocusin" in window;
	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		stopPropagationCallback = function(e) {
			e.stopPropagation();
		};
	jQuery.extend(jQuery.event, {
		trigger: function(event, data, elem, onlyHandlers) {
			var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
				eventPath = [elem || document],
				type = hasOwn.call(event, "type") ? event.type : event,
				namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
			cur = lastElement = tmp = elem = elem || document;
			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}
			if (type.indexOf(".") > -1) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ?
				event :
				new jQuery.Event(type, typeof event === "object" && event);
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ?
				new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
				null;
			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] :
				jQuery.makeArray(data, [event]);
			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}
			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
				lastElement = cur;
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
				// jQuery handler
				handle = (dataPriv.get(cur, "events") || Object.create(null))[event.type] &&
					dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}
				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {
				if ((!special._default ||
						special._default.apply(eventPath.pop(), data) === false) &&
					acceptData(elem)) {
					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];
						if (tmp) {
							elem[ontype] = null;
						}
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						if (event.isPropagationStopped()) {
							lastElement.addEventListener(type, stopPropagationCallback);
						}
						elem[type]();
						if (event.isPropagationStopped()) {
							lastElement.removeEventListener(type, stopPropagationCallback);
						}
						jQuery.event.triggered = undefined;
						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}
			return event.result;
		},
		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function(type, elem, event) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event, {
					type: type,
					isSimulated: true
				}
			);
			jQuery.event.trigger(e, null, elem);
		}
	});
	jQuery.fn.extend({
		trigger: function(type, data) {
			return this.each(function() {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});
	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({
			focus: "focusin",
			blur: "focusout"
		}, function(orig, fix) {
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};
			jQuery.event.special[fix] = {
				setup: function() {
					// Handle: regular nodes (via `this.ownerDocument`), window
					// (via `this.document`) & document (via `this`).
					var doc = this.ownerDocument || this.document || this,
						attaches = dataPriv.access(doc, fix);
					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function() {
					var doc = this.ownerDocument || this.document || this,
						attaches = dataPriv.access(doc, fix) - 1;
					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;
	var nonce = {
		guid: Date.now()
	};
	var rquery = (/\?/);
	// Cross-browser xml parsing
	jQuery.parseXML = function(data) {
		var xml, parserErrorElem;
		if (!data || typeof data !== "string") {
			return null;
		}
		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = (new window.DOMParser()).parseFromString(data, "text/xml");
		} catch (e) {}
		parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
		if (!xml || parserErrorElem) {
			jQuery.error("Invalid XML: " + (
				parserErrorElem ?
				jQuery.map(parserErrorElem.childNodes, function(el) {
					return el.textContent;
				}).join("\n") :
				data
			));
		}
		return xml;
	};
	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;
		if (Array.isArray(obj)) {
			// Serialize array item.
			jQuery.each(obj, function(i, v) {
				if (traditional || rbracket.test(prefix)) {
					// Treat each array item as a scalar.
					add(prefix, v);
				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
						v,
						traditional,
						add
					);
				}
			});
		} else if (!traditional && toType(obj) === "object") {
			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {
			// Serialize scalar item.
			add(prefix, obj);
		}
	}
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function(a, traditional) {
		var prefix,
			s = [],
			add = function(key, valueOrFunction) {
				// If value is a function, invoke it and use its return value
				var value = isFunction(valueOrFunction) ?
					valueOrFunction() :
					valueOrFunction;
				s[s.length] = encodeURIComponent(key) + "=" +
					encodeURIComponent(value == null ? "" : value);
			};
		if (a == null) {
			return "";
		}
		// If an array was passed in, assume that it is an array of form elements.
		if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
			// Serialize the form elements
			jQuery.each(a, function() {
				add(this.name, this.value);
			});
		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}
		// Return the resulting serialization
		return s.join("&");
	};
	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function() {
				var type = this.type;
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") &&
					rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
					(this.checked || !rcheckableType.test(type));
			}).map(function(_i, elem) {
				var val = jQuery(this).val();
				if (val == null) {
					return null;
				}
				if (Array.isArray(val)) {
					return jQuery.map(val, function(val) {
						return {
							name: elem.name,
							value: val.replace(rCRLF, "\r\n")
						};
					});
				}
				return {
					name: elem.name,
					value: val.replace(rCRLF, "\r\n")
				};
			}).get();
		}
	});
	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rantiCache = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		/* Prefilters

		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)

		 * 2) These are called:

		 *    - BEFORE asking for a transport

		 *    - AFTER param serialization (s.data is a string if s.processData is true)

		 * 3) key is the dataType

		 * 4) the catchall symbol "*" can be used

		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed

		 */
		prefilters = {},
		/* Transports bindings

		 * 1) key is the dataType

		 * 2) the catchall symbol "*" can be used

		 * 3) selection will start with transport dataType and THEN go to "*" if needed

		 */
		transports = {},
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat("*"),
		// Anchor tag for parsing the document origin
		originAnchor = document.createElement("a");
	originAnchor.href = location.href;
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {
		// dataTypeExpression is optional and defaults to "*"
		return function(dataTypeExpression, func) {
			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
			if (isFunction(func)) {
				// For each dataType in the dataTypeExpression
				while ((dataType = dataTypes[i++])) {
					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);
						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
		var inspected = {},
			seekingTransport = (structure === transports);

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[dataTypeOrTransport]) {
					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}
		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}
		return target;
	}
	/* Handles responses to an ajax request:

	 * - finds the right dataType (mediates between content-type and expected dataType)

	 * - returns the corresponding response

	 */
	function ajaxHandleResponses(s, jqXHR, responses) {
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}
		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}
		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {
			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}
	/* Chain conversions given the request and the original response

	 * Also sets the responseXXX fields on the jqXHR instance

	 */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}
		current = dataTypes.shift();
		// Convert to each sequential dataType
		while (current) {
			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}
			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}
			prev = current;
			current = dataTypes.shift();
			if (current) {
				// There's only work to do if current dataType is non-auto
				if (current === "*") {
					current = prev;
					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {
					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];
					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {
							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {
								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] ||
									converters["* " + tmp[0]];
								if (conv) {
									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];
										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}
					// Apply converter (if not an equivalence)
					if (conv !== true) {
						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}
		return {
			state: "success",
			data: response
		};
	}
	jQuery.extend({
		// Counter for holding the number of active queries
		active: 0,
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*

			timeout: 0,

			data: null,

			dataType: null,

			username: null,

			password: null,

			cache: null,

			throws: false,

			traditional: false,

			headers: {},

			*/
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
				// Convert anything to text
				"* text": String,
				// Text to html (true = no transformation)
				"text html": true,
				// Evaluate text as a json expression
				"text json": JSON.parse,
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function(target, settings) {
			return settings ?
				// Building a settings object
				ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
				// Extending ajaxSettings
				ajaxExtend(jQuery.ajaxSettings, target);
		},
		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),
		// Main method
		ajax: function(url, options) {
			// If url is an object, simulate pre-1.5 signature
			if (typeof url === "object") {
				options = url;
				url = undefined;
			}
			// Force options to be an object
			options = options || {};
			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Url cleanup var
				urlAnchor,
				// Request state (becomes false upon send and true upon completion)
				completed,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// uncached part of the url
				uncached,
				// Create the final options object
				s = jQuery.ajaxSetup({}, options),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
				(callbackContext.nodeType || callbackContext.jquery) ?
				jQuery(callbackContext) :
				jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,
					// Builds headers hashtable if needed
					getResponseHeader: function(key) {
						var match;
						if (completed) {
							if (!responseHeaders) {
								responseHeaders = {};
								while ((match = rheaders.exec(responseHeadersString))) {
									responseHeaders[match[1].toLowerCase() + " "] =
										(responseHeaders[match[1].toLowerCase() + " "] || [])
										.concat(match[2]);
								}
							}
							match = responseHeaders[key.toLowerCase() + " "];
						}
						return match == null ? null : match.join(", ");
					},
					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},
					// Caches the header
					setRequestHeader: function(name, value) {
						if (completed == null) {
							name = requestHeadersNames[name.toLowerCase()] =
								requestHeadersNames[name.toLowerCase()] || name;
							requestHeaders[name] = value;
						}
						return this;
					},
					// Overrides response content-type header
					overrideMimeType: function(type) {
						if (completed == null) {
							s.mimeType = type;
						}
						return this;
					},
					// Status-dependent callbacks
					statusCode: function(map) {
						var code;
						if (map) {
							if (completed) {
								// Execute the appropriate callbacks
								jqXHR.always(map[jqXHR.status]);
							} else {
								// Lazy-add the new callbacks in a way that preserves old ones
								for (code in map) {
									statusCode[code] = [statusCode[code], map[code]];
								}
							}
						}
						return this;
					},
					// Cancel the request
					abort: function(statusText) {
						var finalText = statusText || strAbort;
						if (transport) {
							transport.abort(finalText);
						}
						done(0, finalText);
						return this;
					}
				};
			// Attach deferreds
			deferred.promise(jqXHR);
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "")
				.replace(rprotocol, location.protocol + "//");
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
			// Extract dataTypes list
			s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");
				// Support: IE <=8 - 11, Edge 12 - 15
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;
					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}
			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}
			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
			// If request was aborted inside a prefilter, stop there
			if (completed) {
				return jqXHR;
			}
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}
			// Uppercase the type
			s.type = s.type.toUpperCase();
			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace(rhash, "");
			// More options handling for requests with no content
			if (!s.hasContent) {
				// Remember the hash so we can put it back
				uncached = s.url.slice(cacheURL.length);
				// If data is available and should be processed, append data to url
				if (s.data && (s.processData || typeof s.data === "string")) {
					cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
				// Add or update anti-cache param if needed
				if (s.cache === false) {
					cacheURL = cacheURL.replace(rantiCache, "$1");
					uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce.guid++) +
						uncached;
				}
				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;
				// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if (s.data && s.processData &&
				(s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
				s.data = s.data.replace(r20, "+");
			}
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}
			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
				s.accepts[s.dataTypes[0]] +
				(s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
				s.accepts["*"]
			);
			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}
			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend &&
				(s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
				// Abort if not done already and return
				return jqXHR.abort();
			}
			// Aborting is no longer a cancellation
			strAbort = "abort";
			// Install callbacks on deferreds
			completeDeferred.add(s.complete);
			jqXHR.done(s.success);
			jqXHR.fail(s.error);
			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;
				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}
				// If request was aborted inside ajaxSend, stop there
				if (completed) {
					return jqXHR;
				}
				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout);
				}
				try {
					completed = false;
					transport.send(requestHeaders, done);
				} catch (e) {
					// Rethrow post-completion exceptions
					if (completed) {
						throw e;
					}
					// Propagate others as results
					done(-1, e);
				}
			}
			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
				// Ignore repeat invocations
				if (completed) {
					return;
				}
				completed = true;
				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
				// Cache response headers
				responseHeadersString = headers || "";
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}
				// Use a noop converter for missing script but not if jsonp
				if (!isSuccess &&
					jQuery.inArray("script", s.dataTypes) > -1 &&
					jQuery.inArray("json", s.dataTypes) < 0) {
					s.converters["text script"] = function() {};
				}
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);
				// If successful, handle type chaining
				if (isSuccess) {
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}
					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";
						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";
						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";
				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}
				// Status-dependent callbacks
				jqXHR.statusCode(statusCode);
				statusCode = undefined;
				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
						[jqXHR, s, isSuccess ? success : error]);
				}
				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
					// Handle the global AJAX counter
					if (!(--jQuery.active)) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}
			return jqXHR;
		},
		getJSON: function(url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},
		getScript: function(url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});
	jQuery.each(["get", "post"], function(_i, method) {
		jQuery[method] = function(url, data, callback, type) {
			// Shift arguments if data argument was omitted
			if (isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});
	jQuery.ajaxPrefilter(function(s) {
		var i;
		for (i in s.headers) {
			if (i.toLowerCase() === "content-type") {
				s.contentType = s.headers[i] || "";
			}
		}
	});
	jQuery._evalUrl = function(url, options, doc) {
		return jQuery.ajax({
			url: url,
			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			// Only evaluate the response if it is successful (gh-4126)
			// dataFilter is not invoked for failure responses, so using it instead
			// of the default converter is kludgy but it works.
			converters: {
				"text script": function() {}
			},
			dataFilter: function(response) {
				jQuery.globalEval(response, options, doc);
			}
		});
	};
	jQuery.fn.extend({
		wrapAll: function(html) {
			var wrap;
			if (this[0]) {
				if (isFunction(html)) {
					html = html.call(this[0]);
				}
				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}
				wrap.map(function() {
					var elem = this;
					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}
					return elem;
				}).append(this);
			}
			return this;
		},
		wrapInner: function(html) {
			if (isFunction(html)) {
				return this.each(function(i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}
			return this.each(function() {
				var self = jQuery(this),
					contents = self.contents();
				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},
		wrap: function(html) {
			var htmlIsFunction = isFunction(html);
			return this.each(function(i) {
				jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
			});
		},
		unwrap: function(selector) {
			this.parent(selector).not("body").each(function() {
				jQuery(this).replaceWith(this.childNodes);
			});
			return this;
		}
	});
	jQuery.expr.pseudos.hidden = function(elem) {
		return !jQuery.expr.pseudos.visible(elem);
	};
	jQuery.expr.pseudos.visible = function(elem) {
		return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
	};
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};
	var xhrSuccessStatus = {
			// File protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
	support.ajax = xhrSupported = !!xhrSupported;
	jQuery.ajaxTransport(function(options) {
		var callback, errorCallback;
		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function(headers, complete) {
					var i,
						xhr = options.xhr();
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);
					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}
					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}
					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}
					// Callback
					callback = function(type) {
						return function() {
							if (callback) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;
								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {
									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(
											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[xhr.status] || xhr.status,
										xhr.statusText,
										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										(xhr.responseType || "text") !== "text" ||
										typeof xhr.responseText !== "string" ? {
											binary: xhr.response
										} : {
											text: xhr.responseText
										},
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {
							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function() {
									if (callback) {
										errorCallback();
									}
								});
							}
						};
					}
					// Create the abort callback
					callback = callback("abort");
					try {
						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (callback) {
							throw e;
						}
					}
				},
				abort: function() {
					if (callback) {
						callback();
					}
				}
			};
		}
	});
	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter(function(s) {
		if (s.crossDomain) {
			s.contents.script = false;
		}
	});
	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function(text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function(s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});
	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function(s) {
		// This transport only deals with cross domain or forced-by-attrs requests
		if (s.crossDomain || s.scriptAttrs) {
			var script, callback;
			return {
				send: function(_, complete) {
					script = jQuery("<script>")
						.attr(s.scriptAttrs || {})
						.prop({
							charset: s.scriptCharset,
							src: s.url
						})
						.on("load error", callback = function(evt) {
							script.remove();
							callback = null;
							if (evt) {
								complete(evt.type === "error" ? 404 : 200, evt.type);
							}
						});
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function() {
					if (callback) {
						callback();
					}
				}
			};
		}
	});
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce.guid++));
			this[callback] = true;
			return callback;
		}
	});
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
				"url" :
				typeof s.data === "string" &&
				(s.contentType || "")
				.indexOf("application/x-www-form-urlencoded") === 0 &&
				rjsonp.test(s.data) && "data"
			);
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ?
				s.jsonpCallback() :
				s.jsonpCallback;
			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}
			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};
			// Force json dataType
			s.dataTypes[0] = "json";
			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function() {
				responseContainer = arguments;
			};
			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);
					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}
				// Save back as free
				if (s[callbackName]) {
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}
				// Call if it was a function and we have a response
				if (responseContainer && isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}
				responseContainer = overwritten = undefined;
			});
			// Delegate to script
			return "script";
		}
	});
	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = (function() {
		var body = document.implementation.createHTMLDocument("").body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	})();
	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function(data, context, keepScripts) {
		if (typeof data !== "string") {
			return [];
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}
		var base, parsed, scripts;
		if (!context) {
			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if (support.createHTMLDocument) {
				context = document.implementation.createHTMLDocument("");
				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement("base");
				base.href = document.location.href;
				context.head.appendChild(base);
			} else {
				context = document;
			}
		}
		parsed = rsingleTag.exec(data);
		scripts = !keepScripts && [];
		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}
		parsed = buildFragment([data], context, scripts);
		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}
		return jQuery.merge([], parsed.childNodes);
	};
	/**

	 * Load a url into a page

	 */
	jQuery.fn.load = function(url, params, callback) {
		var selector, type, response,
			self = this,
			off = url.indexOf(" ");
		if (off > -1) {
			selector = stripAndCollapse(url.slice(off));
			url = url.slice(0, off);
		}
		// If it's a function
		if (isFunction(params)) {
			// We assume that it's the callback
			callback = params;
			params = undefined;
			// Otherwise, build a param string
		} else if (params && typeof params === "object") {
			type = "POST";
		}
		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,
				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function(responseText) {
				// Save response for use in complete callback
				response = arguments;
				self.html(selector ?
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
					// Otherwise use the full result
					responseText);
				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function(jqXHR, status) {
				self.each(function() {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}
		return this;
	};
	jQuery.expr.pseudos.animated = function(elem) {
		return jQuery.grep(jQuery.timers, function(fn) {
			return elem === fn.elem;
		}).length;
	};
	jQuery.offset = {
		setOffset: function(elem, options, i) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css(elem, "position"),
				curElem = jQuery(elem),
				props = {};
			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}
			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") &&
				(curCSSTop + curCSSLeft).indexOf("auto") > -1;
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}
			if (isFunction(options)) {
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}
			if (options.top != null) {
				props.top = (options.top - curOffset.top) + curTop;
			}
			if (options.left != null) {
				props.left = (options.left - curOffset.left) + curLeft;
			}
			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};
	jQuery.fn.extend({
		// offset() relates an element's border box to the document origin
		offset: function(options) {
			// Preserve chaining for setter
			if (arguments.length) {
				return options === undefined ?
					this :
					this.each(function(i) {
						jQuery.offset.setOffset(this, options, i);
					});
			}
			var rect, win,
				elem = this[0];
			if (!elem) {
				return;
			}
			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if (!elem.getClientRects().length) {
				return {
					top: 0,
					left: 0
				};
			}
			// Get document-relative position by adding viewport scroll to viewport-relative gBCR
			rect = elem.getBoundingClientRect();
			win = elem.ownerDocument.defaultView;
			return {
				top: rect.top + win.pageYOffset,
				left: rect.left + win.pageXOffset
			};
		},
		// position() relates an element's margin box to its offset parent's padding box
		// This corresponds to the behavior of CSS absolute positioning
		position: function() {
			if (!this[0]) {
				return;
			}
			var offsetParent, offset, doc,
				elem = this[0],
				parentOffset = {
					top: 0,
					left: 0
				};
			// position:fixed elements are offset from the viewport, which itself always has zero offset
			if (jQuery.css(elem, "position") === "fixed") {
				// Assume position:fixed implies availability of getBoundingClientRect
				offset = elem.getBoundingClientRect();
			} else {
				offset = this.offset();
				// Account for the *real* offset parent, which can be the document or its root element
				// when a statically positioned element is identified
				doc = elem.ownerDocument;
				offsetParent = elem.offsetParent || doc.documentElement;
				while (offsetParent &&
					(offsetParent === doc.body || offsetParent === doc.documentElement) &&
					jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.parentNode;
				}
				if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
					// Incorporate borders into its offset, since they are outside its content origin
					parentOffset = jQuery(offsetParent).offset();
					parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
					parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
				}
			}
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},
		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent;
				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}
				return offsetParent || documentElement;
			});
		}
	});
	// Create scrollLeft and scrollTop methods
	jQuery.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(method, prop) {
		var top = "pageYOffset" === prop;
		jQuery.fn[method] = function(val) {
			return access(this, function(elem, method, val) {
				// Coalesce documents and windows
				var win;
				if (isWindow(elem)) {
					win = elem;
				} else if (elem.nodeType === 9) {
					win = elem.defaultView;
				}
				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}
				if (win) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});
	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function(_i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
			function(elem, computed) {
				if (computed) {
					computed = curCSS(elem, prop);
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test(computed) ?
						jQuery(elem).position()[prop] + "px" :
						computed;
				}
			}
		);
	});
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({
		Height: "height",
		Width: "width"
	}, function(name, type) {
		jQuery.each({
			padding: "inner" + name,
			content: type,
			"": "outer" + name
		}, function(defaultExtra, funcName) {
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function(margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
					extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
				return access(this, function(elem, type, value) {
					var doc;
					if (isWindow(elem)) {
						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf("outer") === 0 ?
							elem["inner" + name] :
							elem.document.documentElement["client" + name];
					}
					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body["scroll" + name], doc["scroll" + name],
							elem.body["offset" + name], doc["offset" + name],
							doc["client" + name]
						);
					}
					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css(elem, type, extra) :
						// Set width or height on the element
						jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable);
			};
		});
	});
	jQuery.each([
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function(_i, type) {
		jQuery.fn[type] = function(fn) {
			return this.on(type, fn);
		};
	});
	jQuery.fn.extend({
		bind: function(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function(types, fn) {
			return this.off(types, null, fn);
		},
		delegate: function(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function(selector, types, fn) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off(selector, "**") :
				this.off(types, selector || "**", fn);
		},
		hover: function(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});
	jQuery.each(
		("blur focus focusin focusout resize scroll click dblclick " +
			"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
			"change select submit keydown keypress keyup contextmenu").split(" "),
		function(_i, name) {
			// Handle event binding
			jQuery.fn[name] = function(data, fn) {
				return arguments.length > 0 ?
					this.on(name, null, data, fn) :
					this.trigger(name);
			};
		}
	);
	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	// Bind a function to a context, optionally partially applying any
	// arguments.
	// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
	// However, it is not slated for removal any time soon
	jQuery.proxy = function(fn, context) {
		var tmp, args, proxy;
		if (typeof context === "string") {
			tmp = fn[context];
			context = fn;
			fn = tmp;
		}
		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if (!isFunction(fn)) {
			return undefined;
		}
		// Simulated bind
		args = slice.call(arguments, 2);
		proxy = function() {
			return fn.apply(context || this, args.concat(slice.call(arguments)));
		};
		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;
		return proxy;
	};
	jQuery.holdReady = function(hold) {
		if (hold) {
			jQuery.readyWait++;
		} else {
			jQuery.ready(true);
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;
	jQuery.isFunction = isFunction;
	jQuery.isWindow = isWindow;
	jQuery.camelCase = camelCase;
	jQuery.type = toType;
	jQuery.now = Date.now;
	jQuery.isNumeric = function(obj) {
		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type(obj);
		return (type === "number" || type === "string") &&
			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN(obj - parseFloat(obj));
	};
	jQuery.trim = function(text) {
		return text == null ?
			"" :
			(text + "").replace(rtrim, "");
	};
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	if (typeof define === "function" && define.amd) {
		define("jquery", [], function() {
			return jQuery;
		});
	}
	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
		// Map over the $ in case of overwrite
		_$ = window.$;
	jQuery.noConflict = function(deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}
		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}
		return jQuery;
	};
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (typeof noGlobal === "undefined") {
		window.jQuery = window.$ = jQuery;
	}
	return jQuery;
});
! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.device = t.device || {})
}(this, function(t) {
	function e(t, e) {
		return e = {
			exports: {}
		}, t(e, e.exports), e.exports
	}

	function i(t) {
		var e = typeof t;
		return null != t && ("object" == e || "function" == e)
	}

	function n(t) {
		var e = A.call(t, L),
			i = t[L];
		try {
			t[L] = void 0;
			var n = !0
		} catch (t) {}
		var o = E.call(t);
		return n && (e ? t[L] = i : delete t[L]), o
	}

	function o(t) {
		return D.call(t)
	}

	function s(t) {
		return null == t ? void 0 === t ? $ : S : U && U in Object(t) ? M(t) : W(t)
	}

	function a(t) {
		return null != t && "object" == typeof t
	}

	function r(t) {
		return "symbol" == typeof t || z(t) && B(t) == R
	}

	function c(t) {
		if ("number" == typeof t) return t;
		if (F(t)) return H;
		if (w(t)) {
			var e = "function" == typeof t.valueOf ? t.valueOf() : t;
			t = w(e) ? e + "" : e
		}
		if ("string" != typeof t) return 0 === t ? t : +t;
		t = t.replace(I, "");
		var i = G.test(t);
		return i || J.test(t) ? K(t.slice(2), i ? 2 : 8) : q.test(t) ? H : +t
	}

	function h(t, e, i) {
		function n(e) {
			var i = l,
				n = f;
			return l = f = void 0, v = e, m = t.apply(n, i)
		}

		function o(t) {
			return v = t, b = setTimeout(r, e), y ? n(t) : m
		}

		function s(t) {
			var i = t - g,
				n = t - v,
				o = e - i;
			return C ? Y(o, p - n) : o
		}

		function a(t) {
			var i = t - g,
				n = t - v;
			return void 0 === g || i >= e || i < 0 || C && n >= p
		}

		function r() {
			var t = O();
			if (a(t)) return c(t);
			b = setTimeout(r, s(t))
		}

		function c(t) {
			return b = void 0, x && l ? n(t) : (l = f = void 0, m)
		}

		function h() {
			void 0 !== b && clearTimeout(b), v = 0, l = g = f = b = void 0
		}

		function d() {
			return void 0 === b ? m : c(O())
		}

		function u() {
			var t = O(),
				i = a(t);
			if (l = arguments, f = this, g = t, i) {
				if (void 0 === b) return o(g);
				if (C) return b = setTimeout(r, e), n(g)
			}
			return void 0 === b && (b = setTimeout(r, e)), m
		}
		var l, f, p, m, b, g, v = 0,
			y = !1,
			C = !1,
			x = !0;
		if ("function" != typeof t) throw new TypeError(V);
		return e = Q(e) || 0, w(i) && (y = !!i.leading, C = "maxWait" in i, p = C ? X(Q(i.maxWait) || 0, e) : p, x = "trailing" in i ? !!i.trailing : x), u.cancel = h, u.flush = d, u
	}

	function d(t, e, i) {
		var n = !0,
			o = !0;
		if ("function" != typeof t) throw new TypeError(tt);
		return w(i) && (n = "leading" in i ? !!i.leading : n, o = "trailing" in i ? !!i.trailing : o), Z(t, e, {
			leading: n,
			maxWait: e,
			trailing: o
		})
	}
	var u = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
		l = e(function(t, e) {
			"use strict";

			function i(t, e) {
				return t.classList ? !!e && t.classList.contains(e) : -1 !== (" " + t.className + " ").indexOf(" " + e + " ")
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e.default = i, t.exports = e.default
		}),
		f = e(function(t, e) {
			"use strict";

			function i(t, e) {
				t.classList ? t.classList.add(e) : (0, n.default)(t) || (t.className = t.className + " " + e)
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e.default = i;
			var n = function(t) {
				return t && t.__esModule ? t : {
					default: t
				}
			}(l);
			t.exports = e.default
		}),
		p = function(t, e) {
			t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\s)" + e + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "")
		},
		m = e(function(t, e) {
			"use strict";

			function i(t) {
				return t && t.__esModule ? t : {
					default: t
				}
			}
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e.hasClass = e.removeClass = e.addClass = void 0;
			var n = i(f),
				o = i(p),
				s = i(l);
			e.addClass = n.default, e.removeClass = o.default, e.hasClass = s.default, e.default = {
				addClass: n.default,
				removeClass: o.default,
				hasClass: s.default
			}
		}),
		b = m.removeClass,
		g = m.addClass,
		w = i,
		v = "object" == typeof u && u && u.Object === Object && u,
		y = v,
		C = "object" == typeof self && self && self.Object === Object && self,
		x = y || C || Function("return this")(),
		k = x,
		T = function() {
			return k.Date.now()
		},
		O = T,
		P = k.Symbol,
		j = P,
		N = Object.prototype,
		A = N.hasOwnProperty,
		E = N.toString,
		L = j ? j.toStringTag : void 0,
		M = n,
		_ = Object.prototype,
		D = _.toString,
		W = o,
		S = "[object Null]",
		$ = "[object Undefined]",
		U = j ? j.toStringTag : void 0,
		B = s,
		z = a,
		R = "[object Symbol]",
		F = r,
		H = NaN,
		I = /^\s+|\s+$/g,
		q = /^[-+]0x[0-9a-f]+$/i,
		G = /^0b[01]+$/i,
		J = /^0o[0-7]+$/i,
		K = parseInt,
		Q = c,
		V = "Expected a function",
		X = Math.max,
		Y = Math.min,
		Z = h,
		tt = "Expected a function",
		et = d,
		it = null,
		nt = [],
		ot = function() {
			it && (clearTimeout(it), it = null)
		},
		st = function(t) {
			if (t && nt.push(t), "undefined" != typeof document) {
				ot();
				for (var e = 0, i = nt.length; e < i; e++) nt[e](document);
				return void(nt.length = 0)
			}
			ot(), setTimeout(function() {
				st()
			}, 100)
		},
		at = function() {
			return "undefined" != typeof document ? window.navigator.userAgent : ""
		},
		rt = function(t) {
			return RegExp("msie" + (isNaN(t) ? "" : "\\s" + t), "i").test(navigator.userAgent)
		},
		ct = null,
		ht = function(t) {
			var e = this;
			void 0 === t && (t = null), this.state = {
				addedClasses: !1
			}, this.matchCache = {}, this.featureCache = {}, this.classes = "", this.setUserAgent(t), this.callback = null, "undefined" != typeof document || this.userAgent || st(function() {
				e.setUserAgent()
			})
		},
		dt = {
			features: {},
			deviceorientation: {},
			ie9: {},
			touchDevice: {},
			touch: {},
			ios: {},
			iphone: {},
			ipod: {},
			ipad: {},
			android: {},
			androidPhone: {},
			androidTablet: {},
			blackberry: {},
			blackberryPhone: {},
			blackberryTablet: {},
			windows: {},
			ie10: {},
			windowsPhone: {},
			windowsTablet: {},
			fxos: {},
			fxosPhone: {},
			fxosTablet: {},
			meego: {},
			cordova: {},
			nodeWebkit: {},
			mobile: {},
			tablet: {},
			desktop: {},
			television: {},
			portrait: {},
			landscape: {}
		},
		ut = {
			device: {}
		};
	ut.device.get = function() {
		return ct || (ct = new ht), ct
	}, ht.prototype.match = function(t) {
		return this.matchCache[t] || (this.matchCache[t] = this.userAgent.indexOf(t) > -1), this.matchCache[t]
	}, ht.prototype.feature = function(t) {
		return this.featureCache[t]
	}, ht.prototype.addFeature = function(t, e) {
		return this.featureCache[t] || (this.featureCache[t] = e), e
	}, ht.prototype.setUserAgent = function(t) {
		void 0 === t && (t = null), this.userAgent = t || this.userAgent || at(), this.userAgent && (ot(), this.matchCache = {}, this.userAgent = this.userAgent.toLowerCase())
	}, ht.prototype.onOrientationChange = function(t) {}, ht.prototype.getClasses = function() {
		return this.classes ? this.classes : (this.userAgent || this.setUserAgent(), this.landscape ? this.classes += "landscape " : this.classes += "portrait ", this.touch && (this.classes += "touch "), this.ios ? this.ipad ? this.classes += "ios ipad tablet " : this.iphone ? this.classes += "ios iphone mobile " : this.ipod && (this.classes += "ios ipod mobile ") : this.android ? this.androidTablet ? this.classes += "android tablet " : this.classes += "android mobile " : this.blackberry ? this.blackberryTablet ? this.classes += "blackberry tablet " : this.classes += "blackberry mobile " : this.windows ? this.windowsTablet ? this.classes += "windows tablet " : this.windowsPhone ? this.classes += "windows mobile " : this.classes += "windows desktop " : this.fxos ? this.fxosTablet ? this.classes += "fxos tablet " : this.classes += "fxos mobile " : this.meego ? this.classes += "meego mobile " : this.nodeWebkit ? this.classes += "node-webkit " : this.television ? this.classes += "television " : this.desktop && (this.classes += "desktop "), this.cordova && (this.classes += "cordova "), !this.desktop && this.deviceorientation && (this.classes += "deviceorientation "), this.classes = this.classes.slice(0, -1), this.classes)
	}, ht.prototype.addClasses = function(t) {
		if (!this.targetNode) {
			if (this.targetNode = t, t || "undefined" == typeof document || (this.targetNode = document.documentElement), !this.targetNode) return;
			this.userAgent || this.setUserAgent(), this.commitClasses(), this.addListener()
		}
	}, ht.prototype.addListener = function() {
		var t = this;
		if (!this.hasListener) {
			this.hasListener = !0, this.handleOrientation = this.handleOrientation.bind(this), this.onResize = et(this.handleOrientation, 200);
			var e = function() {
				setTimeout(function() {
					t.handleOrientation()
				}, 10)
			};
			"onorientationchange" in window ? window.addEventListener("orientationchange", e, !1) : window.addEventListener("resize", this.onResize, !1), e()
		}
	}, ht.prototype.handleOrientation = function() {
		this.onOrientationChange(this.landscape), this.targetNode && (this.landscape ? (b(this.targetNode, "portrait"), g(this.targetNode, "landscape")) : (b(this.targetNode, "landscape"), g(this.targetNode, "portrait")))
	}, ht.prototype.commitClasses = function() {
		!this.state.addedClasses && this.targetNode && (this.state.addedClasses = !0, this.targetNode.className += this.getClasses())
	}, dt.features.get = function() {
		return {
			wheelEvent: this.feature("wheelEvent") || this.addFeature("wheelEvent", "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll")
		}
	}, dt.deviceorientation.get = function() {
		return this.canOrientate || (this.canOrientate = "ondeviceorientation" in window || "deviceorientation" in window), !this.desktop && this.canOrientate
	}, dt.ie9.get = function() {
		return this.matchCache.ie9 || "undefined" != typeof document && (this.matchCache.ie9 = this.windows && rt(10)), this.matchCache.ie9 || !1
	}, dt.touchDevice.get = function() {
		return this.matchCache.touchDevice || "undefined" != typeof document && (this.matchCache.touchDevice = !(!navigator || !navigator.userAgent) && navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/)), this.matchCache.touchDevice || !1
	}, dt.touch.get = function() {
		return this.matchCache.touch || "undefined" != typeof document && (this.matchCache.touch = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || navigator && navigator.msMaxTouchPoints > 0 || navigator && navigator.maxTouchPoints), this.matchCache.touch || !1
	}, dt.ios.get = function() {
		return this.iphone || this.ipod || this.ipad
	}, dt.iphone.get = function() {
		return !this.windows && this.match("iphone")
	}, dt.ipod.get = function() {
		return this.match("ipod")
	}, dt.ipad.get = function() {
		return this.match("ipad")
	}, dt.android.get = function() {
		return !this.windows && this.match("android")
	}, dt.androidPhone.get = function() {
		return this.android && this.match("mobile")
	}, dt.androidTablet.get = function() {
		return this.android && !this.match("mobile")
	}, dt.blackberry.get = function() {
		return this.match("blackberry") || this.match("bb10") || this.match("rim")
	}, dt.blackberryPhone.get = function() {
		return this.blackberry && !this.match("tablet")
	}, dt.blackberryTablet.get = function() {
		return this.blackberry && this.match("tablet")
	}, dt.windows.get = function() {
		return this.match("windows")
	}, dt.ie10.get = function() {
		return this.matchCache.ie10 || "undefined" != typeof document && (this.matchCache.ie10 = this.windows && rt(10)), this.matchCache.ie10 || !1
	}, dt.windowsPhone.get = function() {
		return this.windows && this.match("phone")
	}, dt.windowsTablet.get = function() {
		return this.windows && this.match("touch") && !this.windowsPhone
	}, dt.fxos.get = function() {
		return (this.match("(mobile;") || this.match("(tablet;")) && this.match("; rv:")
	}, dt.fxosPhone.get = function() {
		return this.fxos && this.match("mobile")
	}, dt.fxosTablet.get = function() {
		return this.fxos && this.match("tablet")
	}, dt.meego.get = function() {
		return this.match("meego")
	}, dt.cordova.get = function() {
		return window.cordova && "file:" === location.protocol
	}, dt.nodeWebkit.get = function() {
		return "object" == typeof window.process
	}, dt.mobile.get = function() {
		return this.androidPhone || this.iphone || this.ipod || this.windowsPhone || this.blackberryPhone || this.fxosPhone || this.meego
	}, dt.tablet.get = function() {
		return this.ipad || this.androidTablet || this.blackberryTablet || this.windowsTablet || this.fxosTablet
	}, dt.desktop.get = function() {
		return !this.tablet && !this.mobile
	}, dt.television.get = function() {
		var t, e = this,
			i = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"];
		for (t = 0; t++ < i.length;)
			if (e.match(i[t])) return !0;
		return !1
	}, dt.portrait.get = function() {
		return "orientation" in window ? 0 === window.orientation : "undefined" != typeof window && window.innerHeight / window.innerWidth > 1
	}, dt.landscape.get = function() {
		return "undefined" != typeof window && ("orientation" in window ? 0 !== window.orientation : window.innerHeight / window.innerWidth < 1)
	}, Object.defineProperties(ht.prototype, dt), Object.defineProperties(ht, ut);
	var lt = new ht;
	t.device = lt, t.default = ht, Object.defineProperty(t, "__esModule", {
		value: !0
	})
});
//# sourceMappingURL=device.umd.js.map
/**

 * Swiper 9.3.2

 * Most modern mobile touch slider and framework with hardware accelerated transitions

 * https://swiperjs.com

 *

 * Copyright 2014-2023 Vladimir Kharlampidi

 *

 * Released under the MIT License

 *

 * Released on: May 15, 2023

 */
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Swiper = factory());
})(this, (function() {
	'use strict';
	/**

	 * SSR Window 4.0.2

	 * Better handling for window object in SSR environment

	 * https://github.com/nolimits4web/ssr-window

	 *

	 * Copyright 2021, Vladimir Kharlampidi

	 *

	 * Licensed under MIT

	 *

	 * Released on: December 13, 2021

	 */
	/* eslint-disable no-param-reassign */
	function isObject$1(obj) {
		return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
	}

	function extend$1(target, src) {
		if (target === void 0) {
			target = {};
		}
		if (src === void 0) {
			src = {};
		}
		Object.keys(src).forEach(key => {
			if (typeof target[key] === 'undefined') target[key] = src[key];
			else if (isObject$1(src[key]) && isObject$1(target[key]) && Object.keys(src[key]).length > 0) {
				extend$1(target[key], src[key]);
			}
		});
	}
	const ssrDocument = {
		body: {},
		addEventListener() {},
		removeEventListener() {},
		activeElement: {
			blur() {},
			nodeName: ''
		},
		querySelector() {
			return null;
		},
		querySelectorAll() {
			return [];
		},
		getElementById() {
			return null;
		},
		createEvent() {
			return {
				initEvent() {}
			};
		},
		createElement() {
			return {
				children: [],
				childNodes: [],
				style: {},
				setAttribute() {},
				getElementsByTagName() {
					return [];
				}
			};
		},
		createElementNS() {
			return {};
		},
		importNode() {
			return null;
		},
		location: {
			hash: '',
			host: '',
			hostname: '',
			href: '',
			origin: '',
			pathname: '',
			protocol: '',
			search: ''
		}
	};

	function getDocument() {
		const doc = typeof document !== 'undefined' ? document : {};
		extend$1(doc, ssrDocument);
		return doc;
	}
	const ssrWindow = {
		document: ssrDocument,
		navigator: {
			userAgent: ''
		},
		location: {
			hash: '',
			host: '',
			hostname: '',
			href: '',
			origin: '',
			pathname: '',
			protocol: '',
			search: ''
		},
		history: {
			replaceState() {},
			pushState() {},
			go() {},
			back() {}
		},
		CustomEvent: function CustomEvent() {
			return this;
		},
		addEventListener() {},
		removeEventListener() {},
		getComputedStyle() {
			return {
				getPropertyValue() {
					return '';
				}
			};
		},
		Image() {},
		Date() {},
		screen: {},
		setTimeout() {},
		clearTimeout() {},
		matchMedia() {
			return {};
		},
		requestAnimationFrame(callback) {
			if (typeof setTimeout === 'undefined') {
				callback();
				return null;
			}
			return setTimeout(callback, 0);
		},
		cancelAnimationFrame(id) {
			if (typeof setTimeout === 'undefined') {
				return;
			}
			clearTimeout(id);
		}
	};

	function getWindow() {
		const win = typeof window !== 'undefined' ? window : {};
		extend$1(win, ssrWindow);
		return win;
	}

	function deleteProps(obj) {
		const object = obj;
		Object.keys(object).forEach(key => {
			try {
				object[key] = null;
			} catch (e) {
				// no getter for object
			}
			try {
				delete object[key];
			} catch (e) {
				// something got wrong
			}
		});
	}

	function nextTick(callback, delay) {
		if (delay === void 0) {
			delay = 0;
		}
		return setTimeout(callback, delay);
	}

	function now() {
		return Date.now();
	}

	function getComputedStyle$1(el) {
		const window = getWindow();
		let style;
		if (window.getComputedStyle) {
			style = window.getComputedStyle(el, null);
		}
		if (!style && el.currentStyle) {
			style = el.currentStyle;
		}
		if (!style) {
			style = el.style;
		}
		return style;
	}

	function getTranslate(el, axis) {
		if (axis === void 0) {
			axis = 'x';
		}
		const window = getWindow();
		let matrix;
		let curTransform;
		let transformMatrix;
		const curStyle = getComputedStyle$1(el);
		if (window.WebKitCSSMatrix) {
			curTransform = curStyle.transform || curStyle.webkitTransform;
			if (curTransform.split(',').length > 6) {
				curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
			}
			// Some old versions of Webkit choke when 'none' is passed; pass
			// empty string instead in this case
			transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
		} else {
			transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
			matrix = transformMatrix.toString().split(',');
		}
		if (axis === 'x') {
			// Latest Chrome and webkits Fix
			if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
			// Crazy IE10 Matrix
			else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
			// Normal Browsers
			else curTransform = parseFloat(matrix[4]);
		}
		if (axis === 'y') {
			// Latest Chrome and webkits Fix
			if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
			// Crazy IE10 Matrix
			else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
			// Normal Browsers
			else curTransform = parseFloat(matrix[5]);
		}
		return curTransform || 0;
	}

	function isObject(o) {
		return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
	}

	function isNode(node) {
		// eslint-disable-next-line
		if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
			return node instanceof HTMLElement;
		}
		return node && (node.nodeType === 1 || node.nodeType === 11);
	}

	function extend() {
		const to = Object(arguments.length <= 0 ? undefined : arguments[0]);
		const noExtend = ['__proto__', 'constructor', 'prototype'];
		for (let i = 1; i < arguments.length; i += 1) {
			const nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];
			if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
				const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);
				for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
					const nextKey = keysArray[nextIndex];
					const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
							if (nextSource[nextKey].__swiper__) {
								to[nextKey] = nextSource[nextKey];
							} else {
								extend(to[nextKey], nextSource[nextKey]);
							}
						} else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
							to[nextKey] = {};
							if (nextSource[nextKey].__swiper__) {
								to[nextKey] = nextSource[nextKey];
							} else {
								extend(to[nextKey], nextSource[nextKey]);
							}
						} else {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
		}
		return to;
	}

	function setCSSProperty(el, varName, varValue) {
		el.style.setProperty(varName, varValue);
	}

	function animateCSSModeScroll(_ref) {
		let {
			swiper,
			targetPosition,
			side
		} = _ref;
		const window = getWindow();
		const startPosition = -swiper.translate;
		let startTime = null;
		let time;
		const duration = swiper.params.speed;
		swiper.wrapperEl.style.scrollSnapType = 'none';
		window.cancelAnimationFrame(swiper.cssModeFrameID);
		const dir = targetPosition > startPosition ? 'next' : 'prev';
		const isOutOfBound = (current, target) => {
			return dir === 'next' && current >= target || dir === 'prev' && current <= target;
		};
		const animate = () => {
			time = new Date().getTime();
			if (startTime === null) {
				startTime = time;
			}
			const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
			const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
			let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
			if (isOutOfBound(currentPosition, targetPosition)) {
				currentPosition = targetPosition;
			}
			swiper.wrapperEl.scrollTo({
				[side]: currentPosition
			});
			if (isOutOfBound(currentPosition, targetPosition)) {
				swiper.wrapperEl.style.overflow = 'hidden';
				swiper.wrapperEl.style.scrollSnapType = '';
				setTimeout(() => {
					swiper.wrapperEl.style.overflow = '';
					swiper.wrapperEl.scrollTo({
						[side]: currentPosition
					});
				});
				window.cancelAnimationFrame(swiper.cssModeFrameID);
				return;
			}
			swiper.cssModeFrameID = window.requestAnimationFrame(animate);
		};
		animate();
	}

	function getSlideTransformEl(slideEl) {
		return slideEl.querySelector('.swiper-slide-transform') || slideEl.shadowEl && slideEl.shadowEl.querySelector('.swiper-slide-transform') || slideEl;
	}

	function elementChildren(element, selector) {
		if (selector === void 0) {
			selector = '';
		}
		return [...element.children].filter(el => el.matches(selector));
	}

	function createElement(tag, classes) {
		if (classes === void 0) {
			classes = [];
		}
		const el = document.createElement(tag);
		el.classList.add(...(Array.isArray(classes) ? classes : [classes]));
		return el;
	}

	function elementOffset(el) {
		const window = getWindow();
		const document = getDocument();
		const box = el.getBoundingClientRect();
		const body = document.body;
		const clientTop = el.clientTop || body.clientTop || 0;
		const clientLeft = el.clientLeft || body.clientLeft || 0;
		const scrollTop = el === window ? window.scrollY : el.scrollTop;
		const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
		return {
			top: box.top + scrollTop - clientTop,
			left: box.left + scrollLeft - clientLeft
		};
	}

	function elementPrevAll(el, selector) {
		const prevEls = [];
		while (el.previousElementSibling) {
			const prev = el.previousElementSibling; // eslint-disable-line
			if (selector) {
				if (prev.matches(selector)) prevEls.push(prev);
			} else prevEls.push(prev);
			el = prev;
		}
		return prevEls;
	}

	function elementNextAll(el, selector) {
		const nextEls = [];
		while (el.nextElementSibling) {
			const next = el.nextElementSibling; // eslint-disable-line
			if (selector) {
				if (next.matches(selector)) nextEls.push(next);
			} else nextEls.push(next);
			el = next;
		}
		return nextEls;
	}

	function elementStyle(el, prop) {
		const window = getWindow();
		return window.getComputedStyle(el, null).getPropertyValue(prop);
	}

	function elementIndex(el) {
		let child = el;
		let i;
		if (child) {
			i = 0;
			// eslint-disable-next-line
			while ((child = child.previousSibling) !== null) {
				if (child.nodeType === 1) i += 1;
			}
			return i;
		}
		return undefined;
	}

	function elementParents(el, selector) {
		const parents = []; // eslint-disable-line
		let parent = el.parentElement; // eslint-disable-line
		while (parent) {
			if (selector) {
				if (parent.matches(selector)) parents.push(parent);
			} else {
				parents.push(parent);
			}
			parent = parent.parentElement;
		}
		return parents;
	}

	function elementTransitionEnd(el, callback) {
		function fireCallBack(e) {
			if (e.target !== el) return;
			callback.call(el, e);
			el.removeEventListener('transitionend', fireCallBack);
		}
		if (callback) {
			el.addEventListener('transitionend', fireCallBack);
		}
	}

	function elementOuterSize(el, size, includeMargins) {
		const window = getWindow();
		if (includeMargins) {
			return el[size === 'width' ? 'offsetWidth' : 'offsetHeight'] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-right' : 'margin-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-left' : 'margin-bottom'));
		}
		return el.offsetWidth;
	}
	let support;

	function calcSupport() {
		const window = getWindow();
		const document = getDocument();
		return {
			smoothScroll: document.documentElement && document.documentElement.style && 'scrollBehavior' in document.documentElement.style,
			touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)
		};
	}

	function getSupport() {
		if (!support) {
			support = calcSupport();
		}
		return support;
	}
	let deviceCached;

	function calcDevice(_temp) {
		let {
			userAgent
		} = _temp === void 0 ? {} : _temp;
		const support = getSupport();
		const window = getWindow();
		const platform = window.navigator.platform;
		const ua = userAgent || window.navigator.userAgent;
		const device = {
			ios: false,
			android: false
		};
		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;
		const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
		let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
		const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
		const windows = platform === 'Win32';
		let macos = platform === 'MacIntel';
		// iPadOs 13 fix
		const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];
		if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
			ipad = ua.match(/(Version)\/([\d.]+)/);
			if (!ipad) ipad = [0, 1, '13_0_0'];
			macos = false;
		}
		// Android
		if (android && !windows) {
			device.os = 'android';
			device.android = true;
		}
		if (ipad || iphone || ipod) {
			device.os = 'ios';
			device.ios = true;
		}
		// Export object
		return device;
	}

	function getDevice(overrides) {
		if (overrides === void 0) {
			overrides = {};
		}
		if (!deviceCached) {
			deviceCached = calcDevice(overrides);
		}
		return deviceCached;
	}
	let browser;

	function calcBrowser() {
		const window = getWindow();
		let needPerspectiveFix = false;

		function isSafari() {
			const ua = window.navigator.userAgent.toLowerCase();
			return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
		}
		if (isSafari()) {
			const ua = String(window.navigator.userAgent);
			if (ua.includes('Version/')) {
				const [major, minor] = ua.split('Version/')[1].split(' ')[0].split('.').map(num => Number(num));
				needPerspectiveFix = major < 16 || major === 16 && minor < 2;
			}
		}
		return {
			isSafari: needPerspectiveFix || isSafari(),
			needPerspectiveFix,
			isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
		};
	}

	function getBrowser() {
		if (!browser) {
			browser = calcBrowser();
		}
		return browser;
	}

	function Resize(_ref) {
		let {
			swiper,
			on,
			emit
		} = _ref;
		const window = getWindow();
		let observer = null;
		let animationFrame = null;
		const resizeHandler = () => {
			if (!swiper || swiper.destroyed || !swiper.initialized) return;
			emit('beforeResize');
			emit('resize');
		};
		const createObserver = () => {
			if (!swiper || swiper.destroyed || !swiper.initialized) return;
			observer = new ResizeObserver(entries => {
				animationFrame = window.requestAnimationFrame(() => {
					const {
						width,
						height
					} = swiper;
					let newWidth = width;
					let newHeight = height;
					entries.forEach(_ref2 => {
						let {
							contentBoxSize,
							contentRect,
							target
						} = _ref2;
						if (target && target !== swiper.el) return;
						newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
						newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
					});
					if (newWidth !== width || newHeight !== height) {
						resizeHandler();
					}
				});
			});
			observer.observe(swiper.el);
		};
		const removeObserver = () => {
			if (animationFrame) {
				window.cancelAnimationFrame(animationFrame);
			}
			if (observer && observer.unobserve && swiper.el) {
				observer.unobserve(swiper.el);
				observer = null;
			}
		};
		const orientationChangeHandler = () => {
			if (!swiper || swiper.destroyed || !swiper.initialized) return;
			emit('orientationchange');
		};
		on('init', () => {
			if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
				createObserver();
				return;
			}
			window.addEventListener('resize', resizeHandler);
			window.addEventListener('orientationchange', orientationChangeHandler);
		});
		on('destroy', () => {
			removeObserver();
			window.removeEventListener('resize', resizeHandler);
			window.removeEventListener('orientationchange', orientationChangeHandler);
		});
	}

	function Observer(_ref) {
		let {
			swiper,
			extendParams,
			on,
			emit
		} = _ref;
		const observers = [];
		const window = getWindow();
		const attach = function(target, options) {
			if (options === void 0) {
				options = {};
			}
			const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
			const observer = new ObserverFunc(mutations => {
				// The observerUpdate event should only be triggered
				// once despite the number of mutations.  Additional
				// triggers are redundant and are very costly
				if (swiper.__preventObserver__) return;
				if (mutations.length === 1) {
					emit('observerUpdate', mutations[0]);
					return;
				}
				const observerUpdate = function observerUpdate() {
					emit('observerUpdate', mutations[0]);
				};
				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(observerUpdate);
				} else {
					window.setTimeout(observerUpdate, 0);
				}
			});
			observer.observe(target, {
				attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
				childList: typeof options.childList === 'undefined' ? true : options.childList,
				characterData: typeof options.characterData === 'undefined' ? true : options.characterData
			});
			observers.push(observer);
		};
		const init = () => {
			if (!swiper.params.observer) return;
			if (swiper.params.observeParents) {
				const containerParents = elementParents(swiper.el);
				for (let i = 0; i < containerParents.length; i += 1) {
					attach(containerParents[i]);
				}
			}
			// Observe container
			attach(swiper.el, {
				childList: swiper.params.observeSlideChildren
			});
			// Observe wrapper
			attach(swiper.wrapperEl, {
				attributes: false
			});
		};
		const destroy = () => {
			observers.forEach(observer => {
				observer.disconnect();
			});
			observers.splice(0, observers.length);
		};
		extendParams({
			observer: false,
			observeParents: false,
			observeSlideChildren: false
		});
		on('init', init);
		on('destroy', destroy);
	}
	/* eslint-disable no-underscore-dangle */
	var eventsEmitter = {
		on(events, handler, priority) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (typeof handler !== 'function') return self;
			const method = priority ? 'unshift' : 'push';
			events.split(' ').forEach(event => {
				if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
				self.eventsListeners[event][method](handler);
			});
			return self;
		},
		once(events, handler, priority) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (typeof handler !== 'function') return self;

			function onceHandler() {
				self.off(events, onceHandler);
				if (onceHandler.__emitterProxy) {
					delete onceHandler.__emitterProxy;
				}
				for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
				handler.apply(self, args);
			}
			onceHandler.__emitterProxy = handler;
			return self.on(events, onceHandler, priority);
		},
		onAny(handler, priority) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (typeof handler !== 'function') return self;
			const method = priority ? 'unshift' : 'push';
			if (self.eventsAnyListeners.indexOf(handler) < 0) {
				self.eventsAnyListeners[method](handler);
			}
			return self;
		},
		offAny(handler) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (!self.eventsAnyListeners) return self;
			const index = self.eventsAnyListeners.indexOf(handler);
			if (index >= 0) {
				self.eventsAnyListeners.splice(index, 1);
			}
			return self;
		},
		off(events, handler) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (!self.eventsListeners) return self;
			events.split(' ').forEach(event => {
				if (typeof handler === 'undefined') {
					self.eventsListeners[event] = [];
				} else if (self.eventsListeners[event]) {
					self.eventsListeners[event].forEach((eventHandler, index) => {
						if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
							self.eventsListeners[event].splice(index, 1);
						}
					});
				}
			});
			return self;
		},
		emit() {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (!self.eventsListeners) return self;
			let events;
			let data;
			let context;
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}
			if (typeof args[0] === 'string' || Array.isArray(args[0])) {
				events = args[0];
				data = args.slice(1, args.length);
				context = self;
			} else {
				events = args[0].events;
				data = args[0].data;
				context = args[0].context || self;
			}
			data.unshift(context);
			const eventsArray = Array.isArray(events) ? events : events.split(' ');
			eventsArray.forEach(event => {
				if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
					self.eventsAnyListeners.forEach(eventHandler => {
						eventHandler.apply(context, [event, ...data]);
					});
				}
				if (self.eventsListeners && self.eventsListeners[event]) {
					self.eventsListeners[event].forEach(eventHandler => {
						eventHandler.apply(context, data);
					});
				}
			});
			return self;
		}
	};

	function updateSize() {
		const swiper = this;
		let width;
		let height;
		const el = swiper.el;
		if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
			width = swiper.params.width;
		} else {
			width = el.clientWidth;
		}
		if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
			height = swiper.params.height;
		} else {
			height = el.clientHeight;
		}
		if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
			return;
		}
		// Subtract paddings
		width = width - parseInt(elementStyle(el, 'padding-left') || 0, 10) - parseInt(elementStyle(el, 'padding-right') || 0, 10);
		height = height - parseInt(elementStyle(el, 'padding-top') || 0, 10) - parseInt(elementStyle(el, 'padding-bottom') || 0, 10);
		if (Number.isNaN(width)) width = 0;
		if (Number.isNaN(height)) height = 0;
		Object.assign(swiper, {
			width,
			height,
			size: swiper.isHorizontal() ? width : height
		});
	}

	function updateSlides() {
		const swiper = this;

		function getDirectionLabel(property) {
			if (swiper.isHorizontal()) {
				return property;
			}
			// prettier-ignore
			return {
				'width': 'height',
				'margin-top': 'margin-left',
				'margin-bottom ': 'margin-right',
				'margin-left': 'margin-top',
				'margin-right': 'margin-bottom',
				'padding-left': 'padding-top',
				'padding-right': 'padding-bottom',
				'marginRight': 'marginBottom'
			} [property];
		}

		function getDirectionPropertyValue(node, label) {
			return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
		}
		const params = swiper.params;
		const {
			wrapperEl,
			slidesEl,
			size: swiperSize,
			rtlTranslate: rtl,
			wrongRTL
		} = swiper;
		const isVirtual = swiper.virtual && params.virtual.enabled;
		const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
		const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
		const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
		let snapGrid = [];
		const slidesGrid = [];
		const slidesSizesGrid = [];
		let offsetBefore = params.slidesOffsetBefore;
		if (typeof offsetBefore === 'function') {
			offsetBefore = params.slidesOffsetBefore.call(swiper);
		}
		let offsetAfter = params.slidesOffsetAfter;
		if (typeof offsetAfter === 'function') {
			offsetAfter = params.slidesOffsetAfter.call(swiper);
		}
		const previousSnapGridLength = swiper.snapGrid.length;
		const previousSlidesGridLength = swiper.slidesGrid.length;
		let spaceBetween = params.spaceBetween;
		let slidePosition = -offsetBefore;
		let prevSlideSize = 0;
		let index = 0;
		if (typeof swiperSize === 'undefined') {
			return;
		}
		if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
			spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
		} else if (typeof spaceBetween === 'string') {
			spaceBetween = parseFloat(spaceBetween);
		}
		swiper.virtualSize = -spaceBetween;
		// reset margins
		slides.forEach(slideEl => {
			if (rtl) {
				slideEl.style.marginLeft = '';
			} else {
				slideEl.style.marginRight = '';
			}
			slideEl.style.marginBottom = '';
			slideEl.style.marginTop = '';
		});
		// reset cssMode offsets
		if (params.centeredSlides && params.cssMode) {
			setCSSProperty(wrapperEl, '--swiper-centered-offset-before', '');
			setCSSProperty(wrapperEl, '--swiper-centered-offset-after', '');
		}
		const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
		if (gridEnabled) {
			swiper.grid.initSlides(slidesLength);
		}
		// Calc slides
		let slideSize;
		const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {
			return typeof params.breakpoints[key].slidesPerView !== 'undefined';
		}).length > 0;
		for (let i = 0; i < slidesLength; i += 1) {
			slideSize = 0;
			let slide;
			if (slides[i]) slide = slides[i];
			if (gridEnabled) {
				swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
			}
			if (slides[i] && elementStyle(slide, 'display') === 'none') continue; // eslint-disable-line
			if (params.slidesPerView === 'auto') {
				if (shouldResetSlideSize) {
					slides[i].style[getDirectionLabel('width')] = ``;
				}
				const slideStyles = getComputedStyle(slide);
				const currentTransform = slide.style.transform;
				const currentWebKitTransform = slide.style.webkitTransform;
				if (currentTransform) {
					slide.style.transform = 'none';
				}
				if (currentWebKitTransform) {
					slide.style.webkitTransform = 'none';
				}
				if (params.roundLengths) {
					slideSize = swiper.isHorizontal() ? elementOuterSize(slide, 'width', true) : elementOuterSize(slide, 'height', true);
				} else {
					// eslint-disable-next-line
					const width = getDirectionPropertyValue(slideStyles, 'width');
					const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
					const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
					const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
					const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
					const boxSizing = slideStyles.getPropertyValue('box-sizing');
					if (boxSizing && boxSizing === 'border-box') {
						slideSize = width + marginLeft + marginRight;
					} else {
						const {
							clientWidth,
							offsetWidth
						} = slide;
						slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
					}
				}
				if (currentTransform) {
					slide.style.transform = currentTransform;
				}
				if (currentWebKitTransform) {
					slide.style.webkitTransform = currentWebKitTransform;
				}
				if (params.roundLengths) slideSize = Math.floor(slideSize);
			} else {
				slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
				if (params.roundLengths) slideSize = Math.floor(slideSize);
				if (slides[i]) {
					slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;
				}
			}
			if (slides[i]) {
				slides[i].swiperSlideSize = slideSize;
			}
			slidesSizesGrid.push(slideSize);
			if (params.centeredSlides) {
				slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
				if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
				if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
				if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
				if (params.roundLengths) slidePosition = Math.floor(slidePosition);
				if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
				slidesGrid.push(slidePosition);
			} else {
				if (params.roundLengths) slidePosition = Math.floor(slidePosition);
				if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
				slidesGrid.push(slidePosition);
				slidePosition = slidePosition + slideSize + spaceBetween;
			}
			swiper.virtualSize += slideSize + spaceBetween;
			prevSlideSize = slideSize;
			index += 1;
		}
		swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
		if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
			wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
		}
		if (params.setWrapperSize) {
			wrapperEl.style[getDirectionLabel('width')] = `${swiper.virtualSize + spaceBetween}px`;
		}
		if (gridEnabled) {
			swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
		}
		// Remove last grid elements depending on width
		if (!params.centeredSlides) {
			const newSlidesGrid = [];
			for (let i = 0; i < snapGrid.length; i += 1) {
				let slidesGridItem = snapGrid[i];
				if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
				if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
					newSlidesGrid.push(slidesGridItem);
				}
			}
			snapGrid = newSlidesGrid;
			if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
				snapGrid.push(swiper.virtualSize - swiperSize);
			}
		}
		if (isVirtual && params.loop) {
			const size = slidesSizesGrid[0] + spaceBetween;
			if (params.slidesPerGroup > 1) {
				const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
				const groupSize = size * params.slidesPerGroup;
				for (let i = 0; i < groups; i += 1) {
					snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
				}
			}
			for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
				if (params.slidesPerGroup === 1) {
					snapGrid.push(snapGrid[snapGrid.length - 1] + size);
				}
				slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
				swiper.virtualSize += size;
			}
		}
		if (snapGrid.length === 0) snapGrid = [0];
		if (spaceBetween !== 0) {
			const key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
			slides.filter((_, slideIndex) => {
				if (!params.cssMode || params.loop) return true;
				if (slideIndex === slides.length - 1) {
					return false;
				}
				return true;
			}).forEach(slideEl => {
				slideEl.style[key] = `${spaceBetween}px`;
			});
		}
		if (params.centeredSlides && params.centeredSlidesBounds) {
			let allSlidesSize = 0;
			slidesSizesGrid.forEach(slideSizeValue => {
				allSlidesSize += slideSizeValue + (spaceBetween || 0);
			});
			allSlidesSize -= spaceBetween;
			const maxSnap = allSlidesSize - swiperSize;
			snapGrid = snapGrid.map(snap => {
				if (snap < 0) return -offsetBefore;
				if (snap > maxSnap) return maxSnap + offsetAfter;
				return snap;
			});
		}
		if (params.centerInsufficientSlides) {
			let allSlidesSize = 0;
			slidesSizesGrid.forEach(slideSizeValue => {
				allSlidesSize += slideSizeValue + (spaceBetween || 0);
			});
			allSlidesSize -= spaceBetween;
			if (allSlidesSize < swiperSize) {
				const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
				snapGrid.forEach((snap, snapIndex) => {
					snapGrid[snapIndex] = snap - allSlidesOffset;
				});
				slidesGrid.forEach((snap, snapIndex) => {
					slidesGrid[snapIndex] = snap + allSlidesOffset;
				});
			}
		}
		Object.assign(swiper, {
			slides,
			snapGrid,
			slidesGrid,
			slidesSizesGrid
		});
		if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
			setCSSProperty(wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
			setCSSProperty(wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
			const addToSnapGrid = -swiper.snapGrid[0];
			const addToSlidesGrid = -swiper.slidesGrid[0];
			swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
			swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
		}
		if (slidesLength !== previousSlidesLength) {
			swiper.emit('slidesLengthChange');
		}
		if (snapGrid.length !== previousSnapGridLength) {
			if (swiper.params.watchOverflow) swiper.checkOverflow();
			swiper.emit('snapGridLengthChange');
		}
		if (slidesGrid.length !== previousSlidesGridLength) {
			swiper.emit('slidesGridLengthChange');
		}
		if (params.watchSlidesProgress) {
			swiper.updateSlidesOffset();
		}
		if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
			const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
			const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
			if (slidesLength <= params.maxBackfaceHiddenSlides) {
				if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
			} else if (hasClassBackfaceClassAdded) {
				swiper.el.classList.remove(backFaceHiddenClass);
			}
		}
	}

	function updateAutoHeight(speed) {
		const swiper = this;
		const activeSlides = [];
		const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
		let newHeight = 0;
		let i;
		if (typeof speed === 'number') {
			swiper.setTransition(speed);
		} else if (speed === true) {
			swiper.setTransition(swiper.params.speed);
		}
		const getSlideByIndex = index => {
			if (isVirtual) {
				return swiper.slides[swiper.getSlideIndexByData(index)];
			}
			return swiper.slides[index];
		};
		// Find slides currently in view
		if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
			if (swiper.params.centeredSlides) {
				(swiper.visibleSlides || []).forEach(slide => {
					activeSlides.push(slide);
				});
			} else {
				for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
					const index = swiper.activeIndex + i;
					if (index > swiper.slides.length && !isVirtual) break;
					activeSlides.push(getSlideByIndex(index));
				}
			}
		} else {
			activeSlides.push(getSlideByIndex(swiper.activeIndex));
		}
		// Find new height from highest slide in view
		for (i = 0; i < activeSlides.length; i += 1) {
			if (typeof activeSlides[i] !== 'undefined') {
				const height = activeSlides[i].offsetHeight;
				newHeight = height > newHeight ? height : newHeight;
			}
		}
		// Update Height
		if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
	}

	function updateSlidesOffset() {
		const swiper = this;
		const slides = swiper.slides;
		// eslint-disable-next-line
		const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
		for (let i = 0; i < slides.length; i += 1) {
			slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
		}
	}

	function updateSlidesProgress(translate) {
		if (translate === void 0) {
			translate = this && this.translate || 0;
		}
		const swiper = this;
		const params = swiper.params;
		const {
			slides,
			rtlTranslate: rtl,
			snapGrid
		} = swiper;
		if (slides.length === 0) return;
		if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
		let offsetCenter = -translate;
		if (rtl) offsetCenter = translate;
		// Visible Slides
		slides.forEach(slideEl => {
			slideEl.classList.remove(params.slideVisibleClass);
		});
		swiper.visibleSlidesIndexes = [];
		swiper.visibleSlides = [];
		let spaceBetween = params.spaceBetween;
		if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
			spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiper.size;
		} else if (typeof spaceBetween === 'string') {
			spaceBetween = parseFloat(spaceBetween);
		}
		for (let i = 0; i < slides.length; i += 1) {
			const slide = slides[i];
			let slideOffset = slide.swiperSlideOffset;
			if (params.cssMode && params.centeredSlides) {
				slideOffset -= slides[0].swiperSlideOffset;
			}
			const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
			const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
			const slideBefore = -(offsetCenter - slideOffset);
			const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
			const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
			if (isVisible) {
				swiper.visibleSlides.push(slide);
				swiper.visibleSlidesIndexes.push(i);
				slides[i].classList.add(params.slideVisibleClass);
			}
			slide.progress = rtl ? -slideProgress : slideProgress;
			slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
		}
	}

	function updateProgress(translate) {
		const swiper = this;
		if (typeof translate === 'undefined') {
			const multiplier = swiper.rtlTranslate ? -1 : 1;
			// eslint-disable-next-line
			translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
		}
		const params = swiper.params;
		const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
		let {
			progress,
			isBeginning,
			isEnd,
			progressLoop
		} = swiper;
		const wasBeginning = isBeginning;
		const wasEnd = isEnd;
		if (translatesDiff === 0) {
			progress = 0;
			isBeginning = true;
			isEnd = true;
		} else {
			progress = (translate - swiper.minTranslate()) / translatesDiff;
			const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
			const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
			isBeginning = isBeginningRounded || progress <= 0;
			isEnd = isEndRounded || progress >= 1;
			if (isBeginningRounded) progress = 0;
			if (isEndRounded) progress = 1;
		}
		if (params.loop) {
			const firstSlideIndex = swiper.getSlideIndexByData(0);
			const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
			const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
			const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
			const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
			const translateAbs = Math.abs(translate);
			if (translateAbs >= firstSlideTranslate) {
				progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
			} else {
				progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
			}
			if (progressLoop > 1) progressLoop -= 1;
		}
		Object.assign(swiper, {
			progress,
			progressLoop,
			isBeginning,
			isEnd
		});
		if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
		if (isBeginning && !wasBeginning) {
			swiper.emit('reachBeginning toEdge');
		}
		if (isEnd && !wasEnd) {
			swiper.emit('reachEnd toEdge');
		}
		if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
			swiper.emit('fromEdge');
		}
		swiper.emit('progress', progress);
	}

	function updateSlidesClasses() {
		const swiper = this;
		const {
			slides,
			params,
			slidesEl,
			activeIndex
		} = swiper;
		const isVirtual = swiper.virtual && params.virtual.enabled;
		const getFilteredSlide = selector => {
			return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
		};
		slides.forEach(slideEl => {
			slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
		});
		let activeSlide;
		if (isVirtual) {
			if (params.loop) {
				let slideIndex = activeIndex - swiper.virtual.slidesBefore;
				if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
				if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
				activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
			} else {
				activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
			}
		} else {
			activeSlide = slides[activeIndex];
		}
		if (activeSlide) {
			// Active classes
			activeSlide.classList.add(params.slideActiveClass);
			// Next Slide
			let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
			if (params.loop && !nextSlide) {
				nextSlide = slides[0];
			}
			if (nextSlide) {
				nextSlide.classList.add(params.slideNextClass);
			}
			// Prev Slide
			let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
			if (params.loop && !prevSlide === 0) {
				prevSlide = slides[slides.length - 1];
			}
			if (prevSlide) {
				prevSlide.classList.add(params.slidePrevClass);
			}
		}
		swiper.emitSlidesClasses();
	}
	const processLazyPreloader = (swiper, imageEl) => {
		if (!swiper || swiper.destroyed || !swiper.params) return;
		const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
		const slideEl = imageEl.closest(slideSelector());
		if (slideEl) {
			const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
			if (lazyEl) lazyEl.remove();
		}
	};
	const unlazy = (swiper, index) => {
		if (!swiper.slides[index]) return;
		const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
		if (imageEl) imageEl.removeAttribute('loading');
	};
	const preload = swiper => {
		if (!swiper || swiper.destroyed || !swiper.params) return;
		let amount = swiper.params.lazyPreloadPrevNext;
		const len = swiper.slides.length;
		if (!len || !amount || amount < 0) return;
		amount = Math.min(amount, len);
		const slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
		const activeIndex = swiper.activeIndex;
		const slideIndexLastInView = activeIndex + slidesPerView - 1;
		if (swiper.params.rewind) {
			for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
				const realIndex = (i % len + len) % len;
				if (realIndex !== activeIndex && realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
			}
		} else {
			for (let i = Math.max(slideIndexLastInView - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
				if (i !== activeIndex && i > slideIndexLastInView) unlazy(swiper, i);
			}
		}
	};

	function getActiveIndexByTranslate(swiper) {
		const {
			slidesGrid,
			params
		} = swiper;
		const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
		let activeIndex;
		for (let i = 0; i < slidesGrid.length; i += 1) {
			if (typeof slidesGrid[i + 1] !== 'undefined') {
				if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
					activeIndex = i;
				} else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
					activeIndex = i + 1;
				}
			} else if (translate >= slidesGrid[i]) {
				activeIndex = i;
			}
		}
		// Normalize slideIndex
		if (params.normalizeSlideIndex) {
			if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
		}
		return activeIndex;
	}

	function updateActiveIndex(newActiveIndex) {
		const swiper = this;
		const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
		const {
			snapGrid,
			params,
			activeIndex: previousIndex,
			realIndex: previousRealIndex,
			snapIndex: previousSnapIndex
		} = swiper;
		let activeIndex = newActiveIndex;
		let snapIndex;
		const getVirtualRealIndex = aIndex => {
			let realIndex = aIndex - swiper.virtual.slidesBefore;
			if (realIndex < 0) {
				realIndex = swiper.virtual.slides.length + realIndex;
			}
			if (realIndex >= swiper.virtual.slides.length) {
				realIndex -= swiper.virtual.slides.length;
			}
			return realIndex;
		};
		if (typeof activeIndex === 'undefined') {
			activeIndex = getActiveIndexByTranslate(swiper);
		}
		if (snapGrid.indexOf(translate) >= 0) {
			snapIndex = snapGrid.indexOf(translate);
		} else {
			const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
			snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
		}
		if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
		if (activeIndex === previousIndex) {
			if (snapIndex !== previousSnapIndex) {
				swiper.snapIndex = snapIndex;
				swiper.emit('snapIndexChange');
			}
			if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
				swiper.realIndex = getVirtualRealIndex(activeIndex);
			}
			return;
		}
		// Get real index
		let realIndex;
		if (swiper.virtual && params.virtual.enabled && params.loop) {
			realIndex = getVirtualRealIndex(activeIndex);
		} else if (swiper.slides[activeIndex]) {
			realIndex = parseInt(swiper.slides[activeIndex].getAttribute('data-swiper-slide-index') || activeIndex, 10);
		} else {
			realIndex = activeIndex;
		}
		Object.assign(swiper, {
			previousSnapIndex,
			snapIndex,
			previousRealIndex,
			realIndex,
			previousIndex,
			activeIndex
		});
		if (swiper.initialized) {
			preload(swiper);
		}
		swiper.emit('activeIndexChange');
		swiper.emit('snapIndexChange');
		if (previousRealIndex !== realIndex) {
			swiper.emit('realIndexChange');
		}
		if (swiper.initialized || swiper.params.runCallbacksOnInit) {
			swiper.emit('slideChange');
		}
	}

	function updateClickedSlide(e) {
		const swiper = this;
		const params = swiper.params;
		const slide = e.closest(`.${params.slideClass}, swiper-slide`);
		let slideFound = false;
		let slideIndex;
		if (slide) {
			for (let i = 0; i < swiper.slides.length; i += 1) {
				if (swiper.slides[i] === slide) {
					slideFound = true;
					slideIndex = i;
					break;
				}
			}
		}
		if (slide && slideFound) {
			swiper.clickedSlide = slide;
			if (swiper.virtual && swiper.params.virtual.enabled) {
				swiper.clickedIndex = parseInt(slide.getAttribute('data-swiper-slide-index'), 10);
			} else {
				swiper.clickedIndex = slideIndex;
			}
		} else {
			swiper.clickedSlide = undefined;
			swiper.clickedIndex = undefined;
			return;
		}
		if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
			swiper.slideToClickedSlide();
		}
	}
	var update = {
		updateSize,
		updateSlides,
		updateAutoHeight,
		updateSlidesOffset,
		updateSlidesProgress,
		updateProgress,
		updateSlidesClasses,
		updateActiveIndex,
		updateClickedSlide
	};

	function getSwiperTranslate(axis) {
		if (axis === void 0) {
			axis = this.isHorizontal() ? 'x' : 'y';
		}
		const swiper = this;
		const {
			params,
			rtlTranslate: rtl,
			translate,
			wrapperEl
		} = swiper;
		if (params.virtualTranslate) {
			return rtl ? -translate : translate;
		}
		if (params.cssMode) {
			return translate;
		}
		let currentTranslate = getTranslate(wrapperEl, axis);
		currentTranslate += swiper.cssOverflowAdjustment();
		if (rtl) currentTranslate = -currentTranslate;
		return currentTranslate || 0;
	}

	function setTranslate(translate, byController) {
		const swiper = this;
		const {
			rtlTranslate: rtl,
			params,
			wrapperEl,
			progress
		} = swiper;
		let x = 0;
		let y = 0;
		const z = 0;
		if (swiper.isHorizontal()) {
			x = rtl ? -translate : translate;
		} else {
			y = translate;
		}
		if (params.roundLengths) {
			x = Math.floor(x);
			y = Math.floor(y);
		}
		swiper.previousTranslate = swiper.translate;
		swiper.translate = swiper.isHorizontal() ? x : y;
		if (params.cssMode) {
			wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
		} else if (!params.virtualTranslate) {
			if (swiper.isHorizontal()) {
				x -= swiper.cssOverflowAdjustment();
			} else {
				y -= swiper.cssOverflowAdjustment();
			}
			wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
		}
		// Check if we need to update progress
		let newProgress;
		const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
		if (translatesDiff === 0) {
			newProgress = 0;
		} else {
			newProgress = (translate - swiper.minTranslate()) / translatesDiff;
		}
		if (newProgress !== progress) {
			swiper.updateProgress(translate);
		}
		swiper.emit('setTranslate', swiper.translate, byController);
	}

	function minTranslate() {
		return -this.snapGrid[0];
	}

	function maxTranslate() {
		return -this.snapGrid[this.snapGrid.length - 1];
	}

	function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
		if (translate === void 0) {
			translate = 0;
		}
		if (speed === void 0) {
			speed = this.params.speed;
		}
		if (runCallbacks === void 0) {
			runCallbacks = true;
		}
		if (translateBounds === void 0) {
			translateBounds = true;
		}
		const swiper = this;
		const {
			params,
			wrapperEl
		} = swiper;
		if (swiper.animating && params.preventInteractionOnTransition) {
			return false;
		}
		const minTranslate = swiper.minTranslate();
		const maxTranslate = swiper.maxTranslate();
		let newTranslate;
		if (translateBounds && translate > minTranslate) newTranslate = minTranslate;
		else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;
		else newTranslate = translate;
		// Update progress
		swiper.updateProgress(newTranslate);
		if (params.cssMode) {
			const isH = swiper.isHorizontal();
			if (speed === 0) {
				wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
			} else {
				if (!swiper.support.smoothScroll) {
					animateCSSModeScroll({
						swiper,
						targetPosition: -newTranslate,
						side: isH ? 'left' : 'top'
					});
					return true;
				}
				wrapperEl.scrollTo({
					[isH ? 'left' : 'top']: -newTranslate,
					behavior: 'smooth'
				});
			}
			return true;
		}
		if (speed === 0) {
			swiper.setTransition(0);
			swiper.setTranslate(newTranslate);
			if (runCallbacks) {
				swiper.emit('beforeTransitionStart', speed, internal);
				swiper.emit('transitionEnd');
			}
		} else {
			swiper.setTransition(speed);
			swiper.setTranslate(newTranslate);
			if (runCallbacks) {
				swiper.emit('beforeTransitionStart', speed, internal);
				swiper.emit('transitionStart');
			}
			if (!swiper.animating) {
				swiper.animating = true;
				if (!swiper.onTranslateToWrapperTransitionEnd) {
					swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
						if (!swiper || swiper.destroyed) return;
						if (e.target !== this) return;
						swiper.wrapperEl.removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
						swiper.onTranslateToWrapperTransitionEnd = null;
						delete swiper.onTranslateToWrapperTransitionEnd;
						if (runCallbacks) {
							swiper.emit('transitionEnd');
						}
					};
				}
				swiper.wrapperEl.addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
			}
		}
		return true;
	}
	var translate = {
		getTranslate: getSwiperTranslate,
		setTranslate,
		minTranslate,
		maxTranslate,
		translateTo
	};

	function setTransition(duration, byController) {
		const swiper = this;
		if (!swiper.params.cssMode) {
			swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
		}
		swiper.emit('setTransition', duration, byController);
	}

	function transitionEmit(_ref) {
		let {
			swiper,
			runCallbacks,
			direction,
			step
		} = _ref;
		const {
			activeIndex,
			previousIndex
		} = swiper;
		let dir = direction;
		if (!dir) {
			if (activeIndex > previousIndex) dir = 'next';
			else if (activeIndex < previousIndex) dir = 'prev';
			else dir = 'reset';
		}
		swiper.emit(`transition${step}`);
		if (runCallbacks && activeIndex !== previousIndex) {
			if (dir === 'reset') {
				swiper.emit(`slideResetTransition${step}`);
				return;
			}
			swiper.emit(`slideChangeTransition${step}`);
			if (dir === 'next') {
				swiper.emit(`slideNextTransition${step}`);
			} else {
				swiper.emit(`slidePrevTransition${step}`);
			}
		}
	}

	function transitionStart(runCallbacks, direction) {
		if (runCallbacks === void 0) {
			runCallbacks = true;
		}
		const swiper = this;
		const {
			params
		} = swiper;
		if (params.cssMode) return;
		if (params.autoHeight) {
			swiper.updateAutoHeight();
		}
		transitionEmit({
			swiper,
			runCallbacks,
			direction,
			step: 'Start'
		});
	}

	function transitionEnd(runCallbacks, direction) {
		if (runCallbacks === void 0) {
			runCallbacks = true;
		}
		const swiper = this;
		const {
			params
		} = swiper;
		swiper.animating = false;
		if (params.cssMode) return;
		swiper.setTransition(0);
		transitionEmit({
			swiper,
			runCallbacks,
			direction,
			step: 'End'
		});
	}
	var transition = {
		setTransition,
		transitionStart,
		transitionEnd
	};

	function slideTo(index, speed, runCallbacks, internal, initial) {
		if (index === void 0) {
			index = 0;
		}
		if (speed === void 0) {
			speed = this.params.speed;
		}
		if (runCallbacks === void 0) {
			runCallbacks = true;
		}
		if (typeof index === 'string') {
			index = parseInt(index, 10);
		}
		const swiper = this;
		let slideIndex = index;
		if (slideIndex < 0) slideIndex = 0;
		const {
			params,
			snapGrid,
			slidesGrid,
			previousIndex,
			activeIndex,
			rtlTranslate: rtl,
			wrapperEl,
			enabled
		} = swiper;
		if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
			return false;
		}
		const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
		let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
		if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
		const translate = -snapGrid[snapIndex];
		// Normalize slideIndex
		if (params.normalizeSlideIndex) {
			for (let i = 0; i < slidesGrid.length; i += 1) {
				const normalizedTranslate = -Math.floor(translate * 100);
				const normalizedGrid = Math.floor(slidesGrid[i] * 100);
				const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
				if (typeof slidesGrid[i + 1] !== 'undefined') {
					if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
						slideIndex = i;
					} else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
						slideIndex = i + 1;
					}
				} else if (normalizedTranslate >= normalizedGrid) {
					slideIndex = i;
				}
			}
		}
		// Directions locks
		if (swiper.initialized && slideIndex !== activeIndex) {
			if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
				return false;
			}
			if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
				if ((activeIndex || 0) !== slideIndex) {
					return false;
				}
			}
		}
		if (slideIndex !== (previousIndex || 0) && runCallbacks) {
			swiper.emit('beforeSlideChangeStart');
		}
		// Update progress
		swiper.updateProgress(translate);
		let direction;
		if (slideIndex > activeIndex) direction = 'next';
		else if (slideIndex < activeIndex) direction = 'prev';
		else direction = 'reset';
		// Update Index
		if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
			swiper.updateActiveIndex(slideIndex);
			// Update Height
			if (params.autoHeight) {
				swiper.updateAutoHeight();
			}
			swiper.updateSlidesClasses();
			if (params.effect !== 'slide') {
				swiper.setTranslate(translate);
			}
			if (direction !== 'reset') {
				swiper.transitionStart(runCallbacks, direction);
				swiper.transitionEnd(runCallbacks, direction);
			}
			return false;
		}
		if (params.cssMode) {
			const isH = swiper.isHorizontal();
			const t = rtl ? translate : -translate;
			if (speed === 0) {
				const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
				if (isVirtual) {
					swiper.wrapperEl.style.scrollSnapType = 'none';
					swiper._immediateVirtual = true;
				}
				if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
					swiper._cssModeVirtualInitialSet = true;
					requestAnimationFrame(() => {
						wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
					});
				} else {
					wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
				}
				if (isVirtual) {
					requestAnimationFrame(() => {
						swiper.wrapperEl.style.scrollSnapType = '';
						swiper._immediateVirtual = false;
					});
				}
			} else {
				if (!swiper.support.smoothScroll) {
					animateCSSModeScroll({
						swiper,
						targetPosition: t,
						side: isH ? 'left' : 'top'
					});
					return true;
				}
				wrapperEl.scrollTo({
					[isH ? 'left' : 'top']: t,
					behavior: 'smooth'
				});
			}
			return true;
		}
		swiper.setTransition(speed);
		swiper.setTranslate(translate);
		swiper.updateActiveIndex(slideIndex);
		swiper.updateSlidesClasses();
		swiper.emit('beforeTransitionStart', speed, internal);
		swiper.transitionStart(runCallbacks, direction);
		if (speed === 0) {
			swiper.transitionEnd(runCallbacks, direction);
		} else if (!swiper.animating) {
			swiper.animating = true;
			if (!swiper.onSlideToWrapperTransitionEnd) {
				swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
					if (!swiper || swiper.destroyed) return;
					if (e.target !== this) return;
					swiper.wrapperEl.removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
					swiper.onSlideToWrapperTransitionEnd = null;
					delete swiper.onSlideToWrapperTransitionEnd;
					swiper.transitionEnd(runCallbacks, direction);
				};
			}
			swiper.wrapperEl.addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
		}
		return true;
	}

	function slideToLoop(index, speed, runCallbacks, internal) {
		if (index === void 0) {
			index = 0;
		}
		if (speed === void 0) {
			speed = this.params.speed;
		}
		if (runCallbacks === void 0) {
			runCallbacks = true;
		}
		if (typeof index === 'string') {
			const indexAsNumber = parseInt(index, 10);
			index = indexAsNumber;
		}
		const swiper = this;
		let newIndex = index;
		if (swiper.params.loop) {
			if (swiper.virtual && swiper.params.virtual.enabled) {
				// eslint-disable-next-line
				newIndex = newIndex + swiper.virtual.slidesBefore;
			} else {
				newIndex = swiper.getSlideIndexByData(newIndex);
			}
		}
		return swiper.slideTo(newIndex, speed, runCallbacks, internal);
	}
	/* eslint no-unused-vars: "off" */
	function slideNext(speed, runCallbacks, internal) {
		if (speed === void 0) {
			speed = this.params.speed;
		}
		if (runCallbacks === void 0) {
			runCallbacks = true;
		}
		const swiper = this;
		const {
			enabled,
			params,
			animating
		} = swiper;
		if (!enabled) return swiper;
		let perGroup = params.slidesPerGroup;
		if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
			perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
		}
		const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
		const isVirtual = swiper.virtual && params.virtual.enabled;
		if (params.loop) {
			if (animating && !isVirtual && params.loopPreventsSliding) return false;
			swiper.loopFix({
				direction: 'next'
			});
			// eslint-disable-next-line
			swiper._clientLeft = swiper.wrapperEl.clientLeft;
		}
		if (params.rewind && swiper.isEnd) {
			return swiper.slideTo(0, speed, runCallbacks, internal);
		}
		return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
	}
	/* eslint no-unused-vars: "off" */
	function slidePrev(speed, runCallbacks, internal) {
		if (speed === void 0) {
			speed = this.params.speed;
		}
		if (runCallbacks === void 0) {
			runCallbacks = true;
		}
		const swiper = this;
		const {
			params,
			snapGrid,
			slidesGrid,
			rtlTranslate,
			enabled,
			animating
		} = swiper;
		if (!enabled) return swiper;
		const isVirtual = swiper.virtual && params.virtual.enabled;
		if (params.loop) {
			if (animating && !isVirtual && params.loopPreventsSliding) return false;
			swiper.loopFix({
				direction: 'prev'
			});
			// eslint-disable-next-line
			swiper._clientLeft = swiper.wrapperEl.clientLeft;
		}
		const translate = rtlTranslate ? swiper.translate : -swiper.translate;

		function normalize(val) {
			if (val < 0) return -Math.floor(Math.abs(val));
			return Math.floor(val);
		}
		const normalizedTranslate = normalize(translate);
		const normalizedSnapGrid = snapGrid.map(val => normalize(val));
		let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
		if (typeof prevSnap === 'undefined' && params.cssMode) {
			let prevSnapIndex;
			snapGrid.forEach((snap, snapIndex) => {
				if (normalizedTranslate >= snap) {
					// prevSnap = snap;
					prevSnapIndex = snapIndex;
				}
			});
			if (typeof prevSnapIndex !== 'undefined') {
				prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
			}
		}
		let prevIndex = 0;
		if (typeof prevSnap !== 'undefined') {
			prevIndex = slidesGrid.indexOf(prevSnap);
			if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
			if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
				prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
				prevIndex = Math.max(prevIndex, 0);
			}
		}
		if (params.rewind && swiper.isBeginning) {
			const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
			return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
		}
		return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
	}
	/* eslint no-unused-vars: "off" */
	function slideReset(speed, runCallbacks, internal) {
		if (speed === void 0) {
			speed = this.params.speed;
		}
		if (runCallbacks === void 0) {
			runCallbacks = true;
		}
		const swiper = this;
		return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
	}
	/* eslint no-unused-vars: "off" */
	function slideToClosest(speed, runCallbacks, internal, threshold) {
		if (speed === void 0) {
			speed = this.params.speed;
		}
		if (runCallbacks === void 0) {
			runCallbacks = true;
		}
		if (threshold === void 0) {
			threshold = 0.5;
		}
		const swiper = this;
		let index = swiper.activeIndex;
		const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
		const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
		const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
		if (translate >= swiper.snapGrid[snapIndex]) {
			// The current translate is on or after the current snap index, so the choice
			// is between the current index and the one after it.
			const currentSnap = swiper.snapGrid[snapIndex];
			const nextSnap = swiper.snapGrid[snapIndex + 1];
			if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
				index += swiper.params.slidesPerGroup;
			}
		} else {
			// The current translate is before the current snap index, so the choice
			// is between the current index and the one before it.
			const prevSnap = swiper.snapGrid[snapIndex - 1];
			const currentSnap = swiper.snapGrid[snapIndex];
			if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
				index -= swiper.params.slidesPerGroup;
			}
		}
		index = Math.max(index, 0);
		index = Math.min(index, swiper.slidesGrid.length - 1);
		return swiper.slideTo(index, speed, runCallbacks, internal);
	}

	function slideToClickedSlide() {
		const swiper = this;
		const {
			params,
			slidesEl
		} = swiper;
		const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
		let slideToIndex = swiper.clickedIndex;
		let realIndex;
		const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
		if (params.loop) {
			if (swiper.animating) return;
			realIndex = parseInt(swiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
			if (params.centeredSlides) {
				if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
					swiper.loopFix();
					slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
					nextTick(() => {
						swiper.slideTo(slideToIndex);
					});
				} else {
					swiper.slideTo(slideToIndex);
				}
			} else if (slideToIndex > swiper.slides.length - slidesPerView) {
				swiper.loopFix();
				slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
				nextTick(() => {
					swiper.slideTo(slideToIndex);
				});
			} else {
				swiper.slideTo(slideToIndex);
			}
		} else {
			swiper.slideTo(slideToIndex);
		}
	}
	var slide = {
		slideTo,
		slideToLoop,
		slideNext,
		slidePrev,
		slideReset,
		slideToClosest,
		slideToClickedSlide
	};

	function loopCreate(slideRealIndex) {
		const swiper = this;
		const {
			params,
			slidesEl
		} = swiper;
		if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
		const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
		slides.forEach((el, index) => {
			el.setAttribute('data-swiper-slide-index', index);
		});
		swiper.loopFix({
			slideRealIndex,
			direction: params.centeredSlides ? undefined : 'next'
		});
	}

	function loopFix(_temp) {
		let {
			slideRealIndex,
			slideTo = true,
			direction,
			setTranslate,
			activeSlideIndex,
			byController,
			byMousewheel
		} = _temp === void 0 ? {} : _temp;
		const swiper = this;
		if (!swiper.params.loop) return;
		swiper.emit('beforeLoopFix');
		const {
			slides,
			allowSlidePrev,
			allowSlideNext,
			slidesEl,
			params
		} = swiper;
		swiper.allowSlidePrev = true;
		swiper.allowSlideNext = true;
		if (swiper.virtual && params.virtual.enabled) {
			if (slideTo) {
				if (!params.centeredSlides && swiper.snapIndex === 0) {
					swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
				} else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
					swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
				} else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
					swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
				}
			}
			swiper.allowSlidePrev = allowSlidePrev;
			swiper.allowSlideNext = allowSlideNext;
			swiper.emit('loopFix');
			return;
		}
		const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
		let loopedSlides = params.loopedSlides || slidesPerView;
		if (loopedSlides % params.slidesPerGroup !== 0) {
			loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
		}
		swiper.loopedSlides = loopedSlides;
		const prependSlidesIndexes = [];
		const appendSlidesIndexes = [];
		let activeIndex = swiper.activeIndex;
		if (typeof activeSlideIndex === 'undefined') {
			activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter(el => el.classList.contains(params.slideActiveClass))[0]);
		} else {
			activeIndex = activeSlideIndex;
		}
		const isNext = direction === 'next' || !direction;
		const isPrev = direction === 'prev' || !direction;
		let slidesPrepended = 0;
		let slidesAppended = 0;
		// prepend last slides before start
		if (activeSlideIndex < loopedSlides) {
			slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
			for (let i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
				const index = i - Math.floor(i / slides.length) * slides.length;
				prependSlidesIndexes.push(slides.length - index - 1);
			}
		} else if (activeSlideIndex /* + slidesPerView */ > swiper.slides.length - loopedSlides * 2) {
			slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
			for (let i = 0; i < slidesAppended; i += 1) {
				const index = i - Math.floor(i / slides.length) * slides.length;
				appendSlidesIndexes.push(index);
			}
		}
		if (isPrev) {
			prependSlidesIndexes.forEach(index => {
				swiper.slides[index].swiperLoopMoveDOM = true;
				slidesEl.prepend(swiper.slides[index]);
				swiper.slides[index].swiperLoopMoveDOM = false;
			});
		}
		if (isNext) {
			appendSlidesIndexes.forEach(index => {
				swiper.slides[index].swiperLoopMoveDOM = true;
				slidesEl.append(swiper.slides[index]);
				swiper.slides[index].swiperLoopMoveDOM = false;
			});
		}
		swiper.recalcSlides();
		if (params.slidesPerView === 'auto') {
			swiper.updateSlides();
		}
		if (params.watchSlidesProgress) {
			swiper.updateSlidesOffset();
		}
		if (slideTo) {
			if (prependSlidesIndexes.length > 0 && isPrev) {
				if (typeof slideRealIndex === 'undefined') {
					const currentSlideTranslate = swiper.slidesGrid[activeIndex];
					const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
					const diff = newSlideTranslate - currentSlideTranslate;
					if (byMousewheel) {
						swiper.setTranslate(swiper.translate - diff);
					} else {
						swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
						if (setTranslate) {
							swiper.touches[swiper.isHorizontal() ? 'startX' : 'startY'] += diff;
						}
					}
				} else {
					if (setTranslate) {
						swiper.slideToLoop(slideRealIndex, 0, false, true);
					}
				}
			} else if (appendSlidesIndexes.length > 0 && isNext) {
				if (typeof slideRealIndex === 'undefined') {
					const currentSlideTranslate = swiper.slidesGrid[activeIndex];
					const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
					const diff = newSlideTranslate - currentSlideTranslate;
					if (byMousewheel) {
						swiper.setTranslate(swiper.translate - diff);
					} else {
						swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
						if (setTranslate) {
							swiper.touches[swiper.isHorizontal() ? 'startX' : 'startY'] += diff;
						}
					}
				} else {
					swiper.slideToLoop(slideRealIndex, 0, false, true);
				}
			}
		}
		swiper.allowSlidePrev = allowSlidePrev;
		swiper.allowSlideNext = allowSlideNext;
		if (swiper.controller && swiper.controller.control && !byController) {
			const loopParams = {
				slideRealIndex,
				slideTo: false,
				direction,
				setTranslate,
				activeSlideIndex,
				byController: true
			};
			if (Array.isArray(swiper.controller.control)) {
				swiper.controller.control.forEach(c => {
					if (!c.destroyed && c.params.loop) c.loopFix(loopParams);
				});
			} else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
				swiper.controller.control.loopFix(loopParams);
			}
		}
		swiper.emit('loopFix');
	}

	function loopDestroy() {
		const swiper = this;
		const {
			params,
			slidesEl
		} = swiper;
		if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
		swiper.recalcSlides();
		const newSlidesOrder = [];
		swiper.slides.forEach(slideEl => {
			const index = typeof slideEl.swiperSlideIndex === 'undefined' ? slideEl.getAttribute('data-swiper-slide-index') * 1 : slideEl.swiperSlideIndex;
			newSlidesOrder[index] = slideEl;
		});
		swiper.slides.forEach(slideEl => {
			slideEl.removeAttribute('data-swiper-slide-index');
		});
		newSlidesOrder.forEach(slideEl => {
			slidesEl.append(slideEl);
		});
		swiper.recalcSlides();
		swiper.slideTo(swiper.realIndex, 0);
	}
	var loop = {
		loopCreate,
		loopFix,
		loopDestroy
	};

	function setGrabCursor(moving) {
		const swiper = this;
		if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
		const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
		if (swiper.isElement) {
			swiper.__preventObserver__ = true;
		}
		el.style.cursor = 'move';
		el.style.cursor = moving ? 'grabbing' : 'grab';
		if (swiper.isElement) {
			requestAnimationFrame(() => {
				swiper.__preventObserver__ = false;
			});
		}
	}

	function unsetGrabCursor() {
		const swiper = this;
		if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
			return;
		}
		if (swiper.isElement) {
			swiper.__preventObserver__ = true;
		}
		swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
		if (swiper.isElement) {
			requestAnimationFrame(() => {
				swiper.__preventObserver__ = false;
			});
		}
	}
	var grabCursor = {
		setGrabCursor,
		unsetGrabCursor
	};
	// Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
	function closestElement(selector, base) {
		if (base === void 0) {
			base = this;
		}

		function __closestFrom(el) {
			if (!el || el === getDocument() || el === getWindow()) return null;
			if (el.assignedSlot) el = el.assignedSlot;
			const found = el.closest(selector);
			if (!found && !el.getRootNode) {
				return null;
			}
			return found || __closestFrom(el.getRootNode().host);
		}
		return __closestFrom(base);
	}

	function onTouchStart(event) {
		const swiper = this;
		const document = getDocument();
		const window = getWindow();
		const data = swiper.touchEventsData;
		data.evCache.push(event);
		const {
			params,
			touches,
			enabled
		} = swiper;
		if (!enabled) return;
		if (!params.simulateTouch && event.pointerType === 'mouse') return;
		if (swiper.animating && params.preventInteractionOnTransition) {
			return;
		}
		if (!swiper.animating && params.cssMode && params.loop) {
			swiper.loopFix();
		}
		let e = event;
		if (e.originalEvent) e = e.originalEvent;
		let targetEl = e.target;
		if (params.touchEventsTarget === 'wrapper') {
			if (!swiper.wrapperEl.contains(targetEl)) return;
		}
		if ('which' in e && e.which === 3) return;
		if ('button' in e && e.button > 0) return;
		if (data.isTouched && data.isMoved) return;
		// change target el for shadow root component
		const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
		// eslint-disable-next-line
		const eventPath = event.composedPath ? event.composedPath() : event.path;
		if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
			targetEl = eventPath[0];
		}
		const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
		const isTargetShadow = !!(e.target && e.target.shadowRoot);
		// use closestElement for shadow root element to get the actual closest for nested shadow root element
		if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
			swiper.allowClick = true;
			return;
		}
		if (params.swipeHandler) {
			if (!targetEl.closest(params.swipeHandler)) return;
		}
		touches.currentX = e.pageX;
		touches.currentY = e.pageY;
		const startX = touches.currentX;
		const startY = touches.currentY;
		// Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore
		const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
		const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
		if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
			if (edgeSwipeDetection === 'prevent') {
				event.preventDefault();
			} else {
				return;
			}
		}
		Object.assign(data, {
			isTouched: true,
			isMoved: false,
			allowTouchCallbacks: true,
			isScrolling: undefined,
			startMoving: undefined
		});
		touches.startX = startX;
		touches.startY = startY;
		data.touchStartTime = now();
		swiper.allowClick = true;
		swiper.updateSize();
		swiper.swipeDirection = undefined;
		if (params.threshold > 0) data.allowThresholdMove = false;
		let preventDefault = true;
		if (targetEl.matches(data.focusableElements)) {
			preventDefault = false;
			if (targetEl.nodeName === 'SELECT') {
				data.isTouched = false;
			}
		}
		if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) {
			document.activeElement.blur();
		}
		const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
		if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
			e.preventDefault();
		}
		if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
			swiper.freeMode.onTouchStart();
		}
		swiper.emit('touchStart', e);
	}

	function onTouchMove(event) {
		const document = getDocument();
		const swiper = this;
		const data = swiper.touchEventsData;
		const {
			params,
			touches,
			rtlTranslate: rtl,
			enabled
		} = swiper;
		if (!enabled) return;
		if (!params.simulateTouch && event.pointerType === 'mouse') return;
		let e = event;
		if (e.originalEvent) e = e.originalEvent;
		if (!data.isTouched) {
			if (data.startMoving && data.isScrolling) {
				swiper.emit('touchMoveOpposite', e);
			}
			return;
		}
		const pointerIndex = data.evCache.findIndex(cachedEv => cachedEv.pointerId === e.pointerId);
		if (pointerIndex >= 0) data.evCache[pointerIndex] = e;
		const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e;
		const pageX = targetTouch.pageX;
		const pageY = targetTouch.pageY;
		if (e.preventedByNestedSwiper) {
			touches.startX = pageX;
			touches.startY = pageY;
			return;
		}
		if (!swiper.allowTouchMove) {
			if (!e.target.matches(data.focusableElements)) {
				swiper.allowClick = false;
			}
			if (data.isTouched) {
				Object.assign(touches, {
					startX: pageX,
					startY: pageY,
					prevX: swiper.touches.currentX,
					prevY: swiper.touches.currentY,
					currentX: pageX,
					currentY: pageY
				});
				data.touchStartTime = now();
			}
			return;
		}
		if (params.touchReleaseOnEdges && !params.loop) {
			if (swiper.isVertical()) {
				// Vertical
				if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
					data.isTouched = false;
					data.isMoved = false;
					return;
				}
			} else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
				return;
			}
		}
		if (document.activeElement) {
			if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
				data.isMoved = true;
				swiper.allowClick = false;
				return;
			}
		}
		if (data.allowTouchCallbacks) {
			swiper.emit('touchMove', e);
		}
		if (e.targetTouches && e.targetTouches.length > 1) return;
		touches.currentX = pageX;
		touches.currentY = pageY;
		const diffX = touches.currentX - touches.startX;
		const diffY = touches.currentY - touches.startY;
		if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
		if (typeof data.isScrolling === 'undefined') {
			let touchAngle;
			if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
				data.isScrolling = false;
			} else {
				// eslint-disable-next-line
				if (diffX * diffX + diffY * diffY >= 25) {
					touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
					data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
				}
			}
		}
		if (data.isScrolling) {
			swiper.emit('touchMoveOpposite', e);
		}
		if (typeof data.startMoving === 'undefined') {
			if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
				data.startMoving = true;
			}
		}
		if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
			data.isTouched = false;
			return;
		}
		if (!data.startMoving) {
			return;
		}
		swiper.allowClick = false;
		if (!params.cssMode && e.cancelable) {
			e.preventDefault();
		}
		if (params.touchMoveStopPropagation && !params.nested) {
			e.stopPropagation();
		}
		let diff = swiper.isHorizontal() ? diffX : diffY;
		let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
		if (params.oneWayMovement) {
			diff = Math.abs(diff) * (rtl ? 1 : -1);
			touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
		}
		touches.diff = diff;
		diff *= params.touchRatio;
		if (rtl) {
			diff = -diff;
			touchesDiff = -touchesDiff;
		}
		const prevTouchesDirection = swiper.touchesDirection;
		swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
		swiper.touchesDirection = touchesDiff > 0 ? 'prev' : 'next';
		const isLoop = swiper.params.loop && !params.cssMode;
		if (!data.isMoved) {
			if (isLoop) {
				swiper.loopFix({
					direction: swiper.swipeDirection
				});
			}
			data.startTranslate = swiper.getTranslate();
			swiper.setTransition(0);
			if (swiper.animating) {
				const evt = new window.CustomEvent('transitionend', {
					bubbles: true,
					cancelable: true
				});
				swiper.wrapperEl.dispatchEvent(evt);
			}
			data.allowMomentumBounce = false;
			// Grab Cursor
			if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
				swiper.setGrabCursor(true);
			}
			swiper.emit('sliderFirstMove', e);
		}
		let loopFixed;
		if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
			// need another loop fix
			swiper.loopFix({
				direction: swiper.swipeDirection,
				setTranslate: true
			});
			loopFixed = true;
		}
		swiper.emit('sliderMove', e);
		data.isMoved = true;
		data.currentTranslate = diff + data.startTranslate;
		let disableParentSwiper = true;
		let resistanceRatio = params.resistanceRatio;
		if (params.touchReleaseOnEdges) {
			resistanceRatio = 0;
		}
		if (diff > 0) {
			if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) {
				swiper.loopFix({
					direction: 'prev',
					setTranslate: true,
					activeSlideIndex: 0
				});
			}
			if (data.currentTranslate > swiper.minTranslate()) {
				disableParentSwiper = false;
				if (params.resistance) {
					data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
				}
			}
		} else if (diff < 0) {
			if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) {
				swiper.loopFix({
					direction: 'next',
					setTranslate: true,
					activeSlideIndex: swiper.slides.length - (params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
				});
			}
			if (data.currentTranslate < swiper.maxTranslate()) {
				disableParentSwiper = false;
				if (params.resistance) {
					data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
				}
			}
		}
		if (disableParentSwiper) {
			e.preventedByNestedSwiper = true;
		}
		// Directions locks
		if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
			data.currentTranslate = data.startTranslate;
		}
		if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
			data.currentTranslate = data.startTranslate;
		}
		if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
			data.currentTranslate = data.startTranslate;
		}
		// Threshold
		if (params.threshold > 0) {
			if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
				if (!data.allowThresholdMove) {
					data.allowThresholdMove = true;
					touches.startX = touches.currentX;
					touches.startY = touches.currentY;
					data.currentTranslate = data.startTranslate;
					touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
					return;
				}
			} else {
				data.currentTranslate = data.startTranslate;
				return;
			}
		}
		if (!params.followFinger || params.cssMode) return;
		// Update active index in free mode
		if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
			swiper.updateActiveIndex();
			swiper.updateSlidesClasses();
		}
		if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
			swiper.freeMode.onTouchMove();
		}
		// Update progress
		swiper.updateProgress(data.currentTranslate);
		// Update translate
		swiper.setTranslate(data.currentTranslate);
	}

	function onTouchEnd(event) {
		const swiper = this;
		const data = swiper.touchEventsData;
		const pointerIndex = data.evCache.findIndex(cachedEv => cachedEv.pointerId === event.pointerId);
		if (pointerIndex >= 0) {
			data.evCache.splice(pointerIndex, 1);
		}
		if (['pointercancel', 'pointerout', 'pointerleave'].includes(event.type)) {
			const proceed = event.type === 'pointercancel' && (swiper.browser.isSafari || swiper.browser.isWebView);
			if (!proceed) {
				return;
			}
		}
		const {
			params,
			touches,
			rtlTranslate: rtl,
			slidesGrid,
			enabled
		} = swiper;
		if (!enabled) return;
		if (!params.simulateTouch && event.pointerType === 'mouse') return;
		let e = event;
		if (e.originalEvent) e = e.originalEvent;
		if (data.allowTouchCallbacks) {
			swiper.emit('touchEnd', e);
		}
		data.allowTouchCallbacks = false;
		if (!data.isTouched) {
			if (data.isMoved && params.grabCursor) {
				swiper.setGrabCursor(false);
			}
			data.isMoved = false;
			data.startMoving = false;
			return;
		}
		// Return Grab Cursor
		if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
			swiper.setGrabCursor(false);
		}
		// Time diff
		const touchEndTime = now();
		const timeDiff = touchEndTime - data.touchStartTime;
		// Tap, doubleTap, Click
		if (swiper.allowClick) {
			const pathTree = e.path || e.composedPath && e.composedPath();
			swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
			swiper.emit('tap click', e);
			if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
				swiper.emit('doubleTap doubleClick', e);
			}
		}
		data.lastClickTime = now();
		nextTick(() => {
			if (!swiper.destroyed) swiper.allowClick = true;
		});
		if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
			data.isTouched = false;
			data.isMoved = false;
			data.startMoving = false;
			return;
		}
		data.isTouched = false;
		data.isMoved = false;
		data.startMoving = false;
		let currentPos;
		if (params.followFinger) {
			currentPos = rtl ? swiper.translate : -swiper.translate;
		} else {
			currentPos = -data.currentTranslate;
		}
		if (params.cssMode) {
			return;
		}
		if (swiper.params.freeMode && params.freeMode.enabled) {
			swiper.freeMode.onTouchEnd({
				currentPos
			});
			return;
		}
		// Find current slide
		let stopIndex = 0;
		let groupSize = swiper.slidesSizesGrid[0];
		for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
			const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
			if (typeof slidesGrid[i + increment] !== 'undefined') {
				if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
					stopIndex = i;
					groupSize = slidesGrid[i + increment] - slidesGrid[i];
				}
			} else if (currentPos >= slidesGrid[i]) {
				stopIndex = i;
				groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
			}
		}
		let rewindFirstIndex = null;
		let rewindLastIndex = null;
		if (params.rewind) {
			if (swiper.isBeginning) {
				rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
			} else if (swiper.isEnd) {
				rewindFirstIndex = 0;
			}
		}
		// Find current slide size
		const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
		const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
		if (timeDiff > params.longSwipesMs) {
			// Long touches
			if (!params.longSwipes) {
				swiper.slideTo(swiper.activeIndex);
				return;
			}
			if (swiper.swipeDirection === 'next') {
				if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
				else swiper.slideTo(stopIndex);
			}
			if (swiper.swipeDirection === 'prev') {
				if (ratio > 1 - params.longSwipesRatio) {
					swiper.slideTo(stopIndex + increment);
				} else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
					swiper.slideTo(rewindLastIndex);
				} else {
					swiper.slideTo(stopIndex);
				}
			}
		} else {
			// Short swipes
			if (!params.shortSwipes) {
				swiper.slideTo(swiper.activeIndex);
				return;
			}
			const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
			if (!isNavButtonTarget) {
				if (swiper.swipeDirection === 'next') {
					swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
				}
				if (swiper.swipeDirection === 'prev') {
					swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
				}
			} else if (e.target === swiper.navigation.nextEl) {
				swiper.slideTo(stopIndex + increment);
			} else {
				swiper.slideTo(stopIndex);
			}
		}
	}

	function onResize() {
		const swiper = this;
		const {
			params,
			el
		} = swiper;
		if (el && el.offsetWidth === 0) return;
		// Breakpoints
		if (params.breakpoints) {
			swiper.setBreakpoint();
		}
		// Save locks
		const {
			allowSlideNext,
			allowSlidePrev,
			snapGrid
		} = swiper;
		const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
		// Disable locks on resize
		swiper.allowSlideNext = true;
		swiper.allowSlidePrev = true;
		swiper.updateSize();
		swiper.updateSlides();
		swiper.updateSlidesClasses();
		const isVirtualLoop = isVirtual && params.loop;
		if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
			swiper.slideTo(swiper.slides.length - 1, 0, false, true);
		} else {
			if (swiper.params.loop && !isVirtual) {
				swiper.slideToLoop(swiper.realIndex, 0, false, true);
			} else {
				swiper.slideTo(swiper.activeIndex, 0, false, true);
			}
		}
		if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
			clearTimeout(swiper.autoplay.resizeTimeout);
			swiper.autoplay.resizeTimeout = setTimeout(() => {
				if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
					swiper.autoplay.resume();
				}
			}, 500);
		}
		// Return locks after resize
		swiper.allowSlidePrev = allowSlidePrev;
		swiper.allowSlideNext = allowSlideNext;
		if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
			swiper.checkOverflow();
		}
	}

	function onClick(e) {
		const swiper = this;
		if (!swiper.enabled) return;
		if (!swiper.allowClick) {
			if (swiper.params.preventClicks) e.preventDefault();
			if (swiper.params.preventClicksPropagation && swiper.animating) {
				e.stopPropagation();
				e.stopImmediatePropagation();
			}
		}
	}

	function onScroll() {
		const swiper = this;
		const {
			wrapperEl,
			rtlTranslate,
			enabled
		} = swiper;
		if (!enabled) return;
		swiper.previousTranslate = swiper.translate;
		if (swiper.isHorizontal()) {
			swiper.translate = -wrapperEl.scrollLeft;
		} else {
			swiper.translate = -wrapperEl.scrollTop;
		}
		// eslint-disable-next-line
		if (swiper.translate === 0) swiper.translate = 0;
		swiper.updateActiveIndex();
		swiper.updateSlidesClasses();
		let newProgress;
		const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
		if (translatesDiff === 0) {
			newProgress = 0;
		} else {
			newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
		}
		if (newProgress !== swiper.progress) {
			swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
		}
		swiper.emit('setTranslate', swiper.translate, false);
	}

	function onLoad(e) {
		const swiper = this;
		processLazyPreloader(swiper, e.target);
		if (swiper.params.cssMode || swiper.params.slidesPerView !== 'auto' && !swiper.params.autoHeight) {
			return;
		}
		swiper.update();
	}
	let dummyEventAttached = false;

	function dummyEventListener() {}
	const events = (swiper, method) => {
		const document = getDocument();
		const {
			params,
			el,
			wrapperEl,
			device
		} = swiper;
		const capture = !!params.nested;
		const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
		const swiperMethod = method;
		// Touch Events
		el[domMethod]('pointerdown', swiper.onTouchStart, {
			passive: false
		});
		document[domMethod]('pointermove', swiper.onTouchMove, {
			passive: false,
			capture
		});
		document[domMethod]('pointerup', swiper.onTouchEnd, {
			passive: true
		});
		document[domMethod]('pointercancel', swiper.onTouchEnd, {
			passive: true
		});
		document[domMethod]('pointerout', swiper.onTouchEnd, {
			passive: true
		});
		document[domMethod]('pointerleave', swiper.onTouchEnd, {
			passive: true
		});
		// Prevent Links Clicks
		if (params.preventClicks || params.preventClicksPropagation) {
			el[domMethod]('click', swiper.onClick, true);
		}
		if (params.cssMode) {
			wrapperEl[domMethod]('scroll', swiper.onScroll);
		}
		// Resize handler
		if (params.updateOnWindowResize) {
			swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
		} else {
			swiper[swiperMethod]('observerUpdate', onResize, true);
		}
		// Images loader
		el[domMethod]('load', swiper.onLoad, {
			capture: true
		});
	};

	function attachEvents() {
		const swiper = this;
		const document = getDocument();
		const {
			params
		} = swiper;
		swiper.onTouchStart = onTouchStart.bind(swiper);
		swiper.onTouchMove = onTouchMove.bind(swiper);
		swiper.onTouchEnd = onTouchEnd.bind(swiper);
		if (params.cssMode) {
			swiper.onScroll = onScroll.bind(swiper);
		}
		swiper.onClick = onClick.bind(swiper);
		swiper.onLoad = onLoad.bind(swiper);
		if (!dummyEventAttached) {
			document.addEventListener('touchstart', dummyEventListener);
			dummyEventAttached = true;
		}
		events(swiper, 'on');
	}

	function detachEvents() {
		const swiper = this;
		events(swiper, 'off');
	}
	var events$1 = {
		attachEvents,
		detachEvents
	};
	const isGridEnabled = (swiper, params) => {
		return swiper.grid && params.grid && params.grid.rows > 1;
	};

	function setBreakpoint() {
		const swiper = this;
		const {
			realIndex,
			initialized,
			params,
			el
		} = swiper;
		const breakpoints = params.breakpoints;
		if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
		// Get breakpoint for window width and update parameters
		const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
		if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
		const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
		const breakpointParams = breakpointOnlyParams || swiper.originalParams;
		const wasMultiRow = isGridEnabled(swiper, params);
		const isMultiRow = isGridEnabled(swiper, breakpointParams);
		const wasEnabled = params.enabled;
		if (wasMultiRow && !isMultiRow) {
			el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
			swiper.emitContainerClasses();
		} else if (!wasMultiRow && isMultiRow) {
			el.classList.add(`${params.containerModifierClass}grid`);
			if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
				el.classList.add(`${params.containerModifierClass}grid-column`);
			}
			swiper.emitContainerClasses();
		}
		// Toggle navigation, pagination, scrollbar
		['navigation', 'pagination', 'scrollbar'].forEach(prop => {
			const wasModuleEnabled = params[prop] && params[prop].enabled;
			const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
			if (wasModuleEnabled && !isModuleEnabled) {
				swiper[prop].disable();
			}
			if (!wasModuleEnabled && isModuleEnabled) {
				swiper[prop].enable();
			}
		});
		const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
		const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
		if (directionChanged && initialized) {
			swiper.changeDirection();
		}
		extend(swiper.params, breakpointParams);
		const isEnabled = swiper.params.enabled;
		Object.assign(swiper, {
			allowTouchMove: swiper.params.allowTouchMove,
			allowSlideNext: swiper.params.allowSlideNext,
			allowSlidePrev: swiper.params.allowSlidePrev
		});
		if (wasEnabled && !isEnabled) {
			swiper.disable();
		} else if (!wasEnabled && isEnabled) {
			swiper.enable();
		}
		swiper.currentBreakpoint = breakpoint;
		swiper.emit('_beforeBreakpoint', breakpointParams);
		if (needsReLoop && initialized) {
			swiper.loopDestroy();
			swiper.loopCreate(realIndex);
			swiper.updateSlides();
		}
		swiper.emit('breakpoint', breakpointParams);
	}

	function getBreakpoint(breakpoints, base, containerEl) {
		if (base === void 0) {
			base = 'window';
		}
		if (!breakpoints || base === 'container' && !containerEl) return undefined;
		let breakpoint = false;
		const window = getWindow();
		const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
		const points = Object.keys(breakpoints).map(point => {
			if (typeof point === 'string' && point.indexOf('@') === 0) {
				const minRatio = parseFloat(point.substr(1));
				const value = currentHeight * minRatio;
				return {
					value,
					point
				};
			}
			return {
				value: point,
				point
			};
		});
		points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
		for (let i = 0; i < points.length; i += 1) {
			const {
				point,
				value
			} = points[i];
			if (base === 'window') {
				if (window.matchMedia(`(min-width: ${value}px)`).matches) {
					breakpoint = point;
				}
			} else if (value <= containerEl.clientWidth) {
				breakpoint = point;
			}
		}
		return breakpoint || 'max';
	}
	var breakpoints = {
		setBreakpoint,
		getBreakpoint
	};

	function prepareClasses(entries, prefix) {
		const resultClasses = [];
		entries.forEach(item => {
			if (typeof item === 'object') {
				Object.keys(item).forEach(classNames => {
					if (item[classNames]) {
						resultClasses.push(prefix + classNames);
					}
				});
			} else if (typeof item === 'string') {
				resultClasses.push(prefix + item);
			}
		});
		return resultClasses;
	}

	function addClasses() {
		const swiper = this;
		const {
			classNames,
			params,
			rtl,
			el,
			device
		} = swiper;
		// prettier-ignore
		const suffixes = prepareClasses(['initialized', params.direction, {
			'free-mode': swiper.params.freeMode && params.freeMode.enabled
		}, {
			'autoheight': params.autoHeight
		}, {
			'rtl': rtl
		}, {
			'grid': params.grid && params.grid.rows > 1
		}, {
			'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
		}, {
			'android': device.android
		}, {
			'ios': device.ios
		}, {
			'css-mode': params.cssMode
		}, {
			'centered': params.cssMode && params.centeredSlides
		}, {
			'watch-progress': params.watchSlidesProgress
		}], params.containerModifierClass);
		classNames.push(...suffixes);
		el.classList.add(...classNames);
		swiper.emitContainerClasses();
	}

	function removeClasses() {
		const swiper = this;
		const {
			el,
			classNames
		} = swiper;
		el.classList.remove(...classNames);
		swiper.emitContainerClasses();
	}
	var classes = {
		addClasses,
		removeClasses
	};

	function checkOverflow() {
		const swiper = this;
		const {
			isLocked: wasLocked,
			params
		} = swiper;
		const {
			slidesOffsetBefore
		} = params;
		if (slidesOffsetBefore) {
			const lastSlideIndex = swiper.slides.length - 1;
			const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
			swiper.isLocked = swiper.size > lastSlideRightEdge;
		} else {
			swiper.isLocked = swiper.snapGrid.length === 1;
		}
		if (params.allowSlideNext === true) {
			swiper.allowSlideNext = !swiper.isLocked;
		}
		if (params.allowSlidePrev === true) {
			swiper.allowSlidePrev = !swiper.isLocked;
		}
		if (wasLocked && wasLocked !== swiper.isLocked) {
			swiper.isEnd = false;
		}
		if (wasLocked !== swiper.isLocked) {
			swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
		}
	}
	var checkOverflow$1 = {
		checkOverflow
	};
	var defaults = {
		init: true,
		direction: 'horizontal',
		oneWayMovement: false,
		touchEventsTarget: 'wrapper',
		initialSlide: 0,
		speed: 300,
		cssMode: false,
		updateOnWindowResize: true,
		resizeObserver: true,
		nested: false,
		createElements: false,
		enabled: true,
		focusableElements: 'input, select, option, textarea, button, video, label',
		// Overrides
		width: null,
		height: null,
		//
		preventInteractionOnTransition: false,
		// ssr
		userAgent: null,
		url: null,
		// To support iOS's swipe-to-go-back gesture (when being used in-app).
		edgeSwipeDetection: false,
		edgeSwipeThreshold: 20,
		// Autoheight
		autoHeight: false,
		// Set wrapper width
		setWrapperSize: false,
		// Virtual Translate
		virtualTranslate: false,
		// Effects
		effect: 'slide',
		// 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
		// Breakpoints
		breakpoints: undefined,
		breakpointsBase: 'window',
		// Slides grid
		spaceBetween: 0,
		slidesPerView: 1,
		slidesPerGroup: 1,
		slidesPerGroupSkip: 0,
		slidesPerGroupAuto: false,
		centeredSlides: false,
		centeredSlidesBounds: false,
		slidesOffsetBefore: 0,
		// in px
		slidesOffsetAfter: 0,
		// in px
		normalizeSlideIndex: true,
		centerInsufficientSlides: false,
		// Disable swiper and hide navigation when container not overflow
		watchOverflow: true,
		// Round length
		roundLengths: false,
		// Touches
		touchRatio: 1,
		touchAngle: 45,
		simulateTouch: true,
		shortSwipes: true,
		longSwipes: true,
		longSwipesRatio: 0.5,
		longSwipesMs: 300,
		followFinger: true,
		allowTouchMove: true,
		threshold: 5,
		touchMoveStopPropagation: false,
		touchStartPreventDefault: true,
		touchStartForcePreventDefault: false,
		touchReleaseOnEdges: false,
		// Unique Navigation Elements
		uniqueNavElements: true,
		// Resistance
		resistance: true,
		resistanceRatio: 0.85,
		// Progress
		watchSlidesProgress: false,
		// Cursor
		grabCursor: false,
		// Clicks
		preventClicks: true,
		preventClicksPropagation: true,
		slideToClickedSlide: false,
		// loop
		loop: false,
		loopedSlides: null,
		loopPreventsSliding: true,
		// rewind
		rewind: false,
		// Swiping/no swiping
		allowSlidePrev: true,
		allowSlideNext: true,
		swipeHandler: null,
		// '.swipe-handler',
		noSwiping: true,
		noSwipingClass: 'swiper-no-swiping',
		noSwipingSelector: null,
		// Passive Listeners
		passiveListeners: true,
		maxBackfaceHiddenSlides: 10,
		// NS
		containerModifierClass: 'swiper-',
		// NEW
		slideClass: 'swiper-slide',
		slideActiveClass: 'swiper-slide-active',
		slideVisibleClass: 'swiper-slide-visible',
		slideNextClass: 'swiper-slide-next',
		slidePrevClass: 'swiper-slide-prev',
		wrapperClass: 'swiper-wrapper',
		lazyPreloaderClass: 'swiper-lazy-preloader',
		lazyPreloadPrevNext: 0,
		// Callbacks
		runCallbacksOnInit: true,
		// Internals
		_emitClasses: false
	};

	function moduleExtendParams(params, allModulesParams) {
		return function extendParams(obj) {
			if (obj === void 0) {
				obj = {};
			}
			const moduleParamName = Object.keys(obj)[0];
			const moduleParams = obj[moduleParamName];
			if (typeof moduleParams !== 'object' || moduleParams === null) {
				extend(allModulesParams, obj);
				return;
			}
			if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
				params[moduleParamName] = {
					auto: true
				};
			}
			if (!(moduleParamName in params && 'enabled' in moduleParams)) {
				extend(allModulesParams, obj);
				return;
			}
			if (params[moduleParamName] === true) {
				params[moduleParamName] = {
					enabled: true
				};
			}
			if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
				params[moduleParamName].enabled = true;
			}
			if (!params[moduleParamName]) params[moduleParamName] = {
				enabled: false
			};
			extend(allModulesParams, obj);
		};
	}
	/* eslint no-param-reassign: "off" */
	const prototypes = {
		eventsEmitter,
		update,
		translate,
		transition,
		slide,
		loop,
		grabCursor,
		events: events$1,
		breakpoints,
		checkOverflow: checkOverflow$1,
		classes
	};
	const extendedDefaults = {};
	class Swiper {
		constructor() {
			let el;
			let params;
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
			if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
				params = args[0];
			} else {
				[el, params] = args;
			}
			if (!params) params = {};
			params = extend({}, params);
			if (el && !params.el) params.el = el;
			const document = getDocument();
			if (params.el && typeof params.el === 'string' && document.querySelectorAll(params.el).length > 1) {
				const swipers = [];
				document.querySelectorAll(params.el).forEach(containerEl => {
					const newParams = extend({}, params, {
						el: containerEl
					});
					swipers.push(new Swiper(newParams));
				});
				// eslint-disable-next-line no-constructor-return
				return swipers;
			}
			// Swiper Instance
			const swiper = this;
			swiper.__swiper__ = true;
			swiper.support = getSupport();
			swiper.device = getDevice({
				userAgent: params.userAgent
			});
			swiper.browser = getBrowser();
			swiper.eventsListeners = {};
			swiper.eventsAnyListeners = [];
			swiper.modules = [...swiper.__modules__];
			if (params.modules && Array.isArray(params.modules)) {
				swiper.modules.push(...params.modules);
			}
			const allModulesParams = {};
			swiper.modules.forEach(mod => {
				mod({
					params,
					swiper,
					extendParams: moduleExtendParams(params, allModulesParams),
					on: swiper.on.bind(swiper),
					once: swiper.once.bind(swiper),
					off: swiper.off.bind(swiper),
					emit: swiper.emit.bind(swiper)
				});
			});
			// Extend defaults with modules params
			const swiperParams = extend({}, defaults, allModulesParams);
			// Extend defaults with passed params
			swiper.params = extend({}, swiperParams, extendedDefaults, params);
			swiper.originalParams = extend({}, swiper.params);
			swiper.passedParams = extend({}, params);
			// add event listeners
			if (swiper.params && swiper.params.on) {
				Object.keys(swiper.params.on).forEach(eventName => {
					swiper.on(eventName, swiper.params.on[eventName]);
				});
			}
			if (swiper.params && swiper.params.onAny) {
				swiper.onAny(swiper.params.onAny);
			}
			// Extend Swiper
			Object.assign(swiper, {
				enabled: swiper.params.enabled,
				el,
				// Classes
				classNames: [],
				// Slides
				slides: [],
				slidesGrid: [],
				snapGrid: [],
				slidesSizesGrid: [],
				// isDirection
				isHorizontal() {
					return swiper.params.direction === 'horizontal';
				},
				isVertical() {
					return swiper.params.direction === 'vertical';
				},
				// Indexes
				activeIndex: 0,
				realIndex: 0,
				//
				isBeginning: true,
				isEnd: false,
				// Props
				translate: 0,
				previousTranslate: 0,
				progress: 0,
				velocity: 0,
				animating: false,
				cssOverflowAdjustment() {
					// Returns 0 unless `translate` is > 2**23
					// Should be subtracted from css values to prevent overflow
					return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
				},
				// Locks
				allowSlideNext: swiper.params.allowSlideNext,
				allowSlidePrev: swiper.params.allowSlidePrev,
				// Touch Events
				touchEventsData: {
					isTouched: undefined,
					isMoved: undefined,
					allowTouchCallbacks: undefined,
					touchStartTime: undefined,
					isScrolling: undefined,
					currentTranslate: undefined,
					startTranslate: undefined,
					allowThresholdMove: undefined,
					// Form elements to match
					focusableElements: swiper.params.focusableElements,
					// Last click time
					lastClickTime: 0,
					clickTimeout: undefined,
					// Velocities
					velocities: [],
					allowMomentumBounce: undefined,
					startMoving: undefined,
					evCache: []
				},
				// Clicks
				allowClick: true,
				// Touches
				allowTouchMove: swiper.params.allowTouchMove,
				touches: {
					startX: 0,
					startY: 0,
					currentX: 0,
					currentY: 0,
					diff: 0
				},
				// Images
				imagesToLoad: [],
				imagesLoaded: 0
			});
			swiper.emit('_swiper');
			// Init
			if (swiper.params.init) {
				swiper.init();
			}
			// Return app instance
			// eslint-disable-next-line no-constructor-return
			return swiper;
		}
		getSlideIndex(slideEl) {
			const {
				slidesEl,
				params
			} = this;
			const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
			const firstSlideIndex = elementIndex(slides[0]);
			return elementIndex(slideEl) - firstSlideIndex;
		}
		getSlideIndexByData(index) {
			return this.getSlideIndex(this.slides.filter(slideEl => slideEl.getAttribute('data-swiper-slide-index') * 1 === index)[0]);
		}
		recalcSlides() {
			const swiper = this;
			const {
				slidesEl,
				params
			} = swiper;
			swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
		}
		enable() {
			const swiper = this;
			if (swiper.enabled) return;
			swiper.enabled = true;
			if (swiper.params.grabCursor) {
				swiper.setGrabCursor();
			}
			swiper.emit('enable');
		}
		disable() {
			const swiper = this;
			if (!swiper.enabled) return;
			swiper.enabled = false;
			if (swiper.params.grabCursor) {
				swiper.unsetGrabCursor();
			}
			swiper.emit('disable');
		}
		setProgress(progress, speed) {
			const swiper = this;
			progress = Math.min(Math.max(progress, 0), 1);
			const min = swiper.minTranslate();
			const max = swiper.maxTranslate();
			const current = (max - min) * progress + min;
			swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
			swiper.updateActiveIndex();
			swiper.updateSlidesClasses();
		}
		emitContainerClasses() {
			const swiper = this;
			if (!swiper.params._emitClasses || !swiper.el) return;
			const cls = swiper.el.className.split(' ').filter(className => {
				return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
			});
			swiper.emit('_containerClasses', cls.join(' '));
		}
		getSlideClasses(slideEl) {
			const swiper = this;
			if (swiper.destroyed) return '';
			return slideEl.className.split(' ').filter(className => {
				return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
			}).join(' ');
		}
		emitSlidesClasses() {
			const swiper = this;
			if (!swiper.params._emitClasses || !swiper.el) return;
			const updates = [];
			swiper.slides.forEach(slideEl => {
				const classNames = swiper.getSlideClasses(slideEl);
				updates.push({
					slideEl,
					classNames
				});
				swiper.emit('_slideClass', slideEl, classNames);
			});
			swiper.emit('_slideClasses', updates);
		}
		slidesPerViewDynamic(view, exact) {
			if (view === void 0) {
				view = 'current';
			}
			if (exact === void 0) {
				exact = false;
			}
			const swiper = this;
			const {
				params,
				slides,
				slidesGrid,
				slidesSizesGrid,
				size: swiperSize,
				activeIndex
			} = swiper;
			let spv = 1;
			if (params.centeredSlides) {
				let slideSize = slides[activeIndex].swiperSlideSize;
				let breakLoop;
				for (let i = activeIndex + 1; i < slides.length; i += 1) {
					if (slides[i] && !breakLoop) {
						slideSize += slides[i].swiperSlideSize;
						spv += 1;
						if (slideSize > swiperSize) breakLoop = true;
					}
				}
				for (let i = activeIndex - 1; i >= 0; i -= 1) {
					if (slides[i] && !breakLoop) {
						slideSize += slides[i].swiperSlideSize;
						spv += 1;
						if (slideSize > swiperSize) breakLoop = true;
					}
				}
			} else {
				// eslint-disable-next-line
				if (view === 'current') {
					for (let i = activeIndex + 1; i < slides.length; i += 1) {
						const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
						if (slideInView) {
							spv += 1;
						}
					}
				} else {
					// previous
					for (let i = activeIndex - 1; i >= 0; i -= 1) {
						const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
						if (slideInView) {
							spv += 1;
						}
					}
				}
			}
			return spv;
		}
		update() {
			const swiper = this;
			if (!swiper || swiper.destroyed) return;
			const {
				snapGrid,
				params
			} = swiper;
			// Breakpoints
			if (params.breakpoints) {
				swiper.setBreakpoint();
			}
			[...swiper.el.querySelectorAll('[loading="lazy"]')].forEach(imageEl => {
				if (imageEl.complete) {
					processLazyPreloader(swiper, imageEl);
				}
			});
			swiper.updateSize();
			swiper.updateSlides();
			swiper.updateProgress();
			swiper.updateSlidesClasses();

			function setTranslate() {
				const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
				const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
				swiper.setTranslate(newTranslate);
				swiper.updateActiveIndex();
				swiper.updateSlidesClasses();
			}
			let translated;
			if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
				setTranslate();
				if (swiper.params.autoHeight) {
					swiper.updateAutoHeight();
				}
			} else {
				if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
					const slides = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
					translated = swiper.slideTo(slides.length - 1, 0, false, true);
				} else {
					translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
				}
				if (!translated) {
					setTranslate();
				}
			}
			if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
				swiper.checkOverflow();
			}
			swiper.emit('update');
		}
		changeDirection(newDirection, needUpdate) {
			if (needUpdate === void 0) {
				needUpdate = true;
			}
			const swiper = this;
			const currentDirection = swiper.params.direction;
			if (!newDirection) {
				// eslint-disable-next-line
				newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
			}
			if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
				return swiper;
			}
			swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
			swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
			swiper.emitContainerClasses();
			swiper.params.direction = newDirection;
			swiper.slides.forEach(slideEl => {
				if (newDirection === 'vertical') {
					slideEl.style.width = '';
				} else {
					slideEl.style.height = '';
				}
			});
			swiper.emit('changeDirection');
			if (needUpdate) swiper.update();
			return swiper;
		}
		changeLanguageDirection(direction) {
			const swiper = this;
			if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;
			swiper.rtl = direction === 'rtl';
			swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;
			if (swiper.rtl) {
				swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
				swiper.el.dir = 'rtl';
			} else {
				swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
				swiper.el.dir = 'ltr';
			}
			swiper.update();
		}
		mount(element) {
			const swiper = this;
			if (swiper.mounted) return true;
			// Find el
			let el = element || swiper.params.el;
			if (typeof el === 'string') {
				el = document.querySelector(el);
			}
			if (!el) {
				return false;
			}
			el.swiper = swiper;
			if (el.shadowEl) {
				swiper.isElement = true;
			}
			const getWrapperSelector = () => {
				return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
			};
			const getWrapper = () => {
				if (el && el.shadowRoot && el.shadowRoot.querySelector) {
					const res = el.shadowRoot.querySelector(getWrapperSelector());
					// Children needs to return slot items
					return res;
				}
				return elementChildren(el, getWrapperSelector())[0];
			};
			// Find Wrapper
			let wrapperEl = getWrapper();
			if (!wrapperEl && swiper.params.createElements) {
				wrapperEl = createElement('div', swiper.params.wrapperClass);
				el.append(wrapperEl);
				elementChildren(el, `.${swiper.params.slideClass}`).forEach(slideEl => {
					wrapperEl.append(slideEl);
				});
			}
			Object.assign(swiper, {
				el,
				wrapperEl,
				slidesEl: swiper.isElement ? el : wrapperEl,
				mounted: true,
				// RTL
				rtl: el.dir.toLowerCase() === 'rtl' || elementStyle(el, 'direction') === 'rtl',
				rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || elementStyle(el, 'direction') === 'rtl'),
				wrongRTL: elementStyle(wrapperEl, 'display') === '-webkit-box'
			});
			return true;
		}
		init(el) {
			const swiper = this;
			if (swiper.initialized) return swiper;
			const mounted = swiper.mount(el);
			if (mounted === false) return swiper;
			swiper.emit('beforeInit');
			// Set breakpoint
			if (swiper.params.breakpoints) {
				swiper.setBreakpoint();
			}
			// Add Classes
			swiper.addClasses();
			// Update size
			swiper.updateSize();
			// Update slides
			swiper.updateSlides();
			if (swiper.params.watchOverflow) {
				swiper.checkOverflow();
			}
			// Set Grab Cursor
			if (swiper.params.grabCursor && swiper.enabled) {
				swiper.setGrabCursor();
			}
			// Slide To Initial Slide
			if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
				swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
			} else {
				swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
			}
			// Create loop
			if (swiper.params.loop) {
				swiper.loopCreate();
			}
			// Attach events
			swiper.attachEvents();
			[...swiper.el.querySelectorAll('[loading="lazy"]')].forEach(imageEl => {
				if (imageEl.complete) {
					processLazyPreloader(swiper, imageEl);
				} else {
					imageEl.addEventListener('load', e => {
						processLazyPreloader(swiper, e.target);
					});
				}
			});
			preload(swiper);
			// Init Flag
			swiper.initialized = true;
			preload(swiper);
			// Emit
			swiper.emit('init');
			swiper.emit('afterInit');
			return swiper;
		}
		destroy(deleteInstance, cleanStyles) {
			if (deleteInstance === void 0) {
				deleteInstance = true;
			}
			if (cleanStyles === void 0) {
				cleanStyles = true;
			}
			const swiper = this;
			const {
				params,
				el,
				wrapperEl,
				slides
			} = swiper;
			if (typeof swiper.params === 'undefined' || swiper.destroyed) {
				return null;
			}
			swiper.emit('beforeDestroy');
			// Init Flag
			swiper.initialized = false;
			// Detach events
			swiper.detachEvents();
			// Destroy loop
			if (params.loop) {
				swiper.loopDestroy();
			}
			// Cleanup styles
			if (cleanStyles) {
				swiper.removeClasses();
				el.removeAttribute('style');
				wrapperEl.removeAttribute('style');
				if (slides && slides.length) {
					slides.forEach(slideEl => {
						slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
						slideEl.removeAttribute('style');
						slideEl.removeAttribute('data-swiper-slide-index');
					});
				}
			}
			swiper.emit('destroy');
			// Detach emitter events
			Object.keys(swiper.eventsListeners).forEach(eventName => {
				swiper.off(eventName);
			});
			if (deleteInstance !== false) {
				swiper.el.swiper = null;
				deleteProps(swiper);
			}
			swiper.destroyed = true;
			return null;
		}
		static extendDefaults(newDefaults) {
			extend(extendedDefaults, newDefaults);
		}
		static get extendedDefaults() {
			return extendedDefaults;
		}
		static get defaults() {
			return defaults;
		}
		static installModule(mod) {
			if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
			const modules = Swiper.prototype.__modules__;
			if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
				modules.push(mod);
			}
		}
		static use(module) {
			if (Array.isArray(module)) {
				module.forEach(m => Swiper.installModule(m));
				return Swiper;
			}
			Swiper.installModule(module);
			return Swiper;
		}
	}
	Object.keys(prototypes).forEach(prototypeGroup => {
		Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
			Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
		});
	});
	Swiper.use([Resize, Observer]);

	function Virtual(_ref) {
		let {
			swiper,
			extendParams,
			on,
			emit
		} = _ref;
		extendParams({
			virtual: {
				enabled: false,
				slides: [],
				cache: true,
				renderSlide: null,
				renderExternal: null,
				renderExternalUpdate: true,
				addSlidesBefore: 0,
				addSlidesAfter: 0
			}
		});
		let cssModeTimeout;
		const document = getDocument();
		swiper.virtual = {
			cache: {},
			from: undefined,
			to: undefined,
			slides: [],
			offset: 0,
			slidesGrid: []
		};
		const tempDOM = document.createElement('div');

		function renderSlide(slide, index) {
			const params = swiper.params.virtual;
			if (params.cache && swiper.virtual.cache[index]) {
				return swiper.virtual.cache[index];
			}
			// eslint-disable-next-line
			let slideEl;
			if (params.renderSlide) {
				slideEl = params.renderSlide.call(swiper, slide, index);
				if (typeof slideEl === 'string') {
					tempDOM.innerHTML = slideEl;
					slideEl = tempDOM.children[0];
				}
			} else if (swiper.isElement) {
				slideEl = createElement('swiper-slide');
			} else {
				slideEl = createElement('div', swiper.params.slideClass);
			}
			slideEl.setAttribute('data-swiper-slide-index', index);
			if (!params.renderSlide) {
				slideEl.innerHTML = slide;
			}
			if (params.cache) swiper.virtual.cache[index] = slideEl;
			return slideEl;
		}

		function update(force) {
			const {
				slidesPerView,
				slidesPerGroup,
				centeredSlides,
				loop: isLoop
			} = swiper.params;
			const {
				addSlidesBefore,
				addSlidesAfter
			} = swiper.params.virtual;
			const {
				from: previousFrom,
				to: previousTo,
				slides,
				slidesGrid: previousSlidesGrid,
				offset: previousOffset
			} = swiper.virtual;
			if (!swiper.params.cssMode) {
				swiper.updateActiveIndex();
			}
			const activeIndex = swiper.activeIndex || 0;
			let offsetProp;
			if (swiper.rtlTranslate) offsetProp = 'right';
			else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
			let slidesAfter;
			let slidesBefore;
			if (centeredSlides) {
				slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
				slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
			} else {
				slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
				slidesBefore = (isLoop ? slidesPerView : slidesPerGroup) + addSlidesBefore;
			}
			let from = activeIndex - slidesBefore;
			let to = activeIndex + slidesAfter;
			if (!isLoop) {
				from = Math.max(from, 0);
				to = Math.min(to, slides.length - 1);
			}
			let offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
			if (isLoop && activeIndex >= slidesBefore) {
				from -= slidesBefore;
				if (!centeredSlides) offset += swiper.slidesGrid[0];
			} else if (isLoop && activeIndex < slidesBefore) {
				from = -slidesBefore;
				if (centeredSlides) offset += swiper.slidesGrid[0];
			}
			Object.assign(swiper.virtual, {
				from,
				to,
				offset,
				slidesGrid: swiper.slidesGrid,
				slidesBefore,
				slidesAfter
			});

			function onRendered() {
				swiper.updateSlides();
				swiper.updateProgress();
				swiper.updateSlidesClasses();
				emit('virtualUpdate');
			}
			if (previousFrom === from && previousTo === to && !force) {
				if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
					swiper.slides.forEach(slideEl => {
						slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
					});
				}
				swiper.updateProgress();
				emit('virtualUpdate');
				return;
			}
			if (swiper.params.virtual.renderExternal) {
				swiper.params.virtual.renderExternal.call(swiper, {
					offset,
					from,
					to,
					slides: function getSlides() {
						const slidesToRender = [];
						for (let i = from; i <= to; i += 1) {
							slidesToRender.push(slides[i]);
						}
						return slidesToRender;
					}()
				});
				if (swiper.params.virtual.renderExternalUpdate) {
					onRendered();
				} else {
					emit('virtualUpdate');
				}
				return;
			}
			const prependIndexes = [];
			const appendIndexes = [];
			const getSlideIndex = index => {
				let slideIndex = index;
				if (index < 0) {
					slideIndex = slides.length + index;
				} else if (slideIndex >= slides.length) {
					// eslint-disable-next-line
					slideIndex = slideIndex - slides.length;
				}
				return slideIndex;
			};
			if (force) {
				swiper.slidesEl.querySelectorAll(`.${swiper.params.slideClass}, swiper-slide`).forEach(slideEl => {
					slideEl.remove();
				});
			} else {
				for (let i = previousFrom; i <= previousTo; i += 1) {
					if (i < from || i > to) {
						const slideIndex = getSlideIndex(i);
						swiper.slidesEl.querySelectorAll(`.${swiper.params.slideClass}[data-swiper-slide-index="${slideIndex}"], swiper-slide[data-swiper-slide-index="${slideIndex}"]`).forEach(slideEl => {
							slideEl.remove();
						});
					}
				}
			}
			const loopFrom = isLoop ? -slides.length : 0;
			const loopTo = isLoop ? slides.length * 2 : slides.length;
			for (let i = loopFrom; i < loopTo; i += 1) {
				if (i >= from && i <= to) {
					const slideIndex = getSlideIndex(i);
					if (typeof previousTo === 'undefined' || force) {
						appendIndexes.push(slideIndex);
					} else {
						if (i > previousTo) appendIndexes.push(slideIndex);
						if (i < previousFrom) prependIndexes.push(slideIndex);
					}
				}
			}
			appendIndexes.forEach(index => {
				swiper.slidesEl.append(renderSlide(slides[index], index));
			});
			if (isLoop) {
				for (let i = prependIndexes.length - 1; i >= 0; i -= 1) {
					const index = prependIndexes[i];
					swiper.slidesEl.prepend(renderSlide(slides[index], index));
				}
			} else {
				prependIndexes.sort((a, b) => b - a);
				prependIndexes.forEach(index => {
					swiper.slidesEl.prepend(renderSlide(slides[index], index));
				});
			}
			elementChildren(swiper.slidesEl, '.swiper-slide, swiper-slide').forEach(slideEl => {
				slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
			});
			onRendered();
		}

		function appendSlide(slides) {
			if (typeof slides === 'object' && 'length' in slides) {
				for (let i = 0; i < slides.length; i += 1) {
					if (slides[i]) swiper.virtual.slides.push(slides[i]);
				}
			} else {
				swiper.virtual.slides.push(slides);
			}
			update(true);
		}

		function prependSlide(slides) {
			const activeIndex = swiper.activeIndex;
			let newActiveIndex = activeIndex + 1;
			let numberOfNewSlides = 1;
			if (Array.isArray(slides)) {
				for (let i = 0; i < slides.length; i += 1) {
					if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
				}
				newActiveIndex = activeIndex + slides.length;
				numberOfNewSlides = slides.length;
			} else {
				swiper.virtual.slides.unshift(slides);
			}
			if (swiper.params.virtual.cache) {
				const cache = swiper.virtual.cache;
				const newCache = {};
				Object.keys(cache).forEach(cachedIndex => {
					const cachedEl = cache[cachedIndex];
					const cachedElIndex = cachedEl.getAttribute('data-swiper-slide-index');
					if (cachedElIndex) {
						cachedEl.setAttribute('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
					}
					newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
				});
				swiper.virtual.cache = newCache;
			}
			update(true);
			swiper.slideTo(newActiveIndex, 0);
		}

		function removeSlide(slidesIndexes) {
			if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
			let activeIndex = swiper.activeIndex;
			if (Array.isArray(slidesIndexes)) {
				for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
					swiper.virtual.slides.splice(slidesIndexes[i], 1);
					if (swiper.params.virtual.cache) {
						delete swiper.virtual.cache[slidesIndexes[i]];
					}
					if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
					activeIndex = Math.max(activeIndex, 0);
				}
			} else {
				swiper.virtual.slides.splice(slidesIndexes, 1);
				if (swiper.params.virtual.cache) {
					delete swiper.virtual.cache[slidesIndexes];
				}
				if (slidesIndexes < activeIndex) activeIndex -= 1;
				activeIndex = Math.max(activeIndex, 0);
			}
			update(true);
			swiper.slideTo(activeIndex, 0);
		}

		function removeAllSlides() {
			swiper.virtual.slides = [];
			if (swiper.params.virtual.cache) {
				swiper.virtual.cache = {};
			}
			update(true);
			swiper.slideTo(0, 0);
		}
		on('beforeInit', () => {
			if (!swiper.params.virtual.enabled) return;
			let domSlidesAssigned;
			if (typeof swiper.passedParams.virtual.slides === 'undefined') {
				const slides = [...swiper.slidesEl.children].filter(el => el.matches(`.${swiper.params.slideClass}, swiper-slide`));
				if (slides && slides.length) {
					swiper.virtual.slides = [...slides];
					domSlidesAssigned = true;
					slides.forEach((slideEl, slideIndex) => {
						slideEl.setAttribute('data-swiper-slide-index', slideIndex);
						swiper.virtual.cache[slideIndex] = slideEl;
						slideEl.remove();
					});
				}
			}
			if (!domSlidesAssigned) {
				swiper.virtual.slides = swiper.params.virtual.slides;
			}
			swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
			swiper.params.watchSlidesProgress = true;
			swiper.originalParams.watchSlidesProgress = true;
			if (!swiper.params.initialSlide) {
				update();
			}
		});
		on('setTranslate', () => {
			if (!swiper.params.virtual.enabled) return;
			if (swiper.params.cssMode && !swiper._immediateVirtual) {
				clearTimeout(cssModeTimeout);
				cssModeTimeout = setTimeout(() => {
					update();
				}, 100);
			} else {
				update();
			}
		});
		on('init update resize', () => {
			if (!swiper.params.virtual.enabled) return;
			if (swiper.params.cssMode) {
				setCSSProperty(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
			}
		});
		Object.assign(swiper.virtual, {
			appendSlide,
			prependSlide,
			removeSlide,
			removeAllSlides,
			update
		});
	}
	/* eslint-disable consistent-return */
	function Keyboard(_ref) {
		let {
			swiper,
			extendParams,
			on,
			emit
		} = _ref;
		const document = getDocument();
		const window = getWindow();
		swiper.keyboard = {
			enabled: false
		};
		extendParams({
			keyboard: {
				enabled: false,
				onlyInViewport: true,
				pageUpDown: true
			}
		});

		function handle(event) {
			if (!swiper.enabled) return;
			const {
				rtlTranslate: rtl
			} = swiper;
			let e = event;
			if (e.originalEvent) e = e.originalEvent; // jquery fix
			const kc = e.keyCode || e.charCode;
			const pageUpDown = swiper.params.keyboard.pageUpDown;
			const isPageUp = pageUpDown && kc === 33;
			const isPageDown = pageUpDown && kc === 34;
			const isArrowLeft = kc === 37;
			const isArrowRight = kc === 39;
			const isArrowUp = kc === 38;
			const isArrowDown = kc === 40;
			// Directions locks
			if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
				return false;
			}
			if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
				return false;
			}
			if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
				return undefined;
			}
			if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
				return undefined;
			}
			if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
				let inView = false;
				// Check that swiper should be inside of visible area of window
				if (elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) {
					return undefined;
				}
				const el = swiper.el;
				const swiperWidth = el.clientWidth;
				const swiperHeight = el.clientHeight;
				const windowWidth = window.innerWidth;
				const windowHeight = window.innerHeight;
				const swiperOffset = elementOffset(el);
				if (rtl) swiperOffset.left -= el.scrollLeft;
				const swiperCoord = [
					[swiperOffset.left, swiperOffset.top],
					[swiperOffset.left + swiperWidth, swiperOffset.top],
					[swiperOffset.left, swiperOffset.top + swiperHeight],
					[swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]
				];
				for (let i = 0; i < swiperCoord.length; i += 1) {
					const point = swiperCoord[i];
					if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
						if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
						inView = true;
					}
				}
				if (!inView) return undefined;
			}
			if (swiper.isHorizontal()) {
				if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
					if (e.preventDefault) e.preventDefault();
					else e.returnValue = false;
				}
				if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
				if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
			} else {
				if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
					if (e.preventDefault) e.preventDefault();
					else e.returnValue = false;
				}
				if (isPageDown || isArrowDown) swiper.slideNext();
				if (isPageUp || isArrowUp) swiper.slidePrev();
			}
			emit('keyPress', kc);
			return undefined;
		}

		function enable() {
			if (swiper.keyboard.enabled) return;
			document.addEventListener('keydown', handle);
			swiper.keyboard.enabled = true;
		}

		function disable() {
			if (!swiper.keyboard.enabled) return;
			document.removeEventListener('keydown', handle);
			swiper.keyboard.enabled = false;
		}
		on('init', () => {
			if (swiper.params.keyboard.enabled) {
				enable();
			}
		});
		on('destroy', () => {
			if (swiper.keyboard.enabled) {
				disable();
			}
		});
		Object.assign(swiper.keyboard, {
			enable,
			disable
		});
	}
	/* eslint-disable consistent-return */
	function Mousewheel(_ref) {
		let {
			swiper,
			extendParams,
			on,
			emit
		} = _ref;
		const window = getWindow();
		extendParams({
			mousewheel: {
				enabled: false,
				releaseOnEdges: false,
				invert: false,
				forceToAxis: false,
				sensitivity: 1,
				eventsTarget: 'container',
				thresholdDelta: null,
				thresholdTime: null,
				noMousewheelClass: 'swiper-no-mousewheel'
			}
		});
		swiper.mousewheel = {
			enabled: false
		};
		let timeout;
		let lastScrollTime = now();
		let lastEventBeforeSnap;
		const recentWheelEvents = [];

		function normalize(e) {
			// Reasonable defaults
			const PIXEL_STEP = 10;
			const LINE_HEIGHT = 40;
			const PAGE_HEIGHT = 800;
			let sX = 0;
			let sY = 0; // spinX, spinY
			let pX = 0;
			let pY = 0; // pixelX, pixelY
			// Legacy
			if ('detail' in e) {
				sY = e.detail;
			}
			if ('wheelDelta' in e) {
				sY = -e.wheelDelta / 120;
			}
			if ('wheelDeltaY' in e) {
				sY = -e.wheelDeltaY / 120;
			}
			if ('wheelDeltaX' in e) {
				sX = -e.wheelDeltaX / 120;
			}
			// side scrolling on FF with DOMMouseScroll
			if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
				sX = sY;
				sY = 0;
			}
			pX = sX * PIXEL_STEP;
			pY = sY * PIXEL_STEP;
			if ('deltaY' in e) {
				pY = e.deltaY;
			}
			if ('deltaX' in e) {
				pX = e.deltaX;
			}
			if (e.shiftKey && !pX) {
				// if user scrolls with shift he wants horizontal scroll
				pX = pY;
				pY = 0;
			}
			if ((pX || pY) && e.deltaMode) {
				if (e.deltaMode === 1) {
					// delta in LINE units
					pX *= LINE_HEIGHT;
					pY *= LINE_HEIGHT;
				} else {
					// delta in PAGE units
					pX *= PAGE_HEIGHT;
					pY *= PAGE_HEIGHT;
				}
			}
			// Fall-back if spin cannot be determined
			if (pX && !sX) {
				sX = pX < 1 ? -1 : 1;
			}
			if (pY && !sY) {
				sY = pY < 1 ? -1 : 1;
			}
			return {
				spinX: sX,
				spinY: sY,
				pixelX: pX,
				pixelY: pY
			};
		}

		function handleMouseEnter() {
			if (!swiper.enabled) return;
			swiper.mouseEntered = true;
		}

		function handleMouseLeave() {
			if (!swiper.enabled) return;
			swiper.mouseEntered = false;
		}

		function animateSlider(newEvent) {
			if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
				// Prevent if delta of wheel scroll delta is below configured threshold
				return false;
			}
			if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
				// Prevent if time between scrolls is below configured threshold
				return false;
			}
			// If the movement is NOT big enough and
			// if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
			//   Don't go any further (avoid insignificant scroll movement).
			if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
				// Return false as a default
				return true;
			}
			// If user is scrolling towards the end:
			//   If the slider hasn't hit the latest slide or
			//   if the slider is a loop and
			//   if the slider isn't moving right now:
			//     Go to next slide and
			//     emit a scroll event.
			// Else (the user is scrolling towards the beginning) and
			// if the slider hasn't hit the first slide or
			// if the slider is a loop and
			// if the slider isn't moving right now:
			//   Go to prev slide and
			//   emit a scroll event.
			if (newEvent.direction < 0) {
				if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
					swiper.slideNext();
					emit('scroll', newEvent.raw);
				}
			} else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
				swiper.slidePrev();
				emit('scroll', newEvent.raw);
			}
			// If you got here is because an animation has been triggered so store the current time
			lastScrollTime = new window.Date().getTime();
			// Return false as a default
			return false;
		}

		function releaseScroll(newEvent) {
			const params = swiper.params.mousewheel;
			if (newEvent.direction < 0) {
				if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
					// Return true to animate scroll on edges
					return true;
				}
			} else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
				// Return true to animate scroll on edges
				return true;
			}
			return false;
		}

		function handle(event) {
			let e = event;
			let disableParentSwiper = true;
			if (!swiper.enabled) return;
			// Ignore event if the target or its parents have the swiper-no-mousewheel class
			if (event.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`)) return;
			const params = swiper.params.mousewheel;
			if (swiper.params.cssMode) {
				e.preventDefault();
			}
			let targetEl = swiper.el;
			if (swiper.params.mousewheel.eventsTarget !== 'container') {
				targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
			}
			const targetElContainsTarget = targetEl && targetEl.contains(e.target);
			if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
			if (e.originalEvent) e = e.originalEvent; // jquery fix
			let delta = 0;
			const rtlFactor = swiper.rtlTranslate ? -1 : 1;
			const data = normalize(e);
			if (params.forceToAxis) {
				if (swiper.isHorizontal()) {
					if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;
					else return true;
				} else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;
				else return true;
			} else {
				delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
			}
			if (delta === 0) return true;
			if (params.invert) delta = -delta;
			// Get the scroll positions
			let positions = swiper.getTranslate() + delta * params.sensitivity;
			if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
			if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();
			// When loop is true:
			//     the disableParentSwiper will be true.
			// When loop is false:
			//     if the scroll positions is not on edge,
			//     then the disableParentSwiper will be true.
			//     if the scroll on edge positions,
			//     then the disableParentSwiper will be false.
			disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
			if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
			if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
				// Register the new event in a variable which stores the relevant data
				const newEvent = {
					time: now(),
					delta: Math.abs(delta),
					direction: Math.sign(delta),
					raw: event
				};
				// Keep the most recent events
				if (recentWheelEvents.length >= 2) {
					recentWheelEvents.shift(); // only store the last N events
				}
				const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
				recentWheelEvents.push(newEvent);
				// If there is at least one previous recorded event:
				//   If direction has changed or
				//   if the scroll is quicker than the previous one:
				//     Animate the slider.
				// Else (this is the first time the wheel is moved):
				//     Animate the slider.
				if (prevEvent) {
					if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
						animateSlider(newEvent);
					}
				} else {
					animateSlider(newEvent);
				}
				// If it's time to release the scroll:
				//   Return now so you don't hit the preventDefault.
				if (releaseScroll(newEvent)) {
					return true;
				}
			} else {
				// Freemode or scrollContainer:
				// If we recently snapped after a momentum scroll, then ignore wheel events
				// to give time for the deceleration to finish. Stop ignoring after 500 msecs
				// or if it's a new scroll (larger delta or inverse sign as last event before
				// an end-of-momentum snap).
				const newEvent = {
					time: now(),
					delta: Math.abs(delta),
					direction: Math.sign(delta)
				};
				const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
				if (!ignoreWheelEvents) {
					lastEventBeforeSnap = undefined;
					let position = swiper.getTranslate() + delta * params.sensitivity;
					const wasBeginning = swiper.isBeginning;
					const wasEnd = swiper.isEnd;
					if (position >= swiper.minTranslate()) position = swiper.minTranslate();
					if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
					swiper.setTransition(0);
					swiper.setTranslate(position);
					swiper.updateProgress();
					swiper.updateActiveIndex();
					swiper.updateSlidesClasses();
					if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
						swiper.updateSlidesClasses();
					}
					if (swiper.params.loop) {
						swiper.loopFix({
							direction: newEvent.direction < 0 ? 'next' : 'prev',
							byMousewheel: true
						});
					}
					if (swiper.params.freeMode.sticky) {
						// When wheel scrolling starts with sticky (aka snap) enabled, then detect
						// the end of a momentum scroll by storing recent (N=15?) wheel events.
						// 1. do all N events have decreasing or same (absolute value) delta?
						// 2. did all N events arrive in the last M (M=500?) msecs?
						// 3. does the earliest event have an (absolute value) delta that's
						//    at least P (P=1?) larger than the most recent event's delta?
						// 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
						// If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
						// Snap immediately and ignore remaining wheel events in this scroll.
						// See comment above for "remaining wheel events in this scroll" determination.
						// If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
						clearTimeout(timeout);
						timeout = undefined;
						if (recentWheelEvents.length >= 15) {
							recentWheelEvents.shift(); // only store the last N events
						}
						const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
						const firstEvent = recentWheelEvents[0];
						recentWheelEvents.push(newEvent);
						if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
							// Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
							recentWheelEvents.splice(0);
						} else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
							// We're at the end of the deceleration of a momentum scroll, so there's no need
							// to wait for more events. Snap ASAP on the next tick.
							// Also, because there's some remaining momentum we'll bias the snap in the
							// direction of the ongoing scroll because it's better UX for the scroll to snap
							// in the same direction as the scroll instead of reversing to snap.  Therefore,
							// if it's already scrolled more than 20% in the current direction, keep going.
							const snapToThreshold = delta > 0 ? 0.8 : 0.2;
							lastEventBeforeSnap = newEvent;
							recentWheelEvents.splice(0);
							timeout = nextTick(() => {
								swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
							}, 0); // no delay; move on next tick
						}
						if (!timeout) {
							// if we get here, then we haven't detected the end of a momentum scroll, so
							// we'll consider a scroll "complete" when there haven't been any wheel events
							// for 500ms.
							timeout = nextTick(() => {
								const snapToThreshold = 0.5;
								lastEventBeforeSnap = newEvent;
								recentWheelEvents.splice(0);
								swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
							}, 500);
						}
					}
					// Emit event
					if (!ignoreWheelEvents) emit('scroll', e);
					// Stop autoplay
					if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop();
					// Return page scroll on edge positions
					if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
				}
			}
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
			return false;
		}

		function events(method) {
			let targetEl = swiper.el;
			if (swiper.params.mousewheel.eventsTarget !== 'container') {
				targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
			}
			targetEl[method]('mouseenter', handleMouseEnter);
			targetEl[method]('mouseleave', handleMouseLeave);
			targetEl[method]('wheel', handle);
		}

		function enable() {
			if (swiper.params.cssMode) {
				swiper.wrapperEl.removeEventListener('wheel', handle);
				return true;
			}
			if (swiper.mousewheel.enabled) return false;
			events('addEventListener');
			swiper.mousewheel.enabled = true;
			return true;
		}

		function disable() {
			if (swiper.params.cssMode) {
				swiper.wrapperEl.addEventListener(event, handle);
				return true;
			}
			if (!swiper.mousewheel.enabled) return false;
			events('removeEventListener');
			swiper.mousewheel.enabled = false;
			return true;
		}
		on('init', () => {
			if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
				disable();
			}
			if (swiper.params.mousewheel.enabled) enable();
		});
		on('destroy', () => {
			if (swiper.params.cssMode) {
				enable();
			}
			if (swiper.mousewheel.enabled) disable();
		});
		Object.assign(swiper.mousewheel, {
			enable,
			disable
		});
	}

	function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
		if (swiper.params.createElements) {
			Object.keys(checkProps).forEach(key => {
				if (!params[key] && params.auto === true) {
					let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
					if (!element) {
						element = createElement('div', checkProps[key]);
						element.className = checkProps[key];
						swiper.el.append(element);
					}
					params[key] = element;
					originalParams[key] = element;
				}
			});
		}
		return params;
	}

	function Navigation(_ref) {
		let {
			swiper,
			extendParams,
			on,
			emit
		} = _ref;
		extendParams({
			navigation: {
				nextEl: null,
				prevEl: null,
				hideOnClick: false,
				disabledClass: 'swiper-button-disabled',
				hiddenClass: 'swiper-button-hidden',
				lockClass: 'swiper-button-lock',
				navigationDisabledClass: 'swiper-navigation-disabled'
			}
		});
		swiper.navigation = {
			nextEl: null,
			prevEl: null
		};
		const makeElementsArray = el => {
			if (!Array.isArray(el)) el = [el].filter(e => !!e);
			return el;
		};

		function getEl(el) {
			let res;
			if (el && typeof el === 'string' && swiper.isElement) {
				res = swiper.el.shadowRoot.querySelector(el);
				if (res) return res;
			}
			if (el) {
				if (typeof el === 'string') res = [...document.querySelectorAll(el)];
				if (swiper.params.uniqueNavElements && typeof el === 'string' && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
					res = swiper.el.querySelector(el);
				}
			}
			if (el && !res) return el;
			// if (Array.isArray(res) && res.length === 1) res = res[0];
			return res;
		}

		function toggleEl(el, disabled) {
			const params = swiper.params.navigation;
			el = makeElementsArray(el);
			el.forEach(subEl => {
				if (subEl) {
					subEl.classList[disabled ? 'add' : 'remove'](...params.disabledClass.split(' '));
					if (subEl.tagName === 'BUTTON') subEl.disabled = disabled;
					if (swiper.params.watchOverflow && swiper.enabled) {
						subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
					}
				}
			});
		}

		function update() {
			// Update Navigation Buttons
			const {
				nextEl,
				prevEl
			} = swiper.navigation;
			if (swiper.params.loop) {
				toggleEl(prevEl, false);
				toggleEl(nextEl, false);
				return;
			}
			toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
			toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
		}

		function onPrevClick(e) {
			e.preventDefault();
			if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
			swiper.slidePrev();
			emit('navigationPrev');
		}

		function onNextClick(e) {
			e.preventDefault();
			if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
			swiper.slideNext();
			emit('navigationNext');
		}

		function init() {
			const params = swiper.params.navigation;
			swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
				nextEl: 'swiper-button-next',
				prevEl: 'swiper-button-prev'
			});
			if (!(params.nextEl || params.prevEl)) return;
			let nextEl = getEl(params.nextEl);
			let prevEl = getEl(params.prevEl);
			Object.assign(swiper.navigation, {
				nextEl,
				prevEl
			});
			nextEl = makeElementsArray(nextEl);
			prevEl = makeElementsArray(prevEl);
			const initButton = (el, dir) => {
				if (el) {
					el.addEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
				}
				if (!swiper.enabled && el) {
					el.classList.add(...params.lockClass.split(' '));
				}
			};
			nextEl.forEach(el => initButton(el, 'next'));
			prevEl.forEach(el => initButton(el, 'prev'));
		}

		function destroy() {
			let {
				nextEl,
				prevEl
			} = swiper.navigation;
			nextEl = makeElementsArray(nextEl);
			prevEl = makeElementsArray(prevEl);
			const destroyButton = (el, dir) => {
				el.removeEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
				el.classList.remove(...swiper.params.navigation.disabledClass.split(' '));
			};
			nextEl.forEach(el => destroyButton(el, 'next'));
			prevEl.forEach(el => destroyButton(el, 'prev'));
		}
		on('init', () => {
			if (swiper.params.navigation.enabled === false) {
				// eslint-disable-next-line
				disable();
			} else {
				init();
				update();
			}
		});
		on('toEdge fromEdge lock unlock', () => {
			update();
		});
		on('destroy', () => {
			destroy();
		});
		on('enable disable', () => {
			let {
				nextEl,
				prevEl
			} = swiper.navigation;
			nextEl = makeElementsArray(nextEl);
			prevEl = makeElementsArray(prevEl);
			[...nextEl, ...prevEl].filter(el => !!el).forEach(el => el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.navigation.lockClass));
		});
		on('click', (_s, e) => {
			let {
				nextEl,
				prevEl
			} = swiper.navigation;
			nextEl = makeElementsArray(nextEl);
			prevEl = makeElementsArray(prevEl);
			const targetEl = e.target;
			if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
				if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
				let isHidden;
				if (nextEl.length) {
					isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
				} else if (prevEl.length) {
					isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
				}
				if (isHidden === true) {
					emit('navigationShow');
				} else {
					emit('navigationHide');
				}
				[...nextEl, ...prevEl].filter(el => !!el).forEach(el => el.classList.toggle(swiper.params.navigation.hiddenClass));
			}
		});
		const enable = () => {
			swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(' '));
			init();
			update();
		};
		const disable = () => {
			swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(' '));
			destroy();
		};
		Object.assign(swiper.navigation, {
			enable,
			disable,
			update,
			init,
			destroy
		});
	}

	function classesToSelector(classes) {
		if (classes === void 0) {
			classes = '';
		}
		return `.${classes.trim().replace(/([\.:!+\/])/g, '\\$1') // eslint-disable-line

  .replace(/ /g, '.')}`;
	}

	function Pagination(_ref) {
		let {
			swiper,
			extendParams,
			on,
			emit
		} = _ref;
		const pfx = 'swiper-pagination';
		extendParams({
			pagination: {
				el: null,
				bulletElement: 'span',
				clickable: false,
				hideOnClick: false,
				renderBullet: null,
				renderProgressbar: null,
				renderFraction: null,
				renderCustom: null,
				progressbarOpposite: false,
				type: 'bullets',
				// 'bullets' or 'progressbar' or 'fraction' or 'custom'
				dynamicBullets: false,
				dynamicMainBullets: 1,
				formatFractionCurrent: number => number,
				formatFractionTotal: number => number,
				bulletClass: `${pfx}-bullet`,
				bulletActiveClass: `${pfx}-bullet-active`,
				modifierClass: `${pfx}-`,
				currentClass: `${pfx}-current`,
				totalClass: `${pfx}-total`,
				hiddenClass: `${pfx}-hidden`,
				progressbarFillClass: `${pfx}-progressbar-fill`,
				progressbarOppositeClass: `${pfx}-progressbar-opposite`,
				clickableClass: `${pfx}-clickable`,
				lockClass: `${pfx}-lock`,
				horizontalClass: `${pfx}-horizontal`,
				verticalClass: `${pfx}-vertical`,
				paginationDisabledClass: `${pfx}-disabled`
			}
		});
		swiper.pagination = {
			el: null,
			bullets: []
		};
		let bulletSize;
		let dynamicBulletIndex = 0;
		const makeElementsArray = el => {
			if (!Array.isArray(el)) el = [el].filter(e => !!e);
			return el;
		};

		function isPaginationDisabled() {
			return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
		}

		function setSideBullets(bulletEl, position) {
			const {
				bulletActiveClass
			} = swiper.params.pagination;
			if (!bulletEl) return;
			bulletEl = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
			if (bulletEl) {
				bulletEl.classList.add(`${bulletActiveClass}-${position}`);
				bulletEl = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
				if (bulletEl) {
					bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
				}
			}
		}

		function onBulletClick(e) {
			const bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
			if (!bulletEl) {
				return;
			}
			e.preventDefault();
			const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
			if (swiper.params.loop) {
				if (swiper.realIndex === index) return;
				const newSlideIndex = swiper.getSlideIndexByData(index);
				const currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
				if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
					swiper.loopFix({
						direction: newSlideIndex > currentSlideIndex ? 'next' : 'prev',
						activeSlideIndex: newSlideIndex,
						slideTo: false
					});
				}
				swiper.slideToLoop(index);
			} else {
				swiper.slideTo(index);
			}
		}

		function update() {
			// Render || Update Pagination bullets/items
			const rtl = swiper.rtl;
			const params = swiper.params.pagination;
			if (isPaginationDisabled()) return;
			let el = swiper.pagination.el;
			el = makeElementsArray(el);
			// Current/Total
			let current;
			let previousIndex;
			const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
			const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
			if (swiper.params.loop) {
				previousIndex = swiper.previousRealIndex || 0;
				current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
			} else if (typeof swiper.snapIndex !== 'undefined') {
				current = swiper.snapIndex;
				previousIndex = swiper.previousSnapIndex;
			} else {
				previousIndex = swiper.previousIndex || 0;
				current = swiper.activeIndex || 0;
			}
			// Types
			if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
				const bullets = swiper.pagination.bullets;
				let firstIndex;
				let lastIndex;
				let midIndex;
				if (params.dynamicBullets) {
					bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? 'width' : 'height', true);
					el.forEach(subEl => {
						subEl.style[swiper.isHorizontal() ? 'width' : 'height'] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
					});
					if (params.dynamicMainBullets > 1 && previousIndex !== undefined) {
						dynamicBulletIndex += current - (previousIndex || 0);
						if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
							dynamicBulletIndex = params.dynamicMainBullets - 1;
						} else if (dynamicBulletIndex < 0) {
							dynamicBulletIndex = 0;
						}
					}
					firstIndex = Math.max(current - dynamicBulletIndex, 0);
					lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
					midIndex = (lastIndex + firstIndex) / 2;
				}
				bullets.forEach(bulletEl => {
					const classesToRemove = [...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`)].map(s => typeof s === 'string' && s.includes(' ') ? s.split(' ') : s).flat();
					bulletEl.classList.remove(...classesToRemove);
				});
				if (el.length > 1) {
					bullets.forEach(bullet => {
						const bulletIndex = elementIndex(bullet);
						if (bulletIndex === current) {
							bullet.classList.add(...params.bulletActiveClass.split(' '));
						}
						if (params.dynamicBullets) {
							if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
								bullet.classList.add(...`${params.bulletActiveClass}-main`.split(' '));
							}
							if (bulletIndex === firstIndex) {
								setSideBullets(bullet, 'prev');
							}
							if (bulletIndex === lastIndex) {
								setSideBullets(bullet, 'next');
							}
						}
					});
				} else {
					const bullet = bullets[current];
					if (bullet) {
						bullet.classList.add(...params.bulletActiveClass.split(' '));
					}
					if (params.dynamicBullets) {
						const firstDisplayedBullet = bullets[firstIndex];
						const lastDisplayedBullet = bullets[lastIndex];
						for (let i = firstIndex; i <= lastIndex; i += 1) {
							if (bullets[i]) {
								bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(' '));
							}
						}
						setSideBullets(firstDisplayedBullet, 'prev');
						setSideBullets(lastDisplayedBullet, 'next');
					}
				}
				if (params.dynamicBullets) {
					const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
					const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
					const offsetProp = rtl ? 'right' : 'left';
					bullets.forEach(bullet => {
						bullet.style[swiper.isHorizontal() ? offsetProp : 'top'] = `${bulletsOffset}px`;
					});
				}
			}
			el.forEach((subEl, subElIndex) => {
				if (params.type === 'fraction') {
					subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach(fractionEl => {
						fractionEl.textContent = params.formatFractionCurrent(current + 1);
					});
					subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach(totalEl => {
						totalEl.textContent = params.formatFractionTotal(total);
					});
				}
				if (params.type === 'progressbar') {
					let progressbarDirection;
					if (params.progressbarOpposite) {
						progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
					} else {
						progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
					}
					const scale = (current + 1) / total;
					let scaleX = 1;
					let scaleY = 1;
					if (progressbarDirection === 'horizontal') {
						scaleX = scale;
					} else {
						scaleY = scale;
					}
					subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach(progressEl => {
						progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
						progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
					});
				}
				if (params.type === 'custom' && params.renderCustom) {
					subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
					if (subElIndex === 0) emit('paginationRender', subEl);
				} else {
					if (subElIndex === 0) emit('paginationRender', subEl);
					emit('paginationUpdate', subEl);
				}
				if (swiper.params.watchOverflow && swiper.enabled) {
					subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
				}
			});
		}

		function render() {
			// Render Container
			const params = swiper.params.pagination;
			if (isPaginationDisabled()) return;
			const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
			let el = swiper.pagination.el;
			el = makeElementsArray(el);
			let paginationHTML = '';
			if (params.type === 'bullets') {
				let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
				if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
					numberOfBullets = slidesLength;
				}
				for (let i = 0; i < numberOfBullets; i += 1) {
					if (params.renderBullet) {
						paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
					} else {
						paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
					}
				}
			}
			if (params.type === 'fraction') {
				if (params.renderFraction) {
					paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
				} else {
					paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
				}
			}
			if (params.type === 'progressbar') {
				if (params.renderProgressbar) {
					paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
				} else {
					paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
				}
			}
			swiper.pagination.bullets = [];
			el.forEach(subEl => {
				if (params.type !== 'custom') {
					subEl.innerHTML = paginationHTML || '';
				}
				if (params.type === 'bullets') {
					swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
				}
			});
			if (params.type !== 'custom') {
				emit('paginationRender', el[0]);
			}
		}

		function init() {
			swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
				el: 'swiper-pagination'
			});
			const params = swiper.params.pagination;
			if (!params.el) return;
			let el;
			if (typeof params.el === 'string' && swiper.isElement) {
				el = swiper.el.shadowRoot.querySelector(params.el);
			}
			if (!el && typeof params.el === 'string') {
				el = [...document.querySelectorAll(params.el)];
			}
			if (!el) {
				el = params.el;
			}
			if (!el || el.length === 0) return;
			if (swiper.params.uniqueNavElements && typeof params.el === 'string' && Array.isArray(el) && el.length > 1) {
				el = [...swiper.el.querySelectorAll(params.el)];
				// check if it belongs to another nested Swiper
				if (el.length > 1) {
					el = el.filter(subEl => {
						if (elementParents(subEl, '.swiper')[0] !== swiper.el) return false;
						return true;
					})[0];
				}
			}
			if (Array.isArray(el) && el.length === 1) el = el[0];
			Object.assign(swiper.pagination, {
				el
			});
			el = makeElementsArray(el);
			el.forEach(subEl => {
				if (params.type === 'bullets' && params.clickable) {
					subEl.classList.add(params.clickableClass);
				}
				subEl.classList.add(params.modifierClass + params.type);
				subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
				if (params.type === 'bullets' && params.dynamicBullets) {
					subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
					dynamicBulletIndex = 0;
					if (params.dynamicMainBullets < 1) {
						params.dynamicMainBullets = 1;
					}
				}
				if (params.type === 'progressbar' && params.progressbarOpposite) {
					subEl.classList.add(params.progressbarOppositeClass);
				}
				if (params.clickable) {
					subEl.addEventListener('click', onBulletClick);
				}
				if (!swiper.enabled) {
					subEl.classList.add(params.lockClass);
				}
			});
		}

		function destroy() {
			const params = swiper.params.pagination;
			if (isPaginationDisabled()) return;
			let el = swiper.pagination.el;
			if (el) {
				el = makeElementsArray(el);
				el.forEach(subEl => {
					subEl.classList.remove(params.hiddenClass);
					subEl.classList.remove(params.modifierClass + params.type);
					subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
					if (params.clickable) {
						subEl.removeEventListener('click', onBulletClick);
					}
				});
			}
			if (swiper.pagination.bullets) swiper.pagination.bullets.forEach(subEl => subEl.classList.remove(...params.bulletActiveClass.split(' ')));
		}
		on('changeDirection', () => {
			if (!swiper.pagination || !swiper.pagination.el) return;
			const params = swiper.params.pagination;
			let {
				el
			} = swiper.pagination;
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.classList.remove(params.horizontalClass, params.verticalClass);
				subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
			});
		});
		on('init', () => {
			if (swiper.params.pagination.enabled === false) {
				// eslint-disable-next-line
				disable();
			} else {
				init();
				render();
				update();
			}
		});
		on('activeIndexChange', () => {
			if (typeof swiper.snapIndex === 'undefined') {
				update();
			}
		});
		on('snapIndexChange', () => {
			update();
		});
		on('snapGridLengthChange', () => {
			render();
			update();
		});
		on('destroy', () => {
			destroy();
		});
		on('enable disable', () => {
			let {
				el
			} = swiper.pagination;
			if (el) {
				el = makeElementsArray(el);
				el.forEach(subEl => subEl.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.pagination.lockClass));
			}
		});
		on('lock unlock', () => {
			update();
		});
		on('click', (_s, e) => {
			const targetEl = e.target;
			let {
				el
			} = swiper.pagination;
			if (!Array.isArray(el)) el = [el].filter(element => !!element);
			if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
				if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
				const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
				if (isHidden === true) {
					emit('paginationShow');
				} else {
					emit('paginationHide');
				}
				el.forEach(subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
			}
		});
		const enable = () => {
			swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
			let {
				el
			} = swiper.pagination;
			if (el) {
				el = makeElementsArray(el);
				el.forEach(subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
			}
			init();
			render();
			update();
		};
		const disable = () => {
			swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
			let {
				el
			} = swiper.pagination;
			if (el) {
				el = makeElementsArray(el);
				el.forEach(subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
			}
			destroy();
		};
		Object.assign(swiper.pagination, {
			enable,
			disable,
			render,
			update,
			init,
			destroy
		});
	}

	function Scrollbar(_ref) {
		let {
			swiper,
			extendParams,
			on,
			emit
		} = _ref;
		const document = getDocument();
		let isTouched = false;
		let timeout = null;
		let dragTimeout = null;
		let dragStartPos;
		let dragSize;
		let trackSize;
		let divider;
		extendParams({
			scrollbar: {
				el: null,
				dragSize: 'auto',
				hide: false,
				draggable: false,
				snapOnRelease: true,
				lockClass: 'swiper-scrollbar-lock',
				dragClass: 'swiper-scrollbar-drag',
				scrollbarDisabledClass: 'swiper-scrollbar-disabled',
				horizontalClass: `swiper-scrollbar-horizontal`,
				verticalClass: `swiper-scrollbar-vertical`
			}
		});
		swiper.scrollbar = {
			el: null,
			dragEl: null
		};

		function setTranslate() {
			if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
			const {
				scrollbar,
				rtlTranslate: rtl
			} = swiper;
			const {
				dragEl,
				el
			} = scrollbar;
			const params = swiper.params.scrollbar;
			const progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
			let newSize = dragSize;
			let newPos = (trackSize - dragSize) * progress;
			if (rtl) {
				newPos = -newPos;
				if (newPos > 0) {
					newSize = dragSize - newPos;
					newPos = 0;
				} else if (-newPos + dragSize > trackSize) {
					newSize = trackSize + newPos;
				}
			} else if (newPos < 0) {
				newSize = dragSize + newPos;
				newPos = 0;
			} else if (newPos + dragSize > trackSize) {
				newSize = trackSize - newPos;
			}
			if (swiper.isHorizontal()) {
				dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
				dragEl.style.width = `${newSize}px`;
			} else {
				dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
				dragEl.style.height = `${newSize}px`;
			}
			if (params.hide) {
				clearTimeout(timeout);
				el.style.opacity = 1;
				timeout = setTimeout(() => {
					el.style.opacity = 0;
					el.style.transitionDuration = '400ms';
				}, 1000);
			}
		}

		function setTransition(duration) {
			if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
			swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
		}

		function updateSize() {
			if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
			const {
				scrollbar
			} = swiper;
			const {
				dragEl,
				el
			} = scrollbar;
			dragEl.style.width = '';
			dragEl.style.height = '';
			trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
			divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
			if (swiper.params.scrollbar.dragSize === 'auto') {
				dragSize = trackSize * divider;
			} else {
				dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
			}
			if (swiper.isHorizontal()) {
				dragEl.style.width = `${dragSize}px`;
			} else {
				dragEl.style.height = `${dragSize}px`;
			}
			if (divider >= 1) {
				el.style.display = 'none';
			} else {
				el.style.display = '';
			}
			if (swiper.params.scrollbar.hide) {
				el.style.opacity = 0;
			}
			if (swiper.params.watchOverflow && swiper.enabled) {
				scrollbar.el.classList[swiper.isLocked ? 'add' : 'remove'](swiper.params.scrollbar.lockClass);
			}
		}

		function getPointerPosition(e) {
			return swiper.isHorizontal() ? e.clientX : e.clientY;
		}

		function setDragPosition(e) {
			const {
				scrollbar,
				rtlTranslate: rtl
			} = swiper;
			const {
				el
			} = scrollbar;
			let positionRatio;
			positionRatio = (getPointerPosition(e) - elementOffset(el)[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
			positionRatio = Math.max(Math.min(positionRatio, 1), 0);
			if (rtl) {
				positionRatio = 1 - positionRatio;
			}
			const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
			swiper.updateProgress(position);
			swiper.setTranslate(position);
			swiper.updateActiveIndex();
			swiper.updateSlidesClasses();
		}

		function onDragStart(e) {
			const params = swiper.params.scrollbar;
			const {
				scrollbar,
				wrapperEl
			} = swiper;
			const {
				el,
				dragEl
			} = scrollbar;
			isTouched = true;
			dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
			e.preventDefault();
			e.stopPropagation();
			wrapperEl.style.transitionDuration = '100ms';
			dragEl.style.transitionDuration = '100ms';
			setDragPosition(e);
			clearTimeout(dragTimeout);
			el.style.transitionDuration = '0ms';
			if (params.hide) {
				el.style.opacity = 1;
			}
			if (swiper.params.cssMode) {
				swiper.wrapperEl.style['scroll-snap-type'] = 'none';
			}
			emit('scrollbarDragStart', e);
		}

		function onDragMove(e) {
			const {
				scrollbar,
				wrapperEl
			} = swiper;
			const {
				el,
				dragEl
			} = scrollbar;
			if (!isTouched) return;
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
			setDragPosition(e);
			wrapperEl.style.transitionDuration = '0ms';
			el.style.transitionDuration = '0ms';
			dragEl.style.transitionDuration = '0ms';
			emit('scrollbarDragMove', e);
		}

		function onDragEnd(e) {
			const params = swiper.params.scrollbar;
			const {
				scrollbar,
				wrapperEl
			} = swiper;
			const {
				el
			} = scrollbar;
			if (!isTouched) return;
			isTouched = false;
			if (swiper.params.cssMode) {
				swiper.wrapperEl.style['scroll-snap-type'] = '';
				wrapperEl.style.transitionDuration = '';
			}
			if (params.hide) {
				clearTimeout(dragTimeout);
				dragTimeout = nextTick(() => {
					el.style.opacity = 0;
					el.style.transitionDuration = '400ms';
				}, 1000);
			}
			emit('scrollbarDragEnd', e);
			if (params.snapOnRelease) {
				swiper.slideToClosest();
			}
		}

		function events(method) {
			const {
				scrollbar,
				params
			} = swiper;
			const el = scrollbar.el;
			if (!el) return;
			const target = el;
			const activeListener = params.passiveListeners ? {
				passive: false,
				capture: false
			} : false;
			const passiveListener = params.passiveListeners ? {
				passive: true,
				capture: false
			} : false;
			if (!target) return;
			const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
			target[eventMethod]('pointerdown', onDragStart, activeListener);
			document[eventMethod]('pointermove', onDragMove, activeListener);
			document[eventMethod]('pointerup', onDragEnd, passiveListener);
		}

		function enableDraggable() {
			if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
			events('on');
		}

		function disableDraggable() {
			if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
			events('off');
		}

		function init() {
			const {
				scrollbar,
				el: swiperEl
			} = swiper;
			swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
				el: 'swiper-scrollbar'
			});
			const params = swiper.params.scrollbar;
			if (!params.el) return;
			let el;
			if (typeof params.el === 'string' && swiper.isElement) {
				el = swiper.el.shadowRoot.querySelector(params.el);
			}
			if (!el && typeof params.el === 'string') {
				el = document.querySelectorAll(params.el);
			} else if (!el) {
				el = params.el;
			}
			if (swiper.params.uniqueNavElements && typeof params.el === 'string' && el.length > 1 && swiperEl.querySelectorAll(params.el).length === 1) {
				el = swiperEl.querySelector(params.el);
			}
			if (el.length > 0) el = el[0];
			el.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
			let dragEl;
			if (el) {
				dragEl = el.querySelector(`.${swiper.params.scrollbar.dragClass}`);
				if (!dragEl) {
					dragEl = createElement('div', swiper.params.scrollbar.dragClass);
					el.append(dragEl);
				}
			}
			Object.assign(scrollbar, {
				el,
				dragEl
			});
			if (params.draggable) {
				enableDraggable();
			}
			if (el) {
				el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.scrollbar.lockClass);
			}
		}

		function destroy() {
			const params = swiper.params.scrollbar;
			const el = swiper.scrollbar.el;
			if (el) {
				el.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
			}
			disableDraggable();
		}
		on('init', () => {
			if (swiper.params.scrollbar.enabled === false) {
				// eslint-disable-next-line
				disable();
			} else {
				init();
				updateSize();
				setTranslate();
			}
		});
		on('update resize observerUpdate lock unlock', () => {
			updateSize();
		});
		on('setTranslate', () => {
			setTranslate();
		});
		on('setTransition', (_s, duration) => {
			setTransition(duration);
		});
		on('enable disable', () => {
			const {
				el
			} = swiper.scrollbar;
			if (el) {
				el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.scrollbar.lockClass);
			}
		});
		on('destroy', () => {
			destroy();
		});
		const enable = () => {
			swiper.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
			if (swiper.scrollbar.el) {
				swiper.scrollbar.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
			}
			init();
			updateSize();
			setTranslate();
		};
		const disable = () => {
			swiper.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
			if (swiper.scrollbar.el) {
				swiper.scrollbar.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
			}
			destroy();
		};
		Object.assign(swiper.scrollbar, {
			enable,
			disable,
			updateSize,
			setTranslate,
			init,
			destroy
		});
	}

	function Parallax(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			parallax: {
				enabled: false
			}
		});
		const setTransform = (el, progress) => {
			const {
				rtl
			} = swiper;
			const rtlFactor = rtl ? -1 : 1;
			const p = el.getAttribute('data-swiper-parallax') || '0';
			let x = el.getAttribute('data-swiper-parallax-x');
			let y = el.getAttribute('data-swiper-parallax-y');
			const scale = el.getAttribute('data-swiper-parallax-scale');
			const opacity = el.getAttribute('data-swiper-parallax-opacity');
			const rotate = el.getAttribute('data-swiper-parallax-rotate');
			if (x || y) {
				x = x || '0';
				y = y || '0';
			} else if (swiper.isHorizontal()) {
				x = p;
				y = '0';
			} else {
				y = p;
				x = '0';
			}
			if (x.indexOf('%') >= 0) {
				x = `${parseInt(x, 10) * progress * rtlFactor}%`;
			} else {
				x = `${x * progress * rtlFactor}px`;
			}
			if (y.indexOf('%') >= 0) {
				y = `${parseInt(y, 10) * progress}%`;
			} else {
				y = `${y * progress}px`;
			}
			if (typeof opacity !== 'undefined' && opacity !== null) {
				const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
				el.style.opacity = currentOpacity;
			}
			let transform = `translate3d(${x}, ${y}, 0px)`;
			if (typeof scale !== 'undefined' && scale !== null) {
				const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
				transform += ` scale(${currentScale})`;
			}
			if (rotate && typeof rotate !== 'undefined' && rotate !== null) {
				const currentRotate = rotate * progress * -1;
				transform += ` rotate(${currentRotate}deg)`;
			}
			el.style.transform = transform;
		};
		const setTranslate = () => {
			const {
				el,
				slides,
				progress,
				snapGrid
			} = swiper;
			elementChildren(el, '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').forEach(subEl => {
				setTransform(subEl, progress);
			});
			slides.forEach((slideEl, slideIndex) => {
				let slideProgress = slideEl.progress;
				if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
					slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
				}
				slideProgress = Math.min(Math.max(slideProgress, -1), 1);
				slideEl.querySelectorAll('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]').forEach(subEl => {
					setTransform(subEl, slideProgress);
				});
			});
		};
		const setTransition = function(duration) {
			if (duration === void 0) {
				duration = swiper.params.speed;
			}
			const {
				el
			} = swiper;
			el.querySelectorAll('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').forEach(parallaxEl => {
				let parallaxDuration = parseInt(parallaxEl.getAttribute('data-swiper-parallax-duration'), 10) || duration;
				if (duration === 0) parallaxDuration = 0;
				parallaxEl.style.transitionDuration = `${parallaxDuration}ms`;
			});
		};
		on('beforeInit', () => {
			if (!swiper.params.parallax.enabled) return;
			swiper.params.watchSlidesProgress = true;
			swiper.originalParams.watchSlidesProgress = true;
		});
		on('init', () => {
			if (!swiper.params.parallax.enabled) return;
			setTranslate();
		});
		on('setTranslate', () => {
			if (!swiper.params.parallax.enabled) return;
			setTranslate();
		});
		on('setTransition', (_swiper, duration) => {
			if (!swiper.params.parallax.enabled) return;
			setTransition(duration);
		});
	}

	function Zoom(_ref) {
		let {
			swiper,
			extendParams,
			on,
			emit
		} = _ref;
		const window = getWindow();
		extendParams({
			zoom: {
				enabled: false,
				maxRatio: 3,
				minRatio: 1,
				toggle: true,
				containerClass: 'swiper-zoom-container',
				zoomedSlideClass: 'swiper-slide-zoomed'
			}
		});
		swiper.zoom = {
			enabled: false
		};
		let currentScale = 1;
		let isScaling = false;
		let fakeGestureTouched;
		let fakeGestureMoved;
		const evCache = [];
		const gesture = {
			originX: 0,
			originY: 0,
			slideEl: undefined,
			slideWidth: undefined,
			slideHeight: undefined,
			imageEl: undefined,
			imageWrapEl: undefined,
			maxRatio: 3
		};
		const image = {
			isTouched: undefined,
			isMoved: undefined,
			currentX: undefined,
			currentY: undefined,
			minX: undefined,
			minY: undefined,
			maxX: undefined,
			maxY: undefined,
			width: undefined,
			height: undefined,
			startX: undefined,
			startY: undefined,
			touchesStart: {},
			touchesCurrent: {}
		};
		const velocity = {
			x: undefined,
			y: undefined,
			prevPositionX: undefined,
			prevPositionY: undefined,
			prevTime: undefined
		};
		let scale = 1;
		Object.defineProperty(swiper.zoom, 'scale', {
			get() {
				return scale;
			},
			set(value) {
				if (scale !== value) {
					const imageEl = gesture.imageEl;
					const slideEl = gesture.slideEl;
					emit('zoomChange', value, imageEl, slideEl);
				}
				scale = value;
			}
		});

		function getDistanceBetweenTouches() {
			if (evCache.length < 2) return 1;
			const x1 = evCache[0].pageX;
			const y1 = evCache[0].pageY;
			const x2 = evCache[1].pageX;
			const y2 = evCache[1].pageY;
			const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
			return distance;
		}

		function getScaleOrigin() {
			if (evCache.length < 2) return {
				x: null,
				y: null
			};
			const box = gesture.imageEl.getBoundingClientRect();
			return [(evCache[0].pageX + (evCache[1].pageX - evCache[0].pageX) / 2 - box.x) / currentScale, (evCache[0].pageY + (evCache[1].pageY - evCache[0].pageY) / 2 - box.y) / currentScale];
		}

		function getSlideSelector() {
			return swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
		}

		function eventWithinSlide(e) {
			const slideSelector = getSlideSelector();
			if (e.target.matches(slideSelector)) return true;
			if (swiper.slides.filter(slideEl => slideEl.contains(e.target)).length > 0) return true;
			return false;
		}

		function eventWithinZoomContainer(e) {
			const selector = `.${swiper.params.zoom.containerClass}`;
			if (e.target.matches(selector)) return true;
			if ([...swiper.el.querySelectorAll(selector)].filter(containerEl => containerEl.contains(e.target)).length > 0) return true;
			return false;
		}
		// Events
		function onGestureStart(e) {
			if (e.pointerType === 'mouse') {
				evCache.splice(0, evCache.length);
			}
			if (!eventWithinSlide(e)) return;
			const params = swiper.params.zoom;
			fakeGestureTouched = false;
			fakeGestureMoved = false;
			evCache.push(e);
			if (evCache.length < 2) {
				return;
			}
			fakeGestureTouched = true;
			gesture.scaleStart = getDistanceBetweenTouches();
			if (!gesture.slideEl) {
				gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
				if (!gesture.slideEl) gesture.slideEl = swiper.slides[swiper.activeIndex];
				let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
				if (imageEl) {
					imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
				}
				gesture.imageEl = imageEl;
				if (imageEl) {
					gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
				} else {
					gesture.imageWrapEl = undefined;
				}
				if (!gesture.imageWrapEl) {
					gesture.imageEl = undefined;
					return;
				}
				gesture.maxRatio = gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
			}
			if (gesture.imageEl) {
				const [originX, originY] = getScaleOrigin();
				gesture.originX = originX;
				gesture.originY = originY;
				gesture.imageEl.style.transitionDuration = '0ms';
			}
			isScaling = true;
		}

		function onGestureChange(e) {
			if (!eventWithinSlide(e)) return;
			const params = swiper.params.zoom;
			const zoom = swiper.zoom;
			const pointerIndex = evCache.findIndex(cachedEv => cachedEv.pointerId === e.pointerId);
			if (pointerIndex >= 0) evCache[pointerIndex] = e;
			if (evCache.length < 2) {
				return;
			}
			fakeGestureMoved = true;
			gesture.scaleMove = getDistanceBetweenTouches();
			if (!gesture.imageEl) {
				return;
			}
			zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
			if (zoom.scale > gesture.maxRatio) {
				zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
			}
			if (zoom.scale < params.minRatio) {
				zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
			}
			gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
		}

		function onGestureEnd(e) {
			if (!eventWithinSlide(e)) return;
			if (e.pointerType === 'mouse' && e.type === 'pointerout') return;
			const params = swiper.params.zoom;
			const zoom = swiper.zoom;
			const pointerIndex = evCache.findIndex(cachedEv => cachedEv.pointerId === e.pointerId);
			if (pointerIndex >= 0) evCache.splice(pointerIndex, 1);
			if (!fakeGestureTouched || !fakeGestureMoved) {
				return;
			}
			fakeGestureTouched = false;
			fakeGestureMoved = false;
			if (!gesture.imageEl) return;
			zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
			gesture.imageEl.style.transitionDuration = `${swiper.params.speed}ms`;
			gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
			currentScale = zoom.scale;
			isScaling = false;
			if (zoom.scale > 1 && gesture.slideEl) {
				gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
			} else if (zoom.scale <= 1 && gesture.slideEl) {
				gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
			}
			if (zoom.scale === 1) {
				gesture.originX = 0;
				gesture.originY = 0;
				gesture.slideEl = undefined;
			}
		}

		function onTouchStart(e) {
			const device = swiper.device;
			if (!gesture.imageEl) return;
			if (image.isTouched) return;
			if (device.android && e.cancelable) e.preventDefault();
			image.isTouched = true;
			const event = evCache.length > 0 ? evCache[0] : e;
			image.touchesStart.x = event.pageX;
			image.touchesStart.y = event.pageY;
		}

		function onTouchMove(e) {
			if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) return;
			const zoom = swiper.zoom;
			if (!gesture.imageEl) return;
			if (!image.isTouched || !gesture.slideEl) return;
			if (!image.isMoved) {
				image.width = gesture.imageEl.offsetWidth;
				image.height = gesture.imageEl.offsetHeight;
				image.startX = getTranslate(gesture.imageWrapEl, 'x') || 0;
				image.startY = getTranslate(gesture.imageWrapEl, 'y') || 0;
				gesture.slideWidth = gesture.slideEl.offsetWidth;
				gesture.slideHeight = gesture.slideEl.offsetHeight;
				gesture.imageWrapEl.style.transitionDuration = '0ms';
			}
			// Define if we need image drag
			const scaledWidth = image.width * zoom.scale;
			const scaledHeight = image.height * zoom.scale;
			if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
			image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
			image.maxX = -image.minX;
			image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
			image.maxY = -image.minY;
			image.touchesCurrent.x = evCache.length > 0 ? evCache[0].pageX : e.pageX;
			image.touchesCurrent.y = evCache.length > 0 ? evCache[0].pageY : e.pageY;
			const touchesDiff = Math.max(Math.abs(image.touchesCurrent.x - image.touchesStart.x), Math.abs(image.touchesCurrent.y - image.touchesStart.y));
			if (touchesDiff > 5) {
				swiper.allowClick = false;
			}
			if (!image.isMoved && !isScaling) {
				if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
					image.isTouched = false;
					return;
				}
				if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
					image.isTouched = false;
					return;
				}
			}
			if (e.cancelable) {
				e.preventDefault();
			}
			e.stopPropagation();
			image.isMoved = true;
			const scaleRatio = (zoom.scale - currentScale) / (gesture.maxRatio - swiper.params.zoom.minRatio);
			const {
				originX,
				originY
			} = gesture;
			image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX + scaleRatio * (image.width - originX * 2);
			image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY + scaleRatio * (image.height - originY * 2);
			if (image.currentX < image.minX) {
				image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
			}
			if (image.currentX > image.maxX) {
				image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
			}
			if (image.currentY < image.minY) {
				image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
			}
			if (image.currentY > image.maxY) {
				image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
			}
			// Velocity
			if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
			if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
			if (!velocity.prevTime) velocity.prevTime = Date.now();
			velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
			velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
			if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
			if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
			velocity.prevPositionX = image.touchesCurrent.x;
			velocity.prevPositionY = image.touchesCurrent.y;
			velocity.prevTime = Date.now();
			gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
		}

		function onTouchEnd() {
			const zoom = swiper.zoom;
			if (!gesture.imageEl) return;
			if (!image.isTouched || !image.isMoved) {
				image.isTouched = false;
				image.isMoved = false;
				return;
			}
			image.isTouched = false;
			image.isMoved = false;
			let momentumDurationX = 300;
			let momentumDurationY = 300;
			const momentumDistanceX = velocity.x * momentumDurationX;
			const newPositionX = image.currentX + momentumDistanceX;
			const momentumDistanceY = velocity.y * momentumDurationY;
			const newPositionY = image.currentY + momentumDistanceY;
			// Fix duration
			if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
			if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
			const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
			image.currentX = newPositionX;
			image.currentY = newPositionY;
			// Define if we need image drag
			const scaledWidth = image.width * zoom.scale;
			const scaledHeight = image.height * zoom.scale;
			image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
			image.maxX = -image.minX;
			image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
			image.maxY = -image.minY;
			image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
			image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
			gesture.imageWrapEl.style.transitionDuration = `${momentumDuration}ms`;
			gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
		}

		function onTransitionEnd() {
			const zoom = swiper.zoom;
			if (gesture.slideEl && swiper.activeIndex !== swiper.slides.indexOf(gesture.slideEl)) {
				if (gesture.imageEl) {
					gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
				}
				if (gesture.imageWrapEl) {
					gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
				}
				gesture.slideEl.classList.remove(`${swiper.params.zoom.zoomedSlideClass}`);
				zoom.scale = 1;
				currentScale = 1;
				gesture.slideEl = undefined;
				gesture.imageEl = undefined;
				gesture.imageWrapEl = undefined;
				gesture.originX = 0;
				gesture.originY = 0;
			}
		}

		function zoomIn(e) {
			const zoom = swiper.zoom;
			const params = swiper.params.zoom;
			if (!gesture.slideEl) {
				if (e && e.target) {
					gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
				}
				if (!gesture.slideEl) {
					if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
						gesture.slideEl = elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
					} else {
						gesture.slideEl = swiper.slides[swiper.activeIndex];
					}
				}
				let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
				if (imageEl) {
					imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
				}
				gesture.imageEl = imageEl;
				if (imageEl) {
					gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
				} else {
					gesture.imageWrapEl = undefined;
				}
			}
			if (!gesture.imageEl || !gesture.imageWrapEl) return;
			if (swiper.params.cssMode) {
				swiper.wrapperEl.style.overflow = 'hidden';
				swiper.wrapperEl.style.touchAction = 'none';
			}
			gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
			let touchX;
			let touchY;
			let offsetX;
			let offsetY;
			let diffX;
			let diffY;
			let translateX;
			let translateY;
			let imageWidth;
			let imageHeight;
			let scaledWidth;
			let scaledHeight;
			let translateMinX;
			let translateMinY;
			let translateMaxX;
			let translateMaxY;
			let slideWidth;
			let slideHeight;
			if (typeof image.touchesStart.x === 'undefined' && e) {
				touchX = e.pageX;
				touchY = e.pageY;
			} else {
				touchX = image.touchesStart.x;
				touchY = image.touchesStart.y;
			}
			const forceZoomRatio = typeof e === 'number' ? e : null;
			if (currentScale === 1 && forceZoomRatio) {
				touchX = undefined;
				touchY = undefined;
			}
			zoom.scale = forceZoomRatio || gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
			currentScale = forceZoomRatio || gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
			if (e && !(currentScale === 1 && forceZoomRatio)) {
				slideWidth = gesture.slideEl.offsetWidth;
				slideHeight = gesture.slideEl.offsetHeight;
				offsetX = elementOffset(gesture.slideEl).left + window.scrollX;
				offsetY = elementOffset(gesture.slideEl).top + window.scrollY;
				diffX = offsetX + slideWidth / 2 - touchX;
				diffY = offsetY + slideHeight / 2 - touchY;
				imageWidth = gesture.imageEl.offsetWidth;
				imageHeight = gesture.imageEl.offsetHeight;
				scaledWidth = imageWidth * zoom.scale;
				scaledHeight = imageHeight * zoom.scale;
				translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
				translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
				translateMaxX = -translateMinX;
				translateMaxY = -translateMinY;
				translateX = diffX * zoom.scale;
				translateY = diffY * zoom.scale;
				if (translateX < translateMinX) {
					translateX = translateMinX;
				}
				if (translateX > translateMaxX) {
					translateX = translateMaxX;
				}
				if (translateY < translateMinY) {
					translateY = translateMinY;
				}
				if (translateY > translateMaxY) {
					translateY = translateMaxY;
				}
			} else {
				translateX = 0;
				translateY = 0;
			}
			if (forceZoomRatio && zoom.scale === 1) {
				gesture.originX = 0;
				gesture.originY = 0;
			}
			gesture.imageWrapEl.style.transitionDuration = '300ms';
			gesture.imageWrapEl.style.transform = `translate3d(${translateX}px, ${translateY}px,0)`;
			gesture.imageEl.style.transitionDuration = '300ms';
			gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
		}

		function zoomOut() {
			const zoom = swiper.zoom;
			const params = swiper.params.zoom;
			if (!gesture.slideEl) {
				if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
					gesture.slideEl = elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
				} else {
					gesture.slideEl = swiper.slides[swiper.activeIndex];
				}
				let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
				if (imageEl) {
					imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
				}
				gesture.imageEl = imageEl;
				if (imageEl) {
					gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
				} else {
					gesture.imageWrapEl = undefined;
				}
			}
			if (!gesture.imageEl || !gesture.imageWrapEl) return;
			if (swiper.params.cssMode) {
				swiper.wrapperEl.style.overflow = '';
				swiper.wrapperEl.style.touchAction = '';
			}
			zoom.scale = 1;
			currentScale = 1;
			gesture.imageWrapEl.style.transitionDuration = '300ms';
			gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
			gesture.imageEl.style.transitionDuration = '300ms';
			gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
			gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
			gesture.slideEl = undefined;
			gesture.originX = 0;
			gesture.originY = 0;
		}
		// Toggle Zoom
		function zoomToggle(e) {
			const zoom = swiper.zoom;
			if (zoom.scale && zoom.scale !== 1) {
				// Zoom Out
				zoomOut();
			} else {
				// Zoom In
				zoomIn(e);
			}
		}

		function getListeners() {
			const passiveListener = swiper.params.passiveListeners ? {
				passive: true,
				capture: false
			} : false;
			const activeListenerWithCapture = swiper.params.passiveListeners ? {
				passive: false,
				capture: true
			} : true;
			return {
				passiveListener,
				activeListenerWithCapture
			};
		}
		// Attach/Detach Events
		function enable() {
			const zoom = swiper.zoom;
			if (zoom.enabled) return;
			zoom.enabled = true;
			const {
				passiveListener,
				activeListenerWithCapture
			} = getListeners();
			// Scale image
			swiper.wrapperEl.addEventListener('pointerdown', onGestureStart, passiveListener);
			swiper.wrapperEl.addEventListener('pointermove', onGestureChange, activeListenerWithCapture);
			['pointerup', 'pointercancel', 'pointerout'].forEach(eventName => {
				swiper.wrapperEl.addEventListener(eventName, onGestureEnd, passiveListener);
			});
			// Move image
			swiper.wrapperEl.addEventListener('pointermove', onTouchMove, activeListenerWithCapture);
		}

		function disable() {
			const zoom = swiper.zoom;
			if (!zoom.enabled) return;
			zoom.enabled = false;
			const {
				passiveListener,
				activeListenerWithCapture
			} = getListeners();
			// Scale image
			swiper.wrapperEl.removeEventListener('pointerdown', onGestureStart, passiveListener);
			swiper.wrapperEl.removeEventListener('pointermove', onGestureChange, activeListenerWithCapture);
			['pointerup', 'pointercancel', 'pointerout'].forEach(eventName => {
				swiper.wrapperEl.removeEventListener(eventName, onGestureEnd, passiveListener);
			});
			// Move image
			swiper.wrapperEl.removeEventListener('pointermove', onTouchMove, activeListenerWithCapture);
		}
		on('init', () => {
			if (swiper.params.zoom.enabled) {
				enable();
			}
		});
		on('destroy', () => {
			disable();
		});
		on('touchStart', (_s, e) => {
			if (!swiper.zoom.enabled) return;
			onTouchStart(e);
		});
		on('touchEnd', (_s, e) => {
			if (!swiper.zoom.enabled) return;
			onTouchEnd();
		});
		on('doubleTap', (_s, e) => {
			if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
				zoomToggle(e);
			}
		});
		on('transitionEnd', () => {
			if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
				onTransitionEnd();
			}
		});
		on('slideChange', () => {
			if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
				onTransitionEnd();
			}
		});
		Object.assign(swiper.zoom, {
			enable,
			disable,
			in: zoomIn,
			out: zoomOut,
			toggle: zoomToggle
		});
	}
	/* eslint no-bitwise: ["error", { "allow": [">>"] }] */
	function Controller(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			controller: {
				control: undefined,
				inverse: false,
				by: 'slide' // or 'container'
			}
		});
		swiper.controller = {
			control: undefined
		};

		function LinearSpline(x, y) {
			const binarySearch = function search() {
				let maxIndex;
				let minIndex;
				let guess;
				return (array, val) => {
					minIndex = -1;
					maxIndex = array.length;
					while (maxIndex - minIndex > 1) {
						guess = maxIndex + minIndex >> 1;
						if (array[guess] <= val) {
							minIndex = guess;
						} else {
							maxIndex = guess;
						}
					}
					return maxIndex;
				};
			}();
			this.x = x;
			this.y = y;
			this.lastIndex = x.length - 1;
			// Given an x value (x2), return the expected y2 value:
			// (x1,y1) is the known point before given value,
			// (x3,y3) is the known point after given value.
			let i1;
			let i3;
			this.interpolate = function interpolate(x2) {
				if (!x2) return 0;
				// Get the indexes of x1 and x3 (the array indexes before and after given x2):
				i3 = binarySearch(this.x, x2);
				i1 = i3 - 1;
				// We have our indexes i1 & i3, so we can calculate already:
				// y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
				return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
			};
			return this;
		}

		function getInterpolateFunction(c) {
			swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
		}

		function setTranslate(_t, byController) {
			const controlled = swiper.controller.control;
			let multiplier;
			let controlledTranslate;
			const Swiper = swiper.constructor;

			function setControlledTranslate(c) {
				if (c.destroyed) return;
				// this will create an Interpolate function based on the snapGrids
				// x is the Grid of the scrolled scroller and y will be the controlled scroller
				// it makes sense to create this only once and recall it for the interpolation
				// the function does a lot of value caching for performance
				const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
				if (swiper.params.controller.by === 'slide') {
					getInterpolateFunction(c);
					// i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
					// but it did not work out
					controlledTranslate = -swiper.controller.spline.interpolate(-translate);
				}
				if (!controlledTranslate || swiper.params.controller.by === 'container') {
					multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
					if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
						multiplier = 1;
					}
					controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
				}
				if (swiper.params.controller.inverse) {
					controlledTranslate = c.maxTranslate() - controlledTranslate;
				}
				c.updateProgress(controlledTranslate);
				c.setTranslate(controlledTranslate, swiper);
				c.updateActiveIndex();
				c.updateSlidesClasses();
			}
			if (Array.isArray(controlled)) {
				for (let i = 0; i < controlled.length; i += 1) {
					if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
						setControlledTranslate(controlled[i]);
					}
				}
			} else if (controlled instanceof Swiper && byController !== controlled) {
				setControlledTranslate(controlled);
			}
		}

		function setTransition(duration, byController) {
			const Swiper = swiper.constructor;
			const controlled = swiper.controller.control;
			let i;

			function setControlledTransition(c) {
				if (c.destroyed) return;
				c.setTransition(duration, swiper);
				if (duration !== 0) {
					c.transitionStart();
					if (c.params.autoHeight) {
						nextTick(() => {
							c.updateAutoHeight();
						});
					}
					elementTransitionEnd(c.wrapperEl, () => {
						if (!controlled) return;
						c.transitionEnd();
					});
				}
			}
			if (Array.isArray(controlled)) {
				for (i = 0; i < controlled.length; i += 1) {
					if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
						setControlledTransition(controlled[i]);
					}
				}
			} else if (controlled instanceof Swiper && byController !== controlled) {
				setControlledTransition(controlled);
			}
		}

		function removeSpline() {
			if (!swiper.controller.control) return;
			if (swiper.controller.spline) {
				swiper.controller.spline = undefined;
				delete swiper.controller.spline;
			}
		}
		on('beforeInit', () => {
			if (typeof window !== 'undefined' && (
					// eslint-disable-line
					typeof swiper.params.controller.control === 'string' || swiper.params.controller.control instanceof HTMLElement)) {
				const controlElement = document.querySelector(swiper.params.controller.control);
				if (controlElement && controlElement.swiper) {
					swiper.controller.control = controlElement.swiper;
				} else if (controlElement) {
					const onControllerSwiper = e => {
						swiper.controller.control = e.detail[0];
						swiper.update();
						controlElement.removeEventListener('init', onControllerSwiper);
					};
					controlElement.addEventListener('init', onControllerSwiper);
				}
				return;
			}
			swiper.controller.control = swiper.params.controller.control;
		});
		on('update', () => {
			removeSpline();
		});
		on('resize', () => {
			removeSpline();
		});
		on('observerUpdate', () => {
			removeSpline();
		});
		on('setTranslate', (_s, translate, byController) => {
			if (!swiper.controller.control || swiper.controller.control.destroyed) return;
			swiper.controller.setTranslate(translate, byController);
		});
		on('setTransition', (_s, duration, byController) => {
			if (!swiper.controller.control || swiper.controller.control.destroyed) return;
			swiper.controller.setTransition(duration, byController);
		});
		Object.assign(swiper.controller, {
			setTranslate,
			setTransition
		});
	}

	function A11y(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			a11y: {
				enabled: true,
				notificationClass: 'swiper-notification',
				prevSlideMessage: 'Previous slide',
				nextSlideMessage: 'Next slide',
				firstSlideMessage: 'This is the first slide',
				lastSlideMessage: 'This is the last slide',
				paginationBulletMessage: 'Go to slide {{index}}',
				slideLabelMessage: '{{index}} / {{slidesLength}}',
				containerMessage: null,
				containerRoleDescriptionMessage: null,
				itemRoleDescriptionMessage: null,
				slideRole: 'group',
				id: null
			}
		});
		swiper.a11y = {
			clicked: false
		};
		let liveRegion = null;

		function notify(message) {
			const notification = liveRegion;
			if (notification.length === 0) return;
			notification.innerHTML = '';
			notification.innerHTML = message;
		}
		const makeElementsArray = el => {
			if (!Array.isArray(el)) el = [el].filter(e => !!e);
			return el;
		};

		function getRandomNumber(size) {
			if (size === void 0) {
				size = 16;
			}
			const randomChar = () => Math.round(16 * Math.random()).toString(16);
			return 'x'.repeat(size).replace(/x/g, randomChar);
		}

		function makeElFocusable(el) {
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.setAttribute('tabIndex', '0');
			});
		}

		function makeElNotFocusable(el) {
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.setAttribute('tabIndex', '-1');
			});
		}

		function addElRole(el, role) {
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.setAttribute('role', role);
			});
		}

		function addElRoleDescription(el, description) {
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.setAttribute('aria-roledescription', description);
			});
		}

		function addElControls(el, controls) {
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.setAttribute('aria-controls', controls);
			});
		}

		function addElLabel(el, label) {
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.setAttribute('aria-label', label);
			});
		}

		function addElId(el, id) {
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.setAttribute('id', id);
			});
		}

		function addElLive(el, live) {
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.setAttribute('aria-live', live);
			});
		}

		function disableEl(el) {
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.setAttribute('aria-disabled', true);
			});
		}

		function enableEl(el) {
			el = makeElementsArray(el);
			el.forEach(subEl => {
				subEl.setAttribute('aria-disabled', false);
			});
		}

		function onEnterOrSpaceKey(e) {
			if (e.keyCode !== 13 && e.keyCode !== 32) return;
			const params = swiper.params.a11y;
			const targetEl = e.target;
			if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target))) {
				if (!e.target.matches(classesToSelector(swiper.params.pagination.bulletClass))) return;
			}
			if (swiper.navigation && swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl) {
				if (!(swiper.isEnd && !swiper.params.loop)) {
					swiper.slideNext();
				}
				if (swiper.isEnd) {
					notify(params.lastSlideMessage);
				} else {
					notify(params.nextSlideMessage);
				}
			}
			if (swiper.navigation && swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl) {
				if (!(swiper.isBeginning && !swiper.params.loop)) {
					swiper.slidePrev();
				}
				if (swiper.isBeginning) {
					notify(params.firstSlideMessage);
				} else {
					notify(params.prevSlideMessage);
				}
			}
			if (swiper.pagination && targetEl.matches(classesToSelector(swiper.params.pagination.bulletClass))) {
				targetEl.click();
			}
		}

		function updateNavigation() {
			if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
			const {
				nextEl,
				prevEl
			} = swiper.navigation;
			if (prevEl) {
				if (swiper.isBeginning) {
					disableEl(prevEl);
					makeElNotFocusable(prevEl);
				} else {
					enableEl(prevEl);
					makeElFocusable(prevEl);
				}
			}
			if (nextEl) {
				if (swiper.isEnd) {
					disableEl(nextEl);
					makeElNotFocusable(nextEl);
				} else {
					enableEl(nextEl);
					makeElFocusable(nextEl);
				}
			}
		}

		function hasPagination() {
			return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
		}

		function hasClickablePagination() {
			return hasPagination() && swiper.params.pagination.clickable;
		}

		function updatePagination() {
			const params = swiper.params.a11y;
			if (!hasPagination()) return;
			swiper.pagination.bullets.forEach(bulletEl => {
				if (swiper.params.pagination.clickable) {
					makeElFocusable(bulletEl);
					if (!swiper.params.pagination.renderBullet) {
						addElRole(bulletEl, 'button');
						addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, elementIndex(bulletEl) + 1));
					}
				}
				if (bulletEl.matches(classesToSelector(swiper.params.pagination.bulletActiveClass))) {
					bulletEl.setAttribute('aria-current', 'true');
				} else {
					bulletEl.removeAttribute('aria-current');
				}
			});
		}
		const initNavEl = (el, wrapperId, message) => {
			makeElFocusable(el);
			if (el.tagName !== 'BUTTON') {
				addElRole(el, 'button');
				el.addEventListener('keydown', onEnterOrSpaceKey);
			}
			addElLabel(el, message);
			addElControls(el, wrapperId);
		};
		const handlePointerDown = () => {
			swiper.a11y.clicked = true;
		};
		const handlePointerUp = () => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					if (!swiper.destroyed) {
						swiper.a11y.clicked = false;
					}
				});
			});
		};
		const handleFocus = e => {
			if (swiper.a11y.clicked) return;
			const slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
			if (!slideEl || !swiper.slides.includes(slideEl)) return;
			const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
			const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
			if (isActive || isVisible) return;
			if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
			if (swiper.isHorizontal()) {
				swiper.el.scrollLeft = 0;
			} else {
				swiper.el.scrollTop = 0;
			}
			swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
		};
		const initSlides = () => {
			const params = swiper.params.a11y;
			if (params.itemRoleDescriptionMessage) {
				addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
			}
			if (params.slideRole) {
				addElRole(swiper.slides, params.slideRole);
			}
			const slidesLength = swiper.slides.length;
			if (params.slideLabelMessage) {
				swiper.slides.forEach((slideEl, index) => {
					const slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10) : index;
					const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
					addElLabel(slideEl, ariaLabelMessage);
				});
			}
		};
		const init = () => {
			const params = swiper.params.a11y;
			if (swiper.isElement) {
				swiper.el.shadowEl.append(liveRegion);
			} else {
				swiper.el.append(liveRegion);
			}
			// Container
			const containerEl = swiper.el;
			if (params.containerRoleDescriptionMessage) {
				addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
			}
			if (params.containerMessage) {
				addElLabel(containerEl, params.containerMessage);
			}
			// Wrapper
			const wrapperEl = swiper.wrapperEl;
			const wrapperId = params.id || wrapperEl.getAttribute('id') || `swiper-wrapper-${getRandomNumber(16)}`;
			const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
			addElId(wrapperEl, wrapperId);
			addElLive(wrapperEl, live);
			// Slide
			initSlides();
			// Navigation
			let {
				nextEl,
				prevEl
			} = swiper.navigation ? swiper.navigation : {};
			nextEl = makeElementsArray(nextEl);
			prevEl = makeElementsArray(prevEl);
			if (nextEl) {
				nextEl.forEach(el => initNavEl(el, wrapperId, params.nextSlideMessage));
			}
			if (prevEl) {
				prevEl.forEach(el => initNavEl(el, wrapperId, params.prevSlideMessage));
			}
			// Pagination
			if (hasClickablePagination()) {
				const paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [swiper.pagination.el];
				paginationEl.forEach(el => {
					el.addEventListener('keydown', onEnterOrSpaceKey);
				});
			}
			// Tab focus
			swiper.el.addEventListener('focus', handleFocus, true);
			swiper.el.addEventListener('pointerdown', handlePointerDown, true);
			swiper.el.addEventListener('pointerup', handlePointerUp, true);
		};

		function destroy() {
			if (liveRegion) liveRegion.remove();
			let {
				nextEl,
				prevEl
			} = swiper.navigation ? swiper.navigation : {};
			nextEl = makeElementsArray(nextEl);
			prevEl = makeElementsArray(prevEl);
			if (nextEl) {
				nextEl.forEach(el => el.removeEventListener('keydown', onEnterOrSpaceKey));
			}
			if (prevEl) {
				prevEl.forEach(el => el.removeEventListener('keydown', onEnterOrSpaceKey));
			}
			// Pagination
			if (hasClickablePagination()) {
				const paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [swiper.pagination.el];
				paginationEl.forEach(el => {
					el.removeEventListener('keydown', onEnterOrSpaceKey);
				});
			}
			// Tab focus
			swiper.el.removeEventListener('focus', handleFocus, true);
			swiper.el.removeEventListener('pointerdown', handlePointerDown, true);
			swiper.el.removeEventListener('pointerup', handlePointerUp, true);
		}
		on('beforeInit', () => {
			liveRegion = createElement('span', swiper.params.a11y.notificationClass);
			liveRegion.setAttribute('aria-live', 'assertive');
			liveRegion.setAttribute('aria-atomic', 'true');
		});
		on('afterInit', () => {
			if (!swiper.params.a11y.enabled) return;
			init();
		});
		on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
			if (!swiper.params.a11y.enabled) return;
			initSlides();
		});
		on('fromEdge toEdge afterInit lock unlock', () => {
			if (!swiper.params.a11y.enabled) return;
			updateNavigation();
		});
		on('paginationUpdate', () => {
			if (!swiper.params.a11y.enabled) return;
			updatePagination();
		});
		on('destroy', () => {
			if (!swiper.params.a11y.enabled) return;
			destroy();
		});
	}

	function History(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			history: {
				enabled: false,
				root: '',
				replaceState: false,
				key: 'slides',
				keepQuery: false
			}
		});
		let initialized = false;
		let paths = {};
		const slugify = text => {
			return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
		};
		const getPathValues = urlOverride => {
			const window = getWindow();
			let location;
			if (urlOverride) {
				location = new URL(urlOverride);
			} else {
				location = window.location;
			}
			const pathArray = location.pathname.slice(1).split('/').filter(part => part !== '');
			const total = pathArray.length;
			const key = pathArray[total - 2];
			const value = pathArray[total - 1];
			return {
				key,
				value
			};
		};
		const setHistory = (key, index) => {
			const window = getWindow();
			if (!initialized || !swiper.params.history.enabled) return;
			let location;
			if (swiper.params.url) {
				location = new URL(swiper.params.url);
			} else {
				location = window.location;
			}
			const slide = swiper.slides[index];
			let value = slugify(slide.getAttribute('data-history'));
			if (swiper.params.history.root.length > 0) {
				let root = swiper.params.history.root;
				if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
				value = `${root}/${key ? `${key}/` : ''}${value}`;
			} else if (!location.pathname.includes(key)) {
				value = `${key ? `${key}/` : ''}${value}`;
			}
			if (swiper.params.history.keepQuery) {
				value += location.search;
			}
			const currentState = window.history.state;
			if (currentState && currentState.value === value) {
				return;
			}
			if (swiper.params.history.replaceState) {
				window.history.replaceState({
					value
				}, null, value);
			} else {
				window.history.pushState({
					value
				}, null, value);
			}
		};
		const scrollToSlide = (speed, value, runCallbacks) => {
			if (value) {
				for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
					const slide = swiper.slides[i];
					const slideHistory = slugify(slide.getAttribute('data-history'));
					if (slideHistory === value) {
						const index = swiper.getSlideIndex(slide);
						swiper.slideTo(index, speed, runCallbacks);
					}
				}
			} else {
				swiper.slideTo(0, speed, runCallbacks);
			}
		};
		const setHistoryPopState = () => {
			paths = getPathValues(swiper.params.url);
			scrollToSlide(swiper.params.speed, paths.value, false);
		};
		const init = () => {
			const window = getWindow();
			if (!swiper.params.history) return;
			if (!window.history || !window.history.pushState) {
				swiper.params.history.enabled = false;
				swiper.params.hashNavigation.enabled = true;
				return;
			}
			initialized = true;
			paths = getPathValues(swiper.params.url);
			if (!paths.key && !paths.value) {
				if (!swiper.params.history.replaceState) {
					window.addEventListener('popstate', setHistoryPopState);
				}
				return;
			}
			scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
			if (!swiper.params.history.replaceState) {
				window.addEventListener('popstate', setHistoryPopState);
			}
		};
		const destroy = () => {
			const window = getWindow();
			if (!swiper.params.history.replaceState) {
				window.removeEventListener('popstate', setHistoryPopState);
			}
		};
		on('init', () => {
			if (swiper.params.history.enabled) {
				init();
			}
		});
		on('destroy', () => {
			if (swiper.params.history.enabled) {
				destroy();
			}
		});
		on('transitionEnd _freeModeNoMomentumRelease', () => {
			if (initialized) {
				setHistory(swiper.params.history.key, swiper.activeIndex);
			}
		});
		on('slideChange', () => {
			if (initialized && swiper.params.cssMode) {
				setHistory(swiper.params.history.key, swiper.activeIndex);
			}
		});
	}

	function HashNavigation(_ref) {
		let {
			swiper,
			extendParams,
			emit,
			on
		} = _ref;
		let initialized = false;
		const document = getDocument();
		const window = getWindow();
		extendParams({
			hashNavigation: {
				enabled: false,
				replaceState: false,
				watchState: false,
				getSlideIndex(_s, hash) {
					if (swiper.virtual && swiper.params.virtual.enabled) {
						const slideWithHash = swiper.slides.filter(slideEl => slideEl.getAttribute('data-hash') === hash)[0];
						if (!slideWithHash) return 0;
						const index = parseInt(slideWithHash.getAttribute('data-swiper-slide-index'), 10);
						return index;
					}
					return swiper.getSlideIndex(elementChildren(swiper.slidesEl, `.${swiper.params.slideClass}[data-hash="${hash}"], swiper-slide[data-hash="${hash}"]`)[0]);
				}
			}
		});
		const onHashChange = () => {
			emit('hashChange');
			const newHash = document.location.hash.replace('#', '');
			const activeSlideEl = swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`);
			const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') : '';
			if (newHash !== activeSlideHash) {
				const newIndex = swiper.params.hashNavigation.getSlideIndex(swiper, newHash);
				if (typeof newIndex === 'undefined' || Number.isNaN(newIndex)) return;
				swiper.slideTo(newIndex);
			}
		};
		const setHash = () => {
			if (!initialized || !swiper.params.hashNavigation.enabled) return;
			const activeSlideEl = swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`);
			const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') || activeSlideEl.getAttribute('data-history') : '';
			if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
				window.history.replaceState(null, null, `#${activeSlideHash}` || '');
				emit('hashSet');
			} else {
				document.location.hash = activeSlideHash || '';
				emit('hashSet');
			}
		};
		const init = () => {
			if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
			initialized = true;
			const hash = document.location.hash.replace('#', '');
			if (hash) {
				const speed = 0;
				const index = swiper.params.hashNavigation.getSlideIndex(swiper, hash);
				swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
			}
			if (swiper.params.hashNavigation.watchState) {
				window.addEventListener('hashchange', onHashChange);
			}
		};
		const destroy = () => {
			if (swiper.params.hashNavigation.watchState) {
				window.removeEventListener('hashchange', onHashChange);
			}
		};
		on('init', () => {
			if (swiper.params.hashNavigation.enabled) {
				init();
			}
		});
		on('destroy', () => {
			if (swiper.params.hashNavigation.enabled) {
				destroy();
			}
		});
		on('transitionEnd _freeModeNoMomentumRelease', () => {
			if (initialized) {
				setHash();
			}
		});
		on('slideChange', () => {
			if (initialized && swiper.params.cssMode) {
				setHash();
			}
		});
	}
	/* eslint no-underscore-dangle: "off" */
	function Autoplay(_ref) {
		let {
			swiper,
			extendParams,
			on,
			emit,
			params
		} = _ref;
		swiper.autoplay = {
			running: false,
			paused: false,
			timeLeft: 0
		};
		extendParams({
			autoplay: {
				enabled: false,
				delay: 3000,
				waitForTransition: true,
				disableOnInteraction: true,
				stopOnLastSlide: false,
				reverseDirection: false,
				pauseOnMouseEnter: false
			}
		});
		let timeout;
		let raf;
		let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3000;
		let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3000;
		let autoplayTimeLeft;
		let autoplayStartTime = new Date().getTime;
		let wasPaused;
		let isTouched;
		let pausedByTouch;
		let touchStartTimeout;
		let slideChanged;
		let pausedByInteraction;

		function onTransitionEnd(e) {
			if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
			if (e.target !== swiper.wrapperEl) return;
			swiper.wrapperEl.removeEventListener('transitionend', onTransitionEnd);
			resume();
		}
		const calcTimeLeft = () => {
			if (swiper.destroyed || !swiper.autoplay.running) return;
			if (swiper.autoplay.paused) {
				wasPaused = true;
			} else if (wasPaused) {
				autoplayDelayCurrent = autoplayTimeLeft;
				wasPaused = false;
			}
			const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
			swiper.autoplay.timeLeft = timeLeft;
			emit('autoplayTimeLeft', timeLeft, timeLeft / autoplayDelayTotal);
			raf = requestAnimationFrame(() => {
				calcTimeLeft();
			});
		};
		const getSlideDelay = () => {
			let activeSlideEl;
			if (swiper.virtual && swiper.params.virtual.enabled) {
				activeSlideEl = swiper.slides.filter(slideEl => slideEl.classList.contains('swiper-slide-active'))[0];
			} else {
				activeSlideEl = swiper.slides[swiper.activeIndex];
			}
			if (!activeSlideEl) return undefined;
			const currentSlideDelay = parseInt(activeSlideEl.getAttribute('data-swiper-autoplay'), 10);
			return currentSlideDelay;
		};
		const run = delayForce => {
			if (swiper.destroyed || !swiper.autoplay.running) return;
			cancelAnimationFrame(raf);
			calcTimeLeft();
			let delay = typeof delayForce === 'undefined' ? swiper.params.autoplay.delay : delayForce;
			autoplayDelayTotal = swiper.params.autoplay.delay;
			autoplayDelayCurrent = swiper.params.autoplay.delay;
			const currentSlideDelay = getSlideDelay();
			if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === 'undefined') {
				delay = currentSlideDelay;
				autoplayDelayTotal = currentSlideDelay;
				autoplayDelayCurrent = currentSlideDelay;
			}
			autoplayTimeLeft = delay;
			const speed = swiper.params.speed;
			const proceed = () => {
				if (!swiper || swiper.destroyed) return;
				if (swiper.params.autoplay.reverseDirection) {
					if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
						swiper.slidePrev(speed, true, true);
						emit('autoplay');
					} else if (!swiper.params.autoplay.stopOnLastSlide) {
						swiper.slideTo(swiper.slides.length - 1, speed, true, true);
						emit('autoplay');
					}
				} else {
					if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
						swiper.slideNext(speed, true, true);
						emit('autoplay');
					} else if (!swiper.params.autoplay.stopOnLastSlide) {
						swiper.slideTo(0, speed, true, true);
						emit('autoplay');
					}
				}
				if (swiper.params.cssMode) {
					autoplayStartTime = new Date().getTime();
					requestAnimationFrame(() => {
						run();
					});
				}
			};
			if (delay > 0) {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					proceed();
				}, delay);
			} else {
				requestAnimationFrame(() => {
					proceed();
				});
			}
			// eslint-disable-next-line
			return delay;
		};
		const start = () => {
			swiper.autoplay.running = true;
			run();
			emit('autoplayStart');
		};
		const stop = () => {
			swiper.autoplay.running = false;
			clearTimeout(timeout);
			cancelAnimationFrame(raf);
			emit('autoplayStop');
		};
		const pause = (internal, reset) => {
			if (swiper.destroyed || !swiper.autoplay.running) return;
			clearTimeout(timeout);
			if (!internal) {
				pausedByInteraction = true;
			}
			const proceed = () => {
				emit('autoplayPause');
				if (swiper.params.autoplay.waitForTransition) {
					swiper.wrapperEl.addEventListener('transitionend', onTransitionEnd);
				} else {
					resume();
				}
			};
			swiper.autoplay.paused = true;
			if (reset) {
				if (slideChanged) {
					autoplayTimeLeft = swiper.params.autoplay.delay;
				}
				slideChanged = false;
				proceed();
				return;
			}
			const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
			autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
			if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
			if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
			proceed();
		};
		const resume = () => {
			if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
			autoplayStartTime = new Date().getTime();
			if (pausedByInteraction) {
				pausedByInteraction = false;
				run(autoplayTimeLeft);
			} else {
				run();
			}
			swiper.autoplay.paused = false;
			emit('autoplayResume');
		};
		const onVisibilityChange = () => {
			if (swiper.destroyed || !swiper.autoplay.running) return;
			const document = getDocument();
			if (document.visibilityState === 'hidden') {
				pausedByInteraction = true;
				pause(true);
			}
			if (document.visibilityState === 'visible') {
				resume();
			}
		};
		const onPointerEnter = e => {
			if (e.pointerType !== 'mouse') return;
			pausedByInteraction = true;
			pause(true);
		};
		const onPointerLeave = e => {
			if (e.pointerType !== 'mouse') return;
			if (swiper.autoplay.paused) {
				resume();
			}
		};
		const attachMouseEvents = () => {
			if (swiper.params.autoplay.pauseOnMouseEnter) {
				swiper.el.addEventListener('pointerenter', onPointerEnter);
				swiper.el.addEventListener('pointerleave', onPointerLeave);
			}
		};
		const detachMouseEvents = () => {
			swiper.el.removeEventListener('pointerenter', onPointerEnter);
			swiper.el.removeEventListener('pointerleave', onPointerLeave);
		};
		const attachDocumentEvents = () => {
			const document = getDocument();
			document.addEventListener('visibilitychange', onVisibilityChange);
		};
		const detachDocumentEvents = () => {
			const document = getDocument();
			document.removeEventListener('visibilitychange', onVisibilityChange);
		};
		on('init', () => {
			if (swiper.params.autoplay.enabled) {
				attachMouseEvents();
				attachDocumentEvents();
				autoplayStartTime = new Date().getTime();
				start();
			}
		});
		on('destroy', () => {
			detachMouseEvents();
			detachDocumentEvents();
			if (swiper.autoplay.running) {
				stop();
			}
		});
		on('beforeTransitionStart', (_s, speed, internal) => {
			if (swiper.destroyed || !swiper.autoplay.running) return;
			if (internal || !swiper.params.autoplay.disableOnInteraction) {
				pause(true, true);
			} else {
				stop();
			}
		});
		on('sliderFirstMove', () => {
			if (swiper.destroyed || !swiper.autoplay.running) return;
			if (swiper.params.autoplay.disableOnInteraction) {
				stop();
				return;
			}
			isTouched = true;
			pausedByTouch = false;
			pausedByInteraction = false;
			touchStartTimeout = setTimeout(() => {
				pausedByInteraction = true;
				pausedByTouch = true;
				pause(true);
			}, 200);
		});
		on('touchEnd', () => {
			if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
			clearTimeout(touchStartTimeout);
			clearTimeout(timeout);
			if (swiper.params.autoplay.disableOnInteraction) {
				pausedByTouch = false;
				isTouched = false;
				return;
			}
			if (pausedByTouch && swiper.params.cssMode) resume();
			pausedByTouch = false;
			isTouched = false;
		});
		on('slideChange', () => {
			if (swiper.destroyed || !swiper.autoplay.running) return;
			slideChanged = true;
		});
		Object.assign(swiper.autoplay, {
			start,
			stop,
			pause,
			resume
		});
	}

	function Thumb(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			thumbs: {
				swiper: null,
				multipleActiveThumbs: true,
				autoScrollOffset: 0,
				slideThumbActiveClass: 'swiper-slide-thumb-active',
				thumbsContainerClass: 'swiper-thumbs'
			}
		});
		let initialized = false;
		let swiperCreated = false;
		swiper.thumbs = {
			swiper: null
		};

		function onThumbClick() {
			const thumbsSwiper = swiper.thumbs.swiper;
			if (!thumbsSwiper || thumbsSwiper.destroyed) return;
			const clickedIndex = thumbsSwiper.clickedIndex;
			const clickedSlide = thumbsSwiper.clickedSlide;
			if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass)) return;
			if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
			let slideToIndex;
			if (thumbsSwiper.params.loop) {
				slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
			} else {
				slideToIndex = clickedIndex;
			}
			if (swiper.params.loop) {
				swiper.slideToLoop(slideToIndex);
			} else {
				swiper.slideTo(slideToIndex);
			}
		}

		function init() {
			const {
				thumbs: thumbsParams
			} = swiper.params;
			if (initialized) return false;
			initialized = true;
			const SwiperClass = swiper.constructor;
			if (thumbsParams.swiper instanceof SwiperClass) {
				swiper.thumbs.swiper = thumbsParams.swiper;
				Object.assign(swiper.thumbs.swiper.originalParams, {
					watchSlidesProgress: true,
					slideToClickedSlide: false
				});
				Object.assign(swiper.thumbs.swiper.params, {
					watchSlidesProgress: true,
					slideToClickedSlide: false
				});
				swiper.thumbs.swiper.update();
			} else if (isObject(thumbsParams.swiper)) {
				const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
				Object.assign(thumbsSwiperParams, {
					watchSlidesProgress: true,
					slideToClickedSlide: false
				});
				swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
				swiperCreated = true;
			}
			swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
			swiper.thumbs.swiper.on('tap', onThumbClick);
			return true;
		}

		function update(initial) {
			const thumbsSwiper = swiper.thumbs.swiper;
			if (!thumbsSwiper || thumbsSwiper.destroyed) return;
			const slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
			// Activate thumbs
			let thumbsToActivate = 1;
			const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
			if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
				thumbsToActivate = swiper.params.slidesPerView;
			}
			if (!swiper.params.thumbs.multipleActiveThumbs) {
				thumbsToActivate = 1;
			}
			thumbsToActivate = Math.floor(thumbsToActivate);
			thumbsSwiper.slides.forEach(slideEl => slideEl.classList.remove(thumbActiveClass));
			if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
				for (let i = 0; i < thumbsToActivate; i += 1) {
					elementChildren(thumbsSwiper.slidesEl, `[data-swiper-slide-index="${swiper.realIndex + i}"]`).forEach(slideEl => {
						slideEl.classList.add(thumbActiveClass);
					});
				}
			} else {
				for (let i = 0; i < thumbsToActivate; i += 1) {
					if (thumbsSwiper.slides[swiper.realIndex + i]) {
						thumbsSwiper.slides[swiper.realIndex + i].classList.add(thumbActiveClass);
					}
				}
			}
			const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
			const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
			if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
				const currentThumbsIndex = thumbsSwiper.activeIndex;
				let newThumbsIndex;
				let direction;
				if (thumbsSwiper.params.loop) {
					const newThumbsSlide = thumbsSwiper.slides.filter(slideEl => slideEl.getAttribute('data-swiper-slide-index') === `${swiper.realIndex}`)[0];
					newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
					direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
				} else {
					newThumbsIndex = swiper.realIndex;
					direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
				}
				if (useOffset) {
					newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
				}
				if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
					if (thumbsSwiper.params.centeredSlides) {
						if (newThumbsIndex > currentThumbsIndex) {
							newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
						} else {
							newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
						}
					} else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1);
					thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
				}
			}
		}
		on('beforeInit', () => {
			const {
				thumbs
			} = swiper.params;
			if (!thumbs || !thumbs.swiper) return;
			if (typeof thumbs.swiper === 'string' || thumbs.swiper instanceof HTMLElement) {
				const document = getDocument();
				const getThumbsElementAndInit = () => {
					const thumbsElement = typeof thumbs.swiper === 'string' ? document.querySelector(thumbs.swiper) : thumbs.swiper;
					if (thumbsElement && thumbsElement.swiper) {
						thumbs.swiper = thumbsElement.swiper;
						init();
						update(true);
					} else if (thumbsElement) {
						const onThumbsSwiper = e => {
							thumbs.swiper = e.detail[0];
							thumbsElement.removeEventListener('init', onThumbsSwiper);
							init();
							update(true);
							thumbs.swiper.update();
							swiper.update();
						};
						thumbsElement.addEventListener('init', onThumbsSwiper);
					}
					return thumbsElement;
				};
				const watchForThumbsToAppear = () => {
					if (swiper.destroyed) return;
					const thumbsElement = getThumbsElementAndInit();
					if (!thumbsElement) {
						requestAnimationFrame(watchForThumbsToAppear);
					}
				};
				requestAnimationFrame(watchForThumbsToAppear);
			} else {
				init();
				update(true);
			}
		});
		on('slideChange update resize observerUpdate', () => {
			update();
		});
		on('setTransition', (_s, duration) => {
			const thumbsSwiper = swiper.thumbs.swiper;
			if (!thumbsSwiper || thumbsSwiper.destroyed) return;
			thumbsSwiper.setTransition(duration);
		});
		on('beforeDestroy', () => {
			const thumbsSwiper = swiper.thumbs.swiper;
			if (!thumbsSwiper || thumbsSwiper.destroyed) return;
			if (swiperCreated) {
				thumbsSwiper.destroy();
			}
		});
		Object.assign(swiper.thumbs, {
			init,
			update
		});
	}

	function freeMode(_ref) {
		let {
			swiper,
			extendParams,
			emit,
			once
		} = _ref;
		extendParams({
			freeMode: {
				enabled: false,
				momentum: true,
				momentumRatio: 1,
				momentumBounce: true,
				momentumBounceRatio: 1,
				momentumVelocityRatio: 1,
				sticky: false,
				minimumVelocity: 0.02
			}
		});

		function onTouchStart() {
			const translate = swiper.getTranslate();
			swiper.setTranslate(translate);
			swiper.setTransition(0);
			swiper.touchEventsData.velocities.length = 0;
			swiper.freeMode.onTouchEnd({
				currentPos: swiper.rtl ? swiper.translate : -swiper.translate
			});
		}

		function onTouchMove() {
			const {
				touchEventsData: data,
				touches
			} = swiper;
			// Velocity
			if (data.velocities.length === 0) {
				data.velocities.push({
					position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
					time: data.touchStartTime
				});
			}
			data.velocities.push({
				position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
				time: now()
			});
		}

		function onTouchEnd(_ref2) {
			let {
				currentPos
			} = _ref2;
			const {
				params,
				wrapperEl,
				rtlTranslate: rtl,
				snapGrid,
				touchEventsData: data
			} = swiper;
			// Time diff
			const touchEndTime = now();
			const timeDiff = touchEndTime - data.touchStartTime;
			if (currentPos < -swiper.minTranslate()) {
				swiper.slideTo(swiper.activeIndex);
				return;
			}
			if (currentPos > -swiper.maxTranslate()) {
				if (swiper.slides.length < snapGrid.length) {
					swiper.slideTo(snapGrid.length - 1);
				} else {
					swiper.slideTo(swiper.slides.length - 1);
				}
				return;
			}
			if (params.freeMode.momentum) {
				if (data.velocities.length > 1) {
					const lastMoveEvent = data.velocities.pop();
					const velocityEvent = data.velocities.pop();
					const distance = lastMoveEvent.position - velocityEvent.position;
					const time = lastMoveEvent.time - velocityEvent.time;
					swiper.velocity = distance / time;
					swiper.velocity /= 2;
					if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
						swiper.velocity = 0;
					}
					// this implies that the user stopped moving a finger then released.
					// There would be no events with distance zero, so the last event is stale.
					if (time > 150 || now() - lastMoveEvent.time > 300) {
						swiper.velocity = 0;
					}
				} else {
					swiper.velocity = 0;
				}
				swiper.velocity *= params.freeMode.momentumVelocityRatio;
				data.velocities.length = 0;
				let momentumDuration = 1000 * params.freeMode.momentumRatio;
				const momentumDistance = swiper.velocity * momentumDuration;
				let newPosition = swiper.translate + momentumDistance;
				if (rtl) newPosition = -newPosition;
				let doBounce = false;
				let afterBouncePosition;
				const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
				let needsLoopFix;
				if (newPosition < swiper.maxTranslate()) {
					if (params.freeMode.momentumBounce) {
						if (newPosition + swiper.maxTranslate() < -bounceAmount) {
							newPosition = swiper.maxTranslate() - bounceAmount;
						}
						afterBouncePosition = swiper.maxTranslate();
						doBounce = true;
						data.allowMomentumBounce = true;
					} else {
						newPosition = swiper.maxTranslate();
					}
					if (params.loop && params.centeredSlides) needsLoopFix = true;
				} else if (newPosition > swiper.minTranslate()) {
					if (params.freeMode.momentumBounce) {
						if (newPosition - swiper.minTranslate() > bounceAmount) {
							newPosition = swiper.minTranslate() + bounceAmount;
						}
						afterBouncePosition = swiper.minTranslate();
						doBounce = true;
						data.allowMomentumBounce = true;
					} else {
						newPosition = swiper.minTranslate();
					}
					if (params.loop && params.centeredSlides) needsLoopFix = true;
				} else if (params.freeMode.sticky) {
					let nextSlide;
					for (let j = 0; j < snapGrid.length; j += 1) {
						if (snapGrid[j] > -newPosition) {
							nextSlide = j;
							break;
						}
					}
					if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
						newPosition = snapGrid[nextSlide];
					} else {
						newPosition = snapGrid[nextSlide - 1];
					}
					newPosition = -newPosition;
				}
				if (needsLoopFix) {
					once('transitionEnd', () => {
						swiper.loopFix();
					});
				}
				// Fix duration
				if (swiper.velocity !== 0) {
					if (rtl) {
						momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
					} else {
						momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
					}
					if (params.freeMode.sticky) {
						// If freeMode.sticky is active and the user ends a swipe with a slow-velocity
						// event, then durations can be 20+ seconds to slide one (or zero!) slides.
						// It's easy to see this when simulating touch with mouse events. To fix this,
						// limit single-slide swipes to the default slide duration. This also has the
						// nice side effect of matching slide speed if the user stopped moving before
						// lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
						// For faster swipes, also apply limits (albeit higher ones).
						const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
						const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
						if (moveDistance < currentSlideSize) {
							momentumDuration = params.speed;
						} else if (moveDistance < 2 * currentSlideSize) {
							momentumDuration = params.speed * 1.5;
						} else {
							momentumDuration = params.speed * 2.5;
						}
					}
				} else if (params.freeMode.sticky) {
					swiper.slideToClosest();
					return;
				}
				if (params.freeMode.momentumBounce && doBounce) {
					swiper.updateProgress(afterBouncePosition);
					swiper.setTransition(momentumDuration);
					swiper.setTranslate(newPosition);
					swiper.transitionStart(true, swiper.swipeDirection);
					swiper.animating = true;
					elementTransitionEnd(wrapperEl, () => {
						if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
						emit('momentumBounce');
						swiper.setTransition(params.speed);
						setTimeout(() => {
							swiper.setTranslate(afterBouncePosition);
							elementTransitionEnd(wrapperEl, () => {
								if (!swiper || swiper.destroyed) return;
								swiper.transitionEnd();
							});
						}, 0);
					});
				} else if (swiper.velocity) {
					emit('_freeModeNoMomentumRelease');
					swiper.updateProgress(newPosition);
					swiper.setTransition(momentumDuration);
					swiper.setTranslate(newPosition);
					swiper.transitionStart(true, swiper.swipeDirection);
					if (!swiper.animating) {
						swiper.animating = true;
						elementTransitionEnd(wrapperEl, () => {
							if (!swiper || swiper.destroyed) return;
							swiper.transitionEnd();
						});
					}
				} else {
					swiper.updateProgress(newPosition);
				}
				swiper.updateActiveIndex();
				swiper.updateSlidesClasses();
			} else if (params.freeMode.sticky) {
				swiper.slideToClosest();
				return;
			} else if (params.freeMode) {
				emit('_freeModeNoMomentumRelease');
			}
			if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
				swiper.updateProgress();
				swiper.updateActiveIndex();
				swiper.updateSlidesClasses();
			}
		}
		Object.assign(swiper, {
			freeMode: {
				onTouchStart,
				onTouchMove,
				onTouchEnd
			}
		});
	}

	function Grid(_ref) {
		let {
			swiper,
			extendParams
		} = _ref;
		extendParams({
			grid: {
				rows: 1,
				fill: 'column'
			}
		});
		let slidesNumberEvenToRows;
		let slidesPerRow;
		let numFullColumns;
		const getSpaceBetween = () => {
			let spaceBetween = swiper.params.spaceBetween;
			if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
				spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiper.size;
			} else if (typeof spaceBetween === 'string') {
				spaceBetween = parseFloat(spaceBetween);
			}
			return spaceBetween;
		};
		const initSlides = slidesLength => {
			const {
				slidesPerView
			} = swiper.params;
			const {
				rows,
				fill
			} = swiper.params.grid;
			slidesPerRow = slidesNumberEvenToRows / rows;
			numFullColumns = Math.floor(slidesLength / rows);
			if (Math.floor(slidesLength / rows) === slidesLength / rows) {
				slidesNumberEvenToRows = slidesLength;
			} else {
				slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
			}
			if (slidesPerView !== 'auto' && fill === 'row') {
				slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
			}
		};
		const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
			const {
				slidesPerGroup
			} = swiper.params;
			const spaceBetween = getSpaceBetween();
			const {
				rows,
				fill
			} = swiper.params.grid;
			// Set slides order
			let newSlideOrderIndex;
			let column;
			let row;
			if (fill === 'row' && slidesPerGroup > 1) {
				const groupIndex = Math.floor(i / (slidesPerGroup * rows));
				const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
				const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
				row = Math.floor(slideIndexInGroup / columnsInGroup);
				column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
				newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
				slide.style.order = newSlideOrderIndex;
			} else if (fill === 'column') {
				column = Math.floor(i / rows);
				row = i - column * rows;
				if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
					row += 1;
					if (row >= rows) {
						row = 0;
						column += 1;
					}
				}
			} else {
				row = Math.floor(i / slidesPerRow);
				column = i - row * slidesPerRow;
			}
			slide.style[getDirectionLabel('margin-top')] = row !== 0 ? spaceBetween && `${spaceBetween}px` : '';
		};
		const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
			const {
				centeredSlides,
				roundLengths
			} = swiper.params;
			const spaceBetween = getSpaceBetween();
			const {
				rows
			} = swiper.params.grid;
			swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
			swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
			swiper.wrapperEl.style[getDirectionLabel('width')] = `${swiper.virtualSize + spaceBetween}px`;
			if (centeredSlides) {
				const newSlidesGrid = [];
				for (let i = 0; i < snapGrid.length; i += 1) {
					let slidesGridItem = snapGrid[i];
					if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
					if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
				}
				snapGrid.splice(0, snapGrid.length);
				snapGrid.push(...newSlidesGrid);
			}
		};
		swiper.grid = {
			initSlides,
			updateSlide,
			updateWrapperSize
		};
	}

	function appendSlide(slides) {
		const swiper = this;
		const {
			params,
			slidesEl
		} = swiper;
		if (params.loop) {
			swiper.loopDestroy();
		}
		const appendElement = slideEl => {
			if (typeof slideEl === 'string') {
				const tempDOM = document.createElement('div');
				tempDOM.innerHTML = slideEl;
				slidesEl.append(tempDOM.children[0]);
				tempDOM.innerHTML = '';
			} else {
				slidesEl.append(slideEl);
			}
		};
		if (typeof slides === 'object' && 'length' in slides) {
			for (let i = 0; i < slides.length; i += 1) {
				if (slides[i]) appendElement(slides[i]);
			}
		} else {
			appendElement(slides);
		}
		swiper.recalcSlides();
		if (params.loop) {
			swiper.loopCreate();
		}
		if (!params.observer || swiper.isElement) {
			swiper.update();
		}
	}

	function prependSlide(slides) {
		const swiper = this;
		const {
			params,
			activeIndex,
			slidesEl
		} = swiper;
		if (params.loop) {
			swiper.loopDestroy();
		}
		let newActiveIndex = activeIndex + 1;
		const prependElement = slideEl => {
			if (typeof slideEl === 'string') {
				const tempDOM = document.createElement('div');
				tempDOM.innerHTML = slideEl;
				slidesEl.prepend(tempDOM.children[0]);
				tempDOM.innerHTML = '';
			} else {
				slidesEl.prepend(slideEl);
			}
		};
		if (typeof slides === 'object' && 'length' in slides) {
			for (let i = 0; i < slides.length; i += 1) {
				if (slides[i]) prependElement(slides[i]);
			}
			newActiveIndex = activeIndex + slides.length;
		} else {
			prependElement(slides);
		}
		swiper.recalcSlides();
		if (params.loop) {
			swiper.loopCreate();
		}
		if (!params.observer || swiper.isElement) {
			swiper.update();
		}
		swiper.slideTo(newActiveIndex, 0, false);
	}

	function addSlide(index, slides) {
		const swiper = this;
		const {
			params,
			activeIndex,
			slidesEl
		} = swiper;
		let activeIndexBuffer = activeIndex;
		if (params.loop) {
			activeIndexBuffer -= swiper.loopedSlides;
			swiper.loopDestroy();
			swiper.recalcSlides();
		}
		const baseLength = swiper.slides.length;
		if (index <= 0) {
			swiper.prependSlide(slides);
			return;
		}
		if (index >= baseLength) {
			swiper.appendSlide(slides);
			return;
		}
		let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
		const slidesBuffer = [];
		for (let i = baseLength - 1; i >= index; i -= 1) {
			const currentSlide = swiper.slides[i];
			currentSlide.remove();
			slidesBuffer.unshift(currentSlide);
		}
		if (typeof slides === 'object' && 'length' in slides) {
			for (let i = 0; i < slides.length; i += 1) {
				if (slides[i]) slidesEl.append(slides[i]);
			}
			newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
		} else {
			slidesEl.append(slides);
		}
		for (let i = 0; i < slidesBuffer.length; i += 1) {
			slidesEl.append(slidesBuffer[i]);
		}
		swiper.recalcSlides();
		if (params.loop) {
			swiper.loopCreate();
		}
		if (!params.observer || swiper.isElement) {
			swiper.update();
		}
		if (params.loop) {
			swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
		} else {
			swiper.slideTo(newActiveIndex, 0, false);
		}
	}

	function removeSlide(slidesIndexes) {
		const swiper = this;
		const {
			params,
			activeIndex
		} = swiper;
		let activeIndexBuffer = activeIndex;
		if (params.loop) {
			activeIndexBuffer -= swiper.loopedSlides;
			swiper.loopDestroy();
		}
		let newActiveIndex = activeIndexBuffer;
		let indexToRemove;
		if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
			for (let i = 0; i < slidesIndexes.length; i += 1) {
				indexToRemove = slidesIndexes[i];
				if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
				if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
			}
			newActiveIndex = Math.max(newActiveIndex, 0);
		} else {
			indexToRemove = slidesIndexes;
			if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
			if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
			newActiveIndex = Math.max(newActiveIndex, 0);
		}
		swiper.recalcSlides();
		if (params.loop) {
			swiper.loopCreate();
		}
		if (!params.observer || swiper.isElement) {
			swiper.update();
		}
		if (params.loop) {
			swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
		} else {
			swiper.slideTo(newActiveIndex, 0, false);
		}
	}

	function removeAllSlides() {
		const swiper = this;
		const slidesIndexes = [];
		for (let i = 0; i < swiper.slides.length; i += 1) {
			slidesIndexes.push(i);
		}
		swiper.removeSlide(slidesIndexes);
	}

	function Manipulation(_ref) {
		let {
			swiper
		} = _ref;
		Object.assign(swiper, {
			appendSlide: appendSlide.bind(swiper),
			prependSlide: prependSlide.bind(swiper),
			addSlide: addSlide.bind(swiper),
			removeSlide: removeSlide.bind(swiper),
			removeAllSlides: removeAllSlides.bind(swiper)
		});
	}

	function effectInit(params) {
		const {
			effect,
			swiper,
			on,
			setTranslate,
			setTransition,
			overwriteParams,
			perspective,
			recreateShadows,
			getEffectParams
		} = params;
		on('beforeInit', () => {
			if (swiper.params.effect !== effect) return;
			swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
			if (perspective && perspective()) {
				swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
			}
			const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
			Object.assign(swiper.params, overwriteParamsResult);
			Object.assign(swiper.originalParams, overwriteParamsResult);
		});
		on('setTranslate', () => {
			if (swiper.params.effect !== effect) return;
			setTranslate();
		});
		on('setTransition', (_s, duration) => {
			if (swiper.params.effect !== effect) return;
			setTransition(duration);
		});
		on('transitionEnd', () => {
			if (swiper.params.effect !== effect) return;
			if (recreateShadows) {
				if (!getEffectParams || !getEffectParams().slideShadows) return;
				// remove shadows
				swiper.slides.forEach(slideEl => {
					slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => shadowEl.remove());
				});
				// create new one
				recreateShadows();
			}
		});
		let requireUpdateOnVirtual;
		on('virtualUpdate', () => {
			if (swiper.params.effect !== effect) return;
			if (!swiper.slides.length) {
				requireUpdateOnVirtual = true;
			}
			requestAnimationFrame(() => {
				if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
					setTranslate();
					requireUpdateOnVirtual = false;
				}
			});
		});
	}

	function effectTarget(effectParams, slideEl) {
		const transformEl = getSlideTransformEl(slideEl);
		if (transformEl !== slideEl) {
			transformEl.style.backfaceVisibility = 'hidden';
			transformEl.style['-webkit-backface-visibility'] = 'hidden';
		}
		return transformEl;
	}

	function effectVirtualTransitionEnd(_ref) {
		let {
			swiper,
			duration,
			transformElements,
			allSlides
		} = _ref;
		const {
			activeIndex
		} = swiper;
		const getSlide = el => {
			if (!el.parentElement) {
				// assume shadow root
				const slide = swiper.slides.filter(slideEl => slideEl.shadowEl && slideEl.shadowEl === el.parentNode)[0];
				return slide;
			}
			return el.parentElement;
		};
		if (swiper.params.virtualTranslate && duration !== 0) {
			let eventTriggered = false;
			let transitionEndTarget;
			if (allSlides) {
				transitionEndTarget = transformElements;
			} else {
				transitionEndTarget = transformElements.filter(transformEl => {
					const el = transformEl.classList.contains('swiper-slide-transform') ? getSlide(transformEl) : transformEl;
					return swiper.getSlideIndex(el) === activeIndex;
				});
			}
			transitionEndTarget.forEach(el => {
				elementTransitionEnd(el, () => {
					if (eventTriggered) return;
					if (!swiper || swiper.destroyed) return;
					eventTriggered = true;
					swiper.animating = false;
					const evt = new window.CustomEvent('transitionend', {
						bubbles: true,
						cancelable: true
					});
					swiper.wrapperEl.dispatchEvent(evt);
				});
			});
		}
	}

	function EffectFade(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			fadeEffect: {
				crossFade: false
			}
		});
		const setTranslate = () => {
			const {
				slides
			} = swiper;
			const params = swiper.params.fadeEffect;
			for (let i = 0; i < slides.length; i += 1) {
				const slideEl = swiper.slides[i];
				const offset = slideEl.swiperSlideOffset;
				let tx = -offset;
				if (!swiper.params.virtualTranslate) tx -= swiper.translate;
				let ty = 0;
				if (!swiper.isHorizontal()) {
					ty = tx;
					tx = 0;
				}
				const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
				const targetEl = effectTarget(params, slideEl);
				targetEl.style.opacity = slideOpacity;
				targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
			}
		};
		const setTransition = duration => {
			const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
			transformElements.forEach(el => {
				el.style.transitionDuration = `${duration}ms`;
			});
			effectVirtualTransitionEnd({
				swiper,
				duration,
				transformElements,
				allSlides: true
			});
		};
		effectInit({
			effect: 'fade',
			swiper,
			on,
			setTranslate,
			setTransition,
			overwriteParams: () => ({
				slidesPerView: 1,
				slidesPerGroup: 1,
				watchSlidesProgress: true,
				spaceBetween: 0,
				virtualTranslate: !swiper.params.cssMode
			})
		});
	}

	function EffectCube(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			cubeEffect: {
				slideShadows: true,
				shadow: true,
				shadowOffset: 20,
				shadowScale: 0.94
			}
		});
		const createSlideShadows = (slideEl, progress, isHorizontal) => {
			let shadowBefore = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
			let shadowAfter = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
			if (!shadowBefore) {
				shadowBefore = createElement('div', `swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}`);
				slideEl.append(shadowBefore);
			}
			if (!shadowAfter) {
				shadowAfter = createElement('div', `swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}`);
				slideEl.append(shadowAfter);
			}
			if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
			if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
		};
		const recreateShadows = () => {
			// create new ones
			const isHorizontal = swiper.isHorizontal();
			swiper.slides.forEach(slideEl => {
				const progress = Math.max(Math.min(slideEl.progress, 1), -1);
				createSlideShadows(slideEl, progress, isHorizontal);
			});
		};
		const setTranslate = () => {
			const {
				el,
				wrapperEl,
				slides,
				width: swiperWidth,
				height: swiperHeight,
				rtlTranslate: rtl,
				size: swiperSize,
				browser
			} = swiper;
			const params = swiper.params.cubeEffect;
			const isHorizontal = swiper.isHorizontal();
			const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
			let wrapperRotate = 0;
			let cubeShadowEl;
			if (params.shadow) {
				if (isHorizontal) {
					cubeShadowEl = swiper.slidesEl.querySelector('.swiper-cube-shadow');
					if (!cubeShadowEl) {
						cubeShadowEl = createElement('div', 'swiper-cube-shadow');
						swiper.slidesEl.append(cubeShadowEl);
					}
					cubeShadowEl.style.height = `${swiperWidth}px`;
				} else {
					cubeShadowEl = el.querySelector('.swiper-cube-shadow');
					if (!cubeShadowEl) {
						cubeShadowEl = createElement('div', 'swiper-cube-shadow');
						el.append(cubeShadowEl);
					}
				}
			}
			for (let i = 0; i < slides.length; i += 1) {
				const slideEl = slides[i];
				let slideIndex = i;
				if (isVirtual) {
					slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10);
				}
				let slideAngle = slideIndex * 90;
				let round = Math.floor(slideAngle / 360);
				if (rtl) {
					slideAngle = -slideAngle;
					round = Math.floor(-slideAngle / 360);
				}
				const progress = Math.max(Math.min(slideEl.progress, 1), -1);
				let tx = 0;
				let ty = 0;
				let tz = 0;
				if (slideIndex % 4 === 0) {
					tx = -round * 4 * swiperSize;
					tz = 0;
				} else if ((slideIndex - 1) % 4 === 0) {
					tx = 0;
					tz = -round * 4 * swiperSize;
				} else if ((slideIndex - 2) % 4 === 0) {
					tx = swiperSize + round * 4 * swiperSize;
					tz = swiperSize;
				} else if ((slideIndex - 3) % 4 === 0) {
					tx = -swiperSize;
					tz = 3 * swiperSize + swiperSize * 4 * round;
				}
				if (rtl) {
					tx = -tx;
				}
				if (!isHorizontal) {
					ty = tx;
					tx = 0;
				}
				const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
				if (progress <= 1 && progress > -1) {
					wrapperRotate = slideIndex * 90 + progress * 90;
					if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
				}
				slideEl.style.transform = transform;
				if (params.slideShadows) {
					createSlideShadows(slideEl, progress, isHorizontal);
				}
			}
			wrapperEl.style.transformOrigin = `50% 50% -${swiperSize / 2}px`;
			wrapperEl.style['-webkit-transform-origin'] = `50% 50% -${swiperSize / 2}px`;
			if (params.shadow) {
				if (isHorizontal) {
					cubeShadowEl.style.transform = `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`;
				} else {
					const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
					const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
					const scale1 = params.shadowScale;
					const scale2 = params.shadowScale / multiplier;
					const offset = params.shadowOffset;
					cubeShadowEl.style.transform = `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`;
				}
			}
			const zFactor = (browser.isSafari || browser.isWebView) && browser.needPerspectiveFix ? -swiperSize / 2 : 0;
			wrapperEl.style.transform = `translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`;
			wrapperEl.style.setProperty('--swiper-cube-translate-z', `${zFactor}px`);
		};
		const setTransition = duration => {
			const {
				el,
				slides
			} = swiper;
			slides.forEach(slideEl => {
				slideEl.style.transitionDuration = `${duration}ms`;
				slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(subEl => {
					subEl.style.transitionDuration = `${duration}ms`;
				});
			});
			if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
				const shadowEl = el.querySelector('.swiper-cube-shadow');
				if (shadowEl) shadowEl.style.transitionDuration = `${duration}ms`;
			}
		};
		effectInit({
			effect: 'cube',
			swiper,
			on,
			setTranslate,
			setTransition,
			recreateShadows,
			getEffectParams: () => swiper.params.cubeEffect,
			perspective: () => true,
			overwriteParams: () => ({
				slidesPerView: 1,
				slidesPerGroup: 1,
				watchSlidesProgress: true,
				resistanceRatio: 0,
				spaceBetween: 0,
				centeredSlides: false,
				virtualTranslate: true
			})
		});
	}

	function createShadow(params, slideEl, side) {
		const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}`;
		const shadowContainer = getSlideTransformEl(slideEl);
		let shadowEl = shadowContainer.querySelector(`.${shadowClass}`);
		if (!shadowEl) {
			shadowEl = createElement('div', `swiper-slide-shadow${side ? `-${side}` : ''}`);
			shadowContainer.append(shadowEl);
		}
		return shadowEl;
	}

	function EffectFlip(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			flipEffect: {
				slideShadows: true,
				limitRotation: true
			}
		});
		const createSlideShadows = (slideEl, progress, params) => {
			let shadowBefore = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
			let shadowAfter = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
			if (!shadowBefore) {
				shadowBefore = createShadow(params, slideEl, swiper.isHorizontal() ? 'left' : 'top');
			}
			if (!shadowAfter) {
				shadowAfter = createShadow(params, slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
			}
			if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
			if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
		};
		const recreateShadows = () => {
			// Set shadows
			const params = swiper.params.flipEffect;
			swiper.slides.forEach(slideEl => {
				let progress = slideEl.progress;
				if (swiper.params.flipEffect.limitRotation) {
					progress = Math.max(Math.min(slideEl.progress, 1), -1);
				}
				createSlideShadows(slideEl, progress, params);
			});
		};
		const setTranslate = () => {
			const {
				slides,
				rtlTranslate: rtl
			} = swiper;
			const params = swiper.params.flipEffect;
			for (let i = 0; i < slides.length; i += 1) {
				const slideEl = slides[i];
				let progress = slideEl.progress;
				if (swiper.params.flipEffect.limitRotation) {
					progress = Math.max(Math.min(slideEl.progress, 1), -1);
				}
				const offset = slideEl.swiperSlideOffset;
				const rotate = -180 * progress;
				let rotateY = rotate;
				let rotateX = 0;
				let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
				let ty = 0;
				if (!swiper.isHorizontal()) {
					ty = tx;
					tx = 0;
					rotateX = -rotateY;
					rotateY = 0;
				} else if (rtl) {
					rotateY = -rotateY;
				}
				slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
				if (params.slideShadows) {
					createSlideShadows(slideEl, progress, params);
				}
				const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
				const targetEl = effectTarget(params, slideEl);
				targetEl.style.transform = transform;
			}
		};
		const setTransition = duration => {
			const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
			transformElements.forEach(el => {
				el.style.transitionDuration = `${duration}ms`;
				el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => {
					shadowEl.style.transitionDuration = `${duration}ms`;
				});
			});
			effectVirtualTransitionEnd({
				swiper,
				duration,
				transformElements
			});
		};
		effectInit({
			effect: 'flip',
			swiper,
			on,
			setTranslate,
			setTransition,
			recreateShadows,
			getEffectParams: () => swiper.params.flipEffect,
			perspective: () => true,
			overwriteParams: () => ({
				slidesPerView: 1,
				slidesPerGroup: 1,
				watchSlidesProgress: true,
				spaceBetween: 0,
				virtualTranslate: !swiper.params.cssMode
			})
		});
	}

	function EffectCoverflow(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			coverflowEffect: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				scale: 1,
				modifier: 1,
				slideShadows: true
			}
		});
		const setTranslate = () => {
			const {
				width: swiperWidth,
				height: swiperHeight,
				slides,
				slidesSizesGrid
			} = swiper;
			const params = swiper.params.coverflowEffect;
			const isHorizontal = swiper.isHorizontal();
			const transform = swiper.translate;
			const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
			const rotate = isHorizontal ? params.rotate : -params.rotate;
			const translate = params.depth;
			// Each slide offset from center
			for (let i = 0, length = slides.length; i < length; i += 1) {
				const slideEl = slides[i];
				const slideSize = slidesSizesGrid[i];
				const slideOffset = slideEl.swiperSlideOffset;
				const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
				const offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;
				let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
				let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
				// var rotateZ = 0
				let translateZ = -translate * Math.abs(offsetMultiplier);
				let stretch = params.stretch;
				// Allow percentage to make a relative stretch for responsive sliders
				if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
					stretch = parseFloat(params.stretch) / 100 * slideSize;
				}
				let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
				let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
				let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);
				// Fix for ultra small values
				if (Math.abs(translateX) < 0.001) translateX = 0;
				if (Math.abs(translateY) < 0.001) translateY = 0;
				if (Math.abs(translateZ) < 0.001) translateZ = 0;
				if (Math.abs(rotateY) < 0.001) rotateY = 0;
				if (Math.abs(rotateX) < 0.001) rotateX = 0;
				if (Math.abs(scale) < 0.001) scale = 0;
				const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
				const targetEl = effectTarget(params, slideEl);
				targetEl.style.transform = slideTransform;
				slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
				if (params.slideShadows) {
					// Set shadows
					let shadowBeforeEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
					let shadowAfterEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
					if (!shadowBeforeEl) {
						shadowBeforeEl = createShadow(params, slideEl, isHorizontal ? 'left' : 'top');
					}
					if (!shadowAfterEl) {
						shadowAfterEl = createShadow(params, slideEl, isHorizontal ? 'right' : 'bottom');
					}
					if (shadowBeforeEl) shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
					if (shadowAfterEl) shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
				}
			}
		};
		const setTransition = duration => {
			const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
			transformElements.forEach(el => {
				el.style.transitionDuration = `${duration}ms`;
				el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => {
					shadowEl.style.transitionDuration = `${duration}ms`;
				});
			});
		};
		effectInit({
			effect: 'coverflow',
			swiper,
			on,
			setTranslate,
			setTransition,
			perspective: () => true,
			overwriteParams: () => ({
				watchSlidesProgress: true
			})
		});
	}

	function EffectCreative(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			creativeEffect: {
				limitProgress: 1,
				shadowPerProgress: false,
				progressMultiplier: 1,
				perspective: true,
				prev: {
					translate: [0, 0, 0],
					rotate: [0, 0, 0],
					opacity: 1,
					scale: 1
				},
				next: {
					translate: [0, 0, 0],
					rotate: [0, 0, 0],
					opacity: 1,
					scale: 1
				}
			}
		});
		const getTranslateValue = value => {
			if (typeof value === 'string') return value;
			return `${value}px`;
		};
		const setTranslate = () => {
			const {
				slides,
				wrapperEl,
				slidesSizesGrid
			} = swiper;
			const params = swiper.params.creativeEffect;
			const {
				progressMultiplier: multiplier
			} = params;
			const isCenteredSlides = swiper.params.centeredSlides;
			if (isCenteredSlides) {
				const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
				wrapperEl.style.transform = `translateX(calc(50% - ${margin}px))`;
			}
			for (let i = 0; i < slides.length; i += 1) {
				const slideEl = slides[i];
				const slideProgress = slideEl.progress;
				const progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
				let originalProgress = progress;
				if (!isCenteredSlides) {
					originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
				}
				const offset = slideEl.swiperSlideOffset;
				const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
				const r = [0, 0, 0];
				let custom = false;
				if (!swiper.isHorizontal()) {
					t[1] = t[0];
					t[0] = 0;
				}
				let data = {
					translate: [0, 0, 0],
					rotate: [0, 0, 0],
					scale: 1,
					opacity: 1
				};
				if (progress < 0) {
					data = params.next;
					custom = true;
				} else if (progress > 0) {
					data = params.prev;
					custom = true;
				}
				// set translate
				t.forEach((value, index) => {
					t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
				});
				// set rotates
				r.forEach((value, index) => {
					r[index] = data.rotate[index] * Math.abs(progress * multiplier);
				});
				slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
				const translateString = t.join(', ');
				const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
				const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
				const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
				const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;
				// Set shadows
				if (custom && data.shadow || !custom) {
					let shadowEl = slideEl.querySelector('.swiper-slide-shadow');
					if (!shadowEl && data.shadow) {
						shadowEl = createShadow(params, slideEl);
					}
					if (shadowEl) {
						const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
						shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
					}
				}
				const targetEl = effectTarget(params, slideEl);
				targetEl.style.transform = transform;
				targetEl.style.opacity = opacityString;
				if (data.origin) {
					targetEl.style.transformOrigin = data.origin;
				}
			}
		};
		const setTransition = duration => {
			const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
			transformElements.forEach(el => {
				el.style.transitionDuration = `${duration}ms`;
				el.querySelectorAll('.swiper-slide-shadow').forEach(shadowEl => {
					shadowEl.style.transitionDuration = `${duration}ms`;
				});
			});
			effectVirtualTransitionEnd({
				swiper,
				duration,
				transformElements,
				allSlides: true
			});
		};
		effectInit({
			effect: 'creative',
			swiper,
			on,
			setTranslate,
			setTransition,
			perspective: () => swiper.params.creativeEffect.perspective,
			overwriteParams: () => ({
				watchSlidesProgress: true,
				virtualTranslate: !swiper.params.cssMode
			})
		});
	}

	function EffectCards(_ref) {
		let {
			swiper,
			extendParams,
			on
		} = _ref;
		extendParams({
			cardsEffect: {
				slideShadows: true,
				rotate: true,
				perSlideRotate: 2,
				perSlideOffset: 8
			}
		});
		const setTranslate = () => {
			const {
				slides,
				activeIndex
			} = swiper;
			const params = swiper.params.cardsEffect;
			const {
				startTranslate,
				isTouched
			} = swiper.touchEventsData;
			const currentTranslate = swiper.translate;
			for (let i = 0; i < slides.length; i += 1) {
				const slideEl = slides[i];
				const slideProgress = slideEl.progress;
				const progress = Math.min(Math.max(slideProgress, -4), 4);
				let offset = slideEl.swiperSlideOffset;
				if (swiper.params.centeredSlides && !swiper.params.cssMode) {
					swiper.wrapperEl.style.transform = `translateX(${swiper.minTranslate()}px)`;
				}
				if (swiper.params.centeredSlides && swiper.params.cssMode) {
					offset -= slides[0].swiperSlideOffset;
				}
				let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
				let tY = 0;
				const tZ = -100 * Math.abs(progress);
				let scale = 1;
				let rotate = -params.perSlideRotate * progress;
				let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
				const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
				const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
				const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
				if (isSwipeToNext || isSwipeToPrev) {
					const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
					rotate += -28 * progress * subProgress;
					scale += -0.5 * subProgress;
					tXAdd += 96 * subProgress;
					tY = `${-25 * subProgress * Math.abs(progress)}%`;
				}
				if (progress < 0) {
					// next
					tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
				} else if (progress > 0) {
					// prev
					tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
				} else {
					tX = `${tX}px`;
				}
				if (!swiper.isHorizontal()) {
					const prevY = tY;
					tY = tX;
					tX = prevY;
				}
				const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
				const transform = `

        translate3d(${tX}, ${tY}, ${tZ}px)

        rotateZ(${params.rotate ? rotate : 0}deg)

        scale(${scaleString})

      `;
				if (params.slideShadows) {
					// Set shadows
					let shadowEl = slideEl.querySelector('.swiper-slide-shadow');
					if (!shadowEl) {
						shadowEl = createShadow(params, slideEl);
					}
					if (shadowEl) shadowEl.style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
				}
				slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
				const targetEl = effectTarget(params, slideEl);
				targetEl.style.transform = transform;
			}
		};
		const setTransition = duration => {
			const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
			transformElements.forEach(el => {
				el.style.transitionDuration = `${duration}ms`;
				el.querySelectorAll('.swiper-slide-shadow').forEach(shadowEl => {
					shadowEl.style.transitionDuration = `${duration}ms`;
				});
			});
			effectVirtualTransitionEnd({
				swiper,
				duration,
				transformElements
			});
		};
		effectInit({
			effect: 'cards',
			swiper,
			on,
			setTranslate,
			setTransition,
			perspective: () => true,
			overwriteParams: () => ({
				watchSlidesProgress: true,
				virtualTranslate: !swiper.params.cssMode
			})
		});
	}
	// Swiper Class
	const modules = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards];
	Swiper.use(modules);
	return Swiper;
}));
//# sourceMappingURL=swiper-bundle.js.map
/*

 * jQuery Form Styler v2.0.2

 * https://github.com/Dimox/jQueryFormStyler

 *

 * Copyright 2012-2017 Dimox (http://dimox.name/)

 * Released under the MIT license.

 *

 * Date: 2017.10.22

 *

 */
;
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory($ || require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {
	'use strict';
	var pluginName = 'styler',
		defaults = {
			idSuffix: '-styler',
			filePlaceholder: 'Файл не выбран',
			fileBrowse: 'Обзор...',
			fileNumber: 'Выбрано файлов: %s',
			selectPlaceholder: 'Выберите...',
			selectSearch: false,
			selectSearchLimit: 10,
			selectSearchNotFound: 'Совпадений не найдено',
			selectSearchPlaceholder: 'Поиск...',
			selectVisibleOptions: 0,
			selectSmartPositioning: true,
			locale: 'ru',
			locales: {
				'en': {
					filePlaceholder: 'No file selected',
					fileBrowse: 'Browse...',
					fileNumber: 'Selected files: %s',
					selectPlaceholder: 'Select...',
					selectSearchNotFound: 'No matches found',
					selectSearchPlaceholder: 'Search...'
				}
			},
			onSelectOpened: function() {},
			onSelectClosed: function() {},
			onFormStyled: function() {}
		};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		var locale = this.options.locale;
		if (this.options.locales[locale] !== undefined) {
			$.extend(this.options, this.options.locales[locale]);
		}
		this.init();
	}
	Plugin.prototype = {
		// инициализация
		init: function() {
			var el = $(this.element);
			var opt = this.options;
			var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
			var Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

			function Attributes() {
				if (el.attr('id') !== undefined && el.attr('id') !== '') {
					this.id = el.attr('id') + opt.idSuffix;
				}
				this.title = el.attr('title');
				this.classes = el.attr('class');
				this.data = el.data();
			}
			// checkbox
			if (el.is(':checkbox')) {
				var checkboxOutput = function() {
					var att = new Attributes();
					var checkbox = $('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data);
					el.after(checkbox).prependTo(checkbox);
					if (el.is(':checked')) checkbox.addClass('checked');
					if (el.is(':disabled')) checkbox.addClass('disabled');
					// клик на псевдочекбокс
					checkbox.click(function(e) {
						e.preventDefault();
						el.triggerHandler('click');
						if (!checkbox.is('.disabled')) {
							if (el.is(':checked')) {
								el.prop('checked', false);
								checkbox.removeClass('checked');
							} else {
								el.prop('checked', true);
								checkbox.addClass('checked');
							}
							el.focus().change();
						}
					});
					// клик на label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a') && !$(e.target).closest(checkbox).length) {
							checkbox.triggerHandler('click');
							e.preventDefault();
						}
					});
					// переключение по Space или Enter
					el.on('change.styler', function() {
							if (el.is(':checked')) checkbox.addClass('checked');
							else checkbox.removeClass('checked');
						})
						// чтобы переключался чекбокс, который находится в теге label
						.on('keydown.styler', function(e) {
							if (e.which == 32) checkbox.click();
						})
						.on('focus.styler', function() {
							if (!checkbox.is('.disabled')) checkbox.addClass('focused');
						})
						.on('blur.styler', function() {
							checkbox.removeClass('focused');
						});
				}; // end checkboxOutput()
				checkboxOutput();
				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
					el.off('.styler').parent().before(el).remove();
					checkboxOutput();
				});
				// end checkbox
				// radio
			} else if (el.is(':radio')) {
				var radioOutput = function() {
					var att = new Attributes();
					var radio = $('<div class="jq-radio"><div class="jq-radio__div"></div></div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data);
					el.after(radio).prependTo(radio);
					if (el.is(':checked')) radio.addClass('checked');
					if (el.is(':disabled')) radio.addClass('disabled');
					// определяем общего родителя у радиокнопок с одинаковым name
					// http://stackoverflow.com/a/27733847
					$.fn.commonParents = function() {
						var cachedThis = this;
						return cachedThis.first().parents().filter(function() {
							return $(this).find(cachedThis).length === cachedThis.length;
						});
					};
					$.fn.commonParent = function() {
						return $(this).commonParents().first();
					};
					// клик на псевдорадиокнопке
					radio.click(function(e) {
						e.preventDefault();
						el.triggerHandler('click');
						if (!radio.is('.disabled')) {
							var inputName = $('input[name="' + el.attr('name') + '"]');
							inputName.commonParent().find(inputName).prop('checked', false).parent().removeClass('checked');
							el.prop('checked', true).parent().addClass('checked');
							el.focus().change();
						}
					});
					// клик на label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a') && !$(e.target).closest(radio).length) {
							radio.triggerHandler('click');
							e.preventDefault();
						}
					});
					// переключение стрелками
					el.on('change.styler', function() {
							el.parent().addClass('checked');
						})
						.on('focus.styler', function() {
							if (!radio.is('.disabled')) radio.addClass('focused');
						})
						.on('blur.styler', function() {
							radio.removeClass('focused');
						});
				}; // end radioOutput()
				radioOutput();
				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
					el.off('.styler').parent().before(el).remove();
					radioOutput();
				});
				// end radio
				// file
			} else if (el.is(':file')) {
				var fileOutput = function() {
					var att = new Attributes();
					var placeholder = el.data('placeholder');
					if (placeholder === undefined) placeholder = opt.filePlaceholder;
					var browse = el.data('browse');
					if (browse === undefined || browse === '') browse = opt.fileBrowse;
					var file =
						$('<div class="jq-file">' +
							'<div class="jq-file__name">' + placeholder + '</div>' +
							'<div class="jq-file__browse">' + browse + '</div>' +
							'</div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data);
					el.after(file).appendTo(file);
					if (el.is(':disabled')) file.addClass('disabled');
					var value = el.val();
					var name = $('div.jq-file__name', file);
					// чтобы при динамическом изменении имя файла не сбрасывалось
					if (value) name.text(value.replace(/.+[\\\/]/, ''));
					el.on('change.styler', function() {
							var value = el.val();
							if (el.is('[multiple]')) {
								value = '';
								var files = el[0].files.length;
								if (files > 0) {
									var number = el.data('number');
									if (number === undefined) number = opt.fileNumber;
									number = number.replace('%s', files);
									value = number;
								}
							}
							name.text(value.replace(/.+[\\\/]/, ''));
							if (value === '') {
								name.text(placeholder);
								file.removeClass('changed');
							} else {
								file.addClass('changed');
							}
						})
						.on('focus.styler', function() {
							file.addClass('focused');
						})
						.on('blur.styler', function() {
							file.removeClass('focused');
						})
						.on('click.styler', function() {
							file.removeClass('focused');
						});
				}; // end fileOutput()
				fileOutput();
				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					fileOutput();
				});
				// end file
				// number
			} else if (el.is('input[type="number"]')) {
				var numberOutput = function() {
					var att = new Attributes();
					var number =
						$('<div class="jq-number">' +
							'<div class="jq-number__spin minus"></div>' +
							'<div class="jq-number__spin plus"></div>' +
							'</div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data);
					el.after(number).prependTo(number).wrap('<div class="jq-number__field"></div>');
					if (el.is(':disabled')) number.addClass('disabled');
					var min,
						max,
						step,
						timeout = null,
						interval = null;
					if (el.attr('min') !== undefined) min = el.attr('min');
					if (el.attr('max') !== undefined) max = el.attr('max');
					if (el.attr('step') !== undefined && $.isNumeric(el.attr('step')))
						step = Number(el.attr('step'));
					else
						step = Number(1);
					var changeValue = function(spin) {
						var value = el.val(),
							newValue;
						if (!$.isNumeric(value)) {
							value = 0;
							el.val('0');
						}
						if (spin.is('.minus')) {
							newValue = Number(value) - step;
						} else if (spin.is('.plus')) {
							newValue = Number(value) + step;
						}
						// определяем количество десятичных знаков после запятой в step
						var decimals = (step.toString().split('.')[1] || []).length;
						if (decimals > 0) {
							var multiplier = '1';
							while (multiplier.length <= decimals) multiplier = multiplier + '0';
							// избегаем появления лишних знаков после запятой
							newValue = Math.round(newValue * multiplier) / multiplier;
						}
						if ($.isNumeric(min) && $.isNumeric(max)) {
							if (newValue >= min && newValue <= max) el.val(newValue);
						} else if ($.isNumeric(min) && !$.isNumeric(max)) {
							if (newValue >= min) el.val(newValue);
						} else if (!$.isNumeric(min) && $.isNumeric(max)) {
							if (newValue <= max) el.val(newValue);
						} else {
							el.val(newValue);
						}
					};
					if (!number.is('.disabled')) {
						number.on('mousedown', 'div.jq-number__spin', function() {
							var spin = $(this);
							changeValue(spin);
							timeout = setTimeout(function() {
								interval = setInterval(function() {
									changeValue(spin);
								}, 40);
							}, 350);
						}).on('mouseup mouseout', 'div.jq-number__spin', function() {
							clearTimeout(timeout);
							clearInterval(interval);
						}).on('mouseup', 'div.jq-number__spin', function() {
							el.change().trigger('input');
						});
						el.on('focus.styler', function() {
								number.addClass('focused');
							})
							.on('blur.styler', function() {
								number.removeClass('focused');
							});
					}
				}; // end numberOutput()
				numberOutput();
				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').closest('.jq-number').before(el).remove();
					numberOutput();
				});
				// end number
				// select
			} else if (el.is('select')) {
				var selectboxOutput = function() {
					// запрещаем прокрутку страницы при прокрутке селекта
					function preventScrolling(selector) {
						var scrollDiff = selector.prop('scrollHeight') - selector.outerHeight(),
							wheelDelta = null,
							scrollTop = null;
						selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {
							/**

							 * нормализация направления прокрутки

							 * (firefox < 0 || chrome etc... > 0)

							 * (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0)

							 */
							wheelDelta = (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) ? 1 : -1; // направление прокрутки (-1 вниз, 1 вверх)
							scrollTop = selector.scrollTop(); // позиция скролла
							if ((scrollTop >= scrollDiff && wheelDelta < 0) || (scrollTop <= 0 && wheelDelta > 0)) {
								e.stopPropagation();
								e.preventDefault();
							}
						});
					}
					var option = $('option', el);
					var list = '';
					// формируем список селекта
					function makeList() {
						for (var i = 0; i < option.length; i++) {
							var op = option.eq(i);
							var li = '',
								liClass = '',
								liClasses = '',
								id = '',
								title = '',
								dataList = '',
								optionClass = '',
								optgroupClass = '',
								dataJqfsClass = '';
							var disabled = 'disabled';
							var selDis = 'selected sel disabled';
							if (op.prop('selected')) liClass = 'selected sel';
							if (op.is(':disabled')) liClass = disabled;
							if (op.is(':selected:disabled')) liClass = selDis;
							if (op.attr('id') !== undefined && op.attr('id') !== '') id = ' id="' + op.attr('id') + opt.idSuffix + '"';
							if (op.attr('title') !== undefined && option.attr('title') !== '') title = ' title="' + op.attr('title') + '"';
							if (op.attr('class') !== undefined) {
								optionClass = ' ' + op.attr('class');
								dataJqfsClass = ' data-jqfs-class="' + op.attr('class') + '"';
							}
							var data = op.data();
							for (var k in data) {
								if (data[k] !== '') dataList += ' data-' + k + '="' + data[k] + '"';
							}
							if ((liClass + optionClass) !== '') liClasses = ' class="' + liClass + optionClass + '"';
							li = '<li' + dataJqfsClass + dataList + liClasses + title + id + '>' + op.html() + '</li>';
							// если есть optgroup
							if (op.parent().is('optgroup')) {
								if (op.parent().attr('class') !== undefined) optgroupClass = ' ' + op.parent().attr('class');
								li = '<li' + dataJqfsClass + dataList + ' class="' + liClass + optionClass + ' option' + optgroupClass + '"' + title + id + '>' + op.html() + '</li>';
								if (op.is(':first-child')) {
									li = '<li class="optgroup' + optgroupClass + '">' + op.parent().attr('label') + '</li>' + li;
								}
							}
							list += li;
						}
					} // end makeList()
					// одиночный селект
					function doSelect() {
						var att = new Attributes();
						var searchHTML = '';
						var selectPlaceholder = el.data('placeholder');
						var selectSearch = el.data('search');
						var selectSearchLimit = el.data('search-limit');
						var selectSearchNotFound = el.data('search-not-found');
						var selectSearchPlaceholder = el.data('search-placeholder');
						var selectSmartPositioning = el.data('smart-positioning');
						if (selectPlaceholder === undefined) selectPlaceholder = opt.selectPlaceholder;
						if (selectSearch === undefined || selectSearch === '') selectSearch = opt.selectSearch;
						if (selectSearchLimit === undefined || selectSearchLimit === '') selectSearchLimit = opt.selectSearchLimit;
						if (selectSearchNotFound === undefined || selectSearchNotFound === '') selectSearchNotFound = opt.selectSearchNotFound;
						if (selectSearchPlaceholder === undefined) selectSearchPlaceholder = opt.selectSearchPlaceholder;
						if (selectSmartPositioning === undefined || selectSmartPositioning === '') selectSmartPositioning = opt.selectSmartPositioning;
						var selectbox =
							$('<div class="jq-selectbox jqselect">' +
								'<div class="jq-selectbox__select">' +
								'<div class="jq-selectbox__select-text"></div>' +
								'<div class="jq-selectbox__trigger">' +
								'<div class="jq-selectbox__trigger-arrow"></div></div>' +
								'</div>' +
								'</div>')
							.attr({
								id: att.id,
								title: att.title
							})
							.addClass(att.classes)
							.data(att.data);
						el.after(selectbox).prependTo(selectbox);
						var selectzIndex = selectbox.css('z-index');
						selectzIndex = (selectzIndex > 0) ? selectzIndex : 1;
						var divSelect = $('div.jq-selectbox__select', selectbox);
						var divText = $('div.jq-selectbox__select-text', selectbox);
						var optionSelected = option.filter(':selected');
						makeList();
						if (selectSearch) searchHTML =
							'<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
							'<div class="jq-selectbox__not-found">' + selectSearchNotFound + '</div>';
						var dropdown =
							$('<div class="jq-selectbox__dropdown">' +
								searchHTML + '<ul>' + list + '</ul>' +
								'</div>');
						selectbox.append(dropdown);
						var ul = $('ul', dropdown);
						var li = $('li', dropdown);
						var search = $('input', dropdown);
						var notFound = $('div.jq-selectbox__not-found', dropdown).hide();
						if (li.length < selectSearchLimit) search.parent().hide();
						// показываем опцию по умолчанию
						// если у 1-й опции нет текста, она выбрана по умолчанию и параметр selectPlaceholder не false, то показываем плейсхолдер
						if (option.first().text() === '' && option.first().is(':selected') && selectPlaceholder !== false) {
							divText.text(selectPlaceholder).addClass('placeholder');
						} else {
							divText.text(optionSelected.text());
						}
						// определяем самый широкий пункт селекта
						var liWidthInner = 0,
							liWidth = 0;
						li.css({
							'display': 'inline-block'
						});
						li.each(function() {
							var l = $(this);
							if (l.innerWidth() > liWidthInner) {
								liWidthInner = l.innerWidth();
								liWidth = l.width();
							}
						});
						li.css({
							'display': ''
						});
						// подстраиваем ширину свернутого селекта в зависимости
						// от ширины плейсхолдера или самого широкого пункта
						if (divText.is('.placeholder') && (divText.width() > liWidthInner)) {
							divText.width(divText.width());
						} else {
							var selClone = selectbox.clone().appendTo('body').width('auto');
							var selCloneWidth = selClone.outerWidth();
							selClone.remove();
							if (selCloneWidth == selectbox.outerWidth()) {
								divText.width(liWidth);
							}
						}
						// подстраиваем ширину выпадающего списка в зависимости от самого широкого пункта
						if (liWidthInner > selectbox.width()) dropdown.width(liWidthInner);
						// прячем 1-ю пустую опцию, если она есть и если атрибут data-placeholder не пустой
						// если все же нужно, чтобы первая пустая опция отображалась, то указываем у селекта: data-placeholder=""
						if (option.first().text() === '' && el.data('placeholder') !== '') {
							li.first().hide();
						}
						var selectHeight = selectbox.outerHeight(true);
						var searchHeight = search.parent().outerHeight(true) || 0;
						var isMaxHeight = ul.css('max-height');
						var liSelected = li.filter('.selected');
						if (liSelected.length < 1) li.first().addClass('selected sel');
						if (li.data('li-height') === undefined) {
							var liOuterHeight = li.outerHeight();
							if (selectPlaceholder !== false) liOuterHeight = li.eq(1).outerHeight();
							li.data('li-height', liOuterHeight);
						}
						var position = dropdown.css('top');
						if (dropdown.css('left') == 'auto') dropdown.css({
							left: 0
						});
						if (dropdown.css('top') == 'auto') {
							dropdown.css({
								top: selectHeight
							});
							position = selectHeight;
						}
						dropdown.hide();
						// если выбран не дефолтный пункт
						if (liSelected.length) {
							// добавляем класс, показывающий изменение селекта
							if (option.first().text() != optionSelected.text()) {
								selectbox.addClass('changed');
							}
							// передаем селекту класс выбранного пункта
							selectbox.data('jqfs-class', liSelected.data('jqfs-class'));
							selectbox.addClass(liSelected.data('jqfs-class'));
						}
						// если селект неактивный
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							return false;
						}
						// при клике на псевдоселекте
						divSelect.click(function() {
							// колбек при закрытии селекта
							if ($('div.jq-selectbox').filter('.opened').length) {
								opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
							}
							el.focus();
							// если iOS, то не показываем выпадающий список,
							// т.к. отображается нативный и неизвестно, как его спрятать
							if (iOS) return;
							// умное позиционирование
							var win = $(window);
							var liHeight = li.data('li-height');
							var topOffset = selectbox.offset().top;
							var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
							var visible = el.data('visible-options');
							if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
							var minHeight = liHeight * 5;
							var newHeight = liHeight * visible;
							if (visible > 0 && visible < 6) minHeight = newHeight;
							if (visible === 0) newHeight = 'auto';
							var dropDown = function() {
								dropdown.height('auto').css({
									bottom: 'auto',
									top: position
								});
								var maxHeightBottom = function() {
									ul.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightBottom();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if (bottomOffset < (dropdown.outerHeight() + 20)) {
									maxHeightBottom();
								}
							};
							var dropUp = function() {
								dropdown.height('auto').css({
									top: 'auto',
									bottom: position
								});
								var maxHeightTop = function() {
									ul.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightTop();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if ((topOffset - win.scrollTop() - 20) < (dropdown.outerHeight() + 20)) {
									maxHeightTop();
								}
							};
							if (selectSmartPositioning === true || selectSmartPositioning === 1) {
								// раскрытие вниз
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
									// раскрытие вверх
								} else {
									dropUp();
									selectbox.removeClass('dropdown').addClass('dropup');
								}
							} else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
								// раскрытие вниз
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								}
							} else {
								// если умное позиционирование отключено
								dropdown.height('auto').css({
									bottom: 'auto',
									top: position
								});
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
							}
							// если выпадающий список выходит за правый край окна браузера,
							// то меняем позиционирование с левого на правое
							if (selectbox.offset().left + dropdown.outerWidth() > win.width()) {
								dropdown.css({
									left: 'auto',
									right: 0
								});
							}
							// конец умного позиционирования
							$('div.jqselect').css({
								zIndex: (selectzIndex - 1)
							}).removeClass('opened');
							selectbox.css({
								zIndex: selectzIndex
							});
							if (dropdown.is(':hidden')) {
								$('div.jq-selectbox__dropdown:visible').hide();
								dropdown.show();
								selectbox.addClass('opened focused');
								// колбек при открытии селекта
								opt.onSelectOpened.call(selectbox);
							} else {
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// колбек при закрытии селекта
								if ($('div.jq-selectbox').filter('.opened').length) {
									opt.onSelectClosed.call(selectbox);
								}
							}
							// поисковое поле
							if (search.length) {
								search.val('').keyup();
								notFound.hide();
								search.keyup(function() {
									var query = $(this).val();
									li.each(function() {
										if (!$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
											$(this).hide();
										} else {
											$(this).show();
										}
									});
									// прячем 1-ю пустую опцию
									if (option.first().text() === '' && el.data('placeholder') !== '') {
										li.first().hide();
									}
									if (li.filter(':visible').length < 1) {
										notFound.show();
									} else {
										notFound.hide();
									}
								});
							}
							// прокручиваем до выбранного пункта при открытии списка
							if (li.filter('.selected').length) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									// если нечетное количество видимых пунктов,
									// то высоту пункта делим пополам для последующего расчета
									if ((ul.innerHeight() / liHeight) % 2 !== 0) liHeight = liHeight / 2;
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() / 2 + liHeight);
								}
							}
							preventScrolling(ul);
						}); // end divSelect.click()
						// при наведении курсора на пункт списка
						li.hover(function() {
							$(this).siblings().removeClass('selected');
						});
						var selectedText = li.filter('.selected').text();
						// при клике на пункт списка
						li.filter(':not(.disabled):not(.optgroup)').click(function() {
							el.focus();
							var t = $(this);
							var liText = t.text();
							if (!t.is('.selected')) {
								var index = t.index();
								index -= t.prevAll('.optgroup').length;
								t.addClass('selected sel').siblings().removeClass('selected sel');
								option.prop('selected', false).eq(index).prop('selected', true);
								selectedText = liText;
								divText.text(liText);
								// передаем селекту класс выбранного пункта
								if (selectbox.data('jqfs-class')) selectbox.removeClass(selectbox.data('jqfs-class'));
								selectbox.data('jqfs-class', t.data('jqfs-class'));
								selectbox.addClass(t.data('jqfs-class'));
								el.change();
							}
							dropdown.hide();
							selectbox.removeClass('opened dropup dropdown');
							// колбек при закрытии селекта
							opt.onSelectClosed.call(selectbox);
						});
						dropdown.mouseout(function() {
							$('li.sel', dropdown).addClass('selected');
						});
						// изменение селекта
						el.on('change.styler', function() {
								divText.text(option.filter(':selected').text()).removeClass('placeholder');
								li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
								// добавляем класс, показывающий изменение селекта
								if (option.first().text() != li.filter('.selected').text()) {
									selectbox.addClass('changed');
								} else {
									selectbox.removeClass('changed');
								}
							})
							.on('focus.styler', function() {
								selectbox.addClass('focused');
								$('div.jqselect').not('.focused').removeClass('opened dropup dropdown').find('div.jq-selectbox__dropdown').hide();
							})
							.on('blur.styler', function() {
								selectbox.removeClass('focused');
							})
							// изменение селекта с клавиатуры
							.on('keydown.styler keyup.styler', function(e) {
								var liHeight = li.data('li-height');
								if (el.val() === '') {
									divText.text(selectPlaceholder).addClass('placeholder');
								} else {
									divText.text(option.filter(':selected').text());
								}
								li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
								// вверх, влево, Page Up, Home
								if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
									if (el.val() === '') {
										ul.scrollTop(0);
									} else {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
									}
								}
								// вниз, вправо, Page Down, End
								if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() + liHeight);
								}
								// закрываем выпадающий список при нажатии Enter
								if (e.which == 13) {
									e.preventDefault();
									dropdown.hide();
									selectbox.removeClass('opened dropup dropdown');
									// колбек при закрытии селекта
									opt.onSelectClosed.call(selectbox);
								}
							}).on('keydown.styler', function(e) {
								// открываем выпадающий список при нажатии Space
								if (e.which == 32) {
									e.preventDefault();
									divSelect.click();
								}
							});
						// прячем выпадающий список при клике за пределами селекта
						if (!onDocumentClick.registered) {
							$(document).on('click', onDocumentClick);
							onDocumentClick.registered = true;
						}
					} // end doSelect()
					// мультиселект
					function doMultipleSelect() {
						var att = new Attributes();
						var selectbox =
							$('<div class="jq-select-multiple jqselect"></div>')
							.attr({
								id: att.id,
								title: att.title
							})
							.addClass(att.classes)
							.data(att.data);
						el.after(selectbox);
						makeList();
						selectbox.append('<ul>' + list + '</ul>');
						var ul = $('ul', selectbox);
						var li = $('li', selectbox);
						var size = el.attr('size');
						var ulHeight = ul.outerHeight();
						var liHeight = li.outerHeight();
						if (size !== undefined && size > 0) {
							ul.css({
								'height': liHeight * size
							});
						} else {
							ul.css({
								'height': liHeight * 4
							});
						}
						if (ulHeight > selectbox.height()) {
							ul.css('overflowY', 'scroll');
							preventScrolling(ul);
							// прокручиваем до выбранного пункта
							if (li.filter('.selected').length) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
							}
						}
						// прячем оригинальный селект
						el.prependTo(selectbox);
						// если селект неактивный
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							option.each(function() {
								if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
							});
							// если селект активный
						} else {
							// при клике на пункт списка
							li.filter(':not(.disabled):not(.optgroup)').click(function(e) {
								el.focus();
								var clkd = $(this);
								if (!e.ctrlKey && !e.metaKey) clkd.addClass('selected');
								if (!e.shiftKey) clkd.addClass('first');
								if (!e.ctrlKey && !e.metaKey && !e.shiftKey) clkd.siblings().removeClass('selected first');
								// выделение пунктов при зажатом Ctrl
								if (e.ctrlKey || e.metaKey) {
									if (clkd.is('.selected')) clkd.removeClass('selected first');
									else clkd.addClass('selected first');
									clkd.siblings().removeClass('first');
								}
								// выделение пунктов при зажатом Shift
								if (e.shiftKey) {
									var prev = false,
										next = false;
									clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
									clkd.prevAll().each(function() {
										if ($(this).is('.first')) prev = true;
									});
									clkd.nextAll().each(function() {
										if ($(this).is('.first')) next = true;
									});
									if (prev) {
										clkd.prevAll().each(function() {
											if ($(this).is('.selected')) return false;
											else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (next) {
										clkd.nextAll().each(function() {
											if ($(this).is('.selected')) return false;
											else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (li.filter('.selected').length == 1) clkd.addClass('first');
								}
								// отмечаем выбранные мышью
								option.prop('selected', false);
								li.filter('.selected').each(function() {
									var t = $(this);
									var index = t.index();
									if (t.is('.option')) index -= t.prevAll('.optgroup').length;
									option.eq(index).prop('selected', true);
								});
								el.change();
							});
							// отмечаем выбранные с клавиатуры
							option.each(function(i) {
								$(this).data('optionIndex', i);
							});
							el.on('change.styler', function() {
									li.removeClass('selected');
									var arrIndexes = [];
									option.filter(':selected').each(function() {
										arrIndexes.push($(this).data('optionIndex'));
									});
									li.not('.optgroup').filter(function(i) {
										return $.inArray(i, arrIndexes) > -1;
									}).addClass('selected');
								})
								.on('focus.styler', function() {
									selectbox.addClass('focused');
								})
								.on('blur.styler', function() {
									selectbox.removeClass('focused');
								});
							// прокручиваем с клавиатуры
							if (ulHeight > selectbox.height()) {
								el.on('keydown.styler', function(e) {
									// вверх, влево, PageUp
									if (e.which == 38 || e.which == 37 || e.which == 33) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
									}
									// вниз, вправо, PageDown
									if (e.which == 40 || e.which == 39 || e.which == 34) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
									}
								});
							}
						}
					} // end doMultipleSelect()
					if (el.is('[multiple]')) {
						// если Android или iOS, то мультиселект не стилизуем
						// причина для Android - в стилизованном селекте нет возможности выбрать несколько пунктов
						// причина для iOS - в стилизованном селекте неправильно отображаются выбранные пункты
						if (Android || iOS) return;
						doMultipleSelect();
					} else {
						doSelect();
					}
				}; // end selectboxOutput()
				selectboxOutput();
				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					selectboxOutput();
				});
				// end select
				// reset
			} else if (el.is(':reset')) {
				el.on('click', function() {
					setTimeout(function() {
						el.closest('form').find('input, select').trigger('refresh');
					}, 1);
				});
			} // end reset
		}, // init: function()
		// деструктор
		destroy: function() {
			var el = $(this.element);
			if (el.is(':checkbox') || el.is(':radio')) {
				el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
				el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
			} else if (el.is('input[type="number"]')) {
				el.removeData('_' + pluginName).off('.styler refresh').closest('.jq-number').before(el).remove();
			} else if (el.is(':file') || el.is('select')) {
				el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
			}
		} // destroy: function()
	}; // Plugin.prototype
	$.fn[pluginName] = function(options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			this.each(function() {
					if (!$.data(this, '_' + pluginName)) {
						$.data(this, '_' + pluginName, new Plugin(this, options));
					}
				})
				// колбек после выполнения плагина
				.promise()
				.done(function() {
					var opt = $(this[0]).data('_' + pluginName);
					if (opt) opt.options.onFormStyled.call();
				});
			return this;
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			var returns;
			this.each(function() {
				var instance = $.data(this, '_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
			});
			return returns !== undefined ? returns : this;
		}
	};
	// прячем выпадающий список при клике за пределами селекта
	function onDocumentClick(e) {
		// e.target.nodeName != 'OPTION' - добавлено для обхода бага в Opera на движке Presto
		// (при изменении селекта с клавиатуры срабатывает событие onclick)
		if (!$(e.target).parents().hasClass('jq-selectbox') && e.target.nodeName != 'OPTION') {
			if ($('div.jq-selectbox.opened').length) {
				var selectbox = $('div.jq-selectbox.opened'),
					search = $('div.jq-selectbox__search input', selectbox),
					dropdown = $('div.jq-selectbox__dropdown', selectbox),
					opt = selectbox.find('select').data('_' + pluginName).options;
				// колбек при закрытии селекта
				opt.onSelectClosed.call(selectbox);
				if (search.length) search.val('').keyup();
				dropdown.hide().find('li.sel').addClass('selected');
				selectbox.removeClass('focused opened dropup dropdown');
			}
		}
	}
	onDocumentClick.registered = false;
}));
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.scrollIntoView = factory());
})(this, (function() {
	'use strict';

	function t(t) {
		return "object" == typeof t && null != t && 1 === t.nodeType
	}

	function e(t, e) {
		return (!e || "hidden" !== t) && "visible" !== t && "clip" !== t
	}

	function n(t, n) {
		if (t.clientHeight < t.scrollHeight || t.clientWidth < t.scrollWidth) {
			var r = getComputedStyle(t, null);
			return e(r.overflowY, n) || e(r.overflowX, n) || function(t) {
				var e = function(t) {
					if (!t.ownerDocument || !t.ownerDocument.defaultView) return null;
					try {
						return t.ownerDocument.defaultView.frameElement
					} catch (t) {
						return null
					}
				}(t);
				return !!e && (e.clientHeight < t.scrollHeight || e.clientWidth < t.scrollWidth)
			}(t)
		}
		return !1
	}

	function r(t, e, n, r, i, o, l, d) {
		return o < t && l > e || o > t && l < e ? 0 : o <= t && d <= n || l >= e && d >= n ? o - t - r : l > e && d < n || o < t && d > n ? l - e + i : 0
	}
	var i = function(e, i) {
		var o = window,
			l = i.scrollMode,
			d = i.block,
			f = i.inline,
			h = i.boundary,
			u = i.skipOverflowHiddenElements,
			s = "function" == typeof h ? h : function(t) {
				return t !== h
			};
		if (!t(e)) throw new TypeError("Invalid target");
		for (var a, c, g = document.scrollingElement || document.documentElement, p = [], m = e; t(m) && s(m);) {
			if ((m = null == (c = (a = m).parentElement) ? a.getRootNode().host || null : c) === g) {
				p.push(m);
				break
			}
			null != m && m === document.body && n(m) && !n(document.documentElement) || null != m && n(m, u) && p.push(m);
		}
		for (var w = o.visualViewport ? o.visualViewport.width : innerWidth, v = o.visualViewport ? o.visualViewport.height : innerHeight, W = window.scrollX || pageXOffset, H = window.scrollY || pageYOffset, b = e.getBoundingClientRect(), y = b.height, E = b.width, M = b.top, V = b.right, x = b.bottom, I = b.left, C = "start" === d || "nearest" === d ? M : "end" === d ? x : M + y / 2, R = "center" === f ? I + E / 2 : "end" === f ? V : I, T = [], k = 0; k < p.length; k++) {
			var B = p[k],
				D = B.getBoundingClientRect(),
				O = D.height,
				X = D.width,
				Y = D.top,
				L = D.right,
				S = D.bottom,
				j = D.left;
			if ("if-needed" === l && M >= 0 && I >= 0 && x <= v && V <= w && M >= Y && x <= S && I >= j && V <= L) return T;
			var N = getComputedStyle(B),
				q = parseInt(N.borderLeftWidth, 10),
				z = parseInt(N.borderTopWidth, 10),
				A = parseInt(N.borderRightWidth, 10),
				F = parseInt(N.borderBottomWidth, 10),
				G = 0,
				J = 0,
				K = "offsetWidth" in B ? B.offsetWidth - B.clientWidth - q - A : 0,
				P = "offsetHeight" in B ? B.offsetHeight - B.clientHeight - z - F : 0,
				Q = "offsetWidth" in B ? 0 === B.offsetWidth ? 0 : X / B.offsetWidth : 0,
				U = "offsetHeight" in B ? 0 === B.offsetHeight ? 0 : O / B.offsetHeight : 0;
			if (g === B) G = "start" === d ? C : "end" === d ? C - v : "nearest" === d ? r(H, H + v, v, z, F, H + C, H + C + y, y) : C - v / 2, J = "start" === f ? R : "center" === f ? R - w / 2 : "end" === f ? R - w : r(W, W + w, w, q, A, W + R, W + R + E, E), G = Math.max(0, G + H), J = Math.max(0, J + W);
			else {
				G = "start" === d ? C - Y - z : "end" === d ? C - S + F + P : "nearest" === d ? r(Y, S, O, z, F + P, C, C + y, y) : C - (Y + O / 2) + P / 2, J = "start" === f ? R - j - q : "center" === f ? R - (j + X / 2) + K / 2 : "end" === f ? R - L + A + K : r(j, L, X, q, A + K, R, R + E, E);
				var Z = B.scrollLeft,
					$ = B.scrollTop;
				C += $ - (G = Math.max(0, Math.min($ + G / U, B.scrollHeight - O / U + P))), R += Z - (J = Math.max(0, Math.min(Z + J / Q, B.scrollWidth - X / Q + K)));
			}
			T.push({
				el: B,
				top: G,
				left: J
			});
		}
		return T
	};

	function isOptionsObject(options) {
		return options === Object(options) && Object.keys(options).length !== 0;
	}

	function defaultBehavior(actions, behavior) {
		if (behavior === void 0) {
			behavior = 'auto';
		}
		var canSmoothScroll = ('scrollBehavior' in document.body.style);
		actions.forEach(function(_ref) {
			var el = _ref.el,
				top = _ref.top,
				left = _ref.left;
			if (el.scroll && canSmoothScroll) {
				el.scroll({
					top: top,
					left: left,
					behavior: behavior
				});
			} else {
				el.scrollTop = top;
				el.scrollLeft = left;
			}
		});
	}

	function getOptions(options) {
		if (options === false) {
			return {
				block: 'end',
				inline: 'nearest'
			};
		}
		if (isOptionsObject(options)) {
			return options;
		}
		return {
			block: 'start',
			inline: 'nearest'
		};
	}

	function scrollIntoView(target, options) {
		var isTargetAttached = target.isConnected || target.ownerDocument.documentElement.contains(target);
		if (isOptionsObject(options) && typeof options.behavior === 'function') {
			return options.behavior(isTargetAttached ? i(target, options) : []);
		}
		if (!isTargetAttached) {
			return;
		}
		var computeOptions = getOptions(options);
		return defaultBehavior(i(target, computeOptions), computeOptions.behavior);
	}
	return scrollIntoView;
}));
// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
(function(window, document, $, undefined) {
	"use strict";
	window.console = window.console || {
		info: function(stuff) {}
	};
	// If there's no jQuery, fancyBox can't work
	// =========================================
	if (!$) {
		return;
	}
	// Check if fancyBox is already initialized
	// ========================================
	if ($.fn.fancybox) {
		console.info("fancyBox already initialized");
		return;
	}
	// Private default settings
	// ========================
	var defaults = {
		// Close existing modals
		// Set this to false if you do not need to stack multiple instances
		closeExisting: false,
		// Enable infinite gallery navigation
		loop: false,
		// Horizontal space between slides
		gutter: 50,
		// Enable keyboard navigation
		keyboard: true,
		// Should allow caption to overlap the content
		preventCaptionOverlap: true,
		// Should display navigation arrows at the screen edges
		arrows: true,
		// Should display counter at the top left corner
		infobar: true,
		// Should display close button (using `btnTpl.smallBtn` template) over the content
		// Can be true, false, "auto"
		// If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
		smallBtn: "auto",
		// Should display toolbar (buttons at the top)
		// Can be true, false, "auto"
		// If "auto" - will be automatically hidden if "smallBtn" is enabled
		toolbar: "auto",
		// What buttons should appear in the top right corner.
		// Buttons will be created using templates from `btnTpl` option
		// and they will be placed into toolbar (class="fancybox-toolbar"` element)
		buttons: [
			"zoom",
			//"share",
			"slideShow",
			//"fullScreen",
			//"download",
			"thumbs",
			"close"
		],
		// Detect "idle" time in seconds
		idleTime: 3,
		// Disable right-click and use simple image protection for images
		protect: false,
		// Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
		modal: false,
		image: {
			// Wait for images to load before displaying
			//   true  - wait for image to load and then display;
			//   false - display thumbnail and load the full-sized image over top,
			//           requires predefined image dimensions (`data-width` and `data-height` attributes)
			preload: false
		},
		ajax: {
			// Object containing settings for ajax request
			settings: {
				// This helps to indicate that request comes from the modal
				// Feel free to change naming
				data: {
					fancybox: true
				}
			}
		},
		iframe: {
			// Iframe template
			tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
			// Preload iframe before displaying it
			// This allows to calculate iframe content width and height
			// (note: Due to "Same Origin Policy", you can't get cross domain data).
			preload: true,
			// Custom CSS styling for iframe wrapping element
			// You can use this to set custom iframe dimensions
			css: {},
			// Iframe tag attributes
			attr: {
				scrolling: "auto"
			}
		},
		// For HTML5 video only
		video: {
			tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}">' +
				'<source src="{{src}}" type="{{format}}" />' +
				'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
				"</video>",
			format: "", // custom video format
			autoStart: true
		},
		// Default content type if cannot be detected automatically
		defaultType: "image",
		// Open/close animation type
		// Possible values:
		//   false            - disable
		//   "zoom"           - zoom images from/to thumbnail
		//   "fade"
		//   "zoom-in-out"
		//
		animationEffect: "zoom",
		// Duration in ms for open/close animation
		animationDuration: 366,
		// Should image change opacity while zooming
		// If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
		zoomOpacity: "auto",
		// Transition effect between slides
		//
		// Possible values:
		//   false            - disable
		//   "fade'
		//   "slide'
		//   "circular'
		//   "tube'
		//   "zoom-in-out'
		//   "rotate'
		//
		transitionEffect: "fade",
		// Duration in ms for transition animation
		transitionDuration: 366,
		// Custom CSS class for slide element
		slideClass: "",
		// Custom CSS class for layout
		baseClass: "",
		// Base template for layout
		baseTpl: '<div class="fancybox-container" data-lenis-prevent role="dialog" tabindex="-1">' +
			'<div class="fancybox-bg"></div>' +
			'<div class="fancybox-inner">' +
			'<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
			'<div class="fancybox-toolbar">{{buttons}}</div>' +
			'<div class="fancybox-navigation">{{arrows}}</div>' +
			'<div class="fancybox-stage"></div>' +
			'<div class="fancybox-caption"><div class="fancybox-caption__body"></div></div>' +
			"</div>" +
			"</div>",
		// Loading indicator template
		spinnerTpl: '<div class="fancybox-loading"></div>',
		// Error message template
		errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
		btnTpl: {
			download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>' +
				"</a>",
			zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>' +
				"</button>",
			close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
				"</button>",
			// Arrows
			arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
				'<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' +
				"</button>",
			arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
				'<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' +
				"</button>",
			// This small close button will be appended to your html/inline/ajax content by default,
			// if "smallBtn" option is not set to false
			smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
				'<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' +
				"</button>"
		},
		// Container is injected into this element
		parentEl: "body",
		// Hide browser vertical scrollbars; use at your own risk
		hideScrollbar: true,
		// Focus handling
		// ==============
		// Try to focus on the first focusable element after opening
		autoFocus: true,
		// Put focus back to active element after closing
		backFocus: true,
		// Do not let user to focus on element outside modal content
		trapFocus: true,
		// Module specific options
		// =======================
		fullScreen: {
			autoStart: false
		},
		// Set `touch: false` to disable panning/swiping
		touch: {
			vertical: true, // Allow to drag content vertically
			momentum: true // Continue movement after releasing mouse/touch when panning
		},
		// Hash value when initializing manually,
		// set `false` to disable hash change
		hash: null,
		// Customize or add new media types
		// Example:
		/*

			media : {

				youtube : {

					params : {

						autoplay : 0

					}

				}

			}

		*/
		media: {},
		slideShow: {
			autoStart: false,
			speed: 3000
		},
		thumbs: {
			autoStart: false, // Display thumbnails on opening
			hideOnClose: true, // Hide thumbnail grid when closing animation starts
			parentEl: ".fancybox-container", // Container is injected into this element
			axis: "y" // Vertical (y) or horizontal (x) scrolling
		},
		// Use mousewheel to navigate gallery
		// If 'auto' - enabled for images only
		wheel: "auto",
		// Callbacks
		//==========
		// See Documentation/API/Events for more information
		// Example:
		/*

			afterShow: function( instance, current ) {

				console.info( 'Clicked element:' );

				console.info( current.opts.$orig );

			}

		*/
		onInit: $.noop, // When instance has been initialized
		beforeLoad: $.noop, // Before the content of a slide is being loaded
		afterLoad: $.noop, // When the content of a slide is done loading
		beforeShow: $.noop, // Before open animation starts
		afterShow: $.noop, // When content is done loading and animating
		beforeClose: $.noop, // Before the instance attempts to close. Return false to cancel the close.
		afterClose: $.noop, // After instance has been closed
		onActivate: $.noop, // When instance is brought to front
		onDeactivate: $.noop, // When other instance has been activated
		// Interaction
		// ===========
		// Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
		// each option can be string or method that returns value.
		//
		// Possible values:
		//   "close"           - close instance
		//   "next"            - move to next gallery item
		//   "nextOrClose"     - move to next gallery item or close if gallery has only one item
		//   "toggleControls"  - show/hide controls
		//   "zoom"            - zoom image (if loaded)
		//   false             - do nothing
		// Clicked on the content
		clickContent: function(current, event) {
			return current.type === "image" ? "zoom" : false;
		},
		// Clicked on the slide
		clickSlide: "close",
		// Clicked on the background (backdrop) element;
		// if you have not changed the layout, then most likely you need to use `clickSlide` option
		clickOutside: "close",
		// Same as previous two, but for double click
		dblclickContent: false,
		dblclickSlide: false,
		dblclickOutside: false,
		// Custom options when mobile device is detected
		// =============================================
		mobile: {
			preventCaptionOverlap: false,
			idleTime: false,
			clickContent: function(current, event) {
				return current.type === "image" ? "toggleControls" : false;
			},
			clickSlide: function(current, event) {
				return current.type === "image" ? "toggleControls" : "close";
			},
			dblclickContent: function(current, event) {
				return current.type === "image" ? "zoom" : false;
			},
			dblclickSlide: function(current, event) {
				return current.type === "image" ? "zoom" : false;
			}
		},
		// Internationalization
		// ====================
		lang: "en",
		i18n: {
			en: {
				CLOSE: "Close",
				NEXT: "Next",
				PREV: "Previous",
				ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
				PLAY_START: "Start slideshow",
				PLAY_STOP: "Pause slideshow",
				FULL_SCREEN: "Full screen",
				THUMBS: "Thumbnails",
				DOWNLOAD: "Download",
				SHARE: "Share",
				ZOOM: "Zoom"
			},
			de: {
				CLOSE: "Schlie&szlig;en",
				NEXT: "Weiter",
				PREV: "Zur&uuml;ck",
				ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
				PLAY_START: "Diaschau starten",
				PLAY_STOP: "Diaschau beenden",
				FULL_SCREEN: "Vollbild",
				THUMBS: "Vorschaubilder",
				DOWNLOAD: "Herunterladen",
				SHARE: "Teilen",
				ZOOM: "Vergr&ouml;&szlig;ern"
			}
		}
	};
	// Few useful variables and methods
	// ================================
	var $W = $(window);
	var $D = $(document);
	var called = 0;
	// Check if an object is a jQuery object and not a native JavaScript object
	// ========================================================================
	var isQuery = function(obj) {
		return obj && obj.hasOwnProperty && obj instanceof $;
	};
	// Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
	// ===============================================================================
	var requestAFrame = (function() {
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			// if all else fails, use setTimeout
			function(callback) {
				return window.setTimeout(callback, 1000 / 60);
			}
		);
	})();
	var cancelAFrame = (function() {
		return (
			window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			function(id) {
				window.clearTimeout(id);
			}
		);
	})();
	// Detect the supported transition-end event property name
	// =======================================================
	var transitionEnd = (function() {
		var el = document.createElement("fakeelement"),
			t;
		var transitions = {
			transition: "transitionend",
			OTransition: "oTransitionEnd",
			MozTransition: "transitionend",
			WebkitTransition: "webkitTransitionEnd"
		};
		for (t in transitions) {
			if (el.style[t] !== undefined) {
				return transitions[t];
			}
		}
		return "transitionend";
	})();
	// Force redraw on an element.
	// This helps in cases where the browser doesn't redraw an updated element properly
	// ================================================================================
	var forceRedraw = function($el) {
		return $el && $el.length && $el[0].offsetHeight;
	};
	// Exclude array (`buttons`) options from deep merging
	// ===================================================
	var mergeOpts = function(opts1, opts2) {
		var rez = $.extend(true, {}, opts1, opts2);
		$.each(opts2, function(key, value) {
			if ($.isArray(value)) {
				rez[key] = value;
			}
		});
		return rez;
	};
	// How much of an element is visible in viewport
	// =============================================
	var inViewport = function(elem) {
		var elemCenter, rez;
		if (!elem || elem.ownerDocument !== document) {
			return false;
		}
		$(".fancybox-container").css("pointer-events", "none");
		elemCenter = {
			x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
			y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
		};
		rez = document.elementFromPoint(elemCenter.x, elemCenter.y) === elem;
		$(".fancybox-container").css("pointer-events", "");
		return rez;
	};
	// Class definition
	// ================
	var FancyBox = function(content, opts, index) {
		var self = this;
		self.opts = mergeOpts({
			index: index
		}, $.fancybox.defaults);
		if ($.isPlainObject(opts)) {
			self.opts = mergeOpts(self.opts, opts);
		}
		if ($.fancybox.isMobile) {
			self.opts = mergeOpts(self.opts, self.opts.mobile);
		}
		self.id = self.opts.id || ++called;
		self.currIndex = parseInt(self.opts.index, 10) || 0;
		self.prevIndex = null;
		self.prevPos = null;
		self.currPos = 0;
		self.firstRun = true;
		// All group items
		self.group = [];
		// Existing slides (for current, next and previous gallery items)
		self.slides = {};
		// Create group elements
		self.addContent(content);
		if (!self.group.length) {
			return;
		}
		self.init();
	};
	$.extend(FancyBox.prototype, {
		// Create DOM structure
		// ====================
		init: function() {
			var self = this,
				firstItem = self.group[self.currIndex],
				firstItemOpts = firstItem.opts,
				$container,
				buttonStr;
			if (firstItemOpts.closeExisting) {
				$.fancybox.close(true);
			}
			// Hide scrollbars
			// ===============
			$("body").addClass("fancybox-active");
			if (
				!$.fancybox.getInstance() &&
				firstItemOpts.hideScrollbar !== false &&
				!$.fancybox.isMobile &&
				document.body.scrollHeight > window.innerHeight
			) {
				$("head").append(
					'<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
					(window.innerWidth - document.documentElement.clientWidth) +
					"px;}</style>"
				);
				$("body").addClass("compensate-for-scrollbar");
			}
			// Build html markup and set references
			// ====================================
			// Build html code for buttons and insert into main template
			buttonStr = "";
			$.each(firstItemOpts.buttons, function(index, value) {
				buttonStr += firstItemOpts.btnTpl[value] || "";
			});
			// Create markup from base template, it will be initially hidden to
			// avoid unnecessary work like painting while initializing is not complete
			$container = $(
					self.translate(
						self,
						firstItemOpts.baseTpl
						.replace("{{buttons}}", buttonStr)
						.replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight)
					)
				)
				.attr("id", "fancybox-container-" + self.id)
				.addClass(firstItemOpts.baseClass)
				.data("FancyBox", self)
				.appendTo(firstItemOpts.parentEl);
			// Create object holding references to jQuery wrapped nodes
			self.$refs = {
				container: $container
			};
			["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(item) {
				self.$refs[item] = $container.find(".fancybox-" + item);
			});
			self.trigger("onInit");
			// Enable events, deactive previous instances
			self.activate();
			// Build slides, load and reveal content
			self.jumpTo(self.currIndex);
		},
		// Simple i18n support - replaces object keys found in template
		// with corresponding values
		// ============================================================
		translate: function(obj, str) {
			var arr = obj.opts.i18n[obj.opts.lang] || obj.opts.i18n.en;
			return str.replace(/\{\{(\w+)\}\}/g, function(match, n) {
				return arr[n] === undefined ? match : arr[n];
			});
		},
		// Populate current group with fresh content
		// Check if each object has valid type and content
		// ===============================================
		addContent: function(content) {
			var self = this,
				items = $.makeArray(content),
				thumbs;
			$.each(items, function(i, item) {
				var obj = {},
					opts = {},
					$item,
					type,
					found,
					src,
					srcParts;
				// Step 1 - Make sure we have an object
				// ====================================
				if ($.isPlainObject(item)) {
					// We probably have manual usage here, something like
					// $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )
					obj = item;
					opts = item.opts || item;
				} else if ($.type(item) === "object" && $(item).length) {
					// Here we probably have jQuery collection returned by some selector
					$item = $(item);
					// Support attributes like `data-options='{"touch" : false}'` and `data-touch='false'`
					opts = $item.data() || {};
					opts = $.extend(true, {}, opts, opts.options);
					// Here we store clicked element
					opts.$orig = $item;
					obj.src = self.opts.src || opts.src || $item.attr("href");
					// Assume that simple syntax is used, for example:
					//   `$.fancybox.open( $("#test"), {} );`
					if (!obj.type && !obj.src) {
						obj.type = "inline";
						obj.src = item;
					}
				} else {
					// Assume we have a simple html code, for example:
					//   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
					obj = {
						type: "html",
						src: item + ""
					};
				}
				// Each gallery object has full collection of options
				obj.opts = $.extend(true, {}, self.opts, opts);
				// Do not merge buttons array
				if ($.isArray(opts.buttons)) {
					obj.opts.buttons = opts.buttons;
				}
				if ($.fancybox.isMobile && obj.opts.mobile) {
					obj.opts = mergeOpts(obj.opts, obj.opts.mobile);
				}
				// Step 2 - Make sure we have content type, if not - try to guess
				// ==============================================================
				type = obj.type || obj.opts.type;
				src = obj.src || "";
				if (!type && src) {
					if ((found = src.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))) {
						type = "video";
						if (!obj.opts.video.format) {
							obj.opts.video.format = "video/" + (found[1] === "ogv" ? "ogg" : found[1]);
						}
					} else if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
						type = "image";
					} else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
						type = "iframe";
						obj = $.extend(true, obj, {
							contentType: "pdf",
							opts: {
								iframe: {
									preload: false
								}
							}
						});
					} else if (src.charAt(0) === "#") {
						type = "inline";
					}
				}
				if (type) {
					obj.type = type;
				} else {
					self.trigger("objectNeedsType", obj);
				}
				if (!obj.contentType) {
					obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type;
				}
				// Step 3 - Some adjustments
				// =========================
				obj.index = self.group.length;
				if (obj.opts.smallBtn == "auto") {
					obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1;
				}
				if (obj.opts.toolbar === "auto") {
					obj.opts.toolbar = !obj.opts.smallBtn;
				}
				// Find thumbnail image, check if exists and if is in the viewport
				obj.$thumb = obj.opts.$thumb || null;
				if (obj.opts.$trigger && obj.index === self.opts.index) {
					obj.$thumb = obj.opts.$trigger.find("img:first");
					if (obj.$thumb.length) {
						obj.opts.$orig = obj.opts.$trigger;
					}
				}
				if (!(obj.$thumb && obj.$thumb.length) && obj.opts.$orig) {
					obj.$thumb = obj.opts.$orig.find("img:first");
				}
				if (obj.$thumb && !obj.$thumb.length) {
					obj.$thumb = null;
				}
				obj.thumb = obj.opts.thumb || (obj.$thumb ? obj.$thumb[0].src : null);
				// "caption" is a "special" option, it can be used to customize caption per gallery item
				if ($.type(obj.opts.caption) === "function") {
					obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
				}
				if ($.type(self.opts.caption) === "function") {
					obj.opts.caption = self.opts.caption.apply(item, [self, obj]);
				}
				// Make sure we have caption as a string or jQuery object
				if (!(obj.opts.caption instanceof $)) {
					obj.opts.caption = obj.opts.caption === undefined ? "" : obj.opts.caption + "";
				}
				// Check if url contains "filter" used to filter the content
				// Example: "ajax.html #something"
				if (obj.type === "ajax") {
					srcParts = src.split(/\s+/, 2);
					if (srcParts.length > 1) {
						obj.src = srcParts.shift();
						obj.opts.filter = srcParts.shift();
					}
				}
				// Hide all buttons and disable interactivity for modal items
				if (obj.opts.modal) {
					obj.opts = $.extend(true, obj.opts, {
						trapFocus: true,
						// Remove buttons
						infobar: 0,
						toolbar: 0,
						smallBtn: 0,
						// Disable keyboard navigation
						keyboard: 0,
						// Disable some modules
						slideShow: 0,
						fullScreen: 0,
						thumbs: 0,
						touch: 0,
						// Disable click event handlers
						clickContent: false,
						clickSlide: false,
						clickOutside: false,
						dblclickContent: false,
						dblclickSlide: false,
						dblclickOutside: false
					});
				}
				// Step 4 - Add processed object to group
				// ======================================
				self.group.push(obj);
			});
			// Update controls if gallery is already opened
			if (Object.keys(self.slides).length) {
				self.updateControls();
				// Update thumbnails, if needed
				thumbs = self.Thumbs;
				if (thumbs && thumbs.isActive) {
					thumbs.create();
					thumbs.focus();
				}
			}
		},
		// Attach an event handler functions for:
		//   - navigation buttons
		//   - browser scrolling, resizing;
		//   - focusing
		//   - keyboard
		//   - detecting inactivity
		// ======================================
		addEvents: function() {
			var self = this;
			self.removeEvents();
			// Make navigation elements clickable
			// ==================================
			self.$refs.container
				.on("click.fb-close", "[data-fancybox-close]", function(e) {
					e.stopPropagation();
					e.preventDefault();
					self.close(e);
				})
				.on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(e) {
					e.stopPropagation();
					e.preventDefault();
					self.previous();
				})
				.on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(e) {
					e.stopPropagation();
					e.preventDefault();
					self.next();
				})
				.on("click.fb", "[data-fancybox-zoom]", function(e) {
					// Click handler for zoom button
					self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
				});
			// Handle page scrolling and browser resizing
			// ==========================================
			$W.on("orientationchange.fb resize.fb", function(e) {
				if (e && e.originalEvent && e.originalEvent.type === "resize") {
					if (self.requestId) {
						cancelAFrame(self.requestId);
					}
					self.requestId = requestAFrame(function() {
						self.update(e);
					});
				} else {
					if (self.current && self.current.type === "iframe") {
						self.$refs.stage.hide();
					}
					setTimeout(
						function() {
							self.$refs.stage.show();
							self.update(e);
						},
						$.fancybox.isMobile ? 600 : 250
					);
				}
			});
			$D.on("keydown.fb", function(e) {
				var instance = $.fancybox ? $.fancybox.getInstance() : null,
					current = instance.current,
					keycode = e.keyCode || e.which;
				// Trap keyboard focus inside of the modal
				// =======================================
				if (keycode == 9) {
					if (current.opts.trapFocus) {
						self.focus(e);
					}
					return;
				}
				// Enable keyboard navigation
				// ==========================
				if (!current.opts.keyboard || e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input,textarea,video,audio,select")) {
					return;
				}
				// Backspace and Esc keys
				if (keycode === 8 || keycode === 27) {
					e.preventDefault();
					self.close(e);
					return;
				}
				// Left arrow and Up arrow
				if (keycode === 37 || keycode === 38) {
					e.preventDefault();
					self.previous();
					return;
				}
				// Righ arrow and Down arrow
				if (keycode === 39 || keycode === 40) {
					e.preventDefault();
					self.next();
					return;
				}
				self.trigger("afterKeydown", e, keycode);
			});
			// Hide controls after some inactivity period
			if (self.group[self.currIndex].opts.idleTime) {
				self.idleSecondsCounter = 0;
				$D.on(
					"mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
					function(e) {
						self.idleSecondsCounter = 0;
						if (self.isIdle) {
							self.showControls();
						}
						self.isIdle = false;
					}
				);
				self.idleInterval = window.setInterval(function() {
					self.idleSecondsCounter++;
					if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) {
						self.isIdle = true;
						self.idleSecondsCounter = 0;
						self.hideControls();
					}
				}, 1000);
			}
		},
		// Remove events added by the core
		// ===============================
		removeEvents: function() {
			var self = this;
			$W.off("orientationchange.fb resize.fb");
			$D.off("keydown.fb .fb-idle");
			this.$refs.container.off(".fb-close .fb-prev .fb-next");
			if (self.idleInterval) {
				window.clearInterval(self.idleInterval);
				self.idleInterval = null;
			}
		},
		// Change to previous gallery item
		// ===============================
		previous: function(duration) {
			return this.jumpTo(this.currPos - 1, duration);
		},
		// Change to next gallery item
		// ===========================
		next: function(duration) {
			return this.jumpTo(this.currPos + 1, duration);
		},
		// Switch to selected gallery item
		// ===============================
		jumpTo: function(pos, duration) {
			var self = this,
				groupLen = self.group.length,
				firstRun,
				isMoved,
				loop,
				current,
				previous,
				slidePos,
				stagePos,
				prop,
				diff;
			if (self.isDragging || self.isClosing || (self.isAnimating && self.firstRun)) {
				return;
			}
			// Should loop?
			pos = parseInt(pos, 10);
			loop = self.current ? self.current.opts.loop : self.opts.loop;
			if (!loop && (pos < 0 || pos >= groupLen)) {
				return false;
			}
			// Check if opening for the first time; this helps to speed things up
			firstRun = self.firstRun = !Object.keys(self.slides).length;
			// Create slides
			previous = self.current;
			self.prevIndex = self.currIndex;
			self.prevPos = self.currPos;
			current = self.createSlide(pos);
			if (groupLen > 1) {
				if (loop || current.index < groupLen - 1) {
					self.createSlide(pos + 1);
				}
				if (loop || current.index > 0) {
					self.createSlide(pos - 1);
				}
			}
			self.current = current;
			self.currIndex = current.index;
			self.currPos = current.pos;
			self.trigger("beforeShow", firstRun);
			self.updateControls();
			// Validate duration length
			current.forcedDuration = undefined;
			if ($.isNumeric(duration)) {
				current.forcedDuration = duration;
			} else {
				duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"];
			}
			duration = parseInt(duration, 10);
			// Check if user has swiped the slides or if still animating
			isMoved = self.isMoved(current);
			// Make sure current slide is visible
			current.$slide.addClass("fancybox-slide--current");
			// Fresh start - reveal container, current slide and start loading content
			if (firstRun) {
				if (current.opts.animationEffect && duration) {
					self.$refs.container.css("transition-duration", duration + "ms");
				}
				self.$refs.container.addClass("fancybox-is-open").trigger("focus");
				// Attempt to load content into slide
				// This will later call `afterLoad` -> `revealContent`
				self.loadSlide(current);
				self.preload("image");
				return;
			}
			// Get actual slide/stage positions (before cleaning up)
			slidePos = $.fancybox.getTranslate(previous.$slide);
			stagePos = $.fancybox.getTranslate(self.$refs.stage);
			// Clean up all slides
			$.each(self.slides, function(index, slide) {
				$.fancybox.stop(slide.$slide, true);
			});
			if (previous.pos !== current.pos) {
				previous.isComplete = false;
			}
			previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current");
			// If slides are out of place, then animate them to correct position
			if (isMoved) {
				// Calculate horizontal swipe distance
				diff = slidePos.left - (previous.pos * slidePos.width + previous.pos * previous.opts.gutter);
				$.each(self.slides, function(index, slide) {
					slide.$slide.removeClass("fancybox-animated").removeClass(function(index, className) {
						return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
					});
					// Make sure that each slide is in equal distance
					// This is mostly needed for freshly added slides, because they are not yet positioned
					var leftPos = slide.pos * slidePos.width + slide.pos * slide.opts.gutter;
					$.fancybox.setTranslate(slide.$slide, {
						top: 0,
						left: leftPos - stagePos.left + diff
					});
					if (slide.pos !== current.pos) {
						slide.$slide.addClass("fancybox-slide--" + (slide.pos > current.pos ? "next" : "previous"));
					}
					// Redraw to make sure that transition will start
					forceRedraw(slide.$slide);
					// Animate the slide
					$.fancybox.animate(
						slide.$slide, {
							top: 0,
							left: (slide.pos - current.pos) * slidePos.width + (slide.pos - current.pos) * slide.opts.gutter
						},
						duration,
						function() {
							slide.$slide
								.css({
									transform: "",
									opacity: ""
								})
								.removeClass("fancybox-slide--next fancybox-slide--previous");
							if (slide.pos === self.currPos) {
								self.complete();
							}
						}
					);
				});
			} else if (duration && current.opts.transitionEffect) {
				// Set transition effect for previously active slide
				prop = "fancybox-animated fancybox-fx-" + current.opts.transitionEffect;
				previous.$slide.addClass("fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous"));
				$.fancybox.animate(
					previous.$slide,
					prop,
					duration,
					function() {
						previous.$slide.removeClass(prop).removeClass("fancybox-slide--next fancybox-slide--previous");
					},
					false
				);
			}
			if (current.isLoaded) {
				self.revealContent(current);
			} else {
				self.loadSlide(current);
			}
			self.preload("image");
		},
		// Create new "slide" element
		// These are gallery items  that are actually added to DOM
		// =======================================================
		createSlide: function(pos) {
			var self = this,
				$slide,
				index;
			index = pos % self.group.length;
			index = index < 0 ? self.group.length + index : index;
			if (!self.slides[pos] && self.group[index]) {
				$slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);
				self.slides[pos] = $.extend(true, {}, self.group[index], {
					pos: pos,
					$slide: $slide,
					isLoaded: false
				});
				self.updateSlide(self.slides[pos]);
			}
			return self.slides[pos];
		},
		// Scale image to the actual size of the image;
		// x and y values should be relative to the slide
		// ==============================================
		scaleToActual: function(x, y, duration) {
			var self = this,
				current = self.current,
				$content = current.$content,
				canvasWidth = $.fancybox.getTranslate(current.$slide).width,
				canvasHeight = $.fancybox.getTranslate(current.$slide).height,
				newImgWidth = current.width,
				newImgHeight = current.height,
				imgPos,
				posX,
				posY,
				scaleX,
				scaleY;
			if (self.isAnimating || self.isMoved() || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
				return;
			}
			self.isAnimating = true;
			$.fancybox.stop($content);
			x = x === undefined ? canvasWidth * 0.5 : x;
			y = y === undefined ? canvasHeight * 0.5 : y;
			imgPos = $.fancybox.getTranslate($content);
			imgPos.top -= $.fancybox.getTranslate(current.$slide).top;
			imgPos.left -= $.fancybox.getTranslate(current.$slide).left;
			scaleX = newImgWidth / imgPos.width;
			scaleY = newImgHeight / imgPos.height;
			// Get center position for original image
			posX = canvasWidth * 0.5 - newImgWidth * 0.5;
			posY = canvasHeight * 0.5 - newImgHeight * 0.5;
			// Make sure image does not move away from edges
			if (newImgWidth > canvasWidth) {
				posX = imgPos.left * scaleX - (x * scaleX - x);
				if (posX > 0) {
					posX = 0;
				}
				if (posX < canvasWidth - newImgWidth) {
					posX = canvasWidth - newImgWidth;
				}
			}
			if (newImgHeight > canvasHeight) {
				posY = imgPos.top * scaleY - (y * scaleY - y);
				if (posY > 0) {
					posY = 0;
				}
				if (posY < canvasHeight - newImgHeight) {
					posY = canvasHeight - newImgHeight;
				}
			}
			self.updateCursor(newImgWidth, newImgHeight);
			$.fancybox.animate(
				$content, {
					top: posY,
					left: posX,
					scaleX: scaleX,
					scaleY: scaleY
				},
				duration || 366,
				function() {
					self.isAnimating = false;
				}
			);
			// Stop slideshow
			if (self.SlideShow && self.SlideShow.isActive) {
				self.SlideShow.stop();
			}
		},
		// Scale image to fit inside parent element
		// ========================================
		scaleToFit: function(duration) {
			var self = this,
				current = self.current,
				$content = current.$content,
				end;
			if (self.isAnimating || self.isMoved() || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
				return;
			}
			self.isAnimating = true;
			$.fancybox.stop($content);
			end = self.getFitPos(current);
			self.updateCursor(end.width, end.height);
			$.fancybox.animate(
				$content, {
					top: end.top,
					left: end.left,
					scaleX: end.width / $content.width(),
					scaleY: end.height / $content.height()
				},
				duration || 366,
				function() {
					self.isAnimating = false;
				}
			);
		},
		// Calculate image size to fit inside viewport
		// ===========================================
		getFitPos: function(slide) {
			var self = this,
				$content = slide.$content,
				$slide = slide.$slide,
				width = slide.width || slide.opts.width,
				height = slide.height || slide.opts.height,
				maxWidth,
				maxHeight,
				minRatio,
				aspectRatio,
				rez = {};
			if (!slide.isLoaded || !$content || !$content.length) {
				return false;
			}
			maxWidth = $.fancybox.getTranslate(self.$refs.stage).width;
			maxHeight = $.fancybox.getTranslate(self.$refs.stage).height;
			maxWidth -=
				parseFloat($slide.css("paddingLeft")) +
				parseFloat($slide.css("paddingRight")) +
				parseFloat($content.css("marginLeft")) +
				parseFloat($content.css("marginRight"));
			maxHeight -=
				parseFloat($slide.css("paddingTop")) +
				parseFloat($slide.css("paddingBottom")) +
				parseFloat($content.css("marginTop")) +
				parseFloat($content.css("marginBottom"));
			if (!width || !height) {
				width = maxWidth;
				height = maxHeight;
			}
			minRatio = Math.min(1, maxWidth / width, maxHeight / height);
			width = minRatio * width;
			height = minRatio * height;
			// Adjust width/height to precisely fit into container
			if (width > maxWidth - 0.5) {
				width = maxWidth;
			}
			if (height > maxHeight - 0.5) {
				height = maxHeight;
			}
			if (slide.type === "image") {
				rez.top = Math.floor((maxHeight - height) * 0.5) + parseFloat($slide.css("paddingTop"));
				rez.left = Math.floor((maxWidth - width) * 0.5) + parseFloat($slide.css("paddingLeft"));
			} else if (slide.contentType === "video") {
				// Force aspect ratio for the video
				// "I say the whole world must learn of our peaceful ways… by force!"
				aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9;
				if (height > width / aspectRatio) {
					height = width / aspectRatio;
				} else if (width > height * aspectRatio) {
					width = height * aspectRatio;
				}
			}
			rez.width = width;
			rez.height = height;
			return rez;
		},
		// Update content size and position for all slides
		// ==============================================
		update: function(e) {
			var self = this;
			$.each(self.slides, function(key, slide) {
				self.updateSlide(slide, e);
			});
		},
		// Update slide content position and size
		// ======================================
		updateSlide: function(slide, e) {
			var self = this,
				$content = slide && slide.$content,
				width = slide.width || slide.opts.width,
				height = slide.height || slide.opts.height,
				$slide = slide.$slide;
			// First, prevent caption overlap, if needed
			self.adjustCaption(slide);
			// Then resize content to fit inside the slide
			if ($content && (width || height || slide.contentType === "video") && !slide.hasError) {
				$.fancybox.stop($content);
				$.fancybox.setTranslate($content, self.getFitPos(slide));
				if (slide.pos === self.currPos) {
					self.isAnimating = false;
					self.updateCursor();
				}
			}
			// Then some adjustments
			self.adjustLayout(slide);
			if ($slide.length) {
				$slide.trigger("refresh");
				if (slide.pos === self.currPos) {
					self.$refs.toolbar
						.add(self.$refs.navigation.find(".fancybox-button--arrow_right"))
						.toggleClass("compensate-for-scrollbar", $slide.get(0).scrollHeight > $slide.get(0).clientHeight);
				}
			}
			self.trigger("onUpdate", slide, e);
		},
		// Horizontally center slide
		// =========================
		centerSlide: function(duration) {
			var self = this,
				current = self.current,
				$slide = current.$slide;
			if (self.isClosing || !current) {
				return;
			}
			$slide.siblings().css({
				transform: "",
				opacity: ""
			});
			$slide
				.parent()
				.children()
				.removeClass("fancybox-slide--previous fancybox-slide--next");
			$.fancybox.animate(
				$slide, {
					top: 0,
					left: 0,
					opacity: 1
				},
				duration === undefined ? 0 : duration,
				function() {
					// Clean up
					$slide.css({
						transform: "",
						opacity: ""
					});
					if (!current.isComplete) {
						self.complete();
					}
				},
				false
			);
		},
		// Check if current slide is moved (swiped)
		// ========================================
		isMoved: function(slide) {
			var current = slide || this.current,
				slidePos,
				stagePos;
			if (!current) {
				return false;
			}
			stagePos = $.fancybox.getTranslate(this.$refs.stage);
			slidePos = $.fancybox.getTranslate(current.$slide);
			return (
				!current.$slide.hasClass("fancybox-animated") &&
				(Math.abs(slidePos.top - stagePos.top) > 0.5 || Math.abs(slidePos.left - stagePos.left) > 0.5)
			);
		},
		// Update cursor style depending if content can be zoomed
		// ======================================================
		updateCursor: function(nextWidth, nextHeight) {
			var self = this,
				current = self.current,
				$container = self.$refs.container,
				canPan,
				isZoomable;
			if (!current || self.isClosing || !self.Guestures) {
				return;
			}
			$container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan");
			canPan = self.canPan(nextWidth, nextHeight);
			isZoomable = canPan ? true : self.isZoomable();
			$container.toggleClass("fancybox-is-zoomable", isZoomable);
			$("[data-fancybox-zoom]").prop("disabled", !isZoomable);
			if (canPan) {
				$container.addClass("fancybox-can-pan");
			} else if (
				isZoomable &&
				(current.opts.clickContent === "zoom" || ($.isFunction(current.opts.clickContent) && current.opts.clickContent(current) == "zoom"))
			) {
				$container.addClass("fancybox-can-zoomIn");
			} else if (current.opts.touch && (current.opts.touch.vertical || self.group.length > 1) && current.contentType !== "video") {
				$container.addClass("fancybox-can-swipe");
			}
		},
		// Check if current slide is zoomable
		// ==================================
		isZoomable: function() {
			var self = this,
				current = self.current,
				fitPos;
			// Assume that slide is zoomable if:
			//   - image is still loading
			//   - actual size of the image is smaller than available area
			if (current && !self.isClosing && current.type === "image" && !current.hasError) {
				if (!current.isLoaded) {
					return true;
				}
				fitPos = self.getFitPos(current);
				if (fitPos && (current.width > fitPos.width || current.height > fitPos.height)) {
					return true;
				}
			}
			return false;
		},
		// Check if current image dimensions are smaller than actual
		// =========================================================
		isScaledDown: function(nextWidth, nextHeight) {
			var self = this,
				rez = false,
				current = self.current,
				$content = current.$content;
			if (nextWidth !== undefined && nextHeight !== undefined) {
				rez = nextWidth < current.width && nextHeight < current.height;
			} else if ($content) {
				rez = $.fancybox.getTranslate($content);
				rez = rez.width < current.width && rez.height < current.height;
			}
			return rez;
		},
		// Check if image dimensions exceed parent element
		// ===============================================
		canPan: function(nextWidth, nextHeight) {
			var self = this,
				current = self.current,
				pos = null,
				rez = false;
			if (current.type === "image" && (current.isComplete || (nextWidth && nextHeight)) && !current.hasError) {
				rez = self.getFitPos(current);
				if (nextWidth !== undefined && nextHeight !== undefined) {
					pos = {
						width: nextWidth,
						height: nextHeight
					};
				} else if (current.isComplete) {
					pos = $.fancybox.getTranslate(current.$content);
				}
				if (pos && rez) {
					rez = Math.abs(pos.width - rez.width) > 1.5 || Math.abs(pos.height - rez.height) > 1.5;
				}
			}
			return rez;
		},
		// Load content into the slide
		// ===========================
		loadSlide: function(slide) {
			var self = this,
				type,
				$slide,
				ajaxLoad;
			if (slide.isLoading || slide.isLoaded) {
				return;
			}
			slide.isLoading = true;
			if (self.trigger("beforeLoad", slide) === false) {
				slide.isLoading = false;
				return false;
			}
			type = slide.type;
			$slide = slide.$slide;
			$slide
				.off("refresh")
				.trigger("onReset")
				.addClass(slide.opts.slideClass);
			// Create content depending on the type
			switch (type) {
				case "image":
					self.setImage(slide);
					break;
				case "iframe":
					self.setIframe(slide);
					break;
				case "html":
					self.setContent(slide, slide.src || slide.content);
					break;
				case "video":
					self.setContent(
						slide,
						slide.opts.video.tpl
						.replace(/\{\{src\}\}/gi, slide.src)
						.replace("{{format}}", slide.opts.videoFormat || slide.opts.video.format || "")
						.replace("{{poster}}", slide.thumb || "")
					);
					break;
				case "inline":
					if ($(slide.src).length) {
						self.setContent(slide, $(slide.src));
					} else {
						self.setError(slide);
					}
					break;
				case "ajax":
					self.showLoading(slide);
					ajaxLoad = $.ajax(
						$.extend({}, slide.opts.ajax.settings, {
							url: slide.src,
							success: function(data, textStatus) {
								if (textStatus === "success") {
									self.setContent(slide, data);
								}
							},
							error: function(jqXHR, textStatus) {
								if (jqXHR && textStatus !== "abort") {
									self.setError(slide);
								}
							}
						})
					);
					$slide.one("onReset", function() {
						ajaxLoad.abort();
					});
					break;
				default:
					self.setError(slide);
					break;
			}
			return true;
		},
		// Use thumbnail image, if possible
		// ================================
		setImage: function(slide) {
			var self = this,
				ghost;
			// Check if need to show loading icon
			setTimeout(function() {
				var $img = slide.$image;
				if (!self.isClosing && slide.isLoading && (!$img || !$img.length || !$img[0].complete) && !slide.hasError) {
					self.showLoading(slide);
				}
			}, 50);
			//Check if image has srcset
			self.checkSrcset(slide);
			// This will be wrapper containing both ghost and actual image
			slide.$content = $('<div class="fancybox-content"></div>')
				.addClass("fancybox-is-hidden")
				.appendTo(slide.$slide.addClass("fancybox-slide--image"));
			// If we have a thumbnail, we can display it while actual image is loading
			// Users will not stare at black screen and actual image will appear gradually
			if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && slide.thumb) {
				slide.width = slide.opts.width;
				slide.height = slide.opts.height;
				ghost = document.createElement("img");
				ghost.onerror = function() {
					$(this).remove();
					slide.$ghost = null;
				};
				ghost.onload = function() {
					self.afterLoad(slide);
				};
				slide.$ghost = $(ghost)
					.addClass("fancybox-image")
					.appendTo(slide.$content)
					.attr("src", slide.thumb);
			}
			// Start loading actual image
			self.setBigImage(slide);
		},
		// Check if image has srcset and get the source
		// ============================================
		checkSrcset: function(slide) {
			var srcset = slide.opts.srcset || slide.opts.image.srcset,
				found,
				temp,
				pxRatio,
				windowWidth;
			// If we have "srcset", then we need to find first matching "src" value.
			// This is necessary, because when you set an src attribute, the browser will preload the image
			// before any javascript or even CSS is applied.
			if (srcset) {
				pxRatio = window.devicePixelRatio || 1;
				windowWidth = window.innerWidth * pxRatio;
				temp = srcset.split(",").map(function(el) {
					var ret = {};
					el.trim()
						.split(/\s+/)
						.forEach(function(el, i) {
							var value = parseInt(el.substring(0, el.length - 1), 10);
							if (i === 0) {
								return (ret.url = el);
							}
							if (value) {
								ret.value = value;
								ret.postfix = el[el.length - 1];
							}
						});
					return ret;
				});
				// Sort by value
				temp.sort(function(a, b) {
					return a.value - b.value;
				});
				// Ok, now we have an array of all srcset values
				for (var j = 0; j < temp.length; j++) {
					var el = temp[j];
					if ((el.postfix === "w" && el.value >= windowWidth) || (el.postfix === "x" && el.value >= pxRatio)) {
						found = el;
						break;
					}
				}
				// If not found, take the last one
				if (!found && temp.length) {
					found = temp[temp.length - 1];
				}
				if (found) {
					slide.src = found.url;
					// If we have default width/height values, we can calculate height for matching source
					if (slide.width && slide.height && found.postfix == "w") {
						slide.height = (slide.width / slide.height) * found.value;
						slide.width = found.value;
					}
					slide.opts.srcset = srcset;
				}
			}
		},
		// Create full-size image
		// ======================
		setBigImage: function(slide) {
			var self = this,
				img = document.createElement("img"),
				$img = $(img);
			slide.$image = $img
				.one("error", function() {
					self.setError(slide);
				})
				.one("load", function() {
					var sizes;
					if (!slide.$ghost) {
						self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight);
						self.afterLoad(slide);
					}
					if (self.isClosing) {
						return;
					}
					if (slide.opts.srcset) {
						sizes = slide.opts.sizes;
						if (!sizes || sizes === "auto") {
							sizes =
								(slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round((slide.width / slide.height) * 100)) +
								"vw";
						}
						$img.attr("sizes", sizes).attr("srcset", slide.opts.srcset);
					}
					// Hide temporary image after some delay
					if (slide.$ghost) {
						setTimeout(function() {
							if (slide.$ghost && !self.isClosing) {
								slide.$ghost.hide();
							}
						}, Math.min(300, Math.max(1000, slide.height / 1600)));
					}
					self.hideLoading(slide);
				})
				.addClass("fancybox-image")
				.attr("src", slide.src)
				.appendTo(slide.$content);
			if ((img.complete || img.readyState == "complete") && $img.naturalWidth && $img.naturalHeight) {
				$img.trigger("load");
			} else if (img.error) {
				$img.trigger("error");
			}
		},
		// Computes the slide size from image size and maxWidth/maxHeight
		// ==============================================================
		resolveImageSlideSize: function(slide, imgWidth, imgHeight) {
			var maxWidth = parseInt(slide.opts.width, 10),
				maxHeight = parseInt(slide.opts.height, 10);
			// Sets the default values from the image
			slide.width = imgWidth;
			slide.height = imgHeight;
			if (maxWidth > 0) {
				slide.width = maxWidth;
				slide.height = Math.floor((maxWidth * imgHeight) / imgWidth);
			}
			if (maxHeight > 0) {
				slide.width = Math.floor((maxHeight * imgWidth) / imgHeight);
				slide.height = maxHeight;
			}
		},
		// Create iframe wrapper, iframe and bindings
		// ==========================================
		setIframe: function(slide) {
			var self = this,
				opts = slide.opts.iframe,
				$slide = slide.$slide,
				$iframe;
			slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>')
				.css(opts.css)
				.appendTo($slide);
			$slide.addClass("fancybox-slide--" + slide.contentType);
			slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime()))
				.attr(opts.attr)
				.appendTo(slide.$content);
			if (opts.preload) {
				self.showLoading(slide);
				// Unfortunately, it is not always possible to determine if iframe is successfully loaded
				// (due to browser security policy)
				$iframe.on("load.fb error.fb", function(e) {
					this.isReady = 1;
					slide.$slide.trigger("refresh");
					self.afterLoad(slide);
				});
				// Recalculate iframe content size
				// ===============================
				$slide.on("refresh.fb", function() {
					var $content = slide.$content,
						frameWidth = opts.css.width,
						frameHeight = opts.css.height,
						$contents,
						$body;
					if ($iframe[0].isReady !== 1) {
						return;
					}
					try {
						$contents = $iframe.contents();
						$body = $contents.find("body");
					} catch (ignore) {}
					// Calculate content dimensions, if it is accessible
					if ($body && $body.length && $body.children().length) {
						// Avoid scrolling to top (if multiple instances)
						$slide.css("overflow", "visible");
						$content.css({
							width: "100%",
							"max-width": "100%",
							height: "9999px"
						});
						if (frameWidth === undefined) {
							frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(true)));
						}
						$content.css("width", frameWidth ? frameWidth : "").css("max-width", "");
						if (frameHeight === undefined) {
							frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(true)));
						}
						$content.css("height", frameHeight ? frameHeight : "");
						$slide.css("overflow", "auto");
					}
					$content.removeClass("fancybox-is-hidden");
				});
			} else {
				self.afterLoad(slide);
			}
			$iframe.attr("src", slide.src);
			// Remove iframe if closing or changing gallery item
			$slide.one("onReset", function() {
				// This helps IE not to throw errors when closing
				try {
					$(this)
						.find("iframe")
						.hide()
						.unbind()
						.attr("src", "//about:blank");
				} catch (ignore) {}
				$(this)
					.off("refresh.fb")
					.empty();
				slide.isLoaded = false;
				slide.isRevealed = false;
			});
		},
		// Wrap and append content to the slide
		// ======================================
		setContent: function(slide, content) {
			var self = this;
			if (self.isClosing) {
				return;
			}
			self.hideLoading(slide);
			if (slide.$content) {
				$.fancybox.stop(slide.$content);
			}
			slide.$slide.empty();
			// If content is a jQuery object, then it will be moved to the slide.
			// The placeholder is created so we will know where to put it back.
			if (isQuery(content) && content.parent().length) {
				// Make sure content is not already moved to fancyBox
				if (content.hasClass("fancybox-content") || content.parent().hasClass("fancybox-content")) {
					content.parents(".fancybox-slide").trigger("onReset");
				}
				// Create temporary element marking original place of the content
				slide.$placeholder = $("<div>")
					.hide()
					.insertAfter(content);
				// Make sure content is visible
				content.css("display", "inline-block");
			} else if (!slide.hasError) {
				// If content is just a plain text, try to convert it to html
				if ($.type(content) === "string") {
					content = $("<div>")
						.append($.trim(content))
						.contents();
				}
				// If "filter" option is provided, then filter content
				if (slide.opts.filter) {
					content = $("<div>")
						.html(content)
						.find(slide.opts.filter);
				}
			}
			slide.$slide.one("onReset", function() {
				// Pause all html5 video/audio
				$(this)
					.find("video,audio")
					.trigger("pause");
				// Put content back
				if (slide.$placeholder) {
					slide.$placeholder.after(content.removeClass("fancybox-content").hide()).remove();
					slide.$placeholder = null;
				}
				// Remove custom close button
				if (slide.$smallBtn) {
					slide.$smallBtn.remove();
					slide.$smallBtn = null;
				}
				// Remove content and mark slide as not loaded
				if (!slide.hasError) {
					$(this).empty();
					slide.isLoaded = false;
					slide.isRevealed = false;
				}
			});
			$(content).appendTo(slide.$slide);
			if ($(content).is("video,audio")) {
				$(content).addClass("fancybox-video");
				$(content).wrap("<div></div>");
				slide.contentType = "video";
				slide.opts.width = slide.opts.width || $(content).attr("width");
				slide.opts.height = slide.opts.height || $(content).attr("height");
			}
			slide.$content = slide.$slide
				.children()
				.filter("div,form,main,video,audio,article,.fancybox-content")
				.first();
			slide.$content.siblings().hide();
			// Re-check if there is a valid content
			// (in some cases, ajax response can contain various elements or plain text)
			if (!slide.$content.length) {
				slide.$content = slide.$slide
					.wrapInner("<div></div>")
					.children()
					.first();
			}
			slide.$content.addClass("fancybox-content");
			slide.$slide.addClass("fancybox-slide--" + slide.contentType);
			self.afterLoad(slide);
		},
		// Display error message
		// =====================
		setError: function(slide) {
			slide.hasError = true;
			slide.$slide
				.trigger("onReset")
				.removeClass("fancybox-slide--" + slide.contentType)
				.addClass("fancybox-slide--error");
			slide.contentType = "html";
			this.setContent(slide, this.translate(slide, slide.opts.errorTpl));
			if (slide.pos === this.currPos) {
				this.isAnimating = false;
			}
		},
		// Show loading icon inside the slide
		// ==================================
		showLoading: function(slide) {
			var self = this;
			slide = slide || self.current;
			if (slide && !slide.$spinner) {
				slide.$spinner = $(self.translate(self, self.opts.spinnerTpl))
					.appendTo(slide.$slide)
					.hide()
					.fadeIn("fast");
			}
		},
		// Remove loading icon from the slide
		// ==================================
		hideLoading: function(slide) {
			var self = this;
			slide = slide || self.current;
			if (slide && slide.$spinner) {
				slide.$spinner.stop().remove();
				delete slide.$spinner;
			}
		},
		// Adjustments after slide content has been loaded
		// ===============================================
		afterLoad: function(slide) {
			var self = this;
			if (self.isClosing) {
				return;
			}
			slide.isLoading = false;
			slide.isLoaded = true;
			self.trigger("afterLoad", slide);
			self.hideLoading(slide);
			// Add small close button
			if (slide.opts.smallBtn && (!slide.$smallBtn || !slide.$smallBtn.length)) {
				slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).appendTo(slide.$content);
			}
			// Disable right click
			if (slide.opts.protect && slide.$content && !slide.hasError) {
				slide.$content.on("contextmenu.fb", function(e) {
					if (e.button == 2) {
						e.preventDefault();
					}
					return true;
				});
				// Add fake element on top of the image
				// This makes a bit harder for user to select image
				if (slide.type === "image") {
					$('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
				}
			}
			self.adjustCaption(slide);
			self.adjustLayout(slide);
			if (slide.pos === self.currPos) {
				self.updateCursor();
			}
			self.revealContent(slide);
		},
		// Prevent caption overlap,
		// fix css inconsistency across browsers
		// =====================================
		adjustCaption: function(slide) {
			var self = this,
				current = slide || self.current,
				caption = current.opts.caption,
				preventOverlap = current.opts.preventCaptionOverlap,
				$caption = self.$refs.caption,
				$clone,
				captionH = false;
			$caption.toggleClass("fancybox-caption--separate", preventOverlap);
			if (preventOverlap && caption && caption.length) {
				if (current.pos !== self.currPos) {
					$clone = $caption.clone().appendTo($caption.parent());
					$clone
						.children()
						.eq(0)
						.empty()
						.html(caption);
					captionH = $clone.outerHeight(true);
					$clone.empty().remove();
				} else if (self.$caption) {
					captionH = self.$caption.outerHeight(true);
				}
				current.$slide.css("padding-bottom", captionH || "");
			}
		},
		// Simple hack to fix inconsistency across browsers, described here (affects Edge, too):
		// https://bugzilla.mozilla.org/show_bug.cgi?id=748518
		// ====================================================================================
		adjustLayout: function(slide) {
			var self = this,
				current = slide || self.current,
				scrollHeight,
				marginBottom,
				inlinePadding,
				actualPadding;
			if (current.isLoaded && current.opts.disableLayoutFix !== true) {
				current.$content.css("margin-bottom", "");
				// If we would always set margin-bottom for the content,
				// then it would potentially break vertical align
				if (current.$content.outerHeight() > current.$slide.height() + 0.5) {
					inlinePadding = current.$slide[0].style["padding-bottom"];
					actualPadding = current.$slide.css("padding-bottom");
					if (parseFloat(actualPadding) > 0) {
						scrollHeight = current.$slide[0].scrollHeight;
						current.$slide.css("padding-bottom", 0);
						if (Math.abs(scrollHeight - current.$slide[0].scrollHeight) < 1) {
							marginBottom = actualPadding;
						}
						current.$slide.css("padding-bottom", inlinePadding);
					}
				}
				current.$content.css("margin-bottom", marginBottom);
			}
		},
		// Make content visible
		// This method is called right after content has been loaded or
		// user navigates gallery and transition should start
		// ============================================================
		revealContent: function(slide) {
			var self = this,
				$slide = slide.$slide,
				end = false,
				start = false,
				isMoved = self.isMoved(slide),
				isRevealed = slide.isRevealed,
				effect,
				effectClassName,
				duration,
				opacity;
			slide.isRevealed = true;
			effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"];
			duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"];
			duration = parseInt(slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10);
			if (isMoved || slide.pos !== self.currPos || !duration) {
				effect = false;
			}
			// Check if can zoom
			if (effect === "zoom") {
				if (slide.pos === self.currPos && duration && slide.type === "image" && !slide.hasError && (start = self.getThumbPos(slide))) {
					end = self.getFitPos(slide);
				} else {
					effect = "fade";
				}
			}
			// Zoom animation
			// ==============
			if (effect === "zoom") {
				self.isAnimating = true;
				end.scaleX = end.width / start.width;
				end.scaleY = end.height / start.height;
				// Check if we need to animate opacity
				opacity = slide.opts.zoomOpacity;
				if (opacity == "auto") {
					opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
				}
				if (opacity) {
					start.opacity = 0.1;
					end.opacity = 1;
				}
				// Draw image at start position
				$.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start);
				forceRedraw(slide.$content);
				// Start animation
				$.fancybox.animate(slide.$content, end, duration, function() {
					self.isAnimating = false;
					self.complete();
				});
				return;
			}
			self.updateSlide(slide);
			// Simply show content if no effect
			// ================================
			if (!effect) {
				slide.$content.removeClass("fancybox-is-hidden");
				if (!isRevealed && isMoved && slide.type === "image" && !slide.hasError) {
					slide.$content.hide().fadeIn("fast");
				}
				if (slide.pos === self.currPos) {
					self.complete();
				}
				return;
			}
			// Prepare for CSS transiton
			// =========================
			$.fancybox.stop($slide);
			//effectClassName = "fancybox-animated fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-fx-" + effect;
			effectClassName = "fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + effect;
			$slide.addClass(effectClassName).removeClass("fancybox-slide--current"); //.addClass(effectClassName);
			slide.$content.removeClass("fancybox-is-hidden");
			// Force reflow
			forceRedraw($slide);
			if (slide.type !== "image") {
				slide.$content.hide().show(0);
			}
			$.fancybox.animate(
				$slide,
				"fancybox-slide--current",
				duration,
				function() {
					$slide.removeClass(effectClassName).css({
						transform: "",
						opacity: ""
					});
					if (slide.pos === self.currPos) {
						self.complete();
					}
				},
				true
			);
		},
		// Check if we can and have to zoom from thumbnail
		//================================================
		getThumbPos: function(slide) {
			var rez = false,
				$thumb = slide.$thumb,
				thumbPos,
				btw,
				brw,
				bbw,
				blw;
			if (!$thumb || !inViewport($thumb[0])) {
				return false;
			}
			thumbPos = $.fancybox.getTranslate($thumb);
			btw = parseFloat($thumb.css("border-top-width") || 0);
			brw = parseFloat($thumb.css("border-right-width") || 0);
			bbw = parseFloat($thumb.css("border-bottom-width") || 0);
			blw = parseFloat($thumb.css("border-left-width") || 0);
			rez = {
				top: thumbPos.top + btw,
				left: thumbPos.left + blw,
				width: thumbPos.width - brw - blw,
				height: thumbPos.height - btw - bbw,
				scaleX: 1,
				scaleY: 1
			};
			return thumbPos.width > 0 && thumbPos.height > 0 ? rez : false;
		},
		// Final adjustments after current gallery item is moved to position
		// and it`s content is loaded
		// ==================================================================
		complete: function() {
			var self = this,
				current = self.current,
				slides = {},
				$el;
			if (self.isMoved() || !current.isLoaded) {
				return;
			}
			if (!current.isComplete) {
				current.isComplete = true;
				current.$slide.siblings().trigger("onReset");
				self.preload("inline");
				// Trigger any CSS transiton inside the slide
				forceRedraw(current.$slide);
				current.$slide.addClass("fancybox-slide--complete");
				// Remove unnecessary slides
				$.each(self.slides, function(key, slide) {
					if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
						slides[slide.pos] = slide;
					} else if (slide) {
						$.fancybox.stop(slide.$slide);
						slide.$slide.off().remove();
					}
				});
				self.slides = slides;
			}
			self.isAnimating = false;
			self.updateCursor();
			self.trigger("afterShow");
			// Autoplay first html5 video/audio
			if (!!current.opts.video.autoStart) {
				current.$slide
					.find("video,audio")
					.filter(":visible:first")
					.trigger("play")
					.one("ended", function() {
						if (Document.exitFullscreen) {
							Document.exitFullscreen();
						} else if (this.webkitExitFullscreen) {
							this.webkitExitFullscreen();
						}
						self.next();
					});
			}
			// Try to focus on the first focusable element
			if (current.opts.autoFocus && current.contentType === "html") {
				// Look for the first input with autofocus attribute
				$el = current.$content.find("input[autofocus]:enabled:visible:first");
				if ($el.length) {
					$el.trigger("focus");
				} else {
					self.focus(null, true);
				}
			}
			// Avoid jumping
			current.$slide.scrollTop(0).scrollLeft(0);
		},
		// Preload next and previous slides
		// ================================
		preload: function(type) {
			var self = this,
				prev,
				next;
			if (self.group.length < 2) {
				return;
			}
			next = self.slides[self.currPos + 1];
			prev = self.slides[self.currPos - 1];
			if (prev && prev.type === type) {
				self.loadSlide(prev);
			}
			if (next && next.type === type) {
				self.loadSlide(next);
			}
		},
		// Try to find and focus on the first focusable element
		// ====================================================
		focus: function(e, firstRun) {
			var self = this,
				focusableStr = [
					"a[href]",
					"area[href]",
					'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
					"select:not([disabled]):not([aria-hidden])",
					"textarea:not([disabled]):not([aria-hidden])",
					"button:not([disabled]):not([aria-hidden])",
					"iframe",
					"object",
					"embed",
					"video",
					"audio",
					"[contenteditable]",
					'[tabindex]:not([tabindex^="-"])'
				].join(","),
				focusableItems,
				focusedItemIndex;
			if (self.isClosing) {
				return;
			}
			if (e || !self.current || !self.current.isComplete) {
				// Focus on any element inside fancybox
				focusableItems = self.$refs.container.find("*:visible");
			} else {
				// Focus inside current slide
				focusableItems = self.current.$slide.find("*:visible" + (firstRun ? ":not(.fancybox-close-small)" : ""));
			}
			focusableItems = focusableItems.filter(focusableStr).filter(function() {
				return $(this).css("visibility") !== "hidden" && !$(this).hasClass("disabled");
			});
			if (focusableItems.length) {
				focusedItemIndex = focusableItems.index(document.activeElement);
				if (e && e.shiftKey) {
					// Back tab
					if (focusedItemIndex < 0 || focusedItemIndex == 0) {
						e.preventDefault();
						focusableItems.eq(focusableItems.length - 1).trigger("focus");
					}
				} else {
					// Outside or Forward tab
					if (focusedItemIndex < 0 || focusedItemIndex == focusableItems.length - 1) {
						if (e) {
							e.preventDefault();
						}
						focusableItems.eq(0).trigger("focus");
					}
				}
			} else {
				self.$refs.container.trigger("focus");
			}
		},
		// Activates current instance - brings container to the front and enables keyboard,
		// notifies other instances about deactivating
		// =================================================================================
		activate: function() {
			var self = this;
			// Deactivate all instances
			$(".fancybox-container").each(function() {
				var instance = $(this).data("FancyBox");
				// Skip self and closing instances
				if (instance && instance.id !== self.id && !instance.isClosing) {
					instance.trigger("onDeactivate");
					instance.removeEvents();
					instance.isVisible = false;
				}
			});
			self.isVisible = true;
			if (self.current || self.isIdle) {
				self.update();
				self.updateControls();
			}
			self.trigger("onActivate");
			self.addEvents();
		},
		// Start closing procedure
		// This will start "zoom-out" animation if needed and clean everything up afterwards
		// =================================================================================
		close: function(e, d) {
			var self = this,
				current = self.current,
				effect,
				duration,
				$content,
				domRect,
				opacity,
				start,
				end;
			var done = function() {
				self.cleanUp(e);
			};
			if (self.isClosing) {
				return false;
			}
			self.isClosing = true;
			// If beforeClose callback prevents closing, make sure content is centered
			if (self.trigger("beforeClose", e) === false) {
				self.isClosing = false;
				requestAFrame(function() {
					self.update();
				});
				return false;
			}
			// Remove all events
			// If there are multiple instances, they will be set again by "activate" method
			self.removeEvents();
			$content = current.$content;
			effect = current.opts.animationEffect;
			duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0;
			current.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");
			if (e !== true) {
				$.fancybox.stop(current.$slide);
			} else {
				effect = false;
			}
			// Remove other slides
			current.$slide
				.siblings()
				.trigger("onReset")
				.remove();
			// Trigger animations
			if (duration) {
				self.$refs.container
					.removeClass("fancybox-is-open")
					.addClass("fancybox-is-closing")
					.css("transition-duration", duration + "ms");
			}
			// Clean up
			self.hideLoading(current);
			self.hideControls(true);
			self.updateCursor();
			// Check if possible to zoom-out
			if (
				effect === "zoom" &&
				!($content && duration && current.type === "image" && !self.isMoved() && !current.hasError && (end = self.getThumbPos(current)))
			) {
				effect = "fade";
			}
			if (effect === "zoom") {
				$.fancybox.stop($content);
				domRect = $.fancybox.getTranslate($content);
				start = {
					top: domRect.top,
					left: domRect.left,
					scaleX: domRect.width / end.width,
					scaleY: domRect.height / end.height,
					width: end.width,
					height: end.height
				};
				// Check if we need to animate opacity
				opacity = current.opts.zoomOpacity;
				if (opacity == "auto") {
					opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
				}
				if (opacity) {
					end.opacity = 0;
				}
				$.fancybox.setTranslate($content, start);
				forceRedraw($content);
				$.fancybox.animate($content, end, duration, done);
				return true;
			}
			if (effect && duration) {
				$.fancybox.animate(
					current.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"),
					"fancybox-animated fancybox-fx-" + effect,
					duration,
					done
				);
			} else {
				// If skip animation
				if (e === true) {
					setTimeout(done, duration);
				} else {
					done();
				}
			}
			return true;
		},
		// Final adjustments after removing the instance
		// =============================================
		cleanUp: function(e) {
			var self = this,
				instance,
				$focus = self.current.opts.$orig,
				x,
				y;
			self.current.$slide.trigger("onReset");
			self.$refs.container.empty().remove();
			self.trigger("afterClose", e);
			// Place back focus
			if (!!self.current.opts.backFocus) {
				if (!$focus || !$focus.length || !$focus.is(":visible")) {
					$focus = self.$trigger;
				}
				if ($focus && $focus.length) {
					x = window.scrollX;
					y = window.scrollY;
					$focus.trigger("focus");
					$("html, body")
						.scrollTop(y)
						.scrollLeft(x);
				}
			}
			self.current = null;
			// Check if there are other instances
			instance = $.fancybox.getInstance();
			if (instance) {
				instance.activate();
			} else {
				$("body").removeClass("fancybox-active compensate-for-scrollbar");
				$("#fancybox-style-noscroll").remove();
			}
		},
		// Call callback and trigger an event
		// ==================================
		trigger: function(name, slide) {
			var args = Array.prototype.slice.call(arguments, 1),
				self = this,
				obj = slide && slide.opts ? slide : self.current,
				rez;
			if (obj) {
				args.unshift(obj);
			} else {
				obj = self;
			}
			args.unshift(self);
			if ($.isFunction(obj.opts[name])) {
				rez = obj.opts[name].apply(obj, args);
			}
			if (rez === false) {
				return rez;
			}
			if (name === "afterClose" || !self.$refs) {
				$D.trigger(name + ".fb", args);
			} else {
				self.$refs.container.trigger(name + ".fb", args);
			}
		},
		// Update infobar values, navigation button states and reveal caption
		// ==================================================================
		updateControls: function() {
			var self = this,
				current = self.current,
				index = current.index,
				$container = self.$refs.container,
				$caption = self.$refs.caption,
				caption = current.opts.caption;
			// Recalculate content dimensions
			current.$slide.trigger("refresh");
			// Set caption
			if (caption && caption.length) {
				self.$caption = $caption;
				$caption
					.children()
					.eq(0)
					.html(caption);
			} else {
				self.$caption = null;
			}
			if (!self.hasHiddenControls && !self.isIdle) {
				self.showControls();
			}
			// Update info and navigation elements
			$container.find("[data-fancybox-count]").html(self.group.length);
			$container.find("[data-fancybox-index]").html(index + 1);
			$container.find("[data-fancybox-prev]").prop("disabled", !current.opts.loop && index <= 0);
			$container.find("[data-fancybox-next]").prop("disabled", !current.opts.loop && index >= self.group.length - 1);
			if (current.type === "image") {
				// Re-enable buttons; update download button source
				$container
					.find("[data-fancybox-zoom]")
					.show()
					.end()
					.find("[data-fancybox-download]")
					.attr("href", current.opts.image.src || current.src)
					.show();
			} else if (current.opts.toolbar) {
				$container.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
			}
			// Make sure focus is not on disabled button/element
			if ($(document.activeElement).is(":hidden,[disabled]")) {
				self.$refs.container.trigger("focus");
			}
		},
		// Hide toolbar and caption
		// ========================
		hideControls: function(andCaption) {
			var self = this,
				arr = ["infobar", "toolbar", "nav"];
			if (andCaption || !self.current.opts.preventCaptionOverlap) {
				arr.push("caption");
			}
			this.$refs.container.removeClass(
				arr
				.map(function(i) {
					return "fancybox-show-" + i;
				})
				.join(" ")
			);
			this.hasHiddenControls = true;
		},
		showControls: function() {
			var self = this,
				opts = self.current ? self.current.opts : self.opts,
				$container = self.$refs.container;
			self.hasHiddenControls = false;
			self.idleSecondsCounter = 0;
			$container
				.toggleClass("fancybox-show-toolbar", !!(opts.toolbar && opts.buttons))
				.toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1))
				.toggleClass("fancybox-show-caption", !!self.$caption)
				.toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1))
				.toggleClass("fancybox-is-modal", !!opts.modal);
		},
		// Toggle toolbar and caption
		// ==========================
		toggleControls: function() {
			if (this.hasHiddenControls) {
				this.showControls();
			} else {
				this.hideControls();
			}
		}
	});
	$.fancybox = {
		version: "3.5.7",
		defaults: defaults,
		// Get current instance and execute a command.
		//
		// Examples of usage:
		//
		//   $instance = $.fancybox.getInstance();
		//   $.fancybox.getInstance().jumpTo( 1 );
		//   $.fancybox.getInstance( 'jumpTo', 1 );
		//   $.fancybox.getInstance( function() {
		//       console.info( this.currIndex );
		//   });
		// ======================================================
		getInstance: function(command) {
			var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
				args = Array.prototype.slice.call(arguments, 1);
			if (instance instanceof FancyBox) {
				if ($.type(command) === "string") {
					instance[command].apply(instance, args);
				} else if ($.type(command) === "function") {
					command.apply(instance, args);
				}
				return instance;
			}
			return false;
		},
		// Create new instance
		// ===================
		open: function(items, opts, index) {
			return new FancyBox(items, opts, index);
		},
		// Close current or all instances
		// ==============================
		close: function(all) {
			var instance = this.getInstance();
			if (instance) {
				instance.close();
				// Try to find and close next instance
				if (all === true) {
					this.close(all);
				}
			}
		},
		// Close all instances and unbind all events
		// =========================================
		destroy: function() {
			this.close(true);
			$D.add("body").off("click.fb-start", "**");
		},
		// Try to detect mobile devices
		// ============================
		isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
		// Detect if 'translate3d' support is available
		// ============================================
		use3d: (function() {
			var div = document.createElement("div");
			return (
				window.getComputedStyle &&
				window.getComputedStyle(div) &&
				window.getComputedStyle(div).getPropertyValue("transform") &&
				!(document.documentMode && document.documentMode < 11)
			);
		})(),
		// Helper function to get current visual state of an element
		// returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
		// =====================================================================
		getTranslate: function($el) {
			var domRect;
			if (!$el || !$el.length) {
				return false;
			}
			domRect = $el[0].getBoundingClientRect();
			return {
				top: domRect.top || 0,
				left: domRect.left || 0,
				width: domRect.width,
				height: domRect.height,
				opacity: parseFloat($el.css("opacity"))
			};
		},
		// Shortcut for setting "translate3d" properties for element
		// Can set be used to set opacity, too
		// ========================================================
		setTranslate: function($el, props) {
			var str = "",
				css = {};
			if (!$el || !props) {
				return;
			}
			if (props.left !== undefined || props.top !== undefined) {
				str =
					(props.left === undefined ? $el.position().left : props.left) +
					"px, " +
					(props.top === undefined ? $el.position().top : props.top) +
					"px";
				if (this.use3d) {
					str = "translate3d(" + str + ", 0px)";
				} else {
					str = "translate(" + str + ")";
				}
			}
			if (props.scaleX !== undefined && props.scaleY !== undefined) {
				str += " scale(" + props.scaleX + ", " + props.scaleY + ")";
			} else if (props.scaleX !== undefined) {
				str += " scaleX(" + props.scaleX + ")";
			}
			if (str.length) {
				css.transform = str;
			}
			if (props.opacity !== undefined) {
				css.opacity = props.opacity;
			}
			if (props.width !== undefined) {
				css.width = props.width;
			}
			if (props.height !== undefined) {
				css.height = props.height;
			}
			return $el.css(css);
		},
		// Simple CSS transition handler
		// =============================
		animate: function($el, to, duration, callback, leaveAnimationName) {
			var self = this,
				from;
			if ($.isFunction(duration)) {
				callback = duration;
				duration = null;
			}
			self.stop($el);
			from = self.getTranslate($el);
			$el.on(transitionEnd, function(e) {
				// Skip events from child elements and z-index change
				if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == "z-index")) {
					return;
				}
				self.stop($el);
				if ($.isNumeric(duration)) {
					$el.css("transition-duration", "");
				}
				if ($.isPlainObject(to)) {
					if (to.scaleX !== undefined && to.scaleY !== undefined) {
						self.setTranslate($el, {
							top: to.top,
							left: to.left,
							width: from.width * to.scaleX,
							height: from.height * to.scaleY,
							scaleX: 1,
							scaleY: 1
						});
					}
				} else if (leaveAnimationName !== true) {
					$el.removeClass(to);
				}
				if ($.isFunction(callback)) {
					callback(e);
				}
			});
			if ($.isNumeric(duration)) {
				$el.css("transition-duration", duration + "ms");
			}
			// Start animation by changing CSS properties or class name
			if ($.isPlainObject(to)) {
				if (to.scaleX !== undefined && to.scaleY !== undefined) {
					delete to.width;
					delete to.height;
					if ($el.parent().hasClass("fancybox-slide--image")) {
						$el.parent().addClass("fancybox-is-scaling");
					}
				}
				$.fancybox.setTranslate($el, to);
			} else {
				$el.addClass(to);
			}
			// Make sure that `transitionend` callback gets fired
			$el.data(
				"timer",
				setTimeout(function() {
					$el.trigger(transitionEnd);
				}, duration + 33)
			);
		},
		stop: function($el, callCallback) {
			if ($el && $el.length) {
				clearTimeout($el.data("timer"));
				if (callCallback) {
					$el.trigger(transitionEnd);
				}
				$el.off(transitionEnd).css("transition-duration", "");
				$el.parent().removeClass("fancybox-is-scaling");
			}
		}
	};
	// Default click handler for "fancyboxed" links
	// ============================================
	function _run(e, opts) {
		var items = [],
			index = 0,
			$target,
			value,
			instance;
		// Avoid opening multiple times
		if (e && e.isDefaultPrevented()) {
			return;
		}
		e.preventDefault();
		opts = opts || {};
		if (e && e.data) {
			opts = mergeOpts(e.data.options, opts);
		}
		$target = opts.$target || $(e.currentTarget).trigger("blur");
		instance = $.fancybox.getInstance();
		if (instance && instance.$trigger && instance.$trigger.is($target)) {
			return;
		}
		if (opts.selector) {
			items = $(opts.selector);
		} else {
			// Get all related items and find index for clicked one
			value = $target.attr("data-fancybox") || "";
			if (value) {
				items = e.data ? e.data.items : [];
				items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');
			} else {
				items = [$target];
			}
		}
		index = $(items).index($target);
		// Sometimes current item can not be found
		if (index < 0) {
			index = 0;
		}
		instance = $.fancybox.open(items, opts, index);
		// Save last active element
		instance.$trigger = $target;
	}
	// Create a jQuery plugin
	// ======================
	$.fn.fancybox = function(options) {
		var selector;
		options = options || {};
		selector = options.selector || false;
		if (selector) {
			// Use body element instead of document so it executes first
			$("body")
				.off("click.fb-start", selector)
				.on("click.fb-start", selector, {
					options: options
				}, _run);
		} else {
			this.off("click.fb-start").on(
				"click.fb-start", {
					items: this,
					options: options
				},
				_run
			);
		}
		return this;
	};
	// Self initializing plugin for all elements having `data-fancybox` attribute
	// ==========================================================================
	$D.on("click.fb-start", "[data-fancybox]", _run);
	// Enable "trigger elements"
	// =========================
	$D.on("click.fb-start", "[data-fancybox-trigger]", function(e) {
		$('[data-fancybox="' + $(this).attr("data-fancybox-trigger") + '"]')
			.eq($(this).attr("data-fancybox-index") || 0)
			.trigger("click.fb-start", {
				$trigger: $(this)
			});
	});
	// Track focus event for better accessibility styling
	// ==================================================
	(function() {
		var buttonStr = ".fancybox-button",
			focusStr = "fancybox-focus",
			$pressed = null;
		$D.on("mousedown mouseup focus blur", buttonStr, function(e) {
			switch (e.type) {
				case "mousedown":
					$pressed = $(this);
					break;
				case "mouseup":
					$pressed = null;
					break;
				case "focusin":
					$(buttonStr).removeClass(focusStr);
					if (!$(this).is($pressed) && !$(this).is("[disabled]")) {
						$(this).addClass(focusStr);
					}
					break;
				case "focusout":
					$(buttonStr).removeClass(focusStr);
					break;
			}
		});
	})();
})(window, document, jQuery);
// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
(function($) {
	"use strict";
	// Object containing properties for each media type
	var defaults = {
		youtube: {
			matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
			params: {
				autoplay: 1,
				autohide: 1,
				fs: 1,
				rel: 0,
				hd: 1,
				wmode: "transparent",
				enablejsapi: 1,
				html5: 1
			},
			paramPlace: 8,
			type: "iframe",
			url: "https://www.youtube-nocookie.com/embed/$4",
			thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
		},
		vimeo: {
			matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
			params: {
				autoplay: 1,
				hd: 1,
				show_title: 1,
				show_byline: 1,
				show_portrait: 0,
				fullscreen: 1
			},
			paramPlace: 3,
			type: "iframe",
			url: "//player.vimeo.com/video/$2"
		},
		instagram: {
			matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
			type: "image",
			url: "//$1/p/$2/media/?size=l"
		},
		// Examples:
		// http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
		// https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
		// https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
		// https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
		gmap_place: {
			matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
			type: "iframe",
			url: function(rez) {
				return (
					"//maps.google." +
					rez[2] +
					"/?ll=" +
					(rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") +
					"&output=" +
					(rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
				);
			}
		},
		// Examples:
		// https://www.google.com/maps/search/Empire+State+Building/
		// https://www.google.com/maps/search/?api=1&query=centurylink+field
		// https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
		gmap_search: {
			matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
			type: "iframe",
			url: function(rez) {
				return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
			}
		}
	};
	// Formats matching url to final form
	var format = function(url, rez, params) {
		if (!url) {
			return;
		}
		params = params || "";
		if ($.type(params) === "object") {
			params = $.param(params, true);
		}
		$.each(rez, function(key, value) {
			url = url.replace("$" + key, value || "");
		});
		if (params.length) {
			url += (url.indexOf("?") > 0 ? "&" : "?") + params;
		}
		return url;
	};
	$(document).on("objectNeedsType.fb", function(e, instance, item) {
		var url = item.src || "",
			type = false,
			media,
			thumb,
			rez,
			params,
			urlParams,
			paramObj,
			provider;
		media = $.extend(true, {}, defaults, item.opts.media);
		// Look for any matching media type
		$.each(media, function(providerName, providerOpts) {
			rez = url.match(providerOpts.matcher);
			if (!rez) {
				return;
			}
			type = providerOpts.type;
			provider = providerName;
			paramObj = {};
			if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
				urlParams = rez[providerOpts.paramPlace];
				if (urlParams[0] == "?") {
					urlParams = urlParams.substring(1);
				}
				urlParams = urlParams.split("&");
				for (var m = 0; m < urlParams.length; ++m) {
					var p = urlParams[m].split("=", 2);
					if (p.length == 2) {
						paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
					}
				}
			}
			params = $.extend(true, {}, providerOpts.params, item.opts[providerName], paramObj);
			url =
				$.type(providerOpts.url) === "function" ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params);
			thumb =
				$.type(providerOpts.thumb) === "function" ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez);
			if (providerName === "youtube") {
				url = url.replace(/&t=((\d+)m)?(\d+)s/, function(match, p1, m, s) {
					return "&start=" + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10));
				});
			} else if (providerName === "vimeo") {
				url = url.replace("&%23", "#");
			}
			return false;
		});
		// If it is found, then change content type and update the url
		if (type) {
			if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
				item.opts.thumb = thumb;
			}
			if (type === "iframe") {
				item.opts = $.extend(true, item.opts, {
					iframe: {
						preload: false,
						attr: {
							scrolling: "no"
						}
					}
				});
			}
			$.extend(item, {
				type: type,
				src: url,
				origSrc: item.src,
				contentSource: provider,
				contentType: type === "image" ? "image" : provider == "gmap_place" || provider == "gmap_search" ? "map" : "video"
			});
		} else if (url) {
			item.type = item.opts.defaultType;
		}
	});
	// Load YouTube/Video API on request to detect when video finished playing
	var VideoAPILoader = {
		youtube: {
			src: "https://www.youtube.com/iframe_api",
			class: "YT",
			loading: false,
			loaded: false
		},
		vimeo: {
			src: "https://player.vimeo.com/api/player.js",
			class: "Vimeo",
			loading: false,
			loaded: false
		},
		load: function(vendor) {
			var _this = this,
				script;
			if (this[vendor].loaded) {
				setTimeout(function() {
					_this.done(vendor);
				});
				return;
			}
			if (this[vendor].loading) {
				return;
			}
			this[vendor].loading = true;
			script = document.createElement("script");
			script.type = "text/javascript";
			script.src = this[vendor].src;
			if (vendor === "youtube") {
				window.onYouTubeIframeAPIReady = function() {
					_this[vendor].loaded = true;
					_this.done(vendor);
				};
			} else {
				script.onload = function() {
					_this[vendor].loaded = true;
					_this.done(vendor);
				};
			}
			document.body.appendChild(script);
		},
		done: function(vendor) {
			var instance, $el, player;
			if (vendor === "youtube") {
				delete window.onYouTubeIframeAPIReady;
			}
			instance = $.fancybox.getInstance();
			if (instance) {
				$el = instance.current.$content.find("iframe");
				if (vendor === "youtube" && YT !== undefined && YT) {
					player = new YT.Player($el.attr("id"), {
						events: {
							onStateChange: function(e) {
								if (e.data == 0) {
									instance.next();
								}
							}
						}
					});
				} else if (vendor === "vimeo" && Vimeo !== undefined && Vimeo) {
					player = new Vimeo.Player($el);
					player.on("ended", function() {
						instance.next();
					});
				}
			}
		}
	};
	$(document).on({
		"afterShow.fb": function(e, instance, current) {
			if (instance.group.length > 1 && (current.contentSource === "youtube" || current.contentSource === "vimeo")) {
				VideoAPILoader.load(current.contentSource);
			}
		}
	});
})(jQuery);
// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
(function(window, document, $) {
	"use strict";
	var requestAFrame = (function() {
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			// if all else fails, use setTimeout
			function(callback) {
				return window.setTimeout(callback, 1000 / 60);
			}
		);
	})();
	var cancelAFrame = (function() {
		return (
			window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			function(id) {
				window.clearTimeout(id);
			}
		);
	})();
	var getPointerXY = function(e) {
		var result = [];
		e = e.originalEvent || e || window.e;
		e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
		for (var key in e) {
			if (e[key].pageX) {
				result.push({
					x: e[key].pageX,
					y: e[key].pageY
				});
			} else if (e[key].clientX) {
				result.push({
					x: e[key].clientX,
					y: e[key].clientY
				});
			}
		}
		return result;
	};
	var distance = function(point2, point1, what) {
		if (!point1 || !point2) {
			return 0;
		}
		if (what === "x") {
			return point2.x - point1.x;
		} else if (what === "y") {
			return point2.y - point1.y;
		}
		return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	};
	var isClickable = function($el) {
		if (
			$el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') ||
			$.isFunction($el.get(0).onclick) ||
			$el.data("selectable")
		) {
			return true;
		}
		// Check for attributes like data-fancybox-next or data-fancybox-close
		for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) {
			if (atts[i].nodeName.substr(0, 14) === "data-fancybox-") {
				return true;
			}
		}
		return false;
	};
	var hasScrollbars = function(el) {
		var overflowY = window.getComputedStyle(el)["overflow-y"],
			overflowX = window.getComputedStyle(el)["overflow-x"],
			vertical = (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight,
			horizontal = (overflowX === "scroll" || overflowX === "auto") && el.scrollWidth > el.clientWidth;
		return vertical || horizontal;
	};
	var isScrollable = function($el) {
		var rez = false;
		while (true) {
			rez = hasScrollbars($el.get(0));
			if (rez) {
				break;
			}
			$el = $el.parent();
			if (!$el.length || $el.hasClass("fancybox-stage") || $el.is("body")) {
				break;
			}
		}
		return rez;
	};
	var Guestures = function(instance) {
		var self = this;
		self.instance = instance;
		self.$bg = instance.$refs.bg;
		self.$stage = instance.$refs.stage;
		self.$container = instance.$refs.container;
		self.destroy();
		self.$container.on("touchstart.fb.touch mousedown.fb.touch", $.proxy(self, "ontouchstart"));
	};
	Guestures.prototype.destroy = function() {
		var self = this;
		self.$container.off(".fb.touch");
		$(document).off(".fb.touch");
		if (self.requestId) {
			cancelAFrame(self.requestId);
			self.requestId = null;
		}
		if (self.tapped) {
			clearTimeout(self.tapped);
			self.tapped = null;
		}
	};
	Guestures.prototype.ontouchstart = function(e) {
		var self = this,
			$target = $(e.target),
			instance = self.instance,
			current = instance.current,
			$slide = current.$slide,
			$content = current.$content,
			isTouchDevice = e.type == "touchstart";
		// Do not respond to both (touch and mouse) events
		if (isTouchDevice) {
			self.$container.off("mousedown.fb.touch");
		}
		// Ignore right click
		if (e.originalEvent && e.originalEvent.button == 2) {
			return;
		}
		// Ignore taping on links, buttons, input elements
		if (!$slide.length || !$target.length || isClickable($target) || isClickable($target.parent())) {
			return;
		}
		// Ignore clicks on the scrollbar
		if (!$target.is("img") && e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) {
			return;
		}
		// Ignore clicks while zooming or closing
		if (!current || instance.isAnimating || current.$slide.hasClass("fancybox-animated")) {
			e.stopPropagation();
			e.preventDefault();
			return;
		}
		self.realPoints = self.startPoints = getPointerXY(e);
		if (!self.startPoints.length) {
			return;
		}
		// Allow other scripts to catch touch event if "touch" is set to false
		if (current.touch) {
			e.stopPropagation();
		}
		self.startEvent = e;
		self.canTap = true;
		self.$target = $target;
		self.$content = $content;
		self.opts = current.opts.touch;
		self.isPanning = false;
		self.isSwiping = false;
		self.isZooming = false;
		self.isScrolling = false;
		self.canPan = instance.canPan();
		self.startTime = new Date().getTime();
		self.distanceX = self.distanceY = self.distance = 0;
		self.canvasWidth = Math.round($slide[0].clientWidth);
		self.canvasHeight = Math.round($slide[0].clientHeight);
		self.contentLastPos = null;
		self.contentStartPos = $.fancybox.getTranslate(self.$content) || {
			top: 0,
			left: 0
		};
		self.sliderStartPos = $.fancybox.getTranslate($slide);
		// Since position will be absolute, but we need to make it relative to the stage
		self.stagePos = $.fancybox.getTranslate(instance.$refs.stage);
		self.sliderStartPos.top -= self.stagePos.top;
		self.sliderStartPos.left -= self.stagePos.left;
		self.contentStartPos.top -= self.stagePos.top;
		self.contentStartPos.left -= self.stagePos.left;
		$(document)
			.off(".fb.touch")
			.on(isTouchDevice ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", $.proxy(self, "ontouchend"))
			.on(isTouchDevice ? "touchmove.fb.touch" : "mousemove.fb.touch", $.proxy(self, "ontouchmove"));
		if ($.fancybox.isMobile) {
			document.addEventListener("scroll", self.onscroll, true);
		}
		// Skip if clicked outside the sliding area
		if (!(self.opts || self.canPan) || !($target.is(self.$stage) || self.$stage.find($target).length)) {
			if ($target.is(".fancybox-image")) {
				e.preventDefault();
			}
			if (!($.fancybox.isMobile && $target.parents(".fancybox-caption").length)) {
				return;
			}
		}
		self.isScrollable = isScrollable($target) || isScrollable($target.parent());
		// Check if element is scrollable and try to prevent default behavior (scrolling)
		if (!($.fancybox.isMobile && self.isScrollable)) {
			e.preventDefault();
		}
		// One finger or mouse click - swipe or pan an image
		if (self.startPoints.length === 1 || current.hasError) {
			if (self.canPan) {
				$.fancybox.stop(self.$content);
				self.isPanning = true;
			} else {
				self.isSwiping = true;
			}
			self.$container.addClass("fancybox-is-grabbing");
		}
		// Two fingers - zoom image
		if (self.startPoints.length === 2 && current.type === "image" && (current.isLoaded || current.$ghost)) {
			self.canTap = false;
			self.isSwiping = false;
			self.isPanning = false;
			self.isZooming = true;
			$.fancybox.stop(self.$content);
			self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft();
			self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop();
			self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width;
			self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height;
			self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]);
		}
	};
	Guestures.prototype.onscroll = function(e) {
		var self = this;
		self.isScrolling = true;
		document.removeEventListener("scroll", self.onscroll, true);
	};
	Guestures.prototype.ontouchmove = function(e) {
		var self = this;
		// Make sure user has not released over iframe or disabled element
		if (e.originalEvent.buttons !== undefined && e.originalEvent.buttons === 0) {
			self.ontouchend(e);
			return;
		}
		if (self.isScrolling) {
			self.canTap = false;
			return;
		}
		self.newPoints = getPointerXY(e);
		if (!(self.opts || self.canPan) || !self.newPoints.length || !self.newPoints.length) {
			return;
		}
		if (!(self.isSwiping && self.isSwiping === true)) {
			e.preventDefault();
		}
		self.distanceX = distance(self.newPoints[0], self.startPoints[0], "x");
		self.distanceY = distance(self.newPoints[0], self.startPoints[0], "y");
		self.distance = distance(self.newPoints[0], self.startPoints[0]);
		// Skip false ontouchmove events (Chrome)
		if (self.distance > 0) {
			if (self.isSwiping) {
				self.onSwipe(e);
			} else if (self.isPanning) {
				self.onPan();
			} else if (self.isZooming) {
				self.onZoom();
			}
		}
	};
	Guestures.prototype.onSwipe = function(e) {
		var self = this,
			instance = self.instance,
			swiping = self.isSwiping,
			left = self.sliderStartPos.left || 0,
			angle;
		// If direction is not yet determined
		if (swiping === true) {
			// We need at least 10px distance to correctly calculate an angle
			if (Math.abs(self.distance) > 10) {
				self.canTap = false;
				if (instance.group.length < 2 && self.opts.vertical) {
					self.isSwiping = "y";
				} else if (instance.isDragging || self.opts.vertical === false || (self.opts.vertical === "auto" && $(window).width() > 800)) {
					self.isSwiping = "x";
				} else {
					angle = Math.abs((Math.atan2(self.distanceY, self.distanceX) * 180) / Math.PI);
					self.isSwiping = angle > 45 && angle < 135 ? "y" : "x";
				}
				if (self.isSwiping === "y" && $.fancybox.isMobile && self.isScrollable) {
					self.isScrolling = true;
					return;
				}
				instance.isDragging = self.isSwiping;
				// Reset points to avoid jumping, because we dropped first swipes to calculate the angle
				self.startPoints = self.newPoints;
				$.each(instance.slides, function(index, slide) {
					var slidePos, stagePos;
					$.fancybox.stop(slide.$slide);
					slidePos = $.fancybox.getTranslate(slide.$slide);
					stagePos = $.fancybox.getTranslate(instance.$refs.stage);
					slide.$slide
						.css({
							transform: "",
							opacity: "",
							"transition-duration": ""
						})
						.removeClass("fancybox-animated")
						.removeClass(function(index, className) {
							return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
						});
					if (slide.pos === instance.current.pos) {
						self.sliderStartPos.top = slidePos.top - stagePos.top;
						self.sliderStartPos.left = slidePos.left - stagePos.left;
					}
					$.fancybox.setTranslate(slide.$slide, {
						top: slidePos.top - stagePos.top,
						left: slidePos.left - stagePos.left
					});
				});
				// Stop slideshow
				if (instance.SlideShow && instance.SlideShow.isActive) {
					instance.SlideShow.stop();
				}
			}
			return;
		}
		// Sticky edges
		if (swiping == "x") {
			if (
				self.distanceX > 0 &&
				(self.instance.group.length < 2 || (self.instance.current.index === 0 && !self.instance.current.opts.loop))
			) {
				left = left + Math.pow(self.distanceX, 0.8);
			} else if (
				self.distanceX < 0 &&
				(self.instance.group.length < 2 ||
					(self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop))
			) {
				left = left - Math.pow(-self.distanceX, 0.8);
			} else {
				left = left + self.distanceX;
			}
		}
		self.sliderLastPos = {
			top: swiping == "x" ? 0 : self.sliderStartPos.top + self.distanceY,
			left: left
		};
		if (self.requestId) {
			cancelAFrame(self.requestId);
			self.requestId = null;
		}
		self.requestId = requestAFrame(function() {
			if (self.sliderLastPos) {
				$.each(self.instance.slides, function(index, slide) {
					var pos = slide.pos - self.instance.currPos;
					$.fancybox.setTranslate(slide.$slide, {
						top: self.sliderLastPos.top,
						left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
					});
				});
				self.$container.addClass("fancybox-is-sliding");
			}
		});
	};
	Guestures.prototype.onPan = function() {
		var self = this;
		// Prevent accidental movement (sometimes, when tapping casually, finger can move a bit)
		if (distance(self.newPoints[0], self.realPoints[0]) < ($.fancybox.isMobile ? 10 : 5)) {
			self.startPoints = self.newPoints;
			return;
		}
		self.canTap = false;
		self.contentLastPos = self.limitMovement();
		if (self.requestId) {
			cancelAFrame(self.requestId);
		}
		self.requestId = requestAFrame(function() {
			$.fancybox.setTranslate(self.$content, self.contentLastPos);
		});
	};
	// Make panning sticky to the edges
	Guestures.prototype.limitMovement = function() {
		var self = this;
		var canvasWidth = self.canvasWidth;
		var canvasHeight = self.canvasHeight;
		var distanceX = self.distanceX;
		var distanceY = self.distanceY;
		var contentStartPos = self.contentStartPos;
		var currentOffsetX = contentStartPos.left;
		var currentOffsetY = contentStartPos.top;
		var currentWidth = contentStartPos.width;
		var currentHeight = contentStartPos.height;
		var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY, newOffsetX, newOffsetY;
		if (currentWidth > canvasWidth) {
			newOffsetX = currentOffsetX + distanceX;
		} else {
			newOffsetX = currentOffsetX;
		}
		newOffsetY = currentOffsetY + distanceY;
		// Slow down proportionally to traveled distance
		minTranslateX = Math.max(0, canvasWidth * 0.5 - currentWidth * 0.5);
		minTranslateY = Math.max(0, canvasHeight * 0.5 - currentHeight * 0.5);
		maxTranslateX = Math.min(canvasWidth - currentWidth, canvasWidth * 0.5 - currentWidth * 0.5);
		maxTranslateY = Math.min(canvasHeight - currentHeight, canvasHeight * 0.5 - currentHeight * 0.5);
		//   ->
		if (distanceX > 0 && newOffsetX > minTranslateX) {
			newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0;
		}
		//    <-
		if (distanceX < 0 && newOffsetX < maxTranslateX) {
			newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0;
		}
		//   \/
		if (distanceY > 0 && newOffsetY > minTranslateY) {
			newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0;
		}
		//   /\
		if (distanceY < 0 && newOffsetY < maxTranslateY) {
			newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0;
		}
		return {
			top: newOffsetY,
			left: newOffsetX
		};
	};
	Guestures.prototype.limitPosition = function(newOffsetX, newOffsetY, newWidth, newHeight) {
		var self = this;
		var canvasWidth = self.canvasWidth;
		var canvasHeight = self.canvasHeight;
		if (newWidth > canvasWidth) {
			newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
			newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
		} else {
			// Center horizontally
			newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2);
		}
		if (newHeight > canvasHeight) {
			newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
			newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
		} else {
			// Center vertically
			newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2);
		}
		return {
			top: newOffsetY,
			left: newOffsetX
		};
	};
	Guestures.prototype.onZoom = function() {
		var self = this;
		// Calculate current distance between points to get pinch ratio and new width and height
		var contentStartPos = self.contentStartPos;
		var currentWidth = contentStartPos.width;
		var currentHeight = contentStartPos.height;
		var currentOffsetX = contentStartPos.left;
		var currentOffsetY = contentStartPos.top;
		var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]);
		var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;
		var newWidth = Math.floor(currentWidth * pinchRatio);
		var newHeight = Math.floor(currentHeight * pinchRatio);
		// This is the translation due to pinch-zooming
		var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX;
		var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY;
		// Point between the two touches
		var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft();
		var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop();
		// And this is the translation due to translation of the centerpoint
		// between the two fingers
		var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
		var translateFromTranslatingY = centerPointEndY - self.centerPointStartY;
		// The new offset is the old/current one plus the total translation
		var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX);
		var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY);
		var newPos = {
			top: newOffsetY,
			left: newOffsetX,
			scaleX: pinchRatio,
			scaleY: pinchRatio
		};
		self.canTap = false;
		self.newWidth = newWidth;
		self.newHeight = newHeight;
		self.contentLastPos = newPos;
		if (self.requestId) {
			cancelAFrame(self.requestId);
		}
		self.requestId = requestAFrame(function() {
			$.fancybox.setTranslate(self.$content, self.contentLastPos);
		});
	};
	Guestures.prototype.ontouchend = function(e) {
		var self = this;
		var swiping = self.isSwiping;
		var panning = self.isPanning;
		var zooming = self.isZooming;
		var scrolling = self.isScrolling;
		self.endPoints = getPointerXY(e);
		self.dMs = Math.max(new Date().getTime() - self.startTime, 1);
		self.$container.removeClass("fancybox-is-grabbing");
		$(document).off(".fb.touch");
		document.removeEventListener("scroll", self.onscroll, true);
		if (self.requestId) {
			cancelAFrame(self.requestId);
			self.requestId = null;
		}
		self.isSwiping = false;
		self.isPanning = false;
		self.isZooming = false;
		self.isScrolling = false;
		self.instance.isDragging = false;
		if (self.canTap) {
			return self.onTap(e);
		}
		self.speed = 100;
		// Speed in px/ms
		self.velocityX = (self.distanceX / self.dMs) * 0.5;
		self.velocityY = (self.distanceY / self.dMs) * 0.5;
		if (panning) {
			self.endPanning();
		} else if (zooming) {
			self.endZooming();
		} else {
			self.endSwiping(swiping, scrolling);
		}
		return;
	};
	Guestures.prototype.endSwiping = function(swiping, scrolling) {
		var self = this,
			ret = false,
			len = self.instance.group.length,
			distanceX = Math.abs(self.distanceX),
			canAdvance = swiping == "x" && len > 1 && ((self.dMs > 130 && distanceX > 10) || distanceX > 50),
			speedX = 300;
		self.sliderLastPos = null;
		// Close if swiped vertically / navigate if horizontally
		if (swiping == "y" && !scrolling && Math.abs(self.distanceY) > 50) {
			// Continue vertical movement
			$.fancybox.animate(
				self.instance.current.$slide, {
					top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150,
					opacity: 0
				},
				200
			);
			ret = self.instance.close(true, 250);
		} else if (canAdvance && self.distanceX > 0) {
			ret = self.instance.previous(speedX);
		} else if (canAdvance && self.distanceX < 0) {
			ret = self.instance.next(speedX);
		}
		if (ret === false && (swiping == "x" || swiping == "y")) {
			self.instance.centerSlide(200);
		}
		self.$container.removeClass("fancybox-is-sliding");
	};
	// Limit panning from edges
	// ========================
	Guestures.prototype.endPanning = function() {
		var self = this,
			newOffsetX,
			newOffsetY,
			newPos;
		if (!self.contentLastPos) {
			return;
		}
		if (self.opts.momentum === false || self.dMs > 350) {
			newOffsetX = self.contentLastPos.left;
			newOffsetY = self.contentLastPos.top;
		} else {
			// Continue movement
			newOffsetX = self.contentLastPos.left + self.velocityX * 500;
			newOffsetY = self.contentLastPos.top + self.velocityY * 500;
		}
		newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);
		newPos.width = self.contentStartPos.width;
		newPos.height = self.contentStartPos.height;
		$.fancybox.animate(self.$content, newPos, 366);
	};
	Guestures.prototype.endZooming = function() {
		var self = this;
		var current = self.instance.current;
		var newOffsetX, newOffsetY, newPos, reset;
		var newWidth = self.newWidth;
		var newHeight = self.newHeight;
		if (!self.contentLastPos) {
			return;
		}
		newOffsetX = self.contentLastPos.left;
		newOffsetY = self.contentLastPos.top;
		reset = {
			top: newOffsetY,
			left: newOffsetX,
			width: newWidth,
			height: newHeight,
			scaleX: 1,
			scaleY: 1
		};
		// Reset scalex/scaleY values; this helps for perfomance and does not break animation
		$.fancybox.setTranslate(self.$content, reset);
		if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) {
			self.instance.scaleToFit(150);
		} else if (newWidth > current.width || newHeight > current.height) {
			self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150);
		} else {
			newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight);
			$.fancybox.animate(self.$content, newPos, 150);
		}
	};
	Guestures.prototype.onTap = function(e) {
		var self = this;
		var $target = $(e.target);
		var instance = self.instance;
		var current = instance.current;
		var endPoints = (e && getPointerXY(e)) || self.startPoints;
		var tapX = endPoints[0] ? endPoints[0].x - $(window).scrollLeft() - self.stagePos.left : 0;
		var tapY = endPoints[0] ? endPoints[0].y - $(window).scrollTop() - self.stagePos.top : 0;
		var where;
		var process = function(prefix) {
			var action = current.opts[prefix];
			if ($.isFunction(action)) {
				action = action.apply(instance, [current, e]);
			}
			if (!action) {
				return;
			}
			switch (action) {
				case "close":
					instance.close(self.startEvent);
					break;
				case "toggleControls":
					instance.toggleControls();
					break;
				case "next":
					instance.next();
					break;
				case "nextOrClose":
					if (instance.group.length > 1) {
						instance.next();
					} else {
						instance.close(self.startEvent);
					}
					break;
				case "zoom":
					if (current.type == "image" && (current.isLoaded || current.$ghost)) {
						if (instance.canPan()) {
							instance.scaleToFit();
						} else if (instance.isScaledDown()) {
							instance.scaleToActual(tapX, tapY);
						} else if (instance.group.length < 2) {
							instance.close(self.startEvent);
						}
					}
					break;
			}
		};
		// Ignore right click
		if (e.originalEvent && e.originalEvent.button == 2) {
			return;
		}
		// Skip if clicked on the scrollbar
		if (!$target.is("img") && tapX > $target[0].clientWidth + $target.offset().left) {
			return;
		}
		// Check where is clicked
		if ($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) {
			where = "Outside";
		} else if ($target.is(".fancybox-slide")) {
			where = "Slide";
		} else if (
			instance.current.$content &&
			instance.current.$content
			.find($target)
			.addBack()
			.filter($target).length
		) {
			where = "Content";
		} else {
			return;
		}
		// Check if this is a double tap
		if (self.tapped) {
			// Stop previously created single tap
			clearTimeout(self.tapped);
			self.tapped = null;
			// Skip if distance between taps is too big
			if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) {
				return this;
			}
			// OK, now we assume that this is a double-tap
			process("dblclick" + where);
		} else {
			// Single tap will be processed if user has not clicked second time within 300ms
			// or there is no need to wait for double-tap
			self.tapX = tapX;
			self.tapY = tapY;
			if (current.opts["dblclick" + where] && current.opts["dblclick" + where] !== current.opts["click" + where]) {
				self.tapped = setTimeout(function() {
					self.tapped = null;
					if (!instance.isAnimating) {
						process("click" + where);
					}
				}, 500);
			} else {
				process("click" + where);
			}
		}
		return this;
	};
	$(document)
		.on("onActivate.fb", function(e, instance) {
			if (instance && !instance.Guestures) {
				instance.Guestures = new Guestures(instance);
			}
		})
		.on("beforeClose.fb", function(e, instance) {
			if (instance && instance.Guestures) {
				instance.Guestures.destroy();
			}
		});
})(window, document, jQuery);
// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
(function(document, $) {
	"use strict";
	$.extend(true, $.fancybox.defaults, {
		btnTpl: {
			slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg>' +
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg>' +
				"</button>"
		},
		slideShow: {
			autoStart: false,
			speed: 3000,
			progress: true
		}
	});
	var SlideShow = function(instance) {
		this.instance = instance;
		this.init();
	};
	$.extend(SlideShow.prototype, {
		timer: null,
		isActive: false,
		$button: null,
		init: function() {
			var self = this,
				instance = self.instance,
				opts = instance.group[instance.currIndex].opts.slideShow;
			self.$button = instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
				self.toggle();
			});
			if (instance.group.length < 2 || !opts) {
				self.$button.hide();
			} else if (opts.progress) {
				self.$progress = $('<div class="fancybox-progress"></div>').appendTo(instance.$refs.inner);
			}
		},
		set: function(force) {
			var self = this,
				instance = self.instance,
				current = instance.current;
			// Check if reached last element
			if (current && (force === true || current.opts.loop || instance.currIndex < instance.group.length - 1)) {
				if (self.isActive && current.contentType !== "video") {
					if (self.$progress) {
						$.fancybox.animate(self.$progress.show(), {
							scaleX: 1
						}, current.opts.slideShow.speed);
					}
					self.timer = setTimeout(function() {
						if (!instance.current.opts.loop && instance.current.index == instance.group.length - 1) {
							instance.jumpTo(0);
						} else {
							instance.next();
						}
					}, current.opts.slideShow.speed);
				}
			} else {
				self.stop();
				instance.idleSecondsCounter = 0;
				instance.showControls();
			}
		},
		clear: function() {
			var self = this;
			clearTimeout(self.timer);
			self.timer = null;
			if (self.$progress) {
				self.$progress.removeAttr("style").hide();
			}
		},
		start: function() {
			var self = this,
				current = self.instance.current;
			if (current) {
				self.$button
					.attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_STOP)
					.removeClass("fancybox-button--play")
					.addClass("fancybox-button--pause");
				self.isActive = true;
				if (current.isComplete) {
					self.set(true);
				}
				self.instance.trigger("onSlideShowChange", true);
			}
		},
		stop: function() {
			var self = this,
				current = self.instance.current;
			self.clear();
			self.$button
				.attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_START)
				.removeClass("fancybox-button--pause")
				.addClass("fancybox-button--play");
			self.isActive = false;
			self.instance.trigger("onSlideShowChange", false);
			if (self.$progress) {
				self.$progress.removeAttr("style").hide();
			}
		},
		toggle: function() {
			var self = this;
			if (self.isActive) {
				self.stop();
			} else {
				self.start();
			}
		}
	});
	$(document).on({
		"onInit.fb": function(e, instance) {
			if (instance && !instance.SlideShow) {
				instance.SlideShow = new SlideShow(instance);
			}
		},
		"beforeShow.fb": function(e, instance, current, firstRun) {
			var SlideShow = instance && instance.SlideShow;
			if (firstRun) {
				if (SlideShow && current.opts.slideShow.autoStart) {
					SlideShow.start();
				}
			} else if (SlideShow && SlideShow.isActive) {
				SlideShow.clear();
			}
		},
		"afterShow.fb": function(e, instance, current) {
			var SlideShow = instance && instance.SlideShow;
			if (SlideShow && SlideShow.isActive) {
				SlideShow.set();
			}
		},
		"afterKeydown.fb": function(e, instance, current, keypress, keycode) {
			var SlideShow = instance && instance.SlideShow;
			// "P" or Spacebar
			if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) {
				keypress.preventDefault();
				SlideShow.toggle();
			}
		},
		"beforeClose.fb onDeactivate.fb": function(e, instance) {
			var SlideShow = instance && instance.SlideShow;
			if (SlideShow) {
				SlideShow.stop();
			}
		}
	});
	// Page Visibility API to pause slideshow when window is not active
	$(document).on("visibilitychange", function() {
		var instance = $.fancybox.getInstance(),
			SlideShow = instance && instance.SlideShow;
		if (SlideShow && SlideShow.isActive) {
			if (document.hidden) {
				SlideShow.clear();
			} else {
				SlideShow.set();
			}
		}
	});
})(document, jQuery);
// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
(function(document, $) {
	"use strict";
	// Collection of methods supported by user browser
	var fn = (function() {
		var fnMap = [
			["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
			// new WebKit
			[
				"webkitRequestFullscreen",
				"webkitExitFullscreen",
				"webkitFullscreenElement",
				"webkitFullscreenEnabled",
				"webkitfullscreenchange",
				"webkitfullscreenerror"
			],
			// old WebKit (Safari 5.1)
			[
				"webkitRequestFullScreen",
				"webkitCancelFullScreen",
				"webkitCurrentFullScreenElement",
				"webkitCancelFullScreen",
				"webkitfullscreenchange",
				"webkitfullscreenerror"
			],
			[
				"mozRequestFullScreen",
				"mozCancelFullScreen",
				"mozFullScreenElement",
				"mozFullScreenEnabled",
				"mozfullscreenchange",
				"mozfullscreenerror"
			],
			["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
		];
		var ret = {};
		for (var i = 0; i < fnMap.length; i++) {
			var val = fnMap[i];
			if (val && val[1] in document) {
				for (var j = 0; j < val.length; j++) {
					ret[fnMap[0][j]] = val[j];
				}
				return ret;
			}
		}
		return false;
	})();
	if (fn) {
		var FullScreen = {
			request: function(elem) {
				elem = elem || document.documentElement;
				elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
			},
			exit: function() {
				document[fn.exitFullscreen]();
			},
			toggle: function(elem) {
				elem = elem || document.documentElement;
				if (this.isFullscreen()) {
					this.exit();
				} else {
					this.request(elem);
				}
			},
			isFullscreen: function() {
				return Boolean(document[fn.fullscreenElement]);
			},
			enabled: function() {
				return Boolean(document[fn.fullscreenEnabled]);
			}
		};
		$.extend(true, $.fancybox.defaults, {
			btnTpl: {
				fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}">' +
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>' +
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg>' +
					"</button>"
			},
			fullScreen: {
				autoStart: false
			}
		});
		$(document).on(fn.fullscreenchange, function() {
			var isFullscreen = FullScreen.isFullscreen(),
				instance = $.fancybox.getInstance();
			if (instance) {
				// If image is zooming, then force to stop and reposition properly
				if (instance.current && instance.current.type === "image" && instance.isAnimating) {
					instance.isAnimating = false;
					instance.update(true, true, 0);
					if (!instance.isComplete) {
						instance.complete();
					}
				}
				instance.trigger("onFullscreenChange", isFullscreen);
				instance.$refs.container.toggleClass("fancybox-is-fullscreen", isFullscreen);
				instance.$refs.toolbar
					.find("[data-fancybox-fullscreen]")
					.toggleClass("fancybox-button--fsenter", !isFullscreen)
					.toggleClass("fancybox-button--fsexit", isFullscreen);
			}
		});
	}
	$(document).on({
		"onInit.fb": function(e, instance) {
			var $container;
			if (!fn) {
				instance.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
				return;
			}
			if (instance && instance.group[instance.currIndex].opts.fullScreen) {
				$container = instance.$refs.container;
				$container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(e) {
					e.stopPropagation();
					e.preventDefault();
					FullScreen.toggle();
				});
				if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
					FullScreen.request();
				}
				// Expose API
				instance.FullScreen = FullScreen;
			} else if (instance) {
				instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
			}
		},
		"afterKeydown.fb": function(e, instance, current, keypress, keycode) {
			// "F"
			if (instance && instance.FullScreen && keycode === 70) {
				keypress.preventDefault();
				instance.FullScreen.toggle();
			}
		},
		"beforeClose.fb": function(e, instance) {
			if (instance && instance.FullScreen && instance.$refs.container.hasClass("fancybox-is-fullscreen")) {
				FullScreen.exit();
			}
		}
	});
})(document, jQuery);
// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
(function(document, $) {
	"use strict";
	var CLASS = "fancybox-thumbs",
		CLASS_ACTIVE = CLASS + "-active";
	// Make sure there are default values
	$.fancybox.defaults = $.extend(
		true, {
			btnTpl: {
				thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg>' +
					"</button>"
			},
			thumbs: {
				autoStart: false, // Display thumbnails on opening
				hideOnClose: true, // Hide thumbnail grid when closing animation starts
				parentEl: ".fancybox-container", // Container is injected into this element
				axis: "y" // Vertical (y) or horizontal (x) scrolling
			}
		},
		$.fancybox.defaults
	);
	var FancyThumbs = function(instance) {
		this.init(instance);
	};
	$.extend(FancyThumbs.prototype, {
		$button: null,
		$grid: null,
		$list: null,
		isVisible: false,
		isActive: false,
		init: function(instance) {
			var self = this,
				group = instance.group,
				enabled = 0;
			self.instance = instance;
			self.opts = group[instance.currIndex].opts.thumbs;
			instance.Thumbs = self;
			self.$button = instance.$refs.toolbar.find("[data-fancybox-thumbs]");
			// Enable thumbs if at least two group items have thumbnails
			for (var i = 0, len = group.length; i < len; i++) {
				if (group[i].thumb) {
					enabled++;
				}
				if (enabled > 1) {
					break;
				}
			}
			if (enabled > 1 && !!self.opts) {
				self.$button.removeAttr("style").on("click", function() {
					self.toggle();
				});
				self.isActive = true;
			} else {
				self.$button.hide();
			}
		},
		create: function() {
			var self = this,
				instance = self.instance,
				parentEl = self.opts.parentEl,
				list = [],
				src;
			if (!self.$grid) {
				// Create main element
				self.$grid = $('<div class="' + CLASS + " " + CLASS + "-" + self.opts.axis + '"></div>').appendTo(
					instance.$refs.container
					.find(parentEl)
					.addBack()
					.filter(parentEl)
				);
				// Add "click" event that performs gallery navigation
				self.$grid.on("click", "a", function() {
					instance.jumpTo($(this).attr("data-index"));
				});
			}
			// Build the list
			if (!self.$list) {
				self.$list = $('<div class="' + CLASS + '__list">').appendTo(self.$grid);
			}
			$.each(instance.group, function(i, item) {
				src = item.thumb;
				if (!src && item.type === "image") {
					src = item.src;
				}
				list.push(
					'<a href="javascript:;" tabindex="0" data-index="' +
					i +
					'"' +
					(src && src.length ? ' style="background-image:url(' + src + ')"' : 'class="fancybox-thumbs-missing"') +
					"></a>"
				);
			});
			self.$list[0].innerHTML = list.join("");
			if (self.opts.axis === "x") {
				// Set fixed width for list element to enable horizontal scrolling
				self.$list.width(
					parseInt(self.$grid.css("padding-right"), 10) +
					instance.group.length *
					self.$list
					.children()
					.eq(0)
					.outerWidth(true)
				);
			}
		},
		focus: function(duration) {
			var self = this,
				$list = self.$list,
				$grid = self.$grid,
				thumb,
				thumbPos;
			if (!self.instance.current) {
				return;
			}
			thumb = $list
				.children()
				.removeClass(CLASS_ACTIVE)
				.filter('[data-index="' + self.instance.current.index + '"]')
				.addClass(CLASS_ACTIVE);
			thumbPos = thumb.position();
			// Check if need to scroll to make current thumb visible
			if (self.opts.axis === "y" && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight())) {
				$list.stop().animate({
						scrollTop: $list.scrollTop() + thumbPos.top
					},
					duration
				);
			} else if (
				self.opts.axis === "x" &&
				(thumbPos.left < $grid.scrollLeft() || thumbPos.left > $grid.scrollLeft() + ($grid.width() - thumb.outerWidth()))
			) {
				$list
					.parent()
					.stop()
					.animate({
							scrollLeft: thumbPos.left
						},
						duration
					);
			}
		},
		update: function() {
			var that = this;
			that.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible);
			if (that.isVisible) {
				if (!that.$grid) {
					that.create();
				}
				that.instance.trigger("onThumbsShow");
				that.focus(0);
			} else if (that.$grid) {
				that.instance.trigger("onThumbsHide");
			}
			// Update content position
			that.instance.update();
		},
		hide: function() {
			this.isVisible = false;
			this.update();
		},
		show: function() {
			this.isVisible = true;
			this.update();
		},
		toggle: function() {
			this.isVisible = !this.isVisible;
			this.update();
		}
	});
	$(document).on({
		"onInit.fb": function(e, instance) {
			var Thumbs;
			if (instance && !instance.Thumbs) {
				Thumbs = new FancyThumbs(instance);
				if (Thumbs.isActive && Thumbs.opts.autoStart === true) {
					Thumbs.show();
				}
			}
		},
		"beforeShow.fb": function(e, instance, item, firstRun) {
			var Thumbs = instance && instance.Thumbs;
			if (Thumbs && Thumbs.isVisible) {
				Thumbs.focus(firstRun ? 0 : 250);
			}
		},
		"afterKeydown.fb": function(e, instance, current, keypress, keycode) {
			var Thumbs = instance && instance.Thumbs;
			// "G"
			if (Thumbs && Thumbs.isActive && keycode === 71) {
				keypress.preventDefault();
				Thumbs.toggle();
			}
		},
		"beforeClose.fb": function(e, instance) {
			var Thumbs = instance && instance.Thumbs;
			if (Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false) {
				Thumbs.$grid.hide();
			}
		}
	});
})(document, jQuery);
//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
(function(document, $) {
	"use strict";
	$.extend(true, $.fancybox.defaults, {
		btnTpl: {
			share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' +
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg>' +
				"</button>"
		},
		share: {
			url: function(instance, item) {
				return (
					(!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location
				);
			},
			tpl: '<div class="fancybox-share">' +
				"<h1>{{SHARE}}</h1>" +
				"<p>" +
				'<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">' +
				'<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>' +
				"<span>Facebook</span>" +
				"</a>" +
				'<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">' +
				'<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>' +
				"<span>Twitter</span>" +
				"</a>" +
				'<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">' +
				'<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>' +
				"<span>Pinterest</span>" +
				"</a>" +
				"</p>" +
				'<p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p>' +
				"</div>"
		}
	});

	function escapeHtml(string) {
		var entityMap = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
			"/": "&#x2F;",
			"`": "&#x60;",
			"=": "&#x3D;"
		};
		return String(string).replace(/[&<>"'`=\/]/g, function(s) {
			return entityMap[s];
		});
	}
	$(document).on("click", "[data-fancybox-share]", function() {
		var instance = $.fancybox.getInstance(),
			current = instance.current || null,
			url,
			tpl;
		if (!current) {
			return;
		}
		if ($.type(current.opts.share.url) === "function") {
			url = current.opts.share.url.apply(current, [instance, current]);
		}
		tpl = current.opts.share.tpl
			.replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "")
			.replace(/\{\{url\}\}/g, encodeURIComponent(url))
			.replace(/\{\{url_raw\}\}/g, escapeHtml(url))
			.replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : "");
		$.fancybox.open({
			src: instance.translate(instance, tpl),
			type: "html",
			opts: {
				touch: false,
				animationEffect: false,
				afterLoad: function(shareInstance, shareCurrent) {
					// Close self if parent instance is closing
					instance.$refs.container.one("beforeClose.fb", function() {
						shareInstance.close(null, 0);
					});
					// Opening links in a popup window
					shareCurrent.$content.find(".fancybox-share__button").click(function() {
						window.open(this.href, "Share", "width=550, height=450");
						return false;
					});
				},
				mobile: {
					autoFocus: false
				}
			}
		});
	});
})(document, jQuery);
// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
(function(window, document, $) {
	"use strict";
	// Simple $.escapeSelector polyfill (for jQuery prior v3)
	if (!$.escapeSelector) {
		$.escapeSelector = function(sel) {
			var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
			var fcssescape = function(ch, asCodePoint) {
				if (asCodePoint) {
					// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
					if (ch === "\0") {
						return "\uFFFD";
					}
					// Control characters and (dependent upon position) numbers get escaped as code points
					return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
				}
				// Other potentially-special ASCII characters get backslash-escaped
				return "\\" + ch;
			};
			return (sel + "").replace(rcssescape, fcssescape);
		};
	}
	// Get info about gallery name and current index from url
	function parseUrl() {
		var hash = window.location.hash.substr(1),
			rez = hash.split("-"),
			index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1,
			gallery = rez.join("-");
		return {
			hash: hash,
			/* Index is starting from 1 */
			index: index < 1 ? 1 : index,
			gallery: gallery
		};
	}
	// Trigger click evnt on links to open new fancyBox instance
	function triggerFromUrl(url) {
		if (url.gallery !== "") {
			// If we can find element matching 'data-fancybox' atribute,
			// then triggering click event should start fancyBox
			$("[data-fancybox='" + $.escapeSelector(url.gallery) + "']")
				.eq(url.index - 1)
				.focus()
				.trigger("click.fb-start");
		}
	}
	// Get gallery name from current instance
	function getGalleryID(instance) {
		var opts, ret;
		if (!instance) {
			return false;
		}
		opts = instance.current ? instance.current.opts : instance.opts;
		ret = opts.hash || (opts.$orig ? opts.$orig.data("fancybox") || opts.$orig.data("fancybox-trigger") : "");
		return ret === "" ? false : ret;
	}
	// Start when DOM becomes ready
	$(function() {
		// Check if user has disabled this module
		if ($.fancybox.defaults.hash === false) {
			return;
		}
		// Update hash when opening/closing fancyBox
		$(document).on({
			"onInit.fb": function(e, instance) {
				var url, gallery;
				if (instance.group[instance.currIndex].opts.hash === false) {
					return;
				}
				url = parseUrl();
				gallery = getGalleryID(instance);
				// Make sure gallery start index matches index from hash
				if (gallery && url.gallery && gallery == url.gallery) {
					instance.currIndex = url.index - 1;
				}
			},
			"beforeShow.fb": function(e, instance, current, firstRun) {
				var gallery;
				if (!current || current.opts.hash === false) {
					return;
				}
				// Check if need to update window hash
				gallery = getGalleryID(instance);
				if (!gallery) {
					return;
				}
				// Variable containing last hash value set by fancyBox
				// It will be used to determine if fancyBox needs to close after hash change is detected
				instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : "");
				// If current hash is the same (this instance most likely is opened by hashchange), then do nothing
				if (window.location.hash === "#" + instance.currentHash) {
					return;
				}
				if (firstRun && !instance.origHash) {
					instance.origHash = window.location.hash;
				}
				if (instance.hashTimer) {
					clearTimeout(instance.hashTimer);
				}
				// Update hash
				instance.hashTimer = setTimeout(function() {
					if ("replaceState" in window.history) {
						window.history[firstRun ? "pushState" : "replaceState"]({},
							document.title,
							window.location.pathname + window.location.search + "#" + instance.currentHash
						);
						if (firstRun) {
							instance.hasCreatedHistory = true;
						}
					} else {
						window.location.hash = instance.currentHash;
					}
					instance.hashTimer = null;
				}, 300);
			},
			"beforeClose.fb": function(e, instance, current) {
				if (!current || current.opts.hash === false) {
					return;
				}
				clearTimeout(instance.hashTimer);
				// Goto previous history entry
				if (instance.currentHash && instance.hasCreatedHistory) {
					window.history.back();
				} else if (instance.currentHash) {
					if ("replaceState" in window.history) {
						window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || ""));
					} else {
						window.location.hash = instance.origHash;
					}
				}
				instance.currentHash = null;
			}
		});
		// Check if need to start/close after url has changed
		$(window).on("hashchange.fb", function() {
			var url = parseUrl(),
				fb = null;
			// Find last fancyBox instance that has "hash"
			$.each(
				$(".fancybox-container")
				.get()
				.reverse(),
				function(index, value) {
					var tmp = $(value).data("FancyBox");
					if (tmp && tmp.currentHash) {
						fb = tmp;
						return false;
					}
				}
			);
			if (fb) {
				// Now, compare hash values
				if (fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) {
					fb.currentHash = null;
					fb.close();
				}
			} else if (url.gallery !== "") {
				triggerFromUrl(url);
			}
		});
		// Check current hash and trigger click event on matching element to start fancyBox, if needed
		setTimeout(function() {
			if (!$.fancybox.getInstance()) {
				triggerFromUrl(parseUrl());
			}
		}, 50);
	});
})(window, document, jQuery);
// ==========================================================================
//
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================
(function(document, $) {
	"use strict";
	var prevTime = new Date().getTime();
	$(document).on({
		"onInit.fb": function(e, instance, current) {
			instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(e) {
				var current = instance.current,
					currTime = new Date().getTime();
				if (instance.group.length < 2 || current.opts.wheel === false || (current.opts.wheel === "auto" && current.type !== "image")) {
					return;
				}
				e.preventDefault();
				e.stopPropagation();
				if (current.$slide.hasClass("fancybox-animated")) {
					return;
				}
				e = e.originalEvent || e;
				if (currTime - prevTime < 250) {
					return;
				}
				prevTime = currTime;
				instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]();
			});
		}
	});
})(document, jQuery);
/*! jquery.cookie v1.4.1 | MIT */
! function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? a(require("jquery")) : a(jQuery)
}(function(a) {
	function b(a) {
		return h.raw ? a : encodeURIComponent(a)
	}

	function c(a) {
		return h.raw ? a : decodeURIComponent(a)
	}

	function d(a) {
		return b(h.json ? JSON.stringify(a) : String(a))
	}

	function e(a) {
		0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
		try {
			return a = decodeURIComponent(a.replace(g, " ")), h.json ? JSON.parse(a) : a
		} catch (b) {}
	}

	function f(b, c) {
		var d = h.raw ? b : e(b);
		return a.isFunction(c) ? c(d) : d
	}
	var g = /\+/g,
		h = a.cookie = function(e, g, i) {
			if (void 0 !== g && !a.isFunction(g)) {
				if (i = a.extend({}, h.defaults, i), "number" == typeof i.expires) {
					var j = i.expires,
						k = i.expires = new Date;
					k.setTime(+k + 864e5 * j)
				}
				return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
			}
			for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
				var p = m[n].split("="),
					q = c(p.shift()),
					r = p.join("=");
				if (e && e === q) {
					l = f(r, g);
					break
				}
				e || void 0 === (r = f(r)) || (l[q] = r)
			}
			return l
		};
	h.defaults = {}, a.removeCookie = function(b, c) {
		return void 0 === a.cookie(b) ? !1 : (a.cookie(b, "", a.extend({}, c, {
			expires: -1
		})), !a.cookie(b))
	}
});
/*
 * Cheg UI 3.0.0
 */
const app = {
	settings: {
		winWidth: 0,
		winHeight: 0,
		sbWidth: 0,
		scrollOffset: function() {
			return $('.header').outerHeight();
		},
		scrollPos: 0,
		popupOpened: false,
		scrollLockPos: 0,
		animDuration: 400,
		appLoaded: false,
		menuOpened: false,
	},
	deviceIs: device.device,
	/*
	 * Checking if matches media query
	 */
	matches(query) {
		return window.matchMedia(`(${query})`).matches
	},
	/*
	 * Scroll to hash on page laod
	 */
	toHash() {
		if (window.location.hash) {
			app.scrollTo(window.location.hash, {
				offset: app.settings.scrollOffset()
			});
			window.location.hash = '';
		}
	},
	/*
	 * Back/Forward
	 */
	history: {
		back() {},
		forward() {},
	},
	/*
	 * Intro
	 */
	intro(block) {
		let slider = block.find('.intro__slider'),
			sliderS,
			opts = {
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 500,
				// autoplay: {
				// 	delay:5000,
				// 	disableOnInteraction: false
				// },
				loop: true,
				parallax: true,
				init: true,
				grabCursor: true,
				pagination: {
					el: block.find('.ui-dots').get(0),
					clickable: true,
					bulletActiveClass: 'active',
					renderBullet: function(i, className) {
						return '<button class="ui-dots__item ' + className + '" type="button"></button>';
					}
				}
			};
		sliderS = new Swiper(slider.get(0), opts);
		block.data('introInit', true);
	},
	/*
	 * Try
	 */
	try (block) {
		let slider = block.find('.try__slider'),
			sliderS,
			opts = {
				slidesPerView: 1,
				spaceBetween: 30,
				speed: 500,
				loop: true,
				init: true,
				grabCursor: true,
				navigation: {
					nextEl: block.find('.ui-nav__item--n').get(0),
					prevEl: block.find('.ui-nav__item--p').get(0),
				},
				breakpoints: {
					1: {
						spaceBetween: 15,
						slidesPerView: 2,
					},
					400: {
						spaceBetween: 20,
						slidesPerView: 2,
					},
					768: {
						spaceBetween: 20,
						slidesPerView: 3,
					},
					1024: {
						spaceBetween: 20,
						slidesPerView: 4,
					},
					1280: {
						spaceBetween: 30,
						slidesPerView: 4,
					}
				}
			};
		sliderS = new Swiper(slider.get(0), opts);
		block.data('tryInit', true);
	},
	/*
	 * Catalog
	 */
	catalog(block) {
		let items = block.find('.catalog__list-item');
		items.on('mouseenter', function() {
			block.addClass('hover');
			$(this).addClass('hover');
		}).on('mouseleave', () => {
			block.removeClass('hover');
			items.removeClass('hover');
		});
		block.data('catalogInit', true);
	},
	/*
	 * Product
	 */
	product: {
		init(block) {
			let _this = this;
			_this.main(block);
			block.find('.product__gallery').each(function() {
				_this.gallery($(this));
			});
			block.data('productInit', true);
		},
		main(block) {
			let imgs = block.find('.product__imgs-item');
			imgs.each(function(i) {
				$(this).attr('id', 'img' + i);
				block.find('.product__vdots-in').append(`
					<button class="ui-dots__item" data-prod-scroll="#img${i}"></button>
				`);
			});
			let vDots = block.find('[data-prod-scroll]'),
				vDotsScr = false;
			vDots.on('click', function() {
				vDotsScr = true;
				let off = block.find('.product__back').outerHeight();
				vDots.removeClass('active');
				$(this).addClass('active');
				app.scrollTo($(this).attr('data-prod-scroll'), {
					offset: app.settings.scrollOffset() + off - 2
				});
				setTimeout(function() {
					vDotsScr = false;
				}, 1100);
			});
			$(window).on('scroll', function() {
				if (app.matches('min-width:600px') && !vDotsScr) {
					imgs.each(function() {
						let img = $(this),
							pos = img.offset().top;
						if (($(window).scrollTop() + $(window).height() * .5) > pos) {
							vDots.removeClass('active');
							block.find(`[data-prod-scroll="#${img.attr('id')}"`).addClass('active');
						}
					});
				}
			});
			let slider = block.find('.product__imgs'),
				sliderS,
				opts = {
					slidesPerView: 1,
					spaceBetween: 20,
					speed: 500,
					loop: true,
					autoHeight: true,
					init: true,
					grabCursor: true,
					pagination: {
						el: block.find('.product__hdots .ui-dots').get(0),
						clickable: true,
						bulletActiveClass: 'active',
						renderBullet: (i, className) => {
							return '<button class="ui-dots__item ' + className + '" type="button"></button>';
						}
					}
				},
				inited = false;
			$(window).on('resize', () => {
				if (app.matches('min-width:600px')) {
					if (inited) {
						sliderS.destroy(true);
						block.find('.product__imgs-list').removeClass('swiper-wrapper');
						block.find('.product__imgs-item').removeClass('swiper-slide');
						inited = false;
					}
				} else {
					if (!inited) {
						block.find('.product__imgs-list').addClass('swiper-wrapper');
						block.find('.product__imgs-item').addClass('swiper-slide');
						sliderS = new Swiper(slider.get(0), opts);
						inited = true;
					}
				}
			}).trigger('resize');
		},
		gallery(block) {
			let slider = block.find('.product__gallery-slider'),
				sliderS,
				opts = {
					slidesPerView: 1,
					spaceBetween: 0,
					speed: 500,
					loop: true,
					autoHeight: true,
					init: true,
					grabCursor: true,
					pagination: {
						el: block.find('.ui-dots').get(0),
						clickable: true,
						bulletActiveClass: 'active',
						renderBullet: (i, className) => {
							return '<button class="ui-dots__item ' + className + '" type="button"></button>';
						}
					}
				};
			sliderS = new Swiper(slider.get(0), opts);
		},
		review(rev) {
			let text = rev.find('.product__review-text'),
				more = rev.find('.product__review-more a');
			more.on('click', () => {
				rev.addClass('full');
			});
			$(window).on('resize', () => {
				if (!rev.hasClass('full')) {
					let css = window.getComputedStyle(text.get(0)),
						lines = +css.getPropertyValue('--lines'),
						lh = parseInt(css.getPropertyValue('line-height'));
					rev.addClass('sizing');
					if (text.outerHeight() > lines * lh) {
						rev.addClass('cut');
					} else {
						rev.removeClass('cut');
					}
					rev.removeClass('sizing');
				}
			});
			rev.data('reviewInit', true);
		}
	},
	/*
	 * Custom select
	 */
	select(block) {
		let sel = block.find('select');
		sel.styler({});
	},
	/*
	 * Category
	 */
	category(block) {
		let slider = block.find('.category__products-slider'),
			sliderS,
			opts = {
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 500,
				loop: true,
				parallax: true,
				init: true,
				grabCursor: true,
				pagination: {
					el: block.find('.ui-dots').get(0),
					clickable: true,
					bulletActiveClass: 'active',
					renderBullet: function(i, className) {
						return '<button class="ui-dots__item ' + className + '" type="button"></button>';
					}
				}
			};
		sliderS = new Swiper(slider.get(0), opts);
		block.data('categoryInit', true);
	},
	/*
	 * Buy
	 */
	buy(block) {
		let list = block.find('.buy__list'),
			map,
			inp = block.find('.buy__search input');
		$.each(buy, function(i) {
			let item = buy[i];
			list.append(`
				<div class="ui-grid__col buy__item" data-item="${i}">
					<div class="buy__item-name">
						${item.name}
					</div>
					<div class="buy__item-text">
						${item.text}
					</div>
				</div>
			`);
		});
		let items = block.find('.buy__item');
		items.on('click', function() {
			block.trigger('centerItem', [+$(this).attr('data-item')]);
		});
		inp.on('change input keyup paste', function() {
			let val = $(this).val().trim().toLowerCase();
			if (val && val !== '') {
				items.each(function(i) {
					let text = $(this).find('.buy__item-text').text().toLowerCase();
					if (!text.includes(val)) {
						$(this).addClass('hide');
					} else {
						$(this).removeClass('hide');
					}
				});
			} else {
				items.removeClass('hide');
				list.scrollTop(0);
			}
		});
		block.on('centerItem', (e, id) => {
			items.removeClass('active');
			block.find(`.buy__item[data-item="${id}"]`).addClass('active').get(0).scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start'
			});
		});
		let moveMap = () => {
			var moveX = app.matches('min-width:768px') ? 200 : 0
			var pixelCenter = map.getGlobalPixelCenter();
			pixelCenter = [
				pixelCenter[0] - moveX,
				pixelCenter[1]
			];
			var geoCenter = map.options.get('projection').fromGlobalPixels(pixelCenter, map.getZoom());
			// var geoCenter = map.options.get('projection').fromGlobalPixels(pixelCenter, map.getZoom());
			map.setCenter(geoCenter);
		}
		ymaps.ready(function() {
			map = new ymaps.Map(block.find('.buy__map').attr('id'), {
				center: buy[0].coords,
				zoom: 16,
				controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl']
			});
			$.each(buy, function(i) {
				var item = buy[i];
				var mapPlacemark = new ymaps.Placemark(item.coords, {
					hintContent: `
						<div class="buy__map-hint">
							<div>${item.text}</div>
						</div>
					`
				}, {
					preset: 'islands#darkOrangeCircleDotIcon',
					iconColor: '#000'
				});
				mapPlacemark.events.add('click', function(e) {
					block.trigger('centerItem', [i]);
				});
				block.on('centerItem', (e, id) => {
					if (id == i) {
						mapPlacemark.options.set({
							iconColor: '#E29B4E'
						});
					} else {
						mapPlacemark.options.set({
							iconColor: '#000'
						});
					}
				});
				map.geoObjects.add(mapPlacemark);
			});
			map.controls.add(new ymaps.control.ZoomControl({
				options: {
					position: {
						left: 'auto',
						right: 20,
						top: 60,
					},
					adjustMapMargin: true
				}
			}));
			//map.behaviors.disable('scrollZoom');
			if (buy.length > 1) {
				map.setBounds(map.geoObjects.getBounds());
				map.setZoom(map.getZoom() - 1);
			}
			moveMap();
			block.on('centerItem', (e, id) => {
				map.setCenter(buy[id].coords, 17);
				moveMap();
			});
		});
		block.data('buyInit', true);
	},
	lang: {
		yatranslate: {
			/* Original language */
			lang: 'ru',
			/* The language we translate into on the first visit */
			/* Язык, на который переводим при первом посещении */
			//langFirstVisit: 'ru',
			langFirstVisit: window.navigator.language.substring(0, 2)
		},
		init() {
			let _this = this;
			if (_this.yatranslate.langFirstVisit && !localStorage.getItem('yt-widget')) {
				/* Если установлен язык перевода для первого посещения и в localStorage нет yt-widget */
				/* If the translation language is installed for the first visit and in localStorage no yt-widget */
				_this.setLang(_this.yatranslate.langFirstVisit);
			}
			// Подключаем виджет yandex translate
			// Connecting the yandex translate widget
			let script = document.createElement('script');
			script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${_this.yatranslate.lang}&widgetTheme=light&autoMode=false`;
			document.getElementsByTagName('head')[0].appendChild(script);
			// Получаем и записываем язык на который переводим
			// We get and write down the language into which we translate
			let code = _this.getCode();
			// Показываем текущий язык в меню
			// Show the current language in the menu
			_this.htmlHandler(code);
			// Вешаем событие клик на флаги
			// We hang the event click on the flags
			_this.eventHandler('click', 'a[data-lang]', function(el) {
				_this.setLang(el.getAttribute('data-lang'));
				// Перезагружаем страницу
				// Reloading the page
				window.location.reload();
			});
			$('.header__lang-trigger').on('click', function() {
				$(this).closest('.header__lang').toggleClass('active');
			});
			$(document).on('click', (e) => {
				if (!$(e.target).closest('.header__lang').length) {
					$('.header__lang').removeClass('active');
				}
			});
		},
		setLang(lang) {
			// Записываем выбранный язык в localStorage объект yt-widget 
			// Writing the selected language to localStorage 
			localStorage.setItem('yt-widget', JSON.stringify({
				"lang": lang,
				"active": true
			}));
		},
		getCode() {
			let _this = this;
			// Возвращаем язык на который переводим
			// Returning the language to which we are translating
			return (localStorage["yt-widget"] != undefined && JSON.parse(localStorage["yt-widget"]).lang != undefined) ? JSON.parse(localStorage["yt-widget"]).lang : _this.yatranslate.lang;
		},
		htmlHandler(code) {
			// Получаем язык на который переводим и производим необходимые манипуляции с DOM
			// We get the language to which we translate and produce the necessary manipulations with DOM 
			let el = $(`.header__lang-item[data-lang="${code}"]`);
			$('.header__lang-trigger .header__lang-item').html(el.text());
			el.addClass('active');
		},
		eventHandler(event, selector, handler) {
			document.addEventListener(event, function(e) {
				let el = e.target.closest(selector);
				if (el) handler(el);
			});
		},
		googleTranslateConfig: {
			/* Original language */
			lang: "ru",
			/* The language we translate into on the first visit*/
			/* Язык, на который переводим при первом посещении */
			/* langFirstVisit: 'en', */
			/* Если скрипт не работает или работает неправильно, раскомментируйте и укажите основной домен в свойстве domain */
			/* If the script does not work or does not work correctly, uncomment and specify the main domain in the domain property */
			/* domain: "Get-Web.Site" */
		},
		TranslateWidgetIsLoaded() {
			let _this = this;
			_this.TranslateInit(_this.googleTranslateConfig)
		},
		googleTranslateLoad() {
			// let _this = this;
			// /* Подключаем виджет google translate */
			// /* Connecting the google translate widget */
			// let script = document.createElement('script');
			// script.src = `//translate.google.com/translate_a/element.js?cb=app.lang.TranslateInit(app.lang.googleTranslateConfig)`;
			// document.getElementsByTagName('head')[0].appendChild(script);
			// script.onload = () => {
			// 	console.log('loaded');
			// 	_this.TranslateInit(_this.googleTranslateConfig);
			// }
		},
		TranslateInit(config) {
			let _this = this;
			if (config.langFirstVisit && !$.cookie("googtrans")) {
				/* Если установлен язык перевода для первого посещения и куки не назначены */
				/* If the translation language is installed for the first visit and cookies are not assigned */
				_this.TranslateCookieHandler('/auto/' + config.langFirstVisit);
			}
			let code = _this.TranslateGetCode(config);
			_this.TranslateHtmlHandler(code);
			if (code == config.lang) {
				/* Если язык по умолчанию, совпадает с языком на который переводим, то очищаем куки */
				/* If the default language is the same as the language we are translating into, then we clear the cookies */
				_this.TranslateCookieHandler(null, config.domain);
			}
			/* Инициализируем виджет с языком по умолчанию */
			/* Initialize the widget with the default language */
			new google.translate.TranslateElement({
				pageLanguage: config.lang,
				multilanguagePage: true, // Your page contains content in more than one languages
			}, 'google_translate_element');
			/* Вешаем событие  клик на флаги */
			/* Assigning a handler to the flags */
			$('[data-lang]').on('click', function() {
				_this.TranslateCookieHandler(
					'/auto/' + $(this).attr('data-lang'),
					config.domain
				);
				/* Перезагружаем страницу */
				/* Reloading the page */
				window.location.reload();
			});
			$('.header__lang-trigger').on('click', function() {
				$(this).closest('.header__lang').toggleClass('active');
			});
		},
		TranslateGetCode(config) {
			let _this = this;
			/* Если куки нет, то передаем дефолтный язык */
			/* If there are no cookies, then we pass the default language */
			let lang =
				$.cookie("googtrans") != undefined && $.cookie("googtrans") != "null" ?
				$.cookie("googtrans") :
				config.lang;
			return lang.match(/(?!^\/)[^\/]*$/gm)[0];
		},
		TranslateCookieHandler(val, domain) {
			let _this = this;
			/* Записываем куки /язык_который_переводим/язык_на_который_переводим */
			/* Writing down cookies /language_for_translation/the_language_we_are_translating_into */
			$.cookie('googtrans', val, {
				domain: document.domain,
				path: '/'
			});
			$.cookie('googtrans', val, {
				domain: "." + document.domain,
				path: '/'
			});
			if (domain == 'undefined') return;
			/* записываем куки для домена, если он назначен в конфиге */
			/* Writing down cookies for the domain, if it is assigned in the config */
			$.cookie('googtrans', val, {
				domain: domain,
				path: '/'
			});
			$.cookie('googtrans', val, {
				domain: "." + domain,
				path: '/'
			});
		},
		TranslateHtmlHandler(code) {
			let _this = this;
			/* Получаем язык на который переводим и производим необходимые манипуляции с DOM */
			/* We get the language to which we translate and produce the necessary manipulations with DOM */
			$('[data-lang="' + code + '"]').addClass('active');
		}
	}
};
/*
	
 * Units
	
*/
app.units = {
	vh() {
		$('body').append('<div class="vh-fix" style="position:fixed;width:1px;left:-9999px;top:0;bottom:0;pointer-events:none;opacity:0;visibility:hidden;" />');
		let vh = $('.vh-fix').height() * 0.01;
		$('html').css('--vh', vh + 'px');
		$('.vh-fix').remove();
	},
	contW() {
		let contW = $('.container').not('.container--off').first().width();
		$('html').css('--cont-w-a', contW + 'px');
		$('.container--off').each(function() {
			let w = $(this).width();
			$(this).css('--cont-w-a', w + 'px');
		});
	},
	contOff() {
		let contOff = ($(window).width() - $('.container').not('.container--off').first().width()) / 2;
		$('html').css('--cont-off', contOff + 'px');
		$('.container--off').each(function() {
			let off = ($(window).width() - $(this).width()) / 2;
			$(this).css('--cont-off', off + 'px');
		});
	},
	sb() {
		let div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
		$('body').append(div);
		let w1 = $('div', div).innerWidth();
		div.css('overflow-y', 'scroll');
		let w2 = $('div', div).innerWidth();
		$(div).remove();
		let bodyHeight = parseInt($('.app').height());
		if (bodyHeight > app.settings.winHeight) {
			app.settings.sbWidth = w1 - w2;
		} else {
			app.settings.sbWidth = 0;
		}
		$('html').css('--sbW', app.settings.sbWidth + 'px');
	},
	all() {
		this.vh();
		this.mobile();
	},
	mobile() {
		this.contW();
		this.contOff();
		this.sb();
	}
}
/*

 * Scroll to element

*/
app.scrollTo = (id, options) => {
	if ($(id).length) {
		options = $.extend({
			offset: 0,
			speed: 1000
		}, options);
		let scrollPos = $(id).offset().top - options.offset;
		$('html, body').animate({
			scrollTop: scrollPos
		}, options.speed);
	}
}
/*

 * Tabs

*/
app.tabs = {
	init(tabs) {
		let pref = '.ui-tabs',
			itemSel = pref + '__item',
			items = tabs.find(itemSel),
			id = tabs.attr('data-tabs'),
			active = '';
		if (!tabs.find(itemSel + '.active').length || tabs.find(itemSel + '.active').length > 1) {
			items.removeClass('active');
			items.first().addClass('active');
		}
		items.on('click', function() {
			let item = $(this),
				tabId = item.attr('data-tab');
			items.removeClass('active');
			$(`${pref}-trigger[data-tabs="${id}"], ${pref}-content[data-tabs="${id}"]`).removeClass('active');
			item.addClass('active');
			$(`${pref}-trigger[data-tabs="${id}"][data-tab="${tabId}"], ${pref}-content[data-tabs="${id}"][data-tab="${tabId}"]`).addClass('active');
			active = tabId;
			// item.get(0).scrollIntoView({
			// 	behavior: 'smooth',
			// 	block: 'nearest',
			// });
			scrollIntoView(item.get(0), {
				inline: 'center',
				behavior: 'smooth',
				boundary: tabs.get(0),
			})
		});
		tabs.find(itemSel + '.active').trigger('click');
		tabs.data('tabsInit', true);
	},
	bind() {
		$(document).on('click', '.ui-tabs-trigger', function() {
			$(`.ui-tabs[data-tabs="${$(this).attr('data-tabs')}"]`)
				.find(`.ui-tabs__item[data-tab="${$(this).attr('data-tab')}"`)
				.trigger('click');
		});
	}
}
/*
 * Accordions
 */
app.accordions = (acc, options) => {
	// default options
	options = $.extend({
		initialized: false,
		collapsable: true,
		collapsed: false,
		connected: false,
		scrollToItem: false,
		scrollToItemWidth: 767,
		slideSpeed: app.settings.animDuration
	}, options);
	let pref = '.ui-accordion',
		itemsSel = pref + '__item',
		triggersSel = pref + '__trigger',
		panelsSel = pref + '__panel',
		items = acc.find(itemsSel),
		triggers = acc.find(triggersSel),
		panels = acc.find(panelsSel),
		itemF;
	const isNumber = (value) => {
		return typeof value === 'number' && isFinite(value);
	}
	// if it's disabled to close all items
	if (acc.attr('data-collapsable') == 'false') {
		options.collapsable = false;
	}
	// if all items collapsed by default
	if (acc.attr('data-collapsed') == 'true') {
		options.collapsed = true;
	}
	// if scroll-to-item disabled
	if (acc.attr('data-scrollToItem') == 'false') {
		options.scrollToItem = false;
	}
	// if scroll-to-item disabled
	if (acc.attr('data-scrollToItemWidth') && isNumber(+acc.attr('data-scrollToItemWidth'))) {
		options.scrollToItemWidth = +acc.attr('data-scrollToItemWidth');
	}
	// if connected blocks exist
	if (acc.attr('data-acc')) {
		options.connected = true;
	}
	// items positions for scroll-to-item
	const itemsPos = () => {
		panels.hide(0);
		items.each(function() {
			$(this).data('itemPos', ($(this).offset().top - app.settings.scrollOffset - 30));
		});
		acc.find(itemsSel + '.active')
			.first()
			.find(panelsSel)
			.show(0);
	}
	// open/close item
	const itemAction = (item, action) => {
		let slideSpeed = options.slideSpeed;
		if (!options.initialized) {
			slideSpeed = 0;
		} else {
			slideSpeed = options.slideSpeed;
		}
		if (action == 'open') {
			if (options.initialized && options.scrollToItem) {
				if (window.matchMedia('(max-width:' + (options.scrollToItemWidth) + 'px)').matches) {
					$('html, body').animate({
						scrollTop: item.data('itemPos')
					}, slideSpeed);
				}
			}
			items.removeClass('active');
			item.addClass('active');
			panels.slideUp(slideSpeed);
			item.find(panelsSel).slideDown(slideSpeed);
			/*if (options.connected) {
				var accID = acc.attr('data-acc'),
					itemID = item.attr('data-acc-item'),
					accCon = $('[data-acc-con="' + accID + '"]'),
					accConItems = accCon.find('[data-acc-con-item]');

				accConItems.removeClass('active');
				accCon.find('[data-acc-con-item="' + itemID + '"]').addClass('active');
			}*/
		} else {
			item.removeClass('active');
			panels.slideUp(slideSpeed);
		}
		if (!options.initialized) {
			options.initialized = true;
		}
	}
	// show default item
	if (!options.collapsed) {
		if (!acc.find(itemsSel + '.active').length || acc.find(itemsSel + '.active').length > 1) {
			items.removeClass('active');
			itemF = items.first();
		} else {
			itemF = acc.find(itemsSel + '.active');
		}
		itemAction(itemF, 'open');
	} else {
		options.initialized = true;
	}
	$(window).on('resize', function() {
		if (options.scrollToItem) {
			itemsPos();
		}
	});
	// clicking on trigger
	triggers.on('click', function() {
		let item = $(this).closest(itemsSel);
		if (!item.hasClass('active')) {
			itemAction(item, 'open');
		} else {
			if (options.collapsable) {
				itemAction(item, 'close');
			}
		}
	});
	$(window).trigger('resize');
	acc.data('accordionInit', true);
}
/*

 * Scroll lock

*/
app.scrollLock = (type) => {
	if (type == 'unlock') { // * unlock
		app.deviceIs.ios ? $(window).scrollTop(app.settings.scrollLockPos) : null;
		$('.app').removeClass('app--fixed');
		if (window.Lenis && typeof window.Lenis == 'function' && app.scroll.inited) {
			app.scroll.lenis.start();
		}
	} else { // * lock
		app.settings.scrollLockPos = $(window).scrollTop();
		$('.app').addClass('app--fixed');
		if (window.Lenis && typeof window.Lenis == 'function' && app.scroll.inited) {
			app.scroll.lenis.stop();
		}
	}
}
/*
 * Popups
 */
app.popups = {
	loaded: [],
	overlay: $('.popups-overlay'),
	bind() {
		let _this = this;
		// * Open popup
		$(document).on('click', '[data-popup]', function() {
			let id = $(this).attr('data-popup');
			if (!$(this).attr('data-popup-video')) {
				_this.open(id, {
					form: $(this).attr('data-popup-form') || '',
					ttl: $(this).attr('data-popup-header') || '',
					text: $(this).attr('data-popup-text') || '',
					btn: $(this).attr('data-popup-btn') || ''
				});
			} else {
				_this.video(id, {
					video: $(this).attr('data-popup-video')
				});
			}
		});
		// * Close popup clicking on cross
		$(document).on('click', '.popup__close, [data-popup-close]', function() {
			_this.close();
		});
		// * Close popup clicking outside popup
		$(document).on('click', '.popup', function(e) {
			if (!$(e.target).closest('.popup__content').length) {
				_this.close();
				e.stopPropagation();
			}
		});
		// * Close popup pressing ESC
		$(document).on('keyup', function(e) {
			if (e.key === 'Escape') {
				if (app.settings.popupOpened) {
					_this.close();
				}
			}
		});
	},
	// * Open popup
	open(id, opts) {
		let _this = this;
		if ($('#' + id).length) {
			$('.app').addClass('app--popup');
			app.scrollLock();
			$('.popup').removeClass('active');
			let popup = $('.popup#' + id);
			if (popup.attr('data-overlay')) {
				_this.overlay.css('--overlay-color', popup.attr('data-overlay'));
			}
			if (id == 'request') {
				let ttl = opts?.ttl ?
					opts.ttl :
					'Оставить заявку',
					text = opts?.text ?
					opts.text :
					'Оставьте заявку, и&nbsp;наш специалист свяжется с&nbsp;вами в&nbsp;ближайшее время',
					btn = opts?.btn ?
					opts.btn :
					'Отправить';
				popup.find('.popup-head__title').html(ttl);
				popup.find('.popup-head__subtitle').html(text);
				popup.find('.ui-btn__text').html(btn);
			}
			popup.scrollTop(0).addClass('active');
			app.settings.popupOpened = true;
		}
	},
	// * Open video popup
	video(id, opts) {
		let _this = this;
		_this.open(id);
		if ($('#' + id).length && opts?.video) {
			let popup = $('.popup#' + id);
			popup
				.find('.popup__video')
				.html(`<iframe src="${opts.video}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`);
		}
	},
	// * Load popup content
	load(id, url) {
		let _this = this;
		if (!_this.loaded.includes(url)) {
			$('#' + id).find('.popup__load').load(url, function(response, status, xhr) {
				if (status == 'error') {
					$('#' + id).find('.popup__load').html(`Ошибка: ${xhr.status} ${xhr.xhr}`)
				}
			});
			_this.loaded.push(url);
		}
		_this.open(id);
	},
	// * Close popups
	close() {
		let _this = this;
		$('.popup').removeClass('active');
		$('.app').removeClass('app--popup');
		setTimeout(function() {
			app.scrollLock('unlock');
			_this.overlay.css('--overlay-color', '');
		}, app.settings.animDuration);
		$('.popup__video').html('');
		app.settings.popupOpened = false;
	},
	// * TY popup
	thx(thx) {
		if (!thx) {
			thx = 'thx';
		}
		this.open(thx);
	},
	// * Init
	init(popup) {
		let mod = popup.attr('data-close') ? popup.attr('data-close') : '';
		popup.find('.popup__close-container')
			.prepend(`<div class="ui-crossbtn popup__close ${mod} noselect" />`);
		popup.data('popupsInit', true);
	}
}
/*

 * Menu

*/
app.menu = {
	// * Bind
	bind() {
		let _this = this;
		// * Click on burger
		$(document).on('click', '.ui-toggle', function() {
			!app.settings.menuOpened ? _this.open() : _this.close();
		});
	},
	// * Open menu
	open() {
		$('.app').addClass('app--menu');
		$('.search').removeClass('active');
		if (app.matches('max-width:1023px')) {
			app.scrollLock();
		}
		app.settings.menuOpened = true;
	},
	// * Close menu
	close() {
		$('.app').removeClass('app--menu');
		app.scrollLock('unlock');
		app.settings.menuOpened = false;
	}
}
/*

 * Waypoints

 */
app.waypoint = (opts) => {
	let _this = this,
		position = 0;
	opts = $.extend({
		position: 0,
		onDown: function() {},
		onUp: function() {}
	}, opts);
	$(window).on('resize', function() {
		if (typeof opts.position == 'function') {
			position = opts.position.call();
		} else {
			position = opts.position;
		}
	}).on('scroll', function() {
		if ($(window).scrollTop() > position) {
			if (typeof opts.onDown == 'function') {
				opts.onDown.call();
			}
		} else {
			if (typeof opts.onUp == 'function') {
				opts.onUp.call();
			}
		}
	}).trigger('resize').trigger('scroll');
}
/*

 * Checking if browser supports webp

 */
function testWebP(callback) {
	let webP = new Image();
	webP.onload = webP.onerror = function() {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function(support) {
	if (support == true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});
/*
 * Init
 */
app.init = () => {
	// * Units
	app.units.all();
	// * Tabs
	$('.ui-tabs').not('.custom').each(function() {
		if (!$(this).data('tabsInit')) {
			app.tabs.init($(this));
		}
	});
	app.tabs.bind();
	// * Popups
	$('.popup').each(function() {
		if (!$(this).data('popupsInit')) {
			app.popups.init($(this));
		}
	});
	app.popups.bind();
	// * Intro
	$('.intro').each(function() {
		if (!$(this).data('introInit')) {
			app.intro($(this));
		}
	});
	// * Try
	$('.try').each(function() {
		if (!$(this).data('tryInit')) {
			app.try($(this));
		}
	});
	// * Category
	$('.category__item').each(function() {
		if (!$(this).data('categoryInit')) {
			app.category($(this));
		}
	});
	// * Buy
	$('.buy__block').each(function() {
		if (!$(this).data('buyInit')) {
			app.buy($(this));
		}
	});
	// * Catalog
	$('.catalog__list').each(function() {
		if (!$(this).data('catalogInit')) {
			app.catalog($(this));
		}
	});
	// * Product
	$('.product').each(function() {
		if (!$(this).data('productInit')) {
			app.product.init($(this));
		}
	});
	// * Product reviews
	$('.product__review').each(function() {
		if (!$(this).data('reviewInit')) {
			app.product.review($(this));
		}
	});
	// * Custom select
	$('.ui-select').each(function() {
		if (!$(this).data('selectInit')) {
			app.select($(this));
		}
	});
}
app.deviceIs.addClasses(document.documentElement);
$.fancybox.defaults.backFocus = false;
$.fancybox.defaults.hash = false;
$.fancybox.defaults.beforeShow = () => {
	app.scrollLock();
};
$.fancybox.defaults.afterClose = () => {
	app.scrollLock('unlock');
};
(function() {
	app.deviceIs.touch ? $('html').addClass('touch') : $('html').addClass('no-touch');
	app.settings.winWidth = $(window).width();
	app.settings.winHeight = $(window).height();
	app.settings.scrollPos = $(window).scrollTop();
	// * Init
	app.init();
	app.lang.init();
	// app.lang.googleTranslateLoad();
	//app.popups.open('review-thx');
	// * Menu binds
	app.menu.bind();
	$(document).on('click', '.search-open', () => {
		let search = $('.search');
		if (!search.hasClass('active')) {
			search.addClass('active');
			search.find('.search__form-inp input').trigger('focus');
			app.settings.menuOpened ? app.menu.close() : null;
		} else {
			search.removeClass('active');
		}
	});
	if (app.deviceIs.desktop) {
		$(window).on('resize', function() {
			app.units.all();
		});
	} else {}
	if (app.deviceIs.mobile || app.deviceIs.tablet) {
		$(window).on('orientationchange', function() {
			app.units.vh();
		}).on('resize', function() {
			app.units.mobile();
		});
	}
	$(window).on('resize', function() {
		app.settings.winWidth = $(window).width();
		app.settings.winHeight = $(window).height();
		app.settings.scrollPos = $(window).scrollTop();
		app.settings.menuOpened ? app.menu.close() : null;
	}).on('scroll', function() {
		app.settings.scrollPos = $(window).scrollTop();
	}).trigger('resize').trigger('scroll');
	// * Scroll to element
	$(document).on('click', 'a[href^="#"], [data-scrollto]', function(e) {
		e.preventDefault();
		let el = $(this).attr('href') || $(this).attr('data-scrollto');
		app.scrollTo(el, {
			offset: app.settings.scrollOffset()
		});
	});
})(jQuery);
$(window).on('load', function() {
	setTimeout(function() {
		// * hide preloader
		$('.preloader').fadeOut(1000, function() {
			$(this).remove();
		});
		$('.app').addClass('app--loaded');
		app.settings.appLoaded = true;
		$(window)
			.trigger('app.loaded')
			.trigger('scroll')
			.trigger('resize');
	}, 300);
	// * Lenis scroll
	if (window.Lenis && typeof window.Lenis == 'function' && !app.scroll.inited) {
		app.scroll.init();
	}
	// * Scroll to hash on page laod
	app.toHash();
});