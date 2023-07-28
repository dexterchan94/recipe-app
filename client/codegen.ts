
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../server/schema.graphql",
  documents: "./queries/*.graphql",
  generates: {
    "./queries/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-query"],
      config: {
        fetcher: {
          func: "./fetcher#fetcher"
        },
        exposeDocument: true,
        exposeQueryKeys: true,
        errorType: 'Error'
      },
    },
  },
};

export default config;
