/**
 * City
 * The City module.
 * @author rishabhsrao
 */
 define([
  "lib.use!lib.debug",
  "util.Storage",
  "util.Constants",
  "util.ErrorHandler",
  "util.Mapper",
  "model.weather.Astronomy",
  "model.weather.Atmosphere",
  "model.weather.Condition",
  "model.weather.Forecast",
  "model.weather.Location",
  "model.weather.Wind",
  "model.weather.Units",
  "knockout"
], function(
  debug,
  Storage,
  Constants,
  ErrorHandler,
  Mapper,
  Astronomy,
  Atmosphere,
  Condition,
  Forecast,
  Location,
  Wind,
  Units,
  ko
) {
  "use strict";

  var City = function() {
    var self = this;

    City.prototype.init = function() {
      debug.log("model.City", "init");

      self.weather = {
        location: Location.create(),
        wind: Wind.create(),
        atmosphere: Atmosphere.create(),
        astronomy: Astronomy.create(),
        condition: Condition.create(),
        // forecast: Forecast.create(),
        units: Units.create()
      };
    };

    City.prototype.applyMappings = function(data) {
      debug.log("model.city", "applyMappings", { data: data });

      if(data) {
        if("undefined" !== typeof (data['yweather:location'])) {
          self.weather.location.applyMappings(data['yweather:location']);
        }

        if("undefined" !== typeof (data['yweather:wind'])) {
          self.weather.wind.applyMappings(data['yweather:wind']);
        }

        if("undefined" !== typeof (data['yweather:atmosphere'])) {
          self.weather.atmosphere.applyMappings(data['yweather:atmosphere']);
        }

        if("undefined" !== typeof (data['yweather:astronomy'])) {
          self.weather.astronomy.applyMappings(data['yweather:astronomy']);
        }

        if("undefined" !== typeof (data['yweather:units'])) {
          self.weather.units.applyMappings(data['yweather:units']);
        }

        if("undefined" !== typeof (data.item)) {
          if("undefined" !== typeof (data.item['yweather:condition'])) {
            debug.warn("before: applied condition mapping", {
              'self.weather.condition.code': self.weather.condition.code(),
              'self.weather.condition.date': self.weather.condition.date(),
              'self.weather.condition.temp': self.weather.condition.temp(),
              'self.weather.condition.text': self.weather.condition.text(),
              'self.weather.condition.high': self.weather.condition.high(),
              'self.weather.condition.low': self.weather.condition.low()
            });

            self.weather.condition.applyMappings(data.item['yweather:condition']);

            debug.warn("after: applied condition mapping", {
              'self.weather.condition.code': self.weather.condition.code(),
              'self.weather.condition.date': self.weather.condition.date(),
              'self.weather.condition.temp': self.weather.condition.temp(),
              'self.weather.condition.text': self.weather.condition.text(),
              'self.weather.condition.high': self.weather.condition.high(),
              'self.weather.condition.low': self.weather.condition.low()
            });
          }

          if("undefined" !== typeof (data.item['yweather:forecast'])) {
            // self.weather.forecast.applyMappings(data.item['yweather:forecast']);
          }
        }
      }
    };

    self.init();

    return self;
  };

  return {
    create: function() {
      return new City();
    }
  };
});