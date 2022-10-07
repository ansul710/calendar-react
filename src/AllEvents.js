import "./Calendar.css";
import "./AllEvents.css";
import image1 from "./delete.png";
// import image2 from "./delete-hover.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useEffect } from "react";

function AllEvents(props) {
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

  const [task, setTask] = useState("");
  const [takeTime, setTime] = useState();
  const [stateObj, setStateObj] = useState([]);

  function taskHandler(e) {
    setTask(e.target.value);
  }

  function timeHandler(e) {
    setTime(e.target.value);
  }

  useEffect(() => {
    console.log("day", props.day);
    console.log("task", task);
    console.log("time", takeTime);
    console.log("object", stateObj);
  });

  function sortArray(newObj) {
    newObj.map((value) =>
      value.tasks.sort((a, b) => {
        return a.time > b.time ? 1 : -1;
      })
    );
    return newObj;
    // console.log("obj", stateObj);
  }

  function addData() {
    const newObj = [...stateObj];

    const found = newObj.find((obj) => {
      return obj.day === props.day;
    });

    console.log("found", found);
    var index = newObj.indexOf(found);
    console.log("index", index);

    if (index >= 0) {
      newObj[index].tasks.push({ task: task, time: takeTime });
      const sortedArray = sortArray(newObj);
      setStateObj(sortedArray);
    } else {
      const obj = [
        ...stateObj,
        { day: props.day, tasks: [{ task: task, time: takeTime }] },
      ];

      setStateObj(sortArray(obj));
    }

    setIsOpen(false);
  }

  const filtered = stateObj.filter((obj) => {
    return obj.day === props.day;
  });
  console.log("filtered", filtered);

  function deleteData(e) {
    console.log("e", e);
    // console.log("index", i);
    console.log(
      "found object at",
      stateObj.findIndex((e) => e === e)
    );
  }

  return (
    <div>
      <div className="all-event-box">
        <div className="title pos">
          <h5>Tasks</h5>
        </div>
        {filtered <= 0 && <h5>No Tasks for today</h5>}
        <div>
          {filtered.map((item, index) => (
            <div key={index}>
              {/* <h5>{item.day}</h5> */}
              {item.tasks.map((task, i) => (
                <div
                  className="card"
                  style={{ marginBottom: "10px" }}
                  key={i}
                  onClick={deleteData}
                >
                  <p className="card-title card-header">{task.time}</p>
                  <p
                    className="card-body card-text"
                    style={{ padding: "10px" }}
                  >
                    {task.task}
                  </p>
                </div>
              ))}
            </div>
          ))}
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
                    value={task}
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
                <Button
                  onClick={deleteData}
                  className="delete-btn btn btn-light "
                >
                  <img
                    className="delete"
                    src={image1}
                    // onMouseOver={(e) => (e.currentTarget.src = { image2 })}
                    // onMouseOut={(e) => (e.currentTarget.src = { image1 })}
                    alt="delete"
                  />
                  {/* <img src={image1} alt="delete" className="delete" /> */}
                </Button>

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
        <button
          className="btn btn-light btn-md add-event-btn"
          style={{ border: "1px solid black" }}
          onClick={showModal}
        >
          <span>➕</span> Add Event
        </button>
      </div>
    </div>
  );
}

export default AllEvents;
