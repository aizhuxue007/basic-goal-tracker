import { useState, useRef, useEffect } from "react";

import GridItem from "./GridItem";
import MainGrid from "./MainGrid";
import Todos from "./Todos";
import MainInput from "./MainInput";
import RenderAreaCharts from "./RenderAreaCharts";

const GridLayout = ({ showModal }) => {
  const hTagRefs = useRef([]);
  const [mainInput, setMainInput] = useState("");

  const [todos, setTodos] = useState([]);
  const [goals, setGoals] = useState([
    {
      id: 0,
      time: "Two-Year Goal",
      question: "What's the one thing I want to accomplish in two years?",
      input: "I want to be making $100,000 a year as a full-time AWS DevOps.",
      font: true,
    },
    {
      id: 1,
      time: "One-Year Goal",
      question:
        "Based on my Two Year Goal, what's the one thing I can do this year?",
      input: "Secure a web developer role to learn and gain experience.",
      font: false,
    },
    {
      id: 2,
      time: "Monthly Goal",
      question:
        "Based on my One Year Goal, what's the one thing I can do this month?",
      input:
        "Complete HTML/CSS, Practical Javascript and Git Like a Pro Courses.",
      font: false,
    },
    {
      id: 3,
      time: "Weekly Goal",
      question:
        "Based on my Monthly Goal, what's the one thing I can do this week?",
      input: "Finish HTML/CSS course and start Practical Javascript Course",
      font: false,
    },
    {
      id: 4,
      time: "Daily Goal",
      question: "Based on my Weekly Goal, what's the one thing I can do today?",
      input: "Complete 50% of the HTML/CSS course.",
      font: false,
    },
    {
      id: 5,
      time: "Right Now",
      question:
        "Based on my Daily Goal, what's the one thing I can do right now?",
      input: "Continue on the CSS course and code along.",
      font: false,
    },
  ]);

  useEffect(() => {
    // Try to understand code!
    hTagRefs.current.forEach((ref, index) => {
      if (ref && ref.current) {
        ref.current.textContent = goals[index].input;
      }
    });
  }, []);

  let goalsToRender = goals.slice(0, -1);

  const handleEditTodo = (id, updatedName) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: updatedName };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id != id);
    setTodos(updatedTodos);
  };

  return (
    <>
      <div
        className="grid w-full grid-cols-4 justify-items-stretch gap-1 p-1"
        style={{ height: "100dvh" }}
      >
        {goalsToRender.map((goal, index) => (
          <>
           {/* {console.log(goalsToRender.length)} */}
            <GridItem
              key={index}
              goal={goal}
              mainInput={mainInput}
              setMainInput={setMainInput}
              hTagRef={(ref) => (hTagRefs.current[index] = ref)}
            />
          </>
        ))}

        <MainGrid>
          <div className="interactive h-5/6 w-full rounded-3xl bg-green-500 text-white p-3">
            <h1 className="right-now__title  text-2xl font-bold text-center">
              Things to Do Right Now
            </h1>

            <div className="my-6">
              <MainInput
                todos={todos}
                setTodos={setTodos}
                goals={goals}
                setGoals={setGoals}
                mainInput={mainInput}
                setMainInput={setMainInput}
              />

              <Todos
                todos={todos}
                onEditTodo={handleEditTodo}
                onDeleteTodo={handleDeleteTodo}
                startPomodoro={showModal}
              />
            </div>
          </div>
        </MainGrid>

        <GridItem title={"Stats"} gridProps={"row-start-2 row-span-3"}>
          <RenderAreaCharts />
        </GridItem>
      </div>
    </>
  );
};

export default GridLayout;
