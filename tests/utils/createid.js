import { v4 as uuidv4 } from 'uuid';

const generateFakeId = () => {
  return uuidv4();
};

export { generateFakeId };