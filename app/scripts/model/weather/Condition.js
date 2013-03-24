/**
 * Condition
 * The Condition module.
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
      debug.log("model.weather.Condition", "init");

      self.code = ko.observable("3200");
      self.date = ko.observable("");
      self.temp = ko.observable("");
      self.text = ko.observable("");
      self.high = ko.observable("");
      self.low = ko.observable("");

      self.icon = ko.computed(function() {
        var url =
          Constants.icons.themes.weezle.path +
          Constants.icons.themes.weezle.base +
          Constants.icons.themes.weezle.mapping[self.code()] +
          Constants.icons.themes.weezle.extension;

        debug.log("model.weather.Condition", "init", "Generated image URL", url);

        return url;
      });
    };

    Module.prototype.applyMappings = function(data) {
      debug.log("model.weather.Condition", "applyMappings", { data: data });

      // var mapper = Mapper.create();
      // mapper.map(self, data);

      if("undefined" !== typeof data.code) {
        self.code(data.code);
      } else {
        self.code("n/a");
      }

      if("undefined" !== typeof data.date) {
        self.date(data.date);
      } else {
        self.date("n/a");
      }

      if("undefined" !== typeof data.temp) {
        self.temp(data.temp);
      } else {
        self.temp("n/a");
      }

      if("undefined" !== typeof data.text) {
        self.text(data.text);
      } else {
        self.text("n/a");
      }

      if("undefined" !== typeof data.high) {
        self.high(data.high);
      } else {
        self.high("n/a");
      }

      if("undefined" !== typeof data.low) {
        self.low(data.low);
      } else {
        self.low("n/a");
      }
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