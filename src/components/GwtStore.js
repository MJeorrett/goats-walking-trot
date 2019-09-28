import { configureStore, createSlice, createSelector } from 'redux-starter-kit';
import { combineReducers } from 'redux';
const genUuid = require('uuid/v4');

const generateId = () => {
  return genUuid();
};

const givenSlice = createSlice({
  initialState: {
    ids: [],
    items: {},
  },
  reducers: {
    addGiven: (state, action) => {
      const { id, text, whenIds } = action.payload;
      state.ids.unshift(id);
      state.items[id] = { id, text, whenIds };
    },
    updateGivenText: (state, action) => {
      const { id, text } = action.payload;
      state.items[id].text = text;
    },
    addWhenIdToGiven: (state, action) => {
      const { givenId, whenId } = action.payload;
      state.items[givenId].whenIds.push(whenId);
    }
  }
});

const whenSlice = createSlice({
  initialState: {
    ids: [],
    items: {},
  },
  reducers: {
    addWhen: (state, action) => {
      const { id, text, thenIds } = action.payload;
      state.ids.push(id);
      state.items[id] = { id, text, thenIds };
    },
    updateWhenText: (state, action) => {
      const { id, text } = action.payload;
      state.items[id].text = text;
    },
    addThenIdToWhen: (state, action) => {
      const { whenId, thenId } = action.payload;
      state.items[whenId].thenIds.push(thenId);
    }
  }
});

const thenSlice = createSlice({
  initialState: {
    ids: [],
    items: {},
  },
  reducers: {
    addThen: (state, action) => {
      const { id, text } = action.payload;
      state.ids.unshift(id);
      state.items[id] = { id, text };
    },
    updateThenText: (state, action) => {
      const { id, text } = action.payload;
      state.items[id].text = text;
    }
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

export const actions = {
  given: {
    add: () => {
      const then = {
        id: generateId(),
        text: '',
      };
      const when = {
        id: generateId(),
        text: '',
        thenIds: [then.id]
      };
      const given = {
        id: generateId(),
        text: '',
        whenIds: [when.id]
      };
      return (dispatch) => {
        dispatch(givenSlice.actions.addGiven(given));
        dispatch(whenSlice.actions.addWhen(when));
        dispatch(thenSlice.actions.addThen(then));
      }
    },
    updateText: givenSlice.actions.updateGivenText,
  },
  when: {
    add: givenId => {
      const then = {
        id: generateId(),
        text: '',
      };
      const when = {
        id: generateId(),
        text: '',
        thenIds: [then.id]
      };
      return dispatch => {
        dispatch(givenSlice.actions.addWhenIdToGiven({ givenId, whenId: when.id }));
        dispatch(whenSlice.actions.addWhen(when));
        dispatch(thenSlice.actions.addThen(then));
      }
    },
    updateText: whenSlice.actions.updateWhenText,
  },
  then: {
    add: whenId => {
      const then = {
        id: generateId(),
        text: '',
      };
      return dispatch => {
        dispatch(whenSlice.actions.addThenIdToWhen({ whenId, thenId: then.id }));
        dispatch(thenSlice.actions.addThen(then));
      }
    },
    updateText: thenSlice.actions.updateThenText,
  }
}

const givenStateSelector = state => state.given;
const whenStateSelector = state => state.when;
const thenStateSelector = state => state.then;

const selectItemId = (state, id) => id;

export const selectors = {
  given: {
    selectAllIds: createSelector(
      givenStateSelector,
      givenState => givenState.ids,
    ),
    makeSelectById: () => createSelector(
      givenStateSelector,
      selectItemId,
      (givenState, id) => givenState.items[id]
    ),
  },
  when: {
    makeSelectById: () => createSelector(
      whenStateSelector,
      selectItemId,
      (whenState, id) => whenState.items[id]
    )
  },
  then: {
    makeSelectById: () => createSelector(
      thenStateSelector,
      selectItemId,
      (thenState, id) => thenState.items[id]
    )
  }
}
