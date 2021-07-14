'use strict';

const { visit } = require('../xast.js');

/**
 * Plugins engine.
 *
 * @module plugins
 *
 * @param {Object} data input data
 * @param {Object} info extra information
 * @param {Array} plugins plugins object from config
 * @return {Object} output data
 */
module.exports = function (data, info, plugins, validateResult) {
  // Try to group sequential elements of plugins array
  // to optimize ast traversing

  const groups = [];
  let prev;
  for (const plugin of plugins) {
    if (prev && plugin.type == prev[0].type) {
      prev.push(plugin);
    } else {
      prev = [plugin];
      groups.push(prev);
    }
  }

  for (const group of groups) {
    switch (group[0].type) {
      case 'perItem':
        [data, validateResult] = perItem(data, info, group, validateResult);

        break;
      case 'perItemReverse':
        [data, validateResult] = perItem(
          data,
          info,
          group,
          validateResult,
          true
        );
        break;
      case 'full':
        [data, validateResult] = full(data, info, group, validateResult);

        break;
      case 'visitor':
        for (const plugin of group) {
          if (plugin.active) {
            const visitor = plugin.fn(data, plugin.params, info);
            visit(data, visitor);
          }
        }
        break;
    }
  }

  return [data, validateResult];
};

/**
 * Direct or reverse per-item loop.
 *
 * @param {Object} data input data
 * @param {Object} info extra information
 * @param {Array} plugins plugins list to process
 * @param {boolean} [reverse] reverse pass?
 * @return {Object} output data
 */
function perItem(data, info, plugins, validateResult, reverse) {
  function monkeys(items, validateResult) {
    items.children = items.children.filter(function (item) {
      // reverse pass
      if (reverse && item.children) {
        monkeys(item, validateResult);
      }

      // main filter
      var filter = true;

      for (var i = 0; filter && i < plugins.length; i++) {
        var plugin = plugins[i];

        if (plugin.active) {
          validateResult = plugin.fn(item, validateResult, plugin.params, info);
          filter = true;
        }
      }

      // direct pass
      if (!reverse && item.children) {
        monkeys(item, validateResult);
      }

      return filter;
    });
    return [items, validateResult];
  }

  return monkeys(data, validateResult);
}

/**
 * "Full" plugins.
 *
 * @param {Object} data input data
 * @param {Object} info extra information
 * @param {Array} plugins plugins list to process
 * @param {Object} validateResult results of validation
 *
 * @return {Object} output data
 */
function full(data, info, plugins, validateResult) {
  plugins.forEach(function (plugin) {
    if (plugin.active) {
      [data, validateResult] = plugin.fn(
        data,
        validateResult,
        plugin.params,
        info
      );
    }
  });

  //return two variables (items and validateResult)
  return [data, validateResult];
}
