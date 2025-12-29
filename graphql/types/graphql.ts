/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AuthReturnDto = {
  __typename?: 'AuthReturnDto';
  tokenWs: Scalars['String']['output'];
};

export type CommentsReturnDto = {
  __typename?: 'CommentsReturnDto';
  data: Array<OnePostReturnDto>;
  hasMore: Scalars['Boolean']['output'];
  nextCursor?: Maybe<Scalars['String']['output']>;
};

export type CreatePostInput = {
  body: Scalars['String']['input'];
  replyTo?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePostReportInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type CreateUserInput = {
  birth_date: Scalars['Float']['input'];
  email: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type File = {
  __typename?: 'File';
  _id: Scalars['ID']['output'];
  asset_id?: Maybe<Scalars['String']['output']>;
  bytes: Scalars['Float']['output'];
  createdAt: Scalars['Float']['output'];
  folder?: Maybe<Scalars['String']['output']>;
  format: Scalars['String']['output'];
  original_filename: Scalars['String']['output'];
  public_id: Scalars['String']['output'];
  resource_type: Scalars['String']['output'];
  secure_url: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type FilterFeedPostInput = {
  cursorDate?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FilterInput = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  cursorDate?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  onlyMultimedia?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['Float']['output'];
  follower: User;
  following: User;
  updatedAt: Scalars['Float']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AuthLogin: AuthReturnDto;
  AuthLogout: Scalars['Boolean']['output'];
  AuthRegister: AuthReturnDto;
  AuthRotateAccessToken: AuthReturnDto;
  PostCreatePost: Post;
  PostDeletePost: Post;
  PostDeletePostUser: Post;
  PostDislikePost: RactPostReturnDto;
  PostLikePost: RactPostReturnDto;
  PostReportPost: Scalars['Boolean']['output'];
  PostUpdatePost: Post;
  UserFollowUser: Scalars['Boolean']['output'];
  UserUnfollow: Scalars['Boolean']['output'];
  UserUpdate: User;
};


export type MutationAuthLoginArgs = {
  loginInput: LoginInput;
};


export type MutationAuthRegisterArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  register: CreateUserInput;
};


export type MutationPostCreatePostArgs = {
  data: CreatePostInput;
  files: Array<Scalars['Upload']['input']>;
};


export type MutationPostDeletePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostDeletePostUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostDislikePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostLikePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostReportPostArgs = {
  data: CreatePostReportInput;
};


export type MutationPostUpdatePostArgs = {
  data: UpdatePostInput;
};


export type MutationUserFollowUserArgs = {
  userToFollowId: Scalars['String']['input'];
};


export type MutationUserUnfollowArgs = {
  userToUnfollowId: Scalars['String']['input'];
};


export type MutationUserUpdateArgs = {
  bannerImg?: InputMaybe<Scalars['Upload']['input']>;
  profileImg?: InputMaybe<Scalars['Upload']['input']>;
  updateUserInput: UpdateUserInput;
};

export type MyFeedPostDataReturnDto = {
  __typename?: 'MyFeedPostDataReturnDto';
  data: Array<OnePostReturnDto>;
  hasMore: Scalars['Boolean']['output'];
  nextCursor?: Maybe<Scalars['Float']['output']>;
};

export type OnePostReturnDto = {
  __typename?: 'OnePostReturnDto';
  iLiked: Scalars['Boolean']['output'];
  likeCount: Scalars['Float']['output'];
  post: Post;
  replyCount: Scalars['Float']['output'];
};

export type OnlyAllComments = {
  __typename?: 'OnlyAllComments';
  ancestors: CommentsReturnDto;
  replies: CommentsReturnDto;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID']['output'];
  authorId: User;
  body: Scalars['String']['output'];
  comments?: Maybe<Array<Post>>;
  createdAt: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  images?: Maybe<Array<File>>;
  reactionsCount: Scalars['Float']['output'];
  replyTo?: Maybe<Post>;
  status: PostStatus;
  tags: Array<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
};

export type PostAndAllComments = {
  __typename?: 'PostAndAllComments';
  ancestors: CommentsReturnDto;
  post: OnePostReturnDto;
  replies: CommentsReturnDto;
};

export enum PostStatus {
  Active = 'ACTIVE',
  DeletedByAdmin = 'DELETED_BY_ADMIN',
  DeletedByUser = 'DELETED_BY_USER',
  HiddenByReports = 'HIDDEN_BY_REPORTS'
}

export type Query = {
  __typename?: 'Query';
  FollowCount: Scalars['Int']['output'];
  FollowGetFollowers: Follow;
  FollowGetFollowing: Follow;
  FollowerCount: Scalars['Int']['output'];
  PostGetAllComments: OnlyAllComments;
  PostGetAncestorsComments: CommentsReturnDto;
  PostGetComments: CommentsReturnDto;
  PostGetLikesCount: Scalars['Int']['output'];
  PostGetOne: OnePostReturnDto;
  PostGetPostAndAllComments: PostAndAllComments;
  PostGetPostsByIds: Array<OnePostReturnDto>;
  PostLikedPosts: MyFeedPostDataReturnDto;
  PostMyFeed: MyFeedPostDataReturnDto;
  PostUserPosts: MyFeedPostDataReturnDto;
  UserByUsername: UserDataReturnDto;
  UserMeQuery: User;
  UserSuggestedUsers: Array<User>;
};


export type QueryFollowCountArgs = {
  userId: Scalars['String']['input'];
};


export type QueryFollowGetFollowersArgs = {
  cursor: Scalars['String']['input'];
  limit: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};


export type QueryFollowGetFollowingArgs = {
  cursor: Scalars['String']['input'];
  limit: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};


export type QueryFollowerCountArgs = {
  userId: Scalars['String']['input'];
};


export type QueryPostGetAllCommentsArgs = {
  postId: Scalars['String']['input'];
};


export type QueryPostGetAncestorsCommentsArgs = {
  postId: Scalars['String']['input'];
};


export type QueryPostGetCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['String']['input'];
};


export type QueryPostGetLikesCountArgs = {
  postId: Scalars['String']['input'];
};


export type QueryPostGetOneArgs = {
  id: Scalars['String']['input'];
};


export type QueryPostGetPostAndAllCommentsArgs = {
  postId: Scalars['String']['input'];
};


export type QueryPostGetPostsByIdsArgs = {
  postsIds: Array<Scalars['String']['input']>;
};


export type QueryPostLikedPostsArgs = {
  params: FilterInput;
};


export type QueryPostMyFeedArgs = {
  params: FilterFeedPostInput;
};


export type QueryPostUserPostsArgs = {
  params: FilterInput;
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};

export type RactPostReturnDto = {
  __typename?: 'RactPostReturnDto';
  ignored: Scalars['Boolean']['output'];
  likedCount: Scalars['Float']['output'];
};

export type SubDataReturnDto = {
  __typename?: 'SubDataReturnDto';
  authorId: Scalars['String']['output'];
  authorProfileImg?: Maybe<Scalars['String']['output']>;
  authorUsername: Scalars['String']['output'];
  postId: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subNewPosts: SubDataReturnDto;
};

export type UpdatePostInput = {
  id: Scalars['String']['input'];
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  birth_date?: InputMaybe<Scalars['Float']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  bannerImg?: Maybe<File>;
  bio?: Maybe<Scalars['String']['output']>;
  birth_date?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  followers?: Maybe<Array<Follow>>;
  followersCount: Scalars['Float']['output'];
  following?: Maybe<Array<Follow>>;
  followingCount: Scalars['Float']['output'];
  lastname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  profileImg?: Maybe<File>;
  role: Roles;
  updatedAt: Scalars['Float']['output'];
  username: Scalars['String']['output'];
};

export type UserDataReturnDto = {
  __typename?: 'UserDataReturnDto';
  isFollowing: Scalars['Boolean']['output'];
  user: User;
};

/** Indicates the user role */
export enum Roles {
  Admin = 'ADMIN',
  User = 'USER'
}

export type PostDataFragmentFragment = { __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: (
    { __typename?: 'Post', _id: string }
    & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
  ) } & { ' $fragmentName'?: 'PostDataFragmentFragment' };

export type PostFragmentFragment = { __typename?: 'Post', reactionsCount: number, body: string, status: PostStatus, createdAt: number, tags: Array<string>, title?: string | null, authorId: { __typename?: 'User', _id: string, username: string, name: string, lastname: string, profileImg?: { __typename?: 'File', _id: string, secure_url: string, public_id: string } | null }, images?: Array<{ __typename?: 'File', _id: string, public_id: string, secure_url: string }> | null, replyTo?: { __typename?: 'Post', _id: string, authorId: { __typename?: 'User', username: string, _id: string } } | null } & { ' $fragmentName'?: 'PostFragmentFragment' };

export type AuthLoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type AuthLoginMutation = { __typename?: 'Mutation', AuthLogin: { __typename?: 'AuthReturnDto', tokenWs: string } };

export type AuthLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthLogoutMutation = { __typename?: 'Mutation', AuthLogout: boolean };

export type AuthRegisterMutationVariables = Exact<{
  file?: InputMaybe<Scalars['Upload']['input']>;
  register: CreateUserInput;
}>;


export type AuthRegisterMutation = { __typename?: 'Mutation', AuthRegister: { __typename?: 'AuthReturnDto', tokenWs: string } };

export type AuthRotateAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthRotateAccessTokenMutation = { __typename?: 'Mutation', AuthRotateAccessToken: { __typename?: 'AuthReturnDto', tokenWs: string } };

export type PostCreatePostMutationVariables = Exact<{
  data: CreatePostInput;
  files: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
}>;


export type PostCreatePostMutation = { __typename?: 'Mutation', PostCreatePost: { __typename?: 'Post', _id: string, reactionsCount: number, body: string, createdAt: number, tags: Array<string>, title?: string | null, replyTo?: { __typename?: 'Post', _id: string, authorId: { __typename?: 'User', _id: string } } | null, authorId: { __typename?: 'User', _id: string, username: string, name: string, lastname: string, profileImg?: { __typename?: 'File', _id: string, secure_url: string, public_id: string } | null }, images?: Array<{ __typename?: 'File', _id: string, public_id: string, secure_url: string }> | null } };

export type PostDeletePostUserMutationVariables = Exact<{
  deletePostUserId: Scalars['String']['input'];
}>;


export type PostDeletePostUserMutation = { __typename?: 'Mutation', PostDeletePostUser: { __typename?: 'Post', _id: string, status: PostStatus } };

export type PostDislikePostMutationVariables = Exact<{
  dislikePostId: Scalars['String']['input'];
}>;


export type PostDislikePostMutation = { __typename?: 'Mutation', PostDislikePost: { __typename?: 'RactPostReturnDto', ignored: boolean, likedCount: number } };

export type PostLikePostMutationVariables = Exact<{
  likePostId: Scalars['String']['input'];
}>;


export type PostLikePostMutation = { __typename?: 'Mutation', PostLikePost: { __typename?: 'RactPostReturnDto', ignored: boolean, likedCount: number } };

export type PostReportPostMutationVariables = Exact<{
  data: CreatePostReportInput;
}>;


export type PostReportPostMutation = { __typename?: 'Mutation', PostReportPost: boolean };

export type UserFollowUserMutationVariables = Exact<{
  userToFollowId: Scalars['String']['input'];
}>;


export type UserFollowUserMutation = { __typename?: 'Mutation', UserFollowUser: boolean };

export type UserUnfollowMutationVariables = Exact<{
  userToUnfollowId: Scalars['String']['input'];
}>;


export type UserUnfollowMutation = { __typename?: 'Mutation', UserUnfollow: boolean };

export type UserUpdateMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
  bannerImg?: InputMaybe<Scalars['Upload']['input']>;
  profileImg?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type UserUpdateMutation = { __typename?: 'Mutation', UserUpdate: { __typename?: 'User', _id: string, bio?: string | null, createdAt: number, email: string, followersCount: number, followingCount: number, lastname: string, name: string, role: Roles, updatedAt: number, username: string, bannerImg?: { __typename?: 'File', _id: string, secure_url: string, url: string, public_id: string } | null, profileImg?: { __typename?: 'File', _id: string, secure_url: string, url: string, public_id: string } | null } };

export type PostGetAncestorsCommentsQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type PostGetAncestorsCommentsQuery = { __typename?: 'Query', PostGetAncestorsComments: { __typename?: 'CommentsReturnDto', nextCursor?: string | null, hasMore: boolean, data: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: { __typename?: 'Post', _id: string, reactionsCount: number, body: string, createdAt: number, tags: Array<string>, title?: string | null, replyTo?: { __typename?: 'Post', _id: string, authorId: { __typename?: 'User', username: string, _id: string } } | null, authorId: { __typename?: 'User', _id: string, username: string, name: string, lastname: string, profileImg?: { __typename?: 'File', _id: string, secure_url: string, public_id: string } | null }, images?: Array<{ __typename?: 'File', _id: string, public_id: string, secure_url: string }> | null } }> } };

