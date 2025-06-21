import { atom } from 'jotai';

interface userInfo {
  userId: string;
  userName: string;
  userEmail: string;
  userAvathar: string;
  isLogin: boolean;
}

export const userInfoAtom = atom<userInfo>({
  isLogin: false,
  userId: '',
  userName: '',
  userEmail: '',
  userAvathar: '',
});
