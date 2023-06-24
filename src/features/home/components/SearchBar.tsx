import React from "react";
import { Flex, Input } from "native-base";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { homeActions, selectSearch } from "../home.slice";

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
