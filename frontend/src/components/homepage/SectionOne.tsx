import { Flex, Text, HStack, Stack, Image, Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { SwiperComponent } from "./SwiperComponent";
import { O_EXCL } from "node:constants";

const SWIPER_PAGE_DATA = [
  {
    heading: "Find the perfect fit",
    subheading: "Search for teachers from around the world,",
    subheadingSecond: "from the U.S. to Venezuela",
    image:
      "https://reachinghighernh.org/wp-content/uploads/2019/02/Children_with_music.jpg",
  },
  {
    heading: "Find the perfect fit",
    subheading: "Search for teachers from around the world,",
    subheadingSecond: "from the U.S. to Venezuela",
    image:
      "https://reachinghighernh.org/wp-content/uploads/2019/02/Children_with_music.jpg",
  },
  {
    heading: "Find the perfect fit",
    subheading: "Search for teachers from around the world,",
    subheadingSecond: "from the U.S. to Venezuela",
    image:
      "https://reachinghighernh.org/wp-content/uploads/2019/02/Children_with_music.jpg",
  },
];

interface SectionOneProps {
  slideOneHeader: string;
  slideOneSubheaderFirst: string;
  slideOneSubheaderSecond: string;
  slideOneImage: string;
}

export const SectionOne: React.FC<SectionOneProps> = ({
  slideOneHeader,
  slideOneSubheaderFirst,
  slideOneSubheaderSecond,
  slideOneImage,
  ...props
}) => {
  return (
    <Flex mb={40} mt={20} maxW="100%" height={500}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ width: "100%", overflow: "hidden" }}
        navigation
      >
        {SWIPER_PAGE_DATA.map(function (object, i) {
          return (
            <SwiperSlide key="slide-1">
              <SwiperComponent
                slideOneHeader={object.heading}
                slideOneSubheaderFirst={object.subheading}
                slideOneSubheaderSecond={object.subheadingSecond}
                slideOneImage={object.image}
                key={i}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Flex>
  );
};
