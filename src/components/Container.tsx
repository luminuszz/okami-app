import React from "react";

import { Flex } from "native-base";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <Flex width="full" height="full" backgroundColor="blueGray.900">
      {children}
    </Flex>
  );
};

export default Container;
