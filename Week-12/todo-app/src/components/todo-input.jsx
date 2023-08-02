import { useEffect, useRef, useState } from "react";

const TodoInput = ({ onBlur }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  const focusHandler = (e) => {
    const hasFocus = document.activeElement === inputRef.current;
    if (hasFocus && !isExpanded) {
      inputRef.current.placeholder = "Title";
      setIsExpanded(true);
      textAreaRef.current.focus();
    }
  };

  const handleNote = () => {
    const title = inputRef.current.value;
    const description = textAreaRef.current.innerText;
    if (!title && !description) return;
    const payload = {
      title,
      description,
    };
    console.log(payload);
    onBlur(payload);
  };
  const cleanUp = () => {
    inputRef.current.value = "";
    textAreaRef.current.innerText = "";
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const hasFocusOnInput =
        inputRef.current && inputRef.current.contains(event.target);
      const hasFocusOnTextArea =
        textAreaRef.current && textAreaRef.current.contains(event.target);
      //   console.log("hasFocusOnInput: ", hasFocusOnInput);
      //   console.log("hasFocusOnTextArea: ", hasFocusOnTextArea);
      if (!hasFocusOnInput && !hasFocusOnTextArea) {
        setIsExpanded(false);
        inputRef.current.placeholder = "Take a note...";
        handleNote();
        cleanUp();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className="max-w-[600px] w-full">
      <div className="m-4">
        <div
          style={{ maxHeight: isExpanded ? "unset" : "48px" }}
          className={`border dark:border-[#666] overflow-hidden rounded-lg min-h-[48px]  shadow-[0_1px_2px_0_rgba(_60,_64,_67,_0.302),_0_2px_6px_2px_rgba(_60,_64,_67,_0.149)] dark:shadow-none`}>
          <div>
            <input
              type="text"
              placeholder="Take a note..."
              ref={inputRef}
              onFocus={(e) => focusHandler(e)}
              className="w-full py-3 px-4 outline-none text-base font-medium text-[#202124] dark:text-[#ddd] placeholder:text-[#666666] dark:placeholder:text-[#aaa] dark:bg-[#202124]" 
            />
          </div>
          <div>
            <div
              contentEditable="true"
              ref={textAreaRef}
              placeholder="Take a note..."
              className="w-full min-h-[40px] max-h-[300px] overflow-auto py-3 px-4 outline-none text-sm font-normal text-[#202124] dark:text-[#ddd] cursor-text before:content-[''] before:text-[#555555] dark:before:text-[#ddd] empty:before:content-[attr(placeholder)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
