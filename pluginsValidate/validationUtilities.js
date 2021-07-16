'use strict';

function findElementByName(svg, name) {
  for (const child of svg.children) {
    if (child.name === name) {
      return child;
    } else {
      return findElementByName(child, name);
    }
  }
}

exports.findElementByName = findElementByName;
