'use strict';

exports.type = 'validate';

exports.active = true;

exports.description = 'checks for many paths are allowed inside of svg';

const utils = require('./validationUtilities.js');

var ENOCLS = `Error in plugin "numberOfAllowedPaths": absent parameters.
It should have a amount of allowed paths in "size" and "strict" default false, allows to pass validation if there are less paths than expected.
Config example:

plugins:
- numberOfAllowedPaths:
amount: 1
strict: true 
`;

/**
 * Checks if the file is snake_case named
 *
 * @example
 *
 * @param {Object} root current iteration root
 * @param {Object} validateResult current validation result
 *
 * @return {Object} validateResult holding the validation result
 *
 * @author Tymon Żarski
 */
exports.fn = function (root, validateResult, params) {
  if (params.amount != null) {
    let strict = params.strict || false;
    let result = false;

    let allElements = utils.findAllElementByName(root, 'path');

    if (allElements.length == params.amount) {
      result = true;
    } else if (strict && allElements.length <= params.amount) {
      result = true;
    }

    validateResult.numberOfAllowedPaths = result;
  } else {
    console.error(ENOCLS);
  }

  return validateResult;
};
