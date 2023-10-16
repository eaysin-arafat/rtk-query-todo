import { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, complated: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo" className="text-sm font-semibold">
        Enter a new todo item
      </label>
      <div className="">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          className="outline-none text-green-500 h-3"
        />
      </div>
      <button className="font-semibold border border-green-500 rounded-md p-1 mt-2 text-sm">
        Submit
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <article key={todo.id} className="flex justify-between gap-4">
          <div className="flex justify-center items-center gap-2">
            <input
              type="checkbox"
              checked={todo.complated}
              id={todo.id}
              onChange={() =>
                updateTodo({ ...todo, complated: !todo.complated })
              }
              className="cursor-pointer"
            />
            <label
              htmlFor={todo.id}
              className="text-lg  font-semibold font-sans"
            >
              {todo.title}
            </label>
          </div>
          <button
            className="font-semibold border border-red-500 rounded-md p-1 mt-2 text-sm"
            onClick={() => deleteTodo(todo)}
          >
            Delete
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section className="my-3">
      <h1 className="font-serif text-center font-semibold text-lg">
        Todo List
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2">
          {newItemSection}
          {content}
        </div>
      </div>
    </section>
  );
};

export default TodoList;
