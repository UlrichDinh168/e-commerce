/**
 *
 * @author Trung H <trung@vertics.co>
 *
 * @copyright Vertics Oy 2020
 */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// Actions
import { loginActions } from "actions";

// Assets
import { logo, bg } from "assets";
import { ROUTER_PATH, USER_ROLE } from "constants";
import { useHistory } from "react-router-dom";
import Drawer from "../../shared/Drawer";

const Nav = ({ navStatus = false, onClick }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const userRole = useSelector((state) => state.user.role);

  const [currentPath, setCurrentPath] = useState(history.location.pathname);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);
  console.log(offset);

  const isMobile = width <= 900 ? true : false;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      return () => window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setCurrentPath(history.location.pathname);
  }, [history.location.pathname]);

  const navigateTo = (path) => {
    let navigationLocation = path;

    if (!navigationLocation) {
      navigationLocation = "/";
    }
    if (
      window.location.href ===
      window.location.origin + (!!navigationLocation ? navigationLocation : "/")
    ) {
      /* Navigation to the same page prevented */
    } else {
      history.push(navigationLocation);
    }
  };

  const signOut = () => {
    dispatch(loginActions.logout());
    localStorage.removeItem("refreshToken");
    history.push(ROUTER_PATH.LOGIN);
  };

  const onToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const renderNavItem = ({ path, iconClassName, name, popupItems }) => (
    <div
      className={`nav__item-container ${
        currentPath === path || popupItems.includes(currentPath.substring(1))
          ? "is-active"
          : ""
      }`}
      key={name}
      onClick={() => {
        if (popupItems.length > 0) {
        } else {
          navigateTo(path);
          onClick();
        }
      }}
      to={path}
    >
      <i className={`nav__item-icon fal ${iconClassName}`} />
      {name}
      {popupItems.length > 0 ? <>{renderNavPopupItem(popupItems)}</> : null}
    </div>
  );

  const renderNavPopupItem = (popupItems) => (
    <div className="nav__item-popup">
      {popupItems.map((item, index) => (
        <div
          key={"popupitem" + index}
          className="nav__item-popup-item"
          onClick={() => {
            history.push("/" + item);
            onClick();
          }}
        >
          <div className="btn btn--transparent item_list">{item}</div>
        </div>
      ))}
    </div>
  );

  const navigationItemsAdmin = [
    {
      path: ROUTER_PATH.HOME,
      name: "Home",
      popupItems: [],
    },
  ];

  const navigationItemsUser = [
    {
      path: ROUTER_PATH.SIGNIN,
      name: "Sign In",
      iconClassName: "fa-sign-in-alt",
      popupItems: [],
    },
    {
      path: ROUTER_PATH.FAVORITE,
      name: "Favorite",
      iconClassName: "fa-heart",
      popupItems: [],
    },
    {
      path: ROUTER_PATH.CART,
      name: "Cart",
      iconClassName: "fa-shopping-cart",
      popupItems: [],
    },
  ];
  return (
    <header className={offset > 0 ? "sticky" : ""}>
      <img src={bg} alt="background" className="banner" />
      <a href="#" className="logo">
        Brand.
      </a>
      <nav className={navStatus ? "" : "nav--closed"}>
        <div
          className={`container ${
            userRole === USER_ROLE.PLATER ? "user" : null
          }`}
        >
          {user.role === USER_ROLE.ADMIN || user.role === undefined
            ? navigationItemsUser.map(renderNavItem)
            : navigationItemsAdmin.map(renderNavItem)}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
