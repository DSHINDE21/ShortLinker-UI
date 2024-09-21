import { ChakraProvider } from "@chakra-ui/react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { AxiosError } from "axios";
import theme from "../theme";

interface IProvider {
  children: React.ReactNode;
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 30 * 1000, //expiryTime
    },
  },
  queryCache: new QueryCache({
    onError: async (error) => {
      const err = error as AxiosError;
      if (err.request?.status === 401) {
        queryClient.clear();
        window.location.replace("/");
      }
    },
  }),
});

const Provider = ({ children }: IProvider) => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" reverseOrder={false} />
          <HelmetProvider>{children}</HelmetProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default Provider;
