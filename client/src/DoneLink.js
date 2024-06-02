import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCheckCircle } from "@mdi/js";

const DoneLink = () => {
  return (
    <ul id="completed-link">
      <li>
        <NavLink to="/completed">
          <Icon path={mdiCheckCircle} size={1} />
          <span>Dokončené</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default DoneLink;
