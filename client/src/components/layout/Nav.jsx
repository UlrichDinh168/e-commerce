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
import { useOnClickOutside } from "hooks";
import { usePrevious } from "hooks/auth";
// Assets
import { logo, bg, menu, close } from "assets";
import { ROUTER_PATH, USER_ROLE } from "constants";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const user = useSelector((state) => state.user);

  const userRole = useSelector((state) => state.user.role);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const [currentPath, setCurrentPath] = useState(history.location.pathname);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, [offset]);

  useOnClickOutside(wrapperRef, () => {
    if (!openDrawer) {
      setOpenDrawer(false);
      console.log("clicked");
    }
  });

  const onToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      return () => window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (offset > 0) setOpenDrawer(true);
  }, [offset]);

  useEffect(() => {
    setCurrentPath(history.location.pathname);
  }, [history.location.pathname]);

  useEffect(() => {
    if (width > 900) return onToggleDrawer(false);
  }, [width]);

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
    <header ref={wrapperRef} className={offset > 0 ? "sticky" : ""}>
      <img src={bg} alt="background" className="banner" />
      <a href="#" className="logo">
        Brand.
      </a>
      {offset > 0 && (
        <div className="toggle" onClick={onToggleDrawer}>
          {openDrawer ? (
            <i className="fas fa-align-justify"></i>
          ) : (
            <i className="fas fa-times"></i>
          )}
        </div>
      )}
      <nav>
        <div
          className={`container ${
            userRole === USER_ROLE.PLATER ? "user" : null
          } ${openDrawer ? "" : "inactive"}`}
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
