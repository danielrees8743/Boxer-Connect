import axios, { AxiosResponse } from 'axios';
import { response } from 'express';

interface Error extends AxiosResponse {
  status: number;
  statusText: string;
}

export const fetchClubs = async (): Promise<any> => {
  try {
    const response = await axios.get('http://127.0.0.1:8001/api/clubs');
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    throw Error(error.response.data.message);
  }
};

export const postLogin = async (data: object): Promise<AxiosResponse> => {
  const res = await axios.post(
    'http://localhost:8001/api/users/login',
    {
      ...data,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return res.data;
};

export const logout = async (): Promise<AxiosResponse> => {
  const res = await axios.get('http://localhost:8001/api/users/logout', {
    withCredentials: true,
  });
  return res.data;
};
