import { useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { TaskListContext } from "./TaskListContext";

const TopBar = () => {
  const { taskLists } = useContext(TaskListContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  let heading;
  switch (location.pathname) {
    case "/list":
      const id = searchParams.get("id");
      const taskListIndex = taskLists.findIndex((e) => e.id === id);
      heading = taskLists[taskListIndex]?.title || null;
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
  return <div id="top-bar">{!!heading ? <h1>{heading}</h1> : null}</div>;
};

export default TopBar;
