import generateId from '../utils/generateId';

export const makeThen = () => ({
  id: generateId(),
  text: '',
  andIds: [],
});