import { useSetAtom } from 'jotai';

import Quote from '../shared/Quote';
import Auth from './Auth';
import type {
  SigninResponse,
  SigininParmas,
} from '../../services/interfaces/signin';
import { signin } from '../../services/user';
import { userInfoAtom } from '../../services/atoms/user';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../services/utilities';
import { useState } from 'react';
import Layout from '../shared/Layout';

export default function Signin() {
  const navigate = useNavigate();
  const setUserInfo = useSetAtom(userInfoAtom);
  const [loading, setLoading] = useState(false);

  const signInHandler = async (params: SigininParmas) => {
    setLoading(true);
    const response = (await signin(params)) as SigninResponse;
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
            <Auth type={'signin'} login={signInHandler} />
          </div>
          <div>
            <Quote />
          </div>
        </div>
      </Layout>
    </>
  );
}
