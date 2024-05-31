import { NavLink } from "react-router-dom";

const QuickLinks = () => {
  return (
    <ul id="quick-links">
      <li>
        <NavLink to="/today">Dnes</NavLink>
      </li>
      <li>
        <NavLink to="/next-7-days">Dalších 7 dní</NavLink>
      </li>
      <li>
        <NavLink to="/">Inbox</NavLink>
      </li>
    </ul>
  );
};

export default QuickLinks;
