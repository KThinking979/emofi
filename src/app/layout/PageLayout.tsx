import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Box, Center, useDisclosure } from '@chakra-ui/react';
import { BasicMenu, Header } from 'app/components/Menu';
// import { colors } from 'styles/colors';
import { TLink } from 'app/components/Menu/NavLink';
import { ListItems } from 'app/components/Menu/BasicMenu';

export const PageLayout = ({
  children,
  isHide,
}: {
  children?: JSX.Element;
  isHide?: boolean;
  isPadder?: boolean;
}) => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isShow, setIsShow] = useState(false);
  const [link, setLink] = useState<TLink>();
  let pathname = location.pathname;
  console.log('pathname ', pathname);

  useEffect(() => {
    const itemLink = ListItems.find(link => link.path === pathname);
    if (itemLink) {
      setLink(itemLink);
    }
  }, [location.pathname]);

  const onChangeMenu = link => {
    onClose();
    link && setLink(link);
  };

  return (
    <Box h="100vh">
      <Header
        type={link?.type}
        fullMenu={isShow}
        setFullMenu={setIsShow}
        onClose={onChangeMenu}
      />
      <Center
        h="full"
        transition={'0.5s ease-out'}
        // backgroundColor={'darkgray'}
      >
        <Outlet />
      </Center>
      <BasicMenu
        type={link?.type}
        fullMenu={isShow}
        setFullMenu={setIsShow}
        onClose={onChangeMenu}
      />
    </Box>
  );
};
