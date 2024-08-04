import React, { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

interface IIcon {
  props?: any;
}

export const ArrowRight: FC<any> = props => (
  <Icon viewBox="0 0 16 16" boxSize={'20px'} {...props}>
    <path
      d="M6.35394 15.3213C6.25279 15.4224 6.12636 15.473 5.98728 15.473C5.8482 15.473 5.72176 15.4224 5.62061 15.3213C5.41831 15.119 5.41831 14.7902 5.62061 14.5879L12.0689 8.13967L5.62061 1.69139C5.41831 1.4891 5.41831 1.16036 5.62061 0.958061C5.82291 0.755762 6.15164 0.755762 6.35394 0.958061L13.1815 7.773C13.3838 7.9753 13.3838 8.30404 13.1815 8.50634L6.35394 15.3213Z"
      fill="currentColor"
    />
  </Icon>
);
