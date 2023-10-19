import Form from "components/form";
import TickIcon from "components/icons/tick";
import Loader from "components/loader";
import useLocalStorage from "hooks/use-local-storage";
import OpenAI from "openai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { addPlan, setActivePlan } from "store/workoutPlansSlice";
import { checkHasEmptyValues } from "util/util";
import { v4 as uuidv4 } from "uuid";

//add form step routes here
const formSteps = [
  "general-info",
  "workout-preferences",
  "generate-workout-plan"
];

const GenerateWorkout = () => {
  const formData = useSelector((state) => state.workoutFormData);
  const { activeForm } = useSelector((state) => state.generateWorkout);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [workoutPlans, setWorkoutPlans] = useLocalStorage("workout-plans", []);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, //
    dangerouslyAllowBrowser: true
  });
  const handleGenerate = async (e) => {
    e.preventDefault();
    const prompt = createPromt();
    setLoading(true);
    const schema = {
      type: "object",
      properties: {
        overview: {
          type: "string",
          description: "Give some brief about the workout plan and health gains"
        },
        days: {
          type: "array",
          description: "Get the 7 days of workout plan",
          items: {
            type: "object",
            properties: {
              day: {
                type: "string",
                description: "Day of the workout"
              },
              describe: {
                type: "string",
                description: "Small description about the workout"
              },
              steps: {
                type: "array",
                description: "Give step by step plan for that day",
                items: {
                  type: "string",
                  description: "Tell what to do"
                }
              }
            }
          }
        },
        tips: {
          type: "array",
          description: "Give some final tips and do's do not's",
          items: {
            type: "object",
            properties: {
              tip: {
                type: "string"
              }
            }
          }
        }
      },
      required: ["overview", "days", "tips"]
    };

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful workout mentor." },
          { role: "user", content: prompt }
        ],
        functions: [{ name: "workout_plan", parameters: schema }],
        function_call: { name: "workout_plan" }
      });
      console.log("res: ", completion);
      let data = parseOpenAiResponse(completion);
      if (!data.overview) return;
      let plan = {
        id: uuidv4(),
        workoutData: data
      };
      storeIt(plan);
      dispatch(setActivePlan({ activePlan: plan }));
      dispatch(addPlan({ newPlan: plan }));
      console.log("workoutPlans: ", workoutPlans);
      debugger;
      navigate("/home");
    } catch (e) {
      console.log("something went wront: ", e);
    }
    setLoading(false);
  };

  const storeIt = (plan) => {
    setWorkoutPlans((prevState) => {
      return [...prevState, { ...plan }];
    });
  };

  const parseOpenAiResponse = (res) => {
    let parsedResponse = {};
    try {
      let result = res.choices[0].message.function_call.arguments;
      parsedResponse = JSON.parse(result);
    } catch (error) {
      console.error("Something went wrong, while parsing the response!");
      console.error("[ERROR] ", error);
    }
    return parsedResponse;
  };

  const createPromt = () => {
    let payload = {
      age: formData.age,
      gender: formData.gender,
      fitnessLevel: formData.fitnessLevel,
      fitnessGoal: formData.fitnessGoal,
      workoutDuration: `${formData.workoutDuration} minutes`,
      preferredExercises: formData.preferredExercises
    };
    let prompt = `Generate a Week workout plan for below preferences
      {
        age:${payload.age},
        gender:${payload.gender},
        fitnessLevel:${payload.fitnessLevel},
        fitnessGoal:${payload.fitnessGoal},
        workoutDuration:${payload.workoutDuration},
        preferredExercises:${payload.preferredExercises}
      }
      Give it in a descriptive manner. 
      Generate for whole week
      `;
    return prompt;
  };

  const isIncompleteForm = () => {
    let { age, gender, fitnessLevel, workoutDuration, fitnessGoal } = formData;
    if (
      checkHasEmptyValues([
        age,
        gender,
        fitnessLevel,
        workoutDuration,
        fitnessGoal
      ])
    ) {
      return true;
    }
    return false;
  };

  const handleFormNavigation = (route) => {
    navigate(route);
  };
  const checkGeneralInfoFilled = () => {
    let { age, gender, fitnessLevel } = formData;
    let result = checkHasEmptyValues([age, gender, fitnessLevel]);
    if (result) return false;
    return true;
  };
  const checkWorkoutPreferencesFilled = () => {
    let { workoutDuration, fitnessGoal } = formData;
    let result = checkHasEmptyValues([workoutDuration, fitnessGoal]);
    if (result) return false;
    return true;
  };

  const handleFormStep = (step) => {
    let index = formSteps.indexOf(activeForm);
    if (step === "NEXT" && index < formSteps.length - 1) {
      handleFormNavigation(formSteps[index + 1]);
    }
    if (step === "PREV" && index >= 1) {
      handleFormNavigation(formSteps[index - 1]);
    }
  };
  return (
    <div className="flex flex-col h-full">
      {loading ? (
        <Loader>
          <div className="flex flex-col justify-center items-center">
            <span>Generating...</span>
            <div>
              <span>It may take few seconds!</span>
            </div>
          </div>
        </Loader>
      ) : null}
      <div className="flex justify-center p-2 py-8">
        <h3 className="text-4xl font-bold dark:text-white">
          Generate Workout Plan
        </h3>
      </div>
      <div className="flex h-full">
        <div className="sidebar w-[360px] hidden lg:block p-4 pl-8  border-r border-gray-400">
          <ol className="relative ">
            <li
              onClick={() => handleFormNavigation("general-info")}
              className={`border-l p-1 pt-0 ${
                checkGeneralInfoFilled()
                  ? "border-[#00ba79]"
                  : "border-gray-700"
              }  cursor-pointer`}>
              <div className="flex flex-col mb-10 ml-6">
                <span
                  className={`absolute flex items-center justify-center w-6 h-6  rounded-full -left-3  ${
                    checkGeneralInfoFilled()
                      ? "text-[#00ba79]"
                      : "text-gray-400"
                  }`}>
                  <TickIcon />
                </span>
                <h3
                  className={`flex items-center mb-1 text-lg font-semibold  ${
                    [activeForm].includes("general-info")
                      ? "text-[#c12342]"
                      : "text-gray-400"
                  }`}>
                  General Info
                </h3>
                <span className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Please provide your name, age etc.
                </span>
              </div>
            </li>
            <li
              onClick={() => handleFormNavigation("workout-preferences")}
              className={`border-l p-1 pt-0 ${
                checkWorkoutPreferencesFilled()
                  ? "border-[#00ba79]"
                  : "border-gray-700"
              }  cursor-pointer`}>
              <div className="flex flex-col mb-10 ml-6">
                <span
                  className={`absolute flex items-center justify-center w-6 h-6  rounded-full -left-3  ${
                    checkWorkoutPreferencesFilled()
                      ? "text-[#00ba79]"
                      : "text-gray-400"
                  }`}>
                  <TickIcon />
                </span>
                <h3
                  className={`flex items-center mb-1 text-lg font-semibold  ${
                    [activeForm].includes("workout-preferences")
                      ? "text-[#c12342]"
                      : "text-gray-400"
                  }`}>
                  Workout Preferences
                </h3>
                <span className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Customise your workout plan, duration etc.
                </span>
              </div>
            </li>
            <li
              onClick={() => handleFormNavigation("generate-workout-plan")}
              className="border-none border-gray-200 dark:border-gray-700 p-1 pt-0 cursor-pointer">
              <div className="flex flex-col mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6  rounded-full -left-3 text-gray-400">
                  <TickIcon />
                </span>
                <h3
                  className={`flex items-center mb-1 text-lg font-semibold  ${
                    [activeForm].includes("generate-workout-plan")
                      ? "text-[#c12342]"
                      : "text-gray-400"
                  }`}>
                  Generate Workout Plan
                </h3>
                <span className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Released on January 13th, 2022
                </span>
              </div>
            </li>
          </ol>
        </div>
        <div className="flex-1 mr-8 ml-8">
          <div className="mx-4 flex justify-between items-center">
            <button
              type="button"
              onClick={() => handleFormStep("PREV")}
              className={`${
                activeForm === "general-info" ? "invisible" : "visible"
              } flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-700`}>
              <svg
                className="w-3.5 h-3.5 mr-2 rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
              Prev
            </button>
            <button
              type="button"
              onClick={() => handleFormStep("NEXT")}
              className={`${
                activeForm === "generate-workout-plan" ? "invisible" : "visible"
              } flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-700`}>
              Next
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            <div
              className={`${
                activeForm === "generate-workout-plan" ? "block" : "hidden"
              } ${isIncompleteForm() ? "cursor-not-allowed" : ""}`}>
              <button
                type="button"
                onClick={(event) => handleGenerate(event)}
                className={`${
                  isIncompleteForm() ? "pointer-events-none" : ""
                } flex items-center text-white focus:outline-none focus:ring-4 focus:ring-[#6b3743] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[#c12342] dark:hover:bg-[#f62c54] dark:focus:bg-[#c12342] dark:border-[#c12342]`}>
                Generate
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="alert-2"
            className={`${
              activeForm === "generate-workout-plan" && isIncompleteForm()
                ? "block"
                : "hidden"
            } flex items-center p-4 m-4 text-red-600 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400`}
            role="alert">
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium">
              Please fill all the details
            </div>
          </div>
          <Form>
            <Outlet />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GenerateWorkout;
