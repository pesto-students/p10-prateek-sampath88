import { configureStore } from "@reduxjs/toolkit";
import workoutFormReducer from "./workoutFormSlice";
import generateWorkoutReducer from "./generateWorkoutSlice";
import workoutPlanReducer from "./workoutPlansSlice";

export const store = configureStore({
  reducer: {
    workoutFormData: workoutFormReducer,
    generateWorkout: generateWorkoutReducer,
    workoutPlan: workoutPlanReducer,
  },
});
