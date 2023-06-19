import React, { useEffect } from "react";
import { useLazyRefreshWorksQuery } from "../../../services/okami";
import { IconButton, Spinner } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { useAppToast } from "../../../components/Toast";

export const RefreshWorksButton: React.FC = () => {
  const toast = useAppToast();
  const [refreshWorks, { isLoading: isRefreshingWorks, isSuccess }] =
    useLazyRefreshWorksQuery();

  const handleRefreshWorks = (): void => {
    void refreshWorks();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.show("Obras sendo atualizadas", "success");
    }
  }, [isSuccess]);

  return isRefreshingWorks ? (
    <Spinner ml="2" mt="12" color="gray.100" size="lg" />
  ) : (
    <IconButton
      mt="10"
      isDisabled={isRefreshingWorks}
      onPress={handleRefreshWorks}
      icon={<EvilIcons name="refresh" size={40} color="white" />}
    />
  );
};
