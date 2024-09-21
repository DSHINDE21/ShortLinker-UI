import React from "react";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

interface CustomButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  colorScheme?: string;
  // Add any additional custom props you want
}

const Button: React.FC<CustomButtonProps> = ({
  variant,
  children,
  onClick,
  isLoading,
  isDisabled,
  leftIcon,
  rightIcon,
  colorScheme = "white",
  ...rest
}) => {
  return (
    <ChakraButton
      colorScheme={colorScheme}
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      variant={variant}
      borderRadius={12}
      spinner={<BeatLoader size={12} color="white" speedMultiplier={0.5} />}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
