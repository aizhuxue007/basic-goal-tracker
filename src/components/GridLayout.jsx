import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import GridItem from "./GridItem";
import MainGrid from "./MainGrid";
import Todos from "./Todos";
import MainInput from "./MainInput";
import RenderAreaCharts from "./RenderAreaCharts";
import PromptDisplay from "./PromptDisplay";

const SUPABASE_PROJECT_URL = "https://vgigltsnmhcxllawoozp.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnaWdsdHNubWhjeGxsYXdvb3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4NzA3OTYsImV4cCI6MjAwNTQ0Njc5Nn0.wmh_PVPtPxEuxYwGbmeN-gRWhXUTGR9Koh_9f5PN3Kk";

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY);

const GridLayout = ({ showModal }) => {
  const goalsFromStorage = JSON.parse(localStorage.getItem("goals"));
  const hTagRefs = useRef([]);
  const [displayText, setDisplayText] = useState("");
  const [mainInput, setMainInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [goals, setGoals] = useState(goalsFromStorage || []);
  const [editGoalsMode, setEditGoalsMode] = useState([false, 0]);
  const [isChecked, setIsChecked] = useState(false);

  let goalsToRender = goals;

  useEffect(() => {
    if (Array.isArray(goalsFromStorage)) {
      setGoals(goalsFromStorage);
    }

    getGoalsFromSupabase();

    // Try to understand code!
    hTagRefs.current.forEach((ref, index) => {
      if (ref && ref.current) {
        ref.current.textContent = goals[index].input;
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
    insertGoalsToSupabase();
  }, [goals]);

  const getGoalsFromSupabase = async () => {
    const { data: goalsFromSupabase, error } = await supabase
      .from("goals")
      .select()
      .order("id", { ascending: true });
    if (error) {
      console.error("Error fetching data from Supabase:", error);
    } else {
      // Update the state variable to indicate that data is fetched
      setGoalsFromSupabase(goalsFromSupabase);
    }
  };

  const setGoalsFromSupabase = (goalsFromSupabase) => {
    setGoals(goalsFromSupabase);
  };

  const insertGoalsToSupabase = async () => {
    goals.map(async (goal) => {
      let now = new Date().getDate();
      if (checkExistingGoalInSupabase(goal)) return;
      const newGoal = {
        id: goal.id,
        created_at: now,
        deadline: "Tomorrow",
        question: goal.question,
        input: goal.input,
        font: goal.font,
      };
      const { resp, err } = await supabase.from("goals").insert([newGoal]);
      if (err) throw err;
      else console.log(resp);
    });
  };

  const checkExistingGoalInSupabase = async (goal) => {
    const existingGoals = await supabase
      .from("goals")
      .select("*")
      .eq("question", goal.question)
      .eq("input", goal.input)
      .eq("font", goal.font);

    if (existingGoals.length > 0) {
      console.log(`Goal ${goal} exists already in database`);
      return true;
    }
    return false;
  };

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
    let targetGoal = goals.find((goal) => goal.id === id);
    setDisplayText(targetGoal.question);
    setEditGoalsMode([true, id]);
  };

  const updateGoals = (id) => {
    displayEditGoalQuestion(id);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id != id);
    setTodos(updatedTodos);
  };

  return (
    <div className="h-screen grid grid-cols-4 grid-rows-4 justify-items-stretch items-stretch gap-1 p-1">
      {Array.isArray(goalsToRender) &&
        goalsToRender.map((goal, index) => (
          <div key={index}>
            <GridItem
              goals={goals}
              goal={goal}
              updateGoals={updateGoals}
              title={goal.time}
              mainInput={mainInput}
              setMainInput={setMainInput}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              hTagRef={(ref) => (hTagRefs.current[index] = ref)}
            />
          </div>
        ))}

      <MainGrid>
        <div className="interactive w-full h-5/6 rounded-3xl bg-green-500 text-white p-3">
          <h1 className="right-now__title  text-2xl font-bold text-center">
            Things to Do Right Now
          </h1>

          <div className="my-6">
            <PromptDisplay
              displayText={displayText}
              setDisplayText={setDisplayText}
              goals={goals}
              setGoals={setGoals}
              editMode={editGoalsMode}
            />
            <MainInput
              todos={todos}
              setTodos={setTodos}
              goals={goals}
              setGoals={setGoals}
              mainInput={mainInput}
              setMainInput={setMainInput}
              editGoalsMode={editGoalsMode}
              setEditGoalsMode={setEditGoalsMode}
              setIsChecked={setIsChecked}
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

      <GridItem key={98} title="Stats" gridProps={"row-start-2 row-span-3"}>
        <RenderAreaCharts />
      </GridItem>
    </div>
  );
};

export default GridLayout;
