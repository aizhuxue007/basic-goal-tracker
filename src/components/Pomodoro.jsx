import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pomodoro = ({ todo, setTodo, closeModal }) => {
  library.add(faCircleCheck, faXmark);
 
  let duration = 25 * 60,
    testBreakDuration = 3,
    testLongBreakDuration = 4,
    testPomodoroDuration = 5;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);

  useEffect(() => {
    incrementPomodoroCount();
  }, [isPomodoro])

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
    setTodo(prevTodo => ({
      ...prevTodo,
      pomodoros: prevTodo.pomodoros + 1,
    }));
  };

  const chooseWhichBreak = async () => {
    setIsPomodoro(false);
    pomodoroCount % 4 === 0 ? setIsLongBreak(true) : setIsBreak(true);
  };

  const pausePomodoro = (playingBool) => {
    setIsPlaying(playingBool);
  };

  const stopPomodoro = () => {
    setIsPomodoro(false);
  };

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
      <header>
        {isPomodoro && (
          <div className="todo">
            <h1 className="text-center text-5xl font-bold">{todo.name} 💪</h1>
          </div>
        )}
      </header>
    );
  };

  const renderCheckShortBreak = () => {
    return (
      <header>
        {isBreak && (
          <h1 className="text-center text-5xl font-bold">
            Short 5 Minute Break
          </h1>
        )}
      </header>
    );
  };

  const renderCheckLongBreak = () => {
    return (
      <header>
        {isLongBreak && (
          <h1 className="text-center text-5xl font-bold">
            Long 15 Minute Break
          </h1>
        )}
      </header>
    );
  };

  return (
    <div className="min-h-max p-5 w-full flex-col rounded-2xl bg-green-700 p-3 text-white">
      <div className="flex w-full justify-end">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => {
            incrementPomodoroCount();
            closeModal();
          }}
        />
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
        {`${todo.pomodoro}`}
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
  );
};

export default Pomodoro;
