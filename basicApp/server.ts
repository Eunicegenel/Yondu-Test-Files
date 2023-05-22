import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';

const tasks = [
  { id: '1', title: 'Task 1', description: 'Description for Task 1' },
  { id: '2', title: 'Task 2', description: 'Description for Task 2' },
];

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    tasks: {
      type: GraphQLList(TaskType),
      resolve: () => tasks,
    },
  },
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { title, description }) => {
        const newTask = {
          id: String(tasks.length + 1),
          title,
          description,
        };
        tasks.push(newTask);
        return newTask;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});
