import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pomodoro = ({ closeModal, task }) => {
  // Pomodoro is a studying technique that consists of 25 minutes of work followed by 5 minute rest, after 4 sets of work periods, there is a 15 minute long rest.

  library.add(faCircleCheck);

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
    return (
      <div className="time-wrapper">
        <div className="time text-4xl">{`${formatRenderTimeMinutes(
          remainingTime
        )}:${formatRenderTimeSeconds(remainingTime)}`}</div>
      </div>
    );
  };

  const renderCheckPomodoro = () => {
    return (
      <>
        {isPomodoro && (
          <h1 className="text-center text-5xl font-bold">{task} 💪</h1>
        )}
      </>
    );
  };

  const renderCheckShortBreak = () => {
    return (
      <>
        {isBreak && (
          <h1 className="text-center text-5xl font-bold">
            Short 5 Minute Break
          </h1>
        )}
      </>
    );
  };

  const renderCheckLongBreak = () => {
    return (
      <>
        {isLongBreak && (
          <h1 className="text-center text-5xl font-bold">
            Long 15 Minute Break
          </h1>
        )}
      </>
    );
  };

  const formatRenderTimeMinutes = (timeForFormat) => {
    const minutes = Math.floor(timeForFormat / 60);
    return minutes.toString().padStart(2, "0");
  };

  const formatRenderTimeSeconds = (timeForFormat) => {
    const seconds = timeForFormat % 60;
    return seconds.toString().padStart(2, "0");
  };

  const setToPomodoro = () => {
    setIsLongBreak(false);
    setIsBreak(false);
    setIsPomodoro(true);
  };

  const incrementPomodoroCount = () => {
    setPomodoroCount((prevCount) => {
      const newCount = prevCount + 1;
      return newCount;
    });
  };

  const chooseWhichBreak = async () => {
    setIsPomodoro(false);
    incrementPomodoroCount();
    pomodoroCount % 4 === 0 ? setIsLongBreak(true) : setIsBreak(true);
  };

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

        {renderCheckPomodoro()}
        {renderCheckShortBreak()}
        {renderCheckLongBreak()}

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
                  setToPomodoro();
                }}
              >
                {renderTime}
              </CountdownCircleTimer>
            </>
          )}
        </div>
        <h1 className="text-center text-xl text-green-300 my-10">
          <FontAwesomeIcon icon={faCircleCheck} className="pl-2 mr-3" />
          {`${pomodoroCount}`}
        </h1>

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
