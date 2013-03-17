"use strict";

/**
 * ErrorHandler
 * The ErrorHandler module.
 * @author rishabhsrao
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"jquery",
	"lib.jquery-mobile"
],
function(
	debug,
	Constants,
	jQuery,
	jQueryMobile
) {
	debug.log("Loading util.ErrorHandler");
	var Module = function() {
		var self = this;

		Module.prototype.showMessage = function(error, timeout) {
			debug.log("ErrorHandler", "showMessage", error);

			jQuery.mobile.loading("show", error);

			if("undefined" !== typeof timeout) {
				setTimeout(function() {
					self.hideMessage();
				}, timeout);
			}
		};

		Module.prototype.hideMessage = function() {
			debug.log("ErrorHandler", "hideMessage");
			jQuery.mobile.loading("hide");
		};

		return self;
	};

	return {
		create: function() {
			return new Module();
		}
	};
});