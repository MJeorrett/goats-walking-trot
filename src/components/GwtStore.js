import { configureStore, createSlice, createSelector } from 'redux-starter-kit';
import { combineReducers } from 'redux';
const genUuid = require('uuid/v4');

const generateId = () => {
  return genUuid();
};

function createInitialState() {
  return {
    ids: [],
    items: {},
    andItems: {},
  };
}

function addItem(state, item, prepend) {
  if (prepend === true) {
    state.ids.unshift(item.id);
  } else {
    state.ids.push(item.id);
  }
  state.items[item.id] = item;
}

function deleteItem(state, idToDelete) {
  const item = state.items[idToDelete];
  item.andIds.forEach(andId => delete state.andItems[andId]);
  state.ids = state.ids.filter(id => id !== idToDelete);
  delete state.items[idToDelete];
}

function deleteItems(state, idsToDelete) {
  idsToDelete.forEach(id => deleteItem(state, id));
}

function updateItemText(state, action) {
  const { id, text } = action.payload;
  state.items[id].text = text;
}

function addAndToItem(state, itemId, and) {
  state.items[itemId].andIds.push(and.id);
  state.andItems[and.id] = and;
}

function deleteAndFromItem(state, itemId, andId) {
  const item = state.items[itemId];
  item.andIds = item.andIds.filter(id => id !== andId);
  delete state.andItems[andId];
}

function updateAndText(state, action) {
  const { andId, text } = action.payload;
  state.andItems[andId].text = text;
}

const givenSlice = createSlice({
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

const whenSlice = createSlice({
  initialState: createInitialState(),
  reducers: {
    addWhen: (state, { payload: { when, prepend } }) => addItem(state, when, prepend),
    deleteWhens: (state, action) => deleteItems(state, action.payload),
    updateWhenText: updateItemText,
    addThenIdToWhen: (state, action) => {
      const { whenId, thenId } = action.payload;
      state.items[whenId].thenIds.push(thenId);
    },
    addAndToWhen: (state, { payload: { whenId, and } }) => addAndToItem(state, whenId, and),
    deleteAndFromWhen: (state, { payload: { whenId, andId } }) => deleteAndFromItem(state, whenId, andId),
    updateWhenAndText: updateAndText,
  }
});

const thenSlice = createSlice({
  initialState: createInitialState(),
  reducers: {
    addThen: (state, { payload: { then, prepend } }) => addItem(state, then, prepend),
    deleteThens: (state, action) => deleteItems(state, action.payload),
    updateThenText: updateItemText,
    addAndToThen: (state, { payload: { thenId, and } }) => addAndToItem(state, thenId, and),
    deleteAndFromThen: (state, { payload: { thenId, andId } }) => deleteAndFromItem(state, thenId, andId),
    updateThenAndText: updateAndText,
  }
})

const store = configureStore({
  reducer: combineReducers({
    given: givenSlice.reducer,
    when: whenSlice.reducer,
    then: thenSlice.reducer,
  })
});

export default store;

const makeGiven = ({ whenIds }) => ({
  id: generateId(),
  text: '',
  whenIds,
  andIds: [],
});

const makeWhen = ({ thenIds }) => ({
  id: generateId(),
  text: '',
  thenIds,
  andIds: [],
});

const makeThen = () => ({
  id: generateId(),
  text: '',
  andIds: [],
});

const makeAnd = () => ({
  id: generateId(),
  text: '',
})

export const actions = {
  addGwt: (prepend) => {
    const then = makeThen();
    const when = makeWhen({ thenIds: [then.id] });
    const given = makeGiven({ whenIds: [when.id] });

    return (dispatch) => {
      dispatch(givenSlice.actions.addGiven({ given, prepend }));
      dispatch(whenSlice.actions.addWhen({ when, prepend: false }));
      dispatch(thenSlice.actions.addThen({ then, prepend: false }));
    }
  },
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
        dispatch(givenSlice.actions.addWhenIdToGiven({ givenId, whenId: when.id }));
        dispatch(whenSlice.actions.addWhen({ when, prepend: false }));
        dispatch(thenSlice.actions.addThen({ then, prepend: false }));
      }
    }
  },
  when: {
    updateText: whenSlice.actions.updateWhenText,
    addAnd: whenId => whenSlice.actions.addAndToWhen({
      whenId,
      and: makeAnd(),
    }),
    deleteAnd: whenSlice.actions.deleteAndFromWhen,
    updateAndText: whenSlice.actions.updateWhenAndText,
  },
  then: {
    add: whenId => {
      const then = makeThen();
      return dispatch => {
        dispatch(whenSlice.actions.addThenIdToWhen({ whenId, thenId: then.id }));
        dispatch(thenSlice.actions.addThen({ then, prepend: false }));
      }
    },
    updateText: thenSlice.actions.updateThenText,
    addAnd: thenId => thenSlice.actions.addAndToThen({
      thenId,
      and: makeAnd(),
    }),
    deleteAnd: thenSlice.actions.deleteAndFromThen,
    updateAndText: thenSlice.actions.updateThenAndText,
  }
}

const selectGivenState = state => state.given;
const selectWhenState = state => state.when;
const selectThenState = state => state.then;

const selectItemId = (state, id) => id;

const selectGivenById = (state, id) => state.items[id];
const selectWhenById = (state, id) => state.items[id];
const selectWhensByIds = (state, ids) => ids.map(id => selectWhenById(state, id));

const selectItemById = (state, id) => {
  const item = state.items[id];
  return {
    ...item,
    ands: selectItemAnds(state, item),
  }
};

const selectItemAnds = (state, item) => item.andIds.map(andId => state.andItems[andId]);

export const selectors = {
  given: {
    selectAllIds: createSelector(
      selectGivenState,
      givenState => givenState.ids,
    ),
    makeSelectById: () => createSelector(
      selectGivenState,
      selectItemId,
      selectItemById,
    ),
  },
  when: {
    makeSelectById: () => createSelector(
      selectWhenState,
      selectItemId,
      selectItemById,
    )
  },
  then: {
    makeSelectById: () => createSelector(
      selectThenState,
      selectItemId,
      selectItemById,
    )
  }
};
