import { apolloClient } from "@/graphql/client";
import { DeletePostUserDocument, } from "@/graphql/types/graphql";
import { useMutation } from "@apollo/client/react";

export const useDeletePost = () => {
  const [deletePostUser, { loading, data }] = useMutation(
    DeletePostUserDocument,
    { client: apolloClient }
  );

  const deletePost = async (postId: string) => {
    try {
      const res = await deletePostUser({
        variables: { deletePostUserId: postId },
        update: (cache, res) => {
          if (!res.data) return;
          const postRef = cache.identify({ __typename: "Post", _id: postId });
          cache.modify({
            id: postRef,
            fields: {
              status() {
                return res.data?.deletePostUser.status;
              },
            },
          });
        },
      });
      return res;
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return { deletePost, loading, data };
};
