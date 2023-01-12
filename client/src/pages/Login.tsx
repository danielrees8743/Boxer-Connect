import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    stayLoggedIn: false,
  });

  return (
    <div className='login'>
      <h3>Login</h3>
      <form>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' required />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' required />

        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
