import { http } from '.'

export const getUniversitiesRequest = (search: string) =>
  http.get('/universities', { params: { search } })
