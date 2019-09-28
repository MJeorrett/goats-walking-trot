import { configureStore, createSlice } from 'redux-starter-kit';
const genUuid = require('uuid/v4');

const generateId = () => {
  return genUuid();
};

const gwtSlice = createSlice({
  initialState: {
    gwts: [{
      id: generateId(),
      given: "",
    }]
  },
  reducers: {
    addGiven: (state, action) => {
      state.gwts.push({
        id: generateId(),
        given: action.payload,
      })
    }
  }
});

const store = configureStore({
  reducer: gwtSlice.reducer,
});

export default store;

export const actions = gwtSlice.actions;
