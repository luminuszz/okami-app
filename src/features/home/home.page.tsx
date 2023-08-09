import React, { useEffect } from "react";

import Container from "../../components/Container";
import { Button, Flex, HStack } from "native-base";
import { SearchBar } from "./components/SearchBar";
import { useAppDispatch } from "../../store/store";
import { homeActions } from "./home.slice";
import { type AppRoute } from "../../routes/app.routes";
import { RefreshWorksButton } from "./components/RefreshWorksButton";
import { WorkList } from "./components/WorkList";

interface Props extends AppRoute<"Home"> {}

const HomePage: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    homeActions.setSearch("");

    return () => {
      dispatch(homeActions.setSearch(""));
    };
  }, []);

  return (
    <Container>
      <Flex px="2">
        <Flex alignItems="flex-end" mt="12">
          <Button
            onPress={() => {
              navigation.push("MarkWorkFinishedPage");
            }}
          >
            Finalizar Obra
          </Button>
        </Flex>

        <HStack justifyContent="center" alignItems="center">
          <SearchBar />
          <RefreshWorksButton />
        </HStack>

        <WorkList />
      </Flex>
    </Container>
  );
};

export default HomePage;
