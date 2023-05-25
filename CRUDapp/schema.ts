import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Todo {
    id: Int!
    title: String!
    content: String!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!, content: String!): Todo!
    deleteTodo(id: Int!): Todo!
    editTodo(id: Int!, title: String!, content: String!): Todo!
  }
`;
