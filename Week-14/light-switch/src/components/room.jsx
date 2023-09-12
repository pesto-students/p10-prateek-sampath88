import { useDispatch, useSelector } from "react-redux";
import { toggleSwitch } from "../store/lightSwitchSlice";
import house from "../assets/house.jpg";
import darkHouse from "../assets/dark-house.jpg";

const Room = () => {
  const lightState = useSelector((state) => state.lightSwitch.lightState);
  // console.debug("lightState: ", lightState);
  const dispatch = useDispatch();

  return (
    <div className="room">
      <div className="house">
        <img
          className={`light-house ${lightState ? "on" : "off"}`}
          src={house}
          alt="house"
        />
        <img
          className={`dark-house ${lightState ? "off" : "on"}`}
          src={darkHouse}
          alt="house"
        />
      </div>
      <div className="switch">
        <button onClick={() => dispatch(toggleSwitch())}>
          {lightState ? "OFF" : "ON"}
        </button>
      </div>
    </div>
  );
};

export default Room;
