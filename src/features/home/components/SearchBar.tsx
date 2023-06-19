import React from "react";
import { Flex, Icon, Input, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { homeActions, selectSearch } from "../home.slice";

interface SearchBarButtonProps {
  onPress: () => void;
}

const SearchButton: React.FC<SearchBarButtonProps> = ({ onPress }) => {
  return (
    <Pressable px="3" onPress={onPress}>
      <Icon as={<Feather name="search" size={50} color="black" />} />
    </Pressable>
  );
};

export const SearchBar: React.FC = () => {
  const search = useAppSelector(selectSearch);

  const dispatch = useAppDispatch();

  const handleChange = (value: string): void => {
    dispatch(homeActions.setSearch(value));
  };

  return (
    <Flex mt="50px" flex="1" justifyContent="center" align="center">
      <Input
        placeholder="Pesquise"
        color="white"
        value={search}
        w="full"
        height="40px"
        onChangeText={handleChange}
      />
    </Flex>
  );
};
