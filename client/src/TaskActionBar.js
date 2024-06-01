import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import TaskForm from "./TaskForm";

import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";

const TaskActionBar = ({ task }) => {
  const navigate = useNavigate();
  const [showTaskForm, setShowTaskForm] = useState(false);

  const closeDetail = () => {
    if (task.tasklistId) {
      navigate(`/list?id=${task.tasklistId}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="task-action-bar">
      <CloseButton onClick={() => closeDetail()} />
      <Button onClick={() => setShowTaskForm(true)} size={"sm"}>
        <Icon path={mdiPencil} size={0.7} />
      </Button>

      {!!showTaskForm ? (
        <TaskForm task={task} setShowTaskForm={setShowTaskForm} />
      ) : null}
    </div>
  );
};

export default TaskActionBar;
