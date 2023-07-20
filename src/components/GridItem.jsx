import React, { useState } from "react";
import { faBullseye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GridItem = ({
  key,
  title,
  goal,
  updateGoals,
  hTagRef,
  gridProps,
  children,
  mainInput,
  setMainInput,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  let gridClasses = `grid-item p-2 ${gridProps}`;
  let checkedBoxClasses = `text-green-700 line-through`;

  library.add(faBullseye, faEdit);

  const handleCheckboxToggle = () => {
    toggleIsChecked();
  };

  const toggleIsChecked = () => {
    if (isChecked) {
      setIsChecked(false);
    }
    else {
      setIsChecked(true);
    }
  };

  const editGoal = () => {
    console.log('in edit goal ', goal.id)
    updateGoals(goal.id, "updating goals")
  };

  return (
    <>
      <div className={`${gridClasses}`}>
        <div
          className={`item-container relative w-full h-full rounded-3xl bg-green-500 p-3 text-white`}
        >
          {goal ? (
            <>
              <h1 ref={hTagRef} className="text-2xl font-bold text-center">
                {title}
                {goal.font && (
                  <span>
                    <FontAwesomeIcon icon={faBullseye} className="" />
                  </span>
                )}
              </h1>

              <div className="goal-details">
                <h2
                  className={`mt-5 text-1xl font-light ${
                    isChecked && checkedBoxClasses
                  } text-center`}
                >
                  {goal.input}
                </h2>
              </div>
              {goal.input && (
                <div className="w-full flex justify-end">
                  {isChecked && (
                    <FontAwesomeIcon
                      className={`${checkedBoxClasses} cursor-pointer`}
                      onClick={() => editGoal()}
                      icon={faEdit}
                    />
                  )}
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxToggle()}
                    className=" h-[1.125rem] w-[1.125rem] mx-5 appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  />
                </div>
              )}
            </>
          ) : <h1 className="text-2xl font-bold text-center mb-5">{title}</h1> }
          {children}
        </div>
      </div>
    </>
  );
};

export default GridItem;
