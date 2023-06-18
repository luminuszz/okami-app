import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Spinner,
  VStack,
} from "native-base";
import {
  useGetOneWorkQuery,
  useUpdateWorkMutation,
} from "../../services/okami";
import { type AppRoute } from "../../routes/app.routes";
import { useAppToast } from "../../components/Toast";
import Container from "../../components/Container";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AntDesign } from "@expo/vector-icons";

interface Props extends AppRoute<"UpdateWorkPage"> {}

const updateWorkSchema = z.object({
  name: z.string().optional(),
  url: z.string().optional(),
  chapter: z.number().optional(),
});

type UpdateWorkForm = z.infer<typeof updateWorkSchema>;

const UpdateWorkPage: React.FC<Props> = ({ route, navigation }) => {
  const workId = route.params?.workId || "646be8793d9fcd074c3d62f5";
  const { data: work, isLoading } = useGetOneWorkQuery(workId);
  const [updateWork, { isLoading: isUpdating }] = useUpdateWorkMutation();
  const { show } = useAppToast();

  const { control, handleSubmit } = useForm<UpdateWorkForm>({
    resolver: zodResolver(updateWorkSchema),
    values: {
      name: work?.name,
      url: work?.url,
      chapter: work?.chapter,
    },
    defaultValues: {
      name: "",
      url: "",
      chapter: 0,
    },
  });

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handleUpdateWork = (data: UpdateWorkForm): void => {
    updateWork({ id: workId, data })
      .then(() => {
        show("Obra atualizada com sucesso", "success");
        handleGoBack();
      })
      .catch((e) => {
        show("Houve um erro ao tentar atualizar a obra", "error");
      });
  };

  if (isLoading) {
    return (
      <Container>
        <Flex flex="1" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Box px="2">
        <HStack mt="10" alignItems="center" justifyContent="space-between">
          <Heading color="gray.100">Editar obra</Heading>
          <IconButton
            onPress={handleGoBack}
            icon={<AntDesign name="arrowleft" size={24} color="white" />}
          />
        </HStack>

        <VStack mt="4" space="4">
          <FormControl>
            <FormControl.Label>Nome</FormControl.Label>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  color="gray.100"
                  value={field.value}
                  placeholder="Nome"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                />
              )}
              name="name"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>URL</FormControl.Label>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  keyboardType="url"
                  color="gray.100"
                  value={field.value}
                  placeholder="Nome"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                />
              )}
              name="url"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Capitulo</FormControl.Label>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  keyboardType="number-pad"
                  color="gray.100"
                  value={String(field.value)}
                  placeholder="chapter"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                />
              )}
              name="chapter"
            />
          </FormControl>

          <Button
            onPress={handleSubmit(handleUpdateWork) as any}
            isLoading={isUpdating}
            isDisabled={isUpdating}
            colorScheme="green"
          >
            Editar
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default UpdateWorkPage;
