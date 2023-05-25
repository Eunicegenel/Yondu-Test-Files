let todos = [{ id: 1, title:"Test", content: "First Todo" }];

export const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_: any, { title, content }: { title: string, content: string }) => {
      const newTodo = { id: todos.length + 1, title, content };
      todos.push(newTodo);
      return newTodo;
    },
    deleteTodo: (_: any, { id }: { id: number }) => {
      const todoToDelete = todos.find((todo) => todo.id === id);
      todos = todos.filter((todo) => todo.id !== id);
      return todoToDelete;
    },
    editTodo: (_: any, { id, title, content }: { id: number; title: string, content: string }) => {
      let updatedTodo;
      todos = todos.map((todo) => {
        if (todo.id === id) {
          updatedTodo = { ...todo, title: title, content: content };
          return updatedTodo;
        }
        return todo;
      });
      return updatedTodo;
    },
  },
};
