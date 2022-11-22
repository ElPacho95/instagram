import "./Dropdown.scss";
import deleteIcon from "../assets/delete.png";
const Dropdown = (props) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">...</button>
      <div className="dropdown-content">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </div>
  );
};

export default Dropdown;
