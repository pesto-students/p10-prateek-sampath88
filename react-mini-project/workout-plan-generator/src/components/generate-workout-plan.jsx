import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveForm } from "store/generateWorkoutSlice";
import { camelCaseToTitleCase } from "util/util";

const GenerateWorkoutPlan = () => {
  const formData = useSelector((state) => state.workoutFormData);
  const dispatch = useDispatch();
  const { pathname } = useLocation();


  useEffect(() => {
    //set active form
    // console.log("setActiveForm: ", pathname);
    dispatch(setActiveForm({ activeForm: pathname }));
  }, []);
  return (
    <div className="h-full overflow-auto p-2 pb-48 m-2 n">
      <div className="mb-4">
        <h5 className="text-2xl text-center underline underline-offset-4 font-bold dark:text-blue-400">
          All the details
        </h5>
      </div>
      <div className="grid sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] w-full gap-6   text-gray-900  dark:text-white ">
        {Object.keys(formData).map((key, index) => {
          if (key === "preferredExercises") return null;
          return (
            <div key={`form-${index}`} className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                {camelCaseToTitleCase(key)}
              </dt>
              <dd className="text-lg font-semibold">
                {camelCaseToTitleCase(formData[key]) || (
                  <span className="text-gray-400">NA</span>
                )}
              </dd>
            </div>
          );
        })}
      </div>
      <ul className="mt-6 grid w-full grid-cols-1  sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-6 ">
        {formData.preferredExercises.map((item) => {
          return (
            <li key={`${formData.fitnessGoal}-${item}`}>
              <span
                className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg dark:hover:text-gray-300 dark:border-gray-700  hover:text-gray-600  hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700
                    `}>
                <div className="block flex-1">
                  <div className="w-full  text-3xl font-semibold">
                    <h2 className="text-center capitalize">{item}</h2>
                  </div>
                </div>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GenerateWorkoutPlan;
