import { useEffect } from 'react';
import {
  atom,
  useRecoilCallback,
  useRecoilSnapshot,
  useRecoilValue,
  selector,
  RecoilState,
} from 'recoil';

export const userAuthState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      club: {
        _id: '',
        name: '',
        division: '',
        clubId: '',
        clubID: '',
        email: '',
      },
      role: '',
      token: '',
    },
  },
});

export const userAuthStateSelector = selector({
  key: 'authStateSelector',
  get: ({ get }) => {
    const authenticatedUser = get(userAuthState);
    return authenticatedUser;
  },
  set: ({ set }, newValue) => {
    set(userAuthState, newValue);
    // set the user in local storage
    localStorage.setItem('user', JSON.stringify(newValue));
  },
});
export default userAuthState;
