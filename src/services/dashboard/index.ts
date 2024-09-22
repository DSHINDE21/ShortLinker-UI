import axiosService from "@ShortLinker/services/service-axios";
import { MyResponse } from "@ShortLinker/services/interface";
import { api } from "@ShortLinker/services/service-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastFail, toastSuccess } from "@ShortLinker/components/toast";
import { ICreateShortUrlRequest } from "@ShortLinker/services/dashboard/interface";

const fetchUrls = () => {
  return axiosService.get<MyResponse>(api.urls, {});
};

const useFetchUrls = () => {
  return useQuery({
    queryKey: [api.urls],
    queryFn: () => fetchUrls(),
    select: (data) => data?.data,
    // enabled: !!token,
  });
};

const postCreateShortUrl = (requestBody: ICreateShortUrlRequest) => {
  return axiosService.post<MyResponse>(api.createShortUrl, requestBody);
};

const usePostCreateShortUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCreateShortUrl,
    onSuccess: (success) => {
      if (success?.data?.success === 1) {
        toastSuccess(success?.data?.message);
        queryClient.invalidateQueries({
          queryKey: [api.urls],
        });
      } else {
        toastFail(success?.data?.message);
      }
    },
    onError: (error) => {
      console.log("error", error);
      toastFail(error?.message);
      // toastFail(error?.response?.data?.message);
    },
  });
};

export { useFetchUrls, usePostCreateShortUrl };
