/**
 * Location
 * The Location module.
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
  ko
) {
  "use strict";

  var Module = function() {
    var self = this;

    Module.prototype.init = function() {
      debug.log("model.weather.Location", "init");

      self.city = ko.observable("");
      self.country = ko.observable("");
      self.region = ko.observable("");

      self.geo = {
        lat: ko.observable(""),
        long: ko.observable("")
      };
    };

    Module.prototype.applyMappings = function(data) {
      debug.log("model.weather.Location", "applyMappings");
      var mapper = Mapper.create();
      mapper.map(self, data);
    };

    Module.prototype.getGeoLocationString = function() {
      return self.geo.lat() + "," + self.geo.long();
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