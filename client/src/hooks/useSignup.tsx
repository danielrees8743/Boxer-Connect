import axios from 'axios';

export const useSignup = async (): Promise<any> => {
  const signup = await axios.post('http://localhost:8001/api/users/signup', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return signup;
};
