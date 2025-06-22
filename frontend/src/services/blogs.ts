import axios from 'axios';
// import type {
//   SigninSchema,
//   SignupSchema,
// } from '@kireeti1887/medium-common-mod';
import { API_BASE_URL } from './config';
import { getToken } from '../services/utilities';
import type { CreateBlogSchema } from '@kireeti1887/medium-common-mod';

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

export function getBlog(blogId: string) {
  try {
    return axios.get(`${API_BASE_URL}/blog/${blogId}`, {
      headers: {
        authorization: getToken(),
      },
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

export function createBlog(data: CreateBlogSchema) {
  try {
    return axios.post(`${API_BASE_URL}/blog`, data, {
      headers: {
        authorization: getToken(),
      },
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
