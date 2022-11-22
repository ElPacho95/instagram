import React from "react";
import "./Account.scss";

const Account = ({ suggestion, nickName, image, btn }) => {
  return (
    <div className="suggestions">
      <div>
        <div className="suggestionsAccount">
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
