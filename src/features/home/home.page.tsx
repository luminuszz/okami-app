import React, { useEffect } from "react";

import Container from "../../components/Container";
import { FlatList, Flex, View } from "native-base";
import { SearchBar } from "./components/SearchBar";
import { Card } from "./components/Card";
import { useFetchAllWorksUnreadQuery } from "../../services/okami";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { homeActions, selectSearch } from "./home.slice";
import { type AppRoute } from "../../routes/app.routes";

interface Props extends AppRoute<"Home"> {}

const HomePage: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
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

  const handleEditWork = (workId: string): void => {
    navigation.push("UpdateWorkPage", { workId });
  };

  useEffect(() => {
    return () => {
      dispatch(homeActions.setSearch(""));
    };
  }, []);

  return (
    <Container>
      <Flex justifyContent="center" align="center" px="2">
        <SearchBar />

        <FlatList
          data={filteredWorks}
          renderItem={({ item }) => (
            <Card
              onClickCard={handleEditWork}
              onClickMarRead={handlePushToUpdateChapterPage}
              data={item}
            />
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
