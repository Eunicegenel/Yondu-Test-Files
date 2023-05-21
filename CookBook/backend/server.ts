import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import fs from 'fs';

const app = express();

const server = new ApolloServer({
  typeDefs: fs.readFileSync('backend/graphql/schema.graphql', 'utf-8'),
  resolvers,
});

server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});