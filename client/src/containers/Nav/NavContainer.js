import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import Nav from "../../components/Nav/Nav";

const NavContainer = () => {
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification.message) {
      setOpenNoti(true);
    }
  }, [notification]);

  const handleNotiClose = () => {
    setOpenNoti(false);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
    setOpenMobile(!open);
  };

  const handleDrawerToggleMobile = () => {
    setOpenMobile(!openMobile);
    setOpen(!openMobile);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  console.log(openNoti);

  return (
    <Nav
      open={open}
      openMobile={openMobile}
      handleDrawerToggle={handleDrawerToggle}
      handleDrawerToggleMobile={handleDrawerToggleMobile}
      onLogout={handleLogout}
      isLogin={localStorage.getItem("authToken")}
      username={auth?.user?.username}
      notification={notification}
      onNotiClose={handleNotiClose}
      openNoti={openNoti}
    />
  );
};

export default NavContainer;
