import { configureStore } from "@reduxjs/toolkit";
import stepCounterReducer from "../reducers/step-counter";

export const store = configureStore({
  reducer: {
    stepCounter: stepCounterReducer,
  },
});
