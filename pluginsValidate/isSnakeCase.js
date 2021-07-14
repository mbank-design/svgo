'use strict';

exports.type = 'full';

exports.active = false;

exports.description = 'checks if the file is snake_case named';

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
    var filename = root.filename;
    filename = filename.substring(0, filename.length - 4);
    var regex = /^[a-z][a-z0-9_]+$/;
    var result = regex.test(filename);

    validateResult.isSnakeCase = result;
  }

  return [root, validateResult];
};
