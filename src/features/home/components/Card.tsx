import React from "react";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AspectRatio,
  Badge,
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Pressable,
  Stack,
  Text,
  useNativeBase,
  ZStack,
} from "native-base";
import { type Work, WORK_CATEGORY } from "../../../services/okami/types";
import { Feather } from "@expo/vector-icons";

interface CardProps {
  data: Work;
  onClickMarRead: (id: string, chapter: number) => void;
  onClickCard: (id: string) => void;
}

const emote = {
  [WORK_CATEGORY.enum.MANGA]: "📖",
  [WORK_CATEGORY.enum.ANIME]: "📺",
};

const defaultCardImage =
  "https://okami-storage.s3.amazonaws.com/work-images/animes-default.jpg";

export const Card: React.FC<CardProps> = ({
  data,
  onClickMarRead,
  onClickCard,
}) => {
  const atTime = formatDistance(data.updatedAt, new Date(), {
    addSuffix: true,
    includeSeconds: true,
    locale: ptBR,
  });

  const category =
    data.category.toLowerCase().charAt(0).toUpperCase() +
    data.category.toLowerCase().slice(1);

  return (
    <Box borderRadius="3xl" position="relative" shadow={8}>
      <Pressable
        onPress={() => {
          onClickMarRead(data.id, data.chapter);
        }}
      >
        <Image
          height="200"
          w="full"
          borderRadius="3xl"
          resizeMode="cover"
          source={{
            uri: data?.imageUrl || defaultCardImage,
          }}
          alt="algo aqui"
        />
      </Pressable>
      <HStack
        mt="3"
        justifyContent="space-between"
        alignItems="center"
        px="2"
        space="2"
      >
        <Text maxW="190" isTruncated color="gray.100" fontWeight="bold">
          {data.name}
        </Text>

        <HStack alignItems="center" space="1">
          <Icon as={<Feather name="clock" size={24} color="white" />} />
          <Text fontWeight="medium" maxW="200" isTruncated color="gray.100">
            {atTime}
          </Text>
        </HStack>
      </HStack>

      <Badge
        borderRadius="2xl"
        px="4"
        m="4"
        right="0"
        top="0"
        position="absolute"
        backgroundColor="green.500"
      >
        <Text fontWeight="bold" fontSize="xs" color="gray.100">
          Novo capítulo
        </Text>
      </Badge>

      <Badge
        borderRadius="2xl"
        px="4"
        m="2"
        left="0"
        bottom="10"
        position="absolute"
        backgroundColor={"gray.100"}
      >
        <Text fontWeight="bold" fontSize="xs" color="gray.500">
          {` ${category} ${emote[data.category]}`}
        </Text>
      </Badge>
    </Box>
  );
};
