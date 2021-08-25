/**
 * Navbar component
 */

import React, { useEffect } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// components
import MenuItem from "@material-ui/core/MenuItem";
import Button from "shared/Button";
import Menu from "shared/Menu";
import { userActions } from "actions";
// helper
import { userUtils } from "helpers";
// actions
import { loginActions } from "actions";
// constants
import { ROUTER_PATH, GROUP_VALUES } from "constants";

const Nav = () => {
  const user = useSelector((state) => userActions.getUser(state.user));

  const dispatch = useDispatch();

  const navData = [
    {
      label: "Home",
      route: ROUTER_PATH.home,
      access: [GROUP_VALUES.staff],
    },
    {
      label: "Admin",
      // route: ROUTER_PATH.admin,
      // access: [GROUP_VALUES.staff]
      data: [
        {
          label: "Organizations",
          route: ROUTER_PATH.organizations,
          access: [GROUP_VALUES.admin],
        },
        {
          label: "Users",
          route: ROUTER_PATH.users,
          access: [GROUP_VALUES.admin],
        },
        {
          label: "Files",
          route: ROUTER_PATH.files,
          access: [GROUP_VALUES.admin],
        },
      ],
    },
    {
      label: "Settings",
      route: ROUTER_PATH.settings,
      access: [GROUP_VALUES.staff],
    },

    {
      label: "Developer Playground",
      route: ROUTER_PATH.dev_playground,
      access: [GROUP_VALUES.admin],
    },
    {
      label: "Form",
      data: [
        {
          label: "Form template",
          route: "/form-template/new",
          access: [GROUP_VALUES.admin],
        },
        {
          label: "Form templates",
          route: ROUTER_PATH.formTemplates,
          access: [GROUP_VALUES.admin],
        },
      ],
    },
  ];

  const renderMenu = ({ label, data, route, access }, i) => {
    if (data && data.length) {
      return <Menu data={data} label={label} key={i} user={user} />;
    }
    const isRoleValid = userUtils.isUserRoleValid(user.groups, access);
    if (!isRoleValid) {
      return null;
    }
    if (!data || !data.length) {
      return (
        <NavLink to={route} key={i}>
          <MenuItem>{label}</MenuItem>
        </NavLink>
      );
    }
  };
  const renderMenuList = () => {
    if (!navData || !navData.length) {
      return null;
    }
    return navData.map(renderMenu);
  };
  const logout = () => dispatch(loginActions.Logout());

  return (
    <nav>
      <div className="nav__content">
        {/* <img src={logo ? logo : null} alt="logo" /> */}
        <div className="nav__content-menus">{renderMenuList()}</div>
        <div className="nav__content-control">
          <Button text="Log out" onClick={logout} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
