import { createSlice, createSelector } from 'redux-starter-kit';

import { makeThen, makeAnd } from '../models';

import {
  createInitialState, addItem, deleteItems, updateItemText, addAndToItem, deleteAndFromItem, updateAndText,
  selectItemById
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
};

export const selectors = {
  makeSelectById: () => createSelector(
    selectWhenState,
    (_, id) => id,
    selectItemById,
  ),
};