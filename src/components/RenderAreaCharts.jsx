import React, { useState, useEffect } from "react";
import RenderAreaChart from "./RenderAreaChart";

const RenderAreaCharts = ({ pomodoroCount }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const newData = data.slice(); // Create a copy of the data array
    if (newData.length === 0 || newData[newData.length - 1].date !== formattedDate) {
      // If the array is empty or the current date is different from the last item, add a new entry
      newData.push({
        date: formattedDate,
        total_pomodoros: pomodoroCount
      });
    } else {
      // If the current date matches the last item, update the total_pomodoros
      newData[newData.length - 1].total_pomodoros = pomodoroCount;
    }

    // Ensure there are only 7 objects in the data array
    if (newData.length > 7) {
      newData.shift(); // Remove the oldest entry
    }

    setData(newData); // Update the state
  }, [pomodoroCount]);

  return (
    <div className="w-full">
      {/* Pass the data to the RenderAreaChart component */}
      <RenderAreaChart data={data} />
    </div>
  );
};

export default RenderAreaCharts;
