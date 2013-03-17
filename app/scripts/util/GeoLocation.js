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

		self.position = null;

		Module.prototype.get = function() {
			debug.log("util.GeoLocation.get");

			var deferred = new jQuery.Deferred();

			if(Modernizr.geolocation) {
				debug.log("util.GeoLocation", "Acquiring geolocation");

				deferred.notify("Waiting for location...");

				window.navigator.geolocation.getCurrentPosition(function(p) {
				  self.position = p;
				  debug.log("util.GeoLocation", "Acquired geolocation", self.position);

				  deferred.resolve(self.position);
				});
			} else {
				debug.warn("util.GeoLocation", "geolocation not available");
				deferred.reject();
			}

			return deferred.promise();
		};

		return self;
	};

	return {
		create: function() {
			return new Module();
		}
	};
});