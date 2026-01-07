import { apolloClient } from "@/graphql/client";
import {
  PostLikePostDocument,
  PostDislikePostDocument,
  PostGetPostAndAllCommentsDocument,
  PostCreatePostDocument,
  CreatePostInput,
  PostCreatePostMutation,
  PostGetCommentsDocument,
  PostGetCommentsQuery,
  PostGetAncestorsCommentsDocument,
  PostGetAncestorsCommentsQuery,
  PostGetPostsByIdsDocument,
  PostGetPostsByIdsQuery,
} from "@/graphql/types/graphql";
import { ApolloCache } from "@apollo/client";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { FormattedExecutionResult } from "graphql";
import { ObjMap } from "graphql/jsutils/ObjMap";
// import { useApp } from "./useApp";

const updateFeed = (
  cache: ApolloCache,
  newPost: FormattedExecutionResult<PostCreatePostMutation, ObjMap<unknown>>
) => {
  cache.modify({
    fields: {
      PostMyFeed: (existing, {}) => {
        console.log("Post feed", existing);
        const newFeedPost = {
          iLiked: false,
          post: newPost.data?.PostCreatePost,
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
  newPost: FormattedExecutionResult<PostCreatePostMutation, ObjMap<unknown>>
) => {
  cache.modify({
    fields: {
      PostGetPostAndAllComments: (existing, {}) => {
        const newRepliesPost = {
          iLiked: false,
          post: newPost.data?.PostCreatePost,
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
  newReplies: FormattedExecutionResult<PostGetCommentsQuery, ObjMap<unknown>>
) => {
  cache.modify({
    fields: {
      PostGetPostAndAllComments: (existing, {}) => {
        if (!newReplies.data?.PostGetComments) {
          return existing;
        }
        return {
          ...existing,
          replies: {
            ...newReplies.data.PostGetComments,
            data: [
              ...existing.replies.data,
              ...newReplies.data.PostGetComments.data,
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
    PostGetAncestorsCommentsQuery,
    ObjMap<unknown>
  >
) => {
  cache.modify({
    fields: {
      PostGetPostAndAllComments: (existing, {}) => {
        if (!newAncestorsComments.data?.PostGetAncestorsComments) {
          return existing;
        }
        return {
          ...existing,
          ancestorsComments: {
            ...newAncestorsComments.data.PostGetAncestorsComments,
            data: [
              ...existing.ancestorsComments.data,
              ...newAncestorsComments.data.PostGetAncestorsComments.data,
            ],
          },
        };
      },
    },
  });
};

const mergePostsByIds = (
  cache: ApolloCache,
  newPosts: FormattedExecutionResult<PostGetPostsByIdsQuery, ObjMap<unknown>>
) => {
  cache.modify({
    fields: {
      PostMyFeed: (existing) => {
        if (!newPosts.data?.PostGetPostsByIds) {
          return existing;
        }

        const data = [...newPosts.data?.PostGetPostsByIds, ...existing.data];
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
  const [likePostMutation, likePostData] = useMutation(PostLikePostDocument, {
    client: apolloClient,
  });
  const [dislikePostMutation, dislikePostData] = useMutation(
    PostDislikePostDocument,
    {
      client: apolloClient,
    }
  );
  const [createPostMutation, { loading: createPostLoading }] = useMutation(
    PostCreatePostDocument,
    {
      client: apolloClient,
      update: (cache, res) => {
        const newPost = res.data?.PostCreatePost;
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
  ] = useLazyQuery(PostGetPostAndAllCommentsDocument, {
    client: apolloClient,
  });

  const [commentsFetch, { data: commentsData, loading: commentsLoading }] =
    useLazyQuery(PostGetCommentsDocument, {
      client: apolloClient,
    });

  const [
    ancestorsCommentsFetch,
    { data: ancestorsCommentsData, loading: ancestorsCommentsLoading },
  ] = useLazyQuery(PostGetAncestorsCommentsDocument, {
    client: apolloClient,
  });

  const [
    getPostsByIdsFetch,
    { data: getPostsByIdsData, loading: getPostsByIdsLoading },
  ] = useLazyQuery(PostGetPostsByIdsDocument, { client: apolloClient });

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
    postAndAllComments: postAndAllCommentsData?.PostGetPostAndAllComments,
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
