import React from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const RenderAreaChart = ({ todosData }) => {
  let dummyVar = [
    {
        "id": "024d4b41-310f-428c-9119-6b2f0c622bbf",
        "created_at": "2023-08-07T00:52:30.059+00:00",
        "day": "Sun",
        "pomodoros": 0
    },
    {
        "id": "351879d1-ae3c-43b0-9956-81b329790ff5",
        "created_at": "2023-08-07T00:53:10.733+00:00",
        "day": "Sun",
        "pomodoros": 0
    },
    {
        "id": "36a37ef5-f2a9-4c02-8f6d-8f389c36374e",
        "created_at": "2023-08-07T00:53:06.117+00:00",
        "day": "Sun",
        "pomodoros": 0
    },
    {
        "id": "3ee6722c-a99c-4a66-b985-048958d845c8",
        "created_at": "2023-08-07T00:51:48.934+00:00",
        "day": "Sun",
        "pomodoros": 0
    },
    {
        "id": "63efc23d-3425-415f-a6be-714e17f9809a",
        "created_at": "2023-08-07T00:53:10.671+00:00",
        "day": "Sun",
        "pomodoros": 0
    },
    {
        "id": "969d4f9f-ccc7-41bb-b608-2868fb33b8ad",
        "created_at": "2023-08-07T00:53:24.31+00:00",
        "day": "Sun",
        "pomodoros": 0
    },
    {
        "id": "a10df852-f97f-4dc9-8afb-59753231e0c5",
        "created_at": "2023-08-07T00:52:52.89+00:00",
        "day": "Sun",
        "pomodoros": 0
    },
    {
        "id": "c2474693-71cc-4478-ba12-58f302e4eaf2",
        "created_at": "2023-08-07T00:52:47.283+00:00",
        "day": "Sun",
        "pomodoros": 0
    },
    {
        "id": "df6da55e-5234-43d4-81a2-0605af996c33",
        "created_at": "2023-08-07T00:58:15.213+00:00",
        "day": "Sun",
        "pomodoros": 39
    },
    {
        "id": "test",
        "day": "Mon",
        "pomodoros": 84
    },
     {
        "id": "test2",
        "day": "Tues",
        "pomodoros": 86
    },
     {
        "id": "test3",
        "day": "Weds",
        "pomodoros": 87
    },
]

  return (
    <div>
      <AreaChart
        width={210}
        height={180}
        data={dummyVar}
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
    </div>
  );
};
export default RenderAreaChart;
