import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import Nav from "../../components/Nav/Nav";

const NavContainer = () => {
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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

  return (
    <Nav
      open={open}
      openMobile={openMobile}
      handleDrawerToggle={handleDrawerToggle}
      handleDrawerToggleMobile={handleDrawerToggleMobile}
      onLogout={handleLogout}
      isLogin={localStorage.getItem("authToken")}
      username={auth?.user?.username}
    />
  );
};

export default NavContainer;
