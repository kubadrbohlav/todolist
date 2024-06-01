import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskListContext } from "./TaskListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function TaskListForm({ setShowTasklistForm, tasklist }) {
  const navigate = useNavigate();
  const { state, handlerMap } = useContext(TaskListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowTasklistForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          try {
            if (tasklist?.id) {
              formData.id = tasklist.id;
              await handlerMap.handleUpdate(formData);
            } else {
              const newTasklist = await handlerMap.handleCreate(formData);
              navigate(`/list?id=${newTasklist.id}`);
            }

            setShowTasklistForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>
            {tasklist?.id
              ? `Upravit seznam: ${tasklist?.title}`
              : "Vytvořit seznam"}
          </Modal.Title>
          <CloseButton onClick={() => setShowTasklistForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Nepodařilo se vytvořit seznam</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Název</Form.Label>
            <Form.Control
              type="text"
              minLength={1}
              name="title"
              // required
              defaultValue={tasklist?.title ? tasklist.title : undefined}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowTasklistForm(false)}
            disabled={isPending}
          >
            Zavřít
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {tasklist?.id ? "Upravit" : "Vytvořit"}
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

export default TaskListForm;
