import { Center, Flex, HStack } from "@chakra-ui/layout";
import { Box, Button, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Typist from "react-typist";
//const app_demo = require("../images/placeholder_app_demo.png");

interface HeroProps {
  heading: string;
  subheading: string;
  loginButtonText: string;
}

export const Hero: React.FC<HeroProps> = ({
  heading,
  subheading,
  loginButtonText,
  ...props
}) => {
  return (
    <Flex mb={16}>
      <Center w="100%" h="600px" bgGradient="linear(#2a9df4,#2a9da2)">
        <HStack px={6} spacing="200px">
          <Typist cursor={{ show: false }} avgTypingDelay={55}>
            <Stack w="100%" spacing={1}>
              <Text
                color="white"
                fontFamily="sans-serif"
                fontSize="6xl"
                fontWeight="bold"
                w="500px"
                whiteSpace="nowrap"
                unselectable="on"
              >
                {heading}
              </Text>
              <Typist.Delay ms={300} />
              <Text
                color="white"
                fontFamily="sans-serif"
                fontSize="2xl"
                fontWeight="medium"
                unselectable="on"
                pl={1}
                position="relative"
                bottom="20px"
                left="2px"
              >
                {subheading}
              </Text>
              <Button
                w="180px"
                mx={2}
                color="white"
                pl={1}
                mt="50px"
                bgColor="blackAlpha.500"
                textAlign="center"
                position="relative"
                left="3px"
                bottom="5px"
              >
                {loginButtonText}
              </Button>
            </Stack>
          </Typist>
          <Box
            w={{ base: "80%", sm: "60%", md: "50%" }}
            mb={{ base: 12, md: 0 }}
          >
            <Image
              src="https://www.mysaffronapp.com/static/9bcd044f62dd04c03865a277c580d0ea/9f2e0/hero-img.png"
              w="500px"
            />
          </Box>
        </HStack>
      </Center>
    </Flex>
  );
};
