import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Box,
  CircularProgress,
  Container,
  FormLabel,
  Input,
} from '@chakra-ui/react';

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const navigate = useNavigate();

  const login = useMutation(async (values: object) => {
    console.log(values);
    const response = await axios.post(
      'http://127.0.0.1:8001/api/users/login',
      values,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    if (!response.data) throw new Error(response.data);
    return response.data;
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    login.mutate(data, {
      onSuccess: (response: Response) => {
        console.log(response);
        if (response.status !== 201) {
          navigate('/account');
        }
      },
    });
  };

  return (
    <Container as='section' className='login'>
      {login.isLoading && (
        <CircularProgress
          isIndeterminate
          color='red.500'
          thickness='10px'
          value={10}
        />
      )}
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Email</FormLabel>
        <Input
          {...register('email')}
          width='auto'
          type='email'
          name='email'
          required
        />
        <FormLabel>Password</FormLabel>
        <Input
          {...register('password')}
          width='auto'
          type='password'
          name='password'
          id='password'
          required
        />

        <button type='submit'>Login</button>
      </form>
    </Container>
  );
}
