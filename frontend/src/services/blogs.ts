import axios from 'axios';
// import type {
//   SigninSchema,
//   SignupSchema,
// } from '@kireeti1887/medium-common-mod';
import { API_BASE_URL } from './config';
import { getToken } from '../services/utilities';

interface listBlogsSchema {
  page?: number;
}

export function listBlogs(data: listBlogsSchema) {
  try {
    return axios.get(`${API_BASE_URL}/blog/blogs/list`, {
      headers: {
        authorization: getToken(),
      },
      params: data,
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

// export function signup(data: SignupSchema) {
//   try {
//     return axios.post(`${API_BASE_URL}/user/signup`, data);
//   } catch (e) {
//     return e;
//   }
// }
