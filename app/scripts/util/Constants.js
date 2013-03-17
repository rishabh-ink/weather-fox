"use strict";

/**
 * Constants
 * The Constants module stores global constants required in the application.
 * @author See /humans.txt
 */
define({
	module: {
		model: {
		}
	},

	api: {
		test: {
			baseUrl: "http://localhost:3501/data/sample-cities.json",
			methods: {
			}
		},

		pipes: {
			baseUrl: "http://pipes.yahoo.com/pipes/pipe.run",
			methods: {
				weather: "687279a3ea30ea78c978b1bf6e235055"
			}
		}
	},

	keyrings: {
		storage: {
			HOME_CITY: "WCW_HOME_CITY",
			FAV_CITIES: "WCW_FAV_CITIES"
		}
	},

	refreshTimeouts: {
		cache: (120 * 60 * 1000) // 120 mins in milliseconds.
	},

	errors: {
		timeoutError: 20000,
		timeoutWarn: 5000,
		timeoutInfo: 2000,
		storage: {
			FOUND: {
				code: -5000,
				message: "key-value pair found."
			},
			NOT_AVAILABLE: {
				code: -5001,
				message: "localstorage not supported."
			},

			NOT_FOUND: {
				code: -5002,
				message: "key-value pair not found."
			}
		},

		geolocation: {
			NOT_AVAILABLE: {
				message: "geolocation not supported."
			}
		},

		communication: {
			OK: {
				code: 0,
				message: "OK"
			},

			ERROR: {
				code: -1,
				message: "ERROR"
			}
		}
	},

	settings: {},

	icons: {
		themes: {
			vclouds: {
				path: "images/weather-icons/vclouds",
				base: "",
				extension: "",
				mapping: {

				}
			},

			weezle: {
				path: "images/weather-icons/",
				base: "weezle_",
				extension: ".png",
				mapping: {
					// See http://developer.yahoo.com/weather/#codes
					"0": "cloud_thunder_rain", //	tornado
					"1": "cloud_thunder_rain", //	tropical storm
					"2": "cloud_thunder_rain", //	hurricane
					"3": "cloud_thunder_rain", //	severe thunderstorms
					"4": "cloud_thunder_rain", //	thunderstorms
					"5": "rain_and_snow", //	mixed rain and snow
					"6": "rain_and_snow", //	mixed rain and sleet
					"7": "rain_and_snow", //	mixed snow and sleet
					"8": "rain_and_snow", //	freezing drizzle
					"9": "medium_rain", // drizzle
					"10": "rain_and_snow", //	freezing rain
					"11": "rain", //	showers
					"12": "rain", //	showers
					"13": "snow", //	snow flurries
					"14": "rain_and_snow", //	light snow showers
					"15": "much_snow", //	blowing snow
					"16": "snow", //	snow
					"17": "medium_ice", //	hail
					"18": "medium_ice", //	sleet
					"19": "minimal_cloud", //	dust
					"20": "fog", //	foggy
					"21": "fog", //	haze
					"22": "fog", //	smoky
					"23": "fog", //	blustery
					"24": "fog", //	windy
					"25": "medium_cloud", //	cold
					"26": "cloud", //	cloudy
					"27": "moon_cloud_medium", //	mostly cloudy (night)
					"28": "medium_cloud", //	mostly cloudy (day)
					"29": "moon_cloud", //	partly cloudy (night)
					"30": "sun_minimal_clouds", //	partly cloudy (day)
					"31": "fullmoon", //	clear (night)
					"32": "sun", //	sunny
					"33": "fullmoon", //	fair (night)
					"34": "sun", //	fair (day)
					"35": "cloud_thunder_rain", //	mixed rain and hail
					"36": "sun", //	hot
					"37": "rain", //	isolated thunderstorms
					"38": "cloud_thunder_rain", //	scattered thunderstorms
					"39": "cloud_thunder_rain", //	scattered thunderstorms
					"40": "cloud_thunder_rain", //	scattered showers
					"41": "much_snow", //	heavy snow
					"42": "cloud_thunder_rain", //	scattered snow showers
					"43": "much_snow", //	heavy snow
					"44": "medium_cloud", //	partly cloudy
					"45": "cloud_thunder_rain", //	thundershowers
					"46": "rain_and_snow", //	snow showers
					"47": "cloud_thunder_rain", //	isolated thundershowers
					"3200": "cloud", //	not available
				}
			}
		}
	}
});