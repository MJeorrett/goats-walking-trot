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
    andItems: {},
  },
  reducers: {
    addGiven: (state, action) => {
      const { id, text, whenIds } = action.payload;
      state.ids.unshift(id);
      state.items[id] = { id, text, whenIds, andIds: [] };
    },
    updateGivenText: (state, action) => {
      const { id, text } = action.payload;
      state.items[id].text = text;
    },
    addWhenIdToGiven: (state, action) => {
      const { givenId, whenId } = action.payload;
      state.items[givenId].whenIds.push(whenId);
    },
    addAndToGiven: (state, action) => {
      const { givenId, and } = action.payload;
      state.items[givenId].andIds.push(and.id);
      state.andItems[and.id] = and;
    },
    deleteAndFromGiven: (state, action) => {
      const { givenId, andId } = action.payload;
      state.items[givenId].andIds = state.items[givenId].andIds.filter(id => id !== andId);
      delete state.andItems[andId];
    },
    updateGivenAndText: (state, action) => {
      const { andId, text } = action.payload;
      state.andItems[andId].text = text;
    }
  }
});

const whenSlice = createSlice({
  initialState: {
    ids: [],
    items: {},
    andItems: {},
  },
  reducers: {
    addWhen: (state, action) => {
      const { id, text, thenIds } = action.payload;
      state.ids.push(id);
      state.items[id] = { id, text, andIds: [], thenIds };
    },
    updateWhenText: (state, action) => {
      const { id, text } = action.payload;
      state.items[id].text = text;
    },
    addThenIdToWhen: (state, action) => {
      const { whenId, thenId } = action.payload;
      state.items[whenId].thenIds.push(thenId);
    },
    addAndToWhen: (state, action) => {
      const { whenId, and } = action.payload;
      state.items[whenId].andIds.push(and.id);
      state.andItems[and.id] = and;
    },
    deleteAndFromWhen: (state, action) => {
      const { whenId, andId } = action.payload;
      state.items[whenId].andIds = state.items[whenId].andIds.filter(id => id !== andId);
      delete state.andItems[andId];
    },
    updateWhenAndText: (state, action) => {
      const { andId, text } = action.payload;
      state.andItems[andId].text = text;
    },
  }
});

const thenSlice = createSlice({
  initialState: {
    ids: [],
    items: {},
    andItems: {},
  },
  reducers: {
    addThen: (state, action) => {
      const { id, text } = action.payload;
      state.ids.unshift(id);
      state.items[id] = { id, text, andIds: [] };
    },
    updateThenText: (state, action) => {
      const { id, text } = action.payload;
      state.items[id].text = text;
    },
    addAndToThen: (state, action) => {
      const { thenId, and } = action.payload;
      state.items[thenId].andIds.push(and.id);
      state.andItems[and.id] = and;
    },
    deleteAndFromThen: (state, action) => {
      const { thenId, andId } = action.payload;
      state.items[thenId].andIds = state.items[thenId].andIds.filter(id => id !== andId);
      delete state.andItems[andId];
    },
    updateThenAndText: (state, action) => {
      const { andId, text } = action.payload;
      state.andItems[andId].text = text;
    },
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
  addGwt: () => {
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
  given: {
    updateText: givenSlice.actions.updateGivenText,
    addAnd: givenId => givenSlice.actions.addAndToGiven({
      givenId,
      and: {
        id: generateId(),
        text: '',
      },
    }),
    deleteAnd: givenSlice.actions.deleteAndFromGiven,
    updateAndText: givenSlice.actions.updateGivenAndText,
    addWhenThen: givenId => {
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
    }
  },
  when: {
    updateText: whenSlice.actions.updateWhenText,
    addAnd: whenId => whenSlice.actions.addAndToWhen({
      whenId,
      and: {
        id: generateId(),
        text: '',
      },
    }),
    deleteAnd: whenSlice.actions.deleteAndFromWhen,
    updateAndText: whenSlice.actions.updateWhenAndText,
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
    addAnd: thenId => thenSlice.actions.addAndToThen({
      thenId,
      and: {
        id: generateId(),
        text: '',
      },
    }),
    deleteAnd: thenSlice.actions.deleteAndFromThen,
    updateAndText: thenSlice.actions.updateThenAndText,
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
      (givenState, id) => {
        const given = givenState.items[id];
        return {
          ...given,
          ands: given.andIds.map(andId => givenState.andItems[andId]),
        }
      }
    )
  },
  when: {
    makeSelectById: () => createSelector(
      whenStateSelector,
      selectItemId,
      (whenState, id) => {
        const when = whenState.items[id];
        return {
          ...when,
          ands: when.andIds.map(andId => whenState.andItems[andId]),
        }
      }
    )
  },
  then: {
    makeSelectById: () => createSelector(
      thenStateSelector,
      selectItemId,
      (thenState, id) => {
        const then = thenState.items[id];
        return {
          ...then,
          ands: then.andIds.map(andId => thenState.andItems[andId]),
        }
      }
    )
  }
}
