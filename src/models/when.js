import generateId from '../utils/generateId';

export const makeWhen = ({ thenIds }) => ({
  id: generateId(),
  text: '',
  thenIds,
  andIds: [],
});