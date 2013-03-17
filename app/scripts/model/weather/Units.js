/**
 * Units
 * The Units module.
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
      debug.log("model.weather.Units", "init");

      self.distance = ko.observable("");
      self.pressure = ko.observable("");
      self.speed = ko.observable("");
      self.temperature = ko.observable("");

      self.temperatureD = ko.computed(function() {
        return "&deg;" + self.temperature();
      });
    };

    Module.prototype.applyMappings = function(data) {
      debug.log("model.weather.Units", "applyMappings", { data: data });

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