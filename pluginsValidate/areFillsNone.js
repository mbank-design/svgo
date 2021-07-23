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
  const allElements = utils.findAllElementByAttribute(root, 'fill');

  validateResult.areFillsNone = allElements.every(
    (element) => element.attributes.fill === 'none'
  );

  return validateResult;
};
