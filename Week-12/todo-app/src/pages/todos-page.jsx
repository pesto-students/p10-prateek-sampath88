import TodoInput from "components/todo-input";
import TodoList from "components/todo-list";
import useLocalStorage from "hooks/use-local-storage";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const TodosContext = createContext(null);

const TodosPage = (props) => {
  const [todos, dispatch] = useLocalStorage("todos", []);
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
  return (
    <TodosContext.Provider value={{ handleComplete }}>
      <div className="flex flex-col justify-start items-center">
        <TodoInput onBlur={addTodo} />
        <TodoList todos={todos} />
      </div>
    </TodosContext.Provider>
  );
};

export default TodosPage;
