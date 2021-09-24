const fs = require('fs');

const { generator, TYPES_MAP } = require('./generators');

function createMockData(configFilePath, outputPath) {
  const config = require(configFilePath);
  const mockData = generator(config);
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
}

const result = generator({
  type: TYPES_MAP.array,
  config: {
    lengthRange: [12, 30]
  },
  itemConfig:
  {
    type: TYPES_MAP.object,
    properties: [
      {
        key: 'id',
        type: TYPES_MAP.string,
        config: {
          lengthRange: [10, 15]
        },
      },
      {
        key: 'project',
        type: TYPES_MAP.string,
        config: {
          lengthRange: [5, 10]
        },
      },
      {
        key: 'title',
        type: TYPES_MAP.string,
        config: {
          lengthRange: [5, 10]
        },
      },
      {
        key: 'language',
        type: TYPES_MAP.oneOf,
        config: {
          oneOf: ['zh_CN', 'en_US'],
        },
      },
      {
        key: 'version',
        type: TYPES_MAP.string,
        config: {
          lengthRange: [2, 3]
        },
      },
      {
        key: 'des',
        type: TYPES_MAP.string,
        config: {
          lengthRange: [0, 200]
        },
      },
      {
        key: 'updateBy',
        type: TYPES_MAP.string,
        config: {
          lengthRange: [1, 3]
        },
      },
      {
        key: 'activedTime',
        type: TYPES_MAP.date,
        config: {
          dateRange: ['2020-1-1', '2021-12-31']
        }
      }
    ]
  },
})

fs.writeFileSync('./output.js', JSON.stringify(result, null, 2));
