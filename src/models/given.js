import generateId from '../utils/generateId';

export const makeGiven = ({ whenIds }) => ({
  id: generateId(),
  text: '',
  whenIds,
  andIds: [],
});