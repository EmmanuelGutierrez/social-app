import { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  ignoreNoDocuments: true,
  schema: "http://localhost:3001/graphql",
  //   watch: true,
  documents: [
    "./graphql/queries/*.{ts,tsx,graphql,gql}",
    "./graphql/mutations/*.{ts,tsx,graphql,gql}",
  ],
  generates: {
    "./graphql/types/types.generated.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
    "./graphql/types/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
