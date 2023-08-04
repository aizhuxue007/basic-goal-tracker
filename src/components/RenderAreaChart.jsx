import React from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const RenderAreaChart = ({ data }) => {
  return (
    <AreaChart
      width={210}
      height={180}
      data={data}
      margin={{ top: 0, right: 50, bottom: 0, left: -30 }}
    >
      <Area
        type="monotone"
        dataKey="pomodoros"
        stroke="#065535"
        fill="#065535"
      />
      <XAxis dataKey="day" />
      <YAxis />
    </AreaChart>
  );
};
export default RenderAreaChart;
