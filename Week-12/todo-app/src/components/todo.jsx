const Todo = (props) => {
  return (
    <div className="max-w-[600px] w-full">
      <div className="m-4 mb-0">
        <div className="border border-solid border-[#e0e0e0]  rounded-lg hover:shadow-[0_1px_2px_0_rgba(_60,_64,_67,_0.302),_0_1px_3px_1px_rgba(_60,_64,_67,_0.149)]">
          <div className="">
            <div className="flex flex-col justify-start items-start p-4">
              <h5 className="text-[#202124] text-base font-medium whitespace-pre-wrap break-words mb-2">
                Title
              </h5>
              <p className="text-[#202124] text-sm font-normal whitespace-pre-wrap break-words">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Inventore, porro! Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Recusandae, maxime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Todo;
