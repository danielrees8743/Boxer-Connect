import axios, { AxiosResponse } from 'axios';

export const fetchClubs = async (): Promise<AxiosResponse> => {
  const res = await axios.get('http://127.0.0.1:8001/api/clubs');
  return res.data;
};

export const postLogin = async (
  email: String,
  password: String
): Promise<AxiosResponse> => {
  const res = await axios.post('http://127.0.0.1:8001/api/auth/login', {
    email,
    password,
  });
  return res.data;
};
