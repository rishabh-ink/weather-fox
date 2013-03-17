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
	"lib.use!lib.jquery-mobile"
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

		Module.prototype.showError = function(error) {
			debug.error(error);
			jQuery.mobile.showPageLoadingMsg("e", error, true);
			setTimeout(jQuery.mobile.hidePageLoadingMsg, Constants.errors.timeoutError);
		};

		Module.prototype.showWarn = function(error) {
			debug.warn(error);
			jQuery.mobile.showPageLoadingMsg("e", error, true);
			setTimeout(jQuery.mobile.hidePageLoadingMsg, Constants.errors.timeoutWarn);
		};

		Module.prototype.showInfo = function(error) {
			debug.info(error);
			jQuery.mobile.showPageLoadingMsg("a", error, true);
			setTimeout(jQuery.mobile.hidePageLoadingMsg, Constants.errors.timeoutInfo);
		};

		return self;
	};

	return {
		create: function() {
			return new Module();
		}
	};
});