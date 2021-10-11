import React from "react";
import { UserMenu, MenuItemLink } from "react-admin";
import SettingsIcon from "@material-ui/icons/Settings";

const CustomeUserMenu = (props) => {
  return (
    <UserMenu label="Пользователь" {...props}>
      <MenuItemLink to="/profile" primaryText="Мой профиль" leftIcon={<SettingsIcon />} />
    </UserMenu>
  );
};

export default CustomeUserMenu;