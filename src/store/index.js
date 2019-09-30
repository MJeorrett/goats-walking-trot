import { configureStore } from 'redux-starter-kit';

import * as givenSlice from './givenSlice';
import * as whenSlice from './whenSlice';
import * as thenSlice from './thenSlice';

const store = configureStore({
  reducer: {
    given: givenSlice.reducer,
    when: whenSlice.reducer,
    then: thenSlice.reducer,
  }
});

export const actions = {
  given: givenSlice.actions,
  when: whenSlice.actions,
  then: thenSlice.actions,
};

export const selectors = {
  given: givenSlice.selectors,
  when: whenSlice.selectors,
  then: thenSlice.selectors,
};

export default store;