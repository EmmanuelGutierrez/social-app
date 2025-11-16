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

export type CreatePostInput = {
  body: Scalars['String']['input'];
  replyTo?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  birth_date: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type FeedPost = {
  __typename?: 'FeedPost';
  createdAt: Scalars['Float']['output'];
  postId: Post;
  updatedAt: Scalars['Float']['output'];
  userId: User;
};

export type FeedPostDataReturnDto = {
  __typename?: 'FeedPostDataReturnDto';
  data: Array<FeedPost>;
  inThisPage: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
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
  cursorDate?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FilterInput = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FollowUserDto = {
  __typename?: 'FollowUserDto';
  _id: Scalars['ID']['output'];
  followDate: Scalars['Float']['output'];
  user: User;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  followUser: Scalars['Boolean']['output'];
  login: AuthReturnDto;
  logout: Scalars['Boolean']['output'];
  register: AuthReturnDto;
  updatePost: Post;
  updateReaction: Post;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
  files: UploadInputArray;
};


export type MutationFollowUserArgs = {
  userToFollowId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  file: UploadInput;
  register: CreateUserInput;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
};


export type MutationUpdateReactionArgs = {
  id: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID']['output'];
  authorId: User;
  body: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  images?: Maybe<Array<File>>;
  reactions: Array<User>;
  replyTo?: Maybe<Post>;
  tags: Array<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
};

export type PostDataReturnDto = {
  __typename?: 'PostDataReturnDto';
  data: Array<Post>;
  inThisPage: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  allFiles: Array<File>;
  allPosts: PostDataReturnDto;
  getComments: Post;
  getOne: Post;
  mePosts: PostDataReturnDto;
  meQuery: User;
  myFeed: FeedPostDataReturnDto;
  rotateAccessToken: AuthReturnDto;
  test: Scalars['String']['output'];
};


export type QueryAllPostsArgs = {
  params: FilterInput;
};


export type QueryGetCommentsArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOneArgs = {
  id: Scalars['String']['input'];
};


export type QueryMePostsArgs = {
  params: FilterInput;
};


export type QueryMyFeedArgs = {
  params: FilterFeedPostInput;
};

export type SubDataReturnDto = {
  __typename?: 'SubDataReturnDto';
  authorId: Scalars['String']['output'];
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

export type UploadInput = {
  file?: InputMaybe<Scalars['Upload']['input']>;
};

export type UploadInputArray = {
  files?: InputMaybe<Scalars['Upload']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  followers: Array<FollowUserDto>;
  following: Array<FollowUserDto>;
  lastname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  profileImg?: Maybe<File>;
  role: Roles;
  updatedAt: Scalars['Float']['output'];
  username: Scalars['String']['output'];
};

/** Indicates the user role */
export enum Roles {
  Admin = 'ADMIN',
  User = 'USER'
}

export type CreatePostMutationMutationVariables = Exact<{
  data: CreatePostInput;
  files: UploadInputArray;
}>;


export type CreatePostMutationMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', body: string, _id: string, createdAt: number, tags: Array<string>, title?: string | null, replyTo?: { __typename?: 'Post', _id: string, authorId: { __typename?: 'User', _id: string } } | null, images?: Array<{ __typename?: 'File', _id: string, secure_url: string, original_filename: string }> | null } };

export type LoginMutationMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthReturnDto', tokenWs: string } };

export type LogoutMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutationMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationMutationVariables = Exact<{
  register: CreateUserInput;
  file: UploadInput;
}>;


export type RegisterMutationMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthReturnDto', tokenWs: string } };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', meQuery: { __typename?: 'User', _id: string, createdAt: number, updatedAt: number, email: string, lastname: string, name: string, role: Roles, username: string, followers: Array<{ __typename?: 'FollowUserDto', followDate: number, _id: string, user: { __typename?: 'User', _id: string, name: string, lastname: string, username: string, profileImg?: { __typename?: 'File', secure_url: string, url: string, _id: string } | null } }>, following: Array<{ __typename?: 'FollowUserDto', followDate: number, _id: string, user: { __typename?: 'User', _id: string, name: string, lastname: string, username: string, profileImg?: { __typename?: 'File', secure_url: string, url: string, _id: string } | null } }>, profileImg?: { __typename?: 'File', _id: string, secure_url: string, url: string } | null } };

export type RotateAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RotateAccessTokenQuery = { __typename?: 'Query', rotateAccessToken: { __typename?: 'AuthReturnDto', tokenWs: string } };


export const CreatePostMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPostMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"files"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadInputArray"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"files"},"value":{"kind":"Variable","name":{"kind":"Name","value":"files"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"original_filename"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePostMutationMutation, CreatePostMutationMutationVariables>;
export const LoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenWs"}}]}}]}}]} as unknown as DocumentNode<LoginMutationMutation, LoginMutationMutationVariables>;
export const LogoutMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutationMutation, LogoutMutationMutationVariables>;
export const RegisterMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"register"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"register"},"value":{"kind":"Variable","name":{"kind":"Name","value":"register"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenWs"}}]}}]}}]} as unknown as DocumentNode<RegisterMutationMutation, RegisterMutationMutationVariables>;
export const MeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followDate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followDate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MeQueryQuery, MeQueryQueryVariables>;
export const RotateAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RotateAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rotateAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenWs"}}]}}]}}]} as unknown as DocumentNode<RotateAccessTokenQuery, RotateAccessTokenQueryVariables>;