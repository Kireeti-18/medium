import { NavLink } from 'react-router-dom';
import LabeledInput from '../shared/LabeledInput';
import Button from '../shared/Button';
import { useState } from 'react';
import type { SigininParmas } from '../../services/interfaces/signin';
interface signinParams {
  type: 'signin' | 'signup';
  login: (params: SigininParmas) => void;
}

export default function SigninAuth({ type, login }: signinParams) {
  const [loginValues, setLoginValues] = useState({
    name: '',
    email: '',
    pass: '',
    cpass: '',
  });

  const onChange = (type: string, value: string) => {
    setLoginValues((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const loginHandler = () => {
    const params = {
      email: loginValues.email,
      password: loginValues.pass,
      name: loginValues.name,
    };
    login(params);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold">
          {type == 'signin' ? 'Login into Account' : 'Create aa Account'}
        </div>
        {type == 'signup' && (
          <div className="text-slate-500">
            Already have an Account?
            {
              <NavLink to="/signin" className="pl-2 underline">
                Login
              </NavLink>
            }
          </div>
        )}
      </div>
      {type == 'signin' && (
        <div className="mt-5">
          <div className="mt-5">
            <LabeledInput
              type={'email'}
              label={'Email Address'}
              placeholder="Enter Email"
              onChange={(v) => onChange('email', v)}
            ></LabeledInput>
          </div>
          <div className="mt-5">
            <LabeledInput
              type={'password'}
              label={'Password'}
              placeholder="......"
              onChange={(v) => onChange('pass', v)}
            ></LabeledInput>
          </div>
          <Button
            style="mt-8 w-sm cursor-pointer"
            type={'btn1'}
            label={'Signin'}
            onClick={loginHandler}
          ></Button>
        </div>
      )}

      {type == 'signup' && (
        <div className="mt-5">
          <div className="mt-5">
            <LabeledInput
              type={'email'}
              label={'Email Address'}
              placeholder="Enter Email"
              onChange={(v) => onChange('email', v)}
            ></LabeledInput>
          </div>
          <div className="mt-5">
            <LabeledInput
              type={'email'}
              label={'Name'}
              placeholder="Enter Name"
              onChange={(v) => onChange('name', v)}
            ></LabeledInput>
          </div>
          <div className="mt-5">
            <LabeledInput
              type={'password'}
              label={'Password'}
              placeholder="......"
              onChange={(v) => onChange('pass', v)}
            ></LabeledInput>
          </div>
          <div className="mt-5">
            <LabeledInput
              type={'password'}
              label={'Confirm Password'}
              placeholder="......"
              onChange={(v) => onChange('cpass', v)}
            ></LabeledInput>
          </div>
          <Button
            style="mt-8 w-80 mx-5 sm:w-sm sm:mx-0 cursor-pointer"
            type={'btn1'}
            label={'Signup'}
            onClick={loginHandler}
          ></Button>
        </div>
      )}
    </div>
  );
}
