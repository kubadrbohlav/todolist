import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button.js";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

import { TaskListContext } from "./TaskListContext";
import TaskListForm from "./TaskListForm";
import TaskListItem from "./TaskListItem";

const TaskListManager = () => {
  const { taskLists } = useContext(TaskListContext);
  const [showTasklistForm, setShowTasklistForm] = useState(false);
  return (
    <div id="tasklist-manager">
      <h2>Seznamy</h2>
      <Button onClick={() => setShowTasklistForm(true)} size={"sm"}>
        <Icon path={mdiPlus} size={0.7} />
      </Button>
      {!!showTasklistForm ? (
        <TaskListForm
          tasklist={showTasklistForm}
          setShowTasklistForm={setShowTasklistForm}
        />
      ) : null}
      <ul>
        {taskLists.map((tasklist) => {
          return <TaskListItem tasklist={tasklist} />;
        })}
      </ul>
    </div>
  );
};

export default TaskListManager;
