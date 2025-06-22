import { useSetAtom } from 'jotai';

import Auth from './Auth';
import Quote from '../shared/Quote';
import type {
  SigninResponse,
  SigininParmas,
} from '../../services/interfaces/signin';
import { signup } from '../../services/user';
import { userInfoAtom } from '../../services/atoms/user';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../services/utilities';
import Layout from '../shared/Layout';
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const setUserInfo = useSetAtom(userInfoAtom);
  const [loading, setLoading] = useState(false);

  const signUpHandler = async (params: SigininParmas) => {
    setLoading(true);
    const response = (await signup(params)) as SigninResponse;
    const data = response.data;
    setToken(data.token);
    setUserInfo((prev) => ({
      ...prev,
      userEmail: data.user.email,
      userId: data.user.id,
      userName: data.user.name,
      userAvathar: data.user.avathar,
      isLogin: true,
    }));
    setLoading(false);
    navigate('/', { state: { token: data.token } });
  };

  return (
    <>
      <Layout type="login" loading={loading}>
        <div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2">
          <div>
            <Auth type={'signup'} login={signUpHandler} />
          </div>
          <div>
            <Quote />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Signup;
