jest.mock('react-redux', () => {
  const real = jest.requireActual('react-redux');
  return {
    ...real,
  };
});
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});
