import type { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";

const config: CodegenConfig = {
  // schema: "https://ezxkitaclufybidjpyzk.supabase.co/graphql/v1", // Using the local endpoint, update if needed
  schema: [
    {
      [`${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`]: {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY + "",
        },
      },
    },
  ],
  documents: "app/**/*.tsx",
  overwrite: true,
  ignoreNoDocuments: true,

  generates: {
    "./utils/gql/": {
      preset: "client",
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: [],
      config: {
        scalars: {
          UUID: "string",
          Date: "string",
          Time: "string",
          Datetime: "string",
          JSON: "string",
          BigInt: "string",
          BigFloat: "string",
          Opaque: "any",
        },
      },
    },
  },
  hooks: {
    // afterAllFileWrite: ["npm run prettier"], // optional
  },
};

export default config;
