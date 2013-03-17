/**
 * Atmosphere
 * The Atmosphere module.
 * @author rishabhsrao
 */
 define([
  "lib.use!lib.debug",
  "util.Storage",
  "util.Constants",
  "util.ErrorHandler",
  "util.Mapper",
  "knockout"
], function(
  debug,
  Storage,
  Constants,
  ErrorHandler,
  Mapper,
  ko) {
  "use strict";

  var Module = function() {
    var self = this;

    Module.prototype.init = function() {
      debug.log("model.weather.Atmosphere", "init");

      self.humidity = ko.observable("");
      self.pressure = ko.observable("");
      self.rising = ko.observable("");
      self.visibility = ko.observable("");
    };

    Module.prototype.applyMappings = function(data) {
      debug.log("model.weather.Atmosphere", "applyMappings", { data: data });

      var mapper = Mapper.create();
      mapper.map(self, data);
    };

    self.init();

    return self;
  };

  return {
    create: function() {
      return new Module();
    }
  };
});