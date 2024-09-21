import { ReactNode } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerProps,
} from "@chakra-ui/react";

interface DrawerComponentProps extends DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  isOpen,
  onClose,
  title,
  children,
  ...rest
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} {...rest}>
      <DrawerOverlay>
        <DrawerContent borderRadius={"xl"}>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default DrawerComponent;
