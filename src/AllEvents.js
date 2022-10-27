import "./Calendar.css";
import "./AllEvents.css";
import image1 from "./delete.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useEffect } from "react";

function AllEvents(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();
  const [eventAdd, setEventAdd] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [initial, setInitial] = useState(true);

  const showModal = () => {
    setEventAdd(true);
    setIsOpen(true);
  };

  const handleSelect = (day, id) => {
    const filtered_obj = stateObj.filter((obj) => {
      return obj.day === day;
    });
    const filtered_task = filtered_obj[0].tasks.filter((task) => {
      return task.id === id;
    });
    setSelectedItem({ obj: filtered_task, day: day, id: id });
    console.log("Selected item is: ", selectedItem);
    setIsOpen(true);
  };

  const hideModal = (id) => {
    setIsOpen(false);
    // setSelectedItem(undefined);
    console.log(id);
    // if (!id) {
    //   setEventAdd(false);
    // }
  };

  const hideAddEventModal = () => {
    setIsOpen(false);
    setEventAdd(false);
  };

  const [task, setTask] = useState("");
  const [takeTime, setTime] = useState();
  const [stateObj, setStateObj] = useState([]);

  function taskHandler(e) {
    console.log("e", e);
    console.log("e-value", e.target.value);
    setTask(e.target.value);
  }

  function timeHandler(e) {
    setTime(e.target.value);
  }

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await fetch(
          "https://calendar-react-e9101-default-rtdb.firebaseio.com/tasks.json",
          {
            method: "PUT",
            body: JSON.stringify(stateObj),
          }
        );
        // setSpinner(false);
        setDataChanged(false);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://calendar-react-e9101-default-rtdb.firebaseio.com/tasks.json"
        );

        const data = await response.json();
        if (data !== null) {
          console.log(data);
          setStateObj(data);
        } else {
          setStateObj([]);
        }
        setInitial(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (dataChanged === true) {
      console.log("inside post data");
      postData();
    } else if (initial === true && !dataChanged) {
      console.log("inside fetch data");
      fetchData();
    }
  }, [stateObj]);

  function sortArray(newObj) {
    newObj.map((value) =>
      value.tasks.sort((a, b) => {
        return a.time > b.time ? 1 : -1;
      })
    );
    return newObj;
  }

  function addData() {
    const newObj = [...stateObj];
    const id = props.day + "_" + Math.floor(Math.random() * 10000);
    console.log("id ----------", id);

    const found = newObj.find((obj) => {
      return obj.day === props.day;
    });

    var index = newObj.indexOf(found);
    console.log("task is --->:", task);
    if (index >= 0) {
      newObj[index].tasks.push({ id: id, task: task, time: takeTime });
      const sortedArray = sortArray(newObj);
      setStateObj(sortedArray);
    } else {
      const obj = [
        ...stateObj,
        { day: props.day, tasks: [{ id: id, task: task, time: takeTime }] },
      ];
      setStateObj(sortArray(obj));
    }
    setIsOpen(false);
    setTime("");
    setTask("");
    setEventAdd(false);
    setDataChanged(true);
  }

  const filtered = stateObj.filter((obj) => {
    return obj.day === props.day;
  });

  function deleteData(day, id) {
    setEventAdd(false);
    if (day !== undefined || id !== undefined) {
      console.log("day", day);
      for (let a = 0; a <= stateObj.length; a++) {
        if (stateObj[a].day === day) {
          for (let b = 0; b <= stateObj[a].tasks.length; b++) {
            if (stateObj[a].tasks[b].id === id) {
              stateObj[a].tasks.splice(b, 1);
              console.log("New object is:", stateObj[a].tasks);
              if (stateObj[a].tasks.length === 0) {
                const no_day = stateObj.filter((obj) => {
                  return obj.day !== day;
                });
                setStateObj(no_day);
                setSelectedItem(undefined);
              }
              break;
            } else {
              console.log("OBJECT NOT FOUND");
            }
          }
          break;
        } else {
          console.log("No day");
        }
      }
    } else {
      console.log("empty tasks");
    }
    setIsOpen(false);
    setTime("");
    setTask("");
    setDataChanged(true);
  }

  return (
    <>
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
                    key={task.id}
                    id={task.id}
                    onClick={() => handleSelect(item.day, task.id)}
                  >
                    <p className="card-title card-header">{task.time}</p>
                    {/* <p className="card-title card-header">{task.id}</p> */}

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
            {/* -------------------------------------------------------------------------------------------------------- */}
            {/* this modal is when user want to edit or delete data */}
            {selectedItem !== undefined && !eventAdd ? (
              <Modal
                className="modal.fade.show"
                size="md"
                show={isOpen}
                onHide={hideModal}
                centered
              >
                {console.log("selectedone")}
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
                        value={selectedItem.obj[0].task}
                        disabled
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
                        value={selectedItem.obj[0].time}
                        disabled
                      />
                    </Form.Group>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      onClick={() => {
                        deleteData(selectedItem.day, selectedItem.id);
                      }}
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
                    <Button onClick={addData} disabled>
                      Save
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            ) : (
              // --------------------------------------------------------------------------------------------------
              // this modal is for the very first time when user need to add new event
              <Modal
                className="modal.fade.show"
                size="md"
                show={isOpen}
                onHide={hideAddEventModal}
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
                        // value={task}
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
                        // value={takeTime}
                      />
                    </Form.Group>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      className="btn btn-light"
                      onClick={hideAddEventModal}
                    >
                      Cancel
                    </Button>
                    <Button onClick={addData}>Save</Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            )}
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
    </>
  );
}

export default AllEvents;
