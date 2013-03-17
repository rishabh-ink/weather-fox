"use strict";

/**
 * Storage
 * The Storage module.
 * @author rishabhsrao
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"knockout"
],
function(
	debug,
	Constants,
	ko
) {
	debug.log("Loading util.Storage");
	var Module = function() {
		var self = this;

		Module.prototype.save = function(key, value) {
			if(Modernizr.localstorage) {
				debug.log("Attempting to save to localStorage", key, value);
				localStorage.setItem(key, ko.toJSON(value));
				debug.log("util.Storage", "Saved to localStorage", localStorage, key, value);
				return true;
			} else {
				debug.warn("util.Storage", "localStorage not available");
				return Constants.errors.storage.NOT_AVAILABLE;
			}
		};

		Module.prototype.isAlreadyAvailable = function(key) {
			if(Modernizr.localstorage) {
				if(null !== localStorage.getItem(key)) {
					return Constants.errors.storage.FOUND;
				} else {
					debug.warn("util.Storage", "Value not found", key);
					return Constants.errors.storage.NOT_FOUND;
				}
			} else {
				debug.warn("util.Storage", "localStorage not available");
				return Constants.errors.storage.NOT_AVAILABLE;
			}
		};

		Module.prototype.load = function(key) {
			debug.log("Attempting to load from localStorage", key);
			if(Modernizr.localstorage) {
				var value = localStorage.getItem(key);

				if(null !== value) {
					var valueParsed = JSON.parse(value);
					debug.log("util.Storage", "Loaded from localStorage", key, valueParsed);
					return valueParsed;
				} else {
					debug.warn("util.Storage", "Value not found", key);
					return Constants.errors.storage.NOT_FOUND;
				}
			} else {
				debug.warn("util.Storage", "localStorage not available");
				return Constants.errors.storage.NOT_AVAILABLE;
			}
		};

		Module.prototype.clear = function() {
			if(Modernizr.localstorage) {
				localStorage.clear();
				debug.log("util.Storage", "Cleared localStorage");
				return true;
			} else {
				debug.warn("util.Storage", "localStorage not available");
				return Constants.errors.storage.NOT_AVAILABLE;
			}
		};

		return self;
	};

	return {
		create: function() {
			return new Module();
		}
	};
});