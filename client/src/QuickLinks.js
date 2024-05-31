import { Link } from "react-router-dom";

const QuickLinks = () => {
  return (
    <ul id="quick-links">
      <li>
        <Link to="/today">Dnes</Link>
      </li>
      <li>
        <Link to="/next-7-days">Dalších 7 dní</Link>
      </li>
      <li>
        <Link to="/">Inbox</Link>
      </li>
    </ul>
  );
};

export default QuickLinks;
