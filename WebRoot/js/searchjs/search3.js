/*!
 * jQuery JavaScript Library v1.8.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Sep 20 2012 21:13:05 GMT-0400 (Eastern Daylight Time)
 */
(function( window, undefined ) {
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,
	navigator = window.navigator,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Save a reference to some core methods
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

	// Used for detecting and trimming whitespace
	core_rnotwhite = /\S/,
	core_rspace = /\s+/,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	},

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context && context.nodeType ? context.ownerDocument || context : document );

					// scripts is true for back-compat
					selector = jQuery.parseHTML( match[1], doc, true );
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						this.attr.call( selector, context, true );
					}

					return jQuery.merge( this, selector );

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.8.2",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ),
			"slice", core_slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready, 1 );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ core_toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// scripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, scripts ) {
		var parsed;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			scripts = context;
			context = 0;
		}
		context = context || document;

		// Single tag
		if ( (parsed = rsingleTag.exec( data )) ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
		return jQuery.merge( [],
			(parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
	},

	parseJSON: function( data ) {
		if ( !data || typeof data !== "string") {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && core_rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var name,
			i = 0,
			length = obj.length,
			isObj = length === undefined || jQuery.isFunction( obj );

		if ( args ) {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.apply( obj[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( obj[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jQuery.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
				core_push.call( ret, arr );
			} else {
				jQuery.merge( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key,
			ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && jQuery.isFunction( value );

			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( jQuery( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}

			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
				}
			}

			chainable = 1;
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready, 1 );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.split( core_rspace ), function( _, flag ) {
		object[ flag ] = true;
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
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" && ( !options.unique || !self.has( arg ) ) ) {
								list.push( arg );
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
								function() {
									var returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								} :
								newDefer[ action ]
							);
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ] = list.fire
			deferred[ tuple[0] ] = list.fire;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		fragment,
		eventName,
		i,
		isSupported,
		clickFn,
		div = document.createElement("div");

	// Preliminary tests
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Can't get basic test support
	if ( !all || !all.length ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: ( document.compatMode === "CSS1Compat" ),

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", clickFn = function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent("onclick");
		div.detachEvent( "onclick", clickFn );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	input.setAttribute( "checked", "checked" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "name", "t" );

	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for ( i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, div, tds, marginDiv,
			divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// NOTE: To any future maintainer, we've window.getComputedStyle
		// because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. For more
			// info see bug #3333
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = document.createElement("div");
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			div.appendChild( marginDiv );
			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "block";
			div.style.overflow = "visible";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			container.style.zoom = 1;
		}

		// Null elements to avoid leaks in IE
		body.removeChild( container );
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	fragment.removeChild( div );
	all = a = select = opt = input = fragment = div = null;

	return support;
})();
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	deletedIds: [],

	// Remove at next major release (1.9/2.0)
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = jQuery.deletedIds.pop() || jQuery.guid++;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, part, attr, name, l,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attr = elem.attributes;
					for ( l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split( ".", 2 );
		parts[1] = parts[1] ? "." + parts[1] : "";
		part = parts[1] + "!";

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				data = this.triggerHandler( "getData" + part, [ parts[0] ] );

				// Try to fetch any internally stored data first
				if ( data === undefined && elem ) {
					data = jQuery.data( elem, key );
					data = dataAttr( elem, key, data );
				}

				return data === undefined && parts[1] ?
					this.data( parts[0] ) :
					data;
			}

			parts[1] = value;
			this.each(function() {
				var self = jQuery( this );

				self.triggerHandler( "setData" + part, parts );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + part, parts );
			});
		}, null, value, arguments.length > 1, null, false );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery.removeData( elem, type + "queue", true );
				jQuery.removeData( elem, key, true );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook, fixSpecified,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea|)$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( setClass.indexOf( " " + classNames[ c ] + " " ) < 0 ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var removes, className, elem, c, cl, i, l;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}
		if ( (value && typeof value === "string") || value === undefined ) {
			removes = ( value || "" ).split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];
				if ( elem.nodeType === 1 && elem.className ) {

					className = (" " + elem.className + " ").replace( rclass, " " );

					// loop over each item in the removal list
					for ( c = 0, cl = removes.length; c < cl; c++ ) {
						// Remove until there is nothing to remove,
						while ( className.indexOf(" " + removes[ c ] + " ") >= 0 ) {
							className = className.replace( " " + removes[ c ] + " " , " " );
						}
					}
					elem.className = value ? jQuery.trim( className ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( core_rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	// Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
	attrFn: {},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {

			attrNames = value.split( core_rspace );

			for ( ; i < attrNames.length; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.value = value + "" );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var t, tns, type, origType, namespaces, origCount,
			j, events, special, eventType, handleObj,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, "events", true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
			type = event.type || event,
			namespaces = [];

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			for ( old = elem; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old === (elem.ownerDocument || document) ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
			handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = core_slice.call( arguments ),
			run_all = !event.exclusive && !event.namespace,
			special = jQuery.event.special[ event.type ] || {},
			handlerQueue = [];

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers that should run if there are delegated events
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !(event.button && event.type === "click") ) {

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					selMatch = {};
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector;

						if ( selMatch[ sel ] === undefined ) {
							selMatch[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( selMatch[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, matches: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
		event.metaKey = !!event.metaKey;

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8 鈥�
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "_submit_attached" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "_submit_attached", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "_change_attached", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) { // && selector != null
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
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
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var cachedruns,
	assertGetIdNotName,
	Expr,
	getText,
	isXML,
	contains,
	compile,
	sortOrder,
	hasDuplicate,
	outermostContext,

	baseHasDuplicate = true,
	strundefined = "undefined",

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	Token = String,
	document = window.document,
	docElem = document.documentElement,
	dirruns = 0,
	done = 0,
	pop = [].pop,
	push = [].push,
	slice = [].slice,
	// Use a stripped-down indexOf if a native one is unavailable
	indexOf = [].indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	// Augment a function for special use by Sizzle
	markFunction = function( fn, value ) {
		fn[ expando ] = value == null || value;
		return fn;
	},

	createCache = function() {
		var cache = {},
			keys = [];

		return markFunction(function( key, value ) {
			// Only keep the most recent entries
			if ( keys.push( key ) > Expr.cacheLength ) {
				delete cache[ keys.shift() ];
			}

			return (cache[ key ] = value);
		}, cache );
	},

	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments not in parens/brackets,
	//   then attribute selectors and non-pseudos (denoted by :),
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

	// For matchExpr.POS and matchExpr.needsContext
	pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
		"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rnot = /^:not/,
	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"POS": new RegExp( pos, "i" ),
		"CHILD": new RegExp( "^:(only|nth|first|last)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	// Support

	// Used for testing something on an element
	assert = function( fn ) {
		var div = document.createElement("div");

		try {
			return fn( div );
		} catch (e) {
			return false;
		} finally {
			// release memory in IE
			div = null;
		}
	},

	// Check if getElementsByTagName("*") returns only elements
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

function Sizzle( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed, xml );
}

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
contains = Sizzle.contains = docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	docElem.compareDocumentPosition ?
	function( a, b ) {
		return b && !!( a.compareDocumentPosition( b ) & 16 );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

Sizzle.attr = function( elem, name ) {
	var val,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( xml || assertAttributes ) {
		return elem.getAttribute( name );
	}
	val = elem.getAttributeNode( name );
	return val ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			val.specified ? val.value : null :
		null;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	// IE6/7 return a modified href
	attrHandle: assertHrefNotNormalized ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		},

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			},

		"NAME": assertUsableName && function( tag, context ) {
			if ( typeof context.getElementsByName !== strundefined ) {
				return context.getElementsByName( name );
			}
		},

		"CLASS": assertUsableClassName && function( className, context, xml ) {
			if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
				return context.getElementsByClassName( className );
			}
		}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var unquoted, excess;
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			if ( match[3] ) {
				match[2] = match[3];
			} else if ( (unquoted = match[4]) ) {
				// Only check arguments that contain a pseudo
				if ( rpseudo.test(unquoted) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					unquoted = unquoted.slice( 0, excess );
					match[0] = match[0].slice( 0, excess );
				}
				match[2] = unquoted;
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ expando ][ className ];
			if ( !pattern ) {
				pattern = classCache( className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)") );
			}
			return function( elem ) {
				return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
			};
		},

		"ATTR": function( name, operator, check ) {
			return function( elem, context ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.substr( result.length - check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				return function( elem ) {
					var node, diff,
						parent = elem.parentNode;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					if ( parent ) {
						diff = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								diff++;
								if ( elem === node ) {
									break;
								}
							}
						}
					}

					// Incorporate the offset (or cast to NaN), then check against cycle size
					diff -= last;
					return diff === first || ( diff % first === 0 && diff / first >= 0 );
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputPseudo("radio"),
		"checkbox": createInputPseudo("checkbox"),
		"file": createInputPseudo("file"),
		"password": createInputPseudo("password"),
		"image": createInputPseudo("image"),

		"submit": createButtonPseudo("submit"),
		"reset": createButtonPseudo("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		},

		// Positional types
		"first": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = 0; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = 1; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

function siblingCheck( a, b, ret ) {
	if ( a === b ) {
		return ret;
	}

	var cur = a.nextSibling;

	while ( cur ) {
		if ( cur === b ) {
			return -1;
		}

		cur = cur.nextSibling;
	}

	return 1;
}

sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	} :
	function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
[0, 0].sort( sortOrder );
baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		i = 1;

	hasDuplicate = baseHasDuplicate;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				results.splice( i--, 1 );
			}
		}
	}

	return results;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type, soFar, groups, preFilters,
		cached = tokenCache[ expando ][ selector ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				soFar = soFar.slice( match[0].length );
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			tokens.push( matched = new Token( match.shift() ) );
			soFar = soFar.slice( matched.length );

			// Cast descendant combinators to space
			matched.type = match[0].replace( rtrim, " " );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				// The last two arguments here are (context, xml) for backCompat
				(match = preFilters[ type ]( match, document, true ))) ) {

				tokens.push( matched = new Token( match.shift() ) );
				soFar = soFar.slice( matched.length );
				matched.type = type;
				matched.matches = match;
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && combinator.dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( checkNonElements || elem.nodeType === 1  ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( !xml ) {
				var cache,
					dirkey = dirruns + " " + doneName + " ",
					cachedkey = dirkey + cachedruns;
				while ( (elem = elem[ dir ]) ) {
					if ( checkNonElements || elem.nodeType === 1 ) {
						if ( (cache = elem[ expando ]) === cachedkey ) {
							return elem.sizset;
						} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
							if ( elem.sizset ) {
								return elem;
							}
						} else {
							elem[ expando ] = cachedkey;
							if ( matcher( elem, context, xml ) ) {
								elem.sizset = true;
								return elem;
							}
							elem.sizset = false;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( checkNonElements || elem.nodeType === 1 ) {
						if ( matcher( elem, context, xml ) ) {
							return elem;
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		// Positional selectors apply to seed elements, so it is invalid to follow them with relative ones
		if ( seed && postFinder ) {
			return;
		}

		var i, elem, postFilterIn,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [], seed ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			postFilterIn = condense( matcherOut, postMap );
			postFilter( postFilterIn, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = postFilterIn.length;
			while ( i-- ) {
				if ( (elem = postFilterIn[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		// Keep seed and results synchronized
		if ( seed ) {
			// Ignore postFinder because it can't coexist with seed
			i = preFilter && matcherOut.length;
			while ( i-- ) {
				if ( (elem = matcherOut[i]) ) {
					seed[ preMap[i] ] = !(results[ preMap[i] ] = elem);
				}
			}
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			// The concatenated values are (context, xml) for backCompat
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && tokens.slice( 0, i - 1 ).join("").replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && tokens.join("")
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Nested matchers should use non-integer dirruns
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = superMatcher.el;
			}

			// Add elements passing elementMatchers directly to results
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++superMatcher.el;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				for ( j = 0; (matcher = setMatchers[j]); j++ ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	superMatcher.el = 0;
	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ expando ][ selector ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results, seed ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results, seed );
	}
	return results;
}

function select( selector, context, results, seed, xml ) {
	var i, tokens, token, type, find,
		match = tokenize( selector ),
		j = match.length;

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !xml &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( rbackslash, "" ), context, xml )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().length );
			}

			// Fetch a seed set for right-to-left matching
			for ( i = matchExpr["POS"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( rbackslash, "" ),
						rsibling.test( tokens[0].type ) && context.parentNode || context,
						xml
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && tokens.join("");
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		xml,
		results,
		rsibling.test( selector )
	);
	return results;
}

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

			// qSa(:focus) reports false when true (Chrome 21),
			// A support test would require too much code (would include document ready)
			rbuggyQSA = [":focus"],

			// matchesSelector(:focus) reports false when true (Chrome 21),
			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [ ":active", ":focus" ],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'/>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		// rbuggyQSA always contains :focus, so no need for a length check
		rbuggyQSA = /* rbuggyQSA.length && */ new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				var groups, i,
					old = true,
					nid = expando,
					newContext = context,
					newSelector = context.nodeType === 9 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + groups[i].join("");
					}
					newContext = rsibling.test( selector ) && context.parentNode || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							newSelector
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( "!=", pseudos );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active and :focus, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && (!rbuggyQSA || !rbuggyQSA.test( expr )) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Back-compat
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, l, length, n, r, ret,
			self = this;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		ret = this.pushStack( "", "find", selector );

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rcheckableType = /^(?:checkbox|radio)$/,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "X<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
		}
	},

	after: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( elem.getElementsByTagName( "*" ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		if ( !isDisconnected( this[0] ) ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		}

		return this.length ?
			this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
			this;
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = [].concat.apply( [], args );

		var results, first, fragment, iNoClone,
			i = 0,
			value = args[0],
			scripts = [],
			l = this.length;

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call( this, i, table ? self.html() : undefined );
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			results = jQuery.buildFragment( args, this, scripts );
			fragment = results.fragment;
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				// Fragments from the fragment cache must always be cloned and never used in place.
				for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						i === iNoClone ?
							fragment :
							jQuery.clone( fragment, true, true )
					);
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;

			if ( scripts.length ) {
				jQuery.each( scripts, function( i, elem ) {
					if ( elem.src ) {
						if ( jQuery.ajax ) {
							jQuery.ajax({
								url: elem.src,
								type: "GET",
								dataType: "script",
								async: false,
								global: false,
								"throws": true
							});
						} else {
							jQuery.error("no ajax");
						}
					} else {
						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
					}

					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				});
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	if ( nodeName === "object" ) {
		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;

	// IE blanks contents when cloning scripts
	} else if ( nodeName === "script" && dest.text !== src.text ) {
		dest.text = src.text;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, context, scripts ) {
	var fragment, cacheable, cachehit,
		first = args[ 0 ];

	// Set context from what may come in as undefined or a jQuery collection or a node
	// Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
	// also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
	context = context || document;
	context = !context.nodeType && context[0] || context;
	context = context.ownerDocument || context;

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		// Mark cacheable and look for a hit
		cacheable = true;
		fragment = jQuery.fragments[ first ];
		cachehit = fragment !== undefined;
	}

	if ( !fragment ) {
		fragment = context.createDocumentFragment();
		jQuery.clean( args, context, fragment, scripts );

		// Update the cache, but only store false
		// unless this is a second parsing of the same content
		if ( cacheable ) {
			jQuery.fragments[ first ] = cachehit && fragment;
		}
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			l = insert.length,
			parent = this.length === 1 && this[0].parentNode;

		if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
			insert[ original ]( this[0] );
			return this;
		} else {
			for ( ; i < l; i++ ) {
				elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			clone;

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
			safe = context === document && safeFragment,
			ret = [];

		// Ensure that context is a document
		if ( !context || typeof context.createDocumentFragment === "undefined" ) {
			context = document;
		}

		// Use the already-created safe fragment if context permits
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Ensure a safe container in which to render the html
					safe = safe || createSafeFragment( context );
					div = context.createElement("div");
					safe.appendChild( div );

					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Go to html and back, then peel off extra wrappers
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					depth = wrap[0];
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						hasBody = rtbody.test(elem);
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;

					// Take out of fragment container (we need a fresh div each time)
					div.parentNode.removeChild( div );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				jQuery.merge( ret, elem );
			}
		}

		// Fix #11356: Clear elements from safeFragment
		if ( div ) {
			elem = div = safe = null;
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					fixDefaultChecked( elem );
				} else if ( typeof elem.getElementsByTagName !== "undefined" ) {
					jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
				}
			}
		}

		// Append elements to a provided document fragment
		if ( fragment ) {
			// Special handling of each script element
			handleScript = function( elem ) {
				// Check if we consider it executable
				if ( !elem.type || rscriptType.test( elem.type ) ) {
					// Detach the script and store it in the scripts array (if provided) or the fragment
					// Return truthy to indicate that it has been handled
					return scripts ?
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
						fragment.appendChild( elem );
				}
			};

			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				// Check if we're done after handling an executable script
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
					// Append to fragment and handle embedded scripts
					fragment.appendChild( elem );
					if ( typeof elem.getElementsByTagName !== "undefined" ) {
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

						// Splice the scripts into ret after their former ancestor and advance our index beyond them
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						i += jsTags.length;
					}
				}
			}
		}

		return ret;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( elem.removeAttribute ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						jQuery.deletedIds.push( id );
					}
				}
			}
		}
	}
});
// Limit scope pollution from any deprecated API
(function() {

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
	browser.webkit = true;
} else if ( browser.webkit ) {
	browser.safari = true;
}

jQuery.browser = browser;

jQuery.sub = function() {
	function jQuerySub( selector, context ) {
		return new jQuerySub.fn.init( selector, context );
	}
	jQuery.extend( true, jQuerySub, this );
	jQuerySub.superclass = this;
	jQuerySub.fn = jQuerySub.prototype = this();
	jQuerySub.fn.constructor = jQuerySub;
	jQuerySub.sub = this.sub;
	jQuerySub.fn.init = function init( selector, context ) {
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
			context = jQuerySub( context );
		}

		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	};
	jQuerySub.fn.init.prototype = jQuerySub.fn;
	var rootjQuerySub = jQuerySub(document);
	return jQuerySub;
};

})();
var curCSS, iframe, iframeDoc,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
	elemdisplay = {},

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

	eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem, display,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {
			display = curCSS( elem, "display" );

			if ( !values[ index ] && display !== "none" ) {
				jQuery._data( elem, "olddisplay", display );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state, fn2 ) {
		var bool = typeof state === "boolean";

		if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
			return eventsToggle.apply( this, arguments );
		}

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, numeric, extra ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( numeric || extra !== undefined ) {
			num = parseFloat( val );
			return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: To any future maintainer, we've window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	curCSS = function( elem, name ) {
		var ret, width, minWidth, maxWidth,
			computed = window.getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			ret = computed[ name ];
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	curCSS = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			// we use jQuery.css instead of curCSS here
			// because of the reliableMarginRight CSS hook!
			val += jQuery.css( elem, extra + cssExpand[ i ], true );
		}

		// From this point on we use curCSS for maximum performance (relevant in animations)
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		valueIsBorderBox = true,
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox
		)
	) + "px";
}


// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	if ( elemdisplay[ nodeName ] ) {
		return elemdisplay[ nodeName ];
	}

	var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
		display = elem.css("display");
	elem.remove();

	// If the simple way fails,
	// get element's real default display by attaching it to a temp iframe
	if ( display === "none" || display === "" ) {
		// Use the already-created iframe if possible
		iframe = document.body.appendChild(
			iframe || jQuery.extend( document.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			})
		);

		// Create a cacheable copy of the iframe document on first call.
		// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
		// document to it; WebKit & Firefox won't allow reusing the iframe document.
		if ( !iframeDoc || !iframe.createElement ) {
			iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
			iframeDoc.write("<!doctype html><html><body>");
			iframeDoc.close();
		}

		elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

		display = curCSS( elem, "display" );
		document.body.removeChild( iframe );
	}

	// Store the correct default display
	elemdisplay[ nodeName ] = display;

	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, "display" ) ) ) {
					return jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					});
				} else {
					return getWidthOrHeight( elem, name, extra );
				}
			}
		},

		set: function( elem, value, extra ) {
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
				style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						return curCSS( elem, "marginRight" );
					}
				});
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						var ret = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i,

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ],
				expanded = {};

			for ( i = 0; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rselectTextarea = /^(?:select|textarea)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

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
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
			i = 0,
			length = dataTypes.length;

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var selection,
		list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters );

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	// Don't do a request if no elements are being requested
	if ( !this.length ) {
		return this;
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// Request the remote document
	jQuery.ajax({
		url: url,

		// if "type" variable is undefined, then "GET" method will be used
		type: type,
		dataType: "html",
		data: params,
		complete: function( jqXHR, status ) {
			if ( callback ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			}
		}
	}).done(function( responseText ) {

		// Save response for use in complete callback
		response = arguments;

		// See if a selector was specified
		self.html( selector ?

			// Create a dummy div to hold the results
			jQuery("<div>")

				// inject the contents of the document in, removing the scripts
				// to avoid any 'Permission Denied' errors in IE
				.append( responseText.replace( rscript, "" ) )

				// Locate the specified elements
				.find( selector ) :

			// If not, just inject the full result
			responseText );

	});

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		processData: true,
		async: true,
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
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // ifModified key
			ifModifiedKey,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || strAbort;
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ ifModifiedKey ] = modified;
					}
					modified = jqXHR.getResponseHeader("Etag");
					if ( modified ) {
						jQuery.etag[ ifModifiedKey ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.always( tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() ) || false;
			s.crossDomain = parts && ( parts.join(":") + ( parts[ 3 ] ? "" : parts[ 1 ] === "http:" ? 80 : 443 ) ) !==
				( ajaxLocParts.join(":") + ( ajaxLocParts[ 3 ] ? "" : ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) );
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();

		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ],
		converters = {},
		i = 0;

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
var oldCallbacks = [],
	rquestion = /\?/,
	rjsonp = /(=)\?(?=&|$)|\?\?/,
	nonce = jQuery.now();

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		data = s.data,
		url = s.url,
		hasCallback = s.jsonp !== false,
		replaceInUrl = hasCallback && rjsonp.test( url ),
		replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
			!( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
			rjsonp.test( data );

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		overwritten = window[ callbackName ];

		// Insert callback into url or form data
		if ( replaceInUrl ) {
			s.url = url.replace( rjsonp, "$1" + callbackName );
		} else if ( replaceInData ) {
			s.data = data.replace( rjsonp, "$1" + callbackName );
		} else if ( hasCallback ) {
			s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});
var xhrCallbacks,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									try {
										responses.text = xhr.responseText;
									} catch( _ ) {
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback, 0 );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	}, 0 );
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		index = 0,
		tweenerIndex = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				percent = 1 - ( remaining / animation.duration || 0 ),
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end, easing ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			anim: animation,
			queue: animation.opts.queue,
			elem: elem
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	var index, prop, value, length, dataShow, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery.removeData( elem, "fxshow", true );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing any value as a 4th parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, false, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ||
			// special check for .toggle( handler, handler, ... )
			( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations resolve immediately
				if ( empty ) {
					anim.stop( true );
				}
			};

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.interval = 13;

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
var rroot = /^(?:body|html)$/i;

jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	if ( (body = doc.body) === elem ) {
		return jQuery.offset.bodyOffset( elem );
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== "undefined" ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	clientTop  = docElem.clientTop  || body.clientTop  || 0;
	clientLeft = docElem.clientLeft || body.clientLeft || 0;
	scrollTop  = win.pageYOffset || docElem.scrollTop;
	scrollLeft = win.pageXOffset || docElem.scrollLeft;
	return {
		top: box.top  + scrollTop  - clientTop,
		left: box.left + scrollLeft - clientLeft
	};
};

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.body;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					 top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, value, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
jQuery.cookie=function(d,e,b){if(arguments.length>1&&(e===null||typeof e!=="object")){b=jQuery.extend({},b);if(e===null){b.expires=-1}if(typeof b.expires==="number"){var g=b.expires,c=b.expires=new Date();c.setDate(c.getDate()+g)}return(document.cookie=[encodeURIComponent(d),"=",b.raw?String(e):encodeURIComponent(String(e)),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join(""))}b=e||{};var a,f=b.raw?function(h){return h}:decodeURIComponent;return(a=new RegExp("(?:^|; )"+encodeURIComponent(d)+"=([^;]*)").exec(document.cookie))?f(a[1]):null};
jQuery.fn.pagination=function(a,b){b=jQuery.extend({items_per_page:10,num_display_entries:10,current_page:0,num_edge_entries:0,link_to:"#",prev_text:"Prev",next_text:"Next",ellipse_text:"...",prev_show_always:true,next_show_always:true,callback:function(){return false}},b||{});return this.each(function(){function f(){return Math.ceil(a/b.items_per_page)}function h(){var k=Math.ceil(b.num_display_entries/2);var l=f();var j=l-b.num_display_entries;var m=g>k?Math.max(Math.min(g-k,j),0):0;var i=g>k?Math.min(g+k,l):Math.min(b.num_display_entries,l);return[m,i]}function e(j,i){g=j;c();var k=b.callback(j,d);if(!k){if(i.stopPropagation){i.stopPropagation()}else{i.cancelBubble=true}}return k}function c(){d.empty();var k=h();var o=f();var p=function(i){return function(q){return e(i,q)}};var n=function(i,q){i=i<0?0:(i<o?i:o-1);q=jQuery.extend({text:i+1,classes:""},q||{});if(i==g){var r=jQuery("<span class='current'>"+(q.text)+"</span>")}else{var r=jQuery("<a>"+(q.text)+"</a>").bind("click",p(i)).attr("href",b.link_to.replace(/__id__/,i))}if(q.classes){r.addClass(q.classes)}d.append(r)};if(b.prev_text&&(g>0||b.prev_show_always)){n(g-1,{text:b.prev_text,classes:"prev"})}if(k[0]>0&&b.num_edge_entries>0){var j=Math.min(b.num_edge_entries,k[0]);for(var l=0;l<j;l++){n(l)}if(b.num_edge_entries<k[0]&&b.ellipse_text){jQuery("<span>"+b.ellipse_text+"</span>").appendTo(d)}}for(var l=k[0];l<k[1];l++){n(l)}if(k[1]<o&&b.num_edge_entries>0){if(o-b.num_edge_entries>k[1]&&b.ellipse_text){jQuery("<span>"+b.ellipse_text+"</span>").appendTo(d)}var m=Math.max(o-b.num_edge_entries,k[1]);for(var l=m;l<o;l++){n(l)}}if(b.next_text&&(g<o-1||b.next_show_always)){n(g+1,{text:b.next_text,classes:"next"})}}var g=b.current_page;a=(!a||a<0)?1:a;b.items_per_page=(!b.items_per_page||b.items_per_page<0)?1:b.items_per_page;var d=jQuery(this);this.selectPage=function(i){e(i)};this.prevPage=function(){if(g>0){e(g-1);return true}else{return false}};this.nextPage=function(){if(g<f()-1){e(g+1);return true}else{return false}};c()})};
/*
 * $Id: ued-core.js,v 1.27 2012/06/19 08:40:21 licongping Exp $
 * operamasks-ui ued-core 2.0
 *
 * Copyright 2011, AUTHORS.txt (http://ui.operamasks.org/about)
 * Dual licensed under the MIT or LGPL Version 2 licenses.
 * http://ui.operamasks.org/license
 *
 * http://ui.operamasks.org/docs/
 */
(function( $, undefined ) {
// prevent duplicate loading
// this is only a problem because we proxy existing functions
// and we don't want to double proxy them
$.uedWidget = $.ued || {};


$.extend( $.ued, {
	version: "2.0",
	keyCode: {
	    TAB: 9,
	    ENTER: 13,
	    ESCAPE: 27,
	    SPACE: 32,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40
	},
	lang : {
		// 鑾峰彇灞炴€х殑鍥介檯鍖栧瓧绗︿覆锛屽鏋滅粍浠剁殑options涓凡缁忚缃繖涓€煎氨鐩存帴浣跨敤锛屽惁鍒欎粠$.ued.lang[comp]涓幏鍙�
		_get : function(options, comp, attr){
			return options[attr] ? options[attr] : $.ued.lang[comp][attr]; 
		}
	}
});
// plugins
$.fn.extend({
	propAttr: $.fn.prop || $.fn.attr,
	_oldFocus: $.fn.focus,//涓洪伩鍏嶄笌jQuery ui鍐茬獊瀵艰嚧姝诲惊鐜紝杩欓噷涓嶈鍙栧悕涓�'_focus'
	//璁剧疆鍏冪礌鐒︾偣锛坉elay锛氬欢杩熸椂闂达級
	focus: function( delay, fn ) {
		return typeof delay === "number" ?
			this.each(function() {
				var elem = this;
				setTimeout(function() {
					$( elem ).focus();
					if ( fn ) {
						fn.call( elem );
					}
				}, delay );
			}) :
			this._oldFocus.apply( this, arguments );
	},
	//鑾峰彇璁剧疆婊氬姩灞炴€х殑 鐖跺厓绱 
	scrollParent: function() {
		var scrollParent;
		if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.curCSS(this,'position',1)) && (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		}
		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	},
	//璁剧疆鎴栬幏鍙栧厓绱犵殑鍨傜洿鍧愭爣
	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}
		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}
		return 0;
	},
	//璁剧疆鍏冪礌涓嶆敮鎸佽閫夋嫨
	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ued-disableSelection", function( event ) {
				event.preventDefault();
			});
	},
	//璁剧疆鍏冪礌鏀寔琚€夋嫨
	enableSelection: function() {
		return this.unbind( ".ued-disableSelection" );
	}
});
// 鎵╁睍innerWidth銆乮nnerHeight銆乷uterWidth鍜宱uterHeight鏂规硶锛屽鏋滀笉浼犲弬鍒欒幏鍙栧€硷紝濡傛灉浼犲弬鍒欒缃绠楀悗鐨勫楂樸€�
$.each( [ "Width", "Height" ], function( i, name ) {
	var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
		type = name.toLowerCase(),
		orig = {
			innerWidth: $.fn.innerWidth,
			innerHeight: $.fn.innerHeight,
			outerWidth: $.fn.outerWidth,
			outerHeight: $.fn.outerHeight
		};

	function reduce( elem, size, border, margin ) {
		$.each( side, function() {
			size -= parseFloat( $.curCSS( elem, "padding" + this, true) ) || 0;
			if ( border ) {
				size -= parseFloat( $.curCSS( elem, "border" + this + "Width", true) ) || 0;
			}
			if ( margin ) {
				size -= parseFloat( $.curCSS( elem, "margin" + this, true) ) || 0;
			}
		});
		return size;
	}

	$.fn[ "inner" + name ] = function( size ) {
		if ( size === undefined ) {
			// 杩斿洖innerWidth/innerHeight
			return orig[ "inner" + name ].call( this );
		}
		return this.each(function() {
			// 璁剧疆瀹藉害/楂樺害 = (size - padding)
			$( this ).css( type, reduce( this, size ) + "px" );
		});
	};

	$.fn[ "outer" + name] = function( size, margin ) {
		if ( typeof size !== "number" ) {
			// 杩斿洖outerWidth/outerHeight
			return orig[ "outer" + name ].call( this, size );
		}
		return this.each(function() {
			// 璁剧疆瀹藉害/楂樺害 = (size - padding - border - margin)
			$( this).css( type, reduce( this, size, true, margin ) + "px" );
		});
	};
});
// selectors
function focusable( element, isTabIndexNotNaN ) {
	var nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		var map = element.parentNode,
			mapName = map.name,
			img;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName )
		? !element.disabled
		: "a" == nodeName
			? element.href || isTabIndexNotNaN
			: isTabIndexNotNaN)
		// the element and all of its ancestors must be visible
		&& visible( element );
}
function visible( element ) {
	return !$( element ).parents().andSelf().filter(function() {
		return $.curCSS( this, "visibility" ) === "hidden" ||
			$.expr.filters.hidden( this );
	}).length;
}
$.extend( $.expr[ ":" ], {
	data: function( elem, i, match ) {
		return !!$.data( elem, match[ 3 ] );
	},
	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},
	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});
// support
$(function() {
	var body = document.body,
		div = body.appendChild( div = document.createElement( "div" ) );
	$.extend( div.style, {
		minHeight: "100px",
		height: "auto",
		padding: 0,
		borderWidth: 0
	});
	// 鍒ゆ柇褰撳墠娴忚鍣ㄧ幆澧冩槸鍚︽敮鎸乵inHeight灞炴€�
	$.support.minHeight = div.offsetHeight === 100;
	$.support.selectstart = "onselectstart" in div;
	// set display to none to avoid a layout bug in IE
	// http://dev.jquery.com/ticket/4014
	body.removeChild( div ).style.display = "none";
});

// deprecated
$.extend( $.ued, {
	// $.ued.plugin is deprecated.  Use the proxy pattern instead.
	plugin: {
		add: function( module, option, set ) {
			var proto = $.ued[module].prototype;
			for ( var i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode ) {
				return;
			}
			for ( var i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	}
});

})( jQuery );


