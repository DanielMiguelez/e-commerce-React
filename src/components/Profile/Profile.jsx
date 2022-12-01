import React from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserState";
import "./Profile.scss";


const Profile = () => {
  const { getUserInfo, user, logout, register } = useContext(UserContext);
  const navigate = useNavigate()

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  if (!user) {
    return <span>Cargando...</span>;
  }
  return (
    <div>
      Profile {user.name}
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Profile;
