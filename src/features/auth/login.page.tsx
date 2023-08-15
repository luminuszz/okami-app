import { type AuthRoute } from "../../routes/app.routes";
import React from "react";
import {
  Button,
  Center,
  FormControl,
  Heading,
  Image,
  Input,
  VStack,
} from "native-base";
import Container from "../../components/Container";
import { useLoginMutation } from "../../services/okami";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppToast } from "../../components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../store/store";
import { setToken } from "./auth.slice";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

type FormSchema = z.infer<typeof formSchema>;

const loginImage =
  "https://raw.githubusercontent.com/luminuszz/okami/master/images/okami-logo.png";

interface Props extends AuthRoute<"LoginPage"> {}

const LoginPage: React.FC<Props> = () => {
  const { show } = useAppToast();
  const [makeLogin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: FormSchema): void => {
    makeLogin(data)
      .unwrap()
      .then(async ({ token }) => {
        if (token) {
          dispatch(setToken(token));
          await AsyncStorage.setItem("@okami:token", token);
        }

        show("Login feito com sucesso", "success");
      })
      .catch(() => {
        show("Houve um erro ao tentar fazer login", "error");
      });
  };

  return (
    <Container>
      <VStack alignItems="center" justifyContent="center" flex="1" px="5">
        <Image
          backgroundColor="gray.100"
          borderRadius="full"
          source={{
            uri: loginImage,
          }}
          alt="Okami iamge"
          size="xl"
        />

        <Center mt="4">
          <Heading color="gray.200">Okami</Heading>
        </Center>

        <FormControl>
          <FormControl.Label>E-mail</FormControl.Label>
          <Controller
            render={({ field }) => (
              <Input
                color="gray.100"
                type="text"
                keyboardType="email-address"
                {...field}
                onChangeText={field.onChange}
              />
            )}
            name="email"
            control={control}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Senha</FormControl.Label>
          <Controller
            render={({ field }) => (
              <Input
                color="gray.100"
                {...field}
                onChangeText={field.onChange}
              />
            )}
            name="password"
            control={control}
          />
        </FormControl>

        <Button
          isDisabled={!isValid}
          onPress={handleSubmit(handleLogin)}
          colorScheme="green"
          mt="4"
          width="full"
          isLoading={isLoading}
        >
          Login
        </Button>
      </VStack>
    </Container>
  );
};

export default LoginPage;
