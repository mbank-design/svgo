'use strict';

/**
 * @typedef {import('../lib/types').Plugin} Plugin
 */

const { optimize, validate } = require('./svgo.js');

test('allow to setup default preset', () => {
  const svg = `
    <?xml version="1.0" encoding="utf-8"?>
    <svg viewBox="0 0 120 120">
      <desc>
        Not standard description
      </desc>
      <circle fill="#ff0000" cx="60" cy="60" r="50"/>
    </svg>
  `;
  const { data } = optimize(svg, {
    plugins: ['preset-default'],
    js2svg: { pretty: true, indent: 2 },
  });
  expect(data).toMatchInlineSnapshot(`
    "<svg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="red"/>
    </svg>
    "
  `);
});

test('allow to disable and customize plugins in preset', () => {
  const svg = `
    <?xml version="1.0" encoding="utf-8"?>
    <svg viewBox="0 0 120 120">
      <desc>
        Not standard description
      </desc>
      <circle fill="#ff0000" cx="60" cy="60" r="50"/>
    </svg>
  `;
  const { data } = optimize(svg, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeXMLProcInst: false,
            removeDesc: {
              removeAny: false,
            },
          },
        },
      },
    ],
    js2svg: { pretty: true, indent: 2 },
  });
  expect(data).toMatchInlineSnapshot(`
    "<?xml version="1.0" encoding="utf-8"?>
    <svg viewBox="0 0 120 120">
      <desc>
        Not standard description
      </desc>
      <circle cx="60" cy="60" r="50" fill="red"/>
    </svg>
    "
  `);
});

test('warn when user tries enable plugins in preset', () => {
  const svg = `
    <svg viewBox="0 0 120 120"></svg>
  `;
  const warn = jest.spyOn(console, 'warn');
  optimize(svg, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            cleanupListOfValues: true,
          },
        },
      },
    ],
    js2svg: { pretty: true, indent: 2 },
  });
  expect(warn)
    .toBeCalledWith(`You are trying to configure cleanupListOfValues which is not part of preset-default.
Try to put it before or after, for example

plugins: [
  {
    name: 'preset-default',
  },
  'cleanupListOfValues'
]
`);
  warn.mockRestore();
});

describe('allow to configure EOL', () => {
  test('should respect EOL set to LF', () => {
    const svg = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg viewBox="0 0 120 120">
        <desc>
          Not standard description
        </desc>
        <circle fill="#ff0000" cx="60" cy="60" r="50"/>
      </svg>
    `;
    const { data } = optimize(svg, {
      js2svg: { eol: 'lf', pretty: true, indent: 2 },
    });
    // using toEqual because line endings matter in these tests
    expect(data).toEqual(
      '<svg viewBox="0 0 120 120">\n  <circle cx="60" cy="60" r="50" fill="red"/>\n</svg>\n'
    );
  });

  test('should respect EOL set to CRLF', () => {
    const svg = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg viewBox="0 0 120 120">
        <desc>
          Not standard description
        </desc>
        <circle fill="#ff0000" cx="60" cy="60" r="50"/>
      </svg>
    `;
    const { data } = optimize(svg, {
      js2svg: { eol: 'crlf', pretty: true, indent: 2 },
    });
    // using toEqual because line endings matter in these tests
    expect(data).toEqual(
      '<svg viewBox="0 0 120 120">\r\n  <circle cx="60" cy="60" r="50" fill="red"/>\r\n</svg>\r\n'
    );
  });

  test('should default to LF line break for any other EOL values', () => {
    const svg = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg viewBox="0 0 120 120">
        <desc>
          Not standard description
        </desc>
        <circle cx="60" cy="60" fill="#ff0000" r="50"/>
      </svg>
    `;
    const { data } = optimize(svg, {
      js2svg: { eol: 'invalid', pretty: true, indent: 2 },
    });
    // using toEqual because line endings matter in these tests
    expect(data).toEqual(
      '<svg viewBox="0 0 120 120">\n  <circle cx="60" cy="60" r="50" fill="red"/>\n</svg>\n'
    );
  });
});

describe('allow to configure final newline', () => {
  test('should not add final newline when unset', () => {
    const svg = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg viewBox="0 0 120 120">
        <desc>
          Not standard description
        </desc>
        <circle cx="60" cy="60" r="50" fill="#ff0000"/>
      </svg>
    `;
    const { data } = optimize(svg, { js2svg: { eol: 'lf' } });
    // using toEqual because line endings matter in these tests
    expect(data).toEqual(
      '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="red"/></svg>'
    );
  });

  test('should add final newline when set', () => {
    const svg = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg viewBox="0 0 120 120">
        <desc>
          Not standard description
        </desc>
        <circle fill="#ff0000" cx="60" cy="60" r="50"/>
      </svg>
    `;
    const { data } = optimize(svg, {
      js2svg: { finalNewline: true, eol: 'lf' },
    });
    // using toEqual because line endings matter in these tests
    expect(data).toEqual(
      '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="red"/></svg>\n'
    );
  });

  test('should not add extra newlines when using pretty: true', () => {
    const svg = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg viewBox="0 0 120 120">
        <desc>
          Not standard description
        </desc>
        <circle fill="#ff0000" cx="60" cy="60" r="50"/>
      </svg>
    `;
    const { data } = optimize(svg, {
      js2svg: { finalNewline: true, pretty: true, indent: 2, eol: 'lf' },
    });
    // using toEqual because line endings matter in these tests
    expect(data).toEqual(
      '<svg viewBox="0 0 120 120">\n  <circle cx="60" cy="60" r="50" fill="red"/>\n</svg>\n'
    );
  });
});

