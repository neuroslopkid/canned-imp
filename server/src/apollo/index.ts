import { ApolloServer } from "@apollo/server";
import type { ImpDoc } from "@models/imp.model.js";
import { createImpsByCount, getAllImps, getImpByName } from "@services/imp.service.js";

const typeDefs = `#graphql
  type Imp {
    id: ID!
    name: String!
  }

  type Query {
    imps: [Imp!]!
    imp(name: String!): Imp
  }

  type Mutation {
    createImps(count: Int!): Boolean
  }
`;

const resolvers = {
  Imp: {
    id: (imp: ImpDoc) => imp._id.toString(),
  },
  Query: {
    imps: () => getAllImps(),
    imp: (_parent: any, args: { name: string }) => getImpByName(args.name),
  },
  Mutation: {
    createImps: (_parent: any, args: { count: number }) => createImpsByCount(args.count),
  },
};

export const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
