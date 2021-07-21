'use strict';

exports.type = 'validate';

exports.active = false;

exports.description = 'checks if the filename has prefix';

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
    var filename = root.filename;

    var prefixes = [
      'retail_',
      'corporate_',
      'sme_',
      'privatebanking_',
      'mobile_',
    ];

    for (var i = 0; i < prefixes.length; i++) {
      if (filename.indexOf(prefixes[i]) === 0) {
        result = true;
      }
    }

    validateResult.isPrefixPresent = result;
  }

  return [root, validateResult];
};