export type PostGetCommentsQueryVariables = Exact<{
  postId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostGetCommentsQuery = { __typename?: 'Query', PostGetComments: { __typename?: 'CommentsReturnDto', nextCursor?: string | null, hasMore: boolean, data: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: { __typename?: 'Post', _id: string, reactionsCount: number, body: string, createdAt: number, tags: Array<string>, title?: string | null, replyTo?: { __typename?: 'Post', _id: string, authorId: { __typename?: 'User', username: string, _id: string } } | null, authorId: { __typename?: 'User', _id: string, username: string, name: string, lastname: string, profileImg?: { __typename?: 'File', _id: string, secure_url: string, public_id: string } | null }, images?: Array<{ __typename?: 'File', _id: string, public_id: string, secure_url: string }> | null } }> } };

export type PostGetLikesCountQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type PostGetLikesCountQuery = { __typename?: 'Query', PostGetLikesCount: number };

export type PostGetPostAndAllCommentsQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type PostGetPostAndAllCommentsQuery = { __typename?: 'Query', PostGetPostAndAllComments: { __typename?: 'PostAndAllComments', replies: { __typename?: 'CommentsReturnDto', hasMore: boolean, nextCursor?: string | null, data: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: (
          { __typename?: 'Post', _id: string }
          & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
        ) }> }, post: { __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: (
        { __typename?: 'Post', _id: string }
        & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
      ) }, ancestors: { __typename?: 'CommentsReturnDto', hasMore: boolean, nextCursor?: string | null, data: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: (
          { __typename?: 'Post', _id: string }
          & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
        ) }> } } };

