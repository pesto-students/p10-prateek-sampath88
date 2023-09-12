import { connect } from "react-redux";

import { addStep, resetSteps } from "../actions/step-counter";

const StepCounter = ({ steps, addStep, resetSteps }) => {
  return (
    <div className="container">
      <h1 className="title">Step Counter</h1>
      <h2 className="step-count">
        You have walked <span>{steps}</span> steps today!
      </h2>
      <div className="actions">
        <button className="btn add-btn" onClick={addStep}>
          Add a Step
        </button>
        <button className="btn reset-btn" onClick={resetSteps}>
          Reset Steps
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    steps: state.stepCounter.steps,
  };
};

const mapDispatchToProps = {
  addStep,
  resetSteps,
};

export default connect(mapStateToProps, mapDispatchToProps)(StepCounter);
