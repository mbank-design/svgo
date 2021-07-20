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

function findAllElementByName(svg, name) {
  var result = [];
  walkTree(svg, function (node) {
    if (node.type === 'element' && node.name === name) {
      result.push(node);
    }
  });
  return result;
}
exports.findAllElementByName = findAllElementByName;

//find all elements with a given attribute
function findAllElementByAttribute(svg, attribute) {
  var result = [];
  walkTree(svg, function (node) {
    if (
      node.type === 'element' &&
      node.attributes.hasOwnProperty.call(node.attributes, attribute)
    ) {
      result.push(node);
    }
  });
  return result;
}
exports.findAllElementByAttribute = findAllElementByAttribute;

//find all elements with a given attribute
function findAllElementByAttributeValue(svg, attribute, value) {
  var result = [];
  walkTree(svg, function (node) {
    if (
      node.type === 'element' &&
      node.attributes.hasOwnProperty.call(node.attributes, attribute) &&
      node.attributes[attribute] === value
    ) {
      result.push(node);
    }
  });
  return result;
}
exports.findAllElementByAttributeValue = findAllElementByAttributeValue;

//find all elements with a given attribute

function walkTree(svg, callback) {
  for (const child of svg.children) {
    callback(child);
    walkTree(child, callback);
  }
}
