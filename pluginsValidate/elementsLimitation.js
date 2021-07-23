'use strict';

exports.type = 'validate';

exports.active = true;

exports.description =
  'checks if amount of allowed svg elements is within the limit';

const utils = require('./validationUtilities.js');

var ENOCLS = `Error in plugin "elementsLimitation": absent parameters.
It should have a number of allowed svg elements in "amount" attribute.
Config example:

plugins:
-amount: 1
`;

/**
 * Checks if amount of allowed svg elements is within the limit
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
    const maxElements = params.amount;

    const allShapeElements = utils.findAllShapeElements(root);

    const result = maxElements >= allShapeElements.length;
    validateResult.elementsLimitation = result;
  } else {
    console.log(ENOCLS);
    validateResult.elementsLimitation = false;
  }

  return validateResult;
};
