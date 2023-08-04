import React, { useEffect } from "react";
import RenderAreaChart from "./RenderAreaChart";

const RenderAreaCharts = ({ pomodoroCount, setPomodoroCount, todos }) => {
  let totalPomodoroCount = 0;

  let now = new Date().toISOString().split('T')[0]
  let todosData
  useEffect(() => {
    todosData = todos.map(todo => {
      console.log(todo)
      return {
        id: todo.id,
        date: todo.created_at,
        pomodoros: todo.pomodoro
      }
    })
    console.log(todosData)

    
  }, [])

  useEffect(() => {
    totalPomodoroCount += pomodoroCount
    console.log(totalPomodoroCount)

  }, [pomodoroCount])

  return (
    <div className="w-full">
      <RenderAreaChart data={todosData} />
    </div>
  );
};

export default RenderAreaCharts;
