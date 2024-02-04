import personal_trainer from "assets/personal_trainer.jpg";
import WorkoutPlan from "components/workout-plan";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { activePlan } = useSelector((state) => state.workoutPlan);
  console.log("activePlan:HOME ",activePlan);
  return (
    <div className="flex flex-col h-full">
      <div className="m-4 mt-8 h-full overflow-auto">
        <div className="h-[500px] flex justify-center">
          <img src={personal_trainer} alt="Workout illustration" />
        </div>
        <div className="mt-8">
          <h3 className="text-3xl text-center font-bold dark:text-white">
            Your daily workout plan
          </h3>
        </div>
        <div className="max-w-3xl mx-auto text-white">
          {activePlan &&
          activePlan.workoutData &&
          activePlan.workoutData.overview ? (
            <WorkoutPlan />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
