/**
 * Jest configuration for @lmas/lmas-install package
 */

module.exports = {
  testEnvironment: 'node',
  roots: ['../../tests/packages/lmas-install'],
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  coverageDirectory: '../../coverage/packages/lmas-install',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  verbose: true,
};
