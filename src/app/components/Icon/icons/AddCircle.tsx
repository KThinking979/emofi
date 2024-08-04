import React, { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

interface IIcon {
  props?: any;
}

export const AddCircle: FC<any> = props => (
  <Icon viewBox="0 0 20 20" boxSize={'22px'} color={'blue'} {...props}>
    <rect width="20" height="20" rx="10" fill="currentColor" />
    <path
      d="M5.35577 10.3559C5.15891 10.3559 5.00244 10.1943 5.00244 9.99746C5.00244 9.8006 5.15891 9.64413 5.35577 9.64413H9.64116V5.35841C9.64148 5.16156 9.80304 5 9.9999 5C10.1968 5 10.3532 5.16156 10.3532 5.35841V9.64413H14.6386C14.8355 9.64413 14.997 9.8006 14.997 9.99746C14.997 10.1943 14.8355 10.3559 14.6386 10.3559H10.3532V14.6416C10.3532 14.8384 10.1968 15 9.9999 15C9.80304 15 9.64148 14.8384 9.64148 14.6416V10.3559H5.35577Z"
      fill="white"
    />
  </Icon>
);
