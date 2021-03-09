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
    lengthRange: [2, 10]
  },
  children: [
    {
      type: TYPES_MAP.object,
      children: [
        {
          key: 'username',
          type: TYPES_MAP.string,
          config: {
            lengthRange: [2, 3]
          },
        },
        {
          key: 'follow_times',
          type: TYPES_MAP.number,
          config: {
            range: [100, 900],
          },
        },
        {
          key: 'deal_time',
          type: TYPES_MAP.date,
          config: {
            dateRange: ['2021-01-01', '2021-03-09'],
            formater: 'YYYY-mm-dd HH:MM:SS'
          },
        },
        {
          key: 'time',
          type: TYPES_MAP.date,
          config: {
            dateRange: ['2021-01-01', '2021-03-09'],
            formater: 'YYYY-mm-dd'
          },
        },
        {
          key: 'monitor',
          type: TYPES_MAP.string,
          config: {
            lengthRange: [2, 3]
          },
        },
      ]
    },
  ],
})

fs.writeFileSync('./output.js', JSON.stringify(result, null, 2));
