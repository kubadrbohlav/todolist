import { useState } from "react";
import Button from "react-bootstrap/esm/Button.js";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

import TaskForm from "./TaskForm";

const AddTaskButton = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  return (
    <div className="add-task-wrapper">
      <Button onClick={() => setShowTaskForm(true)} size={"sm"}>
        <Icon path={mdiPlus} size={0.7} /> Přidat úkol
      </Button>
      {!!showTaskForm ? <TaskForm setShowTaskForm={setShowTaskForm} /> : null}
    </div>
  );
};

export default AddTaskButton;