export type PostGetPostsByIdsQueryVariables = Exact<{
  postsIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type PostGetPostsByIdsQuery = { __typename?: 'Query', PostGetPostsByIds: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: (
      { __typename?: 'Post', _id: string }
      & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
    ) }> };

export type PostLikedPostsQueryVariables = Exact<{
  params: FilterInput;
}>;


export type PostLikedPostsQuery = { __typename?: 'Query', PostLikedPosts: { __typename?: 'MyFeedPostDataReturnDto', hasMore: boolean, nextCursor?: number | null, data: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: (
        { __typename?: 'Post', _id: string }
        & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
      ) }> } };

export type PostMultimediaPostQueryVariables = Exact<{
  params: FilterInput;
}>;


export type PostMultimediaPostQuery = { __typename?: 'Query', PostUserPosts: { __typename?: 'MyFeedPostDataReturnDto', hasMore: boolean, nextCursor?: number | null, data: Array<{ __typename?: 'OnePostReturnDto', post: { __typename?: 'Post', _id: string, images?: Array<{ __typename?: 'File', _id: string, public_id: string, secure_url: string }> | null } }> } };

export type PostMyFeedQueryVariables = Exact<{
  params: FilterFeedPostInput;
}>;


export type PostMyFeedQuery = { __typename?: 'Query', PostMyFeed: { __typename?: 'MyFeedPostDataReturnDto', hasMore: boolean, nextCursor?: number | null, data: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: (
        { __typename?: 'Post', _id: string }
        & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
      ) }> } };

