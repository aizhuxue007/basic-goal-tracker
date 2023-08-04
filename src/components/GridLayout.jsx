import { useState, useRef, useEffect } from "react";
import supabase from "./supabase";
import GridItem from "./GridItem";
import MainGrid from "./MainGrid";
import Todos from "./Todos";
import MainInput from "./MainInput";
import RenderAreaCharts from "./RenderAreaCharts";
import PromptDisplay from "./PromptDisplay";

const GridLayout = ({
  startPomodoro,
  pomodoroCount,
  setPomodoroCount,
  todos,
  setTodos,
  handleError,
}) => {
  const hTagRefs = useRef([]);
  const [displayText, setDisplayText] = useState("");
  const [mainInput, setMainInput] = useState("");
  const [goals, setGoals] = useState([]);
  const [editGoalsMode, setEditGoalsMode] = useState([false, 0]);
  const [isChecked, setIsChecked] = useState({});

  let goalsToRender = goals;

  useEffect(() => {
    getGoalsFromSupabase();

    // Try to understand code!
    hTagRefs.current.forEach((ref, index) => {
      if (ref && ref.current) {
        ref.current.textContent = goals[index].input;
      }
    });

    // updateGoalAtSupabase(2);
    // deleteGoalsRowInSupabase(99)
  }, []);

  useEffect(() => {
    insertGoalsToSupabase();
  }, [goals]);

  const toggleIsChecked = (id) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const getGoalsFromSupabase = async () => {
    const { data: goalsFromSupabase, error } = await supabase
      .from("goals")
      .select()
      .order("id", { ascending: true });
    if (error) {
      console.error("Error fetching data from Supabase:", error);
    } else {
      // Update the state variable to indicate that data is fetched
      loadGoalsFromSupabase(goalsFromSupabase);
    }
  };

  const updateGoalAtSupabase = async (id, updatedGoal) => {
    const { data, error } = await supabase
      .from("goals")
      .update(updatedGoal)
      .eq("id", id);
    if (error) {
      console.log("Error updated row", id, error.message);
    } else {
      console.log("Row updated successfully", data);
    }
  };

  const deleteGoalsRowInSupabase = async (id) => {
    const { data, error } = await supabase.from("goals").delete().eq("id", id);
    if (error)
      console.log("Error encountered when deleting row", error.message);
    console.log("Deleting row successful!", data);
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

  const displayEditGoalQuestion = (id) => {
    let targetGoal = goals.find((goal) => goal.id === id);
    setDisplayText(targetGoal.question);
    setEditGoalsMode([true, id]);
  };

  const updateGoals = (id) => {
    displayEditGoalQuestion(id);
  };

  const loadGoalsFromSupabase = (goalsFromSupabase) => {
    setGoals(goalsFromSupabase);
  };

  const insertGoalsToSupabase = async () => {
    goals.map(async (goal) => {
      let now = new Date().getDate();
      if (checkExistingGoalInSupabase(goal)) return;
      const newGoal = {
        id: goal.id,
        created_at: now,
        deadline: new Date(),
        question: goal.question,
        input: goal.input,
        font: goal.font,
      };
      const { resp, err } = await supabase.from("goals").insert([newGoal]);
      if (err) throw err;
      else console.log(resp);
    });
  };

  const editTodoInSupabase = async (id, taskName) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ task_name: taskName })
      .eq("id", id);
    if (handleError(error)) return;
    console.log(`todo ${id} is updated successfully`);
  };

  const deleteTodoFromSupabase = async (id) => {
    const { data: todosFromSupabase, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id);
    if (!handleError(error)) {
      console.log(`Successfully deleted todo: ${id}`);
    }
  };

  const handleEditTodo = (id, updatedName) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: updatedName };
      }
      return todo;
    });
    editTodoInSupabase(id, updatedName);
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id != id);
    deleteTodoFromSupabase(id);
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
              isChecked={isChecked[goal.id]}
              setIsChecked={() => toggleIsChecked(goal.id)}
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
              supabase={supabase}
              updateGoalAtSupabase={updateGoalAtSupabase}
            />
            <Todos
              todos={todos}
              onEditTodo={handleEditTodo}
              onDeleteTodo={handleDeleteTodo}
              startPomodoro={startPomodoro}
            />
          </div>
        </div>
      </MainGrid>

      <GridItem key={98} title="Stats" gridProps={"row-start-2 row-span-3"}>
        <RenderAreaCharts
          pomodoroCount={pomodoroCount}
          setPomodoroCount={setPomodoroCount}
          todos={todos}
        />
      </GridItem>
    </div>
  );
};

export default GridLayout;
