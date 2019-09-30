import generateId from '../utils/generateId';

export const makeGiven = () => ({
  id: generateId(),
  text: '',
  whenIds: [],
  andIds: [],
});