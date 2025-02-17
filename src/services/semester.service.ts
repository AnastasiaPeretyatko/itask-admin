import { http } from '.';

export const getSemestersOnNameRequest = (search: string) =>
  http.get('/semesters/name', { params: { search } });