(function( $, undefined ) {
// jQuery 1.4+
if ( $.cleanData ) {
	var _cleanData = $.cleanData;
	$.cleanData = function( elems ) {
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) { 
			$( elem ).triggerHandler( "ued-remove" );
		}
		_cleanData( elems );
	};
}

$.uedWidget = function( name, base, prototype ) {
	var namespace = name.split( "." )[ 0 ],
		fullName;
	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;
	// 渚嬪鍙傛暟name='ued.tabs'锛屽彉鎴恘amespace='ued',name='tabs',fullName='ued-tabs' 
	// base榛樿涓篧idget绫伙紝缁勪欢榛樿浼氱户鎵縝ase绫荤殑鎵€鏈夋柟娉�  
	if ( !prototype ) {
		prototype = base;
		base = $.UEDWidget;
	}
	// create selector for plugin
	$.expr[ ":" ][ fullName ] = function( elem ) {
		return !!$.data( elem, name );
	};
	// 鍒涘缓鍛藉悕绌洪棿$.ued.tabs  
	$[ namespace ] = $[ namespace ] || {};
	// 缁勪欢鐨勬瀯閫犲嚱鏁�
	$[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// 鍒濆鍖栫埗绫伙紝涓€鑸皟鐢ㄤ簡$.Widget  
	var basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
//		$.each( basePrototype, function( key, val ) {
//			if ( $.isPlainObject(val) ) {
//				basePrototype[ key ] = $.extend( {}, val );
//			}
//		});
	basePrototype.options = $.extend( true, {}, basePrototype.options );
	// 缁檕m.tabs缁ф壙鐖剁被鐨勬墍鏈夊師鍨嬫柟娉曞拰鍙傛暟  
	$[ namespace ][ name ].prototype = $.extend( true, basePrototype, {
		namespace: namespace,
		widgetName: name,
		// 缁勪欢鐨勪簨浠跺悕鍓嶇紑锛岃皟鐢╛trigger鐨勬椂鍊欎細榛樿缁檛rigger鐨勪簨浠跺姞涓婂墠缂€  
        // 渚嬪_trigger('create')瀹為檯浼氳Е鍙�'tabscreate'浜嬩欢  
		widgetEventPrefix: $[ namespace ][ name ].prototype.widgetEventPrefix || name,
		widgetBaseClass: fullName
	}, prototype );
	// 鎶妕abs鏂规硶鎸傚埌jquery瀵硅薄涓婏紝涔熷氨鏄�$('#tab1').tabs();  
	$.uedWidget.bridge( name, $[ namespace ][ name ] );
};

$.uedWidget.bridge = function( name, object ) {
	$.fn[ name ] = function( options ) {
		// 濡傛灉tabs鏂规硶绗竴涓弬鏁版槸string绫诲瀷锛屽垯璁や负鏄皟鐢ㄧ粍浠剁殑鏂规硶锛屽惁鍒欒皟鐢╫ptions鏂规硶  
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;
		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;
		// '_'寮€澶寸殑鏂规硶琚涓烘槸鍐呴儴鏂规硶锛屼笉浼氳鎵ц锛屽$('#tab1').tabs('_init')  
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}
		if ( isMethodCall ) {
			this.each(function() {
				// 鎵ц缁勪欢鏂规硶  
				var instance = $.data( this, name );
				if (options == 'options') {
				    returnValue = instance && instance.options;
				    return false;
                } else {
    				var	methodValue = instance && $.isFunction( instance[options] ) ?
    						instance[ options ].apply( instance, args ) : instance;
    				if ( methodValue !== instance && methodValue !== undefined ) {
    					returnValue = methodValue;
    					return false;
    				}
                }
			});
		} else {
			// 璋冪敤缁勪欢鐨刼ptions鏂规硶  
			this.each(function() {
				var instance = $.data( this, name );
				if ( instance ) {
					// 璁剧疆options鍚庡啀娆¤皟鐢╛init鏂规硶锛岀涓€娆¤皟鐢ㄦ槸鍦╛createWidget鏂规硶閲岄潰銆傝繖涓柟娉曢渶瑕佸紑鍙戣€呭幓瀹炵幇銆�  
                    // 涓昏鏄綋鏀瑰彉缁勪欢涓煇浜涘弬鏁板悗鍙兘闇€瑕佸缁勪欢杩涜閲嶇敾  
                    instance._setOptions( options || {} );
				    $.extend(instance.options, options);
				    $(instance.beforeInitListeners).each(function(){
				        this.call(instance);
				    });
					instance._init();
					$(instance.initListeners).each(function(){
				        this.call(instance);
				    });
				} else {
					// 娌℃湁瀹炰緥鐨勮瘽锛屽湪杩欓噷璋冪敤缁勪欢绫荤殑鏋勯€犲嚱鏁帮紝骞舵妸鏋勯€犲悗鐨勭ず渚嬩繚瀛樺湪dom鐨刣ata閲岄潰銆傛敞鎰忚繖閲岀殑this鏄痙om锛宱bject鏄ā鍧楃被 
					$.data( this, name, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};
$.uedWidget.addCreateListener = function(name,fn){
    var temp=name.split( "." );
    $[ temp[0] ][ temp[1] ].prototype.createListeners.push(fn);
};
$.uedWidget.addInitListener = function(name,fn){
    var temp=name.split( "." );
    $[ temp[0] ][ temp[1] ].prototype.initListeners.push(fn);
};
$.uedWidget.addBeforeInitListener = function(name,fn){
    var temp=name.split( "." );
    $[ temp[0] ][ temp[1] ].prototype.beforeInitListeners.push(fn);
};
$.UEDWidget = function( options, element ) {
    this.createListeners=[];
    this.initListeners=[];
    this.beforeInitListeners=[];
	// allow instantiation without initializing for simple inheritance
	if ( arguments.length ) {
		this._createWidget( options, element );
	}
};
$.UEDWidget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	options: {
		disabled: false
	},
	_createWidget: function( options, element ) {
		// $.widget.bridge stores the plugin instance, but we do it anyway
		// so that it's stored even before the _create function runs
		$.data( element, this.widgetName, this );
		this.element = $( element );
		this.options = $.extend( true, {},
			this.options,
			this._getCreateOptions(),
			options );
		var self = this;
		//娉ㄦ剰锛屼笉瑕佸皯浜嗗墠杈圭殑 "ued-"锛屼笉鐒朵細涓巎query-ui鍐茬獊
		this.element.bind( "ued-remove._" + this.widgetName, function() {
			self.destroy();
		});
		// 寮€鍙戣€呭疄鐜�  
		this._create();
		$(this.createListeners).each(function(){
	        this.call(self);
	    });
		// 濡傛灉缁戝畾浜嗗垵濮嬪寲鐨勫洖璋冨嚱鏁帮紝浼氬湪杩欓噷瑙﹀彂銆傛敞鎰忕粦瀹氱殑浜嬩欢鍚嶆槸闇€瑕佸姞涓婂墠缂€鐨勶紝濡�$('#tab1').bind('tabscreate',function(){});  
		this._trigger( "create" );
		// 寮€鍙戣€呭疄鐜� 
		$(this.beforeInitListeners).each(function(){
	        this.call(self);
	    });
		this._init();
		$(this.initListeners).each(function(){
	        this.call(self);
	    });
	},
	_getCreateOptions: function() {
		return $.metadata && $.metadata.get( this.element[0] )[ this.widgetName ];
	},
	_create: function() {},
	_init: function() {},
	destroy: function() {
		this.element
			.unbind( "." + this.widgetName )
			.removeData( this.widgetName );
		this.widget()
			.unbind( "." + this.widgetName );
	},
	widget: function() {
		return this.element;
	},
	option: function( key, value ) {
        var options = key;
        if ( arguments.length === 0 ) {
            // don't return a reference to the internal hash
            return $.extend( {}, this.options );
        }
        if  (typeof key === "string" ) {
            if ( value === undefined ) {
                return this.options[ key ]; // 鑾峰彇鍊�
            }
            options = {};
            options[ key ] = value;
        }
        this._setOptions( options ); // 璁剧疆鍊�
        return this;
    },
	_setOptions: function( options ) {
		var self = this;
		$.each( options, function( key, value ) {
			self._setOption( key, value );
		});
		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;
		return this;
	},
	
	// $.widget涓紭鍖栬繃鐨則rigger鏂规硶銆倀ype鏄洖璋冧簨浠剁殑鍚嶇О锛屽"onRowClick"锛宔vent鏄Е鍙戝洖璋冪殑浜嬩欢锛堥€氬父娌℃湁杩欎釜浜嬩欢鐨勬椂鍊欎紶null锛�
	// 杩欎釜鏂规硶鍙０鏄庝簡涓や釜鍙傛暟锛屽鏈夊叾浠栧弬鏁板彲浠ョ洿鎺ュ啓鍦╡vent鍙傛暟鍚庨潰
	_trigger: function( type, event ) {
		// 鑾峰彇鍒濆鍖栭厤缃甤onfig涓殑鍥炶皟鏂规硶
		var callback = this.options[ type ];
		// 灏佽js鏍囧噯event瀵硅薄涓簀query鐨凟vent瀵硅薄
		event = $.Event( event );
		event.type = type;
		// copy original event properties over to the new event
		// this would happen if we could call $.event.fix instead of $.Event
		// but we don't have a way to force an event to be fixed multiple times
		if ( event.originalEvent ) {
			for ( var i = $.event.props.length, prop; i; ) {
				prop = $.event.props[ --i ];
				event[ prop ] = event.originalEvent[ prop ];
			}
		}
		// 鏋勯€犱紶缁欏洖璋冨嚱鏁扮殑鍙傛暟锛宔vent鏀剧疆鍦ㄦ渶鍚�
		var newArgs = [],
			argLength = arguments.length;
		for(var i = 2; i < argLength; i++){
			newArgs[i-2] = arguments[i];
		}
		if( argLength > 1){
			newArgs[argLength-2] = arguments[1];
		}
		return !( $.isFunction(callback) &&
			callback.apply( this.element, newArgs ) === false ||
			event.isDefaultPrevented() );
	}
};
})( jQuery );锘�(function(a){a.uedWidget("ued.uedDistrict",{options:{id:"myCityPicker",onSelect:function(b,c){}},_create:function(){var b=this,c=b.options;var d=b.element;this.isSelectVisible=false;this.cityPicker_container=a('<div class="city_picker_c" id="city_'+c.id+'"  style="z-index:100000"></div>');this.cityPicker_boxContent=a('<div class="boxContent"></div>');this.cityPicker_address_hot=a('<div class="address_hot" id="address_hot"></div>');this.cityPicker_address_hotcity=a('<div class="address_hotcity"><strong>鐑棬鍩庡競</strong>锛堝彲鐩存帴杈撳叆鍩庡競鎴栧煄甯傛嫾闊筹級</div>');this.cityPicker_address_hotlist=a('<div class="address_hotlist" id="address_hotlist"></div>');this.cityPicker_container.append(this.cityPicker_boxContent);this.cityPicker_boxContent.append(this.cityPicker_address_hot);this.cityPicker_address_hot.append(this.cityPicker_address_hotcity);this.cityPicker_address_hot.append(this.cityPicker_address_hotlist);if(!c.cityPick_forbidden){this.cityPicker_container.appendTo(document.body).hide()}this.selectManage=a('<div  class="w_placemain" id="city_input_'+c.id+'" style="z-index:100000;border:1px solid #e8e8e8"></div>');if(!c.input_forbidden){this.selectManage.appendTo(document.body).hide()}this.myIndex=-1},_init:function(){var c=this,e=c.options;var f=c.element;f.addClass("city_target");if(e.inputWidth){this.selectManage.width(e.inputWidth)}if(!e.cityPick_forbidden){var b=[];b.push('<ol class="address_hot_abb" id="address_hot_abb_ol'+e.id+'">');a.each(e.data,function(h,j){var g=h=="HOT"?"鐑棬":h;b.push('<li data-tab-id="zhuna-'+h+'" id><span class="">'+g+"</span></li>")});b.push("</ol>");a.each(e.data,function(h,g){b.push('<div data-panel="domestic-hotel-hotcity-hotel" data-panel-id="zhuna-'+h+'" class="cityDetail" style="display:none">');a.each(e.data[h],function(i,k){var j="";j=i.length>1?"":i;b.push('<dl class="cityDl"><dt class="nothingDt">'+j+"</dt><dd><ul>");a.each(e.data[h][i],function(l,t){var r=e.data[h][i][l];var p=r.indexOf("|");var s=r.slice(0,p);var q;if(r.indexOf("锛�")>-1){q=r.indexOf("锛�")}else{q=r.length}var o=r.slice(p+1,q);b.push("<li><span title="+o+'><a _cityId = "'+s+'" class="zhuna-citylist" href="javascript:void(0)" key="'+h+'">'+o+"</a></span></li>")});b.push("</ul></dd></dl>")});b.push("</div>")});c.cityPicker_address_hotlist.html(b.join(""));var d=a("#address_hot_abb_ol"+e.id);d.find("li").eq(0).addClass("active");d.next().show();d.next().find("dt").remove();c._bindNavSpan();c._bindListSpan(f)}c._bindClickBody();c._bindInput(f,this.cityPicker_container,this.selectManage);if(e.autoOpen){f.click()}},_bindNavSpan:function(){var b=this.options;a("#address_hot_abb_ol"+b.id).delegate("li","click",function(){var c=a(this).attr("data-tab-id");a(this).addClass("active").siblings().removeClass("active");a("div[data-panel-id="+c+"]").show().siblings('div[data-panel="domestic-hotel-hotcity-hotel"]').hide()})},_bindClickBody:function(){var b=this,c=b.options;var d=b.element;a(document).on("mousedown.uedCityPicker",function(g){var f=a(g.target);if(a("div.address_hot").is(":visible")){if(f.parents("div.address_hot").length>0){return}else{if(!f.hasClass("city_target")){b._backToOrignal();d.select()}}}else{if(a("#city_input_"+c.id+":visible").length>0){if(f.parents(".w_placemain").length<=0){if(!c.cityPick_forbidden){a("#city_input_"+c.id).find("ul li:first").trigger("click.uedCityPicker")}b.selectManage.hide();b.isSelectVisible=false}}}})},open:function(){var b=this;var c=b.element;c.trigger("click.uedCityPicker")},_bindInput:function(i,g,h){var b=this,c=b.options;var d=b.element;var f;if(c.tipAutoHide){i.on("focus.uedCityPicker",function(){if(a(this).val()==this.defaultValue){a(this).val("")}});i.on("blur.uedCityPicker",function(){if(a(this).val()==""){a(this).val(this.defaultValue)}})}i.on("click.uedCityPicker",function(){d.select();var m=a(this).offset();var n=a(this).height();var o=null;if(c.isRightAlign){o=m.left-b.cityPicker_container.width()+d.width()}else{o=m.left}var j=c.inputleft?c.inputleft:0;var k=c.inputTop?c.inputTop:0;b.cityPicker_container.css({top:m.top+n,left:o,position:"absolute"});h.css({top:m.top+n+k,left:m.left-j,position:"absolute"});b.cityPicker_container.show();if(a(".cityPicker_address_hot:visible").length>0){b.selectManage.hide();b.isSelectVisible=false}});i.on("keydown.uedCityPicker",function(){if(a(this).val()!=""&&a(this).val()!=this.defaultValue){b._backToOrignal();b.selectManage.show();b._beginToListenKeyDown(a(this),a(".w_placemain"))}});i.on("keyup.uedCityPicker",function e(n){if(c.input_forbidden){return}var l=a(this).val();if(a(this).val()==""){b.selectManage.hide();b.selectManage.empty();b.isSelectVisible=false}else{var j="";if(escape(l).indexOf("%u")<0){j=l+"*"}else{j=l}if(n.keyCode!=38&&n.keyCode!=40){b.myIndex=-1;b._backToOrignal();b.selectManage.show();b.isSelectVisible=true;var m;if(c.inputUrl){m=c.inputUrl}else{m="http://kezhan.zhuna.cn/api/city/select";j=l+"*"}var k={q:j,wt:"json",indent:true,rows:10,fl:"type_id,source_id,keyname,hotel_count,ecityid,cityname,baidu_lat,baidu_lng"};clearTimeout(f);f=setTimeout(function(){a.ajax({type:"GET",url:m,data:k,dataType:"jsonp",jsonp:"json.wrf",success:function(o){b._suggestion_city(o.response.docs,i.val(),d)},error:function(o){}})},50)}}});i.on("blur.uedCityPicker",function(){clearInterval(f);f=null;var j=a(this).val();if(j==""){a(this).val(this.defaultValue)}})},_suggestion_city:function(K,v,L){var t=this,l=this.options,k=0;var n=a("#city_input_"+l.id);if(K.length>0){var J=[],I=[],H=[],F=[],E=[],D=[];for(var q=0;q<K.length;q++){k+=Number(K[q].hotel_count)}if(k==0){t.selectManage.empty().html("<h4><p>"+v+"锛屾病鏈夋壘鍒扮浉鍏充俊鎭�</p></h4>");return}for(var B=0,C=K.length;B<C;B++){var r=K[B].type_id+"";if(l.newRule){switch(r){case"1":Array.prototype.push.call(J,K[B]);break;case"2":Array.prototype.push.call(I,K[B]);break;case"3":Array.prototype.push.call(H,K[B]);break;case"4":Array.prototype.push.call(F,K[B]);break;case"5":Array.prototype.push.call(E,K[B]);break;case"6":Array.prototype.push.call(D,K[B]);break}}else{switch(r){case"1":Array.prototype.push.call(J,K[B]);break;case"2":Array.prototype.push.call(I,K[B]);break;case"3":Array.prototype.push.call(H,K[B]);break;case"4":Array.prototype.push.call(F,K[B]);break;case"5":Array.prototype.push.call(E,K[B]);break;case"6":Array.prototype.push.call(D,K[B]);break}}}if(l.newRule){var G=["1|鍩庡競","1|琛屾斂鍖�","3|鍟嗕笟鍖�","3|杩為攣","3|閰掑簵","3|鍦版爣"]}else{var G=["1|鍩庡競","3|鍟嗕笟鍖�","2|鏅尯","5|鏈哄満","4|鐏溅绔�","1|琛屾斂鍖�"]}var g=[J,I,H,F,E,D];var p=[];for(var A=0,C=G.length;A<C;A++){if(g[A].length>0&&g[A]){p.push(t._createObj(G[A],g[A]))}}t.selectManage.empty();var z=[];z.push("<h4><p>"+v+"锛岃嫢闇€缂╁皬鑼冨洿锛岃杈撳叆鏇村鏉′欢</p></h4>");for(var B=0,C=p.length;B<C;B++){var y=p[B].details;z.push('<div class="w_placelist city_w_placelist input_'+l.id+'"><ul class="lineUl">');y=y.length>5?y.slice(0,5):y;for(var A=0,o=y.length;A<o;A++){var h=y[A];var w=h.hotel_count>0?h.hotel_count+"瀹堕厭搴�":"";if(p[B].type!="閰掑簵"&&!h.hotel_count){}else{var u="";if(l.noCity){u=""}else{u=h.cityname==h.keyname?"":"锛�"+h.cityname}z.push('<li type_id="'+h.type_id+'" _ecityId="'+h.ecityid+'" _source_id="'+h.source_id+'" _cityName="'+h.cityname+'"><p class="f_left"><font class="f_right">'+w+'</font><span class="f_left">'+h.keyname+""+u+"</span></p></li>")}}z.push("</ul></div>")}t.selectManage.html(z.join(""));a("div.city_w_placelist").each(function(b,c){if(a(this).find("ul").children().size()<=0){a(this).remove()}});a(".input_"+l.id).each(function(b,e){var d=a(this),c=p[b];d.find("li").eq(0).prepend('<em class="f_right place_ico'+c.icon+'">'+c.type+"</em>");if(d.attr("pageNum")&&d.attr("pageNum")>1){d.hide()}});n.find("ul.lineUl").find("li").each(function(b,c){a(this).attr("myIndex",b)});n.find("div.input_"+l.id).last().css("border-bottom","1px solid #ffffff");t._bindLineUl(L);n.find("ul.lineUl span").each(function(c,f){var b=a(f).text().toString();var e=0;if((e=b.indexOf(v))>-1){var d=b.substr(e,v.length);b=b.replace(d,"<b style='color:#f90'>"+d+"</b>")}a(f).html(b)});n.find("ul.lineUl li:first").trigger("mouseover.uedCityPicker")}else{t.selectManage.empty().html("<h4><p>"+v+"锛屾病鏈夋壘鍒扮浉鍏充俊鎭�</p></h4>")}},_createObj:function(c,b){var d={icon:c.slice(0,1),type:c.slice(2),details:b};return d},_beginToListenKeyDown:function(c,d){var b=this;a(document).one("keydown.uedCityPicker",function(f){if(f.keyCode==38||f.keyCode==40){f.preventDefault();if(f.keyCode==38){b.myIndex--;if(b.myIndex<0){b.myIndex=d.find("li:visible").size()-1}}else{if(f.keyCode==40){b.myIndex++;if(b.myIndex>=d.find("li:visible").size()){b.myIndex=0}}}d.find("li").trigger("mouseout.uedCityPicker");d.find("li").eq(b.myIndex).trigger("mouseover.uedCityPicker")}else{if(f.keyCode==13){c.blur();d.find("li").each(function(e,g){if(a(g).hasClass("cur")){a(g).trigger("click.uedCityPicker")}else{if(e==0){a(g).trigger("click.uedCityPicker")}}})}}})},_bindLineUl:function(d){var b=this,e=b.options;var f=a("#city_input_"+e.id).find("ul li");var c=a("#city_input_"+e.id).find("ul");c.delegate("li","mouseover.uedCityPicker",function(){f.removeClass("cur");a(this).addClass("cur").find("span b").css({color:"#ffffff"});b.myIndex=a(this).attr("myIndex")}).delegate("li","mouseout.uedCityPicker",function(){f.removeClass("cur");a(this).removeClass("cur").find("span b").css({color:"#f90"})}).delegate("li","click.uedCityPicker",function(j){var k=a(this);var i=k.find("p span").text().toString();var h=i.indexOf("锛�");var g=h<0?i:i.substr(0,h);b._trigger("onSelect_input",j,k.attr("type_id"),k.attr("_ecityId"),k.attr("_source_id"),g,k.attr("_cityName"));b.selectManage.hide()})},_bindListSpan:function(e){var c=this,d=c.options;var b=a("div.address_hotlist").find("dl.cityDl ul");b.delegate("span","mouseover.uedCityPicker",function(){a(this).addClass("getFocus").find("a").css("color","#ffffff")}).delegate("span","mouseout.uedCityPicker",function(){a(this).removeClass("getFocus").find("a").css("color","#666666")}).delegate("span","click.uedCityPicker",function(g){var f=a(this).text();e.val(f).attr("value",f);c._trigger("onSelect",g,f,a(this).find("a").attr("_cityId"));c._backToOrignal()})},_backToOrignal:function(){a("ol.address_hot_abb").find("li:eq(0)").addClass("active").siblings().removeClass("active");a("ol.address_hot_abb").siblings().hide();a("ol.address_hot_abb").next().show();this.cityPicker_container.hide()},_destory:function(){a(document).off(".uedCityPicker")}})})(jQuery);(function(a){a.uedWidget("ued.uedHotSearch",{inputId:"myHotSearch",options:{onSelect:function(d,c,b){}},_create:function(){var b=this,c=b.options;var d=b.element;this.hotSearch_container=a('<div class="hotSearch_container" id="h_'+c.inputId+'" style="z-index:111"></div>');this.hotSearch_boxContent=a('<div class="boxContent" box="_boxContent"></div>');this.hotSearch_main=a('<div class="ch_sch_htl"></div>');this.hotSearch_boxContent.append(this.hotSearch_main);this.hotSearch_container.append(this.hotSearch_boxContent);this.selectManage=a('<div id="s_'+c.inputId+'" style="z-index:111;border:1px solid #e8e8e8;" class="w_placemain"></div>');if(!c.hideThinkInput){this.selectManage.appendTo(document.body).hide()}this.hot_hot_myIndex=-1},_init:function(){var b=this,c=b.options,d=b.element;d.addClass("hot_key_target");this.cityId=c.cityId;this.isChangedCityId=false;b._bindInput(d);b._bindClickBodyHot(d)},_bindInput:function(b){var c=this,d=c.options,e=c.element;b.on("focus.uedHotSearch",function(){if(a(this).val()=="鍟嗗湀 / 鍦版爣 / 閰掑簵鍚嶇О"){a(this).val("")}});b.on("blur.uedHotSearch",function(){if(a(this).val()==""){a(this).val("鍟嗗湀 / 鍦版爣 / 閰掑簵鍚嶇О")}});b.on("click.uedHotSearch",function(){e.select();var f=a(this).offset();var g=a(this).height();var h=null;if(d.isRightAlign){h=f.left-490+e.parent().width()}else{h=f.left}var i={top:f.top+g,left:h,position:"absolute"};c.hotSearch_container.css(i);c.selectManage.css(i);if(a("div.hotSearch_container").length>0){c.hotSearch_container.show()}else{c.hotSearch_main.empty();c._queryDataWithAjax()}if(c.isChangedCityId){c.hotSearch_main.empty();c._queryDataWithAjax()}if(c.hotSearch_container.is(":visible")){c.selectManage.hide()}});b.on("keyup.uedHotSearch",function(g){var f=a(this).val();if(f!=""&&f!=this.defaultValue){c.hotSearch_container.hide();c.selectManage.show();c._beginThinkInput(f,b,g);a(this).on("keydown.uedHotSearch")}else{if(f==""){c.selectManage.empty().hide()}}});b.on("keydown.uedHotSearch",function(){if(a(this).val()!=""&&a(this).val()!=this.defaultValue){c.hotSearch_container.hide();c.selectManage.show();c._beginToListenKeyDown2(a(this),a("#s_"+d.inputId))}})},changeCity:function(b){this.cityId=b;this.isChangedCityId=true},_beginToListenKeyDown2:function(c,d){var b=this;a(document).one("keydown.uedHotSearch",function(f){if(f.keyCode==38||f.keyCode==40){f.preventDefault();if(f.keyCode==38){b.hot_myIndex--;if(b.hot_myIndex<0){b.hot_myIndex=d.find("li").size()-1}}else{if(f.keyCode==40){b.hot_myIndex++;if(b.hot_myIndex>=d.find("li").size()){b.hot_myIndex=0}}}d.find("li").trigger("mouseout.uedHotSearch");d.find("li").eq(b.hot_myIndex).trigger("mouseover.uedHotSearch")}else{if(f.keyCode==13){d.find("li").each(function(e,g){if(a(g).hasClass("cur")){a(g).trigger("click.uedHotSearch")}})}}})},_beginThinkInput:function(b,g,h){var d=this,f=d.options;if(h.keyCode!=38&&h.keyCode!=40){d.hot_myIndex=-1;var c={mode:3,ecityid:d.cityId,s:g.attr("value")};a.ajax({type:"GET",url:f.inputUrl,data:c,dataType:"jsonp",jsonp:"callback",success:function(e){d._drawsuggestion(e,b,g)},error:function(e){}})}},_drawsuggestion:function(g,h,o){var n=this,b=n.options,l=[];var c=a("#s_"+b.inputId);n.selectManage.empty();var d=g.suggestionHotel,m=g.suggestionPoint;if(d.length>0&&m.length>0){l.push("<h4><p>"+h+"锛岃嫢闇€缂╁皬鑼冨洿锛岃杈撳叆鏇村鏉′欢</p></h4>");l.push('<div class="w_placelist hot_w_placelist"><ul class="lineUl" id="lineUl_0">');for(var f=0,i=d.length;f<i;f++){l.push('<li _type="8" _sourceId="'+d[f].id+'"><p class="f_left"><span class="f_left">'+d[f].hotelname+"</span></p></li>")}l.push("</ul></div>");l.push('<div class="w_placelist hot_w_placelist"><ul class="lineUl" id="lineUl_1">');for(var e=0,i=m.length;e<i;e++){l.push('<li _type="9" _sourceId="'+m[e].id+'"><p class="f_left"><span class="f_left">'+m[e].name+"</span></p></li>")}l.push("</ul></div>");n.selectManage.html(l.join(""));c.find("ul").each(function(j,q){var p="",k="";if(a(this).attr("id")=="lineUl_0"){p="閰掑簵鍚嶇О";k="1"}else{p="浣嶇疆";k="2"}a(this).find("li").eq(0).prepend('<em class="f_right place_ico'+k+'">'+p+"</em>")});c.find("ul li").each(function(j,k){a(this).attr("hot_myIndex",j)});c.children().last().css("border-bottom","1px solid #ffffff")}else{if(g.suggestion.length>0){l.push("<h4><p>"+h+"锛岃嫢闇€缂╁皬鑼冨洿锛岃杈撳叆鏇村鏉′欢</p></h4>");l.push('<div class="w_placelist hot_w_placelist"><ul class="lineUl">');for(var f=0,i=g.suggestion.length;f<i;f++){l.push('<li _type="10"><p class="f_left"><span class="f_left">'+g.suggestion[f]+"</span></p></li>")}l.push("</ul></div>");n.selectManage.html(l.join(""))}else{l.push('<h4><p id="sug_p">'+h+"锛屾病鏈夌浉鍏充俊鎭�</p></h4>");n.selectManage.html(l.join(""));a("#sug_p").css("border-bottom","1px solid #ffffff")}}n._bindLineUl_hot(c.find("ul.lineUl"),o);c.find("ul.lineUl").find("span").each(function(p,u){var k=a(u).text().toString();var j=h;var r=0;if((r=k.indexOf(j))>-1){var q=k.substr(r,h.length);k=k.replace(q,"<b style='color:#f90'>"+q+"</b>")}a(u).html(k)})},_bindLineUl_hot:function(c,d){var b=this;var e=c.find("li");c.delegate("li","mouseover.uedHotSearch",function(){e.removeClass("cur");a(this).find("span b").css({color:"#ffffff"});a(this).addClass("cur");b.hot_myIndex=a(this).attr("hot_myIndex")}).delegate("li","mouseout.uedHotSearch",function(){e.removeClass("cur");a(this).find("span b").css({color:"#f90"});a(this).removeClass("cur")}).delegate("li","click.uedHotSearch",function(g){var f=a(this).find("p span").text().toString();d.val(f).attr("value",f);b._trigger("onSelect_input",g,a(this).attr("_type"),a(this).attr("_sourceId"));b.selectManage.hide()})},_bindClickBodyHot:function(b){var c=this,d=c.options;a(document).on("mousedown.uedHotSearch",function(g){var f=a(g.target);if(a("div.hotSearch_container").is(":visible")){if(f.is(".hot_key_target")||f.parent().is(".hot_key_target")||f.parents("div.hotSearch_container").length>0){}else{c.hotSearch_container.hide();b.select()}}else{if(a(".w_placemain").is(":visible")){if(f.parents(".w_placemain").length<=0){c.selectManage.empty().hide()}}}})},_bindAreaListSpan:function(){var b=this,d=b.options,c=b.element;a("#h_"+d.inputId).find("p").delegate("a","click.uedHotSearch",function(f){var g=a(this),e=g.text();c.val(e).attr("value",e);b._trigger("onSelect",f,g.attr("area_type"),e,g.attr("area_id"));b.hotSearch_container.hide()})},_queryDataWithAjax:function(){var b=this,c=b.options;var d={};var e;if(c.keywordIsEcity){d={ecityid:b.cityId};e="json"}else{d={cityid:b.cityId};e="jsonp"}b.isChangedCityId=false;a.ajax({type:"GET",url:c.searchUrl,data:d,dataType:e,jsonp:"callback",success:function(g){if(!c.keywordIsEcity){var f=b._formatData(g);b._showSucMsg(f)}else{b._showHotelChain(g.data)}},error:function(f){}})},_showSucMsg:function(h){var c=this;var f="";for(var e in h){if(h[e].length>0){var g="";f+='<b class="oymTitle">'+e+"</b><p>";for(var d=0,b=h[e].length;d<b;d++){var k=h[e][d];g+='<a area_type="'+k.type+'" area_id="'+k.id+'">'+k.title+"</a>"}f+=g;f+="</p>"}}c.hotSearch_main.html(f);c.hotSearch_container.appendTo(document.body).show();c._bindAreaListSpan()},_showHotelChain:function(g){var n=this;var m="";if(g.length>0){var o=[],b=[];for(var h in g){if(g[h].jibie==0){o.push(g[h])}else{b.push(g[h])}}var f={"缁忔祹鍨嬭繛閿�":o,"楂樼閰掑簵":b};for(var e in f){m+='<b class="oymTitle">'+e+"</b>";m+="<p>";var c="";for(var d=0;d<f[e].length;d++){var l=f[e][d];c+='<a area_id="'+l.id+'">'+l.liansuo+"</a>"}m+=c;m+="</p>"}n.hotSearch_main.html(m)}else{n.hotSearch_main.empty().html('<div style="text-align:center;padding-bottom:10px;display:block">鎶辨瓑锛屾殏鏃犵浉鍏虫暟鎹紝鍔姏瀹屽杽涓�...</div>')}n.hotSearch_container.appendTo(document.body).show();n._bindAreaListSpan()},_formatData:function(f){var o;var n=[],m=[],l=[],k=[];for(var g in f){switch(g){case"airport":for(var e=0,h=f[g].length;e<h;e++){f[g][e].type="4"}Array.prototype.push.apply(n,f[g]);break;case"railwayStation":for(var e=0,h=f[g].length;e<h;e++){f[g][e].type="5"}Array.prototype.push.apply(n,f[g]);break;case"busStation":for(var e=0,h=f[g].length;e<h;e++){f[g][e].type="7"}Array.prototype.push.apply(n,f[g]);break;case"cbd":for(var e=0,h=f[g].length;e<h;e++){f[g][e].type="2"}Array.prototype.push.apply(m,f[g]);break;case"canton":for(var e=0,h=f[g].length;e<h;e++){f[g][e].type="6"}Array.prototype.push.apply(l,f[g]);break}}var o={"鐑棬鍟嗗湀":m,"琛屾斂鍖�":l,"鏈哄満杞︾珯":n};return o},destorying:function(){this.hotSearch_container.remove()},_destory:function(){a(document).off(".uedHotSearch");this.hotSearch_boxContent.remove();this.selectManage.remove()}})})(jQuery);(function(a){a.uedWidget("ued.uedDatePicker",{options:{id:"myDatePicker",onSelect:function(c,b){}},_create:function(){var b=this,c=b.options;var d=b.element;this.whichInput=0;this.isLeftSpanClick=false;this.choosedTdInfoMsg=null;this.choosedTdMsecond=null;this.beginDayMseconds=0;this.endDayMseconds=0;this.t_today=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime();this.ued_date_list=a('<div class="ued_date_list" id="'+c.id+'"></div>');this.ued_date_list1=a('<div class="ued_date_list1"></div>');this.ued_date_list.append(this.ued_date_list1).appendTo(document.body).hide()},_init:function(){var q=this,f=q.options;var A=q.element;var h="",g="";var s=window.location.href;if(s.indexOf("tm1")>-1&&s.indexOf("tm2")>-1){var y=s.indexOf("tm1")+4;var x=s.indexOf("tm2")+4;h=s.substr(y,10);g=s.substr(x,10);if(!q.judgeTime(h,g,y,x)){h=q.getFormatDateString(true).toString();g=q.getFormatDateString(false).toString()}}else{if(a.cookie("tm1")&&a.cookie("tm2")&&a.cookie("tm1")!="undefined"&&a.cookie("tm2")!="undefined"&&this.getMsByString(a.cookie("tm1"))>=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime()&&this.getMsByString(a.cookie("tm2"))>=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime()+24*60*60*1000){h=a.cookie("tm1").toString();g=a.cookie("tm2").toString()}else{h=q.getFormatDateString(true).toString();g=q.getFormatDateString(false).toString()}}this.sixteen=24*60*60*1000*60;var l=new Date().getFullYear();var c=new Date().getMonth();var d=["鏃�","涓€","浜�","涓�","鍥�","浜�","鍏�"];var p="",z="";for(var w=0;w<2;w++){z=w==0?'<span class="ued_toggleBtn" id="ued_datePicker_leftBtn">&lt</span>':'<span class="ued_toggleBtn" id="ued_datePicker_rightBtn">&gt</span>';p+='<div class="ued_subdate_list">';p+='<div class="ued_subdate_list_head">'+z+'<span class="yymm" id="yymm"></span></div>';p+='<table class="ued_subdate_list_main" id="myTable'+w+'"><tbody><tr>';for(var v=0;v<7;v++){p+='<th class="ued_date_weekDay">'+d[v]+"</th>"}p+="</tr>";var t=0;for(var u=0;u<6;u++){p+="<tr>";for(var r=0;r<7;r++){p+='<td day_id="'+t+'"></td>';t++}p+="</tr>"}p+="</tbody></table>";p+="</div>"}this.ued_date_list1.html(p);this.ued_date_list1.append('<div class="clearMainAndBottom"></div>');a("#myTable0").css({"border-right":"#dbdbdb 1px solid"});a("span.yymm").each(function(k,B){var m=Number(c+k+1);var j="";j=m>9?m+"":"0"+(m+"");if(Number(j)>12){j="01"}a(B).text(l+"-"+j);if(k==1&&j=="01"){a(B).text((l+1)+"-"+j)}a(B).attr("id","yymm"+k)});var o=a("#myTable0");var n=a("#myTable1");this._renderDay(o,l,c,1);this._renderDay(n,l,c+1,1);this._bindChooseDay(A);this._bindSwitchYearAndMonth(o,n,a("#ued_datePicker_leftBtn"),a("#ued_datePicker_rightBtn"),l,c);this._bindInputClick(A);this._bindClickOtherWhere();var b=q.getMsByString(h);var e=q.getMsByString(g);q.newBeginDay=b;q.newEndDay=e;A.find("input").each(function(j,k){if(j==0){a(this).attr("id",f.startTimeId).val(h).attr("value",h).attr("thisMseconds",b);a(this).next("i").text(q.getWeekend(b))}else{a(this).attr("id",f.endTimeId).val(g).attr("value",g).attr("thisMseconds",e);a(this).next("i").text(q.getWeekend(e))}});q._trigger("initial_day",null,(e-b)/(24*60*60*1000))},resetTimes:function(c,b){var f=this,i=f.options;var g=f.element;var h=f.getMsByString(c);var e=f.getMsByString(b);g.find("input").each(function(j,k){if(j==0){a(this).attr("id",i.startTimeId).val(c).attr("value",c).attr("thisMseconds",h);a(this).next("i").text(f.getWeekend(h))}else{a(this).attr("id",i.endTimeId).val(b).attr("value",b).attr("thisMseconds",e);a(this).next("i").text(f.getWeekend(e))}});f.newBeginDay=h;f.newEndDay=e;var d=a("table.ued_subdate_list_main");d.find("td").removeClass("beginDay").removeClass("endDay").removeClass("choosedMiddle");d.find("td[mseconds="+h+"]").addClass("beginDay");d.find("td[mseconds="+e+"]").addClass("endDay");d.find("td").each(function(j,k){if(Number(a(k).attr("mseconds"))>=Number(f.t_today)){a(k).removeClass("ued_date_disabled")}})},getMsByString:function(c){var f=Number(c.slice(0,4));var b=Number(c.slice(c.indexOf("-")+1,c.lastIndexOf("-")))-1;var e=Number(c.slice(c.lastIndexOf("-")+1));var d=new Date(f,b,e).getTime();return d},getDayByMs:function(d){var c=new Date(Number(d)).getFullYear();var b=new Date(Number(d)).getMonth();var f=new Date(Number(d)).getDate();b=Number(b+1)>9?Number(b+1)+"":"0"+(Number(b+1)+"");f=Number(f)>9?Number(f)+"":"0"+(Number(f)+"");var e=c+"-"+b+"-"+f;return e},judgeTime:function(d,b,g,i){var c=true;var f=this.getFormatDateString(true);var e=this.getFormatDateString(false);var h=(this.getMsByString(d)-this.getMsByString(f))/1000/60/60/24;if(this.getMsByString(d)>=this.getMsByString(b)){c=false}else{if(this.getMsByString(d)<this.getMsByString(f)){c=false}else{if(this.getMsByString(b)<=this.getMsByString(f)){c=false}else{if((Number(i)-Number(g))!=15){c=false}else{if(isNaN(this.getMsByString(d))){c=false}else{if(isNaN(this.getMsByString(b))){c=false}else{if(h>60){c=false}}}}}}}return c},getFormatDateString:function(c){var g=new Date();var f="";var h,b,e;h=g.getFullYear();b=g.getMonth()+1;b=Number(b)<10?"0"+b:b.toString();e=g.getDate();e=Number(e)<10?"0"+e:e.toString();if(c){f=h+"-"+b+"-"+e}else{f=this.getDayByMs(new Date().getTime()+(24*60*60*1000))}return f},_renderDay:function(c,d,n,j){var l=this,p=l.options;var o=l.element;var k=new Date(d,n,j).getDay();var e=c;e.find("td[day_id="+k+"]").text(1);var g=e.find("td");g.empty().removeClass("ued_date_disabled").removeClass("ued_not_thisMonth").removeClass("todayFocus").removeAttr("infoMsg").removeAttr("mseconds");e.find("td").each(function(s,t){var r=a(this).attr("day_id");if(r>=k&&r<l._getdaysOfMonth(d,n)+k){var q=a(t).attr("day_id")-k+1;if(n+1>12){n=0;d++}a(this).text(q).attr("infoMsg",d+"-"+(n+1)+"-"+q).attr("mseconds",new Date(d,n,q).getTime())}});var i=new Date().getFullYear();var b=new Date().getMonth()+1;var h=new Date().getDate();var m=i+"-"+b+"-"+h;e.find('td[infomsg="'+m+'"]').addClass("todayFocus");var f=new Date(i,b-1,h).getTime();e.find("td").each(function(r,s){var q=Number(a(s).attr("mseconds"));if(q<Number(f)||q>Number(f)+l.sixteen){a(s).addClass("ued_date_disabled")}if(q<=Number(o.find("input").eq(0).attr("thisMseconds"))||q>=Number(o.find("input").eq(0).attr("thisMseconds"))+l.sixteen){a(s).addClass("ued_date_disabled")}if(l.isLeftSpanClick){if(q>=Number(f)&&q<=Number(f)+l.sixteen){a(s).removeClass("ued_date_disabled")}}else{if(q<=Number(o.find("input").eq(0).attr("thisMseconds"))||q>=Number(o.find("input").eq(0).attr("thisMseconds"))+l.sixteen){a(s).addClass("ued_date_disabled")}}});if(this.isLeftSpanClick){if((1000*60*60*6)>(new Date().getTime()-f)){e.find("td.todayFocus").prev().removeClass("ued_date_disabled")}}},_bindChooseDay:function(g){var b=a("table.ued_subdate_list_main");var i=a("table.ued_subdate_list_main").find("td");var h=g.find("input");var f=g.find("input").eq(0);var d=g.find("input").eq(1);var c=this,e=c.options;b.delegate("td","mouseover.datePicker",function(){if(a(this).text()!=""&&!a(this).hasClass("ued_date_disabled")){if(a(this).hasClass("beginDay")||a(this).hasClass("endDay")){a(this).addClass("changeColor")}if(c.isLeftSpanClick){h.parent().removeClass("chooseOK");if(c.hasChoosedEndDay){d.parent().addClass("chooseOK")}i.removeClass("ued_item_over");a(this).addClass("ued_item_over")}else{h.parent().removeClass("chooseOK");f.parent().addClass("chooseOK");i.removeClass("ued_item_over2");a(this).addClass("ued_item_over2");if(c.notHideMiddle){}else{if(c.hasChoosedBeginDay){c._renderMiddleTd(c.$start,a(this))}}}var m=a(this).attr("infomsg").toString();var l=m.slice(0,4);var j=m.slice(m.indexOf("-")+1,m.lastIndexOf("-"));var n=m.slice(m.lastIndexOf("-")+1);j=Number(j)<10?"0"+j:j;n=Number(n)<10?"0"+n:n;var k=l+"-"+j+"-"+n;h.eq(c.whichInput).val(k)}});b.delegate("td","mouseout.datePicker",function(){a(this).removeClass("changeColor");if(!c.notHideMiddle){i.removeClass("choosedMiddle")}i.removeClass("ued_item_over").removeClass("ued_item_over2");if(a(this).attr("mseconds")&&!a(this).hasClass("ued_date_disabled")){f.val(c.getDayByMs(c.newBeginDay));d.val(c.getDayByMs(c.newEndDay))}});b.delegate("td","click",function(q){var t=a(this);if(!t.hasClass("ued_date_disabled")&&t.text()!=""){var n=t.attr("mseconds");var p=t.attr("infomsg").toString();var s=p.slice(0,4);var m=p.slice(p.indexOf("-")+1,p.lastIndexOf("-"));var j=p.slice(p.lastIndexOf("-")+1);m=Number(m)<10?"0"+m:m;j=Number(j)<10?"0"+j:j;var r=s+"-"+m+"-"+j;h.eq(c.whichInput).val(r).attr("value",r).attr("thisMseconds",n);c._trigger("onSelect",q,r,n);if(c.whichInput==0){h.eq(c.whichInput).parent().addClass("chooseOK");d.parent().addClass("getFocus_outerInput");if(!c.hasChoosedEndDay){c._openNext(n,true)}else{c._openNext(n,false)}if(e.writeCookie){a.cookie("tm1",r,{expires:1,path:"/",domain:"zhuna.cn"});a.cookie("tm2",d.val(),{expires:1,path:"/",domain:"zhuna.cn"})}c._trigger("onSelect_tm1",q,r,n,c.getWeekend(n))}else{if(e.writeCookie){a.cookie("tm1",f.val(),{expires:1,path:"/",domain:"zhuna.cn"});a.cookie("tm2",r,{expires:1,path:"/",domain:"zhuna.cn"})}c._trigger("onSelect_tm2",q,r,n,c.getWeekend(n));c._formatDate()}var u=Number(f.attr("thisMseconds"));var l=Number(d.attr("thisMseconds"));if(isNaN(u)){u=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime()}c.newBeginDay=u;var k=(l-u)/(24*60*60*1000);if(!isNaN(u)&&!isNaN(l)){if(k>28){var o=Number(c.newBeginDay)+24*60*60*1000;c.newEndDay=o;c.$end=b.find("td[mseconds="+o+"]");i.removeClass("endDay");c.$end.addClass("endDay");c._renderMiddleTd(c.$start,c.$end);d.val(c.getDayByMs(o)).attr("value",c.getDayByMs(o)).attr("thisMseconds",c.$end.attr("mseconds"));c._trigger("onCountDays_tooMuch",q,k,c.$end.attr("infoMsg"),o,c.getWeekend(o));c._trigger("onCountDays",q,1,false);if(e.writeCookie){a.cookie("tm2",c.getDayByMs(o),{expires:1,path:"/",domain:"zhuna.cn"})}}else{c._trigger("onCountDays",q,k,true)}h.blur()}}});b.delegate("td","mousedown.datePicker",function(j){if(!a(this).hasClass("ued_date_disabled")&&a(this).text()!=""){j.preventDefault();if(c.whichInput==0){if(c.hasChoosedEndDay){c.notFirst=true}c.newBeginDay=a(this).attr("mseconds");d.parent().removeClass("chooseOK");c.beginDayMseconds=a(this).attr("mseconds");i.removeClass("beginDay");if(!a(this).hasClass("ued_date_disabled")&&a(this).text()!=""){a(this).removeClass("ued_item_over").addClass("beginDay")}c.hasChoosedBeginDay=true}else{if(c.hasChoosedBeginDay){c.notFirst=true}c.newEndDay=a(this).attr("mseconds");f.parent().removeClass("chooseOK");c.endDayMseconds=a(this).attr("mseconds");i.removeClass("endDay");if(!a(this).hasClass("ued_date_disabled")&&a(this).text()!=""){a(this).removeClass("ued_item_over2").addClass("endDay")}c.notHideMiddle=true;c.hasChoosedEndDay=true}i.each(function(k,l){if(a(l).hasClass("beginDay")){c.$start=a(l)}else{if(a(l).hasClass("endDay")){c.$end=a(l)}}});if(c.hasChoosedBeginDay&&c.hasChoosedEndDay){c._renderMiddleTd(c.$start,c.$end)}}})},getWeekend:function(e){var g="";var b=new Date().getTime();var h=24*60*60*1000;var c=Math.abs(Math.ceil((Number(e)-b)/h));var f=new Date(Number(e)).getDay();switch(f){case 0:g="鍛ㄦ棩";break;case 1:g="鍛ㄤ竴";break;case 2:g="鍛ㄤ簩";break;case 3:g="鍛ㄤ笁";break;case 4:g="鍛ㄥ洓";break;case 5:g="鍛ㄤ簲";break;case 6:g="鍛ㄥ叚";break}if(c==0){g="浠婂ぉ"}else{if(c==1){g="鏄庡ぉ"}else{if(c==2){g="鍚庡ぉ"}}}return g},_renderMiddleTd:function(c,b){if(this.letmego){c=a("table.ued_subdate_list_main").find("td[mseconds="+this.newBeginDay+"]")}var d=a("table.ued_subdate_list_main").find("td");d.removeClass("choosedMiddle");d.each(function(e,g){var f=a(g).attr("mseconds");c.addClass("choosedMiddle");if(f>=c.attr("mseconds")&&f<=b.attr("mseconds")&&a(g).text()!=""&&!a(g).hasClass("ued_date_disabled")){a(g).addClass("choosedMiddle")}else{if(!d.hasClass("beginDay")&&a(g).text()!=""&&!a(g).hasClass("ued_date_disabled")){if(f<=b.attr("mseconds")){a(g).addClass("choosedMiddle")}}}})},_bindSwitchYearAndMonth:function(c,i,e,g,b,f){var d=this;var h=a("table.ued_subdate_list_main").find("td");e.off("click.datePicker").on("click.datePicker",function(){h.each(function(o,p){if(a(p).hasClass("beginDay")){d.newBeginDay=a(p).attr("mseconds")}else{if(a(p).hasClass("endDay")){d.newEndDay=a(p).attr("mseconds")}}});var k=b;f--;var l=f+1;if(f<0){f=11;l=0;b--}if(l<0){l=11;k--}var j=Number(f+1)>9?Number(f+1)+"":"0"+(Number(f+1)+"");var m=Number(l+1)>9?Number(l+1)+"":"0"+(Number(l+1)+"");a("#yymm0").text(b+"-"+j);a("#yymm1").text(k+"-"+m);h.empty();d._renderDay(c,b,f,1);d._renderDay(i,k,l,1);d._resetChoosed(false)});g.off("click.datePicker").on("click.datePicker",function(){h.each(function(o,p){if(a(p).hasClass("beginDay")){d.newBeginDay=a(p).attr("mseconds")}else{if(a(p).hasClass("endDay")){d.newEndDay=a(p).attr("mseconds")}}});f++;if(f>11){f=0;b++}var l=f+1;var k=b;if(l>11){l=0;k++}var j=Number(f+1)>9?Number(f+1)+"":"0"+(Number(f+1)+"");var m=Number(l+1)>9?Number(l+1)+"":"0"+(Number(l+1)+"");a("#yymm0").text(b+"-"+j);a("#yymm1").text(k+"-"+m);h.empty();d._renderDay(c,b,f,1);d._renderDay(i,k,l,1);d._resetChoosed(false)})},_resetChoosed:function(b){var c=this;var d=a("table.ued_subdate_list_main"),g=a("table.ued_subdate_list_main").find("td");g.removeClass("beginDay").removeClass("endDay").removeClass("choosedMiddle");var e=d.find("td[mseconds="+this.newBeginDay+"]");var f=d.find("td[mseconds="+this.newEndDay+"]");e.addClass("beginDay");f.addClass("endDay");c.beginDayMseconds=this.newBeginDay;c.endDayMseconds=this.newEndDay;this.letmego=true;this._renderMiddleTd(e,f);if(!b&&c.notFirst){var g=a("table.ued_subdate_list_main").find("td");if(g.hasClass("beginDay")&&!g.hasClass("endDay")){g.each(function(h,j){if(a(j).attr("mseconds")>c.beginDayMseconds){a(j).addClass("choosedMiddle")}})}else{if(!g.hasClass("beginDay")&&g.hasClass("endDay")){g.each(function(h,j){if(a(j).attr("mseconds")<c.endDayMseconds){a(j).addClass("choosedMiddle")}})}else{g.each(function(h,j){if(a(j).attr("mseconds")<c.endDayMseconds&&a(j).attr("mseconds")>c.beginDayMseconds){a(j).addClass("choosedMiddle")}})}}}},_bindInputClick:function(f){var b=this,d=this.options;var e=a("table.ued_subdate_list_main").find("td");var c=f.find("input").eq(0);f.find("input").on("click.datePicker",function(k){if(b.notFirst){if(e.hasClass("beginDay")&&!e.hasClass("endDay")){e.each(function(l,m){if(a(m).attr("mseconds")>b.beginDayMseconds){a(m).addClass("choosedMiddle")}})}else{if(!e.hasClass("beginDay")&&e.hasClass("endDay")){e.each(function(l,m){if(a(m).attr("mseconds")<b.endDayMseconds){a(m).addClass("choosedMiddle")}})}}}a(this).parents().removeClass("getFocus_outerInput");a(this).parent().addClass("getFocus_outerInput");b.whichInput=a(this).attr("id")==d.startTimeId?0:1;if(b.whichInput==0){b.isLeftSpanClick=true;e.each(function(l,m){if(Number(a(m).attr("mseconds"))>=Number(b.t_today)&&Number(a(m).attr("mseconds"))<Number(b.t_today)+b.sixteen){a(m).removeClass("ued_date_disabled")}});if((1000*60*60*6)>(new Date().getTime()-b.t_today)){a("td.todayFocus").prev().removeClass("ued_date_disabled")}}else{if(b.whichInput==1){b.isLeftSpanClick=false;e.each(function(l,m){if(Number(a(m).attr("mseconds"))<=Number(c.attr("thisMseconds"))){a(m).addClass("ued_date_disabled")}})}}var g,j,h=0,i=0;if(d.isVertical){g=a(this).offset();j=a(this).height()}else{g=c.offset();j=c.height()}if(d.leftPos){h=d.leftPos}if(d.topPos){i=d.topPos}b.ued_date_list.css({top:g.top+j+i,left:g.left-h,position:"absolute"});b.ued_date_list.toggle()});f.find("input").on("focus.datePicker",function(g){if(b.whichInput!=0){e.each(function(h,j){if(Number(a(j).attr("mseconds"))<=Number(c.attr("thisMseconds"))){a(j).addClass("ued_date_disabled")}})}})},tm1_open:function(){var b=this.element;b.find("input").eq(0).trigger("click")},tm2_open:function(){var b=this.element;b.find("input").eq(1).trigger("click")},_bindClickOtherWhere:function(){var b=this,c=b.element,d=b.options;a(document).on("mousedown.datePicker",function(g){var f=a(g.target);a("div.date_note").fadeOut();a("div.indexdate_note").fadeOut();if(a("#"+d.id).css("display")!="none"){if(f.is(c.find("input"))||f.parents("div.ued_date_list").length>0){}else{b._formatDate()}}})},_getdaysOfMonth:function(b,c){return new Date(b,c+1,0).getDate()},_formatDate:function(){var b=this;var c=b.element;c.find("input").parent().removeClass("chooseOK").removeClass("getFocus_outerInput");this.letmego=true;this.ued_date_list.hide()},_openNext:function(j,l){var o=this,c=this.options,p=o.element;var d=p.find("input").eq(0),q=p.find("input").eq(1);var k=a("table.ued_subdate_list_main");var g=24*60*60*1000;var m=new Date(Number(j)+g).getFullYear();var n=new Date(Number(j)+g).getMonth();var f=new Date(Number(j)+g).getDate();n=Number(n+1)>9?Number(n+1)+"":"0"+(Number(n+1)+"");f=Number(f)>9?Number(f)+"":"0"+(Number(f)+"");var b=m+"-"+n+"-"+f;if(d.attr("thisMseconds")>=q.attr("thisMseconds")){q.val(b).attr("value",b).attr("thisMseconds",Number(j)+g);o.newEndDay=Number(j)+g;o._trigger("onAutoPlus",null,b,Number(j)+g,o.getWeekend(Number(j)+g));k.find("td").removeClass("choosedMiddle").removeClass("endDay");k.find("td[mseconds="+q.attr("thisMseconds")+"]").removeClass("ued_item_over2").addClass("endDay");if(c.writeCookie){a.cookie("tm2",b,{expires:1,path:"/",domain:"zhuna.cn"})}}o.isLeftSpanClick=false;k.find("td").each(function(r,s){if(Number(a(s).attr("mseconds"))<=Number(j)){a(s).addClass("ued_date_disabled")}});if(l){if(c.isVertical){var i=q.offset();var e=q.height();o.ued_date_list.css({top:i.top+e,left:i.left,position:"absolute"})}o.ued_date_list.show();o.whichInput=1;d.parent().removeClass("getFocus_outerInput")}else{var h=p.find("input").parent();h.removeClass("chooseOK").removeClass("getFocus_outerInput");this.ued_date_list.hide()}},_destory:function(){a(document).off(".datePicker")}})})(jQuery);(function(a){a.uedWidget("ued.uedPopWin",{options:{width:400,height:300,hasTitle:true,title:"鍛靛懙",popWinId:"myPop",innerDivId:"hehe",closeWhileClickOtherArea:true,autoOpen:false},_create:function(){var b=this,c=b.options;var d=b.element;this.isHtml=false;if(((c.html=="")||(c.html==null))&&c.innerDivId!=null){this.isHtml=false}else{this.isHtml=true}this.popWinContainer=a('<div id="'+c.popWinId+'" _win_="XYTipsWindow12" class="myHah" style="/*left: 50%; margin-left: -360px; top: 50%; margin-top: -223px; position: fixed;*/ z-index: 8912089;"></div>');this.popWinContainer.append('<div class="new_win_mainbox"><div class="win_menu" id="popTitle">'+c.title+'</div><div class="winclose"></div><div class="win_question"></div></div>')},_init:function(){var b=this,c=b.options;var d=b.element;this.popWinContainer.find(".new_win_mainbox").width(c.width);this.popWinContainer.find(".win_question").height(c.height);if(this.isHtml){this.popWinContainer.find(".win_question").empty().append('<iframe src="'+c.html+'" style="width:100%;height:100%" frameborder="0"  scrolling="no"></iframe>')}else{a("#"+c.innerDivId).css("display","block");this.popWinContainer.find(".win_question").empty().append(a("#"+c.innerDivId))}this._bindEvent()},open:function(){this._show()},close:function(){this._hide()},reset:function(b){this.popWinContainer.find(".win_question").empty().append(a("#"+b))},_bindEvent:function(){var b=this,c=b.options,d=b.element;if(c.autoOpen){b._show()}else{d.on("click.popWin",function(){b._show()})}if(c.closeWhileClickOtherArea){a(document).on("mousedown.popWin",function(g){var f=a(g.target);if(a(".myHah:visible").length>0){if(f.is(d)||f.parents("#"+c.popWinId).length>0||f.hasClass("myHah")){}else{b._hide()}}})}a(document).on("click.popWin",".winclose",function(){b._hide()})},_show:function(d){var b=this,c=b.options;b.popWinContainer.appendTo(document.body).fadeIn();b._adjustPosition(d);this._trigger("onOpen")},_hide:function(){this.popWinContainer.remove();this._trigger("onClose")},_adjustPosition:function(d){var c=this.options;var b=a(document.body).outerWidth(true)-a("#"+c.innerDivId).width();var e=a(window).height()-a("#"+c.innerDivId).height();this.popWinContainer.css({top:"50%",left:"50%",marginLeft:"-360px",marginTop:"-223px",position:"fixed"})},_destory:function(){a(document).off(".popWin")}})})(jQuery);(function(a){a.uedWidget("ued.uedToolTip",{options:{},_create:function(){var b=this,c=b.options;var d=b.element;this.tip=a('<div id="'+c.popWinId+'" style="border-bottom:1px solid #e5e5e5" class="myToolTip"></div>').css({"z-index":300001,background:"#fff"});if(c.noBorder){this.tip.css("border-bottom","none")}},_init:function(){var b=this,c=b.options;var d=b.element;a("#"+c.innerDivId).css("display","block");this.tip.empty().append(a("#"+c.innerDivId));this._bindEvent()},_bindEvent:function(){var b=this,c=b.options,d=b.element;b._show();a("#"+c.closeId).live("click.tooltip",function(){b._hide()})},open:function(){this._show()},close:function(){this._hide()},reset:function(b){this.tip.empty().fadeIn(function(){a(this).append(a("#"+b))});this._adjustPositionArrow()},_show:function(d){var b=this,c=b.options;b.tip.appendTo(document.body).hide().fadeIn("normal");b._adjustPosition(d);this._trigger("onOpen")},_hide:function(){this.tip.fadeOut(function(){a(this).remove()});this._trigger("onClose")},resetPos:function(b){this.tip.css({left:b,position:"absolute"});this._adjustPositionArrow()},_adjustPosition:function(f){var c=this.element,e=this.options;if(e.isCenter){var b=(a(window).width()-e.initialW)/2;this.tip.css({left:b,top:"10%",position:"fixed"})}else{this.tip.css({top:e.top,left:e.left,position:"absolute"});a("#"+e.innerDivId).css({top:0,left:0,position:"absolute"})}if(e.hasArrow){var d=c.offset().left-a(".landmark_list").offset().left;a(".ang").css({left:d+c.width()/2+2,position:"absolute"})}},_adjustPositionArrow:function(e){var b=this.element;var d=this.options;if(d.hasArrow){var c=b.offset().left-a(".landmark_list").offset().left;a(".ang").css({left:c+b.width()/2+2,position:"absolute"})}},_destory:function(){a(document).off(".tooltip");this.tip.remove()}})})(jQuery);(function(a){a.uedWidget("ued.uedTipMsg",{options:{width:"auto",delay:300,showOn:"mouseover",html:"姝ｅ湪鍔犺浇锛岃绋嶅悗..."},_create:function(){var b=this,c=b.options;var d=b.element;this.tipContent=a('<div class="pricelist1"></div>');this.tipArrow=a("<div></div>");this.tip=a('<div class="tip price_note1"></div>').append(this.tipArrow,this.tipContent)},_init:function(){var b=this,c=b.options;var d=b.element;this.tipContent.empty();if(c.width!="auto"){this.tip.css("width",c.width)}else{this.tip.css("width","auto")}if(c.html){this.tip.find(".pricelist1").append('<div id="linshiInfo">'+c.html+"</div>")}this._bindEvent()},_bindEvent:function(){var b=this,c=b.options,d=b.element;if(c.showOn=="mouseover"){d.bind("mouseover.tooltip",function(f){if(b.showTime){clearTimeout(b.showTime)}b.showTime=setTimeout(function(){b.show(f)},c.delay)})}else{if(c.showOn=="click"){b.showTime=d.bind("click.tooltip",function(f){setTimeout(function(){b.show(f)},c.delay)})}}d.bind("mouseleave.tooltip",function(){if(b.showTime){clearTimeout(b.showTime)}b.hideTime=setTimeout(function(){b.hide()},c.delay)});b.tip.bind("mouseover.tooltip",function(){if(b.hideTime){clearTimeout(b.hideTime)}}).bind("mouseleave.tooltip",function(){setTimeout(function(){b.hide()},c.delay)})},show:function(d){var b=this,c=b.options;if(a(document.body).find(b.tip).length<=0){b.tip.appendTo(document.body).fadeIn();if(c.delayedDivId){if(a("#"+c.delayedDivId).length>0){a("#"+c.delayedDivId).css("display","block");this.tipContent.find("#linshiInfo").remove();this.tipContent.append(a("#"+c.delayedDivId))}}b._adjustPosition(d)}else{b.tip.fadeIn(c.delay);b._adjustPosition(d)}},hide:function(){this.tip.hide()},_adjustPosition:function(h){var e=this.element;var g=this.options;var d=a(e).offset();var f=a(e).height();var i=null;if(g.isRightAlign){i=d.left-this.tip.width()+e.width()}else{i=d.left}var b="";var c=a(window).height()-(d.top-a(document).scrollTop());if(c<(this.tip.outerHeight(true)+8+f)){b=d.top-(this.tip.outerHeight(true)+8);if(g.customTop){b-=g.customTop}this.tipArrow.css("top",this.tip.height()+"px").removeClass("priceico1").addClass("priceico1_reverse")}else{b=d.top+f+5;if(g.customTop){b+=g.customTop}if(g.customLeft){i+=g.customLeft}this.tipArrow.css("top","-7px").removeClass("priceico1_reverse").addClass("priceico1")}this.tip.css({top:b,left:i,position:"absolute"});if(g.arrowOffsetLeft){this.tipArrow.css("left",g.arrowOffsetLeft+"px")}},_destory:function(){clearTimeout(this.showTime);clearTimeout(this.hideTime);a(document).off(".tooltip");this.tip.remove()}})})(jQuery);/**
 * 寮瑰嚭灞傜櫥褰� 鍏叡
 **/
var dialogLogin = {
		location : '',
		callback_fun : '',
		login_error_count : 0,
		//鍒涘缓閬僵灞�
		createTopDiv : function(){
			var isIE6= navigator.appVersion.indexOf("MSIE 6")>-1;
			var p = isIE6 ? 'absolute' : 'fixed';
			var html = '';
			html += '<div style="display:block;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;position:'+p+';background:#000;z-index:999999;top:0;left:0;opacity:0.7;" id="dialog_backdiv"></div>';
			$("body").append(html);
		},
		//鍒涘缓鐧诲綍妗�
		createLoginDiv : function(){
			var isIE6= navigator.appVersion.indexOf("MSIE 6")>-1;
			var p = isIE6 ? 'absolute' : 'fixed';
			var html = '';
			html += '<div id="dialog_login_div" style="position:'+p+';z-index:9999999;">';
			html += '<div class="login_pop">';
			html += '<div class="login_close" id="dialog_colse"></div>';
			html += '<div class="login_mode">';
			html += '    	<p class="title"><strong>浼氬憳鐧诲綍</strong>';
			html += '        	<span>娌℃湁璐﹀彿锛�<a href="'+header_index_url+'account/register/">绔嬪嵆娉ㄥ唽</a></span></p>';
			html += '        <ul>';
			html += '        	<li>';
			html += '                <div class="input_phone">';
			html += '                    <input id="dialog_phone" maxlength="13" autocomplete="off" type="text" id="" name="" value="" />';
			html += '                    <span style="display: block;">鎵嬫満鍙�</span>';
			html += '                </div>';
			html += '            </li>';
			html += '            <li>';
			html += '                <div class="input_password">';
			html += '                    <input id="dialog_pwd" type="password" autocomplete="off" name="" value="" />';
			html += '                    <span style="block">璇疯緭鍏ュ瘑鐮�</span>';
			html += '                </div>';
			html += '         	</li>';
			html += '            <li style="display:none">';
			html += '            	<div class="input_yzm">';
			html += '                	<input id="dialog_verifycode" maxlength="4" type="text" autocomplete="off" class="login_yzm" name="verify" />';
			html += '                    <span>璇疯緭鍏ラ獙璇佺爜</span>';
			html += '                </div>';
			html += '                <p class="input_yzms">';
			html += '                	<span></span>';
			html += '					<strong><img id="verify_image" src="'+header_index_url+'account/verifyimg/?t=ajax_verify" width="88" height="40" /></strong>';
			html += '                </p>';
			html += '            </li>';
			html += '            <li style="display:none">';
			html += '            	<p class="wrong" id="dialog_login_error"></p>';
			html += '            </li>';
			html += '            <li>';
			html += '            	<p class="note">';
			html += '                	<strong id="ex_time">30澶╁厤鐧诲綍</strong>';
			html += '                    <span><a href="'+header_index_url+'account/forget/">蹇樿鐧诲綍瀵嗙爜锛�</a></span>';
			html += '                </p>';	
			html += '            </li>';
			html += '            <li>';
			html += '            	<input type="button" name="button" value="绔嬪嵆鐧诲綍" class="but" id="dialog_button" />';
			html += '                <em style="display:none" id="reg_btn_ing">姝ｅ湪鐧诲綍<img width="20" height="20" src="http://zhengfenghui.public.trunk.kezhan.zhuna.cn:8080/www/default/images/login/waiting.gif"></em>';	
			html += '        </li>';
			html += '        </ul>';
			html += '        <div class="cooperate">';
			html += '            <dl>';
			html += '                <dt>浣跨敤鍚堜綔缃戠珯璐﹀彿鐧诲綍</dt>';
			html += '                <dd>';
			html += '                    <ul>';
			html += '                        <li><a href="javascript:void(0);" id="dialog_WEIBOSN" class="login_ico_blog oauth_login" title="鏂版氮寰崥鐧诲綍"></a></li>';
			html += '                        <li><a href="javascript:void(0);" id="dialog_QQ" class="login_ico_qq oauth_login" title="QQ鐧诲綍"></a></li>';
			html += '                        <li><a href="javascript:void(0);" id="dialog_RENREN" class="login_ico_renren oauth_login" title="浜轰汉缃戠櫥褰�"></a></li>';
			html += '						 <li><a href="javascript:void(0);" id="dialog_WEIBOTX" class="login_ico_blog1 oauth_login" title="鑵捐寰崥鐧诲綍"></a></li>';
			html += '                        <li><a href="javascript:void(0);" id="dialog_ALIPAY" class="login_ico_alipay oauth_login" title="鏀粯瀹濈櫥褰�"></a></li>';
			html += '                    </ul>';
			html += '                </dd>';
			html += '            </dl>';
			html += '        </div>';
			html += '    </div>';
			html += '</div>';
			
			$("body").append(html);
			
			var  dw = document.documentElement.clientWidth;
			var  dh = $(document).height();
			
			$("#dialog_backdiv").css({
				'width' : dw+'px',
				'height' : dh+'px'
			});
			
			var oContent = document.getElementById("dialog_login_div");
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var l = (document.documentElement.clientWidth-oContent.offsetWidth)/2;
			var t = ((document.documentElement.clientHeight-oContent.offsetHeight)/2)+scrollTop;
			
			$("#dialog_login_div").css({
				'left' : l+'px',
				'top' : (document.documentElement.clientHeight-oContent.offsetHeight)/2+'px'
			});
			
			var isIE6= navigator.appVersion.indexOf("MSIE 6")>-1;
			var _top = document.documentElement.clientHeight-oContent.offsetHeight;
			if(isIE6){
				$(window).scroll(function(){
					var sc = document.documentElement.scrollTop;
					$("#dialog_login_div").css({
						'top' : (_top/2)+sc+'px'
					});
				});
			}
		},
		//鍩烘湰浜嬩欢
		baseEvent : function(){
			$("#dialog_colse").click(function(){
				$("#dialog_backdiv").remove();
				$("#dialog_login_div").remove();
			});
			
			this.setInputDefaultValue($("#dialog_phone"));
			this.setInputDefaultValue($("#dialog_pwd"));
			this.setInputDefaultValue($("#dialog_verifycode"));
			
			var Error_tip = $("#dialog_login_error");
			//澶勭悊鐢ㄦ埛鍚嶈緭鍏ユ牸寮�
			$("#dialog_phone").on("keyup focusin",function(){
				var T = $(this);
				var tmp = $(this).val();
				var p = dialogLogin.formartPhoneInput(T.val());
				(p == tmp || p == (tmp+' ')) ? '' : T.val(p);
				
				$(this).parent().parent().attr("class","right");
				Error_tip.parent().hide();
				Error_tip.html('');
			}).blur(function(){
				var v = $(this).val().replace(/[\s]/g, '');
				$(this).parent().parent().attr("class","");
			});
			
			//瀵嗙爜
			$("#dialog_pwd").on("keyup focusin",function(){
				$(this).parent().parent().attr("class","right");
				Error_tip.parent().hide();
				Error_tip.html('');
			}).blur(function(){
				var v = $(this).val();
				$(this).parent().parent().attr("class","");
			});
			
			//楠岃瘉鐮�
			$("#dialog_verifycode").on("keyup focusin",function(){
				$(this).parent().parent().attr("class","right");
				Error_tip.parent().hide();
				Error_tip.html('');
			}).blur(function(){
				var v = $(this).val();
				$(this).parent().parent().attr("class","");
			});
			
			//COOKIE鏈夋晥鏈�
			$("#ex_time").click(function(){
				($(this).attr("class") == 'cur') ? $(this).removeClass("cur") : $(this).addClass("cur");
			});
			//鍒锋柊楠岃瘉鐮�
			$(".input_yzms").click(function(){
				dialogLogin.flushImageCode($("#verify_image"));
			});
			
			if(dialogLogin.login_error_count >= 2 && dialogLogin.login_error_count <= 5){
				$("#dialog_verifycode").parent().parent().show();
			}else{
				$("#dialog_verifycode").parent().parent().hide();
			}
			
			//鍥炶溅鎻愪氦鐧诲綍
			$(document).keydown(function(event){
				
				if(event.keyCode == 13 && $("#dialog_button")){
					$("#dialog_button").focus();
				}
			});
			
			$("#dialog_button").click(function(){
				var flag = dialogLogin.checkLoginFromartInfo();
				if(flag == false){
					return false;
				}
				var login_info = {};
				login_info.phone = $("#dialog_phone").val().replace(/[\s]/g, '');
				login_info.pwd = $("#dialog_pwd").val();
				login_info.verify = $("#dialog_verifycode").val();
				login_info.expires = ($("#ex_time").attr("class") == 'cur') ? 30 : 1;
				dialogLogin.ajaxLogin(login_info, dialogLogin.callback_fun);
			});
		},
		//绗笁鏂圭敤鎴风櫥褰�
		unionLoginClick : function(callback){
			$(".oauth_login").click(function(){
				var app_name = $(this).attr("id").replace("dialog_","");
				var app = $(this);
				$.getScript(header_static_url+'www/default/js/union_login.js',function(){
					unionLogin.init(app_name, app, dialogLogin.location);
					if(callback != ''){
						callback();
					}
					
				});
				
			});
		},
		//鎵ц鐧诲綍
		ajaxLogin : function(login_info,callback){
			$.ajax({
				type      : "GET",
				url       : header_index_url+'account/logindo/',
				async     : false,
				dataType  : 'jsonp',   
				jsonp : "callback",
				data      : login_info,
				success   : function (result){
					if(result.success){
						var login_info = result.data;
						if(login_info.success){
							dialogLogin.login_error_count = 0;
							$("#dialog_backdiv").remove();
							$("#dialog_login_div").remove();
							if(typeof headerHtml === 'object'){
								headerHtml.init();
								if(dialogLogin.location == 'user'){
									if(dialogLogin.checkAccountLogin() == false && dialogLogin.checkUnionLogin !== false){
										window.location.href = 'http://www.zhuna.cn/account/bind/';
									}else{
										window.location.href = 'http://www.zhuna.cn/user/';
									} 
								}else if(dialogLogin.location.indexOf('zhuna.cn') != -1){
									window.location.href = dialogLogin.location;
								}
								
								if(callback != ''){
									callback();
								}
							}
						}else{
							dialogLogin.login_error_count = login_info.failed_count;
							dialogLogin.handleLoginFail(login_info);
							dialogLogin.flushImageCode($("#verify_image"));
							return false;
						}
					}
				}
			});
		},
		//澶勭悊鐧诲綍閿欒鐨勬儏鍐�(椤甸潰涓�)
		handleLoginFail : function(login_info){
			dialogLogin.setErrorTip('',login_info.error, false);
			if( (login_info.failed_count >= 2 && login_info.failed_count <= 5) || login_info.type=='last_login' ){
				$("#dialog_verifycode").parent().parent().show();
			}else{
				$("#dialog_verifycode").parent().parent().hide();
			}
		},
		//鎻愪氦鍓嶆鏌ユ暟鎹槸鍚︽纭�
		checkLoginFromartInfo : function(){
			var flag = true;
			var phone = $("#dialog_phone").val().replace(/[\s]/g, '');
			var pwd = $("#dialog_pwd").val();
			var code = $("#dialog_verifycode").val();

			flag = dialogLogin.getLoginError($("#dialog_phone"),dialogLogin.validatorTel,phone);
			if(flag == false){
				return flag;
			}
			
			flag = dialogLogin.getLoginError($("#dialog_pwd"),dialogLogin.validatorPassword,pwd);
			if(flag == false){
				return flag;
			}
			
			if(dialogLogin.login_error_count >= 2 && dialogLogin.login_error_count <= 5 ){
				flag = dialogLogin.getLoginError($("#dialog_verifycode"),dialogLogin.validatorImagecode,code);
				if(flag == false){
					dialogLogin.flushImageCode($("#verify_image"));
					return flag;
				}else{
					flag = dialogLogin.getLoginError($("#dialog_verifycode"),dialogLogin.validatorImagecodeType,code);
					if(flag == false){
						dialogLogin.flushImageCode($("#verify_image"));
						return flag;
					}
				}
			}
			
			return flag;
		},
		init : function(location,callback){
			if(this.checkAccountLogin() == false && this.checkUnionLogin() == false){
				
			}else{
				return true;
			}
			
			if(location == ''){
				location = 'user';
			}
			this.location = location;
			this.callback_fun = callback;
			this.createTopDiv();
			this.createLoginDiv();
			this.baseEvent();
			this.unionLoginClick(callback);
		},
		//鍒ゆ柇鏄惁鐧诲綍锛屽鏋滅櫥褰曠洿鎺ヨ繑鍥濼RUE
		//妫€鏌ョ敤鎴风櫥褰�
		checkAccountLogin : function(){
			var account_logininfo = {
					username : '',
					nickname : '',
					userid   : ''
			}
			
			account_logininfo.username = $.cookie('ZhuNaUserName');
			account_logininfo.nickname = $.cookie('ZhuNaNickName');
			account_logininfo.userid   = $.cookie('ZhuNaUserID');
			
			if(account_logininfo.username == '' || account_logininfo.nickname == '' || account_logininfo.userid <= 0){
				return false;
			}else{
				return account_logininfo;
			}
		},
		//妫€鏌ョ涓夋柟鐧诲綍
		checkUnionLogin : function(){
			var union_logininfo = {
				aouth_token : '',
				aouth_id : '',
				nickname : ''
			};
			
			union_logininfo.aouth_token = $.cookie('oauth_token');
			union_logininfo.aouth_id = $.cookie('oauth_id');
			union_logininfo.nickname = $.cookie('ZhuNaNickName');
			
			if(union_logininfo.aouth_token == '' || union_logininfo.aouth_id <= 0 || union_logininfo.nickname == ''){
				return false;
			}else{
				return union_logininfo;
			}
		},
		//浠ヤ笅涓哄叕鐢� 鐨勬柟娉曟嬁鍒拌繖閲屼娇鐢紝涓轰簡涓嶅姞杞藉涓枃浠� 銆傘€傘€�
		//鏍煎紡鍖栧墠鍙拌緭鍏ユ鏄剧ず鐨勭數璇濆彿鐮�
		formartPhoneInput : function(phone_num){
			phone_num = phone_num.replace(/[\s]/g, '');
			phone_num = phone_num.replace(/[^\d]/g, "");
			phone_num = $.trim(phone_num.substring(0,3)+' '+phone_num.substring(3,7)+' '+phone_num.substring(7,11));
			
			return phone_num;
		},
		//璁剧疆INPUT妗嗛粯璁ゅ€�
		setInputDefaultValue : function(obj){
			var N = obj.next();
			N.click(function(){
				obj.focus();
			});
			
			obj.focus(function(){
				N.hide();
			});
			
			obj.blur(function(){
				obj.val() == '' ? N.show() : N.hide();
			});
		},
		//鍒锋柊鍥剧墖楠岃瘉鐮�
		flushImageCode : function(obj){
			obj.attr("src",header_index_url+"account/verifyimg/?t=ajax_verify&r="+Math.random());
		},
		//閿欒鎻愮ず淇℃伅
		error_message : '',
		//妫€楠屽瘑鐮�
		validatorPassword : function(password){
			var strP = /\s/;
			if(password ==  ''){
				dialogLogin.error_message = '璇疯緭鍏ュ瘑鐮�';
	            return false;
			} else if(strP.test(password)==true){
				dialogLogin.error_message = '瀵嗙爜璇峰嬁浣跨敤绌烘牸';
	            return false;
			} else if(password.length<6){
				dialogLogin.error_message = '瀵嗙爜澶煭浜嗭紝鏈€灏�6浣嶃€�';
	            return false;
			} else if(password.length>16){
				dialogLogin.error_message = '瀵嗙爜澶暱浜嗭紝鏈€澶�16浣嶃€�';
	            return false;
			}else{
				dialogLogin.error_message = '';
				return true;
			}
		},
		//妫€楠屾墜鏈哄彿
		validatorTel : function(tel){
			var strP = /^1([3]|[5]|[8]|[4]|[7]){1}[0-9]{9}$/;
			if(tel == ''){
				dialogLogin.error_message = '璇疯緭鍏ユ墜鏈哄彿鐮�';
	            return false;
			} else if(strP.test(tel)==false){
				dialogLogin.error_message = '鎵嬫満鍙风爜鏍煎紡涓嶆纭�';
	            return false;
			}else{
				dialogLogin.error_message = '';
				return true;
			}
		},
		//楠岃瘉鐮佹牸寮�
		validatorImagecode : function(imagecode){
			var strP = /^[0-9a-zA-Z]{4}/;
			if(imagecode == ''){
				dialogLogin.error_message = '璇疯緭鍏ラ獙璇佺爜';
	            return false;
			} else if(strP.test(imagecode)==false){
				dialogLogin.error_message = '楠岃瘉鐮佹牸寮忎笉姝ｇ‘';
	            return false;
			}else{
				dialogLogin.error_message = '';
				return true;
			}
		},
		//楠岃瘉鍥剧墖楠岃瘉鐮佹槸鍚︽纭�
		validatorImagecodeType : function(imagecode){
		 	var url = header_index_url+"index.php?m=account.checkVerifyCode";
		 	var result;
		 	$.ajax({
		 		type    : "POST",
		 		url     : url,
		 		async   : false,
		 		dataType  : 'json',
		 		data    : {verifycode:imagecode,t:'ajax_verify'},
		 		success : function(data){
		 			result = data;
		 		}
		 	});
		 	if(result.success === true){
		 		dialogLogin.error_message = '';
					return true;							
				} else {
					dialogLogin.error_message = result.message;
					return false;
					}
		},
		//璁剧疆鏍奸」鍊兼牸寮忛敊璇彁绀�
		getLoginError : function(obj,fun_name,value){
			var flag = false;
			flag = fun_name(value);
			dialogLogin.setErrorTip(obj,dialogLogin.error_message, flag);
			return flag;
		},
		//璁剧疆鏍奸」鍊兼牸寮忛敊璇彁绀�
		setErrorTip : function(obj,message,ishide){
			var E = $("#dialog_login_error");
			if(ishide === false){
				if(obj != ''){
					obj.parent().parent().attr("class","wrong");
				}
				E.html(message).parent().show();
			}else{
				if(obj != ''){
					obj.parent().parent().attr("class","");
				}
				E.html('').parent().hide();
			}
		}
};/**
 * 澶撮儴JS
 */
var headerHtml = {
		ref_flag : false,
		init : function(){
			this.isLogin();
			this.baseEvent();
			this.choseNav();
            $.cookie("version",null,{path: '/',expires:0});
		},
		flag : false,
		//澶勭悊澶撮儴瀵艰埅閫変腑闂
		choseNav : function(){
			$(".nav_url").remove('cur');
			var url = window.location.href;
			var host = window.location.host;
			
			if(host.indexOf('www.zhuna.cn') != -1){
				url = url.replace("#",'');
				if(url == 'http://www.zhuna.cn/' || url == 'http://demo.www.zhuna.cn/' || url == 'http://zhuqiang.dev.www.zhuna.cn/'){
					$(".nav_url").eq(0).addClass("cur");
				}else if(url.indexOf('pinpai/') != -1){
					$(".nav_url").eq(3).addClass("cur");
				}else if(url.indexOf('hotel/') != -1 && url.indexOf('-hotel') == -1){
					$(".nav_url").eq(1).addClass("cur");
				}else{
					$(".nav_url").remove('cur');
				}
			}else if (host.indexOf('kezhan.zhuna.cn') != -1){
				$(".nav_url").eq(4).addClass("cur");
			}else if (host.indexOf('duanzu.zhuna.cn') != -1 && url.indexOf('order') == -1){
				$(".nav_url").eq(5).addClass("cur");
			}else if (host.indexOf('dujia.zhuna.cn') != -1 && url.indexOf('order') == -1){
				$(".nav_url").eq(2).addClass("cur");
			}else{
				$(".nav_url").remove('cur');
			}
			
		},
		//鍩烘湰浜嬩欢
		baseEvent : function(){
			$(".myorder").hover(function(event){
				if(!$(".myorder_list").is(':animated')){
					$(this).addClass("myordercur");
					$(".myorder_list").slideDown();
				}
			},function(event){
				//if(!$(".myorder_list").is(':animated')){
					$(this).removeClass("myordercur");
					$(".myorder_list").slideUp();
				//}	
			});
			
			$(".myorder_list>ul>li>a").click(function(){
				var purl = $(this).attr("tourl");
				if(headerHtml.isLogin('flag')){
					if(headerHtml.checkAccountLogin() == false && headerHtml.checkUnionLogin !== false){
						window.location.href = header_index_url+'account/bind/?purl='+purl;
					}else{
						window.location.href = purl;
					} 
				}else{
					dialogLogin.init(purl);
					return false;
				}
			});
			
			$(document).on("click","#heaer_user_name",function(){
				var purl = $(this).attr("tourl");
				
				if(headerHtml.checkAccountLogin() == false && headerHtml.checkUnionLogin !== false){
					window.location.href = header_index_url+'account/bind/?purl='+purl;
				}else{
					window.location.href = purl;
				}
			});

			//鎼滅储涓嬫媺妗� 
			$('.searchtext').uedDistrict({
				id : 'searchtext',
				inputWidth : $('.topsearch').width()-2,
				inputleft : 2,
				inputTop : 1,
				newRule : true,
				tipAutoHide : true,
				cityPick_forbidden : true,
				inputUrl : 'http://kezhan.zhuna.cn/api/top/select',
				onSelect_input:function(type,cityId,sourceId,str,cityName){
					if(cityId <= 0){
						cityId = $.cookie('cityId');
					}
					$.cookie('cityId',cityId,{
							expires: 1,
							path: '/',
							domain: 'zhuna.cn'
					});
					$.cookie('city',cityName,{
						expires: 1,
						path: '/',
						domain: 'zhuna.cn'
					});
					$("#head_search_flag").val(1);
					$("#head_ecity_id").val(cityId);
					$("#head_source_id").val(sourceId);
					$("#head_type_id").val(type);
					$("#head_query").val(str);
					headerHtml.flag = true
//					$("#keyWords").uedHotSearch('changeCity',cityId);
				}
			});
			//妗嗘悳鎸夐挳
			$("#head_searchResult").click(function(){
				var q = $("#head_query").val().replace(/[\s]/g, '');
				var flag = $("#head_search_flag").val();
				
				if(q == '鍩庡競銆佹爣蹇楃墿銆侀厭搴楀悕绉般€佸搧鐗屻€佸湴鍧€'){
					q = '';
				}
				
				if(q == ''){
					$("#head_query").val('鍩庡競銆佹爣蹇楃墿銆侀厭搴楀悕绉般€佸搧鐗屻€佸湴鍧€');
					alert("璇疯緭鍏ユ悳绱㈠叧閿瓧");
					return false;
				}else if(flag == 1){
					var ecityid = $("#head_ecity_id").val();
					var typeid = $("#head_type_id").val();
					var source_id = $("#head_source_id").val();
					var query_str = headerHtml.handleInputValue(typeid,source_id);
					var url = header_index_url+'hotellist.html?ecityid='+ecityid+'&'+query_str;
					window.location.href =  url;
				}else{
					$("#searchResult_form").submit();
				}
			});
			
			//鍥炶溅鎻愪氦鎼滅储
			$(document).keydown(function(event){
				var $target = $(event.target);
				
				if(event.keyCode == 13 && $target.is('#head_query')){
					$("#head_searchResult").click();
				}
			});
			
			$(".seabus_des,.seacity_des,.searchResult_li").hover(function(){
				$(this).addClass("cur");
			},function(){
				$(this).removeClass("cur");
			});
			
			//鏄剧ず澶撮儴寰俊
			$(".weixin").hover(function(){
				$("#showweixin").show();
			},function(){
				$("#showweixin").hide();
			});
		},
		handleInputValue : function(type,value){
			var query_str = '';
			//type_id  '鍒嗙被ID锛�1锛氬煄甯傦綔2锛氳鏀垮尯锝�3锛氬晢涓氬尯锝�4锛氳繛閿侊綔5锛氶厭搴楋綔6锛氬湴鏍嘯鏅尯锝滄満鍦猴綔鐏溅绔欙綔瀛︽牎]锛�'
			if(type == 6){
				//鍦版爣
				query_str = 'mapbarid='+value;
			}else if(type == 3 ){
				//鍟嗕笟鍖�
				query_str = 'cbdid='+value;
			}else if (type == 2){
				//琛屾斂鍖�
				query_str = 'areaid='+value;
			}else if(type == 4){
				query_str = 'lsid='+value;
			}else if (type == 5){
				//閰掑簵
				query_str = 'hid='+value;
			}
			return query_str;
		},
		isLogin : function(type){
			//鐧诲綍鏈変袱绉嶏紝涓€绉嶆槸绗笁鏂圭櫥褰曠殑锛屼竴绉嶆槸浣忓摢鐢ㄦ埛鐧诲綍鐨�
			var logininfo = this.checkAccountLogin();
			
			if(logininfo){
				
			}else{
				logininfo = this.checkUnionLogin();
			}
			
			if(logininfo){
				var now_url = window.location.href;
				if(now_url.indexOf('/account/') != -1 && now_url.indexOf('/bind/') < 0 && now_url.indexOf("success") < 0){
					window.location.href = header_index_url;
					return false;
				}

				if(type == 'flag'){
					return true;
				}else{
					var name = (logininfo.nickname) ? logininfo.nickname : logininfo.username.substr(0,3)+'****'+logininfo.username.substr(7,4);
					this.loginHtml(true,name,logininfo.userid,logininfo.userheader);
				} 
			}else{
				if(type == 'flag'){
					return false;
				}else{
					this.loginHtml(false, '', '','');
				}				
			}
			return false;
		},
		//妫€鏌ョ敤鎴风櫥褰�
		checkAccountLogin : function(){
			var account_logininfo = {
					username : '',
					nickname : '',
					userid   : ''
			}
			
			account_logininfo.username = $.cookie('ZhuNaUserName');
			account_logininfo.nickname = $.cookie('ZhuNaNickName');
			account_logininfo.userid   = $.cookie('ZhuNaUserID');
			account_logininfo.userheader   = $.cookie('ZhuNaHeadAvater');
			
			if(account_logininfo.username == '' || account_logininfo.userid <= 0){
				return false;
			}else{
				return account_logininfo;
			}
		},
		//妫€鏌ョ涓夋柟鐧诲綍
		checkUnionLogin : function(){
			var union_logininfo = {
				aouth_token : '',
				aouth_id : '',
				nickname : ''
			};
			
			union_logininfo.aouth_token = $.cookie('oauth_token');
			union_logininfo.aouth_id = $.cookie('oauth_id');
			union_logininfo.nickname = $.cookie('ZhuNaNickName');
			union_logininfo.userheader   = '';
			
			if(union_logininfo.aouth_token == '' || union_logininfo.aouth_id <= 0 || union_logininfo.nickname == ''){
				return false;
			}else{
				return union_logininfo;
			}
		},
		//缁勮鐧诲綍妯″潡鐨凥TML
		loginHtml : function(flag,nickname,userid,header_img){
			var now_url = window.location.href;
			var html = '';
			var out_type = '';
			
			if(now_url.indexOf("dujia.zhuna.cn/myorder.html") != -1 || now_url.indexOf("dujia.zhuna.cn/mycoupon.html") != -1 || now_url.indexOf("dujia.zhuna.cn/mycoupon.html") != -1) {
				out_type = 'dujia';
			}

			if(flag){
				if(now_url.indexOf('/account/') != -1 ){
					html += '<p class=" f_right"></p>';
				}else{
					html += '<p class="f_right login_over">';
					if(userid > 0 && header_img != '' && header_img != null && header_img != undefined){
						if(thumb_url == null || thumb_url == '' || thumb_url == undefined){
							var thumb_url = 'http://img.klz.znimg.com/thumb/';
						}
						url = thumb_url+'za_30x30/'+header_img+'.jpg';
					}else if(userid > 0){
						url = 'http://www.zhuna.cn/dianping/static/upload/user_info/'+userid%412+'.jpg';
					}else{
						url = 'http://tp1.znimg.com/v5/user/default_head.jpg';
					}
					html += '<img src="'+url+'" width="25" height="25" />';
					html += '<em><a id="heaer_user_name" href="javascript:void(0);" tourl="http://www.zhuna.cn/user/">'+nickname+'</a></em> <span>|</span><a href="'+header_index_url+'account/loginout/?type='+out_type+'">閫€鍑�</a></p>';
				}
			}else{
				if(now_url.indexOf('/account/') == -1){
					html += '<p class=" f_right"><a class="cursor" id="header_login">鐧诲綍</a><span>|</span><a href="'+header_index_url+'account/register/">娉ㄥ唽</a></p>';
				}else{
					html += '<p class=" f_right"></p>';
				}
			}
			
			$("#login_html").html(html);
			
			$("#header_login").click(function(){
				if(headerHtml.ref_flag){
					dialogLogin.init(window.location.href,'');
				}else{
					dialogLogin.init('ajax','');
				}
				
			});
		}
};

headerHtml.init();
var ntalkObj = {
	setNtalk : function(){
		window.ntalker_connected = false;
		window.ntalker_opened = false;
		
		var uid = '', uname = '', orderid = '', itemid = '', order_price, ntalker_cid = $.cookie('NTKF_T2D_CLIENTID');
		
		if ($.cookie('ZhuNaUserName') != null && $.cookie('ZhuNaUserID') != null && $.cookie('ZhuNaUserName') != "" && $.cookie('ZhuNaUserID') != "") {
			uid = $.cookie('ZhuNaUserName') + '-' + $.cookie('ZhuNaUserID');
			uname = $.cookie('ZhuNaNickName');
		}
		
		//鍚勪釜椤甸潰鐨勫弬鏁�
		if ($('#order_id').val()) {
			orderid = $('#order_id').val();
		}
		if ($('#orderprice').val()) {
			order_price = $('#orderprice').val();
		}

		if ($('#hotelid').val()) {
			itemid = $('#hotelid').val();
		}
		
		window.NTKF_PARAM = {
				siteid : "kf_9937",
				settingid : "kf_9937_1376374260976",
				itemid : itemid,
				uid : uid,
				uname : uname,
				orderid : orderid,
				orderprice : order_price
		};
		
		//ntalker鑱婄獥閫氱煡閫夐瀷椤鹃棶鎸夐挳鑱婄獥鐘舵€佸彉鍖�
		//status: 1锛氳亰绐楁墦寮€锛�2锛氳亰绐楁渶灏忓寲锛�3锛氳亰绐楀叧闂�
		window.ntcall_onChatWindowStatus = function(status) {

			switch(status) {
				case 1:
					window.ntalker_opened = true;
					break;
				case 2:
					window.ntalker_opened = true;
					break;
				case 3:	
				window.ntalker_opened = false;
					break;
				case 4:
					window.ntalker_connected = true;
					if ( typeof window.ntcall_orderError != 'undefined' && window.ntcall_orderError != null && window.ntcall_orderError.length > 0) {
						send_message(window.ntcall_orderError);
					}
					break;
				case 5:
					window.ntalker_connected = false;
					break;
				default:
					break;
			}
		}
		
		window.ntcall_openInPageChat = function(settingid) {

			if ( typeof NTKF == "object" && typeof NTKF.im_openInPageChat == "function") {
				NTKF.im_openInPageChat(settingid);
			}
		}
	},
	//鍒ゆ柇椤甸潰鏉ユ簮
	init : function(){
		this.setNtalk();
		//鍥藉唴鐢ㄦ埛缁�
		window.NTKF_PARAM.settingid = 'kf_9937_1376374260976';

		if (/\/v5\/order\/post2\.php/.test(document.URL)) {
			//璁㈠崟鎿嶅け璐ョ骇
			//window.NTKF_PARAM.settingid = 'kf_9937_1370770477672'
		}

		if (/http:\/\/duanzu\.zhuna\.cn/.test(document.URL)) {
			//鐭閰掑簵
			window.NTKF_PARAM.settingid = 'kf_9937_1376374340234'
		}
		
		if ($(document).off == undefined) {
			$('#bottom_float_service,#bottom_float_kefu,#duanzu_service,.kfdh_kf,#order_service').unbind('click').bind('click', function() {
				window.ntcall_openInPageChat(window.NTKF_PARAM.settingid);
			})
		} else {
			$(document).off('click', '#bottom_float_servece,#bottom_float_kefu,#duanzu_service,.kfdh_kf,#order_service').on('click', '#bottom_float_service,#bottom_float_kefu,#duanzu_service,.kfdh_kf,#order_service', function() {
				window.ntcall_openInPageChat(window.NTKF_PARAM.settingid);
			})
		}

		if (document.getElementById('_ntalker_script') == null) {
			(function() {
				var ga = document.createElement('script');
				ga.type = 'text/javascript';
				ga.async = true;
				//ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'download.ntalker.com/zhuna/ntkfstat.js?r='+Math.random();
                ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'download.ntalker.com/zhuna/ntkfstat.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ga, s);
			})();
		}
		
		if (/\/v5\/order\/post2\.php/.test(document.URL)) {
			//璁㈠崟鑷姩鍜ㄨ
			//window.ntcall_openInPageChat(window.NTKF_PARAM.settingid);
		}
	}
};

ntalkObj.init();/**
 * 澶撮儴JS
 */
var footerHtml = {
		//宸︿晶璺濈
		maginLeft : 130,
		//寤惰繜鏄剧ず鏃堕棿 
		delay : 1000,
		//鍒版寚瀹氶珮搴︽椂鏄剧ず
		isH : 200,
		//鍒版寚瀹氫綅缃樉绀哄洖鍒伴《閮ㄦ寜閽�
		isGoToTop : 700,
		//璺濈搴曢儴鐨勯珮搴�
		marginBottom : 70,
		//榛樿鎸囧畾鐨凚ODY瀹藉害
		bodyWidth : 990,
		//灏忓睆骞曟椂
		smallScreen : 1024,
		//鍥炲埌椤堕儴鐨勯€熷害
		gotopSpeed : 500,
		//涓嶅悓鐗堟湰鐨勫唴瀹�
		str : '',
		//鏄惁鏄剧ず寰俊
		showweixin : '',
		//鏄惁鏄皬灞忓箷
		isSmall : '',
		//鏄剧ず鐗堟湰鍐呭 1涓虹涓€鐗堬紝2涓虹浜岀増
		versionHtml : 2,
		//鏄剧ず鍝釜鐗堟湰鐨勫姩鐢� 2涓轰笉杩涘叆body锛屽叾瀹冩槸鍚慴ody婊戝叆
		versionAction : 2,
		//璁块棶鍦板潃
		SERVER_URL : 'http://www.zhuna.cn/popup',
		open53kf : '',
		isIE : false,
		isIE6 : false,
		city : ["beijing","shanghai","guangzhou","hangzhou","chengdu","xiamen","xian","shenzhen","nanjing","chongqing","wuhan","lijiang","sanya","suzhou","qingdao","changsha","shenyang","tianjin","dalian","xitang","haerbin","zhengzhou","jinan","dongguan","kunming","hefei","ningbo","wuxi","zhoushan","nanning","nanchang","shijiazhuang","huangshan","guiyang","foshan","taiyuan","yangshuo","zhuhai","changzhou","wulumuqi","dali","changchun","fenghuang","guilin","fuzhous","haikou","huhehaote","xianggang","yinchuan","yantai","yangzhou","zhangjiajie","lanzhou","luoyang","beihai","xining","weihai","xishuangbanna","nantong","lasa","wuyuan","yiwu","yichang","zhongshan","taian","kunshan","xuzhou","rizhao","qinhuangdao","tengchong","xichang","weifang","linyi","beidaihe","zibo","tangshan","wuhu","chengde","baotou","mianyang","yangjiang","huaian","jiaxing","qiandaohu","kaifeng","jiujiang","hengyang","ganzhou","baoding","qingyuan","dunhuang","handan","jiaozuo","yingkou","langfang","jinhua","tongli","leshan","zhuzhou","jilin","jinzhou","manzhouli","bangbu","daqing","shangraoshi","yanan","dandong","yueyang","xianyang","putian","yanji","anyang","huashan","shangqiu","heze","jiamusi","linzhi","qiqihaer","huludao","chaohu","jian","fushun","huangshi","panjin","luzhou","nanchong","chizhou","tongren","tieling","jinzhong","nanjingxian","langzhong","nandaihe","mohe","machengshi","yanzhou","liaoyang","huanggang","weinanshi","wujiang","xingcheng","chunshi","sanming","xiaogan","akesu","changle","xinganxian","yichun","daocheng","alashan","pingnanxian","wuanshi","lijiangshi","yakeshishi","tashikuergantajikezizhixian","yanbian","aba","gaoyoushi","zhongmouxian"],
		//鐗堟湰1鐨凥TML
		versionOneHtml : function(t,u,o){
			var html = '';
			html += '<div id="bottom_float" style="bottom:'; + this.marginBottom + 'px;position: fixed;display:none;" class="floatbox">';
			html += '<ul><li p="1" style="display:none;" class="suggest float1" t="0"><a></a></li>';
			html += '<li p="3" style="display:none;" t="0" class="gotop float3"><a></a></li>';
			html += '</ul>';
			html += '</div>';
			this.str = html;
		},
		//鐗堟湰2鐨凥TML
		versionTwoHtml : function(t,u,o){
			var html = '';
			html += '<div  class="floatbox" style="bottom: '+this.marginBottom+'px; position: fixed;" id="bottom_float">';
			html += '<ul>';
			html += '<li   class="suggest float4" p="4" t="0" title="鍙嶉" style="display: list-item;"><a class="cursor">鍙嶉</a></li>';
			html += '    <li p="6" t="0" w="w" style="display: list-item;" title="鐣欒█" class="weibo float6"><a class="cursor">鐣欒█</a></li>';
			html += '    <li p="7" t="0" style="display: list-item;" class="gotop float7" title="杩斿洖椤堕儴"  ><a class="cursor">杩斿洖椤堕儴</a></li>';
			html += '</ul>';
			html += '<div class="quickmark" style="display: none;"> <img src="'+header_static_url+'www/default/images/weixin_pic.jpg" />';
			html += '<dl>';
			html += '        <dt>鎮ㄧ殑闅忚韩閰掑簵棰勮涓撳</dt>';
			html += '        <dd>鎵竴鎵紝鍔犳垜寰俊濂藉弸鍝︼紒</dd>';
			html += '    </dl>';
			html += '    </div>';
			html += '</div>';
			
			this.str = html;
		},
		//灞忓箷浣庝簬鏈€灏忓垎杈ㄧ巼鐨勬儏鍐典笅
		versionSmallHtml : function(t,u,o){
			var html = '';
			html += '<div id="bottom_float" style="bottom: ' + this.marginBottom + 'px; position: fixed;display:none;" class="new_sidebar">';
			html += '<li p="9" style="cursor: pointer;display:none;" class="gotop float9"><a></a></li>';
			html + '</ul></div>';
			this.str = html;
		},
		//鍒ゆ柇鏄剧ず鍝釜鐗堟湰鐨勫彸渚ф诞鍔�
		getData : function(t,u,o){
			if(this.versionHtml == 1){
				this.versionOneHtml(t, u, o);
			}else if(this.versionHtml == 2){
				this.versionTwoHtml(t, u, o);
			}
			
			if(screen.width <= this.smallScreen){
				this.versionSmallHtml(t, u, o);
				this.isSmall = this.smallScreen;
			}
		},
		setTimeoutFunction : function(){
			var t_str = footerHtml.str;
			$('body').append(t_str);
			
			//鍒ゆ柇鏄摢涓増鏈殑鍔ㄧ敾
			footerHtml.selectAction();
			
			if(footerHtml.isH < 1){
				footerHtml.isH = -1;
			}
			
			footerHtml.setBottomFloat();
			footerHtml.checkServece();
			footerHtml.bindEvent();
		},
		//缁戝畾浜嬩欢
		bindEvent : function(){
			window.onresize = function() {
				footerHtml.selectAction();
			};
			
			//缁戝畾灞忓箷鏀瑰彉澶у皬
			$(window).on("scroll", function() {
				footerHtml.setBottomFloat();
			});
			
			//缁戝畾杩斿洖椤跺眰
			$('.gotop').on('click', function() {
				var obj = $(this);
				setTimeout(function() {
					obj.hide();
				}, footerHtml.gotopSpeed);
				
				var windowH = window.screen.availHeight;
				var topi = parseInt(parseInt(windowH)/10);
				$("html,body").animate({
					scrollTop : topi
				}, footerHtml.gotopSpeed);
				var settime2 = '';
				var sudo = 10;
				
				setTimeout(function(){
					settime2 = setInterval(function(){
						if(topi >= 0){
							$(document).scrollTop(topi);
							if(topi <= 0)
								clearInterval(settime2);
							topi = topi-sudo;
							if(topi < 1)
								topi = 0;
							if(sudo > 5)
								sudo--;
							else
								sudo = 5;
						}
						else
							clearInterval(settime2);
					}, 100);
					}, footerHtml.gotopSpeed - 100);
			});
			
			//榧犳爣浜嬩欢
			$('#bottom_float ul li').each(function() {
				var obj = $(this);
				obj.on('mouseover', function() {
					footerHtml.addFloatHover(obj);
				});
				obj.on('mouseout', function() {
					footerHtml.delFloatHover(obj);
				});
			});
			
			//鍙嶉浜嬩欢
			$("#bottom_float .suggest,#bottom_float_custom").on('click', function() {
				if ( typeof ($('.boxTitle[box="_boxTitle"] span').html()) == "undefined" || $('.boxTitle[box="_boxTitle"] span').html() != "鍏抽棴") {
					var isIE6= navigator.appVersion.indexOf("MSIE 6")>-1;
					var p = isIE6 ? 'absolute' : 'fixed';
					var html = '';
					html += '<div style="display:block;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;position:'+p+';background:#000;z-index:999999;top:0;left:0;opacity:0.7;" id="dialog_backdiv"></div>';
					$("body").append(html);
					
					var t = 1;//鍙嶉绫诲瀷
					var u = location.href;
					$(this).uedPopWin( {
						width : 700,
						height : 400,
						autoOpen : true,
						title : '鎰忚鍙嶉',
						closeWhileClickOtherArea : false,
						html : footerHtml.SERVER_URL + "/suggest?u=" + u + "&t=" + t
					});
					
					var  dw = document.documentElement.clientWidth;
					var  dh = $(document).height();
					
					$("#dialog_backdiv").css({
						'width' : dw+'px',
						'height' : dh+'px'
					});
					return false;
				}
			});

			$(document).on("click",".winclose",function(){
				$("#dialog_backdiv").remove();
			});
		},
		//榧犳爣绉诲叆鐨勬牱寮�
		addFloatHover : function(obj){
			if (obj.attr('w') == 'w') {
				clearTimeout(this.showweixin);
				this.showweixin = setTimeout(function() {
					$('#bottom_float .quickmark').show();
				}, footerHtml.gotopSpeed - 200);
			}
			obj.addClass('float' + obj.attr('p') + 'hover');
		},
		//榧犳爣绉诲嚭鐨勬牱寮�
		delFloatHover : function(obj){
			if (obj.attr('w') == 'w') {
				clearTimeout(this.showweixin);
				this.showweixin = setTimeout(function() {
					$('#bottom_float .quickmark').hide();
				}, footerHtml.gotopSpeed - 200);
			}

			obj.removeClass('float' + obj.attr('p') + 'hover');
		},
		//鑾峰彇浜哄伐鍦ㄧ嚎瀹㈡湇
		checkServece : function(){
			$('#bottom_float .servece,#bottom_float_kefu').attr('t', '1');
			ntalkObj.init();
		},
		//璁剧疆鍏冪礌娴姩
		setBottomFloat : function(){
			var ww = document.body.clientWidth;
			var fw = this.getLeftNum(ww);
			if (this.isIE6 && screen.width > smallScreen) {
				if (fw < 1075) {
					$('#bottom_float').fadeOut("slow");
					return;
				} else
					$('#bottom_float').fadeIn("slow");
			}
			var t = this.setScrollTop();
			this.setIE6top(t);
			var servece = $('#bottom_float .servece');
			if (servece.attr('t') == 1) {
				if (t > this.isH){
					servece.fadeIn("slow");
				}else{
					servece.fadeOut("slow");
				}
			} else{
				servece.fadeOut("slow");
			}

			
			if (t > this.isH) {
				$('#bottom_float').fadeIn("slow");
				$('#bottom_float .suggest').fadeIn("slow");
				$('#bottom_float .weibo').fadeIn("slow");
			} else {
				$('#bottom_float .suggest').fadeOut("slow");
				$('#bottom_float .weibo').fadeOut("slow");
			}
			//濡傛灉婊氬姩鏉＄殑楂樺湪200浠ヤ笂鏄剧ず娴姩灞傦紝鍚﹀垯闅愯棌
			if (t > this.isGoToTop){
				$('#bottom_float .gotop').fadeIn("slow");
			}else{
				$('#bottom_float .gotop').fadeOut("slow");
			}
			
			if (this.versionAction == 2){
				this.setActionTow();
			}else{
				this.setActionOne();
			}
		},
		//鑾峰彇婊氬姩鏉′綅缃�
		setScrollTop : function(){
			var t;
			if ( typeof window.pageYOffset != 'undefined') {
				t = window.pageYOffset;
				//Netscape
			} else if ( typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
				t = document.documentElement.scrollTop;
				//Firefox銆丆hrome
			} else if ( typeof document.body != 'undefined') {
				t = document.body.scrollTop;
				//IE
			}
			return t;
		},
		//濡傛灉鏄疘E6,璁剧疆postion涓篴bsolute
		setIE6top : function(t){
			if(this.isIE6){
				var hg = parseInt(document.documentElement.clientHeight) - parseInt($('#bottom_float').height()) - parseInt(this.marginBottom);
				$('#bottom_float').css({
					'top' : t + hg + "px",
					'position' : 'absolute'
				});
			}
		},
		//閫夋嫨鍔ㄧ敾鐗堟湰
		selectAction : function(){
			if(this.versionAction == 2){
				this.setActionTow();
			}else{
				this.setActionOne();
			}
		},
		//璁剧疆鐗堟湰2鐨勫姩鐢�
		setActionTow : function(){
			var ww = document.body.clientWidth;
			var fw = this.getLeftNum(ww);
			
			if (this.isSmall == this.smallScreen) {
//				this.bodyWidth = $('#bottom_float').width();
				$('#bottom_float').css({
					'left' : ww - fw + 'px'
				});
				return;
			}
			
			if (this.isIE6) {
				if (fw < 1075) {
					$('#bottom_float').fadeOut("slow");
					hideBottom_Float($('#bottom_float'));
					return;
				} else
					$('#bottom_float').fadeIn("slow");
			}
			
			$('#bottom_float').css({
				'left' : fw
			});
		},
		//杩斿洖LEFT鍊�
		getLeftNum : function(ww){
			if (this.isSmall == this.smallScreen) {
				return $('#bottom_float').width();
			}
				
			var w = parseInt(parseInt((parseInt(ww) - parseInt(this.bodyWidth)) / 2));
			var t_left = parseInt(parseInt(w) + parseInt(parseInt(this.bodyWidth) + parseInt(this.maginLeft)));
			return t_left;
		},
		//璁剧疆鐗堟湰1鐨勫姩鐢�
		setActionOne : function(){
			var ww = document.body.clientWidth;
			var fw = this.getLeftNum(ww);
			var bfw = parseInt($('#bottom_float').width());
			if (this.isSmall == this.smallScreen) {
//				this.bodyWidth = $('#bottom_float').width();
				$('#bottom_float').css({
					'left' : ww - fw + 'px'
				});
				return;
			}
			
			if (fw < parseInt(this.bodyWidth) + parseInt(this.maginLeft) * 2 + parseInt(bfw))
				fw = parseInt(ww) - parseInt(bfw);
			if (this.isIE6 && fw < parseInt(this.bodyWidth) + parseInt(1)) {
				$('#bottom_float').css({
					'left' : 'auto',
					'right' : '0px'
				});
				return;
			}
			$('#bottom_float').css({
				'left' : fw
			});
		},
		/**
		 * 璇存槑锛氱櫨鍒嗙偣鏁版嵁
		 */
		/*
		baifendian : function(){
			window["_BFD"] = window["_BFD"] || {};

			_BFD.client_id = (document.URL.indexOf('demo.www') == -1 ? 'Czhunawang' : 'Ctest_zhunawang');

			_BFD.script = document.createElement("script");
			_BFD.script.type = "text/javascript";
			_BFD.script.async = true;
			_BFD.script.charset = "utf-8";
			_BFD.script.src = (('https:' == document.location.protocol ? 'https://ssl-static1' : 'http://static1') + '.baifendian.com/service/zhunawang/zhunawang_new.js?2014');
			document.getElementsByTagName("head")[0].appendChild(_BFD.script);
		},
		//璁板綍agent_id,unionid,绛�
		request : function(paras){
			var url = location.href; 
			
			var split_1  = url.indexOf("?");
			var split_2  = url.indexOf("#")
			
	        var paraString = url.substring((split_1==-1?split_2:split_1)+1,url.length).split("&"); 
	        var paraObj = {} 
	        for (i=0; j=paraString[i]; i++){ 
	        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	        } 
	        var returnValue = paraObj[paras.toLowerCase()]; 
	        if(typeof(returnValue)=="undefined"){ 
	        return ""; 
	        }else{ 
	        return returnValue; 
	        }
		},
		cps : function(){
			var uid = $.trim(this.request("uid"));
			var agent_id = $.trim(this.request("agent_id"));
			var zn_qudao = $.trim(this.request("zn_qudao"));
			var union_id = $.trim(this.request("union_id"));
			var laiyuan = $.trim(this.request("laiyuan"));
			var adid = $.trim(this.request("AdID"));
			var referrer = document.referrer;
			referrer = encodeURI(referrer);
			$.ajax({
				type:'get',
				dataType: 'jsonp',
				data: {uid:uid,agent_id:agent_id,zn_qudao:zn_qudao,union_id:union_id,laiyuan:laiyuan,AdID:adid,referer:referrer},
				jsonp: 'callback',
				url: header_index_url+'?m=ajax.cps',
				success: function (json) {
					
				}
			});
		},
		*/
		//鍒涘缓鍙充笅瑙掑脊鍑虹獥鍙�
		makeDesginBox : function(){
			var image_url = 'http://public.kezhan.znimg.com/common/images/design/gwy_1.jpg';
			var html = '<div id="design_box" style="display:none;"><div style=" position:relative;"><div id="close_design" style="position:absolute;width:28px;height:28px; cursor:pointer; top:0px; right:0px;">鍏抽棴</div><div style="position:relative;z-index:1000;"><a title="2015鍏ㄥ浗鍏姟鍛樿€冭瘯" href="http://zt.zhuna.cn/2015gwyks/" title="2015骞村浗瀹跺叕鍔″憳鑰冭瘯鑰冨満鍛ㄨ竟閰掑簵" target="_blank"><img width="250px" height="250px" src="'+image_url+'" /></a></div></div></div>';
			$("body").append(html);
			$("#design_box").css({
				'position' : 'fixed',
				'right' : 0,
				'bottom' : 0,
				"z-index" : '100000'
			});

			var flag = $.cookie('gwybox');
			if(flag == 1){
				$("#design_box").hide();	
			}else{
				$("#design_box").show();	
			}

			var expiresDate= new Date();
			expiresDate.setTime(expiresDate.getTime() + (60 * 60 * 1000));

			$("#close_design").click(function(){
				$.cookie('gwybox', 1, {
					expires: expiresDate,
					path: '/',
					domain: 'zhuna.cn'
				});

				$("#design_box").hide();
			});
			
		},
		//t 鍥藉唴閰掑簵 u 閾炬帴 s 绌哄鏃� o 榛樿200
		init : function(t,u,s,o){
			//this.makeDesginBox();
			var thisUrl = window.location.href;
			var reg = /hotellist|lable[0-9]+|hotel-[0-9]+/;
			var isOpenAd = reg.test(thisUrl) ? false : true;
			//this.makeAd(isOpenAd);
			//this.cps();
			this.isIE = !!window.ActiveXObject;
			this.isIE6 = this.isIE && !window.XMLHttpRequest;
			
			this.getData(t, u, o);
			//this.baifendian();
			setTimeout(footerHtml.setTimeoutFunction,footerHtml.delay);
			
			if(typeof (o) != 'undefined'){
				this.isH = o;
			}
			
			setTimeout(function(){
				if(typeof (s) != "undefined"){
					for (var n in s){
						if(s[n] == 'hide'){
							$('#bottom_float .' + n).remove();
						}
					}
				}
			},2000);
			
			$(".indexmap_ico_sub").hover(function(){
				$('.indexmap_ico').show();
			},function(){
				$('.indexmap_ico').hide();
			})
			
		}
};

footerHtml.init();
var testJson = {
    "HOT": {
        "hot": [
            "0101|鍖椾含", 
            "0201|涓婃捣", 
            "2001|骞垮窞", 
            "2003|娣卞湷", 
            "2301|鎴愰兘", 
            "1201|鏉窞", 
            "1801|姝︽眽", 
            "2701|瑗垮畨", 
            "0401|閲嶅簡", 
            "1601|闈掑矝", 
            "1901|闀挎矙", 
            "1101|鍗椾含", 
            "1401|鍘﹂棬", 
            "2501|鏄嗘槑", 
            "0801|澶ц繛", 
            "0301|澶╂触", 
            "1701|閮戝窞", 
            "2201|涓変簹", 
            "1602|娴庡崡", 
            "1402|绂忓窞", 
            "0802|娌堥槼"
        ]
    }, 
    "AB": {
        "A": [
            "2405|瀹夐『锛堥粍鏋滄爲锛�", 
            "0803|闉嶅北", 
            "1240|瀹夊悏锛堟箹宸烇級", 
            "1303|瀹夊簡", 
            "1716|瀹夐槼", 
            "3118|闃垮嫆娉�", 
            "3109|闃垮厠鑻�", 
            "3301|婢抽棬", 
            "2714|瀹夊悍", 
            "2395|闃垮潩宸�", 
            "0585|瀹夋柊锛堜繚瀹氾級", 
            "0719|闃垮皵灞�", 
            "1419|瀹夋邯锛堟硥宸烇級", 
            "2537|瀹夊畞锛堟槅鏄庯級", 
            "1653|瀹変笜锛堟綅鍧婏級", 
            "0565|瀹夊钩锛堣　姘达級", 
            "0716|闃挎媺鍠�", 
            "0527|瀹夊浗锛堜繚瀹氾級", 
            "0925|瀹夊浘", 
            "1866|瀹夐檰锛堝瓭鎰燂級", 
            "1519|瀹夌", 
            "2419|瀹夐緳鍘�"
        ], 
        "B": [
            "0101|鍖椾含", 
            "0508|鍖楁埓娌筹紙绉︾殗宀涳級", 
            "2103|鍖楁捣", 
            "0512|淇濆畾", 
            "0702|鍖呭ご", 
            "0920|鐧藉煄", 
            "2112|鐧捐壊", 
            "2807|鐧介摱", 
            "1305|铓屽煚", 
            "2702|瀹濋浮", 
            "0918|鐧藉北", 
            "0805|鏈邯", 
            "1618|婊ㄥ窞", 
            "0710|宸村溅娣栧皵", 
            "0523|闇稿窞锛堝粖鍧婏級", 
            "1312|浜冲窞", 
            "2214|淇濅涵锛堜竷浠欏箔锛�", 
            "2414|姣曡妭", 
            "0541|鐧芥磱娣€锛堜繚瀹氾級", 
            "0559|鐧芥矡锛堥珮纰戝簵锛�", 
            "2510|淇濆北", 
            "1132|瀹濆簲锛堟壃宸烇級", 
            "1165|婊ㄦ捣鍘匡紙鐩愬煄锛�", 
            "2351|鍖楀窛鍘匡紙缁甸槼锛�", 
            "2228|鐧芥矙", 
            "2333|宸翠腑", 
            "0550|娉婂ご锛堟钵宸烇級", 
            "3116|鍗氬皵濉旀媺", 
            "1756|瀹濅赴锛堝钩椤跺北锛�", 
            "2716|瀹濋浮鎵堕鍘�", 
            "3117|鍗氫箰", 
            "2733|瀹濋浮宀愬北鍘�", 
            "3131|宸撮煶閮", 
            "1786|鍗氱埍锛堢劍浣滐級", 
            "1650|鍗氬叴锛堟花宸烇級", 
            "5343|鏌忎埂锛堥偄鍙帮級", 
            "5352|鍗氶噹锛堜繚瀹氾級", 
            "3122|甯冨皵娲ュ幙", 
            "3123|甯冨皵娲�", 
            "2731|瀹濋浮鐪夊幙", 
            "2732|瀹濋浮鍑ょ繑鍘�", 
            "0407|鐠у北锛堥噸搴嗭級"
        ]
	},
	"CD":{
        "C": [
            "2301|鎴愰兘", 
            "0401|閲嶅簡", 
            "1901|闀挎矙", 
            "0901|闀挎槬", 
            "1103|甯稿窞", 
            "0502|鎵垮痉", 
            "1907|閮村窞", 
            "1633|闀垮矝鍘匡紙鐑熷彴锛�", 
            "0516|娌у窞", 
            "1117|甯哥啛锛堣嫃宸烇級", 
            "0907|闀跨櫧灞辨睜鍖�", 
            "3115|鏄屽悏", 
            "1320|姹犲窞", 
            "1910|甯稿痉", 
            "1231|鎱堟邯锛堝畞娉級", 
            "2518|妤氶泟", 
            "2016|娼窞", 
            "2130|宕囧乏锛堝ぇ鏂�/鍑ゥ锛�", 
            "0552|宕囩ぜ锛堝紶瀹跺彛锛�", 
            "0909|闀跨櫧灞辨睜瑗�", 
            "1318|婊佸窞", 
            "0617|闀挎不", 
            "1308|宸㈡箹锛堝悎鑲ワ級", 
            "0816|鏈濋槼", 
            "1821|璧ゅ锛堝捀瀹侊級", 
            "0707|璧ゅ嘲", 
            "0536|鏄岄粠锛堢Е鐨囧矝锛�", 
            "2420|璧ゆ按锛堥伒涔夛級", 
            "2380|宕囧窞锛堟垚閮斤級", 
            "1283|鑻嶅崡锛堟俯宸烇級", 
            "1298|闀垮叴", 
            "2224|婢勮繄", 
            "1420|闀夸箰锛堢宸烇級", 
            "1698|鑻嶅北锛堜复娌傦級", 
            "1667|鑼屽钩锛堣亰鍩庯級", 
            "1668|鏄屼箰锛堟綅鍧婏級", 
            "1424|闀挎眬锛堥緳宀╋級", 
            "2225|鏄屾睙", 
            "1805|闀块槼锛堝疁鏄岋級", 
            "1279|甯稿北锛堣、宸烇級", 
            "2606|鏄岄兘", 
            "5327|鎵垮痉鍘匡紙鎵垮痉锛�", 
            "5341|纾佸幙锛堥偗閮革級", 
            "1699|鏇瑰幙锛堣弿娉斤級", 
            "1767|闀垮灒锛堟柊涔★級", 
            "1457|闀挎嘲锛堟汲宸烇級", 
            "1529|宕囦箟锛堣担宸烇級", 
            "5339|鎴愬畨锛堥偗閮革級", 
            "5319|璧ゅ煄锛堝紶瀹跺彛锛�", 
            "0914|闀跨櫧灞�", 
            "0829|闀垮叴宀�", 
            "3502|鏄岄倯锛堟綅鍧婏級", 
            "2423|闀块『鍘�", 
            "0418|闀垮锛堥噸搴嗭級"
        ], 
        "D": [
            "2505|澶х悊", 
            "0801|澶ц繛", 
            "2007|涓滆帪", 
            "0602|澶у悓", 
            "2385|閮芥睙鍫伴潚鍩庡北锛堟垚閮斤級", 
            "0806|涓逛笢", 
            "1004|澶у簡", 
            "2312|寰烽槼", 
            "2803|鏁︾厡", 
            "1607|涓滆惀", 
            "1612|寰峰窞", 
            "1719|鐧诲皝锛堥儜宸烇級", 
            "2372|澶ч倯锛堟垚閮斤級", 
            "1242|寰锋竻", 
            "2127|涓滃叴锛堥槻鍩庢腐锛�", 
            "2340|杈惧窞", 
            "1129|涓归槼锛堥晣姹燂級", 
            "1148|涓滄捣锛堣繛浜戞腐锛�", 
            "1418|涓滃北锛堟汲宸烇級", 
            "2330|绋诲煄锛堢敇瀛滃窞锛�", 
            "1243|涓滈槼", 
            "1150|澶т赴锛堢洂鍩庯級", 
            "2408|閮藉寑甯傦紙榛斿崡宸烇級", 
            "1136|涓滃彴锛堢洂鍩庯級", 
            "0822|澶х煶妗�", 
            "2358|涓瑰反鍘�", 
            "1850|褰撻槼甯傦紙瀹滄槍锛�", 
            "5310|瀹氬叴锛堜繚瀹氾級", 
            "0556|瀹氬窞锛堜繚瀹氾級", 
            "2519|寰烽挦锛堣开搴嗗窞锛�", 
            "1682|涓滈樋鍘匡紙鑱婂煄锛�", 
            "1819|澶у喍锛堥粍鐭筹級", 
            "1289|娲炲ご锛堟俯宸烇級", 
            "0825|涓滄腐", 
            "2218|涓滄柟", 
            "3004|寰蜂护鍝�", 
            "1734|閭撳窞", 
            "1816|涓规睙鍙ｏ紙鍗佸牥锛�", 
            "2821|瀹氳タ甯�", 
            "0917|鏁﹀寲", 
            "1670|涓滃钩锛堟嘲瀹夛級", 
            "1342|褰撴秱锛堥┈闉嶅北锛�", 
            "1522|寰峰叴锛堜笂楗讹級", 
            "0598|澶у悕锛堥偗閮革級", 
            "1353|瀹氳繙锛堟粊宸烇級", 
            "5336|澶у煄锛堝粖鍧婏級", 
            "2215|瀹氬畨", 
            "1433|寰峰寲锛堟硥宸烇級", 
            "0591|澶у巶锛堝粖鍧婏級", 
            "1528|澶т綑锛堣担宸烇級", 
            "1530|瀹氬崡锛堣担宸烇級", 
            "1647|涓滄槑锛堣弿娉斤級", 
            "1700|鍗曞幙锛堣弿娉斤級", 
            "2416|鐙北鍘�", 
            "5329|涓滃厜锛堟钵宸烇級", 
            "2506|杩簡宸�", 
            "2516|寰峰畯宸�", 
            "1458|澶х敯锛堜笁鏄庯級", 
            "0923|寰锋儬"
        ]
	},
	"EFG":{
		"E": [
            "2310|宄ㄧ湁灞�", 
            "0705|閯傚皵澶氭柉", 
            "1811|鎭╂柦", 
            "1818|閯傚窞", 
            "2050|鎭╁钩", 
            "0726|棰濆皵鍙ょ撼锛堝懠浼﹁礉灏旓級", 
            "0729|棰濇祹绾虫棗", 
            "0731|浜岃繛娴╃壒"
        ],
		"F": [
            "1915|鍑ゅ嚢锛堟箻瑗匡級", 
            "2005|浣涘北", 
            "1402|绂忓窞", 
            "0804|鎶氶『", 
            "1515|鎶氬窞", 
            "1307|闃滈槼", 
            "1215|濂夊寲锛堝畞娉級", 
            "2113|闃插煄娓�", 
            "1248|瀵岄槼锛堟澀宸烇級", 
            "1412|绂忛紟锛堝畞寰凤級", 
            "0823|闃滄柊", 
            "1422|绂忔竻锛堢宸烇級", 
            "0564|闃滃钩鍘匡紙淇濆畾锛�", 
            "1645|鑲ュ煄锛堟嘲瀹夛級", 
            "1175|闃滃畞锛堢洂鍩庯級", 
            "1449|绂忓畨锛堝畞寰凤級", 
            "1327|绻佹槍锛堣姕婀栵級", 
            "0525|涓板畞锛堟壙寰凤級", 
            "1167|涓板幙锛堝緪宸烇級", 
            "3511|璐瑰幙锛堜复娌傦級", 
            "5332|鑲ヤ埂锛堥偗閮革級", 
            "1773|鏂瑰煄锛堝崡闃筹級", 
            "1532|涓板煄锛堝疁鏄ワ級", 
            "0824|鍑ゅ煄", 
            "0628|姹鹃槼锛堝悤姊侊級", 
            "1348|鍑ら槼锛堟粊宸烇級", 
            "0570|闃滃煄锛堣　姘达級", 
            "2424|绂忔硥甯傦紙榛斿崡宸烇級", 
            "2549|瀵屽畞锛堟枃灞憋級", 
            "1525|涓板煄锛堝疁鏄ワ級", 
            "1360|闃滃崡锛堥槣闃筹級"
        ], 
        "G": [
            "2001|骞垮窞", 
            "2101|妗傛灄", 
            "2401|璐甸槼", 
            "1516|璧ｅ窞", 
            "2320|骞垮厓", 
            "2111|璐垫腐", 
            "2905|鍥哄師", 
            "3003|鏍煎皵鏈�", 
            "2313|骞垮畨", 
            "1144|楂橀偖锛堟壃宸烇級", 
            "2128|妗傚钩锛堣吹娓級", 
            "2392|鐢樺瓬宸�", 
            "1858|璋峰煄锛堣闃筹級", 
            "2812|鐢樺崡", 
            "1169|璧ｆ锛堣繛浜戞腐锛�", 
            "1743|宸╀箟锛堥儜宸烇級", 
            "1644|楂樺瘑锛堟綅鍧婏級", 
            "0572|鍥哄畨锛堝粖鍧婏級", 
            "0528|楂樼搴楋紙淇濆畾锛�", 
            "1641|骞块ザ锛堜笢钀ワ級", 
            "1324|骞垮痉锛堝鍩庯級", 
            "1173|鐏屽崡锛堣繛浜戞腐锛�", 
            "1174|鐏屼簯锛堣繛浜戞腐锛�", 
            "1537|楂樺畨锛堝疁鏄ワ級", 
            "1863|鍏畨锛堣崋宸烇級", 
            "3402|楂橀泟锛堝彴婀撅級", 
            "1761|鍥哄锛堜俊闃筹級", 
            "2131|鎭煄锛堟鏋楋級", 
            "0542|钘佸煄锛堢煶瀹跺簞锛�", 
            "1462|鍙ょ敯锛堝畞寰凤級", 
            "5337|棣嗛櫠锛堥偗閮革級", 
            "5338|骞垮钩锛堥偗閮革級", 
            "0626|楂樺钩锛堟檵鍩庯級", 
            "1841|骞挎按锛堥殢宸烇級", 
            "1692|楂樺攼鍘匡紙鑱婂煄锛�", 
            "0594|鏁呭煄锛堣　姘达級", 
            "0599|娌芥簮锛堝紶瀹跺彛锛�", 
            "0633|鍙や氦锛堝お鍘燂級", 
            "0832|鐩栧窞", 
            "0926|鍏富宀�", 
            "2554|涓棫锛堢孩娌冲窞锛�", 
            "3006|璐靛痉鍘�", 
            "3009|鍏卞拰鍘�", 
            "3018|鏋滄礇钘忔棌鑷不宸�", 
            "5316|楂橀倯锛堢煶瀹跺簞锛�", 
            "1447|榧撴氮灞匡紙鍘﹂棬锛�", 
            "1541|璐垫邯锛堥拱娼級", 
            "0725|鏍规渤锛堝懠浼﹁礉灏旓級", 
            "1695|鍐犲幙锛堣亰鍩庯級", 
            "1741|鍏夊北锛堜俊闃筹級", 
            "2365|骞挎眽锛堝痉闃筹級", 
            "0538|楂橀槼锛堜繚瀹氾級"
        ]
	},

    "HI": {
        "H": [
            "1201|鏉窞", 
            "1001|鍝堝皵婊�", 
            "1301|鍚堣偉", 
            "2202|娴峰彛", 
            "1302|榛勫北", 
            "2010|鎯犲窞", 
            "0701|鍛煎拰娴╃壒", 
            "1918|琛￠槼", 
            "1330|瀹忔潙锛堥粍灞憋級", 
            "1123|娣畨", 
            "0515|閭兏", 
            "2119|娌虫睜", 
            "2026|娌虫簮", 
            "2328|娴疯灪娌燂紙鐢樺瓬宸烇級", 
            "2707|姹変腑", 
            "1288|妯簵", 
            "0820|钁姦宀�", 
            "2107|璐哄窞", 
            "1814|榛勭煶", 
            "0514|琛℃按", 
            "1152|娴烽棬锛堝崡閫氾級", 
            "3012|娴峰寳钘忔棌鑷不宸�", 
            "1306|娣崡", 
            "1234|娴峰畞", 
            "1239|婀栧窞", 
            "0712|鍛间鸡璐濆皵锛堟捣鎷夊皵锛�", 
            "1616|鑿忔辰", 
            "1651|娴烽槼锛堢儫鍙帮級", 
            "1830|榛勫唸", 
            "1921|鎬€鍖�", 
            "3121|鍜岀敯", 
            "3113|鍝堝瘑", 
            "3015|娴峰崡钘忔棌鑷不宸�", 
            "3016|娴蜂笢甯�", 
            "1014|榛戞渤", 
            "3416|鑺辫幉锛堝彴婀撅級", 
            "1166|娲辰鍘匡紙娣畨锛�", 
            "1009|楣ゅ矖", 
            "1322|娣寳", 
            "1765|杈夊幙锛堟柊涔★級", 
            "1712|楣ゅ", 
            "1241|娴风洂", 
            "0560|娌抽棿锛堟钵宸烇級", 
            "2029|楣ゅ北", 
            "0510|鎬€鏉ワ紙寮犲鍙ｏ級", 
            "0812|娴峰煄", 
            "0911|鐝叉槬", 
            "1759|娼㈠窛锛堜俊闃筹級", 
            "0634|娲礊鍘�", 
            "0555|榛勯獏锛堟钵宸烇級", 
            "3014|娴疯タ钂欏彜鏃忚棌鏃忚嚜娌诲窞", 
            "3010|榛勫崡钘忔棌鑷不宸�", 
            "2552|娌冲彛锛堢孩娌冲窞锛�", 
            "1827|姹夊窛锛堝瓭鎰燂級", 
            "1427|鎯犲畨锛堟硥宸烇級", 
            "2393|榛戞按鍘匡紙闃垮潩宸烇級", 
            "1848|榛勬锛堥粍鍐堬級", 
            "2742|姹変腑鍕夊幙", 
            "2909|璐哄叞鍘�", 
            "2738|姹変腑鍗楅儜鍘�", 
            "1833|娲箹锛堣崋宸烇級", 
            "0636|渚┈锛堜复姹撅級", 
            "1935|琛″北锛堣　闃筹級", 
            "1736|娣槼锛堝懆鍙ｏ級", 
            "1752|婊戝幙锛堝畨闃筹級", 
            "1678|鎯犳皯锛堟花宸烇級", 
            "1338|闇嶅北锛堝叚瀹夛級", 
            "2384|榛勯緳婧紙鎴愰兘锛�", 
            "2740|姹変腑娲嬪幙", 
            "1316|鎬€杩滐紙铓屽煚锛�", 
            "1343|鍜屽幙锛堥┈闉嶅北锛�", 
            "1344|鍚北锛堥┈闉嶅北锛�", 
            "0409|鍚堝窛锛堥噸搴嗭級", 
            "0625|闇嶅窞锛堜复姹撅級", 
            "0715|鍜屾灄鏍煎皵", 
            "0931|鍜岄緳", 
            "1340|瀹忔潙锛堥粺鍘匡級", 
            "2360|绾㈠師鍘匡紙闃垮潩宸烇級", 
            "2371|鑺辨按婀撅紙澶ч倯锛�", 
            "1766|鑾峰槈锛堟柊涔★級", 
            "2820|鍚堜綔锛堢敇鍗楋級", 
            "2739|姹変腑鍩庡浐鍘�", 
            "2433|鎯犳按鍘匡紙榛斿崡宸烇級", 
            "2517|绾㈡渤宸�", 
            "5330|娴峰叴锛堟钵宸烇級", 
            "3120|鍛煎浘澹佸幙"
        ]
	},
	"JK":{
        "J": [
            "1602|娴庡崡", 
            "1309|涔濆崕灞憋紙姹犲窞锛�", 
            "2311|涔濆娌�", 
            "1502|涔濇睙", 
            "2021|姹熼棬", 
            "1802|鑽嗗窞", 
            "1209|鍢夊叴", 
            "0810|閿﹀窞", 
            "0902|鍚夋灄", 
            "1507|鏅痉闀�", 
            "0607|鏅嬩腑", 
            "1511|浜曞唸灞�", 
            "1113|姹熼槾锛堟棤閿★級", 
            "1619|娴庡畞", 
            "1204|閲戝崕", 
            "1810|鑽嗛棬", 
            "1413|鏅嬫睙", 
            "2006|鎻槼", 
            "1710|鐒︿綔", 
            "1503|鍚夊畨", 
            "1625|鍗冲ⅷ锛堥潚宀涳級", 
            "1137|闈栨睙锛堟嘲宸烇級", 
            "1012|浣虫湪鏂�", 
            "1927|鍚夐锛堟箻瑗匡級", 
            "2806|閰掓硥", 
            "1141|濮滃牥锛堟嘲宸烇級", 
            "1632|鑳跺崡锛堥潚宀涳級", 
            "0609|鏅嬪煄", 
            "2802|鍢夊唱鍏�", 
            "1271|寤哄痉锛堟澀宸烇級", 
            "1262|姹熷北锛堣、宸烇級", 
            "1709|娴庢簮", 
            "1631|鑳跺窞锛堥潚宀涳級", 
            "1277|鍢夊杽", 
            "1349|娉惧幙锛堝鍩庯級", 
            "2329|姹熸补锛堢坏闃筹級", 
            "1143|鍙ュ锛堥晣姹燂級", 
            "1860|浜北锛堣崋闂級", 
            "2546|寤烘按锛堢孩娌冲窞锛�", 
            "5331|浜曢檳锛堢煶瀹跺簞锛�", 
            "1267|缂欎簯锛堜附姘达級", 
            "0620|浠嬩紤锛堟檵涓級", 
            "1130|閲戝潧锛堝父宸烇級", 
            "2810|閲戞槍", 
            "1350|缁╂邯锛堝鍩庯級", 
            "0635|鍚夊幙锛堜复姹撅級", 
            "1664|娴庨槼鍘匡紙娴庡崡锛�", 
            "2352|绠€闃筹紙璧勯槼锛�", 
            "1673|閲戜埂锛堟祹瀹侊級", 
            "1671|鑾掑崡锛堜复娌傦級", 
            "1431|灏嗕箰锛堜笁鏄庯級", 
            "1299|鏅畞锛堜附姘达級", 
            "1160|閲戞箹锛堟樊瀹夛級", 
            "1177|寤烘箹锛堢洂鍩庯級", 
            "1015|楦¤タ", 
            "0574|鍐€宸烇紙琛℃按锛�", 
            "1451|寤洪槼锛堝崡骞筹級", 
            "1696|宸ㄩ噹锛堣弿娉斤級", 
            "0577|鏅幙锛堣　姘达級", 
            "1018|鍔犳牸杈惧", 
            "0927|铔熸渤", 
            "0415|姹熸触锛堥噸搴嗭級", 
            "1459|寤哄畞锛堜笁鏄庯級", 
            "2562|鏅嬪畞锛堟槅鏄庯級", 
            "3419|閲戦棬锛堝彴婀撅級", 
            "1835|鍢夐奔锛堝捀瀹侊級", 
            "5335|楦℃辰锛堥偗閮革級", 
            "5349|宸ㄩ箍锛堥偄鍙帮級", 
            "1446|寤虹摨锛堝崡骞筹級", 
            "0562|鏅嬪窞锛堢煶瀹跺簞锛�", 
            "1118|姹熼兘锛堟壃宸烇級", 
            "1869|寤哄锛堟仼鏂斤級", 
            "3504|閯勫煄锛堣弿娉�)", 
            "2563|閲戝钩"
        ],
		"K": [
            "2501|鏄嗘槑", 
            "1127|鏄嗗北锛堣嫃宸烇級", 
            "1703|寮€灏�", 
            "3111|鍠€浠€", 
            "2404|鍑噷锛堥粩涓滃崡锛�", 
            "2336|搴峰畾锛堢敇瀛滃窞锛�", 
            "2048|寮€骞�", 
            "3104|搴撳皵鍕�", 
            "3102|鍏嬫媺鐜涗緷", 
            "2361|搴峰畾鏂伴兘妗ワ紙鍚鍏級", 
            "2559|寮€杩滐紙绾㈡渤宸烇級", 
            "0834|寮€鍘�", 
            "1286|寮€鍖栵紙琛㈠窞锛�", 
            "3110|鍠€绾虫柉", 
            "3132|鍏嬪瓬鍕掕嫃鏌皵鍏嬪瓬", 
            "0424|寮€鍘匡紙閲嶅簡锛�", 
            "0546|瀹藉煄锛堟壙寰凤級", 
            "1642|鍨﹀埄锛堜笢钀ワ級", 
            "3112|濂庡悲", 
            "1269|鏌ˉ锛堢粛鍏达級"
        ]
    }, 
    "LM": {
        "L": [
            "2503|涓芥睙锛堝惈鏉熸渤锛�", 
            "1702|娲涢槼", 
            "2601|鎷夎惃", 
            "2801|鍏板窞", 
            "1110|杩炰簯娓�", 
            "1611|涓存矀", 
            "2105|鏌冲窞", 
            "0511|寤婂潑", 
            "2303|涔愬北", 
            "1122|婧ч槼澶╃洰婀栵紙甯稿窞锛�", 
            "1506|搴愬北锛堜節姹燂級", 
            "2817|闄囧崡甯�", 
            "1230|涓芥按", 
            "2125|榫欒儨锛堟鏋楋級", 
            "2603|鏋楄姖", 
            "1213|涓村畨锛堟澀宸烇級", 
            "0619|鍚曟", 
            "1319|鍏畨", 
            "2317|闃嗕腑锛堝崡鍏咃級", 
            "1928|濞勫簳", 
            "1409|榫欏博", 
            "2412|鍏洏姘�", 
            "2314|娉稿窞", 
            "0818|杈介槼", 
            "2819|涓村", 
            "1622|鑱婂煄", 
            "2411|鑽旀尝锛堥粩鍗楀窞锛�", 
            "1634|鑾辫姕", 
            "0603|涓存本", 
            "2118|鏉ュ", 
            "2524|娉告步婀�", 
            "1640|榫欏彛锛堢儫鍙帮級", 
            "1259|涔愭竻锛堟俯宸烇級", 
            "1626|鑾辫タ锛堥潚宀涳級", 
            "1717|婕渤", 
            "1919|娴忛槼锛堥暱娌欙級", 
            "1652|鑾卞窞锛堢儫鍙帮級", 
            "2370|鐞嗗幙锛堥樋鍧濆窞锛�", 
            "1533|榫欒檸灞憋紙楣版江锛�", 
            "1726|鏍惧窛锛堟礇闃筹級", 
            "1226|涓存捣锛堝彴宸烇級", 
            "1839|鍒╁窛锛堟仼鏂斤級", 
            "2429|榛庡钩锛堥粩涓滃崡锛�", 
            "2207|闄垫按", 
            "1838|缃楃敯锛堥粍鍐堬級", 
            "0615|鐏电煶锛堟檵涓級", 
            "0554|楣挎硥锛堢煶瀹跺簞锛�", 
            "0913|杈芥簮", 
            "2341|鍑夊北宸�", 
            "5320|婊﹀崡锛堝攼灞憋級", 
            "1260|榫欐硥锛堜附姘达級", 
            "1922|鑰掗槼锛堣　闃筹級", 
            "2337|娉稿畾鍘匡紙鐢樺瓬宸烇級", 
            "1735|椴佸北锛堝钩椤跺北锛�", 
            "1694|姊佸北锛堟祹瀹侊級", 
            "1637|鑾遍槼锛堢儫鍙帮級", 
            "2906|鐏垫", 
            "2511|涓存钵", 
            "1728|鏋楀窞锛堝畨闃筹級", 
            "1280|榫欐父锛堣、宸烇級", 
            "1417|榫欐捣锛堟汲宸烇級", 
            "1158|娑熸按锛堟樊瀹夛級", 
            "0596|鏍惧煄锛堢煶瀹跺簞锛�", 
            "0543|涔愪涵锛堝攼灞憋級", 
            "1430|杩炴睙锛堢宸烇級", 
            "1214|鍏版邯", 
            "1535|涔愬钩甯傦紙鏅痉闀囷級", 
            "1711|鐏靛疂锛堜笁闂ㄥ场锛�", 
            "2227|涓撮珮", 
            "1351|閮庢邯锛堝鍩庯級", 
            "1415|杩炲煄锛堥緳宀╋級", 
            "0588|婊﹀幙锛堝攼灞憋級", 
            "0630|绂荤煶锛堝悤姊侊級", 
            "1677|涓存竻锛堣亰鍩庯級", 
            "2219|涔愪笢", 
            "2543|缃楀钩锛堟洸闈栵級", 
            "5345|涓村煄锛堥偄鍙帮級", 
            "5315|鐏靛锛堢煶瀹跺簞锛�", 
            "1681|鍒╂触鍘匡紙涓滆惀锛�", 
            "1691|涓存箔锛堜复娌傦級", 
            "1693|涓撮倯锛堝痉宸烇級", 
            "0597|闅嗗哀锛堥偄鍙帮級", 
            "5353|闅嗗寲锛堟壙寰凤級", 
            "5326|婊﹀钩锛堟壙寰凤級", 
            "5334|涓存汲锛堥偗閮革級", 
            "3503|涓存湊锛堟綅鍧婏級", 
            "2561|缁挎槬锛堢孩娌冲窞锛�", 
            "2528|娉歌タ锛堢孩娌冲窞锛�", 
            "2542|闄嗚壇锛堟洸闈栵級", 
            "1461|缃楁簮锛堢宸烇級", 
            "1685|涔愰櫟锛堝痉宸烇級", 
            "1739|娲涘畞锛堟礇闃筹級", 
            "1760|缃楀北锛堜俊闃筹級", 
            "1925|鍐锋按锛堝▌搴曪級", 
            "1857|鑰佹渤鍙ｏ紙瑗勯槼锛�"
        ], 
        "M": [
            "2302|缁甸槼", 
            "2028|姊呭窞", 
            "2009|鑼傚悕", 
            "1311|椹瀺灞�", 
            "1002|鐗′腹姹�", 
            "2304|鐪夊北", 
            "0709|婊℃床閲�", 
            "1837|楹诲煄锛堥粍鍐堬級", 
            "1016|婕犳渤", 
            "2553|钂欒嚜锛堢孩娌冲窞锛�", 
            "2545|寮ュ嫆锛堢孩娌冲窞锛�", 
            "1444|闂戒警锛堢宸烇級", 
            "2359|鑼傚幙锛堥樋鍧濆窞锛�", 
            "1697|钂欓槾锛堜复娌傦級", 
            "2521|鑺掑競锛堝痉瀹忓窞锛�", 
            "1745|瀛熸触锛堟礇闃筹級", 
            "2334|椹皵搴凤紙闃垮潩宸烇級", 
            "1341|鏄庡厜锛堟粊宸烇級", 
            "3409|鑻楁牀锛堝彴婀撅級", 
            "1746|瀛熷窞锛堢劍浣滐級", 
            "1763|娓戞睜锛堜笁闂ㄥ场锛�", 
            "1784|姘戞潈锛堝晢涓橈級", 
            "1013|瀵嗗北", 
            "0576|婊″煄锛堜繚瀹氾級", 
            "1460|闂芥竻锛堢宸烇級"
        ]
	},
	"NOPQ":{
        "N": [
            "1101|鍗椾含", 
            "1501|鍗楁槍", 
            "1202|瀹佹尝", 
            "2102|鍗楀畞", 
            "1107|鍗楅€�", 
            "2309|鍗楀厖", 
            "0504|鍗楁埓娌筹紙绉︾殗宀涳級", 
            "1439|鍗楅潠锛堟汲宸烇級", 
            "1707|鍗楅槼", 
            "1252|瀹佹捣锛堝畞娉級", 
            "1151|鐫㈠畞锛堝緪宸烇級", 
            "1139|娴峰畨锛堝崡閫氾級", 
            "1936|瀹佷埂锛堥暱娌欙級", 
            "1414|瀹佸痉", 
            "1297|鍗楁禂锛堟箹宸烇級", 
            "0934|鍐滃畨鍘�", 
            "2319|鍐呮睙", 
            "1441|鍗楀畨锛堟硥宸烇級", 
            "1323|瀹佸浗锛堝鍩庯級", 
            "5313|瀹佹檵锛堥偄鍙帮級", 
            "1411|鍗楀钩", 
            "1775|鍐呬埂锛堝崡闃筹級", 
            "1526|鍗楀悍锛堣担宸烇級", 
            "1772|鍗楀彫锛堝崡闃筹級", 
            "1674|瀹侀槼锛堟嘲瀹夛級", 
            "1346|鍗楅櫟锛堣姕婀栵級", 
            "1687|瀹佹触鍘匡紙寰峰窞锛�", 
            "2527|鎬掓睙", 
            "2609|閭ｆ洸", 
            "3411|鍗楁姇锛堝彴婀撅級", 
            "1853|鍗楁汲锛堣闃筹級", 
            "5350|鍗楀拰锛堥偄鍙帮級", 
            "5347|鍐呬笜锛堥偄鍙帮級", 
            "5318|鍗楃毊锛堟钵宸烇級", 
            "1785|瀹侀櫟锛堝晢涓橈級", 
            "0717|瀹佸煄"
        ], 
        "P": [
            "0608|骞抽仴锛堟檵涓級", 
            "1613|钃幈锛堢儫鍙帮級", 
            "2321|鏀€鏋濊姳", 
            "0809|鐩橀敠", 
            "1406|鑾嗙敯", 
            "1512|钀嶄埂", 
            "1706|婵槼", 
            "2529|鏅幢", 
            "3404|灞忎笢锛堝彴婀撅級", 
            "1643|骞冲害锛堥潚宀涳級", 
            "2809|骞冲噳", 
            "1705|骞抽《灞�", 
            "0551|骞冲北锛堢煶瀹跺簞锛�", 
            "1268|骞虫箹", 
            "1438|骞虫江锛堢宸烇級", 
            "1287|骞抽槼锛堟俯宸烇級", 
            "1178|娌涘幙锛堝緪宸烇級", 
            "1149|閭冲窞锛堝緪宸烇級", 
            "1421|灞忓崡锛堝畞寰凤級", 
            "1291|纾愬畨", 
            "1274|娴︽睙", 
            "1638|骞抽倯锛堜复娌傦級", 
            "1666|骞冲師鍘匡紙寰峰窞锛�", 
            "0915|纾愮煶", 
            "2379|閮幙锛堟垚閮斤級", 
            "5312|骞虫硥锛堟壙寰凤級", 
            "2558|灞忚竟锛堢孩娌冲窞锛�", 
            "1456|骞冲拰锛堟汲宸烇級"
        ],
		"Q": [
            "1601|闈掑矝", 
            "2027|娓呰繙", 
            "0503|绉︾殗宀�", 
            "1403|娉夊窞", 
            "2206|鐞兼捣锛堝崥槌岋級", 
            "1233|鍗冨矝婀栵紙鏉窞锛�", 
            "1610|鏇查槣锛堟祹瀹侊級", 
            "1005|榻愰綈鍝堝皵", 
            "1235|琛㈠窞", 
            "2522|鏇查潠", 
            "2109|閽﹀窞", 
            "1125|鍚笢锛堝崡閫氾級", 
            "1639|闈掑窞锛堟綅鍧婏級", 
            "2567|涓樺寳锛堟枃灞憋級", 
            "0582|闈掗緳锛堢Е鐨囧矝锛�", 
            "0637|绁佸幙锛堟檵涓級", 
            "3002|闈掓捣婀�", 
            "2813|搴嗛槼", 
            "0526|杩佸畨锛堝攼灞憋級", 
            "1025|涓冨彴娌�", 
            "1359|绁侀棬锛堥粍灞憋級", 
            "1829|娼滄睙", 
            "1654|鏍栭湠锛堢儫鍙帮級", 
            "1352|鍏ㄦ锛堟粊宸烇級", 
            "5308|娓呰嫅锛堜繚瀹氾級", 
            "2378|閭涘磧锛堟垚閮斤級", 
            "0595|闈掑幙锛堟钵宸烇級", 
            "1336|娼滃北锛堝畨搴嗭級", 
            "1223|闈掔敯锛堜附姘达級", 
            "0579|娓呮渤锛堥偄鍙帮級", 
            "1872|钑叉槬锛堥粍鍐堬級", 
            "1679|搴嗕簯锛堝痉宸烇級", 
            "2432|榛斾笢鍗楀窞", 
            "1757|娌侀槼锛堢劍浣滐級", 
            "0581|鏇插懆锛堥偗閮革級", 
            "0586|鏇查槼锛堜繚瀹氾級", 
            "0571|杩佽タ锛堝攼灞憋級", 
            "1676|榻愭渤鍘匡紙寰峰窞锛�", 
            "2223|鐞间腑", 
            "2431|榛旇タ鍗楀窞", 
            "2430|榛斿崡宸�", 
            "1455|娓呮祦锛堜笁鏄庯級", 
            "0935|涔惧畨鍘�", 
            "0417|榛旀睙锛堥噸搴嗭級"
        ]
    }, 
    "RS": {
        
        "R": [
            "1615|鏃ョ収", 
            "1146|濡傜殝锛堝崡閫氾級", 
            "1636|鑽ｆ垚锛堝▉娴凤級", 
            "1128|濡備笢锛堝崡閫氾級", 
            "1237|鐟炲畨锛堟俯宸烇級", 
            "2520|鐟炰附锛堝痉瀹忓窞锛�", 
            "1661|涔冲北锛堝▉娴凤級", 
            "2604|鏃ュ杸鍒�", 
            "2354|鑻ュ皵鐩栵紙闃垮潩锛�", 
            "1521|鐟為噾", 
            "2407|浠佹€€锛堥伒涔夛級", 
            "0517|浠讳笜锛堟钵宸烇級", 
            "2362|浠佸锛堢湁灞憋級", 
            "5311|瀹瑰煄锛堜繚瀹氾級", 
            "1727|姹濆窞锛堝钩椤跺北锛�", 
            "5324|楗堕槼锛堣　姘达級"
        ], 
        "S": [
            "0201|涓婃捣", 
            "2003|娣卞湷", 
            "0802|娌堥槼", 
            "2201|涓変簹", 
            "1102|鑻忓窞", 
            "0501|鐭冲搴�", 
            "2030|闊跺叧", 
            "1205|缁嶅叴", 
            "2002|姹曞ご", 
            "1508|涓婇ザ甯�", 
            "1807|鍗佸牥", 
            "1523|涓夋竻灞憋紙涓婇ザ锛�", 
            "2040|姹曞熬", 
            "0919|鍥涘钩", 
            "1131|瀹胯縼", 
            "0910|鏉惧師", 
            "1354|姝欏幙锛堥粍灞憋級", 
            "1813|绁炲啘鏋�", 
            "2316|鏉炬綐锛堥粍榫�,宸濅富瀵猴級", 
            "2712|鍟嗘礇", 
            "2315|閬傚畞", 
            "1721|鍟嗕笜", 
            "2902|鐭冲槾灞�", 
            "1010|缁ュ寲", 
            "1405|鐭崇嫯", 
            "1410|涓夋槑", 
            "1620|瀵垮厜锛堟綅鍧婏級", 
            "1272|閬傛槍锛堜附姘达級", 
            "1823|闅忓窞", 
            "1246|涓婅櫈锛堢粛鍏达級", 
            "0533|涓夋渤锛堝粖鍧婏級", 
            "1168|娌槼锛堝杩侊級", 
            "1916|闊跺北锛堟箻娼級", 
            "1708|涓夐棬宄�", 
            "1176|灏勯槼锛堢洂鍩庯級", 
            "1314|瀹垮窞", 
            "0618|鏈斿窞", 
            "1924|閭甸槼", 
            "1662|娉楁按锛堟祹瀹侊級", 
            "1236|宓婂窞锛堢粛鍏达級", 
            "1157|娉楁椽锛堝杩侊級", 
            "1006|缁ヨ姮娌�", 
            "2353|铚€鍗楃娴凤紙瀹滃锛�", 
            "1138|娉楅槼锛堝杩侊級", 
            "1425|娌欏幙锛堜笁鏄庯級", 
            "0530|娑炴按锛堜繚瀹氾級", 
            "0833|缁ヤ腑", 
            "0584|娑夊幙锛堥偗閮革級", 
            "2557|鐭虫灄锛堟槅鏄庯級", 
            "3119|閯杽鍘�", 
            "1770|閬傚钩锛堥┗椹簵锛�", 
            "1426|涓婃澀锛堥緳宀╋級", 
            "1334|鑸掑煄锛堝叚瀹夛級", 
            "1423|閭垫锛堝崡骞筹級", 
            "1258|涓夐棬锛堝彴宸烇級", 
            "1300|鏉鹃槼锛堜附姘达級", 
            "0642|瀵块槼锛堟檵涓級", 
            "1020|鍙岄腑灞�", 
            "3107|鐭虫渤瀛�", 
            "2338|灏勬椽锛堥亗瀹侊級", 
            "2374|鍙屾祦锛堟垚閮斤級", 
            "1748|宓╁幙锛堟礇闃筹級", 
            "2544|姘村瘜锛堟槶閫氾級", 
            "0578|娌欐渤锛堥偄鍙帮級", 
            "0727|瀹ら煢锛堝懠浼﹁礉灏旓級", 
            "2548|鐭冲睆锛堢孩娌冲窞锛�", 
            "2555|宓╂槑锛堟槅鏄庯級", 
            "1454|椤烘槍锛堝崡骞筹級", 
            "0549|鑲冨畞锛堟钵宸烇級", 
            "0592|灏氫箟锛堝紶瀹跺彛锛�", 
            "1024|缁ユ花", 
            "1450|鏉炬邯锛堝崡骞筹級", 
            "1762|鍟嗗煄锛堜俊闃筹級", 
            "1683|鑾樺幙锛堣亰鍩庯級", 
            "1544|涓婄姽锛堣担宸烇級", 
            "1771|鐫㈠幙锛堝晢涓橈級", 
            "1777|绀炬棗锛堝崡闃筹級", 
            "1867|娌欐磱锛堣崋闂級", 
            "2607|灞卞崡"
        ]
	},
	"TUV":{
        "T": [
            "0301|澶╂触", 
            "0601|澶師", 
            "1614|娉板畨", 
            "2512|鑵惧啿", 
            "0903|閫氬寲", 
            "0506|鍞愬北", 
            "1115|娉板窞", 
            "1224|鍙板窞", 
            "2805|澶╂按", 
            "1121|鍚岄噷锛堝惔姹燂級", 
            "2037|鍙板北", 
            "0639|澶胺锛堟檵涓級", 
            "1120|澶粨锛堣嫃宸烇級", 
            "1247|妗愬簮锛堟澀宸烇級", 
            "1315|閾滈櫟", 
            "1263|妗愪埂", 
            "2713|閾滃窛", 
            "2413|閾滀粊", 
            "0813|閾佸箔", 
            "1429|娉板畞锛堜笁鏄庯級", 
            "3401|鍙板寳锛堝彴婀撅級", 
            "0706|閫氳窘", 
            "3108|鍚愰瞾鐣�", 
            "1124|娉板叴锛堟嘲宸烇級", 
            "3417|鍙颁笢锛堝彴婀撅級", 
            "1313|澶╂煴灞憋紙瀹夊簡锛�", 
            "1227|澶╁彴锛堝彴宸烇級", 
            "3414|鍙板崡锛堝彴婀撅級", 
            "3403|鍙颁腑锛堝彴婀撅級", 
            "0539|鍞愭捣锛堝攼灞憋級", 
            "1325|妗愬煄锛堝畨搴嗭級", 
            "1333|澶╅暱锛堟粊宸烇級", 
            "1684|閮煄锛堜复娌傦級", 
            "3128|濉斿煄", 
            "0547|鍞愬幙锛堜繚瀹氾級", 
            "1284|娉伴『锛堟俯宸烇級", 
            "1842|閫氬北锛堝捀瀹侊級", 
            "2226|灞槍", 
            "1780|妗愭煆锛堝崡闃筹級", 
            "1357|澶拰锛堥槣闃筹級", 
            "0428|娼煎崡锛堥噸搴嗭級", 
            "1840|澶╅棬锛堣崋宸烇級", 
            "1778|鍞愭渤锛堝崡闃筹級", 
            "1871|鍥㈤锛堥粍鍐堬級", 
            "0413|閾滄锛堥噸搴嗭級"
        ]
	},
	"WX":{
        "W": [
            "1801|姝︽眽", 
            "3101|涔岄瞾鏈ㄩ綈", 
            "1105|鏃犻敗", 
            "1520|濠烘簮", 
            "1293|涔岄晣锛堟涔★級", 
            "1605|濞佹捣", 
            "1203|娓╁窞", 
            "2129|娑犳床宀涳紙鍖楁捣锛�", 
            "1603|娼嶅潑", 
            "1404|姝﹀し灞�", 
            "1304|鑺滄箹", 
            "0604|浜斿彴灞憋紙蹇诲窞锛�", 
            "1114|鍚存睙锛堣嫃宸烇級", 
            "1831|姝﹀綋灞憋紙鍗佸牥锛�", 
            "2710|娓崡鍗庡北", 
            "2108|姊у窞", 
            "2212|鏂囨槍", 
            "0713|涔屽叞瀵熷竷", 
            "2708|娓崡", 
            "2903|鍚村繝", 
            "2808|姝﹀▉", 
            "1264|姝︿箟", 
            "1238|娓╁箔锛堝彴宸烇級", 
            "0714|涔屾捣", 
            "2203|涓囧畞", 
            "0553|钄氬幙锛堝紶瀹跺彛锛�", 
            "1629|鏂囩櫥锛堝▉娴凤級", 
            "1646|浜旇幉锛堟棩鐓э級", 
            "2513|鏂囧北", 
            "1680|寰北锛堟祹瀹侊級", 
            "2213|浜旀寚灞�", 
            "2322|姹跺窛鍘匡紙闃垮潩宸烇級", 
            "1026|浜斿ぇ杩炴睜", 
            "0718|涔屽叞娴╃壒", 
            "0532|姝﹀畨锛堥偗閮革級", 
            "0406|姝﹂殕锛堥噸搴嗭級", 
            "1345|鑺滄箹鍘匡紙鑺滄箹锛�", 
            "2706|娓崡闊╁煄", 
            "5351|鏈涢兘锛堜繚瀹氾級", 
            "5340|榄忓幙锛堥偗閮革級", 
            "1686|姹朵笂锛堟祹瀹侊級", 
            "1536|姝﹀姛灞�", 
            "1836|姝︾┐锛堥粍鍐堬級", 
            "5333|濞佸幙锛堥偄鍙帮級", 
            "1337|娑￠槼锛堜撼宸烇級", 
            "0575|鏂囧畨锛堝粖鍧婏級", 
            "0580|鏃犳瀬锛堢煶瀹跺簞锛�", 
            "5323|姝﹀己锛堣　姘达級", 
            "2373|娓╂睙锛堟垚閮斤級", 
            "1787|姝﹂櫉锛堢劍浣滐級", 
            "5328|涓囧叏锛堝紶瀹跺彛锛�", 
            "3129|浜斿娓 ", 
            "2536|缁磋タ锛堣开搴嗗窞锛�", 
            "2725|娓崡瀵屽钩鍘�", 
            "1358|浜旀渤锛堣殞鍩狅級", 
            "1432|姝﹀钩锛堥緳宀╋級", 
            "1669|鏃犳＃锛堟花宸烇級", 
            "1347|鏃犱负锛堣姕婀栵級", 
            "0621|闂诲枩锛堣繍鍩庯級", 
            "1030|浜斿父甯�", 
            "0426|宸邯锛堥噸搴嗭級", 
            "5322|姝﹂倯锛堣　姘达級", 
            "1788|娓╁幙锛堢劍浣滐級", 
            "1754|鑸為挗锛堝钩椤跺北锛�"
        ],
		"X": [
            "2701|瑗垮畨", 
            "1401|鍘﹂棬", 
            "1270|瑗垮锛堝槈鍠勶級", 
            "2507|瑗垮弻鐗堢撼", 
            "3001|瑗垮畞", 
            "3201|棣欐腐", 
            "2318|瑗挎槍锛堝噳灞卞窞锛�", 
            "1106|寰愬窞", 
            "1834|瑗勯槼", 
            "2506|棣欐牸閲屾媺锛堣开搴嗗窞锛�", 
            "1820|鍜稿畞", 
            "1906|婀樻江", 
            "1253|璞″北锛堝畞娉級", 
            "1704|鏂颁埂", 
            "0505|閭㈠彴", 
            "2427|瑗挎睙锛堝崈鎴疯嫍瀵級", 
            "2703|鍜搁槼", 
            "0807|鍏村煄", 
            "0704|閿℃灄娴╃壒", 
            "1720|淇￠槼", 
            "1514|鏂颁綑", 
            "1713|璁告槍", 
            "2369|灏忛噾鍘匡紙闃垮潩宸烇級", 
            "1328|瀹ｅ煄", 
            "0557|棣欐渤锛堝粖鍧婏級", 
            "1154|鍏村寲锛堟嘲宸烇級", 
            "1023|闆埂", 
            "0558|寰愭按锛堜繚瀹氾級", 
            "2403|鍏翠箟锛堥粩瑗垮崡宸烇級", 
            "0561|杈涢泦锛堢煶瀹跺簞锛�", 
            "1156|鐩辩湙锛堟樊瀹夛級", 
            "5314|琛屽攼锛堢煶瀹跺簞锛�", 
            "1822|瀛濇劅", 
            "1723|鏂伴儜锛堥儜宸烇級", 
            "1250|浠欏眳锛堝彴宸烇級", 
            "0606|蹇诲窞", 
            "1332|瑗块€掞紙榛勫北锛�", 
            "2211|鍏撮殕", 
            "1134|鏂版矀锛堝緪宸烇級", 
            "1251|鏂版槍锛堢粛鍏达級", 
            "1675|鏂版嘲锛堟嘲瀹夛級", 
            "1815|浠欐", 
            "2124|鍏村畨锛堟鏋楋級", 
            "0600|鐚幙锛堟钵宸烇級", 
            "1435|闇炴郸锛堝畞寰凤級", 
            "0566|鏂颁箰锛堢煶瀹跺簞锛�", 
            "0587|闆勫幙锛堜繚瀹氾級", 
            "1724|鏂板瘑锛堥儜宸烇級", 
            "1452|浠欐父锛堣巻鐢帮級", 
            "1164|鍝嶆按鍘匡紙鐩愬煄锛�", 
            "0629|瀛濅箟锛堝悤姊侊級", 
            "1722|鑽ラ槼锛堥儜宸烇級", 
            "1749|鏂板畨锛堟礇闃筹級", 
            "2704|鍜搁槼鏉ㄥ噷", 
            "1783|澶忛倯锛堝晢涓橈級", 
            "1774|瑗垮场锛堝崡闃筹級", 
            "1937|婀樿タ", 
            "2730|瑗垮畨鍛ㄨ嚦鍘�", 
            "0732|鍏村畨鐩�", 
            "0733|閿℃灄閮嫆鐩�", 
            "1755|椤瑰煄锛堝懆鍙ｏ級", 
            "1758|鎭幙锛堜俊闃筹級", 
            "1542|淇′赴锛堣担宸烇級", 
            "2421|涔犳按鍘匡紙閬典箟锛�", 
            "2350|瑗垮箔闆北锛堝ぇ閭戯級", 
            "1776|娣呭窛锛堝崡闃筹級", 
            "1855|娴犳按锛堥粍鍐堬級", 
            "0545|瀹ｅ寲锛堝紶瀹跺彛锛�", 
            "1779|鏂伴噹锛堝崡闃筹級", 
            "2721|鍜搁槼鍏村钩", 
            "2722|鍜搁槼褰幙", 
            "2750|鍜搁槼闀挎鍘�", 
            "2811|澶忔渤锛堢敇鍗楋級", 
            "2376|鏂伴兘锛堟垚閮斤級", 
            "2377|鏂版触锛堟垚閮斤級", 
            "0638|鏄旈槼锛堟檵涓級"
        ]
    }, 
    "Y": {
        
        "Y": [
            "2901|閾跺窛", 
            "2106|闃虫湐锛堟鏋楋級", 
            "1104|鎵窞", 
            "1803|瀹滄槍", 
            "1604|鐑熷彴", 
            "1207|涔変箤", 
            "2709|姒嗘灄", 
            "2308|瀹滃", 
            "1904|宀抽槼", 
            "2020|闃虫睙", 
            "0815|钀ュ彛", 
            "1109|瀹滃叴锛堟棤閿★級", 
            "2306|闆呭畨", 
            "1509|瀹滄槬", 
            "2104|鐜夋灄", 
            "1116|鐩愬煄", 
            "2705|寤跺畨", 
            "1266|闆佽崱灞憋紙娓╁窞锛�", 
            "1019|浼婃槬", 
            "0904|寤跺悏", 
            "1275|浣欏锛堝畞娉級", 
            "2041|浜戞诞", 
            "1517|楣版江", 
            "0605|杩愬煄", 
            "0535|閲庝笁鍧★紙淇濆畾锛�", 
            "1437|姘稿畾锛堥緳宀╋級", 
            "1524|鐜夊北鍘匡紙涓婇ザ锛�", 
            "1660|娌傛按锛堜复娌傦級", 
            "1923|姘稿窞", 
            "1920|鐩婇槼", 
            "3106|浼婂畞", 
            "2523|鐜夋邯", 
            "2547|鍏冮槼锛堢孩娌冲窞锛�", 
            "1206|姘稿悍", 
            "1846|瀹滈兘锛堝疁鏄岋級", 
            "1119|浠緛锛堟壃宸烇級", 
            "1276|姘稿槈锛堟俯宸烇級", 
            "1003|浜氬竷鍔�", 
            "0611|闃虫硥", 
            "1832|搴斿煄锛堝瓭鎰燂級", 
            "1112|鎵腑锛堥晣姹燂級", 
            "1658|娌傚崡锛堜复娌傦級", 
            "2749|寤跺畨瀹滃窛鍘�", 
            "1339|榛熷幙锛堥粍灞憋級", 
            "1428|姘稿畨锛堜笁鏄庯級", 
            "1208|鐜夌幆锛堝彴宸烇級", 
            "0568|姘稿勾锛堥偗閮革級", 
            "1228|浜戝拰锛堜附姘达級", 
            "1527|姘镐慨鍘匡紙涔濇睙锛�", 
            "1732|鍋冨笀锛堟礇闃筹級", 
            "5309|鏄撳幙锛堜繚瀹氾級", 
            "1659|閮撳煄锛堣弿娉斤級", 
            "1730|姘稿煄锛堝晢涓橈級", 
            "1747|瀹滈槼锛堟礇闃筹級", 
            "1688|闃充俊锛堟花宸烇級", 
            "0613|闃冲煄锛堟檵鍩庯級", 
            "3415|瀹滃叞锛堝彴婀撅級", 
            "2715|姒嗘灄闈栬竟鍘�", 
            "3103|浼婄妬", 
            "2727|姒嗘灄绁炴湪鍘�", 
            "1442|浜戦渼锛堟汲宸烇級", 
            "1729|绂瑰窞锛堣鏄岋級", 
            "1750|浼婂窛锛堟礇闃筹級", 
            "1751|閯㈤櫟锛堣鏄岋級", 
            "1657|娌傛簮鍘匡紙娣勫崥锛�", 
            "1790|铏炲煄锛堝晢涓橈級", 
            "1440|姘告槬锛堟硥宸烇級", 
            "0567|姘告竻锛堝粖鍧婏級", 
            "0631|鍘熷钩锛堝炕宸烇級", 
            "0730|鐗欏厠鐭�", 
            "1445|灏ゆ邯锛堜笁鏄庯級", 
            "1453|姘告嘲锛堢宸烇級", 
            "1849|鑻卞北锛堥粍鍐堬級", 
            "1854|瀹滃煄锛堣闃筹級", 
            "1859|杩滃畨锛堝疁鏄岋級", 
            "1764|涔夐┈锛堜笁闂ㄥ场锛�", 
            "1689|绂瑰煄锛堝痉宸烇級", 
            "1690|闃宠胺锛堣亰鍩庯級", 
            "0419|閰夐槼锛堥噸搴嗭級", 
            "2538|瀹滆壇锛堟槅鏄庯級", 
            "2823|鐜夐棬甯傦紙閰掓硥锛�", 
            "1870|闃虫柊锛堥粍鐭筹級", 
            "0593|鍏冩皬锛堢煶瀹跺簞锛�", 
            "0905|寤惰竟", 
            "0922|姒嗘爲", 
            "0548|鐩愬北锛堟钵宸烇級", 
            "0537|鐜夋硥灞憋紙閭㈠彴锛�", 
            "0616|姘告祹锛堣繍鍩庯級", 
            "2718|寤跺畨鍚磋捣鍘�", 
            "2565|姘稿杽锛堟槶閫氾級"
        ]
	},
	"Z":{
        "Z": [
            "1701|閮戝窞", 
            "1245|鑸熷北", 
            "1903|寮犲鐣�", 
            "2004|鐝犳捣", 
            "2011|涓北", 
            "2014|婀涙睙", 
            "2013|鑲囧簡", 
            "1126|鍛ㄥ簞锛堟槅灞憋級", 
            "2415|闀囪繙锛堥粩涓滃崡宸烇級", 
            "1606|娣勫崥", 
            "1108|闀囨睙", 
            "1608|鏋ｅ簞", 
            "2402|閬典箟", 
            "1902|鏍床", 
            "2804|寮犳帠", 
            "0513|寮犲鍙�", 
            "2305|鑷础", 
            "0519|姝ｅ畾锛堢煶瀹跺簞锛�", 
            "2904|涓崼", 
            "1408|婕冲窞", 
            "1111|寮犲娓紙鑻忓窞锛�", 
            "1665|婊曞窞锛堟灒搴勶級", 
            "1212|璇告毃锛堢粛鍏达級", 
            "2216|鍎嬪窞", 
            "1714|鍛ㄥ彛", 
            "1672|閭瑰煄锛堟祹瀹侊級", 
            "1648|璇稿煄锛堟綅鍧婏級", 
            "1655|鍏栧窞锛堟祹瀹侊級", 
            "1718|椹婚┈搴�", 
            "1331|鏌ユ祹锛堟尘鍘匡級", 
            "1627|绔犱笜锛堟祹鍗楋級", 
            "0573|寮犲寳锛堝紶瀹跺彛锛�", 
            "1027|鑲囦笢", 
            "1826|閽熺ゥ锛堣崋闂級", 
            "2530|鏄€�", 
            "1865|鏋ｉ槼锛堣闃筹級", 
            "0518|娑垮窞锛堜繚瀹氾級", 
            "2126|璧勬簮锛堟鏋楋級", 
            "1434|婕虫郸锛堟汲宸烇級", 
            "1744|涓墴锛堥儜宸烇級", 
            "2346|璧勯槼", 
            "1656|鎷涜繙锛堢儫鍙帮級", 
            "1663|閭瑰钩鍘匡紙婊ㄥ窞锛�", 
            "2907|涓畞鍘�", 
            "5321|鏋ｅ己锛堣　姘达級", 
            "0540|閬靛寲锛堝攼灞憋級", 
            "0569|璧靛幙锛堢煶瀹跺簞锛�", 
            "0728|鎵庡叞灞競", 
            "1436|婕冲钩锛堥緳宀╋級", 
            "1753|鏌樺煄锛堝晢涓橈級", 
            "1781|闀囧钩锛堝崡闃筹級", 
            "5317|璧炵殗锛堢煶瀹跺簞锛�", 
            "0531|娑块箍锛堝紶瀹跺彛锛�", 
            "0622|宸︽潈锛堟檵涓級", 
            "0723|鎵庨瞾鐗规棗", 
            "0831|搴勬渤", 
            "1443|璇忓畨锛堟汲宸烇級", 
            "1463|鏌樿崳锛堝畞寰凤級", 
            "2428|缁囬噾锛堟瘯鑺傦級"
        ]
    }
}