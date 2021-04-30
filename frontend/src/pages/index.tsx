import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { Flex, Spacer, Box, Text, Stack } from "@chakra-ui/react";
import { Hero } from "../components/homepage/Hero";
import { SectionOne } from "../components/homepage/sectionOne";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const [showNav, changeShowNav] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 600) {
      changeShowNav(true);
    } else {
      changeShowNav(false);
    }
  };
  if (typeof window !== "undefined") {
    // browser code
    window.addEventListener("scroll", changeNavbarColor);
  }

  return (
    <Flex direction="column" maxW={{ xl: "100%" }} m="0 auto" mb={50}>
      <NavBar showNavbar={showNav} />
      <Hero
        heading="Welcome to Solfege"
        subheading="Online music lessons made easier."
        loginButtonText=" Create an account >"
      />
      <SectionOne
        slideOneHeader="Find the perfect fit"
        slideOneSubheaderFirst="Search for teachers from around the world,"
        slideOneSubheaderSecond="from the U.S. to Venezuela"
        slideOneImage="https://reachinghighernh.org/wp-content/uploads/2019/02/Children_with_music.jpg"
      />
      <Flex>
        <Box w="300px" ml="10%">
          <Stack>
            <Text fontSize="3xl" fontWeight="semibold">
              For students and teachers alike
            </Text>
            <Text>
              As a student, it's never been easier to find teachers from all
              over the world. As a teacher, you have the ability to influence
              driven and creative students from around the world
            </Text>
          </Stack>
        </Box>
        <Spacer />
        <Box w="300px">
          <Stack>
            <Text fontSize="3xl" fontWeight="semibold">
              Focus on the music
            </Text>
            <Text>
              Our goal is to let musicians focus on their passion. No more
              finnicky technology or sending sheet music back and forth.
            </Text>
          </Stack>
        </Box>
        <Spacer />
        <Box w="300px" mr="10%">
          <Stack>
            <Text fontSize="3xl" fontWeight="semibold">
              It's all in one place
            </Text>
            <Text>
              Video chatting, calendars, and sheet music - all in one place. Get
              ready to transform your music lessons.
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Index;
