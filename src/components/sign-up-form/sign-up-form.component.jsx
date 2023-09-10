import { useState } from 'react';
import {
  createAuthUserWithEmail,
  createUserDocFromAuth,
} from '../../services/firebase/firebase.service';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-up-form.sytles.scss';
import { AUTH_EMAIL_IN_USE } from '../../utils/consts';

const defaultFormData = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const { displayName, email, password, confirmPassword } = formData;

  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password does not match!');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmail(email, password);
      await createUserDocFromAuth(user, { displayName });

      resetFormData();
    } catch (error) {
      if (error.code === AUTH_EMAIL_IN_USE)
        alert('Error! Email already in use!');

      console.error('error creating user with email: ', error.message);
    }
  };

  return (
    <div className='sign-up-container'>
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label='Display Name'
          type='text'
          required
          name='displayName'
          value={displayName}
          onChange={changeHandler}
        />

        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          value={email}
          onChange={changeHandler}
        />

        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          value={password}
          onChange={changeHandler}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          name='confirmPassword'
          value={confirmPassword}
          onChange={changeHandler}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
