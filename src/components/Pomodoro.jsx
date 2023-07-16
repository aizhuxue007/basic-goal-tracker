import React, {useState} from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Pomodoro = ({ closeModal, task }) => {
  const [ isPlaying, setIsPlaying ] = useState(true)
  const [ isPomodoro, setIsPomodoro ] = useState(true)
  const [ pomodoroCount, setPomodoroCount ] = useState(0)
  
  let duration = 25 * 60,
    testDuration = 25

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <div className="time-wrapper">
        <div className="time text-4xl">{`${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</div>
      </div>
    );
  };
  const pausePomodoro = (playingBool) => {
    setIsPlaying(playingBool);
  }
  const stopPomodoro = () => {
    setIsPomodoro(false)
  }
  return (
    <>
      <div className="h-full min-h-max  w-full flex-col rounded-2xl bg-green-700 p-3 text-white">
        <div className="flex w-full justify-end">
          <button className="" onClick={closeModal}>
            <img
              className="h-5 w-5 invert filter"
              src="/assets/images/close.png"
              alt="close-button-image from flaticon"
            />
          </button>
        </div>
        <h1 className="text-center text-5xl font-bold">{task}</h1>
        <div className="mt-10 flex w-full justify-center">
          
          {isPomodoro ? <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={testDuration}
            initialRemainingTime={testDuration}
            colors={["#49be25", "#FFFFFF"]}
            size={400}
          >
            {renderTime}
          </CountdownCircleTimer> : <h1>Good job! Pomodoro complete!</h1>}
        </div>
        <div className="mt-10 flex justify-center space-x-10">
          <button className="w-36 h-12 box-border rounded border border-white p-3 hover:bg-white hover:text-green-500 flex justify-center items-center"
            onClick={() => pausePomodoro(!isPlaying)}
          >
            Pause
          </button>
          <button className="w-36 h-12 box-border rounded border border-white p-3 hover:bg-white hover:text-green-500 flex justify-center items-center"
            onClick={() => stopPomodoro()}
          >
            Stop
          </button>
        </div>
      </div>
    </>
  );
};

export default Pomodoro;
