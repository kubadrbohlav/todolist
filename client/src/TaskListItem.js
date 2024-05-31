import { Link } from "react-router-dom";

const TaskListItem = ({ tasklist }) => {
  return (
    <li>
      <Link to={`/list?id=${tasklist.id}`}>{tasklist.title}</Link>
    </li>
  );
};

export default TaskListItem;
