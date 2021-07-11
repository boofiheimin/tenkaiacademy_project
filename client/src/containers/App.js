import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authen } from "../actions/AuthActions";

import Nav from "./Nav/NavContainer";

import Login from "./Login/LoginContainer";
import Landing from "./Landing/LandingContainer";
import Streams from "./Streams/StreamsContainer";
import Stream from "./Streams/StreamContainer";
import Clips from "./Clips/ClipsContainer";
import NotFound from "./NotFound/NotFoundContainer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authen());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<Nav />}>
          <Route path="/" element={<Landing />} />
          <Route path="streams">
            <Route path="/" element={<Streams />} />
            <Route path="/:videoId" element={<Stream />} />
          </Route>
          <Route path="clips" element={<Clips />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
