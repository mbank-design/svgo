'use strict';

exports.type = 'validate';

exports.active = true;

exports.description = 'checks if shape elements only have fill';

const utils = require('./validationUtilities.js');

/**
 * Checks if shape elements only have fill
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
exports.fn = function (root, validateResult) {
  const allShapeElements = utils.findAllShapeElements(root);

  const result = allShapeElements.every(
    (shapeElement) =>
      shapeElement.attributes.fill !== undefined &&
      shapeElement.attributes.stroke === undefined
  );

  validateResult.hasOnlyFills = result;

  return validateResult;
};
