import React from "react";
import { useSelector } from "react-redux";
import Account from "../Account/Account";
import "./Suggestions.scss";

const Suggestions = () => {
  const profile = useSelector((state) => state.profile);
  const profiles = useSelector((state) => state.profiles);

  return (
    <div className="accounts" style={{ marginTop: "50px" }}>
      <div className="suggestions">
        <div>
          <div className="myAccount">
            <img src={profile.profile_img} alt="" />
            <div className="title">
              <p>{profile.username}</p>
              <p className="alpha">ИТ-компания</p>
            </div>
            <button className="change">Change</button>
          </div>
        </div>
        <div className="allSuggestions">
          <p className="alpha">Suggestions for you</p>
          <button>See all</button>
        </div>
      </div>
      <div>
        {profiles.map((item) => {
          return (
            <Account
              nickName={item.nickName}
              image={item.image}
              btn={item.btn}
              suggestion={item.suggestion}
              key={item.id}
            />
          );
        })}
      </div>
      <div className="subtitle">
        <p className="alpha">
          Information · Help · Prisoner · API · Job · Privacity · Conditions ·
          Locations · Trending accounts · Hashtags · Language
        </p>
        <p className="alpha">© 2022 INSTAGRAM FROM SIMMXS</p>
      </div>
    </div>
  );
};

export default Suggestions;
