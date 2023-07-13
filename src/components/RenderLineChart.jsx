import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RenderLineChart = ({ }) => {
    const data = [
        {name: 'Sunday', pomodoros: 1},
        {name: 'Monday', pomodoros: 12},
        {name: 'Tuesday', pomodoros: 4},
        {name: 'Wednesday', pomodoros: 0},
        {name: 'Thursday', pomodoros: 15},
        {name: 'Friday', pomodoros: 9},
        {name: 'Saturday', pomodoros: 7},
    ];
    return (
        <>
            <ResponsiveContainer width="100%" height="900px">
                <LineChart width={300} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}
export default RenderLineChart;