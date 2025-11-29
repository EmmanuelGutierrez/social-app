import { apolloClient } from "@/graphql/client";
import {
  MyFeedDocument,
  LikePostDocument,
  DislikePostDocument,
} from "@/graphql/types/graphql";
import { useMutation, useQuery } from "@apollo/client/react";

export const usePost = () => {
  const [likePostMutation, likePostData] = useMutation(LikePostDocument, {
    client: apolloClient,

    // update(cache, { data, }) {
    //   if (!data?.likePost) {
    //     return;
    //   }
    //   data.
    //   cache.modify({
    //     id: cache.identify({ __typename: "Post", _id: "" }),
    //     fields:{

    //     }
    //   });
    // },
  });
  const [dislikePostMutation, dislikePostData] = useMutation(
    DislikePostDocument,
    {
      client: apolloClient,
    }
  );
  // const [myFeed, setMyFeed] = useState<MyFeedQuery>();
  // useEffect(() => {
  //   console.log("MY FEED", myFeed);
  // }, [myFeed]);
  // const getMyFeed = async (params: FilterFeedPostInput) => {
  //   const res = await myFeedQuery({
  //     variables: {
  //       params,
  //     },
  //   });
  //   // if (res.data) {
  //   //   setMyFeed(res.data);
  //   // }
  // };

  function useMyFeed() {
    const {
      data: myFeed,
      loading,
      error,
      fetchMore,
    } = useQuery(MyFeedDocument, {
      client: apolloClient,
      variables: {
        params: {
          limit: 5,
          cursorDate: null,
        },
      },
      fetchPolicy: "network-only",
    });
    const loadMore = () => {
      if (!myFeed?.myFeed.hasMore) {
        return;
      }

      return fetchMore({
        variables: {
          params: {
            limit: 5,
            cursorDate: myFeed.myFeed.nextCursor,
            // tags,
          },
        },
      });
    };
    return { myFeed, loading, error, loadMore };
  }

  async function likePost(likePostId: string) {
    return await likePostMutation({
      variables: {
        likePostId,
      },
      // update(cache, { data }) {
      //   console.log("UPDATE")
      //   if (!data?.likePost) {
      //     return;
      //   }
      //   const res= cache.readQuery({
      //     query: MyFeedDocument,
      //     variables: {
      //       params: {
      //         limit: 10,
      //       },
      //     },
      //   });
      //   console.log('res',res)
      // },
    });
    // console.log("LIKE POST", res.data?.likePost, myFeed);
    // if (res.data?.likePost && myFeed) {
    //   const myNewFeedData = myFeed?.myFeed.data.map((postD) => {
    //     if (postD.post._id === likePostId) {
    //       return {
    //         __typename: postD.__typename,
    //         iLiked: true,
    //         post: {
    //           ...postD.post,
    //           reactionsCount: postD.post.reactionsCount + 1,
    //         },
    //       };
    //     }
    //     return postD;
    //   });

    //   setMyFeed({
    //     ...myFeed,
    //     myFeed: { ...myFeed.myFeed, data: myNewFeedData },
    //   });
    // }
  }

  async function dislikePost(dislikePostId: string) {
    return await dislikePostMutation({
      variables: {
        dislikePostId,
      },
      // update(cache, { data }) {
      //   if (!data?.dislikePost) {
      //     return;
      //   }
      //   cache.modify({
      //     id: cache.identify({ __typename: "Post", _id: dislikePostId }),
      //     fields: {
      //       reactionsCount: (prev: number) => prev - 1,
      //     },
      //   });
      // },
    });
    // console.log("disLIKE POST", res.data?.dislikePost, myFeed);
    // if (res.data?.dislikePost && myFeed) {
    //   const myNewFeedData = myFeed?.myFeed.data.map((postD) => {
    //     if (postD.post._id === dislikePostId) {
    //       return {
    //         __typename: postD.__typename,
    //         iLiked: false,
    //         post: {
    //           ...postD.post,
    //           reactionsCount: postD.post.reactionsCount - 1,
    //         },
    //       };
    //     }
    //     return postD;
    //   });
    //   setMyFeed({
    //     ...myFeed,
    //     myFeed: { ...myFeed.myFeed, data: myNewFeedData },
    //   });
    // }
  }

  return {
    // getMyFeed,
    useMyFeed,
    // myFeedError: myFeedData.error,
    // myFeedLoading: myFeedData.loading,
    likePost,
    dislikePost,
    likePostError: likePostData.error,
    likePostLoading: likePostData.loading,
    dislikePostError: dislikePostData.error,
    dislikePostLoading: dislikePostData.loading,
  };
};
