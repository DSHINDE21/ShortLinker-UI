// Modal.tsx

import { ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalProps,
} from "@chakra-ui/react";

interface ModalComponentProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  title,
  children,
  ...rest
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
