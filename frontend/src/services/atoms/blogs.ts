import { atom } from 'jotai';

export interface Blog {
  id: number;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  author: {
    name: string;
    avathar: string;
  };
}

interface BlogsState {
  blogs: Blog[];
  count: number;
  page: number;
}

export const blogsAtom = atom<BlogsState>({
  blogs: [],
  count: 0,
  page: 0,
});
