var asset_type = {
  iconRegular: {
    config: {
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
        // // only single path is allowed
        // {
        //   name: 'areThereNthPaths',
        //   params: {
        //     amount: 1,
        //   },
        // },
        // no fills are allowed
        // {
        //   name: 'areFillsAllowed',
        //   params: {
        //     state: false,
        //   },
        // },
        // follow snake case
        {
          name: 'isSnakeCase',
        },
      ],
    },
    resultTemplate: {
      isArtboardCorrect: false,
      isWorkingAreaCorrect: false,
      areThereNthPaths: false,
      areFillsAllowed: false,
      isSnakeCase: false,
    },
  },
  iconColor: {},
};

exports.validationAssetType = asset_type;
