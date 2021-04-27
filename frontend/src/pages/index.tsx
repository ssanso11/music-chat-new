import { Box, Center, Text } from "@chakra-ui/layout";
import React from "react";
import { NavBar } from "../components/NavBar";
import { Flex } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { Searchbar } from "../components/Searchbar";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Flex direction="column" maxW={{ xl: "100%" }} m="0 auto">
      <NavBar />
      <Hero
        heading="Welcome to Solfege"
        subheading="Online music lessons made easier."
        loginButtonText=" Create an account >"
      />
    </Flex>
  );
};

export default Index;
