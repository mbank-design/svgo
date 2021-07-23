'use strict';

exports.type = 'validate';

exports.active = true;

exports.description = 'checks if viewBox has correct size';

/**
 * Checks if viewBox has correct size
 *
 * @example
 *
 * @param {Object} root current iteration root
 * @param {Object} validateResult current validation result
 * @param {Object} params current iteration params
 *
 * @return {Object} validateResult holding the validation result
 *
 * @author Tymon Żarski
 */

var ENOCLS = `Error in plugin "isArtboardCorrect": absent parameters.
  It should have a size of Artboard in "size".
  Config example:

  plugins:
  - isArtboardCorrect:
      size: [24, 24]
  `;

exports.fn = function (root, validateResult, params) {
  if (
    (params || params === {}) &&
    root.children[0].attributes.viewBox &&
    root.children[0].attributes.viewBox != null
  ) {
    let viewBox = root.children[0].attributes.viewBox
      .split(' ')
      .map(function (value) {
        if (value !== 0) {
          return parseInt(value, 10);
        }
      })
      .filter(function (value) {
        return value !== 0;
      });

    validateResult.isArtboardCorrect = compareArrayCells(viewBox, params.size);
  } else if (params === {} || !params) {
    console.error(ENOCLS);
  }

  return validateResult;
};

//compare if equivalent cells in two arrays are equal
function compareArrayCells(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}
