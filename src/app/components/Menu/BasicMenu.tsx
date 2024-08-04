import React, { FC } from 'react';
import { HStack, Box, Center } from '@chakra-ui/react';
import { IoGameControllerOutline } from 'react-icons/io5';
import { CiShop, CiCoinInsert } from 'react-icons/ci';
import { FaRankingStar } from 'react-icons/fa6';
import { PiWalletThin } from 'react-icons/pi';
import { NavLink, TLink } from './NavLink';
import { PATH_ROUTE } from 'types/route';
// import { colors } from 'styles/colors';

export enum TYPE_MENU {
  PLAY = 'PLAY',
  SHOP = 'SHOP',
  EARN = 'EARN',
  RANK = 'RANK',
  WALLET = 'WALLET',
}

export const ListItems: TLink[] = [
  {
    type: TYPE_MENU.SHOP,
    title: 'Shop',
    icon: <CiShop size={28} color={'gray'} />,
    iconActive: <CiShop size={30} color={'white'} />,
    path: PATH_ROUTE.SHOP,
  },
  {
    type: TYPE_MENU.EARN,
    title: 'Earn',
    icon: <CiCoinInsert size={28} color={'gray'} />,
    iconActive: <CiCoinInsert size={30} color={'white'} />,
    path: PATH_ROUTE.EARN,
  },
  {
    type: TYPE_MENU.PLAY,
    title: 'Play',
    icon: <IoGameControllerOutline size={28} color={'gray'} />,
    iconActive: <IoGameControllerOutline size={30} color={'white'} />,
    path: PATH_ROUTE.PLAY,
  },
  {
    type: TYPE_MENU.RANK,
    title: 'Rank',
    icon: <FaRankingStar size={28} color={'gray'} />,
    iconActive: <FaRankingStar size={30} color={'white'} />,
    path: PATH_ROUTE.RANK,
  },
  {
    type: TYPE_MENU.WALLET,
    title: 'Wallet',
    icon: <PiWalletThin size={28} color={'gray'} />,
    iconActive: <PiWalletThin size={30} color={'white'} />,
    path: PATH_ROUTE.WALLET,
  },
];

export const BasicMenu: FC<any> = ({
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
      bottom={4}
      w="full"
      zIndex={999}
      {...rest}
    >
      <Center>
        <HStack
          p={3}
          mx={3}
          flex={1}
          justifyContent={'space-between'}
          maxWidth={'500px'}
          borderRadius={8}
          borderWidth={1}
        >
          {ListItems.map((link, index) => {
            return (
              <NavLink
                fullMenu={fullMenu}
                isActive={type === link.type}
                onClick={() => {
                  onClose && onClose(link);
                }}
                link={link}
                key={index}
              />
            );
          })}
        </HStack>
      </Center>
    </Box>
  );
};
