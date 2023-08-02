import React, { useEffect } from "react";
import RenderAreaChart from "./RenderAreaChart";

const RenderAreaCharts = ({ pomodoroCount, setPomodoroCount }) => {
  let totalPomodoroCount = 0;
  let now = new Date()

  useEffect(() => {
    totalPomodoroCount += pomodoroCount
    console.log(totalPomodoroCount)
    console.log(now)
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
