import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import React from "react";

interface SearchbarProps {
  placeholder: string;
}

export const Searchbar: React.FC<SearchbarProps> = ({
  placeholder,
  ...props
}) => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.700" />}
      />
      <Input placeholder={placeholder} />
    </InputGroup>
  );
};
