'use strict';

exports.type = 'validate';

exports.active = true;

exports.description = 'checks if the file is snake_case named';

const utils = require('./validationUtilities.js');

/**
 * Checks if the file is snake_case named
 *
 * @example
 *
 * @param {Object} root current iteration root
 * @param {Object} validateResult current validation result
 *
 * @return {Objects} root holding the SVG data, and validateResult holding the validation result
 *
 * @author Tymon Żarski
 */

exports.fn = function (root, validateResult) {
  if (root.filename) {
    var result = false;

    // get extention form file name (if any)
    const ext = root.filename.split('.').pop();

    var svgTag = utils.findElementByName(root, 'svg');

    if (svgTag.name === 'svg' && ext === 'svg') {
      result = true;
    }

    validateResult.isSVG = result;
  }

  return [root, validateResult];
};
