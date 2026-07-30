'use strict';

exports.type = 'validate';

exports.name = 'hasCorrectStrokeColor';

exports.active = true;

exports.description =
  'checks if all stroke attributes use an allowed base stroke color';

const utils = require('./validationUtilities.js');

const ENOCLS = `Error in plugin "hasCorrectStrokeColor": absent parameters.
  It should have a list of allowed stroke colors in "strokeColors".
  Config example:

  plugins:
  - hasCorrectStrokeColor:
      strokeColors: ['#6E6E6E', '#6e6e6e']

  When validating by asset type, override the defaults per rule instead:

  validate(svg, filename, 'ICON_REGULAR', {
    validateParams: {
      hasCorrectStrokeColor: { strokeColors: ['#6E6E6E', '#6e6e6e'] },
    },
  });
  `;

// matches the stroke color property in inline CSS, but not stroke-width, stroke-linecap etc.
const STROKE_PROPERTY_PATTERN = /(?:^|;)\s*stroke\s*:/i;

/**
 * Checks if all stroke attributes use one of the allowed base stroke colors.
 *
 * The icon coloring tooling (color variant generation in the assets repository and the
 * React design system library) replaces the literal base color value, so every stroke
 * has to be a plain attribute set to exactly one of the allowed notations. The allowed
 * values are supplied by the caller and must stay in sync with whichever literals that
 * tooling replaces - for the ICON_REGULAR defaults that is ASSET_OUTLINE_DEFAULT_COLOR
 * in scripts/generate_colored_regular_assets.sh (mbank-design/assets repository).
 *
 * Any <style> element is rejected (not only stroke rules): the attribute-based format
 * conversions (e.g. Android VectorDrawable) drop CSS entirely, and CSS-defined
 * properties would also bypass the attribute-level rules like hasNoAttribute. A style
 * attribute is rejected only when it defines the stroke color property.
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
  if (!params || !Array.isArray(params.strokeColors)) {
    validateResult.hasCorrectStrokeColor = false;
    console.error(ENOCLS);
    return validateResult;
  }

  let hasBaseColorStroke = false;
  let hasInvalidStroke = false;

  for (const element of utils.findAllElementByAttribute(root, 'stroke')) {
    const stroke = element.attributes.stroke.trim();
    if (stroke.toLowerCase() === 'none') {
      continue;
    }
    if (params.strokeColors.includes(stroke)) {
      hasBaseColorStroke = true;
    } else {
      hasInvalidStroke = true;
    }
  }

  const hasStyleElement = utils.findAllElementByName(root, 'style').length > 0;
  const hasStrokeColorInStyleAttribute = utils
    .findAllElementByAttribute(root, 'style')
    .some((element) => STROKE_PROPERTY_PATTERN.test(element.attributes.style));

  validateResult.hasCorrectStrokeColor =
    hasBaseColorStroke &&
    !hasInvalidStroke &&
    !hasStyleElement &&
    !hasStrokeColorInStyleAttribute;

  return validateResult;
};
