import { createSlice, createSelector } from 'redux-starter-kit';

import { makeThen, makeAnd } from '../models';

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

import * as thenSlice from './thenSlice';

const whenSlice = createSlice({
  initialState: createInitialState(),
  reducers: {
    addWhen: (
      state,
      { payload: { when, prepend } },
    ) => {
      addItem(state, when, prepend);
    },
    deleteWhen: (state, { payload }) => {
      deleteItem(state, payload);
    },
    deleteManyWhens: (state, { payload }) => {
      deleteItems(state, payload);
    },
    updateWhenText: (
      state,
      { payload: { id, text } },
    ) => {
      updateItemText(state, id, text);
    },
    addThenIdToWhen: (
      state,
      { payload: { whenId, thenId } },
    ) => {
      state.items[whenId].thenIds.push(thenId);
    },
    deleteThenIdFromWhen: (
      state,
      { payload: { whenId, thenId: thenIdToDelete } },
    ) => {
      const when = state.items[whenId];
      when.thenIds = when.thenIds.filter(thenId => thenId !== thenIdToDelete);
    },
    addAndToWhen: (
      state,
      { payload: { whenId, and } },
    ) => {
      addAndToItem(state, whenId, and);
    },
    deleteAndFromWhen: (
      state,
      { payload: { whenId, andId } },
    ) => {
      deleteAndFromItem(state, whenId, andId);
    },
    updateWhenAndText: (
      state,
      { payload: { andId, text } },
    ) => {
      updateAndText(state, andId, text);
    },
  }
});

export const reducer = whenSlice.reducer;

const selectWhenState = state => state.when;

const selectWhenById = (state, id) => state.items[id];
const selectWhensByIds = (state, ids) => ids.map(id => selectWhenById(state, id));

export const actions = {
  add: whenSlice.actions.addWhen,
  updateText: whenSlice.actions.updateWhenText,
  addAnd: whenId => whenSlice.actions.addAndToWhen({
    whenId,
    and: makeAnd(),
  }),
  deleteAnd: whenSlice.actions.deleteAndFromWhen,
  updateAndText: whenSlice.actions.updateWhenAndText,
  // TODO: export separately and don't export from index (internal use only to maintain referential integrity)
  delete: id => (dispatch, getState) => {
    const state = selectWhenState(getState());
    const when = selectWhenById(state, id);
    
    dispatch(whenSlice.actions.deleteWhen(id));
    dispatch(thenSlice.actions.deleteMany(when.thenIds));
  },
  // TODO: export separately and don't export from index (internal use only to maintain referential integrity)
  deleteMany: ids => (dispatch, getState) => {
    const state = getState();
    const whens = selectWhensByIds(selectWhenState(state), ids);
    const thenIds = whens.reduce((result, when) => result.concat(when.thenIds), []);

    dispatch(whenSlice.actions.deleteManyWhens(ids));
    dispatch(thenSlice.actions.deleteMany(thenIds));
  },
  addThen: whenId => {
    const then = makeThen();
    return dispatch => {
      dispatch(thenSlice.actions.add({ then, prepend: false }));
      dispatch(whenSlice.actions.addThenIdToWhen({ whenId, thenId: then.id }));
    }
  },
  deleteThen: (whenId, thenId) => (dispatch) => {
    dispatch(whenSlice.actions.deleteThenIdFromWhen({ whenId, thenId }));
    dispatch(thenSlice.actions.delete(thenId));
  }
};

export const selectors = {
  makeSelectById: () => createSelector(
    selectWhenState,
    (_, id) => id,
    selectItemById,
  ),
};