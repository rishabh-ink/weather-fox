"use strict";

/**
 * Network
 * The Network module.
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
	debug.log("Loading util.Network");
	var Network = function() {
		var self = this;

		Network.prototype.init = function() {
			debug.log("util.Network.init");
			$.ajaxSetup({
			  type: "GET",
			  dataType: "json"
			});
		};

		Network.prototype.getWeather = function(location) {
			debug.log("util.Network.getWeather", "Making AJAX request", {
				location: location,
				url: Constants.api.test.baseUrl
			});

			return jQuery.ajax({
				url: Constants.api.test.baseUrl,
				data: {
					'_id': Constants.api.test.methods.weather,
					'_render': "json",
					'location': location
				}
			}).promise();
		};

		self.init();
		return self;
	};

	return {
		create: function() {
			return new Network();
		}
	};
});