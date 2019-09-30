import { createSlice, createSelector } from 'redux-starter-kit';

import { makeAnd } from '../models';

import {
  createInitialState,
  addItem,
  deleteItems,
  updateItemText,
  addAndToItem,
  deleteAndFromItem,
  updateAndText,
  selectItemById,
  deleteItem
} from './helpers';

const thenSlice = createSlice({
  initialState: createInitialState(),
  reducers: {
    addThen: (
      state,
      { payload: { then, prepend } }
    ) => {
      addItem(state, then, prepend);
    },
    deleteThen: (
      state,
      { payload },
    ) => {
      deleteItem(state, payload);
    },
    deleteManyThens: (
      state,
      { payload },
    ) => {
      deleteItems(state, payload);
    },
    updateThenText: (
      state,
      { payload: { id, text } },
    ) => {
      updateItemText(state, id, text);
    },
    addAndToThen: (
      state,
      { payload: { thenId, and } },
    ) => {
      addAndToItem(state, thenId, and)
    },
    deleteAndFromThen: (
      state,
      { payload: { thenId, andId } },
    ) => {
      deleteAndFromItem(state, thenId, andId);
    },
    updateThenAndText: (
      state,
      { payload: { andId, text } },
    ) => {
      updateAndText(state, andId, text);
    },
  }
});

export const reducer = thenSlice.reducer;

export const actions = {
  add: thenSlice.actions.addThen,
  updateText: thenSlice.actions.updateThenText,
  addAnd: thenId => thenSlice.actions.addAndToThen({
    thenId,
    and: makeAnd(),
  }),
  deleteAnd: thenSlice.actions.deleteAndFromThen,
  updateAndText: thenSlice.actions.updateThenAndText,
  // TODO: export separately and don't export from index (internal use only to maintain referential integrity)
  delete: thenSlice.actions.deleteThen,
  // TODO: export separately and don't export from index (internal use only to maintain referential integrity)
  deleteMany: thenSlice.actions.deleteManyThens,
}

const selectThenState = state => state.then;

export const selectors = {
  makeSelectById: () => createSelector(
    selectThenState,
    (_, id) => id,
    selectItemById,
  )
}