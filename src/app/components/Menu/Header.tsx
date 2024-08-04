import React, { FC } from 'react';
import { HStack, Box, Center, Image, Text } from '@chakra-ui/react';
import { title } from 'process';

export const Header: FC<any> = ({
  fullMenu,
  setFullMenu,
  type,
  isShow,
  onOpen,
  onClose,
  ...rest
}) => {
  return (
    <Box
      transition="0.9s ease"
      pos="fixed"
      top={0}
      w="full"
      zIndex={999}
      {...rest}
      // borderBottomWidth={1}
      // borderColor={'gray'}
    >
      <Center>
        <HStack
          flex={1}
          p={2}
          justifyContent={'space-between'}
          maxWidth={'500px'}
          // backgroundColor={'gray'}
        >
          <HStack>
            <Image
              borderRadius="full"
              boxSize="40px"
              src={require('app/assets/logo.png')}
              alt="EmoFi"
            />
            <Text
              fontSize="16px"
              fontWeight={700}
              lineHeight="17px"
              letterSpacing="0.5px"
              color={'white'}
            >
              {'EmoFi'}
            </Text>
          </HStack>
          <HStack>
            <Text
              fontSize="14px"
              fontWeight={500}
              lineHeight="17px"
              letterSpacing="0.5px"
              color={'white'}
            >
              {'10.000'}
            </Text>
            <Image
              borderRadius="full"
              boxSize="16px"
              src={require('app/assets/coin.png')}
              alt="coin"
            />
          </HStack>
        </HStack>
      </Center>
    </Box>
  );
};
