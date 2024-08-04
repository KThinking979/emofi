import React, { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

interface IIcon {
  props?: any;
}

export const MessageIcon: FC<any> = props => (
  <Icon viewBox="0 0 24 24" boxSize={'30px'} color="#6F6C99" {...props}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill="#3279CC"
      />
      <path
        d="M3 19V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V19C21 16.2386 18.7614 14 16 14H8C5.23858 14 3 16.2386 3 19Z"
        fill="#E2E2E8"
      />
    </svg>
  </Icon>
);
