import GeneralInfo from "components/general-info";
import GenerateWorkoutPlan from "components/generate-workout-plan";
import WorkoutPreferences from "components/workout-preferences";
import MainLayout from "layouts/main-layout";
import ErrorPage from "pages/error-page";
import GenerateWorkout from "pages/generate-workout";
import HomePage from "pages/home-page";
import LandingPage from "pages/landing-page";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import {
  RouterProvider,
  createBrowserRouter,
  redirect
} from "react-router-dom";
import { store } from "store/store";
import "./App.css";
import HistoryPage from "pages/history-page";
const queryClient = new QueryClient();
const isNewUser = async () => {
  console.debug("isNewuser");
  const workoutPlans = JSON.parse(
    localStorage.getItem("workout-plans") || JSON.stringify([])
  );
  if (workoutPlans.length) {
    return false;
  }
  return true;
};
const checkRoute = (url) => {
  if (url.includes("generate-workout")) {
    return false;
  } else {
    return true;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    loader: async ({ request }) => {
      console.debug(request.url);
      //check the route permission to validate isNewUser
      if (!checkRoute(request.url)) return null;
      //if new user redirect to landing-page
      const result = await isNewUser();
      if (result) {
        return redirect("/landing-page");
      }
      return null;
    },
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "generate-workout",
        element: <GenerateWorkout />,
        children: [
          {
            path: "",
            element: <GeneralInfo />,
          },
          {
            path: "general-info",
            element: <GeneralInfo />,
          },
          {
            path: "workout-preferences",
            element: <WorkoutPreferences />,
          },
          {
            path: "generate-workout-plan",
            element: <GenerateWorkoutPlan />,
          },
        ],
      },
    ],
  },
  {
    path: "/landing-page",
    element: <LandingPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App bg-gray-800">
          <RouterProvider router={router}></RouterProvider>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
