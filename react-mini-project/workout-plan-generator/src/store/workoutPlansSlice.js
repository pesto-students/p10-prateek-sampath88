import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  let workoutPlans = localStorage.getItem("workout-plans");
  if (!workoutPlans) return [];
  return JSON.parse(workoutPlans);
};

const getActivePlan = () => {
  let workoutPlans = getInitialState();
  if (workoutPlans.length) return workoutPlans[workoutPlans.length - 1];
  return "";
};

const initialState = {
  activePlan: getActivePlan(),
  history: getInitialState()
};

export const workoutPlanSlice = createSlice({
  name: "workoutPlan",
  initialState,
  reducers: {
    setActivePlan: (state, action) => {
      const { activePlan } = action.payload;
      state.activePlan = activePlan;
    },
    addPlan: (state, action) => {
      const { newPlan } = action.payload;
      state.history.push(newPlan);
    },
    setHistory: (state, action) => {
      const { history } = action.payload;
      state.history = history;
    }
  }
});

export const { setActivePlan, addPlan, setHistory } = workoutPlanSlice.actions;
const workoutPlanReducer = workoutPlanSlice.reducer;
export default workoutPlanReducer;
