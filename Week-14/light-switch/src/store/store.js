import { configureStore } from "@reduxjs/toolkit";
import lightSwitchReducer from "./lightSwitchSlice";

export default configureStore({
  reducer: {
    lightSwitch: lightSwitchReducer,
  },
});