export type PostUserPostsQueryVariables = Exact<{
  params: FilterInput;
}>;


export type PostUserPostsQuery = { __typename?: 'Query', PostUserPosts: { __typename?: 'MyFeedPostDataReturnDto', hasMore: boolean, nextCursor?: number | null, data: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: (
        { __typename?: 'Post', _id: string }
        & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
      ) }> } };

export type UserByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserByUsernameQuery = { __typename?: 'Query', UserByUsername: { __typename?: 'UserDataReturnDto', isFollowing: boolean, user: { __typename?: 'User', _id: string, createdAt: number, email: string, followersCount: number, followingCount: number, lastname: string, name: string, bio?: string | null, username: string, birth_date?: number | null, followers?: Array<{ __typename?: 'Follow', follower: { __typename?: 'User', _id: string, name: string, lastname: string, username: string, profileImg?: { __typename?: 'File', _id: string, secure_url: string, url: string, public_id: string } | null } }> | null, following?: Array<{ __typename?: 'Follow', following: { __typename?: 'User', _id: string, name: string, lastname: string, username: string, profileImg?: { __typename?: 'File', _id: string, secure_url: string, url: string, public_id: string } | null } }> | null, profileImg?: { __typename?: 'File', _id: string, secure_url: string, url: string, public_id: string } | null, bannerImg?: { __typename?: 'File', _id: string, secure_url: string, url: string, public_id: string } | null } } };

