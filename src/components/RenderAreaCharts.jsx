import React, { useEffect, useState } from "react";
import RenderAreaChart from "./RenderAreaChart";


const dayOfWeek = (dateStr) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const date = new Date(dateStr)
  return dayNames[date.getDay()]
}

const RenderAreaCharts = ({ pomodoroCount, todos }) => {
  const [todosData, setTodosData] = useState([]);
  let totalPomodoroCount = 0;

  useEffect(() => {
    const formattedTodos = todos.map((todo) => {
      let createdAt = todo.created_at;
      if (createdAt && typeof createdAt === "string") {
        return {
          id: todo.id,
          created_at: todo.created_at,
          day: dayOfWeek(todo.created_at.split("T")[0]),
          pomodoros: todo.pomodoro,
        };
      }
    });

    setTodosData(formattedTodos);
  }, [todos]);

  useEffect(() => {
    totalPomodoroCount += pomodoroCount;
  }, [pomodoroCount]);

  return (
    <div className="w-full">
      <RenderAreaChart todosData={todosData} />
    </div>
  );
};

export default RenderAreaCharts;
