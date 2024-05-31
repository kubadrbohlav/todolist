import { NavLink } from "react-router-dom";

const DoneLink = () => {
  return (
    <ul id="completed-link">
      <li>
        <NavLink to="/completed">Dokončené</NavLink>
      </li>
    </ul>
  );
};

export default DoneLink;
