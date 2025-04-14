// config-overrides.js
const path = require("path");

module.exports = function override(config, env) {
	config.resolve = {
		...(config.resolve || {}),
		alias: {
			...(config.resolve?.alias || {}),
			"~": path.resolve(__dirname, "src"),
		},
	};

	if (config.module?.rules) {
		const scssRule = config.module.rules.find((rule) => Array.isArray(rule.oneOf));

		if (scssRule && Array.isArray(scssRule.oneOf)) {
			scssRule.oneOf.forEach((rule) => {
				if (rule.test && String(rule.test).includes("scss") && Array.isArray(rule.use)) {
					rule.use.forEach((loader) => {
						if (
							typeof loader === "object" &&
							loader.loader &&
							loader.loader.includes("sass-loader")
						) {
							loader.options = {
								...loader.options,
								sassOptions: {
									includePaths: [path.resolve(__dirname, "src")],
								},
							};
						}
					});
				}
			});
		}
	}

	// console.log("[SASS INCLUDE PATH]", path.resolve(__dirname, "src"));
	return config;
};
