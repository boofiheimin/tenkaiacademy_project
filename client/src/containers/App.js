import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

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

const theme = createTheme({
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authen());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Nav />}>
            <Route path="/" element={<Landing />} />
            <Route path="streams">
              <Route path="/" element={<Streams />} />
              <Route path="/:id" element={<Stream />} />
              <PrivateRoute path="/:id/edit" element={<StreamEdit />} />
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
