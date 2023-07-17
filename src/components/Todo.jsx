import { useState, useRef, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBullseye,
  faPlay,
  faXmark,
  faEdit,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Todo = ({ todo, id, onEditTodo, onDeleteTodo, startPomodoro }) => {

  let isChecked = `text-green-600 line-through`;

const editTodoInput = useRef(null)

  const [toggleCheckbox, setToggleCheckbox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todo.name);

    useEffect(() => {
        if (editTodoInput.current !== null) {
            editTodoInput.current.focus();
        }
        
    }, [isEditing]);

  library.add(faBullseye, faPlay, faXmark, faEdit, faCircleCheck);

  const handleCheckboxToggle = () => {
    setToggleCheckbox(!toggleCheckbox);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(todo.name);
  };

  const handleSaveClick = () => {
    onEditTodo(todo.id, editedName);
    setIsEditing(false);
  };

  const handleTodoEdit = (event) => {
    setEditedName(event.target.value);
  };

  const handlePomodoro = (name) => {
    startPomodoro(`${capitalizedFirstLetterStr(name)}`);
  };

  const capitalizedFirstLetterStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleDelete = (id) => {
    onDeleteTodo(todo.id);
  };

  const handleEnterKeyPressed = (event) => {
    if (event.keyCode === 13) {
        handleSaveClick();
    }
  }

  return (
    <>
      <li className="todo flex items-center justify-between">
        {isEditing ? (
          <div className="w-full">
            <div className="todo__edit flex items-center w-full">
              <div className="h-[1.125rem] w-[1.125rem] mx-6"></div>
              <input
                type="text"
                ref={editTodoInput}
                placeholder={editedName}
                value={editedName}
                onChange={handleTodoEdit}
                onKeyDown={handleEnterKeyPressed}
                className="outline-none focus:ring-1 focus:ring-white rounded-md p-2"
              />
              <div className="todo-edit__icons w-full flex justify-end items-center text-green-700">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  onClick={handleSaveClick}
                  className={`${
                    toggleCheckbox && isChecked
                  } pl-2 cursor-pointer`}
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => {
                    handleCancelClick(id);
                  }}
                  className={`${
                    toggleCheckbox && isChecked
                  } pl-2 text-2xl cursor-pointer`}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="todo__description flex items-center ">
              <div className="input-container flex item-center">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxToggle(id)}
                  className="h-[1.125rem] w-[1.125rem] mx-5 appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                />
              </div>

              <label
                className={`${toggleCheckbox && isChecked}`}
              >{`${todo.name}`}</label>
            </div>
            <div className="todo__icons flex items-center text-green-700">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => {
                  handleEdit(id);
                }}
                className={`${isChecked} pl-2 cursor-pointer`}
              />
              <FontAwesomeIcon
                icon={faPlay}
                onClick={() => {
                  handlePomodoro(todo.name);
                }}
                className={`${toggleCheckbox && isChecked} pl-2 cursor-pointer`}
              />
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  handleDelete(id);
                }}
                className={`${
                  toggleCheckbox && isChecked
                } pl-2 text-2xl cursor-pointer`}
              />
            </div>
          </>
        )}
      </li>
    </>
  );
};

export default Todo;
