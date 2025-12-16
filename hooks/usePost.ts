import { apolloClient } from "@/graphql/client";
import {
  LikePostDocument,
  DislikePostDocument,
  GetPostAndAllCommentsDocument,
  CreatePostMutationDocument,
  CreatePostInput,
  CreatePostMutationMutation,
  GetCommentsDocument,
  GetCommentsQuery,
  GetAncestorsCommentsDocument,
  GetAncestorsCommentsQuery,
  GetPostsByIdsDocument,
  GetPostsByIdsQuery,
} from "@/graphql/types/graphql";
import { ApolloCache } from "@apollo/client";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { FormattedExecutionResult } from "graphql";
import { ObjMap } from "graphql/jsutils/ObjMap";
// import { useApp } from "./useApp";

const updateFeed = (
  cache: ApolloCache,
  newPost: FormattedExecutionResult<CreatePostMutationMutation, ObjMap<unknown>>
) => {
  cache.modify({
    fields: {
      myFeed: (existing, {}) => {
        console.log("Post feed", existing);
        const newFeedPost = {
          iLiked: false,
          post: newPost.data?.createPost,
          likesCount: 0,
          repliesCount: 0,
        };
        if (!existing || !existing.data) {
          return { ...existing, data: [newFeedPost] };
        }
        return {
          ...existing,
          data: [newFeedPost, ...existing.data],
        };
      },
    },
  });
};

const updateReplies = (
  cache: ApolloCache,
  newPost: FormattedExecutionResult<CreatePostMutationMutation, ObjMap<unknown>>
) => {
  cache.modify({
    fields: {
      postAndAllComments: (existing, {}) => {
        const newRepliesPost = {
          iLiked: false,
          post: newPost.data?.createPost,
          likeCount: 0,
          replyCount: 0,
        };
        if (!existing || !existing.replies || !existing.replies.data) {
          return {
            ...existing,
            replies: {
              ...existing.replies,
              data: [newRepliesPost],
            },
          };
        }
        return {
          ...existing,
          replies: {
            ...existing.replies,
            data: [newRepliesPost, ...existing.replies.data],
          },
        };
      },
    },
  });
};

const mergeMoreReplies = (
  cache: ApolloCache,
  newReplies: FormattedExecutionResult<GetCommentsQuery, ObjMap<unknown>>
) => {
  cache.modify({
    fields: {
      postAndAllComments: (existing, {}) => {
        if (!newReplies.data?.getComments) {
          return existing;
        }
        return {
          ...existing,
          replies: {
            ...newReplies.data.getComments,
            data: [
              ...existing.replies.data,
              ...newReplies.data.getComments.data,
            ],
          },
        };
      },
    },
  });
};

const mergeAncestorsComments = (
  cache: ApolloCache,
  newAncestorsComments: FormattedExecutionResult<
    GetAncestorsCommentsQuery,
    ObjMap<unknown>
  >
) => {
  cache.modify({
    fields: {
      postAndAllComments: (existing, {}) => {
        if (!newAncestorsComments.data?.getAncestorsComments) {
          return existing;
        }
        return {
          ...existing,
          ancestorsComments: {
            ...newAncestorsComments.data.getAncestorsComments,
            data: [
              ...existing.ancestorsComments.data,
              ...newAncestorsComments.data.getAncestorsComments.data,
            ],
          },
        };
      },
    },
  });
};

const mergePostsByIds = (
  cache: ApolloCache,
  newPosts: FormattedExecutionResult<GetPostsByIdsQuery, ObjMap<unknown>>
) => {
  cache.modify({
    fields: {
      myFeed: (existing) => {
        if (!newPosts.data?.getPostsByIds) {
          return existing;
        }

        const data = [...newPosts.data?.getPostsByIds,...existing.data, ];
        const newFeedData = {
          ...existing,
          data,
        };
        return newFeedData;
      },
    },
  });
};

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
      update: (cache, res) => {
        const newPost = res.data?.createPost;
        if (newPost?.replyTo) {
          updateReplies(cache, res);
        } else {
          updateFeed(cache, res);
        }
      },
    }
  );
  const [
    postAndCommentsFetch,
    { data: postAndAllCommentsData, loading: postAndAllCommentsLoading },
  ] = useLazyQuery(GetPostAndAllCommentsDocument, {
    client: apolloClient,
  });

  const [commentsFetch, { data: commentsData, loading: commentsLoading }] =
    useLazyQuery(GetCommentsDocument, {
      client: apolloClient,
    });

  const [
    ancestorsCommentsFetch,
    { data: ancestorsCommentsData, loading: ancestorsCommentsLoading },
  ] = useLazyQuery(GetAncestorsCommentsDocument, {
    client: apolloClient,
  });

  const [
    getPostsByIdsFetch,
    { data: getPostsByIdsData, loading: getPostsByIdsLoading },
  ] = useLazyQuery(GetPostsByIdsDocument, { client: apolloClient });

  async function createPost(data: CreatePostInput, files?: FileList) {
    const res = await createPostMutation({
      variables: {
        data,
        files: files || [],
      },
    });
    return res;
  }

  async function getPostsByIds(postsIds: string[]) {
    const res = await getPostsByIdsFetch({
      variables: {
        postsIds,
      },
    });
    mergePostsByIds(apolloClient.cache, res);
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

  async function getAncestorsComments(postId: string) {
    const res = await ancestorsCommentsFetch({
      variables: {
        postId,
      },
    });
    mergeAncestorsComments(apolloClient.cache, res);
    return res;
  }

  async function getComments(postId: string, cursor?: string) {
    const res = await commentsFetch({
      variables: {
        postId,
        cursor,
      },
    });
    mergeMoreReplies(apolloClient.cache, res);
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
    getComments,
    commentsData,
    commentsLoading,
    getAncestorsComments,
    ancestorsCommentsData,
    ancestorsCommentsLoading,
    getPostsByIds,
    getPostsByIdsData,
    getPostsByIdsLoading,
    likePostError: likePostData.error,
    likePostLoading: likePostData.loading,
    dislikePostError: dislikePostData.error,
    dislikePostLoading: dislikePostData.loading,
    // likesCountLoading,
    // likesCountData,
  };
};
