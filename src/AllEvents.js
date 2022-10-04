import "./Calendar.css";
import "./AllEvents.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
// import { useRef } from "react";
import { useEffect } from "react";

function AllEvents() {
  // var today = new Date(),
  //   time =
  //     today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const [tasks, setTasks] = useState("");
  const [takeTime, setTime] = useState();
  const [stateObj, setStateObj] = useState({ task: "", time: "" });

  function taskHandler(e) {
    setTasks(e.target.value);
  }

  function timeHandler(e) {
    setTime(e.target.value);
  }

  useEffect(() => {
    console.log(tasks);
    console.log(takeTime);
    console.log(stateObj);
  });

  function addData() {
    setStateObj({ task: tasks, time: takeTime });
  }

  return (
    <div>
      <div className="all-event-box">
        <div className="title pos">
          <h5>Tasks</h5>
        </div>
        <div className="event-body">
          <Modal
            className="modal.fade.show"
            size="sm"
            show={isOpen}
            onHide={hideModal}
            centered
          >
            <Form>
              <Modal.Header>
                <Modal.Title>Add Tasks</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter Task</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter event"
                    name="task"
                    onChange={taskHandler}
                    value={tasks}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Time of the day</Form.Label>
                  <br />
                  <input
                    type="time"
                    id="appt"
                    name="takeTime"
                    min="00:00"
                    max="24:00"
                    required
                    onChange={timeHandler}
                    value={takeTime}
                  />
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Button className="btn btn-light" onClick={hideModal}>
                  Cancel
                </Button>
                <Button onClick={addData}>Save</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </div>
      <div className="bottom-div">
        <button className="btn btn-light btn-sm" onClick={showModal}>
          <span>➕</span> Add Event
        </button>
      </div>
    </div>
  );
}

export default AllEvents;
