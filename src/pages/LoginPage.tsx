import React, { useState } from "react";
import {
  Box,
  Code,
  Heading,
  Stack,
  Text,
  Spinner,
  Input,
  Card,
} from "@chakra-ui/react";
import Button from "@ShortLinker/components/button";
import { toastFail } from "@ShortLinker/components/toast";
import {
  useFetchUrls,
  usePostCreateShortUrl,
} from "@ShortLinker/services/dashboard";
import { ShortLinker_colors } from "@ShortLinker/theme/colors";

interface IUrlData {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
}

// ToDo: create reusable TextInput component setup react hook form with yup validation
const LoginPage: React.FC = () => {
  const [urlInput, setUrlInput] = useState("");

  const { data: urlsData, isLoading, error } = useFetchUrls();
  const { mutateAsync: postCreateShortUrl, isPending: isCreatingShortUrl } =
    usePostCreateShortUrl();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
  };

  const handleCreateShortUrl = async () => {
    if (!urlInput) {
      toastFail("Please enter a URL");
      return;
    }

    const reqBody = {
      originalUrl: urlInput,
    };

    await postCreateShortUrl(reqBody);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateShortUrl();
    }
  };

  return (
    <Box p={6} maxW="700px" mx="auto">
      <Heading mb={6} textAlign="center">
        ShortLinker
      </Heading>

      {isLoading && (
        <Box textAlign="center" my={4}>
          <Spinner size="xl" color="teal.500" />
          <Text mt={2}>Loading URLs...</Text>
        </Box>
      )}

      {error && (
        <Box textAlign="center" my={4}>
          <Text color="red.500">Failed to load URLs. Please try again.</Text>
        </Box>
      )}

      {!isLoading && urlsData?.data?.length > 0 && (
        <Stack spacing={4} mb={6}>
          {urlsData?.data?.map((url: IUrlData) => (
            <Code
              key={url._id}
              p={4}
              borderRadius="md"
              bg="gray.50"
              width="100%"
            >
              <Text fontWeight="bold">Original URL: {url.originalUrl}</Text>
              <Text fontWeight="bold">Short URL: {url.shortUrl}</Text>
              <Text fontWeight="bold">
                Created At: {new Date(url.createdAt).toLocaleString()}
              </Text>
            </Code>
          ))}
        </Stack>
      )}

      {!isLoading && urlsData?.data?.length === 0 && (
        <Box textAlign="center" my={4}>
          <Text>No URLs found. Create a new one below!</Text>
        </Box>
      )}

      <Input
        value={urlInput}
        placeholder="Enter URL here"
        my={2}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <Card position={"sticky"} bottom={4} bg={ShortLinker_colors.body}>
        <Button
          onClick={() => handleCreateShortUrl()}
          colorScheme="teal"
          p={4}
          isLoading={isCreatingShortUrl}
          isDisabled={isCreatingShortUrl}
          width="100%"
        >
          Create Short URL
        </Button>
      </Card>
    </Box>
  );
};

export default LoginPage;
