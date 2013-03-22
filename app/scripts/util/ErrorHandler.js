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

    /**
     * Displays a jQuery Mobile style'd unobtrusive popup message.
     * @param error A `jQuery.mobile.loading` message object.
     * @param timeout The number of milliseconds the message should stay on.
     *                Leaving this parameter out will display the message
     *                forever until `jQuery.mobile.loading("hide")` is called.
     * @see http://docs.jquerymobile.com
     */
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