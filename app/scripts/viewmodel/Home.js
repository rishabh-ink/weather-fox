"use strict";

/**
 * viewmodel.Home
 * The viewmodel.Home module.
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
  "viewmodel.Settings",
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
  SettingsViewModel,
  ko,
  jQuery
) {
  debug.log("Loading viewmodel.Home");
  var Module = function() {
    var self = this;

    Module.prototype.init = function() {
      debug.log("viewmodel.Home", "init");

      self.available = ko.observable(false);

      self.city = City.create();
      self.network = Network.create();
      self.storage = Storage.create();
      self.errorHandler = ErrorHandler.create();

      var cacheStatus = self.load();
    };

    Module.prototype.refresh = function() {
      debug.log("viewmodel.Home", "refresh");

      var storedSettings = null;

      debug.log("viewmodel.Home", "refresh", "Checking if settings are stored...");
      if(Constants.errors.storage.FOUND === self.storage.isAlreadyAvailable(Constants.keyrings.storage.SETTINGS)) {
        debug.log("viewmodel.Home", "refresh", "Stored settings found.");
        storedSettings = self.storage.load(Constants.keyrings.storage.SETTINGS);

        debug.log("viewmodel.Home", "refresh", "Loaded stored settings.", storedSettings);
        if(1 === storedSettings.autoDetectLocation) {
          debug.log("viewmodel.Home", "refresh", "Stored settings: auto detect location was true. Getting weather for current location...");
          self.fetchLocation(storedSettings.unitSystem);
        } else {
          debug.log("viewmodel.Home", "refresh", "Stored settings: auto detect location was false. Getting weather for", storedSettings.currentLocation);
          self.fetchData(storedSettings.unitSystem, storedSettings.currentLocation);
        }
      } else {
        // If no settings are stored, then go for the current location.
        debug.log("viewmodel.Home", "refresh", "No stored settings found. Getting weather for current location...");
        self.fetchLocation(Constants.unitSystems.default);
      }
    };

    Module.prototype.fetchLocation = function(unitSystem) {
      debug.log("viewmodel.Home", "fetchLocation");

      var geo = GeoLocation.create();

      var geoPromise = geo.get();

      geoPromise.done(
        // Success callback
        function(data) {
          debug.log("viewmodel.Home", "fetchLocation", "Got location", { data: data });

          if("undefined" !== typeof data.coords) {
            self.city.weather.location.geo.lat(data.coords.latitude);
            self.city.weather.location.geo.long(data.coords.longitude);

            self.errorHandler.hideMessage();
          }

          self.fetchData(unitSystem);
        }
      );

      geoPromise.progress(function(data) {
        self.errorHandler.showMessage({
          text: data,
          textVisible: true
        });
      });

      geoPromise.fail(
        // Failure callback
        function(data) {
          debug.warn("viewmodel.Home", "fetchLocation", "Failed to get geo-location.", data);

          self.errorHandler.showMessage({
            text: data,
            textVisible: true,
            textonly: true,
            theme: "e",
          }, Constants.errors.timeoutLong);
        }
      );
    };

    /**
     * Fetches data based on the auto-detect location setting.
     * If auto-detect location is set to true, it uses the GPS location;
     * Else, it uses the location text provided in the Settings page.
     * @param location A textual location. If undefined, the GPS location is used.
     */
    Module.prototype.fetchData = function(unitSystem, location) {
      debug.log("viewmodel.Home", "fetchData", location);

      if("undefined" !== typeof location) {
        self.fetchWeather(unitSystem, location);
      } else {
        self.fetchWeather(unitSystem, self.city.weather.location.getGeoLocationString());
      }
    };

    Module.prototype.save = function(data) {
      debug.log("viewmodel.Home", "save");

      self.storage.save(Constants.keyrings.storage.HOME_CITY, data);
    };

    Module.prototype.load = function() {
      debug.log("viewmodel.Home", "load");

      var data = null;

      if(Constants.errors.storage.FOUND === self.storage.isAlreadyAvailable(Constants.keyrings.storage.HOME_CITY)) {
        data = self.storage.load(Constants.keyrings.storage.HOME_CITY);
        self.city.applyMappings(data.value.items[0]);

        self.available(true);

        return true;
      } else {
        return false;
      }
    };

    Module.prototype.fetchWeather = function(unitSystem, location) {
      debug.log("viewmodel.Home", "fetchWeather");

      debug.log("viewmodel.Home", "fetchWeather", "Fetching weather", self.city);

      self.errorHandler.showMessage({
        text: "Obtaining weather for your location...",
        textVisible: true
      });

      var weatherPromise = self.network.getWeather(unitSystem, location);

      weatherPromise.done(function(data) {
        debug.log("viewmodel.Home", "fetchWeather", "Setting up weather", data);

        if("undefined" !== typeof (data.value.items[0].results)) {
          if(null === data.value.items[0].results) {
            debug.error("viewmodel.Home", "fetchWeather", "Invalid data received.");

            self.errorHandler.showMessage({
              text: "Could not obtain weather information for your city.",
              textVisible: true,
              textonly: true,
              theme: "e",
            }, Constants.errors.timeoutLong);
          }
        } else {
          debug.log("viewmodel.Home", "fetchWeather", "Data received, applying mappings...");
          self.city.applyMappings(data.value.items[0]);

          self.available(true);

          debug.log("viewmodel.Home", "fetchWeather", "Saving to localStorage...");
          self.save(data);

          self.errorHandler.hideMessage();
        }
      });

      weatherPromise.fail(function() {
        debug.warn("viewmodel.Home", "fetchWeather", "Failed to get weather info.");

        self.errorHandler.showMessage({
          text: "Sorry, could not obtain weather information. Please try again.",
          textVisible: true,
          textonly: true,
          theme: "e",
        }, Constants.errors.timeoutLong);
      });
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