import {
  intArg,
  nonNull,
  objectType,
  queryField,
  list,
  mutationField,
  arg,
  inputObjectType,
} from 'nexus';
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
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context: Context) => {
    return context.prisma.user.findUnique({
      where: { id: args.id },
    });
  },
});

export const createUser = mutationField('createUser', {
  type: 'User',
  args: {
    data: nonNull(
      arg({
        type: 'CreateUserInput',
      }),
    ),
  },
  resolve: (_, args, context: Context) => {
    return context.prisma.user.create({
      data: {
        email: args.data.email,
        name: args.data.name || undefined,
      },
    });
  },
});

export const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('email');
    t.string('name');
  },
});

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    data: nonNull(
      arg({
        type: 'UpdateUserInput',
      }),
    ),
    id: nonNull(intArg()),
  },
  resolve: (_, args, context: Context) => {
    return context.prisma.user.update({
      where: { id: args.id },
      data: {
        name: args.data.name || undefined,
      },
    });
  },
});

export const UpdateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  definition(t) {
    t.string('name');
  },
});

export const deleteUser = mutationField('deleteUser', {
  type: 'User',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, context: Context) => {
    return context.prisma.user.delete({
      where: { id: args.id },
    });
  },
});
