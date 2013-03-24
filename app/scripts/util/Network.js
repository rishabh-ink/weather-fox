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

      self.errorHandler = ErrorHandler.create();
    };

    Network.prototype.getWeather = function(unitSystem, location) {
      debug.log("util.Network.getWeather", "Making AJAX request", {
        location: location,
        url: Constants.api.pipes.baseUrl,
        unit: unitSystem
      });

      var weatherPromise = jQuery.ajax({
        url: Constants.api.pipes.baseUrl,
        data: {
          '_id': Constants.api.pipes.methods.weather,
          '_render': "json",
          'location': location,
          'unit': Constants.unitSystems[unitSystem]
        }
      }).promise();

      return weatherPromise;
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