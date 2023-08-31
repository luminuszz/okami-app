import { Box, FlatList, Skeleton } from "native-base";
import { Card } from "./Card";
import React, { useMemo } from "react";
import { useAppSelector } from "../../../store/store";
import { selectSearch } from "../home.slice";
import { useNavigation } from "@react-navigation/native";
import { type AppRoutesParams } from "../../../routes/app.routes";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFetchAllWorksUnreadQuery } from "../../../services/okami";
import { Dimensions } from "react-native";
import { compareDesc } from "date-fns";

const { height } = Dimensions.get("screen");

const naxHeight = height - 260;

export const WorkList: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppRoutesParams>>();

  const { data: works, isLoading } = useFetchAllWorksUnreadQuery();

  const search = useAppSelector(selectSearch);

  const filteredWorks = useMemo(
    () =>
      works
        ?.filter((work) =>
          work.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => compareDesc(a.updatedAt, b.updatedAt)),
    [works, search]
  );

  if (isLoading) {
    return (
      <Box mt="10">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            startColor="blueGray.800"
            height={300}
            borderRadius="lg"
            my="2"
            key={index}
          />
        ))}
      </Box>
    );
  }

  return (
    <FlatList
      maxHeight="full"
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
      mb="50px"
      data={filteredWorks}
      renderItem={({ item }) => (
        <Card
          onClickCard={() => {
            navigation.push("UpdateWorkPage", { workId: item.id });
          }}
          onClickMarRead={() => {
            navigation.push("UpdateChapter", {
              chapter: item.chapter,
              workId: item.id,
            });
          }}
          data={item}
        />
      )}
      mt={8}
      ItemSeparatorComponent={() => <Box my="2" />}
      keyExtractor={(item) => item.id}
    />
  );
};
