/* prettier-ignore */
import React, {useState} from "react"
import Modal from "react-modal";
import GridLayout from "./components/GridLayout";
import Pomodoro from "./components/Pomodoro"
import "./css/App.css";


function App() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [task, setTask] = useState('')

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
      height: "75vh",
      padding: "0",
      transform: "translate(-50%, -50%)",
    },
  };

  const showModal = (name) => {
    setTask(name)
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      <GridLayout showModal={showModal}/>

      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Pomodoro Modal"
        ariaHideApp={false}
      >
        <Pomodoro task={task} closeModal={closeModal} />
      </Modal>
      
    </>
  );
}

export default App;
