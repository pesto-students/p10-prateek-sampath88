import { useState } from "react";
import Todo from "components/todo";

const TodoList = ({ todos }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-start items-center">
        {todos.map(({ id, title, description, isDone }) => {
          return (
            <Todo
              key={id}
              id={id}
              title={title}
              description={description}
              isDone={isDone}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
