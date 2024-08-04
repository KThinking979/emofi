import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Text, HStack, Center } from '@chakra-ui/react';

export function ShopPage() {
  return (
    <Box>
      <Helmet>
        <title>Shop</title>
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
            Shop
          </Text>
        </HStack>
      </Center>
    </Box>
  );
}
