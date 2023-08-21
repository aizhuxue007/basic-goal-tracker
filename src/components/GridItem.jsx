import React, { useState } from "react";
import { faBullseye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MaterialSymbolsCalendarMonthOutlineRounded } from "./MaterialSymbolsCalendarMonthOutlineRounded";
import Calendar from "react-calendar";

const GridItem = ({
  title,
  goal,
  isChecked,
  setIsChecked,
  updateGoals,
  hTagRef,
  gridProps,
  children,
}) => {
  let gridClasses = `${gridProps}`;
  let checkedBoxClasses = `text-green-700 line-through`;
  const [value, setValue] = useState('')
  const [calendarClicked, setCalendarClicked] = useState(false);
  const [calendarDate, setCalendarDate] = useState('');

  library.add(faBullseye, faEdit);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date
      .getFullYear()
      .toString()
      .slice(-2)}`;

    return formattedDate;
  };

  const handleCheckboxToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleCalendarIconClick = () => {
    console.log('calendar is clicked')
    setCalendarClicked(!calendarClicked);
  }

  const editGoal = () => {
    updateGoals(goal.id);
  };

  return (

      <div className={`item-container rounded-3xl bg-green-500 p-5 text-white ${gridClasses}`}>
        {goal ? (
          <>
            <h1 ref={hTagRef} className="text-2xl font-bold text-center">
              {title}
              {goal.font && (
                <span>
                  <FontAwesomeIcon className="ml-3" icon={faBullseye} />
                </span>
              )}
            </h1>

            <div className="goal-details w-full">
              <h2
                className={`truncate mt-1 mb-10 text-xl font-light ${
                  isChecked && checkedBoxClasses
                } text-center`}
              >
                {goal.input}
              </h2>
            </div>
            {goal.input && (
              <div className="w-full">
                {isChecked && (
                  <div className="goal__edit-icon flex justify-end">
                    <FontAwesomeIcon
                      className={`${checkedBoxClasses} cursor-pointer text-[1.38rem] text-white`}
                      onClick={() => editGoal()}
                      icon={faEdit}
                    />
                  </div>
                )}
                <div className="flex w-full items-center justify-between">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxToggle()}
                    checked={isChecked}
                    value={value}
                    className=" h-[1.125rem] w-[1.125rem] mr-3 appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  />
                  <div className={`duedate ${isChecked && checkedBoxClasses} tracking-wide`}>
                    {`Due: ${formatDate(goal.deadline.split("T")[0])}`}
                  </div>
                  <MaterialSymbolsCalendarMonthOutlineRounded
                      className={`${checkedBoxClasses} cursor-pointer text-2xl text-white`}
                      onClick={handleCalendarIconClick}
                  />
                  
                </div>
                {calendarClicked ? <Calendar className={`mt-5`}/> : null}
              </div>
            )}
          </>
        ) : (
          <h1 className="text-2xl font-bold text-center mb-5">{title}</h1>
        )}
        {children}
      </div>
  );
};

export default GridItem;
