let todos = [{ id: 1, content: "First Todo" }];

export const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_: any, { content }: { content: String }) => {
      const newTodo = { id: todos.length + 1, content };
      todos.push(newTodo);
      return newTodo;
    },
  },
};
