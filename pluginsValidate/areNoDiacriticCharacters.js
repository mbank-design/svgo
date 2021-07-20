'use strict';

exports.type = 'validate';

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
    var result = true;
    var filename = root.filename;
    filename = filename.substring(0, filename.length - 4);

    // check for using diacritic characters in file name
    if (filename.search(/[^a-zA-Z0-9_]/) !== -1) {
      result = false;
    }

    validateResult.areNoDiacriticCharacters = result;
  }

  return [root, validateResult];
};
