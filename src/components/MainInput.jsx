import { React, useState, useRef, useEffect } from "react";

const MainInput = ({ todos, setTodos, goals, setGoals, mainInput, setMainInput }) => {
  const todoInput = useRef(null);

  const [displayText, setDisplayText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    setDisplayText(prompts[0]);
  }, []);

  useEffect(() => {
    setDisplayText(prompts[promptIndex]);
  }, [promptIndex]);

  // Variables
  const prompts = (typeof(goals) === 'object') && goals.map((goal) => goal.question);

  const handleEnterKeyPressed = (event) => {
    if (event.keyCode === 13) {
      if (mainInput.trim() !== "") {
        resetMainInput();
        setGoals((prevGoals) => {
          const updatedGoals = [...prevGoals];
          updatedGoals[promptIndex].input = mainInput;
          return updatedGoals;
        });
      }
      if (promptIndex < prompts.length - 1) {
        // For two-year, one-year, monthly, weekly and daily goals

        setPromptIndex((prevPromptIndex) =>
          prevPromptIndex < prompts.length - 1 ? prevPromptIndex + 1 : 0
        );
        nextQuestionForDisplayInput();
      }
      if (promptIndex === 5) {
        // Last question
        addNewTodo();
      }
    }
  };

  const askEditPromptFromGridItem = (question) => {
    setMainInput('hello from griditem')
  }

  const nextQuestionForDisplayInput = () => {
    setDisplayText(prompts[promptIndex]);
  };

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
    <div>
      <textarea
        type="text"
        value={displayText}
        id="main-display-area"
        className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:none focus:border-blue-500 block w-full p-2 dark:bg-green-600 dark:border-none dark:placeholder-gray-200 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
        rows={2}
        readOnly
      />
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
    </div>
  );
};

export default MainInput;
