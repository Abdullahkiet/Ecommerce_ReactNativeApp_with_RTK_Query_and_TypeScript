import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Cart from '.';

// Mocking dependencies
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe('Cart', () => {
  it('renders correctly', () => {
    const {getByText} = render(<Cart />);
    expect(getByText('My Cart')).toBeTruthy();
  });

  it('displays products and quantity counters correctly', () => {
    const mockedCart = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        colour: 'Red',
        img: 'https://callstack.github.io/react-native-testing-library/img/owl.png',
      },
    ];

    // Mock the cart data from useSelector
    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockReturnValue(mockedCart);

    const {getByText} = render(<Cart />);

    // Check if the rendered cart items and quantity counters are displayed correctly
    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Price: 10 USD')).toBeTruthy();
    expect(getByText('-')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('+')).toBeTruthy();
  });

  it('handles quantity counter updates correctly', () => {
    const mockedCart = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        colour: 'Red',
        img: 'https://callstack.github.io/react-native-testing-library/img/owl.png',
      },
    ];

    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockReturnValue(mockedCart);

    const {getByText} = render(<Cart />);
    const decreaseButton = getByText('-');
    const increaseButton = getByText('+');

    fireEvent.press(decreaseButton);
    fireEvent.press(increaseButton);
    expect(getByText('0')).toBeTruthy();
  });
});
