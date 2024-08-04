import React, { FC, CSSProperties } from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface IBasicTitles {
  title?: string;
  isActive?: boolean;
  styleBox?: CSSProperties;
}

export const TitleMenu: FC<IBasicTitles> = ({ title, isActive, styleBox }) => {
  return (
    <Flex fontFamily="Helvetica Neue" style={styleBox}>
      <Text
        fontSize="14px"
        fontWeight={isActive ? 700 : 400}
        lineHeight="17px"
        letterSpacing="0.5px"
        color={isActive ? 'white' : 'gray'}
      >
        {title}
      </Text>
    </Flex>
  );
};
