import { createSlice, createSelector } from 'redux-starter-kit';

import { makeWhen, makeThen, makeAnd } from '../models';

import {
  createInitialState, addItem, deleteItem, updateItemText, addAndToItem, deleteAndFromItem, updateAndText,
  selectItemById
} from './helpers';

export const givenSlice = createSlice({
  initialState: createInitialState(),
  reducers: {
    addGiven: (state, { payload: { given, prepend } }) => addItem(state, given, prepend),
    deleteGiven: (state, action) => deleteItem(state, action.payload),
    updateGivenText: updateItemText,
    addWhenIdToGiven: (state, action) => {
      const { givenId, whenId } = action.payload;
      state.items[givenId].whenIds.push(whenId);
    },
    addAndToGiven: (state, { payload:  { givenId, and } }) => addAndToItem(state, givenId, and),
    deleteAndFromGiven: (state, { payload: { givenId, andId } }) => deleteAndFromItem(state, givenId, andId),
    updateGivenAndText: updateAndText,
  }
});

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

export const actions = {
  given: {
    delete: id => (dispatch, getState) => {
      const state = getState();
      const given = selectGivenById(selectGivenState(state), id);
      const whens = selectWhensByIds(selectWhenState(state), given.whenIds);
      const thenIds = whens.reduce((result, when) => result.concat(when.thenIds), []);
      
      dispatch(givenSlice.actions.deleteGiven(id));
      dispatch(whenSlice.actions.deleteWhens(whens.map(when => when.id)));
      dispatch(thenSlice.actions.deleteThens(thenIds));
    },
    updateText: givenSlice.actions.updateGivenText,
    addAnd: givenId => givenSlice.actions.addAndToGiven({
      givenId,
      and: makeAnd(),
    }),
    deleteAnd: givenSlice.actions.deleteAndFromGiven,
    updateAndText: givenSlice.actions.updateGivenAndText,
    addWhenThen: givenId => {
      const then = makeThen();
      const when = makeWhen({ thenIds: [then.id] });

      return dispatch => {
        dispatch(thenSlice.actions.addThen({ then, prepend: false }));
        dispatch(whenSlice.actions.addWhen({ when, prepend: false }));
        dispatch(givenSlice.actions.addWhenIdToGiven({ givenId, whenId: when.id }));
      }
    }
  },
}