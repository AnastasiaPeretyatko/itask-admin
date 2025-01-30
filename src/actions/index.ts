import { v4 as uuidv4 } from 'uuid'

export function createAction (definition: any): any {
  return {
    ...definition,
    id: uuidv4(),
  }
}