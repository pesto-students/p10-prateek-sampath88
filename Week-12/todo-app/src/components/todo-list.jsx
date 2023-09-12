import { useState } from "react";
import Todo from "components/todo";

const TodoList = ({ todos, title }) => {
  return (
    <div className="w-full my-4">
      <div className="flex flex-col justify-start items-center">
        <div className="max-w-[600px] w-full">
          <h5 className="text-[11px] text-[#5f6368] dark:text-[#bbb] font-medium uppercase tracking-[0.8px] m-4 ml-8 mb-1">{title}</h5>
        </div>
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
