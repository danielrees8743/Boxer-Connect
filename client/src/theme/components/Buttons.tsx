import { ComponentStyleConfig } from '@chakra-ui/react';

const ButtonStyle: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    fontWeight: '2xl', // Normally, it is "semibold"
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      h: 8,
    },
    md: {
      fontSize: 'md',
      px: 6,
      h: 12,
    },
    lg: {
      fontSize: 'lg',
      px: 8,
      h: 16,
    },
  },

  // styles for different visual variants ("outline", "solid")
  variants: {
    outline: {
      size: 'lg',
      border: '2px solid',
      borderColor: 'brand.200',
      color: 'gray.200',
      _hover: {
        bg: 'gray.200',
        color: 'gray.800',
      },
    },
    solid: {
      bg: 'brand.200',
      color: 'gray.800',
      _hover: {
        bg: 'gray.300',
      },
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: 'bold',
    variant: 'sm',
    colorScheme: 'gray.400',
  },
};

export default ButtonStyle;
