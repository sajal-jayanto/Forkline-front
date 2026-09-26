import axios from 'axios';

export type FieldError = {
  path: string;
  message: string;
};

export class ApiError extends Error {
  fieldErrors: FieldError[];
  constructor(message: string, fieldErrors: FieldError[] = []) {
    super(message);
    this.name = 'ApiError';
    this.fieldErrors = fieldErrors;
  }
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    const message =
      data?.message ??
      (error.response ? `Request failed (${error.response.status})` : 'Unable to reach the server');
    return Promise.reject(new ApiError(message, data?.details ?? []));
  },
);
