import { lazy, useEffect } from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getToken, removeToken, setToken } from './services/utilities';
import type { SigninResponse } from './services/interfaces/signin';
import { useSetAtom } from 'jotai';
import { signin } from './services/user';
import { userInfoAtom } from './services/atoms/user';

const Home = lazy(() => import('./components/home/Home'));
const Signin = lazy(() => import('./components/authentication/Signin'));
const Signup = lazy(() => import('./components/authentication/Signup'));
const Blog = lazy(() => import('./components/blog/Blog'));
const CreateBlog = lazy(() => import('./components/blog/CreateBlog'));

function App() {
  const navigate = useNavigate();
  const setUserInfo = useSetAtom(userInfoAtom);

  async function signInHandler(params: { token: string }) {
    try {
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
      const path = window.location.pathname;
      navigate(path, { state: { token: data.token } });
    } catch (error) {
      console.error('Auto-signin failed:', error);
      removeToken();
    }
  }

  useEffect(() => {
    const token = getToken();
    if (token) {
      signInHandler({ token });
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog">
          <Route path=":blogId" element={<Blog />}></Route>
        </Route>
        <Route path="/create/blog" element={<CreateBlog />} />
      </Routes>
    </>
  );
}

export default App;
