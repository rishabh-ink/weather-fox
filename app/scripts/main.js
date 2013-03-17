(function() {
  "use strict";

  require.config({
    paths: {
    'hm':                        "vendor/hm",
    'esprima':                   "vendor/esprima",
    'domready':                  "../components/requirejs-domready/domReady", // requirejs.com/docs/download.html#domReady
    'lib.use':                   "../components/requirejs-use/use", // documentup.com/tbranyen/use.js
    'jquery':                    "../components/jquery/jquery", // jquery.com
    'knockout':                  "../components/knockoutjs/index", // knockoutjs.com
    'lib.jquery-mobile':         "../components/jquery-mobile/jquery.mobile-1.3.0", // jquerymobile.com
    'lib.debug':                 "../components/javascript-debug/ba-debug", //

    'util.Storage':              "util/Storage",
    'util.Constants':            "util/Constants",
    'util.ErrorHandler':         "util/ErrorHandler",
    'util.GeoLocation':          "util/GeoLocation",
    'util.Network':              "util/Network",
    'util.Mapper':               "util/Mapper",

    'model.City':                "model/City",
    'model.weather.Location':    "model/weather/Location",
    'model.weather.Wind':        "model/weather/Wind",
    'model.weather.Atmosphere':  "model/weather/Atmosphere",
    'model.weather.Astronomy':   "model/weather/Astronomy",
    'model.weather.Condition':   "model/weather/Condition",
    'model.weather.Forecast':    "model/weather/Forecast",
    'model.weather.Units':       "model/weather/Units",

    'viewmodel.Home':            "viewmodel/Home"
    },

    shim: {
      'lib.jquery-mobile': {
        deps: [
          "jquery"
        ]
      },

      'lib.knockout-mapping': {
        deps: [
          "knockout"
        ]
      }
    },

    use: {
      'lib.debug': {
        'attach': "debug"
      },

      'lib.jquery-mobile': {
        'attach': "jquery"
      }
    }
  });

  require([
    "domready",
    "jquery",
    "knockout",
    "lib.use!lib.jquery-mobile",
    "lib.use!lib.debug",
    "viewmodel.Home",
    "model.City"
  ], function(
    domReady,
    jQuery,
    ko,
    jQm,
    debug,
    HomeViewModel,
    City
  ) {
    domReady(function() {

      var viewModels = {
        home: HomeViewModel.create()
      };

      debug.info("main", "Application initialized...");

      jQuery(document).on("pageinit", function(event) {
        var page = {};

        page.node = jQuery(event.target);
        page.name = page.node.data("page-name");

        debug.info("pageinit fired.", page);

        ko.applyBindings(viewModels[page.name], page.node.get(0));
      });

      jQuery(document).on("pageremove", function(event) {
        debug.info("pageremove fired.", page);
      });

      jQuery(document).ready(function() {
        jQuery.mobile.changePage("/home.html");
      });
    });
  });
})();