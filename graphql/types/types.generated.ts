import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
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
  login: Scalars['String']['output'];
  register: Scalars['String']['output'];
  updatePost: Post;
  updateReaction: Post;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
  files?: InputMaybe<Array<Scalars['Upload']['input']>>;
};


export type MutationFollowUserArgs = {
  userToFollowId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
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

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  followers: Array<FollowUserDto>;
  following: Array<FollowUserDto>;
  lastname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  profileImg?: Maybe<File>;
  refreshTokenHash: Scalars['String']['output'];
  role: Roles;
  username: Scalars['String']['output'];
};

/** Indicates the user role */
export enum Roles {
  Admin = 'ADMIN',
  User = 'USER'
}

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', meQuery: { __typename?: 'User', _id: string, email: string, lastname: string, name: string, role: Roles, username: string, followers: Array<{ __typename?: 'FollowUserDto', followDate: number, _id: string, user: { __typename?: 'User', _id: string, name: string, lastname: string, username: string, profileImg?: { __typename?: 'File', secure_url: string, url: string, _id: string } | null } }>, following: Array<{ __typename?: 'FollowUserDto', followDate: number, _id: string, user: { __typename?: 'User', _id: string, name: string, lastname: string, username: string, profileImg?: { __typename?: 'File', secure_url: string, url: string, _id: string } | null } }>, profileImg?: { __typename?: 'File', _id: string, secure_url: string, url: string } | null } };


export const MeQueryDocument = gql`
    query MeQuery {
  meQuery {
    _id
    email
    followers {
      followDate
      user {
        _id
        name
        lastname
        profileImg {
          secure_url
          url
          _id
        }
        username
      }
      _id
    }
    following {
      followDate
      user {
        _id
        name
        lastname
        profileImg {
          secure_url
          url
          _id
        }
        username
      }
      _id
    }
    lastname
    name
    profileImg {
      _id
      secure_url
      url
    }
    role
    username
  }
}
    `;

/**
 * __useMeQueryQuery__
 *
 * To run a query within a React component, call `useMeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQueryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, options);
      }
export function useMeQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, options);
        }
export function useMeQuerySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, options);
        }
export type MeQueryQueryHookResult = ReturnType<typeof useMeQueryQuery>;
export type MeQueryLazyQueryHookResult = ReturnType<typeof useMeQueryLazyQuery>;
export type MeQuerySuspenseQueryHookResult = ReturnType<typeof useMeQuerySuspenseQuery>;
export type MeQueryQueryResult = ApolloReactCommon.QueryResult<MeQueryQuery, MeQueryQueryVariables>;