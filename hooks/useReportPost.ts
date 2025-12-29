import { apolloClient } from "@/graphql/client";
import {
  CreatePostReportInput,
  PostReportPostDocument,
} from "@/graphql/types/graphql";
import { useMutation } from "@apollo/client/react";

export const useReportPost = () => {
  const [reportPostFetch, { data, loading, error }] = useMutation(
    PostReportPostDocument,
    {
      client: apolloClient,
    }
  );

  const reportPost = async (data: CreatePostReportInput) => {
    const res = await reportPostFetch({ variables: { data } });
    return res.data?.PostReportPost;
  };

  return {
    reportPost,
    dataReport: data,
    loadingReport: loading,
    errorReport: error,
  };
};
