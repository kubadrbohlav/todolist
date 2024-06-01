import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import TaskForm from "./TaskForm";
import ConfirmDeleteTaskDialog from "./ConfirmDeleteTaskDialog";
import { TaskContext } from "./TaskContext";

import Icon from "@mdi/react";
import {
  mdiPencil,
  mdiTrashCanOutline,
  mdiCalendarMonth,
  mdiFlag,
} from "@mdi/js";

const TaskActionBar = ({ task }) => {
  const navigate = useNavigate();
  const { state, handlerMap } = useContext(TaskContext);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showConfirmDeleteTaskDialog, setShowConfirmDeleteTaskDialog] =
    useState(false);

  if (!task) {
    navigate("/");
  }

  const closeDetail = () => {
    if (task.tasklistId) {
      navigate(`/list?id=${task.tasklistId}`);
    } else {
      navigate(-1);
    }
  };

  const handleCheckboxChange = async (e) => {
    const taskId = e.target.value;
    const taskDone = !!e.target.checked;

    try {
      await handlerMap.handleUpdate({
        id: taskId,
        done: taskDone,
      });
    } catch (e) {
      //todo
    }
  };

  return (
    <div className="task-action-bar">
      <CloseButton onClick={() => closeDetail()} />
      <Button onClick={() => setShowTaskForm(true)} size={"sm"}>
        <Icon path={mdiPencil} size={0.7} />
      </Button>
      <Button
        onClick={() => setShowConfirmDeleteTaskDialog(task)}
        size={"sm"}
        variant="danger"
      >
        <Icon path={mdiTrashCanOutline} size={0.7} />
      </Button>

      <input
        type="checkbox"
        class="custom-control-input"
        value={task?.id}
        key={task?.id}
        checked={task?.done}
        onChange={handleCheckboxChange}
      />

      <div className="deadline">
        <Icon path={mdiCalendarMonth} size={1} />
        <span>{formatDate(task?.deadline)}</span>
      </div>
      <div className="priority">
        <Icon path={mdiFlag} size={1} />
        <span>{printPriority(task.priority)}</span>
      </div>

      {!!showTaskForm ? (
        <TaskForm task={task} setShowTaskForm={setShowTaskForm} />
      ) : null}

      {!!showConfirmDeleteTaskDialog ? (
        <ConfirmDeleteTaskDialog
          task={task}
          setShowConfirmDeleteTaskDialog={setShowConfirmDeleteTaskDialog}
        />
      ) : null}
    </div>
  );
};

function formatDate(inputDate) {
  const days = [
    "Neděle",
    "Pondělí",
    "Úterý",
    "Středa",
    "Čtvrtek",
    "Pátek",
    "Sobota",
  ];
  const months = [
    "ledna",
    "února",
    "března",
    "dubna",
    "května",
    "června",
    "července",
    "srpna",
    "září",
    "října",
    "listopadu",
    "prosince",
  ];

  const date = new Date(inputDate);

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];

  return `${dayName}, ${day}. ${monthName}`;
}

function printPriority(prio) {
  const table = {
    none: "Žádná",
    low: "Malá",
    medium: "Střední",
    high: "Vysoká",
    critical: "Kritická",
  };

  return table[prio];
}

export default TaskActionBar;
