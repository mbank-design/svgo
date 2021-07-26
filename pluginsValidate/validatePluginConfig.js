var asset_type = {
  ICON_REGULAR: {
    plugins: [
      {
        name: 'isSVG',
      },
      {
        name: 'isArtboardCorrect',
        params: {
          size: [24, 24],
        },
      },
      {
        name: 'isWorkingAreaCorrect',
        params: {
          size: [22, 22],
        },
      },
      {
        name: 'elementsLimitation',
        params: {
          amount: 1,
          fillOrStroke: 'stroke',
        },
      },
      {
        name: 'hasNoAttribute',
        params: {
          attribute: 'fill',
        },
      },
      {
        name: 'isSnakeCase',
      },

      {
        name: 'hasNoDiacriticCharacters',
      },
    ],
  },
  ICON_COLOR: {
    plugins: [
      {
        name: 'isSVG',
      },
      {
        name: 'isArtboardCorrect',
        params: {
          size: [24, 24],
        },
      },
      {
        name: 'elementsLimitation',
        params: {
          amount: 1,
          fillOrStroke: 'fill',
        },
      },
      {
        name: 'hasNoAttribute',
        params: {
          attribute: 'stroke',
        },
      },
      {
        name: 'isSnakeCase',
      },
      {
        name: 'hasNoDiacriticCharacters',
      },
    ],
  },
  LOGO: {
    plugins: [
      {
        name: 'isSVG',
      },
      {
        name: 'isArtboardCorrect',
        params: {
          size: [null, 48],
        },
      },
      {
        name: 'elementsLimitation',
        params: {
          unlimited: true,
          fillOrStroke: 'fill',
        },
      },
      {
        name: 'hasNoAttribute',
        params: {
          attribute: 'stroke',
        },
      },
      {
        name: 'isSnakeCase',
      },
      {
        name: 'hasNoDiacriticCharacters',
      },
    ],
  },
  ILLUSTRATION: {
    plugins: [
      {
        name: 'isSVG',
      },
      {
        name: 'isArtboardCorrect',
        params: {
          size: [256, 256],
        },
      },
      {
        name: 'areLayersIDsOrderCorrect',
        params: {
          layersNameOrder: [
            'blackFill',
            'blackStroke',
            'whiteFill',
            'stripes',
            'darkmodeMask',
          ],
        },
      },
      {
        name: 'isSnakeCase',
      },
      {
        name: 'hasNoDiacriticCharacters',
      },
      {
        name: 'isPrefixPresent',
      },
    ],
  },
  FLAG: {
    plugins: [
      {
        name: 'isSVG',
      },
      {
        name: 'isArtboardCorrect',
        params: {
          size: [24, 24],
        },
      },
      {
        name: 'elementsLimitation',
        params: {
          unlimited: true,
          fillOrStroke: 'fill',
        },
      },
      {
        name: 'hasNoAttribute',
        params: {
          attribute: 'stroke',
        },
      },
      {
        name: 'isISO3166_1Alpha2',
      },
      {
        name: 'hasNoDiacriticCharacters',
      },
    ],
  },
  AVATAR: {
    plugins: [
      {
        name: 'isSVG',
      },
      {
        name: 'isArtboardCorrect',
        params: {
          size: [24, 24],
        },
      },
      {
        name: 'elementsLimitation',
        params: {
          unlimited: true,
          fillOrStroke: 'fill',
        },
      },
      {
        name: 'hasNoAttribute',
        params: {
          attribute: 'stroke',
        },
      },
      {
        name: 'isSnakeCase',
      },
      {
        name: 'hasNoDiacriticCharacters',
      },
    ],
  },
  ANIMATION: {
    plugins: [
      {
        name: 'isJSON',
      },
      {
        name: 'isSnakeCase',
      },
      {
        name: 'hasNoDiacriticCharacters',
      },
    ],
  },
};

exports.validationAssetType = asset_type;
