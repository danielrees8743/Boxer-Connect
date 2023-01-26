import { atom, useRecoilState } from 'recoil';

const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null,
  },
});

function AuthProvider() {
  const [auth, setAuth] = useRecoilState(authState);

  function login(user: any) {
    setAuth({
      isAuthenticated: true,
      user,
    });
  }

  function logout() {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  }
  console.log(authState);
  return { auth, login, logout };
}

export { authState, AuthProvider };
