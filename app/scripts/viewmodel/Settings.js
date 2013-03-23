"use strict";

/**
 * viewmodel.Settings
 * The viewmodel.Settings module.
 * @author rishabhsrao
 */
define([
  "lib.use!lib.debug",
  "util.Constants",
  "util.ErrorHandler",
  "util.Storage",
  "util.GeoLocation",
  "util.Network",
  "model.City",
  "knockout",
  "jquery"
],
function(
  debug,
  Constants,
  ErrorHandler,
  Storage,
  GeoLocation,
  Network,
  City,
  ko,
  jQuery
) {
  debug.log("Loading viewmodel.Settings");
  var Module = function() {
    var self = this;

    Module.prototype.init = function() {
      debug.log("viewmodel.Settings", "init");

      self.autoDetectLocation = ko.observable({
        value: true,
        text: "On"
      });
      self.currentLocation = ko.observable("");
      self.unitSystem = ko.observable("imperial");

      self.autoDetectLocationOptions = ko.observableArray([
        { value: false, text: "Off" },
        { value: true, text: "On" }
      ]);
    };

    Module.prototype.save = function() {
      debug.log("viewmodel.Settings", "save");
    };

    Module.prototype.load = function() {
      debug.log("viewmodel.Settings", "load");
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