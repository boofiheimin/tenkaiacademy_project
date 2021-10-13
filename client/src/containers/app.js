import { useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StyledEngineProvider } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { authen } from "../actions/auth.actions";
import PrivateRoute from "./routing/privateRoute";

import Nav from "./nav/nav.container";
import Login from "./login/login.container";
import Landing from "./landing/landing.container";
import Streams from "./streams/streams.container";
import Stream from "./stream/stream.container";
import StreamEdit from "./streamEdit/streamEdit.container";
import Clips from "./clips/clips.container";
import Clip from "./clip/clip.container";
import ClipEdit from "./clipEdit/clipEdit.container";
import Tags from "./tags/tags.container";
import Music from "./music/music.container";
import MusicEdit from "./musicEdit/musicEdit.container";
import Artists from "./artists/artists.container";
import Songs from "./songs/songs.container";

import NotFound from "./notFound/notFound.container";

import "simplebar/dist/simplebar.min.css";
import "./app.css";

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
        mode: siteMode,
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
    <StyledEngineProvider injectFirst>
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
              <PrivateRoute path="songs" element={<Songs />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
