import React, { useState } from "react";
import Container from "../../components/Container";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Select,
  Spinner,
  VStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { type AppRoute } from "../../routes/app.routes";
import {
  useFetchAllWorksReadQuery,
  useMarkWorkFinishedMutation,
} from "../../services/okami";
import { useAppToast } from "../../components/Toast";

interface Props extends AppRoute<"MarkWorkFinishedPage"> {}

const MarkWorkFinishedPage: React.FC<Props> = ({ route, navigation }) => {
  const { data, isLoading } = useFetchAllWorksReadQuery();
  const toast = useAppToast();

  const [markWorkFinished, { isLoading: markingFinished }] =
    useMarkWorkFinishedMutation();

  const [select, setSelect] = useState("");

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handleMarkWorkFinished = (): void => {
    markWorkFinished({ id: select })
      .unwrap()
      .then(() => {
        toast.show("Obra finalizada ", "success");
        handleGoBack();
      })
      .catch(() => {
        toast.show("houve um erro ", "error");
      });
  };

  return (
    <Container>
      <Flex mt="10" px="4">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading color="gray.100" justifyContent="center">
            Finalizar Obra
          </Heading>

          <IconButton
            onPress={handleGoBack}
            icon={<AntDesign name="arrowleft" size={24} color="white" />}
          />
        </HStack>

        {isLoading ? (
          <Spinner />
        ) : (
          <VStack mt="10" space="5">
            <Select
              onValueChange={(itemValue) => {
                setSelect(itemValue);
              }}
              selectedValue={select}
              placeholder="Selecione a obra"
              color="white"
              w="full"
              height="40px"
            >
              {data?.map((work) => (
                <Select.Item key={work.id} label={work.name} value={work.id} />
              ))}
            </Select>
            <Button
              isDisabled={select === ""}
              onPress={handleMarkWorkFinished}
              isLoading={markingFinished}
              colorScheme="green"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="400"
            >
              Finalizar
            </Button>
          </VStack>
        )}
      </Flex>
    </Container>
  );
};
export default MarkWorkFinishedPage;
