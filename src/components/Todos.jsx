import React from "react";
import Todo from "./Todo";

const Todos = ({ todos, onEditTodo, onDeleteTodo, startPomodoro }) => {
    return (
        <>
            <ul className="interactive__todos mt-5 pr-5 overflow-hidden">
                {todos.map((todo, index) => (
                    <Todo key={index} todo={todo} onEditTodo={onEditTodo} onDeleteTodo={onDeleteTodo} startPomodoro={startPomodoro}/>
                ))}
            </ul>
        </>
    )
}

export default Todos