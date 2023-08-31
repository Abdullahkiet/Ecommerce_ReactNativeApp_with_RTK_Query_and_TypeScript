const libPaths = [
  '<rootDir>/__mocks__/libraries/react-navigation.js',
  '<rootDir>/__mocks__/libraries/react-redux.js',
  '<rootDir>/__mocks__/libraries/@react-navigation/native-stack/native-stack.js',
];
function ignorePatternHook(arr) {
  return arr.map((patterns, ind) => {
    return (ind === arr.length - 1 && patterns) || patterns + '|';
  });
}

module.exports = {
  libPaths,
  ignorePatternHook,
};
