import useDebounce from "hooks/use-debounce";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveForm } from "store/generateWorkoutSlice";
import { updateFormData } from "store/workoutFormSlice.js";

const GeneralInfo = () => {
  const formData = useSelector((state) => state.workoutFormData);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // console.debug("formData: ", formData);
  const handleFormChange = useDebounce((event) => {
    let key = event.target.name;
    let value = event.target.value;
    dispatch(updateFormData({ key, value }));
  }, 200);

  useEffect(() => {
    dispatch(setActiveForm({ activeForm: pathname }));
  }, []);
  return (
    <div className="h-full overflow-auto p-2 pb-48">
      <div className="m-2 mb-4">
        <h5 className="text-2xl text-center underline underline-offset-4 font-bold dark:text-blue-400">General Info</h5>
      </div>
      <form onChange={handleFormChange}>
        <div className="flex flex-col sm:flex-row lg:gap-4">
          <div className="flex-1 m-2 mb-6">
            <div className="">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={formData.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="eg. John"
                required
              />
            </div>
          </div>
          <div className="flex-1 m-2 mb-6">
            <div className="">
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                defaultValue={formData.age}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="eg. 24"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row lg:gap-4">
          <div className="flex-1 m-2 mb-6">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              defaultValue={formData.gender}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-1 m-2 mb-6">
            <label
              htmlFor="fitnessLevel"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Fitness level
            </label>
            <select
              id="fitnessLevel"
              name="fitnessLevel"
              defaultValue={formData.fitnessLevel}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled>
                Select Fitness Level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralInfo;
