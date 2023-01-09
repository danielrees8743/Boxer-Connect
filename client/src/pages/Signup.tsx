import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import ReloadButton from '../components/ReloadButton';
import { useNavigate } from 'react-router-dom';

interface Club {
  _id: string;
  name: string;
}

const fetchClubs = async () => {
  const response = await axios.get('http://localhost:8001/api/clubs');
  if (response.status !== 200) {
    throw new Error('Error fetching clubs');
  }

  return response.data;
};

export default function Signup() {
  const navigate = useNavigate();
  const [formValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    contactNumber: '',
    clubId: '',
  });

  const signup = useMutation(async (values: object) => {
    const response = await axios.post(
      'http://localhost:8001/api/users/signup',
      values,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  });

  const { data } = useQuery({ queryKey: ['clubs'], queryFn: fetchClubs });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signup.mutate(formValues, {
      onSuccess: (response) => {
        console.log(response.this.state.first);
        navigate('/account');
      },
      onError: (error: unknown) => console.log(error),
    });
  };

  if (signup.error)
    return (
      <div>
        <ReloadButton />
      </div>
    );

  return (
    <div>
      <h3>Signup Form</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Fist Name
          <input
            type='text'
            name='firstName'
            onChange={(event) => (formValues.firstName = event.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type='text'
            name='lastName'
            onChange={(event) => (formValues.lastName = event.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type='email'
            name='email'
            onChange={(event) => (formValues.email = event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type='password'
            name='password'
            onChange={(event) => (formValues.password = event.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type='password'
            name='passwordConfirm'
            onChange={(event) =>
              (formValues.passwordConfirm = event.target.value)
            }
            required
          />
        </label>
        <label>
          Phone Number
          <input
            type='tel'
            name='contactNumber'
            onChange={(event) =>
              (formValues.contactNumber = event.target.value)
            }
            required
          />
        </label>
        <label>
          Club ID
          <select
            name='clubId'
            onChange={(event) => (formValues.clubId = event.target.value)}>
            {data?.data.map((club: Club) => (
              <option key={club._id} value={club._id}>
                {club.name}
              </option>
            ))}
          </select>
        </label>
        {/* Loading and Error toast to go here */}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
