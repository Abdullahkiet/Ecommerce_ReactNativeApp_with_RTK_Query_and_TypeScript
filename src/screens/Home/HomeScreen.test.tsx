import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HomeScreen from '.';

// Mocking dependencies explicitly (also added global mockls in root/_mocks_)
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

jest.mock('../../services/products', () => ({
  useFetchProductsQuery: jest.fn(),
}));

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const {getByText} = render(<HomeScreen />);

    // Check if the component renders the title
    expect(getByText('Abdullah E-Commerce Store')).toBeTruthy();
  });

  it('displays products correctly', () => {
    const mockedProducts = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        colour: 'Red',
        img: 'https://callstack.github.io/react-native-testing-library/img/owl.png',
      },
    ];

    // Mock the product data from useSelector
    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockReturnValue(mockedProducts);

    const {getByText} = render(<HomeScreen />);

    // Check if the rendered products are displayed correctly
    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Price: 10 USD')).toBeTruthy();
  });

  it('handles "Add to Cart" button click', () => {
    const mockedProduct = {
      id: 1,
      name: 'Product 1',
      price: 10,
      colour: 'Red',
      img: 'https://callstack.github.io/react-native-testing-library/img/owl.png',
    };
    const mockDispatch = jest.fn();

    // Mock useDispatch to return our mock dispatch function
    jest
      .spyOn(require('react-redux'), 'useDispatch')
      .mockReturnValue(mockDispatch);

    const {getByText} = render(<HomeScreen />);
    const addToCartButton = getByText('Add to Cart');

    fireEvent.press(addToCartButton);

    // Check if the correct action is dispatched when "Add to Cart" is clicked
    expect(getByText('Remove from Cart')).toBeTruthy();
  });
});
