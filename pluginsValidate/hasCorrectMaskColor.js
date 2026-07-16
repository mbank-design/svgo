'use strict';

exports.type = 'validate';

exports.name = 'hasCorrectMaskColor';

exports.active = true;

exports.description =
  'checks if mask elements are filled with an allowed mask color';

const utils = require('./validationUtilities.js');

const ENOCLS = `Error in plugin "hasCorrectMaskColor": absent parameters.
  It should have a list of allowed mask fill colors in "fillColors".
  Config example:

  plugins:
  - hasCorrectMaskColor:
      fillColors: ['white', '#fff', '#ffffff']
  `;

/**
 * Checks if every <mask> element is filled with an allowed mask color.
 *
 * Color icons exported from design tools shape their content with an alpha <mask>
 * whose fills have to be white — any other fill changes the intended transparency
 * of the icon. The comparison is case-insensitive because every notation of white
 * produces the same alpha mask. Icons without a <mask> element (e.g. legacy
 * clipPath-based exports) are not affected by this rule.
 *
 * @example
 *
 * @param {Object} root current iteration root
 * @param {Object} validateResult current validation result
 * @param {Object} params current iteration params
 *
 * @return {Object} validateResult holding the validation result
 *
 * @author Katarzyna Stefanowicz
 */
exports.fn = function (root, validateResult, params) {
  if (!params || !Array.isArray(params.fillColors)) {
    validateResult.hasCorrectMaskColor = false;
    console.error(ENOCLS);
    return validateResult;
  }

  const allowedColors = params.fillColors.map((color) => color.toLowerCase());
  const isAllowedColor = (fill) =>
    allowedColors.includes(fill.trim().toLowerCase());

  const maskElements = utils.findAllElementByName(root, 'mask');

  const result = maskElements.every((maskElement) => {
    const fills = [];

    if (maskElement.attributes.fill !== undefined) {
      fills.push(maskElement.attributes.fill);
    }
    utils.walkTree(maskElement, (node) => {
      if (node.attributes && node.attributes.fill !== undefined) {
        fills.push(node.attributes.fill);
      }
    });

    return fills.length > 0 && fills.every(isAllowedColor);
  });

  validateResult.hasCorrectMaskColor = result;

  return validateResult;
};
