import { useContext } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { TaskContext } from "./TaskContext";

import TaskActionBar from "./TaskActionBar";

const TaskDetail = () => {
  const { tasks } = useContext(TaskContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const getTaskIndex = (id) => {
    return tasks.findIndex((task) => task.id === id);
  };

  const taskId = searchParams.get("id");
  if (!taskId || getTaskIndex(taskId) < 0) {
    navigate("/not-found");
  }

  const taskIndex = getTaskIndex(taskId);
  const task = tasks[taskIndex];
  return (
    <>
      <TaskActionBar task={task} />
    </>
  );
};

export default TaskDetail;
