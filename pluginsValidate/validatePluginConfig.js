var asset_type = {
  iconRegular: {
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
    resultTemplate: {
      areFillsNone: false,
      isArtboardCorrect: false,
      isWorkingAreaCorrect: false,
      isSnakeCase: false,
      isSVG: false,
      numberOfAllowedPaths: false,
    },
  },
  iconColor: {},
};

exports.validationAssetType = asset_type;
