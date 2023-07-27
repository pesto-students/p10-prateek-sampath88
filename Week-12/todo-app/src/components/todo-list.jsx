import { useState } from "react";
import Todo from "components/todo";

const TodoList = (props) => {
  const [todoList, setTodoList] = useState([1, 2, 3]);
  return (
    <div>
      <div className="flex flex-col justify-start items-center">
        {todoList.map((todo) => {
          return <Todo key={todo} />;
        })}
      </div>
    </div>
  );
};

export default TodoList;
