import useDebounce from "hooks/use-debounce";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveForm } from "store/generateWorkoutSlice";
import { exercisesMap, updateFormData } from "store/workoutFormSlice.js";

const WorkoutPreferences = () => {
  const formData = useSelector((state) => state.workoutFormData);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // console.debug("formData: ", formData);

  const handleFormChange = useDebounce((event) => {
    let key = event.target.name;
    let value = event.target.value;
    dispatch(updateFormData({ key, value }));
  }, 0);
  const checkHasThisItem = (item) => {
    let preferredExercises = formData.preferredExercises;
    if (preferredExercises.includes(item)) {
      return "peer-checked:border-blue-600 dark:peer-checked:text-gray-300";
    } else {
      return "";
    }
  };
  useEffect(() => {
    //set active form
    dispatch(setActiveForm({ activeForm: pathname }));
  }, []);
  return (
    <div className="h-full overflow-auto p-2 pb-48">
      <div className="m-2 mb-4">
        <h5 className="text-2xl text-center underline underline-offset-4 font-bold dark:text-blue-400">
          Workout Preferences
        </h5>
      </div>
      <form onChange={handleFormChange}>
        <div className="flex flex-col sm:flex-row lg:gap-4">
          <div className="flex-1 m-2 mb-6">
            <label
              htmlFor="fitnessGoal"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Fitness Goal
            </label>
            <select
              id="fitnessGoal"
              name="fitnessGoal"
              defaultValue={formData.fitnessGoal}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled>
                Select Fitness Goal
              </option>
              <option value="muscleBuilding">Muscle Building</option>
              <option value="fatLoss">Fat Loss</option>
              <option value="enduranceImprovement">
                Endurance Improvement
              </option>
              <option value="flexibilityAndMobility">
                Flexibility and Mobility
              </option>
              <option value="functionalStrength">Functional Strength</option>
            </select>
          </div>
          <div className="flex-1 m-2 mb-6">
            <div className="">
              <label
                htmlFor="workoutDuration"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Workout Duration (minutes)
              </label>
              <input
                type="number"
                id="workoutDuration"
                name="workoutDuration"
                defaultValue={formData.workoutDuration}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="eg. 60"
                required
              />
            </div>
          </div>
        </div>
        {formData.fitnessGoal ? (
          <div className="flex flex-col">
            <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
              Choose preferred exercises
            </h3>
            <ul className="grid w-full gap-6 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
              {exercisesMap[formData.fitnessGoal].map((item) => {
                return (
                  <li key={`${formData.fitnessGoal}-${item}`}>
                    <input
                      type="checkbox"
                      id={item}
                      name={`exercise-${formData.fitnessGoal}-${item}`}
                      defaultChecked={checkHasThisItem(item) ? "checked" : ""}
                      value={item}
                      className="hidden peer"
                      required=""
                    />
                    <label
                      htmlFor={item}
                      className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700  hover:text-gray-600  hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700
                      ${checkHasThisItem(item)}`}>
                      <div className="block flex-1">
                        <div className="w-full  text-3xl font-semibold">
                          <h2 className="text-center capitalize">{item}</h2>
                        </div>
                      </div>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default WorkoutPreferences;
