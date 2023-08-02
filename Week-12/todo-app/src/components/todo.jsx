import { useContext } from "react";
import TickIcon from "./tick";
import { TodosContext } from "pages/todos-page";

const Todo = ({ id, title, description, isDone }) => {
  const { handleComplete } = useContext(TodosContext);
  return (
    <div className="max-w-[600px] w-full todo-item">
      <div className="m-4 mt-1">
        <div className="border border-solid border-[#e0e0e0] dark:border-[#666]  rounded-lg hover:shadow-[0_1px_2px_0_rgba(_60,_64,_67,_0.302),_0_1px_3px_1px_rgba(_60,_64,_67,_0.149)]">
          <div className="flex">
            <div className="flex-1 flex flex-col justify-start items-start p-4">
              {title ? (
                <h5 className="text-[#202124] dark:text-[#e8e8e8] text-base font-medium whitespace-pre-wrap break-words mb-2">
                  {title}
                </h5>
              ) : null}

              <p className="text-[#202124] dark:text-[#e8e8e8] text-sm font-normal whitespace-pre-wrap break-words">
                {description}
              </p>
            </div>
            <div className={`mt-2 mr-2 checkbox ${isDone ? "" : "hidden"}`}>
              <div className="flex" onClick={() => handleComplete(id)}>
                {isDone ? (
                  <div className="w-6 h-6 flex justify-center items-center overflow-hidden cursor-pointer text-[#0652d7]">
                    <TickIcon />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-[2px] border-solid border-[#888] cursor-pointer"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Todo;
