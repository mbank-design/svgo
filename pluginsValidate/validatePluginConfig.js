var asset_type = {
  ICON_REGULAR: {
    plugins: [
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
        name: 'isSVG',
      },
      {
        name: 'areNoDiacriticCharacters',
      },
    ],
  },
  ICON_COLOR: {},
  ILLUSTRATION: {
    plugins: [
      {
        name: 'isArtboardCorrect',
        params: {
          size: [256, 256],
        },
      },
      {
        name: 'isSnakeCase',
      },
      {
        name: 'isPrefixPresent',
      },
      {
        name: 'areNoDiacriticCharacters',
      },
    ],
  },
};

exports.validationAssetType = asset_type;
