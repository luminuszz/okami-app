import React from "react";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  useToast,
} from "native-base";
import { type Work } from "../../../services/okami/types";
import { Linking } from "react-native";
import { useMarkWorkReadMutation } from "../../../services/okami";

interface CardProps {
  data: Work;
}

export const Card: React.FC<CardProps> = ({ data }) => {
  const handleOpenLink = async (): Promise<void> => {
    await Linking.openURL(data.url);
  };

  const toast = useToast();

  const [markAsRead, { isLoading: isMarkingRead }] = useMarkWorkReadMutation();

  const handleMarkAsRead = (): void => {
    markAsRead(data.id)
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
      .catch((err) => {
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
    <Pressable alignItems="center" onPress={handleOpenLink as any}>
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="blueGray.600"
        borderWidth="1"
        _dark={{
          borderColor: "blueGray.600",
          backgroundColor: "blueGray.600",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "blueGray.800",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: "https://github.com/luminuszz/okami-workers/raw/master/images/okami-workers-logo.png",
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="green.500"
            _dark={{
              bg: "green.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            CAPITULO NOVO
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="lg" ml="-1" color="gray.100" isTruncated>
              {data?.name}
            </Heading>
            <Text
              fontSize="md"
              _light={{
                color: "yellow.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            ></Text>
          </Stack>

          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="gray.100"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                {`Ultimo capitulo lido: ${data?.chapter}`}
              </Text>
            </HStack>
            <Button
              onPress={handleMarkAsRead}
              isLoading={isMarkingRead}
              disabled={isMarkingRead}
              colorScheme="green"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="400"
            >
              Marcar como lido
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Pressable>
  );
};