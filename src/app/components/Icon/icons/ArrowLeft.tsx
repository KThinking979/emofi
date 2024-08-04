import React, { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

interface IIcon {
  props?: any;
}

export const ArrowLeft: FC<any> = props => (
  <Icon viewBox="0 0 16 16" boxSize={'20px'} {...props}>
    <path
      d="M9.78156 0.678722C9.88271 0.577573 10.0091 0.526999 10.1482 0.526999C10.2873 0.526999 10.4137 0.577573 10.5149 0.678722C10.7172 0.881021 10.7172 1.20976 10.5149 1.41206L4.06661 7.86033L10.5149 14.3086C10.7172 14.5109 10.7172 14.8396 10.5149 15.0419C10.3126 15.2442 9.98386 15.2442 9.78156 15.0419L2.95397 8.227C2.75167 8.0247 2.75167 7.69596 2.95397 7.49367L9.78156 0.678722V0.678722Z"
      fill="currentColor"
    />
  </Icon>
);
