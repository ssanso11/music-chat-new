import { Button } from "@chakra-ui/button";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Link from "next/link";
import React from "react";

interface NavBarProps {
  showNavbar: boolean;
}

const MenuItems = (props: any) => {
  const { children, isLast, to = "/", ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      color="blackAlpha.700"
      {...rest}
    >
      <Link href={to}>{children}</Link>
    </Text>
  );
};

export const NavBar: React.FC<NavBarProps> = ({ showNavbar, ...props }) => {
  return (
    <Flex
      hidden={!showNavbar}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={5}
      backgroundColor="white"
      position="sticky"
      top={0}
      shadow="lg"
      zIndex={9999}
    >
      <Flex align="center">
        <Text
          w="200px"
          color="navy"
          fontWeight="bold"
          fontSize="3xl"
          bgGradient="linear(to-l, #2a9df4,#2a9da2)"
          bgClip="text"
        >
          Solfege
        </Text>
      </Flex>

      <Box
        display={{ base: "block", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to="/info">Features</MenuItems>
          <MenuItems to="/team">About us</MenuItems>
          <MenuItems to="/login">Login</MenuItems>
          <MenuItems to="/register" isLast>
            <Button
              size="sm"
              rounded="md"
              color={["primary.500", "primary.500", "white", "white"]}
              bg="#2a9da2"
              _hover={{
                bg: [
                  "primary.100",
                  "primary.100",
                  "primary.600",
                  "primary.600",
                ],
              }}
            >
              Create Account
            </Button>
          </MenuItems>
        </Flex>
      </Box>
    </Flex>
  );
  //   return (
  //     <Flex bg="#ffffff" py={6}>
  //       <Box ml={"auto"}>
  //         <Link href="/login">
  //           <Button>Login</Button>
  //         </Link>
  //         <Link href="/register">
  //           <Button>Create Account</Button>
  //         </Link>
  //       </Box>
  //     </Flex>
  //   );
};
