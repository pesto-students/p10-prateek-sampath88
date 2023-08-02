import TodoInput from "components/todo-input";
import TodoList from "components/todo-list";
import useLocalStorage from "hooks/use-local-storage";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TodosContext = createContext(null);

const TodosPage = (props) => {
  const [todos, dispatch] = useLocalStorage("todos", []);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const addTodo = (payload) => {
    dispatch((prevState) => {
      payload["id"] = uuidv4();
      payload["isDone"] = false;
      return [...prevState, payload];
    });
  };
  const handleComplete = (id) => {
    let index = todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      const payload = todos[index];
      payload["isDone"] = !payload["isDone"];
      todos.splice(index, 1, payload);
      dispatch([...todos]);
    }
  };
  useEffect(() => {
    console.log(todos);
    const { completed, pending } = todos.reduce(
      (acc, curr) => {
        console.log(acc);
        if (curr.isDone) {
          acc.completed.push(curr);
        } else {
          acc.pending.push(curr);
        }
        return acc;
      },
      { completed: [], pending: [] },
    );

    setCompletedTodos(completed);
    setPendingTodos(pending);
  }, [todos]);
  return (
    <TodosContext.Provider value={{ handleComplete }}>
      <div className="flex flex-col justify-start items-center h-full">
        <div className="m-8 text-5xl font-bold text-[#2d2e2f] dark:text-[#ccc]">
          <h1>Take a note</h1>
        </div>
        <TodoInput onBlur={addTodo} />
        <div className="overflow-auto w-full scrollbar">
          {completedTodos.length ? (
            <TodoList todos={completedTodos} title={"Completed"} />
          ) : null}
          {pendingTodos.length ? (
            <TodoList todos={pendingTodos} title={"Todos"} />
          ) : null}
          <div className="spacer py-32"></div>
        </div>
      </div>
    </TodosContext.Provider>
  );
};

export default TodosPage;
