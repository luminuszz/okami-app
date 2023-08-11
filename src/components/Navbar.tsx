import React from "react";
import { Avatar, Box, Button, HStack, Text } from "native-base";
import { useGetCurrentUserQuery } from "../services/okami";
import { useNavigation } from "@react-navigation/native";

export const Navbar: React.FC = () => {
  const { navigate } = useNavigation<any>();

  const { data } = useGetCurrentUserQuery();

  const avatarName = data?.name?.slice(0, 2)?.toUpperCase() || "";

  return (
    <Box px="2" py="2">
      <HStack justifyContent="space-between" alignItems="center">
        <Avatar
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

        <Button
          onPress={() => {
            navigate("MarkWorkFinishedPage");
          }}
        >
          Finalizar obra
        </Button>
      </HStack>
    </Box>
  );
};
