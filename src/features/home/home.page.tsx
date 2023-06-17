import React from "react";

import Container from "../../components/Container";
import { FlatList, Flex, View } from "native-base";
import { SearchBar } from "./components/SearchBar";
import { Card } from "./components/Card";
import { useFetchAllWorksUnreadQuery } from "../../services/okami";
import { useAppSelector } from "../../store/store";
import { selectSearch } from "./home.slice";
import { type AppRoute } from "../../routes/app.routes";

interface Props extends AppRoute<"Home"> {}

const HomePage: React.FC<Props> = ({ navigation }) => {
  const { data: works } = useFetchAllWorksUnreadQuery();

  const search = useAppSelector(selectSearch);

  const filteredWorks = works?.filter((work) =>
    work.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePushToUpdateChapterPage = (
    workId: string,
    chapter: number
  ): void => {
    navigation.push("UpdateChapter", { workId, chapter });
  };

  return (
    <Container>
      <Flex justifyContent="center" align="center" px="2">
        <SearchBar />

        <FlatList
          data={filteredWorks}
          renderItem={({ item }) => (
            <Card onClickMarRead={handlePushToUpdateChapterPage} data={item} />
          )}
          mt={8}
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
