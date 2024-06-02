import { useContext } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { TaskContext } from "./TaskContext";
import TaskItem from "./TaskItem";
import AddTaskButton from "./AddTaskButton";

const TaskList = ({ deadlineUntil, done, withoutList }) => {
  const { tasks } = useContext(TaskContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  let tasklistId = null;
  if (location.pathname === "/list") {
    tasklistId = searchParams.get("id");
    if (!tasklistId) {
      navigate("/not-found");
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (tasklistId && task.tasklistId !== tasklistId) {
      return false;
    }
    if (done !== undefined && task.done !== done) {
      return false;
    }
    if (withoutList === true && task.tasklistId !== null) {
      return false;
    }
    if (deadlineUntil) {
      const maxDate = new Date(deadlineUntil).getTime();
      if (
        new Date(task.deadline).getTime() > maxDate ||
        new Date(task.deadline).getTime() <
          new Date(getCurrentDateFormatted()).getTime()
      ) {
        return false;
      }
    }

    return true;
  });
  return (
    <>
      <AddTaskButton />
      {filteredTasks.length > 0
        ? filteredTasks.map((task) => {
            return (
              <div className="task-item-wrapper" key={task.id}>
                <TaskItem task={task} key={task.id} />
              </div>
            );
          })
        : null}
      {filteredTasks.length === 0 ? (
        <div className={"alert alert-success"} role="alert">
          Máte všechno hotovo :)
        </div>
      ) : null}
    </>
  );
};

function getCurrentDateFormatted() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default TaskList;
