import { Link, useLocation } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCircleSmall } from "@mdi/js";

const TaskListItem = ({ tasklist }) => {
  const location = useLocation();
  const idParam = `id=${tasklist.id}`;

  const isActiveLink =
    location.pathname === "/list" && location.search.includes(idParam);

  return (
    <li>
      <Link
        to={`/list?${idParam}`}
        className={isActiveLink ? "active" : undefined}
      >
        <Icon path={mdiCircleSmall} size={1} />
        <span>{tasklist.title}</span>
      </Link>
    </li>
  );
};

export default TaskListItem;
