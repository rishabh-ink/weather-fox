"use strict";

/**
 * GeoLocation
 * The GeoLocation module.
 * @author rishabhsrao
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"util.ErrorHandler",
	"jquery"
],
function(
	debug,
	Constants,
	ErrorHandler,
	jQuery
) {
	debug.log("Loading util.GeoLocation");
	var Module = function() {
		var self = this;

		Module.prototype.init = function() {
			debug.log("util.GeoLocation", "init");

			self.position = null;
			self.deferred = null;
		};

		Module.prototype.get = function() {
			debug.log("util.GeoLocation", "get");

			self.deferred = new jQuery.Deferred();

			if(Modernizr.geolocation) {
				debug.log("util.GeoLocation", "Acquiring geolocation");

				self.deferred.notify("Waiting for location...");

				window.navigator.geolocation.getCurrentPosition(self.success, self.failure, {
					maximumAge: Constants.refreshTimeouts.maximumAge
				});

				return self.deferred.promise();
			} else {
				self.failure();
			}
		};

		Module.prototype.success = function(position) {
			debug.log("util.GeoLocation", "success");

			self.position = position;
			debug.log("util.GeoLocation", "Acquired geolocation", self.position);

			self.deferred.resolve(self.position);
		};

		Module.prototype.failure = function(error) {
			debug.log("util.GeoLocation", "failure");

			debug.warn("util.GeoLocation", "geolocation not available", error);
			self.deferred.reject("Unable to obtain your geolocation. " + error.message);
		};

		return self;
	};

	return {
		create: function() {
			return new Module();
		}
	};
});