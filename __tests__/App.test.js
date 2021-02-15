/**
 * @format
 */

// import 'react-native';
// import React from 'react';
// import App from '../App';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

import React from 'react';
import App from '../App';
import {fireEvent, render} from '@testing-library/react-native';

describe('<App/> Test', () => {
  test('should show component correctly', () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should create an item', () => {
    const {getByText, getByPlaceholderText} = render(<App />);
    const textInput = getByPlaceholderText('Write something');
    const addItemButton = getByText('+');
    const itemText = 'First todo';
    // Simulate adding a todo
    fireEvent.changeText(textInput, itemText);
    fireEvent.press(addItemButton);

    const createdItem = getByText(itemText);
    expect(createdItem).not.toBeNull();
  });

  test('Should create multiple items', () => {
    const {getByText, getByPlaceholderText} = render(<App />);

    const addItemButton = getByText('+');
    const textInput = getByPlaceholderText('Write something');
    const createdItemText = 'first todo';
    const createdItemText_2 = 'second todo';

    // Simulate adding a todo 1
    fireEvent.changeText(textInput, createdItemText);
    fireEvent.press(addItemButton);
    // Simulate adding a todo 2
    fireEvent.changeText(textInput, createdItemText_2);
    fireEvent.press(addItemButton);

    const firstCreatedItem = getByText(createdItemText);
    const secondCreatedItem = getByText(createdItemText_2);

    expect(firstCreatedItem).not.toBeNull();
    expect(secondCreatedItem).not.toBeNull();
  });

  test('Should delete an item', () => {
    const {getByText, getByPlaceholderText, queryByText} = render(<App />);

    const addItemButton = getByText('+');
    const textInput = getByPlaceholderText('Write something');
    const createdItemText = 'first todo';
    // Simulate adding a todo
    fireEvent.changeText(textInput, createdItemText);
    fireEvent.press(addItemButton);

    const deleteItemButton = getByText('X');
    // Simulate deleting a todo
    fireEvent.press(deleteItemButton);

    const deletedItem = queryByText(createdItemText);

    expect(deletedItem).toBeNull();
  });

  test('Should display an error when trying to create an item without any text', () => {
    const {getByText} = render(<App />);
    // Simulate adding a todo with empty input
    const addItemButton = getByText('+');
    fireEvent.press(addItemButton);

    const errorMessage = getByText('Please insert a valid text');
    expect(errorMessage).not.toBeNull();
  });

  test('Should remove the error message after creating a valid item', () => {
    const {getByText, getByPlaceholderText, queryByText} = render(<App />);

    const addItemButton = getByText('+');
    // Simulate adding a todo with empty input
    fireEvent.press(addItemButton);

    const createdItemText = 'first todo';
    const textInput = getByPlaceholderText('Write something');
    // Simulate adding a todo
    fireEvent.changeText(textInput, createdItemText);
    fireEvent.press(addItemButton);

    const errorMessage = queryByText('Please insert a valid text');
    expect(errorMessage).toBeNull();
  });
});
