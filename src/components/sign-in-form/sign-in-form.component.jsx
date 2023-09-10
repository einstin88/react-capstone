import { useState } from 'react';
import {
  createUserDocFromAuth,
  signInEmail,
  signInGooglePopUp,
} from '../../services/firebase/firebase.service';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.sytles.scss';
import { AUTH_NO_USER, AUTH_WRONG_PASSWORD } from '../../utils/consts';

const defaultFormData = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formData, setFormdata] = useState(defaultFormData);
  const { email, password } = formData;

  const resetFormData = () => {
    setFormdata(defaultFormData);
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormdata({ ...formData, [name]: value });
  };

  const emailSignInHandler = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInEmail(email, password);
      await createUserDocFromAuth(user);

      resetFormData();
    } catch (error) {
      if (error.code === AUTH_WRONG_PASSWORD || error.code === AUTH_NO_USER)
        alert('Wrong email/password!');
      console.error('error signing in user: ', error.message);
    }
  };

  const googleSignIn = async () => {
    const { user } = await signInGooglePopUp();
    await createUserDocFromAuth(user);
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={emailSignInHandler}>
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

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={googleSignIn}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
