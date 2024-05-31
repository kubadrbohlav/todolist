import QuickLinks from "./QuickLinks";
import TaskListManager from "./TaskListManager";
import DoneLink from "./DoneLink";

const Sidebar = () => {
  return (
    <>
      <QuickLinks />
      <TaskListManager />
      <DoneLink />
    </>
  );
};

export default Sidebar;
