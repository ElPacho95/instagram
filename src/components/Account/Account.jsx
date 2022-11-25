import "./Account.scss";

const Account = ({ suggestion, nickName, image, btn }) => {
  return (
    <div className="suggestions">
      <div>
        <div className="suggestions-account">
          <img src={image} alt="" />
          <div className="title">
            <p className="nickname">{nickName}</p>
            <p className="alpha">{suggestion}</p>
          </div>
          <button className="follow">{btn}</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
