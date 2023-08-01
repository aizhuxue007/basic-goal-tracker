import React, { useEffect } from "react";
import RenderAreaChart from "./RenderAreaChart";

const RenderAreaCharts = ({ pomodoroCount, setPomodoroCount }) => {
  useEffect(() => {
    console.log('pomodoro count ', pomodoroCount)
  }, [pomodoroCount])

  return (
    <div className="w-full">
      <RenderAreaChart />
      {/* <RenderAreaChart />
      <RenderAreaChart />
      <RenderAreaChart />
      <RenderAreaChart />
      <RenderAreaChart /> */}
    </div>
  );
};

export default RenderAreaCharts;
