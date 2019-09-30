import { createSlice, createSelector } from 'redux-starter-kit';

import { makeWhen, makeAnd, makeGiven } from '../models';

import {
  createInitialState, addItem, deleteItem, updateItemText, addAndToItem, deleteAndFromItem, updateAndText,
  selectItemById
} from './helpers';

import * as whenSlice from './whenSlice';

const givenSlice = createSlice({
  initialState: createInitialState(),
  reducers: {
    addGiven: (state, { payload: { given, prepend } }) => {
      addItem(state, given, prepend)
    },
    deleteGiven: (state, action) => {
      deleteItem(state, action.payload);
    },
    updateGivenText: updateItemText,
    addWhenIdToGiven: (state, action) => {
      const { givenId, whenId } = action.payload;
      state.items[givenId].whenIds.push(whenId);
    },
    addAndToGiven: (state, { payload:  { givenId, and } }) => {
      addAndToItem(state, givenId, and);
    },
    deleteAndFromGiven: (state, { payload: { givenId, andId } }) => 
    {
      deleteAndFromItem(state, givenId, andId);
    },
    updateGivenAndText: updateAndText,
  }
});

export const reducer = givenSlice.reducer;

export const actions = {
  add: prepend => givenSlice.actions.addGiven({
    given: makeGiven(),
    prepend,
  }),
  delete: id => (dispatch, getState) => {
    const state = getState();
    const given = selectGivenById(selectGivenState(state), id);

    dispatch(givenSlice.actions.deleteGiven(id));
    dispatch(whenSlice.actions.deleteMany(given.whenIds));
  },
  updateText: givenSlice.actions.updateGivenText,
  addAnd: givenId => givenSlice.actions.addAndToGiven({
    givenId,
    and: makeAnd(),
  }),
  deleteAnd: givenSlice.actions.deleteAndFromGiven,
  updateAndText: givenSlice.actions.updateGivenAndText,
  addWhen: givenId => {
    const when = makeWhen();

    return dispatch => {
      dispatch(whenSlice.actions.add({ when, prepend: false }));
      dispatch(givenSlice.actions.addWhenIdToGiven({ givenId, whenId: when.id }));
    }
  },
}

const selectGivenState = state => state.given;

const selectGivenById = (state, id) => state.items[id];

export const selectors = {
  selectAllIds: createSelector(
    selectGivenState,
    givenState => givenState.ids,
  ),
  makeSelectById: () => createSelector(
    selectGivenState,
    (_, id) => id,
    selectItemById,
  ),
}