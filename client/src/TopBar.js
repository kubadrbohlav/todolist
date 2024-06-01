import { useContext, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { TaskListContext } from "./TaskListContext";
import { TaskContext } from "./TaskContext";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import TaskListForm from "./TaskListForm";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";

const TopBar = () => {
  const { taskLists } = useContext(TaskListContext);
  const { tasks } = useContext(TaskContext);
  const [showTasklistForm, setShowTasklistForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  let heading;
  let tasklist;
  let isTasklistPage = false;
  switch (location.pathname) {
    case "/list":
      const id = searchParams.get("id");
      const taskListIndex = taskLists.findIndex((e) => e.id === id);
      heading = taskLists[taskListIndex]?.title || null;
      tasklist = taskLists[taskListIndex];
      isTasklistPage = true;
      break;
    case "/":
      heading = "Inbox";
      break;
    case "/today":
      heading = "Dnes";
      break;
    case "/next-7-days":
      heading = "Dalších 7 dní";
      break;
    case "/completed":
      heading = "Dokončené";
      break;
    default:
      heading = null;
  }

  if (location.pathname === "/task") {
    const id = searchParams.get("id");
    const taskIndex = tasks.findIndex((e) => e.id === id);
    const tasklistId = tasks[taskIndex].tasklistId;
    if (tasklistId) {
      const taskListIndex = taskLists.findIndex((e) => e.id === tasklistId);
      heading = taskLists[taskListIndex]?.title || null;
    }
  }

  return (
    <div id="top-bar" className={isTasklistPage ? "is-tasklist" : undefined}>
      {!!heading ? <h1>{heading}</h1> : null}
      <Button onClick={() => setShowTasklistForm(true)} size={"sm"}>
        <Icon path={mdiPencil} size={0.7} />
      </Button>
      <Button
        onClick={() => setShowConfirmDeleteDialog(tasklist)}
        size={"sm"}
        variant="danger"
      >
        <Icon path={mdiTrashCanOutline} size={0.7} />
      </Button>
      {!!showTasklistForm ? (
        <TaskListForm
          tasklist={tasklist}
          setShowTasklistForm={setShowTasklistForm}
        />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          tasklist={tasklist}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
    </div>
  );
};

export default TopBar;
