import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Todo {
    id: Int!
    content: String!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(content: String!): Todo!
    deleteTodo(id: Int!): Todo!
    editTodo(id: Int!, content: String!): Todo!
  }
`;
