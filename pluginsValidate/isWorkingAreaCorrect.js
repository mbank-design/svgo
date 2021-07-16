'use strict';

exports.type = 'validate';

exports.active = true;

exports.description = 'checks if working area is within limits';

const svgPathBbox = require('svg-path-bbox');
const utils = require('./validationUtilities');

/**
 * Checks if working area is within limits
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

var ENOCLS = `Error in plugin "isWorkingAreaCorrect": absent parameters.
  It should have a size of working area in "size".
  Config example:

  plugins:
  - isWorkingAreaCorrect:
      size: [22, 22]
  `;

exports.fn = function (root, validateResult, params) {
  if (params && utils.findElementByName(root, 'path')) {
    var result = false;
    const path = utils.findElementByName(root, 'path');
    const Artboard = utils
      .findElementByName(root, 'svg')
      .attributes.viewBox.split(' ');
    const size = params.size;
    const boundingSize = [parseInt(size[0], 10), parseInt(size[1], 10)];
    const ArtboardSize = [parseInt(Artboard[2], 10), parseInt(Artboard[3], 10)];
    const workingArea = svgPathBbox(path.attributes.d);
    const workingAreaSize = [
      workingArea[2] - workingArea[0],
      workingArea[3] - workingArea[1],
    ];
    const ArtboardCordiantes = [
      (ArtboardSize[0] - boundingSize[0]) / 2,
      (ArtboardSize[1] - boundingSize[1]) / 2,
    ];

    if (
      checkWorkingArea(workingAreaSize, boundingSize) &&
      ArtboardCordiantes[0] <= workingArea[0] &&
      ArtboardCordiantes[1] <= workingArea[1]
    ) {
      result = true;
    } else {
      result = false;
    }

    validateResult.isWorkingAreaCorrect = result;
  } else if (!params) {
    console.error(ENOCLS);
  }

  return [root, validateResult];
};

//check if working area and bounding box arrays contain the same values
function checkWorkingArea(workingArea, boundingBox) {
  return workingArea[0] === boundingBox[0] && workingArea[1] === boundingBox[1];
}
