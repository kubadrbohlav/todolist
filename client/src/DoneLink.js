import { Link } from "react-router-dom";

const DoneLink = () => {
  return (
    <ul id="completed-link">
      <li>
        <Link to="/completed">Dokončené</Link>
      </li>
    </ul>
  );
};

export default DoneLink;
