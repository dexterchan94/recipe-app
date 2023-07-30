import { intArg, nonNull, objectType, queryField, list } from 'nexus';
import { Context } from '../context';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.string('name');
    t.nonNull.string('email');
    t.list.nonNull.field('recipes', {
      type: 'Recipe',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .recipes();
      },
    });
  },
});

export const usersQuery = queryField('users', {
  type: list(nonNull('User')),
  resolve: (_parent, _args, context: Context) => {
    return context.prisma.user.findMany();
  },
});

export const userByIdQuery = queryField('userById', {
  type: 'User',
  args: {
    id: intArg(),
  },
  resolve: (_parent, args, context: Context) => {
    return context.prisma.user.findUnique({
      where: { id: args.id || undefined },
    });
  },
});
