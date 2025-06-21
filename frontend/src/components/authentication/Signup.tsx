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
import Header from '../shared/Header';
import { setToken } from '../../services/utilities';

const Signup = () => {
  const navigate = useNavigate();
  const setUserInfo = useSetAtom(userInfoAtom);

  const signUpHandler = async (params: SigininParmas) => {
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
    navigate('/', { state: { token: data.token } });
  };

  return (
    <>
      <Header type="login" />
      <div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2">
        <div>
          <Auth type={'signup'} login={signUpHandler} />
        </div>
        <div>
          <Quote />
        </div>
      </div>
    </>
  );
};

export default Signup;
