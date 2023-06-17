import React, { useState } from "react";
import Container from "../../components/Container";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  useToast,
  VStack,
} from "native-base";
import { useMarkWorkReadMutation } from "../../services/okami";
import { type AppRoute } from "../../routes/app.routes";
import { AntDesign } from "@expo/vector-icons";

interface Props extends AppRoute<"UpdateChapter"> {}

const UpdateChapterPage: React.FC<Props> = ({ route, navigation }) => {
  const { chapter: currentChapter, workId } = route.params;

  const [chapter, setChapter] = useState(currentChapter.toString());

  const toast = useToast();

  const [markAsRead, { isLoading: isMarkingRead }] = useMarkWorkReadMutation();

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handleMarkAsRead = (): void => {
    markAsRead({
      chapter: Number(chapter),
      id: workId,
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
      <Flex mt="10" px="4">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading color="gray.100" justifyContent="center">
            Marcar como lido
          </Heading>

          <IconButton
            onPress={handleGoBack}
            icon={<AntDesign name="arrowleft" size={24} color="white" />}
          />
        </HStack>

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
