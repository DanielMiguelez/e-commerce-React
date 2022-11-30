import React from 'react'
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext/UserState";
import './Profile.scss'

const Profile = () => {
  const { getUserInfo, user } = useContext(UserContext);
  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
    }, []);
    if (!user) {
      return <span>Cargando...</span>;
      }
      return <div>Profile {user.name}</div>;
};

export default Profile