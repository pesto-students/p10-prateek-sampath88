import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  age: "",
  gender: "",
  fitnessLevel: "",
  fitnessGoal: "",
  workoutDuration: "",
  preferredExercises: [],
};

export const exercisesMap = {
  muscleBuilding: [
    "Squats",
    "Pull-ups",
    "push-ups",
    "dips",
    "Planks",
    "leg raises",
    "bench press",
    "Bicep curls",
    "leg curls",
    "calf raises",
  ],
  fatLoss: ["Running", "cycling", "swimming", "Squats", "lunges", "burpees"],
  enduranceImprovement: [
    "running",
    "cycling",
    "Planks",
    "squat jumps",
    "push-ups",
  ],
  flexibilityAndMobility: [
    "warrior poses",
    "pigeon pose",
    "Leg swings",
    "arm circles",
    "hip rotations",
    "quad stretch",
    "Hamstring stretch",
    "shoulder stretch",
  ],
  functionalStrength: [
    "Squats",
    "lunges",
    "push-ups",
    "stability ball exercises",
    "Planks",
    "side planks",
    "bird dogs",
  ],
};

export const workoutFormSlice = createSlice({
  name: "workoutFormData",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      let { key, value } = action.payload;
      // console.debug(key, "= ", value);
      if (typeof value === "string") value = value.trim();
      if (key === "fitnessGoal") {
        state.preferredExercises = [];
      }
      if (key.includes("exercise")) {
        let index = state.preferredExercises.indexOf(value);
        if (index === -1) {
          state.preferredExercises.push(value);
        } else {
          state.preferredExercises.splice(index, 1);
        }
      } else {
        state[key] = value;
      }
    },
  },
});

export const { updateFormData } = workoutFormSlice.actions;
const workoutFormReducer = workoutFormSlice.reducer;
export default workoutFormReducer;
