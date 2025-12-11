import { apolloClient } from "@/graphql/client";
import {
  LikePostDocument,
  DislikePostDocument,
  GetPostAndAllCommentsDocument,
  CreatePostMutationDocument,
  CreatePostInput,
} from "@/graphql/types/graphql";
import { useLazyQuery, useMutation } from "@apollo/client/react";
// import { useApp } from "./useApp";

export const usePost = () => {
  // const { setIsLoading } = useApp();
  const [likePostMutation, likePostData] = useMutation(LikePostDocument, {
    client: apolloClient,
  });
  const [dislikePostMutation, dislikePostData] = useMutation(
    DislikePostDocument,
    {
      client: apolloClient,
    }
  );
  const [createPostMutation, { loading: createPostLoading }] = useMutation(
    CreatePostMutationDocument,
    {
      client: apolloClient,
    }
  );
  const [
    postAndCommentsFetch,
    { data: postAndAllCommentsData, loading: postAndAllCommentsLoading },
  ] = useLazyQuery(GetPostAndAllCommentsDocument, {
    client: apolloClient,
  });

  async function createPost(data: CreatePostInput, files?: FileList) {
    const res = await createPostMutation({
      variables: {
        data,
        files,
      },
    });
    return res;
  }

  async function getPostAndAllComments(postId: string) {
    const res = await postAndCommentsFetch({
      variables: {
        postId,
      },
    });
    return res;
  }

  async function likePost(likePostId: string) {
    return await likePostMutation({
      variables: {
        likePostId,
      },
    });
  }

  async function dislikePost(dislikePostId: string) {
    return await dislikePostMutation({
      variables: {
        dislikePostId,
      },
    });
  }

  return {
    likePost,
    dislikePost,
    createPost,
    createPostLoading,
    getPostAndAllComments,
    postAndAllComments: postAndAllCommentsData?.postAndAllComments,
    postAndAllCommentsLoading,
    likePostError: likePostData.error,
    likePostLoading: likePostData.loading,
    dislikePostError: dislikePostData.error,
    dislikePostLoading: dislikePostData.loading,
    // likesCountLoading,
    // likesCountData,
  };
};
