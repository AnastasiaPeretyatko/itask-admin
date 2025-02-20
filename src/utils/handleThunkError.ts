import { MessageType } from '@/types/common';

interface ErrorResponse {
  statusCode: number;
  message: MessageType;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const handleThunkError = (error: unknown, rejectWithValue: Function) => {
  const err = error as { response?: { data: ErrorResponse } };
  if (!err.response) {
    throw error;
  }
  return rejectWithValue(err.response.data);
};