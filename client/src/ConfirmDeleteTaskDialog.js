import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "./TaskContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function ConfirmDeleteTaskDialog({ setShowConfirmDeleteTaskDialog, task }) {
  const navigate = useNavigate();
  const { state, handlerMap } = useContext(TaskContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowConfirmDeleteTaskDialog(false)}>
      <Modal.Header>
        <Modal.Title>Smazat úkol</Modal.Title>
        <CloseButton onClick={() => setShowConfirmDeleteTaskDialog(false)} />
      </Modal.Header>
      <Modal.Body style={{ position: "relative" }}>
        <Alert
          show={!!showAlert}
          variant="danger"
          dismissible
          onClose={() => setShowAlert(null)}
        >
          <Alert.Heading>Nepodařilo se smazat úkol</Alert.Heading>
          <pre>{showAlert}</pre>
        </Alert>
        {isPending ? (
          <div style={pendingStyle()}>
            <Icon path={mdiLoading} size={2} spin />
          </div>
        ) : null}
        Opravdu chcete smazat úkol {task.title}?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowConfirmDeleteTaskDialog(false)}
          disabled={isPending}
        >
          Zavřít
        </Button>
        <Button
          variant="danger"
          disabled={isPending}
          onClick={async (e) => {
            try {
              await handlerMap.handleDelete({ id: task.id });
              setShowConfirmDeleteTaskDialog(false);
              navigate("/");
            } catch (e) {
              console.error(e);
              setShowAlert(e.message);
            }
          }}
        >
          Smazat
        </Button>
      </Modal.Footer>
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

export default ConfirmDeleteTaskDialog;
