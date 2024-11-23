import { getUniversitiesRequest } from '@/services/universities.service';
import { MessageType } from '@/types/common';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUniversitiesThunk = createAsyncThunk<
  { data: {name: string, id: string}[] },
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/universities', async (search, { rejectWithValue }) => {
  try {
    const res = await getUniversitiesRequest(search)
    return {
      data: res.data,
    }
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})