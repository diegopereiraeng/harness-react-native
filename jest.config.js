module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  preset: 'react-native',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-results',
        outputName: 'jest-junit.xml',
      },
    ],
  ],
};
