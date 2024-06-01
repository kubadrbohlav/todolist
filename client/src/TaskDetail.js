import { useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { TaskContext } from "./TaskContext";

import TaskActionBar from "./TaskActionBar";

const TaskDetail = () => {
  const { tasks } = useContext(TaskContext);
  const [searchParams] = useSearchParams();
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
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </>
  );
};

export default TaskDetail;
