import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  wait
} from '@testing-library/dom';

import Timeclock from '../Timeclock';

test('examples of some things', async () => {
  const famousWomanInHistory = 'Ada Lovelace';
  const container = Timeclock;
  console.log(container);
  expect(container).toBeTruthy();
});
