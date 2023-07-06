import React from "react";
import "/Users/aizhuxue/webdev/react-basics/goaltracker/src/css/Goals.css";

const Goals = () => {
  let goals = [
    {
      Time: "Two-Year Goal",
      Question: "What's the one thing I want to accomplish in two years?",
      Input: "I want to be making $100,000 a year as a full-time AWS DevOps.",
    },
    {
      Time: "One-Year Goal",
      Question:
        "Based on my Two Year Goal, what's the one thing I can do this year?",
      Input: "Secure a web developer role to learn and gain experience.",
    },
    {
      Time: "Monthly Goal",
      Question:
        "Based on my One Year Goal, what's the one thing I can do this month?",
      Input:
        "Complete HTML/CSS, Practical Javascript and Git Like a Pro Courses.",
    },
    {
      Time: "Weekly Goal",
      Question:
        "Based on my Monthly Goal, what's the one thing I can do this week?",
      Input: "Finish HTML/CSS course and start Practical Javascript Course",
    },
    {
      Time: "Daily Goal",
      Question: "Based on my Weekly Goal, what's the one thing I can do today?",
      Input: "Complete 50% of the HTML/CSS course.",
    },
    {
      Time: "Right Now",
      Question:
        "Based on my Daily Goal, what's the one thing I can do right now?",
      Input: "Continue on the CSS course and code along.",
    },
  ];
  const handleInputChange = () => {
    console.log("hello");
  };
  return (
    <>
      <div className="container mx-auto pt-5 text-center font-sans subpixel-antialiased">
        {goals.map((goal, index) => {
          return (
            <div className="mb-5 leading-9" key={index}>
              <div className="mb-2 inline-block bg-yellow-700 p-2 text-4xl font-bold text-white">
                {goal.Time}
              </div>
              <div className="text-2xl font-semibold">{goal.Question}</div>
              <input
                className=""
                type="text"
                value={goal.Input}
                size={goal.Input.length}
                onChange={handleInputChange}
              ></input>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Goals;
