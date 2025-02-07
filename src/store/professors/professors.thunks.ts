import { createAsyncThunk } from '@reduxjs/toolkit';
import { TParams } from './professors.slice';
import {
  getProfessorsRequest,
  patchProfessorRequest,
  postProfessorRequest,
} from '@/services/professor.service';
import { MessageType } from '@/types/common';
import { TProfessor, TProfessorCreate } from '@/types/professor';
import { cleanObject } from '@/utils/cleanObject';

export const postProfessorThunk = createAsyncThunk<
  { data: TProfessor; message: MessageType },
  TProfessorCreate,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { data: TProfessor; message: MessageType }
  }
>('/professor.create', async (data, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await postProfessorRequest(data);

    return fulfillWithValue({
      data: res.data.data,
      message: res.data.message,
    });
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response;
    if (!hasErrResponse) {
      throw error;
    }
    return rejectWithValue(hasErrResponse.data);
  }
});

export const getProfessorsThunk = createAsyncThunk<
  { rows: TProfessor[]; count: number },
  TParams,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/professors.info', async (params, { rejectWithValue }) => {
  try {
    const paramsWithoutEmpty = cleanObject(params) as TParams;
    const { data } = await getProfessorsRequest(paramsWithoutEmpty);
    console.log(data);
    return { ...data };
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response;
    if (!hasErrResponse) {
      throw error;
    }
    return rejectWithValue(hasErrResponse.data);
  }
});

export const patchProfessorThunk = createAsyncThunk<
  { data: TProfessor; message: MessageType },
  { id: string; data: Partial<TProfessor> },
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { data: TProfessor; message: MessageType }
  }
>('/professor.update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await patchProfessorRequest({ id, data });
    return {
      data: res.data,
      message: res.data.message,
    };
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response;
    if (!hasErrResponse) {
      throw error;
    }
    return rejectWithValue(hasErrResponse.data);
  }
});
