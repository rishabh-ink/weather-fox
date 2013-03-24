/**
 * Settings
 * The Settings module.
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

  var Settings = function() {
    var self = this;

    Settings.prototype.init = function() {
      debug.log("model.Settings", "init");

      self.autoDetectLocation = ko.observable(true);
      self.currentLocation = ko.observable("");
      self.unitSystem = ko.observable("metric");
    };

    Settings.prototype.applyMappings = function(data) {
      debug.log("model.Settings", "applyMappings", { data: data });

      var mapper = Mapper.create();
      mapper.map(self, data);
    };

    self.init();

    return self;
  };

  return {
    create: function() {
      return new Settings();
    }
  };
});