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
        name: 'numberOfAllowedPaths',
        params: {
          amount: 1,
        },
      },
      {
        name: 'areFillsNone',
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
        name: 'numberOfAllowedPaths',
        params: {
          amount: 0,
        },
      },
      {
        name: 'elementsLimitation',
        params: {
          amount: 1,
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
          amount: 1,
        },
      },
      {
        name: 'numberOfAllowedPaths',
        params: {
          amount: 0,
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
        name: 'hasOnlyFills',
      },
      {
        name: 'numberOfAllowedPaths',
        params: {
          amount: 0,
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
        name: 'fillsOnly',
      },
      {
        name: 'numberOfAllowedPaths',
        params: {
          amount: 0,
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
};

exports.validationAssetType = asset_type;
