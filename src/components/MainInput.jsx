import { React, useState, useRef, useEffect } from "react";

const MainInput = ({
  todos,
  setTodos,
  mainInput,
  goals,
  setGoals,
  setMainInput,
  editGoalsMode,
  setEditGoalsMode,
  setIsChecked,
}) => {
  const todoInput = useRef(null);

  useEffect(() => {}, []);

  const handleEnterKeyPressed = (event) => {
    if (event.keyCode === 13) {
      if (mainInput.trim() !== "") {
        resetMainInput();
        if (editGoalsMode[0]) {
          console.log('in edit mode')
          editGoalsInput(editGoalsMode[1])
          setEditGoalsMode([false, -1])
          setIsChecked(false)
        } else {
          addNewTodo();
        }
      }
    }
  };

  const editGoalsInput = (id) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, input: mainInput} : goal
      )
    );
  }

  const addNewTodo = () => {
    const newTodo = { id: todos.length + 1, name: mainInput };
    setTodos([...todos, newTodo]);
  };

  const resetMainInput = () => {
    setMainInput("");
  };

  const handleInputChange = (event) => {
    setMainInput(event.target.value);
  };

  return (
    <textarea
      type="text"
      ref={todoInput}
      onChange={handleInputChange}
      value={mainInput}
      onKeyDown={handleEnterKeyPressed}
      id="main-text-area"
      className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-b-lg focus:none focus:border-blue-500 block w-full p-2 dark:bg-green-600 dark:border-none dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
      autoFocus
    />
  );
};

export default MainInput;
