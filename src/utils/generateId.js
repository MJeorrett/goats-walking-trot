const genUuid = require('uuid/v4');

const generateId = () => {
  return genUuid();
};

export default generateId;