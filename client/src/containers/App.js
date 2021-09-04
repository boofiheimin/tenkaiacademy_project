import { useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@material-ui/core";

import { authen } from "../actions/AuthActions";
import PrivateRoute from "./Routing/privateRoute";

import Nav from "./Nav/nav.container";
import Login from "./Login/login.container";
import Landing from "./Landing/landing.container";
import Streams from "./Streams/streams.container";
import Stream from "./Stream/stream.container";
import StreamEdit from "./StreamEdit/streamEdit.container";
import Clips from "./Clips/clips.container";
import Clip from "./Clip/clip.container";
import ClipEdit from "./ClipEdit/clipEdit.container";
import Tags from "./Tags/tags.container";
import Music from "./Music/music.container";
import MusicEdit from "./MusicEdit/musicEdit.container";
import Artists from "./Artists/artists.container";
import NotFound from "./NotFound/notFound.container";

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
              <Route path="/" element={<Clips />} />
              <Route path="/:id" element={<Clip />} />
              <PrivateRoute path="/:id/edit" element={<ClipEdit />} />
            </Route>
            <Route path="music">
              <Route path="/" element={<Music />} />
              <PrivateRoute path="/edit" element={<MusicEdit />} />
            </Route>
            <PrivateRoute path="tags" element={<Tags />} />
            <PrivateRoute path="artists" element={<Artists />} />
            <PrivateRoute path="songs" element={<Tags />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
