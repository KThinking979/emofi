import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Text, HStack, Center } from '@chakra-ui/react';

export function WalletPage() {
  return (
    <Box>
      <Helmet>
        <title>Wallet</title>
        <meta name="description" content="EmoFi" />
      </Helmet>
      <Center w="full" alignItems={'center'} justifyContent="center">
        <HStack align={'center'} justify={'space-between'}>
          <Text
            fontSize={'14px'}
            fontWeight="bold"
            lineHeight={'20px'}
            textTransform="uppercase"
            textAlign={'center'}
            color={'white'}
          >
            Wallet
          </Text>
        </HStack>
      </Center>
    </Box>
  );
}