export type UserMeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserMeQueryQuery = { __typename?: 'Query', UserMeQuery: { __typename?: 'User', _id: string, createdAt: number, updatedAt: number, email: string, followersCount: number, followingCount: number, lastname: string, name: string, bio?: string | null, role: Roles, username: string, birth_date?: number | null, followers?: Array<{ __typename?: 'Follow', follower: { __typename?: 'User', _id: string, name: string, lastname: string, username: string, profileImg?: { __typename?: 'File', _id: string, secure_url: string, url: string, public_id: string } | null } }> | null, following?: Array<{ __typename?: 'Follow', following: { __typename?: 'User', _id: string, name: string, lastname: string, username: string, profileImg?: { __typename?: 'File', _id: string, secure_url: string, url: string, public_id: string } | null } }> | null, profileImg?: { __typename?: 'File', _id: string, secure_url: string, url: string, public_id: string } | null, bannerImg?: { __typename?: 'File', _id: string, secure_url: string, url: string, public_id: string } | null } };

export type UserSuggestedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UserSuggestedUsersQuery = { __typename?: 'Query', UserSuggestedUsers: Array<{ __typename?: 'User', _id: string, name: string, lastname: string, username: string, profileImg?: { __typename?: 'File', _id: string, secure_url: string } | null }> };

export type ProfilePostsQueryVariables = Exact<{
  multimediaPostParams: FilterInput;
  likedPostsParams: FilterInput;
  userPostsParams: FilterInput;
}>;


export type ProfilePostsQuery = { __typename?: 'Query', multimediaPosts: { __typename?: 'MyFeedPostDataReturnDto', hasMore: boolean, nextCursor?: number | null, data: Array<{ __typename?: 'OnePostReturnDto', post: { __typename?: 'Post', _id: string, images?: Array<{ __typename?: 'File', _id: string, public_id: string, secure_url: string }> | null } }> }, PostLikedPosts: { __typename?: 'MyFeedPostDataReturnDto', hasMore: boolean, nextCursor?: number | null, data: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: (
        { __typename?: 'Post', _id: string }
        & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
      ) }> }, PostUserPosts: { __typename?: 'MyFeedPostDataReturnDto', hasMore: boolean, nextCursor?: number | null, data: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, likeCount: number, replyCount: number, post: (
        { __typename?: 'Post', _id: string }
        & { ' $fragmentRefs'?: { 'PostFragmentFragment': PostFragmentFragment } }
      ) }> } };

export type SubNewPostsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubNewPostsSubscription = { __typename?: 'Subscription', subNewPosts: { __typename?: 'SubDataReturnDto', authorUsername: string, postId: string, authorId: string, authorProfileImg?: string | null } };

