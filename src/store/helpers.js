export function createInitialState() {
  return {
    ids: [],
    items: {},
    andItems: {},
  };
}

export function addItem(state, item, prepend) {
  if (prepend === true) {
    state.ids.unshift(item.id);
  } else {
    state.ids.push(item.id);
  }
  state.items[item.id] = item;
}

export function deleteItem(state, idToDelete) {
  const item = state.items[idToDelete];
  item.andIds.forEach(andId => delete state.andItems[andId]);
  state.ids = state.ids.filter(id => id !== idToDelete);
  delete state.items[idToDelete];
}

export function deleteItems(state, idsToDelete) {
  idsToDelete.forEach(id => deleteItem(state, id));
}

export function updateItemText(state, action) {
  const { id, text } = action.payload;
  state.items[id].text = text;
}

export function addAndToItem(state, itemId, and) {
  state.items[itemId].andIds.push(and.id);
  state.andItems[and.id] = and;
}

export function deleteAndFromItem(state, itemId, andId) {
  const item = state.items[itemId];
  item.andIds = item.andIds.filter(id => id !== andId);
  delete state.andItems[andId];
}

export function updateAndText(state, action) {
  const { andId, text } = action.payload;
  state.andItems[andId].text = text;
}

export function selectItemById (state, id) {
  const item = state.items[id];
  return {
    ...item,
    ands: selectItemAnds(state, item),
  }
};

export const selectItemAnds = (state, item) => item.andIds.map(andId => state.andItems[andId]);
