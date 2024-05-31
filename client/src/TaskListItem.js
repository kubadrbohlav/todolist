import { Link, useLocation } from "react-router-dom";

const TaskListItem = ({ tasklist }) => {
  const location = useLocation();
  const idParam = `id=${tasklist.id}`;

  const isActiveLink =
    location.pathname === "/list" && location.search.includes(idParam);
  console.log(isActiveLink);
  console.log(location.search);
  return (
    <li>
      <Link
        to={`/list?${idParam}`}
        className={isActiveLink ? "active" : undefined}
      >
        {tasklist.title}
      </Link>
    </li>
  );
};

export default TaskListItem;
