import React, { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

interface IIcon {
  props?: any;
}

export const ArrowDown: FC<any> = props => (
  <Icon viewBox="0 0 16 16" boxSize={'20px'} {...props}>
    <path
      d="M1.47134 6.75029C1.37939 6.66454 1.33341 6.55736 1.33341 6.43946C1.33341 6.32156 1.37939 6.21438 1.47134 6.12864C1.65525 5.95715 1.9541 5.95715 2.13801 6.12864L8.00008 11.5949L13.8622 6.12864C14.0461 5.95715 14.3449 5.95715 14.5288 6.12864C14.7127 6.30013 14.7127 6.5788 14.5288 6.75029L8.33341 12.5381C8.14951 12.7096 7.85066 12.7096 7.66675 12.5381L1.47134 6.75029Z"
      fill="currentColor"
    />
  </Icon>
);
