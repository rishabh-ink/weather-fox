"use strict";

/**
 * Mapper
 * The Mapper module.
 * @author rishabhsrao
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"jquery",
	"lib.use!lib.jquery-mobile"
],
function(
	debug,
	Constants,
	jQuery,
	jQueryMobile
) {
	debug.log("Loading util.Mapper");
	var Module = function() {
		var self = this;

		Module.prototype.init = function() {
			debug.log("util.Mapper", "Initializing");
		};

		Module.prototype.map = function(module, data) {
			debug.log("util.Mapper", "map", {
				module: module,
				data: data
			});

			var property = null;

			if(data) {
				debug.group("util.Mapper", "map", "Mapping...");
				for(property in data) {
					console.log("Mapping", {
						property: property,
						value: data[property]
					});

					if("undefined" !== typeof (module[property])) {
						module[property]((data[property] && null !== data[property]) ? data[property] : "n/a");
					}
				}
				debug.groupEnd();
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