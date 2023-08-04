import React, { useEffect } from "react";
import RenderAreaChart from "./RenderAreaChart";

const RenderAreaCharts = ({ pomodoroCount, setPomodoroCount }) => {
  let totalPomodoroCount = 0;

  let now = new Date().toISOString().split('T')[0]
  let data

  useEffect(() => {
    data = [
      {
        date: now,
        total_pomodoros: totalPomodoroCount
      }
    ]

    
  }, [])

  useEffect(() => {
    totalPomodoroCount += pomodoroCount
    console.log(totalPomodoroCount)
    let itemToUpdate = data.filter(function(item) {
      return item.date === now
    })

  }, [pomodoroCount])

  return (
    <div className="w-full">
      <RenderAreaChart />
    </div>
  );
};

export default RenderAreaCharts;
