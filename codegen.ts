import { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  ignoreNoDocuments: true,
  schema: "http://localhost:3001/graphql",
  //   watch: true,
  documents: ["./graphql/queries/*.{ts,tsx,graphql,gql}"],
  generates: {
    "./graphql/types/types.generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        wuthHooks: true,
        apolloReactCommonImportFrom:"@apollo/client/react",
        apolloReactHooksImportFrom:"@apollo/client/react"
      },
    },
    // "./graphql/types/": {
    //   preset: "client",
    //   config: { documentMode: true },
    //   presetConfig: {
    //     gqlTagName: "gql",
    //   },
    // },
  },
};

export default config;
