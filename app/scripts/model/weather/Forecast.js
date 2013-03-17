/**
 * Forecast
 * The Forecast module.
 * @author rishabhsrao
 */
 define([
  "lib.use!lib.debug",
  "util.Storage",
  "util.Constants",
  "util.ErrorHandler",
  "util.Mapper",
  "knockout",
  "jquery",
  "model.weather.Condition"
], function(
  debug,
  Storage,
  Constants,
  ErrorHandler,
  Mapper,
  ko,
  jQuery,
  Condition
) {
  "use strict";

  var Module = function() {
    var self = this;

    Module.prototype.init = function() {
      debug.log("model.weather.Forecast", "init");

      self.conditions = ko.observableArray();
    };

    Module.prototype.applyMappings = function(data) {
      debug.log("model.weather.Forecast", "applyMappings", { data: data });

      var mapper = Mapper.create();

      debug.group("model.weather.Forecast", "applyMappings", "Mapping...");

      if(data.length) {
        jQuery.each(data, function(index, value) {
          var condition = Condition.create();

          debug.log("Mapping", {
            index: index,
            condition: condition,
            value: value
          });
          mapper.map(condition, value);

          debug.log("Pushing", condition, "to", self.conditions());
          self.conditions.push(condition);
        });
      }

      debug.groupEnd();
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