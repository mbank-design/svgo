'use strict';

exports.type = 'full';

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
 * @return {Objects} root holding the SVG data, and validateResult holding the validation result
 *
 * @author Tymon Żarski
 */

var ENOCLS = `Error in plugin "isArtboardCorrect": absent parameters.
  It should have a size of Artboard in "size".
  Config example:

  plugins:
  - isArtboardCorrect:
      size: ["24", "24"]
  `;

exports.fn = function (root, validateResult, params) {
  if (
    params &&
    root.children[0].attributes.viewBox &&
    root.children[0].attributes.viewBox != null
  ) {
    var result = false;
    let viewBox = root.children[0].attributes.viewBox.split(' ');
    viewBox = nonZero(viewBox);
    if (compareArrayCells(viewBox, params.size)) {
      result = true;
    } else {
      result = false;
    }
    validateResult.isArtboardCorrect = result;
  } else if (!params) {
    console.error(ENOCLS);
  }

  return [root, validateResult];
};

// remove all 0 form array and return it
function nonZero(array) {
  let result = [];

  array.forEach(function (item) {
    if (item !== '0') {
      result.push(item);
    }
  });

  return result;
}

//comapre if equivalent cells in two arrays are equal
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
