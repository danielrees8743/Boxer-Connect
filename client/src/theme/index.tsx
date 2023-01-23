import { extendTheme } from '@chakra-ui/react';

import styles from './styles';
import ButtonStyle from './components/Buttons';

console.log(styles);

const overrides = {
  ...styles,
  components: {
    ...ButtonStyle,
  },
};

export default extendTheme(overrides);
