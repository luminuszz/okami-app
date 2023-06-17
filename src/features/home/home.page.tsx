import React from "react";

import Container from "../../components/Container";
import { FlatList, Flex, View } from "native-base";
import { SearchBar } from "./components/SearchBar";
import { Card } from "./components/Card";
import { useFetchAllWorksUnreadQuery } from "../../services/okami";
import { useAppSelector } from "../../store/store";
import { selectSearch } from "./home.slice";

const HomePage: React.FC = () => {
  const { data: works } = useFetchAllWorksUnreadQuery();

  const search = useAppSelector(selectSearch);

  const filteredWorks = works?.filter((work) =>
    work.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Flex justifyContent="center" align="center" px="2">
        <SearchBar />

        <FlatList
          data={filteredWorks}
          renderItem={({ item }) => <Card data={item} />}
          mt={16}
          ItemSeparatorComponent={() => <View my="2" />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        />
      </Flex>
    </Container>
  );
};

export default HomePage;
