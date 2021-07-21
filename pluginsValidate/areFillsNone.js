'use strict';

exports.type = 'validate';

exports.active = true;

exports.description = 'checks if svg contains any fills';

const utils = require('./validationUtilities.js');

/**
 * Checks if svg contains any fills
 *
 *
 * @param {Object} root current iteration root
 * @param {Object} validateResult current validation result
 *
 * @return {Object} validateResult holding the validation result
 *
 * @author Tymon Żarski
 */
exports.fn = function (root, validateResult) {
  let result = false;

  let allElements = utils.findAllElementByAttribute(root, 'fill');

  result = checkIfAllFillsAreNone(allElements);

  validateResult.areFillsNone = result;

  return validateResult;
};

// check if all fill in found elements of object have a value 'none' if yes, return true
function checkIfAllFillsAreNone(elements) {
  let result = true;

  elements.forEach(function (element) {
    if (element.attributes.fill !== 'none') {
      result = false;
    }
  });

  return result;
}
