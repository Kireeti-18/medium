import { atom } from 'jotai';

export interface Blog {
  id: string;
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
  paginationAvailable: boolean;
}

export const blogsAtom = atom<BlogsState>({
  blogs: [],
  count: 0,
  page: 0,
  paginationAvailable: true,
});
