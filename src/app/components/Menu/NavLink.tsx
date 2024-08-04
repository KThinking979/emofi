import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Stack } from '@chakra-ui/react';
import { TitleMenu } from 'app/components/Title';
import { ActiveIcon } from 'app/components/Icon';
// import { colors } from 'styles/colors';
import { TYPE_MENU } from './BasicMenu';

type TOnClink = () => void;

export type TLink = {
  type: TYPE_MENU;
  title: string;
  path: string;
  iconActive: any;
  icon: any;
};

interface INavLink {
  link: TLink;
  isActive?: boolean;
  onClick?: TOnClink;
  fullMenu?: boolean;
}

export const NavLink: FC<INavLink> = ({
  fullMenu,
  isActive,
  link,
  onClick,
}) => {
  const navigate = useNavigate();

  const onChangeMenu = () => {
    onClick && onClick();
    navigate(link.path);
  };

  return (
    <Stack
      transition="0.5s ease"
      cursor="pointer"
      spacing={2}
      onClick={onChangeMenu}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      {isActive ? link.iconActive : link.icon}
      <TitleMenu title={link.title} isActive={isActive} />
    </Stack>
  );
};
