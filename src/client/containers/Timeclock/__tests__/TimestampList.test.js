import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import reducer from '../../../reducers';

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}
import TimestampList from '../TimestampList';

test('examples of some things', async () => {
  const famousWomanInHistory = 'Ada Lovelace';
  const { getByText, getByTestId } = renderWithRedux(<TimestampList />);

  expect(getByTestId('load').textContent).toBe('Loading...');
});
