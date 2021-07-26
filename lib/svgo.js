'use strict';

const {
  defaultPlugins,
  defaultValidatePlugins,
  resolvePluginConfig,
  resolveValidatePluginConfig,
  extendDefaultPlugins,
} = require('./svgo/config.js');
const svg2js = require('./svgo/svg2js.js');
const js2svg = require('./svgo/js2svg.js');
const invokePlugins = require('./svgo/plugins.js');
const JSAPI = require('./svgo/jsAPI.js');
const { encodeSVGDatauri } = require('./svgo/tools.js');
const {
  validationAssetType,
} = require('../pluginsValidate/validatePluginConfig.js');

exports.extendDefaultPlugins = extendDefaultPlugins;

const optimize = (input, config) => {
  if (config == null) {
    config = {};
  }
  if (typeof config !== 'object') {
    throw Error('Config should be an object');
  }
  const maxPassCount = config.multipass ? 10 : 1;
  let prevResultSize = Number.POSITIVE_INFINITY;
  let svgAsJs = null;
  const info = {};
  if (config.path != null) {
    info.path = config.path;
  }
  for (let i = 0; i < maxPassCount; i += 1) {
    info.multipassCount = i;
    svgAsJs = svg2js(input);
    if (svgAsJs.error != null) {
      if (config.path != null) {
        svgAsJs.path = config.path;
      }
      return svgAsJs;
    }
    const plugins = config.plugins || defaultPlugins;
    if (Array.isArray(plugins) === false) {
      throw Error(
        "Invalid plugins list. Provided 'plugins' in config should be an array."
      );
    }
    const resolvedPlugins = plugins.map((plugin) =>
      resolvePluginConfig(plugin, config)
    );
    svgAsJs = invokePlugins(svgAsJs, info, resolvedPlugins);
    svgAsJs = js2svg(svgAsJs, config.js2svg);
    if (svgAsJs.error) {
      throw Error(svgAsJs.error);
    }
    if (svgAsJs.data.length < prevResultSize) {
      input = svgAsJs.data;
      prevResultSize = svgAsJs.data.length;
    } else {
      if (config.datauri) {
        svgAsJs.data = encodeSVGDatauri(svgAsJs.data, config.datauri);
      }
      if (config.path != null) {
        svgAsJs.path = config.path;
      }
      return svgAsJs;
    }
  }
  return svgAsJs;
};
exports.optimize = optimize;

const validate = (input, filename, type, config) => {
  if (config === undefined) {
    config = {};
  }
  let validateResult = {};

  if (config.plugins === undefined) {
    let validationAssetTypeConfig = validationAssetType[type];
    config.plugins = validationAssetTypeConfig.plugins;
  }

  if (typeof config !== 'object') {
    throw Error('Config should be an object');
  }

  const info = {};
  if (config.path !== undefined) {
    info.path = config.path;
  }

  let dataToValidate;

  if (type === 'ANIMATION') {
    dataToValidate = { data: input };
  } else {
    dataToValidate = svg2js(input);
  }

  dataToValidate.filename = filename;
  dataToValidate.type = type;

  if (dataToValidate.error !== undefined) {
    validateResult.isSVG = false;
    if (config.path !== null) {
      dataToValidate.path = config.path;
    }
    return validateResult;
  }

  const plugins = config.plugins || defaultValidatePlugins;

  if (!Array.isArray(plugins)) {
    throw Error(
      "Invalid plugins list. Provided 'plugins' in config should be an array."
    );
  }

  const resolvedPlugins = plugins.map((plugin) =>
    resolveValidatePluginConfig(plugin, config)
  );

  validateResult = invokePlugins(
    dataToValidate,
    info,
    resolvedPlugins,
    validateResult
  );

  return validateResult;
};
exports.validate = validate;

/**
 * The factory that creates a content item with the helper methods.
 *
 * @param {Object} data which is passed to jsAPI constructor
 * @returns {JSAPI} content item
 */
const createContentItem = (data) => {
  return new JSAPI(data);
};
exports.createContentItem = createContentItem;
