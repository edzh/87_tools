import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, fireEvent } from '@testing-library/react';
import reducer from '../../../reducers';

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function renderWithRedux(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(thunk))
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    ),
    store
  };
}

import TimestampList from '../TimestampList';

const testState = {
  currentTimesheet: {
    isFetching: false,
    item: {
      date: '2019-09-27T05:00:00.000Z',
      io: 'in',
      program: '5d703251a4034f37a4ff3469',
      session: '5d70341fa4034f37a4ff346b',
      __v: 0,
      _id: '5d8e56a84324b83a39602330'
    }
  },
  timestamp: {
    items: [
      {
        _id: '5d8e5ff54324b83a396023c2',
        student: {
          _id: '5c7ebf7f70913a3fec27ea96',
          name: 'Test Student 1'
        },
        club: null,
        fobStatus: 'Damaged',
        timesheet: '5d8e56a84324b83a39602330',
        datetime: '2019-09-27T19:16:05.886Z',
        __v: 0
      },
      {
        _id: '5d8e5ec34324b83a396023c1',
        student: {
          _id: '5c7ebf7f70913a3fec27ea69',
          name: 'Test Student 2'
        },
        club: {
          _id: '5d7036f5a4034f37a4ff3480',
          name: 'Fencing',
          day: 5
        },
        fobStatus: 'Lost',
        timesheet: '5d8e56a84324b83a39602330',
        datetime: '2019-09-27T19:10:59.062Z',
        __v: 0
      },
      {
        _id: '5d8e5d464324b83a396023c0',
        student: {
          _id: '5d8e5c6c4324b83a396023bc',
          name: 'Test Student 3'
        },
        club: {
          _id: '5d703744a4034f37a4ff3482',
          name: 'Global Foods (Gluten Free)',
          day: 5
        },
        timesheet: '5d8e56a84324b83a39602330',
        datetime: '2019-09-27T19:04:38.415Z',
        __v: 0
      }
    ],
    filter: 'SHOW_ALL'
  }
};

test('will render list with data', () => {
  const { debug, findByText, getByText } = renderWithRedux(<TimestampList />, {
    initialState: testState
  });

  expect(getByText(/Test Student 1/i).textContent).toBeTruthy();
  expect(getByText(/Fencing/i).textContent).toBeTruthy();
  expect(getByText(/03:16 pm/i).textContent).toBeTruthy();
});

test('will render loading with no data', () => {
  const { debug, findByText, getByText } = renderWithRedux(<TimestampList />, {
    initialState: {
      currentTimesheet: {
        isFetching: true
      }
    }
  });

  expect(getByText(/loading/i).textContent).toBeTruthy();
});

test('will render with lost filter', () => {
  const { debug, getByTestId, getByText } = renderWithRedux(<TimestampList />, {
    initialState: {
      ...testState,
      timestamp: {
        items: [...testState.timestamp.items],
        filter: 'SHOW_LOST'
      }
    }
  });

  const timestampList = getByTestId('timestamp-ul');

  expect(timestampList.children.length).toBe(1);
  expect(getByText(/Lost/i).textContent).toBeTruthy();
});

test('will render with damaged filter', () => {
  const { debug, getByTestId, getByText } = renderWithRedux(<TimestampList />, {
    initialState: {
      ...testState,
      timestamp: {
        items: [...testState.timestamp.items],
        filter: 'SHOW_DAMAGED'
      }
    }
  });

  const timestampList = getByTestId('timestamp-ul');

  expect(timestampList.children.length).toBe(1);
  expect(getByText(/Damaged/i).textContent).toBeTruthy();
  debug();
});

test('will delete', () => {
  const { debug, getByTestId, getByText } = renderWithRedux(<TimestampList />, {
    initialState: testState
  });

  const timestampList = getByTestId('timestamp-ul');

  fireEvent.click(getByText('×'));

  expect(timestampList.children.length).toBe(1);
  expect(getByText(/Damaged/i).textContent).toBeTruthy();
  debug();
});
