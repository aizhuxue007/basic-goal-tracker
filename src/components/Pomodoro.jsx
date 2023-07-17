import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Pomodoro = ({ closeModal, task }) => {
  let duration = 25 * 60,
    testBreakDuration = 3,
    testLongBreakDuration = 4,
    testPomodoroDuration = 5;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(1);

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

  const setToPomodoro = () => {
    setIsLongBreak(false)
    setIsBreak(false)
    setIsPomodoro(true)
  };
  // const updatePomodoroCount = 
  const chooseWhichBreak = async () => {
    setIsPomodoro(false);
    setPomodoroCount((prevCount) => {
      const newCount = prevCount + 1;
      console.log(`pomodoroCount: ${pomodoroCount} pomodoroCount%4: ${pomodoroCount%4===0}`)
      return newCount
    });
    if (pomodoroCount%4 === 0) {
      setIsLongBreak(true)
    } else {
      setIsBreak(true)
    }
  }

  const pausePomodoro = (playingBool) => {
    setIsPlaying(playingBool);
  };

  const stopPomodoro = () => {
    setIsPomodoro(false);
  };

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
        {isPomodoro && (
          <h1 className="text-center text-5xl font-bold">{task} 💪</h1>
        )}
        {isLongBreak && (
          <h1 className="text-center text-5xl font-bold">15 Minute Break</h1>
        )}
        {isBreak && (
          <h1 className="text-center text-5xl font-bold">5 Minute Break</h1>
        )}
        <div className="mt-10 flex w-full justify-center">
          {isPomodoro && (
            <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={testPomodoroDuration}
              colors={["#49be25", "#FFFFFF"]}
              size={400}
              onComplete={() => {
                chooseWhichBreak();
              }}
            >
              {renderTime}
            </CountdownCircleTimer>
          )}
          {isBreak && (
            <>
              <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={testBreakDuration}
                colors={["#49be25", "#FFFFFF"]}
                size={400}
                onComplete={() => {
                  setToPomodoro();
                }}
              >
                {renderTime}
              </CountdownCircleTimer>
            </>
          )}
          {isLongBreak && (
            <>
              <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={testLongBreakDuration}
                colors={["#49be25", "#FFFFFF"]}
                size={400}
                onComplete={() => {
                  setToPomodoro()
                }}
              >
                {renderTime}
              </CountdownCircleTimer>
            </>
          )}
        </div>
        <h1 className="text-center text-xl my-10">{`Pomodoros: ${pomodoroCount}`}</h1>

        <div className="mt-10 flex justify-center space-x-10">
          {isPlaying ? (
            <button
              className="w-36 h-12 box-border rounded border border-white p-3 hover:bg-white hover:text-green-500 flex justify-center items-center"
              onClick={() => pausePomodoro(!isPlaying)}
            >
              Pause
            </button>
          ) : (
            <button
              className="w-36 h-12 box-border rounded border border-white p-3 hover:bg-white hover:text-green-500 flex justify-center items-center"
              onClick={() => pausePomodoro(!isPlaying)}
            >
              Play
            </button>
          )}

          <button
            className="w-36 h-12 box-border rounded border border-white p-3 hover:bg-white hover:text-green-500 flex justify-center items-center"
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
