import axios from 'axios';
import type {
  SigninSchema,
  SignupSchema,
} from '@kireeti1887/medium-common-mod';
import { API_BASE_URL } from './config';

export function signin(data: SigninSchema | { token: string }) {
  let body = {};
  let token = '';
  if (!('token' in data)) {
    body = data;
  } else {
    token = data.token;
  }

  try {
    return axios.post(`${API_BASE_URL}/user/signin`, body, {
      headers: {
        authorization: token,
      },
    });
  } catch (e) {
    return e;
  }
}

export function signup(data: SignupSchema | { token: string }) {
  let body = {};
  let token = '';
  if (!('token' in data)) {
    body = data;
  } else {
    token = data.token;
  }

  try {
    return axios.post(`${API_BASE_URL}/user/signup`, body, {
      headers: {
        authorization: token,
      },
    });
  } catch (e) {
    return e;
  }
}
