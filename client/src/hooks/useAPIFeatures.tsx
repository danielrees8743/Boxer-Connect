import axios, { AxiosResponse } from 'axios';

interface Error extends AxiosResponse {
  status: number;
  statusText: string;
}
interface User extends AxiosResponse {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    club: string;
    role: string;
    token: string;
  };
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

export const fetchProfile = async (id: any): Promise<any> => {
  try {
    const response = await axios.get(`http://127.0.0.1:8001/api/users/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    throw Error(error.response.data.message);
  }
};

export const postLogin = async (data: object): Promise<any> => {
  try {
    const response = await axios.post(
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
    // console.log('From API', response.data.firstName);
    return response.data.user;
  } catch (error: any) {
    console.log(error.response.data.message);
    throw Error(error.response.data.message);
  }
};

export const logout = async (): Promise<AxiosResponse> => {
  const response = await axios.get('http://localhost:8001/api/users/logout', {
    withCredentials: true,
  });
  return response.data;
};
// use api to fetch user by id
export const fetchUser = async (id: any): Promise<any> => {
  try {
    const response = await axios.get(`http://127.0.0.1:8001/api/users/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    throw Error(error.response.data.message);
  }
};

// how to I handle the errors thrown by axios?
