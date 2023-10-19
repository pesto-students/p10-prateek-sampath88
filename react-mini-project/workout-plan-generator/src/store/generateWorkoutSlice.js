import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeForm: "general-info",
};

export const generateWorkoutSlice = createSlice({
  name: "generateWorkout",
  initialState,
  reducers: {
    setActiveForm: (state, action) => {
      const { activeForm } = action.payload;
      if (activeForm.includes("/generate-workout")) {
        let subPath = activeForm.replace("/generate-workout", "");
        // console.log("subPath: ", subPath);
        switch (subPath) {
          case "":
          case "/":
          case "/general-info":
          case "/general-info/":
            state.activeForm = "general-info";
            break;
          case "/workout-preferences":
          case "/workout-preferences/":
            state.activeForm = "workout-preferences";
            break;
          case "/generate-workout-plan":
          case "/generate-workout-plan/":
            state.activeForm = "generate-workout-plan";
            break;
        }
      }
    },
  },
});

export const { setActiveForm } = generateWorkoutSlice.actions;
const generateWorkoutReducer = generateWorkoutSlice.reducer;
export default generateWorkoutReducer;
