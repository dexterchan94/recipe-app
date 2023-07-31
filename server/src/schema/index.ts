import { makeSchema } from 'nexus';
import path from 'path';
import * as types from './types';

export const schema = makeSchema({
  types,
  // shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  contextType: {
    module: path.join(__dirname, '../context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
