import React from "react";
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useNativeBase,
} from "native-base";
import { type Work } from "../../../services/okami/types";
import { Entypo } from "@expo/vector-icons";

interface CardProps {
  data: Work;
  onClickMarRead: (id: string, chapter: number) => void;
  onClickCard: (id: string) => void;
}

const defaultCardImage =
  "https://okami-storage.s3.amazonaws.com/work-images/animes-default.jpg";

export const Card: React.FC<CardProps> = ({
  data,
  onClickMarRead,
  onClickCard,
}) => {
  const { theme } = useNativeBase();

  return (
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
              uri: data.imageUrl || defaultCardImage,
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
          <HStack>
            <IconButton
              onPress={() => {
                onClickMarRead(data.id, data.chapter);
              }}
              colorScheme="green"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="400"
              icon={
                <Entypo
                  name="bookmark"
                  size={24}
                  color={theme.colors.green["500"]}
                />
              }
            />

            <IconButton
              onPress={() => {
                onClickCard(data.id);
              }}
              colorScheme="green"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="400"
              icon={
                <Entypo
                  name="edit"
                  size={24}
                  color={theme.colors.blueGray["500"]}
                />
              }
            />
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
};