test('allow to customize precision for preset', () => {
  const svg = `
    <svg viewBox="0 0 120 120">
      <circle fill="#ff0000" cx="60.444444" cy="60" r="50"/>
    </svg>
  `;
  const { data } = optimize(svg, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          floatPrecision: 4,
        },
      },
    ],
    js2svg: { pretty: true, indent: 2 },
  });
  expect(data).toMatchInlineSnapshot(`
    "<svg viewBox="0 0 120 120">
      <circle cx="60.4444" cy="60" r="50" fill="red"/>
    </svg>
    "
  `);
});

test('plugin precision should override preset precision', () => {
  const svg = `
    <svg viewBox="0 0 120 120">
      <circle fill="#ff0000" cx="60.444444" cy="60" r="50"/>
    </svg>
  `;
  const { data } = optimize(svg, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          floatPrecision: 4,
          overrides: {
            cleanupNumericValues: {
              floatPrecision: 5,
            },
          },
        },
      },
    ],
    js2svg: { pretty: true, indent: 2 },
  });
  expect(data).toMatchInlineSnapshot(`
    "<svg viewBox="0 0 120 120">
      <circle cx="60.44444" cy="60" r="50" fill="red"/>
    </svg>
    "
  `);
});

test('provides informative error in result', () => {
  const svg = `<svg viewBox="0 0 120 120">
      <circle fill="#ff0000" cx=60.444444" cy="60" r="50"/>
    </svg>
  `;
  try {
    optimize(svg, { path: 'test.svg' });
    expect(true).toEqual(false);
  } catch (error) {
    expect(error.name).toEqual('SvgoParserError');
    expect(error.message).toEqual('test.svg:2:33: Unquoted attribute value');
    expect(error.reason).toEqual('Unquoted attribute value');
    expect(error.line).toEqual(2);
    expect(error.column).toEqual(33);
    expect(error.source).toEqual(svg);
  }
});

test('provides code snippet in rendered error', () => {
  const svg = `<svg viewBox="0 0 120 120">
  <circle fill="#ff0000" cx=60.444444" cy="60" r="50"/>
</svg>
`;
  try {
    optimize(svg, { path: 'test.svg' });
    expect(true).toEqual(false);
  } catch (error) {
    expect(error.toString())
      .toEqual(`SvgoParserError: test.svg:2:29: Unquoted attribute value

  1 | <svg viewBox="0 0 120 120">
> 2 |   <circle fill="#ff0000" cx=60.444444" cy="60" r="50"/>
    |                             ^
  3 | </svg>
  4 | 
`);
  }
});

