import { React, useEffect } from "react";

const PromptDisplay = ({
  displayText,
  setDisplayText,
  goals,
  setGoals,
  editMode,
}) => {
  useEffect(() => {
    displayReset();
  }, []);
  useEffect(() => {
    if (!editMode[0]) {
      displayReset();
    }
  }, [editMode]);
  const displayReset = () => {
    setDisplayText("Based on your DAILY Goal, what can you do right NOW?");
  };
  return (
    <textarea
      type="text"
      value={displayText}
      id="main-display-area"
      className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:none focus:border-blue-500 block w-full p-2 dark:bg-green-600 dark:border-none dark:placeholder-gray-200 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
      rows={2}
      readOnly
    />
  );
};

export default PromptDisplay;
