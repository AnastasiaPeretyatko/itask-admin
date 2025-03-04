import { http } from '.';

export const getSemestersOnNameRequest = (search: string) =>
  http.get('/semesters/list', { params: { search } });