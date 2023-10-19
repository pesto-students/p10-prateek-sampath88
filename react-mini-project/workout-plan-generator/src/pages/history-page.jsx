import WorkoutPlan from "components/workout-plan";
import { useState } from "react";
import { useSelector } from "react-redux";

const HistoryPage = () => {
  const { history } = useSelector((state) => state.workoutPlan);
  const [activeItem, setActiveItem] = useState(0);
  console.log("activePlan:HOME ", history);

  const toggleActiveItem = (index) => {
    if (index === activeItem) return setActiveItem(-1);
    return setActiveItem(index);
  };
  return (
    <div className="flex flex-col h-full">
      <div className="m-4 mt-8 h-full overflow-auto">
        <div className="mt-8">
          <h3 className="text-3xl text-center font-bold dark:text-white">
            Your workout plans history
          </h3>
        </div>
        <div className="max-w-3xl mx-auto text-white mt-6">
          <div>
            <div id="accordion-collapse" data-accordion="collapse">
              {history.length
                ? history.map((plan, index) => {
                    return (
                      <div className="mb-5" key={plan.id}>
                        <h2 id={`accordion-collapse-heading-${index}`}>
                          <button
                            type="button"
                            onClick={() => toggleActiveItem(index)}
                            className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border  border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            data-accordion-target={`#accordion-collapse-body-${index}`}
                            aria-expanded={`${
                              activeItem === index ? "true" : "false"
                            }`}
                            aria-controls="accordion-collapse-body-1">
                            <span>{plan.workoutData.overview}</span>
                            <svg
                              data-accordion-icon
                              className={`w-3 h-3 ${
                                activeItem === index
                                  ? "rotate-0"
                                  : "rotate-180"
                              } shrink-0`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6">
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                              />
                            </svg>
                          </button>
                        </h2>
                        <div
                          id="accordion-collapse-body-1"
                          className={`${activeItem === index ? "" : "hidden"}`}
                          aria-labelledby="accordion-collapse-heading-1">
                          <div className="p-5 border  border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <div className="grid gap-4 mx-4 sm:grid-cols-12">
                              <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                                <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:dark:bg-gray-700">
                                  {plan.workoutData.days.map((item) => {
                                    return (
                                      <div
                                        key={item.day}
                                        className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:dark:bg-violet-400">
                                        <h3 className="text-xl font-semibold tracki">
                                          {item.day}
                                        </h3>
                                        <p className="mt-3 text-gray-400 font-normal">
                                          {item.describe}
                                        </p>
                                        <div>
                                          <ul className="ml-6">
                                            {item.steps.map((step, index) => {
                                              return (
                                                <li
                                                  key={item.day + index}
                                                  className="mt-3 list-disc">
                                                  {step}
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
