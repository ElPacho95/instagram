import "./Dropdown.scss";

const Dropdown = ({ openEditModal, deletePost }) => {
  return (
    <div className="dropdown">
      <div className="options">...</div>
      <div className="dropdown-content">
        <button onClick={openEditModal} className="change">
          Change
        </button>
        <button onClick={deletePost} className="delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
