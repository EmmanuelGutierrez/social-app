/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation createPostMutation($data: CreatePostInput!, $files: UploadInputArray!) {\n  createPost(data: $data, files: $files) {\n    body\n    _id\n    createdAt\n    tags\n    title\n    replyTo {\n      _id\n      authorId {\n        _id\n      }\n    }\n    images {\n      _id\n      secure_url\n      original_filename\n    }\n  }\n}": typeof types.CreatePostMutationDocument,
    "mutation DislikePost($dislikePostId: String!) {\n  dislikePost(id: $dislikePostId) {\n    ignored\n  }\n}": typeof types.DislikePostDocument,
    "mutation LikePost($likePostId: String!) {\n  likePost(id: $likePostId) {\n    ignored\n  }\n}": typeof types.LikePostDocument,
    "mutation LoginMutation($loginInput: LoginInput!) {\n  login(loginInput: $loginInput) {\n    tokenWs\n  }\n}": typeof types.LoginMutationDocument,
    "mutation LogoutMutation {\n  logout\n}": typeof types.LogoutMutationDocument,
    "mutation registerMutation($register: CreateUserInput!, $file: UploadInput!) {\n  register(register: $register, file: $file) {\n    tokenWs\n  }\n}": typeof types.RegisterMutationDocument,
    "query MeQuery {\n  meQuery {\n    _id\n    createdAt\n    updatedAt\n    email\n    followers {\n      followDate\n      user {\n        _id\n        name\n        lastname\n        profileImg {\n          secure_url\n          url\n          _id\n        }\n        username\n      }\n      _id\n    }\n    following {\n      followDate\n      user {\n        _id\n        name\n        lastname\n        profileImg {\n          secure_url\n          url\n          _id\n        }\n        username\n      }\n      _id\n    }\n    lastname\n    name\n    profileImg {\n      _id\n      secure_url\n      url\n    }\n    role\n    username\n  }\n}": typeof types.MeQueryDocument,
    "query MyFeed($params: FilterFeedPostInput!) {\n  myFeed(params: $params) {\n    inThisPage\n    hasMore\n    inDb\n    nextCursor\n    data {\n      iLiked\n      post {\n        _id\n        reactionsCount\n        authorId {\n          _id\n          username\n          name\n          lastname\n          profileImg {\n            _id\n            secure_url\n            public_id\n          }\n        }\n        body\n        createdAt\n        images {\n          _id\n          public_id\n          secure_url\n        }\n        tags\n        title\n      }\n    }\n  }\n}": typeof types.MyFeedDocument,
    "query RotateAccessToken {\n  rotateAccessToken {\n    tokenWs\n  }\n}": typeof types.RotateAccessTokenDocument,
};
const documents: Documents = {
    "mutation createPostMutation($data: CreatePostInput!, $files: UploadInputArray!) {\n  createPost(data: $data, files: $files) {\n    body\n    _id\n    createdAt\n    tags\n    title\n    replyTo {\n      _id\n      authorId {\n        _id\n      }\n    }\n    images {\n      _id\n      secure_url\n      original_filename\n    }\n  }\n}": types.CreatePostMutationDocument,
    "mutation DislikePost($dislikePostId: String!) {\n  dislikePost(id: $dislikePostId) {\n    ignored\n  }\n}": types.DislikePostDocument,
    "mutation LikePost($likePostId: String!) {\n  likePost(id: $likePostId) {\n    ignored\n  }\n}": types.LikePostDocument,
    "mutation LoginMutation($loginInput: LoginInput!) {\n  login(loginInput: $loginInput) {\n    tokenWs\n  }\n}": types.LoginMutationDocument,
    "mutation LogoutMutation {\n  logout\n}": types.LogoutMutationDocument,
    "mutation registerMutation($register: CreateUserInput!, $file: UploadInput!) {\n  register(register: $register, file: $file) {\n    tokenWs\n  }\n}": types.RegisterMutationDocument,
    "query MeQuery {\n  meQuery {\n    _id\n    createdAt\n    updatedAt\n    email\n    followers {\n      followDate\n      user {\n        _id\n        name\n        lastname\n        profileImg {\n          secure_url\n          url\n          _id\n        }\n        username\n      }\n      _id\n    }\n    following {\n      followDate\n      user {\n        _id\n        name\n        lastname\n        profileImg {\n          secure_url\n          url\n          _id\n        }\n        username\n      }\n      _id\n    }\n    lastname\n    name\n    profileImg {\n      _id\n      secure_url\n      url\n    }\n    role\n    username\n  }\n}": types.MeQueryDocument,
    "query MyFeed($params: FilterFeedPostInput!) {\n  myFeed(params: $params) {\n    inThisPage\n    hasMore\n    inDb\n    nextCursor\n    data {\n      iLiked\n      post {\n        _id\n        reactionsCount\n        authorId {\n          _id\n          username\n          name\n          lastname\n          profileImg {\n            _id\n            secure_url\n            public_id\n          }\n        }\n        body\n        createdAt\n        images {\n          _id\n          public_id\n          secure_url\n        }\n        tags\n        title\n      }\n    }\n  }\n}": types.MyFeedDocument,
    "query RotateAccessToken {\n  rotateAccessToken {\n    tokenWs\n  }\n}": types.RotateAccessTokenDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createPostMutation($data: CreatePostInput!, $files: UploadInputArray!) {\n  createPost(data: $data, files: $files) {\n    body\n    _id\n    createdAt\n    tags\n    title\n    replyTo {\n      _id\n      authorId {\n        _id\n      }\n    }\n    images {\n      _id\n      secure_url\n      original_filename\n    }\n  }\n}"): (typeof documents)["mutation createPostMutation($data: CreatePostInput!, $files: UploadInputArray!) {\n  createPost(data: $data, files: $files) {\n    body\n    _id\n    createdAt\n    tags\n    title\n    replyTo {\n      _id\n      authorId {\n        _id\n      }\n    }\n    images {\n      _id\n      secure_url\n      original_filename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DislikePost($dislikePostId: String!) {\n  dislikePost(id: $dislikePostId) {\n    ignored\n  }\n}"): (typeof documents)["mutation DislikePost($dislikePostId: String!) {\n  dislikePost(id: $dislikePostId) {\n    ignored\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation LikePost($likePostId: String!) {\n  likePost(id: $likePostId) {\n    ignored\n  }\n}"): (typeof documents)["mutation LikePost($likePostId: String!) {\n  likePost(id: $likePostId) {\n    ignored\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation LoginMutation($loginInput: LoginInput!) {\n  login(loginInput: $loginInput) {\n    tokenWs\n  }\n}"): (typeof documents)["mutation LoginMutation($loginInput: LoginInput!) {\n  login(loginInput: $loginInput) {\n    tokenWs\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation LogoutMutation {\n  logout\n}"): (typeof documents)["mutation LogoutMutation {\n  logout\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation registerMutation($register: CreateUserInput!, $file: UploadInput!) {\n  register(register: $register, file: $file) {\n    tokenWs\n  }\n}"): (typeof documents)["mutation registerMutation($register: CreateUserInput!, $file: UploadInput!) {\n  register(register: $register, file: $file) {\n    tokenWs\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query MeQuery {\n  meQuery {\n    _id\n    createdAt\n    updatedAt\n    email\n    followers {\n      followDate\n      user {\n        _id\n        name\n        lastname\n        profileImg {\n          secure_url\n          url\n          _id\n        }\n        username\n      }\n      _id\n    }\n    following {\n      followDate\n      user {\n        _id\n        name\n        lastname\n        profileImg {\n          secure_url\n          url\n          _id\n        }\n        username\n      }\n      _id\n    }\n    lastname\n    name\n    profileImg {\n      _id\n      secure_url\n      url\n    }\n    role\n    username\n  }\n}"): (typeof documents)["query MeQuery {\n  meQuery {\n    _id\n    createdAt\n    updatedAt\n    email\n    followers {\n      followDate\n      user {\n        _id\n        name\n        lastname\n        profileImg {\n          secure_url\n          url\n          _id\n        }\n        username\n      }\n      _id\n    }\n    following {\n      followDate\n      user {\n        _id\n        name\n        lastname\n        profileImg {\n          secure_url\n          url\n          _id\n        }\n        username\n      }\n      _id\n    }\n    lastname\n    name\n    profileImg {\n      _id\n      secure_url\n      url\n    }\n    role\n    username\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query MyFeed($params: FilterFeedPostInput!) {\n  myFeed(params: $params) {\n    inThisPage\n    hasMore\n    inDb\n    nextCursor\n    data {\n      iLiked\n      post {\n        _id\n        reactionsCount\n        authorId {\n          _id\n          username\n          name\n          lastname\n          profileImg {\n            _id\n            secure_url\n            public_id\n          }\n        }\n        body\n        createdAt\n        images {\n          _id\n          public_id\n          secure_url\n        }\n        tags\n        title\n      }\n    }\n  }\n}"): (typeof documents)["query MyFeed($params: FilterFeedPostInput!) {\n  myFeed(params: $params) {\n    inThisPage\n    hasMore\n    inDb\n    nextCursor\n    data {\n      iLiked\n      post {\n        _id\n        reactionsCount\n        authorId {\n          _id\n          username\n          name\n          lastname\n          profileImg {\n            _id\n            secure_url\n            public_id\n          }\n        }\n        body\n        createdAt\n        images {\n          _id\n          public_id\n          secure_url\n        }\n        tags\n        title\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query RotateAccessToken {\n  rotateAccessToken {\n    tokenWs\n  }\n}"): (typeof documents)["query RotateAccessToken {\n  rotateAccessToken {\n    tokenWs\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;