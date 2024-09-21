import {
  Box,
  Code,
  Heading,
  Stack,
  Text,
  Spinner,
  Input,
} from "@chakra-ui/react";
import Button from "@ShortLinker/components/button";
import {
  useFetchUrls,
  usePostCreateShortUrl,
} from "@ShortLinker/services/dashboard";
import React from "react";

interface IUrlData {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ToDo: create reusable TextInput component setup react hook form with yup validation
const LoginPage: React.FC = () => {
  const { data: urlsData, isLoading, error } = useFetchUrls(); // Add isLoading and error handling
  const { mutateAsync: postCreateShortUrl, isPending: isCreatingShortUrl } =
    usePostCreateShortUrl();

  const handleCreateShortUrl = async (url: string) => {
    const reqBody = {
      originalUrl: url,
    };
    await postCreateShortUrl(reqBody);
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
        placeholder="https://fakeapi.platzi.com/en/rest/auth-jwt/"
        isReadOnly
        my={2}
      />

      <Button
        onClick={() =>
          handleCreateShortUrl("https://fakeapi.platzi.com/en/rest/auth-jwt/")
        }
        colorScheme="teal"
        p={4}
        isLoading={isCreatingShortUrl}
        isDisabled={isCreatingShortUrl}
        width="100%"
      >
        Create Short URL
      </Button>
    </Box>
  );
};

export default LoginPage;
