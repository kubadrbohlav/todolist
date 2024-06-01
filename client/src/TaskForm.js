import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "./TaskContext.js";
import { TaskListContext } from "./TaskListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function TaskForm({ setShowTaskForm, task }) {
  const navigate = useNavigate();
  const { state, handlerMap } = useContext(TaskContext);
  const { taskLists } = useContext(TaskListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowTaskForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          try {
            if (task?.id) {
              formData.id = task.id;
              await handlerMap.handleUpdate(formData);
            } else {
              const newTask = await handlerMap.handleCreate(formData);
              navigate(`/task?id=${newTask.id}`);
            }

            setShowTaskForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>
            {task?.id ? `Upravit úkol: ${task?.title}` : "Přidat úkol"}
          </Modal.Title>
          <CloseButton onClick={() => setShowTaskForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Nepodařilo se přidat úkol</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3">
            <Form.Label>Název</Form.Label>
            <Form.Control
              type="text"
              minLength={1}
              name="title"
              // required
              defaultValue={task?.title ? task.title : undefined}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Datum</Form.Label>
            <Form.Control
              type="date"
              name="deadline"
              // required
              defaultValue={
                task?.deadline ? eventDateToInput(task.deadline) : undefined
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priorita</Form.Label>
            <Form.Select name="priority">
              <option value="none">Žádná</option>
              <option value="low">Malá</option>
              <option value="medium">Střední</option>
              <option value="high">Vysoká</option>
              <option value="critical">Kritická</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Seznam</Form.Label>
            <Form.Select name="tasklistId">
              <option>Vyberte seznam</option>
              {taskLists.map((tasklist) => {
                return <option value={tasklist.id}>{tasklist.title}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Popis</Form.Label>
            <textarea class="form-control" name="description"></textarea>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowTaskForm(false)}
            disabled={isPending}
          >
            Zavřít
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {task?.id ? "Upravit" : "Přidat"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

function eventDateToInput(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default TaskForm;
