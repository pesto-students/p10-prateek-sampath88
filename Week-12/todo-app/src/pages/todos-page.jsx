import Todo from "components/todo";
import TodoInput from "components/todo-input";
import TodoList from "components/todo-list";

const TodosPage = (props) => {
  return (
    <div className="flex flex-col justify-start items-center">
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default TodosPage;
