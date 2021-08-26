/**
 *
 * @author Trung H <trung@vertics.co>
 *
 * @copyright Vertics Oy 2020
 */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { loginActions } from "actions";
import useOnClickOutside from "hooks/useOnClickOutside";

// Assets
import { logo, bg, menu, close } from "assets";
import { ROUTER_PATH, USER_ROLE } from "constants";
import { useHistory } from "react-router-dom";

const Nav = ({ openDrawer = false, onToggleDrawer }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const user = useSelector((state) => state.user);
  const userRole = useSelector((state) => state.user.role);

  const [currentPath, setCurrentPath] = useState(history.location.pathname);
  const [width, setWidth] = useState(window.innerWidth);
  const [offset, setOffset] = useState(0);

  useOnClickOutside(wrapperRef, () => {
    if (openDrawer) {
      onToggleDrawer();
    }
  });

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);

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

  useEffect(() => {
    if (width > 900) setOpenDrawer(false);
  }, [width]);

  const signOut = () => {
    dispatch(loginActions.logout());
    localStorage.removeItem("refreshToken");
    history.push(ROUTER_PATH.LOGIN);
  };

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
      // iconClassName: "fa-sign-in-alt",
      popupItems: [],
    },
    {
      path: ROUTER_PATH.FAVORITE,
      name: "Favorite",
      // iconClassName: "fa-heart",
      popupItems: [],
    },
    {
      path: ROUTER_PATH.CART,
      name: "Cart",
      // iconClassName: "fa-shopping-cart",
      popupItems: [],
    },
  ];

  return (
    <header className={offset > 0 ? "sticky" : ""}>
      <img src={bg} alt="background" className="banner" />
      <a href="#" className="logo">
        Brand.
      </a>
      <div className="toggle" onClick={onToggleDrawer} ref={wrapperRef}>
        {!openDrawer ? (
          <i className="fas fa-align-justify"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </div>
      <nav className={!openDrawer ? "" : "active"}>
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
