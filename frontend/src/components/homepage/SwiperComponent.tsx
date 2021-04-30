import { Box, HStack, Stack, Text, Image } from "@chakra-ui/react";
import React from "react";

interface SwiperComponentProps {
  slideOneHeader: string;
  slideOneSubheaderFirst: string;
  slideOneSubheaderSecond: string;
  slideOneImage: string;
}

export const SwiperComponent: React.FC<SwiperComponentProps> = ({
  slideOneHeader,
  slideOneSubheaderFirst,
  slideOneSubheaderSecond,
  slideOneImage,
  ...props
}) => {
  return (
    <Box
      w="80%"
      shadow="2xl"
      borderWidth="0px"
      borderColor="transparent"
      borderRadius="lg"
      overflow="hidden"
      m={"0 auto"}
      height="450px"
    >
      <HStack>
        <Stack flex="1" marginLeft="100">
          <Text fontSize="5xl" fontWeight="bold">
            {slideOneHeader}
          </Text>
          <Text fontSize="xl">
            {slideOneSubheaderFirst} <br />
            {slideOneSubheaderSecond}
          </Text>
        </Stack>
        <Image flex=".5" height="460px" src={slideOneImage} />
      </HStack>
    </Box>
  );
};
