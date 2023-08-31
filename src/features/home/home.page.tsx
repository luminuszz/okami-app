import React, { useEffect } from "react";

import Container from "../../components/Container";
import { Flex, Heading, HStack } from "native-base";
import { useAppDispatch } from "../../store/store";
import { homeActions } from "./home.slice";
import { type AppRoute } from "../../routes/app.routes";
import { WorkList } from "./components/WorkList";
import { Navbar } from "../../components/Navbar";

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
      <Navbar />
      <Flex px="2">
        <WorkList />
      </Flex>
    </Container>
  );
};

export default HomePage;
