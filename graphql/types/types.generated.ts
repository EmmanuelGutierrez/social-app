export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  dislikePost: RactPostReturnDto;
  followUser: Scalars['Boolean']['output'];
  likePost: RactPostReturnDto;
  login: AuthReturnDto;
  logout: Scalars['Boolean']['output'];
  register: AuthReturnDto;
  updatePost: Post;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
  files: UploadInputArray;
};


export type MutationDislikePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationFollowUserArgs = {
  userToFollowId: Scalars['String']['input'];
};


export type MutationLikePostArgs = {
  id: Scalars['String']['input'];
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

export type MyFeedPostDataReturnDto = {
  __typename?: 'MyFeedPostDataReturnDto';
  data: Array<OnePostReturnDto>;
  hasMore: Scalars['Boolean']['output'];
  inDb: Scalars['Float']['output'];
  inThisPage: Scalars['Float']['output'];
  nextCursor?: Maybe<Scalars['Float']['output']>;
};

export type OnePostReturnDto = {
  __typename?: 'OnePostReturnDto';
  iLiked: Scalars['Boolean']['output'];
  likeCount: Scalars['Float']['output'];
  post: Post;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID']['output'];
  authorId: User;
  body: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  images?: Maybe<Array<File>>;
  reactionsCount: Scalars['Float']['output'];
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
  getOne: OnePostReturnDto;
  meQuery: User;
  myFeed: MyFeedPostDataReturnDto;
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


export type QueryMyFeedArgs = {
  params: FilterFeedPostInput;
};

export type RactPostReturnDto = {
  __typename?: 'RactPostReturnDto';
  ignored: Scalars['Boolean']['output'];
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

export type DislikePostMutationVariables = Exact<{
  dislikePostId: Scalars['String']['input'];
}>;


export type DislikePostMutation = { __typename?: 'Mutation', dislikePost: { __typename?: 'RactPostReturnDto', ignored: boolean } };

export type LikePostMutationVariables = Exact<{
  likePostId: Scalars['String']['input'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'RactPostReturnDto', ignored: boolean } };

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

export type MyFeedQueryVariables = Exact<{
  params: FilterFeedPostInput;
}>;


export type MyFeedQuery = { __typename?: 'Query', myFeed: { __typename?: 'MyFeedPostDataReturnDto', inThisPage: number, hasMore: boolean, inDb: number, nextCursor?: number | null, data: Array<{ __typename?: 'OnePostReturnDto', iLiked: boolean, post: { __typename?: 'Post', _id: string, reactionsCount: number, body: string, createdAt: number, tags: Array<string>, title?: string | null, authorId: { __typename?: 'User', _id: string, username: string, name: string, lastname: string, profileImg?: { __typename?: 'File', _id: string, secure_url: string, public_id: string } | null }, images?: Array<{ __typename?: 'File', _id: string, public_id: string, secure_url: string }> | null } }> } };

export type RotateAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RotateAccessTokenQuery = { __typename?: 'Query', rotateAccessToken: { __typename?: 'AuthReturnDto', tokenWs: string } };