test('supports errors without path', () => {
  const svg = `<svg viewBox="0 0 120 120">
  <circle/>
  <circle/>
  <circle/>
  <circle/>
  <circle/>
  <circle/>
  <circle/>
  <circle/>
  <circle/>
  <circle fill="#ff0000" cx=60.444444" cy="60" r="50"/>
</svg>
`;
  try {
    optimize(svg);
    expect(true).toEqual(false);
  } catch (error) {
    expect(error.toString())
      .toEqual(`SvgoParserError: <input>:11:29: Unquoted attribute value

   9 |   <circle/>
  10 |   <circle/>
> 11 |   <circle fill="#ff0000" cx=60.444444" cy="60" r="50"/>
     |                             ^
  12 | </svg>
  13 | 
`);
  }
});

test('slices long line in error code snippet', () => {
  const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" viewBox="0 0 230 120">
  <path d="M318.198 551.135 530.33 918.56l-289.778-77.646 38.823-144.889c77.646-289.778 294.98-231.543 256.156-86.655s178.51 203.124 217.334 58.235q58.234-217.334 250.955 222.534t579.555 155.292z stroke-width="1.5" fill="red" stroke="red" />
</svg>
`;
  try {
    optimize(svg);
    expect(true).toEqual(false);
  } catch (error) {
    expect(error.toString())
      .toEqual(`SvgoParserError: <input>:2:211: Invalid attribute name

  1 | …-0.dtd" viewBox="0 0 230 120">
> 2 | …7.334 250.955 222.534t579.555 155.292z stroke-width="1.5" fill="red" strok…
    |                                                       ^
  3 |  
  4 |  
`);
  }
});

test('multipass option should trigger plugins multiple times', () => {
  const svg = `<svg id="abcdefghijklmnopqrstuvwxyz"></svg>`;
  const list = [];
  /**
   * @type {Plugin<void>}
   */
  const testPlugin = {
    name: 'testPlugin',
    fn: (_root, _params, info) => {
      list.push(info.multipassCount);
      return {
        element: {
          enter: (node) => {
            node.attributes.id = node.attributes.id.slice(1);
          },
        },
      };
    },
  };
  const { data } = optimize(svg, { multipass: true, plugins: [testPlugin] });
  expect(list).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  expect(data).toEqual(`<svg id="klmnopqrstuvwxyz"/>`);
});

test('encode as datauri', () => {
  const input = `
    <svg xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(0.707 -0.707 0.707 0.707 255.03 111.21) scale(2)"/>
    </svg>
    `;
  const { data: dataSinglePass } = optimize(input, {
    datauri: 'enc',
    plugins: ['convertTransform'],
  });
  expect(dataSinglePass).toMatchInlineSnapshot(
    `"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20transform%3D%22scale(2)%20rotate(-45%20130.898%20-126.14)%22%2F%3E%3C%2Fsvg%3E"`
  );
  const { data: dataMultiPass } = optimize(input, {
    multipass: true,
    datauri: 'enc',
    plugins: ['convertTransform'],
  });
  expect(dataMultiPass).toMatchInlineSnapshot(
    `"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20transform%3D%22rotate(-45%20261.796%20-252.28)%20scale(2)%22%2F%3E%3C%2Fsvg%3E"`
  );
});

const iconWithStroke = (stroke) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15 14H9v9H1V9l11-8 11 8v14h-8z" fill="none" stroke="${stroke}" stroke-miterlimit="10" stroke-width="1.5"/></svg>`;

test('validate falls back to the asset type stroke colors', () => {
  expect(
    validate(iconWithStroke('#6e6e6e'), 'home.svg', 'ICON_REGULAR')
      .hasCorrectStrokeColor
  ).toEqual(true);
  expect(
    validate(iconWithStroke('#123456'), 'home.svg', 'ICON_REGULAR')
      .hasCorrectStrokeColor
  ).toEqual(false);
});

test('validate allows to override the stroke colors of the asset type', () => {
  const config = {
    validateParams: {
      hasCorrectStrokeColor: { strokeColors: ['#123456', '#123ABC'] },
    },
  };
  expect(
    validate(iconWithStroke('#123456'), 'home.svg', 'ICON_REGULAR', config)
      .hasCorrectStrokeColor
  ).toEqual(true);
  expect(
    validate(iconWithStroke('#123ABC'), 'home.svg', 'ICON_REGULAR', config)
      .hasCorrectStrokeColor
  ).toEqual(true);
  // the replaced default is no longer accepted
  expect(
    validate(iconWithStroke('#6e6e6e'), 'home.svg', 'ICON_REGULAR', config)
      .hasCorrectStrokeColor
  ).toEqual(false);
});

test('validate keeps overrides local to a single call', () => {
  validate(iconWithStroke('#123456'), 'home.svg', 'ICON_REGULAR', {
    validateParams: {
      hasCorrectStrokeColor: { strokeColors: ['#123456'] },
    },
  });
  // the asset type defaults must not be polluted by the previous call
  expect(
    validate(iconWithStroke('#123456'), 'home.svg', 'ICON_REGULAR')
      .hasCorrectStrokeColor
  ).toEqual(false);
  expect(
    validate(iconWithStroke('#6e6e6e'), 'home.svg', 'ICON_REGULAR')
      .hasCorrectStrokeColor
  ).toEqual(true);
});

test('validate overrides params of an explicitly listed plugin', () => {
  const result = validate(iconWithStroke('#123456'), 'home.svg', null, {
    plugins: [
      {
        name: 'hasCorrectStrokeColor',
        params: { strokeColors: ['#6E6E6E', '#6e6e6e'] },
      },
    ],
    validateParams: {
      hasCorrectStrokeColor: { strokeColors: ['#123456'] },
    },
  });
  expect(result).toEqual({ hasCorrectStrokeColor: true });
});

test('validate warns about params of a rule which is not validated', () => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  try {
    validate(iconWithStroke('#6e6e6e'), 'home.svg', 'ICON_REGULAR', {
      validateParams: {
        hasCorrectMaskColor: { fillColors: ['white'] },
      },
    });
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toMatch(
      'You are trying to configure "hasCorrectMaskColor" which is not validated for asset type "ICON_REGULAR".'
    );
  } finally {
    warn.mockRestore();
  }
});

test('validate throws when validate params are not an object', () => {
  expect(() =>
    validate(iconWithStroke('#6e6e6e'), 'home.svg', 'ICON_REGULAR', {
      validateParams: [{ hasCorrectStrokeColor: { strokeColors: ['#fff'] } }],
    })
  ).toThrow(/'validateParams' in config should be an object/);
});

test('validate does not pin a reused config to the first asset type', () => {
  const colorIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1 1h22v22H1z" fill="#E90A0A"/></svg>';
  const config = {
    validateParams: {
      hasCorrectStrokeColor: { strokeColors: ['#123456'] },
    },
  };
  validate(iconWithStroke('#123456'), 'home.svg', 'ICON_REGULAR', config);
  const result = validate(colorIcon, 'home.svg', 'ICON_COLOR', config);
  // the second call must run ICON_COLOR rules, not the ones of the first call
  expect(result).toHaveProperty('hasCorrectStripeColors');
  expect(result).not.toHaveProperty('hasCorrectStrokeColor');
  expect(config.plugins).toEqual(undefined);
});

test('validate throws when params of a single rule are not an object', () => {
  expect(() =>
    validate(iconWithStroke('#6e6e6e'), 'home.svg', 'ICON_REGULAR', {
      validateParams: { hasCorrectStrokeColor: 'red' },
    })
  ).toThrow(/Invalid validate params for "hasCorrectStrokeColor"/);
  expect(() =>
    validate(iconWithStroke('#6e6e6e'), 'home.svg', 'ICON_REGULAR', {
      validateParams: { hasCorrectStrokeColor: ['#123456'] },
    })
  ).toThrow(/Invalid validate params for "hasCorrectStrokeColor"/);
});

test('validate ignores empty params of a rule and keeps the defaults', () => {
  for (const params of [{}, null, undefined]) {
    expect(
      validate(iconWithStroke('#6e6e6e'), 'home.svg', 'ICON_REGULAR', {
        validateParams: { hasCorrectStrokeColor: params },
      }).hasCorrectStrokeColor
    ).toEqual(true);
  }
});
