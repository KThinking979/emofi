import React, { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

interface IIcon {
  props?: any;
}

export const Dot: FC<any> = props => (
  <Icon viewBox="0 0 32 32" boxSize={'32px'} color="#6F6C99" {...props}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 18C9.10457 18 10 17.1046 10 16C10 14.8954 9.10457 14 8 14C6.89543 14 6 14.8954 6 16C6 17.1046 6.89543 18 8 18ZM16 18C17.1046 18 18 17.1046 18 16C18 14.8954 17.1046 14 16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18ZM26 16C26 17.1046 25.1046 18 24 18C22.8954 18 22 17.1046 22 16C22 14.8954 22.8954 14 24 14C25.1046 14 26 14.8954 26 16Z"
      fill="currentColor"
    />
  </Icon>
);
