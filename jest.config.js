const {libPaths} = require('./jest/jestConfigPathsFile');

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [...libPaths],
};
