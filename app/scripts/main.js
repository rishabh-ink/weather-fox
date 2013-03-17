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
    'lib.debug':                 "../components/javascript-debug/ba-debug",
    'lib.modernizr':             "../components/modernizr/modernizr",

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

    use: {
      'lib.debug': {
        'attach': "debug"
      }
    }
  });

  require([
    "domready",
    "jquery",
    "knockout",
    "lib.jquery-mobile",
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

      debug.info("main", "Application initialized...");

      var viewModels = {
        home: HomeViewModel.create()
      };

      jQuery(document).on("pageinit", function(event) {
        var page = {};

        debug.log("main", "pageinit fired.", page);

        page.node = jQuery(event.target);
        page.name = page.node.data("page-name");

        debug.log("main", "Applying KO bindings", page);
        ko.applyBindings(viewModels[page.name], page.node.get(0));
      });

      jQuery(document).on("pageremove", function(event) {
        var page = {};

        debug.log("main", "pageremove fired.", page);

        page.node = jQuery(event.target);
        page.name = page.node.data("page-name");

        debug.log("main", "Cleaning KO node", page);
        ko.cleanNode(page.node.get(0));
      });

      jQuery(document).ready(function() {
        jQuery.mobile.changePage("/home.html");
      });
    });
  });
})();