import React, { FC } from 'react';
import { Icon, IconProps, Box } from '@chakra-ui/react';

interface IIcon {
  props?: any;
}

export const ActiveIcon: FC<any> = props => {
  const { isActive } = props;
  return (
    <>
      {!isActive && <Box boxSize={'30px'} {...props}></Box>}
      {isActive && (
        <Icon viewBox="0 0 34 34" boxSize={'30px'} {...props}>
          <circle cx="-1" cy="17" r="17" fill="url(#paint0_radial_501_1421)" />
          <circle cx="-1" cy="17" r="6" fill="#3279CC" />
          <defs>
            <radialGradient
              id="paint0_radial_501_1421"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(-1 17.4001) rotate(90) scale(14.9483)"
            >
              <stop stopColor="#00C4FF" stopOpacity="0.01" />
              <stop
                offset="0.359424"
                stopColor="#32C4F6"
                stopOpacity="0.264719"
              />
              <stop offset="1" stopColor="#53B9EA" stopOpacity="0.01" />
            </radialGradient>
          </defs>
        </Icon>
      )}
    </>
  );
};
