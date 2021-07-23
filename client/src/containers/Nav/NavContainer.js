import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import { clearNotification } from "../../actions/GlobalActions";
import Nav from "../../components/Nav/Nav";

const NavContainer = () => {
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { videoMode, notification } = useSelector((state) => state.global);

  useEffect(() => {
    if (notification.message) {
      setOpenNoti(true);
    }
    setOpenMobile(false);
  }, [notification, videoMode]);

  const handleNotiClose = () => {
    dispatch(clearNotification);
    setOpenNoti(false);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerToggleMobile = () => {
    setOpenMobile(!openMobile);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

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
      videoMode={videoMode}
    />
  );
};

export default NavContainer;
