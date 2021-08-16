import { useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@material-ui/core";

import { authen } from "../actions/AuthActions";
import PrivateRoute from "./Routing/PrivateRoute";

import Nav from "./Nav/NavContainer";
import Login from "./Login/LoginContainer";
import Landing from "./Landing/LandingContainer";
import Streams from "./Streams/StreamsContainer";
import Stream from "./Stream/StreamContainer";
import StreamEdit from "./StreamEdit/StreamEditContainer";
import Clips from "./Clips/ClipsContainer";
import Tags from "./Tags/TagsContainer";
import NotFound from "./NotFound/NotFoundContainer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const dispatch = useDispatch();
  const { siteMode } = useSelector((state) => state.global);
  const theme = useMemo(() =>
    createTheme({
      palette: {
        type: siteMode,
      },
      typography: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
      },
    })
  );

  useEffect(() => {
    dispatch(authen());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Nav />}>
            <Route path="/" element={<Landing />} />
            <Route path="streams">
              <Route path="/" element={<Streams />} />
              <Route path="/:id" element={<Stream />} />
              <PrivateRoute path="/:id/edit" element={<StreamEdit />} />
            </Route>
            <Route path="clips">
              <Route path="/" element={<Streams />} />
            </Route>
            <Route path="clips" element={<Clips />} />
            <PrivateRoute path="tags" element={<Tags />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
