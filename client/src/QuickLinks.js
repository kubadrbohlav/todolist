import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCalendarMonth, mdiInbox } from "@mdi/js";

const QuickLinks = () => {
  return (
    <ul id="quick-links">
      <li>
        <NavLink to="/today">
          <Icon path={mdiCalendarMonth} size={1} />
          <span>Dnes</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/next-7-days">
          <Icon path={mdiCalendarMonth} size={1} />
          <span>Dalších 7 dní</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/">
          <Icon path={mdiInbox} size={1} />
          <span>Inbox</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default QuickLinks;
