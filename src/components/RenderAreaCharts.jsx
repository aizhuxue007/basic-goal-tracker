import React, { useEffect, useState } from "react";
import RenderAreaChart from "./RenderAreaChart";

const RenderAreaCharts = ({ pomodoroCount, setPomodoroCount, todos }) => {
  const [todosData, setTodosData] = useState([])
  
  useEffect(() => {
    const formattedTodos = todos.map(todo => {
      // console.log(todo.created_at.split('T')[0])
      return {
        id: todo.id,
        created_at: todo.created_at,
        day: todo.created_at.split('T')[0],
        pomodoros: todo.pomodoro
      }
    })
    setTodosData(formattedTodos)
  }, [])

  let totalPomodoroCount = 0;

  useEffect(() => {
    totalPomodoroCount += pomodoroCount
    // console.log(totalPomodoroCount)
  }, [pomodoroCount])

  return (
    <div className="w-full">
      <RenderAreaChart todosData={todosData} />
    </div>
  );
};

export default RenderAreaCharts;
