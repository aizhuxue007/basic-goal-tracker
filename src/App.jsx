import Modal from "react-modal";
import GridLayout from "./components/GridLayout";
import Pomodoro from "./components/Pomodoro";
import { supabase } from "./components/supabase";
import { v4 as uuidv4 } from "uuid";
import { React, useState, useEffect } from "react";


function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [todo, setTodo] = useState(null);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (todos.length === 0) {
      getTodosFromSupabase();
    }
    loadTodosToSupabase()
  }, [todos]);

  const handleError = (e) => {
    if (e) {
      console.error("Error fetching data from Supabase:", e);
      return true;
    }
    return false;
  };

  const capFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const fetchTodos = async () => {
    const { data: todosFromSupabase, error } = await supabase
      .from("todos")
      .select()
      .order("id", { ascending: true });
    return todosFromSupabase
  }

  const getTodosFromSupabase = async () => {
    const todosFromSupabase = await fetchTodos()
    if (!handleError(error)) {
      loadTodosFromSupabase(todosFromSupabase);
    }
  };

  const checkExistingTodoInSupabase = async (todo) => {
    const { data: existingTodos, error } = await supabase
      .from("todos")
      .select("id")
      .eq("task_name", todo.name)
    if (error) {
      console.error("Error fetching existing todos from Supabase:", error);
      return false;
    }
    if (existingTodos.length > 0) {
      const isExistingTodo = existingTodos.some(
        (existingTodo) => existingTodo.id === todo.id
      );
      if (isExistingTodo) {
        return true;
      }
    }
    return false;
  };

  const loadTodosFromSupabase = (todosFromSupabase) => {
    if (todosFromSupabase) {
      setTodos(
        todosFromSupabase.map((todo) => {
          return {
            id: todo.id,
            created_at: todo.created_at,
            name: capFirstLetter(todo.task_name),
            pomodoro: todo.pomodoros,
          };
        })
      );
    }
  };

  const loadTodosToSupabase = async () => {
    todos.map(async (todo) => {
      if (await checkExistingTodoInSupabase(todo)) return;
      let now = new Date();
      let newTodo = {
        id: uuidv4(),
        created_at: now,
        task_name: todo.name,
        pomodoros: todo.pomodoro ? todo.pomodoro : 0
      };
      const { err } = await supabase.from("todos").insert([newTodo]);
      if (handleError(err)) return;
    });
  };

  const customModalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, .90)",
      blur: "blur(12px)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      border: "none",
      width: "75vw",
      padding: "0",
      transform: "translate(-50%, -50%)",
    },
  };

  const startPomodoro = (todo) => {
    setTodo(todo);
    setIsOpenModal(true);
  };

  const closeModal = (todo) => {
    setIsOpenModal(false);
    addPomodoroToTodo(todo);
    setPomodoroCount(0);
  };

  const addPomodoroToTodo = (todo) => {
    const todoIndex = todos.findIndex((item) => item.id === todo.id);
    if (todoIndex !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[todoIndex] = {
        ...updatedTodos[todoIndex],
        pomodoro: todo.pomodoro + pomodoroCount, // Increment the pomodoro count by 1
      };
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="h-screen">
      <GridLayout
        startPomodoro={startPomodoro}
        todos={todos}
        setTodos={setTodos}
        pomodoroCount={pomodoroCount}
        setPomodoroCount={pomodoroCount}
        handleError={handleError}
      />
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Pomodoro Modal"
        ariaHideApp={false}
      >
        <Pomodoro
          todo={todo}
          closeModal={closeModal}
          pomodoroCount={pomodoroCount}
          setPomodoroCount={setPomodoroCount}
        />
      </Modal>
    </div>
  );
}

export default App;
