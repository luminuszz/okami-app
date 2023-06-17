import React, { useState } from "react";
import Container from "../../components/Container";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useToast,
  VStack,
} from "native-base";
import { useMarkWorkReadMutation } from "../../services/okami";

const UpdateChapterPage: React.FC = () => {
  const id = "";

  const [chapter, setChapter] = useState("");

  const toast = useToast();

  const [markAsRead, { isLoading: isMarkingRead }] = useMarkWorkReadMutation();

  const handleMarkAsRead = (): void => {
    markAsRead({
      chapter: Number(chapter),
      id,
    })
      .unwrap()
      .then(() =>
        toast.show({
          render: () => (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Marcado como lindo
            </Box>
          ),
        })
      )
      .catch(() => {
        toast.show({
          render: () => (
            <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
              Houve um erro ao marcar como lido
            </Box>
          ),
        });
      });
  };

  return (
    <Container>
      <Flex mt="10">
        <Heading color="gray.100" justifyContent="center">
          Marcar como lido
        </Heading>

        <VStack mt="10" space="5">
          <Input
            onChangeText={(text) => {
              setChapter(text);
            }}
            value={chapter}
            type="text"
            keyboardType="number-pad"
            placeholder="Pesquise"
            color="white"
            w="full"
            height="40px"
          />
          <Button
            onPress={handleMarkAsRead}
            isLoading={isMarkingRead}
            isDisabled={isMarkingRead}
            colorScheme="green"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="400"
          >
            Marcar
          </Button>
        </VStack>
      </Flex>
    </Container>
  );
};

export default UpdateChapterPage;
