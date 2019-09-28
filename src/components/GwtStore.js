import { configureStore, createSlice } from 'redux-starter-kit';
import { combineReducers } from 'redux';
const genUuid = require('uuid/v4');

const generateId = () => {
  return genUuid();
};

const givenSlice = createSlice({
  initialState: [],
  reducers: {
    addGiven: (state, action) => {
      state.push({
        id: generateId(),
        text: action.payload,
      })
    }
  }
});

const whenSlice = createSlice({
  initialState: [],
  reducers: {
    addWhen: (state, action) => {
      state.push({
        id: generateId(),
        givenId: action.payload.givenId,
        text: action.payload.text,
      })
    }
  }
});



const thenSlice = createSlice({
  initialState: [],
  reducers: {
    addThen: (state, action) => {
      state.push({
        id: generateId(),
        whenId: action.payload.whenId,
        text: action.payload,
      })
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

export const actions = givenSlice.actions;
