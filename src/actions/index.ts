import { v4 as uuidv4 } from 'uuid';
import { createActionType } from './definitions/professors';

export function createAction(definition: createActionType): createActionType {
  return {
    ...definition,
    id: uuidv4(),
  };
}
