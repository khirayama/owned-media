module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testMatch: ['**/*.test.+(ts|tsx|js|jsx)'],
  testPathIgnorePatterns: ['ormconfig.test.js'],
  globalSetup: './jest.setup.ts',
  // globalTeardown: './teardown.js',
  preset: 'ts-jest',
  testEnvironment: 'node',
};
