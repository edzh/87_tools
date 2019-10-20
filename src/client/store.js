import { configureStore } from 'redux-starter-kit';
import thunk from 'redux-thunk';
import reducer from './reducers';

export const store = configureStore({
  reducer: reducer,
  middleware: [thunk]
});
