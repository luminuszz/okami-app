import React from "react";
import { Box, Text, useToast } from "native-base";
import { type ColorType } from "native-base/lib/typescript/components/types";

type ToastStatus = "success" | "error" | "warning" | "info";

type ToastVariant = Record<ToastStatus, ColorType>;

interface BaseToastProps {
  message: string;
  type: ToastStatus;
}

const toastVariants: ToastVariant = {
  error: "red.500",
  info: "blue.500",
  success: "emerald.500",
  warning: "amber.500",
};

interface UseToastType {
  show: (message: string, type: ToastStatus) => void;
}

const BaseToast: React.FC<BaseToastProps> = ({ message, type }) => {
  const colorVariant = toastVariants[type];

  return (
    <Box bg={colorVariant} px="2" py="1" rounded="lg" mb={5}>
      <Text color="gray.100">{message}</Text>
    </Box>
  );
};

export function useAppToast(): UseToastType {
  const toast = useToast();

  const show = (message: string, type: ToastStatus = "info"): void => {
    toast.show({
      render: () => <BaseToast message={message} type={type} />,
    });
  };

  return {
    show,
  };
}
