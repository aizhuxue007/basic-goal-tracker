import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import GridItem from "./GridItem";
import MainGrid from "./MainGrid";
import Todos from "./Todos";
import MainInput from "./MainInput";
import RenderAreaCharts from "./RenderAreaCharts";

const SUPABASE_PROJECT_URL = "https://vgigltsnmhcxllawoozp.supabase.co"
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnaWdsdHNubWhjeGxsYXdvb3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4NzA3OTYsImV4cCI6MjAwNTQ0Njc5Nn0.wmh_PVPtPxEuxYwGbmeN-gRWhXUTGR9Koh_9f5PN3Kk"

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)

const GridLayout = ({ showModal }) => {
  const keepTrackStats = 'Stats'
  // const goalsDefault = [
  //   {
  //     id: 0,
  //     time: "Two-Year Goal",
  //     question: "What's the one thing I want to accomplish in two years?",
  //     input: "I want to be making $100,000 a year as a full-time AWS DevOps.",
  //     font: true,
  //   },
  //   {
  //     id: 1,
  //     time: "One-Year Goal",
  //     question:
  //       "Based on my Two Year Goal, what's the one thing I can do this year?",
  //     input: "Secure a web developer role to learn and gain experience.",
  //     font: false,
  //   },
  //   {
  //     id: 2,
  //     time: "Monthly Goal",
  //     question:
  //       "Based on my One Year Goal, what's the one thing I can do this month?",
  //     input:
  //       "Complete HTML/CSS, Practical Javascript and Git Like a Pro Courses.",
  //     font: false,
  //   },
  //   {
  //     id: 3,
  //     time: "Weekly Goal",
  //     question:
  //       "Based on my Monthly Goal, what's the one thing I can do this week?",
  //     input: "Finish HTML/CSS course and start Practical Javascript Course",
  //     font: false,
  //   },
  //   {
  //     id: 4,
  //     time: "Daily Goal",
  //     question: "Based on my Weekly Goal, what's the one thing I can do today?",
  //     input: "Complete 50% of the HTML/CSS course.",
  //     font: false,
  //   },
  //   {
  //     id: 5,
  //     time: "Right Now",
  //     question:
  //       "Based on my Daily Goal, what's the one thing I can do right now?",
  //     input: "Continue on the CSS course and code along.",
  //     font: false,
  //   }
  // ]
  // const parsedGoals = goalsFromStorage ? JSON.parse(goalsFromStorage) : []

  const goalsFromStorage = JSON.parse(localStorage.getItem("goals"));
  const hTagRefs = useRef([]);
  const [mainInput, setMainInput] = useState("");

  const [todos, setTodos] = useState([]);
  const [goals, setGoals] = useState(goalsFromStorage || [])

  let goalsToRender = goals.slice(0, -1);

  useEffect(() => {
    
    if (Array.isArray(goalsFromStorage)) {
      setGoals(goalsFromStorage)
    }

    getGoalsFromSupabase();
    // write to supabase
    // addGoalsToSupabase();

    // Try to understand code!
    hTagRefs.current.forEach((ref, index) => {
      if (ref && ref.current) {
        ref.current.textContent = goals[index].input;
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals))
    // console.log(JSON.parse(localStorage.getItem('goals')))
    let testGoalsFromStorage = localStorage.getItem('goals')
    // console.log(`testFromStorage: ${testGoalsFromStorage}`)
  }, [goals])

  async function getGoalsFromSupabase() {
    const { data: goalsFromSupabase, error } = await supabase.from('goals').select()
    if (error) {
      console.error('Error fetching data from Supabase:', error);
    } else {
      console.log(goalsFromSupabase);
      // Update the state variable to indicate that data is fetched
    
    }
  }

  const handleEditTodo = (id, updatedName) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: updatedName };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const displayEditGoalQuestion = (id) => {
    let targetGoal = goals.find(goal => goal.id === id)
    prompt(targetGoal.question)
  }

  const updateGoals = (id, newInput) => {
    displayEditGoalQuestion(id)
    setGoals((prevGoals) => 
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, input: newInput } : goal
      )
    )
  }

  const clearLocalStorage = () => {
    localStorage.removeItem("goals");
    setGoals([]);
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
        {(Array.isArray(goalsToRender)) && goalsToRender.map((goal, index) => (
          <div key={index}>
            <GridItem
              key={index}
              goal={goal}
              updateGoals={updateGoals}
              title={goal.time}
              mainInput={mainInput}
              setMainInput={setMainInput}
              hTagRef={(ref) => (hTagRefs.current[index] = ref)}
            />
          </div>
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

        <GridItem key={98} title={keepTrackStats} gridProps={"row-start-2 row-span-3"}>
          <RenderAreaCharts />
        </GridItem>
      </div>
      <button className="bg-red-300" onClick={clearLocalStorage}>Clear localStorage</button>

    </>
  );
};

export default GridLayout;
