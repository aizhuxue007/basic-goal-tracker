// put old modal in here so you don't recode
import React, {useState} from "react";
import Goals from "./Goals";
import Button from "./Button";
import Modal from "react-modal";
import Pomodoro from "./Pomodoro";

const OldLayout = () => {
  let task = "Go exercise for 20 minutes";
  const [isOpenModal, setIsOpenModal] = useState(false);
  const customStyles = {
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
      width: "75%",
      height: "75%",
      padding: "0",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

  const showModal = () => {
    setIsOpenModal(true);
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpenModal(false);
  }
  return (
    <>
      <Goals />
      <div className="flex justify-center">
        <Button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-400"
          content={`Start Working`}
          onClick={showModal}
        />
      </div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Pomodoro task={task} closeModal={closeModal} />
      </Modal>
    </>
  );
};
export default OldLayout;
