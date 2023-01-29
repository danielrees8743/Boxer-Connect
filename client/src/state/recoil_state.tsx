import { useEffect } from 'react';
import {
  atom,
  useRecoilCallback,
  useRecoilSnapshot,
  useRecoilValue,
} from 'recoil';

// export function DebugButton() {
//   const onClick = useRecoilCallback(
//     ({ snapshot }) =>
//       async () => {
//         console.debug('Atom values:');
//         for (const node of snapshot.getNodes_UNSTABLE()) {
//           const value = await snapshot.getPromise(node);
//           console.debug(node.key, value);
//         }
//       },
//     []
//   );

//   return <button onClick={onClick}>Dump State</button>;
// }

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

export default userAuthState;
