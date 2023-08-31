import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { useGetCurrentUserQuery } from "../services/okami";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";

export const Navbar: React.FC = () => {
  const { navigate } = useNavigation<any>();

  const { data } = useGetCurrentUserQuery();

  const avatarName = data?.name?.slice(0, 2)?.toUpperCase() || "";

  console.log({
    data,
  });

  return (
    <Box px="2" py="2">
      <Flex flexDir="row" justifyContent="space-between" alignItems="center">
        <HStack alignItems="center" space="2">
          <Avatar
            bg="blueGray.800"
            shadow={8}
            size="md"
            backgroundColor="blueGray.700"
            source={{ uri: data?.avatarImageUrl || "" }}
          >
            <Text
              fontSize="md"
              color="gray.100"
              fontWeight="bold"
              letterSpacing="2xl"
            >
              {avatarName}
            </Text>
          </Avatar>

          <VStack>
            <Text color="gray.200" fontWeight="bold">
              Bom dia
            </Text>
            <Text fontSize="md" color="gray.100" fontWeight="bold">
              Davi Ribeiro
            </Text>
          </VStack>
        </HStack>

        <IconButton
          icon={<MaterialIcons name="menu" size={25} color="white" />}
          onPress={() => {
            navigate("MarkWorkFinishedPage");
          }}
        />
      </Flex>
    </Box>
  );
};
