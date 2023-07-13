import { useState, useRef } from "react";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GridItem from ".//GridItem";
import Todos from "./Todos";
import "react-clock/dist/Clock.css";

const GridLayout = ({showModal}) => {
    let goals = [
        {
          time: "Two-Year Goal",
          question: "What's the one thing I want to accomplish in two years?",
          input: "I want to be making $100,000 a year as a full-time AWS DevOps.",
        },
        {
          time: "One-Year Goal",
          question:
            "Based on my Two Year Goal, what's the one thing I can do this year?",
          input: "Secure a web developer role to learn and gain experience.",
        },
        {
          time: "Monthly Goal",
          question:
            "Based on my One Year Goal, what's the one thing I can do this month?",
          input:
            "Complete HTML/CSS, Practical Javascript and Git Like a Pro Courses.",
        },
        {
          time: "Weekly Goal",
          question:
            "Based on my Monthly Goal, what's the one thing I can do this week?",
          input: "Finish HTML/CSS course and start Practical Javascript Course",
        },
        {
          time: "Daily Goal",
          question: "Based on my Weekly Goal, what's the one thing I can do today?",
          input: "Complete 50% of the HTML/CSS course.",
        },
        {
          time: "Right Now",
          question:
            "Based on my Daily Goal, what's the one thing I can do right now?",
          input: "Continue on the CSS course and code along.",
        },
      ];
      library.add(faBullseye)

      const todoInput = useRef(null)
      const [mainInput, setMainInput] = useState('')
      const [todos, setTodos] = useState([])
    
      const handleEnterKeyPressed = (event) => {
        if (event.key === "Enter") {
          const newTodo = { id: todos.length + 1, name: mainInput }
          setTodos([...todos, newTodo])
          setMainInput('')
        }
      }
    
      const handleInputChange = (event) => {
        setMainInput(event.target.value)
      }
      
      const handleEditTodo = (id, updatedName) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, name: updatedName };
          }
          return todo;
        });
        setTodos(updatedTodos);
      };
    
      const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id != id);
        setTodos(updatedTodos)
      }
    
      const closeModal = () => {
        setIsOpenModal(false)
      }
    return (
        <>
            <div
        className="grid w-full grid-cols-4 justify-items-stretch gap-1 p-1"
        style={{ height: "100dvh" }}
      >
        <GridItem title={'2 Year Goal'} input={goals[0].Input}>
          <FontAwesomeIcon icon={faBullseye} className="pl-2"/>
        </GridItem>
        <div className="grid-item-2 col-span-2 row-span-4 p-2">
          <div className="item-container h-full w-full rounded-3xl">
            <div className="title-container flex h-1/6 w-full items-center justify-center bg-white p-3">
              <div className="title text-5xl font-bold text-green-500">
                FocusOne
                <FontAwesomeIcon icon={faBullseye} className="pl-2"/>
              </div>
            </div>
            <div className="interactive h-5/6 w-full rounded-3xl bg-green-500 text-white p-3">
              <h1 className="right-now__title  text-2xl font-bold text-center">Things to Do Right Now</h1>
              <div className="my-6">
                <label htmlFor="goal-input" className="block mb-2 text-sm font-medium text-white"></label>
                <input 
                  type="text" 
                  ref={todoInput} 
                  value={mainInput} 
                  onChange={handleInputChange}
                  onKeyDown={handleEnterKeyPressed}
                  placeholder="Based on Daily Goal what can you do right now?" 
                  id="rightnow-goal-input" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:none focus:border-blue-500 block w-full p-2 dark:bg-green-600 dark:border-none dark:placeholder-gray-200 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"/>
                <Todos 
                  todos={todos} 
                  onEditTodo={handleEditTodo} 
                  onDeleteTodo={handleDeleteTodo}
                  startPomodoro={showModal}
                />
              </div>
            </div>
          </div>
        </div>
        
        <GridItem title={'Yearly Goal'} input={goals[1].input}/>
        <GridItem title={'Stats'} gridProps={'row-start-2 row-span-3'}>
          {/* <RenderLineChart /> */}
        </GridItem>
        <GridItem title={'Monthly Goal'} input={goals[2].input}/>
        <GridItem title={'Weekly Goal'} input={goals[3].input}/>
        <GridItem title={'Daily Goal'} input={goals[4].input}/>
        </div>
        </>
    )
}

export default GridLayout