export const PostFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<PostFragmentFragment, unknown>;
export const PostDataFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostDataFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OnePostReturnDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<PostDataFragmentFragment, unknown>;
export const AuthLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AuthLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenWs"}}]}}]}}]} as unknown as DocumentNode<AuthLoginMutation, AuthLoginMutationVariables>;
export const AuthLogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AuthLogout"}}]}}]} as unknown as DocumentNode<AuthLogoutMutation, AuthLogoutMutationVariables>;
export const AuthRegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthRegister"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"register"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AuthRegister"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"register"},"value":{"kind":"Variable","name":{"kind":"Name","value":"register"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenWs"}}]}}]}}]} as unknown as DocumentNode<AuthRegisterMutation, AuthRegisterMutationVariables>;
export const AuthRotateAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthRotateAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AuthRotateAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenWs"}}]}}]}}]} as unknown as DocumentNode<AuthRotateAccessTokenMutation, AuthRotateAccessTokenMutationVariables>;
export const PostCreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostCreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"files"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostCreatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"files"},"value":{"kind":"Variable","name":{"kind":"Name","value":"files"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<PostCreatePostMutation, PostCreatePostMutationVariables>;
export const PostDeletePostUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostDeletePostUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePostUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostDeletePostUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePostUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<PostDeletePostUserMutation, PostDeletePostUserMutationVariables>;
export const PostDislikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostDislikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dislikePostId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostDislikePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dislikePostId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ignored"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}}]}}]} as unknown as DocumentNode<PostDislikePostMutation, PostDislikePostMutationVariables>;
export const PostLikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostLikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likePostId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostLikePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likePostId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ignored"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}}]}}]} as unknown as DocumentNode<PostLikePostMutation, PostLikePostMutationVariables>;
export const PostReportPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostReportPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostReportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostReportPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<PostReportPostMutation, PostReportPostMutationVariables>;
export const UserFollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserFollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userToFollowId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserFollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userToFollowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userToFollowId"}}}]}]}}]} as unknown as DocumentNode<UserFollowUserMutation, UserFollowUserMutationVariables>;
export const UserUnfollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserUnfollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userToUnfollowId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserUnfollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userToUnfollowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userToUnfollowId"}}}]}]}}]} as unknown as DocumentNode<UserUnfollowMutation, UserUnfollowMutationVariables>;
export const UserUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bannerImg"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImg"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"bannerImg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bannerImg"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileImg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImg"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"bannerImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UserUpdateMutation, UserUpdateMutationVariables>;
export const PostGetAncestorsCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostGetAncestorsComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostGetAncestorsComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PostGetAncestorsCommentsQuery, PostGetAncestorsCommentsQueryVariables>;
export const PostGetCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostGetComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostGetComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PostGetCommentsQuery, PostGetCommentsQueryVariables>;
export const PostGetLikesCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostGetLikesCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostGetLikesCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]} as unknown as DocumentNode<PostGetLikesCountQuery, PostGetLikesCountQueryVariables>;
export const PostGetPostAndAllCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostGetPostAndAllComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostGetPostAndAllComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"ancestors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<PostGetPostAndAllCommentsQuery, PostGetPostAndAllCommentsQueryVariables>;
export const PostGetPostsByIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostGetPostsByIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostGetPostsByIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postsIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<PostGetPostsByIdsQuery, PostGetPostsByIdsQueryVariables>;
export const PostLikedPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostLikedPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostLikedPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<PostLikedPostsQuery, PostLikedPostsQueryVariables>;
export const PostMultimediaPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostMultimediaPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostUserPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PostMultimediaPostQuery, PostMultimediaPostQueryVariables>;
export const PostMyFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostMyFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterFeedPostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostMyFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<PostMyFeedQuery, PostMyFeedQueryVariables>;
export const PostUserPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostUserPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostUserPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<PostUserPostsQuery, PostUserPostsQueryVariables>;
export const UserByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bannerImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"birth_date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}}]}}]} as unknown as DocumentNode<UserByUsernameQuery, UserByUsernameQueryVariables>;
export const UserMeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserMeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserMeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bannerImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"birth_date"}}]}}]}}]} as unknown as DocumentNode<UserMeQueryQuery, UserMeQueryQueryVariables>;
export const UserSuggestedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSuggestedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserSuggestedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]}}]} as unknown as DocumentNode<UserSuggestedUsersQuery, UserSuggestedUsersQueryVariables>;
export const ProfilePostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfilePosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"multimediaPostParams"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likedPostsParams"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userPostsParams"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"multimediaPosts"},"name":{"kind":"Name","value":"PostUserPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"multimediaPostParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"PostLikedPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likedPostsParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"PostUserPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userPostsParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reactionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<ProfilePostsQuery, ProfilePostsQueryVariables>;
export const SubNewPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SubNewPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subNewPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorUsername"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"authorProfileImg"}}]}}]}}]} as unknown as DocumentNode<SubNewPostsSubscription, SubNewPostsSubscriptionVariables>;