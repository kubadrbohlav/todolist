import { useContext } from "react";
import { Link } from "react-router-dom";

import { TaskContext } from "./TaskContext";

const TaskItem = ({ task }) => {
  const { handlerMap } = useContext(TaskContext);

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

  const idParam = `id=${task.id}`;

  return (
    <div className="task-item">
      <Link to={`/task?${idParam}`}>{task.title}</Link>
      <div className="deadline">{formattedDate(task.deadline)}</div>
      <input
        type="checkbox"
        className={"custom-control-input"}
        value={task.id}
        key={task.id}
        checked={task.done}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
    "led",
    "úno",
    "bře",
    "dub",
    "kvě",
    "čvn",
    "čvc",
    "srp",
    "zář",
    "říj",
    "lis",
    "pro",
  ];

  // Get the day, month, and year from the date
  const day = date.getDate();
  const month = date.getMonth();

  // Format the date as "25. dub"
  const formattedDate = `${day}. ${months[month]}`;

  return formattedDate;
};

export default TaskItem;
