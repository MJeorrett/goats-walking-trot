import generateId from '../utils/generateId';

export const makeWhen = () => ({
  id: generateId(),
  text: '',
  thenIds: [],
  andIds: [],
});