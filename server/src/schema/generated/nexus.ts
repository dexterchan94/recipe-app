/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../../context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateRecipeInput: { // input type
    title: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  Recipe: { // root type
    authorId: number; // Int!
    id: number; // Int!
    title: string; // String!
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createRecipe: NexusGenRootTypes['Recipe'] | null; // Recipe
    deleteRecipe: NexusGenRootTypes['Recipe'] | null; // Recipe
  }
  Query: { // field return type
    recipeById: NexusGenRootTypes['Recipe'] | null; // Recipe
    recipes: NexusGenRootTypes['Recipe'][] | null; // [Recipe!]
    userById: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['User'][] | null; // [User!]
  }
  Recipe: { // field return type
    authorId: number; // Int!
    id: number; // Int!
    title: string; // String!
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string | null; // String
    recipes: NexusGenRootTypes['Recipe'][] | null; // [Recipe!]
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createRecipe: 'Recipe'
    deleteRecipe: 'Recipe'
  }
  Query: { // field return type name
    recipeById: 'Recipe'
    recipes: 'Recipe'
    userById: 'User'
    users: 'User'
  }
  Recipe: { // field return type name
    authorId: 'Int'
    id: 'Int'
    title: 'String'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    recipes: 'Recipe'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createRecipe: { // args
      authorId: number; // Int!
      data: NexusGenInputs['CreateRecipeInput']; // CreateRecipeInput!
    }
    deleteRecipe: { // args
      id: number; // Int!
    }
  }
  Query: {
    recipeById: { // args
      id?: number | null; // Int
    }
    userById: { // args
      id?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}